<template>
  <div class="container">
    <div class="text-center">
      <h1 class="title">Welcome to CinemaBook</h1>
      <p class="subtitle">Discover and book tickets for the latest movies and concerts.</p>
      <div class="cta-buttons">
        <router-link to="/signup" class="btn btn-primary" v-if="!user">Sign Up</router-link>
        <router-link to="/signin" class="btn btn-secondary" v-if="!user">Sign In</router-link>
      </div>
    </div>
    <div class="featured-events">
      <h2 class="section-title">Featured Events</h2>
      <div class="events-grid">
        <div class="event-card" v-for="event in events" :key="event.id">
          <img :src="event.image" alt="Event image" class="event-image" />
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-date">{{ event.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.user);

// Placeholder data for events
const events = computed(() => [
  // Example event data
  { id: 1, title: 'The Greatest Showman', date: '2024-03-15', image: '' },
  { id: 2, title: 'Live Concert: John Doe', date: '2024-04-20', image: '' },
  // Add more events as needed
]);
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.text-center {
  text-align: center;
}

.title {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.subtitle {
  font-size: 1em;
  margin-bottom: 2em;
}

.cta-buttons {
  margin-bottom: 3em;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.featured-events {
  margin-top: 3em;
}

.section-title {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.event-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.event-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-title {
  font-size: 1.2em;
  margin: 10px;
}

.event-date {
  font-size: 0.9em;
  margin: 0 10px 10px 10px;
  color: #6c757d;
}
</style>
