import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ 
    open: true,
    filename: 'dist/stats.html',
    gzipSize: true,
    brotliSize: true,
   })],
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Your backend server
    },
  },
})
