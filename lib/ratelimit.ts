import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

let ratelimit: Ratelimit | null = null;

/** Sliding window: 30 pledges per minute per IP when Redis is configured. */
export function getPledgeRatelimit(): Ratelimit | null {
  if (!redis) return null;
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      prefix: "padres_parody:pledge",
    });
  }
  return ratelimit;
}
