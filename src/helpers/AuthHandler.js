import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const myToken = () => {
    const myToken = Cookies.get('token');
    return(myToken);
}

export const isAdmin = () => {
    const admin = Cookies.get('eAdmin');
    return (admin);
}

export const doAdmin = (eAdmin) => {
    Cookies.set('eAdmin', eAdmin);
}

export const doLogin = (token) => {
    Cookies.set('token', token);
}

export const doLogout = () => {
    Cookies.remove('token');
    Cookies.remove('eAdmin');
}

export const mudarTitulo = (titulo) => {
    document.title = titulo;
}

export const validarCPF = (cpf) => {
    let result = cpf.split(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/);
    let teste = result.join("");
    let soma = 0;
    let j = 2;
    let valido = false;

    if(teste == '00000000000' || teste == parseInt("11111111111") || teste == '22222222222' || 
        teste == '33333333333' || teste == '44444444444' || teste == '55555555555' ||
        teste == '66666666666' || teste == '77777777777' || teste == '88888888888' ||
        teste == '99999999999'){
            return false;
        }

    for(let i = 8; i >= 0; i--){
        soma += teste[i] * j;
        j++;
    }

    if(((soma * 10) % 11) === parseInt(teste[9])){
        valido = true;
    }

    j = 2;
    soma = 0;
    for(let n = 9; n >= 0; n--){
        soma += teste[n] * j;
        j++; 
    }

    if(((soma * 10) % 11) === parseInt(teste[10])){
       valido = true;
    }

    return valido;
}

export const validarCNPJ = (cnpj) => {
    cnpj = cnpj.split(/(\d{2}).(\d{3}).(\d{3}).(\d{4})-(\d{2})/);
    cnpj = cnpj.join("");
    let soma = 0;
    let j = 2;
    let dig13, dig14;

    if ( cnpj == "00000000000000" || cnpj == "11111111111111" ||
        cnpj == "22222222222222" || cnpj == "33333333333333" ||
        cnpj == "44444444444444" || cnpj == "55555555555555" ||
        cnpj == "66666666666666" || cnpj == "77777777777777" ||
        cnpj == "88888888888888" || cnpj == "99999999999999" ){
            return false;
        }

    for(let i = 11; i >= 0; i--){
        soma += cnpj[i] * j;
        j++;

        if(j == 10){
            j = 2;
        }
    }

    soma % 11 == 0 || soma % 11 == 1 ? dig13 = 0: dig13 = 11 - (soma % 11);

    j = 2;
    soma = 0;
    for(let n = 12; n >= 0; n--){
        soma += cnpj[n] * j;
        j++; 

        if(j == 10){
            j = 2;
        }
        
    }

    soma % 11 == 0 || soma % 11 == 1 ? dig14 = 0: dig14 = 11 - (soma % 11);

    if(dig13 == cnpj[12] && dig14 == cnpj[13]){ 
        return true;
    } else {
        return false;
    }
}