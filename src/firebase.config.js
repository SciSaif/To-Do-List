// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8ZpFKBXv4PCwaPdpIYztyqQxW3y_1twE",
  authDomain: "to-do-list-1074f.firebaseapp.com",
  projectId: "to-do-list-1074f",
  storageBucket: "to-do-list-1074f.appspot.com",
  messagingSenderId: "159290909918",
  appId: "1:159290909918:web:388bd31a763947ec20ce4f",
  measurementId: "G-4ZKKPY6VVT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
