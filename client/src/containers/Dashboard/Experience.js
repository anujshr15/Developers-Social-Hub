import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as profileActions from '../../store/action/profileActions'
import Moment from 'react-moment';


class Experience extends Component {

onClickRemove=(e,id)=>{
e.preventDefault();
this.props.deleteExperience(id);

}


render(){
	const expTable=this.props.experience.map(exp=>{
		return(
			<tr key={exp.id}>
				<td>{exp.title}</td>
				<td>{exp.company}</td>
				<td>
					<Moment format="DD/MM/YYYY">{exp.from}</Moment> - {' '}
					{exp.to==null?"Present" : <Moment format="DD/MM/YYYY">{exp.to}</Moment> }
				</td>
				<td>
				<button onClick={(e,id)=>this.onClickRemove(e,exp.id)} className="btn btn-sm btn-danger">Remove</button>
				</td>
			</tr>

			)
	})



	return(
		<div>
		<h4>Experience Credentials</h4>
		<table className="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Company</th>
					<th>Years</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{expTable}
			</tbody>
		</table>


		</div>


		);


}


}





const mapDispatchToProps=dispatch=>{
	return {
		deleteExperience:(id)=>dispatch(profileActions.deleteExperience(id))
		
	}
}


export default connect(null,mapDispatchToProps)(Experience)