import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});


  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!email.trim()) {
      errors.email= 'Email is required.';
    }
    if (!password.trim()) {
      errors.password = 'Password is required.';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log("User successfully logged in")
        // navigate("/") // homepage
        toast.success('Signed in successfully!', { position: "top-right", autoClose: 3000 });
       
         setTimeout(() => {
           navigate("/")
         }, 3000);
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
            console.log("errormsg : ", errorMessage)

 

            if (error.message.includes('auth/invalid-credential')) {
              toast.error('Email or password is incorrect. Please try again.', { position: "top-right", autoClose: 3000 });
            } else {
              toast.error('Error in signing in. Please try again.', { position: "top-right", autoClose: 3000 });
            }
      });
  }

  return (
    <div>

      <div className="loginParentDiv">
        <h1 style={{ display: "FLEX", alignItems: "center", justifyContent: "center" }}>Login Page</h1>
        <div className='imgContainer'>
          <img width="200px" height="200px" src={Logo}></img>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>  <Link to="/">Home Page</Link>
      </div>
    </div>
  );
}

export default Login;
