'use strict';
angular.module('cm.controllers').controller('TeamListCtrl', function($scope, teams) {
  $scope.teams = teams;

  $scope.$on('toggleAllTeams', function() {
    $scope.teams.forEach(function(team) {
      team.active = team.active ? false : true;
    });
    $scope.$broadcast('dataNeedUpdate');
  });
});
