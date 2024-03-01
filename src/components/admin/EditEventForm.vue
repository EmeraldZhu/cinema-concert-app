<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Edit Event</h2>
      <form @submit.prevent="updateEvent">
        <div class="form-group">
          <label for="edit-title">Event Title</label>
          <input id="edit-title" v-model="event.title" type="text" required readonly>
        </div>
        <div class="form-group">
          <label for="edit-description">Description</label>
          <textarea id="edit-description" v-model="event.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="edit-vipTicketPrice">VIP Ticket Price</label>
          <input id="edit-vipTicketPrice" v-model="event.vipTicketPrice" type="number" required>
        </div>
        <div class="form-group">
          <label for="edit-regularTicketPrice">Regular Ticket Price</label>
          <input id="edit-regularTicketPrice" v-model="event.regularTicketPrice" type="number" required>
        </div>
        <div class="form-group">
          <label for="edit-maxAttendees">Maximum Attendees</label>
          <input id="edit-maxAttendees" v-model="event.maxAttendees" type="number" required>
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default {
  props: {
    show: Boolean,
    eventData: Object,
  },
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const event = ref({ ...props.eventData }); // Initialize event with a deep copy of eventData

    // Watch for changes in eventData prop and update the local event accordingly
    watch(() => props.eventData, (newVal) => {
      event.value = { ...newVal };
    }, { deep: true });

    const updateEvent = async () => {
      if (event.value.id) {
        const eventRef = doc(db, 'events', event.value.id);
        await updateDoc(eventRef, { ...event.value });
        emit('update');
        closeModal();
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return { event, updateEvent, closeModal };
  },
}
</script>
  
<style scoped>
h2, label {
  color: black;
  font-weight: 500;
}

.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
  
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}
  
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
  
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
  