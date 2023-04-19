import React, { useEffect, useState } from 'react';
import "./Register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import blank from "../../assets/blank.webp"
import Popup from '../../components/Popup';
import '../../components/Loaders/Load.scss';

const Register = ({ setLoggedIn, loggedIn }) => {

  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [profileDP, setProfileDP] = useState(blank)

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const fields = { name, email, password, profileDP }

  useEffect(() => {
    if (loggedIn) {
      navigate("/")
    }
  })

  const submitHandler = (event) => {
    event.preventDefault()

    setLoader(true)

    axios.post(`${process.env.REACT_APP_BASE_URL}/register`, fields,
      {
        headers: { "Content-Type": "application/json" }
      })

      .then((result) => {
        if (result.data.response) {
          setMessage(result.data.response)
          setShowPopup(true)
          setLoader(false)
        }
        else {
          localStorage.setItem("user", JSON.stringify(result.data))
          setLoggedIn(true)
          navigate("/")
        }
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
        setLoader(false)
      })
  }

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const imageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE && file.type.startsWith("image/")) {
      const base64 = await convertToBase64(file)
      setProfileDP(base64)
    }
    else {
      if (file.size > MAX_FILE_SIZE) {
        setMessage("The selected file is too large. Please select a file that is smaller than 2MB.")
        setShowPopup(true)
      } else if (!file.type.startsWith("image/")) {
        setMessage("Please select an image file (JPG, PNG, GIF, etc..")
        setShowPopup(true)
      }
    }
  }

  const convertToBase64 = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <label>Profile Picture</label>

          <div className="profilePP">
            {
              profileDP !== ""
                ? <img src={profileDP} alt="img" />
                : <img src="" alt="img" />
            }
            <label htmlFor="fileInput">
              <i className="profilePPIcon far fa-user-circle"></i>{" "}
            </label>
            <input id="fileInput" type="file"
              style={{ display: "none" }} accept="image/*"
              onChange={imageUpload} />
          </div>

          <label>Username</label>
          <input className="registerInput" type="text" placeholder="Enter your username..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="registerInput" type="text" placeholder="Enter your email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter your password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <div className="load"></div>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
    </>
  )
}

export default Register
