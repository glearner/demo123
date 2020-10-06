import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/home";
import Login from "./components/login";

function App() {
	const isAuthenticated =
		useSelector((state) => state?.token?.isAuthenticating) || false;
	return (
		<>
			<Switch>
				<Route
					exact
					path='/'
					render={(props) => {
						return props?.location?.state?.auth || isAuthenticated ? (
							<Home {...props} />
						) : (
							<Redirect to='/login' />
						);
					}}
				/>

				<Route exact path='/login'>
					<Login />
				</Route>
			</Switch>
		</>
	);
}

export default App;
