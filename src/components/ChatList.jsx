import { Link } from "react-router-dom";
import getConversations from "../actions/firebaseFunctions.js";

const chats = [{name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"}, 
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
 {name:"Hello",
 lastMessage:"hey there", lastMessageTime:"1d"},
]




let chatOpen = false
const ChatList = () => {
    console.log(chats)
    return ( <div id="chatList">
        {chats.map(function(object, i){
        return <Link key={i} to={""+i}><div className="messageBox" onClick={openChat}> 
            <div className="avatar"></div>
            <div className="messageBoxText"><div>{object.name}</div>
            <div className="lastMessage">
                <div>{object.lastMessage}</div>
                <div className="lastMessageTime">{object.lastMessageTime}</div>
            </div>
            </div>
            </div></Link>
            ;
    })}
    </div> );
}

const openChat = function() {
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
}
 
export default ChatList;