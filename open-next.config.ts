import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  /**
   * Every route on this site is prerendered at build time and nothing
   * revalidates, so the prerendered pages ship as Workers static assets and
   * are read back from the ASSETS binding.
   *
   * Without an incremental cache configured, routes built with
   * generateStaticParams (every /blog/[slug], /series/[slug] and /tags/[tag])
   * have nowhere to read their HTML from at runtime. The worker then tries to
   * render them on demand, and because those routes set dynamicParams = false
   * there is no fallback — so it throws NoFallbackError and serves a 404.
   * Only the fully static routes survived that.
   *
   * Use r2IncrementalCache instead if this site ever needs ISR or on-demand
   * revalidation; this cache is read-only by design.
   */
  incrementalCache: staticAssetsIncrementalCache,
});
