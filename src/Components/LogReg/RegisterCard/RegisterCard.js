import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { USR_SIGNUP } from '../../../gqlDefs';
import './RegisterCard.css';

const RegisterCard = () => {
	const [inputs, changeInputs] = useState({ name: '', email: '', password: '' });
	const client = useApolloClient();
	const [signup, { data, loading, error }] = useMutation(USR_SIGNUP);

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
		signup({ variables: payload });
		console.log('payload:', payload);
	}
	if ( data ) {
		console.log('signup successful: data: ', data.signup);
		client.resetStore();
		return (
			<div className="registerCard">
				<h3>Signup Successful!</h3>
				<p>You can login using your email { data.signup.email }.</p>
			</div>
		);
	}
	return (
		<div className='registerCard'>
			<h3>Create your account!</h3>
			<p>Sign up to manage todos</p>
			<form className='registerForm' onSubmit={handleSubmit}>
				{ error &&
					<div className="errorMsg">
						{(error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code === "BAD_USER_INPUT")?
							error.graphQLErrors[0].message
						:
							'Something went wrong.'
						}
					</div>
				}
				<input className='registerInput' type='text' name='name' placeholder='Name' onChange={handleInput} required />
				<input className='registerInput' type='text' name='email' placeholder='E-mail' onChange={handleInput} required />
				<input className='registerInput' type='password' name='password' placeholder='Password' onChange={handleInput} required />
				<input type='submit' name='signup' value='SIGN UP' disabled={ loading } />
			</form>
			<Link to='/login'>Already have an account?</Link>
		</div>
	);
}

export default RegisterCard;