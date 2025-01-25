import React, { useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';
import useApi from '../../../helpers/AloneAPI';
import { mudarTitulo, isLogged } from '../../../helpers/AuthHandler';

const Page = () => {

    const api = useApi();
    const logged = isLogged();
    mudarTitulo("Cadastrar Operador");
  
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    
    const opcaoStatus = ["Ativo", "Inativo"];

    const handleCadastrar = async () => {
        
		if(nome === '' || password === '' || status === ''){
			alert("Todos campos devem ser preenchidos!");
            return;
		}
        if(!logged){
            alert("Você não está logado!");
        }else{

            const json = await api.register(nome, password, status, 1);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
                alert("Cadastro de "+nome+" feito com sucesso!");
                
            }

            setNome('');
            setPassword('');
            setStatus('');
        }

    }

    const handleLimpar = () => {
        setNome('');
        setPassword('');
        setStatus('');
    }

    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
                <div style={{marginTop: 5, marginBottom: 5, marginLeft: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5, border:"1px solid #CCC", width: 900, height: 520, backgroundColor: "#FFF"}}>
                    <div style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, width: 900, height: 50, backgroundColor:'rgba(0, 123, 255)', display:"flex", alignItems:"center"}}>
                        <text style={{marginLeft: 20, fontSize: 20, color:"#FFF"}}>Cadastrar Operador</text>
                    </div>
                    <div style={{padding: 30, marginLeft: 40, display:"flex", flexWrap:"wrap"}}>
                        
                        <div>
                            {/* Nome do Usuario */}
                            <label>Usuário:</label>
                            <div style={{backgroundColor: "#FFF", width: 300}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    <input style={{wdith: 300}} type="text" className="form-control" value={nome} onChange={(e)=>{setNome(e.target.value)}}/>
                                </div>
                            </div>    
                        </div>
                        <div className="ml-5">
                            {/* Senha */}
                            <label>Password:</label>
                            <br />
                            <div style={{width: 300, backgroundColor: "#FFF"}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-key" />
                                    </div>
                                    <input style={{wdith: 300}} type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>    
                        </div>
                                                                               
                        <div className="mt-3">
                            <label>Status:</label>
                            <div style={{width: 300}}>
                                <div className="form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-question-circle" />
                                        </div>
                                        <select className="form-control" style={{width: 300}} value={status} onChange={e=>{setStatus(e.target.value)}}>
                                            <option></option>
                                            {opcaoStatus.map((item, index) => {
                                                return(
                                                    <option key={index}>{item}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: 200, marginLeft: -300}}>
                            <button type="button" className="btn btn-primary mt-5 mr-5"  onClick={handleCadastrar}>Cadastrar</button>
                            <button type="button" className="btn btn-primary mt-5 ml-5"  onClick={handleLimpar}>Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;