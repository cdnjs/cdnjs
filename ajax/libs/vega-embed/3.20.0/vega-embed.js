(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega-lib'), require('vega-lite')) :
  typeof define === 'function' && define.amd ? define(['vega-lib', 'vega-lite'], factory) :
  (global.vegaEmbed = factory(global.vega,global.vl));
}(this, (function (vegaImport,vlImport) { 'use strict';

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

  function selection_merge(selection$$1) {

    for (var groups0 = this._groups, groups1 = selection$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove : typeof value === "function"
              ? styleFunction
              : styleConstant)(name, value, priority == null ? "" : priority))
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

  function selection_cloneShallow() {
    return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
  }

  function selection_cloneDeep() {
    return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  var filterEvents = {};

  var event = null;

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
      var event0 = event; // Events can be reentrant (e.g., focus).
      event = event1;
      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        event = event0;
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
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection([[document.querySelector(selector)]], [document.documentElement])
        : new Selection([[selector]], root);
  }

  function accessor(fn, fields, name) {
    fn.fields = fields || [];
    fn.fname = name;
    return fn;
  }

  function error(message) {
    throw Error(message);
  }

  function splitAccessPath(p) {
    var path = [],
        q = null,
        b = 0,
        n = p.length,
        s = '',
        i, j, c;

    p = p + '';

    function push() {
      path.push(s + p.substring(i, j));
      s = '';
      i = j + 1;
    }

    for (i=j=0; j<n; ++j) {
      c = p[j];
      if (c === '\\') {
        s += p.substring(i, j);
        i = ++j;
      } else if (c === q) {
        push();
        q = null;
        b = -1;
      } else if (q) {
        continue;
      } else if (i === b && c === '"') {
        i = j + 1;
        q = c;
      } else if (i === b && c === "'") {
        i = j + 1;
        q = c;
      } else if (c === '.' && !b) {
        if (j > i) {
          push();
        } else {
          i = j + 1;
        }
      } else if (c === '[') {
        if (j > i) push();
        b = i = j + 1;
      } else if (c === ']') {
        if (!b) error('Access path missing open bracket: ' + p);
        if (b > 0) push();
        b = 0;
        i = j + 1;
      }
    }

    if (b) error('Access path missing closing bracket: ' + p);
    if (q) error('Access path missing closing quote: ' + p);

    if (j > i) {
      j++;
      push();
    }

    return path;
  }

  var isArray = Array.isArray;

  function isObject(_) {
    return _ === Object(_);
  }

  function isString(_) {
    return typeof _ === 'string';
  }

  function $(x) {
    return isArray(x) ? '[' + x.map($) + ']'
      : isObject(x) || isString(x) ?
        // Output valid JSON and JS source strings.
        // See http://timelessrepo.com/json-isnt-a-javascript-subset
        JSON.stringify(x).replace('\u2028','\\u2028').replace('\u2029', '\\u2029')
      : x;
  }

  function field(field, name) {
    var path = splitAccessPath(field),
        code = 'return _[' + path.map($).join('][') + '];';

    return accessor(
      Function('_', code),
      [(field = path.length===1 ? path[0] : field)],
      name || field
    );
  }

  var empty$1 = [];

  var id = field('id');

  var identity = accessor(function(_) { return _; }, empty$1, 'identity');

  var zero = accessor(function() { return 0; }, empty$1, 'zero');

  var one = accessor(function() { return 1; }, empty$1, 'one');

  var truthy = accessor(function() { return true; }, empty$1, 'true');

  var falsy = accessor(function() { return false; }, empty$1, 'false');

  var name = "vega-embed";
  var version = "3.20.0";
  var description = "Publish Vega visualizations as embedded web components.";
  var keywords = [
  	"vega",
  	"data",
  	"visualization",
  	"component",
  	"embed"
  ];
  var repository = {
  	type: "git",
  	url: "http://github.com/vega/vega-embed.git"
  };
  var author = {
  	name: "UW Interactive Data Lab",
  	url: "http://idl.cs.washington.edu"
  };
  var contributors = [
  	{
  		name: "Jeffrey Heer",
  		url: "https://homes.cs.washington.edu/~jheer/"
  	},
  	{
  		name: "Dominik Moritz",
  		url: "https://www.domoritz.de"
  	},
  	{
  		name: "Arvind Satyanarayan",
  		url: "http://arvindsatya.com"
  	},
  	{
  		name: "Younghoon Kim"
  	},
  	{
  		name: "Yuri Astrakhan"
  	}
  ];
  var license = "BSD-3-Clause";
  var main = "build/vega-embed.js";
  var module$1 = "build/src/embed.js";
  var unpkg = "build/vega-embed.min.js";
  var jsdelivr = "build/vega-embed.min.js";
  var types = "build/src/embed.d.ts";
  var devDependencies = {
  	"@types/d3-selection": "^1.3.2",
  	"@types/jest": "^23.3.2",
  	"@types/json-stable-stringify": "^1.0.32",
  	"@types/semver": "^5.5.0",
  	"browser-sync": "^2.24.7",
  	concurrently: "^4.0.1",
  	jest: "^23.6.0",
  	"jest-canvas-mock": "^1.1.0",
  	prettier: "^1.14.2",
  	rollup: "^0.65.2",
  	"rollup-plugin-commonjs": "^9.1.6",
  	"rollup-plugin-json": "^3.0.0",
  	"rollup-plugin-node-resolve": "^3.4.0",
  	"ts-jest": "^23.1.4",
  	tslint: "^5.11.0",
  	"tslint-config-prettier": "^1.15.0",
  	typescript: "next",
  	"uglify-es": "^3.3.9"
  };
  var dependencies = {
  	"d3-selection": "^1.3.2",
  	"json-stringify-pretty-compact": "^1.2.0",
  	semver: "^5.5.1",
  	"vega-lib": "^4.2.0",
  	"vega-lite": "^3.0.0-rc6 || ^2.6.0",
  	"vega-schema-url-parser": "^1.1.0",
  	"vega-themes": "^2.1.1",
  	"vega-tooltip": "^0.13.0"
  };
  var scripts = {
  	prebuild: "npm run clean && ./build-style.sh && tsc && cp package.json build/",
  	build: "rollup -c",
  	clean: "rm -rf build && rm -f src/style.ts && mkdir build",
  	format: "tslint -p . -e 'package.json' --fix && prettier --write '{src,test}/**/*.ts'",
  	lint: "tslint -p . -e 'package.json' && prettier --list-different '{src,test}/**/*.ts'",
  	postbuild: "uglifyjs build/vega-embed.js -cm > build/vega-embed.min.js",
  	prepublishOnly: "npm run build",
  	preversion: "npm run lint && npm run test",
  	serve: "browser-sync start --directory -s -f build *.html",
  	start: "npm run build && concurrently --kill-others -n Server,Typescript,Rollup 'npm run serve' 'tsc -w' 'rollup -c -w'",
  	pretest: "./build-style.sh",
  	test: "jest",
  	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand"
  };
  var jest = {
  	testURL: "http://localhost/",
  	setupFiles: [
  		"jest-canvas-mock"
  	],
  	transform: {
  		"^.+\\.tsx?$": "ts-jest"
  	},
  	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  	moduleFileExtensions: [
  		"ts",
  		"tsx",
  		"js",
  		"jsx",
  		"json",
  		"node"
  	],
  	testPathIgnorePatterns: [
  		"node_modules",
  		"<rootDir>/build",
  		"src"
  	]
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	keywords: keywords,
  	repository: repository,
  	author: author,
  	contributors: contributors,
  	license: license,
  	main: main,
  	module: module$1,
  	unpkg: unpkg,
  	jsdelivr: jsdelivr,
  	types: types,
  	devDependencies: devDependencies,
  	dependencies: dependencies,
  	scripts: scripts,
  	jest: jest
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
              t[p[i]] = s[p[i]];
      return t;
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function stringify (obj, options) {
    options = options || {};
    var indent = JSON.stringify([1], null, get(options, 'indent', 2)).slice(2, -3);
    var addMargin = get(options, 'margins', false);
    var maxLength = (indent === '' ? Infinity : get(options, 'maxLength', 80));

    return (function _stringify (obj, currentIndent, reserved) {
      if (obj && typeof obj.toJSON === 'function') {
        obj = obj.toJSON();
      }

      var string = JSON.stringify(obj);

      if (string === undefined) {
        return string
      }

      var length = maxLength - currentIndent.length - reserved;

      if (string.length <= length) {
        var prettified = prettify(string, addMargin);
        if (prettified.length <= length) {
          return prettified
        }
      }

      if (typeof obj === 'object' && obj !== null) {
        var nextIndent = currentIndent + indent;
        var items = [];
        var delimiters;
        var comma = function (array, index) {
          return (index === array.length - 1 ? 0 : 1)
        };

        if (Array.isArray(obj)) {
          for (var index = 0; index < obj.length; index++) {
            items.push(
              _stringify(obj[index], nextIndent, comma(obj, index)) || 'null'
            );
          }
          delimiters = '[]';
        } else {
          Object.keys(obj).forEach(function (key, index, array) {
            var keyPart = JSON.stringify(key) + ': ';
            var value = _stringify(obj[key], nextIndent,
                                   keyPart.length + comma(array, index));
            if (value !== undefined) {
              items.push(keyPart + value);
            }
          });
          delimiters = '{}';
        }

        if (items.length > 0) {
          return [
            delimiters[0],
            indent + items.join(',\n' + nextIndent),
            delimiters[1]
          ].join('\n' + currentIndent)
        }
      }

      return string
    }(obj, '', 0))
  }

  // Note: This regex matches even invalid JSON strings, but since we’re
  // working on the output of `JSON.stringify` we know that only valid strings
  // are present (unless the user supplied a weird `options.indent` but in
  // that case we don’t care since the output would be invalid anyway).
  var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,\][}{]/g;

  function prettify (string, addMargin) {
    var m = addMargin ? ' ' : '';
    var tokens = {
      '{': '{' + m,
      '[': '[' + m,
      '}': m + '}',
      ']': m + ']',
      ',': ', ',
      ':': ': '
    };
    return string.replace(stringOrChar, function (match, string) {
      return string ? match : tokens[match]
    })
  }

  function get (options, name, defaultValue) {
    return (name in options ? options[name] : defaultValue)
  }

  var jsonStringifyPrettyCompact = stringify;

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var semver = createCommonjsModule(function (module, exports) {
  exports = module.exports = SemVer;

  // The debug function is excluded entirely from the minified version.
  /* nomin */ var debug;
  /* nomin */ if (typeof process === 'object' &&
      /* nomin */ process.env &&
      /* nomin */ process.env.NODE_DEBUG &&
      /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
    /* nomin */ debug = function() {
      /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
      /* nomin */ args.unshift('SEMVER');
      /* nomin */ console.log.apply(console, args);
      /* nomin */ };
  /* nomin */ else
    /* nomin */ debug = function() {};

  // Note: this is the semver.org version of the spec that it implements
  // Not necessarily the package version of this code.
  exports.SEMVER_SPEC_VERSION = '2.0.0';

  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

  // Max safe segment length for coercion.
  var MAX_SAFE_COMPONENT_LENGTH = 16;

  // The actual regexps go on exports.re
  var re = exports.re = [];
  var src = exports.src = [];
  var R = 0;

  // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.

  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.

  var NUMERICIDENTIFIER = R++;
  src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
  var NUMERICIDENTIFIERLOOSE = R++;
  src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


  // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  var NONNUMERICIDENTIFIER = R++;
  src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


  // ## Main Version
  // Three dot-separated numeric identifiers.

  var MAINVERSION = R++;
  src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                     '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                     '(' + src[NUMERICIDENTIFIER] + ')';

  var MAINVERSIONLOOSE = R++;
  src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                          '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                          '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

  // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  var PRERELEASEIDENTIFIER = R++;
  src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                              '|' + src[NONNUMERICIDENTIFIER] + ')';

  var PRERELEASEIDENTIFIERLOOSE = R++;
  src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                   '|' + src[NONNUMERICIDENTIFIER] + ')';


  // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  var PRERELEASE = R++;
  src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                    '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

  var PRERELEASELOOSE = R++;
  src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                         '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

  // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  var BUILDIDENTIFIER = R++;
  src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

  // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  var BUILD = R++;
  src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
               '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


  // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.

  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  var FULL = R++;
  var FULLPLAIN = 'v?' + src[MAINVERSION] +
                  src[PRERELEASE] + '?' +
                  src[BUILD] + '?';

  src[FULL] = '^' + FULLPLAIN + '$';

  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.
  var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                   src[PRERELEASELOOSE] + '?' +
                   src[BUILD] + '?';

  var LOOSE = R++;
  src[LOOSE] = '^' + LOOSEPLAIN + '$';

  var GTLT = R++;
  src[GTLT] = '((?:<|>)?=?)';

  // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.
  var XRANGEIDENTIFIERLOOSE = R++;
  src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
  var XRANGEIDENTIFIER = R++;
  src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

  var XRANGEPLAIN = R++;
  src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                     '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                     '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                     '(?:' + src[PRERELEASE] + ')?' +
                     src[BUILD] + '?' +
                     ')?)?';

  var XRANGEPLAINLOOSE = R++;
  src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:' + src[PRERELEASELOOSE] + ')?' +
                          src[BUILD] + '?' +
                          ')?)?';

  var XRANGE = R++;
  src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
  var XRANGELOOSE = R++;
  src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

  // Coercion.
  // Extract anything that could conceivably be a part of a valid semver
  var COERCE = R++;
  src[COERCE] = '(?:^|[^\\d])' +
                '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
                '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                '(?:$|[^\\d])';

  // Tilde ranges.
  // Meaning is "reasonably at or greater than"
  var LONETILDE = R++;
  src[LONETILDE] = '(?:~>?)';

  var TILDETRIM = R++;
  src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
  re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
  var tildeTrimReplace = '$1~';

  var TILDE = R++;
  src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
  var TILDELOOSE = R++;
  src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

  // Caret ranges.
  // Meaning is "at least and backwards compatible with"
  var LONECARET = R++;
  src[LONECARET] = '(?:\\^)';

  var CARETTRIM = R++;
  src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
  re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
  var caretTrimReplace = '$1^';

  var CARET = R++;
  src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
  var CARETLOOSE = R++;
  src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

  // A simple gt/lt/eq thing, or just "" to indicate "any version"
  var COMPARATORLOOSE = R++;
  src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
  var COMPARATOR = R++;
  src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


  // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
  var COMPARATORTRIM = R++;
  src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                        '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

  // this one has to use the /g flag
  re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
  var comparatorTrimReplace = '$1$2$3';


  // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.
  var HYPHENRANGE = R++;
  src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                     '\\s+-\\s+' +
                     '(' + src[XRANGEPLAIN] + ')' +
                     '\\s*$';

  var HYPHENRANGELOOSE = R++;
  src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                          '\\s+-\\s+' +
                          '(' + src[XRANGEPLAINLOOSE] + ')' +
                          '\\s*$';

  // Star ranges basically just allow anything at all.
  var STAR = R++;
  src[STAR] = '(<|>)?=?\\s*\\*';

  // Compile to actual regexp objects.
  // All are flag-free, unless they were created above with a flag.
  for (var i = 0; i < R; i++) {
    debug(i, src[i]);
    if (!re[i])
      re[i] = new RegExp(src[i]);
  }

  exports.parse = parse;
  function parse(version, loose) {
    if (version instanceof SemVer)
      return version;

    if (typeof version !== 'string')
      return null;

    if (version.length > MAX_LENGTH)
      return null;

    var r = loose ? re[LOOSE] : re[FULL];
    if (!r.test(version))
      return null;

    try {
      return new SemVer(version, loose);
    } catch (er) {
      return null;
    }
  }

  exports.valid = valid;
  function valid(version, loose) {
    var v = parse(version, loose);
    return v ? v.version : null;
  }


  exports.clean = clean;
  function clean(version, loose) {
    var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
    return s ? s.version : null;
  }

  exports.SemVer = SemVer;

  function SemVer(version, loose) {
    if (version instanceof SemVer) {
      if (version.loose === loose)
        return version;
      else
        version = version.version;
    } else if (typeof version !== 'string') {
      throw new TypeError('Invalid Version: ' + version);
    }

    if (version.length > MAX_LENGTH)
      throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

    if (!(this instanceof SemVer))
      return new SemVer(version, loose);

    debug('SemVer', version, loose);
    this.loose = loose;
    var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

    if (!m)
      throw new TypeError('Invalid Version: ' + version);

    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0)
      throw new TypeError('Invalid major version')

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
      throw new TypeError('Invalid minor version')

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
      throw new TypeError('Invalid patch version')

    // numberify any prerelease numeric ids
    if (!m[4])
      this.prerelease = [];
    else
      this.prerelease = m[4].split('.').map(function(id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER)
            return num;
        }
        return id;
      });

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  SemVer.prototype.format = function() {
    this.version = this.major + '.' + this.minor + '.' + this.patch;
    if (this.prerelease.length)
      this.version += '-' + this.prerelease.join('.');
    return this.version;
  };

  SemVer.prototype.toString = function() {
    return this.version;
  };

  SemVer.prototype.compare = function(other) {
    debug('SemVer.compare', this.version, this.loose, other);
    if (!(other instanceof SemVer))
      other = new SemVer(other, this.loose);

    return this.compareMain(other) || this.comparePre(other);
  };

  SemVer.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer))
      other = new SemVer(other, this.loose);

    return compareIdentifiers(this.major, other.major) ||
           compareIdentifiers(this.minor, other.minor) ||
           compareIdentifiers(this.patch, other.patch);
  };

  SemVer.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer))
      other = new SemVer(other, this.loose);

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length)
      return -1;
    else if (!this.prerelease.length && other.prerelease.length)
      return 1;
    else if (!this.prerelease.length && !other.prerelease.length)
      return 0;

    var i = 0;
    do {
      var a = this.prerelease[i];
      var b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined)
        return 0;
      else if (b === undefined)
        return 1;
      else if (a === undefined)
        return -1;
      else if (a === b)
        continue;
      else
        return compareIdentifiers(a, b);
    } while (++i);
  };

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  SemVer.prototype.inc = function(release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break;
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break;
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0)
          this.inc('patch', identifier);
        this.inc('pre', identifier);
        break;

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
          this.major++;
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0)
          this.minor++;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0)
          this.patch++;
        this.prerelease = [];
        break;
      // This probably shouldn't be used publicly.
      // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0)
          this.prerelease = [0];
        else {
          var i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) // didn't increment anything
            this.prerelease.push(0);
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1]))
              this.prerelease = [identifier, 0];
          } else
            this.prerelease = [identifier, 0];
        }
        break;

      default:
        throw new Error('invalid increment argument: ' + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  };

  exports.inc = inc;
  function inc(version, release, loose, identifier) {
    if (typeof(loose) === 'string') {
      identifier = loose;
      loose = undefined;
    }

    try {
      return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
      return null;
    }
  }

  exports.diff = diff;
  function diff(version1, version2) {
    if (eq(version1, version2)) {
      return null;
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      if (v1.prerelease.length || v2.prerelease.length) {
        for (var key in v1) {
          if (key === 'major' || key === 'minor' || key === 'patch') {
            if (v1[key] !== v2[key]) {
              return 'pre'+key;
            }
          }
        }
        return 'prerelease';
      }
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return key;
          }
        }
      }
    }
  }

  exports.compareIdentifiers = compareIdentifiers;

  var numeric = /^[0-9]+$/;
  function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);

    if (anum && bnum) {
      a = +a;
      b = +b;
    }

    return (anum && !bnum) ? -1 :
           (bnum && !anum) ? 1 :
           a < b ? -1 :
           a > b ? 1 :
           0;
  }

  exports.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
  }

  exports.major = major;
  function major(a, loose) {
    return new SemVer(a, loose).major;
  }

  exports.minor = minor;
  function minor(a, loose) {
    return new SemVer(a, loose).minor;
  }

  exports.patch = patch;
  function patch(a, loose) {
    return new SemVer(a, loose).patch;
  }

  exports.compare = compare;
  function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
  }

  exports.compareLoose = compareLoose;
  function compareLoose(a, b) {
    return compare(a, b, true);
  }

  exports.rcompare = rcompare;
  function rcompare(a, b, loose) {
    return compare(b, a, loose);
  }

  exports.sort = sort;
  function sort(list, loose) {
    return list.sort(function(a, b) {
      return exports.compare(a, b, loose);
    });
  }

  exports.rsort = rsort;
  function rsort(list, loose) {
    return list.sort(function(a, b) {
      return exports.rcompare(a, b, loose);
    });
  }

  exports.gt = gt;
  function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
  }

  exports.lt = lt;
  function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
  }

  exports.eq = eq;
  function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
  }

  exports.neq = neq;
  function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
  }

  exports.gte = gte;
  function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
  }

  exports.lte = lte;
  function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
  }

  exports.cmp = cmp;
  function cmp(a, op, b, loose) {
    var ret;
    switch (op) {
      case '===':
        if (typeof a === 'object') a = a.version;
        if (typeof b === 'object') b = b.version;
        ret = a === b;
        break;
      case '!==':
        if (typeof a === 'object') a = a.version;
        if (typeof b === 'object') b = b.version;
        ret = a !== b;
        break;
      case '': case '=': case '==': ret = eq(a, b, loose); break;
      case '!=': ret = neq(a, b, loose); break;
      case '>': ret = gt(a, b, loose); break;
      case '>=': ret = gte(a, b, loose); break;
      case '<': ret = lt(a, b, loose); break;
      case '<=': ret = lte(a, b, loose); break;
      default: throw new TypeError('Invalid operator: ' + op);
    }
    return ret;
  }

  exports.Comparator = Comparator;
  function Comparator(comp, loose) {
    if (comp instanceof Comparator) {
      if (comp.loose === loose)
        return comp;
      else
        comp = comp.value;
    }

    if (!(this instanceof Comparator))
      return new Comparator(comp, loose);

    debug('comparator', comp, loose);
    this.loose = loose;
    this.parse(comp);

    if (this.semver === ANY)
      this.value = '';
    else
      this.value = this.operator + this.semver.version;

    debug('comp', this);
  }

  var ANY = {};
  Comparator.prototype.parse = function(comp) {
    var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var m = comp.match(r);

    if (!m)
      throw new TypeError('Invalid comparator: ' + comp);

    this.operator = m[1];
    if (this.operator === '=')
      this.operator = '';

    // if it literally is just '>' or '' then allow anything.
    if (!m[2])
      this.semver = ANY;
    else
      this.semver = new SemVer(m[2], this.loose);
  };

  Comparator.prototype.toString = function() {
    return this.value;
  };

  Comparator.prototype.test = function(version) {
    debug('Comparator.test', version, this.loose);

    if (this.semver === ANY)
      return true;

    if (typeof version === 'string')
      version = new SemVer(version, this.loose);

    return cmp(version, this.operator, this.semver, this.loose);
  };

  Comparator.prototype.intersects = function(comp, loose) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required');
    }

    var rangeTmp;

    if (this.operator === '') {
      rangeTmp = new Range(comp.value, loose);
      return satisfies(this.value, rangeTmp, loose);
    } else if (comp.operator === '') {
      rangeTmp = new Range(this.value, loose);
      return satisfies(comp.semver, rangeTmp, loose);
    }

    var sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>');
    var sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<');
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=');
    var oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, loose) &&
      ((this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '<=' || comp.operator === '<'));
    var oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, loose) &&
      ((this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '>=' || comp.operator === '>'));

    return sameDirectionIncreasing || sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  };


  exports.Range = Range;
  function Range(range, loose) {
    if (range instanceof Range) {
      if (range.loose === loose) {
        return range;
      } else {
        return new Range(range.raw, loose);
      }
    }

    if (range instanceof Comparator) {
      return new Range(range.value, loose);
    }

    if (!(this instanceof Range))
      return new Range(range, loose);

    this.loose = loose;

    // First, split based on boolean or ||
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range) {
      return this.parseRange(range.trim());
    }, this).filter(function(c) {
      // throw out any that are not relevant for whatever reason
      return c.length;
    });

    if (!this.set.length) {
      throw new TypeError('Invalid SemVer Range: ' + range);
    }

    this.format();
  }

  Range.prototype.format = function() {
    this.range = this.set.map(function(comps) {
      return comps.join(' ').trim();
    }).join('||').trim();
    return this.range;
  };

  Range.prototype.toString = function() {
    return this.range;
  };

  Range.prototype.parseRange = function(range) {
    var loose = this.loose;
    range = range.trim();
    debug('range', range, loose);
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug('hyphen replace', range);
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[COMPARATORTRIM]);

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[TILDETRIM], tildeTrimReplace);

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[CARETTRIM], caretTrimReplace);

    // normalize spaces
    range = range.split(/\s+/).join(' ');

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    var set = range.split(' ').map(function(comp) {
      return parseComparator(comp, loose);
    }).join(' ').split(/\s+/);
    if (this.loose) {
      // in loose mode, throw out any that are not valid comparators
      set = set.filter(function(comp) {
        return !!comp.match(compRe);
      });
    }
    set = set.map(function(comp) {
      return new Comparator(comp, loose);
    });

    return set;
  };

  Range.prototype.intersects = function(range, loose) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required');
    }

    return this.set.some(function(thisComparators) {
      return thisComparators.every(function(thisComparator) {
        return range.set.some(function(rangeComparators) {
          return rangeComparators.every(function(rangeComparator) {
            return thisComparator.intersects(rangeComparator, loose);
          });
        });
      });
    });
  };

  // Mostly just for testing and legacy API reasons
  exports.toComparators = toComparators;
  function toComparators(range, loose) {
    return new Range(range, loose).set.map(function(comp) {
      return comp.map(function(c) {
        return c.value;
      }).join(' ').trim().split(' ');
    });
  }

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  function parseComparator(comp, loose) {
    debug('comp', comp);
    comp = replaceCarets(comp, loose);
    debug('caret', comp);
    comp = replaceTildes(comp, loose);
    debug('tildes', comp);
    comp = replaceXRanges(comp, loose);
    debug('xrange', comp);
    comp = replaceStars(comp, loose);
    debug('stars', comp);
    return comp;
  }

  function isX(id) {
    return !id || id.toLowerCase() === 'x' || id === '*';
  }

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
  function replaceTildes(comp, loose) {
    return comp.trim().split(/\s+/).map(function(comp) {
      return replaceTilde(comp, loose);
    }).join(' ');
  }

  function replaceTilde(comp, loose) {
    var r = loose ? re[TILDELOOSE] : re[TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug('tilde', comp, _, M, m, p, pr);
      var ret;

      if (isX(M))
        ret = '';
      else if (isX(m))
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      else if (isX(p))
        // ~1.2 == >=1.2.0 <1.3.0
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else if (pr) {
        debug('replaceTilde pr', pr);
        if (pr.charAt(0) !== '-')
          pr = '-' + pr;
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + M + '.' + (+m + 1) + '.0';
      } else
        // ~1.2.3 == >=1.2.3 <1.3.0
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + M + '.' + (+m + 1) + '.0';

      debug('tilde return', ret);
      return ret;
    });
  }

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
  // ^1.2.3 --> >=1.2.3 <2.0.0
  // ^1.2.0 --> >=1.2.0 <2.0.0
  function replaceCarets(comp, loose) {
    return comp.trim().split(/\s+/).map(function(comp) {
      return replaceCaret(comp, loose);
    }).join(' ');
  }

  function replaceCaret(comp, loose) {
    debug('caret', comp, loose);
    var r = loose ? re[CARETLOOSE] : re[CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
      debug('caret', comp, _, M, m, p, pr);
      var ret;

      if (isX(M))
        ret = '';
      else if (isX(m))
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      else if (isX(p)) {
        if (M === '0')
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        else
          ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (pr.charAt(0) !== '-')
          pr = '-' + pr;
        if (M === '0') {
          if (m === '0')
            ret = '>=' + M + '.' + m + '.' + p + pr +
                  ' <' + M + '.' + m + '.' + (+p + 1);
          else
            ret = '>=' + M + '.' + m + '.' + p + pr +
                  ' <' + M + '.' + (+m + 1) + '.0';
        } else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + (+M + 1) + '.0.0';
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0')
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + M + '.' + m + '.' + (+p + 1);
          else
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + M + '.' + (+m + 1) + '.0';
        } else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + (+M + 1) + '.0.0';
      }

      debug('caret return', ret);
      return ret;
    });
  }

  function replaceXRanges(comp, loose) {
    debug('replaceXRanges', comp, loose);
    return comp.split(/\s+/).map(function(comp) {
      return replaceXRange(comp, loose);
    }).join(' ');
  }

  function replaceXRange(comp, loose) {
    comp = comp.trim();
    var r = loose ? re[XRANGELOOSE] : re[XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;

      if (gtlt === '=' && anyX)
        gtlt = '';

      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // replace X with 0
        if (xm)
          m = 0;
        if (xp)
          p = 0;

        if (gtlt === '>') {
          // >1 => >=2.0.0
          // >1.2 => >=1.3.0
          // >1.2.3 => >= 1.2.4
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else if (xp) {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm)
            M = +M + 1;
          else
            m = +m + 1;
        }

        ret = gtlt + M + '.' + m + '.' + p;
      } else if (xm) {
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      } else if (xp) {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      }

      debug('xRange return', ret);

      return ret;
    });
  }

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  function replaceStars(comp, loose) {
    debug('replaceStars', comp, loose);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[STAR], '');
  }

  // This function is passed to string.replace(re[HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0
  function hyphenReplace($0,
                         from, fM, fm, fp, fpr, fb,
                         to, tM, tm, tp, tpr, tb) {

    if (isX(fM))
      from = '';
    else if (isX(fm))
      from = '>=' + fM + '.0.0';
    else if (isX(fp))
      from = '>=' + fM + '.' + fm + '.0';
    else
      from = '>=' + from;

    if (isX(tM))
      to = '';
    else if (isX(tm))
      to = '<' + (+tM + 1) + '.0.0';
    else if (isX(tp))
      to = '<' + tM + '.' + (+tm + 1) + '.0';
    else if (tpr)
      to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
    else
      to = '<=' + to;

    return (from + ' ' + to).trim();
  }


  // if ANY of the sets match ALL of its comparators, then pass
  Range.prototype.test = function(version) {
    if (!version)
      return false;

    if (typeof version === 'string')
      version = new SemVer(version, this.loose);

    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version))
        return true;
    }
    return false;
  };

  function testSet(set, version) {
    for (var i = 0; i < set.length; i++) {
      if (!set[i].test(version))
        return false;
    }

    if (version.prerelease.length) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (var i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === ANY)
          continue;

        if (set[i].semver.prerelease.length > 0) {
          var allowed = set[i].semver;
          if (allowed.major === version.major &&
              allowed.minor === version.minor &&
              allowed.patch === version.patch)
            return true;
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false;
    }

    return true;
  }

  exports.satisfies = satisfies;
  function satisfies(version, range, loose) {
    try {
      range = new Range(range, loose);
    } catch (er) {
      return false;
    }
    return range.test(version);
  }

  exports.maxSatisfying = maxSatisfying;
  function maxSatisfying(versions, range, loose) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, loose);
    } catch (er) {
      return null;
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) { // satisfies(v, range, loose)
        if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
          max = v;
          maxSV = new SemVer(max, loose);
        }
      }
    });
    return max;
  }

  exports.minSatisfying = minSatisfying;
  function minSatisfying(versions, range, loose) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, loose);
    } catch (er) {
      return null;
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) { // satisfies(v, range, loose)
        if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
          min = v;
          minSV = new SemVer(min, loose);
        }
      }
    });
    return min;
  }

  exports.validRange = validRange;
  function validRange(range, loose) {
    try {
      // Return '*' instead of '' so that truthiness works.
      // This will throw if it's invalid anyway
      return new Range(range, loose).range || '*';
    } catch (er) {
      return null;
    }
  }

  // Determine if version is less than all the versions possible in the range
  exports.ltr = ltr;
  function ltr(version, range, loose) {
    return outside(version, range, '<', loose);
  }

  // Determine if version is greater than all the versions possible in the range.
  exports.gtr = gtr;
  function gtr(version, range, loose) {
    return outside(version, range, '>', loose);
  }

  exports.outside = outside;
  function outside(version, range, hilo, loose) {
    version = new SemVer(version, loose);
    range = new Range(range, loose);

    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break;
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }

    // If it satisifes the range it is not outside
    if (satisfies(version, range, loose)) {
      return false;
    }

    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.

    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i];

      var high = null;
      var low = null;

      comparators.forEach(function(comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, loose)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, loose)) {
          low = comparator;
        }
      });

      // If the edge version comparator has a operator then our version
      // isn't outside it
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }

      // If the lowest version comparator has an operator and our version
      // is less than it then it isn't higher than the range
      if ((!low.operator || low.operator === comp) &&
          ltefn(version, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false;
      }
    }
    return true;
  }

  exports.prerelease = prerelease;
  function prerelease(version, loose) {
    var parsed = parse(version, loose);
    return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
  }

  exports.intersects = intersects;
  function intersects(r1, r2, loose) {
    r1 = new Range(r1, loose);
    r2 = new Range(r2, loose);
    return r1.intersects(r2)
  }

  exports.coerce = coerce;
  function coerce(version) {
    if (version instanceof SemVer)
      return version;

    if (typeof version !== 'string')
      return null;

    var match = version.match(re[COERCE]);

    if (match == null)
      return null;

    return parse((match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0')); 
  }
  });
  var semver_1 = semver.SEMVER_SPEC_VERSION;
  var semver_2 = semver.re;
  var semver_3 = semver.src;
  var semver_4 = semver.parse;
  var semver_5 = semver.valid;
  var semver_6 = semver.clean;
  var semver_7 = semver.SemVer;
  var semver_8 = semver.inc;
  var semver_9 = semver.diff;
  var semver_10 = semver.compareIdentifiers;
  var semver_11 = semver.rcompareIdentifiers;
  var semver_12 = semver.major;
  var semver_13 = semver.minor;
  var semver_14 = semver.patch;
  var semver_15 = semver.compare;
  var semver_16 = semver.compareLoose;
  var semver_17 = semver.rcompare;
  var semver_18 = semver.sort;
  var semver_19 = semver.rsort;
  var semver_20 = semver.gt;
  var semver_21 = semver.lt;
  var semver_22 = semver.eq;
  var semver_23 = semver.neq;
  var semver_24 = semver.gte;
  var semver_25 = semver.lte;
  var semver_26 = semver.cmp;
  var semver_27 = semver.Comparator;
  var semver_28 = semver.Range;
  var semver_29 = semver.toComparators;
  var semver_30 = semver.satisfies;
  var semver_31 = semver.maxSatisfying;
  var semver_32 = semver.minSatisfying;
  var semver_33 = semver.validRange;
  var semver_34 = semver.ltr;
  var semver_35 = semver.gtr;
  var semver_36 = semver.outside;
  var semver_37 = semver.prerelease;
  var semver_38 = semver.intersects;
  var semver_39 = semver.coerce;

  var vegaSchemaUrlParser = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Parse a vega schema url into library and version.
   */
  function default_1(url) {
      var regex = /\/schema\/([\w-]+)\/([\w\.\-]+)\.json$/g;
      var _a = regex.exec(url).slice(1, 3), library = _a[0], version = _a[1];
      return { library: library, version: version };
  }
  exports.default = default_1;

  });

  var schemaParser = unwrapExports(vegaSchemaUrlParser);

  var markColor = '#4572a7';
  var excelTheme = {
      background: '#fff',
      arc: { fill: markColor },
      area: { fill: markColor },
      line: { stroke: markColor, strokeWidth: 2 },
      path: { stroke: markColor },
      rect: { fill: markColor },
      shape: { stroke: markColor },
      symbol: { fill: markColor, strokeWidth: 1.5, size: 50 },
      axis: {
          bandPosition: 0.5,
          grid: true,
          gridColor: '#000000',
          gridOpacity: 1,
          gridWidth: 0.5,
          labelPadding: 10,
          tickSize: 5,
          tickWidth: 0.5,
      },
      axisBand: {
          grid: false,
          tickExtra: true,
      },
      legend: {
          labelBaseline: 'middle',
          labelFontSize: 11,
          symbolSize: 50,
          symbolType: 'square',
      },
      range: {
          category: [
              '#4572a7',
              '#aa4643',
              '#8aa453',
              '#71598e',
              '#4598ae',
              '#d98445',
              '#94aace',
              '#d09393',
              '#b9cc98',
              '#a99cbc',
          ],
      },
  };

  var markColor$1 = '#000';
  var ggplot2Theme = {
      group: {
          fill: '#e5e5e5',
      },
      arc: { fill: markColor$1 },
      area: { fill: markColor$1 },
      line: { stroke: markColor$1 },
      path: { stroke: markColor$1 },
      rect: { fill: markColor$1 },
      shape: { stroke: markColor$1 },
      symbol: { fill: markColor$1, size: 40 },
      axis: {
          domain: false,
          grid: true,
          gridColor: '#FFFFFF',
          gridOpacity: 1,
          labelColor: '#7F7F7F',
          labelPadding: 4,
          tickColor: '#7F7F7F',
          tickSize: 5.67,
          titleFontSize: 16,
          titleFontWeight: 'normal',
      },
      legend: {
          labelBaseline: 'middle',
          labelFontSize: 11,
          symbolSize: 40,
      },
      range: {
          category: [
              '#000000',
              '#7F7F7F',
              '#1A1A1A',
              '#999999',
              '#333333',
              '#B0B0B0',
              '#4D4D4D',
              '#C9C9C9',
              '#666666',
              '#DCDCDC',
          ],
      },
  };

  var markColor$2 = '#ab5787';
  var axisColor = '#979797';
  var quartzTheme = {
      background: '#f9f9f9',
      arc: { fill: markColor$2 },
      area: { fill: markColor$2 },
      line: { stroke: markColor$2 },
      path: { stroke: markColor$2 },
      rect: { fill: markColor$2 },
      shape: { stroke: markColor$2 },
      symbol: { fill: markColor$2, size: 30 },
      axis: {
          domainColor: axisColor,
          domainWidth: 0.5,
          gridWidth: 0.2,
          labelColor: axisColor,
          tickColor: axisColor,
          tickWidth: 0.2,
          titleColor: axisColor,
      },
      axisBand: {
          grid: false,
      },
      axisX: {
          grid: true,
          tickSize: 10,
      },
      axisY: {
          domain: false,
          grid: true,
          tickSize: 0,
      },
      legend: {
          labelFontSize: 11,
          padding: 1,
          symbolSize: 30,
          symbolType: 'square',
      },
      range: {
          category: [
              '#ab5787',
              '#51b2e5',
              '#703c5c',
              '#168dd9',
              '#d190b6',
              '#00609f',
              '#d365ba',
              '#154866',
              '#666666',
              '#c4c4c4',
          ],
      },
  };

  var markColor$3 = '#3e5c69';
  var voxTheme = {
      background: '#fff',
      arc: { fill: markColor$3 },
      area: { fill: markColor$3 },
      line: { stroke: markColor$3 },
      path: { stroke: markColor$3 },
      rect: { fill: markColor$3 },
      shape: { stroke: markColor$3 },
      symbol: { fill: markColor$3 },
      axis: {
          domainWidth: 0.5,
          grid: true,
          labelPadding: 2,
          tickSize: 5,
          tickWidth: 0.5,
          titleFontWeight: 'normal',
      },
      axisBand: {
          grid: false,
      },
      axisX: {
          gridWidth: 0.2,
      },
      axisY: {
          gridDash: [3],
          gridWidth: 0.4,
      },
      legend: {
          labelFontSize: 11,
          padding: 1,
          symbolType: 'square',
      },
      range: {
          category: [
              '#3e5c69',
              '#6793a6',
              '#182429',
              '#0570b0',
              '#3690c0',
              '#74a9cf',
              '#a6bddb',
              '#e2ddf2',
          ],
      },
  };

  var lightColor = '#fff';
  var medColor = '#aaa';
  var darkTheme = {
      background: '#333',
      title: { color: lightColor },
      style: {
          'guide-label': {
              fill: lightColor,
          },
          'guide-title': {
              fill: lightColor,
          },
      },
      axis: {
          domainColor: lightColor,
          gridColor: medColor,
          tickColor: lightColor,
      },
  };

  var markColor$4 = '#30a2da';
  var axisColor$1 = '#cbcbcb';
  var backgroundColor = '#f0f0f0';
  var fivethirtyeighttheme = {
      arc: { fill: markColor$4 },
      area: { fill: markColor$4 },
      axisBand: {
          grid: false,
      },
      axisBottom: {
          domain: false,
          domainColor: 'black',
          domainWidth: 3,
          grid: true,
          gridColor: axisColor$1,
          gridWidth: 1,
          labelFontSize: 12,
          labelPadding: 4,
          tickColor: axisColor$1,
          tickSize: 10,
          titleFontSize: 14,
          titlePadding: 10,
      },
      axisLeft: {
          domainColor: axisColor$1,
          domainWidth: 1,
          gridColor: axisColor$1,
          gridWidth: 1,
          labelFontSize: 12,
          labelPadding: 4,
          tickColor: axisColor$1,
          tickSize: 10,
          ticks: true,
          titleFontSize: 14,
          titlePadding: 10,
      },
      axisRight: {
          domainColor: axisColor$1,
          domainWidth: 1,
          gridColor: axisColor$1,
          gridWidth: 1,
          labelFontSize: 12,
          labelPadding: 4,
          tickColor: axisColor$1,
          tickSize: 10,
          ticks: true,
          titleFontSize: 14,
          titlePadding: 10,
      },
      axisTop: {
          domain: false,
          domainColor: 'black',
          domainWidth: 3,
          grid: true,
          gridColor: axisColor$1,
          gridWidth: 1,
          labelFontSize: 12,
          labelPadding: 4,
          tickColor: axisColor$1,
          tickSize: 10,
          titleFontSize: 14,
          titlePadding: 10,
      },
      background: backgroundColor,
      group: {
          fill: backgroundColor,
      },
      legend: {
          labelFontSize: 11,
          padding: 1,
          symbolSize: 30,
          symbolType: 'square',
          titleFontSize: 14,
          titlePadding: 10,
      },
      line: {
          stroke: markColor$4,
          strokeWidth: 2,
      },
      path: { stroke: markColor$4, strokeWidth: 0.5 },
      point: { filled: true },
      rect: { fill: markColor$4 },
      range: {
          category: [
              '#30a2da',
              '#fc4f30',
              '#e5ae38',
              '#6d904f',
              '#8b8b8b',
              '#b96db8',
              '#ff9e27',
              '#56cc60',
              '#52d2ca',
              '#52689e',
              '#545454',
              '#9fe4f8',
          ],
          diverging: [
              '#cc0020',
              '#e77866',
              '#f6e7e1',
              '#d6e8ed',
              '#91bfd9',
              '#1d78b5',
          ],
          heatmap: ['#d6e8ed', '#cee0e5', '#91bfd9', '#549cc6', '#1d78b5'],
      },
      symbol: {
          opacity: 1,
          shape: 'circle',
          size: 40,
          strokeWidth: 1,
      },
      shape: { stroke: markColor$4 },
      style: {
          bar: {
              binSpacing: 2,
              fill: markColor$4,
              stroke: null,
          },
      },
      title: {
          anchor: 'start',
          fontSize: 24,
          fontWeight: 600,
          offset: 20,
      },
  };



  var themes = /*#__PURE__*/Object.freeze({
    excel: excelTheme,
    ggplot2: ggplot2Theme,
    quartz: quartzTheme,
    vox: voxTheme,
    dark: darkTheme,
    fivethirtyeight: fivethirtyeighttheme
  });

  // generated with build-style.sh
  var defaultStyle = "#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: 11px;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0,0,0,0.1);\n\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black;\n}\n#vg-tooltip-element.visible {\n  visibility: visible;\n}\n#vg-tooltip-element h2 {\n  margin-top: 0;\n  margin-bottom: 10px;\n  font-size: 13px;\n}\n#vg-tooltip-element table {\n  border-spacing: 0;\n}\n#vg-tooltip-element td {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n#vg-tooltip-element td.key {\n  color: #808080;\n  max-width: 150px;\n  text-align: right;\n  padding-right: 4px;\n}\n#vg-tooltip-element td.value {\n  display: block;\n  max-width: 300px;\n  max-height: 7em;\n  text-align: left;\n}\n\n/* Dark and light color themes */\n#vg-tooltip-element.dark-theme {\n  background-color: rgba(32, 32, 32, 0.9);\n  border: 1px solid #f5f5f5;\n  color: white;\n}\n#vg-tooltip-element.dark-theme td.key {\n  color: #bfbfbf;\n}\n\n#vg-tooltip-element.light-theme {\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black;\n}\n#vg-tooltip-element.light-theme td.key {\n  color: #808080;\n}";

  var EL_ID = 'vg-tooltip-element';
  var DEFAULT_OPTIONS = {
      /**
       * X offset.
       */
      offsetX: 10,
      /**
       * Y offset.
       */
      offsetY: 10,
      /**
       * ID of the tooltip element.
       */
      id: EL_ID,
      /**
       * ID of the tooltip CSS style.
       */
      styleId: 'vega-tooltip-style',
      /**
       * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
       *
       * There are two predefined themes: "light" (default) and "dark".
       */
      theme: 'light',
      /**
       * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
       */
      disableDefaultStyle: false,
      /**
       * HTML sanitizer function that removes dangerous HTML to prevent XSS.
       *
       * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
       */
      sanitize: escapeHTML,
      /**
       * The maximum recursion depth when printing objects in the tooltip.
       */
      maxDepth: 2,
  };
  /**
   * Escape special HTML characters.
   *
   * @param value A value to convert to string and HTML-escape.
   */
  function escapeHTML(value) {
      return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;');
  }
  function createDefaultStyle(id) {
      // Just in case this id comes from a user, ensure these is no security issues
      if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
          throw new Error('Invalid HTML ID');
      }
      return defaultStyle.toString().replace(EL_ID, id);
  }

  /**
   * Format the value to be shown in the toolip.
   *
   * @param value The value to show in the tooltip.
   * @param valueToHtml Function to convert a single cell value to an HTML string
   */
  function formatValue(value, valueToHtml, maxDepth) {
      if (isArray(value)) {
          return "[" + value.map(function (v) { return valueToHtml(isString(v) ? v : stringify$1(v, maxDepth)); }).join(', ') + "]";
      }
      if (isObject(value)) {
          var content = '';
          var _a = value, title = _a.title, rest = __rest(_a, ["title"]);
          if (title) {
              content += "<h2>" + valueToHtml(title) + "</h2>";
          }
          var keys = Object.keys(rest);
          if (keys.length > 0) {
              content += '<table>';
              for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                  var key$$1 = keys_1[_i];
                  var val = rest[key$$1];
                  if (isObject(val)) {
                      val = stringify$1(val, maxDepth);
                  }
                  content += "<tr><td class=\"key\">" + valueToHtml(key$$1) + ":</td><td class=\"value\">" + valueToHtml(val) + "</td></tr>";
              }
              content += "</table>";
          }
          return content || '{}'; // show empty object if there are no properties
      }
      return valueToHtml(value);
  }
  function replacer(maxDepth) {
      var stack = [];
      return function (key$$1, value) {
          if (typeof value !== 'object' || value === null) {
              return value;
          }
          var pos = stack.indexOf(this) + 1;
          stack.length = pos;
          if (stack.length > maxDepth) {
              return '[Object]';
          }
          if (stack.indexOf(value) >= 0) {
              return '[Circular]';
          }
          stack.push(value);
          return value;
      };
  }
  /**
   * Stringify any JS object to valid JSON
   */
  function stringify$1(obj, maxDepth) {
      return JSON.stringify(obj, replacer(maxDepth));
  }

  /**
   * Position the tooltip
   *
   * @param event The mouse event.
   * @param tooltipBox
   * @param offsetX Horizontal offset.
   * @param offsetY Vertical offset.
   */
  function calculatePosition(event, tooltipBox, offsetX, offsetY) {
      var x = event.clientX + offsetX;
      if (x + tooltipBox.width > window.innerWidth) {
          x = +event.clientX - offsetX - tooltipBox.width;
      }
      var y = event.clientY + offsetY;
      if (y + tooltipBox.height > window.innerHeight) {
          y = +event.clientY - offsetY - tooltipBox.height;
      }
      return { x: x, y: y };
  }

  /**
   * The tooltip handler class.
   */
  var Handler = /** @class */ (function () {
      /**
       * Create the tooltip handler and initialize the element and style.
       *
       * @param options Tooltip Options
       */
      function Handler(options) {
          this.options = __assign({}, DEFAULT_OPTIONS, options);
          var elementId = this.options.id;
          // bind this to call
          this.call = this.tooltip_handler.bind(this);
          // prepend a default stylesheet for tooltips to the head
          if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
              var style = document.createElement('style');
              style.setAttribute('id', this.options.styleId);
              style.innerHTML = createDefaultStyle(elementId);
              if (document.head.childNodes.length > 0) {
                  document.head.insertBefore(style, document.head.childNodes[0]);
              }
              else {
                  document.head.appendChild(style);
              }
          }
          // append a div element that we use as a tooltip unless it already exists
          this.el = document.getElementById(elementId);
          if (!this.el) {
              this.el = document.createElement('div');
              this.el.setAttribute('id', elementId);
              this.el.classList.add('vg-tooltip');
              document.body.appendChild(this.el);
          }
      }
      /**
       * The tooltip handler function.
       */
      Handler.prototype.tooltip_handler = function (handler, event, item, value) {
          // console.log(handler, event, item, value);
          // hide tooltip for null, undefined, or empty string values
          if (value == null || value === '') {
              this.el.classList.remove('visible', this.options.theme + "-theme");
              return;
          }
          // set the tooltip content
          this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
          // make the tooltip visible
          this.el.classList.add('visible', this.options.theme + "-theme");
          var _a = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY), x = _a.x, y = _a.y;
          this.el.setAttribute('style', "top: " + y + "px; left: " + x + "px");
      };
      return Handler;
  }());

  /**
   * Open editor url in a new window, and pass a message.
   */
  function post(window, url, data) {
      var editor = window.open(url);
      var wait = 10000;
      var step = 250;
      var count = ~~(wait / step);
      function listen(evt) {
          if (evt.source === editor) {
              count = 0;
              window.removeEventListener('message', listen, false);
          }
      }
      window.addEventListener('message', listen, false);
      // send message
      // periodically resend until ack received or timeout
      function send() {
          if (count <= 0) {
              return;
          }
          editor.postMessage(data, '*');
          setTimeout(send, step);
          count -= 1;
      }
      setTimeout(send, step);
  }

  // generated with build-style.sh
  var embedStyle = ".vega-embed {\n  position: relative;\n  display: inline-block;\n  padding-right: 38px;\n}\n\n.vega-embed .vega-actions-wrapper {\n  display: inline-flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 6px;\n  z-index: 1000;\n\n  opacity: 0.2;\n  background: white;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);\n  color: #1b1e23;\n  border: 1px solid #aaa;\n  border-radius: 999px;\n  transition: opacity 0.4s ease-in;\n}\n\n.vega-embed:hover .vega-actions-wrapper {\n  transition: opacity 0.2s ease;\n  opacity: 1;\n}\n\n.vega-embed .vega-actions {\n  position: absolute;\n  top: 0;\n  right: 0;\n  display: none;\n  flex-direction: column;\n\n  padding-bottom: 8px;\n  padding-top: 8px;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);\n  border: 1px solid #d9d9d9;\n  background: white;\n}\n\n.vega-embed .vega-actions-wrapper:hover {\n  background: transparent;\n  color: transparent;\n  border: none;\n  box-shadow: none;\n}\n\n.vega-embed .vega-actions-wrapper:hover .vega-actions {\n  display: flex;\n}\n\n.vega-embed .vega-actions a {\n  padding: 8px 16px;\n  font-family: sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  white-space: nowrap;\n  color: #434a56;\n  text-decoration: none;\n}\n\n.vega-embed .vega-actions a:hover {\n  background-color: #f7f7f9;\n  color: #1b1e23;\n}";

  /**
   * From Vega-Lite
   */
  function mergeDeep(dest) {
      var src = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          src[_i - 1] = arguments[_i];
      }
      for (var _a = 0, src_1 = src; _a < src_1.length; _a++) {
          var s = src_1[_a];
          dest = deepMerge_(dest, s);
      }
      return dest;
  }
  function deepMerge_(dest, src) {
      if (typeof src !== 'object' || src === null) {
          return dest;
      }
      for (var p in src) {
          if (!src.hasOwnProperty(p)) {
              continue;
          }
          if (src[p] === undefined) {
              continue;
          }
          if (typeof src[p] !== 'object' || isArray(src[p]) || src[p] === null) {
              dest[p] = src[p];
          }
          else if (typeof dest[p] !== 'object' || dest[p] === null) {
              dest[p] = mergeDeep(isArray(src[p].constructor) ? [] : {}, src[p]);
          }
          else {
              mergeDeep(dest[p], src[p]);
          }
      }
      return dest;
  }
  // polyfill for IE
  if (!String.prototype.startsWith) {
      String.prototype.startsWith = function (search, pos) {
          return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      };
  }
  function isURL(s) {
      return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//');
  }

  var vega = vegaImport;
  var vl = vlImport;
  var NAMES = {
      vega: 'Vega',
      'vega-lite': 'Vega-Lite',
  };
  var VERSION = {
      vega: vega.version,
      'vega-lite': vl ? vl.version : 'not available',
  };
  var PREPROCESSOR = {
      vega: function (vgjson, _) { return vgjson; },
      'vega-lite': function (vljson, config) { return vl.compile(vljson, { config: config }).spec; },
  };
  var SVG_CIRCLES = "\n<svg viewBox=\"0 0 16 16\" fill=\"currentColor\" stroke=\"none\" stroke-width=\"1\" stroke-linecap=\"round\" stroke-linejoin=\"round\" width=\"14\" height=\"14\">\n  <circle r=\"2\" cy=\"8\" cx=\"2\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"8\"></circle>\n  <circle r=\"2\" cy=\"8\" cx=\"14\"></circle>\n</svg>";
  var I18N = {
      COMPILED_ACTION: 'View Vega',
      EDITOR_ACTION: 'Open in Vega Editor',
      PNG_ACTION: 'Save as PNG',
      SOURCE_ACTION: 'View Source',
      SVG_ACTION: 'Save as SVG',
  };
  function isTooltipHandler(h) {
      return typeof h === 'function';
  }
  function viewSource(source, sourceHeader, sourceFooter, mode) {
      var header = "<html><head>" + sourceHeader + "</head><body><pre><code class=\"json\">";
      var footer = "</code></pre>" + sourceFooter + "</body></html>";
      var win = window.open('');
      win.document.write(header + source + footer);
      win.document.title = NAMES[mode] + " JSON Source";
  }
  /**
   * Try to guess the type of spec.
   *
   * @param spec Vega or Vega-Lite spec.
   */
  function guessMode(spec, providedMode) {
      // Decide mode
      if (spec.$schema) {
          var parsed = schemaParser(spec.$schema);
          if (providedMode && providedMode !== parsed.library) {
              console.warn("The given visualization spec is written in " + NAMES[parsed.library] + ", but mode argument sets " + (NAMES[providedMode] || providedMode) + ".");
          }
          var mode = parsed.library;
          if (!semver_30(VERSION[mode], "^" + parsed.version.slice(1))) {
              console.warn("The input spec uses " + mode + " " + parsed.version + ", but the current version of " + NAMES[mode] + " is " + VERSION[mode] + ".");
          }
          return mode;
      }
      else {
          // try to guess from the provided spec
          if ('mark' in spec ||
              'encoding' in spec ||
              'layer' in spec ||
              'hconcat' in spec ||
              'vconcat' in spec ||
              'facet' in spec ||
              'repeat' in spec) {
              return 'vega-lite';
          }
          if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
              return 'vega';
          }
      }
      return providedMode || 'vega';
  }
  function isLoader(o) {
      return !!(o && 'load' in o);
  }
  /**
   * Embed a Vega visualization component in a web page. This function returns a promise.
   *
   * @param el        DOM element in which to place component (DOM node or CSS selector).
   * @param spec      String : A URL string from which to load the Vega specification.
   *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
   * @param opt       A JavaScript object containing options for embedding.
   */
  function embed(el, spec, opt) {
      if (opt === void 0) { opt = {}; }
      return __awaiter(this, void 0, void 0, function () {
          var actions, i18n, loader, renderer, logLevel, data, config, data, ID, style, mode, vgSpec, parsed, div, runtime, view, handler, hover, _a, hoverSet, updateSet, wrapper, ctrl, _loop_1, _i, _b, ext, editorUrl_1;
          return __generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      opt = opt || {};
                      actions = opt.actions === true || opt.actions === false
                          ? opt.actions
                          : mergeDeep({}, { export: { svg: true, png: true }, source: true, compiled: false, editor: true }, opt.actions || {});
                      i18n = __assign({}, I18N, opt.i18n);
                      loader = isLoader(opt.loader) ? opt.loader : vega.loader(opt.loader);
                      renderer = opt.renderer || 'canvas';
                      logLevel = opt.logLevel || vega.Warn;
                      if (!vega.isString(spec)) return [3 /*break*/, 2];
                      return [4 /*yield*/, loader.load(spec)];
                  case 1:
                      data = _c.sent();
                      return [2 /*return*/, embed(el, JSON.parse(data), opt)];
                  case 2:
                      config = opt.config || {};
                      if (!vega.isString(config)) return [3 /*break*/, 4];
                      return [4 /*yield*/, loader.load(config)];
                  case 3:
                      data = _c.sent();
                      return [2 /*return*/, embed(el, spec, __assign({}, opt, { config: JSON.parse(data) }))];
                  case 4:
                      if (opt.defaultStyle) {
                          ID = 'vega-embed-style';
                          if (!document.getElementById(ID)) {
                              style = document.createElement('style');
                              style.id = ID;
                              style.innerText = opt.defaultStyle === true ? (embedStyle).toString() : opt.defaultStyle;
                              document.getElementsByTagName('head')[0].appendChild(style);
                          }
                      }
                      if (opt.theme) {
                          config = mergeDeep({}, themes[opt.theme], config);
                      }
                      mode = guessMode(spec, opt.mode);
                      vgSpec = PREPROCESSOR[mode](spec, config);
                      if (mode === 'vega-lite') {
                          if (vgSpec.$schema) {
                              parsed = schemaParser(vgSpec.$schema);
                              if (!semver_30(VERSION.vega, "^" + parsed.version.slice(1))) {
                                  console.warn("The compiled spec uses Vega " + parsed.version + ", but current version is " + VERSION.vega + ".");
                              }
                          }
                      }
                      div = select(el) // d3.select supports elements and strings
                          .classed('vega-embed', true)
                          .html('');
                      if (opt.onBeforeParse) {
                          // Allow Vega spec to be modified before being used
                          vgSpec = opt.onBeforeParse(vgSpec);
                      }
                      runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config);
                      view = new vega.View(runtime, {
                          loader: loader,
                          logLevel: logLevel,
                          renderer: renderer,
                      }).initialize(el);
                      if (opt.tooltip !== false) {
                          handler = void 0;
                          if (isTooltipHandler(opt.tooltip)) {
                              handler = opt.tooltip;
                          }
                          else {
                              // user provided boolean true or tooltip options
                              handler = new Handler(opt.tooltip === true ? {} : opt.tooltip).call;
                          }
                          view.tooltip(handler);
                      }
                      hover = opt.hover;
                      // Enable hover for Vega by default.
                      if (hover === undefined) {
                          hover = mode !== 'vega-lite';
                      }
                      if (hover) {
                          _a = (typeof hover === 'boolean' ? {} : hover), hoverSet = _a.hoverSet, updateSet = _a.updateSet;
                          view.hover(hoverSet, updateSet);
                      }
                      if (opt) {
                          if (opt.width) {
                              view.width(opt.width);
                          }
                          if (opt.height) {
                              view.height(opt.height);
                          }
                          if (opt.padding) {
                              view.padding(opt.padding);
                          }
                      }
                      if (!opt.runAsync) return [3 /*break*/, 6];
                      return [4 /*yield*/, view.runAsync()];
                  case 5:
                      _c.sent();
                      return [3 /*break*/, 7];
                  case 6:
                      view.run();
                      _c.label = 7;
                  case 7:
                      if (actions !== false) {
                          wrapper = div.append('div').attr('class', 'vega-actions-wrapper');
                          if (opt.defaultStyle === true) {
                              wrapper.html(SVG_CIRCLES);
                          }
                          ctrl = wrapper.insert('div').attr('class', 'vega-actions');
                          // add 'Export' action
                          if (actions === true || actions.export !== false) {
                              _loop_1 = function (ext) {
                                  if (actions === true || actions.export === true || actions.export[ext]) {
                                      var i18nExportAction = i18n[ext.toUpperCase() + "_ACTION"];
                                      ctrl
                                          .append('a')
                                          .text(i18nExportAction)
                                          .attr('href', '#')
                                          .attr('target', '_blank')
                                          .attr('download', "visualization." + ext)
                                          .on('mousedown', function () {
                                          var _this = this;
                                          view
                                              .toImageURL(ext, opt.scaleFactor)
                                              .then(function (url) {
                                              _this.href = url;
                                          })
                                              .catch(function (error) {
                                              throw error;
                                          });
                                          event.preventDefault();
                                      });
                                  }
                              };
                              for (_i = 0, _b = ['svg', 'png']; _i < _b.length; _i++) {
                                  ext = _b[_i];
                                  _loop_1(ext);
                              }
                          }
                          // add 'View Source' action
                          if (actions === true || actions.source !== false) {
                              ctrl
                                  .append('a')
                                  .text(i18n.SOURCE_ACTION)
                                  .attr('href', '#')
                                  .on('click', function () {
                                  viewSource(jsonStringifyPrettyCompact(spec), opt.sourceHeader || '', opt.sourceFooter || '', mode);
                                  event.preventDefault();
                              });
                          }
                          // add 'View Compiled' action
                          if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
                              ctrl
                                  .append('a')
                                  .text(i18n.COMPILED_ACTION)
                                  .attr('href', '#')
                                  .on('click', function () {
                                  viewSource(jsonStringifyPrettyCompact(vgSpec), opt.sourceHeader || '', opt.sourceFooter || '', 'vega');
                                  event.preventDefault();
                              });
                          }
                          // add 'Open in Vega Editor' action
                          if (actions === true || actions.editor !== false) {
                              editorUrl_1 = opt.editorUrl || 'https://vega.github.io/editor/';
                              ctrl
                                  .append('a')
                                  .text(i18n.EDITOR_ACTION)
                                  .attr('href', '#')
                                  .on('click', function () {
                                  post(window, editorUrl_1, {
                                      config: config,
                                      mode: mode,
                                      renderer: renderer,
                                      spec: jsonStringifyPrettyCompact(spec),
                                  });
                                  event.preventDefault();
                              });
                          }
                      }
                      return [2 /*return*/, { view: view, spec: spec }];
              }
          });
      });
  }

  /**
   * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
   * The element has a value property with the view. By default all actions except for the editor action are disabled.
   *
   * The main use case is in [Observable](https://observablehq.com/).
   */
  function container(spec, opt) {
      if (opt === void 0) { opt = {}; }
      return __awaiter(this, void 0, void 0, function () {
          var div, actions;
          return __generator(this, function (_a) {
              div = document.createElement('div');
              actions = opt.actions === true || opt.actions === false
                  ? opt.actions
                  : __assign({ export: true, source: false, compiled: true, editor: true }, (opt.actions || {}));
              return [2 /*return*/, embed(div, spec, __assign({ actions: actions, defaultStyle: true, runAsync: true }, (opt || {}))).then(function (result) {
                      div.value = result.view;
                      return div;
                  })];
          });
      });
  }

  /**
   * Returns true of the object is an HTML element.
   */
  function isElement(obj) {
      return obj instanceof selection || typeof HTMLElement === 'object'
          ? obj instanceof HTMLElement // DOM2
          : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  }
  var wrapper = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      if (args.length > 1 && ((isString(args[0]) && !isURL(args[0])) || isElement(args[0]) || args.length === 3)) {
          return embed(args[0], args[1], args[2]);
      }
      return container(args[0], args[1]);
  };
  wrapper.vl = vl;
  wrapper.container = container;
  wrapper.embed = embed;
  wrapper.vega = vega;
  wrapper.default = embed;
  wrapper.version = pkg.version;

  return wrapper;

})));
//# sourceMappingURL=vega-embed.js.map
