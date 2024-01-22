import ChatArea from "../components/ChatArea";
import { useParams } from "react-router-dom";
const ChatView = () => {
  const { chatid } = useParams()
    return ( <div id="chatView">
    <ChatArea chatid={chatid} />
    </div> );
}
 
export default ChatView;