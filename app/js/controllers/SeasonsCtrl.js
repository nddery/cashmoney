'use strict';
angular.module('cm.controllers').controller('SeasonsCtrl', function($scope, state, config) {
  $scope.seasons = config.seasons;
  $scope.season  = config.seasons[config.seasons.length - 1];
  // Should also set it in the state service, so everyone knows.
  state.setCurrentStateProp('season', $scope.season.id);

  $scope.seasonChanged = function() {
    state.setCurrentStateProp('season', $scope.season.id);
    $scope.$broadcast('dataNeedReload');
  }
});
