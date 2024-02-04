<template>
  <div id="modal">
    <button class="select-cruise-button" @click="openModal">Выбрать круиз</button>

    <modal-dialog v-if="isModalOpen" @close="closeModal">
      <!-- Содержимое вашего модального окна -->
      <p>Это модальное окно</p>
      <button @click="closeModal">Закрыть</button>
    </modal-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ModalDialog } from 'vue-modal-dialogs';

export default {
  components: {
    ModalDialog
  },
  setup() {
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      isModalOpen,
      openModal,
      closeModal
    };
  }
};
</script>