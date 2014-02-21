'use strict';
angular.module('cm.controllers').controller('DivisionsCtrl', function($scope, config) {
  $scope.divisions = config.divisions;
  $scope.division  = config.divisions[0];

  $scope.divisionChanged = function() {
    $scope.$broadcast('dataNeedUpdate', 'division', $scope.division);
  }
});
