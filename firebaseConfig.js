// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8jAX29J_MwBqTutzIu27W7FC0Kzg2oO4",
  authDomain: "jobfinder-5f231.firebaseapp.com",
  projectId: "jobfinder-5f231",
  storageBucket: "jobfinder-5f231.appspot.com", // ← tu avais une erreur ici : `.app` → `.appspot.com`
  messagingSenderId: "595476802088",
  appId: "1:595476802088:web:72fccf20ee55961bb6231d",
  measurementId: "G-8BGL3E28G9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ← ajoute ça
const analytics = getAnalytics(app);

export { auth }; // ← et exporte-le ici
