require('dotenv').config();
const server = require('./server');

server.listen(process.env.PORT, () =>{
    console.log(` Rodadndo no endereço: ${process.env.DATABASE}`);
});

