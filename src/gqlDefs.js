import { gql } from "apollo-boost";

export const GET_USER = gql`
	query UserData {
		me {
			id
			name
			email
			todos {
				id
				title
				isComplete
			}
		}
	}
`;
export const DEL_TODO = gql`
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
export const TOG_TODO = gql`
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
export const ADD_TODO = gql`
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