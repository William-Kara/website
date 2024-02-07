<template>
  <div class="main-container">
    <QfcBlockContentTitle
      :title="blockContentTitle.title"
      :description="blockContentTitle.description"
      :tag-list="blockContentTitle.tagList"
      :button-label="blockContentTitle.buttonLabel"
      :src="blockContentTitle.src"
      :alt="blockContentTitle.alt"
      class="block-content-title"
      @button-click="linkToPedagogy"
    />
    <banner-call-to-subscribe />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';

const router = useRouter();
function linkToPedagogy() {
  router.push({ path: '/notre-pedagogie' });
}

const blockContentTitle = {
  title: 'Nous construisons votre nouvelle plateforme de e-learning.',
  description:
    'Vous souhaitez acquérir de nouvelles compétences ou simplement vous perfectionner sur un sujet en particulier ?',
  tagList: ['Cybersécurité', 'Développement', 'Design'],
  buttonLabel: 'Découvrez notre pédagogie',
  src: '/accueil-animation.mp4',
  alt: 'video presentation',
};
</script>
<style lang="scss" scoped>
@import 'bulma/sass/utilities/mixins';

.block-content-title {
  margin: 1rem auto 4rem;
  max-width: 90%;
  width: 70%;
  mix-blend-mode: lighten;
}

@include touch {
  .block-content-title {
    max-width: 90%;
    width: 100%;
  }
}
</style>
