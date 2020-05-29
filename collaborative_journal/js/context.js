import React from 'react';
import {Redirect} from 'react-router-dom';





const AuthContext = React.createContext()
// AuthContext.displayName = 'AuthContext'

class AuthProvider extends React.Component {
  // state = {isAuth: false}

  constructor(props) {
  	super(props);
  	this.login = this.login.bind(this);
  	this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    // this.save_post = this.save_post.bind(this);
    this.state = {isAuth: false,
                  cookie: props.token,
                  cookie_ready: true};
  }

  // getToken() {
  //   fetch('/token', {'credentials': 'same-origin'})
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({cookie: data.token,
  //                    cookie_ready: true});
  //     console.log(this.state);
  //   })
  // }

  login(event) {
    event.preventDefault();
    const {username, password, remember_me, submit} = event.target.elements
    console.log(event.target.elements);

    const loginData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {'Content-Type': 'application/json',"X-CSRFToken": this.state.cookie},
        body: JSON.stringify({ username: username.value, password: password.value})};

    fetch('/login', loginData)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.is_authenticated) {
        console.log(data);
        this.setState({isAuth: true});
        // this.getToken();
      }
      else {
        alert("Failed to sign in.");
      }
      });
  }

  logout() {
    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken':  this.state.cookie }};
    
    fetch('/logout', fetchData)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.is_authenticated === false) {
        console.log(data);
        this.setState({isAuth: false,
                       cookie: data.token});
      }
      else {
        alert("Failed to sign in.");
      }
      });
  }


  register(event) { 
    event.preventDefault();

    const {username, password} = event.target.elements;

    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken':  this.state.cookie },
        body: JSON.stringify({username: username.value,
                              password: password.value})};

    fetch('/register', fetchData)
    .then((response) =>  {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.successful_register) {
        this.setState({isAuth: true});
      }
    })
  }
  
  render() {
	  return (
	  	<AuthContext.Provider value={{
	          isAuth: this.state.isAuth,
	          login: this.login,
	          logout: this.logout,
            register: this.register,
            context_csrf_token: this.state.cookie,
            cookie_ready: this.state.cookie_ready}}>
	        {this.props.children}

	    </AuthContext.Provider>
	  	);
	}
}


const AuthConsumer = AuthContext.Consumer

export {AuthProvider, AuthConsumer};


