<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
        <h2>{{ event.title }}</h2>
        <p class="event-date">{{ event.date }}</p>
        <p class="event-rating">IMDB {{ event.imdbRating }}</p>
        <button @click="editEvent">Edit Event</button>
        <button @click="deleteEvent">Delete Event</button>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { doc, deleteDoc } from 'firebase/firestore';
  
  export default {
    props: {
      event: Object,
      show: Boolean
    },
    emits: ['close', 'edit', 'delete'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
      editEvent() {
        // Emit an edit event to the parent component to handle editing
        this.$emit('edit', this.event);
      },
      async deleteEvent() {
        // Confirm deletion with the user
        if (window.confirm(`Are you sure you want to delete the event "${this.event.title}"?`)) {
          // Proceed with deletion
          try {
            await deleteDoc(doc(db, 'events', this.event.id));
            this.$emit('delete', this.event.id);
            this.closeModal();
          } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete the event. Please try again.');
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
  
  .event-poster {
    max-width: 100%;
    border-radius: 15px;
  }
  
  button {
    margin-top: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  button:nth-child(2) {
    background-color: #3498db;
    color: white;
    margin-right: 10px;
  }
  
  button:nth-child(3) {
    background-color: #e74c3c;
    color: white;
  }
  </style>
  