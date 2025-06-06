// vite.config.js
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
    '/': {
      target: 'http://127.0.0.1:3001',  // Use your actual backend URL in production (for example, https://ambulance-tracker-7e8t.onrender.com)
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),  // Make sure '/api' is stripped from the path before reaching the backend
    },
  },
},

})
