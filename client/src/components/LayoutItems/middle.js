import React,{Component} from 'react';
import classes from './middle.css';
import {connect} from 'react-redux';

class Middle extends Component {

componentDidMount(){
	if(this.props.isAuthenticated)
	{
		this.props.history.push("/dashboard")
	}
}



render(){
return (
	<div className={[classes.image,"img-responsive"].join(' ')}>
	<div className={classes.text}>
	<p>JOIN THE WORLD OF<br/> DEVELOPERS</p>
	<button className="btn btn-success" onClick={()=>this.props.history.push("/register")}>JOIN</button>
	</div>
	</div>
	
	

	

	)
}
}


const mapStateToProps=store=>{
	return {
		isAuthenticated:store.auth.isAuthenticated
	}
}


export default connect(mapStateToProps,null)(Middle);