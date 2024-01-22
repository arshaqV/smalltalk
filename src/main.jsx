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
import MainContainer, { loader as ListLoader} from './components/MainContainer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat/",
        element: <MainContainer />,
        loader: ListLoader,
        children: [
          {
            path: ":chatid/",
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
