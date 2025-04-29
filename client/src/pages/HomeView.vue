<template>
  <section class="flex text-center mt-5">
    <h1>Encore merci d'être avec nous aujourd'hui</h1>
    <h2>Pleins de gros bisous</h2>
    <img src="https://tse1.mm.bing.net/th?id=OIP.VAdTcCZD7T1qmH1grqiSHAHaFV&pid=Api"
      alt="mariage champetre avec un canapé en paille" class="wedding_img" />
  </section>
  <section class="wedding_btn mt-5">
    <RouterLink to="/ton-image">
      Partager un instant avec vous
    </RouterLink>
  </section>
  <section class="wedding_signature">
    <h6>Hélène</h6>
    <h6>Julien</h6>
    <h6>Cassiopée</h6>
    <h6>Soraya</h6>
  </section>
  <ModalsContainer @click="() => open()" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ModalsContainer, useModal } from 'vue-final-modal';
import InstallationModal from '../components/InstallationModal.vue'

const isPwaInstalled = ref(false);

const { open } = useModal({
  component: InstallationModal,
})
onMounted(() => {
  // Test si l'app est installé ou non
  isPwaInstalled.value = window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && window.navigator.standalone === true)
  open()

});

</script>
<style scoped></style>