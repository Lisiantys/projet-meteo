import { defineStore } from 'pinia';
import axios from 'axios';
import { API_KEY } from '../config';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    city: '',
    weather: null,
    error: null
  }),
  actions: {
    async fetchWeather() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${API_KEY}&units=metric`);
        this.weather = response.data;
        this.error = null;
      } catch (error) {
        this.error = 'Ville introuvable';
        this.weather = null;
      }
    }
  }
});
