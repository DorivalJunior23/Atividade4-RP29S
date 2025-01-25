import React from 'react';
import image from '../../../imagens/logo60.png';


export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div class="d-block">
        <img style={{width: 150, height: 150, marginLeft: 510, marginBottom: 100}} src={image} />
        <h3 class="text-center font-weight-bold">Lista de Produtos</h3>
        <table className="table table-bordered table-hover">
          <thead  className="text-center">
            <th>Código</th>
            <th>Produto</th>
            <th>Fornecedor</th>
            <th>Fabricante</th>
            <th>Qtd</th>
            <th>Qtd Minima</th>
            <th>Preço</th>
            <th>Valor em Estoque</th>
            <th>Data de Cadastro</th>
            <th>Data de Validade</th>
            <th>Peso/Volume</th>
            <th>Unidade de Medida</th>            
          </thead>
          <tbody>
            {this.props.dadosParaImpressao.map((item) =>{
              return(
              <tr className="text-left">
                <td>{item.codigoDeBarras}</td>    
                <td>{item.name}</td>
                <td>{item.fornecedor}</td>
                <td>{item.fabricante}</td>
                <td className="text-center">{item.qtd}</td>
                <td className="text-center">{item.qtdMinima}</td>
                <td>{"R$ " + item.preco}</td>
                <td>{"R$ " + (parseFloat(item.preco) * item.qtd).toFixed(2)}</td>
                <td className="text-center">{item.dataCadastro}</td>
                <td className="text-center">{item.dataValidade}</td>
                <td className="text-center">{item.pesoVolume}</td>
                <td className="text-center">{item.unidadeDeMedida}</td>                
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
                <th>Qtd</th>
                <th>Qtd Minima</th>
                <th>Preço</th>
                <th>Valor em Estoque</th>
                <th>Data de Cadastro</th>
                <th>Data de Validade</th>
                <th>Peso/Volume</th>
                <th>Unidade de Medida</th>                
              </tr>
            </tfoot>
        </table>  
      </div>                  
    );
  }
}