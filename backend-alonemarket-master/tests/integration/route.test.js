const request = require('supertest');
const app = require('../../server');

describe('Routes: User - Integration', () => {

    test('1 - Route /user/signup Method: POST() - Cadastro OK', async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).post(`/user/signup?token=${token}`) 
        .send({name: "Italo", password: "123456", eAdmin: 1, status: "Ativo"})
        
        console.log(res.body);

        expect(res.body.token).toBeTruthy();    
                
    });

    test('2 - Route /user/signup Method: POST() - Cadastro Falha - Usuário já cadastrado', async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).post(`/user/signup?token=${token}`)
        .send({name: "Ivan", password: "123456", eAdmin: 0, status: "Ativo"})
        
        console.log(res.body);

        expect(res.body.error).toBe('Usuário já existe!');    
                
    });

    test('3 - Route /user/info Method: GET() - Informações de Usuario - Token OK', async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).get(`/user/me?token=${token}`)                          

        console.log(res.body);
        
        expect(res.body.name).toBe("Ivan");
        
    });    

    test('4 - Route /user/info Method: GET() - Informações de Usuario - Token Inválido', async () => {
        let token = '98058345849058304598'
        const res = await request(app).get(`/user/me?token=${token}`)                 
        
        console.log(res.body);        

        expect(res.body.error).toBe('Token Invalido!');
                
    });                  
    
    test('5 - Route /user/getusers Method: GET() - Grupo de Usuários', async () => {
        const res = await request(app).get('/user/getusers')         
        
        console.log(res.body);

        expect(res.body.operadores[0].name).toBe("Teste");                            
    });  

    test("6 - Route /user/me Method: PUT() - Alteração do nome do usuário - OK", async () => {        
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/user/me?token=${token}`)
        .send({name: "Italo", novoName: "Robson"})        

        console.log(res.body);

        expect(res.body.http).toBe(200);
    });


    test("7 - Route /user/me Method: PUT() - Alteração da senha do usuário - OK", async () => {        
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/user/me?token=${token}`)
        .send({name: "Robson", password: "1234567"})        

        console.log(res.body);

        expect(res.body.http).toBe(200);
    });

    test("8 - Route /user/me Method: PUT() - Alteração de nome do usuário com nome inválido - Falha", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/user/me?token=${token}`)
        .send({name: "Max", novoName: "Ricardo"});

        console.log(res.body);

        expect(res.body.error).toBe('Usuário não existe!');
    });

    test("9 - Route /user/status Method: PUT() - Alteração do Status do usuário", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/user/status?token=${token}`)
        .send({_id: '6196a3395111717568b06922', status: 'Inativo'});

        console.log(res.body);

        expect(res.body.status).toBe('Inativo');
    });

    test("10 - Route /user/status Method: PUT() - Alteração do Status do usuário - ID Inválido", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/user/status?token=${token}`)
        .send({_id: '617e03484c', status: 'Inativo'});

        console.log(res.body);

        expect(res.body.error).toBe("ID Invalido!");
    });

    test('11 - Route /user/signin Method: POST() - Login OK', async () => {
        const res = await request(app).post('/user/signin') 
        .send({name: "Robson", password: "1234567", eAdmin: 1})
        
        console.log(res.body);

        expect(res.body.name).toBe("Robson");    
                
    });

    test('12 - Route /user/signin Method: POST() - Falha Login - Nome Errado', async () => {
        const res = await request(app).post('/user/signin') 
        .send({name: "Junio", password: "1234567", eAdmin: 1})
        
        console.log(res.body);

        expect(res.body.error).toBe("Usuário e/ou senha inválidos!");    
                
    });    

    test('13 - Route /user/signin Method: POST() - Falha Login - Senha Errada', async () => {
        const res = await request(app).post('/user/signin') 
        .send({name: "Robson", password: "123456", eAdmin: 1})
        
        console.log(res.body);

        expect(res.body.error).toBe("Usuário e/ou senha inválidos!");    
                
    });    

    test('14 - Route /user/signin Method: POST() - Falha Login - Permissão', async () => {
        const res = await request(app).post('/user/signin') 
        .send({name: "Robson", password: "1234567", eAdmin: 0})
        
        console.log(res.body);

        expect(res.body.error).toBe('Opção de Login inválida!');    
                
    }); 

    test('15 - Route /user/signin Method: POST() - Falha Login - Status do Perfil', async () => {
        const res = await request(app).post('/user/signin') 
        .send({name: "Teste", password: "123456", eAdmin: 1})
        
        console.log(res.body);

        expect(res.body.error).toBe('Usuário não cadastrado!');    
                
    }); 

    test("16 - Testando requisição sem informar TOKEN  -  /user/me - Metodo PUT() - Falha", async () => {        
        const res = await request(app).put('/user/me')

        console.log(res.body);

        expect(res.body).toStrictEqual({notallowed: true});
    });

    test("17 - Testando requisição passando TOKEN vazio -  /user/me - Metodo PUT() - Falha", async () => {
        let token = '';
        const res = await request(app).put(`/user/me?token=${token}`)

        console.log(res.body);

        expect(res.body).toStrictEqual({notallowed: true});
    });

    test("18 - Testando requisição com TOKEN inválido - /user/me - Metodo PUT() - Falha", async () => {
        let token = '4545676787879898';
        const res = await request(app).put(`/user/me?token=${token}`)

        console.log(res.body);

        expect(res.body).toStrictEqual({notallowed: true});
    });
    
    test("", () => {

    });

});

describe("Routes: Produto - Integration", () => {
    test("1 - Listando Medidas - (L, ML, G, KG) - Metodo GET", async () =>{
        const res = await request(app).get('/undmedidas');

        console.log(res.body);

        expect(res.body.medidas[1].name).toBe('ML');
    });

    test("2 - Testando Cadastro de Produto - Metodo addAction() - OK", async () => {        
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).post(`/produto/add?token=${token}`)
        .send({
            codigoDeBarras: "789112837747",
            name: "Coca",
            preco: "2.80",
            valorVenda: "3.75",
            status: "Ativo",
            unidadeDeMedida: "ML",
            pesoVolume: "200",
            fabricante: "Coca-Cola",
            fornecedor: "Coca-Cola"
        })
        
        expect(res.body.http).toBe(200);
    });

    test("3 - Testando Cadastro de Produto - Metodo addAction() - Falha (Produto Já Cadastrado)", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).post(`/produto/add?token=${token}`)
        .send({
            codigoDeBarras: "789112837747",
            name: "Coca",
            preco: "2.80",
            valorVenda: "3.75",
            status: "Ativo",
            unidadeDeMedida: "ML",
            pesoVolume: "200",
            fabricante: "Coca-Cola",
            fornecedor: "Coca-Cola"
        });        

        expect(res.body.error).toBe('Produto já cadastrado!');
    });

    test("4 - Testando grupo de produtos - Metodo getList()", async () => {
        const res = await request(app).get('/produto/list');

        console.log(res.body);

        expect(res.body.produtos[0].codigoDeBarras).toBe('789112837747');
    });

    test("5 - Testando alteração de informações de Produtos - Campo Nome - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', name: 'Fanta'})        

        expect(res.body.http).toBe(200);
    });
   
    test("6 - Testando alteração de informações de Produtos - Campo Valor de venda - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', valorVenda: '4.00'})        

        expect(res.body.http).toBe(200);
    });

    test("7 - Testando alteração de informações de Produtos - Campo Unidade de Medida - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', unidadeDeMedida: 'L'})        

        expect(res.body.http).toBe(200);
    });

    test("8 - Testando alteração de informações de Produtos - Campo preco - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', preco: 3.00})        

        expect(res.body.http).toBe(200);
    });

    test("9 - Testando alteração de informações de Produtos - Campo Peso ou Volume - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', pesoVolume: 1000})        

        expect(res.body.http).toBe(200);
    });

    test("10 - Testando alteração de informações de Produtos - Campo Fabricante - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', fabricante: 'Fanta'})        

        expect(res.body.http).toBe(200);
    });

    test("11 - Testando alteração de informações de Produtos - Campo fornecedor - Metodo editAction()", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/update?token=${token}`)
        .send({codigoDeBarras: '789112837747', fornecedor: 'Fanta'})        

        expect(res.body.http).toBe(200);
    });


    test("12 - Testando alteração do status do Produto", async () => {
        let token = '$2b$10$hgzosg9aiLq/Q0Qagc5kKO1GjMwCD3kJbxucAO7QIrGD2Z30yXgxG';
        const res = await request(app).put(`/produto/status?token=${token}`)
        .send({codigoDeBarras: '789112837747', status: 'Inativo'})        

        expect(res.body.status).toBe('Inativo');
    });    
    
});

describe("Routes: Estoque - Integration", () => {
    test("Testar criação do Estoque - /fornecedor/add - Metodo POST", async () =>{
        
    });
});

describe("Routes: Fornecedor - Integration", () => {
    test("", async () =>{
              
    });

    
    
});