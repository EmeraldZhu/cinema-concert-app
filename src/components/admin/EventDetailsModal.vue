<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <button class="back-button" @click="closeModal">&lt; Back</button>
      <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
      <h2>{{ event.title }}</h2>
      <div class="event-details">
        <p>Ticket Type: VIP</p>
        <p>Price: KES {{ event.vipTicketPrice }}</p>
        <p>Ticket Type: Regular</p>
        <p>Price: KES {{ event.regularTicketPrice }}</p>
        <p>Max Attendees: {{ event.maxAttendees }}</p>
      </div>
      <!-- Emit 'edit-event' instead of 'edit' -->
      <button class="edit-button" @click="emitEditEvent">Edit Event</button>
      <!-- Emit 'remove-event' instead of 'remove' -->
      <button class="remove-button" @click="emitRemoveEvent">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
    show: Boolean
  },
  // Emit 'edit-event' and 'remove-event' for clarity and consistency
  emits: ['close', 'edit-event', 'remove-event'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
    // Rename method to emitEditEvent for clarity
    emitEditEvent() {
      // Emit 'edit-event' with the event data
      this.$emit('edit-event', this.event);
    },
    // Rename method to emitRemoveEvent for clarity
    emitRemoveEvent() {
      // Emit 'remove-event' with the event ID
      this.$emit('remove-event', this.event.id);
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
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 400px;
  background-color: #121212;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.event-poster {
  max-width: 100%;
  border-radius: 10px;
}

h2 {
  color: white;
  font-size: 1.5rem;
  margin: 10px 0;
}

.event-details p {
  color: white;
  margin: 5px 0;
}

.edit-button, .remove-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: white;
  background-color: #007bff; /* Blue for edit */
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}

.remove-button {
  background-color: #dc3545; /* Red for remove */
}

.remove-button:hover {
  background-color: #c82333;
}

/* Ticket stub style for buttons */
.edit-button, .remove-button {
  border-radius: 10px;
  border-style: dashed;
  border-width: 1px;
  border-color: #fff;
}

/* Ensure the stubs look cut off */
.edit-button::before, .edit-button::after,
.remove-button::before, .remove-button::after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: #121212;
  border-radius: 50%;
}

.edit-button::before {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.edit-button::after {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.remove-button::before {
  top: -10px;
  right: 50%;
  transform: translateX(50%);
}

.remove-button::after {
  bottom: -10px;
  right: 50%;
  transform: translateX(50%);
}
</style>
