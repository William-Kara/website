<template>
  <QfcBox ref="target" class="login-card">
    <div class="login-card__icon">
      <img src="/image-q.svg" width="52" height="41" alt="logo" />
    </div>
    <h3 class="login-card__title">Commencer à vous former gratuitement</h3>
    <div class="login-card__content">
      <QfcTextField
        v-model="emailInput"
        label="Adresse e-mail"
        background-color="#343434"
        type="email"
        :error-message="emailError"
      />
      <QfcTextField v-model="nameInput" label="Pseudo" background-color="#343434" />
      <QfcTextField v-model="passwordInput" label="Mot de passe" background-color="#343434" />
      <QfcCheckbox v-model="checkbox" class="login-card__content__agreed">
        <slot
          >En vous inscrivant, vous confirmer avoir lu et accepté notre
          <router-link class="login-card__content__agreed__link" to="/politique-de-confidentialite"
            >politique de confidentialité.</router-link
          ></slot
        >
      </QfcCheckbox>
      <QfcButton
        class="login-card__content__connect-btn"
        label="S'inscrire"
        :is-disabled="!formComplete()"
        @click="submitForm"
      />
      <QfcSeparator />
      <span class="login-card__content__text-link">Déjà un compte ?</span>
      <QfcButton
        class="login-card__content__connect-btn-log"
        label="Se connecter"
        secondary="true"
        @click="linkToLogin"
      />
    </div>
  </QfcBox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const target = ref(null);
definePageMeta({
  layout: 'form',
});
const router = useRouter();
function linkToLogin() {
  router.push({ path: '/login' });
}

interface Props {}
defineProps<Props>();

const checkbox = ref(false);
const passwordInput = ref('');
const nameInput = ref('');
const emailInput = ref('');
const emailError = ref('');
const api = useApi();

function formComplete(): boolean {
  return (
    checkbox.value === true && passwordInput.value !== '' && nameInput.value !== '' && isFormValid()
  );
}
function isFormValid(): boolean {
  if (!emailInput.value) {
    emailError.value = 'Veuillez renseigner votre adresse e-mail';
  } else {
    emailError.value = '';
  }
  return !!emailInput.value;
}
async function submitForm() {
  if (!isFormValid()) return;
  await api.post('/user/register', {
    body: { name: nameInput.value, email: emailInput.value, password: passwordInput.value },
  });
}
</script>

<style lang="scss" scoped>
@import 'bulma/sass/utilities/mixins';

.login-card {
  padding: 4rem 2.3rem;
  text-align: center;
  font-weight: 300;
  display: block;
  margin: auto;
  gap: 2rem;
  width: 37rem;
  &__icon {
    .material-icons-outlined {
      font-size: 2.8rem;
    }
  }
  &__media {
    mix-blend-mode: lighten;
    max-width: 8rem;
  }
  &__title {
    margin-top: 1.25rem;
    font-weight: 400;
    font-size: 1.75rem;
  }
  &__content {
    margin-top: 3.5rem;
    font-size: 1.12rem;
    font-weight: 400;
    text-align: left;
    &__connect-btn {
      display: block;
      margin: 1.5rem auto;
      width: 75%;
    }
    &__connect-btn-log {
      display: block;
      margin: 1.5rem auto;
      width: 75%;
      background-color: #343434;
    }
    &__agreed {
      float: left;
      margin-bottom: 1.5rem;
      &__link {
        color: white;
        text-decoration: underline;
      }
    }
    &__text-link {
      text-align: center;
      display: block;
      margin: auto;
      color: white;
    }
  }
}
</style>
