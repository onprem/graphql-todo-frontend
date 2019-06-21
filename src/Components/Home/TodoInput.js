import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { ADD_TODO, GET_USER } from '../../gqlDefs';

const TodoInput = ({ user }) => {
	const [inputs, changeInputs] = useState({ todo: '' });
	const opRes = {
		...user,
		__typename: "User",
		todos: user.todos.concat([{
			id: `${user.id}-9999`,
			title: inputs.todo,
			isComplete: false,
			__typename: "Todo"
		}])
	}
	return (
		<Mutation
			mutation={ADD_TODO}
			update={( cache, { data: { addTodo } }) => {
				//const { me } = cache.readQuery({ query: GET_USER });
				cache.writeQuery({
					query: GET_USER,
					data: {
						me: addTodo.user
					}
				});
			}}
			optimisticResponse={{addTodo: {
				__typename: "addTodo",
				code: "200",
				success: true,
				message: "todo successfully added",
				user: opRes
			}}}
		>
			{ addTodo => {
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
					if(!inputs.todo)
						return;
					const payload = {
						todo: inputs.todo
					}
					console.log('add payload:', payload);
					addTodo({ variables: payload });
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
				return (
					<input name='todo' type='text' placeholder='Add todo' className='addInput' onChange={handleChange} onKeyDown={onKeyDwn} value={inputs.todo} required />
				);
			}		
			}
		</Mutation>
	);
}

export default TodoInput;