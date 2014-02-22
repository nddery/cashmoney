'use strict';
angular.module('cm.controllers').controller('TeamListCtrl', function($scope, teams, state) {
  $scope.teams = teams;

  setEnabled();
  $scope.$on('divisionUpdated', function(){
    setEnabled();
  });

  function setEnabled() {
    var currentDivision = state.getCurrentState('division');
    if (currentDivision === 'Custom')
      $scope.enabled = true;
    else
      $scope.enabled = false;
  }

  $scope.update = function(team) {
    if ($scope.enabled) {
      team.active = team.active ? false : true;
      $scope.$broadcast('dataNeedUpdate');
    }
  }

  $scope.toggleAllTeams = function() {
    if ($scope.enabled) {
      $scope.teams.forEach(function(team) {
        team.active = team.active ? false : true;
      });
      $scope.$broadcast('dataNeedUpdate');
    }
  }
});
