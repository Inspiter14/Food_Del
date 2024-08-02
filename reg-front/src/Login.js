import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Corrected method name
    axios.post('http://localhost:8082/signup', values)
      .then(res => console.log("Registered!"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' placeholder='Name' value={values.name} onChange={handleChange}></input>
        <input type='email' name='email' placeholder='Email' value={values.email} onChange={handleChange}></input>
        <input type='password' name='password' placeholder='Password' value={values.password} onChange={handleChange}></input>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
