import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Form.css'
function Login () {
    const navigate = useNavigate();
    const [error, setError] = useState(''); 
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    function handleChange (e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log("Submitting form with data:", formData); 
      try {
          const response = await fetch('http://localhost:3001/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',  // Ensure the request is sent as JSON
              },
              body: JSON.stringify({ user: formData }), // Format the body correctly
          });
          if (response.ok) {
                const headers = response.headers;
                const authToken = headers.get('Authorization'); // This is how you would retrieve the Authorization token
                console.log(authToken)
                // // Optionally, store the auth token in localStorage or sessionStorage
                if (authToken) {
                    localStorage.setItem('authToken', authToken);
                }
              console.log(response)
              const data = await response.json();
              console.log('Success:', data);
              navigate("/app");
              // You can redirect the user or update the UI as needed
              setError('');
          } else {
            
              const errorData = await response.text(); // Fallback to text
              
              console.error('Failed to log in:', errorData);

              // Display a proper error message
              setError( errorData || 'An unexpected error occurred. Please try again later.');
          }
      } catch (error) {
          console.error('Error:', error);
          // setError('An unexpected error occurred. Please try again later.');
          
      }
  };
    return (
        // localhost:3001/signup signup route
        <div className="form-border">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
  
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
          />
  
          <button type="submit">Login In</button>
        </form>
        {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
        <Link className = "form-link" to="/sign_up">Don't have an account? Sign up</Link>
      </div>
    )
}
export default Login