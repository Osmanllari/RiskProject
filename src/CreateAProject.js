import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAProject.css'; // Import CSS file for styling

function CreateAProject() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: username,
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
      navigate(`/homepage/${username}`);
    } else {
      alert('There was an error');
    }
  };

  return (
    <div className="project-form-container">
      <h2>Create a New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Your username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <label htmlFor="project-title">Project Title:</label>
        <input type="text" id="project-title" name="project-title" placeholder="Enter project title" />
        <label htmlFor="project-description">Project Description:</label>
        <textarea
          id="project-description"
          name="project-description"
          placeholder="Enter project description"
        ></textarea>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <Link to={`/homepage/${username}`} className="back-link">
        <button type="button" className="back-button">Back to Home</button>
      </Link>
    </div>
  );
}

export default CreateAProject;
