import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSvQwKCzH8M6eAamDPuuLXpKpACDjsygg",
  authDomain: "summit-233ac.firebaseapp.com",
  projectId: "summit-233ac",
  storageBucket: "summit-233ac.appspot.com",
  messagingSenderId: "801369728347",
  appId: "1:801369728347:web:4163d4d48f160bf6e0267e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
