const Estoque = require('../models/Estoque');

class EstoqueRepository {
    static async findAll() {
        return await Estoque.find();
    }

    static async findByProdutoId(idProduto) {
        return await Estoque.find({ idProduto });
    }

    static async updateById(id, updates) {
        return await Estoque.findOneAndUpdate({ _id: id }, { $set: updates });
    }

    static async create(data) {
        const estoque = new Estoque(data);
        return await estoque.save();
    }
}

module.exports = EstoqueRepository;
