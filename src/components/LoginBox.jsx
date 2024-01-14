const LoginBox = () => {
    return ( <div id="loginForm">
        <input type="text" placeholder="Username"></input>
        <input type="password" placeholder="Password"></input>
        <button className="buttonBox" onClick={loginEvent}>Login</button>
        <br/>
        <div className="divider"></div>
        <div>New here? Sign up.</div>
    </div> );
}

let loginEvent = function() {
    const logo = document.getElementById("smalltalk")
    const line = document.getElementById("headerLine")
    const form = document.getElementById("loginForm")
    const container = document.getElementById("mainContainer")
    //const rect = logo.getBoundingClientRect();
    form.style.opacity = "0"
    logo.style.opacity = "0"
    //logo.style.top = -rect.top+20+"px"
    logo.style.top = "-80px"
    line.style.width = "100vw"
    line.style.opacity = "100%"
    setTimeout(()=>{logo.style.position="absolute"
logo.style.top="20px"
logo.style.opacity="100%"
line.style.transition="all 0s"
container.style.opacity = "100%"
container.style.visibility ="visible"
form.remove()
},400)


}
 
export default LoginBox;