import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6-4da9xrXM0cxfDYkLaLBZgOG1J9zKgI",
  authDomain: "phantom-link.firebaseapp.com",
  projectId: "phantom-link",
  storageBucket: "phantom-link.firebasestorage.app",
  messagingSenderId: "1010032150143",
  appId: "1:1010032150143:web:2bc4b4b5ad83cdfbeb614a",
  measurementId: "G-4G7MR4V6JE"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db }; 