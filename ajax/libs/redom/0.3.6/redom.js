(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redom = global.redom || {})));
}(this, (function (exports) { 'use strict';

var doc = document;

function createElement (query, ns) {
  // query parsing magic by https://github.com/maciejhirsz

  var tag, id, className;

  var mode = 0;
  var start = 0;

  for (var i = 0, len = query.length; i <= len; i++) {
    var cp = i === len ? 0 : query.charCodeAt(i);

    //  cp === '#'     cp === '.'     nullterm
    if (cp === 0x23 || cp === 0x2E || cp === 0) {
      if (mode === 0) {
        tag = i  === 0 ? 'div'
            : cp === 0 ? query
            :            query.substring(start, i);
      } else {
        var slice = query.substring(start, i)
        if (mode === 1) {
          id = slice;
        } else if (className) {
          className += ' ' + slice;
        } else {
          className = slice;
        }
      }

      start = i + 1;
      mode = cp === 0x23 ? 1 : 2;
    }
  }
  if (ns) {
    var element = doc.createElementNS(ns, tag);
  } else {
    var element = doc.createElement(tag);
  }

  if (id) element.id = id;
  if (className) element.className = className;

  return element;
}

function text (content) {
  return doc.createTextNode(content);
}

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

    mount(parent, child);
  }

  while (traverse) {
    var next = traverse.nextSibling;

    unmount(parent, traverse);

    traverse = next;
  }
}

function mount (parent, child, before) {
  if (child == null) {
    return;
  }

  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided 
    child = childEl.__redom_view;
  }

  if (childEl.nodeType) {
    if (child !== childEl) {
      childEl.__redom_view = child;
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
    return true;
  }
  return false;
}

function unmount (parent, child) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  parentEl.removeChild(childEl);

  child.isMounted = false;
  child.unmounted && child.unmounted();
}

var cache = {};

function el (query, a) {
  if (typeof query === 'function') {
    // support JSX <Myclass> -style – with RE:DOM you can just call "new Myclass" instead
    var len = arguments.length - 1;

    if (len < 2) {
      // the most usual case
      return new query(a);
    } else {
      var args = new Array(len);
      var i = 0;

      while (i < len) args[++i] = arguments[i];

      return new (query.bind.apply(query, args));
    }
  }
  var element = (cache[query] || (cache[query] = createElement(query))).cloneNode(false);
  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    parseArgument(element, empty, arg);
  }

  return element;
}

el.extend = function (query) {
  return el.bind(this, query);
}

function parseArgument (element, empty, arg) {
  // support middleware
  while (typeof arg === 'function') {
    arg = arg(element);
  }

  if (mount(element, arg)) {
    return;
  } else if (typeof arg === 'string' || typeof arg === 'number') {
    if (empty) {
      element.textContent = arg;
    } else {
      element.appendChild(text(arg));
    }
  } else {
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
        element[key] = value;
      } else if (key in element || typeof value === 'function') {
        element[key] = value;
        if (key === 'autofocus') {
          element.focus();
        }
      } else {
        element.setAttribute(key, value);
      }
    }
  }
}

function list (parent, View, key, initData) {
  return new List(parent, View, key, initData);
}

function List(parent, View, key, initData) {
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
}

list.extend = List.extend;

List.prototype.update = function (data) {
  var View = this.View;
  var key = this.key;
  var initData = this.initData;
  var views = this.views;
  var parent = this.el;
  var traverse = parent.firstChild;

  if (key) {
    var lookup = this.lookup;
  }

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (key) {
      var id = typeof key === 'function' ? key(item) : item[key];
      var view = views[i] = lookup[id] || (lookup[id] = new View(initData, item, i));
      view.__id = id;
    } else {
      var view = views[i] || (views[i] = new View(initData, item, i));
    }
    var el = view.el;
    view.el = el;
    el.__redom_view = view;
    view.update && view.update(item);

    if (traverse === el) {
      traverse = traverse.nextSibling;
      continue;
    }

    mount(parent, view, traverse);
  }

  while (traverse) {
    var next = traverse.nextSibling;

    if (key) {
      var view = traverse.__redom_view;
      if (view) {
        var id = view.__id;
        lookup[id] = null;
      }
    }
    views[i++] = null;
    unmount(parent, view || traverse);

    traverse = next;
  }

  views.length = data.length;
}

var cache$1 = {};

function svg (query, a) {
  var element = (cache$1[query] || (cache$1[query] = createElement(query))).cloneNode(false);
  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    parseArgument$1(element, empty, arg);
  }

  return element;
}

svg.extend = function (query) {
  return svg.bind(this, query);
}

function parseArgument$1 (element, empty, arg) {
  while (typeof arg === 'function') {
    arg = arg(element);
  }

  if (mount(element, arg)) {
    return;
  } else if (typeof arg === 'string' || typeof arg === 'number') {
    if (empty) {
      element.textContent = arg;
    } else {
      element.appendChild(text(arg));
    }
  } else {
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

exports.el = el;
exports.list = list;
exports.List = List;
exports.mount = mount;
exports.unmount = unmount;
exports.setChildren = setChildren;
exports.svg = svg;
exports.text = text;

Object.defineProperty(exports, '__esModule', { value: true });

})));