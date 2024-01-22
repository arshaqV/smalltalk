import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {

    apiKey: "AIzaSyBeshHllZDDzVoA3Cu4jBKc0QSMYr0ySbQ",
  
    authDomain: "smalltalk-e8dfa.firebaseapp.com",
  
    projectId: "smalltalk-e8dfa",
  
    storageBucket: "smalltalk-e8dfa.appspot.com",
  
    messagingSenderId: "1026473904994",
  
    appId: "1:1026473904994:web:fbbc21de00643ad191ba3b",
  
    measurementId: "G-DZ29863V2S",

    databaseURL: "https://smalltalk-e8dfa-default-rtdb.asia-southeast1.firebasedatabase.app/"
  
  };
  
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



