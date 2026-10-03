import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Let .mdx files be imported as React components (and act as pages/routes).
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // The tutorial is a single static page: export plain HTML/CSS/JS to `out/`.
  output: "export",
  images: { unoptimized: true },
  // Don't auto-generate AGENTS.md / CLAUDE.md in this repo.
  agentRules: false,
};

const withMDX = createMDX({
  options: {
    // Plugins are passed by name (strings) so they also work with Turbopack,
    // which cannot receive JavaScript functions from next.config.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          theme: { light: "github-light", dark: "github-dark-dimmed" },
          keepBackground: false,
          defaultLang: { block: "plaintext", inline: "plaintext" },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
