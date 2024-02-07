<template>
  <QfcBanner class="qfc-banner" img-src="/image-q-grey.svg">
    <div class="qfc-banner-container">
      <h3 class="qfc-banner-container__title">Devenez nos premiers utilisateurs testeurs</h3>
      <p class="qfc-banner-container__description">
        Vous constituerez notre premier cercle d’utilisateurs, pour tester nos formations et notre
        plateforme dès que tout sera prêt !
      </p>

      <form @submit.prevent="submitForm">
        <div class="qfc-input-container">
          <QfcTextField
            v-model="emailInput"
            class="qfc-input-container__input"
            label="Adresse e-mail"
            type="email"
            :error-message="emailError"
            background-color="#343434"
          />
          <QfcButton
            class="qfc-input-container__button"
            label="Devenir testeur"
            size="medium"
            type="submit"
          />
          <QfcModal v-model:isOpen="isModalOpen">
            <template #title>Félicitations, vous êtes inscrit pour devenir testeur !</template>
            <template #content
              >Nous vous remercions pour votre inscription.<br />
              Un e-mail vous a été envoyé afin de valider votre inscription.
            </template>
          </QfcModal>

          <QfcCheckbox v-model="checkbox" class="qfc-input-container__checkbox"
            >J’accepte d’être contacté par nos équipes dans le cadre de tests utilisateurs. <br />
            Vous pourrez vous désinscrire à tout moment via le lien de désinscription présent dans
            chacun de nos e-mails.
          </QfcCheckbox>
        </div>
      </form>
    </div>
  </QfcBanner>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {}
defineProps<Props>();

const checkbox = ref(false);
const emailInput = ref('');
const emailError = ref('');
const api = useApi();

const { showModal, isModalOpen } = useModal();
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
  await api.post('/api/betatester', { body: { email: emailInput.value, consent: checkbox.value } });
  showModal();
}
</script>

<style lang="scss" scoped>
@import 'bulma/sass/utilities/mixins';

$common-width: 80%;
.qfc {
  &-banner-container {
    width: 60%;
    &__title {
      margin-bottom: 1rem;
      width: 50%;
    }
    &__description {
      margin-bottom: 3rem;
      width: $common-width;
    }
  }

  &-input-container {
    display: flex;
    column-gap: 1rem;
    row-gap: 0.25rem;
    flex-wrap: wrap;
    &__input {
      flex: 1;
    }
    &__checkbox {
      flex-basis: 100%;
      & > * {
        width: $common-width;
      }
    }
  }
}

@include touch {
  .qfc {
    &-banner-container {
      width: 90%;
      &__title {
        width: $common-width;
      }
      &__description {
        width: 100%;
      }
    }
    &-input-container {
      flex-wrap: wrap;
      gap: 0;
      justify-content: center;
      &__input {
        flex-basis: 100%;
        order: 1;
        margin-bottom: 0;
      }
      &__checkbox {
        flex-basis: 100%;
        order: 2;
        margin-bottom: 2rem;
      }
      &__button {
        order: 3;
        width: 22.5rem;
      }
    }
  }
}

@include mobile {
  .qfc {
    &-banner-container {
      width: 90%;
      &__title {
        width: 100%;
      }
      &__description {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }
    &-input-container {
      flex-wrap: wrap;
      gap: 0;
      justify-content: center;
      &__input {
        flex-basis: 100%;
        order: 1;
        margin-bottom: 0;
      }
      &__checkbox {
        flex-basis: 100%;
        order: 2;
        margin-bottom: 2rem;
      }
      &__button {
        order: 3;
        width: 100%;
      }
    }
  }
}
</style>
