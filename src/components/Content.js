import React, { useEffect, useState} from 'react'
import useApi from '../helpers/AloneAPI';

const Content = () => {
    const api = useApi();

    const [listarEstoque, setListarEstoque] = useState([]);
    const [estokVencimento, setEstokVencimento] = useState([]);                  

    useEffect(() => {
        const estoqueList = async () => {
            const sList = await api.getListaEstoque();                       
            setListarEstoque(sList.filter((stok) => (stok.qtd <= stok.qtdMinima * 0.3)));
            setEstokVencimento(sList.filter((stok) => ((calcularData(stok.dataValidade) <= 30) ? stok: null))); 
                          
            api.altProdVencidos(1, true);
        }                  
        estoqueList();                                     
    }, [2]);        

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

    return (
        <div className="content-wrapper">
            
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">Home</li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title">Gráfico de vendas mensais</h3>
                                    
                                </div>                                
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <p className="d-flex flex-column">
                                        <span>Visitantes ao longo do tempo</span>
                                    </p>
                                    <p className="ml-auto d-flex flex-column text-right">
                                        <span className="text-success">
                                            <i className="fas fa-arrow-up" /> 12.5%
                                        </span>
                                    </p>
                                </div>
                                {/* /.d-flex */}
                                <div className="position-relative mb-4">
                                    <canvas id="visitors-chart" height={200} />
                                </div>
                                <div className="d-flex flex-row justify-content-end">
                                    <span className="mr-2">
                                        <i className="fas fa-square text-primary" /> Este Mês
                                    </span>
                                    <span>
                                        <i className="fas fa-square text-gray" /> Mês Passado
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                                                
                        {/* /.card */}
                    </div>
                    {/* /.col-md-6 */}
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title text-center">Gráfico de vendas anuais</h3>                                    
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <p className="d-flex flex-column">
                                        <span className="text-bold text-lg">$18,230.00</span>
                                        <span>Vendas ao longo do tempo.</span>
                                    </p>
                                    <p className="ml-auto d-flex flex-column text-right">
                                        <span className="text-success">
                                            <i className="fas fa-arrow-up" /> 33.1%
                                        </span>
                                        <span className="text-muted">Desde o último mês</span>
                                    </p>
                                </div>
                                {/* /.d-flex */}
                                <div className="position-relative mb-4">
                                    <canvas id="sales-chart" height={200} />
                                </div>
                                <div className="d-flex flex-row justify-content-end">
                                    <span className="mr-2">
                                    <i className="fas fa-square text-primary" /> Este Ano
                                    </span>
                                    <span>
                                    <i className="fas fa-square text-gray" /> Ano Passado
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                        
                    </div>
                    <div className="col-6">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h3 className="card-title">Produtos em Baixa</h3>                                    
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-striped table-valign-middle">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>
                                                    Quantidade{" "}
                                                    <small className="text-danger mr-1">
                                                        <i className="fas fa-arrow-down" />
                                                        30%
                                                    </small>
                                                </th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listarEstoque.map((item, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{item.codigoDeBarras}</td>              
                                                        <td>{item.name}</td>              
                                                        <td>{item.qtd}</td>              
                                                    </tr>
                                                );                                                
                                            })}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>                            
                    </div>
                    <div className="col-6">
                            <div className="card">
                                <div className="card-header border-0">
                                    <h3 className="card-title">Produtos Próximos de Vencer </h3>                                    
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-striped table-valign-middle">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Produto</th>
                                                <th>
                                                    Dias Para Vencer{" "}
                                                    <small className="text-danger mr-1">
                                                        <i className="fas fa-arrow-down" />                                                        
                                                    </small>
                                                </th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {estokVencimento.map((item, index) => {
                                                return(
                                                    calcularData(item.dataValidade) >= 0 ?
                                                    <tr key={index}>                                                        
                                                        <td>{item.codigoDeBarras}</td>              
                                                        <td>{item.name}</td>              
                                                        <td>{calcularData(item.dataValidade)}</td>                                                                                                                                                                                                                                              
                                                    </tr>

                                                    :

                                                    null
                                                );                                                
                                            })}                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    {/* /.col-md-6 */}
                </div>
                {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </div>
            {/* /.content */}
        </div>
    )
}

export default Content;