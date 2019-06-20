import React from 'react';
import { Query } from "react-apollo";
import { GET_USER } from '../../gqlDefs';
import Todo from '../Todo/Todo';
import TodoInput from './TodoInput';
import './Home.css';


const Home = () => {
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
						<TodoInput />
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

export default Home;