'use strict';
angular.module('cm.controllers').controller('PullNavCtrl', function($scope, config, dataFactory) {
  var body = angular.element(document.getElementsByTagName('body')[0]);
      body.addClass('cbp-spmenu-push');

  $scope.players = {};
  dataFactory.getAllPlayers().then(function(players){
    $scope.players = players;
  });

  $scope.divisions = config.divisions;
  $scope.division  = config.divisions[0];

  $scope.layouts = config.layouts;
  $scope.layout  = config.layouts[0].name

  $scope.positions = config.positions;
  $scope.position  = config.positions[0];

  $scope.metricsBarHeight = config.metrics;
  $scope.metricBarHeight  = $scope.metricsBarHeight[4];

  $scope.metricsColor = config.metrics;
  $scope.metricColor  = $scope.metricsColor[5];

  // Broadcast new metrics when they change
  $scope.metricsChanged = function() {
    $scope.$broadcast('metricsUpdated'
                      ,$scope.metricBarHeight
                      ,$scope.metricColor);
  }

  $scope.positionsChanged = function() {
    $scope.$broadcast('dataNeedUpdate', 'position', $scope.position);
  }

  $scope.divisionChanged = function() {
    $scope.$broadcast('dataNeedUpdate', 'division', $scope.division);
  }

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
