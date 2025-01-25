import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { mudarTitulo, doLogout } from '../../helpers/AuthHandler';


const Page = () => {
    mudarTitulo("Home Operador");

    const handleLogout = () => {
        window.location.href = '/';
        doLogout();
    }
    
    return(
        <BrowserRouter> 
            <div className="wrapper">
                {/* Navbar */}
                <nav style={{marginLeft: -10}} className="main-header navbar navbar-expand-md navbar-light navbar-white">
                    <div className="container">
                    
                    <div style={{marginLeft: -120}} className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* Left navbar links */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="/homeOperador" class="nav-link">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a id="dropdownSubMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Vendas</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                    <li><a href="/vendas" className="dropdown-item">Vender</a></li>
                                </ul>
                            </li>
                        </ul>
                        {/* SEARCH FORM */}
                    </div>
                    <ul style={{marginRight: -120}} className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        {/* Messages Dropdown Menu */}
                        <li onClick={handleLogout} className="nav-item">
                            <a className="nav-link">
                                <i className="fas fa-sign-out-alt" />
                                {" "}Sair
                            </a>
                        </li>
                    </ul>
                    </div>
                </nav>
                {/* /.navbar */}
                {/* Content Wrapper. Contains page content */}
                <div style={{marginLeft: -10, height: 528}} className="content-wrapper">
                    
                    
                </div>
                {/* /.content-wrapper */}
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
                {/* /.control-sidebar */}
                {/* Main Footer */}
                <footer className="main-footer">
                    {/* To the right */}
                    <div className="float-right d-none d-sm-inline">
                    Anything you want
                    </div>
                    {/* Default to the left */}
                    <strong style={{marginLeft: -255}}>Copyright © 2021-2025<a href="https://adminlte.io">AloneMarket</a>.</strong> All rights reserved.
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default Page;