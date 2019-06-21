import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from "react-apollo";
import { GET_USER } from '../../gqlDefs';
import Todo from '../Todo/Todo';
import TodoInput from './TodoInput';
import {Loader} from '../_Loader/Loader';
import './Home.css';


const Home = ({ setHaveToken }) => {
	return (
		<Query query={GET_USER} fetchPolicy="network-only">
		{({ loading, error, data, client }) => {
			if (loading) return <Loader />;
			if (error){
				if(error.graphQLErrors.length > 0 && error.graphQLErrors[0].extensions.code === "UNAUTHENTICATED"){
					client.resetStore();
					window.localStorage.setItem('token', '');
					setHaveToken(false)
					return <Redirect to='/login' />
				}
				else
					return <p>Error :)</p>
			}
			console.log(data);
			const todos = data.me.todos.map((todo) =>
				<Todo
					key={todo.id}
					id={todo.id}
					title={todo.title}
					isComplete={todo.isComplete}
					user={data.me}
				/>
			)
			return (
				<section className='homeSection'>
					<div className='home-top'>
						<h2>Hello, {data.me.name}</h2>
						<TodoInput user={data.me} />
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