import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CreateAProject() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: e.target.elements['username'].value,
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
      navigate(-1); // Vraća korisnika na prethodnu stranicu umesto na '/risk-identification'
    } else {
      alert('There was an error'); // Obrada greške
    }
  };

  return (
    <div className="project-form">
      <form onSubmit={handleSubmit}>
        <label >Your username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="project-title">Project Title:</label>
        <input type="text" id="project-title" name="project-title" />
        <br />
        <label htmlFor="project-description">Project Description:</label>
        <textarea id="project-description" name="project-description"></textarea>
        <br />
        <button type="submit">Submit</button>
        <Link to="/homepage"><button type="button">Back to Home</button></Link>
      </form>
    </div>
  );
}

export default CreateAProject;
