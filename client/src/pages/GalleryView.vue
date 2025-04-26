<template>
  <main class="container">
    <div class="row mt-3">
      <section :class="image.orientation === 'landscape' ? 'col-12' : 'col-8'">
        <img :src="url + '/public/images/' + image.url" alt="image.alt"
          :class="image.orientation === 'landscape' ? 'fullWidth' : 'fullHeight'" />
      </section>
      <section v-if="image.orientation !== 'landscape'" class="col-1"></section>
      <section :class="image.orientation === 'landscape' ? 'col-12' : 'col-3'">
        <div class="mt-2 text-center">
          <div class="text-center p-3 border">
            <h3>{{ image.description }}</h3>
          </div>
          <div class="d-flex justify-content-around mt-3">

            <h5>Photographe : <span class="h5">{{ image.name }}</span></h5>
            <h5>Tags : <span class="h5">{{ image.tags }}</span></h5>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import client from '../services/client';
import { initialImage, type ImageType } from '../types/images.types';

const image = reactive<ImageType>(initialImage);
const url = import.meta.env.VITE_API_URL;
const getNewRandomImage = async () => {
  try {
    const newSet = await client.get("/images?type=random") as { data: ImageType[] };
    Object.assign(image, newSet.data)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  setInterval(() => {
    getNewRandomImage()
  }, 10000)

})

</script>
<style scoped>
.fullWidth {
  width: 100%;
}

.fullHeight {
  height: 90vh;
}
</style>