import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './HomePage.css'; // Import CSS file for styling

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Uhvatite username iz URL-a pomoću useParams hook-a
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      // Fetch projects from the server
      fetch(`/list_pro/${username}`)
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => console.error('Error fetching projects:', error));
    }
  }, [username]);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for submitting the form data
    console.log('Form submitted!');
    // Close the modal after form submission
    toggleModal();
  };

  return (
    <div className='dugmehp'>
      <div>
        <h2>{username ? `${username}'s Projects` : 'Projects'}</h2>
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              {project.projectname}
              <Link to={`/dashboard/${project.id}`}>
                <button>Go to Dashboard</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleModal}>Chat</button>
      <Link to="/create-a-project"><button>Create a Project</button></Link>
      {/* Popup */}
      <div className="popup" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="popup-content">
          <span className="close" onClick={toggleModal}>&times;</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="commentInput">Leave a comment:</label>
            <input type="text" id="commentInput" name="comment" />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
