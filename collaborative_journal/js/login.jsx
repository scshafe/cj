import React, { useState, useEffect } from 'react';
import {AuthConsumer} from './context';
import {Link, Redirect} from 'react-router-dom';



function LoginScreen(props) {

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
			{({isAuth, login, logout}) => (

				isAuth ? <Redirect to={{pathname:'/'}} /> :
			<div>
				<h1>Sign In</h1>
				<form onSubmit={login} id="LoginForm" noValidate>
					<label>
						Username
						<input type="text" required size="32" id="username" value={username} onChange={handleUsername} />
					</label>
					<label>
						Password
						<input type="password" id="password"required size="32" value={password} onChange={handlePassword} />
					</label>
					<label>
						Remember Me
						<input type="checkbox" id="remember_me" name="remember_me"  />
					</label>
					<label>
						Login In.
						<input id="submit" name="submit" type="submit" value="Sign In" />
					</label>
				</form>

				<div>
					<p>
						Don't have an account?
						<Link to={{pathname: '/register'}}>
							<button>Register Now!</button>
						</Link>
					</p>
				</div>

			</div>
			
			)}
			</AuthConsumer>
			);
	
}
export default LoginScreen;



// class LoginScreen extends Component {
// 	constructor(props) {
// 		super(props);
// 		// this.handleSubmit = this.handleSubmit.bind(this);
// 		this.handleUsername = this.handleUsername.bind(this);
// 		this.handlePassword = this.handlePassword.bind(this);
// 		this.state={username: '',
// 					password: ''
// 					,cookie: ''
// 				};
// 	}
	

// 	handleUsername(event) {
// 		this.setState({username: event.target.value});
// 	}

// 	handlePassword(event) {
// 		this.setState({password: event.target.value});
// 	}


// 	render() {
// 		return(
// 			<AuthConsumer>
// 			{({isAuth, login, logout}) => (

// 				isAuth ? <Redirect to={{pathname:'/'}} /> :
// 			<div>
// 				<h1>Sign In</h1>
// 				<form onSubmit={login} id="LoginForm" noValidate>
// 					<input type="hidden" name="csrf_token" value={this.state.cookie} />
// 					<label>
// 						Username
// 						<input type="text" required size="32" id="username" value={this.state.username} onChange={this.handleUsername} />
// 					</label>
// 					<label>
// 						Password
// 						<input type="password" id="password"required size="32" value={this.state.password} onChange={this.handlePassword} />
// 					</label>
// 					<label>
// 						Remember Me
// 						<input type="checkbox" id="remember_me" name="remember_me"  />
// 					</label>
// 					<label>
// 						Login In.
// 						<input id="submit" name="submit" type="submit" value="Sign In" />
// 					</label>
// 				</form>

// 				<div>
// 					<p>
// 						Don't have an account?
// 					</p>
// 				</div>

// 			</div>
			
// 			)}
// 			</AuthConsumer>
// 			);
// 	}
// }