<script setup>
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '@/stores/modal'
import { useBebidasStore } from '@/stores/bebidas'
import { useFavoritosStore } from '@/stores/favoritos'

const storeModal = useModalStore()
const storeBebidas = useBebidasStore()
const storeFavoritos = useFavoritosStore()

const formatearIngredientes = (receta) => {
  const ingredientes = []
  for (let i = 1; i <= 15; i++) {
    const ingrediente = receta[`strIngredient${i}`]?.trim()
    const medida = receta[`strMeasure${i}`]?.trim()
    if (ingrediente) {
      ingredientes.push({ ingrediente, medida: medida || '' })
    }
  }

  return ingredientes
}

const ingredientes = computed(() => {
  return formatearIngredientes(storeBebidas.recetaSeleccionada)
})

const instrucciones = computed(() => {
  return storeBebidas.recetaSeleccionada.strInstructionsES || storeBebidas.recetaSeleccionada.strInstructions || ''
})
</script>

<template>
  <TransitionRoot as="template" :show="storeModal.modal">
    <Dialog as="div" class="relative z-10" @close="storeModal.handleClick">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ storeBebidas.recetaSeleccionada.strDrink }}
                  </DialogTitle>

                  <img :src="storeBebidas.recetaSeleccionada.strDrinkThumb" :alt="storeBebidas.recetaSeleccionada.strDrink" />

                  <!-- Ingredientes -->
                  <DialogTitle as="h4" class="text-4xl text-gray-900 font-extrabold my-5">Ingredientes y Medidas</DialogTitle>
                  <ul class="list-disc pl-5">
                    <li v-for="(item, index) in ingredientes" :key="index" class="text-lg">
                      {{ item.ingrediente }}{{ item.medida ? ` - ${item.medida}` : '' }}
                    </li>
                  </ul>

                  <DialogTitle as="h4" class="text-4xl text-gray-900 font-extrabold my-5">Instrucciones</DialogTitle>
                  <p class="text-lg text-gray-500">{{ instrucciones }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="w-full rounded bg-gray-600 p-3 font-bold text-white shadow hover:bg-gray-500 cursor-pointer"
                  @click="storeModal.handleClick"
                >
                  Cerrar
                </button>

                <button
                  v-if="!storeBebidas.existeEnFavoritos"
                  class="w-full rounded bg-cyan-800 p-3 font-bold text-white shadow hover:bg-cyan-600 cursor-pointer"
                  @click="storeFavoritos.agregarAFavoritos(storeBebidas.recetaSeleccionada)"
                >
                  Agregar a Favoritos
                </button>
                <button
                  v-else
                  class="w-full rounded bg-red-800 p-3 font-bold text-white shadow hover:bg-red-600 cursor-pointer"
                  @click="storeFavoritos.eliminarDeFavoritos(storeBebidas.recetaSeleccionada.idDrink)"
                >
                  Eliminar de Favoritos
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
