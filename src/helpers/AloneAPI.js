import Cookies from 'js-cookie';
import qs from 'qs';


const BASEAPI = "https://backend-alonemarket.herokuapp.com";

const apiFetchPost = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/';
        return;
    }

    return json;
}
const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/signin';
        return;
    }

    return json;
}

const apiFetchPut = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method:'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/';
        return;
    }

    return json;
}
const apiFetchDelete = async (endpoint, body) => {
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method:'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if (json.notallowed){
        window.location.href = '/';
        return;
    }

    return json;
}
const AloneAPI = {

    login:async (name, password, eAdmin) => {
        const json = await apiFetchPost(
            '/user/signin',
            {name, password, eAdmin}
        );
        return json; 
    },

    register:async (name, password, status, eAdmin) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, password, status, eAdmin}
        );
        return json;
    },

    getUser:async () => {
        const json = await apiFetchGet(
            '/user/me'
        );
        return json;
    },

    getUsers:async () => {
        const json = await apiFetchGet(
            '/user/getusers'
        );
        return json.operadores;
    },

    editAction:async (name, novoName, password) => {
        const json = await apiFetchPut(
            '/user/me',
            {name, novoName, password}
        );
        return json;
    },

    statusUser:async (_id, status) => {
        const json = await apiFetchPut(
            '/user/status',
            {_id, status}
        );
        return json;
    },

    addAction:async (codigoDeBarras, name, preco, valorVenda, unidadeDeMedida, pesoVolume, fabricante, fornecedor, status) => {
        const json = await apiFetchPost(
            '/produto/add',
            {codigoDeBarras, name, preco, valorVenda, unidadeDeMedida, pesoVolume, fabricante, fornecedor, status}
        );
        return json;
    },

    editProdAction:async (codigoDeBarras, name, preco, valorVenda, unidadeDeMedida, pesoVolume, fabricante, fornecedor) => {
        const json = await apiFetchPut(
            '/produto/update',
            {codigoDeBarras, name, preco, valorVenda, unidadeDeMedida, pesoVolume, fabricante, fornecedor}
        );
        return json;
    },

    getMedidas:async () => {
        const json = await apiFetchGet(
            '/undmedidas'
        );
        return json.medidas;
    },

    getListProduto:async () => {
        const json = await apiFetchGet(
            '/produto/list'
        );
        return json.produtos;
    },

    getItemEstoque:async (codigoDeBarras, dataValidade) => {
        const json = await apiFetchGet(
            '/estoque/estoqueItem',
            {codigoDeBarras, dataValidade}
        );
        return json.itemStok;
    },

    getProdutoId:async (codigoDeBarras) => {
        const json = await apiFetchGet(
            '/produto/id',
            {codigoDeBarras}
        );
        return json;
    },

    prodStatus:async (codigoDeBarras, status) => {
        const json = await apiFetchPut(
            '/produto/status',
            {codigoDeBarras, status}
        );
        return json;
    },

    gerarEstoque:async (codigoDeBarras, dataValidade, qtd, qtdMinima, vencido) => {
        const json = await apiFetchPost(
            '/estoque/add',
            {codigoDeBarras, dataValidade, qtd, qtdMinima, vencido}
        );
        return json;
    },

    getListaEstoque:async () => {
        const json = await apiFetchGet(
            '/estoque/lista'
        );
        return json.listaEstoque;
    },

    editEstoque:async (_id, novaDataValidade, novaQTD, novaQtdMinima) => {
        const json = await apiFetchPut(
            '/estoque/update',
            {_id, novaDataValidade, novaQTD, novaQtdMinima}
        );
        return json;
    },

    altProdVencidos:async (identificador, vencido, _id) => {
        const json = await apiFetchPut(
            '/estoque/altProdVencido',
            {identificador, vencido, _id}
        );
        return json;
    },

    addFornecedor:async (cnpj, cpf, name, tipo, telefone, bairro, cep, status) => {
        const json = await apiFetchPost(
            '/fornecedor/add',
            {cnpj, cpf, name, tipo, telefone, bairro, cep, status}
        );
        return json;
    },

    listarFornecedor:async (tipo) => {
        const json = await apiFetchGet(
            '/fornecedor/list',
            {tipo}
        );
        return json.fornecedores;
    },

    listarTodosFornecedores:async () => {
        const json = await apiFetchGet('/fornecedor/listarTodos');
        return json.lista;
    },

    fornecedorUpdate:async (_id, cnpj, cpf, name, tipo, telefone, bairro, cep) => {
        const json = await apiFetchPut(
            '/fornecedor/update',
            {_id, cnpj, cpf, name, tipo, telefone, bairro, cep}
        );
        return json;
    },

    fornecedorStatus:async (_id, status) => {
        const json = await apiFetchPut(
            '/fornecedor/status',
            {_id, status}
        );
        return json;
    }
};

export default () => AloneAPI;
