import React from 'react';
import { Mutation } from "react-apollo";
import { DEL_TODO, TOG_TODO, GET_USER } from '../../gqlDefs';
import './Todo.css';

const Todo = ( { id, title, isComplete } ) => {
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
				<Mutation
					mutation={DEL_TODO}
					update={( cache, { data: { removeTodo } }) => {
						//const { me } = cache.readQuery({ query: GET_USER });
						cache.writeQuery({
							query: GET_USER,
							data: {
								me: removeTodo.user
							}
						});
					}}
				>
					{ removeTodo => (
						<div className='todoDiv'>
							<p className={isComplete?`todoComplete`:`todoPending`} onClick={ () => toggleTodo({ variables: { todoId: id } }) } >{title}</p>
							<button className='todoDelete' onClick={ () => removeTodo({ variables: { todoId: id } }) } >X</button>
						</div>
					)}
				</Mutation>
			)}
		</Mutation>
	);
}

export default Todo;