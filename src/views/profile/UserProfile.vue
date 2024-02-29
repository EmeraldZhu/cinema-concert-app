<template>
    <div class="profile-container">
      <h1>User Profile</h1>
      <form @submit.prevent="updateProfile">
        <div>
          <label for="displayName">Name:</label>
          <input id="displayName" type="text" v-model="displayName" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" disabled />
        </div>
        <!-- Add more fields as needed -->
        <button type="submit">Update Profile</button>
      </form>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const displayName = ref('');
const email = ref('');

// Assuming the user object in the store contains email and displayName
onMounted(() => {
    const user = store.state.user;
    if (user) {
      displayName.value = user.displayName || '';
      email.value = user.email || '';
    }
});
  
const updateProfile = () => {
    // Dispatch an action to update the user's profile
    store.dispatch('updateUserProfile', { displayName: displayName.value });
    // Implement the updateUserProfile action in your Vuex store
};
</script>
  
<style>
.profile-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

label {
    display: block;
}

input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
}

button {
    cursor: pointer;
}
</style>
  