import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/LastChampion/',
  plugins: [
    react(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap':  ['gsap'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
