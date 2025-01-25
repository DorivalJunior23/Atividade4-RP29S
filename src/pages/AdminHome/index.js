import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Content from '../../components/Content';
import Footer from '../../components/Footer';

import { mudarTitulo } from '../../helpers/AuthHandler';

export default function index() {
    mudarTitulo("Home Admin");

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <Content/>
            <Footer/>
        </BrowserRouter>
    )
}
