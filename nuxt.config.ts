export default defineNuxtConfig({
  compatibilityDate: '2026-03-14',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset:
      process.env.NITRO_PRESET ||
      (process.env.VERCEL ? 'vercel' : 'node-server'),
  },
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD,
    adminSessionSecret: process.env.ADMIN_SESSION_SECRET,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey:
      process.env.SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://www.petersthal.info',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'de',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'Ihr Dorfportal fuer Petersthal - Veranstaltungen, Vereine, Unterkuenfte und Informationen rund um das Leben am Rottachsee.',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: 'Petersthal',
        },
      ],
      link: [
        { rel: 'icon', href: '/images/pLogo.png' },
        { rel: 'apple-touch-icon', href: '/images/pLogo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})

