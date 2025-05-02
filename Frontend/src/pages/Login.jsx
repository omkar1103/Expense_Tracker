import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../Utils';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {  email, password } = loginInfo;

    if ( !email || !password) {
      return handleError('All fields are required');
    }

    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      const { success, message,jwtToken, name, error} = result;

      if (success) {
        handleSuccess(message || 'Signup successful!');
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setLoginInfo({  email: '', password: '' }); // clear form
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } 
      else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }
      else if(!success){
        handleError(message);
      }
      else {
        handleError(message || 'Signup failed');
      }

    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSignup}>
       
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <p style={{ marginTop: '10px' }}>
  Don't have an account? <Link to='/signup'>Signup</Link>
</p>

      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
