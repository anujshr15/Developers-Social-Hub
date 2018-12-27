const express = require('express');
const router = express.Router();

const passport=require('passport');
const Post = require('../../models/Post');
const Profile=require("../../models/Profile");
const checkPostValidation=require('../../validation/post.js');


router.get('/test',(req,res)=>res.json({msg:"posts  works"}))

//create a POST
router.post('/',passport.authenticate("jwt",{session:false}),(req,res)=>{
const {errors,isValid}=checkPostValidation(req.body);
if(!isValid)
{
	return res.status(400).json(errors)
}

const newPost=new Post({
	text:req.body.text,
	name:req.body.name,
	user:req.user.id,
	avatar:req.user.avatar
});

newPost.save().then(post=>res.json(post))

})

//get all posts
router.get("/",(req,res)=>{
	Post.find()
		.sort({date:-1})
		.then(posts=>res.json(posts))
		.catch(err=>res.status(404).json(err))
})


//get post by id

router.get("/:id",(req,res)=>{
	Post.findById(req.params.id)
		.then(post=>res.json(post))
		.catch(err=>res.status(404).json(err))
})


//delete a post


router.delete("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then((profile)=>{
			Post.findById(req.params.id)
				.then(post=>{
					if(post.user.toString()!==req.user.id)
					{
						return res.status(401).json({unauthorized:"not authorized to delete the post"})
					}
					post.delete().then(()=>res.json({success:"true"}))

				})
				.catch(err=>res.status(404).json(err))
		})

})


//like a post

router.post("/like/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
	Profile.findOne({user:req.user.id})
		.then(profile=>{
			Post.findById(req.params.id)
				.then(post=>{
					const index=post.likes.map(item=>item.user.toString()).indexOf(req.user.id);
					console.log(index)
					if(index!== -1)
						{
							post.likes.splice(index,1)
							post.save().then(post=>res.json(post))
						}
					else{post.likes.unshift({user:req.user.id})
					post.save().then(post=>res.json(post))
			}
					
				}).catch(err=>res.status(404).json(err))
		})
})


//create a comment

router.post("/comment/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
	const {errors,isValid}=checkPostValidation(req.body);
	if(!isValid)
	{
		return res.status(400).json(errors)
	}

	Post.findById(req.params.id)
		.then(post=>{
			const newComment={
				user:req.user.id,
				text:req.body.text,
				name:req.body.name,
				avatar:req.body.avatar
			}

			post.comments.unshift(newComment);
			post.save().then(post=>res.json(post))


		}).catch(err=>res.status(404).json(err))

})

//delete a comment
router.delete("/comment/:id/:cmtId",passport.authenticate("jwt",{session:false}),(req,res)=>{
	Post.findById(req.params.id)
		.then(post=>{
			const index=post.comments.map(item=>item.id.toString()).indexOf(req.params.cmtId);
			if(post.comments[index].user.toString()!== req.user.id)
				{
					return res.status(401).json({message:"not authorized to delete the comment"})
				}

			post.comments.splice(index,1)
			post.save().then(post=>res.json(post))

		})




})




module.exports=router;