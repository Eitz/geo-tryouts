var express = require('express');
var router = express.Router();

var db = require('../db');
db = db.postgres;

// root: /api/bairros/
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
  db.any('SELECT id, nome, st_astext(geometria) as geometria FROM bairro;')
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
  var bairroID = parseInt(req.params.id);
  db.one('SELECT nid, nome, st_astext(geometria) as geometria FROM bairro WHERE id = $1;', bairroID)
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

  var points = [];

  console.log(req.body.nome);
  console.log(req.body.pontos);

  req.body.pontos.forEach(function(point) {
    points.push(point.x + ' ' + point.y);
  }, this);

  if (points.length <= 3) {
    var err = new Error("Pontos must be > 3");
    return next(err);
  }

  db.none('INSERT INTO bairro (nome, geometria) VALUES ('
  + '${nome},'
	+ 'st_geomfromtext(\'POLYGON(('+ points.join() +'))\', 4326));',
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

  req.body.id = parseInt(req.params.id);;
  var points = [];
  
  req.body.pontos.forEach(function(point) {
    points.push(point.x + ' ' + point.y);
  }, this);

  if (points.length < 3) {
    var err = new Error("Pontos must be >= 3");
    return next(err);
  }

  db.none('UPDATE bairro SET'
    + ' nome=${nome},'
  	+ ' geometria=st_geomfromtext(\'POLYGON(('+ points.join() +'))\', 4326)'
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
  var bairroID = parseInt(req.params.id);
  db.result('DELETE FROM bairro WHERE id = $1', bairroID)
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
