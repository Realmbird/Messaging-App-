
import './ChatWindow.css'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation';
import { useNavigate } from "react-router-dom";
function Discover () {
    const navigate = useNavigate();
    // fetches current_user
    const [authToken, setAuthToken] = useState('')
    const [chatrooms, setChatrooms] = useState([])

    // uses auth tokent to get current User
    const getChatrooms = async () => {
        try {
            const response = await fetch('http://localhost:3001/chatrooms', {
                method: 'GET',
                headers: {
                    'Authorization': authToken,  // Sends Auth token in header
                },
            });
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                setChatrooms(data)
                console.log('Success Chatroom:', data);
                // You can redirect the user or update the UI as needed
              
            } else {
              
                const errorData = await response.json(); // Fallback to text
                
                console.error('Failed to log in:', errorData);
  
                // Display a proper error message
            }
        } catch (error) {
            console.error('Error:', error);
            // navigate("/login");
            // setError('An unexpected error occurred. Please try again later.');
            
        }
    } 
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        } else {
            // navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (authToken) {
            // 
            console.log(authToken)
            getChatrooms()
        }
    }, [authToken]);
    
    return (
        <div className="discover">
            {chatrooms.map((chatroom) => (
                <ChatInvitation key = {chatroom.id} index = {chatroom.id} name = {chatroom.name} />
            ))}
        </div>
    )
}
export default Discover