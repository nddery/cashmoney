'use strict';
angular.module('cm.controllers').controller('PlayerModalCtrl', function($scope, $modalInstance, player, config) {
  $scope.player = player;
  $scope.data   = [];

  var data = [];
  angular.forEach(config.metrics, function(value, key) {
    if ($scope.player.hasOwnProperty(value.name)) {
      data.push({
        name: value.title
        ,value: $scope.player[value.name]
      });
    }
  });
  $scope.data = data;

  $scope.close = function () {
    $modalInstance.close();
  };
});
