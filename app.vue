<template>
  <NuxtLayout>
    <NuxtPage class="content" />
    <template #error="{ error }">
      <div class="container">
        <div class="box has-text-centered mt-6 py-6">
          <h1 class="mt-6">Oups, erreur.</h1>
          <h2>Quelque chose ne s'est pas bien passé.</h2>
          <p v-if="error.code && error.message">{{ error.code }} - {{ error.message }}</p>
          <QfcButton class="mt-5 mb-6" label="Reset" @click="resetError(error)" />
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// @ts-ignore
function resetError(error) {
  error.value = null;
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(15px);
}
</style>
