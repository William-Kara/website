<template>
  <main class="main-container">
    <NuxtErrorBoundary>
      <QfcHeader :center-nav-items="centerNavItems" :right-nav-items="rightNavItems" />
      <slot />
      <section class="footer-section">
        <QfcSeparator v-if="isSeparatorNeeded" />
        <QfcFooter :third-links="thirdLinks" />
      </section>
    </NuxtErrorBoundary>
  </main>
</template>

<script lang="ts" setup>
const centerNavItems = [
  { label: 'Accueil', to: '/' },
  { label: 'Notre pédagogie', to: '/notre-pedagogie' },
  { label: 'Nous contacter', to: '/nous-contacter' },
];
const rightNavItems = [{ label: 'Qongzi', to: 'https://qongzi.com/', isExternal: true }];

const thirdLinks = {
  title: 'Contact',
  text: 'Vous avez une question ?',
  links: [
    {
      label: 'Contactez-nous',
      to: { name: 'nous-contacter' },
      isExternalLink: false,
      isButton: true,
    },
  ],
};

const pagesWithoutSeparator = ['/', '/notre-pedagogie'];
const router = useRoute();
const isSeparatorNeeded = computed(() => !pagesWithoutSeparator.includes(router.path));
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex: 1;
  }
  .footer-section {
    margin-top: 1rem;
  }
}
</style>
