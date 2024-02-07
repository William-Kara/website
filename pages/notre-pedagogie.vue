<template>
  <div class="main-container">
    <section class="pt-6 pb-6">
      <QfcBlockContentTitle
        :title="blockContentTitle.title"
        :tag-list="blockContentTitle.tagList"
        :button-label="blockContentTitle.buttonLabel"
        :src="blockContentTitle.src"
        :alt="blockContentTitle.alt"
        class="block-content-title"
        @button-click="linkToContact"
      >
        <template #paragraph>
          Nos modules et nos parcours de formation vous permettrons d‘acquérir de nouvelles
          compétences ou de vous perfectionner sur des sujets précis dans les domaines du
          <b>développement web</b>, de la <b>cybersécurité</b> et du <b>design.</b
          ><br class="br-margin" />Vous avez des questions sur nos futures formations ?
        </template>
      </QfcBlockContentTitle>
    </section>
    <section class="pt-6 pb-6">
      <div class="container">
        <QfcCardSlider :cards="cards" />
      </div>
    </section>
    <banner-call-to-subscribe />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';

const router = useRouter();
function linkToContact() {
  router.push({ path: '/nous-contacter' });
}

const blockContentTitle = {
  title: 'Découvrez notre pédagogie.',
  tagList: [],
  buttonLabel: 'Contactez-nous',
  src: '/pedagogie-animation.mp4',
  alt: 'video presentation',
};

const cards = [
  {
    title: 'Une plateforme accessible à tout moment',
    srcVideo: '/timer-animation.mp4',
    icon: 'timer',
    size: 'medium',
    content:
      'Grâce à une plateforme accessible partout et à tout moment, vous pourrez retrouver vos formations en cours rapidement et reprendre là où vous en étiez.',
  },
  {
    title: 'Des parcours adaptés à vos besoins',
    srcVideo: '/explore-animation.mp4',
    icon: 'explorer',
    size: 'medium',
    content:
      'Nous vous offrirons une expérience d’apprentissage sur-mesure avec des parcours de formation adaptés à vos besoins. Chaque module sera pensé de telle manière à ce que vous ayez uniquement accès à l’essentiel.',
  },
  {
    title: 'De la théorie et surtout de la mise en pratique',
    srcVideo: '/training-animation.mp4',
    icon: 'create',
    size: 'medium',
    content:
      'Parce que la théorie ça se pratique, nous avons décider de vous proposer de nombreux exercices par module et ainsi de vous faire gagner en confiance. ',
  },
];
</script>

<style lang="scss">
.br-margin {
  margin-bottom: 4rem;
}
.block-content-title {
  margin: auto auto 4rem;
  max-width: 90%;
  width: 70%;
  mix-blend-mode: lighten;
}

.container {
  &__limited {
    max-width: 1000px !important;
  }
}
</style>
