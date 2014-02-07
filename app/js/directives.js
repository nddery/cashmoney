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

            ,width        = angular.element(window)[0].innerWidth - margin
            ,height       = angular.element(window)[0].innerHeight - margin
            ,radius       = Math.min(width, height) / 2

            ,minPlusMinus =  Number.MAX_VALUE
            ,maxPlusMinus = -Number.MAX_VALUE
            ,minSalary    =  Number.MAX_VALUE
            ,maxSalary    = -Number.MAX_VALUE

            ,currentTeam  = 'AAA'
            ,lastTeam     = 'ZZZ';

        // D3 is ready for us!
        d3Service.d3().then(function(d3) {
          // var baseColor = d3.hsl(202,0.88,0.21);
          var baseColor = d3.rgb('#074C75');
          // hsl(202, 88%, 21%)
          var svg = d3.select(element[0])
                      .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .style('margin-top', margin / 2 + 'px')
                      .append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');

          var partition = d3.layout.partition()
                            .sort(null)
                            .size([2 * Math.PI, radius * radius])
                            .value(function(d) { return 1; });

          // Respond to browser onresize events.
          // @TODO This should be throttled ?
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
          });

          scope.render = function(data) {
            // If we didn't pass any data, run.
            if (!data) return;

            // Remove all previous items before rendering.
            svg.selectAll('*').remove();

            // Find the minimum and maximum plus/minus & salary
            var pm = 0, salary = 0;
            data.forEach(function(team) {
              team.children.forEach(function(player) {
                // plus/minus
                pm = parseInt(player.plusminus);
                if (pm < minPlusMinus) minPlusMinus = pm;
                if (pm > maxPlusMinus) maxPlusMinus = pm;

                // salary
                salary = parseFloat(player.salary);
                if (salary < minSalary) minSalary = salary;
                if (salary > maxSalary) maxSalary = salary;
              });
            });

            var color = d3.scale.linear()
                          .domain([minSalary,maxSalary])
                          .range([0.25,1]);

            var barHeight = d3.scale.linear()
                              .domain([minPlusMinus,maxPlusMinus])
                              .range([0.1,1.25]);

            var arc = d3.svg.arc()
                        .startAngle(function(d) {
                          return d.x;
                        })
                        .endAngle(function(d) {
                          return d.x + d.dx;
                        })
                        .innerRadius(function(d) {
                          if (d.hasOwnProperty('plusminus'))
                            return Math.sqrt(d.y - (d.y / 2));
                          else
                            return Math.sqrt(d.y - (d.y / 1.5));
                            // return Math.sqrt(d.y - (d.y / 4));
                        })
                        .outerRadius(function(d) {
                          // console.log(radius + "\t\t" + d.y + "\t\t" + d.dy);
                          if (d.hasOwnProperty('plusminus'))
                            return Math.sqrt((d.y + d.dy) * barHeight(parseInt(d.plusminus)));
                          else
                            return Math.sqrt(d.y);
                        });

            data.forEach(function(team) {
              var defs = svg.append('defs').append('pattern')
                            .attr('id', function() {
                              return 'img-' + team.name;
                            })
                            .attr('patternUnits', 'userSpaceOnUse')
                            .attr('width', '15')
                            .attr('height', '15')
                            .append('image')
                              .attr('xlink:href', function() {
                                return 'img/logos/' + team.name + '.svgz';
                              })
                              .attr('x', '0')
                              .attr('y', '0')
                              .attr('width', '15')
                              .attr('height', '15');
            });

            var dataWithRoot = { root: "root", children: data };
            var path = svg.datum(dataWithRoot).selectAll('path')
                          .data(partition.nodes)
                          .enter().append('path')
                            .attr('display', function(d) {
                              // hide inner ring
                              return d.depth ? null : "none";
                            })
                            .attr('d', arc)
                            .style('stroke-width', '0')
                            .style('fill', function(d) {
                              if (d.hasOwnProperty('plusminus')) {
                                return baseColor.brighter(
                                  color(parseFloat(d.salary))
                                );
                              }
                              else {
                                return 'url(#img-' + d.name + ')';
                              }
                            })
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
;