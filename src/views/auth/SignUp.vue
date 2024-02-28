<template>
    <div class="auth-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="register">
        <input type="text" v-model="displayName" placeholder="Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <select v-model="role" required>
          <option value="regular" selected>Regular User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <router-link to="/signin">Already have an account? Sign In</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '@/composables/useAuth';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  const { createUser, error } = useAuth();
  
  const email = ref('');
  const password = ref('');
  const displayName = ref('');
  const role = ref('regular');
  
  const register = async () => {
  try {
    await store.dispatch('register', {
      email: email.value,
      password: password.value,
      displayName: displayName.value,
      role: role.value
    });
    router.push('/signin');
  } catch (error) {
    console.error(error.message);
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
  input, select, button {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
  }
  input, select {
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
  </style>
  