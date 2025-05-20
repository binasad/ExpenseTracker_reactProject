import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2gvfu5u55uUlM3qiFgxft93S1Aw-tHZY",
  authDomain: "signup-5cc19.firebaseapp.com",
  databaseURL: "https://signup-5cc19-default-rtdb.firebaseio.com",
  projectId: "signup-5cc19",
  storageBucket: "signup-5cc19.firebasestorage.app",
  messagingSenderId: "978729305449",
  appId: "1:978729305449:web:4b54be3d2591f0b25769f8",
  measurementId: "G-YBQ3TT8CSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database, analytics }; 