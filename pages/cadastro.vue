<template>
  <div>
    <NavBar />
    <div class="bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-4">
        <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">Cadastro</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Data de Nascimento</label>
            <input v-model="dob" type="date" class="form-input w-full border-gray-300 rounded-md" required
              :max="maxDate" :min="minDate">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Nome Completo</label>
            <input v-model.trim="fullName" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe seu nome completo" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">CPF</label>
            <input v-model="cpf" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe seu CPF" required @blur="validateCPF" v-mask="'###.###.###-##'">
            <span v-if="cpfError" class="text-red-500 text-sm mt-1">CPF inválido</span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Espécie do Pet</label>
            <select v-model="petSpecies" class="form-select w-full border-gray-300 rounded-md" required>
              <option value="">Selecione</option>
              <option value="cão">Cão</option>
              <option value="gato">Gato</option>
            </select>
          </div>
          <div class="mb-4" v-if="petSpecies">
            <label class="block text-gray-700 mb-2">Raça do Pet</label>
            <select v-model="petBreed" class="form-select w-full border-gray-300 rounded-md" required>
              <option value="">Selecione</option>
              <option v-for="breed in availableBreeds" :key="breed" :value="breed">{{ breed }}</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div class="mb-4" v-if="petBreed === 'outro'">
            <label class="block text-gray-700 mb-2">Outra Raça</label>
            <input v-model.trim="otherBreed" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe a raça do pet" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Renda Mensal</label>
            <div class="flex items-center">
              <span
                class="inline-block bg-gray-200 py-2 px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-700">R$</span>
              <input v-model.number="monthlyIncome" type="number" class="form-input w-full border-gray-300 rounded-r-md"
                placeholder="Informe sua renda mensal" required min="1000">
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">CEP</label>
            <input v-model.trim="cep" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe seu CEP" required @blur="(e) => validateCEP(false)" v-mask="'#####-###'">
            <span v-if="cepError" class="text-red-500 text-sm mt-1">CEP inválido</span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Rua</label>
            <input v-model.trim="street" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe sua rua" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Bairro</label>
            <input v-model.trim="neighborhood" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe seu bairro" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Cidade</label>
            <input v-model.trim="city" type="text" class="form-input w-full border-gray-300 rounded-md"
              placeholder="Informe sua cidade" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Estado</label>
            <input v-model.trim="state" @input="stateToUpper" type="text"
              class="form-input w-full border-gray-300 rounded-md" placeholder="Informe seu estado" required
              maxlength="2">
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">Enviar</button>
          </div>
        </form>
      </div>
      <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center px-4">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">Confirmação dos Dados</h2>
          <p><strong>Nome Completo:</strong> {{ fullName }}</p>
          <p><strong>Data de Nascimento: </strong>{{ formatDate(dob) }}</p>
          <p><strong>CPF:</strong> {{ cpf }}</p>
          <p><strong>Espécie do Pet:</strong> {{ petSpecies }}</p>
          <p><strong>Raça do Pet:</strong> {{ petBreed === 'outro' ? otherBreed : petBreed }}</p>
          <p><strong>Renda Mensal:</strong> R$ {{ monthlyIncome }}</p>
          <p><strong>CEP:</strong> {{ cep }}</p>
          <p><strong>Rua:</strong> {{ street }}</p>
          <p><strong>Bairro:</strong> {{ neighborhood }}</p>
          <p><strong>Cidade:</strong> {{ city }}</p>
          <p><strong>Estado:</strong> {{ state }}</p>
          <div class="flex justify-end mt-4">
            <button @click="closeModal"
              class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">Fechar</button>
            <button @click="submitData"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const fullName = ref('');
const dob = ref('');
const cpf = ref('');
const petSpecies = ref('');
const petBreed = ref('');
const otherBreed = ref('');
const monthlyIncome = ref('');
const cep = ref('');
const street = ref('');
const neighborhood = ref('');
const city = ref('');
const state = ref('');
const cpfError = ref(false);
const cepError = ref(false);
const showModal = ref(false);

const maxDate = computed(() => {
  const today = new Date();
  const maxYear = today.getFullYear() - 18;
  return `${maxYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
});

const minDate = computed(() => {
  const today = new Date();
  const minYear = today.getFullYear() - 65;
  return `${minYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
});

const availableBreeds = computed(() => {
  return petSpecies.value === 'cão'
    ? ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Chihuahua']
    : ['Persa', 'Siamês', 'Maine Coon', 'Sphynx', 'Ragdoll'];
});

const validateCEP = (submit) => {
  const cepValue = cep.value.replace(/\D/g, '');
  if (cepValue.length !== 8) {
    cepError.value = true;
    return false
  } else {
    cepError.value = false;
    if (submit) {
      return true
    }
    return fetchAddress();
  }
};

const fetchAddress = async () => {
  if (!cepError.value) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`);
      if (response.data) {
        street.value = response.data.logradouro;
        neighborhood.value = response.data.bairro;
        city.value = response.data.localidade;
        state.value = response.data.uf;
        return true
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      alert('Erro ao buscar endereço. Verifique se o CEP está correto.');
      return false
    }
  }
};

const validateCPF = () => {
  const cpfValue = cpf.value.replace(/\D/g, '');

  if (cpfValue.length !== 11 || /^(\d)\1*$/.test(cpfValue)) {
    cpfError.value = true;
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpfValue.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpfValue.substring(9, 10))) {
    cpfError.value = true;
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpfValue.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpfValue.substring(10, 11))) {
    cpfError.value = true;
    return false;
  }

  cpfError.value = false;
  return true;
};

const stateToUpper = () => {
  state.value = state.value.toUpperCase();
};

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const handleSubmit = () => {
  if (validateCPF() && validateCEP(true)) {
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
};

const submitData = () => {
  showModal.value = false;
};
</script>