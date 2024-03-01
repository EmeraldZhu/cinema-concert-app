<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <!-- Back button to close modal -->
        <button class="back-button" @click="closeModal">&lt; Back</button>
        <!-- Event Poster -->
        <img :src="event.posterPath" alt="Event Poster" class="event-poster" />
        <!-- Event Title -->
        <h2 class="event-title">{{ event.title }}</h2>
        <!-- Ticket Reservation Buttons -->
        <button class="ticket-button vip" @click="reserveTicket('VIP')">VIP Ticket</button>
        <button class="ticket-button regular" @click="reserveTicket('Regular')">Regular Ticket</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      event: Object,
      show: Boolean
    },
    emits: ['close', 'reserve'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
      reserveTicket(type) {
        this.$emit('reserve', { eventId: this.event.id, ticketType: type });
      },
      cancelReservation() {
        // TODO: Implement cancellation logic
        console.log('Cancelling reservation for event:', this.event.id);
    }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    /* Modal styles */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    /* Modal content styles */
    background: #2c3e50;
    padding: 20px;
    border-radius: 10px;
  }
  
  .back-button {
    /* Back button styles */
    margin-bottom: 20px;
  }
  
  .event-poster {
    /* Event poster styles */
    max-width: 100%;
    border-radius: 10px;
  }
  
  .event-title {
    /* Event title styles */
    color: #ecf0f1;
    text-align: center;
    margin: 20px 0;
  }
  
  .ticket-button {
    /* Ticket reservation button styles */
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .ticket-button.vip {
    /* VIP ticket button styles */
    background-color: #8e44ad;
    color: #ecf0f1;
  }
  
  .ticket-button.regular {
    /* Regular ticket button styles */
    background-color: #3498db;
    color: #ecf0f1;
  }
  
  /* Add media queries and additional styles as needed */
  </style>
  