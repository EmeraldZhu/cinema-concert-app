import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const events = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addEvent({ commit }, event) {
      try {
        await addDoc(collection(db, 'events'), event);
        console.log('Event added successfully');
      } catch (error) {
        console.error('Error adding event:', error);
        throw error; // Rethrow error to handle it in the component if needed
      }
    },
  },
};