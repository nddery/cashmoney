'use strict';
angular.module('cm.controllers').controller('PlayerModalCtrl', function($scope, $modalInstance, dataFactory, player, config, teams) {
  $scope.player = player;
  $scope.data   = [];

  angular.forEach(teams, function(v, k) {
    if (v.name.indexOf(player.team) !== -1)
      $scope.team = v.title;
  });

  angular.forEach(config.positions, function(v, k) {
    if (v.value.length === 1 && v.value.indexOf(player.pos) !== -1)
      $scope.position = v.name;
  });

  var data = [];
  dataFactory.getLeagueHighsLows(config.metrics).then(function(hl) {
    angular.forEach(config.metrics, function(value, key) {
      if ($scope.player.hasOwnProperty(value.name)) {
        data.push({
           title: value.title
          ,subtitle: $scope.player[value.name]
          ,ranges: [hl[value.name].low, hl[value.name].high]
          ,measures: [$scope.player[value.name]]
          ,markers: [$scope.player[value.name]]
        });
      }
    });

    $scope.data = data;
  });

  $scope.close = function () {
    $modalInstance.close();
  };
});
