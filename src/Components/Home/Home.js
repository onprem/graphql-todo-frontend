import React from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_USER } from '../../gqlDefs';
import Todo from '../Todo/Todo';
import TodoInput from './TodoInput';
import {Loader} from '../_Loader/Loader';
import './Home.css';


const Home = ({ setHaveToken }) => {
	const client = useApolloClient();
	const { loading, error, data } = useQuery(GET_USER, { fetchPolicy: "network-only" });
	
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
}

export default Home;