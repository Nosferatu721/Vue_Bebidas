import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useModalStore } from './modal'
import { useNotificacionStore } from './notificacion'

export const useFavoritosStore = defineStore('favoritos', () => {
  const storeModal = useModalStore()
  const storeNotificacion = useNotificacionStore()
  const favoritos = ref([])

  watch(
    favoritos,
    () => {
      localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    },
    { deep: true }
  )
  
  // Cargar favoritos del localStorage al iniciar la aplicación
  const cargarFavoritos = () => {
    const favoritosGuardados = localStorage.getItem('favoritos')
    if (favoritosGuardados) {
      favoritos.value = JSON.parse(favoritosGuardados)
    }
  }
  onMounted(() => {
    cargarFavoritos()
  })

  function agregarAFavoritos(receta) {
    if (!favoritos.value.some((fav) => fav.idDrink === receta.idDrink)) {
      favoritos.value.push(receta)
      storeModal.handleClick()
      storeNotificacion.texto = 'Receta agregada a favoritos'
      storeNotificacion.error = false
      storeNotificacion.mostrar()
    }
  }

  function eliminarDeFavoritos(idDrink) {
    favoritos.value = favoritos.value.filter((fav) => fav.idDrink !== idDrink)
    storeModal.handleClick()
    storeNotificacion.texto = 'Receta eliminada de favoritos'
    storeNotificacion.error = false
    storeNotificacion.mostrar()
  }

  return {
    favoritos,
    agregarAFavoritos,
    eliminarDeFavoritos,
  }
})
