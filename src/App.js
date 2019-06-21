import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogReg from './Components/LogReg/LogReg';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import './App.css';

function App() {
	const [ haveToken, setHaveToken ] = useState(false);
	const token = window.localStorage.getItem('token');
	useEffect(() => {
		if(token){
			setHaveToken(true);
		}
		else {
			setHaveToken(false);
		}
	}, [haveToken, token])
	return (
		<div className="App">
			<Nav
				haveToken={haveToken}
				setHaveToken={setHaveToken}
			/>
			<Switch>
				<Route path="/" exact render={ () => 
					<Home setHaveToken={setHaveToken} />}
				/>
				<Route path={["/login", "/register"]} exact render={ () => 
					<LogReg
						setHaveToken={setHaveToken}
					/>}
				/>
			</Switch>
		</div>
	);
}

export default App;
