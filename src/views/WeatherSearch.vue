<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '../stores/weatherStore';

const weatherStore = useWeatherStore();
const city = ref('');

const searchWeather = async () => {
  weatherStore.city = city.value;
  await weatherStore.fetchWeather();
  city.value = '';
};

const removeCity = (id) => {
  weatherStore.removeCity(id);
};
</script>

<template>
  <div class="container">
    <div class="input-group">
      <input v-model="city" placeholder="Entrez le nom de la ville" />
    </div>
    <button @click="searchWeather">Rechercher</button>
    <div v-if="weatherStore.error" class="error-message">{{ weatherStore.error }}</div>

    <div class="recent-searches" v-if="weatherStore.recentSearches.length">
      <h3>Liste des villes</h3>
      <ul>
        <!-- Affichage -->
        <li v-for="city in weatherStore.recentSearches" :key="city.id">
          <h4>{{ city.name }}</h4>
          <img
            :src="`http://openweathermap.org/img/wn/${city.icon}@2x.png`"
            :alt="city.description"
          />
          <p>{{ city.temp }}°C</p>
          <p>{{ city.description }}</p>
          <!-- Supression -->
          <button @click="removeCity(city.id)" class="remove-btn">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  list-style: none;
}

h3{
  text-align: center;
}

li{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #aaa;
  border-radius: 16px;
  padding-bottom: 24px;
}

li p{
  margin: 0;
  padding: 0;
}
</style>
