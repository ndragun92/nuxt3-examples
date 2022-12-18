// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from "vite-plugin-eslint";
export default defineNuxtConfig({
  // ssr: false,
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      // "/_nuxt/**": { headers: { "cache-control": "max-age=31536000" } }, // Set generated files cache to 1 year
    },
  },
  css: ["~/assets/css/main.scss"],
  modules: [
    // https://tailwindcss.nuxt.dev/
    "@nuxtjs/tailwindcss",
    // https://github.com/nuxt-modules/icon
    // https://icones.js.org/collection/all?s=github
    "nuxt-icon",
    // https://vueuse.org/guide/index.html#nuxt
    "@vueuse/nuxt",
  ],
  vite: {
    plugins: [eslintPlugin()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/css/utils/global.scss";`,
        },
      },
    },
  },
});
