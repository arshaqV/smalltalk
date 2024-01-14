import './App.css'
import { Outlet } from 'react-router-dom'
import LoginBox from '../components/LoginBox'
import ChatList from '../components/ChatList'

function App() {
  return (
    <>
      <div id="smalltalk">
        smalltalk. 
      </div>
      <div id="headerLine"></div>
      <LoginBox />
      <div id="mainContainer">
       <ChatList />
       <Outlet />
      </div>
    </>
  )
}

export default App
