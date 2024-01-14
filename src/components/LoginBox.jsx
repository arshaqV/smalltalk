import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const root = document.getElementById("root")
root.className = "loginClass"

const LoginBox = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        const auth = getAuth();
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

    return ( <div id="loginForm">
        <input type="text" id="username" placeholder="Username"></input>
        <input type="password" id="password" placeholder="Password"></input>
        <button className="buttonBox" onClick={handleClick}>Login</button>
        <br/>
        <div className="divider"></div>
        <div>New here? Sign up.</div>
    </div> );
}

let loginEvent = function() {
    
}
 

export default LoginBox;