import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from './user_pages/SignUp.jsx'
import Login from './user_pages/Login.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
