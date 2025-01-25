const ProdutoRepository = require('../repositories/ProdutoRepository');
const EstoqueRepository = require('../repositories/EstoqueRepository');
const EstoqueFactory = require('../factories/EstoqueFactory');
const { validationResult, matchedData } = require('express-validator');

module.exports = {
    addEstoque: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }

        const data = matchedData(req);
        const produto = await ProdutoRepository.findByCodigoDeBarras(data.codigoDeBarras);

        if (!produto) {
            res.json({ error: 'Produto não cadastrado!' });
            return;
        }

        const newEstoque = EstoqueFactory.create({
            idProduto: produto._id,
            qtd: data.qtd,
            qtdMinima: data.qtdMinima,
            dataValidade: data.dataValidade,
        });

        await EstoqueRepository.create(newEstoque);

        res.json({
            codigoDeBarras: produto.codigoDeBarras,
            name: produto.name,
            qtd: data.qtd,
            qtdMinima: data.qtdMinima,
            preco: produto.preco,
            status: produto.status,
            dataCadastro: produto.dataCadastro,
            dataValidade: data.dataValidade,
            unidadeDeMedida: produto.unidadeDeMedida,
            pesoVolume: produto.pesoVolume,
            fabricante: produto.fabricante,
            fornecedor: produto.fornecedor,
            vencido: data.vencido,
        });
    },

    listarEstoque: async (req, res) => {
        const produtos = await ProdutoRepository.findAtivos();
        const estoques = await EstoqueRepository.findAll();

        const listaEstoque = estoques.map((estoque) => {
            const produto = produtos.find(
                (produto) => String(estoque.idProduto) === String(produto._id)
            );
            if (!produto) return null;

            return {
                codigoDeBarras: produto.codigoDeBarras,
                name: produto.name,
                preco: produto.valorVenda,
                qtd: estoque.qtd,
                qtdMinima: estoque.qtdMinima,
                valorEstoque: (parseFloat(produto.valorVenda) * estoque.qtd).toFixed(2),
                dataValidade: estoque.dataValidade,
                dataCadastro: produto.dataCadastro,
                unidadeDeMedida: produto.unidadeDeMedida,
                pesoVolume: produto.pesoVolume,
                fabricante: produto.fabricante,
                fornecedor: produto.fornecedor,
                vencido: estoque.vencido,
                _id: estoque._id,
            };
        }).filter(Boolean);

        res.json({ listaEstoque });
    },
};
