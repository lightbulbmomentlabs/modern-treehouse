import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path
  base: './',

  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Set to true for debugging production builds

    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },

    // Rollup options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // Split vendor code for better caching
          photoswipe: ['photoswipe'],
        },
      },
    },

    // Asset inline limit (smaller files will be inlined as base64)
    assetsInlineLimit: 4096, // 4kb

    // CSS code splitting
    cssCodeSplit: true,

    // Report compressed size (can be slow on large projects)
    reportCompressedSize: true,

    // Chunk size warning limit
    chunkSizeWarningLimit: 1000, // 1000kb
  },

  // Dev server options
  server: {
    port: 5173,
    strictPort: false, // Try next port if 5173 is in use
    open: true, // Auto open browser on server start
    cors: true,

    // HMR options
    hmr: {
      overlay: true, // Show error overlay
    },
  },

  // Preview server options (for testing production builds)
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },

  // Plugin options
  plugins: [],

  // CSS options
  css: {
    devSourcemap: true, // Enable CSS source maps in dev mode
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['photoswipe', 'modern-normalize'],
  },

  // Asset handling
  assetsInclude: ['**/*.webm', '**/*.mp4'],
});
