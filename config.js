
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCYBOwlzvrJZwvrE2isJpXfGYONvggB5JE",
  authDomain: "fire--github-forget.firebaseapp.com",
  projectId: "fire--github-forget",
  storageBucket: "fire--github-forget.firebasestorage.app",
  messagingSenderId: "370911129635",
  appId: "1:370911129635:web:7f7ecc4204271030d2c196",
  measurementId: "G-TVWM7RMQT7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);


