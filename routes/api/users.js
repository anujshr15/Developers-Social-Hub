const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const User=require('../../models/User');
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken');
const passport=require('passport');
const checkRegisterValidation=require('../../validation/register');
const checkLoginValidation=require('../../validation/login');
//register route

router.post('/register',(req,res)=>{
	const {errors,isValid}=checkRegisterValidation(req.body);
	if(!isValid)
	{
		return res.status(400).json(errors);
	}
User.findOne({email:req.body.email})
	.then(user=>{
		if(user)
		{	
			errors.email="email already exists";
			return res.status(400).json(errors);
		}
		else{
			//console.log("registering new user")
			const avatar='https:'+gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
			const newUser= new User({
				name:req.body.name,
				email:req.body.email,
				avatar,
				password:req.body.password1
			})
			bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

		}
	})
	.catch(err=>console.log(err))
})

//login route
router.post("/login",(req,res)=>{
	

	const {errors,isValid}=checkLoginValidation(req.body);
	if(!isValid)
	{
		return res.status(400).json(errors);
	}

	const email=req.body.email;
	const password=req.body.password;

	User.findOne({email})
		.then(user=>{
			if(!user)
			{	errors.email="user not found"
				return res.status(404).json(errors)
			}
			
				bcrypt.compare(password,user.password).then(match=>{
				
					 if(match)

						{	//return res.json({msg:"Login Successful"})
							const payload={
								name:user.name,
								id:user.id,
								avatar:user.avatar
							};

						    jwt.sign(payload,'secret',{expiresIn:3600},(err,token)=>{
					
						    	return res.json(
						    	{
						    		success:true,
						    		token:"Bearer "+ token
						    	})
						    })	

						}
					else
						{
							errors.password="incorrect password"
							return res.status(400).json(errors)
						}

					
			})})
			
		
		.catch(err=>{
			return res.status(400).json(err)})

})
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
	res.json({
		id:req.user.id,
		email:req.user.email,
		avatar:req.user.avatar
	});
})


module.exports=router;