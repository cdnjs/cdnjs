(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-dispatch'), require('d3-drag'), require('d3-interpolate'), require('d3-selection'), require('d3-transition')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-drag', 'd3-interpolate', 'd3-selection', 'd3-transition'], factory) :
  (factory((global.d3_brush = global.d3_brush || {}),global.d3_dispatch,global.d3_drag,global.d3_interpolate,global.d3_selection,global.d3_transition));
}(this, function (exports,d3Dispatch,d3Drag,d3Interpolate,d3Selection,d3Transition) { 'use strict';

  var version = "0.1.0";

  function constant(x) {
    return function() {
      return x;
    };
  }

  function BrushEvent(target, type, selection) {
    this.target = target;
    this.type = type;
    this.selection = selection;
  }

  var MODE_DRAG = {name: "drag"};
  var MODE_SPACE = {name: "space"};
  var MODE_RESIZE = {name: "resize"};
  var MODE_CENTER = {name: "center"};
  var X = {
    name: "x",
    resize: ["e", "w"].map(type),
    input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
    output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
  };

  var Y = {
    name: "y",
    resize: ["n", "s"].map(type),
    input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
    output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
  };

  var XY = {
    name: "xy",
    resize: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
    input: function(xy) { return xy; },
    output: function(xy) { return xy; }
  };

  var cursors = {
    background: "crosshair",
    selection: "move",
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };

  var flipX = {
    e: "w",
    w: "e",
    nw: "ne",
    ne: "nw",
    se: "sw",
    sw: "se"
  };

  var flipY = {
    n: "s",
    s: "n",
    nw: "sw",
    ne: "se",
    se: "ne",
    sw: "nw"
  };

  var signsX = {
    background: +1,
    selection: +1,
    n: null,
    e: +1,
    s: null,
    w: -1,
    nw: -1,
    ne: +1,
    se: +1,
    sw: -1
  };

  var signsY = {
    background: +1,
    selection: +1,
    n: -1,
    e: null,
    s: +1,
    w: null,
    nw: -1,
    ne: -1,
    se: +1,
    sw: +1
  };

  function type(t) {
    return {type: t};
  }

  function defaultExtent() {
    var svg = this.ownerSVGElement;
    return [[0, 0], svg
        ? [svg.width.baseVal.value, svg.height.baseVal.value]
        : [this.clientWidth, this.clientHeight]];
  }

  // Like d3.local, but with the name “__brush” rather than auto-generated.
  function local(node) {
    while (!node.__brush) if (!(node = node.parentNode)) return;
    return node.__brush;
  }

  function brushX() {
    return brush$1(X);
  }

  function brushY() {
    return brush$1(Y);
  }

  function brush() {
    return brush$1(XY);
  }

  function brush$1(dim) {
    var extent = defaultExtent,
        listeners = d3Dispatch.dispatch(brush, "start", "brush", "end");

    function brush(group) {
      var background = group
          .property("__brush", initialize)
        .selectAll(".background")
        .data([type("background")]);

      background.enter().append("rect")
          .attr("class", "background")
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .attr("cursor", cursors.background)
        .merge(background)
          .each(function() {
            var extent = local(this).extent;
            d3Selection.select(this)
                .attr("x", extent[0][0])
                .attr("y", extent[0][1])
                .attr("width", extent[1][0] - extent[0][0])
                .attr("height", extent[1][1] - extent[0][1]);
          });

      group.selectAll(".selection")
        .data([type("selection")])
        .enter().append("rect")
          .attr("class", "selection")
          .attr("cursor", cursors.selection)
          .attr("fill", "rgba(0,0,0,0.15)");

      var resize = group.selectAll(".resize")
        .data(dim.resize, function(d) { return d.type; });

      resize.exit().remove();

      resize.enter().append("rect")
          .attr("class", function(d) { return "resize resize--" + d.type; })
          .attr("cursor", function(d) { return cursors[d.type]; })
          .attr("fill", "none");

      group
          .each(redraw)
          .attr("pointer-events", "all")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
          .on("mousedown.brush", mousedowned);
    }

    brush.move = function(group, selection) {
      if (group.selection) {
        group
            .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
            .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
            .tween("brush", function() {
              var that = this,
                  state = that.__brush,
                  emit = emitter(that, arguments),
                  selection0 = state.selection,
                  selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
                  i = d3Interpolate.interpolate(selection0, selection1);

              function tween(t) {
                state.selection = i(t);
                redraw.call(that);
                emit.brush();
              }

              return selection0 && selection1 ? tween : tween(1);
            });
      } else {
        group
            .each(function() {
              var that = this,
                  args = arguments,
                  emit = emitter(that, args).beforestart(),
                  state = that.__brush;

              d3Transition.interrupt(that);
              state.selection = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent);
              redraw.call(that);
              emit.start().brush().end();
            });
      }
    };

    function redraw() {
      var group = d3Selection.select(this),
          selection = local(this).selection;

      if (selection) {
        group.selectAll(".selection")
            .style("display", null)
            .attr("x", selection[0][0])
            .attr("y", selection[0][1])
            .attr("width", selection[1][0] - selection[0][0])
            .attr("height", selection[1][1] - selection[0][1]);

        group.selectAll(".resize")
            .style("display", null)
            .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - 3 : selection[0][0] - 3; })
            .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - 3 : selection[0][1] - 3; })
            .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + 6 : 6; })
            .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + 6 : 6; });
      }

      else {
        group.selectAll(".selection,.resize")
            .style("display", "none")
            .attr("x", null)
            .attr("y", null)
            .attr("width", null)
            .attr("height", null);
      }
    }

    function emitter(that, args) {
      return that.__brush.emitter || new Emitter(that, args);
    }

    function Emitter(that, args) {
      this.that = that;
      this.args = args;
      this.state = that.__brush;
      this.active = 0;
    }

    Emitter.prototype = {
      beforestart: function() {
        if (++this.active === 1) this.state.emitter = this, this.starting = true;
        return this;
      },
      start: function() {
        if (this.starting) this.starting = false, this.emit("start");
        return this;
      },
      brush: function() {
        this.emit("brush");
        return this;
      },
      end: function() {
        if (--this.active === 0) delete this.state.emitter, this.emit("end");
        return this;
      },
      emit: function(type) {
        d3Selection.customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
      }
    };

    function mousedowned() {
      var that = this,
          type = event.target.__data__.type,
          mode = (event.metaKey ? type = "background" : type) === "selection" ? MODE_DRAG : (event.altKey ? MODE_CENTER : MODE_RESIZE),
          signX = dim === Y ? null : signsX[type],
          signY = dim === X ? null : signsY[type],
          state = local(that),
          extent = state.extent,
          selection = state.selection,
          W = extent[0][0], w0, w1,
          N = extent[0][1], n0, n1,
          E = extent[1][0], e0, e1,
          S = extent[1][1], s0, s1,
          dx, dy,
          point0 = d3Selection.mouse(that),
          point,
          emit = emitter(that, arguments).beforestart();

      if (type === "background") {
        state.selection = selection = [
          [
            w0 = dim === Y ? W : point0[0],
            n0 = dim === X ? N : point0[1]
          ],
          [
            e0 = dim === Y ? E : w0,
            s0 = dim === X ? S : n0
          ]
        ];
      } else {
        w0 = selection[0][0];
        n0 = selection[0][1];
        e0 = selection[1][0];
        s0 = selection[1][1];
      }

      w1 = w0;
      n1 = n0;
      e1 = e0;
      s1 = s0;

      var view = d3Selection.select(event.view)
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)
          .on("mousemove.brush", mousemoved, true)
          .on("mouseup.brush", mouseupped, true);

      var group = d3Selection.select(that)
          .attr("pointer-events", "none");

      var background = group.selectAll(".background")
          .attr("cursor", cursors[type]);

      d3Transition.interrupt(that);
      d3Drag.dragDisable(event.view);
      redraw.call(that);
      emit.start();

      function mousemoved() {
        point = d3Selection.mouse(that);
        move();
      }

      function move() {
        var t;

        dx = point[0] - point0[0];
        dy = point[1] - point0[1];

        switch (mode) {
          case MODE_SPACE:
          case MODE_DRAG: {
            if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
            if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
            break;
          }
          case MODE_RESIZE: {
            if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
            else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
            if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
            else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
            break;
          }
          case MODE_CENTER: {
            if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
            if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
            break;
          }
        }

        if (e1 < w1) {
          signX *= -1;
          t = w0, w0 = e0, e0 = t;
          t = w1, w1 = e1, e1 = t;
          if (type in flipX) background.attr("cursor", cursors[type = flipX[type]]);
        }

        if (s1 < n1) {
          signY *= -1;
          t = n0, n0 = s0, s0 = t;
          t = n1, n1 = s1, s1 = t;
          if (type in flipY) background.attr("cursor", cursors[type = flipY[type]]);
        }

        if (selection[0][0] !== w1
            || selection[0][1] !== n1
            || selection[1][0] !== e1
            || selection[1][1] !== s1) {
          selection[0][0] = w1;
          selection[0][1] = n1;
          selection[1][0] = e1;
          selection[1][1] = s1;
          redraw.call(that);
          emit.brush();
        }
      }

      function mouseupped() {
        d3Drag.dragEnable(event.view);
        group.attr("pointer-events", "all");
        background.attr("cursor", cursors.background);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
        if (w1 === e1 || n1 === s1) state.selection = null, redraw.call(that);
        emit.end();
      }

      function keydowned() {
        switch (event.keyCode) {
          case 18: { // ALT
            if (mode === MODE_RESIZE) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
              move();
            }
            break;
          }
          case 32: { // SPACE; takes priority over ALT
            if (mode === MODE_RESIZE || mode === MODE_CENTER) {
              if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
              if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
              mode = MODE_SPACE;
              background.attr("cursor", cursors.selection);
              move();
            }
            break;
          }
          case 16: { // SHIFT
            break;
          }
          default: return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
      }

      function keyupped() {
        switch (event.keyCode) {
          case 18: { // ALT
            if (mode === MODE_CENTER) {
              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
              mode = MODE_RESIZE;
              move();
            }
            break;
          }
          case 32: { // SPACE
            if (mode === MODE_SPACE) {
              if (event.altKey) {
                if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
                if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
                mode = MODE_CENTER;
              } else {
                if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
                if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
                mode = MODE_RESIZE;
              }
              background.attr("cursor", cursors[type]);
              move();
            }
            break;
          }
          case 16: { // SHIFT
            break;
          }
          default: return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }

    function initialize() {
      var state = this.__brush || {selection: null};
      state.extent = extent.apply(this, arguments);
      return state;
    }

    brush.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
    };

    brush.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? brush : value;
    };

    return brush;
  }

  exports.version = version;
  exports.brush = brush;
  exports.brushX = brushX;
  exports.brushY = brushY;

}));