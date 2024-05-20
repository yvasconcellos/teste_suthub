<template>
  <div>
    <NavBar />
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">Países da América</h1>
      <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="spinner border-8 border-t-8 border-gray-200 rounded-full h-32 w-32"></div>
      </div>

      <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <li v-for="country in countries" :key="country.alpha3Code" @click="openGoogleMaps(country)">
          <div class="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300">
            <h2 class="text-lg font-semibold">{{ country.name.common }}</h2>
            <p>{{ `Capital: ${country.capital}` }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const countries = ref([]);
const loading = ref(true);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/region/americas');
    if (response.data) {
      countries.value = response.data;
      loading.value = false;
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    loading.value = false;
    errorMessage.value = 'Erro ao buscar países. Por favor, tente novamente mais tarde.';
  }
});

const openGoogleMaps = (country) => {
  const url = `https://www.google.com/maps/place/${country.latlng[0]},${country.latlng[1]}`;
  window.open(url, '_blank');
};
</script>

<style scoped>
.spinner {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>