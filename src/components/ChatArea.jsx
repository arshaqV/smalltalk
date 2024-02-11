import { useNavigate, useParams } from "react-router-dom";
import { isCorrectUser, sendMessage } from "../actions/firebaseFunctions";
import ChatHeader from "./ChatHeader";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { query,ref,onValue,limitToLast, onDisconnect } from "firebase/database";
import { database } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import { getMetadata } from "../actions/firebaseFunctions";
import CAT from "../assets/CAT.png"
import PINGU from "../assets/PINGU.png"
import COOL from "../assets/COOL.png"
import KOALA from "../assets/KOALA.png"
import PANDA from "../assets/PANDA.png"

const colors = ["#eeeeee","#04724d","#fa8334","#b6244f","#648de5"]
const avatarImages = [PINGU, CAT, KOALA, PANDA]

const ChatArea = ({ chatid }) => {
    const [data, setData] = useState([])
    const userID = auth?.currentUser?.uid || ""
    const navigate = useNavigate()
    const [metadata, setMetadata] = useState({})
    const [isTyping, setIsTyping] = useState(false)
    
    useEffect(()=>{
        if(userID=="")
            {navigate("/chat/")}
        else {
        if(isCorrectUser(chatid)) {
            console.log("Rendering chat area")
            const md = getMetadata(chatid)
            setMetadata({...md})
            console.log(metadata)
            const messagesRef = query(ref(database, 'messages/' + chatid), limitToLast(100));
            const messages = []
            onValue(messagesRef, (snapshot) => {
                if(snapshot.exists) {
                    messages.length = 0
                    let prevMessageTime = 0
                    let prevMessageFrom = ""
                    snapshot.forEach((childSnapshot) => {
                        if(childSnapshot.key=="lastMessage")
                            return
                        const msgObj = childSnapshot.val()
                        if(msgObj.time-prevMessageTime<60000 && msgObj.from===prevMessageFrom)
                            msgObj.group = true
                        else
                            msgObj.group = false
                        prevMessageTime = msgObj.time
                        prevMessageFrom = msgObj.from
                        messages.push(
                            msgObj
                        )
                    })
                    messages.reverse()
                    setData([...messages])
                    console.log({messages})
                }
            }) 
        } else {
            navigate("/chat")
        }}}, [chatid])

    function sendMessageAction() {
        const text = document.getElementById("chatTextInput").value
        sendMessage(chatid,text)
        document.getElementById("chatTextInput").value = ""
        setIsTyping(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          sendMessageAction();
        }
      };

      const handleText = (event) => {
        const field = document.getElementById("chatTextInput")
        if(field.value.length>0)
            setIsTyping(true)
        else
            setIsTyping(false)
      }

      const buttonStyle = {color:"#333", cursor:"normal"}
      if(isTyping) {
        buttonStyle.color = "#eee"
        buttonStyle.cursor = "pointer"
      }
      else {
        buttonStyle.color = "#333"
        buttonStyle.cursor = "normal"
      }

    let colors = ["#eeeeee","#04724d","#fa8334","#b6244f","#648de5"]
    
    return ( <div className="chatArea">
        <div id="chatHeaderId" className="chatHeader">
            <ChatHeader metadata={metadata} avatarImages={avatarImages} cool={COOL}/>
        </div>
        <div className="chatMessages">
            {data.map((object, i)=>{
                let className = "message"
                if(object.from===userID)
                    className+=" messageSent"
                if(object.group==true)
                    className+=" messageCluster"
                return <div key={i} className={className}>{object.text}</div>
            })}
        </div>
        <div id="chatInputId" className="chatInput">
           <input id="chatTextInput" type="text" onChange={handleText} placeholder="Type message here..." onKeyDown={handleKeyPress}></input>
            <div id="sendButton" style={buttonStyle} onClick={sendMessageAction}><IoSend id="sendButtonIcon"/></div>
        </div>
    </div> );
}
 


export default ChatArea;