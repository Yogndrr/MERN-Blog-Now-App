import React from 'react'
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Navbar = ({ loggedIn, redirectHandler }) => {

  const user = JSON.parse(localStorage.getItem("user"))

  const location = useLocation()

  return (
    <div className="top">

      {loggedIn
        ? (
          <>
            <div className="topLeft">
              <FaFacebook className='topIcon' onClick={() => redirectHandler("https://www.facebook.com/yogendraprasad.awasthi")} />
              <FaInstagram className='topIcon' onClick={() => redirectHandler("https://www.instagram.com/yogndr_awasthi")} />
              <FaGithub className='topIcon' onClick={() => redirectHandler("https://github.com/Yogndrr")} />
              <FaLinkedin className='topIcon' onClick={() => redirectHandler("https://www.linkedin.com/in/yogndr/")} />
            </div>

            <div className="topCenter">
              <ul className="topList">
                <li className="topListItem">
                  <Link className={location.pathname === "/" ? "active" : "link"} to="/">HOME</Link>
                </li>
                <li className="topListItem">
                  <Link className={location.pathname === "/explore" ? "active" : "link"} to="/explore">EXPLORE</Link>
                </li>
                <li className="topListItem">
                  <Link className={location.pathname === "/about" ? "active" : "link"} to="/about">ABOUT</Link>
                </li>
              </ul>
            </div>
            <div className="topRight">
              {
                location.pathname === "/profile"
                  ? null
                  : <Link to="/profile">
                    <img className="topImg" alt=""
                      src={user.profileDP} />
                  </Link>
              }
              <ul className="topList">
                <li className="topListItem">
                  <Link className={location.pathname === "/logout" ? "active" : "link"} to="/logout">
                    <i className="logoutIcon fas fa-sign-out-alt"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )
        : (
          <div className="right-links">
            <ul className="topList">
              <li className="topListItem">
                <Link className={location.pathname === "/login" ? "active" : "link"} to="/login">LOGIN</Link>
              </li>
              <li className="topListItem">
                <Link className={location.pathname === "/register" ? "active" : "link"} to="/register">REGISTER</Link>
              </li>
            </ul>
          </div >
        )
      }
    </div>
  )
}

export default Navbar