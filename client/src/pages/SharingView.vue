<template>
  <main>
    <h1 class="mt-2 text-center">Merci pour ton partage</h1>
    <section class="preview">
      <img :src="url + '/public/images/' + image.url" alt="image.alt"
        :class="image.orientation === 'landscape' ? 'landscape' : 'portrait'" />
      <div class="mt-2">
        <h3>Photographe : <span class="h5">{{ image.name }}</span></h3>
        <h4>Tags : <span class="h5">{{ image.tags }}</span></h4>
        <div class="text-center p-3 border">
          <h5>Merci pour ce petit mot</h5>
          <h6>{{ image.description }}</h6>
        </div>
      </div>
    </section>
    <section class="wedding_btn mt-4">
      <RouterLink to="/ton-image">
        Re Partager un instant avec vous
      </RouterLink>
    </section>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import client from "../services/client"
import { onMounted, reactive } from 'vue';
import { initialImage, type ImageType } from '../types/images.types';
import { toast } from 'vue3-toastify';

const route = useRoute();
const image = reactive<ImageType>(initialImage)
const url = import.meta.env.VITE_API_URL
onMounted(async () => {
  try {
    const { data } = await client.get(`/images/${route.params.id}`) as { data: ImageType }
    Object.assign(image, data)
  } catch (error) {
    toast.error("Une erreur est survenue pendant le chargement de l'image")
    console.error(error)
  }
})


</script>
<style>
.preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    border: 1px solid black;
    border-radius: 0.5rem;
  }

  .landscape {
    width: 100%;
    max-height: 50vh;
  }

  .portrait {
    max-height: 50vh;
    width: fit-content;
  }
}
</style>