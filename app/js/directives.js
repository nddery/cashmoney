'use strict';
angular.module('cm.directives')
  .directive('logo', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/logo.html'
    }
  })

  .directive('autocompletePlayers', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/autocomplete-players.html'
    }
  })

  .directive('layouts', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/layouts.html'
    }
  })

  .directive('positions', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/positions.html'
    }
  })

  .directive('metrics', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/metrics.html'
    }
  })

  .directive('divisions', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/divisions.html'
    }
  })

  .directive('pullNav', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/pull-nav.html'
    }
  })

  .directive('teamList', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/team-list.html'
    }
  });
