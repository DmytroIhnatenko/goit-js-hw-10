import { defineConfig } from 'vite';

export default defineConfig({
  base: '/goit-js-hw-10/',
  build: {
    rollupOptions: {
      input: {
        main: 'src/index.html',
        timer: 'src/1-timer.html',
        snackbar: 'src/2-snackbar.html',
      },
    },
  },
});
