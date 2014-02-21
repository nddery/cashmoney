'use strict';
angular.module('cm.controllers').controller('AutocompletePlayersCtrl', function($scope, dataFactory) {
  $scope.players = {};
  dataFactory.getAllPlayers().then(function(players){
    $scope.players = players;
  });
});
