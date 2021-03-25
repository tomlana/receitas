
var express = require('express');
var bodyParser = require('body-parser');
var expressValidate = require('express-validator');
var app = express();
app.use(expressValidate());
app.set("json spaces", 3);
app.set('name-api', 'receitas');
app.set('versao-api', '1');
app.set("port",3000);
app.listen(app.get('port'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;
 