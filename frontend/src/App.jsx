import { useState } from 'react'
import ChatWindow from './chat_pages/ChatWindow.jsx'
import { Link } from "react-router-dom";
import './App.css'


function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className='app'>
      <div className="header">
        <div className="right">
          <i className="devicon-github-original colored"></i>
          
          <i className="devicon-linkedin-plain colored"></i>
          <h3>Forest Messanger</h3>
        </div>
        <div className="left">
        <Link className="form-link" to="/login">Sign in</Link>
        </div>
        
      </div>
      <div className="body">
        Forest Messenger offers users a seamless communication experience, allowing them to connect with friends, family, or communities in a beautifully designed interface
      </div>
      
          
    </div>
  )
}

export default App
