<template lang="">
  <form @submit="onSubmit">
    <div class="wedding_heading flex text-center mt-5">
      <h1>Chargez votre image ici !!!</h1>
      <h3>Laissez nous un petit mot également</h3>
    </div>
    <div class="wedding_form">
      <label for="picture">
        Charge ta photo
      </label>
      <input type="file" id="picture" required @change="onFileChanged($event)"/>
      <label for="name">
        Ton nom et prénom
      </label>
      <input type="text" id="name" required v-model="name"/>
      <label for="tags">
        Tag des personnes (si tu le veux)
      </label>
      <input type="text" id="tags" v-model="tags"/>
      <label for="description">
        Une petite description
      </label>
      <textarea id="description" required v-model="description"></textarea>
    </div>
    <div class="wedding_btn">
      <button type="submit">Partager</button>
    </div>
  </form>
  <section>
    <small>
        L'ensemble des images partagées est stocké sur notre ordinateur, dans cette même salle. Aucune image ne sera partagée en dehors de l'assemblée ici présente
    </small>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import client from '../services/client'

const name = ref < string > ("");
const tags = ref < string > ("");
const description = ref < string > ("");
const file = ref < File | null > ();

const onFileChanged = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
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
      formData.append("descriptiony", description.value);

      await client.post(`images`, formData);
    } else {
      throw new Error("Invalid File")
    }

  } catch (error) {
    console.error("There was an error uploading the image", error);
  }
}

</script>
<style lang="">

</style>