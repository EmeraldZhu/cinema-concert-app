import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrF5aJYe_wvGYlEhPCiukHdt7gxZ1gLCo",
    authDomain: "cinema-concert-app.firebaseapp.com",
    projectId: "cinema-concert-app",
    storageBucket: "cinema-concert-app.appspot.com",
    messagingSenderId: "760603186930",
    appId: "1:760603186930:web:fd2eccf441bf718b1c226b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };