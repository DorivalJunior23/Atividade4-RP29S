const { checkSchema } = require('express-validator');


module.exports = {
    signup: checkSchema({
        name: {
            notEmpty: true,
            errorMessage: 'Digite seu nome!'

        },
        password: {
            isLength: {
                options: {  min: 5 }
            },
            errorMessage: 'Senha precisa ter pelo menos 5 caracteres' 
        },
        eAdmin: {
            notEmpty: true,
            errorMessage: 'Escolha 1 ou 0!'
        },
        status: {
            notEmpty: true,
            errorMessage: 'Informe o status'
        }
        
    }), 
    signin: checkSchema({
        name: {
            
            notEmpty: true,
            errorMessage: 'Digite seu nome!'

        },
        password: {
            isLength: {
                options: {  min: 5 }
            },
            errorMessage: 'Senha precisa ter pelo menos 5 caracteres' 
        },
        eAdmin: {
            notEmpty: true,
            errorMessage: 'Escolha 1 ou 0!'
            
        }
    })    
}; 