import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useState } from 'react';
import { signUp } from '../actions/firebaseFunctions';

const root = document.getElementById("root")
root.className = "loginClass"
const LoginBox = () => {
  const [mode,setMode] = useState("Login")
  const [errorMessage, setErrorMessage] = useState("") 
    const navigate = useNavigate();
    const handleClick = () => {
        const button = document.getElementById("loginButton")
        button.innerText = "•••"
        const username = document.getElementById("username").value
        const email = username+"@noreply.smalltalk.io"
        console.log(email)
        const password = document.getElementById("password").value

        if(mode!=="Login") 
        {
          createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed up 
    const user = userCredential.user;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        button.innerText="✓"
        // Signed in 
        const user = auth.currentUser;
        signUp(user.uid, username)
        navigate("/chat")
      })
      .catch((error) => {
        setErrorMessage("Something went wrong.")
        console.log(error.code);
        console.log(error.message);
      }); 
  })
  .catch((error) => {
    console.log(error.code)
    button.innerText = "Sign up"
    if(error.message==="Firebase: Error (auth/email-already-in-use).")
      setErrorMessage("Username already exists.")
  });
        }

        else {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        button.innerText="✓"
        // Signed in 
        const user = userCredential.user;
        const form = document.getElementById("loginForm")
        const loginLogo = document.getElementById("loginLogo")
        setTimeout(()=>{
          root.className = ""
    },1000)
      loginLogo.style.top = "-100px"
        loginLogo.style.opacity = "0"
        form.style.opacity = "0"
      })
      .catch((error) => {
        button.innerText = "Login"
        setErrorMessage("Invalid credentials.")
        console.log(error.code);
        console.log(error.message);
      }); 
    
    }};

    const switchMode = () => {
      if(mode=="Login")
        setMode("Sign up")
      else
        setMode("Login")
    }

    return ( <>
    <div id="loginLogo">smalltalk.</div>
    <div id="loginForm"> 
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password"  id="password" placeholder="Password"></input>
        <div id="errorMessage">{errorMessage}</div>
        <button className="buttonBox" id="loginButton" onClick={handleClick}>{mode}</button>
        <br/>
        <div className="divider"></div>
        {(mode=="Login") ? <div>New here? <span id="signUp" onClick={switchMode}>Sign up.</span></div>
        : <div>Not new here? <span id="signUp" onClick={switchMode}>Login.</span></div>}
        
    </div>
    </> );
}

export default LoginBox;