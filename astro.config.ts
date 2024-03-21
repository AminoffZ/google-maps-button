import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

export default defineConfig({
  build: {
    assets: 'app'
  },
  integrations: [svelte()],
});