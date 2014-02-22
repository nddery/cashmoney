'use strict';
angular.module('cm.controllers').controller('PositionsCtrl', function($scope, config, state) {
  $scope.positions = config.positions;
  $scope.position  = config.positions[0];
  state.setCurrentStateProp('position', $scope.position);

  $scope.positionsChanged = function() {
    state.setCurrentStateProp('position', $scope.position);
    $scope.$broadcast('dataNeedUpdate');
  }
});
