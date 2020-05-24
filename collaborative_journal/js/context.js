import React from 'react';
import {Redirect} from 'react-router-dom';


<form id="LoginForm"> </form>


const AuthContext = React.createContext()
// AuthContext.displayName = 'AuthContext'

class AuthProvider extends React.Component {
  // state = {isAuth: false}

  constructor(props) {
  	super();
  	this.login = this.login.bind(this);
  	this.logout = this.logout.bind(this);
    // this.save_post = this.save_post.bind(this);
    this.state = {isAuth: false,
                  cookie: '',
                  cookie_ready: false};
  }

  componentDidMount() {
    fetch('/token', {'credentials': 'same-origin'})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({cookie: data.token,
                     cookie_ready: true});
      console.log(this.state);
    })
  }

  // getToken() {
  //   fetch('/token', {'credentials': 'same-origin'})
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({cookie: data.token});
  //     console.log(this.state);
  //   })
  // }

  login(event) {
    event.preventDefault();
    console.log(event);
    // console.log(event.target.csrfmiddlewaretoken.value);
    // console.log(event.target.elements[2].value);
    // console.log(event.target.elements[1].value);

    const {username, password, remember_me, submit} = event.target.elements


    console.log(event.target.elements);
    // console.log(csrf_token);
    // console.log(csrf_token.value);
    console.log(username);
    console.log(password);

    

    const fetchData = {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        ,"X-CSRFToken": this.state.cookie
      },
        body: JSON.stringify({
          username: username.value,
          password: password.value})
      // body: JSON.stringify({username: event.target.elements[1].value,
      //        password: event.target.elements[2].value,
      //        csrf_token: event.target.csrfmiddlewaretoken.value})
      // body: 
      // JSON.stringify({username: {username},
      //                       password: {password},
      //                       remember_me: {remember_me},
      //                       submit: {submit},
      //                       csrf_token: {csrf_token}})
      // body: `_csrf=${event.target.csrfmiddlewaretoken.value}&username=${event.target.elements[1].value}&password=${event.target.elements[2].value}`

    };
    console.log(fetchData);
    fetch('/login', fetchData)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.is_authenticated) {
        console.log(data);
        this.setState({isAuth: true});
        
        

        //window.localStorage.setItem(localStorageKey, token)
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
        'X-CSRFToken':  this.state.cookie
      }

    };
    fetch('/logout', fetchData)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      if (data.is_authenticated === false) {
        console.log(data);
        this.setState({isAuth: false});
        
        

        //window.localStorage.setItem(localStorageKey, token)
      }
      else {
        alert("Failed to sign in.");
      }
      });
  }



  register() {

  }
  
  render() {
	  return (
	  	<AuthContext.Provider value={{
	          isAuth: this.state.isAuth,
	          login: this.login,
	          logout: this.logout,
            context_csrf_token: this.state.cookie,
            cookie_ready: this.state.cookie_ready}}>
	        {this.props.children}

	    </AuthContext.Provider>
	  	);
	}
}







 function get_csrf_token() {

 }
//   const context = React.useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error(`useAuth must be used within a AuthProvider`)
//   }
//   return context;
// }

const AuthConsumer = AuthContext.Consumer

export {AuthProvider, AuthConsumer};


// function LoginForm({onSubmit, submitButton}) {
//   const {isLoading, isError, error, run} = useAsync()
//   function handleSubmit(event) {
//     event.preventDefault()
//     const {username, password} = event.target.elements

//     run(
//       onSubmit({
//         username: username.value,
//         password: password.value,
//       }),
//     )
//   }




// import {client, localStorageKey} from './api-client'

// function handleUserResponse({user: {token, ...user}}) {
//   window.localStorage.setItem(localStorageKey, token)
//   return user
// }

// function getUser() {
//   const token = getToken()
//   if (!token) {
//     return Promise.resolve(null)
//   }
//   return client('me').then(data => data.user)
// }

// function login({username, password}) {
//   return client('login', {body: {username, password}}).then(handleUserResponse)
// }

// function register({username, password}) {
//   return client('register', {body: {username, password}}).then(
//     handleUserResponse,
//   )
// }

// function getToken() {
//   return window.localStorage.getItem(localStorageKey)
// }

// function isLoggedIn() {
//   return Boolean(getToken())
// }

// export {login, register, getToken, getUser, isLoggedIn}
// export {logout} from './api-client'