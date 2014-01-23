'use strict';

/* Controllers */

angular.module('cm.controllers', [])
  .controller('CashmoneyCtrl', function($scope, $filter, dataService) {
    $scope.toggleMenu = function() {
      $scope.$broadcast('toggleMenu');
    }

    $scope.$on('teamsUpdated', function() {
      // Filter out inactive teams.
      console.log($filter('filter')(dataService.teams(),{active:true}));
    });
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
      $scope.$emit('teamsUpdated');
    }
  })

  .controller('CircularVisualisationCtrl', function($scope, $http) {
    $scope.showDetailPane = function(item) {
      $scope.$apply(function() {
        if (!$scope.showDetailPanel)
          $scope.showDetailPanel = true;
        $scope.detailItem = item;
        console.log(item);
      });
    };

    $http.get('data/data.json')
      .success(function(data) {
        $scope.data = data;
      });
  })
;
