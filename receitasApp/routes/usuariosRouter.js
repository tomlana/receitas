var express = require('express');
var router = express.Router();
var usuariosController = require('../controllers/usuariosController');


function getToken(req, res, next) {

    var header = req.headers['Autorização'];

    if (typeof header !== 'Não definido') {

        res.token = header;
        next();

    } else {

        res.sendStatus(403);

    }

}


router.post('/auth', (req, res) => {

    usuariosController.auth(req, res);

})


router.get('/:id', getToken, (req, res) => {

    usuariosController.userData(res.token, req.params.id, res);
    
})


router.post('/', (req, res) => {

    usuariosController.insert(req, res);
    
})


router.put('/:id', getToken, (req, res) => {

    usuariosController.update(res.token, req.params.id, req, res);

})


router.delete('/:id', getToken, (req, res) => {

    usuariosController.delete(res.token, req.params.id, res);

})


module.exports = router;
