import Avatar from "./Avatar";

const ChatHeader = ({ metadata, avatarImages, cool }) => {
    console.log({metadata})

    return ( <div className="chatHeaderContainer">
        <div className="headerAvatar" >
            {metadata.avatar && <Avatar code={metadata.avatar} avatarImage={avatarImages[metadata.avatar[0]]} cool={cool}  /> }
        </div>
        <div className="headerName">{metadata.name}</div>
    </div> );
}
 
export default ChatHeader;