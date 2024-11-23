import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        connect-src 'self' https://api.openai.com https://*.supabase.co https://aihubmix.com;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
        style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
        style-src-elem 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
        script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
        font-src 'self' data: https://cdn.jsdelivr.net;
        img-src 'self' data: https: blob:;
        worker-src 'self' blob:;
      `.replace(/\s+/g, ' ').trim()
    }
  }
});
