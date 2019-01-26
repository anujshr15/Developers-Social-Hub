import React from 'react';
import {Link} from 'react-router-dom';
import classes from './SideDrawer.css';


const SideDrawer=({display})=>
{
	let cl;
	if(display)
	{
		cl=[classes.SideDrawer,classes.Open]
	}
	else{
		cl=[classes.SideDrawer,classes.Close]
	}
	return (
		<div className={cl.join(' ')}>
		<ul>
		<li>
		<Link to="/login">Login</Link>
		</li>
		<li>
		<Link to="/register">Register</Link>
		</li>
		</ul>

		</div>

		)
}

export default SideDrawer;