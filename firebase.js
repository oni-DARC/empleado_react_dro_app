// Importa Firebase y Firestore (utilizamos la versión "compat" para facilitar la migración)
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATFacon7_Li-j6WUz4AsFlA566t2SebJc",
  authDomain: "practica-empleado.firebaseapp.com",
  projectId: "practica-empleado",
  storageBucket: "practica-empleado.firebasestorage.app",
  messagingSenderId: "186988453440",
  appId: "1:186988453440:web:15c4ab49246f1edb6409a5",
  measurementId: "G-7DBXRQTBEZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exportamos la instancia de Firestore
export const firestore = firebase.firestore();
export default firebase;


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATFacon7_Li-j6WUz4AsFlA566t2SebJc",
  authDomain: "practica-empleado.firebaseapp.com",
  projectId: "practica-empleado",
  storageBucket: "practica-empleado.firebasestorage.app",
  messagingSenderId: "186988453440",
  appId: "1:186988453440:web:15c4ab49246f1edb6409a5",
  measurementId: "G-7DBXRQTBEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/