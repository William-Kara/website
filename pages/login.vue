<template>
  <QfcBox ref="target" class="login-card">
    <div class="login-card__icon">
      <img src="/image-q.svg" width="52" height="41" alt="logo" />
    </div>
    <h3 class="login-card__title">Connectez vous à votre compte</h3>
    <div class="login-card__content">
      <QfcTextField label="Adresse e-mail" background-color="#343434" />
      <QfcTextField
        class="login-card__content__password"
        label="Mot de passe"
        type="password"
        background-color="#343434"
      />
      <QfcCheckbox
        v-model="isSelected"
        class="login-card__content__stay-connected"
        label="Rester connecté"
      />
      <div class="login-card__content__stay-connected-helper tooltip">
        <span class="material-icons-outlined">help_outline</span>
        <span class="tooltip-text"
          >En cochant cette case, vous serez automatiquement connecté à votre compte la prochaine
          fois que vous visiterez notre site. Cela utilise un cookie persistant qui stocke des
          informations sur votre ordinateur. Nous vous recommandons de ne cocher cette case que si
          vous utilisez un appareil personnel et sécurisé.</span
        >
      </div>
      <QfcButton
        class="login-card__content__connect-btn"
        label="Se connecter"
        :is-disabled="!formComplete"
      />
      <router-link to="" class="login-card__content__text-link">MOT DE PASSE OUBLIÉ ?</router-link>
      <QfcSeparator />
      <span class="login-card__content__text-link">Pas encore de compte ?</span>
      <QfcButton
        class="login-card__content__connect-btn-reg"
        label="S'inscrire"
        secondary="true"
        @click="linkToRegister"
      />
    </div>
  </QfcBox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSelected = ref(false);
const formComplete = ref(false);

const router = useRouter();
const target = ref(null);
definePageMeta({
  layout: 'form',
});
function linkToRegister() {
  router.push({ path: '/register' });
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
    &__connect-btn {
      display: block;
      margin: 1.5rem auto;
      width: 75%;
    }
    &__connect-btn-reg {
      display: block;
      margin: 1.5rem auto;
      width: 75%;
      background-color: #343434;
    }
    &__password {
      text-align: right;
      display: block;
      margin-bottom: 1.5rem;
    }
    &__stay-connected {
      float: left;
      margin-bottom: 1.5rem;
    }
    &__stay-connected-helper {
      float: left;
    }
    &__text-link {
      text-align: center;
      display: block;
      margin: auto;
      color: white;
    }
  }
}

.tooltip {
  position: relative;
  display: inline-block;
  margin-left: 0.5rem;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 26rem;
  background-color: #232323;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: 0.75rem;
  position: absolute;
  right: -13rem;
  bottom: 2rem;
  z-index: 1;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
