import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDj7iBSIONGZ5RhSnu-v38dZC5lRkpAlss",
  authDomain: "ishwari-22467.firebaseapp.com",
  projectId: "ishwari-22467",
  storageBucket: "ishwari-22467.firebasestorage.app",
  messagingSenderId: "1081296110071",
  appId: "1:1081296110071:web:6729e04dbde5eca0bd6ef2",
  measurementId: "G-CC6R5BDNC0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
