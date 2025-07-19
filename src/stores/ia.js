import { ref } from 'vue'
import { defineStore } from 'pinia'
import IAService from '@/services/IAService'

export const useIAStore = defineStore('ia', () => {
  const prompt = ref('')
  const respuesta = ref('')
  const cargando = ref(false)

  async function generarReceta() {
    cargando.value = true
    const resultado = await IAService.generarReceta(prompt.value)
    for await (const chunk of resultado) {
      respuesta.value += chunk
    }
    cargando.value = false
  }

  return {
    prompt,
    respuesta,
    cargando,
    generarReceta,
  }
})
