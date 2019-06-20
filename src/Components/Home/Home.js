import React, { useState } from 'react';
import { Query } from "react-apollo";
import { GET_USER } from '../../gqlDefs';
import Todo from '../Todo/Todo';
import './Home.css';


const Home = () => {
	const [inputs, changeInputs] = useState({ todo: '' });
	const handleChange = ( event ) => {
		const value = event.target.value;
		const name = event.target.name;
		changeInputs({ 
			...inputs,
			[name]: value
		});
	}
	const handleSubmit = ( event ) => {
		//event.preventDefault();
		const payload = {
			todo: inputs.todo
		}
		console.log('add payload:', payload);
		changeInputs({
			...inputs,
			todo: ''
		});
	}
	const onKeyDwn = ( event ) => {
		if (event.key === 'Enter') {
        	event.preventDefault();
        	event.stopPropagation();
        	handleSubmit();
      }
	}
	if(true) {
		return (
			<Query query={GET_USER} >
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
				console.log(data);
				const todos = data.me.todos.map((todo) =>
					<Todo
						key={todo.id}
						id={todo.id}
						title={todo.title}
						isComplete={todo.isComplete}
					/>
				)
				return (
					<section className='homeSection'>
						<div className='home-top'>
							<h2>You are logged in.</h2>
							<input name='todo' type='text' placeholder='Add todo' className='addInput' onChange={handleChange} onKeyDown={onKeyDwn} value={inputs.todo} />
						</div>
						<div className='home-bottom'>
							<div className='todo-wrapper'>
								{todos}
							</div>
						</div>
					</section>
				);
			}}
		</Query>
		);
	}
	return (
		<h2>Login to Continue</h2>
	);
}

export default Home;