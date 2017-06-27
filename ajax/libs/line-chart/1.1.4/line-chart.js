
/*
line-chart - v1.1.4 - 10 November 2014
https://github.com/n3-charts/line-chart
Copyright (c) 2014 n3-charts
 */
var directive, m, mod, old_m,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
      element[0].style['font-size'] = 0;
      scope.updateDimensions = function(dimensions) {
        var bottom, left, parent, right, top;
        parent = element[0].parentElement;
        top = _u.getPixelCssProp(parent, 'padding-top');
        bottom = _u.getPixelCssProp(parent, 'padding-bottom');
        left = _u.getPixelCssProp(parent, 'padding-left');
        right = _u.getPixelCssProp(parent, 'padding-right');
        dimensions.width = +(attrs.width || parent.offsetWidth || 900) - left - right;
        return dimensions.height = +(attrs.height || parent.offsetHeight || 500) - top - bottom;
      };
      scope.redraw = function() {
        scope.updateDimensions(dim);
        return scope.update(dim);
      };
      isUpdatingOptions = false;
      initialHandlers = {
        onSeriesVisibilityChange: function(_arg) {
          var index, newVisibility, series;
          series = _arg.series, index = _arg.index, newVisibility = _arg.newVisibility;
          scope.options.series[index].visible = newVisibility;
          return scope.$apply();
        }
      };
      scope.update = function(dimensions) {
        var axes, columnWidth, dataPerSeries, handlers, isThumbnail, options, svg;
        options = _u.sanitizeOptions(scope.options, attrs.mode);
        handlers = angular.extend(initialHandlers, _u.getTooltipHandlers(options));
        dataPerSeries = _u.getDataPerSeries(scope.data, options);
        isThumbnail = attrs.mode === 'thumbnail';
        _u.clean(element[0]);
        svg = _u.bootstrap(element[0], dimensions);
        axes = _u.createAxes(svg, dimensions, options.axes).andAddThemIf(isThumbnail);
        if (dataPerSeries.length) {
          _u.setScalesDomain(axes, scope.data, options.series, svg, options);
        }
        if (isThumbnail) {
          _u.adjustMarginsForThumbnail(dimensions, axes);
        } else {
          _u.adjustMargins(svg, dimensions, options, scope.data);
        }
        _u.createContent(svg, handlers);
        if (dataPerSeries.length) {
          columnWidth = _u.getBestColumnWidth(dimensions, dataPerSeries, options);
          _u.drawArea(svg, axes, dataPerSeries, options, handlers).drawColumns(svg, axes, dataPerSeries, columnWidth, options, handlers).drawLines(svg, axes, dataPerSeries, options, handlers);
          if (options.drawDots) {
            _u.drawDots(svg, axes, dataPerSeries, options, handlers);
          }
        }
        if (options.drawLegend) {
          _u.drawLegend(svg, options.series, dimensions, handlers);
        }
        if (options.tooltip.mode === 'scrubber') {
          return _u.createGlass(svg, dimensions, handlers, axes, dataPerSeries, options, columnWidth);
        } else if (options.tooltip.mode !== 'none') {
          return _u.addTooltips(svg, dimensions, options.axes);
        }
      };
      promise = void 0;
      window_resize = function() {
        if (promise != null) {
          $timeout.cancel(promise);
        }
        return promise = $timeout(scope.redraw, 1);
      };
      $window.addEventListener('resize', window_resize);
      scope.$watch('data', scope.redraw, true);
      return scope.$watch('options', scope.redraw, true);
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
      addPatterns: function(svg, series) {
        var pattern;
        pattern = svg.select('defs').selectAll('pattern').data(series.filter(function(s) {
          return s.striped;
        })).enter().append('pattern').attr({
          id: function(s) {
            return s.type + 'Pattern_' + s.index;
          },
          patternUnits: "userSpaceOnUse",
          x: 0,
          y: 0,
          width: 60,
          height: 60
        }).append('g').style({
          'fill': function(s) {
            return s.color;
          },
          'fill-opacity': 0.3
        });
        pattern.append('rect').style('fill-opacity', 0.3).attr('width', 60).attr('height', 60);
        pattern.append('path').attr('d', "M 10 0 l10 0 l -20 20 l 0 -10 z");
        pattern.append('path').attr('d', "M40 0 l10 0 l-50 50 l0 -10 z");
        pattern.append('path').attr('d', "M60 10 l0 10 l-40 40 l-10 0 z");
        return pattern.append('path').attr('d', "M60 40 l0 10 l-10 10 l -10 0 z");
      },
      drawArea: function(svg, scales, data, options) {
        var areaSeries, drawers;
        areaSeries = data.filter(function(series) {
          return series.type === 'area';
        });
        this.addPatterns(svg, areaSeries);
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
          return scales.yScale(d.y0);
        }).y1(function(d) {
          return scales.yScale(d.y0 + d.y);
        }).interpolate(mode).tension(tension);
      },
      createRightAreaDrawer: function(scales, mode, tension) {
        return d3.svg.area().x(function(d) {
          return scales.xScale(d.x);
        }).y0(function(d) {
          return scales.y2Scale(d.y0);
        }).y1(function(d) {
          return scales.y2Scale(d.y0 + d.y);
        }).interpolate(mode).tension(tension);
      },
      getPseudoColumns: function(data, options) {
        var keys, pseudoColumns;
        data = data.filter(function(s) {
          return s.type === 'column';
        });
        pseudoColumns = {};
        keys = [];
        data.forEach(function(series) {
          var i, inAStack, index;
          inAStack = false;
          options.stacks.forEach(function(stack, index) {
            var _ref;
            if ((series.id != null) && (_ref = series.id, __indexOf.call(stack.series, _ref) >= 0)) {
              pseudoColumns[series.id] = index;
              if (__indexOf.call(keys, index) < 0) {
                keys.push(index);
              }
              return inAStack = true;
            }
          });
          if (inAStack === false) {
            i = pseudoColumns[series.id] = index = keys.length;
            return keys.push(i);
          }
        });
        return {
          pseudoColumns: pseudoColumns,
          keys: keys
        };
      },
      getBestColumnWidth: function(dimensions, seriesData, options) {
        var avWidth, keys, n, pseudoColumns, seriesCount, _ref;
        if (!(seriesData && seriesData.length !== 0)) {
          return 10;
        }
        if ((seriesData.filter(function(s) {
          return s.type === 'column';
        })).length === 0) {
          return 10;
        }
        _ref = this.getPseudoColumns(seriesData, options), pseudoColumns = _ref.pseudoColumns, keys = _ref.keys;
        n = seriesData[0].values.length + 2;
        seriesCount = keys.length;
        avWidth = dimensions.width - dimensions.left - dimensions.right;
        return parseInt(Math.max((avWidth - (n - 1) * options.columnsHGap) / (n * seriesCount), 5));
      },
      getColumnAxis: function(data, columnWidth, options) {
        var keys, pseudoColumns, x1, _ref;
        _ref = this.getPseudoColumns(data, options), pseudoColumns = _ref.pseudoColumns, keys = _ref.keys;
        x1 = d3.scale.ordinal().domain(keys).rangeBands([0, keys.length * columnWidth], 0);
        return function(s) {
          var index;
          if (pseudoColumns[s.id] == null) {
            return 0;
          }
          index = pseudoColumns[s.id];
          return x1(index) - keys.length * columnWidth / 2;
        };
      },
      drawColumns: function(svg, axes, data, columnWidth, options, handlers) {
        var colGroup, x1;
        data = data.filter(function(s) {
          return s.type === 'column';
        });
        x1 = this.getColumnAxis(data, columnWidth, options);
        data.forEach(function(s) {
          return s.xOffset = x1(s) + columnWidth * .5;
        });
        colGroup = svg.select('.content').selectAll('.columnGroup').data(data).enter().append("g").attr('class', function(s) {
          return 'columnGroup series_' + s.index;
        }).style('stroke', function(s) {
          return s.color;
        }).style('fill', function(s) {
          return s.color;
        }).style('fill-opacity', 0.8).attr('transform', function(s) {
          return "translate(" + x1(s) + ",0)";
        }).on('mouseover', function(series) {
          var target;
          target = d3.select(d3.event.target);
          return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
            series: series,
            x: target.attr('x'),
            y: axes[series.axis + 'Scale'](target.datum().y0 + target.datum().y),
            datum: target.datum()
          }) : void 0;
        }).on('mouseout', function(d) {
          d3.select(d3.event.target).attr('r', 2);
          return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
        });
        colGroup.selectAll("rect").data(function(d) {
          return d.values;
        }).enter().append("rect").style({
          'stroke-opacity': function(d) {
            if (d.y === 0) {
              return '0';
            } else {
              return '1';
            }
          },
          'stroke-width': '1px',
          'fill-opacity': function(d) {
            if (d.y === 0) {
              return 0;
            } else {
              return 0.7;
            }
          }
        }).attr({
          width: columnWidth,
          x: function(d) {
            return axes.xScale(d.x);
          },
          height: function(d) {
            if (d.y === 0) {
              return axes[d.axis + 'Scale'].range()[0];
            }
            return Math.abs(axes[d.axis + 'Scale'](d.y0 + d.y) - axes[d.axis + 'Scale'](d.y0));
          },
          y: function(d) {
            if (d.y === 0) {
              return 0;
            } else {
              return axes[d.axis + 'Scale'](Math.max(0, d.y0 + d.y));
            }
          }
        });
        return this;
      },
      drawDots: function(svg, axes, data, options, handlers) {
        var dotGroup;
        dotGroup = svg.select('.content').selectAll('.dotGroup').data(data.filter(function(s) {
          var _ref;
          return ((_ref = s.type) === 'line' || _ref === 'area') && s.drawDots;
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
          'r': function(d) {
            return d.dotSize;
          },
          'cx': function(d) {
            return axes.xScale(d.x);
          },
          'cy': function(d) {
            return axes[d.axis + 'Scale'](d.y + d.y0);
          }
        }).style({
          'stroke': 'white',
          'stroke-width': '2px'
        });
        if (options.tooltip.mode !== 'none') {
          dotGroup.on('mouseover', function(series) {
            var target;
            target = d3.select(d3.event.target);
            target.attr('r', function(s) {
              return s.dotSize + 2;
            });
            return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
              series: series,
              x: target.attr('cx'),
              y: target.attr('cy'),
              datum: target.datum()
            }) : void 0;
          }).on('mouseout', function(d) {
            d3.select(d3.event.target).attr('r', function(s) {
              return s.dotSize;
            });
            return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
          });
        }
        return this;
      },
      computeLegendLayout: function(svg, series, dimensions) {
        var cumul, i, j, leftLayout, leftWidths, padding, rightLayout, rightWidths, that, w;
        padding = 10;
        that = this;
        leftWidths = this.getLegendItemsWidths(svg, 'y');
        leftLayout = [0];
        i = 1;
        while (i < leftWidths.length) {
          leftLayout.push(leftWidths[i - 1] + leftLayout[i - 1] + padding);
          i++;
        }
        rightWidths = this.getLegendItemsWidths(svg, 'y2');
        if (!(rightWidths.length > 0)) {
          return [leftLayout];
        }
        w = dimensions.width - dimensions.right - dimensions.left;
        cumul = 0;
        rightLayout = [];
        j = rightWidths.length - 1;
        while (j >= 0) {
          rightLayout.push(w - cumul - rightWidths[j]);
          cumul += rightWidths[j] + padding;
          j--;
        }
        rightLayout.reverse();
        return [leftLayout, rightLayout];
      },
      getLegendItemsWidths: function(svg, axis) {
        var bbox, i, items, that, widths;
        that = this;
        bbox = function(t) {
          return that.getTextBBox(t).width;
        };
        items = svg.selectAll(".legendItem." + axis);
        if (!(items.length > 0)) {
          return [];
        }
        widths = [];
        i = 0;
        while (i < items[0].length) {
          widths.push(bbox(items[0][i]));
          i++;
        }
        return widths;
      },
      drawLegend: function(svg, series, dimensions, handlers) {
        var d, item, items, left, legend, right, that, _ref;
        that = this;
        legend = svg.append('g').attr('class', 'legend');
        d = 16;
        svg.select('defs').append('svg:clipPath').attr('id', 'legend-clip').append('circle').attr('r', d / 2);
        item = legend.selectAll('.legendItem').data(series);
        items = item.enter().append('g').attr({
          'class': function(s, i) {
            return "legendItem series_" + i + " " + s.axis;
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
          return typeof handlers.onSeriesVisibilityChange === "function" ? handlers.onSeriesVisibilityChange({
            series: s,
            index: i,
            newVisibility: !(s.visible !== false)
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
            return "legendText series_" + i;
          },
          'font-family': 'Courier',
          'font-size': 10,
          'transform': 'translate(13, 4)',
          'text-rendering': 'geometric-precision'
        }).text(function(s) {
          return s.label || s.y;
        });
        _ref = this.computeLegendLayout(svg, series, dimensions), left = _ref[0], right = _ref[1];
        items.attr({
          'transform': function(s, i) {
            if (s.axis === 'y') {
              return "translate(" + (left.shift()) + "," + (dimensions.height - 40) + ")";
            } else {
              return "translate(" + (right.shift()) + "," + (dimensions.height - 40) + ")";
            }
          }
        });
        return this;
      },
      getLegendItemPath: function(series, w, h) {
        var base_path, path;
        if (series.type === 'column') {
          path = 'M' + (-w / 3) + ' ' + (-h / 8) + ' l0 ' + h + ' ';
          path += 'M0' + ' ' + (-h / 3) + ' l0 ' + h + ' ';
          path += 'M' + w / 3 + ' ' + (-h / 10) + ' l0 ' + h + ' ';
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
        var drawers, interpolateData, lineGroup;
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
        if (options.tooltip.interpolate) {
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
              y = scales.yScale(datum.y);
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
              if ((typeof minYValue === "undefined" || minYValue === null) || datum.y < minYValue) {
                minYValue = datum.y;
              }
              if ((typeof maxYValue === "undefined" || maxYValue === null) || datum.y > maxYValue) {
                maxYValue = datum.y;
              }
            }
            xPercentage = (mousePos[0] - minXPos) / (maxXPos - minXPos);
            yPercentage = (mousePos[1] - minYPos) / (maxYPos - minYPos);
            xVal = Math.round(xPercentage * (maxXValue - minXValue) + minXValue);
            yVal = Math.round((1 - yPercentage) * (maxYValue - minYValue) + minYValue);
            interpDatum = {
              x: xVal,
              y: yVal
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
          return scales.yScale(d.y + d.y0);
        }).interpolate(mode).tension(tension);
      },
      createRightLineDrawer: function(scales, mode, tension) {
        return d3.svg.line().x(function(d) {
          return scales.xScale(d.x);
        }).y(function(d) {
          return scales.y2Scale(d.y + d.y0);
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
      createGlass: function(svg, dimensions, handlers, axes, data, options, columnWidth) {
        var g, g2, glass, items;
        glass = svg.append('g').attr({
          'class': 'glass-container',
          'opacity': 0
        });
        items = glass.selectAll('.scrubberItem').data(data).enter().append('g').attr('class', function(s, i) {
          return "scrubberItem series_" + i;
        });
        g = items.append('g').attr({
          'class': function(s, i) {
            return "rightTT";
          }
        });
        g.append('path').attr({
          'class': function(s, i) {
            return "scrubberPath series_" + i;
          },
          'y': '-7px',
          'fill': function(s) {
            return s.color;
          }
        });
        this.styleTooltip(g.append('text').style('text-anchor', 'start').attr({
          'class': function(d, i) {
            return "scrubberText series_" + i;
          },
          'height': '14px',
          'transform': 'translate(7, 3)',
          'text-rendering': 'geometric-precision'
        })).text(function(s) {
          return s.label || s.y;
        });
        g2 = items.append('g').attr({
          'class': function(s, i) {
            return "leftTT";
          }
        });
        g2.append('path').attr({
          'class': function(s, i) {
            return "scrubberPath series_" + i;
          },
          'y': '-7px',
          'fill': function(s) {
            return s.color;
          }
        });
        this.styleTooltip(g2.append('text').style('text-anchor', 'end').attr({
          'class': function(d, i) {
            return "scrubberText series_" + i;
          },
          'height': '14px',
          'transform': 'translate(-13, 3)',
          'text-rendering': 'geometric-precision'
        })).text(function(s) {
          return s.label || s.y;
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
        return glass.append('rect').attr({
          "class": 'glass',
          width: dimensions.width - dimensions.left - dimensions.right,
          height: dimensions.height - dimensions.top - dimensions.bottom
        }).style('fill', 'white').style('fill-opacity', 0.000001).on('mouseover', function() {
          return handlers.onChartHover(svg, d3.select(d3.event.target), axes, data, options, columnWidth);
        });
      },
      getDataPerSeries: function(data, options) {
        var axes, layout, series, straightened;
        series = options.series;
        axes = options.axes;
        if (!(series && series.length && data && data.length)) {
          return [];
        }
        straightened = series.map(function(s, i) {
          var seriesData;
          seriesData = {
            index: i,
            name: s.y,
            values: [],
            color: s.color,
            axis: s.axis || 'y',
            xOffset: 0,
            type: s.type,
            thickness: s.thickness,
            drawDots: s.drawDots !== false
          };
          if (s.dotSize != null) {
            seriesData.dotSize = s.dotSize;
          }
          if (s.striped === true) {
            seriesData.striped = true;
          }
          if (s.lineMode != null) {
            seriesData.lineMode = s.lineMode;
          }
          if (s.id) {
            seriesData.id = s.id;
          }
          data.filter(function(row) {
            return row[s.y] != null;
          }).forEach(function(row) {
            var d;
            d = {
              x: row[options.axes.x.key],
              y: row[s.y],
              y0: 0,
              axis: s.axis || 'y'
            };
            if (s.dotSize != null) {
              d.dotSize = s.dotSize;
            }
            return seriesData.values.push(d);
          });
          return seriesData;
        });
        if ((options.stacks == null) || options.stacks.length === 0) {
          return straightened;
        }
        layout = d3.layout.stack().values(function(s) {
          return s.values;
        });
        options.stacks.forEach(function(stack) {
          var layers;
          if (!(stack.series.length > 0)) {
            return;
          }
          layers = straightened.filter(function(s, i) {
            var _ref;
            return (s.id != null) && (_ref = s.id, __indexOf.call(stack.series, _ref) >= 0);
          });
          return layout(layers);
        });
        return straightened;
      },
      resetMargins: function(dimensions) {
        var defaults;
        defaults = this.getDefaultMargins();
        dimensions.left = defaults.left;
        dimensions.right = defaults.right;
        dimensions.top = defaults.top;
        return dimensions.bottom = defaults.bottom;
      },
      adjustMargins: function(svg, dimensions, options, data) {
        var leftSeries, leftWidest, rightSeries, rightWidest, series;
        this.resetMargins(dimensions);
        if (!(data && data.length)) {
          return;
        }
        if (!options.series.length) {
          return;
        }
        dimensions.left = this.getWidestTickWidth(svg, 'y');
        dimensions.right = this.getWidestTickWidth(svg, 'y2');
        if (dimensions.right === 0) {
          dimensions.right = 20;
        }
        if (options.tooltip.mode === 'scrubber') {
          return;
        }
        series = options.series;
        leftSeries = series.filter(function(s) {
          return s.axis !== 'y2';
        });
        leftWidest = this.getWidestOrdinate(data, leftSeries, options);
        dimensions.left = this.estimateSideTooltipWidth(svg, leftWidest).width + 20;
        rightSeries = series.filter(function(s) {
          return s.axis === 'y2';
        });
        if (!rightSeries.length) {
          return;
        }
        rightWidest = this.getWidestOrdinate(data, rightSeries, options);
        return dimensions.right = this.estimateSideTooltipWidth(svg, rightWidest).width + 20;
      },
      adjustMarginsForThumbnail: function(dimensions, axes) {
        dimensions.top = 1;
        dimensions.bottom = 2;
        dimensions.left = 0;
        return dimensions.right = 1;
      },
      estimateSideTooltipWidth: function(svg, text) {
        var bbox, t;
        t = svg.append('text');
        t.text('' + text);
        this.styleTooltip(t);
        bbox = this.getTextBBox(t[0][0]);
        t.remove();
        return bbox;
      },
      getTextBBox: function(svgTextElement) {
        return svgTextElement.getBBox();
      },
      getWidestTickWidth: function(svg, axisKey) {
        var bbox, max, ticks, _ref;
        max = 0;
        bbox = this.getTextBBox;
        ticks = svg.select("." + axisKey + ".axis").selectAll('.tick');
        if ((_ref = ticks[0]) != null) {
          _ref.map(function(t) {
            return max = Math.max(max, bbox(t).width);
          });
        }
        return max;
      },
      getWidestOrdinate: function(data, series, options) {
        var widest;
        widest = '';
        data.forEach(function(row) {
          return series.forEach(function(series) {
            var v, _ref;
            v = row[series.y];
            if ((series.axis != null) && ((_ref = options.axes[series.axis]) != null ? _ref.labelFunction : void 0)) {
              v = options.axes[series.axis].labelFunction(v);
            }
            if (v == null) {
              return;
            }
            if (('' + v).length > ('' + widest).length) {
              return widest = v;
            }
          });
        });
        return widest;
      },
      getDefaultOptions: function() {
        return {
          tooltip: {
            mode: 'scrubber'
          },
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
          drawDots: true,
          stacks: [],
          columnsHGap: 5
        };
      },
      sanitizeOptions: function(options, mode) {
        if (options == null) {
          return this.getDefaultOptions();
        }
        if (mode === 'thumbnail') {
          options.drawLegend = false;
          options.drawDots = false;
          options.tooltip = {
            mode: 'none',
            interpolate: false
          };
        }
        options.series = this.sanitizeSeriesOptions(options.series);
        options.stacks = this.sanitizeSeriesStacks(options.stacks, options.series);
        options.axes = this.sanitizeAxes(options.axes, this.haveSecondYAxis(options.series));
        options.lineMode || (options.lineMode = 'linear');
        options.tension = /^\d+(\.\d+)?$/.test(options.tension) ? options.tension : 0.7;
        this.sanitizeTooltip(options);
        options.drawLegend = options.drawLegend !== false;
        options.drawDots = options.drawDots !== false;
        if (!angular.isNumber(options.columnsHGap)) {
          options.columnsHGap = 5;
        }
        return options;
      },
      sanitizeSeriesStacks: function(stacks, series) {
        var seriesKeys;
        if (stacks == null) {
          return [];
        }
        seriesKeys = {};
        series.forEach(function(s) {
          return seriesKeys[s.id] = s;
        });
        stacks.forEach(function(stack) {
          return stack.series.forEach(function(id) {
            var s;
            s = seriesKeys[id];
            if (s != null) {
              if (s.axis !== stack.axis) {
                return $log.warn("Series " + id + " is not on the same axis as its stack");
              }
            } else {
              if (!s) {
                return $log.warn("Unknown series found in stack : " + id);
              }
            }
          });
        });
        return stacks;
      },
      sanitizeTooltip: function(options) {
        var _ref;
        if (!options.tooltip) {
          options.tooltip = {
            mode: 'scrubber'
          };
          return;
        }
        if ((_ref = options.tooltip.mode) !== 'none' && _ref !== 'axes' && _ref !== 'scrubber') {
          options.tooltip.mode = 'scrubber';
        }
        if (options.tooltip.mode === 'scrubber') {
          delete options.tooltip.interpolate;
        } else {
          options.tooltip.interpolate = !!options.tooltip.interpolate;
        }
        if (options.tooltip.mode === 'scrubber' && options.tooltip.interpolate) {
          throw new Error('Interpolation is not supported for scrubber tooltip mode.');
        }
      },
      sanitizeSeriesOptions: function(options) {
        var colors, knownIds;
        if (options == null) {
          return [];
        }
        colors = d3.scale.category10();
        knownIds = {};
        options.forEach(function(s, i) {
          if (knownIds[s.id] != null) {
            throw new Error("Twice the same ID (" + s.id + ") ? Really ?");
          }
          if (s.id != null) {
            return knownIds[s.id] = s;
          }
        });
        options.forEach(function(s, i) {
          var cnt, _ref, _ref1, _ref2, _ref3;
          s.axis = ((_ref = s.axis) != null ? _ref.toLowerCase() : void 0) !== 'y2' ? 'y' : 'y2';
          s.color || (s.color = colors(i));
          s.type = (_ref1 = s.type) === 'line' || _ref1 === 'area' || _ref1 === 'column' ? s.type : "line";
          if (s.type === 'column') {
            delete s.thickness;
            delete s.lineMode;
            delete s.drawDots;
            delete s.dotSize;
          } else if (!/^\d+px$/.test(s.thickness)) {
            s.thickness = '1px';
          }
          if ((_ref2 = s.type) === 'line' || _ref2 === 'area') {
            if ((_ref3 = s.lineMode) !== 'dashed') {
              delete s.lineMode;
            }
            if (s.drawDots !== false && (s.dotSize == null)) {
              s.dotSize = 2;
            }
          }
          if (s.id == null) {
            cnt = 0;
            while (knownIds["series_" + cnt] != null) {
              cnt++;
            }
            s.id = "series_" + cnt;
            knownIds[s.id] = s;
          }
          if (s.drawDots === false) {
            return delete s.dotSize;
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
      sanitizeExtrema: function(options) {
        var max, min;
        min = this.getSanitizedNumber(options.min);
        if (min != null) {
          options.min = min;
        } else {
          delete options.min;
        }
        max = this.getSanitizedNumber(options.max);
        if (max != null) {
          return options.max = max;
        } else {
          return delete options.max;
        }
      },
      getSanitizedNumber: function(value) {
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
        this.sanitizeExtrema(options);
        return options;
      },
      createAxes: function(svg, dimensions, axesOptions) {
        var drawY2Axis, height, style, that, width, x, xAxis, y, y2, y2Axis, yAxis;
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
        xAxis = this.createAxis(x, 'x', axesOptions);
        yAxis = this.createAxis(y, 'y', axesOptions);
        y2Axis = this.createAxis(y2, 'y2', axesOptions);
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
      createAxis: function(scale, key, options) {
        var axis, o, sides;
        sides = {
          x: 'bottom',
          y: 'left',
          y2: 'right'
        };
        o = options[key];
        axis = d3.svg.axis().scale(scale).orient(sides[key]).tickFormat(o != null ? o.labelFunction : void 0);
        if (o == null) {
          return axis;
        }
        if (angular.isNumber(o.ticks)) {
          axis.ticks(o.ticks);
        }
        if (angular.isArray(o.ticks)) {
          axis.tickValues(o.ticks);
        }
        return axis;
      },
      setScalesDomain: function(scales, data, series, svg, options) {
        var y2Domain, yDomain;
        this.setXScale(scales.xScale, data, series, options.axes);
        yDomain = this.getVerticalDomain(options, data, series, 'y');
        y2Domain = this.getVerticalDomain(options, data, series, 'y2');
        scales.yScale.domain(yDomain).nice();
        scales.y2Scale.domain(y2Domain).nice();
        svg.selectAll('.x.axis').call(scales.xAxis);
        svg.selectAll('.y.axis').call(scales.yAxis);
        return svg.selectAll('.y2.axis').call(scales.y2Axis);
      },
      getVerticalDomain: function(options, data, series, key) {
        var domain, o;
        if (!(o = options.axes[key])) {
          return [];
        }
        if ((o.ticks != null) && angular.isArray(o.ticks)) {
          return [o.ticks[0], o.ticks[o.ticks.length - 1]];
        }
        domain = this.yExtent(series.filter(function(s) {
          return s.axis === key && s.visible !== false;
        }), data, options.stacks.filter(function(stack) {
          return stack.axis === key;
        }));
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
      yExtent: function(series, data, stacks) {
        var groups, maxY, minY;
        minY = Number.POSITIVE_INFINITY;
        maxY = Number.NEGATIVE_INFINITY;
        groups = [];
        stacks.forEach(function(stack) {
          return groups.push(stack.series.map(function(id) {
            return (series.filter(function(s) {
              return s.id === id;
            }))[0];
          }));
        });
        series.forEach(function(series, i) {
          var isInStack;
          isInStack = false;
          stacks.forEach(function(stack) {
            var _ref;
            if (_ref = series.id, __indexOf.call(stack.series, _ref) >= 0) {
              return isInStack = true;
            }
          });
          if (!isInStack) {
            return groups.push([series]);
          }
        });
        groups.forEach(function(group) {
          minY = Math.min(minY, d3.min(data, function(d) {
            return group.reduce((function(a, s) {
              return Math.min(a, d[s.y]);
            }), Number.POSITIVE_INFINITY);
          }));
          return maxY = Math.max(maxY, d3.max(data, function(d) {
            return group.reduce((function(a, s) {
              return a + d[s.y];
            }), 0);
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
        var domain, o;
        domain = this.xExtent(data, axesOptions.x.key);
        if (series.filter(function(s) {
          return s.type === 'column';
        }).length) {
          this.adjustXDomainForColumns(domain, data, axesOptions.x.key);
        }
        o = axesOptions.x;
        if (o.min != null) {
          domain[0] = o.min;
        }
        if (o.max != null) {
          domain[1] = o.max;
        }
        return xScale.domain(domain);
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
      adjustXDomainForColumns: function(domain, data, field) {
        var step;
        step = this.getAverageStep(data, field);
        if (angular.isDate(domain[0])) {
          domain[0] = new Date(domain[0].getTime() - step);
          return domain[1] = new Date(domain[1].getTime() + step);
        } else {
          domain[0] = domain[0] - step;
          return domain[1] = domain[1] + step;
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
      showScrubber: function(svg, glass, axes, data, options, columnWidth) {
        var that;
        that = this;
        glass.on('mousemove', function() {
          svg.selectAll('.glass-container').attr('opacity', 1);
          return that.updateScrubber(svg, d3.mouse(this), axes, data, options, columnWidth);
        });
        return glass.on('mouseout', function() {
          glass.on('mousemove', null);
          return svg.selectAll('.glass-container').attr('opacity', 0);
        });
      },
      getClosestPoint: function(values, value) {
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
      },
      updateScrubber: function(svg, _arg, axes, data, options, columnWidth) {
        var ease, positions, that, tickLength, x, y;
        x = _arg[0], y = _arg[1];
        ease = function(element) {
          return element.transition().duration(50);
        };
        that = this;
        positions = [];
        data.forEach(function(series, index) {
          var item, lText, left, rText, right, side, sizes, text, v;
          item = svg.select(".scrubberItem.series_" + index);
          if (options.series[index].visible === false) {
            item.attr('opacity', 0);
            return;
          }
          item.attr('opacity', 1);
          v = that.getClosestPoint(series.values, axes.xScale.invert(x));
          text = v.x + ' : ' + v.y;
          if (options.tooltip.formatter) {
            text = options.tooltip.formatter(v.x, v.y, options.series[index]);
          }
          right = item.select('.rightTT');
          rText = right.select('text');
          rText.text(text);
          left = item.select('.leftTT');
          lText = left.select('text');
          lText.text(text);
          sizes = {
            right: that.getTextBBox(rText[0][0]).width + 5,
            left: that.getTextBBox(lText[0][0]).width + 5
          };
          side = series.axis === 'y2' ? 'right' : 'left';
          x = axes.xScale(v.x);
          if (side === 'left') {
            if (x + that.getTextBBox(lText[0][0]).x - 10 < 0) {
              side = 'right';
            }
          } else if (side === 'right') {
            if (x + sizes.right > that.getTextBBox(svg.select('.glass')[0][0]).width) {
              side = 'left';
            }
          }
          if (side === 'left') {
            ease(right).attr('opacity', 0);
            ease(left).attr('opacity', 1);
          } else {
            ease(right).attr('opacity', 1);
            ease(left).attr('opacity', 0);
          }
          return positions[index] = {
            index: index,
            x: x,
            y: axes[v.axis + 'Scale'](v.y + v.y0),
            side: side,
            sizes: sizes
          };
        });
        positions = this.preventOverlapping(positions);
        tickLength = Math.max(15, 100 / columnWidth);
        return data.forEach(function(series, index) {
          var item, p, tt, xOffset;
          if (options.series[index].visible === false) {
            return;
          }
          p = positions[index];
          item = svg.select(".scrubberItem.series_" + index);
          tt = item.select("." + p.side + "TT");
          xOffset = (p.side === 'left' ? series.xOffset : -series.xOffset);
          tt.select('text').attr('transform', function() {
            if (p.side === 'left') {
              return "translate(" + (-3 - tickLength - xOffset) + ", " + (p.labelOffset + 3) + ")";
            } else {
              return "translate(" + (4 + tickLength + xOffset) + ", " + (p.labelOffset + 3) + ")";
            }
          });
          tt.select('path').attr('d', that.getScrubberPath(p.sizes[p.side] + 1, p.labelOffset, p.side, tickLength + xOffset));
          return ease(item).attr({
            'transform': "translate(" + (positions[index].x + series.xOffset) + ", " + positions[index].y + ")"
          });
        });
      },
      getScrubberPath: function(w, yOffset, side, padding) {
        var h, p, xdir, ydir;
        h = 18;
        p = padding;
        w = w;
        xdir = side === 'left' ? 1 : -1;
        ydir = 1;
        if (yOffset !== 0) {
          ydir = Math.abs(yOffset) / yOffset;
        }
        yOffset || (yOffset = 0);
        return ["m0 0", "l" + xdir + " 0", "l0 " + (yOffset + ydir), "l" + (-xdir * (p + 1)) + " 0", "l0 " + (-h / 2 - ydir), "l" + (-xdir * w) + " 0", "l0 " + h, "l" + (xdir * w) + " 0", "l0 " + (-h / 2 - ydir), "l" + (xdir * (p - 1)) + " 0", "l0 " + (-yOffset + ydir), "l1 0", "z"].join('');
      },
      preventOverlapping: function(positions) {
        var abscissas, getNeighbours, h, offset;
        h = 18;
        abscissas = {};
        positions.forEach(function(p) {
          var _name;
          abscissas[_name = p.x] || (abscissas[_name] = {
            left: [],
            right: []
          });
          return abscissas[p.x][p.side].push(p);
        });
        getNeighbours = function(side) {
          var foundNeighbour, neighbourhood, neighbours, neighboursForX, p, sides, x, y, _ref;
          neighbours = [];
          for (x in abscissas) {
            sides = abscissas[x];
            if (sides[side].length === 0) {
              continue;
            }
            neighboursForX = {};
            while (sides[side].length > 0) {
              p = sides[side].pop();
              foundNeighbour = false;
              for (y in neighboursForX) {
                neighbourhood = neighboursForX[y];
                if ((+y - h <= (_ref = p.y) && _ref <= +y + h)) {
                  neighbourhood.push(p);
                  foundNeighbour = true;
                }
              }
              if (!foundNeighbour) {
                neighboursForX[p.y] = [p];
              }
            }
            neighbours.push(neighboursForX);
          }
          return neighbours;
        };
        offset = function(neighboursForAbscissas) {
          var abs, n, neighbours, start, step, xNeighbours, y;
          step = 20;
          for (abs in neighboursForAbscissas) {
            xNeighbours = neighboursForAbscissas[abs];
            for (y in xNeighbours) {
              neighbours = xNeighbours[y];
              n = neighbours.length;
              if (n === 1) {
                neighbours[0].labelOffset = 0;
                continue;
              }
              neighbours = neighbours.sort(function(a, b) {
                return a.y - b.y;
              });
              if (n % 2 === 0) {
                start = -(step / 2) * (n / 2);
              } else {
                start = -(n - 1) / 2 * step;
              }
              neighbours.forEach(function(neighbour, i) {
                return neighbour.labelOffset = start + step * i;
              });
            }
          }
        };
        offset(getNeighbours('left'));
        offset(getNeighbours('right'));
        return positions;
      },
      getTooltipHandlers: function(options) {
        if (options.tooltip.mode === 'scrubber') {
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
      styleTooltip: function(d3TextElement) {
        return d3TextElement.attr({
          'font-family': 'monospace',
          'font-size': 10,
          'fill': 'white',
          'text-rendering': 'geometric-precision'
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
        this.styleTooltip(xTooltip.append('text').style('text-anchor', 'middle').attr({
          'width': w,
          'height': h,
          'transform': 'translate(0,' + (height + 19) + ')'
        }));
        yTooltip = svg.append('g').attr({
          id: 'yTooltip',
          "class": 'yTooltip',
          opacity: 0
        });
        yTooltip.append('path');
        this.styleTooltip(yTooltip.append('text').attr({
          'width': h,
          'height': w
        }));
        if (axesOptions.y2 != null) {
          y2Tooltip = svg.append('g').attr({
            'id': 'y2Tooltip',
            'class': 'y2Tooltip',
            'opacity': 0,
            'transform': 'translate(' + width + ',0)'
          });
          y2Tooltip.append('path');
          return this.styleTooltip(y2Tooltip.append('text').attr({
            'width': h,
            'height': w
          }));
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
      updateXTooltip: function(svg, _arg) {
        var datum, label, series, textX, x, xTooltip;
        x = _arg.x, datum = _arg.datum, series = _arg.series;
        xTooltip = svg.select("#xTooltip");
        xTooltip.transition().attr({
          'opacity': 1.0,
          'transform': "translate(" + x + ",0)"
        });
        textX = datum.x;
        label = xTooltip.select('text');
        label.text(textX);
        return xTooltip.select('path').attr('fill', series.color).attr('d', this.getXTooltipPath(label[0][0]));
      },
      getXTooltipPath: function(textElement) {
        var h, p, w;
        w = Math.max(this.getTextBBox(textElement).width, 15);
        h = 18;
        p = 5;
        return 'm-' + w / 2 + ' ' + p + ' ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 ' + '' + (-h) + 'l' + (-w / 2 + p) + ' 0 ' + 'l' + (-p) + ' -' + h / 4 + ' ' + 'l' + (-p) + ' ' + h / 4 + ' ' + 'l' + (-w / 2 + p) + ' 0z';
      },
      updateYTooltip: function(svg, _arg) {
        var datum, label, series, w, y, yTooltip;
        y = _arg.y, datum = _arg.datum, series = _arg.series;
        yTooltip = svg.select("#yTooltip");
        yTooltip.transition().attr({
          'opacity': 1.0,
          'transform': "translate(0, " + y + ")"
        });
        label = yTooltip.select('text');
        label.text(datum.y);
        w = this.getTextBBox(label[0][0]).width + 5;
        label.attr({
          'transform': 'translate(' + (-w - 2) + ',3)',
          'width': w
        });
        return yTooltip.select('path').attr('fill', series.color).attr('d', this.getYTooltipPath(w));
      },
      updateY2Tooltip: function(svg, _arg) {
        var datum, label, series, w, y, y2Tooltip;
        y = _arg.y, datum = _arg.datum, series = _arg.series;
        y2Tooltip = svg.select("#y2Tooltip");
        y2Tooltip.transition().attr('opacity', 1.0);
        label = y2Tooltip.select('text');
        label.text(datum.y);
        w = this.getTextBBox(label[0][0]).width + 5;
        label.attr({
          'transform': 'translate(7, ' + (parseFloat(y) + 3) + ')',
          'w': w
        });
        return y2Tooltip.select('path').attr({
          'fill': series.color,
          'd': this.getY2TooltipPath(w),
          'transform': 'translate(0, ' + y + ')'
        });
      },
      getYTooltipPath: function(w) {
        var h, p;
        h = 18;
        p = 5;
        return 'm0 0' + 'l' + (-p) + ' ' + (-p) + ' ' + 'l0 ' + (-h / 2 + p) + ' ' + 'l' + (-w) + ' 0 ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 ' + (-h / 2 + p) + 'l' + (-p) + ' ' + p + 'z';
      },
      getY2TooltipPath: function(w) {
        var h, p;
        h = 18;
        p = 5;
        return 'm0 0' + 'l' + p + ' ' + p + ' ' + 'l0 ' + (h / 2 - p) + ' ' + 'l' + w + ' 0 ' + 'l0 ' + (-h) + ' ' + 'l' + (-w) + ' 0 ' + 'l0 ' + (h / 2 - p) + ' ' + 'l' + (-p) + ' ' + p + 'z';
      },
      hideTooltips: function(svg) {
        svg.select("#xTooltip").transition().attr('opacity', 0);
        svg.select("#yTooltip").transition().attr('opacity', 0);
        return svg.select("#y2Tooltip").transition().attr('opacity', 0);
      }
    };
  }
]);
