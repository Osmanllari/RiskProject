import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css'; // Import CSS file

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Account created successfully!');
        navigate('/'); // Redirect to login page after account creation
      } else {
        const data = await response.json();
        alert(`Account creation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred during account creation. Please try again.');
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className="login-form"> {/* Apply a class to the form */}
        <div className="form-group"> {/* Apply a class to the form group */}
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group"> {/* Apply a class to the form group */}
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Create Account</button> {/* Apply a class to the button */}
      </form>
      <p className="create-account-link">Already have an account? <Link to="/login">Login</Link></p> {/* Apply a class to the link */}
    </div>
  );
}

export default CreateAccount;
