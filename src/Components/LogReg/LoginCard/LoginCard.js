import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Mutation, useApolloClient } from "react-apollo";
import { USR_LOGIN } from '../../../gqlDefs';
import './LoginCard.css';

const LoginCard = ({setHaveToken}) => {
	const [inputs, changeInputs] = useState({ email: '', password: '' });
	const [errorMsg, setErrorMsg] = useState('');
	const client = useApolloClient();
	return (
		<Mutation
			mutation={USR_LOGIN}
		>
			{ ( login, { loading, data, error }) => {
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
					setHaveToken(true);
					client.resetStore();
					return (
						<Redirect to="/" />
					);
				}
				if ( error ) {
					if(error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED")
						setErrorMsg('Invalid email or password.');
					else
						setErrorMsg('Something went wrong.');
				}
				return (
					<div className='loginCard'>
						<h3>Welcome back!</h3>
						<p>Login to access your dashboard</p>
						<form className='loginForm' onSubmit={handleSubmit}>
							{ errorMsg !== '' &&
								<div className="errorMsg">{errorMsg}</div>
							}
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