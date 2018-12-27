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
	 data.password=isEmpty(data.password)?"":data.password;
	 data.password2=isEmpty(data.password2)?"":data.password2;


	if(!Validate.isLength(data.name,{min:2,max:20}))
	{
		errors.name="Name must be between 2 and 20 characters";
		isValid=false;
	}

	if(Validate.isEmpty(data.name))
	{
		errors.name="name field cannot be empty",
		isValid=false;
	}

	if(!Validate.isEmail(data.email))
	{
		errors.email="Invalid email",
		isValid=false;
	}

	if(Validate.isEmpty(data.password))
	{
		errors.password="password field cannot be empty",
		isValid=false;
	}

	if(!Validate.isLength(data.password,{min:6,max:20}))
	{
		errors.password="password must be between 6 and 20 characters",
		isValid=false;
	}


	if(!Validate.equals(data.password,data.password2))
	{
		errors.password2="confirm password must match with password",
		isValid=false;
	}

	return {
		errors,
		isValid
	}


}