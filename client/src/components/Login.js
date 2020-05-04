import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/')
      })
      .catch(err => console.error('credential error', err));
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please Login</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={credentials.username}
          onChange={handleChanges}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={credentials.password}
          onChange={handleChanges}
        />

        <button className='login-btn' type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
