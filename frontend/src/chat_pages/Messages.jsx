/* eslint-disable react/prop-types */
import './ChatWindow.css'
import { useEffect, useState } from 'react'

import { useNavigate, Outlet } from "react-router-dom";


function Messages () {
    const navigate = useNavigate();
    // fetches current_user

    // const content = rooms.map((room) =>    <div key={room.id} id = {room.id}>      <h3>{room.name}</h3></div>);
    const [error, setError] = useState(''); 
    const [authToken, setAuthToken] = useState('')
    const [chatroom, setChatroom] = useState('')
    const [title, setTitle] = useState('')
    const [formData, setFormData] = useState({
        message: '',
    });
    const [posts, setPosts] = useState([])
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
            const response = await fetch(`http://localhost:3001/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the request is sent as JSON
                    'Authorization': authToken
                },
                body: JSON.stringify({ chatroom: formData, id: chatroom}), // Format the body correctly
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                
                // navigate("/app");
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
    // auth token 
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        } else {
            navigate("/login");
        }
    }, []);
    // localStorage.getItem localStorage.setItem("chatroom_id", room.id)
    // chatroom 
    useEffect(() => {
        const chatroom_id = localStorage.getItem('chatroom_id');
        if (chatroom_id) {
            setChatroom(chatroom_id);
        } else {
            navigate("/app");
        }
    }, []);


    const getPosts = async () => {
      
        try {
            const response = await fetch(`http://localhost:3001/posts?chatroom_id=${chatroom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the request is sent as JSON
                    'Authorization': authToken
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success Fetched Posts:', data);
                setPosts(data)
                // navigate("/app");
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
    const getTitle = async () => {
        try {
            const response = await fetch(`http://localhost:3001/chatrooms/${chatroom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the request is sent as JSON
                    'Authorization': authToken
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success Fetched Posts:', data);
                setTitle(data.name)
                // navigate("/app");
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
    }
    useEffect(() => {
        getPosts()
        getTitle()
    }, [chatroom]);

    useEffect(() => {
        if (authToken) {
            // getCurrentUser();
        }
    }, [authToken]);
    
    return(
        <div className="chatrooms">
                <h1>{title}</h1>
                <div className="chatroom">
                        {posts.map((post) => (
                        <>
                            <h3>{post.username}:</h3>
                            <div className = "message" key={post.id}>
                                {post.message}
                            </div>
                        </>
                    ))}
                </div>
                
             
                <form className="add-chatroom" onSubmit={handleSubmit}>
                    <input
                        placeholder = "Type a Message: "
                        type="text"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button type="submit">{
                        <img src="/add_circle_outline_24dp_5F6368.svg" alt="Add" />
                        }</button>
                     {/* <img src="add_circle_outline_24dp_5F6368.svg" alt="Add" /> */}

                </form>
                
               
                {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
                
        </div>
    )
}
export default Messages