(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_axis = global.d3_axis || {})));
}(this, function (exports) { 'use strict';

  var version = "0.3.1";

  var slice = Array.prototype.slice;

  function identity(x) {
    return x;
  }

  var top = 1;
  var right = 2;
  var bottom = 3;
  var left = 4;
  var epsilon = 1e-6;
  function translateX(scale0, scale1, d) {
    var x = scale0(d);
    return "translate(" + (isFinite(x) ? x : scale1(d)) + ",0)";
  }

  function translateY(scale0, scale1, d) {
    var y = scale0(d);
    return "translate(0," + (isFinite(y) ? y : scale1(d)) + ")";
  }

  function center(scale) {
    var width = scale.bandwidth() / 2;
    return function(d) {
      return scale(d) + width;
    };
  }

  function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3;

    function axis(context) {
      var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
          format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
          spacing = Math.max(tickSizeInner, 0) + tickPadding,
          transform = orient === top || orient === bottom ? translateX : translateY,
          range = scale.range(),
          range0 = range[0],
          range1 = range[range.length - 1],
          position = (scale.bandwidth ? center : identity)(scale.copy()),
          selection = context.selection ? context.selection() : context,
          path = selection.selectAll(".domain").data([null]),
          tick = selection.selectAll(".tick").data(values, scale).order(),
          tickExit = tick.exit(),
          tickEnter = tick.enter().append("g", ".domain").attr("class", "tick"),
          line = tick.select("line"),
          text = tick.select("text");

      path = path.merge(path.enter().append("path").attr("class", "domain"));
      tick = tick.merge(tickEnter);
      line = line.merge(tickEnter.append("line"));
      text = text.merge(tickEnter.append("text"));

      if (context !== selection) {
        path = path.transition(context);
        tick = tick.transition(context);
        tickExit = tickExit.transition(context).style("opacity", epsilon).attr("transform", function(d) { return transform(position, this.parentNode.__axis || position, d); });
        tickEnter.style("opacity", epsilon).attr("transform", function(d) { return transform(this.parentNode.__axis || position, position, d); });
        line = line.transition(context);
        text = text.transition(context);
      }

      tick.style("opacity", 1).attr("transform", function(d) { return transform(position, position, d); });
      tickExit.remove();
      text.text(format);

      switch (orient) {
        case top: {
          path.attr("d", "M" + range0 + "," + -tickSizeOuter + "V0H" + range1 + "V" + -tickSizeOuter);
          line.attr("x2", 0).attr("y2", -tickSizeInner);
          text.attr("x", 0).attr("y", -spacing).attr("dy", "0em").style("text-anchor", "middle");
          break;
        }
        case right: {
          path.attr("d", "M" + tickSizeOuter + "," + range0 + "H0V" + range1 + "H" + tickSizeOuter);
          line.attr("y2", 0).attr("x2", tickSizeInner);
          text.attr("y", 0).attr("x", spacing).attr("dy", ".32em").style("text-anchor", "start");
          break;
        }
        case bottom: {
          path.attr("d", "M" + range0 + "," + tickSizeOuter + "V0H" + range1 + "V" + tickSizeOuter);
          line.attr("x2", 0).attr("y2", tickSizeInner);
          text.attr("x", 0).attr("y", spacing).attr("dy", ".71em").style("text-anchor", "middle");
          break;
        }
        case left: {
          path.attr("d", "M" + -tickSizeOuter + "," + range0 + "H0V" + range1 + "H" + -tickSizeOuter);
          line.attr("y2", 0).attr("x2", -tickSizeInner);
          text.attr("y", 0).attr("x", -spacing).attr("dy", ".32em").style("text-anchor", "end");
          break;
        }
      }

      selection.each(function() { this.__axis = position; });
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

  exports.version = version;
  exports.axisTop = axisTop;
  exports.axisRight = axisRight;
  exports.axisBottom = axisBottom;
  exports.axisLeft = axisLeft;

}));