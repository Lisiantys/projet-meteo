<script setup>
import { useWeatherStore } from "../stores/weatherStore";
import { computed } from "vue";

const weatherStore = useWeatherStore();
const weather = computed(() => weatherStore.weather);
</script>

<template>
  <div class="container weather-info">
    <div v-if="weather">
      <h2>Météo pour {{ weather.name }}</h2>
      <p>{{ weather.main.temp }}°C</p>
      <img
        :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="weather.weather[0].description"
      />
    </div>
    <div>
      <router-link to="/" class="back-link">Retour</router-link>
    </div>
  </div>
</template>
