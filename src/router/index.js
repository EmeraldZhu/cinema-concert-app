import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Import Vuex store

// Import your components. Ensure these paths match your project structure.
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import UserDashboard from '../views/user/UserDashboard.vue';
import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
// Import any other components you need for your routes

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
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  // Define additional routes as needed
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards for handling authentication and role-based access
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const currentUser = store.state.user;

  if (requiresAuth && !currentUser) {
    // User not logged in, redirect to sign-in page
    next({ name: 'SignIn' });
  } else if (requiresAuth && requiresAdmin && (!currentUser || currentUser.role !== 'admin')) {
    // User is not an admin, redirect to home page or a "not authorized" page
    next({ name: 'Home' });
  } else {
    // Proceed to the route
    next();
  }
});

export default router;
