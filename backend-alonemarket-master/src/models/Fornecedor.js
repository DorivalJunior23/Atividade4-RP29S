const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({    
    name: String,
    cnpj: String,
    cpf: String,
    tipo: String,
    telefone: String,
    bairro: String,
    cep: String,
    status: String
});

const modelName = 'Fornecedor';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}