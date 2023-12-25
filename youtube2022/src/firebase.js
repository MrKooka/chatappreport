// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrG1hOT3XP8sKJmEWmg0mW7kouJg1oIZE",
  authDomain: "chat-6bdb4.firebaseapp.com",
  projectId: "chat-6bdb4",
  storageBucket: "chat-6bdb4.appspot.com",
  messagingSenderId: "294132480700",
  appId: "1:294132480700:web:5cc55559d2c154eaa3eeb9",
  measurementId: "G-FNM9ZLELH2"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage()
export const db = getFirestore()
export const database = getDatabase();
