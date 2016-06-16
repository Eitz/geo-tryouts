var express = require('express');
var router = express.Router();

var db = require('../db');
db = db.postgres;

// root: /api/ocorrencias/
router.get('/kml', kmlExport);

// add query functions
function kmlExport (req, res, next) {
  
	db.any('SELECT b.nome, count(o.id), st_askml(b.geometria) as xml'
		+	' FROM bairro b'
		+	' LEFT JOIN ocorrencia o ON st_within(o.geometria, b.geometria)'
		+	' GROUP BY b.nome, b.geometria'
		+	' ORDER BY count DESC;')
	.then(success)
	.catch(function (err) {
		return next(err);
	});

	function success (data) {

		var maximum = 0;

		function regraDeTres (x, a, b) {
			// x - y
			// a - b
			var y = parseInt(x * b / a);
			return y;
		}

		function decToHex (x) {
			return x.toString(16).toUpperCase();
		}

		data.forEach(function(element) {
			if (element.count > maximum) {
				maximum = element.count;
			}
			element.color = '#FFFFFFFF';
		}, this);

		data.forEach(function(element) {
			element.color = '#' + decToHex(regraDeTres(element.count, maximum, 255)) + '0000FF';
		}, this);

		res.render('kml', { bairros: data });
	}
}

module.exports = router;