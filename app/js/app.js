'use strict';

// Modules & Dependencies
angular.module('cm.filters', []);
angular.module('cm.services', []);
angular.module('cm.directives', ['d3']);
angular.module('cm.controllers', []);

// Declare app level module which depends on filters, and services
angular.module('cm', [
  'ngRoute'
  ,'d3'
  ,'cm.filters'
  ,'cm.services'
  ,'cm.directives'
  ,'cm.controllers'
  ,'angucomplete'
  ,'modules.colorPicker'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/cashmoney.html'
    ,controller: 'CashmoneyCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
