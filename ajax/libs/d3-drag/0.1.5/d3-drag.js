(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-dispatch'), require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-selection'], factory) :
  (factory((global.d3_drag = global.d3_drag || {}),global.d3_dispatch,global.d3_selection));
}(this, function (exports,d3Dispatch,d3Selection) { 'use strict';

  var version = "0.1.5";

  function nopropagation() {
    d3Selection.event.stopImmediatePropagation();
  }

  function noevent() {
    d3Selection.event.preventDefault();
    d3Selection.event.stopImmediatePropagation();
  }

  function nodrag(view) {
    var root = view.document.documentElement,
        selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent, true);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = d3Selection.select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent, true);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function DragEvent(type, subject, id, active, x, y, dx, dy, dispatch) {
    this.type = type;
    this.subject = subject;
    this.identifier = id;
    this.active = active;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this._ = dispatch;
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter() {
    return !d3Selection.event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(d) {
    return d == null ? {x: d3Selection.event.x, y: d3Selection.event.y} : d;
  }

  function defaultX() {
    return d3Selection.event.subject.x;
  }

  function defaultY() {
    return d3Selection.event.subject.y;
  }

  function drag(started) {
    var filter = defaultFilter,
        container = defaultContainer,
        subject = defaultSubject,
        x = defaultX,
        y = defaultY,
        gestures = {},
        listeners = d3Dispatch.dispatch("start", "drag", "end").on("start", started),
        active = 0,
        mousemoving,
        touchending;

    function drag(selection) {
      selection
          .on("mousedown.drag", mousedowned)
          .on("touchstart.drag", touchstarted)
          .on("touchmove.drag", touchmoved)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned() {
      if (touchending || !filter.apply(this, arguments)) return;
      var gesture = beforestart("mouse", container.apply(this, arguments), d3Selection.mouse, this, arguments);
      if (!gesture) return;
      d3Selection.select(d3Selection.event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
      nodrag(d3Selection.event.view);
      nopropagation();
      mousemoving = false;
      gesture("start");
    }

    function mousemoved() {
      noevent();
      mousemoving = true;
      gestures.mouse("drag");
    }

    function mouseupped() {
      d3Selection.select(d3Selection.event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(d3Selection.event.view, mousemoving);
      noevent();
      gestures.mouse("end");
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var touches = d3Selection.event.changedTouches,
          c = container.apply(this, arguments),
          n = touches.length, i, gesture;

      nopropagation();
      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(touches[i].identifier, c, d3Selection.touch, this, arguments)) {
          gesture("start");
        }
      }
    }

    function touchmoved() {
      var touches = d3Selection.event.changedTouches,
          n = touches.length, i, gesture;

      noevent();
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          gesture("drag");
        }
      }
    }

    function touchended() {
      var touches = d3Selection.event.changedTouches,
          n = touches.length, i, gesture;

      nopropagation();
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          gesture("end");
        }
      }
    }

    function beforestart(id, container, point, that, args) {
      var p = point(container, id), dx, dy,
          sublisteners = listeners.copy(),
          node;

      if (!d3Selection.customEvent(new DragEvent("beforestart", node, id, active, p[0], p[1], 0, 0, sublisteners), function() {
        if ((d3Selection.event.subject = node = subject.apply(that, args)) == null) return false;
        dx = x.apply(that, args) - p[0] || 0;
        dy = y.apply(that, args) - p[1] || 0;
        return true;
      })) return;

      return function gesture(type) {
        var p0 = p, n;
        switch (type) {
          case "start": gestures[id] = gesture, n = active++; break;
          case "end": delete gestures[id], --active; // nobreak
          case "drag": p = point(container, id), n = active; break;
        }
        d3Selection.customEvent(new DragEvent(type, node, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
      };
    }

    drag.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), drag) : filter;
    };

    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant(_), drag) : container;
    };

    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant(_), drag) : subject;
    };

    drag.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), drag) : x;
    };

    drag.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), drag) : y;
    };

    drag.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };

    return drag;
  }

  exports.version = version;
  exports.drag = drag;
  exports.dragDisable = nodrag;
  exports.dragEnable = yesdrag;

}));