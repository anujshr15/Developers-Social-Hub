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
	 data.email=isEmpty(data.email)?"":data.email;
	 data.password=isEmpty(data.password)?"":data.password;


	if(Validate.isEmpty(data.email))
	{
		errors.email="Email field cannot be empty";
		isValid=false
	}

	if(!Validate.isEmail(data.email))
	{
		errors.email="Invalid email"
		isValid=false;
	}

	if(Validate.isEmpty(data.password))
	{
		errors.password="password field cannot be empty"
		isValid=false;
	}


	return {
		errors,
		isValid
	}


}