import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';


export const ExportCSV = ({csvData, fileName}) => {


    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';


    const exportToCSV = (csvData, fileName) => {
        let csvDataNew = [];

        csvData.forEach(element => {
            csvDataNew.push({
                Codigo: element.codigoDeBarras,
                Produto: element.name,
                Preço: "R$ " + element.preco,
                Venda: "R$ " + element.valorVenda,
                Fabricante: element.fabricante,
                Fornecedor: element.fornecedor,
                Data_Cadastro: element.dataCadastro,
                Peso_Volume: element.pesoVolume,
                Unidade_Medida: element.unidadeDeMedida,
                Status: element.status
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


