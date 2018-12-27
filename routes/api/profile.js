const express = require('express');
const router = express.Router();
const passport=require('passport');
const checkProfileValidation=require('../../validation/profile');
const checkExperienceValidation=require('../../validation/experience');
const checkEducationValidation=require('../../validation/education');
//profile model
const Profile=require('../../models/Profile');

//user model
const User=require('../../models/User');





router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
	const errors={}
	Profile.findOne({user:req.user.id})
			.populate('user',['name','avatar'])
			.then(profile=>{
				if(!profile)
				{
					errors.noprofile="no profile found";
					return res.status(404).json(errors)
				}
				res.json(profile)
			}).catch(err=>res.status(404).json(err))
})


router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

	const {errors,isValid}=checkProfileValidation(req.body);
	if(!isValid)
	{
		 return res.status(400).json(errors)
	}
	//const errors={}
else
	{	const profilefields={}
		profilefields.user=req.user.id;
		if(req.body.handle) profilefields.handle=req.body.handle;
		if(req.body.company) profilefields.company=req.body.company;
		if(req.body.website) profilefields.website=req.body.website;
		if(req.body.location) profilefields.location=req.body.location;
		if(req.body.status) profilefields.status=req.body.status;
		if(req.body.bio) profilefields.bio=req.body.bio;
		if(req.body.githubusername) profilefields.githubusername=req.body.githubusername;
		//skills 
		if(typeof req.body.skills !== "undefined")
		{
			profilefields.skills=req.body.skills.split(',')
		} 
	
		//social
		profilefields.social={}
		if(req.body.youtube) profilefields.social.youtube=req.body.youtube
		
		if(req.body.twitter) profilefields.social.twitter=req.body.twitter
	//else profilefields.social.twitter=""
		if(req.body.facebook) profilefields.social.facebook=req.body.facebook
	//else profilefields.social.facebook=""
		if(req.body.linkedin) profilefields.social.linkedin=req.body.linkedin
	//else profilefields.social.linkedin=""
		if(req.body.instagram) profilefields.social.instagram=req.body.instagram
	//else profilefields.social.instagram=""
	
		Profile.findOne({user:req.user.id})
				.then(profile=>{
					if(profile)
					{
						//update
						console.log("profile found")
						Profile.findOneAndUpdate({user:req.user.id},{$set:profilefields},{new:true})
							   .then(profile=>res.json(profile))
					}
					else{
						//create
	
						//check if handle exists
						Profile.findOne({handle:profilefields.handle})
								.then(profile=>{
									if(profile)
									{
										errors.handle="handle already exists";
										 res.status(400).json(errors)
									}
	
									new Profile(profilefields).save().then(profile=>res.json(profile))
								})
					}
				})}

})


//get profile by handle name

router.get("/handle/:handle",(req,res)=>{
	let errors={};
	Profile.findOne({handle:req.params.handle})
			.populate('user',['name','avatar'])
			.then(profile=>{
				if(!profile)
				{errors.noprofile="no such profile exists";
				return res.status(400).json(errors)
				}
				res.json(profile);
			})
			.catch(err=>res.status(404).json(err))
})


//get profile by user id

router.get("/user/:user_id",(req,res)=>{
	let errors={};
	Profile.findOne({user:req.params.user_id})
			.populate('user',['name','avatar'])
			.then(profile=>{
				if(!profile)
				{errors.noprofile="no such profile exists";
				return res.status(400).json(errors)
				}
				res.json(profile);
			})
			.catch(err=>res.status(404).json(err))
})


//get all profiles

router.get("/all",(req,res)=>{
	let errors={};
	Profile.find()
			.populate('user',['name','avatar'])
			.then(profile=>{
				if(!profile)
				{errors.noprofile="no such profile exists";
				return res.status(400).json(errors)
				}
				res.json(profile);
			})
			.catch(err=>res.status(404).json(err))
})


router.post("/experience",passport.authenticate("jwt",{session:false}),(req,res)=>{
	const {errors,isValid}=checkExperienceValidation(req.body);
	if(!isValid)
	{
		return res.status(400).json(errors)
	}



	Profile.findOne({user:req.user.id})
		   .then(profile=>{
		   		const newExp={
			title:req.body.title,
			company:req.body.company,
			location:req.body.location,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description
			}
		   	profile.experience.unshift(newExp)
		   	profile.save().then(profile=>res.json(profile))
		   }).catch(err=>res.status(404).json(err))

})

router.post("/education",passport.authenticate("jwt",{session:false}),(req,res)=>{
	const {errors,isValid}=checkEducationValidation(req.body);
	if(!isValid)
	{
		return res.status(400).json(errors)
	}



	Profile.findOne({user:req.user.id})
		   .then(profile=>{
		   		const newEdu={
			school:req.body.school,
			degree:req.body.degree,
			location:req.body.location,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description
			}
		   	profile.education.unshift(newEdu)
		   	profile.save().then(profile=>res.json(profile))
		   }).catch(err=>res.status(404).json(err))

})


//delete route for experience by experience ID

router.delete("/experience/:exp_id",passport.authenticate("jwt",{session:false}),(req,res)=>{

	Profile.findOne({user:req.user.id})
			.then(profile=>{
				const expIndex=profile.experience
									  .map(item=>item.id)
									  .indexOf(req.params.exp_id)

				profile.experience.splice(expIndex,1);
				profile.save().then(profile=>res.json(profile))


			}).catch(err=>res.status(404).json(err))


})

//delete route for education by education ID


router.delete("/education/:edu_id",passport.authenticate("jwt",{session:false}),(req,res)=>{

	Profile.findOne({user:req.user.id})
			.then(profile=>{
				const eduIndex=profile.education
									  .map(item=>item.id)
									  .indexOf(req.params.exp_id)

				profile.education.splice(eduIndex,1);
				profile.save().then(profile=>res.json(profile))


			}).catch(err=>res.status(404).json(err))


})


//delete profile and user

router.delete("/",passport.authenticate("jwt",{session:false}),(req,res)=>{

	Profile.findOneAndRemove({user:req.user.id})
			.then(()=>{
				User.findOneAndRemove({_id:req.user.id})
					.then(()=>res.json({success:true}))
			})

})





module.exports=router;