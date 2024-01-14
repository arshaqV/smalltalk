import ChatHeader from "./ChatHeader";

const ChatArea = () => {
    return ( <div className="chatArea">
        <div id="chatHeaderId" className="chatHeader">
            <ChatHeader />
        </div>
        <div className="chatMessages">

        </div>
        <div className="chatInput">
            <input type="text" placeholder="Type message here..."></input>
        </div>
    </div> );
}
 
export default ChatArea;