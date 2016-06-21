'use strict';

/**
 * @ngdoc function
 * @name geoApp.controller:RelatoriosCtrl
 * @description
 * # RelatoriosCtrl
 * Controller of the geoApp
 */
angular.module('geoApp')
  .controller('RelatoriosCtrl', function ($scope, $http) {
    
    $scope.relatorio = [];

    $http.get("http://localhost:3000/api/relatorios/por-bairro")
    .then(function(response) {
        $scope.relatorio = response.data.data;
        // console.log(response.data);
    });
  });
