'use strict';

/**
 * @ngdoc function
 * @name geoApp.controller:BairrosCtrl
 * @description
 * # BairrosCtrl
 * Controller of the geoApp
 */
angular.module('geoApp')
  .controller('BairrosCtrl', function ($scope, $http) {

    $scope.bairrosCadastrados = [];

    $scope.getBairros = function () {
      $http.get("http://localhost:3000/api/bairros/")
      .then(function(response) {
          $scope.bairrosCadastrados = response.data.data;
          // console.log(response.data);
      });
    }

    $scope.getBairros();
    
    $scope.nomeBairro;
    $scope.points = [ { x : undefined, y: undefined } ];
    $scope.addPoint = function () {
      var newPoint = { x : undefined, y: undefined };
      $scope.points.push(newPoint)
    }
    $scope.removePoint = function (index) {
      $scope.points.splice(index);
      if ($scope.points.length <= 0) {
        $scope.addPoint();
      }
    }
    $scope.clearForm = function () {
      $scope.nomeBairro = "";
      $scope.points = [];
      $scope.addPoint();      
    }

    $scope.saveBairro = function () {
      var data = {
        nome: $scope.nomeBairro,
        pontos: $scope.points
      }
      console.log("saving", data);
      $http.post("http://localhost:3000/api/bairros/", data).then(function(response) {
          console.log("saved", response);
          $scope.getBairros();
          $scope.clearForm();
      }, function (err) {
        console.log(err);
      });
    }

    $scope.removeBairro = function (bairro) {
      $http.delete('http://localhost:3000/api/bairros/' + bairro.id).then(function(response) {
          console.log("deleted", response);
          $scope.getBairros();
      }, function (err) {
        console.log(err);
      });
    }

  });
