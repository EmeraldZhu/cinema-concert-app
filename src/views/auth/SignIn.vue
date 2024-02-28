<template>
    <div class="auth-container">
      <h1>Sign In</h1>
      <form @submit.prevent="signIn">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>
      <router-link to="/signup">Don't have an account? Sign Up</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const router = useRouter();
  const store = useStore();
  const { signInUser, error } = useAuth();
  
  const email = ref('');
  const password = ref('');
  
  const signIn = async () => {
    try {
      await signInUser(email.value, password.value);
      // The user's role is fetched and stored in Vuex during the signInUser process
      // Now you can access the user's role from the Vuex store
      const role = store.state.user.role; // Assuming the role is stored in the user object
      if (role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/user-dashboard');
      }
    } catch (err) {
      // Handle error, for example, show an error message to the user
      console.error(err);
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: #333;
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  input, button {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
  }
  input {
    border: 1px solid #555;
    background: #222;
    color: #ddd;
  }
  button {
    background: #555;
    color: #fff;
    cursor: pointer;
  }
  button:hover {
    background: #666;
  }
  p {
    color: red;
  }
  </style>
  