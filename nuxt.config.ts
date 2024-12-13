// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: true,
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: [
        '/',
        '/alipan-tv-token'
      ]
    }
  },
  experimental: {
  },

  modules: [
    "@ant-design-vue/nuxt",
    '@nuxtjs/tailwindcss'
  ],

  routeRules: {
    '/': { prerender: true },
    '/alipan-tv-token': { prerender: false },
    '/api/**': { cors: true }
  },

  antd: {
  },

  vite: {
    // 启用内联样式以避免闪烁
    build: {
      cssCodeSplit: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  },

  // 或者如果想更精细地控制
  features: {
    // 启用内联样式
    inlineStyles: true
  },

  css: [
    '@/assets/css/main.scss'
  ]
})
