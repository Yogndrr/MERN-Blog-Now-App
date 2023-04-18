import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = ({ loggedIn }) => {
    return (
        loggedIn
            ? <Outlet />
            : <Navigate to="/login" />
    )
}

export default PrivateComponent