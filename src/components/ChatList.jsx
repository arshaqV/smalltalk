import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//console.log(test)

// const chats = [{name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"}, 
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
//  {name:"Hello",
//  lastMessage:"hey there", lastMessageTime:"1d"},
// ]

let chatOpen = false
const ChatList = ({
    conversations
}) => {
    const navigate = useNavigate();
    const [activeChat, setActiveChat] = useState(null)

    const openChat = function(id) {
        if(!chatOpen) {
            chatOpen=true
            const logo = document.getElementById("smalltalk")
            logo.style.top = "-80px"
            logo.style.opacity = "0"
            let header;
            setTimeout(()=>{   
                header = document.getElementById("chatHeaderId")
                logo.style.transition="all 0s"
                logo.style.left = "100px"},100)
            setTimeout(()=>{
                const inputBox = document.getElementById("chatInputId")
                logo.style.transition = "all 0.2s"
                logo.style.top = "20px"
                logo.style.opacity = "100%"
                header.style.top="0px"
                inputBox.style.top="0px"
            },300)
        }
        navigate("/chat/"+id)
    }

    
    let { chatID } = useParams();
    useEffect(()=>console.log("Rendering chat list"))
    console.log("useParams" + chatID)
    const chats = conversations
    return ( <div id="chatList">
        {chats.map(function(object, i){
        return <div key={i} className={(chatID===object.id) ? "messageBox messageBoxSelected" : "messageBox"} onClick={()=>openChat(object.id)}> 
            <div className="avatar"></div>
            <div className="messageBoxText"><div>{object.name}</div>
            <div className="lastMessage">
                <div>{object.lastMessage}</div>
                <div className="lastMessageTime">{object.lastMessageTime}</div>
            </div>
            </div>
            </div>
            ;
    })}
    </div> );
}


 
export default ChatList;