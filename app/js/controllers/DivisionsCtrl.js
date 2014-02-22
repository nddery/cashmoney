'use strict';
angular.module('cm.controllers').controller('DivisionsCtrl', function($scope, state, config) {
  $scope.divisions = config.divisions;
  $scope.division  = config.divisions[0];
  // Should also set it in the state service, so everyone knows.
  state.setCurrentStateProp('division', $scope.division);

  $scope.divisionChanged = function() {
    state.setCurrentStateProp('division', $scope.division);
    $scope.$broadcast('dataNeedUpdate');
  }
});
