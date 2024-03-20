import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

export default function Signup() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const [errors, setErrors] = useState({});

  const firebase = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered User Details::: ", "username: ", username, " email:", email, "phone : ", phone, "password: ", password);

    const errors = {};

    if (!username.trim()) {
      errors.username = 'Username is required.';
    }
    if (!email.trim()) {
      errors.email = 'Email is required.';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!password.trim()) {
      errors.password = 'Password is required.';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    if (phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 characters long.';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


    const db = getFirestore(firebase)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: username
      });
      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        username: username,
        phone: phone,
        email: email,
        password: password,
      });

      console.log("Document written with ID: ", docRef.id);

      console.log("New user :", username, " is created");
      toast.success('Signup successful!', { position: "top-right", autoClose: 3000 });
       if (docRef.id) {
        setTimeout(() => {
          navigate("/login")
        }, 3000);
      }
    } catch (error) {
      console.error("Error in creating a new user:", error.message);
      if (error.message.includes('auth/email-already-in-use')) {
        toast.error('Email already in use. Please use a different email.', { position: "top-right", autoClose: 3000 });
      } else {
        toast.error('Error in signup. Please try again.', { position: "top-right", autoClose: 3000 });
      }
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <h1 style={{ display: "FLEX", alignItems: "center", justifyContent: "center" }}>Signup Page</h1>
        <div className="container">
          <img width="200px" height="200px" src={Logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>  <Link to="/">Home Page</Link>
      </div>
    </div>
  );
}
