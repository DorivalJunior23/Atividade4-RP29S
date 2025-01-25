class EstoqueFactory {
    static create({ idProduto, qtd, qtdMinima, dataValidade }) {
        return {
            idProduto,
            qtd,
            vencido: false,
            qtdMinima,
            dataValidade,
        };
    }
}

module.exports = EstoqueFactory;
