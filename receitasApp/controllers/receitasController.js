var Receitas = require('../models/receitas');


exports.receitasList = (req, res) => {

    Receitas.find({}, (error, receitas) => {

        if (error) {

            res.status(400).send(error.message);

        } else {

            res.send(receitas);

        }

    })

}


exports.receitasId = (req, res) => {

    Receitas.findById({_id: req.params.id}, (error, receitas) => {

        if (error) {

            res.sendStatus(400).send(error.message);

        } else {

            res.send(receitas);

        }

    })

}


exports.insert = (req, res) => {

    req.assert('titulo', 'O Título é necessário').notEmpty();
    req.assert('corpo', 'O Corpo é necessário').notEmpty();
    req.assert('usuario_id', 'O Id do usuário é necessário').notEmpty();

    var error = req.validationErrors();
    if (error) {

        res.sendStatus(400).send(error.message);

    } else {

            const receitas = new Receitas(req.body);
            
            receitas.save((error, receitas) => {
            
                if (error) {

                    res.sendStatus(412).send(error.message);
                    
                } else {

                    res.send(receitas);

                }
            });


    }

}


exports.update = (req, res) => {

    req.assert('titulo', 'O Título é necessário').notEmpty();
    req.assert('corpo', 'Insira o corpo');
    req.assert('usuario_id', 'O Id do usuário é necessário').notEmpty();

    var error = req.validationErrors();
    if (error) {

        res.sendStatus(400).send(error.message);

    } else {

            Receitas.findOneAndUpdate({ _id: req.params.id}, req.body, (error, receitas) => {

                if (error) {

                    res.sendStatus(412).send(error.message);

                } else {

                    res.send(req.body);

                }

            })


    }
}


exports.delete = (req, res) => {

    var id = req.params.id;

    Receitas.remove({_id: req.params.id}, (error, receitas) => {

        if (error) {

            res.sendStatus(400).send(error.message);

        } else {

            res.sendStatus(204);

        }

    });

}
