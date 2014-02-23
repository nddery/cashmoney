'use strict';
angular.module('cm.controllers').controller('LogoCtrl', function($scope, $window) {
  // Max size of logo is radius. Position it in the center.
  var aWindow = angular.element($window)
      ,margin = 20
      ,width
      ,height
      ,radius;

  function setLogoWidth() {
    width  = aWindow[0].innerWidth - margin;
    height = aWindow[0].innerHeight - margin;
    radius = Math.min(width, height) / 2;;

    $scope.logoStyle = {width: radius + 'px'};
  }
  setLogoWidth();

  $scope.displayStyle = {display: 'block'};

  aWindow.bind('resize', function() {
    setLogoWidth();
  });
});
