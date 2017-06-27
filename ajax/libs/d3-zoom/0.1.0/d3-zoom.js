(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-dispatch'), require('d3-drag'), require('d3-interpolate'), require('d3-selection'), require('d3-transition')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-drag', 'd3-interpolate', 'd3-selection', 'd3-transition'], factory) :
  (factory((global.d3_zoom = global.d3_zoom || {}),global.d3_dispatch,global.d3_drag,global.d3_interpolate,global.d3_selection,global.d3_transition));
}(this, function (exports,d3Dispatch,d3Drag,d3Interpolate,d3Selection,d3Transition) { 'use strict';

  var version = "0.1.0";

  function constant(x) {
    return function() {
      return x;
    };
  }

  function ZoomEvent(target, type, transform) {
    this.target = target;
    this.type = type;
    this.transform = transform;
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  var identity = new Transform(1, 0, 0);

  transform.prototype = Transform.prototype;

  function transform(node) {
    return node && node.__zoom || identity;
  }

  function nopropagation() {
    d3Selection.event.stopImmediatePropagation();
  }

  function noevent() {
    d3Selection.event.preventDefault();
    d3Selection.event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  function defaultFilter() {
    return !d3Selection.event.button;
  }

  function defaultSize() {
    var node = this.ownerSVGElement || this;
    return [node.clientWidth, node.clientHeight];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function zoom(started) {
    var filter = defaultFilter,
        size = defaultSize,
        k0 = 0,
        k1 = Infinity,
        duration = 250,
        gestures = [],
        listeners = d3Dispatch.dispatch("start", "zoom", "end").on("start", started),
        mousemoving,
        touchstarting,
        touchending,
        touchDelay = 500,
        wheelTimer,
        wheelDelay = 150;

    function zoom(selection) {
      selection
          .on("wheel.zoom", wheeled)
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
          .property("__zoom", defaultTransform);
    }

    zoom.transform = function(collection, transform) {
      var selection = collection.selection ? collection.selection() : collection;
      transform = clamp(transform);
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
              .start()
              .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
              .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      });
    };

    zoom.scaleTo = function(selection, k) {
      zoom.transform(selection, function() {
        var t0 = this.__zoom,
            p0 = (p0 = size.apply(this, arguments), [p0[0] / 2, p0[1] / 2]),
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return translate(scale(t0, k1), p0, p1);
      });
    };

    zoom.translateBy = function(selection, x, y) {
      zoom.transform(selection, function() {
        return this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        );
      });
    };

    function clamp(transform) {
      return function() {
        var t = typeof transform === "function" ? transform.apply(this, arguments) : transform;
        if (k0 > t.k || t.k > k1) {
          var p0 = (p0 = size.apply(this, arguments), [p0[0] / 2, p0[1] / 2]),
              p1 = t.invert(p0);
          t = translate(scale(t, t.k), p0, p1);
        }
        return t;
      };
    }

    function scale(transform, k) {
      return new Transform(Math.max(k0, Math.min(k1, k)), transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      return p1 = transform.apply(p1), new Transform(transform.k, transform.x + p0[0] - p1[0], transform.y + p0[1] - p1[1]);
    }

    function schedule(transition, transform, center) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
          .tween("zoom:zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args),
                s = size.apply(that, args),
                p = center || [s[0] / 2, s[1] / 2],
                w = Math.max(s[0], s[1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = d3Interpolate.interpolateZoom(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args) {
      for (var i = 0, n = gestures.length, g; i < n; ++i) {
        if ((g = gestures[i]).that === that) {
          return g;
        }
      }
      return new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.index = -1;
      this.active = 0;
    }

    Gesture.prototype = {
      start: function() {
        if (++this.active === 1) {
          this.index = gestures.push(this) - 1;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.wheel && key !== "wheel") this.wheel[1] = transform.invert(this.wheel[0]);
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          gestures.splice(this.index, 1);
          this.index = -1;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        d3Selection.customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
      }
    };

    function wheeled() {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, arguments),
          p0,
          p1,
          y = -d3Selection.event.deltaY * (d3Selection.event.deltaMode ? 120 : 1) / 500,
          t = this.__zoom,
          k = t.k;

      // If this wheel event won’t trigger a transform change, ignore it.
      if (y === 0 || (y < 0 && k === k0) || (y > 0 && k === k1)) return;

      // If there were recently wheel events, use the existing point and location.
      if (g.wheel) {
        p0 = g.wheel[0], p1 = g.wheel[1];
        clearTimeout(wheelTimer);
      }

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.wheel = [p0 = d3Selection.mouse(this), p1 = t.invert(p0)];
        d3Transition.interrupt(this);
        g.start();
      }

      noevent();
      wheelTimer = setTimeout(wheelidled, wheelDelay);
      g.zoom("wheel", translate(scale(t, k * Math.pow(2, y)), p0, p1));

      function wheelidled() {
        wheelTimer = null;
        delete g.wheel;
        g.end();
      }
    }

    function mousedowned() {
      if (touchending || !filter.apply(this, arguments)) return;
      var g = gesture(this, arguments),
          v = d3Selection.select(d3Selection.event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p0 = d3Selection.mouse(this),
          p1 = this.__zoom.invert(p0);

      d3Drag.dragDisable(d3Selection.event.view);
      nopropagation();
      mousemoving = false;
      g.mouse = [p0, p1];
      d3Transition.interrupt(this);
      g.start();

      function mousemoved() {
        noevent();
        mousemoving = true;
        g.zoom("mouse", translate(g.that.__zoom, g.mouse[0] = d3Selection.mouse(g.that), g.mouse[1]));
      }

      function mouseupped() {
        v.on("mousemove.zoom mouseup.zoom", null);
        d3Drag.dragEnable(d3Selection.event.view, mousemoving);
        noevent();
        delete g.mouse;
        g.end();
      }
    }

    function dblclicked() {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = d3Selection.mouse(this),
          p1 = t0.invert(p0),
          k1 = t0.k * (d3Selection.event.shiftKey ? 0.5 : 2),
          t1 = translate(scale(t0, k1), p0, p1);

      noevent();
      if (duration > 0) d3Selection.select(this).transition().duration(duration).call(schedule, t1, p0);
      else d3Selection.select(this).call(zoom.transform, t1);
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, arguments),
          touches = d3Selection.event.changedTouches,
          n = touches.length, i, t, p;

      nopropagation();
      for (i = 0; i < n; ++i) {
        t = touches[i], p = d3Selection.touch(this, touches, t.identifier);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p;
        else if (!g.touch1) g.touch1 = p;
      }
      if (touchstarting) {
        touchstarting = clearTimeout(touchstarting);
        if (!g.touch1) return g.end(), dblclicked.apply(this, arguments);
      }
      if (d3Selection.event.touches.length === n) {
        touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        d3Transition.interrupt(this);
        g.start();
      }
    }

    function touchmoved() {
      var g = gesture(this, arguments),
          touches = d3Selection.event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent();
      if (touchstarting) touchstarting = clearTimeout(touchstarting);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = d3Selection.touch(this, touches, t.identifier);
        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1],
            p1 = g.touch1[0], l1 = g.touch1[1],
            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      }
      else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
      else return;
      g.zoom("touch", translate(t, p, l));
    }

    function touchended() {
      var g = gesture(this, arguments),
          touches = d3Selection.event.changedTouches,
          n = touches.length, i, t;

      nopropagation();
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (!g.touch0) g.end();
    }

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
    };

    zoom.size = function(_) {
      return arguments.length ? (size = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), zoom) : size;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (k0 = +_[0], k1 = +_[1], zoom) : [k0, k1];
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    return zoom;
  }

  exports.version = version;
  exports.zoom = zoom;
  exports.zoomTransform = transform;

}));