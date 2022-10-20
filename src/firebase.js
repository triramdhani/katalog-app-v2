import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore" 
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY,
  authDomain: "katalog-app-2e15a.firebaseapp.com",
  databaseURL: "gs://katalog-app-2e15a.appspot.com",
  projectId: "katalog-app-2e15a",
  storageBucket: "katalog-app-2e15a.appspot.com",
  messagingSenderId: "349965713216",
  appId: "1:349965713216:web:25921b6704cd77ca5d04a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app)