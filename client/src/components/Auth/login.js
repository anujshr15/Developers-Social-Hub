import React,{Component} from 'react';
import classes from './auth.css';
import {connect} from 'react-redux';
import classnames from 'classnames';
import * as actions from '../../store/action/actions';

class Login extends Component{
 	
state={
	email:"",
	password:"",
	errors:{}
}

	componentDidMount(){
		if(this.props.isAuthenticated)
		{
			this.props.history.push("/dashboard")
		}
	}


 	inputHandler=(e)=>{
 		// const val=event.target.value;
 		// const oldState={...this.state};
 		// oldState[event.target.id]=val;
 		// this.setState(oldState);
 		this.setState({[e.target.id]:e.target.value})
 	}

 	submitHandler=(event)=>{
 		event.preventDefault();
 		const userDetails={
 			email:this.state.email,
 			password:this.state.password
 		}
 		this.setState({errors:{}})
 		this.props.loginUser(userDetails)
 	}

 	componentWillReceiveProps(nextProps){
 		if(nextProps.errors)
 		{
 			this.setState({errors:nextProps.errors})
 		}
 		if(nextProps.isAuthenticated)
 		{
 			this.props.history.push("/dashboard")
 		}

 		
 	}

 	render(){
 		const errors=this.state.errors;
 		return (<form onSubmit={(event)=>this.submitHandler(event)}className={classes.form}>
 		 		<p className="lead text-center">SIGN IN TO YOUR ACCOUNT</p>
 		 	 <div className="form-group">
 		    <label htmlFor="email">Email address</label>
 		    <input type="email" onChange={(event)=>this.inputHandler(event)} value={this.state.email} className={classnames("form-control",{"is-invalid":errors.email})} id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
 		  	{errors.email && <div className="invalid-feedback">{errors.email}</div>}
 		  </div>
 		  <div className="form-group">
 		    <label htmlFor="password">Password</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.password} type="password" className={classnames("form-control",{"is-invalid":errors.password})} id="password" placeholder="Password"/>
 		  	{errors.password && <div className="invalid-feedback">{errors.password}</div>}
 		  </div>
 		  <button type="submit" className="btn btn-success">Submit</button>
 		</form>)

 	}

}

const mapStateToProps=state=>{
	return {
		isAuthenticated:state.auth.isAuthenticated,
		errors:state.auth.errors
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		loginUser:(userData)=>dispatch(actions.loginUser(userData))
	}
}

 export default connect(mapStateToProps,mapDispatchToProps)(Login);