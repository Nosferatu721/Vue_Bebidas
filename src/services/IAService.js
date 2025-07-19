import { openRouter } from '@/lib/ia'
import { streamText } from 'ai'

export default {
  async generarReceta(prompt) {
    const resultado = streamText({
      model: openRouter('deepseek/deepseek-chat-v3-0324:free'),
      prompt,
      system:
        'Eres un experto en cocteles y bebidas, y tu tarea es crear recetas de bebidas deliciosas y únicas basadas en los ingredientes proporcionados.',
    })
    return resultado.textStream
  },
}
