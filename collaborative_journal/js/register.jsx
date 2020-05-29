import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import {AuthConsumer} from './context';



function Register(props) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleUsername(event) {
		setUsername(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	return(
		<AuthConsumer>
		{({isAuth, register}) => (
			isAuth ? <Redirect to={{pathname:'/'}} /> :
			<div>
			<h1>Register</h1>
			
			<form onSubmit={register} id="RegisterForm" noValidate>
					<label>
						Username
						<input type="text" required size="32" id="username" value={username} onChange={handleUsername} />
					</label>
					<label>
						Password
						<input type="password" id="password"required size="32" value={password} onChange={handlePassword} />
					</label>
					<label>
						Register Now!
						<input id="submit" name="submit" type="submit" value="register" />
					</label>
			</form>
			</div>
		)}
		</AuthConsumer>
	);	
	
}

export default Register;