
import * as actionTypes from '../action/actionTypes';

const isEmpty=(val)=>{
	return (typeof val===undefined
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}




const initialState={
isAuthenticated:false,
user:{},
errors:{}
}

export default function(state=initialState,action)
{
	switch(action.type)
	{
		case actionTypes.REGISTER_USER:
		{
			return {
				...state,
				user:action.payload
			}
		}

		case actionTypes.REGISTER_USER_START:
		{
			return state;
		}

		case actionTypes.REGISTER_USER_FAIL:
		{
			return {
				...state,
				errors:action.payload
			}
		}

		case actionTypes.REGISTER_USER_SUCCESS:
		{
			return {
				...state,
				token:action.token
			}
		}

		case actionTypes.LOGIN_USER_START:
		{
			return state;
		}

		case actionTypes.LOGIN_USER_FAIL:
		{
			return {
				...state,
				errors:action.payload
			}
		}

		case actionTypes.SET_CURRENT_USER:
		{
			return {
				...state,
				isAuthenticated:!isEmpty(action.payload),
				user:action.payload
			}
		}

		case actionTypes.DELETE_USER_FAIL:
		{
			return {
				...state,
				errors:action.payload
			}
		}
		default:
		return state;
	}
}