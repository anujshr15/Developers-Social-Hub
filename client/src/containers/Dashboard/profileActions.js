import React from 'react';
import {Link} from 'react-router-dom';


const profileActions=()=>{
return (

		<div className="btn-group" role="group">
			
			<Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user mr-3 text-info"/>Edit Profile</Link>
			<Link to="/add-experience" className="btn btn-light"><i className="fab fa-black-tie text-info mr-3"/>Add Experience</Link>
			<Link to="/add-education" className="btn btn-light"><i className="fas fa-graduation-cap text-info mr-3"/>Add Education</Link>

		</div>
	)
}

export default profileActions;