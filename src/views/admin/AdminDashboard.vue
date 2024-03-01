<template>
<div class="admin-dashboard">
    <h1>Hello, Admin</h1>

    <!-- Form Section -->
    <section class="form-section">
        <!-- <h2>Add New Event</h2> -->
        <AddEventForm />
    </section>

    <button @click="logout" class="logout-button">Logout</button>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AddEventForm from '@/components/admin/AddEventForm.vue';

const store = useStore();
const router = useRouter();

const logout = async () => {
  await store.dispatch('logout');
  router.push('/');
};
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-dashboard h1 {
  color: #333;
  margin-bottom: 20px;
}

.form-section {
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.logout-button {
  padding: 8px 16px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.logout-button:hover {
  background-color: #c9302c;
}

/* Additional styling for form inputs and buttons inside AddEventForm can be added here */
</style>
