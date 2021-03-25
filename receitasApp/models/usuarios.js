var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



var UsuariosSchema = new Schema({

    username:   String,
    password:   String

});


UsuariosSchema.methods.encryptPass = (password) => {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));

}


UsuariosSchema.methods.validatePass = (young, old) => {

    return bcrypt.compareSync(young, old);

}


UsuariosSchema.methods.createToken = (username, password) => {

    return jwt.sign({'username': username, 'password': password}, 'secret');

}


module.exports = mongoose.model('Usuarios', UsuariosSchema);