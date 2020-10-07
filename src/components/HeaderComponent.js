import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component{
  render(){
    return(
      <div className="p10" >
           <Link to="/participant_new" className="m10" > New Participant </Link>
           <Link to="/participants" className="m10" > View Participants </Link>
           <Link to="/interview_new" className="m10" > New Interview </Link>
           <Link to="/" className="m10" > View Interviews </Link>
      </div>
    );
  }
}

export default Header;
