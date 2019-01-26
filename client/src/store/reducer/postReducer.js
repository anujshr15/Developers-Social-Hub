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
			loading:false,
			errors:{},
			posts:[action.payload,...state.posts]
		}

		case actionTypes.POST_ERROR:
		return {
			...state,
			errors:action.payload,
			loading:false

		}

		case actionTypes.GET_POST:
		return {
			...state,
			post:action.payload,
			loading:false,
			errors:{}
		}
		case actionTypes.DELETE_POST:
		return{
			...state,
			errors:{},
			posts:state.posts.filter(post=>action.payload!==post._id)
		}

		case actionTypes.GET_POSTS:
		return {
			...state,
			posts:action.payload,
			loading:false,
			errors:{}
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