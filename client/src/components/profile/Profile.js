import React,{Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../containers/Spinner/Spinner';
import {Link,withRouter} from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
//import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import * as profileActions from '../../store/action/profileActions';

class Profile extends Component {

	componentDidMount(){
		
			const handle=window.location.href.substr(window.location.href.lastIndexOf("/")+1,window.location.href.length);
			this.props.getProfile(handle);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.profile.profile===null && this.props.profile.loading)
			{
				console.log(this.props)
			this.props.history.push('/not-found');

		}
	}


render(){

	const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/all" className="btn btn-light mb-3 mt-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds   profile={profile}/>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Profile));