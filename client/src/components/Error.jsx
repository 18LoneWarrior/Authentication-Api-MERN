import React from 'react'
import { NavLink } from 'react-router-dom'
import error from '../assets/error.png'

const Error = () => {
    return (
        <>
            <div className="container">
                <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <img src={error} alt="error" style={{ width: "500px", marginBottom: 20 }} />
                    <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                </div>
            </div>
        </>
    )
}

export default Error