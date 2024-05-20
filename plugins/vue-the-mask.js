// plugins/vue-the-mask.js
import { defineNuxtPlugin, useNuxtApp } from '#app'; // Importe useNuxtApp para acessar o objeto app
import VueTheMask from 'vue-the-mask'; // Importe VueTheMask fora do escopo da função setup

export default defineNuxtPlugin(() => {
  const app = useNuxtApp(); // Obtenha a instância de app usando useNuxtApp

  // Certifique-se de que o Vue The Mask seja registrado após a inicialização do Vue
  app.vueApp.use(VueTheMask);

  // Adicione o Vue The Mask como uma propriedade global para que ele esteja disponível em todos os componentes
  app.vueApp.config.globalProperties.$vueTheMask = VueTheMask;
});
