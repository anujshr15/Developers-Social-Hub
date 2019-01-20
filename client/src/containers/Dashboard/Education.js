import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as profileActions from '../../store/action/profileActions'
import Moment from 'react-moment';


class Education extends Component {

onClickRemove=(e,id)=>{
e.preventDefault();
this.props.deleteEducation(id);

}


render(){
	const eduTable=this.props.education.map(edu=>{
		return(
			<tr key={edu.id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="DD/MM/YYYY">{edu.from}</Moment> - {' '}
					{edu.to==null?"Present" : <Moment format="DD/MM/YYYY">{edu.to}</Moment> }
				</td>
				<td>
				<button onClick={(e,id)=>this.onClickRemove(e,edu.id)} className="btn btn-sm btn-danger">Remove</button>
				</td>
			</tr>

			)
	})



	return(
		<div>
		<h4>Education Credentials</h4>
		<table className="table">
			<thead>
				<tr>
					<th>School</th>
					<th>Degree</th>
					<th>Years</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{eduTable}
			</tbody>
		</table>


		</div>


		);


}


}





const mapDispatchToProps=dispatch=>{
	return {
		deleteEducation:(id)=>dispatch(profileActions.deleteEducation(id))
		
	}
}


export default connect(null,mapDispatchToProps)(Education)