// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mahalkomagene.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // dükkân soru formu arama motorlarına kapalı
      filter: (sayfa) => !sayfa.includes('/sorular'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
