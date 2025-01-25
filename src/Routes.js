import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './pages/Signin/';
import HomeAdmin from './pages/AdminHome/';
import CadastrarProduto from './pages/ProdutoCrud/Cadastrar';
import ListarProdutos from './pages/ProdutoCrud/Listar';
import CadastrarOperador from './pages/OperadorCrud/Cadastra';
import ListarOperador from './pages/OperadorCrud/Listar';
import GerarEstoque from './pages/Estoque/Cadastrar';
import ListarEstoque from './pages/Estoque/Listar';
import CadastrarFornecedor from './pages/Fornecedores/Cadastrar';
import ListarFornecedor from './pages/Fornecedores/Listar';
import OperadorHome from './pages/OperadorHome';

import Vender from './pages/Vendas/';

import { isLogged, isAdmin, mudarTitulo } from './helpers/AuthHandler';

let admin = isAdmin();
let logged = isLogged();
mudarTitulo("Login");

const PrivateRoute = ({children, ...rest}) => {
    return(
        <Route {...rest}>
            {logged ? children : <Redirect to="/" />}
        </Route>
    );
}

const PrivateAdmin = ({children, ...rest}) => {
    return(
        <Route {...rest}>
            {(logged && admin === '0') ? children : <Redirect to="/AcessoNegado" />}
        </Route>
    );
}

//eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    

    return(
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>
            <PrivateAdmin exact path="/homeAdmin">
                <HomeAdmin/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/cadastrarProduto">
                <CadastrarProduto/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/listarProdutos">
                <ListarProdutos/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/cadastrarOperador">
                <CadastrarOperador/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/listarOperador">
                <ListarOperador/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/gerarEstoque">
                <GerarEstoque/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/listarEstoque">
                <ListarEstoque/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/cadastrarFornecedor">
                <CadastrarFornecedor/>
            </PrivateAdmin>
            <PrivateAdmin exact path="/listarFornecedor">
                <ListarFornecedor/>
            </PrivateAdmin>

            <PrivateRoute exact path="/homeOperador">
                <OperadorHome/>
            </PrivateRoute>
            <PrivateRoute exact path="/vendas">
                <Vender/>
            </PrivateRoute>
        </Switch>
    );
}