import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
// import * as profileActions from '../../store/action/profileActions';


const isEmpty=(val)=>{
	return (
			 val===null
			||val===undefined
			|| val===false
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}


class ProfileHeader extends Component {
  render() {

    const { profile } = this.props;
   
    // profile.social.facebook=isEmpty(profile.social.facebook)?"":profile.social.facebook
    // profile.social.youtube=isEmpty(profile.social.youtube)?"":profile.social.youtube
    // profile.social.instagram=isEmpty(profile.social.instagram)?"":profile.social.instagram
    // profile.social.linkedin=isEmpty(profile.social.linkedin)?"":profile.social.linkedin
    // profile.social.twitter=isEmpty(profile.social.twitter)?"":profile.social.twitter
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle img-fluid"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {(isEmpty(profile.social.twitter) )? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {(isEmpty(profile.social.facebook)) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {(isEmpty(profile.social.linkedin)) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {(isEmpty(profile.social.youtube) )? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {(isEmpty(profile.social.instagram)) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default ProfileHeader;

