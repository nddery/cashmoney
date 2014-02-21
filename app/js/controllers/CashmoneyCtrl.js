'use strict';
angular.module('cm.controllers').controller('CashmoneyCtrl', function($scope) {
  $scope.toggleMenu = function() {
    $scope.$broadcast('toggleMenu');
  }
});
