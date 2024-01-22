import { useNavigate, useParams } from "react-router-dom";
import { isCorrectUser, sendMessage } from "../actions/firebaseFunctions";
import ChatHeader from "./ChatHeader";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { query,ref,onValue,limitToLast } from "firebase/database";
import { database } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import { getMetadata } from "../actions/firebaseFunctions";

const ChatArea = ({ chatid }) => {
    const [data, setData] = useState([])
    const userID = auth.currentUser.uid
    const navigate = useNavigate()
    const [metadata, setMetadata] = useState({})
    
    useEffect(()=>{
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
                    snapshot.forEach((childSnapshot) => {
                        messages.push(
                            childSnapshot.val()
                        )
                    })
                    messages.reverse()
                    setData([...messages])
                    console.log(messages)
                }
            }) 
        } else {
            navigate("/chat")
        }}, [chatid])

    function sendMessageAction() {
        const text = document.getElementById("chatTextInput").value
        sendMessage(chatid,text)
        document.getElementById("chatTextInput").value = ""
    }

    return ( <div className="chatArea">
        <div id="chatHeaderId" className="chatHeader">
            <ChatHeader metadata={metadata}/>
        </div>
        <div className="chatMessages">
            {data.map((object, i)=>{
                if(object.from===userID)
                return <div key={i} className="message messageSent">{object.text}</div>
                else
                return <div key={i} className="message">{object.text}</div>
            })}
        </div>
        <div id="chatInputId" className="chatInput">
            <input id="chatTextInput" type="text" placeholder="Type message here..."></input>
            <div id="sendButton" onClick={sendMessageAction}><IoSend id="sendButtonIcon"/></div>
        </div>
    </div> );
}
 
export default ChatArea;