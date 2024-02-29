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
        <!-- Displaying the user's role (Read-only) -->
        <div>
          <label for="role">Role:</label>
          <input id="role" type="text" v-model="role" disabled />
        </div>
        <button type="submit">Update Profile</button>
        <button @click="deleteAccount" class="delete-account-btn">Delete Account</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();

  const displayName = ref('');
  const email = ref('');
  const role = ref(''); // Added role ref
  
  // Populate fields with user data on component mount
  onMounted(() => {
    const user = store.state.user;
    if (user) {
      displayName.value = user.displayName || '';
      email.value = user.email || '';
      role.value = user.role || ''; // Populate role
    }
  });
  
  const updateProfile = async () => {
    try {
      // Dispatch an action to update the user's profile
      await store.dispatch('updateUserProfile', { displayName: displayName.value });
      alert('Profile updated successfully.'); // Provide feedback on successful update
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile.'); // Provide feedback on failure
    }
  };

  const deleteAccount = async () => {
  const confirmDelete = confirm('Are you sure you want to delete your account? This cannot be undone.');
  if (confirmDelete) {
    try {
      await store.dispatch('deleteUserAccount');
      alert('Account deleted successfully.');
      router.push('/'); // Redirect to home page or sign-in page after account deletion
    } catch (error) {
      alert('Failed to delete account. Please try again.');
    }
  }
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

.delete-account-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
}

.delete-account-btn:hover {
  background-color: #ff7875;
}
</style>
  