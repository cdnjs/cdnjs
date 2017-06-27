(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-scale')) :
  typeof define === 'function' && define.amd ? define('d3-axis', ['exports', 'd3-selection', 'd3-scale'], factory) :
  (factory((global.d3_axis = {}),global.d3_selection,global.d3_scale));
}(this, function (exports,d3Selection,d3Scale) { 'use strict';

  var slice = Array.prototype.slice;

  function identity(x) {
    return x;
  };

  var epsilon = 1e-6;
  var top = {};
  var right = {};
  var bottom = {};
  var left = {};
  function transformX(selection, x0, x1) {
    selection.attr("transform", function(d) {
      var x = x0(d);
      if (!isFinite(x)) x = x1(d);
      return "translate(" + x + ",0)";
    });
  }

  function transformY(selection, y0, y1) {
    selection.attr("transform", function(d) {
      var y = y0(d);
      if (!isFinite(y)) y = y1(d);
      return "translate(0," + y + ")";
    });
  }

  function axis(orient) {
    var scale = d3Scale.scaleLinear(),
        tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3;

    function axis(g) {
      g.each(function() {
        var g = d3Selection.select(this);

        // Stash a snapshot of the new scale, and retrieve the old snapshot.
        var scale0 = this.__axis__ || scale,
            scale1 = this.__axis__ = scale.copy();

        // Ticks, or domain values for ordinal scales.
        var ticks = tickValues == null ? (scale1.ticks ? scale1.ticks.apply(scale1, tickArguments) : scale1.domain()) : tickValues,
            format = tickFormat == null ? (scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments) : identity) : tickFormat,
            tick = g.selectAll(".tick").data(ticks, scale1),
            tickEnter = tick.enter().append("g", ".domain").attr("class", "tick").style("opacity", epsilon),
            tickExit = tick.exit().style("opacity", epsilon).remove(), // TODO transition
            tickUpdate = tick.order().style("opacity", 1), // TODO transition
            tickSpacing = Math.max(tickSizeInner, 0) + tickPadding,
            tickTransform;

        // Domain.
        var range = scale1.range(),
            path = g.selectAll(".domain").data([0]),
            pathUpdate = path.enter().append("path").attr("class", "domain"); // TODO transition

        tickEnter.append("line");
        tickEnter.append("text");

        var lineEnter = tickEnter.select("line"),
            lineUpdate = tickUpdate.select("line"),
            text = tick.select("text").text(format),
            textEnter = tickEnter.select("text"),
            textUpdate = tickUpdate.select("text"),
            sign = orient === top || orient === left ? -1 : 1,
            x1, x2, y1, y2;

        if (orient === left || orient === right) {
          tickTransform = transformY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
          text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
          pathUpdate.attr("d", "M" + sign * tickSizeOuter + "," + range[0] + "H0V" + range[1] + "H" + sign * tickSizeOuter);
        } else {
          tickTransform = transformX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
          text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + sign * tickSizeOuter + "V0H" + range[1] + "V" + sign * tickSizeOuter);
        }

        lineEnter.attr(y2, sign * tickSizeInner);
        textEnter.attr(y1, sign * tickSpacing);
        lineUpdate.attr(x2, 0).attr(y2, sign * tickSizeInner);
        textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);

        if (scale1.bandwidth) {
          var x = scale1, dx = x.bandwidth() / 2;
          scale1 = function(d) { return x(d) + dx; };
        }

        tickEnter.call(tickTransform, scale0, scale1);
        tickUpdate.call(tickTransform, scale1, scale1);
        tickExit.call(tickTransform, scale1, scale0);
      });
    }

    axis.scale = function(_) {
      return arguments.length ? (scale = _, axis) : scale;
    };

    axis.ticks = function() {
      return tickArguments = slice.call(arguments), axis;
    };

    axis.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
    };

    axis.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
    };

    axis.tickFormat = function(_) {
      return arguments.length ? (tickFormat = _, axis) : tickFormat;
    };

    axis.tickSize = function(_) {
      return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
    };

    axis.tickSizeInner = function(_) {
      return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
    };

    axis.tickSizeOuter = function(_) {
      return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
    };

    axis.tickPadding = function(_) {
      return arguments.length ? (tickPadding = +_, axis) : tickPadding;
    };

    return axis;
  }

  function axisTop() {
    return axis(top);
  };

  function axisRight() {
    return axis(right);
  };

  function axisBottom() {
    return axis(bottom);
  };

  function axisLeft() {
    return axis(left);
  };

  var version = "0.1.0";

  exports.version = version;
  exports.axisTop = axisTop;
  exports.axisRight = axisRight;
  exports.axisBottom = axisBottom;
  exports.axisLeft = axisLeft;

}));