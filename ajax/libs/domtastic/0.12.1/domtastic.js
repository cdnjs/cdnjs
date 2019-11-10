(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _selectorIndex = require(17);

var ArrayProto = Array.prototype;

var every = ArrayProto.every;

function filter(selector, thisArg) {
  var callback = typeof selector === 'function' ? selector : function (element) {
    return _selectorIndex.matches(element, selector);
  };
  return _selectorIndex.$(ArrayProto.filter.call(this, callback, thisArg));
}

function forEach(callback, thisArg) {
  return _util.each(this, callback, thisArg);
}

var each = forEach;

var indexOf = ArrayProto.indexOf;

var map = ArrayProto.map;

var pop = ArrayProto.pop;

var push = ArrayProto.push;

var reduce = ArrayProto.reduce;

var reduceRight = ArrayProto.reduceRight;

function reverse() {
  return _selectorIndex.$(_util.toArray(this).reverse());
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
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reverse = reverse;
exports.shift = shift;
exports.some = some;
exports.unshift = unshift;

},{"17":17,"19":19}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selectorIndex = require(17);

var _util = require(19);

exports['default'] = function (api) {
    var BaseClass = function BaseClass() {
        _classCallCheck(this, BaseClass);

        _selectorIndex.Wrapper.call(this, _selectorIndex.$.apply(undefined, arguments));
    };

    _util.extend(BaseClass.prototype, api);
    return BaseClass;
};

module.exports = exports['default'];

},{"17":17,"19":19}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var isNumeric = function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

var camelize = function camelize(value) {
    return value.replace(/-([\da-z])/gi, function (matches, letter) {
        return letter.toUpperCase();
    });
};

var dasherize = function dasherize(value) {
    return value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};

function css(key, value) {

    var styleProps = undefined,
        prop = undefined,
        val = undefined;

    if (typeof key === 'string') {
        key = camelize(key);

        if (typeof value === 'undefined') {
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

    _util.each(this, function (element) {
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

},{"19":19}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

function attr(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element ? element.getAttribute(key) : undefined;
    }

    _util.each(this, function (element) {
        if (typeof key === 'object') {
            for (var _attr in key) {
                element.setAttribute(_attr, key[_attr]);
            }
        } else {
            element.setAttribute(key, value);
        }
    });

    return this;
}

function removeAttr(key) {
    _util.each(this, function (element) {
        return element.removeAttribute(key);
    });
    return this;
}

exports.attr = attr;
exports.removeAttr = removeAttr;

},{"19":19}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

function addClass(value) {
    if (value && value.length) {
        _util.each(value.split(' '), _each.bind(this, 'add'));
    }
    return this;
}

function removeClass(value) {
    if (value && value.length) {
        _util.each(value.split(' '), _each.bind(this, 'remove'));
    }
    return this;
}

function toggleClass(value) {
    if (value && value.length) {
        _util.each(value.split(' '), _each.bind(this, 'toggle'));
    }
    return this;
}

function hasClass(value) {
    return (this.nodeType ? [this] : this).some(function (element) {
        return element.classList.contains(value);
    });
}

function _each(fnName, className) {
    _util.each(this, function (element) {
        return element.classList[fnName](className);
    });
}

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;

},{"19":19}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

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

},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var DATAKEYPROP = '__DOMTASTIC_DATA__';

function data(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element[DATAKEYPROP] ? element[DATAKEYPROP][key] : undefined;
    }

    _util.each(this, function (element) {
        element[DATAKEYPROP] = element[DATAKEYPROP] || {};
        element[DATAKEYPROP][key] = value;
    });

    return this;
}

function prop(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element ? element[key] : undefined;
    }

    _util.each(this, function (element) {
        return element[key] = value;
    });

    return this;
}

exports.data = data;
exports.prop = prop;

},{"19":19}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _index = require(10);

var _selectorIndex = require(17);

function appendTo(element) {
    var context = typeof element === 'string' ? _selectorIndex.$(element) : element;
    _index.append.call(context, this);
    return this;
}

function empty() {
    return _util.each(this, function (element) {
        return element.innerHTML = '';
    });
}

function remove() {
    return _util.each(this, function (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

function replaceWith() {
    return _index.before.apply(this, arguments).remove();
}

function text(value) {

    if (value === undefined) {
        return this[0].textContent;
    }

    _util.each(this, function (element) {
        return element.textContent = '' + value;
    });

    return this;
}

function val(value) {

    if (value === undefined) {
        return this[0].value;
    }

    _util.each(this, function (element) {
        return element.value = value;
    });

    return this;
}

exports.appendTo = appendTo;
exports.empty = empty;
exports.remove = remove;
exports.replaceWith = replaceWith;
exports.text = text;
exports.val = val;

},{"10":10,"17":17,"19":19}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

function html(fragment) {

  if (typeof fragment !== 'string') {
    var element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }

  _util.each(this, function (element) {
    return element.innerHTML = fragment;
  });

  return this;
}

exports.html = html;

},{"19":19}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _selectorIndex = require(17);

var forEach = Array.prototype.forEach;

function append(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if (element instanceof Node) {
                this.appendChild(element);
            } else {
                var elements = element instanceof NodeList ? _util.toArray(element) : element;
                forEach.call(elements, this.appendChild.bind(this));
            }
        }
    } else {
        _each(this, append, element);
    }
    return this;
}

function prepend(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('afterbegin', element);
        } else {
            if (element instanceof Node) {
                this.insertBefore(element, this.firstChild);
            } else {
                var elements = element instanceof NodeList ? _util.toArray(element) : element;
                forEach.call(elements.reverse(), prepend.bind(this));
            }
        }
    } else {
        _each(this, prepend, element);
    }
    return this;
}

function before(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('beforebegin', element);
        } else {
            if (element instanceof Node) {
                this.parentNode.insertBefore(element, this);
            } else {
                var elements = element instanceof NodeList ? _util.toArray(element) : element;
                forEach.call(elements, before.bind(this));
            }
        }
    } else {
        _each(this, before, element);
    }
    return this;
}

function after(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('afterend', element);
        } else {
            if (element instanceof Node) {
                this.parentNode.insertBefore(element, this.nextSibling);
            } else {
                var elements = element instanceof NodeList ? _util.toArray(element) : element;
                forEach.call(elements.reverse(), after.bind(this));
            }
        }
    } else {
        _each(this, after, element);
    }
    return this;
}

function clone() {
    return _selectorIndex.$(_clone(this));
}

function _clone(element) {
    if (typeof element === 'string') {
        return element;
    } else if (element instanceof Node) {
        return element.cloneNode(true);
    } else if ('length' in element) {
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

},{"17":17,"19":19}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _selectorClosest = require(15);

function on(eventNames, selector, handler, useCapture, once) {
    var _this = this;

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts = undefined,
        namespace = undefined,
        eventListener = undefined;

    eventNames.split(' ').forEach(function (eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        eventListener = proxyHandler(handler);

        _util.each(_this, function (element) {

            if (selector) {
                eventListener = delegateHandler.bind(element, selector, eventListener);
            }

            if (once) {
                (function () {
                    var listener = eventListener;
                    eventListener = function (event) {
                        off.call(element, eventNames, selector, handler, useCapture);
                        listener.call(element, event);
                    };
                })();
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
    if (eventNames === undefined) eventNames = '';

    var _this2 = this;

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts = undefined,
        namespace = undefined,
        handlers = undefined;

    eventNames.split(' ').forEach(function (eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        _util.each(_this2, function (element) {

            handlers = getHandlers(element);

            _util.each(handlers.filter(function (item) {
                return (!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector);
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

function one(eventNames, selector, handler, useCapture) {
    return on.call(this, eventNames, selector, handler, useCapture, 1);
}

var eventKeyProp = '__domtastic_event__';
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
        element[eventKeyProp] = null;
        unusedKeys.push(key);
    }
}

function proxyHandler(handler) {
    return function (event) {
        handler.call(this, augmentEvent(event), event.detail);
    };
}

var augmentEvent = (function () {

    var methodName = undefined,
        eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    },
        returnTrue = function returnTrue() {
        return true;
    },
        returnFalse = function returnFalse() {
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
                })(methodName, eventMethods[methodName], event[methodName]);
            }
            if (event._preventDefault) {
                event.preventDefault();
            }
        }
        return event;
    };
})();

function delegateHandler(selector, handler, event) {
    var eventTarget = event._target || event.target,
        currentTarget = _selectorClosest.closest.call([eventTarget], selector, this)[0];
    if (currentTarget && currentTarget !== this) {
        if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
            handler.call(currentTarget, event);
        }
    }
}

var bind = on,
    unbind = off;

exports.on = on;
exports.off = off;
exports.one = one;
exports.bind = bind;
exports.unbind = unbind;

},{"15":15,"19":19}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function ready(handler) {
  if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler, false);
  }
  return this;
}

exports.ready = ready;

},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _domContains = require(6);

var reMouseEvent = /^(?:mouse|pointer|contextmenu)|click/;
var reKeyEvent = /^key/;

function trigger(type, data) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref$bubbles = _ref.bubbles;
    var bubbles = _ref$bubbles === undefined ? true : _ref$bubbles;
    var _ref$cancelable = _ref.cancelable;
    var cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;
    var _ref$preventDefault = _ref.preventDefault;
    var preventDefault = _ref$preventDefault === undefined ? false : _ref$preventDefault;

    var EventConstructor = getEventConstructor(type),
        event = new EventConstructor(type, { bubbles: bubbles, cancelable: cancelable, preventDefault: preventDefault, detail: data });

    event._preventDefault = preventDefault;

    _util.each(this, function (element) {
        if (!bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
            dispatchEvent(element, event);
        } else {
            triggerForPath(element, type, { bubbles: bubbles, cancelable: cancelable, preventDefault: preventDefault, detail: data });
        }
    });
    return this;
}

function getEventConstructor(type) {
    return supportsOtherEventConstructors ? reMouseEvent.test(type) ? MouseEvent : reKeyEvent.test(type) ? KeyboardEvent : CustomEvent : CustomEvent;
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
    return _domContains.contains(element.ownerDocument.documentElement, element);
}

function triggerForPath(element, type) {
    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    do {
        dispatchEvent(element, event);
    } while (element = element.parentNode);
}

var directEventMethods = ['blur', 'focus', 'select', 'submit'];

function dispatchEvent(element, event) {
    if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === 'function' && !event._preventDefault && !event.cancelable) {
        element[event.type]();
    } else {
        element.dispatchEvent(event);
    }
}

(function () {
    function CustomEvent(event) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: undefined } : arguments[1];

        var customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return customEvent;
    }

    CustomEvent.prototype = _util.global.CustomEvent && _util.global.CustomEvent.prototype;
    _util.global.CustomEvent = CustomEvent;
})();

var isEventBubblingInDetachedTree = (function () {
    var isBubbling = false,
        doc = _util.global.document;
    if (doc) {
        var _parent = doc.createElement('div'),
            child = _parent.cloneNode();
        _parent.appendChild(child);
        _parent.addEventListener('e', function () {
            isBubbling = true;
        });
        child.dispatchEvent(new CustomEvent('e', { bubbles: true }));
    }
    return isBubbling;
})();

var supportsOtherEventConstructors = (function () {
    try {
        new window.MouseEvent('click');
    } catch (e) {
        return false;
    }
    return true;
})();

exports.trigger = trigger;
exports.triggerHandler = triggerHandler;

},{"19":19,"6":6}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var previousLib = _util.global.$;

function noConflict() {
  _util.global.$ = previousLib;
  return this;
}

exports.noConflict = noConflict;

},{"19":19}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _index = require(17);

var _util = require(19);

var closest = (function () {

    function closest(selector, context) {
        var nodes = [];
        _util.each(this, function (node) {
            while (node && node !== context) {
                if (_index.matches(node, selector)) {
                    nodes.push(node);
                    break;
                }
                node = node.parentElement;
            }
        });
        return _index.$(_util.uniq(nodes));
    }

    return !Element.prototype.closest ? closest : function (selector, context) {
        var _this = this;

        if (!context) {
            var _ret = (function () {
                var nodes = [];
                _util.each(_this, function (node) {
                    var n = node.closest(selector);
                    if (n) {
                        nodes.push(n);
                    }
                });
                return {
                    v: _index.$(_util.uniq(nodes))
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        } else {
            return closest.call(this, selector, context);
        }
    };
})();

exports.closest = closest;

},{"17":17,"19":19}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var _index = require(17);

function children(selector) {
    var nodes = [];
    _util.each(this, function (element) {
        if (element.children) {
            _util.each(element.children, function (child) {
                if (!selector || selector && _index.matches(child, selector)) {
                    nodes.push(child);
                }
            });
        }
    });
    return _index.$(nodes);
}

function contents() {
    var nodes = [];
    _util.each(this, function (element) {
        nodes.push.apply(nodes, _util.toArray(element.childNodes));
    });
    return _index.$(nodes);
}

function eq(index) {
    return slice.call(this, index, index + 1);
}

function get(index) {
    return this[index];
}

function parent(selector) {
    var nodes = [];
    _util.each(this, function (element) {
        if (!selector || selector && _index.matches(element.parentNode, selector)) {
            nodes.push(element.parentNode);
        }
    });
    return _index.$(nodes);
}

function siblings(selector) {
    var nodes = [];
    _util.each(this, function (element) {
        _util.each(element.parentNode.children, function (sibling) {
            if (sibling !== element && (!selector || selector && _index.matches(sibling, selector))) {
                nodes.push(sibling);
            }
        });
    });
    return _index.$(nodes);
}

function slice(start, end) {
    return _index.$([].slice.apply(this, arguments));
}

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.siblings = siblings;
exports.slice = slice;

},{"17":17,"19":19}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _util = require(19);

var isPrototypeSet = false;

var reFragment = /^\s*<(\w+|!)[^>]*>/;
var reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
var reSimpleSelector = /^[\.#]?[\w-]*$/;

function $(selector) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

    var collection = undefined;

    if (!selector) {

        collection = document.querySelectorAll(null);
    } else if (selector instanceof Wrapper) {

        return selector;
    } else if (typeof selector !== 'string') {

        collection = selector.nodeType || selector === window ? [selector] : selector;
    } else if (reFragment.test(selector)) {

        collection = createFragment(selector);
    } else {

        context = typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context;

        collection = querySelector(selector, context);
    }

    return wrap(collection);
}

function find(selector) {
    var nodes = [];
    _util.each(this, function (node) {
        _util.each(querySelector(selector, node), function (child) {
            if (nodes.indexOf(child) === -1) {
                nodes.push(child);
            }
        });
    });
    return $(nodes);
}

var matches = (function () {
    var context = typeof Element !== 'undefined' ? Element.prototype : _util.global,
        _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
    return function (element, selector) {
        return _matches.call(element, selector);
    };
})();

function querySelector(selector, context) {

    var isSimpleSelector = reSimpleSelector.test(selector);

    if (isSimpleSelector) {
        if (selector[0] === '#') {
            var element = (context.getElementById ? context : document).getElementById(selector.slice(1));
            return element ? [element] : [];
        }
        if (selector[0] === '.') {
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

    var elements = [],
        container = document.createElement('div'),
        children = container.childNodes;

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
    var i = 0,
        length = collection.length;
    for (; i < length;) {
        this[i] = collection[i++];
    }
    this.length = length;
}

exports.$ = $;
exports.find = find;
exports.matches = matches;
exports.Wrapper = Wrapper;

},{"19":19}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var isArray = Array.isArray;

exports.isArray = isArray;
exports.isFunction = isFunction;

},{}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var global = new Function("return this")();

function toArray(collection) {
    var length = collection.length,
        result = new Array(length);
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
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (src) {
        for (var prop in src) {
            target[prop] = src[prop];
        }
    });
    return target;
}

var uniq = function uniq(collection) {
    return collection.filter(function (item, index) {
        return collection.indexOf(item) === index;
    });
};

exports.global = global;
exports.toArray = toArray;
exports.each = each;
exports.extend = extend;
exports.uniq = uniq;

},{}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require(19);

var _array = require(1);

var array = _interopRequireWildcard(_array);

var _baseClass = require(2);

var _baseClass2 = _interopRequireDefault(_baseClass);

var _domAttr = require(4);

var attr = _interopRequireWildcard(_domAttr);

var _domClass = require(5);

var class_ = _interopRequireWildcard(_domClass);

var _domContains = require(6);

var contains = _interopRequireWildcard(_domContains);

var _css = require(3);

var css = _interopRequireWildcard(_css);

var _domData = require(7);

var data = _interopRequireWildcard(_domData);

var _domIndex = require(10);

var dom = _interopRequireWildcard(_domIndex);

var _domExtra = require(8);

var dom_extra = _interopRequireWildcard(_domExtra);

var _eventIndex = require(11);

var event = _interopRequireWildcard(_eventIndex);

var _domHtml = require(9);

var html = _interopRequireWildcard(_domHtml);

var _noconflict = require(14);

var noconflict = _interopRequireWildcard(_noconflict);

var _eventReady = require(12);

var ready = _interopRequireWildcard(_eventReady);

var _selectorIndex = require(17);

var selector = _interopRequireWildcard(_selectorIndex);

var _selectorClosest = require(15);

var closest = _interopRequireWildcard(_selectorClosest);

var _selectorExtra = require(16);

var selector_extra = _interopRequireWildcard(_selectorExtra);

var _eventTrigger = require(13);

var trigger = _interopRequireWildcard(_eventTrigger);

var _type = require(18);

var type = _interopRequireWildcard(_type);

var api = {},
    $ = {};

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

_util.extend($, contains, noconflict, type);
_util.extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

$.version = '0.12.1';

$.extend = _util.extend;

if (typeof _baseClass2['default'] !== 'undefined') {
    $.BaseClass = _baseClass2['default']($.fn);
}

$['default'] = $;

exports['default'] = $;
module.exports = exports['default'];

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}]},{},[20])(20)
});
//# sourceMappingURL=domtastic.js.map
