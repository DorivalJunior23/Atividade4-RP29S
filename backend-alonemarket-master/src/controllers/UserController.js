const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');

const User = require('../models/User');


module.exports = {
    getUsers: async (req, res) => {
        let users = await User.find({eAdmin: 1});
        let operadores = [];

        for(let i in users){
            operadores.push({
                
                _id: users[i].id,
                name: users[i].name,
                password: users[i].passwordHash,
                eAdmin: users[i].eAdmin,
                status: users[i].status
            });
        }

        res.json({operadores});
    },
    info: async (req, res) => {
        let token = await req.query.token;
        
        const user = await User.findOne({token});
        if(!user){            
            res.json({error: 'Token Invalido!'});
            return;
        }                
        res.json({token: user.token, name: user.name, eAdmin: user.eAdmin});
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
            const nameCheck = await User.findOne({name: req.body.name});
            if(!nameCheck){
                res.json({error: 'Usuário não existe!'});
                return;
            }
            if(req.body.novoName){
                updates.name = req.body.novoName;
            }                        
        }

        if(req.body.password){
            updates.passwordHash = await bcrypt.hash(req.body.password, 10);
        }
        
        if(req.body.status){
            updates.status = await req.body.status;
        }
        
        await User.findOneAndUpdate({name: req.body.name}, {$set: updates});

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

        if(!mongoose.Types.ObjectId.isValid(req.body._id)){            
            res.json({error: 'ID Invalido!'});
            return;
        }
        if(req.body.status){
            updates.status = req.body.status;
        }                                        
        
        await User.findOneAndUpdate({_id: req.body._id}, {$set: updates});
        res.json({status: req.body.status});
    }
};