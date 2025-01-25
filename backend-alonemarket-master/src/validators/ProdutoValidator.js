const { checkSchema } = require('express-validator');


module.exports = {
    addAction: checkSchema({
        token: {
            notEmpty: true,
            errorMessage: 'Informe o código de barras!'
        },
        codigoDeBarras:{
            notEmpty: true,
            errorMessage: 'Informe o código de barras!'
        },
        name: {
            notEmpty: true,
            errorMessage: 'Voce precisa digitar o nome do Produto'

        },
        status: {
            notEmpty: true,
            errorMessage: 'Informe o status do produto'
        },
        preco: {
            notEmpty: true,
            errorMessage: 'Digite o preço do produto' 
        },
        valorVenda: {
            notEmpty: true,
            errorMessage: 'Digite o valor da venda' 
        },
        unidadeDeMedida: {
            notEmpty: true,
            errorMessage: 'Digite a unidade de medida'
        },
        pesoVolume: {
            notEmpty: true,
            errorMessage: 'Digite o peso ou volume'
        },
        fabricante: {
            notEmpty: true,
            errorMessage: 'Digite o nome do fabricante do produto'
        },
        fornecedor: {
            notEmpty: true,
            errorMessage: 'Digite o nome do fornecedor do produto'
        }
    }),
    editAction: checkSchema({
        codigoDeBarras:{
           notEmpty: true,
           errorMessage: 'Informe o código de barras!'
        },
        name: {
           optional: true
        },
        preco: {
            optional: true
        },
        valorVenda: {
            optional: true
        },
        qtd: {
            optional: true
        },
        dataValidade: {
            optional: true
        },
        unidadeDeMedida: {
            optional: true
        },
        pesoVolume: {
            optional: true
        },
        fabricante: {
            optional: true
        },
        fornecedor: {
            optional: true
        }
    }),
    status:checkSchema({
        codigoDeBarras:{
            notEmpty: true,
            errorMessage: 'Informe o código de barras!'
         },
         status:{
             notEmpty: true,
             errorMessage: 'Informe o status do produto'
         }
    })
};