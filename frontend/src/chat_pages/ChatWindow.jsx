import Sidebar from './Sidebar.jsx'
import './ChatWindow.css'
import { useEffect, useState } from 'react'
import Login from '../user_pages/Login.jsx'
import { useNavigate } from "react-router-dom";

function ChatWindow () {
    const navigate = useNavigate();
    // fetches current_user
    const [authToken, setAuthToken] = useState('')

    // uses auth tokent to get current User
    const getCurrentUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/current_user', {
                method: 'GET',
                headers: {
                    'Authorization': authToken,  // Sends Auth token in header
                },
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
            getCurrentUser();
        }
    }, [authToken]);
    
    return(
        <div className='ChatWindow'>
            <Sidebar> </Sidebar>
        </div> 
    )
}
export default ChatWindow