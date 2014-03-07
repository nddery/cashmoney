'use strict';
angular.module('cm.directives').directive('sunburst', function(d3Service, state, config, $filter, $window) {
  return {
    restrict: 'E'
    ,scope: {
      data: '=' // bi-directional data-binding
      ,config: '='
      ,onClick: '&' // parent execution binding
    }
    ,link: function(scope, element, attrs) {
      var margin   = 20
          ,aWindow = angular.element($window)
          ,width   = aWindow[0].innerWidth - margin
          ,height  = aWindow[0].innerHeight - margin
          ,radius  = Math.min(width, height) / 2;

      // D3 is ready for us!
      d3Service.d3().then(function(d3) {
        var cstate = state.getCurrentState();

        var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .direction('e')
                    .html(function(d) {
                      // bar height object, bar color object
                      // We get the object to get to the title instead of
                      // displaying the abbreviation/column name.
                      var bho, bco;
                      bho = $filter('filter')(config.metrics,{name:cstate.metrics.barHeight},true);
                      bco = $filter('filter')(config.metrics,{name:cstate.metrics.barColor},true);
                      console.log(bco);
                      return '<p><strong>' + d.player + '</strong></p>'
                        + '<p>' + bho[0].title + ': '
                        + d[cstate.metrics.barHeight] + '</p>'
                        + '<p>' + bco[0].title + ': '
                        + d[cstate.metrics.barColor] + '</p>';
                    });

        var svgRoot = d3.select(element[0])
                        .append('svg')
                          .attr('width', width)
                          .attr('height', height)
                          .style('margin-top', margin / 2 + 'px');
        var svg = svgRoot.append('g')
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

        // On window resize, re-render d3 canvas.
        // Only watching for width changes.
        aWindow.bind('resize', function() { return scope.$apply(); });
        scope.$watch(function(){
          return aWindow[0].innerWidth;
        }, function(){
          return scope.render(scope.data);
        });

        scope.render = function(data) {
          // If we didn't pass any data, or no team have been selected, run.
          if (!data || !data.length) return;

          // Remove all previous items before rendering.
          svg.selectAll('*').remove();

          // Recalculate width, height and radius, and apply.
          width   = aWindow[0].innerWidth - margin;
          height  = aWindow[0].innerHeight - margin;
          radius  = Math.min(width, height) / 2;
          svgRoot.attr('width', width)
                 .attr('height', height);
          svg.attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');

          var  minBarHeight = Number.MAX_VALUE
              ,maxBarHeight = -Number.MAX_VALUE
              ,minColor     = Number.MAX_VALUE
              ,maxColor     = -Number.MAX_VALUE;

          var baseColor = d3.rgb(cstate.baseColor);

          // Find the minimum and maximum values for bar height and color
          var heightMetric = 0, colorMetric = 0;
          angular.forEach(data, function(team) {
            angular.forEach(team.children, function(player) {
              // bar height
              heightMetric = parseInt(player[cstate.metrics.barHeight]);
              if (heightMetric < minBarHeight) minBarHeight = heightMetric;
              if (heightMetric > maxBarHeight) maxBarHeight = heightMetric;

              // color
              colorMetric = parseFloat(player[cstate.metrics.barColor]);
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
                          currentOuterRadius = Math.sqrt((d.y + d.dy) * barHeight(d[cstate.metrics.barHeight]));
                        else
                          currentOuterRadius = Math.sqrt(d.y);

                        if (currentInnerRadius > currentOuterRadius)
                          currentOuterRadius = currentInnerRadius + 5;

                        return currentOuterRadius;
                      });

          svg.call(tip);

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
            .on('click', function(d) {
              if (d.hasOwnProperty('player'))
                return scope.onClick({player: d});
            })
            .attr('id', function(d) {
              if (d.hasOwnProperty('name'))
                return 'team-' + d.name;
              else
                return 'player-' + d.player;
            })
            .style('stroke-width', '0')
            .style('fill', function(d) {
              if (d.hasOwnProperty('player')) {
                return baseColor.brighter(color(d[cstate.metrics.barColor]));
              }
              else {
                odd = odd === 0 ? 1 : 0;
                return odd ? '#e9e9e9' : '#e1e1e1';
              }
            })
            .on('mouseover', function(d) {
              if (d.hasOwnProperty('player'))
                tip.show(d)
            })
            .on('mouseout', tip.hide)
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
});
