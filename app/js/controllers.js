'use strict';

/* Controllers */

angular.module('cm.controllers', [])
  .controller('CashmoneyCtrl', function($scope, $filter, dataService) {
    $scope.toggleMenu = function() {
      $scope.$broadcast('toggleMenu');
    }
  })

  .controller('PullNavCtrl', function($scope, metrics, colors, layouts) {
    var body = angular.element(document.getElementsByTagName('body')[0]);
        body.addClass('cbp-spmenu-push');

    $scope.layouts = layouts;

    $scope.colors = colors;
    $scope.color = {};

    $scope.metricsBarHeight = metrics;
    $scope.metricBarHeight = $scope.metricsBarHeight[3];

    $scope.metricsColor = metrics;
    $scope.metricColor = $scope.metricsColor[4];

    // Broadcast new metrics when they change
    $scope.metricsChanged = function() {
      $scope.$broadcast('metricsUpdated'
                        ,$scope.metricBarHeight
                        ,$scope.metricColor);
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
      $scope.$broadcast('teamsUpdated');
    }

    $scope.toggleAllTeams = function() {
      $scope.$emit('toggleAllTeams');
    }
  })

  .controller('TeamListCtrl', function($scope, dataService) {
    $scope.teams = dataService.getTeams();

    $scope.$on('toggleAllTeams', function() {
      $scope.teams.forEach(function(team) {
        team.active = team.active ? false : true;
      });
      $scope.$broadcast('teamsUpdated');
    });
  })

  .controller('CircularVisualisationCtrl', function($scope, $http, $filter, dataService, colors) {
    var d = {};
    $scope.showDetailPane = function(item) {
      $scope.$apply(function() {
        if (!$scope.showDetailPanel)
          $scope.showDetailPanel = true;
        $scope.detailItem = item;
        console.log(item);
      });
    };

    $http.get('data/data.full.json')
      .success(function(data) {
        // We need a copy for now, until data service is fixed and we can
        // call dataservice.getData();
        // We filter on the copy instead of scope.data.
        d = data;
        $scope.data = data;
      });

    $scope.config = {
      baseColor: colors[0]
      ,metrics: {
      'barHeight': 'plusminus'
      ,'barColor': 'salary'
      }
    }

    $scope.$on('metricsUpdated', function(event, barHeight, barColor) {
      $scope.config.metrics = {
        'barHeight': barHeight.name
        ,'barColor': barColor.name
      }
    });

    $scope.$on('colorPickerUpdated', function(event, color) {
      $scope.config.baseColor = color;
    });

    $scope.$on('teamsUpdated', function() {
      var activeTeamsName = getActiveTeamsName();

      // Filter out all non-active teams.
      $scope.data = $filter('filter')(d, function(v) {
        if (activeTeamsName.indexOf(v.name) !== -1)
          return true;
        else
          return false;
      });
    });

    function getActiveTeamsName() {
      // Filter out inactive teams.
      var activeTeams = $filter('filter')(
        dataService.getTeams()
        ,{active:true}
      );

      // Get an array of names, not an array of objects.
      var activeTeamsName = [];
      activeTeams.forEach(function(team) {
        activeTeamsName.push(team.name);
      });

      return activeTeamsName;
    }
  })
;
