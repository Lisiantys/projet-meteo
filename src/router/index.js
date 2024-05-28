import { createRouter, createWebHistory } from 'vue-router';
import WeatherSearch from '../views/WeatherSearch.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: WeatherSearch },
  ]
})

export default router
