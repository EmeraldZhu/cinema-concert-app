<template>
  <div class="homepage-container">
    <header>
      <h1>Hello "User"!</h1>
      <p>Book your favorite movie</p>
    </header>
    
    <!-- Event Carousel -->
    <Carousel :snap-align="'center'" :items-to-show="1.2" :model-value="0">
      <Slide v-for="event in events" :key="event.id" @click="showEventDetails(event)">
        <div class="event-card">
          <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
          <h2>{{ event.title }}</h2>
        </div>
      </Slide>
    </Carousel>

    <!-- UserEventDetailModal component -->
    <UserEventDetailModal
      v-if="selectedEvent"
      :event="selectedEvent"
      :show="isModalVisible"
      @close="isModalVisible = false"
      @reserve="reserveTicket"
    />

    <!-- Footer Navigation -->
    <footer>
      <div class="footer-icon" :class="{ active: isActive('UserDashboard') }" @click="navigateTo('UserDashboard')">
        <i class="fa fa-home"></i>
      </div>
      <div class="footer-icon" :class="{ active: isActive('UserProfile') }" @click="navigateTo('UserProfile')">
        <i class="fa fa-user"></i>
      </div>
      <div class="footer-icon" :class="{ active: isActive('UserEventList') }" @click="navigateTo('UserEventList')">
        <i class="fa fa-ticket-alt"></i>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useRoute, useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import UserEventDetailModal from '@/components/user/UserEventDetailModal.vue';

import '@fortawesome/fontawesome-free/css/all.css';

const store = useStore();
const events = ref([]);
const selectedEvent = ref(null);
const isModalVisible = ref(false);
const route = useRoute();
const router = useRouter();

// Fetch events from Firestore
onMounted(async () => {
  const eventsCollection = collection(db, 'events');
  const eventsSnapshot = await getDocs(eventsCollection);
  events.value = eventsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
});

const showEventDetails = (event) => {
  selectedEvent.value = event;
  isModalVisible.value = true;
};

const reserveTicket = async ({ eventId, ticketType }) => {
  const eventRef = doc(db, 'events', eventId);

  try {
    const eventData = events.value.find(event => event.id === eventId);
    const newReservations = eventData.reservations || { VIP: 0, Regular: 0 };

    // Check if the user can reserve more tickets
    if (newReservations[ticketType] < eventData.maxAttendees) {
      // Increment the reservation count
      newReservations[ticketType] += 1;

      // Update or set the reservations field
      await setDoc(eventRef, { reservations: newReservations }, { merge: true });

      alert('Ticket reserved successfully!');
    } else {
      alert('No more tickets available.');
    }
  } catch (error) {
    console.error('Failed to reserve ticket:', error);
    alert('Failed to reserve ticket. Please try again.');
  }
  isModalVisible.value = false;
};

const selectEvent = (event) => {
  selectedEvent.value = event;
  isModalVisible.value = true;
};

const navigateTo = (name) => {
  router.push({ name });
};

const isActive = (name) => {
  return route.name === name;
};
</script>

<style scoped>
/* Include FontAwesome */
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';

h2 {
  color: #121212;
}
.homepage-container {
  padding: 1em;
  background-color: #121212; /* Dark background */
  color: #ffffff; /* Light text for dark mode */
  min-height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  margin-bottom: 1em;
}

.event-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1em;
}

.event-card img {
  max-width: 100%; /* Ensure image is responsive */
  border-radius: 15px; /* Rounded corners for the images */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25); /* Card shadow */
}

.event-card h2 {
  margin-top: 0.5em;
}

footer {
  margin-top: auto; /* Push footer to the bottom */
  background-color: #1c1c1c; /* Slightly lighter than page background */
  padding: 1em 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.footer-icon {
  color: #ffffff;
  font-size: 2em; /* Large icons */
}

.footer-icon.active {
  position: relative;
}

.footer-icon.active::after {
  content: '•';
  color: #4caf50; /* Active icon indicator color */
  position: absolute;
  bottom: -0.5em; /* Position the dot below the icon */
  left: 50%;
  transform: translateX(-50%);
}
</style>