<template>
  <div>
    <QfcModal v-model:isOpen="isModalOpen">
      <template #title>Félicitation, votre inscription est validée!</template>

      <template #content
        >Nous vous remercions pour votre inscription. Vous serez informés par e-mail de la démarche
        à suivre pour tester nos formations et notre plateforme dans les mois à suivre.
      </template>
    </QfcModal>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';
import useModal from '~/composables/useModal';

const router = useRouter();

const { showModal, isModalOpen } = useModal();
onMounted(async () => {
  await betatesterValidation();
});

async function betatesterValidation() {
  const api = useApi();
  const tokenParam = router.currentRoute.value.query.token;
  if (tokenParam == null) return;
  await api.patch('/api/betatester/validate', {
    body: { validation_token: tokenParam, validated: true },
  });
  showModal();
  watch(
    () => isModalOpen.value,
    () => {
      if (isModalOpen.value === false) {
        router.push('/');
      }
    }
  );
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
