'use strict';

/* Controllers */

angular.module('cm.controllers')
  .controller('CashmoneyCtrl', function($scope, $filter, dataFactory) {
    $scope.toggleMenu = function() {
      $scope.$broadcast('toggleMenu');
    }
  })

  .controller('PullNavCtrl', function($scope, config) {
    var body = angular.element(document.getElementsByTagName('body')[0]);
        body.addClass('cbp-spmenu-push');

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
      $scope.$broadcast('dataNeedUpdate', $scope.position);
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
  })

  .controller('TeamListCtrl', function($scope, dataFactory, teams) {
    $scope.teams = teams;

    $scope.$on('toggleAllTeams', function() {
      $scope.teams.forEach(function(team) {
        team.active = team.active ? false : true;
      });
      $scope.$broadcast('dataNeedUpdate');
    });
  })

  .controller('ConsoleCtrl', function($scope, dataFactory) {
    $scope.data = {};
    var i = 0;

    function refreshData() {
      dataFactory.getAllData().then(function(data){
        $scope.data = data;
        if(i === 0) {
          refreshData();
          i++;
        }
      },
      function(errorMessage){
        $scope.error = errorMessage;
      });
    };

    refreshData();
  })

  .controller('CircularVisualisationCtrl', function($scope, $http, $filter, dataFactory, config, teams) {
    var d = {};
    $scope.showDetailPane = function(item) {
      $scope.$apply(function() {
        if (!$scope.showDetailPanel)
          $scope.showDetailPanel = true;
        $scope.detailItem = item;
        console.log(item);
      });
    };

    $scope.data = {};
    dataFactory.getAllData().then(function(data){
      d = data;
      $scope.data = data;
    });

    $scope.config = {
      baseColor: config.colors[0]
      ,position: config.positions[0]
      ,metrics: {
        'barHeight': 'pm'
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

    $scope.$on('dataNeedUpdate', function(event, position) {
      var filteredTeams = dataFactory.filterByTeams(getActiveTeamsName());

      // Filter out by position, if we have one.
      if (typeof(position) !== 'undefined' && position.value.length !== 0)
        filteredTeams = dataFactory.filterByPosition(filteredTeams, position);

      $scope.data = filteredTeams;
    });

    function getActiveTeamsName() {
      // Filter out inactive teams.
      var activeTeams = $filter('filter')(
        teams
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
