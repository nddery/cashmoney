'use strict';

/* Controllers */

angular.module('cm.controllers')
  .controller('CashmoneyCtrl', function($scope) {
    $scope.toggleMenu = function() {
      $scope.$broadcast('toggleMenu');
    }
  })

  .controller('PullNavCtrl', function($scope, config, dataFactory) {
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
  })

  .controller('TeamListCtrl', function($scope, teams) {
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

  .controller('VisualisationCtrl', function($scope, $filter, dataFactory, config, teams) {
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

    $scope.$on('dataNeedUpdate', function(event, type, pointer) {
      var filteredTeams = getActiveTeamsName('active', true);
      dataFactory.filterByTeams(filteredTeams).then(function(teams){
        // If we have a (second) type to filter by.
        if ('division' === type) {
          if (typeof(pointer) !== 'undefined' && pointer.length !== 0) {
            var filteredTeamsByDivision = getActiveTeamsName('division', pointer);
            // teams = dataFactory.filterByDivision(filteredTeamsByDivision);
          }
        }
        else if ('position' === type) {
          if (typeof(pointer) !== 'undefined' && pointer.value.length !== 0)
            teams = dataFactory.filterByPosition(teams, pointer);
        }

        $scope.data = teams;
      });
    });

    function getActiveTeamsName(property, value) {
      // Filter out inactive teams.
      var activeTeams = $filter('filter')(
        teams
        ,{active: true}
      );
      // var activeTeams = $filter('dynamicTeamsFilter')(
      //   teams
      //   ,[property, value]
      // );

      // switch (property) {
      //   case ''
      // }
//       // If an additional type was passed, filter again.
//       if (type !== 'undefined') {
//         switch (type) {
//           case 'division' :
//             activeTeams = $filter('filter')(activeTeams, function(team) {
//               console.log(team);
//               if (team.divison.indexOf(pointer) !== -1)
//                 return true;
//               else
//                 return false;
//             });
//             break
//
//           default :
//             break;
//         }
//       }

      // Get an array of names, not an array of objects.
      var activeTeamsName = [];
      activeTeams.forEach(function(team) {
        activeTeamsName.push(team.name);
      });

      return activeTeamsName;
    }
  })
;
