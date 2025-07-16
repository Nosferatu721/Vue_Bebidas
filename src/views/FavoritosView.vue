<script setup>
import { useFavoritosStore } from '@/stores/favoritos'
import Receta from '@/components/Receta.vue'

const favoritosStore = useFavoritosStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Favoritos</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">
    <Receta v-if="favoritosStore.favoritos.length" v-for="receta in favoritosStore.favoritos" :key="receta.idDrink" :receta="receta" />

    <p v-else class="text-center text-2xl font-bold col-span-full">No hay favoritos aún</p>
  </div>
</template>

<style scoped></style>
