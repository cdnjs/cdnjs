(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.frzr = global.frzr || {})));
}(this, function (exports) { 'use strict';

  function text (str) {
    return document.createTextNode(str);
  }

  function el (tagName) {
    var element = document.createElement(tagName);

    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];

      if (arg == null) {
        continue;
      } else if (mount(element, arg)) {
        continue;
      } else if (typeof arg === 'object') {
        for (var attr in arg) {
          if (element[attr] != null) {
            element[attr] = arg[attr];
          } else {
            element.setAttribute(attr, arg[attr]);
          }
        }
      }
    }

    return element;
  }

  function svg (tagName) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];

      if (arg == null) {
        continue;
      } else if (mount(element, arg)) {
        continue;
      } else if (typeof arg === 'object') {
        for (var attr in arg) {
          element.setAttribute(attr, arg[attr]);
        }
      }
    }

    return element;
  }

  function list (View, key, initData, skipRender) {
    return new List(View, key, initData, skipRender);
  }

  function List (View, key, initData, skipRender) {
    this.View = View;
    this.views = [];
    this.initData = initData;
    this.skipRender = skipRender;

    if (key) {
      this.key = key;
      this.lookup = {};
    }
  }

  List.prototype.update = function (data, cb) {
    var View = this.View;
    var views = this.views;
    var parent = this.parent;
    var key = this.key;
    var initData = this.initData;
    var skipRender = this.skipRender;

    if (cb) {
      var added = [];
      var updated = [];
      var removed = [];
    }

    if (key) {
      var lookup = this.lookup;
      var newLookup = {};

      views.length = data.length;

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var id = item[key];
        var view = lookup[id];

        if (!view) {
          view = new View(initData, item);
          cb && added.push(view);
        } else {
          cb && updated.push(view);
        }

        views[i] = newLookup[id] = view;

        view.update && view.update(item);
      }

      for (var id in lookup) {
        if (!newLookup[id]) {
          cb && removed.push(lookup[id]);
          !skipRender && parent && unmount(parent, lookup[id]);
        }
      }

      this.lookup = newLookup;
    } else {
      for (var i = data.length; i < views.length; i++) {
        var view = views[i];

        !skipRender && parent && unmount(parent, view);
        cb && removed.push(view);
      }

      views.length = data.length;

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var view = views[i];

        if (!view) {
          view = new View(initData, item);
          cb && added.push(view);
        } else {
          cb && updated.push(view);
        }

        view.update && view.update(item);
        views[i] = view;
      }
    }

    !skipRender && parent && setChildren(parent, views);
    cb && cb(added, updated, removed);
  }

  function mount (parent, child, before) {
    var parentEl = parent.el || parent;
    var childEl = child.el || child;

    if (childEl instanceof Node) {
      if (before) {
        var beforeEl = before;
        parentEl.insertBefore(childEl, beforeEl);
      } else {
        parentEl.appendChild(childEl);
      }
      
      if (child.el !== child) {
        child.parent = parent;
      }

    } else if (isPrimitive(childEl)) {
      mount(parentEl, document.createTextNode(childEl), before);

    } else if (childEl instanceof Array) {
      for (var i = 0; i < childEl.length; i++) {
        mount(parentEl, childEl[i], before);
      }

    } else if (child instanceof List) {
      child.parent = parent;
      setChildren(parentEl, child.views);

    } else {
      return false;
    }
    return true;
  }

  var mountBefore = mount;

  function unmount (parent, child) {
    var parentEl = parent.el || parent;
    var childEl = child.el || child;

    parentEl.removeChild(childEl);

    if (childEl !== child) {
      child.parent = null;
    }
  }

  function isPrimitive (check) {
    return typeof check === 'string' || check === 'number' || check === 'boolean';
  }

  function setChildren (parent, children) {
    var parentEl = parent.el || parent;
    var traverse = parentEl.firstChild;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var childEl = child.el || child;

      if (traverse === childEl) {
        traverse = traverse.nextSibling;
        continue;
      }

      mount(parent, child, traverse);
    }

    while (traverse) {
      var next = traverse.nextSibling;

      unmount(parentEl, traverse);

      traverse = next;
    }
  }

  exports.text = text;
  exports.el = el;
  exports.svg = svg;
  exports.list = list;
  exports.List = List;
  exports.mount = mount;
  exports.mountBefore = mountBefore;
  exports.unmount = unmount;
  exports.setChildren = setChildren;

}));