import React,{Component} from 'react';
import classes from './auth.css';

import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '../../store/action/actions';
 class Register extends Component{
 	
 	state={
 		name:"",
 		email:"",
 		password1:"",
 		password2:"",
 		errors:{}
 	}

 	componentWillReceiveProps(nextProps)
 	{
 		if(nextProps.errors){
 			this.setState({errors:nextProps.errors})
 		} 	}

 	inputHandler=(event)=>{
 		const val=event.target.value;
 		const oldState={...this.state};
 		oldState[event.target.id]=val;
 		this.setState(oldState);
 	}

 	submitHandler=(event)=>{
 		event.preventDefault();
 		const newUser={
 			name:this.state.name,
 			email:this.state.email,
 			password1:this.state.password1,
 			password2:this.state.password2
 		}

 		this.setState({errors:{}})
 		this.props.registerUser(newUser,this.props.history);
 		}

 		componentDidMount(){
		if(this.props.auth.isAuthenticated)
		{
			this.props.history.push("/dashboard")
		}
	}





 	render(){
 		const {errors}=this.state;
 		return (<form onSubmit={(event)=>this.submitHandler(event)}>
 			<div className={classes.form}>
 			<p className="lead text-center">SIGN UP TO THE WORLD OF DEVELOPERS</p>
 		 		<div className="form-group">

 		    <label htmlFor="name">Name</label>
 		    <input type="text" onChange={(event)=>this.inputHandler(event)} className={classnames("form-control",{"is-invalid":errors.name})} id="name" value={this.state.name} placeholder="Name"/>
 		 	{errors.name && <div className="invalid-feedback">{errors.name}</div>}
 		  </div>
 		 	 <div className="form-group">
 		    <label htmlFor="email">Email address</label>
 		    <input type="email" onChange={(event)=>this.inputHandler(event)} value={this.state.email} className={classnames("form-control",{"is-invalid":errors.email})} id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
 		    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
 		  	{errors.email && <div className="invalid-feedback">{errors.email}</div>}
 		  </div>
 		  <div className="form-group">
 		    <label htmlFor="password1">Password</label>
 		    <input type="password" onChange={(event)=>this.inputHandler(event)} value={this.state.password1} className={classnames("form-control",{"is-invalid":errors.password1})} id="password1" placeholder="Password"/>
 		 	{errors.password1 && <div className="invalid-feedback">{errors.password1}</div>}
 		 </div>
 		  <div className="form-group">
 		    <label htmlFor="password2">Confirm Password</label>
 		    <input type="password" onChange={(event)=>this.inputHandler(event)} value={this.state.password2} className={classnames("form-control",{"is-invalid":errors.password2})} id="password2" placeholder="Confirm Password"/>
 		  	{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
 		  	</div>
 		  <button type="submit" className="btn btn-primary">Submit</button>
 		  </div>
 		</form>)

 	}

}

const mapDispatchToProps=dispatch=>{
	return {
		registerUser:(userData,history)=>dispatch(actions.registerUser(userData,history))
	}
}

const mapStateToProps=state=>{
	return {
		auth:state.auth,
		errors:state.auth.errors
	}
}

 export default connect(mapStateToProps,mapDispatchToProps)(Register);