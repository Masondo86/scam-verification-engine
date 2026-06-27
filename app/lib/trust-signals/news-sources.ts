// app/lib/trust-signals/news-sources.ts

export interface NewsSource {
  name: string;
  fetchUrl: (query: string, limit: number) => string;
  parseResponse: (xml: string) => Promise<NewsSignal[]>;
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Google News',
    fetchUrl: (query, limit) =>
      `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-ZA&gl=ZA&ceid=ZA:en`,
    parseResponse: parseGoogleNewsRss,
  },
];
