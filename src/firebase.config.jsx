// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0I0tzJ_U4sON-N-t0Bxg1rYmXW4FF8KE",
  authDomain: "car-parts-react-app.firebaseapp.com",
  projectId: "car-parts-react-app",
  storageBucket: "car-parts-react-app.appspot.com",
  messagingSenderId: "951805958874",
  appId: "1:951805958874:web:8aa55bcc39754952c323e3",
  measurementId: "G-YV61THLLX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
