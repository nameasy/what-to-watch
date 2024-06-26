import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  base: '/what-to-watch/',
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
