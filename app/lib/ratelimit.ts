import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Check if Redis is configured
const isRedisConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Only create Redis instance if configured
const redis = isRedisConfigured 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Create rate limiter if Redis is available
const rateLimiter = redis 
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 scans / minute / IP
    })
  : null;

export const rateLimit = {
  limit: async (ip: string) => {
    // If Redis not configured, allow all requests (free tier mode)
    if (!rateLimiter) {
      console.warn('Rate limiting disabled - Redis not configured');
      return { success: true };
    }

    // Use rate limiter
    try {
      return await rateLimiter.limit(ip);
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If rate limiter fails, allow the request
      return { success: true };
    }
  }
};
