const Produto = require('../models/Produto');

class ProdutoRepository {
    static async findByCodigoDeBarras(codigoDeBarras) {
        return await Produto.findOne({ codigoDeBarras });
    }

    static async findAtivos() {
        return await Produto.find({ status: 'Ativo' });
    }
}

module.exports = ProdutoRepository;