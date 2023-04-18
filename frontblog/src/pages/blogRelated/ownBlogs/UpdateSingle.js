import React, { useState, useEffect } from 'react'
import "./Write.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import CircleGrid from '../../../components/Loaders/CircleGrid'
import Popup from '../../../components/Popup'

const UpdateSingle = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const userID = user._id

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [showInputField, setShowInputField] = useState(false)
    const [showError, setShowError] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const params = useParams()

    const getPostDetails = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/post/${params.id}`)
            .then((result) => {
                if (userID === result.data.authorID) {
                    setTitle(result.data.title)
                    setDesc(result.data.desc)
                    setPhoto(result.data.photo)
                }
                else {
                    setShowError(true)
                }
            })
            .catch((error) => {
                console.error(error)
                navigate("/error")
            })
    }

    const fields = { title, desc, photo }

    const updateHandler = (event) => {
        event.preventDefault()

        axios.put(`${process.env.REACT_APP_BASE_URL}/post/${params.id}`, fields,
            {
                headers: { "Content-Type": "application/json" }
            })
            .then(() => {
                navigate("/post/" + params.id)
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

    useEffect(() => {
        getPostDetails()
    }, [])

    return (
        showError ?
            <div className="infinite_loader">
                <h1 style={{ marginTop: "2rem" }}>Sorry This Post Is Not Yours</h1>
            </div>
            :
            title !== ""
                ?
                <>
                    <div className="write">
                        {
                            photo !== ""
                                ? <img src={photo} alt="img" className="writeImg" />
                                : <img src="" alt="img" className="writeImg" />
                        }
                        <form className="writeForm" onSubmit={updateHandler}>
                            <div className="writeFormGroup">
                                <div className="writeIcons">
                                    <label htmlFor="fileInput">
                                        <i className="writeIcon fas fa-image"></i>
                                    </label>
                                    <label><i className={showInputField ? "hide" : "writeIcon fas fa-plus"} onClick={addLink}></i></label>
                                    <i style={{ color: "red" }} className="writeIcon fas fa-times-circle" onClick={() => { setPhoto("") }}></i>
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
                                    placeholder="Update your title" onChange={(event) => setTitle(event.target.value)}
                                    type="text" value={title}
                                    autoFocus={true} required
                                />
                            </div>
                            <div className="writeFormGroup">
                                <textarea
                                    className="writeInput writeText"
                                    placeholder="Update your story..." onChange={(event) => setDesc(event.target.value)}
                                    type="text" value={desc}
                                    autoFocus={true} required
                                />
                            </div>
                            <button className="writeSubmit" type="submit">
                                Publish
                            </button>
                            <button style={{ backgroundColor: "red" }} className="writeSubmit" onClick={() => { navigate("/post/" + params.id) }}>Cancel</button>
                        </form>
                    </div>
                    {showPopup && <Popup message={message} setShowPopup={setShowPopup} />}
                </>
                : <div className="infinite_loader">
                    <CircleGrid />
                </div>
    )
}

export default UpdateSingle