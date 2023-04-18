import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import PrivateComponent from './components/PrivateComponent';

import Login from "./pages/userDetails/Login";
import Logout from './pages/userDetails/Logout';
import Register from "./pages/userDetails/Register";
import Profile from "./pages/userDetails/Profile";

import Write from "./pages/blogRelated/ownBlogs/Write";
import Single from "./pages/blogRelated/ownBlogs/Single";
import UpdateSingle from './pages/blogRelated/ownBlogs/UpdateSingle';

import Contact from './pages/Zunused/Contact';
import About from './pages/Zunused/About';

import Explore from './pages/blogRelated/othersBlogs/Explore';
import OthersPost from './pages/blogRelated/othersBlogs/OthersPost';
import ErrorPage from './components/ErrorPage';

export const BASE_URL = "http://localhost:5000"

const App = () => {

  const signed = localStorage.getItem("user")
  const [loggedIn, setLoggedIn] = useState(signed !== null)

  // const user = JSON.parse(signed)

  const redirectHandler = (link) => {
    window.open(link, '_blank');
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} redirectHandler={redirectHandler} />
      <Routes>

        <Route element={<PrivateComponent loggedIn={loggedIn} />}>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/posts" element={<Homepage />} />
          <Route path="/write" element={<Write />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/update/:id" element={<UpdateSingle />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/others/:id" element={<OthersPost />} />
          <Route path="/about" element={<About redirectHandler={redirectHandler} />} />
          <Route path="/contact" element={<Contact redirectHandler={redirectHandler} />} />
          <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
          <Route path="/profile" element={<Profile setLoggedIn={setLoggedIn} />} />
        </Route>

        <Route path="/error" element={<ErrorPage />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} signed={signed} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App