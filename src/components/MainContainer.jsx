import ChatList from "./ChatList";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
    return ( <div id="mainContainer">
    <ChatList />
    <Outlet />
   </div> );
}
 
export default MainContainer;