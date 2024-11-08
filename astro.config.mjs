import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://adanmaidana.github.io',
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), react()]
});