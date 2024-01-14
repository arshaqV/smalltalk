import './App.css'
import { Outlet } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import ChatList from '../components/ChatList'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyBeshHllZDDzVoA3Cu4jBKc0QSMYr0ySbQ",
  
    authDomain: "smalltalk-e8dfa.firebaseapp.com",
  
    projectId: "smalltalk-e8dfa",
  
    storageBucket: "smalltalk-e8dfa.appspot.com",
  
    messagingSenderId: "1026473904994",
  
    appId: "1:1026473904994:web:fbbc21de00643ad191ba3b",
  
    measurementId: "G-DZ29863V2S"
  
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



function App() {
  return (
    <>
      <div id="smalltalk">
        smalltalk. 
      </div>
      <div id="headerLine"></div>
      <LoginBox />
      <Outlet />
    </>
  )
}

export default App
