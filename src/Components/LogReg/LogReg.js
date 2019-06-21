import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginCard from './LoginCard/LoginCard';
import RegisterCard from './RegisterCard/RegisterCard';
import './LogReg.css';

const LogReg = ({setHaveToken}) => {
	if(window.localStorage.getItem('token')){
		return <Redirect to='/' />
	}
	return (
		<section className='loginSection'>
			<div className='login-left'>
				<h2>Keep track of your todos.</h2>
			</div>
			<div className='login-right'>
				<Switch>
					<Route path="/login" exact render={ () => 
						<LoginCard setHaveToken={setHaveToken} />}
					/>
					<Route path="/register" exact render={ () => 
						<RegisterCard />}
					/>
				</Switch>
			</div>
		</section>
	);
}

export default LogReg;