import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CreateAProject() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: username, // Use the username state variable
      projectTitle: e.target.elements['project-title'].value,
      projectDescription: e.target.elements['project-description'].value,
    };

    const response = await fetch('/create-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate(-1); // Go back to the previous page
    } else {
      alert('There was an error'); // Handle error
    }
  };

  return (
    <div className="project-form">
      <form onSubmit={handleSubmit}>
        <label>Your username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="project-title">Project Title:</label>
        <input type="text" id="project-title" name="project-title" />
        <br />
        <label htmlFor="project-description">Project Description:</label>
        <textarea id="project-description" name="project-description"></textarea>
        <br />
        <button type="submit">Submit</button>
        {/* Pass the username as a parameter */}
        <Link to={`/homepage/${username}`}>
          <button type="button">Back to Home</button>
        </Link>
      </form>
    </div>
  );
}

export default CreateAProject;
