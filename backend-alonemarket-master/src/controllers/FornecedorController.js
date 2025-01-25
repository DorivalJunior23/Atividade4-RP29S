const { validationResult, matchedData } = require('express-validator');

const Fornecedor = require('../models/Fornecedor');


module.exports = {        
    addFornecedor: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);                
        
        if(data.cnpj){
            let checkCNPJ = await Fornecedor.findOne({cnpj: data.cnpj});    
        
            if(checkCNPJ){
                res.json({error: 'Fornecedor Jurídico já cadastrado! '});    
                return;            
            }
        }

        if(data.cpf){
            let checkCPF = await Fornecedor.findOne({cpf: data.cpf});    
            if(checkCPF){
                res.json({error: 'Fornecedor Físico já cadastrador!'});
                return;
            }
        }
        
        const newFornecedor = new Fornecedor({
            name: data.name,
            cnpj: data.cnpj,
            cpf: data.cpf,
            tipo: data.tipo,
            telefone: data.telefone,
            bairro: data.bairro,
            cep: data.cep,
            status: data.status
        });
        await newFornecedor.save();                
        
        res.json({});
    },
    listarTodosFornecedores: async (req, res) => {
        let lista = await Fornecedor.find({});
        res.json({lista});
    },
    listFornecedores: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        let fornecedores = await Fornecedor.find({tipo: data.tipo});


        res.json({fornecedores});
    },
    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
       
        let updates = {};
        let checkFornecedor = await Fornecedor.findOne({_id: data._id});

        if(data.cnpj){
            if(String(checkFornecedor.cpf) !== ''){
                updates.cnpj = data.cnpj;
                updates.cpf = '';   
                updates.tipo = data.tipo;
            }
            updates.cnpj = data.cnpj;
        }

        if(data.cpf){
            if(String(checkFornecedor.cnpj) !== ''){
                updates.cpf = data.cpf;
                updates.cnpj = '';
                updates.tipo = data.tipo;
            }
            updates.cpf = data.cpf;
        }
        
        if(data.name){    
            updates.name = data.name;
        }
    
        if(data.telefone){
            updates.telefone = data.telefone;
        }
        
        if(data.bairro){
            updates.bairro = data.bairro;
        }

        if(data.cep){
            updates.cep = data.cep;
        }
        
        await Fornecedor.findOneAndUpdate({_id: data._id}, {$set: updates});

        res.json({});
    },
    status: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        let updates = {};
       
        updates.status = data.status;
        
        await Fornecedor.findOneAndUpdate({_id: data._id}, {$set: updates});
        res.json({status: data.status});
    }
};
