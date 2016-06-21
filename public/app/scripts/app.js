'use strict';

/**
 * @ngdoc overview
 * @name geoApp
 * @description
 * # geoApp
 *
 * Main module of the application.
 */
angular
  .module('geoApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/bairros', {
        templateUrl: 'views/bairros.html',
        controller: 'BairrosCtrl',
        controllerAs: 'Bairros'
      })
      .when('/ocorrencias', {
        templateUrl: 'views/ocorrencias.html',
        controller: 'OcorrenciasCtrl',
        controllerAs: 'Ocorrencias'
      })
      .when('/relatorios', {
        templateUrl: 'views/relatorios.html',
        controller: 'RelatoriosCtrl',
        controllerAs: 'Relatorios'
      })
      .when('/export-kml', {
        templateUrl: 'views/exports.html',
        controller: 'ExportsCtrl',
        controllerAs: 'Exports'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
