/* eslint-disable react/prop-types */
import './ChatWindow.css'
import { useEffect, useState } from 'react'

import { useNavigate, Outlet } from "react-router-dom";


function NewRoom ({rooms}) {
    const navigate = useNavigate();
    // fetches current_user

    // const content = rooms.map((room) =>    <div key={room.id} id = {room.id}>      <h3>{room.name}</h3></div>);
    const [error, setError] = useState(''); 
    const [authToken, setAuthToken] = useState('')
    const [formData, setFormData] = useState({
        name: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Submitting form with data:", formData); 
        try {
            const response = await fetch('http://localhost:3001/chatrooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the request is sent as JSON
                    'Authorization': authToken
                },
                body: JSON.stringify({ chatroom: formData }), // Format the body correctly
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                
                navigate("/app");
                // You can redirect the user or update the UI as needed
                setError('');
            } else {
                const errorData = await response.json();
                console.error('Failed to sign up:', response.statusText);
                // Set the error message from the server response
                setError(errorData.status.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            // getCurrentUser();
        }
    }, [authToken]);
    
    return(
        <div className="chatrooms">
                <div className="chatroom-icons">
                    <img src="/groups_24dp_5F6368.svg" alt="ChatRooms" />
                    <div>Chatrooms</div>
                </div>
                
             
                <form className="add-chatroom" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <button type="submit">{
                        <img src="/add_circle_outline_24dp_5F6368.svg" alt="Add" />
                        }</button>
                     {/* <img src="add_circle_outline_24dp_5F6368.svg" alt="Add" /> */}

                </form>
                <ul>
                    {
                    rooms.map(room => (
                        <li key={room.id} id = {room.id} onClick={ () => {
                            localStorage.setItem("chatroom_id", room.id)
                            navigate('/app/messages')
                            window.location.reload();
                        }}>{room.name}</li>
                    ))
                    }   
                </ul>
               
                    {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
                
        </div>
    )
}
export default NewRoom