'use strict';
angular.module('cm.controllers').controller('VisualisationCtrl', function($scope, $filter, dataFactory, config, state, teams) {
  $scope.config = 0;

  $scope.playerSelected = function(player) {
    if (player !== null && typeof player !== 'undefined')
      $scope.$emit('shouldDisplayPlayerModal', player);
  };

  $scope.data = {};
  dataFactory.getAllData().then(function(data){
    $scope.data = data;
  });

  state.setCurrentStateProp('baseColor', config.colors[0]);
  state.setCurrentStateProp('position', config.positions[0]);
  state.setCurrentStateProp('metrics', {
    'barHeight': 'pm'
    ,'barColor': 'salary'
  });

  $scope.$on('colorPickerUpdated', function(event, color) {
    state.setCurrentStateProp('baseColor', color);
    $scope.config++;
  });

  $scope.$on('stateModified', function() {
    // We use $scope.config like versioning, when state change,
    // update config "version" so the directive know to look
    // for new values in state.
    $scope.config++;
  });

  // Triggered when Position, Division and (active) Teams change.
  $scope.$on('dataNeedUpdate', function() {
    dataFactory.filterByTeams(getActiveTeamsName()).then(function(activeData){
      var currentPosition = state.getCurrentState('position');

      // We also need to filter by position.
      // Position filtering needs filtered data to work.
      if (currentPosition.name !== 'All Skaters') {
        activeData = dataFactory.filterByPosition(activeData, currentPosition);
      }

      $scope.data = activeData;
    });
  });

  // Returns an array of teams name that are active
  function getActiveTeamsName(type, pointer) {
    // Filter out inactive teams.
    var currentState = state.getCurrentState();
    var activeTeams = $filter('filter')(teams, function(team) {
      // Division is NOT set to All or Custom - so filter by it.
      if (currentState.division !== 'All' && currentState.division !== 'Custom') {
        if (team.division.indexOf(currentState.division) !== -1) {
          team.active = true;
          return true;
        }
        else {
          team.active = false;
          return false;
        }
      }
      // Division is set to all, so just show them all.
      else if (currentState.division === 'All') {
        team.active = true;
        return true;
      }
      // Division is probably set to Custom, so use active property.
      else {
        if (team.active === true) {
          // team.active = true;
          return true;
        }
        else {
          return false
        }
      }
    });

    // Get an array of names, not an array of objects.
    var activeTeamsName = [];
    activeTeams.forEach(function(team) {
      activeTeamsName.push(team.name);
    });

    return activeTeamsName;
  }
});
