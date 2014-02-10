'use strict';

// Declare app level module which depends on filters, and services
angular.module('cm', [
  'ngRoute'
  ,'d3'
  ,'cm.filters'
  ,'cm.services'
  ,'cm.directives'
  ,'cm.controllers'
  ,'modules.colorPicker'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/cashmoney.html'
    ,controller: 'CashmoneyCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
