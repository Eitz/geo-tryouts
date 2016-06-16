var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:postgres@127.0.0.1:5432/dados_geograficos';
var postgres = pgp(connectionString);


module.exports = {
	postgres: postgres
};