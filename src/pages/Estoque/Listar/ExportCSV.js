import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';


export const ExportCSV = ({csvData, fileName}) => {


    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';


    const exportToCSV = (csvData, fileName) => {
        let csvDataNew = [];

        csvData.forEach(data => {
            csvDataNew.push({
                Codigo: data.codigoDeBarras,
                Produto: data.name,            
                Fabricante: data.fabricante,
                Fornecedor: data.fornecedor,
                Qtd: data.qtd,
                Qtd_Minima: data.qtdMinima,
                Preço: "R$ " + data.preco,
                Valor_Estoque: "R$ " + (parseFloat(data.preco) * data.qtd).toFixed(2),
                Data_Cadastro: data.dataCadastro,
                Data_Validade: data.dataValidade,
                Peso_Volume: data.pesoVolume,
                Unidade_Medida: data.unidadeDeMedida,
                Vencido: data.vencido,
            })
        });

        const ws = XLSX.utils.json_to_sheet(csvDataNew);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }


    return (

        <button type="button" className="btn btn-success" onClick={(e) => exportToCSV(csvData,fileName)}>Excel</button>

    )

}


