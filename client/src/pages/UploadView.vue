<template>
  <form @submit="onSubmit">
    <div class="wedding_heading flex text-center mt-5">
      <h1>Chargez votre image ici !!!</h1>
      <h3>Laissez nous un petit mot également</h3>
    </div>
    <div class="wedding_form">
      <label for="picture">
        Charge ta photo
      </label>
      <input type="file" class="mobile" required capture="environment" accept="image/*" @change="onFileChanged($event)">
      <label for="name">
        Ton nom et prénom
      </label>
      <input id="name" v-model="name" type="text" required minlength="4" />
      <label for="tags">
        Tag des personnes (si tu le veux)
      </label>
      <input id="tags" v-model="tags" type="text" required />
      <label for="description">
        Une petite description
      </label>
      <textarea id="description" v-model="description" required minlength="10"></textarea>
    </div>
    <div class="wedding_btn">
      <button type="submit">Partager</button>
    </div>
  </form>
  <section>
    <small>
      L'ensemble des images partagées est stocké sur notre ordinateur, dans cette même salle. Aucune image ne sera
      partagée en dehors de l'assemblée ici présente
    </small>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import client from '../services/client';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from "vue-router";
import type { ImageType } from '../types/images.types';
import imageCompression from 'browser-image-compression';

const name = ref<string>("");
const tags = ref<string>("");
const description = ref<string>("");
const file = ref<File | null>();
const router = useRouter()

const onFileChanged = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    imageCompression(target.files[0], options)
      .then(compressedFile => {
        file.value = compressedFile;
        toast.success("Fichier pré chargé avec succès")
      })
      .catch(error => {
        console.error('Erreur compression:', error);
        toast.error("Erreur lors de la compression de l'image.");
      });
  }
}

const onSubmit = async ($event: Event) => {
  $event.preventDefault();

  try {

    if (file.value) {
      const formData = new FormData();

      formData.append("images", file.value);
      formData.append("name", name.value);
      formData.append("tags", tags.value);
      formData.append("description", description.value);

      const { data } = await client.post(`images`, formData) as { data: ImageType };

      if (data.id) {
        toast.success("Votre image a bien été enregistrée, Merci");

        name.value = "";
        tags.value = "";
        description.value = "";
        setTimeout(() => {
          router.push(`/mon-partage/${data.id}`)
        }, 1500)
      } else {
        toast.error("Une erreur est survenue")
      }
    } else {
      toast.error("Photo non conforme")
      throw new Error("Invalid File")
    }

  } catch (error) {
    toast.error("Une erreur est survenue")
    console.error("There was an error uploading the image", error);
  }
}
</script>
<style lang="">

</style>
