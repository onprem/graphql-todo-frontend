import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogReg from './Components/LogReg/LogReg';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import './App.css';

function App() {
  return (
    <div className="App">
		<Nav />
		<Switch>
			<Route path="/" exact render={ () => 
				<Home />}
			/>
			<Route path="/login" exact render={ () => 
				<LogReg />}
			/>
			<Route path="/register" exact render={ () => 
				<LogReg />}
			/>
		</Switch>
	</div>
  );
}

export default App;
