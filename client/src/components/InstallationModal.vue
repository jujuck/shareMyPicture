<template>
  <VueFinalModal @update:model-value="val => emit('update:modelValue', val)">
    <div class="container p-3">
      <div class="bg-light rounded shadow-sm p-4">
        <div class="d-flex justify-content-between">
          <h2 class="h5 mb-3">📲 Installer cette application</h2>
          <button class="btn" @click="emit('update:modelValue', false)">
            X
          </button>
        </div>
        <p>Pour une meilleure expérience, il est nécessaire d’installer cette application sur votre appareil.</p>

        <h3 class="h6 mt-1">Pourquoi l’installer ?</h3>
        <ul class="list-unstyled ps-3">
          <li>✅ Une garantie d'accés aux photos que vous souhaitez partager</li>
          <li>✅ Utilisation plein écran, sans barre d’adresse</li>
        </ul>

        <p class="fw-bold mt-3 mb-1">Sur mobile Android :</p>
        <ol class="ps-3">
          <li>Appuyez sur le bouton <strong>menu ⋮</strong> en haut à droite de votre navigateur.</li>
          <li>Sélectionnez <strong>"Ajouter à l'écran d'accueil"</strong>.</li>
        </ol>

        <p class="fw-bold mt-3 mb-1">Sur iPhone (Safari) :</p>
        <ol class="ps-3">
          <li>Appuyez sur l’icône <strong>partager ⬆️</strong> en bas de l’écran.</li>
          <li>Sélectionnez <strong>"Sur l’écran d’accueil"</strong>.</li>
        </ol>

        <p class="text-muted small mt-3">Une fois installée, ferme ton navigateur et ouvre directement ton app
        </p>
      </div>
    </div>

    <slot />
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()
</script>
