import { database } from "../firebaseConfig";

async function getConversations(userId) {
    try {
      const snapshot = await database.ref('conversation').orderByChild('users').equalTo(`${userId}|`).once('value');
      //const snapshot = ref(database, 'conversation')
      const conversations = [];
  
      snapshot.forEach((childSnapshot) => {
        const conversation = childSnapshot.val();
        conversations.push({
          conversationId: childSnapshot.key,
          users: conversation.users.split('|'),
          // Other conversation details you want to include
        });
      });
  
      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error.message);
      throw error;
    }
  }

export default getConversations