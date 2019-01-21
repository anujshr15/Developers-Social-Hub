import * as actionTypes from '../action/actionTypes';

const initialState={
	post:{},
	posts:[],
	loading:false,
	errors:{}
}

export default function(state=initialState,action)
{
	switch(action.type)
	{
		case actionTypes.ADD_POST:
		return {
			...state,
			posts:[action.payload,...state.posts]
		}

		case actionTypes.POST_ERROR:
		return {
			...state,
			errors:action.payload

		}

		case actionTypes.GET_POST:
		return {
			...state,
			post:action.payload,
			loading:false
		}
		case actionTypes.DELETE_POST:
		return{
			...state,
			posts:state.posts.filter(post=>action.payload!==post._id)
		}

		case actionTypes.GET_POSTS:
		return {
			...state,
			posts:action.payload,
			loading:false
		}

		case actionTypes.POSTS_LOADING:
		return{
			...state,
			loading:true
		}


		default:
		return {
			...state
		}







	}


}