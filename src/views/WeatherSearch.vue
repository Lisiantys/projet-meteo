<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '../stores/weatherStore';
import { useRouter } from 'vue-router';

const weatherStore = useWeatherStore();
const city = ref('');
const router = useRouter();

const searchWeather = async () => {
  weatherStore.city = city.value;
  await weatherStore.fetchWeather();
  if (!weatherStore.error) {
    router.push('/weather');  // Corrigé le chemin pour correspondre au chemin défini dans le routeur
  }
};
</script>

<template>
  <div class="container">
    <div class="input-group">
      <input v-model="city" placeholder="Entrez le nom de la ville" />
    </div>
    <button @click="searchWeather">Rechercher</button>
    <div v-if="weatherStore.error" class="error-message">{{ weatherStore.error }}</div>
  </div>
</template>
