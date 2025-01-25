import React, { useState, useEffect, useRef} from 'react';
import { BrowserRouter } from 'react-router-dom';
import useApi from '../../helpers/AloneAPI';
import { mudarTitulo } from '../../helpers/AuthHandler';

import './style.css';


const Page = () => {
    
    const api = useApi();
    const codigoInput = useRef(0);
    mudarTitulo("Venda");

    const [display, setDisplay] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [produto, setProduto] = useState([]);
    const [total, setTotal] = useState();
    const [operador, setOperador] = useState('');
    const prodCopy = Array.from(produto);

    const calcularData = (dataNew) => {
        let dataNova = dataNew.split("/");
        let data = new Date(dataNova[2] + "/" + dataNova[1] + "/" + dataNova[0]);   
        let dataAtual = new Date();            
        let diferenca = Date.parse(dataConverter(data)) - Date.parse(dataConverter(dataAtual));            
        let days = diferenca/(1000* 3600 * 24);                    
        return days;        
    }

    const dataConverter = (data) =>{
        return data.getFullYear() + "/" + String(data.getMonth()).padStart(2, '0') + "/" + String(data.getDate()).padStart(2, '0');
    }


    useEffect(()=>{
        
        const getItem = async (e) => {
            if(codigo === 'F1'){
                window.location.href = '/homeOperador';
            }
            if(codigo !== ''){
                let dadosProd = codigo.split(" ");                
                const json = await api.getItemEstoque(dadosProd[0], dadosProd[1]);
                
                if(json.error){
                    alert(JSON.stringify(json.error));
                    setCodigo('');
                } 
                if(json.vencido){
                    alert("PRODUTO FORA DA VALIDADE!");    
                    setCodigo('');
                }
                else{
                    
                    for(let index in produto){
                        if(dadosProd[0] === produto[index].codigoDeBarras) {
                            produto[index].qtd = produto[index].qtd + 1;
                            produto[index].subTotal = (produto[index].qtd * produto[index].preco).toFixed(2);
                            setCodigo('');
                            return;
                        } 
                    }
                
                    prodCopy.push({ 
                        codigoDeBarras: json.codigoDeBarras,
                        name: json.name,
                        qtd: +1,
                        preco: parseFloat(json.valorVenda),
                        pesoVolume: json.pesoVolume,
                        unidadeDeMedida: json.unidadeDeMedida,
                        subTotal: parseFloat(json.valorVenda)
                    });
                    setProduto(prodCopy);
                    setCodigo('');
                }
            }
            
            handleTotal();
            
        }

        const getOperador = async () => {
            const json = await api.getUser();

            if(json.error){
                alert(JSON.stringify(json.error));
            } 
            else{
                setOperador(json);
            }
        }
    
        getOperador();
        getItem(); 

    }, [codigo]);

    const handleCancelar = async (index) => {
        
        if(produto[index].qtd > 1){ 
            produto[index].qtd = produto[index].qtd - 1;
            produto[index].subTotal = (produto[index].qtd * produto[index].preco).toFixed(2);
            handleTotal();
            codigoInput.current.focus();
            return;
        }
        if(produto[index].qtd === 1){
            produto.splice(index, 1);
            handleTotal();
            codigoInput.current.focus();
            return;
        }
    }

    const handleTotal = async () => {
        var soma = 0;
        for(let i in produto){
            soma = (soma + (produto[i].qtd * produto[i].preco));
        }
        setTotal(soma.toFixed(2));
    }

    const handleFocus = () => {
        codigoInput.current.focus();
    }

    const handleClick = (e) =>{
        if(e.key === 'F11'){
            !display ? setDisplay(true) : setDisplay(false);
        }
        if(e.key === 'F1'){
            window.location.href = '/homeOperador';
        }
    }

    
    return(
        <BrowserRouter>
            {!display ? 
                <div style={{display:"flex", height: 640, justifyContent:"center", alignItems:"center", position:"absolute", backgroundColor: "rgba(244, 246, 249)"}} className="desabilitarCursor" onClick={()=> {handleFocus()}}>               
                
                <div style={{width: 300, height: 620}} className="d-flex justify-content-center align-items-center  flex-wrap">
                    <input style={{marginLeft: 7, padding: 10, width: 290, height: 80, fontSize: 35}} value={"Total R$ " + total} disabled class="disabled desabilitarCursor font-weight-bold" onChange={(t)=>{setTotal(t.target.value)}} />
                    <input ref={codigoInput} value={codigo} className="focus" autoFocus onChange={(e) => {setCodigo(e.target.value)}} onKeyDown={handleClick} />
                    <button style={{marginLeft: 7, width: 290, height: 80, fontSize: 35}} data-toggle="modal" data-target="#modal-default"
                    type="submit" className="btn btn-block btn-success font-weight-bold habilitarCursor" onClick={handleClick}>Pagar</button>
                </div>

                    
                <div style={{marginLeft: 10, width: 1049, height: 620, border:"1px solid #CCC"}} class="mt-1">                                             
                    <table style={{fontSize: 16}} className="table table-bordered table-hover bg-default">
                        <thead>
                            <tr class="text-center">
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Peso/Volume</th>
                                <th>UN</th>
                                <th class="bg-success">Qtd</th>                                                
                                <th>Preço</th>                                                                                
                                <th>Subtotal</th>
                                <th>Cancelar</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor:"#FFF"}}>
                            {produto.map(( item, index ) => {
                                return(                                        
                                    <tr className="text-left" key={index}>
                                        <td>{item.codigoDeBarras}</td>    
                                        <td>{item.name}</td>   
                                        <td class="text-center">{item.pesoVolume}</td>
                                        <td class="text-center">{item.unidadeDeMedida}</td>                                                    
                                        <td class="text-center">{item.qtd}</td>
                                        <td>{"R$ " + item.preco}</td>                                                                                                                                                        
                                        <td>{"R$ " + item.subTotal}</td>
                                        <td class="text-center">
                                            <button style={{marginLeft: 7, width: 40, height: 40, backgroundColor:"#F00", color:"#FFF"}} className="font-weight-bold justify-contend-center habilitarCursor" onClick={() => {handleCancelar(index)}}>X</button>
                                        </td>                                                    
                                    </tr>                                                      
                                );
                            })}
                        </tbody>                                                                                                   
                    </table>
                </div>
                <div class="modal fade" id="modal-default">
                    <div class="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Pagamento</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>                                    
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>
                                    
                            
                        
                {/* /.container-fluid */}
                <div className="modal fade" id="modal-xl">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Pagamento</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                                    
                                    
                                    
                            
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                                    
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>
                        
            </div>      
                           
            :
            
            <div style={{display:"flex", height: 766, width: 1366, justifyContent:"center", alignItems:"center", position:"absolute", backgroundColor: "rgba(244, 246, 249)"}} className="desabilitarCursor" onClick={()=> {handleFocus()}}>               
                
                <div style={{width: 300, height: 620}} className="d-flex justify-content-center align-items-center  flex-wrap">
                    <input style={{marginLeft: 7, padding: 10, width: 290, height: 80, fontSize: 35}} value={"Total R$ " + total} disabled class="disabled desabilitarCursor font-weight-bold" onChange={(t)=>{setTotal(t.target.value)}} />
                    <input ref={codigoInput} value={codigo} className="focus" autoFocus onChange={(e) => {setCodigo(e.target.value)}} onKeyDown={handleClick} />
                    <button type="button" style={{marginLeft: 7, width: 290, height: 80, fontSize: 35}} data-toggle="modal" data-target="#modal-default" className="btn btn-success font-weight-bold habilitarCursor" onClick={handleClick}>Pagar</button>
                </div>

                    
                <div style={{marginLeft: 10, width: 1049, height: 760, border:"1px solid #CCC"}} class="mt-1">                                             
                    <table style={{fontSize: 18}} className="table table-bordered table-hover bg-default">
                        <thead>
                            <tr class="text-center">
                                <th>Código</th>
                                <th>Produto</th>
                                <th>Peso/Volume</th>
                                <th>UN</th>
                                <th class="bg-success">Quantidade</th>                                                
                                <th>Preço</th>                                                                                
                                <th>Subtotal</th>
                                <th>Cancelar</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor:"#FFF"}}>
                            {produto.map(( item, index ) => {
                                return(                                        
                                    <tr className="text-left" key={index}>
                                        <td>{item.codigoDeBarras}</td>    
                                        <td>{item.name}</td>   
                                        <td class="text-center">{item.pesoVolume}</td>
                                        <td class="text-center">{item.unidadeDeMedida}</td>                                                    
                                        <td class="text-center">{item.qtd}</td>
                                        <td>{"R$ " + item.preco}</td>                                                                                                                                                        
                                        <td>{"R$ " + item.subTotal}</td>
                                        <td class="text-center">
                                            <button style={{marginLeft: 7, marginTop: -8, width: 40, height: 40, backgroundColor:"#F00", color:"#FFF", fontSize: 20}} className="font-weight-bold justify-contend-center habilitarCursor" onClick={() => {handleCancelar(index)}}>X</button>
                                        </td>                                                    
                                    </tr>                                                      
                                );
                            })}
                        </tbody>                                                                                                   
                    </table>
                </div>
                                    
                            
                        
                {/* /.container-fluid */}
                <div class="modal fade" id="modal-default">
                    <div class="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Alterar valores de estoque</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>                                    
                        </div>
                        {/* /.modal-content */}
                    </div>
                    {/* /.modal-dialog */}
                </div>
                        
            </div>                     

            } 
                   
        </BrowserRouter>
    );
}

export default Page;