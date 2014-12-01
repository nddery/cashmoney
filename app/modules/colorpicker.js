'use strict';

/**
 * @Usage
 *
 * Define a value of 'config' at the app level that contains an hashmap of 'color'.
 *
 * angular.module('cm.services', [])
 *   .value('config', {colors:{blue: '#5484ED', red: '#A4BDFC', purple: '#46D6DB'}});
 *
 * The event 'colorPickerUpdated' is broadcasted when the color change.
 * The selected color is passed as the argument.
 *
 * Place the directive wherever you want.
 *  <ng-color-picker></ng-color-picker>
 *
 * Sample CSS (SASS)
 *  .color-picker {
 *    .color {
 *      width: 15px;
 *      height: 15px;
 *      padding: 8px;
 *      border: 1px solid #fff;
 *
 *      &:hover {
 *        cursor: pointer;
 *      }
 *    }
 *  }
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
      +             '<div class="color" style="border-width: {{color.select}}px; background-color: {{color.color}}" ng-click="selectColor(color)">'
      +             '</div>'
      +           '<td>'
      +           '</tr>'
      +         '</table>',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
            scope.colorList = [];
            var i = 0;
            angular.forEach(scope.colors, function(hex, name) {
              scope.colorList.push({
                color : hex,
                name : name,
                select : i === 0 ? 2 : 1
              });
              i++;
            });
          }
        };
      },
      controller: function($scope, config) {
        $scope.colors = config.colors;

        $scope.selectColor = function(color) {
          for (var i = 0; i < $scope.colorList.length; i++) {
            $scope.colorList[i].select = 1;
            if ($scope.colorList[i] === color) {
              $scope.colorList[i].select = 2;
              $scope.$broadcast('colorPickerUpdated', color);
            }
          }
        };
      }
    };
  }]);
