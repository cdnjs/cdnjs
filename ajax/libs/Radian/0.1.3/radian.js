var radian = angular.module('radian', []);

// Process attributes for plot directives.  All attributes, except for
// a small number of special cases (ID, CLASS, NG-*) are added as
// Angular scope variables, along with some extra information about
// the free variables and the original expression for the attribute.
// Changes to the attribute value are processed by re-evaluation using
// $observe and changes to free variables in the Radian expression are
// processed using a (slightly complicated) setup of scope.$watch
// listeners.

radian.factory('processAttrs', ['radianEval', function(radianEval) {
  'use strict';

  return function(scope, as) {
    scope.$$radianVars = { };
    Object.keys(as).forEach(function(a) {
      // Skip the specials.
      if (a == "id" || a == "class" || a.charAt(0) == "$" ||
          a.search(/^ng[A-Z]/) != -1) return;

      // Passing the true flag to radianEval gets us the free
      // variables in the expression as well as the current expression
      // value.
      var val = radianEval(scope, as[a], true, true);

      // Record the original expression and its free variables and set
      // the value of the scope variable.
      scope.$$radianVars[a] = { fvs: val[1], expr: as[a] };
      scope[a] = val[0];

      // Set up watchers for each of the free variables in the
      // expression.  When these watchers are triggered, they just
      // re-evaluate the expression for the attribute using its
      // original textual form.  We keep track of the return values
      // from the calls to scope.$watch so that we can cancel these
      // watches later if the free variables change.
      var entry = scope.$$radianVars[a];
      entry.fvwatchers = { };
      entry.fvs.forEach(function(v) {
        entry.fvwatchers[v] = scope.$watch(v, function(n, o) {
          scope[a] = radianEval(scope, entry.expr);
        }, true);
      });

      // Observe the value of the attribute: if the value (i.e. the
      // expression) changes, we pull in the new expression,
      // re-evaluate and rearrange the free variable watchers.
      as.$observe(a, function(v) {
        entry.expr = v;
        try {
          var val = radianEval(scope, v, true);
          scope[a] = val[0];
          entry.fvs = val[1];
          Object.keys(entry.fvwatchers).forEach(function(v) {
            // The new free variables are already in entry.fvs.  If
            // this one isn't in there, deregister the watch and
            // remove it.
            if (entry.fvs.indexOf(v) == -1) {
              entry.fvwatchers[v]();
              delete entry.fvwatchers[v];
            }
          });
          // Add watchers for any new free variables.
          entry.fvs.forEach(function(v) {
            if (!entry.fvwatchers[v])
              entry.fvwatchers[v] = scope.$watch(v, function() {
                scope[a] = radianEval(scope, entry.expr);
              }, true);
          });
        } catch (e) {
          console.log("Exception in radianEval watcher.  Skipping...");
        }});
    });
  };
}]);


// Deal with plot dimension attributes: explicit attribute values
// override CSS values.  Do sensible things with width, height and
// aspect ratio.  This is called either for individual plots, or for
// the outermost plot layout directive (<plot-row>, <plot-col> or
// <plot-grid>).

radian.factory('calcPlotDimensions', function() {
  return function(scope, elm, as) {
    var relative = false;
    var h = 300, asp = 1.618, w = asp * h;
    var aw = as.width, ah = as.height, aasp = as.aspect;
    var pw = elm.parent().width(), ph = elm.parent().height();
    scope.parentWidth = pw;  scope.parentHeight = ph;
    var cw = elm.width(), ch = elm.height();
    var casp = elm.css('aspect') ? parseFloat(elm.css('aspect')) : null;
    if (aw) {
      var aws = aw.toString();
      if (aws.charAt(aws.length - 1) == '%') {
        relative = true;
        aw = pw * Number(aws.slice(0, aws.length - 1)) / 100;
      }
    }
    if (ah) {
      var ahs = ah.toString();
      if (ahs.charAt(ahs.length - 1) == '%') {
        relative = true;
        ah = ph * Number(ahs.slice(0, ahs.length - 1)) / 100;
      }
    }
    if (aw && ah && aasp || ah && aw) { h = ah; w = aw; asp = w / h; }
    else if (ah && aasp) { h = ah; asp = aasp; w = h * asp; }
    else if (aw && aasp) { w = aw; asp = aasp; h = w / asp; }
    else if (ah) {
      h = ah;
      if (cw) { w = cw; asp = w / h; }
      else if (casp) { asp = casp; w = h * asp; }
      else { w = h * asp; }
    } else if (aw) {
      w = aw;
      if (ch) { h = ch; asp = w / h; }
      else if (casp) { asp = casp; h = w / asp; }
      else { h = w / asp; }
    } else if (aasp) {
      asp = aasp;
      if (cw) { w = cw; h = w / asp; }
      else if (ch) { h = ch; w = h * asp; }
      else { w = h * asp; }
    } else if (ch && cw) { h = ch; w = cw; asp = w / h; }
    else if (ch && casp) { h = ch; asp = casp; w = h * asp; }
    else if (cw && casp) { w = cw; asp = casp; h = w / asp; }
    else if (ch) { h = ch; w = h * asp; }
    else if (cw) { w = cw; h = w / asp; }
    else if (casp) { asp = casp; h = w / asp; }
    scope.pxwidth = Number(w); scope.pxheight = Number(h);
    return relative;
  };
});

// Main plot directive.  Kind of complicated...

radian.directive('plot',
 ['processAttrs', 'calcPlotDimensions', 'addToLayout',
  '$timeout', '$rootScope', 'dumpScope', 'dft', 'plotLib',
 function(processAttrs, calcPlotDimensions, addToLayout,
          $timeout, $rootScope, dumpScope, dft, lib)
{
  'use strict';

  // ID generator for plots.
  var plotidgen = 0;

  // We do setup work here so that we can organise things before the
  // transcluded plotting directives are linked.
  function preLink(scope, elm, as, transclude) {
    // Oh dear.  Horrible hack.  Why can't Javascript be like a normal
    // GUI library?
    scope.watchParentSize = function(doit) {
      function checkSize() {
        var pw = elm.parent().width(), ph = elm.parent().height();
        if (pw != scope.parentWidth || ph != scope.parentHeight)
          scope.windowResize(scope, elm);
        scope.parentWatchTimeout = $timeout(checkSize, 500);
      };
      if (!doit && scope.parentWatchTimeout) {
        $timeout.cancel(scope.parentWatchTimeout);
        scope.parentWatchTimeout = null;
      } else if (doit && !scope.parentWatchTimeout) {
        scope.parentWatchTimeout = $timeout(checkSize, 500);
        scope.$on('$destroy', function() {
          $timeout.cancel(scope.parentWatchTimeout);
        });
      }
    };

    // Process attributes, bringing all but a few special cases into
    // Angular scope as regular variables (to be use in data access
    // expressions).
    processAttrs(scope, as);
    scope.plotid = ++plotidgen;
    scope.uielems = elm.children()[1];
    scope.sizeAttrs = { width: as.width, height: as.height, aspect: as.aspect };
    if (!scope.inLayout) {
      scope.layoutTop = true;
      if (!scope.inStack)
        scope.watchParentSize(calcPlotDimensions(scope, elm, scope.sizeAttrs));
      $(elm).css('width', scope.pxwidth).css('height', scope.pxheight);
      scope.topLevel = elm[0];
      scope.svg = elm.children()[0];
    }
    if (scope.inLayout || scope.inStack)
      addToLayout(scope, scope, scope.layoutShare, elm);
    if (as.hasOwnProperty('strokeSwitch')) scope.strokesel = 0;

    // Font attributes.
    scope.fontSize = Number(as.fontSize) || 12;
    scope.titleFontSize = 1.25 * scope.fontSize;
    if (as.titleFontSize) {
      if (as.titleFontSize.indexOf('%') != -1)
        scope.titleFontSize =
        parseFloat(as.titleFontSize) / 100.0 * scope.fontSize;
      else if (as.titleFontSize.indexOf('.') != -1)
        scope.titleFontSize = Number(as.titleFontSize) * scope.fontSize;
      else
        scope.titleFontSize = Number(as.titleFontSize) || 1.25 * scope.fontSize;
    }
    scope.fontFamily = as.fontFamily || null;
    scope.fontStyle = as.fontStyle || null;
    scope.fontWeight = as.fontWeight || null;
    scope.fontVariant = as.fontVariant || null;
    scope.titleFontFamily = as.titleFontFamily || scope.fontFamily;
    scope.titleFontStyle = as.titleFontStyle || scope.fontStyle;
    scope.titleFontWeight = as.titleFontWeight || 'bold';
    scope.titleFontVariant = as.titleFontVariant || scope.fontVariant;

    // Set up view list and function for child elements to add plots.
    scope.views = [];
    scope.nplots = 0;
    scope.switchable = [];
    function ancestor(ances, desc) {
      if (ances == desc) return true;
      if (desc == $rootScope) return false;
      return ancestor(ances, desc.$parent);
    };
    scope.addPlot = function(s) {
      ++scope.nplots;
      if (scope.hasOwnProperty('legendSwitches')) scope.switchable.push(s);
      s.enabled = true;
      scope.$emit('dataChange');
      s.$on('$destroy', function(e) {
        if (ancestor(e.targetScope, s)) {
          --scope.nplots;
          s.enabled = false;
          var idx = scope.switchable.indexOf(s);
          if (idx != -1) scope.switchable.splice(idx, 1);
          scope.$emit('dataChange');
        }
      });
    };

    transclude(scope.$new(), function (cl) { elm.append(cl); });
  };

  // We do the actual plotting after the transcluded plot type
  // elements are linked.
  function postLink(scope, elm) {
    scope.topelem = elm;
    if (scope.inLayout)
      $(elm.children()[0]).remove();
    else
      $(window).resize(function () { scope.windowResize(scope, elm); });
    var viewgroups = [];
    var setupBrush = null;
    scope.rangeExtendPixels = function(x, y) {
      if (x != null)
        scope.rangeXExtendPixels =
          [Math.max(scope.rangeXExtendPixels[0], x[0]),
           Math.max(scope.rangeXExtendPixels[1], x[1])];
      if (y != null)
        scope.rangeYExtendPixels =
          [Math.max(scope.rangeYExtendPixels[0], y[0]),
           Math.max(scope.rangeYExtendPixels[1], y[1])];
    };
    function redraw() {
      scope.views.forEach(function(v) { draw(v, scope); });
    };
    function reset(suppressProcessRanges) {
      scope.rangeXExtendPixels = [0, 0];
      scope.rangeYExtendPixels = [0, 0];
      scope.$broadcast('setupExtra');
      scope.views = viewgroups.map(function(grp, i) {
        grp.selectAll('.radian-plot').remove();
        return setup(scope, grp, i, viewgroups.length, suppressProcessRanges);
      });
      scope.$broadcast('setupExtraAfter');
      if (setupBrush) setupBrush();
      redraw();
    };
    function handleAxisSwitch(axis, type) {
      var xform = 'axis' + axis.toUpperCase() + 'Transform';
      var rng = axis.toLowerCase() + 'range';
      var saverng = 'save' + axis.toUpperCase() + 'Range';
      var doReset = false;
      if (scope.hasOwnProperty(saverng)) {
        scope[rng] = scope[saverng];
        delete scope[saverng];
        doReset = true;
      }
      switch (type) {
      case 'linear': scope[xform] = 'linear'; break;
      case 'log':    scope[xform] = 'log';    break;
      case 'linear-0':
        scope[xform] = 'linear';
        scope[saverng] = angular.copy(scope[rng]);
        if (scope[rng])
          scope[rng][0] = 0;
        else
          scope[rng] = [0, null];
        doReset = true;
        break;
      default:
        throw Error("invalid axis type transition");
      }
      // Just do a reset if the plot range has changed.  Otherwise
      // redraw is triggered by the axis?Transform watcher.
      if (doReset) reset(true);
    }
    function yAxisSwitch(e, type) { handleAxisSwitch('y', type); }
    function xAxisSwitch(e, type) { handleAxisSwitch('x', type); }

    scope.windowResize = function(scope, elm) {
      if (!scope.inLayout || scope.layoutTop)
        scope.watchParentSize(calcPlotDimensions(scope, elm, scope.sizeAttrs));
      init(false);
      reset();
    };

    function init(first) {
      // Set up plot areas (including zoomers).
      $(scope.topLevel).
        css('width', scope.pxwidth).css('height', scope.pxheight);
      var svgelm = d3.select(scope.svg);
      svgelm.attr('width', scope.pxwidth).attr('height', scope.pxheight);
      var mainviewgroup;
      if (first)
        mainviewgroup = svgelm.append('g');
      else
        mainviewgroup = viewgroups[0];
      mainviewgroup.attr('width', scope.pxwidth).attr('height', scope.pxheight);
      $(scope.uielems)
        .width(scope.pxwidth + 'px')
        .height(scope.pxheight + 'px');
      if (first) viewgroups = [mainviewgroup];
      if (!scope.sizeviewgroup) {
        var s = scope;
        if (scope.inStack)
          while (!s.hasOwnProperty('inStack')) s = s.$parent;
        s.sizeviewgroup = mainviewgroup;
      }
      scope.uivisible = false;
      if (scope.hasOwnProperty('zoomX')) {
        var zfrac = scope.zoomX == "" ? 0.2 : +scope.zoomX;
        zfrac = Math.min(0.95, Math.max(0.05, zfrac));
        var zoomHeight = (scope.pxheight - 6) * zfrac;
        var mainHeight = (scope.pxheight - 6) * (1 - zfrac);
        var zoomviewgroup;
        if (first) {
          zoomviewgroup = svgelm.append('g').classed('radian-zoom-x', true);
          zoomviewgroup.zoomer = true;
          viewgroups.push(zoomviewgroup);
        } else
          zoomviewgroup = viewgroups[1];
        zoomviewgroup.attr('transform', 'translate(0,' + (mainHeight + 6) + ')')
          .attr('width', scope.pxwidth).attr('height', zoomHeight);
        mainviewgroup.attr('height', mainHeight);
        $(scope.uielems).width(scope.pxwidth + 'px').height(mainHeight + 'px');

        setupBrush = function() {
          var brush = d3.svg.brush().x(scope.views[1].x);
          brush.on('brush', function() {
            scope.views[0].x.domain(brush.empty() ?
                                    scope.views[1].x.domain() : brush.extent());
            draw(scope.views[0], scope);
          });
          scope.views[1].post = function(svg) {
            scope.brushgroup = svg.append('g')
              .attr('class', 'x brush')
              .call(brush)
              .selectAll('rect')
              .attr('y', -6);
            scope.brushgroup.attr('height', scope.views[1].realheight + 7);
          }
        };
      }
    };
    if (scope.hasOwnProperty('uiAxisYTransform'))
      scope.yAxisSwitchEnabled = true;
    if (scope.hasOwnProperty('uiAxisXTransform'))
      scope.xAxisSwitchEnabled = true;
    if (scope.hasOwnProperty('uiHistogramBins')) {
      scope.histogramSwitchEnabled = true;
      scope.histogramBinsVar = scope.uiHistogramBins;
    }
    if (scope.hasOwnProperty('strokeSwitch'))
      scope.strokeSwitchEnabled = true;
    if (scope.hasOwnProperty('legendSwitches'))
      scope.legendEnabled = true;

    $timeout(function() {
      // Draw plots and legend.
      init(true);
      reset();
      if (scope.hasOwnProperty('uiAxisYTransform'))
        scope.$on('yAxisChange', yAxisSwitch);
      if (scope.hasOwnProperty('uiAxisXTransform'))
        scope.$on('xAxisChange', xAxisSwitch);
      scope.$watch('axisYTransform', function(n, o) {
        if (n == undefined || n == o) return;
        reset();
      });
      scope.$watch('axisXTransform', function(n, o) {
        if (n == undefined || n == o) return;
        reset();
      });

      // Register plot data change handlers.
      scope.$on('paintChange', redraw);
      scope.$on('dataChange', reset);

      // Register UI event handlers.
      scope.$watch('strokesel', function(n,o) { if (n!=undefined) redraw(); });
      scope.$watch('xidx', function(n, o) {
        if (n != undefined && n != o) reset();
      });
      scope.$watch('yidx', function(n, o) {
        if (n != undefined && n != o) reset();
      });
    }, 0);

    // Set up interactivity.
    // ===> TODO: zoom and pan
    // ===> TODO: "layer" visibility
    // ===> TODO: styling changes
  };

  function processRanges(scope, rangea, rangexa, rangeya,
                         fixedxrv, xextv, xrngv,
                         fixedyrv, yextv, yrngv) {
    if (scope.hasOwnProperty(rangea) ||
        scope.hasOwnProperty(rangexa) || scope.hasOwnProperty(rangeya)) {
      var xrange, yrange;
      if (scope.hasOwnProperty(rangea)) {
        var ranges = scope[rangea].split(";");
        if (ranges.length == 2) {
          xrange = ranges[0];
          yrange = ranges[1];
        }
      }
      if (scope.hasOwnProperty(rangexa)) xrange = scope[rangexa];
      if (scope.hasOwnProperty(rangeya)) yrange = scope[rangeya];
      if (xrange) {
        var xs = xrange.split(","), vals = xs.map(parseFloat);
        var ok = false, ext = null;
        if (xs.length == 2 && xs[0] && xs[1]) {
          // "min,max"
          if (!isNaN(vals[0]) && !isNaN(vals[1])) {
            ok = true; ext = [vals[0], vals[1]];
            scope[fixedxrv] = true;
            scope[xextv] = ext;
          }
        } else if (xs.length == 1 || xs.length == 2 && !xs[1]) {
          // "min" or "min,"
          if (!isNaN(vals[0])) { ok = true;  ext = [vals[0], null]; }
        } else if (xs.length == 2 && !xs[0]) {
          // ",max"
          if (!isNaN(vals[1])) { ok = true;  ext = [null, vals[1]]; }
        }
        if (ok) scope[xrngv] = ext;
      }
      if (yrange) {
        var ys = yrange.split(","), vals = ys.map(parseFloat);
        var ok = false, ext = null;
        if (ys.length == 2 && ys[0] && ys[1]) {
          // "min,max"
          if (!isNaN(vals[0]) && !isNaN(vals[1])) {
            ok = true; ext = [vals[0], vals[1]];
            scope[fixedyrv] = true;
            scope[yextv] = ext;
          }
        } else if (ys.length == 1 || ys.length == 2 && !ys[1]) {
          // "min" or "min,"
          if (!isNaN(vals[0])) { ok = true;  ext = [vals[0], null]; }
        } else if (ys.length == 2 && !ys[0]) {
          // ",max"
          if (!isNaN(vals[1])) { ok = true;  ext = [null, vals[1]]; }
        }
        if (ok) scope[yrngv] = ext;
      }
    }
  };

  function makeXScaler(scope, v, hasdate, discvals, discorder) {
    var xform = scope.axisXTransform || "linear";
    var ext = scope.rangeXExtendPixels;
    var b = ext ? ext[0] : 0, t = v.realwidth - (ext ? ext[1] : 0);
    if (discvals) {
      var disctmp = null;
      if (scope.orderX)
        disctmp = scope.orderX.split(/ *; */);
      else if (discorder)
        disctmp = discorder.split(/ *; */);
      if (disctmp)
        discvals = disctmp.map(function(s) {
          var ss = s.split(/ *, */);
          return ss.length == 1 ? s : ss;
        });
      v.x =
        d3.scale.linear().range([b,t]).domain([0.5, discvals.length+0.5]);
      var offsets;
      if (discvals[0] instanceof Array) {
        var nd = discvals[0].length;
        var counts = new Array(nd);
        for (var i = 0; i < nd; ++i)
          counts[i] = lib.unique(discvals.map(function(v) {
            return v[i];
          })).length;
        var dx = new Array(nd);
        dx[nd - 1] = 1;
        for (var i = nd - 1; i > 0; --i) dx[i - 1] = dx[i] * counts[i];
        if (scope.groupX) {
          var grouping = scope.groupX % nd;
          var delta = scope.groupXDelta || 1.25;
          for (var i = 0; i < grouping; ++i) dx[i] *= delta;
        }
        offsets = new Array(discvals.length);
        var xs = new Array(nd);
        for (var i = 0; i < discvals.length; ++i) {
          var tmp = i;
          for (var j = nd - 1; j >= 0; --j) {
            xs[j] = tmp % counts[j];
            tmp = Math.floor(tmp / counts[j]);
          }
          offsets[i] = 0;
          for (var j = 0; j < nd; ++j) offsets[i] += xs[j] * dx[j];
        }
        var rescale = offsets[discvals.length - 1] / (discvals.length - 1);
        for (var i = 0; i < discvals.length; ++i)
          offsets[i] = offsets[i] / rescale + 1;
      }
      v.x.oton = function(x) {
        if (x instanceof Array) {
          for (var i = 0; i < discvals.length; ++i)
            if (discvals[i].every(function(d, i) { return d == x[i]; }))
              return offsets[i];
          throw Error("Discrete value mismatch!");
        } else
          return discvals.indexOf(x) + 1;
      };
      v.x.discrete = discvals;
    } else {
      if (hasdate)
        v.x = d3.time.scale().range([b,t]).domain(scope.xextent);
      else if (xform == "log")
        v.x = d3.scale.log().range([b,t]).domain(scope.xextent);
      else
        v.x = d3.scale.linear().range([b,t]).domain(scope.xextent);
      v.x.oton = function(x) { return x; };
    }
  };
  function makeX2Scaler(scope, v, hasdate, discvals, discorder) {
    var xform = scope.axisXTransform || "linear";
    var ext = scope.rangeXExtendPixels;
    var b = ext ? ext[0] : 0, t = v.realwidth - (ext ? ext[1] : 0);
    if (discvals) {
      var disctmp = null;
      if (scope.orderX2)
        disctmp = scope.orderX2.split(/ *; */);
      else if (discorder)
        disctmp = discorder.split(/ *; */);
      if (disctmp)
        discvals = disctmp.map(function(s) {
          var ss = s.split(/ *, */);
          return ss.length == 1 ? s : ss;
        });
      v.x2 = d3.scale.linear().range([b,t]).domain([0.5, discvals.length+0.5]);
      var offsets;
      if (discvals[0] instanceof Array) {
        var nd = discvals[0].length;
        var counts = new Array(nd);
        for (var i = 0; i < nd; ++i)
          counts[i] = lib.unique(discvals.map(function(v) {
            return v[i];
          })).length;
        var dx = new Array(nd);
        dx[nd - 1] = 1;
        for (var i = nd - 1; i > 0; --i) dx[i - 1] = dx[i] * counts[i];
        if (scope.groupX) {
          var grouping = scope.groupX2 % nd;
          var delta = scope.groupX2Delta || 1.25;
          for (var i = 0; i < grouping; ++i) dx[i] *= delta;
        }
        offsets = new Array(discvals.length);
        var xs = new Array(nd);
        for (var i = 0; i < discvals.length; ++i) {
          var tmp = i;
          for (var j = nd - 1; j >= 0; --j) {
            xs[j] = tmp % counts[j];
            tmp = Math.floor(tmp / counts[j]);
          }
          offsets[i] = 0;
          for (var j = 0; j < nd; ++j) offsets[i] += xs[j] * dx[j];
        }
        var rescale = offsets[discvals.length - 1] / (discvals.length - 1);
        for (var i = 0; i < discvals.length; ++i)
          offsets[i] = offsets[i] / rescale + 1;
      }
      v.x2.oton = function(x) {
        if (x instanceof Array) {
          for (var i = 0; i < discvals.length; ++i)
            if (discvals[i].every(function(d, i) { return d == x[i]; }))
              return offsets[i];
          throw Error("Discrete value mismatch!");
        } else
          return discvals.indexOf(x) + 1;
      };
      v.x2.discrete = discvals;
      v.x2.discmap = function(x) { return discvals.indexOf(x) + 1; };
    } else if (hasdate)
      v.x2 = d3.time.scale().range([b,t]).domain(scope.x2extent);
    else if (xform == "log")
      v.x2 = d3.scale.log().range([b,t]).domain(scope.x2extent);
    else
      v.x2 = d3.scale.linear().range([b,t]).domain(scope.x2extent);
  };
  function makeYScaler(scope, v) {
    var xform = scope.axisYTransform || "linear";
    var ext = scope.rangeYExtendPixels;
    var b = ext ? ext[0] : 0, t = v.realheight - (ext ? ext[1] : 0);
    if (xform == "log")
      v.y = d3.scale.log().range([t,b]).domain(scope.yextent);
    else
      v.y = d3.scale.linear().range([t,b]).domain(scope.yextent);
  };
  function makeY2Scaler(scope, v) {
    var xform = scope.axisYTransform || "linear";
    var ext = scope.rangeYExtendPixels;
    var b = ext ? ext[0] : 0, t = v.realheight - (ext ? ext[1] : 0);
    if (xform == "log")
      v.y2 = d3.scale.log().range([t,b]).domain(scope.y2extent);
    else
      v.y2 = d3.scale.linear().range([t,b]).domain(scope.y2extent);
  };

  // function setupUI(scope, viewgroup) {
  function setupUI(scope) {
    function uiOn(e) { scope.$apply('uivisible = true'); };
    function uiOff(e) {
      var elem = $(e.relatedTarget), chk = $(scope.uielems), outside = true;
      while (elem[0] && elem[0].parentElement) {
        if (elem[0] == chk[0]) { outside = false;  break; }
        elem = elem.parent();
      }
      if (outside) scope.$apply('uivisible = false');
    };
    $(scope.uielems).mouseenter(uiOn).mouseleave(uiOff);
  };

  function setup(scope, viewgroup, idx, nviews, suppressProcessRanges) {
    var plotgroup = viewgroup.append('g').classed('radian-plot', true);
    var v = { group: viewgroup, plotgroup: plotgroup };
    if (viewgroup.hasOwnProperty('zoomer'))
      v.noTitle = true;
    else
      setupUI(scope);

    // Determine data ranges to use for plot -- either as specified in
    // RANGE-X, RANGE-Y or RANGE (for X1 and Y1 axes) and RANGE-X2,
    // RANGE-Y2 or RANGE2 (for X2 and Y2 axes) attributes on the plot
    // element, or the union of the data ranges for all plots.
    if (!suppressProcessRanges) {
      processRanges(scope, 'range', 'rangeX', 'rangeY',
                    'fixedXRange', 'xextent', 'xrange',
                    'fixedYRange', 'yextent', 'yrange');
      processRanges(scope, 'range2', 'rangeX2', 'rangeY2',
                    'fixedX2Range', 'x2extent', 'x2range',
                    'fixedY2Range', 'y2extent', 'y2range');
      if (scope.axisYTransform == 'linear-0') {
        if (!scope.hasOwnProperty('saveYRange'))
          scope.saveYRange = angular.copy(scope.yrange);
        if (scope.yrange)
          scope.yrange[0] = 0;
        else
          scope.yrange = [0, null];
      }
      if (scope.axisXTransform == 'linear-0') {
        if (!scope.hasOwnProperty('saveXRange'))
          scope.saveXRange = angular.copy(scope.xrange);
        if (scope.xrange)
          scope.xrange[0] = 0;
        else
          scope.xrange = [0, null];
      }
      scope.$broadcast('setupRanges', scope);
    }
    function simpleExt(a) {
      if (typeof a[0] == 'string')
        return [0.5, lib.unique(a).length + 0.5];
      else
        return d3.extent(a);
    };
    function aext(d) {
      if (d[0] instanceof Array) {
        return d3.merge(d.map(function(a) { return simpleExt(a); }));
      } else
        return simpleExt(d);
    };
    function aext2(d, d2, d2min, d2max) {
      if (d[0] instanceof Array) {
        return d3.merge(d.map(function(a) {
          return d3.extent(a.filter(function(x, i) {
            return d2[i] >= d2min && d2[i] <= d2max;
          }));
        }));
      } else
        return d3.extent(d.filter(function(x, i) {
          return d2[i] >= d2min && d2[i] <= d2max;
        }));
    };
    var xexts = [], yexts = [], hasdate = false;
    var anyxdisc = false, anyxcont = false;
    var discx = null, discorder = null;
    var xextend = [0, 0], yextend = [0, 0];
    var x2exts = [], y2exts = [], hasdate2 = false;
    var anyx2disc = false, anyx2cont = false;
    var discx2 = null, discorder2 = null;
    dft(scope, function(s) {
      if (!scope.fixedXRange && s.enabled && s.x)
        xexts = xexts.concat(aext(s.x));
      if (!scope.fixedX2Range && s.enabled && s.x2)
        x2exts = x2exts.concat(aext(s.x2));
      if (!scope.fixedYRange && s.enabled && s.y) {
        if (scope.fixedXRange)
          yexts = yexts.concat(aext2(s.y, s.x,
                                     scope.xextent[0], scope.xextent[1]));
        else yexts = yexts.concat(aext(s.y));
      }
      if (!scope.fixedY2Range && s.enabled && s.y2) {
        if (scope.fixedXRange)
          y2exts = y2exts.concat(aext2(s.y2, s.x,
                                       scope.xextent[0], scope.xextent[1]));
        else y2exts = y2exts.concat(aext(s.y2));
      }
      if (s.x && s.x.metadata && s.x.metadata.format == 'date')
        hasdate = true;
      if (s.x && s.x instanceof Array) {
        // There are three possible cases where we want to treat the
        // X-values as discrete:
        //  1. String values.
        //  2. Array values (indicating parallel zipped data arrays
        //     for hierarchical treatment).
        //  3. When the X-data is explicitly marked as being discrete
        //     -- this is needed to deal with the case where we have
        //     integer values and want to treat them as discrete
        //     values.
        if (typeof s.x[0] == 'string' ||  // Case #1
            s.x[0] instanceof Array ||    // Case #2
            s.discreteX) {                // Case #3
          // The unique function in the Radian library will work with
          // array-valued entries without a problem.
          var vals = lib.unique(s.x);
          vals.sort();
          if (discx) {
            if (discx.length != vals.length ||
                discx.some(function(x, i) {
                  if (x instanceof Array)
                    return x.some(function(y, j) { return y != vals[i][j]; });
                  else
                    return x != vals[i];
                }))
              throw Error("Incompatible discrete X values");
          } else discx = vals;
          if (s.x.metadata && s.x.metadata.categoryOrder)
            discorder = s.x.metadata.categoryOrder;
          anyxdisc = true;
        } else anyxcont = true;
      }
      if (s.x2 && s.x2.metadata && s.x2.metadata.format == 'date')
        hasdate2 = true;
      if (s.x2 && s.x2 instanceof Array) {
        if (typeof s.x2[0] == 'string' ||  // Case #1
            s.x2[0] instanceof Array ||    // Case #2
            s.discreteX2) {                // Case #3
          var vals = lib.unique(s.x2);
          vals.sort();
          if (discx2) {
            if (discx2.length != vals.length ||
                discx2.some(function(x, i) {
                  if (x instanceof Array)
                    return x.some(function(y, j) { return y != vals[i][j]; });
                  else
                    return x != vals[i];
                }))
              throw Error("Incompatible discrete X2 values");
          } else discx2 = vals;
          if (s.x2.metadata && s.x2.metadata.categoryOrder)
            discorder2 = s.x2.metadata.categoryOrder;
          anyx2disc = true;
        } else anyx2cont = true;
      }
      if (s.rangeXExtend) {
        xextend[0] = Math.max(xextend[0], s.rangeXExtend[0]);
        xextend[1] = Math.max(xextend[1], s.rangeXExtend[1]);
      }
      if (s.rangeYExtend) {
        yextend[0] = Math.max(yextend[0], s.rangeYExtend[0]);
        yextend[1] = Math.max(yextend[1], s.rangeYExtend[1]);
      }
      if (s.rangeXExtendPixels) scope.rangeXExtendPixels = s.rangeXExtendPixels;
      if (s.rangeYExtendPixels) scope.rangeYExtendPixels = s.rangeYExtendPixels;
    });
    if (anyxdisc && anyxcont)
      throw Error("Can't mix discrete and continuous X values");
    if (anyx2disc && anyx2cont)
      throw Error("Can't mix discrete and continuous X2 values");
    if (!scope.fixedXRange && xexts.length > 0) {
      scope.xextent = d3.extent(xexts);
      if (scope.xrange) {
        if (scope.xrange[0] != null)
          scope.xextent[0] = Math.min(scope.xextent[0], scope.xrange[0]);
        if (scope.xrange[1] != null)
          scope.xextent[1] = Math.max(scope.xextent[1], scope.xrange[1]);
      }
      if (!hasdate) {
        scope.xextent[0] -= xextend[0];
        scope.xextent[1] += xextend[1];
      }
    }
    if (!scope.fixedYRange && yexts.length > 0) {
      scope.yextent = d3.extent(yexts);
      if (scope.yrange) {
        if (scope.yrange[0] != null) scope.yextent[0] = scope.yrange[0];
        if (scope.yrange[1] != null) scope.yextent[1] = scope.yrange[1];
      }
      scope.yextent[0] -= yextend[0];
      scope.yextent[1] += yextend[1];
    }
    if (!scope.fixedX2Range && x2exts.length > 0) {
      scope.x2extent = d3.extent(x2exts);
      if (scope.x2range) {
        if (scope.x2range[0] != null)
          scope.x2extent[0] = Math.min(scope.x2extent[0], scope.x2range[0]);
        if (scope.x2range[1] != null)
          scope.x2extent[1] = Math.max(scope.x2extent[1], scope.x2range[1]);
      }
      // scope.x2extent[0] -= x2extend[0];
      // scope.x2extent[1] += x2extend[1];
    }
    if (!scope.fixedY2Range && y2exts.length > 0) {
      scope.y2extent = d3.extent(y2exts);
      if (scope.y2range) {
        if (scope.y2range[0] != null)
          scope.y2extent[0] = Math.min(scope.y2extent[0], scope.y2range[0]);
        if (scope.y2range[1] != null)
          scope.y2extent[1] = Math.max(scope.y2extent[1], scope.y2range[1]);
      }
      // scope.y2extent[0] -= y2extend[0];
      // scope.y2extent[1] += y2extend[1];
    }

    // Extract plot attributes.
    v.xaxis = !scope.axisX || scope.axisX != 'off';
    v.yaxis = !scope.axisY || scope.axisY != 'off';
    v.x2axis = !!(scope.x2extent && (!scope.axisX2 || scope.axisX2 != 'off'));
    v.y2axis = !!(scope.y2extent && (!scope.axisY2 || scope.axisY2 != 'off'));
    var showXAxisLabel = (nviews == 1 || nviews == 2 && idx == 1) &&
      (!scope.axisXLabel || scope.axisXLabel != 'off');
    var showYAxisLabel = !scope.axisYLabel || scope.axisYLabel != 'off';
    var showX2AxisLabel = (nviews == 1 || nviews == 2 && idx == 1) &&
      (!scope.axisX2Label || scope.axisX2Label != 'off');
    var showY2AxisLabel = !scope.axisY2Label || scope.axisY2Label != 'off';
    v.margin = { top: +scope.topMargin || 2,
                 right: +scope.rightMargin || 2,
                 bottom: +scope.bottomMargin || 2,
                 left: +scope.leftMargin || 2 };
    v.margin.top += 0.5 * scope.fontSize;
    v.title = scope.title;

    // Set up top and bottom plot margins.
    if (scope.inStack) v.noTitle = true;
    var axisspace = 15;
    var del1 = axisspace + (+scope.fontSize);
    var del2 = 5 + (+scope.fontSize);
    var del3 = Math.floor(2.5 * scope.fontSize);
    if (v.xaxis) v.margin.bottom += del1 + (showXAxisLabel ? del2 : 0);
    if (v.x2axis) v.margin.top += del1 + (showX2AxisLabel ? del2 : 0);
    if (v.title && !v.noTitle) v.margin.top += del3;
    v.realheight = v.group.attr('height') - v.margin.top - v.margin.bottom;
    v.outh = v.realheight + v.margin.top + v.margin.bottom;

    // Set up D3 Y data ranges.
    if (scope.yextent) makeYScaler(scope, v);
    if (scope.y2extent) makeY2Scaler(scope, v);

    // Set up left and right plot margins.
    var yoffset = del3, y2offset = del3;
    if (v.yaxis && v.y) {
      var tmp = v.y.copy();
      var fmt = scope.axisYFormat ? d3.format(scope.axisYFormat) : null;
      var nticks;
      if (scope.axisYTicks) {
        if (scope.axisYTicks instanceof Array)
          nticks = scope.axisYTicks.length;
        else
          nticks = scope.axisYTicks;
      }
      else
        nticks = v.group.attr('height') / 36;
      var fmtfn = fmt ? tmp.tickFormat(nticks, fmt) : tmp.tickFormat(nticks);
      var tst = '';
      tmp.ticks(nticks).map(fmtfn).forEach(function(s) {
        if (s.length > tst.length) tst = s;
      });
      tst = tst.replace(/[0-9]/g, '0');
      var g = scope.sizeviewgroup.append('g').attr('visibility', 'hidden');
      var tstel = g.append('text').attr('x', 0).attr('y', 0)
        .style('font-size', scope.fontSize).text(tst);
      yoffset = Math.max(del3, axisspace + tstel[0][0].getBBox().width);
      g.remove();
    }
    if (v.y2axis && v.y2) {
      var tmp = v.y2.copy();
      var fmt = scope.axisY2Format ? d3.format(scope.axisY2Format) : null;
      var nticks;
      if (scope.axisY2Ticks) {
        if (scope.axisY2Ticks instanceof Array)
          nticks = scope.axisY2Ticks.length;
        else
          nticks = scope.axisY2Ticks;
      }
      else
        nticks = v.group.attr('height') / 36;
      var fmtfn = fmt ? tmp.tickFormat(nticks, fmt) : tmp.tickFormat(nticks);
      var tst = '';
      tmp.ticks(nticks).map(fmtfn).forEach(function(s) {
        if (s.length > tst.length) tst = s;
      });
      tst = tst.replace(/[0-9]/g, '0');
      var tstel = scope.sizeviewgroup.append('g').attr('visibility', 'hidden')
        .append('text')
        .attr('x', 0).attr('y', 0)
        .style('font-size', scope.fontSize)
        .text(tst);
      y2offset = Math.max(del3, axisspace + tstel[0][0].getBBox().width);
      tstel.remove();
    }
    if (v.yaxis) v.margin.left += yoffset + (showYAxisLabel ? del2 : 0);
    if (v.y2axis) v.margin.right += y2offset + (showY2AxisLabel ? del2 : 0);
    v.realwidth = v.group.attr('width') - v.margin.left - v.margin.right;
    v.outw = v.realwidth + v.margin.left + v.margin.right;

    // Set up D3 X data ranges.
    if (scope.xextent) makeXScaler(scope, v, hasdate, discx, discorder);
    if (scope.x2extent) makeX2Scaler(scope, v, hasdate2, discx2, discorder2);

    // Figure out axis labels.
    function axisLabel(labelText, v, idxvar, selectvar, def) {
      var idx0 = null;
      if (!labelText) {
        dft(scope, function(s) {
          if (!labelText)
            if (s[v] && s[v].metadata && s[v].metadata.label) {
              labelText = s[v].metadata.label;
              if (s[v].metadata.units)
                labelText += ' (' + s[v].metadata.units + ')';
            }
          idx0 = idx0 || s[idxvar];
        });
        if (!labelText && scope[selectvar]) {
          var labs = scope[selectvar].split(',');
          labelText = labs[idx0];
        }
        if (!labelText) labelText = def;
      }
      return labelText;
    };
    if (showXAxisLabel)
      v.xlabel = axisLabel(scope.axisXLabel, 'x', 'xidx', 'selectX', 'X Axis');
    if (showYAxisLabel)
      v.ylabel = axisLabel(scope.axisYLabel, 'y', 'yidx', 'selectY', 'Y Axis');
    if (showX2AxisLabel)
      v.x2label = axisLabel(scope.axisX2Label, 'x2',
                            'xidx', 'selectX2', 'X2 Axis');
    if (showY2AxisLabel)
      v.y2label = axisLabel(scope.axisY2Label, 'y2',
                            'yidx', 'selectY2', 'Y2 Axis');

    if (idx == 0) {
      var svgelm = d3.select(scope.svg);
      v.clip = 'mainclip' + scope.plotid;
      svgelm.select('#' + v.clip).remove();
      svgelm.append('defs').append('clipPath')
        .attr('id', v.clip).append('rect')
        .attr('width', v.realwidth).attr('height', v.realheight);
    }

    return v;
  };

  function setFont(lab, scope) {
    if (scope.fontFamily) lab.style('font-family', scope.fontFamily);
    if (scope.fontStyle) lab.style('font-style', scope.fontStyle);
    if (scope.fontWeight) lab.style('font-weight', scope.fontWeight);
    if (scope.fontVariant) lab.style('font-variant', scope.fontVariant);
  };

  function defaultScaleFormat(xform, xs, m) {
    if (xform && xform == 'log') return d3.format(".0e");
    var extent = xs.domain();
    var span = extent[1] - extent[0];
    var step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10));
    var err = m / span * step;
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;
    var n = Math.max(0, -Math.floor(Math.log(step) / Math.LN10 + .01));
    return d3.format(n > 6 ? ".2e" : (",." + n + "f"));
  };

  function makeAxis(sc, v, ax, tickDefault) {
    // Axis orientation.
    var ori;
    switch (ax) {
    case 'x':  ori = 'bottom';  break;
    case 'x2': ori = 'top';     break;
    case 'y':  ori = 'left';    break;
    case 'y2': ori = 'right';   break;
    }

    // Create base axis object.
    var axis = d3.svg.axis().scale(v[ax]).orient(ori);

    // Tick padding.
    var axatt = ax.toUpperCase();
    var paddingAttr = 'axis' + axatt + 'TickPadding';
    var padding = sc[paddingAttr] ? sc[paddingAttr] : sc.tickPadding;
    var padding_delta = 0;
    if (padding) {
      axis.tickPadding(+padding);
      padding_delta = +padding - 3;
    }

    // Process tick size information: there are global tick-sizes and
    // tick-size, minor-tick-size and end-tick-size attributes, and
    // there are also per-axis variants of these.
    var tickSizeAttr = 'axis' + axatt + 'TickSize';
    var minorTickSizeAttr = 'axis' + axatt + 'MinorTickSize';
    var endTickSizeAttr = 'axis' + axatt + 'EndTickSize';
    var tickSizesAttr = 'axis' + axatt + 'TickSizes';
    var norm_val = 6, minor_val = 6, end_val = 6;
    if (sc.tickSizes) {
      var vals = sc.tickSizes.split(/ *, */);
      if (vals.length >= 3) {
        norm_val = vals[0];  minor_val = vals[1];  end_val = vals[2];
      } else if (vals.length == 2) {
        norm_val = minor_val = vals[0];  end_val = vals[1];
      } else if (vals.length == 1)
        norm_val = minor_val = end_val = vals[0];
    }
    if (sc.tickSize) norm_val = sc.tickSize;
    if (sc.minorTickSize) minor_val = sc.minorTickSize;
    if (sc.endTickSize) end_val = sc.endTickSize;
    if (sc[tickSizesAttr]) {
      var vals = sc[tickSizesAttr].split(/ *, */);
      if (vals.length >= 3) {
        norm_val = vals[0];  minor_val = vals[1];  end_val = vals[2];
      } else if (vals.length == 2) {
        norm_val = minor_val = vals[0];  end_val = vals[1];
      } else if (vals.length == 1)
        norm_val = minor_val = end_val = vals[0];
    }
    if (sc[tickSizeAttr]) norm_val = sc[tickSizeAttr];
    if (sc[minorTickSizeAttr]) minor_val = sc[minorTickSizeAttr];
    if (sc[endTickSizeAttr]) end_val = sc[endTickSizeAttr];
    if (v[ax].discrete) end_val = 0;
    axis.tickSize(norm_val, minor_val, end_val);

    // Special treatment for discrete axes.
    if (v[ax].discrete) {
      var tickvals = [], ticklabs = [];
      v[ax].discrete.forEach(function(x, i) {
        tickvals.push(v[ax].oton(x));
        ticklabs.push(x);
      });
      axis.tickValues(tickvals);
      axis.tickFormat(function(x) {
          var i = tickvals.indexOf(x);
          return x == -1 ? '' : ticklabs[i];
        });
      axis.tickSize();
      return [axis, padding_delta];
    }

    // Do we need to use a date/time format?
    var dformat = '%Y-%m-%d';
    var has_date = false;
    dft(sc, function(s) {
      var d = s[ax];
      if (d && d.metadata && d.metadata.format == 'date') {
        if (d.metadata.dateFormat) dformat = d.metadata.dateFormat;
        has_date = true;
      }
    });

    // Figure out settings for ticks and tick format.
    var ticksAttr = 'axis' + axatt + 'Ticks';
    var fmtAttr = 'axis' + axatt + 'Format';
    var xformAttr = 'axis' + axatt + 'Transform';
    var ticks, fmt;
    ticks = sc[ticksAttr] ? sc[ticksAttr] : tickDefault;
    var explicit_ticks = false, explicit_labels = false;
    var tickvals = [], ticklabs = [];
    if (ticks instanceof Array) {
      // We have explicit tick values.
      explicit_ticks = true;
      ticks.forEach(function(t) {
        if (t instanceof Array) {
          tickvals.push(t[0]);
          ticklabs.push(t[1]);
          explicit_labels = true;
        } else {
          tickvals.push(t);
          ticklabs.push(t);
        }
      });
      ticks = 100 * ticks.length;
    }
    if (has_date)
      fmt = d3.time.format(sc[fmtAttr] ? sc[fmtAttr] : dformat);
    else
      fmt = sc[fmtAttr] ? d3.format(sc[fmtAttr]) :
      defaultScaleFormat(sc[xformAttr], v[ax], ticks);
    if (explicit_ticks) {
      axis.tickValues(tickvals);
      if (explicit_labels)
        axis.tickFormat(function(x) {
          var i = tickvals.indexOf(x);
          return x == -1 ? '' : ticklabs[i];
        });
      else
        axis.tickFormat(fmt);
    } else if (has_date) {
      var tickFn = null, tickNum = ticks;
      if (isNaN(Number(ticks))) {
        tickNum = parseFloat(ticks);
        var tickUnit = '';
        for (var i = ticks.length - 1; i >= 0; --i)
          if ("0123456789.".indexOf(ticks.charAt(i)) != -1) {
            tickUnit = ticks.substr(i + 1);
            break;
          }
        switch (tickUnit) {
        case 's':    tickFn = d3.time.seconds;  break;
        case 'min':  tickFn = d3.time.minutes;  break;
        case 'hr':   tickFn = d3.time.hours;    break;
        case 'd':    tickFn = d3.time.days;     break;
        case 'week': tickFn = d3.time.weeks;    break;
        case 'mon':  tickFn = d3.time.months;   break;
        case 'year': tickFn = d3.time.years;    break;
        }
      }
      if (tickFn)
        axis.ticks(tickFn, tickNum);
      else
        axis.ticks(tickNum);
      axis.tickFormat(fmt);
    } else if (sc[fmtAttr] || sc[xformAttr]) {
      axis.ticks(ticks, fmt);
    } else {
      axis.ticks(ticks);
      axis.tickFormat(fmt);
    }

    // Deal with tick sub-division, as indicated by the minorTicks
    // attributes.
    var minorTicksAttr = 'axis' + axatt + 'MinorTicks';
    var minor = sc[minorTicksAttr] ? sc[minorTicksAttr] : sc.minorTicks;
    if (minor) axis.tickSubdivide(minor);

    return [axis, padding_delta];
  };

  function jitter(xs, scale, jit) {
    var jsize = jit ? parseFloat(jit) : 0.05, j = [];
    if (isNaN(jsize)) jsize = 0.1;
    xs.forEach(function(x) { j.push((Math.random() * 2 - 1) * jsize); });
    var ret = function(d, i) { return scale(d + j[i]); };
    ret.oton = scale.oton;
    return ret;
  };

  function draw(v, scope) {
    // Clean out any pre-existing plots.
    $(v.plotgroup[0]).empty();

    // Set up plot margins.
    v.plotgroup.attr('width', v.outw).attr('height', v.outh);
    v.innergroup = v.plotgroup.append('g')
      .attr('width', v.realwidth).attr('height', v.realheight)
      .attr('transform', 'translate(' + v.margin.left + ',' +
                                        v.margin.top + ')');
    if (v.clip) v.innergroup.attr('clip-path', 'url(#' + v.clip + ')');

    // Draw D3 axes.
    var del1 = Math.floor(scope.fontSize / 3.0);
    var del2 = Math.floor(3.0 * scope.fontSize);
    if (v.xaxis && v.x) {
      var ax = makeAxis(scope, v, 'x', v.plotgroup.attr('width') / 100);
      var axis = ax[0], padding_delta = ax[1];
      v.plotgroup.append('g').attr('class', 'axis')
        .style('font-size', scope.fontSize)
        .attr('transform', 'translate(' + v.margin.left + ',' +
              (+v.realheight + v.margin.top + del1) + ')')
        .call(axis);
      if (v.xlabel) {
        var lab = v.plotgroup.append('g').attr('class', 'axis-label')
          .attr('transform', 'translate(' +
                (+v.margin.left + v.realwidth / 2) +
                ',' + (+v.realheight + v.margin.top) + ')')
          .append('text')
          .attr('x', 0).attr('y', del2 + padding_delta)
          .style('font-size', scope.fontSize)
          .attr('text-anchor', 'middle').text(v.xlabel);
        setFont(lab, scope);
      }
    }
    if (v.x2axis && v.x2) {
      var ax = makeAxis(scope, v, 'x2', v.plotgroup.attr('width') / 100);
      var axis = ax[0], padding_delta = ax[1];
      v.plotgroup.append('g').attr('class', 'axis')
        .style('font-size', scope.fontSize)
        .attr('transform', 'translate(' + v.margin.left + ',' +
              (+v.margin.top + del1) + ')')
        .call(axis);
      if (v.x2label) {
        var lab = v.plotgroup.append('g').attr('class', 'axis-label')
          .attr('transform', 'translate(' +
                (+v.margin.left + v.realwidth / 2) + ',' +
                (+v.margin.top) + ')')
          .append('text')
          .attr('x', 0).attr('y', del2 - padding_delta)
          .style('font-size', scope.fontSize)
          .attr('text-anchor', 'middle').text(v.x2label);
        setFont(lab, scope);
      }
    }
    if (v.yaxis && v.y) {
      var ax = makeAxis(scope, v, 'y', v.plotgroup.attr('height') / 36);
      var axis = ax[0], padding_delta = ax[1];
      v.plotgroup.append('g').attr('class', 'axis')
        .style('font-size', scope.fontSize)
        .attr('transform', 'translate(' + (+v.margin.left - del1) + ',' +
              (+v.margin.top) + ')')
        .call(axis);
      if (v.ylabel) {
        var xpos = +scope.fontSize, ypos = +v.margin.top + v.realheight / 2;
        var lab = v.plotgroup.append('g').attr('class', 'axis-label')
        .append('text')
        .attr('x', xpos - padding_delta).attr('y', ypos)
        .attr('transform', 'rotate(-90,' + xpos + ',' + ypos + ')')
        .style('font-size', scope.fontSize)
        .attr('text-anchor', 'middle').text(v.ylabel);
        setFont(lab, scope);
      }
    }
    if (v.y2axis && v.y2) {
      var ax = makeAxis(scope, v, 'y2', v.plotgroup.attr('height') / 36);
      var axis = ax[0], padding_delta = ax[1];
      v.plotgroup.append('g').attr('class', 'axis')
        .style('font-size', scope.fontSize)
        .attr('transform', 'translate(' +
              (+v.realwidth + v.margin.left) + ',' +
              (+v.margin.top) + ')')
        .call(axis);
      if (v.y2label) {
        var xpos = v.realwidth + v.margin.left + v.margin.right -
          scope.fontSize;
        var ypos = +v.margin.top + v.realheight / 2;
        var lab = v.plotgroup.append('g').attr('class', 'axis-label')
        .append('text')
        .attr('x', xpos + padding_delta).attr('y', ypos)
        .attr('transform', 'rotate(-90,' + xpos + ',' + ypos + ')')
        .style('font-size', scope.fontSize)
        .attr('text-anchor', 'middle').text(v.y2label);
        setFont(lab, scope);
      }
    }
    setFont(d3.selectAll('.axis text'), scope);

    // Plot title.
    v.plotgroup.selectAll('g.no-data').remove();
    if (scope.nplots == 0 && v == scope.views[0] && scope.noData)
      v.plotgroup.append('g').attr('class', 'no-data').append('text')
        .attr('x', v.outw / 2).attr('y', v.outh / 2)
        .attr('text-anchor', 'middle').text(scope.noData);
    if (v.title && !v.noTitle) {
      var t = v.plotgroup.append('g').attr('class', 'axis-label')
        .attr('transform', 'translate(' +
              (+v.margin.left + v.realwidth / 2) + ',0)')
        .append('text')
        .attr('x', 0).attr('y', Math.floor(1.35 * scope.titleFontSize))
        .style('font-size', Math.floor(scope.titleFontSize))
        .attr('text-anchor', 'middle').text(v.title);
      if (scope.titleFontFamily) t.style('font-family', scope.titleFontFamily);
      if (scope.titleFontStyle) t.style('font-style', scope.titleFontStyle);
      if (scope.titleFontWeight) t.style('font-weight', scope.titleFontWeight);
      if (scope.titleFontVariant)
        t.style('font-variant', scope.titleFontVariant);
    }

    // Loop over plots, calling their draw functions one by one.
    if (v.x && v.y || v.x2 && v.y || v.x && v.y2 || v.x2 && v.y2) {
      dft(scope, function(s) {
        if (s.draw && s.enabled) {
          var xvar = false, yvar = false, xdiscrete = false;
          var xs, ys;
          if (s.x)  { xvar = 'x';  xs = v.x;  xdiscrete = !!v.x.discrete; }
          if (s.x2) { xvar = 'x2'; xs = v.x2;  xdiscrete = !!v.x2.discrete; }
          if (s.y)  { yvar = 'y';  ys = v.y;  }
          if (s.y2) { yvar = 'y2'; ys = v.y2; }
          if (!xs) xs = v.x;
          if (!ys) ys = v.y;

          if (xvar && yvar ||
              s.checkPlottable && s.checkPlottable(xvar, yvar)) {
            // Append SVG group for this plot and draw the plot into it.
            var g = v.innergroup.append('g');
            var x = xvar ? ((s[xvar][0] instanceof Array && !v.x.discrete) ?
                            s[xvar][s.xidx ? s.xidx : 0] : s[xvar]) : undefined;
            if (s.hasOwnProperty('jitterX') && x) xs = jitter(x, xs, s.jitterX);
            var y = yvar ? ((s[yvar][0] instanceof Array) ?
                            s[yvar][s.yidx ? s.yidx : 0] : s[yvar]) : undefined;
            if (s.hasOwnProperty('jitterY') && y) ys = jitter(y, ys, s.jitterY);
            s.draw(g, x, xs, y, ys, s, v.realwidth, v.realheight,
                   yvar == 'y2' ? 2 : 1);
            s.$on('$destroy', function() { g.remove(); });
          }
        }
      });
      if (v.post) v.post(v.innergroup);
    }
  };

  return {
    restrict: 'E',
    template:
    ['<div class="radian">',
       '<svg></svg>',
       '<div class="radian-ui">',
         '<div ng-show="uivisible">',
           '<radian-histogram-switch ng-show="histogramSwitchEnabled">',
           '</radian-histogram-switch>',
           '<radian-legend ng-show="legendEnabled"></radian-legend>',
           '<radian-axis-switch axis="y" ng-show="yAxisSwitchEnabled">',
           '</radian-axis-switch>',
           '<radian-axis-switch axis="x" ng-show="xAxisSwitchEnabled">',
           '</radian-axis-switch>',
           '<radian-stroke-switch ng-show="strokeSwitchEnabled">',
           '</radian-stroke-switch>',
         '</div>',
       '</div>',
     '</div>'].join(""),
    replace: true,
    transclude: true,
    scope: true,
    compile: function(elm, as, trans) {
      return { pre: function(s, e, a) { preLink(s, e, a, trans); },
               post: postLink };
    }
  };
}]);


// Link function shared by most simple plotting directives.  Does
// attribute processing, hides HTML element, sets up drawing function
// and sets up event emitters for data and paint changes.

radian.factory('plotTypeLink',
 ['processAttrs', '$timeout',
  function(processAttrs, $timeout)
{
  var paintas = [ 'orientation', 'fill', 'fillOpacity', 'label',
                  'marker', 'markerSize', 'stroke', 'strokeOpacity',
                  'strokeWidth' ];

  return function(scope, elm, as, draw) {
    processAttrs(scope, as);
    elm.hide();
    scope.draw = draw;
    scope.$parent.addPlot(scope);

    scope.xchange = scope.ychange = false;
    function emitChange() {
      var emit = scope.xchange || scope.ychange;
      scope.xchange = scope.ychange = false;
      if (emit) scope.$emit('dataChange', scope);
    }
    scope.$watch('x', function(n, o) {
      if (n == undefined || n === o || scope.xchange) return;
      scope.xchange = true;
      $timeout(emitChange);
    });
    scope.$watch('y', function(n, o) {
      if (n == undefined || n === o || scope.ychange) return;
      scope.ychange = true;
      $timeout(emitChange);
    });
    paintas.forEach(function(a) {
      if (scope.hasOwnProperty(a))
        scope.$watch(a, function() { scope.$emit('paintChange', scope); });
    });
  };
}]);


// Simple directive just to wrap inner plotting directives that share
// options.  Brings any attributes into scope and transcludes inner
// plot directives.

radian.directive('plotOptions', ['processAttrs', function(processAttrs)
{
  'use strict';

  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    transclude: true,
    scope: true,
    compile: function(elm, as, trans) {
      return { pre: function(s, e, a) {
        processAttrs(s, a);
        trans(s.$new(), function (cl) { e.append(cl); });
      } };
    }
  };
}]);
// This file contains a modified version of the estraverse library,
// set up for easy use with Angular and supporting some extensions to
// normal JavaScript expression syntax.
//
// ORIGINAL LICENSE COMMENT:
//
/*
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

radian.factory('estraverse', function()
{
  'use strict';

    var Syntax,
        isArray,
        VisitorOption,
        VisitorKeys,
        wrappers;

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DebuggerStatement: 'DebuggerStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    VisitorKeys = {
        AssignmentExpression: ['left', 'right'],
        ArrayExpression: ['elements'],
        BlockStatement: ['body'],
        BinaryExpression: ['left', 'right'],
        BreakStatement: ['label'],
        CallExpression: ['callee', 'arguments'],
        CatchClause: ['param', 'body'],
        ConditionalExpression: ['test', 'consequent', 'alternate'],
        ContinueStatement: ['label'],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ['body', 'test'],
        EmptyStatement: [],
        ExpressionStatement: ['expression'],
        ForStatement: ['init', 'test', 'update', 'body'],
        ForInStatement: ['left', 'right', 'body'],
        FunctionDeclaration: ['id', 'params', 'body'],
        FunctionExpression: ['id', 'params', 'body'],
        Identifier: [],
        IfStatement: ['test', 'consequent', 'alternate'],
        Literal: [],
        LabeledStatement: ['label', 'body'],
        LogicalExpression: ['left', 'right'],
        MemberExpression: ['object', 'property'],
        PluckExpression: ['object', 'property'],
        PaletteExpression: [],
        InterpolatorExpression: [],
        NewExpression: ['callee', 'arguments'],
        ObjectExpression: ['properties'],
        Program: ['body'],
        Property: ['key', 'value'],
        ReturnStatement: ['argument'],
        SequenceExpression: ['expressions'],
        SwitchStatement: ['discriminant', 'cases'],
        SwitchCase: ['test', 'consequent'],
        ThisExpression: [],
        ThrowStatement: ['argument'],
        TryStatement: ['block', 'handlers', 'finalizer'],
        UnaryExpression: ['argument'],
        UpdateExpression: ['argument'],
        VariableDeclaration: ['declarations'],
        VariableDeclarator: ['id', 'init'],
        WhileStatement: ['test', 'body'],
        WithStatement: ['object', 'body']
    };

    VisitorOption = {
        Break: 1,
        Skip: 2
    };

    wrappers = {
        PropertyWrapper: 'Property'
    };

    function traverse(top, visitor) {
        var worklist, leavelist, node, nodeType, ret, current, current2, candidates, candidate, marker = {};

        worklist = [ top ];
        leavelist = [ null ];

        while (worklist.length) {
            node = worklist.pop();
            nodeType = node.type;

            if (node === marker) {
                node = leavelist.pop();
                if (visitor.leave) {
                    ret = visitor.leave(node, leavelist[leavelist.length - 1]);
                } else {
                    ret = undefined;
                }
                if (ret === VisitorOption.Break) {
                    return;
                }
            } else if (node) {
                if (wrappers.hasOwnProperty(nodeType)) {
                    node = node.node;
                    nodeType = wrappers[nodeType];
                }

                if (visitor.enter) {
                    ret = visitor.enter(node, leavelist[leavelist.length - 1]);
                } else {
                    ret = undefined;
                }

                if (ret === VisitorOption.Break) {
                    return;
                }

                worklist.push(marker);
                leavelist.push(node);

                if (ret !== VisitorOption.Skip) {
                    candidates = VisitorKeys[nodeType];
                    current = candidates.length;
                    while ((current -= 1) >= 0) {
                        candidate = node[candidates[current]];
                        if (candidate) {
                            if (isArray(candidate)) {
                                current2 = candidate.length;
                                while ((current2 -= 1) >= 0) {
                                    if (candidate[current2]) {
                                        if(nodeType === Syntax.ObjectExpression && 'properties' === candidates[current] && null == candidates[current].type) {
                                            worklist.push({type: 'PropertyWrapper', node: candidate[current2]});
                                        } else {
                                            worklist.push(candidate[current2]);
                                        }
                                    }
                                }
                            } else {
                                worklist.push(candidate);
                            }
                        }
                    }
                }
            }
        }
    }

    function replace(top, visitor) {
        var worklist, leavelist, node, nodeType, target, tuple, ret, current, current2, candidates, candidate, marker = {}, result;

        result = {
            top: top
        };

        tuple = [ top, result, 'top' ];
        worklist = [ tuple ];
        leavelist = [ tuple ];

        function notify(v) {
            ret = v;
        }

        while (worklist.length) {
            tuple = worklist.pop();

            if (tuple === marker) {
                tuple = leavelist.pop();
                ret = undefined;
                if (visitor.leave) {
                    node = tuple[0];
                    target = visitor.leave(tuple[0], leavelist[leavelist.length - 1][0], notify);
                    if (target !== undefined) {
                        node = target;
                    }
                    tuple[1][tuple[2]] = node;
                }
                if (ret === VisitorOption.Break) {
                    return result.top;
                }
            } else if (tuple[0]) {
                ret = undefined;
                node = tuple[0];

                nodeType = node.type;
                if (wrappers.hasOwnProperty(nodeType)) {
                    tuple[0] = node = node.node;
                    nodeType = wrappers[nodeType];
                }

                if (visitor.enter) {
                    target = visitor.enter(tuple[0], leavelist[leavelist.length - 1][0], notify);
                    if (target !== undefined) {
                        node = target;
                    }
                    tuple[1][tuple[2]] = node;
                    tuple[0] = node;
                }

                if (ret === VisitorOption.Break) {
                    return result.top;
                }

                if (tuple[0]) {
                    worklist.push(marker);
                    leavelist.push(tuple);

                    if (ret !== VisitorOption.Skip) {
                        candidates = VisitorKeys[nodeType];
                        current = candidates.length;
                        while ((current -= 1) >= 0) {
                            candidate = node[candidates[current]];
                            if (candidate) {
                                if (isArray(candidate)) {
                                    current2 = candidate.length;
                                    while ((current2 -= 1) >= 0) {
                                        if (candidate[current2]) {
                                            if(nodeType === Syntax.ObjectExpression && 'properties' === candidates[current] && null == candidates[current].type) {
                                                worklist.push([{type: 'PropertyWrapper', node: candidate[current2]}, candidate, current2]);
                                            } else {
                                                worklist.push([candidate[current2], candidate, current2]);
                                            }
                                        }
                                    }
                                } else {
                                    worklist.push([candidate, node, candidates[current]]);
                                }
                            }
                        }
                    }
                }
            }
        }

        return result.top;
    }

  return { Syntax: Syntax,
           traverse: traverse,
           replace: replace,
           VisitorKeys: VisitorKeys,
           VisitorOption: VisitorOption };
});


// This file contains a modified version of the Acorn parser, set up
// for easy use with Angular, cut down to parse only expressions, and
// supporting some extensions to normal JavaScript expression syntax.
//
// ORIGINAL LICENSE COMMENT:
//
// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/marijnh/acorn/issues

radian.factory('radianEval',
  ['$interpolate', 'plotLib', 'radianParse', 'estraverse', 'genPalFn',
  function($interpolate, plotLib, radianParse, estraverse, genPalFn)
{
  // Top level JavaScript names that we don't want to treat as free
  // variables in Radian expressions.
  var excnames = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'EvalError',
                  'Function', 'Global', 'JSON', 'Math', 'Number', 'Object',
                  'RangeError', 'ReferenceError', 'RegExp', 'String',
                  'SyntaxError', 'TypeError', 'URIError'];

  // We need to be able to call this recursively, so give it a name
  // here.
  var radianEval = function(scope, inexpr, returnfvs, skiperrors) {
    // Pass-through anything that isn't in [[ ]] brackets.
    if (typeof inexpr != "string" ||
        inexpr.substr(0,2) != '[[' && inexpr.substr(-2) != ']]') {
      var retexpr = inexpr;
      if (typeof inexpr == "string") retexpr = $interpolate(inexpr)(scope);
      return returnfvs ? [retexpr, []] : retexpr;
    }
    var expr = inexpr.substr(2, inexpr.length-4);
    if (expr == "") return returnfvs ? [0, []] : 0;

    // Parse data path as (slightly enhanced) JavaScript.
    var astorig = radianParse(expr);
    estraverse.traverse(astorig, { leave: function(n) {
      delete n.start; delete n.end;
    } });

    // Process palette and interpolator definitions into named
    // functions.
    var ast = estraverse.replace(astorig, { enter: function(n) {
      if (n.type == "PaletteExpression")
        return { type: "MemberExpression",
                 object: { type: "Identifier", name: "rad$$pal" },
                 property: { type: "Identifier", name: genPalFn(n.palette) } };
      else return n;
    }});

    // Determine metadata key, which is only possible for simple
    // applications of member access and plucking.  (For example, for
    // an expression of the form "vic2012#tmp", the metadata key is
    // "tmp"; for the expression "vic2012#date#doy", the metadata key
    // is "doy").
    var metadatakey = null, dataset = null;
    estraverse.traverse(ast, { enter: function(node) {
      if (node.type != "PluckExpression" && node.type != "MemberExpression")
        return estraverse.VisitorOption.Skip;
      else if (node.property.type == "Identifier") {
        metadatakey = node.property.name;
        var o = node.object;
        while (o.type != "Identifier" && o.hasOwnProperty("object"))
          o = o.object;
        if (o.hasOwnProperty("name")) dataset = o.name;
        return estraverse.VisitorOption.Break;
      }
    }});

    // Find free variables in JS expression for later processing.
    var exc = { }, excstack = [ ], fvs = { };
    excnames.forEach(function(n) { exc[n] = 1; });
    Object.keys(plotLib).forEach(function(k) { exc[k] = 1; });
    estraverse.traverse(ast, {
      enter: function(v, w) {
        switch (v.type) {
        case "FunctionExpression":
          // When we enter a function expression, we need to capture
          // the parameter names so that we don't record them as free
          // variables.  To deal with name shadowing, we use an
          // integer counter for names excluded from consideration as
          // free variables, rather than a simple boolean flag.
          excstack.push(v.params.map(function(p) { return p.name; }));
          v.params.forEach(function(p) {
            if (exc[p.name]) ++exc[p.name]; else exc[p.name] = 1;
          });
          break;
        case "Identifier":
          // We have a free variable, so record it.
          if (v.name != 'scope' && !exc[v.name]) {
            var free = true;
            if (w &&
                (((w.type == "MemberExpression" ||
                   w.type == "PluckExpression") &&
                  v == w.property && !w.computed) ||
                 (!w.hasOwnProperty("type") &&
                  w.hasOwnProperty("key") && v == w.key)))
              free = false;
            if (free) fvs[v.name] = 1;
          }
        }
      },
      leave: function(v) {
        if (v.type == "FunctionExpression")
          // Clear function parameters from our exclude stack as we
          // leave the function expression.
          excstack.pop().forEach(function(n) {
            if (--exc[n] == 0) delete exc[n];
          });
      }
    });

    // Vectorise arithmetic expressions.
    var astrepl = estraverse.replace(ast, {
      leave: function(n) {
        if (n.type == "BinaryExpression") {
          var fn = "";
          switch (n.operator) {
            case "+": fn = "rad$$add"; break;
            case "-": fn = "rad$$sub"; break;
            case "*": fn = "rad$$mul"; break;
            case "/": fn = "rad$$div"; break;
            case "**": fn = "rad$$pow"; break;
          }
          return !fn ? n : {
            "type":"CallExpression",
            "callee":{ "type":"Identifier","name":fn },
            "arguments": [n.left, n.right] };
        } else if (n.type == "UnaryExpression" && n.operator == "-") {
          return {
            "type":"CallExpression",
            "callee":{ "type":"Identifier","name":"rad$$neg" },
            "arguments": [n.argument] };
        } else
          return n;
      }
    });

    // Pluck expression transformations:
    //
    //  a#id     ->  lib.rad$$pluck("a", "id")
    //  a#id(c)  ->  a.map(function($$x) { return $$x.id(c); })
    //  a#n      ->  a.map(function($$x) { return $$x[n]; })
    //  a#(expr) ->  a.map(function($$x) { return $$x[expr]; })
    //
    astrepl = estraverse.replace(astrepl, {
      enter: function(n) {
        if (n.type == "CallExpression" && n.callee.type == "PluckExpression") {
          return{
            type:"CallExpression",
            callee:{type:"MemberExpression", object:n.callee.object,
                    property:{type:"Identifier", name:"map"},
                    computed:false},
            arguments:
            [{type:"FunctionExpression",
              id:null, params:[{type:"Identifier", name:"$$x"}],
              body:{
                type:"BlockStatement",
                body:[{
                  type:"ReturnStatement",
                  argument:{type:"CallExpression",
                            callee:{type:"MemberExpression",
                                    object:{type:"Identifier", name:"$$x"},
                                    property:n.callee.property,
                                    computed:n.callee.computed},
                            arguments:n.arguments}
                }]
              }
             }]
          };
        } else return n;
      },
      leave: function(n) {
        if (n.type == "PluckExpression") {
          if (n.property.type == "Identifier" && !n.computed) {
            return {
              type:"CallExpression",
              callee:{ type:"Identifier", name:"rad$$pluck" },
              arguments:
              [ n.object,
               { type: "Literal",
                 value: n.property.name,
                 raw: "'" + n.property.name + "'" }]};
          } else
            return {
              type:"CallExpression",
              callee:{ type:"MemberExpression", object:n.object,
                       property:{ type:"Identifier", name:"map" },
                       computed:false },
              arguments:
              [{ type:"FunctionExpression",
                 id:null, params:[{ type:"Identifier", name:"$$x"}],
                 body:{
                   type:"BlockStatement",
                   body:[{ type:"ReturnStatement",
                           argument:{ type:"MemberExpression",
                                      object:{ type:"Identifier", name:"$$x" },
                                      property:n.property,
                                      computed:n.computed}
                         }]
                 }
               }]
            };
        }}});

    // Replace free variables in JS expression by calls to
    // "scope.$eval".  We do things this way rather than using
    // Angular's "scope.$eval" on the whole JS expression because the
    // Angular expression parser only deals with a relatively small
    // subset of JS (no anonymous functions, for instance).
    astrepl = estraverse.replace(astrepl, {
      enter: function(v, w) {
        switch (v.type) {
        case "FunctionExpression":
          // When we enter a function expression, we need to capture
          // the parameter names so that we don't record them as free
          // variables.  To deal with name shadowing, we use an
          // integer counter for names excluded from consideration as
          // free variables, rather than a simple boolean flag.
          excstack.push(v.params.map(function(p) { return p.name; }));
          v.params.forEach(function(p) {
            if (exc[p.name]) ++exc[p.name]; else exc[p.name] = 1;
          });
          break;
        case "Identifier":
          if (!(w.hasOwnProperty('key') && v == w.key) &&
              !exc[v.name] && fvs[v.name]) {
            // We have a free variable, so replace the reference to it
            // with a call to 'scope.$eval'.
            return {
              type: "CallExpression",
              callee: { type: "MemberExpression",
                        object: { type: "Identifier", name: "scope" },
                        property: { type: "Identifier", name: "$eval" },
                        computed: false },
              arguments: [{ type: "Literal", value: v.name,
                            raw:"'" + v.name + "'" }]
            };
          }
        }
        return v;
      },
      leave: function(v) {
        if (v.type == "FunctionExpression")
          // Clear function parameters from our exclude stack as we
          // leave the function expression.
          excstack.pop().forEach(function(n) {
            if (--exc[n] == 0) delete exc[n];
          });
        return v;
      }
    });

    // Generate JS code suitable for accessing data.
    var access = escodegen.generate(astrepl);
    var ret = [];
    try {
      // Bring plot function library names into scope.
      with (plotLib) {
        eval("ret = " + access);
      }
    } catch (e) {
      if (!skiperrors)
        throw Error("radianEval failed on '" + expr + "' -- " + e.message);
    }
    if (ret && dataset && metadatakey) {
      if (scope[dataset] && scope[dataset].metadata &&
          scope[dataset].metadata[metadatakey])
        ret.metadata = scope[dataset].metadata[metadatakey];
    }
    return returnfvs ? [ret, Object.keys(fvs)] : ret;
  };

  return radianEval;
}]);


radian.factory('radianParse', function()
{
  'use strict';

  // The main exported interface (under `self.acorn` when in the
  // browser) is a `parse` function that takes a code string and
  // returns an abstract syntax tree as specified by [Mozilla parser
  // API][api], with the caveat that the SpiderMonkey-specific syntax
  // (`let`, `yield`, inline XML, etc) is not recognized.
  //
  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

  var input, inputLen;

  var mainfn = function(inpt) {
    input = String(inpt); inputLen = input.length;
    initTokenState();
    return parseTopLevel();
  };

  // The `getLineInfo` function is mostly useful when the
  // `locations` option is off (for performance reasons) and you
  // want to find the line/column position for a given character
  // offset. `input` should be the code string that the offset refers
  // into.

  var getLineInfo = function(input, offset) {
    for (var line = 1, cur = 0;;) {
      lineBreak.lastIndex = cur;
      var match = lineBreak.exec(input);
      if (match && match.index < offset) {
        ++line;
        cur = match.index + match[0].length;
      } else break;
    }
    return {line: line, column: offset - cur};
  };

  // Acorn is organized as a tokenizer and a recursive-descent parser.
  // The `tokenize` export provides an interface to the tokenizer.
  // Because the tokenizer is optimized for being efficiently used by
  // the Acorn parser itself, this interface is somewhat crude and not
  // very modular. Performing another parse or call to `tokenize` will
  // reset the internal state, and invalidate existing tokenizers.

  function tokenize(inpt, opts) {
    input = String(inpt); inputLen = input.length;
    initTokenState();

    var t = {};
    function getToken(forceRegexp) {
      readToken(forceRegexp);
      t.start = tokStart; t.end = tokEnd;
      t.type = tokType; t.value = tokVal;
      return t;
    }
    getToken.jumpTo = function(pos, reAllowed) {
      tokPos = pos;
      var ch = input.charAt(pos - 1);
      tokRegexpAllowed = reAllowed;
      skipSpace();
    };
    return getToken;
  };

  // State is kept in (closure-)global variables. We already saw the
  // `input`, and `inputLen` variables above.

  // The current position of the tokenizer in the input.

  var tokPos;

  // The start and end offsets of the current token.

  var tokStart, tokEnd;

  // The type and value of the current token. Token types are objects,
  // named by variables against which they can be compared, and
  // holding properties that describe them (indicating, for example,
  // the precedence of an infix operator, and the original name of a
  // keyword token). The kind of value that's held in `tokVal` depends
  // on the type of the token. For literals, it is the literal value,
  // for operators, the operator name, and so on.

  var tokType, tokVal;

  // Interal state for the tokenizer. To distinguish between division
  // operators and regular expressions, it remembers whether the last
  // token was one that is allowed to be followed by an expression.
  // (If it is, a slash is probably a regexp, if it isn't it's a
  // division operator. See the `parseStatement` function for a
  // caveat.)

  var tokRegexpAllowed;

  // These store the position of the previous token, which is useful
  // when finishing a node and assigning its `end` position.

  var lastStart, lastEnd, lastEndLoc;

  // This is the parser's state. `inFunction` is used to reject
  // `return` statements outside of functions, `labels` to verify that
  // `break` and `continue` have somewhere to jump to, and `strict`
  // indicates whether strict mode is on.

  var inFunction, labels, strict;

  // This function is used to raise exceptions on parse errors. It
  // takes an offset integer (into the current `input`) to indicate
  // the location of the error, attaches the position to the end
  // of the error message, and then raises a `SyntaxError` with that
  // message.

  function raise(pos, message) {
    var loc = getLineInfo(input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    err.pos = pos; err.loc = loc; err.raisedAt = tokPos;
    throw err;
  }

  // ## Token types

  // The assignment of fine-grained, information-carrying type objects
  // allows the tokenizer to store the information it has about a
  // token in a way that is very cheap for the parser to look up.

  // All token type variables start with an underscore, to make them
  // easy to recognize.

  // These are the general types. The `type` property is only used to
  // make them recognizeable when debugging.

  var _num = {type: "num"}, _regexp = {type: "regexp"};
  var _string = {type: "string"}, _name = {type: "name"};
  var _colour = {type: "colour"}, _eof = {type: "eof"};

  // Keyword tokens. The `keyword` property (also used in keyword-like
  // operators) indicates that the token originated from an
  // identifier-like word, which is used when parsing property names.
  //
  // The `beforeExpr` property is used to disambiguate between regular
  // expressions and divisions. It is set on all token types that can
  // be followed by an expression (thus, a slash after them would be a
  // regular expression).
  //
  // `isLoop` marks a keyword as starting a loop, which is important
  // to know when parsing a label, in order to allow or disallow
  // continue jumps to that label.

  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true};
  var _catch = {keyword: "catch"}, _continue = {keyword: "continue"};
  var _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
  var _do = {keyword: "do", isLoop: true};
  var _else = {keyword: "else", beforeExpr: true};
  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true};
  var _function = {keyword: "function"}, _if = {keyword: "if"};
  var _return = {keyword: "return", beforeExpr: true};
  var _switch = {keyword: "switch"};
  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"};
  var _var = {keyword: "var"}, _while = {keyword: "while", isLoop: true};
  var _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
  var _this = {keyword: "this"};
  var _palette = {keyword: "@P"}, _interpolator = {keyword: "@I"};

  // The keywords that denote values.

  var _null = {keyword: "null", atomValue: null};
  var _true = {keyword: "true", atomValue: true};
  var _false = {keyword: "false", atomValue: false};

  // Some keywords are treated as regular operators. `in` sometimes
  // (when parsing `for`) needs to be tested against specifically, so
  // we assign a variable name to it for quick comparing.

  var _in = {keyword: "in", binop: 7, beforeExpr: true};

  // Map keyword names to token types.

  var keywordTypes =
    {"break": _break, "case": _case, "catch": _catch, "continue": _continue,
     "debugger": _debugger, "default": _default, "do": _do, "else": _else,
     "finally": _finally, "for": _for, "function": _function, "if": _if,
     "return": _return, "switch": _switch, "throw": _throw, "try": _try,
     "var": _var, "while": _while, "with": _with, "null": _null, "true": _true,
     "false": _false, "new": _new, "in": _in,
     "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: true},
     "this": _this, "@P": _palette, "@I": _interpolator,
     "typeof": {keyword: "typeof", prefix: true, beforeExpr: true},
     "void": {keyword: "void", prefix: true, beforeExpr: true},
     "delete": {keyword: "delete", prefix: true, beforeExpr: true}};

  // Punctuation token types. Again, the `type` property is purely for
  // debugging.

  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"};
  var _braceL = {type: "{", beforeExpr: true}, _braceR = {type: "}"};
  var _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"};
  var _comma = {type: ",", beforeExpr: true};
  var _semi = {type: ";", beforeExpr: true};
  var _colon = {type: ":", beforeExpr: true};
  var _dot = {type: "."}, _question = {type: "?", beforeExpr: true};
  var _hash = {type: "#"};

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator. `isUpdate` specifies that the node produced by
  // the operator should be of type UpdateExpression rather than
  // simply UnaryExpression (`++` and `--`).
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  var _slash = {binop: 10, beforeExpr: true};
  var _eq = {isAssign: true, beforeExpr: true};
  var _assign = {isAssign: true, beforeExpr: true};
  var _plusmin = {binop: 9, prefix: true, beforeExpr: true};
  var _incdec = {postfix: true, prefix: true, isUpdate: true};
  var _prefix = {prefix: true, beforeExpr: true};
  var _bin1 = {binop: 1, beforeExpr: true};
  var _bin2 = {binop: 2, beforeExpr: true};
  var _bin3 = {binop: 3, beforeExpr: true};
  var _bin4 = {binop: 4, beforeExpr: true};
  var _bin5 = {binop: 5, beforeExpr: true};
  var _bin6 = {binop: 6, beforeExpr: true};
  var _bin7 = {binop: 7, beforeExpr: true};
  var _bin8 = {binop: 8, beforeExpr: true};
  var _bin10 = {binop: 10, beforeExpr: true};
  var _bin11 = {binop: 11, beforeExpr: true};

  // Provide access to the token types for external users of the
  // tokenizer.

  var tokTypes =
    {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
     parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi,
     colon: _colon, dot: _dot, question: _question, slash: _slash, eq: _eq,
     name: _name, eof: _eof,
     num: _num, regexp: _regexp, string: _string, hash: _hash};
  for (var kw in keywordTypes) tokTypes[kw] = keywordTypes[kw];

  // This is a trick taken from Esprima. It turns out that, on
  // non-Chrome browsers, to check whether a string is in a set, a
  // predicate containing a big ugly `switch` statement is faster than
  // a regular expression, and on Chrome the two are about on par.
  // This function uses `eval` (non-lexical) to produce such a
  // predicate from a space-separated string of words.
  //
  // It starts by sorting the words by length.

  function makePredicate(words) {
    words = words.split(" ");
    var f = "", cats = [], skip;
//    out: for (var i = 0; i < words.length; ++i) {
    for (var i = 0; i < words.length; ++i) {
      skip = false;
      for (var j = 0; j < cats.length; ++j)
        if (cats[j][0].length == words[i].length) {
          cats[j].push(words[i]);
          skip = true;
          break;
//          continue out;
        }
      if (!skip) cats.push([words[i]]);
      skip = false;
    }
    function compareTo(arr) {
      if (arr.length == 1)
        return f += "return str === " + JSON.stringify(arr[0]) + ";";
      f += "switch(str){";
      for (var i = 0; i < arr.length; ++i)
        f += "case " + JSON.stringify(arr[i]) + ":";
      f += "return true}return false;";
    }

    // When there are more than three length categories, an outer
    // switch first dispatches on the lengths, to save on comparisons.

    if (cats.length > 3) {
      cats.sort(function(a, b) {return b.length - a.length;});
      f += "switch(str.length){";
      for (var i = 0; i < cats.length; ++i) {
        var cat = cats[i];
        f += "case " + cat[0].length + ":";
        compareTo(cat);
      }
      f += "}";

    // Otherwise, simply generate a flat `switch` statement.

    } else {
      compareTo(words);
    }
    return new Function("str", f);
  }

  // ECMAScript 5 reserved words.

  var isReservedWord5 =
    makePredicate("class enum extends super const export import");

  // The additional reserved words in strict mode.

  var isStrictReservedWord =
    makePredicate("implements interface let package private " +
                  "protected public static yield");

  // The forbidden variable names in strict mode.

  var isStrictBadIdWord = makePredicate("eval arguments");

  // And the keywords.

  var isKeyword =
    makePredicate("break case catch continue debugger default do " +
                  "else finally for function if return switch throw try " +
                  "var while with null true false instanceof typeof void " +
                  "delete new in this");

  // ## Character categories

  // Big ugly regular expressions that match characters in the
  // whitespace, identifier, and identifier-start categories. These
  // are only applied when a character is found to actually have a
  // code point above 128.

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/;
  var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
  var nonASCIIidentifierChars = "\u0371-\u0374\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

  // Whether a single character denotes a newline.

  var newline = /[\n\r\u2028\u2029]/;

  // Matches a whole line break (where CRLF is considered a single
  // line break). Used to count lines.

  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

  // Test whether a given character code starts an identifier.

  function isIdentifierStart(code) {
    if (code < 65) return code === 36;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa &&
      nonASCIIidentifierStart.test(String.fromCharCode(code));
  }

  // Test whether a given character is part of an identifier.

  function isIdentifierChar(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123)return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  }

  // ## Tokenizer

  // Reset the token state. Used at the start of a parse.

  function initTokenState() {
    tokPos = 0;
    tokRegexpAllowed = true;
    skipSpace();
  }

  // Called at the end of every token. Sets `tokEnd`, `tokVal`, and
  // `tokRegexpAllowed`, and skips the space after the token, so that
  // the next one's `tokStart` will point at the right position.

  function finishToken(type, val) {
    tokEnd = tokPos;
    tokType = type;
    skipSpace();
    tokVal = val;
    tokRegexpAllowed = type.beforeExpr;
  }

  function skipBlockComment() {
    var end = input.indexOf("*/", tokPos += 2);
    if (end === -1) raise(tokPos - 2, "Unterminated comment");
    tokPos = end + 2;
  }

  function skipLineComment() {
    var ch = input.charCodeAt(tokPos+=2);
    while (tokPos < inputLen && ch !== 10 &&
           ch !== 13 && ch !== 8232 && ch !== 8329) {
      ++tokPos;
      ch = input.charCodeAt(tokPos);
    }
  }

  // Called at the start of the parse and after every token. Skips
  // whitespace and comments, and.

  function skipSpace() {
    while (tokPos < inputLen) {
      var ch = input.charCodeAt(tokPos);
      if (ch === 32) { // ' '
        ++tokPos;
      } else if(ch === 13) {
        ++tokPos;
        var next = input.charCodeAt(tokPos);
        if(next === 10) {
          ++tokPos;
        }
      } else if (ch === 10) {
        ++tokPos;
      } else if(ch < 14 && ch > 8) {
        ++tokPos;
      } else if (ch === 47) { // '/'
        var next = input.charCodeAt(tokPos+1);
        if (next === 42) { // '*'
          skipBlockComment();
        } else if (next === 47) { // '/'
          skipLineComment();
        } else break;
      } else if ((ch < 14 && ch > 8) ||
                 ch === 32 || ch === 160) { // ' ', '\xa0'
        ++tokPos;
      } else if (ch >= 5760 &&
                 nonASCIIwhitespace.test(String.fromCharCode(ch))) {
        ++tokPos;
      } else {
        break;
      }
    }
  }

  // ### Token reading

  // This is the function that is called to fetch the next token. It
  // is somewhat obscure, because it works in character codes rather
  // than characters, and because operator parsing has been inlined
  // into it.
  //
  // All in the name of speed.
  //
  // The `forceRegexp` parameter is used in the one case where the
  // `tokRegexpAllowed` trick does not work. See `parseStatement`.

  function readToken_dot() {
    var next = input.charCodeAt(tokPos+1);
    if (next >= 48 && next <= 57) return readNumber(true);
    ++tokPos;
    return finishToken(_dot);
  }

  function readToken_slash() { // '/'
    var next = input.charCodeAt(tokPos+1);
    if (tokRegexpAllowed) {++tokPos; return readRegexp();}
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_slash, 1);
  }

  function readToken_mult_modulo() { // '%', '*' and '**'
    var next = input.charCodeAt(tokPos+1);
    if (next === 61) return finishOp(_assign, 2);
    if (next === 42) {
      var next2 = input.charCodeAt(tokPos+2);
      if (next === 61) return finishOp(_assign, 3);
      return finishOp(_bin11, 2);
    }
    return finishOp(_bin10, 1);
  }

  function readToken_pipe_amp(code) { // '|&'
    var next = input.charCodeAt(tokPos+1);
    if (next === code) return finishOp(code === 124 ? _bin1 : _bin2, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(code === 124 ? _bin3 : _bin5, 1);
  }

  function readToken_caret() { // '^'
    var next = input.charCodeAt(tokPos+1);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_bin4, 1);
  }

  function readToken_plus_min(code) { // '+-'
    var next = input.charCodeAt(tokPos+1);
    if (next === code) return finishOp(_incdec, 2);
    if (next === 61) return finishOp(_assign, 2);
    return finishOp(_plusmin, 1);
  }

  function readToken_lt_gt(code) { // '<>'
    var next = input.charCodeAt(tokPos+1);
    var size = 1;
    if (next === code) {
      size = code === 62 && input.charCodeAt(tokPos+2) === 62 ? 3 : 2;
      if (input.charCodeAt(tokPos + size) === 61)
        return finishOp(_assign, size + 1);
      return finishOp(_bin8, size);
    }
    if (next === 61)
      size = input.charCodeAt(tokPos+2) === 61 ? 3 : 2;
    return finishOp(_bin7, size);
  }

  function readToken_eq_excl(code) { // '=!'
    var next = input.charCodeAt(tokPos+1);
    if (next === 61)
      return finishOp(_bin6, input.charCodeAt(tokPos+2) === 61 ? 3 : 2);
    return finishOp(code === 61 ? _eq : _prefix, 1);
  }

  function readToken_pal_interp() { // '@'
    var next = input.charCodeAt(tokPos+1);
    if (next == 80) return finishOp(_palette, 2); // 'P'
    else if (next == 73) return finishOp(_interpolator, 2); // 'I'
    else raise("Invalid palette token sequence");
  }

  function readToken_colour() { // '#'
    function ishex(c) {
      return c>='0' && c<='9' || c>='A' && c<='F' || c>='a' && c<='f';
    };
    ++tokPos;
    var n = 0;
    for (var i = tokPos; ishex(input.charAt(i)) && n < 6; ++i) ++n;
    var val;
    if (n == 6) { val = input.substr(tokPos, 6); tokPos += 6; }
    else if (n == 3) { val = input.substr(tokPos, 3); tokPos += 3; }
    else raise("Invalid colour constant");
    var type = _colour;
    return finishToken(type, val);
  }

  function getTokenFromCode(code, doColour) {
    switch(code) {
      // The interpretation of a dot depends on whether it is followed
      // by a digit.
    case 46: // '.'
      return readToken_dot();

      // Punctuation tokens.
    case 35:
      if (doColour) return readToken_colour();
      else { ++tokPos; return finishToken(_hash); }
    case 40: ++tokPos; return finishToken(_parenL);
    case 41: ++tokPos; return finishToken(_parenR);
    case 59: ++tokPos; return finishToken(_semi);
    case 44: ++tokPos; return finishToken(_comma);
    case 91: ++tokPos; return finishToken(_bracketL);
    case 93: ++tokPos; return finishToken(_bracketR);
    case 123: ++tokPos; return finishToken(_braceL);
    case 125: ++tokPos; return finishToken(_braceR);
    case 58: ++tokPos; return finishToken(_colon);
    case 63: ++tokPos; return finishToken(_question);

      // '0x' is a hexadecimal number.
    case 48: // '0'
      var next = input.charCodeAt(tokPos+1);
      if (next === 120 || next === 88) return readHexNumber();
      // Anything else beginning with a digit is an integer, octal
      // number, or float.
    case 49: case 50: case 51: case 52: case 53:
    case 54: case 55: case 56: case 57: // 1-9
      return readNumber(false);

      // Quotes produce strings.
    case 34: case 39: // '"', "'"
      return readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47: // '/'
      return readToken_slash(code);

    case 37: case 42: // '%*'
      return readToken_mult_modulo();

    case 124: case 38: // '|&'
      return readToken_pipe_amp(code);

    case 94: // '^'
      return readToken_caret();

    case 43: case 45: // '+-'
      return readToken_plus_min(code);

    case 60: case 62: // '<>'
      return readToken_lt_gt(code);

    case 61: case 33: // '=!'
      return readToken_eq_excl(code);

    case 126: // '~'
      return finishOp(_prefix, 1);

    case 64: // '@'
      return readToken_pal_interp(code);
    }

    return false;
  }

  function readToken(forceRegexp, doColour) {
    if (doColour) --tokPos;
    tokStart = tokPos;
    if (forceRegexp) return readRegexp();
    if (tokPos >= inputLen) return finishToken(_eof);

    var code = input.charCodeAt(tokPos);
    // Identifier or keyword. '\uXXXX' sequences are allowed in
    // identifiers, so '\' also dispatches to that.
    if (isIdentifierStart(code) || code === 92 /* '\' */) return readWord();

    var tok = getTokenFromCode(code, doColour);

    if (tok === false) {
      // If we are here, we either found a non-ASCII identifier
      // character, or something that's entirely disallowed.
      var ch = String.fromCharCode(code);
      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord();
      raise(tokPos, "Unexpected character '" + ch + "'");
    }
    return tok;
  }

  function finishOp(type, size) {
    var str = input.slice(tokPos, tokPos + size);
    tokPos += size;
    finishToken(type, str);
  }

  // Parse a regular expression. Some context-awareness is necessary,
  // since a '/' inside a '[]' set does not end the expression.

  function readRegexp() {
    var content = "", escaped, inClass, start = tokPos;
    for (;;) {
      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
      var ch = input.charAt(tokPos);
      if (newline.test(ch)) raise(start, "Unterminated regular expression");
      if (!escaped) {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      } else escaped = false;
      ++tokPos;
    }
    var content = input.slice(start, tokPos);
    ++tokPos;
    // Need to use `readWord1` because '\uXXXX' sequences are allowed
    // here (don't ask).
    var mods = readWord1();
    if (mods && !/^[gmsiy]*$/.test(mods)) raise(start, "Invalid regexp flag");
    return finishToken(_regexp, new RegExp(content, mods));
  }

  // Read an integer in the given radix. Return null if zero digits
  // were read, the integer value otherwise. When `len` is given, this
  // will return `null` unless the integer has exactly `len` digits.

  function readInt(radix, len) {
    var start = tokPos, total = 0;
    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
      var code = input.charCodeAt(tokPos), val;
      if (code >= 97) val = code - 97 + 10; // a
      else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
      else val = Infinity;
      if (val >= radix) break;
      ++tokPos;
      total = total * radix + val;
    }
    if (tokPos === start || len != null && tokPos - start !== len) return null;

    return total;
  }

  function readHexNumber() {
    tokPos += 2; // 0x
    var val = readInt(16);
    if (val == null) raise(tokStart + 2, "Expected hexadecimal number");
    if (isIdentifierStart(input.charCodeAt(tokPos)))
      raise(tokPos, "Identifier directly after number");
    return finishToken(_num, val);
  }

  // Read an integer, octal integer, or floating-point number.

  function readNumber(startsWithDot) {
    var start = tokPos, isFloat = false;
    var octal = input.charCodeAt(tokPos) === 48;
    if (!startsWithDot && readInt(10) === null) raise(start, "Invalid number");
    if (input.charCodeAt(tokPos) === 46) {
      ++tokPos;
      readInt(10);
      isFloat = true;
    }
    var next = input.charCodeAt(tokPos);
    if (next === 69 || next === 101) { // 'eE'
      next = input.charCodeAt(++tokPos);
      if (next === 43 || next === 45) ++tokPos; // '+-'
      if (readInt(10) === null) raise(start, "Invalid number")
      isFloat = true;
    }
    if (isIdentifierStart(input.charCodeAt(tokPos)))
      raise(tokPos, "Identifier directly after number");

    var str = input.slice(start, tokPos), val;
    if (isFloat) val = parseFloat(str);
    else if (!octal || str.length === 1) val = parseInt(str, 10);
    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
    else val = parseInt(str, 8);
    return finishToken(_num, val);
  }

  // Read a string value, interpreting backslash-escapes.

  var rs_str = [];

  function readString(quote) {
    tokPos++;
    rs_str.length = 0;
    for (;;) {
      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
      var ch = input.charCodeAt(tokPos);
      if (ch === quote) {
        ++tokPos;
        return finishToken(_string, String.fromCharCode.apply(null, rs_str));
      }
      if (ch === 92) { // '\'
        ch = input.charCodeAt(++tokPos);
        var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
        if (octal) octal = octal[0];
        while (octal && parseInt(octal, 8) > 255)
          octal = octal.slice(0, octal.length - 1);
        if (octal === "0") octal = null;
        ++tokPos;
        if (octal) {
          if (strict) raise(tokPos - 2, "Octal literal in strict mode");
          rs_str.push(parseInt(octal, 8));
          tokPos += octal.length - 1;
        } else {
          switch (ch) {
          case 110: rs_str.push(10); break; // 'n' -> '\n'
          case 114: rs_str.push(13); break; // 'r' -> '\r'
          case 120: rs_str.push(readHexChar(2)); break; // 'x'
          case 117: rs_str.push(readHexChar(4)); break; // 'u'
          case 85: rs_str.push(readHexChar(8)); break; // 'U'
          case 116: rs_str.push(9); break; // 't' -> '\t'
          case 98: rs_str.push(8); break; // 'b' -> '\b'
          case 118: rs_str.push(11); break; // 'v' -> '\u000b'
          case 102: rs_str.push(12); break; // 'f' -> '\f'
          case 48: rs_str.push(0); break; // 0 -> '\0'
          case 13: if (input.charCodeAt(tokPos) === 10) ++tokPos; // '\r\n'
          case 10: // ' \n'
            break;
          default: rs_str.push(ch); break;
          }
        }
      } else {
        if (ch === 13 || ch === 10 || ch === 8232 || ch === 8329)
          raise(tokStart, "Unterminated string constant");
        rs_str.push(ch); // '\'
        ++tokPos;
      }
    }
  }

  // Used to read character escape sequences ('\x', '\u', '\U').

  function readHexChar(len) {
    var n = readInt(16, len);
    if (n === null) raise(tokStart, "Bad character escape sequence");
    return n;
  }

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.

  var containsEsc;

  // Read an identifier, and return it as a string. Sets `containsEsc`
  // to whether the word contained a '\u' escape.
  //
  // Only builds up the word character-by-character when it actually
  // containeds an escape, as a micro-optimization.

  function readWord1() {
    containsEsc = false;
    var word, first = true, start = tokPos;
    for (;;) {
      var ch = input.charCodeAt(tokPos);
      if (isIdentifierChar(ch)) {
        if (containsEsc) word += input.charAt(tokPos);
        ++tokPos;
      } else if (ch === 92) { // "\"
        if (!containsEsc) word = input.slice(start, tokPos);
        containsEsc = true;
        if (input.charCodeAt(++tokPos) != 117) // "u"
          raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
        ++tokPos;
        var esc = readHexChar(4);
        var escStr = String.fromCharCode(esc);
        if (!escStr) raise(tokPos - 1, "Invalid Unicode escape");
        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
          raise(tokPos - 4, "Invalid Unicode escape");
        word += escStr;
      } else {
        break;
      }
      first = false;
    }
    return containsEsc ? word : input.slice(start, tokPos);
  }

  // Read an identifier or keyword token. Will check for reserved
  // words when necessary.

  function readWord() {
    var word = readWord1();
    var type = _name;
    if (!containsEsc) {
      if (isKeyword(word)) type = keywordTypes[word];
      else if (strict && isStrictReservedWord(word))
        raise(tokStart, "The keyword '" + word + "' is reserved");
    }
    return finishToken(type, word);
  }

  // ## Parser

  // A recursive descent parser operates by defining functions for all
  // syntactic elements, and recursively calling those, each function
  // advancing the input stream and returning an AST node. Precedence
  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
  // instead of `(!x)[1]` is handled by the fact that the parser
  // function that parses unary prefix operators is called first, and
  // in turn calls the function that parses `[]` subscripts — that
  // way, it'll receive the node for `x[1]` already parsed, and wraps
  // *that* in the unary operator node.
  //
  // Acorn uses an [operator precedence parser][opp] to handle binary
  // operator precedence, because it is much more compact than using
  // the technique outlined above, which uses different, nesting
  // functions to specify precedence, for all of the ten binary
  // precedence levels that JavaScript defines.
  //
  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

  // ### Parser utilities

  // Continue to the next token.

  function next() {
    lastStart = tokStart;
    lastEnd = tokEnd;
    readToken();
  }

  // Enter strict mode. Re-reads the next token to please pedantic
  // tests ("use strict"; 010; -- should fail).

  function setStrict(strct) {
    strict = strct;
    tokPos = lastEnd;
    skipSpace();
    readToken();
  }

  // Start an AST node, attaching a start offset.

  function node_t() {
    this.type = null;
    this.start = tokStart;
    this.end = null;
  }

  function startNode() { return new node_t(); }

  // Start a node whose start offset information should be based on
  // the start of another node. For example, a binary operator node is
  // only started after its left-hand side has already been parsed.

  function startNodeFrom(other) {
    var node = new node_t();
    node.start = other.start;

    return node;
  }

  // Finish an AST node, adding `type` and `end` properties.

  function finishNode(node, type) {
    node.type = type;
    node.end = lastEnd;
    return node;
  }

  // Test whether a statement node is the string literal `"use strict"`.

  function isUseStrict(stmt) {
    return stmt.type === "ExpressionStatement" &&
      stmt.expression.type === "Literal" &&
      stmt.expression.value === "use strict";
  }

  // Predicate that tests whether the next token is of the given
  // type, and if yes, consumes it as a side effect.

  function eat(type) {
    if (tokType === type) {
      next();
      return true;
    }
  }

  // Test whether a semicolon can be inserted at the current position.

  function canInsertSemicolon() {
    return (tokType === _eof || tokType === _braceR ||
            newline.test(input.slice(lastEnd, tokStart)));
  }

  // Consume a semicolon, or, failing that, see if we are allowed to
  // pretend that there is a semicolon at this position.

  function semicolon() {
    if (!eat(_semi) && !canInsertSemicolon()) unexpected();
  }

  // Expect a token of a given type. If found, consume it, otherwise,
  // raise an unexpected token error.

  function expect(type) {
    if (tokType === type) next();
    else unexpected();
  }

  // Raise an unexpected token error.

  function unexpected() {
    raise(tokStart, "Unexpected token");
  }

  // Verify that a node is an lval — something that can be assigned
  // to.

  function checkLVal(expr) {
    if (expr.type !== "Identifier" && expr.type !== "MemberExpression")
      raise(expr.start, "Assigning to rvalue");
    if (strict && expr.type === "Identifier" && isStrictBadIdWord(expr.name))
      raise(expr.start, "Assigning to " + expr.name + " in strict mode");
  }

  // ### Top level parsing

  // Parse an expression. Initializes the parser, reads a single
  // expression and returns it.

  function parseTopLevel() {
    lastStart = lastEnd = tokPos;
    inFunction = strict = null;
    labels = [];
    readToken();
    return parseExpression();
  }

  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

  // Parse a single statement.
  //
  // If expecting a statement and finding a slash operator, parse a
  // regular expression literal. This is to handle cases like
  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
  // does not help.

  function parseStatement() {
    if (tokType === _slash)
      readToken(true);

    var starttype = tokType, node = startNode();

    // Most types of statements are recognized by the keyword they
    // start with. Many are trivial to parse, some require a bit of
    // complexity.

    switch (starttype) {
    case _break: case _continue:
      next();
      var isBreak = starttype === _break;
      if (eat(_semi) || canInsertSemicolon()) node.label = null;
      else if (tokType !== _name) unexpected();
      else {
        node.label = parseIdent();
        semicolon();
      }

      // Verify that there is an actual destination to break or
      // continue to.
      for (var i = 0; i < labels.length; ++i) {
        var lab = labels[i];
        if (node.label == null || lab.name === node.label.name) {
          if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
          if (node.label && isBreak) break;
        }
      }
      if (i === labels.length)
        raise(node.start, "Unsyntactic " + starttype.keyword);
      return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

    case _debugger:
      next();
      semicolon();
      return finishNode(node, "DebuggerStatement");

    case _do:
      next();
      labels.push(loopLabel);
      node.body = parseStatement();
      labels.pop();
      expect(_while);
      node.test = parseParenExpression();
      semicolon();
      return finishNode(node, "DoWhileStatement");

      // Disambiguating between a `for` and a `for`/`in` loop is
      // non-trivial. Basically, we have to parse the init `var`
      // statement or expression, disallowing the `in` operator (see
      // the second parameter to `parseExpression`), and then check
      // whether the next token is `in`. When there is no init part
      // (semicolon immediately after the opening parenthesis), it is
      // a regular `for` loop.

    case _for:
      next();
      labels.push(loopLabel);
      expect(_parenL);
      if (tokType === _semi) return parseFor(node, null);
      if (tokType === _var) {
        var init = startNode();
        next();
        parseVar(init, true);
        if (init.declarations.length === 1 && eat(_in))
          return parseForIn(node, init);
        return parseFor(node, init);
      }
      var init = parseExpression(false, true);
      if (eat(_in)) {checkLVal(init); return parseForIn(node, init);}
      return parseFor(node, init);

    case _function:
      next();
      return parseFunction(node, true);

    case _if:
      next();
      node.test = parseParenExpression();
      node.consequent = parseStatement();
      node.alternate = eat(_else) ? parseStatement() : null;
      return finishNode(node, "IfStatement");

    case _return:
      if (!inFunction) raise(tokStart, "'return' outside of function");
      next();

      // In `return` (and `break`/`continue`), the keywords with
      // optional arguments, we eagerly look for a semicolon or the
      // possibility to insert one.

      if (eat(_semi) || canInsertSemicolon()) node.argument = null;
      else { node.argument = parseExpression(); semicolon(); }
      return finishNode(node, "ReturnStatement");

    case _switch:
      next();
      node.discriminant = parseParenExpression();
      node.cases = [];
      expect(_braceL);
      labels.push(switchLabel);

      // Statements under must be grouped (by label) in SwitchCase
      // nodes. `cur` is used to keep the node that we are currently
      // adding statements to.

      for (var cur, sawDefault; tokType != _braceR;) {
        if (tokType === _case || tokType === _default) {
          var isCase = tokType === _case;
          if (cur) finishNode(cur, "SwitchCase");
          node.cases.push(cur = startNode());
          cur.consequent = [];
          next();
          if (isCase) cur.test = parseExpression();
          else {
            if (sawDefault)
              raise(lastStart, "Multiple default clauses"); sawDefault = true;
            cur.test = null;
          }
          expect(_colon);
        } else {
          if (!cur) unexpected();
          cur.consequent.push(parseStatement());
        }
      }
      if (cur) finishNode(cur, "SwitchCase");
      next(); // Closing brace
      labels.pop();
      return finishNode(node, "SwitchStatement");

    case _throw:
      next();
      if (newline.test(input.slice(lastEnd, tokStart)))
        raise(lastEnd, "Illegal newline after throw");
      node.argument = parseExpression();
      semicolon();
      return finishNode(node, "ThrowStatement");

    case _try:
      next();
      node.block = parseBlock();
      node.handlers = [];
      while (tokType === _catch) {
        var clause = startNode();
        next();
        expect(_parenL);
        clause.param = parseIdent();
        if (strict && isStrictBadIdWord(clause.param.name))
          raise(clause.param.start, "Binding " +
                clause.param.name + " in strict mode");
        expect(_parenR);
        clause.guard = null;
        clause.body = parseBlock();
        node.handlers.push(finishNode(clause, "CatchClause"));
      }
      node.finalizer = eat(_finally) ? parseBlock() : null;
      if (!node.handlers.length && !node.finalizer)
        raise(node.start, "Missing catch or finally clause");
      return finishNode(node, "TryStatement");

    case _var:
      next();
      node = parseVar(node);
      semicolon();
      return node;

    case _while:
      next();
      node.test = parseParenExpression();
      labels.push(loopLabel);
      node.body = parseStatement();
      labels.pop();
      return finishNode(node, "WhileStatement");

    case _with:
      if (strict) raise(tokStart, "'with' in strict mode");
      next();
      node.object = parseParenExpression();
      node.body = parseStatement();
      return finishNode(node, "WithStatement");

    case _braceL:
      return parseBlock();

    case _semi:
      next();
      return finishNode(node, "EmptyStatement");

      // If the statement does not start with a statement keyword or a
      // brace, it's an ExpressionStatement or LabeledStatement. We
      // simply start parsing an expression, and afterwards, if the
      // next token is a colon and the expression was a simple
      // Identifier node, we switch to interpreting it as a label.

    default:
      var maybeName = tokVal, expr = parseExpression();
      if (starttype === _name && expr.type === "Identifier" && eat(_colon)) {
        for (var i = 0; i < labels.length; ++i)
          if (labels[i].name === maybeName)
            raise(expr.start, "Label '" + maybeName + "' is already declared");
        var kind = tokType.isLoop ?
          "loop" : tokType === _switch ? "switch" : null;
        labels.push({name: maybeName, kind: kind});
        node.body = parseStatement();
        labels.pop();
        node.label = expr;
        return finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        semicolon();
        return finishNode(node, "ExpressionStatement");
      }
    }
  }

  // Used for constructs like `switch` and `if` that insist on
  // parentheses around their expression.

  function parseParenExpression() {
    expect(_parenL);
    var val = parseExpression();
    expect(_parenR);
    return val;
  }

  // Parse a semicolon-enclosed block of statements, handling `"use
  // strict"` declarations when `allowStrict` is true (used for
  // function bodies).

  function parseBlock(allowStrict) {
    var node = startNode(), first = true, strict = false, oldStrict;
    node.body = [];
    expect(_braceL);
    while (!eat(_braceR)) {
      var stmt = parseStatement();
      node.body.push(stmt);
      if (first && isUseStrict(stmt)) {
        oldStrict = strict;
        setStrict(strict = true);
      }
      first = false
    }
    if (strict && !oldStrict) setStrict(false);
    return finishNode(node, "BlockStatement");
  }

  // Parse a regular `for` loop. The disambiguation code in
  // `parseStatement` will already have parsed the init statement or
  // expression.

  function parseFor(node, init) {
    node.init = init;
    expect(_semi);
    node.test = tokType === _semi ? null : parseExpression();
    expect(_semi);
    node.update = tokType === _parenR ? null : parseExpression();
    expect(_parenR);
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForStatement");
  }

  // Parse a `for`/`in` loop.

  function parseForIn(node, init) {
    node.left = init;
    node.right = parseExpression();
    expect(_parenR);
    node.body = parseStatement();
    labels.pop();
    return finishNode(node, "ForInStatement");
  }

  // Parse a list of variable declarations.

  function parseVar(node, noIn) {
    node.declarations = [];
    node.kind = "var";
    for (;;) {
      var decl = startNode();
      decl.id = parseIdent();
      if (strict && isStrictBadIdWord(decl.id.name))
        raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
      decl.init = eat(_eq) ? parseExpression(true, noIn) : null;
      node.declarations.push(finishNode(decl, "VariableDeclarator"));
      if (!eat(_comma)) break;
    }
    return finishNode(node, "VariableDeclaration");
  }

  // ### Expression parsing

  // These nest, from the most general expression type at the top to
  // 'atomic', nondivisible expression types at the bottom. Most of
  // the functions will simply let the function(s) below them parse,
  // and, *if* the syntactic construct they handle is present, wrap
  // the AST node that the inner parser gave them in another node.

  // Parse a full expression. The arguments are used to forbid comma
  // sequences (in argument lists, array literals, or object literals)
  // or the `in` operator (in for loops initalization expressions).

  function parseExpression(noComma, noIn) {
    var expr = parseMaybeAssign(noIn);
    if (!noComma && tokType === _comma) {
      var node = startNodeFrom(expr);
      node.expressions = [expr];
      while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn));
      return finishNode(node, "SequenceExpression");
    }
    return expr;
  }

  // Parse an assignment expression. This includes applications of
  // operators like `+=`.

  function parseMaybeAssign(noIn) {
    var left = parseMaybeConditional(noIn);
    if (tokType.isAssign) {
      var node = startNodeFrom(left);
      node.operator = tokVal;
      node.left = left;
      next();
      node.right = parseMaybeAssign(noIn);
      checkLVal(left);
      return finishNode(node, "AssignmentExpression");
    }
    return left;
  }

  // Parse a ternary conditional (`?:`) operator.

  function parseMaybeConditional(noIn) {
    var expr = parseExprOps(noIn);
    if (eat(_question)) {
      var node = startNodeFrom(expr);
      node.test = expr;
      node.consequent = parseExpression(true);
      expect(_colon);
      node.alternate = parseExpression(true, noIn);
      return finishNode(node, "ConditionalExpression");
    }
    return expr;
  }

  // Start the precedence parser.

  function parseExprOps(noIn) {
    return parseExprOp(parseMaybeUnary(noIn), -1, noIn);
  }

  // Parse binary operators with the operator precedence parsing
  // algorithm. `left` is the left-hand side of the operator.
  // `minPrec` provides context that allows the function to stop and
  // defer further parser to one of its callers when it encounters an
  // operator that has a lower precedence than the set it is parsing.

  function parseExprOp(left, minPrec, noIn) {
    var prec = tokType.binop;
    if (prec != null && (!noIn || tokType !== _in)) {
      if (prec > minPrec) {
        var node = startNodeFrom(left);
        node.left = left;
        node.operator = tokVal;
        next();
        node.right = parseExprOp(parseMaybeUnary(noIn), prec, noIn);
        var node = finishNode(node, /&&|\|\|/.test(node.operator) ?
                              "LogicalExpression" : "BinaryExpression");
        return parseExprOp(node, minPrec, noIn);
      }
    }
    return left;
  }

  // Parse unary operators, both prefix and postfix.

  function parseMaybeUnary(noIn) {
    if (tokType.prefix) {
      var node = startNode(), update = tokType.isUpdate;
      node.operator = tokVal;
      node.prefix = true;
      next();
      node.argument = parseMaybeUnary(noIn);
      if (update) checkLVal(node.argument);
      else if (strict && node.operator === "delete" &&
               node.argument.type === "Identifier")
        raise(node.start, "Deleting local variable in strict mode");
      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    }
    var expr = parseExprSubscripts();
    while (tokType.postfix && !canInsertSemicolon()) {
      var node = startNodeFrom(expr);
      node.operator = tokVal;
      node.prefix = false;
      node.argument = expr;
      checkLVal(expr);
      next();
      expr = finishNode(node, "UpdateExpression");
    }
    return expr;
  }

  // Parse call, dot, and `[]`-subscript expressions.

  function parseExprSubscripts() {
    return parseSubscripts(parseExprAtom());
  }

  function parseSubscripts(base, noCalls) {
    if (eat(_dot)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseIdent(true);
      node.computed = false;
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (eat(_hash)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.computed = parseIdentNumOrParenExpr(node);
      return parseSubscripts(finishNode(node, "PluckExpression"), noCalls);
    } else if (eat(_bracketL)) {
      var node = startNodeFrom(base);
      node.object = base;
      node.property = parseExpression();
      node.computed = true;
      expect(_bracketR);
      return parseSubscripts(finishNode(node, "MemberExpression"), noCalls);
    } else if (!noCalls && eat(_parenL)) {
      var node = startNodeFrom(base);
      node.callee = base;
      node.arguments = parseExprList(_parenR);
      return parseSubscripts(finishNode(node, "CallExpression"), noCalls);
    } else return base;
  }

  // Parse a number or an identifier (used for pluck expressions).

  function parseIdentNumOrParenExpr(n) {
    switch (tokType) {
    case _name:
      n.property = parseIdent();
      return false;
    case _num: case _string: case _regexp:
      var node = startNode();
      node.value = tokVal;
      node.raw = input.slice(tokStart, tokEnd);
      next();
      n.property = finishNode(node, "Literal");
      return true;
    case _parenL:
      n.property = parseParenExpression();
      return true;
    default:
      unexpected();
    }
  }

  // Parse an atomic expression — either a single token that is an
  // expression, an expression started by a keyword like `function` or
  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
  // or `{}`.

  function parseExprAtom() {
    switch (tokType) {
    case _this:
      var node = startNode();
      next();
      return finishNode(node, "ThisExpression");
    case _name:
      return parseIdent();
    case _num: case _string: case _regexp:
      var node = startNode();
      node.value = tokVal;
      node.raw = input.slice(tokStart, tokEnd);
      next();
      return finishNode(node, "Literal");

    case _null: case _true: case _false:
      var node = startNode();
      node.value = tokType.atomValue;
      node.raw = tokType.keyword
      next();
      return finishNode(node, "Literal");

    case _parenL:
      var tokStart1 = tokStart;
      next();
      var val = parseExpression();
      val.start = tokStart1;
      val.end = tokEnd;
      expect(_parenR);
      return val;

    case _bracketL:
      var node = startNode();
      next();
      node.elements = parseExprList(_bracketR, true);
      return finishNode(node, "ArrayExpression");

    case _braceL:
      return parseObj();

    case _function:
      var node = startNode();
      next();
      return parseFunction(node, false);

    case _palette:
      var node = startNode();
      next();
      return parsePalette(node);

    case _interpolator:
      var node = startNode();
      next();
      return parseInterpolator(node);

    case _new:
      return parseNew();

    default:
      unexpected();
    }
  }

  // New's precedence is slightly tricky. It must allow its argument
  // to be a `[]` or dot subscript expression, but not a call — at
  // least, not without wrapping it in parentheses. Thus, it uses the

  function parseNew() {
    var node = startNode();
    next();
    node.callee = parseSubscripts(parseExprAtom(), true);
    if (eat(_parenL)) node.arguments = parseExprList(_parenR);
    else node.arguments = [];
    return finishNode(node, "NewExpression");
  }

  // Parse an object literal.

  function parseObj() {
    var node = startNode(), first = true, sawGetSet = false;
    node.properties = [];
    next();
    while (!eat(_braceR)) {
      if (!first) {
        expect(_comma);
      } else first = false;

      var prop = {key: parsePropertyName()}, isGetSet = false, kind;
      if (eat(_colon)) {
        prop.value = parseExpression(true);
        kind = prop.kind = "init";
      } else if (prop.key.type === "Identifier" &&
                 (prop.key.name === "get" || prop.key.name === "set")) {
        isGetSet = sawGetSet = true;
        kind = prop.kind = prop.key.name;
        prop.key = parsePropertyName();
        if (tokType !== _parenL) unexpected();
        prop.value = parseFunction(startNode(), false);
      } else unexpected();

      // getters and setters are not allowed to clash — either with
      // each other or with an init property — and in strict mode,
      // init properties are also not allowed to be repeated.

      if (prop.key.type === "Identifier" && (strict || sawGetSet)) {
        for (var i = 0; i < node.properties.length; ++i) {
          var other = node.properties[i];
          if (other.key.name === prop.key.name) {
            var conflict = kind == other.kind ||
              isGetSet && other.kind === "init" ||
              kind === "init" && (other.kind === "get" || other.kind === "set");
            if (conflict && !strict && kind === "init" &&
                other.kind === "init") conflict = false;
            if (conflict) raise(prop.key.start, "Redefinition of property");
          }
        }
      }
      node.properties.push(prop);
    }
    return finishNode(node, "ObjectExpression");
  }

  function parsePropertyName() {
    if (tokType === _num || tokType === _string) return parseExprAtom();
    return parseIdent(true);
  }

  // Parse a function declaration or literal (depending on the
  // `isStatement` parameter).

  function parseFunction(node, isStatement) {
    if (tokType === _name) node.id = parseIdent();
    else if (isStatement) unexpected();
    else node.id = null;
    node.params = [];
    var first = true;
    expect(_parenL);
    while (!eat(_parenR)) {
      if (!first) expect(_comma); else first = false;
      node.params.push(parseIdent());
    }

    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldInFunc = inFunction, oldLabels = labels;
    inFunction = true; labels = [];
    node.body = parseBlock(true);
    inFunction = oldInFunc; labels = oldLabels;

    // If this is a strict mode function, verify that argument names
    // are not repeated, and it does not try to bind the words `eval`
    // or `arguments`.
    if (strict || node.body.body.length && isUseStrict(node.body.body[0])) {
      for (var i = node.id ? -1 : 0; i < node.params.length; ++i) {
        var id = i < 0 ? node.id : node.params[i];
        if (isStrictReservedWord(id.name) || isStrictBadIdWord(id.name))
          raise(id.start, "Defining '" + id.name + "' in strict mode");
        if (i >= 0) for (var j = 0; j < i; ++j)
          if (id.name === node.params[j].name)
            raise(id.start, "Argument name clash in strict mode");
      }
    }

    return finishNode(node, isStatement ?
                      "FunctionDeclaration" : "FunctionExpression");
  }

  function parsePalette(node) {
    // Possible formats are:
    //
    //  @P{colour:colour}                                     G
    //  @P{colour;colour;colour...}                           C
    //  @P{type interp banded value colour; value colour...}  D/A/N
    //
    // The "type" value is mandatory and can be one of "norm", "abs"
    // or "discrete" or abbreviations of them (i.e. "n" or "N", "a" or
    // "A" and "d" or "D"); "interp" and "banded" are both optional --
    // valid values for "interp" are "RGB", "HSL", "HCL" or "Lab";
    // "banded" is just a present/absent flag.
    //
    // The "value" items are numbers, and "colour" items are either
    // names or of the form #XXX or #XXXXXX, where X is a hex digit.

    var type, tmp;
    expect(_braceL);
    if (tokType == _name) {
      tmp = parseIdent().name.toLowerCase();
      if ("discrete".substr(0, tmp.length) == tmp)        type = 'discrete';
      else if ("absolute".substr(0, tmp.length) == tmp)   type = 'absolute';
      else if ("normalised".substr(0, tmp.length) == tmp) type = 'normalised';
      else if (eat(_semi))                                type = 'colours';
      else if (eat(_colon))                               type = 'gradient';
      else raise("Invalid palette specification");
    } else if (tokType == _hash) {
      readToken(false, true);  tmp = '#' + tokVal;  next();
      if (eat(_semi))                                     type = 'colours';
      else if (eat(_colon))                               type = 'gradient';
      else raise("Invalid palette specification");
    } else type = 'normalised';

    var paldef = { type:type };
    switch (type) {
    case 'gradient': {
      var col1 = tmp, col2;
      if (tokType == _name)
        col2 = parseIdent().name.toLowerCase();
      else if (tokType == _hash) {
        readToken(false, true);  col2 = '#' + tokVal;  next();
      } else raise("Invalid palette specification");
      expect(_braceR);
      paldef = { type:"normalised", values:[0,1], colours:[col1,col2] };
      break;
    }
    case 'colours': {
      var cols = [tmp], first = false;
      while (!eat(_braceR)) {
        if (!first) expect(_semi); else first = false;
        if (tokType == _name)
          cols.push(parseIdent().name.toLowerCase());
        else if (tokType == _hash) {
          readToken(false, true);  cols.push('#' + tokVal);  next();
        } else raise("Invalid palette specification");
      }
      paldef = { type:"discrete", values:null, colours:cols };
      break;
    }
    case 'absolute':
    case 'normalised':
      // Deal with optional tags.
      if (tokType == _name &&
          (tokVal == 'banded' || tokVal == 'rgb' || tokVal == 'hsl' ||
           tokVal == 'hcl' || tokVal == 'lab')) {
        if (tokVal == 'banded') { paldef.banded = true; next(); }
        else {
          paldef.interp = tmp;  next();
          if (tokType == _name && tokVal == 'banded') {
            paldef.banded = true; next();
          }
        }
      }
      // DELIBERATE FALL-THROUGH TO NEXT CASE!
    case 'discrete':
      // We are now lined up at the beginning of the (value, colour)
      // pairs.
      var first, vals, cols;
      first = true; vals = []; cols = [];
      while (!eat(_braceR)) {
        if (!first) eat(_semi); else first = false;
        if (tokType == _name) vals.push(parseIdent().name);
        else if (tokType == _plusmin) {
          var sign = tokVal == '-' ? (-1) : 1;
          next();
          if (tokType != _num) raise("Invalid palette specification");
          vals.push(sign * tokVal);  next();
        } else if (tokType == _num) { vals.push(tokVal);  next(); }
        else raise("Invalid palette specification");
        if (tokType == _name) cols.push(parseIdent().name.toLowerCase());
        else if (tokType == _hash) {
          readToken(false, true);  cols.push('#' + tokVal);  next();
        }
        else raise("Invalid palette specification");
      }
      paldef.values = vals;
      paldef.colours = cols;
    }

    var node = startNode();
    node.palette = paldef;
    return finishNode(node, "PaletteExpression");
  };


  // Parses a comma-separated list of expressions, and returns them as
  // an array. `close` is the token type that ends the list, and
  // `allowEmpty` can be turned on to allow subsequent commas with
  // nothing in between them to be parsed as `null` (which is needed
  // for array literals).

  function parseExprList(close, allowEmpty) {
    var elts = [], first = true;
    while (!eat(close)) {
      if (!first) {
        expect(_comma);
      } else first = false;

      if (allowEmpty && tokType === _comma) elts.push(null);
      else elts.push(parseExpression(true));
    }
    return elts;
  }

  // Parse the next token as an identifier. If `liberal` is true (used
  // when parsing properties), it will also convert keywords into
  // identifiers.

  function parseIdent(liberal) {
    var node = startNode();
    node.name = tokType === _name ?
      tokVal : (liberal && tokType.keyword) || unexpected();
    next();
    return finishNode(node, "Identifier");
  }

  return mainfn;
});
// Helper service to allow overriding of default use of $http for
// accessing plot data defined via a SRC attribute.  This can be
// useful to implement client-side caching of plot data, for example.

radian.factory('plotDataHttp', ['$http', function($http)
{
  var p = { provider: $http };
  function set(prov) { p.provider = prov; };
  p.set = set;
  return p;
}]);


// Bring plot data into Angular scope by parsing <plot-data> directive
// body.

radian.directive('plotData',
 ['$http', 'processAttrs', 'plotDataHttp',
  function($http, processAttrs, plotDataHttp)
{
  'use strict';

  // Recursively transform any string values that can be parsed as
  // numbers into numeric values.
  function numberTypes(d) {
    if (typeof d == 'object') {
      var n;
      Object.keys(d).forEach(function(k) {
        switch (typeof d[k]) {
        case 'object':
          if (d[k]) numberTypes(d[k]);
          break;
        case 'string':
          n = Number(d[k]);
          if (!isNaN(n)) d[k] = n;
          break;
        }
      });
    }
  };

  // Parse JSON or CSV data.
  function parseData(datatext, format, cols, separator) {
    var d;
    var fpre = /^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/;
    switch (format) {
    case 'json':
      try {
        d = typeof datatext == 'string' ? JSON.parse(datatext) : datatext;
        numberTypes(d);
      }
      catch (e) { throw Error('invalid JSON data in <plot-data>'); }
      break;
    case 'csv':
      try {
        d = $.csv.toArrays(datatext.replace(/^\s*\n/g, '').split('\n')
                           .map(function(s) {
                             return s.replace(/^\s+/, '');
                           }).join('\n'),
                           { separator: separator });
        if (d.length > 0) {
          if (cols) {
            if (d[0].length != cols.length)
              throw Error('mismatch between COLS and' +
                          ' CSV data in <plot-data>');
          } else {
            cols = d[0];
            d.splice(0, 1);
          }
          var tmp = { }, nums = [];
          for (var c = 0; c < cols.length; ++c) {
            tmp[cols[c]] = [];
            nums.push(d[0][c].match(fpre));
          }
          for (var i = 0; i < d.length; ++i)
            for (var c = 0; c < cols.length; ++c) {
              if (nums[c])
                tmp[cols[c]].push(parseFloat(d[i][c]));
              else
                tmp[cols[c]].push(d[i][c]);
            }
          d = tmp;
        }
      } catch (e) { throw Error('invalid CSV data in <plot-data>'); }
    }
    return d;
  };

  // Date field processing.
  function dateProcess(d, k, f) {
    function go(x, active) {
      if (x instanceof Array && x.length > 0) {
        if (typeof x[0] == 'string' && active)
          x.forEach(function(v, i) { x[i] = f(v); });
        else
          x.forEach(function(v) { go(v, false); });
      } else if (typeof x == 'object') {
        if (x.hasOwnProperty(k) && !(x[k] instanceof Array))
          x[k] = f(x[k]);
        else
          Object.keys(x).forEach(function(xk) { go(x[xk], xk == k); });
      }
    }
    go(d, false);
  };

  // Process all date fields.
  function processDates(scope, dataset, d) {
    if (scope[dataset] && scope[dataset].metadata) {
      for (var k in scope[dataset].metadata) {
        var md = scope[dataset].metadata[k];
        if (md.format == 'date') {
          if (!md.dateParseFormat)
            dateProcess(d, k, function(v) { return new Date(v); });
          else {
            var parse;
            if (md.dateParseFormat == 'isodate')
              parse = d3.time.format.iso.parse;
            else
              parse = d3.time.format(md.dateParseFormat).parse;
            dateProcess(d, k, function(v) { return parse(v); });
          }
        }
      }
    }
  };


  // We use a post-link function here so that any enclosed <metadata>
  // directives will have been linked by the time we get here.
  function postLink(sc, elm, as) {
    // The <plot-data> element is only there to carry data, so hide
    // it right away.
    elm.hide();

    // Process attributes.
    processAttrs(sc, as);
    if (!as.hasOwnProperty('name'))
      throw Error('<plot-data> must have NAME attribute');
    var dataset = sc.name;
    var subname = as.hasOwnProperty('subname') ? sc.subname : undefined;
    var format = as.hasOwnProperty('format') ? sc.format : 'json';
    var sep = as.hasOwnProperty('separator') ?
      (sc.separator === '' ? ' ' : (sc.separator || ',')) : ',';
    var cols = as.hasOwnProperty('cols') ? sc.cols : undefined;
    if (cols) cols = cols.split(',').map(function (s) { return s.trim(); });
    if (!as.hasOwnProperty('src')) {
      var formats = ['json', 'csv'];
      if (formats.indexOf(format) == -1)
        throw Error('invalid FORMAT "' + format + '" in <plot-data>');
    }

    // Get plot data via a HTTP request.
    function getData() {
      sc.firstDataLoad = true;
      plotDataHttp.provider.get(sc.src)
        .success(function(data, status, headers, config) {
          if (headers("Content-Type").indexOf('application/json') == 0)
            format = 'json';
          processData(data);
        })
        .error(function() {
          throw Error("failed to read data from " + sc.src);
        });
    };

    // Process content -- all text children are appended together
    // for parsing.
    function processData(datatext) {
      // Parse data.
      var d = parseData(datatext, format, cols, sep);

      // Process any date fields.
      processDates(sc, dataset, d);

      // Install data on nearest enclosing scope that isn't associated
      // with an ng-repeat.  Preserve any metadata.
      var md = sc[dataset] ? sc[dataset].metadata : null;
      var s = sc.$parent;
      while (s.$parent && s.hasOwnProperty('$index')) s = s.$parent;
      if (sc.subname) {
        s[dataset][subname] = d;
        if (md) s[dataset][subname].metadata = md;
      } else {
        s[dataset] = d;
        if (md) s[dataset].metadata = md;
      }
    };
    if (as.hasOwnProperty('src') && sc.src)
      getData();
    else {
      var datatext = '';
      if (as.hasOwnProperty('ngModel')) {
        datatext = sc.$eval(as.ngModel);
        sc.$watch(as.ngModel, function(n, o) {
          if (n == undefined || n == o) return;
          datatext = sc.$eval(as.ngModel);
          processData(datatext);
        }, true);
      }
      if (datatext == '') {
        elm.contents().each(function(i,n) {
          if (n instanceof Text) datatext += n.textContent;
        });
      }
          processData(datatext);
    }
    sc.$watch('src', function(n, o) {
      if (n == undefined || n == o && sc.firstDataLoad) return;
      getData();
    });
  };

  return {
    restrict: 'E',
    scope: true,
    compile: function(elm, as, trans) {
      return { post: postLink };
    }
  };
}]);


radian.directive('metadata', [function()
{
  'use strict';

  return {
    restrict: 'E',
    scope: false,
    link: function(scope, elm, as) {
      // Identify the data set that we're metadata for.
      if (!elm[0].parentNode || elm[0].parentNode.tagName != 'PLOT-DATA' ||
          !$(elm[0].parentNode).attr('name'))
        throw Error('<metadata> not properly nested inside <plot-data>');
      var dataset = $(elm[0].parentNode).attr('name');

      // Copy metadata attributes into a new object.
      if (!as.name) throw Error('<metadata> without NAME attribute');
      var name = as.name;
      var md = { };
      [ 'dateFormat', 'dateParseFormat', 'errorFor',
        'format', 'label', 'units', 'categoryOrder' ].forEach(function(a) {
          if (as.hasOwnProperty(a)) md[a] = as[a];
        });

      // Set up metadata for this data set.
      if (!scope[dataset]) scope[dataset] = { metadata: { } };
      if (!scope[dataset].metadata)
        scope[dataset].metadata = { };
      scope[dataset].metadata[name] = md;
    }
  };
}]);
// Deal with plot layout and processing for <plot-row>, <plot-col>,
// <plot-grid> and <plot-layout> directives.


// How much relative space a plot takes up in the current layout
// direction is specified as a number or nothing (if the plot will be
// sized according to the average size of plots in the box).
//
// A layout is made up of plots arranged in horizontal boxes and
// vertical boxes.  A single <plot> directive manages its own layout
// (which is trivial).
//
// Within the data structures for managing layouts, individual plots
// are represented by their associated Angular scopes.
//
// If we have some plots, A, B, C, D, which we'll represent by
// $scopeA, $scopeB, etc., then here's how we represent some example
// layouts:
//
//  +---+ +---+
//  | A | | B |    ["hbox", [$scopeA, $scopeB]]
//  +---+ +---+
//
//  +---+
//  | A |          ["vbox", [$scopeA, $scopeB]]
//  +---+
//  +---+
//  | B |
//  +---+
//
//  +---+ +---+
//  | A | | B |    ["vbox", ["hbox", [$scopeA, $scopeB]],
//  +---+ +---+             ["hbox", [$scopeC, $scopeD]]]
//  +---+ +---+
//  | C | | D |
//  +---+ +---+
//
//  +---+ +---+
//  | A | |   |    ["hbox", ["vbox", [$scopeA, $scopeB, $scopeC]],
//  +---+ |   |             $scopeD]
//  +---+ |   |
//  | B | | D |
//  +---+ |   |
//  +---+ |   |
//  | C | |   |
//  +---+ +---+
//
//  +-------+ +----+
//  |       | |    |    ["hbox", [[3, $scopeA], [2, $scopeB]]]
//  |   A   | |  B |
//  |       | |    |
//  +-------+ +----+
//
//  +--------------+    (Here, B is supposed to be a box two rows high.)
//  |      A       |
//  |              |    ["vbox", [[2, $scopeA], [1, $scopeB], [3, $scopeC]]]
//  +--------------+
//  +------B-------+
//  +--------------+
//  +--------------+
//  |              |
//  |              |
//  |      C       |
//  |              |
//  |              |
//  +--------------+
//
// In Haskell, a layout is defined as
//
//   data Layout a = HBox [(a, Layout a)]
//                 | VBox [(a, Layout a)]
//                 | Frame String
//                 deriving (Eq, Show)
//
// where a is a type parameterising the size specifications for the
// individual plots.  As specified by the user, a ~ Maybe (Ratio Int),
// and using Nothing means that a plot should just take up the
// "average" space.  For rendering, the Layout (Maybe (Ratio Int))
// type is transformed into a Layout Int which specifies the actual
// dimensions of the plots.  This transformation is the job of the
// layoutSizes function.


radian.factory('layoutSizes', ['layoutToString', function(layoutToString) {
  'use strict';

  // Determine sizes of frames in a layout.
  return function(w, h, spc, layout)
  {
    // Fit a range of space parameters into a given size and spacing.
    function fitSizes(w, ws)
    {
      var realw = w - spc * (ws.length - 1);
      var vs = ws.filter(function(x) { return x != null; });
      function sum(a) { return a.reduce(function(a,b) { return a+b; }, 0); };
      var mean = vs.length == 0 ? 1 : sum(vs) / vs.length;
      var realvals = ws.map(function(x) { return x == null ? mean : x; });
      var realtot = sum(realvals);
      var widths = realvals.map(function(x) {
        return Math.floor(x * realw / realtot);
      });
      var wdiff = realw - sum(widths);
      if (wdiff != 0) {
        var outspc = Math.floor(ws.length / wdiff);
        for (var i = 0; i < ws.length; ++i)
          if (i % (outspc + 1) == 0) ++widths[i];
      }
      return widths;
    };

    function help(w, h, layout)
    {
      if (layout.type == 'plot' || layout.type == 'empty') return layout;
      function getratios(ls) {
        return ls.map(function(l) { return l.size || null; });
      };
      var sizes =
        fitSizes(layout.type == 'hbox' ? w : h, getratios(layout.items));
      var outitems = [];
      for (var i = 0; i < layout.items.length; ++i) {
        if (layout.type == 'hbox')
          outitems[i] = { size: sizes[i],
                          item: help(sizes[i], h, layout.items[i].item) };
        else
          outitems[i] = { size: sizes[i],
                          item: help(w, sizes[i], layout.items[i].item) };
      }
      return { type: layout.type, items: outitems };
    };

    var sub = help(w, h, layout);
    if (layout.type == 'hbox')
      return { type: 'vbox', items: [{ size: h, item: sub }] };
    else if (layout.type == 'vbox')
      return { type: 'hbox', items: [{ size: w, item: sub }] };
    else
      return { type:'hbox',
               items: [{ size: w, item: { type: 'vbox', items: sub }}]};
  };
}]);

radian.factory('addToLayout', function()
{
  return function(sc, sublayout, size, elm) {
    if (sublayout.hasOwnProperty('$id'))
      sc.layoutItems.push({ size: size != null ? Number(size) : null,
                            item: { type: 'plot', items: sublayout }});
    else
      sc.layoutItems.push({ size: size != null ? Number(size) : null,
                            item: sublayout });
  };
});

radian.factory('extractFrames',
 ['layoutToString',
  function(layoutToString)
{
  // A "frame" is an object of the form { x, y, w, h, plot }, where
  // plot points to the plot scope.
  return function(spc, w, h, layout) {
    function go(curx, cury, curw, curh, lay) {
      var frames = [];
      if (lay.type == 'hbox') {
        for (var i = 0; i < lay.items.length; ++i) {
          var item = lay.items[i].item;
          var itype = lay.items[i].item.type;
          var isize = lay.items[i].size;
          if (item.type == 'plot') {
            frames.push({ x: curx, y: cury, w: isize, h: curh,
                          plot: item.items });
          } else if (item.type == 'vbox') {
            frames = frames.concat(go(curx, cury, isize, curh, item));
          }
          curx += isize + spc;
        }
      } else if (lay.type == 'vbox') {
        for (var i = 0; i < lay.items.length; ++i) {
          var item = lay.items[i].item;
          var itype = lay.items[i].item.type;
          var isize = lay.items[i].size;
          if (item.type == 'plot') {
            frames.push({ x: curx, y: cury, w: curw, h: isize,
                          plot: item.items });
          } else if (item.type == 'hbox') {
            frames = frames.concat(go(curx, cury, curw, isize, item));
          }
          cury += isize + spc;
        }
      } else throw Error("invalid layout passed to extractFrames");
      return frames;
    };
    return go(0, 0, w, h, layout);
  };
}]);

radian.factory('layoutDirective',
 ['layoutSizes', 'processAttrs', 'calcPlotDimensions',
  'addToLayout', 'extractFrames', 'layoutToString',
  function(layoutSizes, processAttrs, calcPlotDimensions,
           addToLayout, extractFrames, layoutToString)
{
  'use strict';

  return function(container) {
    function preLink(sc, elm, as, transclude) {
      processAttrs(sc, as);
      if (!sc.inLayout) {
        sc.layoutTop = true;
        sc.inLayout = true;
        if (!sc.inStack) calcPlotDimensions(sc, elm, as);
        $(elm).css('width', sc.pxwidth).css('height', sc.pxheight);
        sc.layoutsvg = elm.children()[0];
      }
      sc.layoutItems = [];
      transclude(sc.$new(), function (cl) { elm.append(cl); });
    };

    function postLink(sc, elm) {
      if (sc.inLayout && !sc.hasOwnProperty('layoutTop'))
        $(elm.children()[0]).remove();
      var items = { type: container, items: sc.layoutItems };
      if (sc.hasOwnProperty('layoutTop')) {
        var spacing = sc.spacing || 0;
        var layedout = layoutSizes(sc.pxwidth, sc.pxheight, spacing, items);
        var frames = extractFrames(0, sc.pxwidth, sc.pxheight, layedout);
        if (sc.hasOwnProperty('title')) items.title = sc.title;
        frames.forEach(function(fr) {
          fr.plot.pxwidth = fr.w;
          fr.plot.pxheight = fr.h;
          $(fr.plot.topelem).css('width', fr.w).css('height', fr.h).
            css('top', fr.y).css('left', fr.x);
          fr.plot.svg = d3.select(sc.layoutsvg).append('g')
            .attr('width', fr.w).attr('height', fr.h)
            .attr('transform', 'translate(' + fr.x + ',' + fr.y + ')')[0][0];
        });
      }
      if (!sc.hasOwnProperty('layoutTop') || sc.inStack)
        addToLayout(sc.$parent, items, sc.layoutShare, elm);
    };

    return {
      restrict: 'E',
      template: '<div class="radian" style="top: 0px; left: 0px">' +
                  '<svg></svg>' +
                '</div>',
      replace: true,
      transclude: true,
      scope: true,
      compile: function(elm, as, trans) {
        return { pre: function(s, e, a) { preLink(s, e, a, trans); },
                 post: postLink };
      }
    };
  };
}]);

radian.directive('plotRow', ['layoutDirective', function(layoutDirective)
{
  return layoutDirective('hbox');
}]);

radian.directive('plotCol', ['layoutDirective', function(layoutDirective)
{
  return layoutDirective('vbox');
}]);

radian.directive('plotGrid',
 ['layoutSizes', 'processAttrs', 'calcPlotDimensions',
  'addToLayout', 'extractFrames', 'layoutToString',
  function(layoutSizes, processAttrs, calcPlotDimensions,
           addToLayout, extractFrames, layoutToString)
{
  'use strict';

  function preLink(sc, elm, as, transclude) {
    processAttrs(sc, as);
    if (!sc.inLayout) {
      sc.layoutTop = true;
      sc.inLayout = true;
      if (!sc.inStack) calcPlotDimensions(sc, elm, as);
      $(elm).css('width', sc.pxwidth).css('height', sc.pxheight);
      sc.layoutsvg = elm.children()[0];
    }
    sc.layoutItems = [];
    transclude(sc.$new(), function (cl) { elm.append(cl); });
  };

  function postLink(sc, elm) {
    if (sc.inLayout && !sc.hasOwnProperty('layoutTop'))
      $(elm.children()[0]).remove();
    var nrows = sc.rows || Math.floor(Math.sqrt(sc.layoutItems.length));
    var ncols = sc.cols || Math.ceil(sc.layoutItems.length / nrows);
    var rows = [];
    var i = 0;
    for (var r = 0; r < nrows; ++r) {
      var cols = [];
      for (var c = 0; c < ncols; ++c) {
        if (i >= sc.layoutItems.length)
          cols.push({ size: null, item: { type: 'empty' } });
        else
          cols.push(sc.layoutItems[i++]);
      }
      rows.push({ size: null, item: { type: 'hbox', items: cols } });
    }
    var items = { type: 'vbox', items: rows };
    if (sc.hasOwnProperty('layoutTop')) {
      var spacing = sc.spacing || 0;
      var layedout = layoutSizes(sc.pxwidth, sc.pxheight, spacing, items);
      var frames = extractFrames(0, sc.pxwidth, sc.pxheight, layedout);
      if (sc.hasOwnProperty('title')) items.title = sc.title;
      frames.forEach(function(fr) {
        fr.plot.pxwidth = fr.w;
        fr.plot.pxheight = fr.h;
        $(fr.plot.topelem).css('width', fr.w).css('height', fr.h).
          css('top', fr.y).css('left', fr.x);
        fr.plot.svg = d3.select(sc.layoutsvg).append('g')
          .attr('width', fr.w).attr('height', fr.h)
          .attr('transform', 'translate(' + fr.x + ',' + fr.y + ')')[0][0];
      });
    }
    if (!sc.hasOwnProperty('layoutTop') || sc.inStack)
      addToLayout(sc.$parent, items, sc.layoutShare, elm);
  };

  return {
    restrict: 'E',
    template: '<div class="radian" style="top: 0px; left: 0px">' +
                '<svg></svg>' +
              '</div>',
    replace: true,
    transclude: true,
    scope: true,
    compile: function(elm, as, trans) {
      return { pre: function(s, e, a) { preLink(s, e, a, trans); },
               post: postLink };
    }
  };
}]);


radian.directive('plotStack',
 ['$rootScope', 'layoutSizes', 'processAttrs', 'calcPlotDimensions',
  'addToLayout', 'extractFrames', 'layoutToString',
  function($rootScope, layoutSizes, processAttrs, calcPlotDimensions,
           addToLayout, extractFrames, layoutToString)
{
  'use strict';

  function preLink(sc, elm, as, transclude) {
    processAttrs(sc, as);
    if (sc.inLayout)
      throw Error("<plot-stack> cannot appear inside other layout directives");
    if (!sc.inStack) calcPlotDimensions(sc, elm, as);
    if (sc.inStack) addToLayout(sc.$parent, { type: 'stack', items: sc },
                                null, elm);
    sc.inStack = true;
    sc.layoutItems = [];
    if (!$rootScope.radianNavIDs) $rootScope.radianNavIDs = { };
    transclude(sc.$new(), function (cl) {
      elm.append('<div class="tab-content radian-tabs"></div>');
      var tabs = elm.children(0);
      tabs.append(cl);
      sc.ids = [];
      cl.filter('div.radian,div.radian-stack').each(function(i) {
        var idx = 0, tabid;
        do {
          ++idx;
          tabid = 'tab' + idx + '_' + i;
        } while ($rootScope.radianNavIDs[tabid]);
        sc.ids.push(tabid);
        $rootScope.radianNavIDs[tabid] = 1;
        var cls = i == 0 ? 'tab-pane active' : 'tab-pane';
        $(this).wrap('<div class="' + cls + '" id="' + tabid + '"></div>');
      });
    });
  };

  function postLink(sc, elm) {
    var is = sc.layoutItems;
    elm.prepend('<ul class="nav nav-tabs"></ul>');
    var nav = elm.children('ul');
    for (var i = 0; i < is.length; ++i) {
      var it = is[i].item;
      var t = it.title ? it.title :
        (it.items.title ? it.items.title : 'Tab ' + (i+1));
      var link = '<a href="#' + sc.ids[i] + '" data-toggle="tab">' + t + '</a>';
      var active = i == 0 ? ' class="active"' : '';
      nav.append('<li' + active + '>' + link + '</li>');
    }
  };

  return {
    restrict: 'E',
    template: '<div class="radian-stack"></div>',
    replace: true,
    transclude: true,
    scope: true,
    compile: function(elm, as, trans) {
      return { pre: function(s, e, a) { preLink(s, e, a, trans); },
               post: postLink };
    }
  };
}]);




radian.factory('layoutToString', function() {
  'use strict';

  return function(layout) {
    function fixplots(lay) {
      switch (lay.type) {
      case 'empty': return { type: 'empty' };
      case 'plot': return { type: 'plot', items: lay.items.$id };
      default: return { type: lay.type, items: lay.items.map(function(i) {
        return { size: i.size, item: fixplots(i.item) };
      }) };
      }
    };
    return JSON.stringify(fixplots(layout));
  };
});
// Line plots.

radian.directive('lines',
 ['plotTypeLink', function(plotTypeLink)
{
  'use strict';

  function draw(svg, x, xs, y, ys, s) {
    function sty(v) {
      return (v instanceof Array) ? function(d, i) { return v[i]; } : v;
    };
    var width   = s.strokeWidth || 1;
    var opacity = s.strokeOpacity || 1.0;
    var stroke = s.stroke || '#000';
    var ssel = s.$eval('strokesel');
    if (stroke instanceof Array && s.$eval('strokesel') !== undefined)
      stroke = ssel ? stroke[ssel % stroke.length] : stroke[0];

    // Deal with along-stroke interpolation.
    if (stroke instanceof Function) {
      var tmp = new Array(x.length);
      for (var i = 0; i < x.length; ++i) tmp[i] = i / x.length;
      stroke = stroke(tmp);
    }

    // Switch on type of stroke...
    if (!(width instanceof Array || opacity instanceof Array ||
          stroke instanceof Array)) {
      // Normal lines; single path.
      var line = d3.svg.line()
        .x(function (d, i) { return xs(d[0], i); })
        .y(function (d, i) { return ys(d[1], i); });
      svg.append('path').datum(d3.zip(x, y))
        .attr('class', 'line').attr('d', line)
        .style('fill', 'none')
        .style('stroke-width', width)
        .style('stroke-opacity', opacity)
        .style('stroke', stroke);
    } else {
      // Multiple paths to deal with varying characteristics along
      // line.
      var maxsegments = 200;
      var ptsperseg = Math.max(1, Math.floor(x.length / maxsegments));
      var based = d3.zip(x, y), lined = [];
      var widths = [], opacities = [], strokes = [];
      var i0 = 0, i1 = ptsperseg;
      while (i0 < x.length) {
        lined.push(based.slice(i0, i1+1));
        var imid = Math.floor((i0 + i1) / 2);
        widths.push(width instanceof Array ? width[imid] : width);
        opacities.push(opacity instanceof Array ? opacity[imid] : opacity);
        strokes.push(stroke instanceof Array ? stroke[imid] : stroke);
        i0 = i1;
        i1 = i0 + ptsperseg;
      }
      svg.selectAll('path').data(lined).enter().append('path')
        .attr('class', 'line')
        .style('stroke-width', function(d, i) { return widths[i]; })
        .style('stroke-opacity', function(d, i) { return opacities[i]; })
        .style('stroke', function(d, i) { return strokes[i]; })
        .style('fill', 'none')
        .attr('d', d3.svg.line()
              .x(function (d, i) { return xs(d[0], i); })
              .y(function (d, i) { return ys(d[1], i); }));
    }
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      scope.$on('setupExtra', function() {
        var width = scope.strokeWidth instanceof Array &&
                    scope.strokeWidth.length > 0 ?
          scope.strokeWidth.reduce(function(x,y) {
            return Math.max(Number(x), Number(y));
          }) : (Number(scope.strokeWidth) || 1);
        scope.rangeExtendPixels([width/2, width/2], [width/2, width/2]);
      });
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);


// Scatter/bubble plots.

radian.directive('points',
 ['plotTypeLink', function(plotTypeLink)
{
  'use strict';

  function draw(svg, x, xs, y, ys, s) {
    var marker = s.marker || "circle";
    var markerSize = s.markerSize || 1;
    var stroke = s.stroke || '#000';
    var strokeWidth = s.strokeWidth || 1.0;
    var strokeOpacity = s.strokeOpacity || 1.0;
    var fill = s.fill || 'none';
    var fillOpacity = s.fillOpacity || 1.0;
    var orientation = s.orientation || 0.0;

    // Plot points: plot attributes are either single values or arrays
    // of values, one per point.
    function sty(v) {
      return (v instanceof Array) ? function(d, i) { return v[i]; } : v;
    };
    function apSc(sc, d, i) {
      var dtmp = d;
      if (sc.oton) dtmp = sc.oton(d);
      return sc(dtmp, i);
    };
    var points = d3.svg.symbol().type(sty(marker)).size(sty(markerSize));
    svg.selectAll('path').data(d3.zip(x, y))
      .enter().append('path')
      .attr('transform', function(d, i) {
        return 'translate(' + apSc(xs, d[0], i) + ',' + apSc(ys, d[1], i) + ')';
      })
      .attr('d', points)
      .style('fill', sty(fill))
      .style('fill-opacity', sty(fillOpacity))
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke));
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      scope.$on('setupExtra', function() {
        var width = scope.strokeWidth instanceof Array &&
                    scope.strokeWidth.length > 0 ?
          scope.strokeWidth.reduce(function(x,y) {
            return Math.max(Number(x), Number(y));
          }) : (Number(scope.strokeWidth) || 1);
        if (scope.stroke == 'none') width = 0;
        var size = scope.markerSize instanceof Array &&
                   scope.markerSize.length > 0 ?
          scope.markerSize.reduce(function(x,y) {
            return Math.max(Number(x), Number(y));
          }) : (Number(scope.markerSize) || 1);
        var delta = (width + Math.sqrt(size)) / 2;
        scope.rangeExtendPixels([delta, delta], [delta, delta]);
      });
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);


// Bar charts.

radian.directive('bars',
 ['plotTypeLink', 'plotLib', function(plotTypeLink, lib)
{
  'use strict';

  function draw(svg, xin, xs, yin, ys, s, w, h) {
    var x = xin, y = yin;
    var style = s.style || 'simple';
    var aggregation = s.aggregation || 'none';
    var strokeWidth   = s.strokeWidth || 1;
    var strokeOpacity = s.strokeOpacity || 1.0;
    var stroke = s.stroke || '#000';
    var fillOpacity = s.fillOpacity || 1.0;
    var fill = s.fill || 'none';
    var barMin = s.barMin || null;
    var barMax = s.barMax || null;
    var barWidth = s.barWidth || 1.0;
    var pxBarWidth, pxWidth = false, pxSpacing = false;
    if (typeof barWidth == 'string' &&
        barWidth.trim().substr(-2,2) == 'px') {
      pxBarWidth =
        Number(barWidth.trim().substr(0, barWidth.trim().length - 2));
      if (pxBarWidth < 0) pxSpacing = true;
      barWidth = xs.invert(Math.abs(pxBarWidth)) - xs.invert(0);
      pxBarWidth = Math.abs(pxBarWidth);
      pxWidth = true;
    }
    var barOffset = s.barOffset || 0.0;
    var pxOffset = false;
    if (typeof barOffset == 'string' &&
        barOffset.trim().substr(-2,2) == 'px') {
      var pxoffset =
        Number(barOFfset.trim().substr(0, barOffset.trim().length - 2));
      barOffset = xs.invert(pxoffset) - xs.invert(0);
      pxOffset = true;
    }

    // Data aggregation.
    if (aggregation != 'none' || style != 'simple') {
      var aggfn;
      switch (aggregation) {
      case 'mean': aggfn = lib.meanBy; break;
      case 'sum':  aggfn = lib.sumBy;  break;
      case 'max':  aggfn = lib.maxBy;  break;
      case 'min':  aggfn = lib.minBy;  break;
      default: throw Error("Unknown aggregation type: " + aggregation);
      }
      x = lib.unique(xin);
      y = aggfn(yin, xin);
      s.barWidths = lib.firstBy(s.barWidths, xin);
      if (fill instanceof Array)
        fill = lib.firstBy(fill, xin);
      if (fillOpacity instanceof Array)
        fillOpacity = lib.firstBy(fillOpacity, xin);
      if (strokeWidth instanceof Array)
        strokeWidth = lib.firstBy(strokeWidth, xin);
      if (strokeOpacity instanceof Array)
        strokeOpacity = lib.firstBy(strokeOpacity, xin);
      if (stroke instanceof Array)
        stroke = lib.firstBy(stroke, xin);
    }

    // Plot bars: plot attributes are either single values or arrays
    // of values, one per bar.
    function apSc(sc, d, i) {
      var dtmp = d;
      if (sc.oton) dtmp = sc.oton(d);
      return sc(dtmp, i);
    };
    function sty(v) {
      return (v instanceof Array) ? function(d, i) { return v[i]; } : v;
    };
    function bw(i) {
      if (pxWidth) {
        if (pxSpacing)
          return xs.invert(xs(s.barWidths[0]) - pxBarWidth);
        else
          return barWidth;
      } else
        return s.barWidths[i] * barWidth;
    };
    var dat;
    if (barMin && barMax)
      dat = d3.zip(barMin, barMax, y);
    else
      dat = d3.zip(x, y);
    svg.selectAll('rect').data(dat)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d, i) {
        if (d.length == 3)
          return apSc(xs, d[0], i);
        else if (pxWidth && pxSpacing && s.axisXTransform == 'log') {
          var xc = s.x[i];
          var xb = i > 0 ? s.x[i-1] : xc / (s.x[i+1] / xc);
          var xd = i < s.x.length - 1 ? s.x[i+1] : xc * (xc / s.x[i-1]);
          var xhi = xc * Math.sqrt(xd / xc), xlo = xc * Math.sqrt(xb / xc);
          var phi = xs(xhi), plo = xs(xlo);
          return plo + pxBarWidth;
        } else {
          return d[0] instanceof Date ?
            xs(new Date(d[0].valueOf() - bw(i) / 2.0 +
                        (pxOffset ? barOffset :
                         s.barWidths[i] * barOffset)), i) :
          xs(xs.oton(d[0]) - bw(i) / 2.0 +
             (pxOffset ? barOffset : s.barWidths[i] * barOffset), i);
        }
      })
      .attr('y', function(d, i) { return ys(d[d.length-1], i); })
      .attr('width', function(d, i) {
        var ret;
        if (pxWidth) {
          if (pxSpacing) {
            if (s.axisXTransform == 'log') {
              var xc = s.x[i];
              var xb = i > 0 ? s.x[i-1] : xc / (s.x[i+1] / xc);
              var xd = i < s.x.length - 1 ? s.x[i+1] : xc * (xc / s.x[i-1]);
              var xhi = xc * Math.sqrt(xd / xc), xlo = xc * Math.sqrt(xb / xc);
              var phi = xs(xhi), plo = xs(xlo);
              ret = phi - plo - pxBarWidth;
            } else
              ret = xs(s.barWidths[i]) - xs(0) - pxBarWidth;
          } else
            ret = pxBarWidth;
        } else if (d.length == 3)
          ret = apSc(xs, d[1], i) - apSc(xs, d[0], i);
        else
          ret = d[0] instanceof Date ?
            xs(new Date(d[0].valueOf() + s.barWidths[i] * barWidth / 2.0), i) -
            xs(new Date(d[0].valueOf() - s.barWidths[i] * barWidth / 2.0), i) :
            xs(xs.oton(d[0]) + s.barWidths[i] * barWidth / 2.0, i) -
            xs(xs.oton(d[0]) - s.barWidths[i] * barWidth / 2.0, i);
        return ret;
      })
      .attr('height', function(d, i) { return h - ys(d[d.length-1]); })
      .style('fill', sty(fill))
      .style('fill-opacity', sty(fillOpacity))
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke));
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      scope.$on('setupExtra', function() {
        var barx = scope.x || [];
        // Discrete data.
        if (scope.x && scope.x instanceof Array &&
            (typeof scope.x[0] == 'string' ||
             scope.x[0] instanceof Array ||
             scope.discreteX)) {
          barx = [];
          scope.x.forEach(function(x, i) { barx.push(i + 1); });
        }
        if (scope.barMin && scope.barMax) {
          scope.barWidths = scope.barMax.map(function(mx, i) {
            return mx - scope.barMin[i];
          });
          var last = barx.length - 1;
          scope.rangeXExtend = [barx[0] - scope.barMin[0],
                                scope.barMax[last] - barx[last]];
        } else {
          scope.barWidths = barx.map(function(xval, i) {
            if (i == 0) return barx[1] - xval;
            else if (i == barx.length - 1)
              return xval - barx[barx.length - 2];
            else return (barx[i+1] - barx[i-1]) / 2;
          });
          scope.rangeXExtend = [scope.barWidths[0] / 2,
                                scope.barWidths[barx.length - 1] / 2];
        }
        var width = scope.strokeWidth instanceof Array &&
                    scope.strokeWidth.length > 0 ?
          scope.strokeWidth.reduce(function(x,y) {
            return Math.max(Number(x), Number(y));
          }) : (Number(scope.strokeWidth) || 1);
        scope.rangeExtendPixels([2*width, 2*width], null);
      });
      scope.$on('setupRanges', function(e, s) {
        if (s.yrange) s.yrange[0] = 0;
        else          s.yrange = [0, null];
        if (s.y2range) s.y2range[0] = 0;
        else           s.y2range = [0, null];
      });
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);


// Box and whisker plots.

radian.directive('boxes',
 ['plotTypeLink', 'plotLib', function(plotTypeLink, lib)
{
  'use strict';

  function draw(svg, xin, xs, yin, ys, s, w, h) {
    var x = xin, y = yin;
    var strokeWidth   = s.strokeWidth || 1;
    var strokeOpacity = s.strokeOpacity || 1.0;
    var stroke = s.stroke || '#000';
    var fillOpacity = s.fillOpacity || 1.0;
    var fill = s.fill || 'none';
    var barWidth = s.barWidth || 0.5;
    var pxBarWidth, pxWidth = false;
    if (typeof barWidth == 'string' &&
        barWidth.trim().substr(-2,2) == 'px') {
      pxBarWidth =
        Number(barWidth.trim().substr(0, barWidth.trim().length - 2));
      barWidth = xs.invert(pxBarWidth) - xs.invert(0);
      pxWidth = true;
    }

    // Data aggregation.
    x = lib.unique(xin);
    var q25 = lib.quantileBy(yin, xin, 0.25);
    var q50 = lib.quantileBy(yin, xin, 0.5);
    var q75 = lib.quantileBy(yin, xin, 0.75);
    var qs = d3.zip(q25, q50, q75);
    s.barWidths = lib.firstBy(s.barWidths, xin);
    if (fill instanceof Array)
      fill = lib.firstBy(fill, xin);
    if (fillOpacity instanceof Array)
      fillOpacity = lib.firstBy(fillOpacity, xin);
    if (strokeWidth instanceof Array)
      strokeWidth = lib.firstBy(strokeWidth, xin);
    if (strokeOpacity instanceof Array)
      strokeOpacity = lib.firstBy(strokeOpacity, xin);
    if (stroke instanceof Array)
      stroke = lib.firstBy(stroke, xin);

    // Plot bars: plot attributes are either single values or arrays
    // of values, one per bar.
    function sty(v) {
      return (v instanceof Array) ? function(d, i) { return v[i]; } : v;
    };
    var dat = d3.zip(x, qs);
    svg.selectAll('rect').data(dat)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d, i) {
        return xs(xs.oton(d[0]) -
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 2.0, i);
      })
      .attr('y', function(d, i) { return ys(d[1][2], i); })
      .attr('width', function(d, i) {
        if (pxWidth)
          return pxBarWidth;
        else
          return xs(xs.oton(d[0]) + s.barWidths[i] * barWidth / 2.0, i) -
                 xs(xs.oton(d[0]) - s.barWidths[i] * barWidth / 2.0, i);
      })
      .attr('height', function(d, i) {
        return ys(d[1][0], i) - ys(d[1][2], i);
      })
      .style('fill', sty(fill))
      .style('fill-opacity', sty(fillOpacity))
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke));
    svg.selectAll('line.median').data(dat).enter().append('line')
      .attr('class', 'median')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .style('fill', 'none')
      .attr('x1', function(d, i) {
        return xs(xs.oton(d[0]) -
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 2.0, i);
      })
      .attr('x2', function(d, i) {
        return xs(xs.oton(d[0]) +
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 2.0, i);
      })
      .attr('y1', function(d, i) { return ys(d[1][1], i); })
      .attr('y2', function(d, i) { return ys(d[1][1], i); });
    svg.selectAll('line.iqr-up').data(dat).enter().append('line')
      .attr('class', 'iqr-up')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .style('fill', 'none')
      .attr('x1', function(d, i) { return xs(xs.oton(d[0]), i); })
      .attr('x2', function(d, i) { return xs(xs.oton(d[0]), i); })
      .attr('y1', function(d, i) { return ys(d[1][2], i); })
      .attr('y2', function(d, i) {
        return ys(d[1][2] + 1.5 * (d[1][2] - d[1][0]), i);
      });
    svg.selectAll('line.iqr-up-bar').data(dat).enter().append('line')
      .attr('class', 'iqr-up-bar')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .style('fill', 'none')
      .attr('x1', function(d, i) {
        return xs(xs.oton(d[0]) -
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 3.0, i);
      })
      .attr('x2', function(d, i) {
        return xs(xs.oton(d[0]) +
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 3.0, i);
      })
      .attr('y1', function(d, i) {
        return ys(d[1][2] + 1.5 * (d[1][2] - d[1][0]), i);
      })
      .attr('y2', function(d, i) {
        return ys(d[1][2] + 1.5 * (d[1][2] - d[1][0]), i);
      });
    svg.selectAll('line.iqr-down').data(dat).enter().append('line')
      .attr('class', 'iqr-down')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .style('fill', 'none')
      .attr('x1', function(d, i) { return xs(xs.oton(d[0]), i); })
      .attr('x2', function(d, i) { return xs(xs.oton(d[0]), i); })
      .attr('y1', function(d, i) { return ys(d[1][0], i); })
      .attr('y2', function(d, i) {
        return ys(d[1][0] - 1.5 * (d[1][2] - d[1][0]), i);
      });
    svg.selectAll('line.iqr-down-bar').data(dat).enter().append('line')
      .attr('class', 'iqr-down-bar')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .style('fill', 'none')
      .attr('x1', function(d, i) {
        return xs(xs.oton(d[0]) -
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 3.0, i);
      })
      .attr('x2', function(d, i) {
        return xs(xs.oton(d[0]) +
                  (pxWidth ? barWidth : s.barWidths[i] * barWidth) / 3.0, i);
      })
      .attr('y1', function(d, i) {
        return ys(d[1][0] - 1.5 * (d[1][2] - d[1][0]), i);
      })
      .attr('y2', function(d, i) {
        return ys(d[1][0] - 1.5 * (d[1][2] - d[1][0]), i);
      });
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      scope.$on('setupExtra', function() {
        var barx = scope.x || [];
        // Discrete data.
        if (scope.x && scope.x instanceof Array &&
            (typeof scope.x[0] == 'string' ||
             scope.x[0] instanceof Array ||
             scope.discreteX)) {
          barx = [];
          scope.x.forEach(function(x, i) { barx.push(i + 1); });
        }
        scope.barWidths = barx.map(function(xval, i) {
          if (i == 0) return barx[1] - xval;
          else if (i == barx.length - 1)
            return xval - barx[barx.length - 2];
          else return (barx[i+1] - barx[i-1]) / 2;
        });
        scope.rangeXExtend = [scope.barWidths[0] / 2,
                              scope.barWidths[barx.length - 1] / 2];
        var width = scope.strokeWidth instanceof Array &&
                    scope.strokeWidth.length > 0 ?
          scope.strokeWidth.reduce(function(x,y) {
            return Math.max(Number(x), Number(y));
          }) : (Number(scope.strokeWidth) || 1);
        scope.rangeExtendPixels([2*width, 2*width], [20, 20]);
      });
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);


// Area plots.

radian.directive('area',
 ['plotTypeLink', function(plotTypeLink)
{
  'use strict';

  function draw(svg, x, xs, y, ys, s, axis) {
    var opacity = s.fillOpacity || 1.0;
    var fill = s.fill || '#000';
    var yminv = axis == 1 ? 'ymin' : 'y2min';
    var ymin, ymintmp = 0;
    if (s.hasOwnProperty(yminv)) ymintmp = s[yminv];
    if (ymintmp instanceof Array)
      ymin = ymintmp;
    else {
      ymin = new Array(x.length);
      for (var i = 0; i < ymin.length; ++i) ymin[i] = Number(ymintmp);
    }

    // Switch on type of stroke...
    if (!(opacity instanceof Array || fill instanceof Array)) {
      // Normal area; single path.
      var area = d3.svg.area()
        .x(function(d) { return xs(d[0], i); })
        .y0(function(d) { return ys(d[1], i); })
        .y1(function(d) { return ys(d[2], i); });
      svg.append('path').datum(d3.zip(x, ymin, y))
        .attr('class', 'area').attr('d', area)
        .style('fill-opacity', opacity)
        .style('fill', fill);
    } else throw Error("<area> plots require singular paint attributes")
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);


// Rug plots.

radian.directive('rug',
 ['plotTypeLink', function(plotTypeLink)
{
  'use strict';

  function draw(svg, x, xs, y, ys, s) {
    var stroke = s.stroke || '#000';
    var strokeWidth = s.strokeWidth || 1.0;
    var strokeOpacity = s.strokeOpacity || 1.0;
    var tickLength = Number(s.tickLength || 5);

    // Plot points: plot attributes are either single values or arrays
    // of values, one per point.
    function sty(v) {
      return (v instanceof Array) ? function(d, i) { return v[i]; } : v;
    };
    var xrugs = [ ], yrugs = [ ], xr = xs.range(), yr = ys.range();
    if (x) {
      var y0 = ys.invert(yr[0]), y1 = ys.invert(yr[0] - tickLength);
      xrugs = x.map(function(xval) { return [[xval, y0], [xval, y1]]; });
    }
    if (y) {
      var x0 = xs.invert(xr[0]), x1 = xs.invert(xr[0] + tickLength);
      yrugs = y.map(function(yval) { return [[x0, yval], [x1, yval]]; });
    }
    var rugs = xrugs.concat(yrugs);
    svg.selectAll('path').data(rugs).enter().append('path')
      .attr('class', 'line')
      .style('stroke-width', sty(strokeWidth))
      .style('stroke-opacity', sty(strokeOpacity))
      .style('stroke', sty(stroke))
      .attr('d', d3.svg.line()
            .x(function (d, i) { return xs(d[0], i); })
            .y(function (d, i) { return ys(d[1], i); }));
  };

  return {
    restrict: 'E',
    scope: true,
    link: function(scope, elm, as) {
      scope.checkPlottable = function(xvar, yvar) { return xvar || yvar; };
      plotTypeLink(scope, elm, as, draw);
    }
  };
}]);
// Process palette directive.

radian.directive('palette',
 ['processAttrs', 'radianEval', 'discPalFn', 'contPalFn',
  function(processAttrs, radianEval, discPalFn, contPalFn)
{
  'use strict';

  return {
    restrict: 'E',
    scope: false,
    link: function(scope, elm, attrs) {
      // The <palette> element is only there to carry data, so hide it
      // right away.
      elm.hide();

      // Process attributes.
      processAttrs(scope, attrs);
      if (!scope.name)
        throw Error("<palette> directive without NAME attribute");
      var name = scope.name;
      var typ = scope.type || 'norm';
      var interp = scope.interp || 'hsl';
      interp = interp.toLowerCase();
      var banded = scope.hasOwnProperty("banded");

      // Process content -- all text children are appended together
      // for parsing.
      var paltext = '';
      elm.contents().each(function(i,n) {
        if (n instanceof Text) paltext += n.textContent;
      });

      // Normalise content: line separators are equivalent to
      // semicolons.
      paltext = radianEval(scope, paltext.trim());
      paltext = paltext.replace(/\n/g, ';');

      // Generate palette function.
      var fn;
      switch (typ) {
      case 'discrete':
        fn = discPalFn(paltext);
        break;
      case 'abs':
        fn = contPalFn(true, paltext, banded, interp);
        break;
      case 'norm':
        fn = contPalFn(false, paltext, banded, interp);
        break;
      default:
        throw Error("invalid <palette> type: " + typ);
      }

      // Install palette function on nearest enclosing scope that
      // isn't associated with an ng-repeat.
      var s = scope;
      while (s.$parent && s.hasOwnProperty('$index')) s = s.$parent;
      s[name] = fn;
    }
  };
}]);


radian.factory('discPalFn', function()
{
  // Mmmmmm...  I love the smell of regular expressions in the
  // morning.  Smells like... VICTORY!  Not.
  var renoquotes = '[^"\\s]+', requotes = '"[^"]*"';
  var reids = renoquotes + '|' + requotes;
  var resplits = '(?:(' + reids + ')\\s+)?([^\\s;]+)';
  var resings = '(?:(?:' + reids + ')\\s+)?(?:[^\\s;]+)';
  var remults = '(' + resings + ')((?:\\s*;\\s*' + resings + ')*)';
  var resplit = new RegExp(resplits);
  var remult = new RegExp(remults);
  var restripsemi = /\s*;\s*(.*)/;

  return function(txt) {
    // Prototype palette function for discrete palette with no keys,
    // i.e. just a list of colours.
    function protoNoKeys(n, cs, v) {
      if (v instanceof Array) {
        // For array data, we pull colours out of the palette in
        // sorted order of the keys.
        var vs = { };
        v.forEach(function(x) { vs[x] = 1; });
        var uvs = Object.keys(vs).sort();
        return v.map(function(x) { return cs[uvs.indexOf(x) % n]; });
      } else if (typeof v == "number")
        // Otherwise, the palette function argument must be numeric
        // and is just used as an index into the list of colours.
        return cs[(Math.round(v) - 1) % n];
      else throw Error("invalid operand to discrete palette function");
    };

    // Prototype palette function for discrete palette with keys.
    function protoWithKeys(cs, v) {
      // Just pull out the appropriate colour value using the key.
      return (v instanceof Array) ?
        v.map(function(x) { return cs[x]; }) : cs[v];
    };

    // Palette entries consist either of a key value or a key value
    // and a colour, and are separated by semicolons.  Key values may
    // be quoted using double quotes.
    txt = txt.trim();
    var ks = [], cs = [], nks = 0, ms;
    while (true) {
      ms = txt.match(remult);
      if (!ms) throw Error("invalid palette definition");
      var m = ms[1];
      var ss = m.match(resplit);
      if (!ss) throw Error("invalid palette definition");
      if (ss[1]) {
        ks.push(ss[1].charAt(0) == '"' ? ss[1].slice(1, -1) : ss[1]);
        ++nks;
      }
      cs.push(ss[2]);
      if (ms[2] == '') break;
      var tmp = ms[2].match(restripsemi);
      if (!tmp) throw Error("invalid palette definition");
      txt = tmp[1];
    }

    // At this point, ks is an array of key values and cs is an array
    // of colour values.  If all the colours have keys, then we set up
    // the key to colour mapping and return a function based on the
    // "with keys" prototype.  If none of the colours have keys, we
    // return a function based on the "no keys" prototype.  Any other
    // situation is an error.
    if (nks == 0) {
      // Return a function based on the "no keys" prototype.
      var thisn = cs.length;
      var thiscs =
        '[' + cs.map(function(c) { return '"' + c + '"' }).join(',') + ']';
      return function(v) { return protoNoKeys(thisn, thiscs, v); };
    } else if (nks == cs.length) {
      // Return a function based on "with keys" prototype.
      var thiscs = { };
      for (var i = 0; i < cs.length; ++i) thiscs[ks[i]] = cs[i];
      return function(v) { return protoWithKeys(thiscs, v); };
    } else throw Error("invalid palette definition");
  };
});


radian.factory('contPalFn', function()
{
  return function(isabs, txt, band, interp) {
    // Prototype for returned function for normalised palette -- does
    // linear interpolation from data extent to [0,1] and applies
    // polylinear colour interpolation function.
    function protoNorm(cmap, v) {
      if (!(v instanceof Array))
        throw Error("normalised palettes must be applied to array arguments");
      var ext = d3.extent(v);
      var sc = d3.scale.linear().domain(ext);
      return v.map(function(x) { return cmap(sc(x)); });
    };

    // Prototype for returned function for absolute palette -- just
    // applies polylinear colour interpolation function.
    function protoAbs(cmap, v) {
      return v instanceof Array ?
        v.map(function(x) { return cmap(x); }) : cmap(v);
    };

    // Set up appropriate D3 colour interpolation factory.
    var intfac;
    if (band)
      intfac = function(a, b) { return function(t) { return a; }; };
    else switch (interp) {
    case 'rgb': intfac = d3.interpolateRgb;  break;
    case 'hcl': intfac = d3.interpolateHcl;  break;
    case 'lab': intfac = d3.interpolateLab;  break;
    default:    intfac = d3.interpolateHsl;  break;
    }

    // Palette entries are separated by semicolons: split them and
    // trim them for further processing.
    var cs = txt.split(';').
      map(function(s) { return s.trim(); }).
      filter(function(s) { return s.length > 0; });

    // For normalised palettes, each entry should have a numeric value
    // and a colour, separated by a space.
    if (!cs.every(function(c) { return c.indexOf(' ') != -1; }))
      throw Error("invalid format in <palette>");

    // Extract the segment limits and colours from the palette data.
    var lims = [], cols = [];
    cs.forEach(function(x) {
      var css = x.split(' ');
      lims.push(Number(css[0].trim()));
      cols.push(css[1].trim());
    });
    // Check for ascending limit values.
    for (var i = 1; i < lims.length; ++i)
      if (lims[i] < lims[i - 1])
        throw Error("entries out of order in <palette>");

    // Minimum and maximum segment limits (fix up top end for banded
    // palettes).
    var minl = lims[0], maxl = lims[lims.length-1];
    if (band) {
      if (isabs) {
        lims.push(Number.MAX_VALUE);
        cols.push('black');
        maxl = Number.MAX_VALUE;
      } else if (maxl != 1) {
        lims.push(1);
        cols.push('black');
        maxl = 1;
      }
    }
    if (!isabs && (minl != 0 || maxl != 1))
      throw Error("invalid segment limits for normalised palette");

    // Build polylinear colour interpolation scale using appropriate
    // colour interpolation factory.
    var thiscmap = d3.scale.linear().
      clamp(true).interpolate(intfac).
      domain(lims).range(cols);
    return isabs ?
      function(v) { return protoAbs(thiscmap, v); } :
      function(v) { return protoNorm(thiscmap, v); };
  };
});


radian.factory('genPalFn',
 ['discPalFn', 'contPalFn', 'MD5', 'plotLib',
  function(discPalFn, contPalFn, MD5, plotLib)
{
  'use strict';

  return function(paldef) {
    var paltext;
    if (paldef.values)
      paltext = d3.zip(paldef.values, paldef.colours).map(function(p) {
        return p.join(' ');
      }).join(';');
    else
      paltext = paldef.colours.join(';');
    var fnname = paldef.type.charAt(0) + MD5(JSON.stringify(paltext));
    if (!plotLib.rad$$pal[fnname]) {
      var fn, interp = paldef.interp || 'hsl', band = paldef.banded;
      switch (paldef.type) {
      case 'discrete':   fn = discPalFn(paltext);                      break;
      case 'absolute':   fn = contPalFn(true, paltext, band, interp);  break;
      case 'normalised': fn = contPalFn(false, paltext, band, interp); break;
      }
      plotLib.rad$$pal[fnname] = fn;
    }
    return fnname;
  };
}]);

// Plotting function library.

radian.factory('plotLib', function()
{
  'use strict';

  // Vectorise scalar function.
  function vect(f) {
    return function(x) {
      return (x instanceof Array) ? x.map(f) : f(x);
    };
  };

  // Vectorise binary operator.
  function vectOp(f) {
    return function(x, y) {
      var xa = x instanceof Array, ya = y instanceof Array;
      if (!xa && !ya) return f(x, y);
      var xlen = xa ? x.length : 0, ylen = ya ? y.length : 0;
      var rlen = xa && ya ? Math.min(xlen, ylen) : Math.max(xlen, ylen);
      var res = new Array(rlen);
      var ff;
      if (xa && ya) ff = function(i) { return f(x[i], y[i]); };
      else if (xa)  ff = function(i) { return f(x[i], y   ); };
      else          ff = function(i) { return f(x,    y[i]); };
      for (var i = 0; i < rlen; ++i) res[i] = ff(i);
      return res;
    }
  };

  // Construct grouping function.
  function by(f) {
    return function(x, c) {
      var cs = { }, ord = [];
      x.forEach(function(e, i) {
        if (cs[c[i]])
          cs[c[i]].push(e);
        else { ord.push(c[i]); cs[c[i]] = [e]; }
      });
      var ret = [];
      ord.forEach(function(e) { ret.push(f(cs[e])); });
      return ret;
    };
  };

  // Basic functions.
  function seq(s, e, n) { return d3.range(s, e, (e - s) / (n - 1)); };
  function seqStep(s, e, delta) { return d3.range(s, e, delta); };
  function sdev(x) {
    var m = d3.mean(x), m2 = d3.mean(x, function(a) { return a*a; });
    return Math.sqrt(m2 - m * m);
  };
  function unique(x) {
    var ret = [], check = { };
    x.forEach(function(e) { if (!check[e]) { ret.push(e); check[e] = 1; } });
    return ret;
  };

  // log(Gamma(x))
  function gammaln(x) {
    function sum(xs) {
      var s = 0;
      xs.forEach(function(x) { s += x; });
      return s;
    }
    var cof = [76.18009172947146,-86.50532032941677,24.01409824083091,
               -1.231739572450155,0.001208650973866179,-0.000005395239384953];
    var ser = 1.000000000190015;
    var tmp = (x + 5.5) - (x + 0.5) * Math.log(x + 5.5);
    var ser1 = ser + sum(cof.map(function(c,y) { return c/(x+y+1); }));
    return (-tmp + Math.log(2.5066282746310005 * ser1 / x));
  };

  // Probability distributions.
  function normal(x, mu, sigma) {
    var c1 = 1 / (sigma * Math.sqrt(2 * Math.PI)), c2 = 2*sigma*sigma;
    return vect(function(x) { return c1 * Math.exp(-(x-mu)*(x-mu)/c2); })(x);
  };
  function lognormal(x, mu, sigma) {
    var c1 = 1 / (sigma * Math.sqrt(2 * Math.PI)), c2 = 2*sigma*sigma;
    return vect(function(x) {
      return x <= 0 ? 0 :
        c1/x * Math.exp(-(Math.log(x)-mu)*(Math.log(x)-mu)/c2);
    })(x);
  };
  function gamma(x, k, theta) {
    var c = k * Math.log(theta) + gammaln(k);
    return vect(function(x) {
      return x <= 0 ? 0 : Math.exp((k - 1) * Math.log(x) - x / theta - c);
    })(x);
  };
  function invgamma(x, alpha, beta) {
    var c = alpha * Math.log(beta) - gammaln(alpha);
    return vect(function(x) {
      return x<=0 ? 0 : Math.exp(cval - beta / x - (alpha + 1) * Math.log(x));
    })(x);
  };

  // Histogramming function.
  function histogram(xs, opts) {
    // Deal with special case where just the number of bins is given
    // as an argument.
    if (typeof opts == 'number' || typeof opts == 'string')
      opts = { nbins: Number(opts) };

    // Coordinate transforms: forwards.
    function idfn(x) { return x; }
    var hxs = xs, xform = null, xformname = null;
    if (opts.hasOwnProperty('transform')) {
      xform = opts.transform;
      if (typeof xform == 'string') {
        switch (xform) {
        case 'linear':
          xform = [idfn, idfn];
          xformname = 'linear';
          break;
        case 'log':
          xform = [Math.log, Math.exp];
          xformname = 'log';
          break;
        default: throw Error("unknown coordinate transform in histogram");
        }
      }
      if (!(xform instanceof Array && xform.length == 2))
        throw Error("invalid coordinate transform in histogram");
      hxs = xs.map(xform[0]);
    }

    // Bin width calculations.  Performed in transformed coordinates.
    var rng = d3.extent(hxs);
    if (opts.hasOwnProperty('binrange')) {
      rng = angular.copy(opts.binrange);
      if (xformname == 'log') {
        rng[0] = Math.log(rng[0]);
        rng[1] = Math.log(rng[1]);
      }
    }
    var binwidth = null, nbins = null;
    if (opts.hasOwnProperty('nbins')) {
      nbins = opts.nbins;
      binwidth = (rng[1] - rng[0]) / nbins;
    } else if (opts.hasOwnProperty('binwidth')) {
      binwidth = opts.binwidth;
      nbins = Math.floor((rng[1] - rng[0]) / binwidth);
    }

    // Calculate counts and frequencies per bin.
    var ns = [], fs = [];
    for (var i = 0; i < nbins; ++i) ns.push(0);
    for (var i = 0; i < hxs.length; ++i)
      ++ns[Math.min(nbins-1, Math.max
                    (0, Math.floor((hxs[i] - rng[0]) / binwidth)))];
    for (var i = 0; i < nbins; ++i) fs.push(ns[i] / hxs.length);

    // Coordinate transforms: backwards (bin centres and extents).
    var cs = [], bins = [], w2 = 0.5 * binwidth;
    for (var i = 0; i < nbins; ++i) {
      var c = rng[0] + binwidth * (i + 0.5);
      var mn = c - w2, mx = c + w2;
      if (xform) {
        c = xform[1](c);
        mn = xform[1](mn);
        mx = xform[1](mx);
      }
      cs.push(c);
      bins.push([mn, mx]);
    }

    // Calculate normalised probability values in input coordinates.
    var tot = 0, ps = [];
    for (var i = 0; i < nbins; ++i) tot += fs[i] * (bins[i][1] - bins[i][0]);
    for (var i = 0; i < nbins; ++i) ps.push(fs[i] / tot);

    var ret = { centres:cs, bins:bins, counts:ns, freqs:fs, probs:ps };
    return ret;
  };

  // Helper function to find minimum and maximum values in a
  // potentially nested array.
  function flattenExtent(a) {
    var min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] instanceof Array) {
        var sub = flattenExtent(a[i]);
        min = Math.min(min, sub[0]); max = Math.max(max, sub[1]);
      } else { min = Math.min(min, a[i]);  max = Math.max(max, a[i]); }
    }
    return [min, max];
  };

  // Interpolator generating function.
  function interpolate(d, r, t) {
    var type = t || 'linear', base;
    switch (type) {
    case 'linear': base = d3.scale.linear();  break;
    case 'sqrt':   base = d3.scale.sqrt();    break;
    case 'log':    base = d3.scale.log();     break;
    default:
      if (type.substr(0, 4) == 'pow:')
        base = d3.scale.pow().exponent(Number(type.substr(5)));
      else throw Error("invalid interpolation type");
    }
    var dom = d || [0,1];  dom = flattenExtent(dom);
    var rng = r || [0,1];  rng = flattenExtent(rng);
    var ret = base.domain(dom).range(rng);
    return function(x) { return x.map(ret); };
  };

  // Variadic array range function.
  function multiExtent() {
    if (arguments.length == 0) return [];
    var ret = d3.extent(arguments[0]);
    for (var i = 1; i < arguments.length; ++i) {
      var e = d3.extent(arguments[i]);
      ret = d3.extent([ret[0], ret[1], e[0], e[1]]);
    }
    return ret;
  };

  // Flatten arrays of arrays.
  function flatten(a) {
    if (a == undefined || !a) return a;
    var ret = [];
    function go(x) {
      if (x instanceof Array)
        x.forEach(go);
      else
        ret.push(x);
    };
    go(a);
    return ret;
  };

  // Zip vectors together building composite categorical ordering
  // metadata as required.
  function metaDataAwareZip() {
    var d = arguments;
    var n = d.length;
    if (!n) return [];
    var m = d3.min(d, function(a) { return a.length; });
    var zips = new Array(m);
    for (var i = 0; i < m; ++i) {
      zips[i] = new Array(n);
      for (var j = 0; j < n; ++j) zips[i][j] = d[j][i];
    }
    function buildOrder(lev) {
      var this_levels = [];
      if (d[lev].metadata && d[lev].metadata.categoryOrder)
        this_levels = d[lev].metadata.categoryOrder.split(/;/);
      if (lev >= d.length - 1) return this_levels;
      var next_levels = buildOrder(lev + 1);
      var ret = [];
      if (this_levels.length == 0)
        next_levels.forEach(function(n) { ret.push(',' + n); });
      else
        this_levels.forEach(function(t) {
          next_levels.forEach(function(n) { ret.push(t + ',' + n); });
        });
      return ret;
    };
    var do_order = false;
    for (var i = 0; i < n; ++i)
      if (d[i].metadata && d[i].metadata.categoryOrder) {
        do_order = true;
        break;
      }
    if (do_order)
      zips.metadata = { categoryOrder: buildOrder(0).join(';') };
    return zips;
  };

  // Perform simple ID plucking, pulling metadata out along the way.
  function metaDataAwarePluck(obj, key) {
    var ret = obj.map(function(x) { return x[key]; });
    if (obj.metadata && obj.metadata[key])
      ret.metadata = obj.metadata[key];
    return ret;
  };

  // Calculate categorised quantiles.
  function quantileBy(x, c, p) {
    var cs = { }, ord = [];
    x.forEach(function(e, i) {
      if (cs[c[i]]) cs[c[i]].push(e);
      else { ord.push(c[i]); cs[c[i]] = [e]; }
    });
    var ret = [];
    ord.forEach(function(e) {
      cs[e].sort();
      ret.push(d3.quantile(cs[e], p));
    });
    return ret;
  };


  // Library -- used for bringing useful names into scope for
  // plotting data access expressions.
  return { E: Math.E,
           LN10: Math.LN10,
           LN2: Math.LN2,
           LOG10E: Math.LOG10E,
           LOG2E: Math.LOG2E,
           PI: Math.PI,
           SQRT1_2: Math.SQRT1_2,
           SQRT2: Math.SQRT2,
           abs: vect(Math.abs),
           acos: vect(Math.acos),
           asin: vect(Math.asin),
           atan: vect(Math.atan),
           ceil: vect(Math.ceil),
           cos: vect(Math.cos),
           exp: vect(Math.exp),
           floor: vect(Math.floor),
           log: vect(Math.log),
           round: vect(Math.round),
           sin: vect(Math.sin),
           sqrt: vect(Math.sqrt),
           tan: vect(Math.tan),
           atan2: Math.atan2,
           pow: Math.pow,
           min: d3.min,
           max: d3.max,
           extent: multiExtent,
           flatten: flatten,
           sum: d3.sum,
           mean: d3.mean,
           median: d3.median,
           quantile: d3.quantile,
           category10: vect(d3.scale.category10()),
           category20: vect(d3.scale.category20()),
           zip: metaDataAwareZip,
           seq: seq,
           seqStep: seqStep,
           sdev: sdev,
           unique: unique,
           minBy: by(d3.min),
           maxBy: by(d3.max),
           sumBy: by(d3.sum),
           meanBy: by(d3.mean),
           medianBy: by(d3.median),
           sdevBy: by(sdev),
           firstBy: by(function(xs) { return xs[0]; }),
           quantileBy: quantileBy,
           normal: normal,
           lognormal: lognormal,
           gamma: gamma,
           invgamma: invgamma,
           histogram: histogram,
           interpolate: interpolate,
           rad$$neg: vect(function(a) { return -a; }),
           rad$$add: vectOp(function(a, b) { return a + b; }),
           rad$$sub: vectOp(function(a, b) { return a - b; }),
           rad$$mul: vectOp(function(a, b) { return a * b; }),
           rad$$div: vectOp(function(a, b) { return a / b; }),
           rad$$pow: vectOp(function(a, b) { return Math.pow(a, b); }),
           rad$$pluck: metaDataAwarePluck,
           rad$$pal: {}
         };
});
// radian.directive('radianUi', ['$timeout', function($timeout)
// {
//   'use strict';

//   return {
//     restrict: 'E',
//     scope: true,
//     template:
//     ['<div class="radian-ui" ng-show="uivisible">',
//        // '<span class="form-inline">',
//        //   '<span ng-show="xvs">',
//        //     '<span>{{xlab}}</span>',
//        //     '<select ng-model="xidx" class="var-select" ',
//        //             'ng-options="v[0] as v[1] for v in xvs">',
//        //     '</select>',
//        //   '</span>',
//        //   '<span ng-show="xvs && yvs">',
//        //     '&nbsp;&nbsp;vs&nbsp;&nbsp;',
//        //   '</span>',
//        //   '<span ng-show="yvs">',
//        //     '<span>{{ylab}}</span>',
//        //     '<select ng-model="yidx" class="var-select" ',
//        //             'ng-options="v[0] as v[1] for v in yvs">',
//        //     '</select>',
//        //   '</span>',
//        //   '<span ng-show="yvs && (swbut || swsel)">',
//        //     '&nbsp;&nbsp;',
//        //   '</span>',
//        // '</span>',
//      '</div>'].join(""),
//     replace: true,
//     link: function(scope, elm, as) {
//       // // Deal with selection of X and Y variables.
//       // if (scope.selectX !== undefined) {
//       //   scope.uivisible = true;
//       //   var xvars = scope.selectX.split(',');
//       //   if (xvars.length > 1) {
//       //     // Selector UI.
//       //     scope.xidx = 0;
//       //     scope.xvs = xvars.map(function(v, i) { return [i, v]; });
//       //     scope.xlab = scope.selectXLabel;
//       //     if (scope.selectX == scope.selectY)
//       //       scope.$watch('xidx',
//       //                    function(n, o) {
//       //                      if (n == scope.yidx) scope.yidx = o;
//       //                      scope.yvs = [].concat(scope.xvs);
//       //                      scope.yvs.splice(n, 1);
//       //                    });
//       //   }
//       // }
//       // if (scope.selectY !== undefined) {
//       //   scope.uivisible = true;
//       //   var yvars = scope.selectY.split(',');
//       //   if (yvars.length > 1) {
//       //     // Selector UI.
//       //     scope.yidx = 0;
//       //     scope.yvs = yvars.map(function(v, i) { return [i, v]; });
//       //     scope.ylab = scope.selectYLabel;
//       //     if (scope.selectX == scope.selectY) {
//       //       scope.yvs.splice(1);
//       //       scope.yidx = 1;
//       //     }
//       //   }
//       // }
//     }
//   };
// }]);


radian.directive('radianLegend', function()
{
  return {
    restrict: 'E',
    template:
    ['<div class="radian-legend">',
       '<span ng-style="colour(v)" ng-repeat="v in switchable">',
         '{{v.label}}&nbsp;',
         '<input type="checkbox" ng-model="v.enabled" ',
                'ng-change="$emit(\'paintChange\')">',
         '&nbsp;&nbsp;&nbsp;',
       '</span>',
     '</div>'].join(""),
    replace: true,
    scope: true,
    link: function(scope, elm, as) {
      scope.colour = function(v) {
        var c = (v.stroke instanceof Array ? v.stroke[0] : v.stroke) || '#000';
        return { color: c };
      };
      scope.$on('setupExtraAfter', function() {
        var m = scope.views[0].margin;
        elm.css('top', (m.top+3)+'px').css('right', (m.right+3)+'px');
      });
    }
  };
});


radian.directive('radianAxisSwitch', function()
{
  return {
    restrict: 'E',
    template:
    ['<div class="radian-axis-switch">',
       '<button class="btn btn-mini" ng-click="switchState()">',
         '{{axisName}} axis &rArr; {{label}}',
       '</button>',
    '</div>'].join(''),
    replace: true,
    scope: true,
    link: function(scope, elm, as) {
      var axis = as.axis || 'y';
      scope.axisName = axis == 'y' ? 'Y' : 'X';
      var uiattr = axis == 'y' ? 'uiAxisYTransform' : 'uiAxisXTransform';
      var attr = axis == 'y' ? 'axisYTransform' : 'axisXTransform';
      var type = scope[uiattr] || 'log';
      scope.states = type.split(/,/);
      if (scope.states.length == 1 && scope.states[0] != 'linear')
        scope.states.unshift('linear');
      for (var i = 0; i < scope.states.length; ++i)
        if (['linear', 'log', 'linear-0'].indexOf(scope.states[i]) < 0)
          throw Error("invalid UI axis switch type");
      function setLabel() {
        switch (scope.states[(scope.idx + 1) % scope.states.length]) {
        case 'linear':   scope.label = 'Linear';           break;
        case 'log':      scope.label = 'Log';              break;
        case 'linear-0': scope.label = 'Linear (from 0)';  break;
        }
      };
      scope.state = scope[attr] || scope.states[0];
      scope.idx = Math.max(0, scope.states.indexOf(scope.state));
      setLabel();
      scope.$on('setupExtraAfter', function() {
        var m = scope.views[0].margin;
        if (axis == 'y')
          elm.css('top', (m.top+3)+'px').css('left', (m.left+3)+'px');
        else
          elm.css('bottom', (m.bottom+3)+'px').css('right', (m.right+3)+'px');
      });
      scope.switchState = function() {
        scope.idx = (scope.idx + 1) % scope.states.length;
        scope.state = scope.states[scope.idx];
        setLabel();
        scope.$emit(axis == 'y' ? 'yAxisChange' : 'xAxisChange', scope.state);
      };
    }
  };
});


radian.directive('radianStrokeSwitch', function()
{
  return {
    restrict: 'E',
    template:
    ['<div class="radian-stroke-switch">',
       '<div ng-show="swbut">',
         '<span>{{swbutlab}}</span>',
         '<button class="btn btn-mini" data-toggle="button" ',
                 'ng-click="$parent.strokesel=1-$parent.strokesel">',
           '{{swbut}}',
         '</button>',
       '</div>',
       '<div class="btn-group" ng-show="swsel">',
         '<button class="btn btn-mini" ng-click="stepStroke()">',
           '{{swsel[$parent.strokesel]}} &nbsp;&nbsp;&nbsp;&nbsp;&rArr;',
         '</button>',
       '</div>',
     '</div>'].join(""),
    replace: true,
    scope: true,
    link: function(scope, elm, as) {
      if (!scope.strokeSwitch) return;
      scope.$on('setupExtraAfter', function() {
        var m = scope.views[0].margin;
        var dt = scope.legendEnabled ? 25 : 0;
        elm.css('top', (m.top+dt+3)+'px').css('right', (m.right+3)+'px');
      });
      scope.switches = scope.strokeSwitch.split(';');
      scope.stepStroke = function() {
        scope.$parent.strokesel =
          (scope.$parent.strokesel + 1) % scope.switches.length;
      };
      var label = scope.strokeSwitchLabel;
      if (scope.switches.length == 1) {
        // On/off UI.
        scope.swbut = scope.switches[0];
        scope.swbutlab = label;
      } else {
        // Selector UI.
        scope.swsel = scope.switches;
      }
    }
  };
});


radian.directive('radianHistogramSwitch', function()
{
  return {
    restrict: 'E',
    template:
    ['<div class="radian-histogram-switch btn-group">',
       '<button class="btn btn-mini">',
         'Bins: {{uiNBins}}',
       '</button>',
       '<button class="btn btn-mini" ng-click="dn(5)">',
         '<strong>-5</strong>',
       '</button>',
       '<button class="btn btn-mini" ng-click="dn(1)">',
         '-1',
       '</button>',
       '<button class="btn btn-mini" ng-click="up(1)">',
         '+1',
       '</button>',
       '<button class="btn btn-mini" ng-click="up(5)">',
         '<strong>+5</strong>',
       '</button>',
     '</div>'].join(""),
    replace: true,
    scope: true,
    link: function(scope, elm, as) {
      if (!scope.uiHistogramBins) return;
      scope.$on('setupExtraAfter', function() {
        var m = scope.views[0].margin;
        elm.css('bottom', (m.bottom+3)+'px').css('left', (m.left+3)+'px');
      });
      scope.uiNBins = scope[scope.histogramBinsVar];
      scope.$watch('histogramBinsVar', function(n, o) {
        scope.uiNBins = scope[scope.histogramBinsVar];
      });
      scope.up = function(n) {
        scope.uiNBins += n;
        scope.$parent[scope.histogramBinsVar] = scope.uiNBins;
      };
      scope.dn = function(n) {
        scope.uiNBins = Math.max(scope.uiNBins - n, 1);
        scope.$parent[scope.histogramBinsVar] = scope.uiNBins;
      };
    }
  };
});
// Depth-first traversal of Angular scopes.  Much like Angular's
// scope.$broadcast capability, but with operations at each level
// driven by the caller, rather than an event receiver.

radian.factory('dft', function() {
  'use strict';
  return function(scope, f) {
    function go(s) {
      f(s);
      for (var c = s.$$childHead; c; c = c.$$nextSibling) go(c);
    };
    go(scope);
  };
});


// More flexible depth-first traversal of Angular scopes, allowing for
// pruning and skipping of the top level.  The function f should
// return false if it doesn't want the traversal to continue into the
// current scope's children and true if it does.

radian.factory('dftEsc', function() {
  'use strict';
  return function(scope, f, dotop) {
    function go(s, doit) {
      if (doit) { if (!f(s)) return; }
      for (var c = s.$$childHead; c; c = c.$$nextSibling) go(c, true);
    };
    go(scope, dotop);
  };
});




//  MD5 (Message-Digest Algorithm)
//  http://www.webtoolkit.info/

radian.factory('MD5', function() {
  return function (string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    };
    function AddUnsigned(lX,lY) {
      var lX8 = lX & 0x80000000, lY8 = lY & 0x80000000;
      var lX4 = lX & 0x40000000, lY4 = lY & 0x40000000;
      var lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else return lResult ^ lX8 ^ lY8;
    }
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
    function FF(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };
    function GG(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };
    function HH(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };
    function II(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    };
    function ConvertToWordArray(string) {
      var wc, len = string.length;
      var nw_temp1=len + 8, nw_temp2=(nw_temp1-(nw_temp1 % 64))/64;
      var nw = (nw_temp2+1)*16;
      var wa=Array(nw-1);
      var bpos = 0, bc = 0;
      while (bc < len) {
        wc = (bc-(bc % 4))/4;
        bpos = (bc % 4)*8;
        wa[wc] = (wa[wc] | (string.charCodeAt(bc)<<bpos));
        bc++;
      }
      wc = (bc-(bc % 4))/4;
      bpos = (bc % 4)*8;
      wa[wc] = wa[wc] | (0x80<<bpos);
      wa[nw-2] = len<<3;
      wa[nw-1] = len>>>29;
      return wa;
    };
    function WordToHex(lValue) {
      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
      for (lCount = 0;lCount<=3;lCount++) {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue +
          WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
    };
    function Utf8Encode(string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) utftext += String.fromCharCode(c);
        else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    };
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA); b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
  };
});

// Dump tree of Angular scopes to console: useful for making sure that
// scopes have been set up properly in complicated transclusion cases.

radian.factory('dumpScope', function()
{
  'use strict';

  var go = function(scope, indent) {
    var indentstr = "";
    for (var i = 0; i < indent; ++i)
      indentstr = indentstr.concat(" ");
    console.log(indentstr + scope.$id + ": " +
                Object.keys(scope).filter(function(k) {
                  return k.charAt(0) != "$" && k != "this";
                }));
    for (var ch = scope.$$childHead; ch; ch = ch.$$nextSibling)
      go(ch, indent + 2);
  };
  return function(scope) { go(scope, 0); };
});
