var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Projetos = require('../models/projetos');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {

  try{
    const projetosBanco = await Projetos.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(projetosBanco);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
    
})
.post((req, res, next) => {
  
  Projetos.create(req.body)
  .then((projeto) => {
      console.log('Projeto criado ', projeto);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(projeto);
  }, (err) => next(err))
  .catch((err) => next(err));

})

router.route('/:id')
.get(async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Projetos.findById(req.params.id);
    if(resp != null){
      res.statusCode = 200;
      res.json(resp);
    }else{
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  
  }catch(errParam){
    console.log(errParam);
    res.statusCode = 404;
    res.json({});
  }  

})
.delete((req, res, next) => {
  
  Projetos.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));


})
.put((req, res, next) => {
  
  Projetos.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((projeto) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(projeto);
  }, (err) => next(err))
  .catch((err) => next(err));

})


module.exports = router;
