import adapter from "@bun-community/sveltekit-adapter-bun";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      dynamic_origin: true,
    }),
  },
  preprocess: vitePreprocess(),
};

export default config;
