import { ref } from 'vue';

export default function () {
  const isModalOpen = ref(false);

  function showModal(): void {
    isModalOpen.value = true;
  }
  function hideModal(): void {
    isModalOpen.value = false;
  }
  function toggleModal(): void {
    isModalOpen.value = !isModalOpen.value;
  }
  return { isModalOpen, showModal, hideModal, toggleModal };
}
