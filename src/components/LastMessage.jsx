import { useEffect, useState} from "react";
import { database } from "../actions/firebaseFunctions";
import { onValue,ref } from "firebase/database";


const LastMessage = ({ lastMessage, userid }) => {
    const [message, setMessage] = useState({time:"",text:""})
    const [timeString, setTimeString] = useState("");
    

    useEffect(()=>{
        setMessage(lastMessage)
        const calculateTime = () => {
            const time = lastMessage.time || ""
            if(time==="" || time===undefined)
                return "-"
            const serverDate = new Date(time);
    
            const currentDate = new Date();
            const timeDifference = currentDate - serverDate;
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    
            // Create a string based on the time difference
            let timeString;
            if (weeksDifference > 0) {
            timeString = weeksDifference === 1 ? "1w" : `${weeksDifference}d`;
            } else if (daysDifference > 0) {
            timeString = daysDifference === 1 ? "1d" : `${daysDifference}d`;
            } else if (hoursDifference > 0) {
            timeString = hoursDifference === 1 ? "1h" : `${hoursDifference}h`;
            } else if (minutesDifference > 0) {
            timeString = minutesDifference === 1 ? "1m" : `${minutesDifference}m`;
            } else {
            timeString = "now";
            }
            setTimeString(timeString)
        }
        
        
        calculateTime()
        const intervalID = setInterval(calculateTime,60000)
        return () => clearInterval(intervalID)
    },[lastMessage])

    return ( 
        <div className="lastMessage">
            
        {message && (<div className="lastMessageText">{(message.from==="other") ? "You: " : "" }{message.text} </div>)}
                {message && <div className="lastMessageTime">{timeString}</div>}
                </div>
     );
}
 
export default LastMessage;

