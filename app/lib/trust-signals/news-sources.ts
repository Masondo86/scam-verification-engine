// app/lib/trust-signals/news-sources.ts

import { XMLParser } from 'fast-xml-parser';
import { NewsSignal } from './types'; // relative path to types (same folder)

export interface NewsSource {
  name: string;
  fetchUrl: (query: string, limit: number) => string;
  parseResponse: (xml: string) => Promise<NewsSignal[]>;
}

/**
 * Parse Google News RSS feed into NewsSignal[]
 */
async function parseGoogleNewsRss(xml: string): Promise<NewsSignal[]> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
  });
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item || [];

  // Ensure items is an array (if only one item, it may be an object)
  const articleList = Array.isArray(items) ? items : [items];

  return articleList.slice(0, 20).map((item: any) => {
    const title = item.title || '';
    const link = item.link || '';
    const pubDate = item.pubDate || new Date().toISOString();
    const source = item.source?._text || 'Unknown';
    const description = item.description || '';

    // Simple sentiment & category (will be refined in news.ts)
    return {
      title,
      source,
      sentiment: 'neutral', // temporary; will be re-evaluated
      url: link,
      publishedDate: pubDate,
      category: undefined, // will be classified later
    };
  });
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Google News',
    fetchUrl: (query, limit) =>
      `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-ZA&gl=ZA&ceid=ZA:en`,
    parseResponse: parseGoogleNewsRss,
  },
];
