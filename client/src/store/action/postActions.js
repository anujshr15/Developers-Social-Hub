import axios from '../../axios-instance.js';
import * as actionTypes from './actionTypes';

export const addPost=(postdata)=>dispatch=>{
	dispatch(postsLoading())
	axios.post("/api/posts",postdata)
		.then(res=>{dispatch({
			type:actionTypes.ADD_POST,
			payload:res.data
		})
		})
		.catch(err=>{dispatch({
					type:actionTypes.POST_ERROR,
					payload:err.response.data
				})})

}


export const getPosts=()=>dispatch=>{
	dispatch(postsLoading())
	axios.get("/api/posts")
		.then(res=>dispatch({
			type:actionTypes.GET_POSTS,
			payload:res.data
		}))
		.catch(err=>dispatch({
			type:actionTypes.GET_POSTS,
			payload:null
		}))

}



export const getPost=(id)=>dispatch=>{
	dispatch(postsLoading())
	axios.get("/api/posts/"+id)
		.then(res=>dispatch({
			type:actionTypes.GET_POST,
			payload:res.data
		}))
		.catch(err=>dispatch({
			type:actionTypes.GET_POST,
			payload:null
		}))

}

export const addComment=(postID,comment)=>dispatch=>{
	axios.post(`/api/posts/comment/${postID}`,comment)
		 .then(res=>dispatch({
		 	type:actionTypes.GET_POST,
		 	payload:res.data
		 }))
		 .catch(err=>dispatch({
		 	type:actionTypes.POST_ERROR,
			payload:err.response.data
		 }))
}


export const deleteComment=(postID,commentID)=>dispatch=>{
	axios.delete(`/api/posts/comment/${postID}/${commentID}`)
		 .then(res=>dispatch({
		 	type:actionTypes.GET_POST,
		 	payload:res.data
		 }))
		 .catch(err=>dispatch({
		 	type:actionTypes.GET_POST,
			payload:null
		 }))
}



export const deletePost=(id)=>dispatch=>{

	axios.delete("/api/posts/"+id)
		.then(res=>{dispatch({
			type:actionTypes.DELETE_POST,
			payload:id
		})
		})
		.catch(err=>{dispatch({
					type:actionTypes.POST_ERROR,
					payload:err.response.data
				})})

}

export const addLike=(id)=>dispatch=>{

	axios.post("/api/posts/like/"+id)
		.then(res=>dispatch(getPosts())
		)
		.catch(err=>{dispatch({
					type:actionTypes.POST_ERROR,
					payload:err.response.data
				})})

}

// export const removeLike=(id)=>dispatch=>{

// 	axios.delete("/api/posts/like/"+id)
// 		.then(res=>dispatch(getPosts())
// 		)
// 		.catch(err=>{dispatch({
// 					type:actionTypes.POST_ERROR,
// 					payload:err.response.data
// 				})})

// }


export const postsLoading=()=>{
	return {
		type:actionTypes.POSTS_LOADING
	}
}