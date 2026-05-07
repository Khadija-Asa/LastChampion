import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/LastChampion/',
  plugins: [
    react(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/LastChampion/',
      scope: '/LastChampion/',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff,woff2,ttf,otf,avif,webp,jpg,png,mp3}'],
        runtimeCaching: [
          {
            // Hashed assets (JS, CSS, fonts, images) — cache forever
            urlPattern: /\/LastChampion\/assets\/.+\.(js|css|woff2?|ttf|otf|webp|jpg|avif|png|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // Sounds — cache 30 days
            urlPattern: /\/LastChampion\/sounds\/.+\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sounds',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Public images (non-hashed) — cache 30 days
            urlPattern: /\/LastChampion\/images\/.+/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'public-images',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 30, maxEntries: 200 },
            },
          },
        ],
      },
      manifest: {
        name: 'LastChampion',
        short_name: 'LastChampion',
        theme_color: '#080808',
        background_color: '#080808',
        display: 'standalone',
        scope: '/LastChampion/',
        start_url: '/LastChampion/',
        icons: [
          { src: '/LastChampion/assets/versus.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap':  ['gsap'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
