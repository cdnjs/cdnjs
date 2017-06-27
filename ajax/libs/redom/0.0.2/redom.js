(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redom = global.redom || {})));
}(this, (function (exports) { 'use strict';

function attrs (_attrs) {
  return function (el) {
    for (var key in _attrs) {
      el.setAttribute(key, _attrs[key]);
    }
  }
}

function setAttrs (el, _attrs) {
  return attrs(_attrs)(el);
}

function children (handler) {
  return function (el) {
    var _children = handler instanceof Array ? handler : handler(el);

    for (var i = 0; i < _children.length; i++) {
      var child = _children[i];

      if (child && child.nodeType) {
        el.appendChild(child);
      }
    }
  }
}

function setChildren(parent, _children) {
  var traverse = parent.firstChild;

  for (var i = 0; i < _children.length; i++) {
    var child = _children[i];

    if (child === traverse) {
      traverse = traverse.nextSibling;
    }

    if (child && child.nodeType) {
      if (traverse) {
        parent.insertBefore(child, traverse);
      } else {
        parent.appendChild(child);
      }
    }
  }

  while (traverse) {
    var next = traverse.nextSibling;

    parent.removeChild(traverse);

    traverse = next;
  }
}

function clearChildren (parent) {
  setChildren(parent, []);
}

function className (className) {
  return function (el) {
    el.className = className;
  }
}
function classList (classes) {
  return function (el) {
    for (var className in classes) {
      if (classes[className]) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }
}

function setClassList (el, classes) {
  return classList(classes)(el);
}

function extend () {
  var el = this.cloneNode(true);

  for (var i = 0; i < arguments.length; i++) {
    arguments[i](el);
  }

  return el;
}

var cached$1 = {};

function el (tagName) {
  return cached$1[tagName] || (cached$1[tagName] = extend.bind(document.createElement(tagName)));
}

function events (_events) {
  return function (el) {
    for (var key in _events) {
      el[key] = function (e) {
        _events[key](el, e);
      }
    }
  }
}

function id (id) {
  return function (el) {
    el.setAttribute('id', id);
  }
}

function list (el, factory, keyResolver) {
  el.lookup = {};

  el.update = function (data) {
    var lookup = el.lookup;
    var newLookup = {};
    var views = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (keyResolver) {
        var id = keyResolver(item);
      } else {
        var id = i;
      }

      var view = newLookup[id] = lookup[id] || (newLookup[id] = factory(item, i));
      view && view.update(item);
      views.push(view);
    }
    setChildren(el, views);
    el.lookup = newLookup;
  }
  return el;
}

function mount (parent, child, before) {
  if (before) {
    parent.insertBefore(child, before);
  } else {
    parent.appendChild(child);
  }
}

function props (_props) {
  return function (el) {
    for (var key in _props) {
      el[key] = _props[key];
    }
  }
}

function setProps (el, _props) {
  return props(_props)(el);
}

var SVG = 'http://www.w3.org/2000/svg';

function svg (tagName) {
  return cached[tagName] || (cached[tagName] = extend.bind(document.createElementNS(SVG, tagName)))
}

function text (text) {
  return function (el) {
    el.appendChild(document.createTextNode(text));
  }
}

function update (handler) {
  return function (el) {
    if (el.update) {
      var originalUpdate = el.update;
      el.update = function (data) {
        handler(el, data);
        originalUpdate(el, data);
      }
    } else {
      el.update = function (data) {
        handler(el, data);
      }
    }
  }
}

exports.attrs = attrs;
exports.setAttrs = setAttrs;
exports.children = children;
exports.setChildren = setChildren;
exports.clearChildren = clearChildren;
exports.className = className;
exports.classList = classList;
exports.setClassList = setClassList;
exports.el = el;
exports.events = events;
exports.id = id;
exports.list = list;
exports.mount = mount;
exports.props = props;
exports.setProps = setProps;
exports.svg = svg;
exports.text = text;
exports.update = update;

Object.defineProperty(exports, '__esModule', { value: true });

})));