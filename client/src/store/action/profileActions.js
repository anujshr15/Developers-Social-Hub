import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const getCurrentProfile=()=>dispatch=>{
	dispatch(profileLoading());
	axios.get("/api/profile")
			.then(resp=>{
				dispatch({
					type:actionTypes.GET_PROFILE,
					payload:resp.data
				})
			})
			.catch(err=>{
				dispatch({
					type:actionTypes.GET_PROFILE,
					payload:{}
				})
			})

}



export const createProfile=(profile,history)=>dispatch=>{
	axios.post("/api/profile",profile)
		 .then(res=> {
		 	history.push('/dashboard')
		 })
		 .catch(err=>{
		 	dispatch({
		 		type:actionTypes.CREATE_PROFILE_ERROR,
		 		payload:err.response.data
		 	})
		 })







}


export const deleteAccount=()=>dispatch=>{
	if(window.confirm("Deleting account is permanent. Do you want to continue?"))
	{
		axios.delete("/api/profile")
			.then(resp=>{
				dispatch({
					type:actionTypes.SET_CURRENT_USER,
					payload:{}
				})
			}).catch(err=>dispatch({
							type:actionTypes.DELETE_USER_FAIL,
							payload:err.response.data
						}))
	}
}




export const profileLoading=()=>{
	return {
		type:actionTypes.PROFILE_LOADING
	}
}

export const clearCurrentProfile=()=>{
	return {
		type:actionTypes.CLEAR_CURRENT_PROFILE
	}
}