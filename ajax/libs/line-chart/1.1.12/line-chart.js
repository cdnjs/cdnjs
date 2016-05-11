
/*
line-chart - v1.1.12 - 12 September 2015
https://github.com/n3-charts/line-chart
Copyright (c) 2015 n3-charts
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
      var dispatch, id, initialHandlers, isUpdatingOptions, promise, updateEvents, window_resize, _u;
      _u = n3utils;
      dispatch = _u.getEventDispatcher();
      id = _u.uuid();
      element[0].style['font-size'] = 0;
      scope.redraw = function() {
        scope.update();
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
      scope.update = function() {
        var axes, columnWidth, dataPerSeries, dimensions, fn, handlers, isThumbnail, options, svg;
        options = _u.sanitizeOptions(scope.options, attrs.mode);
        handlers = angular.extend(initialHandlers, _u.getTooltipHandlers(options));
        dataPerSeries = _u.getDataPerSeries(scope.data, options);
        dimensions = _u.getDimensions(options, element, attrs);
        isThumbnail = attrs.mode === 'thumbnail';
        _u.clean(element[0]);
        svg = _u.bootstrap(element[0], id, dimensions);
        fn = function(key) {
          return (options.series.filter(function(s) {
            return s.axis === key && s.visible !== false;
          })).length > 0;
        };
        axes = _u.createAxes(svg, dimensions, options.axes).andAddThemIf({
          all: !isThumbnail,
          x: true,
          y: fn('y'),
          y2: fn('y2')
        });
        if (dataPerSeries.length) {
          _u.setScalesDomain(axes, scope.data, options.series, svg, options);
        }
        _u.createContent(svg, id, options, handlers);
        if (dataPerSeries.length) {
          columnWidth = _u.getBestColumnWidth(axes, dimensions, dataPerSeries, options);
          _u.drawData(svg, dimensions, axes, dataPerSeries, columnWidth, options, handlers, dispatch);
        }
        if (options.drawLegend) {
          _u.drawLegend(svg, options.series, dimensions, handlers, dispatch);
        }
        if (options.tooltip.mode === 'scrubber') {
          _u.createGlass(svg, dimensions, handlers, axes, dataPerSeries, options, dispatch, columnWidth);
        } else if (options.tooltip.mode !== 'none') {
          _u.addTooltips(svg, dimensions, options.axes);
        }
        _u.createFocus(svg, dimensions, options);
        return _u.setZoom(svg, dimensions, axes, dataPerSeries, columnWidth, options, handlers, dispatch);
      };
      updateEvents = function() {
        if (scope.oldclick) {
          dispatch.on('click', scope.oldclick);
        } else if (scope.click) {
          dispatch.on('click', scope.click);
        } else {
          dispatch.on('click', null);
        }
        if (scope.oldhover) {
          dispatch.on('hover', scope.oldhover);
        } else if (scope.hover) {
          dispatch.on('hover', scope.hover);
        } else {
          dispatch.on('hover', null);
        }
        if (scope.mouseenter) {
          dispatch.on('mouseenter', scope.mouseenter);
        } else {
          dispatch.on('mouseenter', null);
        }
        if (scope.mouseover) {
          dispatch.on('mouseover', scope.mouseover);
        } else {
          dispatch.on('mouseover', null);
        }
        if (scope.mouseout) {
          dispatch.on('mouseout', scope.mouseout);
        } else {
          dispatch.on('mouseout', null);
        }
        if (scope.oldfocus) {
          dispatch.on('focus', scope.oldfocus);
        } else if (scope.focus) {
          dispatch.on('focus', scope.focus);
        } else {
          dispatch.on('focus', null);
        }
        if (scope.toggle) {
          return dispatch.on('toggle', scope.toggle);
        } else {
          return dispatch.on('toggle', null);
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
      scope.$watch('options', scope.redraw, true);
      scope.$watchCollection('[click, hover, focus, toggle]', updateEvents);
      scope.$watchCollection('[mouseenter, mouseover, mouseout]', updateEvents);
      scope.$watchCollection('[oldclick, oldhover, oldfocus]', updateEvents);
      scope.$on('$destroy', function() {
        return $window.removeEventListener('resize', window_resize);
      });
    };
    return {
      replace: true,
      restrict: 'E',
      scope: {
        data: '=',
        options: '=',
        oldclick: '=click',
        oldhover: '=hover',
        oldfocus: '=focus',
        click: '=onClick',
        hover: '=onHover',
        focus: '=onFocus',
        toggle: '=onToggle',
        mouseenter: '=onMouseenter',
        mouseover: '=onMouseover',
        mouseout: '=onMouseout'
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
        var areaGroup, areaJoin, areaSeries, drawers;
        areaSeries = data.filter(function(series) {
          return series.type === 'area';
        });
        this.addPatterns(svg, areaSeries);
        drawers = {
          y: this.createLeftAreaDrawer(scales, options.lineMode, options.tension),
          y2: this.createRightAreaDrawer(scales, options.lineMode, options.tension)
        };
        areaJoin = svg.select('.content').selectAll('.areaGroup').data(areaSeries);
        areaGroup = areaJoin.enter().append('g').attr('class', function(s) {
          return 'areaGroup ' + 'series_' + s.index;
        });
        areaJoin.each(function(series) {
          var dataJoin;
          dataJoin = d3.select(this).selectAll('path').data([series]);
          dataJoin.enter().append('path').attr('class', 'area');
          return dataJoin.style('fill', function(s) {
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
          var i, inAStack, index, visible, _ref;
          i = options.series.map(function(d) {
            return d.id;
          }).indexOf(series.id);
          visible = (_ref = options.series) != null ? _ref[i].visible : void 0;
          if (visible === void 0 || visible === !false) {
            inAStack = false;
            options.stacks.forEach(function(stack, index) {
              var _ref1;
              if ((series.id != null) && (_ref1 = series.id, __indexOf.call(stack.series, _ref1) >= 0)) {
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
          }
        });
        return {
          pseudoColumns: pseudoColumns,
          keys: keys
        };
      },
      getMinDelta: function(seriesData, key, scale, range) {
        return d3.min(seriesData.map(function(series) {
          return series.values.map(function(d) {
            return scale(d[key]);
          }).filter(function(e) {
            if (range) {
              return e >= range[0] && e <= range[1];
            } else {
              return true;
            }
          }).reduce(function(prev, cur, i, arr) {
            var diff;
            diff = i > 0 ? Math.max(cur - arr[i - 1], 0) : Number.MAX_VALUE;
            if (diff < prev) {
              return diff;
            } else {
              return prev;
            }
          }, Number.MAX_VALUE);
        }));
      },
      getBestColumnWidth: function(axes, dimensions, seriesData, options) {
        var colData, delta, innerWidth, keys, nSeries, pseudoColumns, _ref;
        if (!(seriesData && seriesData.length !== 0)) {
          return 10;
        }
        if ((seriesData.filter(function(s) {
          return s.type === 'column';
        })).length === 0) {
          return 10;
        }
        _ref = this.getPseudoColumns(seriesData, options), pseudoColumns = _ref.pseudoColumns, keys = _ref.keys;
        innerWidth = dimensions.width - dimensions.left - dimensions.right;
        colData = seriesData.filter(function(d) {
          return pseudoColumns.hasOwnProperty(d.id);
        });
        delta = this.getMinDelta(colData, 'x', axes.xScale, [0, innerWidth]);
        if (delta > innerWidth) {
          delta = 0.25 * innerWidth;
        }
        nSeries = keys.length;
        if (options.columnsHGap < delta) {
          return Math.max(1.0, (delta - options.columnsHGap) / nSeries);
        } else {
          return Math.max(1.0, delta * 0.8 / nSeries);
        }
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
      drawColumns: function(svg, axes, data, columnWidth, options, handlers, dispatch) {
        var colGroup, colJoin, x1;
        data = data.filter(function(s) {
          return s.type === 'column';
        });
        x1 = this.getColumnAxis(data, columnWidth, options);
        data.forEach(function(s) {
          return s.xOffset = x1(s) + columnWidth * .5;
        });
        colJoin = svg.select('.content').selectAll('.columnGroup').data(data);
        colGroup = colJoin.enter().append("g").attr('class', function(s) {
          return 'columnGroup series_' + s.index;
        });
        colJoin.attr('transform', function(s) {
          return "translate(" + x1(s) + ",0)";
        });
        colJoin.each(function(series) {
          var dataJoin, i, visible, _ref;
          i = options.series.map(function(d) {
            return d.id;
          }).indexOf(series.id);
          visible = (_ref = options.series) != null ? _ref[i].visible : void 0;
          if (visible === void 0 || visible === !false) {
            dataJoin = d3.select(this).selectAll("rect").data(series.values);
            dataJoin.enter().append("rect").on({
              'click': function(d, i) {
                return dispatch.click(d, i, series);
              }
            }).on('mouseenter', function(d, i) {
              return dispatch.mouseenter(d, i, series);
            }).on('mouseover', function(d, i) {
              if (typeof handlers.onMouseOver === "function") {
                handlers.onMouseOver(svg, {
                  series: series,
                  x: axes.xScale(d.x),
                  y: axes[d.axis + 'Scale'](d.y0 + d.y),
                  datum: d
                }, options.axes);
              }
              dispatch.hover(d, i, series);
              return dispatch.mouseover(d, i, series);
            }).on('mouseout', function(d, i) {
              if (typeof handlers.onMouseOut === "function") {
                handlers.onMouseOut(svg);
              }
              return dispatch.mouseout(d, i, series);
            });
            return dataJoin.style({
              'stroke': series.color,
              'fill': series.color,
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
          }
        });
        return this;
      },
      drawDots: function(svg, axes, data, options, handlers, dispatch) {
        var dotGroup, dotJoin;
        dotJoin = svg.select('.content').selectAll('.dotGroup').data(data.filter(function(s) {
          var _ref;
          return ((_ref = s.type) === 'line' || _ref === 'area') && s.drawDots;
        }));
        dotGroup = dotJoin.enter().append('g').attr('class', function(s) {
          return "dotGroup series_" + s.index;
        });
        dotJoin.attr('fill', function(s) {
          return s.color;
        });
        dotJoin.each(function(series) {
          var dataJoin;
          dataJoin = d3.select(this).selectAll('.dot').data(series.values);
          dataJoin.enter().append('circle').attr('class', 'dot').on({
            'click': function(d, i) {
              return dispatch.click(d, i, series);
            }
          }).on({
            'mouseenter': function(d, i) {
              return dispatch.mouseenter(d, i, series);
            }
          }).on({
            'mouseover': function(d, i) {
              dispatch.hover(d, i, series);
              return dispatch.mouseover(d, i, series);
            }
          }).on({
            'mouseout': function(d, i) {
              return dispatch.mouseout(d, i, series);
            }
          });
          return dataJoin.attr({
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
        });
        if (options.tooltip.mode !== 'none') {
          dotGroup.on('mouseover', function(series) {
            var d, target;
            target = d3.select(d3.event.target);
            d = target.datum();
            target.attr('r', function(s) {
              return s.dotSize + 2;
            });
            return typeof handlers.onMouseOver === "function" ? handlers.onMouseOver(svg, {
              series: series,
              x: target.attr('cx'),
              y: target.attr('cy'),
              datum: d
            }, options.axes) : void 0;
          }).on('mouseout', function(d) {
            d3.select(d3.event.target).attr('r', function(s) {
              return s.dotSize;
            });
            return typeof handlers.onMouseOut === "function" ? handlers.onMouseOut(svg) : void 0;
          });
        }
        return this;
      },
      getEventDispatcher: function() {
        var events;
        events = ['focus', 'hover', 'mouseenter', 'mouseover', 'mouseout', 'click', 'toggle'];
        return d3.dispatch.apply(this, events);
      },
      resetZoom: function(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom) {
        zoom.scale(1);
        zoom.translate([0, 0]);
        return this.getZoomHandler(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, false)();
      },
      getZoomHandler: function(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom) {
        var self;
        self = this;
        return function() {
          var zoomed;
          zoomed = false;
          ['x', 'y', 'y2'].forEach(function(axis) {
            var _ref;
            if (((_ref = options.axes[axis]) != null ? _ref.zoomable : void 0) != null) {
              svg.selectAll("." + axis + ".axis").call(axes["" + axis + "Axis"]);
              return zoomed = true;
            }
          });
          if (data.length) {
            columnWidth = self.getBestColumnWidth(axes, dimensions, data, options);
            self.drawData(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch);
          }
          if (zoom && zoomed) {
            return self.createZoomResetIcon(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom);
          }
        };
      },
      setZoom: function(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch) {
        var zoom;
        zoom = this.getZoomListener(axes, options);
        if (zoom) {
          zoom.on("zoom", this.getZoomHandler(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom));
          return svg.call(zoom);
        }
      },
      getZoomListener: function(axes, options) {
        var zoom, zoomable;
        zoomable = false;
        zoom = d3.behavior.zoom();
        ['x', 'y', 'y2'].forEach(function(axis) {
          var _ref;
          if ((_ref = options.axes[axis]) != null ? _ref.zoomable : void 0) {
            zoom[axis](axes["" + axis + "Scale"]);
            return zoomable = true;
          }
        });
        if (zoomable) {
          return zoom;
        } else {
          return false;
        }
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
      drawLegend: function(svg, series, dimensions, handlers, dispatch) {
        var d, groups, legend, that, translateLegends;
        that = this;
        legend = svg.append('g').attr('class', 'legend');
        d = 16;
        svg.select('defs').append('svg:clipPath').attr('id', 'legend-clip').append('circle').attr('r', d / 2);
        groups = legend.selectAll('.legendItem').data(series);
        groups.enter().append('g').on('click', function(s, i) {
          var visibility;
          visibility = !(s.visible !== false);
          dispatch.toggle(s, i, visibility);
          return typeof handlers.onSeriesVisibilityChange === "function" ? handlers.onSeriesVisibilityChange({
            series: s,
            index: i,
            newVisibility: visibility
          }) : void 0;
        });
        groups.attr({
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
        }).each(function(s) {
          var item, _ref;
          item = d3.select(this);
          item.append('circle').attr({
            'fill': s.color,
            'stroke': s.color,
            'stroke-width': '2px',
            'r': d / 2
          });
          item.append('path').attr({
            'clip-path': 'url(#legend-clip)',
            'fill-opacity': (_ref = s.type) === 'area' || _ref === 'column' ? '1' : '0',
            'fill': 'white',
            'stroke': 'white',
            'stroke-width': '2px',
            'd': that.getLegendItemPath(s, d, d)
          });
          item.append('circle').attr({
            'fill-opacity': 0,
            'stroke': s.color,
            'stroke-width': '2px',
            'r': d / 2
          });
          return item.append('text').attr({
            'class': function(d, i) {
              return "legendText series_" + i;
            },
            'font-family': 'Courier',
            'font-size': 10,
            'transform': 'translate(13, 4)',
            'text-rendering': 'geometric-precision'
          }).text(s.label || s.y);
        });
        translateLegends = function() {
          var left, right, _ref;
          _ref = that.computeLegendLayout(svg, series, dimensions), left = _ref[0], right = _ref[1];
          return groups.attr({
            'transform': function(s, i) {
              if (s.axis === 'y') {
                return "translate(" + (left.shift()) + "," + (dimensions.height - 40) + ")";
              } else {
                return "translate(" + (right.shift()) + "," + (dimensions.height - 40) + ")";
              }
            }
          });
        };
        translateLegends();
        setTimeout(translateLegends, 0);
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
        var drawers, interpolateData, lineGroup, lineJoin;
        drawers = {
          y: this.createLeftLineDrawer(scales, options.lineMode, options.tension),
          y2: this.createRightLineDrawer(scales, options.lineMode, options.tension)
        };
        lineJoin = svg.select('.content').selectAll('.lineGroup').data(data.filter(function(s) {
          var _ref;
          return (_ref = s.type) === 'line' || _ref === 'area';
        }));
        lineGroup = lineJoin.enter().append('g').attr('class', function(s) {
          return "lineGroup series_" + s.index;
        });
        lineJoin.style('stroke', function(s) {
          return s.color;
        });
        lineJoin.each(function(series) {
          var dataJoin;
          dataJoin = d3.select(this).selectAll('path').data([series]);
          dataJoin.enter().append('path').attr('class', 'line');
          return dataJoin.attr('d', function(d) {
            return drawers[d.axis](d.values);
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
            }, options.axes) : void 0;
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
      getDefaultThumbnailMargins: function() {
        return {
          top: 1,
          right: 1,
          bottom: 2,
          left: 0
        };
      },
      getElementDimensions: function(element, width, height) {
        var bottom, dim, left, parent, right, top;
        dim = {};
        parent = element;
        top = this.getPixelCssProp(parent, 'padding-top');
        bottom = this.getPixelCssProp(parent, 'padding-bottom');
        left = this.getPixelCssProp(parent, 'padding-left');
        right = this.getPixelCssProp(parent, 'padding-right');
        dim.width = +(width || parent.offsetWidth || 900) - left - right;
        dim.height = +(height || parent.offsetHeight || 500) - top - bottom;
        return dim;
      },
      getDimensions: function(options, element, attrs) {
        var dim;
        dim = this.getElementDimensions(element[0].parentElement, attrs.width, attrs.height);
        dim = angular.extend(options.margin, dim);
        return dim;
      },
      clean: function(element) {
        return d3.select(element).on('keydown', null).on('keyup', null).select('svg').remove();
      },
      uuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r, v;
          r = Math.random() * 16 | 0;
          v = c === 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      },
      bootstrap: function(element, id, dimensions) {
        var defs, height, svg, width;
        d3.select(element).classed('chart', true);
        width = dimensions.width;
        height = dimensions.height;
        svg = d3.select(element).append('svg').attr({
          width: width,
          height: height
        }).append('g').attr('transform', 'translate(' + dimensions.left + ',' + dimensions.top + ')');
        defs = svg.append('defs').attr('class', 'patterns');
        defs.append('clipPath').attr('class', 'content-clip').attr('id', "content-clip-" + id).append('rect').attr({
          'x': 0,
          'y': 0,
          'width': width - dimensions.left - dimensions.right,
          'height': height - dimensions.top - dimensions.bottom
        });
        return svg;
      },
      createContent: function(svg, id, options) {
        var content;
        content = svg.append('g').attr('class', 'content');
        if (options.hideOverflow) {
          return content.attr('clip-path', "url(#content-clip-" + id + ")");
        }
      },
      createZoomResetIcon: function(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom) {
        var icon, iconJoin, left, path, scale, self, top;
        self = this;
        path = 'M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z';
        iconJoin = svg.select('.focus-container').selectAll('.icon.zoom-reset').data([1]);
        icon = iconJoin.enter().append('g').attr('class', 'icon zoom-reset').on('click', function() {
          self.resetZoom(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch, zoom);
          return d3.select(this).remove();
        }).on('mouseenter', function() {
          return d3.select(this).style('fill', 'steelblue');
        }).on('mouseout', function() {
          return d3.select(this).style('fill', 'black');
        });
        icon.append('path').attr('d', path);
        left = dimensions.width - dimensions.left - dimensions.right - 24;
        top = 2;
        scale = 0.7;
        return iconJoin.style({
          'fill': 'black',
          'stroke': 'white',
          'stroke-width': 1.5
        }).attr({
          opacity: 1,
          transform: "translate(" + left + ", " + top + ") scale(" + scale + ")"
        });
      },
      createFocus: function(svg, dimensions, options) {
        var glass;
        return glass = svg.append('g').attr({
          'class': 'focus-container'
        });
      },
      createGlass: function(svg, dimensions, handlers, axes, data, options, dispatch, columnWidth) {
        var glass, scrubberGroup, that;
        that = this;
        glass = svg.append('g').attr({
          'class': 'glass-container',
          'opacity': 0
        });
        scrubberGroup = glass.selectAll('.scrubberItem').data(data).enter().append('g').attr('class', function(s, i) {
          return "scrubberItem series_" + i;
        });
        scrubberGroup.each(function(s, i) {
          var g, g2, item;
          item = d3.select(this);
          g = item.append('g').attr({
            'class': "rightTT"
          });
          g.append('path').attr({
            'class': "scrubberPath series_" + i,
            'y': '-7px',
            'fill': s.color
          });
          that.styleTooltip(g.append('text').style('text-anchor', 'start').attr({
            'class': function(d, i) {
              return "scrubberText series_" + i;
            },
            'height': '14px',
            'transform': 'translate(7, 3)',
            'text-rendering': 'geometric-precision'
          })).text(s.label || s.y);
          g2 = item.append('g').attr({
            'class': "leftTT"
          });
          g2.append('path').attr({
            'class': "scrubberPath series_" + i,
            'y': '-7px',
            'fill': s.color
          });
          that.styleTooltip(g2.append('text').style('text-anchor', 'end').attr({
            'class': "scrubberText series_" + i,
            'height': '14px',
            'transform': 'translate(-13, 3)',
            'text-rendering': 'geometric-precision'
          })).text(s.label || s.y);
          return item.append('circle').attr({
            'class': "scrubberDot series_" + i,
            'fill': 'white',
            'stroke': s.color,
            'stroke-width': '2px',
            'r': 4
          });
        });
        return glass.append('rect').attr({
          "class": 'glass',
          width: dimensions.width - dimensions.left - dimensions.right,
          height: dimensions.height - dimensions.top - dimensions.bottom
        }).style('fill', 'white').style('fill-opacity', 0.000001).on('mouseover', function() {
          return handlers.onChartHover(svg, d3.select(this), axes, data, options, dispatch, columnWidth);
        });
      },
      drawData: function(svg, dimensions, axes, data, columnWidth, options, handlers, dispatch) {
        this.drawArea(svg, axes, data, options, handlers).drawColumns(svg, axes, data, columnWidth, options, handlers, dispatch).drawLines(svg, axes, data, options, handlers);
        if (options.drawDots) {
          return this.drawDots(svg, axes, data, options, handlers, dispatch);
        }
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
            return series[i].visible === void 0 || series[i].visible;
          }).filter(function(s, i) {
            var _ref;
            return (s.id != null) && (_ref = s.id, __indexOf.call(stack.series, _ref) >= 0);
          });
          return layout(layers);
        });
        return straightened;
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
        var error;
        if (svgTextElement !== null) {
          try {
            return svgTextElement.getBBox();
          } catch (_error) {
            error = _error;
            return {
              height: 0,
              width: 0,
              y: 0,
              x: 0
            };
          }
        }
        return {};
      },
      getWidestTickWidth: function(svg, axisKey) {
        var bbox, max, ticks, _ref;
        max = 0;
        bbox = this.getTextBBox;
        ticks = svg.select("." + axisKey + ".axis").selectAll('.tick');
        if ((_ref = ticks[0]) != null) {
          _ref.forEach(function(t) {
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
            if ((series.axis != null) && ((_ref = options.axes[series.axis]) != null ? _ref.ticksFormatter : void 0)) {
              v = options.axes[series.axis].ticksFormatter(v);
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
          margin: this.getDefaultMargins(),
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
          columnsHGap: 5,
          hideOverflow: false
        };
      },
      sanitizeOptions: function(options, mode) {
        var defaultMargin;
        if (options == null) {
          options = {};
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
        options.tooltip = this.sanitizeTooltip(options.tooltip);
        options.margin = this.sanitizeMargins(options.margin);
        options.lineMode || (options.lineMode = this.getDefaultOptions().lineMode);
        options.tension = /^\d+(\.\d+)?$/.test(options.tension) ? options.tension : this.getDefaultOptions().tension;
        options.drawLegend = options.drawLegend !== false;
        options.drawDots = options.drawDots !== false;
        if (!angular.isNumber(options.columnsHGap)) {
          options.columnsHGap = 5;
        }
        options.hideOverflow = options.hideOverflow || false;
        defaultMargin = mode === 'thumbnail' ? this.getDefaultThumbnailMargins() : this.getDefaultMargins();
        options.series = angular.extend(this.getDefaultOptions().series, options.series);
        options.axes = angular.extend(this.getDefaultOptions().axes, options.axes);
        options.tooltip = angular.extend(this.getDefaultOptions().tooltip, options.tooltip);
        options.margin = angular.extend(defaultMargin, options.margin);
        return options;
      },
      sanitizeMargins: function(options) {
        var attrs, margin, opt, value;
        attrs = ['top', 'right', 'bottom', 'left'];
        margin = {};
        for (opt in options) {
          value = options[opt];
          if (__indexOf.call(attrs, opt) >= 0) {
            margin[opt] = parseFloat(value);
          }
        }
        return margin;
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
        if (!options) {
          return {
            mode: 'scrubber'
          };
        }
        if ((_ref = options.mode) !== 'none' && _ref !== 'axes' && _ref !== 'scrubber') {
          options.mode = 'scrubber';
        }
        if (options.mode === 'scrubber') {
          delete options.interpolate;
        } else {
          options.interpolate = !!options.interpolate;
        }
        if (options.mode === 'scrubber' && options.interpolate) {
          throw new Error('Interpolation is not supported for scrubber tooltip mode.');
        }
        return options;
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
      sanitizeExtrema: function(axisOptions) {
        var extremum, originalValue, _i, _len, _ref, _results;
        _ref = ['min', 'max'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          extremum = _ref[_i];
          originalValue = axisOptions[extremum];
          if (originalValue != null) {
            axisOptions[extremum] = this.sanitizeExtremum(extremum, axisOptions);
            if (axisOptions[extremum] == null) {
              _results.push($log.warn("Invalid " + extremum + " value '" + originalValue + "' (parsed as " + axisOptions[extremum] + "), ignoring it."));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      sanitizeExtremum: function(name, axisOptions) {
        var sanitizer;
        sanitizer = this.sanitizeNumber;
        if (axisOptions.type === 'date') {
          sanitizer = this.sanitizeDate;
        }
        return sanitizer(axisOptions[name]);
      },
      sanitizeDate: function(value) {
        if (value == null) {
          return void 0;
        }
        if (!(value instanceof Date) || isNaN(value.valueOf())) {
          return void 0;
        }
        return value;
      },
      sanitizeNumber: function(value) {
        var number;
        if (value == null) {
          return void 0;
        }
        number = parseFloat(value);
        if (isNaN(number)) {
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
        if (options.ticksRotate != null) {
          options.ticksRotate = this.sanitizeNumber(options.ticksRotate);
        }
        if (options.zoomable != null) {
          options.zoomable = options.zoomable || false;
        }
        if (options.innerTicks != null) {
          options.innerTicks = options.innerTicks || false;
        }
        if (options.labelFunction != null) {
          options.ticksFormatter = options.labelFunction;
        }
        if (options.ticksFormat != null) {
          if (options.type === 'date') {
            options.ticksFormatter = d3.time.format(options.ticksFormat);
          } else {
            options.ticksFormatter = d3.format(options.ticksFormat);
          }
          if (options.tooltipFormatter == null) {
            options.tooltipFormatter = options.ticksFormatter;
          }
        }
        if (options.tooltipFormat != null) {
          if (options.type === 'date') {
            options.tooltipFormatter = d3.time.format(options.tooltipFormat);
          } else {
            options.tooltipFormatter = d3.format(options.tooltipFormat);
          }
        }
        if (options.ticksInterval != null) {
          options.ticksInterval = this.sanitizeNumber(options.ticksInterval);
        }
        this.sanitizeExtrema(options);
        return options;
      },
      createAxes: function(svg, dimensions, axesOptions) {
        var createY2Axis, height, style, width, x, xAxis, y, y2, y2Axis, yAxis;
        createY2Axis = axesOptions.y2 != null;
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
        xAxis = this.createAxis(x, 'x', axesOptions);
        y = void 0;
        if (axesOptions.y.type === 'log') {
          y = d3.scale.log().clamp(true).rangeRound([height, 0]);
        } else {
          y = d3.scale.linear().rangeRound([height, 0]);
        }
        y.clamp(true);
        yAxis = this.createAxis(y, 'y', axesOptions);
        y2 = void 0;
        if (createY2Axis && axesOptions.y2.type === 'log') {
          y2 = d3.scale.log().clamp(true).rangeRound([height, 0]);
        } else {
          y2 = d3.scale.linear().rangeRound([height, 0]);
        }
        y2.clamp(true);
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
        return {
          xScale: x,
          yScale: y,
          y2Scale: y2,
          xAxis: xAxis,
          yAxis: yAxis,
          y2Axis: y2Axis,
          andAddThemIf: function(conditions) {
            if (!!conditions.all) {
              if (!!conditions.y) {
                svg.append('g').attr('class', 'y grid');
                svg.append('g').attr('class', 'y axis').call(yAxis).call(style);
              }
              if (createY2Axis && !!conditions.y2) {
                svg.append('g').attr('class', 'y2 grid').attr('transform', 'translate(' + width + ', 0)');
                svg.append('g').attr('class', 'y2 axis').attr('transform', 'translate(' + width + ', 0)').call(y2Axis).call(style);
              }
              if (!!conditions.x) {
                svg.append('g').attr('class', 'x grid').attr('transform', 'translate(0,' + height + ')');
                svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis).call(style);
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
        axis = d3.svg.axis().scale(scale).orient(sides[key]).innerTickSize(4).tickFormat(o != null ? o.ticksFormatter : void 0);
        if (o == null) {
          return axis;
        }
        if (angular.isArray(o.ticks)) {
          axis.tickValues(o.ticks);
        } else if (angular.isNumber(o.ticks)) {
          axis.ticks(o.ticks);
        } else if (angular.isFunction(o.ticks)) {
          axis.ticks(o.ticks, o.ticksInterval);
        }
        return axis;
      },
      setDefaultStroke: function(selection) {
        return selection.attr('stroke', '#000').attr('stroke-width', 1).style('shape-rendering', 'crispEdges');
      },
      setDefaultGrid: function(selection) {
        return selection.attr('stroke', '#eee').attr('stroke-width', 1).style('shape-rendering', 'crispEdges');
      },
      setScalesDomain: function(scales, data, series, svg, options) {
        var axis, grid, height, width, xGrid, y2Domain, y2Grid, yDomain, yGrid;
        this.setXScale(scales.xScale, data, series, options.axes);
        axis = svg.selectAll('.x.axis').call(scales.xAxis);
        if (options.axes.x.innerTicks != null) {
          axis.selectAll('.tick>line').call(this.setDefaultStroke);
        }
        if (options.axes.x.grid != null) {
          height = options.margin.height - options.margin.top - options.margin.bottom;
          xGrid = scales.xAxis.tickSize(-height, 0, 0);
          grid = svg.selectAll('.x.grid').call(xGrid);
          grid.selectAll('.tick>line').call(this.setDefaultGrid);
        }
        if (options.axes.x.ticksRotate != null) {
          axis.selectAll('.tick>text').attr('dy', null).attr('transform', 'translate(0,5) rotate(' + options.axes.x.ticksRotate + ' 0,6)').style('text-anchor', options.axes.x.ticksRotate >= 0 ? 'start' : 'end');
        }
        if ((series.filter(function(s) {
          return s.axis === 'y' && s.visible !== false;
        })).length > 0) {
          yDomain = this.getVerticalDomain(options, data, series, 'y');
          scales.yScale.domain(yDomain).nice();
          axis = svg.selectAll('.y.axis').call(scales.yAxis);
          if (options.axes.y.innerTicks != null) {
            axis.selectAll('.tick>line').call(this.setDefaultStroke);
          }
          if (options.axes.y.ticksRotate != null) {
            axis.selectAll('.tick>text').attr('transform', 'rotate(' + options.axes.y.ticksRotate + ' -6,0)').style('text-anchor', 'end');
          }
          if (options.axes.y.grid != null) {
            width = options.margin.width - options.margin.left - options.margin.right;
            yGrid = scales.yAxis.tickSize(-width, 0, 0);
            grid = svg.selectAll('.y.grid').call(yGrid);
            grid.selectAll('.tick>line').call(this.setDefaultGrid);
          }
        }
        if ((series.filter(function(s) {
          return s.axis === 'y2' && s.visible !== false;
        })).length > 0) {
          y2Domain = this.getVerticalDomain(options, data, series, 'y2');
          scales.y2Scale.domain(y2Domain).nice();
          axis = svg.selectAll('.y2.axis').call(scales.y2Axis);
          if (options.axes.y2.innerTicks != null) {
            axis.selectAll('.tick>line').call(this.setDefaultStroke);
          }
          if (options.axes.y2.ticksRotate != null) {
            axis.selectAll('.tick>text').attr('transform', 'rotate(' + options.axes.y2.ticksRotate + ' 6,0)').style('text-anchor', 'start');
          }
          if (options.axes.y2.grid != null) {
            width = options.margin.width - options.margin.left - options.margin.right;
            y2Grid = scales.y2Axis.tickSize(-width, 0, 0);
            grid = svg.selectAll('.y2.grid').call(y2Grid);
            return grid.selectAll('.tick>line').call(this.setDefaultGrid);
          }
        }
      },
      getVerticalDomain: function(options, data, series, key) {
        var domain, mySeries, o;
        if (!(o = options.axes[key])) {
          return [];
        }
        if ((o.ticks != null) && angular.isArray(o.ticks)) {
          return [o.ticks[0], o.ticks[o.ticks.length - 1]];
        }
        mySeries = series.filter(function(s) {
          return s.axis === key && s.visible !== false;
        });
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
          group = group.filter(Boolean);
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
        domain = this.xExtent(data, axesOptions.x.key, axesOptions.x.type);
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
      xExtent: function(data, key, type) {
        var delta, from, to, _ref;
        _ref = d3.extent(data, function(d) {
          return d[key];
        }), from = _ref[0], to = _ref[1];
        if (from === to) {
          if (type === 'date') {
            delta = 24 * 60 * 60 * 1000;
            return [new Date(+from - delta), new Date(+to + delta)];
          } else {
            if (from > 0) {
              return [0, from * 2];
            } else {
              return [from * 2, 0];
            }
          }
        }
        return [from, to];
      },
      adjustXDomainForColumns: function(domain, data, field) {
        var step;
        step = this.getAverageStep(data, field);
        if (angular.isDate(domain[0])) {
          domain[0] = new Date(+domain[0] - step);
          return domain[1] = new Date(+domain[1] + step);
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
      showScrubber: function(svg, glass, axes, data, options, dispatch, columnWidth) {
        var that;
        that = this;
        glass.on('mousemove', function() {
          svg.selectAll('.glass-container').attr('opacity', 1);
          return that.updateScrubber(svg, d3.mouse(this), axes, data, options, dispatch, columnWidth);
        });
        return glass.on('mouseout', function() {
          glass.on('mousemove', null);
          return svg.selectAll('.glass-container').attr('opacity', 0);
        });
      },
      getClosestPoint: function(values, xValue) {
        var d, d0, d1, i, xBisector;
        xBisector = d3.bisector(function(d) {
          return d.x;
        }).left;
        i = xBisector(values, xValue);
        if (i === 0) {
          return values[0];
        }
        if (i > values.length - 1) {
          return values[values.length - 1];
        }
        d0 = values[i - 1];
        d1 = values[i];
        d = xValue - d0.x > d1.x - xValue ? d1 : d0;
        return d;
      },
      updateScrubber: function(svg, _arg, axes, data, options, dispatch, columnWidth) {
        var ease, positions, that, tickLength, x, y;
        x = _arg[0], y = _arg[1];
        ease = function(element) {
          return element.transition().duration(50);
        };
        that = this;
        positions = [];
        data.forEach(function(series, index) {
          var color, item, lText, left, rText, right, side, sizes, text, v, xInvert, xPos, yInvert;
          item = svg.select(".scrubberItem.series_" + index);
          if (options.series[index].visible === false) {
            item.attr('opacity', 0);
            return;
          }
          item.attr('opacity', 1);
          xInvert = axes.xScale.invert(x);
          yInvert = axes.yScale.invert(y);
          v = that.getClosestPoint(series.values, xInvert);
          dispatch.focus(v, series.values.indexOf(v), [xInvert, yInvert]);
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
          xPos = axes.xScale(v.x);
          if (side === 'left') {
            if (xPos + that.getTextBBox(lText[0][0]).x - 10 < 0) {
              side = 'right';
            }
          } else if (side === 'right') {
            if (xPos + sizes.right > that.getTextBBox(svg.select('.glass')[0][0]).width) {
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
          positions[index] = {
            index: index,
            x: xPos,
            y: axes[v.axis + 'Scale'](v.y + v.y0),
            side: side,
            sizes: sizes
          };
          color = angular.isFunction(series.color) ? series.color(v, series.values.indexOf(v)) : series.color;
          item.selectAll('circle').attr('stroke', color);
          return item.selectAll('path').attr('fill', color);
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
      onMouseOver: function(svg, event, axesOptions) {
        this.updateXTooltip(svg, event, axesOptions.x);
        if (event.series.axis === 'y2') {
          return this.updateY2Tooltip(svg, event, axesOptions.y2);
        } else {
          return this.updateYTooltip(svg, event, axesOptions.y);
        }
      },
      onMouseOut: function(svg) {
        return this.hideTooltips(svg);
      },
      updateXTooltip: function(svg, _arg, xAxisOptions) {
        var color, datum, label, series, textX, x, xTooltip, _f;
        x = _arg.x, datum = _arg.datum, series = _arg.series;
        xTooltip = svg.select("#xTooltip");
        xTooltip.transition().attr({
          'opacity': 1.0,
          'transform': "translate(" + x + ",0)"
        });
        _f = xAxisOptions.tooltipFormatter;
        textX = _f ? _f(datum.x) : datum.x;
        label = xTooltip.select('text');
        label.text(textX);
        color = angular.isFunction(series.color) ? series.color(datum, series.values.indexOf(datum)) : series.color;
        return xTooltip.select('path').style('fill', color).attr('d', this.getXTooltipPath(label[0][0]));
      },
      getXTooltipPath: function(textElement) {
        var h, p, w;
        w = Math.max(this.getTextBBox(textElement).width, 15);
        h = 18;
        p = 5;
        return 'm-' + w / 2 + ' ' + p + ' ' + 'l0 ' + h + ' ' + 'l' + w + ' 0 ' + 'l0 ' + '' + (-h) + 'l' + (-w / 2 + p) + ' 0 ' + 'l' + (-p) + ' -' + h / 4 + ' ' + 'l' + (-p) + ' ' + h / 4 + ' ' + 'l' + (-w / 2 + p) + ' 0z';
      },
      updateYTooltip: function(svg, _arg, yAxisOptions) {
        var color, datum, label, series, textY, w, y, yTooltip, _f;
        y = _arg.y, datum = _arg.datum, series = _arg.series;
        yTooltip = svg.select("#yTooltip");
        yTooltip.transition().attr({
          'opacity': 1.0,
          'transform': "translate(0, " + y + ")"
        });
        _f = yAxisOptions.tooltipFormatter;
        textY = _f ? _f(datum.y) : datum.y;
        label = yTooltip.select('text');
        label.text(textY);
        w = this.getTextBBox(label[0][0]).width + 5;
        label.attr({
          'transform': 'translate(' + (-w - 2) + ',3)',
          'width': w
        });
        color = angular.isFunction(series.color) ? series.color(datum, series.values.indexOf(datum)) : series.color;
        return yTooltip.select('path').style('fill', color).attr('d', this.getYTooltipPath(w));
      },
      updateY2Tooltip: function(svg, _arg, yAxisOptions) {
        var color, datum, label, series, textY, w, y, y2Tooltip, _f;
        y = _arg.y, datum = _arg.datum, series = _arg.series;
        y2Tooltip = svg.select("#y2Tooltip");
        y2Tooltip.transition().attr('opacity', 1.0);
        _f = yAxisOptions.tooltipFormatter;
        textY = _f ? _f(datum.y) : datum.y;
        label = y2Tooltip.select('text');
        label.text(textY);
        w = this.getTextBBox(label[0][0]).width + 5;
        label.attr({
          'transform': 'translate(7, ' + (parseFloat(y) + 3) + ')',
          'w': w
        });
        color = angular.isFunction(series.color) ? series.color(datum, series.values.indexOf(datum)) : series.color;
        return y2Tooltip.select('path').style('fill', color).attr({
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
