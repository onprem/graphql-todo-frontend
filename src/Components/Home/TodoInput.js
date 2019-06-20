import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { ADD_TODO, GET_USER } from '../../gqlDefs';

const TodoInput = () => {
	const [inputs, changeInputs] = useState({ todo: '' });
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
					<input name='todo' type='text' placeholder='Add todo' className='addInput' onChange={handleChange} onKeyDown={onKeyDwn} value={inputs.todo} />
				);
			}		
			}
		</Mutation>
	);
}

export default TodoInput;