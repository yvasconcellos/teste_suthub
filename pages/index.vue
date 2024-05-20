<template>
  <div>
    <NavBar />
    <div class="container mx-auto mt-20 text-center">
      <div class="bg-gray-800 inline-block p-4 rounded ">
        <img src="../assets/images/logo-suthub.png" alt="Suthub Logo" class="mx-auto">
      </div>
      <h1 class="text-3xl font-bold">Bem-vindo ao Teste Técnico Suthub</h1>
      <p class="mt-4">Navegue pelo menu acima para acessar as funcionalidades disponíveis.</p>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'IndexPage',
  components: {
    NavBar
  }
}
</script>