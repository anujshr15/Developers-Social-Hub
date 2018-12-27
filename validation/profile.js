const Validate=require('validator');

const isFieldEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


module.exports=function checkProfileValidation(data){
	let errors={};
	

	 	data.handle = !isFieldEmpty(data.handle) ? data.handle : '';
  		data.status = !isFieldEmpty(data.status) ? data.status : '';
  		data.skills = !isFieldEmpty(data.skills) ? data.skills : '';
	 // data.youtube=isEmpty(data.youtube)?"":data.youtube;
	 // data.facebook=isEmpty(data.facebook)?"":data.facebook;
	 // data.twitter=isEmpty(data.twitter)?"":data.twitter;
	 // data.linkedin=isEmpty(data.linkedin)?"":data.linkedin;
	 // data.instagram=isEmpty(data.instagram)?"":data.instagram;

	 if(!Validate.isLength(data.handle,{min:2,max:40}))
	{
		errors.handle="handle must be between 2 and 40 characters"
		
	}

	if(Validate.isEmpty(data.handle))
	{
		errors.handle="handle cannot be empty";
		
	}

	

	if(Validate.isEmpty(data.status))
	{
		errors.status="status cannot be empty"
		
	}


	if(Validate.isEmpty(data.skills))
	{
		errors.skills="skills cannot be empty"
		
	}

	if (!isFieldEmpty(data.youtube)) {
    if (!Validate.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isFieldEmpty(data.twitter)) {
    if (!Validate.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isFieldEmpty(data.facebook)) {
    if (!Validate.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isFieldEmpty(data.linkedin)) {
    if (!Validate.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isFieldEmpty(data.instagram)) {
    if (!Validate.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }


	return {
		errors,
		isValid:isFieldEmpty(errors)
	}


}