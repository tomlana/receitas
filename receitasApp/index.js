var app = require('./config/app');
const db = require('./config/db');
var receitasController = require('./controllers/receitasController');
var usuariosController = require('./controllers/usuariosController');
var receitasRouter = require('./routes/receitasRouter');
var usuariosRouter = require('./routes/usuariosRouter');


app.get('/', function(req, res) {
    res.redirect('/receitas');
});
app.get('/receitas', function(req, res) {
    res.redirect('/receitas');
});

app.get('/receitas', function(req, res){

    res.end('Bem-vindo ao guia de receitas');
});
app.get('/', function(req, res){
    res.end('Bem-vindo ao guia de receitas');
});

app.use('/receitas/receitas', receitasRouter);


app.use('/receitas/usuarios', usuariosRouter);
