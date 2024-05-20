// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/global.css'],
  modules: ['@nuxt/ui'],
  plugins: [
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/vue-the-mask.js' }
  ],
});
