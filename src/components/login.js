import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";

import { loginUserSuccess } from "../actions/index";

const Login = withRouter((props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (event, username, password) => {
		event.preventDefault();
		setError(false);
		let formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		axios
			.post("/token", formData)
			.then(function (response) {
				if (response.status === 200) {
					if (response?.data?.access_token) {
						localStorage.setItem(
							"token",
							JSON.stringify(response?.data?.access_token)
						);
						dispatch(loginUserSuccess(response?.data?.access_token));
						props.history.push({
							pathname: "/",
							state: { auth: true },
						});
					} else setError(true);
				} else setError(true);
			})
			.catch(function (error) {
				setError(true);
			});
	};

	return (
		<Container className='login-container'>
			<form
				className='login-form-wrapper'
				onSubmit={(event) => handleSubmit(event, username, password)}
			>
				<div className='login-box'>
					<label className='user-name'>
						Username:
						<input
							type='text'
							name='name'
							className='input-field'
							onChange={(event) => setUsername(event.target.value)}
						/>
					</label>
					<label className='user-name'>
						Password:
						<input
							type='password'
							name='password'
							className='input-field'
							onChange={(event) => setPassword(event.target.value)}
						/>
					</label>
					<input type='submit' value='LogIn' className='form-submit' />
					{error ? <p className='error'>Wrong username or password</p> : <></>}
				</div>
			</form>
		</Container>
	);
});

export default Login;
