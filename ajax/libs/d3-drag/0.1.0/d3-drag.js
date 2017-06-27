(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-dispatch'), require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-selection'], factory) :
  (factory((global.d3_drag = global.d3_drag || {}),global.d3_dispatch,global.d3_selection));
}(this, function (exports,d3Dispatch,d3Selection) { 'use strict';

  var version = "0.1.0";

  function cancel() {
    var e = d3Selection.event, s;
    while (s = e.sourceEvent) e = s;
    e.preventDefault();
    e.stopPropagation();
  }

  function constant(x) {
    return function() {
      return x;
    };
  }

  function DragEvent(type, subject, id, x, y, dispatch) {
    this.type = type;
    this.subject = subject;
    this.identifier = id;
    this.x = x;
    this.y = y;
    this._ = dispatch;
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  function noclick() {
    d3Selection.event.on("drag.noclick", null).on("end.noclick", function() {
      var click = "click.noclick-" + d3Selection.event.identifier,
          view = d3Selection.select(d3Selection.event.sourceEvent.view).on(click, cancel, true);
      setTimeout(function() { view.on(click, null); }, 0);
    });
  }

  function nodrag() {
    var dragstart = "dragstart.nodrag-" + d3Selection.event.identifier,
        view = d3Selection.select(d3Selection.event.sourceEvent.view).on(dragstart, cancel, true);
    d3Selection.event.on("end.nodrag", function() {
      view.on(dragstart, null);
    });
  }

  function noselectstart() {
    var selectstart = "selectstart.noselect-" + d3Selection.event.identifier,
        view = d3Selection.select(d3Selection.event.sourceEvent.view).on(selectstart, cancel, true);
    d3Selection.event.on("end.noselect", function() {
      view.on(selectstart, null);
    });
  }

  function nouserselect() {
    var style = this.ownerDocument.documentElement.style,
        value = style.MozUserSelect;
    style.MozUserSelect = "none";
    d3Selection.event.on("end.noselect", function() {
      style.MozUserSelect = value;
    });
  }

  function noselect() {
    return ("onselectstart" in this ? noselectstart : nouserselect).apply(this, arguments);
  }

  // Ignore right-click, since that should open the context menu.
  function defaultFilter() {
    return !d3Selection.event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(d) {
    return d == null ? this : d;
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
        active = {};

    // I’d like to call preventDefault on mousedown to disable native dragging
    // of links or images and native text selection. However, in Chrome this
    // causes mousemove and mouseup events outside an iframe to be dropped:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=269917
    // And if you preventDefault on touchstart on iOS, it prevents the click
    // event on touchend, even if there was no touchmove! So instead, we
    // cancel the specific undesirable behaviors. If you want to change this
    // behavior, you can unregister these listeners!

    var listeners = d3Dispatch.dispatch("start", "drag", "end")
        .on("start.nodrag", nodrag)
        .on("start.noselect", noselect)
        .on("start", started)
        .on("drag.noclick", noclick)
        .on("drag.noscroll", cancel);

    function drag(selection) {
      selection
          .on("mousedown.drag", mousedowned)
          .on("touchstart.drag", touchstarted)
          .on("touchmove.drag", touchmoved)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned() {
      if (!filter.apply(this, arguments)) return;
      var parent = container.apply(this, arguments);
      if (!start("mouse", parent, d3Selection.mouse, this, arguments)) return;
      d3Selection.select(d3Selection.event.view).on("mousemove.drag", mousemoved).on("mouseup.drag", mouseupped);
    }

    function mousemoved() {
      active.mouse("drag");
    }

    function mouseupped() {
      var m = active.mouse;
      d3Selection.select(d3Selection.event.view).on("mousemove.drag mouseup.drag", null);
      delete active.mouse;
      m("end");
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var parent = container.apply(this, arguments);
      for (var touches = d3Selection.event.changedTouches, i = 0, n = touches.length; i < n; ++i) {
        start(touches[i].identifier, parent, d3Selection.touch, this, arguments);
      }
    }

    function touchmoved() {
      for (var touches = d3Selection.event.changedTouches, i = 0, n = touches.length, t; i < n; ++i) {
        if (t = active[touches[i].identifier]) {
          t("drag");
        }
      }
    }

    function touchended() {
      for (var touches = d3Selection.event.changedTouches, i = 0, n = touches.length, t; i < n; ++i) {
        if (t = active[touches[i].identifier]) {
          delete active[touches[i].identifier];
          t("end");
        }
      }
    }

    function start(id, parent, point, that, args) {
      var p0 = point(parent, id), dx, dy,
          sublisteners = listeners.copy(),
          node;

      if (!d3Selection.customEvent(new DragEvent("beforestart", node, id, p0[0], p0[1], sublisteners), function() {
        node = d3Selection.event.subject = subject.apply(that, args);
        if (node == null) return false;
        dx = x.apply(that, args) - p0[0] || 0;
        dy = y.apply(that, args) - p0[1] || 0;
        return true;
      })) return false;

      (active[id] = function(type, p) {
        if (p == null) p = point(parent, id);
        d3Selection.customEvent(new DragEvent(type, node, id, p[0] + dx, p[1] + dy, sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
      })("start", p0);

      return true;
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

}));