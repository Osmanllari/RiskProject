import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate(`/homepage/${username}`); // Fixed route for redirection to HomePage
      } else {
        console.error('Login failed');
        alert('Incorrect username or password.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again. NE VIDI BAZU VRVT');
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className="login-form"> {/* Apply a class to the form */}
        <div className="form-group"> {/* Apply a class to the form group */}
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group"> {/* Apply a class to the form group */}
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button> {/* Apply a class to the button */}
      </form>
      <p className="create-account-link">Don't have an account? <Link to="/create-account">Create Account</Link></p> {/* Apply a class to the link */}
    </div>
  );
}

export default Login;
