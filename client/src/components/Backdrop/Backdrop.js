import React from 'react';
import classes from './Backdrop.css';

const Backdrop=(props)=>{
return (
	props.show?<div className={classes.back} >
	</div>:null)

}

export default Backdrop;