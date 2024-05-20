<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Busca por País</h1>
        <div class="mb-4 flex">
            <input v-model="searchQuery" type="text" class="form-input w-full" placeholder="Digite o nome do país...">
            <button @click="search"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-4">Pesquisar</button>
        </div>
        <div v-if="loading">
            <p>Carregando...</p>
        </div>
        <div v-else>
            <div v-if="searchResult">
                <h2 class="text-xl font-semibold mb-2">{{ searchResult.name.common }}</h2>
            </div>
            <div v-else>
                <p>{{ errorMessage }}</p>
            </div>
            <div v-if="commonLanguages.length > 0">
                <h2 class="text-lg font-semibold mt-4">Idiomas Oficiais</h2>
                <ul>
                    <li v-for="language in commonLanguages" :key="language" @click="filterByLanguage(language)"
                        class="cursor-pointer hover:text-blue-500">{{ language }}</li>
                </ul>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 flex justify-center items-center">
            <div class="bg-gray-600 bg-opacity-75 absolute inset-0"></div>
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                <h2 class="text-2xl font-semibold mb-4 text-blue-600">Países com o idioma: {{ selectedLanguage }}</h2>
                <div v-if="loadingCountries" class="text-center">
                    <p>Carregando países...</p>
                </div>
                <div v-else>
                    <ul v-if="countriesWithSelectedLanguage.length > 0">
                        <li v-for="country in countriesWithSelectedLanguage" :key="country.name.common">
                            {{ country.name.common }}
                        </li>
                    </ul>
                    <div v-else>
                        <p>{{ errorMessage }}</p>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button @click="closeModal"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref('');
const searchResult = ref(null);
const commonLanguages = ref([]);
const loading = ref(false);
const showModal = ref(false);
const selectedLanguage = ref('');
const countriesWithSelectedLanguage = ref([]);
const errorMessage = ref('');
const loadingCountries = ref(false);

const search = async () => {
    if (searchQuery.value) {
        loading.value = true;
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery.value}`);
            if (response.data && response.data.length > 0) {
                searchResult.value = response.data[0];
                const languages = Object.values(response.data[0].languages);
                commonLanguages.value = languages;
                errorMessage.value = '';
            } else {
                searchResult.value = null;
                commonLanguages.value = [];
                errorMessage.value = 'Nenhum país encontrado para a busca atual.';
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            searchResult.value = null;
            commonLanguages.value = [];
            errorMessage.value = 'Ocorreu um erro ao buscar os países.';
        } finally {
            loading.value = false;
        }
    } else {
        searchResult.value = null;
        commonLanguages.value = [];
        errorMessage.value = '';
    }
};

const filterByLanguage = async (language) => {
    try {
        loadingCountries.value = true;
        showModal.value = true;
        const response = await axios.get(`https://restcountries.com/v3.1/lang/${language}`);
        if (response.data && response.data.length > 0) {
            showModal.value = true;
            selectedLanguage.value = language;
            countriesWithSelectedLanguage.value = response.data;
            console.log('Countries with selected language:', countriesWithSelectedLanguage.value);
        } else {
            searchResult.value = null;
            showModal.value = false;
            selectedLanguage.value = '';
            countriesWithSelectedLanguage.value = [];
        }
    } catch (error) {
        console.error('Error fetching countries by language:', error);
        showModal.value = true;
        selectedLanguage.value = '';
        countriesWithSelectedLanguage.value = [];
        errorMessage.value = 'Ocorreu um erro ao buscar os países com esse idioma.';
    } finally {
        loadingCountries.value = false;
    }
};

const closeModal = () => {
    showModal.value = false;
};
</script>