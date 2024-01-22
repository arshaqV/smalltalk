import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { database } from "../actions/firebaseFunctions";
import { ref, onValue } from "firebase/database";
import { setUsersList } from "../actions/firebaseFunctions";
import { setConversationsList } from "../actions/firebaseFunctions";
import { auth } from "../firebaseConfig";
import LastMessage from "./LastMessage";

let chatOpen = false
const ChatList = () => {
    const navigate = useNavigate();
    const [activeChat, setActiveChat] = useState(null)
    const [conversations, setConversations] = useState([])

    const currentPath = window.location.pathname;

    // Extract the last part of the path
    const chatID = currentPath.substring(currentPath.lastIndexOf('/') + 1);

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

    useEffect(()=>{
        const userID = auth.currentUser.uid
        console.log("Rendering chat list")
        const conversationRef = ref(database,"conversation")
        const userRef = ref(database,"user")
        let userSnapshotCopy
        onValue(userRef, (userSnapshot)=>{
            userSnapshotCopy = userSnapshot
            setUsersList(userSnapshot.val())
        })
        const conversations = []
        onValue(conversationRef,(conversationsSnapshot)=>{
            conversations.length=0
            conversationsSnapshot.forEach((childSnapshot)=>{
                const conversationId = childSnapshot.key;
                const users = childSnapshot.child("users").val();
                console.log("User ID inside if statement")
                console.log(users)
                console.log(userID)
                console.log(users.userID)
                // Check if the userId is present in the users field
                if (users && users[userID]) {
                const participantIds = Object.keys(users);
                const otherParticipantId = participantIds.find(id => id !== userID);
                const otherParticipantUsername = userSnapshotCopy.child(`${otherParticipantId}/username`).val();
                const conversation = {
                    users: users,
                    id: conversationId,
                    name: otherParticipantUsername,
                    // You may add logic to get the lastMessage here
                    lastMessage: "Sample Last Message", // Replace with your logic to get the last message
                };
                conversations.push(conversation);
            }
        })
        setConversationsList(conversations)
        setConversations([...conversations])
    })},[])
    console.log(chatID)
    return ( <div id="chatList">
        {conversations.map(function(object, i){
        return <div key={i} className={(chatID===object.id) ? "messageBox messageBoxSelected" : "messageBox"} onClick={()=>openChat(object.id)}> 
            <div className="avatar"></div>
            <div className="messageBoxText"><div>{object.name}</div>
            <LastMessage chatid={object.id}/>
            </div>
            </div>
            ;
    })}
    </div> );
}


 
export default ChatList;