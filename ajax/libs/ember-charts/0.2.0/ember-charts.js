/*!
* ember-charts v0.2.0
* Copyright 2012-2014 Addepar Inc.
* See LICENSE.
*/
(function() {

var _ref;


})();

(function() {

Ember.TEMPLATES["chart"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<svg ");
  hashContexts = {'width': depth0,'height': depth0};
  hashTypes = {'width': "STRING",'height': "STRING"};
  options = {hash:{
    'width': ("outerWidth"),
    'height': ("outerHeight")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\n  <g class=\"chart-viewport\" ");
  hashContexts = {'transform': depth0};
  hashTypes = {'transform': "STRING"};
  options = {hash:{
    'transform': ("transformViewport")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push("></g>\n</svg>\n");
  return buffer;
  
});

})();

(function() {

Ember.AddeparMixins = Ember.AddeparMixins || Ember.Namespace.create();

Ember.AddeparMixins.ResizeHandlerMixin = Ember.Mixin.create({
  resizeEndDelay: 200,
  resizing: false,
  onResizeStart: Ember.K,
  onResizeEnd: Ember.K,
  onResize: Ember.K,
  endResize: Ember.computed(function() {
    return function(event) {
      if (this.isDestroyed) {
        return;
      }
      this.set('resizing', false);
      return typeof this.onResizeEnd === "function" ? this.onResizeEnd(event) : void 0;
    };
  }),
  handleWindowResize: function(event) {
    if (!this.get('resizing')) {
      this.set('resizing', true);
      if (typeof this.onResizeStart === "function") {
        this.onResizeStart(event);
      }
    }
    if (typeof this.onResize === "function") {
      this.onResize(event);
    }
    return Ember.run.debounce(this, this.get('endResize'), event, this.get('resizeEndDelay'));
  },
  didInsertElement: function() {
    this._super();
    return this._setupDocumentHandlers();
  },
  willDestroyElement: function() {
    this._removeDocumentHandlers();
    return this._super();
  },
  _setupDocumentHandlers: function() {
    if (this._resizeHandler) {
      return;
    }
    this._resizeHandler = jQuery.proxy(this.get('handleWindowResize'), this);
    return jQuery(window).on("resize." + this.elementId, this._resizeHandler);
  },
  _removeDocumentHandlers: function() {
    jQuery(window).off("resize." + this.elementId, this._resizeHandler);
    return this._resizeHandler = null;
  }
});


})();

(function() {

Ember.AddeparMixins = Ember.AddeparMixins || Ember.Namespace.create();

Ember.AddeparMixins.StyleBindingsMixin = Ember.Mixin.create({
  concatenatedProperties: ['styleBindings'],
  attributeBindings: ['style'],
  unitType: 'px',
  createStyleString: function(styleName, property) {
    var value;
    value = this.get(property);
    if (value === void 0) {
      return;
    }
    if (Ember.typeOf(value) === 'number') {
      value = value + this.get('unitType');
    }
    return "" + styleName + ":" + value + ";";
  },
  applyStyleBindings: function() {
    var lookup, properties, styleBindings, styleComputed, styles,
      _this = this;
    styleBindings = this.styleBindings;
    if (!styleBindings) {
      return;
    }
    lookup = {};
    styleBindings.forEach(function(binding) {
      var property, style, tmp;
      tmp = binding.split(':');
      property = tmp[0];
      style = tmp[1];
      lookup[style || property] = property;
    });
    styles = Ember.keys(lookup);
    properties = styles.map(function(style) {
      return lookup[style];
    });
    styleComputed = Ember.computed(function() {
      var styleString, styleTokens;
      styleTokens = styles.map(function(style) {
        return _this.createStyleString(style, lookup[style]);
      });
      styleString = styleTokens.join('');
      if (styleString.length !== 0) {
        return styleString;
      }
    });
    styleComputed.property.apply(styleComputed, properties);
    return Ember.defineProperty(this, 'style', styleComputed);
  },
  init: function() {
    this.applyStyleBindings();
    return this._super();
  }
});


})();

(function() {

Ember.Charts = Ember.Namespace.create();

Ember.Charts.VERSION = '0.2.0';

if ((_ref = Ember.libraries) != null) {
  _ref.register('Ember Charts', Ember.Charts.VERSION);
}


})();

(function() {


Ember.Charts.Helpers = Ember.Namespace.create({
  groupBy: function(obj, getter) {
    var group, index, key, result, value, _i, _ref;
    result = {};
    for (index = _i = 0, _ref = obj.length; 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
      value = obj[index];
      key = getter(value, index);
      group = result[key] || (result[key] = []);
      group.push(value);
    }
    return result;
  },
  LabelTrimmer: Ember.Object.extend({
    getLabelSize: function(d, selection) {
      return 100;
    },
    getLabelText: function(d, selection) {
      return d.label;
    },
    trim: Ember.computed(function() {
      var getLabelSize, getLabelText;
      getLabelSize = this.get('getLabelSize');
      getLabelText = this.get('getLabelText');
      return function(selection) {
        return selection.text(function(d) {
          var bbW, charWidth, label, numChars, textLabelWidth;
          bbW = this.getBBox().width;
          label = getLabelText(d, selection);
          if (!label) {
            return '';
          }
          charWidth = bbW / label.length;
          textLabelWidth = getLabelSize(d, selection) - 4 * charWidth;
          numChars = Math.floor(textLabelWidth / charWidth);
          if (numChars - 3 <= 0) {
            return '...';
          } else if (bbW > textLabelWidth) {
            return label.slice(0, numChars - 3) + '...';
          } else {
            return label;
          }
        });
      };
    }).property('getLabelSize', 'getLabelText')
  })
});


})();

(function() {


Ember.Charts.Colorable = Ember.Mixin.create({
  selectedSeedColor: 'rgb(65, 65, 65)',
  tint: 0.8,
  minimumTint: 0,
  maximumTint: 0.66,
  colorScaleType: d3.scale.linear,
  renderVars: ['colorScale'],
  colorRange: Ember.computed(function() {
    var seedColor;
    seedColor = this.get('selectedSeedColor');
    return this.get('getColorRange')(seedColor);
  }).property('selectedSeedColor', 'getColorRange'),
  getColorRange: Ember.computed(function() {
    var _this = this;
    return function(seedColor) {
      var interpolate, maxTintRGB, minTintRGB;
      interpolate = d3.interpolateRgb(seedColor, 'rgb(255,255,255)');
      minTintRGB = interpolate(_this.get('minimumTint'));
      maxTintRGB = interpolate(_this.get('maximumTint'));
      return [d3.rgb(minTintRGB), d3.rgb(maxTintRGB)];
    };
  }).property('minimumTint', 'maximumTint'),
  colorScale: Ember.computed(function() {
    var seedColor;
    seedColor = this.get('selectedSeedColor');
    return this.get('getColorScale')(seedColor);
  }).property('selectedSeedColor', 'getColorScale'),
  getColorScale: Ember.computed(function() {
    var _this = this;
    return function(seedColor) {
      var colorRange;
      colorRange = _this.get('getColorRange')(seedColor);
      return _this.get('colorScaleType')().range(colorRange);
    };
  }).property('getColorRange', 'colorScaleType'),
  secondaryMinimumTint: 0.4,
  secondaryMaximumTint: 0.85,
  secondaryColorScaleType: d3.scale.linear,
  secondaryColorRange: Ember.computed(function() {
    var interpolate, maxTintRGB, minTintRGB, seedColor;
    seedColor = this.get('selectedSeedColor');
    interpolate = d3.interpolateRgb(seedColor, 'rgb(255,255,255)');
    minTintRGB = interpolate(this.get('secondaryMinimumTint'));
    maxTintRGB = interpolate(this.get('secondaryMaximumTint'));
    return [d3.rgb(minTintRGB), d3.rgb(maxTintRGB)];
  }).property('selectedSeedColor', 'secondaryMinimumTint', 'secondaryMaximumTint'),
  secondaryColorScale: Ember.computed(function() {
    return this.get('secondaryColorScaleType')().range(this.get('secondaryColorRange'));
  }).property('secondaryColorRange', 'secondaryColorScaleType'),
  leastTintedColor: Ember.computed(function() {
    return this.get('colorRange')[0];
  }).property('colorRange.@each'),
  mostTintedColor: Ember.computed(function() {
    return this.get('colorRange')[1];
  }).property('colorRange.@each'),
  numColorSeries: 1,
  getSeriesColor: Ember.computed(function() {
    var numColorSeries, selectedSeedColor,
      _this = this;
    numColorSeries = this.get('numColorSeries');
    selectedSeedColor = this.get('selectedSeedColor');
    return function(d, i) {
      var colorRange, colorScale, seedColor;
      seedColor = d.color || selectedSeedColor;
      colorRange = _this.get('getColorRange')(seedColor);
      colorScale = _this.get('getColorScale')(seedColor);
      if (numColorSeries === 1) {
        return colorRange[0];
      } else {
        return colorScale(i / (numColorSeries - 1));
      }
    };
  }).property('numColorSeries', 'getColorRange', 'getColorScale')
}, 'selectedSeedColor', {
  numSecondaryColorSeries: 1,
  getSecondarySeriesColor: Ember.computed(function() {
    var numSecondaryColorSeries,
      _this = this;
    numSecondaryColorSeries = this.get('numSecondaryColorSeries');
    return function(d, i) {
      if (numSecondaryColorSeries === 1) {
        return _this.get('secondaryColorRange')[0];
      } else {
        return _this.get('secondaryColorScale')(i / (numSecondaryColorSeries - 1));
      }
    };
  }).property('numSecondaryColorSeries', 'secondaryColorRange', 'secondaryColorScale')
});


})();

(function() {


Ember.Charts.AxesMixin = Ember.Mixin.create({
  minXTicks: 3,
  minYTicks: 3,
  tickSpacing: 50,
  numXTicks: Ember.computed(function() {
    var calculatedTicks;
    calculatedTicks = Math.floor(this.get('graphicWidth') / this.get('tickSpacing'));
    return Math.max(calculatedTicks, this.get('minXTicks'));
  }).property('graphicWidth', 'tickSpacing', 'minXTicks'),
  numYTicks: Ember.computed(function() {
    var calculatedTicks;
    calculatedTicks = Math.floor(this.get('graphicHeight') / this.get('tickSpacing'));
    return Math.max(calculatedTicks, this.get('minYTicks'));
  }).property('graphicHeight', 'tickSpacing', 'minYTicks')
});


})();

(function() {


Ember.Charts.FloatingTooltipMixin = Ember.Mixin.create({
  tooltipId: Ember.computed(function() {
    return this.get('elementId') + '_tooltip';
  }),
  tooltipWidth: 40,
  tooltipValueDisplayName: 'Value',
  showTooltip: function(content, event) {
    var $ttid;
    $ttid = this.get('$tooltip');
    $ttid.html(content);
    $ttid.show();
    return this.updatePosition(event);
  },
  hideTooltip: function() {
    return this.get('$tooltip').hide();
  },
  updatePosition: function(event) {
    var $tooltipId, curX, curY, height, minTooltipLeft, minTooltipTop, tooltipLeft, tooltipTop, width, windowScrollLeft, windowScrollTop, xOffset, yOffset;
    $tooltipId = this.get('$tooltip');
    xOffset = 10;
    yOffset = 10;
    width = $tooltipId.width();
    height = $tooltipId.height();
    windowScrollTop = $(window).scrollTop();
    windowScrollLeft = $(window).scrollLeft();
    curX = event.clientX + windowScrollLeft;
    curY = event.clientY + windowScrollTop;
    tooltipLeft = curX + ((curX - windowScrollLeft + xOffset * 2 + width) > $(window).width() ? -(width + xOffset * 2) : xOffset);
    tooltipTop = curY + ((curY - windowScrollTop + yOffset * 2 + height) > $(window).height() ? -(height + yOffset * 2) : yOffset);
    minTooltipLeft = windowScrollLeft + xOffset;
    minTooltipTop = windowScrollTop + yOffset;
    if (tooltipLeft < minTooltipLeft) {
      tooltipLeft = minTooltipLeft;
    }
    if (tooltipTop < windowScrollTop + yOffset) {
      tooltipTop = minTooltipTop;
    }
    return $tooltipId.css('top', tooltipTop + 'px').css('left', tooltipLeft + 'px');
  },
  didInsertElement: function() {
    this._super();
    $("body").append("<div class='chart-float-tooltip' id='" + (this.get('tooltipId')) + "'></div>");
    return this.hideTooltip();
  },
  willDestroyElement: function() {
    this._super();
    return this.get('$tooltip').remove();
  },
  widthDidChange: function() {
    return this.get('$tooltip').css('width', this.get('tooltipWidth'));
  }
}, 'tooltipWidth', {
  $tooltip: Ember.computed(function() {
    return $("#" + (this.get('tooltipId')));
  }).volatile()
});


})();

(function() {


Ember.Charts.HasTimeSeriesRule = Ember.Mixin.create({
  lineMarkerTolerance: 60 * 1000,
  mousePosition: Ember.computed(function() {
    if (!d3.event) {
      return null;
    }
    return d3.mouse(this.get('$viewport'));
  }).volatile(),
  isEventWithinValidRange: Ember.computed(function() {
    var inX, inY, x, xRange, y, yRange, _ref;
    xRange = this.get('xRange');
    yRange = this.get('yRange');
    _ref = this.get('mousePosition'), x = _ref[0], y = _ref[1];
    inX = (d3.min(xRange) < x && x < d3.max(xRange));
    inY = (d3.min(yRange) < y && y < d3.max(yRange));
    return inX && inY;
  }).volatile(),
  lineMarkerData: Ember.computed(function() {
    var invXScale, invYScale, lineMarkerTolerance, markerData, mousePosition, timeX;
    mousePosition = this.get('mousePosition');
    if (Ember.isEmpty(mousePosition)) {
      return [];
    }
    invXScale = this.get('xTimeScale').invert;
    invYScale = this.get('yScale').invert;
    lineMarkerTolerance = this.get('lineMarkerTolerance');
    timeX = invXScale(mousePosition[0]);
    markerData = [];
    this.get('viewport').selectAll('path.line').each(function(d, i) {
      var iterations, maxIterations, point, searchEnd, searchLen, searchStart;
      iterations = 0;
      maxIterations = 25;
      searchStart = 0;
      searchEnd = this.getTotalLength();
      searchLen = searchEnd / 2;
      point = this.getPointAtLength(searchLen);
      while (Math.abs(timeX - invXScale(point.x)) > lineMarkerTolerance && maxIterations > ++iterations) {
        if (timeX < invXScale(point.x)) {
          searchEnd = searchLen;
        } else {
          searchStart = searchLen;
        }
        searchLen = (searchStart + searchEnd) / 2;
        point = this.getPointAtLength(searchLen);
      }
      return markerData.push({
        x: point.x,
        y: point.y,
        group: d.group,
        value: invYScale(point.y),
        time: invXScale(point.x),
        path: this
      });
    });
    return markerData;
  }).volatile(),
  rule: Ember.computed(function() {
    var rule;
    rule = this.get('viewport').select('.rule');
    if (rule.empty()) {
      return this.get('viewport').insert('line', '.series').style('stroke-width', 0).attr('class', 'rule');
    } else {
      return rule;
    }
  }).volatile(),
  lineMarkers: Ember.computed(function() {
    return this.get('viewport').selectAll('.line-marker').data(this.get('lineMarkerData'));
  }).volatile(),
  updateLineMarkers: function() {
    var hideDetails, lineMarkers, showDetails;
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    lineMarkers = this.get('lineMarkers');
    lineMarkers.enter().append('path').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    }).attr({
      "class": 'line-marker',
      fill: this.get('getLineColor'),
      d: d3.svg.symbol().size(50).type('circle')
    });
    lineMarkers.exit().remove();
    lineMarkers.attr({
      transform: function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      }
    });
    return lineMarkers.style({
      'stroke-width': function(d) {
        return d3.select(d.path).attr('stroke-width');
      }
    });
  },
  updateRule: function() {
    var x, zeroDisplacement;
    zeroDisplacement = 1;
    x = (this.get('mousePosition') || [0])[0];
    return this.get('rule').attr({
      x1: x,
      x2: x,
      y0: 0,
      y1: this.get('graphicHeight') - zeroDisplacement
    });
  },
  didInsertElement: function() {
    var _this = this;
    this._super();
    this.get('hideRule')();
    return d3.select(this.$('svg')[0]).on('mousemove', function() {
      if (!_this.get('isInteractive')) {
        return;
      }
      if (_this.get('isEventWithinValidRange')) {
        _this.get('showRule')();
        Ember.run(_this, _this.get('updateRule'));
        return Ember.run(_this, _this.get('updateLineMarkers'));
      } else {
        return _this.get('hideRule')();
      }
    });
  },
  isRuleShown: false,
  showRule: Ember.computed(function() {
    var _this = this;
    return function(d) {
      if (!_this.get('hasLineData')) {
        return;
      }
      _this.get('rule').style('stroke-width', 1.5);
      return _this.get('lineMarkers').style('opacity', 1);
    };
  }),
  hideRule: Ember.computed(function() {
    var _this = this;
    return function(d) {
      _this.get('rule').style('stroke-width', 0);
      return _this.get('lineMarkers').style('opacity', 0);
    };
  })
});


})();

(function() {


Ember.Charts.TimeSeriesLabeler = Ember.Mixin.create({
  selectedInterval: 'M',
  maxNumberOfLabels: 10,
  numberOfMinorTicks: Ember.computed(function() {
    var allTicks, findTick, firstIndex, labelledTicks, secondIndex, start, stop, _ref;
    labelledTicks = this.get('labelledTicks');
    _ref = this.get('xDomain'), start = _ref[0], stop = _ref[1];
    allTicks = (function() {
      switch (this.get('selectedInterval')) {
        case 'years':
        case 'Y':
          return d3.time.years(start, stop);
        case 'quarters':
        case 'Q':
          return d3.time.months(start, stop, 3);
        case 'months':
        case 'M':
          return this.monthsBetween(start, stop);
        case 'weeks':
        case 'W':
          return this.weeksBetween(start, stop);
        case 'seconds':
        case 'S':
          return this.secondsBetween(start, stop);
      }
    }).call(this);
    if (labelledTicks.length < 2) {
      return 0;
    }
    findTick = function(tick) {
      return function(x) {
        return +x === +tick;
      };
    };
    secondIndex = _.findIndex(allTicks, findTick(labelledTicks[1]));
    firstIndex = _.findIndex(allTicks, findTick(labelledTicks[0]));
    return secondIndex - firstIndex - 1;
  }).property('xDomain', 'selectedInterval'),
  labelledTicks: Ember.computed(function() {
    var domain;
    domain = this.get('xDomain');
    return this.get('getLabelledTicks')(domain[0], domain[1]);
  }).property('xDomain'),
  labelledYears: function(start, stop) {
    var skipVal, years;
    years = d3.time.years(start, stop);
    if (years.length > this.get('maxNumberOfLabels')) {
      skipVal = Math.ceil(years.length / this.get('maxNumberOfLabels'));
      return d3.time.years(start, stop, skipVal);
    } else {
      return years;
    }
  },
  labelledQuarters: function(start, stop) {
    var quarters;
    quarters = d3.time.months(start, stop, 3);
    if (quarters.length > this.get('maxNumberOfLabels')) {
      return this.labelledYears(start, stop);
    } else {
      return quarters;
    }
  },
  monthsBetween: function(start, stop, skip) {
    if (skip == null) {
      skip = 1;
    }
    return d3.time.months(start, stop).filter(function(d, i) {
      return !(i % skip);
    });
  },
  labelledMonths: function(start, stop) {
    var months, skipVal;
    months = this.monthsBetween(start, stop);
    if (months.length > this.get('maxNumberOfLabels')) {
      skipVal = Math.ceil(months.length / this.get('maxNumberOfLabels'));
      return this.monthsBetween(start, stop, skipVal);
    } else {
      return months;
    }
  },
  weeksBetween: function(start, stop, skip) {
    if (skip == null) {
      skip = 1;
    }
    return d3.time.weeks(start, stop).filter(function(d, i) {
      return !(i % skip);
    });
  },
  secondsBetween: function(start, stop, skip) {
    if (skip == null) {
      skip = 1;
    }
    return d3.time.seconds(start, stop).filter(function(d, i) {
      return !(i % skip);
    });
  },
  labelledWeeks: function(start, stop) {
    var skipVal, weeks;
    weeks = this.weeksBetween(start, stop);
    if (weeks.length > this.get('maxNumberOfLabels')) {
      skipVal = Math.ceil(weeks.length / this.get('maxNumberOfLabels'));
      return this.weeksBetween(start, stop, skipVal);
    } else {
      return weeks;
    }
  },
  getLabelledTicks: Ember.computed(function() {
    var _this = this;
    switch (this.get('selectedInterval')) {
      case 'years':
      case 'Y':
        return function(start, stop) {
          return _this.labelledYears(start, stop);
        };
      case 'quarters':
      case 'Q':
        return function(start, stop) {
          return _this.labelledQuarters(start, stop);
        };
      case 'months':
      case 'M':
        return function(start, stop) {
          return _this.labelledMonths(start, stop);
        };
      case 'weeks':
      case 'W':
        return function(start, stop) {
          return _this.labelledWeeks(start, stop);
        };
      case 'days':
      case 'D':
        return d3.time.days;
      case 'seconds':
      case 'S':
        return function(start, stop) {
          return _this.labelledSeconds(start, stop);
        };
      default:
        return d3.time.years;
    }
  }).property('maxNumberOfLabels', 'selectedInterval'),
  quarterFormat: function(d) {
    var prefix, suffix;
    prefix = (function() {
      switch (d.getMonth() % 12) {
        case 0:
          return 'Q1';
        case 3:
          return 'Q2';
        case 6:
          return 'Q3';
        case 9:
          return 'Q4';
      }
    })();
    suffix = d3.time.format('%Y')(d);
    return prefix + ' ' + suffix;
  },
  formattedTime: Ember.computed(function() {
    switch (this.get('selectedInterval')) {
      case 'years':
      case 'Y':
        return d3.time.format('%Y');
      case 'quarters':
      case 'Q':
        return this.quarterFormat;
      case 'months':
      case 'M':
        return d3.time.format("%b '%y");
      case 'weeks':
      case 'W':
        return d3.time.format('%-m/%-d/%y');
      case 'days':
      case 'D':
        return d3.time.format('%a');
      case 'seconds':
      case 'S':
        return d3.time.format('%M : %S');
      default:
        return d3.time.format('%Y');
    }
  }).property('selectedInterval')
});


})();

(function() {


Ember.Charts.Legend = Ember.Mixin.create({
  legendTopPadding: 10,
  legendItemHeight: 18,
  minLegendItemWidth: 120,
  maxLegendItemWidth: 160,
  legendIconRadius: 9,
  legendLabelPadding: 10,
  legendWidth: Ember.computed.alias('width'),
  legendHeight: Ember.computed(function() {
    return this.get('numLegendRows') * this.get('legendItemHeight');
  }).property('numLegendRows', 'legendItemHeight'),
  legendItemWidth: Ember.computed(function() {
    var itemWidth;
    itemWidth = this.get('legendWidth') / this.get('legendItems.length');
    if (itemWidth < this.get('minLegendItemWidth')) {
      return this.get('minLegendItemWidth');
    }
    if (itemWidth > this.get('maxLegendItemWidth')) {
      return this.get('maxLegendItemWidth');
    }
    return itemWidth;
  }).property('legendWidth', 'minLegendItemWidth', 'maxLegendItemWidth', 'legendItems.length'),
  numLegendItemsPerRow: Ember.computed(function() {
    return Math.floor(this.get('legendWidth') / this.get('legendItemWidth'));
  }).property('legendWidth', 'legendItemWidth'),
  numLegendRows: Ember.computed(function() {
    return Math.ceil(this.get('legendItems.length') / this.get('numLegendItemsPerRow'));
  }).property('legendItems.length', 'numLegendItemsPerRow'),
  legendLabelWidth: Ember.computed(function() {
    return this.get('legendItemWidth') - this.get('legendIconRadius') - this.get('legendLabelPadding') * 2;
  }).property('legendItemWidth', 'legendIconRadius', 'legendLabelPadding'),
  legendChartPadding: 0,
  legendAttrs: Ember.computed(function() {
    var dx, dy, offsetToLegend;
    dx = this.get('outerWidth') / 2;
    offsetToLegend = this.get('legendChartPadding') + this.get('legendTopPadding');
    dy = this.get('graphicBottom') + offsetToLegend;
    return {
      transform: "translate(" + dx + ", " + dy + ")"
    };
  }).property('outerWidth', 'graphicBottom', 'legendTopPadding', 'legendChartPadding'),
  legendItemAttrs: Ember.computed(function() {
    var isSingleRow, legendItemHeight, legendItemWidth, numAllItems, numItemsPerRow,
      _this = this;
    legendItemWidth = this.get('legendItemWidth');
    legendItemHeight = this.get('legendItemHeight');
    numItemsPerRow = this.get('numLegendItemsPerRow');
    numAllItems = this.get('legendItems.length');
    isSingleRow = this.get('numLegendRows') === 1;
    return {
      "class": 'legend-item',
      width: legendItemWidth,
      'stroke-width': 0,
      transform: function(d, i) {
        var col, dx, dy, items, row;
        col = i % numItemsPerRow;
        row = Math.floor(i / numItemsPerRow);
        items = isSingleRow ? numAllItems : numItemsPerRow;
        dx = col * legendItemWidth - items / 2 * legendItemWidth + 1 / 2;
        dy = row * legendItemHeight + legendItemHeight / 2;
        return "translate(" + dx + ", " + dy + ")";
      }
    };
  }).property('legendItemWidth', 'legendItemHeight', 'numLegendItemsPerRow', 'legendItems.length', 'numLegendRows'),
  legendIconAttrs: Ember.computed(function() {
    var iconRadius, legendItemHeight;
    iconRadius = this.get('legendIconRadius');
    legendItemHeight = this.get('legendItemHeight');
    return {
      d: function(d, i) {
        if (d.icon(d) === 'line') {
          return "M " + (-iconRadius) + " 0 L " + iconRadius + " 0";
        } else {
          return d3.svg.symbol().type(d.icon(d, i)).size(Math.pow(iconRadius, 2))(d, i);
        }
      },
      fill: function(d, i) {
        if (_.isFunction(d.fill)) {
          return d.fill(d, i);
        } else {
          return d.fill;
        }
      },
      stroke: function(d, i) {
        if (_.isFunction(d.stroke)) {
          return d.stroke(d, i);
        } else {
          return d.stroke;
        }
      },
      'stroke-width': function(d) {
        if (!d.width) {
          return 1.5;
        }
        if (_.isFunction(d.width)) {
          return d.width(d, i);
        } else {
          return d.width;
        }
      },
      'stroke-dasharray': function(d) {
        if (d.dotted) {
          return '2,2';
        }
      }
    };
  }).property('legendIconRadius', 'legendItemHeight'),
  legendLabelAttrs: Ember.computed(function() {
    return {
      x: this.get('legendIconRadius') / 2 + this.get('legendLabelPadding'),
      y: '.35em'
    };
  }).property('legendIconRadius', 'legendLabelPadding', 'legendItemHeight'),
  showLegendDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var content, formatXValue, formatYValue;
      d3.select(element).classed('hovered', true);
      if (data.selector) {
        _this.get('viewport').selectAll(data.selector).classed('hovered', true);
      }
      content = "<span class=\"tip-label\">" + data.label + "</span>";
      if (data.xValue != null) {
        formatXValue = _this.get('formatXValue');
        formatYValue = _this.get('formatYValue');
        content += "<span class=\"name\">" + (_this.get('tooltipXValueDisplayName')) + ": </span>";
        content += "<span class=\"value\">" + (formatXValue(data.xValue)) + "</span><br/>";
        content += "<span class=\"name\">" + (_this.get('tooltipYValueDisplayName')) + ": </span>";
        content += "<span class=\"value\">" + (formatYValue(data.yValue)) + "</span>";
      }
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideLegendDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      d3.select(element).classed('hovered', false);
      if (data.selector) {
        _this.get('viewport').selectAll(data.selector).classed('hovered', false);
      }
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  clearLegend: function() {
    return this.get('viewport').select('.legend-container').remove();
  },
  legend: Ember.computed(function() {
    var legend;
    legend = this.get('viewport').select('.legend-container');
    if (legend.empty()) {
      return this.get('viewport').append('g').attr('class', 'legend-container');
    } else {
      return legend;
    }
  }).volatile(),
  drawLegend: function() {
    var hideLegendDetails, isShowingTotal, labelTrimmer, labels, legend, legendIconAttrs, legendItems, legendLabelWidth, showLegendDetails, totalPointShape;
    this.clearLegend();
    legend = this.get('legend');
    legend.attr(this.get('legendAttrs'));
    showLegendDetails = this.get('showLegendDetails');
    hideLegendDetails = this.get('hideLegendDetails');
    legendItems = legend.selectAll('.legend-item').data(this.get('legendItems')).enter().append('g').attr(this.get('legendItemAttrs')).on("mouseover", function(d, i) {
      return showLegendDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideLegendDetails(d, i, this);
    });
    legendIconAttrs = this.get('legendIconAttrs');
    isShowingTotal = this.get('isShowingTotal');
    totalPointShape = this.get('totalPointShape');
    legendItems.each(function(d, i) {
      var sel;
      sel = d3.select(this);
      if ((i === 0) && isShowingTotal) {
        return sel.append('g').attr('class', 'icon').call(totalPointShape);
      } else {
        return d3.select(this).append('path').attr('class', 'icon').attr(legendIconAttrs);
      }
    });
    legendLabelWidth = this.get('legendLabelWidth');
    labelTrimmer = Ember.Charts.Helpers.LabelTrimmer.create({
      getLabelSize: function(d) {
        return legendLabelWidth;
      },
      getLabelText: function(d) {
        return d.label;
      }
    });
    return labels = legendItems.append('text').style('text-anchor', 'start').text(function(d) {
      return d.label;
    }).attr(this.get('legendLabelAttrs')).call(labelTrimmer.get('trim'));
  }
});


})();

(function() {


Ember.Charts.PieLegend = Ember.Mixin.create({
  legendVerticalPadding: 30,
  legendHorizontalPadding: Ember.computed(function() {
    return 0.2 * this.get('outerWidth');
  }).property('outerWidth'),
  maxLabelHeight: Ember.computed(function() {
    return 0.05 * this.get('outerHeight');
  }).property('outerWidth', 'outerHeight'),
  legendWidth: Ember.computed(function() {
    return this.get('outerWidth') - this.get('legendHorizontalPadding');
  }).property('outerWidth', 'legendHorizontalPadding'),
  legendHeight: Ember.computed(function() {
    return this.get('maxLabelHeight') + this.get('legendVerticalPadding') * 2;
  }).property('maxLabelHeight', 'legendVerticalPadding'),
  legendAttrs: Ember.computed(function() {
    var dx, dy, offsetToLegend;
    dx = 0;
    offsetToLegend = 0.15 * (this.get('marginBottom')) - (this.get('marginTop')) / 2;
    dy = this.get('outerHeight') / 2 + offsetToLegend;
    return {
      transform: "translate(" + dx + ", " + dy + ")"
    };
  }).property('outerHeight', 'marginTop', 'marginBottom'),
  legendLabelAttrs: Ember.computed(function() {
    return {
      style: "text-anchor:middle;",
      y: '-.35em'
    };
  }),
  legend: Ember.computed(function() {
    var legend;
    legend = this.get('viewport').select('.legend');
    if (legend.empty()) {
      return this.get('viewport').append('g').attr('class', 'legend');
    } else {
      return legend;
    }
  }).volatile(),
  clearLegend: function() {
    return this.get('viewport').select('.legend .labels').remove();
  },
  drawLegend: function() {
    var currentText, labelStrings, labelTop, labels, legend, nextLabel, otherSlice, row, rowNode, _i, _len, _ref;
    this.clearLegend();
    legend = this.get('legend').attr(this.get('legendAttrs'));
    otherSlice = this.get('viewport').select('.other-slice');
    if (this.get('isInteractive') && !otherSlice.empty()) {
      legend.on('mouseover', function() {
        otherSlice.classed('hovered', true);
        return legend.classed('hovered', true);
      }).on('mouseout', function() {
        otherSlice.classed('hovered', false);
        return legend.classed('hovered', false);
      });
    }
    labels = legend.append('g').attr('class', 'labels');
    labelStrings = this.get('legendItems').map(function(d) {
      if (d.percent != null) {
        return "" + d.label + " (" + d.percent + "%)";
      } else {
        return d.label;
      }
    });
    row = labels.append('text').text("Other: " + labelStrings[0]).attr(this.get('legendLabelAttrs'));
    labelTop = 0;
    _ref = labelStrings.slice(1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      nextLabel = _ref[_i];
      currentText = row.text();
      row.text("" + currentText + ", " + nextLabel);
      rowNode = row.node();
      if (rowNode.getBBox().width > this.get('legendWidth')) {
        if (labelTop + rowNode.getBBox().height > this.get('maxLabelHeight')) {
          row.text("" + currentText + ", ...");
          break;
        } else {
          row.text("" + currentText + ",");
          labelTop += rowNode.getBBox().height;
          row = labels.append('text').text(nextLabel).attr(this.get('legendLabelAttrs')).attr('dy', labelTop);
        }
      }
    }
    return labels.attr('transform', "translate(0, " + (-labelTop) + ")");
  }
});


})();

(function() {


Ember.Charts.ChartComponent = Ember.Component.extend(Ember.Charts.Colorable, Ember.AddeparMixins.ResizeHandlerMixin, {
  layoutName: 'chart',
  classNames: ['chart-frame', 'scroll-y'],
  isInteractive: true,
  horizontalMargin: 30,
  verticalMargin: 30,
  marginRight: Ember.computed.alias('horizontalMargin'),
  marginLeft: Ember.computed.alias('horizontalMargin'),
  marginTop: Ember.computed.alias('verticalMargin'),
  marginBottom: Ember.computed.alias('verticalMargin'),
  defaultOuterHeight: 500,
  defaultOuterWidth: 700,
  outerHeight: Ember.computed.alias('defaultOuterHeight'),
  outerWidth: Ember.computed.alias('defaultOuterWidth'),
  width: Ember.computed(function() {
    return this.get('outerWidth') - this.get('marginLeft') - this.get('marginRight');
  }).property('outerWidth', 'marginLeft', 'marginRight'),
  height: Ember.computed(function() {
    return Math.max(1, this.get('outerHeight') - this.get('marginBottom') - this.get('marginTop'));
  }).property('outerHeight', 'marginBottom', 'marginTop'),
  $viewport: Ember.computed(function() {
    return this.$('.chart-viewport')[0];
  }),
  viewport: Ember.computed(function() {
    return d3.select(this.get('$viewport'));
  }),
  transformViewport: Ember.computed(function() {
    return "translate(" + (this.get('marginLeft')) + "," + (this.get('marginTop')) + ")";
  }).property('marginLeft', 'marginTop'),
  labelPadding: 10,
  labelWidth: 30,
  labelHeight: 15,
  labelWidthOffset: Ember.computed(function() {
    return this.get('labelWidth') + this.get('labelPadding');
  }).property('labelWidth', 'labelPadding'),
  labelHeightOffset: Ember.computed(function() {
    return this.get('labelHeight') + this.get('labelPadding');
  }).property('labelHeight', 'labelPadding'),
  graphicTop: 0,
  graphicLeft: 0,
  graphicWidth: Ember.computed.alias('width'),
  graphicHeight: Ember.computed.alias('height'),
  graphicBottom: Ember.computed(function() {
    return this.get('graphicTop') + this.get('graphicHeight');
  }).property('graphicTop', 'graphicHeight'),
  graphicRight: Ember.computed(function() {
    return this.get('graphicLeft') + this.get('graphicWidth');
  }).property('graphicLeft', 'graphicWidth'),
  hasNoData: Ember.computed(function() {
    return Ember.isEmpty(this.get('finishedData'));
  }).property('finishedData'),
  concatenatedProperties: ['renderVars'],
  renderVars: ['finishedData', 'width', 'height', 'margin', 'isInteractive'],
  init: function() {
    var renderVar, _i, _len, _ref, _results,
      _this = this;
    this._super();
    _ref = this.get('renderVars').uniq();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      renderVar = _ref[_i];
      _results.push(this.addObserver(renderVar, function() {
        return Ember.run.once(_this, _this.get('draw'));
      }));
    }
    return _results;
  },
  didInsertElement: function() {
    this._super();
    this._updateDimensions();
    return Ember.run.once(this, this.get('draw'));
  },
  onResizeEnd: function() {
    return this._updateDimensions();
  },
  _updateDimensions: function() {
    this.set('defaultOuterHeight', this.$().height());
    return this.set('defaultOuterWidth', this.$().width());
  },
  clearChart: function() {
    return this.$('.chart-viewport').children().remove();
  },
  draw: function() {
    if (this.get('state') !== 'inDOM') {
      return;
    }
    if (this.get('hasNoData')) {
      return this.clearChart();
    } else {
      return this.drawChart();
    }
  }
});


})();

(function() {


Ember.Charts.HorizontalBarComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.FloatingTooltipMixin, {
  classNames: ['chart-horizontal-bar'],
  formatValue: d3.format('.2s'),
  formatValueLong: d3.format(',.r'),
  selectedSortType: 'value',
  defaultOuterHeight: 500,
  labelWidth: Ember.computed(function() {
    return 0.25 * this.get('outerWidth');
  }).property('outerWidth'),
  labelPadding: 20,
  barPadding: 0.2,
  maxBarThickness: 60,
  minBarThickness: 20,
  sortedData: Ember.computed(function() {
    var comparator, data, sortFunc, sortType;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    sortType = this.get('selectedSortType');
    sortFunc = (function() {
      var _this = this;
      switch (sortType) {
        case 'value':
          return function(d) {
            return -d.value;
          };
        case 'label':
          return function(d) {
            return d.label;
          };
      }
    }).call(this);
    comparator = function(a, b) {
      if (sortFunc(a) < sortFunc(b)) {
        return -1;
      } else if (sortFunc(a) > sortFunc(b)) {
        return 1;
      } else {
        return 0;
      }
    };
    return data.sort(comparator);
  }).property('data.@each', 'selectedSortType'),
  finishedData: Ember.computed.alias('sortedData'),
  minOuterHeight: Ember.computed(function() {
    var minBarSpace;
    minBarSpace = this.get('numBars') * this.get('minBarThickness');
    return minBarSpace + this.get('marginTop') + this.get('marginBottom');
  }).property('numBars', 'minBarThickness', 'marginTop', 'marginBottom'),
  maxOuterHeight: Ember.computed(function() {
    var maxBarSpace;
    maxBarSpace = this.get('numBars') * this.get('maxBarThickness');
    return maxBarSpace + this.get('marginTop') + this.get('marginBottom');
  }).property('numBars', 'maxBarThickness', 'marginTop', 'marginBottom'),
  outerHeight: Ember.computed(function() {
    var maxMinDefault;
    maxMinDefault = d3.max([this.get('defaultOuterHeight'), this.get('minOuterHeight')]);
    return d3.min([maxMinDefault, this.get('maxOuterHeight')]);
  }).property('minOuterHeight', 'maxOuterHeight', 'defaultOuterHeight'),
  marginTop: Ember.computed.alias('labelPadding'),
  marginBottom: Ember.computed.alias('labelPadding'),
  horizontalMargin: Ember.computed(function() {
    return this.get('labelWidth') + this.get('labelPadding') * 2;
  }).property('labelWidth', 'labelPadding'),
  numBars: Ember.computed.alias('finishedData.length'),
  xDomain: Ember.computed(function() {
    var absMax, maxValue, minValue, values,
      _this = this;
    values = this.get('finishedData').map(function(d) {
      return d.value;
    });
    minValue = d3.min(values);
    maxValue = d3.max(values);
    if (minValue < 0) {
      absMax = Math.max(-minValue, maxValue);
      return [-absMax, absMax];
    } else {
      return [0, maxValue];
    }
  }).property('finishedData', 'xDomainPadding'),
  xScale: Ember.computed(function() {
    return d3.scale.linear().domain(this.get('xDomain')).range([0, this.get('width')]).nice();
  }).property('width', 'xDomain'),
  yScale: Ember.computed(function() {
    return d3.scale.ordinal().domain(d3.range(this.get('numBars'))).rangeRoundBands([0, this.get('height')], this.get('barPadding'));
  }).property('height', 'barPadding'),
  barThickness: Ember.computed(function() {
    return this.get('yScale').rangeBand();
  }).property('yScale'),
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var content, formatValue;
      d3.select(element).classed('hovered', true);
      formatValue = _this.get('formatValue');
      content = "<span class=\"tip-label\">" + data.label + "</span>";
      content += "<span class=\"name\">" + (_this.get('tooltipValueDisplayName')) + ": </span>";
      content += "<span class=\"value\">" + (formatValue(data.value)) + "</span>";
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      d3.select(element).classed('hovered', false);
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  groupAttrs: Ember.computed(function() {
    var xScale, yScale,
      _this = this;
    xScale = this.get('xScale');
    yScale = this.get('yScale');
    return {
      transform: function(d, i) {
        var value;
        value = Math.min(0, d.value);
        return "translate(" + (xScale(value)) + ", " + (yScale(i)) + ")";
      }
    };
  }).property('xScale', 'yScale'),
  barAttrs: Ember.computed(function() {
    var xScale,
      _this = this;
    xScale = this.get('xScale');
    return {
      width: function(d) {
        return Math.abs(xScale(d.value) - xScale(0));
      },
      height: this.get('barThickness'),
      'stroke-width': 0,
      style: function(d) {
        var color;
        if (d.color) {
          return "fill:" + d.color;
        }
        if (d.value < 0) {
          color = _this.get('mostTintedColor');
        } else {
          color = _this.get('leastTintedColor');
        }
        return "fill:" + color;
      }
    };
  }).property('xScale', 'mostTintedColor', 'leastTintedColor', 'barThickness'),
  valueLabelAttrs: Ember.computed(function() {
    var xScale,
      _this = this;
    xScale = this.get('xScale');
    return {
      x: function(d) {
        if (d.value < 0) {
          return -_this.get('labelPadding');
        } else {
          return xScale(d.value) - xScale(0) + _this.get('labelPadding');
        }
      },
      y: this.get('barThickness') / 2,
      dy: '.35em',
      'text-anchor': function(d) {
        if (d.value < 0) {
          return 'end';
        } else {
          return 'start';
        }
      },
      'stroke-width': 0
    };
  }).property('xScale', 'barThickness', 'labelPadding'),
  groupLabelAttrs: Ember.computed(function() {
    var xScale,
      _this = this;
    xScale = this.get('xScale');
    return {
      x: function(d) {
        if (d.value < 0) {
          return xScale(0) - xScale(d.value) + _this.get('labelPadding');
        } else {
          return -_this.get('labelPadding');
        }
      },
      y: this.get('barThickness') / 2,
      dy: '.35em',
      'text-anchor': function(d) {
        if (d.value < 0) {
          return 'start';
        } else {
          return 'end';
        }
      },
      'stroke-width': 0
    };
  }).property('xScale', 'barThickness', 'labelPadding'),
  axisAttrs: Ember.computed(function() {
    var xScale;
    xScale = this.get('xScale');
    return {
      x1: xScale(0),
      x2: xScale(0),
      y1: 0,
      y2: this.get('height')
    };
  }).property('xScale', 'height'),
  groups: Ember.computed(function() {
    return this.get('viewport').selectAll('.bar').data(this.get('finishedData'));
  }).volatile(),
  yAxis: Ember.computed(function() {
    var yAxis;
    yAxis = this.get('viewport').select('.y.axis line');
    if (yAxis.empty()) {
      return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis').append('line');
    } else {
      return yAxis;
    }
  }).volatile(),
  renderVars: ['barThickness', 'yScale', 'finishedData', 'colorRange'],
  drawChart: function() {
    this.updateData();
    this.updateAxes();
    return this.updateGraphic();
  },
  updateData: function() {
    var entering, exiting, groups, hideDetails, showDetails;
    groups = this.get('groups');
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    entering = groups.enter().append('g').attr('class', 'bar').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    entering.append('rect');
    entering.append('text').attr('class', 'value');
    entering.append('text').attr('class', 'group');
    return exiting = groups.exit().remove();
  },
  updateAxes: function() {
    return this.get('yAxis').attr(this.get('axisAttrs'));
  },
  updateGraphic: function() {
    var groupLabels, groups, labelTrimmer, labelWidth, valueLabels,
      _this = this;
    groups = this.get('groups').attr(this.get('groupAttrs'));
    groups.select('rect').attr(this.get('barAttrs'));
    valueLabels = groups.select('text.value').text(function(d) {
      return _this.get('formatValue')(d.value);
    }).attr(this.get('valueLabelAttrs'));
    labelWidth = this.get('labelWidth');
    labelTrimmer = Ember.Charts.Helpers.LabelTrimmer.create({
      getLabelSize: function(d) {
        return labelWidth;
      },
      getLabelText: function(d) {
        return d.label;
      }
    });
    return groupLabels = groups.select('text.group').text(function(d) {
      return d.label;
    }).attr(this.get('groupLabelAttrs')).call(labelTrimmer.get('trim'));
  }
});

Ember.Handlebars.helper('horizontal-bar-chart', Ember.Charts.HorizontalBarComponent);


})();

(function() {


Ember.Charts.PieComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.PieLegend, Ember.Charts.FloatingTooltipMixin, {
  classNames: ['chart-pie'],
  formatValue: d3.format('.2s'),
  formatValueLong: d3.format(',.r'),
  minSlicePercent: 5,
  maxNumberOfSlices: 8,
  labelWidth: Ember.computed(function() {
    return 0.25 * this.get('outerWidth');
  }).property('outerWidth'),
  maxRadius: 2000,
  sortFunction: Ember.computed(function() {
    switch (this.get('selectedSortType')) {
      case 'value':
        return function(d) {
          return d.percent;
        };
      case 'label':
        return function(d) {
          return d.label;
        };
      default:
        return function(d) {
          return d.percent;
        };
    }
  }).property('selectedSortType'),
  filteredData: Ember.computed(function() {
    var data;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    return data.filter(function(child) {
      return child.value >= 0;
    });
  }).property('data.@each'),
  rejectedData: Ember.computed(function() {
    var data;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    return data.filter(function(child) {
      return child.value < 0;
    });
  }).property('data.@each'),
  sortedData: Ember.computed(function() {
    var data, total;
    data = this.get('filteredData');
    total = data.reduce(function(p, child) {
      return child.value + p;
    }, 0);
    if (total === 0) {
      return [];
    }
    data = data.map(function(d) {
      return {
        color: d.color,
        label: d.label,
        value: d.value,
        percent: d3.round(100 * d.value / total)
      };
    });
    return _.sortBy(data, this.get('sortFunction'));
  }).property('filteredData', 'sortFunc'),
  sortedDataWithOther: Ember.computed(function() {
    var data, lastItem, lowPercentIndex, maxNumberOfSlices, minNumberOfSlices, minSlicePercent, otherItems, otherSlice, overflowSlices, slicesLeft,
      _this = this;
    data = _.cloneDeep(this.get('sortedData')).reverse();
    maxNumberOfSlices = this.get('maxNumberOfSlices');
    minNumberOfSlices = this.get('minNumberOfSlices');
    minSlicePercent = this.get('minSlicePercent');
    otherItems = [];
    otherSlice = {
      label: 'Other',
      percent: 0,
      _otherItems: otherItems
    };
    lowPercentIndex = _.indexOf(data, _.find(data, function(d) {
      return d.percent < minSlicePercent;
    }));
    if (lowPercentIndex < 0) {
      lowPercentIndex = data.length;
    } else {
      _.rest(data, lowPercentIndex).forEach(function(d) {
        otherItems.push(d);
        return otherSlice.percent += d.percent;
      });
      if (otherSlice.percent < minSlicePercent) {
        lastItem = data[lowPercentIndex - 1];
        if (lastItem.percent < minSlicePercent) {
          lowPercentIndex -= 1;
          otherItems.push(lastItem);
          otherSlice.percent += lastItem.percent;
        }
      }
    }
    if (otherSlice.percent > 0) {
      maxNumberOfSlices -= 1;
    }
    slicesLeft = _.first(data, lowPercentIndex);
    overflowSlices = _.rest(slicesLeft, maxNumberOfSlices);
    if (overflowSlices.length > 0) {
      overflowSlices.forEach(function(d) {
        otherItems.push(d);
        return otherSlice.percent += d.percent;
      });
      slicesLeft = _.first(slicesLeft, maxNumberOfSlices);
    }
    if (otherItems.length === 1) {
      slicesLeft.push(otherItems[0]);
    } else if (otherSlice.percent > 0) {
      slicesLeft.push(otherSlice);
    }
    return slicesLeft.reverse();
  }).property('sortedData', 'maxNumberOfSlices', 'minSlicePercent'),
  otherData: Ember.computed(function() {
    var otherItems, otherSlice, _ref;
    otherSlice = _.find(this.get('sortedDataWithOther'), function(d) {
      return d._otherItems;
    });
    otherItems = (_ref = otherSlice != null ? otherSlice._otherItems : void 0) != null ? _ref : [];
    return _.sortBy(otherItems, this.get('sortFunction')).reverse();
  }).property('sortedDataWithOther', 'sortFunction'),
  finishedData: Ember.computed.alias('sortedDataWithOther'),
  horizontalMargin: Ember.computed(function() {
    return this.get('labelPadding') + this.get('labelWidth');
  }).property('labelPadding', 'labelWidth'),
  marginBottom: Ember.computed(function() {
    return this.get('legendHeight');
  }).property('legendHeight'),
  marginTop: Ember.computed(function() {
    var dataLength, finishedData;
    finishedData = this.get('finishedData');
    dataLength = finishedData.length;
    if (finishedData.length > 2 && finishedData[dataLength - 3].percent + finishedData[dataLength - 2].percent < 15) {
      return this.get('marginBottom');
    } else {
      return 0.3 * this.get('marginBottom');
    }
  }).property('marginBottom', 'finishedData'),
  numSlices: Ember.computed.alias('finishedData.length'),
  startOffset: Ember.computed(function() {
    var data, sum;
    data = this.get('finishedData');
    sum = data.reduce(function(p, d) {
      return d.percent + p;
    }, 0);
    return _.last(data).percent / sum * 2 * Math.PI;
  }).property('finishedData'),
  radius: Ember.computed(function() {
    return d3.min([this.get('maxRadius'), this.get('width') / 2, this.get('height') / 2]);
  }).property('maxRadius', 'width', 'height'),
  labelRadius: Ember.computed(function() {
    return this.get('radius') + this.get('labelPadding');
  }).property('radius', 'labelPadding'),
  getSliceColor: Ember.computed(function() {
    var _this = this;
    return function(d, i) {
      var index, numSlices, _ref;
      if ((_ref = d.data) != null ? _ref.color : void 0) {
        return d.data.color;
      }
      numSlices = _this.get('numSlices');
      index = numSlices - i - 1;
      if (numSlices !== 1) {
        index = index / (numSlices - 1);
      }
      return _this.get('colorScale')(index);
    };
  }).property('numSlices', 'colorScale'),
  legendItems: Ember.computed(function() {
    return this.get('otherData').concat(this.get('rejectedData'));
  }).property('otherData', 'rejectedData'),
  hasLegend: Ember.computed(function() {
    return this.get('legendItems.length') > 0;
  }).property('legendItems.length'),
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(d, i, element) {
      var content, data, formatValue;
      d3.select(element).classed('hovered', true);
      data = d.data;
      if (data._otherItems) {
        return _this.get('viewport').select('.legend').classed('hovered', true);
      } else {
        formatValue = _this.get('formatValue');
        content = "<span class=\"tip-label\">" + data.label + "</span>";
        content += "<span class=\"name\">" + (_this.get('tooltipValueDisplayName')) + ": </span>";
        content += "<span class=\"value\">" + (formatValue(data.value)) + "</span>";
        return _this.showTooltip(content, d3.event);
      }
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(d, i, element) {
      var data;
      d3.select(element).classed('hovered', false);
      data = d.data;
      if (data._otherItems) {
        return _this.get('viewport').select('.legend').classed('hovered', false);
      } else {
        return _this.hideTooltip();
      }
    };
  }).property('isInteractive'),
  transformViewport: Ember.computed(function() {
    var cx, cy;
    cx = this.get('marginLeft') + this.get('width') / 2;
    cy = this.get('marginTop') + this.get('height') / 2;
    return "translate(" + cx + "," + cy + ")";
  }).property('marginLeft', 'marginTop', 'width', 'height'),
  arc: Ember.computed(function() {
    var arc;
    return arc = d3.svg.arc().outerRadius(this.get('radius')).innerRadius(0);
  }).property('radius'),
  pie: Ember.computed(function() {
    return d3.layout.pie().startAngle(this.get('startOffset')).endAngle(this.get('startOffset') + Math.PI * 2).sort(null).value(function(d) {
      return d.percent;
    });
  }).property('startOffset'),
  groupAttrs: Ember.computed(function() {
    return {
      "class": function(d) {
        if (d.data._otherItems) {
          return 'arc other-slice';
        } else {
          return 'arc';
        }
      }
    };
  }),
  sliceAttrs: Ember.computed(function() {
    return {
      d: this.get('arc'),
      fill: this.get('getSliceColor'),
      stroke: this.get('getSliceColor')
    };
  }).property('arc', 'getSliceColor'),
  labelAttrs: Ember.computed(function() {
    var arc, labelRadius, lastXPos, lastYPos, mostTintedColor;
    arc = this.get('arc');
    labelRadius = this.get('labelRadius');
    lastXPos = 0;
    lastYPos = 0;
    if (this.get('numSlices') > 1) {
      return {
        dy: '.35em',
        style: null,
        'stroke-width': 0,
        'text-anchor': function(d) {
          var angle;
          angle = (d.endAngle - d.startAngle) * 0.5 + d.startAngle;
          if ((Math.PI < angle && angle < 2 * Math.PI)) {
            return 'end';
          } else {
            return 'start';
          }
        },
        transform: function(d) {
          var f, isSwitchingSides, labelHeight, labelXPos, labelYPos, labelsTooClose, x, y, _ref;
          _ref = arc.centroid(d), x = _ref[0], y = _ref[1];
          f = function(d) {
            return d / Math.sqrt(x * x + y * y) * labelRadius;
          };
          labelXPos = f(x);
          labelYPos = f(y);
          labelHeight = this.getBBox().height;
          isSwitchingSides = (lastXPos > 0 && 0 > labelXPos) || (lastXPos < 0 && 0 < labelXPos);
          labelsTooClose = Math.abs(labelYPos - lastYPos) < labelHeight;
          if (labelsTooClose && !isSwitchingSides) {
            if (labelYPos < lastYPos) {
              labelYPos = lastYPos - labelHeight;
            } else {
              labelYPos = lastYPos + labelHeight;
            }
          }
          lastXPos = labelXPos;
          lastYPos = labelYPos;
          return "translate(" + labelXPos + "," + labelYPos + ")";
        }
      };
    } else {
      mostTintedColor = this.get('mostTintedColor');
      return {
        dy: '.71em',
        'stroke-width': 0,
        'text-anchor': 'middle',
        transform: null,
        style: "fill:" + mostTintedColor + ";"
      };
    }
  }).property('arc', 'labelRadius', 'numSlices', 'mostTintedColor'),
  groups: Ember.computed(function() {
    var data;
    data = this.get('pie')(this.get('finishedData'));
    return this.get('viewport').selectAll('.arc').data(data);
  }).volatile(),
  renderVars: ['radius', 'labelWidth', 'finishedData'],
  drawChart: function() {
    this.updateData();
    this.updateGraphic();
    if (this.get('hasLegend')) {
      return this.drawLegend();
    } else {
      return this.clearLegend();
    }
  },
  updateData: function() {
    var entering, groups, hideDetails, showDetails;
    groups = this.get('groups');
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    entering = groups.enter().append('g').attr({
      "class": 'arc'
    }).on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    entering.append('path').attr('class', 'slice');
    entering.append('text').attr('class', 'data');
    return groups.exit().remove();
  },
  updateGraphic: function() {
    var groups, labelTrimmer, labelWidth;
    groups = this.get('groups').attr(this.get('groupAttrs'));
    groups.select('path').attr(this.get('sliceAttrs'));
    labelWidth = this.get('labelWidth');
    labelTrimmer = Ember.Charts.Helpers.LabelTrimmer.create({
      getLabelSize: function(d) {
        return labelWidth;
      },
      getLabelText: function(d) {
        return d.data.label;
      }
    });
    return groups.select('text.data').text(function(d) {
      return d.data.label;
    }).attr(this.get('labelAttrs')).call(labelTrimmer.get('trim')).text(function(d) {
      return "" + this.textContent + ", " + d.data.percent + "%";
    });
  }
});

Ember.Handlebars.helper('pie-chart', Ember.Charts.PieComponent);


})();

(function() {


Ember.Charts.VerticalBarComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.Legend, Ember.Charts.FloatingTooltipMixin, Ember.Charts.AxesMixin, {
  classNames: ['chart-vertical-bar'],
  formatValue: d3.format('.2s'),
  formatValueLong: d3.format(',.r'),
  ungroupedSeriesName: 'Other',
  stackBars: false,
  withinGroupPadding: 0,
  betweenGroupPadding: Ember.computed(function() {
    var scale;
    scale = d3.scale.linear().domain([1, 8]).range([1.25, 0.25]).clamp(true);
    return scale(this.get('numBars'));
  }).property('numBars'),
  numBars: Ember.computed(function() {
    return this.get('xBetweenGroupDomain.length') * this.get('xWithinGroupDomain.length') || 0;
  }).property('xBetweenGroupDomain', 'xWithinGroupDomain'),
  maxLabelHeight: 50,
  groupedData: Ember.computed(function() {
    var data,
      _this = this;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    return Ember.Charts.Helpers.groupBy(data, function(d) {
      var _ref;
      return (_ref = d.group) != null ? _ref : _this.get('ungroupedSeriesName');
    });
  }).property('data.@each', 'ungroupedSeriesName'),
  groupNames: Ember.computed(function() {
    var groupName, values, _ref, _results;
    _ref = this.get('groupedData');
    _results = [];
    for (groupName in _ref) {
      values = _ref[groupName];
      _results.push(groupName);
    }
    return _results;
  }).property('groupedData'),
  isGrouped: Ember.computed(function() {
    return this.get('groupNames.length') > 1;
  }).property('groupNames.length'),
  finishedData: Ember.computed(function() {
    var d, groupName, stackedValues, values, y0, _i, _len, _ref, _ref1, _results, _results1;
    if (this.get('isGrouped')) {
      if (Ember.isEmpty(this.get('groupedData'))) {
        return [];
      }
      _ref = this.get('groupedData');
      _results = [];
      for (groupName in _ref) {
        values = _ref[groupName];
        y0 = 0;
        stackedValues = (function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = values.length; _i < _len; _i++) {
            d = values[_i];
            _results1.push({
              y0: y0,
              y1: y0 += Math.max(d.value, 0),
              value: d.value,
              group: d.group,
              label: d.label,
              color: d.color
            });
          }
          return _results1;
        })();
        _results.push({
          group: groupName,
          values: values,
          stackedValues: stackedValues,
          totalValue: y0
        });
      }
      return _results;
    } else if (this.get('stackBars')) {
      if (Ember.isEmpty(this.get('data'))) {
        return [];
      }
      y0 = 0;
      stackedValues = (function() {
        var _i, _len, _ref1, _results1;
        _ref1 = this.get('data');
        _results1 = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          d = _ref1[_i];
          _results1.push({
            y0: y0,
            y1: y0 += Math.max(d.value, 0)
          });
        }
        return _results1;
      }).call(this);
      return [
        {
          group: this.get('data.firstObject.group'),
          values: this.get('data'),
          stackedValues: stackedValues,
          totalValue: y0
        }
      ];
    } else {
      if (Ember.isEmpty(this.get('data'))) {
        return [];
      }
      _ref1 = this.get('data');
      _results1 = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        d = _ref1[_i];
        _results1.push({
          group: d.label,
          values: [d]
        });
      }
      return _results1;
    }
  }).property('groupedData', 'isGrouped', 'stackBars'),
  labelHeightOffset: Ember.computed(function() {
    var labelSize;
    labelSize = this.get('_shouldRotateLabels') ? this.get('maxLabelHeight') : this.get('labelHeight');
    return labelSize + this.get('labelPadding');
  }).property('_shouldRotateLabels', 'maxLabelHeight', 'labelHeight', 'labelPadding'),
  legendChartPadding: Ember.computed.alias('labelHeightOffset'),
  graphicLeft: Ember.computed.alias('labelWidthOffset'),
  graphicWidth: Ember.computed(function() {
    return this.get('width') - this.get('labelWidthOffset');
  }).property('width', 'labelWidthOffset'),
  graphicHeight: Ember.computed(function() {
    return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
  }).property('height', 'legendHeight', 'legendChartPadding'),
  yDomain: Ember.computed(function() {
    var finishedData, max, maxOfGroups, maxOfStacks, min, minOfGroups, minOfStacks;
    finishedData = this.get('finishedData');
    minOfGroups = d3.min(finishedData, function(d) {
      return _.min(d.values.map(function(dd) {
        return dd.value;
      }));
    });
    maxOfGroups = d3.max(finishedData, function(d) {
      return _.max(d.values.map(function(dd) {
        return dd.value;
      }));
    });
    maxOfStacks = d3.max(finishedData, function(d) {
      return d.totalValue;
    });
    minOfStacks = d3.min(finishedData, function(d) {
      return 0;
    });
    if (this.get('stackBars')) {
      min = minOfStacks;
      max = maxOfStacks;
    } else {
      min = minOfGroups;
      max = maxOfGroups;
    }
    if (min > 0) {
      return [0, max];
    }
    if (max < 0) {
      return [min, 0];
    }
    if ((min === max && max === 0)) {
      return [0, 1];
    } else {
      return [min, max];
    }
  }).property('finishedData', 'stackBars'),
  yScale: Ember.computed(function() {
    return d3.scale.linear().domain(this.get('yDomain')).range([this.get('graphicTop') + this.get('graphicHeight'), this.get('graphicTop')]).nice(this.get('numYTicks'));
  }).property('graphicTop', 'graphicHeight', 'yDomain', 'numYTicks'),
  individualBarLabels: Ember.computed(function() {
    var groups;
    groups = _.values(this.get('groupedData')).map(function(g) {
      return _.pluck(g, 'label');
    });
    return _.uniq(_.flatten(groups));
  }).property('groupedData.@each'),
  xBetweenGroupDomain: Ember.computed.alias('groupNames'),
  xWithinGroupDomain: Ember.computed.alias('individualBarLabels'),
  groupWidth: Ember.computed(function() {
    return this.get('xBetweenGroupScale').rangeBand();
  }).property('xBetweenGroupScale'),
  barWidth: Ember.computed(function() {
    return this.get('xWithinGroupScale').rangeBand();
  }).property('xWithinGroupScale'),
  xWithinGroupScale: Ember.computed(function() {
    if (this.get('isGrouped') || this.get('stackBars')) {
      return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('groupWidth')], this.get('withinGroupPadding') / 2, 0);
    } else {
      return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('groupWidth')], this.get('betweenGroupPadding') / 2, this.get('betweenGroupPadding') / 2);
    }
  }).property('isGrouped', 'stackBars', 'xWithinGroupDomain', 'groupWidth', 'withinGroupPadding', 'betweenGroupPadding'),
  xBetweenGroupScale: Ember.computed(function() {
    var betweenGroupPadding, labelWidth;
    labelWidth = this.get('labelWidth');
    if (this.get('isGrouped') || this.get('stackBars')) {
      betweenGroupPadding = this.get('betweenGroupPadding');
    } else {
      betweenGroupPadding = 0;
    }
    return d3.scale.ordinal().domain(this.get('xBetweenGroupDomain')).rangeRoundBands([0, this.get('graphicWidth')], betweenGroupPadding / 2, betweenGroupPadding / 2);
  }).property('isGrouped', 'stackBars', 'graphicWidth', 'labelWidth', 'xBetweenGroupDomain', 'betweenGroupPadding'),
  numColorSeries: Ember.computed.alias('individualBarLabels.length'),
  hasLegend: Ember.computed(function() {
    return this.get('stackBars') || this.get('isGrouped') && this.get('legendItems.length') > 1;
  }).property('stackBars', 'isGrouped', 'legendItems.length'),
  legendItems: Ember.computed(function() {
    var getSeriesColor;
    getSeriesColor = this.get('getSeriesColor');
    return this.get('individualBarLabels').map(function(d, i) {
      var color;
      color = getSeriesColor(d, i);
      return {
        label: d,
        fill: color,
        stroke: color,
        icon: function() {
          return 'square';
        },
        selector: ".grouping-" + i
      };
    });
  }).property('individualBarLabels', 'getSeriesColor'),
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var addValueLine, content, formatValue, isGroup;
      isGroup = Ember.isArray(data.values);
      element = isGroup ? element.parentNode.parentNode : element;
      d3.select(element).classed('hovered', true);
      content = "<span class=\"tip-label\">" + data.group + "</span>";
      formatValue = _this.get('formatValue');
      addValueLine = function(d) {
        content += "<span class=\"name\">" + d.label + ": </span>";
        return content += "<span class=\"value\">" + (formatValue(d.value)) + "</span><br/>";
      };
      if (isGroup) {
        data.values.forEach(addValueLine);
      } else {
        addValueLine(data);
      }
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      if (Ember.isArray(data.values)) {
        element = element.parentNode.parentNode;
      }
      d3.select(element).classed('hovered', false);
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  groupAttrs: Ember.computed(function() {
    var xBetweenGroupScale,
      _this = this;
    xBetweenGroupScale = this.get('xBetweenGroupScale');
    return {
      transform: function(d) {
        var dx, dy;
        dx = _this.get('graphicLeft') + xBetweenGroupScale(d.group);
        dy = _this.get('graphicTop');
        return "translate(" + dx + ", " + dy + ")";
      }
    };
  }).property('graphicLeft', 'graphicTop', 'xBetweenGroupScale'),
  stackedBarAttrs: Ember.computed(function() {
    var yScale, zeroDisplacement,
      _this = this;
    zeroDisplacement = 1;
    yScale = this.get('yScale');
    return {
      "class": function(d, i) {
        return "grouping-" + i;
      },
      'stroke-width': 0,
      width: function(d) {
        return _this.get('groupWidth');
      },
      x: null,
      y: function(d) {
        return yScale(d.y1) + zeroDisplacement;
      },
      height: function(d) {
        return yScale(d.y0) - yScale(d.y1);
      }
    };
  }).property('yScale', 'groupWidth'),
  groupedBarAttrs: Ember.computed(function() {
    var yScale, zeroDisplacement,
      _this = this;
    zeroDisplacement = 1;
    yScale = this.get('yScale');
    return {
      "class": function(d, i) {
        return "grouping-" + i;
      },
      'stroke-width': 0,
      width: function(d) {
        return _this.get('barWidth');
      },
      x: function(d) {
        return _this.get('xWithinGroupScale')(d.label);
      },
      height: function(d) {
        return Math.max(0, Math.abs(yScale(d.value) - yScale(0)) - zeroDisplacement);
      },
      y: function(d) {
        if (d.value > 0) {
          return yScale(d.value);
        } else {
          return yScale(0) + zeroDisplacement;
        }
      }
    };
  }).property('yScale', 'getSeriesColor', 'barWidth', 'xWithinGroupScale'),
  labelAttrs: Ember.computed(function() {
    var _this = this;
    return {
      'stroke-width': 0,
      transform: function(d) {
        var dx, dy;
        dx = _this.get('barWidth') / 2;
        if (_this.get('isGrouped') || _this.get('stackBars')) {
          dx += _this.get('groupWidth') / 2 - _this.get('barWidth') / 2;
        } else {
          dx += _this.get('xWithinGroupScale')(d.group);
        }
        dy = _this.get('graphicTop') + _this.get('graphicHeight') + _this.get('labelPadding');
        return "translate(" + dx + ", " + dy + ")";
      }
    };
  }).property('barWidth', 'isGrouped', 'stackBars', 'groupWidth', 'xWithinGroupScale', 'graphicTop', 'graphicHeight', 'labelPadding'),
  groups: Ember.computed(function() {
    return this.get('viewport').selectAll('.bars').data(this.get('finishedData'));
  }).volatile(),
  yAxis: Ember.computed(function() {
    var yAxis;
    yAxis = this.get('viewport').select('.y.axis');
    if (yAxis.empty()) {
      return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis');
    } else {
      return yAxis;
    }
  }).volatile(),
  maxLabelWidth: Ember.computed(function() {
    var maxLabelWidth;
    if (this.get('isGrouped') || this.get('stackBars')) {
      return maxLabelWidth = this.get('groupWidth');
    } else {
      return maxLabelWidth = this.get('barWidth');
    }
  }).property('isGrouped', 'stackBars', 'groupWidth', 'barWidth'),
  _shouldRotateLabels: false,
  setRotateLabels: function() {
    var labels, maxLabelWidth, rotateLabels;
    labels = this.get('groups').select('.groupLabel text');
    maxLabelWidth = this.get('maxLabelWidth');
    rotateLabels = false;
    if (this.get('rotatedLabelLength') > maxLabelWidth) {
      labels.each(function(d) {
        if (this.getBBox().width > maxLabelWidth) {
          return rotateLabels = true;
        }
      });
    }
    return this.set('_shouldRotateLabels', rotateLabels);
  },
  rotateLabelDegrees: Ember.computed(function() {
    var degrees, radians;
    radians = Math.atan(this.get('labelHeight') / this.get('maxLabelWidth'));
    degrees = radians * 180 / Math.PI;
    return Math.max(degrees, 20);
  }).property('labelHeight', 'maxLabelWidth'),
  rotatedLabelLength: Ember.computed(function() {
    var rotateLabelRadians;
    rotateLabelRadians = Math.PI / 180 * this.get('rotateLabelDegrees');
    return Math.abs(this.get('maxLabelHeight') / Math.sin(rotateLabelRadians));
  }).property('maxLabelHeight', 'rotateLabelDegrees'),
  renderVars: ['xWithinGroupScale', 'xBetweenGroupScale', 'yScale', 'finishedData', 'getSeriesColor'],
  drawChart: function() {
    this.updateData();
    this.updateLayout();
    this.updateAxes();
    this.updateGraphic();
    if (this.get('hasLegend')) {
      return this.drawLegend();
    } else {
      return this.clearLegend();
    }
  },
  updateData: function() {
    var bars, entering, exiting, groups, hideDetails, showDetails, subdata;
    groups = this.get('groups');
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    entering = groups.enter().append('g').attr('class', 'bars');
    entering.append('g').attr('class', 'groupLabel').append('text').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    exiting = groups.exit().remove();
    if (this.get('stackBars')) {
      subdata = function(d) {
        return d.stackedValues;
      };
    } else {
      subdata = function(d) {
        return d.values;
      };
    }
    bars = groups.selectAll('rect').data(subdata);
    bars.enter().append('rect').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    return bars.exit().remove();
  },
  updateLayout: function() {
    var groups, labelTrimmer, labels, maxLabelWidth, rotateLabelDegrees,
      _this = this;
    groups = this.get('groups');
    labels = groups.select('.groupLabel text').attr('transform', null).text(function(d) {
      return d.group;
    });
    this.setRotateLabels();
    if (this.get('_shouldRotateLabels')) {
      rotateLabelDegrees = this.get('rotateLabelDegrees');
      labelTrimmer = Ember.Charts.Helpers.LabelTrimmer.create({
        getLabelSize: function(d) {
          return _this.get('rotatedLabelLength');
        },
        getLabelText: function(d) {
          return d.group;
        }
      });
      return labels.call(labelTrimmer.get('trim')).attr({
        'text-anchor': 'end',
        transform: "rotate(" + (-rotateLabelDegrees) + ")",
        dy: function(d) {
          return this.getBBox().height;
        }
      });
    } else {
      maxLabelWidth = this.get('maxLabelWidth');
      labelTrimmer = Ember.Charts.Helpers.LabelTrimmer.create({
        getLabelSize: function(d) {
          return maxLabelWidth;
        },
        getLabelText: function(d) {
          var _ref;
          return (_ref = d.group) != null ? _ref : '';
        }
      });
      return labels.call(labelTrimmer.get('trim')).attr({
        'text-anchor': 'middle',
        dy: this.get('labelPadding')
      });
    }
  },
  updateAxes: function() {
    var gYAxis, graphicLeft, graphicTop, yAxis;
    yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatValue'));
    graphicTop = this.get('graphicTop');
    graphicLeft = this.get('graphicLeft');
    gYAxis = this.get('yAxis').attr({
      transform: "translate(" + graphicLeft + "," + graphicTop + ")"
    }).call(yAxis);
    gYAxis.selectAll('g').filter(function(d) {
      return d !== 0;
    }).classed('major', false).classed('minor', true);
    return gYAxis.selectAll('text').style('text-anchor', 'end').attr({
      x: -this.get('labelPadding')
    });
  },
  updateGraphic: function() {
    var barAttrs, groups, labels;
    groups = this.get('groups');
    if (this.get('stackBars')) {
      barAttrs = this.get('stackedBarAttrs');
    } else {
      barAttrs = this.get('groupedBarAttrs');
    }
    groups.attr(this.get('groupAttrs'));
    groups.selectAll('rect').style('fill', this.get('getSeriesColor')).attr(barAttrs);
    return labels = groups.select('g.groupLabel').attr(this.get('labelAttrs'));
  }
});

Ember.Handlebars.helper('vertical-bar-chart', Ember.Charts.VerticalBarComponent);


})();

(function() {


Ember.Charts.ScatterComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.Legend, Ember.Charts.FloatingTooltipMixin, Ember.Charts.AxesMixin, {
  classNames: ['chart-scatter'],
  formatXValue: d3.format('.2s'),
  formatYValue: d3.format('.2s'),
  formatXValueLong: d3.format(',.r'),
  formatYValueLong: d3.format(',.r'),
  dotRadius: 7,
  dotShapeArea: Ember.computed(function() {
    return Math.pow(this.get('dotRadius'), 2);
  }).property('dotRadius'),
  graphPadding: 0.05,
  tickSpacing: 80,
  isShowingTotal: false,
  totalPointData: null,
  filteredData: Ember.computed(function() {
    var data;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    return data.filter(function(d) {
      return (d.xValue != null) && (d.yValue != null) && isFinite(d.xValue) && isFinite(d.yValue);
    });
  }).property('data.@each'),
  groupedData: Ember.computed(function() {
    var data, groupedData, k, v, _results,
      _this = this;
    data = this.get('filteredData');
    if (Ember.isEmpty(data)) {
      return [];
    }
    groupedData = Ember.Charts.Helpers.groupBy(data, function(d) {
      var _ref;
      return (_ref = d.group) != null ? _ref : _this.get('ungroupedSeriesName');
    });
    _results = [];
    for (k in groupedData) {
      v = groupedData[k];
      _results.push(v);
    }
    return _results;
  }).property('filteredData.@each'),
  groupNames: Ember.computed(function() {
    var d, _i, _len, _ref, _results;
    _ref = this.get('groupedData');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      d = _ref[_i];
      _results.push(d.get(0).group);
    }
    return _results;
  }).property('groupedData'),
  numGroups: Ember.computed.alias('groupedData.length'),
  isGrouped: Ember.computed(function() {
    return this.get('numGroups') > 1;
  }).property('numGroups'),
  finishedData: Ember.computed.alias('groupedData'),
  axisTitleHeightOffset: Ember.computed(function() {
    return this.get('axisTitleHeight') + this.get('labelPadding');
  }).property('axisTitleHeight', 'labelPadding'),
  legendChartPadding: Ember.computed(function() {
    return this.get('axisTitleHeightOffset') + this.get('labelHeightOffset');
  }).property('labelHeightOffset', 'axisTitleHeightOffset'),
  graphicTop: Ember.computed.alias('axisTitleHeight'),
  graphicLeft: Ember.computed.alias('labelWidthOffset'),
  graphicHeight: Ember.computed(function() {
    return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
  }).property('height', 'legendHeight', 'legendChartPadding'),
  graphicWidth: Ember.computed(function() {
    return this.get('width') - this.get('labelWidthOffset');
  }).property('width', 'labelWidthOffset'),
  axisTitleHeight: 18,
  xDomain: Ember.computed(function() {
    var totalData, xMax, xMin, _ref;
    totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
    _ref = d3.extent(totalData.concat(this.get('filteredData')), function(d) {
      return d.xValue;
    }), xMin = _ref[0], xMax = _ref[1];
    if ((xMin === xMax && xMax === 0)) {
      return [-1, 1];
    } else if (xMin === xMax) {
      return [xMin * (1 - this.get('graphPadding')), xMin * (1 + this.get('graphPadding'))];
    } else {
      return [xMin, xMax];
    }
  }).property('filteredData.@each', 'isShowingTotal', 'totalPointData'),
  yDomain: Ember.computed(function() {
    var totalData, yMax, yMin, _ref;
    totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
    _ref = d3.extent(totalData.concat(this.get('filteredData')), function(d) {
      return d.yValue;
    }), yMin = _ref[0], yMax = _ref[1];
    if ((yMin === yMax && yMax === 0)) {
      return [-1, 1];
    } else if (yMin === yMax) {
      return [yMin * (1 - this.get('graphPadding')), yMin * (1 + this.get('graphPadding'))];
    } else {
      return [yMin, yMax];
    }
  }).property('filteredData.@each', 'isShowingTotal', 'totalPointData', 'graphPadding'),
  xScale: Ember.computed(function() {
    var graphicLeft, graphicWidth, padding, xDomain;
    xDomain = this.get('xDomain');
    graphicLeft = this.get('graphicLeft');
    graphicWidth = this.get('graphicWidth');
    padding = (xDomain[1] - xDomain[0]) * this.get('graphPadding');
    return d3.scale.linear().domain([xDomain[0] - padding, xDomain[1] + padding]).range([graphicLeft, graphicLeft + graphicWidth]).nice(this.get('numXTicks'));
  }).property('xDomain', 'graphPadding', 'graphicLeft', 'graphicWidth', 'numXTicks'),
  yScale: Ember.computed(function() {
    var graphicHeight, graphicTop, padding, yDomain;
    yDomain = this.get('yDomain');
    graphicTop = this.get('graphicTop');
    graphicHeight = this.get('graphicHeight');
    padding = (yDomain[1] - yDomain[0]) * this.get('graphPadding');
    return d3.scale.linear().domain([yDomain[0] - padding, yDomain[1] + padding]).range([graphicTop + graphicHeight, graphicTop]).nice(this.get('numYTicks'));
  }).property('yDomain', 'graphPadding', 'graphicTop', 'graphicHeight', 'numYTicks'),
  groupShapes: Ember.computed(function() {
    return ['circle', 'square', 'triangle-up', 'cross', 'diamond'];
  }),
  numGroupShapes: Ember.computed.alias('groupShapes.length'),
  numGroupColors: 2,
  maxNumGroups: Ember.computed(function() {
    return this.get('numGroupColors') * this.get('numGroupShapes');
  }).property('numGroupColors', 'numGroupShapes'),
  displayGroups: Ember.computed(function() {
    return this.get('isGrouped') && this.get('numGroups') <= this.get('maxNumGroups');
  }).property('isGrouped', 'numGroups', 'numGroupShapes'),
  getGroupShape: Ember.computed(function() {
    var _this = this;
    return function(d, i) {
      i = _this.get('groupNames').indexOf(d.group);
      if (!_this.get('displayGroups')) {
        return 'circle';
      }
      return _this.get('groupShapes')[i % _this.get('numGroupShapes')];
    };
  }),
  getGroupColor: Ember.computed(function() {
    var _this = this;
    return function(d, i) {
      var colorIndex;
      colorIndex = 0;
      if (_this.get('displayGroups')) {
        i = _this.get('groupNames').indexOf(d.group);
        colorIndex = Math.floor(i / _this.get('numGroupShapes'));
      }
      return _this.get('colorScale')(colorIndex / _this.get('numGroupColors'));
    };
  }),
  hasLegend: Ember.computed.alias('isGrouped'),
  legendIconRadius: Ember.computed.alias('dotRadius'),
  legendItems: Ember.computed(function() {
    var displayGroups, getGroupColor, getGroupShape, legendData, point;
    if (this.get('hasNoData')) {
      return [];
    }
    getGroupShape = this.get('getGroupShape');
    getGroupColor = this.get('getGroupColor');
    displayGroups = this.get('displayGroups');
    legendData = this.get('groupedData').map(function(d, i) {
      var name, value;
      name = d.get(0).group;
      value = d.get('length') === 1 ? d.get(0) : null;
      return {
        label: name,
        group: name,
        stroke: getGroupColor,
        fill: displayGroups ? getGroupColor : 'transparent',
        icon: getGroupShape,
        selector: ".group-" + i,
        xValue: value != null ? value.xValue : void 0,
        yValue: value != null ? value.yValue : void 0
      };
    });
    if (this.get('isShowingTotal')) {
      point = this.get('totalPointData');
      legendData.unshift({
        label: point.group,
        group: point.group,
        stroke: getGroupColor,
        selector: '.totalgroup',
        xValue: point.xValue,
        yValue: point.yValue
      });
    }
    return legendData;
  }).property('hasNoData', 'groupedData', 'getGroupShape', 'getGroupColor', 'displayGroups', 'isShowingTotal', 'totalPointData'),
  xValueDisplayName: 'X Factor',
  yValueDisplayName: 'Y Factor',
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var content, formatXValue, formatYValue;
      d3.select(element).classed('hovered', true);
      formatXValue = _this.get('formatXValue');
      formatYValue = _this.get('formatYValue');
      content = "<span class=\"tip-label\">" + data.group + "</span>";
      content += "<span class=\"name\">" + (_this.get('xValueDisplayName')) + ": </span>";
      content += "<span class=\"value\">" + (formatXValue(data.xValue)) + "</span><br/>";
      content += "<span class=\"name\">" + (_this.get('yValueDisplayName')) + ": </span>";
      content += "<span class=\"value\">" + (formatYValue(data.yValue)) + "</span>";
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      d3.select(element).classed('hovered', false);
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  groupAttrs: Ember.computed(function() {
    return {
      "class": function(d, i) {
        return "group group-" + i;
      }
    };
  }),
  pointAttrs: Ember.computed(function() {
    var _this = this;
    return {
      d: d3.svg.symbol().size(this.get('dotShapeArea')).type(this.get('getGroupShape')),
      fill: this.get('displayGroups') ? this.get('getGroupColor') : 'transparent',
      stroke: this.get('getGroupColor'),
      'stroke-width': 1.5,
      transform: function(d) {
        var dx, dy;
        dx = _this.get('xScale')(d.xValue);
        dy = _this.get('yScale')(d.yValue);
        return "translate(" + dx + ", " + dy + ")";
      }
    };
  }).property('dotShapeArea', 'getGroupShape', 'xScale', 'yScale', 'displayGroups', 'getGroupColor'),
  groups: Ember.computed(function() {
    return this.get('viewport').selectAll('.group').data(this.get('finishedData'));
  }).volatile(),
  selectOrCreateAxis: function(selector) {
    var axis;
    axis = this.get('viewport').select(selector);
    if (axis.empty()) {
      return this.get('viewport').insert('g', ':first-child');
    } else {
      return axis;
    }
  },
  selectOrCreateAxisTitle: function(selector) {
    var title;
    title = this.get('viewport').select(selector);
    if (title.empty()) {
      return this.get('viewport').append('text');
    } else {
      return title;
    }
  },
  xAxis: Ember.computed(function() {
    return this.selectOrCreateAxis('.x.axis').attr('class', 'x axis');
  }).volatile(),
  yAxis: Ember.computed(function() {
    return this.selectOrCreateAxis('.y.axis').attr('class', 'y axis');
  }).volatile(),
  xAxisTitle: Ember.computed(function() {
    return this.selectOrCreateAxisTitle('.x.axis-title').attr('class', 'x axis-title');
  }).volatile(),
  yAxisTitle: Ember.computed(function() {
    return this.selectOrCreateAxisTitle('.y.axis-title').attr('class', 'y axis-title');
  }).volatile(),
  renderVars: ['xScale', 'yScale', 'dotShapeArea', 'finishedData', 'xValueDisplayName', 'yValueDisplayName'],
  drawChart: function() {
    this.updateTotalPointData();
    this.updateData();
    this.updateAxes();
    this.updateGraphic();
    if (this.get('hasLegend')) {
      return this.drawLegend();
    } else {
      return this.clearLegend();
    }
  },
  totalPointShape: Ember.computed(function() {
    var dotShapeArea,
      _this = this;
    dotShapeArea = this.get('dotShapeArea');
    return function(selection) {
      selection.append('path').attr({
        "class": 'totaldot',
        d: d3.svg.symbol().size(dotShapeArea).type('circle'),
        fill: _this.get('getGroupColor')
      });
      return selection.append('path').attr({
        "class": 'totaloutline',
        d: d3.svg.symbol().size(dotShapeArea * 3).type('circle'),
        fill: 'transparent',
        stroke: _this.get('getGroupColor'),
        'stroke-width': 2
      });
    };
  }),
  updateTotalPointData: function() {
    var totalData, totalPoint;
    totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
    totalPoint = this.get('viewport').selectAll('.totalgroup').data(totalData);
    totalPoint.exit().remove();
    return totalPoint.enter().append('g').attr('class', 'totalgroup').call(this.get('totalPointShape'));
  },
  updateData: function() {
    var groups, points;
    groups = this.get('groups');
    groups.enter().append('g').attr('class', 'group').attr(this.get('groupAttrs'));
    groups.exit().remove();
    points = groups.selectAll('.dot').data(function(d) {
      return d;
    });
    points.enter().append('path').attr('class', 'dot');
    return points.exit().remove();
  },
  updateAxes: function() {
    var gXAxis, gYAxis, graphicHeight, graphicLeft, graphicTop, labelPadding, xAxis, xAxisPadding, yAxis;
    xAxis = d3.svg.axis().scale(this.get('xScale')).orient('top').ticks(this.get('numXTicks')).tickSize(this.get('graphicHeight')).tickFormat(this.get('formatXValue'));
    yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatYValue'));
    graphicTop = this.get('graphicTop');
    graphicHeight = this.get('graphicHeight');
    gXAxis = this.get('xAxis').attr('transform', "translate(0," + (graphicTop + graphicHeight) + ")").call(xAxis);
    gXAxis.selectAll('g').filter(function(d) {
      return d !== 0;
    }).classed('major', false).classed('minor', true);
    labelPadding = this.get('labelPadding');
    gXAxis.selectAll('text').style('text-anchor', 'middle').attr({
      y: function(d) {
        return this.getBBox().height + labelPadding / 2;
      }
    });
    graphicLeft = this.get('graphicLeft');
    gYAxis = this.get('yAxis').attr('transform', "translate(" + graphicLeft + ",0)").call(yAxis);
    gYAxis.selectAll('g').filter(function(d) {
      return d !== 0;
    }).classed('major', false).classed('minor', true);
    gYAxis.selectAll('text').style('text-anchor', 'end').attr({
      x: -this.get('labelPadding')
    });
    xAxisPadding = this.get('labelHeightOffset') + this.get('labelPadding');
    this.get('xAxisTitle').text(this.get('xValueDisplayName')).style('text-anchor', 'middle').attr({
      x: this.get('graphicWidth') / 2 + this.get('labelWidthOffset'),
      y: this.get('graphicBottom') + xAxisPadding
    });
    return this.get('yAxisTitle').text(this.get('yValueDisplayName')).style('text-anchor', 'start').attr({
      y: 0,
      x: -this.get('labelPadding')
    });
  },
  updateGraphic: function() {
    var hideDetails, showDetails,
      _this = this;
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    this.get('groups').selectAll('.dot').attr(this.get('pointAttrs')).on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    return this.get('viewport').select('.totalgroup').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    }).attr({
      transform: function(d) {
        var dx, dy;
        dx = _this.get('xScale')(d.xValue);
        dy = _this.get('yScale')(d.yValue);
        return "translate(" + dx + ", " + dy + ")";
      }
    });
  }
});

Ember.Handlebars.helper('scatter-chart', Ember.Charts.ScatterComponent);


})();

(function() {


Ember.Charts.TimeSeriesComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.Legend, Ember.Charts.TimeSeriesLabeler, Ember.Charts.FloatingTooltipMixin, Ember.Charts.HasTimeSeriesRule, Ember.Charts.AxesMixin, {
  classNames: ['chart-time-series'],
  formatTime: d3.time.format('%Y-%m-%d'),
  formatTimeLong: d3.time.format('%a %b %-d, %Y'),
  formatValue: d3.format('.2s'),
  formatValueLong: d3.format(',.r'),
  ungroupedSeriesName: 'Other',
  stackBars: false,
  interpolate: false,
  yAxisFromZero: false,
  barPadding: 0,
  barGroupPadding: 0.25,
  groupedLineData: Ember.computed(function() {
    var groupName, groups, lineData, values, _results,
      _this = this;
    lineData = this.get('lineData');
    if (Ember.isEmpty(lineData)) {
      return [];
    }
    groups = Ember.Charts.Helpers.groupBy(lineData, function(d) {
      var _ref;
      return (_ref = d.label) != null ? _ref : _this.get('ungroupedSeriesName');
    });
    _results = [];
    for (groupName in groups) {
      values = groups[groupName];
      _results.push({
        group: groupName,
        values: values
      });
    }
    return _results;
  }).property('lineData.@each', 'ungroupedSeriesName'),
  groupedBarData: Ember.computed(function() {
    var barData, barGroupsByTime, barTimes, g, groups, grps, timePoint, v;
    barData = this.get('barData');
    if (Ember.isEmpty(barData)) {
      return [];
    }
    barTimes = Ember.Charts.Helpers.groupBy(barData, function(d) {
      return +d.time;
    });
    return barGroupsByTime = (function() {
      var _results,
        _this = this;
      _results = [];
      for (timePoint in barTimes) {
        groups = barTimes[timePoint];
        grps = Ember.Charts.Helpers.groupBy(groups, function(d) {
          var _ref;
          return (_ref = d.label) != null ? _ref : _this.get('ungroupedSeriesName');
        });
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (g in grps) {
            v = grps[g];
            _results1.push({
              group: g,
              time: v[0].time,
              value: v[0].value,
              label: v[0].label
            });
          }
          return _results1;
        })());
      }
      return _results;
    }).call(this);
  }).property('barData.@each', 'ungroupedSeriesName'),
  barGroups: Ember.computed(function() {
    var barData, barGroups, groupName, values, _results,
      _this = this;
    barData = this.get('barData');
    if (Ember.isEmpty(barData)) {
      return [];
    }
    barGroups = Ember.Charts.Helpers.groupBy(barData, function(d) {
      var _ref;
      return (_ref = d.label) != null ? _ref : _this.get('ungroupedSeriesName');
    });
    _results = [];
    for (groupName in barGroups) {
      values = barGroups[groupName];
      _results.push(groupName);
    }
    return _results;
  }).property('barData.@each', 'ungroupedSeriesName'),
  stackedBarData: Ember.computed(function() {
    var barData, barGroupsByTime, barTimes, d, g, groupName, groups, stackedValues, time, timePoint, value, y0, _i, _len, _results;
    barData = this.get('barData');
    if (Ember.isEmpty(barData)) {
      return [];
    }
    barTimes = Ember.Charts.Helpers.groupBy(barData, function(d) {
      return +d.time;
    });
    barGroupsByTime = (function() {
      var _results,
        _this = this;
      _results = [];
      for (timePoint in barTimes) {
        groups = barTimes[timePoint];
        _results.push(Ember.Charts.Helpers.groupBy(groups, function(d) {
          var _ref;
          return (_ref = d.label) != null ? _ref : _this.get('ungroupedSeriesName');
        }));
      }
      return _results;
    }).call(this);
    _results = [];
    for (_i = 0, _len = barGroupsByTime.length; _i < _len; _i++) {
      g = barGroupsByTime[_i];
      y0 = 0;
      stackedValues = (function() {
        var _ref, _ref1, _results1;
        _results1 = [];
        for (groupName in g) {
          d = g[groupName];
          time = d != null ? (_ref = d[0]) != null ? _ref.time : void 0 : void 0;
          value = d != null ? (_ref1 = d[0]) != null ? _ref1.value : void 0 : void 0;
          _results1.push({
            group: groupName,
            x: time,
            y0: y0,
            y1: y0 += Math.max(value, 0)
          });
        }
        return _results1;
      })();
      _results.push({
        stackedValues: stackedValues,
        totalValue: y0
      });
    }
    return _results;
  }).property('barData', 'ungroupedSeriesName'),
  finishedData: Ember.computed(function() {
    return {
      lineData: this.get('groupedLineData'),
      groupedBarData: this.get('groupedBarData'),
      stackedBarData: this.get('stackedBarData')
    };
  }).property('groupedLineData.@each.values', 'groupedBarData.@each', 'stackedBarData.@each'),
  hasNoData: Ember.computed(function() {
    return !(this.get('hasBarData') || this.get('hasLineData'));
  }).property('hasBarData', 'hasLineData'),
  hasLineData: Ember.computed(function() {
    return !Ember.isEmpty(this.get('lineData'));
  }).property('lineData'),
  hasBarData: Ember.computed(function() {
    return !Ember.isEmpty(this.get('barData'));
  }).property('barData'),
  legendChartPadding: Ember.computed.alias('labelHeightOffset'),
  graphicLeft: Ember.computed.alias('labelWidthOffset'),
  graphicWidth: Ember.computed(function() {
    return this.get('width') - this.get('labelWidthOffset');
  }).property('width', 'labelWidthOffset'),
  graphicHeight: Ember.computed(function() {
    return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
  }).property('height', 'legendHeight', 'legendChartPadding'),
  timeDelta: Ember.computed(function() {
    var diffTimeDays, endTime, groupedBarData, startTime;
    groupedBarData = this.get('groupedBarData');
    if (Ember.isEmpty(groupedBarData) || groupedBarData.get('length') < 2) {
      return 'month';
    }
    startTime = groupedBarData[0][0].time;
    endTime = groupedBarData[1][0].time;
    diffTimeDays = (endTime - startTime) / (24 * 60 * 60 * 1000);
    if (diffTimeDays > 351) {
      return 'year';
    } else if (diffTimeDays > 33) {
      return 'quarter';
    } else if (diffTimeDays > 9) {
      return 'month';
    } else if (diffTimeDays > 3) {
      return 'week';
    } else {
      return 'day';
    }
  }).property('groupedBarData'),
  barDataExtent: Ember.computed(function() {
    var endTime, endTimeGroup, groupedBarData, paddedEnd, paddedStart, startTime, startTimeGroup, timeDelta;
    timeDelta = this.get('timeDelta');
    groupedBarData = this.get('groupedBarData');
    if (Ember.isEmpty(groupedBarData)) {
      return [new Date(), new Date()];
    }
    startTimeGroup = groupedBarData[0];
    startTime = startTimeGroup[0].time;
    endTimeGroup = groupedBarData[groupedBarData.length - 1];
    endTime = endTimeGroup[0].time;
    paddedStart = timeDelta === 'quarter' ? +startTime / 2 + d3.time['month'].offset(startTime, -3) / 2 : +startTime / 2 + d3.time[timeDelta].offset(startTime, -1) / 2;
    paddedEnd = timeDelta === 'quarter' ? +endTime / 2 + d3.time['month'].offset(endTime, 3) / 2 : +endTime / 2 + d3.time[timeDelta].offset(endTime, 1) / 2;
    return [new Date(paddedStart), new Date(paddedEnd)];
  }).property('timeDelta', 'groupedBarData.@each'),
  individualBarLabels: Ember.computed.alias('barGroups'),
  xBetweenGroupDomain: Ember.computed.alias('barDataExtent'),
  xWithinGroupDomain: Ember.computed.alias('individualBarLabels'),
  barWidth: Ember.computed(function() {
    return this.get('xGroupScale').rangeBand();
  }).property('xGroupScale'),
  stackWidth: Ember.computed(function() {
    return this.get('paddedStackWidth') * (1 - this.get('barGroupPadding'));
  }).property('paddedStackWidth', 'barGroupPadding'),
  paddedStackWidth: Ember.computed(function() {
    var end, start, _ref;
    _ref = this.get('xGroupScale').rangeExtent(), start = _ref[0], end = _ref[1];
    return end - start;
  }).property('xGroupScale'),
  paddedGroupWidth: Ember.computed(function() {
    var scale, t1, t2, timeDelta;
    timeDelta = this.get('timeDelta');
    scale = this.get('xTimeScale');
    t1 = this.get('xBetweenGroupDomain')[0];
    t2 = timeDelta === 'quarter' ? d3.time['month'].offset(t1, 3) : d3.time[timeDelta].offset(t1, 1);
    return scale(t2) - scale(t1);
  }).property('timeDelta', 'xTimeScale', 'xBetweenGroupDomain'),
  lineSeriesNames: Ember.computed(function() {
    var data;
    data = this.get('groupedLineData');
    if (Ember.isEmpty(data)) {
      return [];
    }
    return data.map(function(d) {
      return d.group;
    });
  }).property('groupedLineData'),
  lineDataExtent: Ember.computed(function() {
    var data, extents;
    data = this.get('groupedLineData');
    if (Ember.isEmpty(data)) {
      return [new Date(), new Date()];
    }
    extents = data.getEach('values').map(function(series) {
      return d3.extent(series.map(function(d) {
        return d.time;
      }));
    });
    return [
      d3.min(extents, function(e) {
        return e[0];
      }), d3.max(extents, function(e) {
        return e[1];
      })
    ];
  }).property('groupedLineData.@each.values'),
  xBetweenSeriesDomain: Ember.computed.alias('lineSeriesNames'),
  xWithinSeriesDomain: Ember.computed.alias('lineDataExtent'),
  maxNumberOfLabels: Ember.computed.alias('numXTicks'),
  xDomain: Ember.computed(function() {
    var maxOfGroups, maxOfSeries, minOfGroups, minOfSeries, _ref, _ref1;
    if (!this.get('hasBarData')) {
      return this.get('xWithinSeriesDomain');
    }
    if (!this.get('hasLineData')) {
      return this.get('xBetweenGroupDomain');
    }
    _ref = this.get('xBetweenGroupDomain'), minOfGroups = _ref[0], maxOfGroups = _ref[1];
    _ref1 = this.get('xWithinSeriesDomain'), minOfSeries = _ref1[0], maxOfSeries = _ref1[1];
    return [Math.min(minOfGroups, minOfSeries), Math.max(maxOfGroups, maxOfSeries)];
  }).property('xBetweenGroupDomain', 'xWithinSeriesDomain', 'hasBarData', 'hasLineData'),
  yDomain: Ember.computed(function() {
    var groupData, hasBarData, hasLineData, lineData, max, maxOfGroups, maxOfSeries, maxOfStacks, min, minOfGroups, minOfSeries, minOfStacks, stackBars, stackData;
    lineData = this.get('groupedLineData');
    stackData = this.get('stackedBarData');
    groupData = this.get('groupedBarData');
    maxOfSeries = d3.max(lineData, function(d) {
      return d3.max(d.values, function(dd) {
        return dd.value;
      });
    });
    minOfSeries = d3.min(lineData, function(d) {
      return d3.min(d.values, function(dd) {
        return dd.value;
      });
    });
    minOfStacks = d3.min(stackData, function(d) {
      return d.totalValue;
    });
    maxOfStacks = d3.max(stackData, function(d) {
      return d.totalValue;
    });
    maxOfGroups = d3.max(groupData, function(d) {
      return d3.max(d, function(dd) {
        return dd.value;
      });
    });
    minOfGroups = d3.min(groupData, function(d) {
      return d3.min(d, function(dd) {
        return dd.value;
      });
    });
    hasBarData = this.get('hasBarData');
    hasLineData = this.get('hasLineData');
    stackBars = this.get('stackBars');
    if (!hasBarData) {
      min = minOfSeries;
      max = maxOfSeries;
    } else if (!hasLineData) {
      min = stackBars ? minOfStacks : minOfGroups;
      max = stackBars ? maxOfStacks : maxOfGroups;
    } else if (stackBars) {
      min = Math.min(minOfSeries, minOfStacks);
      max = Math.max(maxOfSeries, maxOfStacks);
    } else {
      min = Math.min(minOfGroups, minOfSeries);
      max = Math.max(maxOfGroups, maxOfSeries);
    }
    if (stackBars || this.get('yAxisFromZero') || min === max) {
      if (max < 0) {
        return [min, 0];
      }
      if (min > 0) {
        return [0, max];
      }
      if ((min === max && max === 0)) {
        return [-1, 1];
      }
    }
    return [min, max];
  }).property('groupedLineData', 'stackedBarData', 'groupedBarData', 'hasBarData', 'hasLineData', 'stackBars', 'yAxisFromZero'),
  yRange: Ember.computed(function() {
    return [this.get('graphicTop') + this.get('graphicHeight'), this.get('graphicTop')];
  }).property('graphicTop', 'graphicHeight'),
  yScale: Ember.computed(function() {
    return d3.scale.linear().domain(this.get('yDomain')).range(this.get('yRange')).nice(this.get('numYTicks'));
  }).property('yDomain', 'yRange', 'numYTicks'),
  xRange: Ember.computed(function() {
    return [this.get('graphicLeft'), this.get('graphicLeft') + this.get('graphicWidth')];
  }).property('graphicLeft', 'graphicWidth'),
  xTimeScale: Ember.computed(function() {
    var xDomain;
    xDomain = this.get('xDomain');
    return d3.time.scale().domain(this.get('xDomain')).range(this.get('xRange'));
  }).property('xDomain', 'xRange'),
  xGroupScale: Ember.computed(function() {
    return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('paddedGroupWidth')], this.get('barPadding') / 2, this.get('barGroupPadding') / 2);
  }).property('xWithinGroupDomain', 'paddedGroupWidth', 'barPadding', 'barGroupPadding'),
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var addValueLine, content, formatValue;
      d3.select(element).classed('hovered', true);
      content = "<span class=\"tip-label\">" + (_this.get('formatTime')(data.time)) + "</span>";
      formatValue = _this.get('formatValue');
      addValueLine = function(d) {
        content += "<span class=\"name\">" + d.group + ": </span>";
        return content += "<span class=\"value\">" + (formatValue(d.value)) + "</span><br/>";
      };
      if (Ember.isArray(data.values)) {
        data.values.forEach(addValueLine);
      } else {
        addValueLine(data);
      }
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      d3.select(element).classed('hovered', false);
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  zeroDisplacement: 1,
  groupAttrs: Ember.computed(function() {
    var _this = this;
    return {
      transform: function(d) {
        var dx, dy;
        if (_this.get('stackBars')) {
          dx = -_this.get('stackWidth') / 2;
        } else {
          dx = -_this.get('paddedGroupWidth') / 2;
        }
        dy = 0;
        return "translate(" + dx + "," + dy + ")";
      }
    };
  }).property('stackBars', 'stackWidth', 'paddedGroupWidth'),
  stackedBarAttrs: Ember.computed(function() {
    var xTimeScale, yScale,
      _this = this;
    xTimeScale = this.get('xTimeScale');
    yScale = this.get('yScale');
    return {
      "class": function(d, i) {
        return "grouping-" + i;
      },
      'stroke-width': 0,
      width: this.get('stackWidth'),
      x: function(d) {
        return xTimeScale(d.x);
      },
      y: function(d) {
        return yScale(d.y1) + _this.get('zeroDisplacement');
      },
      height: function(d) {
        return yScale(d.y0) - yScale(d.y1);
      }
    };
  }).property('xTimeScale', 'yScale', 'stackWidth', 'zeroDisplacement'),
  groupedBarAttrs: Ember.computed(function() {
    var xGroupScale, xTimeScale, yScale, zeroDisplacement,
      _this = this;
    xTimeScale = this.get('xTimeScale');
    xGroupScale = this.get('xGroupScale');
    yScale = this.get('yScale');
    zeroDisplacement = this.get('zeroDisplacement');
    return {
      "class": function(d, i) {
        return "grouping-" + i;
      },
      'stroke-width': 0,
      width: this.get('barWidth'),
      x: function(d) {
        return xGroupScale(d.label) + xTimeScale(d.time);
      },
      y: function(d) {
        if (d.value > 0) {
          return yScale(d.value);
        } else {
          return yScale(0) + zeroDisplacement;
        }
      },
      height: function(d) {
        var zeroLine;
        zeroLine = Math.max(0, yScale.domain()[0]);
        return Math.max(0, d.value > zeroLine ? Math.abs(yScale(zeroLine) - yScale(d.value)) - zeroDisplacement : Math.abs(yScale(d.value) - yScale(zeroLine)) - zeroDisplacement);
      }
    };
  }).property('xTimeScale', 'xGroupScale', 'barWidth', 'yScale', 'zeroDisplacement'),
  line: Ember.computed(function() {
    var _this = this;
    return d3.svg.line().x(function(d) {
      return _this.get('xTimeScale')(d.time);
    }).y(function(d) {
      return _this.get('yScale')(d.value);
    }).interpolate(this.get('interpolate') ? 'basis' : 'linear');
  }).property('xTimeScale', 'yScale', 'interpolate'),
  getLineColor: Ember.computed(function() {
    var _this = this;
    return function(d, i) {
      var getSeriesColor;
      getSeriesColor = _this.get('getSeriesColor');
      switch (i) {
        case 0:
          return getSeriesColor(d, 0);
        case 1:
          return getSeriesColor(d, 2);
        case 2:
          return getSeriesColor(d, 0);
        case 3:
          return getSeriesColor(d, 2);
        case 4:
          return getSeriesColor(d, 0);
        case 5:
          return getSeriesColor(d, 1);
        default:
          return getSeriesColor(d, i);
      }
    };
  }),
  lineAttrs: Ember.computed(function() {
    var getSeriesColor, line,
      _this = this;
    getSeriesColor = this.get('getSeriesColor');
    line = this.get('line');
    return {
      "class": function(d, i) {
        return "line series-" + i;
      },
      d: function(d) {
        return line(d.values);
      },
      stroke: this.get('getLineColor'),
      'stroke-width': function(d, i) {
        switch (i) {
          case 0:
            return 2;
          case 1:
            return 1.5;
          case 2:
            return 2;
          case 3:
            return 1.5;
          case 4:
            return 2.5;
          case 5:
            return 2.5;
          default:
            return 2;
        }
      },
      'stroke-dasharray': function(d, i) {
        switch (i) {
          case 2:
          case 3:
          case 5:
            return '2,2';
          default:
            return '';
        }
      }
    };
  }).property('line', 'getSeriesColor'),
  numLines: Ember.computed.alias('xBetweenSeriesDomain.length'),
  numBarsPerGroup: Ember.computed.alias('xWithinGroupDomain.length'),
  numColorSeries: 6,
  numSecondaryColorSeries: Ember.computed.alias('numBarsPerGroup'),
  secondaryMinimumTint: Ember.computed(function() {
    if (this.get('numLines') === 0) {
      return 0;
    } else {
      return 0.4;
    }
  }).property('numLines'),
  secondaryMaximumTint: Ember.computed(function() {
    if (this.get('numLines') === 0) {
      return 0.8;
    } else {
      return 0.85;
    }
  }).property('numLines'),
  hasLegend: Ember.computed(function() {
    return this.get('legendItems.length') > 1;
  }).property('legendItems.length'),
  legendItems: Ember.computed(function() {
    var getSeriesColor, lineAttrs,
      _this = this;
    getSeriesColor = this.get('getSeriesColor');
    lineAttrs = this.get('lineAttrs');
    return this.get('xBetweenSeriesDomain').map(function(d, i) {
      return {
        label: d,
        stroke: lineAttrs['stroke'](d, i),
        width: lineAttrs['stroke-width'](d, i),
        dotted: lineAttrs['stroke-dasharray'](d, i),
        icon: function() {
          return 'line';
        },
        selector: ".series-" + i
      };
    }).concat(this.get('xWithinGroupDomain').map(function(d, i) {
      var color;
      color = _this.get('getSecondarySeriesColor')(d, i);
      return {
        stroke: color,
        fill: color,
        label: d,
        icon: function() {
          return 'square';
        },
        selector: ".grouping-" + i
      };
    }));
  }).property('xBetweenSeriesDomain', 'xWithinGroupDomain', 'getSeriesColor', 'getSecondarySeriesColor'),
  removeAllGroups: function() {
    return this.get('viewport').selectAll('.bars').remove();
  },
  groups: Ember.computed(function() {
    var barData;
    if (this.get('stackBars')) {
      barData = this.get('stackedBarData');
    } else {
      barData = this.get('groupedBarData');
    }
    return this.get('viewport').selectAll('.bars').data(barData);
  }).volatile(),
  removeAllSeries: function() {
    return this.get('viewport').selectAll('.series').remove();
  },
  series: Ember.computed(function() {
    return this.get('viewport').selectAll('.series').data(this.get('groupedLineData'));
  }).volatile(),
  xAxis: Ember.computed(function() {
    var xAxis;
    xAxis = this.get('viewport').select('.x.axis');
    if (xAxis.empty()) {
      return this.get('viewport').insert('g', ':first-child').attr('class', 'x axis');
    } else {
      return xAxis;
    }
  }).volatile(),
  yAxis: Ember.computed(function() {
    var yAxis;
    yAxis = this.get('viewport').select('.y.axis');
    if (yAxis.empty()) {
      return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis');
    } else {
      return yAxis;
    }
  }).volatile(),
  renderVars: ['getLabelledTicks', 'xGroupScale', 'xTimeScale', 'yScale'],
  drawChart: function() {
    this.updateRule();
    this.updateBarData();
    this.updateLineData();
    this.updateLineMarkers();
    this.updateAxes();
    this.updateBarGraphic();
    this.updateLineGraphic();
    if (this.get('hasLegend')) {
      return this.drawLegend();
    } else {
      return this.clearLegend();
    }
  },
  updateAxes: function() {
    var gXAxis, gYAxis, graphicHeight, graphicLeft, graphicTop, xAxis, yAxis;
    xAxis = d3.svg.axis().scale(this.get('xTimeScale')).orient('bottom').ticks(this.get('getLabelledTicks')).tickSubdivide(this.get('numberOfMinorTicks')).tickFormat(this.get('formattedTime')).tickSize(6, 3, 0);
    yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatValue'));
    graphicTop = this.get('graphicTop');
    graphicHeight = this.get('graphicHeight');
    gXAxis = this.get('xAxis').attr({
      transform: "translate(0," + (graphicTop + graphicHeight) + ")"
    }).call(xAxis);
    graphicLeft = this.get('graphicLeft');
    gYAxis = this.get('yAxis').attr('transform', "translate(" + graphicLeft + ",0)").call(yAxis);
    gYAxis.selectAll('g').filter(function(d) {
      return d;
    }).classed('major', false).classed('minor', true);
    return gYAxis.selectAll('text').style('text-anchor', 'end').attr({
      x: -this.get('labelPadding')
    });
  },
  updateBarData: function() {
    var bars, groups, hideDetails, showDetails, subdata;
    this.removeAllGroups();
    groups = this.get('groups');
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    groups.enter().insert('g', '.series').attr('class', 'bars');
    groups.exit().remove();
    if (this.get('stackBars')) {
      subdata = function(d) {
        return d.stackedValues;
      };
    } else {
      subdata = function(d) {
        return d;
      };
    }
    bars = groups.selectAll('rect').data(subdata);
    bars.enter().append('rect').on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    return bars.exit().remove();
  },
  updateBarGraphic: function() {
    var barAttrs, groups;
    if (this.get('stackBars')) {
      barAttrs = this.get('stackedBarAttrs');
    } else {
      barAttrs = this.get('groupedBarAttrs');
    }
    groups = this.get('groups');
    groups.attr(this.get('groupAttrs'));
    return groups.selectAll('rect').style('fill', this.get('getSecondarySeriesColor')).attr(barAttrs);
  },
  updateLineData: function() {
    var series;
    this.removeAllSeries();
    series = this.get('series');
    series.enter().append('g').attr('class', 'series').append('path').attr('class', 'line');
    return series.exit().remove();
  },
  updateLineGraphic: function() {
    var graphicTop, series;
    series = this.get('series');
    graphicTop = this.get('graphicTop');
    series.attr('transform', "translate(0, " + graphicTop + ")");
    return series.select('path.line').attr(this.get('lineAttrs'));
  }
});

Ember.Handlebars.helper('time-series-chart', Ember.Charts.TimeSeriesComponent);


})();

(function() {


Ember.Charts.BubbleComponent = Ember.Charts.ChartComponent.extend(Ember.Charts.FloatingTooltipMixin, {
  classNames: ['chart-bubble'],
  layoutGravity: -0.01,
  damper: 0.1,
  charge: Ember.computed(function() {
    return function(d) {
      return -Math.pow(d.radius, 2.0) / 8;
    };
  }),
  formatValue: d3.format('.2s'),
  formatValueLong: d3.format(',.r'),
  showDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      var content, formatValue;
      d3.select(element).classed('hovered', true);
      formatValue = _this.get('formatValue');
      content = "<span class=\"tip-label\">" + data.label + "</span>";
      content += "<span class=\"name\">" + (_this.get('tooltipValueDisplayName')) + ": </span>";
      content += "<span class=\"value\">" + (formatValue(data.value)) + "</span>";
      return _this.showTooltip(content, d3.event);
    };
  }).property('isInteractive'),
  hideDetails: Ember.computed(function() {
    var _this = this;
    if (!this.get('isInteractive')) {
      return Ember.K;
    }
    return function(data, i, element) {
      d3.select(element).classed('hovered', false);
      return _this.hideTooltip();
    };
  }).property('isInteractive'),
  renderVars: ['selectedSeedColor'],
  radiusScale: Ember.computed(function() {
    var maxAmount, maxRadius;
    maxAmount = d3.max(this.data, function(d) {
      return d.value;
    });
    maxRadius = d3.min([this.get('width'), this.get('height')]) / 7;
    return d3.scale.pow().exponent(0.5).domain([0, maxAmount]).range([2, maxRadius]);
  }).property('data', 'width', 'height'),
  nodeData: Ember.computed(function() {
    var data, nodes, radiusScale,
      _this = this;
    data = this.get('data');
    if (Ember.isEmpty(data)) {
      return [];
    }
    radiusScale = this.get('radiusScale');
    nodes = data.map(function(d) {
      return {
        radius: radiusScale(d.value),
        value: d.value,
        label: d.label,
        id: d.label,
        x: Math.random() * _this.get('width') / 2,
        y: Math.random() * _this.get('height') / 2
      };
    });
    nodes.sort(function(a, b) {
      return b.value - a.value;
    });
    return nodes;
  }).property('radiusScale'),
  finishedData: Ember.computed.alias('nodeData'),
  numColorSeries: Ember.computed.alias('finishedData.length'),
  drawChart: function() {
    return this.updateVis();
  },
  updateVis: function() {
    var circles, fill_color, force, hideDetails, move_towards_center, nodes, showDetails, vis,
      _this = this;
    vis = this.get('viewport');
    nodes = this.get('nodeData');
    showDetails = this.get('showDetails');
    hideDetails = this.get('hideDetails');
    fill_color = this.get('getSeriesColor');
    circles = vis.selectAll("circle").data(nodes, function(d) {
      return d.id;
    });
    circles.enter().append("circle").attr("r", 0).attr("id", function(d) {
      return "bubble_" + d.id;
    }).on("mouseover", function(d, i) {
      return showDetails(d, i, this);
    }).on("mouseout", function(d, i) {
      return hideDetails(d, i, this);
    });
    circles.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    });
    circles.attr("fill", fill_color).attr("stroke-width", 2).attr("stroke", function(d, i) {
      return d3.rgb(fill_color(d, i)).darker();
    });
    circles.exit().remove();
    move_towards_center = function(alpha) {
      var center;
      center = {
        x: _this.get('width') / 2,
        y: _this.get('height') / 2
      };
      return function(d) {
        d.x = d.x + (center.x - d.x) * (_this.get('damper') + 0.02) * alpha;
        return d.y = d.y + (center.y - d.y) * (_this.get('damper') + 0.02) * alpha;
      };
    };
    force = d3.layout.force().nodes(nodes).size([this.get('width'), this.get('height')]);
    force.gravity(this.get('layoutGravity')).charge(this.get('charge')).friction(0.9).on("tick", function(e) {
      return circles.each(move_towards_center(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    force.start();
    return vis.selectAll(".years").remove();
  }
});

Ember.Handlebars.helper('bubble-chart', Ember.Charts.BubbleComponent);


})();