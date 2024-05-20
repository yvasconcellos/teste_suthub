import { defineNuxtPlugin } from '#app';
import { defineRule, configure } from 'vee-validate';
import { required, min, max, between, alpha_spaces, email } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import ptBR from '@vee-validate/i18n/dist/locale/pt_BR.json';

export default defineNuxtPlugin(() => {
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('between', between);
  defineRule('alpha_spaces', alpha_spaces);
  defineRule('email', email);

  configure({
    generateMessage: localize('pt_BR', ptBR),
    validateOnInput: true,
  });
});
