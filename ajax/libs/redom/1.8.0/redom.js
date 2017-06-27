(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redom = global.redom || {})));
}(this, (function (exports) { 'use strict';

var HASH = '#'.charCodeAt(0);
var DOT = '.'.charCodeAt(0);

function createElement (query, ns) {
  var tag;
  var id;
  var className;

  var mode = 0;
  var start = 0;

  for (var i = 0; i <= query.length; i++) {
    var char = query.charCodeAt(i);

    if (char === HASH || char === DOT || !char) {
      if (mode === 0) {
        if (i === 0) {
          tag = 'div';
        } else if (!char) {
          tag = query;
        } else {
          tag = query.substring(start, i);
        }
      } else {
        var slice = query.substring(start, i);

        if (mode === 1) {
          id = slice;
        } else if (className) {
          className += ' ' + slice;
        } else {
          className = slice;
        }
      }

      start = i + 1;

      if (char === HASH) {
        mode = 1;
      } else {
        mode = 2;
      }
    }
  }

  var element = ns ? document.createElementNS(ns, tag) : document.createElement(tag);

  if (id) {
    element.id = id;
  }

  if (className) {
    element.className = className;
  }

  return element;
}

function text (content) {
  return document.createTextNode(content);
}

function mount (parent, child, before) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (childEl.__redom_list) {
    childEl = childEl.el;
  }

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  if (child !== childEl) {
    childEl.__redom_view = child;
  }
  if (child.isMounted) {
    child.remount && child.remount();
  } else {
    child.mount && child.mount();
  }
  if (before) {
    parentEl.insertBefore(childEl, before.el || before);
  } else {
    parentEl.appendChild(childEl);
  }
  if (child.isMounted) {
    child.remounted && child.remounted();
  } else {
    child.isMounted = true;
    child.mounted && child.mounted();
  }
}

function unmount (parent, child) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  child.unmount && child.unmount();

  parentEl.removeChild(childEl);

  child.isMounted = false;
  child.unmounted && child.unmounted();
}

var elcache = {};

function el (query) {
  var arguments$1 = arguments;

  var element;

  if (typeof query === 'string') {
    element = (elcache[query] || (elcache[query] = createElement(query))).cloneNode(false);
  } else if (query && query.nodeType) {
    element = query.cloneNode(false);
  } else {
    throw new Error('At least one argument required');
  }

  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments$1[i];

    if (!arg) {
      continue;
    }

    // support middleware
    if (typeof arg === 'function') {
      arg(element);
    } else if (typeof arg === 'string' || typeof arg === 'number') {
      if (empty) {
        empty = false;
        element.textContent = arg;
      } else {
        element.appendChild(text(arg));
      }
    } else if (arg.nodeType || (arg.el && arg.el.nodeType)) {
      empty = false;
      mount(element, arg);
    } else if (arg.length) {
      empty = false;
      for (var j = 0; j < arg.length; j++) {
        mount(element, arg[j]);
      }
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        var value = arg[key];

        if (key === 'style') {
          if (typeof value === 'string') {
            element.setAttribute(key, value);
          } else {
            for (var cssKey in value) {
              element.style[cssKey] = value[cssKey];
            }
          }
        } else if (key in element || typeof value === 'function') {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
  }

  return element;
}

el.extend = function (query) {
  var clone = (elcache[query] || (elcache[query] = createElement(query)));

  return el.bind(this, clone);
};

function setChildren (parent, children) {
  var parentEl = parent.el || parent;
  var traverse = parentEl.firstChild;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    if (!child) {
      continue;
    }

    var childEl = child.el || child;

    if (childEl === traverse) {
      traverse = traverse.nextSibling;
      continue;
    }

    mount(parent, child, traverse);
  }

  while (traverse) {
    var next = traverse.nextSibling;

    unmount(parent, traverse);

    traverse = next;
  }
}

function list (parent, View, key, initData) {
  return new List(parent, View, key, initData);
}

function List (parent, View, key, initData) {
  this.__redom_list = true;
  this.View = View;
  this.key = key;
  this.initData = initData;
  this.views = [];
  this.el = typeof parent === 'string' ? el(parent) : parent;

  if (key) {
    this.lookup = {};
  }
}

List.extend = function (parent, View, key, initData) {
  return List.bind(List, parent, View, key, initData);
};

list.extend = List.extend;

List.prototype.update = function (data) {
  if ( data === void 0 ) data = [];

  var View = this.View;
  var key = this.key;
  var functionKey = typeof key === 'function';
  var initData = this.initData;
  var newViews = new Array(data.length);
  var oldViews = this.views;
  var newLookup = key && {};
  var oldLookup = key && this.lookup;

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var view = (void 0);

    if (key) {
      var id = functionKey ? key(item) : item[key];
      view = newViews[i] = oldLookup[id] || new View(initData, item, i, data);
      newLookup[id] = view;
      view.__id = id;
    } else {
      view = newViews[i] = oldViews[i] || new View(initData, item, i, data);
    }
    var el$$1 = view.el;
    if (el$$1.__redom_list) {
      el$$1 = el$$1.el;
    }
    el$$1.__redom_view = view;
    view.update && view.update(item, i, data);
  }

  setChildren(this, newViews);

  if (key) {
    this.lookup = newLookup;
  }
  this.views = newViews;
};

function router (parent, Views) {
  return new Router(parent, Views);
}

var Router = function Router (parent, Views) {
  this.el = typeof parent === 'string' ? el(parent) : parent;
  this.Views = Views;
};
Router.prototype.update = function update (route, data) {
  if (route !== this.route) {
    var Views = this.Views;
    var View = Views[route];

    this.view = View && new View();
    this.route = route;

    setChildren(this.el, [ this.view ]);
  }
  this.view && this.view.update && this.view.update(data);
};

var SVG = 'http://www.w3.org/2000/svg';

var svgcache = {};

function svg (query, a) {
  var arguments$1 = arguments;

  var element;

  if (typeof query === 'string') {
    element = (svgcache[query] || (svgcache[query] = createElement(query, SVG))).cloneNode(false);
  } else if (query && query.nodeType) {
    element = query.cloneNode(false);
  } else {
    throw new Error('At least one argument required');
  }

  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments$1[i];

    if (!arg) {
      continue;
    } else if (typeof arg === 'function') {
      arg = arg(element);
    } else if (typeof arg === 'string' || typeof arg === 'number') {
      if (empty) {
        empty = false;
        element.textContent = arg;
      } else {
        element.appendChild(text(arg));
      }
    } else if (arg.nodeType || (arg.el && arg.el.nodeType)) {
      empty = false;
      mount(element, arg);
    } else if (typeof arg === 'object') {
      for (var key in arg) {
        var value = arg[key];

        if (key === 'style' && typeof value !== 'string') {
          for (var cssKey in value) {
            element.style[cssKey] = value[cssKey];
          }
        } else if (typeof value === 'function') {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
  }

  return element;
}

svg.extend = function (query) {
  var clone = (svgcache[query] || (svgcache[query] = createElement(query, SVG)));

  return svg.bind(this, clone);
};

exports.el = el;
exports.list = list;
exports.List = List;
exports.mount = mount;
exports.unmount = unmount;
exports.router = router;
exports.Router = Router;
exports.setChildren = setChildren;
exports.svg = svg;
exports.text = text;

Object.defineProperty(exports, '__esModule', { value: true });

})));
