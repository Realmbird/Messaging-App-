
import './ChatWindow.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ChatInvitation ({ name = "Unknown", index }) {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState('')
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        } else {
            navigate("/login");
        }
    }, []);


    const joinGroup = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chatrooms/${index}`, {
                method: 'PUT',
                headers: {
                    'Authorization': authToken,  // Sends Auth token in header
                },
            });
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                console.log('Success Added Chatroom:', data);
                // You can redirect the user or update the UI as needed
              
            } else {
              
                const errorData = await response.json(); // Fallback to text
                
                console.error('Failed to log in:', errorData);
  
                // Display a proper error message
            }
        } catch (error) {
            console.error('Error:', error);
            navigate("/login");
            // setError('An unexpected error occurred. Please try again later.');
            
        }
    }
    // id: integer, name: text, created_at: datetime, updated_at: datetime, user_id: integer
    return(
        <div className='ChatInvitation'>
           {name}
                
           <button className = "join_group" onClick={joinGroup}>Join</button>
        </div> 
    )
}

ChatInvitation.propTypes = {
    name: PropTypes.string,
};
export default ChatInvitation