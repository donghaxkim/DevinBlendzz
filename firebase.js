import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbs57kIoPvRR0anFyd7zd4C1Zof6Z3R8w",
  authDomain: "devinsoup-4f0c9.firebaseapp.com",
  projectId: "devinsoup-4f0c9",
  storageBucket: "devinsoup-4f0c9.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 