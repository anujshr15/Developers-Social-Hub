import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './SideDrawer.css';
import {connect} from 'react-redux';
import * as actions from '../../store/action/actions.js';
import * as profileActions from '../../store/action/profileActions';

class SideDrawer extends Component
{


logoutHandler=(e)=>{
e.preventDefault();
this.props.clearCurrentProfile();
this.props.logoutUser();

}
	render(){
	let cl;
	if(this.props.display)
	{
		cl=[classes.SideDrawer,classes.Open]
	}
	else{
		cl=[classes.SideDrawer,classes.Close]
	}
	return (

		<div className={cl.join(' ')}>
		<ul>
		<li>
		<Link to="/all">Developers</Link>
		</li>
		<hr/>
		{this.props.auth.isAuthenticated?<div><li>
		<Link to="/feed">Posts</Link>
		</li>
		<hr/>
		<li>
		<Link to="#" onClick={this.logoutHandler}>Logout</Link>
		</li>
		<hr/></div>:<div><li>
		<Link to="/login">Login</Link>
		</li>
		<hr/>
		<li>
		<Link to="/register">Register</Link>
		</li>
		<hr/></div> }
		
		</ul>

		</div>

		)
}
}


const mapStateToProps=state=>{
	return {
		auth:state.auth
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		logoutUser:()=>dispatch(actions.logoutUser()),
		clearCurrentProfile:()=>dispatch(profileActions.clearCurrentProfile())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SideDrawer);