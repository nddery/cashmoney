'use strict';
angular.module('cm.controllers').controller('VisualisationCtrl', function($scope, $filter, dataFactory, config, teams) {
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

  // Triggered when Position, Division and (active) Teams change.
  // @TODO: dataNeedUpdate should filter on all active filter.
  //        Currently, if you set a division, then a position - it works.
  //        However, setting a position, then a division, position is ignored.
  //        Instead of passing a type with pointer, we should pass a global
  //        active config of some sort, so instead of filtering a single event,
  //        we filter on all active settings.
  $scope.$on('dataNeedUpdate', function(event, type, pointer) {
    // var activeTeams = getActiveTeamsName();

    // We'll retrieve data to this variables in the switch.
    // var activeTeams;
    var filtering;

    switch (type) {
      case 'division' :
        if (typeof(pointer) !== 'undefined' && pointer.length !== 0)
          teamsFilter(getActiveTeamsName('division', pointer));
        break;

      // case 'position' :
        // if (typeof(pointer) !== 'undefined' && pointer.value.length !== 0) {
          // readyToFilter(dataFactory.filterByPosition());
          // dataFactory.filterByPosition(teams, pointer).then(function(data) {
          //   readyToFilter(data);
          // });
        // }
        // teamsFitler(getActiveTeamsName());
        // break;

      default :
        teamsFilter(getActiveTeamsName());
        break;
    }

    function teamsFilter(active) {
      dataFactory.filterByTeams(active).then(function(activeData){
        // Position filtering needs filteredData to work.
        if (typeof(type) !== 'undefined' && type === 'position')
          if (typeof(pointer) !== 'undefined' && pointer.value.length !== 0)
            activeData = dataFactory.filterByPosition(activeData, pointer);

        $scope.data = activeData;
      });
    }



    // Divison and teams need to work separetaly.
    //
    // If division is changed, team icons should highlight accordingly ?
    //
    //** Order of filtering.
    // filter by active teams
    // filter by division
    // filter by position




    // dataFactory.filterByTeams(activeTeams).then(function(teams){
    //   // If we have a (second) type to filter by.
    //   if ('division' === type) {
    //     if (typeof(pointer) !== 'undefined' && pointer.length !== 0) {
    //       var filteredTeamsByDivision = getActiveTeamsName('division', pointer);
    //       console.log(filteredTeamsByDivision);
    //       // dataFactory.filterByTeams(filteredTeamsByDivision);
    //     }
    //   }
    //   else if ('position' === type) {
    //     if (typeof(pointer) !== 'undefined' && pointer.value.length !== 0)
    //       teams = dataFactory.filterByPosition(teams, pointer);
    //   }

    //   $scope.data = teams;
    // });
  });

  // Returns an array of teams name that are active
  // @TODO: Always run the filter for active: true
  function getActiveTeamsName(type, pointer) {
    // Filter out inactive teams.
    var activeTeams;

    switch (type) {
      case 'division' :
        activeTeams = $filter('filter')(teams, function(o) {
          if (o.division.indexOf(pointer) !== -1 || pointer === 'All') {
            // Setting active state will update the team list.
            o.active = true;
            return true;
          }
          else {
            o.active = false;
            return false;
          }
        });
        break

      default :
        activeTeams = $filter('filter')(
          teams
          ,{active: true}
        );
        break;
    }

    // Get an array of names, not an array of objects.
    var activeTeamsName = [];
    activeTeams.forEach(function(team) {
      activeTeamsName.push(team.name);
    });

    return activeTeamsName;
  }
});
