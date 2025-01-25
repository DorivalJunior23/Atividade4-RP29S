import React from 'react';
import image from '../../../imagens/logo60.png';


export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div class="d-block">
        <img style={{width: 150, height: 150, marginLeft: 430, marginBottom: 100}} src={image} />
        <h3 class="text-center font-weight-bold">Lista de Usuários</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Status</th>
              <th>Permissão</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dadosParaImpressao.map((item, index) =>{
              return(
              <tr key={index}>
                <td>{item.name}</td>
                <td className="text-center">{item.status}</td>    
                <td className="text-center">{item.eAdmin}</td>
              </tr>
              );
            })}
          </tbody>
            <tfoot style={{textAlign:"center"}}>
              <th>Name</th>
              <th>Status</th>
              <th>Permissão</th>
            </tfoot>
        </table>  
      </div>                  
    );
  }
}