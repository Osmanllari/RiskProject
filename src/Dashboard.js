import React from 'react';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
//import Comments from './Comments'; // Pretpostavimo da je ovo putanja do vaše Comments komponente


function Dashboard() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/project-definition'); // Putanja do vaše ProjectDefinition stranice
  };
  
  return (
    <div>
      
      <form>
        
        <label htmlFor="critical-risks">Identify risk</label>
        <input type="text" id="critical-risks" name="critical-risks" />
        <br />
        <label htmlFor="mitigation-strategies">Risk Description</label>
        <input type="text" id="mitigation-strategies" name="mitigation-strategies" />
        <br />
        
        <div>

        <div>
      <form>
        {/* Forma za Dashboard */}
      </form>
      
      <Link to="/homepage"><button>Back to Home</button></Link>
    </div>


      <form onSubmit={handleSubmit}>
        {/* Ostatak vaše forme */}
        <button type="submit">Submit</button>
      </form>
      <Link to="/homepage"><button>Back to Home</button></Link>
    </div>
  

        
      </form>
    </div>
  );
}

export default Dashboard;
