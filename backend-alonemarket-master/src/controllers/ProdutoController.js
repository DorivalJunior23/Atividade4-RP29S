const { validationResult, matchedData } = require('express-validator');

const Medidas = require('../models/Medidas');
const Produto = require('../models/Produto');
const moment = require('moment');

module.exports = {
    getMedidas: async (req, res) => {
        let medidas = await Medidas.find();
        
        res.json({medidas});
    },
    addAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        let prodCheck = await Produto.findOne({codigoDeBarras: req.body.codigoDeBarras});

        if(prodCheck){
            res.json({error: 'Produto já cadastrado!'});
            return;
        } else{
            const newProduto = new Produto({
                codigoDeBarras: req.body.codigoDeBarras,
                name: req.body.name,
                preco: req.body.preco,
                valorVenda: req.body.valorVenda,
                status: req.body.status,
                dataCadastro: moment().format("DD/MM/YYYY"),
                unidadeDeMedida: req.body.unidadeDeMedida,
                pesoVolume: req.body.pesoVolume,
                fabricante: req.body.fabricante,
                fornecedor: req.body.fornecedor
            });
            await newProduto.save();
        }
        res.json({http: 200});
    },
    getList: async (req, res) => {
        let produtos = await Produto.find();


        res.json({produtos});
    },    

    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        let updates = {};

        if(req.body.name){    
            updates.name = req.body.name;
        }

        if(req.body.preco){
            updates.preco = req.body.preco;
        }

        if(req.body.valorVenda){
            updates.valorVenda = req.body.valorVenda;
        }
        
        if(req.body.qtd){
            updates.qtd = req.body.qtd;
        }

        if(req.body.dataValidade){
            updates.dataValidade = req.body.dataValidade;
        }

        if(req.body.unidadeDeMedida){
            updates.unidadeDeMedida = req.body.unidadeDeMedida;
        }

        if(req.body.pesoVolume){
            updates.pesoVolume = req.body.pesoVolume;
        }

        if(req.body.fabricante){
            updates.fabricante = req.body.fabricante;
        }

        if(req.body.fornecedor){
            updates.fornecedor = req.body.fornecedor;
        }

        updates.dataCadastro = moment().format("DD/MM/YYYY");
        
        await Produto.findOneAndUpdate({codigoDeBarras: req.body.codigoDeBarras}, {$set: updates});

        res.json({http: 200});
    },
    status: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        let updates = {};
       
        updates.status = req.body.status;
        
        await Produto.findOneAndUpdate({codigoDeBarras: req.body.codigoDeBarras}, {$set: updates});
        res.json({status: req.body.status});
    }
};