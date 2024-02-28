import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
