import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Project root (where index.html is)
  build: {
    outDir: 'dist',       // Default output directory for Vercel
    emptyOutDir: true,    // Clean dist before build
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Explicit entry point
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional: import from "@/..."
    },
  },
});
