(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('underscore'), require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'underscore', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.phylotree = global.phylotree || {}, global._, global._$1));
})(this, (function (exports, _, _$1) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var ___namespace = /*#__PURE__*/_interopNamespace(_);
  var ___namespace$1 = /*#__PURE__*/_interopNamespace(_$1);

  function ascending$1(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function descending(a, b) {
    return a == null || b == null ? NaN
      : b < a ? -1
      : b > a ? 1
      : b >= a ? 0
      : NaN;
  }

  function bisector(f) {
    let compare1, compare2, delta;

    // If an accessor is specified, promote it to a comparator. In this case we
    // can test whether the search value is (self-) comparable. We can’t do this
    // for a comparator (except for specific, known comparators) because we can’t
    // tell if the comparator is symmetric, and an asymmetric comparator can’t be
    // used to test whether a single value is comparable.
    if (f.length !== 2) {
      compare1 = ascending$1;
      compare2 = (d, x) => ascending$1(f(d), x);
      delta = (d, x) => f(d) - x;
    } else {
      compare1 = f === ascending$1 || f === descending ? f : zero$1;
      compare2 = f;
      delta = f;
    }

    function left(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function right(a, x, lo = 0, hi = a.length) {
      if (lo < hi) {
        if (compare1(x, x) !== 0) return hi;
        do {
          const mid = (lo + hi) >>> 1;
          if (compare2(a[mid], x) <= 0) lo = mid + 1;
          else hi = mid;
        } while (lo < hi);
      }
      return lo;
    }

    function center(a, x, lo = 0, hi = a.length) {
      const i = left(a, x, lo, hi - 1);
      return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }

    return {left, center, right};
  }

  function zero$1() {
    return 0;
  }

  function number$2(x) {
    return x === null ? NaN : +x;
  }

  const ascendingBisect = bisector(ascending$1);
  const bisectRight = ascendingBisect.right;
  bisector(number$2).center;
  var bisect = bisectRight;

  const e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);

  function tickSpec(start, stop, count) {
    const step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log10(step)),
        error = step / Math.pow(10, power),
        factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
    let i1, i2, inc;
    if (power < 0) {
      inc = Math.pow(10, -power) / factor;
      i1 = Math.round(start * inc);
      i2 = Math.round(stop * inc);
      if (i1 / inc < start) ++i1;
      if (i2 / inc > stop) --i2;
      inc = -inc;
    } else {
      inc = Math.pow(10, power) * factor;
      i1 = Math.round(start / inc);
      i2 = Math.round(stop / inc);
      if (i1 * inc < start) ++i1;
      if (i2 * inc > stop) --i2;
    }
    if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [i1, i2, inc];
  }

  function ticks(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    if (!(count > 0)) return [];
    if (start === stop) return [start];
    const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
    if (!(i2 >= i1)) return [];
    const n = i2 - i1 + 1, ticks = new Array(n);
    if (reverse) {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
      else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
    } else {
      if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
      else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
    }
    return ticks;
  }

  function tickIncrement(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    return tickSpec(start, stop, count)[2];
  }

  function tickStep(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
    return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
  }

  function max$1(values, valueof) {
    let max;
    if (valueof === undefined) {
      for (const value of values) {
        if (value != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    } else {
      let index = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index, values)) != null
            && (max < value || (max === undefined && value >= value))) {
          max = value;
        }
      }
    }
    return max;
  }

  function identity$4(x) {
    return x;
  }

  var top = 1,
      right = 2,
      bottom = 3,
      left = 4,
      epsilon$1 = 1e-6;

  function translateX(x) {
    return "translate(" + x + ",0)";
  }

  function translateY(y) {
    return "translate(0," + y + ")";
  }

  function number$1(scale) {
    return d => +scale(d);
  }

  function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round()) offset = Math.round(offset);
    return d => +scale(d) + offset;
  }

  function entering() {
    return !this.__axis;
  }

  function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3,
        offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
        k = orient === top || orient === left ? -1 : 1,
        x = orient === left || orient === right ? "x" : "y",
        transform = orient === top || orient === bottom ? translateX : translateY;

    function axis(context) {
      var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
          format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$4) : tickFormat,
          spacing = Math.max(tickSizeInner, 0) + tickPadding,
          range = scale.range(),
          range0 = +range[0] + offset,
          range1 = +range[range.length - 1] + offset,
          position = (scale.bandwidth ? center : number$1)(scale.copy(), offset),
          selection = context.selection ? context.selection() : context,
          path = selection.selectAll(".domain").data([null]),
          tick = selection.selectAll(".tick").data(values, scale).order(),
          tickExit = tick.exit(),
          tickEnter = tick.enter().append("g").attr("class", "tick"),
          line = tick.select("line"),
          text = tick.select("text");

      path = path.merge(path.enter().insert("path", ".tick")
          .attr("class", "domain")
          .attr("stroke", "currentColor"));

      tick = tick.merge(tickEnter);

      line = line.merge(tickEnter.append("line")
          .attr("stroke", "currentColor")
          .attr(x + "2", k * tickSizeInner));

      text = text.merge(tickEnter.append("text")
          .attr("fill", "currentColor")
          .attr(x, k * spacing)
          .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

      if (context !== selection) {
        path = path.transition(context);
        tick = tick.transition(context);
        line = line.transition(context);
        text = text.transition(context);

        tickExit = tickExit.transition(context)
            .attr("opacity", epsilon$1)
            .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform"); });

        tickEnter
            .attr("opacity", epsilon$1)
            .attr("transform", function(d) { var p = this.parentNode.__axis; return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset); });
      }

      tickExit.remove();

      path
          .attr("d", orient === left || orient === right
              ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1)
              : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1));

      tick
          .attr("opacity", 1)
          .attr("transform", function(d) { return transform(position(d) + offset); });

      line
          .attr(x + "2", k * tickSizeInner);

      text
          .attr(x, k * spacing)
          .text(format);

      selection.filter(entering)
          .attr("fill", "none")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

      selection
          .each(function() { this.__axis = position; });
    }

    axis.scale = function(_) {
      return arguments.length ? (scale = _, axis) : scale;
    };

    axis.ticks = function() {
      return tickArguments = Array.from(arguments), axis;
    };

    axis.tickArguments = function(_) {
      return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
    };

    axis.tickValues = function(_) {
      return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
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

    axis.offset = function(_) {
      return arguments.length ? (offset = +_, axis) : offset;
    };

    return axis;
  }

  function axisTop(scale) {
    return axis(top, scale);
  }

  var noop$1 = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
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
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
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

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

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
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
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

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array$1(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty$1() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty$1 : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array$1(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children$1() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children$1
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
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

  function constant$5(x) {
    return function() {
      return x;
    };
  }

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
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$5(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
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

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

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

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
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

    return new Selection$1(sortgroups, this._parents).order();
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
    return Array.from(this);
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
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
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

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
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
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
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

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
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

  function remove$1() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove$1);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
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
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
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
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
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

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
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
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function create$1(name) {
    return select(creator(name).call(document.documentElement));
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  // These are typically used in conjunction with noevent to ensure that we can
  const nonpassivecapture = {capture: true, passive: false};

  function noevent$2(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent$2, nonpassivecapture);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent$2, nonpassivecapture);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent$2, nonpassivecapture);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
      reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
      reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
      reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
      reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
      reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHex8() {
    return this.rgb().formatHex8();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }

  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }

  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }

  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }

  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));

  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }

  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$4 = x => () => x;

  function linear$1(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$4(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant$4(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function numberArray(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0,
        c = b.slice(),
        i;
    return function(t) {
      for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
      return c;
    };
  }

  function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
  }

  function genericArray(a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
    for (; i < nb; ++i) c[i] = b[i];

    return function(t) {
      for (i = 0; i < na; ++i) c[i] = x[i](t);
      return c;
    };
  }

  function date(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
      return d.setTime(a * (1 - t) + b * t), d;
    };
  }

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  function object(a, b) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolate$1(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  function interpolate$1(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant$4(b)
        : (t === "number" ? interpolateNumber
        : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : b instanceof Date ? date
        : isNumberArray(b) ? numberArray
        : Array.isArray(b) ? genericArray
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : interpolateNumber)(a, b);
  }

  function interpolateRound(a, b) {
    return a = +a, b = +b, function(t) {
      return Math.round(a * (1 - t) + b * t);
    };
  }

  var degrees = 180 / Math.PI;

  var identity$3 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$3;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000 * rho / Math.SQRT2;

      return i;
    }

    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };

    return zoom;
  })(Math.SQRT2, 2, 4);

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init$1(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
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

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init$1(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init$1(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init$1 : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  var constant$3 = x => () => x;

  function BrushEvent(type, {
    sourceEvent,
    target,
    selection,
    mode,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      selection: {value: selection, enumerable: true, configurable: true},
      mode: {value: mode, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function nopropagation$1(event) {
    event.stopImmediatePropagation();
  }

  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  var MODE_DRAG = {name: "drag"},
      MODE_SPACE = {name: "space"},
      MODE_HANDLE = {name: "handle"},
      MODE_CENTER = {name: "center"};

  const {abs, max, min} = Math;

  function number1(e) {
    return [+e[0], +e[1]];
  }

  function number2(e) {
    return [number1(e[0]), number1(e[1])];
  }

  var X = {
    name: "x",
    handles: ["w", "e"].map(type),
    input: function(x, e) { return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]]; },
    output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
  };

  var Y = {
    name: "y",
    handles: ["n", "s"].map(type),
    input: function(y, e) { return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]]; },
    output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
  };

  var XY = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
    input: function(xy) { return xy == null ? null : number2(xy); },
    output: function(xy) { return xy; }
  };

  var cursors = {
    overlay: "crosshair",
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
    overlay: +1,
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
    overlay: +1,
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

  // Ignore right-click, since that should open the context menu.
  function defaultFilter$1(event) {
    return !event.ctrlKey && !event.button;
  }

  function defaultExtent$1() {
    var svg = this.ownerSVGElement || this;
    if (svg.hasAttribute("viewBox")) {
      svg = svg.viewBox.baseVal;
      return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
    }
    return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
  }

  function defaultTouchable$1() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  // Like d3.local, but with the name “__brush” rather than auto-generated.
  function local(node) {
    while (!node.__brush) if (!(node = node.parentNode)) return;
    return node.__brush;
  }

  function empty(extent) {
    return extent[0][0] === extent[1][0]
        || extent[0][1] === extent[1][1];
  }

  function brush() {
    return brush$1(XY);
  }

  function brush$1(dim) {
    var extent = defaultExtent$1,
        filter = defaultFilter$1,
        touchable = defaultTouchable$1,
        keys = true,
        listeners = dispatch("start", "brush", "end"),
        handleSize = 6,
        touchending;

    function brush(group) {
      var overlay = group
          .property("__brush", initialize)
        .selectAll(".overlay")
        .data([type("overlay")]);

      overlay.enter().append("rect")
          .attr("class", "overlay")
          .attr("pointer-events", "all")
          .attr("cursor", cursors.overlay)
        .merge(overlay)
          .each(function() {
            var extent = local(this).extent;
            select(this)
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
          .attr("fill", "#777")
          .attr("fill-opacity", 0.3)
          .attr("stroke", "#fff")
          .attr("shape-rendering", "crispEdges");

      var handle = group.selectAll(".handle")
        .data(dim.handles, function(d) { return d.type; });

      handle.exit().remove();

      handle.enter().append("rect")
          .attr("class", function(d) { return "handle handle--" + d.type; })
          .attr("cursor", function(d) { return cursors[d.type]; });

      group
          .each(redraw)
          .attr("fill", "none")
          .attr("pointer-events", "all")
          .on("mousedown.brush", started)
        .filter(touchable)
          .on("touchstart.brush", started)
          .on("touchmove.brush", touchmoved)
          .on("touchend.brush touchcancel.brush", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    brush.move = function(group, selection, event) {
      if (group.tween) {
        group
            .on("start.brush", function(event) { emitter(this, arguments).beforestart().start(event); })
            .on("interrupt.brush end.brush", function(event) { emitter(this, arguments).end(event); })
            .tween("brush", function() {
              var that = this,
                  state = that.__brush,
                  emit = emitter(that, arguments),
                  selection0 = state.selection,
                  selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
                  i = interpolate$1(selection0, selection1);

              function tween(t) {
                state.selection = t === 1 && selection1 === null ? null : i(t);
                redraw.call(that);
                emit.brush();
              }

              return selection0 !== null && selection1 !== null ? tween : tween(1);
            });
      } else {
        group
            .each(function() {
              var that = this,
                  args = arguments,
                  state = that.__brush,
                  selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
                  emit = emitter(that, args).beforestart();

              interrupt(that);
              state.selection = selection1 === null ? null : selection1;
              redraw.call(that);
              emit.start(event).brush(event).end(event);
            });
      }
    };

    brush.clear = function(group, event) {
      brush.move(group, null, event);
    };

    function redraw() {
      var group = select(this),
          selection = local(this).selection;

      if (selection) {
        group.selectAll(".selection")
            .style("display", null)
            .attr("x", selection[0][0])
            .attr("y", selection[0][1])
            .attr("width", selection[1][0] - selection[0][0])
            .attr("height", selection[1][1] - selection[0][1]);

        group.selectAll(".handle")
            .style("display", null)
            .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
            .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
            .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
            .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
      }

      else {
        group.selectAll(".selection,.handle")
            .style("display", "none")
            .attr("x", null)
            .attr("y", null)
            .attr("width", null)
            .attr("height", null);
      }
    }

    function emitter(that, args, clean) {
      var emit = that.__brush.emitter;
      return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
    }

    function Emitter(that, args, clean) {
      this.that = that;
      this.args = args;
      this.state = that.__brush;
      this.active = 0;
      this.clean = clean;
    }

    Emitter.prototype = {
      beforestart: function() {
        if (++this.active === 1) this.state.emitter = this, this.starting = true;
        return this;
      },
      start: function(event, mode) {
        if (this.starting) this.starting = false, this.emit("start", event, mode);
        else this.emit("brush", event);
        return this;
      },
      brush: function(event, mode) {
        this.emit("brush", event, mode);
        return this;
      },
      end: function(event, mode) {
        if (--this.active === 0) delete this.state.emitter, this.emit("end", event, mode);
        return this;
      },
      emit: function(type, event, mode) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new BrushEvent(type, {
            sourceEvent: event,
            target: brush,
            selection: dim.output(this.state.selection),
            mode,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function started(event) {
      if (touchending && !event.touches) return;
      if (!filter.apply(this, arguments)) return;

      var that = this,
          type = event.target.__data__.type,
          mode = (keys && event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (keys && event.altKey ? MODE_CENTER : MODE_HANDLE),
          signX = dim === Y ? null : signsX[type],
          signY = dim === X ? null : signsY[type],
          state = local(that),
          extent = state.extent,
          selection = state.selection,
          W = extent[0][0], w0, w1,
          N = extent[0][1], n0, n1,
          E = extent[1][0], e0, e1,
          S = extent[1][1], s0, s1,
          dx = 0,
          dy = 0,
          moving,
          shifting = signX && signY && keys && event.shiftKey,
          lockX,
          lockY,
          points = Array.from(event.touches || [event], t => {
            const i = t.identifier;
            t = pointer(t, that);
            t.point0 = t.slice();
            t.identifier = i;
            return t;
          });

      interrupt(that);
      var emit = emitter(that, arguments, true).beforestart();

      if (type === "overlay") {
        if (selection) moving = true;
        const pts = [points[0], points[1] || points[0]];
        state.selection = selection = [[
            w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),
            n0 = dim === X ? N : min(pts[0][1], pts[1][1])
          ], [
            e0 = dim === Y ? E : max(pts[0][0], pts[1][0]),
            s0 = dim === X ? S : max(pts[0][1], pts[1][1])
          ]];
        if (points.length > 1) move(event);
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

      var group = select(that)
          .attr("pointer-events", "none");

      var overlay = group.selectAll(".overlay")
          .attr("cursor", cursors[type]);

      if (event.touches) {
        emit.moved = moved;
        emit.ended = ended;
      } else {
        var view = select(event.view)
            .on("mousemove.brush", moved, true)
            .on("mouseup.brush", ended, true);
        if (keys) view
            .on("keydown.brush", keydowned, true)
            .on("keyup.brush", keyupped, true);

        dragDisable(event.view);
      }

      redraw.call(that);
      emit.start(event, mode.name);

      function moved(event) {
        for (const p of event.changedTouches || [event]) {
          for (const d of points)
            if (d.identifier === p.identifier) d.cur = pointer(p, that);
        }
        if (shifting && !lockX && !lockY && points.length === 1) {
          const point = points[0];
          if (abs(point.cur[0] - point[0]) > abs(point.cur[1] - point[1]))
            lockY = true;
          else
            lockX = true;
        }
        for (const point of points)
          if (point.cur) point[0] = point.cur[0], point[1] = point.cur[1];
        moving = true;
        noevent$1(event);
        move(event);
      }

      function move(event) {
        const point = points[0], point0 = point.point0;
        var t;

        dx = point[0] - point0[0];
        dy = point[1] - point0[1];

        switch (mode) {
          case MODE_SPACE:
          case MODE_DRAG: {
            if (signX) dx = max(W - w0, min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
            if (signY) dy = max(N - n0, min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
            break;
          }
          case MODE_HANDLE: {
            if (points[1]) {
              if (signX) w1 = max(W, min(E, points[0][0])), e1 = max(W, min(E, points[1][0])), signX = 1;
              if (signY) n1 = max(N, min(S, points[0][1])), s1 = max(N, min(S, points[1][1])), signY = 1;
            } else {
              if (signX < 0) dx = max(W - w0, min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
              else if (signX > 0) dx = max(W - e0, min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
              if (signY < 0) dy = max(N - n0, min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
              else if (signY > 0) dy = max(N - s0, min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
            }
            break;
          }
          case MODE_CENTER: {
            if (signX) w1 = max(W, min(E, w0 - dx * signX)), e1 = max(W, min(E, e0 + dx * signX));
            if (signY) n1 = max(N, min(S, n0 - dy * signY)), s1 = max(N, min(S, s0 + dy * signY));
            break;
          }
        }

        if (e1 < w1) {
          signX *= -1;
          t = w0, w0 = e0, e0 = t;
          t = w1, w1 = e1, e1 = t;
          if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
        }

        if (s1 < n1) {
          signY *= -1;
          t = n0, n0 = s0, s0 = t;
          t = n1, n1 = s1, s1 = t;
          if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
        }

        if (state.selection) selection = state.selection; // May be set by brush.move!
        if (lockX) w1 = selection[0][0], e1 = selection[1][0];
        if (lockY) n1 = selection[0][1], s1 = selection[1][1];

        if (selection[0][0] !== w1
            || selection[0][1] !== n1
            || selection[1][0] !== e1
            || selection[1][1] !== s1) {
          state.selection = [[w1, n1], [e1, s1]];
          redraw.call(that);
          emit.brush(event, mode.name);
        }
      }

      function ended(event) {
        nopropagation$1(event);
        if (event.touches) {
          if (event.touches.length) return;
          if (touchending) clearTimeout(touchending);
          touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
        } else {
          yesdrag(event.view, moving);
          view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
        }
        group.attr("pointer-events", "all");
        overlay.attr("cursor", cursors.overlay);
        if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
        if (empty(selection)) state.selection = null, redraw.call(that);
        emit.end(event, mode.name);
      }

      function keydowned(event) {
        switch (event.keyCode) {
          case 16: { // SHIFT
            shifting = signX && signY;
            break;
          }
          case 18: { // ALT
            if (mode === MODE_HANDLE) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
              move(event);
            }
            break;
          }
          case 32: { // SPACE; takes priority over ALT
            if (mode === MODE_HANDLE || mode === MODE_CENTER) {
              if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
              if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
              mode = MODE_SPACE;
              overlay.attr("cursor", cursors.selection);
              move(event);
            }
            break;
          }
          default: return;
        }
        noevent$1(event);
      }

      function keyupped(event) {
        switch (event.keyCode) {
          case 16: { // SHIFT
            if (shifting) {
              lockX = lockY = shifting = false;
              move(event);
            }
            break;
          }
          case 18: { // ALT
            if (mode === MODE_CENTER) {
              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
              move(event);
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
                mode = MODE_HANDLE;
              }
              overlay.attr("cursor", cursors[type]);
              move(event);
            }
            break;
          }
          default: return;
        }
        noevent$1(event);
      }
    }

    function touchmoved(event) {
      emitter(this, arguments).moved(event);
    }

    function touchended(event) {
      emitter(this, arguments).ended(event);
    }

    function initialize() {
      var state = this.__brush || {selection: null};
      state.extent = number2(extent.apply(this, arguments));
      state.dim = dim;
      return state;
    }

    brush.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$3(number2(_)), brush) : extent;
    };

    brush.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$3(!!_), brush) : filter;
    };

    brush.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$3(!!_), brush) : touchable;
    };

    brush.handleSize = function(_) {
      return arguments.length ? (handleSize = +_, brush) : handleSize;
    };

    brush.keyModifiers = function(_) {
      return arguments.length ? (keys = !!_, brush) : keys;
    };

    brush.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? brush : value;
    };

    return brush;
  }

  const pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

  function append(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += arguments[i] + strings[i];
    }
  }

  function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function(strings) {
      this._ += strings[0];
      for (let i = 1, n = strings.length; i < n; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }

  class Path {
    constructor(digits) {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null; // end of current subpath
      this._ = "";
      this._append = digits == null ? append : appendRound(digits);
    }
    moveTo(x, y) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }
    closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._append`Z`;
      }
    }
    lineTo(x, y) {
      this._append`L${this._x1 = +x},${this._y1 = +y}`;
    }
    quadraticCurveTo(x1, y1, x, y) {
      this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
    }
    bezierCurveTo(x1, y1, x2, y2, x, y) {
      this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
    }
    arcTo(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._append`M${this._x1 = x1},${this._y1 = y1}`;
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
        this._append`L${this._x1 = x1},${this._y1 = y1}`;
      }

      // Otherwise, draw an arc!
      else {
        let x20 = x2 - x0,
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
          this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
        }

        this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
      }
    }
    arc(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._append`M${x0},${y0}`;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
        this._append`L${x0},${y0}`;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau + tau;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
        this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
      }
    }
    rect(x, y, w, h) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
    }
    toString() {
      return this._;
    }
  }

  function formatDecimal(x) {
    return Math.abs(x = Math.round(x)) >= 1e21
        ? x.toLocaleString("en").replace(/,/g, "")
        : x.toString(10);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimalParts(1.23) returns ["123", 0].
  function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width === undefined ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimalParts(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": (x, p) => (x * 100).toFixed(p),
    "b": (x) => Math.round(x).toString(2),
    "c": (x) => x + "",
    "d": formatDecimal,
    "e": (x, p) => x.toExponential(p),
    "f": (x, p) => x.toFixed(p),
    "g": (x, p) => x.toPrecision(p),
    "o": (x) => Math.round(x).toString(8),
    "p": (x, p) => formatRounded(x * 100, p),
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": (x) => Math.round(x).toString(16).toUpperCase(),
    "x": (x) => Math.round(x).toString(16)
  };

  function identity$2(x) {
    return x;
  }

  var map = Array.prototype.map,
      prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale$1(locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$2 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$2 : formatNumerals(map.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "−" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision === undefined ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Determine the sign. -0 is not less than 0, but 1 / -0 is!
          var valueNegative = value < 0 || 1 / value < 0;

          // Perform the initial formatting.
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale$1;
  var format$1;
  var formatPrefix;

  defaultLocale$1({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    format$1 = locale$1.format;
    formatPrefix = locale$1.formatPrefix;
    return locale$1;
  }

  function precisionFixed(step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound(step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function count(node) {
    var sum = 0,
        children = node.children,
        i = children && children.length;
    if (!i) sum = 1;
    else while (--i >= 0) sum += children[i].value;
    node.value = sum;
  }

  function node_count() {
    return this.eachAfter(count);
  }

  function node_each(callback, that) {
    let index = -1;
    for (const node of this) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_eachBefore(callback, that) {
    var node = this, nodes = [node], children, i, index = -1;
    while (node = nodes.pop()) {
      callback.call(that, node, ++index, this);
      if (children = node.children) {
        for (i = children.length - 1; i >= 0; --i) {
          nodes.push(children[i]);
        }
      }
    }
    return this;
  }

  function node_eachAfter(callback, that) {
    var node = this, nodes = [node], next = [], children, i, n, index = -1;
    while (node = nodes.pop()) {
      next.push(node);
      if (children = node.children) {
        for (i = 0, n = children.length; i < n; ++i) {
          nodes.push(children[i]);
        }
      }
    }
    while (node = next.pop()) {
      callback.call(that, node, ++index, this);
    }
    return this;
  }

  function node_find(callback, that) {
    let index = -1;
    for (const node of this) {
      if (callback.call(that, node, ++index, this)) {
        return node;
      }
    }
  }

  function node_sum(value) {
    return this.eachAfter(function(node) {
      var sum = +value(node.data) || 0,
          children = node.children,
          i = children && children.length;
      while (--i >= 0) sum += children[i].value;
      node.value = sum;
    });
  }

  function node_sort(compare) {
    return this.eachBefore(function(node) {
      if (node.children) {
        node.children.sort(compare);
      }
    });
  }

  function node_path(end) {
    var start = this,
        ancestor = leastCommonAncestor(start, end),
        nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      nodes.splice(k, 0, end);
      end = end.parent;
    }
    return nodes;
  }

  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
        bNodes = b.ancestors(),
        c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }

  function node_ancestors() {
    var node = this, nodes = [node];
    while (node = node.parent) {
      nodes.push(node);
    }
    return nodes;
  }

  function node_descendants() {
    return Array.from(this);
  }

  function node_leaves() {
    var leaves = [];
    this.eachBefore(function(node) {
      if (!node.children) {
        leaves.push(node);
      }
    });
    return leaves;
  }

  function node_links() {
    var root = this, links = [];
    root.each(function(node) {
      if (node !== root) { // Don’t include the root’s parent, if any.
        links.push({source: node.parent, target: node});
      }
    });
    return links;
  }

  function* node_iterator() {
    var node = this, current, next = [node], children, i, n;
    do {
      current = next.reverse(), next = [];
      while (node = current.pop()) {
        yield node;
        if (children = node.children) {
          for (i = 0, n = children.length; i < n; ++i) {
            next.push(children[i]);
          }
        }
      }
    } while (next.length);
  }

  function hierarchy(data, children) {
    if (data instanceof Map) {
      data = [undefined, data];
      if (children === undefined) children = mapChildren;
    } else if (children === undefined) {
      children = objectChildren;
    }

    var root = new Node(data),
        node,
        nodes = [root],
        child,
        childs,
        i,
        n;

    while (node = nodes.pop()) {
      if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
        node.children = childs;
        for (i = n - 1; i >= 0; --i) {
          nodes.push(child = childs[i] = new Node(childs[i]));
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }

    return root.eachBefore(computeHeight);
  }

  function node_copy() {
    return hierarchy(this).eachBefore(copyData);
  }

  function objectChildren(d) {
    return d.children;
  }

  function mapChildren(d) {
    return Array.isArray(d) ? d[1] : null;
  }

  function copyData(node) {
    if (node.data.value !== undefined) node.value = node.data.value;
    node.data = node.data.data;
  }

  function computeHeight(node) {
    var height = 0;
    do node.height = height;
    while ((node = node.parent) && (node.height < ++height));
  }

  function Node(data) {
    this.data = data;
    this.depth =
    this.height = 0;
    this.parent = null;
  }

  Node.prototype = hierarchy.prototype = {
    constructor: Node,
    count: node_count,
    each: node_each,
    eachAfter: node_eachAfter,
    eachBefore: node_eachBefore,
    find: node_find,
    sum: node_sum,
    sort: node_sort,
    path: node_path,
    ancestors: node_ancestors,
    descendants: node_descendants,
    leaves: node_leaves,
    links: node_links,
    copy: node_copy,
    [Symbol.iterator]: node_iterator
  };

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  function constants(x) {
    return function() {
      return x;
    };
  }

  function number(x) {
    return +x;
  }

  var unit = [0, 1];

  function identity$1(x) {
    return x;
  }

  function normalize$1(a, b) {
    return (b -= (a = +a))
        ? function(x) { return (x - a) / b; }
        : constants(isNaN(b) ? NaN : 0.5);
  }

  function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) { return Math.max(a, Math.min(b, x)); };
  }

  // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
  function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize$1(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize$1(d0, d1), r0 = interpolate(r0, r1);
    return function(x) { return r0(d0(x)); };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1;

    // Reverse descending domains.
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize$1(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function(x) {
      var i = bisect(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target
        .domain(source.domain())
        .range(source.range())
        .interpolate(source.interpolate())
        .clamp(source.clamp())
        .unknown(source.unknown());
  }

  function transformer() {
    var domain = unit,
        range = unit,
        interpolate = interpolate$1,
        transform,
        untransform,
        unknown,
        clamp = identity$1,
        piecewise,
        output,
        input;

    function rescale() {
      var n = Math.min(domain.length, range.length);
      if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }

    scale.invert = function(y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
    };

    scale.range = function(_) {
      return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = Array.from(_), interpolate = interpolateRound, rescale();
    };

    scale.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
    };

    scale.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function(t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }

  function continuous() {
    return transformer()(identity$1, identity$1);
  }

  function tickFormat(start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format$1(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function(count) {
      if (count == null) count = 10;

      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      
      while (maxIter-- > 0) {
        step = tickIncrement(start, stop, count);
        if (step === prestep) {
          d[i0] = start;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start = Math.floor(start / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start = Math.ceil(start * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }

      return scale;
    };

    return scale;
  }

  function linear() {
    var scale = continuous();

    scale.copy = function() {
      return copy(scale, linear());
    };

    initRange.apply(scale, arguments);

    return linearish(scale);
  }

  const t0 = new Date, t1 = new Date;

  function timeInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
    }

    interval.floor = (date) => {
      return floori(date = new Date(+date)), date;
    };

    interval.ceil = (date) => {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = (date) => {
      const d0 = interval(date), d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = (date, step) => {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = (start, stop, step) => {
      const range = [];
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      let previous;
      do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
      while (previous < start && start < stop);
      return range;
    };

    interval.filter = (test) => {
      return timeInterval((date) => {
        if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
      }, (date, step) => {
        if (date >= date) {
          if (step < 0) while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
          } else while (--step >= 0) {
            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
          }
        }
      });
    };

    if (count) {
      interval.count = (start, end) => {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = (step) => {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? (d) => field(d) % step === 0
                : (d) => interval.count(0, d) % step === 0);
      };
    }

    return interval;
  }

  const durationSecond = 1000;
  const durationMinute = durationSecond * 60;
  const durationHour = durationMinute * 60;
  const durationDay = durationHour * 24;
  const durationWeek = durationDay * 7;

  const timeDay = timeInterval(
    date => date.setHours(0, 0, 0, 0),
    (date, step) => date.setDate(date.getDate() + step),
    (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
    date => date.getDate() - 1
  );

  timeDay.range;

  const utcDay = timeInterval((date) => {
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step);
  }, (start, end) => {
    return (end - start) / durationDay;
  }, (date) => {
    return date.getUTCDate() - 1;
  });

  utcDay.range;

  const unixDay = timeInterval((date) => {
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step);
  }, (start, end) => {
    return (end - start) / durationDay;
  }, (date) => {
    return Math.floor(date / durationDay);
  });

  unixDay.range;

  function timeWeekday(i) {
    return timeInterval((date) => {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setDate(date.getDate() + step * 7);
    }, (start, end) => {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  const timeSunday = timeWeekday(0);
  const timeMonday = timeWeekday(1);
  const timeTuesday = timeWeekday(2);
  const timeWednesday = timeWeekday(3);
  const timeThursday = timeWeekday(4);
  const timeFriday = timeWeekday(5);
  const timeSaturday = timeWeekday(6);

  timeSunday.range;
  timeMonday.range;
  timeTuesday.range;
  timeWednesday.range;
  timeThursday.range;
  timeFriday.range;
  timeSaturday.range;

  function utcWeekday(i) {
    return timeInterval((date) => {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, (start, end) => {
      return (end - start) / durationWeek;
    });
  }

  const utcSunday = utcWeekday(0);
  const utcMonday = utcWeekday(1);
  const utcTuesday = utcWeekday(2);
  const utcWednesday = utcWeekday(3);
  const utcThursday = utcWeekday(4);
  const utcFriday = utcWeekday(5);
  const utcSaturday = utcWeekday(6);

  utcSunday.range;
  utcMonday.range;
  utcTuesday.range;
  utcWednesday.range;
  utcThursday.range;
  utcFriday.range;
  utcSaturday.range;

  const timeYear = timeInterval((date) => {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step);
  }, (start, end) => {
    return end.getFullYear() - start.getFullYear();
  }, (date) => {
    return date.getFullYear();
  });

  // An optimized implementation for this simple case.
  timeYear.every = (k) => {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  timeYear.range;

  const utcYear = timeInterval((date) => {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, (start, end) => {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, (date) => {
    return date.getUTCFullYear();
  });

  // An optimized implementation for this simple case.
  utcYear.every = (k) => {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval((date) => {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, (date, step) => {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  utcYear.range;

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newDate(y, m, d) {
    return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
  }

  function formatLocale(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "g": formatYearISO,
      "G": formatFullYearISO,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "q": formatQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "g": formatUTCYearISO,
      "G": formatUTCFullYearISO,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "q": formatUTCQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "g": parseYear,
      "G": parseFullYear,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "q": parseQuarter,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, Z) {
      return function(string) {
        var d = newDate(1900, undefined, 1),
            i = parseSpecifier(d, specifier, string += "", 0),
            week, day;
        if (i != string.length) return null;

        // If a UNIX timestamp is specified, return it.
        if ("Q" in d) return new Date(d.Q);
        if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

        // If this is utcParse, never use the local timezone.
        if (Z && !("Z" in d)) d.Z = 0;

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // If the month was not specified, inherit from the quarter.
        if (d.m === undefined) d.m = "q" in d ? d.q : 0;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;
          if ("Z" in d) {
            week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
            week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
            week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
            week = timeDay.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return localDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatQuarter(d) {
      return 1 + ~~(d.getMonth() / 3);
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    function formatUTCQuarter(d) {
      return 1 + ~~(d.getUTCMonth() / 3);
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() { return specifier; };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", false);
        p.toString = function() { return specifier; };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() { return specifier; };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier += "", true);
        p.toString = function() { return specifier; };
        return p;
      }
    };
  }

  var pads = {"-": "", "_": " ", "0": "0"},
      numberRe = /^\s*\d+/, // note: ignores next directive
      percentRe = /^%/,
      requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    return new Map(names.map((name, i) => [name.toLowerCase(), i]));
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + timeDay.count(timeYear(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
  }

  function dISO(d) {
    var day = d.getDay();
    return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  }

  function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatYearISO(d, p) {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatFullYearISO(d, p) {
    var day = d.getDay();
    d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad(z / 60 | 0, "0", 2)
        + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
  }

  function UTCdISO(d) {
    var day = d.getUTCDay();
    return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  }

  function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCFullYearISO(d, p) {
    var day = d.getUTCDay();
    d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale;
  var timeParse;

  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    locale.format;
    timeParse = locale.parse;
    locale.utcFormat;
    locale.utcParse;
    return locale;
  }

  function constant$2(x) {
    return function constant() {
      return x;
    };
  }

  function withPath(shape) {
    let digits = 3;

    shape.digits = function(_) {
      if (!arguments.length) return digits;
      if (_ == null) {
        digits = null;
      } else {
        const d = Math.floor(_);
        if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
        digits = d;
      }
      return shape;
    };

    return () => new Path(digits);
  }

  function array(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

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
        case 1: this._point = 2; // falls through
        default: this._context.lineTo(x, y); break;
      }
    }
  };

  function curveLinear(context) {
    return new Linear(context);
  }

  function x(p) {
    return p[0];
  }

  function y(p) {
    return p[1];
  }

  function line(x$1, y$1) {
    var defined = constant$2(true),
        context = null,
        curve = curveLinear,
        output = null,
        path = withPath(line);

    x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant$2(x$1);
    y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant$2(y$1);

    function line(data) {
      var i,
          n = (data = array(data)).length,
          d,
          defined0 = false,
          buffer;

      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();
          else output.lineEnd();
        }
        if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function(_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$2(+_), line) : x$1;
    };

    line.y = function(_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$2(+_), line) : y$1;
    };

    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), line) : defined;
    };

    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

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
        case 3: point(this, this._x1, this._y1); // falls through
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
        case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };

  function basis(context) {
    return new Basis(context);
  }

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
        case 1: this._point = 2; // falls through
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

  function stepBefore(context) {
    return new Step(context, 0);
  }

  var constant$1 = x => () => x;

  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      transform: {value: transform, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function Transform$1(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform$1.prototype = {
    constructor: Transform$1,
    scale: function(k) {
      return k === 1 ? this : new Transform$1(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform$1(this.k, this.x + this.k * x, this.y + this.k * y);
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

  var identity = new Transform$1(1, 0, 0);

  Transform$1.prototype;

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === 'wheel') && !event.button;
  }

  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function defaultConstrain(transform, extent, translateExtent) {
    var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
        dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
        dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
        dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function zoom() {
    var filter = defaultFilter,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchfirst,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0,
        tapDistance = 10;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled, {passive: false})
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point, event) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point, event);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
            .event(event)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p, event) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };

    zoom.scaleTo = function(selection, k, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };

    zoom.translateBy = function(selection, x, y, event) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };

    zoom.translateTo = function(selection, x, y, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };

    function scale(transform, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform.k ? transform : new Transform$1(k, transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
      return x === transform.x && y === transform.y ? transform : new Transform$1(transform.k, x, y);
    }

    function centroid(extent) {
      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    }

    function schedule(transition, transform, point, event) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args).event(event),
                e = extent.apply(that, args),
                p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform$1(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args, clean) {
      return (!clean && that.__zooming) || new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function wheeled(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, args).event(event),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = pointer(event);

      // If the mouse is in the same location as before, reuse it.
      // If there were recent wheel events, reset the wheel idle timeout.
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      }

      // If this wheel event won’t trigger a transform change, ignore it.
      else if (t.k === k) return;

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.mouse = [p, t.invert(p)];
        interrupt(this);
        g.start();
      }

      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned(event, ...args) {
      if (touchending || !filter.apply(this, arguments)) return;
      var currentTarget = event.currentTarget,
          g = gesture(this, args, true).event(event),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = pointer(event, currentTarget),
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved(event) {
        noevent(event);
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event)
         .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped(event) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent(event);
        g.event(event).end();
      }
    }

    function dblclicked(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
      else select(this).call(zoom.transform, t1, p0, event);
    }

    function touchstarted(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, args, event.changedTouches.length === n).event(event),
          started, i, t, p;

      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
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

      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }

    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
        if (g.taps === 2) {
          t = pointer(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$1(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$1([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };

    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };

    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };

    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };

    return zoom;
  }

  function getAugmentedNamespace(n) {
    if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
    var f = n.default;
  	if (typeof f == "function") {
  		var a = function a () {
  			var isInstance = false;
        try {
          isInstance = this instanceof a;
        } catch {}
  			if (isInstance) {
          return Reflect.construct(f, arguments, this.constructor);
  			}
  			return f.apply(this, arguments);
  		};
  		a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  var xml2js = {};

  var defaults = {};

  var hasRequiredDefaults;

  function requireDefaults () {
  	if (hasRequiredDefaults) return defaults;
  	hasRequiredDefaults = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  defaults.defaults = {
  	    "0.1": {
  	      explicitCharkey: false,
  	      trim: true,
  	      normalize: true,
  	      normalizeTags: false,
  	      attrkey: "@",
  	      charkey: "#",
  	      explicitArray: false,
  	      ignoreAttrs: false,
  	      mergeAttrs: false,
  	      explicitRoot: false,
  	      validator: null,
  	      xmlns: false,
  	      explicitChildren: false,
  	      childkey: '@@',
  	      charsAsChildren: false,
  	      includeWhiteChars: false,
  	      async: false,
  	      strict: true,
  	      attrNameProcessors: null,
  	      attrValueProcessors: null,
  	      tagNameProcessors: null,
  	      valueProcessors: null,
  	      emptyTag: ''
  	    },
  	    "0.2": {
  	      explicitCharkey: false,
  	      trim: false,
  	      normalize: false,
  	      normalizeTags: false,
  	      attrkey: "$",
  	      charkey: "_",
  	      explicitArray: true,
  	      ignoreAttrs: false,
  	      mergeAttrs: false,
  	      explicitRoot: true,
  	      validator: null,
  	      xmlns: false,
  	      explicitChildren: false,
  	      preserveChildrenOrder: false,
  	      childkey: '$$',
  	      charsAsChildren: false,
  	      includeWhiteChars: false,
  	      async: false,
  	      strict: true,
  	      attrNameProcessors: null,
  	      attrValueProcessors: null,
  	      tagNameProcessors: null,
  	      valueProcessors: null,
  	      rootName: 'root',
  	      xmldec: {
  	        'version': '1.0',
  	        'encoding': 'UTF-8',
  	        'standalone': true
  	      },
  	      doctype: null,
  	      renderOpts: {
  	        'pretty': true,
  	        'indent': '  ',
  	        'newline': '\n'
  	      },
  	      headless: false,
  	      chunkSize: 10000,
  	      emptyTag: '',
  	      cdata: false
  	    }
  	  };

  	}).call(defaults);
  	return defaults;
  }

  var builder = {};

  var lib = {};

  var Utility = {};

  var hasRequiredUtility;

  function requireUtility () {
  	if (hasRequiredUtility) return Utility;
  	hasRequiredUtility = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject,
  	    slice = [].slice,
  	    hasProp = {}.hasOwnProperty;

  	  assign = function() {
  	    var i, key, len, source, sources, target;
  	    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  	    if (isFunction(Object.assign)) {
  	      Object.assign.apply(null, arguments);
  	    } else {
  	      for (i = 0, len = sources.length; i < len; i++) {
  	        source = sources[i];
  	        if (source != null) {
  	          for (key in source) {
  	            if (!hasProp.call(source, key)) continue;
  	            target[key] = source[key];
  	          }
  	        }
  	      }
  	    }
  	    return target;
  	  };

  	  isFunction = function(val) {
  	    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  	  };

  	  isObject = function(val) {
  	    var ref;
  	    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  	  };

  	  isArray = function(val) {
  	    if (isFunction(Array.isArray)) {
  	      return Array.isArray(val);
  	    } else {
  	      return Object.prototype.toString.call(val) === '[object Array]';
  	    }
  	  };

  	  isEmpty = function(val) {
  	    var key;
  	    if (isArray(val)) {
  	      return !val.length;
  	    } else {
  	      for (key in val) {
  	        if (!hasProp.call(val, key)) continue;
  	        return false;
  	      }
  	      return true;
  	    }
  	  };

  	  isPlainObject = function(val) {
  	    var ctor, proto;
  	    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  	  };

  	  getValue = function(obj) {
  	    if (isFunction(obj.valueOf)) {
  	      return obj.valueOf();
  	    } else {
  	      return obj;
  	    }
  	  };

  	  Utility.assign = assign;

  	  Utility.isFunction = isFunction;

  	  Utility.isObject = isObject;

  	  Utility.isArray = isArray;

  	  Utility.isEmpty = isEmpty;

  	  Utility.isPlainObject = isPlainObject;

  	  Utility.getValue = getValue;

  	}).call(Utility);
  	return Utility;
  }

  var XMLDOMImplementation$1 = {exports: {}};

  var XMLDOMImplementation = XMLDOMImplementation$1.exports;

  var hasRequiredXMLDOMImplementation;

  function requireXMLDOMImplementation () {
  	if (hasRequiredXMLDOMImplementation) return XMLDOMImplementation$1.exports;
  	hasRequiredXMLDOMImplementation = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {

  	  XMLDOMImplementation$1.exports = (function() {
  	    function XMLDOMImplementation() {}

  	    XMLDOMImplementation.prototype.hasFeature = function(feature, version) {
  	      return true;
  	    };

  	    XMLDOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    XMLDOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    XMLDOMImplementation.prototype.createHTMLDocument = function(title) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    XMLDOMImplementation.prototype.getFeature = function(feature, version) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    return XMLDOMImplementation;

  	  })();

  	}).call(XMLDOMImplementation);
  	return XMLDOMImplementation$1.exports;
  }

  var XMLDocument$1 = {exports: {}};

  var XMLDOMConfiguration$1 = {exports: {}};

  var XMLDOMErrorHandler$1 = {exports: {}};

  var XMLDOMErrorHandler = XMLDOMErrorHandler$1.exports;

  var hasRequiredXMLDOMErrorHandler;

  function requireXMLDOMErrorHandler () {
  	if (hasRequiredXMLDOMErrorHandler) return XMLDOMErrorHandler$1.exports;
  	hasRequiredXMLDOMErrorHandler = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {

  	  XMLDOMErrorHandler$1.exports = (function() {
  	    function XMLDOMErrorHandler() {}

  	    XMLDOMErrorHandler.prototype.handleError = function(error) {
  	      throw new Error(error);
  	    };

  	    return XMLDOMErrorHandler;

  	  })();

  	}).call(XMLDOMErrorHandler);
  	return XMLDOMErrorHandler$1.exports;
  }

  var XMLDOMStringList$1 = {exports: {}};

  var XMLDOMStringList = XMLDOMStringList$1.exports;

  var hasRequiredXMLDOMStringList;

  function requireXMLDOMStringList () {
  	if (hasRequiredXMLDOMStringList) return XMLDOMStringList$1.exports;
  	hasRequiredXMLDOMStringList = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {

  	  XMLDOMStringList$1.exports = (function() {
  	    function XMLDOMStringList(arr) {
  	      this.arr = arr || [];
  	    }

  	    Object.defineProperty(XMLDOMStringList.prototype, 'length', {
  	      get: function() {
  	        return this.arr.length;
  	      }
  	    });

  	    XMLDOMStringList.prototype.item = function(index) {
  	      return this.arr[index] || null;
  	    };

  	    XMLDOMStringList.prototype.contains = function(str) {
  	      return this.arr.indexOf(str) !== -1;
  	    };

  	    return XMLDOMStringList;

  	  })();

  	}).call(XMLDOMStringList);
  	return XMLDOMStringList$1.exports;
  }

  var XMLDOMConfiguration = XMLDOMConfiguration$1.exports;

  var hasRequiredXMLDOMConfiguration;

  function requireXMLDOMConfiguration () {
  	if (hasRequiredXMLDOMConfiguration) return XMLDOMConfiguration$1.exports;
  	hasRequiredXMLDOMConfiguration = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var XMLDOMErrorHandler, XMLDOMStringList;

  	  XMLDOMErrorHandler = requireXMLDOMErrorHandler();

  	  XMLDOMStringList = requireXMLDOMStringList();

  	  XMLDOMConfiguration$1.exports = (function() {
  	    function XMLDOMConfiguration() {
  	      this.defaultParams = {
  	        "canonical-form": false,
  	        "cdata-sections": false,
  	        "comments": false,
  	        "datatype-normalization": false,
  	        "element-content-whitespace": true,
  	        "entities": true,
  	        "error-handler": new XMLDOMErrorHandler(),
  	        "infoset": true,
  	        "validate-if-schema": false,
  	        "namespaces": true,
  	        "namespace-declarations": true,
  	        "normalize-characters": false,
  	        "schema-location": '',
  	        "schema-type": '',
  	        "split-cdata-sections": true,
  	        "validate": false,
  	        "well-formed": true
  	      };
  	      this.params = Object.create(this.defaultParams);
  	    }

  	    Object.defineProperty(XMLDOMConfiguration.prototype, 'parameterNames', {
  	      get: function() {
  	        return new XMLDOMStringList(Object.keys(this.defaultParams));
  	      }
  	    });

  	    XMLDOMConfiguration.prototype.getParameter = function(name) {
  	      if (this.params.hasOwnProperty(name)) {
  	        return this.params[name];
  	      } else {
  	        return null;
  	      }
  	    };

  	    XMLDOMConfiguration.prototype.canSetParameter = function(name, value) {
  	      return true;
  	    };

  	    XMLDOMConfiguration.prototype.setParameter = function(name, value) {
  	      if (value != null) {
  	        return this.params[name] = value;
  	      } else {
  	        return delete this.params[name];
  	      }
  	    };

  	    return XMLDOMConfiguration;

  	  })();

  	}).call(XMLDOMConfiguration);
  	return XMLDOMConfiguration$1.exports;
  }

  var XMLNode$1 = {exports: {}};

  var XMLElement$1 = {exports: {}};

  var NodeType$1 = {exports: {}};

  var NodeType = NodeType$1.exports;

  var hasRequiredNodeType;

  function requireNodeType () {
  	if (hasRequiredNodeType) return NodeType$1.exports;
  	hasRequiredNodeType = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  NodeType$1.exports = {
  	    Element: 1,
  	    Attribute: 2,
  	    Text: 3,
  	    CData: 4,
  	    EntityReference: 5,
  	    EntityDeclaration: 6,
  	    ProcessingInstruction: 7,
  	    Comment: 8,
  	    Document: 9,
  	    DocType: 10,
  	    DocumentFragment: 11,
  	    NotationDeclaration: 12,
  	    Declaration: 201,
  	    Raw: 202,
  	    AttributeDeclaration: 203,
  	    ElementDeclaration: 204,
  	    Dummy: 205
  	  };

  	}).call(NodeType);
  	return NodeType$1.exports;
  }

  var XMLAttribute$1 = {exports: {}};

  var XMLAttribute = XMLAttribute$1.exports;

  var hasRequiredXMLAttribute;

  function requireXMLAttribute () {
  	if (hasRequiredXMLAttribute) return XMLAttribute$1.exports;
  	hasRequiredXMLAttribute = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType;

  	  NodeType = requireNodeType();

  	  requireXMLNode();

  	  XMLAttribute$1.exports = (function() {
  	    function XMLAttribute(parent, name, value) {
  	      this.parent = parent;
  	      if (this.parent) {
  	        this.options = this.parent.options;
  	        this.stringify = this.parent.stringify;
  	      }
  	      if (name == null) {
  	        throw new Error("Missing attribute name. " + this.debugInfo(name));
  	      }
  	      this.name = this.stringify.name(name);
  	      this.value = this.stringify.attValue(value);
  	      this.type = NodeType.Attribute;
  	      this.isId = false;
  	      this.schemaTypeInfo = null;
  	    }

  	    Object.defineProperty(XMLAttribute.prototype, 'nodeType', {
  	      get: function() {
  	        return this.type;
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'ownerElement', {
  	      get: function() {
  	        return this.parent;
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'textContent', {
  	      get: function() {
  	        return this.value;
  	      },
  	      set: function(value) {
  	        return this.value = value || '';
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'namespaceURI', {
  	      get: function() {
  	        return '';
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'prefix', {
  	      get: function() {
  	        return '';
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'localName', {
  	      get: function() {
  	        return this.name;
  	      }
  	    });

  	    Object.defineProperty(XMLAttribute.prototype, 'specified', {
  	      get: function() {
  	        return true;
  	      }
  	    });

  	    XMLAttribute.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLAttribute.prototype.toString = function(options) {
  	      return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLAttribute.prototype.debugInfo = function(name) {
  	      name = name || this.name;
  	      if (name == null) {
  	        return "parent: <" + this.parent.name + ">";
  	      } else {
  	        return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
  	      }
  	    };

  	    XMLAttribute.prototype.isEqualNode = function(node) {
  	      if (node.namespaceURI !== this.namespaceURI) {
  	        return false;
  	      }
  	      if (node.prefix !== this.prefix) {
  	        return false;
  	      }
  	      if (node.localName !== this.localName) {
  	        return false;
  	      }
  	      if (node.value !== this.value) {
  	        return false;
  	      }
  	      return true;
  	    };

  	    return XMLAttribute;

  	  })();

  	}).call(XMLAttribute);
  	return XMLAttribute$1.exports;
  }

  var XMLNamedNodeMap$1 = {exports: {}};

  var XMLNamedNodeMap = XMLNamedNodeMap$1.exports;

  var hasRequiredXMLNamedNodeMap;

  function requireXMLNamedNodeMap () {
  	if (hasRequiredXMLNamedNodeMap) return XMLNamedNodeMap$1.exports;
  	hasRequiredXMLNamedNodeMap = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {

  	  XMLNamedNodeMap$1.exports = (function() {
  	    function XMLNamedNodeMap(nodes) {
  	      this.nodes = nodes;
  	    }

  	    Object.defineProperty(XMLNamedNodeMap.prototype, 'length', {
  	      get: function() {
  	        return Object.keys(this.nodes).length || 0;
  	      }
  	    });

  	    XMLNamedNodeMap.prototype.clone = function() {
  	      return this.nodes = null;
  	    };

  	    XMLNamedNodeMap.prototype.getNamedItem = function(name) {
  	      return this.nodes[name];
  	    };

  	    XMLNamedNodeMap.prototype.setNamedItem = function(node) {
  	      var oldNode;
  	      oldNode = this.nodes[node.nodeName];
  	      this.nodes[node.nodeName] = node;
  	      return oldNode || null;
  	    };

  	    XMLNamedNodeMap.prototype.removeNamedItem = function(name) {
  	      var oldNode;
  	      oldNode = this.nodes[name];
  	      delete this.nodes[name];
  	      return oldNode || null;
  	    };

  	    XMLNamedNodeMap.prototype.item = function(index) {
  	      return this.nodes[Object.keys(this.nodes)[index]] || null;
  	    };

  	    XMLNamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    XMLNamedNodeMap.prototype.setNamedItemNS = function(node) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    XMLNamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented.");
  	    };

  	    return XMLNamedNodeMap;

  	  })();

  	}).call(XMLNamedNodeMap);
  	return XMLNamedNodeMap$1.exports;
  }

  var XMLElement = XMLElement$1.exports;

  var hasRequiredXMLElement;

  function requireXMLElement () {
  	if (hasRequiredXMLElement) return XMLElement$1.exports;
  	hasRequiredXMLElement = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLAttribute, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, ref,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLAttribute = requireXMLAttribute();

  	  XMLNamedNodeMap = requireXMLNamedNodeMap();

  	  XMLElement$1.exports = (function(superClass) {
  	    extend(XMLElement, superClass);

  	    function XMLElement(parent, name, attributes) {
  	      var child, j, len, ref1;
  	      XMLElement.__super__.constructor.call(this, parent);
  	      if (name == null) {
  	        throw new Error("Missing element name. " + this.debugInfo());
  	      }
  	      this.name = this.stringify.name(name);
  	      this.type = NodeType.Element;
  	      this.attribs = {};
  	      this.schemaTypeInfo = null;
  	      if (attributes != null) {
  	        this.attribute(attributes);
  	      }
  	      if (parent.type === NodeType.Document) {
  	        this.isRoot = true;
  	        this.documentObject = parent;
  	        parent.rootObject = this;
  	        if (parent.children) {
  	          ref1 = parent.children;
  	          for (j = 0, len = ref1.length; j < len; j++) {
  	            child = ref1[j];
  	            if (child.type === NodeType.DocType) {
  	              child.name = this.name;
  	              break;
  	            }
  	          }
  	        }
  	      }
  	    }

  	    Object.defineProperty(XMLElement.prototype, 'tagName', {
  	      get: function() {
  	        return this.name;
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'namespaceURI', {
  	      get: function() {
  	        return '';
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'prefix', {
  	      get: function() {
  	        return '';
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'localName', {
  	      get: function() {
  	        return this.name;
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'id', {
  	      get: function() {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'className', {
  	      get: function() {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'classList', {
  	      get: function() {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    Object.defineProperty(XMLElement.prototype, 'attributes', {
  	      get: function() {
  	        if (!this.attributeMap || !this.attributeMap.nodes) {
  	          this.attributeMap = new XMLNamedNodeMap(this.attribs);
  	        }
  	        return this.attributeMap;
  	      }
  	    });

  	    XMLElement.prototype.clone = function() {
  	      var att, attName, clonedSelf, ref1;
  	      clonedSelf = Object.create(this);
  	      if (clonedSelf.isRoot) {
  	        clonedSelf.documentObject = null;
  	      }
  	      clonedSelf.attribs = {};
  	      ref1 = this.attribs;
  	      for (attName in ref1) {
  	        if (!hasProp.call(ref1, attName)) continue;
  	        att = ref1[attName];
  	        clonedSelf.attribs[attName] = att.clone();
  	      }
  	      clonedSelf.children = [];
  	      this.children.forEach(function(child) {
  	        var clonedChild;
  	        clonedChild = child.clone();
  	        clonedChild.parent = clonedSelf;
  	        return clonedSelf.children.push(clonedChild);
  	      });
  	      return clonedSelf;
  	    };

  	    XMLElement.prototype.attribute = function(name, value) {
  	      var attName, attValue;
  	      if (name != null) {
  	        name = getValue(name);
  	      }
  	      if (isObject(name)) {
  	        for (attName in name) {
  	          if (!hasProp.call(name, attName)) continue;
  	          attValue = name[attName];
  	          this.attribute(attName, attValue);
  	        }
  	      } else {
  	        if (isFunction(value)) {
  	          value = value.apply();
  	        }
  	        if (this.options.keepNullAttributes && (value == null)) {
  	          this.attribs[name] = new XMLAttribute(this, name, "");
  	        } else if (value != null) {
  	          this.attribs[name] = new XMLAttribute(this, name, value);
  	        }
  	      }
  	      return this;
  	    };

  	    XMLElement.prototype.removeAttribute = function(name) {
  	      var attName, j, len;
  	      if (name == null) {
  	        throw new Error("Missing attribute name. " + this.debugInfo());
  	      }
  	      name = getValue(name);
  	      if (Array.isArray(name)) {
  	        for (j = 0, len = name.length; j < len; j++) {
  	          attName = name[j];
  	          delete this.attribs[attName];
  	        }
  	      } else {
  	        delete this.attribs[name];
  	      }
  	      return this;
  	    };

  	    XMLElement.prototype.toString = function(options) {
  	      return this.options.writer.element(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLElement.prototype.att = function(name, value) {
  	      return this.attribute(name, value);
  	    };

  	    XMLElement.prototype.a = function(name, value) {
  	      return this.attribute(name, value);
  	    };

  	    XMLElement.prototype.getAttribute = function(name) {
  	      if (this.attribs.hasOwnProperty(name)) {
  	        return this.attribs[name].value;
  	      } else {
  	        return null;
  	      }
  	    };

  	    XMLElement.prototype.setAttribute = function(name, value) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getAttributeNode = function(name) {
  	      if (this.attribs.hasOwnProperty(name)) {
  	        return this.attribs[name];
  	      } else {
  	        return null;
  	      }
  	    };

  	    XMLElement.prototype.setAttributeNode = function(newAttr) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.removeAttributeNode = function(oldAttr) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getElementsByTagName = function(name) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getAttributeNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.removeAttributeNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.setAttributeNodeNS = function(newAttr) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.hasAttribute = function(name) {
  	      return this.attribs.hasOwnProperty(name);
  	    };

  	    XMLElement.prototype.hasAttributeNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.setIdAttribute = function(name, isId) {
  	      if (this.attribs.hasOwnProperty(name)) {
  	        return this.attribs[name].isId;
  	      } else {
  	        return isId;
  	      }
  	    };

  	    XMLElement.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.setIdAttributeNode = function(idAttr, isId) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getElementsByTagName = function(tagname) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.getElementsByClassName = function(classNames) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLElement.prototype.isEqualNode = function(node) {
  	      var i, j, ref1;
  	      if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
  	        return false;
  	      }
  	      if (node.namespaceURI !== this.namespaceURI) {
  	        return false;
  	      }
  	      if (node.prefix !== this.prefix) {
  	        return false;
  	      }
  	      if (node.localName !== this.localName) {
  	        return false;
  	      }
  	      if (node.attribs.length !== this.attribs.length) {
  	        return false;
  	      }
  	      for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
  	        if (!this.attribs[i].isEqualNode(node.attribs[i])) {
  	          return false;
  	        }
  	      }
  	      return true;
  	    };

  	    return XMLElement;

  	  })(XMLNode);

  	}).call(XMLElement);
  	return XMLElement$1.exports;
  }

  var XMLCData$1 = {exports: {}};

  var XMLCharacterData$1 = {exports: {}};

  var XMLCharacterData = XMLCharacterData$1.exports;

  var hasRequiredXMLCharacterData;

  function requireXMLCharacterData () {
  	if (hasRequiredXMLCharacterData) return XMLCharacterData$1.exports;
  	hasRequiredXMLCharacterData = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var XMLNode,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLNode = requireXMLNode();

  	  XMLCharacterData$1.exports = (function(superClass) {
  	    extend(XMLCharacterData, superClass);

  	    function XMLCharacterData(parent) {
  	      XMLCharacterData.__super__.constructor.call(this, parent);
  	      this.value = '';
  	    }

  	    Object.defineProperty(XMLCharacterData.prototype, 'data', {
  	      get: function() {
  	        return this.value;
  	      },
  	      set: function(value) {
  	        return this.value = value || '';
  	      }
  	    });

  	    Object.defineProperty(XMLCharacterData.prototype, 'length', {
  	      get: function() {
  	        return this.value.length;
  	      }
  	    });

  	    Object.defineProperty(XMLCharacterData.prototype, 'textContent', {
  	      get: function() {
  	        return this.value;
  	      },
  	      set: function(value) {
  	        return this.value = value || '';
  	      }
  	    });

  	    XMLCharacterData.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLCharacterData.prototype.substringData = function(offset, count) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLCharacterData.prototype.appendData = function(arg) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLCharacterData.prototype.insertData = function(offset, arg) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLCharacterData.prototype.deleteData = function(offset, count) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLCharacterData.prototype.replaceData = function(offset, count, arg) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLCharacterData.prototype.isEqualNode = function(node) {
  	      if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
  	        return false;
  	      }
  	      if (node.data !== this.data) {
  	        return false;
  	      }
  	      return true;
  	    };

  	    return XMLCharacterData;

  	  })(XMLNode);

  	}).call(XMLCharacterData);
  	return XMLCharacterData$1.exports;
  }

  var XMLCData = XMLCData$1.exports;

  var hasRequiredXMLCData;

  function requireXMLCData () {
  	if (hasRequiredXMLCData) return XMLCData$1.exports;
  	hasRequiredXMLCData = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLCharacterData,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLCharacterData = requireXMLCharacterData();

  	  XMLCData$1.exports = (function(superClass) {
  	    extend(XMLCData, superClass);

  	    function XMLCData(parent, text) {
  	      XMLCData.__super__.constructor.call(this, parent);
  	      if (text == null) {
  	        throw new Error("Missing CDATA text. " + this.debugInfo());
  	      }
  	      this.name = "#cdata-section";
  	      this.type = NodeType.CData;
  	      this.value = this.stringify.cdata(text);
  	    }

  	    XMLCData.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLCData.prototype.toString = function(options) {
  	      return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLCData;

  	  })(XMLCharacterData);

  	}).call(XMLCData);
  	return XMLCData$1.exports;
  }

  var XMLComment$1 = {exports: {}};

  var XMLComment = XMLComment$1.exports;

  var hasRequiredXMLComment;

  function requireXMLComment () {
  	if (hasRequiredXMLComment) return XMLComment$1.exports;
  	hasRequiredXMLComment = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLCharacterData, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLCharacterData = requireXMLCharacterData();

  	  XMLComment$1.exports = (function(superClass) {
  	    extend(XMLComment, superClass);

  	    function XMLComment(parent, text) {
  	      XMLComment.__super__.constructor.call(this, parent);
  	      if (text == null) {
  	        throw new Error("Missing comment text. " + this.debugInfo());
  	      }
  	      this.name = "#comment";
  	      this.type = NodeType.Comment;
  	      this.value = this.stringify.comment(text);
  	    }

  	    XMLComment.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLComment.prototype.toString = function(options) {
  	      return this.options.writer.comment(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLComment;

  	  })(XMLCharacterData);

  	}).call(XMLComment);
  	return XMLComment$1.exports;
  }

  var XMLDeclaration$1 = {exports: {}};

  var XMLDeclaration = XMLDeclaration$1.exports;

  var hasRequiredXMLDeclaration;

  function requireXMLDeclaration () {
  	if (hasRequiredXMLDeclaration) return XMLDeclaration$1.exports;
  	hasRequiredXMLDeclaration = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode, isObject,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  isObject = requireUtility().isObject;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDeclaration$1.exports = (function(superClass) {
  	    extend(XMLDeclaration, superClass);

  	    function XMLDeclaration(parent, version, encoding, standalone) {
  	      var ref;
  	      XMLDeclaration.__super__.constructor.call(this, parent);
  	      if (isObject(version)) {
  	        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
  	      }
  	      if (!version) {
  	        version = '1.0';
  	      }
  	      this.type = NodeType.Declaration;
  	      this.version = this.stringify.xmlVersion(version);
  	      if (encoding != null) {
  	        this.encoding = this.stringify.xmlEncoding(encoding);
  	      }
  	      if (standalone != null) {
  	        this.standalone = this.stringify.xmlStandalone(standalone);
  	      }
  	    }

  	    XMLDeclaration.prototype.toString = function(options) {
  	      return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLDeclaration;

  	  })(XMLNode);

  	}).call(XMLDeclaration);
  	return XMLDeclaration$1.exports;
  }

  var XMLDocType$1 = {exports: {}};

  var XMLDTDAttList$1 = {exports: {}};

  var XMLDTDAttList = XMLDTDAttList$1.exports;

  var hasRequiredXMLDTDAttList;

  function requireXMLDTDAttList () {
  	if (hasRequiredXMLDTDAttList) return XMLDTDAttList$1.exports;
  	hasRequiredXMLDTDAttList = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDTDAttList$1.exports = (function(superClass) {
  	    extend(XMLDTDAttList, superClass);

  	    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
  	      XMLDTDAttList.__super__.constructor.call(this, parent);
  	      if (elementName == null) {
  	        throw new Error("Missing DTD element name. " + this.debugInfo());
  	      }
  	      if (attributeName == null) {
  	        throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
  	      }
  	      if (!attributeType) {
  	        throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
  	      }
  	      if (!defaultValueType) {
  	        throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
  	      }
  	      if (defaultValueType.indexOf('#') !== 0) {
  	        defaultValueType = '#' + defaultValueType;
  	      }
  	      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
  	        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
  	      }
  	      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
  	        throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
  	      }
  	      this.elementName = this.stringify.name(elementName);
  	      this.type = NodeType.AttributeDeclaration;
  	      this.attributeName = this.stringify.name(attributeName);
  	      this.attributeType = this.stringify.dtdAttType(attributeType);
  	      if (defaultValue) {
  	        this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
  	      }
  	      this.defaultValueType = defaultValueType;
  	    }

  	    XMLDTDAttList.prototype.toString = function(options) {
  	      return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLDTDAttList;

  	  })(XMLNode);

  	}).call(XMLDTDAttList);
  	return XMLDTDAttList$1.exports;
  }

  var XMLDTDEntity$1 = {exports: {}};

  var XMLDTDEntity = XMLDTDEntity$1.exports;

  var hasRequiredXMLDTDEntity;

  function requireXMLDTDEntity () {
  	if (hasRequiredXMLDTDEntity) return XMLDTDEntity$1.exports;
  	hasRequiredXMLDTDEntity = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode, isObject,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  isObject = requireUtility().isObject;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDTDEntity$1.exports = (function(superClass) {
  	    extend(XMLDTDEntity, superClass);

  	    function XMLDTDEntity(parent, pe, name, value) {
  	      XMLDTDEntity.__super__.constructor.call(this, parent);
  	      if (name == null) {
  	        throw new Error("Missing DTD entity name. " + this.debugInfo(name));
  	      }
  	      if (value == null) {
  	        throw new Error("Missing DTD entity value. " + this.debugInfo(name));
  	      }
  	      this.pe = !!pe;
  	      this.name = this.stringify.name(name);
  	      this.type = NodeType.EntityDeclaration;
  	      if (!isObject(value)) {
  	        this.value = this.stringify.dtdEntityValue(value);
  	        this.internal = true;
  	      } else {
  	        if (!value.pubID && !value.sysID) {
  	          throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
  	        }
  	        if (value.pubID && !value.sysID) {
  	          throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
  	        }
  	        this.internal = false;
  	        if (value.pubID != null) {
  	          this.pubID = this.stringify.dtdPubID(value.pubID);
  	        }
  	        if (value.sysID != null) {
  	          this.sysID = this.stringify.dtdSysID(value.sysID);
  	        }
  	        if (value.nData != null) {
  	          this.nData = this.stringify.dtdNData(value.nData);
  	        }
  	        if (this.pe && this.nData) {
  	          throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
  	        }
  	      }
  	    }

  	    Object.defineProperty(XMLDTDEntity.prototype, 'publicId', {
  	      get: function() {
  	        return this.pubID;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDEntity.prototype, 'systemId', {
  	      get: function() {
  	        return this.sysID;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDEntity.prototype, 'notationName', {
  	      get: function() {
  	        return this.nData || null;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDEntity.prototype, 'inputEncoding', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDEntity.prototype, 'xmlEncoding', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDEntity.prototype, 'xmlVersion', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    XMLDTDEntity.prototype.toString = function(options) {
  	      return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLDTDEntity;

  	  })(XMLNode);

  	}).call(XMLDTDEntity);
  	return XMLDTDEntity$1.exports;
  }

  var XMLDTDElement$1 = {exports: {}};

  var XMLDTDElement = XMLDTDElement$1.exports;

  var hasRequiredXMLDTDElement;

  function requireXMLDTDElement () {
  	if (hasRequiredXMLDTDElement) return XMLDTDElement$1.exports;
  	hasRequiredXMLDTDElement = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDTDElement$1.exports = (function(superClass) {
  	    extend(XMLDTDElement, superClass);

  	    function XMLDTDElement(parent, name, value) {
  	      XMLDTDElement.__super__.constructor.call(this, parent);
  	      if (name == null) {
  	        throw new Error("Missing DTD element name. " + this.debugInfo());
  	      }
  	      if (!value) {
  	        value = '(#PCDATA)';
  	      }
  	      if (Array.isArray(value)) {
  	        value = '(' + value.join(',') + ')';
  	      }
  	      this.name = this.stringify.name(name);
  	      this.type = NodeType.ElementDeclaration;
  	      this.value = this.stringify.dtdElementValue(value);
  	    }

  	    XMLDTDElement.prototype.toString = function(options) {
  	      return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLDTDElement;

  	  })(XMLNode);

  	}).call(XMLDTDElement);
  	return XMLDTDElement$1.exports;
  }

  var XMLDTDNotation$1 = {exports: {}};

  var XMLDTDNotation = XMLDTDNotation$1.exports;

  var hasRequiredXMLDTDNotation;

  function requireXMLDTDNotation () {
  	if (hasRequiredXMLDTDNotation) return XMLDTDNotation$1.exports;
  	hasRequiredXMLDTDNotation = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDTDNotation$1.exports = (function(superClass) {
  	    extend(XMLDTDNotation, superClass);

  	    function XMLDTDNotation(parent, name, value) {
  	      XMLDTDNotation.__super__.constructor.call(this, parent);
  	      if (name == null) {
  	        throw new Error("Missing DTD notation name. " + this.debugInfo(name));
  	      }
  	      if (!value.pubID && !value.sysID) {
  	        throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
  	      }
  	      this.name = this.stringify.name(name);
  	      this.type = NodeType.NotationDeclaration;
  	      if (value.pubID != null) {
  	        this.pubID = this.stringify.dtdPubID(value.pubID);
  	      }
  	      if (value.sysID != null) {
  	        this.sysID = this.stringify.dtdSysID(value.sysID);
  	      }
  	    }

  	    Object.defineProperty(XMLDTDNotation.prototype, 'publicId', {
  	      get: function() {
  	        return this.pubID;
  	      }
  	    });

  	    Object.defineProperty(XMLDTDNotation.prototype, 'systemId', {
  	      get: function() {
  	        return this.sysID;
  	      }
  	    });

  	    XMLDTDNotation.prototype.toString = function(options) {
  	      return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLDTDNotation;

  	  })(XMLNode);

  	}).call(XMLDTDNotation);
  	return XMLDTDNotation$1.exports;
  }

  var XMLDocType = XMLDocType$1.exports;

  var hasRequiredXMLDocType;

  function requireXMLDocType () {
  	if (hasRequiredXMLDocType) return XMLDocType$1.exports;
  	hasRequiredXMLDocType = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLNamedNodeMap, XMLNode, isObject,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  isObject = requireUtility().isObject;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDTDAttList = requireXMLDTDAttList();

  	  XMLDTDEntity = requireXMLDTDEntity();

  	  XMLDTDElement = requireXMLDTDElement();

  	  XMLDTDNotation = requireXMLDTDNotation();

  	  XMLNamedNodeMap = requireXMLNamedNodeMap();

  	  XMLDocType$1.exports = (function(superClass) {
  	    extend(XMLDocType, superClass);

  	    function XMLDocType(parent, pubID, sysID) {
  	      var child, i, len, ref, ref1, ref2;
  	      XMLDocType.__super__.constructor.call(this, parent);
  	      this.type = NodeType.DocType;
  	      if (parent.children) {
  	        ref = parent.children;
  	        for (i = 0, len = ref.length; i < len; i++) {
  	          child = ref[i];
  	          if (child.type === NodeType.Element) {
  	            this.name = child.name;
  	            break;
  	          }
  	        }
  	      }
  	      this.documentObject = parent;
  	      if (isObject(pubID)) {
  	        ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
  	      }
  	      if (sysID == null) {
  	        ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
  	      }
  	      if (pubID != null) {
  	        this.pubID = this.stringify.dtdPubID(pubID);
  	      }
  	      if (sysID != null) {
  	        this.sysID = this.stringify.dtdSysID(sysID);
  	      }
  	    }

  	    Object.defineProperty(XMLDocType.prototype, 'entities', {
  	      get: function() {
  	        var child, i, len, nodes, ref;
  	        nodes = {};
  	        ref = this.children;
  	        for (i = 0, len = ref.length; i < len; i++) {
  	          child = ref[i];
  	          if ((child.type === NodeType.EntityDeclaration) && !child.pe) {
  	            nodes[child.name] = child;
  	          }
  	        }
  	        return new XMLNamedNodeMap(nodes);
  	      }
  	    });

  	    Object.defineProperty(XMLDocType.prototype, 'notations', {
  	      get: function() {
  	        var child, i, len, nodes, ref;
  	        nodes = {};
  	        ref = this.children;
  	        for (i = 0, len = ref.length; i < len; i++) {
  	          child = ref[i];
  	          if (child.type === NodeType.NotationDeclaration) {
  	            nodes[child.name] = child;
  	          }
  	        }
  	        return new XMLNamedNodeMap(nodes);
  	      }
  	    });

  	    Object.defineProperty(XMLDocType.prototype, 'publicId', {
  	      get: function() {
  	        return this.pubID;
  	      }
  	    });

  	    Object.defineProperty(XMLDocType.prototype, 'systemId', {
  	      get: function() {
  	        return this.sysID;
  	      }
  	    });

  	    Object.defineProperty(XMLDocType.prototype, 'internalSubset', {
  	      get: function() {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    XMLDocType.prototype.element = function(name, value) {
  	      var child;
  	      child = new XMLDTDElement(this, name, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
  	      var child;
  	      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLDocType.prototype.entity = function(name, value) {
  	      var child;
  	      child = new XMLDTDEntity(this, false, name, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLDocType.prototype.pEntity = function(name, value) {
  	      var child;
  	      child = new XMLDTDEntity(this, true, name, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLDocType.prototype.notation = function(name, value) {
  	      var child;
  	      child = new XMLDTDNotation(this, name, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLDocType.prototype.toString = function(options) {
  	      return this.options.writer.docType(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLDocType.prototype.ele = function(name, value) {
  	      return this.element(name, value);
  	    };

  	    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
  	      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
  	    };

  	    XMLDocType.prototype.ent = function(name, value) {
  	      return this.entity(name, value);
  	    };

  	    XMLDocType.prototype.pent = function(name, value) {
  	      return this.pEntity(name, value);
  	    };

  	    XMLDocType.prototype.not = function(name, value) {
  	      return this.notation(name, value);
  	    };

  	    XMLDocType.prototype.up = function() {
  	      return this.root() || this.documentObject;
  	    };

  	    XMLDocType.prototype.isEqualNode = function(node) {
  	      if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
  	        return false;
  	      }
  	      if (node.name !== this.name) {
  	        return false;
  	      }
  	      if (node.publicId !== this.publicId) {
  	        return false;
  	      }
  	      if (node.systemId !== this.systemId) {
  	        return false;
  	      }
  	      return true;
  	    };

  	    return XMLDocType;

  	  })(XMLNode);

  	}).call(XMLDocType);
  	return XMLDocType$1.exports;
  }

  var XMLRaw$1 = {exports: {}};

  var XMLRaw = XMLRaw$1.exports;

  var hasRequiredXMLRaw;

  function requireXMLRaw () {
  	if (hasRequiredXMLRaw) return XMLRaw$1.exports;
  	hasRequiredXMLRaw = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLNode = requireXMLNode();

  	  XMLRaw$1.exports = (function(superClass) {
  	    extend(XMLRaw, superClass);

  	    function XMLRaw(parent, text) {
  	      XMLRaw.__super__.constructor.call(this, parent);
  	      if (text == null) {
  	        throw new Error("Missing raw text. " + this.debugInfo());
  	      }
  	      this.type = NodeType.Raw;
  	      this.value = this.stringify.raw(text);
  	    }

  	    XMLRaw.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLRaw.prototype.toString = function(options) {
  	      return this.options.writer.raw(this, this.options.writer.filterOptions(options));
  	    };

  	    return XMLRaw;

  	  })(XMLNode);

  	}).call(XMLRaw);
  	return XMLRaw$1.exports;
  }

  var XMLText$1 = {exports: {}};

  var XMLText = XMLText$1.exports;

  var hasRequiredXMLText;

  function requireXMLText () {
  	if (hasRequiredXMLText) return XMLText$1.exports;
  	hasRequiredXMLText = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLCharacterData, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLCharacterData = requireXMLCharacterData();

  	  XMLText$1.exports = (function(superClass) {
  	    extend(XMLText, superClass);

  	    function XMLText(parent, text) {
  	      XMLText.__super__.constructor.call(this, parent);
  	      if (text == null) {
  	        throw new Error("Missing element text. " + this.debugInfo());
  	      }
  	      this.name = "#text";
  	      this.type = NodeType.Text;
  	      this.value = this.stringify.text(text);
  	    }

  	    Object.defineProperty(XMLText.prototype, 'isElementContentWhitespace', {
  	      get: function() {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    Object.defineProperty(XMLText.prototype, 'wholeText', {
  	      get: function() {
  	        var next, prev, str;
  	        str = '';
  	        prev = this.previousSibling;
  	        while (prev) {
  	          str = prev.data + str;
  	          prev = prev.previousSibling;
  	        }
  	        str += this.data;
  	        next = this.nextSibling;
  	        while (next) {
  	          str = str + next.data;
  	          next = next.nextSibling;
  	        }
  	        return str;
  	      }
  	    });

  	    XMLText.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLText.prototype.toString = function(options) {
  	      return this.options.writer.text(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLText.prototype.splitText = function(offset) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLText.prototype.replaceWholeText = function(content) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    return XMLText;

  	  })(XMLCharacterData);

  	}).call(XMLText);
  	return XMLText$1.exports;
  }

  var XMLProcessingInstruction$1 = {exports: {}};

  var XMLProcessingInstruction = XMLProcessingInstruction$1.exports;

  var hasRequiredXMLProcessingInstruction;

  function requireXMLProcessingInstruction () {
  	if (hasRequiredXMLProcessingInstruction) return XMLProcessingInstruction$1.exports;
  	hasRequiredXMLProcessingInstruction = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLCharacterData, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLCharacterData = requireXMLCharacterData();

  	  XMLProcessingInstruction$1.exports = (function(superClass) {
  	    extend(XMLProcessingInstruction, superClass);

  	    function XMLProcessingInstruction(parent, target, value) {
  	      XMLProcessingInstruction.__super__.constructor.call(this, parent);
  	      if (target == null) {
  	        throw new Error("Missing instruction target. " + this.debugInfo());
  	      }
  	      this.type = NodeType.ProcessingInstruction;
  	      this.target = this.stringify.insTarget(target);
  	      this.name = this.target;
  	      if (value) {
  	        this.value = this.stringify.insValue(value);
  	      }
  	    }

  	    XMLProcessingInstruction.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLProcessingInstruction.prototype.toString = function(options) {
  	      return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLProcessingInstruction.prototype.isEqualNode = function(node) {
  	      if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
  	        return false;
  	      }
  	      if (node.target !== this.target) {
  	        return false;
  	      }
  	      return true;
  	    };

  	    return XMLProcessingInstruction;

  	  })(XMLCharacterData);

  	}).call(XMLProcessingInstruction);
  	return XMLProcessingInstruction$1.exports;
  }

  var XMLDummy$1 = {exports: {}};

  var XMLDummy = XMLDummy$1.exports;

  var hasRequiredXMLDummy;

  function requireXMLDummy () {
  	if (hasRequiredXMLDummy) return XMLDummy$1.exports;
  	hasRequiredXMLDummy = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLNode,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLDummy$1.exports = (function(superClass) {
  	    extend(XMLDummy, superClass);

  	    function XMLDummy(parent) {
  	      XMLDummy.__super__.constructor.call(this, parent);
  	      this.type = NodeType.Dummy;
  	    }

  	    XMLDummy.prototype.clone = function() {
  	      return Object.create(this);
  	    };

  	    XMLDummy.prototype.toString = function(options) {
  	      return '';
  	    };

  	    return XMLDummy;

  	  })(XMLNode);

  	}).call(XMLDummy);
  	return XMLDummy$1.exports;
  }

  var XMLNodeList$1 = {exports: {}};

  var XMLNodeList = XMLNodeList$1.exports;

  var hasRequiredXMLNodeList;

  function requireXMLNodeList () {
  	if (hasRequiredXMLNodeList) return XMLNodeList$1.exports;
  	hasRequiredXMLNodeList = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {

  	  XMLNodeList$1.exports = (function() {
  	    function XMLNodeList(nodes) {
  	      this.nodes = nodes;
  	    }

  	    Object.defineProperty(XMLNodeList.prototype, 'length', {
  	      get: function() {
  	        return this.nodes.length || 0;
  	      }
  	    });

  	    XMLNodeList.prototype.clone = function() {
  	      return this.nodes = null;
  	    };

  	    XMLNodeList.prototype.item = function(index) {
  	      return this.nodes[index] || null;
  	    };

  	    return XMLNodeList;

  	  })();

  	}).call(XMLNodeList);
  	return XMLNodeList$1.exports;
  }

  var DocumentPosition$1 = {exports: {}};

  var DocumentPosition = DocumentPosition$1.exports;

  var hasRequiredDocumentPosition;

  function requireDocumentPosition () {
  	if (hasRequiredDocumentPosition) return DocumentPosition$1.exports;
  	hasRequiredDocumentPosition = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  DocumentPosition$1.exports = {
  	    Disconnected: 1,
  	    Preceding: 2,
  	    Following: 4,
  	    Contains: 8,
  	    ContainedBy: 16,
  	    ImplementationSpecific: 32
  	  };

  	}).call(DocumentPosition);
  	return DocumentPosition$1.exports;
  }

  var XMLNode = XMLNode$1.exports;

  var hasRequiredXMLNode;

  function requireXMLNode () {
  	if (hasRequiredXMLNode) return XMLNode$1.exports;
  	hasRequiredXMLNode = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref1,
  	    hasProp = {}.hasOwnProperty;

  	  ref1 = requireUtility(), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;

  	  XMLElement = null;

  	  XMLCData = null;

  	  XMLComment = null;

  	  XMLDeclaration = null;

  	  XMLDocType = null;

  	  XMLRaw = null;

  	  XMLText = null;

  	  XMLProcessingInstruction = null;

  	  XMLDummy = null;

  	  NodeType = null;

  	  XMLNodeList = null;

  	  DocumentPosition = null;

  	  XMLNode$1.exports = (function() {
  	    function XMLNode(parent1) {
  	      this.parent = parent1;
  	      if (this.parent) {
  	        this.options = this.parent.options;
  	        this.stringify = this.parent.stringify;
  	      }
  	      this.value = null;
  	      this.children = [];
  	      this.baseURI = null;
  	      if (!XMLElement) {
  	        XMLElement = requireXMLElement();
  	        XMLCData = requireXMLCData();
  	        XMLComment = requireXMLComment();
  	        XMLDeclaration = requireXMLDeclaration();
  	        XMLDocType = requireXMLDocType();
  	        XMLRaw = requireXMLRaw();
  	        XMLText = requireXMLText();
  	        XMLProcessingInstruction = requireXMLProcessingInstruction();
  	        XMLDummy = requireXMLDummy();
  	        NodeType = requireNodeType();
  	        XMLNodeList = requireXMLNodeList();
  	        requireXMLNamedNodeMap();
  	        DocumentPosition = requireDocumentPosition();
  	      }
  	    }

  	    Object.defineProperty(XMLNode.prototype, 'nodeName', {
  	      get: function() {
  	        return this.name;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'nodeType', {
  	      get: function() {
  	        return this.type;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'nodeValue', {
  	      get: function() {
  	        return this.value;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'parentNode', {
  	      get: function() {
  	        return this.parent;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'childNodes', {
  	      get: function() {
  	        if (!this.childNodeList || !this.childNodeList.nodes) {
  	          this.childNodeList = new XMLNodeList(this.children);
  	        }
  	        return this.childNodeList;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'firstChild', {
  	      get: function() {
  	        return this.children[0] || null;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'lastChild', {
  	      get: function() {
  	        return this.children[this.children.length - 1] || null;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'previousSibling', {
  	      get: function() {
  	        var i;
  	        i = this.parent.children.indexOf(this);
  	        return this.parent.children[i - 1] || null;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'nextSibling', {
  	      get: function() {
  	        var i;
  	        i = this.parent.children.indexOf(this);
  	        return this.parent.children[i + 1] || null;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'ownerDocument', {
  	      get: function() {
  	        return this.document() || null;
  	      }
  	    });

  	    Object.defineProperty(XMLNode.prototype, 'textContent', {
  	      get: function() {
  	        var child, j, len, ref2, str;
  	        if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
  	          str = '';
  	          ref2 = this.children;
  	          for (j = 0, len = ref2.length; j < len; j++) {
  	            child = ref2[j];
  	            if (child.textContent) {
  	              str += child.textContent;
  	            }
  	          }
  	          return str;
  	        } else {
  	          return null;
  	        }
  	      },
  	      set: function(value) {
  	        throw new Error("This DOM method is not implemented." + this.debugInfo());
  	      }
  	    });

  	    XMLNode.prototype.setParent = function(parent) {
  	      var child, j, len, ref2, results;
  	      this.parent = parent;
  	      if (parent) {
  	        this.options = parent.options;
  	        this.stringify = parent.stringify;
  	      }
  	      ref2 = this.children;
  	      results = [];
  	      for (j = 0, len = ref2.length; j < len; j++) {
  	        child = ref2[j];
  	        results.push(child.setParent(this));
  	      }
  	      return results;
  	    };

  	    XMLNode.prototype.element = function(name, attributes, text) {
  	      var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
  	      lastChild = null;
  	      if (attributes === null && (text == null)) {
  	        ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
  	      }
  	      if (attributes == null) {
  	        attributes = {};
  	      }
  	      attributes = getValue(attributes);
  	      if (!isObject(attributes)) {
  	        ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
  	      }
  	      if (name != null) {
  	        name = getValue(name);
  	      }
  	      if (Array.isArray(name)) {
  	        for (j = 0, len = name.length; j < len; j++) {
  	          item = name[j];
  	          lastChild = this.element(item);
  	        }
  	      } else if (isFunction(name)) {
  	        lastChild = this.element(name.apply());
  	      } else if (isObject(name)) {
  	        for (key in name) {
  	          if (!hasProp.call(name, key)) continue;
  	          val = name[key];
  	          if (isFunction(val)) {
  	            val = val.apply();
  	          }
  	          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
  	            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
  	          } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
  	            lastChild = this.dummy();
  	          } else if (isObject(val) && isEmpty(val)) {
  	            lastChild = this.element(key);
  	          } else if (!this.options.keepNullNodes && (val == null)) {
  	            lastChild = this.dummy();
  	          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
  	            for (k = 0, len1 = val.length; k < len1; k++) {
  	              item = val[k];
  	              childNode = {};
  	              childNode[key] = item;
  	              lastChild = this.element(childNode);
  	            }
  	          } else if (isObject(val)) {
  	            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
  	              lastChild = this.element(val);
  	            } else {
  	              lastChild = this.element(key);
  	              lastChild.element(val);
  	            }
  	          } else {
  	            lastChild = this.element(key, val);
  	          }
  	        }
  	      } else if (!this.options.keepNullNodes && text === null) {
  	        lastChild = this.dummy();
  	      } else {
  	        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
  	          lastChild = this.text(text);
  	        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
  	          lastChild = this.cdata(text);
  	        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
  	          lastChild = this.comment(text);
  	        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
  	          lastChild = this.raw(text);
  	        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
  	          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
  	        } else {
  	          lastChild = this.node(name, attributes, text);
  	        }
  	      }
  	      if (lastChild == null) {
  	        throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
  	      }
  	      return lastChild;
  	    };

  	    XMLNode.prototype.insertBefore = function(name, attributes, text) {
  	      var child, i, newChild, refChild, removed;
  	      if (name != null ? name.type : void 0) {
  	        newChild = name;
  	        refChild = attributes;
  	        newChild.setParent(this);
  	        if (refChild) {
  	          i = children.indexOf(refChild);
  	          removed = children.splice(i);
  	          children.push(newChild);
  	          Array.prototype.push.apply(children, removed);
  	        } else {
  	          children.push(newChild);
  	        }
  	        return newChild;
  	      } else {
  	        if (this.isRoot) {
  	          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
  	        }
  	        i = this.parent.children.indexOf(this);
  	        removed = this.parent.children.splice(i);
  	        child = this.parent.element(name, attributes, text);
  	        Array.prototype.push.apply(this.parent.children, removed);
  	        return child;
  	      }
  	    };

  	    XMLNode.prototype.insertAfter = function(name, attributes, text) {
  	      var child, i, removed;
  	      if (this.isRoot) {
  	        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
  	      }
  	      i = this.parent.children.indexOf(this);
  	      removed = this.parent.children.splice(i + 1);
  	      child = this.parent.element(name, attributes, text);
  	      Array.prototype.push.apply(this.parent.children, removed);
  	      return child;
  	    };

  	    XMLNode.prototype.remove = function() {
  	      var i;
  	      if (this.isRoot) {
  	        throw new Error("Cannot remove the root element. " + this.debugInfo());
  	      }
  	      i = this.parent.children.indexOf(this);
  	      [].splice.apply(this.parent.children, [i, i - i + 1].concat([]));
  	      return this.parent;
  	    };

  	    XMLNode.prototype.node = function(name, attributes, text) {
  	      var child, ref2;
  	      if (name != null) {
  	        name = getValue(name);
  	      }
  	      attributes || (attributes = {});
  	      attributes = getValue(attributes);
  	      if (!isObject(attributes)) {
  	        ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
  	      }
  	      child = new XMLElement(this, name, attributes);
  	      if (text != null) {
  	        child.text(text);
  	      }
  	      this.children.push(child);
  	      return child;
  	    };

  	    XMLNode.prototype.text = function(value) {
  	      var child;
  	      if (isObject(value)) {
  	        this.element(value);
  	      }
  	      child = new XMLText(this, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLNode.prototype.cdata = function(value) {
  	      var child;
  	      child = new XMLCData(this, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLNode.prototype.comment = function(value) {
  	      var child;
  	      child = new XMLComment(this, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLNode.prototype.commentBefore = function(value) {
  	      var i, removed;
  	      i = this.parent.children.indexOf(this);
  	      removed = this.parent.children.splice(i);
  	      this.parent.comment(value);
  	      Array.prototype.push.apply(this.parent.children, removed);
  	      return this;
  	    };

  	    XMLNode.prototype.commentAfter = function(value) {
  	      var i, removed;
  	      i = this.parent.children.indexOf(this);
  	      removed = this.parent.children.splice(i + 1);
  	      this.parent.comment(value);
  	      Array.prototype.push.apply(this.parent.children, removed);
  	      return this;
  	    };

  	    XMLNode.prototype.raw = function(value) {
  	      var child;
  	      child = new XMLRaw(this, value);
  	      this.children.push(child);
  	      return this;
  	    };

  	    XMLNode.prototype.dummy = function() {
  	      var child;
  	      child = new XMLDummy(this);
  	      return child;
  	    };

  	    XMLNode.prototype.instruction = function(target, value) {
  	      var insTarget, insValue, instruction, j, len;
  	      if (target != null) {
  	        target = getValue(target);
  	      }
  	      if (value != null) {
  	        value = getValue(value);
  	      }
  	      if (Array.isArray(target)) {
  	        for (j = 0, len = target.length; j < len; j++) {
  	          insTarget = target[j];
  	          this.instruction(insTarget);
  	        }
  	      } else if (isObject(target)) {
  	        for (insTarget in target) {
  	          if (!hasProp.call(target, insTarget)) continue;
  	          insValue = target[insTarget];
  	          this.instruction(insTarget, insValue);
  	        }
  	      } else {
  	        if (isFunction(value)) {
  	          value = value.apply();
  	        }
  	        instruction = new XMLProcessingInstruction(this, target, value);
  	        this.children.push(instruction);
  	      }
  	      return this;
  	    };

  	    XMLNode.prototype.instructionBefore = function(target, value) {
  	      var i, removed;
  	      i = this.parent.children.indexOf(this);
  	      removed = this.parent.children.splice(i);
  	      this.parent.instruction(target, value);
  	      Array.prototype.push.apply(this.parent.children, removed);
  	      return this;
  	    };

  	    XMLNode.prototype.instructionAfter = function(target, value) {
  	      var i, removed;
  	      i = this.parent.children.indexOf(this);
  	      removed = this.parent.children.splice(i + 1);
  	      this.parent.instruction(target, value);
  	      Array.prototype.push.apply(this.parent.children, removed);
  	      return this;
  	    };

  	    XMLNode.prototype.declaration = function(version, encoding, standalone) {
  	      var doc, xmldec;
  	      doc = this.document();
  	      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
  	      if (doc.children.length === 0) {
  	        doc.children.unshift(xmldec);
  	      } else if (doc.children[0].type === NodeType.Declaration) {
  	        doc.children[0] = xmldec;
  	      } else {
  	        doc.children.unshift(xmldec);
  	      }
  	      return doc.root() || doc;
  	    };

  	    XMLNode.prototype.dtd = function(pubID, sysID) {
  	      var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
  	      doc = this.document();
  	      doctype = new XMLDocType(doc, pubID, sysID);
  	      ref2 = doc.children;
  	      for (i = j = 0, len = ref2.length; j < len; i = ++j) {
  	        child = ref2[i];
  	        if (child.type === NodeType.DocType) {
  	          doc.children[i] = doctype;
  	          return doctype;
  	        }
  	      }
  	      ref3 = doc.children;
  	      for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
  	        child = ref3[i];
  	        if (child.isRoot) {
  	          doc.children.splice(i, 0, doctype);
  	          return doctype;
  	        }
  	      }
  	      doc.children.push(doctype);
  	      return doctype;
  	    };

  	    XMLNode.prototype.up = function() {
  	      if (this.isRoot) {
  	        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
  	      }
  	      return this.parent;
  	    };

  	    XMLNode.prototype.root = function() {
  	      var node;
  	      node = this;
  	      while (node) {
  	        if (node.type === NodeType.Document) {
  	          return node.rootObject;
  	        } else if (node.isRoot) {
  	          return node;
  	        } else {
  	          node = node.parent;
  	        }
  	      }
  	    };

  	    XMLNode.prototype.document = function() {
  	      var node;
  	      node = this;
  	      while (node) {
  	        if (node.type === NodeType.Document) {
  	          return node;
  	        } else {
  	          node = node.parent;
  	        }
  	      }
  	    };

  	    XMLNode.prototype.end = function(options) {
  	      return this.document().end(options);
  	    };

  	    XMLNode.prototype.prev = function() {
  	      var i;
  	      i = this.parent.children.indexOf(this);
  	      if (i < 1) {
  	        throw new Error("Already at the first node. " + this.debugInfo());
  	      }
  	      return this.parent.children[i - 1];
  	    };

  	    XMLNode.prototype.next = function() {
  	      var i;
  	      i = this.parent.children.indexOf(this);
  	      if (i === -1 || i === this.parent.children.length - 1) {
  	        throw new Error("Already at the last node. " + this.debugInfo());
  	      }
  	      return this.parent.children[i + 1];
  	    };

  	    XMLNode.prototype.importDocument = function(doc) {
  	      var clonedRoot;
  	      clonedRoot = doc.root().clone();
  	      clonedRoot.parent = this;
  	      clonedRoot.isRoot = false;
  	      this.children.push(clonedRoot);
  	      return this;
  	    };

  	    XMLNode.prototype.debugInfo = function(name) {
  	      var ref2, ref3;
  	      name = name || this.name;
  	      if ((name == null) && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
  	        return "";
  	      } else if (name == null) {
  	        return "parent: <" + this.parent.name + ">";
  	      } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
  	        return "node: <" + name + ">";
  	      } else {
  	        return "node: <" + name + ">, parent: <" + this.parent.name + ">";
  	      }
  	    };

  	    XMLNode.prototype.ele = function(name, attributes, text) {
  	      return this.element(name, attributes, text);
  	    };

  	    XMLNode.prototype.nod = function(name, attributes, text) {
  	      return this.node(name, attributes, text);
  	    };

  	    XMLNode.prototype.txt = function(value) {
  	      return this.text(value);
  	    };

  	    XMLNode.prototype.dat = function(value) {
  	      return this.cdata(value);
  	    };

  	    XMLNode.prototype.com = function(value) {
  	      return this.comment(value);
  	    };

  	    XMLNode.prototype.ins = function(target, value) {
  	      return this.instruction(target, value);
  	    };

  	    XMLNode.prototype.doc = function() {
  	      return this.document();
  	    };

  	    XMLNode.prototype.dec = function(version, encoding, standalone) {
  	      return this.declaration(version, encoding, standalone);
  	    };

  	    XMLNode.prototype.e = function(name, attributes, text) {
  	      return this.element(name, attributes, text);
  	    };

  	    XMLNode.prototype.n = function(name, attributes, text) {
  	      return this.node(name, attributes, text);
  	    };

  	    XMLNode.prototype.t = function(value) {
  	      return this.text(value);
  	    };

  	    XMLNode.prototype.d = function(value) {
  	      return this.cdata(value);
  	    };

  	    XMLNode.prototype.c = function(value) {
  	      return this.comment(value);
  	    };

  	    XMLNode.prototype.r = function(value) {
  	      return this.raw(value);
  	    };

  	    XMLNode.prototype.i = function(target, value) {
  	      return this.instruction(target, value);
  	    };

  	    XMLNode.prototype.u = function() {
  	      return this.up();
  	    };

  	    XMLNode.prototype.importXMLBuilder = function(doc) {
  	      return this.importDocument(doc);
  	    };

  	    XMLNode.prototype.replaceChild = function(newChild, oldChild) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.removeChild = function(oldChild) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.appendChild = function(newChild) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.hasChildNodes = function() {
  	      return this.children.length !== 0;
  	    };

  	    XMLNode.prototype.cloneNode = function(deep) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.normalize = function() {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.isSupported = function(feature, version) {
  	      return true;
  	    };

  	    XMLNode.prototype.hasAttributes = function() {
  	      return this.attribs.length !== 0;
  	    };

  	    XMLNode.prototype.compareDocumentPosition = function(other) {
  	      var ref, res;
  	      ref = this;
  	      if (ref === other) {
  	        return 0;
  	      } else if (this.document() !== other.document()) {
  	        res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
  	        if (Math.random() < 0.5) {
  	          res |= DocumentPosition.Preceding;
  	        } else {
  	          res |= DocumentPosition.Following;
  	        }
  	        return res;
  	      } else if (ref.isAncestor(other)) {
  	        return DocumentPosition.Contains | DocumentPosition.Preceding;
  	      } else if (ref.isDescendant(other)) {
  	        return DocumentPosition.Contains | DocumentPosition.Following;
  	      } else if (ref.isPreceding(other)) {
  	        return DocumentPosition.Preceding;
  	      } else {
  	        return DocumentPosition.Following;
  	      }
  	    };

  	    XMLNode.prototype.isSameNode = function(other) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.lookupPrefix = function(namespaceURI) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.isDefaultNamespace = function(namespaceURI) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.lookupNamespaceURI = function(prefix) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.isEqualNode = function(node) {
  	      var i, j, ref2;
  	      if (node.nodeType !== this.nodeType) {
  	        return false;
  	      }
  	      if (node.children.length !== this.children.length) {
  	        return false;
  	      }
  	      for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
  	        if (!this.children[i].isEqualNode(node.children[i])) {
  	          return false;
  	        }
  	      }
  	      return true;
  	    };

  	    XMLNode.prototype.getFeature = function(feature, version) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.setUserData = function(key, data, handler) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.getUserData = function(key) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLNode.prototype.contains = function(other) {
  	      if (!other) {
  	        return false;
  	      }
  	      return other === this || this.isDescendant(other);
  	    };

  	    XMLNode.prototype.isDescendant = function(node) {
  	      var child, isDescendantChild, j, len, ref2;
  	      ref2 = this.children;
  	      for (j = 0, len = ref2.length; j < len; j++) {
  	        child = ref2[j];
  	        if (node === child) {
  	          return true;
  	        }
  	        isDescendantChild = child.isDescendant(node);
  	        if (isDescendantChild) {
  	          return true;
  	        }
  	      }
  	      return false;
  	    };

  	    XMLNode.prototype.isAncestor = function(node) {
  	      return node.isDescendant(this);
  	    };

  	    XMLNode.prototype.isPreceding = function(node) {
  	      var nodePos, thisPos;
  	      nodePos = this.treePosition(node);
  	      thisPos = this.treePosition(this);
  	      if (nodePos === -1 || thisPos === -1) {
  	        return false;
  	      } else {
  	        return nodePos < thisPos;
  	      }
  	    };

  	    XMLNode.prototype.isFollowing = function(node) {
  	      var nodePos, thisPos;
  	      nodePos = this.treePosition(node);
  	      thisPos = this.treePosition(this);
  	      if (nodePos === -1 || thisPos === -1) {
  	        return false;
  	      } else {
  	        return nodePos > thisPos;
  	      }
  	    };

  	    XMLNode.prototype.treePosition = function(node) {
  	      var found, pos;
  	      pos = 0;
  	      found = false;
  	      this.foreachTreeNode(this.document(), function(childNode) {
  	        pos++;
  	        if (!found && childNode === node) {
  	          return found = true;
  	        }
  	      });
  	      if (found) {
  	        return pos;
  	      } else {
  	        return -1;
  	      }
  	    };

  	    XMLNode.prototype.foreachTreeNode = function(node, func) {
  	      var child, j, len, ref2, res;
  	      node || (node = this.document());
  	      ref2 = node.children;
  	      for (j = 0, len = ref2.length; j < len; j++) {
  	        child = ref2[j];
  	        if (res = func(child)) {
  	          return res;
  	        } else {
  	          res = this.foreachTreeNode(child, func);
  	          if (res) {
  	            return res;
  	          }
  	        }
  	      }
  	    };

  	    return XMLNode;

  	  })();

  	}).call(XMLNode);
  	return XMLNode$1.exports;
  }

  var XMLStringifier$1 = {exports: {}};

  var XMLStringifier = XMLStringifier$1.exports;

  var hasRequiredXMLStringifier;

  function requireXMLStringifier () {
  	if (hasRequiredXMLStringifier) return XMLStringifier$1.exports;
  	hasRequiredXMLStringifier = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLStringifier$1.exports = (function() {
  	    function XMLStringifier(options) {
  	      this.assertLegalName = bind(this.assertLegalName, this);
  	      this.assertLegalChar = bind(this.assertLegalChar, this);
  	      var key, ref, value;
  	      options || (options = {});
  	      this.options = options;
  	      if (!this.options.version) {
  	        this.options.version = '1.0';
  	      }
  	      ref = options.stringify || {};
  	      for (key in ref) {
  	        if (!hasProp.call(ref, key)) continue;
  	        value = ref[key];
  	        this[key] = value;
  	      }
  	    }

  	    XMLStringifier.prototype.name = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalName('' + val || '');
  	    };

  	    XMLStringifier.prototype.text = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar(this.textEscape('' + val || ''));
  	    };

  	    XMLStringifier.prototype.cdata = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      val = '' + val || '';
  	      val = val.replace(']]>', ']]]]><![CDATA[>');
  	      return this.assertLegalChar(val);
  	    };

  	    XMLStringifier.prototype.comment = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      val = '' + val || '';
  	      if (val.match(/--/)) {
  	        throw new Error("Comment text cannot contain double-hypen: " + val);
  	      }
  	      return this.assertLegalChar(val);
  	    };

  	    XMLStringifier.prototype.raw = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return '' + val || '';
  	    };

  	    XMLStringifier.prototype.attValue = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar(this.attEscape(val = '' + val || ''));
  	    };

  	    XMLStringifier.prototype.insTarget = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.insValue = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      val = '' + val || '';
  	      if (val.match(/\?>/)) {
  	        throw new Error("Invalid processing instruction value: " + val);
  	      }
  	      return this.assertLegalChar(val);
  	    };

  	    XMLStringifier.prototype.xmlVersion = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      val = '' + val || '';
  	      if (!val.match(/1\.[0-9]+/)) {
  	        throw new Error("Invalid version number: " + val);
  	      }
  	      return val;
  	    };

  	    XMLStringifier.prototype.xmlEncoding = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      val = '' + val || '';
  	      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
  	        throw new Error("Invalid encoding: " + val);
  	      }
  	      return this.assertLegalChar(val);
  	    };

  	    XMLStringifier.prototype.xmlStandalone = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      if (val) {
  	        return "yes";
  	      } else {
  	        return "no";
  	      }
  	    };

  	    XMLStringifier.prototype.dtdPubID = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdSysID = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdElementValue = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdAttType = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdAttDefault = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdEntityValue = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.dtdNData = function(val) {
  	      if (this.options.noValidation) {
  	        return val;
  	      }
  	      return this.assertLegalChar('' + val || '');
  	    };

  	    XMLStringifier.prototype.convertAttKey = '@';

  	    XMLStringifier.prototype.convertPIKey = '?';

  	    XMLStringifier.prototype.convertTextKey = '#text';

  	    XMLStringifier.prototype.convertCDataKey = '#cdata';

  	    XMLStringifier.prototype.convertCommentKey = '#comment';

  	    XMLStringifier.prototype.convertRawKey = '#raw';

  	    XMLStringifier.prototype.assertLegalChar = function(str) {
  	      var regex, res;
  	      if (this.options.noValidation) {
  	        return str;
  	      }
  	      regex = '';
  	      if (this.options.version === '1.0') {
  	        regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  	        if (res = str.match(regex)) {
  	          throw new Error("Invalid character in string: " + str + " at index " + res.index);
  	        }
  	      } else if (this.options.version === '1.1') {
  	        regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  	        if (res = str.match(regex)) {
  	          throw new Error("Invalid character in string: " + str + " at index " + res.index);
  	        }
  	      }
  	      return str;
  	    };

  	    XMLStringifier.prototype.assertLegalName = function(str) {
  	      var regex;
  	      if (this.options.noValidation) {
  	        return str;
  	      }
  	      this.assertLegalChar(str);
  	      regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
  	      if (!str.match(regex)) {
  	        throw new Error("Invalid character in name");
  	      }
  	      return str;
  	    };

  	    XMLStringifier.prototype.textEscape = function(str) {
  	      var ampregex;
  	      if (this.options.noValidation) {
  	        return str;
  	      }
  	      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
  	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
  	    };

  	    XMLStringifier.prototype.attEscape = function(str) {
  	      var ampregex;
  	      if (this.options.noValidation) {
  	        return str;
  	      }
  	      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
  	      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
  	    };

  	    return XMLStringifier;

  	  })();

  	}).call(XMLStringifier);
  	return XMLStringifier$1.exports;
  }

  var XMLStringWriter$1 = {exports: {}};

  var XMLWriterBase$1 = {exports: {}};

  var WriterState$1 = {exports: {}};

  var WriterState = WriterState$1.exports;

  var hasRequiredWriterState;

  function requireWriterState () {
  	if (hasRequiredWriterState) return WriterState$1.exports;
  	hasRequiredWriterState = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  WriterState$1.exports = {
  	    None: 0,
  	    OpenTag: 1,
  	    InsideTag: 2,
  	    CloseTag: 3
  	  };

  	}).call(WriterState);
  	return WriterState$1.exports;
  }

  var XMLWriterBase = XMLWriterBase$1.exports;

  var hasRequiredXMLWriterBase;

  function requireXMLWriterBase () {
  	if (hasRequiredXMLWriterBase) return XMLWriterBase$1.exports;
  	hasRequiredXMLWriterBase = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, WriterState, assign,
  	    hasProp = {}.hasOwnProperty;

  	  assign = requireUtility().assign;

  	  NodeType = requireNodeType();

  	  requireXMLDeclaration();

  	  requireXMLDocType();

  	  requireXMLCData();

  	  requireXMLComment();

  	  requireXMLElement();

  	  requireXMLRaw();

  	  requireXMLText();

  	  requireXMLProcessingInstruction();

  	  requireXMLDummy();

  	  requireXMLDTDAttList();

  	  requireXMLDTDElement();

  	  requireXMLDTDEntity();

  	  requireXMLDTDNotation();

  	  WriterState = requireWriterState();

  	  XMLWriterBase$1.exports = (function() {
  	    function XMLWriterBase(options) {
  	      var key, ref, value;
  	      options || (options = {});
  	      this.options = options;
  	      ref = options.writer || {};
  	      for (key in ref) {
  	        if (!hasProp.call(ref, key)) continue;
  	        value = ref[key];
  	        this["_" + key] = this[key];
  	        this[key] = value;
  	      }
  	    }

  	    XMLWriterBase.prototype.filterOptions = function(options) {
  	      var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
  	      options || (options = {});
  	      options = assign({}, this.options, options);
  	      filteredOptions = {
  	        writer: this
  	      };
  	      filteredOptions.pretty = options.pretty || false;
  	      filteredOptions.allowEmpty = options.allowEmpty || false;
  	      filteredOptions.indent = (ref = options.indent) != null ? ref : '  ';
  	      filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : '\n';
  	      filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
  	      filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
  	      filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : '';
  	      if (filteredOptions.spaceBeforeSlash === true) {
  	        filteredOptions.spaceBeforeSlash = ' ';
  	      }
  	      filteredOptions.suppressPrettyCount = 0;
  	      filteredOptions.user = {};
  	      filteredOptions.state = WriterState.None;
  	      return filteredOptions;
  	    };

  	    XMLWriterBase.prototype.indent = function(node, options, level) {
  	      var indentLevel;
  	      if (!options.pretty || options.suppressPrettyCount) {
  	        return '';
  	      } else if (options.pretty) {
  	        indentLevel = (level || 0) + options.offset + 1;
  	        if (indentLevel > 0) {
  	          return new Array(indentLevel).join(options.indent);
  	        }
  	      }
  	      return '';
  	    };

  	    XMLWriterBase.prototype.endline = function(node, options, level) {
  	      if (!options.pretty || options.suppressPrettyCount) {
  	        return '';
  	      } else {
  	        return options.newline;
  	      }
  	    };

  	    XMLWriterBase.prototype.attribute = function(att, options, level) {
  	      var r;
  	      this.openAttribute(att, options, level);
  	      r = ' ' + att.name + '="' + att.value + '"';
  	      this.closeAttribute(att, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.cdata = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<![CDATA[';
  	      options.state = WriterState.InsideTag;
  	      r += node.value;
  	      options.state = WriterState.CloseTag;
  	      r += ']]>' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.comment = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<!-- ';
  	      options.state = WriterState.InsideTag;
  	      r += node.value;
  	      options.state = WriterState.CloseTag;
  	      r += ' -->' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.declaration = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<?xml';
  	      options.state = WriterState.InsideTag;
  	      r += ' version="' + node.version + '"';
  	      if (node.encoding != null) {
  	        r += ' encoding="' + node.encoding + '"';
  	      }
  	      if (node.standalone != null) {
  	        r += ' standalone="' + node.standalone + '"';
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '?>';
  	      r += this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.docType = function(node, options, level) {
  	      var child, i, len, r, ref;
  	      level || (level = 0);
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level);
  	      r += '<!DOCTYPE ' + node.root().name;
  	      if (node.pubID && node.sysID) {
  	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
  	      } else if (node.sysID) {
  	        r += ' SYSTEM "' + node.sysID + '"';
  	      }
  	      if (node.children.length > 0) {
  	        r += ' [';
  	        r += this.endline(node, options, level);
  	        options.state = WriterState.InsideTag;
  	        ref = node.children;
  	        for (i = 0, len = ref.length; i < len; i++) {
  	          child = ref[i];
  	          r += this.writeChildNode(child, options, level + 1);
  	        }
  	        options.state = WriterState.CloseTag;
  	        r += ']';
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '>';
  	      r += this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.element = function(node, options, level) {
  	      var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
  	      level || (level = 0);
  	      prettySuppressed = false;
  	      r = '';
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r += this.indent(node, options, level) + '<' + node.name;
  	      ref = node.attribs;
  	      for (name in ref) {
  	        if (!hasProp.call(ref, name)) continue;
  	        att = ref[name];
  	        r += this.attribute(att, options, level);
  	      }
  	      childNodeCount = node.children.length;
  	      firstChildNode = childNodeCount === 0 ? null : node.children[0];
  	      if (childNodeCount === 0 || node.children.every(function(e) {
  	        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
  	      })) {
  	        if (options.allowEmpty) {
  	          r += '>';
  	          options.state = WriterState.CloseTag;
  	          r += '</' + node.name + '>' + this.endline(node, options, level);
  	        } else {
  	          options.state = WriterState.CloseTag;
  	          r += options.spaceBeforeSlash + '/>' + this.endline(node, options, level);
  	        }
  	      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
  	        r += '>';
  	        options.state = WriterState.InsideTag;
  	        options.suppressPrettyCount++;
  	        prettySuppressed = true;
  	        r += this.writeChildNode(firstChildNode, options, level + 1);
  	        options.suppressPrettyCount--;
  	        prettySuppressed = false;
  	        options.state = WriterState.CloseTag;
  	        r += '</' + node.name + '>' + this.endline(node, options, level);
  	      } else {
  	        if (options.dontPrettyTextNodes) {
  	          ref1 = node.children;
  	          for (i = 0, len = ref1.length; i < len; i++) {
  	            child = ref1[i];
  	            if ((child.type === NodeType.Text || child.type === NodeType.Raw) && (child.value != null)) {
  	              options.suppressPrettyCount++;
  	              prettySuppressed = true;
  	              break;
  	            }
  	          }
  	        }
  	        r += '>' + this.endline(node, options, level);
  	        options.state = WriterState.InsideTag;
  	        ref2 = node.children;
  	        for (j = 0, len1 = ref2.length; j < len1; j++) {
  	          child = ref2[j];
  	          r += this.writeChildNode(child, options, level + 1);
  	        }
  	        options.state = WriterState.CloseTag;
  	        r += this.indent(node, options, level) + '</' + node.name + '>';
  	        if (prettySuppressed) {
  	          options.suppressPrettyCount--;
  	        }
  	        r += this.endline(node, options, level);
  	        options.state = WriterState.None;
  	      }
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.writeChildNode = function(node, options, level) {
  	      switch (node.type) {
  	        case NodeType.CData:
  	          return this.cdata(node, options, level);
  	        case NodeType.Comment:
  	          return this.comment(node, options, level);
  	        case NodeType.Element:
  	          return this.element(node, options, level);
  	        case NodeType.Raw:
  	          return this.raw(node, options, level);
  	        case NodeType.Text:
  	          return this.text(node, options, level);
  	        case NodeType.ProcessingInstruction:
  	          return this.processingInstruction(node, options, level);
  	        case NodeType.Dummy:
  	          return '';
  	        case NodeType.Declaration:
  	          return this.declaration(node, options, level);
  	        case NodeType.DocType:
  	          return this.docType(node, options, level);
  	        case NodeType.AttributeDeclaration:
  	          return this.dtdAttList(node, options, level);
  	        case NodeType.ElementDeclaration:
  	          return this.dtdElement(node, options, level);
  	        case NodeType.EntityDeclaration:
  	          return this.dtdEntity(node, options, level);
  	        case NodeType.NotationDeclaration:
  	          return this.dtdNotation(node, options, level);
  	        default:
  	          throw new Error("Unknown XML node type: " + node.constructor.name);
  	      }
  	    };

  	    XMLWriterBase.prototype.processingInstruction = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<?';
  	      options.state = WriterState.InsideTag;
  	      r += node.target;
  	      if (node.value) {
  	        r += ' ' + node.value;
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '?>';
  	      r += this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.raw = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level);
  	      options.state = WriterState.InsideTag;
  	      r += node.value;
  	      options.state = WriterState.CloseTag;
  	      r += this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.text = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level);
  	      options.state = WriterState.InsideTag;
  	      r += node.value;
  	      options.state = WriterState.CloseTag;
  	      r += this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.dtdAttList = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<!ATTLIST';
  	      options.state = WriterState.InsideTag;
  	      r += ' ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
  	      if (node.defaultValueType !== '#DEFAULT') {
  	        r += ' ' + node.defaultValueType;
  	      }
  	      if (node.defaultValue) {
  	        r += ' "' + node.defaultValue + '"';
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.dtdElement = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<!ELEMENT';
  	      options.state = WriterState.InsideTag;
  	      r += ' ' + node.name + ' ' + node.value;
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.dtdEntity = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<!ENTITY';
  	      options.state = WriterState.InsideTag;
  	      if (node.pe) {
  	        r += ' %';
  	      }
  	      r += ' ' + node.name;
  	      if (node.value) {
  	        r += ' "' + node.value + '"';
  	      } else {
  	        if (node.pubID && node.sysID) {
  	          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
  	        } else if (node.sysID) {
  	          r += ' SYSTEM "' + node.sysID + '"';
  	        }
  	        if (node.nData) {
  	          r += ' NDATA ' + node.nData;
  	        }
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.dtdNotation = function(node, options, level) {
  	      var r;
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      r = this.indent(node, options, level) + '<!NOTATION';
  	      options.state = WriterState.InsideTag;
  	      r += ' ' + node.name;
  	      if (node.pubID && node.sysID) {
  	        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
  	      } else if (node.pubID) {
  	        r += ' PUBLIC "' + node.pubID + '"';
  	      } else if (node.sysID) {
  	        r += ' SYSTEM "' + node.sysID + '"';
  	      }
  	      options.state = WriterState.CloseTag;
  	      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
  	      options.state = WriterState.None;
  	      this.closeNode(node, options, level);
  	      return r;
  	    };

  	    XMLWriterBase.prototype.openNode = function(node, options, level) {};

  	    XMLWriterBase.prototype.closeNode = function(node, options, level) {};

  	    XMLWriterBase.prototype.openAttribute = function(att, options, level) {};

  	    XMLWriterBase.prototype.closeAttribute = function(att, options, level) {};

  	    return XMLWriterBase;

  	  })();

  	}).call(XMLWriterBase);
  	return XMLWriterBase$1.exports;
  }

  var XMLStringWriter = XMLStringWriter$1.exports;

  var hasRequiredXMLStringWriter;

  function requireXMLStringWriter () {
  	if (hasRequiredXMLStringWriter) return XMLStringWriter$1.exports;
  	hasRequiredXMLStringWriter = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var XMLWriterBase,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  XMLWriterBase = requireXMLWriterBase();

  	  XMLStringWriter$1.exports = (function(superClass) {
  	    extend(XMLStringWriter, superClass);

  	    function XMLStringWriter(options) {
  	      XMLStringWriter.__super__.constructor.call(this, options);
  	    }

  	    XMLStringWriter.prototype.document = function(doc, options) {
  	      var child, i, len, r, ref;
  	      options = this.filterOptions(options);
  	      r = '';
  	      ref = doc.children;
  	      for (i = 0, len = ref.length; i < len; i++) {
  	        child = ref[i];
  	        r += this.writeChildNode(child, options, 0);
  	      }
  	      if (options.pretty && r.slice(-options.newline.length) === options.newline) {
  	        r = r.slice(0, -options.newline.length);
  	      }
  	      return r;
  	    };

  	    return XMLStringWriter;

  	  })(XMLWriterBase);

  	}).call(XMLStringWriter);
  	return XMLStringWriter$1.exports;
  }

  var XMLDocument = XMLDocument$1.exports;

  var hasRequiredXMLDocument;

  function requireXMLDocument () {
  	if (hasRequiredXMLDocument) return XMLDocument$1.exports;
  	hasRequiredXMLDocument = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  isPlainObject = requireUtility().isPlainObject;

  	  XMLDOMImplementation = requireXMLDOMImplementation();

  	  XMLDOMConfiguration = requireXMLDOMConfiguration();

  	  XMLNode = requireXMLNode();

  	  NodeType = requireNodeType();

  	  XMLStringifier = requireXMLStringifier();

  	  XMLStringWriter = requireXMLStringWriter();

  	  XMLDocument$1.exports = (function(superClass) {
  	    extend(XMLDocument, superClass);

  	    function XMLDocument(options) {
  	      XMLDocument.__super__.constructor.call(this, null);
  	      this.name = "#document";
  	      this.type = NodeType.Document;
  	      this.documentURI = null;
  	      this.domConfig = new XMLDOMConfiguration();
  	      options || (options = {});
  	      if (!options.writer) {
  	        options.writer = new XMLStringWriter();
  	      }
  	      this.options = options;
  	      this.stringify = new XMLStringifier(options);
  	    }

  	    Object.defineProperty(XMLDocument.prototype, 'implementation', {
  	      value: new XMLDOMImplementation()
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'doctype', {
  	      get: function() {
  	        var child, i, len, ref;
  	        ref = this.children;
  	        for (i = 0, len = ref.length; i < len; i++) {
  	          child = ref[i];
  	          if (child.type === NodeType.DocType) {
  	            return child;
  	          }
  	        }
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'documentElement', {
  	      get: function() {
  	        return this.rootObject || null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'inputEncoding', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'strictErrorChecking', {
  	      get: function() {
  	        return false;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'xmlEncoding', {
  	      get: function() {
  	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
  	          return this.children[0].encoding;
  	        } else {
  	          return null;
  	        }
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'xmlStandalone', {
  	      get: function() {
  	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
  	          return this.children[0].standalone === 'yes';
  	        } else {
  	          return false;
  	        }
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'xmlVersion', {
  	      get: function() {
  	        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
  	          return this.children[0].version;
  	        } else {
  	          return "1.0";
  	        }
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'URL', {
  	      get: function() {
  	        return this.documentURI;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'origin', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'compatMode', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'characterSet', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    Object.defineProperty(XMLDocument.prototype, 'contentType', {
  	      get: function() {
  	        return null;
  	      }
  	    });

  	    XMLDocument.prototype.end = function(writer) {
  	      var writerOptions;
  	      writerOptions = {};
  	      if (!writer) {
  	        writer = this.options.writer;
  	      } else if (isPlainObject(writer)) {
  	        writerOptions = writer;
  	        writer = this.options.writer;
  	      }
  	      return writer.document(this, writer.filterOptions(writerOptions));
  	    };

  	    XMLDocument.prototype.toString = function(options) {
  	      return this.options.writer.document(this, this.options.writer.filterOptions(options));
  	    };

  	    XMLDocument.prototype.createElement = function(tagName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createDocumentFragment = function() {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createTextNode = function(data) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createComment = function(data) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createCDATASection = function(data) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createProcessingInstruction = function(target, data) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createAttribute = function(name) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createEntityReference = function(name) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.getElementsByTagName = function(tagname) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.importNode = function(importedNode, deep) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createElementNS = function(namespaceURI, qualifiedName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.getElementById = function(elementId) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.adoptNode = function(source) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.normalizeDocument = function() {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.getElementsByClassName = function(classNames) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createEvent = function(eventInterface) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createRange = function() {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createNodeIterator = function(root, whatToShow, filter) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    XMLDocument.prototype.createTreeWalker = function(root, whatToShow, filter) {
  	      throw new Error("This DOM method is not implemented." + this.debugInfo());
  	    };

  	    return XMLDocument;

  	  })(XMLNode);

  	}).call(XMLDocument);
  	return XMLDocument$1.exports;
  }

  var XMLDocumentCB$1 = {exports: {}};

  var XMLDocumentCB = XMLDocumentCB$1.exports;

  var hasRequiredXMLDocumentCB;

  function requireXMLDocumentCB () {
  	if (hasRequiredXMLDocumentCB) return XMLDocumentCB$1.exports;
  	hasRequiredXMLDocumentCB = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref,
  	    hasProp = {}.hasOwnProperty;

  	  ref = requireUtility(), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;

  	  NodeType = requireNodeType();

  	  XMLDocument = requireXMLDocument();

  	  XMLElement = requireXMLElement();

  	  XMLCData = requireXMLCData();

  	  XMLComment = requireXMLComment();

  	  XMLRaw = requireXMLRaw();

  	  XMLText = requireXMLText();

  	  XMLProcessingInstruction = requireXMLProcessingInstruction();

  	  XMLDeclaration = requireXMLDeclaration();

  	  XMLDocType = requireXMLDocType();

  	  XMLDTDAttList = requireXMLDTDAttList();

  	  XMLDTDEntity = requireXMLDTDEntity();

  	  XMLDTDElement = requireXMLDTDElement();

  	  XMLDTDNotation = requireXMLDTDNotation();

  	  XMLAttribute = requireXMLAttribute();

  	  XMLStringifier = requireXMLStringifier();

  	  XMLStringWriter = requireXMLStringWriter();

  	  WriterState = requireWriterState();

  	  XMLDocumentCB$1.exports = (function() {
  	    function XMLDocumentCB(options, onData, onEnd) {
  	      var writerOptions;
  	      this.name = "?xml";
  	      this.type = NodeType.Document;
  	      options || (options = {});
  	      writerOptions = {};
  	      if (!options.writer) {
  	        options.writer = new XMLStringWriter();
  	      } else if (isPlainObject(options.writer)) {
  	        writerOptions = options.writer;
  	        options.writer = new XMLStringWriter();
  	      }
  	      this.options = options;
  	      this.writer = options.writer;
  	      this.writerOptions = this.writer.filterOptions(writerOptions);
  	      this.stringify = new XMLStringifier(options);
  	      this.onDataCallback = onData || function() {};
  	      this.onEndCallback = onEnd || function() {};
  	      this.currentNode = null;
  	      this.currentLevel = -1;
  	      this.openTags = {};
  	      this.documentStarted = false;
  	      this.documentCompleted = false;
  	      this.root = null;
  	    }

  	    XMLDocumentCB.prototype.createChildNode = function(node) {
  	      var att, attName, attributes, child, i, len, ref1, ref2;
  	      switch (node.type) {
  	        case NodeType.CData:
  	          this.cdata(node.value);
  	          break;
  	        case NodeType.Comment:
  	          this.comment(node.value);
  	          break;
  	        case NodeType.Element:
  	          attributes = {};
  	          ref1 = node.attribs;
  	          for (attName in ref1) {
  	            if (!hasProp.call(ref1, attName)) continue;
  	            att = ref1[attName];
  	            attributes[attName] = att.value;
  	          }
  	          this.node(node.name, attributes);
  	          break;
  	        case NodeType.Dummy:
  	          this.dummy();
  	          break;
  	        case NodeType.Raw:
  	          this.raw(node.value);
  	          break;
  	        case NodeType.Text:
  	          this.text(node.value);
  	          break;
  	        case NodeType.ProcessingInstruction:
  	          this.instruction(node.target, node.value);
  	          break;
  	        default:
  	          throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
  	      }
  	      ref2 = node.children;
  	      for (i = 0, len = ref2.length; i < len; i++) {
  	        child = ref2[i];
  	        this.createChildNode(child);
  	        if (child.type === NodeType.Element) {
  	          this.up();
  	        }
  	      }
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.dummy = function() {
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.node = function(name, attributes, text) {
  	      var ref1;
  	      if (name == null) {
  	        throw new Error("Missing node name.");
  	      }
  	      if (this.root && this.currentLevel === -1) {
  	        throw new Error("Document can only have one root node. " + this.debugInfo(name));
  	      }
  	      this.openCurrent();
  	      name = getValue(name);
  	      if (attributes == null) {
  	        attributes = {};
  	      }
  	      attributes = getValue(attributes);
  	      if (!isObject(attributes)) {
  	        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
  	      }
  	      this.currentNode = new XMLElement(this, name, attributes);
  	      this.currentNode.children = false;
  	      this.currentLevel++;
  	      this.openTags[this.currentLevel] = this.currentNode;
  	      if (text != null) {
  	        this.text(text);
  	      }
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.element = function(name, attributes, text) {
  	      var child, i, len, oldValidationFlag, ref1, root;
  	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
  	        this.dtdElement.apply(this, arguments);
  	      } else {
  	        if (Array.isArray(name) || isObject(name) || isFunction(name)) {
  	          oldValidationFlag = this.options.noValidation;
  	          this.options.noValidation = true;
  	          root = new XMLDocument(this.options).element('TEMP_ROOT');
  	          root.element(name);
  	          this.options.noValidation = oldValidationFlag;
  	          ref1 = root.children;
  	          for (i = 0, len = ref1.length; i < len; i++) {
  	            child = ref1[i];
  	            this.createChildNode(child);
  	            if (child.type === NodeType.Element) {
  	              this.up();
  	            }
  	          }
  	        } else {
  	          this.node(name, attributes, text);
  	        }
  	      }
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.attribute = function(name, value) {
  	      var attName, attValue;
  	      if (!this.currentNode || this.currentNode.children) {
  	        throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
  	      }
  	      if (name != null) {
  	        name = getValue(name);
  	      }
  	      if (isObject(name)) {
  	        for (attName in name) {
  	          if (!hasProp.call(name, attName)) continue;
  	          attValue = name[attName];
  	          this.attribute(attName, attValue);
  	        }
  	      } else {
  	        if (isFunction(value)) {
  	          value = value.apply();
  	        }
  	        if (this.options.keepNullAttributes && (value == null)) {
  	          this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
  	        } else if (value != null) {
  	          this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
  	        }
  	      }
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.text = function(value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLText(this, value);
  	      this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.cdata = function(value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLCData(this, value);
  	      this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.comment = function(value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLComment(this, value);
  	      this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.raw = function(value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLRaw(this, value);
  	      this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.instruction = function(target, value) {
  	      var i, insTarget, insValue, len, node;
  	      this.openCurrent();
  	      if (target != null) {
  	        target = getValue(target);
  	      }
  	      if (value != null) {
  	        value = getValue(value);
  	      }
  	      if (Array.isArray(target)) {
  	        for (i = 0, len = target.length; i < len; i++) {
  	          insTarget = target[i];
  	          this.instruction(insTarget);
  	        }
  	      } else if (isObject(target)) {
  	        for (insTarget in target) {
  	          if (!hasProp.call(target, insTarget)) continue;
  	          insValue = target[insTarget];
  	          this.instruction(insTarget, insValue);
  	        }
  	      } else {
  	        if (isFunction(value)) {
  	          value = value.apply();
  	        }
  	        node = new XMLProcessingInstruction(this, target, value);
  	        this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      }
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
  	      var node;
  	      this.openCurrent();
  	      if (this.documentStarted) {
  	        throw new Error("declaration() must be the first node.");
  	      }
  	      node = new XMLDeclaration(this, version, encoding, standalone);
  	      this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
  	      this.openCurrent();
  	      if (root == null) {
  	        throw new Error("Missing root node name.");
  	      }
  	      if (this.root) {
  	        throw new Error("dtd() must come before the root node.");
  	      }
  	      this.currentNode = new XMLDocType(this, pubID, sysID);
  	      this.currentNode.rootNodeName = root;
  	      this.currentNode.children = false;
  	      this.currentLevel++;
  	      this.openTags[this.currentLevel] = this.currentNode;
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.dtdElement = function(name, value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLDTDElement(this, name, value);
  	      this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
  	      this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.entity = function(name, value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLDTDEntity(this, false, name, value);
  	      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.pEntity = function(name, value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLDTDEntity(this, true, name, value);
  	      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.notation = function(name, value) {
  	      var node;
  	      this.openCurrent();
  	      node = new XMLDTDNotation(this, name, value);
  	      this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.up = function() {
  	      if (this.currentLevel < 0) {
  	        throw new Error("The document node has no parent.");
  	      }
  	      if (this.currentNode) {
  	        if (this.currentNode.children) {
  	          this.closeNode(this.currentNode);
  	        } else {
  	          this.openNode(this.currentNode);
  	        }
  	        this.currentNode = null;
  	      } else {
  	        this.closeNode(this.openTags[this.currentLevel]);
  	      }
  	      delete this.openTags[this.currentLevel];
  	      this.currentLevel--;
  	      return this;
  	    };

  	    XMLDocumentCB.prototype.end = function() {
  	      while (this.currentLevel >= 0) {
  	        this.up();
  	      }
  	      return this.onEnd();
  	    };

  	    XMLDocumentCB.prototype.openCurrent = function() {
  	      if (this.currentNode) {
  	        this.currentNode.children = true;
  	        return this.openNode(this.currentNode);
  	      }
  	    };

  	    XMLDocumentCB.prototype.openNode = function(node) {
  	      var att, chunk, name, ref1;
  	      if (!node.isOpen) {
  	        if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
  	          this.root = node;
  	        }
  	        chunk = '';
  	        if (node.type === NodeType.Element) {
  	          this.writerOptions.state = WriterState.OpenTag;
  	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<' + node.name;
  	          ref1 = node.attribs;
  	          for (name in ref1) {
  	            if (!hasProp.call(ref1, name)) continue;
  	            att = ref1[name];
  	            chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
  	          }
  	          chunk += (node.children ? '>' : '/>') + this.writer.endline(node, this.writerOptions, this.currentLevel);
  	          this.writerOptions.state = WriterState.InsideTag;
  	        } else {
  	          this.writerOptions.state = WriterState.OpenTag;
  	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<!DOCTYPE ' + node.rootNodeName;
  	          if (node.pubID && node.sysID) {
  	            chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
  	          } else if (node.sysID) {
  	            chunk += ' SYSTEM "' + node.sysID + '"';
  	          }
  	          if (node.children) {
  	            chunk += ' [';
  	            this.writerOptions.state = WriterState.InsideTag;
  	          } else {
  	            this.writerOptions.state = WriterState.CloseTag;
  	            chunk += '>';
  	          }
  	          chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
  	        }
  	        this.onData(chunk, this.currentLevel);
  	        return node.isOpen = true;
  	      }
  	    };

  	    XMLDocumentCB.prototype.closeNode = function(node) {
  	      var chunk;
  	      if (!node.isClosed) {
  	        chunk = '';
  	        this.writerOptions.state = WriterState.CloseTag;
  	        if (node.type === NodeType.Element) {
  	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '</' + node.name + '>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
  	        } else {
  	          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + ']>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
  	        }
  	        this.writerOptions.state = WriterState.None;
  	        this.onData(chunk, this.currentLevel);
  	        return node.isClosed = true;
  	      }
  	    };

  	    XMLDocumentCB.prototype.onData = function(chunk, level) {
  	      this.documentStarted = true;
  	      return this.onDataCallback(chunk, level + 1);
  	    };

  	    XMLDocumentCB.prototype.onEnd = function() {
  	      this.documentCompleted = true;
  	      return this.onEndCallback();
  	    };

  	    XMLDocumentCB.prototype.debugInfo = function(name) {
  	      if (name == null) {
  	        return "";
  	      } else {
  	        return "node: <" + name + ">";
  	      }
  	    };

  	    XMLDocumentCB.prototype.ele = function() {
  	      return this.element.apply(this, arguments);
  	    };

  	    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
  	      return this.node(name, attributes, text);
  	    };

  	    XMLDocumentCB.prototype.txt = function(value) {
  	      return this.text(value);
  	    };

  	    XMLDocumentCB.prototype.dat = function(value) {
  	      return this.cdata(value);
  	    };

  	    XMLDocumentCB.prototype.com = function(value) {
  	      return this.comment(value);
  	    };

  	    XMLDocumentCB.prototype.ins = function(target, value) {
  	      return this.instruction(target, value);
  	    };

  	    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
  	      return this.declaration(version, encoding, standalone);
  	    };

  	    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
  	      return this.doctype(root, pubID, sysID);
  	    };

  	    XMLDocumentCB.prototype.e = function(name, attributes, text) {
  	      return this.element(name, attributes, text);
  	    };

  	    XMLDocumentCB.prototype.n = function(name, attributes, text) {
  	      return this.node(name, attributes, text);
  	    };

  	    XMLDocumentCB.prototype.t = function(value) {
  	      return this.text(value);
  	    };

  	    XMLDocumentCB.prototype.d = function(value) {
  	      return this.cdata(value);
  	    };

  	    XMLDocumentCB.prototype.c = function(value) {
  	      return this.comment(value);
  	    };

  	    XMLDocumentCB.prototype.r = function(value) {
  	      return this.raw(value);
  	    };

  	    XMLDocumentCB.prototype.i = function(target, value) {
  	      return this.instruction(target, value);
  	    };

  	    XMLDocumentCB.prototype.att = function() {
  	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
  	        return this.attList.apply(this, arguments);
  	      } else {
  	        return this.attribute.apply(this, arguments);
  	      }
  	    };

  	    XMLDocumentCB.prototype.a = function() {
  	      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
  	        return this.attList.apply(this, arguments);
  	      } else {
  	        return this.attribute.apply(this, arguments);
  	      }
  	    };

  	    XMLDocumentCB.prototype.ent = function(name, value) {
  	      return this.entity(name, value);
  	    };

  	    XMLDocumentCB.prototype.pent = function(name, value) {
  	      return this.pEntity(name, value);
  	    };

  	    XMLDocumentCB.prototype.not = function(name, value) {
  	      return this.notation(name, value);
  	    };

  	    return XMLDocumentCB;

  	  })();

  	}).call(XMLDocumentCB);
  	return XMLDocumentCB$1.exports;
  }

  var XMLStreamWriter$1 = {exports: {}};

  var XMLStreamWriter = XMLStreamWriter$1.exports;

  var hasRequiredXMLStreamWriter;

  function requireXMLStreamWriter () {
  	if (hasRequiredXMLStreamWriter) return XMLStreamWriter$1.exports;
  	hasRequiredXMLStreamWriter = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, WriterState, XMLWriterBase,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  NodeType = requireNodeType();

  	  XMLWriterBase = requireXMLWriterBase();

  	  WriterState = requireWriterState();

  	  XMLStreamWriter$1.exports = (function(superClass) {
  	    extend(XMLStreamWriter, superClass);

  	    function XMLStreamWriter(stream, options) {
  	      this.stream = stream;
  	      XMLStreamWriter.__super__.constructor.call(this, options);
  	    }

  	    XMLStreamWriter.prototype.endline = function(node, options, level) {
  	      if (node.isLastRootNode && options.state === WriterState.CloseTag) {
  	        return '';
  	      } else {
  	        return XMLStreamWriter.__super__.endline.call(this, node, options, level);
  	      }
  	    };

  	    XMLStreamWriter.prototype.document = function(doc, options) {
  	      var child, i, j, k, len, len1, ref, ref1, results;
  	      ref = doc.children;
  	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
  	        child = ref[i];
  	        child.isLastRootNode = i === doc.children.length - 1;
  	      }
  	      options = this.filterOptions(options);
  	      ref1 = doc.children;
  	      results = [];
  	      for (k = 0, len1 = ref1.length; k < len1; k++) {
  	        child = ref1[k];
  	        results.push(this.writeChildNode(child, options, 0));
  	      }
  	      return results;
  	    };

  	    XMLStreamWriter.prototype.attribute = function(att, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
  	    };

  	    XMLStreamWriter.prototype.cdata = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.comment = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.declaration = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.docType = function(node, options, level) {
  	      var child, j, len, ref;
  	      level || (level = 0);
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      this.stream.write(this.indent(node, options, level));
  	      this.stream.write('<!DOCTYPE ' + node.root().name);
  	      if (node.pubID && node.sysID) {
  	        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
  	      } else if (node.sysID) {
  	        this.stream.write(' SYSTEM "' + node.sysID + '"');
  	      }
  	      if (node.children.length > 0) {
  	        this.stream.write(' [');
  	        this.stream.write(this.endline(node, options, level));
  	        options.state = WriterState.InsideTag;
  	        ref = node.children;
  	        for (j = 0, len = ref.length; j < len; j++) {
  	          child = ref[j];
  	          this.writeChildNode(child, options, level + 1);
  	        }
  	        options.state = WriterState.CloseTag;
  	        this.stream.write(']');
  	      }
  	      options.state = WriterState.CloseTag;
  	      this.stream.write(options.spaceBeforeSlash + '>');
  	      this.stream.write(this.endline(node, options, level));
  	      options.state = WriterState.None;
  	      return this.closeNode(node, options, level);
  	    };

  	    XMLStreamWriter.prototype.element = function(node, options, level) {
  	      var att, child, childNodeCount, firstChildNode, j, len, name, ref, ref1;
  	      level || (level = 0);
  	      this.openNode(node, options, level);
  	      options.state = WriterState.OpenTag;
  	      this.stream.write(this.indent(node, options, level) + '<' + node.name);
  	      ref = node.attribs;
  	      for (name in ref) {
  	        if (!hasProp.call(ref, name)) continue;
  	        att = ref[name];
  	        this.attribute(att, options, level);
  	      }
  	      childNodeCount = node.children.length;
  	      firstChildNode = childNodeCount === 0 ? null : node.children[0];
  	      if (childNodeCount === 0 || node.children.every(function(e) {
  	        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
  	      })) {
  	        if (options.allowEmpty) {
  	          this.stream.write('>');
  	          options.state = WriterState.CloseTag;
  	          this.stream.write('</' + node.name + '>');
  	        } else {
  	          options.state = WriterState.CloseTag;
  	          this.stream.write(options.spaceBeforeSlash + '/>');
  	        }
  	      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
  	        this.stream.write('>');
  	        options.state = WriterState.InsideTag;
  	        options.suppressPrettyCount++;
  	        this.writeChildNode(firstChildNode, options, level + 1);
  	        options.suppressPrettyCount--;
  	        options.state = WriterState.CloseTag;
  	        this.stream.write('</' + node.name + '>');
  	      } else {
  	        this.stream.write('>' + this.endline(node, options, level));
  	        options.state = WriterState.InsideTag;
  	        ref1 = node.children;
  	        for (j = 0, len = ref1.length; j < len; j++) {
  	          child = ref1[j];
  	          this.writeChildNode(child, options, level + 1);
  	        }
  	        options.state = WriterState.CloseTag;
  	        this.stream.write(this.indent(node, options, level) + '</' + node.name + '>');
  	      }
  	      this.stream.write(this.endline(node, options, level));
  	      options.state = WriterState.None;
  	      return this.closeNode(node, options, level);
  	    };

  	    XMLStreamWriter.prototype.processingInstruction = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.raw = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.text = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.dtdAttList = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.dtdElement = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.dtdEntity = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
  	    };

  	    XMLStreamWriter.prototype.dtdNotation = function(node, options, level) {
  	      return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
  	    };

  	    return XMLStreamWriter;

  	  })(XMLWriterBase);

  	}).call(XMLStreamWriter);
  	return XMLStreamWriter$1.exports;
  }

  var hasRequiredLib;

  function requireLib () {
  	if (hasRequiredLib) return lib;
  	hasRequiredLib = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  	  ref = requireUtility(), assign = ref.assign, isFunction = ref.isFunction;

  	  XMLDOMImplementation = requireXMLDOMImplementation();

  	  XMLDocument = requireXMLDocument();

  	  XMLDocumentCB = requireXMLDocumentCB();

  	  XMLStringWriter = requireXMLStringWriter();

  	  XMLStreamWriter = requireXMLStreamWriter();

  	  NodeType = requireNodeType();

  	  WriterState = requireWriterState();

  	  lib.create = function(name, xmldec, doctype, options) {
  	    var doc, root;
  	    if (name == null) {
  	      throw new Error("Root element needs a name.");
  	    }
  	    options = assign({}, xmldec, doctype, options);
  	    doc = new XMLDocument(options);
  	    root = doc.element(name);
  	    if (!options.headless) {
  	      doc.declaration(options);
  	      if ((options.pubID != null) || (options.sysID != null)) {
  	        doc.dtd(options);
  	      }
  	    }
  	    return root;
  	  };

  	  lib.begin = function(options, onData, onEnd) {
  	    var ref1;
  	    if (isFunction(options)) {
  	      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
  	      options = {};
  	    }
  	    if (onData) {
  	      return new XMLDocumentCB(options, onData, onEnd);
  	    } else {
  	      return new XMLDocument(options);
  	    }
  	  };

  	  lib.stringWriter = function(options) {
  	    return new XMLStringWriter(options);
  	  };

  	  lib.streamWriter = function(stream, options) {
  	    return new XMLStreamWriter(stream, options);
  	  };

  	  lib.implementation = new XMLDOMImplementation();

  	  lib.nodeType = NodeType;

  	  lib.writerState = WriterState;

  	}).call(lib);
  	return lib;
  }

  var hasRequiredBuilder;

  function requireBuilder () {
  	if (hasRequiredBuilder) return builder;
  	hasRequiredBuilder = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var builder$1, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
  	    hasProp = {}.hasOwnProperty;

  	  builder$1 = requireLib();

  	  defaults = requireDefaults().defaults;

  	  requiresCDATA = function(entry) {
  	    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  	  };

  	  wrapCDATA = function(entry) {
  	    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  	  };

  	  escapeCDATA = function(entry) {
  	    return entry.replace(']]>', ']]]]><![CDATA[>');
  	  };

  	  builder.Builder = (function() {
  	    function Builder(opts) {
  	      var key, ref, value;
  	      this.options = {};
  	      ref = defaults["0.2"];
  	      for (key in ref) {
  	        if (!hasProp.call(ref, key)) continue;
  	        value = ref[key];
  	        this.options[key] = value;
  	      }
  	      for (key in opts) {
  	        if (!hasProp.call(opts, key)) continue;
  	        value = opts[key];
  	        this.options[key] = value;
  	      }
  	    }

  	    Builder.prototype.buildObject = function(rootObj) {
  	      var attrkey, charkey, render, rootElement, rootName;
  	      attrkey = this.options.attrkey;
  	      charkey = this.options.charkey;
  	      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
  	        rootName = Object.keys(rootObj)[0];
  	        rootObj = rootObj[rootName];
  	      } else {
  	        rootName = this.options.rootName;
  	      }
  	      render = (function(_this) {
  	        return function(element, obj) {
  	          var attr, child, entry, index, key, value;
  	          if (typeof obj !== 'object') {
  	            if (_this.options.cdata && requiresCDATA(obj)) {
  	              element.raw(wrapCDATA(obj));
  	            } else {
  	              element.txt(obj);
  	            }
  	          } else if (Array.isArray(obj)) {
  	            for (index in obj) {
  	              if (!hasProp.call(obj, index)) continue;
  	              child = obj[index];
  	              for (key in child) {
  	                entry = child[key];
  	                element = render(element.ele(key), entry).up();
  	              }
  	            }
  	          } else {
  	            for (key in obj) {
  	              if (!hasProp.call(obj, key)) continue;
  	              child = obj[key];
  	              if (key === attrkey) {
  	                if (typeof child === "object") {
  	                  for (attr in child) {
  	                    value = child[attr];
  	                    element = element.att(attr, value);
  	                  }
  	                }
  	              } else if (key === charkey) {
  	                if (_this.options.cdata && requiresCDATA(child)) {
  	                  element = element.raw(wrapCDATA(child));
  	                } else {
  	                  element = element.txt(child);
  	                }
  	              } else if (Array.isArray(child)) {
  	                for (index in child) {
  	                  if (!hasProp.call(child, index)) continue;
  	                  entry = child[index];
  	                  if (typeof entry === 'string') {
  	                    if (_this.options.cdata && requiresCDATA(entry)) {
  	                      element = element.ele(key).raw(wrapCDATA(entry)).up();
  	                    } else {
  	                      element = element.ele(key, entry).up();
  	                    }
  	                  } else {
  	                    element = render(element.ele(key), entry).up();
  	                  }
  	                }
  	              } else if (typeof child === "object") {
  	                element = render(element.ele(key), child).up();
  	              } else {
  	                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
  	                  element = element.ele(key).raw(wrapCDATA(child)).up();
  	                } else {
  	                  if (child == null) {
  	                    child = '';
  	                  }
  	                  element = element.ele(key, child.toString()).up();
  	                }
  	              }
  	            }
  	          }
  	          return element;
  	        };
  	      })(this);
  	      rootElement = builder$1.create(rootName, this.options.xmldec, this.options.doctype, {
  	        headless: this.options.headless,
  	        allowSurrogateChars: this.options.allowSurrogateChars
  	      });
  	      return render(rootElement, rootObj).end(this.options.renderOpts);
  	    };

  	    return Builder;

  	  })();

  	}).call(builder);
  	return builder;
  }

  var parser = {};

  var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init () {
    inited = true;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray (b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(len * 3 / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xFF;
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xFF;
    } else if (placeHolders === 1) {
      tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[(tmp << 4) & 0x3F];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
      output += lookup[tmp >> 10];
      output += lookup[(tmp >> 4) & 0x3F];
      output += lookup[(tmp << 2) & 0x3F];
      output += '=';
    }

    parts.push(output);

    return parts.join('')
  }

  function read (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }

  function write (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString = {}.toString;

  var isArray$1 = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };

  /*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
   * @license  MIT
   */
  /* eslint-disable no-proto */


  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;

  /*
   * Export kMaxLength after typed array support is determined.
   */
  kMaxLength();

  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }

  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr
  };

  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }

    return fromObject(that, value)
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
    if (typeof Symbol !== 'undefined' && Symbol.species &&
        Buffer[Symbol.species] === Buffer) ;
  }

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }

  function alloc (that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  };

  function allocUnsafe (that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  };

  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that
  }

  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that
  }

  function fromArrayBuffer (that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that
  }

  function fromObject (that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that
      }

      obj.copy(that, 0, 0, len);
      return that
    }

    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }

      if (obj.type === 'Buffer' && isArray$1(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }

  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }
  Buffer.isBuffer = isBuffer;
  function internalIsBuffer (b) {
    return !!(b != null && b._isBuffer)
  }

  Buffer.compare = function compare (a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }

    if (a === b) return 0

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!isArray$1(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    var length = this.length | 0;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.equals = function equals (b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>'
  };

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
          return asciiWrite(this, string, offset, length)

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }

  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }


  function base64ToBytes (str) {
    return toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  var sax = {};

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function() {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active ) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn)
      handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn)
      handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
      handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn)
      handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = (type === 'error');

    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler)
      return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] :
                                            [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' +
                              existing.length + ' ' + type + ' listeners added. ' +
                              'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || (list.listener && list.listener === listener)) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length; i-- > 0;) {
            if (list[i] === listener ||
                (list[i].listener && list[i].listener === listener)) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (list.length === 1) {
            list[0] = undefined;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list, position);
          }

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };
      
  // Alias for removeListener added in NodeJS 10.0
  // https://nodejs.org/api/events.html#events_emitter_off_eventname_listener
  EventEmitter.prototype.off = function(type, listener){
      return this.removeListener(type, listener);
  };

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events;

        events = this._events;
        if (!events)
          return this;

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          for (var i = 0, key; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }

        return this;
      };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events)
      ret = [];
    else {
      evlistener = events[type];
      if (!evlistener)
        ret = [];
      else if (typeof evlistener === 'function')
        ret = [evlistener.listener || evlistener];
      else
        ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount$1.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount$1;
  function listenerCount$1(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--)
      copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var _polyfillNode_events = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': EventEmitter,
    EventEmitter: EventEmitter
  });

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance$1 = global$1.performance || {};
  var performanceNow =
    performance$1.now        ||
    performance$1.mozNow     ||
    performance$1.msNow      ||
    performance$1.oNow       ||
    performance$1.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance$1)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var browser$1 = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  var inherits;
  if (typeof Object.create === 'function'){
    inherits = function inherits(ctor, superCtor) {
      // implementation from standard node.js 'util' module
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  } else {
    inherits = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  var inherits$1 = inherits;

  var formatRegExp = /%[sdj%]/g;
  function format(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) {
        objects.push(inspect(arguments[i]));
      }
      return objects.join(' ');
    }

    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
      if (x === '%%') return '%';
      if (i >= len) return x;
      switch (x) {
        case '%s': return String(args[i++]);
        case '%d': return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
        default:
          return x;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += ' ' + x;
      } else {
        str += ' ' + inspect(x);
      }
    }
    return str;
  }

  // Mark that a method should not be used.
  // Returns a modified function which warns once by default.
  // If --no-deprecation is set, then it is a no-op.
  function deprecate(fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (isUndefined(global$1.process)) {
      return function() {
        return deprecate(fn, msg).apply(this, arguments);
      };
    }

    if (browser$1.noDeprecation === true) {
      return fn;
    }

    var warned = false;
    function deprecated() {
      if (!warned) {
        if (browser$1.throwDeprecation) {
          throw new Error(msg);
        } else if (browser$1.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned = true;
      }
      return fn.apply(this, arguments);
    }

    return deprecated;
  }

  var debugs = {};
  var debugEnviron;
  function debuglog(set) {
    if (isUndefined(debugEnviron))
      debugEnviron = browser$1.env.NODE_DEBUG || '';
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
        var pid = 0;
        debugs[set] = function() {
          var msg = format.apply(null, arguments);
          console.error('%s %d: %s', set, pid, msg);
        };
      } else {
        debugs[set] = function() {};
      }
    }
    return debugs[set];
  }

  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  /* legacy: obj, showHidden, depth, colors*/
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };


  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str +
             '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }


  function stylizeNoColor(str, styleType) {
    return str;
  }


  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }


  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (isArray(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }


  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }


  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }


  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }


  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }


  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function(prev, cur) {
      if (cur.indexOf('\n') >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }


  // NOTE: These type checking functions intentionally don't use `instanceof`
  // because it is fragile and can be easily faked with `Object.create()`.
  function isArray(ar) {
    return Array.isArray(ar);
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isNull(arg) {
    return arg === null;
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function BufferList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function (v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function (v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function () {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function () {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function (s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function (n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      p.data.copy(ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  // Copyright Joyent, Inc. and other Node contributors.
  var isBufferEncoding = Buffer.isEncoding
    || function(encoding) {
         switch (encoding && encoding.toLowerCase()) {
           case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
           default: return false;
         }
       };


  function assertEncoding(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error('Unknown encoding: ' + encoding);
    }
  }

  // StringDecoder provides an interface for efficiently splitting a series of
  // buffers into a series of JS strings without breaking apart multi-byte
  // characters. CESU-8 is handled as part of the UTF-8 encoding.
  //
  // @TODO Handling all encodings inside a single object makes it very difficult
  // to reason about this code, so it should be split up in the future.
  // @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
  // points as used by CESU-8.
  function StringDecoder(encoding) {
    this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
    assertEncoding(encoding);
    switch (this.encoding) {
      case 'utf8':
        // CESU-8 represents each of Surrogate Pair by 3-bytes
        this.surrogateSize = 3;
        break;
      case 'ucs2':
      case 'utf16le':
        // UTF-16 represents each of Surrogate Pair by 2-bytes
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case 'base64':
        // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }

    // Enough space to store all bytes of a single character. UTF-8 needs 4
    // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
    this.charBuffer = new Buffer(6);
    // Number of bytes received for the current incomplete multi-byte character.
    this.charReceived = 0;
    // Number of bytes expected for the current incomplete multi-byte character.
    this.charLength = 0;
  }

  // write decodes the given buffer and returns it as JS string that is
  // guaranteed to not contain any partial multi-byte characters. Any partial
  // character found at the end of the buffer is buffered up, and will be
  // returned when calling write again with the remaining bytes.
  //
  // Note: Converting a Buffer containing an orphan surrogate to a String
  // currently works, but converting a String to a Buffer (via `new Buffer`, or
  // Buffer#write) will replace incomplete surrogates with the unicode
  // replacement character. See https://codereview.chromium.org/121173009/ .
  StringDecoder.prototype.write = function(buffer) {
    var charStr = '';
    // if our last write ended with an incomplete multibyte character
    while (this.charLength) {
      // determine how many remaining bytes this buffer has to offer for this char
      var available = (buffer.length >= this.charLength - this.charReceived) ?
          this.charLength - this.charReceived :
          buffer.length;

      // add the new bytes to the char buffer
      buffer.copy(this.charBuffer, this.charReceived, 0, available);
      this.charReceived += available;

      if (this.charReceived < this.charLength) {
        // still not enough chars in this buffer? wait for more ...
        return '';
      }

      // remove bytes belonging to the current character from the buffer
      buffer = buffer.slice(available, buffer.length);

      // get the character that was split
      charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

      // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
      var charCode = charStr.charCodeAt(charStr.length - 1);
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        this.charLength += this.surrogateSize;
        charStr = '';
        continue;
      }
      this.charReceived = this.charLength = 0;

      // if there are no more bytes in this buffer, just emit our char
      if (buffer.length === 0) {
        return charStr;
      }
      break;
    }

    // determine and set charLength / charReceived
    this.detectIncompleteChar(buffer);

    var end = buffer.length;
    if (this.charLength) {
      // buffer the incomplete character bytes we got
      buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
      end -= this.charReceived;
    }

    charStr += buffer.toString(this.encoding, 0, end);

    var end = charStr.length - 1;
    var charCode = charStr.charCodeAt(end);
    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      var size = this.surrogateSize;
      this.charLength += size;
      this.charReceived += size;
      this.charBuffer.copy(this.charBuffer, size, 0, size);
      buffer.copy(this.charBuffer, 0, 0, size);
      return charStr.substring(0, end);
    }

    // or just emit the charStr
    return charStr;
  };

  // detectIncompleteChar determines if there is an incomplete UTF-8 character at
  // the end of the given buffer. If so, it sets this.charLength to the byte
  // length that character, and sets this.charReceived to the number of bytes
  // that are available for this character.
  StringDecoder.prototype.detectIncompleteChar = function(buffer) {
    // determine how many bytes we have to check at the end of this buffer
    var i = (buffer.length >= 3) ? 3 : buffer.length;

    // Figure out if one of the last i bytes of our buffer announces an
    // incomplete char.
    for (; i > 0; i--) {
      var c = buffer[buffer.length - i];

      // See http://en.wikipedia.org/wiki/UTF-8#Description

      // 110XXXXX
      if (i == 1 && c >> 5 == 0x06) {
        this.charLength = 2;
        break;
      }

      // 1110XXXX
      if (i <= 2 && c >> 4 == 0x0E) {
        this.charLength = 3;
        break;
      }

      // 11110XXX
      if (i <= 3 && c >> 3 == 0x1E) {
        this.charLength = 4;
        break;
      }
    }
    this.charReceived = i;
  };

  StringDecoder.prototype.end = function(buffer) {
    var res = '';
    if (buffer && buffer.length)
      res = this.write(buffer);

    if (this.charReceived) {
      var cr = this.charReceived;
      var buf = this.charBuffer;
      var enc = this.encoding;
      res += buf.slice(0, cr).toString(enc);
    }

    return res;
  };

  function passThroughWrite(buffer) {
    return buffer.toString(this.encoding);
  }

  function utf16DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  }

  function base64DetectIncompleteChar(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  }

  var _polyfillNode_string_decoder = /*#__PURE__*/Object.freeze({
    __proto__: null,
    StringDecoder: StringDecoder
  });

  Readable.ReadableState = ReadableState;

  var debug = debuglog('stream');
  inherits$1(Readable, EventEmitter);

  function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') {
      return emitter.prependListener(event, fn);
    } else {
      // This is a hack to make sure that our error handler is attached before any
      // userland ones.  NEVER DO THIS. This is here only because this code needs
      // to continue to work with older versions of Node.js that do not include
      // the prependListener() method. The goal is to eventually remove this hack.
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
  }
  function listenerCount (emitter, type) {
    return emitter.listeners(type).length;
  }
  function ReadableState(options, stream) {

    options = options || {};

    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // when piping, we only care about 'readable' events that happen
    // after read()ing all the bytes and not getting any pushback.
    this.ranOut = false;

    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;

    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;

    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {

    if (!(this instanceof Readable)) return new Readable(options);

    this._readableState = new ReadableState(options, this);

    // legacy
    this.readable = true;

    if (options && typeof options.read === 'function') this._read = options.read;

    EventEmitter.call(this);
  }

  // Manually shove something into the read() buffer.
  // This returns true if the highWaterMark has not been hit yet,
  // similar to how Writable.write() returns true if you should
  // write() some more.
  Readable.prototype.push = function (chunk, encoding) {
    var state = this._readableState;

    if (!state.objectMode && typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
    }

    return readableAddChunk(this, state, chunk, encoding, false);
  };

  // Unshift should *always* be something directly out of read()
  Readable.prototype.unshift = function (chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, '', true);
  };

  Readable.prototype.isPaused = function () {
    return this._readableState.flowing === false;
  };

  function readableAddChunk(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (state.ended && !addToFront) {
        var e = new Error('stream.push() after EOF');
        stream.emit('error', e);
      } else if (state.endEmitted && addToFront) {
        var _e = new Error('stream.unshift() after end event');
        stream.emit('error', _e);
      } else {
        var skipAdd;
        if (state.decoder && !addToFront && !encoding) {
          chunk = state.decoder.write(chunk);
          skipAdd = !state.objectMode && chunk.length === 0;
        }

        if (!addToFront) state.reading = false;

        // Don't add to the buffer if we've decoded to an empty string chunk and
        // we're not in object mode
        if (!skipAdd) {
          // if we want the data now, just emit it.
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
          } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

            if (state.needReadable) emitReadable(stream);
          }
        }

        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }

    return needMoreData(state);
  }

  // if it's past the high water mark, we can push in some more.
  // Also, if we have no data yet, we can stand some
  // more bytes.  This is to work around cases where hwm=0,
  // such as the repl.  Also, if the push() triggered a
  // readable event, and the user called read(largeNumber) such that
  // needReadable was set, then we ought to push more, so that another
  // 'readable' event will be triggered.
  function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  }

  // backwards compatibility.
  Readable.prototype.setEncoding = function (enc) {
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };

  // Don't raise the hwm > 8MB
  var MAX_HWM = 0x800000;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      // Get the next highest power of 2 to prevent increasing hwm excessively in
      // tiny amounts
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }

  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
      // Only flow one buffer at a time
      if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }

  // you can override either this method, or the async _read(n) below.
  Readable.prototype.read = function (n) {
    debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;

    if (n !== 0) state.emittedReadable = false;

    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug('read: emitReadable', state.length, state.ended);
      if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
      return null;
    }

    n = howMuchToRead(n, state);

    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
      if (state.length === 0) endReadable(this);
      return null;
    }

    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.

    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug('need readable', doRead);

    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug('length less than watermark', doRead);
    }

    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
      doRead = false;
      debug('reading or ended', doRead);
    } else if (doRead) {
      debug('do read');
      state.reading = true;
      state.sync = true;
      // if the length is currently zero, then we *need* a readable event.
      if (state.length === 0) state.needReadable = true;
      // call internal read method
      this._read(state.highWaterMark);
      state.sync = false;
      // If _read pushed data synchronously, then `reading` will be false,
      // and we need to re-evaluate how much data we can return to the user.
      if (!state.reading) n = howMuchToRead(nOrig, state);
    }

    var ret;
    if (n > 0) ret = fromList(n, state);else ret = null;

    if (ret === null) {
      state.needReadable = true;
      n = 0;
    } else {
      state.length -= n;
    }

    if (state.length === 0) {
      // If we have nothing in the buffer, then we want to know
      // as soon as we *do* get something into the buffer.
      if (!state.ended) state.needReadable = true;

      // If we tried to read() past the EOF, then emit end on the next tick.
      if (nOrig !== n && state.ended) endReadable(this);
    }

    if (ret !== null) this.emit('data', ret);

    return ret;
  };

  function chunkInvalid(state, chunk) {
    var er = null;
    if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    return er;
  }

  function onEofChunk(stream, state) {
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;

    // emit 'readable' now to make sure it gets picked up.
    emitReadable(stream);
  }

  // Don't emit readable right away in sync mode, because this can trigger
  // another read() call => stack overflow.  This way, it might trigger
  // a nextTick recursion warning, but that's not so bad.
  function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug('emitReadable', state.flowing);
      state.emittedReadable = true;
      if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
    }
  }

  function emitReadable_(stream) {
    debug('emit readable');
    stream.emit('readable');
    flow(stream);
  }

  // at this point, the user has presumably seen the 'readable' event,
  // and called read() to consume some data.  that may have triggered
  // in turn another _read(n) call, in which case reading = true if
  // it's in progress.
  // However, if we're not ended, or reading, and the length < hwm,
  // then go ahead and try to read some more preemptively.
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      nextTick(maybeReadMore_, stream, state);
    }
  }

  function maybeReadMore_(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug('maybeReadMore read 0');
      stream.read(0);
      if (len === state.length)
        // didn't get any data, stop spinning.
        break;else len = state.length;
    }
    state.readingMore = false;
  }

  // abstract method.  to be overridden in specific implementation classes.
  // call cb(er, data) where data is <= n in length.
  // for virtual (non-string, non-buffer) streams, "length" is somewhat
  // arbitrary, and perhaps not very meaningful.
  Readable.prototype._read = function (n) {
    this.emit('error', new Error('not implemented'));
  };

  Readable.prototype.pipe = function (dest, pipeOpts) {
    var src = this;
    var state = this._readableState;

    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

    var doEnd = (!pipeOpts || pipeOpts.end !== false);

    var endFn = doEnd ? onend : cleanup;
    if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

    dest.on('unpipe', onunpipe);
    function onunpipe(readable) {
      debug('onunpipe');
      if (readable === src) {
        cleanup();
      }
    }

    function onend() {
      debug('onend');
      dest.end();
    }

    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);

    var cleanedUp = false;
    function cleanup() {
      debug('cleanup');
      // cleanup event handlers once the pipe is broken
      dest.removeListener('close', onclose);
      dest.removeListener('finish', onfinish);
      dest.removeListener('drain', ondrain);
      dest.removeListener('error', onerror);
      dest.removeListener('unpipe', onunpipe);
      src.removeListener('end', onend);
      src.removeListener('end', cleanup);
      src.removeListener('data', ondata);

      cleanedUp = true;

      // if the reader is waiting for a drain event from this
      // specific writer, then it would cause it to never start
      // flowing again.
      // So, if this is awaiting a drain, then we just call it now.
      // If we don't know, then assume that we are waiting for one.
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }

    // If the user pushes more data while we're writing to dest then we'll end up
    // in ondata again. However, we only want to increase awaitDrain once because
    // dest will only emit one 'drain' event for the multiple writes.
    // => Introduce a guard on increasing awaitDrain.
    var increasedAwaitDrain = false;
    src.on('data', ondata);
    function ondata(chunk) {
      debug('ondata');
      increasedAwaitDrain = false;
      var ret = dest.write(chunk);
      if (false === ret && !increasedAwaitDrain) {
        // If the user unpiped during `dest.write()`, it is possible
        // to get stuck in a permanently paused state if that write
        // also returned false.
        // => Check whether `dest` is still a piping destination.
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug('false write response, pause', src._readableState.awaitDrain);
          src._readableState.awaitDrain++;
          increasedAwaitDrain = true;
        }
        src.pause();
      }
    }

    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
      debug('onerror', er);
      unpipe();
      dest.removeListener('error', onerror);
      if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
    }

    // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror);

    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
      dest.removeListener('finish', onfinish);
      unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
      debug('onfinish');
      dest.removeListener('close', onclose);
      unpipe();
    }
    dest.once('finish', onfinish);

    function unpipe() {
      debug('unpipe');
      src.unpipe(dest);
    }

    // tell the dest that it's being piped to
    dest.emit('pipe', src);

    // start the flow if it hasn't been started already.
    if (!state.flowing) {
      debug('pipe resume');
      src.resume();
    }

    return dest;
  };

  function pipeOnDrain(src) {
    return function () {
      var state = src._readableState;
      debug('pipeOnDrain', state.awaitDrain);
      if (state.awaitDrain) state.awaitDrain--;
      if (state.awaitDrain === 0 && src.listeners('data').length) {
        state.flowing = true;
        flow(src);
      }
    };
  }

  Readable.prototype.unpipe = function (dest) {
    var state = this._readableState;

    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;

    // just one destination.  most common case.
    if (state.pipesCount === 1) {
      // passed in one, but it's not the right one.
      if (dest && dest !== state.pipes) return this;

      if (!dest) dest = state.pipes;

      // got a match.
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest) dest.emit('unpipe', this);
      return this;
    }

    // slow case. multiple pipe destinations.

    if (!dest) {
      // remove all.
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;

      for (var _i = 0; _i < len; _i++) {
        dests[_i].emit('unpipe', this);
      }return this;
    }

    // try to find the right one.
    var i = indexOf(state.pipes, dest);
    if (i === -1) return this;

    state.pipes.splice(i, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];

    dest.emit('unpipe', this);

    return this;
  };

  // set up data events if they are asked for
  // Ensure readable listeners eventually get something
  Readable.prototype.on = function (ev, fn) {
    var res = EventEmitter.prototype.on.call(this, ev, fn);

    if (ev === 'data') {
      // Start flowing on next tick if stream isn't explicitly paused
      if (this._readableState.flowing !== false) this.resume();
    } else if (ev === 'readable') {
      var state = this._readableState;
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.emittedReadable = false;
        if (!state.reading) {
          nextTick(nReadingNextTick, this);
        } else if (state.length) {
          emitReadable(this);
        }
      }
    }

    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;

  function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
  }

  // pause() and resume() are remnants of the legacy readable stream API
  // If the user uses them, then switch into old mode.
  Readable.prototype.resume = function () {
    var state = this._readableState;
    if (!state.flowing) {
      debug('resume');
      state.flowing = true;
      resume(this, state);
    }
    return this;
  };

  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      nextTick(resume_, stream, state);
    }
  }

  function resume_(stream, state) {
    if (!state.reading) {
      debug('resume read 0');
      stream.read(0);
    }

    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
  }

  Readable.prototype.pause = function () {
    debug('call pause flowing=%j', this._readableState.flowing);
    if (false !== this._readableState.flowing) {
      debug('pause');
      this._readableState.flowing = false;
      this.emit('pause');
    }
    return this;
  };

  function flow(stream) {
    var state = stream._readableState;
    debug('flow', state.flowing);
    while (state.flowing && stream.read() !== null) {}
  }

  // wrap an old-style stream as the async data source.
  // This is *not* part of the readable stream interface.
  // It is an ugly unfortunate mess of history.
  Readable.prototype.wrap = function (stream) {
    var state = this._readableState;
    var paused = false;

    var self = this;
    stream.on('end', function () {
      debug('wrapped end');
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) self.push(chunk);
      }

      self.push(null);
    });

    stream.on('data', function (chunk) {
      debug('wrapped data');
      if (state.decoder) chunk = state.decoder.write(chunk);

      // don't skip over falsy values in objectMode
      if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

      var ret = self.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });

    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === 'function') {
        this[i] = function (method) {
          return function () {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }

    // proxy certain important events.
    var events = ['error', 'close', 'destroy', 'pause', 'resume'];
    forEach(events, function (ev) {
      stream.on(ev, self.emit.bind(self, ev));
    });

    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    self._read = function (n) {
      debug('wrapped _read', n);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };

    return self;
  };

  // exposed for testing purposes only.
  Readable._fromList = fromList;

  // Pluck off n bytes from an array of buffers.
  // Length is the combined lengths of all the buffers in the list.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;

    var ret;
    if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
      // read it all, truncate the list
      if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      // read part of list
      ret = fromListPartial(n, state.buffer, state.decoder);
    }

    return ret;
  }

  // Extracts only enough buffered data to satisfy the amount requested.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
      // slice is the same for buffers and strings
      ret = list.head.data.slice(0, n);
      list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
      // first chunk is a perfect match
      ret = list.shift();
    } else {
      // result spans more than one buffer
      ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
  }

  // Copies a specified amount of characters from the list of buffered data
  // chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while (p = p.next) {
      var str = p.data;
      var nb = n > str.length ? str.length : n;
      if (nb === str.length) ret += str;else ret += str.slice(0, n);
      n -= nb;
      if (n === 0) {
        if (nb === str.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = str.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  // Copies a specified amount of bytes from the list of buffered data chunks.
  // This function is designed to be inlinable, so please take care when making
  // changes to the function body.
  function copyFromBuffer(n, list) {
    var ret = Buffer.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while (p = p.next) {
      var buf = p.data;
      var nb = n > buf.length ? buf.length : n;
      buf.copy(ret, ret.length - n, 0, nb);
      n -= nb;
      if (n === 0) {
        if (nb === buf.length) {
          ++c;
          if (p.next) list.head = p.next;else list.head = list.tail = null;
        } else {
          list.head = p;
          p.data = buf.slice(nb);
        }
        break;
      }
      ++c;
    }
    list.length -= c;
    return ret;
  }

  function endReadable(stream) {
    var state = stream._readableState;

    // If we get here before consuming all the bytes, then that is a
    // bug in node.  Should never happen.
    if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

    if (!state.endEmitted) {
      state.ended = true;
      nextTick(endReadableNT, state, stream);
    }
  }

  function endReadableNT(state, stream) {
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit('end');
    }
  }

  function forEach(xs, f) {
    for (var i = 0, l = xs.length; i < l; i++) {
      f(xs[i], i);
    }
  }

  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) return i;
    }
    return -1;
  }

  // A bit simpler than readable streams.
  Writable.WritableState = WritableState;
  inherits$1(Writable, EventEmitter);

  function nop() {}

  function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
  }

  function WritableState(options, stream) {
    Object.defineProperty(this, 'buffer', {
      get: deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
    options = options || {};

    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;

    if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    var hwm = options.highWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

    // cast to ints.
    this.highWaterMark = ~ ~this.highWaterMark;

    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;

    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;

    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';

    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;

    // a flag to see when we're in the middle of a write.
    this.writing = false;

    // when true all writes will be buffered until .uncork() call
    this.corked = 0;

    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;

    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;

    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function (er) {
      onwrite(stream, er);
    };

    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;

    // the amount that is being written when _write is called.
    this.writelen = 0;

    this.bufferedRequest = null;
    this.lastBufferedRequest = null;

    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;

    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;

    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;

    // count buffered requests
    this.bufferedRequestCount = 0;

    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
  }

  WritableState.prototype.getBuffer = function writableStateGetBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  function Writable(options) {

    // Writable ctor is applied to Duplexes, though they're not
    // instanceof Writable, they're instanceof Readable.
    if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

    this._writableState = new WritableState(options, this);

    // legacy.
    this.writable = true;

    if (options) {
      if (typeof options.write === 'function') this._write = options.write;

      if (typeof options.writev === 'function') this._writev = options.writev;
    }

    EventEmitter.call(this);
  }

  // Otherwise people can pipe Writable streams, which is just wrong.
  Writable.prototype.pipe = function () {
    this.emit('error', new Error('Cannot pipe, not readable'));
  };

  function writeAfterEnd(stream, cb) {
    var er = new Error('write after end');
    // TODO: defer error events consistently everywhere, not just the cb
    stream.emit('error', er);
    nextTick(cb, er);
  }

  // If we get something that is not a buffer, string, null, or undefined,
  // and we're not in objectMode, then that's an error.
  // Otherwise stream chunks are all considered to be of length=1, and the
  // watermarks determine how many objects to keep in the buffer, rather than
  // how many bytes or characters.
  function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    // Always throw error if a null is written
    // if we are not in object mode then throw
    // if it is not a buffer, string, or undefined.
    if (chunk === null) {
      er = new TypeError('May not write null values to stream');
    } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
      er = new TypeError('Invalid non-string/buffer chunk');
    }
    if (er) {
      stream.emit('error', er);
      nextTick(cb, er);
      valid = false;
    }
    return valid;
  }

  Writable.prototype.write = function (chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;

    if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

    if (typeof cb !== 'function') cb = nop;

    if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, chunk, encoding, cb);
    }

    return ret;
  };

  Writable.prototype.cork = function () {
    var state = this._writableState;

    state.corked++;
  };

  Writable.prototype.uncork = function () {
    var state = this._writableState;

    if (state.corked) {
      state.corked--;

      if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
  };

  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };

  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
      chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
  }

  // if we're already writing something, then just put this
  // in the queue, and wait our turn.  Otherwise, call _write
  // If we return false, then we need a drain event, so set that flag.
  function writeOrBuffer(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);

    if (Buffer.isBuffer(chunk)) encoding = 'buffer';
    var len = state.objectMode ? 1 : chunk.length;

    state.length += len;

    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;

    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }

    return ret;
  }

  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }

  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) nextTick(cb, er);else cb(er);

    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  }

  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }

  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;

    onwriteStateUpdate(state);

    if (er) onwriteError(stream, state, sync, er, cb);else {
      // Check if we're actually ready to finish, but don't emit yet
      var finished = needFinish(state);

      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }

      if (sync) {
        /*<replacement>*/
          nextTick(afterWrite, stream, state, finished, cb);
        /*</replacement>*/
      } else {
          afterWrite(stream, state, finished, cb);
        }
    }
  }

  function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }

  // Must force callback to be called on nextTick, so that we don't
  // emit 'drain' before the write() consumer gets the 'false' return
  // value, and has a chance to attach a 'drain' listener.
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit('drain');
    }
  }

  // if there's something in the buffer waiting, then process it
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;

    if (stream._writev && entry && entry.next) {
      // Fast case, write everything using _writev()
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;

      var count = 0;
      while (entry) {
        buffer[count] = entry;
        entry = entry.next;
        count += 1;
      }

      doWrite(stream, state, true, state.length, buffer, '', holder.finish);

      // doWrite is almost always async, defer these to save a bit of time
      // as the hot path ends with doWrite
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
    } else {
      // Slow case, write chunks one-by-one
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;

        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        // if we didn't call the onwrite immediately, then
        // it means that we need to wait until it does.
        // also, that means that the chunk and cb are currently
        // being processed, so move the buffer counter past them.
        if (state.writing) {
          break;
        }
      }

      if (entry === null) state.lastBufferedRequest = null;
    }

    state.bufferedRequestCount = 0;
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }

  Writable.prototype._write = function (chunk, encoding, cb) {
    cb(new Error('not implemented'));
  };

  Writable.prototype._writev = null;

  Writable.prototype.end = function (chunk, encoding, cb) {
    var state = this._writableState;

    if (typeof chunk === 'function') {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === 'function') {
      cb = encoding;
      encoding = null;
    }

    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

    // .end() fully uncorks
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }

    // ignore unnecessary end() calls.
    if (!state.ending && !state.finished) endWritable(this, state, cb);
  };

  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }

  function prefinish(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }

  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit('finish');
      } else {
        prefinish(stream, state);
      }
    }
    return need;
  }

  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished) nextTick(cb);else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
  }

  // It seems a linked list but it is not
  // there will be only 2 of these for each stream
  function CorkedRequest(state) {
    var _this = this;

    this.next = null;
    this.entry = null;

    this.finish = function (err) {
      var entry = _this.entry;
      _this.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      if (state.corkedRequestsFree) {
        state.corkedRequestsFree.next = _this;
      } else {
        state.corkedRequestsFree = _this;
      }
    };
  }

  inherits$1(Duplex, Readable);

  var keys = Object.keys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);

    Readable.call(this, options);
    Writable.call(this, options);

    if (options && options.readable === false) this.readable = false;

    if (options && options.writable === false) this.writable = false;

    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

    this.once('end', onend);
  }

  // the no-half-open enforcer
  function onend() {
    // if we allow half-open state, or if the writable side ended,
    // then we're ok.
    if (this.allowHalfOpen || this._writableState.ended) return;

    // no more data can be written.
    // But allow more writes to happen in this tick.
    nextTick(onEndNT, this);
  }

  function onEndNT(self) {
    self.end();
  }

  // a transform stream is a readable/writable stream where you do
  inherits$1(Transform, Duplex);

  function TransformState(stream) {
    this.afterTransform = function (er, data) {
      return afterTransform(stream, er, data);
    };

    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }

  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;

    var cb = ts.writecb;

    if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

    ts.writechunk = null;
    ts.writecb = null;

    if (data !== null && data !== undefined) stream.push(data);

    cb(er);

    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);

    Duplex.call(this, options);

    this._transformState = new TransformState(this);

    // when the writable side finishes, then flush out anything remaining.
    var stream = this;

    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;

    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;

    if (options) {
      if (typeof options.transform === 'function') this._transform = options.transform;

      if (typeof options.flush === 'function') this._flush = options.flush;
    }

    this.once('prefinish', function () {
      if (typeof this._flush === 'function') this._flush(function (er) {
        done(stream, er);
      });else done(stream);
    });
  }

  Transform.prototype.push = function (chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };

  // This is the part where you do stuff!
  // override this function in implementation classes.
  // 'chunk' is an input chunk.
  //
  // Call `push(newChunk)` to pass along transformed output
  // to the readable side.  You may call 'push' zero or more times.
  //
  // Call `cb(err)` when you are done with this chunk.  If you pass
  // an error, then that'll put the hurt on the whole operation.  If you
  // never call cb(), then you'll never get another chunk.
  Transform.prototype._transform = function (chunk, encoding, cb) {
    throw new Error('Not implemented');
  };

  Transform.prototype._write = function (chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
  };

  // Doesn't matter what the args are here.
  // _transform does all the work.
  // That we got here means that the readable side wants more data.
  Transform.prototype._read = function (n) {
    var ts = this._transformState;

    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      // mark that we need a transform, so that any data that comes in
      // will get processed, now that we've asked for it.
      ts.needTransform = true;
    }
  };

  function done(stream, er) {
    if (er) return stream.emit('error', er);

    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    var ws = stream._writableState;
    var ts = stream._transformState;

    if (ws.length) throw new Error('Calling transform done when ws.length != 0');

    if (ts.transforming) throw new Error('Calling transform done when still transforming');

    return stream.push(null);
  }

  inherits$1(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);

    Transform.call(this, options);
  }

  PassThrough.prototype._transform = function (chunk, encoding, cb) {
    cb(null, chunk);
  };

  inherits$1(Stream, EventEmitter);
  Stream.Readable = Readable;
  Stream.Writable = Writable;
  Stream.Duplex = Duplex;
  Stream.Transform = Transform;
  Stream.PassThrough = PassThrough;

  // Backwards-compat with node 0.4.x
  Stream.Stream = Stream;

  // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EventEmitter.call(this);
  }

  Stream.prototype.pipe = function(dest, options) {
    var source = this;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on('data', ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on('drain', ondrain);

    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on('end', onend);
      source.on('close', onclose);
    }

    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;

      dest.end();
    }


    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;

      if (typeof dest.destroy === 'function') dest.destroy();
    }

    // don't leave dangling pipes when there are errors.
    function onerror(er) {
      cleanup();
      if (EventEmitter.listenerCount(this, 'error') === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on('error', onerror);
    dest.on('error', onerror);

    // remove all the event listeners that were added.
    function cleanup() {
      source.removeListener('data', ondata);
      dest.removeListener('drain', ondrain);

      source.removeListener('end', onend);
      source.removeListener('close', onclose);

      source.removeListener('error', onerror);
      dest.removeListener('error', onerror);

      source.removeListener('end', cleanup);
      source.removeListener('close', cleanup);

      dest.removeListener('close', cleanup);
    }

    source.on('end', cleanup);
    source.on('close', cleanup);

    dest.on('close', cleanup);

    dest.emit('pipe', source);

    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
  };

  var _polyfillNode_stream = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Stream,
    Readable: Readable,
    Writable: Writable,
    Duplex: Duplex,
    Transform: Transform,
    PassThrough: PassThrough,
    Stream: Stream
  });

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_stream);

  var require$$1$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_string_decoder);

  var hasRequiredSax;

  function requireSax () {
  	if (hasRequiredSax) return sax;
  	hasRequiredSax = 1;
  	(function (exports) {
  (function (sax) { // wrapper for non-node envs
  		  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) };
  		  sax.SAXParser = SAXParser;
  		  sax.SAXStream = SAXStream;
  		  sax.createStream = createStream;

  		  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  		  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  		  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  		  // as rare as required, but as often as necessary to ensure never crossing this bound.
  		  // Furthermore, buffers are only tested at most once per write(), so passing a very
  		  // large string into write() might have undesirable effects, but this is manageable by
  		  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  		  // edge case, result in creating at most one complete copy of the string passed in.
  		  // Set to Infinity to have unlimited buffers.
  		  sax.MAX_BUFFER_LENGTH = 64 * 1024;

  		  var buffers = [
  		    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
  		    'procInstName', 'procInstBody', 'entity', 'attribName',
  		    'attribValue', 'cdata', 'script'
  		  ];

  		  sax.EVENTS = [
  		    'text',
  		    'processinginstruction',
  		    'sgmldeclaration',
  		    'doctype',
  		    'comment',
  		    'opentagstart',
  		    'attribute',
  		    'opentag',
  		    'closetag',
  		    'opencdata',
  		    'cdata',
  		    'closecdata',
  		    'error',
  		    'end',
  		    'ready',
  		    'script',
  		    'opennamespace',
  		    'closenamespace'
  		  ];

  		  function SAXParser (strict, opt) {
  		    if (!(this instanceof SAXParser)) {
  		      return new SAXParser(strict, opt)
  		    }

  		    var parser = this;
  		    clearBuffers(parser);
  		    parser.q = parser.c = '';
  		    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
  		    parser.opt = opt || {};
  		    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
  		    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
  		    parser.tags = [];
  		    parser.closed = parser.closedRoot = parser.sawRoot = false;
  		    parser.tag = parser.error = null;
  		    parser.strict = !!strict;
  		    parser.noscript = !!(strict || parser.opt.noscript);
  		    parser.state = S.BEGIN;
  		    parser.strictEntities = parser.opt.strictEntities;
  		    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
  		    parser.attribList = [];

  		    // namespaces form a prototype chain.
  		    // it always points at the current tag,
  		    // which protos to its parent tag.
  		    if (parser.opt.xmlns) {
  		      parser.ns = Object.create(rootNS);
  		    }

  		    // mostly just for error reporting
  		    parser.trackPosition = parser.opt.position !== false;
  		    if (parser.trackPosition) {
  		      parser.position = parser.line = parser.column = 0;
  		    }
  		    emit(parser, 'onready');
  		  }

  		  if (!Object.create) {
  		    Object.create = function (o) {
  		      function F () {}
  		      F.prototype = o;
  		      var newf = new F();
  		      return newf
  		    };
  		  }

  		  if (!Object.keys) {
  		    Object.keys = function (o) {
  		      var a = [];
  		      for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
  		      return a
  		    };
  		  }

  		  function checkBufferLength (parser) {
  		    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
  		    var maxActual = 0;
  		    for (var i = 0, l = buffers.length; i < l; i++) {
  		      var len = parser[buffers[i]].length;
  		      if (len > maxAllowed) {
  		        // Text/cdata nodes can get big, and since they're buffered,
  		        // we can get here under normal conditions.
  		        // Avoid issues by emitting the text node now,
  		        // so at least it won't get any bigger.
  		        switch (buffers[i]) {
  		          case 'textNode':
  		            closeText(parser);
  		            break

  		          case 'cdata':
  		            emitNode(parser, 'oncdata', parser.cdata);
  		            parser.cdata = '';
  		            break

  		          case 'script':
  		            emitNode(parser, 'onscript', parser.script);
  		            parser.script = '';
  		            break

  		          default:
  		            error(parser, 'Max buffer length exceeded: ' + buffers[i]);
  		        }
  		      }
  		      maxActual = Math.max(maxActual, len);
  		    }
  		    // schedule the next check for the earliest possible buffer overrun.
  		    var m = sax.MAX_BUFFER_LENGTH - maxActual;
  		    parser.bufferCheckPosition = m + parser.position;
  		  }

  		  function clearBuffers (parser) {
  		    for (var i = 0, l = buffers.length; i < l; i++) {
  		      parser[buffers[i]] = '';
  		    }
  		  }

  		  function flushBuffers (parser) {
  		    closeText(parser);
  		    if (parser.cdata !== '') {
  		      emitNode(parser, 'oncdata', parser.cdata);
  		      parser.cdata = '';
  		    }
  		    if (parser.script !== '') {
  		      emitNode(parser, 'onscript', parser.script);
  		      parser.script = '';
  		    }
  		  }

  		  SAXParser.prototype = {
  		    end: function () { end(this); },
  		    write: write,
  		    resume: function () { this.error = null; return this },
  		    close: function () { return this.write(null) },
  		    flush: function () { flushBuffers(this); }
  		  };

  		  var Stream;
  		  try {
  		    Stream = require$$0.Stream;
  		  } catch (ex) {
  		    Stream = function () {};
  		  }

  		  var streamWraps = sax.EVENTS.filter(function (ev) {
  		    return ev !== 'error' && ev !== 'end'
  		  });

  		  function createStream (strict, opt) {
  		    return new SAXStream(strict, opt)
  		  }

  		  function SAXStream (strict, opt) {
  		    if (!(this instanceof SAXStream)) {
  		      return new SAXStream(strict, opt)
  		    }

  		    Stream.apply(this);

  		    this._parser = new SAXParser(strict, opt);
  		    this.writable = true;
  		    this.readable = true;

  		    var me = this;

  		    this._parser.onend = function () {
  		      me.emit('end');
  		    };

  		    this._parser.onerror = function (er) {
  		      me.emit('error', er);

  		      // if didn't throw, then means error was handled.
  		      // go ahead and clear error, so we can write again.
  		      me._parser.error = null;
  		    };

  		    this._decoder = null;

  		    streamWraps.forEach(function (ev) {
  		      Object.defineProperty(me, 'on' + ev, {
  		        get: function () {
  		          return me._parser['on' + ev]
  		        },
  		        set: function (h) {
  		          if (!h) {
  		            me.removeAllListeners(ev);
  		            me._parser['on' + ev] = h;
  		            return h
  		          }
  		          me.on(ev, h);
  		        },
  		        enumerable: true,
  		        configurable: false
  		      });
  		    });
  		  }

  		  SAXStream.prototype = Object.create(Stream.prototype, {
  		    constructor: {
  		      value: SAXStream
  		    }
  		  });

  		  SAXStream.prototype.write = function (data) {
  		    if (typeof Buffer === 'function' &&
  		      typeof Buffer.isBuffer === 'function' &&
  		      Buffer.isBuffer(data)) {
  		      if (!this._decoder) {
  		        var SD = require$$1$1.StringDecoder;
  		        this._decoder = new SD('utf8');
  		      }
  		      data = this._decoder.write(data);
  		    }

  		    this._parser.write(data.toString());
  		    this.emit('data', data);
  		    return true
  		  };

  		  SAXStream.prototype.end = function (chunk) {
  		    if (chunk && chunk.length) {
  		      this.write(chunk);
  		    }
  		    this._parser.end();
  		    return true
  		  };

  		  SAXStream.prototype.on = function (ev, handler) {
  		    var me = this;
  		    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
  		      me._parser['on' + ev] = function () {
  		        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
  		        args.splice(0, 0, ev);
  		        me.emit.apply(me, args);
  		      };
  		    }

  		    return Stream.prototype.on.call(me, ev, handler)
  		  };

  		  // this really needs to be replaced with character classes.
  		  // XML allows all manner of ridiculous numbers and digits.
  		  var CDATA = '[CDATA[';
  		  var DOCTYPE = 'DOCTYPE';
  		  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
  		  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
  		  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };

  		  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  		  // This implementation works on strings, a single character at a time
  		  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  		  // without a significant breaking change to either this  parser, or the
  		  // JavaScript language.  Implementation of an emoji-capable xml parser
  		  // is left as an exercise for the reader.
  		  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

  		  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

  		  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
  		  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

  		  function isWhitespace (c) {
  		    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  		  }

  		  function isQuote (c) {
  		    return c === '"' || c === '\''
  		  }

  		  function isAttribEnd (c) {
  		    return c === '>' || isWhitespace(c)
  		  }

  		  function isMatch (regex, c) {
  		    return regex.test(c)
  		  }

  		  function notMatch (regex, c) {
  		    return !isMatch(regex, c)
  		  }

  		  var S = 0;
  		  sax.STATE = {
  		    BEGIN: S++, // leading byte order mark or whitespace
  		    BEGIN_WHITESPACE: S++, // leading whitespace
  		    TEXT: S++, // general stuff
  		    TEXT_ENTITY: S++, // &amp and such.
  		    OPEN_WAKA: S++, // <
  		    SGML_DECL: S++, // <!BLARG
  		    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
  		    DOCTYPE: S++, // <!DOCTYPE
  		    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
  		    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
  		    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
  		    COMMENT_STARTING: S++, // <!-
  		    COMMENT: S++, // <!--
  		    COMMENT_ENDING: S++, // <!-- blah -
  		    COMMENT_ENDED: S++, // <!-- blah --
  		    CDATA: S++, // <![CDATA[ something
  		    CDATA_ENDING: S++, // ]
  		    CDATA_ENDING_2: S++, // ]]
  		    PROC_INST: S++, // <?hi
  		    PROC_INST_BODY: S++, // <?hi there
  		    PROC_INST_ENDING: S++, // <?hi "there" ?
  		    OPEN_TAG: S++, // <strong
  		    OPEN_TAG_SLASH: S++, // <strong /
  		    ATTRIB: S++, // <a
  		    ATTRIB_NAME: S++, // <a foo
  		    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
  		    ATTRIB_VALUE: S++, // <a foo=
  		    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
  		    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
  		    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
  		    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
  		    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
  		    CLOSE_TAG: S++, // </a
  		    CLOSE_TAG_SAW_WHITE: S++, // </a   >
  		    SCRIPT: S++, // <script> ...
  		    SCRIPT_ENDING: S++ // <script> ... <
  		  };

  		  sax.XML_ENTITIES = {
  		    'amp': '&',
  		    'gt': '>',
  		    'lt': '<',
  		    'quot': '"',
  		    'apos': "'"
  		  };

  		  sax.ENTITIES = {
  		    'amp': '&',
  		    'gt': '>',
  		    'lt': '<',
  		    'quot': '"',
  		    'apos': "'",
  		    'AElig': 198,
  		    'Aacute': 193,
  		    'Acirc': 194,
  		    'Agrave': 192,
  		    'Aring': 197,
  		    'Atilde': 195,
  		    'Auml': 196,
  		    'Ccedil': 199,
  		    'ETH': 208,
  		    'Eacute': 201,
  		    'Ecirc': 202,
  		    'Egrave': 200,
  		    'Euml': 203,
  		    'Iacute': 205,
  		    'Icirc': 206,
  		    'Igrave': 204,
  		    'Iuml': 207,
  		    'Ntilde': 209,
  		    'Oacute': 211,
  		    'Ocirc': 212,
  		    'Ograve': 210,
  		    'Oslash': 216,
  		    'Otilde': 213,
  		    'Ouml': 214,
  		    'THORN': 222,
  		    'Uacute': 218,
  		    'Ucirc': 219,
  		    'Ugrave': 217,
  		    'Uuml': 220,
  		    'Yacute': 221,
  		    'aacute': 225,
  		    'acirc': 226,
  		    'aelig': 230,
  		    'agrave': 224,
  		    'aring': 229,
  		    'atilde': 227,
  		    'auml': 228,
  		    'ccedil': 231,
  		    'eacute': 233,
  		    'ecirc': 234,
  		    'egrave': 232,
  		    'eth': 240,
  		    'euml': 235,
  		    'iacute': 237,
  		    'icirc': 238,
  		    'igrave': 236,
  		    'iuml': 239,
  		    'ntilde': 241,
  		    'oacute': 243,
  		    'ocirc': 244,
  		    'ograve': 242,
  		    'oslash': 248,
  		    'otilde': 245,
  		    'ouml': 246,
  		    'szlig': 223,
  		    'thorn': 254,
  		    'uacute': 250,
  		    'ucirc': 251,
  		    'ugrave': 249,
  		    'uuml': 252,
  		    'yacute': 253,
  		    'yuml': 255,
  		    'copy': 169,
  		    'reg': 174,
  		    'nbsp': 160,
  		    'iexcl': 161,
  		    'cent': 162,
  		    'pound': 163,
  		    'curren': 164,
  		    'yen': 165,
  		    'brvbar': 166,
  		    'sect': 167,
  		    'uml': 168,
  		    'ordf': 170,
  		    'laquo': 171,
  		    'not': 172,
  		    'shy': 173,
  		    'macr': 175,
  		    'deg': 176,
  		    'plusmn': 177,
  		    'sup1': 185,
  		    'sup2': 178,
  		    'sup3': 179,
  		    'acute': 180,
  		    'micro': 181,
  		    'para': 182,
  		    'middot': 183,
  		    'cedil': 184,
  		    'ordm': 186,
  		    'raquo': 187,
  		    'frac14': 188,
  		    'frac12': 189,
  		    'frac34': 190,
  		    'iquest': 191,
  		    'times': 215,
  		    'divide': 247,
  		    'OElig': 338,
  		    'oelig': 339,
  		    'Scaron': 352,
  		    'scaron': 353,
  		    'Yuml': 376,
  		    'fnof': 402,
  		    'circ': 710,
  		    'tilde': 732,
  		    'Alpha': 913,
  		    'Beta': 914,
  		    'Gamma': 915,
  		    'Delta': 916,
  		    'Epsilon': 917,
  		    'Zeta': 918,
  		    'Eta': 919,
  		    'Theta': 920,
  		    'Iota': 921,
  		    'Kappa': 922,
  		    'Lambda': 923,
  		    'Mu': 924,
  		    'Nu': 925,
  		    'Xi': 926,
  		    'Omicron': 927,
  		    'Pi': 928,
  		    'Rho': 929,
  		    'Sigma': 931,
  		    'Tau': 932,
  		    'Upsilon': 933,
  		    'Phi': 934,
  		    'Chi': 935,
  		    'Psi': 936,
  		    'Omega': 937,
  		    'alpha': 945,
  		    'beta': 946,
  		    'gamma': 947,
  		    'delta': 948,
  		    'epsilon': 949,
  		    'zeta': 950,
  		    'eta': 951,
  		    'theta': 952,
  		    'iota': 953,
  		    'kappa': 954,
  		    'lambda': 955,
  		    'mu': 956,
  		    'nu': 957,
  		    'xi': 958,
  		    'omicron': 959,
  		    'pi': 960,
  		    'rho': 961,
  		    'sigmaf': 962,
  		    'sigma': 963,
  		    'tau': 964,
  		    'upsilon': 965,
  		    'phi': 966,
  		    'chi': 967,
  		    'psi': 968,
  		    'omega': 969,
  		    'thetasym': 977,
  		    'upsih': 978,
  		    'piv': 982,
  		    'ensp': 8194,
  		    'emsp': 8195,
  		    'thinsp': 8201,
  		    'zwnj': 8204,
  		    'zwj': 8205,
  		    'lrm': 8206,
  		    'rlm': 8207,
  		    'ndash': 8211,
  		    'mdash': 8212,
  		    'lsquo': 8216,
  		    'rsquo': 8217,
  		    'sbquo': 8218,
  		    'ldquo': 8220,
  		    'rdquo': 8221,
  		    'bdquo': 8222,
  		    'dagger': 8224,
  		    'Dagger': 8225,
  		    'bull': 8226,
  		    'hellip': 8230,
  		    'permil': 8240,
  		    'prime': 8242,
  		    'Prime': 8243,
  		    'lsaquo': 8249,
  		    'rsaquo': 8250,
  		    'oline': 8254,
  		    'frasl': 8260,
  		    'euro': 8364,
  		    'image': 8465,
  		    'weierp': 8472,
  		    'real': 8476,
  		    'trade': 8482,
  		    'alefsym': 8501,
  		    'larr': 8592,
  		    'uarr': 8593,
  		    'rarr': 8594,
  		    'darr': 8595,
  		    'harr': 8596,
  		    'crarr': 8629,
  		    'lArr': 8656,
  		    'uArr': 8657,
  		    'rArr': 8658,
  		    'dArr': 8659,
  		    'hArr': 8660,
  		    'forall': 8704,
  		    'part': 8706,
  		    'exist': 8707,
  		    'empty': 8709,
  		    'nabla': 8711,
  		    'isin': 8712,
  		    'notin': 8713,
  		    'ni': 8715,
  		    'prod': 8719,
  		    'sum': 8721,
  		    'minus': 8722,
  		    'lowast': 8727,
  		    'radic': 8730,
  		    'prop': 8733,
  		    'infin': 8734,
  		    'ang': 8736,
  		    'and': 8743,
  		    'or': 8744,
  		    'cap': 8745,
  		    'cup': 8746,
  		    'int': 8747,
  		    'there4': 8756,
  		    'sim': 8764,
  		    'cong': 8773,
  		    'asymp': 8776,
  		    'ne': 8800,
  		    'equiv': 8801,
  		    'le': 8804,
  		    'ge': 8805,
  		    'sub': 8834,
  		    'sup': 8835,
  		    'nsub': 8836,
  		    'sube': 8838,
  		    'supe': 8839,
  		    'oplus': 8853,
  		    'otimes': 8855,
  		    'perp': 8869,
  		    'sdot': 8901,
  		    'lceil': 8968,
  		    'rceil': 8969,
  		    'lfloor': 8970,
  		    'rfloor': 8971,
  		    'lang': 9001,
  		    'rang': 9002,
  		    'loz': 9674,
  		    'spades': 9824,
  		    'clubs': 9827,
  		    'hearts': 9829,
  		    'diams': 9830
  		  };

  		  Object.keys(sax.ENTITIES).forEach(function (key) {
  		    var e = sax.ENTITIES[key];
  		    var s = typeof e === 'number' ? String.fromCharCode(e) : e;
  		    sax.ENTITIES[key] = s;
  		  });

  		  for (var s in sax.STATE) {
  		    sax.STATE[sax.STATE[s]] = s;
  		  }

  		  // shorthand
  		  S = sax.STATE;

  		  function emit (parser, event, data) {
  		    parser[event] && parser[event](data);
  		  }

  		  function emitNode (parser, nodeType, data) {
  		    if (parser.textNode) closeText(parser);
  		    emit(parser, nodeType, data);
  		  }

  		  function closeText (parser) {
  		    parser.textNode = textopts(parser.opt, parser.textNode);
  		    if (parser.textNode) emit(parser, 'ontext', parser.textNode);
  		    parser.textNode = '';
  		  }

  		  function textopts (opt, text) {
  		    if (opt.trim) text = text.trim();
  		    if (opt.normalize) text = text.replace(/\s+/g, ' ');
  		    return text
  		  }

  		  function error (parser, er) {
  		    closeText(parser);
  		    if (parser.trackPosition) {
  		      er += '\nLine: ' + parser.line +
  		        '\nColumn: ' + parser.column +
  		        '\nChar: ' + parser.c;
  		    }
  		    er = new Error(er);
  		    parser.error = er;
  		    emit(parser, 'onerror', er);
  		    return parser
  		  }

  		  function end (parser) {
  		    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');
  		    if ((parser.state !== S.BEGIN) &&
  		      (parser.state !== S.BEGIN_WHITESPACE) &&
  		      (parser.state !== S.TEXT)) {
  		      error(parser, 'Unexpected end');
  		    }
  		    closeText(parser);
  		    parser.c = '';
  		    parser.closed = true;
  		    emit(parser, 'onend');
  		    SAXParser.call(parser, parser.strict, parser.opt);
  		    return parser
  		  }

  		  function strictFail (parser, message) {
  		    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
  		      throw new Error('bad call to strictFail')
  		    }
  		    if (parser.strict) {
  		      error(parser, message);
  		    }
  		  }

  		  function newTag (parser) {
  		    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
  		    var parent = parser.tags[parser.tags.length - 1] || parser;
  		    var tag = parser.tag = { name: parser.tagName, attributes: {} };

  		    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
  		    if (parser.opt.xmlns) {
  		      tag.ns = parent.ns;
  		    }
  		    parser.attribList.length = 0;
  		    emitNode(parser, 'onopentagstart', tag);
  		  }

  		  function qname (name, attribute) {
  		    var i = name.indexOf(':');
  		    var qualName = i < 0 ? [ '', name ] : name.split(':');
  		    var prefix = qualName[0];
  		    var local = qualName[1];

  		    // <x "xmlns"="http://foo">
  		    if (attribute && name === 'xmlns') {
  		      prefix = 'xmlns';
  		      local = '';
  		    }

  		    return { prefix: prefix, local: local }
  		  }

  		  function attrib (parser) {
  		    if (!parser.strict) {
  		      parser.attribName = parser.attribName[parser.looseCase]();
  		    }

  		    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
  		      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
  		      parser.attribName = parser.attribValue = '';
  		      return
  		    }

  		    if (parser.opt.xmlns) {
  		      var qn = qname(parser.attribName, true);
  		      var prefix = qn.prefix;
  		      var local = qn.local;

  		      if (prefix === 'xmlns') {
  		        // namespace binding attribute. push the binding into scope
  		        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
  		          strictFail(parser,
  		            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
  		            'Actual: ' + parser.attribValue);
  		        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
  		          strictFail(parser,
  		            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
  		            'Actual: ' + parser.attribValue);
  		        } else {
  		          var tag = parser.tag;
  		          var parent = parser.tags[parser.tags.length - 1] || parser;
  		          if (tag.ns === parent.ns) {
  		            tag.ns = Object.create(parent.ns);
  		          }
  		          tag.ns[local] = parser.attribValue;
  		        }
  		      }

  		      // defer onattribute events until all attributes have been seen
  		      // so any new bindings can take effect. preserve attribute order
  		      // so deferred events can be emitted in document order
  		      parser.attribList.push([parser.attribName, parser.attribValue]);
  		    } else {
  		      // in non-xmlns mode, we can emit the event right away
  		      parser.tag.attributes[parser.attribName] = parser.attribValue;
  		      emitNode(parser, 'onattribute', {
  		        name: parser.attribName,
  		        value: parser.attribValue
  		      });
  		    }

  		    parser.attribName = parser.attribValue = '';
  		  }

  		  function openTag (parser, selfClosing) {
  		    if (parser.opt.xmlns) {
  		      // emit namespace binding events
  		      var tag = parser.tag;

  		      // add namespace info to tag
  		      var qn = qname(parser.tagName);
  		      tag.prefix = qn.prefix;
  		      tag.local = qn.local;
  		      tag.uri = tag.ns[qn.prefix] || '';

  		      if (tag.prefix && !tag.uri) {
  		        strictFail(parser, 'Unbound namespace prefix: ' +
  		          JSON.stringify(parser.tagName));
  		        tag.uri = qn.prefix;
  		      }

  		      var parent = parser.tags[parser.tags.length - 1] || parser;
  		      if (tag.ns && parent.ns !== tag.ns) {
  		        Object.keys(tag.ns).forEach(function (p) {
  		          emitNode(parser, 'onopennamespace', {
  		            prefix: p,
  		            uri: tag.ns[p]
  		          });
  		        });
  		      }

  		      // handle deferred onattribute events
  		      // Note: do not apply default ns to attributes:
  		      //   http://www.w3.org/TR/REC-xml-names/#defaulting
  		      for (var i = 0, l = parser.attribList.length; i < l; i++) {
  		        var nv = parser.attribList[i];
  		        var name = nv[0];
  		        var value = nv[1];
  		        var qualName = qname(name, true);
  		        var prefix = qualName.prefix;
  		        var local = qualName.local;
  		        var uri = prefix === '' ? '' : (tag.ns[prefix] || '');
  		        var a = {
  		          name: name,
  		          value: value,
  		          prefix: prefix,
  		          local: local,
  		          uri: uri
  		        };

  		        // if there's any attributes with an undefined namespace,
  		        // then fail on them now.
  		        if (prefix && prefix !== 'xmlns' && !uri) {
  		          strictFail(parser, 'Unbound namespace prefix: ' +
  		            JSON.stringify(prefix));
  		          a.uri = prefix;
  		        }
  		        parser.tag.attributes[name] = a;
  		        emitNode(parser, 'onattribute', a);
  		      }
  		      parser.attribList.length = 0;
  		    }

  		    parser.tag.isSelfClosing = !!selfClosing;

  		    // process the tag
  		    parser.sawRoot = true;
  		    parser.tags.push(parser.tag);
  		    emitNode(parser, 'onopentag', parser.tag);
  		    if (!selfClosing) {
  		      // special case for <script> in non-strict mode.
  		      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
  		        parser.state = S.SCRIPT;
  		      } else {
  		        parser.state = S.TEXT;
  		      }
  		      parser.tag = null;
  		      parser.tagName = '';
  		    }
  		    parser.attribName = parser.attribValue = '';
  		    parser.attribList.length = 0;
  		  }

  		  function closeTag (parser) {
  		    if (!parser.tagName) {
  		      strictFail(parser, 'Weird empty close tag.');
  		      parser.textNode += '</>';
  		      parser.state = S.TEXT;
  		      return
  		    }

  		    if (parser.script) {
  		      if (parser.tagName !== 'script') {
  		        parser.script += '</' + parser.tagName + '>';
  		        parser.tagName = '';
  		        parser.state = S.SCRIPT;
  		        return
  		      }
  		      emitNode(parser, 'onscript', parser.script);
  		      parser.script = '';
  		    }

  		    // first make sure that the closing tag actually exists.
  		    // <a><b></c></b></a> will close everything, otherwise.
  		    var t = parser.tags.length;
  		    var tagName = parser.tagName;
  		    if (!parser.strict) {
  		      tagName = tagName[parser.looseCase]();
  		    }
  		    var closeTo = tagName;
  		    while (t--) {
  		      var close = parser.tags[t];
  		      if (close.name !== closeTo) {
  		        // fail the first time in strict mode
  		        strictFail(parser, 'Unexpected close tag');
  		      } else {
  		        break
  		      }
  		    }

  		    // didn't find it.  we already failed for strict, so just abort.
  		    if (t < 0) {
  		      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
  		      parser.textNode += '</' + parser.tagName + '>';
  		      parser.state = S.TEXT;
  		      return
  		    }
  		    parser.tagName = tagName;
  		    var s = parser.tags.length;
  		    while (s-- > t) {
  		      var tag = parser.tag = parser.tags.pop();
  		      parser.tagName = parser.tag.name;
  		      emitNode(parser, 'onclosetag', parser.tagName);

  		      var x = {};
  		      for (var i in tag.ns) {
  		        x[i] = tag.ns[i];
  		      }

  		      var parent = parser.tags[parser.tags.length - 1] || parser;
  		      if (parser.opt.xmlns && tag.ns !== parent.ns) {
  		        // remove namespace bindings introduced by tag
  		        Object.keys(tag.ns).forEach(function (p) {
  		          var n = tag.ns[p];
  		          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n });
  		        });
  		      }
  		    }
  		    if (t === 0) parser.closedRoot = true;
  		    parser.tagName = parser.attribValue = parser.attribName = '';
  		    parser.attribList.length = 0;
  		    parser.state = S.TEXT;
  		  }

  		  function parseEntity (parser) {
  		    var entity = parser.entity;
  		    var entityLC = entity.toLowerCase();
  		    var num;
  		    var numStr = '';

  		    if (parser.ENTITIES[entity]) {
  		      return parser.ENTITIES[entity]
  		    }
  		    if (parser.ENTITIES[entityLC]) {
  		      return parser.ENTITIES[entityLC]
  		    }
  		    entity = entityLC;
  		    if (entity.charAt(0) === '#') {
  		      if (entity.charAt(1) === 'x') {
  		        entity = entity.slice(2);
  		        num = parseInt(entity, 16);
  		        numStr = num.toString(16);
  		      } else {
  		        entity = entity.slice(1);
  		        num = parseInt(entity, 10);
  		        numStr = num.toString(10);
  		      }
  		    }
  		    entity = entity.replace(/^0+/, '');
  		    if (isNaN(num) || numStr.toLowerCase() !== entity) {
  		      strictFail(parser, 'Invalid character entity');
  		      return '&' + parser.entity + ';'
  		    }

  		    return String.fromCodePoint(num)
  		  }

  		  function beginWhiteSpace (parser, c) {
  		    if (c === '<') {
  		      parser.state = S.OPEN_WAKA;
  		      parser.startTagPosition = parser.position;
  		    } else if (!isWhitespace(c)) {
  		      // have to process this as a text node.
  		      // weird, but happens.
  		      strictFail(parser, 'Non-whitespace before first tag.');
  		      parser.textNode = c;
  		      parser.state = S.TEXT;
  		    }
  		  }

  		  function charAt (chunk, i) {
  		    var result = '';
  		    if (i < chunk.length) {
  		      result = chunk.charAt(i);
  		    }
  		    return result
  		  }

  		  function write (chunk) {
  		    var parser = this;
  		    if (this.error) {
  		      throw this.error
  		    }
  		    if (parser.closed) {
  		      return error(parser,
  		        'Cannot write after close. Assign an onready handler.')
  		    }
  		    if (chunk === null) {
  		      return end(parser)
  		    }
  		    if (typeof chunk === 'object') {
  		      chunk = chunk.toString();
  		    }
  		    var i = 0;
  		    var c = '';
  		    while (true) {
  		      c = charAt(chunk, i++);
  		      parser.c = c;

  		      if (!c) {
  		        break
  		      }

  		      if (parser.trackPosition) {
  		        parser.position++;
  		        if (c === '\n') {
  		          parser.line++;
  		          parser.column = 0;
  		        } else {
  		          parser.column++;
  		        }
  		      }

  		      switch (parser.state) {
  		        case S.BEGIN:
  		          parser.state = S.BEGIN_WHITESPACE;
  		          if (c === '\uFEFF') {
  		            continue
  		          }
  		          beginWhiteSpace(parser, c);
  		          continue

  		        case S.BEGIN_WHITESPACE:
  		          beginWhiteSpace(parser, c);
  		          continue

  		        case S.TEXT:
  		          if (parser.sawRoot && !parser.closedRoot) {
  		            var starti = i - 1;
  		            while (c && c !== '<' && c !== '&') {
  		              c = charAt(chunk, i++);
  		              if (c && parser.trackPosition) {
  		                parser.position++;
  		                if (c === '\n') {
  		                  parser.line++;
  		                  parser.column = 0;
  		                } else {
  		                  parser.column++;
  		                }
  		              }
  		            }
  		            parser.textNode += chunk.substring(starti, i - 1);
  		          }
  		          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
  		            parser.state = S.OPEN_WAKA;
  		            parser.startTagPosition = parser.position;
  		          } else {
  		            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
  		              strictFail(parser, 'Text data outside of root node.');
  		            }
  		            if (c === '&') {
  		              parser.state = S.TEXT_ENTITY;
  		            } else {
  		              parser.textNode += c;
  		            }
  		          }
  		          continue

  		        case S.SCRIPT:
  		          // only non-strict
  		          if (c === '<') {
  		            parser.state = S.SCRIPT_ENDING;
  		          } else {
  		            parser.script += c;
  		          }
  		          continue

  		        case S.SCRIPT_ENDING:
  		          if (c === '/') {
  		            parser.state = S.CLOSE_TAG;
  		          } else {
  		            parser.script += '<' + c;
  		            parser.state = S.SCRIPT;
  		          }
  		          continue

  		        case S.OPEN_WAKA:
  		          // either a /, ?, !, or text is coming next.
  		          if (c === '!') {
  		            parser.state = S.SGML_DECL;
  		            parser.sgmlDecl = '';
  		          } else if (isWhitespace(c)) ; else if (isMatch(nameStart, c)) {
  		            parser.state = S.OPEN_TAG;
  		            parser.tagName = c;
  		          } else if (c === '/') {
  		            parser.state = S.CLOSE_TAG;
  		            parser.tagName = '';
  		          } else if (c === '?') {
  		            parser.state = S.PROC_INST;
  		            parser.procInstName = parser.procInstBody = '';
  		          } else {
  		            strictFail(parser, 'Unencoded <');
  		            // if there was some whitespace, then add that in.
  		            if (parser.startTagPosition + 1 < parser.position) {
  		              var pad = parser.position - parser.startTagPosition;
  		              c = new Array(pad).join(' ') + c;
  		            }
  		            parser.textNode += '<' + c;
  		            parser.state = S.TEXT;
  		          }
  		          continue

  		        case S.SGML_DECL:
  		          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
  		            emitNode(parser, 'onopencdata');
  		            parser.state = S.CDATA;
  		            parser.sgmlDecl = '';
  		            parser.cdata = '';
  		          } else if (parser.sgmlDecl + c === '--') {
  		            parser.state = S.COMMENT;
  		            parser.comment = '';
  		            parser.sgmlDecl = '';
  		          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
  		            parser.state = S.DOCTYPE;
  		            if (parser.doctype || parser.sawRoot) {
  		              strictFail(parser,
  		                'Inappropriately located doctype declaration');
  		            }
  		            parser.doctype = '';
  		            parser.sgmlDecl = '';
  		          } else if (c === '>') {
  		            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
  		            parser.sgmlDecl = '';
  		            parser.state = S.TEXT;
  		          } else if (isQuote(c)) {
  		            parser.state = S.SGML_DECL_QUOTED;
  		            parser.sgmlDecl += c;
  		          } else {
  		            parser.sgmlDecl += c;
  		          }
  		          continue

  		        case S.SGML_DECL_QUOTED:
  		          if (c === parser.q) {
  		            parser.state = S.SGML_DECL;
  		            parser.q = '';
  		          }
  		          parser.sgmlDecl += c;
  		          continue

  		        case S.DOCTYPE:
  		          if (c === '>') {
  		            parser.state = S.TEXT;
  		            emitNode(parser, 'ondoctype', parser.doctype);
  		            parser.doctype = true; // just remember that we saw it.
  		          } else {
  		            parser.doctype += c;
  		            if (c === '[') {
  		              parser.state = S.DOCTYPE_DTD;
  		            } else if (isQuote(c)) {
  		              parser.state = S.DOCTYPE_QUOTED;
  		              parser.q = c;
  		            }
  		          }
  		          continue

  		        case S.DOCTYPE_QUOTED:
  		          parser.doctype += c;
  		          if (c === parser.q) {
  		            parser.q = '';
  		            parser.state = S.DOCTYPE;
  		          }
  		          continue

  		        case S.DOCTYPE_DTD:
  		          parser.doctype += c;
  		          if (c === ']') {
  		            parser.state = S.DOCTYPE;
  		          } else if (isQuote(c)) {
  		            parser.state = S.DOCTYPE_DTD_QUOTED;
  		            parser.q = c;
  		          }
  		          continue

  		        case S.DOCTYPE_DTD_QUOTED:
  		          parser.doctype += c;
  		          if (c === parser.q) {
  		            parser.state = S.DOCTYPE_DTD;
  		            parser.q = '';
  		          }
  		          continue

  		        case S.COMMENT:
  		          if (c === '-') {
  		            parser.state = S.COMMENT_ENDING;
  		          } else {
  		            parser.comment += c;
  		          }
  		          continue

  		        case S.COMMENT_ENDING:
  		          if (c === '-') {
  		            parser.state = S.COMMENT_ENDED;
  		            parser.comment = textopts(parser.opt, parser.comment);
  		            if (parser.comment) {
  		              emitNode(parser, 'oncomment', parser.comment);
  		            }
  		            parser.comment = '';
  		          } else {
  		            parser.comment += '-' + c;
  		            parser.state = S.COMMENT;
  		          }
  		          continue

  		        case S.COMMENT_ENDED:
  		          if (c !== '>') {
  		            strictFail(parser, 'Malformed comment');
  		            // allow <!-- blah -- bloo --> in non-strict mode,
  		            // which is a comment of " blah -- bloo "
  		            parser.comment += '--' + c;
  		            parser.state = S.COMMENT;
  		          } else {
  		            parser.state = S.TEXT;
  		          }
  		          continue

  		        case S.CDATA:
  		          if (c === ']') {
  		            parser.state = S.CDATA_ENDING;
  		          } else {
  		            parser.cdata += c;
  		          }
  		          continue

  		        case S.CDATA_ENDING:
  		          if (c === ']') {
  		            parser.state = S.CDATA_ENDING_2;
  		          } else {
  		            parser.cdata += ']' + c;
  		            parser.state = S.CDATA;
  		          }
  		          continue

  		        case S.CDATA_ENDING_2:
  		          if (c === '>') {
  		            if (parser.cdata) {
  		              emitNode(parser, 'oncdata', parser.cdata);
  		            }
  		            emitNode(parser, 'onclosecdata');
  		            parser.cdata = '';
  		            parser.state = S.TEXT;
  		          } else if (c === ']') {
  		            parser.cdata += ']';
  		          } else {
  		            parser.cdata += ']]' + c;
  		            parser.state = S.CDATA;
  		          }
  		          continue

  		        case S.PROC_INST:
  		          if (c === '?') {
  		            parser.state = S.PROC_INST_ENDING;
  		          } else if (isWhitespace(c)) {
  		            parser.state = S.PROC_INST_BODY;
  		          } else {
  		            parser.procInstName += c;
  		          }
  		          continue

  		        case S.PROC_INST_BODY:
  		          if (!parser.procInstBody && isWhitespace(c)) {
  		            continue
  		          } else if (c === '?') {
  		            parser.state = S.PROC_INST_ENDING;
  		          } else {
  		            parser.procInstBody += c;
  		          }
  		          continue

  		        case S.PROC_INST_ENDING:
  		          if (c === '>') {
  		            emitNode(parser, 'onprocessinginstruction', {
  		              name: parser.procInstName,
  		              body: parser.procInstBody
  		            });
  		            parser.procInstName = parser.procInstBody = '';
  		            parser.state = S.TEXT;
  		          } else {
  		            parser.procInstBody += '?' + c;
  		            parser.state = S.PROC_INST_BODY;
  		          }
  		          continue

  		        case S.OPEN_TAG:
  		          if (isMatch(nameBody, c)) {
  		            parser.tagName += c;
  		          } else {
  		            newTag(parser);
  		            if (c === '>') {
  		              openTag(parser);
  		            } else if (c === '/') {
  		              parser.state = S.OPEN_TAG_SLASH;
  		            } else {
  		              if (!isWhitespace(c)) {
  		                strictFail(parser, 'Invalid character in tag name');
  		              }
  		              parser.state = S.ATTRIB;
  		            }
  		          }
  		          continue

  		        case S.OPEN_TAG_SLASH:
  		          if (c === '>') {
  		            openTag(parser, true);
  		            closeTag(parser);
  		          } else {
  		            strictFail(parser, 'Forward-slash in opening tag not followed by >');
  		            parser.state = S.ATTRIB;
  		          }
  		          continue

  		        case S.ATTRIB:
  		          // haven't read the attribute name yet.
  		          if (isWhitespace(c)) {
  		            continue
  		          } else if (c === '>') {
  		            openTag(parser);
  		          } else if (c === '/') {
  		            parser.state = S.OPEN_TAG_SLASH;
  		          } else if (isMatch(nameStart, c)) {
  		            parser.attribName = c;
  		            parser.attribValue = '';
  		            parser.state = S.ATTRIB_NAME;
  		          } else {
  		            strictFail(parser, 'Invalid attribute name');
  		          }
  		          continue

  		        case S.ATTRIB_NAME:
  		          if (c === '=') {
  		            parser.state = S.ATTRIB_VALUE;
  		          } else if (c === '>') {
  		            strictFail(parser, 'Attribute without value');
  		            parser.attribValue = parser.attribName;
  		            attrib(parser);
  		            openTag(parser);
  		          } else if (isWhitespace(c)) {
  		            parser.state = S.ATTRIB_NAME_SAW_WHITE;
  		          } else if (isMatch(nameBody, c)) {
  		            parser.attribName += c;
  		          } else {
  		            strictFail(parser, 'Invalid attribute name');
  		          }
  		          continue

  		        case S.ATTRIB_NAME_SAW_WHITE:
  		          if (c === '=') {
  		            parser.state = S.ATTRIB_VALUE;
  		          } else if (isWhitespace(c)) {
  		            continue
  		          } else {
  		            strictFail(parser, 'Attribute without value');
  		            parser.tag.attributes[parser.attribName] = '';
  		            parser.attribValue = '';
  		            emitNode(parser, 'onattribute', {
  		              name: parser.attribName,
  		              value: ''
  		            });
  		            parser.attribName = '';
  		            if (c === '>') {
  		              openTag(parser);
  		            } else if (isMatch(nameStart, c)) {
  		              parser.attribName = c;
  		              parser.state = S.ATTRIB_NAME;
  		            } else {
  		              strictFail(parser, 'Invalid attribute name');
  		              parser.state = S.ATTRIB;
  		            }
  		          }
  		          continue

  		        case S.ATTRIB_VALUE:
  		          if (isWhitespace(c)) {
  		            continue
  		          } else if (isQuote(c)) {
  		            parser.q = c;
  		            parser.state = S.ATTRIB_VALUE_QUOTED;
  		          } else {
  		            strictFail(parser, 'Unquoted attribute value');
  		            parser.state = S.ATTRIB_VALUE_UNQUOTED;
  		            parser.attribValue = c;
  		          }
  		          continue

  		        case S.ATTRIB_VALUE_QUOTED:
  		          if (c !== parser.q) {
  		            if (c === '&') {
  		              parser.state = S.ATTRIB_VALUE_ENTITY_Q;
  		            } else {
  		              parser.attribValue += c;
  		            }
  		            continue
  		          }
  		          attrib(parser);
  		          parser.q = '';
  		          parser.state = S.ATTRIB_VALUE_CLOSED;
  		          continue

  		        case S.ATTRIB_VALUE_CLOSED:
  		          if (isWhitespace(c)) {
  		            parser.state = S.ATTRIB;
  		          } else if (c === '>') {
  		            openTag(parser);
  		          } else if (c === '/') {
  		            parser.state = S.OPEN_TAG_SLASH;
  		          } else if (isMatch(nameStart, c)) {
  		            strictFail(parser, 'No whitespace between attributes');
  		            parser.attribName = c;
  		            parser.attribValue = '';
  		            parser.state = S.ATTRIB_NAME;
  		          } else {
  		            strictFail(parser, 'Invalid attribute name');
  		          }
  		          continue

  		        case S.ATTRIB_VALUE_UNQUOTED:
  		          if (!isAttribEnd(c)) {
  		            if (c === '&') {
  		              parser.state = S.ATTRIB_VALUE_ENTITY_U;
  		            } else {
  		              parser.attribValue += c;
  		            }
  		            continue
  		          }
  		          attrib(parser);
  		          if (c === '>') {
  		            openTag(parser);
  		          } else {
  		            parser.state = S.ATTRIB;
  		          }
  		          continue

  		        case S.CLOSE_TAG:
  		          if (!parser.tagName) {
  		            if (isWhitespace(c)) {
  		              continue
  		            } else if (notMatch(nameStart, c)) {
  		              if (parser.script) {
  		                parser.script += '</' + c;
  		                parser.state = S.SCRIPT;
  		              } else {
  		                strictFail(parser, 'Invalid tagname in closing tag.');
  		              }
  		            } else {
  		              parser.tagName = c;
  		            }
  		          } else if (c === '>') {
  		            closeTag(parser);
  		          } else if (isMatch(nameBody, c)) {
  		            parser.tagName += c;
  		          } else if (parser.script) {
  		            parser.script += '</' + parser.tagName;
  		            parser.tagName = '';
  		            parser.state = S.SCRIPT;
  		          } else {
  		            if (!isWhitespace(c)) {
  		              strictFail(parser, 'Invalid tagname in closing tag');
  		            }
  		            parser.state = S.CLOSE_TAG_SAW_WHITE;
  		          }
  		          continue

  		        case S.CLOSE_TAG_SAW_WHITE:
  		          if (isWhitespace(c)) {
  		            continue
  		          }
  		          if (c === '>') {
  		            closeTag(parser);
  		          } else {
  		            strictFail(parser, 'Invalid characters in closing tag');
  		          }
  		          continue

  		        case S.TEXT_ENTITY:
  		        case S.ATTRIB_VALUE_ENTITY_Q:
  		        case S.ATTRIB_VALUE_ENTITY_U:
  		          var returnState;
  		          var buffer;
  		          switch (parser.state) {
  		            case S.TEXT_ENTITY:
  		              returnState = S.TEXT;
  		              buffer = 'textNode';
  		              break

  		            case S.ATTRIB_VALUE_ENTITY_Q:
  		              returnState = S.ATTRIB_VALUE_QUOTED;
  		              buffer = 'attribValue';
  		              break

  		            case S.ATTRIB_VALUE_ENTITY_U:
  		              returnState = S.ATTRIB_VALUE_UNQUOTED;
  		              buffer = 'attribValue';
  		              break
  		          }

  		          if (c === ';') {
  		            parser[buffer] += parseEntity(parser);
  		            parser.entity = '';
  		            parser.state = returnState;
  		          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
  		            parser.entity += c;
  		          } else {
  		            strictFail(parser, 'Invalid character in entity name');
  		            parser[buffer] += '&' + parser.entity + c;
  		            parser.entity = '';
  		            parser.state = returnState;
  		          }

  		          continue

  		        default:
  		          throw new Error(parser, 'Unknown state: ' + parser.state)
  		      }
  		    } // while

  		    if (parser.position >= parser.bufferCheckPosition) {
  		      checkBufferLength(parser);
  		    }
  		    return parser
  		  }

  		  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  		  /* istanbul ignore next */
  		  if (!String.fromCodePoint) {
  		    (function () {
  		      var stringFromCharCode = String.fromCharCode;
  		      var floor = Math.floor;
  		      var fromCodePoint = function () {
  		        var MAX_SIZE = 0x4000;
  		        var codeUnits = [];
  		        var highSurrogate;
  		        var lowSurrogate;
  		        var index = -1;
  		        var length = arguments.length;
  		        if (!length) {
  		          return ''
  		        }
  		        var result = '';
  		        while (++index < length) {
  		          var codePoint = Number(arguments[index]);
  		          if (
  		            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
  		            codePoint < 0 || // not a valid Unicode code point
  		            codePoint > 0x10FFFF || // not a valid Unicode code point
  		            floor(codePoint) !== codePoint // not an integer
  		          ) {
  		            throw RangeError('Invalid code point: ' + codePoint)
  		          }
  		          if (codePoint <= 0xFFFF) { // BMP code point
  		            codeUnits.push(codePoint);
  		          } else { // Astral code point; split in surrogate halves
  		            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
  		            codePoint -= 0x10000;
  		            highSurrogate = (codePoint >> 10) + 0xD800;
  		            lowSurrogate = (codePoint % 0x400) + 0xDC00;
  		            codeUnits.push(highSurrogate, lowSurrogate);
  		          }
  		          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
  		            result += stringFromCharCode.apply(null, codeUnits);
  		            codeUnits.length = 0;
  		          }
  		        }
  		        return result
  		      };
  		      /* istanbul ignore next */
  		      if (Object.defineProperty) {
  		        Object.defineProperty(String, 'fromCodePoint', {
  		          value: fromCodePoint,
  		          configurable: true,
  		          writable: true
  		        });
  		      } else {
  		        String.fromCodePoint = fromCodePoint;
  		      }
  		    }());
  		  }
  		})(exports); 
  	} (sax));
  	return sax;
  }

  var require$$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_events);

  var bom = {};

  var hasRequiredBom;

  function requireBom () {
  	if (hasRequiredBom) return bom;
  	hasRequiredBom = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  bom.stripBOM = function(str) {
  	    if (str[0] === '\uFEFF') {
  	      return str.substring(1);
  	    } else {
  	      return str;
  	    }
  	  };

  	}).call(bom);
  	return bom;
  }

  var processors = {};

  var hasRequiredProcessors;

  function requireProcessors () {
  	if (hasRequiredProcessors) return processors;
  	hasRequiredProcessors = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var prefixMatch;

  	  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  	  processors.normalize = function(str) {
  	    return str.toLowerCase();
  	  };

  	  processors.firstCharLowerCase = function(str) {
  	    return str.charAt(0).toLowerCase() + str.slice(1);
  	  };

  	  processors.stripPrefix = function(str) {
  	    return str.replace(prefixMatch, '');
  	  };

  	  processors.parseNumbers = function(str) {
  	    if (!isNaN(str)) {
  	      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
  	    }
  	    return str;
  	  };

  	  processors.parseBooleans = function(str) {
  	    if (/^(?:true|false)$/i.test(str)) {
  	      str = str.toLowerCase() === 'true';
  	    }
  	    return str;
  	  };

  	}).call(processors);
  	return processors;
  }

  /*
  MIT Licence
  Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola
  https://github.com/YuzuJS/setImmediate/blob/f1ccbfdf09cb93aadf77c4aa749ea554503b9234/LICENSE.txt
  */

  var nextHandle = 1; // Spec says greater than zero
  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global$1.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    }
    // Copy function arguments
    var args = new Array(arguments.length - 1);
    for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i + 1];
    }
    // Store and register the task
    var task = { callback: callback, args: args };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
      delete tasksByHandle[handle];
  }

  function run(task) {
      var callback = task.callback;
      var args = task.args;
      switch (args.length) {
      case 0:
          callback();
          break;
      case 1:
          callback(args[0]);
          break;
      case 2:
          callback(args[0], args[1]);
          break;
      case 3:
          callback(args[0], args[1], args[2]);
          break;
      default:
          callback.apply(undefined, args);
          break;
      }
  }

  function runIfPresent(handle) {
      // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
      // So if we're currently running a task, we'll need to delay this invocation.
      if (currentlyRunningATask) {
          // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
          // "too much recursion" error.
          setTimeout(runIfPresent, 0, handle);
      } else {
          var task = tasksByHandle[handle];
          if (task) {
              currentlyRunningATask = true;
              try {
                  run(task);
              } finally {
                  clearImmediate(handle);
                  currentlyRunningATask = false;
              }
          }
      }
  }

  function installNextTickImplementation() {
      registerImmediate = function(handle) {
          browser$1.nextTick(function () { runIfPresent(handle); });
      };
  }

  function canUsePostMessage() {
      // The test against `importScripts` prevents this implementation from being installed inside a web worker,
      // where `global.postMessage` means something completely different and can't be used for this purpose.
      if (global$1.postMessage && !global$1.importScripts) {
          var postMessageIsAsynchronous = true;
          var oldOnMessage = global$1.onmessage;
          global$1.onmessage = function() {
              postMessageIsAsynchronous = false;
          };
          global$1.postMessage("", "*");
          global$1.onmessage = oldOnMessage;
          return postMessageIsAsynchronous;
      }
  }

  function installPostMessageImplementation() {
      // Installs an event handler on `global` for the `message` event: see
      // * https://developer.mozilla.org/en/DOM/window.postMessage
      // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

      var messagePrefix = "setImmediate$" + Math.random() + "$";
      var onGlobalMessage = function(event) {
          if (event.source === global$1 &&
              typeof event.data === "string" &&
              event.data.indexOf(messagePrefix) === 0) {
              runIfPresent(+event.data.slice(messagePrefix.length));
          }
      };

      if (global$1.addEventListener) {
          global$1.addEventListener("message", onGlobalMessage, false);
      } else {
          global$1.attachEvent("onmessage", onGlobalMessage);
      }

      registerImmediate = function(handle) {
          global$1.postMessage(messagePrefix + handle, "*");
      };
  }

  function installMessageChannelImplementation() {
      var channel = new MessageChannel();
      channel.port1.onmessage = function(event) {
          var handle = event.data;
          runIfPresent(handle);
      };

      registerImmediate = function(handle) {
          channel.port2.postMessage(handle);
      };
  }

  function installReadyStateChangeImplementation() {
      var html = doc.documentElement;
      registerImmediate = function(handle) {
          // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
          // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
          var script = doc.createElement("script");
          script.onreadystatechange = function () {
              runIfPresent(handle);
              script.onreadystatechange = null;
              html.removeChild(script);
              script = null;
          };
          html.appendChild(script);
      };
  }

  function installSetTimeoutImplementation() {
      registerImmediate = function(handle) {
          setTimeout(runIfPresent, 0, handle);
      };
  }

  // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global$1);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global$1;

  // Don't get fooled by e.g. browserify environments.
  if ({}.toString.call(global$1.process) === "[object process]") {
      // For Node.js before 0.9
      installNextTickImplementation();

  } else if (canUsePostMessage()) {
      // For non-IE10 modern browsers
      installPostMessageImplementation();

  } else if (global$1.MessageChannel) {
      // For web workers, where supported
      installMessageChannelImplementation();

  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
      // For IE 6–8
      installReadyStateChangeImplementation();

  } else {
      // For older browsers
      installSetTimeoutImplementation();
  }

  // DOM APIs, for completeness
  var apply = Function.prototype.apply;

  function clearInterval$1(timeout) {
    if (typeof timeout === 'number' && typeof global$1.clearInterval === 'function') {
      global$1.clearInterval(timeout);
    } else {
      clearFn(timeout);
    }
  }
  function clearTimeout$1(timeout) {
    if (typeof timeout === 'number' && typeof global$1.clearTimeout === 'function') {
      global$1.clearTimeout(timeout);
    } else {
      clearFn(timeout);
    }
  }
  function clearFn(timeout) {
    if (timeout && typeof timeout.close === 'function') {
      timeout.close();
    }
  }
  function setTimeout$1() {
    return new Timeout(apply.call(global$1.setTimeout, window, arguments));
  }
  function setInterval$1() {
    return new Timeout(apply.call(global$1.setInterval, window, arguments));
  }

  function Timeout(id) {
    this._id = id;
  }
  Timeout.prototype.unref = Timeout.prototype.ref = function() {};
  Timeout.prototype.close = function() {
    clearFn(this._id);
  };

  // Does not start the time, just sets up the members needed.
  function enroll(item, msecs) {
    clearTimeout$1(item._idleTimeoutId);
    item._idleTimeout = msecs;
  }

  function unenroll(item) {
    clearTimeout$1(item._idleTimeoutId);
    item._idleTimeout = -1;
  }
  var _unrefActive = active;
  function active(item) {
    clearTimeout$1(item._idleTimeoutId);

    var msecs = item._idleTimeout;
    if (msecs >= 0) {
      item._idleTimeoutId = setTimeout$1(function onTimeout() {
        if (item._onTimeout)
          item._onTimeout();
      }, msecs);
    }
  }

  var _polyfillNode_timers = {
    setImmediate: setImmediate,
    clearImmediate: clearImmediate,
    setTimeout: setTimeout$1,
    clearTimeout: clearTimeout$1,
    setInterval: setInterval$1,
    clearInterval: clearInterval$1,
    active: active,
    unenroll: unenroll,
    _unrefActive: _unrefActive,
    enroll: enroll
  };

  var _polyfillNode_timers$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setImmediate: setImmediate,
    clearImmediate: clearImmediate,
    clearInterval: clearInterval$1,
    clearTimeout: clearTimeout$1,
    setTimeout: setTimeout$1,
    setInterval: setInterval$1,
    enroll: enroll,
    unenroll: unenroll,
    _unrefActive: _unrefActive,
    active: active,
    'default': _polyfillNode_timers
  });

  var require$$4 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_timers$1);

  var hasRequiredParser;

  function requireParser () {
  	if (hasRequiredParser) return parser;
  	hasRequiredParser = 1;
  	(function (exports) {
  		// Generated by CoffeeScript 1.12.7
  		(function() {
  		  var bom, defaults, defineProperty, events, isEmpty, processItem, processors, sax, setImmediate,
  		    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  		    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  		    hasProp = {}.hasOwnProperty;

  		  sax = requireSax();

  		  events = require$$1;

  		  bom = requireBom();

  		  processors = requireProcessors();

  		  setImmediate = require$$4.setImmediate;

  		  defaults = requireDefaults().defaults;

  		  isEmpty = function(thing) {
  		    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  		  };

  		  processItem = function(processors, item, key) {
  		    var i, len, process;
  		    for (i = 0, len = processors.length; i < len; i++) {
  		      process = processors[i];
  		      item = process(item, key);
  		    }
  		    return item;
  		  };

  		  defineProperty = function(obj, key, value) {
  		    var descriptor;
  		    descriptor = Object.create(null);
  		    descriptor.value = value;
  		    descriptor.writable = true;
  		    descriptor.enumerable = true;
  		    descriptor.configurable = true;
  		    return Object.defineProperty(obj, key, descriptor);
  		  };

  		  exports.Parser = (function(superClass) {
  		    extend(Parser, superClass);

  		    function Parser(opts) {
  		      this.parseStringPromise = bind(this.parseStringPromise, this);
  		      this.parseString = bind(this.parseString, this);
  		      this.reset = bind(this.reset, this);
  		      this.assignOrPush = bind(this.assignOrPush, this);
  		      this.processAsync = bind(this.processAsync, this);
  		      var key, ref, value;
  		      if (!(this instanceof exports.Parser)) {
  		        return new exports.Parser(opts);
  		      }
  		      this.options = {};
  		      ref = defaults["0.2"];
  		      for (key in ref) {
  		        if (!hasProp.call(ref, key)) continue;
  		        value = ref[key];
  		        this.options[key] = value;
  		      }
  		      for (key in opts) {
  		        if (!hasProp.call(opts, key)) continue;
  		        value = opts[key];
  		        this.options[key] = value;
  		      }
  		      if (this.options.xmlns) {
  		        this.options.xmlnskey = this.options.attrkey + "ns";
  		      }
  		      if (this.options.normalizeTags) {
  		        if (!this.options.tagNameProcessors) {
  		          this.options.tagNameProcessors = [];
  		        }
  		        this.options.tagNameProcessors.unshift(processors.normalize);
  		      }
  		      this.reset();
  		    }

  		    Parser.prototype.processAsync = function() {
  		      var chunk, err;
  		      try {
  		        if (this.remaining.length <= this.options.chunkSize) {
  		          chunk = this.remaining;
  		          this.remaining = '';
  		          this.saxParser = this.saxParser.write(chunk);
  		          return this.saxParser.close();
  		        } else {
  		          chunk = this.remaining.substr(0, this.options.chunkSize);
  		          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
  		          this.saxParser = this.saxParser.write(chunk);
  		          return setImmediate(this.processAsync);
  		        }
  		      } catch (error1) {
  		        err = error1;
  		        if (!this.saxParser.errThrown) {
  		          this.saxParser.errThrown = true;
  		          return this.emit(err);
  		        }
  		      }
  		    };

  		    Parser.prototype.assignOrPush = function(obj, key, newValue) {
  		      if (!(key in obj)) {
  		        if (!this.options.explicitArray) {
  		          return defineProperty(obj, key, newValue);
  		        } else {
  		          return defineProperty(obj, key, [newValue]);
  		        }
  		      } else {
  		        if (!(obj[key] instanceof Array)) {
  		          defineProperty(obj, key, [obj[key]]);
  		        }
  		        return obj[key].push(newValue);
  		      }
  		    };

  		    Parser.prototype.reset = function() {
  		      var attrkey, charkey, ontext, stack;
  		      this.removeAllListeners();
  		      this.saxParser = sax.parser(this.options.strict, {
  		        trim: false,
  		        normalize: false,
  		        xmlns: this.options.xmlns
  		      });
  		      this.saxParser.errThrown = false;
  		      this.saxParser.onerror = (function(_this) {
  		        return function(error) {
  		          _this.saxParser.resume();
  		          if (!_this.saxParser.errThrown) {
  		            _this.saxParser.errThrown = true;
  		            return _this.emit("error", error);
  		          }
  		        };
  		      })(this);
  		      this.saxParser.onend = (function(_this) {
  		        return function() {
  		          if (!_this.saxParser.ended) {
  		            _this.saxParser.ended = true;
  		            return _this.emit("end", _this.resultObject);
  		          }
  		        };
  		      })(this);
  		      this.saxParser.ended = false;
  		      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
  		      this.resultObject = null;
  		      stack = [];
  		      attrkey = this.options.attrkey;
  		      charkey = this.options.charkey;
  		      this.saxParser.onopentag = (function(_this) {
  		        return function(node) {
  		          var key, newValue, obj, processedKey, ref;
  		          obj = {};
  		          obj[charkey] = "";
  		          if (!_this.options.ignoreAttrs) {
  		            ref = node.attributes;
  		            for (key in ref) {
  		              if (!hasProp.call(ref, key)) continue;
  		              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
  		                obj[attrkey] = {};
  		              }
  		              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
  		              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
  		              if (_this.options.mergeAttrs) {
  		                _this.assignOrPush(obj, processedKey, newValue);
  		              } else {
  		                defineProperty(obj[attrkey], processedKey, newValue);
  		              }
  		            }
  		          }
  		          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
  		          if (_this.options.xmlns) {
  		            obj[_this.options.xmlnskey] = {
  		              uri: node.uri,
  		              local: node.local
  		            };
  		          }
  		          return stack.push(obj);
  		        };
  		      })(this);
  		      this.saxParser.onclosetag = (function(_this) {
  		        return function() {
  		          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
  		          obj = stack.pop();
  		          nodeName = obj["#name"];
  		          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
  		            delete obj["#name"];
  		          }
  		          if (obj.cdata === true) {
  		            cdata = obj.cdata;
  		            delete obj.cdata;
  		          }
  		          s = stack[stack.length - 1];
  		          if (obj[charkey].match(/^\s*$/) && !cdata) {
  		            emptyStr = obj[charkey];
  		            delete obj[charkey];
  		          } else {
  		            if (_this.options.trim) {
  		              obj[charkey] = obj[charkey].trim();
  		            }
  		            if (_this.options.normalize) {
  		              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
  		            }
  		            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
  		            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
  		              obj = obj[charkey];
  		            }
  		          }
  		          if (isEmpty(obj)) {
  		            if (typeof _this.options.emptyTag === 'function') {
  		              obj = _this.options.emptyTag();
  		            } else {
  		              obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
  		            }
  		          }
  		          if (_this.options.validator != null) {
  		            xpath = "/" + ((function() {
  		              var i, len, results;
  		              results = [];
  		              for (i = 0, len = stack.length; i < len; i++) {
  		                node = stack[i];
  		                results.push(node["#name"]);
  		              }
  		              return results;
  		            })()).concat(nodeName).join("/");
  		            (function() {
  		              var err;
  		              try {
  		                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
  		              } catch (error1) {
  		                err = error1;
  		                return _this.emit("error", err);
  		              }
  		            })();
  		          }
  		          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
  		            if (!_this.options.preserveChildrenOrder) {
  		              node = {};
  		              if (_this.options.attrkey in obj) {
  		                node[_this.options.attrkey] = obj[_this.options.attrkey];
  		                delete obj[_this.options.attrkey];
  		              }
  		              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
  		                node[_this.options.charkey] = obj[_this.options.charkey];
  		                delete obj[_this.options.charkey];
  		              }
  		              if (Object.getOwnPropertyNames(obj).length > 0) {
  		                node[_this.options.childkey] = obj;
  		              }
  		              obj = node;
  		            } else if (s) {
  		              s[_this.options.childkey] = s[_this.options.childkey] || [];
  		              objClone = {};
  		              for (key in obj) {
  		                if (!hasProp.call(obj, key)) continue;
  		                defineProperty(objClone, key, obj[key]);
  		              }
  		              s[_this.options.childkey].push(objClone);
  		              delete obj["#name"];
  		              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
  		                obj = obj[charkey];
  		              }
  		            }
  		          }
  		          if (stack.length > 0) {
  		            return _this.assignOrPush(s, nodeName, obj);
  		          } else {
  		            if (_this.options.explicitRoot) {
  		              old = obj;
  		              obj = {};
  		              defineProperty(obj, nodeName, old);
  		            }
  		            _this.resultObject = obj;
  		            _this.saxParser.ended = true;
  		            return _this.emit("end", _this.resultObject);
  		          }
  		        };
  		      })(this);
  		      ontext = (function(_this) {
  		        return function(text) {
  		          var charChild, s;
  		          s = stack[stack.length - 1];
  		          if (s) {
  		            s[charkey] += text;
  		            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
  		              s[_this.options.childkey] = s[_this.options.childkey] || [];
  		              charChild = {
  		                '#name': '__text__'
  		              };
  		              charChild[charkey] = text;
  		              if (_this.options.normalize) {
  		                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
  		              }
  		              s[_this.options.childkey].push(charChild);
  		            }
  		            return s;
  		          }
  		        };
  		      })(this);
  		      this.saxParser.ontext = ontext;
  		      return this.saxParser.oncdata = (function(_this) {
  		        return function(text) {
  		          var s;
  		          s = ontext(text);
  		          if (s) {
  		            return s.cdata = true;
  		          }
  		        };
  		      })();
  		    };

  		    Parser.prototype.parseString = function(str, cb) {
  		      var err;
  		      if ((cb != null) && typeof cb === "function") {
  		        this.on("end", function(result) {
  		          this.reset();
  		          return cb(null, result);
  		        });
  		        this.on("error", function(err) {
  		          this.reset();
  		          return cb(err);
  		        });
  		      }
  		      try {
  		        str = str.toString();
  		        if (str.trim() === '') {
  		          this.emit("end", null);
  		          return true;
  		        }
  		        str = bom.stripBOM(str);
  		        if (this.options.async) {
  		          this.remaining = str;
  		          setImmediate(this.processAsync);
  		          return this.saxParser;
  		        }
  		        return this.saxParser.write(str).close();
  		      } catch (error1) {
  		        err = error1;
  		        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
  		          this.emit('error', err);
  		          return this.saxParser.errThrown = true;
  		        } else if (this.saxParser.ended) {
  		          throw err;
  		        }
  		      }
  		    };

  		    Parser.prototype.parseStringPromise = function(str) {
  		      return new Promise((function(_this) {
  		        return function(resolve, reject) {
  		          return _this.parseString(str, function(err, value) {
  		            if (err) {
  		              return reject(err);
  		            } else {
  		              return resolve(value);
  		            }
  		          });
  		        };
  		      })(this));
  		    };

  		    return Parser;

  		  })(events);

  		  exports.parseString = function(str, a, b) {
  		    var cb, options, parser;
  		    if (b != null) {
  		      if (typeof b === 'function') {
  		        cb = b;
  		      }
  		      if (typeof a === 'object') {
  		        options = a;
  		      }
  		    } else {
  		      if (typeof a === 'function') {
  		        cb = a;
  		      }
  		      options = {};
  		    }
  		    parser = new exports.Parser(options);
  		    return parser.parseString(str, cb);
  		  };

  		  exports.parseStringPromise = function(str, a) {
  		    var options, parser;
  		    if (typeof a === 'object') {
  		      options = a;
  		    }
  		    parser = new exports.Parser(options);
  		    return parser.parseStringPromise(str);
  		  };

  		}).call(parser); 
  	} (parser));
  	return parser;
  }

  var hasRequiredXml2js;

  function requireXml2js () {
  	if (hasRequiredXml2js) return xml2js;
  	hasRequiredXml2js = 1;
  	// Generated by CoffeeScript 1.12.7
  	(function() {
  	  var builder, defaults, parser, processors,
  	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  	    hasProp = {}.hasOwnProperty;

  	  defaults = requireDefaults();

  	  builder = requireBuilder();

  	  parser = requireParser();

  	  processors = requireProcessors();

  	  xml2js.defaults = defaults.defaults;

  	  xml2js.processors = processors;

  	  xml2js.ValidationError = (function(superClass) {
  	    extend(ValidationError, superClass);

  	    function ValidationError(message) {
  	      this.message = message;
  	    }

  	    return ValidationError;

  	  })(Error);

  	  xml2js.Builder = builder.Builder;

  	  xml2js.Parser = parser.Parser;

  	  xml2js.parseString = parser.parseString;

  	  xml2js.parseStringPromise = parser.parseStringPromise;

  	}).call(xml2js);
  	return xml2js;
  }

  var xml2jsExports = requireXml2js();

  var nexml_parser = function(xml_string, options) {
    var trees;
    xml2jsExports.parseString(xml_string, function(error, xml) {
      trees = xml["nex:nexml"].trees[0].tree.map(function(nexml_tree) {
        var node_list = nexml_tree.node.map(d => d.$),
          node_hash = node_list.reduce(function(a, b) {
            b.edges = [];
            b.name = b.id;
            a[b.id] = b;
            return a;
          }, {}),
          roots = node_list.filter(d => d.root),
          root_id = roots > 0 ? roots[0].id : node_list[0].id;
        node_hash[root_id].name = "root";

        nexml_tree.edge.map(d => d.$).forEach(function(edge) {
          node_hash[edge.source].edges.push(edge);
        });

        function parseNexml(node, index) {
          if (node.edges) {
            var targets = ___namespace.pluck(node.edges, "target");
            node.children = ___namespace.values(___namespace.pick(node_hash, targets));
            node.children.forEach(function(child, i) {
              child.attribute = node.edges[i].length || "";
            });
            node.children.forEach(parseNexml);
            node.annotation = "";
          }
        }

        parseNexml(node_hash[root_id]);
        return node_hash[root_id];
      });
    });
    return trees;
  };

  // These methods are part of the Phylotree object

  function graftANode(graftAt, newChild, newParent, lengths) {

    let nodes = this.nodes.descendants();

    if (graftAt.parent) {

      let nodeIndex = nodes.indexOf(graftAt);

      if (nodeIndex >= 0) {

        let parentIndex = graftAt.parent.children.indexOf(graftAt);

        let newSplit = {
            name: newParent,
            parent: graftAt.parent,
            attribute: lengths ? lengths[2] : null,
            original_child_order: graftAt["original_child_order"]
          },
          newNode = {
            name: newChild,
            parent: newSplit,
            attribute: lengths ? lengths[1] : null,
            original_child_order: 2
          };

        newSplit["children"] = [graftAt, newNode];
        graftAt["parent"].children[parentIndex] = newSplit;
        graftAt.parent = newSplit;
        graftAt["attribute"] = lengths ? lengths[0] : null;
        graftAt["original_child_order"] = 1;
      }
    }

    return this;

  }

  function addChild$1(parent, child) {

    if(parent.children) {
      parent.children.push(child);
    } else {
      parent["children"] = [child];
    }

    return parent;

  }

  function createNode(name, lengths) {

    return {
      data: {
        name: name,
        attribute: lengths ? lengths[1] : null
      },
      parent: '',
    };

  }

  /**
   * Delete a given node.
   *
   * @param {Node} The node to be deleted, or the index of such a node.
   * @returns The current ``phylotree``.
   */
  function deleteANode(index) {
    let nodes = this.nodes.descendants();

    if (typeof index != "number") {
      return this.deleteANode(nodes.indexOf(index));
    }

    if (index > 0 && index < nodes.length) {
      let node = nodes[index];

      if (node.parent) {
        // can only delete nodes that are not the root
        let delete_me_idx = node.parent.children.indexOf(node);

        if (delete_me_idx >= 0) {
          nodes.splice(index, 1);

          if (node.children) {
            node.children.forEach(function(d) {
              d["original_child_order"] = node.parent.children.length;
              node.parent.children.push(d);
              d.parent = node.parent;
            });
          }

          if (node.parent.children.length > 2) {
            node.parent.children.splice(delete_me_idx, 1);
          } else {
            if (node.parent.parent) {
              node.parent.parent.children[
                node.parent.parent.children.indexOf(node.parent)
              ] =
                node.parent.children[1 - delete_me_idx];
              node.parent.children[1 - delete_me_idx].parent = node.parent.parent;
              nodes.splice(nodes.indexOf(node.parent), 1);
            } else {
              nodes.splice(0, 1);
              nodes.parent = null;
              delete nodes.data["attribute"];
              delete nodes.data["annotation"];
              delete nodes.data["original_child_order"];
              nodes.name = "root";
              nodes.data.name = "root";
            }
          }
        }
      }
    }

    return this;
  }

  /**
   * Get the tips of the tree
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getTips() {
    // get all nodes that have no nodes
    return ___namespace.filter(this.nodes.descendants(), n => {
      return !___namespace.has(n, "children");
    });
  }

  /**
   * Get the internal nodes of the tree
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getInternals() {
    // get all nodes that have no nodes
    return ___namespace.filter(this.nodes.descendants(), n => {
      return ___namespace.has(n, "children");
    });
  }


  /**
   * Get the root node.
   *
   * @returns the current root node of the ``phylotree``.
   */
  function getRootNode() {
    return this.nodes;
  }

  /**
   * Get an array of all nodes.
   * @returns {Array} Nodes in the current ``phylotree``.
   */
  function getNodes() {
    return this.nodes;
  }

  /**
   * Get a node by name.
   *
   * @param {String} name Name of the desired node.
   * @returns {Node} Desired node.
   */
  function getNodeByName(name) {
    return ___namespace.filter(this.nodes.descendants(), d => {
      return d.data.name == name;
    })[0];
  }

  /**
   * Add attributes to nodes. New attributes will be placed in the
   * ``annotations`` key of any nodes that are matched.
   *
   * @param {Object} attributes An object whose keys are the names of nodes
   * to modify, and whose values are the new attributes to add.
   */
  function assignAttributes$1(attributes) {
    //return nodes;
    // add annotations to each matching node
    ___namespace.each(this.nodes.descendants(), function(d) {
      if (d.data && (d.data.name in attributes)) {
        d["annotations"] = attributes[d.data.name];
      }
    });
  }

  /**
   * Determine if a given node is a leaf node.
   *
   * @param {Node} A node in a tree.
   * @returns {Bool} Whether or not the node is a leaf node.
   */
  function isLeafNode(node) {
    return !___namespace.has(node, "children")
  }

  /**
   * Update a given key name in each node.
   *
   * @param {String} old_key The old key name.
   * @param {String} new_key The new key name.
   * @returns The current ``this``.
   */
  function updateKeyName(old_key, new_key) {
    this.nodes.each(function(n) {
      if (old_key in n) {
        if (new_key) {
          n[new_key] = n[old_key];
        }
        delete n[old_key];
      }
    });

    return this;
  }

  function clearInternalNodes(respect) {
    if (!respect) {
      this.nodes.each(d => {
        if (!isLeafNode(d)) {

          // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
          d[this.selection_attribute_name] = false;

          if(!d.data.traits) {
            d.data.traits = {};
          }
          d.data.traits[this.selection_attribute_name] = d[this.selection_attribute_name];

        }
      });
    }
  }

  /**
   * Select all descendents of a given node, with options for selecting
   * terminal/internal nodes.
   *
   * @param {Node} node The node whose descendents should be selected.
   * @param {Boolean} terminal Whether to include terminal nodes.
   * @param {Boolean} internal Whther to include internal nodes.
   * @returns {Array} An array of selected nodes.
   */
  function selectAllDescendants$1(node, terminal, internal) {

    let selection = [];

    function sel(d) {
      if (isLeafNode(d)) {
        if (terminal) {
          if (d != node) selection.push(d);
        }
      } else {
        if (internal) {
          if (d != node) selection.push(d);
        }
        d.children.forEach(sel);
      }
    }

    sel(node);
    return selection;
  }

  var node_operations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    graftANode: graftANode,
    addChild: addChild$1,
    createNode: createNode,
    deleteANode: deleteANode,
    getTips: getTips,
    getInternals: getInternals,
    getRootNode: getRootNode,
    getNodes: getNodes,
    getNodeByName: getNodeByName,
    assignAttributes: assignAttributes$1,
    isLeafNode: isLeafNode,
    updateKeyName: updateKeyName,
    clearInternalNodes: clearInternalNodes,
    selectAllDescendants: selectAllDescendants$1
  });

  /**
   * Parses a Newick string into an equivalent JSON representation that is
   * suitable for consumption by ``hierarchy``.
   *
   * Optionally accepts bootstrap values. Currently supports Newick strings with or without branch lengths,
   * as well as tagged trees such as
   *  ``(a,(b{TAG},(c{TAG},d{ANOTHERTAG})))``
   *
   * @param {String} nwk_str - A string representing a phylogenetic tree in Newick format.
   * @param {Object} bootstrap_values.
   * @returns {Object} An object with keys ``json`` and ``error``.
   */

  function newickParser(nwk_str, options={}) {

    const int_or_float = /^-?\d+(\.\d+)?$/;
    let left_delimiter = options.left_delimiter ||  '{',
      right_delimiter = options.right_delimiter ||  '}';
    let clade_stack = [];

    function addNewTreeLevel() {
      let new_level = {
        name: null
      };

      let the_parent = clade_stack[clade_stack.length - 1];

      if (!("children" in the_parent)) {
        the_parent["children"] = [];
      }

      clade_stack.push(new_level);

      the_parent["children"].push(clade_stack[clade_stack.length - 1]);

      clade_stack[clade_stack.length - 1]["original_child_order"] =
        the_parent["children"].length;
    }

    function finishNodeDefinition() {

      let this_node = clade_stack.pop();

      this_node["name"] = current_node_name;

      if ("children" in this_node) {
        this_node["bootstrap_values"] = current_node_name;
      } else {
        this_node["name"] = current_node_name;
      }

      this_node["attribute"] = current_node_attribute;
      if(left_delimiter == "[" && current_node_annotation.includes("&&NHX")) {
        current_node_annotation
          .split(':')
          .slice(1)
          .forEach(annotation => {
            const [key, value] = annotation.split('=');
            this_node[key] = int_or_float.test(value) ? +value : value;
          });
      } else {
        this_node["annotation"] = current_node_annotation;
      }

      current_node_name = "";
      current_node_attribute = "";
      current_node_annotation = "";
    }

    function generateError(location) {
      return {
        json: null,
        error:
          "Unexpected '" +
          nwk_str[location] +
          "' in '" +
          nwk_str.substring(location - 20, location + 1) +
          "[ERROR HERE]" +
          nwk_str.substring(location + 1, location + 20) +
          "'"
      };
    }

    let automaton_state = 0;
    let current_node_name = "";
    let current_node_attribute = "";
    let current_node_annotation = "";
    let quote_delimiter = null;

    let name_quotes = {
      "'": 1,
      '"': 1
    };

    let tree_json = {
      name: "root"
    };

    clade_stack.push(tree_json);

    var space = /\s/;

    for (var char_index = 0; char_index < nwk_str.length; char_index++) {
      try {
        var current_char = nwk_str[char_index];
        switch (automaton_state) {
          case 0: {
            // look for the first opening parenthesis
            if (current_char == "(") {
              addNewTreeLevel();
              automaton_state = 1; // expecting node name
            }
            break;
          }
          case 1: // name
          case 3: {
            // branch length
            // reading name
            if (current_char == ":") {
              automaton_state = 3;
            } else if (current_char == "," || current_char == ")") {
              try {
                finishNodeDefinition();
                automaton_state = 1;
                if (current_char == ",") {
                  addNewTreeLevel();
                }
              } catch (e) {
                return generateError(char_index);
              }
            } else if (current_char == "(") {
              if (current_node_name.length > 0) {
                return generateError(char_index);
              } else {
                addNewTreeLevel();
              }
            } else if (current_char in name_quotes) {
              if (
                automaton_state == 1 &&
                current_node_name.length === 0 &&
                current_node_attribute.length === 0 &&
                current_node_annotation.length === 0
              ) {
                automaton_state = 2;
                quote_delimiter = current_char;
                continue;
              }
              return generateError(char_index);
            } else {
              if (current_char == left_delimiter) {
                if (current_node_annotation.length) {
                  return generateError(char_index);
                } else {
                  automaton_state = 4;
                }
              } else {
                if (automaton_state == 3) {
                  current_node_attribute += current_char;
                } else {
                  if (space.test(current_char)) {
                    continue;
                  }
                  if (current_char == ";") {
                    // semicolon terminates tree definition
                    char_index = nwk_str.length;
                    break;
                  }
                  current_node_name += current_char;
                }
              }
            }

            break;
          }
          case 2: {
            // inside a quoted expression
            if (current_char == quote_delimiter) {
              if (char_index < nwk_str.length - 1) {
                if (nwk_str[char_index + 1] == quote_delimiter) {
                  char_index++;
                  current_node_name += quote_delimiter;
                  continue;
                }
              }
              quote_delimiter = 0;
              automaton_state = 1;
              continue;
            } else {
              current_node_name += current_char;
            }
            break;
          }
          case 4: {
            // inside a comment / attribute
            if (current_char == right_delimiter) {
              automaton_state = 3;
            } else {
              if (current_char == left_delimiter) {
                return generateError(char_index);
              }
              current_node_annotation += current_char;
            }
            break;
          }
        }
      } catch (e) {
        return generateError(char_index);
      }
    }

    if (clade_stack.length != 1) {
      return generateError(nwk_str.length - 1);
    }

    return {
      json: tree_json,
      error: null
    };
  }

  /**
   * Return Newick string representation of a phylotree.
   *
   * @param {Function} annotator - Function to apply to each node, determining
   * what label is written (optional).
   * @param {Node} node - start at this node (default == root)
   * @returns {String} newick - Phylogenetic tree serialized as a Newick string.
   */


  function getNewick(annotator, root) {
    let self = this;

    if (!annotator) annotator = d => '';

    function nodeDisplay(n) {
      // Skip the node if it is hidden
      if (n.notshown) return;

      if (!isLeafNode(n)) {
        element_array.push("(");
        n.children.forEach(function(d, i) {
          if (i) {
            element_array.push(",");
          }
          nodeDisplay(d);
        });
        element_array.push(")");
      }

      if(n.data.name !== 'root') {
        const node_label = n.data.name.replaceAll("'", "''");

        // Surround the entire string with single quotes if it contains any
        // non-alphanumeric characters.
        if (/\W/.test(node_label)) {
          element_array.push("'" + node_label + "'");
        } else {
          element_array.push(node_label);
        }
      }
      element_array.push(annotator(n));

      let bl = self.branch_length_accessor(n);

      if (bl !== undefined) {
        element_array.push(":" + bl);
      }
    }

    let element_array = [];
    annotator = annotator || "";
    nodeDisplay(root || this.nodes);

    return element_array.join("")+";";
  }

  function parseAnnotations (buf) {

    let str = buf;
    let index = str.toUpperCase().indexOf('BEGIN DATA;');
    let data = str.slice(index);

    if(data.length < 2) {
      return '';
    }

    index = data.toUpperCase().indexOf('END;');
    let data_str = data.slice(0, index);

    // split on semicolon
    data = ___namespace.map(data_str.split(';'), d => { return d.trim() } );

    // get dimensions
    let dimensions = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('DIMENSION')}); 
    dimensions = dimensions[0].split(' ');
    dimensions = ___namespace.object(___namespace.map(___namespace.rest(dimensions), d => { return d.split('=') }));

    // get formats
    let format = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('FORMAT')}); 
    format = format[0].split(' ');
    format = ___namespace.object(___namespace.map(___namespace.rest(format), d => { return d.split('=') }));
    format.symbols = ___namespace.reject(format.symbols.split(""), d => d=='"');

    // get character matrix
    let matrix = ___namespace.filter(data, d => {return d.toUpperCase().startsWith('MATRIX')}); 
    matrix = matrix[0].split('\n');
    matrix = ___namespace.object(___namespace.map(___namespace.rest(matrix), d=> { return ___namespace.compact(d.split(' ')) }));

    // create all possible states for matrix
    matrix = ___namespace.mapObject(matrix, (v,k) => { 

      if(v == '?') {
        return format.symbols
      }
      else { 
        return Array(v)
      }
    
    });

    return { 'dimensions' : dimensions, 'format' : format, 'matrix' : matrix }

  }

  /**
   *  Loads annotations from a nexus-formatted buffer and annotates existing tree
   *  nodes appropriately.
   *
   * @param {Object} tree - Instatiated phylotree
   * @param {String} NEXUS string
   * @returns {Object} Annotations
   */
  function loadAnnotations(tree, label, annotations) {

    // if filename, then load from filesystem
    ___namespace.each(tree.getTips(), d => { d.data["test"] = annotations.matrix[d.data.name]; });

    // decorate nodes with annotations

  }

  function loadTree(buf) {

    // if filename, then load from filesystem
    // Parse first tree from NEXUS file and send to newickParser

    // Make all upper case
    let str = buf;

    // Get TREE block
    let index = str.toUpperCase().indexOf('BEGIN TREES;');
    let split = str.slice(index);

    if(split.length < 2) {
      return '';
    }

    index = split.toUpperCase().indexOf('END;');
    let tree_str = split.slice(0, index);

    // Filter lines that start with TREE
    let trees = tree_str.split('\n');
    trees = ___namespace.filter(trees, d => { return d.trim().toUpperCase().startsWith('TREE') });

    // Identify start of newick string
    return newickParser(trees[0]);

  }

  var nexus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseAnnotations: parseAnnotations,
    loadAnnotations: loadAnnotations,
    'default': loadTree
  });

  const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
  const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
  const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
  const regexName = new RegExp('^' + nameRegexp + '$');

  function getAllMatches(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while (match) {
      const allmatches = [];
      allmatches.startIndex = regex.lastIndex - match[0].length;
      const len = match.length;
      for (let index = 0; index < len; index++) {
        allmatches.push(match[index]);
      }
      matches.push(allmatches);
      match = regex.exec(string);
    }
    return matches;
  }

  const isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === 'undefined');
  };

  function isExist(v) {
    return typeof v !== 'undefined';
  }

  // const fakeCall = function(a) {return a;};
  // const fakeCallNoReturn = function() {};

  const defaultOptions$1 = {
    allowBooleanAttributes: false, //A tag can have attributes without any value
    unpairedTags: []
  };

  //const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
  function validate(xmlData, options) {
    options = Object.assign({}, defaultOptions$1, options);

    //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
    const tags = [];
    let tagFound = false;

    //indicates that the root tag has been closed (aka. depth 0 has been reached)
    let reachedRoot = false;

    if (xmlData[0] === '\ufeff') {
      // check for byte order mark (BOM)
      xmlData = xmlData.substr(1);
    }
    
    for (let i = 0; i < xmlData.length; i++) {

      if (xmlData[i] === '<' && xmlData[i+1] === '?') {
        i+=2;
        i = readPI(xmlData,i);
        if (i.err) return i;
      }else if (xmlData[i] === '<') {
        //starting of tag
        //read until you reach to '>' avoiding any '>' in attribute value
        let tagStartPos = i;
        i++;
        
        if (xmlData[i] === '!') {
          i = readCommentAndCDATA(xmlData, i);
          continue;
        } else {
          let closingTag = false;
          if (xmlData[i] === '/') {
            //closing tag
            closingTag = true;
            i++;
          }
          //read tagname
          let tagName = '';
          for (; i < xmlData.length &&
            xmlData[i] !== '>' &&
            xmlData[i] !== ' ' &&
            xmlData[i] !== '\t' &&
            xmlData[i] !== '\n' &&
            xmlData[i] !== '\r'; i++
          ) {
            tagName += xmlData[i];
          }
          tagName = tagName.trim();
          //console.log(tagName);

          if (tagName[tagName.length - 1] === '/') {
            //self closing tag without attributes
            tagName = tagName.substring(0, tagName.length - 1);
            //continue;
            i--;
          }
          if (!validateTagName(tagName)) {
            let msg;
            if (tagName.trim().length === 0) {
              msg = "Invalid space after '<'.";
            } else {
              msg = "Tag '"+tagName+"' is an invalid name.";
            }
            return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
          }

          const result = readAttributeStr(xmlData, i);
          if (result === false) {
            return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
          }
          let attrStr = result.value;
          i = result.index;

          if (attrStr[attrStr.length - 1] === '/') {
            //self closing tag
            const attrStrStart = i - attrStr.length;
            attrStr = attrStr.substring(0, attrStr.length - 1);
            const isValid = validateAttributeString(attrStr, options);
            if (isValid === true) {
              tagFound = true;
              //continue; //text may presents after self closing tag
            } else {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
            }
          } else if (closingTag) {
            if (!result.tagClosed) {
              return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
            } else if (attrStr.trim().length > 0) {
              return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
            } else if (tags.length === 0) {
              return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
            } else {
              const otg = tags.pop();
              if (tagName !== otg.tagName) {
                let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                return getErrorObject('InvalidTag',
                  "Expected closing tag '"+otg.tagName+"' (opened in line "+openPos.line+", col "+openPos.col+") instead of closing tag '"+tagName+"'.",
                  getLineNumberForPosition(xmlData, tagStartPos));
              }

              //when there are no more tags, we reached the root level.
              if (tags.length == 0) {
                reachedRoot = true;
              }
            }
          } else {
            const isValid = validateAttributeString(attrStr, options);
            if (isValid !== true) {
              //the result from the nested function returns the position of the error within the attribute
              //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
              //this gives us the absolute index in the entire xml, which we can use to find the line at last
              return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
            }

            //if the root level has been reached before ...
            if (reachedRoot === true) {
              return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
            } else if(options.unpairedTags.indexOf(tagName) !== -1); else {
              tags.push({tagName, tagStartPos});
            }
            tagFound = true;
          }

          //skip tag text value
          //It may include comments and CDATA value
          for (i++; i < xmlData.length; i++) {
            if (xmlData[i] === '<') {
              if (xmlData[i + 1] === '!') {
                //comment or CADATA
                i++;
                i = readCommentAndCDATA(xmlData, i);
                continue;
              } else if (xmlData[i+1] === '?') {
                i = readPI(xmlData, ++i);
                if (i.err) return i;
              } else {
                break;
              }
            } else if (xmlData[i] === '&') {
              const afterAmp = validateAmpersand(xmlData, i);
              if (afterAmp == -1)
                return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
              i = afterAmp;
            }else {
              if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
              }
            }
          } //end of reading tag text value
          if (xmlData[i] === '<') {
            i--;
          }
        }
      } else {
        if ( isWhiteSpace(xmlData[i])) {
          continue;
        }
        return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
      }
    }

    if (!tagFound) {
      return getErrorObject('InvalidXml', 'Start tag expected.', 1);
    }else if (tags.length == 1) {
        return getErrorObject('InvalidTag', "Unclosed tag '"+tags[0].tagName+"'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    }else if (tags.length > 0) {
        return getErrorObject('InvalidXml', "Invalid '"+
            JSON.stringify(tags.map(t => t.tagName), null, 4).replace(/\r?\n/g, '')+
            "' found.", {line: 1, col: 1});
    }

    return true;
  }
  function isWhiteSpace(char){
    return char === ' ' || char === '\t' || char === '\n'  || char === '\r';
  }
  /**
   * Read Processing insstructions and skip
   * @param {*} xmlData
   * @param {*} i
   */
  function readPI(xmlData, i) {
    const start = i;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] == '?' || xmlData[i] == ' ') {
        //tagname
        const tagname = xmlData.substr(start, i - start);
        if (i > 5 && tagname === 'xml') {
          return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
        } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
          //check if valid attribut string
          i++;
          break;
        } else {
          continue;
        }
      }
    }
    return i;
  }

  function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
      //comment
      for (i += 3; i < xmlData.length; i++) {
        if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    } else if (
      xmlData.length > i + 8 &&
      xmlData[i + 1] === 'D' &&
      xmlData[i + 2] === 'O' &&
      xmlData[i + 3] === 'C' &&
      xmlData[i + 4] === 'T' &&
      xmlData[i + 5] === 'Y' &&
      xmlData[i + 6] === 'P' &&
      xmlData[i + 7] === 'E'
    ) {
      let angleBracketsCount = 1;
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === '<') {
          angleBracketsCount++;
        } else if (xmlData[i] === '>') {
          angleBracketsCount--;
          if (angleBracketsCount === 0) {
            break;
          }
        }
      }
    } else if (
      xmlData.length > i + 9 &&
      xmlData[i + 1] === '[' &&
      xmlData[i + 2] === 'C' &&
      xmlData[i + 3] === 'D' &&
      xmlData[i + 4] === 'A' &&
      xmlData[i + 5] === 'T' &&
      xmlData[i + 6] === 'A' &&
      xmlData[i + 7] === '['
    ) {
      for (i += 8; i < xmlData.length; i++) {
        if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
          i += 2;
          break;
        }
      }
    }

    return i;
  }

  const doubleQuote = '"';
  const singleQuote = "'";

  /**
   * Keep reading xmlData until '<' is found outside the attribute value.
   * @param {string} xmlData
   * @param {number} i
   */
  function readAttributeStr(xmlData, i) {
    let attrStr = '';
    let startChar = '';
    let tagClosed = false;
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
        if (startChar === '') {
          startChar = xmlData[i];
        } else if (startChar !== xmlData[i]) ; else {
          startChar = '';
        }
      } else if (xmlData[i] === '>') {
        if (startChar === '') {
          tagClosed = true;
          break;
        }
      }
      attrStr += xmlData[i];
    }
    if (startChar !== '') {
      return false;
    }

    return {
      value: attrStr,
      index: i,
      tagClosed: tagClosed
    };
  }

  /**
   * Select all the attributes whether valid or invalid.
   */
  const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

  //attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

  function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");

    //if(attrStr.trim().length === 0) return true; //empty string

    const matches = getAllMatches(attrStr, validAttrStrRegxp);
    const attrNames = {};

    for (let i = 0; i < matches.length; i++) {
      if (matches[i][1].length === 0) {
        //nospace before attribute name: a="sd"b="saf"
        return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(matches[i]))
      } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
        return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' is without value.", getPositionFromMatch(matches[i]));
      } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
        //independent attribute: ab
        return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(matches[i]));
      }
      /* else if(matches[i][6] === undefined){//attribute without value: ab=
                      return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                  } */
      const attrName = matches[i][2];
      if (!validateAttrName(attrName)) {
        return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(matches[i]));
      }
      if (!attrNames.hasOwnProperty(attrName)) {
        //check for duplicate attribute.
        attrNames[attrName] = 1;
      } else {
        return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(matches[i]));
      }
    }

    return true;
  }

  function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === 'x') {
      i++;
      re = /[\da-fA-F]/;
    }
    for (; i < xmlData.length; i++) {
      if (xmlData[i] === ';')
        return i;
      if (!xmlData[i].match(re))
        break;
    }
    return -1;
  }

  function validateAmpersand(xmlData, i) {
    // https://www.w3.org/TR/xml/#dt-charref
    i++;
    if (xmlData[i] === ';')
      return -1;
    if (xmlData[i] === '#') {
      i++;
      return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for (; i < xmlData.length; i++, count++) {
      if (xmlData[i].match(/\w/) && count < 20)
        continue;
      if (xmlData[i] === ';')
        break;
      return -1;
    }
    return i;
  }

  function getErrorObject(code, message, lineNumber) {
    return {
      err: {
        code: code,
        msg: message,
        line: lineNumber.line || lineNumber,
        col: lineNumber.col,
      },
    };
  }

  function validateAttrName(attrName) {
    return isName(attrName);
  }

  // const startsWithXML = /^xml/i;

  function validateTagName(tagname) {
    return isName(tagname) /* && !tagname.match(startsWithXML) */;
  }

  //this function returns the line number for the character at the given index
  function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
      line: lines.length,

      // column number is last line's length + 1, because column numbering starts at 1:
      col: lines[lines.length - 1].length + 1
    };
  }

  //this function returns the position of the first character of match within attrStr
  function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
  }

  const defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: '@_',
      attributesGroupName: false,
      textNodeName: '#text',
      ignoreAttributes: true,
      removeNSPrefix: false, // remove NS from tag name or attribute name if true
      allowBooleanAttributes: false, //a tag can have attributes without any value
      //ignoreRootElement : false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true, //Trim string values of tag and attributes
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val) {
        return val;
      },
      attributeValueProcessor: function(attrName, val) {
        return val;
      },
      stopNodes: [], //nested tags will not be parsed even for errors
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false,
      updateTag: function(tagName, jPath, attrs){
        return tagName
      },
      // skipEmptyListItem: false
      captureMetaData: false,
  };
     
  const buildOptions = function(options) {
      return Object.assign({}, defaultOptions, options);
  };

  let METADATA_SYMBOL$1;

  if (typeof Symbol !== "function") {
    METADATA_SYMBOL$1 = "@@xmlMetadata";
  } else {
    METADATA_SYMBOL$1 = Symbol("XML Node Metadata");
  }

  class XmlNode{
    constructor(tagname) {
      this.tagname = tagname;
      this.child = []; //nested tags, text, cdata, comments in order
      this[":@"] = {}; //attributes map
    }
    add(key,val){
      // this.child.push( {name : key, val: val, isCdata: isCdata });
      if(key === "__proto__") key = "#__proto__";
      this.child.push( {[key]: val });
    }
    addChild(node, startIndex) {
      if(node.tagname === "__proto__") node.tagname = "#__proto__";
      if(node[":@"] && Object.keys(node[":@"]).length > 0){
        this.child.push( { [node.tagname]: node.child, [":@"]: node[":@"] });
      }else {
        this.child.push( { [node.tagname]: node.child });
      }
      // if requested, add the startIndex
      if (startIndex !== undefined) {
        // Note: for now we just overwrite the metadata. If we had more complex metadata,
        // we might need to do an object append here:  metadata = { ...metadata, startIndex }
        this.child[this.child.length - 1][METADATA_SYMBOL$1] = { startIndex };
      }
    }
    /** symbol used for metadata */
    static getMetaDataSymbol() {
      return METADATA_SYMBOL$1;
    }
  }

  //TODO: handle comments
  function readDocType(xmlData, i){
      
      const entities = {};
      if( xmlData[i + 3] === 'O' &&
           xmlData[i + 4] === 'C' &&
           xmlData[i + 5] === 'T' &&
           xmlData[i + 6] === 'Y' &&
           xmlData[i + 7] === 'P' &&
           xmlData[i + 8] === 'E')
      {    
          i = i+9;
          let angleBracketsCount = 1;
          let hasBody = false, comment = false;
          let exp = "";
          for(;i<xmlData.length;i++){
              if (xmlData[i] === '<' && !comment) { //Determine the tag type
                  if( hasBody && hasSeq(xmlData, "!ENTITY",i)){
                      i += 7; 
                      let entityName, val;
                      [entityName, val,i] = readEntityExp(xmlData,i+1);
                      if(val.indexOf("&") === -1) //Parameter entities are not supported
                          entities[ entityName ] = {
                              regx : RegExp( `&${entityName};`,"g"),
                              val: val
                          };
                  }
                  else if( hasBody && hasSeq(xmlData, "!ELEMENT",i))  {
                      i += 8;//Not supported
                      const {index} = readElementExp(xmlData,i+1);
                      i = index;
                  }else if( hasBody && hasSeq(xmlData, "!ATTLIST",i)){
                      i += 8;//Not supported
                      // const {index} = readAttlistExp(xmlData,i+1);
                      // i = index;
                  }else if( hasBody && hasSeq(xmlData, "!NOTATION",i)) {
                      i += 9;//Not supported
                      const {index} = readNotationExp(xmlData,i+1);
                      i = index;
                  }else if( hasSeq(xmlData, "!--",i) ) comment = true;
                  else throw new Error(`Invalid DOCTYPE`);

                  angleBracketsCount++;
                  exp = "";
              } else if (xmlData[i] === '>') { //Read tag content
                  if(comment){
                      if( xmlData[i - 1] === "-" && xmlData[i - 2] === "-"){
                          comment = false;
                          angleBracketsCount--;
                      }
                  }else {
                      angleBracketsCount--;
                  }
                  if (angleBracketsCount === 0) {
                    break;
                  }
              }else if( xmlData[i] === '['){
                  hasBody = true;
              }else {
                  exp += xmlData[i];
              }
          }
          if(angleBracketsCount !== 0){
              throw new Error(`Unclosed DOCTYPE`);
          }
      }else {
          throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return {entities, i};
  }

  const skipWhitespace = (data, index) => {
      while (index < data.length && /\s/.test(data[index])) {
          index++;
      }
      return index;
  };

  function readEntityExp(xmlData, i) {    
      //External entities are not supported
      //    <!ENTITY ext SYSTEM "http://normal-website.com" >

      //Parameter entities are not supported
      //    <!ENTITY entityname "&anotherElement;">

      //Internal entities are supported
      //    <!ENTITY entityname "replacement text">

      // Skip leading whitespace after <!ENTITY
      i = skipWhitespace(xmlData, i);

      // Read entity name
      let entityName = "";
      while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== '"' && xmlData[i] !== "'") {
          entityName += xmlData[i];
          i++;
      }
      validateEntityName(entityName);

      // Skip whitespace after entity name
      i = skipWhitespace(xmlData, i);

      // Check for unsupported constructs (external entities or parameter entities)
      if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") {
          throw new Error("External entities are not supported");
      }else if (xmlData[i] === "%") {
          throw new Error("Parameter entities are not supported");
      }

      // Read entity value (internal entity)
      let entityValue = "";
      [i, entityValue] = readIdentifierVal(xmlData, i, "entity");
      i--;
      return [entityName, entityValue, i ];
  }

  function readNotationExp(xmlData, i) {
      // Skip leading whitespace after <!NOTATION
      i = skipWhitespace(xmlData, i);

      // Read notation name
      let notationName = "";
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
          notationName += xmlData[i];
          i++;
      }
      validateEntityName(notationName);

      // Skip whitespace after notation name
      i = skipWhitespace(xmlData, i);

      // Check identifier type (SYSTEM or PUBLIC)
      const identifierType = xmlData.substring(i, i + 6).toUpperCase();
      if (identifierType !== "SYSTEM" && identifierType !== "PUBLIC") {
          throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
      }
      i += identifierType.length;

      // Skip whitespace after identifier type
      i = skipWhitespace(xmlData, i);

      // Read public identifier (if PUBLIC)
      let publicIdentifier = null;
      let systemIdentifier = null;

      if (identifierType === "PUBLIC") {
          [i, publicIdentifier ] = readIdentifierVal(xmlData, i, "publicIdentifier");

          // Skip whitespace after public identifier
          i = skipWhitespace(xmlData, i);

          // Optionally read system identifier
          if (xmlData[i] === '"' || xmlData[i] === "'") {
              [i, systemIdentifier ] = readIdentifierVal(xmlData, i,"systemIdentifier");
          }
      } else if (identifierType === "SYSTEM") {
          // Read system identifier (mandatory for SYSTEM)
          [i, systemIdentifier ] = readIdentifierVal(xmlData, i, "systemIdentifier");

          if (!systemIdentifier) {
              throw new Error("Missing mandatory system identifier for SYSTEM notation");
          }
      }
      
      return {notationName, publicIdentifier, systemIdentifier, index: --i};
  }

  function readIdentifierVal(xmlData, i, type) {
      let identifierVal = "";
      const startChar = xmlData[i];
      if (startChar !== '"' && startChar !== "'") {
          throw new Error(`Expected quoted string, found "${startChar}"`);
      }
      i++;

      while (i < xmlData.length && xmlData[i] !== startChar) {
          identifierVal += xmlData[i];
          i++;
      }

      if (xmlData[i] !== startChar) {
          throw new Error(`Unterminated ${type} value`);
      }
      i++;
      return [i, identifierVal];
  }

  function readElementExp(xmlData, i) {
      // <!ELEMENT br EMPTY>
      // <!ELEMENT div ANY>
      // <!ELEMENT title (#PCDATA)>
      // <!ELEMENT book (title, author+)>
      // <!ELEMENT name (content-model)>
      
      // Skip leading whitespace after <!ELEMENT
      i = skipWhitespace(xmlData, i);

      // Read element name
      let elementName = "";
      while (i < xmlData.length && !/\s/.test(xmlData[i])) {
          elementName += xmlData[i];
          i++;
      }

      // Validate element name
      if (!validateEntityName(elementName)) {
          throw new Error(`Invalid element name: "${elementName}"`);
      }

      // Skip whitespace after element name
      i = skipWhitespace(xmlData, i);
      let contentModel = "";
      // Expect '(' to start content model
      if(xmlData[i] === "E" && hasSeq(xmlData, "MPTY",i)) i+=4;
      else if(xmlData[i] === "A" && hasSeq(xmlData, "NY",i)) i+=2;
      else if (xmlData[i] === "(") {
          i++; // Move past '('

          // Read content model
          while (i < xmlData.length && xmlData[i] !== ")") {
              contentModel += xmlData[i];
              i++;
          }
          if (xmlData[i] !== ")") {
              throw new Error("Unterminated content model");
          }

      }else {
          throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
      }
      
      return {
          elementName,
          contentModel: contentModel.trim(),
          index: i
      };
  }

  function hasSeq(data, seq,i){
      for(let j=0;j<seq.length;j++){
          if(seq[j]!==data[i+j+1]) return false;
      }
      return true;
  }

  function validateEntityName(name){
      if (isName(name))
  	return name;
      else
          throw new Error(`Invalid entity name ${name}`);
  }

  const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
  const numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
  // const octRegex = /^0x[a-z0-9]+/;
  // const binRegex = /0x[a-z0-9]+/;

   
  const consider = {
      hex :  true,
      // oct: false,
      leadingZeros: true,
      decimalPoint: "\.",
      eNotation: true,
      //skipLike: /regex/
  };

  function toNumber(str, options = {}){
      options = Object.assign({}, consider, options );
      if(!str || typeof str !== "string" ) return str;
      
      let trimmedStr  = str.trim();
      
      if(options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
      else if(str==="0") return 0;
      else if (options.hex && hexRegex.test(trimmedStr)) {
          return parse_int(trimmedStr, 16);
      // }else if (options.oct && octRegex.test(str)) {
      //     return Number.parseInt(val, 8);
      }else if (trimmedStr.search(/.+[eE].+/)!== -1) { //eNotation
          return resolveEnotation(str,trimmedStr,options);
      // }else if (options.parseBin && binRegex.test(str)) {
      //     return Number.parseInt(val, 2);
      }else {
          //separate negative sign, leading zeros, and rest number
          const match = numRegex.exec(trimmedStr);
          // +00.123 => [ , '+', '00', '.123', ..
          if(match){
              const sign = match[1] || "";
              const leadingZeros = match[2];
              let numTrimmedByZeros = trimZeros(match[3]); //complete num without leading zeros
              const decimalAdjacentToLeadingZeros = sign ? // 0., -00., 000.
                  str[leadingZeros.length+1] === "." 
                  : str[leadingZeros.length] === ".";

              //trim ending zeros for floating number
              if(!options.leadingZeros //leading zeros are not allowed
                  && (leadingZeros.length > 1 
                      || (leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros))){
                  // 00, 00.3, +03.24, 03, 03.24
                  return str;
              }
              else {//no leading zeros or leading zeros are allowed
                  const num = Number(trimmedStr);
                  const parsedStr = String(num);

                  if( num === 0) return num;
                  if(parsedStr.search(/[eE]/) !== -1){ //given number is long and parsed to eNotation
                      if(options.eNotation) return num;
                      else return str;
                  }else if(trimmedStr.indexOf(".") !== -1){ //floating number
                      if(parsedStr === "0") return num; //0.0
                      else if(parsedStr === numTrimmedByZeros) return num; //0.456. 0.79000
                      else if( parsedStr === `${sign}${numTrimmedByZeros}`) return num;
                      else return str;
                  }
                  
                  let n = leadingZeros? numTrimmedByZeros : trimmedStr;
                  if(leadingZeros){
                      // -009 => -9
                      return (n === parsedStr) || (sign+n === parsedStr) ? num : str
                  }else  {
                      // +9
                      return (n === parsedStr) || (n === sign+parsedStr) ? num : str
                  }
              }
          }else { //non-numeric string
              return str;
          }
      }
  }

  const eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
  function resolveEnotation(str,trimmedStr,options){
      if(!options.eNotation) return str;
      const notation = trimmedStr.match(eNotationRegx); 
      if(notation){
          let sign = notation[1] || "";
          const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
          const leadingZeros = notation[2];
          const eAdjacentToLeadingZeros = sign ? // 0E.
              str[leadingZeros.length+1] === eChar 
              : str[leadingZeros.length] === eChar;

          if(leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
          else if(leadingZeros.length === 1 
              && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)){
                  return Number(trimmedStr);
          }else if(options.leadingZeros && !eAdjacentToLeadingZeros){ //accept with leading zeros
              //remove leading 0s
              trimmedStr = (notation[1] || "") + notation[3];
              return Number(trimmedStr);
          }else return str;
      }else {
          return str;
      }
  }

  /**
   * 
   * @param {string} numStr without leading zeros
   * @returns 
   */
  function trimZeros(numStr){
      if(numStr && numStr.indexOf(".") !== -1){//float
          numStr = numStr.replace(/0+$/, ""); //remove ending zeros
          if(numStr === ".")  numStr = "0";
          else if(numStr[0] === ".")  numStr = "0"+numStr;
          else if(numStr[numStr.length-1] === ".")  numStr = numStr.substring(0,numStr.length-1);
          return numStr;
      }
      return numStr;
  }

  function parse_int(numStr, base){
      //polyfill
      if(parseInt) return parseInt(numStr, base);
      else if(Number.parseInt) return Number.parseInt(numStr, base);
      else if(window && window.parseInt) return window.parseInt(numStr, base);
      else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")
  }

  function getIgnoreAttributesFn(ignoreAttributes) {
      if (typeof ignoreAttributes === 'function') {
          return ignoreAttributes
      }
      if (Array.isArray(ignoreAttributes)) {
          return (attrName) => {
              for (const pattern of ignoreAttributes) {
                  if (typeof pattern === 'string' && attrName === pattern) {
                      return true
                  }
                  if (pattern instanceof RegExp && pattern.test(attrName)) {
                      return true
                  }
              }
          }
      }
      return () => false
  }

  // const regx =
  //   '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
  //   .replace(/NAME/g, util.nameRegexp);

  //const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
  //const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

  class OrderedObjParser{
    constructor(options){
      this.options = options;
      this.currentNode = null;
      this.tagsNodeStack = [];
      this.docTypeEntities = {};
      this.lastEntities = {
        "apos" : { regex: /&(apos|#39|#x27);/g, val : "'"},
        "gt" : { regex: /&(gt|#62|#x3E);/g, val : ">"},
        "lt" : { regex: /&(lt|#60|#x3C);/g, val : "<"},
        "quot" : { regex: /&(quot|#34|#x22);/g, val : "\""},
      };
      this.ampEntity = { regex: /&(amp|#38|#x26);/g, val : "&"};
      this.htmlEntities = {
        "space": { regex: /&(nbsp|#160);/g, val: " " },
        // "lt" : { regex: /&(lt|#60);/g, val: "<" },
        // "gt" : { regex: /&(gt|#62);/g, val: ">" },
        // "amp" : { regex: /&(amp|#38);/g, val: "&" },
        // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
        // "apos" : { regex: /&(apos|#39);/g, val: "'" },
        "cent" : { regex: /&(cent|#162);/g, val: "¢" },
        "pound" : { regex: /&(pound|#163);/g, val: "£" },
        "yen" : { regex: /&(yen|#165);/g, val: "¥" },
        "euro" : { regex: /&(euro|#8364);/g, val: "€" },
        "copyright" : { regex: /&(copy|#169);/g, val: "©" },
        "reg" : { regex: /&(reg|#174);/g, val: "®" },
        "inr" : { regex: /&(inr|#8377);/g, val: "₹" },
        "num_dec": { regex: /&#([0-9]{1,7});/g, val : (_, str) => String.fromCodePoint(Number.parseInt(str, 10)) },
        "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val : (_, str) => String.fromCodePoint(Number.parseInt(str, 16)) },
      };
      this.addExternalEntities = addExternalEntities;
      this.parseXml = parseXml;
      this.parseTextData = parseTextData;
      this.resolveNameSpace = resolveNameSpace;
      this.buildAttributesMap = buildAttributesMap;
      this.isItStopNode = isItStopNode;
      this.replaceEntitiesValue = replaceEntitiesValue;
      this.readStopNodeData = readStopNodeData;
      this.saveTextToParentTag = saveTextToParentTag;
      this.addChild = addChild;
      this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
    }

  }

  function addExternalEntities(externalEntities){
    const entKeys = Object.keys(externalEntities);
    for (let i = 0; i < entKeys.length; i++) {
      const ent = entKeys[i];
      this.lastEntities[ent] = {
         regex: new RegExp("&"+ent+";","g"),
         val : externalEntities[ent]
      };
    }
  }

  /**
   * @param {string} val
   * @param {string} tagName
   * @param {string} jPath
   * @param {boolean} dontTrim
   * @param {boolean} hasAttributes
   * @param {boolean} isLeafNode
   * @param {boolean} escapeEntities
   */
  function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
    if (val !== undefined) {
      if (this.options.trimValues && !dontTrim) {
        val = val.trim();
      }
      if(val.length > 0){
        if(!escapeEntities) val = this.replaceEntitiesValue(val);
        
        const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
        if(newval === null || newval === undefined){
          //don't parse
          return val;
        }else if(typeof newval !== typeof val || newval !== val){
          //overwrite
          return newval;
        }else if(this.options.trimValues){
          return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
        }else {
          const trimmedVal = val.trim();
          if(trimmedVal === val){
            return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
          }else {
            return val;
          }
        }
      }
    }
  }

  function resolveNameSpace(tagname) {
    if (this.options.removeNSPrefix) {
      const tags = tagname.split(':');
      const prefix = tagname.charAt(0) === '/' ? '/' : '';
      if (tags[0] === 'xmlns') {
        return '';
      }
      if (tags.length === 2) {
        tagname = prefix + tags[1];
      }
    }
    return tagname;
  }

  //TODO: change regex to capture NS
  //const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
  const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?', 'gm');

  function buildAttributesMap(attrStr, jPath, tagName) {
    if (this.options.ignoreAttributes !== true && typeof attrStr === 'string') {
      // attrStr = attrStr.replace(/\r?\n/g, ' ');
      //attrStr = attrStr || attrStr.trim();

      const matches = getAllMatches(attrStr, attrsRegx);
      const len = matches.length; //don't make it inline
      const attrs = {};
      for (let i = 0; i < len; i++) {
        const attrName = this.resolveNameSpace(matches[i][1]);
        if (this.ignoreAttributesFn(attrName, jPath)) {
          continue
        }
        let oldVal = matches[i][4];
        let aName = this.options.attributeNamePrefix + attrName;
        if (attrName.length) {
          if (this.options.transformAttributeName) {
            aName = this.options.transformAttributeName(aName);
          }
          if(aName === "__proto__") aName  = "#__proto__";
          if (oldVal !== undefined) {
            if (this.options.trimValues) {
              oldVal = oldVal.trim();
            }
            oldVal = this.replaceEntitiesValue(oldVal);
            const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
            if(newVal === null || newVal === undefined){
              //don't parse
              attrs[aName] = oldVal;
            }else if(typeof newVal !== typeof oldVal || newVal !== oldVal){
              //overwrite
              attrs[aName] = newVal;
            }else {
              //parse
              attrs[aName] = parseValue(
                oldVal,
                this.options.parseAttributeValue,
                this.options.numberParseOptions
              );
            }
          } else if (this.options.allowBooleanAttributes) {
            attrs[aName] = true;
          }
        }
      }
      if (!Object.keys(attrs).length) {
        return;
      }
      if (this.options.attributesGroupName) {
        const attrCollection = {};
        attrCollection[this.options.attributesGroupName] = attrs;
        return attrCollection;
      }
      return attrs
    }
  }

  const parseXml = function(xmlData) {
    xmlData = xmlData.replace(/\r\n?/g, "\n"); //TODO: remove this line
    const xmlObj = new XmlNode('!xml');
    let currentNode = xmlObj;
    let textData = "";
    let jPath = "";
    for(let i=0; i< xmlData.length; i++){//for each char in XML data
      const ch = xmlData[i];
      if(ch === '<'){
        // const nextIndex = i+1;
        // const _2ndChar = xmlData[nextIndex];
        if( xmlData[i+1] === '/') {//Closing Tag
          const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
          let tagName = xmlData.substring(i+2,closeIndex).trim();

          if(this.options.removeNSPrefix){
            const colonIndex = tagName.indexOf(":");
            if(colonIndex !== -1){
              tagName = tagName.substr(colonIndex+1);
            }
          }

          if(this.options.transformTagName) {
            tagName = this.options.transformTagName(tagName);
          }

          if(currentNode){
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
          }

          //check if last tag of nested tag was unpaired tag
          const lastTagName = jPath.substring(jPath.lastIndexOf(".")+1);
          if(tagName && this.options.unpairedTags.indexOf(tagName) !== -1 ){
            throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
          }
          let propIndex = 0;
          if(lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1 ){
            propIndex = jPath.lastIndexOf('.', jPath.lastIndexOf('.')-1);
            this.tagsNodeStack.pop();
          }else {
            propIndex = jPath.lastIndexOf(".");
          }
          jPath = jPath.substring(0, propIndex);

          currentNode = this.tagsNodeStack.pop();//avoid recursion, set the parent tag scope
          textData = "";
          i = closeIndex;
        } else if( xmlData[i+1] === '?') {

          let tagData = readTagExp(xmlData,i, false, "?>");
          if(!tagData) throw new Error("Pi Tag is not closed.");

          textData = this.saveTextToParentTag(textData, currentNode, jPath);
          if( (this.options.ignoreDeclaration && tagData.tagName === "?xml") || this.options.ignorePiTags);else {
    
            const childNode = new XmlNode(tagData.tagName);
            childNode.add(this.options.textNodeName, "");
            
            if(tagData.tagName !== tagData.tagExp && tagData.attrExpPresent){
              childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
            }
            this.addChild(currentNode, childNode, jPath, i);
          }


          i = tagData.closeIndex + 1;
        } else if(xmlData.substr(i + 1, 3) === '!--') {
          const endIndex = findClosingIndex(xmlData, "-->", i+4, "Comment is not closed.");
          if(this.options.commentPropName){
            const comment = xmlData.substring(i + 4, endIndex - 2);

            textData = this.saveTextToParentTag(textData, currentNode, jPath);

            currentNode.add(this.options.commentPropName, [ { [this.options.textNodeName] : comment } ]);
          }
          i = endIndex;
        } else if( xmlData.substr(i + 1, 2) === '!D') {
          const result = readDocType(xmlData, i);
          this.docTypeEntities = result.entities;
          i = result.i;
        }else if(xmlData.substr(i + 1, 2) === '![') {
          const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
          const tagExp = xmlData.substring(i + 9,closeIndex);

          textData = this.saveTextToParentTag(textData, currentNode, jPath);

          let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
          if(val == undefined) val = "";

          //cdata should be set even if it is 0 length string
          if(this.options.cdataPropName){
            currentNode.add(this.options.cdataPropName, [ { [this.options.textNodeName] : tagExp } ]);
          }else {
            currentNode.add(this.options.textNodeName, val);
          }
          
          i = closeIndex + 2;
        }else {//Opening tag
          let result = readTagExp(xmlData,i, this.options.removeNSPrefix);
          let tagName= result.tagName;
          const rawTagName = result.rawTagName;
          let tagExp = result.tagExp;
          let attrExpPresent = result.attrExpPresent;
          let closeIndex = result.closeIndex;

          if (this.options.transformTagName) {
            tagName = this.options.transformTagName(tagName);
          }
          
          //save text as child node
          if (currentNode && textData) {
            if(currentNode.tagname !== '!xml'){
              //when nested tag is found
              textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
            }
          }

          //check if last tag was unpaired tag
          const lastTag = currentNode;
          if(lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1 ){
            currentNode = this.tagsNodeStack.pop();
            jPath = jPath.substring(0, jPath.lastIndexOf("."));
          }
          if(tagName !== xmlObj.tagname){
            jPath += jPath ? "." + tagName : tagName;
          }
          const startIndex = i;
          if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
            let tagContent = "";
            //self-closing tag
            if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
              if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
                tagName = tagName.substr(0, tagName.length - 1);
                jPath = jPath.substr(0, jPath.length - 1);
                tagExp = tagName;
              }else {
                tagExp = tagExp.substr(0, tagExp.length - 1);
              }
              i = result.closeIndex;
            }
            //unpaired tag
            else if(this.options.unpairedTags.indexOf(tagName) !== -1){
              
              i = result.closeIndex;
            }
            //normal tag
            else {
              //read until closing tag is found
              const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
              if(!result) throw new Error(`Unexpected end of ${rawTagName}`);
              i = result.i;
              tagContent = result.tagContent;
            }

            const childNode = new XmlNode(tagName);

            if(tagName !== tagExp && attrExpPresent){
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            if(tagContent) {
              tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
            }
            
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
            childNode.add(this.options.textNodeName, tagContent);
            
            this.addChild(currentNode, childNode, jPath, startIndex);
          }else {
    //selfClosing tag
            if(tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1){
              if(tagName[tagName.length - 1] === "/"){ //remove trailing '/'
                tagName = tagName.substr(0, tagName.length - 1);
                jPath = jPath.substr(0, jPath.length - 1);
                tagExp = tagName;
              }else {
                tagExp = tagExp.substr(0, tagExp.length - 1);
              }
              
              if(this.options.transformTagName) {
                tagName = this.options.transformTagName(tagName);
              }

              const childNode = new XmlNode(tagName);
              if(tagName !== tagExp && attrExpPresent){
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              this.addChild(currentNode, childNode, jPath, startIndex);
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
            }
      //opening tag
            else {
              const childNode = new XmlNode( tagName);
              this.tagsNodeStack.push(currentNode);
              
              if(tagName !== tagExp && attrExpPresent){
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              this.addChild(currentNode, childNode, jPath, startIndex);
              currentNode = childNode;
            }
            textData = "";
            i = closeIndex;
          }
        }
      }else {
        textData += xmlData[i];
      }
    }
    return xmlObj.child;
  };

  function addChild(currentNode, childNode, jPath, startIndex){
    // unset startIndex if not requested
    if (!this.options.captureMetaData) startIndex = undefined;
    const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
    if(result === false); else if(typeof result === "string"){
      childNode.tagname = result;
      currentNode.addChild(childNode, startIndex);
    }else {
      currentNode.addChild(childNode, startIndex);
    }
  }

  const replaceEntitiesValue = function(val){

    if(this.options.processEntities){
      for(let entityName in this.docTypeEntities){
        const entity = this.docTypeEntities[entityName];
        val = val.replace( entity.regx, entity.val);
      }
      for(let entityName in this.lastEntities){
        const entity = this.lastEntities[entityName];
        val = val.replace( entity.regex, entity.val);
      }
      if(this.options.htmlEntities){
        for(let entityName in this.htmlEntities){
          const entity = this.htmlEntities[entityName];
          val = val.replace( entity.regex, entity.val);
        }
      }
      val = val.replace( this.ampEntity.regex, this.ampEntity.val);
    }
    return val;
  };
  function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
    if (textData) { //store previously collected data as textNode
      if(isLeafNode === undefined) isLeafNode = currentNode.child.length === 0;
      
      textData = this.parseTextData(textData,
        currentNode.tagname,
        jPath,
        false,
        currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
        isLeafNode);

      if (textData !== undefined && textData !== "")
        currentNode.add(this.options.textNodeName, textData);
      textData = "";
    }
    return textData;
  }

  //TODO: use jPath to simplify the logic
  /**
   * 
   * @param {string[]} stopNodes 
   * @param {string} jPath
   * @param {string} currentTagName 
   */
  function isItStopNode(stopNodes, jPath, currentTagName){
    const allNodesExp = "*." + currentTagName;
    for (const stopNodePath in stopNodes) {
      const stopNodeExp = stopNodes[stopNodePath];
      if( allNodesExp === stopNodeExp || jPath === stopNodeExp  ) return true;
    }
    return false;
  }

  /**
   * Returns the tag Expression and where it is ending handling single-double quotes situation
   * @param {string} xmlData 
   * @param {number} i starting index
   * @returns 
   */
  function tagExpWithClosingIndex(xmlData, i, closingChar = ">"){
    let attrBoundary;
    let tagExp = "";
    for (let index = i; index < xmlData.length; index++) {
      let ch = xmlData[index];
      if (attrBoundary) {
          if (ch === attrBoundary) attrBoundary = "";//reset
      } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
      } else if (ch === closingChar[0]) {
        if(closingChar[1]){
          if(xmlData[index + 1] === closingChar[1]){
            return {
              data: tagExp,
              index: index
            }
          }
        }else {
          return {
            data: tagExp,
            index: index
          }
        }
      } else if (ch === '\t') {
        ch = " ";
      }
      tagExp += ch;
    }
  }

  function findClosingIndex(xmlData, str, i, errMsg){
    const closingIndex = xmlData.indexOf(str, i);
    if(closingIndex === -1){
      throw new Error(errMsg)
    }else {
      return closingIndex + str.length - 1;
    }
  }

  function readTagExp(xmlData,i, removeNSPrefix, closingChar = ">"){
    const result = tagExpWithClosingIndex(xmlData, i+1, closingChar);
    if(!result) return;
    let tagExp = result.data;
    const closeIndex = result.index;
    const separatorIndex = tagExp.search(/\s/);
    let tagName = tagExp;
    let attrExpPresent = true;
    if(separatorIndex !== -1){//separate tag name and attributes expression
      tagName = tagExp.substring(0, separatorIndex);
      tagExp = tagExp.substring(separatorIndex + 1).trimStart();
    }

    const rawTagName = tagName;
    if(removeNSPrefix){
      const colonIndex = tagName.indexOf(":");
      if(colonIndex !== -1){
        tagName = tagName.substr(colonIndex+1);
        attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
      }
    }

    return {
      tagName: tagName,
      tagExp: tagExp,
      closeIndex: closeIndex,
      attrExpPresent: attrExpPresent,
      rawTagName: rawTagName,
    }
  }
  /**
   * find paired tag for a stop node
   * @param {string} xmlData 
   * @param {string} tagName 
   * @param {number} i 
   */
  function readStopNodeData(xmlData, tagName, i){
    const startIndex = i;
    // Starting at 1 since we already have an open tag
    let openTagCount = 1;

    for (; i < xmlData.length; i++) {
      if( xmlData[i] === "<"){ 
        if (xmlData[i+1] === "/") {//close tag
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i+2,closeIndex).trim();
            if(closeTagName === tagName){
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i : closeIndex
                }
              }
            }
            i=closeIndex;
          } else if(xmlData[i+1] === '?') { 
            const closeIndex = findClosingIndex(xmlData, "?>", i+1, "StopNode is not closed.");
            i=closeIndex;
          } else if(xmlData.substr(i + 1, 3) === '!--') { 
            const closeIndex = findClosingIndex(xmlData, "-->", i+3, "StopNode is not closed.");
            i=closeIndex;
          } else if(xmlData.substr(i + 1, 2) === '![') { 
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
            i=closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, '>');

            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length-1] !== "/") {
                openTagCount++;
              }
              i=tagData.closeIndex;
            }
          }
        }
    }//end for loop
  }

  function parseValue(val, shouldParse, options) {
    if (shouldParse && typeof val === 'string') {
      //console.log(options)
      const newval = val.trim();
      if(newval === 'true' ) return true;
      else if(newval === 'false' ) return false;
      else return toNumber(val, options);
    } else {
      if (isExist(val)) {
        return val;
      } else {
        return '';
      }
    }
  }

  const METADATA_SYMBOL = XmlNode.getMetaDataSymbol();

  /**
   * 
   * @param {array} node 
   * @param {any} options 
   * @returns 
   */
  function prettify(node, options){
    return compress( node, options);
  }

  /**
   * 
   * @param {array} arr 
   * @param {object} options 
   * @param {string} jPath 
   * @returns object
   */
  function compress(arr, options, jPath){
    let text;
    const compressedObj = {};
    for (let i = 0; i < arr.length; i++) {
      const tagObj = arr[i];
      const property = propName(tagObj);
      let newJpath = "";
      if(jPath === undefined) newJpath = property;
      else newJpath = jPath + "." + property;

      if(property === options.textNodeName){
        if(text === undefined) text = tagObj[property];
        else text += "" + tagObj[property];
      }else if(property === undefined){
        continue;
      }else if(tagObj[property]){
        
        let val = compress(tagObj[property], options, newJpath);
        const isLeaf = isLeafTag(val, options);
        if (tagObj[METADATA_SYMBOL] !== undefined) {
          val[METADATA_SYMBOL] = tagObj[METADATA_SYMBOL]; // copy over metadata
        }

        if(tagObj[":@"]){
          assignAttributes( val, tagObj[":@"], newJpath, options);
        }else if(Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode){
          val = val[options.textNodeName];
        }else if(Object.keys(val).length === 0){
          if(options.alwaysCreateTextNode) val[options.textNodeName] = "";
          else val = "";
        }

        if(compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
          if(!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [ compressedObj[property] ];
          }
          compressedObj[property].push(val);
        }else {
          //TODO: if a node is not an array, then check if it should be an array
          //also determine if it is a leaf node
          if (options.isArray(property, newJpath, isLeaf )) {
            compressedObj[property] = [val];
          }else {
            compressedObj[property] = val;
          }
        }
      }
      
    }
    // if(text && text.length > 0) compressedObj[options.textNodeName] = text;
    if(typeof text === "string"){
      if(text.length > 0) compressedObj[options.textNodeName] = text;
    }else if(text !== undefined) compressedObj[options.textNodeName] = text;
    return compressedObj;
  }

  function propName(obj){
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(key !== ":@") return key;
    }
  }

  function assignAttributes(obj, attrMap, jpath, options){
    if (attrMap) {
      const keys = Object.keys(attrMap);
      const len = keys.length; //don't make it inline
      for (let i = 0; i < len; i++) {
        const atrrName = keys[i];
        if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
          obj[atrrName] = [ attrMap[atrrName] ];
        } else {
          obj[atrrName] = attrMap[atrrName];
        }
      }
    }
  }

  function isLeafTag(obj, options){
    const { textNodeName } = options;
    const propCount = Object.keys(obj).length;
    
    if (propCount === 0) {
      return true;
    }

    if (
      propCount === 1 &&
      (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)
    ) {
      return true;
    }

    return false;
  }

  class XMLParser{
      
      constructor(options){
          this.externalEntities = {};
          this.options = buildOptions(options);
          
      }
      /**
       * Parse XML dats to JS object 
       * @param {string|Buffer} xmlData 
       * @param {boolean|Object} validationOption 
       */
      parse(xmlData,validationOption){
          if(typeof xmlData === "string");else if( xmlData.toString){
              xmlData = xmlData.toString();
          }else {
              throw new Error("XML data is accepted in String or Bytes[] form.")
          }
          if( validationOption){
              if(validationOption === true) validationOption = {}; //validate with default options
              
              const result = validate(xmlData, validationOption);
              if (result !== true) {
                throw Error( `${result.err.msg}:${result.err.line}:${result.err.col}` )
              }
            }
          const orderedObjParser = new OrderedObjParser(this.options);
          orderedObjParser.addExternalEntities(this.externalEntities);
          const orderedResult = orderedObjParser.parseXml(xmlData);
          if(this.options.preserveOrder || orderedResult === undefined) return orderedResult;
          else return prettify(orderedResult, this.options);
      }

      /**
       * Add Entity which is not by default supported by this library
       * @param {string} key 
       * @param {string} value 
       */
      addEntity(key, value){
          if(value.indexOf("&") !== -1){
              throw new Error("Entity value can't have '&'")
          }else if(key.indexOf("&") !== -1 || key.indexOf(";") !== -1){
              throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'")
          }else if(value === "&"){
              throw new Error("An entity with value '&' is not permitted");
          }else {
              this.externalEntities[key] = value;
          }
      }

      /**
       * Returns a Symbol that can be used to access the metadata
       * property on a node.
       * 
       * If Symbol is not available in the environment, an ordinary property is used
       * and the name of the property is here returned.
       * 
       * The XMLMetaData property is only present when `captureMetaData`
       * is true in the options.
       */
      static getMetaDataSymbol() {
          return XmlNode.getMetaDataSymbol();
      }
  }

  // Changes XML to JSON
  // Modified version from here: http://davidwalsh.name/convert-xml-json
  function xmlToJson(xml) {

  	// Create the return object
  	var obj = {};

  	if (xml.nodeType == 1) { // element
  		// do attributes
  		if (xml.attributes.length > 0) {
  		obj["@attributes"] = {};
  			for (var j = 0; j < xml.attributes.length; j++) {
  				var attribute = xml.attributes.item(j);
  				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
  			}
  		}
  	} else if (xml.nodeType == 3) { // text
  		obj = xml.nodeValue;
  	}

  	// do children
  	// If just one text node inside
  	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
  		obj = xml.childNodes[0].nodeValue;
  	}
  	else if (xml.hasChildNodes()) {
  		for(var i = 0; i < xml.childNodes.length; i++) {
  			var item = xml.childNodes.item(i);
  			var nodeName = item.nodeName;
  			if (typeof(obj[nodeName]) == "undefined") {
  				obj[nodeName] = xmlToJson(item);
  			} else {
  				if (typeof(obj[nodeName].push) == "undefined") {
  					var old = obj[nodeName];
  					obj[nodeName] = [];
  					obj[nodeName].push(old);
  				}
  				obj[nodeName].push(xmlToJson(item));
  			}
  		}
  	}
  	return obj;
  }

  var phyloxml_parser = function(xml, options) {

    function parsePhyloxml(node, index) {
      if (node.clade) {
        if (!Array.isArray(node.clade)) {
  		node.clade = [node.clade];
        }  
        node.clade.forEach(parsePhyloxml);
        node.children = node.clade;
        delete node.clade;
      }

      node.annotation = 1;
      node.attribute = "0.01";
      if (node.branch_length) {
        node.attribute = node.branch_length;
      }
      if (node.taxonomy) {
        node.name = node.taxonomy.scientific_name;
      }

      node.annotation = "";

    }

    var tree_json;

    if (typeof xml === "string") {
  	if (DOMParser) {
  		const parser = new DOMParser();
  		xml = parser.parseFromString(xml, "text/xml");
  	} else {
  		const parser = new XMLParser();
  		xml = parser.parse(xml);
  	}
    }

    xml = xmlToJson(xml);
    var phylogeny = xml.phyloxml.phylogeny;
    if (Array.isArray(phylogeny)) {
  	phylogeny = phylogeny[0];
  	console.warn('PhyloXML files with multiple phylogenies are not currently supported. Only the first phylogeny will be loaded.');
    }
    tree_json = phylogeny.clade;
    tree_json.name = "root";
    parsePhyloxml(tree_json);

    return {
      json: tree_json,
      error: null
    };
  };

  function beast_parser(newick, options) {
    options.left_delimiter = '[';
    options.right_delimiter = ']';
    const parsed_newick = newickParser(newick, options);
    function parseBeastNode(node) {
      if(node.annotation) {
        node.beast = {};
        const tokens = node.annotation.split(/=|,|{|}/)
          .filter(token => token);
        for(var i = 0; i < tokens.length; i+=2) {
          let key = tokens[i].replace(/&|%/g, '');
          if(/[a-df-zA-DF-Z]+/.test(tokens[i+2])) {
            node.beast[key] = +tokens[i+1];
          } else {
            node.beast[key] = [+tokens[i+1], +tokens[i+2]];
            i++;
          }
        }
      }
      node.annotation = undefined;
      if(node.children) {
        node.children.forEach(parseBeastNode);
      }
    }
    parseBeastNode(parsed_newick.json);
    return parsed_newick;
  }

  /* 
   * A parser must have two fields, the object and
   * options
   */
  var format_registry = {
    nexml: nexml_parser,
    phyloxml: phyloxml_parser,
    nexus : loadTree,
    nwk: newickParser,
    nhx: newickParser,
    beast: beast_parser
  };

  /**
   * Return CSV of nodes sorted by longest branches.
   *
   * @returns {Array} An array of all tips and associated lengths of the form :
   * [{
   *    name : <tip_name>,
   *    length: <tip_length>
   * }, ...]
   */

  function getTipLengths() {

    // Get nodes and branch lengths
    let self = this;
    let tips = self.getTips();

    // Transform to name, attribute key-pair and sort by attribute length, descending
    let toExport = ___namespace.map(tips, d => { return {'name' : d.data.name, 'length' : parseFloat(d.data.attribute) } });
    toExport = ___namespace.sortBy(toExport, d=> -d.length);
    return toExport;
    
    
  }

  function maxParsimony(respect_existing, attr_name) {

    function populateMpMatrix(attr_name, d) {

      d.mp = [
        [0, 0], // score for parent selected / not selected
        [false, false]
      ]; // selected or not

      if (isLeafNode(d)) {

        d.mp[1][0] = d.mp[1][1] = d[attr_name] || false;
        d.mp[0][0] = d.mp[1][0] ? 1 : 0;
        d.mp[0][1] = 1 - d.mp[0][0];

      } else {

        d.children.forEach(pop_mp_mat);

        var s0 = d.children.reduce(function(p, n) {
          return n.mp[0][0] + p;
        }, 0);

        // cumulative children score if this node is 0
        var s1 = d.children.reduce(function(p, n) {
          return n.mp[0][1] + p;
        }, 0);

        // cumulative children score if this node is 1
        // parent = 0

        if (d[attr_name]) {
          // respect selected
          d.mp[0][0] = s1 + 1;
          d.mp[1][0] = true;
          d.mp[0][1] = s1;
          d.mp[1][1] = true;
        } else {
          if (s0 < s1 + 1) {
            d.mp[0][0] = s0;
            d.mp[1][0] = false;
          } else {
            d.mp[0][0] = s1 + 1;
            d.mp[1][0] = true;
          }

          // parent = 1

          if (s1 < s0 + 1) {
            d.mp[0][1] = s1;
            d.mp[1][1] = true;
          } else {
            d.mp[0][1] = s0 + 1;
            d.mp[1][1] = false;
          }
        }
      }
    }

    const pop_mp_mat = ___namespace.partial(populateMpMatrix, attr_name);
    pop_mp_mat(this.nodes);

    this.nodes.each(d => {
      if (d.parent) {
        d.mp = d.mp[1][d.parent.mp ? 1 : 0];
      } else {
        d.mp = d.mp[1][d.mp[0][0] < d.mp[0][1] ? 0 : 1];
      }
    });

    this.display.modifySelection((d, callback) => {
      if (isLeafNode(d.target)) {
        return d.target[attr_name];
      }
      return d.target.mp;
    });

  }

  function postOrder(node, callback, backtrack) {

    let nodes = [node],
      next = [],
      children,
      i,
      n;

    while ((node = nodes.pop())) {
      if (!(backtrack && backtrack(node))) {
        next.push(node), (children = node.children);
        if (children)
          for (i = 0, n = children.length; i < n; ++i) {
            nodes.push(children[i]);
          }
      }
    }

    while ((node = next.pop())) {
      callback(node);
    }

    return node;

  }

  function preOrder(node, callback, backtrack) {
    let nodes = [node],
      children,
      i;

    while ((node = nodes.pop())) {
      if (!(backtrack && backtrack(node))) {
        callback(node), (children = node.children);
        if (children)
          for (i = children.length - 1; i >= 0; --i) {
            nodes.push(children[i]);
          }
      }
    }

    return node;
  }

  function inOrder(node, callback, backtrack) {
    let current,
      next = [node],
      children,
      i,
      n;

    do {
      (current = next.reverse()), (next = []);
      while ((node = current.pop())) {
        if (!(backtrack && backtrack(node))) {
          callback(node), (children = node.children);
          if (children)
            for (i = 0, n = children.length; i < n; ++i) {
              next.push(children[i]);
            }
        }
      }
    } while (next.length);

    return node;
  }

  /**
   * Traverses a tree that represents left-child right-sibling
   * @param {Object} tree -- the phylotree.js tree object 
   * @return {Object} An edge list that represents the original multi-way tree
   *
   */
  function leftChildRightSibling(root) {

    let declareTrueParent = function(n) {

      if(n.children) {
        // left child is the child
        n.children[0].data.multiway_parent = n;

        // right child is the sibling
        n.children[1].data.multiway_parent = n.parent;
      }

    };

    // First decorate each node with its true parent node
    postOrder(root, declareTrueParent);

    // return edge list
    let edge_list = ___namespace$1.map(root.descendants(), n => { 

      let source = n.data.multiway_parent; 
      let name = "unknown";

      if(source) {
        name = source.data.name;
      }

      // In order to get the true name of the infector/infectee, we must traverse
      // the tree from the multiway_parents node.

      return {"source" : n.data.multiway_parent, "target" : n, "name": name } });

    // Construct edge list by new parent-child listing
    return edge_list;

  }

  /**
   * Returns T/F whether every branch in the tree has a branch length
   *
   * @returns {Object} true if  every branch in the tree has a branch length
   */
  function hasBranchLengths() {

    let bl = this.branch_length;

    if (bl) {
      return ___namespace.every(this.nodes.descendants(), function(node) {
        return !node.parent || !___namespace.isUndefined(bl(node));
      });

    }

    return false;
  }

  /**
   * Returns branch lengths
   *
   * @returns {Array} array of branch lengths
   */
  function getBranchLengths() {

    let bl = this.branch_length;
    return ___namespace.map(this.nodes.descendants(), node => { return bl(node)});

  }


  function defBranchLengthAccessor(_node, new_length) {

    let _node_data = _node.data;

    if (
      "attribute" in _node_data &&
      _node_data["attribute"] &&
      _node_data["attribute"].length
    ) {

      if(new_length > 0) {
        _node_data["attribute"] = String(new_length);
      }

      let bl = parseFloat(_node_data["attribute"]);

      if (!isNaN(bl)) {
        return Math.max(0, bl);
      }

    }

    // Allow for empty branch length at root
    if(_node_data.name == "root") {
      return 0;
    }

    console.warn('Undefined branch length at ' + _node_data.name + '!');

    return undefined;

  }

  /**
   * Get or set branch length accessor.
   *
   * @param {Function} attr Empty if getting, or new branch length accessor if setting.
   * @returns {Object} The branch length accessor if getting, or the current this if setting.
   */
  function setBranchLength(attr) {
    if (!arguments.length) return this.branch_length_accessor;
    this.branch_length_accessor = attr ? attr : defBranchLengthAccessor;
    return this;
  }

  /**
   * Normalizes branch lengths
   */
  function normalize(attr) {

    let bl = this.branch_length;

    let branch_lengths = ___namespace.map(this.nodes.descendants(), function(node) {
      if(bl(node)) {
      return bl(node);
      } else {
        return null;
      }
    });

    const max_bl = ___namespace.max(branch_lengths);
    const min_bl = ___namespace.min(branch_lengths);

    let scaler = function (x) {
      return (x - min_bl)/(max_bl - min_bl);
    };

    ___namespace.each(this.nodes.descendants(), (node) => {
        let len = bl(node);
        if(len) {
          bl(node, scaler(len));
        }     
    });

    return this;

  }


  /**
   * Scales branch lengths
   *
   * @param {Function} function that scales the branches
   */
  function scale(scale_by) {

    let bl = this.branch_length;

    ___namespace.each(this.nodes.descendants(), (node) => {
        let len = bl(node);
        if(len) {
          bl(node, scale_by(len));
        }     
    });

    return this;

  }

  /**
   * Get or set branch name accessor.
   *
   * @param {Function} attr (Optional) If setting, a function that accesses a branch name
   * from a node.
   * @returns The ``nodeLabel`` accessor if getting, or the current ``this`` if setting.
   */
  function branchName(attr) {
    if (!arguments.length) return this.nodeLabel;
    this.nodeLabel = attr;
    return this;
  }

  /**
  * Reroot the tree on the given node.
  *
  * @param {Node} node Node to reroot on.
  * @param {fraction} if specified, partition the branch not into 0.5 : 0.5, but according to 
                     the specified fraction
                     
  * @returns {Phylotree} The current ``phylotree``.
  */
  function reroot(node, fraction) {

    /** TODO add the option to root in the middle of a branch */
    if(!(node instanceof hierarchy)) {
     throw new Error('node needs to be an instance of a d3.hierarchy node!');
    }

    let nodes = this.nodes.copy();

    fraction = fraction !== undefined ? fraction : 0.5;

    if (node.parent) {

      var new_json = hierarchy({
        name: "new_root"
      });
      
      new_json.children = [node.copy()];
      new_json.data.__mapped_bl = undefined;

      nodes.each(n => {
        n.data.__mapped_bl = this.branch_length_accessor(n);
      });

      this.setBranchLength(n => {
        return n.data.__mapped_bl;
      });

      let remove_me = node,
        current_node = node.parent,
        stashed_bl = ___namespace.noop();

      let apportioned_bl =
        node.data.__mapped_bl === undefined ? undefined : node.data.__mapped_bl * fraction;

      stashed_bl = current_node.data.__mapped_bl;

      current_node.data.__mapped_bl =
        node.data.__mapped_bl === undefined
          ? undefined
          : node.data.__mapped_bl - apportioned_bl;

      node.data.__mapped_bl = apportioned_bl;

      var remove_idx;

      if (current_node.parent) {

        new_json.children.push(current_node);

        while (current_node.parent) {

          remove_idx = current_node.children.indexOf(remove_me);

          if (current_node.parent.parent) {
            current_node.children.splice(remove_idx, 1, current_node.parent);
          } else {
            current_node.children.splice(remove_idx, 1);
          }

          let t = current_node.parent.data.__mapped_bl;

          if (t !== undefined) {
            current_node.parent.data.__mapped_bl = stashed_bl;
            stashed_bl = t;
          }

          remove_me = current_node;
          current_node = current_node.parent;
        }

        remove_idx = current_node.children.indexOf(remove_me);
        current_node.children.splice(remove_idx, 1);

      } else {

        remove_idx = current_node.children.indexOf(remove_me);
        current_node.children.splice(remove_idx, 1);
        stashed_bl = current_node.data.__mapped_bl;
        remove_me = new_json;

      }

      // current_node is now old root, and remove_me is the root child we came up
      // the tree through
      if (current_node.children.length == 1) {

        if (stashed_bl) {
          current_node.children[0].data.__mapped_bl += stashed_bl;
        }

        remove_me.children = remove_me.children.concat(current_node.children);

      } else {

        let new_node = new hierarchy({ name: "__reroot_top_clade", __mapped_bl: stashed_bl });
        ___namespace.extendOwn (new_json.children[0], node);
        new_node.data.__mapped_bl = stashed_bl;
        new_node.children = current_node.children.map(function(n) {
          n.parent = new_node;
          return n;
        });

        new_node.parent = remove_me;
        remove_me.children.push(new_node);

     }

    }

    // need to traverse the nodes and update parents
    this.update(new_json);

    this.traverse_and_compute(n => {
      ___namespace.each (n.children, (c) => {c.parent = n;});
    }, "pre-order");


    if(!___namespace.isUndefined(this.display)) {

      // get options
      let options = this.display.options;
      // get container
      select(this.display.container).select('svg').remove();

      // retain selection
      let selectionName = this.display.selection_attribute_name;

      delete this.display;

      let rendered_tree = this.render(options);
      rendered_tree.selectionLabel(selectionName);
      rendered_tree.update();
      select(rendered_tree.container).node().appendChild(rendered_tree.show());
      select(this.display.container).dispatch('reroot');

    }

    return this;

  }

  function rootpath(attr_name, store_name) {

    attr_name = attr_name || "attribute";
    store_name = store_name || "y_scaled";

    if ("parent" in this) {
      let my_value = parseFloat(this[attr_name]);

      this[store_name] =
        this.parent[store_name] + (isNaN(my_value) ? 0.1 : my_value);

    } else {

      this[store_name] = 0.0;

    }

    return this[store_name];

  }

  function pathToRoot(node) {
    let selection = [];
    while (node) {
      selection.push(node);
      node = node.parent;
    }
    return selection;
  }

  var rooting = /*#__PURE__*/Object.freeze({
    __proto__: null,
    reroot: reroot,
    rootpath: rootpath,
    pathToRoot: pathToRoot
  });

  function xCoord(d) {
    return d.y;
  }

  function yCoord(d) {
    return d.x;
  }

  function radialMapper(r, a, radial_center) {
    return {
      x: radial_center + r * Math.sin(a),
      y: radial_center + r * Math.cos(a)
    };
  }

  function cartesianToPolar(
    node,
    radius,
    radial_root_offset,
    radial_center,
    scales,
    size
  ) {

    node.radius = radius * (node.radius + radial_root_offset);

    //if (!node.angle) {
    node.angle = 2 * Math.PI * node.x * scales[0] / size[0];
    //}

    let radial = radialMapper(node.radius, node.angle, radial_center);

    node.x = radial.x;
    node.y = radial.y;

    return node;

  }

  function drawArc(radial_center, points) {


    var start = radialMapper(points[0].radius, points[0].angle, radial_center),
      end = radialMapper(points[0].radius, points[1].angle, radial_center);

    return (
      "M " +
      xCoord(start) +
      "," +
      yCoord(start) +
      " A " +
      points[0].radius +
      "," +
      points[0].radius +
      " 0,0, " +
      (points[1].angle > points[0].angle ? 1 : 0) +
      " " +
      xCoord(end) +
      "," +
      yCoord(end) +
      " L " +
      xCoord(points[1]) +
      "," +
      yCoord(points[1])
    );
  }

  function arcSegmentPlacer(edge, where, radial_center) {
    var r = radialMapper(
      edge.target.radius + (edge.source.radius - edge.target.radius) * where,
      edge.target.angle,
      radial_center
    );
    return { x: xCoord(r), y: yCoord(r) };
  }

  var draw_line = line()
    .x(function(d) {
      return xCoord(d);
    })
    .y(function(d) {
      return yCoord(d);
    })
    .curve(stepBefore);

  function lineSegmentPlacer(edge, where) {
    return {
      x:
        xCoord(edge.target) +
        (xCoord(edge.source) - xCoord(edge.target)) * where,
      y: yCoord(edge.target)
    };
  }

  function itemTagged(item) {
    return item.tag || false;
  }

  function itemSelected(item, tag) {
    return item[tag] || false;
  }

  const css_classes = {
    "tree-container": "phylotree-container",
    "tree-scale-bar": "tree-scale-bar",
    node: "node",
    "internal-node": "internal-node",
    "tagged-node": "node-tagged",
    "selected-node": "node-selected",
    "collapsed-node": "node-collapsed",
    "root-node": "root-node",
    branch: "branch",
    "selected-branch": "branch-selected",
    "tagged-branch": "branch-tagged",
    "tree-selection-brush": "tree-selection-brush",
    "branch-tracer": "branch-tracer",
    clade: "clade",
    node_text: "phylotree-node-text"
  };

  function initializeCssClasses(classes = {}) {
    Object.keys(classes).forEach(key => {
      css_classes[key] = classes[key];
    });
  }

  function internalNames(attr) {
    if (!arguments.length) return this.options["internal-names"];
    this.options["internal-names"] = attr;
    return this;
  }

  function radial(attr) {
    if (!arguments.length) return this.options["is-radial"];
    this.options["is-radial"] = attr;
    return this;
  }

  function alignTips(attr) {
    if (!arguments.length) return this.options["align-tips"];
    this.options["align-tips"] = attr;
    return this;
  }

  /**
   * Return the bubble size of the current node.
   *
   * @param {Node} A node in the phylotree.
   * @returns {Float} The size of the bubble associated to this node.
   */
  function nodeBubbleSize(node) {

    // if a custom bubble styler, use that instead

    if(this.options["draw-size-bubbles"] && this.options["bubble-styler"]) {
      return this.options["bubble-styler"](node);
    } else {
      return this.options["draw-size-bubbles"]
        ? this.relative_nodeSpan(node) * this.scales[0] * 0.25
        : 0;
      }
  }

  function shiftTip$1(d) {
    if (this.options["is-radial"]) {
      return [
        (d.text_align == "end" ? -1 : 1) *
          (this.radius_pad_for_bubbles - d.radius),
        0
      ];
    }
    if (this.options["right-to-left"]) {
      return [this.right_most_leaf - d.screen_x, 0];
    }
    return [this.right_most_leaf - d.screen_x, 0];
  }

  function layoutHandler(attr) {
    if (!arguments.length) return this.layout_listener_handler;
    this.layout_listener_handler = attr;
    return this;
  }

  /**
   * Getter/setter for the selection label. Useful when allowing
   * users to make multiple selections.
   *
   * @param {String} attr (Optional) If setting, the new selection label.
   * @returns The current selection label if getting, or the current ``phylotree`` if setting.
   */
  function selectionLabel(attr) {
    if (!arguments.length) return this.selection_attribute_name;
    this.selection_attribute_name = attr;
    this.syncEdgeLabels();
    return this;
  }

  /**
   * Get or set the current node span. If setting, the argument should
   * be a function of a node which returns a number, so that node spans
   * can be determined dynamically. Alternatively, the argument can be the
   * string ``"equal"``, to give all nodes an equal span.
   *
   * @param {Function} attr Optional; if setting, the nodeSpan function.
   * @returns The ``nodeSpan`` if getting, or the current ``phylotree`` if setting.
   */
  function nodeSpan$1(attr) {
    if (!arguments.length) return nodeSpan$1;
    if (typeof attr == "string" && attr == "equal") {
      nodeSpan$1 = function(d) { // eslint-disable-line
        return 1;
      };
    } else {
      nodeSpan$1 = attr; // eslint-disable-line
    }
    return this;
  }

  // List of all selecters that can be used with the restricted-selectable option
  var predefined_selecters = {
    all: d => {
      return true;
    },
    none: d => {
      return false;
    },
    "all-leaf-nodes": d => {
      return isLeafNode(d.target);
    },
    "all-internal-nodes": d => {
      return !isLeafNode(d.target);
    }
  };

  /**
   * Getter/setter for the selection callback. This function is called
   * every time the current selection is modified, and its argument is
   * an array of nodes that make up the current selection.
   *
   * @param {Function} callback (Optional) The selection callback function.
   * @returns The current ``_selectionCallback`` if getting, or the current ``this`` if setting.
   */
  function selectionCallback$1(callback) {
    if (!callback) return this._selectionCallback;
    this._selectionCallback = callback;
    return this;
  }

  var opt = /*#__PURE__*/Object.freeze({
    __proto__: null,
    css_classes: css_classes,
    initializeCssClasses: initializeCssClasses,
    internalNames: internalNames,
    radial: radial,
    alignTips: alignTips,
    nodeBubbleSize: nodeBubbleSize,
    shiftTip: shiftTip$1,
    layoutHandler: layoutHandler,
    selectionLabel: selectionLabel,
    get nodeSpan () { return nodeSpan$1; },
    predefined_selecters: predefined_selecters,
    selectionCallback: selectionCallback$1
  });

  function shiftTip(d) {

    if (this.radial()) {
      return [
        (d.text_align == "end" ? -1 : 1) *
          (this.radius_pad_for_bubbles - d.radius),
        0
      ];
    }

    if (this.options["right-to-left"]) {
      return [this.right_most_leaf - d.screen_x, 0];
    }

    return [this.right_most_leaf - d.screen_x, 0];

  }

  function drawNode(container, node, transitions) {

    container = select(container);
    var is_leaf = isLeafNode(node);

    if (is_leaf) {
      container = container.attr("data-node-name", node.data.name);
    }

    var labels = container.selectAll("text").data([node]),
      tracers = container.selectAll("line");

    if (is_leaf || (this.showInternalName(node) && !isNodeCollapsed(node))) {

      labels = labels
        .enter()
        .append("text")
        .classed(this.css_classes["node_text"], true)
        .merge(labels)
        .on("click", d=> {
          this.handle_node_click(node, d);
        })
        .attr("dy", d => {
          return this.shown_font_size * 0.33;
        })
        .text(d => {
          return this.options["show-labels"] ? this._nodeLabel(d) : "";
        })
        .style("font-size", d => {
          return this.ensure_size_is_in_px(this.shown_font_size);
        });

      if (this.radial()) {
        labels = labels
          .attr("transform", d => {
            return (
              this.d3PhylotreeSvgRotate(d.text_angle) +
              this.d3PhylotreeSvgTranslate(
                this.alignTips() ? this.shiftTip(d) : null
              )
            );
          })
          .attr("text-anchor", d => {
            return d.text_align;
          });
      } else {
        labels = labels.attr("text-anchor", "start").attr("transform", d => {
          if (this.options["layout"] == "right-to-left") {
            return this.d3PhylotreeSvgTranslate([-20, 0]);
          }
          return this.d3PhylotreeSvgTranslate(
            this.alignTips() ? this.shiftTip(d) : null
          );
        });
      }

      if (this.alignTips()) {
        tracers = tracers.data([node]);

        if (transitions) {
          tracers = tracers
            .enter()
            .append("line")
            .classed(this.css_classes["branch-tracer"], true)
            .merge(tracers)
            .attr("x1", d => {
              return (
                (d.text_align == "end" ? -1 : 1) * this.nodeBubbleSize(node)
              );
            })
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", 0)
            .attr("x2", d => {
              if (this.options["layout"] == "right-to-left") {
                return d.screen_x;
              }

              return this.shiftTip(d)[0];
            })
            .attr("transform", d => {
              return this.d3PhylotreeSvgRotate(d.text_angle);
            })
            .attr("x2", d => {
              if (this.options["layout"] == "right-to-left") {
                return d.screen_x;
              }
              return this.shiftTip(d)[0];
            })
            .attr("transform", d => {
              return this.d3PhylotreeSvgRotate(d.text_angle);
            });
        } else {
          tracers = tracers
            .enter()
            .append("line")
            .classed(this.css_classes["branch-tracer"], true)
            .merge(tracers)
            .attr("x1", d => {
              return (
                (d.text_align == "end" ? -1 : 1) * this.nodeBubbleSize(node)
              );
            })
            .attr("y2", 0)
            .attr("y1", 0)
            .attr("x2", d => {
              return this.shiftTip(d)[0];
            });
          tracers.attr("transform", d => {
            return this.d3PhylotreeSvgRotate(d.text_angle);
          });
        }
      } else {
        tracers.remove();
      }

      if (this.options["draw-size-bubbles"]) {

        var shift = this.nodeBubbleSize(node);

        let circles = container
          .selectAll("circle")
          .data([shift])
          .enter()
          .append("circle");

        circles.attr("r", function(d) {
          return d;
        });

        if (this.shown_font_size >= 5) {
          labels = labels.attr("dx", d => {
            return (
              (d.text_align == "end" ? -1 : 1) *
              ((this.alignTips() ? 0 : shift) + this.shown_font_size * 0.33)
            );
          });
        }
      } else {
        if (this.shown_font_size >= 5) {
          labels = labels.attr("dx", d => { // eslint-disable-line
            return (d.text_align == "end" ? -1 : 1) * this.shown_font_size * 0.33;
          });
        }
      }
    }

    if (!is_leaf) {
      let circles = container
          .selectAll("circle")
          .data([node])
          .enter()
          .append("circle"),
        radius = this.node_circle_size()(node);

      if (radius > 0) {
        circles
          .merge(circles)
          .attr("r", d => {
            return Math.min(this.shown_font_size * 0.75, radius);
          })
          .on("click", d => {
            this.handle_node_click(node, d);
          });
      } else {
        circles.remove();
      }
    }

    if (this.node_styler) {
      this.node_styler(container, node);
    }

    return node;
  }

  function updateHasHiddenNodes() {
    let nodes = this.phylotree.nodes.descendants();

    for (let k = nodes.length - 1; k >= 0; k -= 1) {
      if (isLeafNode(nodes[k])) {
        nodes[k].hasHiddenNodes = nodes[k].notshown;
      } else {
        nodes[k].hasHiddenNodes = nodes[k].children.reduce(function(p, c) {
          return c.notshown || p;
        }, false);
      }
    }

    return this;
  }

  function showInternalName(node) {

    const i_names = this.internalNames();

    if (i_names) {
      if (typeof i_names === "function") {
        return i_names(node);
      }
      return i_names;
    }

    return false;
  }

  /**
   * Get or set the current node span. If setting, the argument should
   * be a function of a node which returns a number, so that node spans
   * can be determined dynamically. Alternatively, the argument can be the
   * string ``"equal"``, to give all nodes an equal span.
   *
   * @param {Function} attr Optional; if setting, the nodeSpan function.
   * @returns The ``nodeSpan`` if getting, or the current ``phylotree`` if setting.
   */
  function nodeSpan(attr) {
    if (!arguments.length) return this.nodeSpan;
    if (typeof attr == "string" && attr == "equal") {
      this.nodeSpan = function(d) {
        return 1;
      };
    } else {
      this.nodeSpan = attr;
    }
    return this;
  }

  function reclassNode(node) {

    let class_var = css_classes[isLeafNode(node) ? "node" : "internal-node"];

    if (itemTagged(node)) {
      class_var += " " + css_classes["tagged-node"];
    }

    if (itemSelected(node, this.selection_attribute_name)) {
      class_var += " " + css_classes["selected-node"];
    }

    if (!node["parent"]) {
      class_var += " " + css_classes["root-node"];
    }

    if (isNodeCollapsed(node) || hasHiddenNodes(node)) {
      class_var += " " + css_classes["collapsed-node"];
    }

    return class_var;
  }

  function nodeVisible(node) {
    return !(node.hidden || node.notshown || false);
  }

  function nodeNotshown(node) {
    return node.notshown;
  }

  function hasHiddenNodes(node) {
    return node.hasHiddenNodes || false;
  }

  function isNodeCollapsed(node) {
    return node.collapsed || false;
  }

  function nodeCssSelectors(css_classes) {
    return [
      css_classes["node"],
      css_classes["internal-node"],
      css_classes["collapsed-node"],
      css_classes["tagged-node"],
      css_classes["root-node"]
    ].reduce(function(p, c, i, a) {
      return (p += "g." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function internalLabel(callback, respect_existing) {

    this.phylotree.clearInternalNodes(respect_existing);

    for (var i = this.phylotree.nodes.descendants().length - 1; i >= 0; i--) {

      var d = this.phylotree.nodes.descendants()[i];

      if (!(isLeafNode(d) || itemSelected(d, this.selection_attribute_name))) {
        d[this.selection_attribute_name] = callback(d.children);
      }

    }

    this.modifySelection((d, callback) => {
      if (isLeafNode(d.target)) {
        return d.target[this.selection_attribute_name];
      }
      return d.target[this.selection_attribute_name];
    });
  }

  function defNodeLabel(_node) {

    _node = _node.data;

    if (isLeafNode(_node)) {
      return _node.name || "";
    }

    if (this.showInternalName(_node)) {
      return _node.name;
    }

    return "";

  }

  /**
   * Get or set nodeLabel accessor.
   *
   * @param {Function} attr (Optional) If setting, a function that accesses a branch name
   * from a node.
   * @returns The ``nodeLabel`` accessor if getting, or the current ``this`` if setting.
   */
  function nodeLabel(attr) {
    if (!arguments.length) return this._nodeLabel;
    this._nodeLabel = attr ? attr : defNodeLabel;
  	this.update();
    return this;
  }

  var render_nodes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    shiftTip: shiftTip,
    drawNode: drawNode,
    updateHasHiddenNodes: updateHasHiddenNodes,
    showInternalName: showInternalName,
    nodeSpan: nodeSpan,
    reclassNode: reclassNode,
    nodeVisible: nodeVisible,
    nodeNotshown: nodeNotshown,
    hasHiddenNodes: hasHiddenNodes,
    isNodeCollapsed: isNodeCollapsed,
    nodeCssSelectors: nodeCssSelectors,
    internalLabel: internalLabel,
    defNodeLabel: defNodeLabel,
    nodeLabel: nodeLabel
  });

  function cladeCssSelectors(css_classes) {
    return [css_classes["clade"]].reduce(function(p, c, i, a) {
      return (p += "path." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function updateCollapsedClades(transitions) {

    let enclosure = this.svg.selectAll("." + this.css_classes["tree-container"]);
    var node_id = 0;

    let collapsed_clades = enclosure
      .selectAll(cladeCssSelectors(this.css_classes))
      .data(
        this.phylotree.nodes.descendants().filter(isNodeCollapsed),
        function(d) {
          return d.id || (d.id = ++node_id);
        }
      );

    let spline = function() {};
    let spline_f = ___namespace.noop();

    // Collapse radial differently
    if (this.radial()) {
      spline = line()
        .curve(basis)
        .y(function(d) {
          return d[0];
        })
        .x(function(d) {
          return d[1];
        });

      spline_f = function(coord, i, d, init_0, init_1) {
        if (i) {
          return [
            d.screen_y + (coord[0] - init_0) / 50,
            d.screen_x + (coord[1] - init_1) / 50
          ];
        } else {
          return [d.screen_y, d.screen_x];
        }
      };
    } else {
      spline = line()
        .y(function(d) {
          return d[0];
        })
        .x(function(d) {
          return d[1];
        }).curve(basis);

      spline_f = function(coord, i, d, init_0, init_1) {
        if (i) {
           return [
            d.screen_y + (coord[0] - init_0) / 50 ,
            d.screen_x + (coord[1] - init_1) / 50,
          ];
        } else {
          return [d.screen_y, d.screen_x];
        }
      };
    }

    collapsed_clades
      .exit()
      .each(function(d) {
        d.collapsed_clade = null;
      })
      .remove();

    if (transitions) {
      collapsed_clades
        .enter()
        .insert("path", ":first-child")
        .attr("class", this.css_classes["clade"])
        .merge(collapsed_clades)
        .attr("d", function(d) {
          if (d.collapsed_clade) {
            return d.collapsed_clade;
          }

          //console.log (d.collapsed);
          let init_0 = d.collapsed[0][0];
          let init_1 = d.collapsed[0][1];
          

    
          // #1 return spline(d.collapsed.map(spline_f, d, init_0, init_1));
          return spline(
            d.collapsed.map(function(coord, i) {
              return spline_f(coord, i, d, init_0, init_1);
            })
          );
        })
        .attr("d", function(d) {        
          return (d.collapsed_clade = spline(d.collapsed));
        });
    } else {
      collapsed_clades
        .enter()
        .insert("path", ":first-child")
        .attr("class", this.css_classes["clade"])
        .merge(collapsed_clades)
        .attr("d", function(d) {
          return (d.collapsed_clade ? d.collapsed_clade : d.collapsed_clade = spline(d.collapsed));
        });
    }
  }

  var clades = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cladeCssSelectors: cladeCssSelectors,
    updateCollapsedClades: updateCollapsedClades
  });

  function drawEdge(container, edge, transition) {

    container = select(container);

    container = container
      .attr("class", d => {
        return this.reclassEdge(d);
      })
      .on("click", d => {
        this.modifySelection([edge.target], this.selection_attribute_name);
        this.update();
      });

    let new_branch_path = this.draw_branch([edge.source, edge.target]);

    if (transition) {

      if (container.datum().existing_path) {
        container = container.attr("d", function(d) {
          return d.existing_path;
        });
      }

      container = container.attr("d", new_branch_path);

    } else {
      container = container.attr("d", new_branch_path);
    }

    edge.existing_path = new_branch_path;

    var bl = this.phylotree.branch_length_accessor(edge.target);

    if (bl !== undefined) {
      var haz_title = container.selectAll("title");

      if (haz_title.empty()) {
        haz_title = container.append("title");
      }
      haz_title.text("Length = " + bl);
    } else {
      container.selectAll("title").remove();
    }

    if (this.edge_styler) {
      this.edge_styler(container, edge, transition);
    }

    return this.phylotree;

  }

  function reclassEdge(edge) {

    let class_var = css_classes["branch"];

    if (itemTagged(edge)) {
      class_var += " " + css_classes["tagged-branch"];
    }

    if (itemSelected(edge, this.selection_attribute_name)) {
      class_var += " " + css_classes["selected-branch"];
    }

    return class_var;

  }

  function initializeEdgeLabels() {

    this.links.forEach(d => {

      // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
      if(d.target.data.annotation) {
        d.target[d.target.data.annotation] = d.target.data.annotation;
      }

    });

  }


  function syncEdgeLabels() {

    this.links.forEach(d => {

      // TODO: Move away from storing attribute data as root (BREAKS occasionally with d3>3)
      d[this.selection_attribute_name] =
        d.target[this.selection_attribute_name] || false;
      d.tag = d.target.tag || false;

    });

    if (this.countHandler()) {

      let counts = {};

      counts[
        this.selection_attribute_name
      ] = this.links.reduce((p, c) => {
        return p + (c[this.selection_attribute_name] ? 1 : 0);
      }, 0);

      counts["tagged"] = this.links.reduce(function(p, c) {
        return p + (itemTagged(c) ? 1 : 0);
      }, 0);

      this.countUpdate(this, counts, this.countHandler());

    }

  }

  function edgeVisible(edge) {
    return !(edge.target.hidden || edge.target.notshown || false);
  }

  function edgeCssSelectors(css_classes) {
    return [
      css_classes["branch"],
      css_classes["selected-branch"],
      css_classes["tagged-branch"]
    ].reduce(function(p, c, i, a) {
      return (p += "path." + c + (i < a.length - 1 ? "," : ""));
    }, "");
  }

  function placeAlongAnEdge (e, where) {
      return this.edge_placer (e, where);
  }

  var render_edges = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drawEdge: drawEdge,
    reclassEdge: reclassEdge,
    initializeEdgeLabels: initializeEdgeLabels,
    syncEdgeLabels: syncEdgeLabels,
    edgeVisible: edgeVisible,
    edgeCssSelectors: edgeCssSelectors,
    placeAlongAnEdge: placeAlongAnEdge
  });

  let d3_layout_phylotree_event_id = "phylotree.event";

  /**
   * Toggle collapsed view of a given node. Either collapses a clade into
   * a smaller blob for viewing large trees, or expands a node that was
   * previously collapsed.
   *
   * @param {Node} node The node to toggle.
   * @returns {Phylotree} The current ``phylotree``.
   */
  function toggleCollapse(node) {
    if (node.collapsed) {
      node.collapsed = false;

      let unhide = function(n) {
        if (!isLeafNode(n)) {
          if (!n.collapsed) {
            n.children.forEach(unhide);
          }
        }
        n.hidden = false;
      };

      unhide(node);
    } else {
      node.collapsed = true;
    }

    this.placenodes();
    return this;
  }

  function resizeSvg(tree, svg, tr) {

    let sizes = this.size;

    if (this.radial()) {
      let pad_radius = this.pad_width(),
        vertical_offset =
          this.options["top-bottom-spacing"] != "fit-to-size"
            ? this.pad_height()
            : 0;

      sizes = [
        sizes[1] + 2 * pad_radius,
        sizes[0] + 2 * pad_radius + vertical_offset
      ];

      if (svg) {
        svg
          .selectAll("." + css_classes["tree-container"])
          .attr(
            "transform",
            "translate (" +
              pad_radius +
              "," +
              (pad_radius + vertical_offset) +
              ")"
          );
      }
    } else {

      sizes = [
        sizes[0] +
          (this.options["top-bottom-spacing"] != "fit-to-size"
            ? this.pad_height()
            : 0),
        sizes[1] +
          (this.options["left-right-spacing"] != "fit-to-size"
            ? this.pad_width()
            : 0)
      ];

    }

    if (svg) {

      if (tr) {
        svg = svg.transition(100);
      }

      svg.attr("height", sizes[0]).attr("width", sizes[1]);

    }

    this.size = sizes;

    return sizes;

  }

  function rescale(scale, attr_name) {
    attr_name = attr_name || "y_scaled";
    if (attr_name in this) {
      this[attr_name] *= scale;
    }
  }

  function triggerRefresh(tree) {

    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["refresh", tree]
    });

    document.dispatchEvent(event);

  }

  function countUpdate(tree, counts) {
    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["countUpdate", counts, tree.countHandler()]
    });
    document.dispatchEvent(event);
  }

  function d3PhylotreeTriggerLayout(tree) {
    var event = new CustomEvent(d3_layout_phylotree_event_id, {
      detail: ["layout", tree, tree.layoutHandler()]
    });
    document.dispatchEvent(event);
  }

  function d3PhylotreeEventListener(event) {
    switch (event.detail[0]) {
      case "refresh":
        event.detail[1].refresh();
        break;
      case "countUpdate":
        event.detail[2](event.detail[1]);
        break;
      case "layout":
        event.detail[2](event.detail[1]);
    }
    return true;
  }

  function d3PhylotreeAddEventListener() {
    document.addEventListener(
      d3_layout_phylotree_event_id,
      d3PhylotreeEventListener,
      false
    );
  }

  function d3PhylotreeSvgTranslate(x) {
    if (x && (x[0] !== null || x[1] !== null))
      return (
        "translate (" +
        (x[0] !== null ? x[0] : 0) +
        "," +
        (x[1] !== null ? x[1] : 0) +
        ") "
      );

    return "";
  }

  function d3PhylotreeSvgRotate(a) {
    if (a !== null) {
      return "rotate (" + a + ") ";
    }
    return "";
  }

  var events = /*#__PURE__*/Object.freeze({
    __proto__: null,
    toggleCollapse: toggleCollapse,
    resizeSvg: resizeSvg,
    rescale: rescale,
    triggerRefresh: triggerRefresh,
    countUpdate: countUpdate,
    d3PhylotreeTriggerLayout: d3PhylotreeTriggerLayout,
    d3PhylotreeEventListener: d3PhylotreeEventListener,
    d3PhylotreeAddEventListener: d3PhylotreeAddEventListener,
    d3PhylotreeSvgTranslate: d3PhylotreeSvgTranslate,
    d3PhylotreeSvgRotate: d3PhylotreeSvgRotate
  });

  let d3_layout_phylotree_context_menu_id = "d3_layout_phylotree_context_menu";

  function nodeDropdownMenu(node, container, phylotree, options, event) {
    let menu_object = select(container)
      .select("#" + d3_layout_phylotree_context_menu_id);

    if (menu_object.empty()) {
      menu_object = select(container)
        .append("div")
        .attr("id", d3_layout_phylotree_context_menu_id)
        .attr("class", "dropdown-menu")
        .attr("role", "menu");
    }

    menu_object.selectAll("a").remove();
    menu_object.selectAll("h6").remove();
    menu_object.selectAll("div").remove();

    if (node) {
      if (
        !___namespace.some([
          Boolean(node.menu_items),
          options["hide"],
          options["selectable"],
          options["collapsible"]
        ]) ||
        !options["show-menu"]
      )
        return;
      if (!isLeafNode(node)) {
        if (options["collapsible"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text(isNodeCollapsed(node) ? "Expand Subtree" : "Collapse Subtree")
            .on("click", d => {
              menu_object.style("display", "none");
              this.toggleCollapse(node).update();
            });
          if (options["selectable"]) {
            menu_object.append("div").attr("class", "dropdown-divider");
            menu_object
              .append("h6")
              .attr("class", "dropdown-header")
              .text("Toggle selection");
          }
        }

        if (options["selectable"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All descendant branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, true, true)
              );
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All terminal branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, true, false)
              );
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("All internal branches")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection(
                phylotree.selectAllDescendants(node, false, true)
              );
            });
        }
      }

      if (node.parent) {
        if (options["selectable"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Incident branch")
            .on("click", function(d) {
              menu_object.style("display", "none");
              phylotree.modifySelection([node]);
            });

          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Path to root")
            .on("click", d => {
              menu_object.style("display", "none");
              this.modifySelection(this.phylotree.pathToRoot(node));
            });

          if (options["reroot"] || options["hide"]) {
            menu_object.append("div").attr("class", "dropdown-divider");
          }
        }

        if (options["reroot"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Reroot on this node")
            .on("click", d => {
              menu_object.style("display", "none");
              this.phylotree.reroot(node);
              this.update();
            });
        }

        if (options["hide"]) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text("Hide this " + (isLeafNode(node) ? "node" : "subtree"))
            .on("click", d => {
              menu_object.style("display", "none");
              this.modifySelection([node], "notshown", true, true)
                .updateHasHiddenNodes()
                .update();
            });
        }
      }

      if (hasHiddenNodes(node)) {
        menu_object
          .append("a")
          .attr("class", "dropdown-item")
          .attr("tabindex", "-1")
          .text("Show all descendant nodes")
          .on("click", function(d) {
            menu_object.style("display", "none");
            phylotree
              .modifySelection(
                phylotree.selectAllDescendants(node, true, true),
                "notshown",
                true,
                true,
                "false"
              )
              .updateHasHiddenNodes()
              .update();
          });
      }

      // now see if we need to add user defined menus

      var has_user_elements = [];
      if ("menu_items" in node && typeof node["menu_items"] === "object") {
        node["menu_items"].forEach(function(d) {
          if (d.length == 3) {
            if (!d[2] || d[2](node)) {
              has_user_elements.push([d[0], d[1]]);
            }
          }
        });
      }

      if (has_user_elements.length) {
        const show_divider_options = [
          options["hide"],
          options["selectable"],
          options["collapsible"]
        ];

        if (___namespace.some(show_divider_options)) {
          menu_object.append("div").attr("class", "dropdown-divider");
        }

        has_user_elements.forEach(function(d) {
          menu_object
            .append("a")
            .attr("class", "dropdown-item")
            .attr("tabindex", "-1")
            .text((d[0])(node)) // eslint-disable-line
            .on("click", ___namespace.partial(d[1], node));
        });
      }

      let tree_container = document.querySelector(container); // eslint-disable-line
      let rect = tree_container.getBoundingClientRect();
     
      menu_object
        .style("position", "absolute")
        .style("left", "" + (event.clientX - rect.x + 12 ) + "px")
        .style("top", "" + (event.clientY - rect.y ) + "px")
        .style("display", "block");
    } else {
      menu_object.style("display", "none");
    }

  }

  function addCustomMenu(node, name, callback, condition) {
    if (!("menu_items" in node)) {
      node["menu_items"] = [];
    }
    if (
      !node["menu_items"].some(function(d) {
        return d[0] == name && d[1] == callback && d[2] == condition;
      })
    ) {
      node["menu_items"].push([name, callback, condition]);
    }
  }

  /**
   *
   * Modify the current selection, via functional programming.
   *
   * @param {Function} node_selecter A function to apply to each node, which
   * determines whether they become part of the current selection. Alternatively,
   * if ``restricted-selectable`` mode is enabled, a string describing one of
   * the pre-defined restricted-selectable options.
   * @param {String} attr (Optional) The selection attribute to modify.
   * @param {Boolean} place (Optional) Whether or not ``placenodes`` should be called.
   * @param {Boolean} skip_refresh (Optional) Whether or not a refresh is called.
   * @param {String} mode (Optional) Can be ``"toggle"``, ``"true"``, or ``"false"``.
   * @returns The current ``this``.
   *
   */
  function modifySelection(
    node_selecter,
    attr,
    place,
    skip_refresh,
    mode
  ) {

    attr = attr || this.selection_attribute_name;
    mode = mode || "toggle";

    // check if node_selecter is a value of pre-defined selecters

    if (this.options["restricted-selectable"].length) {
      // the selection must be from a list of pre-determined selections
      if (___namespace.contains(___namespace.keys(predefined_selecters), node_selecter)) {
        node_selecter = predefined_selecters[node_selecter];
      } else {
        return;
      }
    }

    if (
      (this.options["restricted-selectable"] || this.options["selectable"]) &&
      !this.options["binary-selectable"]
    ) {
      var do_refresh = false;

      if (typeof node_selecter === "function") {
        this.links.forEach(function(d) {
          let select_me = node_selecter(d);
          d[attr] = d[attr] || false;
          if (d[attr] != select_me) {
            d[attr] = select_me;
            do_refresh = true;
            d.target[attr] = select_me;
          }
        });
      } else {
        node_selecter.forEach(function(d) {
          var new_value;
          switch (mode) {
            case "true":
              new_value = true;
              break;
            case "false":
              new_value = false;
              break;
            default:
              new_value = !d[attr];
              break;
          }

          if (d[attr] != new_value) {
            d[attr] = new_value;
            do_refresh = true;
          }
        });

        this.links.forEach(function(d) {
          d[attr] = d.target[attr];
        });
      }

      var counts;

      if (do_refresh) {
        if (!skip_refresh) {
          triggerRefresh(this);
        }
        if (this.countHandler) {
          counts = {};
          counts[attr] = this.links.reduce(function(p, c) {
            return p + (c[attr] ? 1 : 0);
          }, 0);
          countUpdate(this, counts, this.countHandler);
        }

        if (place) {
          this.placenodes();
        }
      }
    } else if (this.options["binary-selectable"]) {
      if (typeof node_selecter === "function") {
        this.links.forEach(function(d) {
          var select_me = node_selecter(d);
          d[attr] = d[attr] || false;

          if (d[attr] != select_me) {
            d[attr] = select_me;
            do_refresh = true;
            d.target[attr] = select_me;
          }

          this.options["attribute-list"].forEach(function(type) {
            if (type != attr && d[attr] === true) {
              d[type] = false;
              d.target[type] = false;
            }
          });
        });
      } else {
        node_selecter.forEach(function(d) {
          var new_value;
          new_value = !d[attr];

          if (d[attr] != new_value) {
            d[attr] = new_value;
            do_refresh = true;
          }
        });

        this.links.forEach(function(d) {
          d[attr] = d.target[attr];
          this.options["attribute-list"].forEach(function(type) {
            if (type != attr && d[attr] !== true) {
              d[type] = false;
              d.target[type] = false;
            }
          });
        });
      }

      if (do_refresh) {
        if (!skip_refresh) {
          triggerRefresh(this);
        }
        if (this.countHandler()) {
          counts = {};
          counts[attr] = this.links.reduce(function(p, c) {
            return p + (c[attr] ? 1 : 0);
          }, 0);
          this.countUpdate(this, counts, this.countHandler());
        }

        if (place) {
          this.placenodes();
        }
      }
    }

    if (this._selectionCallback && attr != "tag") {
      this._selectionCallback(this.getSelection());
    }

    this.refresh();
    this.update();
    return this;
  }

  /**
   * Get nodes which are currently selected.
   *
   * @returns {Array} An array of nodes that match the current selection.
   */
  function getSelection() {
    return selectAllDescendants(this.phylotree.getRootNode(), true, true).filter(d => {
      return d[this.selection_attribute_name];
    });
  }

  /**
   * Select all descendents of a given node, with options for selecting
   * terminal/internal nodes.
   *
   * @param {Node} node The node whose descendents should be selected.
   * @param {Boolean} terminal Whether to include terminal nodes.
   * @param {Boolean} internal Whther to include internal nodes.
   * @returns {Array} An array of selected nodes.
   */
  function selectAllDescendants(node, terminal, internal) {

    let selection = [];

    function sel(d) {
      if (isLeafNode(d)) {
        if (terminal) {
          if (d != node) selection.push(d);
        }
      } else {
        if (internal) {
          if (d != node) selection.push(d);
        }
        d.children.forEach(sel);
      }
    }

    sel(node);
    return selection;
  }

  /**
   * Getter/setter for the selection callback. This function is called
   * every time the current selection is modified, and its argument is
   * an array of nodes that make up the current selection.
   *
   * @param {Function} callback (Optional) The selection callback function.
   * @returns The current ``_selectionCallback`` if getting, or the current ``this`` if setting.
   */
  function selectionCallback(callback) {
    if (!callback) return this._selectionCallback;
    this._selectionCallback = callback;
    return this;
  }

  var menus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    nodeDropdownMenu: nodeDropdownMenu,
    addCustomMenu: addCustomMenu,
    modifySelection: modifySelection,
    getSelection: getSelection,
    selectAllDescendants: selectAllDescendants,
    selectionCallback: selectionCallback
  });

  // replacement for d3.functor
  function constant(x) {
    return function() {
      return x;
    };
  }

  class TreeRender {
    constructor(phylotree, options = {}) {
      initializeCssClasses(options['css-classes']);
      this.css_classes = css_classes;
      this.phylotree = phylotree;
      this.container = options.container;
      this.separation = function(_node, _previous) {
        return 0;
      };

      this._nodeLabel = this.defNodeLabel;
      this.svg = null;
      this._selectionCallback = null;
      this.scales = [1, 1];
      this.size = [1, 1];
      this.fixed_width = [14, 30];
      this.scale_bar_font_size = 12;

      this.draw_branch = draw_line;
      this.draw_scale_bar = null;
      this.edge_placer = lineSegmentPlacer;
      this.count_listener_handler = function() {};
      this.layout_listener_handler = function() {};
      this.node_styler = undefined;
      this.edge_styler = undefined;
      this.selection_attribute_name = "selected";
      this.right_most_leaf = 0;
      this.label_width = 0;
      this.radial_center = 0;
      this.radius = 1;
      this.radius_pad_for_bubbles = 0;
      this.rescale_nodeSpan = 1;
      this.relative_nodeSpan = function(_node) {
        return this.nodeSpan(_node) / this.rescale_nodeSpan;
      };

      let default_options = {
        layout: "left-to-right",
        logger: console,
        branches: "step",
        scaling: true,
        bootstrap: false,
        "color-fill": true,
        "font-size": 14,
        "internal-names": false,
        selectable: true,
        // restricted-selectable can take an array of predetermined
        // selecters that are defined in phylotree.predefined_selecters
        // only the defined functions will be allowed when selecting
        // branches
        "restricted-selectable": false,
        collapsible: true,
        "left-right-spacing": "fixed-step", //'fit-to-size',
        "top-bottom-spacing": "fixed-step",
        "left-offset": 0,
        "show-scale": "top",
        // currently not implemented to support any other positioning
        "draw-size-bubbles": false,
        "bubble-styler": this.radius_pad_for_bubbles,
        "binary-selectable": false,
        "is-radial": false,
        "attribute-list": [],
        "max-radius": 768,
        "annular-limit": 0.38196601125010515,
        compression: 0.2,
        "align-tips": false,
        "maximum-per-node-spacing": 100,
        "minimum-per-node-spacing": 2,
        "maximum-per-level-spacing": 100,
        "minimum-per-level-spacing": 10,
        node_circle_size: constant(3),
        transitions: null,
        brush: true,
        reroot: true,
        hide: true,
        "label-nodes-with-name": false,
        zoom: false,
        "show-menu": true,
        "show-labels": true,
        "node-styler": null,
        "edge-styler": null,
        "node-span": null
      };

      this.ensure_size_is_in_px = function(value) {
        return typeof value === "number" ? value + "px" : value;
      };

      this.options = ___namespace.defaults(options, default_options);

      this.font_size = this.options["font-size"];
      this.offsets = [0, this.font_size / 2];
      this.shown_font_size = this.font_size;

      this.width = this.options.width || 800;
      this.height = this.options.height || 600;

      this.node_styler = this.options['node-styler'];
      this.edge_styler = this.options['edge-styler'];

      this.nodeSpan = this.options['node-span'];

      if(!this.nodeSpan) {
        this.nodeSpan = function(_node) {
          return 1;
        };
      }

      this.rescale_nodeSpan =
        this.phylotree.nodes.children
          .map(d => {
            if (isLeafNode(d) || this.showInternalName(d))
              return this.nodeSpan(d);
          })
          .reduce(function(p, c) {
            return Math.min(c, p || 1e200);
          }, null) || 1;

      this.initialize_svg(this.container);
      this.links = this.phylotree.nodes.links();
      this.initializeEdgeLabels();
      this.update();
      d3PhylotreeAddEventListener();
    }

    pad_height() {
      if (this.draw_scale_bar) {
        return this.scale_bar_font_size + 25;
      }

      return 0;
    }

    pad_width() {
      // reset label_width
      this.label_width = this._label_width(this.shown_font_size);

      const _label_width = this.options["show-labels"] ? this.label_width : 0;
      return this.offsets[1] + this.options["left-offset"] + _label_width;
    }

    /**
     * Collapses a given node.
     *
     * @param {Node} node A node to be collapsed.
     */
    collapse_node(n) {
      if (!isNodeCollapsed(n)) {
        n.collapsed = true;
      }
    }

    /**
     * Get or set the size of tree in pixels.
     *
     * @param {Array} attr (optional) An array of the form ``[height, width]``.
     * @returns {Phylotree} The current ``size`` array if getting, or the current ``phylotree``
     * if setting.
     */
    set_size(attr) {
      if (!arguments.length) {
        return this.size;
      }

      let phylo_attr = attr;

      if (this.options["top-bottom-spacing"] != "fixed-step") {
        this.size[0] = phylo_attr[0];
      }
      if (this.options["left-right-spacing"] != "fixed-step") {
        this.size[1] = phylo_attr[1];
      }

      return this;
    }

    /**
     * Getter/setter for the SVG element for the Phylotree to be rendered in.
     *
     * @param {d3-selection} svg_element (Optional) SVG element to render within, selected by D3.
     * @returns The selected SVG element if getting, or the current ``phylotree`` if setting.`
     */
    initialize_svg(svg_element) {
      //if (!arguments.length) return this.svg;

      if (this.svg !== svg_element) {
        select(svg_element)
          .select("svg")
          .remove();

        this.svg = create$1("svg")
          .attr("width", this.width)
          .attr("height", this.height);

        this.set_size([this.height, this.width]);

        if (this.css_classes["tree-container"] == "phylotree-container") {
          this.svg.selectAll("*").remove();
          this.svg.append("defs");
        }

        select(this.container).on(
          "click",
          d => {
            this.handle_node_click(null);
          },
          true
        );
      }

      return this;
    }

    update_layout(new_json, do_hierarchy) {
      if (do_hierarchy) {
        this.nodes = hierarchy(new_json);
        this.nodes.each(function(d) {
          d.id = null;
        });
      }

      this.update();
      this.syncEdgeLabels();
    }

    /**
     * Update the current phylotree, i.e., alter the svg
     * elements.
     *
     * @param {Boolean} transitions (Optional) Toggle whether transitions should be shown.
     * @returns The current ``phylotree``.
     */
    update(transitions) {

      var self = this;

      //if (!this.svg) return this;

      this.placenodes();

      transitions = this.transitions(transitions);

      let node_id = 0;

      let enclosure = this.svg
        .selectAll("." + css_classes["tree-container"])
        .data([0]);

      enclosure = enclosure
        .enter()
        .append("g")
        .attr("class", css_classes["tree-container"])
        .merge(enclosure)
        .attr("transform", d => {
          return this.d3PhylotreeSvgTranslate([
            this.offsets[1] + this.options["left-offset"],
            this.pad_height()
          ]);
        });

      if (this.draw_scale_bar) {
        let scale_bar = this.svg
          .selectAll("." + css_classes["tree-scale-bar"])
          .data([0]);

        scale_bar
          .enter()
          .append("g")
          .attr("class", css_classes["tree-scale-bar"])
          .style("font-size", this.ensure_size_is_in_px(this.scale_bar_font_size))
          .merge(scale_bar)
          .attr("transform", d => {
            return this.d3PhylotreeSvgTranslate([
              this.offsets[1] + this.options["left-offset"],
              this.pad_height() - 10
            ]);
          })
          .call(this.draw_scale_bar);

        scale_bar.selectAll("text").style("text-anchor", "end");
      } else {
        this.svg.selectAll("." + css_classes["tree-scale-bar"]).remove();
      }

      enclosure = this.svg
        .selectAll("." + css_classes["tree-container"])
        .data([0]);

      this.updateCollapsedClades(transitions);

      let drawn_links = enclosure
        .selectAll(edgeCssSelectors(css_classes))
        .data(this.links.filter(edgeVisible), d => {
          return d.target.id || (d.target.id = ++node_id);
        });

      if (transitions) {
        drawn_links.exit().remove();
      } else {
        drawn_links.exit().remove();
      }

      drawn_links = drawn_links
        .enter()
        .insert("path", ":first-child")
        .merge(drawn_links)
        .each(function(d) {
          self.drawEdge(this, d, transitions);
        });

      let drawn_nodes = enclosure
        .selectAll(nodeCssSelectors(css_classes))
        .data(
          this.phylotree.nodes.descendants().filter(nodeVisible),
          d => {
            return d.id || (d.id = ++node_id);
          }
        );

      drawn_nodes.exit().remove();

      drawn_nodes = drawn_nodes
        .enter()
        .append("g")
        .attr("class", this.reclassNode)
        .merge(drawn_nodes)
        .attr("transform", d => {
          const should_shift =
            this.options["layout"] == "right-to-left" && isLeafNode(d);

          d.screen_x = xCoord(d);
          d.screen_y = yCoord(d);

          return this.d3PhylotreeSvgTranslate([
            should_shift ? 0 : d.screen_x,
            d.screen_y
          ]);
        })
        .each(function(d) {
          self.drawNode(this, d, transitions);
        })
        .attr("transform", d => {
          if (!___namespace.isUndefined(d.screen_x) && !___namespace.isUndefined(d.screen_y)) {
            return "translate(" + d.screen_x + "," + d.screen_y + ")";
          }
        });

      if (this.options["label-nodes-with-name"]) {
        drawn_nodes = drawn_nodes.attr("id", d => {
          return "node-" + d.name;
        });
      }

      this.resizeSvg(this.phylotree, this.svg, transitions);

      if (this.options["brush"]) {
        var brush$1 = enclosure
          .selectAll("." + css_classes["tree-selection-brush"])
          .data([0])
          .enter()
          .insert("g", ":first-child")
          .attr("class", css_classes["tree-selection-brush"]);

        var brush_object = brush()
          .on("brush", (event, d) => {
            var extent = event.selection,
              shown_links = this.links.filter(edgeVisible);
            var selected_links = shown_links
                .filter((d, i) => {
                  return (
                    d.source.screen_x >= extent[0][0] &&
                    d.source.screen_x <= extent[1][0] &&
                    d.source.screen_y >= extent[0][1] &&
                    d.source.screen_y <= extent[1][1] &&
                    d.target.screen_x >= extent[0][0] &&
                    d.target.screen_x <= extent[1][0] &&
                    d.target.screen_y >= extent[0][1] &&
                    d.target.screen_y <= extent[1][1]
                  );
                })
                .map(d => {
                  return d.target;
                });

            this.modifySelection(

              this.phylotree.links.map(d => {
                return d.target;
              }),
              "tag",
              false,
              selected_links.length > 0,
              "false"
            );

            this.modifySelection(selected_links, "tag", false, false, "true");

          })
          .on("end", () => {
            //brush.call(d3.event.target.clear());
          });

        brush$1.call(brush_object);
      }

      this.syncEdgeLabels();

      if (this.options["zoom"]) {
        let zoom$1 = zoom()
          .scaleExtent([0.1, 10])
          .on("zoom", (event) => {

            select("." + css_classes["tree-container"]).attr("transform", d => {
              let toTransform = event.transform;
              return toTransform;
            });

            // Give some extra room
            select("." + css_classes["tree-scale-bar"]).attr("transform", d => {
              let toTransform = event.transform;
              toTransform.y -= 10; 
              return toTransform;
            });
            
          });

        this.svg.call(zoom$1);
      }

      return this;
    }

    _handle_single_node_layout(
      a_node
    ) {
      let _nodeSpan = this.nodeSpan(a_node) / this.rescale_nodeSpan;
      // compute the relative size of nodes (0,1)
      // sum over all nodes is 1
      this.x = a_node.x =
        this.x +
        this.separation(this.last_node, a_node) +
        (this.last_span + _nodeSpan) * 0.5;
        
   
      // separation is a user-settable callback to add additional spacing on nodes
      this._extents[1][1] = Math.max(this._extents[1][1], a_node.y);
      this._extents[1][0] = Math.min(
        this._extents[1][0],
        a_node.y - _nodeSpan * 0.5
      );
      

      if (this.is_under_collapsed_parent) {
         this._extents[0][1] = Math.max(
          this._extents[0][1],
          this.save_x +
            (a_node.x - this.save_x) * this.options["compression"] +
            this.save_span +
            (_nodeSpan * 0.5 + this.separation(this.last_node, a_node)) *
              this.options["compression"]
        );      
      } else {
        this._extents[0][1] = Math.max(
          this._extents[0][1],
          this.x + _nodeSpan * 0.5 + this.separation(this.last_node, a_node)
        );
      }


      this.last_node = a_node;
      this.last_span = _nodeSpan;
      
    }

    tree_layout(a_node) {
      /**
              for each node: 
                  y: the y coordinate is root to tip
                      (left to right in cladogram layout, radius is radial layout
                  x : the x coordinate is top-most to bottom-most 
                      (top to bottom in cladogram layout, angle in radial layout)
                  
                  
           @return the x-coordinate of a_node or undefined in the node is not displayed
                   (hidden or under a collapsed node)
          */


      // do not layout hidden nodes
      if (nodeNotshown(a_node)) {
        return undefined;
      }

      let is_leaf = isLeafNode(a_node);

      // the next four members are radial layout options
      a_node.text_angle = null; // the angle at which text is being laid out
      a_node.text_align = null; // css alignment option for node labels
      a_node.radius = null; // radial layout radius
      a_node.angle = null; // radial layout angle (in radians)

      /** determine the root-to-tip location of this node;
              
        the root node receives the co-ordinate of 0
        
        if the tree has branch lengths, then the placement of each node is simply the 
        total branch length to the root
        
        if the tree has no branch lengths, all leaves get the same depth ("number of internal nodes on the deepest path")
        and all internal nodes get the depth in integer units of the # of internal nodes on the path to the root + 1
          
      */

      let undef_BL = false;

      /** _extents computes a bounding box for the tree (initially NOT in screen 
              coordinates)

          all account for node sizes

          _extents [1][0] -- the minimum x coordinate (breadth)
          _extents [1][1] -- the maximum y coordinate (breadth)
          _extents [1][0] -- the minimum y coordinate (root-to-tip, or depthwise)
          _extents [1][1] -- the maximum y coordinate (root-to-tip, or depthwise)

      */


      // last node laid out in the top bottom hierarchy

      if (a_node["parent"]) {
        if (this.do_scaling) {
          if (undef_BL) {
            return 0;
          }

          a_node.y = this.phylotree.branch_length_accessor(a_node);

          if (typeof a_node.y === "undefined") {
            undef_BL = true;
            return 0;
          }
          a_node.y += a_node.parent.y;
        } else {
          a_node.y = is_leaf ? this.max_depth : a_node.depth;
        }
      } else {
        this.x = 0.0;
        // the span of the last node laid out in the top to bottom hierarchy
        a_node.y = 0.0;
        this.last_node = null;
        this.last_span = 0.0;
        this._extents = [[0, 0], [0, 0]];
      }

      /** the next block has to do with top-to-bottom spacing of nodes **/

      if (is_leaf) {
        // displayed internal nodes are handled in `process_internal_node`
        this._handle_single_node_layout(
          a_node
        );
      }

      if (!is_leaf) {
        // for internal nodes
        if (
          isNodeCollapsed(a_node) &&
          !this.is_under_collapsed_parent
        ) {
          // collapsed node
          this.save_x = this.x;
          this.save_span = this.last_span * 0.5;
          this.is_under_collapsed_parent = true;
          this.process_internal_node(a_node);
          this.is_under_collapsed_parent = false;
   
          if (typeof a_node.x === "number") {
            a_node.x =
              this.save_x +
              (a_node.x -this.save_x) * this.options["compression"] +
              this.save_span;

            a_node.collapsed = [[a_node.x, a_node.y]];

            var map_me = n => {
              n.hidden = true;

              if (isLeafNode(n)) {            
                this.x = n.x =
                  this.save_x +
                  (n.x - this.save_x) * this.options["compression"] +
                  this.save_span;

                a_node.collapsed.push([n.x, n.y]);             
              } else {
                n.children.map(map_me);
              }
            };

            this.x = this.save_x;
            map_me(a_node);
           

            a_node.collapsed.splice(1, 0, [this.save_x, a_node.y]);
            a_node.collapsed.push([this.x, a_node.y]);
            a_node.collapsed.push([a_node.x, a_node.y]);
            a_node.hidden = false;
          }
        } else {
          // normal node, or under a collapsed parent
          this.process_internal_node(a_node);
        }
      }

      return a_node.x;
    }

    process_internal_node(a_node) {
      /** 
              decide if the node will be shown, and compute its top-to-bottom (breadthwise)
              placement 
          */

      let count_undefined = 0;

      if (this.showInternalName(a_node)) {
        // do in-order traversal to allow for proper internal node spacing
        // (x/2) >> 0 is integer division
        let half_way = (a_node.children.length / 2) >> 0;
        let displayed_children = 0;
        let managed_to_display = false;

        for (let child_id = 0; child_id < a_node.children.length; child_id++) {
          let child_x = this.tree_layout(a_node.children[child_id]);//.bind(this);

          if (typeof child_x == "number") {
            displayed_children++;
          }

          if (displayed_children >= half_way && !managed_to_display) {
            this._handle_single_node_layout(a_node);
            managed_to_display = true;
          }
        }

        if (displayed_children == 0) {
          a_node.notshown = true;
          a_node.x = undefined;
        } else {
          if (!managed_to_display) {
            this._handle_single_node_layout(a_node);
          }
        }
      } else {
        // postorder layout
        a_node.x = a_node.children
          .map(this.tree_layout.bind(this))
          .reduce((a, b) => {
            if (typeof b == "number") return a + b;
            count_undefined += 1;
            return a;
          }, 0.0);

        if (count_undefined == a_node.children.length) {
          a_node.notshown = true;
          a_node.x = undefined;
        } else {
          a_node.x /= a_node.children.length - count_undefined;
        }
      }
    }

    do_lr(at_least_one_dimension_fixed) {
      if (this.radial() && at_least_one_dimension_fixed) {
        this.offsets[1] = 0;
      }

      if (this.options["left-right-spacing"] == "fixed-step") {
        this.size[1] = this.max_depth * this.fixed_width[1];

        this.scales[1] = 
          (this.size[1] - this.offsets[1] - this.options["left-offset"]) /
          this._extents[1][1];

        this.label_width = this._label_width(this.shown_font_size);

        if (this.radial()) {
          this.label_width *= 2;
        }
      } else {
        this.label_width = this._label_width(this.shown_font_size);

        at_least_one_dimension_fixed = true;

        let available_width =
          this.size[1] - this.offsets[1] - this.options["left-offset"];

        if (available_width * 0.5 < this.label_width) {
          this.shown_font_size *= (available_width * 0.5) / this.label_width;
          this.label_width = available_width * 0.5;
        }

        this.scales[1] =
          (this.size[1] -
            this.offsets[1] -
            this.options["left-offset"] -
            this.label_width) /
          this._extents[1][1];
      }
    }

    /**
     * Place the current nodes, i.e., determine their coordinates based
     * on current settings.
     *
     * @returns The current ``phylotree``.
     */
    placenodes() {
      this._extents = [
        [0, 0],
        [0, 0]
      ];

      this.x = 0.0;
      this.last_span = 0.0;
      //let x = 0.0,
      //  last_span = 0;
      
      this.last_node = null;
      this.last_span = 0.0;

      (this.save_x = this.x), (this.save_span = this.last_span * 0.5);

      this.do_scaling = this.options["scaling"];
      let undef_BL = false;

      this.is_under_collapsed_parent = false;
      this.max_depth = 1;
      
      // Set initial x
      this.phylotree.nodes.x = this.tree_layout(
        this.phylotree.nodes,
        this.do_scaling
      );

      this.max_depth = max$1(this.phylotree.nodes.descendants(), n => {
        return n.depth;
      });

      if (this.do_scaling && undef_BL) {
        // requested scaling, but some branches had no branch lengths
        // redo layout without branch lengths
        this.do_scaling = false;
        this.phylotree.nodes.x = this.tree_layout(this.phylotree.nodes);
      }

      let at_least_one_dimension_fixed = false;

      this.draw_scale_bar = this.options["show-scale"] && this.do_scaling;

      // this is a hack so that phylotree.pad_height would return ruler spacing
      this.offsets[1] = Math.max(
        this.font_size,
        -this._extents[1][0] * this.fixed_width[0]
      );

      if (this.options["top-bottom-spacing"] == "fixed-step") {
        this.size[0] = this._extents[0][1] * this.fixed_width[0];
        this.scales[0] = this.fixed_width[0];
      } else {
        this.scales[0] = (this.size[0] - this.pad_height()) / this._extents[0][1];
        at_least_one_dimension_fixed = true;
      }

      this.shown_font_size = Math.min(this.font_size, this.scales[0]);

      if (this.radial()) {
        // map the nodes to polar coordinates
        this.draw_branch = ___namespace.partial(drawArc, this.radial_center);
        this.edge_placer = arcSegmentPlacer;

        let last_child_angle = null,
          last_circ_position = null,
          last_child_radius = null,
          min_radius = 0,
          effective_span = this._extents[0][1] * this.scales[0];

        let compute_distance = function(r1, r2, a1, a2, annular_shift) {
          annular_shift = annular_shift || 0;
          return Math.sqrt(
            (r2 - r1) * (r2 - r1) +
              2 *
                (r1 + annular_shift) *
                (r2 + annular_shift) *
                (1 - Math.cos(a1 - a2))
          );
        };

        let max_r = 0;

        this.phylotree.nodes.each(d => {
          let my_circ_position = d.x * this.scales[0];
          d.angle = (2 * Math.PI * my_circ_position) / effective_span;
          d.text_angle = d.angle - Math.PI / 2;
          d.text_angle = d.text_angle > 0 && d.text_angle < Math.PI;
          d.text_align = d.text_angle ? "end" : "start";
          d.text_angle = (d.text_angle ? 180 : 0) + (d.angle * 180) / Math.PI;
        });

        this.do_lr(at_least_one_dimension_fixed);

        this.phylotree.nodes.each(d => {
          d.radius = (d.y * this.scales[1]) / this.size[1];
          max_r = Math.max(d.radius, max_r);
        });

        let annular_shift = 0;

        this.phylotree.nodes.each(d => {
          if (!d.children) {
            let my_circ_position = d.x * this.scales[0];
            if (last_child_angle !== null) {
              let required_spacing = my_circ_position - last_circ_position,
                radial_dist = compute_distance(
                  d.radius,
                  last_child_radius,
                  d.angle,
                  last_child_angle,
                  annular_shift
                );

              let local_mr =
                radial_dist > 0
                  ? required_spacing / radial_dist
                  : 10 * this.options["max-radius"];

              if (local_mr > this.options["max-radius"]) {
                // adjust the annular shift
                let dd = required_spacing / this.options["max-radius"],
                  b = d.radius + last_child_radius,
                  c =
                    d.radius * last_child_radius -
                    (dd * dd -
                      (last_child_radius - d.radius) *
                        (last_child_radius - d.radius)) /
                      2 /
                      (1 - Math.cos(last_child_angle - d.angle)),
                  st = Math.sqrt(b * b - 4 * c);

                annular_shift = Math.min(
                  this.options["annular-limit"] * max_r,
                  (-b + st) / 2
                );
                min_radius = this.options["max-radius"];
              } else {
                min_radius = Math.max(min_radius, local_mr);
              }
            }

            last_child_angle = d.angle;
            last_circ_position = my_circ_position;
            last_child_radius = d.radius;
          }
        });

        this.radius = Math.min(
          this.options["max-radius"],
          Math.max(effective_span / 2 / Math.PI, min_radius)
        );

        if (at_least_one_dimension_fixed) {
          this.radius = Math.min(
            this.radius,
            (Math.min(effective_span, this._extents[1][1] * this.scales[1]) -
              this.label_width) *
              0.5 -
              this.radius * annular_shift
          );
        }

        this.radial_center = this.radius_pad_for_bubbles = this.radius;
        this.draw_branch = ___namespace.partial(drawArc, this.radial_center);

        let scaler = 1;

        if (annular_shift) {
          scaler = max_r / (max_r + annular_shift);
          this.radius *= scaler;
        }

        this.phylotree.nodes.each(d => {
          cartesianToPolar(
            d,
            this.radius,
            annular_shift,
            this.radial_center,
            this.scales,
            this.size
          );

          max_r = Math.max(max_r, d.radius);

          if (this.options["draw-size-bubbles"]) {
            this.radius_pad_for_bubbles = Math.max(
              this.radius_pad_for_bubbles,
              d.radius + this.nodeBubbleSize(d)
            );
          } else {
            this.radius_pad_for_bubbles = Math.max(
              this.radius_pad_for_bubbles,
              d.radius
            );
          }

          if (d.collapsed) {
            d.collapsed = d.collapsed.map(p => {
              let z = {};
              z.x = p[0];
              z.y = p[1];
              z = cartesianToPolar(
                z,
                this.radius,
                annular_shift,
                this.radial_center,
                this.scales,
                this.size
              );
              return [z.x, z.y];
            });

            let last_point = d.collapsed[1];

            d.collapsed = d.collapsed.filter(function(p, i) {
              if (i < 3 || i > d.collapsed.length - 4) return true;
              if (
                Math.sqrt(
                  Math.pow(p[0] - last_point[0], 2) +
                    Math.pow(p[1] - last_point[1], 2)
                ) > 3
              ) {
                last_point = p;
                return true;
              }
              return false;
            });
          }
        });

        this.size[0] = this.radial_center + this.radius / scaler;
        this.size[1] = this.radial_center + this.radius / scaler;
      } else {
  this.do_lr();

        this.draw_branch = draw_line;
        this.edge_placer = lineSegmentPlacer;
        this.right_most_leaf = 0;

        this.phylotree.nodes.each(d => {

          d.x *= this.scales[0];
          d.y *= this.scales[1]*.8;

          if (this.options["layout"] == "right-to-left") {   
            d.y = this._extents[1][1] * this.scales[1] - d.y;
          }


          if (isLeafNode(d)) {
            this.right_most_leaf = Math.max(
              this.right_most_leaf,
              d.y + this.nodeBubbleSize(d)
            );
          }

          if (d.collapsed) {
            d.collapsed.forEach(p => {
              p[0] *= this.scales[0];
              p[1] *= this.scales[1]*.8;
            });

            let last_x = d.collapsed[1][0];

            d.collapsed = d.collapsed.filter(function(p, i) {
              if (i < 3 || i > d.collapsed.length - 4) return true;
              if (p[0] - last_x > 3) {
                last_x = p[0];
                return true;
              }
              return false;
            });
          }
        });
      }

      if (this.draw_scale_bar) {
        let domain_limit, range_limit;

        if (this.radial()) {
          range_limit = Math.min(this.radius / 5, 50);
          domain_limit = Math.pow(
            10,
            Math.ceil(
              Math.log((this._extents[1][1] * range_limit) / this.radius) /
                Math.log(10)
            )
          );
          

          range_limit = domain_limit * (this.radius / this._extents[1][1]);

          if (range_limit < 30) {
            let stretch = Math.ceil(30 / range_limit);
            range_limit *= stretch;
            domain_limit *= stretch;
          }
        } else {
          domain_limit = this._extents[1][1];

          range_limit =
            this.size[1] - this.offsets[1] - this.options["left-offset"] - this.shown_font_size;
       }

        let scale = linear()
            .domain([0, domain_limit])
            .range([0, range_limit]),
           
            scaleTickFormatter = format$1(".2f");

        this.draw_scale_bar = axisTop()
          .scale(scale)
          .tickFormat(function(d) {
            if (d === 0) {
              return "";
            }
            return scaleTickFormatter(d);
          });

        if (this.radial()) {
          this.draw_scale_bar.tickValues([domain_limit]);
        } else {
          let round = function(x, n) {
            return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
          };

          let my_ticks = scale.ticks();
          my_ticks = my_ticks.length > 1 ? my_ticks[1] : my_ticks[0];

          this.draw_scale_bar.ticks(
            Math.min(
              10,
              round(
                range_limit /
                  (this.shown_font_size *
                    scaleTickFormatter(my_ticks).length *
                    2),
                0
              )
            )
          );
        }
      } else {
        this.draw_scale_bar = null;
      }

      return this;
    }

    /**
     * Get or set spacing in the x-direction.
     *
     * @param {Number} attr (Optional), the new spacing value if setting.
     * @param {Boolean} skip_render (Optional), whether or not a refresh should be performed.
     * @returns The current ``spacing_x`` value if getting, or the current ``phylotree`` if setting.
     */
    spacing_x(attr, skip_render) {
      if (!arguments.length) return this.fixed_width[0];

      if (
        this.fixed_width[0] != attr &&
        attr >= this.options["minimum-per-node-spacing"] &&
        attr <= this.options["maximum-per-node-spacing"]
      ) {
        this.fixed_width[0] = attr;
        if (!skip_render) {
          this.placenodes();
        }
      }

      return this;
    }

    /**
     * Get or set spacing in the y-direction.
     *
     * @param {Number} attr (Optional), the new spacing value if setting.
     * @param {Boolean} skip_render (Optional), whether or not a refresh should be performed.
     * @returns The current ``spacing_y`` value if getting, or the current ``phylotree`` if setting.
     */
    spacing_y(attr, skip_render) {
      if (!arguments.length) return this.fixed_width[1];

      if (
        this.fixed_width[1] != attr &&
        attr >= this.options["minimum-per-level-spacing"] &&
        attr <= this.options["maximum-per-level-spacing"]
      ) {
        this.fixed_width[1] = attr;
        if (!skip_render) {
          this.placenodes();
        }
      }
      return this;
    }

    _label_width(_font_size) {
      _font_size = _font_size || this.shown_font_size;
      let width = 0;

      this.phylotree.nodes
        .descendants()
        .filter(nodeVisible)
        .forEach(node => {
          let node_width = 12 + this._nodeLabel(node).length * _font_size * 0.8;

          if (node.angle !== null) {
            node_width *= Math.max(
              Math.abs(Math.cos(node.angle)),
              Math.abs(Math.sin(node.angle))
            );
          }
          width = Math.max(node_width, width);
        });

      return width;
    }

    /**
     * Get or set font size.
     *
     * @param {Function} attr Empty if getting, or new font size if setting.
     * @returns The current ``font_size`` accessor if getting, or the current ``phylotree`` if setting.
     */
    font_size(attr) {
      if (!arguments.length) return this.font_size;
      this.font_size = attr === undefined ? 12 : attr;
      return this;
    }

    scale_bar_font_size(attr) {
      if (!arguments.length) return this.scale_bar_font_size;
      this.scale_bar_font_size = attr === undefined ? 12 : attr;
      return this;
    }

    node_circle_size(attr, attr2) {
      if (!arguments.length) return this.options["node_circle_size"];
      this.options["node_circle_size"] = constant(attr === undefined ? 3 : attr);
      return this;
    }

    css(opt) {
      if (arguments.length === 0) return this.css_classes;

      if (arguments.length > 2) {
        var arg = {};
        arg[opt[0]] = opt[1];
        return this.css(arg);
      }

      for (var key in css_classes) {
        if (key in opt && opt[key] != css_classes[key]) {
          css_classes[key] = opt[key];
        }
      }

      return this;
    }

    transitions(arg) {
      if (arg !== undefined) {
        return arg;
      }

      if (this.options["transitions"] !== null) {
        return this.options["transitions"];
      }

      return this.phylotree.nodes.descendants().length <= 300;
    }

    /**
     * Get or set CSS classes.
     *
     * @param {Object} opt Keys are the CSS class to toggle and values are
     * the parameters for that CSS class.
     * @param {Boolean} run_update (optional) Whether or not the tree should update.
     * @returns The current ``phylotree``.
     */
    css_classes(opt, run_update) {
      if (!arguments.length) return this.css_classes;

      let do_update = false;

      for (var key in css_classes) {
        if (key in opt && opt[key] != this.css_classes[key]) {
          do_update = true;
          this.css_classes[key] = opt[key];
        }
      }

      if (run_update && do_update) {
        this.layout();
      }

      return this;
    }

    /**
     * Lay out the tree within the SVG.
     *
     * @param {Boolean} transitions Specify whether or not transitions should occur.
     * @returns The current ``phylotree``.
     */
    layout(transitions) {
      if (this.svg) {
        this.svg.selectAll(
          "." +
            this.css_classes["tree-container"] +
            ",." +
            this.css_classes["tree-scale-bar"] +
            ",." +
            this.css_classes["tree-selection-brush"]
        );

        //.remove();
        this.d3PhylotreeTriggerLayout(this);
        return this.update();
      }

      this.d3PhylotreeTriggerLayout(this);
      return this;
    }

    handle_node_click(node, event) {
      this.nodeDropdownMenu(node, this.container, this, this.options, event);
    }

    refresh() {
      if (this.svg) {
        // for re-entrancy
        let enclosure = this.svg.selectAll(
          "." + this.css_classes["tree-container"]
        );

        let edges = enclosure
          .selectAll(edgeCssSelectors(this.css_classes))
          .attr("class", this.reclassEdge.bind(this));

        if (this.edge_styler) {
          edges.each(d => {
            this.edge_styler(select(this), d);
          });
        }

        //let nodes = this.enclosure
        //  .selectAll(inspector.nodeCssSelectors(this.css_classes))
        //  .attr("class", this.phylotree.reclassNode);

        //if (this.node_styler) {
        //  nodes.each(function(d) {
        //    this.node_styler(d3.select(this), d);
        //  });
        //}
      }

      return this;
    }

    countHandler(attr) {
      if (!arguments.length) return this.count_listener_handler;
      this.count_listener_handler = attr;
      return this;
    }

    /**
     * Get or set node styler. If setting, pass a function of two arguments,
     * ``element`` and ``data``. ``data`` exposes the underlying node so that
     * its attributes can be referenced. These can be used to apply styles to
     * ``element``, which will be a D3 selection corresponding to the SVG element
     * that makes up the current node.
     * ``transition`` is the third argument which indicates that there is an ongoing
     * d3 transition in progress
     *
     * @param {Function} attr - Optional; if setting, the node styler function to be set.
     * @returns The ``node_styler`` function if getting, or the current ``phylotree`` if setting.
     */
    style_nodes(attr) {
      if (!arguments.length) return this.node_styler;
      this.node_styler = attr;
      return this;
    }

    /**
     * Get or set edge styler. If setting, pass a function of two arguments,
     * ``element`` and ``data``. ``data`` exposes the underlying edge so that
     * its attributes can be referenced. These can be used to apply styles to
     * ``element``, which will be a D3 selection corresponding to the SVG element
     * that makes up the current edge.
     *
     * Note that, in accordance with the D3 hierarchy layout, edges will have
     * a ``source`` and ``target`` field, corresponding to the nodes that make up
     * up the associated branch.
     *
     * @param {Function} attr - Optional; if setting, the node styler function to be set.
     * @returns The ``edge_styler`` function if getting, or the current ``phylotree`` if setting.
     */
    style_edges(attr) {
      if (!arguments.length) return this.edge_styler;
      this.edge_styler = attr.bind(this);
      return this;
    }

    itemSelected(item, tag) {
      return item[tag] || false;
    }

    show() {
      return this.svg.node()
    }

  }

  ___namespace.extend(TreeRender.prototype, clades);
  ___namespace.extend(TreeRender.prototype, render_nodes);
  ___namespace.extend(TreeRender.prototype, render_edges);
  ___namespace.extend(TreeRender.prototype, events);
  ___namespace.extend(TreeRender.prototype, menus);
  ___namespace.extend(TreeRender.prototype, opt);

  function resortChildren(comparator, start_node, filter) {
    // ascending
    this.nodes
      .sum(function (d) {
        return d.value;
      })
      .sort(comparator);

    // if a tree is rendered in the DOM
    if (this.display) {
      this.display.update_layout(this.nodes);
      this.display.update();
    }

    return this;
  }

  /**
   * Return most recent common ancestor of a pair of nodes.
   * @returns An array of strings, comprising each tag that was read.
   */
  function mrca(mrca_nodes) {
    var mrca;

    mrca_nodes = mrca_nodes.map(function (mrca_node) {
      return typeof mrca_node == "string" ? mrca_node : mrca_node.data.name;
    });

    this.traverse_and_compute(function (node) {
      if (!node.children) {
        node.data.mrca = ___namespace.intersection([node.data.name], mrca_nodes);
      } else if (!node.parent) {
        if (!mrca) {
          mrca = node;
        }
      } else {
        node.data.mrca = ___namespace.union(
          ...node.descendants().map((child) => child.data.mrca)
        );
        if (!mrca && node.data.mrca.length == mrca_nodes.length) {
          mrca = node;
        }
      }
    });

    return mrca;
  }

  /**
   * An instance of a phylotree. Sets event listeners, parses tags, and creates links
   * that represent branches.
   *
   * @param {Object} nwk - A Newick string, PhyloXML string, or hierarchical JSON representation of a phylogenetic tree.
   * @param {Object} options
   * - boostrap_values
   * - type - format type
   * @returns {Phylotree} phylotree - itself, following the builder pattern.
   */
  let Phylotree = class {
    constructor(nwk, options = {}) {
      this.newick_string = "";

      this.nodes = [];
      this.links = [];
      this.parsed_tags = [];
      this.partitions = [];
      this.branch_length_accessor = defBranchLengthAccessor;
      this.branch_length = defBranchLengthAccessor;
      this.logger = options.logger || console;
      this.selection_attribute_name = "selected";

      // initialization
      var type = options.type || undefined,
        _node_data = [],
        self = this;

      // If the type is a string, check the parser_registry
      if (___namespace.isString(type)) {
        if (type in format_registry) {
          _node_data = format_registry[type](nwk, options);
        } else {
          // Hard failure
          self.logger.error(
            "type " +
              type +
              " not in registry! Available types are " +
              ___namespace.keys(format_registry)
          );
        }
      } else if (___namespace.isFunction(type)) {
        // If the type is a function, try executing the function
        try {
          _node_data = type(nwk, options);
        } catch (e) {
          // Hard failure
          self.logger.error("Could not parse custom format!");
        }
      } else {
        // this builds children and links;
        if (nwk.name == "root") {
          // already parsed by phylotree.js
          _node_data = { json: nwk, error: null };
        } else if (typeof nwk != "string") {
          // old default
          _node_data = nwk;
        } else if (nwk.contentType == "application/xml") {
          // xml
          _node_data = phyloxml_parser(nwk);
        } else {
          // newick string
          this.newick_string = nwk;
          _node_data = newickParser(nwk, options);
        }
      }

      if (!_node_data["json"]) {
        self.nodes = [];
      } else {
        self.nodes = hierarchy(_node_data.json);

        // Parse tags
        let _parsed_tags = {};

        self.nodes.each((node) => {
          if (node.data.annotation) {
            _parsed_tags[node.data.annotation] = true;
          }
        });

        self.parsed_tags = Object.keys(_parsed_tags);
      }

      self.links = self.nodes.links();

      // If no branch lengths are supplied, set all to 1
      if (!this.hasBranchLengths()) {
        console.warn(
          "Phylotree User Warning : NO BRANCH LENGTHS DETECTED, SETTING ALL LENGTHS TO 1"
        );
        this.setBranchLength((x) => 1);
      }

      return self;
    }

    /*
      Export the nodes of the tree with all local keys to JSON
      The return will be an array of nodes in the specified traversal_type
      ('post-order' : default, 'pre-order', or 'in-order')
      with parents and children referring to indices in that array

    */
    json(traversal_type) {
      var index = 0;

      this.traverse_and_compute(function (n) {
        n.json_export_index = index++;
      }, traversal_type);

      var node_array = new Array(index);

      index = 0;

      this.traverse_and_compute(function (n) {
        let node_copy = ___namespace.clone(n);
        delete node_copy.json_export_index;

        if (n.parent) {
          node_copy.parent = n.parent.json_export_index;
        }

        if (n.children) {
          node_copy.children = ___namespace.map(n.children, function (c) {
            return c.json_export_index;
          });
        }
        node_array[index++] = node_copy;
      }, traversal_type);

      this.traverse_and_compute(function (n) {
        delete n.json_export_index;
      }, traversal_type);

      return JSON.stringify(node_array);
    }

    /*
     * Traverse the tree in a prescribed order, and compute a value at each node.
     *
     * @param {Function} callback A function to be called on each node.
     * @param {String} traversal_type Either ``"pre-order"`` or ``"post-order"`` or ``"in-order"``.
     * @param {Node} root_node start traversal here, if provided, otherwise start at root
     * @param {Function} backtrack ; if provided, then at each node n, backtrack (n) will be called,
                                     and if it returns TRUE, traversal will NOT continue past into this
                                     node and its children
     */
    traverse_and_compute(callback, traversal_type, root_node, backtrack) {
      traversal_type = traversal_type || "post-order";

      function post_order(node) {
        if (___namespace.isUndefined(node)) {
          return;
        }

        postOrder(node, callback, backtrack);
      }

      function pre_order(node) {
        preOrder(node, callback, backtrack);
      }

      function in_order(node) {
        inOrder(node, callback, backtrack);
      }

      if (traversal_type == "pre-order") {
        traversal_type = pre_order;
      } else {
        if (traversal_type == "in-order") {
          traversal_type = in_order;
        } else {
          traversal_type = post_order;
        }
      }

      traversal_type(root_node ? root_node : this.nodes);

      return this;
    }

    get_parsed_tags() {
      return this.parsed_tags;
    }

    update(json) {
      // update with new hiearchy layout
      this.nodes = json;
    }

    // Warning : Requires DOM!
    render(options) {
      this.display = new TreeRender(this, options);
      return this.display;
    }
  };

  Phylotree.prototype.isLeafNode = isLeafNode;
  Phylotree.prototype.selectAllDescendants = selectAllDescendants$1;
  Phylotree.prototype.mrca = mrca;
  Phylotree.prototype.hasBranchLengths = hasBranchLengths;
  Phylotree.prototype.getBranchLengths = getBranchLengths;
  Phylotree.prototype.branchName = branchName;
  Phylotree.prototype.normalizeBranchLengths = normalize;
  Phylotree.prototype.scaleBranchLengths = scale;
  Phylotree.prototype.getNewick = getNewick;
  Phylotree.prototype.resortChildren = resortChildren;
  Phylotree.prototype.setBranchLength = setBranchLength;
  Phylotree.prototype.maxParsimony = maxParsimony;

  Phylotree.prototype.getTipLengths = getTipLengths;
  Phylotree.prototype.leftChildRightSibling = leftChildRightSibling;

  ___namespace.extend(Phylotree.prototype, node_operations);
  ___namespace.extend(Phylotree.prototype, rooting);
  ___namespace.extend(Phylotree.prototype, nexus);

  /*
   *  given a tree, this function will compute quantities required to work with 
   *  all v all pairwise distances (like in COT) 
   *
   *  @param   tree the tree object
   *  @returns leaf count
   *
   */
  function computePairwiseDistances(tree) {
    /*
     *    traverse the tree and populate the following values in each node
     *        
     *        .cot_computed_length -> for each node (except the root), the current branch length 
     *                                (so as to not compute them each time via a callback) 
     *        .cot_leaf_index      -> post_order traversal order of a leaf (0 to number of leaves - 1)
     *        
     *        for each node
     *        
     *        .cot_path_to_leaves_below   
     *                             -> a dictionary that maps a leaf index to the total path length from this node
     *                                to each of the descendant leaves, EXCLUDING the length of this branch
     *
     *        .cot_path_to_leaves_above   
     *                             -> a dictionary that maps a leaf index to the total path length from this node
     *                                to each of the leaves outside the split defined by this node, EXCLUDING
     *                                the length of this branch
     */

    var bl = tree.branch_length_accessor;

    if (!bl) {
      throw "A non-null branch lengths accessor function is required for this operation";
    }

    var leaf_count = 0;

    tree.traverse_and_compute(function(n) {
      n.cot_computed_length = bl(n);

   
      if (n.parent && ___namespace.isUndefined(n.cot_computed_length)) {
        throw "Non-null branch lengths are required for this operation: missing branch length at node " + n.data.name;
      }

      if (tree.isLeafNode(n)) {
        n.cot_leaf_index = leaf_count++;
        n.cot_path_to_leaves_below = {};
        n.cot_path_to_leaves_below[n.cot_leaf_index] = 0;
        n.cot_path_to_leaves_above = {};
      } else {
        n.cot_path_to_leaves_below = {};
        n.cot_path_to_leaves_above = {};
      }
    });

    // populate all cot_path_to_leaves_below
    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        ___namespace.each(n.cot_path_to_leaves_below, function(length_so_far, leaf_index) {
          n.parent.cot_path_to_leaves_below[leaf_index] =
            length_so_far + n.cot_computed_length;
        });
      }
    });

    // populate all cot_path_to_leaves_above; this is done via a 'pre-order' traversal
    // handle root node first
    var root_node = tree.getRootNode();

    function CopyFromSiblings(a_node) {
      for (var this_node = 0; this_node < a_node.children.length; this_node++) {
        for (
          var other_node = 0;
          other_node < a_node.children.length;
          other_node++
        ) {
          if (this_node != other_node) {
            ___namespace.each(a_node.children[other_node].cot_path_to_leaves_below, function(
              length,
              index
            ) {
              if (a_node.children[this_node].cot_path_to_leaves_above) {
                a_node.children[this_node].cot_path_to_leaves_above[index] =
                  length + a_node.children[other_node].cot_computed_length;
              }
            });
          }
        }
      }
    }

    CopyFromSiblings(root_node);

    // takes two passes

    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        // copy parent's 'above' nodes
        ___namespace.each(n.parent.cot_path_to_leaves_above, function(
          length_so_far,
          leaf_index
        ) {
          n.cot_path_to_leaves_above[leaf_index] =
            length_so_far + n.parent.cot_computed_length;
        });

        if (!tree.isLeafNode(n)) {
          CopyFromSiblings(n);
        }
        // copy sibling's 'below' nodes
      }
    }, "pre-order");

    return leaf_count;
  }

  /*
   * The Sackin's index is computed as the sum of the number of ancestors for each
   * tips of the tree.
   *
   * The less balanced a tree is, the larger its Sackin's index.
   *
   */

  function sackin(tree) {

    // Get tips of tree
    let tips = tree.getTips();

    // Count number of ancestors to root for each tree
    let depths = ___namespace.map(tips, d => { return d.depth });

    return ___namespace.reduce(depths, function(memo, num){ return memo + num; }, 0);

  }

  function centerOfTree(tree, power) {
    power = power || 2;

    var leaf_count = computePairwiseDistances(tree);

    var current_min = Number.MAX_VALUE,
      current_split = 0,
      current_location = null;

    if (power == 2) {
      tree.traverse_and_compute(function(n) {
        if (n.parent) {
          // can't consider the root
          var sum_below = 0,
            sum_below_squared = 0,
            sum_above = 0,
            sum_above_squared = 0;

          var count_below = 0;

          ___namespace.each(n.cot_path_to_leaves_below, function(l) {
            sum_below += l;
            sum_below_squared += l * l;
            count_below++;
          });

          ___namespace.each(n.cot_path_to_leaves_above, function(l) {
            sum_above += l;
            sum_above_squared += l * l;
          });

          var count_above = leaf_count - count_below;

          var tt =
            (sum_above - sum_below + n.cot_computed_length * count_above) /
            leaf_count;
          if (tt < 0) {
            tt = 0;
          } else if (tt > n.cot_computed_length) {
            tt = n.cot_computed_length;
          }

          var score =
            sum_above_squared +
            sum_below_squared +
            2 * (sum_above * (n.cot_computed_length - tt) + sum_below * tt) +
            count_below * tt * tt +
            (n.cot_computed_length - tt) *
              (n.cot_computed_length - tt) *
              count_above;

          if (score < current_min) {
            current_location = n;
            current_split = tt / n.cot_computed_length; //n.cot_computed_length-tt;//1 - tt / n.cot_computed_length;
            current_min = score;
          }

          delete n.cot_computed_length;
          delete n.cot_path_to_leaves_below;
          delete n.cot_path_to_leaves_above;
          delete n.cot_leaf_index;
        }
      });
    } else {
      // in the general case try a simple grid optimization
      tree.traverse_and_compute(function(n) {
        if (n.parent) {
          // can't consider the root

          var optimization_step =
              n.cot_computed_length > 0.0 ? n.cot_computed_length * 0.05 : 0.1,
            current_t = 0;

          while (current_t < n.cot_computed_length) {
            var score = 0.0;

            ___namespace.each(n.cot_path_to_leaves_below, function(l) {
              score += Math.pow(l + current_t, power);
            });

            ___namespace.each(n.cot_path_to_leaves_above, function(l) {
              score += Math.pow(l + (n.cot_computed_length - current_t), power);
            });

            if (score < current_min) {
              current_location = n;
              current_split = current_t / n.cot_computed_length; //n.cot_computed_length-tt;//1 - tt / n.cot_computed_length;
              current_min = score;
            }
            current_t += optimization_step;
          }
        }
      });
    }

    return {
      location: current_location,
      breakpoint: current_split,
      distance: current_min
    };
  }

  /**
   * Compute midpoint of a phylogenetic tree
   * 
   * @param {Object} tree -- the phylotree.js tree object 
   * @return {Object} the calculated midpoint to root on
   *  { location: root_node, breakpoint: 0 }
   *
   */
  function computeMidpoint(tree) {
    if (!tree.hasBranchLengths()) {
      throw "Center of tree calculation cannot be performed on trees that do not have fully specified branch lengths";
    }

    var bl = tree.branch_length;

    tree.traverse_and_compute(function(node) {
      if (node.parent) {
        var my_longest_path_length = bl(node);
        var my_longest_path_terminus;

        if (tree.isLeafNode(node)) {
          my_longest_path_terminus = node;
          node.max_path = 0;
          node.max_path_terminus = node;
        } else {
          my_longest_path_length += node.max_path;
          my_longest_path_terminus = node.max_path_terminus;
        }

        if (
          !node.parent.max_path ||
          node.parent.max_path < my_longest_path_length
        ) {
          node.parent.max_path = my_longest_path_length;
          node.parent.max_path_terminus = my_longest_path_terminus;
        }
      }
    });

    var root_node = tree.getRootNode();
    var longest_path_length = 0;

    root_node.children.forEach(function(root_child) {
      if (root_child.max_path_terminus !== root_node.max_path_terminus) {
        var pl = root_child.max_path + bl(root_child);
        if (pl >= longest_path_length) {
          longest_path_length = pl;
        }
      }
    });

    if (root_node.max_path > longest_path_length) {
      // not already midpoint rooted
      longest_path_length = (longest_path_length + root_node.max_path) * 0.5;

      // start traversing up from the deepest leaf to the root, until we find the
      // half-way point

      var root_on = root_node.max_path_terminus;

      while (true) {
        var current_bl = bl(root_on);
        //console.log (current_bl, longest_path_length);
        if (current_bl <= longest_path_length) {
          longest_path_length -= current_bl;
          root_on = root_on.parent;
        } else {
          //console.log ("Rooting on ", root_on, longest_path_length[0], current_bl);

          return {
            location: root_on,
            breakpoint: longest_path_length / current_bl
          };

          //console.log ("Longest " + root_path (tree.getNodeByName(root_node.max_path_terminus.name)));
          //console.log ("Second longest " + root_path (tree.getNodeByName(longest_path_length[1].name)));
        }
      }
    }
    return { location: root_node, breakpoint: 0 };
  }

  function annotateCopyNumber(tree) {
    tree.traverse_and_compute(function(node) {
      if (tree.isLeafNode(node)) {
        node.data.copy_number = 1;
      }
    });
  }

  // internal function used by best root fitting
  function computeRootToTipOtherRoot(
    tree,
    node,
    coming_from,
    shared_distance,
    distance_to_new_root
  ) {

    var my_bl = tree.branch_length(node);

    var go_up = false;

    if (!coming_from) {
      shared_distance = node.data.rootToTip;
      distance_to_new_root = 0;
      go_up = true;
    }

    if (node.children) {
      for (var c = 0; c < node.children.length; c++) {
        if (node.children[c] != coming_from) {
          computeRootToTipOtherRoot(
            tree,
            node.children[c],
            node,
            shared_distance,
            distance_to_new_root
          );
        } else {
          go_up = true;
        }
      }
    }

    node.data.rtta = node.data.rootToTip - shared_distance + distance_to_new_root;

    if (go_up) {
      shared_distance -= my_bl;
      distance_to_new_root += my_bl;
    }

    if (node.parent && go_up) {
      computeRootToTipOtherRoot(
        tree,
        node.parent,
        node,
        shared_distance,
        distance_to_new_root
      );
    }
  }

  function fitRootToTip(tree) {

    var linear_data = [],
      max_r2 = 0,
      best_node = 0;

    annotateCopyNumber(tree);
    rootToTip(tree);

    // To return if best node is the root already
    tree.traverse_and_compute(function(node) {
      if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {
        linear_data.push([node.data.decimal_date_value, node.data.rtta, node.data.copy_number]);
      }
    });

    let best_fit = linearFit(linear_data);

    tree.traverse_and_compute(function(node) {

      if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {

        computeRootToTipOtherRoot(tree, node, null, 0, 0);

        linear_data = [];

        tree.traverse_and_compute(function(node) {
          if (tree.isLeafNode(node) && !___namespace.isNull(node.data.decimal_date_value)) {
            linear_data.push([
              node.data.decimal_date_value,
              node.data.rtta,
              node.data.copy_number
            ]);
          }
        });

        var fit = linearFit(linear_data),
          r2 = fit["r2"];

        if (r2 > max_r2) {
          max_r2 = r2;
          best_node = node;
          best_fit = fit;
        }

      }
    });

    return { root: best_node, fit: best_fit };

  }

  // linear fit of root to tip distances
  function linearFit(data) {

    var ss = data.reduce(function(p, c) {
        return c[2] + p;
      }, 0), // sample count
      sx = data.reduce(function(p, c) {
        return c[2] * c[0] + p;
      }, 0), // sum X
      sy = data.reduce(function(p, c) {
        return c[2] * c[1] + p;
      }, 0), // sum Y
      sxoss = sx / ss,
      syoss = sy / ss;

    var fitB = 0,
      st2 = 0,
      vary = 0;

    data.forEach(function(point) {
      var t = point[0] - sxoss;
      st2 += point[2] * t * t;
      fitB += point[2] * t * point[1];
      vary += point[2] * (point[1] - syoss) * (point[1] - syoss);
    });

    fitB /= st2;

    var a = (sy - sx * fitB) / ss;

    var varres = 0;

    data.forEach(function(point) {
      var t = point[1] - a - fitB * point[0];
      varres += point[2] * t * t;
    });

    return {
      intercept: a,
      slope: fitB,
      r2: 1 - varres / vary,
      "var (intercept)": Math.sqrt((1 + sx * sx / (ss * st2)) / ss),
      "var (slope)": Math.sqrt(1 / st2)
    };
  }

  /**
   *   fast and memory efficient root to tip distance calculator
   *   for each leaf node stores the current root to tip distance in 
   *   the node.rootToTip field
   *   
   *   @param tree
   *   @return tree with rootToTip computed
   *
   */
  function rootToTip(tree) {

    var bl = tree.branch_length_accessor,
      index = 0;

    tree.traverse_and_compute(n => {
      if (n.parent) {
        n.data._computed_length = bl(n);
        if (!___namespace.isNumber(n.data._computed_length)) {
          throw "rootToTip cannot be run on trees with missing branch lengths";
        }
      }
      if (tree.isLeafNode(n)) {
        n.data.leaf_index = index++;
      }
      if ("r2t" in n.data) {
        delete n.data.r2t;
      }
    });

    tree.traverse_and_compute(n => {
      if (n.parent) {
        if (!("r2t" in n.parent.data)) {
          n.parent.data.r2t = {};
        }
        if (tree.isLeafNode(n)) {
          n.parent.data.r2t[n.data.leaf_index] = n.data._computed_length;
        } else {
          ___namespace.each(n.data.r2t, function(v, idx) {
            n.parent.data.r2t[idx] = v + n.data._computed_length;
          });
          delete n.data.r2t;
        }
        delete n.data._computed_length;
      }
    });

    var r2t = tree.getRootNode().data.r2t;

    tree.traverse_and_compute(n => {
      if (tree.isLeafNode(n)) {
        n.data.rootToTip = r2t[n.data.leaf_index] || 0;
        delete n.data.leaf_index;
      }
    });

    delete tree.getRootNode().data.r2t;

    return tree;
  }

  const default_date_converter = timeParse("%Y%m%d");

  const default_regexp = /([0-9]{4}).?([0-9]{2}).?([0-9]{2})$/g;

  const default_date_getter = function(node) {
    if (isLeafNode(node)) {
      if ("name" in node) {
        let location = default_regexp.exec(node.name);
        if (location) {
          return location[1] + location[2] + location[3];
        }
      }
    }
    return null;
  };

  /*
   *  Extracts dates from nodes using a provided callback (defaults supplied),
   *  and also converts them to decimal dates; missing dates are allowed; if desired, missing dates 
   *  can throw exceptions 
   *  
   *  @param tree             : the tree object 
   *
   *  @param date_getter      : a function that extracts date strings from nodes (e.g. by parsing the name),
   *                            default is to extract from the end of the node name, using [YYYY] optional sep [MM] optional sep [DD] format;
   *                            default is implemented in phylotree_extensions.extract_dates.date_getter ()
   *                            
   *  @param date_converter   : if provided, will be used to parse the date string; default is %Y%m%d implemented in 
   *                            phylotree_extensions.extract_dates.date_converter
   *  
   *  
   *  @return tree with date-annotated nodes, i.e. each node will have
   *  
   *      n.date_value (date object, e.g. 2018-08-17); null for missing
   *      n.decimal_date_value (decimal object, e.g. 2018.72)
   *  
   */
  const extract_dates = function(tree, date_getter, date_converter=default_date_converter) {

    date_getter = date_getter || default_date_getter;
    
    tree.traverse_and_compute(function(n) {
      var d_string = date_getter(n);
      if (d_string) {
        try {
          n.data.date_value = date_converter(d_string);
          var full_year = n.data.date_value.getFullYear();
          var year_start = new Date(full_year, 0, 1),
            year_start_p1 = new Date(full_year + 1, 0, 1);

          n.data.decimal_date_value =
            full_year +
            (n.data.date_value - year_start) / (year_start_p1 - year_start);
          return;
        } catch (e) {
          // for conversion failures
        }
      }
      n.data.date_value = null;
      n.data.decimal_date_value = null;
    });

    return tree;
  };

  /**
   * Implements a linear time / space version of the Cluster picker algorithm
   * 
   * @param tree -- the tree object 
   * @param bootstrap_thresold -- value in [0,1] that sets the stringency of bootstrap support
   * @param diameter_threshold -- value >=0 that defines the maximum allowable pairwise distance in a cluster
   * @param root_node -- if specified, traverse the tree starting here (useful for only looking at parts of the tree),
   * tree root by default
   * @param missing_bootstrap_value -- if a branch is missing bootstrap support value, use this value instead
   *                   (1.0 by default)
   *                                 
   * @return an array of clusters, where cluster = 
   * \{
   *    'root'   : [root node of cluster],
   *    'members' : [list of leaf. nodes],
   *    'diameter' : max distance in the cluster,
   *    'bootstrap' : bootstrap support at the root node
   * \}                        
   */
  function clusterPicker(
    tree,
    bootstrap_threshold,
    diameter_threshold,
    root_node,
    missing_bootstrap_value
  ) {
    root_node = root_node || tree.getRootNode();
    missing_bootstrap_value = ___namespace.isNumber(missing_bootstrap_value)
      ? missing_bootstrap_value
      : 1;

    // perform a bottom-up pass of the tree
    // where each internal node will receive a floating point value
    // that stores the longest path from the internal node to any of its descendants,
    // the diameter of the cluster,  is then the sum of longest paths of all of its children
    let bl = tree.branch_length;

    // initialize member variables
    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        n._computed_length = bl(n);
        if (!___namespace.isNumber(n._computed_length)) {
          throw "clusterPicker cannot be run on trees with missing branch lengths";
        }
        n.max_path_length = 0;
      }
    });

    tree.traverse_and_compute(function(n) {
      if (n.parent) {
        n.parent.max_path_length = Math.max(
          n.parent.max_path_length,
          n.max_path_length + n._computed_length
        );
      }
    });

    var clusters = [];

    tree.traverse_and_compute(___namespace.noop, "pre-order", root_node, function(n) {
      if (!tree.isLeafNode(n)) {
        var bs = ___namespace.isString(n.data.bootstrap_values)
          ? +n.data.bootstrap_values
          : missing_bootstrap_value;

        if (bs >= bootstrap_threshold) {
          var my_diameter = ___namespace.reduce(
            n.children,
            function(c, n) {
              return n.max_path_length + n._computed_length + c;
            },
            0
          );

          if (my_diameter <= diameter_threshold) {
            clusters.push({ root: n, diameter: my_diameter, bootstrap: bs });
            return true;
          }
        }
      }

      return false;
    });

    // clean up member variables
    tree.traverse_and_compute(
      function(n) {
        if (n.parent) {
          delete n._computed_length;
          delete n.max_path_length;
        }
      },
      "post-order",
      root_node
    );

    ___namespace.each(clusters, function(cluster) {
      cluster["members"] = [];
      tree.traverse_and_compute(
        function(n) {
          if (tree.isLeafNode(n)) {
            cluster["members"].push(n);
          }
        },
        "post-order",
        cluster["root"]
      );
    });

    return clusters;
  }

  function phylopart(
    tree,
    bootstrap_threshold,
    percentile_threshold,
    missing_bootstrap_value,
    resolution
  ) {
    /** TODO SLKP 20180817 : this implementation does not compute pairwise distances correctly at the moment;
     instead it computes root-to-tip distances */
    missing_bootstrap_value = ___namespace.isNumber(missing_bootstrap_value)
      ? missing_bootstrap_value
      : 1;

    var leaf_count = computePairwiseDistances(tree);

    /** first, decide on the domain of branch lengths **/

    var core_node = tree.getRootNode().children[0];

    var min_bl = Number.MAX_VALUE,
      min_bl2 = Number.MAX_VALUE;

    if (!(percentile_threshold > 0 && percentile_threshold < 1)) {
      throw "Invalid percentile threshold in perform_phylopart";
    }

    tree.traverse_and_compute(function(n) {
      if (tree.isLeafNode(n)) {
        if (n.cot_computed_length < min_bl) {
          if (min_bl < min_bl2) {
            min_bl2 = min_bl;
          }
          min_bl = n.cot_computed_length;
        } else {
          if (n.cot_computed_length < min_bl2) {
            min_bl2 = n.cot_computed_length;
          }
        }
      }
    });

    min_bl += min_bl2;

    // pairwise distances are bounded below by the sum of two shortest terminal branches

    // compute the upper bound
    var max_path_length =
      ___namespace.reduce(
        core_node.cot_path_to_leaves_below,
        function(c, n) {
          return n > c ? n : c;
        },
        0
      ) +
      ___namespace.reduce(
        core_node.cot_path_to_leaves_above,
        function(c, n) {
          return n > c ? n : c;
        },
        0
      ) +
      core_node.cot_computed_length;

    var domain = max_path_length - min_bl;

    if (___namespace.isUndefined(resolution)) {
      resolution = Math.min(1e-3, domain / 100);
    }

    var number_of_bins = ((domain / resolution) >> 0) + 1;
    if (number_of_bins > 500) {
      number_of_bins = 500;
      resolution = domain / number_of_bins;
    }

    var root_node = tree.getRootNode();

    root_node.paths_to_leaves = new Array(leaf_count);

    ___namespace.each(root_node.children, function(cn) {
      ___namespace.each(root_node.cot_path_to_leaves_below, function(v, i) {
        root_node.paths_to_leaves[i] = v + cn.cot_computed_length;
      });
    });

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        n.histogram = new Array(number_of_bins);
        for (var i = 0; i < number_of_bins; i++) {
          n.histogram[i] = 0;
        }
        if (n.parent) {
          var index = 0;
          n.paths_to_leaves = [];
          ___namespace.each(n.cot_path_to_leaves_below, function(v, i) {
            n.paths_to_leaves[index++] = v;
          });
        }
      }
      delete n.cot_path_to_leaves_above;
      delete n.cot_path_to_leaves_below;
    });

    /**
          for each internal node, produce a histogram of pairwise distances on sequences that are defined 
          by the subtree at that node
          
          this could be approximated (I think), by merging histograms of children
      */

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        for (var n1 = 0; n1 < n.paths_to_leaves.length; n1++) {
          for (var n2 = n1 + 1; n2 < n.paths_to_leaves.length; n2++) {
            var sum = n.paths_to_leaves[n1] + n.paths_to_leaves[n2];
            n.histogram[((sum - min_bl) / resolution) >> 0]++;
          }
        }
        n.leaf_count = n.paths_to_leaves.length;

        delete n.paths_to_leaves;
      }
    });

    // compute the percentile distance cutoff

    var total_comparisons =
      (leaf_count - 1) * leaf_count / 2 * percentile_threshold;
    var bin_i = 0;
    for (
      ;
      bin_i < number_of_bins - 1 &&
      total_comparisons > root_node.histogram[bin_i];
      bin_i++
    ) {
      total_comparisons -= root_node.histogram[bin_i];
    }

    var median_threshold =
      min_bl +
      (bin_i +
        (root_node.histogram[bin_i] - total_comparisons) /
          root_node.histogram[bin_i]) *
        resolution;

    var clusters = [];

    tree.traverse_and_compute(___namespace.noop, "pre-order", null, function(n) {
      if (!tree.isLeafNode(n)) {
        var bs = ___namespace.isString(n.data.bootstrap_values)
          ? +n.data.bootstrap_values
          : missing_bootstrap_value;
        if (bs >= bootstrap_threshold) {
          var total_comparisons = n.leaf_count * (n.leaf_count - 1) * 0.25;

          var bin_i = 0;
          for (
            ;
            bin_i < number_of_bins - 1 && total_comparisons > n.histogram[bin_i];
            bin_i++
          ) {
            total_comparisons -= n.histogram[bin_i];
          }

          var my_median =
            min_bl +
            (bin_i +
              (n.histogram[bin_i] - total_comparisons) / n.histogram[bin_i]) *
              resolution;

          if (my_median <= median_threshold) {
            clusters.push({ root: n, median: my_median, bootstrap: bs });
            return true;
          }
        }
      }
      return false;
    });

    tree.traverse_and_compute(function(n) {
      if (!tree.isLeafNode(n)) {
        if ("histogram" in n) {
          delete n.histogram;
          delete n.leaf_count;
        }
      }
    });

    ___namespace.each(clusters, function(cluster) {
      cluster["members"] = [];
      tree.traverse_and_compute(
        function(n) {
          if (tree.isLeafNode(n)) {
            cluster["members"].push(n);
          }
        },
        "post-order",
        cluster["root"]
      );
    });

    return clusters;
  }

  function parseFasta(fastaData) {


    let sfasta = ___namespace$1.split(fastaData, "\n");

    let seqs = ___namespace$1.chain(sfasta)
      .map((d, i) => (d.startsWith(">") ? i : -1))
      .filter((d) => d != -1)
      .map((d, i, c) => ___namespace$1.slice(sfasta, c[i], c[i + 1]))
      .keyBy((d) => ___namespace$1.trim(d[0], ">"))
      .mapValues((d) => ___namespace$1.tail(d).join(""))
      .value();

    return seqs;

  }

  function remove(i, D) {
    let dNew = [];

    for (let j of ___namespace$1.range(D.length)) {
      if (j != i) {
        let dNewRow = [];
        for (let k of ___namespace$1.range(D[j].length)) {
          if (k != i) {
            dNewRow.push(D[j][k]);
          }
        }
        dNew.push(dNewRow);
      }
    }

    return dNew;
  }

  function getDPrime(distanceMatrix, totalDistances, N) {
    let DPrime = ___namespace$1.chunk(___namespace$1.fill(Array(N * N), 0), N);
    for (let i of ___namespace$1.range(N)) {
      for (let j of ___namespace$1.range(___namespace$1.parseInt(i) + 1, N)) {
        DPrime[i][j] =
          (N - 2) * distanceMatrix[i][j] - totalDistances[i] - totalDistances[j];
        DPrime[j][i] = DPrime[i][j];
      }
    }
    return DPrime;
  }

  function ijMinDPrime(dPrime, N) {
    let i = -1;
    let j = -1;
    let minD = Infinity;
    for (let ii of ___namespace$1.range(N)) {
      for (let jj of ___namespace$1.range(i, N)) {
        if (dPrime[ii][jj] < minD) {
          i = ii;
          j = jj;
          minD = dPrime[i][j];
        }
      }
    }
    return [i, j, minD];
  }

  function createDelta(totalDistances, N) {
    let deltaMatrix = ___namespace$1.chunk(Array(N * N), N);

    for (let i of ___namespace$1.range(N)) {
      for (let j of ___namespace$1.range(parseInt(i) + 1, N)) {
        deltaMatrix[i][j] = (totalDistances[i] - totalDistances[j]) / (N - 2);
        deltaMatrix[j][i] = deltaMatrix[i][j];
      }
    }

    return deltaMatrix;
  }

  function getDistanceMatrix(seqs) {
    // Gaps are masked

    let initKey = ___namespace$1.keys(seqs)[0];
    let seqLength = seqs[initKey].length;

    return ___namespace$1.mapValues(seqs, (seq) =>
      ___namespace$1.map(seqs, (seq2) =>
        ___namespace$1.sum(
          ___namespace$1.map(
            ___namespace$1.range(seqLength),
            (i) => seq[i] != seq2[i] && seq[i] != "-" && seq2[i] != "-"
          )
        )
      )
    );
  }

  function getTotalDistances(distanceMatrix) {
    return ___namespace$1.map(distanceMatrix, ___namespace$1.sum);
  }

  /**
   * Create a neighbor joining tree from a distance matrix
   * See test/neighbor-join-test.js for a working example
   *
   * @param {Array} distanceMatrixArr The NxN distance matrix.
   *	const D = [
   *			[0,  5,  9,  9, 8],
   *			[5,  0, 10, 10, 9],
   *			[9, 10,  0,  8, 7],
   *			[9, 10,  8,  0, 3],
   *			[8,  9,  7,  3, 0]
   * 	];
   * 
   * @param {Number} n The dimension of the distanceMatrixArr.
   * @param {Array} nodeList The names of each row in the distanceMatrix
   * @returns The neighbor joining new tree.
   */
  function neighborJoining(distanceMatrixArr, n, nodeList) {
    if (n <= 2) {
      let tree = new Phylotree("");

      //T.link(nodeList[0],nodeList[1],D[0][1])

      let newNode = tree.getNodes();
      // Get root
      let distance = distanceMatrixArr[0][1] / 2;

      let nodeA = tree.createNode(nodeList[0], [null, [distance]]);
      let nodeB = tree.createNode(nodeList[1], [null, [distance]]);

      //// Add the children to the newly created node
      tree.addChild(newNode, nodeA);
      tree.addChild(newNode, nodeB);

      return tree;
    } else {
      let N = n;
      let totalDistances = getTotalDistances(distanceMatrixArr);
      let dPrime = getDPrime(distanceMatrixArr, totalDistances, N);
      let [i, j, minD] = ijMinDPrime(dPrime, N);
      let deltaMatrix = createDelta(totalDistances, N);
      let limbLengthI = (distanceMatrixArr[i][j] + deltaMatrix[i][j]) / 2;
      let limbLengthJ = (distanceMatrixArr[i][j] - deltaMatrix[i][j]) / 2;
      let newRow = ___namespace$1.concat(
        0,
        ___namespace$1.filter(
          ___namespace$1.map(___namespace$1.range(n), (k) => {
            if (k != i && k != j) {
              return (
                0.5 *
                (distanceMatrixArr[k][i] +
                  distanceMatrixArr[k][j] -
                  distanceMatrixArr[i][j])
              );
            }
          }),
          ___namespace$1.isNumber
        )
      );

      let nodeI = nodeList[i];
      let nodeJ = nodeList[j];

      // Get all nodes of type InternalNode{x} and increment number.
      // If there are none, start with InternalNode0
      let m = "InternalNode0";
      let internalNodes = ___namespace$1.filter(nodeList, (x) =>
        ___namespace$1.includes(x, "InternalNode")
      );

      if (internalNodes.length) {
        let highestNum = ___namespace$1.max(
          ___namespace$1.map(internalNodes, (label) => ___namespace$1.split(label, "InternalNode")[1])
        );
        m = "InternalNode" + ++highestNum;
      }

      nodeList.unshift(m);

      distanceMatrixArr = remove(___namespace$1.max([i, j]), distanceMatrixArr);
      distanceMatrixArr = remove(___namespace$1.min([i, j]), distanceMatrixArr);

      distanceMatrixArr.unshift(newRow);

      ___namespace$1.each(___namespace$1.range(1, n - 1), (l) => distanceMatrixArr[l].unshift(newRow[l]));

      // Remove from nodeList
      ___namespace$1.remove(nodeList, (n) => n == nodeI || n == nodeJ);
      let tree = neighborJoining(distanceMatrixArr, N - 1, nodeList);

      let treeNodeI = tree.createNode(nodeI, [null, [limbLengthI]]);
      let treeNodeJ = tree.createNode(nodeJ, [null, [limbLengthJ]]);

      // If the node doesn't exist, create. Otherwise, reassign the length
      if (tree.getNodeByName(m)) {
        let internalNode = tree.getNodeByName(m);
        tree.addChild(internalNode, treeNodeI);
        tree.addChild(internalNode, treeNodeJ);
      } else {
        let newNode = tree.createNode(m, [null, [0]]);
        tree.addChild(tree.getNodes(), newNode);
        // Add the children to the newly created node
        tree.addChild(newNode, treeNodeI);
        tree.addChild(newNode, treeNodeJ);
      }

      // Set negative to 0 and add distance to other limblength
      return tree;
    }
  }

  exports.centerOfTree = centerOfTree;
  exports.clusterPicker = clusterPicker;
  exports.computeMidpoint = computeMidpoint;
  exports.extract_dates = extract_dates;
  exports.fitRootToTip = fitRootToTip;
  exports.getDistanceMatrix = getDistanceMatrix;
  exports.getNewick = getNewick;
  exports.inOrder = inOrder;
  exports.leftChildRightSibling = leftChildRightSibling;
  exports.loadAnnotations = loadAnnotations;
  exports.neighborJoining = neighborJoining;
  exports.newickParser = newickParser;
  exports.pairwise_distances = computePairwiseDistances;
  exports.parseAnnotations = parseAnnotations;
  exports.parseFasta = parseFasta;
  exports.phylopart = phylopart;
  exports.phylotree = Phylotree;
  exports.postOrder = postOrder;
  exports.preOrder = preOrder;
  exports.rootToTip = rootToTip;
  exports.sackin = sackin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=phylotree.js.map
