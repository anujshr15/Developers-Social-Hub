import React,{Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../containers/Spinner/Spinner';
import {Link} from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import * as profileActions from '../../store/action/profileActions';

class Profile extends Component {

	componentDidMount(){
		console.log(this.props)
			const handle=window.location.href.substr(window.location.href.lastIndexOf("/")+1,window.location.href.length);
			this.props.getProfile(handle);
	}


render(){

	const {profile,loading}=this.props.profile;
	let profileContent;
	if(profile===null||loading)
	{
		profileContent=<Spinner/>
	}

	else{
		
			profileContent=(
				<div>
				<div className="row">
					<div className="col-md-6">
					<Link to="/all" className="btn btn-light mt-3 mb-3 float-left">Back to Profiles</Link>
					</div>
					<div className="col-md-6"/>
				</div>
			<ProfileHeader profile={profile}/>
			<ProfileAbout profile={profile}/>
			<ProfileCreds profile={profile}/>
			<ProfileGithub/>
			</div>)
		
		
	}


	return (

		<div className="profile">
				<div className="container">
					<div className="row">
					<div className="col-md-12">
					{profileContent}
					</div>
					</div>

				</div>
		
		</div>

		)
}



}



const mapStateToProps=state=>{
	return {
		profile:state.profile
	}
}


const mapDispatchToProps=dispatch=>{
	return {
		getProfile:(handle)=>dispatch(profileActions.getProfile(handle))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);