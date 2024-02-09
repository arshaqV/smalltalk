import { useEffect } from "react";
import ChatList from "./ChatList";
import BottomMenu from "./BottomMenu";
import { Outlet, useOutletContext } from "react-router-dom";
import { getConversations } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const MainContainer = () => {
    const [uid, setUid] = useOutletContext();
    useEffect(onCreateAnimation)
    return ( <div id="mainContainer">
        <div id="side">
    <ChatList />
    <BottomMenu uid={uid}/>
    </div>
    <Outlet />
   </div> );
}
 
const onCreateAnimation = function() {
    console.log("Animating main container")
    const logo = document.getElementById("smalltalk")
    const container = document.getElementById("mainContainer")
    logo.style.opacity = "0"
    //logo.style.top = -rect.top+20+"px"
    logo.style.top = "-80px"
    
    setTimeout(()=>{
        logo.style.position="absolute"
        logo.style.top="20px"
        logo.style.opacity="100%"
        container.style.position="static"
        container.style.opacity = "100%"
        container.style.visibility ="visible"
    },500)

        setTimeout(()=>{
            root.className = ""
        },400)
}
export default MainContainer;