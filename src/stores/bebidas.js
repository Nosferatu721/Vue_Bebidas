import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIServices from '@/services/APIServices'
import { useModalStore } from '@/stores/modal'
import { useFavoritosStore } from '@/stores/favoritos'

export const useBebidasStore = defineStore('bebidas', () => {
  const storeModal = useModalStore()
  const storeFavoritos = useFavoritosStore()
  const categorias = ref([])

  const busqueda = reactive({
    nombre: '',
    categoria: '',
  })

  const recetas = ref([])
  const recetaSeleccionada = ref({})

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

  async function seleccionarReceta(id) {
    const { drinks } = await APIServices.buscarReceta(id)
    recetaSeleccionada.value = drinks[0]
    storeModal.handleClick()
  }

  const existeEnFavoritos = computed(() => {
    return storeFavoritos.favoritos.some((favorito) => favorito.idDrink === recetaSeleccionada.value.idDrink)
  })

  onMounted(() => {
    obtenerCategorias()
  })

  return {
    categorias,
    busqueda,
    obtenerRecetas,
    recetas,
    seleccionarReceta,
    recetaSeleccionada,
    existeEnFavoritos,
  }
})
