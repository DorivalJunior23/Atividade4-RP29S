import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { doLogout } from '../helpers/AuthHandler';

export default function Header() {

    const handleLogout = () => {
        window.location.href = '/';
        doLogout();
    }

    return (
        <BrowserRouter>
             <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/homeAdmin" className="nav-link">Home</a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    <li onClick={handleLogout} className="nav-item dropdown">
                        <a className="nav-link">
                            <i className="fas fa-sign-out-alt" />
                            {" "}Sair
                        </a>
                    </li>
                </ul>
            </nav>
        </BrowserRouter>
    )
}
