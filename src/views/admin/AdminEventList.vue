<template>
    <div class="event-list-container">
    <h1>Event List</h1>
    <div class="event-list">
      <div 
        class="event-card" 
        v-for="event in events" 
        :key="event.id" 
        @click="showEventDetails(event)"
      >
        <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
        <div class="event-info">
          <h3>{{ event.title }}</h3>
          <div class="event-rating">
            <span>IMDB</span>
            <strong>{{ event.imdbRating }}</strong>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Placeholder for the Event Details Modal -->
    <!-- This is where you will integrate the UI you provide later -->
    <EventDetailsModal v-if="selectedEvent" :event="selectedEvent" @close="selectedEvent = null" />

    <!-- Footer Navigation -->
    <footer>
      <nav class="footer-nav">
        <div @click="navigateTo('AdminDashboard')" :class="{ active: isActive('AdminDashboard') }">
          <i class="fas fa-home"></i>
          <span>Home</span>
          <div v-if="isActive('AdminDashboard')" class=""></div>
        </div>
        <div @click="navigateTo('AdminEventList')" :class="{ active: isActive('EventList') }">
          <i class="fas fa-film"></i>
          <span>Events</span>
          <div v-if="isActive('AdminEventList')" class="dot"></div>
        </div>
      </nav>
    </footer>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import EventDetailsModal from '@/components/admin/EventDetailsModal.vue';
// Assume you have a utility to fetch events and their IMDb ratings
// import { getEventsWithRatings } from '@/api';
  
export default {
    components: {
      EventDetailsModal,
    },
    setup() {
      const events = ref([]);
      const route = useRoute();
      const router = useRouter();
      const selectedEvent = ref(null);
  
      onMounted(async () => {
        const querySnapshot = await getDocs(collection(db, 'events'));
        events.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Mock IMDb rating - you might want to fetch this from TMDB API
          imdbRating: 'N/A',
        }));
      });

      onMounted(async () => {
        events.value = await getEventsWithRatings();
      });
  
      const showEventDetails = (event) => {
        selectedEvent.value = event;
      };

      const navigateTo = (name) => {
        router.push({ name });
      };

      const isActive = (name) => {
        return route.name === name;
      };
  
      return { events, selectedEvent, showEventDetails, navigateTo, isActive };
    },
}
</script>
  
<style scoped>
.event-list-container {
  max-width: 600px;
  margin: auto;
  font-family: 'Arial', sans-serif;
  color: #ffffff;
  background-color: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  text-align: center;
  padding: 20px 0;
  margin: 0;
  background-color: #262626;
  color: #ffffff;
  font-size: 24px;
}

.event-list {
  display: flex;
  flex-direction: column;
  
}

.event-card {
  display: flex;
  align-items: center;
  background: #262626;
  margin-bottom: 2px; /* Creates the spacing between cards */
  transition: background-color 0.3s;
}

.event-card:hover {
  background: #333333;
}

.event-poster {
  width: 80px; /* Adjust as necessary */
  height: 120px; /* Adjust as necessary */
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.event-info {
  padding: 10px;
  flex-grow: 1;
}

.event-info h3 {
  margin: 0;
  padding-bottom: 5px;
  font-size: 18px; /* Adjust as necessary */
}

.event-rating {
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-weight: bold;
}

.event-rating span {
  background: #ffc107;
  color: black;
  padding: 2px 6px;
  border-radius: 4px;
}

.event-rating strong {
  margin-left: 5px;
  color: #ffc107;
}

footer {
  background-color: #202020;
  padding: 10px 0;
}

.footer-nav {
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.footer-nav div {
  text-align: center;
  cursor: pointer;
  padding: 10px;
  position: relative;
}

.footer-nav .active {
  color: #ffc107;
}

.footer-nav .active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background-color: #ffc107;
  border-radius: 50%;
  margin-bottom: -4px; /* Adjust this value to move the dot up or down */
}

.footer-nav i {
  display: block;
  margin: 0 auto;
}

.dot {
  display: none; /* Hide the dot, as it is not present in the provided UI design */
}

/* Add FontAwesome CSS if not already included in your project */
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css';
</style>
