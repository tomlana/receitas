var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ReceitasSchema = new Schema({

    titulo:         String,
    corpo:	        Array,
    usuario_id:     String
});


module.exports = mongoose.model('Receitas', ReceitasSchema);
