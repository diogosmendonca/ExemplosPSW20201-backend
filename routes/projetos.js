var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());


let projetos = [
  {
    "nome": "Projeto 1",
    "sigla": "P1",
    "id": 1
  },
  {
    "nome": "Projeto 2",
    "sigla": "P2",
    "id": 2
  }
];


/* GET users listing. */
router.route('/')
.get((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(projetos);
})
.post((req, res, next) => {

  let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
  let projeto = {...req.body, id: proxId};
  projetos.push(projeto);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(projeto);
})

router.route('/:id')
.delete((req, res, next) => {
  
  projetos = projetos.filter(function(value, index, arr){ 
    return value.id != req.params.id;
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.params.id);
})
.put((req, res, next) => {
  
  let index = projetos.map(p => p.id).indexOf(req.params.id);
  projetos.splice(index, 1, req.body);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.body);
})


module.exports = router;
