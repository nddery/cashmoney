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

  .directive('treeLayout', function() {
    return {
      restrict: 'E'
      ,scope: {
        data: '=' // bi-directional data-binding
        ,config: '='
        ,onClick: '&' // parent execution binding
      }
      ,link: function(scope, element, attrs) {
        var margin        = 20

            ,width        = angular.element(window)[0].innerWidth - margin
            ,height       = angular.element(window)[0].innerHeight - margin
            ,radius       = Math.min(width, height) / 2

            ,minBarHeight =  Number.MAX_VALUE
            ,maxBarHeight = -Number.MAX_VALUE
            ,minColor    =  Number.MAX_VALUE
            ,maxColor    = -Number.MAX_VALUE

            ,currentTeam  = 'AAA'
            ,lastTeam     = 'ZZZ';

        // D3 is ready for us!
        d3Service.d3().then(function(d3) {
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

          // Monitor the bound data.
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          });

          // Monitor config object.
          scope.$watch('config', function() {
            return scope.render(scope.data);
          }, true);

          scope.render = function(data) {
            // If we didn't pass any data, or no team have been selected, run.
            if (!data || !data.length) return;

            // Remove all previous items before rendering.
            svg.selectAll('path').remove();

            var baseColor = d3.rgb(scope.config.baseColor);

            // Find the minimum and maximum values for bar height and color
            var heightMetric = 0, colorMetric = 0;
            angular.forEach(data, function(team) {
              angular.forEach(team.children, function(player) {
                // bar height
                heightMetric = parseInt(player[scope.config.metrics.barHeight]);
                if (heightMetric < minBarHeight) minBarHeight = heightMetric;
                if (heightMetric > maxBarHeight) maxBarHeight = heightMetric;

                // color
                colorMetric = parseFloat(player[scope.config.metrics.barColor]);
                if (colorMetric < minColor) minColor = colorMetric;
                if (colorMetric > maxColor) maxColor = colorMetric;
              });
            });

            var color = d3.scale.linear()
                          .domain([minColor,maxColor])
                          .range([0.25,2.5]);

            var barHeight = d3.scale.linear()
                              .domain([minBarHeight,maxBarHeight])
                              .range([0.1,1.25]);

            var currentInnerRadius = .0
                ,currentOuterRadius = .0;
            // We will animate from startArc to endArc.
            // startArc has an "height" of zero for players while endArc is
            // the calculated "height"
            var startArc = d3.svg.arc()
                        .startAngle(function(d) { return d.x; })
                        .endAngle(function(d) { return d.x + d.dx; })
                        .innerRadius(function(d) {
                          if (d.hasOwnProperty('player'))
                            currentInnerRadius = Math.sqrt(d.y - (d.y / 2));
                          else
                            currentInnerRadius = Math.sqrt(d.y - (d.y / 4));

                          return currentInnerRadius;
                        })
                        .outerRadius(function(d) {
                          // For players, use same calculation as innerRadius
                          if (d.hasOwnProperty('player'))
                            currentOuterRadius = Math.sqrt(d.y - (d.y / 2));
                          else
                            currentOuterRadius = Math.sqrt(d.y);

                          return currentOuterRadius;
                        });

            var endArc = d3.svg.arc()
                        .startAngle(function(d) { return d.x; })
                        .endAngle(function(d) { return d.x + d.dx; })
                        .innerRadius(function(d) {
                          if (d.hasOwnProperty('player'))
                            currentInnerRadius = Math.sqrt(d.y - (d.y / 2));
                          else
                            currentInnerRadius = Math.sqrt(d.y - (d.y / 4));

                          return currentInnerRadius;
                        })
                        .outerRadius(function(d) {
                          // Prevent outer radius from being smaller than
                          // inner radius.
                          if (d.hasOwnProperty('player'))
                            currentOuterRadius = Math.sqrt((d.y + d.dy) * barHeight(d[scope.config.metrics.barHeight]));
                          else
                            currentOuterRadius = Math.sqrt(d.y);

                          if (currentInnerRadius > currentOuterRadius)
                            currentOuterRadius = currentInnerRadius + 5;

                          return currentOuterRadius;
                        });

            var dataWithRoot = { root: "root", children: data };
            var odd = 0;
            var path = svg.datum(dataWithRoot).selectAll('path')
                          .data(partition.nodes);
            path.enter().append('path')
              .attr('display', function(d) {
                // hide inner ring
                return d.depth ? null : "none";
              })
              .attr('d', startArc)
              .on('click', function(d) { return scope.onClick({item: d});} )
              .attr('id', function(d) {
                if (d.hasOwnProperty('name'))
                  return 'team-' + d.name;
                else
                  return 'player-' + d.player;
              })
              .style('stroke-width', '0')
              .style('fill', function(d) {
                if (d.hasOwnProperty('player')) {
                  return baseColor.brighter(color(d[scope.config.metrics.barColor]));
                }
                else {
                  odd = odd === 0 ? 1 : 0;
                  return odd ? '#e9e9e9' : '#e1e1e1';
                }
              })
              .tooltip(function(d, i) {
                var r, svg;
                // r = +d3.select(this).attr('r');
                svg = d3.select(document.createElement("svg")).attr("height", 50);
                g = svg.append("g");
                // g.append("rect").attr("width", r * 10).attr("height", 10);
                g.append("text").text("10 times the radius of the cirlce").attr("dy", "25");
                return {
                  type: "popover",
                  title: "It's a me, Rectangle",
                  content: svg,
                  detection: "shape",
                  placement: "fixed",
                  gravity: "right",
                  position: [d.x, d.y],
                  displacement: [r + 2, -72],
                  mousemove: false
                };
              })
              .transition()
                .duration(1000)
                .attr('d', endArc);

            // Add text to paths
            // Can't rely on ANA to be there, user may have unselected it.
            // Hence, select first that match pattern.
            var pathDimension = d3.select('path[id^="team-"]')[0][0]
                                  .getBoundingClientRect();
            angular.forEach(data, function(team) {
              var dyOffset = height / 21.25;
              var text = svg.append('text')
                            .style('font-size', function() {
                              return radius / 42;
                            })
                            .style('font-weight', 'bold')
                            .style('fill', '#000')
                            .attr('text-anchor', 'middle')
                            .attr('dx', function() {
                              // var w = pathDimension.width > 60 ? 60 : pathDimension.width;
                              // return w / 2;
                              // return pathDimension.width * 1.75;
                              return pathDimension.width / 2;
                            })
                            .attr('dy', function() { return dyOffset / 2; })
                            .append('textPath')
                              .attr('xlink:href', function() {
                                return '#team-' + team.name;
                              })
                              .text(function() {
                                return team.name;
                              });
            });
          } // end scope.render();
        }); // end d3.then
      }
    }
  })
;
