import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';
import { BASE_URL } from '../../App';

const Login = ({ setLoggedIn, loggedIn }) => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { email, password }

  useEffect(() => {
    if (loggedIn) {
      navigate("/")
    }
  })

  const loginHandler = (event) => {
    event.preventDefault()

    axios.post(`${BASE_URL}/login`, fields,
      {
        headers: { "Content-Type": "application/json" }
      })

      .then((result) => {
        if (result.data.name) {
          localStorage.setItem("user", JSON.stringify(result.data))
          setLoggedIn(true)
          navigate("/")
        }
        else {
          setMessage(result.data.response)
          setShowPopup(true)
        }
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={loginHandler}>
          <label>Email</label>
          <input className="loginInput" type="text" placeholder="Enter your email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter your password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          <button className="loginButton" type='submit'>Login</button>
        </form>
      </div>
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
    </>
  )
}

export default Login
