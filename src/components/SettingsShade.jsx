import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Avatar from "./Avatar";
import { IoLogOutOutline } from "react-icons/io5";
import CAT from "../assets/CAT.png"
import PINGU from "../assets/PINGU.png"
import COOL from "../assets/COOL.png"
import KOALA from "../assets/KOALA.png"
import PANDA from "../assets/PANDA.png"
import { useState } from "react";
import { setAvatar } from "../actions/firebaseFunctions";

const colors = ["#eeeeee","#04724d","#fa8334","#b6244f","#648de5"]
const avatarImages = [PINGU, CAT, KOALA, PANDA]

const SettingsShade = ({user}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const button = document.getElementById("avatarUpdateButton")
        button.innerText = "• • •"
        const x = avatarImages.indexOf(avatarImage)
        let newCode = ""
        newCode += x + avatarColor + avatarCool
        console.log({newCode})
        setTimeout(()=>button.innerText="Updated!",1000)
        setTimeout(()=>button.innerText="Update avatar",3500)
        setAvatar(newCode,user.id)
        
    }

    const [avatarImage,setAvatarImage] = useState(avatarImages[user.avatar[0]])
    const [avatarColor, setAvatarColor] = useState(user.avatar[1])
    const [avatarCool, setAvatarCool] = useState(user.avatar[2])

    return ( <div className="shade" id="settingsShade">
        <div id="settingsHeader">
            <div id="settingsAvatar">
            <Avatar code={"0" + avatarColor + avatarCool} avatarImage={avatarImage} cool={COOL}/>
            </div>
            <div id="settingsName">{user.username}</div>
            <div id="logOutButton" onClick={logOutAction}><IoLogOutOutline className="bottomMenuButtonIcon"/>
            </div>
        </div>
        <form id="avatarForm" onSubmit={handleSubmit}>
        <fieldset id="Go">
            {avatarImages.map((avt, i)=> {
                return (
                <label key={i}>
                <input type="radio" name="avatar" onChange={(event)=>{setAvatarImage(avatarImages[event.target.value])}} value={i}></input>
                <img src={avt}></img>
                </label>)
                })}
            </fieldset>
            <fieldset>
            {colors.map((avt, i)=> {
                return (
                <label key={i}>
                <input type="radio" name="color" value={i} onChange={(event)=>{setAvatarColor(event.target.value)}}></input>
                <div style={{backgroundColor:avt}}></div>
                </label>)
                })}
            </fieldset>
            <fieldset id="buttonFieldset">
                <label>😎
                <input type="checkbox" name="cool" checked={(avatarCool==1)} onChange={(event)=>{setAvatarCool(event.target.checked ? "1": "0")}}></input>
                </label>
            <button type="submit" id="avatarUpdateButton">Update avatar</button>
            </fieldset>
            </form>  
            </div> );
}

const logOutAction = () => {
    const logo = document.getElementById("smalltalk")
    logo.style.visibility="hidden"
    logo.style.top = "-80px"
    setTimeout(()=>{logo.style.left = "50%"},500)
    
    setTimeout(()=>{signOut(auth).then(()=>{

    }).catch((error)=>{

    })},500)
}
 
export default SettingsShade;