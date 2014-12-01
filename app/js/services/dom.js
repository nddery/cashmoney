'use strict';
angular.module('cm.services')
  .factory('dom', function() {
    var getTagClass = function(tag) {
      return tag.className;
    }

    var setUniqueClass = function(tag, pattern, c) {
      var regex = new RegExp('(^|\s)' + tag + '-\S+', 'g');
      var strippedClass = document.body.className.replace(regex, '');
      document.body.className = strippedClass + ' ' + pattern + '-' + c;
      return true;
    }

    return {
      setUniqueClass: setUniqueClass
    }
  });
