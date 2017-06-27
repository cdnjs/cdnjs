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
      }

      var isPrimitive = typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean';

      if (isPrimitive || ((arg.el || arg) instanceof Node) || (arg instanceof List)) {
        if (isPrimitive) {
          mount(element, text(arg));
        } else {
          mount(element, arg);
        }
      } else {
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
      }

      var isPrimitive = typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean';

      if (isPrimitive || ((arg.el || arg) instanceof Node) || (arg instanceof List)) {
        if (isPrimitive) {
          mount(element, text(arg));
        } else {
          mount(element, arg);
        }
      } else {
        for (var attr in arg) {
          element.setAttribute(attr, arg[attr]);
        }
      }
    }

    return element;
  }

  function list (View, key, initData) {
    return new List(View, key, initData);
  }

  function List (View, key, initData) {
    this.View = View;
    this.key = key;
    this.initData = initData;

    this.lookup = key != null ? {} : [];
    this.views = [];
  }

  List.prototype.update = function (data, cb) {
    var View = this.View;
    var key = this.key;
    var lookup = this.lookup;
    var views = this.views;

    var newLookup = key ? {} : [];

    var added = [];
    var updated = [];
    var removed = [];

    views.length = data.length;

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var id = key != null ? item[key] : i;
      var view = lookup[id];

      if (!view) {
        view = new View(this.initData, item);

        added[added.length] = view;
      } else {
        updated[updated.length] = view;
      }

      view.update && view.update(item);
      views[i] = view;

      newLookup[id] = view;
    }

    for (var id in lookup) {
      if (!newLookup[id]) {
        var view = lookup[id];

        view.el.removing = true;

        removed[removed.length] = view;
      }
    }

    if (this.parent) {
      setChildren(this.parent, views);
    }

    for (var i = 0; i < views.length; i++) {
      var item = data[i];
      var view = views[i];

      view.updated && view.updated(item);
    }

    this.lookup = newLookup;

    cb && cb(added, updated, removed);

    for (var i = 0; i < removed.length; i++) {
      var view = removed[i];
      
      if (view.remove) {
        this.parent && scheduleRemove(this.parent, view);
      } else {
        this.parent && unmount(this.parent, view);
      }
    }

    return this;
  }

  function scheduleRemove (parent, child) {
    child.remove(function () {
      unmount(parent, child);
    });
  }

  function mount (parent, child) {
    var parentNode = parent.el || parent;
    var childNode = child.el || child;

    if (child instanceof List) {
      child.parent = parent;
      setChildren(parent, child.views);
      return;
    }
    if (child.el) {
      parentNode.appendChild(childNode);

      if (child.parent) {
        child.reorder && child.reorder();
      } else {
        child.mount && child.mount();
      }
      child.parent = parent;
    } else {
      parentNode.appendChild(childNode);
    }
  }

  function mountBefore (parent, child, before) {
    var parentNode = parent.el || parent;
    var childNode = child.el || child;
    var beforeNode = before.el || before;

    parentNode.insertBefore(childNode, beforeNode);

    if (child.el) {
      if (child.parent) {
        child.reorder && child.reorder();
      } else {
        child.mount && child.mount();
      }

      child.parent = parent;
    }
  }

  function unmount (parent, child) {
    var parentNode = parent.el || parent;
    var childNode = child.el || child;

    parentNode.removeChild(childNode);

    if (child.el) {
      child.parent = null;
      child.unmount && child.unmount();
    }
  }

  function setChildren (parent, children) {
    var parentNode = parent.el || parent;
    var traverse = parentNode.firstChild;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var childNode = child.el || child;

      if (childNode === traverse) {
        traverse = traverse.nextSibling;
        continue;
      }

      if (traverse) {
        mountBefore(parent, child, traverse);
      } else {
        mount(parent, child);
      }
    }

    while (traverse) {
      var next = traverse.nextSibling;

      if (!traverse.removing) {
        parentNode.removeChild(traverse);
      }

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