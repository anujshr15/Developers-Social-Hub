import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import classnames from 'classnames';
import classes from './addEducation.css';
import * as profileActions from '../../store/action/profileActions';

const isEmpty=(val)=>{
	return (typeof val===undefined
			|| typeof val===null
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}



class AddEducation extends Component {

state={
school:"",
degree:"",
location:"",
from:"",
to:"",
current:false,
description:"",
errors:{},
disable:false
}





inputHandler=(event)=>{
 		const val=event.target.value;
 		const oldState={...this.state};
 		oldState[event.target.id]=val;
 		this.setState(oldState);
 	}

componentWillReceiveProps(nextProps){
if(nextProps.errors)
{
	this.setState({errors:nextProps.errors})
}

}

onCheck=()=>{
	const curCheck=this.state.current;
	const curDisable=this.state.disable;
	this.setState({current:!curCheck,disable:!curDisable})
}


submitHandler=(e)=>{
e.preventDefault();
const newEdu={
			school:this.state.school,
			degree:this.state.degree,
			location:this.state.location,
			from:this.state.from,
			to:this.state.to,
			current:this.state.current,
			description:this.state.description
			}

this.props.addEducation(newEdu,this.props.history);
}




render(){

const {errors}=this.state;


return (
	<div>
	<Link to="/dashboard" style={{marginTop:'10px'}} className="btn btn-primary">Go Back</Link>
	<form onSubmit={(event)=>this.submitHandler(event)} className={classes.form}>
 		 		<p className="lead text-center">ADD EDUCATION</p>
 		 		<hr/>
 		 	 <div className="form-group">
 		    <label htmlFor="school">School</label>
 		    <input type="text" onChange={(event)=>this.inputHandler(event)} value={this.state.school} className={classnames("form-control",{"is-invalid":errors.school})} id="school"  placeholder="School Name"/>
 		
 		  	{errors.school && <div className="invalid-feedback">{errors.school}</div>}
 		  
 		  </div>
 		  

 		  <div className="form-group">
 		    <label htmlFor="degree">Degree</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.degree } type="text" className={classnames("form-control",{"is-invalid":errors.degree})} id="degree" placeholder="Degree Name"/>
 		  	
 		  	{errors.degree && <div className="invalid-feedback">{errors.degree}</div>}
 		  	
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="location">Location</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.location } type="text" className={classnames("form-control",{"is-invalid":errors.location})} id="location" placeholder="Location"/>
 		  	{errors.location && <div className="invalid-feedback">{errors.location}</div>}
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="from">From</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.from } type="Date" className={classnames("form-control",{"is-invalid":errors.from})} id="from" placeholder="DD/MM/YY"/>
 		  </div>

 		   <div className="form-group">
 		    <label htmlFor="to">To</label>
 		    <input disabled={this.state.disable} onChange={(event)=>this.inputHandler(event)} value={this.state.to } type="Date" className={classnames("form-control",{"is-invalid":errors.to})} id="to" placeholder="DD/MM/YY"/>
 		  </div>

 		   <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    style={{width:"20px"}}
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                </div>



 		  <div className="form-group">
 		    <label htmlFor="description">Description</label>
 		    <textarea onChange={(event)=>this.inputHandler(event)} value={this.state.description }  className={classnames("form-control",{"is-invalid":errors.description})} id="description" placeholder="Write something about your degree (optional)"></textarea>
 		  	{errors.description && <div className="invalid-feedback">{errors.description}</div>}
 		  </div>

 		 

 		  <button type="submit" className="btn btn-success">Add Education</button>
 		</form>
 		</div>
	)



}






}


const mapStateToProps=state=>{
	return {
		errors:state.profile.errors,
		profile:state.profile.profile
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		addEducation:(newEdu,history)=>dispatch(profileActions.addEducation(newEdu,history))
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddEducation));
