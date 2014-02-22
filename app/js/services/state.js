'use strict';
angular.module('cm.services')
  .factory('state', function() {
    var currentState = {};

    var getCurrentState = function() {
      return currentState;
    }

    var setCurrentStateProp = function(property, value) {
      currentState[property] = value;
    }

    return {
      getCurrentState: getCurrentState
     ,setCurrentStateProp: setCurrentStateProp
    }
  });
