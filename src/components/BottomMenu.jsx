import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { addUser } from "../actions/firebaseFunctions";
import SettingsShade from "./SettingsShade";
import { onValue, ref } from "firebase/database";
import { database } from "../actions/firebaseFunctions";

const BottomMenu = ({uid}) => {
    const [isAddShadeOpen, setAddShade] = useState(false)
    const [isSettingsShadeOpen, setSettingsShade] = useState(false)
    const [user,setUser] = useState({name:"",avatar:"",id:""})
    const menuRef = useRef(null)
    const [error, setError] = useState("")

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          closeShades();
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

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

    let addOpen = ""
    let settingsOpen = ""
    if(isAddShadeOpen)
    {
        addOpen="shadeOpen"
    }
    else {
        addOpen=""
    }
    if(isSettingsShadeOpen)
    {
        settingsOpen="shadeOpen"
    }
    else {
        settingsOpen=""
    }

    useEffect(()=>{
        setError("")
    },[isAddShadeOpen])

    const closeShades = () => {
        setAddShade(false)
        setSettingsShade(false)
    }
    
    function toggleAddShade() {
        setAddShade(!isAddShadeOpen)
        setSettingsShade(false)
    }

    function toggleSettingsShade() {
        setSettingsShade(!isSettingsShadeOpen)
        setAddShade(false)
    }

    function addUserAction() {
        setError("")
        const username = document.getElementById("addUserText").value
        const err = addUser(username)
        console.log({err})
        if(err!=undefined && err!=null)
            setError(err)
    }

    return ( <div id="bottomMenu" ref={menuRef}>
        { isAddShadeOpen ? (
        
            <div className="shade" id="addShade">
                Who do you want to talk to?
            <div>
                <input id="addUserText" placeholder="Type username here..." type="text"></input>
                <button id="addUserButton" onClick={addUserAction}>Add</button>
            </div>
            {(error!=="") && <div id="shadeError">{error}</div>}
            </div>
        ) : null }
        { isSettingsShadeOpen ? (
            <SettingsShade user={user}/>
        ) : null }
        <div className="bottomMenuButton" id={addOpen} onClick={toggleAddShade}><IoAddCircleOutline className="bottomMenuButtonIcon"/></div>
        <div className="bottomMenuButton bottomMenuSettingsButton" id={settingsOpen} onClick={toggleSettingsShade}><IoIosSettings className="bottomMenuButtonIcon"/></div>
    </div> );
}
 
export default BottomMenu;