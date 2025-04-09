// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  pages: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ssr: false, // si tu veux un SPA (plus simple à héberger)
  nitro: {
    preset: 'vercel' // ⚠️ important
  },
  modules: ['@vueuse/nuxt', '@nuxt/icon', '@nuxt/ui'],
})