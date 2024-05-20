<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold mb-6 text-center text-blue-600">Países da América</h1>
  
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="spinner border-8 border-t-8 border-gray-200 rounded-full h-32 w-32"></div>
      </div>
  
      <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <li v-for="country in filteredCountries" :key="country.alpha3Code" @click="openGoogleMaps(country)">
          <div class="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition duration-300">
            <h2 class="text-lg font-semibold">{{ country.name.common }}</h2>
            <p>{{ `Capital: ${country.capital}` }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const countries = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      if (response.data) {
        countries.value = response.data.filter(country => country.region === 'Americas');
        loading.value = false;
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  });
  
  const filteredCountries = computed(() => {
    return countries.value.filter(country => country.region === 'Americas');
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  