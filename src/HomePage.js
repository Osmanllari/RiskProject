import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <label htmlFor="commentInput">Leave a comment:</label>
            <input type="text" id="commentInput" name="comment" />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
