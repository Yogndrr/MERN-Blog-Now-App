import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Posts.css";

const Posts = ({ posts }) => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="posts">
        {
          posts.map((post) => (
            <div className="post" key={post._id}>
              <img className="postImg" src={post.photo} alt="img"
                onTouchStart={() => { navigate("/post/" + post._id) }}
                onClick={() => { navigate("/post/" + post._id) }} />
              <div className="postInfo">
                <span className="postTitle">
                  <Link to={"/post/" + post._id} className="link">
                    {post.title}
                  </Link>
                </span>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
              </div>
              <p className="postDesc">{post.desc}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Posts
