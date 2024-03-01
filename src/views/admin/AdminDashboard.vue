<template>
<div class="admin-dashboard">
    <h1>Hello, Admin</h1>

    <!-- Form Section -->
    <section class="form-section">
        <!-- <h2>Add New Event</h2> -->
        <AddEventForm />
    </section>

    <button @click="logout" class="logout-button">Logout</button>

    <!-- Footer navigation similar to EventList -->
    <footer>
      <div class="footer-icon" @click="navigateTo('AdminDashboard')">
        <i class="fas fa-home"></i>
        <span v-if="isActive('AdminDashboard')">•</span>
      </div>
      <div class="footer-icon" @click="navigateTo('AdminEventList')">
        <i class="fas fa-ticket-alt"></i>
        <span v-if="isActive('AdminEventList')">•</span>
      </div>
    </footer>
</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AddEventForm from '@/components/admin/AddEventForm.vue';

import '@fortawesome/fontawesome-free/css/all.css';

const store = useStore();
const router = useRouter();

const logout = async () => {
  await store.dispatch('logout');
  router.push('/');
};

// Navigation and Active State Logic
const navigateTo = (name) => {
  router.push({ name });
};

const isActive = (name) => {
  return router.currentRoute.value.name === name;
};
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
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

footer {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f9f9f9; /* Adjust according to your theme */
}

.footer-icon {
  text-align: center;
  cursor: pointer;
}

.footer-icon i {
  font-size: 24px; /* Adjust size as needed */
}

.footer-icon span {
  display: block;
  color: #4caf50; /* Active icon indicator */
}
</style>
