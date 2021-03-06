import React,{Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../containers/Spinner/Spinner';
import * as profileActions from '../../store/action/profileActions';
import ProfileItem from './profileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Connect With Developers
              </p>
              {profileItems}
            </div>
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
		getProfiles:()=>dispatch(profileActions.getProfiles())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Profiles);