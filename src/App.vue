<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
import Notificacion from './components/Notificacion.vue'
</script>

<template>
  <Notificacion />
  <Header />

  <main class="container mx-auto mt-10">
    <RouterView />
  </main>

  <Modal />
</template>
