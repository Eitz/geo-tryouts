'use strict';

/**
 * @ngdoc function
 * @name geoApp.controller:ExportsCtrl
 * @description
 * # ExportsCtrl
 * Controller of the geoApp
 */
angular.module('geoApp')
  .controller('ExportsCtrl', function ($scope, $http) {
    $http.get("http://localhost:3000/api/exports/kml")
    .then(function(response) {
        $scope.kml = response.data;
    });
  });
