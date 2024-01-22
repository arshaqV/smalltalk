const ChatHeader = ({ metadata }) => {
    return ( <div className="chatHeaderContainer">
        <div className="headerAvatar" style={{
            backgroundColor:"#111",
        }}>
        </div>
        <div className="headerName">{metadata.name}</div>
    </div> );
}
 
export default ChatHeader;