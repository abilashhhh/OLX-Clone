import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '../Components/Signup/Signup';

function SignupPage() {
  return (
    <div>
      <Signup />
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
