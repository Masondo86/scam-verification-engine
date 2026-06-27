// app/services/trust-signals/news.ts

import { XMLParser } from 'fast-xml-parser';
import { NewsSignal, NewsResponse } from '@/lib/trust-signals/types';
import { NEWS_SOURCES } from '@/lib/trust-signals/news-sources';

// Simple sentiment lexicons (v1)
const NEGATIVE_KEYWORDS = [
  'scam', 'fraud', 'complaint', 'lawsuit', 'investigation', 'warning',
  'fake', 'phishing', 'breach', 'attack', 'violation', 'penalty',
  'cease', 'desist', 'fine', 'sue', 'court', 'judge', 'guilty',
];
const POSITIVE_KEYWORDS = [
  'award', 'launch', 'success', 'growth', 'expansion', 'innovation',
  'partnership', 'acquisition', 'new product', 'milestone', 'achievement',
];

/**
 * Classify sentiment based on title and description (if available)
 */
function classifySentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const lower = text.toLowerCase();
  let score = 0;
  for (const word of NEGATIVE_KEYWORDS) {
    if (lower.includes(word)) score--;
  }
  for (const word of POSITIVE_KEYWORDS) {
    if (lower.includes(word)) score++;
  }
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

/**
 * Categorise article based on content
 */
function categoriseArticle(text: string): string | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('scam') || lower.includes('phishing')) return 'Scam Warning';
  if (lower.includes('fraud') || lower.includes('theft')) return 'Fraud';
  if (lower.includes('complaint') || lower.includes('consumer protection')) return 'Consumer Complaint';
  if (lower.includes('regulator') || lower.includes('fine') || lower.includes('penalty')) return 'Regulatory Notice';
  if (lower.includes('lawsuit') || lower.includes('sues') || lower.includes('court')) return 'Lawsuit';
  if (lower.includes('launch') || lower.includes('introduces')) return 'Press Release';
  return undefined; // default to "Media Mention" later
}

/**
 * Parse Google News RSS feed
 */
async function parseGoogleNewsRss(xml: string): Promise<NewsSignal[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  });
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item || [];

  // Ensure items is an array
  const articleList = Array.isArray(items) ? items : [items];

  return articleList.slice(0, 20).map((item: any) => {
    const title = item.title || '';
    const link = item.link || '';
    const pubDate = item.pubDate || new Date().toISOString();
    const source = item.source || 'Unknown';
    const description = item.description || '';

    const fullText = `${title} ${description}`;
    const sentiment = classifySentiment(fullText);
    const category = categoriseArticle(fullText);

    return {
      title,
      source: typeof source === 'string' ? source : source?._text || 'Unknown',
      sentiment,
      url: link,
      publishedDate: pubDate,
      category,
    };
  });
}

/**
 * Main function to fetch news for a query
 */
export async function fetchNews(query: string, limit: number = 20): Promise<NewsResponse> {
  const source = NEWS_SOURCES[0]; // Google News for now
  const url = source.fetchUrl(query, limit);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TheLinkDigital/1.0)',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const xml = await response.text();
    const signals = await source.parseResponse(xml);

    // Truncate to limit
    const truncated = signals.slice(0, limit);

    // Count sentiments
    const positive = truncated.filter(s => s.sentiment === 'positive').length;
    const neutral = truncated.filter(s => s.sentiment === 'neutral').length;
    const negative = truncated.filter(s => s.sentiment === 'negative').length;

    // Determine risk impact based on negative count
    let riskImpact: 'low' | 'medium' | 'high' = 'low';
    if (negative >= 5) riskImpact = 'high';
    else if (negative >= 2) riskImpact = 'medium';

    return {
      query,
      total: truncated.length,
      signals: truncated,
      positiveCount: positive,
      neutralCount: neutral,
      negativeCount: negative,
      riskImpact,
    };
  } catch (error) {
    console.error('[News Engine] Error fetching news:', error);
    return {
      query,
      total: 0,
      signals: [],
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      riskImpact: 'low',
    };
  }
}
