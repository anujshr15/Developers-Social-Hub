import React,{Component} from "react";
import {connect} from 'react-redux';
import * as profileActions from '../../store/action/profileActions';
import Spinner from '../Spinner/Spinner.js';
import {Link} from "react-router-dom";
import ProfileActions from './profileActions';
import Experience from './Experience.js';
import Education from './Education';

class Dashboard extends Component{

componentDidMount(){
	this.props.getCurrentProfile();
}


deleteHandler=(e)=>{
	e.preventDefault();
	this.props.deleteAccount();
	
}



render(){
	const {profile,loading} = this.props.profile;
	const {user}=this.props.auth;
	let dashboardContent;

	 if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
        	<div>
        	<p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
        	<ProfileActions/>
          <div style={{marginTop:'50px'}}>
          <Experience experience={profile.experience}/>
          </div>
           <div style={{marginTop:'50px'}}>
         
          <Education education={profile.education}/>
          </div>
        	</div>

        	);
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
              
        
            
              <button onClick={(e)=>this.deleteHandler(e)} className="btn btn-danger mt-4">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    );
}


}

const mapStateToProps=state=>{
	return{
	profile:state.profile,
	auth:state.auth,
	errors:state.auth.errors
}
}


const mapDispatchToProps=dispatch=>{
	return {
		getCurrentProfile:()=>dispatch(profileActions.getCurrentProfile()),
		deleteAccount:()=>dispatch(profileActions.deleteAccount())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);