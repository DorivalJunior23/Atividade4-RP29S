import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import useApi from '../../../helpers/AloneAPI';
import { isLogged, mudarTitulo, validarCPF, validarCNPJ } from '../../../helpers/AuthHandler';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import Footer from '../../../components/Footer';


const Page = () => {

    const api = useApi();
    const logged = isLogged();
    mudarTitulo("Cadastrar Fornecedor");


    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [status, setStatus] = useState('');
    const [pessoaFisica, setPessoaFisica] = useState(false);
    const [pessoaJuridica, setPessoaJuridica] = useState(false);
    const [disableCnpj, setDisableCnpj] = useState(false);
    const [disableCpf, setDisableCpf] = useState(false);

    const opcaoStatus = ["Ativo", "Inativo"];    

    const handleCadastrar = async () => {         
        
        if(disableCpf){
            let cnpjCheck = false, 
                foneCheck = false,
                cepCheck = false,
                razaoSocialCheck = false,
                bairroCheck = false,
                statusCheck = false;

            if(cnpj.length < 18){ 
                cnpjCheck = true;
            }

            if(!validarCNPJ(cnpj)){
                alert("Os números informados não correspondem a um CNPJ válido. \nInforme um CNPJ válido.");
                return;
            }

            if(telefone.length < 14){
                foneCheck = true;
            }
            if(cep.length < 9){
                cepCheck = true;
            }
            if(!razaoSocial){
                razaoSocialCheck = true;
            }
            if(!bairro){
                bairroCheck = true;
            }
            if(!status){
                statusCheck = true;
            }
            if(cnpjCheck || foneCheck || cepCheck || razaoSocialCheck || bairroCheck || statusCheck){
                alert((cnpjCheck ? "CNPJ Inválido. Faltando: " + (18 - cnpj.length)+" dígito!" : '')
                +(foneCheck ? "\nTelefone inválido. Faltando: " + (14 - telefone.length)+" dígito!" : '')
                +(cepCheck ? "\nCEP Inválido. Faltando: " + (9 - cep.length)+" dígito!" : '')
                +(razaoSocialCheck ? "\nInforme a Razao Social!" : '')
                +(bairroCheck ? "\nInforme o Bairro!" : '')
                +(statusCheck ? "\nInforme o Status do Fornecedor!" : ''));  
                return;
         
            }                     
        } 



        if(disableCnpj){
            let cpfCheck = false, 
                foneCheck = false,
                cepCheck = false,
                razaoSocialCheck = false,
                bairroCheck = false,
                statusCheck = false;

            if(cpf.length < 14){
                cpfCheck = true;
            }

            if(!validarCPF(cpf)){
                alert("Os números informados não correspondem a um CPF válido. \nInforme um CPF válido.");
                return;
            }
            
            if(telefone.length < 14){
                foneCheck = true;
            }
            if(cep.length < 9){
                cepCheck = true;
            }   
            if(!razaoSocial){
                razaoSocialCheck = true;
            }
            if(!bairro){
                bairroCheck = true;
            }
            if(!status){
                statusCheck = true;
            }
            if(cpfCheck || foneCheck || cepCheck || razaoSocialCheck || bairroCheck || statusCheck){
                alert((cpfCheck ? "CPF Inválido. Faltando: " + (14 - cpf.length)+" dígito!" : '')
                +(foneCheck ? "\nTelefone inválido. Faltando: " + (14 - telefone.length)+" dígito!" : '')
                +(cepCheck ? "\nCEP Inválido. Faltando: " + (9 - cep.length)+" dígito!" : '')
                +(razaoSocialCheck ? "\nInforme a Razao Social!" : '')
                +(bairroCheck ? "\nInforme o Bairro!" : '')
                +(statusCheck ? "\nInforme o Status do Fornecedor!" : ''));                
                return;
            }                                
        }       
        
        if(pessoaFisica && pessoaJuridica){
            alert("Escolha um tipo de Fornecedor!");
            setPessoaFisica(false);
            setPessoaJuridica(false);
            return;
            
        }

        if(!pessoaFisica && !pessoaJuridica){
            alert("Escolha um tipo de Fornecedor!");
            setPessoaFisica(false);
            setPessoaJuridica(false);
            return;
        }
        
        if( pessoaFisica && cnpj){
            alert("Tipo de fornecedor inválido!");
            return;
        }

        if( pessoaJuridica && cpf){
            alert("Tipo de fornecedor inválido!");
            return;
        }

        if(!logged){
            alert("Você não está logado!");
        }else{

            const json = await api.addFornecedor(cnpj, cpf, razaoSocial, tipo, telefone, bairro, cep, status);

            if(json.error){
                alert(JSON.stringify(json.error));
            }else{
               alert("Fornecedor cadastrado com sucesso!")
            }
            setDisableCnpj(false);
            setDisableCpf(false);
            setCnpj('');
            setCpf('');
            setRazaoSocial('');
            setTelefone('');
            setCep('');
            setBairro('');
            setStatus('');
            setTipo('');
            setPessoaFisica(false);
            setPessoaJuridica(false);
        }
    }

    const handleLimpar = () => {
        setCnpj('');
        setCpf('');
        setRazaoSocial('');
        setTelefone('');
        setCep('');
        setBairro('');
        setStatus('');
        setDisableCnpj(false);
        setDisableCpf(false);
        setPessoaFisica(false);
        setPessoaJuridica(false);
    }    
   
    return (
        <BrowserRouter>
            <Header/>
            <Menu/>
            <div style={{marginTop: 5, marginBottom: 5, marginLeft: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5, border:"1px solid #CCC", width: 1000, height: 560, backgroundColor: "#FFF"}}>
                    <div style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, width: 1000, height: 50, backgroundColor:'rgba(0, 123, 255)', display:"flex", alignItems:"center"}}>
                        <text style={{marginLeft: 20, fontSize: 20, color:"#FFF", fontWeight:"bold"}}>Cadastrar Fornecedor</text>
                    </div>
                    <div style={{padding: 30, marginLeft: 50, display:"flex", flexWrap:"wrap", backgroundColor:"#FFF"}}>
                        <div style={{width: 286}}>
                            <label style={{fontSize: 18}}>Pessoa Física:</label>
                            <div>
                                <input type="checkbox" checked={pessoaFisica} onChange={() => {setPessoaFisica(!pessoaFisica); setDisableCnpj(disableCnpj ? false : true); setPessoaJuridica(false); setDisableCpf(false); setCnpj('')}} onClick={() => {setTipo("pessoaFisica")}} /> 
                            </div>
                        </div>
                        
                        <div style={{width: 250, marginRight: 150}}>
                            <label style={{fontSize: 18}}>Pessoa Jurídica:</label>
                            <div>
                                <input type="checkbox" checked={pessoaJuridica} onChange={() => {setPessoaJuridica(!pessoaJuridica); setDisableCpf(disableCpf ? false : true); setPessoaFisica(false); setDisableCnpj(false); setCpf('')}} onClick={() => {setTipo("pessoaJuridica")}} /> 
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            {/* Nome do Produto */}
                            <label>CNPJ:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-building" />
                                    </div>
                                    <input type="text" className="form-control" disabled={disableCnpj} placeholder="00.000.000/0000-00" value={cnpj} onChange={(e)=>{setCnpj(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{2})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1/$2')
					                    .replace(/(\d{4})(\d)/, '$1-$2')
                                        .replace(/(-\d{2})\d+?$/, '$1')
                                        )}}
                                    /> 
                                </div>
                            </div>    
                        </div>
                        <div class="mt-3 ml-5">
                            {/* Nome do Produto */}
                            <label>CPF:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="far fa-address-card" />
                                    </div>
                                    <input type="text" className="form-control" disabled={disableCpf} placeholder="000.000.000-00" value={cpf} onChange={(e)=>{setCpf(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1.$2')
                                        .replace(/(\d{3})(\d)/, '$1-$2')					                    
                                        .replace(/(-\d{2})\d+?$/, '$1')
                                        )}}
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-3 ml-5">
                            {/* Nome do Produto */}
                            <label>Razão Social:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-building" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" value={razaoSocial} onChange={(e)=>{setRazaoSocial(e.target.value)}} /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-3">
                            {/* Nome do Produto */}
                            <label>Telefone:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-phone-square" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="(00) 0 0000-0000" value={telefone} onChange={(e)=>{setTelefone(e.target.value.replace(/\D/g, '')
                                      .replace(/(\d{2})(\d)/, '($1) $2')
                                      .replace(/(\d{4})(\d)/, '$1-$2')
                                      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
                                      .replace(/(-\d{4})\d+?$/, '$1'))}} 
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-3 ml-5">
                            {/* Nome do Produto */}
                            <label>Bairro:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-city" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="Nome" value={bairro} onChange={(e)=>{setBairro(e.target.value)}} /> 
                                </div>
                            </div>    
                        </div>

                        <div class="mt-3 ml-5">
                            {/* Nome do Produto */}
                            <label>CEP:</label>
                            <div style={{backgroundColor: "#FFF", width: 238}} className="form-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                    <input type="text" className="form-control" placeholder="00000-000" value={cep} onChange={(e)=>{setCep(e.target.value.replace(/\D/g, '')
                                        .replace(/(\d{5})(\d)/, '$1-$2')
                                        .replace(/(-\d{3})\d+?$/, '$1')
                                        )}}                                         
                                    /> 
                                </div>
                            </div>    
                        </div>

                        <div style={{width: 286, marginRight: 400}} class="mt-3">
                            <label>Status:</label>
                            <div class="col-md-5">
                                <div style={{width: 238, marginLeft: -8}} class="form-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fas fa-question-circle" />
                                        </div>
                                        <select className="form-control" style={{width: 250}} value={status} onChange={e=>{setStatus(e.target.value)}}>
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
                                                                                                                                                                  
                        <div style={{marginTop: -10}}>
                            <button type="button" class="btn btn-primary mt-5 mr-5" onClick={() => {handleCadastrar()}} >Cadastrar</button>
                            <button type="button" class="btn btn-primary mt-5 ml-5" onClick={() => {handleLimpar()}} >Cancelar</button>
                        </div>
                    </div>
                    
                </div>
            <Footer/>
        </BrowserRouter>
    )
}

export default Page;