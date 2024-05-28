import { createRouter, createWebHistory } from 'vue-router';
import WeatherSearch from '../views/WeatherSearch.vue';
import WeatherDisplay from '../views/WeatherDisplay.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: WeatherSearch },
    { path: '/weather', component: WeatherDisplay }
  ]
})

export default router
