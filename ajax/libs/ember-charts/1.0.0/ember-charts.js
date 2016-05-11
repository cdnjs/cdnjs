/*!
* ember-charts v1.0.0
* Copyright 2012-2015 Addepar Inc.
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
        // Line 1
        var content = "<span class=\"tip-label\">" + data.label + "</span>";
        // Line 2
        content += "<span class=\"name\">" + this.get('tooltipValueDisplayName') + ": </span>";
        content += "<span class=\"value\">" + formatLabel(data.value) + "</span>";
        return this.showTooltip(content, d3.event);
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

  module.exports = _Ember['default'].Component.extend(_ColorableMixin['default'], _ResizeHandlerMixin['default'], {
    layoutName: 'components/chart-component',
    classNames: ['chart-frame', 'scroll-y'],
    isInteractive: true,

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    // Margin between viewport and svg boundary
    horizontalMargin: 30,
    verticalMargin: 30,

    marginRight: _Ember['default'].computed.alias('horizontalMargin'),
    marginLeft: _Ember['default'].computed.alias('horizontalMargin'),
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
      return 'translate(' + this.get('marginLeft') + ',' + this.get('marginTop') + ')';
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
});
define('ember-charts/components/horizontal-bar-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/formattable', '../mixins/floating-tooltip', '../mixins/sortable-chart', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsFormattable, _mixinsFloatingTooltip, _mixinsSortableChart, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _SortableChartMixin = _interopRequireDefault(_mixinsSortableChart);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  module.exports = _ChartComponent['default'].extend(_FloatingTooltipMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], {
    classNames: ['chart-horizontal-bar'],

    // ----------------------------------------------------------------------------
    // Horizontal Bar Chart Options
    // ----------------------------------------------------------------------------

    // Minimum height of the whole chart, including padding
    defaultOuterHeight: 500,

    // Override maximum width of labels to be a percentage of the total width
    labelWidth: _Ember['default'].computed('outerWidth', function () {
      return 0.25 * this.get('outerWidth');
    }),

    // Space between label and zeroline (overrides ChartView)
    // Also used to pad labels against the edges of the viewport
    labelPadding: 20,

    // Space between adjacent bars, as fraction of padded bar size
    barPadding: 0.2,

    // Constraints on size of each bar
    maxBarThickness: 60,
    minBarThickness: 20,

    // ----------------------------------------------------------------------------
    // Data
    // ----------------------------------------------------------------------------

    finishedData: _Ember['default'].computed.alias('sortedData'),

    // ----------------------------------------------------------------------------
    // Layout
    // ----------------------------------------------------------------------------

    minOuterHeight: _Ember['default'].computed('numBars', 'minBarThickness', 'marginTop', 'marginBottom', function () {
      var minBarSpace = this.get('numBars') * this.get('minBarThickness');
      return minBarSpace + this.get('marginTop') + this.get('marginBottom');
    }),

    maxOuterHeight: _Ember['default'].computed('numBars', 'maxBarThickness', 'marginTop', 'marginBottom', function () {
      var maxBarSpace = this.get('numBars') * this.get('maxBarThickness');
      return maxBarSpace + this.get('marginTop') + this.get('marginBottom');
    }),

    // override the default outerHeight, so the graph scrolls
    outerHeight: _Ember['default'].computed('minOuterHeight', 'maxOuterHeight', 'defaultOuterHeight', function () {
      var maxMinDefault = d3.max([this.get('defaultOuterHeight'), this.get('minOuterHeight')]);
      return d3.min([maxMinDefault, this.get('maxOuterHeight')]);
    }),

    marginTop: _Ember['default'].computed.alias('labelPadding'),
    marginBottom: _Ember['default'].computed.alias('labelPadding'),

    horizontalMargin: _Ember['default'].computed('labelWidth', 'labelPadding', function () {
      return this.get('labelWidth') + this.get('labelPadding') * 2;
    }),

    // ----------------------------------------------------------------------------
    // Graphics Properties
    // ----------------------------------------------------------------------------

    numBars: _Ember['default'].computed.alias('finishedData.length'),

    // Range of values used to size the graph, within which bars will be drawn
    xDomain: _Ember['default'].computed('finishedData', 'xDomainPadding', function () {
      var values = this.get('finishedData').map(function (d) {
        return d.value;
      });
      var minValue = d3.min(values);
      var maxValue = d3.max(values);
      if (minValue < 0) {
        // Balance negative and positive axes if we have negative values
        var absMax = Math.max(-minValue, maxValue);
        return [-absMax, absMax];
      } else {
        // Only positive values domain
        return [0, maxValue];
      }
    }),

    // Scale to map value to horizontal length of bar
    xScale: _Ember['default'].computed('width', 'xDomain', function () {
      return d3.scale.linear().domain(this.get('xDomain')).range([0, this.get('width')]).nice();
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
        // Line 1
        var content = "<span class=\"tip-label\">" + data.label + "</span>";
        // Line 2
        content += "<span class=\"name\">" + _this.get('tooltipValueDisplayName') + ": </span>";
        content += "<span class=\"value\">" + formatLabel(data.value) + "</span>";
        return _this.showTooltip(content, d3.event);
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
          return "translate(" + xScale(value) + ", " + yScale(i) + ")";
        }
      };
    }),

    barAttrs: _Ember['default'].computed('xScale', 'mostTintedColor', 'leastTintedColor', 'barThickness', function () {
      var _this3 = this;

      var xScale = this.get('xScale');
      return {
        width: function width(d) {
          return Math.abs(xScale(d.value) - xScale(0));
        },
        height: this.get('barThickness'),
        'stroke-width': 0,
        style: function style(d) {
          if (d.color) {
            return "fill:" + d.color;
          }
          var color = d.value < 0 ? _this3.get('mostTintedColor') : _this3.get('leastTintedColor');
          return "fill:" + color;
        }
      };
    }),

    valueLabelAttrs: _Ember['default'].computed('xScale', 'barThickness', 'labelPadding', function () {
      var _this4 = this;

      var xScale = this.get('xScale');
      // Anchor the label 'labelPadding' away from the zero line
      // How to anchor the text depends on the direction of the bar
      return {
        x: function x(d) {
          if (d.value < 0) {
            return -_this4.get('labelPadding');
          } else {
            return xScale(d.value) - xScale(0) + _this4.get('labelPadding');
          }
        },
        y: this.get('barThickness') / 2,
        dy: '.35em',
        'text-anchor': function textAnchor(d) {
          return d.value < 0 ? 'end' : 'start';
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
          if (d.value < 0) {
            return xScale(0) - xScale(d.value) + _this5.get('labelPadding');
          } else {
            return -_this5.get('labelPadding');
          }
        },
        y: this.get('barThickness') / 2,
        dy: '.35em',
        'text-anchor': function textAnchor(d) {
          return d.value < 0 ? 'start' : 'end';
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

    renderVars: ['barThickness', 'yScale', 'finishedData', 'colorRange'],

    drawChart: function drawChart() {
      this.updateData();
      this.updateAxes();
      this.updateGraphic();
    },

    updateData: function updateData() {
      var groups = this.get('groups');
      var showDetails = this.get('showDetails');
      var hideDetails = this.get('hideDetails');

      var entering = groups.enter().append('g').attr('class', 'bar').on("mouseover", function (d, i) {
        return showDetails(d, i, this);
      }).on("mouseout", function (d, i) {
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

    updateGraphic: function updateGraphic() {
      var _this6 = this;

      var groups = this.get('groups').attr(this.get('groupAttrs'));

      groups.select('rect').attr(this.get('barAttrs'));

      groups.select('text.value').text(function (d) {
        return _this6.get('formatLabelFunction')(d.value);
      }).attr(this.get('valueLabelAttrs'));

      var labelWidth = this.get('labelWidth');
      var labelTrimmer = _LabelTrimmer['default'].create({
        getLabelSize: function getLabelSize() {
          return labelWidth;
        },
        getLabelText: function getLabelText(d) {
          return d.label;
        }
      });

      return groups.select('text.group').text(function (d) {
        return d.label;
      }).attr(this.get('groupLabelAttrs')).call(labelTrimmer.get('trim'));
    }
  });
});
define('ember-charts/components/pie-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/formattable', '../mixins/floating-tooltip', '../mixins/sortable-chart', '../mixins/pie-legend', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsFormattable, _mixinsFloatingTooltip, _mixinsSortableChart, _mixinsPieLegend, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _FormattableMixin = _interopRequireDefault(_mixinsFormattable);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _SortableChartMixin = _interopRequireDefault(_mixinsSortableChart);

  var _PieLegendMixin = _interopRequireDefault(_mixinsPieLegend);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  module.exports = _ChartComponent['default'].extend(_FloatingTooltipMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], _PieLegendMixin['default'], {

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

    // Override maximum width of labels to be a percentage of the total width
    labelWidth: _Ember['default'].computed('outerWidth', function () {
      return 0.25 * this.get('outerWidth');
    }),

    // Essentially we don't want a maximum pieRadius
    maxRadius: 2000,

    // top and bottom margin will never be smaller than this
    // you can use this to ensure that your labels don't get pushed off
    // the top / bottom when your labels are large or the chart is very small
    minimumTopBottomMargin: 0,

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
          percent: d3.round(100.0 * d.value / total)
        };
      });

      return _.sortBy(data, this.get('sortKey'));
    }),

    // This takes the sorted slices that have percents calculated and returns
    // sorted slices that obey the "other" slice aggregation rules
    sortedDataWithOther: _Ember['default'].computed('sortedData', 'maxNumberOfSlices', 'minSlicePercent', function () {
      var lastItem, overflowSlices, slicesLeft;

      var data = _.cloneDeep(this.get('sortedData')).reverse();
      var maxNumberOfSlices = this.get('maxNumberOfSlices');
      var minSlicePercent = this.get('minSlicePercent');
      var otherItems = [];
      var otherSlice = {
        label: 'Other',
        percent: 0,
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

      // only push other slice if there is more than one other item
      if (otherItems.length === 1) {
        slicesLeft.push(otherItems[0]);
      } else if (otherSlice.percent > 0) {
        slicesLeft.push(otherSlice);
      }

      // make slices appear in descending order
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

    // Offset slices so that the largest slice finishes at 12 o'clock
    startOffset: _Ember['default'].computed('finishedData', function () {
      var data = this.get('finishedData');
      var sum = data.reduce(function (p, d) {
        return d.percent + p;
      }, 0);
      return _.last(data).percent / sum * 2 * Math.PI;
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
        content = "<span class=\"tip-label\">" + data.label + "</span>";
        content += "<span class=\"name\">" + _this2.get('tooltipValueDisplayName') + ": </span>";
        content += "<span class=\"value\">" + formatLabelFunction(value) + "</span>";
        return _this2.showTooltip(content, d3.event);
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
        _.each(positions, function (pos) {
          if (Math.abs(ypos - pos) < height) {
            return true;
          }
        });
        return false;
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
            var angle = (d.endAngle - d.startAngle) * 0.5 + d.startAngle;
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
            if (labelOverlap(side, labelYPos, labelHeight)) {
              if (side === 'right') {
                labelYPos = _.max(usedLabelPositions[side]) + labelHeight;
              } else {
                labelYPos = _.min(usedLabelPositions[side]) - labelHeight;
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

    renderVars: ['pieRadius', 'labelWidth', 'finishedData'],

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
});
define('ember-charts/components/scatter-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/floating-tooltip', '../mixins/axes', '../mixins/no-margin-chart', '../utils/group-by'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsFloatingTooltip, _mixinsAxes, _mixinsNoMarginChart, _utilsGroupBy) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _ChartComponent = _interopRequireDefault(_chartComponent);

  var _LegendMixin = _interopRequireDefault(_mixinsLegend);

  var _FloatingTooltipMixin = _interopRequireDefault(_mixinsFloatingTooltip);

  var _AxesMixin = _interopRequireDefault(_mixinsAxes);

  var _NoMarginChartMixin = _interopRequireDefault(_mixinsNoMarginChart);

  module.exports = _ChartComponent['default'].extend(_LegendMixin['default'], _FloatingTooltipMixin['default'], _AxesMixin['default'], _NoMarginChartMixin['default'], {

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
    // TODO(tony): Consider making logic for whether we are showing the title or
    // not and then axis mixin will calculate axis offset that will be added
    axisTitleHeightOffset: _Ember['default'].computed('axisTitleHeight', 'labelPadding', function () {
      return this.get('axisTitleHeight') + this.get('labelPadding');
    }),

    // TODO(tony): Just use axisBottomOffset here
    legendChartPadding: _Ember['default'].computed('labelHeightOffset', 'axisTitleHeightOffset', function () {
      return this.get('axisTitleHeightOffset') + this.get('labelHeightOffset');
    }),

    // Chart Graphic Dimensions
    graphicTop: _Ember['default'].computed.alias('axisTitleHeight'),
    graphicLeft: _Ember['default'].computed.alias('labelWidthOffset'),

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', function () {
      return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
    }),

    graphicWidth: _Ember['default'].computed('width', 'labelWidthOffset', function () {
      return this.get('width') - this.get('labelWidthOffset');
    }),

    // Height of the text for the axis titles
    axisTitleHeight: 18,

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
      var padding = (xDomain[1] - xDomain[0]) * this.get('graphPadding');

      return d3.scale.linear().domain([xDomain[0] - padding, xDomain[1] + padding]).range([graphicLeft, graphicLeft + graphicWidth]).nice(this.get('numXTicks'));
    }),

    // The Y axis scale spans the range of Y values plus any graphPadding
    yScale: _Ember['default'].computed('yDomain', 'graphPadding', 'graphicTop', 'graphicHeight', 'numYTicks', function () {
      var yDomain = this.get('yDomain');
      var graphicTop = this.get('graphicTop');
      var graphicHeight = this.get('graphicHeight');
      var padding = (yDomain[1] - yDomain[0]) * this.get('graphPadding');

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
        var content = "<span class=\"tip-label\">" + data.group + "</span>";
        content += "<span class=\"name\">" + _this4.get('xValueDisplayName') + ": </span>";
        content += "<span class=\"value\">" + formatXValue(data.xValue) + "</span><br/>";
        content += "<span class=\"name\">" + _this4.get('yValueDisplayName') + ": </span>";
        content += "<span class=\"value\">" + formatYValue(data.yValue) + "</span>";

        return _this4.showTooltip(content, d3.event);
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

    selectOrCreateAxisTitle: function selectOrCreateAxisTitle(selector) {
      var title = this.get('viewport').select(selector);
      if (title.empty()) {
        return this.get('viewport').append('text');
      } else {
        return title;
      }
    },

    xAxis: _Ember['default'].computed(function () {
      return this.selectOrCreateAxis('.x.axis').attr('class', 'x axis');
    })["volatile"](),

    yAxis: _Ember['default'].computed(function () {
      return this.selectOrCreateAxis('.y.axis').attr('class', 'y axis');
    })["volatile"](),

    xAxisTitle: _Ember['default'].computed(function () {
      return this.selectOrCreateAxisTitle('.x.axis-title').attr('class', 'x axis-title');
    })["volatile"](),

    yAxisTitle: _Ember['default'].computed(function () {
      return this.selectOrCreateAxisTitle('.y.axis-title').attr('class', 'y axis-title');
    })["volatile"](),

    // ----------------------------------------------------------------------------
    // Drawing Functions
    // ----------------------------------------------------------------------------

    renderVars: ['xScale', 'yScale', 'dotShapeArea', 'finishedData', 'xValueDisplayName', 'yValueDisplayName'],

    drawChart: function drawChart() {
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

      var xAxisPadding = this.get('labelHeightOffset') + this.get('labelPadding');
      this.get('xAxisTitle').text(this.get('xValueDisplayName')).style('text-anchor', 'middle').attr({
        x: this.get('graphicWidth') / 2 + this.get('labelWidthOffset'),
        y: this.get('graphicBottom') + xAxisPadding
      });

      return this.get('yAxisTitle').text(this.get('yValueDisplayName')).style('text-anchor', 'start').attr({
        y: 0,
        x: 0
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
});
define('ember-charts/components/time-series-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/time-series-labeler', '../mixins/floating-tooltip', '../mixins/has-time-series-rule', '../mixins/axes', '../mixins/formattable', '../mixins/no-margin-chart', '../utils/group-by'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsTimeSeriesLabeler, _mixinsFloatingTooltip, _mixinsHasTimeSeriesRule, _mixinsAxes, _mixinsFormattable, _mixinsNoMarginChart, _utilsGroupBy) {
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

  module.exports = _ChartComponent['default'].extend(_LegendMixin['default'], _TimeSeriesLabelerMixin['default'], _FloatingTooltipMixin['default'], _HasTimeSeriesRuleMixin['default'], _AxesMixin['default'], _FormattableMixin['default'], _NoMarginChartMixin['default'], {

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

    // Vertical spacing for legend, x axis labels and x axis title
    legendChartPadding: _Ember['default'].computed.alias('labelHeightOffset'),

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
      // _results = [];
      // for (groupName in groups) {
      //   values = groups[groupName];
      //   _results.push();
      // }
      return _.map(groups, function (values, groupName) {
        return {
          group: groupName,
          values: values
        };
      });

      // return _results;
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
      var delta = this._getTimeDeltaFromSelectedInterval();
      var offset = this.get('barLeftOffset');
      if (offset !== 0) {
        time = this._padTimeWithIntervalMultiplier(time, delta, offset);
      }
      return time;
    },

    // Since selected interval and time delta don't use the same naming convention
    // this converts the selected interval to the time delta convention for the
    // padding functions.
    _getTimeDeltaFromSelectedInterval: function _getTimeDeltaFromSelectedInterval() {
      switch (this.get('selectedInterval')) {
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

    graphicHeight: _Ember['default'].computed('height', 'legendHeight', 'legendChartPadding', function () {
      return this.get('height') - this.get('legendHeight') - this.get('legendChartPadding');
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
    // For a dynamic x axis, let the max number of labels be the minimum of
    // the number of x ticks and the assigned value. This is to prevent
    // the assigned value from being so large that labels flood the x axis.
    maxNumberOfLabels: _Ember['default'].computed('numXTicks', 'dynamicXAxis', function (key, value) {
      if (this.get('dynamicXAxis')) {
        value = _.isNaN(value) ? this.get('DEFAULT_MAX_NUMBER_OF_LABELS') : value;
        return Math.min(value, this.get('numXTicks'));
      } else {
        return this.get('numXTicks');
      }
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
        var content = "<span class=\"tip-label\">" + _this4.get('formatTime')(time) + "</span>";
        var formatLabelFunction = _this4.get('formatLabelFunction');

        var addValueLine = function addValueLine(d) {
          content += "<span class=\"name\">" + d.group + ": </span>";
          return content += "<span class=\"value\">" + formatLabelFunction(d.value) + "</span><br/>";
        };

        if (_Ember['default'].isArray(data.values)) {
          data.values.forEach(addValueLine);
        } else {
          addValueLine(data);
        }

        return _this4.showTooltip(content, d3.event);
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

    renderVars: ['barLeftOffset', 'labelledTicks', 'xGroupScale', 'xTimeScale', 'yScale'],

    drawChart: function drawChart() {
      this.updateBarData();
      this.updateLineData();
      this.updateLineMarkers();
      this.updateAxes();
      this.updateBarGraphic();
      this.updateLineGraphic();
      if (this.get('hasLegend')) {
        this.drawLegend();
      } else {
        this.clearLegend();
      }
    },

    updateAxes: function updateAxes() {
      var xAxis = d3.svg.axis().scale(this.get('xTimeScale')).orient('bottom').tickValues(this.get('labelledTicks')).tickSubdivide(this.get('numberOfMinorTicks')).tickFormat(this.get('formattedTime')).tickSize(6, 3);

      var graphicTop = this.get('graphicTop');
      var graphicHeight = this.get('graphicHeight');
      var gXAxis = this.get('xAxis');

      gXAxis.attr({
        transform: "translate(0," + graphicTop + graphicHeight + ")"
      }).call(xAxis);

      //tickSize isn't doing anything here, it should take two arguments
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
});
define('ember-charts/components/vertical-bar-chart', ['exports', 'module', 'ember', './chart-component', '../mixins/legend', '../mixins/floating-tooltip', '../mixins/axes', '../mixins/formattable', '../mixins/sortable-chart', '../mixins/no-margin-chart', '../utils/group-by', '../utils/label-trimmer'], function (exports, module, _ember, _chartComponent, _mixinsLegend, _mixinsFloatingTooltip, _mixinsAxes, _mixinsFormattable, _mixinsSortableChart, _mixinsNoMarginChart, _utilsGroupBy, _utilsLabelTrimmer) {
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

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

  module.exports = _ChartComponent['default'].extend(_LegendMixin['default'], _FloatingTooltipMixin['default'], _AxesMixin['default'], _FormattableMixin['default'], _SortableChartMixin['default'], _NoMarginChartMixin['default'], {

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
            y1: y0 += Math.max(d.value, 0)
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
        // If we have grouped data and do not have stackBars turned on, split the
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

    legendChartPadding: _Ember['default'].computed.alias('labelHeightOffset'),

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

    individualBarLabels: _Ember['default'].computed('groupedData.[]', function () {
      var groups = _.map(_.values(this.get('groupedData')), function (g) {
        return _.pluck(g, 'label');
      });
      return _.uniq(_.flatten(groups));
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
    // ----------------------------------------------------------------------------

    numColorSeries: _Ember['default'].computed.alias('individualBarLabels.length'),

    // ----------------------------------------------------------------------------
    // Legend Configuration
    // ----------------------------------------------------------------------------

    hasLegend: _Ember['default'].computed('stackBars', 'isGrouped', 'legendItems.length', 'showLegend', function () {
      return this.get('stackBars') || this.get('isGrouped') && this.get('legendItems.length') > 1 && this.get('showLegend');
    }),

    legendItems: _Ember['default'].computed('individualBarLabels.[]', 'getSeriesColor', 'stackBars', 'labelIDMapping.[]', function () {
      var _this2 = this;

      var getSeriesColor;
      getSeriesColor = this.get('getSeriesColor');
      return this.get('individualBarLabels').map(function (label, i) {
        var color;
        color = getSeriesColor(label, i);
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
        var content = data.group ? "<span class=\"tip-label\">" + data.group + "</span>" : '';

        var formatLabel = _this3.get('formatLabelFunction');
        var addValueLine = function addValueLine(d) {
          content += "<span class=\"name\">" + d.label + ": </span>";
          return content += "<span class=\"value\">" + formatLabel(d.value) + "</span><br/>";
        };

        if (isGroup) {
          // Display all bar details if hovering over axis group label
          data.values.forEach(addValueLine);
        } else {
          // Just hovering over single bar
          addValueLine(data);
        }
        return _this3.showTooltip(content, d3.event);
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

    stackedBarAttrs: _Ember['default'].computed('yScale', 'groupWidth', 'labelIDMapping.[]', function () {
      var _this6 = this;

      var yScale, zeroDisplacement;
      zeroDisplacement = 1;
      yScale = this.get('yScale');
      return {
        "class": function _class(barSection) {
          var id;
          id = _this6.get('labelIDMapping')[barSection.label];
          return "grouping-" + id;
        },
        'stroke-width': 0,
        width: function width() {
          return _this6.get('groupWidth');
        },
        x: null,
        y: function y(barSection) {
          return yScale(barSection.y1) + zeroDisplacement;
        },
        height: function height(barSection) {
          return yScale(barSection.y0) - yScale(barSection.y1);
        }
      };
    }),

    groupedBarAttrs: _Ember['default'].computed('yScale', 'getSeriesColor', 'barWidth', 'xWithinGroupScale', function () {
      var _this7 = this;

      var zeroDisplacement = 1;
      var yScale = this.get('yScale');

      return {
        'class': function _class(d, i) {
          return "grouping-" + i;
        },
        'stroke-width': 0,
        width: function width() {
          return _this7.get('barWidth');
        },
        x: function x(d) {
          return _this7.get('xWithinGroupScale')(d.label);
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
      };
    }),

    labelAttrs: _Ember['default'].computed('barWidth', 'isGrouped', 'stackBars', 'groupWidth', 'xWithinGroupScale', 'graphicTop', 'graphicHeight', 'labelPadding', function () {
      var _this8 = this;

      return {
        'stroke-width': 0,
        transform: function transform(d) {
          var dx = _this8.get('barWidth') / 2;
          if (_this8.get('isGrouped') || _this8.get('stackBars')) {
            dx += _this8.get('groupWidth') / 2 - _this8.get('barWidth') / 2;
          } else {
            dx += _this8.get('xWithinGroupScale')(d.group);
          }
          var dy = _this8.get('graphicTop') + _this8.get('graphicHeight') + _this8.get('labelPadding');
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

    renderVars: ['xWithinGroupScale', 'xBetweenGroupScale', 'yScale', 'finishedData', 'getSeriesColor'],

    drawChart: function drawChart() {
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
      var _this9 = this;

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
            return _this9.get('rotatedLabelLength');
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

      return gYAxis.selectAll('text').style('text-anchor', 'end').attr({
        x: -this.get('labelPadding')
      });
    },

    updateGraphic: function updateGraphic() {
      var groups = this.get('groups');

      var barAttrs = this.get('stackBars') ? this.get('stackedBarAttrs') : this.get('groupedBarAttrs');

      groups.attr(this.get('groupAttrs'));
      groups.selectAll('rect').attr(barAttrs).style('fill', this.get('getSeriesColor'));
      return groups.select('g.groupLabel').attr(this.get('labelAttrs'));
    }
  });
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
      });
      return markerData;
    }

  });
});
define('ember-charts/mixins/legend', ['exports', 'module', 'ember', '../utils/label-trimmer'], function (exports, module, _ember, _utilsLabelTrimmer) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Ember = _interopRequireDefault(_ember);

  var _LabelTrimmer = _interopRequireDefault(_utilsLabelTrimmer);

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

    // Dynamically calculate the number of legend items in each row
    numLegendItemsPerRow: _Ember['default'].computed('legendWidth', 'legendItemWidth', function () {
      return Math.floor(this.get('legendWidth') / this.get('legendItemWidth'));
    }),

    // Dynamically calculate the number of rows needed
    numLegendRows: _Ember['default'].computed('legendItems.length', 'numLegendItemsPerRow', function () {
      return Math.ceil(this.get('legendItems.length') / this.get('numLegendItemsPerRow'));
    }),

    // Maximum width of each label before it gets truncated
    legendLabelWidth: _Ember['default'].computed('legendItemWidth', 'legendIconRadius', 'legendLabelPadding', function () {
      return this.get('legendItemWidth') - this.get('legendIconRadius') - this.get('legendLabelPadding') * 2;
    }),

    // ----------------------------------------------------------------------------
    // Styles
    // ----------------------------------------------------------------------------

    // Space between legend and chart (need to account for label size and perhaps
    // more). Charts will usually override this because there may be other things
    // below the chart graphic like an axis or labels or axis title.
    legendChartPadding: 0,

    // we use averageLegendLabelWidth in order to estimate how much to move the
    // labels to make them seem roughly centered
    // averageLegendLabelWidth is set every time we redraw the legend
    averageLegendLabelWidth: 0,

    // Center the legend beneath the chart. Since the legend is inside the chart
    // viewport, which has already been positioned with regards to margins,
    // only consider the height of the chart.
    legendAttrs: _Ember['default'].computed('outerWidth', 'graphicBottom', 'legendTopPadding', 'legendChartPadding', function () {
      var dx, dy, offsetToLegend;
      dx = this.get('outerWidth') / 2;
      offsetToLegend = this.get('legendChartPadding') + this.get('legendTopPadding');
      dy = this.get('graphicBottom') + offsetToLegend;
      return {
        transform: "translate(" + dx + ", " + dy + ")"
      };
    }),

    // Place each legend item, breaking across rows. Center them if there is one
    // row
    // Ideally legend items would be centered to the very middle of the graph,
    // this is made difficult by the fact that we want the icons to line up in
    // nice columns and that the labels are variable length
    legendItemAttrs: _Ember['default'].computed('legendItemWidth', 'legendItemHeight', 'numLegendItemsPerRow', 'legendItems.length', 'numLegendRows', 'averageLegendLabelWidth', function () {

      var legendItemWidth = this.get('legendItemWidth');
      var legendItemHeight = this.get('legendItemHeight');
      var numItemsPerRow = this.get('numLegendItemsPerRow');
      var numAllItems = this.get('legendItems.length');
      var isSingleRow = this.get('numLegendRows') === 1;

      var _this = this;
      return {
        "class": 'legend-item',
        width: legendItemWidth,
        'stroke-width': 0,
        transform: function transform(d, i) {
          var col = i % numItemsPerRow;
          var row = Math.floor(i / numItemsPerRow);
          var items = isSingleRow ? numAllItems : numItemsPerRow;
          var dx = col * legendItemWidth - items / 2 * legendItemWidth + _this.get('averageLegendLabelWidth') / 2;
          var dy = row * legendItemHeight + legendItemHeight / 2;
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
        var content = "<span class=\"tip-label\">" + data.label + "</span>";
        if (data.xValue != null) {
          var formatXValue = _this.get('formatXValue');
          var formatYValue = _this.get('formatYValue');
          content += "<span class=\"name\">" + _this.get('tooltipXValueDisplayName') + ": </span>";
          content += "<span class=\"value\">" + formatXValue(data.xValue) + "</span><br/>";
          content += "<span class=\"name\">" + _this.get('tooltipYValueDisplayName') + ": </span>";
          content += "<span class=\"value\">" + formatYValue(data.yValue) + "</span>";
        }
        return _this.showTooltip(content, d3.event);
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

    drawLegend: function drawLegend() {
      if (!this.get('showLegend')) {
        return;
      }
      this.clearLegend();
      var legend = this.get('legend');
      legend.attr(this.get('legendAttrs'));

      var showLegendDetails = this.get('showLegendDetails');
      var hideLegendDetails = this.get('hideLegendDetails');
      var legendItems = legend.selectAll('.legend-item').data(this.get('legendItems')).enter().append('g').attr(this.get('legendItemAttrs')).on("mouseover", function (d, i) {
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
      var legendLabelWidth = this.get('legendLabelWidth');
      var labelTrimmer = _LabelTrimmer['default'].create({
        getLabelSize: function getLabelSize() {
          return legendLabelWidth;
        },
        getLabelText: function getLabelText(d) {
          return d.label;
        }
      });

      legendItems.append('text').style('text-anchor', 'start').text(function (d) {
        return d.label;
      }).attr(this.get('legendLabelAttrs')).call(labelTrimmer.get('trim'));

      var totalLabelWidth = 0;
      legend.selectAll('text').each(function () {
        return totalLabelWidth += this.getComputedTextLength();
      });
      return this.set('averageLegendLabelWidth', totalLabelWidth / this.get('legendItems.length'));
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
    marginLeft: 0,
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

  module.exports = _Ember['default'].Mixin.create({

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
      var currentText, nextLabel, rowNode;
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

      var arr = labelStrings.slice(1).length;
      for (var i = 0, len = arr.length; i < len; i++) {
        nextLabel = arr[i];
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
  // Provides @formattedTime. Depends on @xDomain and @selectedInterval.
  module.exports = _Ember['default'].Mixin.create({

    // When set to true, ticks are drawn in the middle of an interval. By default,
    // they are drawn at the start of an interval.
    centerAxisLabels: false,

    // Interval for ticks on time axis can be:
    // years, months, weeks, days
    // This is used only when a dynamic x axis is not used
    selectedInterval: 'M',

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

    // This is the number of subdivisions between each major tick on the x
    // axis. Minor ticks have no labels. For instance, if your maxNumberOfLabels
    // is 10, and you are charting 20 weeks, there will be 10
    // major ticks with one subivision (minor ticks) between.
    numberOfMinorTicks: _Ember['default'].computed('xDomain', 'xAxisTimeInterval', 'labelledTicks', function () {
      var allTicks, domain, findTick, firstIndex, interval, labelledTicks, xDomain, secondIndex, start, stop;
      labelledTicks = this.get('labelledTicks');
      xDomain = this.get('xDomain');
      start = xDomain[0];
      stop = xDomain[1];
      domain = this.get('xAxisTimeInterval');
      interval = domain === 'Q' ? this.MONTHS_IN_QUARTER : 1;

      // All the ticks which occur between start and stop (including
      // unlabelled ticks)
      allTicks = d3.time[domainTypeToLabellerType[domain]](start, stop, interval);
      if (labelledTicks.length < 2) {
        return 0;
      }

      // equality for ticks
      findTick = function (tick) {
        return function (x) {
          return +x === +tick;
        };
      };

      // Returns the difference between where the second labelled value
      // occurs in the unlabelled array and where the first occurs - e.g. in
      // the above example 3 - 1 - 1 => 1 subdivision tick.
      secondIndex = _.findIndex(allTicks, findTick(labelledTicks[1]));
      firstIndex = _.findIndex(allTicks, findTick(labelledTicks[0]));
      return secondIndex - firstIndex - 1;
    }),

    //  This is the set of ticks on which labels appear.
    labelledTicks: _Ember['default'].computed('xDomain', 'centerAxisLabels', 'xAxisTimeInterval', function () {
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
          return (stop - start) / 1000;
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
      var d, domainType, domainTypes, i, ind1, ind2, interval, j, labellerTypes, labels, len, maxNumberOfLabels, timeBetween, times;
      ind1 = this.get('DOMAIN_ORDERING').indexOf(this.get('minTimeSpecificity'));
      ind2 = this.get('DOMAIN_ORDERING').indexOf(this.get('maxTimeSpecificity'));

      // Refers to the metrics used for the labelling
      domainTypes = this.get('DOMAIN_ORDERING').slice(ind1, +ind2 + 1 || 9e9);

      // The labeller type to create the labels for each metric
      labellerTypes = (function () {
        var j, len, results;
        results = [];
        for (j = 0, len = domainTypes.length; j < len; j++) {
          domainType = domainTypes[j];
          results.push(domainTypeToLabellerType[domainType]);
        }
        return results;
      })();

      // The time span in various metrics
      times = (function () {
        var j, len, results;
        results = [];
        for (j = 0, len = domainTypes.length; j < len; j++) {
          d = domainTypes[j];
          results.push(this.numTimeBetween(domainTypeToLongDomainType[d], start, stop));
        }
        return results;
      }).call(this);
      labels = null;
      maxNumberOfLabels = this.get('maxNumberOfLabels');

      for (i = j = 0, len = times.length; j < len; i = ++j) {
        timeBetween = times[i];

        // quarter labels are calculated by simply getting month labels with 3
        // month gaps
        interval = null;
        if (timeBetween < maxNumberOfLabels) {
          interval = domainTypes[i] === 'Q' ? this.MONTHS_IN_QUARTER : 1;
        } else if (domainTypes[i] === this.get('maxTimeSpecificity') || times[i + 1] < maxNumberOfLabels * this.get('SPECIFICITY_RATIO')) {
          if (domainTypes[i] === 'Q') {
            interval = Math.ceil(this.MONTHS_IN_QUARTER * timeBetween / maxNumberOfLabels);
          } else {
            interval = Math.ceil(timeBetween / maxNumberOfLabels);
          }
        }
        if (interval != null) {
          this.set('xAxisTimeInterval', domainTypes[i]);
          labels = this.filterLabels(d3.time[labellerTypes[i]](start, stop), interval);
          break;
        }
      }
      return labels;
    },
    filterLabels: function filterLabels(array, interval) {
      return array.filter(function filterLabels(d, i) {
        return i % interval === 0;
      });
    },
    // Returns the function which returns the labelled intervals between
    // start and stop for the selected interval.
    tickLabelerFn: _Ember['default'].computed('dynamicXAxis', 'maxNumberOfLabels', 'xAxisTimeInterval', 'SPECIFICITY_RATIO', 'minTimeSpecificity', 'maxTimeSpecificity', function () {
      if (this.get('dynamicXAxis')) {
        return _.bind(function (start, stop) {
          return this.dynamicXLabelling(start, stop);
        }, this);
      } else {
        return _.bind(function (start, stop) {
          var domain, interval, timeBetween;
          domain = this.get('xAxisTimeInterval');
          timeBetween = this.numTimeBetween(domainTypeToLongDomainType[domain], start, stop);
          if (domain === 'Q') {
            if (timeBetween > this.get('maxNumberOfLabels')) {
              return d3.time.years(start, stop);
            } else {
              return d3.time.months(start, stop, this.MONTHS_IN_QUARTER);
            }
          } else {
            if (timeBetween > this.get('maxNumberOfLabels')) {
              interval = Math.ceil(timeBetween / this.get('maxNumberOfLabels'));
            } else {
              interval = 1;
            }

            return this.filterLabels(d3.time[domainTypeToLabellerType[domain]](start, stop), interval);
          }
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

    getLabelSize: function getLabelSize() {
      return 100;
    },

    getLabelText: function getLabelText(d) {
      return d.label;
    },

    trim: _Ember['default'].computed('getLabelSize', 'getLabelText', function () {

      var getLabelSize = this.get('getLabelSize');
      var getLabelText = this.get('getLabelText');

      return function (selection) {

        return selection.text(function (d) {

          var bbW = this.getBBox().width;
          var label = getLabelText(d);
          if (!label) {
            return '';
          }
          var charWidth = bbW / label.length;
          var textLabelWidth = getLabelSize(d, selection) - 4 * charWidth;
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
}
});
});
Ember.Charts.ChartComponent.reopen({
layoutName: 'components/ember-charts'
});})();