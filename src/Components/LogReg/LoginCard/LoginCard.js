import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginCard.css';

const userLogin = `
  mutation UserLogin($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
const LoginCard = () => {
	const [inputs, changeInputs] = useState({ email: '', password: '' });
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
		console.log('payload:', payload);
	}
	return (
		<div className='loginCard'>
			<h3>Welcome back!</h3>
			<p>Login to access your dashboard</p>
			<form className='loginForm' onSubmit={handleSubmit}>
				<input className='loginInput' type='text' name='email' placeholder='E-mail' onChange={handleInput} required />
				<input className='loginInput' type='password' name='password' placeholder='Password' onChange={handleInput} required />
				<input type='submit' name='login' value='LOG IN' disabled={ false } />
			</form>
			<Link to='/reset'>Forgot your password?</Link>
		</div>
	);
}

export default LoginCard;