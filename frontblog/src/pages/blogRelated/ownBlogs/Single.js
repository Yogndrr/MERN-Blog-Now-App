import React, { useEffect, useState } from 'react'
import "./Single.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CircleGrid from '../../../components/Loaders/CircleGrid';
import { BASE_URL } from '../../../App';

const Single = () => {
  const navigate = useNavigate()
  const params = useParams()
  const user = JSON.parse(localStorage.getItem("user"))
  const userID = user._id

  const [postDetails, setPostDetails] = useState("")
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);

  const getPostDetails = () => {
    axios.get(`${BASE_URL}/post/${params.id}`)
      .then((result) => {
        if (userID === result.data.authorID) {
          setPostDetails(result.data)
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

  const deleteHandler = () => {
    axios.delete(`${BASE_URL}/post/${params.id}`)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  const editHandler = () => {
    navigate("/update/" + postDetails._id)
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
      postDetails !== ""
        ?
        <div className="single">
          <div className="singlePost">
            <div className="singlePostWrapper">
              <img className="singlePostImg" src={postDetails.photo} alt="" />
              <h1 className="singlePostTitle">
                {postDetails.title}
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={editHandler}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={() => setShowPopup(true)}></i>
                </div>
              </h1>
              <div className="singlePostInfo">
                <span>
                  Author:
                  <b className="singlePostAuthor">
                    {postDetails.author}
                  </b>
                </span>
                <span>{new Date(postDetails.createdAt).toDateString()}</span>
              </div>
              <p className="singlePostDesc">
                {postDetails.desc}
              </p>
            </div>
            {
              showPopup && (
                <div className="popup">
                  <div className="popup-content">
                    <h2>Are you sure you want to delete your post?</h2>
                    <div className="popup-buttons">
                      <button className="popup-ok-button popupButton" onClick={deleteHandler}>Ok</button>
                      <button className="popup-cancel-button popupButton" onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        : <div className="infinite_loader">
          <CircleGrid />
        </div>
  );
}

export default Single