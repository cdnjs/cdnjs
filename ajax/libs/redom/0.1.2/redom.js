(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redom = global.redom || {})));
}(this, (function (exports) { 'use strict';

function text (content) {
  return document.createTextNode(content);
}

function setChildren (parent, children) {
  var parentEl = parent.el || parent;
  var traverse = parentEl.firstChild;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var childEl = child.el || child;

    if (childEl === traverse) {
      traverse = traverse.nextSibling;
      continue;
    }

    mount$1(parent, child);
  }

  while (traverse) {
    var next = traverse.nextSibling;
    parentEl.removeChild(traverse);
    traverse = next;
  }
}

function doMount (parent, child, before) {
  if (before) {
    parent.insertBefore(child, before.el || before);
  } else {
    parent.appendChild(child);
  }
}

function mount$1 (parent, child, before) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (childEl.nodeType) {
    if (child !== childEl) {
      childEl.view = child;
    }
    if (childEl.mounted) {
      childEl.mounted = false;
      child.unmount && child.unmount();
      notifyUnmountDown(childEl);
    }
    doMount(parentEl, childEl, before);
    if (parentEl.mounted || document.contains(childEl)) {
      childEl.mounted = true;
      child.mount && child.mount();
      notifyMountDown(childEl);
    }
    return true;
  } else if (child.views) {
    child.parent = parent;
    setChildren(parentEl, child.views);
    return true;
  } else if (child.length) {
    for (var i = 0; i < child.length; i++) {
      mount$1(parent, child[i], before);
    }
    return true;
  }
  return false;
}

function unmount (parent, child) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  parentEl.removeChild(childEl);

  childEl.mounted = false;
  childEl.unmount && childEl.unmount();
  notifyUnmountDown(childEl);
}

function notifyMountDown (child) {
  var traverse = child.firstChild;

  while (traverse) {
    if (traverse.mounted) {
      return;
    }
    traverse.mounted = true;
    traverse.view && traverse.view.mount && traverse.view.mount();
    notifyMountDown(traverse);
    traverse = traverse.nextSibling;
  }
}

function notifyUnmountDown (child) {
  var traverse = child.firstChild;

  while (traverse) {
    if (!traverse.mounted) {
      return;
    }
    traverse.mounted = false;
    traverse.view && traverse.view.unmount && traverse.view.unmount();
    notifyUnmountDown(traverse);
    traverse = traverse.nextSibling;
  }
}

var cached = {};
var cachedSVG = {};

var createSVG = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');

function el (query, a, b, c, d, e, f) {
  var len = arguments.length;
  var args;

  if (len === 0) throw new Error('Must pass a query or a component!');

  if (len > 7) {
    args = new Array(len);
    for (var i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
  }

  if (typeof query === 'function') {
    return len === 1 ? new query()
         : len === 2 ? new query(a)
         : len === 3 ? new query(a, b)
         : len === 4 ? new query(a, b, c)
         : len === 5 ? new query(a, b, c, d)
         : len === 6 ? new query(a, b, c, d, e)
         : len === 7 ? new query(a, b, c, d, e, f)
         : new (query.bind.apply(query, args));
  }

  var element = createElement(query);

  return len === 1 ? expand(element)
       : len === 2 ? expand(element, a)
       : len === 3 ? expand(element, a, b)
       : len === 4 ? expand(element, a, b, c)
       : len === 5 ? expand(element, a, b, c, d)
       : len === 6 ? expand(element, a, b, c, d, e)
       : len === 7 ? expand(element, a, b, c, d, e, f)
       : (args[0] = element, expand.apply(this, args));
}

function expand (templateElement) {
  var element = templateElement.cloneNode(false);
  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    if (typeof arg === 'string' || typeof arg === 'number') {
      if (empty) {
        element.textContent = arg;
        empty = false;
      } else {
        element.appendChild(document.createTextNode(arg));
      }
      continue;
    }

    if (typeof arg === 'function') {
      arg = arg(element);
    }

    // null guard before we attempt to mount
    if (arg == null) continue;

    if (mount$1(element, arg)) {
      empty = false;
    } else {
      for (var attr in arg) {
        var value = arg[attr];

        if (attr === 'style') {
          if (typeof value === 'string') {
            element.setAttribute(attr, value);
          } else {
            var elementStyle = element.style;

            for (var key in value) {
              elementStyle[key] = value[key];
            }
          }
        } else if (attr in element) {
          element[attr] = arg[attr];
        } else {
          element.setAttribute(attr, arg[attr]);
        }
      }
    }
  }

  return element;
}

el.extend = function (query) {
  return expand.bind(this, createElement(query));
}

function createElement (query, svg) {
  var cache = svg ? cachedSVG : cached;

  if (query in cached) return cache[query];

  // query parsing magic by https://github.com/maciejhirsz

  var tag, id, className;

  var mode = 0;
  var from = 0;

  for (var i = 0, len = query.length; i <= len; i++) {
    var cp = i === len ? 0 : query.charCodeAt(i);

    //  cp === '#'     cp === '.'     nullterm
    if (cp === 0x23 || cp === 0x2E || cp === 0) {
      if (mode === 0) {
        tag = i  === 0 ? 'div'
            : cp === 0 ? query
            :            query.substring(from, i);
      } else {
        var slice = query.substring(from, i)
        if (mode === 1) {
          id = slice;
        } else if (className) {
          className += ' ' + slice;
        } else {
          className = slice;
        }
      }

      from = i + 1;
      mode = cp === 0x23 ? 1 : 2;
    }
  }

  var el = svg ? createSVG(tag) : document.createElement(tag);

  id && (el.id = id);
  className && (el.className = className);

  return cache[query] = el;
}

function list (View, key, initData) {
  return new List(View, key, initData);
}

function List(View, key, initData) {
  this.View = View;
  this.key = key;
  this.initData = initData;
  this.views = [];

  if (key) {
    this.lookup = {};
  }
}

List.prototype.update = function (data) {
  var View = this.View;
  var key = this.key;
  var initData = this.initData;
  var views = this.views;
  var parent = this.parent;

  if (key) {
    var lookup = this.lookup;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var id = typeof key === 'function' ? key(item) : item[key];
      var view = lookup[id] || (lookup[id] = new View(initData, item, i));

      views[i] = view;
      lookup[id] = view;
    }
    for (var i = data.length; i < views.length; i++) {
      var id = typeof key === 'function' ? key(item) : item[key];

      lookup[id] = null;
      views[i] = null;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var view = views[i] || (views[i] = new View(initData, item, i));

      views[i] = view;
    }
    for (var i = data.length; i < views.length; i++) {
      views[i] = null;
    }
  }

  for (var i = 0; i < views.length; i++) {
    var item = data[i];
    var view = views[i];

    view.update && view.update(item);
  }

  views.length = data.length;

  parent && setChildren(parent, views);
}

function createElementCurry (single) {
  return function (a, b) {
    if (arguments.length === 2) {
      return function (el) {
        single(el, a, b);
      }
    } else {
      return function (el) {
        for (var key in a) {
          single(el, key, a[key]);
        }
      }
    }
  }
}

var on = createElementCurry(function (el, event, callback) {
  el.addEventListener(event, function (e) {
    callback.call(el.view, e);
  });
});

var clones = {};

function svg (query) {
  var clone = clones[query] || (clones[query] = createElement(query, true));
  var element = clone.cloneNode(false);
  var empty = true;

  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg == null) continue;

    if (typeof arg === 'function') {
      arg = arg(element);
    }

    if (empty && (arg === String || arg === Number)) {
      element.textContent = arg;
      empty = false;
      continue;
    }

    if (arg == null) continue;

    if (mount(element, arg)) {
      empty = false;
      continue;
    }

    for (var attr in arg) {
      if (attr === 'style') {
        var elementStyle = element.style;
        var style = arg.style;
        if (typeof style !== 'string') {
          for (var key in style) {
            elementStyle[key] = style[key];
          }
        } else {
          element.setAttribute(attr, arg[attr]);
        }
      } else {
        element.setAttribute(attr, arg[attr]);
      }
    }
  }

  return element;
}

svg.extend = function (query) {
  return svg.bind(this, query);
}

function view (proto) {
  return function (a, b, c, d) {
    var view = Object.create(proto);
    var len = arguments.length;

    switch (len) {
      case 0: proto.init.call(view); break;
      case 1: proto.init.call(view, a); break;
      case 2: proto.init.call(view, a, b); break;
      case 3: proto.init.call(view, a, b, c); break;
      
      default:
        var args = new Array(len);
        var i = 0;
        while (i < len) {
          proto.init.apply(view, args);
        }
      break;
    }

    return view;
  }
}

exports.el = el;
exports.createElement = createElement;
exports.list = list;
exports.List = List;
exports.mount = mount$1;
exports.unmount = unmount;
exports.on = on;
exports.text = text;
exports.setChildren = setChildren;
exports.svg = svg;
exports.view = view;

Object.defineProperty(exports, '__esModule', { value: true });

})));