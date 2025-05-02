import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Utils';
import {ToastContainer} from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login'); // redirect if not logged in
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout} >Logout</button>
      <ToastContainer/>
    </>
  );
};

export default Home;
