import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['i18next', 'react-i18next'],
          editor: ['@monaco-editor/react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
