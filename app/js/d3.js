'use strict';

// Load a file asynchronously.
// http://www.ng-newsletter.com/posts/d3-on-angular.html
angular.module('d3', [])
  .factory('d3Service', function($document, $q, $rootScope) {
    var  d = $q.defer()
        ,body = $document[0].getElementsByTagName('body')[0];

    function onD3Loaded() {
      createScriptTag('lib/d3.tip.js', body, onTipLoaded);
    }

    function onTipLoaded() {
      createScriptTag('lib/d3.bullets.js', body, onAllLoaded);
    }

    function onAllLoaded() {
      $rootScope.$apply(function() { d.resolve(window.d3); });
    }

    createScriptTag('lib/d3.v3.min.js', body, onD3Loaded);

    function createScriptTag(src, e, f) {
      // Create a script tag with d3 as the source and call 'onscriptload'
      // when it has been loaded.
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      // scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.src = src;
      scriptTag.onreadystatechange = function() {
        if (this.readyState === 'complete') f();
      }
      scriptTag.onload = f;

      e.appendChild(scriptTag);
    }

    return {
      d3: function() { return d.promise; }
    };
  })
;
