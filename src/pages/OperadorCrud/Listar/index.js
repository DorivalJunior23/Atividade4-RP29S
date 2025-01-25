import React, { useState, useEffect, useRef} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';
import useApi from '../../../helpers/AloneAPI';
import { mudarTitulo, isLogged } from '../../../helpers/AuthHandler';
import {ExportCSV} from './ExportCSV';

import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './Impressao';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Page = (props) => {
    
    let api = useApi();
    let logged = isLogged();
    mudarTitulo("Listar Usuarios");

    const componentRef = useRef(0);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const fileName = "ListaDeUsuarios";

    const [userList, setUserList] = useState([]);
    const [novoNome, setNovoNome] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [busca, setBusca] = useState('');
   
    useEffect(()=>{
        const getUsers = async () => {
            const ulist = await api.getUsers();
            setUserList(ulist);
        }
        getUsers();
    }, []);


    const handleGerarDocumento = async () => {
        const classeImpressao = new Impressao(userList);
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake.createPdf(documento).open();
    }


    const handleAlterar = async () => {
        if(!logged){
            alert("Você não está logado!");
            return;
        }else{
            if(novoNome === '' && password === ''){
                alert("Informe os dados que serão alterados!");
                return;
              }

            
                const json = await api.editAction(nome, novoNome, password, status);    

                alert("As credeniais de "+nome+" foram alteradas com sucesso!");
                setNome('');
                setPassword('');
                setNovoNome('');
                setMostrarModal(false);
                window.location.reload("/listarOperador");
                return;

        }

    }

    const handleStatus = async (_id, status) => {

        var res=window.confirm("Realmente deseja alterar o status do Operador?");
        
        if(!logged){
            alert("Você não está logado!");
        }
        if(res){
            const json = await api.statusUser(_id, status);
            if(json.error){
                alert(JSON.stringify(json.error));
            }
            window.location.reload("/listarOperador");
        }else{
            return;
        }

    }

    const handlePosicao = (n) => {
        for(let i in userList){
            if(userList[i].name === n){
                return i;
            }
        }
    }

    const handleEditar = (index) => {
        setNome(userList[handlePosicao(index)].name);

    }

    const userFiltro = userList.filter((user)=> user.name.toLowerCase().includes(busca.toLocaleLowerCase()));
    

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
                <div className="content-wrapper">
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                        <div className="card card-primary mt-1">
                                            <div className="card-header">
                                                <h3 className="card-title">Lista de Usuarios</h3>
                                                
                                            </div>

                                            {/* /.card-header */}
                                            <div className="card-body"> 
                                                <div className="card">
                                                    <div className="card-body table-responsive pad d-flex flex-wrapper">
                                                        <div className="btn-group ">
                                                            <ExportCSV csvData={userList} fileName={fileName} />

                                                            <button type="button" className="btn btn-success" onClick={()=>{handleGerarDocumento()}}>
                                                                PDF
                                                            </button>
                                                            <div style={{ display: "none" }}>
                                                                <ComponentToPrint dadosParaImpressao={userList} ref={componentRef} />                                                    
                                                            </div>
                                                            <button type="button" className="btn btn-success" onClick={handlePrint}>Print</button>
                                                            
                                                                                            
                                                        </div>
                                                        
                                                        <div style={{marginLeft: 600}}>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text">
                                                                        <span className="fas fa-search" />
                                                                    </div>
                                                                    <input style={{wdith: 198}} type="text" className="form-control" value={busca} onChange={(e) => {setBusca(e.target.value)}}/>
                                                                </div>
                                                            </div>    
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <table id="example2" className="table table-bordered table-hover">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Nome</th>
                                                            <th>Permissão</th>
                                                            <th>Editar</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userFiltro.map(( item, index ) => {
                                                            return(
                                                                item.status === "Ativo" ?
                                                                <tr className="text-left" key={index}>
                                                                    <td>{item.name}</td>
                                                                    <td className="text-center">{item.eAdmin}</td>
                                                                    <td>
                                                                        <ul className="navbar-nav ml-auto text-center">
                                                                            <li data-toggle="modal" data-target="#modal-lg" onClick={() => {handleEditar(item.name)}} className="nav-item dropdown">
                                                                                <a className="nav-link">
                                                                                    <i className="fas fa-user-edit" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <ul className="navbar-nav ml-auto text-center">
                                                                            <li onClick={() => {handleStatus(item._id, "Inativo")}} className="nav-item dropdown">
                                                                                <a className="nav-link">
                                                                                    <i className="fas fa-user" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </td>  
                                                                </tr>                                                            
                                                                :
                                                                <tr className="text-left" key={index}>
                                                                    <td className="text-black-50">{item.name}</td>
                                                                    <td className="text-center text-black-50">{item.eAdmin}</td>
                                                                    <td>
                                                                        <ul className="navbar-nav ml-auto text-center">
                                                                            <li data-toggle="modal" data-target="#modal-lg" onClick={() => {handleEditar(item.name)}} className="nav-item dropdown">
                                                                                <a className="nav-link">
                                                                                    <i className="fas fa-user-edit" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <ul className="navbar-nav ml-auto text-center">
                                                                            <li onClick={() => {handleStatus(item._id, "Ativo")}} className="nav-item dropdown">
                                                                                <a className="nav-link">
                                                                                    <i className="fas fa-user-times" />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </td>  
                                                                </tr>
                                                                
                                                            );
                                                        })}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr className="text-center">
                                                            <th>Nome</th>
                                                            <th>Permissão</th>
                                                            <th>Editar</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                        <div className="modal fade" id="modal-lg">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Alterar dados do Usuário</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{display:"flex", flexWrap:"wrap"}}>
                                                <div className="ml-1">
                                                    {/* Nome do Produto */}
                                                    <label>Usuário:</label>
                                                    <div style={{backgroundColor: "#FFF", width: 400}} className="form-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <span className="fas fa-user" />
                                                            </div>
                                                            <input style={{wdith: 300}} type="text" className="form-control" value={nome} disabled />
                                                        </div>
                                                    </div>    
                                                </div>
                                                <div className="ml-1">
                                                    {/* Nome do Produto */}
                                                    <label>Novo Nome:</label>
                                                    <div style={{backgroundColor: "#FFF", width: 400}} className="form-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <span className="fas fa-user" />
                                                            </div>
                                                            <input style={{wdith: 300}} type="text" className="form-control" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
                                                        </div>
                                                    </div>    
                                                </div>
                                                <div className="ml-1">
                                                    {/* Nome do Produto */}
                                                    <label>Password:</label>
                                                    <br />
                                                    <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <span className="fas fa-key" />
                                                            </div>
                                                            <input style={{wdith: 300}} type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        </div>
                                                    </div>    
                                                </div>
                                                                                                                                                                    
                                            </div>
                                        </div>
                                            <div className="modal-footer justify-content-between">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                                                <button type="button" className="btn btn-primary" onClick={() => {handleAlterar()}}>Salvar</button>
                                            </div>
                                </div>
                                {/* /.modal-content */}
                            </div>
                        </div>    {/* /.modal-dialog */}
                    </section>
                    {/* /.content */}
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;