import React, { useState, useRef} from 'react'
import { BrowserRouter } from 'react-router-dom';
import useApi from '../../../helpers/AloneAPI';
import { isLogged, mudarTitulo } from '../../../helpers/AuthHandler';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';


const Page = () => {

    const api = useApi();
    const logged = isLogged();
    mudarTitulo("Gerar Estoque");
    const [codigoBarras, setCodigoBarras] = useState('');
    const [qtd, setQtd] = useState();
    const [qtdMinima, setQtdMinima] = useState();
    const [dataValidade, setDataValidade] = useState();
    const [produto, setProduto] = useState([]);
    const prodCopy = Array.from(produto);

    const codigoInput = useRef(0);

    const handleGerar = async () => {
        
        if(!logged){
            alert("Você não está logado!");
        }else{

            const json = await api.gerarEstoque(codigoBarras, dataValidade, qtd, qtdMinima, false);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                prodCopy.push(json);
                setProduto(prodCopy);
            }
            setCodigoBarras('');
            setDataValidade('');
            setQtd('');
            setQtdMinima('');
            
            codigoInput.current.focus();
        }
        
    }

    const handleLimpar = () => {
        setCodigoBarras('');
        setQtd('');
        setQtdMinima('');
        setDataValidade('');
    }

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <div style={{marginTop: 5, marginBottom: 5, marginLeft: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5, border:"1px solid #CCC", width: 1000, height: 560, backgroundColor: "#FFF"}}>
                    <div style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, width: 1000, height: 50, backgroundColor:'rgba(0, 123, 255)', display:"flex", alignItems:"center"}}>
                        <text style={{marginLeft: 20, fontSize: 20, color:"#FFF"}}>Inserir Estoque</text>
                    </div>
                    <div style={{padding: 30, marginLeft: 15, display:"flex", flexWrap:"wrap", backgroundColor:"#FFF"}}>
                        
                        <div>
                            {/* Nome do Produto */}
                            <label>Código de Barras:</label>
                            <div style={{backgroundColor: "#FFF", width: 190}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fab fa-product-hunt" />
                                    </div>
                                    <input ref={codigoInput} type="text" className="form-control" value={codigoBarras} onChange={(e) => {setCodigoBarras(e.target.value.replace(/\D/, ''))}} autoFocus /> 
                                </div>
                            </div>    
                        </div>
                        <div class="ml-5">                            
                                <label>Data de Validade:</label>
                                <div style={{backgroundColor: "#FFF", width: 190}} className="form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="far fa-calendar-alt" />
                                        </div>
                                        <input type="text"  className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask value={dataValidade} onKeyUp={(e) => {setDataValidade(e.target.value)}} />
                                    </div>
                                </div>
                                {/* /.input group */}                            
                        </div>
                        <div class="ml-5">
                            {/* Nome do Produto */}
                            <label>Quantidade:</label>                            
                            <div style={{width: 190, backgroundColor: "#FFF"}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-cubes" />
                                    </div>
                                    <input type="text" className="form-control" value={qtd} onChange={(e) => {setQtd(e.target.value.replace(/\D/, ''))}} />
                                </div>
                            </div>    
                        </div>
                        <div class="ml-5">
                            {/* Nome do Produto */}
                            <label>Estoque Mínimo:</label>                            
                            <div style={{width: 190, backgroundColor: "#FFF"}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-cubes" />
                                    </div>
                                    <input type="text" className="form-control" value={qtdMinima} onChange={(e) => {setQtdMinima(e.target.value.replace(/\D/, ''))}} />
                                </div>
                            </div>    
                        </div>

                        <div style={{width: 905, height: 250, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor:"#FFF", marginTop: 40, border:"1px solid #CCC", overflow:"auto"}}>
                            <table  style={{fontSize: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}} className="table table-bordered table-hover">                                        	
                                <thead>
                                    <tr class="text-center text-justify font-weight-bold bg-success">
                                        <th>Código</th>
                                        <th>Produto</th>
                                        <th>Fornecedor</th>
                                        <th>Fabricante</th>
                                        <th>Preço</th>
                                        <th>Valor de Estoque</th> 
                                        <th>Qtd</th>                                       
                                        <th>Qtd Mínima</th>
                                        <th>Data de Validade</th>
                                        <th>Peso/Volume</th>
                                        <th>Unidade de Medida</th>                                    
                                    </tr>
                                </thead>
                                {produto.map(( item ) => {
                                    return(				
                                        <tbody>
                                            <tr key={item} class="text-left">
                                                <td>{item.codigoDeBarras}</td>    
                                                <td>{item.name}</td>
                                                <td>{item.fornecedor}</td>
                                                <td>{item.fabricante}</td>                                                
                                                <td>{"R$ " + item.preco}</td>
                                                <td>{"R$ " + (parseFloat(item.preco) * item.qtd).toFixed(2)}</td>                                                
                                                <td>{item.qtd}</td>
                                                <td>{item.qtdMinima}</td>
                                                <td class="text-center">{item.dataValidade}</td>                                                
                                                <td class="text-center">{item.pesoVolume}</td>
                                                <td class="text-center">{item.unidadeDeMedida}</td>												
                                            </tr>
                                        </tbody>	
                                    );
                                })}		
                            </table>
                        </div>                                                       
                        
                        <div style={{marginTop: 270, marginLeft: -905}}>
                            <button type="button" class="btn btn-primary mt-5 mr-5" onClick={() => {handleGerar()}}>Inserir</button>
                            <button type="button" class="btn btn-primary mt-5 ml-5" onClick={() => {handleLimpar()}}>Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;