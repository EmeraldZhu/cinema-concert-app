import { ref } from 'vue';
import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import store from '@/store';

export function useAuth() {
  const error = ref(null);

  const createUser = async (email, password, displayName, role) => {
    error.value = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await store.dispatch('register', {
        uid: userCredential.user.uid,
        email,
        displayName,
        role
      });
      return userCredential;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const signInUser = async (email, password) => {
    error.value = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await store.dispatch('fetchUserRole', userCredential.user.uid);
      return userCredential;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const signOutUser = async () => {
    error.value = null;
    try {
      await signOut(auth);
      store.commit('setUser', null);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return { error, createUser, signInUser, signOutUser };
}
