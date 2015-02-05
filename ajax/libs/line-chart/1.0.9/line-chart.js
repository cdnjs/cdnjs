
/*
line-chart - v1.0.9 - 26 June 2014
https://github.com/n3-charts/line-chart
Copyright (c) 2014 n3-charts
 */
var directive, m, mod, old_m;

old_m = angular.module('n3-charts.linechart', ['n3charts.utils']);

m = angular.module('n3-line-chart', ['n3charts.utils']);

directive = function(name, conf) {
  old_m.directive(name, conf);
  return m.directive(name, conf);
};

directive('linechart', [
  'n3utils', '$window', '$timeout', function(n3utils, $window, $timeout) {
    var link;
    link = function(scope, element, attrs, ctrl) {
      var dim, initialHandlers, isUpdatingOptions, promise, window_resize, _u;
      _u = n3utils;
      dim = _u.getDefaultMargins();
      scope.updateDimensions = function(dimensions) {
        var bottom, left, right, top;
        top = _u.getPixelCssProp(element[0].parentElement, 'padding-top');
        bottom = _u.getPixelCssProp(element[0].parentElement, 'padding-bottom');
        left = _u.getPixelCssProp(element[0].parentElement, 'padding-left');
        right = _u.getPixelCssProp(element[0].parentElement, 'padding-right');
        dimensions.width = (element[0].parentElement.offsetWidth || 900) - left - right;
        return dimensions.height = (element[0].parentElement.offsetHeight || 500) - top - bottom;
      };
      scope.update = function() {
        scope.updateDimensions(dim);
        return scope.redraw(dim);
      };
      isUpdatingOptions = false;
      initialHandlers = {
        onSeriesVisibilityChange: function(_arg) {
          var index, newVisibility, series;
          series = _arg.series, index = _arg.index, newVisibility = _arg.newVisibility;
          isUpdatingOptions = true;
          scope.options.series[index].visible = newVisibility;
          scope.$apply();
          return isUpdatingOptions = false;
        }
      };
      scope.redraw = function(dimensions) {
        var axes, columnWidth, dataPerSeries, handlers, isThumbnail, options, svg;
        options = _u.sanitizeOptions(scope.options, attrs.mode);
        handlers = angular.extend(initialHandlers, _u.getTooltipHandlers(options));
        dataPerSeries = _u.getDataPerSeries(scope.data, options);
        isThumbnail = attrs.mode === 'thumbnail';
        _u.clean(element[0]);
        svg = _u.bootstrap(element[0], dimensions);
        axes = _u.createAxes(svg, dimensions, options.axes).andAddThemIf(isThumbnail);
        if (dataPerSeries.length) {
          _u.setScalesDomain(axes, scope.data, options.series, svg, options.axes);
        }
        if (isThumbnail) {
          _u.adjustMarginsForThumbnail(dimensions, axes);
        } else {
          _u.adjustMargins(dimensions, options, scope.data);
        }
        _u.createContent(svg, handlers);
        if (dataPerSeries.length) {
          columnWidth = _u.getBestColumnWidth(dimensions, dataPerSeries);
          _u.drawArea(svg, axes, dataPerSeries, options, handlers).drawColumns(svg, axes, dataPerSeries, columnWidth, handlers).drawLines(svg, axes, dataPerSeries, options, handlers);
          if (options.drawDots) {
            _u.drawDots(svg, axes, dataPerSeries, options, handlers);
          }
        }
        if (options.drawLegend) {
          _u.drawLegend(svg, options.series, dimensions, handlers);
        }
        if (options.tooltipMode === 'scrubber') {
          return _u.createGlass(svg, dimensions, handlers, axes, dataPerSeries);
        } else if (options.tooltipMode !== 'none') {
          return _u.addTooltips(svg, dimensions, options.axes);
        }
      };
      promise = void 0;
      window_resize = function() {
        if (promise != null) {
          $timeout.cancel(promise);
        }
        return promise = $timeout(scope.update, 1);
      };
      $window.addEventListener('resize', window_resize);
      scope.$watch('data', scope.update, true);
      return scope.$watch('options', function(v) {
        if (isUpdatingOptions) {
          return;
        }
        return scope.update();
      }, true);
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
  '$window', '$log', '$rootScope', function($window, $log, $rootScope) {
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
      getBestColumnWidth: function(dimensions, seriesData) {
        var avWidth, gap, n, seriesCount;
        if (!(seriesData && seriesData.length !== 0)) {
          return 10;
        }
        n = seriesData[0].values.length + 2;
        seriesCount = seriesData.length;
        gap = 0;
        avWidth = dimensions.width - dimensions.left - dimensions.right;
        return parseInt(Math.max((avWidth - (n - 1) * gap) / (n * seriesCount), 5));
      },
      drawColumns: function(svg, axes, data, columnWidth, handlers) {
        var colGroup, x1;
        data = data.filter(function(s) {
          return s.type === 'column';
        });
        x1 = d3.scale.ordinal().domain(data.map(function(s) {
          return s.name + s.index;
        })).rangeBands([0, data.length * columnWidth], 0);
        colGroup = svg.select('.content').selectAll('.columnGroup').data(data).enter().append("g").attr('class', function(s) {
          return 'columnGroup ' + 'series_' + s.index;
        }).style('fill', function(s) {
          return s.color;
        }).style('fill-opacity', 0.8).attr('transform', function(s) {
          return "translate(" + (x1(s.name + s.index) - data.length * columnWidth / 2) + ",0)";
        }).on('mouseover', function(series) {
          var target;
          target = d3.select(d3.event.target);
          return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
            series: series,
            x: target.attr('x'),
            y: axes[series.axis + 'Scale'](target.datum().value),
            datum: target.datum()
          }) : void 0;
        }).on('mouseout', function(d) {
          d3.select(d3.event.target).attr('r', 2);
          return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
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
      drawDots: function(svg, axes, data, options, handlers) {
        var dotGroup, _ref;
        dotGroup = svg.select('.content').selectAll('.dotGroup').data(data.filter(function(s) {
          var _ref;
          return (_ref = s.type) === 'line' || _ref === 'area';
        })).enter().append('g');
        dotGroup.attr({
          "class": function(s) {
            return "dotGroup series_" + s.index;
          },
          fill: function(s) {
            return s.color;
          }
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
        if ((_ref = options.tooltipMode) === 'dots' || _ref === 'both' || _ref === 'scrubber') {
          dotGroup.on('mouseover', function(series) {
            var target;
            target = d3.select(d3.event.target);
            target.attr('r', 4);
            return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
              series: series,
              x: target.attr('cx'),
              y: target.attr('cy'),
              datum: target.datum()
            }) : void 0;
          }).on('mouseout', function(d) {
            d3.select(d3.event.target).attr('r', 2);
            return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
          });
        }
        return this;
      },
      computeLegendLayout: function(series, dimensions) {
        var fn, i, j, label, layout, leftSeries, rightLayout, rightSeries, w;
        fn = function(s) {
          return s.label || s.y;
        };
        layout = [0];
        leftSeries = series.filter(function(s) {
          return s.axis === 'y';
        });
        i = 1;
        while (i < leftSeries.length) {
          layout.push(this.getTextWidth(fn(leftSeries[i - 1])) + layout[i - 1] + 40);
          i++;
        }
        rightSeries = series.filter(function(s) {
          return s.axis === 'y2';
        });
        if (rightSeries.length === 0) {
          return layout;
        }
        w = dimensions.width - dimensions.right - dimensions.left;
        rightLayout = [w - this.getTextWidth(fn(rightSeries[rightSeries.length - 1]))];
        j = rightSeries.length - 2;
        while (j >= 0) {
          label = fn(rightSeries[j]);
          rightLayout.push(w - this.getTextWidth(label) - (w - rightLayout[rightLayout.length - 1]) - 40);
          j--;
        }
        rightLayout.reverse();
        return layout.concat(rightLayout);
      },
      drawLegend: function(svg, series, dimensions, handlers) {
        var d, item, layout, legend, that;
        layout = this.computeLegendLayout(series, dimensions);
        that = this;
        legend = svg.append('g').attr('class', 'legend');
        d = 16;
        svg.select('defs').append('svg:clipPath').attr('id', 'legend-clip').append('circle').attr('r', d / 2);
        item = legend.selectAll('.legendItem').data(series);
        item.enter().append('g').attr({
          'class': function(s, i) {
            return "legendItem series_" + i;
          },
          'transform': function(s, i) {
            return "translate(" + layout[i] + "," + (dimensions.height - 40) + ")";
          },
          'opacity': function(s, i) {
            if (s.visible === false) {
              that.toggleSeries(svg, i);
              return '0.2';
            }
            return '1';
          }
        });
        item.on('click', function(s, i) {
          var isNowVisible;
          isNowVisible = that.toggleSeries(svg, i);
          d3.select(this).attr('opacity', isNowVisible ? '1' : '0.2');
          return typeof handlers.onSeriesVisibilityChange === "function" ? handlers.onSeriesVisibilityChange({
            series: s,
            index: i,
            newVisibility: isNowVisible
          }) : void 0;
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
          'class': function(d, i) {
            return "legendItem series_" + i;
          },
          'font-family': 'Courier',
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
        svg.select('.content').selectAll('.series_' + index).style('display', function(s) {
          if (d3.select(this).style('display') === 'none') {
            isVisible = true;
            return 'initial';
          } else {
            isVisible = false;
            return 'none';
          }
        });
        return isVisible;
      },
      drawLines: function(svg, scales, data, options, handlers) {
        var drawers, interpolateData, lineGroup, _ref;
        drawers = {
          y: this.createLeftLineDrawer(scales, options.lineMode, options.tension),
          y2: this.createRightLineDrawer(scales, options.lineMode, options.tension)
        };
        lineGroup = svg.select('.content').selectAll('.lineGroup').data(data.filter(function(s) {
          var _ref;
          return (_ref = s.type) === 'line' || _ref === 'area';
        })).enter().append('g');
        lineGroup.style('stroke', function(s) {
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
          },
          'stroke-dasharray': function(s) {
            if (s.lineMode === 'dashed') {
              return '10,3';
            }
            return void 0;
          }
        });
        if ((_ref = options.tooltipMode) === 'both' || _ref === 'lines') {
          interpolateData = function(series) {
            var datum, error, i, interpDatum, maxXPos, maxXValue, maxYPos, maxYValue, minXPos, minXValue, minYPos, minYValue, mousePos, target, valuesData, x, xPercentage, xVal, y, yPercentage, yVal, _i, _len;
            target = d3.select(d3.event.target);
            try {
              mousePos = d3.mouse(this);
            } catch (_error) {
              error = _error;
              mousePos = [0, 0];
            }
            valuesData = target.datum().values;
            for (i = _i = 0, _len = valuesData.length; _i < _len; i = ++_i) {
              datum = valuesData[i];
              x = scales.xScale(datum.x);
              y = scales.yScale(datum.value);
              if ((typeof minXPos === "undefined" || minXPos === null) || x < minXPos) {
                minXPos = x;
                minXValue = datum.x;
              }
              if ((typeof maxXPos === "undefined" || maxXPos === null) || x > maxXPos) {
                maxXPos = x;
                maxXValue = datum.x;
              }
              if ((typeof minYPos === "undefined" || minYPos === null) || y < minYPos) {
                minYPos = y;
              }
              if ((typeof maxYPos === "undefined" || maxYPos === null) || y > maxYPos) {
                maxYPos = y;
              }
              if ((typeof minYValue === "undefined" || minYValue === null) || datum.value < minYValue) {
                minYValue = datum.value;
              }
              if ((typeof maxYValue === "undefined" || maxYValue === null) || datum.value > maxYValue) {
                maxYValue = datum.value;
              }
            }
            xPercentage = (mousePos[0] - minXPos) / (maxXPos - minXPos);
            yPercentage = (mousePos[1] - minYPos) / (maxYPos - minYPos);
            xVal = Math.round(xPercentage * (maxXValue - minXValue) + minXValue);
            yVal = Math.round((1 - yPercentage) * (maxYValue - minYValue) + minYValue);
            interpDatum = {
              x: xVal,
              value: yVal
            };
            return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
              series: series,
              x: mousePos[0],
              y: mousePos[1],
              datum: interpDatum
            }) : void 0;
          };
          lineGroup.on('mousemove', interpolateData).on('mouseout', function(d) {
            return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
          });
        }
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
      createGlass: function(svg, dimensions, handlers, axes, data) {
        var glass, items;
        glass = svg.append('g').attr({
          'class': 'glass-container',
          'opacity': 0
        });
        items = glass.selectAll('.scrubberItem').data(data).enter().append('g').attr('class', function(s, i) {
          return "scrubberItem series_" + i;
        });
        items.append('circle').attr({
          'class': function(s, i) {
            return "scrubberDot series_" + i;
          },
          'fill': 'white',
          'stroke': function(s) {
            return s.color;
          },
          'stroke-width': '2px',
          'r': 4
        });
        items.append('path').attr({
          'class': function(s, i) {
            return "scrubberPath series_" + i;
          },
          'y': '-7px',
          'fill': function(s) {
            return s.color;
          }
        });
        items.append('text').style('text-anchor', function(s) {
          if (s.axis === 'y') {
            return 'end';
          } else {
            return 'start';
          }
        }).attr({
          'class': function(d, i) {
            return "scrubberText series_" + i;
          },
          'height': '14px',
          'font-family': 'Courier',
          'font-size': 10,
          'fill': 'white',
          'transform': function(s) {
            if (s.axis === 'y') {
              return 'translate(-7, 3)';
            } else {
              return 'translate(7, 3)';
            }
          },
          'text-rendering': 'geometric-precision'
        }).text(function(s) {
          return s.label || s.y;
        });
        return glass.append('rect').attr({
          "class": 'glass',
          width: dimensions.width - dimensions.left - dimensions.right,
          height: dimensions.height - dimensions.top - dimensions.bottom
        }).style('fill', 'white').style('fill-opacity', 0.000001).on('mouseover', function() {
          return handlers.onChartHover(svg, d3.select(d3.event.target), axes, data);
        });
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
            thickness: s.thickness,
            lineMode: s.lineMode
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
          tooltipMode: 'dots',
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
          series: [],
          drawLegend: true,
          drawDots: true
        };
      },
      sanitizeOptions: function(options, mode) {
        var _ref;
        if (options == null) {
          return this.getDefaultOptions();
        }
        if (mode === 'thumbnail') {
          options.drawLegend = false;
          options.drawDots = false;
          options.tooltipMode = 'none';
        }
        options.series = this.sanitizeSeriesOptions(options.series);
        options.axes = this.sanitizeAxes(options.axes, this.haveSecondYAxis(options.series));
        options.lineMode || (options.lineMode = 'linear');
        options.tension = /^\d+(\.\d+)?$/.test(options.tension) ? options.tension : 0.7;
        if ((_ref = options.tooltipMode) !== 'none' && _ref !== 'dots' && _ref !== 'lines' && _ref !== 'both' && _ref !== 'scrubber') {
          options.tooltipMode = 'dots';
        }
        if (options.tooltipMode === 'scrubber') {
          options.drawLegend = true;
        }
        if (options.drawLegend !== false) {
          options.drawLegend = true;
        }
        if (options.drawDots !== false) {
          options.drawDots = true;
        }
        return options;
      },
      sanitizeSeriesOptions: function(options) {
        var colors;
        if (options == null) {
          return [];
        }
        colors = d3.scale.category10();
        options.forEach(function(s, i) {
          var _ref, _ref1, _ref2, _ref3;
          s.axis = ((_ref = s.axis) != null ? _ref.toLowerCase() : void 0) !== 'y2' ? 'y' : 'y2';
          s.color || (s.color = colors(i));
          s.type = (_ref1 = s.type) === 'line' || _ref1 === 'area' || _ref1 === 'column' ? s.type : "line";
          if (s.type === 'column') {
            delete s.thickness;
            delete s.lineMode;
          } else if (!/^\d+px$/.test(s.thickness)) {
            s.thickness = '1px';
          }
          if (((_ref2 = s.type) === 'line' || _ref2 === 'area') && ((_ref3 = s.lineMode) !== 'dashed')) {
            return delete s.lineMode;
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
        this.sanitizeExtrema(axesOptions.y);
        if (secondAxis) {
          this.sanitizeExtrema(axesOptions.y2);
        }
        return axesOptions;
      },
      sanitizeExtrema: function(options) {
        var max, min;
        min = this.getSanitizedExtremum(options.min);
        if (min != null) {
          options.min = min;
        } else {
          delete options.min;
        }
        max = this.getSanitizedExtremum(options.max);
        if (max != null) {
          return options.max = max;
        } else {
          return delete options.max;
        }
      },
      getSanitizedExtremum: function(value) {
        var number;
        if (value == null) {
          return void 0;
        }
        number = parseInt(value, 10);
        if (isNaN(number)) {
          $log.warn("Invalid extremum value : " + value + ", deleting it.");
          return void 0;
        }
        return number;
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
        y.clamp(true);
        y2.clamp(true);
        xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(axesOptions.x.labelFunction);
        yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(axesOptions.y.labelFunction);
        y2Axis = d3.svg.axis().scale(y2).orient('right').tickFormat((_ref = axesOptions.y2) != null ? _ref.labelFunction : void 0);
        style = function(group) {
          group.style({
            'font': '10px Courier',
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
        var y2Domain, yDomain;
        this.setXScale(scales.xScale, data, series, axesOptions);
        yDomain = this.getVerticalDomain(axesOptions, data, series, 'y');
        y2Domain = this.getVerticalDomain(axesOptions, data, series, 'y2');
        scales.yScale.domain(yDomain).nice();
        scales.y2Scale.domain(y2Domain).nice();
        svg.selectAll('.x.axis').call(scales.xAxis);
        svg.selectAll('.y.axis').call(scales.yAxis);
        return svg.selectAll('.y2.axis').call(scales.y2Axis);
      },
      getVerticalDomain: function(axesOptions, data, series, key) {
        var domain, o;
        if (!(o = axesOptions[key])) {
          return [];
        }
        domain = this.yExtent(series.filter(function(s) {
          return s.axis === key;
        }), data);
        if (o.type === 'log') {
          domain[0] = domain[0] === 0 ? 0.001 : domain[0];
        }
        if (o.min != null) {
          domain[0] = o.min;
        }
        if (o.max != null) {
          domain[1] = o.max;
        }
        return domain;
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
        if (minY === maxY) {
          if (minY > 0) {
            return [0, minY * 2];
          } else {
            return [minY * 2, 0];
          }
        }
        return [minY, maxY];
      },
      setXScale: function(xScale, data, series, axesOptions) {
        xScale.domain(this.xExtent(data, axesOptions.x.key));
        if (series.filter(function(s) {
          return s.type === 'column';
        }).length) {
          return this.adjustXScaleForColumns(xScale, data, axesOptions.x.key);
        }
      },
      xExtent: function(data, key) {
        var from, to, _ref;
        _ref = d3.extent(data, function(d) {
          return d[key];
        }), from = _ref[0], to = _ref[1];
        if (from === to) {
          if (from > 0) {
            return [0, from * 2];
          } else {
            return [from * 2, 0];
          }
        }
        return [from, to];
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
        if (!(data.length > 1)) {
          return 0;
        }
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
      getTooltipHandlers: function(options) {
        if (options.tooltipMode === 'scrubber') {
          return {
            onChartHover: angular.bind(this, this.showScrubber)
          };
        } else {
          return {
            onMouseOver: angular.bind(this, this.onMouseOver),
            onMouseOut: angular.bind(this, this.onMouseOut)
          };
        }
      },
      showScrubber: function(svg, glass, axes, data) {
        var that;
        that = this;
        glass.on('mousemove', function() {
          svg.selectAll('.glass-container').attr('opacity', 1);
          return that.updateScrubber(svg, d3.mouse(this), axes, data);
        });
        return glass.on('mouseout', function() {
          glass.on('mousemove', null);
          return svg.selectAll('.glass-container').attr('opacity', 0);
        });
      },
      updateScrubber: function(svg, _arg, axes, data) {
        var getClosest, that, x, y;
        x = _arg[0], y = _arg[1];
        getClosest = function(values, value) {
          var i, left, right;
          left = 0;
          right = values.length - 1;
          i = Math.round((right - left) / 2);
          while (true) {
            if (value < values[i].x) {
              right = i;
              i = i - Math.ceil((right - left) / 2);
            } else {
              left = i;
              i = i + Math.floor((right - left) / 2);
            }
            if (i === left || i === right) {
              if (Math.abs(value - values[left].x) < Math.abs(value - values[right].x)) {
                i = left;
              } else {
                i = right;
              }
              break;
            }
          }
          return values[i];
        };
        that = this;
        return data.forEach(function(series, index) {
          var item, v;
          v = getClosest(series.values, axes.xScale.invert(x));
          item = svg.select(".scrubberItem.series_" + index);
          item.transition().duration(50).attr({
            'transform': "translate(" + (axes.xScale(v.x)) + ", " + (axes[v.axis + 'Scale'](v.value)) + ")"
          });
          item.select('text').text(v.value);
          return item.select('path').attr('d', function(s) {
            if (s.axis === 'y2') {
              return that.getY2TooltipPath(that.getTextWidth('' + v.value));
            } else {
              return that.getYTooltipPath(that.getTextWidth('' + v.value));
            }
          });
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
      onMouseOver: function(svg, event) {
        this.updateXTooltip(svg, event);
        if (event.series.axis === 'y2') {
          return this.updateY2Tooltip(svg, event);
        } else {
          return this.updateYTooltip(svg, event);
        }
      },
      onMouseOut: function(svg) {
        return this.hideTooltips(svg);
      },
      updateXTooltip: function(svg, event) {
        var textX, xTooltip;
        xTooltip = svg.select("#xTooltip").transition().attr({
          'opacity': 1.0,
          'transform': 'translate(' + event.x + ',0)'
        });
        textX = void 0;
        if (event.series.xFormatter != null) {
          textX = '' + event.series.xFormatter(event.datum.x);
        } else {
          textX = '' + event.datum.x;
        }
        xTooltip.select('text').text(textX);
        return xTooltip.select('path').attr('fill', event.series.color).attr('d', this.getXTooltipPath(textX));
      },
      getXTooltipPath: function(text) {
        var h, p, w;
        w = this.getTextWidth(text);
        h = 18;
        p = 5;
        return 'm-' + w / 2 + ' ' + p + ' ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 ' + '-' + h + 'l-' + (w / 2 - p) + ' 0 ' + 'l-' + p + ' -' + h / 4 + ' ' + 'l-' + p + ' ' + h / 4 + ' ' + 'l-' + (w / 2 - p) + ' 0z';
      },
      updateYTooltip: function(svg, event) {
        var textY, w, yTooltip, yTooltipText;
        yTooltip = svg.select("#yTooltip").transition().attr({
          'opacity': 1.0,
          'transform': 'translate(0, ' + event.y + ')'
        });
        textY = '' + event.datum.value;
        w = this.getTextWidth(textY);
        yTooltipText = yTooltip.select('text').text(textY);
        yTooltipText.attr({
          'transform': 'translate(' + (-w - 2) + ',3)',
          'width': w
        });
        return yTooltip.select('path').attr('fill', event.series.color).attr('d', this.getYTooltipPath(w));
      },
      getYTooltipPath: function(w) {
        var h, p;
        h = 18;
        p = 5;
        return 'm0 0' + 'l-' + p + ' -' + p + ' ' + 'l0 -' + (h / 2 - p) + ' ' + 'l-' + w + ' 0 ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 -' + (h / 2 - p) + 'l-' + p + ' ' + p + 'z';
      },
      updateY2Tooltip: function(svg, event) {
        var textY, w, y2Tooltip, y2TooltipText;
        y2Tooltip = svg.select("#y2Tooltip").transition().attr('opacity', 1.0);
        textY = '' + event.datum.value;
        w = this.getTextWidth(textY);
        y2TooltipText = y2Tooltip.select('text').text(textY);
        y2TooltipText.attr({
          'transform': 'translate(7, ' + (parseFloat(event.y) + 3) + ')',
          'w': w
        });
        return y2Tooltip.select('path').attr({
          'fill': event.series.color,
          'd': this.getY2TooltipPath(w),
          'transform': 'translate(0, ' + event.y + ')'
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
