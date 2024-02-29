<template>
    <div class="event-list">
      <ul>
        <li v-for="event in events" :key="event.id" @click="showEventDetails(event)">
          <img :src="event.posterPath" alt="Event Poster" />
          <div class="event-info">
            <h3>{{ event.title }}</h3>
            <!-- Date and placeholder for IMDb rating -->
            <div class="event-meta">
              <p class="event-date">{{ event.date }}</p>
              <!-- Placeholder for the IMDb rating since it's not in Firestore -->
              <p class="event-rating">IMDb Rating: N/A</p>
            </div>
          </div>
        </li>
      </ul>
  
      <!-- Placeholder for the Event Details Modal -->
      <!-- This is where you will integrate the UI you provide later -->
      <EventDetailsModal v-if="selectedEvent" :event="selectedEvent" @close="selectedEvent = null" />
  
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import EventDetailsModal from '@/components/admin/EventDetailsModal.vue';
  
export default {
    components: {
      EventDetailsModal,
    },
    setup() {
      const events = ref([]);
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
  
      const showEventDetails = (event) => {
        selectedEvent.value = event;
      };
  
      return { events, selectedEvent, showEventDetails };
    },
}
</script>
  
<style>
.event-list ul {
    list-style-type: none;
    padding: 0;
}
  
.event-list li {
    display: flex;
    align-items: center;
    background-color: #222;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s;
}
  
.event-list li:hover {
    background-color: #333;
}
  
.event-list img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
}
  
.event-info {
    margin-left: 10px;
}
  
.event-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
  
.event-date {
    font-size: 0.9em;
    color: #999;
}
  
.event-rating {
    font-size: 0.9em;
    color: #ffd700; /* Gold color for IMDb rating */
}
</style>