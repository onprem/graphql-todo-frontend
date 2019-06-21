import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './Nav.css';

const Nav = ({ haveToken, setHaveToken }) => {
	const logOut = () => {
		//client.resetStore();
		window.localStorage.setItem('token', '');
		setHaveToken(false);
		return <Redirect to='/login' />
	}
	return (
		<nav className="topNav">
			<div className="nav-left">
				<img src={logo} className='logo' alt='logo' />
				<Link to='/'>GraphToDo</Link>
			</div>
			<div className="nav-right">
				{haveToken?
					<Link to='/login' onClick={logOut}>LogOut</Link>
				:
					<Fragment>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
					</Fragment>
				}
			</div>
		</nav>
	);
}

export default Nav;