'use strict';
angular.module('cm.controllers').controller('MetricsCtrl', function($scope, config, state) {
  $scope.metricsBarHeight = config.metrics;
  $scope.metricBarHeight  = $scope.metricsBarHeight[4];

  $scope.metricsColor = config.metrics;
  $scope.metricColor  = $scope.metricsColor[5];

  setMetricsState();

  // Broadcast new metrics when they change
  $scope.metricsChanged = function() {
    setMetricsState();
    $scope.$broadcast('stateModified');
  }

  function setMetricsState() {
    state.setCurrentStateProp('metrics', {
      'barHeight': $scope.metricBarHeight.name
      ,'barColor': $scope.metricColor.name
    });
  }
});
