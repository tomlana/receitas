var Usuarios = require('../models/usuarios');

exports.authorize = (token, resp) => {

    Usuarios.findOne({'token': token}, (error, usuarios) => {

        if (error) {

            resp(false);

        } else if (usuarios) {

            resp(true);

        } else {

            resp(false);

        }
        

    });

}

exports.usuariosData = (token, id, res) => {

    Usuarios.findOne({'token': token}, (error, usuarios) => {

        if (error) {

            res.send(error.message);

        } else if (usuarios) {

                if (usuarios.id === id) {

                    res.send(usuarios);

                } else {

                    res.sendStatus(403);

                }

        } else {

            res.sendStatus(400);

        }

    });
    

}


exports.insert = (req, res) => {

    req.assert('username', 'Necessário indicar um username').notEmpty();
    req.assert('password', 'Insira a senha desejada').notEmpty();

    var error = req.validationErrors();
    if (error) {

        res.sendStatus(400).send(error.message);

    } else {

        Usuarios.findOne({'username': req.body.username}, (error, usuarios) => {

                if (error) {

                    res.sendStatus(412).send(error.message);

                } else if (usuarios) {

                    res.send('Já existe um usuário com este username!');

                } else {

                    let usuarios = new usuarios();

                    usuarios.username = req.body.username;
                    usuarios.password = usuarios.encryptPass(req.body.password);
                    usuarios.token = usuarios.createToken(req.body.username, req.body.password);
                    
                    usuarios.save((error, usuarios) => {

                        if (error) {

                            res.sendStatus(412).send(error.message);
                            
                        } else {

                            res.sendStatus(201);

                        }

                    });


                }

            })


    }


}

exports.auth = (req, res) => {

    req.assert('username', 'Insira o username').notEmpty();
    req.assert('password', 'Insira a senha').notEmpty();

    var error = req.validationErrors();
    if (error) {

        res.sendStatus(400).send(error.message);

    } else {

            Usuarios.findOne({'username': req.body.username}, (error, usuarios) => {

                if (error) {

                    res.send(error.message);

                } else if (usuarios) {

                    if (usuarios.validatePass(req.body.password, usuarios.password)) {
                       
                        res.send(usuarios.token);

                    } else {

                        res.send('Senha incorreta');

                    }

                } else {

                    res.sendStatus(404)

                }

            })


    }
    
}


exports.update = (token, id, req, res) => {

    req.assert('usernaname', 'Insira o username').notEmpty();
    req.assert('password', 'Insira a senha').notEmpty();

    var error = req.validationErrors();

    if (error) {

        res.sendStatus(400).send(error.message);

    } else {

        Usuarios.findOne({'token': token}, (error, usuarios) => {

                if (error) {

                    res.send(error.message);

                } else if (usuarios) {

                        if (usuarios._id == id) {

                            req.body.password = usuarios.encryptPass(req.body.password);

                            usuarios.update({_id: id}, req.body, (error, usuarios) => {

                                if (error) {

                                    res.sendStatus(400).send(error.message);

                                } else {

                                    res.sendStatus(204);

                                }
                            })

                    } else {

                        res.sendStatus(403);

                    }

                } else {

                    res.sendStatus(400);

                }

            });
            

    }

}


exports.delete = (token, id, res) => {

    Usuarios.findOne({'token': token}, (error, usuarios) => {

        if (error) {

            res.send(error.message);

        } else if (usuarios) {
            
                if (usuarios.id === id) {

                    usuarios.remove({_id: id}, (error, usuarios) => {

                        if (error) {

                            res.sendStatus(400).send(error.message);

                        } else {

                            res.sendStatus(204);

                        }
                    })

            } else {

                res.sendStatus(403);

            }

        } else {

            res.sendStatus(400);

        }

    });


}
