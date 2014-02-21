'use strict';
angular.module('cm.controllers').controller('PullNavCtrl', function($scope, config, dataFactory) {
  var body = angular.element(document.getElementsByTagName('body')[0]);
      body.addClass('cbp-spmenu-push');

  $scope.displayMenu = false;

  $scope.$on('toggleMenu', function() {
    if ( $scope.displayMenu ) {
      $scope.displayMenu = false;
      body.removeClass('cbp-spmenu-push-toright');
    }
    else {
      $scope.displayMenu = true;
      body.addClass('cbp-spmenu-push-toright');
    }
  });

  $scope.update = function() {
    $scope.$broadcast('dataNeedUpdate');
  }

  $scope.toggleAllTeams = function() {
    $scope.$emit('toggleAllTeams');
  }
});
