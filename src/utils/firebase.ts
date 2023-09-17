import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blog-fa45d.firebaseapp.com",
  projectId: "blog-fa45d",
  storageBucket: "blog-fa45d.appspot.com",
  messagingSenderId: "550666600933",
  appId: "1:550666600933:web:207c1ba07f3a3c296c6f0c",
};

export const app = initializeApp(firebaseConfig);
