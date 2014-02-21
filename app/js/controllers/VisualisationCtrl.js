'use strict';
angular.module('cm.controllers').controller('VisualisationCtrl', function($scope, $filter, dataFactory, config, teams) {
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
});
