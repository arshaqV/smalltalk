import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useId, useState } from "react";
import { addUser, getUserId } from "../actions/firebaseFunctions";
import SettingsShade from "./SettingsShade";
import { onValue, ref } from "firebase/database";
import { database } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const BottomMenu = ({uid}) => {
    const [isAddShadeOpen, setAddShade] = useState(false)
    const [isSettingsShadeOpen, setSettingsShade] = useState(false)
    const [user,setUser] = useState({name:"",avatar:"",id:""})

    useEffect(()=>{
        if(uid!=="")
        {const userRef = ref(database,"user/"+uid)
        console.log({uid})
        onValue(userRef, (userSnapshot)=>{
            const userDetails = userSnapshot.val()
            const temp = {username: userDetails.username, avatar: userDetails.avatar, id: uid}
            setUser(temp)
        })
    }},[uid])

    function toggleAddShade() {
        setAddShade(!isAddShadeOpen)
        setSettingsShade(false)
        
    }

    function toggleSettingsShade() {
        setSettingsShade(!isSettingsShadeOpen)
        setAddShade(false)
    }

    function addUserAction() {
        const username = document.getElementById("addUserText").value
        addUser(username)
    }

    return ( <div id="bottomMenu">
        { isAddShadeOpen ? (
        
            <div className="shade" id="addShade">
                Add new user
            <div style={{display:"flex","align-items":"center"}}>
                <input id="addUserText" type="text"></input>
                <button id="addUserButton" onClick={addUserAction}>ADD</button>
            </div>
            </div>
        ) : null }
        { isSettingsShadeOpen ? (
            <SettingsShade user={user}/>
        ) : null }
        <div className="bottomMenuButton" onClick={toggleAddShade}><IoAddCircleOutline className="bottomMenuButtonIcon"/></div>
        <div className="bottomMenuButton" onClick={toggleSettingsShade}><IoIosSettings className="bottomMenuButtonIcon"/></div>
    </div> );
}
 
export default BottomMenu;