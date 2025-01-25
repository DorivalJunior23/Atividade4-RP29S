import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import useApi from '../../helpers/AloneAPI';
import {doLogin, doAdmin, mudarTitulo } from '../../helpers/AuthHandler';

const Signin = () => {

    const api = useApi();
    mudarTitulo("Login");

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [permissao, setPermissao] = useState('1');
    const [disabled, setDisableb] = useState(false);


    const handleClick = async (e) => {
        e.preventDefault();
        setDisableb(true);

        if(usuario === '' && password === ''){
            alert("Informe suas credenciais! ");
        }else{  
            let name = usuario[0].toUpperCase() + usuario.substr(1);   
            const json  = await api.login(name, password, parseInt(permissao));

            if (json.error){  
                alert(JSON.stringify(json.error));
                setDisableb(false);
                return;
            } 
            if (JSON.stringify(json.eAdmin) === '0'){
                doLogin(json.token);
                doAdmin(JSON.stringify(json.eAdmin));
                window.location.href = '/homeAdmin';
            } else{
                doLogin(json.token);
                window.location.href = '/homeOperador';
            }
        }
    }

    return (
        <BrowserRouter>
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="#"><b>Alone</b>Market</a>
                    </div>
                    {/* /.login-logo */}
                    <div className="card">
                        <div className="card-body login-card-body">
                        <p className="login-box-msg">Entre com as credenciais</p>
                        <form>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Usuario" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                    <span className="fas fa-users" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group" style={{marginLeft: -8}}>
                                    <select className="form-control" style={{width: 320}} value={permissao} onChange={e=>{setPermissao(e.target.value)}}>
                                        <option className="dropdown-item" value="1">Operador</option>
                                        <option className="dropdown-item" value="0">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            {/* /.col */}
                            <div className="social-auth-links text-center mb-3">
                                <button type="submit" className="btn btn-block btn-primary" onClick={handleClick}>Sign In</button>
                            </div>
                            {/* /.col */}
                        </form></div>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default Signin;
