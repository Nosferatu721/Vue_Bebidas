<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useBebidasStore } from '@/stores/bebidas'

const route = useRoute()
const store = useBebidasStore()

const inInicio = computed(() => route.name === 'inicio')

const handleSubmit = () => {
  store.obtenerRecetas()
}
</script>

<template>
  <header class="bg-slate-800 text-white" :class="{ header: inInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img src="/img/logo.svg" alt="Logotipo" class="w-32" />
          </RouterLink>
        </div>

        <nav class="flex gap-4">
          <RouterLink :to="{ name: 'inicio' }" class="text-white font-bold uppercase text-lg hover:text-amber-500 transition"> Inicio </RouterLink>
          <RouterLink :to="{ name: 'favoritos' }" class="text-white font-bold uppercase text-lg hover:text-amber-500 transition">
            Favoritos
          </RouterLink>
        </nav>
      </div>

      <form v-if="inInicio" class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-24 p-10 rounded-lg shadow space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="ingrediente">Nombre o Ingrediente</label>
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-amber-50 text-gray-800"
            placeholder="Buscar bebida por nombre o ingrediente"
            v-model="store.busqueda.nombre"
          />
        </div>
        <div class="space-y-4">
          <label class="block text-white uppercase font-extrabold text-lg" for="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none bg-amber-50 text-gray-800"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="categoria in store.categorias" :key="categoria.strCategory" :value="categoria.strCategory">
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>

        <input
          type="submit"
          class="w-full p-3 rounded-lg bg-amber-700 text-white font-bold hover:bg-amber-800 transition cursor-pointer uppercase"
          value="Buscar"
        />
      </form>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
