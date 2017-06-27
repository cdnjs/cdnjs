/*!
* ember-charts v1.2.0
* Copyright 2012-2016 Addepar Inc.
* See LICENSE.md
*/
(function(){;
var define, requireModule, require, requirejs;

(function() {

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
  } else {
    _isArray = Array.isArray;
  }

  var registry = {}, seen = {};
  var FAILED = false;

  var uuid = 0;

  function tryFinally(tryable, finalizer) {
    try {
      return tryable();
    } finally {
      finalizer();
    }
  }

  function unsupportedModule(length) {
    throw new Error("an unsupported module was defined, expected `define(name, deps, module)` instead got: `" + length + "` arguments to define`");
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(name, deps, callback, exports) {
    this.id       = uuid++;
    this.name     = name;
    this.deps     = !deps.length && callback.length ? defaultDeps : deps;
    this.exports  = exports || { };
    this.callback = callback;
    this.state    = undefined;
    this._require  = undefined;
  }


  Module.prototype.makeRequire = function() {
    var name = this.name;

    return this._require || (this._require = function(dep) {
      return require(resolve(dep, name));
    });
  }

  define = function(name, deps, callback) {
    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }

    registry[name] = new Module(name, deps, callback);
  };

  // we don't support all of AMD
  // define.amd = {};
  // we will support petals...
  define.petal = { };

  function Alias(path) {
    this.name = path;
  }

  define.alias = function(path) {
    return new Alias(path);
  };

  function reify(mod, name, seen) {
    var deps = mod.deps;
    var length = deps.length;
    var reified = new Array(length);
    var dep;
    // TODO: new Module
    // TODO: seen refactor
    var module = { };

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        module.exports = reified[i] = seen;
      } else if (dep === 'require') {
        reified[i] = mod.makeRequire();
      } else if (dep === 'module') {
        mod.exports = seen;
        module = reified[i] = mod;
      } else {
        reified[i] = requireFrom(resolve(dep, name), name);
      }
    }

    return {
      deps: reified,
      module: module
    };
  }

  function requireFrom(name, origin) {
    var mod = registry[name];
    if (!mod) {
      throw new Error('Could not find module `' + name + '` imported from `' + origin + '`');
    }
    return require(name);
  }

  function missingModule(name) {
    throw new Error('Could not find module ' + name);
  }
  requirejs = require = requireModule = function(name) {
    var mod = registry[name];


    if (mod && mod.callback instanceof Alias) {
      mod = registry[mod.callback.name];
    }

    if (!mod) { missingModule(name); }

    if (mod.state !== FAILED &&
        seen.hasOwnProperty(name)) {
      return seen[name];
    }

    var reified;
    var module;
    var loaded = false;

    seen[name] = { }; // placeholder for run-time cycles

    tryFinally(function() {
      reified = reify(mod, name, seen[name]);
      module = mod.callback.apply(this, reified.deps);
      loaded = true;
    }, function() {
      if (!loaded) {
        mod.state = FAILED;
      }
    });

    var obj;
    if (module === undefined && reified.module.exports) {
      obj = reified.module.exports;
    } else {
      obj = seen[name] = module;
    }

    if (obj !== null &&
        (typeof obj === 'object' || typeof obj === 'function') &&
          obj['default'] === undefined) {
      obj['default'] = obj;
    }

    return (seen[name] = obj);
  };

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') { continue; }
      else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.clear = function(){
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = state = {};
  };
})();

define('ember-charts/components/bubble-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/floating-tooltip'], function (exports, module, _ember, _chartComponent, _mixinsFloatingTooltip) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  module.exports = _ChartComponent['default'].extend(_FloatingTooltipMixin['default'], {
    classNames: ['chart-bubble'],

    // ----------------------------------------------------------------------------
    // Bubble Chart Options
    // ----------------------------------------------------------------------------
    // used when setting up force and
    // moving around nodes
    // TODO(tony) camel case
    layoutGravity: -0.01,
    damper: 0.1,

    // Charge function that is called for each node.
    // Charge is proportional to the diameter of the
    // circle (which is stored in the radius attribute
    // of the circle's associated data.
    // This is done to allow for accurate collision
    // detection with nodes of different sizes.
    // Charge is negative because we want nodes to
    // repel.
    // Dividing by 8 scales down the charge to be
    // appropriate for the visualization dimensions.
    charge: _Ember['default'].computed(function () {
      return function (d) {
        return -Math.pow(d.radius, 2.0) / 8;
      };
    }),

    // Getters for formatting human-readable labels from provided data
    formatLabel: d3.format(',.2f'),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      if (this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Do hover detail style stuff here
        d3.select(element).classed('hovered', true);

        // Show tooltip
        var formatLabel = this.get('formatLabel');
        var content = $('<span>');
        content.append($('<span class="tip-label">').text(data.label));
        content.append($('<span class="name">').text(this.get('tooltipValueDisplayName') + ': '));
        content.append($('<span class="value">').text(formatLabel(data.value)));
        return this.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      if (this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Undo hover style stuff
        d3.select(element).classed('hovered', false);
        // Hide Tooltip
        return this.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    renderVars: ['selectedSeedColor'],

    // Sqrt scaling between data and radius
    radiusScale: _Ember['default'].computed('data', 'width', 'height', function () {
      // use the max total_amount in the data as the max in the scale's domain
      var maxAmount = d3.max(this.get('data'), function (d) {
        return d.value;
      });
      var maxRadius = d3.min([this.get('width'), this.get('height')]) / 7;
      // TODO(tony): get rid of hard coded values
      return d3.scale.pow().exponent(0.5).domain([0, maxAmount]).range([2, maxRadius]);
    }),

    nodeData: _Ember['default'].computed('radiusScale', function () {
      var _this = this;

      var data = this.get('data');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }

      var radiusScale = this.get('radiusScale');
      var nodes = data.map(function (d) {
        return {
          radius: radiusScale(d.value),
          value: d.value,
          label: d.label,
          id: d.label,
          x: Math.random() * _this.get('width') / 2,
          y: Math.random() * _this.get('height') / 2
        };
      });

      nodes.sort(function (a, b) {
        return b.value - a.value;
      });
      return nodes;
    }),

    finishedData: _Ember['default'].computed.alias('nodeData'),

    numColorSeries: _Ember['default'].computed.alias('finishedData.length'),

    drawChart: function drawChart() {
      return this.updateVis();
    },

    updateVis: function updateVis() {
      var _this2 = this;

      var vis = this.get('viewport');
      var nodes = this.get('nodeData');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');
      var fill_color = this.get('getSeriesColor');

      var circles = vis.selectAll("circle").data(nodes, function (d) {
        return d.id;
      });

      circles.enter().append("circle")
      // radius will be set to 0 initially.
      // see transition below
      .attr("r", 0).attr("id", function (d) {
        return "bubble_" + d.id;
      }).on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });

      // Fancy transition to make bubbles appear, ending with the
      // correct radius
      circles.transition().duration(2000).attr("r", function (d) {
        return d.radius;
      });

      circles.attr("fill", fill_color).attr("stroke-width", 2).attr("stroke", function (d, i) {
        return d3.rgb(fill_color(d, i)).darker();
      });

      circles.exit().remove();

      // Moves all circles towards the @center
      // of the visualization
      var move_towards_center = function move_towards_center(alpha) {
        var center = {
          x: _this2.get('width') / 2,
          y: _this2.get('height') / 2
        };
        return function (d) {
          d.x = d.x + (center.x - d.x) * (_this2.get('damper') + 0.02) * alpha;
          d.y = d.y + (center.y - d.y) * (_this2.get('damper') + 0.02) * alpha;
        };
      };

      // Start the forces
      var force = d3.layout.force().nodes(nodes).size([this.get('width'), this.get('height')]);

      // Display all
      force.gravity(this.get('layoutGravity')).charge(this.get('charge')).friction(0.9).on("tick", function (e) {
        circles.each(move_towards_center(e.alpha)).attr("cx", function (d) {
          return d.x;
        }).attr("cy", function (d) {
          return d.y;
        });
      });
      force.start();

      return vis.selectAll(".years").remove();
    }
  });
});
define('ember-charts/components/chart-component', ['exports', 'module', 'ember', '../mixins/resize-handler', '../mixins/colorable'], function (exports, module, _ember, _mixinsResizeHandler, _mixinsColorable) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ResizeHandlerMixin = _interopRequireDefault(_mixinsResizeHandler);

  var _ColorableMixin = _interopRequireDefault(_mixinsColorable);

  var ChartComponent = _Ember['default'].Component.extend(_ColorableMixin['default'], _ResizeHandlerMixin['default'], {
    layoutName: 'components/chart-component',
    classNames: ['chart-frame', 'scroll-y'],
    isInteractive: true,

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // Margin between viewport and svg boundary
    horizontalMargin: 30,
    verticalMargin: 30,

    /**
     * Optional property to set specific left margin
     * @type {Number}
     */
    horizontalMarginLeft: null,

    /**
     * Optional property to set specific right margin
     * @type {Number}
     */
    horizontalMarginRight: null,

    /**
     * An array of the values in the data that is passed into the chart
     * @type {Array.<Number>}
     */
    allFinishedDataValues: _Ember['default'].computed('finishedData.@each.value', function () {
      return this.get('finishedData').map(function (d) {
        return d.value;
      });
    }),

    /**
     * The minimum value of the data in the chart
     * @type {Number}
     */
    minValue: _Ember['default'].computed('allFinishedDataValues.[]', function () {
      return d3.min(this.get('allFinishedDataValues'));
    }),

    /**
     * The maximum value of the data in the chart
     * @type {Number}
     */
    maxValue: _Ember['default'].computed('allFinishedDataValues.[]', function () {
      return d3.max(this.get('allFinishedDataValues'));
    }),

    /**
     * An array of the values which are at least 0
     * @type {Array<Number>}
     */
    positiveValues: _Ember['default'].computed('allFinishedDataValues.[]', function () {
      return this.get('allFinishedDataValues').filter(function (val) {
        return val >= 0;
      });
    }),

    /**
     * An array of the values which are less than 0
     * @type {Array<Number>}
     */
    negativeValues: _Ember['default'].computed('allFinishedDataValues.[]', function () {
      return this.get('allFinishedDataValues').filter(function (val) {
        return val < 0;
      });
    }),

    /**
     * Whether or not the data contains negative values.
     * @type {Boolean}
     */
    hasNegativeValues: _Ember['default'].computed.lt('minValue', 0),

    /**
     * Whether or not the data contains positive values.
     * @type {Boolean}
     */
    hasPositiveValues: _Ember['default'].computed.gt('maxValue', 0),

    /**
     * Whether or not the data contains only positive values.
     * @type {Boolean}
     */
    hasAllNegativeValues: _Ember['default'].computed.lte('maxValue', 0),

    /**
     * Whether or not the data contains only negative values.
     * @type {Boolean}
     */
    hasAllPositiveValues: _Ember['default'].computed.gte('minValue', 0),

    /**
     * Either a passed in value from `horizontalMarginRight`
     * or the default value from `horizontalMargin`
     * @type {Number}
     */
    marginRight: _Ember['default'].computed('horizontalMarginRight', 'horizontalMargin', function () {
      var horizontalMarginRight = this.get('horizontalMarginRight');
      if (_Ember['default'].isNone(horizontalMarginRight)) {
        return this.get('horizontalMargin');
      } else {
        return horizontalMarginRight;
      }
    }),

    /**
     * Either a passed in value from `horizontalMarginLeft`
     * or the default value from `horizontalMargin`
     * @type {Number}
     */
    marginLeft: _Ember['default'].computed('horizontalMarginLeft', 'horizontalMargin', function () {
      var horizontalMarginLeft = this.get('horizontalMarginLeft');
      if (_Ember['default'].isNone(horizontalMarginLeft)) {
        return this.get('horizontalMargin');
      } else {
        return horizontalMarginLeft;
      }
    }),

    marginTop: _Ember['default'].computed.alias('verticalMargin'),
    marginBottom: _Ember['default'].computed.alias('verticalMargin'),

    // TODO: Rename outer to SVG?
    defaultOuterHeight: 500,
    defaultOuterWidth: 700,
    outerHeight: _Ember['default'].computed.alias('defaultOuterHeight'),
    outerWidth: _Ember['default'].computed.alias('defaultOuterWidth'),

    width: _Ember['default'].computed('outerWidth', 'marginLeft', 'marginRight', function () {
      return this.get('outerWidth') - this.get('marginLeft') - this.get('marginRight');
    }),

    height: _Ember['default'].computed('outerHeight', 'marginBottom', 'marginTop', function () {
      return Math.max(1, this.get('outerHeight') - this.get('marginBottom') - this.get('marginTop'));
    }),

    // Hierarchy of chart view is:
    // 1 Outside most element is div.chart-frame
    // 2 Next element is svg
    // 3 Finally, g.chart-viewport
    $viewport: _Ember['default'].computed(function () {
      return this.$('.chart-viewport')[0];
    }),

    viewport: _Ember['default'].computed(function () {
      return d3.select(this.get('$viewport'));
    }),

    // Transform the view commonly displaced by the margin
    transformViewport: _Ember['default'].computed('marginLeft', 'marginTop', function () {
      var left = this.get('marginLeft');
      var top = this.get('marginTop');
      return 'translate(' + left + ',' + top + ')';
    }),

    // ----------------------------------------------------------------------------
    // Labels
    // ----------------------------------------------------------------------------
    // Padding between label and zeroline, or label and graphic
    labelPadding: 10,

    // Padding allocated for axes on left of graph
    labelWidth: 30,
    labelHeight: 15,

    labelWidthOffset: _Ember['default'].computed('labelWidth', 'labelPadding', function () {
      return this.get('labelWidth') + this.get('labelPadding');
    }),

    labelHeightOffset: _Ember['default'].computed('labelHeight', 'labelPadding', function () {
      return this.get('labelHeight') + this.get('labelPadding');
    }),

    // ----------------------------------------------------------------------------
    // Graphic/NonGraphic Layout
    // I.e., some charts will care about the dimensions of the actual chart graphic
    // space vs. other drawing space, e.g., axes, labels, legends.
    // TODO(tony): Consider this being a mixin for axes/legends and it just happens
    // to be a redundant mixin. This is a problem though because we would not want
    // to override things like graphicTop, we instead would want the changes to be
    // cumulative.
    // ----------------------------------------------------------------------------
    graphicTop: 0,
    graphicLeft: 0,
    graphicWidth: _Ember['default'].computed.alias('width'),
    graphicHeight: _Ember['default'].computed.alias('height'),

    graphicBottom: _Ember['default'].computed('graphicTop', 'graphicHeight', function () {
      return this.get('graphicTop') + this.get('graphicHeight');
    }),

    graphicRight: _Ember['default'].computed('graphicLeft', 'graphicWidth', function () {
      return this.get('graphicLeft') + this.get('graphicWidth');
    }),

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    hasNoData: _Ember['default'].computed('finishedData', function () {
      return _Ember['default'].isEmpty(this.get('finishedData'));
    }),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    // Observe important variables and trigger chart redraw when they change
    concatenatedProperties: ['renderVars'],

    // Every chart will trigger a redraw when these variables change, through the
    // magic of concatenatedProperties any class that overrides the variable
    // renderVars will actually just be appending names to the list
    renderVars: ['finishedData', 'width', 'height', 'margin', 'isInteractive'],

    init: function init() {
      var _this = this;

      this._super();
      _.uniq(this.get('renderVars')).forEach(function (renderVar) {
        _this.addObserver(renderVar, _this.drawOnce);
        // This is just to ensure that observers added above fire even
        // if that renderVar is not consumed elsewhere.
        _this.get(renderVar);
      });
    },

    willDestroyElement: function willDestroyElement() {
      var _this2 = this;

      _.uniq(this.get('renderVars')).forEach(function (renderVar) {
        _this2.removeObserver(renderVar, _this2, _this2.drawOnce);
      });
      this._super();
    },

    didInsertElement: function didInsertElement() {
      this._super();
      this._updateDimensions();
      this.drawOnce();
    },

    drawOnce: function drawOnce() {
      _Ember['default'].run.once(this, this.get('draw'));
    },

    onResizeEnd: function onResizeEnd() {
      this._updateDimensions();
    },

    // Wrap the chart in a container div that is the same size
    _updateDimensions: function _updateDimensions() {
      this.set('defaultOuterHeight', this.$().height());
      this.set('defaultOuterWidth', this.$().width());
    },

    clearChart: function clearChart() {
      this.$('.chart-viewport').children().remove();
    },

    // Remove previous drawing
    draw: function draw() {
      if ((this._state || this.state) !== "inDOM") {
        return;
      }

      if (this.get('hasNoData')) {
        return this.clearChart();
      } else {
        return this.drawChart();
      }
    }
  });

  module.exports = ChartComponent;
});
define('ember-charts/components/horizontal-bar-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/formattable', '../mixins/floating-tooltip', '../mixins/sortable-chart', '../utils/label-trimmer', '../mixins/axis-titles'], function (exports, module, _ember, _chartComponent, _mixinsFormattable, _mixinsFloatingTooltip, _mixinsSortableChart, _utilsLabelTrimmer, _mixinsAxisTitles) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _SortableChartMixin = _interopRequireDefault(_mixinsSortableChart);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  var _AxisTitlesMixin = _interopRequireDefault(_mixinsAxisTitles);

  var HorizontalBarChartComponent = _ChartComponent['default'].extend(_FloatingTooltipMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], _AxisTitlesMixin['default'], {
    classNames: ['chart-horizontal-bar'],

    // ----------------------------------------------------------------------------
    // Horizontal Bar Chart Options
    // ----------------------------------------------------------------------------

    // Minimum height of the whole chart, including padding
    defaultOuterHeight: 500,

    // Space between label and zeroline (overrides ChartView)
    // Also used to pad labels against the edges of the viewport
    labelPadding: 20,

    // Space between adjacent bars, as fraction of padded bar size
    barPadding: 0.2,

    // Constraints on size of each bar
    maxBarThickness: 60,
    minBarThickness: 20,

    /*
     * The maximum width of grouping labels. The text of the label will be
     * trimmed if it exceeds this width. This max won't be enforced if it is
     * null or undefined
     * @type {Number}
     */
    maxLabelWidth: null,

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------
    finishedData: _Ember['default'].computed.alias('sortedData'),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    /**
     * Overrides values in addon/mixins/axis-titles.js
     * Location of axis title should track the actual axis
     *   - If there are both positive and negative values
     *   - Since the chart axis will be close to center
     * @override
     */
    xAxisPositionX: _Ember['default'].computed('graphicWidth', 'xTitleHorizontalOffset', function () {
      var position = this.get('graphicWidth') / 2;
      if (!_Ember['default'].isNone(this.get('xTitleHorizontalOffset'))) {
        position += this.get('xTitleHorizontalOffset');
      }
      return position;
    }),

    /**
     * X Axis Titles needs extra padding, else will intersect with the lowest bar
     * @override
     */
    xAxisPositionY: _Ember['default'].computed('graphicBottom', 'xTitleVerticalOffset', function () {
      return this.get('graphicBottom') + this.get('xTitleVerticalOffset');
    }),

    /**
     * @override
     */
    yAxisPositionY: _Ember['default'].computed('labelWidthOffset', 'yAxisTitleHeightOffset', function () {
      return -(this.get('labelWidthOffset') + this.get('yAxisTitleHeightOffset'));
    }),

    minOuterHeight: _Ember['default'].computed('numBars', 'minBarThickness', 'marginTop', 'marginBottom', function () {
      var minBarThickness = this.get('minBarThickness');
      // If minBarThickness is null or undefined, do not enforce minOuterHeight.
      if (_Ember['default'].isNone(minBarThickness)) {
        return null;
      } else {
        var minBarSpace = this.get('numBars') * minBarThickness;
        return minBarSpace + this.get('marginTop') + this.get('marginBottom');
      }
    }),

    maxOuterHeight: _Ember['default'].computed('numBars', 'maxBarThickness', 'marginTop', 'marginBottom', function () {
      var maxBarThickness = this.get('maxBarThickness');
      // If maxBarThickness is null or undefined, do not enforce maxOuterHeight.
      if (_Ember['default'].isNone(maxBarThickness)) {
        return null;
      } else {
        var maxBarSpace = this.get('numBars') * maxBarThickness;
        return maxBarSpace + this.get('marginTop') + this.get('marginBottom');
      }
    }),

    // override the default outerHeight, so the graph scrolls
    outerHeight: _Ember['default'].computed('minOuterHeight', 'maxOuterHeight', 'defaultOuterHeight', function () {
      // Note: d3.max and d3.min ignore null/undefined values
      var maxMinDefault = d3.max([this.get('defaultOuterHeight'), this.get('minOuterHeight')]);
      return d3.min([maxMinDefault, this.get('maxOuterHeight')]);
    }),

    marginTop: _Ember['default'].computed.alias('labelPadding'),

    /**
     * The margin at the bottom depends on the label and title padding and height.
     * @override
     * @type {Number}
     */
    marginBottom: _Ember['default'].computed('labelPadding', 'xTitleVerticalOffset', 'hasXAxisTitle', function () {
      if (this.get('hasXAxisTitle')) {
        return this.get('labelPadding') + this.get('xTitleVerticalOffset');
      }

      return this.get('labelPadding');
    }),

    marginLeft: _Ember['default'].computed.alias('horizontalMarginLeft'),

    // ----------------------------------------------------------------------------
    // Graphics Properties
    // ----------------------------------------------------------------------------

    numBars: _Ember['default'].computed.alias('finishedData.length'),

    // Range of values used to size the graph, within which bars will be drawn
    xDomain: _Ember['default'].computed('minValue', 'maxValue', function () {
      var minValue = this.get('minValue');
      var maxValue = this.get('maxValue');
      if (this.get('hasNegativeValues')) {
        if (this.get('hasPositiveValues')) {
          // Mix of positive and negative values
          return [minValue, maxValue];
        } else {
          // Only negative values domain
          return [minValue, 0];
        }
      } else {
        // Only positive values domain
        return [0, maxValue];
      }
    }),

    /*
     * Returns a function which scales a value in the data to a horizontal position
     * @private
     * @param {Number} width The width of the chart to use for scaling
     * @return {Function}
     */
    _xScaleForWidth: function _xScaleForWidth(width) {
      return d3.scale.linear().domain(this.get('xDomain')).range([0, width]);
    },

    // Scale to map value to horizontal length of bar
    xScale: _Ember['default'].computed('width', 'xDomain', function () {
      return this._xScaleForWidth(this.get('width'));
    }),

    // Scale to map bar index to its horizontal position
    yScale: _Ember['default'].computed('height', 'barPadding', function () {
      // Evenly split up height for bars with space between bars
      return d3.scale.ordinal().domain(d3.range(this.get('numBars'))).rangeRoundBands([0, this.get('height')], this.get('barPadding'));
    }),

    // Space in pixels allocated to each bar + padding
    barThickness: _Ember['default'].computed('yScale', function () {
      return this.get('yScale').rangeBand();
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Do hover detail style stuff here
        d3.select(element).classed('hovered', true);

        // Show tooltip
        var formatLabel = _this.get('formatLabelFunction');
        var content = $('<span>');
        content.append($('<span class="tip-label">').text(data.label));
        content.append($('<span class="name">').text(_this.get('tooltipValueDisplayName') + ': '));
        content.append($('<span class="value">').text(formatLabel(data.value)));
        return _this.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this2 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Undo hover style stuff
        d3.select(element).classed('hovered', false);
        // Hide Tooltip
        return _this2.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    groupAttrs: _Ember['default'].computed('xScale', 'yScale', function () {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      return {
        transform: function transform(d, i) {
          var value = Math.min(0, d.value);
          return 'translate(' + xScale(value) + ', ' + yScale(i) + ')';
        }
      };
    }),

    barAttrs: _Ember['default'].computed('xScale', 'mostTintedColor', 'leastTintedColor', 'barThickness', function () {
      var _this3 = this;

      var xScale = this.get('xScale');
      return {
        width: function width(d) {
          return _this3._computeBarWidth(d.value, xScale);
        },
        height: this.get('barThickness'),
        'stroke-width': 0,
        style: function style(d) {
          if (d.color) {
            return 'fill:' + d.color;
          }
          var color = d.value < 0 ? _this3.get('mostTintedColor') : _this3.get('leastTintedColor');
          return 'fill:' + color;
        }
      };
    }),

    /*
     * Determines whether Value Labels should go on the left side of the Y-Axis
     * Returns true if data is negative, or data is 0 and all other data is negative
     * @private
     * @param {Object}
     * @return {Boolean}
     */
    _isValueLabelLeft: function _isValueLabelLeft(d) {
      if (d.value < 0) {
        return true;
      }

      if (d.value === 0 && this.get('hasAllNegativeValues')) {
        return true;
      }

      return false;
    },

    valueLabelAttrs: _Ember['default'].computed('xScale', 'barThickness', 'labelPadding', function () {
      var _this4 = this;

      var xScale = this.get('xScale');
      // Anchor the label 'labelPadding' away from the zero line
      // How to anchor the text depends on the direction of the bar

      return {
        x: function x(d) {
          if (_this4._isValueLabelLeft(d)) {
            return -_this4.get('labelPadding');
          } else {
            return xScale(d.value) - xScale(0) + _this4.get('labelPadding');
          }
        },
        y: this.get('barThickness') / 2,
        dy: '.35em',
        'text-anchor': function textAnchor(d) {
          return _this4._isValueLabelLeft(d) ? 'end' : 'start';
        },
        'stroke-width': 0
      };
    }),

    groupLabelAttrs: _Ember['default'].computed('xScale', 'barThickness', 'labelPadding', function () {
      var _this5 = this;

      var xScale = this.get('xScale');

      // Anchor the label 'labelPadding' away from the zero line
      // How to anchor the text depends on the direction of the bar
      return {
        x: function x(d) {
          if (_this5._isValueLabelLeft(d)) {
            return xScale(0) - xScale(d.value) + _this5.get('labelPadding');
          } else {
            return -_this5.get('labelPadding');
          }
        },
        y: this.get('barThickness') / 2,
        dy: '.35em',
        'text-anchor': function textAnchor(d) {
          return _this5._isValueLabelLeft(d) ? 'start' : 'end';
        },
        'stroke-width': 0
      };
    }),

    axisAttrs: _Ember['default'].computed('xScale', 'height', function () {
      var xScale = this.get('xScale');

      // Thickness, counts the padding allocated to each bar as well
      return {
        x1: xScale(0),
        x2: xScale(0),
        y1: 0,
        y2: this.get('height')
      };
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    groups: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.bar').data(this.get('finishedData'));
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      var yAxis = this.get('viewport').select('.y.axis line');
      if (yAxis.empty()) {
        return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis').append('line');
      } else {
        return yAxis;
      }
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    didInsertElement: function didInsertElement() {
      var _this6 = this;

      this._super.apply(this, arguments);
      // TODO (philn): This `Ember.run.next` was added to fix a bug where
      // a horizontal bar chart was rendered incorrectly the first time, but
      // correctly on subsequent renders. Still not entirely clear why that is.
      this._scheduledRedraw = _Ember['default'].run.next(function () {
        _this6._updateDimensions();
        _this6.drawOnce();
      });
    },

    /*
     * Tear down the scheduled redraw timer
     * @override
     */
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      _Ember['default'].run.cancel(this._scheduledRedraw);
    },

    /**
     * Store the timer information from scheduling the chart's redraw
     */
    _scheduledRedraw: null,

    renderVars: ['barThickness', 'yScale', 'colorRange', 'xValueDisplayName', 'yValueDisplayName', 'hasAxisTitles', 'hasXAxisTitle', 'hasYAxisTitle', 'xTitleHorizontalOffset', 'yTitleVerticalOffset', 'xTitleVerticalOffset', 'maxLabelWidth'],

    drawChart: function drawChart() {
      this.updateData();
      this.updateAxes();
      this.updateGraphic();
      this.updateAxisTitles();
    },

    updateData: function updateData() {
      var groups = this.get('groups');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      var entering = groups.enter().append('g').attr('class', 'bar').on('mouseover', function (d, i) {
        return showDetails(d, i, this);
      }).on('mouseout', function (d, i) {
        return hideDetails(d, i, this);
      });
      entering.append('rect');
      entering.append('text').attr('class', 'value');
      entering.append('text').attr('class', 'group');

      return groups.exit().remove();
    },

    updateAxes: function updateAxes() {
      return this.get('yAxis').attr(this.get('axisAttrs'));
    },

    /**
     * Given the list of elements for the group labels and value labels,
     * determine the width of the largest label on either side of the chart.
     * @private
     * @param {Array.<SVGTextElement>} groupLabelElements The text elements
     *  representing the group labels for the chart
     * @param {Array.<SVGTextElement>} valueLabelElements The text elements
     *  representing the value labels for the chart
     * @return {Object.<String, Number>}
     */
    _computeLabelWidths: function _computeLabelWidths(groupLabelElements, valueLabelElements) {
      var maxValueLabelWidth = this._maxWidthOfElements(valueLabelElements);
      var maxGroupLabelWidth = this._maxWidthOfElements(groupLabelElements);
      var maxLabelWidth = this.get('maxLabelWidth');

      // If all values are positive, the grouping labels are on the left and the
      // value labels are on the right
      if (this.get('hasAllPositiveValues')) {
        return {
          left: d3.min([maxGroupLabelWidth, maxLabelWidth]),
          right: maxValueLabelWidth
        };
        // If all values are negative, the value labels are on the left and the
        // grouping labels are on the right
      } else if (this.get('hasAllNegativeValues')) {
          return {
            left: maxValueLabelWidth,
            right: d3.min([maxGroupLabelWidth, maxLabelWidth])
          };
        } else {
          return this._computeMixedLabelWidths(groupLabelElements, valueLabelElements);
        }
    },

    /*
     * Determine the label widths on either side of a chart which contains a mix of positive
     * and negative values
     * @private
     * @param {Array.<SVGTextElement>} groupLabelElements The text elements
     *  representing the group labels for the chart
     * @param {Array.<SVGTextElement>} valueLabelElements The text elements
     *  representing the value labels for the chart
     * @return {Object.<String, Number>}
     */
    _computeMixedLabelWidths: function _computeMixedLabelWidths(groupLabelElements, valueLabelElements) {
      var _this7 = this;

      var minValue = this.get('minValue');
      var maxValue = this.get('maxValue');
      var maxLabelWidth = this.get('maxLabelWidth');

      // The grouping labels for positive values appear on the left side of the chart axis, and
      // vice-versa for negative values and right labels
      var leftGroupingLabels = this.get('positiveValues').map(function (val) {
        return _this7._getElementForValue(groupLabelElements, val);
      });
      var rightGroupingLabels = this.get('negativeValues').map(function (val) {
        return _this7._getElementForValue(groupLabelElements, val);
      });
      var maxLeftGroupingLabelWidth = d3.min([maxLabelWidth, this._maxWidthOfElements(leftGroupingLabels)]);
      var maxRightGroupingLabelWidth = d3.min([maxLabelWidth, this._maxWidthOfElements(rightGroupingLabels)]);

      // The value label that is furthest to the left is the one representing the minimum
      // value in the chart, and vice-versa for the right side and maximum value
      var leftMostValueLabelWidth = this._getElementWidthForValue(valueLabelElements, minValue);
      var rightMostValueLabelWidth = this._getElementWidthForValue(valueLabelElements, maxValue);

      var padding = 2 * this.get('labelPadding') + this.get('yAxisTitleHeightOffset');
      var outerWidth = this.get('outerWidth');
      var width = outerWidth - leftMostValueLabelWidth - rightMostValueLabelWidth - padding;
      var xScale = this._xScaleForWidth(width);

      var maxNegativeBarWidth = this._computeBarWidth(minValue, xScale);
      var maxPositiveBarWidth = this._computeBarWidth(maxValue, xScale);

      var leftWidth, rightWidth;
      // If the sum of the widths of the longest bar in a direction and its value label is larger
      // than the longest grouping label on the same side of the chart, then the relevant width on
      // that side is the width of the value label
      if (maxNegativeBarWidth + leftMostValueLabelWidth > maxLeftGroupingLabelWidth) {
        leftWidth = leftMostValueLabelWidth;
        // In the case where the left grouping label is wider than the sum of the largest left bar
        // and its value label, the goal is to find the distance between the left edge of the chart
        // and the end of the left bar.
      } else {
          // We can no longer use `maxNegativeBarWidth` from above, because it was computed with the
          // assumption that the value labels made up the outer margins of the chart, which is not
          // true in this case.
          // The amount of space to the left of the axis is fixed at the width of the grouping label.
          // The amount of space to the right of most positive bar is fixed at the width of the
          // value label for that bar. Knowing this, we can compute the width of the positive bar.
          var realPositiveBarWidth = outerWidth - maxLeftGroupingLabelWidth - rightMostValueLabelWidth - padding;
          // From the positive bar width, we can compute the negative bar width
          var realNegativeBarWidth = this._getMostNegativeBarWidth(realPositiveBarWidth);
          leftWidth = maxLeftGroupingLabelWidth - realNegativeBarWidth;
        }

      // This is the inverse of the logic above used for leftWidth
      if (maxPositiveBarWidth + rightMostValueLabelWidth > maxRightGroupingLabelWidth) {
        rightWidth = rightMostValueLabelWidth;
      } else {
        var realNegativeBarWidth = outerWidth - maxRightGroupingLabelWidth - leftMostValueLabelWidth - padding;
        var realPositiveBarWidth = this._getMostPositiveBarWidth(realNegativeBarWidth);
        rightWidth = maxRightGroupingLabelWidth - realPositiveBarWidth;
      }

      return {
        left: leftWidth,
        right: rightWidth
      };
    },

    /*
     * Compute the width of a bar in the chart, given its value and a scaling function
     * @see _xScaleForWidth
     * @private
     * @param {Number} value The value to compute the bar width for
     * @param {Function} scaleFunction The function that scales values to the width of the chart
     * @return {Number}
     */
    _computeBarWidth: function _computeBarWidth(value, scaleFunction) {
      return Math.abs(scaleFunction(value) - scaleFunction(0));
    },

    /*
     * For charts with a mix of positive and negative values, given the width of
     * the most positive bar, get the width of the most negative bar. The ratio
     * of the widths of the two bars is the same as the ratio between the min and
     * max values
     * @private
     * @param {Number} mostPositiveBarWidth
     * @return {Number}
     */
    _getMostNegativeBarWidth: function _getMostNegativeBarWidth(mostPositiveBarWidth) {
      var max = this.get('maxValue');
      var min = Math.abs(this.get('minValue'));
      return mostPositiveBarWidth * (min / max);
    },

    /*
     * For charts with a mix of positive and negative values, given the width of
     * the most negative bar, get the width of the most positive bar. The ratio
     * of the widths of the two bars is the same as the ratio between the max and
     * min values
     * @private
     * @param {Number} mostNegativeBarWidth
     * @return {Number}
     */
    _getMostPositiveBarWidth: function _getMostPositiveBarWidth(mostNegativeBarWidth) {
      var max = this.get('maxValue');
      var min = Math.abs(this.get('minValue'));
      return mostNegativeBarWidth * (max / min);
    },

    /**
     * Given an array of elements and a value, return the element in the array
     * at the same index as the value is in the list of all values
     * @private
     * @param {Array.<HTMLElement>} elements The elements to search in
     * @param {Number} value The value to search for
     * @return {HTMLElement}
     */
    _getElementForValue: function _getElementForValue(elements, value) {
      var index = this.get('allFinishedDataValues').indexOf(value);
      return elements[index];
    },

    /**
     * Given an array of SVG elements and a value, return the width of the element in the array
     * at the same index as the value is in the list of all values
     * @private
     * @param {Array.<SVGElement>} elements The elements to search in
     * @param {Number} value The value to search for
     * @return {Number}
     */
    _getElementWidthForValue: function _getElementWidthForValue(elements, value) {
      return this._getElementForValue(elements, value).getComputedTextLength();
    },

    /**
     * Given an array of SVG elements, return the largest computed length
     * @private
     * @param {Array.<SVGElement>} elements The array of elements
     * @return {Number}
     */
    _maxWidthOfElements: function _maxWidthOfElements(elements) {
      return d3.max(_.map(elements, function (element) {
        return element.getComputedTextLength();
      }));
    },

    updateGraphic: function updateGraphic() {
      var _this8 = this;

      var groups = this.get('groups').attr(this.get('groupAttrs'));

      groups.select('text.group').text(function (d) {
        return d.label;
      }).attr(this.get('groupLabelAttrs'));

      groups.select('rect').attr(this.get('barAttrs'));

      groups.select('text.value').text(function (d) {
        return _this8.get('formatLabelFunction')(d.value);
      }).attr(this.get('valueLabelAttrs'));

      var valueLabelElements = groups.select('text.value')[0];
      var groupLabelElements = groups.select('text.group')[0];
      var labelWidths = this._computeLabelWidths(groupLabelElements, valueLabelElements);
      // labelWidth is used for computations around the left margin, so set it
      // to the width of the left label
      this.set('labelWidth', labelWidths.left);

      // Add a few extra pixels of padding to ensure that labels don't clip off
      // the edge of the chart.  If the chart can be scrolled around we need a
      // little extra padding to deal with the scrollbars.
      var labelPadding = this.get('labelPadding');
      var axisTitleOffset = this.get('yAxisTitleHeightOffset');

      this.setProperties({
        horizontalMarginLeft: labelWidths.left + labelPadding + axisTitleOffset,
        horizontalMarginRight: labelWidths.right + labelPadding + (this.get('isInteractive') ? 15 : 0)
      });

      var maxLabelWidth = this.get('maxLabelWidth');
      if (!_Ember['default'].isNone(maxLabelWidth)) {
        var labelTrimmer = _LabelTrimmer['default'].create({
          getLabelSize: function getLabelSize() {
            return maxLabelWidth;
          },
          getLabelText: function getLabelText(d) {
            return d.label;
          }
        });

        groups.select('text.group').call(labelTrimmer.get('trim'));
      }
    }
  });

  module.exports = HorizontalBarChartComponent;
});
define('ember-charts/components/pie-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/formattable', '../mixins/floating-tooltip', '../mixins/sortable-chart', '../mixins/pie-legend', '../mixins/label-width', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsFormattable, _mixinsFloatingTooltip, _mixinsSortableChart, _mixinsPieLegend, _mixinsLabelWidth, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _SortableChartMixin = _interopRequireDefault(_mixinsSortableChart);

  var _PieLegendMixin = _interopRequireDefault(_mixinsPieLegend);

  var _LabelWidthMixin = _interopRequireDefault(_mixinsLabelWidth);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  var PieChartComponent = _ChartComponent['default'].extend(_FloatingTooltipMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], _PieLegendMixin['default'], _LabelWidthMixin['default'], {

    classNames: ['chart-pie'],
    // ----------------------------------------------------------------------------
    // Pie Chart Options
    // ----------------------------------------------------------------------------

    // The smallest slices will be combined into an "Other" slice until no slice is
    // smaller than minSlicePercent. "Other" is also guaranteed to be larger than
    // minSlicePercent.
    minSlicePercent: 5,

    // The maximum number of slices. If the number of slices is greater
    // than this then the smallest slices will be combined into an "other"
    // slice until there are at most maxNumberOfSlices.
    maxNumberOfSlices: 8,

    // Essentially we don't want a maximum pieRadius
    maxRadius: 2000,

    // top and bottom margin will never be smaller than this
    // you can use this to ensure that your labels don't get pushed off
    // the top / bottom when your labels are large or the chart is very small
    minimumTopBottomMargin: 0,

    // Allows the user to configure maximum number of decimal places in data labels
    maxDecimalPlace: 0,

    // When the Pie Chart has a high probability of having label intersections in
    // its default form, rotate the Pie by this amount so that the smallest slices
    // will start from the 2 o'clock to 4 o'clock positions.
    rotationOffset: 1 / 4 * Math.PI,

    // Allows the user to configure whether Rounded Zero Percent Slices should be
    // included inside of the Pie Chart. For example, if maxDecimalPlace = 0 and
    // there was a slice of 0.3%, that slice would be rounded down to 0%
    includeRoundedZeroPercentSlices: true,

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    // Data with invalid/negative values removed
    filteredData: _Ember['default'].computed('data.[]', function () {
      var data;
      data = this.get('data');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }
      return data.filter(function (child) {
        return child.value >= 0;
      });
    }),

    // Negative values that have been discarded from the data
    rejectedData: _Ember['default'].computed('data.[]', function () {
      var data;
      data = this.get('data');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }
      return data.filter(function (child) {
        return child.value < 0;
      });
    }),

    // Valid data points that have been sorted by selectedSortType
    sortedData: _Ember['default'].computed('filteredData', 'sortKey', function () {
      var data = this.get('filteredData');
      var total = data.reduce(function (p, child) {
        return child.value + p;
      }, 0);
      if (total === 0) {
        return [];
      }

      data = data.map(function (d) {
        return {
          color: d.color,
          label: d.label,
          value: d.value,
          percent: 100.0 * d.value / total
        };
      });

      return _.sortBy(data, this.get('sortKey'));
    }),

    // This takes the sorted slices that have percents calculated and returns
    // sorted slices that obey the "other" slice aggregation rules
    //
    // When Other is the largest slice, Other is last and the data is sorted in order
    // When Other is not the largest slice, Other is the first and the data after it is sorted in order
    sortedDataWithOther: _Ember['default'].computed('sortedData', 'maxNumberOfSlices', 'minSlicePercent', 'maxDecimalPlace', 'includeRoundedZeroPercentSlices', function () {
      var lastItem, overflowSlices, slicesLeft;

      var data = _.cloneDeep(this.get('sortedData')).reverse();
      var maxNumberOfSlices = this.get('maxNumberOfSlices');
      var minSlicePercent = this.get('minSlicePercent');
      var otherItems = [];
      var otherSlice = {
        label: 'Other',
        percent: 0.0,
        _otherItems: otherItems
      };

      // First make an other slice out of any slices below percent threshold
      // Find the first slice below
      var lowPercentIndex = _.indexOf(data, _.find(data, function (d) {
        return d.percent < minSlicePercent;
      }));

      // Guard against not finding any slices below the threshold
      if (lowPercentIndex < 0) {
        lowPercentIndex = data.length;
      } else {
        // Add low percent slices to other slice
        _.takeRight(data, data.length - lowPercentIndex).forEach(function (d) {
          otherItems.push(d);
          return otherSlice.percent += d.percent;
        });

        // Ensure Other slice is larger than minSlicePercent
        if (otherSlice.percent < minSlicePercent) {
          lastItem = data[lowPercentIndex - 1];
          if (lastItem.percent < minSlicePercent) {
            lowPercentIndex -= 1;
            otherItems.push(lastItem);
            otherSlice.percent += lastItem.percent;
          }
        }
      }

      // Reduce max number of slices that we can have if we now have an other slice
      if (otherSlice.percent > 0) {
        maxNumberOfSlices -= 1;
      }

      // Next, continue putting slices in other slice if there are too many
      // take instead of first see https://lodash.com/docs#take
      // drop instead of rest
      slicesLeft = _.take(data, lowPercentIndex);

      overflowSlices = _.drop(slicesLeft, maxNumberOfSlices);

      if (overflowSlices.length > 0) {
        overflowSlices.forEach(function (d) {
          otherItems.push(d);
          return otherSlice.percent += d.percent;
        });
        slicesLeft = _.take(slicesLeft, maxNumberOfSlices);
      }

      // Only push other slice if there is more than one other item
      if (otherItems.length === 1) {
        slicesLeft.push(otherItems[0]);
      } else if (otherSlice.percent > 0) {
        // When Other is the largest slice, add to the front of the list. Otherwise to the back
        //
        // Ensures that excessively large "Other" slices will be accounted during pie chart rotation.
        // This will prevent labels from intersecting when "Other" is extremely large
        if (otherSlice.percent > slicesLeft[0].percent) {
          slicesLeft.unshift(otherSlice);
        } else {
          slicesLeft.push(otherSlice);
        }
      }

      // Round all slices to the appropriate decimal place
      var maxDecimalPlace = this.get('maxDecimalPlace');
      var roundSlices = function roundSlices(sliceList) {
        sliceList.forEach(function (slice) {
          slice.percent = d3.round(1.0 * slice.percent, maxDecimalPlace);
        });
      };

      roundSlices(slicesLeft);
      roundSlices(otherItems);

      // Filter zero percent slices out of the pie chart after they have been rounded
      var filterRoundedZeroPercentSlices = function filterRoundedZeroPercentSlices(sliceList) {
        return sliceList.filter(function (slice) {
          return slice.percent !== 0;
        });
      };

      if (this.get('includeRoundedZeroPercentSlices') === false) {
        slicesLeft = filterRoundedZeroPercentSlices(slicesLeft);
      }

      return slicesLeft.reverse();
    }),

    otherData: _Ember['default'].computed('sortedDataWithOther.[]', 'sortFunction', function () {
      var otherSlice = _.find(this.get('sortedDataWithOther'), function (d) {
        return d._otherItems;
      });

      var otherItems;
      if (otherSlice != null && otherSlice._otherItems != null) {
        otherItems = otherSlice._otherItems;
      } else {
        otherItems = [];
      }

      return _.sortBy(otherItems, this.get('sortFunction')).reverse();
    }),

    otherDataValue: _Ember['default'].computed('otherData.[]', function () {
      var otherItems, value;
      value = 0;
      otherItems = this.get('otherData');
      if (otherItems != null) {
        _.each(otherItems, function (item) {
          return value += item.value;
        });
      }
      return value;
    }),

    finishedData: _Ember['default'].computed.alias('sortedDataWithOther'),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // TODO(tony): This should probably be merged with the API for controlling
    // a legend in general, very similar to that code

    // For the pie chart, horizontalMargin and verticalMargin are used to center
    // the graphic in the middle of the viewport
    horizontalMargin: _Ember['default'].computed('labelPadding', 'labelWidth', function () {
      return this.get('labelPadding') + this.get('labelWidth');
    }),

    // Bottom margin is equal to the total amount of space the legend needs,
    // or 10% of the viewport if there is no legend
    _marginBottom: _Ember['default'].computed('legendHeight', 'hasLegend', 'marginTop', function () {
      return this.get('hasLegend') ? this.get('legendHeight') : this.get('marginTop');
    }),

    marginBottom: _Ember['default'].computed('_marginBottom', 'minimumTopBottomMargin', function () {
      return Math.max(this.get('_marginBottom'), this.get('minimumTopBottomMargin'));
    }),

    _marginTop: _Ember['default'].computed('outerHeight', function () {
      return Math.max(1, this.get('outerHeight') * 0.1);
    }),

    marginTop: _Ember['default'].computed('_marginTop', 'minimumTopBottomMargin', function () {
      return Math.max(this.get('_marginTop'), this.get('minimumTopBottomMargin'));
    }),

    // ----------------------------------------------------------------------------
    // Graphics Properties
    // ----------------------------------------------------------------------------

    numSlices: _Ember['default'].computed.alias('finishedData.length'),

    // Normally, the pie chart should offset slices so that the largest slice
    // finishes at 12 o'clock
    //
    // However, always setting the largest slice at 12 o'clock can cause significant
    // difficulty while dealing with label intersections. This problem is exacerbated
    // when certain configurations of pie charts lead to a high density of
    // small slice labels at the 6 o'clock or 11:30 positions.
    //
    // Therefore, rotate the pie and concentrate all small slices at 8 to 10 o'clock
    // if there is a high density of small slices inside the pie. This will ensure
    // that there is plenty of space for labels
    startOffset: _Ember['default'].computed('finishedData', 'sortKey', 'rotationOffset', function () {
      var detectDenseSmallSlices = function detectDenseSmallSlices(finishedData) {
        // This constant determines how many slices to use to calculate the
        // average small slice percentage. The smaller the constant, the more it
        // focuses on the smallest slices within the pie.
        //
        // Empirically, using a sample size of 2 works very well.
        var smallSliceSampleSize = 2;

        var sortedData = _.sortBy(finishedData, "percent");
        var startIndex = 0;
        var endIndex = Math.min(smallSliceSampleSize, sortedData.length);
        var largestSlicePercent = _.last(sortedData).percent;

        var averageSmallSlicesPercent = sortedData.slice(startIndex, endIndex).reduce(function (p, d) {
          return d.percent / (endIndex - startIndex) + p;
        }, 0);

        // When slices smaller than 2.75 percent are concentrated in any location,
        // there is a high probability of label intersections.
        //
        // However, empirical label intersect evidence has demonstrated that this
        // threshold must be increased to 5% when there are multiple small slices
        // from the 5 o'clock to 7 o'clock positions
        if (averageSmallSlicesPercent <= 2.75) {
          return true;
        } else if (averageSmallSlicesPercent <= 5 && 45 <= largestSlicePercent && largestSlicePercent <= 55) {
          return true;
        }
        return false;
      };

      var finishedData = this.get('finishedData');
      if (_Ember['default'].isEmpty(finishedData)) {
        return 0;
      }

      // The sum is not necessarily 100% all of the time because of rounding
      //
      // For example, consider finishedData percentages (1.3%, 1.3%, 1.4%, 96%).
      // They will round to (1%, 1%, 1%, and 96%) when maxDecimalPlace = 0 by
      // default, which then sums to 99%.
      var sum = finishedData.reduce(function (p, d) {
        return d.percent + p;
      }, 0);

      if (detectDenseSmallSlices(finishedData)) {
        return this.get('rotationOffset');
      } else {
        return _.last(finishedData).percent / sum * 2 * Math.PI;
      }
    }),

    // Radius of the pie graphic, resized to fit the viewport.
    pieRadius: _Ember['default'].computed('maxRadius', 'width', 'height', function () {
      return d3.min([this.get('maxRadius'), this.get('width') / 2, this.get('height') / 2]);
    }),

    // Radius at which labels will be positioned
    labelRadius: _Ember['default'].computed('pieRadius', 'labelPadding', function () {
      return this.get('pieRadius') + this.get('labelPadding');
    }),

    // ----------------------------------------------------------------------------
    // Color Configuration
    // ----------------------------------------------------------------------------

    getSliceColor: _Ember['default'].computed('numSlices', 'colorScale', function () {
      var _this = this;

      return function (d, i) {
        var index, numSlices;
        if (d.data && d.data.color) {
          return d.data.color;
        }
        numSlices = _this.get('numSlices');
        index = numSlices - i - 1;
        if (numSlices !== 1) {
          index = index / (numSlices - 1);
        }
        return _this.get('colorScale')(index);
      };
    }),

    // ----------------------------------------------------------------------------
    // Legend Configuration
    // ----------------------------------------------------------------------------

    legendItems: _Ember['default'].computed('otherData', 'rejectedData', function () {
      return this.get('otherData').concat(this.get('rejectedData'));
    }),

    hasLegend: _Ember['default'].computed('legendItems.length', 'showLegend', function () {
      return this.get('legendItems.length') > 0 && this.get('showLegend');
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this2 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }
      return function (d, i, element) {
        var content, data, formatLabelFunction, value;
        d3.select(element).classed('hovered', true);
        data = d.data;
        if (data._otherItems) {
          value = _this2.get('otherDataValue');
        } else {
          value = data.value;
        }
        formatLabelFunction = _this2.get('formatLabelFunction');

        content = $('<span>');
        content.append($('<span class="tip-label">').text(data.label));
        content.append($('<span class="name">').text(_this2.get('tooltipValueDisplayName') + ': '));
        content.append($('<span class="value">').text(formatLabelFunction(value)));
        return _this2.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this3 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (d, i, element) {
        d3.select(element).classed('hovered', false);
        var data = d.data;
        if (data._otherItems) {
          return _this3.get('viewport').select('.legend').classed('hovered', false);
        } else {
          return _this3.hideTooltip();
        }
      };
    }),

    // ----------------------------------------------------------------------------
    // Styles/Layout Functions
    // ----------------------------------------------------------------------------

    // SVG transform to center pie in the viewport
    transformViewport: _Ember['default'].computed('marginLeft', 'marginTop', 'width', 'height', function () {
      var cx = this.get('marginLeft') + this.get('width') / 2;
      var cy = this.get('marginTop') + this.get('height') / 2;
      return "translate(" + cx + "," + cy + ")";
    }),

    // Arc drawing function for pie with specified pieRadius
    arc: _Ember['default'].computed('pieRadius', function () {
      return d3.svg.arc().outerRadius(this.get('pieRadius')).innerRadius(0);
    }),

    // Pie layout function starting with the largest slice at zero degrees or
    // 12 oclock. Since the data is already sorted, this goes largest to smallest
    // counter clockwise
    pie: _Ember['default'].computed('startOffset', function () {
      return d3.layout.pie().startAngle(this.get('startOffset')).endAngle(this.get('startOffset') + Math.PI * 2).sort(null).value(function (d) {
        return d.percent;
      });
    }),

    groupAttrs: _Ember['default'].computed(function () {
      return {
        'class': function _class(d) {
          return d.data._otherItems ? 'arc other-slice' : 'arc';
        }
      };
    }),

    sliceAttrs: _Ember['default'].computed('arc', 'getSliceColor', function () {
      return {
        d: this.get('arc'),
        fill: this.get('getSliceColor'),
        stroke: this.get('getSliceColor')
      };
    }),

    labelAttrs: _Ember['default'].computed('arc', 'labelRadius', 'numSlices', 'mostTintedColor', function () {
      var mostTintedColor;
      var arc = this.get('arc');
      var labelRadius = this.get('labelRadius');
      // these are the label regions that are already filled
      var usedLabelPositions = {
        left: [],
        right: []
      };
      // assumes height of all the labels are the same
      var labelOverlap = function labelOverlap(side, ypos, height) {
        var positions = usedLabelPositions[side];
        return _.some(positions, function (pos) {
          return Math.abs(ypos - pos) < height;
        });
      };
      if (this.get('numSlices') > 1) {
        return {
          dy: '.35em',
          // Clear any special label styling that may have been set when only
          // displaying one data point on the chart
          style: null,
          'stroke-width': 0,
          // Anchor the text depending on whether the label is on the left or
          // right side of the pie, note that because of the angle offset we do
          // for the first pie slice we need to pay attention to the angle being
          // greater than 2*Math.PI
          'text-anchor': function textAnchor(d) {
            var angle = ((d.endAngle - d.startAngle) * 0.5 + d.startAngle) % (2 * Math.PI);
            return Math.PI < angle && angle < 2 * Math.PI ? 'end' : 'start';
          },

          // Position labels just outside of arc center outside of pie, making sure
          // not to create any two labels too close to each other. Since labels are
          // placed sequentially, we check the height where the last label was
          // placed,and if the new label overlaps the last, move the new label one
          // label's height away
          transform: function transform(d) {
            var x = arc.centroid(d)[0];
            var y = arc.centroid(d)[1];

            var f = function f(d) {
              return d / Math.sqrt(x * x + y * y) * labelRadius;
            };
            var labelXPos = f(x);
            var labelYPos = f(y);
            var labelHeight = this.getBBox().height;
            var side = labelXPos > 0 ? 'right' : 'left';

            // When labelYPos is adjusted to prevent label overlapping, this function
            // interpolates the updated labelXPos using the Pythagorean Theorem
            // so that the new label position will be realigned with the pie surface.
            //
            // This is extremely important. Only updating the labelYPos without
            // updating the corresponding labelXPos could accidentally place the label
            // in such a way that intersects with the pie itself!
            //
            // Note - There is an edge case for 12 o'clock and 6 o'clock
            // label overlaps when the updated labelYPos becomes larger than the
            // labelRadius. In this case, we set the labelXPos to 0 instead of
            // letting it be negative (which would incorrectly place the label
            // on the opposite side of the pie).
            var calculateXPos = function calculateXPos(labelYPos) {
              return Math.sqrt(Math.max(Math.pow(labelRadius, 2) - Math.pow(labelYPos, 2), 0));
            };

            if (labelOverlap(side, labelYPos, labelHeight)) {
              if (side === 'right') {
                labelYPos = _.max(usedLabelPositions[side]) + labelHeight;
                labelXPos = calculateXPos(labelYPos);
              } else {
                labelYPos = _.min(usedLabelPositions[side]) - labelHeight;
                labelXPos = -1 * calculateXPos(labelYPos);
              }
            }
            usedLabelPositions[side].push(labelYPos);
            return "translate(" + labelXPos + "," + labelYPos + ")";
          }
        };
      } else {
        // When there is only one label, position it in the middle of the chart.
        // This resolves a bug where rendering a chart with a single label multiple
        // times may cause the label to jitter, since lastXPos and lastYPos retain
        // their values from the last layout of the chart.
        mostTintedColor = this.get('mostTintedColor');
        return {
          dy: '.71em',
          'stroke-width': 0,
          'text-anchor': 'middle',
          transform: null,
          style: "fill:" + mostTintedColor + ";"
        };
      }
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    groups: _Ember['default'].computed(function () {
      var data = this.get('pie')(this.get('finishedData'));
      return this.get('viewport').selectAll('.arc').data(data);
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    renderVars: ['pieRadius', 'labelWidth', 'finishedData', 'startOffset'],

    drawChart: function drawChart() {
      this.updateData();
      this.updateGraphic();
      if (this.get('hasLegend')) {
        return this.drawLegend();
      } else {
        return this.clearLegend();
      }
    },

    updateData: function updateData() {
      var entering, groups, hideDetails, showDetails;
      groups = this.get('groups');
      showDetails = this.get('showDetails');
      hideDetails = this.get('hideDetails');
      entering = groups.enter().append('g').attr({
        "class": 'arc'
      }).on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      entering.append('path').attr('class', 'slice');
      entering.append('text').attr('class', 'data');
      return groups.exit().remove();
    },

    updateGraphic: function updateGraphic() {
      var groups = this.get('groups').attr(this.get('groupAttrs'));
      groups.select('path').attr(this.get('sliceAttrs'));

      var maxLabelWidth = this.get('outerWidth') / 2 - this.get('labelPadding');
      var labelTrimmer = _LabelTrimmer['default'].create({
        // override from LabelTrimmer
        reservedCharLength: 4,
        getLabelSize: function getLabelSize(d, selection) {
          // To calculate the label size, we need to identify the horizontal position `xPos` of the current label from the center.
          // Subtracting `xPos` from `maxLabelWidth` will provide the maximum space available for the label.

          // First select the text element from `selection` that is being currently trimmed.
          var text = selection.filter(function (data) {
            return data === d;
          });
          // Then calculate horizontal translation (0,0 is at the center of the pie) of the text element by:
          // a) Read the current transform of the element via text.attr("transform"). The transform has been applied by `this.get('labelAttrs')`.
          // b) parse the transform string to return instance of d3.transform()
          // c) from transform object, read translate[0] property for horizontal translation
          var xPos = d3.transform(text.attr("transform")).translate[0];
          return maxLabelWidth - Math.abs(xPos);
        },
        getLabelText: function getLabelText(d) {
          return d.data.label;
        }
      });

      return groups.select('text.data').text(function (d) {
        return d.data.label;
      }).attr(this.get('labelAttrs')).call(labelTrimmer.get('trim')).text(function (d) {
        return "" + this.textContent + ", " + d.data.percent + "%";
      });
    }
  });

  module.exports = PieChartComponent;
});
define('ember-charts/components/scatter-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/floating-tooltip', '../mixins/axes', '../mixins/no-margin-chart', '../mixins/axis-titles', '../utils/group-by'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsFloatingTooltip, _mixinsAxes, _mixinsNoMarginChart, _mixinsAxisTitles, _utilsGroupBy) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _LegendMixin = _interopRequireDefault(_mixinsLegend);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _AxesMixin = _interopRequireDefault(_mixinsAxes);

  var _NoMarginChartMixin = _interopRequireDefault(_mixinsNoMarginChart);

  var _AxisTitlesMixin = _interopRequireDefault(_mixinsAxisTitles);

  var ScatterChartComponent = _ChartComponent['default'].extend(_LegendMixin['default'], _FloatingTooltipMixin['default'], _AxesMixin['default'], _NoMarginChartMixin['default'], _AxisTitlesMixin['default'], {

    classNames: ['chart-scatter'],

    // ----------------------------------------------------------------------------
    // Scatter Plot Options
    // ----------------------------------------------------------------------------

    // Getters for formatting human-readable labels from provided data
    formatXValue: d3.format(',.2f'),
    formatYValue: d3.format(',.2f'),

    // Size of each icon on the scatter plot
    dotRadius: 7,

    dotShapeArea: _Ember['default'].computed('dotRadius', function () {
      return Math.pow(this.get('dotRadius'), 2);
    }),

    // Amount to pad the extent of input data so that all displayed points fit
    // neatly within the viewport, as a proportion of the x- and y-range
    graphPadding: 0.05,

    // Increase the amount of space between ticks for scatter, basically if we are
    // too aggressive with the tick spacing 1) labels are more likely to be
    // squished together and 2) it is hard for the "nice"ing of the ticks, i.e.,
    // trying to end on actual tick intervals. It would be good to force ticks to
    // end where we want them, but reading the d3.js literature it was not clear
    // how to easily do that.
    tickSpacing: 80,

    // NoMarginChartMixin makes right margin 0 but we need that room because the
    // last label of the axis is commonly too large
    marginRight: _Ember['default'].computed.alias('horizontalMargin'),

    /**
     * A flag to indicate if the chart view should have left & right margin based
     * on maximum & minimum X values. If this is set to false, the left & right
     * sides of the chart will not have extra padding column.
     * @type {Boolean}
    **/
    hasXDomainPadding: true,

    /**
     * A flag to indicate if the chart view should have top & bottom margin based
     * on maximum & minimum Y values. If this is set to false, the top & bottom
     * sides of the chart will not have extra padding column.
     * @type {Boolean}
    **/
    hasYDomainPadding: true,

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    isShowingTotal: false,
    totalPointData: null,

    // Data with invalid/negative values removed
    filteredData: _Ember['default'].computed('data.@each', function () {
      var data;
      data = this.get('data');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }
      return data.filter(function (d) {
        return d.xValue != null && d.yValue != null && isFinite(d.xValue) && isFinite(d.yValue);
      });
    }),

    // Aggregate the raw data by group, into separate lists of data points
    groupedData: _Ember['default'].computed('filteredData.@each', function () {
      var _this = this;

      var data = this.get('filteredData');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }

      var groupedData = (0, _utilsGroupBy.groupBy)(data, function (d) {
        return d.group || _this.get('ungroupedSeriesName');
      });

      this.set('groupNames', _.keys(groupedData));
      return _.values(groupedData);
    }),

    groupNames: [],

    numGroups: _Ember['default'].computed.alias('groupedData.length'),

    isGrouped: _Ember['default'].computed('numGroups', function () {
      return this.get('numGroups') > 1;
    }),

    finishedData: _Ember['default'].computed.alias('groupedData'),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // Chart Graphic Dimensions
    graphicTop: _Ember['default'].computed.alias('axisTitleHeight'),
    graphicLeft: _Ember['default'].computed.alias('labelWidthOffset'),

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', function () {
      var legendSize = this.get('legendHeight') + this.get('legendChartPadding') + (this.get('marginBottom') || 0);
      return this.get('height') - legendSize;
    }),

    graphicWidth: _Ember['default'].computed('width', 'labelWidthOffset', function () {
      return this.get('width') - this.get('labelWidthOffset');
    }),

    // ----------------------------------------------------------------------------
    // Ticks and Scales
    // ----------------------------------------------------------------------------

    xDomain: _Ember['default'].computed('filteredData.@each', 'isShowingTotal', 'totalPointData', function () {
      var totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
      var _ref = d3.extent(totalData.concat(this.get('filteredData')), function (d) {
        return d.xValue;
      });
      var xMin = _ref[0];
      var xMax = _ref[1];
      if (xMin === xMax && xMax === 0) {
        return [-1, 1];
      } else if (xMin === xMax) {
        return [xMin * (1 - this.get('graphPadding')), xMin * (1 + this.get('graphPadding'))];
      } else {
        return [xMin, xMax];
      }
    }),

    yDomain: _Ember['default'].computed('filteredData.@each', 'isShowingTotal', 'totalPointData', 'graphPadding', function () {
      var totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
      var _ref = d3.extent(totalData.concat(this.get('filteredData')), function (d) {
        return d.yValue;
      });
      var yMin = _ref[0];
      var yMax = _ref[1];

      if (yMin === yMax && yMax === 0) {
        return [-1, 1];
      } else if (yMin === yMax) {
        return [yMin * (1 - this.get('graphPadding')), yMin * (1 + this.get('graphPadding'))];
      } else {
        return [yMin, yMax];
      }
    }),

    // The X axis scale spans the range of Y values plus any graphPadding
    xScale: _Ember['default'].computed('xDomain', 'graphPadding', 'graphicLeft', 'graphicWidth', 'numXTicks', function () {
      var xDomain = this.get('xDomain');
      var graphicLeft = this.get('graphicLeft');
      var graphicWidth = this.get('graphicWidth');
      var padding = 0;
      if (this.get('hasXDomainPadding')) {
        padding = (xDomain[1] - xDomain[0]) * this.get('graphPadding');
      }

      return d3.scale.linear().domain([xDomain[0] - padding, xDomain[1] + padding]).range([graphicLeft, graphicLeft + graphicWidth]).nice(this.get('numXTicks'));
    }),

    // The Y axis scale spans the range of Y values plus any graphPadding
    yScale: _Ember['default'].computed('yDomain', 'graphPadding', 'graphicTop', 'graphicHeight', 'numYTicks', function () {
      var yDomain = this.get('yDomain');
      var graphicTop = this.get('graphicTop');
      var graphicHeight = this.get('graphicHeight');
      var padding = 0;
      if (this.get('hasYDomainPadding')) {
        padding = (yDomain[1] - yDomain[0]) * this.get('graphPadding');
      }

      return d3.scale.linear().domain([yDomain[0] - padding, yDomain[1] + padding]).range([graphicTop + graphicHeight, graphicTop]).nice(this.get('numYTicks'));
    }),

    // ----------------------------------------------------------------------------
    // Graphics Properties
    // ----------------------------------------------------------------------------

    // Scatterplots handle different groups by varying shape of dot first and then
    // vary color or tint of seed color.
    groupShapes: _Ember['default'].computed(function () {
      return ['circle', 'square', 'triangle-up', 'cross', 'diamond'];
    }),

    numGroupShapes: _Ember['default'].computed.alias('groupShapes.length'),

    // Fixed number of colors for scatter plots, total different dot types is
    // numGroupsShapes * numGroupColors
    numGroupColors: 2,

    maxNumGroups: _Ember['default'].computed('numGroupColors', 'numGroupShapes', function () {
      return this.get('numGroupColors') * this.get('numGroupShapes');
    }),

    // Only display a different icon for each group if the number of groups is less
    // than or equal to the maximum number of groups
    displayGroups: _Ember['default'].computed('isGrouped', 'numGroups', 'numGroupShapes', function () {
      return this.get('isGrouped') && this.get('numGroups') <= this.get('maxNumGroups');
    }),

    // Since we are only provided with the index of each dot within its <g>, we
    // decide the shape and color of the dot using the index of its group property
    getGroupShape: _Ember['default'].computed(function () {
      var _this2 = this;

      return function (d, i) {
        i = _this2.get('groupNames').indexOf(d.group);
        if (!_this2.get('displayGroups')) {
          return 'circle';
        }
        return _this2.get('groupShapes')[i % _this2.get('numGroupShapes')];
      };
    }),

    getGroupColor: _Ember['default'].computed(function () {
      var _this3 = this;

      return function (d, i) {
        // If there is an overriding color assigned to the group, we use that
        // color.
        if (!_Ember['default'].isNone(d.color)) {
          return d.color;
        }
        var colorIndex = 0;
        if (_this3.get('displayGroups')) {
          i = _this3.get('groupNames').indexOf(d.group);
          colorIndex = Math.floor(i / _this3.get('numGroupShapes'));
        }
        return _this3.get('colorScale')(colorIndex / _this3.get('numGroupColors'));
      };
    }),

    // ----------------------------------------------------------------------------
    // Legend Configuration
    // ----------------------------------------------------------------------------

    hasLegend: _Ember['default'].computed('isGrouped', 'showLegend', function () {
      return this.get('isGrouped') && this.get('showLegend');
    }),

    legendIconRadius: _Ember['default'].computed.alias('dotRadius'),

    legendItems: _Ember['default'].computed('hasNoData', 'groupedData', 'getGroupShape', 'getGroupColor', 'displayGroups', 'isShowingTotal', 'totalPointData', function () {

      if (this.get('hasNoData')) {
        return [];
      }
      var getGroupShape = this.get('getGroupShape');
      var getGroupColor = this.get('getGroupColor');
      var displayGroups = this.get('displayGroups');

      var legendData = this.get('groupedData').map(function (d, i) {
        var name = d[0].group;
        var value = d.length === 1 ? d[0] : null;
        // Get the color of the group. Because they are in the same group, they
        // should share the same color, so we only need to get the color of the
        // first object and pass to the function
        var color = getGroupColor(d[0], i);
        return {
          label: name,
          group: name,
          stroke: color,
          fill: displayGroups ? color : 'transparent',
          icon: getGroupShape,
          selector: ".group-" + i,
          xValue: value != null ? value.xValue : void 0,
          yValue: value != null ? value.yValue : void 0
        };
      });

      if (this.get('isShowingTotal')) {
        var point = this.get('totalPointData');
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
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    xValueDisplayName: 'X Factor',
    yValueDisplayName: 'Y Factor',

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this4 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        d3.select(element).classed('hovered', true);
        var formatXValue = _this4.get('formatXValue');
        var formatYValue = _this4.get('formatYValue');
        var xValueDisplayName = $('<span class="name" />').text(_this4.get('xValueDisplayName') + ': ');
        var yValueDisplayName = $('<span class="name" />').text(_this4.get('yValueDisplayName') + ': ');
        var xValue = $('<span class="value" />').text(formatXValue(data.xValue));
        var yValue = $('<span class="value" />').text(formatYValue(data.yValue));

        var content = $('<span />');
        content.append($('<span class="tip-label" />').text(data.group)).append(xValueDisplayName).append(xValue).append('<br />').append(yValueDisplayName).append(yValue);
        _this4.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this5 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        d3.select(element).classed('hovered', false);
        return _this5.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    groupAttrs: _Ember['default'].computed(function () {
      return {
        "class": function _class(d, i) {
          return "group group-" + i;
        }
      };
    }),

    pointAttrs: _Ember['default'].computed('dotShapeArea', 'getGroupShape', 'xScale', 'yScale', 'displayGroups', 'getGroupColor', function () {
      var _this6 = this;

      return {
        d: d3.svg.symbol().size(this.get('dotShapeArea')).type(this.get('getGroupShape')),
        fill: this.get('displayGroups') ? this.get('getGroupColor') : 'transparent',
        stroke: this.get('getGroupColor'),
        'stroke-width': 1.5,
        transform: function transform(d) {
          var dx = _this6.get('xScale')(d.xValue);
          var dy = _this6.get('yScale')(d.yValue);
          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    groups: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.group').data(this.get('finishedData'));
    })["volatile"](),

    selectOrCreateAxis: function selectOrCreateAxis(selector) {
      var axis = this.get('viewport').select(selector);
      if (axis.empty()) {
        return this.get('viewport').insert('g', ':first-child');
      } else {
        return axis;
      }
    },

    xAxis: _Ember['default'].computed(function () {
      return this.selectOrCreateAxis('.x.axis').attr('class', 'x axis');
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      return this.selectOrCreateAxis('.y.axis').attr('class', 'y axis');
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    renderVars: ['xScale', 'yScale', 'dotShapeArea', 'finishedData', 'xValueDisplayName', 'yValueDisplayName', 'hasAxisTitles', // backward compatibility support.
    'hasXAxisTitle', 'hasYAxisTitle', 'xTitleHorizontalOffset', 'yTitleVerticalOffset'],

    drawChart: function drawChart() {
      this.updateTotalPointData();
      this.updateData();
      this.updateAxes();
      this.updateGraphic();
      this.updateAxisTitles();
      if (this.get('hasLegend')) {
        return this.drawLegend();
      } else {
        return this.clearLegend();
      }
    },

    totalPointShape: _Ember['default'].computed(function () {
      var _this7 = this;

      var dotShapeArea = this.get('dotShapeArea');

      return function (selection) {
        selection.append('path').attr({
          "class": 'totaldot',
          d: d3.svg.symbol().size(dotShapeArea).type('circle'),
          fill: _this7.get('getGroupColor')
        });

        return selection.append('path').attr({
          "class": 'totaloutline',
          d: d3.svg.symbol().size(dotShapeArea * 3).type('circle'),
          fill: 'transparent',
          stroke: _this7.get('getGroupColor'),
          'stroke-width': 2
        });
      };
    }),

    updateTotalPointData: function updateTotalPointData() {
      var totalData = this.get('isShowingTotal') ? [this.get('totalPointData')] : [];
      var totalPoint = this.get('viewport').selectAll('.totalgroup').data(totalData);
      totalPoint.exit().remove();

      return totalPoint.enter().append('g').attr('class', 'totalgroup').call(this.get('totalPointShape'));
    },

    updateData: function updateData() {
      var groups, points;
      groups = this.get('groups');
      groups.enter().append('g').attr('class', 'group').attr(this.get('groupAttrs'));
      groups.exit().remove();
      points = groups.selectAll('.dot').data(function (d) {
        return d;
      });
      points.enter().append('path').attr('class', 'dot');

      return points.exit().remove();
    },

    updateAxes: function updateAxes() {
      var xAxis = d3.svg.axis().scale(this.get('xScale')).orient('top').ticks(this.get('numXTicks')).tickSize(this.get('graphicHeight')).tickFormat(this.get('formatXValue'));
      var yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatYValue'));
      var graphicTop = this.get('graphicTop');
      var graphicHeight = this.get('graphicHeight');
      var gXAxis = this.get('xAxis').attr('transform', "translate(0," + (graphicTop + graphicHeight) + ")").call(xAxis);
      gXAxis.selectAll('g').filter(function (d) {
        return d !== 0;
      }).classed('major', false).classed('minor', true);

      var labelPadding = this.get('labelPadding');
      gXAxis.selectAll('text').style('text-anchor', 'middle').attr({
        y: function y() {
          return this.getBBox().height + labelPadding / 2;
        }
      });
      var gYAxis = this.get('yAxis');

      this.set('graphicLeft', this.maxLabelLength(gYAxis.selectAll('text')) + this.get('labelPadding'));
      var graphicLeft = this.get('graphicLeft');
      gYAxis.attr('transform', "translate(" + graphicLeft + ",0)").call(yAxis);

      gYAxis.selectAll('g').filter(function (d) {
        return d !== 0;
      }).classed('major', false).classed('minor', true);

      gYAxis.selectAll('text').style('text-anchor', 'end').attr({
        x: -this.get('labelPadding')
      });
    },

    updateGraphic: function updateGraphic() {
      var _this8 = this;

      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      this.get('groups').selectAll('.dot').attr(this.get('pointAttrs')).on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });

      return this.get('viewport').select('.totalgroup').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      }).attr({
        transform: function transform(d) {
          var dx, dy;
          dx = _this8.get('xScale')(d.xValue);
          dy = _this8.get('yScale')(d.yValue);
          return "translate(" + dx + ", " + dy + ")";
        }
      });
    }
  });

  module.exports = ScatterChartComponent;
});
define('ember-charts/components/stacked-vertical-bar-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/floating-tooltip', '../mixins/axes', '../mixins/formattable', '../mixins/no-margin-chart', '../mixins/axis-titles', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsFloatingTooltip, _mixinsAxes, _mixinsFormattable, _mixinsNoMarginChart, _mixinsAxisTitles, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _LegendMixin = _interopRequireDefault(_mixinsLegend);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _AxesMixin = _interopRequireDefault(_mixinsAxes);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _NoMarginChartMixin = _interopRequireDefault(_mixinsNoMarginChart);

  var _AxisTitlesMixin = _interopRequireDefault(_mixinsAxisTitles);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  /**
   * Base class for stacked vertical bar chart components.
   *
   * Supersedes the deprecated functionality of VerticalBarChartComponent
   * with stackBars: true.
   * @class
   * @augments ChartComponent
   */
  var StackedVerticalBarChartComponent = _ChartComponent['default'].extend(_LegendMixin['default'], _FloatingTooltipMixin['default'], _AxesMixin['default'], _FormattableMixin['default'], _NoMarginChartMixin['default'], _AxisTitlesMixin['default'], {

    classNames: ['chart-vertical-bar', 'chart-stacked-vertical-bar'],

    // ---------------------------------------------------------------------------
    // Stacked Vertical Bar Chart Options
    // ---------------------------------------------------------------------------

    /**
     * The smallest slices will be combined into an 'Other' slice until no slice
     * is smaller than minSlicePercent.
     * @type {number}
     */
    minSlicePercent: 2,

    /**
     * Data without a barLabel will be merged into a bar with this name
     * @type {string}
     */
    ungroupedSeriesName: 'Other',

    /**
     * The maximum number of slices. If the number of slices is greater
     * than this, the smallest slices will be combined into an 'Other' slice until
     * there are at most maxNumberOfSlices (including the 'Other' slice).
     * @type {number}
     */
    maxNumberOfSlices: 10,

    /**
     * If there are more slice labels than maxNumberOfSlices and/or if there are
     * slice types that do not meet the `minSlicePercent`, the smallest slices
     * will be aggregated into an 'Other' slice. This property defines the label
     * for this aggregate slice.
     * @type {string}
     */
    otherSliceLabel: 'Other',

    /**
     * Width of slice outline, in pixels
     * @type {number}
     */
    strokeWidth: 1,

    /**
     * Default space between bars, as a fraction of bar size. This can be
     * overridden to be any value between 0 and 1.
     * If not overridden, the default padding here is calculated as a function of
     * the number of bars in the chart. More bars results in a smaller padding
     * ratio, and vice versa. The range values (0.625, 0.125) result in padding
     * values that copies the default padding settings in unstacked
     * VerticalBarChartComponent, and were chosen to create a good default look
     * for any chart, regardless of how many bars it contains.
     *
     * NOTE:
     * If you DO NOT want the betweenBarPadding to dynamically change based
     * on number of slices, this should be overridden to some fixed number between
     * 0 and 1.
     *
     * If you DO want the betweenBarPadding to dynamically change but don't like
     * the default domain/range values set here, override this to adjust those
     * accordingly. View the following D3 documentation for more detail about
     * domain and range settings:
     * https://github.com/d3/d3-3.x-api-reference/blob/master/Ordinal-Scales.md#ordinal_domain
     * @type {number}
     */
    betweenBarPadding: _Ember['default'].computed('barNames.length', function () {
      var scale = d3.scale.linear().domain([1, 8]).range([0.625, 0.125]).clamp(true);
      return scale(this.get('barNames.length'));
    }),

    /**
     * Space allocated for rotated labels on the bottom of the chart. If labels
     * are rotated, they will be extended beyond labelHeight up to maxLabelHeight
     * @type {number}
     */
    maxLabelHeight: 50,

    // ---------------------------------------------------------------------------
    // Data
    // ---------------------------------------------------------------------------

    /**
     * Input data mapped by sliceLabel.
     * Key: sliceLabel
     * Value: Array of slice objects (sliceLabel, barLabel, value)
     * @type {Object.<string, Array.<Object>>}
     */
    dataGroupedBySlice: _Ember['default'].computed('data.[]', function () {
      return _.groupBy(this.get('data'), 'sliceLabel');
    }),

    /**
     * Input data mapped by barLabel. Any data without a barLabel will be
     * aggregated into the bar labelled by `ungroupedSeriesName`. This does not
     * account for the 'Other' slice computations, i.e. all slices are represented
     * here even if they do not meet the minSlicePercent criteria.
     * Key: barLabel
     * Value: Array of slice objects (sliceLabel, barLabel, value)
     * @type {Object.<string, Array.<Object>>}
     */
    dataGroupedByBar: _Ember['default'].computed('ungroupedSeriesName', 'data.[]', function () {
      var ungroupedSeriesName = this.get('ungroupedSeriesName');
      return _.groupBy(this.get('data'), function (slice) {
        return slice.barLabel || ungroupedSeriesName;
      });
    }),

    /**
     * The gross value of the largest bar (ie, largest difference between top
     * and bottom of any bar in the chart).
     * Used to determine whether a given slice meets the minSlicePercent threshold
     * as a percentage of this largest bar.
     * @type {number}
     */
    largestGrossBarValue: _Ember['default'].computed('dataGroupedByBar', function () {
      var grossBarValues = _.map(this.get('dataGroupedByBar'), function (barData) {
        return barData.reduce(function (sum, slice) {
          return sum + Math.abs(slice.value);
        }, 0);
      });
      return _.max(grossBarValues);
    }),

    /**
     * The label and largest slice data for each unique slice label.
     * Finds the largest slice (by absolute value) for each slice label and then
     * calculates the percentage of the largest gross value bar for these
     * largest slices. Used to determine which slices get aggregated into the
     * 'Other' slice in `nonOtherSliceTypes`.
     * @type {Array.<Object>}
     */
    largestSliceData: _Ember['default'].computed('dataGroupedBySlice', 'largestGrossBarValue', function () {
      var dataGroupedBySlice, largestSlice, largestBarValue, largestSliceData;
      dataGroupedBySlice = this.get('dataGroupedBySlice');
      largestBarValue = this.get('largestGrossBarValue');
      largestSliceData = _.map(dataGroupedBySlice, function (slices, sliceLabel) {
        largestSlice = _.max(slices, function (slice) {
          return Math.abs(slice.value);
        });
        return {
          sliceLabel: sliceLabel,
          percentOfBar: Math.abs(largestSlice.value / largestBarValue * 100)
        };
      });
      return largestSliceData.filter(function (sliceData) {
        return !(isNaN(sliceData.percentOfBar) || sliceData.percentOfBar === 0);
      });
    }),

    /**
     * The sliceLabels that will be explicitly shown in the chart and not
     * aggregated into the 'Other' slice. The parameters for which slice labels
     * get bucket in 'Other' are `minSlicePercent` and `maxNumberOfSlices`.
     * @see minSlicePercent
     * @see maxNumberOfSlices
     * @type {Array.<string>}
     */
    nonOtherSliceTypes: _Ember['default'].computed('minSlicePercent', 'maxNumberOfSlices', 'largestSliceData.[]', function () {
      var minSlicePercent, maxNumberOfSlices, largestSliceData, nonOtherSlices;
      minSlicePercent = this.get('minSlicePercent');
      largestSliceData = this.get('largestSliceData');

      // First, filter out any slice labels that do not meet the minSlicePercent
      // threshold. These slices are 'too thin' to show on their own, as they will
      // create too much noise in the stacked bar chart, so we lump them into
      // the one 'Other' slice.
      nonOtherSlices = _.filter(largestSliceData, function (sliceData) {
        return sliceData.percentOfBar >= minSlicePercent;
      });

      // Next, sort the remaining slices by size and take the biggest (N - 1)
      // slices, where N is the max number we can display (this saves one slice
      // for 'Other').
      maxNumberOfSlices = this.get('maxNumberOfSlices');
      nonOtherSlices = _.takeRight(_.sortBy(nonOtherSlices, 'percentOfBar'), maxNumberOfSlices - 1);

      // At this point, everything in `nonOtherSlices` meets both the thresholds
      // set by `minSlicePercent` and `maxNumberOfSlices` and deserves to be shown
      // on its own with its own legend items.
      if (largestSliceData.length - nonOtherSlices.length <= 1) {
        // If 0 or 1 slice labels were filtered out, we can just show all slice
        // labels explicitly. We only want the 'Other' slice if it has at least
        // 2 slice labels contained aggregated inside.
        return _.pluck(largestSliceData, 'sliceLabel');
      } else {
        // Otherwise, just return the slice labels that passed the filters.
        return _.pluck(nonOtherSlices, 'sliceLabel');
      }
    }),

    /**
     * The sliceLabels that will be aggregated into the 'Other' slice and not
     * explicitly shown in the legend.
     * @type {Array.<string>}
     */
    otherSliceTypes: _Ember['default'].computed('largestSliceData.[]', 'nonOtherSliceTypes.[]', function () {
      var allSliceTypes = _.pluck(this.get('largestSliceData'), 'sliceLabel');
      return _.difference(allSliceTypes, this.get('nonOtherSliceTypes'));
    }),

    /**
     * Input data mapped by barLabel AFTER 'Other' slices have been calculated
     * and with slices sorted correctly for each bar. Bar sorting is handled by
     * `barNames`, but slice sorting is handled here.
     * Key: barLabel
     * Value: Array of [sorted] slice objects (sliceLabel, barLabel, value)
     * @type {Object.<string, Array.Object>>}
     */
    sortedData: _Ember['default'].computed('dataGroupedByBar', 'otherSliceLabel', 'nonOtherSliceTypes.[]', 'sliceSortingFn', function () {
      var _this = this;

      var groupedData, nonOtherSliceTypes, otherSliceLabel;
      groupedData = this.get('dataGroupedByBar');
      nonOtherSliceTypes = this.get('nonOtherSliceTypes');
      otherSliceLabel = this.get('otherSliceLabel');
      return _.reduce(groupedData, function (result, barData, barLabel) {
        // Create an empty 'Other' slice. Go through every slice in each bar
        // and look for slices that need to be aggregated into 'Other', updating
        // the value of the otherSlice along the way.
        var newBarData, otherSlice;
        newBarData = [];
        otherSlice = { barLabel: barLabel,
          sliceLabel: otherSliceLabel,
          value: 0 };
        barData.forEach(function (slice) {
          if (nonOtherSliceTypes.indexOf(slice.sliceLabel) !== -1) {
            newBarData.push(slice);
          } else {
            otherSlice.value += slice.value;
          }
        });
        newBarData.sort(_this.get('sliceSortingFn'));
        if (otherSlice.value !== 0) {
          newBarData.push(otherSlice);
        }
        result[barLabel] = newBarData;
        return result;
      }, {});
    }),

    /**
     * Final data to be consumed by d3 and rendered into the chart.
     * Contains positioning information of slice above/below x-axis, labels,
     * and color.
     * @type {Array.<Object>}
     */
    finishedData: _Ember['default'].computed('sortedData', function () {
      var posTop, negBottom, stackedSlices;
      return _.map(this.get('sortedData'), function (slices, barLabel) {
        // We need to track the top and bottom of the bar so we know where to
        // add any positive or negative slices, respectively.
        posTop = 0;
        negBottom = 0;
        stackedSlices = _.map(slices, function (slice) {
          var yMin, yMax;
          if (slice.value < 0) {
            yMax = negBottom;
            negBottom += slice.value;
            yMin = negBottom;
          } else {
            yMin = posTop;
            posTop += slice.value;
            yMax = posTop;
          }
          return {
            yMin: yMin,
            yMax: yMax,
            value: slice.value,
            barLabel: slice.barLabel,
            sliceLabel: slice.sliceLabel,
            color: slice.color
          };
        });

        return {
          barLabel: barLabel,
          slices: slices,
          stackedSlices: stackedSlices,
          max: posTop,
          min: negBottom
        };
      });
    }),

    // ---------------------------------------------------------------------------
    // Slice and Bar Sorting
    // ---------------------------------------------------------------------------

    /**
     * Key used to determine slice sorting order. Can be 'value', 'none', or
     * 'other'.
     * @see valueSliceSortingFn
     * @see originalOrderSliceSortingFn
     * @see customSliceSortingFn
     * @type {string}
     */
    sliceSortKey: 'value',

    /**
     * Slice order for when sliceSortKey is set to `value`
     * Starting with the largest net-value bar, sort slices in each bar by abs.
     * value, and add these to the slice order (from largest to smallest)
     * assuming they are not already in the order. Then repeat this process for
     * all bars to make sure all slices are listed in the order.
     * @see sliceSortKey
     * @see valueSliceSortingFn
     * @type {Array.<string>}
     */
    sliceOrderByValue: _Ember['default'].computed('netBarValues.[]', 'dataGroupedByBar', 'otherSliceLabel', function () {
      var sortedBars, sliceOrder, slicesInBar, allSlicesByBar;
      allSlicesByBar = this.get('dataGroupedByBar');
      sortedBars = _.sortBy(this.get('netBarValues'), 'value').reverse();
      sliceOrder = [];
      sortedBars.forEach(function (bar) {
        slicesInBar = _.sortBy(allSlicesByBar[bar.barLabel], function (slice) {
          return -Math.abs(slice.value);
        });
        slicesInBar.forEach(function (slice) {
          if (sliceOrder.indexOf(slice.sliceLabel) === -1) {
            sliceOrder.push(slice.sliceLabel);
          }
        });
      });
      sliceOrder.push(this.get('otherSliceLabel'));
      return sliceOrder;
    }),

    /**
     * Comparison function for slices for when sliceSortKey is 'value'
     * @see sliceSortKey
     * @see sliceOrderByValue
     * @type {function}
     */
    valueSliceSortingFn: _Ember['default'].computed('sliceOrderByValue.[]', function () {
      var _this2 = this;

      var sliceOrder = this.get('sliceOrderByValue');
      return function (slice1, slice2) {
        return _this2.defaultCompareFn(sliceOrder.indexOf(slice1.sliceLabel), sliceOrder.indexOf(slice2.sliceLabel));
      };
    }),

    /**
     * Comparison function for slices when sliceSortKey is 'custom'
     * Can override the custom sorting function to sort by any comparison
     * function. By default, this sorts slices alphabetically by sliceLabel.
     * @see sliceSortKey
     * @type {function}
     */
    customSliceSortingFn: _Ember['default'].computed(function () {
      var _this3 = this;

      return function (slice1, slice2) {
        return _this3.defaultCompareFn(slice1.sliceLabel, slice2.sliceLabel);
      };
    }),

    /**
     * Comparison function for slices when sliceSortKey is 'none'
     * Sort each slice within its bar based on the order it is listed in the
     * original input data.
     * @see sliceSortKey
     * @type {function}
     */
    originalOrderSliceSortingFn: _Ember['default'].computed('data.[]', function () {
      var _this4 = this;

      var data = this.get('data');
      return function (slice1, slice2) {
        return _this4.defaultCompareFn(data.indexOf(slice1), data.indexOf(slice2));
      };
    }),

    /**
     * The current slice sorting function, depending on what sliceSortKey is.
     * @type {function}
     */
    sliceSortingFn: _Ember['default'].computed('valueSliceSortingFn', 'customSliceSortingFn', 'originalOrderSliceSortingFn', 'sliceSortKey', function () {
      var sliceSortKey = this.get('sliceSortKey');
      if (sliceSortKey === 'value') {
        return this.get('valueSliceSortingFn');
      } else if (sliceSortKey === 'custom') {
        return this.get('customSliceSortingFn');
      } else if (sliceSortKey === 'none' || _Ember['default'].isNone(sliceSortKey)) {
        return this.get('originalOrderSliceSortingFn');
      } else {
        throw new Error("Invalid sliceSortKey");
      }
    }),

    /**
     * Key used to determine bar sorting order. Can be 'value', 'none', or
     * 'other'.
     * @see valueBarSortingFn
     * @see originalOrderBarSortingFn
     * @see customBarSortingFn
     * @type {string}
     */
    barSortKey: 'value',

    /**
     * Whether bars should be sorted by the `barSortKey` in ascending or
     * descending order.
     * @type {boolean}
     */
    barSortAscending: true,

    /**
     * Comparison function for when bar data when barSortKey is 'value'
     * Sort bars based on the net value of each bar.
     * @see barSortKey
     * @type {function}
     */
    valueBarSortingFn: _Ember['default'].computed(function () {
      var _this5 = this;

      return function (barData1, barData2) {
        return _this5.defaultCompareFn(barData1.value, barData2.value);
      };
    }),

    /**
     * The original order that bar labels are listed from the input data.
     * We preserve this order so that bars can be sorted in the original input
     * order when `barSortKey` is set to 'none'.
     * @see originalOrderBarSortingFn
     * @type {Array.<String>}
     */
    originalBarOrder: _Ember['default'].computed('data.[]', function () {
      var barOrder = [];
      this.get('data').forEach(function (datum) {
        if (barOrder.indexOf(datum.barLabel) === -1) {
          barOrder.push(datum.barLabel);
        }
      });
      return barOrder;
    }),

    /**
     * Comparison function for bar data when barSortKey is 'custom'
     * Can override the custom sorting function to sort by any comparison
     * function. By default, this sorts bars alphabetically by sliceLabel.
     * @see barSortKey
     * @type {function}
     */
    customBarSortingFn: _Ember['default'].computed(function () {
      var _this6 = this;

      return function (barData1, barData2) {
        return _this6.defaultCompareFn(barData1.barLabel, barData2.barLabel);
      };
    }),

    /**
     * Comparison function for bar data when barSortKey is 'none'
     * Sort bars based on the order each barLabel appears in the original input
     * data.
     * @see originalBarOrder
     * @see barSortKey
     * @type {function}
     */
    originalOrderBarSortingFn: _Ember['default'].computed('originalBarOrder.[]', function () {
      var _this7 = this;

      var originalOrder = this.get('originalBarOrder');
      return function (barData1, barData2) {
        return _this7.defaultCompareFn(originalOrder.indexOf(barData1.barLabel), originalOrder.indexOf(barData2.barLabel));
      };
    }),

    /**
     * The current bar sorting function, depending on what barSortKey is.
     * @type {function}
     */
    barSortingFn: _Ember['default'].computed('valueBarSortingFn', 'customBarSortingFn', 'originalOrderBarSortingFn', 'barSortKey', function () {
      var barSortKey = this.get('barSortKey');
      if (barSortKey === 'value') {
        return this.get('valueBarSortingFn');
      } else if (barSortKey === 'custom') {
        return this.get('customBarSortingFn');
      } else if (barSortKey === 'none' || _Ember['default'].isNone(barSortKey)) {
        return this.get('originalOrderBarSortingFn');
      } else {
        throw new Error("Invalid barSortKey");
      }
    }),

    /**
     * Array containing an object for each bar. These objects contain the barLabel
     * and net value for each bar. Used for bar sorting in `barNames`.
     * @type {Array.<Object>}
     */
    netBarValues: _Ember['default'].computed('dataGroupedByBar', function () {
      var dataGroupedByBar = this.get('dataGroupedByBar');
      return _.map(dataGroupedByBar, function (barData, barLabel) {
        var barValue = barData.reduce(function (sum, slice) {
          return sum + slice.value;
        }, 0);
        return { barLabel: barLabel, value: barValue };
      });
    }),

    /**
     * Order in which bars should appear in the chart, by bar label. This list
     * is sorted using the appropriate barSortingFn.
     * @see barSortingFn
     * @type {Array.<string>}
     */
    barNames: _Ember['default'].computed('netBarValues', 'barSortingFn', 'barSortAscending', function () {
      var sortedBars, sortedBarNames;
      sortedBars = this.get('netBarValues').sort(this.get('barSortingFn'));
      sortedBarNames = _.pluck(sortedBars, 'barLabel');
      if (!this.get('barSortAscending')) {
        sortedBarNames.reverse();
      }
      return sortedBarNames;
    }),

    /**
     * Explicitly written version of the default comparison function that is used
     * by Array#sort. Used by every slice and bar comparison functions that are
     * comparing specific parameters.
     * @function
     */
    defaultCompareFn: function defaultCompareFn(reference1, reference2) {
      if (reference1 < reference2) {
        return -1;
      } else if (reference1 > reference2) {
        return 1;
      } else {
        return 0;
      }
    },

    // ---------------------------------------------------------------------------
    // Layout
    // ---------------------------------------------------------------------------

    labelHeightOffset: _Ember['default'].computed('_shouldRotateLabels', 'maxLabelHeight', 'labelHeight', 'labelPadding', function () {
      var labelSize;

      if (this.get('_shouldRotateLabels')) {
        labelSize = this.get('maxLabelHeight');
      } else {
        // Inherited from parent class ChartComponent
        labelSize = this.get('labelHeight');
      }
      return labelSize + this.get('labelPadding');
    }),

    // Chart Graphic Dimensions
    graphicLeft: _Ember['default'].computed.alias('labelWidthOffset'),

    graphicWidth: _Ember['default'].computed('width', 'labelWidthOffset', function () {
      return this.get('width') - this.get('labelWidthOffset');
    }),

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', function () {
      return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
    }),

    // ---------------------------------------------------------------------------
    // Ticks and Scales
    // ---------------------------------------------------------------------------

    // Vertical position/length of each bar and its value
    yDomain: _Ember['default'].computed('finishedData', function () {
      var finishedData = this.get('finishedData');

      var max = d3.max(finishedData, function (d) {
        return d.max;
      });

      var min = d3.min(finishedData, function (d) {
        return d.min;
      });

      // force one end of the range to include zero
      if (min > 0) {
        return [0, max];
      }
      if (max < 0) {
        return [min, 0];
      }
      if (min === 0 && max === 0) {
        return [0, 1];
      } else {
        return [min, max];
      }
    }),

    yScale: _Ember['default'].computed('graphicTop', 'graphicHeight', 'yDomain', 'numYTicks', function () {
      return d3.scale.linear().domain(this.get('yDomain')).range([this.get('graphicTop') + this.get('graphicHeight'), this.get('graphicTop')]).nice(this.get('numYTicks'));
    }),

    /**
     * All slice labels to show in the chart legend. Includes 'Other' slice if the
     * 'Other' slice is present.
     * @type {Array.<string>}
     */
    allSliceLabels: _Ember['default'].computed('nonOtherSliceTypes.[]', 'otherSliceTypes.[]', 'otherSliceLabel', function () {
      var result = _.clone(this.get('nonOtherSliceTypes'));
      if (this.get('otherSliceTypes').length > 0) {
        result.push(this.get('otherSliceLabel'));
      }
      return result;
    }),

    labelIDMapping: _Ember['default'].computed('allSliceLabels.[]', function () {
      var allSliceLabels = this.get('allSliceLabels');
      return _.zipObject(allSliceLabels, _.range(allSliceLabels.length));
    }),

    // The space in pixels allocated to each bar
    barWidth: _Ember['default'].computed('xBetweenBarScale', function () {
      return this.get('xBetweenBarScale').rangeBand();
    }),

    // The scale used to position each bar and label across the horizontal axis
    xBetweenBarScale: _Ember['default'].computed('graphicWidth', 'barNames', 'betweenBarPadding', function () {
      var betweenBarPadding = this.get('betweenBarPadding');

      return d3.scale.ordinal().domain(this.get('barNames')).rangeRoundBands([0, this.get('graphicWidth')],
      // inner padding (between bars)
      betweenBarPadding,
      // outer padding (between outer bars and edge)
      betweenBarPadding);
    }),

    // Override axis mix-in min and max values to listen to the scale's domain
    minAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[0];
    }),

    maxAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[1];
    }),

    // ---------------------------------------------------------------------------
    // Color Configuration
    // ---------------------------------------------------------------------------

    /**
     * Total number of colors needed to display.
     * When calculating the default slice colors, D3 divides a color gradient up
     * using this number to create an 'even' distribution of colors.
     * @type {number}
     */
    numColorSeries: _Ember['default'].computed.alias('allSliceLabels.length'),

    /**
     * Map between sliceLabels and default slice color.
     * These colors are calculated by D3 with `getSeriesColor`, which maps the
     * range of sliceLabels against a color gradient. In order to customize the
     * colors for each individual sliceLabel, this property can be overridden or
     * extended.
     * @type {Object.<string,string>}
     */
    sliceColors: _Ember['default'].computed('allSliceLabels.[]', 'getSeriesColor', function () {
      var fnGetSeriesColor = this.get('getSeriesColor');
      var result = {};
      this.get('allSliceLabels').forEach(function (label, labelIndex) {
        result[label] = fnGetSeriesColor(label, labelIndex);
      });
      return result;
    }),

    /**
     * Function that returns the correct color for a given slice.
     * Used by D3 to dynamically set the color for each slice rect element in
     * `updateGraphic`.
     * @type {function}
     */
    fnGetSliceColor: _Ember['default'].computed('sliceColors.[]', function () {
      var sliceColors = this.get('sliceColors');
      return function (d) {
        return sliceColors[d.sliceLabel];
      };
    }),

    // ---------------------------------------------------------------------------
    // Legend Configuration
    // ---------------------------------------------------------------------------

    hasLegend: true,

    legendItems: _Ember['default'].computed('allSliceLabels.[]', 'sliceColors', 'labelIDMapping', function () {
      var _this8 = this;

      var sliceColors = this.get('sliceColors');
      return this.get('allSliceLabels').map(function (label) {
        var color = sliceColors[label];
        return {
          label: label,
          fill: color,
          stroke: color,
          icon: function icon() {
            return 'square';
          },
          selector: ".grouping-" + _this8.get('labelIDMapping')[label]
        };
      });
    }),

    // ---------------------------------------------------------------------------
    // Tooltip Configuration
    // ---------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this9 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Specify whether we are on an individual bar or group
        var isGroup = _Ember['default'].isArray(data.slices);

        // Do hover detail style stuff here
        element = isGroup ? element.parentNode.parentNode : element;
        d3.select(element).classed('hovered', true);

        // Show tooltip
        var content = $('<span />');
        if (data.barLabel) {
          content.append($('<span class="tip-label" />').text(data.barLabel));
        }

        var formatLabel = _this9.get('formatLabelFunction');
        var addValueLine = function addValueLine(d) {
          var label = $('<span class="name" />').text(d.sliceLabel + ": ");
          content.append(label);
          var value = $('<span class="value" />').text(formatLabel(d.value));
          content.append(value);
          content.append('<br />');
        };

        if (isGroup) {
          // Display all bar details if hovering over axis group label
          data.slices.forEach(addValueLine);
        } else {
          // Just hovering over single bar
          addValueLine(data);
        }
        return _this9.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this10 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // if we exited the group label undo for the group
        if (_Ember['default'].isArray(data.slices)) {
          element = element.parentNode.parentNode;
        }
        // Undo hover style stuff
        d3.select(element).classed('hovered', false);

        // Hide Tooltip
        return _this10.hideTooltip();
      };
    }),

    // ---------------------------------------------------------------------------
    // Styles
    // ---------------------------------------------------------------------------

    barAttrs: _Ember['default'].computed('graphicLeft', 'graphicTop', 'xBetweenBarScale', function () {
      var _this11 = this;

      var xBetweenBarScale = this.get('xBetweenBarScale');

      return {
        transform: function transform(d) {
          var dx = _this11.get('graphicLeft');
          if (xBetweenBarScale(d.barLabel)) {
            dx += xBetweenBarScale(d.barLabel);
          }
          var dy = _this11.get('graphicTop');

          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    sliceAttrs: _Ember['default'].computed('yScale', 'barWidth', 'labelIDMapping', 'strokeWidth', function () {
      var _this12 = this;

      var yScale, zeroDisplacement;
      zeroDisplacement = 1;
      yScale = this.get('yScale');
      return {
        "class": function _class(slice) {
          var id = _this12.get('labelIDMapping')[slice.sliceLabel];
          return "grouping-" + id;
        },
        'stroke-width': this.get('strokeWidth').toString() + 'px',
        width: function width() {
          return _this12.get('barWidth');
        },
        x: null,
        y: function y(slice) {
          return yScale(slice.yMax) + zeroDisplacement;
        },
        height: function height(slice) {
          return yScale(slice.yMin) - yScale(slice.yMax);
        }
      };
    }),

    labelAttrs: _Ember['default'].computed('barWidth', 'graphicTop', 'graphicHeight', 'labelPadding', function () {
      var _this13 = this;

      return {
        'stroke-width': 0,
        transform: function transform() {
          var dx = _this13.get('barWidth') / 2;
          var dy = _this13.get('graphicTop') + _this13.get('graphicHeight') + _this13.get('labelPadding');
          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    // ---------------------------------------------------------------------------
    // Selections
    // ---------------------------------------------------------------------------

    bars: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.bars').data(this.get('finishedData'));
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      var yAxis = this.get('viewport').select('.y.axis');
      if (yAxis.empty()) {
        return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis');
      } else {
        return yAxis;
      }
    })["volatile"](),

    // ---------------------------------------------------------------------------
    // Label Layout
    // ---------------------------------------------------------------------------

    // Space available for labels that are horizontally displayed.
    maxLabelWidth: _Ember['default'].computed.readOnly('barWidth'),

    _shouldRotateLabels: false,

    setRotateLabels: function setRotateLabels() {
      var labels, maxLabelWidth, rotateLabels;
      labels = this.get('bars').select('.groupLabel text');
      maxLabelWidth = this.get('maxLabelWidth');
      rotateLabels = false;
      if (this.get('rotatedLabelLength') > maxLabelWidth) {
        labels.each(function () {
          if (this.getBBox().width > maxLabelWidth) {
            rotateLabels = true;
            return;
          }
        });
      }
      return this.set('_shouldRotateLabels', rotateLabels);
    },

    // Calculate the number of degrees to rotate labels based on how widely labels
    // will be spaced, but never rotate the labels less than 20 degrees
    rotateLabelDegrees: _Ember['default'].computed('labelHeight', 'maxLabelWidth', function () {
      var radians = Math.atan(this.get('labelHeight') / this.get('maxLabelWidth'));
      var degrees = radians * 180 / Math.PI;
      return Math.max(degrees, 20);
    }),

    rotatedLabelLength: _Ember['default'].computed('maxLabelHeight', 'rotateLabelDegrees', function () {
      var rotateLabelRadians = Math.PI / 180 * this.get('rotateLabelDegrees');
      return Math.abs(this.get('maxLabelHeight') / Math.sin(rotateLabelRadians));
    }),

    // ---------------------------------------------------------------------------
    // Drawing Functions
    // ---------------------------------------------------------------------------

    renderVars: ['xBetweenBarScale', 'yScale', 'finishedData', 'getSeriesColor', 'xValueDisplayName', 'yValueDisplayName', 'hasAxisTitles', // backward compatibility support.
    'hasXAxisTitle', 'hasYAxisTitle', 'xTitleHorizontalOffset', 'yTitleVerticalOffset', 'strokeWidth'],

    drawChart: function drawChart() {
      this.updateData();
      this.updateLayout();
      this.updateAxes();
      this.updateGraphic();
      this.updateAxisTitles();
      if (this.get('hasLegend')) {
        return this.drawLegend();
      } else {
        return this.clearLegend();
      }
    },

    updateData: function updateData() {
      var bars = this.get('bars');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      var entering = bars.enter().append('g').attr('class', 'bars');
      entering.append('g').attr('class', 'groupLabel').append('text').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      bars.exit().remove();

      var subdata = function subdata(d) {
        return d.stackedSlices;
      };

      var slices = bars.selectAll('rect').data(subdata);
      slices.enter().append('rect').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      return slices.exit().remove();
    },

    updateLayout: function updateLayout() {
      var _this14 = this;

      var bars = this.get('bars');
      var labels = bars.select('.groupLabel text').attr('transform', null) // remove any previous rotation attrs
      .text(function (d) {
        return d.barLabel;
      });

      // If there is enough space horizontally, center labels underneath each
      // group. Otherwise, rotate each label and anchor it at the top of its
      // first character.
      this.setRotateLabels();
      var labelTrimmer;

      if (this.get('_shouldRotateLabels')) {
        var rotateLabelDegrees = this.get('rotateLabelDegrees');
        labelTrimmer = _LabelTrimmer['default'].create({
          getLabelSize: function getLabelSize() {
            return _this14.get('rotatedLabelLength');
          },
          getLabelText: function getLabelText(d) {
            return d.barLabel;
          }
        });

        return labels.call(labelTrimmer.get('trim')).attr({
          'text-anchor': 'end',
          transform: "rotate(" + -rotateLabelDegrees + ")",
          dy: function dy() {
            return this.getBBox().height;
          }
        });
      } else {
        var maxLabelWidth = this.get('maxLabelWidth');
        labelTrimmer = _LabelTrimmer['default'].create({
          getLabelSize: function getLabelSize() {
            return maxLabelWidth;
          },
          getLabelText: function getLabelText(d) {
            return d.barLabel != null ? d.barLabel : '';
          }
        });

        return labels.call(labelTrimmer.get('trim')).attr({
          'text-anchor': 'middle',
          dy: this.get('labelPadding')
        });
      }
    },

    updateAxes: function updateAxes() {
      //tickSize isn't doing anything here, it should take two arguments
      var yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatValueAxis'));

      var gYAxis = this.get('yAxis');

      // find the correct size of graphicLeft in order to fit the Labels perfectly
      this.set('graphicLeft', this.maxLabelLength(gYAxis.selectAll('text')) + this.get('labelPadding'));

      var graphicTop = this.get('graphicTop');
      var graphicLeft = this.get('graphicLeft');
      gYAxis.attr({
        transform: "translate(" + graphicLeft + ", " + graphicTop + ")"
      }).call(yAxis);

      gYAxis.selectAll('g').filter(function (d) {
        return d !== 0;
      }).classed('major', false).classed('minor', true);

      gYAxis.selectAll('text').style('text-anchor', 'end').attr({
        x: -this.get('labelPadding')
      });
    },

    updateGraphic: function updateGraphic() {
      var bars = this.get('bars');
      var sliceAttrs = this.get('sliceAttrs');

      bars.attr(this.get('barAttrs'));
      bars.selectAll('rect').attr(sliceAttrs).style('fill', this.get('fnGetSliceColor'));
      return bars.select('g.groupLabel').attr(this.get('labelAttrs'));
    }
  });

  module.exports = StackedVerticalBarChartComponent;
});
define('ember-charts/components/time-series-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/time-series-labeler', '../mixins/floating-tooltip', '../mixins/has-time-series-rule', '../mixins/axes', '../mixins/formattable', '../mixins/no-margin-chart', '../mixins/axis-titles', '../utils/group-by'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsTimeSeriesLabeler, _mixinsFloatingTooltip, _mixinsHasTimeSeriesRule, _mixinsAxes, _mixinsFormattable, _mixinsNoMarginChart, _mixinsAxisTitles, _utilsGroupBy) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _LegendMixin = _interopRequireDefault(_mixinsLegend);

  var _TimeSeriesLabelerMixin = _interopRequireDefault(_mixinsTimeSeriesLabeler);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _HasTimeSeriesRuleMixin = _interopRequireDefault(_mixinsHasTimeSeriesRule);

  var _AxesMixin = _interopRequireDefault(_mixinsAxes);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _NoMarginChartMixin = _interopRequireDefault(_mixinsNoMarginChart);

  var _AxisTitlesMixin = _interopRequireDefault(_mixinsAxisTitles);

  var TimeSeriesChartComponent = _ChartComponent['default'].extend(_LegendMixin['default'], _TimeSeriesLabelerMixin['default'], _FloatingTooltipMixin['default'], _HasTimeSeriesRuleMixin['default'], _AxesMixin['default'], _FormattableMixin['default'], _NoMarginChartMixin['default'], _AxisTitlesMixin['default'], {

    classNames: ['chart-time-series'],

    // ----------------------------------------------------------------------------
    // API -- inputs
    //
    // lineData, barData:
    // Both data sets need to be in the following format:
    // [{label: ..., time: ..., value: ...}, {...}, ...]
    // Line data will be grouped by label, while bar data is grouped by
    // time and then label
    //
    // ----------------------------------------------------------------------------
    lineData: null,
    barData: null,

    // ----------------------------------------------------------------------------
    // Time Series Chart Options
    // ----------------------------------------------------------------------------

    // Getters for formatting human-readable labels from provided data
    formatTime: d3.time.format('%Y-%m-%d'),
    formatTimeLong: d3.time.format('%a %b %-d, %Y'),

    // Data without group will be merged into a group with this name
    ungroupedSeriesName: 'Other',

    // Use basis interpolation? Smooths lines but may prevent extrema from being
    // displayed
    interpolate: false,

    // Force the Y axis to start at zero, instead of the smallest Y value provided
    yAxisFromZero: false,

    // Space between bars, as fraction of total bar + padding space
    barPadding: 0,

    // Space between bar groups, as fraction of total bar + padding space
    barGroupPadding: 0.25,

    // Bar left offset, as fraction of width of bar
    barLeftOffset: 0.0,

    // Force X-Axis labels to print vertically
    xAxisVertLabels: false,

    // ----------------------------------------------------------------------------
    // Time Series Chart Constants
    // ----------------------------------------------------------------------------

    // The default maximum number of labels to use along the x axis for a dynamic
    // x axis.
    DEFAULT_MAX_NUMBER_OF_LABELS: 10,

    // ----------------------------------------------------------------------------
    // Overrides of ChartComponent methods
    // ----------------------------------------------------------------------------

    // Combine all data for testing purposes
    finishedData: _Ember['default'].computed('_groupedLineData.@each.values', '_groupedBarData.@each', function () {
      return {
        lineData: this.get('_groupedLineData'),
        groupedBarData: this.get('_groupedBarData')
      };
    }),

    hasNoData: _Ember['default'].computed('_hasBarData', '_hasLineData', function () {
      return !this.get('_hasBarData') && !this.get('_hasLineData');
    }),

    // ----------------------------------------------------------------------------
    // Overrides of Legend methods
    // ----------------------------------------------------------------------------

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    _getLabelOrDefault: function _getLabelOrDefault(datum) {
      return datum.label && datum.label.toString() || this.get('ungroupedSeriesName');
    },

    // Puts lineData in a new format.
    // Resulting format is [{group: ..., values: ...}] where values are the
    // lineData values for that group.
    _groupedLineData: _Ember['default'].computed('lineData.@each', 'ungroupedSeriesName', function () {
      var _this = this;

      var lineData = this.get('lineData');
      if (_Ember['default'].isEmpty(lineData)) {
        return [];
      }

      var groups = (0, _utilsGroupBy.groupBy)(lineData, function (datum) {
        return _this._getLabelOrDefault(datum);
      });

      return _.map(groups, function (values, groupName) {
        return {
          group: groupName,
          values: values
        };
      });
    }),

    // puts barData in a new format.
    // Resulting format: [[{group: ..., time: ..., value: ..., label:
    // ...}, ...], [...]] where each internal array is an array of hashes
    // at the same time
    _groupedBarData: _Ember['default'].computed('barData.@each', 'ungroupedSeriesName', 'barLeftOffset', function () {
      var _this2 = this;

      var barData = this.get('barData');
      if (_Ember['default'].isEmpty(barData)) {
        return [];
      }

      // returns map from time to array of bar hashes
      var barTimes = (0, _utilsGroupBy.groupBy)(barData, function (d) {
        return d.time.getTime();
      });

      return _.map(barTimes, function (groups) {
        return _.map(groups, function (g) {
          var label = _this2._getLabelOrDefault(g);
          var labelTime = g.time;
          var drawTime = _this2._transformCenter(g.time);
          return {
            group: label,
            time: drawTime,
            value: g.value,
            label: label,
            labelTime: labelTime
          };
        });
      });
    }),

    // Transforms the center of the bar graph for the drawing based on the
    // specified barLeftOffset
    _transformCenter: function _transformCenter(time) {
      // Transform Center is designed to offset Bar graphs against the labels on
      // the x axis.  That offset is based on the time unit selected.  This means
      // that a graph might have a selectedInterval of Months, but that the bars
      // are based on Weeks.  So if you were to shift a bar 1/2 of an interval it
      // would move 15 days instead of 15 weeks.  The fix is to check to see if
      // the bars are of a different interval first, before defaulting to the
      // selectedInterval
      var interval = this.get('computedBarInterval') || this.get('selectedInterval');
      var delta = this._getTimeDeltaFromInterval(interval);
      var offset = this.get('barLeftOffset');
      if (offset !== 0) {
        time = this._padTimeWithIntervalMultiplier(time, delta, offset);
      }
      return time;
    },

    // Since selected interval and time delta don't use the same naming convention
    // this converts the selected interval to the time delta convention for the
    // padding functions.
    _getTimeDeltaFromInterval: function _getTimeDeltaFromInterval(interval) {
      switch (interval) {
        case 'years':
        case 'Y':
          return 'year';
        case 'quarters':
        case 'Q':
          return 'quarter';
        case 'months':
        case 'M':
          return 'month';
        case 'weeks':
        case 'W':
          return 'week';
        case 'seconds':
        case 'S':
          return 'second';
      }
    },

    // Given a time, returns the time plus half an interval
    _padTimeForward: function _padTimeForward(time, delta) {
      return this._padTimeWithIntervalMultiplier(time, delta, 0.5);
    },

    // Given a time, returns the time minus half an interval
    _padTimeBackward: function _padTimeBackward(time, delta) {
      return this._padTimeWithIntervalMultiplier(time, delta, -0.5);
    },

    // Because of the complexities of what will and won't work with this method,
    // it's not very safe to call. Instead, call _padTimeForward or
    // _padTimeBackward. This method exists to remove code duplication from those.
    _padTimeWithIntervalMultiplier: function _padTimeWithIntervalMultiplier(time, delta, multiplier) {
      if (time != null) {
        var intervalType = delta === 'quarter' ? 'month' : delta;
        var period = delta === 'quarter' ? 3 : 1;
        var offsetDelta = d3.time[intervalType].offset(time, period) - time.getTime();
        time = offsetDelta * multiplier + time.getTime();
      }
      return new Date(time);
    },

    // We'd like to have the option of turning our labels vertical when circumstances
    // require.  This function gets ALL the labels of the xAxis and rotates them.
    _rotateXAxisLabels: function _rotateXAxisLabels() {
      var gXAxis = this.get('xAxis');

      // If we have a legend it'll take care of the margin bottom adjustments,
      // else we need to give ourselves some more room for the labels.
      if (!this.get('hasLegend')) {
        this.set('marginBottom', 20);
      }

      gXAxis.selectAll('text').attr("y", 8).attr("x", -8).attr("dy", ".2em").attr("transform", "rotate(-60)").style("text-anchor", "end");

      // we also need to mod the legend top padding
      this.set('legendTopPadding', 30);
    },

    // Now that we can get our labels all turny, I actually need to straighten them
    // out if the feature is toggled
    _straightenXAxisLabels: function _straightenXAxisLabels() {
      var gXAxis = this.get('xAxis');
      // most of these values are static and come from various places, including
      // the bowels of D3
      gXAxis.selectAll('text').attr("y", 9).attr("x", 0).attr("dy", "0.71em").attr("transform", null).style("text-anchor", "middle");
    },

    _barGroups: _Ember['default'].computed('barData.@each', 'ungroupedSeriesName', function () {
      var _this3 = this;

      var barData = this.get('barData');
      if (_Ember['default'].isEmpty(barData)) {
        return [];
      }

      var barGroups = (0, _utilsGroupBy.groupBy)(barData, function (datum) {
        return _this3._getLabelOrDefault(datum);
      });
      return _.keys(barGroups);
    }),

    _hasLineData: _Ember['default'].computed.notEmpty('lineData'),

    _hasBarData: _Ember['default'].computed.notEmpty('barData'),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // position of the left of the graphic -- we want to leave space for
    // labels
    graphicLeft: _Ember['default'].computed.alias('labelWidthOffset'),

    // width of the graphic
    graphicWidth: _Ember['default'].computed('width', 'graphicLeft', function () {
      return this.get('width') - this.get('graphicLeft');
    }),

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', 'marginBottom', function () {
      var legendSize = this.get('legendHeight') + this.get('legendChartPadding') + (this.get('marginBottom') || 0);
      return this.get('height') - legendSize;
    }),

    // ----------------------------------------------------------------------------
    // Grouped/Stacked Bar Scales
    // ----------------------------------------------------------------------------

    // Unit of time between bar samples
    timeDelta: _Ember['default'].computed('_groupedBarData', function () {
      var groupedBarData = this.get('_groupedBarData');
      if (_Ember['default'].isEmpty(groupedBarData) || groupedBarData.length < 2) {
        return 'month';
      }

      // difference in time between first bar data group and second bar
      // data group
      var firstBarTime = groupedBarData[0][0].time;
      var secondBarTime = groupedBarData[1][0].time;
      var oneDayInSeconds = 24 * 60 * 60 * 1000;
      var diffTimeDays = (secondBarTime - firstBarTime) / oneDayInSeconds;

      // Some fuzzy bar interval computation, I just picked 2 day buffer
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
    }),

    // this method seems very flaky to me; making padding by changing domain
    // convention is to change range
    barDataExtent: _Ember['default'].computed('timeDelta', '_groupedBarData.@each', function () {
      var timeDelta = this.get('timeDelta');
      var groupedBarData = this.get('_groupedBarData');
      if (_Ember['default'].isEmpty(groupedBarData)) {
        return [new Date(), new Date()];
      }

      var first = _.first(groupedBarData);
      var last = _.last(groupedBarData);
      var startTime = new Date(first[0].time);
      var endTime = new Date(last[0].time);

      // Add the padding needed for the edges of the bar
      var paddedStart = this._padTimeBackward(startTime, timeDelta);
      var paddedEnd = this._padTimeForward(endTime, timeDelta);
      return [new Date(paddedStart), new Date(paddedEnd)];
    }),

    // The time range over which all bar groups are drawn
    xBetweenGroupDomain: _Ember['default'].computed.alias('barDataExtent'),

    // The range of labels assigned within each group
    xWithinGroupDomain: _Ember['default'].computed.alias('_barGroups'),

    // The space (in pixels) allocated to each bar, including padding
    barWidth: _Ember['default'].computed('xGroupScale', function () {
      return this.get('xGroupScale').rangeBand();
    }),

    paddedGroupWidth: _Ember['default'].computed('timeDelta', 'xTimeScale', 'xBetweenGroupDomain', function () {
      var timeDelta = this.get('timeDelta');
      var scale = this.get('xTimeScale');
      var t1 = this.get('xBetweenGroupDomain')[0];
      var t2 = timeDelta === 'quarter' ? d3.time['month'].offset(t1, 3) : d3.time[timeDelta].offset(t1, 1);
      return scale(t2) - scale(t1);
    }),
    // ----------------------------------------------------------------------------
    // Line Drawing Scales
    // ----------------------------------------------------------------------------

    lineSeriesNames: _Ember['default'].computed('_groupedLineData', function () {
      var data = this.get('_groupedLineData');
      if (_Ember['default'].isEmpty(data)) {
        return [];
      }
      return data.map(function (d) {
        return d.group;
      });
    }),

    lineDataExtent: _Ember['default'].computed('_groupedLineData.@each.values', function () {
      var data = this.get('_groupedLineData');
      if (_Ember['default'].isEmpty(data)) {
        return [new Date(), new Date()];
      }

      var extents = _.map(data, 'values').map(function (series) {
        return d3.extent(series.map(function (d) {
          return d.time;
        }));
      });

      return [d3.min(extents, function (e) {
        return e[0];
      }), d3.max(extents, function (e) {
        return e[1];
      })];
    }),

    // The set of all time series
    xBetweenSeriesDomain: _Ember['default'].computed.alias('lineSeriesNames'),

    // The range of all time series
    xWithinSeriesDomain: _Ember['default'].computed.alias('lineDataExtent'),

    // ----------------------------------------------------------------------------
    // Ticks and Scales
    // ----------------------------------------------------------------------------

    // If there is a dynamic x axis, then assume the value that it is given,
    // and if it is not a dynamic x axis, set it to the number of x axis ticks.
    //
    // For a dynamic x axis, let the max number of labels be the minimum of
    // the number of x ticks and the assigned value. This is to prevent
    // the assigned value from being so large that labels flood the x axis.
    maxNumberOfLabels: _Ember['default'].computed('numXTicks', 'dynamicXAxis', 'maxNumberOfRotatedLabels', 'xAxisVertLabels', function (key, value) {
      var allowableTicks = this.get('numXTicks');
      if (this.get('xAxisVertLabels')) {
        allowableTicks = this.get('maxNumberOfRotatedLabels');
      }

      if (this.get('dynamicXAxis')) {
        if (isNaN(value)) {
          value = this.get('DEFAULT_MAX_NUMBER_OF_LABELS');
        }
        return Math.min(value, allowableTicks);
      } else {
        return allowableTicks;
      }
    }),

    // The footprint of a label rotated at -60 transform
    maxNumberOfRotatedLabels: _Ember['default'].computed('_innerTickSpacingX', 'graphicWidth', 'numXTicks', function () {
      var radianVal = 30 * (Math.PI / 180);
      var tickSpacing = Math.sin(radianVal) * this.get('_innerTickSpacingX');
      var numOfTicks = Math.floor(this.get('graphicWidth') / tickSpacing);

      return Math.max(numOfTicks, this.get('numXTicks'));
    }),

    // Create a domain that spans the larger range of bar or line data
    xDomain: _Ember['default'].computed('xBetweenGroupDomain', 'xWithinSeriesDomain', '_hasBarData', '_hasLineData', 'maxNumberOfLabels', function () {
      if (!this.get('_hasBarData')) {
        return this.get('xWithinSeriesDomain');
      }
      if (!this.get('_hasLineData')) {
        return this.get('xBetweenGroupDomain');
      }
      var minOfGroups = this.get('xBetweenGroupDomain')[0];
      var maxOfGroups = this.get('xBetweenGroupDomain')[1];
      var minOfSeries = this.get('xWithinSeriesDomain')[0];
      var maxOfSeries = this.get('xWithinSeriesDomain')[1];

      return [Math.min(minOfGroups, minOfSeries), Math.max(maxOfGroups, maxOfSeries)];
    }),

    // Largest and smallest values in line and bar data
    // Use raw bar data instead of doubly grouped hashes in groupedBarData
    yDomain: _Ember['default'].computed('_groupedLineData', '_groupedBarData', '_hasBarData', '_hasLineData', 'yAxisFromZero', function () {

      var lineData = this.get('_groupedLineData');
      var groupData = this.get('_groupedBarData');

      var maxOfSeries = d3.max(lineData, function (d) {
        return d3.max(d.values, function (dd) {
          return dd.value;
        });
      });

      var minOfSeries = d3.min(lineData, function (d) {
        return d3.min(d.values, function (dd) {
          return dd.value;
        });
      });

      var maxOfGroups = d3.max(groupData, function (d) {
        return d3.max(d, function (dd) {
          return dd.value;
        });
      });

      var minOfGroups = d3.min(groupData, function (d) {
        return d3.min(d, function (dd) {
          return dd.value;
        });
      });

      var hasBarData = this.get('_hasBarData');
      var hasLineData = this.get('_hasLineData');

      // Find the extent of whatever data is drawn on the graph,
      // e.g. max of only line data, or max of line
      var min, max;
      if (!hasBarData) {
        min = minOfSeries;
        max = maxOfSeries;
      } else if (!hasLineData) {
        min = minOfGroups;
        max = maxOfGroups;
      } else {
        min = Math.min(minOfGroups, minOfSeries);
        max = Math.max(maxOfGroups, maxOfSeries);
      }

      // Ensure the extent contains zero if that is desired. If all values in
      // the y-domain are equal, assign it a range so data can be displayed
      if (this.get('yAxisFromZero') || min === max) {
        if (max < 0) {
          return [min, 0];
        }
        if (min > 0) {
          return [0, max];
        }
        if (min === max && max === 0) {
          return [-1, 1];
        }
      }

      return [min, max];
    }),

    yRange: _Ember['default'].computed('graphicTop', 'graphicHeight', function () {
      return [this.get('graphicTop') + this.get('graphicHeight'), this.get('graphicTop')];
    }),

    yScale: _Ember['default'].computed('yDomain', 'yRange', 'numYTicks', function () {
      return d3.scale.linear().domain(this.get('yDomain')).range(this.get('yRange')).nice(this.get('numYTicks'));
    }),

    xRange: _Ember['default'].computed('graphicLeft', 'graphicWidth', function () {
      return [this.get('graphicLeft'), this.get('graphicLeft') + this.get('graphicWidth')];
    }),

    xTimeScale: _Ember['default'].computed('xDomain', 'xRange', function () {
      return d3.time.scale().domain(this.get('xDomain')).range(this.get('xRange'));
    }),

    xGroupScale: _Ember['default'].computed('xWithinGroupDomain', 'paddedGroupWidth', 'barPadding', 'barGroupPadding', function () {
      return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('paddedGroupWidth')], this.get('barPadding') / 2, this.get('barGroupPadding') / 2);
    }),

    // Override axis mix-in min and max values to listen to the scale's domain
    minAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[0];
    }),

    maxAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[1];
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this4 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        d3.select(element).classed('hovered', true);

        var time = data.labelTime != null ? data.labelTime : data.time;
        var content = $('<span>');
        content.append($("<span class=\"tip-label\">").text(_this4.get('formatTime')(time)));
        _this4.showTooltip(content.html(), d3.event);

        var formatLabelFunction = _this4.get('formatLabelFunction');

        var addValueLine = function addValueLine(d) {
          var name = $('<span class="name" />').text(d.group + ': ');
          var value = $('<span class="value" />').text(formatLabelFunction(d.value));
          content.append(name);
          content.append(value);
          content.append('<br />');
        };

        if (_Ember['default'].isArray(data.values)) {
          data.values.forEach(addValueLine);
        } else {
          addValueLine(data);
        }

        return _this4.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this5 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        d3.select(element).classed('hovered', false);
        return _this5.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    // Number of pixels to shift graphics away from origin line
    zeroDisplacement: 1,

    groupAttrs: _Ember['default'].computed('paddedGroupWidth', function () {
      var _this6 = this;

      return {
        transform: function transform() {
          return "translate(" + -_this6.get('paddedGroupWidth') / 2 + ",0)";
        }
      };
    }),

    groupedBarAttrs: _Ember['default'].computed('xTimeScale', 'xGroupScale', 'barWidth', 'yScale', 'zeroDisplacement', 'barLeftOffset', function () {

      var xTimeScale = this.get('xTimeScale');
      var xGroupScale = this.get('xGroupScale');
      var yScale = this.get('yScale');
      var zeroDisplacement = this.get('zeroDisplacement');

      return {
        'class': function _class(d, i) {
          return "grouping-" + i;
        },

        'stroke-width': 0,
        width: this.get('barWidth'),
        x: function x(d) {
          return xGroupScale(d.label) + xTimeScale(d.time);
        },

        y: function y(d) {
          return d.value > 0 ? yScale(d.value) : yScale(0) + zeroDisplacement;
        },

        height: function height(d) {
          // prevent zero-height bars from causing errors because of zeroDisplacement
          var zeroLine = Math.max(0, yScale.domain()[0]);
          return Math.max(0, Math.abs(yScale(zeroLine) - yScale(d.value)) - zeroDisplacement);
        }
      };
    }),

    line: _Ember['default'].computed('xTimeScale', 'yScale', 'interpolate', function () {
      var _this7 = this;

      return d3.svg.line().x(function (d) {
        return _this7.get('xTimeScale')(d.time);
      }).y(function (d) {
        return _this7.get('yScale')(d.value);
      }).interpolate(this.get('interpolate') ? 'basis' : 'linear');
    }),

    // Line styles. Implements Craig's design spec, which ensures that out of the
    // first six lines, there are always two distinguishing styles between every
    // pair of lines.
    // 1st line: ~2px, base color, solid
    // 2nd line: ~1px, 66% tinted, solid
    // 3rd line: ~2px, base color, dotted
    // 4th line: ~1px, 66% tinted, dotted
    // 5th line: ~3px, 33% tinted, solid
    // 6th line: ~3px, 33% tinted, dotted
    lineColorFn: _Ember['default'].computed(function () {
      var _this8 = this;

      return function (d, i) {
        var ii;
        switch (i) {
          case 0:
            ii = 0;
            break;
          case 1:
            ii = 2;
            break;
          case 2:
            ii = 0;
            break;
          case 3:
            ii = 2;
            break;
          case 4:
            ii = 0;
            break;
          case 5:
            ii = 1;
            break;
          default:
            ii = i;
        }
        return _this8.get('getSeriesColor')(d, ii);
      };
    }),

    lineAttrs: _Ember['default'].computed('line', 'getSeriesColor', function () {
      var _this9 = this;

      return {
        'class': function _class(d, i) {
          return "line series-" + i;
        },
        d: function d(_d) {
          return _this9.get('line')(_d.values);
        },
        stroke: this.get('lineColorFn'),
        'stroke-width': function strokeWidth(d, i) {
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

        'stroke-dasharray': function strokeDasharray(d, i) {
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
    }),

    // ----------------------------------------------------------------------------
    // Color Configuration
    // ----------------------------------------------------------------------------

    numLines: _Ember['default'].computed.alias('xBetweenSeriesDomain.length'),
    numBarsPerGroup: _Ember['default'].computed.alias('xWithinGroupDomain.length'),

    numColorSeries: 6, // Ember.computed.alias 'numLines'
    numSecondaryColorSeries: _Ember['default'].computed.alias('numBarsPerGroup'),

    // Use primary colors for bars if there are no lines

    secondaryMinimumTint: _Ember['default'].computed('numLines', function () {
      return this.get('numLines') === 0 ? 0.0 : 0.4;
    }),

    secondaryMaximumTint: _Ember['default'].computed('numLines', function () {
      return this.get('numLines') === 0 ? 0.8 : 0.85;
    }),

    // ----------------------------------------------------------------------------
    // Legend Configuration
    // ----------------------------------------------------------------------------

    hasLegend: _Ember['default'].computed('legendItems.length', 'showLegend', function () {
      return this.get('legendItems.length') > 1 && this.get('showLegend');
    }),

    legendItems: _Ember['default'].computed('xBetweenSeriesDomain', 'xWithinGroupDomain', 'getSeriesColor', 'getSecondarySeriesColor', function () {
      var _this10 = this;

      // getSeriesColor = this.get('getSeriesColor');
      // lineAttrs = this.get('lineAttrs');

      var result = this.get('xBetweenSeriesDomain').map(function (d, i) {
        // Line legend items
        var res = {
          label: d,
          stroke: _this10.get('lineAttrs')['stroke'](d, i),
          width: _this10.get('lineAttrs')['stroke-width'](d, i),
          dotted: _this10.get('lineAttrs')['stroke-dasharray'](d, i),
          icon: function icon() {
            return 'line';
          },
          selector: ".series-" + i
        };
        return res;
      }).concat(this.get('xWithinGroupDomain').map(function (d, i) {
        // Bar legend items
        var color = _this10.get('getSecondarySeriesColor')(d, i);
        var res = {
          stroke: color,
          fill: color,
          label: d,
          icon: function icon() {
            return 'square';
          },
          selector: ".grouping-" + i
        };
        return res;
      }));
      return result;
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    removeAllGroups: function removeAllGroups() {
      this.get('viewport').selectAll('.bars').remove();
    },

    groups: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.bars').data(this.get('_groupedBarData'));
    })["volatile"](),

    removeAllSeries: function removeAllSeries() {
      this.get('viewport').selectAll('.series').remove();
    },

    series: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.series').data(this.get('_groupedLineData'));
    })["volatile"](),

    xAxis: _Ember['default'].computed(function () {
      var xAxis = this.get('viewport').select('.x.axis');
      if (xAxis.empty()) {
        return this.get('viewport').insert('g', ':first-child').attr('class', 'x axis');
      } else {
        return xAxis;
      }
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      var yAxis = this.get('viewport').select('.y.axis');
      if (yAxis.empty()) {
        return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis');
      } else {
        return yAxis;
      }
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    renderVars: ['barLeftOffset', 'labelledTicks', 'xGroupScale', 'xTimeScale', 'yScale', 'xValueDisplayName', 'yValueDisplayName', 'hasAxisTitles', // backward compatibility support.
    'hasXAxisTitle', 'hasYAxisTitle', 'xTitleHorizontalOffset', 'yTitleVerticalOffset', 'xAxisVertLabels', 'maxNumberOfMinorTicks', 'graphicWidth'],

    drawChart: function drawChart() {
      this.updateBarData();
      this.updateLineData();
      this.updateLineMarkers();
      this.updateAxes();
      this.updateBarGraphic();
      this.updateLineGraphic();
      this.updateAxisTitles();
      if (this.get('hasLegend')) {
        this.drawLegend();
      } else {
        this.clearLegend();
      }
    },

    updateAxes: function updateAxes() {
      var xAxis = d3.svg.axis().scale(this.get('xTimeScale')).orient('bottom').tickValues(this.get('labelledTicks')).tickFormat(this.get('formattedTime')).tickSize(6, 3);

      var graphicTop = this.get('graphicTop');
      var graphicHeight = this.get('graphicHeight');
      var gXAxis = this.get('xAxis');

      // Put our x-axis in the right place
      gXAxis.attr({
        transform: "translate(0," + graphicTop + graphicHeight + ")"
      }).call(xAxis);

      // If we have minor ticks, this will select the applicable labels and alter
      // them
      this.filterMinorTicks();

      // Do we need to turn our axis labels?
      if (this.get('xAxisVertLabels')) {
        this._rotateXAxisLabels();
      } else {
        this._straightenXAxisLabels();
      }

      //tickSize draws the Y-axis allignment line across the whole of the graph.
      var yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatValueAxis'));

      var gYAxis = this.get('yAxis');

      // find the correct size of graphicLeft in order to fit the Labels perfectly
      this.set('graphicLeft', this.maxLabelLength(gYAxis.selectAll('text')) + this.get('labelPadding'));

      var graphicLeft = this.get('graphicLeft');
      gYAxis.attr('transform', "translate(" + graphicLeft + ",0)").call(yAxis);

      // Ensure ticks other than the zeroline are minor ticks
      gYAxis.selectAll('g').filter(function (d) {
        return d;
      }).classed('major', false).classed('minor', true);

      gYAxis.selectAll('text').style('text-anchor', 'end').attr({ x: -this.get('labelPadding') });
    },

    updateBarData: function updateBarData() {
      // Always remove the previous bars, this allows us to maintain the
      // rendering order of bars behind lines
      this.removeAllGroups();

      var groups = this.get('groups');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      // Ensure bars are always inserted behind lines
      groups.enter().insert('g', '.series').attr('class', 'bars');
      groups.exit().remove();

      var bars = groups.selectAll('rect').data(function (d) {
        return d;
      });
      bars.enter().append('rect').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      bars.exit().remove();
    },

    updateBarGraphic: function updateBarGraphic() {
      var groups = this.get('groups');
      groups.attr(this.get('groupAttrs'));
      groups.selectAll('rect').style('fill', this.get('getSecondarySeriesColor')).attr(this.get('groupedBarAttrs'));
    },

    updateLineData: function updateLineData() {
      // Always remove the previous lines, this allows us to maintain the
      // rendering order of bars behind lines
      this.removeAllSeries();

      var series = this.get('series');
      series.enter().append('g').attr('class', 'series').append('path').attr('class', 'line');
      series.exit().remove();
    },

    updateLineGraphic: function updateLineGraphic() {
      var series = this.get('series');
      var graphicTop = this.get('graphicTop');
      series.attr('transform', "translate(0, " + graphicTop + ")");
      return series.select('path.line').attr(this.get('lineAttrs'));
    }
  });

  module.exports = TimeSeriesChartComponent;
});
define('ember-charts/components/vertical-bar-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/floating-tooltip', '../mixins/axes', '../mixins/formattable', '../mixins/sortable-chart', '../mixins/no-margin-chart', '../mixins/axis-titles', '../utils/group-by', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsFloatingTooltip, _mixinsAxes, _mixinsFormattable, _mixinsSortableChart, _mixinsNoMarginChart, _mixinsAxisTitles, _utilsGroupBy, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _LegendMixin = _interopRequireDefault(_mixinsLegend);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _AxesMixin = _interopRequireDefault(_mixinsAxes);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _SortableChartMixin = _interopRequireDefault(_mixinsSortableChart);

  var _NoMarginChartMixin = _interopRequireDefault(_mixinsNoMarginChart);

  var _AxisTitlesMixin = _interopRequireDefault(_mixinsAxisTitles);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  var VerticalBarChartComponent = _ChartComponent['default'].extend(_LegendMixin['default'], _FloatingTooltipMixin['default'], _AxesMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], _NoMarginChartMixin['default'], _AxisTitlesMixin['default'], {

    classNames: ['chart-vertical-bar'],

    // ----------------------------------------------------------------------------
    // Vertical Bar Chart Options
    // ----------------------------------------------------------------------------

    // Data without group will be merged into a group with this name
    ungroupedSeriesName: 'Other',

    // If stackBars is yes then it stacks bars, otherwise it groups them
    // horizontally. Stacking discards negative data.
    // TODO(nick): make stacked bars deal gracefully with negative data
    stackBars: false,

    // Space between bars, as fraction of bar size
    withinGroupPadding: 0,

    // Space between bar groups, as fraction of group size
    betweenGroupPadding: _Ember['default'].computed('numBars', function () {
      // Use padding to make sure bars have a maximum thickness.
      //
      // TODO(tony): Use exact padding + bar width calculation
      // We have some set amount of bewtween group padding we use depending
      // on the number of bars there are in the chart. Really, what we would want
      // to do is have the equation for bar width based on padding and use that
      // to set the padding exactly.
      var scale = d3.scale.linear().domain([1, 8]).range([1.25, 0.25]).clamp(true);
      return scale(this.get('numBars'));
    }),

    numBars: _Ember['default'].computed('xBetweenGroupDomain', 'xWithinGroupDomain', function () {
      return this.get('xBetweenGroupDomain.length') * this.get('xWithinGroupDomain.length') || 0;
    }),

    // Space allocated for rotated labels on the bottom of the chart. If labels
    // are rotated, they will be extended beyond labelHeight up to maxLabelHeight
    maxLabelHeight: 50,

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    sortedData: _Ember['default'].computed('data.[]', 'sortKey', 'sortAscending', 'stackBars', function () {
      var data, group, groupData, groupObj, groupedData, key, newData, sortAscending, sortedGroups, summedGroupValues, _i, _len;
      if (this.get('stackBars')) {
        data = this.get('data');
        groupedData = _.groupBy(data, function (d) {
          return d.group;
        });
        summedGroupValues = _Ember['default'].A();

        var reduceByValue = function reduceByValue(previousValue, dataObject) {
          return previousValue + dataObject.value;
        };

        for (group in groupedData) {
          groupData = groupedData[group];
          if (group !== null) {
            summedGroupValues.pushObject({
              group: group,
              value: groupData.reduce(reduceByValue, 0)
            });
          }
        }
        key = this.get('sortKey');
        sortAscending = this.get('sortAscending');
        if (_Ember['default'].isEmpty(summedGroupValues)) {
          return _Ember['default'].A();
        } else if (key != null) {
          sortedGroups = summedGroupValues.sortBy(key);
          if (!sortAscending) {
            sortedGroups = sortedGroups.reverse();
          }
          newData = _Ember['default'].A();
          for (_i = 0, _len = sortedGroups.length; _i < _len; _i++) {
            groupObj = sortedGroups[_i];
            newData.pushObjects(groupedData[groupObj.group]);
          }
          return newData;
        } else {
          return data;
        }
      } else {
        return this._super();
      }
    }),

    // Aggregates objects provided in `data` in a dictionary, keyed by group names
    groupedData: _Ember['default'].computed('sortedData', 'stackBars', 'ungroupedSeriesName', function () {
      var _this = this;

      var data = this.get('sortedData');
      if (_Ember['default'].isEmpty(data)) {
        // TODO(embooglement): this can't be `Ember.A()` because it needs to be an
        // actual empty array for tests to pass, and `Ember.NativeArray` adds
        // a bunch of stuff to the prototype that gets enumerated by `_.values`
        // in `individualBarLabels`
        return [];
      }
      data = (0, _utilsGroupBy.groupBy)(data, function (d) {
        return d.group || _this.get('ungroupedSeriesName');
      });

      // After grouping, the data points may be out of order, and therefore not properly
      // matched with their value and color. Here, we resort to ensure proper order.
      // This could potentially be addressed with a refactor where sorting happens after
      // grouping across the board.
      // TODO(ember-charts-lodash): Use _.mapValues instead of the each loop.
      _.each(_.keys(data), function (groupName) {
        data[groupName] = _.sortBy(data[groupName], 'label');
      });

      return data;
    }),

    groupNames: _Ember['default'].computed('groupedData', function () {
      return _.keys(this.get('groupedData'));
    }),

    // We know the data is grouped because it has more than one label. If there
    // are no labels on the data then every data object will have
    // 'ungroupedSeriesName' as its group name and the number of group
    // labels will be 1. If we are passed ungrouped data we will display
    // each data object in its own group.
    isGrouped: _Ember['default'].computed('groupNames.length', function () {
      var result = this.get('groupNames.length') > 1;
      return result;
    }),

    finishedData: _Ember['default'].computed('groupedData', 'isGrouped', 'stackBars', 'sortedData', function () {
      var y0, stackedValues;
      if (this.get('isGrouped')) {
        if (_Ember['default'].isEmpty(this.get('groupedData'))) {
          return _Ember['default'].A();
        }

        return _.map(this.get('groupedData'), function (values, groupName) {
          y0 = 0;
          stackedValues = _.map(values, function (d) {
            return {
              y0: y0,
              y1: y0 += Math.max(d.value, 0),
              value: d.value,
              group: d.group,
              label: d.label,
              color: d.color
            };
          });

          return {
            group: groupName,
            values: values,
            stackedValues: stackedValues,
            totalValue: y0
          };
        });
      } else if (this.get('stackBars')) {
        if (_Ember['default'].isEmpty(this.get('data'))) {
          return _Ember['default'].A();
        }
        // If we do not have grouped data and are drawing stacked bars, keep the
        // data in one group so it gets stacked
        y0 = 0;
        stackedValues = _.map(this.get('data'), function (d) {
          return {
            y0: y0,
            y1: y0 += Math.max(d.value, 0),
            value: d.value,
            group: d.group,
            label: d.label,
            color: d.color
          };
        });

        return _Ember['default'].A([{
          group: this.get('data.firstObject.group'),
          values: this.get('data'),
          stackedValues: stackedValues,
          totalValue: y0
        }]);
      } else {

        if (_Ember['default'].isEmpty(this.get('data'))) {
          return _Ember['default'].A();
        }
        // If we do NOT have grouped data and do not have stackBars turned on, split the
        // data up so it gets drawn in separate groups and labeled
        return _.map(this.get('sortedData'), function (d) {
          return {
            group: d.label,
            values: [d]
          };
        });
      }
      // TODO(tony): Need to have stacked bars as a dependency here and the
      // calculation be outside of this
    }),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    labelHeightOffset: _Ember['default'].computed('_shouldRotateLabels', 'maxLabelHeight', 'labelHeight', 'labelPadding', function () {

      var labelSize = this.get('_shouldRotateLabels') ? this.get('maxLabelHeight') : this.get('labelHeight');
      return labelSize + this.get('labelPadding');
    }),

    // Chart Graphic Dimensions
    graphicLeft: _Ember['default'].computed.alias('labelWidthOffset'),

    graphicWidth: _Ember['default'].computed('width', 'labelWidthOffset', function () {
      return this.get('width') - this.get('labelWidthOffset');
    }),

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', function () {
      return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
    }),

    // ----------------------------------------------------------------------------
    // Ticks and Scales
    // ----------------------------------------------------------------------------

    // Vertical position/length of each bar and its value
    yDomain: _Ember['default'].computed('finishedData', 'stackBars', function () {
      var finishedData = this.get('finishedData');
      var minOfGroups = d3.min(finishedData, function (d) {
        return _.min(d.values.map(function (dd) {
          return dd.value;
        }));
      });

      var maxOfGroups = d3.max(finishedData, function (d) {
        return _.max(d.values.map(function (dd) {
          return dd.value;
        }));
      });

      var maxOfStacks = d3.max(finishedData, function (d) {
        return d.totalValue;
      });

      // minOfStacks is always zero since we do not compute negative stacks
      // TODO(nick): make stacked bars deal gracefully with negative data
      var minOfStacks = d3.min(finishedData, function () {
        return 0;
      });

      var min, max;
      if (this.get('stackBars')) {
        min = minOfStacks;
        max = maxOfStacks;
      } else {
        min = minOfGroups;
        max = maxOfGroups;
      }

      // force one end of the range to include zero
      if (min > 0) {
        return [0, max];
      }
      if (max < 0) {
        return [min, 0];
      }
      if (min === 0 && max === 0) {
        return [0, 1];
      } else {
        return [min, max];
      }
    }),

    yScale: _Ember['default'].computed('graphicTop', 'graphicHeight', 'yDomain', 'numYTicks', function () {
      return d3.scale.linear().domain(this.get('yDomain')).range([this.get('graphicTop') + this.get('graphicHeight'), this.get('graphicTop')]).nice(this.get('numYTicks'));
    }),

    groupedIndividualBarLabels: _Ember['default'].computed('groupedData.[]', function () {
      var groups = _.map(_.values(this.get('groupedData')), function (g) {
        return _.pluck(g, 'label');
      });
      return _.uniq(_.flatten(groups));
    }),

    ungroupedIndividualBarLabels: _Ember['default'].computed('sortedData.@each.label', function () {
      return _.map(this.get('sortedData'), 'label');
    }),

    // The labels of the bars in the chart.
    //
    // When the bars in the chart are grouped, this CP returns the de-duplicated
    // set of labels that can appear within a single group,
    // in the order that they should appear in the group.
    // Per this.groupedData, this order is lexicographical by the label name,
    // regardless of this.sortKey. That is to ensure that the bar for
    // a given label is always in the same position within every group.
    // (See: https://github.com/Addepar/ember-charts/pull/81 )
    //
    // When the chart is not grouped, the labels are in the order that they
    // appear in the sorted bar data points, and are not de-duplicated.
    // (This is okay because whether or not the chart is grouped,
    // the client has the responsibility to make sure there are no dupe
    // (bar label, group label) pairs in the bar data.)
    //
    individualBarLabels: _Ember['default'].computed('isGrouped', 'stackBars', 'groupedIndividualBarLabels', 'ungroupedIndividualBarLabels', function () {
      if (this.get('isGrouped') || this.get('stackBars')) {
        return this.get('groupedIndividualBarLabels');
      } else {
        return this.get('ungroupedIndividualBarLabels');
      }
    }),

    labelIDMapping: _Ember['default'].computed('individualBarLabels.[]', function () {
      return this.get('individualBarLabels').reduce(function (previousValue, label, index) {
        previousValue[label] = index;
        return previousValue;
      }, {});
    }),

    // The range of labels assigned to each group
    xBetweenGroupDomain: _Ember['default'].computed.alias('groupNames'),
    // xBetweenGroupDomain: [],

    // The range of labels assigned within each group
    xWithinGroupDomain: _Ember['default'].computed.alias('individualBarLabels'),

    // The space in pixels allocated to each group
    groupWidth: _Ember['default'].computed('xBetweenGroupScale', function () {
      return this.get('xBetweenGroupScale').rangeBand();
    }),

    // The space in pixels allocated to each bar
    barWidth: _Ember['default'].computed('xWithinGroupScale', function () {
      return this.get('xWithinGroupScale').rangeBand();
    }),

    // The scale used to position bars within each group
    // If we do not have grouped data, use the withinGroupPadding around group
    // data since we will have constructed groups for each bar.
    xWithinGroupScale: _Ember['default'].computed('isGrouped', 'stackBars', 'xWithinGroupDomain', 'groupWidth', 'withinGroupPadding', 'betweenGroupPadding', function () {

      if (this.get('isGrouped') || this.get('stackBars')) {
        return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('groupWidth')], this.get('withinGroupPadding') / 2, 0);
      } else {
        return d3.scale.ordinal().domain(this.get('xWithinGroupDomain')).rangeRoundBands([0, this.get('groupWidth')], this.get('betweenGroupPadding') / 2, this.get('betweenGroupPadding') / 2);
      }
    }),

    // The scale used to position each group and label across the horizontal axis
    // If we do not have grouped data, do not add additional padding around groups
    // since this will only add whitespace to the left/right of the graph.
    xBetweenGroupScale: _Ember['default'].computed('isGrouped', 'stackBars', 'graphicWidth', 'labelWidth', 'xBetweenGroupDomain', 'betweenGroupPadding', function () {

      // var labelWidth = this.get('labelWidth');
      var betweenGroupPadding;

      if (this.get('isGrouped') || this.get('stackBars')) {
        betweenGroupPadding = this.get('betweenGroupPadding');
      } else {
        betweenGroupPadding = 0;
      }

      return d3.scale.ordinal().domain(this.get('xBetweenGroupDomain')).rangeRoundBands([0, this.get('graphicWidth')], betweenGroupPadding / 2, betweenGroupPadding / 2);
    }),

    // Override axis mix-in min and max values to listen to the scale's domain
    minAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[0];
    }),

    maxAxisValue: _Ember['default'].computed('yScale', function () {
      var yScale = this.get('yScale');
      return yScale.domain()[1];
    }),

    // ----------------------------------------------------------------------------
    // Color Configuration
    //
    // We cannot pass the mixed-in method this.getSeriesColor() directly to d3
    // as the callback to use to color the bars.
    // This is because for bar groups that do not have a meaningful
    // non-zero value for an individual bar, the client is free to not pass
    // a data point for that pair of (group, label) at all.
    //
    // In that case, when we use d3 to render bar groups with omitted bars,
    // using this.getSeriesColor() would tell d3 to use a color palette
    // with _more_ colors than bars in the bar group (since the number of colors
    // in the palette is this.numColorSeries).
    // Hence some bars would likely get a color that doesn't match the color
    // used for bars with the same label in other bar groups.
    //
    // So instead, we provide our own callback this.fnGetBarColor()
    // that looks at the bar label first and tries to look up the color
    // based on that. If that fails, then fnGetBarColor() defers to getSeriesColor().
    //
    // Note that we still use getSeriesColors() to initialize the mapping
    // from bar label to bar color, so it would be confusing if we tried to
    // override the property altogether.
    //
    // See bug #172 : https://github.com/Addepar/ember-charts/issues/172
    // ----------------------------------------------------------------------------

    numColorSeries: _Ember['default'].computed.alias('individualBarLabels.length'),

    barColors: _Ember['default'].computed('individualBarLabels.[]', 'getSeriesColor', function () {
      var fnGetSeriesColor = this.get('getSeriesColor');
      var result = {};
      this.get('individualBarLabels').forEach(function (label, labelIndex) {
        result[label] = fnGetSeriesColor(label, labelIndex);
      });
      return result;
    }),

    fnGetBarColor: _Ember['default'].computed('barColors', function () {
      var barColors = this.get('barColors');
      return function (d) {
        if (!_Ember['default'].isNone(d.color)) {
          return d.color;
        } else if (!_Ember['default'].isNone(d.label)) {
          return barColors[d.label];
        } else {
          return barColors[d];
        }
      };
    }),

    // ----------------------------------------------------------------------------
    // Legend Configuration
    // ----------------------------------------------------------------------------

    hasLegend: _Ember['default'].computed('stackBars', 'isGrouped', 'legendItems.length', 'showLegend', function () {
      return this.get('stackBars') || this.get('isGrouped') && this.get('legendItems.length') > 1 && this.get('showLegend');
    }),

    legendItems: _Ember['default'].computed('individualBarLabels.[]', 'barColors', 'stackBars', 'labelIDMapping.[]', function () {
      var _this2 = this;

      var barColors = this.get('barColors');
      return this.get('individualBarLabels').map(function (label, i) {
        var color = barColors[label];
        if (_this2.get('stackBars')) {
          i = _this2.get('labelIDMapping')[label];
        }
        return {
          label: label,
          fill: color,
          stroke: color,
          icon: function icon() {
            return 'square';
          },
          selector: ".grouping-" + i
        };
      });
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showDetails: _Ember['default'].computed('isInteractive', function () {
      var _this3 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // Specify whether we are on an individual bar or group
        var isGroup = _Ember['default'].isArray(data.values);

        // Do hover detail style stuff here
        element = isGroup ? element.parentNode.parentNode : element;
        d3.select(element).classed('hovered', true);

        // Show tooltip
        var tipLabel = data.group ? $("<span class=\"tip-label\" />").text(data.group) : '';
        var content = $("<span />").append(tipLabel);

        var formatLabel = _this3.get('formatLabelFunction');
        var addValueLine = function addValueLine(d) {
          var label = $("<span class=\"name\" />").text(d.label + ": ");
          content.append(label);
          var value = $("<span class=\"value\">").text(formatLabel(d.value));
          content.append(value);
          content.append('<br />');
        };

        if (isGroup) {
          // Display all bar details if hovering over axis group label
          data.values.forEach(addValueLine);
        } else {
          // Just hovering over single bar
          addValueLine(data);
        }
        return _this3.showTooltip(content.html(), d3.event);
      };
    }),

    hideDetails: _Ember['default'].computed('isInteractive', function () {
      var _this4 = this;

      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      return function (data, i, element) {
        // if we exited the group label undo for the group
        if (_Ember['default'].isArray(data.values)) {
          element = element.parentNode.parentNode;
        }
        // Undo hover style stuff
        d3.select(element).classed('hovered', false);

        // Hide Tooltip
        return _this4.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    groupAttrs: _Ember['default'].computed('graphicLeft', 'graphicTop', 'xBetweenGroupScale', function () {
      var _this5 = this;

      var xBetweenGroupScale = this.get('xBetweenGroupScale');

      return {
        transform: function transform(d) {
          var dx = xBetweenGroupScale(d.group) ? _this5.get('graphicLeft') + xBetweenGroupScale(d.group) : _this5.get('graphicLeft');
          var dy = _this5.get('graphicTop');

          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    commonBarAttrs: _Ember['default'].computed('labelIDMapping.[]', function () {
      var _this6 = this;

      return {
        'class': function _class(d) {
          var id = _this6.get('labelIDMapping')[d.label];
          return "grouping-" + id;
        }
      };
    }),

    stackedBarAttrs: _Ember['default'].computed('commonBarAttrs', 'yScale', 'groupWidth', function () {
      var _this7 = this;

      var zeroDisplacement = 1;
      var yScale = this.get('yScale');

      return _.assign({
        'stroke-width': 0,
        width: function width() {
          return _this7.get('groupWidth');
        },
        x: null,
        y: function y(barSection) {
          return yScale(barSection.y1) + zeroDisplacement;
        },
        height: function height(barSection) {
          return yScale(barSection.y0) - yScale(barSection.y1);
        }
      }, this.get('commonBarAttrs'));
    }),

    groupedBarAttrs: _Ember['default'].computed('commonBarAttrs', 'yScale', 'barWidth', 'xWithinGroupScale', function () {
      var _this8 = this;

      var zeroDisplacement = 1;
      var yScale = this.get('yScale');

      return _.assign({
        'stroke-width': 0,
        width: function width() {
          return _this8.get('barWidth');
        },
        x: function x(d) {
          return _this8.get('xWithinGroupScale')(d.label);
        },
        height: function height(d) {
          return Math.max(0, Math.abs(yScale(d.value) - yScale(0)) - zeroDisplacement);
        },
        y: function y(d) {
          if (d.value > 0) {
            return yScale(d.value);
          } else {
            return yScale(0) + zeroDisplacement;
          }
        }
      }, this.get('commonBarAttrs'));
    }),

    labelAttrs: _Ember['default'].computed('barWidth', 'isGrouped', 'stackBars', 'groupWidth', 'xWithinGroupScale', 'graphicTop', 'graphicHeight', 'labelPadding', function () {
      var _this9 = this;

      return {
        'stroke-width': 0,
        transform: function transform(d) {
          var dx = _this9.get('barWidth') / 2;
          if (_this9.get('isGrouped') || _this9.get('stackBars')) {
            dx += _this9.get('groupWidth') / 2 - _this9.get('barWidth') / 2;
          } else {
            dx += _this9.get('xWithinGroupScale')(d.group);
          }
          var dy = _this9.get('graphicTop') + _this9.get('graphicHeight') + _this9.get('labelPadding');
          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    groups: _Ember['default'].computed(function () {
      return this.get('viewport').selectAll('.bars').data(this.get('finishedData'));
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      var yAxis = this.get('viewport').select('.y.axis');
      if (yAxis.empty()) {
        return this.get('viewport').insert('g', ':first-child').attr('class', 'y axis');
      } else {
        return yAxis;
      }
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Label Layout
    // ----------------------------------------------------------------------------

    // Space available for labels that are horizontally displayed. This is either
    // the unpadded group width or bar width depending on whether data is grouped
    maxLabelWidth: _Ember['default'].computed('isGrouped', 'stackBars', 'groupWidth', 'barWidth', function () {
      if (this.get('isGrouped') || this.get('stackBars')) {
        return this.get('groupWidth');
      } else {
        return this.get('barWidth');
      }
    }),

    _shouldRotateLabels: false,

    setRotateLabels: function setRotateLabels() {
      var labels, maxLabelWidth, rotateLabels;
      labels = this.get('groups').select('.groupLabel text');
      maxLabelWidth = this.get('maxLabelWidth');
      rotateLabels = false;
      if (this.get('rotatedLabelLength') > maxLabelWidth) {
        labels.each(function () {
          if (this.getBBox().width > maxLabelWidth) {
            return rotateLabels = true;
          }
        });
      }
      return this.set('_shouldRotateLabels', rotateLabels);
    },

    // Calculate the number of degrees to rotate labels based on how widely labels
    // will be spaced, but never rotate the labels less than 20 degrees
    rotateLabelDegrees: _Ember['default'].computed('labelHeight', 'maxLabelWidth', function () {
      var radians = Math.atan(this.get('labelHeight') / this.get('maxLabelWidth'));
      var degrees = radians * 180 / Math.PI;
      return Math.max(degrees, 20);
    }),

    rotatedLabelLength: _Ember['default'].computed('maxLabelHeight', 'rotateLabelDegrees', function () {
      var rotateLabelRadians = Math.PI / 180 * this.get('rotateLabelDegrees');
      return Math.abs(this.get('maxLabelHeight') / Math.sin(rotateLabelRadians));
    }),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    renderVars: ['xWithinGroupScale', 'xBetweenGroupScale', 'yScale', 'finishedData', 'getSeriesColor', 'xValueDisplayName', 'yValueDisplayName', 'hasAxisTitles', // backward compatibility support.
    'hasXAxisTitle', 'hasYAxisTitle', 'xTitleHorizontalOffset', 'yTitleVerticalOffset'],

    drawChart: function drawChart() {
      this.updateData();
      this.updateLayout();
      this.updateAxes();
      this.updateGraphic();
      this.updateAxisTitles();
      if (this.get('hasLegend')) {
        return this.drawLegend();
      } else {
        return this.clearLegend();
      }
    },

    updateData: function updateData() {
      var groups = this.get('groups');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      var entering = groups.enter().append('g').attr('class', 'bars');
      entering.append('g').attr('class', 'groupLabel').append('text').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      groups.exit().remove();

      var subdata;
      if (this.get('stackBars')) {
        subdata = function (d) {
          return d.stackedValues;
        };
      } else {
        subdata = function (d) {
          return d.values;
        };
      }

      var bars = groups.selectAll('rect').data(subdata);
      bars.enter().append('rect').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      });
      return bars.exit().remove();
    },

    updateLayout: function updateLayout() {
      var _this10 = this;

      var groups = this.get('groups');
      var labels = groups.select('.groupLabel text').attr('transform', null) // remove any previous rotation attrs
      .text(function (d) {
        return d.group;
      });

      // If there is enough space horizontally, center labels underneath each
      // group. Otherwise, rotate each label and anchor it at the top of its
      // first character.
      this.setRotateLabels();
      var labelTrimmer;

      if (this.get('_shouldRotateLabels')) {
        var rotateLabelDegrees = this.get('rotateLabelDegrees');
        labelTrimmer = _LabelTrimmer['default'].create({
          getLabelSize: function getLabelSize() {
            return _this10.get('rotatedLabelLength');
          },
          getLabelText: function getLabelText(d) {
            return d.group;
          }
        });

        return labels.call(labelTrimmer.get('trim')).attr({
          'text-anchor': 'end',
          transform: "rotate(" + -rotateLabelDegrees + ")",
          dy: function dy() {
            return this.getBBox().height;
          }
        });
      } else {
        var maxLabelWidth = this.get('maxLabelWidth');
        labelTrimmer = _LabelTrimmer['default'].create({
          getLabelSize: function getLabelSize() {
            return maxLabelWidth;
          },
          getLabelText: function getLabelText(d) {
            return d.group != null ? d.group : '';
          }
        });

        return labels.call(labelTrimmer.get('trim')).attr({
          'text-anchor': 'middle',
          dy: this.get('labelPadding')
        });
      }
    },

    updateAxes: function updateAxes() {
      //tickSize isn't doing anything here, it should take two arguments
      var yAxis = d3.svg.axis().scale(this.get('yScale')).orient('right').ticks(this.get('numYTicks')).tickSize(this.get('graphicWidth')).tickFormat(this.get('formatValueAxis'));

      var gYAxis = this.get('yAxis');

      // find the correct size of graphicLeft in order to fit the Labels perfectly
      this.set('graphicLeft', this.maxLabelLength(gYAxis.selectAll('text')) + this.get('labelPadding'));

      var graphicTop = this.get('graphicTop');
      var graphicLeft = this.get('graphicLeft');
      gYAxis.attr({ transform: "translate(" + graphicLeft + ", " + graphicTop + ")" }).call(yAxis);

      gYAxis.selectAll('g').filter(function (d) {
        return d !== 0;
      }).classed('major', false).classed('minor', true);

      gYAxis.selectAll('text').style('text-anchor', 'end').attr({
        x: -this.get('labelPadding')
      });
    },

    updateGraphic: function updateGraphic() {
      var groups = this.get('groups');

      var barAttrs = this.get('stackBars') ? this.get('stackedBarAttrs') : this.get('groupedBarAttrs');

      groups.attr(this.get('groupAttrs'));
      groups.selectAll('rect').attr(barAttrs).style('fill', this.get('fnGetBarColor'));
      return groups.select('g.groupLabel').attr(this.get('labelAttrs'));
    }
  });

  module.exports = VerticalBarChartComponent;
});
define('ember-charts/mixins/axes', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({

    // # ------------------------------------------------------------------------
    // # API -- Inputs
    // #
    // # graphicWidth (req.): The width of the graphic to be given axes
    // # graphicHeight (req.): The width of the graphic to be given axes
    // # minXTicks: The minimum number of ticks to appear on the X axis
    // # minYTicks: The minimum number of ticks to appear on the Y axis
    // # tickSpacing: Number of pixels between ticks on axes
    // # minAxisValue: The minimum value appearing on an axis using numeric values
    // # maxAxisValue: The maximum value appearing on an axis using numeric values
    // # ------------------------------------------------------------------------
    graphicWidth: null,
    graphicHeight: null,
    minXTicks: 3,
    minYTicks: 3,
    minAxisValue: 0,
    maxAxisValue: 0,

    /**
     * We used to have only one option to set tick spacing for both x and y axes.
     * We keep this attribute for backward compatibility.
     * @type {number}
     * @deprecated This will be deprecated in version 1.0.
     */
    tickSpacing: 50,

    /**
     * Tick spacing on X axis. Set this value if we want a different tickSpacing
     * for X axis other than the default one set in tickSpacing for both axes
     * @type {number}
     */
    tickSpacingX: null,

    /**
     * Tick spacing on Y axis. Set this value if we want a different tickSpacing
     * for Y axis other than the default one set in tickSpacing for both axes
     * @type {number}
     */
    tickSpacingY: null,

    /**
     * This will be used for all internal calculation of tick spacing on X axis.
     * We set higher priority if the specific tickSpacingX's value is set.
     * @type {number}
     * @private
     */
    _innerTickSpacingX: _Ember['default'].computed('tickSpacingX', 'tickSpacing', function () {
      var tickSpacingX = this.get('tickSpacingX');
      if (_Ember['default'].isNone(tickSpacingX)) {
        return this.get('tickSpacing');
      }
      return tickSpacingX;
    }),

    /**
     * This will be used for all internal calculation of tick spacing on Y axis.
     * We set higher priority if the specific tickSpacingY's value is set.
     * @type {number}
     * @private
     */
    _innerTickSpacingY: _Ember['default'].computed('tickSpacingY', 'tickSpacing', function () {
      var tickSpacingY = this.get('tickSpacingY');
      if (_Ember['default'].isNone(tickSpacingY)) {
        return this.get('tickSpacing');
      }
      return tickSpacingY;
    }),

    // # ------------------------------------------------------------------------
    // # API -- Outputs
    // #
    // # numXTicks: Number of ticks on the X axis
    // # numYTicks: Number of ticks on the Y axis
    // # formatValueAxis: Overridable formatter for numeric values along an axis
    // # ------------------------------------------------------------------------
    numXTicks: _Ember['default'].computed('graphicWidth', '_innerTickSpacingX', 'minXTicks', function () {
      var tickSpacing = this.get('_innerTickSpacingX');
      var numOfTicks = Math.floor(this.get('graphicWidth') / tickSpacing);
      return Math.max(numOfTicks, this.get('minXTicks'));
    }),

    numYTicks: _Ember['default'].computed('graphicHeight', '_innerTickSpacingY', 'minYTicks', function () {
      var tickSpacing = this.get('_innerTickSpacingY');
      var numOfTicks = Math.floor(this.get('graphicHeight') / tickSpacing);
      return Math.max(numOfTicks, this.get('minYTicks'));
    }),

    formatValueAxis: _Ember['default'].computed('minAxisValue', 'maxAxisValue', function () {
      // # Base the format prefix on largest magnitude (e.g. if we cross from
      // # hundreds of thousands into millions, use millions)
      var absMinAxisValue = Math.abs(this.get('minAxisValue'));
      var absMaxAxisValue = Math.abs(this.get('maxAxisValue'));
      var magnitude = Math.max(absMinAxisValue, absMaxAxisValue);
      var prefix = d3.formatPrefix(magnitude);
      return function (value) {
        return "" + prefix.scale(value) + prefix.symbol;
      };
    })
  });
});
define('ember-charts/mixins/axis-titles', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  /**
   * Adds axis titles to a chart and sets left/bottom margins to allow space
   * for the axis titles
   * Axis titles are set through the `xValueDisplayName` and `yValueDisplayName`
   * Spacing on the left is managed through the `horizontalMarginLeft`
   * Spacing on the bottom is managed through `axisTitleHeight` and `labelPadding`
   *
   * @mixin
   */
  var AxisTitlesMixin = _Ember['default'].Mixin.create({
    /**
     * Toggle axis X title on/off
     * @type {Boolean}
     */
    hasXAxisTitle: false,

    /**
     * Toggle axis Y title on/off
     * @type {Boolean}
     */
    hasYAxisTitle: false,

    /**
     * A deprecated property to support backward compatability.
     * TODO: Add ember deprecated helper function for this property.
     * @deprecated
     */
    hasAxisTitles: _Ember['default'].computed('hasXAxisTitle', 'hasYAxisTitle', function (key, value) {
      if (arguments.length > 1) {
        // Setter case.
        this.set('hasXAxisTitle', value);
        this.set('hasYAxisTitle', value);
      }

      return this.get('hasXAxisTitle') || this.get('hasYAxisTitle');
    }),

    /**
     * Title for the x axis
     * @type {String}
     */
    xValueDisplayName: null,

    /**
     * Title for the y axis
     * @type {String}
     */
    yValueDisplayName: null,

    /**
     * A variable to allow user to config the amount of horizontal offset for x
     * axis title.
     * @type {Number}
     */
    xTitleHorizontalOffset: _Ember['default'].computed('width', 'graphicWidth', function () {
      return -(this.get('width') - this.get('graphicWidth')) / 2;
    }),

    /**
     * A variable to allow user to config the amount of veritcal offset for x
     * axis title.
     * @type {Number}
     */
    xTitleVerticalOffset: 10,

    /**
     * A variable to allow user to config the amount of offset for y axis title.
     * @type {Number}
     */
    yTitleVerticalOffset: 0,

    /**
     * Computed title for the x axis, if the `hasXAxisTitle` boolean is false
     * `xAxisTitleDisplayValue` should be an empty string
     * @type {String}
     */
    xAxisTitleDisplayValue: _Ember['default'].computed('hasXAxisTitle', 'xValueDisplayName', function () {
      return this.get('hasXAxisTitle') ? this.get('xValueDisplayName') : '';
    }),

    /**
     * Computed title for the x axis, if the `hasYAxisTitle` boolean is false
     * `yAxisTitleDisplayValue` should be an empty string
     * @type {String}
     */
    yAxisTitleDisplayValue: _Ember['default'].computed('hasYAxisTitle', 'yValueDisplayName', function () {
      return this.get('hasYAxisTitle') ? this.get('yValueDisplayName') : '';
    }),

    /**
     * Default left margin, allows for enough space for the y axis label
     * @type {Number}
     */
    horizontalMarginLeft: 20,

    // Height of the text for the axis titles
    axisTitleHeight: 10,

    /**
     * If `hasYAxisTitle` is false there should be no margin on the left side,
     * while if true the left margin should be the value of `horizontalMarginLeft`
     * @type {Number}
     */
    marginLeft: _Ember['default'].computed('hasYAxisTitle', 'horizontalMarginLeft', function () {
      return this.get('hasYAxisTitle') ? this.get('horizontalMarginLeft') : 0;
    }),

    // TODO(tony): Just use axisBottomOffset here
    legendChartPadding: _Ember['default'].computed('labelHeightOffset', 'xAxisTitleHeightOffset', function () {
      return this.get('xAxisTitleHeightOffset') + this.get('labelHeightOffset');
    }),

    /**
     * Computed title height plus label padding or 0 if `hasXAxisTitle` is false
     * @type {Number}
     */
    xAxisTitleHeightOffset: _Ember['default'].computed('hasXAxisTitle', 'axisTitleHeight', 'labelPadding', function () {
      if (this.get('hasXAxisTitle')) {
        return this.get('axisTitleHeight') + this.get('labelPadding');
      } else {
        return 0;
      }
    }),

    /**
     * The horizontal offset of the Y axis title, if there is a Y axis title
     * Computed based on the height of the axis title, plus 10 pixels of extra
     * margin
     * @type {Number}
     */
    yAxisTitleHeightOffset: _Ember['default'].computed('hasYAxisTitle', 'axisTitleHeight', function () {
      if (this.get('hasYAxisTitle')) {
        return this.get('axisTitleHeight') + 10;
      } else {
        return 0;
      }
    }),

    /**
     * References and/or creates the d3 element for x axis title
     * @type {Object}
     */
    xAxisTitle: _Ember['default'].computed(function () {
      return this.selectOrCreateAxisTitle('.x.axis-title').attr('class', 'x axis-title');
    })["volatile"](),

    /**
     * References and/or creates the d3 element for y axis title
     * @type {Object}
     */
    yAxisTitle: _Ember['default'].computed(function () {
      return this.selectOrCreateAxisTitle('.y.axis-title').attr('class', 'y axis-title');
    })["volatile"](),

    /**
     * Position of x axis title on the x axis
     * @type {Number}
     */
    xAxisPositionX: _Ember['default'].computed('graphicWidth', 'labelWidthOffset', 'xTitleHorizontalOffset', function () {
      var position = this.get('graphicWidth') / 2 + this.get('labelWidthOffset');
      if (!_Ember['default'].isNone(this.get('xTitleHorizontalOffset'))) {
        position += this.get('xTitleHorizontalOffset');
      }
      return position;
    }),

    /**
     * Position of x axis title on the y axis. The y-coordinate of x Axis Title
     * depends on the y-coordinate of the bottom of the graph, label height &
     * padding and optional title offset. Caller can set `xTitleVerticalOffset`
     * to adjust the y-coordinate of the label on the graph.
     * @type {Number}
     */
    xAxisPositionY: _Ember['default'].computed('graphicBottom', 'labelHeightOffset', 'labelPadding', 'xTitleVerticalOffset', function () {
      return this.get('graphicBottom') + this.get('labelHeightOffset') + this.get('labelPadding') + this.get('xTitleVerticalOffset');
    }),

    /**
     * Position of y axis title on the x axis
     * @type {Number}
     */
    yAxisPositionX: _Ember['default'].computed('graphicHeight', 'yTitleVerticalOffset', function () {
      var position = -(this.get('graphicHeight') / 2);
      if (!_Ember['default'].isNone(this.get('yTitleVerticalOffset'))) {
        position += this.get('yTitleVerticalOffset');
      }
      return position;
    }),

    /**
     * Position of y axis title on the y axis
     * @type {Number}
     */
    yAxisPositionY: -20,

    /**
     * X axis transform
     * @type {string}
     */
    xAxisTransform: "rotate(0)",
    /**
     * Y axis transform
     * @type {string}
     */
    yAxisTransform: "rotate(-90)",

    /**
     * If no axis title has been created for the selector create a new one
     * @param  {String} selector
     * @return {Object}
     */
    selectOrCreateAxisTitle: function selectOrCreateAxisTitle(selector) {
      var title = this.get('viewport').select(selector);
      if (title.empty()) {
        return this.get('viewport').append('text');
      } else {
        return title;
      }
    },

    /**
     * Update the x axis title and position
     */
    updateXAxisTitle: function updateXAxisTitle() {
      this.get('xAxisTitle').text(this.get('xAxisTitleDisplayValue')).style('text-anchor', 'middle').attr({
        x: this.get('xAxisPositionX'),
        y: this.get('xAxisPositionY')
      });
    },

    /**
     * Update the y axis title and position
     */
    updateYAxisTitle: function updateYAxisTitle() {
      this.get('yAxisTitle').text(this.get('yAxisTitleDisplayValue')).style('text-anchor', 'middle').attr({
        x: this.get('yAxisPositionX'),
        y: this.get('yAxisPositionY')
      }).attr("transform", this.get('yAxisTransform')).attr("dy", "1em");
    },

    /**
     * Updates axis titles
     */
    updateAxisTitles: function updateAxisTitles() {
      this.updateXAxisTitle();
      this.updateYAxisTitle();
    }

  });

  module.exports = AxisTitlesMixin;
});
define('ember-charts/mixins/colorable', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({

    selectedSeedColor: 'rgb(65, 65, 65)',

    // Create two color ranges. The primary range is usually used for the main
    // graphic. The secondary range is lighter and used for layered graphics
    // underneath the main graphic.

    // Tint is the amount of white to mix the seed color with. 0.8 means 80% white
    tint: 0.8,
    minimumTint: 0,
    maximumTint: 0.66,
    colorScaleType: d3.scale.linear,

    // colorScale is the end of the color scale pipeline so we rerender on that
    renderVars: ['colorScale'],

    colorRange: _Ember['default'].computed('selectedSeedColor', 'getColorRange', function () {
      var seedColor = this.get('selectedSeedColor');
      return this.get('getColorRange')(seedColor);
    }),

    getColorRange: _Ember['default'].computed('minimumTint', 'maximumTint', function () {
      var _this = this;
      return function (seedColor) {
        var interpolate, maxTintRGB, minTintRGB;
        interpolate = d3.interpolateRgb(seedColor, 'rgb(255,255,255)');
        minTintRGB = interpolate(_this.get('minimumTint'));
        maxTintRGB = interpolate(_this.get('maximumTint'));
        return [d3.rgb(minTintRGB), d3.rgb(maxTintRGB)];
      };
    }),

    colorScale: _Ember['default'].computed('selectedSeedColor', 'getColorScale', function () {
      var seedColor = this.get('selectedSeedColor');
      return this.get('getColorScale')(seedColor);
    }),

    getColorScale: _Ember['default'].computed('getColorRange', 'colorScaleType', function () {
      var _this = this;
      return function (seedColor) {
        var colorRange = _this.get('getColorRange')(seedColor);
        return _this.get('colorScaleType')().range(colorRange);
      };
    }),

    secondaryMinimumTint: 0.4,
    secondaryMaximumTint: 0.85,
    secondaryColorScaleType: d3.scale.linear,

    secondaryColorRange: _Ember['default'].computed('selectedSeedColor', 'secondaryMinimumTint', 'secondaryMaximumTint', function () {
      var seedColor = this.get('selectedSeedColor');
      var interpolate = d3.interpolateRgb(seedColor, 'rgb(255,255,255)');
      var minTintRGB = interpolate(this.get('secondaryMinimumTint'));
      var maxTintRGB = interpolate(this.get('secondaryMaximumTint'));

      return [d3.rgb(minTintRGB), d3.rgb(maxTintRGB)];
    }),

    secondaryColorScale: _Ember['default'].computed('secondaryColorScaleType', 'secondaryColorRange', function () {
      return this.get('secondaryColorScaleType')().range(this.get('secondaryColorRange'));
    }),

    // ----------------------------------------------------------------------------
    // Output
    // ----------------------------------------------------------------------------

    // TODO: Shouldn't this already be part of the d3 color scale stuff?

    // Darkest color (seed color)
    leastTintedColor: _Ember['default'].computed('colorRange.[]', function () {
      return this.get('colorRange')[0];
    }),

    // Lightest color (fully tinted color)
    mostTintedColor: _Ember['default'].computed('colorRange.[]', function () {
      return this.get('colorRange')[1];
    }),

    numColorSeries: 1,

    getSeriesColor: _Ember['default'].computed('numColorSeries', 'getColorRange', 'getColorScale', 'selectedSeedColor', function () {
      var numColorSeries = this.get('numColorSeries');
      var selectedSeedColor = this.get('selectedSeedColor');

      var _this = this;
      return function (d, i) {
        var seedColor = d.color || selectedSeedColor;
        var colorRange = _this.get('getColorRange')(seedColor);
        var colorScale = _this.get('getColorScale')(seedColor);
        if (numColorSeries === 1) {
          return colorRange[0];
        } else {
          return colorScale(i / (numColorSeries - 1));
        }
      };
    }),

    numSecondaryColorSeries: 1,

    getSecondarySeriesColor: _Ember['default'].computed('numSecondaryColorSeries', 'secondaryColorRange', 'secondaryColorScale', function () {
      var numSecondaryColorSeries = this.get('numSecondaryColorSeries');

      var _this = this;
      return function (d, i) {
        if (numSecondaryColorSeries === 1) {
          return _this.get('secondaryColorRange')[0];
        } else {
          return _this.get('secondaryColorScale')(i / (numSecondaryColorSeries - 1));
        }
      };
    })
  });
});
define('ember-charts/mixins/floating-tooltip', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({

    // # ----------------------------------------------------------------------------
    // # API -- inputs
    // #
    // # elementId: the id of the object we're attaching the tooltip to
    // # ----------------------------------------------------------------------------
    elementId: null,
    tooltipWidth: 40,
    tooltipValueDisplayName: 'Value',

    showTooltip: function showTooltip(content, event) {
      var $ttid = this._getTooltip();
      $ttid.html(content);
      $ttid.show();
      return this._updateTooltipPosition(event);
    },

    hideTooltip: function hideTooltip() {
      return this._getTooltip().hide();
    },

    // # ----------------------------------------------------------------------------
    // # Private Methods
    // # ----------------------------------------------------------------------------
    _tooltipId: _Ember['default'].computed(function () {
      return this.get('elementId') + '_tooltip';
    }),

    _getTooltip: function _getTooltip() {
      return $("#" + this.get('_tooltipId'));
    },

    _updateTooltipPosition: function _updateTooltipPosition(event) {
      var $tooltip = this._getTooltip();
      // # Offset the tooltip away from the mouse position
      var xOffset = 10;
      var yOffset = 10;

      // # Get tooltip width/height
      var width = $tooltip.width();
      var height = $tooltip.height();

      // # Get top/left coordinates of scrolled window
      var windowScrollTop = $(window).scrollTop();
      var windowScrollLeft = $(window).scrollLeft();

      // # Get current X,Y position of cursor even if window is scrolled
      var curX = event.clientX + windowScrollLeft;
      var curY = event.clientY + windowScrollTop;

      var tooltipLeftOffset;
      if (curX - windowScrollLeft + xOffset * 2 + width > $(window).width()) {
        // # Not enough room to put tooltip to the right of the cursor
        tooltipLeftOffset = -(width + xOffset * 2);
      } else {
        // # Offset the tooltip to the right
        tooltipLeftOffset = xOffset;
      }

      var tooltipLeft = curX + tooltipLeftOffset;

      var tooltipTopOffset;
      if (curY - windowScrollTop + yOffset * 2 + height > $(window).height()) {
        // # Not enough room to put tooltip to the below the cursor
        tooltipTopOffset = -(height + yOffset * 2);
      } else {
        // # Offset the tooltip below the cursor
        tooltipTopOffset = yOffset;
      }

      var tooltipTop = curY + tooltipTopOffset;

      // # Tooltip must be a minimum offset away from the left/top position
      var minTooltipLeft = windowScrollLeft + xOffset;
      var minTooltipTop = windowScrollTop + yOffset;
      if (tooltipLeft < minTooltipLeft) {
        tooltipLeft = minTooltipLeft;
      }
      if (tooltipTop < windowScrollTop + yOffset) {
        tooltipTop = minTooltipTop;
      }

      // # Place tooltip
      return $tooltip.css('top', tooltipTop + 'px').css('left', tooltipLeft + 'px');
    },

    // # ----------------------------------------------------------------------------
    // # Internal
    // # ----------------------------------------------------------------------------

    didInsertElement: function didInsertElement() {
      this._super();
      $("body").append("<div class='chart-float-tooltip' id='" + this.get('_tooltipId') + "'></div>");
      return this.hideTooltip();
    },

    willDestroyElement: function willDestroyElement() {
      this._super();
      return this._getTooltip().remove();
    }
  });
});
define('ember-charts/mixins/formattable', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({

    // # Getters for formatting human-readable labels from provided data
    formatLabelFunction: _Ember['default'].computed('formatLabel', function () {
      return d3.format("," + this.get('formatLabel'));
    }),

    // # String that will be used to format label using d3.format function
    // # More info about d3.format: https://github.com/mbostock/d3/wiki/Formatting
    formatLabel: '.2f'
  });
});
define('ember-charts/mixins/has-time-series-rule', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({

    // # ----------------------------------------------------------------------
    // # HasTimeSeriesRule -- Overview
    // # ----------------------------------------------------------------------
    // # Provides mouseover interaction for time series line chart. As user
    // # moves mouse to left and right, markers are placed on the line chart.

    // # ----------------------------------------------------------------------
    // # API -- Inputs
    // #
    // # $viewport: the viewport of the chart on which the time series rule
    // # will be displayed
    // # xRange: the range of positions of the chart in the x dimension
    // # yRange: the range of positions of the chart in the y dimension
    // # xTimeScale: a mapping from time to x position
    // # hasLineData: specifies if the mixing in class has line data
    // # showDetails: function to be called on mouseing over the line marker
    // # hideDetails: function to be called on mouseing out of the line marker
    // # lineColorFn: function which returns a line color, used for fill
    // # color of markers
    // # graphicHeight: height of graphic containing lines
    // # isInteractive: specifies whether the chart is interactive
    // # ----------------------------------------------------------------------
    xRange: null,
    yRange: null,
    xTimeScale: null,
    showDetails: null,
    hideDetails: null,
    lineColorFn: null,
    graphicHeight: null,

    // # ----------------------------------------------------------------------
    // # Drawing Functions
    // # ----------------------------------------------------------------------

    updateLineMarkers: function updateLineMarkers() {
      var lineMarkers = this._getLineMarkers();
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      lineMarkers.enter().append('path').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideDetails(d, i, this);
      }).attr({
        'class': 'line-marker',
        fill: this.get('lineColorFn'),
        d: d3.svg.symbol().size(50).type('circle')
      });

      lineMarkers.exit().remove();

      // # Update the line marker icons with the latest position data
      lineMarkers.attr({
        transform: function transform(d) {
          return "translate(" + d.x + "," + d.y + ")";
        }
      });

      lineMarkers.style({
        'stroke-width': function strokeWidth(d) {
          return d3.select(d.path).attr('stroke-width');
        }
      });
    },

    // # ----------------------------------------------------------------------
    // # Selections
    // # ----------------------------------------------------------------------

    // # Returns a selection containing the line markers, which binds the line
    // # marker data upon each update
    _getLineMarkers: function _getLineMarkers() {
      return this.get('viewport').selectAll('.line-marker').data(this._lineMarkerData());
    },

    // # ----------------------------------------------------------------------
    // # Event Bindings
    // # ----------------------------------------------------------------------

    // # Bind event handlers to the viewport to keep the position of line
    // # markers up to date. Responsibility for showing and hiding
    // # the lineMarkers is delegated to the chart.
    didInsertElement: function didInsertElement() {
      var _this = this;
      this._super();

      d3.select(this.$('svg')[0]).on('mousemove', function () {
        if (!_this.get('isInteractive')) {
          return;
        }
        // # Check if we are within the domain/range of the data
        if (_this._isEventWithinValidRange()) {
          _Ember['default'].run(_this, _this.get('updateLineMarkers'));
        }
      });
    },

    // # ----------------------------------------------------------------------
    // # Private Methods -- Data
    // # ----------------------------------------------------------------------

    // # The amount of acceptable error in the x-position of the vertical line rule,
    // # in msec. This is necessary because bisection is used to find where to place
    // # the vertical rule in time domain. The default tolerance here is one hour
    _lineMarkerTolerance: 60 * 1000,

    // # The mouse position of an event with respect to the chart viewport
    _mousePosition: function _mousePosition() {
      if (!d3.event) {
        return null;
      }
      return d3.mouse(this.get('$viewport'));
    },

    // # if the mouse position is within the xRange and yRange of the
    // # implementing object
    _isEventWithinValidRange: function _isEventWithinValidRange() {
      var xRange = this.get('xRange');
      var yRange = this.get('yRange');
      var x = this._mousePosition()[0];
      var y = this._mousePosition()[1];

      var inX = d3.min(xRange) < x < d3.max(xRange);
      var inY = d3.min(yRange) < y < d3.max(yRange);
      return inX && inY;
    },

    // # To locate each marker for the given location of the rule on the x-axis
    _lineMarkerData: function _lineMarkerData() {
      var mousePosition = this._mousePosition();
      if (_Ember['default'].isEmpty(mousePosition)) {
        return [];
      }

      var invXScale = this.get('xTimeScale').invert;
      var invYScale = this.get('yScale').invert;
      var lineMarkerTolerance = this.get('_lineMarkerTolerance');

      var timeX = invXScale(mousePosition[0]);

      var markerData = [];
      this.get('viewport').selectAll('path.line').each(function (d) {
        // # Before working on the line we need to check that we have the SVG Line
        // # and not any arbitrary node.  Note: you would think that 'path' would
        // # select for SVG
        if (this instanceof SVGPathElement) {
          // # Count up the number of bisections, stopping after bisecting
          // # maxIterations number of times. In case the bisection does not
          // # converge, stop after 25 iterations, which should be enough for any
          // # reasonable time range
          var iterations = 0;
          var maxIterations = 25;

          // # Perform a binary search along the length of each SVG path, calling
          // # getPointAtLength and testing where it falls relative to the position
          // # corresponding to the location of the rule
          var searchStart = 0;
          var searchEnd = this.getTotalLength();
          var searchLen = searchEnd / 2;

          var point = this.getPointAtLength(searchLen);
          while (Math.abs(timeX - invXScale(point.x)) > lineMarkerTolerance && maxIterations > ++iterations) {
            if (timeX < invXScale(point.x)) {
              searchEnd = searchLen;
            } else {
              searchStart = searchLen;
            }
            searchLen = (searchStart + searchEnd) / 2;
            point = this.getPointAtLength(searchLen);
          }

          // # Push location of the point, information that will be displayed on hover,
          // # and a reference to the line graphic that the point marks, on to a list
          // # which will be used to construct a d3 selection of each line marker
          return markerData.push({
            x: point.x,
            y: point.y,
            group: d.group,
            value: invYScale(point.y),
            time: invXScale(point.x),
            path: this
          });
        }
      });
      return markerData;
    }

  });
});
define('ember-charts/mixins/label-width', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var LabelWidthMixin = _Ember['default'].Mixin.create({

    // Override maximum width of labels to be a percentage of the total width
    labelWidth: _Ember['default'].computed('outerWidth', 'labelWidthMultiplier', function () {
      return this.get('labelWidthMultiplier') * this.get('outerWidth');
    }),

    // The proportion of the chart's width that should be reserved for labels
    labelWidthMultiplier: 0.25
  });

  module.exports = LabelWidthMixin;
});
define('ember-charts/mixins/legend', ['exports', 'module', 'ember', '../utils/label-trimmer'], function (exports, module, _ember, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  // Calculates maximum width of label in a row, before it gets truncated by label trimmer.
  // If labelWidth < average width per label (totalAvailableWidthForLabels/label count), then do not truncate
  // Else if labelWidth > average, then truncate it to average
  var calcMaxLabelWidth = function calcMaxLabelWidth(labelWidthsArray, totalAvailableWidthForLabels) {
    // Default the max label width to average width of an item
    var maxLabelWidth = totalAvailableWidthForLabels / labelWidthsArray.length;

    // Sort label widths to exclude all the short labels during iteration
    labelWidthsArray = _.sortBy(labelWidthsArray);
    for (var i = 0; i < labelWidthsArray.length; i++) {
      var curLabelWidth = labelWidthsArray[i];
      if (curLabelWidth < maxLabelWidth) {
        // If the label is shorter than the max labelWidth, then it shouldn't be truncated
        // and hence subtract short labels from remaining totalAvailableWidthForLabels.
        totalAvailableWidthForLabels -= curLabelWidth;
        // Distribute the remaining width equally in remaining labels and set that as max.
        var remainingLabelCount = labelWidthsArray.length - (i + 1);
        maxLabelWidth = totalAvailableWidthForLabels / remainingLabelCount;
      }
    }
    return maxLabelWidth;
  };

  // Select labels of current row (startIdx, endIdx) and truncate if greater than labelWidth
  var truncateLabels = function truncateLabels(labels, startIdx, endIdx, labelWidth) {
    var labelTrimmer = _LabelTrimmer['default'].create({
      getLabelSize: function getLabelSize() {
        return labelWidth;
      }
    });
    // Select labels from current row and apply label trimmer
    labels.filter(function (data, idx) {
      return idx >= startIdx && idx < endIdx;
    }).call(labelTrimmer.get('trim'));
  };

  // Select legendItems of current row (startIdx, endIdx) and calculate total row width
  var calcLegendRowWidth = function calcLegendRowWidth(legendItems, startIdx, endIdx, legendLabelPadding) {
    var rowWidth = 0;
    legendItems.filter(function (data, idx) {
      return idx >= startIdx && idx < endIdx;
    }).each(function (val, col) {
      if (col === 0) {
        rowWidth = 0;
      } else {
        rowWidth += 2 * legendLabelPadding;
      }
      rowWidth += this.getBBox().width;
    });
    return rowWidth;
  };

  module.exports = _Ember['default'].Mixin.create({

    // ----------------------------------------------------------------------------
    // Legend settings
    // ----------------------------------------------------------------------------

    // Padding between legend and chart
    legendTopPadding: 10,

    // Acceptable dimensions for each legend item
    legendItemHeight: 18,
    minLegendItemWidth: 120,
    maxLegendItemWidth: 160,

    // Radius of each legend icon
    legendIconRadius: 9,

    // Padding between each legend icon and padding
    legendLabelPadding: 10,

    // Toggle for whether or not to show the legend
    // if you want to override default legend behavior, override showLegend
    showLegend: true,

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // Outside bounds of legend
    legendWidth: _Ember['default'].computed.alias('width'),

    legendHeight: _Ember['default'].computed('numLegendRows', 'legendItemHeight', function () {
      return this.get('numLegendRows') * this.get('legendItemHeight');
    }),

    // Bottom margin is equal to the total amount of space the legend needs,
    _marginBottom: _Ember['default'].computed('legendHeight', 'hasLegend', 'marginTop', function () {
      // If the legend is enabled then we need some extra breathing room
      return this.get('hasLegend') ? this.get('legendHeight') : this.get('marginBottom');
    }),

    marginBottom: _Ember['default'].computed('_marginBottom', 'minimumTopBottomMargin', function () {
      return Math.max(this.get('_marginBottom'), this.get('minimumTopBottomMargin'));
    }),

    // Dynamically calculate the size of each legend item
    legendItemWidth: _Ember['default'].computed('legendWidth', 'minLegendItemWidth', 'maxLegendItemWidth', 'legendItems.length', function () {

      var itemWidth = this.get('legendWidth') / this.get('legendItems.length');
      if (itemWidth < this.get('minLegendItemWidth')) {
        return this.get('minLegendItemWidth');
      } else if (itemWidth > this.get('maxLegendItemWidth')) {
        return this.get('maxLegendItemWidth');
      } else {
        return itemWidth;
      }
    }),

    // Dynamically calculate the number of legend items in each row.
    // This is only an approximate value to estimate the maximum required space for legends
    numLegendItemsPerRow: _Ember['default'].computed('legendWidth', 'legendItemWidth', function () {
      // There's always at least 1 legend item per row
      return Math.max(Math.floor(this.get('legendWidth') / this.get('legendItemWidth')), 1);
    }),

    // Dynamically calculate the number of rows needed
    // This is only an approximate value to estimate the maximum required space for legends
    numLegendRows: _Ember['default'].computed('legendItems.length', 'numLegendItemsPerRow', function () {
      return Math.ceil(this.get('legendItems.length') / this.get('numLegendItemsPerRow'));
    }),

    // Maximum width of each label before it gets truncated
    legendLabelWidth: _Ember['default'].computed('legendItemWidth', 'legendIconRadius', 'legendLabelPadding', function () {
      return this.get('legendItemWidth') - this.get('legendIconRadius') - this.get('legendLabelPadding') * 2;
    }),

    // legendRowWidths is used to estimate how much to move the
    // labels to make them seem roughly centered
    // legendRowWidths is set every time legends are redrawn
    legendRowWidths: [],

    // numLegendItemsByRows is used to track how many legend rows will be added
    // and how many items are placed in each row
    numLegendItemsByRows: [],

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    // Space between legend and chart (need to account for label size and perhaps
    // more). Charts will usually override this because there may be other things
    // below the chart graphic like an axis or labels or axis title.
    legendChartPadding: 0,

    // Center the legend beneath the chart. Since the legend is inside the chart
    // viewport, which has already been positioned with regards to margins,
    // only consider the height of the chart.
    legendAttrs: _Ember['default'].computed('outerWidth', 'graphicBottom', 'legendTopPadding', 'legendChartPadding', function () {
      var dx, dy, offsetToLegend;
      dx = this.get('width') / 2;
      offsetToLegend = this.get('legendChartPadding') + this.get('legendTopPadding');
      dy = this.get('graphicBottom') + offsetToLegend;
      return {
        transform: "translate(" + dx + ", " + dy + ")"
      };
    }),

    // Place each legend item such that the legend rows appear centered to the graph.
    // Spacing between legend items must be constant and equal to 2*legendLabelPadding = 20px.
    legendItemAttrs: _Ember['default'].computed('legendItemWidth', 'legendItemHeight', 'legendIconRadius', 'legendLabelPadding', 'legendRowWidths', 'numLegendItemsByRows', function () {

      var legendRowWidths = this.get('legendRowWidths');
      var legendItemWidth = this.get('legendItemWidth');
      var legendItemHeight = this.get('legendItemHeight');
      var legendLabelPadding = this.get('legendLabelPadding');
      var legendIconRadius = this.get('legendIconRadius');
      var numLegendItemsByRows = this.get('numLegendItemsByRows');

      // Track the space already alloted to a legend.
      // This is used to translate the next legend in the row.
      var usedWidth = 0;
      return {
        "class": 'legend-item',
        width: legendItemWidth,
        'stroke-width': 0,
        transform: function transform(d, col) {
          // Compute the assigned row and column for the current legend
          var row = 0;
          while (col >= numLegendItemsByRows[row]) {
            col -= numLegendItemsByRows[row];
            ++row;
          }

          // If first item in the row, set usedWidth as 0.
          if (col === 0) {
            usedWidth = 0;
          }
          // Shifting the legend by "width of current legend row"/2 to the left and adding the used space
          // Adding legend icon radius because center is off by that much in our legend layout
          var dx = -legendRowWidths[row] / 2 + usedWidth + legendIconRadius;
          var dy = row * legendItemHeight + legendItemHeight / 2;

          // Add 2*legendLabelPadding between items before putting the next legend
          usedWidth += this.getBBox().width + 2 * legendLabelPadding;
          return "translate(" + dx + ", " + dy + ")";
        }
      };
    }),

    legendIconAttrs: _Ember['default'].computed('legendIconRadius', function () {
      var iconRadius = this.get('legendIconRadius');

      return {
        d: function d(_d, i) {
          if (_d.icon(_d) === 'line') {
            return "M " + -iconRadius + " 0 L " + iconRadius + " 0";
          } else {
            return d3.svg.symbol().type(_d.icon(_d, i)).size(Math.pow(iconRadius, 2))(_d, i);
          }
        },
        fill: function fill(d, i) {
          return _.isFunction(d.fill) ? d.fill(d, i) : d.fill;
        },
        stroke: function stroke(d, i) {
          return _.isFunction(d.stroke) ? d.stroke(d, i) : d.stroke;
        },
        'stroke-width': function strokeWidth(d) {
          if (!d.width) {
            return 1.5;
          }
          if (_.isFunction(d.width)) {
            return d.width(d);
          } else {
            return d.width;
          }
        },
        'stroke-dasharray': function strokeDasharray(d) {
          if (d.dotted) {
            return '2,2';
          }
        }
      };
    }),

    legendLabelAttrs: _Ember['default'].computed('legendIconRadius', 'legendLabelPadding', function () {
      return {
        x: this.get('legendIconRadius') / 2 + this.get('legendLabelPadding'),
        y: '.35em'
      };
    }),

    // ----------------------------------------------------------------------------
    // Tooltip Configuration
    // ----------------------------------------------------------------------------

    showLegendDetails: _Ember['default'].computed('isInteractive', function () {
      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      var _this = this;
      return function (data, i, element) {
        d3.select(element).classed('hovered', true);
        if (data.selector) {
          _this.get('viewport').selectAll(data.selector).classed('hovered', true);
        }

        var content = $("<span />");
        content.append($("<span class=\"tip-label\">").text(data.label));
        if (!_Ember['default'].isNone(data.xValue)) {
          var formatXValue = _this.get('formatXValue');
          content.append($('<span class="name" />').text(_this.get('tooltipXValueDisplayName') + ': '));
          content.append($('<span class="value" />').text(formatXValue(data.xValue)));
          if (!_Ember['default'].isNone(data.yValue)) {
            content.append('<br />');
          }
        }
        if (!_Ember['default'].isNone(data.yValue)) {
          var formatYValue = _this.get('formatYValue');
          content.append($('<span class="name" />').text(_this.get('tooltipYValueDisplayName') + ': '));
          content.append($('<span class="value" />').text(formatYValue(data.yValue)));
        }

        _this.showTooltip(content.html(), d3.event);
      };
    }),

    hideLegendDetails: _Ember['default'].computed('isInteractive', function () {
      if (!this.get('isInteractive')) {
        return _Ember['default'].K;
      }

      var _this = this;
      return function (data, i, element) {
        d3.select(element).classed('hovered', false);
        if (data.selector) {
          _this.get('viewport').selectAll(data.selector).classed('hovered', false);
        }
        return _this.hideTooltip();
      };
    }),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    clearLegend: function clearLegend() {
      return this.get('viewport').select('.legend-container').remove();
    },

    legend: _Ember['default'].computed(function () {
      var legend = this.get('viewport').select('.legend-container');
      if (legend.empty()) {
        return this.get('viewport').append('g').attr('class', 'legend-container');
      } else {
        return legend;
      }
    })["volatile"](),

    // Create a list of all the legend Items, icon for each legend item and corresponding labels
    // Calculate the number of legend item rows and items in each. Each time width should be bounded by min and max legend item width.
    // Calculate the label width for each legend row that minimizes truncation.
    // And then apply legendItemAttrs to apply posisioning transforms.
    // Legend layout => A legend item consists of an Icon and a label. Icon is always positioned centered at 0px within item.
    // Line icon width is 2*legendIconRadius, where other shapes are usually legendIconRadius px in width.
    // Icon is followed by label that is positioned at (legendIconRadius/2 + legendLabelPadding) px. This adds some padding between icon and label.
    // Finally we add a padding of (2*legendLabelPadding) px before next label
    drawLegend: function drawLegend() {
      if (!this.get('showLegend')) {
        return;
      }
      this.clearLegend();
      var legend = this.get('legend');
      legend.attr(this.get('legendAttrs'));

      var showLegendDetails = this.get('showLegendDetails');
      var hideLegendDetails = this.get('hideLegendDetails');
      var legendItems = legend.selectAll('.legend-item').data(this.get('legendItems')).enter().append('g').on("mouseover", function (d, i) {
        return showLegendDetails(d, i, this);
      }).on("mouseout", function (d, i) {
        return hideLegendDetails(d, i, this);
      });
      var legendIconAttrs = this.get('legendIconAttrs');
      var isShowingTotal = this.get('isShowingTotal');
      var totalPointShape = this.get('totalPointShape');
      legendItems.each(function (d, i) {
        var sel = d3.select(this);
        if (i === 0 && isShowingTotal) {
          return sel.append('g').attr('class', 'icon').call(totalPointShape);
        } else {
          return sel.append('path').attr('class', 'icon').attr(legendIconAttrs);
        }
      });

      var legendLabelWidths = [];
      var labels = legendItems.append('text').style('text-anchor', 'start').text(function (d) {
        return d.label;
      }).attr(this.get('legendLabelAttrs')).each(function () {
        legendLabelWidths.push(this.getComputedTextLength());
      });

      var minLegendItemWidth = this.get('minLegendItemWidth');
      var maxLegendItemWidth = this.get('maxLegendItemWidth');
      var legendLabelPadding = this.get('legendLabelPadding');

      var numLegendItemsByRows = [0];
      var rowNum = 0;
      var legendWidth = this.get('legendWidth');
      var availableLegendWidth = legendWidth;

      // Calculate number of legend rows and number of items per row.
      legendItems.each(function () {
        // Calculate the current legend width with upper bound as maxLegendItemWidth
        var itemWidth = Math.min(this.getBBox().width, maxLegendItemWidth);
        // Remove padding space from available width if this is additional item in the row
        if (numLegendItemsByRows[rowNum] > 0) {
          availableLegendWidth -= 2 * legendLabelPadding;
        }

        // If available width is more than the minimum required width or the actual legend width, then add it to current row.
        if (availableLegendWidth >= minLegendItemWidth || availableLegendWidth >= itemWidth) {
          numLegendItemsByRows[rowNum]++;
        } else {
          ++rowNum;
          numLegendItemsByRows[rowNum] = 1;
          availableLegendWidth = legendWidth;
        }
        // Max width allotted for this legend must be minimum of availableLegendWidth or item width.
        availableLegendWidth -= Math.min(availableLegendWidth, itemWidth);
      });
      this.set('numLegendItemsByRows', numLegendItemsByRows);

      var startIdxCurrentRow = 0;
      var legendRowWidths = []; // Capture the width of each legend row
      var iconRadius = this.get('legendIconRadius');
      var iconToLabelPadding = iconRadius / 2 + legendLabelPadding;
      var legendItemPadding = 2 * legendLabelPadding;

      // Perform label truncation for legend items in each row.
      for (rowNum = 0; rowNum < numLegendItemsByRows.length; rowNum++) {
        var curRowItemCount = numLegendItemsByRows[rowNum];
        var totalAvailableWidthForLabels = legendWidth - // Total width of a legend row available in the chart
        curRowItemCount * (iconRadius + iconToLabelPadding) - // Subtract width of each icon and it's padding
        (curRowItemCount - 1) * legendItemPadding; // Subtract width of all padding between items

        // For current row, pick the label widths and caculate max allowed label width before truncation.
        var labelWidthsForCurRow = legendLabelWidths.splice(0, curRowItemCount);
        var maxLabelWidth = calcMaxLabelWidth(labelWidthsForCurRow, totalAvailableWidthForLabels);
        truncateLabels(labels, startIdxCurrentRow, startIdxCurrentRow + curRowItemCount, maxLabelWidth);

        // After label trimming, calculate the final width of the current legend row.
        // This will be used by legenItemAttrs transform method to position the row in the center.
        legendRowWidths[rowNum] = calcLegendRowWidth(legendItems, startIdxCurrentRow, startIdxCurrentRow + curRowItemCount, legendLabelPadding);
        startIdxCurrentRow += numLegendItemsByRows[rowNum];
      }
      this.set('legendRowWidths', legendRowWidths);

      // Assign the legend item attrs and apply transformation
      legendItems.attr(this.get('legendItemAttrs'));
      return this;
    }
  });
});
define('ember-charts/mixins/no-margin-chart', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  // Remove all extra margins so that graph elements can line up with other
  // elements more easily
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({
    marginRight: 0,

    // There should be no padding if there is no legend
    marginBottom: _Ember['default'].computed('hasLegend', function () {
      return this.get('hasLegend') ? 30 : 0;
    }),

    // Gives the maximum of the lengths of the labels given in svgTextArray
    maxLabelLength: function maxLabelLength(svgTextArray) {
      var maxLabel = 0;
      svgTextArray.each(function () {
        // this.getComputedTextLength() gives the length in pixels of a text element
        if (this.getComputedTextLength() > maxLabel) {
          maxLabel = this.getComputedTextLength();
        }
      });
      return maxLabel;
    }
  });
});
define('ember-charts/mixins/pie-legend', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var PieLegendMixin = _Ember['default'].Mixin.create({

    // ----------------------------------------------------------------------------
    // Legend settings
    // ----------------------------------------------------------------------------

    // Padding at top and bottom of legend. Legend is positioned adjacent to the
    // bottom of the viewport, with legendVerticalPadding pixels separating top of
    // legend and chart graphic
    // TODO(tony): This should take into account the label heights of the pie to
    // guarrantee no intersection with them
    legendVerticalPadding: 30,

    // Padding on left and right of legend text is a percentage of total width
    legendHorizontalPadding: _Ember['default'].computed('outerWidth', function () {
      return 0.2 * this.get('outerWidth');
    }),

    // Maximum height of the actual text in the legend
    maxLabelHeight: _Ember['default'].computed('outerHeight', function () {
      return 0.05 * this.get('outerHeight');
    }),

    // Toggle for whether or not to show the legend
    // if you want to override default legend behavior, override showLegend
    showLegend: true,

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    legendWidth: _Ember['default'].computed('outerWidth', 'legendHorizontalPadding', function () {
      return this.get('outerWidth') - this.get('legendHorizontalPadding');
    }),

    // Height of max possible text height + padding. This is not the height of the
    // actual legend displayed just the total amount of room the legend might need
    legendHeight: _Ember['default'].computed('maxLabelHeight', 'legendVerticalPadding', function () {
      return this.get('maxLabelHeight') + this.get('legendVerticalPadding') * 2;
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    // Center the legend at the bottom of the chart drawing area. Since the legend
    // is inside the chart viewport, which has already been centered only consider
    // the height of the chart.

    legendAttrs: _Ember['default'].computed('outerHeight', 'marginTop', 'marginBottom', function () {
      var dx = 0;
      // This will leave a bit of padding due to the fact that marginBottom is
      // larger than marginTop which centers the pie above the middle of the chart
      // Note(edward): The marginBottom is not larger than marginTop when there may
      // be labels at the top.
      // In the default case where marginTop is 0.3 * marginBottom, the below
      // evaluates to 0.
      var offsetToLegend = 0.15 * this.get('marginBottom') - this.get('marginTop') / 2;
      var dy = this.get('outerHeight') / 2 + offsetToLegend;

      return {
        transform: "translate(" + dx + ", " + dy + ")"
      };
    }),

    legendLabelAttrs: _Ember['default'].computed(function () {
      return {
        style: "text-anchor:middle;",
        y: '-.35em'
      };
    }),

    // ----------------------------------------------------------------------------
    // Selections
    // ----------------------------------------------------------------------------

    legend: _Ember['default'].computed(function () {
      var legend = this.get('viewport').select('.legend');
      if (legend.empty()) {
        return this.get('viewport').append('g').attr('class', 'legend');
      } else {
        return legend;
      }
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    clearLegend: function clearLegend() {
      return this.get('viewport').select('.legend .labels').remove();
    },

    drawLegend: function drawLegend() {
      var currentText, rowNode;
      if (!this.get('showLegend')) {
        return;
      }
      this.clearLegend();
      var legend = this.get('legend').attr(this.get('legendAttrs'));

      // Bind hover state to the legend
      var otherSlice = this.get('viewport').select('.other-slice');
      if (this.get('isInteractive') && !otherSlice.empty()) {
        legend.on('mouseover', function () {
          otherSlice.classed('hovered', true);
          return legend.classed('hovered', true);
        }).on('mouseout', function () {
          otherSlice.classed('hovered', false);
          return legend.classed('hovered', false);
        });
      }

      // Create text elements within .labels group for each row of labels
      var labels = legend.append('g').attr('class', 'labels');
      var labelStrings = this.get('legendItems').map(function (d) {
        if (d.percent != null) {
          return "" + d.label + " (" + d.percent + "%)";
        } else {
          return d.label;
        }
      });
      var row = labels.append('text').text("Other: " + labelStrings[0]).attr(this.get('legendLabelAttrs'));

      // Try adding each label. If that makes the current line too long,
      // remove it and insert the label on the next line in its own <text>
      // element, incrementing labelTop. Stop adding rows if that would
      // cause labelTop to exceed the space allocated for the legend.
      var labelTop = 0;

      var remainingLabelStrings = labelStrings.slice(1);
      for (var i = 0; i < remainingLabelStrings.length; i++) {
        var nextLabel = remainingLabelStrings[i];
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
      // Align the lowermost row of the block of labels against the bottom margin
      return labels.attr('transform', "translate(0, " + -labelTop + ")");
    }
  });

  module.exports = PieLegendMixin;
});
define('ember-charts/mixins/resize-handler', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  // TODO(azirbel): This needs to be an external dependency.
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({
    resizeEndDelay: 200,
    resizing: false,
    onResizeStart: _Ember['default'].K,
    onResizeEnd: _Ember['default'].K,
    onResize: _Ember['default'].K,

    endResize: _Ember['default'].computed(function () {
      return function (event) {
        if (this.isDestroyed) {
          return;
        }
        this.set('resizing', false);
        if (_.isFunction(this.onResizeEnd)) {
          this.onResizeEnd(event);
        }
      };
    }),

    handleWindowResize: function handleWindowResize(event) {
      if (typeof event.target.id !== "undefined" && event.target.id !== null && event.target.id !== this.elementId) {
        return;
      }
      if (!this.get('resizing')) {
        this.set('resizing', true);
        if (_.isFunction(this.onResizeStart)) {
          this.onResizeStart(event);
        }
      }
      if (_.isFunction(this.onResize)) {
        this.onResize(event);
      }
      return _Ember['default'].run.debounce(this, this.get('endResize'), event, this.get('resizeEndDelay'));
    },

    didInsertElement: function didInsertElement() {
      this._super();
      return this._setupDocumentHandlers();
    },

    willDestroyElement: function willDestroyElement() {
      this._removeDocumentHandlers();
      return this._super();
    },

    _setupDocumentHandlers: function _setupDocumentHandlers() {
      if (this._resizeHandler) {
        return;
      }
      this._resizeHandler = _Ember['default'].$.proxy(this.get('handleWindowResize'), this);
      return _Ember['default'].$(window).on("resize." + this.elementId, this._resizeHandler);
    },

    _removeDocumentHandlers: function _removeDocumentHandlers() {
      _Ember['default'].$(window).off("resize." + this.elementId, this._resizeHandler);
      return this._resizeHandler = null;
    }
  });
});
define('ember-charts/mixins/sortable-chart', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  // # This allows chart data to be displayed in ascending or descending order as specified by
  // # the data points property sortKey. The order is determined by sortAscending.
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Mixin.create({
    sortKey: 'value',
    sortAscending: true,

    sortedData: _Ember['default'].computed('data.[]', 'sortKey', 'sortAscending', function () {
      var data = this.get('data');
      var key = this.get('sortKey');
      var sortAscending = this.get('sortAscending');

      if (_Ember['default'].isEmpty(data)) {
        return [];
      } else if (key != null) {
        if (sortAscending) {
          return _.sortBy(data, key);
        } else {
          return _.sortBy(data, key).reverse();
        }
      } else {
        return data;
      }
    })
  });
});
define('ember-charts/mixins/time-series-labeler', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  // Creates time series labels that are spaced reasonably.
  //  Provides this.formattedTime. Depends on this.xDomain and this.selectedInterval.
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  // The labeller type used to create the labels for each domain type
  // Note that quarters uses a month labeller to create the labels
  var domainTypeToLabellerType = {
    'S': 'seconds',
    'H': 'hours',
    'D': 'days',
    'W': 'weeks',
    'M': 'months',
    'Q': 'months',
    'Y': 'years'
  },

  // The lengthened representation for each domain type. This is different from
  // domainTypeToLabellerType
  domainTypeToLongDomainType = {
    'S': 'seconds',
    'H': 'hours',
    'D': 'days',
    'W': 'weeks',
    'M': 'months',
    'Q': 'quarters',
    'Y': 'years'
  },
      longDomainTypeToDomainType = {
    'seconds': 'S',
    'hours': 'H',
    'days': 'D',
    'weeks': 'W',
    'months': 'M',
    'quarters': 'Q',
    'years': 'Y'
  };

  // Creates time series labels that are spaced reasonably.
  // Provides @formattedTime.
  // Depends on @xDomain, @selectedInterval, and @tickFilter.
  module.exports = _Ember['default'].Mixin.create({

    // When set to true, ticks are drawn in the middle of an interval. By default,
    // they are drawn at the start of an interval.
    centerAxisLabels: false,

    // Interval for ticks on time axis can be:
    // years, months, weeks, days
    // This is used only when a dynamic x axis is not used
    selectedInterval: 'M',
    // There are also cases where the selected interval is different from a
    // computed interval for the Aggregation of Bars.  If there is a delta then
    // this will be set and used for the bar offset.
    computedBarInterval: null,

    // [Dynamic X Axis] dynamically set the labelling of the x axis
    dynamicXAxis: false,

    // [Dynamic X Axis] a ratio specifying the point at which the time
    // specificity should be increased. The specificity ratio roughly
    // bounds the number of x axis labels:

    // [SPECIFICITY_RATIO*(MAX_LABELS) , MAX_LABELS]

    // Essentially, the higher the ratio (until a max of 1), the closer the
    // number of labels along the x axis is to the max number of labels
    SPECIFICITY_RATIO: 0.7,

    // [Dynamic X Axis] The two variables below are relevant only for a
    // dynamic x axis and refer to the minimum and maximum time specificity
    // for the x labels
    // For example, if one wants the specificity to range only from days to
    // quarters, the min and max specificities would be 'D' and 'Q' respectively
    // Allowable values are S, H, D, W, M, Q, Y
    minTimeSpecificity: 'S',
    maxTimeSpecificity: 'Y',

    // The domain type of the x axis (years, quarters, months...)
    // If the x axis is not dynamically labelled, then the domain type
    // is simply the selectedInterval
    MONTHS_IN_QUARTER: 3,
    xAxisTimeInterval: _Ember['default'].computed('selectedInterval', 'dynamicXAxis', function (key, value) {
      var domain;
      if (this.get('dynamicXAxis')) {
        domain = value || 'M';
      } else {
        domain = this.get('selectedInterval');
      }
      // to maintain consistency, convert the domain type into its
      // single letter representation
      if (domain.length > 1) {
        return longDomainTypeToDomainType[domain];
      } else {
        return domain;
      }
    }),

    // The maximum number of labels which will appear on the x axis of the
    // chart. If there are more labels than this (e.g. if you are
    // charting 13 intervals or more) then the number of labels
    // is contracted to a lower value less than or equal to the
    // max number of labels

    // The caller of the time series chart should ideally set this to a value
    // proportional to the width of the graphical panel
    maxNumberOfLabels: 10,

    // The ordering of each time domain from most specific to least specific
    DOMAIN_ORDERING: ['S', 'H', 'D', 'W', 'M', 'Q', 'Y'],

    // D3 No longer handles "minor ticks" for the user, but has instead reverted
    // to a strategy of allowing the user to handle rendered ticks as they see
    // fit.
    // maxNumberOfMinorTicks sets a threshold that is useful when determining our
    // interval. This represents the number of ticks that could be drawn between
    // major ticks. For instance, we may 'allow' 2 minor ticks, but only need
    // to render a single minor tick between labels.
    //
    // minorTickInterval is the modulo for the items to be removed.  This number
    // will be between 1 and the maxNumberOfMinorTicks
    //
    // A maxNumberOfMinorTicks=0 and minorTickInterval=1 essentailly disables the
    // minor tick feature.
    maxNumberOfMinorTicks: 0,
    minorTickInterval: 1,

    filterMinorTicks: function filterMinorTicks() {
      var gXAxis = this.get('xAxis'),
          minorTickInterval = this.get('minorTickInterval'),
          labels,
          ticks,
          minorDates;
      // for the labels we need to reset all of the styles in case the graph updates
      // by being resized.
      gXAxis.selectAll('line').attr("y2", "6");
      gXAxis.selectAll('text').style("display", "block");

      // Need comparison data to do our tick label filtering
      minorDates = this.get('labelledTicks').map(function (item) {
        return new Date(item).getTime();
      }).filter(function (value, index) {
        return index % minorTickInterval !== 0;
      });

      // We have an issue where the nodes come back out of order.  This is a
      // side effect of redrawing the axis.  D3 don't give two [cares] about the
      // insertion order of nodes - they are simply translated into place.  This
      // occurs when the selection with the NEW data is made - the existing ones
      // updated - then the new ones appended on .enter(...)
      labels = gXAxis.selectAll('text').filter(function (value) {
        return minorDates.length > 0 && minorDates.indexOf(value.getTime()) !== -1;
      });
      ticks = gXAxis.selectAll('line').filter(function (value, index) {
        return index % minorTickInterval !== 0;
      });
      labels.style("display", "none");
      ticks.attr("y2", "12");
    },

    // A candidate set of ticks on which labels can appear.
    unfilteredLabelledTicks: _Ember['default'].computed('xDomain', 'centerAxisLabels', 'xAxisTimeInterval', function () {
      var count, domain, interval, j, len, results, tick, ticks;
      domain = this.get('xDomain');
      ticks = this.get('tickLabelerFn')(domain[0], domain[1]);
      if (!this.get('centerAxisLabels')) {
        return ticks;
      } else {
        count = 1;
        interval = this.domainTypeToLongDomainTypeSingular(this.get('xAxisTimeInterval'));
        if (interval === 'quarter') {
          count = this.MONTHS_IN_QUARTER;
          interval = 'month';
        }
        results = [];
        for (j = 0, len = ticks.length; j < len; j++) {
          tick = ticks[j];
          results.push(this._advanceMiddle(tick, interval, count));
        }
        return results;
      }
    }),

    /**
     * A function that can be passed in if there's tick labels we specifically
     * wish to filter out (for example first label, last label, overflows, etc)
     *
     * NOTE: This function filters the ticks after they have been centered (when
     * specified), meaning that the functionality here is not trivially replicable
     * simply by modifying `this.filterLabels` in the `tickLabelerFn` implementation.
     *
     * @type {function}
     */
    tickFilter: _Ember['default'].computed(function () {
      return function () {
        return true;
      };
    }),

    //  This is the set of ticks on which labels appear.
    labelledTicks: _Ember['default'].computed('unfilteredLabelledTicks', 'tickFilter', function () {
      return this.get('unfilteredLabelledTicks').filter(this.get('tickFilter'));
    }),

    // We need a method to figure out the interval specifity
    intervalSpecificity: _Ember['default'].computed('times', 'minTimeSpecificity', function () {
      var ind1, ind2, domainTypes, maxNumberOfLabels, i, len, timeBetween;

      // Now the real trick is if there is any allowance for minor ticks we should
      // consider inflating the max allowed ticks to see if we can fit in a more
      // specific domain.  Previous versions would increase the specifity one step
      // which would then be cut out in filtering.
      // A single minor tick alows us to double our capacity - 2 to triple
      maxNumberOfLabels = this.get('maxNumberOfLabels') * (this.get('maxNumberOfMinorTicks') + 1);

      // Find the segments that we'll test for (inclusive)
      ind1 = this.get('DOMAIN_ORDERING').indexOf(this.get('minTimeSpecificity'));
      ind2 = this.get('DOMAIN_ORDERING').indexOf(this.get('maxTimeSpecificity')) + 1;
      // Refers to the metrics used for the labelling
      if (ind2 < 0) {
        domainTypes = this.get('DOMAIN_ORDERING').slice(ind1);
      } else {
        domainTypes = this.get('DOMAIN_ORDERING').slice(ind1, ind2);
      }

      for (i = 0, len = domainTypes.length; i < len; i++) {
        timeBetween = this.get('times')[domainTypes[i]];
        if (timeBetween <= maxNumberOfLabels) {
          return domainTypes[i];
        }
      }
      return this.get('maxTimeSpecificity');
    }),

    times: _Ember['default'].computed('xDomain', function () {
      var ret, domain, start, stop, types, len, i;

      ret = {};
      domain = this.get('xDomain');
      start = domain[0];
      stop = domain[1];
      types = this.get('DOMAIN_ORDERING');

      for (i = 0, len = types.length; i < len; i++) {
        ret[types[i]] = this.numTimeBetween(domainTypeToLongDomainType[types[i]], start, stop);
      }
      return ret;
    }),

    _advanceMiddle: function _advanceMiddle(time, interval, count) {
      return new Date(time = time.getTime() / 2 + d3.time[interval].offset(time, count) / 2);
    },

    // The amount of time between a start and a stop in the specified units
    // Note that the d3 time library was not used to calculate all of these times
    // in order to improve runtime. This comes at the expense of accuracy, but for
    // the applications of timeBetween, it is not too important
    numTimeBetween: function numTimeBetween(timeInterval, start, stop) {
      switch (timeInterval) {
        case 'seconds':
          return (stop - start) / 1000;
        case 'hours':
          return (stop - start) / 3600000;
        case 'days':
          return (stop - start) / 86400000;
        case 'weeks':
          return d3.time.weeks(start, stop).length;
        case 'months':
          return d3.time.months(start, stop).length;
        case 'quarters':
          return d3.time.months(start, stop).length / this.MONTHS_IN_QUARTER;
        case 'years':
          return d3.time.years(start, stop).length;
      }
    },

    domainTypeToLongDomainTypeSingular: function domainTypeToLongDomainTypeSingular(timeInterval) {
      var domainType = domainTypeToLongDomainType[timeInterval];
      return domainType.substring(0, domainType.length - 1);
    },

    // Dynamic x labelling tries to intelligently limit the number of labels
    // along the x axis to a specified limit. In order to do this, time
    // specificity is callibrated (e.g. for a range of 2 years, instead of having
    // the labels be in years, the specificity is increased to quarters)
    // If the minTimeSpecificity or maxTimeSpecificity are set, then the labels
    // are limited to fall between the time units between these bounds.
    dynamicXLabelling: function dynamicXLabelling(start, stop) {
      var timeUnit, candidateLabels;

      timeUnit = this.get('intervalSpecificity');
      this.set('xAxisTimeInterval', timeUnit);
      candidateLabels = d3.time[domainTypeToLabellerType[timeUnit]](start, stop);
      if (timeUnit === 'Q') {
        // Normalize quarters
        candidateLabels = this.filterLabelsForQuarters(candidateLabels);
      }
      return this.filterLabels(candidateLabels, timeUnit);
    },

    // So we need to filter and do a little math to see if we are going have any
    // minor ticks in our graph.  We'll be using the maxNumberOfMinorTicks as a
    // control to know if we're filtering or simply relegating the labels to a
    // mere tick.
    filterLabels: function filterLabels(labelCandidates, domain) {
      var maxNumberOfLabels, maxNumberOfMinorTicks, modulo, len;

      maxNumberOfLabels = this.get('maxNumberOfLabels');
      maxNumberOfMinorTicks = this.get('maxNumberOfMinorTicks');
      len = labelCandidates.length;

      if (len > maxNumberOfLabels && typeof this.customFilterLibrary[domain] === "function") {
        labelCandidates = this.customFilterLibrary[domain](maxNumberOfLabels, maxNumberOfMinorTicks, labelCandidates);
        len = labelCandidates.length;
      } else if (len > maxNumberOfLabels) {
        // This tells us how many times we can half the results until we're at or
        // below our maxNumberOfLabels threshold. Derived from:
        // len ∕ 2ⁿ ≤ maxNumberOfLabels
        // Math.log(x) / Math.LN2
        modulo = Math.ceil(Math.log(len / (maxNumberOfLabels * (maxNumberOfMinorTicks + 1))) / Math.LN2) + 1;
        labelCandidates = labelCandidates.filter(function (d, i) {
          return i % Math.pow(2, modulo) === 0;
        });
        len = labelCandidates.length;
      }

      // So now we figure out (if we have added space for) the number of minor
      // ticks that will be shown in the presentiation.
      if (maxNumberOfMinorTicks > 0) {
        this.set('minorTickInterval', Math.ceil(len / maxNumberOfLabels));
      }
      return labelCandidates;
    },

    filterLabelsForQuarters: function filterLabelsForQuarters(dates) {
      // Pretty simple; getMonth is a 0 based index of the month.  We do modulo
      // for the time being.
      return dates.filter(function (d) {
        return d.getMonth() % 3 === 0;
      });
    },

    // We have an option of suppling custom filters based on the date type.  This
    // way we can append any special behavior or pruning algorithm to Months that
    // wouldn't be applicable to Weeks
    customFilterLibrary: {},

    // Returns the function which returns the labelled intervals between
    // start and stop for the selected interval.
    tickLabelerFn: _Ember['default'].computed('dynamicXAxis', 'maxNumberOfLabels', 'maxNumberOfMinorTicks', 'xAxisVertLabels', 'xAxisTimeInterval', 'SPECIFICITY_RATIO', 'minTimeSpecificity', 'maxTimeSpecificity', function () {
      if (this.get('dynamicXAxis')) {
        return _.bind(function (start, stop) {
          return this.dynamicXLabelling(start, stop);
        }, this);
      } else {
        return _.bind(function (start, stop) {
          var domain, candidateLabels;
          domain = this.get('xAxisTimeInterval');
          // So we're going to use the interval we defined as a the maxTimeSpecificity
          this.set('maxTimeSpecificity', domain);
          candidateLabels = d3.time[domainTypeToLabellerType[domain]](start, stop);
          if (domain === 'Q') {
            // Normalize quarters
            candidateLabels = this.filterLabelsForQuarters(candidateLabels);
          }
          return this.filterLabels(candidateLabels, domain);
        }, this);
      }
    }),

    quarterFormat: function quarterFormat(d) {
      var month, prefix, suffix;
      month = d.getMonth() % 12;
      prefix = "";
      if (month < 3) {
        prefix = 'Q1';
      } else if (month < 6) {
        prefix = 'Q2';
      } else if (month < 9) {
        prefix = 'Q3';
      } else {
        prefix = 'Q4';
      }
      suffix = d3.time.format('%Y')(d);
      return prefix + ' ' + suffix;
    },

    // See https://github.com/mbostock/d3/wiki/Time-Formatting
    formattedTime: _Ember['default'].computed('xAxisTimeInterval', function () {
      switch (this.get('xAxisTimeInterval')) {
        case 'years':
        case 'Y':
          return d3.time.format('%Y');
        case 'quarters':
        case 'Q':
          return this.quarterFormat;
        case 'months':
        case 'M':
          return d3.time.format('%b \'%y');
        case 'weeks':
        case 'W':
          return d3.time.format('%-m/%-d/%y');
        case 'days':
        case 'D':
          return d3.time.format('%-m/%-d/%y');
        case 'hours':
        case 'H':
          return d3.time.format('%H:%M:%S');
        case 'seconds':
        case 'S':
          return d3.time.format('%H:%M:%S');
        default:
          return d3.time.format('%Y');
      }
    })
  });
});
define("ember-charts/templates/components/chart-component", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = Ember.HTMLBars.template((function () {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("g");
        dom.setAttribute(el2, "class", "chart-viewport");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks,
            get = hooks.get,
            attribute = hooks.attribute;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var attrMorph0 = dom.createAttrMorph(element0, 'width');
        var attrMorph1 = dom.createAttrMorph(element0, 'height');
        var attrMorph2 = dom.createAttrMorph(element1, 'transform');
        attribute(env, attrMorph0, element0, "width", get(env, context, "outerWidth"));
        attribute(env, attrMorph1, element0, "height", get(env, context, "outerHeight"));
        attribute(env, attrMorph2, element1, "transform", get(env, context, "transformViewport"));
        return fragment;
      }
    };
  })());
});
define("ember-charts/utils/group-by", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.groupBy = groupBy;

	function groupBy(obj, getter) {
		var group, key, value;
		var result = {};
		for (var i = 0, len = obj.length; i < len; i++) {
			value = obj[i];
			key = getter(value, i);
			group = result[key] || (result[key] = []);
			group.push(value);
		}
		return result;
	}
});
define('ember-charts/utils/label-trimmer', ['exports', 'module', 'ember'], function (exports, module, _ember) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  module.exports = _Ember['default'].Object.extend({

    // Reserved space for extra characters
    reservedCharLength: 0,

    getLabelSize: function getLabelSize() {
      return 100;
    },

    getLabelText: function getLabelText(d) {
      return d.label;
    },

    trim: _Ember['default'].computed('getLabelSize', 'getLabelText', function () {

      var getLabelSize = this.get('getLabelSize');
      var getLabelText = this.get('getLabelText');
      var reservedCharLength = this.get('reservedCharLength');

      return function (selection) {

        return selection.text(function (d) {

          var bbW = this.getBBox().width;
          var label = getLabelText(d);
          if (!label) {
            return '';
          }
          var charWidth = bbW / label.length;
          var textLabelWidth = getLabelSize(d, selection) - reservedCharLength * charWidth;
          var numChars = Math.floor(textLabelWidth / charWidth);

          if (numChars - 3 <= 0) {
            return '...';
          } else if (bbW > textLabelWidth) {
            return label.slice(0, numChars - 3) + '...';
          } else {
            return label;
          }
        });
      };
    })
  });
});
define('ember', ['exports', 'module'], function(exports, module) {
  module.exports = window.Ember;
});

window.Ember.Charts = Ember.Namespace.create();
window.Ember.TEMPLATES['components/chart-component'] = require('ember-charts/templates/components/chart-component')['default'];
window.Ember.Charts.BubbleComponent = require('ember-charts/components/bubble-chart')['default'];
window.Ember.Charts.ChartComponent = require('ember-charts/components/chart-component')['default'];
window.Ember.Charts.HorizontalBarComponent = require('ember-charts/components/horizontal-bar-chart')['default'];
window.Ember.Charts.PieComponent = require('ember-charts/components/pie-chart')['default'];
window.Ember.Charts.ScatterComponent = require('ember-charts/components/scatter-chart')['default'];
window.Ember.Charts.TimeSeriesComponent = require('ember-charts/components/time-series-chart')['default'];
window.Ember.Charts.VerticalBarComponent = require('ember-charts/components/vertical-bar-chart')['default'];
window.Ember.Charts.StackedVerticalBarComponent = require('ember-charts/components/stacked-vertical-bar-chart')['default'];
window.Ember.Charts.AxesMixin = require('ember-charts/mixins/axes')['default'];
window.Ember.Charts.Colorable = require('ember-charts/mixins/colorable')['default'];
window.Ember.Charts.FloatingTooltipMixin = require('ember-charts/mixins/floating-tooltip')['default'];
window.Ember.Charts.Formattable = require('ember-charts/mixins/formattable')['default'];
window.Ember.Charts.HasTimeSeriesRuleMixin = require('ember-charts/mixins/has-time-series-rule')['default'];
window.Ember.Charts.Legend = require('ember-charts/mixins/legend')['default'];
window.Ember.Charts.NoMarginChartMixin = require('ember-charts/mixins/no-margin-chart')['default'];
window.Ember.Charts.PieLegend = require('ember-charts/mixins/pie-legend')['default'];
window.Ember.Charts.ResizeHandlerMixin = require('ember-charts/mixins/resize-handler')['default'];
window.Ember.Charts.SortableChartMixin = require('ember-charts/mixins/sortable-chart')['default'];
window.Ember.Charts.TimeSeriesLabeler = require('ember-charts/mixins/time-series-labeler')['default'];
Ember.onLoad('Ember.Application', function(Application) {
Application.initializer({
name: 'ember-charts',
initialize: function(container) {
container.register('component:bubble-chart', require('ember-charts/components/bubble-chart')['default']);
container.register('component:chart-component', require('ember-charts/components/chart-component')['default']);
container.register('component:horizontal-bar-chart', require('ember-charts/components/horizontal-bar-chart')['default']);
container.register('component:pie-chart', require('ember-charts/components/pie-chart')['default']);
container.register('component:scatter-chart', require('ember-charts/components/scatter-chart')['default']);
container.register('component:time-series-chart', require('ember-charts/components/time-series-chart')['default']);
container.register('component:vertical-bar-chart', require('ember-charts/components/vertical-bar-chart')['default']);
container.register('component:stacked-vertical-bar-chart', require('ember-charts/components/stacked-vertical-bar-chart')['default']);
}
});
});
Ember.Charts.ChartComponent.reopen({
layoutName: 'components/ember-charts'
});})();