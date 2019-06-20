import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";
import { USR_SIGNUP } from '../../../gqlDefs';
import './RegisterCard.css';

const RegisterCard = () => {
	const [inputs, changeInputs] = useState({ name: '', email: '', password: '' });
	const [errorMsg, setErrorMsg] = useState('');
	return (
		<Mutation
			mutation={USR_SIGNUP}
		>
			{ ( signup, { loading, data, error, client }) => {
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
				if ( error ) {
					window.erra = error;
					if(error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code === "BAD_USER_INPUT")
						setErrorMsg(error.graphQLErrors[0].message);
					else
						setErrorMsg('Something went wrong.');
				}
				return (
					<div className='registerCard'>
						<h3>Create your account!</h3>
						<p>Sign up to manage todos</p>
						<form className='registerForm' onSubmit={handleSubmit}>
							{ errorMsg !== '' &&
								<div className="errorMsg">{errorMsg}</div>
							}
							<input className='registerInput' type='text' name='name' placeholder='Name' onChange={handleInput} required />
							<input className='registerInput' type='text' name='email' placeholder='E-mail' onChange={handleInput} required />
							<input className='registerInput' type='password' name='password' placeholder='Password' onChange={handleInput} required />
							<input type='submit' name='signup' value='SIGN UP' disabled={ loading } />
						</form>
						<Link to='/login'>Already have an account?</Link>
					</div>
				)}
			}
		</Mutation>
	);
}

export default RegisterCard;