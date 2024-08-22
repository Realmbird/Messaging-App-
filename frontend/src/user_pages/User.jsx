import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Form.css';


function User() {
    // authentication to get current user
    const navigate = useNavigate();
    // fetches current_user
    const [authToken, setAuthToken] = useState('')

    const [error, setError] = useState(''); 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
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
                setFormData(data)
                console.log(formData)
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


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Submitting form with data:", formData); 
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the request is sent as JSON
                },
                body: JSON.stringify({ user: formData }), // Format the body correctly
            });

            if (response.ok) {
                const headers = response.headers;
                const authToken = headers.get('Authorization');
                 // This is how you would retrieve the Authorization token
                console.log(authToken)
                // // Optionally, store the auth token in localStorage or sessionStorage
                if (authToken) {
                    localStorage.setItem('authToken', authToken);
                }
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
            navigate("/login");
            console.error('Error:', error);
        }
    };

    function logout() {
        console.log("logged out")
        localStorage.removeItem('authToken');
        navigate("/login");
    }
    return (
        <div className="form-border">
            <h3>User Profile</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Username:</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="6"
                />

                <button type="submit">Update</button>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
            <button className = "logout" onClick={logout}>Logout</button>
        </div>
    );
}

export default User;
