const Validate=require('validator');

const isFieldEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


module.exports=function checkExperienceValidation(data){
	let errors={};
	

	 	data.title = !isFieldEmpty(data.title) ? data.title : '';
  		data.company = !isFieldEmpty(data.company) ? data.company : '';
  		data.from = !isFieldEmpty(data.from) ? data.from : '';
	

	if(Validate.isEmpty(data.title))
	{
		errors.title="title cannot be empty";
		
	}

	

	if(Validate.isEmpty(data.company))
	{
		errors.company="company cannot be empty"
		
	}


	if(Validate.isEmpty(data.from))
	{
		errors.from="from field cannot be empty"
		
	}


	return {
		errors,
		isValid:isFieldEmpty(errors)
	}


}