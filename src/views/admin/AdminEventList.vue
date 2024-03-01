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

    <!-- EventDetailsModal integration -->
    <EventDetailsModal
      v-if="selectedEvent"
      :event="selectedEvent"
      :show="showDetailsModal"
      @close="showDetailsModal = false"
      @edit-event="handleEditEvent"
      @remove-event="handleRemoveEvent"
    />

    <!-- EditEventForm integration -->
    <EditEventForm
      v-if="showEditModal"
      :show="showEditModal"
      :eventData="selectedEventForEdit"
      @close="showEditModal = false"
      @update="onEventUpdated"
    />

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
import EventDetailsModal from '@/components/admin/EventDetailsModal.vue';
import EditEventForm from '@/components/admin/EditEventForm.vue';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    EventDetailsModal,
    EditEventForm
  },
  setup() {
    const events = ref([]);
    const selectedEvent = ref(null);
    const showDetailsModal = ref(false);
    const showEditModal = ref(false);
    const selectedEventForEdit = ref(null);
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
      // Logic to show EventDetailsModal
      selectedEvent.value = event;
      showDetailsModal.value = true;
    };

    const handleEditEvent = (event) => {
      selectedEventForEdit.value = event; // set the event to be edited
      showEditModal.value = true; // show the edit event form modal
      showDetailsModal.value = false; // Close the details modal when opening edit modal
    };

    const handleRemoveEvent = async (eventId) => {
      // Confirm before deleting
      if (confirm(`Are you sure you want to delete the event: ${eventId}?`)) {
        try {
          // Delete the document
          await deleteDoc(doc(db, 'events', eventId));
          // Fetch and update the list
          events.value = (await getDocs(collection(db, 'events'))).docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          showDetailsModal.value = false; // close details modal
        } catch (error) {
          console.error("Error removing event: ", error);
          alert("Failed to delete the event. Please try again.");
        }
      }
    };

    const onEventUpdated = async () => {
      showEditModal.value = false; // Close the edit modal after update
      
      // Fetch the updated list of events from Firestore
      const querySnapshot = await getDocs(collection(db, 'events'));
      events.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Optionally, close the details modal if it is still open
      showDetailsModal.value = false;
    };

    const navigateTo = (name) => {
      router.push({ name });
    };

    const isActive = (name) => {
      return route.name === name;
    };

    return { events,  selectedEvent, showDetailsModal, showEditModal, selectedEventForEdit, selectEvent, handleEditEvent, handleRemoveEvent, onEventUpdated, navigateTo, isActive };
  },
};
</script>

<style scoped>
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
