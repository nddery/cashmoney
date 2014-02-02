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

  .directive('treeLayout', function(d3Service) {
    return {
      restrict: 'E'
      ,scope: {
        data: '=' // bi-directional data-binding
        ,onClick: '&' // parent execution binding
      }
      ,link: function(scope, element, attrs) {
        var margin        = 20
            ,barPadding   = 5

            // ,width        = angular.element(window)[0].innderWidth
            // ,height       = angular.element(window)[0].innderHeight
            ,width        = 900
            ,height       = 700
            ,radius       = Math.min(width, height) / 2

            ,minPlusMinus =  Number.MAX_VALUE
            ,maxPlusMinus = -Number.MAX_VALUE
            ,minSalary    =  Number.MAX_VALUE
            ,maxSalary    = -Number.MAX_VALUE

            ,barHeight
            ,barColor
            ,red
            ,green

            ,currentTeam  = 'AAA'
            ,lastTeam     = 'BBB';

        console.log(width);
        console.log(height);
        console.log(radius);

        // D3 is ready for us!
        d3Service.d3().then(function(d3) {
          var svg = d3.select(element[0])
            .append('svg')
            .style('width', width);

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

          // Monitor the bound data.
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          scope.render = function(data) {
            // If we didn't pass any data, run.
            if (!data) return;

            // Remove all previous items before rendering.
            svg.selectAll('*').remove();

            // total number of records (player's)
            var totalPlayers = data.length;

            // the angle of rotation
            // var angle = Math.PI / (totalPlayers / 2);
            var angle = 360 / totalPlayers;

            // Find the minimum and maximum plus/minus & salary
            for(var i = 0; i < totalPlayers; i++){
              // plus/minus
              var pm = parseInt(data[i].plusminus);
              if (pm < minPlusMinus) minPlusMinus = pm;
              if (pm > maxPlusMinus) maxPlusMinus = pm;

              // salary
              var salary = parseFloat(data[i].salary);
              if (salary < minSalary) minSalary = salary;
              if (salary > maxSalary) maxSalary = salary;
            } // end for

            console.log(minSalary);
            console.log(maxSalary);


          } // end scope.render();
        });
      }
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
