<script setup>
import { useBebidasStore } from '@/stores/bebidas'
import Receta from '@/components/Receta.vue'

const storeBebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Inicio</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10">
    <Receta v-if="storeBebidas.recetas.length" v-for="receta in storeBebidas.recetas" :key="receta.idDrink" :receta="receta" />
    <p v-else class="text-center text-2xl font-bold col-span-full">No hay recetas aún</p>
  </div>
</template>
