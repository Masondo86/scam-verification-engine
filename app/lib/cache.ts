// app/lib/cache.ts
interface CacheEntry<T> {
  data: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T, ttlSeconds: number = 86400): void {
  cache.set(key, { data, expires: Date.now() + ttlSeconds * 1000 });
}
