'use strict';

/* Controllers */

angular.module('cm.controllers', [])
  .controller('CashmoneyCtrl', function($scope, $filter, dataService) {
    $scope.toggleMenu = function() {
      $scope.$broadcast('toggleMenu');
    }

    // $scope.$on('teamsUpdated', function() {
      // $scope.$emit('teamsUpdated');
      // Filter out inactive teams.
      // console.log($filter('filter')(dataService.teams(),{active:true}));
    // });
  })

  .controller('PullNavCtrl', function($scope) {
    var body = angular.element(document.getElementsByTagName('body')[0]);
        body.addClass('cbp-spmenu-push');

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
  })

  .controller('TeamListCtrl', function($scope, dataService) {
    $scope.teams = dataService.getTeams();

    $scope.update = function() {
      $scope.$broadcast('teamsUpdated');
    }
  })

  .controller('CircularVisualisationCtrl', function($scope, $http, $filter, dataService) {
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

        console.log(d);
      });

    $scope.$on('teamsUpdated', function() {
      // Filter out inactive teams.
      var activeTeams = $filter('filter')(dataService.getTeams(),{active:true});

      // Get an array of names, not an array of objects.
      var activeTeamsName = [];
      activeTeams.forEach(function(team) {
        activeTeamsName.push(team.name);
      });

      // Filter out all non-active teams.
      $scope.data = $filter('filter')(d, function(v) {
        if (activeTeamsName.indexOf(v.name) !== -1)
          return true;
        else
          return false;
      });
    });
  })
;
