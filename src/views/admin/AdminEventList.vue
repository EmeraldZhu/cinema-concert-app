<template>
  <div class="event-list-container">
    <h1>My Events</h1>
    <div class="events">
      <!-- Events are rendered here -->
      <div 
        v-for="event in events" 
        :key="event.id" 
        class="event-card" 
        @click="selectEvent(event)"
      >
        <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
        <h2>{{ event.title }}</h2>
      </div>
    </div>
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

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  setup() {
    const events = ref([]);
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      events.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });

    const selectEvent = (event) => {
      // Logic to show EventDetailsModal - will be provided later
    };

    const navigateTo = (name) => {
      router.push({ name });
    };

    const isActive = (name) => {
      return route.name === name;
    };

    return { events, selectEvent, navigateTo, isActive };
  },
};
</script>

<style>
.event-list-container {
  color: #fff;
  background-color: #121212; /* darkish-bluish background */
  height: 100vh;
  overflow-y: auto; /* For scrolling through event cards */
}

h1 {
  text-align: center;
  padding: 1rem;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-bottom: 5rem; /* Space for the footer */
}

.event-card {
  width: 90%;
  max-width: 340px;
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: scale(1.03);
}

.event-poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

h2 {
  margin: 0.5rem;
  font-size: 1.2rem;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #222;
  display: flex;
  justify-content: space-evenly;
  padding: 1rem 0;
}

.footer-icon {
  text-align: center;
  cursor: pointer;
}

.footer-icon i {
  font-size: 1.5rem;
}

.footer-icon span {
  display: block;
  color: #4caf50; /* Active icon indicator */
}

/* Include FontAwesome CSS */
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
</style>
