import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";

const BottomMenu = () => {
    return ( <div id="bottomMenu">
        <div className="bottomMenuButton"><IoAddCircleOutline className="bottomMenuButtonIcon"/></div>
        <div className="bottomMenuButton"><IoIosSettings className="bottomMenuButtonIcon"/></div>

    </div> );
}
 
export default BottomMenu;