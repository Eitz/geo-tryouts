var express = require('express');
var router = express.Router();

var db = require('../db');
db = db.postgres;

// root: /api/ocorrencias/
router.get('/por-bairro', porBairro);

function porBairro (req, res, next) {
  
  db.any('SELECT b.nome, count(o.id)'
		+	' FROM bairro b'
		+ ' JOIN ocorrencia o ON st_within(o.geometria, b.geometria)'
		+ ' GROUP BY b.nome'
		+	' ORDER BY count DESC;')
  .then(function (data) {
    res.status(200).json({
      status: 'success',
      data: data
    });
  })
  .catch(function (err) {
    return next(err);
  });

}

module.exports = router;