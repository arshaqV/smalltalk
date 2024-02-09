import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/root.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './routes/error.jsx';
import ChatView from './routes/chat.jsx';
import MainContainer from './components/MainContainer.jsx';
import Index from './routes/index.jsx';

const router = createBrowserRouter([
  {
    path: "/smalltalk/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat/",
        element: <MainContainer />,
        children: [
          
            {index:true, element: <Index />},
          {  path: ":chatid/",
            element: <ChatView />,
          }
        ]
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
