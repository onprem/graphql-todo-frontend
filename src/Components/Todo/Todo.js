import React from 'react';
import { Mutation } from "react-apollo";
import { TOG_TODO, GET_USER } from '../../gqlDefs';
import './Todo.css';

const Todo = ( { id, title, isComplete, deleteTodo } ) => {
	return (
		<Mutation
			mutation={TOG_TODO}
			update={( cache, { data: { toggleTodo } }) => {
				//const { me } = cache.readQuery({ query: GET_USER });
				cache.writeQuery({
					query: GET_USER,
					data: {
						me: toggleTodo.user
					}
				});
			}}
		>
			{ toggleTodo => (
				<div className='todoDiv'>
					<p className={isComplete?`todoComplete`:`todoPending`} onClick={ () => toggleTodo({ variables: { todoId: id } }) } >{title}</p>
					<button className='todoDelete' onClick={ () => deleteTodo(id) } >X</button>
				</div>
			)}
		</Mutation>
	);
}

export default Todo;