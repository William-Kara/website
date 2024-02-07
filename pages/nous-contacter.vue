<template>
  <div>
    <div class="container columns py-6">
      <div class="column is-5">
        <h1>Nous contacter.</h1>

        <p>
          Vous souhaitez avoir plus d’informations concernant nos futures formations ou nos équipes
          ? N’hésitez pas à nous contacter.
        </p>
      </div>
      <form class="column is-6 is-offset-1 pt-6" @submit.prevent="submitForm">
        <QfcTextField
          v-model="email.input"
          :error-message="email.error"
          label="Adresse e-mail"
          type="email"
        />

        <div class="columns my-0 is-variable is-2">
          <div class="column py-0">
            <QfcTextField
              v-model="firstName.input"
              label="Prénom"
              :error-message="firstName.error"
            />
          </div>

          <div class="column py-0">
            <QfcTextField v-model="lastName.input" label="Nom" :error-message="lastName.error" />
          </div>
        </div>
        <QfcTextField v-model="subject.input" label="Objet" :error-message="subject.error" />

        <QfcTextArea
          v-model="message.input"
          :error-message="message.error"
          class="mb-5"
          label="Votre message"
        />

        <QfcCheckbox v-model="rgpd" class="mb-5"
          >En cochant cette case et en soumettant ce formulaire, j’accepte que mes données
          personnelles soient utilisées pour me recontacter dans le cadre de ma demande indiquée
          dans ce formulaire. Aucun autre traitement ne sera effectué avec mes
          informations.</QfcCheckbox
        >
        <QfcButton class="is-fullwidth-mobile" label="Envoyer mon message" />

        <QfcModal v-model:isOpen="isModalOpen">
          <template #title>Félicitations, votre message a bien été envoyé !</template>

          <template #content
            >Nous avons bien pris en compte votre demande.<br />
            Nous nous efforçons de traiter celle-ci dans les plus brefs délais.
          </template>
        </QfcModal>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import useModal from '~/composables/useModal';

const { showModal, isModalOpen } = useModal();
const api = useApi();
const form = ref({
  email: { input: '', error: '' },
  firstName: { input: '', error: '' },
  lastName: { input: '', error: '' },
  subject: { input: '', error: '' },
  message: { input: '', error: '' },
  rgpd: false,
});
const { email, firstName, lastName, subject, message, rgpd } = toRefs(form.value);
const textFields = [email, firstName, lastName, subject, message];

function areAllTextFieldsFilled(): boolean {
  let isCheckValid = true;

  textFields.forEach((textField) => {
    const { input, error } = toRefs(textField.value);
    if (!input.value) {
      error.value = 'Veuillez renseigner ce champ';
      isCheckValid = false;
    } else {
      error.value = '';
    }
  });

  return isCheckValid;
}
function isRgpdChecked(): boolean {
  return rgpd.value;
}
function isFormValid(): boolean {
  return areAllTextFieldsFilled() && isRgpdChecked();
}
async function submitForm() {
  if (!isFormValid()) return;

  await api.post('/api/contact', {
    body: {
      email: email.value.input,
      firstName: firstName.value.input,
      lastName: lastName.value.input,
      message: message.value.input,
      subject: subject.value.input,
    },
  });

  showModal();
  clearForm();
}
function clearForm(): void {
  email.value.input = '';
  firstName.value.input = '';
  lastName.value.input = '';
  subject.value.input = '';
  message.value.input = '';
  rgpd.value = false;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function unwrapForm() {
  return {
    email: email.value.input,
    firstName: firstName.value.input,
    lastName: lastName.value.input,
    subject: subject.value.input,
    message: message.value.input,
    rgpd: rgpd.value,
  };
}
</script>

<style lang="scss" scoped>
@import 'bulma/sass/utilities/mixins';

.is-fullwidth-mobile {
  @include touch {
    width: 100%;
  }
}
</style>
