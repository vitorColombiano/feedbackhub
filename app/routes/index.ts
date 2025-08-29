import { createResolver } from '@nuxt/kit';
import type { NuxtPage } from 'nuxt/schema';

const resolver = createResolver(import.meta.url);
const localPages = resolver.resolve(__dirname, '../pages');

export const routes: NuxtPage[] = [
  {
    name: 'home',
    path: '/',
    file: `${localPages}/index.vue`,
    meta: {
      layout: false,
    },
  },
  {
    name: 'form',
    path: '/form',
    file: `${localPages}/form.vue`,
    meta: {
      layout: false,
    },
  },
  {
    name: 'success',
    path: '/success',
    file: `${localPages}/success.vue`,
    meta: {
      layout: false,
    },
  }
]
