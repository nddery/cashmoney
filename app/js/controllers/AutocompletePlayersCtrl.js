'use strict';
angular.module('cm.controllers').controller('AutocompletePlayersCtrl', function($scope, dataFactory) {
  $scope.players = {};
  dataFactory.getAllPlayers().then(function(players){
    $scope.players = players;
  });

  $scope.selectedPlayer;
  $scope.$watch('selectedPlayer', function() {
    if ($scope.selectedPlayer !== null && typeof $scope.selectedPlayer !== 'undefined')
      $scope.$emit('shouldDisplayPlayerModal', $scope.selectedPlayer.originalObject);
   });
});
