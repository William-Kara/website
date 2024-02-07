import QfcComponents from '@design-system/design-system-vuejs';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(QfcComponents);
});
