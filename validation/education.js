const Validate=require('validator');

const isFieldEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


module.exports=function checkEducationValidation(data){
	let errors={};
	

	 	data.school = !isFieldEmpty(data.school) ? data.school : '';
  		data.degree = !isFieldEmpty(data.degree) ? data.degree : '';
  		data.from = !isFieldEmpty(data.from) ? data.from : '';
	

	if(Validate.isEmpty(data.school))
	{
		errors.school="school cannot be empty";
		
	}

	

	if(Validate.isEmpty(data.degree))
	{
		errors.degree="degree cannot be empty"
		
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