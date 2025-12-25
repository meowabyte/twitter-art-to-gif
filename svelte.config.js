import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { join } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  compilerOptions: {
    cssHash: ({ hash, css, filename }) => `kb-${hash(filename ?? css)}`,
  },

  kit: {
    adapter: adapter({
      fallback: "404.html",
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
    },
    alias: {
      "@/*": join(import.meta.dirname, "src"),
    },
  },
};

export default config;
