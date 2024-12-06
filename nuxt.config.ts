// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  experimental: {
  },

  modules: [
    "nitro-cloudflare-dev",
    "@ant-design-vue/nuxt",
    '@nuxtjs/tailwindcss'
  ],

  routeRules: {
    '/': { prerender: true },
    '/**': { ssr: true },
    // '/refresh': { 
    //   cors: true,
    //   headers: {
    //     'Access-Control-Allow-Methods': '，GET, POST, OPTIONS',
    //     'Access-Control-Allow-Headers': 'Content-Type'
    //   },
    //   redirect:{
    //     to:'/api/refresh',
    //     statusCode: 301
    //   }
    // }
  },

  antd: {
  },

  vite: {
    // 启用内联样式以避免闪烁
    build: {
      cssCodeSplit: false
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
