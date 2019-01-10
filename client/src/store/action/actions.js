import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';
import setAuthToken from '../../utility/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUserStart=()=>{
	return {
		type:actionTypes.REGISTER_USER_START
	}
}

export const registerUserSuccess=(user)=>{
	console.log(user);
	return {
		type:actionTypes.REGISTER_USER_SUCCESS,
		token:user.token
	}

}

export const registerUserFail=(error)=>{
	return {
		type:actionTypes.REGISTER_USER_FAIL,
		payload:error.response
	}
}

export const registerUser=(userData)=>{
	return dispatch=>{
	dispatch(registerUserStart());
	axios.post("/api/users/register",userData)
 			  .then(user=>
 			  	dispatch(registerUserSuccess(user))
 			  ).catch(err=>dispatch(registerUserFail(err)))
	
	}	
}


export const loginUserStart=()=>{
	return {
		type:actionTypes.LOGIN_USER_START
	}
}

export const loginUserFail=(error)=>{
	return {
		type:actionTypes.LOGIN_USER_FAIL,
		payload:error.response.data
	}
}



export const loginUser=(userData)=>{
	return dispatch=>{
		dispatch(loginUserStart())
		axios.post("/api/users/login",userData)
			.then(resp=>{
				const {token}=resp.data
				localStorage.setItem("jwtToken",token)
				setAuthToken(token)
				const decoded=jwt_decode(token)
				dispatch(setCurrentUser(decoded))
				console.log(decoded)


			}).catch(err=>dispatch(loginUserFail(err)))




	}
}

export const setCurrentUser=decoded=>{
	return {
		type:actionTypes.SET_CURRENT_USER,
		payload:decoded
	}
}





export const logoutUser=()=>dispatch=>{
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
}