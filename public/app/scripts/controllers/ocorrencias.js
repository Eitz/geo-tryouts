'use strict';

/**
 * @ngdoc function
 * @name geoApp.controller:OcorrenciasCtrl
 * @description
 * # OcorrenciasCtrl
 * Controller of the geoApp
 */
angular.module('geoApp')
  .controller('OcorrenciasCtrl', function ($scope, $http) {
    $scope.ocorrenciasCadastradas = [];
    $scope.descricaoCorrencia;
    $scope.point = { x : undefined, y: undefined };
    $scope.tipoOcorrencia = 0;

    $scope.getOcorrencias = function () {
      $http.get("http://localhost:3000/api/ocorrencias/")
      .then(function(response) {
          $scope.ocorrenciasCadastradas = response.data.data;
          // console.log(response.data);
      });
    }

    $scope.getOcorrencias();
    $scope.clearForm = function () {
      $scope.descricaoCorrencia = "";
      $scope.points = { x : undefined, y: undefined };
    }

    $scope.saveOcorrencia = function () {
      var data = {
        descricao: $scope.descricaoOcorrencia,
        ponto: $scope.point,
        tipo_id: $scope.tipoOcorrencia
      }
      console.log("saving", data);
      $http.post("http://localhost:3000/api/ocorrencias/", data).then(function(response) {
          console.log("saved", response);
          $scope.getOcorrencias();
          $scope.clearForm();
      }, function (err) {
        console.log(err);
      });
    }

    $scope.removeOcorrencia = function (ocorrencia) {
      $http.delete('http://localhost:3000/api/ocorrencias/' + ocorrencia.id).then(function(response) {
          console.log("deleted", response);
          $scope.getOcorrencias();
      }, function (err) {
        console.log(err);
      });
    }
  });
