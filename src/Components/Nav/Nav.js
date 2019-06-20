import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './Nav.css';

const Nav = () => {
	return (
		<nav className="topNav">
			<div className="nav-left">
				<img src={logo} className='logo' alt='logo' />
				<Link to='/'>GraphToDo</Link>
			</div>
			<div className="nav-right">
				<Link to='/login'>Login</Link>
				<Link to='/register'>Register</Link>
			</div>
		</nav>
	);
}

export default Nav;