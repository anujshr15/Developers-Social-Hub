import React,{Component} from 'react';
import classes from './Navbar.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/action/actions';
import * as profileActions from '../../store/action/profileActions'
class Navbar extends Component {



logoutHandler=(e)=>{
e.preventDefault();
this.props.clearCurrentProfile();
this.props.logoutUser();

}


	render(){
    
    let privateRoute=null;
    if(this.props.isAuthenticated)
    {
      
      privateRoute=(<ul className={classes.ul}>
          <li className={classes.li}>
          <NavLink to=""  onClick={(e)=>this.logoutHandler(e)}>
          <img src={this.props.user.avatar} alt={this.props.user.name} style={{width:'30px',marginRight:'5px',borderRadius:'20px'}} title="you must have your gravatar linked to your email "/>
            {' '} Logout
          </NavLink>
          </li>
          </ul>);
    }


    const guestRoutes=(<ul className={classes.ul}>
          <li className={classes.li}>
          <NavLink to="/login">
            Login
          </NavLink>
          </li>
          <li className={classes.li}>
          <NavLink to="/register">
            Register
            </NavLink>
          </li>
        </ul>);

   
     

    
		return(
      <nav className={classes.nav}>
        <span>Developer Hub</span>
        {this.props.isAuthenticated?privateRoute:guestRoutes}
      </nav>


			);

	}
}


const mapStateToProps=state=>{
  return {
    isAuthenticated:state.auth.isAuthenticated,
    user:state.auth.user
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    logoutUser:()=>dispatch(actions.logoutUser()),
    clearCurrentProfile:()=>dispatch(profileActions.clearCurrentProfile())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);


