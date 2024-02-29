import { createStore } from 'vuex';
import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const store = createStore({
    state() {
      return {
        user: null
      };
    },
    getters: {
      isAuthenticated(state) {
        return !!state.user;
      }
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      }
    },
    actions: {
      async register({ commit, dispatch }, { email, password, displayName, role }) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCredential.user, { displayName });
  
          // Save the role to Firestore
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            uid: userCredential.user.uid,
            displayName,
            email,
            role
          });
  
          // Immediately fetch the user role to include in the user state
          await dispatch('fetchUserRole', userCredential.user.uid);
  
        } catch (error) {
          console.error('Failed to register:', error);
          throw error; // It's better to rethrow the error to handle it in the component
        }
      },
  
      async fetchUserRole({ commit }, uid) {
        try {
          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const userData = docSnap.data();
            commit('setUser', { uid, ...userData });
          } else {
            console.log("No such document!");
            commit('setUser', null); // Consider how you want to handle this case.
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          throw error;
        }
      },

      async setUserFromAuth({ commit }, user) {
        // Fetch additional user details, such as role, from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
    
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Assuming userData contains 'role'
          commit('setUser', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName, // assuming this is also needed
            role: userData.role, // Store the role in Vuex
          });
        } else {
          console.error("No user document found!");
          // Handle the case where the user document does not exist
        }
      },

      async updateUserProfile({ state, commit }, { displayName }) {
        if (!state.user) return; // Ensure there's a user to update
        try {
          const { uid } = state.user;
          // Update displayName in Firebase Auth
          await updateProfile(auth.currentUser, { displayName });
          // Optionally update displayName in Firestore
          const userRef = doc(db, 'users', uid);
          await updateDoc(userRef, { displayName });
  
          // Update Vuex state
          commit('setUser', { ...state.user, displayName });
        } catch (error) {
          console.error('Failed to update profile:', error);
          throw error;
        }
      },

      async deleteUserAccount({ state, commit }) {
        try {
          const { uid } = state.user;
    
          // Delete user document from Firestore
          await deleteDoc(doc(db, 'users', uid));
    
          // Delete the user from Firebase Authentication
          await deleteUser(auth.currentUser);
    
          // Clear user state after account deletion
          commit('setUser', null);
        } catch (error) {
          console.error('Failed to delete user account:', error);
          throw error; // Propagate the error for handling in the component
        }
      },
  
      async login({ dispatch, commit }, { email, password }) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          // The role will be fetched and committed to the state within fetchUserRole
          await dispatch('fetchUserRole', userCredential.user.uid);
  
        } catch (error) {
          console.error('Failed to sign in:', error);
          throw error;
        }
      },
  
      async logout({ commit }) {
        try {
          await signOut(auth);
          commit('setUser', null);
        } catch (error) {
          console.error('Failed to log out:', error);
          throw error;
        }
      }
    }
  });
  
  export default store;