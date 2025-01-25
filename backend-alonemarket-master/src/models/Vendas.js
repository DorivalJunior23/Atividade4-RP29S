const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idOperador: String,
    nome: String,    
    dataVenda: String,
    formaDePagamento: String,
    produtos: [Object]    
});

const modelName = 'Vendas';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}