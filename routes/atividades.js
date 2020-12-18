var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Atividades = require('../models/atividades');
const Projeto = require('../models/projetos');
var authenticate = require('../authenticate');

router.use(bodyParser.json());


router.route('/')
.get(authenticate.verifyUser, async (req, res, next) => {

  try{
    const atividadesBanco = await Atividades.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(atividadesBanco);
  }catch(err){
    console.log(err)
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
    
})
.post(authenticate.verifyUser, (req, res, next) => {
    
    Atividades.create(req.body)
    .then((projeto) => {
        console.log('Atividade criada', atividade);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(projeto);
    }, (err) => next(err))
    .catch((err) => next(err));
  
})

module.exports = router;
