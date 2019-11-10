(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection'], factory) :
  (factory((global.d3_axis = {}),global.d3_selection));
}(this, function (exports,d3Selection) { 'use strict';

  var slice = Array.prototype.slice;

  function identity(x) {
    return x;
  }

  var top = {};
  var right = {};
  var bottom = {};
  var left = {};
  function translateX(scale) {
    return function(d) {
      return "translate(" + scale(d) + ",0)";
    };
  }

  function translateY(scale) {
    return function(d) {
      return "translate(0," + scale(d) + ")";
    };
  }

  function center(scale) {
    var width = scale.bandwidth() / 2;
    return function(d) {
      return scale(d) + width;
    };
  }

  function pathUpdate(path) {
    path.enter().append("path").attr("class", "domain");
  }

  function tickUpdate(tick) {
    tick.exit().remove();
    var tickEnter = tick.enter().append("g", ".domain").attr("class", "tick");
    tickEnter.append("line");
    tickEnter.append("text");
    tick.order();
  }

  function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3;

    function axis(g) {
      var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
          format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
          spacing = Math.max(tickSizeInner, 0) + tickPadding,
          position = scale.bandwidth ? center(scale) : scale,
          range = scale.range();

      g.each(function() {
        var g = d3Selection.select(this),
            path = g.selectAll(".domain").data([null]).call(pathUpdate),
            tick = g.selectAll(".tick").data(values, scale).call(tickUpdate),
            line = tick.select("line"),
            text = tick.select("text").text(format);

        switch (orient) {
          case top: {
            path.attr("d", "M" + range[0] + "," + -tickSizeOuter + "V0H" + range[1] + "V" + -tickSizeOuter);
            tick.attr("transform", translateX(position));
            line.attr("x2", 0).attr("y2", -tickSizeInner);
            text.attr("x", 0).attr("y", -spacing).attr("dy", "0em").style("text-anchor", "middle");
            break;
          }
          case right: {
            path.attr("d", "M" + tickSizeOuter + "," + range[0] + "H0V" + range[1] + "H" + tickSizeOuter);
            tick.attr("transform", translateY(position));
            line.attr("y2", 0).attr("x2", tickSizeInner);
            text.attr("y", 0).attr("x", spacing).attr("dy", ".32em").style("text-anchor", "start");
            break;
          }
          case bottom: {
            path.attr("d", "M" + range[0] + "," + tickSizeOuter + "V0H" + range[1] + "V" + tickSizeOuter);
            tick.attr("transform", translateX(position));
            line.attr("x2", 0).attr("y2", tickSizeInner);
            text.attr("x", 0).attr("y", spacing).attr("dy", ".71em").style("text-anchor", "middle");
            break;
          }
          case left: {
            path.attr("d", "M" + -tickSizeOuter + "," + range[0] + "H0V" + range[1] + "H" + -tickSizeOuter);
            tick.attr("transform", translateY(position));
            line.attr("y2", 0).attr("x2", -tickSizeInner);
            text.attr("y", 0).attr("x", -spacing).attr("dy", ".32em").style("text-anchor", "end");
            break;
          }
        }
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

  function axisTop(scale) {
    return axis(top, scale);
  }

  function axisRight(scale) {
    return axis(right, scale);
  }

  function axisBottom(scale) {
    return axis(bottom, scale);
  }

  function axisLeft(scale) {
    return axis(left, scale);
  }

  var version = "0.2.3";

  exports.version = version;
  exports.axisTop = axisTop;
  exports.axisRight = axisRight;
  exports.axisBottom = axisBottom;
  exports.axisLeft = axisLeft;

}));