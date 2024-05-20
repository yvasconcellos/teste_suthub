<template>
  <div class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <NuxtLink to="/cadastro" class="text-white text-lg font-bold mr-4 hover:underline">Cadastro</NuxtLink>
        <NuxtLink to="/paises" class="text-white text-lg font-bold mr-4 hover:underline">Lista de Países</NuxtLink>
        <NuxtLink to="/grafico" class="text-white text-lg font-bold mr-4 hover:underline">Gráficos</NuxtLink>
        <NuxtLink to="/busca" class="text-white text-lg font-bold hover:underline">Busca por País</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
