import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as postActions from '../../store/action/postActions';
import Spinner from '../../containers/Spinner/Spinner';
import './PostForm.css';

const isEmpty=(val)=>{
	return (val===undefined
			|| val===null
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}


class PostForm extends Component {

state={
	text:'',
	errors:{}
}

componentWillReceiveProps(nextProps){
	if(nextProps.post.errors)
	{
		this.setState({errors:nextProps.post.errors})
	}
}


inputHandler=(e)=>{
	this.setState({[e.target.name]:e.target.value});
}

submitHandler=(e)=>{
e.preventDefault();
const {user}=this.props.auth;

const postData={
	text:this.state.text,
	name:user.name,
	avatar:user.avatar
}

this.props.addPost(postData)
this.setState({text:'',errors:{}})
}

render(){
	const {loading}=this.props.post;
	const {errors}=this.state;
	return (
		loading ?<Spinner/>:
	<div>
	
<div className="form-group shadow-textarea">
  <label for="exampleFormControlTextarea6" className="lead text-center">Add Post</label>
  <textarea onChange={(e)=>this.inputHandler(e)} value ={this.state.text} name="text" className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"  placeholder="Write something here..."></textarea>
  {errors.text && <div className="d-block invalid-feedback">{errors.text}</div>}
</div>
<button onClick={(e)=>this.submitHandler(e)} className="btn btn-info">Add</button>
</div>

		)
}

}

const mapStateToProps=state=>{
	return {
		auth:state.auth,
		post:state.post
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		addPost:(postdata)=>dispatch(postActions.addPost(postdata))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostForm);