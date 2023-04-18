import React, { useEffect, useState } from 'react'
import Header from "./Header";
import Posts from "../pages/blogRelated/ownBlogs/Posts";
import Infinity from "./Loaders/Infinity"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../App';

const Homepage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const userID = user._id

  const [posts, setPosts] = useState([])
  const [showLoader, setShowLoader] = useState(true)

  const navigate = useNavigate()

  const getPosts = () => {
    axios.get(`${BASE_URL}/posts/${userID}`)
      .then((result) => {
        setPosts(result.data)
      })
      .catch((error) => {
        console.error(error)
        navigate("/error")
      })
  }

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 7000)
    getPosts()
  }, [])

  return (
    <>
      <Header />
      {
        posts.length > 0
          ?
          <Posts posts={posts} />
          : showLoader
            ? <div className="infinite_loader">
              <Infinity />
            </div>
            : <div className="infinite_loader">
              <h1>No Posts Found</h1>
            </div>
      }
    </>
  )
}

export default Homepage