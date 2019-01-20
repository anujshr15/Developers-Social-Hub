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


export const getProfile=(handle)=>dispatch=>{
	dispatch(startLoading())
	axios.get('/api/profile/handle/'+handle)
		  .then(res=>{
		  	dispatch({
		  		type:actionTypes.GET_PROFILE,
		  		payload:res.data
		  	})
		  }).catch(err=>{
		  	dispatch({
		  		type:actionTypes.PROFILE_NOT_FOUND,
		  		payload:{}
		  	})
		  })
}

export const startLoading=()=>{
	return {
		type:actionTypes.PROFILE_LOADING
	}
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


export const addExperience=(exp,history)=>dispatch=>{
axios.post("/api/profile/experience",exp)
	 .then(resp=>history.push("/dashboard"))
	 .catch(err=>{
	 		dispatch({
	 			type:actionTypes.ADD_EXPERIENCE_ERROR,
	 			payload:err.response.data
	 		})
	 })
}


export const deleteExperience=(id)=>dispatch=>{
	axios.delete("/api/profile/experience/"+id)
		 .then(resp=>dispatch({
		 	type:actionTypes.GET_PROFILE,
		 	payload:resp.data
		 }))
		 .catch(err=>dispatch({
		 	type:actionTypes.DELETE_EXPERIENCE_ERROR,
		 	payload:err.response.data
		 }))
}


export const deleteEducation=(id)=>dispatch=>{
	axios.delete("/api/profile/education/"+id)
		 .then(resp=>dispatch({
		 	type:actionTypes.GET_PROFILE,
		 	payload:resp.data
		 }))
		 .catch(err=>dispatch({
		 	type:actionTypes.DELETE_EDUCATION_ERROR,
		 	payload:err.response.data
		 }))
}


export const addEducation=(edu,history)=>dispatch=>{
	axios.post("/api/profile/education",edu)
		 .then(resp=>history.push("/dashboard"))
		 .catch(err=>{
		 	dispatch({
		 		type:actionTypes.ADD_EDUCATION_ERROR,
		 		payload:err.response.data
		 	})
		 })
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


export const getProfiles=()=>dispatch=>{
	dispatch(startGetProfiles())
	axios.get("/api/profile/all")
		  .then(resp=>{
		  	dispatch({
		  		type:actionTypes.GET_PROFILES,
		  		payload:resp.data
		  	})
		  }).catch(err=>{
		  	dispatch({type:actionTypes.GET_PROFILES,
		  			 payload:{}})
		  })
}

export const startGetProfiles=()=>{
	return {
		type:actionTypes.START_GET_PROFILES
	}
}

