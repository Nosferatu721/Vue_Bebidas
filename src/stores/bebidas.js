import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import APIServices from '@/services/APIServices'

export const useBebidasStore = defineStore('bebidas', () => {
  const categorias = ref([])

  const busqueda = reactive({
    nombre: '',
    categoria: '',
  })

  const recetas = ref([])

  ////////////
  async function obtenerCategorias() {
    try {
      const data = await APIServices.obtenerCategorias()
      categorias.value = data.drinks
    } catch (error) {
      console.error('Error al obtener categorías:', error)
    }
  }

  async function obtenerRecetas() {
    const { drinks } = await APIServices.buscarRecetas(busqueda)
    recetas.value = drinks
  }

  onMounted(() => {
    obtenerCategorias()
  })

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
  }
})
