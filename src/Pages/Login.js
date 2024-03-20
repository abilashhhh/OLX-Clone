import React from 'react';
import Login from '../Components/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
  return (
    <div>
      <Login />
      <ToastContainer />

    </div>
  );
}

export default LoginPage;
