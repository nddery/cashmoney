'use strict';
angular.module('cm.services')
  .factory('state', function() {
    var currentState = {};

    var getCurrentState = function(property) {
      if (property === 'undefined' || !currentState.hasOwnProperty(property))
        return currentState;
      else
        return currentState[property]
    }

    var setCurrentStateProp = function(property, value) {
      currentState[property] = value;
    }

    return {
      getCurrentState: getCurrentState
     ,setCurrentStateProp: setCurrentStateProp
    }
  });
