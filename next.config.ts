import type { NextConfig } from "next";

const withMDX = require('@next/mdx')({
  options: {
    // smartypants turns straight quotes and -- into curly quotes and dashes,
    // leaving code untouched.
    remarkPlugins: ["remark-gfm", "remark-smartypants"],
  },
})

const nextConfig: NextConfig = {
	/* config options here */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
