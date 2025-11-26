// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnkeJ7SxdB5C1VfgzwnC_KS0544tQnQZQ",
  authDomain: "sme-wedding-invitation.firebaseapp.com",
  projectId: "sme-wedding-invitation",
  storageBucket: "sme-wedding-invitation.firebasestorage.app",
  messagingSenderId: "334874858175",
  appId: "1:334874858175:web:b71f851819a25f88602c0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
