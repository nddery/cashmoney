'use strict';

/**
 * @Usage
 *
 * Define a value of 'colors' at the app level.
 *
 * angular.module('cm.services', [])
 *   .value('colors', ["#5484ED", "#A4BDFC", "#46D6DB", "#7AE7BF"]);
 *
 * The event 'colorPickerUpdated' is broadcasted when the color change.
 * The selected color is passed as the argument.
 *
 * Place the directive wherever you want.
 *  <ng-color-picker></ng-color-picker>
 */

angular.module('modules.colorPicker', [])
  .directive('ngColorPicker', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope : '@=',
      template: '<table class="color-picker">'
      +           '<tr>'
      +           '<td ng-repeat="color in colorList">'
      +             '<div style="width: 15px; height: 15px; border: {{color.select}}px solid #fff; padding: 8px; background-color: {{color.color}}" ng-click="selectColor(color)">'
      +             '</div>'
      +           '<td>'
      +           '</tr>'
      +         '</table>',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
            scope.colorList = [];
            angular.forEach(scope.colors, function(color, i) {
              scope.colorList.push({
                color : color,
                select : i === 0 ? 2 : 1
              });
            });
          }
        };
      },
      controller: function($scope, colors) {
        $scope.colors = colors;

        $scope.selectColor = function(color) {
          for (var i = 0; i < $scope.colorList.length; i++) {
            $scope.colorList[i].select = 1;
            if ($scope.colorList[i] === color) {
              $scope.colorList[i].select = 2;
              $scope.$broadcast('colorPickerUpdated', color.color);
            }
          }
        };
      }
    };
  }]);
