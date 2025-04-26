// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZdRAis0QEXUcDKqjDnZVJMt_ShiQ5Q2E",
  authDomain: "pikka-e7bca.firebaseapp.com",
  projectId: "pikka-e7bca",
  storageBucket: "pikka-e7bca.appspot.com",
  messagingSenderId: "125109552379",
  appId: "1:125109552379:web:d6fae5094058b00fd25c5e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ← 🔥 Firestore export
