import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import { useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import Splash from '../components/Splash'
import MainContainer from '../components/MainContainer'

function App() {
  const navigate = useNavigate();
  const [uid, setUid] = useState("")
  const [onSplash, setOnSplash] = useState(true)
  const [loggedIn, setLoggedIn] = useState(true)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUid(user.uid)
          setTimeout(()=>{setOnSplash(false)},500)
          console.log("uid ", uid)
          const logo = document.getElementById("smalltalk")
          logo.style.visibility="visible"
          logo.style.left = "50%"
          setTimeout(()=>{
            const line = document.getElementById("headerLine")
            line.style.animation = "linein 0.4s ease-in forwards"
            line.style.width = "100vw"
          },500)
          setTimeout(()=>{   
            navigate("/chat")
            },500)
            setTimeout(()=>{
              setLoggedIn(true)
            },500)
        } else {
          // User is signed out
          setTimeout(()=>{setOnSplash(false)},500)
          console.log("user is logged out")
          const logo = document.getElementById("smalltalk")
          const header = document.getElementById("headerLine")
          
          header.style.animation = ""
          header.style.opacity = "0"
          header.style.width = "1px"
          logo.style.visibility="hidden"
          
          setTimeout(()=>{
            setLoggedIn(false)
            root.className = "loginClass"},600)
          
          navigate("/")
        }
      });
     
}, [])

  return (
    <>
    {onSplash && <Splash />}
      <div id="smalltalk">
        smalltalk. 
      </div>
      <div id="headerLine"></div>
      {!loggedIn && <LoginBox />}
      <Outlet context={[uid, setUid]}/>
    </>
  )
}

export default App
