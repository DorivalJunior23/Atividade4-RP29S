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

const Page = () => {
    
    let api = useApi();
    let logged = isLogged();
    mudarTitulo("Listar Produtos");

    const componentRef = useRef(0);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const fileName = "ListaDeProdutos";

    const [produtoList, setProdutoList] = useState([]);
    const [listaMedidas, setListaMedidas] = useState([]);
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novoPreco, setNovoPreco] = useState('');
    const [novoValorVenda, setNovoValorVenda] = useState('')
    const [uniMedida, setUniMedida] = useState('');
    const [novoPesoVolume, setNovoPesoVolume] = useState('');
    const [novoFabricante, setNovoFabricante] = useState('');
    const [novoFornecedor, setNovoFornecedor] = useState('');
    const [busca, setBusca] = useState('');
   
    useEffect(()=>{
        const getListProduto = async () => {
            const plist = await api.getListProduto();
            setProdutoList(plist);
        }
        const getMedidas = async () => {
            const ulist = await api.getMedidas();
            setListaMedidas(ulist);
        }
        const listFornecedor = async () => {
            const fList = await api.listarTodosFornecedores();            
            setListaFornecedores(fList.filter((forn) => forn.status.includes("Ativo")));
        }
        getMedidas();
        getListProduto();
        listFornecedor();
    }, []);

    const handleGerarDocumento = async () => {
        const classeImpressao = new Impressao(produtoList);
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake.createPdf(documento).open();
    }

    const handleAlterar = async () => {
        
        if(!logged){
            alert("Você não está logado!");
        }
        if( 
            novoNome === produtoList[handlePosicao(codigo)].name && 
            novoPreco === produtoList[handlePosicao(codigo)].preco && 
            novoValorVenda === produtoList[handlePosicao(codigo)].valorVenda &&
            uniMedida === produtoList[handlePosicao(codigo)].unidadeDeMedida &&
            novoPesoVolume === produtoList[handlePosicao(codigo)].pesoVolume &&
            novoFabricante === produtoList[handlePosicao(codigo)].fabricante &&
            novoFornecedor === produtoList[handlePosicao(codigo)].fornecedor){
            alert("Ao menos um campo precisa ser alterado antes de ser enviado!");
            return;
        }    

        if(!novoNome || !novoPreco || !novoValorVenda || !uniMedida || !novoPesoVolume || !novoFabricante || !novoFornecedor){
            alert("Os campos não podem ser alterados em branco!");
            return;
        }
        else{
        
            const json = await api.editProdAction(codigo, novoNome, novoPreco, novoValorVenda, uniMedida, novoPesoVolume, novoFabricante, novoFornecedor);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                alert("Os dados do produto foram alteradas com sucesso!");
                
            }

            setCodigo('');
            setNovoNome('');
            setNovoPreco('');
            setNovoValorVenda('');
            setUniMedida('');
            setNovoPesoVolume('');
            setNovoFabricante('');
            setNovoFornecedor('');
            window.location.reload("/listarProdutos");
        }

    }

    const handlePosicao = (n) => {
        for(let i in produtoList){
            if(produtoList[i].codigoDeBarras === n){
                return i;
            }
        }
    }

    const handleEditar = (index) => {
        setCodigo(produtoList[handlePosicao(index)].codigoDeBarras);
        setNovoNome(produtoList[handlePosicao(index)].name);
        setNovoPreco(produtoList[handlePosicao(index)].preco);
        setNovoValorVenda(produtoList[handlePosicao(index)].valorVenda);
        setUniMedida(produtoList[handlePosicao(index)].unidadeDeMedida);
        setNovoPesoVolume(produtoList[handlePosicao(index)].pesoVolume);
        setNovoFabricante(produtoList[handlePosicao(index)].fabricante);
        setNovoFornecedor(produtoList[handlePosicao(index)].fornecedor);

    }

    const handleStatus = async (codigoProd, status) => {
        
        var res=window.confirm("Realmente deseja alterar o status deste produto?");

        if(!logged){
            alert("Você não está logado!");
        }
        if(res){
            const json = await api.prodStatus(codigoProd, status);
            if(json.error){
                alert(JSON.stringify(json.error));
            }
            setCodigo('');
            window.location.reload("/listarProdutos");
        }else{
            return;
        }

    }
    

    const produtoFiltro = produtoList.filter((prod)=> prod.name.toLowerCase().includes(busca.toLowerCase()) || 
    prod.dataCadastro.toLowerCase().includes(busca.toLowerCase()) ||
    prod.fabricante.toLowerCase().includes(busca.toLowerCase()) ||
    prod.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
    prod.unidadeDeMedida.toLowerCase().includes(busca.toLowerCase()) ||
    prod.codigoDeBarras.includes(busca));

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
                                    <h3 className="card-title">Listar Produtos</h3>
                                    
                                </div>

                                {/* /.card-header */}
                                <div className="card-body"> 
                                    <div className="card">
                                        <div className="card-body table-responsive pad d-flex flex-wrapper">
                                            <div className="btn-group ">
                                                <ExportCSV csvData={produtoList} fileName={fileName} />

                                                <button type="button" className="btn btn-success" onClick={()=>{handleGerarDocumento()}}>
                                                    PDF
                                                </button>
                                                <div style={{ display: "none" }}>
                                                    <ComponentToPrint dadosParaImpressao={produtoList} ref={componentRef} />                                                    
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
                                    <table style={{fontSize: 14}} className="table table-bordered table-hover">                                    
                                        <thead>
                                            <tr class="text-center">
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Fornecedor</th>
                                                <th>Fabricante</th>
                                                <th>Preço</th>
                                                <th>Venda</th>
                                                <th>Data de Cadastro</th>
                                                <th>Peso/Volume</th>
                                                <th>Unidade de Medida</th>
                                                <th>Alterar</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produtoFiltro.map(( item ) => {
                                                return(
                                                    item.status === 'Ativo' ? 
                                                    <tr className="text-left" key={item}>
                                                        <td>{item.codigoDeBarras}</td>    
                                                        <td>{item.name}</td>
                                                        <td>{item.fornecedor}</td>
                                                        <td>{item.fabricante}</td>
                                                        <td>{"R$ " + item.preco}</td>
                                                        <td>{"R$ " + item.valorVenda}</td>
                                                        <td className="text-center">{item.dataCadastro}</td>
                                                        <td className="text-center">{item.pesoVolume}</td>
                                                        <td className="text-center">{item.unidadeDeMedida}</td>
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li data-toggle="modal" data-target="#modal-xl"  onClick={() => {handleEditar(item.codigoDeBarras)}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="far fa-edit" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li onClick={() => {handleStatus(item.codigoDeBarras, "Inativo")}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="fas fa-toggle-on" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>  
                                                    </tr>
                                                    :
                                                    <tr key={item}>
                                                        <td className="text-black-50">{item.codigoDeBarras}</td>    
                                                        <td className="text-black-50">{item.name}</td>
                                                        <td className="text-black-50">{item.fornecedor}</td>
                                                        <td className="text-black-50">{item.fabricante}</td>
                                                        <td className="text-black-50">{"R$ " + item.preco}</td>
                                                        <td className="text-black-50">{"R$ " + item.valorVenda}</td>
                                                        <td className="text-black-50 text-center">{item.dataCadastro}</td>
                                                        <td className="text-black-50 text-center">{item.pesoVolume}</td>
                                                        <td className="text-black-50 text-center">{item.unidadeDeMedida}</td>
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li data-toggle="modal" data-target="#modal-xl"  onClick={() => {handleEditar(item.codigoDeBarras)}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="far fa-edit" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li onClick={() => {handleStatus(item.codigoDeBarras, "Ativo")}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="fas fa-toggle-off" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>  
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr class="text-center">
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Fornecedor</th>
                                                <th>Fabricante</th>
                                                <th>Preço</th>
                                                <th>Venda</th>
                                                <th>Data de Cadastro</th>
                                                <th>Peso/Volume</th>
                                                <th>Unidade de Medida</th>
                                                <th>Alterar</th>
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
                        <div className="modal fade" id="modal-xl">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Alterar dados do Produto</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                                            <div >
                                                {/* Nome do Produto */}
                                                <label>Código do Produto:</label>
                                                <div style={{backgroundColor: "#FFF", width: 400}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fab fa-product-hunt" />
                                                        </div>
                                                        <input style={{wdith: 300}} type="text" className="form-control" placeholder="Codigo" value={codigo} disabled />
                                                    </div>
                                                </div>    
                                            </div>
                                            <div className="ml-5">
                                                {/* Nome do Produto */}
                                                <label>Nome do Produto:</label>
                                                <br />
                                                <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fab fa-product-hunt" />
                                                        </div>
                                                        <input style={{wdith: 300}} type="text" className="form-control" placeholder="Produto" value={novoNome} onChange={(e)=>{setNovoNome(e.target.value)}}/>
                                                    </div>
                                                </div>    
                                            </div>
                                            <div className="mt-2">
                                                {/*Lista de Unidade de Medidas*/}
                                                <label>Fornecedor:</label>
                                                <div style={{width: 400}} className="col-md-5">
                                                    <div className="form-group" style={{marginLeft: -8, width: 400}}>
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <span className="fas fa-shipping-fast" />
                                                            </div>
                                                            <select className="form-control" value={novoFornecedor} onChange={e=>{setNovoFornecedor(e.target.value)}}>
                                                                {listaFornecedores.map((item, index) => {
                                                                    return(
                                                                        <option key={index}>{item.name}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    
                                            <div className="ml-5 mt-2">
                                                {/* Fabricante */}
                                                <label>Fabricante:</label>
                                                <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-building" />
                                                        </div>
                                                        <input style={{wdith: 300}} type="text" className="form-control" placeholder="fabricante" value={novoFabricante} onChange={(e)=>{setNovoFabricante(e.target.value)}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mr-5">
                                                {/*Preço do Produto*/}
                                                <label>Valor Compra:</label>
                                                <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group mb-1">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-dollar-sign" />
                                                        </div>
                                                        <input type="text" style={{width: 125}} className="form-control" value={novoPreco} onChange={(e)=>{setNovoPreco(e.target.value
                                                            .replace(/\D/g, '')
                                                            .replace(/(\d{1,2})$/, ',$1')
                                                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mr-5">
                                            {/*Peso ou Volume*/}
                                            <label>Valor da Venda:</label>
                                                <div style={{width: 250, backgroundColor: "#FFF"}} className="form-group mb-1">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-dollar-sign" />
                                                        </div>
                                                        <input type="text" style={{width: 125}} className="form-control" value={novoValorVenda} onChange={(e)=>{setNovoValorVenda(e.target.value
                                                            .replace(/\D/g, '')
                                                            .replace(/(\d{1,2})$/, ',$1')
                                                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 mr-5">
                                                {/*Peso ou Volume*/}
                                                <label>Peso/Volume:</label>
                                                <div style={{width: 400, backgroundColor: "#FFF"}} className="form-group mb-1">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-weight-hanging" />
                                                        </div>
                                                        <input type="text" style={{width: 118}} className="form-control" value={novoPesoVolume} onChange={(e)=>{setNovoPesoVolume(e.target.value.replace(/\D/, ''))}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                {/*Lista de Unidade de Medidas*/}
                                                <label>Unidade de Medidas:</label>
                                                <div style={{width: 400}} className="col-md-5">
                                                    <div className="form-group" style={{marginLeft: -8}}>
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <span className="fas fa-ruler-vertical" />
                                                            </div>
                                                            <select className="form-control" style={{width: 300}} value={uniMedida} onChange={e=>{setUniMedida(e.target.value)}}>
                                                                {listaMedidas.map((item, index) => {
                                                                    return(
                                                                        <option key={index}>{item.name}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
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
                            {/* /.modal-dialog */}
                        </div>
                    </section>
                    {/* /.content */}
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;