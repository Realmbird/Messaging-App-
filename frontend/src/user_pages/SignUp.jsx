import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Form.css';

function Signup() {
    const navigate = useNavigate();
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
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-border">
            <h3>Sign Up</h3>
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

                <button type="submit">Sign Up</button>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
            <Link className="form-link" to="/login">Have an account? Sign in</Link>
        </div>
    );
}

export default Signup;
