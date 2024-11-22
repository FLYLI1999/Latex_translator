interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.config = Continuing the rate limiter implementation:

<boltArtifact id="auth-system-implementation-continued" title="Continue Authentication System Implementation">
<boltAction type="file" filePath="src/utils/rateLimit.ts">interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.requests = new Map();
    this.config = config;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Get existing requests or create new array
    let requests = this.requests.get(key) || [];

    // Filter out old requests
    requests = requests.filter(timestamp => timestamp > windowStart);

    // Check if rate limit is exceeded
    if (requests.length >= this.config.maxRequests) {
      return true;
    }

    // Add new request
    requests.push(now);
    this.requests.set(key, requests);

    return false;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per window
});

export const authRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
});