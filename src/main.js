import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)

app.use(router)
app.use(store)

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Assuming there's an action named 'setUserFromAuth' to update user info in the store
    await store.dispatch('setUserFromAuth', user);
  } else {
    store.commit('setUser', null);
  }
  // Ensure the app mounts only after the auth state is confirmed
  if (!app._container) { // Prevents re-mounting the app
    app.mount('#app');
  }
});
