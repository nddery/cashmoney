'use strict';

// Modules & Dependencies
angular.module('cm.services', []);
angular.module('cm.directives', ['d3', 'cm.services', 'angucomplete', 'modules.colorPicker', 'modules.forms']);
angular.module('cm.controllers', ['cm.services', 'ui.bootstrap']);

// Declare app level module which depends on filters, and services
angular.module('cm', [
  'ngRoute'
  ,'d3'
  ,'angucomplete'
  ,'modules.colorPicker'
  ,'modules.forms'
  ,'ui.bootstrap'
  ,'cm.services'
  ,'cm.directives'
  ,'cm.controllers'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/cashmoney.html'
    ,controller: 'CashmoneyCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});
});
