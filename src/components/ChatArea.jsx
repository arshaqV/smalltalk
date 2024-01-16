import ChatHeader from "./ChatHeader";
import { IoSend } from "react-icons/io5";

const ChatArea = () => {
    return ( <div className="chatArea">
        <div id="chatHeaderId" className="chatHeader">
            <ChatHeader />
        </div>
        <div className="chatMessages">
            <div className="message messageSent">This is a really, really, really, really, really long message that you sent</div>
            <div className="message">This is a really really really long message that you got</div>
            <div className="message">This is a message you got</div>
            <div className="message messageSent">This is a message you sent</div>
        </div>
        <div id="chatInputId" className="chatInput">
            <input id="chatTextInput" type="text" placeholder="Type message here..."></input>
            <div id="sendButton"><IoSend id="sendButtonIcon"/></div>
        </div>
    </div> );
}
 
export default ChatArea;