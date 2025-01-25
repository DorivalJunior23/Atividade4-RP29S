const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idProduto: String,
    qtd: Number,
    qtdMinima: Number,
    vencido: Boolean,
    dataValidade: String,
});

const modelName = 'Estoque';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}