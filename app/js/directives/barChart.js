'use strict';
angular.module('cm.directives').directive('barChart', function(d3Service, dataFactory, $timeout) {
  return {
    restrict: 'E'
    ,scope: {
      data: '=' // bi-directional data-binding
    }
    ,link: function(scope, element, attrs) {
      // Use timeout to ensure the modal height is defined.
      // http://stackoverflow.com/a/12243086
      $timeout(function(){
        var height = document.getElementById('modal-container').clientHeight
            ,width  = document.getElementById('modal-graph').clientWidth
            ,margin = 20;
        height = height - (margin * 2);
        width = width - (margin * 2);

        // D3 is ready for us!
        d3Service.d3().then(function(d3) {
          var svg = d3.select(element[0])
                      .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                          .attr('transform', 'translate(' + margin + ',' + margin + ')');

          // Monitor the bound data.
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          });

          scope.render = function(data) {
            // If we didn't pass any data, or no team have been selected, run.
            if (!data || !data.length) return;

            // Remove all previous items before rendering.
            svg.selectAll('*').remove();




var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
          .range([height, 0]);

var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10, "%");


// d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
// });
      //
function type(d) {
  d.value = +d.value;
  return d;
}



            // var  minBarHeight = Number.MAX_VALUE
            //     ,maxBarHeight = -Number.MAX_VALUE
            //     ,minColor     = Number.MAX_VALUE
            //     ,maxColor     = -Number.MAX_VALUE;

            // var baseColor = d3.rgb(cstate.baseColor);

            // // Find the minimum and maximum values for bar height and color
            // var heightMetric = 0, colorMetric = 0;
            // angular.forEach(data, function(team) {
            //   angular.forEach(team.children, function(player) {
            //     // bar height
            //     heightMetric = parseInt(player[cstate.metrics.barHeight]);
            //     if (heightMetric < minBarHeight) minBarHeight = heightMetric;
            //     if (heightMetric > maxBarHeight) maxBarHeight = heightMetric;

            //     // color
            //     colorMetric = parseFloat(player[cstate.metrics.barColor]);
            //     if (colorMetric < minColor) minColor = colorMetric;
            //     if (colorMetric > maxColor) maxColor = colorMetric;
            //   });
            // });

            // var color = d3.scale.linear()
            //               .domain([minColor,maxColor])
            //               .range([0.25,2.5]);

            // var barHeight = d3.scale.linear()
            //                   .domain([minBarHeight,maxBarHeight])
            //                   .range([0.1,1.25]);

            //   // data.enter goes here
            //   // .style('fill', function(d) {
            //   //   if (d.hasOwnProperty('player')) {
            //   //     return baseColor.brighter(color(d[cstate.metrics.barColor]));
            //   //   }

          } // end scope.render();
        }); // end d3.then
      }); // end $timeout
    }
  }
});
