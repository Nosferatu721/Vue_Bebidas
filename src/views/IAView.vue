<script setup>
import { useIAStore } from '@/stores/ia'
import { useNotificacionStore } from '@/stores/notificacion'
import Spinner from '@/components/Spinner.vue'

const storeIA = useIAStore()
const storeNotificacion = useNotificacionStore()

const handleSubmit = () => {
  // Validar si ya está generando una receta
  if (storeIA.cargando) {
    storeNotificacion.texto = 'Ya se está generando una receta, por favor espere.'
    storeNotificacion.error = true
    storeNotificacion.show = true
    storeNotificacion.mostrar()
    return
  }
  // Limpiar respuesta anterior
  storeIA.respuesta = ''
  // Validacion input
  if (!storeIA.prompt.trim()) {
    storeNotificacion.texto = 'Por favor, ingrese un prompt válido.'
    storeNotificacion.error = true
    storeNotificacion.show = true
    storeNotificacion.mostrar()
    return
  }
  storeIA.generarReceta()
  storeNotificacion.texto = 'Receta generada con éxito'
  storeNotificacion.error = false
  storeNotificacion.show = true
  storeNotificacion.mostrar()
  storeIA.prompt = ''
}
</script>

<template>
  <h1 class="text-6xl font-extrabold">Generar Receta con IA</h1>
  <div class="max-w-4xl mx-auto">
    <form class="flex flex-col space-y-3 py-10" @submit.prevent="handleSubmit">
      <div class="relative">
        <input
          name="prompt"
          id="prompt"
          class="border bg-white p-4 rounded-lg w-full border-slate-800"
          placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
          v-model="storeIA.prompt"
        />
        <button
          v-if="!storeIA.cargando"
          type="submit"
          aria-label="Enviar"
          class="cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </form>

    <div class="pb-10 whitespace-pre-wrap">
      {{ storeIA.respuesta }}
    </div>
    <Spinner v-if="storeIA.cargando" />
  </div>
</template>
