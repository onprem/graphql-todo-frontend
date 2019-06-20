import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Mutation } from "react-apollo";
import { USR_LOGIN } from '../../../gqlDefs';
import './LoginCard.css';

const LoginCard = () => {
	const [inputs, changeInputs] = useState({ email: '', password: '' });
	return (
		<Mutation
			mutation={USR_LOGIN}
		>
			{ ( login, { loading, data, error, client }) => {
				const handleInput = ( event ) => {
					const value = event.target.value;
					const name = event.target.name;
					changeInputs({ 
						...inputs,
						[name]: value
					});
				}
				const handleSubmit = ( event ) => {
					event.preventDefault();
					const payload = {
						email: inputs.email,
						password: inputs.password
					}
					console.log('login payload:', payload);
					login({ variables: payload });
				}
				if ( data ) {
					window.localStorage.setItem('token', data.login);
					console.log('login successful: token: ', data.login);
					client.resetStore();
					return (
						<Redirect to="/" />
					);
				}
				return (
					<div className='loginCard'>
						<h3>Welcome back!</h3>
						<p>Login to access your dashboard</p>
						<form className='loginForm' onSubmit={handleSubmit}>
							<input className='loginInput' type='text' name='email' placeholder='E-mail' onChange={handleInput} required />
							<input className='loginInput' type='password' name='password' placeholder='Password' onChange={handleInput} required />
							<input type='submit' name='login' value='LOG IN' disabled={loading} />
						</form>
						<Link to='/reset'>Forgot your password?</Link>
					</div>
				)}
			}
		</Mutation>
	);
}

export default LoginCard;