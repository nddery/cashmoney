'use strict';

/* Filters */

angular.module('cm.filters')
  .filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  })

  .filter('dynamicTeamsFilter', function ($filter) {
    return function (array, keyValuePairs) {
      var obj = {}, i;
      for (i = 0; i < keyValuePairs.length; i += 2) {
        if (keyValuePairs[i] && keyValuePairs[i+1]) {
          obj[keyValuePairs[i]] = keyValuePairs[i+1];
        }
      }

      return $filter('filter')(array, function(team) {
        if (array.indexOf(team[obj]) !== -1)
          return true;
        else
          return false;
      });
      // return $filter('filter')(array, obj);
    }
  })
;
