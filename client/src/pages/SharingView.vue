<template>
  <div>
    <h1>Sharing</h1>
    <img :src="url + '/public/images/' + image.url" alt="image.alt" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import client from "../services/client"
import { onMounted, reactive } from 'vue';
import { initialImage, type ImageType } from '../types/images.types';
//import { toast } from 'vue3-toastify';



const route = useRoute();
const image = reactive<ImageType>(initialImage)
const url = import.meta.env.VITE_API_URL
onMounted(async () => {
  try {
    const { data } = await client.get(`/images/${route.params.id}`) as { data: ImageType }
    Object.assign(image, data)
  } catch (error) {
    console.error(error)
  }
})


</script>
<style></style>