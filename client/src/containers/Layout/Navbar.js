import React,{Component} from 'react';
import classes from './Navbar.css';
import {NavLink,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import * as actions from '../../store/action/actions';
import * as profileActions from '../../store/action/profileActions'
import Backdrop from '../../components/Backdrop/Backdrop';

class Navbar extends Component {

state={
display:false
}


logoutHandler=(e)=>{
e.preventDefault();
this.props.clearCurrentProfile();
this.props.logoutUser();

}


showHandler=()=>{
const curDisplay=this.state.display;
this.setState({display:!curDisplay})
}

clickHandler=()=>{
  this.setState({display:false})
}


	render(){
    
    let privateRoute=null;
    if(this.props.isAuthenticated)
    {
      
      privateRoute=(<ul className={classes.ul}>
        <li className={classes.li}>
        
          <NavLink to="/feed">
            Posts
          </NavLink>
          </li>
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
      <div>
      <nav className={classes.nav}>
        <span>{this.props.isAuthenticated?(<Link style={{textDecoration:'none'}} to="/dashboard">Developer Hub</Link>):<Link style={{textDecoration:'none'}} to="/">Developer Hub</Link>}</span>
        <span><Link style={{textDecoration:'none'}} className={["small","ml-3","text-muted",classes.dev].join(' ')} to="/all">Developers</Link></span>
        <div onClick={this.showHandler} className="d-inline-block float-right mt-2" >
          <div className={classes.ham}></div>
          <div className={classes.ham}></div>
          <div className={classes.ham}></div>
        </div>
        {this.props.isAuthenticated?privateRoute:guestRoutes}
      </nav>
      <div onClick={this.clickHandler}>
       {this.state.display?<SideDrawer display={this.state.display}/>:null}
       <Backdrop show={this.state.display}/>
      </div>
      </div>

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


