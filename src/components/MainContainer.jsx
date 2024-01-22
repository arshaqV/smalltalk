import { useEffect } from "react";
import ChatList from "./ChatList";
import BottomMenu from "./BottomMenu";
import { Outlet } from "react-router-dom";
import { getConversations } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const MainContainer = () => {
    useEffect(onCreateAnimation)
    return ( <div id="mainContainer">
        <div id="side">
    <ChatList />
    <BottomMenu />
    </div>
    <Outlet />
   </div> );
}
 
const onCreateAnimation = function() {
    console.log("Animating main container")
    const logo = document.getElementById("smalltalk")
    const line = document.getElementById("headerLine")
    const form = document.getElementById("loginForm")
    const container = document.getElementById("mainContainer")
    //const rect = logo.getBoundingClientRect();
    form.style.opacity = "0"
    form.style.position = "absolute"
    form.style.visibility = "hidden"
    logo.style.opacity = "0"
    //logo.style.top = -rect.top+20+"px"
    logo.style.top = "-80px"
    line.style.width = "100vw"
    line.style.opacity = "100%"
    setTimeout(()=>{
        logo.style.position="absolute"
        logo.style.top="20px"
        logo.style.opacity="100%"
        line.style.transition="all 0s"
        container.style.position="static"
        container.style.opacity = "100%"
        container.style.visibility ="visible"
        //form.remove()
    },400)

    setTimeout(()=>{
          root.className = ""
    },400)
}
export default MainContainer;