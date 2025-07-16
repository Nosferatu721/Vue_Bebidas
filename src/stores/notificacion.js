import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore("notificacion", () => {
  const texto = ref("");
  const error = ref(false);
  const show = ref(false);

  function mostrar() {
    show.value = true;
    setTimeout(() => {
      show.value = false;
      texto.value = "";
      error.value = false;
    }, 3000);
  }

  function ocultar() {
    show.value = false;
    texto.value = "";
    error.value = false;
  }

  return { show, mostrar, ocultar };
});
