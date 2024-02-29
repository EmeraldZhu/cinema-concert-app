import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Import your components directly
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import AdminEventList from '../views/admin/AdminEventList.vue';
import UserDashboard from '../views/user/UserDashboard.vue';
import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import UserProfile from '../views/profile/UserProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        const role = store.state.user.role;
        if (role === 'admin') {
          next({ name: 'AdminDashboard' });
        } else {
          next({ name: 'UserDashboard' });
        }
      } else {
        next();
      }
    }
  },
  { path: '/about', name: 'About', component: About },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin-event-list',
    name: 'AdminEventList',
    component: AdminEventList,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        next({ name: 'Home' });
      } else {
        next();
      }
    }
  },
  { path: '/signup', name: 'SignUp', component: SignUp },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isAuthReady = false;

getAuth().onAuthStateChanged(async (user) => {
  if (!isAuthReady) {
    isAuthReady = true;
    if (user) {
      await store.dispatch('fetchUserRole', { uid: user.uid });
    } else {
      store.commit('setUser', null);
    }
    router.push(router.currentRoute.value.fullPath);
  }
});

router.beforeEach((to, from, next) => {
  if (!isAuthReady) {
    // Delay navigation until auth state is confirmed
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      unsubscribe();
      next();
    });
  } else {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    const currentUser = store.state.user;

    if (requiresAuth && !currentUser) {
      next({ name: 'SignIn' });
    } else if (requiresAuth && requiresAdmin && (!currentUser || currentUser.role !== 'admin')) {
      next({ name: 'Home' }); // Redirect to a more appropriate route if needed
    } else {
      next();
    }
  }
});

export default router;
