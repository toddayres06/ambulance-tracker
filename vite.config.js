import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',  // Correct backend target
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove /api prefix when hitting backend
  },
},

  },
})
