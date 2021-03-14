import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar-dark" style={{backgroundColor: 'azure'}}>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/adduser">Add Device</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/search">Search</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar