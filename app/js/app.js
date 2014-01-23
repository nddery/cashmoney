'use strict';

// Declare app level module which depends on filters, and services
angular.module('cm', [
  'ngRoute'
  ,'cm.filters'
  ,'cm.services'
  ,'cm.directives'
  ,'cm.controllers'
  ,'d3'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/cashmoney.html'
    ,controller: 'CashmoneyCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
