import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ metadata }) => {
    const navigate = useNavigate()
    const back = () => {
        navigate("/chat")
    }

    return ( <div className="chatHeaderContainer">
        <IoArrowBack id="backButton" onClick={back}/>
        <div className="headerAvatar" style={{
            backgroundColor:"#111",
        }}>
        </div>
        <div className="headerName">{metadata.name}</div>
    </div> );
}
 
export default ChatHeader;