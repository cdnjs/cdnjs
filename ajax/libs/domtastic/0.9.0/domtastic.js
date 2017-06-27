!function(_e){function e(){return _e()["default"]};if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.$=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _each = require('./util').each;
var toArray = require('./util').toArray;
var $ = require('./selector').$;
var matches = require('./selector').matches;


var ArrayProto = Array.prototype;

var every = ArrayProto.every;

function filter(selector, thisArg) {
  var callback = typeof selector === "function" ? selector : function (element) {
    return matches(element, selector);
  };
  return $(ArrayProto.filter.call(this, callback, thisArg));
}

function forEach(callback, thisArg) {
  return _each(this, callback, thisArg);
}

var each = forEach;

var indexOf = ArrayProto.indexOf;

var map = ArrayProto.map;

var pop = ArrayProto.pop;

var push = ArrayProto.push;

function reverse() {
  return $(toArray(this).reverse());
}

var shift = ArrayProto.shift;

var some = ArrayProto.some;

var unshift = ArrayProto.unshift;

exports.each = each;
exports.every = every;
exports.filter = filter;
exports.forEach = forEach;
exports.indexOf = indexOf;
exports.map = map;
exports.pop = pop;
exports.push = push;
exports.reverse = reverse;
exports.shift = shift;
exports.some = some;
exports.unshift = unshift;

},{"./selector":13,"./util":17}],2:[function(require,module,exports){
"use strict";

var each = require('./util').each;


function attr(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element ? element.getAttribute(key) : undefined;
  }

  each(this, function (element) {
    if (typeof key === "object") {
      for (var attr in key) {
        element.setAttribute(attr, key[attr]);
      }
    } else {
      element.setAttribute(key, value);
    }
  });

  return this;
}

function removeAttr(key) {
  each(this, function (element) {
    element.removeAttribute(key);
  });
  return this;
}

exports.attr = attr;
exports.removeAttr = removeAttr;

},{"./util":17}],3:[function(require,module,exports){
"use strict";

var each = require('./util').each;


function addClass(value) {
  if (value && value.length) {
    each(value.split(" "), _each.bind(this, "add"));
  }
  return this;
}

function removeClass(value) {
  if (value && value.length) {
    each(value.split(" "), _each.bind(this, "remove"));
  }
  return this;
}

function toggleClass(value) {
  if (value && value.length) {
    each(value.split(" "), _each.bind(this, "toggle"));
  }
  return this;
}

function hasClass(value) {
  return (this.nodeType ? [this] : this).some(function (element) {
    return element.classList.contains(value);
  });
}

function _each(fnName, className) {
  each(this, function (element) {
    element.classList[fnName](className);
  });
}

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;

},{"./util":17}],4:[function(require,module,exports){
"use strict";

function contains(container, element) {
  if (!container || !element || container === element) {
    return false;
  } else if (container.contains) {
    return container.contains(element);
  } else if (container.compareDocumentPosition) {
    return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
  }
  return false;
}


exports.contains = contains;

},{}],5:[function(require,module,exports){
"use strict";

var each = require('./util').each;


function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function camelize(value) {
  return value.replace(/-([\da-z])/gi, function (matches, letter) {
    return letter.toUpperCase();
  });
}

function dasherize(value) {
  return value.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

function css(key, value) {
  var styleProps, prop, val;

  if (typeof key === "string") {
    key = camelize(key);

    if (typeof value === "undefined") {
      var element = this.nodeType ? this : this[0];
      if (element) {
        val = element.style[key];
        return isNumeric(val) ? parseFloat(val) : val;
      }
      return undefined;
    }

    styleProps = {};
    styleProps[key] = value;
  } else {
    styleProps = key;
    for (prop in styleProps) {
      val = styleProps[prop];
      delete styleProps[prop];
      styleProps[camelize(prop)] = val;
    }
  }

  each(this, function (element) {
    for (prop in styleProps) {
      if (styleProps[prop] || styleProps[prop] === 0) {
        element.style[prop] = styleProps[prop];
      } else {
        element.style.removeProperty(dasherize(prop));
      }
    }
  });

  return this;
}

exports.css = css;

},{"./util":17}],6:[function(require,module,exports){
"use strict";

var each = require('./util').each;


var dataKeyProp = "__domtastic_data__";

function data(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element[dataKeyProp] ? element[dataKeyProp][key] : undefined;
  }

  each(this, function (element) {
    element[dataKeyProp] = element[dataKeyProp] || {};
    element[dataKeyProp][key] = value;
  });

  return this;
}

function prop(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element ? element[key] : undefined;
  }

  each(this, function (element) {
    element[key] = value;
  });

  return this;
}


exports.data = data;
exports.prop = prop;

},{"./util":17}],7:[function(require,module,exports){
"use strict";

var toArray = require('./util').toArray;
var $ = require('./selector').$;


function append(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforeend", element);
    } else {
      if (element instanceof Node) {
        this.appendChild(element);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(this.appendChild.bind(this));
      }
    }
  } else {
    _each(this, append, element);
  }
  return this;
}

function prepend(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterbegin", element);
    } else {
      if (element instanceof Node) {
        this.insertBefore(element, this.firstChild);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(prepend.bind(this));
      }
    }
  } else {
    _each(this, prepend, element);
  }
  return this;
}

function before(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforebegin", element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(before.bind(this));
      }
    }
  } else {
    _each(this, before, element);
  }
  return this;
}

function after(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterend", element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this.nextSibling);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(after.bind(this));
      }
    }
  } else {
    _each(this, after, element);
  }
  return this;
}

function clone() {
  return $(_clone(this));
}

function _clone(element) {
  if (typeof element === "string") {
    return element;
  } else if (element instanceof Node) {
    return element.cloneNode(true);
  } else if ("length" in element) {
    return [].map.call(element, function (el) {
      return el.cloneNode(true);
    });
  }
  return element;
}

function _each(collection, fn, element) {
  var l = collection.length;
  while (l--) {
    var elm = l === 0 ? element : _clone(element);
    fn.call(collection[l], elm);
  }
}

exports.append = append;
exports.prepend = prepend;
exports.before = before;
exports.after = after;
exports.clone = clone;

},{"./selector":13,"./util":17}],8:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var append = require('./dom').append;
var before = require('./dom').before;
var after = require('./dom').after;
var $ = require('./selector').$;


function appendTo(element) {
  var context = typeof element === "string" ? $(element) : element;
  append.call(context, this);
  return this;
}

function empty() {
  return each(this, function (element) {
    element.innerHTML = "";
  });
}

function remove() {
  return each(this, function (element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
}

function replaceWith() {
  return before.apply(this, arguments).remove();
}

function text(value) {
  if (value === undefined) {
    return this[0].textContent;
  }

  each(this, function (element) {
    element.textContent = "" + value;
  });

  return this;
}

function val(value) {
  if (value === undefined) {
    return this[0].value;
  }

  each(this, function (element) {
    element.value = value;
  });

  return this;
}

exports.appendTo = appendTo;
exports.empty = empty;
exports.remove = remove;
exports.replaceWith = replaceWith;
exports.text = text;
exports.val = val;

},{"./dom":7,"./selector":13,"./util":17}],9:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var closest = require('./selector').closest;


function on(eventNames, selector, handler, useCapture) {
  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, eventListener;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    eventListener = proxyHandler(handler);

    each(this, function (element) {
      if (selector) {
        eventListener = delegateHandler.bind(element, selector, eventListener);
      }

      element.addEventListener(eventName, eventListener, useCapture || false);

      getHandlers(element).push({
        eventName: eventName,
        handler: handler,
        eventListener: eventListener,
        selector: selector,
        namespace: namespace
      });
    });
  }, this);

  return this;
}

function off(eventNames, selector, handler, useCapture) {
  if (eventNames === undefined) eventNames = "";


  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, handlers;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    each(this, function (element) {
      handlers = getHandlers(element);

      each(handlers.filter(function (item) {
        return ((!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector));
      }), function (item) {
        element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
        handlers.splice(handlers.indexOf(item), 1);
      });

      if (!eventName && !namespace && !selector && !handler) {
        clearHandlers(element);
      } else if (handlers.length === 0) {
        clearHandlers(element);
      }
    });
  }, this);

  return this;
}

var eventKeyProp = "__domtastic_event__";
var id = 1;
var handlers = {};
var unusedKeys = [];

function getHandlers(element) {
  if (!element[eventKeyProp]) {
    element[eventKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
  }
  var key = element[eventKeyProp];
  return handlers[key] || (handlers[key] = []);
}

function clearHandlers(element) {
  var key = element[eventKeyProp];
  if (handlers[key]) {
    handlers[key] = null;
    element[key] = null;
    unusedKeys.push(key);
  }
}

function proxyHandler(handler) {
  return function (event) {
    handler.call(this, augmentEvent(event), event.detail);
  };
}

var augmentEvent = (function () {
  var methodName, eventMethods = {
    preventDefault: "isDefaultPrevented",
    stopImmediatePropagation: "isImmediatePropagationStopped",
    stopPropagation: "isPropagationStopped"
  }, returnTrue = function () {
    return true;
  }, returnFalse = function () {
    return false;
  };

  return function (event) {
    if (!event.isDefaultPrevented || event.stopImmediatePropagation || event.stopPropagation) {
      for (methodName in eventMethods) {
        (function (methodName, testMethodName, originalMethod) {
          event[methodName] = function () {
            this[testMethodName] = returnTrue;
            return originalMethod && originalMethod.apply(this, arguments);
          };
          event[testMethodName] = returnFalse;
        }(methodName, eventMethods[methodName], event[methodName]));
      }
      if (event._preventDefault) {
        event.preventDefault();
      }
    }
    return event;
  };
})();

function delegateHandler(selector, handler, event) {
  var eventTarget = event._target || event.target, currentTarget = closest.call([eventTarget], selector, this)[0];
  if (currentTarget && currentTarget !== this) {
    if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
      handler.call(currentTarget, event);
    }
  }
}

var bind = on, unbind = off;

exports.on = on;
exports.off = off;
exports.bind = bind;
exports.unbind = unbind;

},{"./selector":13,"./util":17}],10:[function(require,module,exports){
"use strict";

var each = require('./util').each;


function html(fragment) {
  if (typeof fragment !== "string") {
    var element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }

  each(this, function (element) {
    element.innerHTML = fragment;
  });

  return this;
}

exports.html = html;

},{"./util":17}],11:[function(require,module,exports){
"use strict";

var global = require('./util').global;


var previousLib = global.$;

function noConflict() {
  global.$ = previousLib;
  return this;
}

exports.noConflict = noConflict;

},{"./util":17}],12:[function(require,module,exports){
"use strict";

function ready(handler) {
  if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
    handler();
  } else {
    document.addEventListener("DOMContentLoaded", handler, false);
  }
  return this;
}

exports.ready = ready;

},{}],13:[function(require,module,exports){
"use strict";

var global = require('./util').global;


var isPrototypeSet = false, reFragment = /^\s*<(\w+|!)[^>]*>/, reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, reSimpleSelector = /^[\.#]?[\w-]*$/;

function $(selector, context) {
  if (context === undefined) context = document;
  return (function () {
    var collection;

    if (!selector) {
      collection = document.querySelectorAll(null);
    } else if (selector instanceof Wrapper) {
      return selector;
    } else if (typeof selector !== "string") {
      collection = selector.nodeType || selector === window ? [selector] : selector;
    } else if (reFragment.test(selector)) {
      collection = createFragment(selector);
    } else {
      context = typeof context === "string" ? document.querySelector(context) : context.length ? context[0] : context;

      collection = querySelector(selector, context);
    }

    return $.isNative ? collection : wrap(collection);
  })();
}

function find(selector) {
  return $(selector, this);
}

var closest = (function () {
  function closest(selector, context) {
    var node = this[0];
    while (node && node !== context) {
      if (matches(node, selector)) {
        return $(node);
      } else {
        node = node.parentElement;
      }
    }
    return $();
  }

  return !Element.prototype.closest ? closest : function (selector, context) {
    if (!context) {
      var node = this[0];
      return $(node.closest(selector));
    } else {
      return closest.call(this, selector, context);
    }
  };
})();

var matches = (function () {
  var context = typeof Element !== "undefined" ? Element.prototype : global, _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
  return function (element, selector) {
    return _matches.call(element, selector);
  };
})();

function querySelector(selector, context) {
  var isSimpleSelector = reSimpleSelector.test(selector);

  if (isSimpleSelector && !$.isNative) {
    if (selector[0] === "#") {
      var element = (context.getElementById ? context : document).getElementById(selector.slice(1));
      return element ? [element] : [];
    }
    if (selector[0] === ".") {
      return context.getElementsByClassName(selector.slice(1));
    }
    return context.getElementsByTagName(selector);
  }

  return context.querySelectorAll(selector);
}

function createFragment(html) {
  if (reSingleTag.test(html)) {
    return [document.createElement(RegExp.$1)];
  }

  var elements = [], container = document.createElement("div"), children = container.childNodes;

  container.innerHTML = html;

  for (var i = 0, l = children.length; i < l; i++) {
    elements.push(children[i]);
  }

  return elements;
}

function wrap(collection) {
  if (!isPrototypeSet) {
    Wrapper.prototype = $.fn;
    Wrapper.prototype.constructor = Wrapper;
    isPrototypeSet = true;
  }

  return new Wrapper(collection);
}

function Wrapper(collection) {
  var i = 0, length = collection.length;
  for (; i < length;) {
    this[i] = collection[i++];
  }
  this.length = length;
}

exports.$ = $;
exports.find = find;
exports.closest = closest;
exports.matches = matches;

},{"./util":17}],14:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var toArray = require('./util').toArray;
var $ = require('./selector').$;
var matches = require('./selector').matches;


function children(selector) {
  var nodes = [];
  each(this, function (element) {
    if (element.children) {
      each(element.children, function (child) {
        if (!selector || (selector && matches(child, selector))) {
          nodes.push(child);
        }
      });
    }
  });
  return $(nodes);
}

function contents() {
  var nodes = [];
  each(this, function (element) {
    nodes.push.apply(nodes, toArray(element.childNodes));
  });
  return $(nodes);
}

function eq(index) {
  return slice.call(this, index, index + 1);
}

function get(index) {
  return this[index];
}

function parent(selector) {
  var nodes = [];
  each(this, function (element) {
    if (!selector || (selector && matches(element.parentNode, selector))) {
      nodes.push(element.parentNode);
    }
  });
  return $(nodes);
}

function slice(start, end) {
  return $([].slice.apply(this, arguments));
}

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.slice = slice;

},{"./selector":13,"./util":17}],15:[function(require,module,exports){
"use strict";

var global = require('./util').global;
var each = require('./util').each;
var contains = require('./contains').contains;


var reMouseEvent = /^(?:mouse|pointer|contextmenu)|click/, reKeyEvent = /^key/;

function trigger(type, data, params) {
  if (params === undefined) params = {};


  params.bubbles = typeof params.bubbles === "boolean" ? params.bubbles : true;
  params.cancelable = typeof params.cancelable === "boolean" ? params.cancelable : true;
  params.preventDefault = typeof params.preventDefault === "boolean" ? params.preventDefault : false;
  params.detail = data;

  var EventConstructor = getEventConstructor(type), event = new EventConstructor(type, params);

  event._preventDefault = params.preventDefault;

  each(this, function (element) {
    if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
      dispatchEvent(element, event);
    } else {
      triggerForPath(element, type, params);
    }
  });
  return this;
}

function getEventConstructor(type) {
  return supportsOtherEventConstructors ? (reMouseEvent.test(type) ? MouseEvent : (reKeyEvent.test(type) ? KeyboardEvent : CustomEvent)) : CustomEvent;
}

function triggerHandler(type, data) {
  if (this[0]) {
    trigger.call(this[0], type, data, { bubbles: false, preventDefault: true });
  }
}

function isAttachedToDocument(element) {
  if (element === window || element === document) {
    return true;
  }
  return contains(element.ownerDocument.documentElement, element);
}

function triggerForPath(element, type, params) {
  if (params === undefined) params = {};
  params.bubbles = false;
  var event = new CustomEvent(type, params);
  event._target = element;
  do {
    dispatchEvent(element, event);
  } while (element = element.parentNode);
}

var directEventMethods = ["blur", "focus", "select", "submit"];

function dispatchEvent(element, event) {
  if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === "function" && !event._preventDefault && !event.cancelable) {
    element[event.type]();
  } else {
    element.dispatchEvent(event);
  }
}

(function () {
  function CustomEvent(event, params) {
    if (params === undefined) params = { bubbles: false, cancelable: false, detail: undefined };
    return (function () {
      var customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return customEvent;
    })();
  }

  CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
  global.CustomEvent = CustomEvent;
})();

var isEventBubblingInDetachedTree = (function () {
  var isBubbling = false, doc = global.document;
  if (doc) {
    var parent = doc.createElement("div"), child = parent.cloneNode();
    parent.appendChild(child);
    parent.addEventListener("e", function () {
      isBubbling = true;
    });
    child.dispatchEvent(new CustomEvent("e", { bubbles: true }));
  }
  return isBubbling;
})();

var supportsOtherEventConstructors = (function () {
  try {
    new window.MouseEvent("click");
  } catch (e) {
    return false;
  }
  return true;
})();

exports.trigger = trigger;
exports.triggerHandler = triggerHandler;

},{"./contains":4,"./util":17}],16:[function(require,module,exports){
"use strict";

function isFunction(obj) {
  return (typeof obj === "function");
}

var isArray = Array.isArray;

exports.isArray = isArray;
exports.isFunction = isFunction;

},{}],17:[function(require,module,exports){
"use strict";

var _slice = Array.prototype.slice;


var global = new Function("return this")();

function toArray(collection) {
  var length = collection.length, result = new Array(length);
  for (var i = 0; i < length; i++) {
    result[i] = collection[i];
  }
  return result;
}

function each(collection, callback, thisArg) {
  var length = collection.length;
  if (length !== undefined && collection.nodeType === undefined) {
    for (var i = 0; i < length; i++) {
      callback.call(thisArg, collection[i], i, collection);
    }
  } else {
    callback.call(thisArg, collection, 0, collection);
  }
  return collection;
}

function extend(target) {
  var sources = _slice.call(arguments, 1);

  sources.forEach(function (src) {
    for (var prop in src) {
      target[prop] = src[prop];
    }
  });
  return target;
}

exports.global = global;
exports.toArray = toArray;
exports.each = each;
exports.extend = extend;

},{}],18:[function(require,module,exports){
"use strict";

var extend = require('./util').extend;


var api = {}, $ = {};

var array = require('./array');

var attr = require('./attr');

var class_ = require('./class');

var contains = require('./contains');

var css = require('./css');

var data = require('./data');

var dom = require('./dom');

var dom_extra = require('./dom_extra');

var event = require('./event');

var html = require('./html');

var noconflict = require('./noconflict');

var ready = require('./ready');

var selector = require('./selector');

var selector_extra = require('./selector_extra');

var trigger = require('./trigger');

var type = require('./type');

if (typeof selector !== "undefined") {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
  api.closest = selector.closest;
}

extend($, contains, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

$.version = "0.9.0";

$.extend = extend;

exports["default"] = $;

},{"./array":1,"./attr":2,"./class":3,"./contains":4,"./css":5,"./data":6,"./dom":7,"./dom_extra":8,"./event":9,"./html":10,"./noconflict":11,"./ready":12,"./selector":13,"./selector_extra":14,"./trigger":15,"./type":16,"./util":17}]},{},[18])(18)
});


//# sourceMappingURL=domtastic.js.map