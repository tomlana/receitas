const mongoose = require('mongoose');
mongoose.Promise = Promise;



const urlNameBD = process.env.MONGODB_URL || 'mongodb://localhost:8080/receitas_mongo';

let con = mongoose.connect(urlNameBD, (err, res) => {

    if (err) {
        console.log(err);
        console.log('Não foi possível estabelecer uma conexão com o banco de dados' + urlNameBD);
    } else {
        console.log('Conectado com sucesso ao  ' + urlNameBD);
    }

});


module.exports = con;
