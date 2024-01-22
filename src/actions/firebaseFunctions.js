import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../firebaseConfig";
import { getDatabase, ref, child, get, set, push, query } from "firebase/database";
import { serverTimestamp } from "firebase/database";
import { onChildAdded, limitToLast, onValue } from "firebase/database";

export const database = getDatabase(app)
const dbRef = ref(database);
let conversationsList, usersList

let userID
    onAuthStateChanged(auth,(user)=>
    {
        if(user) {
            console.log(user.uid)
            userID = user.uid
        }
        else {
            console.log("No user ID found inside getConversations()")
        }
    })

export async function getConversations() {
   try {
    console.log("Fetching conversations from Firebase RTDB")
    const [userSnapshot, conversationsSnapshot] = await Promise.all([
      get(child(dbRef, `user`)),
      get(child(dbRef, "conversation")),
    ]);

    
    console.log(conversationsSnapshot.val())
    if (userSnapshot.exists() && conversationsSnapshot.exists()) {
      usersList = userSnapshot.val();
      const conversations = [];
      conversationsSnapshot.forEach((childSnapshot) => {
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
          const otherParticipantUsername = userSnapshot.child(`${otherParticipantId}/username`).val();
          
          const conversation = {
            users: users,
            id: conversationId,
            name: otherParticipantUsername,
            // You may add logic to get the lastMessage here
            lastMessage: "Sample Last Message", // Replace with your logic to get the last message
          };

          conversations.push(conversation);
        }
      });
      conversationsList = conversations
      console.log(conversations)
      return conversations;
    } else {
      console.log("User or conversations data not available");
      return [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
}

export async function signUp(userID, userName) {
  set(ref(database, 'user/' + userID), {
    username: userName,
  });
} 

export async function addUser(userName) {
  if(userName === "")
    {
      console.log("Enter user name")
      return
    }
  const userID = auth.currentUser.uid
  for (const user in usersList)
    if(usersList[user].username===userName)
    {
      for(let i = 0; i<conversationsList.length; i++)
      {
        if(conversationsList[i].users[user].exists) {
          console.log("Conversation with user already exists")
          return
      }}
    const conversationRef = ref(database, 'conversation');
    const newConversationRef = push(conversationRef);
    set(newConversationRef, {
        users: {
          [userID] : true,
          [user] : true
        }
    });
    return
    }
    console.log("User not found")
  }

  export async function sendMessage(conversationID, messageText)
  {
    const userID = auth.currentUser.uid
    if(messageText == "")
    {
      console.log("Enter message")
      return
    }
    const messagesRef = ref(database, 'messages/'+conversationID);
    const lastMessageRef = ref(database, 'conversation/'+conversationID+'/lastMessage/')
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
        from : userID,
        text : messageText,
        time : serverTimestamp(database)
    });
    set(lastMessageRef,{
      from : userID,
      text : messageText,
      time : serverTimestamp(database),
      seen : false
  })
    return
    }

  export function isCorrectUser(conversationID) 
  {
    console.log("inside isCorrectUser")
    for(let i = 0; i<conversationsList.length; i++)
    {
      if(conversationsList[i].id===conversationID)
        return true
    }
    return false
  }

  export function getMetadata(conversationID)
  {
    for(let i = 0; i<conversationsList.length; i++)
    {
      if(conversationsList[i].id===conversationID)
        return conversationsList[i]
    }
  }

  
  
