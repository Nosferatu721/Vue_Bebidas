import api from '@/lib/axios'

const obtenerCategorias = async () => {
  try {
    const { data } = await api.get('/list.php?c=list')
    return data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
}
const buscarRecetas = async ({ categoria, nombre }) => {
  try {
    const { data } = await api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    return data
  } catch (error) {
    console.error('Error al buscar recetas:', error)
  }
}
const buscarReceta = async (id) => {
  try {
    const { data } = await api.get(`/lookup.php?i=${id}`)
    return data
  } catch (error) {
    console.error('Error al buscar receta por ID:', error)
  }
}

export default {
  obtenerCategorias,
  buscarRecetas,
  buscarReceta
}
