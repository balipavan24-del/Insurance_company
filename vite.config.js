import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'node:process';

// Use VITE_BASE (e.g. "/my-repo/" for GitHub Pages) so asset URLs and Router match hosting.
// https://vite.dev/config/shared-options.html#base
const base = env.VITE_BASE || '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
