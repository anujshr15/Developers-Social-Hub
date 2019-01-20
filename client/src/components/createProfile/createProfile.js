import React,{Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import classes from './createProfile.css';
import {withRouter} from 'react-router-dom';
import * as profileActions from '../../store/action/profileActions';
class CreateProfile extends Component {

state={
displaySocialInputs:false,
handle:"",
bio:"",
skills:"",
status:"",
location:"",
website:"",
youtube:"",
facebook:"",
linkedin:"",
instagram:"",
twitter:"",
githubusername:"",
company:"",
errors:{}
}

addSocialButton=(event)=>{
	event.preventDefault();
	this.setState(prevState=>({displaySocialInputs:!prevState.displaySocialInputs}))
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


submitHandler=(e)=>{
e.preventDefault();
const profileData={
handle:this.state.handle,
bio:this.state.bio,
skills:this.state.skills,
status:this.state.status,
location:this.state.location,
website:this.state.website,
youtube:this.state.youtube,
	facebook:this.state.facebook,
	linkedin:this.state.linkedin,
	instagram:this.state.instagram,
	twitter:this.state.twitter,
githubusername:this.state.githubusername,
company:this.state.company
}


this.props.createProfile(profileData,this.props.history);


}




render(){


	const options=[
{label:'Select Your Profession',value:0},
{label:'Front End Developer',value:'Front End Developer'},
{label:'Back End Developer',value:'Back End Developer'},
{label:'Full Stack Developer',value:'Full Stack Developer'},
{label:'Student or Intern',value:'Student or Intern'},
{label:'Teacher or Instructor ',value:'Teacher or Instructor'},
{label:'Senior Developer',value:'Senior Developer'},
{label:'Other',value:'Other'}
];



const {errors,displaySocialInputs}=this.state;

let socialInputs;

if(displaySocialInputs)
{
	socialInputs=(
		<div >
		<div className="form-group mb-3">
		<div className="input-group-prepend">
		<span className="input-group-text">
		 <i className="fab fa-twitter"/>

		 </span>
		 <input type="text" value={this.state.twitter} onChange={(e)=>this.inputHandler(e)} id="twitter" placeholder="Twitter URL"/>
		 {errors.twitter && <div className="invalid-feedback">{errors.twitter}</div>}
 		  </div>
		 </div>
		
		
  		


  		<div className="form-group mb-3">
		<div className="input-group-prepend ">
		<span className="input-group-text">
		 <i className="fab fa-facebook-square"></i>
		 </span>
		 
		<input type="text" value={this.state.facebook} onChange={(e)=>this.inputHandler(e)} id="facebook" className="input-field" placeholder="Facebook URL"/>
		{errors.facebook && <div className="invalid-feedback">{errors.facebook}</div>}
 		  </div>
		</div>
  		


  		<div className="form-group mb-3">
		<div className="input-group-prepend">
		<span className="input-group-text">
		 <i className="fab fa-linkedin"></i>
		 </span>
		<input type="text" value={this.state.linkedin} onChange={(e)=>this.inputHandler(e)} id="linkedin" className="input-field" placeholder="linkedin URL"/>
		{errors.linkedin && <div className="invalid-feedback">{errors.linkedin}</div>}
 		  </div>
		</div>
  		


  		<div className="form-group mb-3">
		<div className="input-group-prepend">
		<span className="input-group-text">
		 <i className="fab fa-youtube"></i>
		 </span>
		<input type="text" value={this.state.youtube} onChange={(e)=>this.inputHandler(e)} id="youtube" className="input-field" placeholder="Youtube URL"/>
		{errors.youtube && <div className="invalid-feedback">{errors.youtube}</div>}
 		  </div>
		</div>
  		


  		<div className="form-group mb-3">
		<div className="input-group-prepend">
		<span className="input-group-text">
		 <i className="fab fa-instagram"></i>
		 </span>
		<input type="text" value={this.state.instagram} onChange={(e)=>this.inputHandler(e)} id="instagram" className="input-field" placeholder="Instagram URL"/>
		{errors.instagram && <div className="invalid-feedback">{errors.instagram}</div>}
 		  </div>
		</div>
  		
		</div>
		)

}



return (<form onSubmit={(event)=>this.submitHandler(event)} className={classes.form}>
 		 		<p className="lead text-center">CREATE YOUR PROFILE</p>
 		 		<hr/>
 		 	 <div className="form-group">
 		    <label htmlFor="handle">Handle</label>
 		    <input type="text" onChange={(event)=>this.inputHandler(event)} value={this.state.handle} className={classnames("form-control",{"is-invalid":errors.handle})} id="handle"  placeholder="Enter handle"/>
 		  	<small className="d-block pb-3 text-muted">A unique handle for your profile</small>
 		  	{errors.handle && <div className="invalid-feedback">{errors.handle}</div>}
 		  
 		  </div>
 		  <div className="form-group">
 		    <label htmlFor="status">Status</label>
 		    <select onChange={(event)=>this.inputHandler(event)} value={this.state.status } className={classnames("form-control",{"is-invalid":errors.status})} id="status">
 		    {options.map(opt=>{
 		    	

 		    	return  <option value={opt.value}>{opt.label}</option>


 				}
 		    )
 			}
 		    </select>
 		   
 		  	{errors.status && <div className="invalid-feedback">{errors.status}</div>}
 		  </div>



 		  <div className="form-group">
 		    <label htmlFor="skills">Skills</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.skills } type="text" className={classnames("form-control",{"is-invalid":errors.skills})} id="skills" placeholder="*Skills"/>
 		  	<small className="d-block pb-3 text-muted">*Seperate skills using comma e.g HTML,CSS,JavaScript</small>
 		  	{errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
 		  	
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="location">Location</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.location } type="text" className={classnames("form-control",{"is-invalid":errors.location})} id="location" placeholder="Location"/>
 		  	{errors.location && <div className="invalid-feedback">{errors.location}</div>}
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="bio">Bio</label>
 		    <textarea onChange={(event)=>this.inputHandler(event)} value={this.state.bio }  className={classnames("form-control",{"is-invalid":errors.bio})} id="bio" placeholder="Write something about yourself in brief"></textarea>
 		  	{errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="githubusername">Github Username</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.githubusername } type="text" className={classnames("form-control",{"is-invalid":errors.githubusername})} id="githubusername" placeholder="Your Github Username"/>
 		  	{errors.githubusername && <div className="invalid-feedback">{errors.githubusername}</div>}
 		  </div>

 		  <div className="form-group">
 		    <label htmlFor="website">Website</label>
 		    <input onChange={(event)=>this.inputHandler(event)} value={this.state.website } type="text" className={classnames("form-control",{"is-invalid":errors.website})} id="website" placeholder="Your Website URL"/>
 		  	{errors.website && <div className="invalid-feedback">{errors.website}</div>}
 		  </div>

 		  <div className="mb-3">
 		  <button  onClick={(event)=>this.addSocialButton(event)} className="btn btn-light" >Add Social Links</button>
 		  <span className="text-muted">Optional</span>
 		  </div>
 		  {socialInputs}

 		  <button type="submit" className="btn btn-success">Submit</button>
 		</form>
	)



}






}


const mapStateToProps=state=>{
	return {
		errors:state.profile.errors
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		createProfile:(profile,history)=>dispatch(profileActions.createProfile(profile,history))
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CreateProfile));