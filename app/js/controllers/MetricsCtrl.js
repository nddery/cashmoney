'use strict';
angular.module('cm.controllers').controller('MetricsCtrl', function($scope, config) {
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
});
