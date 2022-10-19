import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEiiPP2QSJjAP1Hp2uZi33cAj9njiQTIk",
  authDomain: "checklist-5ad40.firebaseapp.com",
  projectId: "checklist-5ad40",
  storageBucket: "checklist-5ad40.appspot.com",
  messagingSenderId: "702420646462",
  appId: "1:702420646462:web:15ab05f646c5e7358eaf6f",
  measurementId: "G-H6ZH4CPJ84",
};

const firebaseInit = () => initializeApp(firebaseConfig);

export default firebaseInit;
