import { defineStore } from 'pinia';
import axios from 'axios';
import { API_KEY } from '../config';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    city: '', //Nom de la ville en entrée
    weather: null, //Contient l'ensemble des données retourné par l'api
    error: null, //message d'erreur
    recentSearches: [] //ajout des données de l'api stocké dans weather . Tableau objets
  }),
  actions: {
    async fetchWeather() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${API_KEY}&units=metric&lang=fr`);
        this.weather = response.data;
        this.error = null;
        this.addRecentSearch(this.weather);
      } catch (error) {
        this.error = 'Ville introuvable';
        this.weather = null;
      }
    },
    addRecentSearch(weatherData) {
      const cityName = weatherData.name.toLowerCase();
      const id = Date.now(); //utilisation de la date comme id
      this.recentSearches = this.recentSearches.filter(
        search => search.name.toLowerCase() !== cityName
      );
      this.recentSearches.unshift({
        id: id,
        name: weatherData.name,
        temp: Math.round(weatherData.main.temp),
        icon: weatherData.weather[0].icon,
        description: weatherData.weather[0].description
      });
      if (this.recentSearches.length > 4) {
        this.recentSearches.pop();
      }
    },
    removeCity(id){
      this.recentSearches = this.recentSearches.filter(
        search => search.id !== id
      );
    },
  },
  persist: true,
});
