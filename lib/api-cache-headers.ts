/** Prevent CDN/browser caching of dynamic API responses (fixes stale pledge log on Vercel). */
export const NO_STORE_JSON_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "private, no-store, max-age=0",
  "Vercel-CDN-Cache-Control": "private, no-store, max-age=0",
} as const;
