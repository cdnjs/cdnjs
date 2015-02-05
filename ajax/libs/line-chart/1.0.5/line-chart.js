/*
line-chart - v1.0.5 - 01 May 2014
https://github.com/n3-charts/line-chart
Copyright (c) 2014 n3-charts
 */
var mod;

angular.module('n3-charts.linechart', ['n3charts.utils']).directive('linechart', [
  'n3utils', '$window', '$timeout', function(n3utils, $window, $timeout) {
    var link;
    link = function(scope, element, attrs, ctrl) {
      var dim, timeoutPromise, window_resize;
      dim = n3utils.getDefaultMargins();
      scope.updateDimensions = function(dimensions) {
        var bottom, left, right, top;
        top = n3utils.getPixelCssProp(element[0].parentElement, 'padding-top');
        bottom = n3utils.getPixelCssProp(element[0].parentElement, 'padding-bottom');
        left = n3utils.getPixelCssProp(element[0].parentElement, 'padding-left');
        right = n3utils.getPixelCssProp(element[0].parentElement, 'padding-right');
        dimensions.width = (element[0].parentElement.offsetWidth || 900) - left - right;
        return dimensions.height = (element[0].parentElement.offsetHeight || 500) - top - bottom;
      };
      scope.update = function() {
        scope.updateDimensions(dim);
        return scope.redraw(dim);
      };
      scope.redraw = function(dimensions) {
        var axes, columnWidth, data, dataPerSeries, isThumbnail, options, series, svg;
        options = n3utils.sanitizeOptions(scope.options);
        data = scope.data;
        series = options.series;
        dataPerSeries = n3utils.getDataPerSeries(data, options);
        isThumbnail = attrs.mode === 'thumbnail';
        n3utils.clean(element[0]);
        svg = n3utils.bootstrap(element[0], dimensions);
        axes = n3utils.createAxes(svg, dimensions, options.axes).andAddThemIf(isThumbnail);
        if (dataPerSeries.length) {
          n3utils.setScalesDomain(axes, data, options.series, svg, options.axes);
        }
        if (isThumbnail) {
          n3utils.adjustMarginsForThumbnail(dimensions, axes);
        } else {
          n3utils.adjustMargins(dimensions, options, data);
        }
        n3utils.createContent(svg);
        if (!isThumbnail) {
          n3utils.drawLegend(svg, series, dimensions);
        }
        if (dataPerSeries.length) {
          columnWidth = n3utils.getBestColumnWidth(dimensions, dataPerSeries);
          n3utils.drawArea(svg, axes, dataPerSeries, options).drawColumns(svg, axes, dataPerSeries, columnWidth).drawLines(svg, axes, dataPerSeries, options);
          if (!isThumbnail) {
            n3utils.drawDots(svg, axes, dataPerSeries);
          }
        }
        if (!isThumbnail) {
          return n3utils.addTooltips(svg, dimensions, options.axes);
        }
      };
      timeoutPromise = void 0;
      window_resize = function() {
        $timeout.cancel(timeoutPromise);
        return timeoutPromise = $timeout(scope.update, 1);
      };
      $window.addEventListener('resize', window_resize);
      scope.$watch('data', scope.update);
      return scope.$watch('options', scope.update, true);
    };
    return {
      replace: true,
      restrict: 'E',
      scope: {
        data: '=',
        options: '='
      },
      template: '<div></div>',
      link: link
    };
  }
]);

mod = angular.module('n3charts.utils', []);

mod.factory('n3utils', [
  '$window', function($window) {
    return {
      addPattern: function(svg, series) {
        var group;
        group = svg.select('defs').append('pattern').attr({
          id: series.type + 'Pattern_' + series.index,
          patternUnits: "userSpaceOnUse",
          x: 0,
          y: 0,
          width: 60,
          height: 60
        }).append('g').style({
          'fill': series.color,
          'fill-opacity': 0.3
        });
        group.append('rect').style('fill-opacity', 0.3).attr('width', 60).attr('height', 60);
        group.append('path').attr('d', "M 10 0 l10 0 l -20 20 l 0 -10 z");
        group.append('path').attr('d', "M40 0 l10 0 l-50 50 l0 -10 z");
        group.append('path').attr('d', "M60 10 l0 10 l-40 40 l-10 0 z");
        return group.append('path').attr('d', "M60 40 l0 10 l-10 10 l -10 0 z");
      },
      drawArea: function(svg, scales, data, options) {
        var areaSeries, drawers;
        areaSeries = data.filter(function(series) {
          return series.type === 'area';
        });
        areaSeries.forEach((function(series) {
          return this.addPattern(svg, series);
        }), this);
        drawers = {
          y: this.createLeftAreaDrawer(scales, options.lineMode, options.tension),
          y2: this.createRightAreaDrawer(scales, options.lineMode, options.tension)
        };
        svg.select('.content').selectAll('.areaGroup').data(areaSeries).enter().append('g').attr('class', function(s) {
          return 'areaGroup ' + 'series_' + s.index;
        }).append('path').attr('class', 'area').style('fill', function(s) {
          if (s.striped !== true) {
            return s.color;
          }
          return "url(#areaPattern_" + s.index + ")";
        }).style('opacity', function(s) {
          if (s.striped) {
            return '1';
          } else {
            return '0.3';
          }
        }).attr('d', function(d) {
          return drawers[d.axis](d.values);
        });
        return this;
      },
      createLeftAreaDrawer: function(scales, mode, tension) {
        return d3.svg.area().x(function(d) {
          return scales.xScale(d.x);
        }).y0(function(d) {
          return scales.yScale(0);
        }).y1(function(d) {
          return scales.yScale(d.value);
        }).interpolate(mode).tension(tension);
      },
      createRightAreaDrawer: function(scales, mode, tension) {
        return d3.svg.area().x(function(d) {
          return scales.xScale(d.x);
        }).y0(function(d) {
          return scales.y2Scale(0);
        }).y1(function(d) {
          return scales.y2Scale(d.value);
        }).interpolate(mode).tension(tension);
      },
      getBestColumnWidth: function(dimensions, data) {
        var avWidth, gap, n, seriesCount;
        if (!(data && data.length !== 0)) {
          return 10;
        }
        n = data[0].values.length + 2;
        seriesCount = data.length;
        gap = 0;
        avWidth = dimensions.width - dimensions.left - dimensions.right;
        return parseInt(Math.max((avWidth - (n - 1) * gap) / (n * seriesCount), 5));
      },
      drawColumns: function(svg, axes, data, columnWidth) {
        var colGroup, that, x1;
        data = data.filter(function(s) {
          return s.type === 'column';
        });
        x1 = d3.scale.ordinal().domain(data.map(function(s) {
          return s.name;
        })).rangeRoundBands([0, data.length * columnWidth], 0.05);
        that = this;
        colGroup = svg.select('.content').selectAll('.columnGroup').data(data).enter().append("g").attr('class', function(s) {
          return 'columnGroup ' + 'series_' + s.index;
        }).style("fill", function(s) {
          return s.color;
        }).style("fill-opacity", 0.8).attr("transform", function(s) {
          return "translate(" + (x1(s.name) - data.length * columnWidth / 2) + ",0)";
        }).on('mouseover', function(series) {
          var target;
          target = d3.select(d3.event.target);
          return that.onMouseOver(svg, {
            series: series,
            x: target.attr('x'),
            y: axes[series.axis + 'Scale'](target.datum().value),
            datum: target.datum()
          });
        }).on('mouseout', function(d) {
          d3.select(d3.event.target).attr('r', 2);
          return that.onMouseOut(svg);
        });
        colGroup.selectAll("rect").data(function(d) {
          return d.values;
        }).enter().append("rect").style("fill-opacity", function(d) {
          if (d.value === 0) {
            return 0;
          } else {
            return 1;
          }
        }).attr({
          width: columnWidth,
          x: function(d) {
            return axes.xScale(d.x);
          },
          height: function(d) {
            if (d.value === 0) {
              return axes[d.axis + 'Scale'].range()[0];
            }
            return Math.abs(axes[d.axis + 'Scale'](d.value) - axes[d.axis + 'Scale'](0));
          },
          y: function(d) {
            if (d.value === 0) {
              return 0;
            } else {
              return axes[d.axis + 'Scale'](Math.max(0, d.value));
            }
          }
        });
        return this;
      },
      updateColumns: function(svg, scales, columnWidth) {
        svg.select('.content').selectAll('.columnGroup').selectAll('rect').attr({
          width: columnWidth,
          x: function(d) {
            return scales.xScale(d.x);
          },
          y: function(d) {
            return scales[d.axis + 'Scale'](Math.max(0, d.value));
          },
          height: function(d) {
            return Math.abs(scales[d.axis + 'Scale'](d.value) - scales[d.axis + 'Scale'](0));
          }
        });
        return this;
      },
      drawDots: function(svg, axes, data) {
        var that;
        that = this;
        svg.select('.content').selectAll('.dotGroup').data(data.filter(function(s) {
          var _ref;
          return (_ref = s.type) === 'line' || _ref === 'area';
        })).enter().append('g').attr({
          "class": function(s) {
            return "dotGroup series_" + s.index;
          },
          fill: function(s) {
            return s.color;
          }
        }).on('mouseover', function(series) {
          var target;
          target = d3.select(d3.event.target);
          target.attr('r', 4);
          return that.onMouseOver(svg, {
            series: series,
            x: target.attr('cx'),
            y: target.attr('cy'),
            datum: target.datum()
          });
        }).on('mouseout', function(d) {
          d3.select(d3.event.target).attr('r', 2);
          return that.onMouseOut(svg);
        }).selectAll('.dot').data(function(d) {
          return d.values;
        }).enter().append('circle').attr({
          'class': 'dot',
          'r': 2,
          'cx': function(d) {
            return axes.xScale(d.x);
          },
          'cy': function(d) {
            return axes[d.axis + 'Scale'](d.value);
          }
        }).style({
          'stroke': 'white',
          'stroke-width': '2px'
        });
        return this;
      },
      updateDots: function(svg, scales) {
        svg.select('.content').selectAll('.dotGroup').selectAll('.dot').attr({
          'cx': function(d) {
            return scales.xScale(d.x);
          },
          'cy': function(d) {
            return scales[d.axis + 'Scale'](d.value);
          }
        });
        return this;
      },
      drawLegend: function(svg, series, dimensions) {
        var d, i, item, l, layout, legend, that;
        layout = [0];
        i = 1;
        while (i < series.length) {
          l = series[i - 1].label || series[i - 1].y;
          layout.push(this.getTextWidth(l) + layout[i - 1] + 40);
          i++;
        }
        that = this;
        legend = svg.append('g').attr('class', 'legend');
        d = 16;
        svg.select('defs').append('svg:clipPath').attr('id', 'legend-clip').append('circle').attr('r', d / 2);
        item = legend.selectAll('.legendItem').data(series).enter().append('g').attr({
          'class': 'legendItem',
          'transform': function(s, i) {
            return "translate(" + layout[i] + "," + (dimensions.height - 40) + ")";
          }
        });
        item.on('click', function(s, i) {
          return d3.select(this).attr('opacity', that.toggleSeries(svg, i) ? '1' : '0.2');
        });
        item.append('circle').attr({
          'fill': function(s) {
            return s.color;
          },
          'stroke': function(s) {
            return s.color;
          },
          'stroke-width': '2px',
          'r': d / 2
        });
        item.append('path').attr({
          'clip-path': 'url(#legend-clip)',
          'fill-opacity': function(s) {
            var _ref;
            if ((_ref = s.type) === 'area' || _ref === 'column') {
              return '1';
            } else {
              return '0';
            }
          },
          'fill': 'white',
          'stroke': 'white',
          'stroke-width': '2px',
          'd': function(s) {
            return that.getLegendItemPath(s, d, d);
          }
        });
        item.append('circle').attr({
          'fill-opacity': 0,
          'stroke': function(s) {
            return s.color;
          },
          'stroke-width': '2px',
          'r': d / 2
        });
        item.append('text').attr({
          'font-family': 'monospace',
          'font-size': 10,
          'transform': 'translate(13, 4)',
          'text-rendering': 'geometric-precision'
        }).text(function(s) {
          return s.label || s.y;
        });
        return this;
      },
      getLegendItemPath: function(series, w, h) {
        var base_path, path;
        if (series.type === 'column') {
          path = 'M-' + w / 3 + ' -' + h / 8 + ' l0 ' + h + ' ';
          path += 'M0' + ' -' + h / 3 + ' l0 ' + h + ' ';
          path += 'M' + w / 3 + ' -' + h / 10 + ' l0 ' + h + ' ';
          return path;
        }
        base_path = 'M-' + w / 2 + ' 0' + h / 3 + ' l' + w / 3 + ' -' + h / 3 + ' l' + w / 3 + ' ' + h / 3 + ' l' + w / 3 + ' -' + 2 * h / 3;
        if (series.type === 'area') {
          base_path + ' l0 ' + h + ' l-' + w + ' 0z';
        }
        return base_path;
      },
      toggleSeries: function(svg, index) {
        var isVisible;
        isVisible = false;
        svg.select('.content').selectAll('.series_' + index).attr('opacity', function(s) {
          if (d3.select(this).attr('opacity') === '0') {
            isVisible = true;
            return '1';
          }
          isVisible = false;
          return '0';
        });
        return isVisible;
      },
      drawLines: function(svg, scales, data, options) {
        var drawers;
        drawers = {
          y: this.createLeftLineDrawer(scales, options.lineMode, options.tension),
          y2: this.createRightLineDrawer(scales, options.lineMode, options.tension)
        };
        svg.select('.content').selectAll('.lineGroup').data(data.filter(function(s) {
          var _ref;
          return (_ref = s.type) === 'line' || _ref === 'area';
        })).enter().append('g').style('stroke', function(s) {
          return s.color;
        }).attr('class', function(s) {
          return "lineGroup series_" + s.index;
        }).append('path').attr({
          "class": 'line',
          d: function(d) {
            return drawers[d.axis](d.values);
          }
        }).style({
          'fill': 'none',
          'stroke-width': function(s) {
            return s.thickness;
          }
        });
        return this;
      },
      createLeftLineDrawer: function(scales, mode, tension) {
        return d3.svg.line().x(function(d) {
          return scales.xScale(d.x);
        }).y(function(d) {
          return scales.yScale(d.value);
        }).interpolate(mode).tension(tension);
      },
      createRightLineDrawer: function(scales, mode, tension) {
        return d3.svg.line().x(function(d) {
          return scales.xScale(d.x);
        }).y(function(d) {
          return scales.y2Scale(d.value);
        }).interpolate(mode).tension(tension);
      },
      getPixelCssProp: function(element, propertyName) {
        var string;
        string = $window.getComputedStyle(element, null).getPropertyValue(propertyName);
        return +string.replace(/px$/, '');
      },
      getDefaultMargins: function() {
        return {
          top: 20,
          right: 50,
          bottom: 60,
          left: 50
        };
      },
      clean: function(element) {
        return d3.select(element).on('keydown', null).on('keyup', null).select('svg').remove();
      },
      bootstrap: function(element, dimensions) {
        var height, svg, width;
        d3.select(element).classed('chart', true);
        width = dimensions.width;
        height = dimensions.height;
        svg = d3.select(element).append('svg').attr({
          width: width,
          height: height
        }).append('g').attr('transform', 'translate(' + dimensions.left + ',' + dimensions.top + ')');
        svg.append('defs').attr('class', 'patterns');
        return svg;
      },
      createContent: function(svg) {
        return svg.append('g').attr('class', 'content');
      },
      getDataPerSeries: function(data, options) {
        var axes, series, straightenedData;
        series = options.series;
        axes = options.axes;
        if (!(series && series.length && data && data.length)) {
          return [];
        }
        straightenedData = [];
        series.forEach(function(s) {
          var seriesData;
          seriesData = {
            xFormatter: axes.x.tooltipFormatter,
            index: straightenedData.length,
            name: s.y,
            values: [],
            striped: s.striped === true ? true : void 0,
            color: s.color,
            axis: s.axis || 'y',
            type: s.type,
            thickness: s.thickness
          };
          data.filter(function(row) {
            return row[s.y] != null;
          }).forEach(function(row) {
            return seriesData.values.push({
              x: row[options.axes.x.key],
              value: row[s.y],
              axis: s.axis || 'y'
            });
          });
          return straightenedData.push(seriesData);
        });
        return straightenedData;
      },
      resetMargins: function(dimensions) {
        var defaults;
        defaults = this.getDefaultMargins();
        dimensions.left = defaults.left;
        dimensions.right = defaults.right;
        dimensions.top = defaults.top;
        return dimensions.bottom = defaults.bottom;
      },
      adjustMargins: function(dimensions, options, data) {
        var leftSeries, leftWidest, rightSeries, rightWidest, series;
        this.resetMargins(dimensions);
        if (!(data && data.length)) {
          return;
        }
        series = options.series;
        leftSeries = series.filter(function(s) {
          return s.axis !== 'y2';
        });
        leftWidest = this.getWidestOrdinate(data, leftSeries);
        dimensions.left = this.getTextWidth('' + leftWidest) + 20;
        rightSeries = series.filter(function(s) {
          return s.axis === 'y2';
        });
        if (!rightSeries.length) {
          return;
        }
        rightWidest = this.getWidestOrdinate(data, rightSeries);
        return dimensions.right = this.getTextWidth('' + rightWidest) + 20;
      },
      adjustMarginsForThumbnail: function(dimensions, axes) {
        dimensions.top = 1;
        dimensions.bottom = 2;
        dimensions.left = 0;
        return dimensions.right = 1;
      },
      getTextWidth: function(text) {
        return parseInt(text.length * 5) + 10;
      },
      getWidestOrdinate: function(data, series) {
        var widest;
        widest = '';
        data.forEach(function(row) {
          return series.forEach(function(series) {
            if (row[series.y] == null) {
              return;
            }
            if (('' + row[series.y]).length > ('' + widest).length) {
              return widest = row[series.y];
            }
          });
        });
        return widest;
      },
      getDefaultOptions: function() {
        return {
          tooltipMode: 'default',
          lineMode: 'linear',
          tension: 0.7,
          axes: {
            x: {
              type: 'linear',
              key: 'x'
            },
            y: {
              type: 'linear'
            }
          },
          series: []
        };
      },
      sanitizeOptions: function(options) {
        if (options == null) {
          return this.getDefaultOptions();
        }
        options.series = this.sanitizeSeriesOptions(options.series);
        options.axes = this.sanitizeAxes(options.axes, this.haveSecondYAxis(options.series));
        options.lineMode || (options.lineMode = 'linear');
        options.tension = /^\d+(\.\d+)?$/.test(options.tension) ? options.tension : 0.7;
        options.tooltipMode || (options.tooltipMode = 'default');
        return options;
      },
      sanitizeSeriesOptions: function(options) {
        var colors;
        if (options == null) {
          return [];
        }
        colors = d3.scale.category10();
        options.forEach(function(s, i) {
          var _ref;
          s.color || (s.color = colors(i));
          s.type = (_ref = s.type) === 'line' || _ref === 'area' || _ref === 'column' ? s.type : "line";
          if (s.type === 'column') {
            return delete s.thickness;
          } else if (!/^\d+px$/.test(s.thickness)) {
            return s.thickness = '1px';
          }
        });
        return options;
      },
      sanitizeAxes: function(axesOptions, secondAxis) {
        var _base;
        if (axesOptions == null) {
          axesOptions = {};
        }
        axesOptions.x = this.sanitizeAxisOptions(axesOptions.x);
        (_base = axesOptions.x).key || (_base.key = "x");
        axesOptions.y = this.sanitizeAxisOptions(axesOptions.y);
        if (secondAxis) {
          axesOptions.y2 = this.sanitizeAxisOptions(axesOptions.y2);
        }
        return axesOptions;
      },
      sanitizeAxisOptions: function(options) {
        if (options == null) {
          return {
            type: 'linear'
          };
        }
        options.type || (options.type = 'linear');
        return options;
      },
      createAxes: function(svg, dimensions, axesOptions) {
        var drawY2Axis, height, style, that, width, x, xAxis, y, y2, y2Axis, yAxis, _ref;
        drawY2Axis = axesOptions.y2 != null;
        width = dimensions.width;
        height = dimensions.height;
        width = width - dimensions.left - dimensions.right;
        height = height - dimensions.top - dimensions.bottom;
        x = void 0;
        if (axesOptions.x.type === 'date') {
          x = d3.time.scale().rangeRound([0, width]);
        } else {
          x = d3.scale.linear().rangeRound([0, width]);
        }
        y = void 0;
        if (axesOptions.y.type === 'log') {
          y = d3.scale.log().clamp(true).rangeRound([height, 0]);
        } else {
          y = d3.scale.linear().rangeRound([height, 0]);
        }
        y2 = void 0;
        if (drawY2Axis && axesOptions.y2.type === 'log') {
          y2 = d3.scale.log().clamp(true).rangeRound([height, 0]);
        } else {
          y2 = d3.scale.linear().rangeRound([height, 0]);
        }
        xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(axesOptions.x.labelFunction);
        yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(axesOptions.y.labelFunction);
        y2Axis = d3.svg.axis().scale(y2).orient('right').tickFormat((_ref = axesOptions.y2) != null ? _ref.labelFunction : void 0);
        style = function(group) {
          group.style({
            'font': '10px monospace',
            'shape-rendering': 'crispEdges'
          });
          return group.selectAll('path').style({
            'fill': 'none',
            'stroke': '#000'
          });
        };
        that = this;
        return {
          xScale: x,
          yScale: y,
          y2Scale: y2,
          xAxis: xAxis,
          yAxis: yAxis,
          y2Axis: y2Axis,
          andAddThemIf: function(condition) {
            if (!condition) {
              style(svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis));
              style(svg.append('g').attr('class', 'y axis').call(yAxis));
              if (drawY2Axis) {
                style(svg.append('g').attr('class', 'y2 axis').attr('transform', 'translate(' + width + ', 0)').call(y2Axis));
              }
            }
            return {
              xScale: x,
              yScale: y,
              y2Scale: y2,
              xAxis: xAxis,
              yAxis: yAxis,
              y2Axis: y2Axis
            };
          }
        };
      },
      setScalesDomain: function(scales, data, series, svg, axesOptions) {
        var y2Domain, y2Series, yDomain, ySeries, _ref;
        this.setXScale(scales.xScale, data, series, axesOptions);
        ySeries = series.filter(function(s) {
          return s.axis !== 'y2';
        });
        y2Series = series.filter(function(s) {
          return s.axis === 'y2';
        });
        yDomain = this.yExtent(ySeries, data);
        if (axesOptions.y.type === 'log') {
          yDomain[0] = yDomain[0] === 0 ? 0.001 : yDomain[0];
        }
        y2Domain = this.yExtent(y2Series, data);
        if (((_ref = axesOptions.y2) != null ? _ref.type : void 0) === 'log') {
          y2Domain[0] = y2Domain[0] === 0 ? 0.001 : y2Domain[0];
        }
        scales.yScale.domain(yDomain).nice();
        scales.y2Scale.domain(y2Domain).nice();
        svg.selectAll('.x.axis').call(scales.xAxis);
        svg.selectAll('.y.axis').call(scales.yAxis);
        return svg.selectAll('.y2.axis').call(scales.y2Axis);
      },
      yExtent: function(series, data) {
        var maxY, minY;
        minY = Number.POSITIVE_INFINITY;
        maxY = Number.NEGATIVE_INFINITY;
        series.forEach(function(s) {
          minY = Math.min(minY, d3.min(data, function(d) {
            return d[s.y];
          }));
          return maxY = Math.max(maxY, d3.max(data, function(d) {
            return d[s.y];
          }));
        });
        return [minY, maxY];
      },
      setXScale: function(xScale, data, series, axesOptions) {
        xScale.domain(d3.extent(data, function(d) {
          return d[axesOptions.x.key];
        }));
        if (series.filter(function(s) {
          return s.type === 'column';
        }).length) {
          return this.adjustXScaleForColumns(xScale, data, axesOptions.x.key);
        }
      },
      adjustXScaleForColumns: function(xScale, data, field) {
        var d, step;
        step = this.getAverageStep(data, field);
        d = xScale.domain();
        if (angular.isDate(d[0])) {
          return xScale.domain([new Date(d[0].getTime() - step), new Date(d[1].getTime() + step)]);
        } else {
          return xScale.domain([d[0] - step, d[1] + step]);
        }
      },
      getAverageStep: function(data, field) {
        var i, n, sum;
        sum = 0;
        n = data.length - 1;
        i = 0;
        while (i < n) {
          sum += data[i + 1][field] - data[i][field];
          i++;
        }
        return sum / n;
      },
      haveSecondYAxis: function(series) {
        return !series.every(function(s) {
          return s.axis !== 'y2';
        });
      },
      addTooltips: function(svg, dimensions, axesOptions) {
        var h, height, p, w, width, xTooltip, y2Tooltip, yTooltip;
        width = dimensions.width;
        height = dimensions.height;
        width = width - dimensions.left - dimensions.right;
        height = height - dimensions.top - dimensions.bottom;
        w = 24;
        h = 18;
        p = 5;
        xTooltip = svg.append('g').attr({
          'id': 'xTooltip',
          'class': 'xTooltip',
          'opacity': 0
        });
        xTooltip.append('path').attr('transform', "translate(0," + (height + 1) + ")");
        xTooltip.append('text').style('text-anchor', 'middle').attr({
          'width': w,
          'height': h,
          'font-family': 'monospace',
          'font-size': 10,
          'transform': 'translate(0,' + (height + 19) + ')',
          'fill': 'white',
          'text-rendering': 'geometric-precision'
        });
        yTooltip = svg.append('g').attr({
          id: 'yTooltip',
          "class": 'yTooltip',
          opacity: 0
        });
        yTooltip.append('path');
        yTooltip.append('text').attr({
          'width': h,
          'height': w,
          'font-family': 'monospace',
          'font-size': 10,
          'fill': 'white',
          'text-rendering': 'geometric-precision'
        });
        if (axesOptions.y2 != null) {
          y2Tooltip = svg.append('g').attr({
            'id': 'y2Tooltip',
            'class': 'y2Tooltip',
            'opacity': 0,
            'transform': 'translate(' + width + ',0)'
          });
          y2Tooltip.append('path');
          return y2Tooltip.append('text').attr({
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
          return this.updateY2Tooltip(svg, target);
        } else {
          return this.updateYTooltip(svg, target);
        }
      },
      onMouseOut: function(svg) {
        return this.hideTooltips(svg);
      },
      updateXTooltip: function(svg, target) {
        var textX, xTooltip;
        xTooltip = svg.select("#xTooltip").transition().attr({
          'opacity': 1.0,
          'transform': 'translate(' + target.x + ',0)'
        });
        textX = void 0;
        if (target.series.xFormatter != null) {
          textX = '' + target.series.xFormatter(target.datum.x);
        } else {
          textX = '' + target.datum.x;
        }
        xTooltip.select('text').text(textX);
        return xTooltip.select('path').attr('fill', target.series.color).attr('d', this.getXTooltipPath(textX));
      },
      getXTooltipPath: function(text) {
        var h, p, w;
        w = this.getTextWidth(text);
        h = 18;
        p = 5;
        return 'm-' + w / 2 + ' ' + p + ' ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 ' + '-' + h + 'l-' + (w / 2 - p) + ' 0 ' + 'l-' + p + ' -' + h / 4 + ' ' + 'l-' + p + ' ' + h / 4 + ' ' + 'l-' + (w / 2 - p) + ' 0z';
      },
      updateYTooltip: function(svg, target) {
        var textY, w, yTooltip, yTooltipText;
        yTooltip = svg.select("#yTooltip").transition().attr({
          'opacity': 1.0,
          'transform': 'translate(0, ' + target.y + ')'
        });
        textY = '' + target.datum.value;
        w = this.getTextWidth(textY);
        yTooltipText = yTooltip.select('text').text(textY);
        yTooltipText.attr({
          'transform': 'translate(' + (-w - 2) + ',3)',
          'width': w
        });
        return yTooltip.select('path').attr('fill', target.series.color).attr('d', this.getYTooltipPath(w));
      },
      getYTooltipPath: function(w) {
        var h, p;
        h = 18;
        p = 5;
        return 'm0 0' + 'l-' + p + ' -' + p + ' ' + 'l0 -' + (h / 2 - p) + ' ' + 'l-' + w + ' 0 ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 -' + (h / 2 - p) + 'l-' + p + ' ' + p + 'z';
      },
      updateY2Tooltip: function(svg, target) {
        var textY, w, y2Tooltip, y2TooltipText;
        y2Tooltip = svg.select("#y2Tooltip").transition().attr('opacity', 1.0);
        textY = '' + target.datum.value;
        w = this.getTextWidth(textY);
        y2TooltipText = y2Tooltip.select('text').text(textY);
        y2TooltipText.attr({
          'transform': 'translate(7, ' + (parseFloat(target.y) + 3) + ')',
          'w': w
        });
        return y2Tooltip.select('path').attr({
          'fill': target.series.color,
          'd': this.getY2TooltipPath(w),
          'transform': 'translate(0, ' + target.y + ')'
        });
      },
      getY2TooltipPath: function(w) {
        var h, p;
        h = 18;
        p = 5;
        return 'm0 0' + 'l' + p + ' ' + p + ' ' + 'l0 ' + (h / 2 - p) + ' ' + 'l' + w + ' 0 ' + 'l0 -' + h + ' ' + 'l-' + w + ' 0 ' + 'l0 ' + (h / 2 - p) + ' ' + 'l-' + p + ' ' + p + 'z';
      },
      hideTooltips: function(svg) {
        svg.select("#xTooltip").transition().attr('opacity', 0);
        svg.select("#yTooltip").transition().attr('opacity', 0);
        return svg.select("#y2Tooltip").transition().attr('opacity', 0);
      }
    };
  }
]);
