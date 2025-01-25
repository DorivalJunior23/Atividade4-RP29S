import React from 'react';
import image from '../../../imagens/logo60.png';


export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div class="d-block">
        <img style={{width: 150, height: 150, marginLeft: 420, marginBottom: 100}} src={image} />
        <h3 class="text-center font-weight-bold">Lista de Fornecedores</h3>
                  
            <table className="table table-bordered table-hover">
              <thead  className="text-center">
                <th>CNPJ</th>
                <th>CPF</th>
                <th>Razão Social</th>
                <th>Telefone</th>
                <th>Bairro</th>
                <th>CEP</th>
                <th>Tipo</th>
                <th>Status</th>          
              </thead>
              <tbody>
                {this.props.dadosParaImpressao.map((item) =>{
                  return(
                  <tr className="text-left">
                    <td>{(item.cnpj) ? item.cnpj : ''}</td> 
                    <td>{(item.cpf) ? item.cpf : ''}</td>    
                    <td>{item.name}</td>
                    <td>{item.telefone}</td>
                    <td>{item.bairro}</td>                    
                    <td>{item.cep}</td>                  
                    <td>{item.tipo}</td>
                    <td>{item.status}</td>                    
                  </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr class="text-center">
                  <th>CNPJ</th>
                  <th>CPF</th>
                  <th>Razão Social</th>
                  <th>Telefone</th>
                  <th>Bairro</th>
                  <th>CEP</th>
                  <th>Tipo</th>
                  <th>Status</th>   
                </tr>
              </tfoot>
            </table>              
      </div>                  
    );
  }
}