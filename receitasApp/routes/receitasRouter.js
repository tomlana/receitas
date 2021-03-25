var express = require('express');
var router = express.Router();
var receitasController = require('../controllers/receitasController');
var usuariosController = require('../controllers/usuariosController');


function getToken(req, res, next) {

    var header = req.headers['Autorização'];

    //
    if (typeof header !== 'Não definido') {

        res.token = header;
        next();

    } else {

        res.sendStatus(403);

    }

}


router.get('/', (req, res) => {
    
    receitasController.receitasList(req, res);

});


router.get('/:id', (req, res) => {

    receitasController.receitasId(req, res);

})


router.post('/', getToken, (req, res) => {

    var token = res.token;
    
    usuariosController.authorize(token, (resp) => {

        if (resp === true) {

            receitasController.insert(req, res);

        } else {

            res.sendStatus(403);

        }

    });

})


router.put('/:id', getToken, (req, res) => {

    var token = res.token;

    usuariosController.authorize(token, (resp) => {

        if (resp === true) {

            receitasController.update(req, res);

        } else {

            res.sendStatus(403);

        }

    });

})


router.delete('/:id', getToken, (req, res) => {

    var token = res.token;

    usuariosController.authorize(token, (resp) => {

        if (resp === true) {

            receitasController.delete(req, res);

        } else {

            res.sendStatus(403);

        }

    });

})


module.exports = router;
