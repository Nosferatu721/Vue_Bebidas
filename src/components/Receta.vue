<script setup>
import { useBebidasStore } from '@/stores/bebidas'
const storeBebidas = useBebidasStore()
const props = defineProps({
  receta: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="border-2 border-gray-200 shadow-lg">
    <div>
      <img
        class="w-full h-auto hover:scale-115 transition-transform hover:rotate-2"
        :src="receta.strDrinkThumb"
        :alt="`Imagen de la receta ${receta.strDrink}`"
      />
    </div>

    <div class="p-5">
      <h2 class="text-2xl font-bold text-center truncate">{{ receta.strDrink }}</h2>

      <button
        type="button"
        class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer"
        @click="storeBebidas.seleccionarReceta(receta.idDrink)"
      >
        Ver receta
      </button>
    </div>
  </div>
</template>
