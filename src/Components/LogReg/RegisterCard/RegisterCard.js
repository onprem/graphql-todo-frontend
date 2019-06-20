import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RegisterCard.css';

const RegisterCard = () => {
	const [inputs, changeInputs] = useState({ name: '', email: '', password: '' });
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
			name: inputs.name,
			email: inputs.email,
			password: inputs.password
		}
		console.log('payload:', payload);
	}
	return (
		<div className='registerCard'>
			<h3>Create your account!</h3>
			<p>Sign up to manage todos</p>
			<form className='registerForm' onSubmit={handleSubmit}>
				<input className='registerInput' type='text' name='name' placeholder='Name' onChange={handleInput} required />
				<input className='registerInput' type='text' name='email' placeholder='E-mail' onChange={handleInput} required />
				<input className='registerInput' type='password' name='password' placeholder='Password' onChange={handleInput} required />
				<input type='submit' name='signup' value='SIGN UP' disabled={ false } />
			</form>
			<Link to='/login'>Already have an account?</Link>
		</div>
	);
}

export default RegisterCard;