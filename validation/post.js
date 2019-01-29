const Validate=require('validator');

const isEmpty=(val)=>{
	return (val===undefined
			||  val===null
			||(typeof val==="object" && Object.keys(val).length===0)
			||(typeof val==="string" && val.trim().length===0))
}



module.exports=function checkPostValidation(data){
	let errors={};
	let isValid=true;
	 data.text=isEmpty(data.text)?"":data.text;
	 

	if(Validate.isEmpty(data.text))
	{
		errors.text="text cannot be empty"
	}

	return {
		errors,
		isValid:isEmpty(errors)
	}


}