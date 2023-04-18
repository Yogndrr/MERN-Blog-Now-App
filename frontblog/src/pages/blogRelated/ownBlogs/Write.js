import React, { useState } from 'react'
import "./Write.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Popup from '../../../components/Popup'

const Write = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const author = user.name
  const authorID = user._id
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState("")
  const [showInputField, setShowInputField] = useState(false)

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, desc, photo, author, authorID }

  const submitHandler = (event) => {
    event.preventDefault()

    axios.post(`${process.env.REACT_APP_BASE_URL}/write`, fields,
      {
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        resetHandler()
        navigate("/")
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  const addLink = () => {
    setShowInputField(true)
  }

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const imageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE && file.type.startsWith("image/")) {
      const base64 = await convertToBase64(file)
      setPhoto(base64)
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

  const resetHandler = () => {
    setTitle("")
    setDesc("")
    setPhoto("")
  }

  return (
    <>
      <div className="write">
        {
          photo !== ""
            ? <img src={photo} alt="img" className="writeImg" />
            : <img src="" alt="img" className="writeImg" />
        }
        <form className="writeForm" onSubmit={submitHandler}>
          <div className="writeFormGroup">
            <div className="writeIcons">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-image"></i>
              </label>
              <label><i className={showInputField ? "hide" : "writeIcon fas fa-plus"} onClick={addLink}></i></label>
              {showInputField &&
                <div>
                  <input
                    className="linkInput"
                    placeholder="Enter the link"
                    type="text" onChange={(event) => setPhoto(event.target.value)}
                  />
                </div>
              }
            </div>
            <input id="fileInput" type="file"
              style={{ display: "none" }} accept='image/*'
              onChange={imageUpload} />

            <input
              className="writeInput"
              placeholder="Title" onChange={(event) => setTitle(event.target.value)}
              type="text" value={title}
              autoFocus={true} required
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..." onChange={(event) => setDesc(event.target.value)}
              type="text" value={desc}
              autoFocus={true} required
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
      {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
    </>
  )
}

export default Write