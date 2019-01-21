import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as postActions from '../../store/action/postActions';
import Spinner from '../../containers/Spinner/Spinner';
import './PostForm.css';

class PostForm extends Component {

state={
	text:'',
	errors:{}
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

this.props.addPost(postData,this.props.history)
}

render(){
	return (
	<div>
	
<div className="form-group shadow-textarea">
  <label for="exampleFormControlTextarea6" className="lead text-center">Add Post</label>
  <textarea onChange={(e)=>this.inputHandler(e)} value ={this.state.text} name="text" className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3"  placeholder="Write something here..."></textarea>
</div>
<button onClick={(e)=>this.submitHandler(e)} className="btn btn-info">Add</button>
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
	return{
		addPost:(postdata,history)=>dispatch(postActions.addPost(postdata,history))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostForm);