import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(){
    return(
        <div>
            <h1>Acesso Negado</h1>

            <Link to="/homeOperador">Voltar para página home do Operador</Link>

        </div>
    );
}

export default NotFound;