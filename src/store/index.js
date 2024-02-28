import { createStore } from 'vuex';
import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
      async register({ commit }, { email, password, displayName, role }) {
        try {
          // Register the user with Firebase
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // Set the displayName for the user (this is a Firebase feature)
          await userCredential.user.updateProfile({ displayName });
  
          // Save the role to Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName,
                email,
                role
          });
  
          // Commit the user data to the state
        commit('setUser', {
            ...userCredential.user,
            role // Include role in the user object for easy access
          });
        } catch (error) {
          throw new Error('Failed to register: ' + error.message);
        }
      },

      async fetchUserRole({ commit }, uid) {
        // Retrieve the user's role from Firestore
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          commit('setUser', {
            ...auth.currentUser,
            ...userData // This should include the role
          });
          return userData.role;
        } else {
          throw new Error('User role document does not exist.');
        }
      },

      async login({ commit }, { email, password }) {
        try {
          // Log the user in with Firebase
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
          // Commit the user data to the state
          commit('setUser', userCredential.user);
        } catch (error) {
          throw new Error('Failed to sign in: ' + error.message);
        }
      },
      async logout({ commit }) {
        try {
          // Log the user out with Firebase
          await signOut(auth);
  
          // Remove the user data from the state
          commit('setUser', null);
        } catch (error) {
          throw new Error('Failed to log out: ' + error.message);
        }
      }
    }
  });
  
  export default store;