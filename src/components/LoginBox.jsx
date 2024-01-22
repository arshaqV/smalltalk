import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { signUp } from '../actions/firebaseFunctions';

const root = document.getElementById("root")
root.className = "loginClass"

const LoginBox = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        const email = document.getElementById("username").value+"@noreply.smalltalk.io"
        console.log(email)
        const password = document.getElementById("password").value
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/chat")
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      }); 
    
    };

    const handleSignUp = () => {
      const username = document.getElementById("username").value
      const email = username+"@noreply.smalltalk.io"
        console.log(email)
        const password = document.getElementById("password").value
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed up 
    const user = userCredential.user;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = auth.currentUser;
        signUp(user.uid, username)
        navigate("/chat")
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      }); 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }

    return ( <div id="loginForm">
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password" id="password" placeholder="Password"></input>
        <button className="buttonBox" onClick={handleClick}>Login</button>
        <br/>
        <div className="divider"></div>
        <div>New here? <span id="signUp" onClick={handleSignUp}>Sign up.</span></div>
    </div> );
}

let loginEvent = function() {
    
}
 

export default LoginBox;