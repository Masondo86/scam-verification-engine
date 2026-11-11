import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

let redis: Redis | null | undefined;
const limiters = new Map<string, Ratelimit>();

type RateWindow = `${number} ${'ms' | 's' | 'm' | 'h' | 'd'}`;

function getLimiter(limit: number, window: RateWindow) {
  const key = `${limit}:${window}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    if (redis === undefined) {
      const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
      const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
      redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;
    }
    if (!redis) return undefined;
    limiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(limit, window) });
    limiters.set(key, limiter);
  }
  return limiter;
}

// Vercel overwrites this header at its edge. On other platforms, use one
// shared bucket instead of trusting caller-controlled forwarding headers.
export function getRateLimitKey(scope: string, request: Request) {
  const platformIp = process.env.VERCEL === '1'
    ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim()
    : null;
  const ipKey = platformIp
    ? createHash('sha256').update(platformIp).digest('hex')
    : 'shared';
  return `${scope}:${ipKey}`;
}

export const rateLimit = {
  limit: async (key: string, requests = 10, window: RateWindow = '1 m'): Promise<{ success: boolean; unavailable: boolean }> => {
    try {
      const limiter = getLimiter(requests, window);
      if (!limiter) return { success: false, unavailable: true };
      const result = await limiter.limit(key);
      return { success: result.success, unavailable: false };
    } catch (error) {
      console.error('Rate limiting error:', error);
      return { success: false, unavailable: true };
    }
  },
};
