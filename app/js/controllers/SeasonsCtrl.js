'use strict';
angular.module('cm.controllers').controller('SeasonsCtrl', function($scope, state, config) {
  $scope.seasons = config.seasons;
  $scope.season  = config.seasons[0];
  // Should also set it in the state service, so everyone knows.
  state.setCurrentStateProp('season', $scope.season.id);

  $scope.seasonChanged = function() {
    state.setCurrentStateProp('season', $scope.season.id);
    $scope.$broadcast('dataNeedReload');
  }
});
