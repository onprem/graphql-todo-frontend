import React, { useState } from 'react';
import Todo from '../Todo/Todo';
import './Home.css';

const delTodo = `
	mutation DelTodo($todoId: ID!){
		removeTodo( todoId: $todoId ){
			code
			success
			message
			user {
				id
				todos {
					id
					title
					isComplete
				}
			}
		}
	}
`;
const togTodo = `
	mutation TogTodo($todoId: ID!){
		toggleTodo( todoId: $todoId ){
			code
			success
			message
			user {
				id
				email
				name
				todos {
					id
					title
					isComplete
				}
			}
		}
	}
`;
const addTodo = `
	mutation AddTodo($todo: String!){
		addTodo( title: $todo ){
			code
			success
			message
			user {
				id
				email
				name
				todos {
					id
					title
					isComplete
				}
			}
		}
	}
`;
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
			<section className='homeSection'>
				<div className='home-top'>
					<h2>You are logged in.</h2>
					<input name='todo' type='text' placeholder='Add todo' className='addInput' onChange={handleChange} onKeyDown={onKeyDwn} value={inputs.todo} />
				</div>
				<div className='home-bottom'>
					<div className='todo-wrapper'>
						{}
					</div>
				</div>
			</section>
		);
	}
	return (
		<h2>Login to Continue</h2>
	);
}

export default Home;