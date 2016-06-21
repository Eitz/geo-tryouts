var express = require('express');
var router = express.Router();

var db = require('../db');
db = db.postgres;

// root: /api/ocorrencias/
router.get('/', getAll);
router.post('/', create);
router.get('/:id', get);
router.put('/:id', update);
router.options('/:id', options);
router.delete('/:id', remove);

function options (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
}

// add query functions
function getAll(req, res, next) {
  db.any('SELECT'
          + ' o.id,'
          + ' o.descricao,'
          + ' st_astext(o.geometria) as ponto,'
          + ' st_x(o.geometria) as x,'
          + ' st_y(o.geometria) as y,'
          + ' o.tipo_id,'
          + ' tipo.nome as tipo'
          + ' FROM ocorrencia o'
          + ' JOIN ocorrencia_tipo tipo ON o.tipo_id = tipo.id;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function get(req, res, next) {
  var ocorrenciaID = parseInt(req.params.id);
  db.one('SELECT'
          + ' o.id,'
          + ' o.descricao,'
          + ' st_astext(o.geometria) as ponto,'
          + ' st_x(o.geometria) as x,'
          + ' st_y(o.geometria) as y,'
          + ' o.tipo_id,'
          + ' tipo.nome as tipo'
          + ' FROM ocorrencia o'
          + ' JOIN ocorrencia_tipo tipo ON o.tipo_id = tipo.id' 
          + ' WHERE o.id = $1;', ocorrenciaID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function create(req, res, next) {
  console.log(req.body);
  req.body.x = req.body.ponto.x * 1;
  req.body.y = req.body.ponto.y * 1;
  db.none('INSERT INTO ocorrencia (descricao, tipo_id, geometria) VALUES (' 
    + '${descricao},'
    + '${tipo_id},'
  	+ 'st_geomfromtext(\'POINT(${x} ${y})\', 4326));',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function update(req, res, next) {
  req.body.id = parseInt(req.params.id);
  db.none('UPDATE ocorrencia SET' 
    + ' descricao=${descricao},'
    + ' tipo_id=${tipo_id},'
  	+ ' geometria=st_geomfromtext(\'POINT(${ponto.x} ${ponto.y})\', 4326)'
    + ' WHERE id = ${id};',
   req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function remove(req, res, next) {
  var ocorrenciaID = parseInt(req.params.id);
  db.result('DELETE FROM ocorrencia WHERE id = $1', ocorrenciaID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = router;