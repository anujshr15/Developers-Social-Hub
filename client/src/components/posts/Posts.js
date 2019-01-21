import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostForm from './PostForm';
import * as postActions from '../../store/action/postActions.js';
import Spinner from '../../containers/Spinner/Spinner';
import PostFeed from './PostFeed';

class Posts extends Component {

componentDidMount(){
	this.props.getPosts();
}



	render(){

		let postContent;
		const {posts,loading}=this.props.post;

		if(posts===null || loading)
		{
			postContent=<Spinner/>;
		}
		else{
			postContent=<PostFeed posts={posts}/>;
		}

		return (

			<div className="feed">
			<div className="container">
				<div className="row">
				<div className="col-md-12">
				<PostForm/>
				{postContent}
				</div>
				</div>
				</div>
			</div>
			)
	}
}

const mapStateToProps=state=>{
	return {
		post:state.post
	}
}

const mapDispatchToProps=dispatch=>{
	return {
		getPosts:()=>dispatch(postActions.getPosts())
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Posts);