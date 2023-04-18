import React, { useState } from 'react'
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup';
import blank from "../../assets/blank.webp"

const Profile = ({ setLoggedIn }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userID = user._id
  const navigate = useNavigate()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [profileDP, setProfileDP] = useState(user.profileDP);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const fields = password === "" ? { name, email, profileDP } : { name, email, password, profileDP }

  const submitHandler = (event) => {
    event.preventDefault()

    axios.put(`${process.env.REACT_APP_BASE_URL}/user/${userID}`, fields,
      {
        headers: { "Content-Type": "application/json" }
      })
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data))
        navigate("/")
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  const deletePosts = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${userID}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  const deleteHandler = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${userID}`)
      .then(() => {
        deletePosts()
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        navigate("/error")
      });
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
      <div className="profile">
        <div className="profileWrapper">
          <i className="fas fa-times-circle profileCloseIcon" onClick={() => { navigate(-1) }}></i>

          <form className="profileForm" onSubmit={submitHandler}>
            <label>Profile Picture</label>

            <div className="profilePP">
              {
                profileDP !== ""
                  ? <img src={profileDP} alt="img" />
                  : <img src="" alt="img" />
              }
              <label htmlFor="fileInput">
                <i className="profilePPIcon far fa-user-circle"></i>
              </label>
              <label htmlFor="removeProfileDP">
                <i className="profilePPIcon fas fa-trash-alt" style={{ color: "red" }}></i>
              </label>
              <input id="fileInput" type="file"
                style={{ display: "none" }} accept="image/*"
                className="profilePPInput" onChange={imageUpload} />

              <input id="removeProfileDP"
                style={{ display: "none" }}
                className="profilePPInput" onClick={() => {
                  setProfileDP("")
                  setProfileDP(blank)
                }} />
            </div>

            <label>Username</label>
            <input
              type="text" name="name" placeholder="Change your name" className="input-field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
            />
            <label>Email</label>
            <input
              type="email" name="email" placeholder="Change your email" className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
            />
            <label>Password</label>
            <input
              type="text" name="password" placeholder="Change your password" className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />

            <div className="profileButtons">
              <button className="profileSubmitButton" type="submit">
                Update
              </button>
              <button className="profileDeleteButton" onClick={(event) => {
                event.preventDefault()
                setShowConfirmPopup(true)
              }}>
                Delete Account
              </button>
              {showConfirmPopup && (
                <div className="popups">
                  <div className="popups-content">
                    <h2>Are you sure ? All of your posts will also be deleted</h2>
                    <div className="popup-buttons">
                      <button className="popup-ok-button popupButton" onClick={deleteHandler}>Delete</button>
                      <button className="popup-cancel-button popupButton" onClick={() => setShowConfirmPopup(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
    </>
  );
}

export default Profile