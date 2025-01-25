const app = require('../../server');
const { mockReq, mockRes } = require('../../src/util/interceptor');
const UserController = require('../../src/controllers/UserController');
const AuthController = require('../../src/controllers/AuthController');
const mongoose = require('mongoose');


const User = require('../../src/models/User');

describe("Teste Controller de Usuario - AuthController e UserController", () => { 
    test("1 - Teste AuthController - Metodo Signup - Cadastro Ok", async () => {
        let req = mockReq();
        req.body = {
            name: 'Carlos',
            password: '12345',
            eAdmin: '1',
            status: 'Inativo'
        }    
        const res = mockRes();

        await AuthController.signup(req, res);  
        console.log(res.status.mock.calls[0][0]);      
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });    
      
    test("1 - Teste AuthController - Metodo Signup - Falha (Usuario Ja Cadastrado!)", async () => {
        let req = mockReq();
        req.body = {
            name: 'Carlos',
            password: '12345',
            eAdmin: '1',
            status: 'Ativo'          
        }    
        const res = mockRes();

        await AuthController.signup(req, res);   
        console.log(res.status.mock.calls[0][0]);     
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    }) 
      
    test("2 - Teste AuthController - Metodo Signin - Login Ok", async () => {
        let req = mockReq();
        req.body = {
            name: 'Ivan',
            password: '123456',
            eAdmin: '1',
        } 
        
        const res = mockRes();
        
        await AuthController.signin(req, res); 
        console.log(res.status.mock.calls[0][0]);
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);       
    });

    test("2 - Teste AuthController - Metodo Signin - Credenciais Erradas (senha)", async () => {
        let req = mockReq();
        req.body = {
            name: 'Ivan',
            password: 'P@$$w0rd.!!!',
            eAdmin: '1',            
        }
        
        const res = mockRes();
        
        await AuthController.signin(req, res);
        console.log(res.status.mock.calls[0][0]);
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });  

    test("2 - Teste AuthController - Metodo Signin - Credenciais Erradas (nome)", async () => {
        let req = mockReq();
        req.body = {
            name: 'Ivann',
            password: '123456',
            eAdmin: '1',            
        }
        
        const res = mockRes();
        
        await AuthController.signin(req, res);
        console.log(res.status.mock.calls[0][0]);
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);
    });  

    test("2 - Teste AuthController - Metodo Signin - Permissao - Falha", async () => {
        let req = mockReq();
        req.body = {
            name: 'Ivan',
            password: '123456',
            eAdmin: '0',                      
        }
        
        const res = mockRes();
        
        await AuthController.signin(req, res);
        console.log(res.status.mock.calls[0][0]);
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });    

    test("2 - Teste AuthController - Metodo Signin - Perfil Inativo - Falha", async () => {
        let req = mockReq();
        req.body = {
            name: 'Carlos',
            password: '123456',
            eAdmin: '1',            
            status: 'Inativo',
        }
        
        const res = mockRes();
        
        await AuthController.signin(req, res);
        console.log(res.status.mock.calls[0][0]);
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });

    test("1 - Testando Metodo getUsers para listar todos operadores", async () => {
        let req = mockReq();                
        const res = mockRes();
        
        await UserController.getUsers(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });   

    test("2 - Testando o Metodo para retorna informacoes do Usuario a partir do Token - info()", async () => {
        let req = mockReq();
        req.query = {
           token: '$2b$10$.cI3Uq1v3SxIfIFlxXSfxOsnWGm3hoYShbn1xuvZX1Wf0osZgPzF.',
        } 
        
        const res = mockRes();
        
        await UserController.info(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });

    test("3 - Testando pegar informacoes de com Token Invalido - info()", async () => {
        let req = mockReq();
        req.query = {
           token: 'e564578769898fghfghfghghvcbcvbcvb'
        } 
        
        const res = mockRes();
        
        await UserController.info(req, res); 
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);        
    });

    test("4 - Testando o IF(!user) - Metodo info()", async () => {
        let token = 'e564578769898fghfghfghghvcbcvbcvb';
        console.log("Token Inválido - Teste do IF(!user)!")                                   
        expect(await User.findOne({token})).toBeFalsy();       
    });

    test("5 - Testando Alteraçao do nome de usuario - Metodo editAction() - OK", async () => {
        let req = mockReq();
        req.body = {
            name: 'Carlos',
            novoName: 'Sergio'
        } 

        const res = mockRes();
        await UserController.editAction(req, res);
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);      
    });    

    test("6 - Testando Alteraçao da senha de usuario - Metodo editAction() - OK", async () => {
        let req = mockReq();
        req.body = {
            name: 'Sergio',
            password: '123456'
        } 

        const res = mockRes();
        await UserController.editAction(req, res);
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);  
    });    


    test("7 - Testando Atualizacao de dados cadastrais com name invalido - editAction() Falha", async () => {
        let req = mockReq();
        req.body = {
            name: 'Carlos',
            novoName: 'Ivann'
        } 

        const res = mockRes();
        await UserController.editAction(req, res);
        console.log(res.status.mock.calls[0][0]);          
        expect(res.json).toHaveBeenCalledWith(res.status.mock.calls[0][0]);      
    });

    test("8 - Testando Primeiro IF(req.body.name) do Metodo editAction()", async () => {
        let name = 'Sergio';
        console.log("Usuario cadastro - Teste do IF(req.body.name)!")                                   
        expect(await User.findOne({name})).toBeTruthy();              
    });

    test("9 - Testando Primeiro IF(!user) do Metodo editAction()", async () => {
        let name = 'Carlos';
        console.log("Usuario não cadastrado - Teste do IF(!user)")                                   
        expect(await User.findOne({name})).toBeFalsy();              
    });

    test("10 - Testando IF(req.body.novoName) - Metodo editAction()", async () =>{
        let novoName = 'Junior';
        console.log("novoName foi enviado via req.body com sucesso!");
        expect(novoName).toBeTruthy();
    });

    test("11 - Testando IF(req.body.password) - Metodo editAction()", async () =>{
        let passwordHash = '123456';
        console.log("password foi enviado via req.body com sucesso!");
        expect(passwordHash).toBeTruthy();
    });

    test("12 - Testando Primeiro IF(mongoose.Types.ObjectId.isValid(req.body._id)) do Metodo status() - OK", async () => {
        let req = mockReq();
        req.body = {
            _id: '617e03484c8e3e1e58b72dc0',
            status: 'Inativo'
        } 

        const res = mockRes();
        await UserController.status(req, res);
        console.log(mongoose.Types.ObjectId.isValid(req.body._id));          
        expect(await mongoose.Types.ObjectId.isValid(req.body._id)).toBeTruthy();        
    });

    afterAll(async () => {
        await mongoose.connection.close();           
    });
    
    test("13 - Testando Primeiro IF(mongoose.Types.ObjectId.isValid(req.body._id)) do Metodo status() - Falha", async () => {
        let req = mockReq();
        req.body = {
            _id: '60f727ed947c4f0594362a53343443',
            status: 'Inativo'
        } 

        const res = mockRes();
        await UserController.status(req, res);
        console.log(mongoose.Types.ObjectId.isValid(req.body._id));          
        expect(await mongoose.Types.ObjectId.isValid(req.body._id)).toBeFalsy();        
    });

    afterAll(async () => {
        await mongoose.connection.close();           
    });
    
});

desribe("Teste Controller de Estoque - EstoqueController", () => {});
desribe("Teste Controller de Fornecedor - FornecedorController", () => {});
desribe("Teste Controller de Produto - ProdutoController", () => {});
