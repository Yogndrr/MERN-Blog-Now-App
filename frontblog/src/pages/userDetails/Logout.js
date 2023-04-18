import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setLoggedIn }) => {
    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="logout-container">
            <h1>{user.name}</h1>
            <p className="logout-message">Are you sure you want to log out?</p>
            <button className="logout-btn logout" onClick={handleLogout}>Log Out</button>
            <button className="logout-btn cancel" onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default Logout;
