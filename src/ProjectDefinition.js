import React from 'react';
import { Link } from 'react-router-dom';

function ProjectDefinition() {
  return (
    <div>
      <h2>Project Definition</h2>
      {/* Ovde možete dodati detalje o projektu */}
      <Link to="/homepage">Back to Home</Link>
    </div>
  );
}

export default ProjectDefinition;
