import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCwvzKgRksRUoPwc3Lycr1WnIEteElLQPw",
  authDomain: "studdysphere.firebaseapp.com",
  projectId: "studdysphere",
  storageBucket: "studdysphere.appspot.com",
  messagingSenderId: "172546510409",
  appId: "1:172546510409:web:4d8d42be4ccc97426cb998",
  measurementId: "G-6G8T7B9YE1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { app, auth, db };
