import React from 'react';
import './Todo.css';

const Todo = ( { id, title, isComplete, toggleTodo, deleteTodo } ) => {
	return (
		<div className='todoDiv'>
			<p className={isComplete?`todoComplete`:`todoPending`} onClick={ () => toggleTodo(id) } >{title}</p>
			<button className='todoDelete' onClick={ () => deleteTodo(id) } >X</button>
		</div>
	);
}

export default Todo;