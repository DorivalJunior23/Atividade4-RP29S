const { checkSchema } = require('express-validator');


module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            isLength:{
                options: { min: 2 }
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'

        },
        novoName: {
            optional: true
        },
        password: {
            optional: true
        }
    }),
    statusUpdate:checkSchema({
        _id: {
            notEmpty: true,
            errorMessage: 'Informe o ID do usuários'
        },
        status: {
            notEmpty: true,
            errorMessage: 'Informe o ID do usuários'
        }
    })
};