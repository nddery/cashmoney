'use strict';
angular.module('cm.controllers').controller('PositionsCtrl', function($scope, config) {
  $scope.positions = config.positions;
  $scope.position  = config.positions[0];

  $scope.positionsChanged = function() {
    $scope.$broadcast('dataNeedUpdate', 'position', $scope.position);
  }
});
