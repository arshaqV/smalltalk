import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import { addUser } from "../actions/firebaseFunctions";

const BottomMenu = () => {
    const [isAddShadeOpen, setAddShade] = useState(false)
    const [isSettingsShadeOpen, setSettingsShade] = useState(false)

    function toggleAddShade() {
        setAddShade(!isAddShadeOpen)
        setSettingsShade(false)
        
    }

    function toggleSettingsShade() {
        setSettingsShade(!isSettingsShadeOpen)
        setAddShade(false)
    }

    function addUserAction() {
        const username = document.getElementById("addUserText").value
        addUser(username)
    }

    return ( <div id="bottomMenu">
        { isAddShadeOpen ? (
        
            <div className="shade" id="addShade">
                Add new user
            <div style={{display:"flex"}}>
                <input id="addUserText" type="text"></input>
                <button onClick={addUserAction}>ADD</button>
            </div>
            </div>
        ) : null }
        { isSettingsShadeOpen ? (
            <div className="shade" id="settingsShade">TEST2</div>
        ) : null }
        <div className="bottomMenuButton" onClick={toggleAddShade}><IoAddCircleOutline className="bottomMenuButtonIcon"/></div>
        <div className="bottomMenuButton" onClick={toggleSettingsShade}><IoIosSettings className="bottomMenuButtonIcon"/></div>
    </div> );
}
 
export default BottomMenu;