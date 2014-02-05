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
          var color        = d3.scale.category20c();

          var svg = d3.select(element[0])
            .append('svg')
              .attr('width', width)
              .attr('height', height)
            .append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');

          var partition = d3.layout.partition()
            .sort(null)
            .size([2 * Math.PI, radius * radius])
            .value(function(d) { return 1; });

          var arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y); })
            .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

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

            var foo = { player: "root", children: data };
            // data = foo;
            console.log(foo);

            // // total number of records (player's)
            // var totalPlayers = data.length;

            // // the angle of rotation
            // // var angle = Math.PI / (totalPlayers / 2);
            // var angle = 360 / totalPlayers;

            // // Find the minimum and maximum plus/minus & salary
            // for(var i = 0; i < totalPlayers; i++){
            //   // plus/minus
            //   var pm = parseInt(data[i].plusminus);
            //   if (pm < minPlusMinus) minPlusMinus = pm;
            //   if (pm > maxPlusMinus) maxPlusMinus = pm;

            //   // salary
            //   var salary = parseFloat(data[i].salary);
            //   if (salary < minSalary) minSalary = salary;
            //   if (salary > maxSalary) maxSalary = salary;
            // } // end for

            // console.log(minSalary);
            // console.log(maxSalary);

            var path = svg.datum(foo).selectAll("path")
              .data(partition.nodes)
              .enter().append("path")
                .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
                .attr("d", arc)
                .style("stroke", "#fff")
                .style("fill", function(d) { return color((d.children ? d : d.parent).player); })
                .style("fill-rule", "evenodd")
                .each(stash);


          } // end scope.render();

          // Stash the old values for transition.
          function stash(d) {
            d.x0 = d.x;
            d.dx0 = d.dx;
          }
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
