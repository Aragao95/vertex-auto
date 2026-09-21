// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages: ajuste `site` para https://<seu-usuario>.github.io
// e `base` para o nome do repositório.
export default defineConfig({
  site: 'https://aragao95.github.io',
  base: '/vertex-auto',
  trailingSlash: 'ignore',
});
