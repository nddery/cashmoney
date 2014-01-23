'use strict';

/* Directives */
angular.module('cm.directives', ['d3'])
  .directive('pullNav', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/pull-nav.html'
    }
  })

  .directive('teamList', function() {
    return {
      restrict: 'E'
      ,replace: true
      ,transclude: true
      ,templateUrl: 'partials/team-list.html'
    }
  })

  .directive('circularVisualisation', function(d3Service) {
    return {
      restrict: 'EA'
      ,scope: {
        data: '=' // bi-directional data-binding
        ,onClick: '&' // parent execution binding
      }
      ,link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          // D3 is ready for us!
          var margin = 20
              ,barHeight = 20
              ,barPadding = 5;

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%');

          // Respond to browser onresize events.
          // @TODO This should be throttled.
          window.onresize = function() {
            scope.$apply();
          };

          // Watch for resize events.
          scope.$watch(function() {
            return angular.element(window)[0].innderWidth;
          }, function() {
            scope.render(scope.data);
          });

          // scope.data = dataService.getData();
          // Monitor the bound data.
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          scope.render = function(data) {
            // If we didn't pass any data, run.
            if (!data) return;

            // Remove all previous items before rendering.
            svg.selectAll('*').remove();

             // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = scope.data.length * (barHeight + barPadding),
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.plusminus;
                  })])
                  .range([0, width]);

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll('rect')
              .data(data).enter()
                .append('rect')
                .on('click', function(d, i) {
                  return scope.onClick({item: d});
                })
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin/2))
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) { return color(d.plusminus); })
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    // return xScale(d.plusminus);
                    var w = xScale(d.plusminus);
                    if (w < 0) w = 0;
                    return w;
                  });

            //create the rectangles for the bar chart
            svg.selectAll('rect')
              .data(data).exit()
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return 0;
                  });
          }
        });
      }
    }
  })
;
