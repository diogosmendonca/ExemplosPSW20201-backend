var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Atividades = require('../models/atividades');
const Projeto = require('../models/projetos');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());


router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {

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
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    
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
