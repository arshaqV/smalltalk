import { useEffect, useState} from "react";
import { database } from "../actions/firebaseFunctions";
import { onValue,ref } from "firebase/database";


const LastMessage = ({ chatid }) => {
    const [message,setMessage] = useState({text:"",time:""})
    const [timeString, setTimeString] = useState("");
    

    useEffect(()=>{
        const calculateTime = () => {
            const time = message.time
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

        const messageRef = ref(database,"messages/"+chatid+"/lastMessage")
        onValue(messageRef,(obj)=>{
            console.log(obj.val())
            if(obj.val()!=null) {
                setMessage(obj.val())
            }
        }) 
        calculateTime()
        const intervalID = setInterval(calculateTime,60000)
        return () => clearInterval(intervalID)
    },[chatid, message.time])

    return ( 
        <div className="lastMessage">
        <div>{message.text} </div>
                <div className="lastMessageTime">{timeString}</div>
                </div>
     );
}
 
export default LastMessage;

