// vite.config.js
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

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
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',  // forces IPv4 instead of ::1
        changeOrigin: true,
      },
    },
  },
})
