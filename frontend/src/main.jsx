import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from './user_pages/SignUp.jsx'
import Login from './user_pages/Login.jsx'
import User from './user_pages/User.jsx'
import Discover from './chat_pages/Discover.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatWindow from './chat_pages/ChatWindow.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sign_up",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "app",
    element: <ChatWindow />,
    children: [
      { path: "discover", element:  <Discover />},
    ],
  }, {
    path: "user",
    element: <User />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
