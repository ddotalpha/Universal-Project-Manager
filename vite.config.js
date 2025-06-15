import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.',  // root is project folder itself, where index.html is
  plugins: [react()],
  build: {
    outDir: 'dist',  // output folder inside project folder
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  }
});
