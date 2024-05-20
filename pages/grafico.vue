<template>
  <div>
    <NavBar />
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">
        Gráfico de Área e População dos Países da América
      </h1>
      <div v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</div>

      <div v-else class="bg-white p-6 rounded-lg shadow-md overflow-auto">
        <div class="relative" style="height: 75vh;">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'ChartPage',
  setup() {
    const chartCanvas = ref(null);
    let chart = null;
    const errorMessage = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/region/americas');
        const countries = response.data;

        const countryNames = countries.map(country => country.name.common);
        const countryAreas = countries.map(country => country.area);
        const countryPopulations = countries.map(country => country.population);

        if (chartCanvas.value) {
          const ctx = chartCanvas.value.getContext('2d');

          if (ctx) {
            chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: countryNames,
                datasets: [
                  {
                    label: 'Área (km²)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: countryAreas
                  },
                  {
                    label: 'População',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: countryPopulations
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        var label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += context.parsed.y.toLocaleString();
                        }
                        return label;
                      }
                    }
                  }
                }
              }
            });
          } else {
            console.error('Failed to acquire context from the canvas element.');
          }
        } else {
          console.error('Canvas element not found.');
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        errorMessage.value = 'Erro ao buscar países. Por favor, tente novamente mais tarde.';
      }
    });

    return {
      chartCanvas,
      chart,
      errorMessage
    };
  }
};
</script>

<style scoped>
  .relative {
    height: 75vh;
  }
</style>