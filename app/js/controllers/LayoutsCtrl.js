'use strict';
angular.module('cm.controllers').controller('LayoutsCtrl', function($scope, config) {
  $scope.layouts = config.layouts;
  $scope.layout  = config.layouts[0].name
});
