import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import componentTagger from './plugins/component-tagger';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: Number(env.PORT) || 5173,
    hmr: {
      overlay: false,
    },
    watch: {
      // Use polling instead of native file system events (more reliable for some environments)
      usePolling: false,
      // Wait 500ms before triggering a rebuild (gives time for all files to be flushed)
      interval: 500,
      // Additional delay between file change detection and reload
      binaryInterval: 500,
    },
  },
  preview: {
    port: Number(env.PORT) || 4173,
  },
  };
});
