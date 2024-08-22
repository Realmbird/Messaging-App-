
import './ChatWindow.css'
import { useEffect, useState } from 'react'
import ChatInvitation from './ChatInvitation';
import { useNavigate } from "react-router-dom";
function Discover () {
    const navigate = useNavigate();
    // fetches current_user
    const [authToken, setAuthToken] = useState('')

    // uses auth tokent to get current User
    const getChatrooms = async () => {
        try {
            const response = await fetch('http://localhost:3001/chatrooms', {
                method: 'GET',
            });
            if (response.ok) {
                console.log(response)
                const data = await response.json();
                console.log('Success:', data);
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
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        } else {
            navigate("/login");
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
           <ChatInvitation name = "bird" />
           <ChatInvitation name = "bird" />
           <ChatInvitation name = "bird" />
           <ChatInvitation name = "bird" />
           
        </div>
    )
}
export default Discover