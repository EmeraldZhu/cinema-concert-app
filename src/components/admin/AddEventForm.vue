<template>
    <div class="event-form">
      <h2>Add New Event</h2>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search for a movie..." @input="searchMovies">
        <ul v-if="searchResults.length">
          <li v-for="result in searchResults" :key="result.id" @click="selectMovie(result)">
            {{ result.title }} ({{ result.release_date.split('-')[0] }})
          </li>
        </ul>
      </div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Event Title</label>
          <input id="title" v-model="event.title" type="text" required readonly>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="event.description" required></textarea>
        </div>
        <!-- Ticket Prices for VIP and Regular -->
        <div class="form-group">
          <label for="vipTicketPrice">VIP Ticket Price</label>
          <input id="vipTicketPrice" v-model="event.vipTicketPrice" type="number" required>
        </div>
        <div class="form-group">
          <label for="regularTicketPrice">Regular Ticket Price</label>
          <input id="regularTicketPrice" v-model="event.regularTicketPrice" type="number" required>
        </div>
        <div class="form-group">
          <label for="maxAttendees">Maximum Attendees</label>
          <input id="maxAttendees" v-model="event.maxAttendees" type="number" required>
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { searchMovies } from '@/utils/tmdbApi';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      event: {
        title: '',
        description: '',
        vipTicketPrice: 0,
        regularTicketPrice: 0,
        maxAttendees: 0,
        posterPath: ''
      }
    };
  },
  methods: {
    ...mapActions('events', ['addEvent']), // Import addEvent action from events module
    async searchMovies() {
      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }
      try {
        this.searchResults = await searchMovies(this.searchQuery);
      } catch (error) {
        console.error('Error fetching movies:', error);
        this.searchResults = [];
      }
    },
    selectMovie(movie) {
      this.event.title = movie.title;
      this.event.description = movie.overview;
      // Assuming you have a data property for the poster path
      this.event.posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      this.searchResults = [];
    },
    async submitForm() {
      try {
        await this.addEvent(this.event); // Use addEvent action to submit event data to Firestore
        alert('Event added successfully.');
        this.event = { title: '', description: '', vipTicketPrice: 0, regularTicketPrice: 0, maxAttendees: 0, posterPath: '' };
      } catch (error) {
        alert('Failed to add event. Please try again.');
        console.error('Error adding event:', error);
      }
    },
  },
}
</script>

<style>
/* Basic styling; adjust as needed */
.event-form {
  max-width: 500px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
}

.search-container input, .form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.search-container ul {
  list-style: none;
  padding: 0;
}

.search-container li {
  cursor: pointer;
  margin: 5px 0;
}

.search-container li:hover {
  background-color: #f0f0f0;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>