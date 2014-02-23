'use strict';
angular.module('cm.controllers').controller('PlayerModalCtrl', function($scope, $modalInstance, player) {
  $scope.player = player.player;

  $scope.close = function () {
    $modalInstance.close();
  };
});
