<template>
  <div class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center px-4 py-1">
      <div class="text-white text-lg font-bold">
        <NuxtLink to="/" class="hover:underline">Inicio</NuxtLink>
      </div>
      <div class="hidden md:flex space-x-4">
        <NuxtLink to="/cadastro" class="text-white text-lg font-bold hover:underline">Cadastro</NuxtLink>
        <NuxtLink to="/paises" class="text-white text-lg font-bold hover:underline">Lista de Países</NuxtLink>
        <NuxtLink to="/busca" class="text-white text-lg font-bold hover:underline">Busca por País</NuxtLink>
        <NuxtLink to="/grafico" class="text-white text-lg font-bold hover:underline">Gráficos</NuxtLink>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden bg-gray-800 px-4">
      <NuxtLink to="/cadastro" class="block text-white text-lg font-bold py-1 hover:underline">Cadastro</NuxtLink>
      <NuxtLink to="/paises" class="block text-white text-lg font-bold py-1 hover:underline">Lista de Países</NuxtLink>
      <NuxtLink to="/busca" class="block text-white text-lg font-bold py-1 hover:underline">Busca por País</NuxtLink>
      <NuxtLink to="/grafico" class="block text-white text-lg font-bold py-1 hover:underline">Gráficos</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>