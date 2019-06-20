import ApolloClient from "apollo-boost";

const token = localStorage.getItem('token');
const headers = {
	authorization: token ? `bearer ${token}` : ""
}
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  headers: headers
});

export default client;