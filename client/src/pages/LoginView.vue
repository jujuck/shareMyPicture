<template>
  <main class="container">
    <h1 class="text-center m-5">Bienvenu</h1>
    <form class="border m-2 p-3" @submit="signUpSubmission">
      <h3 class="text-center m-3">Connectez vous pour continuer</h3>
      <div class="form-group">
        <label aria-label="email" htmlFor="email">
          Email
        </label>
        <input id="email" v-model="login.email" type="email" required class="form-control" name="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" />
      </div>
      <div class="form-group">
        <label aria-label="password" htmlFor="password">
          Mot de passe
        </label>
        <input id="password" v-model="login.password" class="form-control" type="password" required minLength={8}
          name="password" />
      </div>
      <button type="submit" class="btn btn-success">
        Se connecter
      </button>
    </form>
  </main>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import client from '../services/client';
import { toast } from 'vue3-toastify';
import { useRouter } from "vue-router";
import { useUserStore } from '../stores/user';

type LoginType = {
  email: string;
  password: string;
}

const login = reactive<LoginType>({ email: "", password: "" })
const router = useRouter();
const { setIsAdmin } = useUserStore();

const signUpSubmission = async ($event: Event) => {
  $event.preventDefault();
  try {
    const { data } = await client.post("/users/signin", login) as { data: { isAdmin: boolean } };
    if (data.isAdmin) {
      setIsAdmin(data.isAdmin)
      setTimeout(() => {
        router.push(`/gallery`)
      }, 1500)
      toast.success("Connexion en cours")
    } else {

      setTimeout(() => {
        router.push(`/`)
      }, 1500)
      toast.error("Informations erronées")
    }
  } catch (error) {
    toast.error("Une erreur est survenue")
    console.log(error)
  }
};
</script>
<style lang="">

</style>