import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate("/write")
  }

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Create Your Own</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <div className="headerBtn">
        <button onClick={clickHandler}>CREATE</button>
      </div>
    </div>
  )
}

export default Header
