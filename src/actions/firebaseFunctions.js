import { onAuthStateChanged } from "firebase/auth"
import { app, auth } from "../firebaseConfig"
import { getDatabase, ref, child, get, set, push } from "firebase/database"
import { serverTimestamp } from "firebase/database"

export const database = getDatabase(app)
const dbRef = ref(database)
let conversationsList, usersList, loggedIn

export function setUsersList(ul) {
  usersList = ul
  console.log({ usersList })
}

export function setConversationsList(cl) {
  conversationsList = cl
}

let userID
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid)
    loggedIn = true
    userID = user.uid
  } else {
    console.log("No user ID found inside getConversations()")
    loggedIn = false
  }
})

export function getUserId() {
  return userID
}

export async function getConversations() {
  try {
    console.log("Fetching conversations from Firebase RTDB")
    const [userSnapshot, conversationsSnapshot] = await Promise.all([
      get(child(dbRef, `user`)),
      get(child(dbRef, "conversation")),
    ])

    console.log(conversationsSnapshot.val())
    if (userSnapshot.exists() && conversationsSnapshot.exists()) {
      usersList = userSnapshot.val()
      const conversations = []
      conversationsSnapshot.forEach((childSnapshot) => {
        const conversationId = childSnapshot.key
        const users = childSnapshot.child("users").val()
        console.log("User ID inside if statement")
        console.log(users)
        console.log(userID)
        console.log(users.userID)
        // Check if the userId is present in the users field
        if (users && users[userID]) {
          const participantIds = Object.keys(users)
          const otherParticipantId = participantIds.find((id) => id !== userID)
          const otherParticipantUsername = userSnapshot
            .child(`${otherParticipantId}/username`)
            .val()
          const otherParticipantAvatar = userSnapshot
            .child(`${otherParticipantId}/avatar`)
            .val()

          const conversation = {
            users: users,
            id: conversationId,
            name: otherParticipantUsername,
            avatar: otherParticipantAvatar,
            // You may add logic to get the lastMessage here
            lastMessage: "Sample Last Message", // Replace with your logic to get the last message
          }

          conversations.push(conversation)
        }
      })
      conversationsList = conversations
      console.log(conversations)
      return conversations
    } else {
      console.log("User or conversations data not available")
      return []
    }
  } catch (error) {
    console.error("Error getting data:", error)
    throw error
  }
}

export async function signUp(userID, userName) {
  try {
    set(ref(database, "user/" + userID), {
      username: userName,
      avatar: "000",
    })
    const conversationRef = ref(database, "conversation")
    const newConversationRef = push(conversationRef)
    set(newConversationRef, {
      users: {
        [userID]: true,
        rob: true,
      },
    })
    const conversationID = newConversationRef._path.pieces_[1]
    console.log(
      "The new user message is at " + newConversationRef._path.pieces_[1]
    )
    const messagesRef = ref(database, "messages/" + conversationID)
    const lastMessageRef = ref(
      database,
      "messages/" + conversationID + "/lastMessage/"
    )
    const newMessageRef = push(messagesRef)
    set(newMessageRef, {
      from: "rob",
      text: "Hey there!",
      time: serverTimestamp(database),
    })
    set(lastMessageRef, {
      from: "rob",
      text: "hey there!",
      time: serverTimestamp(database),
      seen: false,
    })
    const messages = [
      "welcome to smalltalk.",
      "my name is r0b, short for r0b3rt. i'm here to help you use this simple messaging app.",
      'you can add new users to talk to by clicking the + button and typing in their username. type in "arshaq" and say hi!',
      "(he built this btw)",
      "hover (or tap) on a message and you can see the time it was sent. try it on this one!",
      "you can also change you avatar in the settings menu. how about some shades?",
      "if you find any bugs, do let arshaq know. bye!",
      "*shutting down*",
    ]
    messages.forEach((message) => robMessage(message, conversationID))
  } catch {
    console.log("Something went wrong.")
  }
}

async function robMessage(messageText, conversationID) {
  const messagesRef = ref(database, "messages/" + conversationID)
  const newMessageRef = push(messagesRef)
  set(newMessageRef, {
    from: "rob",
    text: messageText,
    time: serverTimestamp(database),
  })
}

export function addUser(userName) {
  console.log(conversationsList)
  console.log({ usersList })
  if (userName === "") {
    console.log("Enter user name")
    return
  }
  const userID = auth.currentUser.uid
  for (const user in usersList)
    if (usersList[user].username === userName) {
      if (userID === user) return "That's you."
      for (let i = 0; i < conversationsList.length; i++) {
        console.log(conversationsList[i])
        if (conversationsList[i].name === userName) {
          return "Conversation with user already exists."
        }
      }
      const conversationRef = ref(database, "conversation")
      const newConversationRef = push(conversationRef)
      set(newConversationRef, {
        users: {
          [userID]: true,
          [user]: true,
        },
      })
      return
    }
  return "User not found"
}

export async function sendMessage(conversationID, messageText) {
  if (!loggedIn) return
  const userID = auth.currentUser.uid
  if (messageText == "") {
    console.log("Enter message")
    return
  }
  const messagesRef = ref(database, "messages/" + conversationID)
  const lastMessageRef = ref(
    database,
    "messages/" + conversationID + "/lastMessage/"
  )
  const newMessageRef = push(messagesRef)
  set(newMessageRef, {
    from: userID,
    text: messageText,
    time: serverTimestamp(database),
  })
  set(lastMessageRef, {
    from: userID,
    text: messageText,
    time: serverTimestamp(database),
    seen: false,
  })
  return
}

export async function setAvatar(code, uid) {
  if (!loggedIn) return
  const avatarRef = ref(database, "user/" + uid + "/avatar")
  set(avatarRef, code)
}

export function isCorrectUser(conversationID) {
  console.log("inside isCorrectUser")
  for (let i = 0; i < conversationsList.length; i++) {
    if (conversationsList[i].id === conversationID) return true
  }
  return false
}

export function getMetadata(conversationID) {
  for (let i = 0; i < conversationsList.length; i++) {
    if (conversationsList[i].id === conversationID) return conversationsList[i]
  }
}
