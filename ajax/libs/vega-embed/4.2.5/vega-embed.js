(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vega'), require('vega-lite')) :
  typeof define === 'function' && define.amd ? define(['vega', 'vega-lite'], factory) :
  (global = global || self, global.vegaEmbed = factory(global.vega, global.vl));
}(this, function (vegaImport, vlImport) { 'use strict';

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

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
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

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
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
    var element = document.documentElement;
    if (!("onmouseenter" in element)) {
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
    join: selection_join,
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

  var name = "vega-embed";
  var version = "4.2.5";
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
  var module = "build/src/embed.js";
  var unpkg = "build/vega-embed.min.js";
  var jsdelivr = "build/vega-embed.min.js";
  var types = "build/src/embed.d.ts";
  var devDependencies = {
  	"@types/d3-selection": "^1.4.1",
  	"@types/jest": "^24.0.18",
  	"@types/json-stable-stringify": "^1.0.32",
  	"@types/semver": "^6.0.1",
  	"browser-sync": "^2.26.7",
  	concurrently: "^4.1.2",
  	jest: "^24.9.0",
  	"jest-canvas-mock": "^2.1.1",
  	"node-sass": "^4.12.0",
  	rollup: "^1.20.1",
  	"rollup-plugin-commonjs": "^10.0.2",
  	"rollup-plugin-json": "^4.0.0",
  	"rollup-plugin-node-resolve": "^5.2.0",
  	terser: "^4.2.1",
  	"ts-jest": "^24.0.2",
  	typescript: "^3.5.3",
  	vega: "^5.4.0",
  	"vega-lite": "^3.4.0",
  	"vega-lite-dev-config": "^0.2.5"
  };
  var peerDependencies = {
  	vega: "*",
  	"vega-lite": "2 || 3"
  };
  var dependencies = {
  	"d3-selection": "^1.4.0",
  	"json-stringify-pretty-compact": "^2.0.0",
  	semver: "^6.3.0",
  	"vega-schema-url-parser": "^1.1.0",
  	"vega-themes": "^2.3.2",
  	"vega-tooltip": "^0.18.1"
  };
  var scripts = {
  	"tsc:src": "tsc -p tsconfig.src.json",
  	prebuild: "./build-style.sh && yarn tsc:src",
  	build: "rollup -c",
  	clean: "rm -rf build && rm -f src/style.ts && mkdir build",
  	postbuild: "terser build/vega-embed.js -cm > build/vega-embed.min.js",
  	prepublishOnly: "yarn clean && yarn build",
  	preversion: "yarn lint && yarn test",
  	serve: "browser-sync start --directory -s -f build *.html",
  	start: "yarn build && concurrently --kill-others -n Server,Typescript,Rollup 'yarn serve' 'yarn tsc:src -w' 'rollup -c -w'",
  	pretest: "./build-style.sh",
  	test: "jest",
  	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
  	prepare: "beemo create-config",
  	prettierbase: "beemo prettier '*.{css,html}'",
  	eslintbase: "beemo eslint '{src,test}/**/*.ts'",
  	format: "yarn eslintbase --fix && yarn prettierbase --write",
  	lint: "yarn eslintbase && yarn prettierbase --check"
  };
  var beemo = {
  	module: "vega-lite-dev-config",
  	drivers: [
  		"prettier",
  		"eslint"
  	],
  	prettier: {
  		ignore: [
  			"src/style.ts",
  			"README.md"
  		]
  	}
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
  	module: module,
  	unpkg: unpkg,
  	jsdelivr: jsdelivr,
  	types: types,
  	devDependencies: devDependencies,
  	peerDependencies: peerDependencies,
  	dependencies: dependencies,
  	scripts: scripts,
  	beemo: beemo,
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

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  // Note: This regex matches even invalid JSON strings, but since we’re
  // working on the output of `JSON.stringify` we know that only valid strings
  // are present (unless the user supplied a weird `options.indent` but in
  // that case we don’t care since the output would be invalid anyway).
  var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,]/g;

  var jsonStringifyPrettyCompact = function stringify(passedObj, options) {
    var indent, maxLength, replacer;

    options = options || {};
    indent = JSON.stringify(
      [1],
      undefined,
      options.indent === undefined ? 2 : options.indent
    ).slice(2, -3);
    maxLength =
      indent === ""
        ? Infinity
        : options.maxLength === undefined
        ? 80
        : options.maxLength;
    replacer = options.replacer;

    return (function _stringify(obj, currentIndent, reserved) {
      // prettier-ignore
      var end, index, items, key, keyPart, keys, length, nextIndent, prettified, start, string, value;

      if (obj && typeof obj.toJSON === "function") {
        obj = obj.toJSON();
      }

      string = JSON.stringify(obj, replacer);

      if (string === undefined) {
        return string;
      }

      length = maxLength - currentIndent.length - reserved;

      if (string.length <= length) {
        prettified = string.replace(stringOrChar, function(match, stringLiteral) {
          return stringLiteral || match + " ";
        });
        if (prettified.length <= length) {
          return prettified;
        }
      }

      if (replacer != null) {
        obj = JSON.parse(string);
        replacer = undefined;
      }

      if (typeof obj === "object" && obj !== null) {
        nextIndent = currentIndent + indent;
        items = [];
        index = 0;

        if (Array.isArray(obj)) {
          start = "[";
          end = "]";
          length = obj.length;
          for (; index < length; index++) {
            items.push(
              _stringify(obj[index], nextIndent, index === length - 1 ? 0 : 1) ||
                "null"
            );
          }
        } else {
          start = "{";
          end = "}";
          keys = Object.keys(obj);
          length = keys.length;
          for (; index < length; index++) {
            key = keys[index];
            keyPart = JSON.stringify(key) + ": ";
            value = _stringify(
              obj[key],
              nextIndent,
              keyPart.length + (index === length - 1 ? 0 : 1)
            );
            if (value !== undefined) {
              items.push(keyPart + value);
            }
          }
        }

        if (items.length > 0) {
          return [start, indent + items.join(",\n" + nextIndent), end].join(
            "\n" + currentIndent
          );
        }
      }

      return string;
    })(passedObj, "", 0);
  };

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var semver = createCommonjsModule(function (module, exports) {
  exports = module.exports = SemVer;

  var debug;
  /* istanbul ignore next */
  if (typeof process === 'object' &&
      process.env &&
      process.env.NODE_DEBUG &&
      /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
    debug = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift('SEMVER');
      console.log.apply(console, args);
    };
  } else {
    debug = function () {};
  }

  // Note: this is the semver.org version of the spec that it implements
  // Not necessarily the package version of this code.
  exports.SEMVER_SPEC_VERSION = '2.0.0';

  var MAX_LENGTH = 256;
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
    /* istanbul ignore next */ 9007199254740991;

  // Max safe segment length for coercion.
  var MAX_SAFE_COMPONENT_LENGTH = 16;

  // The actual regexps go on exports.re
  var re = exports.re = [];
  var src = exports.src = [];
  var t = exports.tokens = {};
  var R = 0;

  function tok (n) {
    t[n] = R++;
  }

  // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.

  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.

  tok('NUMERICIDENTIFIER');
  src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*';
  tok('NUMERICIDENTIFIERLOOSE');
  src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+';

  // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  tok('NONNUMERICIDENTIFIER');
  src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';

  // ## Main Version
  // Three dot-separated numeric identifiers.

  tok('MAINVERSION');
  src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                     '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                     '(' + src[t.NUMERICIDENTIFIER] + ')';

  tok('MAINVERSIONLOOSE');
  src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                          '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                          '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')';

  // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  tok('PRERELEASEIDENTIFIER');
  src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                              '|' + src[t.NONNUMERICIDENTIFIER] + ')';

  tok('PRERELEASEIDENTIFIERLOOSE');
  src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                   '|' + src[t.NONNUMERICIDENTIFIER] + ')';

  // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  tok('PRERELEASE');
  src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                    '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))';

  tok('PRERELEASELOOSE');
  src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                         '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))';

  // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  tok('BUILDIDENTIFIER');
  src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

  // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  tok('BUILD');
  src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
               '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))';

  // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.

  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  tok('FULL');
  tok('FULLPLAIN');
  src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                    src[t.PRERELEASE] + '?' +
                    src[t.BUILD] + '?';

  src[t.FULL] = '^' + src[t.FULLPLAIN] + '$';

  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.
  tok('LOOSEPLAIN');
  src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                    src[t.PRERELEASELOOSE] + '?' +
                    src[t.BUILD] + '?';

  tok('LOOSE');
  src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$';

  tok('GTLT');
  src[t.GTLT] = '((?:<|>)?=?)';

  // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.
  tok('XRANGEIDENTIFIERLOOSE');
  src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
  tok('XRANGEIDENTIFIER');
  src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*';

  tok('XRANGEPLAIN');
  src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                     '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                     '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                     '(?:' + src[t.PRERELEASE] + ')?' +
                     src[t.BUILD] + '?' +
                     ')?)?';

  tok('XRANGEPLAINLOOSE');
  src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                          '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                          src[t.BUILD] + '?' +
                          ')?)?';

  tok('XRANGE');
  src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$';
  tok('XRANGELOOSE');
  src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$';

  // Coercion.
  // Extract anything that could conceivably be a part of a valid semver
  tok('COERCE');
  src[t.COERCE] = '(^|[^\\d])' +
                '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
                '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
                '(?:$|[^\\d])';
  tok('COERCERTL');
  re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g');

  // Tilde ranges.
  // Meaning is "reasonably at or greater than"
  tok('LONETILDE');
  src[t.LONETILDE] = '(?:~>?)';

  tok('TILDETRIM');
  src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+';
  re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g');
  var tildeTrimReplace = '$1~';

  tok('TILDE');
  src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$';
  tok('TILDELOOSE');
  src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$';

  // Caret ranges.
  // Meaning is "at least and backwards compatible with"
  tok('LONECARET');
  src[t.LONECARET] = '(?:\\^)';

  tok('CARETTRIM');
  src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+';
  re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g');
  var caretTrimReplace = '$1^';

  tok('CARET');
  src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$';
  tok('CARETLOOSE');
  src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$';

  // A simple gt/lt/eq thing, or just "" to indicate "any version"
  tok('COMPARATORLOOSE');
  src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$';
  tok('COMPARATOR');
  src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$';

  // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
  tok('COMPARATORTRIM');
  src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                        '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')';

  // this one has to use the /g flag
  re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g');
  var comparatorTrimReplace = '$1$2$3';

  // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.
  tok('HYPHENRANGE');
  src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                     '\\s+-\\s+' +
                     '(' + src[t.XRANGEPLAIN] + ')' +
                     '\\s*$';

  tok('HYPHENRANGELOOSE');
  src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                          '\\s+-\\s+' +
                          '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                          '\\s*$';

  // Star ranges basically just allow anything at all.
  tok('STAR');
  src[t.STAR] = '(<|>)?=?\\s*\\*';

  // Compile to actual regexp objects.
  // All are flag-free, unless they were created above with a flag.
  for (var i = 0; i < R; i++) {
    debug(i, src[i]);
    if (!re[i]) {
      re[i] = new RegExp(src[i]);
    }
  }

  exports.parse = parse;
  function parse (version, options) {
    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }

    if (version instanceof SemVer) {
      return version
    }

    if (typeof version !== 'string') {
      return null
    }

    if (version.length > MAX_LENGTH) {
      return null
    }

    var r = options.loose ? re[t.LOOSE] : re[t.FULL];
    if (!r.test(version)) {
      return null
    }

    try {
      return new SemVer(version, options)
    } catch (er) {
      return null
    }
  }

  exports.valid = valid;
  function valid (version, options) {
    var v = parse(version, options);
    return v ? v.version : null
  }

  exports.clean = clean;
  function clean (version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ''), options);
    return s ? s.version : null
  }

  exports.SemVer = SemVer;

  function SemVer (version, options) {
    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (version instanceof SemVer) {
      if (version.loose === options.loose) {
        return version
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError('Invalid Version: ' + version)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
    }

    if (!(this instanceof SemVer)) {
      return new SemVer(version, options)
    }

    debug('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose;

    var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    if (!m) {
      throw new TypeError('Invalid Version: ' + version)
    }

    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map(function (id) {
        if (/^[0-9]+$/.test(id)) {
          var num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      });
    }

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  SemVer.prototype.format = function () {
    this.version = this.major + '.' + this.minor + '.' + this.patch;
    if (this.prerelease.length) {
      this.version += '-' + this.prerelease.join('.');
    }
    return this.version
  };

  SemVer.prototype.toString = function () {
    return this.version
  };

  SemVer.prototype.compare = function (other) {
    debug('SemVer.compare', this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    return this.compareMain(other) || this.comparePre(other)
  };

  SemVer.prototype.compareMain = function (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    return compareIdentifiers(this.major, other.major) ||
           compareIdentifiers(this.minor, other.minor) ||
           compareIdentifiers(this.patch, other.patch)
  };

  SemVer.prototype.comparePre = function (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    var i = 0;
    do {
      var a = this.prerelease[i];
      var b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  };

  SemVer.prototype.compareBuild = function (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    var i = 0;
    do {
      var a = this.build[i];
      var b = other.build[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  };

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  SemVer.prototype.inc = function (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier);
        }
        this.inc('pre', identifier);
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (this.minor !== 0 ||
            this.patch !== 0 ||
            this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          var i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break

      default:
        throw new Error('invalid increment argument: ' + release)
    }
    this.format();
    this.raw = this.version;
    return this
  };

  exports.inc = inc;
  function inc (version, release, loose, identifier) {
    if (typeof (loose) === 'string') {
      identifier = loose;
      loose = undefined;
    }

    try {
      return new SemVer(version, loose).inc(release, identifier).version
    } catch (er) {
      return null
    }
  }

  exports.diff = diff;
  function diff (version1, version2) {
    if (eq(version1, version2)) {
      return null
    } else {
      var v1 = parse(version1);
      var v2 = parse(version2);
      var prefix = '';
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = 'pre';
        var defaultResult = 'prerelease';
      }
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return prefix + key
          }
        }
      }
      return defaultResult // may be undefined
    }
  }

  exports.compareIdentifiers = compareIdentifiers;

  var numeric = /^[0-9]+$/;
  function compareIdentifiers (a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);

    if (anum && bnum) {
      a = +a;
      b = +b;
    }

    return a === b ? 0
      : (anum && !bnum) ? -1
      : (bnum && !anum) ? 1
      : a < b ? -1
      : 1
  }

  exports.rcompareIdentifiers = rcompareIdentifiers;
  function rcompareIdentifiers (a, b) {
    return compareIdentifiers(b, a)
  }

  exports.major = major;
  function major (a, loose) {
    return new SemVer(a, loose).major
  }

  exports.minor = minor;
  function minor (a, loose) {
    return new SemVer(a, loose).minor
  }

  exports.patch = patch;
  function patch (a, loose) {
    return new SemVer(a, loose).patch
  }

  exports.compare = compare;
  function compare (a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose))
  }

  exports.compareLoose = compareLoose;
  function compareLoose (a, b) {
    return compare(a, b, true)
  }

  exports.compareBuild = compareBuild;
  function compareBuild (a, b, loose) {
    var versionA = new SemVer(a, loose);
    var versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB)
  }

  exports.rcompare = rcompare;
  function rcompare (a, b, loose) {
    return compare(b, a, loose)
  }

  exports.sort = sort;
  function sort (list, loose) {
    return list.sort(function (a, b) {
      return exports.compareBuild(a, b, loose)
    })
  }

  exports.rsort = rsort;
  function rsort (list, loose) {
    return list.sort(function (a, b) {
      return exports.compareBuild(b, a, loose)
    })
  }

  exports.gt = gt;
  function gt (a, b, loose) {
    return compare(a, b, loose) > 0
  }

  exports.lt = lt;
  function lt (a, b, loose) {
    return compare(a, b, loose) < 0
  }

  exports.eq = eq;
  function eq (a, b, loose) {
    return compare(a, b, loose) === 0
  }

  exports.neq = neq;
  function neq (a, b, loose) {
    return compare(a, b, loose) !== 0
  }

  exports.gte = gte;
  function gte (a, b, loose) {
    return compare(a, b, loose) >= 0
  }

  exports.lte = lte;
  function lte (a, b, loose) {
    return compare(a, b, loose) <= 0
  }

  exports.cmp = cmp;
  function cmp (a, op, b, loose) {
    switch (op) {
      case '===':
        if (typeof a === 'object')
          a = a.version;
        if (typeof b === 'object')
          b = b.version;
        return a === b

      case '!==':
        if (typeof a === 'object')
          a = a.version;
        if (typeof b === 'object')
          b = b.version;
        return a !== b

      case '':
      case '=':
      case '==':
        return eq(a, b, loose)

      case '!=':
        return neq(a, b, loose)

      case '>':
        return gt(a, b, loose)

      case '>=':
        return gte(a, b, loose)

      case '<':
        return lt(a, b, loose)

      case '<=':
        return lte(a, b, loose)

      default:
        throw new TypeError('Invalid operator: ' + op)
    }
  }

  exports.Comparator = Comparator;
  function Comparator (comp, options) {
    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value;
      }
    }

    if (!(this instanceof Comparator)) {
      return new Comparator(comp, options)
    }

    debug('comparator', comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);

    if (this.semver === ANY) {
      this.value = '';
    } else {
      this.value = this.operator + this.semver.version;
    }

    debug('comp', this);
  }

  var ANY = {};
  Comparator.prototype.parse = function (comp) {
    var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var m = comp.match(r);

    if (!m) {
      throw new TypeError('Invalid comparator: ' + comp)
    }

    this.operator = m[1] !== undefined ? m[1] : '';
    if (this.operator === '=') {
      this.operator = '';
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  };

  Comparator.prototype.toString = function () {
    return this.value
  };

  Comparator.prototype.test = function (version) {
    debug('Comparator.test', version, this.options.loose);

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  };

  Comparator.prototype.intersects = function (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }

    var rangeTmp;

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      rangeTmp = new Range(comp.value, options);
      return satisfies(this.value, rangeTmp, options)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      rangeTmp = new Range(this.value, options);
      return satisfies(comp.semver, rangeTmp, options)
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
      cmp(this.semver, '<', comp.semver, options) &&
      ((this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '<=' || comp.operator === '<'));
    var oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      ((this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '>=' || comp.operator === '>'));

    return sameDirectionIncreasing || sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
  };

  exports.Range = Range;
  function Range (range, options) {
    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }

    if (range instanceof Range) {
      if (range.loose === !!options.loose &&
          range.includePrerelease === !!options.includePrerelease) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      return new Range(range.value, options)
    }

    if (!(this instanceof Range)) {
      return new Range(range, options)
    }

    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;

    // First, split based on boolean or ||
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function (range) {
      return this.parseRange(range.trim())
    }, this).filter(function (c) {
      // throw out any that are not relevant for whatever reason
      return c.length
    });

    if (!this.set.length) {
      throw new TypeError('Invalid SemVer Range: ' + range)
    }

    this.format();
  }

  Range.prototype.format = function () {
    this.range = this.set.map(function (comps) {
      return comps.join(' ').trim()
    }).join('||').trim();
    return this.range
  };

  Range.prototype.toString = function () {
    return this.range
  };

  Range.prototype.parseRange = function (range) {
    var loose = this.options.loose;
    range = range.trim();
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug('hyphen replace', range);
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug('comparator trim', range, re[t.COMPARATORTRIM]);

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);

    // normalize spaces
    range = range.split(/\s+/).join(' ');

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var set = range.split(' ').map(function (comp) {
      return parseComparator(comp, this.options)
    }, this).join(' ').split(/\s+/);
    if (this.options.loose) {
      // in loose mode, throw out any that are not valid comparators
      set = set.filter(function (comp) {
        return !!comp.match(compRe)
      });
    }
    set = set.map(function (comp) {
      return new Comparator(comp, this.options)
    }, this);

    return set
  };

  Range.prototype.intersects = function (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some(function (thisComparators) {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some(function (rangeComparators) {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every(function (thisComparator) {
              return rangeComparators.every(function (rangeComparator) {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  };

  // take a set of comparators and determine whether there
  // exists a version which can satisfy it
  function isSatisfiable (comparators, options) {
    var result = true;
    var remainingComparators = comparators.slice();
    var testComparator = remainingComparators.pop();

    while (result && remainingComparators.length) {
      result = remainingComparators.every(function (otherComparator) {
        return testComparator.intersects(otherComparator, options)
      });

      testComparator = remainingComparators.pop();
    }

    return result
  }

  // Mostly just for testing and legacy API reasons
  exports.toComparators = toComparators;
  function toComparators (range, options) {
    return new Range(range, options).set.map(function (comp) {
      return comp.map(function (c) {
        return c.value
      }).join(' ').trim().split(' ')
    })
  }

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  function parseComparator (comp, options) {
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp
  }

  function isX (id) {
    return !id || id.toLowerCase() === 'x' || id === '*'
  }

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
  function replaceTildes (comp, options) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceTilde(comp, options)
    }).join(' ')
  }

  function replaceTilde (comp, options) {
    var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('tilde', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      } else if (isX(p)) {
        // ~1.2 == >=1.2.0 <1.3.0
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      } else if (pr) {
        debug('replaceTilde pr', pr);
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + M + '.' + (+m + 1) + '.0';
      } else {
        // ~1.2.3 == >=1.2.3 <1.3.0
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + M + '.' + (+m + 1) + '.0';
      }

      debug('tilde return', ret);
      return ret
    })
  }

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
  // ^1.2.3 --> >=1.2.3 <2.0.0
  // ^1.2.0 --> >=1.2.0 <2.0.0
  function replaceCarets (comp, options) {
    return comp.trim().split(/\s+/).map(function (comp) {
      return replaceCaret(comp, options)
    }).join(' ')
  }

  function replaceCaret (comp, options) {
    debug('caret', comp, options);
    var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    return comp.replace(r, function (_, M, m, p, pr) {
      debug('caret', comp, _, M, m, p, pr);
      var ret;

      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
      } else if (isX(p)) {
        if (M === '0') {
          ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
        } else {
          ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
        }
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (M === '0') {
          if (m === '0') {
            ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                  ' <' + M + '.' + m + '.' + (+p + 1);
          } else {
            ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                  ' <' + M + '.' + (+m + 1) + '.0';
          }
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + (+M + 1) + '.0.0';
        }
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0') {
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + M + '.' + m + '.' + (+p + 1);
          } else {
            ret = '>=' + M + '.' + m + '.' + p +
                  ' <' + M + '.' + (+m + 1) + '.0';
          }
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + (+M + 1) + '.0.0';
        }
      }

      debug('caret return', ret);
      return ret
    })
  }

  function replaceXRanges (comp, options) {
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map(function (comp) {
      return replaceXRange(comp, options)
    }).join(' ')
  }

  function replaceXRange (comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      var xM = isX(M);
      var xm = xM || isX(m);
      var xp = xm || isX(p);
      var anyX = xp;

      if (gtlt === '=' && anyX) {
        gtlt = '';
      }

      // if we're including prereleases in the match, then we need
      // to fix this to -0, the lowest possible prerelease value
      pr = options.includePrerelease ? '-0' : '';

      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0-0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // we know patch is an x, because we have any x at all.
        // replace X with 0
        if (xm) {
          m = 0;
        }
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
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }

        ret = gtlt + M + '.' + m + '.' + p + pr;
      } else if (xm) {
        ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr;
      } else if (xp) {
        ret = '>=' + M + '.' + m + '.0' + pr +
          ' <' + M + '.' + (+m + 1) + '.0' + pr;
      }

      debug('xRange return', ret);

      return ret
    })
  }

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  function replaceStars (comp, options) {
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '')
  }

  // This function is passed to string.replace(re[t.HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0
  function hyphenReplace ($0,
    from, fM, fm, fp, fpr, fb,
    to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) {
      from = '';
    } else if (isX(fm)) {
      from = '>=' + fM + '.0.0';
    } else if (isX(fp)) {
      from = '>=' + fM + '.' + fm + '.0';
    } else {
      from = '>=' + from;
    }

    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = '<' + (+tM + 1) + '.0.0';
    } else if (isX(tp)) {
      to = '<' + tM + '.' + (+tm + 1) + '.0';
    } else if (tpr) {
      to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
    } else {
      to = '<=' + to;
    }

    return (from + ' ' + to).trim()
  }

  // if ANY of the sets match ALL of its comparators, then pass
  Range.prototype.test = function (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false
      }
    }

    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  };

  function testSet (set, version, options) {
    for (var i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false
      }
    }

    if (version.prerelease.length && !options.includePrerelease) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === ANY) {
          continue
        }

        if (set[i].semver.prerelease.length > 0) {
          var allowed = set[i].semver;
          if (allowed.major === version.major &&
              allowed.minor === version.minor &&
              allowed.patch === version.patch) {
            return true
          }
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false
    }

    return true
  }

  exports.satisfies = satisfies;
  function satisfies (version, range, options) {
    try {
      range = new Range(range, options);
    } catch (er) {
      return false
    }
    return range.test(version)
  }

  exports.maxSatisfying = maxSatisfying;
  function maxSatisfying (versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!max || maxSV.compare(v) === -1) {
          // compare(max, v, true)
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max
  }

  exports.minSatisfying = minSatisfying;
  function minSatisfying (versions, range, options) {
    var min = null;
    var minSV = null;
    try {
      var rangeObj = new Range(range, options);
    } catch (er) {
      return null
    }
    versions.forEach(function (v) {
      if (rangeObj.test(v)) {
        // satisfies(v, range, options)
        if (!min || minSV.compare(v) === 1) {
          // compare(min, v, true)
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min
  }

  exports.minVersion = minVersion;
  function minVersion (range, loose) {
    range = new Range(range, loose);

    var minver = new SemVer('0.0.0');
    if (range.test(minver)) {
      return minver
    }

    minver = new SemVer('0.0.0-0');
    if (range.test(minver)) {
      return minver
    }

    minver = null;
    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i];

      comparators.forEach(function (comparator) {
        // Clone to avoid manipulating the comparator's semver object.
        var compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case '>':
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
            /* fallthrough */
          case '':
          case '>=':
            if (!minver || gt(minver, compver)) {
              minver = compver;
            }
            break
          case '<':
          case '<=':
            /* Ignore maximum versions */
            break
          /* istanbul ignore next */
          default:
            throw new Error('Unexpected operation: ' + comparator.operator)
        }
      });
    }

    if (minver && range.test(minver)) {
      return minver
    }

    return null
  }

  exports.validRange = validRange;
  function validRange (range, options) {
    try {
      // Return '*' instead of '' so that truthiness works.
      // This will throw if it's invalid anyway
      return new Range(range, options).range || '*'
    } catch (er) {
      return null
    }
  }

  // Determine if version is less than all the versions possible in the range
  exports.ltr = ltr;
  function ltr (version, range, options) {
    return outside(version, range, '<', options)
  }

  // Determine if version is greater than all the versions possible in the range.
  exports.gtr = gtr;
  function gtr (version, range, options) {
    return outside(version, range, '>', options)
  }

  exports.outside = outside;
  function outside (version, range, hilo, options) {
    version = new SemVer(version, options);
    range = new Range(range, options);

    var gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case '>':
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = '>';
        ecomp = '>=';
        break
      case '<':
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = '<';
        ecomp = '<=';
        break
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"')
    }

    // If it satisifes the range it is not outside
    if (satisfies(version, range, options)) {
      return false
    }

    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.

    for (var i = 0; i < range.set.length; ++i) {
      var comparators = range.set[i];

      var high = null;
      var low = null;

      comparators.forEach(function (comparator) {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0');
        }
        high = high || comparator;
        low = low || comparator;
        if (gtfn(comparator.semver, high.semver, options)) {
          high = comparator;
        } else if (ltfn(comparator.semver, low.semver, options)) {
          low = comparator;
        }
      });

      // If the edge version comparator has a operator then our version
      // isn't outside it
      if (high.operator === comp || high.operator === ecomp) {
        return false
      }

      // If the lowest version comparator has an operator and our version
      // is less than it then it isn't higher than the range
      if ((!low.operator || low.operator === comp) &&
          ltefn(version, low.semver)) {
        return false
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false
      }
    }
    return true
  }

  exports.prerelease = prerelease;
  function prerelease (version, options) {
    var parsed = parse(version, options);
    return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
  }

  exports.intersects = intersects;
  function intersects (r1, r2, options) {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2)
  }

  exports.coerce = coerce;
  function coerce (version, options) {
    if (version instanceof SemVer) {
      return version
    }

    if (typeof version === 'number') {
      version = String(version);
    }

    if (typeof version !== 'string') {
      return null
    }

    options = options || {};

    var match = null;
    if (!options.rtl) {
      match = version.match(re[t.COERCE]);
    } else {
      // Find the right-most coercible string that does not share
      // a terminus with a more left-ward coercible string.
      // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
      //
      // Walk through the string checking with a /g regexp
      // Manually set the index so as to pick up overlapping matches.
      // Stop when we get a match that ends at the string end, since no
      // coercible string can be more right-ward without the same terminus.
      var next;
      while ((next = re[t.COERCERTL].exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
      ) {
        if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
      }
      // leave it in a clean state
      re[t.COERCERTL].lastIndex = -1;
    }

    if (match === null) {
      return null
    }

    return parse(match[2] +
      '.' + (match[3] || '0') +
      '.' + (match[4] || '0'), options)
  }
  });
  var semver_1 = semver.SEMVER_SPEC_VERSION;
  var semver_2 = semver.re;
  var semver_3 = semver.src;
  var semver_4 = semver.tokens;
  var semver_5 = semver.parse;
  var semver_6 = semver.valid;
  var semver_7 = semver.clean;
  var semver_8 = semver.SemVer;
  var semver_9 = semver.inc;
  var semver_10 = semver.diff;
  var semver_11 = semver.compareIdentifiers;
  var semver_12 = semver.rcompareIdentifiers;
  var semver_13 = semver.major;
  var semver_14 = semver.minor;
  var semver_15 = semver.patch;
  var semver_16 = semver.compare;
  var semver_17 = semver.compareLoose;
  var semver_18 = semver.compareBuild;
  var semver_19 = semver.rcompare;
  var semver_20 = semver.sort;
  var semver_21 = semver.rsort;
  var semver_22 = semver.gt;
  var semver_23 = semver.lt;
  var semver_24 = semver.eq;
  var semver_25 = semver.neq;
  var semver_26 = semver.gte;
  var semver_27 = semver.lte;
  var semver_28 = semver.cmp;
  var semver_29 = semver.Comparator;
  var semver_30 = semver.Range;
  var semver_31 = semver.toComparators;
  var semver_32 = semver.satisfies;
  var semver_33 = semver.maxSatisfying;
  var semver_34 = semver.minSatisfying;
  var semver_35 = semver.minVersion;
  var semver_36 = semver.validRange;
  var semver_37 = semver.ltr;
  var semver_38 = semver.gtr;
  var semver_39 = semver.outside;
  var semver_40 = semver.prerelease;
  var semver_41 = semver.intersects;
  var semver_42 = semver.coerce;

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

  const markColor = '#4572a7';
  const excelTheme = {
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
          tickWidth: 0.5
      },
      axisBand: {
          grid: false,
          tickExtra: true
      },
      legend: {
          labelBaseline: 'middle',
          labelFontSize: 11,
          symbolSize: 50,
          symbolType: 'square'
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
              '#a99cbc'
          ]
      }
  };

  const markColor$1 = '#000';
  const ggplot2Theme = {
      group: {
          fill: '#e5e5e5'
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
          titleFontWeight: 'normal'
      },
      legend: {
          labelBaseline: 'middle',
          labelFontSize: 11,
          symbolSize: 40
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
              '#DCDCDC'
          ]
      }
  };

  const markColor$2 = '#ab5787';
  const axisColor = '#979797';
  const quartzTheme = {
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
          titleColor: axisColor
      },
      axisBand: {
          grid: false
      },
      axisX: {
          grid: true,
          tickSize: 10
      },
      axisY: {
          domain: false,
          grid: true,
          tickSize: 0
      },
      legend: {
          labelFontSize: 11,
          padding: 1,
          symbolSize: 30,
          symbolType: 'square'
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
              '#c4c4c4'
          ]
      }
  };

  const markColor$3 = '#3e5c69';
  const voxTheme = {
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
          titleFontWeight: 'normal'
      },
      axisBand: {
          grid: false
      },
      axisX: {
          gridWidth: 0.2
      },
      axisY: {
          gridDash: [3],
          gridWidth: 0.4
      },
      legend: {
          labelFontSize: 11,
          padding: 1,
          symbolType: 'square'
      },
      range: {
          category: ['#3e5c69', '#6793a6', '#182429', '#0570b0', '#3690c0', '#74a9cf', '#a6bddb', '#e2ddf2']
      }
  };

  const lightColor = '#fff';
  const medColor = '#888';
  const darkTheme = {
      background: '#333',
      title: { color: lightColor },
      style: {
          'guide-label': {
              fill: lightColor
          },
          'guide-title': {
              fill: lightColor
          }
      },
      axis: {
          domainColor: lightColor,
          gridColor: medColor,
          tickColor: lightColor
      }
  };

  const markColor$4 = '#30a2da';
  const axisColor$1 = '#cbcbcb';
  const guideLabelColor = '#999';
  const guideTitleColor = '#333';
  const backgroundColor = '#f0f0f0';
  const blackTitle = '#333';
  const fiveThirtyEightTheme = {
      arc: { fill: markColor$4 },
      area: { fill: markColor$4 },
      axis: {
          domainColor: axisColor$1,
          grid: true,
          gridColor: axisColor$1,
          gridWidth: 1,
          labelColor: guideLabelColor,
          labelFontSize: 10,
          titleColor: guideTitleColor,
          tickColor: axisColor$1,
          tickSize: 10,
          titleFontSize: 14,
          titlePadding: 10,
          labelPadding: 4
      },
      axisBand: {
          grid: false
      },
      background: backgroundColor,
      group: {
          fill: backgroundColor
      },
      legend: {
          labelColor: blackTitle,
          labelFontSize: 11,
          padding: 1,
          symbolSize: 30,
          symbolType: 'square',
          titleColor: blackTitle,
          titleFontSize: 14,
          titlePadding: 10
      },
      line: {
          stroke: markColor$4,
          strokeWidth: 2
      },
      path: { stroke: markColor$4, strokeWidth: 0.5 },
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
              '#9fe4f8'
          ],
          diverging: ['#cc0020', '#e77866', '#f6e7e1', '#d6e8ed', '#91bfd9', '#1d78b5'],
          heatmap: ['#d6e8ed', '#cee0e5', '#91bfd9', '#549cc6', '#1d78b5']
      },
      point: {
          filled: true,
          shape: 'circle'
      },
      shape: { stroke: markColor$4 },
      style: {
          bar: {
              binSpacing: 2,
              fill: markColor$4,
              stroke: null
          }
      },
      title: {
          anchor: 'start',
          fontSize: 24,
          fontWeight: 600,
          offset: 20
      }
  };

  const headlineFontSize = 22;
  const headlineFontWeight = 'normal';
  const labelFont = 'Benton Gothic, sans-serif';
  const labelFontSize = 11.5;
  const labelFontWeight = 'normal';
  const markColor$5 = '#82c6df';
  // const markHighlight = '#006d8f';
  // const markDemocrat = '#5789b8';
  // const markRepublican = '#d94f54';
  const titleFont = 'Benton Gothic Bold, sans-serif';
  const titleFontWeight = 'normal';
  const titleFontSize = 13;
  const colorSchemes = {
      'category-6': ['#ec8431', '#829eb1', '#c89d29', '#3580b1', '#adc839', '#ab7fb4'],
      'fire-7': ['#fbf2c7', '#f9e39c', '#f8d36e', '#f4bb6a', '#e68a4f', '#d15a40', '#ab4232'],
      'fireandice-6': ['#e68a4f', '#f4bb6a', '#f9e39c', '#dadfe2', '#a6b7c6', '#849eae'],
      'ice-7': ['#edefee', '#dadfe2', '#c4ccd2', '#a6b7c6', '#849eae', '#607785', '#47525d']
  };
  const latimesTheme = {
      background: '#ffffff',
      title: {
          anchor: 'start',
          color: '#000000',
          font: titleFont,
          fontSize: headlineFontSize,
          fontWeight: headlineFontWeight
      },
      arc: { fill: markColor$5 },
      area: { fill: markColor$5 },
      line: { stroke: markColor$5, strokeWidth: 2 },
      path: { stroke: markColor$5 },
      rect: { fill: markColor$5 },
      shape: { stroke: markColor$5 },
      symbol: { fill: markColor$5, size: 30 },
      axis: {
          labelFont,
          labelFontSize,
          labelFontWeight,
          titleFont,
          titleFontSize,
          titleFontWeight
      },
      axisX: {
          labelAngle: 0,
          labelPadding: 4,
          tickSize: 3
      },
      axisY: {
          labelBaseline: 'middle',
          maxExtent: 45,
          minExtent: 45,
          tickSize: 2,
          titleAlign: 'left',
          titleAngle: 0,
          titleX: -45,
          titleY: -11
      },
      legend: {
          labelFont,
          labelFontSize,
          symbolType: 'square',
          titleFont,
          titleFontSize,
          titleFontWeight
      },
      range: {
          category: colorSchemes['category-6'],
          diverging: colorSchemes['fireandice-6'],
          heatmap: colorSchemes['fire-7'],
          ordinal: colorSchemes['fire-7'],
          ramp: colorSchemes['fire-7']
      }
  };



  var themes = /*#__PURE__*/Object.freeze({
    excel: excelTheme,
    ggplot2: ggplot2Theme,
    quartz: quartzTheme,
    vox: voxTheme,
    dark: darkTheme,
    fivethirtyeight: fiveThirtyEightTheme,
    latimes: latimesTheme
  });

  // generated with build-style.sh
  var defaultStyle = `#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black; }
  #vg-tooltip-element.visible {
    visibility: visible; }
  #vg-tooltip-element h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 13px; }
  #vg-tooltip-element table {
    border-spacing: 0; }
    #vg-tooltip-element table tr {
      border: none; }
      #vg-tooltip-element table tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 2px;
        padding-bottom: 2px; }
        #vg-tooltip-element table tr td.key {
          color: #808080;
          max-width: 150px;
          text-align: right;
          padding-right: 4px; }
        #vg-tooltip-element table tr td.value {
          display: block;
          max-width: 300px;
          max-height: 7em;
          text-align: left; }
  #vg-tooltip-element.dark-theme {
    background-color: rgba(32, 32, 32, 0.9);
    border: 1px solid #f5f5f5;
    color: white; }
    #vg-tooltip-element.dark-theme td.key {
      color: #bfbfbf; }
`;

  const EL_ID = 'vg-tooltip-element';
  const DEFAULT_OPTIONS = {
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
      maxDepth: 2
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

  var __rest = (undefined && undefined.__rest) || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  };
  /**
   * Format the value to be shown in the toolip.
   *
   * @param value The value to show in the tooltip.
   * @param valueToHtml Function to convert a single cell value to an HTML string
   */
  function formatValue(value, valueToHtml, maxDepth) {
      if (isArray(value)) {
          return `[${value.map(v => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
      }
      if (isObject(value)) {
          let content = '';
          const _a = value, { title } = _a, rest = __rest(_a, ["title"]);
          if (title) {
              content += `<h2>${valueToHtml(title)}</h2>`;
          }
          const keys = Object.keys(rest);
          if (keys.length > 0) {
              content += '<table>';
              for (const key of keys) {
                  let val = rest[key];
                  // ignore undefined properties
                  if (val === undefined) {
                      continue;
                  }
                  if (isObject(val)) {
                      val = stringify(val, maxDepth);
                  }
                  content += `<tr><td class="key">${valueToHtml(key)}:</td><td class="value">${valueToHtml(val)}</td></tr>`;
              }
              content += `</table>`;
          }
          return content || '{}'; // show empty object if there are no properties
      }
      return valueToHtml(value);
  }
  function replacer(maxDepth) {
      const stack = [];
      return function (key, value) {
          if (typeof value !== 'object' || value === null) {
              return value;
          }
          const pos = stack.indexOf(this) + 1;
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
  function stringify(obj, maxDepth) {
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
      let x = event.clientX + offsetX;
      if (x + tooltipBox.width > window.innerWidth) {
          x = +event.clientX - offsetX - tooltipBox.width;
      }
      let y = event.clientY + offsetY;
      if (y + tooltipBox.height > window.innerHeight) {
          y = +event.clientY - offsetY - tooltipBox.height;
      }
      return { x, y };
  }

  /**
   * The tooltip handler class.
   */
  class Handler {
      /**
       * Create the tooltip handler and initialize the element and style.
       *
       * @param options Tooltip Options
       */
      constructor(options) {
          this.options = Object.assign({}, DEFAULT_OPTIONS, options);
          const elementId = this.options.id;
          // bind this to call
          this.call = this.tooltipHandler.bind(this);
          // prepend a default stylesheet for tooltips to the head
          if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
              const style = document.createElement('style');
              style.setAttribute('id', this.options.styleId);
              style.innerHTML = createDefaultStyle(elementId);
              const head = document.head;
              if (head.childNodes.length > 0) {
                  head.insertBefore(style, head.childNodes[0]);
              }
              else {
                  head.appendChild(style);
              }
          }
          // append a div element that we use as a tooltip unless it already exists
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
      tooltipHandler(handler, event, item, value) {
          // console.log(handler, event, item, value);
          // hide tooltip for null, undefined, or empty string values
          if (value == null || value === '') {
              this.el.classList.remove('visible', `${this.options.theme}-theme`);
              return;
          }
          // set the tooltip content
          this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
          // make the tooltip visible
          this.el.classList.add('visible', `${this.options.theme}-theme`);
          const { x, y } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
          this.el.setAttribute('style', `top: ${y}px; left: ${x}px`);
      }
  }

  /**
   * Open editor url in a new window, and pass a message.
   */
  function post (window, url, data) {
      const editor = window.open(url);
      const wait = 10000;
      const step = 250;
      // eslint-disable-next-line no-bitwise
      let count = ~~(wait / step);
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
  var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block;
  padding-right: 38px; }
  .vega-embed details:not([open]) > :not(summary) {
    display: none !important; }
  .vega-embed summary {
    list-style: none;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    z-index: 1000;
    background: white;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    color: #1b1e23;
    border: 1px solid #aaa;
    border-radius: 999px;
    opacity: 0.2;
    transition: opacity 0.4s ease-in;
    outline: none;
    cursor: pointer; }
    .vega-embed summary::-webkit-details-marker {
      display: none; }
  .vega-embed details[open] summary {
    opacity: 0.7; }
  .vega-embed:hover summary,
  .vega-embed:focus summary {
    opacity: 1 !important;
    transition: opacity 0.2s ease; }
  .vega-embed .vega-actions {
    position: absolute;
    top: 35px;
    right: -9px;
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
    padding-top: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    border: 1px solid #d9d9d9;
    background: white;
    animation-duration: 0.15s;
    animation-name: scale-in;
    animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5); }
    .vega-embed .vega-actions a {
      padding: 8px 16px;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      color: #434a56;
      text-decoration: none; }
      .vega-embed .vega-actions a:hover {
        background-color: #f7f7f9;
        color: black; }
    .vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
      content: "";
      display: inline-block;
      position: absolute; }
    .vega-embed .vega-actions::before {
      left: auto;
      right: 14px;
      top: -16px;
      border: 8px solid #0000;
      border-bottom-color: #d9d9d9; }
    .vega-embed .vega-actions::after {
      left: auto;
      right: 15px;
      top: -14px;
      border: 7px solid #0000;
      border-bottom-color: #fff; }

.vega-embed-wrapper {
  max-width: 100%;
  overflow: scroll;
  padding-right: 14px; }

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6); }
  to {
    opacity: 1;
    transform: scale(1); } }
`;

  /* eslint-disable */
  function deepMerge_(dest, src) {
      if (typeof src !== 'object' || src === null) {
          return dest;
      }
      for (const p in src) {
          if (!src.hasOwnProperty(p)) {
              continue;
          }
          if (src[p] === undefined) {
              continue;
          }
          if (typeof src[p] !== 'object' || vegaImport.isArray(src[p]) || src[p] === null) {
              dest[p] = src[p];
          }
          else if (typeof dest[p] !== 'object' || dest[p] === null) {
              dest[p] = mergeDeep(vegaImport.isArray(src[p].constructor) ? [] : {}, src[p]);
          }
          else {
              mergeDeep(dest[p], src[p]);
          }
      }
      return dest;
  }
  /* eslint-enable */
  function mergeDeep(dest, ...src) {
      for (const s of src) {
          // eslint-disable-next-line no-param-reassign
          dest = deepMerge_(dest, s);
      }
      return dest;
  }
  // polyfill for IE
  if (!String.prototype.startsWith) {
      // eslint-disable-next-line no-extend-native,func-names
      String.prototype.startsWith = function (search, pos) {
          return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      };
  }
  function isURL(s) {
      return s.startsWith('http://') || s.startsWith('https://') || s.startsWith('//');
  }

  const vega = vegaImport;
  const vl = vlImport;
  const I18N = {
      CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
      COMPILED_ACTION: 'View Compiled Vega',
      EDITOR_ACTION: 'Open in Vega Editor',
      PNG_ACTION: 'Save as PNG',
      SOURCE_ACTION: 'View Source',
      SVG_ACTION: 'Save as SVG'
  };
  const NAMES = {
      vega: 'Vega',
      'vega-lite': 'Vega-Lite'
  };
  const VERSION = {
      vega: vega.version,
      'vega-lite': vl ? vl.version : 'not available'
  };
  const PREPROCESSOR = {
      vega: vgjson => vgjson,
      'vega-lite': (vljson, config) => vl.compile(vljson, { config: config }).spec
  };
  const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
  function isTooltipHandler(h) {
      return typeof h === 'function';
  }
  function viewSource(source, sourceHeader, sourceFooter, mode) {
      const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
      const footer = `</code></pre>${sourceFooter}</body></html>`;
      const win = window.open('');
      win.document.write(header + source + footer);
      win.document.title = `${NAMES[mode]} JSON Source`;
  }
  /**
   * Try to guess the type of spec.
   *
   * @param spec Vega or Vega-Lite spec.
   */
  function guessMode(spec, providedMode) {
      // Decide mode
      if (spec.$schema) {
          const parsed = schemaParser(spec.$schema);
          if (providedMode && providedMode !== parsed.library) {
              console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${NAMES[providedMode] || providedMode}.`);
          }
          const mode = parsed.library;
          if (!semver_32(VERSION[mode], `^${parsed.version.slice(1)}`)) {
              console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
          }
          return mode;
      }
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
  function embed(el, spec, opt = {}) {
      return __awaiter(this, void 0, void 0, function* () {
          const loader = isLoader(opt.loader) ? opt.loader : vega.loader(opt.loader);
          // Load the visualization specification.
          if (vega.isString(spec)) {
              const data = yield loader.load(spec);
              return embed(el, JSON.parse(data), opt);
          }
          // eslint-disable-next-line no-param-reassign, dot-notation
          opt = mergeDeep(opt, spec.usermeta && spec.usermeta['embedOptions']);
          const patch = opt.patch || opt.onBeforeParse;
          const actions = opt.actions === true || opt.actions === false
              ? opt.actions
              : mergeDeep({}, { export: { svg: true, png: true }, source: true, compiled: true, editor: true }, opt.actions || {});
          const i18n = Object.assign({}, I18N, opt.i18n);
          const renderer = opt.renderer || 'canvas';
          const logLevel = opt.logLevel || vega.Warn;
          const downloadFileName = opt.downloadFileName || 'visualization';
          // Load Vega theme/configuration.
          let config = opt.config || {};
          if (vega.isString(config)) {
              const data = yield loader.load(config);
              return embed(el, spec, Object.assign({}, opt, { config: JSON.parse(data) }));
          }
          if (opt.defaultStyle !== false) {
              // Add a default stylesheet to the head of the document.
              const ID = 'vega-embed-style';
              if (!document.getElementById(ID)) {
                  const style = document.createElement('style');
                  style.id = ID;
                  style.innerText =
                      opt.defaultStyle === undefined || opt.defaultStyle === true ? (embedStyle ).toString() : opt.defaultStyle;
                  document.head.appendChild(style);
              }
          }
          if (opt.theme) {
              config = mergeDeep({}, themes[opt.theme], config);
          }
          const mode = guessMode(spec, opt.mode);
          let vgSpec = PREPROCESSOR[mode](spec, config);
          if (mode === 'vega-lite') {
              if (vgSpec.$schema) {
                  const parsed = schemaParser(vgSpec.$schema);
                  if (!semver_32(VERSION.vega, `^${parsed.version.slice(1)}`)) {
                      console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
                  }
              }
          }
          // ensure container div has class 'vega-embed'
          const div = select(el) // d3.select supports elements and strings
              .classed('vega-embed', true)
              .html(''); // clear container
          if (patch) {
              if (patch instanceof Function) {
                  vgSpec = patch(vgSpec);
              }
              else if (vega.isString(patch)) {
                  const patchString = yield loader.load(patch);
                  // eslint-disable-next-line require-atomic-updates
                  vgSpec = mergeDeep({}, vgSpec, JSON.parse(patchString));
              }
              else {
                  vgSpec = mergeDeep({}, vgSpec, patch);
              }
          }
          // Do not apply the config to Vega when we have already applied it to Vega-Lite.
          // This call may throw an Error if parsing fails.
          const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config);
          const view = new vega.View(runtime, {
              loader,
              logLevel,
              renderer
          });
          if (opt.tooltip !== false) {
              let handler;
              if (isTooltipHandler(opt.tooltip)) {
                  handler = opt.tooltip;
              }
              else {
                  // user provided boolean true or tooltip options
                  handler = new Handler(opt.tooltip === true ? {} : opt.tooltip).call;
              }
              view.tooltip(handler);
          }
          let { hover } = opt;
          if (hover === undefined) {
              hover = mode === 'vega';
          }
          if (hover) {
              const { hoverSet, updateSet } = (typeof hover === 'boolean' ? {} : hover);
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
          yield view.initialize(el).runAsync();
          if (actions !== false) {
              let wrapper = div;
              if (opt.defaultStyle !== false) {
                  const details = div.append('details').attr('title', i18n.CLICK_TO_VIEW_ACTIONS);
                  wrapper = details;
                  const summary = details.insert('summary');
                  summary.html(SVG_CIRCLES);
                  const dn = details.node();
                  document.addEventListener('click', evt => {
                      if (!dn.contains(evt.target)) {
                          dn.removeAttribute('open');
                      }
                  });
              }
              const ctrl = wrapper.insert('div').attr('class', 'vega-actions');
              // add 'Export' action
              if (actions === true || actions.export !== false) {
                  for (const ext of ['svg', 'png']) {
                      if (actions === true || actions.export === true || actions.export[ext]) {
                          const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
                          ctrl
                              .append('a')
                              .text(i18nExportAction)
                              .attr('href', '#')
                              .attr('target', '_blank')
                              .attr('download', `${downloadFileName}.${ext}`)
                              // eslint-disable-next-line func-names
                              .on('mousedown', function () {
                              view
                                  .toImageURL(ext, opt.scaleFactor)
                                  .then(url => {
                                  this.href = url;
                              })
                                  .catch(error => {
                                  throw error;
                              });
                              event.preventDefault();
                          });
                      }
                  }
              }
              // add 'View Source' action
              if (actions === true || actions.source !== false) {
                  ctrl
                      .append('a')
                      .text(i18n.SOURCE_ACTION)
                      .attr('href', '#')
                      .on('mousedown', () => {
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
                      .on('mousedown', () => {
                      viewSource(jsonStringifyPrettyCompact(vgSpec), opt.sourceHeader || '', opt.sourceFooter || '', 'vega');
                      event.preventDefault();
                  });
              }
              // add 'Open in Vega Editor' action
              if (actions === true || actions.editor !== false) {
                  const editorUrl = opt.editorUrl || 'https://vega.github.io/editor/';
                  ctrl
                      .append('a')
                      .text(i18n.EDITOR_ACTION)
                      .attr('href', '#')
                      .on('mousedown', () => {
                      post(window, editorUrl, {
                          config: config,
                          mode,
                          renderer,
                          spec: jsonStringifyPrettyCompact(spec)
                      });
                      event.preventDefault();
                  });
              }
          }
          return { view, spec, vgSpec };
      });
  }

  /**
   * Create a promise to an HTML Div element with an embedded Vega-Lite or Vega visualization.
   * The element has a value property with the view. By default all actions except for the editor action are disabled.
   *
   * The main use case is in [Observable](https://observablehq.com/).
   */
  function container (spec, opt = {}) {
      return __awaiter(this, void 0, void 0, function* () {
          const wrapper = document.createElement('div');
          wrapper.classList.add('vega-embed-wrapper');
          const div = document.createElement('div');
          wrapper.appendChild(div);
          const actions = opt.actions === true || opt.actions === false
              ? opt.actions
              : Object.assign({ export: true, source: false, compiled: true, editor: true }, (opt.actions || {}));
          const result = yield embed(div, spec, Object.assign({ actions }, (opt || {})));
          wrapper.value = result.view;
          return wrapper;
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
  const wrapper = (...args) => {
      if (args.length > 1 && ((vegaImport.isString(args[0]) && !isURL(args[0])) || isElement(args[0]) || args.length === 3)) {
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

}));
//# sourceMappingURL=vega-embed.js.map
