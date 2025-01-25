const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    codigoDeBarras: String,
    name: String,
    preco: String,
    valorVenda: String,
    status: String,
    dataCadastro: String,
    unidadeDeMedida: String,
    pesoVolume: Number,
    fabricante: String,
    fornecedor: String
});

const modelName = 'Produto';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}