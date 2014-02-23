'use strict';
angular.module('cm.controllers').controller('CashmoneyCtrl', function($scope, $modal) {
  $scope.toggleMenu = function() {
    $scope.$broadcast('toggleMenu');
  }

  $scope.$on('shouldDisplayPlayerModal', function(event, data) {
    if (data !== null && data !== 'undefined') {
      var modalInstance = $modal.open({
        templateUrl: 'partials/modal-player.html',
        controller: 'PlayerModalCtrl',
        resolve: {
          player: function () {
            return data;
          }
        }
      });
    }
  });
});
