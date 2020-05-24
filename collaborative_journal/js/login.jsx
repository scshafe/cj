import Cookies from 'js-cookie';
import React, { Component } from 'react';
import {AuthConsumer} from './context';
import {Link, Redirect} from 'react-router-dom';



class LoginScreen extends Component {
	constructor(props) {
		super(props);
		// this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.state={username: '',
					password: ''
					// ,cookie: ''
					// ,cookie: Cookies.get('csrftoken')
				};
		// console.log(this.state.cookie);
	}

	// componentDidMount() {
		// const fetchData = {
		// 	credentials: 'same-origin',
  //     		method: 'GET',
  //     		headers: {
  //       		Accept: 'application/json',
  //       		'Content-Type': 'application/json',
  //     },
		// }

		// fetch('/token', {'credentials': 'same-origin'})
		// .then((response) => {
		// 	return response.json();
		// })
		// .then((data) => {
		// 	console.log(data);
		// 	this.setState({cookie: data.token});
		// 	console.log(this.state);
		// })
		// console.log(this.state);
	// }

	handleUsername(event) {
		this.setState({username: event.target.value});
	}

	handlePassword(event) {
		this.setState({password: event.target.value});
	}


	render() {
		return(
			<AuthConsumer>
			{({isAuth, login, logout, cookie_ready}) => (

				isAuth ? <Redirect to={{pathname:'/'}} /> :
			<div>
				<h1>Sign In</h1>
				<form onSubmit={login} id="LoginForm" noValidate>
					<label>
						Username
						<input type="text" required size="32" id="username" value={this.state.username} onChange={this.handleUsername} />
					</label>
					<label>
						Password
						<input type="password" id="password"required size="32" value={this.state.password} onChange={this.handlePassword} />
					</label>
					<label>
						Remember Me
						<input type="checkbox" id="remember_me" name="remember_me"  />
					</label>
					{ !cookie_ready ? <div>Waiting for authentication</div> :
					<label>
						Login In.
						<input id="submit" name="submit" type="submit" value="Sign In" />
					</label>}
				</form>

				<div>
					<p>
						Don't have an account?
					</p>
				</div>

			</div>
			
			)}
			</AuthConsumer>
			);
	}
}

//<input type="hidden" name="csrf_token" value={this.state.cookie} />
// type="hidden" should be an attribute for csrfmiddlewaretoken
export default LoginScreen;