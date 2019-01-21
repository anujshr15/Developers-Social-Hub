import * as actionTypes from '../action/actionTypes';

// const isEmpty=(val)=>{
// 	return (typeof val===undefined
// 			||(typeof val==="object" && Object.keys(val).length===0)
// 			||(typeof val==="string" && val.trim().length===0))
// }


const initialState={
	profile:null,
	profiles:null,
	loading:false,
	errors:null
}


export default function(state=initialState,action)
{

	switch(action.type)
	{
		case actionTypes.PROFILE_LOADING:
		return{
			...state,
			loading:true
		}

		case actionTypes.GET_PROFILE:
		return{
			...state,
			profile:action.payload,
			loading:false
		}

		case actionTypes.GET_PROFILES:
		return{
			...state,
			profiles:action.payload,
			loading:false
		} 
		case actionTypes.CLEAR_CURRENT_PROFILE:
		return {
			...state,
			profile:null
		}

		case actionTypes.START_GET_PROFILES:
		return{
			...state,
			loading:true
		}

		case actionTypes.PROFILE_LOADING:
		return {
			...state,
			loading:true
		}

		case actionTypes.GET_PROFILE:
		return {
			...state,
			profile:action.payload,
			loading:false
		}

		case actionTypes.PROFILE_NOT_FOUND:
		return {
			...state,
			profile:null,
			loading:true
		}


		case actionTypes.CREATE_PROFILE_ERROR:
		return {
			...state,
			errors:action.payload
		}

		case actionTypes.ADD_EXPERIENCE_ERROR:
		return {
			...state,
			errors:action.payload
		}

		case actionTypes.ADD_EDUCATION_ERROR:
		return {
			...state,
			errors:action.payload
		}

		case actionTypes.DELETE_EXPERIENCE_ERROR:
		return{
			...state,
			errors:action.payload
		}

		case actionTypes.DELETE_EDUCATION_ERROR:
		return{
			...state,
			errors:action.payload
		}


		default:
		return state;



	}



}