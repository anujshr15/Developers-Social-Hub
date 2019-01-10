const Validate=require('validator');

const isEmpty=(val)=>{
	return (typeof val===undefined
			|| typeof val===null
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}



module.exports=function checkValidation(data){
	let errors={};
	let isValid=true;
	 data.name=isEmpty(data.name)?"":data.name;
	 data.email=isEmpty(data.email)?"":data.email;
	 data.password1=isEmpty(data.password1)?"":data.password1;
	 data.password2=isEmpty(data.password2)?"":data.password2;


	if(!Validate.isLength(data.name,{min:2,max:20}))
	{
		errors.name="Name must be between 2 and 20 characters"
		
	}

	if(Validate.isEmpty(data.name))
	{
		errors.name="name field cannot be empty"
		
	}

	if(!Validate.isEmail(data.email))
	{
		errors.email="Invalid email"
		
	}

	if(!Validate.isLength(data.password1,{min:6,max:20}))
	{
		errors.password1="password must be between 6 and 20 characters"
		
	}

	if(Validate.isEmpty(data.password1))
	{
		errors.password1="password field cannot be empty"
		
	}

	


	if(!Validate.equals(data.password1,data.password2))
	{
		errors.password2="confirm password must match with password"
		
	}

	return {
		errors,
		isValid:isEmpty(errors)
	}


}