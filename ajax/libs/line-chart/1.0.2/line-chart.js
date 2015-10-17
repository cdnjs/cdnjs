/*! line-chart - v1.0.2 - 2013-10-22
* https://github.com/n3-charts/line-chart
* Copyright (c) 2013 n3-charts  Licensed ,  */
angular.module('n3-charts.linechart', ['n3charts.utils'])

.directive('linechart', ['n3utils', '$window', '$timeout', function(n3utils, $window, $timeout) {
  var link  = function(scope, element, attrs, ctrl) {
    var dim = n3utils.getDefaultMargins();

    scope.updateDimensions = function(dimensions) {
      var top = n3utils.getPixelCssProp(element[0].parentElement, 'padding-top');
      var bottom = n3utils.getPixelCssProp(element[0].parentElement, 'padding-bottom');
      var left = n3utils.getPixelCssProp(element[0].parentElement, 'padding-left');
      var right = n3utils.getPixelCssProp(element[0].parentElement, 'padding-right');
      dimensions.width = (element[0].parentElement.offsetWidth || 900) - left - right;
      dimensions.height = (element[0].parentElement.offsetHeight || 500) - top - bottom;
    };

    scope.update = function() {
      scope.updateDimensions(dim);
      scope.redraw(dim);
    };

    scope.redraw = function(dimensions) {
      var options = n3utils.sanitizeOptions(scope.options);
      var data = scope.data;
      var series = options.series;
      var dataPerSeries = n3utils.getDataPerSeries(data, options);
      var isThumbnail = (attrs.mode === 'thumbnail');

      n3utils.clean(element[0]);

      var svg = n3utils.bootstrap(element[0], dimensions);
      var axes = n3utils
        .createAxes(svg, dimensions, options.axes)
        .andAddThemIf(isThumbnail);

      if (dataPerSeries.length > 0) {
        n3utils.setScalesDomain(axes, data, options.series, svg, options.axes);
      }

      if (isThumbnail) {
        n3utils.adjustMarginsForThumbnail(dimensions, axes);
      } else {
        n3utils.adjustMargins(dimensions, options, data);
      }

      n3utils.createContent(svg);
      n3utils.createClippingPath(svg, dimensions);

      if (!isThumbnail) {
        n3utils.drawLegend(svg, series, dimensions);
      }

      var lineMode = options.lineMode;

      if (dataPerSeries.length > 0) {

        var columnWidth = n3utils.getBestColumnWidth(dimensions, dataPerSeries);

        n3utils
          .drawArea(svg, axes, dataPerSeries, lineMode)
          .drawColumns(svg, axes, dataPerSeries, columnWidth)
          .drawLines(svg, axes, dataPerSeries, lineMode)
          .drawDots(svg, axes, dataPerSeries)
        ;
      }

      if (!isThumbnail) {
        n3utils.addTooltips(svg, dimensions, options.axes);
      }
    };

    var timeoutPromise;
    var window_resize = function(e) {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = $timeout(scope.update, 1);
    };

    $window.addEventListener('resize', window_resize);

    scope.$watch('data', scope.update);
    scope.$watch('options', scope.update, true);
  };

  return {
    replace: true,
    restrict: 'E',
    scope: {data: '=', options: '='},
    template: '<div></div>',
    link: link
  };
}]);

angular.module('n3charts.utils', [])

.factory('n3utils', ['$window', function($window) {
  return {

drawArea: function(svg, scales, data, interpolateMode){
  var drawers = {
    y: this.createLeftAreaDrawer(scales, interpolateMode),
    y2: this.createRightAreaDrawer(scales, interpolateMode)
  };

  svg.select('.content').selectAll('.areaGroup')
    .data(data.filter(function(series) { return series.type === 'area'; }))
    .enter().append('g')
      .style('fill', function(serie) { return serie.color; })
      .attr('class', function(s) {
        return 'areaGroup ' + 'series_' + s.index;
      })
      .append('path')
        .attr('class', 'area')
        .style('opacity', '0.3')
        .attr('d',  function(d) { return drawers[d.axis](d.values); });

  return this;
},

updateAreas: function(svg, scales, interpolateMode) {
  var drawers = {
    y: this.createLeftAreaDrawer(scales, interpolateMode),
    y2: this.createRightAreaDrawer(scales, interpolateMode)
  };

  svg.select('.content').selectAll('.areaGroup').selectAll('path')
    .attr('d', function(d) {return drawers[d.axis](d.values);});

  return this;
},

createLeftAreaDrawer: function(scales, interpolateMode) {
  return d3.svg.area()
    .x(function(d) { return scales.xScale(d.x); })
    .y0(function(d) { return scales.yScale(0); })
    .y1(function(d) { return scales.yScale(d.value); })
    .interpolate(interpolateMode);
},

createRightAreaDrawer: function(scales, interpolateMode) {
  return d3.svg.area()
    .x(function(d) { return scales.xScale(d.x); })
    .y0(function(d) { return scales.y2Scale(0); })
    .y1(function(d) { return scales.y2Scale(d.value); })
    .interpolate(interpolateMode);
},

getBestColumnWidth: function(dimensions, data) {
  if (!data || data.length === 0) {
    return 10;
  }

  var n = data[0].values.length + 2; // +2 because abscissas will be extended
                                     // to one more row at each end
  var seriesCount = data.length;
  var gap = 0; // space between two rows
  var avWidth = dimensions.width - dimensions.left - dimensions.right;

  return parseInt(Math.max((avWidth - (n - 1)*gap) / (n*seriesCount), 5));
},

drawColumns: function(svg, axes, data, columnWidth) {
  data = data.filter(function(s) {return s.type === 'column';});

  var x1 = d3.scale.ordinal()
    .domain(data.map(function(s) {return s.name;}))
    .rangeRoundBands([0, data.length * columnWidth], 0.05);

  var that = this;

  var colGroup = svg.select('.content').selectAll('.columnGroup')
    .data(data)
    .enter().append("g")
      .attr('class', function(s) {
        return 'columnGroup ' + 'series_' + s.index;
      })
      .style("fill", function(s) {return s.color;})
      .style("fill-opacity", 0.8)
      .attr("transform", function(series) {
        return "translate(" + (
          x1(series.name) - data.length*columnWidth/2
        ) + ",0)";
      })
      .on('mouseover', function(series) {
        var target = d3.select(d3.event.target);

        that.onMouseOver(svg, {
          series: series,
          x: target.attr('x'),
          y: axes[series.axis + 'Scale'](target.datum().value),
          datum: target.datum()
        });
      })
      .on('mouseout', function(d) {
        d3.select(d3.event.target).attr('r', 2);
        that.onMouseOut(svg);
      });

  colGroup.selectAll("rect")
    .data(function(d) {return d.values;})
    .enter().append("rect")
      .style("fill-opacity", function(d) {return d.value == 0 ? 0 : 1;})
      
      .attr({
        width: columnWidth,
        x: function(d) {return axes.xScale(d.x);},
        height: function(d) {
          if (d.value === 0) {
            return axes[d.axis + 'Scale'].range()[0];
          } else {
            return Math.abs(axes[d.axis + 'Scale'](d.value) - axes[d.axis + 'Scale'](0));
          }
        },
        y: function(d) {
          return d.value === 0 ? 0 : axes[d.axis + 'Scale'](Math.max(0, d.value));
        }
      });
  
  return this;
},

updateColumns: function(svg, scales, columnWidth) {
  svg.select('.content').selectAll('.columnGroup').selectAll('rect')
    .attr('width', columnWidth)
    .attr("x", function(d) {return scales.xScale(d.x);})
    .attr("y", function(d) {
      return scales[d.axis + 'Scale'](Math.max(0, d.value));
    })
    .attr("height", function(d) {
      return Math.abs(scales[d.axis + 'Scale'](d.value) -
        scales[d.axis + 'Scale'](0));
    });

  return this;
},

drawDots: function(svg, axes, data) {
  var that = this;

  svg.select('.content').selectAll('.dotGroup')
    .data(data.filter(function(s) { return s.type === 'line' || s.type === 'area'; }))
    .enter().append('g')
      .attr('class', function(s) {
        return 'dotGroup ' + 'series_' + s.index;
      })
      .attr('fill', function(s) {return s.color;})
      .on('mouseover', function(series) {
        var target = d3.select(d3.event.target);
        target.attr('r', 4);

        that.onMouseOver(svg, {
          series: series,
          x: target.attr('cx'),
          y: target.attr('cy'),
          datum: target.datum()
        });
      })
      .on('mouseout', function(d) {
        d3.select(d3.event.target).attr('r', 2);
        that.onMouseOut(svg);
      })
      .selectAll('.dot').data(function(d) {return d.values;})
        .enter().append('circle')
        .attr({
          'class': 'dot',
          'r': 2,
          'cx': function(d) { return axes.xScale(d.x); },
          'cy': function(d) { return axes[d.axis + 'Scale'](d.value); }
        })
        .style({
          'stroke': 'white',
          'stroke-width': '2px'
        });

  return this;
},

updateDots: function(svg, scales) {
  svg.select('.content').selectAll('.dotGroup').selectAll('.dot')
    .attr({
      'cx': function(d) { return scales.xScale(d.x); },
      'cy': function(d) { return scales[d.axis + 'Scale'](d.value); }
    });

    return this;
},

drawLegend: function(svg, series, dimensions) {
  var layout = [0];

  for (var i = 1; i < series.length; i++) {
    var l = series[i - 1].label || series[i - 1].y;
    layout.push(this.getTextWidth(l) + layout[i - 1] + 30);
  }

  var that = this;
  var legend = svg.append('g').attr('class', 'legend');

  var item = legend.selectAll('.legendItem')
    .data(series)
    .enter().append('g')
      .attr({
        'class': 'legendItem',
        'transform': function(s, i) {
          return 'translate(' + layout[i] + ',' + (dimensions.height - 35) + ')';
        }
      });

  item.append('circle')
    .attr({
      'fill': function(s) {return s.color;},
      'r': 4,
      'stroke': function(s) {return s.color;},
      'stroke-width': '2px'
    })
    .on('click', function(s, i) {
      d3.select(this).attr('fill-opacity', that.toggleSeries(svg, i) ? '1' : '0.2');
    })
    ;

  item.append('text')
    .attr({
      'font-family': 'monospace',
      'font-size': 10,
      'transform': 'translate(10, 3)',
      'text-rendering': 'geometric-precision'
    })
    .text(function(s) {return s.label || s.y;});

  return this;
},

toggleSeries: function(svg, index) {
  var isVisible = false;

  svg.select('.content').selectAll('.series_' + index)
    .attr('opacity', function(s) {
      if (d3.select(this).attr('opacity') === '0') {
        isVisible = true;
        return '1';
      }

      isVisible = false;
      return '0';
    });

  return isVisible;
},

drawLines: function(svg, scales, data, interpolateMode) {
  var drawers = {
    y: this.createLeftLineDrawer(scales, interpolateMode),
    y2: this.createRightLineDrawer(scales, interpolateMode)
  };

  svg.select('.content').selectAll('.lineGroup')
    .data(data.filter(function(s) { return s.type === 'line'  || s.type === 'area'; }))
    .enter().append('g')
      .style('stroke', function(serie) {return serie.color;})
      .attr('class', function(s) {
        return 'lineGroup ' + 'series_' + s.index;
      })
      .append('path')
        .attr('class', 'line')
        .attr('d', function(d) {return drawers[d.axis](d.values);})
        .style({
          'fill': 'none',
          'stroke-width': '1px'
        });

  return this;
},

updateLines: function(svg, scales, interpolateMode) {
  var drawers = {
    y: this.createLeftLineDrawer(scales, interpolateMode),
    y2: this.createRightLineDrawer(scales, interpolateMode)
  };

  svg.select('.content').selectAll('.lineGroup').selectAll('path')
    .attr('d', function(d) {return drawers[d.axis](d.values);});

  return this;
},

createLeftLineDrawer: function(scales, interpolateMode) {
  return d3.svg.line()
    .x(function(d) {return scales.xScale(d.x);})
    .y(function(d) {return scales.yScale(d.value);})
    .interpolate(interpolateMode);
},

createRightLineDrawer: function(scales, interpolateMode) {
  return d3.svg.line()
    .x(function(d) {return scales.xScale(d.x);})
    .y(function(d) {return scales.y2Scale(d.value);})
    .interpolate(interpolateMode);
},

getPixelCssProp: function(element, propertyName) {
  var string = $window.getComputedStyle(element, null).getPropertyValue(propertyName);
  return +string.replace(/px$/, '');
},

getDefaultMargins: function() {
  return {top: 20, right: 50, bottom: 60, left: 50};
},

clean: function(element) {
  d3.select(element)
    .on('keydown', null)
    .on('keyup', null)
    .select('svg')
      .remove();
},

bootstrap: function(element, dimensions) {
  d3.select(element).classed('chart', true);

  var width = dimensions.width;
  var height = dimensions.height;

  var svg = d3.select(element).append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
      .attr('transform', 'translate(' + dimensions.left +
        ',' + dimensions.top + ')'
      );

  return svg;
},

createContent: function(svg) {
  svg.append('g')
    .attr('class', 'content')
    .attr('clip-path', 'url(#clip)')
  ;
},

createClippingPath: function(svg, dimensions) {
  svg.append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
    .attr("width", dimensions.width - dimensions.left - dimensions.right)
    .attr("height", dimensions.height - dimensions.top - dimensions.bottom);
},

getDataPerSeries: function(data, options) {
  var series = options.series;
  var axes = options.axes;

  if (!series || !series.length || !data || !data.length) {
    return [];
  }

  var straightenedData = [];

  series.forEach(function(s) {
    var seriesData = {
      xFormatter: axes.x.tooltipFormatter,
      index: straightenedData.length,
      name: s.y,
      values: [],
      color: s.color,
      axis: s.axis || 'y',
      type: s.type || 'line'
    };

    data.forEach(function(row) {
      seriesData.values.push({
        x: row[options.axes.x.key],
        value: row[s.y],
        axis: s.axis || 'y'
      });
    });

    straightenedData.push(seriesData);
  });

  return straightenedData;
},

resetMargins: function(dimensions) {
  var defaults = this.getDefaultMargins();

  dimensions.left = defaults.left;
  dimensions.right = defaults.right;
  dimensions.top = defaults.top;
  dimensions.bottom = defaults.bottom;
},

adjustMargins: function(dimensions, options, data) {
  this.resetMargins(dimensions);

  if (!data || data.length === 0) {
    return;
  }

  var series = options.series;

  var leftSeries = series.filter(function(s) { return s.axis !== 'y2'; });
  var leftWidest = this.getWidestOrdinate(data, leftSeries);
  dimensions.left = this.getTextWidth('' + leftWidest) + 20;

  var rightSeries = series.filter(function(s) { return s.axis === 'y2'; });
  if (rightSeries.length === 0) {
    return;
  }
  var rightWidest = this.getWidestOrdinate(data, rightSeries);
  dimensions.right = this.getTextWidth('' + rightWidest) + 20;
},

adjustMarginsForThumbnail: function(dimensions, axes) {
  dimensions.top = 10;
  dimensions.bottom = 30;
  dimensions.left = 5;
  dimensions.right = 5;
},

getTextWidth: function(text) {
  // return Math.max(25, text.length*6.7);
  return parseInt(text.length*5) + 10;
},

getWidestOrdinate: function(data, series) {
  var widest = '';

  data.forEach(function(row) {
    series.forEach(function(series) {
      if (('' + row[series.y]).length > ('' + widest).length) {
        widest = row[series.y];
      }
    });
  });

  return widest;
},

getDefaultOptions: function() {
  return {
    tooltipMode: 'default',
    lineMode: 'linear',
    axes: {
      x: {type: 'linear', key: 'x'},
      y: {type: 'linear'}
    },
    series: []
  };
},

sanitizeOptions: function(options) {
  if (options === null || options === undefined) {
    return this.getDefaultOptions();
  }
  
  options.series = this.sanitizeSeriesOptions(options.series);

  options.axes = this.sanitizeAxes(options.axes, this.haveSecondYAxis(options.series));
  
  options.lineMode = options.lineMode ? options.lineMode : 'linear';
  options.tooltipMode = options.tooltipMode ? options.tooltipMode : 'default';

  return options;
},

sanitizeSeriesOptions: function(options) {
  if (!options) {
    return [];
  }
  
  var colors = d3.scale.category10();
  options.forEach(function(s, i) {
    s.color = s.color ? s.color : colors(i)
  });
  
  return options;
},

sanitizeAxes: function(axesOptions, secondAxis) {
  if (!axesOptions) {
    axesOptions = {};
  }
  
  axesOptions.x = this.sanitizeAxisOptions(axesOptions.x);
  if (!axesOptions.x.key) {
    axesOptions.x.key = "x";
  }
  
  axesOptions.y = this.sanitizeAxisOptions(axesOptions.y);
  
  if (secondAxis) {
    axesOptions.y2 = this.sanitizeAxisOptions(axesOptions.y2);
  }
  
  return axesOptions;
},

sanitizeAxisOptions: function(options) {
  if (!options) {
    return {type: 'linear'};
  }
  
  if (!options.type) {
    options.type = 'linear';
  }
  
  return options;
},

createAxes: function(svg, dimensions, axesOptions) {
  var drawY2Axis = axesOptions.y2 !== undefined;

  var width = dimensions.width;
  var height = dimensions.height;

  width = width - dimensions.left - dimensions.right;
  height = height - dimensions.top - dimensions.bottom;

  var x = axesOptions.x.type === 'date' ?
    d3.time.scale().rangeRound([0, width]) :
    d3.scale.linear().rangeRound([0, width]);

  var y = axesOptions.y.type === 'log'
    ? d3.scale.log().clamp(true).rangeRound([height, 0])
    : d3.scale.linear().rangeRound([height, 0]);
  
  var y2 = (drawY2Axis && axesOptions.y2.type === 'log')
    ? d3.scale.log().clamp(true).rangeRound([height, 0])
    : d3.scale.linear().rangeRound([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(axesOptions.x.labelFunction);
  var yAxis = d3.svg.axis().scale(y).orient('left');
  var y2Axis = d3.svg.axis().scale(y2).orient('right');

  var style = function(group) {
    group.style({
      'font': '10px monospace',
      'shape-rendering': 'crispEdges'
    });
    
    group.selectAll('path').style({
      'fill': 'none',
      'stroke': '#000'
    });
  };
  
  var that = this;

  return {
    xScale: x,
    yScale: y,
    y2Scale: y2,
    xAxis: xAxis,
    yAxis: yAxis,
    y2Axis: y2Axis,

    andAddThemIf: function(isThumbnail) {
      if (!isThumbnail) {
        style(svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis));

        style(svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis));

        if (drawY2Axis) {
          style(svg.append('g')
            .attr('class', 'y2 axis')
            .attr('transform', 'translate(' + width + ', 0)')
            .call(y2Axis));
        }
      }

      return {
        xScale: x, yScale: y, y2Scale: y2,
        xAxis: xAxis, yAxis: yAxis, y2Axis: y2Axis
      };
    }
  };
},

setScalesDomain: function(scales, data, series, svg, axesOptions) {
  this.setXScale(scales.xScale, data, series, axesOptions);

  var ySeries = series.filter(function(s) { return s.axis !== 'y2'; });
  var y2Series = series.filter(function(s) { return s.axis === 'y2'; });
  
  var yDomain = this.yExtent(ySeries, data);
  if (axesOptions.y.type === 'log') {
    yDomain[0] = yDomain[0] === 0 ? 0.001 : yDomain[0];
  }
  
  var y2Domain = this.yExtent(y2Series, data);
  if (axesOptions.y2 && axesOptions.y2.type === 'log') {
    y2Domain[0] = y2Domain[0] === 0 ? 0.001 : y2Domain[0];
  }
  
  scales.yScale.domain(yDomain).nice();
  scales.y2Scale.domain(y2Domain).nice();

  svg.selectAll('.x.axis').call(scales.xAxis);
  svg.selectAll('.y.axis').call(scales.yAxis);
  svg.selectAll('.y2.axis').call(scales.y2Axis);
},

yExtent: function(series, data) {
  var minY = Number.POSITIVE_INFINITY;
  var maxY = Number.NEGATIVE_INFINITY;

  series.forEach(function(s) {
    minY = Math.min(minY, d3.min(data, function(d) { return d[s.y]; }));
    maxY = Math.max(maxY, d3.max(data, function(d) { return d[s.y]; }));
  });

  return [minY, maxY];
},

setXScale: function(xScale, data, series, axesOptions) {
  xScale.domain(d3.extent(data, function(d) { return d[axesOptions.x.key]; }));

  if (series.filter(function(s) { return s.type === 'column'; }).length) {
    this.adjustXScaleForColumns(xScale, data);
  }
},

adjustXScaleForColumns: function(xScale, data) {
  var step = this.getAverageStep(data, 'x');
  var d = xScale.domain();

  if (angular.isDate(d[0])) {
    xScale.domain([new Date(d[0].getTime() - step), new Date(d[1].getTime() + step)]);
  } else {
    xScale.domain([d[0] - step, d[1] + step]);
  }
},

getAverageStep: function(data, field) {
  var sum = 0;
  var n = data.length - 1;

  for (var i = 0; i<n; i++) {
    sum += data[i + 1][field] - data[i][field];
  }

  return sum/n;
},

haveSecondYAxis: function(series) {
  var doesHave = false;

  angular.forEach(series, function(s) {
    doesHave = doesHave || s.axis === 'y2';
  });

  return doesHave;
},

addTooltips: function (svg, dimensions, axesOptions) {
  var width = dimensions.width;
  var height = dimensions.height;

  width = width - dimensions.left - dimensions.right;
  height = height - dimensions.top - dimensions.bottom;
  
  var w = 24;
  var h = 18;
  var p = 5;

  var xTooltip = svg.append('g')
    .attr({
      'id': 'xTooltip',
      'opacity': 0
    });

  xTooltip.append('path')
    .attr({
      'transform': 'translate(0,' + (height + 1) + ')'
    });

  xTooltip.append('text')
    .style({
      'text-anchor': 'middle'
    })
    .attr({
      'width': w,
      'height': h,
      'font-family': 'monospace',
      'font-size': 10,
      'transform': 'translate(0,' + (height + 19) + ')',
      'fill': 'white',
      'text-rendering': 'geometric-precision'
    });

  var yTooltip = svg.append('g')
    .attr({
      'id': 'yTooltip',
      'opacity': 0
    });

  yTooltip.append('path');
  yTooltip.append('text')
    .attr({
      'width': h,
      'height': w,
      'font-family': 'monospace',
      'font-size': 10,
      'fill': 'white',
      'text-rendering': 'geometric-precision'
    });

  if (axesOptions.y2 !== undefined) {
    var y2Tooltip = svg.append('g')
      .attr({
        'id': 'y2Tooltip',
        'opacity': 0,
        'transform': 'translate(' + width + ',0)'
      });

    y2Tooltip.append('path');

    y2Tooltip.append('text')
      .attr({
        'width': h,
        'height': w,
        'font-family': 'monospace',
        'font-size': 10,
        'fill': 'white',
        'text-rendering': 'geometric-precision'
      });
  }
},

onMouseOver: function(svg, target) {
  this.updateXTooltip(svg, target);

  if (target.series.axis === 'y2') {
    this.updateY2Tooltip(svg, target);
  } else {
    this.updateYTooltip(svg, target);
  }
},

onMouseOut: function(svg) {
  this.hideTooltips(svg);
},

updateXTooltip: function(svg, target) {
  var xTooltip = svg.select("#xTooltip")
    .transition()
    .attr({
      'opacity': 1.0,
      'transform': 'translate(' + target.x + ',0)'
    });

  var textX;
  if (target.series.xFormatter) {
    textX = '' + target.series.xFormatter(target.datum.x);
  } else {
    textX = '' + target.datum.x;
  }

  xTooltip.select('text').text(textX);
  xTooltip.select('path')
    .attr('fill', target.series.color)
    .attr('d', this.getXTooltipPath(textX));
},

getXTooltipPath: function(text) {
  var w = this.getTextWidth(text);
  var h = 18;
  var p = 5; // Size of the 'arrow' that points towards the axis

  return 'm-' + w/2 + ' ' + p + ' ' +
    'l0 ' + h + ' ' +
    'l' + w + ' 0 ' +
    'l0 ' + '-' + h +
    'l-' + (w/2 - p) + ' 0 ' +
    'l-' + p + ' -' + h/4 + ' ' +
    'l-' + p + ' ' + h/4 + ' ' +
    'l-' + (w/2 - p) + ' 0z';
},

updateYTooltip: function(svg, target) {
  var yTooltip = svg.select("#yTooltip")
    .transition()
    .attr({
      'opacity': 1.0,
      'transform': 'translate(0, ' + target.y + ')'
    });

  var textY = '' + target.datum.value;
  var w = this.getTextWidth(textY);
  var yTooltipText = yTooltip.select('text').text(textY);
  
  yTooltipText.attr({
    'transform': 'translate(' + (- w - 2) + ',3)',
    'width': w
  });
  
  yTooltip.select('path')
    .attr('fill', target.series.color)
    .attr('d', this.getYTooltipPath(w));
},

getYTooltipPath: function(w) {
  var h = 18;
  var p = 5; // Size of the 'arrow' that points towards the axis

  return 'm0 0' +
    'l-' + p + ' -' + p + ' ' +
    'l0 -' + (h/2 - p) + ' ' +
    'l-' + w + ' 0 ' +
    'l0 ' + h + ' ' +
    'l' + w + ' 0 ' +
    'l0 -' + (h/2 - p) +
    'l-' + p + ' ' + p + 'z';
},

updateY2Tooltip: function(svg, target) {
  var y2Tooltip = svg.select("#y2Tooltip")
    .transition()
    .attr({
      'opacity': 1.0
    });

  var textY = '' + target.datum.value;
  var w = this.getTextWidth(textY);
  var y2TooltipText = y2Tooltip.select('text').text(textY);
  y2TooltipText.attr({
    'transform': 'translate(7, ' + (parseFloat(target.y) + 3) + ')',
    'w': w
  });
  
  y2Tooltip.select('path')
    .attr({
      'fill': target.series.color,
      'd': this.getY2TooltipPath(w),
      'transform': 'translate(0, ' + target.y + ')'
    });
},

getY2TooltipPath: function(w) {
  var h = 18;
  var p = 5; // Size of the 'arrow' that points towards the axis

  return 'm0 0' +
    'l' + p + ' ' + p + ' ' +
    'l0 ' + (h/2 - p) + ' ' +
    'l' + w + ' 0 ' +
    'l0 -' + h + ' ' +
    'l-' + w + ' 0 ' +
    'l0 ' + (h/2 - p) + ' ' +
    'l-' + p + ' ' + p + 'z';
},

hideTooltips: function(svg) {
  svg.select("#xTooltip")
    .transition()
    .attr({ 'opacity': 0 });

  svg.select("#yTooltip")
    .transition()
    .attr({'opacity': 0 });

  svg.select("#y2Tooltip")
    .transition()
    .attr({'opacity': 0 });
},

activateZoom: function(element, svg, axes, dimensions, columnWidth) {
  var y2Scale_old = axes.y2Scale;
  var y2Scale = y2Scale_old ? y2Scale_old.copy() : undefined;
  var that = this;

  var onZoom = function() {
    var b = behavior;

    if (y2Scale_old) {
      y2Scale.domain(y2Scale_old.range().map(function(y) { return (y - b.translate()[1]) / b.scale(); }).map(y2Scale_old.invert));
      svg.select('.y2.axis').call(axes.y2Axis.scale(y2Scale));
    }

    svg.select('.x.axis').call(axes.xAxis);
    svg.select('.y.axis').call(axes.yAxis);

    that
      .updateAreas(svg, {xScale: b.x(), yScale: b.y(), y2Scale: y2Scale})
      .updateColumns(svg, {xScale: b.x(), yScale: b.y(), y2Scale: y2Scale}, b.scale() * columnWidth)
      .updateLines(svg, {xScale: b.x(), yScale: b.y(), y2Scale: y2Scale})
      .updateDots(svg, {xScale: b.x(), yScale: b.y(), y2Scale: y2Scale})
    ;
  };

  var behavior = d3.behavior.zoom()
    .x(axes.xScale)
    .y(axes.yScale)
    .on("zoom", onZoom);

  d3.select(element)
    .attr('tabindex', '0')
    .style('outline', '0px solid transparent')
    // .on('mouseover', function() {
    //   d3.event.currentTarget.focus();
    // })
    // .on('mouseout', function() {
    //   d3.event.currentTarget.blur();
    // })
    .on('keydown', function() {
      if (d3.event.shiftKey) {
        svg.append("svg:rect")
          .attr({
            'id': 'zoomPane',
            "class": "pane",
            "width": dimensions.width,
            "height": dimensions.height,
          })
          .call(behavior);
      }
    })
    .on('keyup', function() {
      svg.selectAll('#zoomPane').remove();
    });
}

  };
}])