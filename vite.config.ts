import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/dashboard/",
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      id: '/dashboard/',
      name: 'Dashboard del Clima - Proyecto 04',
      short_name: 'Dashboard del Clima',
      description: 'Proyecto 04 - dashboard del clima desarrollado con React y MUI',
      theme_color: '#D3D1D1',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: "pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        },
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          // Intercepta todas las peticiones a esta API (ajusta según necesidad)
          urlPattern: /^https:\/\/api\.open-meteo\.com\/.*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'open-meteo-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // 1 día
            },
            cacheableResponse: {
              statuses: [0, 200],
            }
          }
        }
      ]
    }
  })
  ],
})
