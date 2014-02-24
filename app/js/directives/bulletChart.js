'use strict';
angular.module('cm.directives').directive('bulletChart', function(d3Service, dataFactory, config, $timeout) {
  return {
    restrict: 'E'
    ,scope: {
      data: '=' // bi-directional data-binding
    }
    ,link: function(scope, element, attrs) {
      // Use timeout to ensure the modal height is defined.
      // http://stackoverflow.com/a/12243086
      $timeout(function(){
        var margin = {top: 5, right: 40, bottom: 20, left: 175}
            ,height = 50 - margin.top - margin.bottom
            ,width  = document.getElementById('modal-graph').clientWidth - margin.left - margin.right;

        // D3 is ready for us!
        d3Service.d3().then(function(d3) {
          var chart = d3.bullet()
                        .width(width)
                        .height(height);

          var svg = d3.select(element[0]);

          // Monitor the bound data.
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          });

          scope.render = function(data) {
            // If we didn't pass any data, or no team have been selected, run.
            if (!data || !data.length) return;

            // Remove all previous items before rendering.
            svg.selectAll('*').remove();

            svg = svg.selectAll('svg')
                    .data(data).enter()
                      .append('svg')
                      .attr('class', 'bullet')
                      .attr('width', width + margin.left + margin.right)
                      .attr('height', height + margin.top + margin.bottom)
                      .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                        .call(chart);

            var title = svg.append('g')
                           .style('text-anchor', 'end')
                           .attr('transform', 'translate(-6,' + height / 2 + ')');

            title.append('text')
                 .attr('class', 'title')
                 .text(function(d) { return d.title; });

            title.append('text')
                 .attr('class', 'subtitle')
                 .attr('dy', '1em')
                 .text(function(d) { return d.subtitle; });
          } // end scope.render();
        }); // end d3.then
      }); // end $timeout
    }
  }
});
