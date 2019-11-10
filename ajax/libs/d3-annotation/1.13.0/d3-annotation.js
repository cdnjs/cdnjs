(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// https://d3js.org/d3-dispatch/ Version 1.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

exports.dispatch = dispatch;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
// https://d3js.org/d3-drag/ Version 1.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-dispatch'), require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-dispatch', 'd3-selection'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3,global.d3));
}(this, (function (exports,d3Dispatch,d3Selection) { 'use strict';

function nopropagation() {
  d3Selection.event.stopImmediatePropagation();
}

var noevent = function() {
  d3Selection.event.preventDefault();
  d3Selection.event.stopImmediatePropagation();
};

var nodrag = function(view) {
  var root = view.document.documentElement,
      selection = d3Selection.select(view).on("dragstart.drag", noevent, true);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
};

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

var constant = function(x) {
  return function() {
    return x;
  };
};

function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch$$1) {
  this.target = target;
  this.type = type;
  this.subject = subject;
  this.identifier = id;
  this.active = active;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch$$1;
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

var drag = function() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      gestures = {},
      listeners = d3Dispatch.dispatch("start", "drag", "end"),
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

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches[i].identifier, c, d3Selection.touch, this, arguments)) {
        nopropagation();
        gesture("start");
      }
    }
  }

  function touchmoved() {
    var touches = d3Selection.event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent();
        gesture("drag");
      }
    }
  }

  function touchended() {
    var touches = d3Selection.event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation();
        gesture("end");
      }
    }
  }

  function beforestart(id, container, point, that, args) {
    var p = point(container, id), s, dx, dy,
        sublisteners = listeners.copy();

    if (!d3Selection.customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((d3Selection.event.subject = s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;

    return function gesture(type) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[id] = gesture, n = active++; break;
        case "end": delete gestures[id], --active; // nobreak
        case "drag": p = point(container, id), n = active; break;
      }
      d3Selection.customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
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

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  return drag;
};

exports.drag = drag;
exports.dragDisable = nodrag;
exports.dragEnable = yesdrag;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-dispatch":1,"d3-selection":4}],3:[function(require,module,exports){
// https://d3js.org/d3-path/ Version 1.0.3. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, (function (exports) { 'use strict';

var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Otherwise, draw an arc!
    else {
      if (da < 0) da = da % tau + tau;
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

exports.path = path;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(require,module,exports){
// https://d3js.org/d3-selection/ Version 1.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  var nextId = 0;

  function local() {
    return new Local;
  }

  function Local() {
    this._ = "@" + (++nextId).toString(36);
  }

  Local.prototype = local.prototype = {
    constructor: Local,
    get: function(node) {
      var id = this._;
      while (!(id in node)) if (!(node = node.parentNode)) return;
      return node[id];
    },
    set: function(node, value) {
      return node[this._] = value;
    },
    remove: function(node) {
      return this._ in node && delete node[this._];
    },
    toString: function() {
      return this._;
    }
  };

  var matcher = function(selector) {
    return function() {
      return this.matches(selector);
    };
  };

  if (typeof document !== "undefined") {
    var element = document.documentElement;
    if (!element.matches) {
      var vendorMatches = element.webkitMatchesSelector
          || element.msMatchesSelector
          || element.mozMatchesSelector
          || element.oMatchesSelector;
      matcher = function(selector) {
        return function() {
          return vendorMatches.call(this, selector);
        };
      };
    }
  }

  var matcher$1 = matcher;

  var filterEvents = {};

  exports.event = null;

  if (typeof document !== "undefined") {
    var element$1 = document.documentElement;
    if (!("onmouseenter" in element$1)) {
      filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
    }
  }

  function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function(event) {
      var related = event.relatedTarget;
      if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
        listener.call(this, event);
      }
    };
  }

  function contextListener(listener, index, group) {
    return function(event1) {
      var event0 = exports.event; // Events can be reentrant (e.g., focus).
      exports.event = event1;
      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        exports.event = event0;
      }
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function(d, i, group) {
      var on = this.__on, o, listener = wrap(value, i, group);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
          this.addEventListener(o.type, o.listener = listener, o.capture = capture);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, capture);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, capture) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    if (capture == null) capture = false;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
    return this;
  }

  function customEvent(event1, listener, that, args) {
    var event0 = exports.event;
    event1.sourceEvent = exports.event;
    exports.event = event1;
    try {
      return listener.apply(that, args);
    } finally {
      exports.event = event0;
    }
  }

  function sourceEvent() {
    var current = exports.event, source;
    while (source = current.sourceEvent) current = source;
    return current;
  }

  function point(node, event) {
    var svg = node.ownerSVGElement || node;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    var rect = node.getBoundingClientRect();
    return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
  }

  function mouse(node) {
    var event = sourceEvent();
    if (event.changedTouches) event = event.changedTouches[0];
    return point(node, event);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function selection_selectAll(select) {
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher$1(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant(x) {
    return function() {
      return x;
    };
  }

  var keyPrefix = "$"; // Protect against keys like “__proto__”.

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = {},
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
        if (keyValue in nodeByKeyValue) {
          exit[i] = node;
        } else {
          nodeByKeyValue[keyValue] = node;
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = keyPrefix + key.call(parent, data[i], i, data);
      if (node = nodeByKeyValue[keyValue]) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue[keyValue] = null;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
        exit[i] = node;
      }
    }
  }

  function selection_data(value, key) {
    if (!value) {
      data = new Array(this.size()), j = -1;
      this.each(function(d) { data[++j] = d; });
      return data;
    }

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = value.call(parent, parent && parent.__data__, j, parents),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_merge(selection) {

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    var nodes = new Array(this.size()), i = -1;
    this.each(function() { nodes[++i] = this; });
    return nodes;
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    var size = 0;
    this.each(function() { ++size; });
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)
        : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    var node;
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove : typeof value === "function"
              ? styleFunction
              : styleConstant)(name, value, priority == null ? "" : priority))
        : defaultView(node = this.node())
            .getComputedStyle(node, null)
            .getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction
            : textConstant)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (event) {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    merge: selection_merge,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection([[document.querySelector(selector)]], [document.documentElement])
        : new Selection([[selector]], root);
  }

  function selectAll(selector) {
    return typeof selector === "string"
        ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
        : new Selection([selector == null ? [] : selector], root);
  }

  function touch(node, touches, identifier) {
    if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

    for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return point(node, touch);
      }
    }

    return null;
  }

  function touches(node, touches) {
    if (touches == null) touches = sourceEvent().touches;

    for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
      points[i] = point(node, touches[i]);
    }

    return points;
  }

  exports.creator = creator;
  exports.local = local;
  exports.matcher = matcher$1;
  exports.mouse = mouse;
  exports.namespace = namespace;
  exports.namespaces = namespaces;
  exports.select = select;
  exports.selectAll = selectAll;
  exports.selection = selection;
  exports.selector = selector;
  exports.selectorAll = selectorAll;
  exports.touch = touch;
  exports.touches = touches;
  exports.window = defaultView;
  exports.customEvent = customEvent;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
},{}],5:[function(require,module,exports){
// https://d3js.org/d3-shape/ Version 1.0.4. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-path')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Path) { 'use strict';

var constant$1 = function(x) {
  return function constant() {
    return x;
  };
};

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

var arc = function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant$1(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = Math.abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = d3Path.path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau - epsilon) {
      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * Math.sin(ap)),
            p1 = asin(rp / r1 * Math.sin(ap));
        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * Math.cos(a01),
          y01 = r1 * Math.sin(a01),
          x10 = r0 * Math.cos(a10),
          y10 = r0 * Math.sin(a10);

      // Apply rounded corners?
      if (rc > epsilon) {
        var x11 = r1 * Math.cos(a11),
            y11 = r1 * Math.sin(a11),
            x00 = r0 * Math.cos(a00),
            y00 = r0 * Math.sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi) {
          var oc = da0 > epsilon ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$1(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
};

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

var curveLinear = function(context) {
  return new Linear(context);
};

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

var line = function() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant$1(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
};

var area = function() {
  var x0 = x,
      x1 = null,
      y0 = constant$1(0),
      y1 = y,
      defined = constant$1(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
};

var descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var identity = function(d) {
  return d;
};

var pie = function() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant$1(0),
      endAngle = constant$1(tau),
      padAngle = constant$1(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$1(+_), pie) : padAngle;
  };

  return pie;
};

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function radialLine(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

var radialLine$1 = function() {
  return radialLine(line().curve(curveRadialLinear));
};

var radialArea = function() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
};

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810;
var kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10);
var kx = Math.sin(tau / 10) * kr;
var ky = -Math.cos(tau / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5;
var s = Math.sqrt(3) / 2;
var k = 1 / Math.sqrt(12);
var a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

var symbol = function() {
  var type = constant$1(circle),
      size = constant$1(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = d3Path.path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};

var noop = function() {};

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basis = function(context) {
  return new Basis(context);
};

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisClosed = function(context) {
  return new BasisClosed(context);
};

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisOpen = function(context) {
  return new BasisOpen(context);
};

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

var linearClosed = function(context) {
  return new LinearClosed(context);
};

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

var natural = function(context) {
  return new Natural(context);
};

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

var step = function(context) {
  return new Step(context, 0.5);
};

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

var slice = Array.prototype.slice;

var none = function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (var j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
};

var none$1 = function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
};

function stackValue(d, key) {
  return d[key];
}

var stack = function() {
  var keys = constant$1([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant$1(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
};

var expand = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
};

var silhouette = function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
};

var wiggle = function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
};

var ascending = function(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
};

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

var descending$1 = function(series) {
  return ascending(series).reverse();
};

var insideOut = function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = none$1(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
};

var reverse = function(series) {
  return none$1(series).reverse();
};

exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.radialArea = radialArea;
exports.radialLine = radialLine$1;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle;
exports.symbolCross = cross;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetNone = none;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = annotation;

var _Annotation = require('./Annotation');

var _Annotation2 = _interopRequireDefault(_Annotation);

var _AnnotationCollection = require('./AnnotationCollection');

var _AnnotationCollection2 = _interopRequireDefault(_AnnotationCollection);

var _TypesD = require('./Types-d3');

var _d3Selection = require('d3-selection');

var _d3Dispatch = require('d3-dispatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function annotation() {
  var annotations = [],
      collection = void 0,
      context = void 0,
      //TODO: add canvas functionality
  disable = [],
      accessors = {},
      accessorsInverse = {},
      editMode = false,
      ids = void 0,
      type = _TypesD.d3Callout,
      textWrap = void 0,
      notePadding = void 0,
      annotationDispatcher = (0, _d3Dispatch.dispatch)("subjectover", "subjectout", "subjectclick", "connectorover", "connectorout", "connectorclick", "noteover", "noteout", "noteclick"),
      sel = void 0;

  var annotation = function annotation(selection) {
    sel = selection;
    //TODO: check to see if this is still needed    
    if (!editMode) {
      selection.selectAll("circle.handle").remove();
    }

    var translatedAnnotations = annotations.map(function (a) {
      if (!a.type) {
        a.type = type;
      }
      if (!a.disable) {
        a.disable = disable;
      }
      return new _Annotation2.default(a);
    });

    collection = new _AnnotationCollection2.default({
      annotations: translatedAnnotations,
      accessors: accessors,
      accessorsInverse: accessorsInverse,
      ids: ids
    });

    var annotationG = selection.selectAll('g').data([collection]);
    annotationG.enter().append('g').attr('class', 'annotations');

    var group = selection.select('g.annotations');
    (0, _TypesD.newWithClass)(group, collection.annotations, 'g', 'annotation');

    var annotation = group.selectAll('g.annotation');

    annotation.each(function (d) {
      var a = (0, _d3Selection.select)(this);

      a.attr('class', 'annotation');

      (0, _TypesD.newWithClass)(a, [d], 'g', 'annotation-connector');
      (0, _TypesD.newWithClass)(a, [d], 'g', 'annotation-subject');
      (0, _TypesD.newWithClass)(a, [d], 'g', 'annotation-note');
      (0, _TypesD.newWithClass)(a.select('g.annotation-note'), [d], 'g', 'annotation-note-content');
      //d.type.name check to see if it's instantiated
      d.type = !d.type.name ? d.type : new d.type({ a: a, annotation: d, textWrap: textWrap, notePadding: notePadding, editMode: editMode,
        dispatcher: annotationDispatcher, accessors: accessors });
      d.type.draw();
    });
  };

  annotation.json = function () {
    console.log('Annotations JSON was copied to your clipboard. Please note the annotation type is not JSON compatible. It appears in the objects array in the console, but not in the copied JSON.', collection.json);
    window.copy(JSON.stringify(collection.json.map(function (a) {
      delete a.type;return a;
    })));
    return annotation;
  };

  annotation.update = function () {
    if (annotations && collection) {
      annotations = collection.annotations.map(function (a) {
        a.type.draw();return a;
      });
    }
    return annotation;
  };

  annotation.updatedAccessors = function () {
    collection.setPositionWithAccessors();
    annotations = collection.annotations;
    return annotation;
  };

  annotation.disable = function (_) {
    if (!arguments.length) return disable;
    disable = _;
    if (collection) {
      collection.updateDisable(disable);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.textWrap = function (_) {
    if (!arguments.length) return textWrap;
    textWrap = _;
    if (collection) {
      collection.updateTextWrap(textWrap);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.notePadding = function (_) {
    if (!arguments.length) return notePadding;
    notePadding = _;
    if (collection) {
      collection.updateNotePadding(notePadding);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.type = function (_, settings) {
    if (!arguments.length) return type;
    type = _;
    if (collection) {
      collection.annotations.map(function (a) {

        a.type.note && a.type.note.selectAll("*:not(.annotation-note-content)").remove();
        a.type.noteContent && a.type.noteContent.selectAll("*").remove();
        a.type.subject && a.type.subject.selectAll("*").remove();
        a.type.connector && a.type.connector.selectAll("*").remove();
        a.type.typeSettings = {};
        a.type = type;

        a.subject = settings && settings.subject || a.subject;
        a.connector = settings && settings.connector || a.connector;
        a.note = settings && settings.note || a.note;
      });

      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.annotations = function (_) {
    if (!arguments.length) return collection && collection.annotations || annotations;
    annotations = _;
    return annotation;
  };

  annotation.context = function (_) {
    if (!arguments.length) return context;
    context = _;
    return annotation;
  };

  annotation.accessors = function (_) {
    if (!arguments.length) return accessors;
    accessors = _;
    return annotation;
  };

  annotation.accessorsInverse = function (_) {
    if (!arguments.length) return accessorsInverse;
    accessorsInverse = _;
    return annotation;
  };

  annotation.ids = function (_) {
    if (!arguments.length) return ids;
    ids = _;
    return annotation;
  };

  annotation.editMode = function (_) {
    if (!arguments.length) return editMode;
    editMode = _;

    if (sel) {
      sel.selectAll('g.annotation').classed('editable', editMode);
    }

    if (collection) {
      collection.editMode(editMode);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.collection = function (_) {
    if (!arguments.length) return collection;
    collection = _;
    return annotation;
  };

  annotation.on = function () {
    var value = annotationDispatcher.on.apply(annotationDispatcher, arguments);
    return value === annotationDispatcher ? annotation : value;
  };

  return annotation;
};

},{"./Annotation":7,"./AnnotationCollection":8,"./Types-d3":23,"d3-dispatch":1,"d3-selection":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Annotation = function () {
  function Annotation(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$dy = _ref.dy,
        dy = _ref$dy === undefined ? 0 : _ref$dy,
        _ref$dx = _ref.dx,
        dx = _ref$dx === undefined ? 0 : _ref$dx,
        data = _ref.data,
        type = _ref.type,
        subject = _ref.subject,
        connector = _ref.connector,
        note = _ref.note,
        disable = _ref.disable,
        id = _ref.id,
        className = _ref.className;

    _classCallCheck(this, Annotation);

    this._dx = dx;
    this._dy = dy;
    this._x = x;
    this._y = y;
    this.id = id;
    this._className = className || '';

    this.type = type || '';
    this.data = data;

    this.note = note || {};
    this.connector = connector || {};
    this.subject = subject || {};

    this.disable = disable || [];
  }

  _createClass(Annotation, [{
    key: 'updatePosition',
    value: function updatePosition() {
      if (this.type.setPosition) {
        this.type.setPosition();
        if (this.type.subject.selectAll(':not(.handle)').nodes().length !== 0) {
          this.type.redrawSubject();
        }
      }
    }
  }, {
    key: 'updateOffset',
    value: function updateOffset() {
      if (this.type.setOffset) {
        this.type.setOffset();

        if (this.type.connector.selectAll(':not(.handle)').nodes().length !== 0) {
          this.type.redrawConnector();
        }

        this.type.redrawNote();
      }
    }
  }, {
    key: 'className',
    get: function get() {
      return this._className;
    },
    set: function set(className) {
      this._className = className;
      if (this.type.setClassName) this.type.setClassName();
    }
  }, {
    key: 'x',
    get: function get() {
      return this._x;
    },
    set: function set(x) {
      this._x = x;
      this.updatePosition();
    }
  }, {
    key: 'y',
    get: function get() {
      return this._y;
    },
    set: function set(y) {
      this._y = y;
      this.updatePosition();
    }
  }, {
    key: 'dx',
    get: function get() {
      return this._dx;
    },
    set: function set(dx) {
      this._dx = dx;
      this.updateOffset();
    }
  }, {
    key: 'dy',
    get: function get() {
      return this._dy;
    },
    set: function set(dy) {
      this._dy = dy;
      this.updateOffset();
    }
  }, {
    key: 'offset',
    get: function get() {
      return { x: this._dx, y: this._dy };
    },
    set: function set(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      this._dx = x;
      this._dy = y;
      this.updateOffset();
    }
  }, {
    key: 'position',
    get: function get() {
      return { x: this._x, y: this._y };
    },
    set: function set(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      this._x = x;
      this._y = y;
      this.updatePosition();
    }
  }, {
    key: 'translation',
    get: function get() {
      return {
        x: this._x + this._dx,
        y: this._y + this._dy
      };
    }
  }, {
    key: 'json',
    get: function get() {
      var json = {
        x: this._x,
        y: this._y,
        dx: this._dx,
        dy: this._dy
      };

      if (this.data && Object.keys(this.data).length > 0) json.data = this.data;
      if (this.type) json.type = this.type;
      if (this._className) json.className = this._className;

      if (Object.keys(this.connector).length > 0) json.connector = this.connector;
      if (Object.keys(this.subject).length > 0) json.subject = this.subject;
      if (Object.keys(this.note).length > 0) json.note = this.note;

      return json;
    }
  }]);

  return Annotation;
}();

exports.default = Annotation;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationCollection = function () {
  function AnnotationCollection(_ref) {
    var annotations = _ref.annotations,
        accessors = _ref.accessors,
        accessorsInverse = _ref.accessorsInverse;

    _classCallCheck(this, AnnotationCollection);

    this.accessors = accessors;
    this.accessorsInverse = accessorsInverse;
    this.annotations = annotations;
  }

  _createClass(AnnotationCollection, [{
    key: "clearTypes",
    value: function clearTypes(newSettings) {
      this.annotations.forEach(function (d) {
        d.type = undefined;
        d.subject = newSettings && newSettings.subject || d.subject;
        d.connector = newSettings && newSettings.connector || d.connector;
        d.note = newSettings && newSettings.note || d.note;
      });
    }
  }, {
    key: "setPositionWithAccessors",
    value: function setPositionWithAccessors() {
      var _this = this;

      this.annotations.forEach(function (d) {
        d.type.setPositionWithAccessors(_this.accessors);
      });
    }
  }, {
    key: "editMode",
    value: function editMode(_editMode) {
      this.annotations.forEach(function (a) {
        if (a.type) {
          a.type.editMode = _editMode;
          a.type.updateEditMode();
        }
      });
    }
  }, {
    key: "updateDisable",
    value: function updateDisable(disable) {
      this.annotations.forEach(function (a) {
        a.disable = disable;
        if (a.type) {
          disable.forEach(function (d) {
            if (a.type[d]) {
              a.type[d].remove && a.type[d].remove();
              a.type[d] = undefined;
            }
          });
        }
      });
    }
  }, {
    key: "updateTextWrap",
    value: function updateTextWrap(textWrap) {
      this.annotations.forEach(function (a) {
        if (a.type && a.type.updateTextWrap) {
          a.type.updateTextWrap(textWrap);
        }
      });
    }
  }, {
    key: "updateNotePadding",
    value: function updateNotePadding(notePadding) {
      this.annotations.forEach(function (a) {
        if (a.type) {
          a.type.notePadding = notePadding;
        }
      });
    }
  }, {
    key: "json",
    get: function get() {
      var _this2 = this;

      return this.annotations.map(function (a) {
        var json = a.json;
        if (_this2.accessorsInverse && a.data) {
          json.data = {};
          Object.keys(_this2.accessorsInverse).forEach(function (k) {
            json.data[k] = _this2.accessorsInverse[k]({ x: a.x, y: a.y });

            //TODO make this feasible to map back to data for other types of subjects
          });
        }
        return json;
      });
    }
  }, {
    key: "noteNodes",
    get: function get() {
      return this.annotations.map(function (a) {
        return _extends({}, a.type.getNoteBBoxOffset(), { positionX: a.x, positionY: a.y });
      });
    }

    //TODO: come back and rethink if a.x and a.y are applicable in all situations
    // get connectorNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getConnectorBBox(), startX: a.x, startY: a.y}))
    // }

    // get subjectNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getSubjectBBox(), startX: a.x, startY: a.y}))
    // }

    // get annotationNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getAnnotationBBox(), startX: a.x, startY: a.y}))
    // }

  }]);

  return AnnotationCollection;
}();

exports.default = AnnotationCollection;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arcBuilder = exports.lineBuilder = undefined;

var _d3Shape = require('d3-shape');

var lineBuilder = exports.lineBuilder = function lineBuilder(_ref) {
  var data = _ref.data,
      _ref$curve = _ref.curve,
      curve = _ref$curve === undefined ? _d3Shape.curveLinear : _ref$curve,
      canvasContext = _ref.canvasContext,
      className = _ref.className;

  var lineGen = (0, _d3Shape.line)().curve(curve);

  var builder = {
    type: 'path',
    className: className,
    data: data
  };

  if (canvasContext) {
    lineGen.context(canvasContext);
    builder.pathMethods = lineGen;
  } else {
    builder.attrs = {
      d: lineGen(data)
    };
  }

  return builder;
};

var arcBuilder = exports.arcBuilder = function arcBuilder(_ref2) {
  var data = _ref2.data,
      canvasContext = _ref2.canvasContext,
      className = _ref2.className;


  var builder = {
    type: 'path',
    className: className,
    data: data
  };

  var arcShape = (0, _d3Shape.arc)().innerRadius(data.innerRadius || 0).outerRadius(data.outerRadius || data.radius || 2).startAngle(data.startAngle || 0).endAngle(data.endAngle || 2 * Math.PI);

  if (canvasContext) {
    arcShape.context(canvasContext);
    builder.pathMethods = lineGen;
  } else {

    builder.attrs = {
      d: arcShape()
    };
  }

  return builder;
};

},{"d3-shape":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

exports.default = function (_ref) {
  var annotation = _ref.annotation,
      start = _ref.start,
      end = _ref.end;

  var offset = annotation.position;
  if (!start) {
    start = [annotation.dx, annotation.dy];
  } else {
    start = [-end[0] + start[0], -end[1] + start[1]];
  }
  if (!end) {
    end = [annotation.x - offset.x, annotation.y - offset.y];
  }

  var x1 = end[0],
      y1 = end[1];

  var dx = start[0];
  var dy = start[1];

  var size = 10;
  var angleOffset = 16 / 180 * Math.PI;
  var angle = Math.atan(dy / dx);

  if (dx < 0) {
    angle += Math.PI;
  }

  var data = [[x1, y1], [Math.cos(angle + angleOffset) * size + x1, Math.sin(angle + angleOffset) * size + y1], [Math.cos(angle - angleOffset) * size + x1, Math.sin(angle - angleOffset) * size + y1], [x1, y1]];

  //TODO add in reverse
  // if (canvasContext.arrowReverse){
  //   data = [[x1, y1], 
  //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
  //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
  //   [x1, y1]
  //   ]
  // } else {
  //   data = [[x1, y1], 
  //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
  //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
  //   [x1, y1]
  //   ]
  // }

  return { components: [(0, _Builder.lineBuilder)({ data: data, className: 'connector-arrow' })] };
};

},{"../Builder":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

exports.default = function (_ref) {
  var line = _ref.line;


  var dot = (0, _Builder.arcBuilder)({ className: 'connector-dot', data: { radius: 3 } });
  dot.attrs.transform = 'translate(' + line.data[0][0] + ', ' + line.data[0][1] + ')';

  return { components: [dot] };
};

},{"../Builder":9}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Builder = require('../Builder');

var _d3Selection = require('d3-selection');

var _typeLine = require('./type-line');

var _d3Shape = require('d3-shape');

var _Handles = require('../Handles');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (_ref) {
  var type = _ref.type,
      connectorData = _ref.connectorData,
      subjectType = _ref.subjectType;


  if (!connectorData) {
    connectorData = {};
  }
  if (!connectorData.points || typeof connectorData.points === "number") {
    connectorData.points = createPoints(type.annotation.offset, connectorData.points);
  }
  if (!connectorData.curve) {
    connectorData.curve = _d3Shape.curveCatmullRom;
  }

  var handles = [];

  if (type.editMode) {
    (function () {
      var cHandles = connectorData.points.map(function (c, i) {
        return _extends({}, (0, _Handles.pointHandle)({ cx: c[0], cy: c[1] }), { index: i });
      });

      var updatePoint = function updatePoint(index) {
        connectorData.points[index][0] += _d3Selection.event.dx;
        connectorData.points[index][1] += _d3Selection.event.dy;
        type.redrawConnector();
      };

      handles = type.mapHandles(cHandles.map(function (h) {
        return _extends({}, h.move, { drag: updatePoint.bind(type, h.index) });
      }));
    })();
  }

  var data = (0, _typeLine.lineSetup)({ type: type, subjectType: subjectType });
  data = [data[0]].concat(_toConsumableArray(connectorData.points), [data[1]]);
  var components = [(0, _Builder.lineBuilder)({ data: data, curve: connectorData.curve, className: "connector" })];

  return { components: components, handles: handles };
};

var createPoints = function createPoints(offset) {
  var anchors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var diff = { x: offset.x / (anchors + 1), y: offset.y / (anchors + 1) };
  var p = [];

  var i = 1;
  for (; i <= anchors; i++) {
    p.push([diff.x * i + i % 2 * 20, diff.y * i - i % 2 * 20]);
  }
  return p;
};

},{"../Builder":9,"../Handles":15,"./type-line":14,"d3-selection":4,"d3-shape":5}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require("../Builder");

exports.default = function (_ref) {
  var type = _ref.type,
      subjectType = _ref.subjectType;


  var annotation = type.annotation;
  var offset = annotation.position;

  var x1 = annotation.x - offset.x,
      x2 = x1 + annotation.dx,
      y1 = annotation.y - offset.y,
      y2 = y1 + annotation.dy;

  var subjectData = annotation.subject;

  if (subjectType === "rect") {
    var width = subjectData.width,
        height = subjectData.height;


    if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
      if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
    }
    if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
      if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2;y1 = y2;
    }
  }

  var data = [[x1, y1], [x2, y2]];

  var diffY = y2 - y1;
  var diffX = x2 - x1;
  var xe = x2;
  var ye = y2;
  var opposite = y2 < y1 && x2 > x1 || x2 < x1 && y2 > y1 ? -1 : 1;

  if (Math.abs(diffX) < Math.abs(diffY)) {
    xe = x2;
    ye = y1 + diffX * opposite;
  } else {
    ye = y2;
    xe = x1 + diffY * opposite;
  }

  if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
    var r = (subjectData.outerRadius || subjectData.radius) + (subjectData.radiusPadding || 0);
    var length = r / Math.sqrt(2);

    if (Math.abs(diffX) > length && Math.abs(diffY) > length) {
      x1 = length * (x2 < 0 ? -1 : 1);
      y1 = length * (y2 < 0 ? -1 : 1);
      data = [[x1, y1], [xe, ye], [x2, y2]];
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      var angle = Math.asin(-y2 / r);
      x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
      data = [[x1, y2], [x2, y2]];
    } else {
      var _angle = Math.acos(x2 / r);
      y1 = Math.abs(Math.sin(_angle) * r) * (y2 < 0 ? -1 : 1);
      data = [[x2, y1], [x2, y2]];
    }
  } else {
    data = [[x1, y1], [xe, ye], [x2, y2]];
  }

  return { components: [(0, _Builder.lineBuilder)({ data: data, className: "connector" })] };
};

},{"../Builder":9}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lineSetup = undefined;

var _Builder = require("../Builder");

var lineSetup = exports.lineSetup = function lineSetup(_ref) {
  var type = _ref.type,
      subjectType = _ref.subjectType;

  var annotation = type.annotation;
  var offset = annotation.position;

  var x1 = annotation.x - offset.x,
      x2 = x1 + annotation.dx,
      y1 = annotation.y - offset.y,
      y2 = y1 + annotation.dy;

  var subjectData = annotation.subject;

  if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
    var h = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var angle = Math.asin(-y2 / h);
    var r = subjectData.outerRadius || subjectData.radius + (subjectData.radiusPadding || 0);

    x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
    y1 = Math.abs(Math.sin(angle) * r) * (y2 < 0 ? -1 : 1);
  }

  if (subjectType === "rect") {
    var width = subjectData.width,
        height = subjectData.height;


    if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
      if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
    }
    if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
      if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2;y1 = y2;
    }
  }

  return [[x1, y1], [x2, y2]];
};

exports.default = function (connectorData) {
  var data = lineSetup(connectorData);
  return { components: [(0, _Builder.lineBuilder)({ data: data, className: "connector" })] };
};

},{"../Builder":9}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHandles = exports.lineHandles = exports.rectHandles = exports.circleHandles = exports.pointHandle = undefined;

var _d3Selection = require('d3-selection');

var _d3Drag = require('d3-drag');

var pointHandle = exports.pointHandle = function pointHandle(_ref) {
  var _ref$cx = _ref.cx,
      cx = _ref$cx === undefined ? 0 : _ref$cx,
      _ref$cy = _ref.cy,
      cy = _ref$cy === undefined ? 0 : _ref$cy;

  return { move: { x: cx, y: cy } };
};

var circleHandles = exports.circleHandles = function circleHandles(_ref2) {
  var _ref2$cx = _ref2.cx,
      cx = _ref2$cx === undefined ? 0 : _ref2$cx,
      _ref2$cy = _ref2.cy,
      cy = _ref2$cy === undefined ? 0 : _ref2$cy,
      r1 = _ref2.r1,
      r2 = _ref2.r2,
      padding = _ref2.padding;

  var h = { move: { x: cx, y: cy } };

  if (r1 !== undefined) {
    h.r1 = { x: cx + r1 / Math.sqrt(2), y: cy + r1 / Math.sqrt(2) };
  }

  if (r2 !== undefined) {
    h.r2 = { x: cx + r2 / Math.sqrt(2), y: cy + r2 / Math.sqrt(2) };
  }

  if (padding !== undefined) {
    h.padding = { x: cx + r1 + padding, y: cy };
  }

  return h;
};

var rectHandles = exports.rectHandles = function rectHandles(_ref3) {
  var _ref3$x = _ref3.x1,
      x1 = _ref3$x === undefined ? 0 : _ref3$x,
      _ref3$y = _ref3.y1,
      y1 = _ref3$y === undefined ? 0 : _ref3$y,
      _ref3$x2 = _ref3.x2,
      x2 = _ref3$x2 === undefined ? x1 : _ref3$x2,
      _ref3$y2 = _ref3.y2,
      y2 = _ref3$y2 === undefined ? y1 : _ref3$y2,
      width = _ref3.width,
      height = _ref3.height;


  var w = width || Math.abs(x2 - x1);
  var h = height || Math.abs(y2 - y1);

  return {
    move: {
      x: Math.min(x1, x2) + w / 2,
      y: Math.min(y1, y2) - 10
    },
    width: {
      x: Math.max(x1, x2),
      y: Math.min(y1, y2) + h / 2
    },
    height: {
      x: Math.min(x1, x2) + w / 2,
      y: Math.max(y1, y2)
    }
  };
};

var lineHandles = exports.lineHandles = function lineHandles(_ref4) {
  var x1 = _ref4.x1,
      y1 = _ref4.y1,
      x2 = _ref4.x2,
      y2 = _ref4.y2,
      x = _ref4.x,
      y = _ref4.y;


  var minY = Math.min(y1, y2);
  var minX = Math.min(x1, x2);

  var height = Math.abs(y2 - y1);
  var width = Math.abs(x2 - x1);

  return {
    move: {
      x: x || minX + width / 2,
      y: y || minY + height / 2
    }
  };
};

//arc handles
var addHandles = exports.addHandles = function addHandles(_ref5) {
  var group = _ref5.group,
      handles = _ref5.handles,
      _ref5$r = _ref5.r,
      r = _ref5$r === undefined ? 10 : _ref5$r;

  //give it a group and x,y to draw handles
  //then give it instructions on what the handles change 
  var h = group.selectAll('circle.handle').data(handles);

  h.enter().append('circle').attr('class', 'handle').call((0, _d3Drag.drag)().container((0, _d3Selection.select)('g.annotations').node()).on('start', function (d) {
    return d.start && d.start(d);
  }).on('drag', function (d) {
    return d.drag && d.drag(d);
  }).on('end', function (d) {
    return d.end && d.end(d);
  }));

  group.selectAll('circle.handle').attr('cx', function (d) {
    return d.x;
  }).attr('cy', function (d) {
    return d.y;
  }).attr('r', function (d) {
    return d.r || r;
  }).attr('class', function (d) {
    return 'handle ' + (d.className || '');
  });

  h.exit().remove();
};

},{"d3-drag":2,"d3-selection":4}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var leftRightDynamic = exports.leftRightDynamic = function leftRightDynamic(align, y) {
  if (align === "dynamic" || align === "left" || align === "right") {
    if (y < 0) {
      align = "top";
    } else {
      align = "bottom";
    }
  }
  return align;
};

var topBottomDynamic = exports.topBottomDynamic = function topBottomDynamic(align, x) {
  if (align === "dynamic" || align === "top" || align === "bottom") {
    if (x < 0) {
      align = "right";
    } else {
      align = "left";
    }
  }
  return align;
};

var orientationTopBottom = ["topBottom", "top", "bottom"];
var orientationLeftRight = ["leftRight", "left", "right"];

exports.default = function (_ref) {
  var _ref$padding = _ref.padding,
      padding = _ref$padding === undefined ? 0 : _ref$padding,
      _ref$bbox = _ref.bbox,
      bbox = _ref$bbox === undefined ? { x: 0, y: 0, width: 0, height: 0 } : _ref$bbox,
      align = _ref.align,
      orientation = _ref.orientation,
      _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? { x: 0, y: 0 } : _ref$offset;

  var x = -bbox.x;
  var y = 0; //-bbox.y
  if (orientationTopBottom.indexOf(orientation) !== -1) {
    align = topBottomDynamic(align, offset.x);
    if (offset.y < 0 && orientation === "topBottom" || orientation === "top") {
      y -= bbox.height + padding;
    } else {
      y += padding;
    }

    if (align === "middle") {
      x -= bbox.width / 2;
    } else if (align === "right") {
      x -= bbox.width;
    }
  } else if (orientationLeftRight.indexOf(orientation) !== -1) {
    align = leftRightDynamic(align, offset.y);
    if (offset.x < 0 && orientation === "leftRight" || orientation === "left") {
      x -= bbox.width + padding;
    } else {
      x += padding;
    }

    if (align === "middle") {
      y -= bbox.height / 2;
    } else if (align === "top") {
      y -= bbox.height;
    }
  }

  return { x: x, y: y };
};

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

var _alignment = require('./alignment');

exports.default = function (_ref) {
  var align = _ref.align,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      offset = _ref.offset,
      bbox = _ref.bbox;

  align = (0, _alignment.topBottomDynamic)(align, offset.x);

  if (align === "right") {
    x -= bbox.width;
  } else if (align === "middle") {
    x -= bbox.width / 2;
  }

  var data = [[x, y], [x + bbox.width, y]];
  return { components: [(0, _Builder.lineBuilder)({ data: data, className: "note-line" })] };
};

},{"../Builder":9,"./alignment":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

var _alignment = require('./alignment');

exports.default = function (_ref) {
  var align = _ref.align,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      bbox = _ref.bbox,
      offset = _ref.offset;

  align = (0, _alignment.leftRightDynamic)(align, offset.y);

  if (align === "top") {
    y -= bbox.height;
  } else if (align === "middle") {
    y -= bbox.height / 2;
  }

  var data = [[x, y], [x, y + bbox.height]];
  return { components: [(0, _Builder.lineBuilder)({ data: data, className: "note-line" })] };
};

},{"../Builder":9,"./alignment":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

var _d3Selection = require('d3-selection');

exports.default = function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  var typeSettings = type.typeSettings && type.typeSettings.subject;

  if (!subjectData.radius) {
    if (typeSettings && typeSettings.radius) {
      subjectData.radius = typeSettings.radius;
    } else {
      subjectData.radius = 14;
    }
  }
  if (!subjectData.x) {
    if (typeSettings && typeSettings.x) {
      subjectData.x = typeSettings.x;
    } else {
      subjectData.x = "left";
    }
  }
  if (!subjectData.y) {
    if (typeSettings && typeSettings.y) {
      subjectData.y = typeSettings.y;
    } else {
      subjectData.y = "top";
    }
  }

  var handles = [];
  var radius = subjectData.radius;
  var innerRadius = radius * .7;
  var x = subjectData.x === "left" ? -radius : radius;
  var y = subjectData.y === "top" ? -radius : radius;
  var transform = 'translate(' + x + ', ' + y + ')';
  var circlebg = (0, _Builder.arcBuilder)({ className: 'subject', data: { radius: radius } });
  circlebg.attrs.transform = transform;

  var circle = (0, _Builder.arcBuilder)({ className: 'subject-ring', data: { outerRadius: radius, innerRadius: innerRadius } });
  circle.attrs.transform = transform;

  var pointer = (0, _Builder.lineBuilder)({ className: 'subject-pointer',
    data: [[0, 0], [x, 0], [0, y], [0, 0]]
  });

  if (type.editMode) {

    var dragBadge = function dragBadge() {
      subjectData.x = _d3Selection.event.x < 0 ? "left" : "right";
      subjectData.y = _d3Selection.event.y < 0 ? "top" : "bottom";
      type.redrawSubject();
    };

    var bHandles = [{ x: x * 2, y: y * 2, drag: dragBadge.bind(type) }];
    handles = type.mapHandles(bHandles);
  }

  var text = void 0;
  if (subjectData.text) {
    text = {
      type: "text",
      className: "badge-text",
      attrs: {
        text: subjectData.text,
        "text-anchor": "middle",
        dy: ".25em",
        x: x,
        y: y
      }
    };
  }
  return { components: [pointer, circlebg, circle, text], handles: handles };
};

},{"../Builder":9,"d3-selection":4}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Handles = require('../Handles');

var _Builder = require('../Builder');

var _d3Selection = require('d3-selection');

exports.default = function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  if (!subjectData.radius && !subjectData.outerRadius) {
    subjectData.radius = 20;
  }

  var handles = [];
  var c = (0, _Builder.arcBuilder)({ data: subjectData, className: "subject" });
  if (type.editMode) {
    var h = (0, _Handles.circleHandles)({
      r1: c.data.outerRadius || c.data.radius,
      r2: c.data.innerRadius,
      padding: subjectData.radiusPadding
    });

    var updateRadius = function updateRadius(attr) {
      var r = subjectData[attr] + _d3Selection.event.dx * Math.sqrt(2);
      subjectData[attr] = r;
      type.redrawSubject();
      type.redrawConnector();
    };

    var cHandles = [_extends({}, h.r1, { drag: updateRadius.bind(type, subjectData.outerRadius !== undefined ? 'outerRadius' : 'radius') })];

    if (subjectData.innerRadius) {
      cHandles.push(_extends({}, h.r2, { drag: updateRadius.bind(type, 'innerRadius') }));
    }
    handles = type.mapHandles(cHandles);
  }

  return { components: [c], handles: handles };
};

},{"../Builder":9,"../Handles":15,"d3-selection":4}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

var _d3Selection = require('d3-selection');

exports.default = function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  if (!subjectData.width) {
    subjectData.width = 100;
  }
  if (!subjectData.height) {
    subjectData.height = 100;
  }

  var handles = [];
  var width = subjectData.width,
      height = subjectData.height;


  var data = [[0, 0], [width, 0], [width, height], [0, height], [0, 0]];
  var rect = (0, _Builder.lineBuilder)({ data: data, className: 'subject' });

  if (type.editMode) {

    var updateWidth = function updateWidth() {
      subjectData.width = _d3Selection.event.x;
      type.redrawSubject();
      type.redrawConnector();
    };

    var updateHeight = function updateHeight() {
      subjectData.height = _d3Selection.event.y;
      type.redrawSubject();
      type.redrawConnector();
    };

    var rHandles = [{ x: width, y: height / 2, drag: updateWidth.bind(type) }, { x: width / 2, y: height, drag: updateHeight.bind(type) }];

    handles = type.mapHandles(rHandles);
  }

  return { components: [rect], handles: handles };
};

},{"../Builder":9,"d3-selection":4}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Builder = require('../Builder');

exports.default = function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  var offset = type.annotation.position;

  var x1 = (subjectData.x1 !== undefined ? subjectData.x1 : offset.x) - offset.x,
      x2 = (subjectData.x2 !== undefined ? subjectData.x2 : offset.x) - offset.x,
      y1 = (subjectData.y1 !== undefined ? subjectData.y1 : offset.y) - offset.y,
      y2 = (subjectData.y2 !== undefined ? subjectData.y2 : offset.y) - offset.y;

  var data = [[x1, y1], [x2, y2]];
  return { components: [(0, _Builder.lineBuilder)({ data: data, className: 'subject' })] };
};

},{"../Builder":9}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newWithClass = exports.d3XYThreshold = exports.d3CalloutRect = exports.d3CalloutCircle = exports.d3Badge = exports.d3CalloutCurve = exports.d3CalloutElbow = exports.d3Callout = exports.d3Label = exports.d3NoteText = exports.customType = exports.Type = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

//Note options


//Connector options


//Subject options


var _d3Selection = require('d3-selection');

var _Handles = require('./Handles');

var _alignment = require('./Note/alignment');

var _alignment2 = _interopRequireDefault(_alignment);

var _lineTypeVertical = require('./Note/lineType-vertical');

var _lineTypeVertical2 = _interopRequireDefault(_lineTypeVertical);

var _lineTypeHorizontal = require('./Note/lineType-horizontal');

var _lineTypeHorizontal2 = _interopRequireDefault(_lineTypeHorizontal);

var _typeLine = require('./Connector/type-line');

var _typeLine2 = _interopRequireDefault(_typeLine);

var _typeElbow = require('./Connector/type-elbow');

var _typeElbow2 = _interopRequireDefault(_typeElbow);

var _typeCurve = require('./Connector/type-curve');

var _typeCurve2 = _interopRequireDefault(_typeCurve);

var _endArrow = require('./Connector/end-arrow');

var _endArrow2 = _interopRequireDefault(_endArrow);

var _endDot = require('./Connector/end-dot');

var _endDot2 = _interopRequireDefault(_endDot);

var _circle = require('./Subject/circle');

var _circle2 = _interopRequireDefault(_circle);

var _rect = require('./Subject/rect');

var _rect2 = _interopRequireDefault(_rect);

var _threshold = require('./Subject/threshold');

var _threshold2 = _interopRequireDefault(_threshold);

var _badge = require('./Subject/badge');

var _badge2 = _interopRequireDefault(_badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Type = exports.Type = function () {
  function Type(_ref) {
    var a = _ref.a,
        annotation = _ref.annotation,
        editMode = _ref.editMode,
        dispatcher = _ref.dispatcher,
        notePadding = _ref.notePadding,
        accessors = _ref.accessors;

    _classCallCheck(this, Type);

    this.a = a;

    this.note = annotation.disable.indexOf("note") === -1 && a.select('g.annotation-note');
    this.noteContent = this.note && a.select('g.annotation-note-content');
    this.connector = annotation.disable.indexOf("connector") === -1 && a.select('g.annotation-connector');
    this.subject = annotation.disable.indexOf("subject") === -1 && a.select('g.annotation-subject');

    if (dispatcher) {
      var handler = addHandlers.bind(null, dispatcher, annotation);
      handler({ component: this.note, name: 'note' });
      handler({ component: this.connector, name: 'connector' });
      handler({ component: this.subject, name: 'subject' });
    }

    this.annotation = annotation;
    this.editMode = annotation.editMode || editMode;
    this.notePadding = notePadding !== undefined ? notePadding : 3;
    this.offsetCornerX = 0;
    this.offsetCornerY = 0;

    if (accessors && annotation.data) {
      this.init(accessors);
    }
  }

  _createClass(Type, [{
    key: 'init',
    value: function init(accessors) {
      if (!this.annotation.x) {
        this.mapX(accessors);
      }
      if (!this.annotation.y) {
        this.mapY(accessors);
      }
    }
  }, {
    key: 'mapY',
    value: function mapY(accessors) {
      if (accessors.y) {
        this.annotation.y = accessors.y(this.annotation.data);
      }
    }
  }, {
    key: 'mapX',
    value: function mapX(accessors) {
      if (accessors.x) {
        this.annotation.x = accessors.x(this.annotation.data);
      }
    }
  }, {
    key: 'updateEditMode',
    value: function updateEditMode() {
      this.a.selectAll('circle.handle').remove();
    }
  }, {
    key: 'drawOnSVG',
    value: function drawOnSVG(component, builders) {
      var _this = this;

      if (!Array.isArray(builders)) {
        builders = [builders];
      }

      builders.filter(function (b) {
        return b;
      }).forEach(function (_ref2) {
        var type = _ref2.type,
            className = _ref2.className,
            attrs = _ref2.attrs,
            handles = _ref2.handles;

        if (type === "handle") {
          (0, _Handles.addHandles)({ group: component, r: attrs && attrs.r, handles: handles });
        } else {
          (function () {
            newWithClass(component, [_this.annotation], type, className);

            var el = component.select(type + '.' + className);
            var attrKeys = Object.keys(attrs);
            attrKeys.forEach(function (attr) {
              if (attr === "text") {
                el.text(attrs[attr]);
              } else {
                el.attr(attr, attrs[attr]);
              }
            });
          })();
        }
      });
    }

    //TODO: how to extend this to a drawOnCanvas mode? 

  }, {
    key: 'getNoteBBox',
    value: function getNoteBBox() {
      return bboxWithoutHandles(this.note, '.annotation-note-content text');
    }
  }, {
    key: 'getNoteBBoxOffset',
    value: function getNoteBBoxOffset() {
      var bbox = bboxWithoutHandles(this.note, '.annotation-note-content');
      var transform = this.noteContent.attr('transform').split(/\(|\,|\)/g);
      bbox.offsetCornerX = parseFloat(transform[1]) + this.annotation.dx;
      bbox.offsetCornerY = parseFloat(transform[2]) + this.annotation.dy;
      bbox.offsetX = this.annotation.dx;
      bbox.offsetY = this.annotation.dy;
      return bbox;
    }
  }, {
    key: 'drawSubject',
    value: function drawSubject() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var subjectData = this.annotation.subject;
      var type = context.type;
      var subjectParams = { type: this, subjectData: subjectData };

      var subject = {};
      if (type === "circle") subject = (0, _circle2.default)(subjectParams);else if (type === "rect") subject = (0, _rect2.default)(subjectParams);else if (type === "threshold") subject = (0, _threshold2.default)(subjectParams);else if (type === "badge") subject = (0, _badge2.default)(subjectParams);

      var _subject = subject,
          _subject$components = _subject.components,
          components = _subject$components === undefined ? [] : _subject$components,
          _subject$handles = _subject.handles,
          handles = _subject$handles === undefined ? [] : _subject$handles;

      if (this.editMode) {
        handles = handles.concat(this.mapHandles([{ drag: this.dragSubject.bind(this) }]));
        components.push({ type: "handle", handles: handles });
      }

      return components;
    }
  }, {
    key: 'drawConnector',
    value: function drawConnector() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var connectorData = this.annotation.connector;
      var type = connectorData.type || context.type;
      var connectorParams = { type: this, connectorData: connectorData };
      connectorParams.subjectType = this.typeSettings && this.typeSettings.subject && this.typeSettings.subject.type;

      var connector = {};
      if (type === "curve") connector = (0, _typeCurve2.default)(connectorParams);else if (type === "elbow") connector = (0, _typeElbow2.default)(connectorParams);else connector = (0, _typeLine2.default)(connectorParams);

      var _connector = connector,
          _connector$components = _connector.components,
          components = _connector$components === undefined ? [] : _connector$components,
          _connector$handles = _connector.handles,
          handles = _connector$handles === undefined ? [] : _connector$handles;

      var line = components[0];
      var endType = connectorData.end || context.end;
      var end = {};
      if (endType === "arrow") {
        var s = line.data[1];
        var e = line.data[0];
        var distance = Math.sqrt(Math.pow(s[0] - e[0], 2) + Math.pow(s[1] - e[1], 2));
        if (distance < 5 && line.data[2]) {
          s = line.data[2];
        }

        end = (0, _endArrow2.default)({ annotation: this.annotation, start: s, end: e });
      } else if (endType === "dot") {
        end = (0, _endDot2.default)({ line: line });
      }

      if (end.components) {
        components = components.concat(end.components);
      }

      if (this.editMode) {
        if (handles.length !== 0) components.push({ type: "handle", handles: handles });
      }
      return components;
    }
  }, {
    key: 'drawNote',
    value: function drawNote() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var noteData = this.annotation.note;
      var align = noteData.align || context.align || 'dynamic';
      var noteParams = { bbox: context.bbox, align: align, offset: this.annotation.offset };
      var lineType = noteData.lineType || context.lineType;
      var note = {};
      if (lineType === "vertical") note = (0, _lineTypeVertical2.default)(noteParams);else if (lineType === "horizontal") note = (0, _lineTypeHorizontal2.default)(noteParams);

      var _note = note,
          _note$components = _note.components,
          components = _note$components === undefined ? [] : _note$components,
          _note$handles = _note.handles,
          handles = _note$handles === undefined ? [] : _note$handles;

      if (this.editMode) {
        handles = this.mapHandles([{ x: 0, y: 0, drag: this.dragNote.bind(this) }]);
        components.push({ type: "handle", handles: handles });
      }
      return components;
    }
  }, {
    key: 'drawNoteContent',
    value: function drawNoteContent(context) {
      var noteData = this.annotation.note;
      var padding = noteData.padding !== undefined ? noteData.padding : this.notePadding;
      var orientation = noteData.orientation || context.orientation || 'topBottom';
      var lineType = noteData.lineType || context.lineType;
      var align = noteData.align || context.align || 'dynamic';

      if (lineType === "vertical") orientation = "leftRight";else if (lineType === "horizontal") orientation = "topBottom";

      var noteParams = { padding: padding, bbox: context.bbox, offset: this.annotation.offset, orientation: orientation, align: align };

      var _noteAlignment = (0, _alignment2.default)(noteParams),
          x = _noteAlignment.x,
          y = _noteAlignment.y;

      this.offsetCornerX = x + this.annotation.dx;
      this.offsetCornerY = y + this.annotation.dy;
      this.note && this.noteContent.attr('transform', 'translate(' + x + ', ' + y + ')');

      return [];
    }
  }, {
    key: 'drawOnScreen',
    value: function drawOnScreen(component, drawFunction) {
      return this.drawOnSVG(component, drawFunction);
    }
  }, {
    key: 'redrawSubject',
    value: function redrawSubject() {
      this.subject && this.drawOnScreen(this.subject, this.drawSubject());
    }
  }, {
    key: 'redrawConnector',
    value: function redrawConnector() {
      this.connector && this.drawOnScreen(this.connector, this.drawConnector());
    }
  }, {
    key: 'redrawNote',
    value: function redrawNote() {
      var bbox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNoteBBox();

      this.noteContent && this.drawOnScreen(this.noteContent, this.drawNoteContent({ bbox: bbox }));
      this.note && this.drawOnScreen(this.note, this.drawNote({ bbox: bbox }));
    }
  }, {
    key: 'setPosition',
    value: function setPosition() {
      var position = this.annotation.position;
      this.a.attr('transform', 'translate(' + position.x + ', ' + position.y + ')');
    }
  }, {
    key: 'setOffset',
    value: function setOffset() {
      if (this.note) {
        var offset = this.annotation.offset;
        this.note.attr('transform', 'translate(' + offset.x + ', ' + offset.y + ')');
      }
    }
  }, {
    key: 'setPositionWithAccessors',
    value: function setPositionWithAccessors(accessors) {
      if (accessors && this.annotation.data) {
        this.mapX(accessors);
        this.mapY(accessors);
      }
      this.setPosition();
    }
  }, {
    key: 'setClassName',
    value: function setClassName() {
      this.a.attr("class", 'annotation ' + (this.className && this.className()) + ' ' + (this.editMode ? "editable" : "") + ' ' + (this.annotation.className || ''));
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.setClassName();
      this.setPosition();
      this.setOffset();
      this.redrawSubject();
      this.redrawConnector();
      this.redrawNote();
    }
  }, {
    key: 'dragstarted',
    value: function dragstarted() {
      _d3Selection.event.sourceEvent.stopPropagation();
      this.a.classed("dragging", true);
      this.a.selectAll("circle.handle").style("pointer-events", "none");
    }
  }, {
    key: 'dragended',
    value: function dragended() {
      this.a.classed("dragging", false);
      this.a.selectAll("circle.handle").style("pointer-events", "all");
    }
  }, {
    key: 'dragSubject',
    value: function dragSubject() {
      var position = this.annotation.position;
      position.x += _d3Selection.event.dx;
      position.y += _d3Selection.event.dy;
      this.annotation.position = position;
    }
  }, {
    key: 'dragNote',
    value: function dragNote() {
      var offset = this.annotation.offset;
      offset.x += _d3Selection.event.dx;
      offset.y += _d3Selection.event.dy;
      this.annotation.offset = offset;
    }
  }, {
    key: 'mapHandles',
    value: function mapHandles(handles) {
      var _this2 = this;

      return handles.map(function (h) {
        return _extends({}, h, {
          start: _this2.dragstarted.bind(_this2), end: _this2.dragended.bind(_this2) });
      });
    }
  }]);

  return Type;
}();

var customType = exports.customType = function customType(initialType, typeSettings, _init) {
  return function (_initialType) {
    _inherits(customType, _initialType);

    function customType(settings) {
      _classCallCheck(this, customType);

      var _this3 = _possibleConstructorReturn(this, (customType.__proto__ || Object.getPrototypeOf(customType)).call(this, settings));

      _this3.typeSettings = typeSettings;

      if (typeSettings.disable) {
        typeSettings.disable.forEach(function (d) {
          _this3[d] = undefined;
          if (d === "note") {
            _this3.noteContent = undefined;
          }
        });
      }
      return _this3;
    }

    _createClass(customType, [{
      key: 'className',
      value: function className() {
        return '' + (typeSettings.className || _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'className', this) && _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'className', this).call(this) || '');
      }
    }, {
      key: 'drawSubject',
      value: function drawSubject(context) {
        this.typeSettings.subject = _extends({}, typeSettings.subject, this.typeSettings.subject);
        return _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'drawSubject', this).call(this, _extends({}, context, this.typeSettings.subject));
      }
    }, {
      key: 'drawConnector',
      value: function drawConnector(context) {
        this.typeSettings.connector = _extends({}, typeSettings.connector, this.typeSettings.connector);
        return _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'drawConnector', this).call(this, _extends({}, context, typeSettings.connector, this.typeSettings.connector));
      }
    }, {
      key: 'drawNote',
      value: function drawNote(context) {
        this.typeSettings.note = _extends({}, typeSettings.note, this.typeSettings.note);
        return _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'drawNote', this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
      }
    }, {
      key: 'drawNoteContent',
      value: function drawNoteContent(context) {
        return _get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), 'drawNoteContent', this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
      }
    }], [{
      key: 'init',
      value: function init(annotation, accessors) {
        _get(customType.__proto__ || Object.getPrototypeOf(customType), 'init', this).call(this, annotation, accessors);
        if (_init) {
          annotation = _init(annotation, accessors);
        }
        return annotation;
      }
    }]);

    return customType;
  }(initialType);
};

var d3NoteText = exports.d3NoteText = function (_Type) {
  _inherits(d3NoteText, _Type);

  function d3NoteText(params) {
    _classCallCheck(this, d3NoteText);

    var _this4 = _possibleConstructorReturn(this, (d3NoteText.__proto__ || Object.getPrototypeOf(d3NoteText)).call(this, params));

    _this4.textWrap = params.textWrap || 120;
    _this4.drawText();
    return _this4;
  }

  _createClass(d3NoteText, [{
    key: 'updateTextWrap',
    value: function updateTextWrap(textWrap) {
      this.textWrap = textWrap;
      this.drawText();
    }

    //TODO: add update text functionality

  }, {
    key: 'drawText',
    value: function drawText() {
      if (this.note) {

        newWithClass(this.note, [this.annotation], 'g', 'annotation-note-content');

        var noteContent = this.note.select('g.annotation-note-content');
        newWithClass(noteContent, [this.annotation], 'rect', 'annotation-note-bg');
        newWithClass(noteContent, [this.annotation], 'text', 'annotation-note-label');
        newWithClass(noteContent, [this.annotation], 'text', 'annotation-note-title');

        var titleBBox = { height: 0 };
        var label = this.a.select('text.annotation-note-label');
        var wrapLength = this.annotation.note && this.annotation.note.wrap || this.typeSettings && this.typeSettings.note && this.typeSettings.note.wrap || this.textWrap;

        if (this.annotation.note.title) {
          var title = this.a.select('text.annotation-note-title');
          title.text(this.annotation.note.title);
          title.call(wrap, wrapLength);
          titleBBox = title.node().getBBox();
        }

        label.text(this.annotation.note.label).attr('dx', '0');
        label.call(wrap, wrapLength);

        label.attr('y', titleBBox.height * 1.1 || 0);

        var bbox = this.getNoteBBox();
        this.a.select('rect.annotation-note-bg').attr('width', bbox.width).attr('height', bbox.height);
      }
    }
  }]);

  return d3NoteText;
}(Type);

var d3Label = exports.d3Label = customType(d3NoteText, {
  className: "label",
  note: { align: "middle" }
});

var d3Callout = exports.d3Callout = customType(d3NoteText, {
  className: "callout",
  note: { lineType: "horizontal" }
});

var d3CalloutElbow = exports.d3CalloutElbow = customType(d3Callout, {
  className: "callout elbow",
  connector: { type: "elbow" }
});

var d3CalloutCurve = exports.d3CalloutCurve = customType(d3Callout, {
  className: "callout curve",
  connector: { type: "curve" }
});

var d3Badge = exports.d3Badge = customType(Type, {
  className: "badge",
  subject: { type: "badge" },
  disable: ['connector', 'note']
});

var d3CalloutCircle = exports.d3CalloutCircle = customType(d3CalloutElbow, {
  className: "callout circle",
  subject: { type: "circle" }
});

var d3CalloutRect = exports.d3CalloutRect = customType(d3CalloutElbow, {
  className: "callout rect",
  subject: { type: "rect" }
});

var ThresholdMap = function (_d3Callout) {
  _inherits(ThresholdMap, _d3Callout);

  function ThresholdMap() {
    _classCallCheck(this, ThresholdMap);

    return _possibleConstructorReturn(this, (ThresholdMap.__proto__ || Object.getPrototypeOf(ThresholdMap)).apply(this, arguments));
  }

  _createClass(ThresholdMap, [{
    key: 'mapY',
    value: function mapY(accessors) {
      _get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), 'mapY', this).call(this, accessors);
      var a = this.annotation;
      if ((a.subject.x1 || a.subject.x2) && a.data && accessors.y) {
        a.y = accessors.y(a.data);
      }
    }
  }, {
    key: 'mapX',
    value: function mapX(accessors) {
      _get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), 'mapX', this).call(this, accessors);
      var a = this.annotation;
      if ((a.subject.y1 || a.subject.y2) && a.data && accessors.x) {
        a.x = accessors.x(a.data);
      }
    }
  }]);

  return ThresholdMap;
}(d3Callout);

var d3XYThreshold = exports.d3XYThreshold = customType(ThresholdMap, {
  className: "callout xythreshold",
  subject: { type: "threshold" }
});

var newWithClass = exports.newWithClass = function newWithClass(a, d, type, className) {
  var group = a.selectAll(type + '.' + className).data(d);
  group.enter().append(type).merge(group).attr('class', className);

  group.exit().remove();
  return a;
};

var addHandlers = function addHandlers(dispatcher, annotation, _ref3) {
  var component = _ref3.component,
      name = _ref3.name;

  if (component) {
    component.on("mouseover.annotations", function () {
      dispatcher.call(name + 'over', component, annotation);
    }).on("mouseout.annotations", function () {
      return dispatcher.call(name + 'out', component, annotation);
    }).on("click.annotations", function () {
      return dispatcher.call(name + 'click', component, annotation);
    });
  }
};

//Text wrapping code adapted from Mike Bostock
var wrap = function wrap(text, width) {
  text.each(function () {
    var text = (0, _d3Selection.select)(this),
        words = text.text().split(/[ \t\r\n]+/).reverse(),
        lineHeight = 1.2; //ems

    var word = void 0,
        line = [],
        tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", .8 + "em");

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("dy", lineHeight + "em").text(word);
      }
    }
  });
};

var bboxWithoutHandles = function bboxWithoutHandles(selection) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':not(.handle)';

  if (!selection) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return selection.selectAll(selector).nodes().reduce(function (p, c) {
    window.c = c;
    var bbox = c.getBBox();
    p.x = Math.min(p.x, bbox.x);
    p.y = Math.min(p.y, bbox.y);
    p.width = Math.max(p.width, bbox.width);

    var yOffset = c && c.attributes && c.attributes.y;
    p.height = Math.max(p.height, (yOffset && parseFloat(yOffset.value) || 0) + bbox.height);
    return p;
  }, { x: 0, y: 0, width: 0, height: 0 });
};

exports.default = {
  Type: Type,
  d3Label: d3Label,
  d3Callout: d3Callout,
  d3CalloutElbow: d3CalloutElbow,
  d3CalloutCurve: d3CalloutCurve,
  d3CalloutCircle: d3CalloutCircle,
  d3CalloutRect: d3CalloutRect,
  d3XYThreshold: d3XYThreshold,
  d3Badge: d3Badge,
  customType: customType
};

},{"./Connector/end-arrow":10,"./Connector/end-dot":11,"./Connector/type-curve":12,"./Connector/type-elbow":13,"./Connector/type-line":14,"./Handles":15,"./Note/alignment":16,"./Note/lineType-horizontal":17,"./Note/lineType-vertical":18,"./Subject/badge":19,"./Subject/circle":20,"./Subject/rect":21,"./Subject/threshold":22,"d3-selection":4}],24:[function(require,module,exports){
'use strict';

var _AdapterD = require('./src/Adapter-d3');

var _AdapterD2 = _interopRequireDefault(_AdapterD);

var _TypesD = require('./src/Types-d3');

var _TypesD2 = _interopRequireDefault(_TypesD);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

d3.annotation = _AdapterD2.default;
d3.annotationTypeBase = _TypesD2.default.Type;
d3.annotationLabel = _TypesD2.default.d3Label;
d3.annotationCallout = _TypesD2.default.d3Callout;
d3.annotationCalloutCurve = _TypesD2.default.d3CalloutCurve;
d3.annotationCalloutElbow = _TypesD2.default.d3CalloutElbow;
d3.annotationCalloutCircle = _TypesD2.default.d3CalloutCircle;
d3.annotationCalloutRect = _TypesD2.default.d3CalloutRect;
d3.annotationXYThreshold = _TypesD2.default.d3XYThreshold;
d3.annotationBadge = _TypesD2.default.d3Badge;
d3.annotationCustomType = _TypesD2.default.customType;

},{"./src/Adapter-d3":6,"./src/Types-d3":23}]},{},[24]);
