import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import ChatList from '../components/ChatList'
import { useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { redirect } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
          setTimeout(navigate("/chat"),1000)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
          navigate("/")
        }
      });
     
}, [])

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
