import React, { useState, useRef, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';
import useApi from '../../../helpers/AloneAPI';
import {mudarTitulo, isLogged} from '../../../helpers/AuthHandler';

import {ExportCSV} from './ExportCSV';
import { ExportToQRCode } from './QRCode';
import { ExportItemToQRCode } from './ItemQRCode';
import { ComponentToPrint } from './ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './Impressao';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const Page = () => {

    let api = useApi();
    let logged = isLogged();
    mudarTitulo("Listar Estoque");    

    const [estoqueLista, setEstoqueLista] = useState([]);        
    const [id, setId] = useState('');    
    const [produto, setProduto] = useState('');
    const [qtdMinima, setQtdMinima] = useState('');       
    const [qtd, setQtd] = useState('');
    const [dataDeValidade, setDataDeValidade] = useState('');                
    const [busca, setBusca] = useState(''); 
    const stokCopy = Array.from(estoqueLista);  
    const [iteim, setIteim] = useState([]);
    const array = [];
    const [altProdVencido, setAltProdVencido] = useState(false);
    
    const fileName = "ListarEstoque";
    const componentRef = useRef(null);        
    const componentQRCodeRef = useRef(null);
    const componentRefImprimir = useRef(null);
    
    const handleQRDCodeLista = useReactToPrint({        
        content: () => componentRef.current,        
    });

    const handleImprimir = useReactToPrint({        
        content: () => componentRefImprimir.current,        
    });
         
    const handleQRCode = useReactToPrint({        
        content: () => componentQRCodeRef.current,                        
    }); 

    const handleSetItem = (item) => {         
        for(let i=0; i < item.qtd; i++){
            array.push(item);
        }        
        setIteim([]);   
        setIteim(array);      
        handleQRCode();   
    }   
    
    const handleSetArrayIteim = () => {                     
        for(let j=0; j < estoqueLista.length; j++){
            for(let i=0; i < estoqueLista[j].qtd; i++){
                array.push(estoqueLista[j])                  
            }                                     
        }      
        setIteim(array); 
        handleQRDCodeLista();
    }            

    useEffect(()=>{
        
        const getListEstoque = async () => {
            const estoque = await api.getListaEstoque();
            setEstoqueLista(estoque);
        }                        
        getListEstoque();                        
    }, []);
    
    const handleGerarDocumento = async () => {
        const classeImpressao = new Impressao(estoqueLista);
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake.createPdf(documento).open();
    }

    const handleAlterar = async () => {
        
        if(!logged){
            alert("Você não está logado!");
        }
        if(qtd === estoqueLista[handlePosicao(id)].qtd &&
           dataDeValidade === estoqueLista[handlePosicao(id)].dataValidade &&
           qtdMinima === estoqueLista[handlePosicao(id)].qtdMinima)
           {
                alert("Ao menos um campo precisa ser alterado antes de ser enviado!");
           }    
        else{
        
            const json = await api.editEstoque(id, dataDeValidade, qtd, qtdMinima);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                alert("O estoque foi alterado com sucesso!");
                
            }

            setId('');            
            setQtd('');
            setQtdMinima('');
            setDataDeValidade(''); 
            setProduto('');          
            window.location.reload("/estoqueLista");
        }

    }


    const handlePosicao = (n) => {
        for(let i in estoqueLista){
            if(estoqueLista[i]._id === n){
                return i;
            }
        }
    }

    const handleEditar = (index) => {
        setId(estoqueLista[handlePosicao(index)]._id);        
        setQtd(estoqueLista[handlePosicao(index)].qtd);
        setQtdMinima(estoqueLista[handlePosicao(index)].qtdMinima);
        setProduto(estoqueLista[handlePosicao(index)].name);
        setDataDeValidade(estoqueLista[handlePosicao(index)].dataValidade);        
    }
    
    const estoqueFiltro = estoqueLista.filter((estok)=> estok.name.toLowerCase().includes(busca.toLowerCase()) || 
    estok.dataValidade.includes(busca) ||
    estok.dataCadastro.includes(busca) ||
    estok.fabricante.toLowerCase().includes(busca.toLowerCase()) ||
    estok.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
    estok.unidadeDeMedida.includes(busca) ||
    estok.codigoDeBarras.includes(busca));        

    const handleCrescente = () => {        
        stokCopy.sort(function(a, b) {
            let data1 = a.dataValidade.split("/"),
                data2 = b.dataValidade.split("/");
            let x = (data1[2] + "/" + data1[1] + "/" + data1[0]),
                y = (data2[2] + "/" + data2[1] + "/" + data2[0]);
            if(Date.parse(x) < Date.parse(y)){
                return 1;
            }
        });           
        setEstoqueLista([]);        
        setEstoqueLista(stokCopy);
    };
   
    const handleDecrescente = () => {
        stokCopy.sort(function(a, b) {
            let data1 = a.dataValidade.split("/"),
                data2 = b.dataValidade.split("/");
            let x = (data1[2] + "/" + data1[1] + "/" + data1[0]),
                y = (data2[2] + "/" + data2[1] + "/" + data2[0]);
            if(Date.parse(x) > Date.parse(y)){
                return 1;
            }
        });           
        setEstoqueLista([]);        
        setEstoqueLista(stokCopy);  
    };

    const handleAltProdVencido = async (id) => { 

        var res=window.confirm("Realmente deseja vender esse produto?");

        if(res){
            await api.altProdVencidos(2, false, id);            
            window.location.reload("/estoqueLista");
        }else{
            return;
        }       
    }

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <div class="content-wrapper">
                    {/* Main content */}
                    <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-12">
                            <div className="card card-primary mt-1">
                                <div className="card-header">
                                    <h3 className="card-title">Listar Estoque</h3>
                                    
                                </div>

                                {/* /.card-header */}
                                <div className="card-body"> 
                                    <div class="card">
                                        <div className="card-body table-responsive pad d-flex flex-wrapper">
                                            <div className="btn-group ">
                                                <ExportCSV csvData={estoqueLista} fileName={fileName} />

                                                <button type="button" className="btn btn-success" onClick={()=>{handleGerarDocumento()}}>
                                                    PDF
                                                </button>
                                                <div style={{ display: "none" }}>
                                                    <ComponentToPrint dadosParaImpressao={estoqueLista} ref={componentRefImprimir} />                                                    
                                                </div>
                                                <button type="button" className="btn btn-success" onClick={handleImprimir}>Print</button>                                                 

                                                <div style={{ display: "none" }}>
                                                    <ExportToQRCode dadosParaQRCode={iteim} ref={componentRef} />                                                    
                                                </div>
                                                <button type="button" className="btn btn-success" onClick={() => {handleSetArrayIteim()}}>QRCode</button>                                                                                                                             
                                            </div>
                                            
                                            <div style={{marginLeft: 465}}>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-search" />  
                                                        </div>
                                                        <input style={{wdith: 198}} type="text" className="form-control" onChange={(e) => {setBusca(e.target.value)}}/>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <table style={{fontSize: 10}} className="table table-bordered table-hover">
                                        <thead>
                                            <tr class="text-center">  
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>Fornecedor</th>
                                                <th>Fabricante</th>
                                                <th>Qtd.</th>
                                                <th>Qtd. Minima</th>
                                                <th>Preço</th>
                                                <th>Valor Estoque</th>
                                                <th>Cadastro</th>
                                                <th class="text-left">                                                                                                        
                                                    <ul className="d-flex flex-row navbar-nav">                   
                                                        <label className="mt-4 mr-2">Validade</label>                                       
                                                        <li onClick={() => {handleCrescente()}} className="nav-item dropdown">                                                                                                                    
                                                            <a className="nav-link mt-3">
                                                                <i className="fas fa-sort-amount-up" />
                                                            </a>
                                                        </li>                                                    
                                                        <li onClick={() => {handleDecrescente()}} className="nav-item dropdown">                                                            
                                                            <a className="nav-link ml-2 mt-3">
                                                                <i className="fas fa-sort-amount-down-alt" />
                                                            </a>
                                                        </li>
                                                    </ul>                                                    
                                                </th>
                                                <th>Peso/Volume</th>                                            
                                                <th>Editar</th>
                                                <th>QRCode</th>
                                                <th>Vencidos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {estoqueFiltro.map(( item, index ) => {
                                                return(      
                                                                                                  
                                                    <tr className="text-left" key={index}>                                                        
                                                        <td>{item.codigoDeBarras}</td>    
                                                        <td>{item.name}</td>
                                                        <td>{item.fornecedor}</td>
                                                        <td>{item.fabricante}</td>
                                                        <td class="text-center">{item.qtd}</td>
                                                        <td class="text-center">{item.qtdMinima}</td>
                                                        <td>{"R$ " + item.preco}</td>
                                                        <td>{"R$ " + (parseFloat(item.preco) * item.qtd).toFixed(2)}</td>                                                        
                                                        <td class="text-center">{item.dataCadastro}</td>
                                                        <td class="text-center">{item.dataValidade}</td>
                                                        <td class="text-center">{item.pesoVolume}</td>                                                        
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">
                                                                <li data-toggle="modal" data-target="#modal-xl"  onClick={() => {handleEditar(item._id)}} className="nav-item dropdown">
                                                                    <a className="nav-link">
                                                                        <i className="far fa-edit" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>    
                                                        <td>
                                                            <ul className="navbar-nav ml-auto text-center">                                                                
                                                                <li className="nav-item dropdown">                                                                                                                                      
                                                                    <a className="nav-link">                                                                                                                                                                                                                     
                                                                        <i onClick={() => {handleSetItem(item)}} className="fas fa-qrcode" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>           
                                                        {item.vencido ? 
                                                            <td>
                                                                <ul className="navbar-nav ml-auto text-center">                                                                
                                                                    <li className="nav-item dropdown">                                                                                                                                      
                                                                        <a className="nav-link">                                                                                                                                                                                                                     
                                                                            <i onClick={() => {handleAltProdVencido(item._id)}} className="fas fa-exclamation-triangle" />
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </td>   

                                                            :

                                                            null
                                                        }                                     
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
                                                <th>Qtd.</th>
                                                <th>Qtd. Minima</th>
                                                <th>Preço</th>
                                                <th>Valor Estoque</th>
                                                <th>Cadastro</th>
                                                <th>Validade</th>
                                                <th>Peso/Volume</th>                                                
                                                <th>Editar</th>
                                                <th>QRCode</th>
                                                <th>Vencidos</th>
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
                                        <h4 className="modal-title">Alterar valores de estoque</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                                            <div >
                                                {/* Nome do Produto */}
                                                <label>Produto:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fab fa-product-hunt" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Codigo" value={produto} disabled />
                                                    </div>
                                                </div>    
                                            </div>
                                            <div class="ml-5">                            
                                                <label>Nova Validade:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="far fa-calendar-alt" />
                                                        </div>
                                                        <input type="text"  className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask value={dataDeValidade} onKeyUp={(e) => {setDataDeValidade(e.target.value)}} />
                                                    </div>
                                                </div>
                                                {/* /.input group */}                            
                                            </div>
                                            <div class="ml-5">
                                                {/* Fornecedor */}
                                                <label>Nova Quantidade:</label>
                                                <div style={{width: 190}} className="form-group mb-1">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-shipping-fast" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Qtd" value={qtd} onChange={(e) => {setQtd(e.target.value.replace(/\D/, ''))}} />
                                                    </div>
                                                </div>
                                            </div>
                                    
                                            <div class="ml-5">
                                                {/* Fabricante */}
                                                <label>Novo Estoque Mínimo:</label>
                                                <div style={{width: 190}} className="form-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-building" />
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Qtd Mínima" value={qtdMinima} onChange={(e) => {setQtdMinima(e.target.value.replace(/\D/, ''))}} />
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
                    <div style={{ display: "none" }}>
                        <ExportItemToQRCode itemsParaQRCode={iteim} ref={componentQRCodeRef} />
                    </div> 
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;