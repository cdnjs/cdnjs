(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if ("document" in window.self) {
  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
    (function (view) {
      "use strict";

      if (!('Element' in view)) return;

      var classListProp = "classList",
          protoProp = "prototype",
          elemCtrProto = view.Element[protoProp],
          objCtr = Object,
          strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
      },
          arrIndexOf = Array[protoProp].indexOf || function (item) {
        var i = 0,
            len = this.length;

        for (; i < len; i++) {
          if (i in this && this[i] === item) {
            return i;
          }
        }

        return -1;
      } // Vendors: please allow content code to instantiate DOMExceptions
      ,
          DOMEx = function DOMEx(type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      },
          checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
        if (token === "") {
          throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
        }

        if (/\s/.test(token)) {
          throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
        }

        return arrIndexOf.call(classList, token);
      },
          ClassList = function ClassList(elem) {
        var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
            i = 0,
            len = classes.length;

        for (; i < len; i++) {
          this.push(classes[i]);
        }

        this._updateClassName = function () {
          elem.setAttribute("class", this.toString());
        };
      },
          classListProto = ClassList[protoProp] = [],
          classListGetter = function classListGetter() {
        return new ClassList(this);
      }; // Most DOMException implementations don't allow calling DOMException's toString()
      // on non-DOMExceptions. Error's toString() is sufficient here.


      DOMEx[protoProp] = Error[protoProp];

      classListProto.item = function (i) {
        return this[i] || null;
      };

      classListProto.contains = function (token) {
        token += "";
        return checkTokenAndGetIndex(this, token) !== -1;
      };

      classListProto.add = function () {
        var tokens = arguments,
            i = 0,
            l = tokens.length,
            token,
            updated = false;

        do {
          token = tokens[i] + "";

          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };

      classListProto.remove = function () {
        var tokens = arguments,
            i = 0,
            l = tokens.length,
            token,
            updated = false,
            index;

        do {
          token = tokens[i] + "";
          index = checkTokenAndGetIndex(this, token);

          while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };

      classListProto.toggle = function (token, force) {
        token += "";
        var result = this.contains(token),
            method = result ? force !== true && "remove" : force !== false && "add";

        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };

      classListProto.toString = function () {
        return this.join(" ");
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };

        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) {
          // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    })(window.self);
  } // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.


  (function () {
    "use strict";

    var testElement = document.createElement("_");
    testElement.classList.add("c1", "c2"); // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.

    if (!testElement.classList.contains("c2")) {
      var createMethod = function createMethod(method) {
        var original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function (token) {
          var i,
              len = arguments.length;

          for (i = 0; i < len; i++) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };

      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle("c3", false); // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.

    if (testElement.classList.contains("c3")) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
    }

    testElement = null;
  })();
}

},{}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition();else if (typeof define == 'function' && _typeof(define.amd) == 'object') define(definition);else this[name] = definition();
}('domready', function () {
  var fns = [],
      _listener,
      doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
    doc.removeEventListener(domContentLoaded, _listener);
    loaded = 1;

    while (_listener = fns.shift()) {
      _listener();
    }
  });
  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],3:[function(require,module,exports){
"use strict";

// element-closest | CC0-1.0 | github.com/jonathantneal/closest
(function (ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return Boolean(elements[index]);
    };
  }

  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
})(window.Element.prototype);

},{}],4:[function(require,module,exports){
"use strict";

/* global define, KeyboardEvent, module */
(function () {
  var keyboardeventKeyPolyfill = {
    polyfill: polyfill,
    keys: {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    }
  }; // Function keys (F1-24).

  var i;

  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  } // Printable ASCII characters.


  var letter = '';

  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  function polyfill() {
    if (!('KeyboardEvent' in window) || 'key' in KeyboardEvent.prototype) {
      return false;
    } // Polyfill `key` on `KeyboardEvent`.


    var proto = {
      get: function get(x) {
        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

        if (Array.isArray(key)) {
          key = key[+this.shiftKey];
        }

        return key;
      }
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    return proto;
  }

  if (typeof define === 'function' && define.amd) {
    define('keyboardevent-key-polyfill', keyboardeventKeyPolyfill);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = keyboardeventKeyPolyfill;
  } else if (window) {
    window.keyboardeventKeyPolyfill = keyboardeventKeyPolyfill;
  }
})();

},{}],5:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

},{}],6:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var assign = require('object-assign');

var delegate = require('../delegate');

var delegateAll = require('../delegateAll');

var DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
var SPACE = ' ';

var getListeners = function getListeners(type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;

  if (match) {
    type = match[1];
    selector = match[2];
  }

  var options;

  if (_typeof(handler) === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }

  var listener = {
    selector: selector,
    delegate: _typeof(handler) === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler,
    options: options
  };

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(function (_type) {
      return assign({
        type: _type
      }, listener);
    });
  } else {
    listener.type = type;
    return [listener];
  }
};

var popKey = function popKey(obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};

module.exports = function behavior(events, props) {
  var listeners = Object.keys(events).reduce(function (memo, type) {
    var listeners = getListeners(type, events[type]);
    return memo.concat(listeners);
  }, []);
  return assign({
    add: function addBehavior(element) {
      listeners.forEach(function (listener) {
        element.addEventListener(listener.type, listener.delegate, listener.options);
      });
    },
    remove: function removeBehavior(element) {
      listeners.forEach(function (listener) {
        element.removeEventListener(listener.type, listener.delegate, listener.options);
      });
    }
  }, props);
};

},{"../delegate":8,"../delegateAll":9,"object-assign":5}],7:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],8:[function(require,module,exports){
"use strict";

// polyfill Element.prototype.closest
require('element-closest');

module.exports = function delegate(selector, fn) {
  return function delegation(event) {
    var target = event.target.closest(selector);

    if (target) {
      return fn.call(target, event);
    }
  };
};

},{"element-closest":3}],9:[function(require,module,exports){
"use strict";

var delegate = require('../delegate');

var compose = require('../compose');

var SPLAT = '*';

module.exports = function delegateAll(selectors) {
  var keys = Object.keys(selectors); // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler

  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT];
  }

  var delegates = keys.reduce(function (memo, selector) {
    memo.push(delegate(selector, selectors[selector]));
    return memo;
  }, []);
  return compose(delegates);
};

},{"../compose":7,"../delegate":8}],10:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],11:[function(require,module,exports){
"use strict";

module.exports = {
  behavior: require('./behavior'),
  delegate: require('./delegate'),
  delegateAll: require('./delegateAll'),
  ignore: require('./ignore'),
  keymap: require('./keymap')
};

},{"./behavior":6,"./delegate":8,"./delegateAll":9,"./ignore":10,"./keymap":12}],12:[function(require,module,exports){
"use strict";

require('keyboardevent-key-polyfill'); // these are the only relevant modifiers supported on all platforms,
// according to MDN:
// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>


var MODIFIERS = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Ctrl': 'ctrlKey',
  'Shift': 'shiftKey'
};
var MODIFIER_SEPARATOR = '+';

var getEventKey = function getEventKey(event, hasModifiers) {
  var key = event.key;

  if (hasModifiers) {
    for (var modifier in MODIFIERS) {
      if (event[MODIFIERS[modifier]] === true) {
        key = [modifier, key].join(MODIFIER_SEPARATOR);
      }
    }
  }

  return key;
};

module.exports = function keymap(keys) {
  var hasModifiers = Object.keys(keys).some(function (key) {
    return key.indexOf(MODIFIER_SEPARATOR) > -1;
  });
  return function (event) {
    var key = getEventKey(event, hasModifiers);
    return [key, key.toLowerCase()].reduce(function (result, _key) {
      if (_key in keys) {
        result = keys[key].call(this, event);
      }

      return result;
    }, undefined);
  };
};

module.exports.MODIFIERS = MODIFIERS;

},{"keyboardevent-key-polyfill":4}],13:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };

  return wrapped;
};

},{}],14:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RE_TRIM = /(^\s+)|(\s+$)/g;
var RE_SPLIT = /\s+/;
var trim = String.prototype.trim ? function (str) {
  return str.trim();
} : function (str) {
  return str.replace(RE_TRIM, '');
};

var queryById = function queryById(id) {
  return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
};

module.exports = function resolveIds(ids, doc) {
  if (typeof ids !== 'string') {
    throw new Error('Expected a string but got ' + _typeof(ids));
  }

  if (!doc) {
    doc = window.document;
  }

  var getElementById = doc.getElementById ? doc.getElementById.bind(doc) : queryById.bind(doc);
  ids = trim(ids).split(RE_SPLIT); // XXX we can short-circuit here because trimming and splitting a
  // string of just whitespace produces an array containing a single,
  // empty string

  if (ids.length === 1 && ids[0] === '') {
    return [];
  }

  return ids.map(function (id) {
    var el = getElementById(id);

    if (!el) {
      throw new Error('no element with id: "' + id + '"');
    }

    return el;
  });
};

},{}],15:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var toggle = require("../utils/toggle");

var isElementInViewport = require("../utils/is-in-viewport");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var ACCORDION = ".".concat(PREFIX, "-accordion, .").concat(PREFIX, "-accordion--bordered");
var BUTTON = ".".concat(PREFIX, "-accordion__button[aria-controls]");
var EXPANDED = "aria-expanded";
var MULTISELECTABLE = "aria-multiselectable";
/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */

var getAccordionButtons = function getAccordionButtons(accordion) {
  var buttons = select(BUTTON, accordion);
  return buttons.filter(function (button) {
    return button.closest(ACCORDION) === accordion;
  });
};
/**
 * Toggle a button's "pressed" state, optionally providing a target
 * state.
 *
 * @param {HTMLButtonElement} button
 * @param {boolean?} expanded If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 * @return {boolean} the resulting state
 */


var toggleButton = function toggleButton(button, expanded) {
  var accordion = button.closest(ACCORDION);
  var safeExpanded = expanded;

  if (!accordion) {
    throw new Error("".concat(BUTTON, " is missing outer ").concat(ACCORDION));
  }

  safeExpanded = toggle(button, expanded); // XXX multiselectable is opt-in, to preserve legacy behavior

  var multiselectable = accordion.getAttribute(MULTISELECTABLE) === "true";

  if (safeExpanded && !multiselectable) {
    getAccordionButtons(accordion).forEach(function (other) {
      if (other !== button) {
        toggle(other, false);
      }
    });
  }
};
/**
 * @param {HTMLButtonElement} button
 * @return {boolean} true
 */


var showButton = function showButton(button) {
  return toggleButton(button, true);
};
/**
 * @param {HTMLButtonElement} button
 * @return {boolean} false
 */


var hideButton = function hideButton(button) {
  return toggleButton(button, false);
};

var accordion = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, function (event) {
  event.preventDefault();
  toggleButton(this);

  if (this.getAttribute(EXPANDED) === "true") {
    // We were just expanded, but if another accordion was also just
    // collapsed, we may no longer be in the viewport. This ensures
    // that we are still visible, so the user isn't confused.
    if (!isElementInViewport(this)) this.scrollIntoView();
  }
})), {
  init: function init(root) {
    select(BUTTON, root).forEach(function (button) {
      var expanded = button.getAttribute(EXPANDED) === "true";
      toggleButton(button, expanded);
    });
  },
  ACCORDION: ACCORDION,
  BUTTON: BUTTON,
  show: showButton,
  hide: hideButton,
  toggle: toggleButton,
  getButtons: getAccordionButtons
});
module.exports = accordion;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/is-in-viewport":45,"../utils/select":48,"../utils/toggle":51}],16:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var HEADER = ".".concat(PREFIX, "-banner__header");
var EXPANDED_CLASS = "".concat(PREFIX, "-banner__header--expanded");

var toggleBanner = function toggleEl(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, "".concat(HEADER, " [aria-controls]"), toggleBanner)));

},{"../config":34,"../events":35,"../utils/behavior":43}],17:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var _require = require("../config"),
    PREFIX = _require.prefix;

var CHARACTER_COUNT = ".".concat(PREFIX, "-character-count");
var INPUT = ".".concat(PREFIX, "-character-count__field");
var MESSAGE = ".".concat(PREFIX, "-character-count__message");
var VALIDATION_MESSAGE = "The content is too long.";
var MESSAGE_INVALID_CLASS = "".concat(PREFIX, "-character-count__message--invalid");
/**
 * The elements within the character count.
 * @typedef {Object} CharacterCountElements
 * @property {HTMLDivElement} characterCountEl
 * @property {HTMLSpanElement} messageEl
 */

/**
 * Returns the root and message element
 * for an character count input
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 * @returns {CharacterCountElements} elements The root and message element.
 */

var getCharacterCountElements = function getCharacterCountElements(inputEl) {
  var characterCountEl = inputEl.closest(CHARACTER_COUNT);

  if (!characterCountEl) {
    throw new Error("".concat(INPUT, " is missing outer ").concat(CHARACTER_COUNT));
  }

  var messageEl = characterCountEl.querySelector(MESSAGE);

  if (!messageEl) {
    throw new Error("".concat(CHARACTER_COUNT, " is missing inner ").concat(MESSAGE));
  }

  return {
    characterCountEl: characterCountEl,
    messageEl: messageEl
  };
};
/**
 * Update the character count component
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 */


var updateCountMessage = function updateCountMessage(inputEl) {
  var _getCharacterCountEle = getCharacterCountElements(inputEl),
      characterCountEl = _getCharacterCountEle.characterCountEl,
      messageEl = _getCharacterCountEle.messageEl;

  var maxlength = parseInt(characterCountEl.getAttribute("data-maxlength"), 10);
  if (!maxlength) return;
  var newMessage = "";
  var currentLength = inputEl.value.length;
  var isOverLimit = currentLength && currentLength > maxlength;

  if (currentLength === 0) {
    newMessage = "".concat(maxlength, " characters allowed");
  } else {
    var difference = Math.abs(maxlength - currentLength);
    var characters = "character".concat(difference === 1 ? "" : "s");
    var guidance = isOverLimit ? "over limit" : "left";
    newMessage = "".concat(difference, " ").concat(characters, " ").concat(guidance);
  }

  messageEl.classList.toggle(MESSAGE_INVALID_CLASS, isOverLimit);
  messageEl.innerHTML = newMessage;

  if (isOverLimit && !inputEl.validationMessage) {
    inputEl.setCustomValidity(VALIDATION_MESSAGE);
  }

  if (!isOverLimit && inputEl.validationMessage === VALIDATION_MESSAGE) {
    inputEl.setCustomValidity("");
  }
};
/**
 * Setup the character count component
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 */


var setupAttributes = function setupAttributes(inputEl) {
  var _getCharacterCountEle2 = getCharacterCountElements(inputEl),
      characterCountEl = _getCharacterCountEle2.characterCountEl;

  var maxlength = inputEl.getAttribute("maxlength");
  if (!maxlength) return;
  inputEl.removeAttribute("maxlength");
  characterCountEl.setAttribute("data-maxlength", maxlength);
};

var characterCount = behavior({
  input: _defineProperty({}, INPUT, function () {
    updateCountMessage(this);
  })
}, {
  init: function init(root) {
    select(INPUT, root).forEach(function (input) {
      setupAttributes(input);
      updateCountMessage(input);
    });
  },
  MESSAGE_INVALID_CLASS: MESSAGE_INVALID_CLASS,
  VALIDATION_MESSAGE: VALIDATION_MESSAGE
});
module.exports = characterCount;

},{"../config":34,"../utils/behavior":43,"../utils/select":48}],18:[function(require,module,exports){
"use strict";

var _CLICK, _keydown, _behavior;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keymap = require("receptor/keymap");

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var _require = require("../config"),
    PREFIX = _require.prefix;

var _require2 = require("../events"),
    CLICK = _require2.CLICK;

var COMBO_BOX_CLASS = "".concat(PREFIX, "-combo-box");
var COMBO_BOX_PRISTINE_CLASS = "".concat(COMBO_BOX_CLASS, "--pristine");
var SELECT_CLASS = "".concat(COMBO_BOX_CLASS, "__select");
var INPUT_CLASS = "".concat(COMBO_BOX_CLASS, "__input");
var CLEAR_INPUT_BUTTON_CLASS = "".concat(COMBO_BOX_CLASS, "__clear-input");
var CLEAR_INPUT_BUTTON_WRAPPER_CLASS = "".concat(CLEAR_INPUT_BUTTON_CLASS, "__wrapper");
var INPUT_BUTTON_SEPARATOR_CLASS = "".concat(COMBO_BOX_CLASS, "__input-button-separator");
var TOGGLE_LIST_BUTTON_CLASS = "".concat(COMBO_BOX_CLASS, "__toggle-list");
var TOGGLE_LIST_BUTTON_WRAPPER_CLASS = "".concat(TOGGLE_LIST_BUTTON_CLASS, "__wrapper");
var LIST_CLASS = "".concat(COMBO_BOX_CLASS, "__list");
var LIST_OPTION_CLASS = "".concat(COMBO_BOX_CLASS, "__list-option");
var LIST_OPTION_FOCUSED_CLASS = "".concat(LIST_OPTION_CLASS, "--focused");
var LIST_OPTION_SELECTED_CLASS = "".concat(LIST_OPTION_CLASS, "--selected");
var STATUS_CLASS = "".concat(COMBO_BOX_CLASS, "__status");
var COMBO_BOX = ".".concat(COMBO_BOX_CLASS);
var SELECT = ".".concat(SELECT_CLASS);
var INPUT = ".".concat(INPUT_CLASS);
var CLEAR_INPUT_BUTTON = ".".concat(CLEAR_INPUT_BUTTON_CLASS);
var TOGGLE_LIST_BUTTON = ".".concat(TOGGLE_LIST_BUTTON_CLASS);
var LIST = ".".concat(LIST_CLASS);
var LIST_OPTION = ".".concat(LIST_OPTION_CLASS);
var LIST_OPTION_FOCUSED = ".".concat(LIST_OPTION_FOCUSED_CLASS);
var LIST_OPTION_SELECTED = ".".concat(LIST_OPTION_SELECTED_CLASS);
var STATUS = ".".concat(STATUS_CLASS);
var DEFAULT_FILTER = ".*{{query}}.*";

var noop = function noop() {};
/**
 * set the value of the element and dispatch a change event
 *
 * @param {HTMLInputElement|HTMLSelectElement} el The element to update
 * @param {string} value The new value of the element
 */


var changeElementValue = function changeElementValue(el) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var elementToChange = el;
  elementToChange.value = value;
  var event = new CustomEvent("change", {
    bubbles: true,
    cancelable: true,
    detail: {
      value: value
    }
  });
  elementToChange.dispatchEvent(event);
};
/**
 * The elements within the combo box.
 * @typedef {Object} ComboBoxContext
 * @property {HTMLElement} comboBoxEl
 * @property {HTMLSelectElement} selectEl
 * @property {HTMLInputElement} inputEl
 * @property {HTMLUListElement} listEl
 * @property {HTMLDivElement} statusEl
 * @property {HTMLLIElement} focusedOptionEl
 * @property {HTMLLIElement} selectedOptionEl
 * @property {HTMLButtonElement} toggleListBtnEl
 * @property {HTMLButtonElement} clearInputBtnEl
 * @property {boolean} isPristine
 * @property {boolean} disableFiltering
 */

/**
 * Get an object of elements belonging directly to the given
 * combo box component.
 *
 * @param {HTMLElement} el the element within the combo box
 * @returns {ComboBoxContext} elements
 */


var getComboBoxContext = function getComboBoxContext(el) {
  var comboBoxEl = el.closest(COMBO_BOX);

  if (!comboBoxEl) {
    throw new Error("Element is missing outer ".concat(COMBO_BOX));
  }

  var selectEl = comboBoxEl.querySelector(SELECT);
  var inputEl = comboBoxEl.querySelector(INPUT);
  var listEl = comboBoxEl.querySelector(LIST);
  var statusEl = comboBoxEl.querySelector(STATUS);
  var focusedOptionEl = comboBoxEl.querySelector(LIST_OPTION_FOCUSED);
  var selectedOptionEl = comboBoxEl.querySelector(LIST_OPTION_SELECTED);
  var toggleListBtnEl = comboBoxEl.querySelector(TOGGLE_LIST_BUTTON);
  var clearInputBtnEl = comboBoxEl.querySelector(CLEAR_INPUT_BUTTON);
  var isPristine = comboBoxEl.classList.contains(COMBO_BOX_PRISTINE_CLASS);
  var disableFiltering = comboBoxEl.dataset.disableFiltering === "true";
  return {
    comboBoxEl: comboBoxEl,
    selectEl: selectEl,
    inputEl: inputEl,
    listEl: listEl,
    statusEl: statusEl,
    focusedOptionEl: focusedOptionEl,
    selectedOptionEl: selectedOptionEl,
    toggleListBtnEl: toggleListBtnEl,
    clearInputBtnEl: clearInputBtnEl,
    isPristine: isPristine,
    disableFiltering: disableFiltering
  };
};
/**
 * Disable the combo-box component
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var disable = function disable(el) {
  var _getComboBoxContext = getComboBoxContext(el),
      inputEl = _getComboBoxContext.inputEl,
      toggleListBtnEl = _getComboBoxContext.toggleListBtnEl,
      clearInputBtnEl = _getComboBoxContext.clearInputBtnEl;

  clearInputBtnEl.hidden = true;
  clearInputBtnEl.disabled = true;
  toggleListBtnEl.disabled = true;
  inputEl.disabled = true;
};
/**
 * Enable the combo-box component
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var enable = function enable(el) {
  var _getComboBoxContext2 = getComboBoxContext(el),
      inputEl = _getComboBoxContext2.inputEl,
      toggleListBtnEl = _getComboBoxContext2.toggleListBtnEl,
      clearInputBtnEl = _getComboBoxContext2.clearInputBtnEl;

  clearInputBtnEl.hidden = false;
  clearInputBtnEl.disabled = false;
  toggleListBtnEl.disabled = false;
  inputEl.disabled = false;
};
/**
 * Enhance a select element into a combo box component.
 *
 * @param {HTMLElement} _comboBoxEl The initial element of the combo box component
 */


var enhanceComboBox = function enhanceComboBox(_comboBoxEl) {
  var comboBoxEl = _comboBoxEl.closest(COMBO_BOX);

  if (comboBoxEl.dataset.enhanced) return;
  var selectEl = comboBoxEl.querySelector("select");

  if (!selectEl) {
    throw new Error("".concat(COMBO_BOX, " is missing inner select"));
  }

  var selectId = selectEl.id;
  var selectLabel = document.querySelector("label[for=\"".concat(selectId, "\"]"));
  var listId = "".concat(selectId, "--list");
  var listIdLabel = "".concat(selectId, "-label");
  var assistiveHintID = "".concat(selectId, "--assistiveHint");
  var additionalAttributes = [];
  var defaultValue = comboBoxEl.dataset.defaultValue;
  var placeholder = comboBoxEl.dataset.placeholder;
  var selectedOption;

  if (placeholder) {
    additionalAttributes.push("placeholder=\"".concat(placeholder, "\""));
  }

  if (defaultValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.value === defaultValue) {
        selectedOption = optionEl;
        break;
      }
    }
  }
  /**
   * Throw error if combobox is missing a label or label is missing
   * `for` attribute. Otherwise, set the ID to match the <ul> aria-labelledby
   */


  if (!selectLabel || !selectLabel.matches("label[for=\"".concat(selectId, "\"]"))) {
    throw new Error("".concat(COMBO_BOX, " for ").concat(selectId, " is either missing a label or a \"for\" attribute"));
  } else {
    selectLabel.setAttribute("id", listIdLabel);
  }

  selectLabel.setAttribute("id", listIdLabel);
  selectEl.setAttribute("aria-hidden", "true");
  selectEl.setAttribute("tabindex", "-1");
  selectEl.classList.add("usa-sr-only", SELECT_CLASS);
  selectEl.id = "";
  selectEl.value = "";
  ["required", "aria-label", "aria-labelledby"].forEach(function (name) {
    if (selectEl.hasAttribute(name)) {
      var value = selectEl.getAttribute(name);
      additionalAttributes.push("".concat(name, "=\"").concat(value, "\""));
      selectEl.removeAttribute(name);
    }
  });
  comboBoxEl.insertAdjacentHTML("beforeend", ["<input\n        aria-owns=\"".concat(listId, "\"\n        aria-autocomplete=\"list\"\n        aria-describedby=\"").concat(assistiveHintID, "\"\n        aria-expanded=\"false\"\n        autocapitalize=\"off\"\n        autocomplete=\"off\"\n        id=\"").concat(selectId, "\"\n        class=\"").concat(INPUT_CLASS, "\"\n        type=\"text\"\n        role=\"combobox\"\n        ").concat(additionalAttributes.join(" "), "\n      >"), "<span class=\"".concat(CLEAR_INPUT_BUTTON_WRAPPER_CLASS, "\" tabindex=\"-1\">\n        <button type=\"button\" class=\"").concat(CLEAR_INPUT_BUTTON_CLASS, "\" aria-label=\"Clear the select contents\">&nbsp;</button>\n      </span>"), "<span class=\"".concat(INPUT_BUTTON_SEPARATOR_CLASS, "\">&nbsp;</span>"), "<span class=\"".concat(TOGGLE_LIST_BUTTON_WRAPPER_CLASS, "\" tabindex=\"-1\">\n        <button type=\"button\" tabindex=\"-1\" class=\"").concat(TOGGLE_LIST_BUTTON_CLASS, "\" aria-label=\"Toggle the dropdown list\">&nbsp;</button>\n      </span>"), "<ul\n        tabindex=\"-1\"\n        id=\"".concat(listId, "\"\n        class=\"").concat(LIST_CLASS, "\"\n        role=\"listbox\"\n        aria-labelledby=\"").concat(listIdLabel, "\"\n        hidden>\n      </ul>"), "<div class=\"".concat(STATUS_CLASS, " usa-sr-only\" role=\"status\"></div>"), "<span id=\"".concat(assistiveHintID, "\" class=\"usa-sr-only\">\n        When autocomplete results are available use up and down arrows to review and enter to select.\n        Touch device users, explore by touch or with swipe gestures.\n      </span>")].join(""));

  if (selectedOption) {
    var _getComboBoxContext3 = getComboBoxContext(comboBoxEl),
        inputEl = _getComboBoxContext3.inputEl;

    changeElementValue(selectEl, selectedOption.value);
    changeElementValue(inputEl, selectedOption.text);
    comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
  }

  if (selectEl.disabled) {
    disable(comboBoxEl);
    selectEl.disabled = false;
  }

  comboBoxEl.dataset.enhanced = "true";
};
/**
 * Manage the focused element within the list options when
 * navigating via keyboard.
 *
 * @param {HTMLElement} el An anchor element within the combo box component
 * @param {HTMLElement} nextEl An element within the combo box component
 * @param {Object} options options
 * @param {boolean} options.skipFocus skip focus of highlighted item
 * @param {boolean} options.preventScroll should skip procedure to scroll to element
 */


var highlightOption = function highlightOption(el, nextEl) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      skipFocus = _ref.skipFocus,
      preventScroll = _ref.preventScroll;

  var _getComboBoxContext4 = getComboBoxContext(el),
      inputEl = _getComboBoxContext4.inputEl,
      listEl = _getComboBoxContext4.listEl,
      focusedOptionEl = _getComboBoxContext4.focusedOptionEl;

  if (focusedOptionEl) {
    focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
    focusedOptionEl.setAttribute("tabIndex", "-1");
  }

  if (nextEl) {
    inputEl.setAttribute("aria-activedescendant", nextEl.id);
    nextEl.setAttribute("tabIndex", "0");
    nextEl.classList.add(LIST_OPTION_FOCUSED_CLASS);

    if (!preventScroll) {
      var optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
      var currentBottom = listEl.scrollTop + listEl.offsetHeight;

      if (optionBottom > currentBottom) {
        listEl.scrollTop = optionBottom - listEl.offsetHeight;
      }

      if (nextEl.offsetTop < listEl.scrollTop) {
        listEl.scrollTop = nextEl.offsetTop;
      }
    }

    if (!skipFocus) {
      nextEl.focus({
        preventScroll: preventScroll
      });
    }
  } else {
    inputEl.setAttribute("aria-activedescendant", "");
    inputEl.focus();
  }
};
/**
 * Generate a dynamic regular expression based off of a replaceable and possibly filtered value.
 *
 * @param {string} el An element within the combo box component
 * @param {string} query The value to use in the regular expression
 * @param {object} extras An object of regular expressions to replace and filter the query
 */


var generateDynamicRegExp = function generateDynamicRegExp(filter) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var extras = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var escapeRegExp = function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  var find = filter.replace(/{{(.*?)}}/g, function (m, $1) {
    var key = $1.trim();
    var queryFilter = extras[key];

    if (key !== "query" && queryFilter) {
      var matcher = new RegExp(queryFilter, "i");
      var matches = query.match(matcher);

      if (matches) {
        return escapeRegExp(matches[1]);
      }

      return "";
    }

    return escapeRegExp(query);
  });
  find = "^(?:" + find + ")$";
  return new RegExp(find, "i");
};
/**
 * Display the option list of a combo box component.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var displayList = function displayList(el) {
  var _getComboBoxContext5 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext5.comboBoxEl,
      selectEl = _getComboBoxContext5.selectEl,
      inputEl = _getComboBoxContext5.inputEl,
      listEl = _getComboBoxContext5.listEl,
      statusEl = _getComboBoxContext5.statusEl,
      isPristine = _getComboBoxContext5.isPristine,
      disableFiltering = _getComboBoxContext5.disableFiltering;

  var selectedItemId;
  var firstFoundId;
  var listOptionBaseId = "".concat(listEl.id, "--option-");
  var inputValue = (inputEl.value || "").toLowerCase();
  var filter = comboBoxEl.dataset.filter || DEFAULT_FILTER;
  var regex = generateDynamicRegExp(filter, inputValue, comboBoxEl.dataset);
  var options = [];

  for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
    var optionEl = selectEl.options[i];
    var optionId = "".concat(listOptionBaseId).concat(options.length);

    if (optionEl.value && (disableFiltering || isPristine || !inputValue || regex.test(optionEl.text))) {
      if (selectEl.value && optionEl.value === selectEl.value) {
        selectedItemId = optionId;
      }

      if (disableFiltering && !firstFoundId && regex.test(optionEl.text)) {
        firstFoundId = optionId;
      }

      options.push(optionEl);
    }
  }

  var numOptions = options.length;
  var optionHtml = options.map(function (option, index) {
    var optionId = "".concat(listOptionBaseId).concat(index);
    var classes = [LIST_OPTION_CLASS];
    var tabindex = "-1";
    var ariaSelected = "false";

    if (optionId === selectedItemId) {
      classes.push(LIST_OPTION_SELECTED_CLASS, LIST_OPTION_FOCUSED_CLASS);
      tabindex = "0";
      ariaSelected = "true";
    }

    if (!selectedItemId && index === 0) {
      classes.push(LIST_OPTION_FOCUSED_CLASS);
      tabindex = "0";
    }

    var li = document.createElement("li");
    li.setAttribute("aria-setsize", options.length);
    li.setAttribute("aria-posinset", index + 1);
    li.setAttribute("aria-selected", ariaSelected);
    li.setAttribute("id", optionId);
    li.setAttribute("class", classes.join(" "));
    li.setAttribute("tabindex", tabindex);
    li.setAttribute("role", "option");
    li.setAttribute("data-value", option.value);
    li.textContent = option.text;
    return li.outerHTML;
  }).join("");
  var noResults = "<li class=\"".concat(LIST_OPTION_CLASS, "--no-results\">No results found</li>");
  listEl.hidden = false;
  listEl.innerHTML = numOptions ? optionHtml : noResults;
  inputEl.setAttribute("aria-expanded", "true");
  statusEl.innerHTML = numOptions ? "".concat(numOptions, " result").concat(numOptions > 1 ? "s" : "", " available.") : "No results.";
  var itemToFocus;

  if (isPristine && selectedItemId) {
    itemToFocus = listEl.querySelector("#" + selectedItemId);
  } else if (disableFiltering && firstFoundId) {
    itemToFocus = listEl.querySelector("#" + firstFoundId);
  }

  if (itemToFocus) {
    highlightOption(listEl, itemToFocus, {
      skipFocus: true
    });
  }
};
/**
 * Hide the option list of a combo box component.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var hideList = function hideList(el) {
  var _getComboBoxContext6 = getComboBoxContext(el),
      inputEl = _getComboBoxContext6.inputEl,
      listEl = _getComboBoxContext6.listEl,
      statusEl = _getComboBoxContext6.statusEl,
      focusedOptionEl = _getComboBoxContext6.focusedOptionEl;

  statusEl.innerHTML = "";
  inputEl.setAttribute("aria-expanded", "false");
  inputEl.setAttribute("aria-activedescendant", "");

  if (focusedOptionEl) {
    focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
  }

  listEl.scrollTop = 0;
  listEl.hidden = true;
};
/**
 * Select an option list of the combo box component.
 *
 * @param {HTMLElement} listOptionEl The list option being selected
 */


var selectItem = function selectItem(listOptionEl) {
  var _getComboBoxContext7 = getComboBoxContext(listOptionEl),
      comboBoxEl = _getComboBoxContext7.comboBoxEl,
      selectEl = _getComboBoxContext7.selectEl,
      inputEl = _getComboBoxContext7.inputEl;

  changeElementValue(selectEl, listOptionEl.dataset.value);
  changeElementValue(inputEl, listOptionEl.textContent);
  comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
  hideList(comboBoxEl);
  inputEl.focus();
};
/**
 * Clear the input of the combo box
 *
 * @param {HTMLButtonElement} clearButtonEl The clear input button
 */


var clearInput = function clearInput(clearButtonEl) {
  var _getComboBoxContext8 = getComboBoxContext(clearButtonEl),
      comboBoxEl = _getComboBoxContext8.comboBoxEl,
      listEl = _getComboBoxContext8.listEl,
      selectEl = _getComboBoxContext8.selectEl,
      inputEl = _getComboBoxContext8.inputEl;

  var listShown = !listEl.hidden;
  if (selectEl.value) changeElementValue(selectEl);
  if (inputEl.value) changeElementValue(inputEl);
  comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
  if (listShown) displayList(comboBoxEl);
  inputEl.focus();
};
/**
 * Reset the select based off of currently set select value
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var resetSelection = function resetSelection(el) {
  var _getComboBoxContext9 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext9.comboBoxEl,
      selectEl = _getComboBoxContext9.selectEl,
      inputEl = _getComboBoxContext9.inputEl;

  var selectValue = selectEl.value;
  var inputValue = (inputEl.value || "").toLowerCase();

  if (selectValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.value === selectValue) {
        if (inputValue !== optionEl.text) {
          changeElementValue(inputEl, optionEl.text);
        }

        comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
        return;
      }
    }
  }

  if (inputValue) {
    changeElementValue(inputEl);
  }
};
/**
 * Select an option list of the combo box component based off of
 * having a current focused list option or
 * having test that completely matches a list option.
 * Otherwise it clears the input and select.
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var completeSelection = function completeSelection(el) {
  var _getComboBoxContext10 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext10.comboBoxEl,
      selectEl = _getComboBoxContext10.selectEl,
      inputEl = _getComboBoxContext10.inputEl,
      statusEl = _getComboBoxContext10.statusEl;

  statusEl.textContent = "";
  var inputValue = (inputEl.value || "").toLowerCase();

  if (inputValue) {
    for (var i = 0, len = selectEl.options.length; i < len; i += 1) {
      var optionEl = selectEl.options[i];

      if (optionEl.text.toLowerCase() === inputValue) {
        changeElementValue(selectEl, optionEl.value);
        changeElementValue(inputEl, optionEl.text);
        comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
        return;
      }
    }
  }

  resetSelection(comboBoxEl);
};
/**
 * Handle the escape event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEscape = function handleEscape(event) {
  var _getComboBoxContext11 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext11.comboBoxEl,
      inputEl = _getComboBoxContext11.inputEl;

  hideList(comboBoxEl);
  resetSelection(comboBoxEl);
  inputEl.focus();
};
/**
 * Handle the down event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleDownFromInput = function handleDownFromInput(event) {
  var _getComboBoxContext12 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext12.comboBoxEl,
      listEl = _getComboBoxContext12.listEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  }

  var nextOptionEl = listEl.querySelector(LIST_OPTION_FOCUSED) || listEl.querySelector(LIST_OPTION);

  if (nextOptionEl) {
    highlightOption(comboBoxEl, nextOptionEl);
  }

  event.preventDefault();
};
/**
 * Handle the enter event from an input element within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEnterFromInput = function handleEnterFromInput(event) {
  var _getComboBoxContext13 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext13.comboBoxEl,
      listEl = _getComboBoxContext13.listEl;

  var listShown = !listEl.hidden;
  completeSelection(comboBoxEl);

  if (listShown) {
    hideList(comboBoxEl);
  }

  event.preventDefault();
};
/**
 * Handle the down event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleDownFromListOption = function handleDownFromListOption(event) {
  var focusedOptionEl = event.target;
  var nextOptionEl = focusedOptionEl.nextSibling;

  if (nextOptionEl) {
    highlightOption(focusedOptionEl, nextOptionEl);
  }

  event.preventDefault();
};
/**
 * Handle the tab event from an list option element within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleTabFromListOption = function handleTabFromListOption(event) {
  selectItem(event.target);
  event.preventDefault();
};
/**
 * Handle the enter event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleEnterFromListOption = function handleEnterFromListOption(event) {
  selectItem(event.target);
  event.preventDefault();
};
/**
 * Handle the up event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */


var handleUpFromListOption = function handleUpFromListOption(event) {
  var _getComboBoxContext14 = getComboBoxContext(event.target),
      comboBoxEl = _getComboBoxContext14.comboBoxEl,
      listEl = _getComboBoxContext14.listEl,
      focusedOptionEl = _getComboBoxContext14.focusedOptionEl;

  var nextOptionEl = focusedOptionEl && focusedOptionEl.previousSibling;
  var listShown = !listEl.hidden;
  highlightOption(comboBoxEl, nextOptionEl);

  if (listShown) {
    event.preventDefault();
  }

  if (!nextOptionEl) {
    hideList(comboBoxEl);
  }
};
/**
 * Select list option on the mouseover event.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLLIElement} listOptionEl An element within the combo box component
 */


var handleMouseover = function handleMouseover(listOptionEl) {
  var isCurrentlyFocused = listOptionEl.classList.contains(LIST_OPTION_FOCUSED_CLASS);
  if (isCurrentlyFocused) return;
  highlightOption(listOptionEl, listOptionEl, {
    preventScroll: true
  });
};
/**
 * Toggle the list when the button is clicked
 *
 * @param {HTMLElement} el An element within the combo box component
 */


var toggleList = function toggleList(el) {
  var _getComboBoxContext15 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext15.comboBoxEl,
      listEl = _getComboBoxContext15.listEl,
      inputEl = _getComboBoxContext15.inputEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  } else {
    hideList(comboBoxEl);
  }

  inputEl.focus();
};
/**
 * Handle click from input
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */


var handleClickFromInput = function handleClickFromInput(el) {
  var _getComboBoxContext16 = getComboBoxContext(el),
      comboBoxEl = _getComboBoxContext16.comboBoxEl,
      listEl = _getComboBoxContext16.listEl;

  if (listEl.hidden) {
    displayList(comboBoxEl);
  }
};

var comboBox = behavior((_behavior = {}, _defineProperty(_behavior, CLICK, (_CLICK = {}, _defineProperty(_CLICK, INPUT, function () {
  if (this.disabled) return;
  handleClickFromInput(this);
}), _defineProperty(_CLICK, TOGGLE_LIST_BUTTON, function () {
  if (this.disabled) return;
  toggleList(this);
}), _defineProperty(_CLICK, LIST_OPTION, function () {
  if (this.disabled) return;
  selectItem(this);
}), _defineProperty(_CLICK, CLEAR_INPUT_BUTTON, function () {
  if (this.disabled) return;
  clearInput(this);
}), _CLICK)), _defineProperty(_behavior, "focusout", _defineProperty({}, COMBO_BOX, function (event) {
  if (!this.contains(event.relatedTarget)) {
    resetSelection(this);
    hideList(this);
  }
})), _defineProperty(_behavior, "keydown", (_keydown = {}, _defineProperty(_keydown, COMBO_BOX, keymap({
  Escape: handleEscape
})), _defineProperty(_keydown, INPUT, keymap({
  Enter: handleEnterFromInput,
  ArrowDown: handleDownFromInput,
  Down: handleDownFromInput
})), _defineProperty(_keydown, LIST_OPTION, keymap({
  ArrowUp: handleUpFromListOption,
  Up: handleUpFromListOption,
  ArrowDown: handleDownFromListOption,
  Down: handleDownFromListOption,
  Enter: handleEnterFromListOption,
  Tab: handleTabFromListOption,
  "Shift+Tab": noop
})), _keydown)), _defineProperty(_behavior, "input", _defineProperty({}, INPUT, function () {
  var comboBoxEl = this.closest(COMBO_BOX);
  comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
  displayList(this);
})), _defineProperty(_behavior, "mouseover", _defineProperty({}, LIST_OPTION, function () {
  handleMouseover(this);
})), _behavior), {
  init: function init(root) {
    select(COMBO_BOX, root).forEach(function (comboBoxEl) {
      enhanceComboBox(comboBoxEl);
    });
  },
  getComboBoxContext: getComboBoxContext,
  enhanceComboBox: enhanceComboBox,
  generateDynamicRegExp: generateDynamicRegExp,
  disable: disable,
  enable: enable,
  displayList: displayList,
  hideList: hideList,
  COMBO_BOX_CLASS: COMBO_BOX_CLASS
});
module.exports = comboBox;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/select":48,"receptor/keymap":12}],19:[function(require,module,exports){
"use strict";

var _CLICK, _keydown, _focusout, _datePickerEvents;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var keymap = require("receptor/keymap");

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../config"),
    PREFIX = _require.prefix;

var _require2 = require("../events"),
    CLICK = _require2.CLICK;

var activeElement = require("../utils/active-element");

var isIosDevice = require("../utils/is-ios-device");

var DATE_PICKER_CLASS = "".concat(PREFIX, "-date-picker");
var DATE_PICKER_WRAPPER_CLASS = "".concat(DATE_PICKER_CLASS, "__wrapper");
var DATE_PICKER_INITIALIZED_CLASS = "".concat(DATE_PICKER_CLASS, "--initialized");
var DATE_PICKER_ACTIVE_CLASS = "".concat(DATE_PICKER_CLASS, "--active");
var DATE_PICKER_INTERNAL_INPUT_CLASS = "".concat(DATE_PICKER_CLASS, "__internal-input");
var DATE_PICKER_EXTERNAL_INPUT_CLASS = "".concat(DATE_PICKER_CLASS, "__external-input");
var DATE_PICKER_BUTTON_CLASS = "".concat(DATE_PICKER_CLASS, "__button");
var DATE_PICKER_CALENDAR_CLASS = "".concat(DATE_PICKER_CLASS, "__calendar");
var DATE_PICKER_STATUS_CLASS = "".concat(DATE_PICKER_CLASS, "__status");
var CALENDAR_DATE_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__date");
var CALENDAR_DATE_FOCUSED_CLASS = "".concat(CALENDAR_DATE_CLASS, "--focused");
var CALENDAR_DATE_SELECTED_CLASS = "".concat(CALENDAR_DATE_CLASS, "--selected");
var CALENDAR_DATE_PREVIOUS_MONTH_CLASS = "".concat(CALENDAR_DATE_CLASS, "--previous-month");
var CALENDAR_DATE_CURRENT_MONTH_CLASS = "".concat(CALENDAR_DATE_CLASS, "--current-month");
var CALENDAR_DATE_NEXT_MONTH_CLASS = "".concat(CALENDAR_DATE_CLASS, "--next-month");
var CALENDAR_DATE_RANGE_DATE_CLASS = "".concat(CALENDAR_DATE_CLASS, "--range-date");
var CALENDAR_DATE_TODAY_CLASS = "".concat(CALENDAR_DATE_CLASS, "--today");
var CALENDAR_DATE_RANGE_DATE_START_CLASS = "".concat(CALENDAR_DATE_CLASS, "--range-date-start");
var CALENDAR_DATE_RANGE_DATE_END_CLASS = "".concat(CALENDAR_DATE_CLASS, "--range-date-end");
var CALENDAR_DATE_WITHIN_RANGE_CLASS = "".concat(CALENDAR_DATE_CLASS, "--within-range");
var CALENDAR_PREVIOUS_YEAR_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__previous-year");
var CALENDAR_PREVIOUS_MONTH_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__previous-month");
var CALENDAR_NEXT_YEAR_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__next-year");
var CALENDAR_NEXT_MONTH_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__next-month");
var CALENDAR_MONTH_SELECTION_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__month-selection");
var CALENDAR_YEAR_SELECTION_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__year-selection");
var CALENDAR_MONTH_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__month");
var CALENDAR_MONTH_FOCUSED_CLASS = "".concat(CALENDAR_MONTH_CLASS, "--focused");
var CALENDAR_MONTH_SELECTED_CLASS = "".concat(CALENDAR_MONTH_CLASS, "--selected");
var CALENDAR_YEAR_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__year");
var CALENDAR_YEAR_FOCUSED_CLASS = "".concat(CALENDAR_YEAR_CLASS, "--focused");
var CALENDAR_YEAR_SELECTED_CLASS = "".concat(CALENDAR_YEAR_CLASS, "--selected");
var CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__previous-year-chunk");
var CALENDAR_NEXT_YEAR_CHUNK_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__next-year-chunk");
var CALENDAR_DATE_PICKER_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__date-picker");
var CALENDAR_MONTH_PICKER_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__month-picker");
var CALENDAR_YEAR_PICKER_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__year-picker");
var CALENDAR_TABLE_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__table");
var CALENDAR_ROW_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__row");
var CALENDAR_CELL_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__cell");
var CALENDAR_CELL_CENTER_ITEMS_CLASS = "".concat(CALENDAR_CELL_CLASS, "--center-items");
var CALENDAR_MONTH_LABEL_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__month-label");
var CALENDAR_DAY_OF_WEEK_CLASS = "".concat(DATE_PICKER_CALENDAR_CLASS, "__day-of-week");
var DATE_PICKER = ".".concat(DATE_PICKER_CLASS);
var DATE_PICKER_BUTTON = ".".concat(DATE_PICKER_BUTTON_CLASS);
var DATE_PICKER_INTERNAL_INPUT = ".".concat(DATE_PICKER_INTERNAL_INPUT_CLASS);
var DATE_PICKER_EXTERNAL_INPUT = ".".concat(DATE_PICKER_EXTERNAL_INPUT_CLASS);
var DATE_PICKER_CALENDAR = ".".concat(DATE_PICKER_CALENDAR_CLASS);
var DATE_PICKER_STATUS = ".".concat(DATE_PICKER_STATUS_CLASS);
var CALENDAR_DATE = ".".concat(CALENDAR_DATE_CLASS);
var CALENDAR_DATE_FOCUSED = ".".concat(CALENDAR_DATE_FOCUSED_CLASS);
var CALENDAR_DATE_CURRENT_MONTH = ".".concat(CALENDAR_DATE_CURRENT_MONTH_CLASS);
var CALENDAR_PREVIOUS_YEAR = ".".concat(CALENDAR_PREVIOUS_YEAR_CLASS);
var CALENDAR_PREVIOUS_MONTH = ".".concat(CALENDAR_PREVIOUS_MONTH_CLASS);
var CALENDAR_NEXT_YEAR = ".".concat(CALENDAR_NEXT_YEAR_CLASS);
var CALENDAR_NEXT_MONTH = ".".concat(CALENDAR_NEXT_MONTH_CLASS);
var CALENDAR_YEAR_SELECTION = ".".concat(CALENDAR_YEAR_SELECTION_CLASS);
var CALENDAR_MONTH_SELECTION = ".".concat(CALENDAR_MONTH_SELECTION_CLASS);
var CALENDAR_MONTH = ".".concat(CALENDAR_MONTH_CLASS);
var CALENDAR_YEAR = ".".concat(CALENDAR_YEAR_CLASS);
var CALENDAR_PREVIOUS_YEAR_CHUNK = ".".concat(CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS);
var CALENDAR_NEXT_YEAR_CHUNK = ".".concat(CALENDAR_NEXT_YEAR_CHUNK_CLASS);
var CALENDAR_DATE_PICKER = ".".concat(CALENDAR_DATE_PICKER_CLASS);
var CALENDAR_MONTH_PICKER = ".".concat(CALENDAR_MONTH_PICKER_CLASS);
var CALENDAR_YEAR_PICKER = ".".concat(CALENDAR_YEAR_PICKER_CLASS);
var CALENDAR_MONTH_FOCUSED = ".".concat(CALENDAR_MONTH_FOCUSED_CLASS);
var CALENDAR_YEAR_FOCUSED = ".".concat(CALENDAR_YEAR_FOCUSED_CLASS);
var VALIDATION_MESSAGE = "Please enter a valid date";
var MONTH_LABELS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAY_OF_WEEK_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var ENTER_KEYCODE = 13;
var YEAR_CHUNK = 12;
var DEFAULT_MIN_DATE = "0000-01-01";
var DEFAULT_EXTERNAL_DATE_FORMAT = "MM/DD/YYYY";
var INTERNAL_DATE_FORMAT = "YYYY-MM-DD";
var NOT_DISABLED_SELECTOR = ":not([disabled])";

var processFocusableSelectors = function processFocusableSelectors() {
  for (var _len = arguments.length, selectors = new Array(_len), _key = 0; _key < _len; _key++) {
    selectors[_key] = arguments[_key];
  }

  return selectors.map(function (query) {
    return query + NOT_DISABLED_SELECTOR;
  }).join(", ");
};

var DATE_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_PREVIOUS_YEAR, CALENDAR_PREVIOUS_MONTH, CALENDAR_YEAR_SELECTION, CALENDAR_MONTH_SELECTION, CALENDAR_NEXT_YEAR, CALENDAR_NEXT_MONTH, CALENDAR_DATE_FOCUSED);
var MONTH_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_MONTH_FOCUSED);
var YEAR_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_PREVIOUS_YEAR_CHUNK, CALENDAR_NEXT_YEAR_CHUNK, CALENDAR_YEAR_FOCUSED); // #region Date Manipulation Functions

/**
 * Keep date within month. Month would only be over by 1 to 3 days
 *
 * @param {Date} dateToCheck the date object to check
 * @param {number} month the correct month
 * @returns {Date} the date, corrected if needed
 */

var keepDateWithinMonth = function keepDateWithinMonth(dateToCheck, month) {
  if (month !== dateToCheck.getMonth()) {
    dateToCheck.setDate(0);
  }

  return dateToCheck;
};
/**
 * Set date from month day year
 *
 * @param {number} year the year to set
 * @param {number} month the month to set (zero-indexed)
 * @param {number} date the date to set
 * @returns {Date} the set date
 */


var setDate = function setDate(year, month, date) {
  var newDate = new Date(0);
  newDate.setFullYear(year, month, date);
  return newDate;
};
/**
 * todays date
 *
 * @returns {Date} todays date
 */


var today = function today() {
  var newDate = new Date();
  var day = newDate.getDate();
  var month = newDate.getMonth();
  var year = newDate.getFullYear();
  return setDate(year, month, day);
};
/**
 * Set date to first day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */


var startOfMonth = function startOfMonth(date) {
  var newDate = new Date(0);
  newDate.setFullYear(date.getFullYear(), date.getMonth(), 1);
  return newDate;
};
/**
 * Set date to last day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */


var lastDayOfMonth = function lastDayOfMonth(date) {
  var newDate = new Date(0);
  newDate.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  return newDate;
};
/**
 * Add days to date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numDays the difference in days
 * @returns {Date} the adjusted date
 */


var addDays = function addDays(_date, numDays) {
  var newDate = new Date(_date.getTime());
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};
/**
 * Subtract days from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numDays the difference in days
 * @returns {Date} the adjusted date
 */


var subDays = function subDays(_date, numDays) {
  return addDays(_date, -numDays);
};
/**
 * Add weeks to date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */


var addWeeks = function addWeeks(_date, numWeeks) {
  return addDays(_date, numWeeks * 7);
};
/**
 * Subtract weeks from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */


var subWeeks = function subWeeks(_date, numWeeks) {
  return addWeeks(_date, -numWeeks);
};
/**
 * Set date to the start of the week (Sunday)
 *
 * @param {Date} _date the date to adjust
 * @returns {Date} the adjusted date
 */


var startOfWeek = function startOfWeek(_date) {
  var dayOfWeek = _date.getDay();

  return subDays(_date, dayOfWeek);
};
/**
 * Set date to the end of the week (Saturday)
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */


var endOfWeek = function endOfWeek(_date) {
  var dayOfWeek = _date.getDay();

  return addDays(_date, 6 - dayOfWeek);
};
/**
 * Add months to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numMonths the difference in months
 * @returns {Date} the adjusted date
 */


var addMonths = function addMonths(_date, numMonths) {
  var newDate = new Date(_date.getTime());
  var dateMonth = (newDate.getMonth() + 12 + numMonths) % 12;
  newDate.setMonth(newDate.getMonth() + numMonths);
  keepDateWithinMonth(newDate, dateMonth);
  return newDate;
};
/**
 * Subtract months from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numMonths the difference in months
 * @returns {Date} the adjusted date
 */


var subMonths = function subMonths(_date, numMonths) {
  return addMonths(_date, -numMonths);
};
/**
 * Add years to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */


var addYears = function addYears(_date, numYears) {
  return addMonths(_date, numYears * 12);
};
/**
 * Subtract years from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */


var subYears = function subYears(_date, numYears) {
  return addYears(_date, -numYears);
};
/**
 * Set months of date
 *
 * @param {Date} _date the date to adjust
 * @param {number} month zero-indexed month to set
 * @returns {Date} the adjusted date
 */


var setMonth = function setMonth(_date, month) {
  var newDate = new Date(_date.getTime());
  newDate.setMonth(month);
  keepDateWithinMonth(newDate, month);
  return newDate;
};
/**
 * Set year of date
 *
 * @param {Date} _date the date to adjust
 * @param {number} year the year to set
 * @returns {Date} the adjusted date
 */


var setYear = function setYear(_date, year) {
  var newDate = new Date(_date.getTime());
  var month = newDate.getMonth();
  newDate.setFullYear(year);
  keepDateWithinMonth(newDate, month);
  return newDate;
};
/**
 * Return the earliest date
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {Date} the earliest date
 */


var min = function min(dateA, dateB) {
  var newDate = dateA;

  if (dateB < dateA) {
    newDate = dateB;
  }

  return new Date(newDate.getTime());
};
/**
 * Return the latest date
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {Date} the latest date
 */


var max = function max(dateA, dateB) {
  var newDate = dateA;

  if (dateB > dateA) {
    newDate = dateB;
  }

  return new Date(newDate.getTime());
};
/**
 * Check if dates are the in the same year
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {boolean} are dates in the same year
 */


var isSameYear = function isSameYear(dateA, dateB) {
  return dateA && dateB && dateA.getFullYear() === dateB.getFullYear();
};
/**
 * Check if dates are the in the same month
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {boolean} are dates in the same month
 */


var isSameMonth = function isSameMonth(dateA, dateB) {
  return isSameYear(dateA, dateB) && dateA.getMonth() === dateB.getMonth();
};
/**
 * Check if dates are the same date
 *
 * @param {Date} dateA the date to compare
 * @param {Date} dateA the date to compare
 * @returns {boolean} are dates the same date
 */


var isSameDay = function isSameDay(dateA, dateB) {
  return isSameMonth(dateA, dateB) && dateA.getDate() === dateB.getDate();
};
/**
 * return a new date within minimum and maximum date
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @returns {Date} the date between min and max
 */


var keepDateBetweenMinAndMax = function keepDateBetweenMinAndMax(date, minDate, maxDate) {
  var newDate = date;

  if (date < minDate) {
    newDate = minDate;
  } else if (maxDate && date > maxDate) {
    newDate = maxDate;
  }

  return new Date(newDate.getTime());
};
/**
 * Check if dates is valid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is there a day within the month within min and max dates
 */


var isDateWithinMinAndMax = function isDateWithinMinAndMax(date, minDate, maxDate) {
  return date >= minDate && (!maxDate || date <= maxDate);
};
/**
 * Check if dates month is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */


var isDatesMonthOutsideMinOrMax = function isDatesMonthOutsideMinOrMax(date, minDate, maxDate) {
  return lastDayOfMonth(date) < minDate || maxDate && startOfMonth(date) > maxDate;
};
/**
 * Check if dates year is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */


var isDatesYearOutsideMinOrMax = function isDatesYearOutsideMinOrMax(date, minDate, maxDate) {
  return lastDayOfMonth(setMonth(date, 11)) < minDate || maxDate && startOfMonth(setMonth(date, 0)) > maxDate;
};
/**
 * Parse a date with format M-D-YY
 *
 * @param {string} dateString the date string to parse
 * @param {string} dateFormat the format of the date string
 * @param {boolean} adjustDate should the date be adjusted
 * @returns {Date} the parsed date
 */


var parseDateString = function parseDateString(dateString) {
  var dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INTERNAL_DATE_FORMAT;
  var adjustDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var date;
  var month;
  var day;
  var year;
  var parsed;

  if (dateString) {
    var monthStr, dayStr, yearStr;

    if (dateFormat === DEFAULT_EXTERNAL_DATE_FORMAT) {
      var _dateString$split = dateString.split("/");

      var _dateString$split2 = _slicedToArray(_dateString$split, 3);

      monthStr = _dateString$split2[0];
      dayStr = _dateString$split2[1];
      yearStr = _dateString$split2[2];
    } else {
      var _dateString$split3 = dateString.split("-");

      var _dateString$split4 = _slicedToArray(_dateString$split3, 3);

      yearStr = _dateString$split4[0];
      monthStr = _dateString$split4[1];
      dayStr = _dateString$split4[2];
    }

    if (yearStr) {
      parsed = parseInt(yearStr, 10);

      if (!Number.isNaN(parsed)) {
        year = parsed;

        if (adjustDate) {
          year = Math.max(0, year);

          if (yearStr.length < 3) {
            var currentYear = today().getFullYear();
            var currentYearStub = currentYear - currentYear % Math.pow(10, yearStr.length);
            year = currentYearStub + parsed;
          }
        }
      }
    }

    if (monthStr) {
      parsed = parseInt(monthStr, 10);

      if (!Number.isNaN(parsed)) {
        month = parsed;

        if (adjustDate) {
          month = Math.max(1, month);
          month = Math.min(12, month);
        }
      }
    }

    if (month && dayStr && year != null) {
      parsed = parseInt(dayStr, 10);

      if (!Number.isNaN(parsed)) {
        day = parsed;

        if (adjustDate) {
          var lastDayOfTheMonth = setDate(year, month, 0).getDate();
          day = Math.max(1, day);
          day = Math.min(lastDayOfTheMonth, day);
        }
      }
    }

    if (month && day && year != null) {
      date = setDate(year, month - 1, day);
    }
  }

  return date;
};
/**
 * Format a date to format MM-DD-YYYY
 *
 * @param {Date} date the date to format
 * @param {string} dateFormat the format of the date string
 * @returns {string} the formatted date string
 */


var formatDate = function formatDate(date) {
  var dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INTERNAL_DATE_FORMAT;

  var padZeros = function padZeros(value, length) {
    return "0000".concat(value).slice(-length);
  };

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();

  if (dateFormat === DEFAULT_EXTERNAL_DATE_FORMAT) {
    return [padZeros(month, 2), padZeros(day, 2), padZeros(year, 4)].join("/");
  }

  return [padZeros(year, 4), padZeros(month, 2), padZeros(day, 2)].join("-");
}; // #endregion Date Manipulation Functions

/**
 * Create a grid string from an array of html strings
 *
 * @param {string[]} htmlArray the array of html items
 * @param {number} rowSize the length of a row
 * @returns {string} the grid string
 */


var listToGridHtml = function listToGridHtml(htmlArray, rowSize) {
  var grid = [];
  var row = [];
  var i = 0;

  while (i < htmlArray.length) {
    row = [];

    while (i < htmlArray.length && row.length < rowSize) {
      row.push("<td>".concat(htmlArray[i], "</td>"));
      i += 1;
    }

    grid.push("<tr>".concat(row.join(""), "</tr>"));
  }

  return grid.join("");
};
/**
 * set the value of the element and dispatch a change event
 *
 * @param {HTMLInputElement} el The element to update
 * @param {string} value The new value of the element
 */


var changeElementValue = function changeElementValue(el) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var elementToChange = el;
  elementToChange.value = value;
  var event = new CustomEvent("change", {
    bubbles: true,
    cancelable: true,
    detail: {
      value: value
    }
  });
  elementToChange.dispatchEvent(event);
};
/**
 * The properties and elements within the date picker.
 * @typedef {Object} DatePickerContext
 * @property {HTMLDivElement} calendarEl
 * @property {HTMLElement} datePickerEl
 * @property {HTMLInputElement} internalInputEl
 * @property {HTMLInputElement} externalInputEl
 * @property {HTMLDivElement} statusEl
 * @property {HTMLDivElement} firstYearChunkEl
 * @property {Date} calendarDate
 * @property {Date} minDate
 * @property {Date} maxDate
 * @property {Date} selectedDate
 * @property {Date} rangeDate
 * @property {Date} defaultDate
 */

/**
 * Get an object of the properties and elements belonging directly to the given
 * date picker component.
 *
 * @param {HTMLElement} el the element within the date picker
 * @returns {DatePickerContext} elements
 */


var getDatePickerContext = function getDatePickerContext(el) {
  var datePickerEl = el.closest(DATE_PICKER);

  if (!datePickerEl) {
    throw new Error("Element is missing outer ".concat(DATE_PICKER));
  }

  var internalInputEl = datePickerEl.querySelector(DATE_PICKER_INTERNAL_INPUT);
  var externalInputEl = datePickerEl.querySelector(DATE_PICKER_EXTERNAL_INPUT);
  var calendarEl = datePickerEl.querySelector(DATE_PICKER_CALENDAR);
  var toggleBtnEl = datePickerEl.querySelector(DATE_PICKER_BUTTON);
  var statusEl = datePickerEl.querySelector(DATE_PICKER_STATUS);
  var firstYearChunkEl = datePickerEl.querySelector(CALENDAR_YEAR);
  var inputDate = parseDateString(externalInputEl.value, DEFAULT_EXTERNAL_DATE_FORMAT, true);
  var selectedDate = parseDateString(internalInputEl.value);
  var calendarDate = parseDateString(calendarEl.dataset.value);
  var minDate = parseDateString(datePickerEl.dataset.minDate);
  var maxDate = parseDateString(datePickerEl.dataset.maxDate);
  var rangeDate = parseDateString(datePickerEl.dataset.rangeDate);
  var defaultDate = parseDateString(datePickerEl.dataset.defaultDate);

  if (minDate && maxDate && minDate > maxDate) {
    throw new Error("Minimum date cannot be after maximum date");
  }

  return {
    calendarDate: calendarDate,
    minDate: minDate,
    toggleBtnEl: toggleBtnEl,
    selectedDate: selectedDate,
    maxDate: maxDate,
    firstYearChunkEl: firstYearChunkEl,
    datePickerEl: datePickerEl,
    inputDate: inputDate,
    internalInputEl: internalInputEl,
    externalInputEl: externalInputEl,
    calendarEl: calendarEl,
    rangeDate: rangeDate,
    defaultDate: defaultDate,
    statusEl: statusEl
  };
};
/**
 * Disable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var disable = function disable(el) {
  var _getDatePickerContext = getDatePickerContext(el),
      externalInputEl = _getDatePickerContext.externalInputEl,
      toggleBtnEl = _getDatePickerContext.toggleBtnEl;

  toggleBtnEl.disabled = true;
  externalInputEl.disabled = true;
};
/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var enable = function enable(el) {
  var _getDatePickerContext2 = getDatePickerContext(el),
      externalInputEl = _getDatePickerContext2.externalInputEl,
      toggleBtnEl = _getDatePickerContext2.toggleBtnEl;

  toggleBtnEl.disabled = false;
  externalInputEl.disabled = false;
}; // #region Validation

/**
 * Validate the value in the input as a valid date of format M/D/YYYY
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var isDateInputInvalid = function isDateInputInvalid(el) {
  var _getDatePickerContext3 = getDatePickerContext(el),
      externalInputEl = _getDatePickerContext3.externalInputEl,
      minDate = _getDatePickerContext3.minDate,
      maxDate = _getDatePickerContext3.maxDate;

  var dateString = externalInputEl.value;
  var isInvalid = false;

  if (dateString) {
    isInvalid = true;
    var dateStringParts = dateString.split("/");

    var _dateStringParts$map = dateStringParts.map(function (str) {
      var value;
      var parsed = parseInt(str, 10);
      if (!Number.isNaN(parsed)) value = parsed;
      return value;
    }),
        _dateStringParts$map2 = _slicedToArray(_dateStringParts$map, 3),
        month = _dateStringParts$map2[0],
        day = _dateStringParts$map2[1],
        year = _dateStringParts$map2[2];

    if (month && day && year != null) {
      var checkDate = setDate(year, month - 1, day);

      if (checkDate.getMonth() === month - 1 && checkDate.getDate() === day && checkDate.getFullYear() === year && dateStringParts[2].length === 4 && isDateWithinMinAndMax(checkDate, minDate, maxDate)) {
        isInvalid = false;
      }
    }
  }

  return isInvalid;
};
/**
 * Validate the value in the input as a valid date of format M/D/YYYY
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var validateDateInput = function validateDateInput(el) {
  var _getDatePickerContext4 = getDatePickerContext(el),
      externalInputEl = _getDatePickerContext4.externalInputEl;

  var isInvalid = isDateInputInvalid(externalInputEl);

  if (isInvalid && !externalInputEl.validationMessage) {
    externalInputEl.setCustomValidity(VALIDATION_MESSAGE);
  }

  if (!isInvalid && externalInputEl.validationMessage === VALIDATION_MESSAGE) {
    externalInputEl.setCustomValidity("");
  }
}; // #endregion Validation

/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var reconcileInputValues = function reconcileInputValues(el) {
  var _getDatePickerContext5 = getDatePickerContext(el),
      internalInputEl = _getDatePickerContext5.internalInputEl,
      inputDate = _getDatePickerContext5.inputDate;

  var newValue = "";

  if (inputDate && !isDateInputInvalid(el)) {
    newValue = formatDate(inputDate);
  }

  if (internalInputEl.value !== newValue) {
    changeElementValue(internalInputEl, newValue);
  }
};
/**
 * Select the value of the date picker inputs.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @param {string} dateString The date string to update in YYYY-MM-DD format
 */


var setCalendarValue = function setCalendarValue(el, dateString) {
  var parsedDate = parseDateString(dateString);

  if (parsedDate) {
    var formattedDate = formatDate(parsedDate, DEFAULT_EXTERNAL_DATE_FORMAT);

    var _getDatePickerContext6 = getDatePickerContext(el),
        datePickerEl = _getDatePickerContext6.datePickerEl,
        internalInputEl = _getDatePickerContext6.internalInputEl,
        externalInputEl = _getDatePickerContext6.externalInputEl;

    changeElementValue(internalInputEl, dateString);
    changeElementValue(externalInputEl, formattedDate);
    validateDateInput(datePickerEl);
  }
};
/**
 * Enhance an input with the date picker elements
 *
 * @param {HTMLElement} el The initial wrapping element of the date picker component
 */


var enhanceDatePicker = function enhanceDatePicker(el) {
  var datePickerEl = el.closest(DATE_PICKER);
  var defaultValue = datePickerEl.dataset.defaultValue;
  var internalInputEl = datePickerEl.querySelector("input");

  if (!internalInputEl) {
    throw new Error("".concat(DATE_PICKER, " is missing inner input"));
  }

  if (internalInputEl.value) {
    internalInputEl.value = "";
  }

  var minDate = parseDateString(datePickerEl.dataset.minDate || internalInputEl.getAttribute("min"));
  datePickerEl.dataset.minDate = minDate ? formatDate(minDate) : DEFAULT_MIN_DATE;
  var maxDate = parseDateString(datePickerEl.dataset.maxDate || internalInputEl.getAttribute("max"));

  if (maxDate) {
    datePickerEl.dataset.maxDate = formatDate(maxDate);
  }

  var calendarWrapper = document.createElement("div");
  calendarWrapper.classList.add(DATE_PICKER_WRAPPER_CLASS);
  var externalInputEl = internalInputEl.cloneNode();
  externalInputEl.classList.add(DATE_PICKER_EXTERNAL_INPUT_CLASS);
  externalInputEl.type = "text";
  calendarWrapper.appendChild(externalInputEl);
  calendarWrapper.insertAdjacentHTML("beforeend", ["<button type=\"button\" class=\"".concat(DATE_PICKER_BUTTON_CLASS, "\" aria-haspopup=\"true\" aria-label=\"Toggle calendar\">&nbsp;</button>"), "<div class=\"".concat(DATE_PICKER_CALENDAR_CLASS, "\" role=\"dialog\" aria-modal=\"true\" hidden></div>"), "<div class=\"usa-sr-only ".concat(DATE_PICKER_STATUS_CLASS, "\" role=\"status\" aria-live=\"polite\"></div>")].join(""));
  internalInputEl.setAttribute("aria-hidden", "true");
  internalInputEl.setAttribute("tabindex", "-1");
  internalInputEl.style.display = "none";
  internalInputEl.classList.add(DATE_PICKER_INTERNAL_INPUT_CLASS);
  internalInputEl.removeAttribute("id");
  internalInputEl.removeAttribute("name");
  internalInputEl.required = false;
  datePickerEl.appendChild(calendarWrapper);
  datePickerEl.classList.add(DATE_PICKER_INITIALIZED_CLASS);

  if (defaultValue) {
    setCalendarValue(datePickerEl, defaultValue);
  }

  if (internalInputEl.disabled) {
    disable(datePickerEl);
    internalInputEl.disabled = false;
  }
}; // #region Calendar - Date Selection View

/**
 * render the calendar.
 *
 * @param {HTMLElement} el An element within the date picker component
 * @param {Date} _dateToDisplay a date to render on the calendar
 * @returns {HTMLElement} a reference to the new calendar element
 */


var renderCalendar = function renderCalendar(el, _dateToDisplay) {
  var _getDatePickerContext7 = getDatePickerContext(el),
      datePickerEl = _getDatePickerContext7.datePickerEl,
      calendarEl = _getDatePickerContext7.calendarEl,
      statusEl = _getDatePickerContext7.statusEl,
      selectedDate = _getDatePickerContext7.selectedDate,
      maxDate = _getDatePickerContext7.maxDate,
      minDate = _getDatePickerContext7.minDate,
      rangeDate = _getDatePickerContext7.rangeDate;

  var todaysDate = today();
  var dateToDisplay = _dateToDisplay || todaysDate;
  var calendarWasHidden = calendarEl.hidden;
  var focusedDate = addDays(dateToDisplay, 0);
  var focusedMonth = dateToDisplay.getMonth();
  var focusedYear = dateToDisplay.getFullYear();
  var prevMonth = subMonths(dateToDisplay, 1);
  var nextMonth = addMonths(dateToDisplay, 1);
  var currentFormattedDate = formatDate(dateToDisplay);
  var firstOfMonth = startOfMonth(dateToDisplay);
  var prevButtonsDisabled = isSameMonth(dateToDisplay, minDate);
  var nextButtonsDisabled = isSameMonth(dateToDisplay, maxDate);
  var rangeConclusionDate = selectedDate || dateToDisplay;
  var rangeStartDate = rangeDate && min(rangeConclusionDate, rangeDate);
  var rangeEndDate = rangeDate && max(rangeConclusionDate, rangeDate);
  var withinRangeStartDate = rangeDate && addDays(rangeStartDate, 1);
  var withinRangeEndDate = rangeDate && subDays(rangeEndDate, 1);
  var monthLabel = MONTH_LABELS[focusedMonth];

  var generateDateHtml = function generateDateHtml(dateToRender) {
    var classes = [CALENDAR_DATE_CLASS];
    var day = dateToRender.getDate();
    var month = dateToRender.getMonth();
    var year = dateToRender.getFullYear();
    var dayOfWeek = dateToRender.getDay();
    var formattedDate = formatDate(dateToRender);
    var tabindex = "-1";
    var isDisabled = !isDateWithinMinAndMax(dateToRender, minDate, maxDate);
    var isSelected = isSameDay(dateToRender, selectedDate);

    if (isSameMonth(dateToRender, prevMonth)) {
      classes.push(CALENDAR_DATE_PREVIOUS_MONTH_CLASS);
    }

    if (isSameMonth(dateToRender, focusedDate)) {
      classes.push(CALENDAR_DATE_CURRENT_MONTH_CLASS);
    }

    if (isSameMonth(dateToRender, nextMonth)) {
      classes.push(CALENDAR_DATE_NEXT_MONTH_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_DATE_SELECTED_CLASS);
    }

    if (isSameDay(dateToRender, todaysDate)) {
      classes.push(CALENDAR_DATE_TODAY_CLASS);
    }

    if (rangeDate) {
      if (isSameDay(dateToRender, rangeDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_CLASS);
      }

      if (isSameDay(dateToRender, rangeStartDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_START_CLASS);
      }

      if (isSameDay(dateToRender, rangeEndDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_END_CLASS);
      }

      if (isDateWithinMinAndMax(dateToRender, withinRangeStartDate, withinRangeEndDate)) {
        classes.push(CALENDAR_DATE_WITHIN_RANGE_CLASS);
      }
    }

    if (isSameDay(dateToRender, focusedDate)) {
      tabindex = "0";
      classes.push(CALENDAR_DATE_FOCUSED_CLASS);
    }

    var monthStr = MONTH_LABELS[month];
    var dayStr = DAY_OF_WEEK_LABELS[dayOfWeek];
    return "<button\n      type=\"button\"\n      tabindex=\"".concat(tabindex, "\"\n      class=\"").concat(classes.join(" "), "\"\n      data-day=\"").concat(day, "\"\n      data-month=\"").concat(month + 1, "\"\n      data-year=\"").concat(year, "\"\n      data-value=\"").concat(formattedDate, "\"\n      aria-label=\"").concat(day, " ").concat(monthStr, " ").concat(year, " ").concat(dayStr, "\"\n      aria-selected=\"").concat(isSelected ? "true" : "false", "\"\n      ").concat(isDisabled ? "disabled=\"disabled\"" : "", "\n    >").concat(day, "</button>");
  }; // set date to first rendered day


  dateToDisplay = startOfWeek(firstOfMonth);
  var days = [];

  while (days.length < 28 || dateToDisplay.getMonth() === focusedMonth || days.length % 7 !== 0) {
    days.push(generateDateHtml(dateToDisplay));
    dateToDisplay = addDays(dateToDisplay, 1);
  }

  var datesHtml = listToGridHtml(days, 7);
  var newCalendar = calendarEl.cloneNode();
  newCalendar.dataset.value = currentFormattedDate;
  newCalendar.style.top = "".concat(datePickerEl.offsetHeight, "px");
  newCalendar.hidden = false;
  newCalendar.innerHTML = "<div tabindex=\"-1\" class=\"".concat(CALENDAR_DATE_PICKER_CLASS, "\">\n      <div class=\"").concat(CALENDAR_ROW_CLASS, "\">\n        <div class=\"").concat(CALENDAR_CELL_CLASS, " ").concat(CALENDAR_CELL_CENTER_ITEMS_CLASS, "\">\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_PREVIOUS_YEAR_CLASS, "\"\n            aria-label=\"Navigate back one year\"\n            ").concat(prevButtonsDisabled ? "disabled=\"disabled\"" : "", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"").concat(CALENDAR_CELL_CLASS, " ").concat(CALENDAR_CELL_CENTER_ITEMS_CLASS, "\">\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_PREVIOUS_MONTH_CLASS, "\"\n            aria-label=\"Navigate back one month\"\n            ").concat(prevButtonsDisabled ? "disabled=\"disabled\"" : "", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"").concat(CALENDAR_CELL_CLASS, " ").concat(CALENDAR_MONTH_LABEL_CLASS, "\">\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_MONTH_SELECTION_CLASS, "\" aria-label=\"").concat(monthLabel, ". Click to select month\"\n          >").concat(monthLabel, "</button>\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_YEAR_SELECTION_CLASS, "\" aria-label=\"").concat(focusedYear, ". Click to select year\"\n          >").concat(focusedYear, "</button>\n        </div>\n        <div class=\"").concat(CALENDAR_CELL_CLASS, " ").concat(CALENDAR_CELL_CENTER_ITEMS_CLASS, "\">\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_NEXT_MONTH_CLASS, "\"\n            aria-label=\"Navigate forward one month\"\n            ").concat(nextButtonsDisabled ? "disabled=\"disabled\"" : "", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"").concat(CALENDAR_CELL_CLASS, " ").concat(CALENDAR_CELL_CENTER_ITEMS_CLASS, "\">\n          <button\n            type=\"button\"\n            class=\"").concat(CALENDAR_NEXT_YEAR_CLASS, "\"\n            aria-label=\"Navigate forward one year\"\n            ").concat(nextButtonsDisabled ? "disabled=\"disabled\"" : "", "\n          >&nbsp;</button>\n        </div>\n      </div>\n      <table class=\"").concat(CALENDAR_TABLE_CLASS, "\" role=\"presentation\">\n        <thead>\n          <tr>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Sunday\">S</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Monday\">M</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Tuesday\">T</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Wednesday\">W</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Thursday\">Th</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Friday\">F</th>\n            <th class=\"").concat(CALENDAR_DAY_OF_WEEK_CLASS, "\" scope=\"col\" aria-label=\"Saturday\">S</th>\n          </tr>\n        </thead>\n        <tbody>\n          ").concat(datesHtml, "\n        </tbody>\n      </table>\n    </div>");
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  datePickerEl.classList.add(DATE_PICKER_ACTIVE_CLASS);
  var statuses = [];

  if (isSameDay(selectedDate, focusedDate)) {
    statuses.push("Selected date");
  }

  if (calendarWasHidden) {
    statuses.push("You can navigate by day using left and right arrows", "Weeks by using up and down arrows", "Months by using page up and page down keys", "Years by using shift plus page up and shift plus page down", "Home and end keys navigate to the beginning and end of a week");
    statusEl.textContent = "";
  } else {
    statuses.push("".concat(monthLabel, " ").concat(focusedYear));
  }

  statusEl.textContent = statuses.join(". ");
  return newCalendar;
};
/**
 * Navigate back one year and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */


var displayPreviousYear = function displayPreviousYear(_buttonEl) {
  if (_buttonEl.disabled) return;

  var _getDatePickerContext8 = getDatePickerContext(_buttonEl),
      calendarEl = _getDatePickerContext8.calendarEl,
      calendarDate = _getDatePickerContext8.calendarDate,
      minDate = _getDatePickerContext8.minDate,
      maxDate = _getDatePickerContext8.maxDate;

  var date = subYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  var nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Navigate back one month and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */


var displayPreviousMonth = function displayPreviousMonth(_buttonEl) {
  if (_buttonEl.disabled) return;

  var _getDatePickerContext9 = getDatePickerContext(_buttonEl),
      calendarEl = _getDatePickerContext9.calendarEl,
      calendarDate = _getDatePickerContext9.calendarDate,
      minDate = _getDatePickerContext9.minDate,
      maxDate = _getDatePickerContext9.maxDate;

  var date = subMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  var nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_MONTH);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Navigate forward one month and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */


var displayNextMonth = function displayNextMonth(_buttonEl) {
  if (_buttonEl.disabled) return;

  var _getDatePickerContext10 = getDatePickerContext(_buttonEl),
      calendarEl = _getDatePickerContext10.calendarEl,
      calendarDate = _getDatePickerContext10.calendarDate,
      minDate = _getDatePickerContext10.minDate,
      maxDate = _getDatePickerContext10.maxDate;

  var date = addMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  var nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_MONTH);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Navigate forward one year and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */


var displayNextYear = function displayNextYear(_buttonEl) {
  if (_buttonEl.disabled) return;

  var _getDatePickerContext11 = getDatePickerContext(_buttonEl),
      calendarEl = _getDatePickerContext11.calendarEl,
      calendarDate = _getDatePickerContext11.calendarDate,
      minDate = _getDatePickerContext11.minDate,
      maxDate = _getDatePickerContext11.maxDate;

  var date = addYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  var nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Hide the calendar of a date picker component.
 *
 * @param {HTMLElement} el An element within the date picker component
 */


var hideCalendar = function hideCalendar(el) {
  var _getDatePickerContext12 = getDatePickerContext(el),
      datePickerEl = _getDatePickerContext12.datePickerEl,
      calendarEl = _getDatePickerContext12.calendarEl,
      statusEl = _getDatePickerContext12.statusEl;

  datePickerEl.classList.remove(DATE_PICKER_ACTIVE_CLASS);
  calendarEl.hidden = true;
  statusEl.textContent = "";
};
/**
 * Select a date within the date picker component.
 *
 * @param {HTMLButtonElement} calendarDateEl A date element within the date picker component
 */


var selectDate = function selectDate(calendarDateEl) {
  if (calendarDateEl.disabled) return;

  var _getDatePickerContext13 = getDatePickerContext(calendarDateEl),
      datePickerEl = _getDatePickerContext13.datePickerEl,
      externalInputEl = _getDatePickerContext13.externalInputEl;

  setCalendarValue(calendarDateEl, calendarDateEl.dataset.value);
  hideCalendar(datePickerEl);
  externalInputEl.focus();
};
/**
 * Toggle the calendar.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */


var toggleCalendar = function toggleCalendar(el) {
  if (el.disabled) return;

  var _getDatePickerContext14 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext14.calendarEl,
      inputDate = _getDatePickerContext14.inputDate,
      minDate = _getDatePickerContext14.minDate,
      maxDate = _getDatePickerContext14.maxDate,
      defaultDate = _getDatePickerContext14.defaultDate;

  if (calendarEl.hidden) {
    var dateToDisplay = keepDateBetweenMinAndMax(inputDate || defaultDate || today(), minDate, maxDate);
    var newCalendar = renderCalendar(calendarEl, dateToDisplay);
    newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
  } else {
    hideCalendar(el);
  }
};
/**
 * Update the calendar when visible.
 *
 * @param {HTMLElement} el an element within the date picker
 */


var updateCalendarIfVisible = function updateCalendarIfVisible(el) {
  var _getDatePickerContext15 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext15.calendarEl,
      inputDate = _getDatePickerContext15.inputDate,
      minDate = _getDatePickerContext15.minDate,
      maxDate = _getDatePickerContext15.maxDate;

  var calendarShown = !calendarEl.hidden;

  if (calendarShown && inputDate) {
    var dateToDisplay = keepDateBetweenMinAndMax(inputDate, minDate, maxDate);
    renderCalendar(calendarEl, dateToDisplay);
  }
}; // #endregion Calendar - Date Selection View
// #region Calendar - Month Selection View

/**
 * Display the month selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @returns {HTMLElement} a reference to the new calendar element
 */


var displayMonthSelection = function displayMonthSelection(el, monthToDisplay) {
  var _getDatePickerContext16 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext16.calendarEl,
      statusEl = _getDatePickerContext16.statusEl,
      calendarDate = _getDatePickerContext16.calendarDate,
      minDate = _getDatePickerContext16.minDate,
      maxDate = _getDatePickerContext16.maxDate;

  var selectedMonth = calendarDate.getMonth();
  var focusedMonth = monthToDisplay == null ? selectedMonth : monthToDisplay;
  var months = MONTH_LABELS.map(function (month, index) {
    var monthToCheck = setMonth(calendarDate, index);
    var isDisabled = isDatesMonthOutsideMinOrMax(monthToCheck, minDate, maxDate);
    var tabindex = "-1";
    var classes = [CALENDAR_MONTH_CLASS];
    var isSelected = index === selectedMonth;

    if (index === focusedMonth) {
      tabindex = "0";
      classes.push(CALENDAR_MONTH_FOCUSED_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_MONTH_SELECTED_CLASS);
    }

    return "<button\n        type=\"button\"\n        tabindex=\"".concat(tabindex, "\"\n        class=\"").concat(classes.join(" "), "\"\n        data-value=\"").concat(index, "\"\n        data-label=\"").concat(month, "\"\n        aria-selected=\"").concat(isSelected ? "true" : "false", "\"\n        ").concat(isDisabled ? "disabled=\"disabled\"" : "", "\n      >").concat(month, "</button>");
  });
  var monthsHtml = "<div tabindex=\"-1\" class=\"".concat(CALENDAR_MONTH_PICKER_CLASS, "\">\n    <table class=\"").concat(CALENDAR_TABLE_CLASS, "\" role=\"presentation\">\n      <tbody>\n        ").concat(listToGridHtml(months, 3), "\n      </tbody>\n    </table>\n  </div>");
  var newCalendar = calendarEl.cloneNode();
  newCalendar.innerHTML = monthsHtml;
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  statusEl.textContent = "Select a month.";
  return newCalendar;
};
/**
 * Select a month in the date picker component.
 *
 * @param {HTMLButtonElement} monthEl An month element within the date picker component
 */


var selectMonth = function selectMonth(monthEl) {
  if (monthEl.disabled) return;

  var _getDatePickerContext17 = getDatePickerContext(monthEl),
      calendarEl = _getDatePickerContext17.calendarEl,
      calendarDate = _getDatePickerContext17.calendarDate,
      minDate = _getDatePickerContext17.minDate,
      maxDate = _getDatePickerContext17.maxDate;

  var selectedMonth = parseInt(monthEl.dataset.value, 10);
  var date = setMonth(calendarDate, selectedMonth);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
}; // #endregion Calendar - Month Selection View
// #region Calendar - Year Selection View

/**
 * Display the year selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @param {number} yearToDisplay year to display in year selection
 * @returns {HTMLElement} a reference to the new calendar element
 */


var displayYearSelection = function displayYearSelection(el, yearToDisplay) {
  var _getDatePickerContext18 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext18.calendarEl,
      statusEl = _getDatePickerContext18.statusEl,
      calendarDate = _getDatePickerContext18.calendarDate,
      minDate = _getDatePickerContext18.minDate,
      maxDate = _getDatePickerContext18.maxDate;

  var selectedYear = calendarDate.getFullYear();
  var focusedYear = yearToDisplay == null ? selectedYear : yearToDisplay;
  var yearToChunk = focusedYear;
  yearToChunk -= yearToChunk % YEAR_CHUNK;
  yearToChunk = Math.max(0, yearToChunk);
  var prevYearChunkDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearToChunk - 1), minDate, maxDate);
  var nextYearChunkDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearToChunk + YEAR_CHUNK), minDate, maxDate);
  var years = [];
  var yearIndex = yearToChunk;

  while (years.length < YEAR_CHUNK) {
    var isDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearIndex), minDate, maxDate);
    var tabindex = "-1";
    var classes = [CALENDAR_YEAR_CLASS];
    var isSelected = yearIndex === selectedYear;

    if (yearIndex === focusedYear) {
      tabindex = "0";
      classes.push(CALENDAR_YEAR_FOCUSED_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_YEAR_SELECTED_CLASS);
    }

    years.push("<button\n        type=\"button\"\n        tabindex=\"".concat(tabindex, "\"\n        class=\"").concat(classes.join(" "), "\"\n        data-value=\"").concat(yearIndex, "\"\n        aria-selected=\"").concat(isSelected ? "true" : "false", "\"\n        ").concat(isDisabled ? "disabled=\"disabled\"" : "", "\n      >").concat(yearIndex, "</button>"));
    yearIndex += 1;
  }

  var yearsHtml = listToGridHtml(years, 3);
  var newCalendar = calendarEl.cloneNode();
  newCalendar.innerHTML = "<div tabindex=\"-1\" class=\"".concat(CALENDAR_YEAR_PICKER_CLASS, "\">\n    <table class=\"").concat(CALENDAR_TABLE_CLASS, "\" role=\"presentation\">\n        <tbody>\n          <tr>\n            <td>\n              <button\n                type=\"button\"\n                class=\"").concat(CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS, "\"\n                aria-label=\"Navigate back ").concat(YEAR_CHUNK, " years\"\n                ").concat(prevYearChunkDisabled ? "disabled=\"disabled\"" : "", "\n              >&nbsp;</button>\n            </td>\n            <td colspan=\"3\">\n              <table class=\"").concat(CALENDAR_TABLE_CLASS, "\" role=\"presentation\">\n                <tbody>\n                  ").concat(yearsHtml, "\n                </tbody>\n              </table>\n            </td>\n            <td>\n              <button\n                type=\"button\"\n                class=\"").concat(CALENDAR_NEXT_YEAR_CHUNK_CLASS, "\"\n                aria-label=\"Navigate forward ").concat(YEAR_CHUNK, " years\"\n                ").concat(nextYearChunkDisabled ? "disabled=\"disabled\"" : "", "\n              >&nbsp;</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>");
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  statusEl.textContent = "Showing years ".concat(yearToChunk, " to ").concat(yearToChunk + YEAR_CHUNK - 1, ". Select a year.");
  return newCalendar;
};
/**
 * Navigate back by years and display the year selection screen.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */


var displayPreviousYearChunk = function displayPreviousYearChunk(el) {
  if (el.disabled) return;

  var _getDatePickerContext19 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext19.calendarEl,
      calendarDate = _getDatePickerContext19.calendarDate,
      minDate = _getDatePickerContext19.minDate,
      maxDate = _getDatePickerContext19.maxDate;

  var yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  var selectedYear = parseInt(yearEl.textContent, 10);
  var adjustedYear = selectedYear - YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);
  var date = setYear(calendarDate, adjustedYear);
  var cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
  var nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR_CHUNK);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_YEAR_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Navigate forward by years and display the year selection screen.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */


var displayNextYearChunk = function displayNextYearChunk(el) {
  if (el.disabled) return;

  var _getDatePickerContext20 = getDatePickerContext(el),
      calendarEl = _getDatePickerContext20.calendarEl,
      calendarDate = _getDatePickerContext20.calendarDate,
      minDate = _getDatePickerContext20.minDate,
      maxDate = _getDatePickerContext20.maxDate;

  var yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  var selectedYear = parseInt(yearEl.textContent, 10);
  var adjustedYear = selectedYear + YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);
  var date = setYear(calendarDate, adjustedYear);
  var cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
  var nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR_CHUNK);

  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_YEAR_PICKER);
  }

  nextToFocus.focus();
};
/**
 * Select a year in the date picker component.
 *
 * @param {HTMLButtonElement} yearEl A year element within the date picker component
 */


var selectYear = function selectYear(yearEl) {
  if (yearEl.disabled) return;

  var _getDatePickerContext21 = getDatePickerContext(yearEl),
      calendarEl = _getDatePickerContext21.calendarEl,
      calendarDate = _getDatePickerContext21.calendarDate,
      minDate = _getDatePickerContext21.minDate,
      maxDate = _getDatePickerContext21.maxDate;

  var selectedYear = parseInt(yearEl.innerHTML, 10);
  var date = setYear(calendarDate, selectedYear);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  var newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
}; // #endregion Calendar - Year Selection View
// #region Calendar Event Handling

/**
 * Hide the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */


var handleEscapeFromCalendar = function handleEscapeFromCalendar(event) {
  var _getDatePickerContext22 = getDatePickerContext(event.target),
      datePickerEl = _getDatePickerContext22.datePickerEl,
      externalInputEl = _getDatePickerContext22.externalInputEl;

  hideCalendar(datePickerEl);
  externalInputEl.focus();
  event.preventDefault();
}; // #endregion Calendar Event Handling
// #region Calendar Date Event Handling

/**
 * Adjust the date and display the calendar if needed.
 *
 * @param {function} adjustDateFn function that returns the adjusted date
 */


var adjustCalendar = function adjustCalendar(adjustDateFn) {
  return function (event) {
    var _getDatePickerContext23 = getDatePickerContext(event.target),
        calendarEl = _getDatePickerContext23.calendarEl,
        calendarDate = _getDatePickerContext23.calendarDate,
        minDate = _getDatePickerContext23.minDate,
        maxDate = _getDatePickerContext23.maxDate;

    var date = adjustDateFn(calendarDate);
    var cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);

    if (!isSameDay(calendarDate, cappedDate)) {
      var newCalendar = renderCalendar(calendarEl, cappedDate);
      newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
    }

    event.preventDefault();
  };
};
/**
 * Navigate back one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */


var handleUpFromDate = adjustCalendar(function (date) {
  return subWeeks(date, 1);
});
/**
 * Navigate forward one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleDownFromDate = adjustCalendar(function (date) {
  return addWeeks(date, 1);
});
/**
 * Navigate back one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleLeftFromDate = adjustCalendar(function (date) {
  return subDays(date, 1);
});
/**
 * Navigate forward one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleRightFromDate = adjustCalendar(function (date) {
  return addDays(date, 1);
});
/**
 * Navigate to the start of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleHomeFromDate = adjustCalendar(function (date) {
  return startOfWeek(date);
});
/**
 * Navigate to the end of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleEndFromDate = adjustCalendar(function (date) {
  return endOfWeek(date);
});
/**
 * Navigate forward one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageDownFromDate = adjustCalendar(function (date) {
  return addMonths(date, 1);
});
/**
 * Navigate back one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageUpFromDate = adjustCalendar(function (date) {
  return subMonths(date, 1);
});
/**
 * Navigate forward one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleShiftPageDownFromDate = adjustCalendar(function (date) {
  return addYears(date, 1);
});
/**
 * Navigate back one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleShiftPageUpFromDate = adjustCalendar(function (date) {
  return subYears(date, 1);
});
/**
 * display the calendar for the mouseover date.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} dateEl A date element within the date picker component
 */

var handleMouseoverFromDate = function handleMouseoverFromDate(dateEl) {
  if (dateEl.disabled) return;
  var calendarEl = dateEl.closest(DATE_PICKER_CALENDAR);
  var currentCalendarDate = calendarEl.dataset.value;
  var hoverDate = dateEl.dataset.value;
  if (hoverDate === currentCalendarDate) return;
  var dateToDisplay = parseDateString(hoverDate);
  var newCalendar = renderCalendar(calendarEl, dateToDisplay);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
}; // #endregion Calendar Date Event Handling
// #region Calendar Month Event Handling

/**
 * Adjust the month and display the month selection screen if needed.
 *
 * @param {function} adjustMonthFn function that returns the adjusted month
 */


var adjustMonthSelectionScreen = function adjustMonthSelectionScreen(adjustMonthFn) {
  return function (event) {
    var monthEl = event.target;
    var selectedMonth = parseInt(monthEl.dataset.value, 10);

    var _getDatePickerContext24 = getDatePickerContext(monthEl),
        calendarEl = _getDatePickerContext24.calendarEl,
        calendarDate = _getDatePickerContext24.calendarDate,
        minDate = _getDatePickerContext24.minDate,
        maxDate = _getDatePickerContext24.maxDate;

    var currentDate = setMonth(calendarDate, selectedMonth);
    var adjustedMonth = adjustMonthFn(selectedMonth);
    adjustedMonth = Math.max(0, Math.min(11, adjustedMonth));
    var date = setMonth(calendarDate, adjustedMonth);
    var cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);

    if (!isSameMonth(currentDate, cappedDate)) {
      var newCalendar = displayMonthSelection(calendarEl, cappedDate.getMonth());
      newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
    }

    event.preventDefault();
  };
};
/**
 * Navigate back three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */


var handleUpFromMonth = adjustMonthSelectionScreen(function (month) {
  return month - 3;
});
/**
 * Navigate forward three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleDownFromMonth = adjustMonthSelectionScreen(function (month) {
  return month + 3;
});
/**
 * Navigate back one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleLeftFromMonth = adjustMonthSelectionScreen(function (month) {
  return month - 1;
});
/**
 * Navigate forward one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleRightFromMonth = adjustMonthSelectionScreen(function (month) {
  return month + 1;
});
/**
 * Navigate to the start of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleHomeFromMonth = adjustMonthSelectionScreen(function (month) {
  return month - month % 3;
});
/**
 * Navigate to the end of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleEndFromMonth = adjustMonthSelectionScreen(function (month) {
  return month + 2 - month % 3;
});
/**
 * Navigate to the last month (December) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageDownFromMonth = adjustMonthSelectionScreen(function () {
  return 11;
});
/**
 * Navigate to the first month (January) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageUpFromMonth = adjustMonthSelectionScreen(function () {
  return 0;
});
/**
 * update the focus on a month when the mouse moves.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} monthEl A month element within the date picker component
 */

var handleMouseoverFromMonth = function handleMouseoverFromMonth(monthEl) {
  if (monthEl.disabled) return;
  if (monthEl.classList.contains(CALENDAR_MONTH_FOCUSED_CLASS)) return;
  var focusMonth = parseInt(monthEl.dataset.value, 10);
  var newCalendar = displayMonthSelection(monthEl, focusMonth);
  newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
}; // #endregion Calendar Month Event Handling
// #region Calendar Year Event Handling

/**
 * Adjust the year and display the year selection screen if needed.
 *
 * @param {function} adjustYearFn function that returns the adjusted year
 */


var adjustYearSelectionScreen = function adjustYearSelectionScreen(adjustYearFn) {
  return function (event) {
    var yearEl = event.target;
    var selectedYear = parseInt(yearEl.dataset.value, 10);

    var _getDatePickerContext25 = getDatePickerContext(yearEl),
        calendarEl = _getDatePickerContext25.calendarEl,
        calendarDate = _getDatePickerContext25.calendarDate,
        minDate = _getDatePickerContext25.minDate,
        maxDate = _getDatePickerContext25.maxDate;

    var currentDate = setYear(calendarDate, selectedYear);
    var adjustedYear = adjustYearFn(selectedYear);
    adjustedYear = Math.max(0, adjustedYear);
    var date = setYear(calendarDate, adjustedYear);
    var cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);

    if (!isSameYear(currentDate, cappedDate)) {
      var newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
      newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
    }

    event.preventDefault();
  };
};
/**
 * Navigate back three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */


var handleUpFromYear = adjustYearSelectionScreen(function (year) {
  return year - 3;
});
/**
 * Navigate forward three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleDownFromYear = adjustYearSelectionScreen(function (year) {
  return year + 3;
});
/**
 * Navigate back one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleLeftFromYear = adjustYearSelectionScreen(function (year) {
  return year - 1;
});
/**
 * Navigate forward one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleRightFromYear = adjustYearSelectionScreen(function (year) {
  return year + 1;
});
/**
 * Navigate to the start of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleHomeFromYear = adjustYearSelectionScreen(function (year) {
  return year - year % 3;
});
/**
 * Navigate to the end of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handleEndFromYear = adjustYearSelectionScreen(function (year) {
  return year + 2 - year % 3;
});
/**
 * Navigate to back 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageUpFromYear = adjustYearSelectionScreen(function (year) {
  return year - YEAR_CHUNK;
});
/**
 * Navigate forward 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */

var handlePageDownFromYear = adjustYearSelectionScreen(function (year) {
  return year + YEAR_CHUNK;
});
/**
 * update the focus on a year when the mouse moves.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} dateEl A year element within the date picker component
 */

var handleMouseoverFromYear = function handleMouseoverFromYear(yearEl) {
  if (yearEl.disabled) return;
  if (yearEl.classList.contains(CALENDAR_YEAR_FOCUSED_CLASS)) return;
  var focusYear = parseInt(yearEl.dataset.value, 10);
  var newCalendar = displayYearSelection(yearEl, focusYear);
  newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
}; // #endregion Calendar Year Event Handling
// #region Focus Handling Event Handling


var tabHandler = function tabHandler(focusable) {
  var getFocusableContext = function getFocusableContext(el) {
    var _getDatePickerContext26 = getDatePickerContext(el),
        calendarEl = _getDatePickerContext26.calendarEl;

    var focusableElements = select(focusable, calendarEl);
    var firstTabIndex = 0;
    var lastTabIndex = focusableElements.length - 1;
    var firstTabStop = focusableElements[firstTabIndex];
    var lastTabStop = focusableElements[lastTabIndex];
    var focusIndex = focusableElements.indexOf(activeElement());
    var isLastTab = focusIndex === lastTabIndex;
    var isFirstTab = focusIndex === firstTabIndex;
    var isNotFound = focusIndex === -1;
    return {
      focusableElements: focusableElements,
      isNotFound: isNotFound,
      firstTabStop: firstTabStop,
      isFirstTab: isFirstTab,
      lastTabStop: lastTabStop,
      isLastTab: isLastTab
    };
  };

  return {
    tabAhead: function tabAhead(event) {
      var _getFocusableContext = getFocusableContext(event.target),
          firstTabStop = _getFocusableContext.firstTabStop,
          isLastTab = _getFocusableContext.isLastTab,
          isNotFound = _getFocusableContext.isNotFound;

      if (isLastTab || isNotFound) {
        event.preventDefault();
        firstTabStop.focus();
      }
    },
    tabBack: function tabBack(event) {
      var _getFocusableContext2 = getFocusableContext(event.target),
          lastTabStop = _getFocusableContext2.lastTabStop,
          isFirstTab = _getFocusableContext2.isFirstTab,
          isNotFound = _getFocusableContext2.isNotFound;

      if (isFirstTab || isNotFound) {
        event.preventDefault();
        lastTabStop.focus();
      }
    }
  };
};

var datePickerTabEventHandler = tabHandler(DATE_PICKER_FOCUSABLE);
var monthPickerTabEventHandler = tabHandler(MONTH_PICKER_FOCUSABLE);
var yearPickerTabEventHandler = tabHandler(YEAR_PICKER_FOCUSABLE); // #endregion Focus Handling Event Handling
// #region Date Picker Event Delegation Registration / Component

var datePickerEvents = (_datePickerEvents = {}, _defineProperty(_datePickerEvents, CLICK, (_CLICK = {}, _defineProperty(_CLICK, DATE_PICKER_BUTTON, function () {
  toggleCalendar(this);
}), _defineProperty(_CLICK, CALENDAR_DATE, function () {
  selectDate(this);
}), _defineProperty(_CLICK, CALENDAR_MONTH, function () {
  selectMonth(this);
}), _defineProperty(_CLICK, CALENDAR_YEAR, function () {
  selectYear(this);
}), _defineProperty(_CLICK, CALENDAR_PREVIOUS_MONTH, function () {
  displayPreviousMonth(this);
}), _defineProperty(_CLICK, CALENDAR_NEXT_MONTH, function () {
  displayNextMonth(this);
}), _defineProperty(_CLICK, CALENDAR_PREVIOUS_YEAR, function () {
  displayPreviousYear(this);
}), _defineProperty(_CLICK, CALENDAR_NEXT_YEAR, function () {
  displayNextYear(this);
}), _defineProperty(_CLICK, CALENDAR_PREVIOUS_YEAR_CHUNK, function () {
  displayPreviousYearChunk(this);
}), _defineProperty(_CLICK, CALENDAR_NEXT_YEAR_CHUNK, function () {
  displayNextYearChunk(this);
}), _defineProperty(_CLICK, CALENDAR_MONTH_SELECTION, function () {
  var newCalendar = displayMonthSelection(this);
  newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
}), _defineProperty(_CLICK, CALENDAR_YEAR_SELECTION, function () {
  var newCalendar = displayYearSelection(this);
  newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
}), _CLICK)), _defineProperty(_datePickerEvents, "keyup", _defineProperty({}, DATE_PICKER_CALENDAR, function (event) {
  var keydown = this.dataset.keydownKeyCode;

  if ("".concat(event.keyCode) !== keydown) {
    event.preventDefault();
  }
})), _defineProperty(_datePickerEvents, "keydown", (_keydown = {}, _defineProperty(_keydown, DATE_PICKER_EXTERNAL_INPUT, function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    validateDateInput(this);
  }
}), _defineProperty(_keydown, CALENDAR_DATE, keymap({
  Up: handleUpFromDate,
  ArrowUp: handleUpFromDate,
  Down: handleDownFromDate,
  ArrowDown: handleDownFromDate,
  Left: handleLeftFromDate,
  ArrowLeft: handleLeftFromDate,
  Right: handleRightFromDate,
  ArrowRight: handleRightFromDate,
  Home: handleHomeFromDate,
  End: handleEndFromDate,
  PageDown: handlePageDownFromDate,
  PageUp: handlePageUpFromDate,
  "Shift+PageDown": handleShiftPageDownFromDate,
  "Shift+PageUp": handleShiftPageUpFromDate
})), _defineProperty(_keydown, CALENDAR_DATE_PICKER, keymap({
  Tab: datePickerTabEventHandler.tabAhead,
  "Shift+Tab": datePickerTabEventHandler.tabBack
})), _defineProperty(_keydown, CALENDAR_MONTH, keymap({
  Up: handleUpFromMonth,
  ArrowUp: handleUpFromMonth,
  Down: handleDownFromMonth,
  ArrowDown: handleDownFromMonth,
  Left: handleLeftFromMonth,
  ArrowLeft: handleLeftFromMonth,
  Right: handleRightFromMonth,
  ArrowRight: handleRightFromMonth,
  Home: handleHomeFromMonth,
  End: handleEndFromMonth,
  PageDown: handlePageDownFromMonth,
  PageUp: handlePageUpFromMonth
})), _defineProperty(_keydown, CALENDAR_MONTH_PICKER, keymap({
  Tab: monthPickerTabEventHandler.tabAhead,
  "Shift+Tab": monthPickerTabEventHandler.tabBack
})), _defineProperty(_keydown, CALENDAR_YEAR, keymap({
  Up: handleUpFromYear,
  ArrowUp: handleUpFromYear,
  Down: handleDownFromYear,
  ArrowDown: handleDownFromYear,
  Left: handleLeftFromYear,
  ArrowLeft: handleLeftFromYear,
  Right: handleRightFromYear,
  ArrowRight: handleRightFromYear,
  Home: handleHomeFromYear,
  End: handleEndFromYear,
  PageDown: handlePageDownFromYear,
  PageUp: handlePageUpFromYear
})), _defineProperty(_keydown, CALENDAR_YEAR_PICKER, keymap({
  Tab: yearPickerTabEventHandler.tabAhead,
  "Shift+Tab": yearPickerTabEventHandler.tabBack
})), _defineProperty(_keydown, DATE_PICKER_CALENDAR, function (event) {
  this.dataset.keydownKeyCode = event.keyCode;
}), _defineProperty(_keydown, DATE_PICKER, function (event) {
  var keyMap = keymap({
    Escape: handleEscapeFromCalendar
  });
  keyMap(event);
}), _keydown)), _defineProperty(_datePickerEvents, "focusout", (_focusout = {}, _defineProperty(_focusout, DATE_PICKER_EXTERNAL_INPUT, function () {
  validateDateInput(this);
}), _defineProperty(_focusout, DATE_PICKER, function (event) {
  if (!this.contains(event.relatedTarget)) {
    hideCalendar(this);
  }
}), _focusout)), _defineProperty(_datePickerEvents, "input", _defineProperty({}, DATE_PICKER_EXTERNAL_INPUT, function () {
  reconcileInputValues(this);
  updateCalendarIfVisible(this);
})), _datePickerEvents);

if (!isIosDevice()) {
  var _datePickerEvents$mou;

  datePickerEvents.mouseover = (_datePickerEvents$mou = {}, _defineProperty(_datePickerEvents$mou, CALENDAR_DATE_CURRENT_MONTH, function () {
    handleMouseoverFromDate(this);
  }), _defineProperty(_datePickerEvents$mou, CALENDAR_MONTH, function () {
    handleMouseoverFromMonth(this);
  }), _defineProperty(_datePickerEvents$mou, CALENDAR_YEAR, function () {
    handleMouseoverFromYear(this);
  }), _datePickerEvents$mou);
}

var datePicker = behavior(datePickerEvents, {
  init: function init(root) {
    select(DATE_PICKER, root).forEach(function (datePickerEl) {
      enhanceDatePicker(datePickerEl);
    });
  },
  getDatePickerContext: getDatePickerContext,
  disable: disable,
  enable: enable,
  isDateInputInvalid: isDateInputInvalid,
  setCalendarValue: setCalendarValue,
  validateDateInput: validateDateInput,
  renderCalendar: renderCalendar,
  updateCalendarIfVisible: updateCalendarIfVisible
}); // #endregion Date Picker Event Delegation Registration / Component

module.exports = datePicker;

},{"../config":34,"../events":35,"../utils/active-element":42,"../utils/behavior":43,"../utils/is-ios-device":46,"../utils/select":48,"receptor/keymap":12}],20:[function(require,module,exports){
"use strict";

var _inputChange;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../config"),
    PREFIX = _require.prefix;

var _require2 = require("./date-picker"),
    getDatePickerContext = _require2.getDatePickerContext,
    isDateInputInvalid = _require2.isDateInputInvalid,
    updateCalendarIfVisible = _require2.updateCalendarIfVisible;

var DATE_PICKER_CLASS = "".concat(PREFIX, "-date-picker");
var DATE_RANGE_PICKER_CLASS = "".concat(PREFIX, "-date-range-picker");
var DATE_RANGE_PICKER_RANGE_START_CLASS = "".concat(DATE_RANGE_PICKER_CLASS, "__range-start");
var DATE_RANGE_PICKER_RANGE_END_CLASS = "".concat(DATE_RANGE_PICKER_CLASS, "__range-end");
var DATE_PICKER = ".".concat(DATE_PICKER_CLASS);
var DATE_RANGE_PICKER = ".".concat(DATE_RANGE_PICKER_CLASS);
var DATE_RANGE_PICKER_RANGE_START = ".".concat(DATE_RANGE_PICKER_RANGE_START_CLASS);
var DATE_RANGE_PICKER_RANGE_END = ".".concat(DATE_RANGE_PICKER_RANGE_END_CLASS);
var DEFAULT_MIN_DATE = "0000-01-01";
/**
 * The properties and elements within the date range picker.
 * @typedef {Object} DateRangePickerContext
 * @property {HTMLElement} dateRangePickerEl
 * @property {HTMLElement} rangeStartEl
 * @property {HTMLElement} rangeEndEl
 */

/**
 * Get an object of the properties and elements belonging directly to the given
 * date picker component.
 *
 * @param {HTMLElement} el the element within the date picker
 * @returns {DateRangePickerContext} elements
 */

var getDateRangePickerContext = function getDateRangePickerContext(el) {
  var dateRangePickerEl = el.closest(DATE_RANGE_PICKER);

  if (!dateRangePickerEl) {
    throw new Error("Element is missing outer ".concat(DATE_RANGE_PICKER));
  }

  var rangeStartEl = dateRangePickerEl.querySelector(DATE_RANGE_PICKER_RANGE_START);
  var rangeEndEl = dateRangePickerEl.querySelector(DATE_RANGE_PICKER_RANGE_END);
  return {
    dateRangePickerEl: dateRangePickerEl,
    rangeStartEl: rangeStartEl,
    rangeEndEl: rangeEndEl
  };
};
/**
 * handle update from range start date picker
 *
 * @param {HTMLElement} el an element within the date range picker
 */


var handleRangeStartUpdate = function handleRangeStartUpdate(el) {
  var _getDateRangePickerCo = getDateRangePickerContext(el),
      dateRangePickerEl = _getDateRangePickerCo.dateRangePickerEl,
      rangeStartEl = _getDateRangePickerCo.rangeStartEl,
      rangeEndEl = _getDateRangePickerCo.rangeEndEl;

  var _getDatePickerContext = getDatePickerContext(rangeStartEl),
      internalInputEl = _getDatePickerContext.internalInputEl;

  var updatedDate = internalInputEl.value;

  if (updatedDate && !isDateInputInvalid(internalInputEl)) {
    rangeEndEl.dataset.minDate = updatedDate;
    rangeEndEl.dataset.rangeDate = updatedDate;
    rangeEndEl.dataset.defaultDate = updatedDate;
  } else {
    rangeEndEl.dataset.minDate = dateRangePickerEl.dataset.minDate || "";
    rangeEndEl.dataset.rangeDate = "";
    rangeEndEl.dataset.defaultDate = "";
  }

  updateCalendarIfVisible(rangeEndEl);
};
/**
 * handle update from range start date picker
 *
 * @param {HTMLElement} el an element within the date range picker
 */


var handleRangeEndUpdate = function handleRangeEndUpdate(el) {
  var _getDateRangePickerCo2 = getDateRangePickerContext(el),
      dateRangePickerEl = _getDateRangePickerCo2.dateRangePickerEl,
      rangeStartEl = _getDateRangePickerCo2.rangeStartEl,
      rangeEndEl = _getDateRangePickerCo2.rangeEndEl;

  var _getDatePickerContext2 = getDatePickerContext(rangeEndEl),
      internalInputEl = _getDatePickerContext2.internalInputEl;

  var updatedDate = internalInputEl.value;

  if (updatedDate && !isDateInputInvalid(internalInputEl)) {
    rangeStartEl.dataset.maxDate = updatedDate;
    rangeStartEl.dataset.rangeDate = updatedDate;
    rangeStartEl.dataset.defaultDate = updatedDate;
  } else {
    rangeStartEl.dataset.maxDate = dateRangePickerEl.dataset.maxDate || "";
    rangeStartEl.dataset.rangeDate = "";
    rangeStartEl.dataset.defaultDate = "";
  }

  updateCalendarIfVisible(rangeStartEl);
};
/**
 * Enhance an input with the date picker elements
 *
 * @param {HTMLElement} el The initial wrapping element of the date range picker component
 */


var enhanceDateRangePicker = function enhanceDateRangePicker(el) {
  var dateRangePickerEl = el.closest(DATE_RANGE_PICKER);

  var _select = select(DATE_PICKER, dateRangePickerEl),
      _select2 = _slicedToArray(_select, 2),
      rangeStart = _select2[0],
      rangeEnd = _select2[1];

  if (!rangeStart) {
    throw new Error("".concat(DATE_RANGE_PICKER, " is missing inner two '").concat(DATE_PICKER, "' elements"));
  }

  if (!rangeEnd) {
    throw new Error("".concat(DATE_RANGE_PICKER, " is missing second '").concat(DATE_PICKER, "' element"));
  }

  rangeStart.classList.add(DATE_RANGE_PICKER_RANGE_START_CLASS);
  rangeEnd.classList.add(DATE_RANGE_PICKER_RANGE_END_CLASS);

  if (!dateRangePickerEl.dataset.minDate) {
    dateRangePickerEl.dataset.minDate = DEFAULT_MIN_DATE;
  }

  var minDate = dateRangePickerEl.dataset.minDate;
  rangeStart.dataset.minDate = minDate;
  rangeEnd.dataset.minDate = minDate;
  var maxDate = dateRangePickerEl.dataset.maxDate;

  if (maxDate) {
    rangeStart.dataset.maxDate = maxDate;
    rangeEnd.dataset.maxDate = maxDate;
  }

  handleRangeStartUpdate(dateRangePickerEl);
  handleRangeEndUpdate(dateRangePickerEl);
};

var dateRangePicker = behavior({
  "input change": (_inputChange = {}, _defineProperty(_inputChange, DATE_RANGE_PICKER_RANGE_START, function () {
    handleRangeStartUpdate(this);
  }), _defineProperty(_inputChange, DATE_RANGE_PICKER_RANGE_END, function () {
    handleRangeEndUpdate(this);
  }), _inputChange)
}, {
  init: function init(root) {
    select(DATE_RANGE_PICKER, root).forEach(function (dateRangePickerEl) {
      enhanceDateRangePicker(dateRangePickerEl);
    });
  }
});
module.exports = dateRangePicker;

},{"../config":34,"../utils/behavior":43,"../utils/select":48,"./date-picker":19}],21:[function(require,module,exports){
"use strict";

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var _require = require("../config"),
    PREFIX = _require.prefix;

var DROPZONE_CLASS = "".concat(PREFIX, "-file-input");
var DROPZONE = ".".concat(DROPZONE_CLASS);
var INPUT_CLASS = "".concat(PREFIX, "-file-input__input");
var TARGET_CLASS = "".concat(PREFIX, "-file-input__target");
var INPUT = ".".concat(INPUT_CLASS);
var BOX_CLASS = "".concat(PREFIX, "-file-input__box");
var INSTRUCTIONS_CLASS = "".concat(PREFIX, "-file-input__instructions");
var PREVIEW_CLASS = "".concat(PREFIX, "-file-input__preview");
var PREVIEW_HEADING_CLASS = "".concat(PREFIX, "-file-input__preview-heading");
var DISABLED_CLASS = "".concat(PREFIX, "-file-input--disabled");
var CHOOSE_CLASS = "".concat(PREFIX, "-file-input__choose");
var ACCEPTED_FILE_MESSAGE_CLASS = "".concat(PREFIX, "-file-input__accepted-files-message");
var DRAG_TEXT_CLASS = "".concat(PREFIX, "-file-input__drag-text");
var DRAG_CLASS = "".concat(PREFIX, "-file-input--drag");
var LOADING_CLASS = "is-loading";
var HIDDEN_CLASS = "display-none";
var INVALID_FILE_CLASS = "has-invalid-file";
var GENERIC_PREVIEW_CLASS_NAME = "".concat(PREFIX, "-file-input__preview-image");
var GENERIC_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--generic");
var PDF_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--pdf");
var WORD_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--word");
var VIDEO_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--video");
var EXCEL_PREVIEW_CLASS = "".concat(GENERIC_PREVIEW_CLASS_NAME, "--excel");
var SPACER_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var TYPE_IS_VALID = Boolean(true); // logic gate for change listener

/**
 * The properties and elements within the file input.
 * @typedef {Object} FileInputContext
 * @property {HTMLDivElement} dropZoneEl
 * @property {HTMLInputElement} inputEl
 */

/**
 * Get an object of the properties and elements belonging directly to the given
 * file input component.
 *
 * @param {HTMLElement} el the element within the file input
 * @returns {FileInputContext} elements
 */

var getFileInputContext = function getFileInputContext(el) {
  var dropZoneEl = el.closest(DROPZONE);

  if (!dropZoneEl) {
    throw new Error("Element is missing outer ".concat(DROPZONE));
  }

  var inputEl = dropZoneEl.querySelector(INPUT);
  return {
    dropZoneEl: dropZoneEl,
    inputEl: inputEl
  };
};
/**
 * Disable the file input component
 *
 * @param {HTMLElement} el An element within the file input component
 */


var disable = function disable(el) {
  var _getFileInputContext = getFileInputContext(el),
      dropZoneEl = _getFileInputContext.dropZoneEl,
      inputEl = _getFileInputContext.inputEl;

  inputEl.disabled = true;
  dropZoneEl.classList.add(DISABLED_CLASS);
  dropZoneEl.setAttribute("aria-disabled", "true");
};
/**
 * Enable the file input component
 *
 * @param {HTMLElement} el An element within the file input component
 */


var enable = function enable(el) {
  var _getFileInputContext2 = getFileInputContext(el),
      dropZoneEl = _getFileInputContext2.dropZoneEl,
      inputEl = _getFileInputContext2.inputEl;

  inputEl.disabled = false;
  dropZoneEl.classList.remove(DISABLED_CLASS);
  dropZoneEl.removeAttribute("aria-disabled");
};
/**
 *
 * @param {String} s special characters
 * @returns {String} replaces specefied values
 */


var replaceName = function replaceName(s) {
  var c = s.charCodeAt(0);
  if (c === 32) return "-";
  if (c >= 65 && c <= 90) return "img_".concat(s.toLowerCase());
  return "__".concat(("000", c.toString(16)).slice(-4));
};
/**
 * Creates an ID name for each file that strips all invalid characters.
 * @param {String} name - name of the file added to file input (searchvalue)
 * @returns {String} same characters as the name with invalid chars removed (newvalue)
 */


var makeSafeForID = function makeSafeForID(name) {
  return name.replace(/[^a-z0-9]/g, replaceName);
};
/**
 * Builds full file input comonent
 * @param {HTMLElement} fileInputEl - original file input on page
 * @returns {HTMLElement|HTMLElement} - Instructions, target area div
 */


var buildFileInput = function buildFileInput(fileInputEl) {
  var acceptsMultiple = fileInputEl.hasAttribute("multiple");
  var fileInputParent = document.createElement("div");
  var dropTarget = document.createElement("div");
  var box = document.createElement("div");
  var instructions = document.createElement("div");
  var disabled = fileInputEl.hasAttribute("disabled"); // Adds class names and other attributes

  fileInputEl.classList.remove(DROPZONE_CLASS);
  fileInputEl.classList.add(INPUT_CLASS);
  fileInputParent.classList.add(DROPZONE_CLASS);
  box.classList.add(BOX_CLASS);
  instructions.classList.add(INSTRUCTIONS_CLASS);
  instructions.setAttribute("aria-hidden", "true");
  dropTarget.classList.add(TARGET_CLASS); // Adds child elements to the DOM

  fileInputEl.parentNode.insertBefore(dropTarget, fileInputEl);
  fileInputEl.parentNode.insertBefore(fileInputParent, dropTarget);
  dropTarget.appendChild(fileInputEl);
  fileInputParent.appendChild(dropTarget);
  fileInputEl.parentNode.insertBefore(instructions, fileInputEl);
  fileInputEl.parentNode.insertBefore(box, fileInputEl); // Disabled styling

  if (disabled) {
    disable(fileInputEl);
  } // Sets instruction test based on whether or not multiple files are accepted


  if (acceptsMultiple) {
    instructions.innerHTML = "<span class=\"".concat(DRAG_TEXT_CLASS, "\">Drag files here or </span><span class=\"").concat(CHOOSE_CLASS, "\">choose from folder</span>");
  } else {
    instructions.innerHTML = "<span class=\"".concat(DRAG_TEXT_CLASS, "\">Drag file here or </span><span class=\"").concat(CHOOSE_CLASS, "\">choose from folder</span>");
  } // IE11 and Edge do not support drop files on file inputs, so we've removed text that indicates that


  if (/rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    fileInputParent.querySelector(".".concat(DRAG_TEXT_CLASS)).outerHTML = "";
  }

  return {
    instructions: instructions,
    dropTarget: dropTarget
  };
};
/**
 * Removes image previews, we want to start with a clean list every time files are added to the file input
 * @param {HTMLElement} dropTarget - target area div that encases the input
 * @param {HTMLElement} instructions - text to inform users to drag or select files
 */


var removeOldPreviews = function removeOldPreviews(dropTarget, instructions) {
  var filePreviews = dropTarget.querySelectorAll(".".concat(PREVIEW_CLASS));
  var currentPreviewHeading = dropTarget.querySelector(".".concat(PREVIEW_HEADING_CLASS));
  var currentErrorMessage = dropTarget.querySelector(".".concat(ACCEPTED_FILE_MESSAGE_CLASS));
  /**
   * finds the parent of the passed node and removes the child
   * @param {HTMLElement} node
   */

  var removeImages = function removeImages(node) {
    node.parentNode.removeChild(node);
  }; // Remove the heading above the previews


  if (currentPreviewHeading) {
    currentPreviewHeading.outerHTML = "";
  } // Remove existing error messages


  if (currentErrorMessage) {
    currentErrorMessage.outerHTML = "";
    dropTarget.classList.remove(INVALID_FILE_CLASS);
  } // Get rid of existing previews if they exist, show instructions


  if (filePreviews !== null) {
    if (instructions) {
      instructions.classList.remove(HIDDEN_CLASS);
    }

    Array.prototype.forEach.call(filePreviews, removeImages);
  }
};
/**
 * When new files are applied to file input, this function generates previews
 * and removes old ones.
 * @param {event} e
 * @param {HTMLElement} fileInputEl - file input element
 * @param {HTMLElement} instructions - text to inform users to drag or select files
 * @param {HTMLElement} dropTarget - target area div that encases the input
 */


var handleChange = function handleChange(e, fileInputEl, instructions, dropTarget) {
  var fileNames = e.target.files;
  var filePreviewsHeading = document.createElement("div"); // First, get rid of existing previews

  removeOldPreviews(dropTarget, instructions); // Iterates through files list and creates previews

  var _loop = function _loop(i) {
    var reader = new FileReader();
    var fileName = fileNames[i].name; // Starts with a loading image while preview is created

    reader.onloadstart = function createLoadingImage() {
      var imageId = makeSafeForID(fileName);
      var previewImage = "<img id=\"".concat(imageId, "\" src=\"").concat(SPACER_GIF, "\" alt=\"\" class=\"").concat(GENERIC_PREVIEW_CLASS_NAME, " ").concat(LOADING_CLASS, "\"/>");
      instructions.insertAdjacentHTML("afterend", "<div class=\"".concat(PREVIEW_CLASS, "\" aria-hidden=\"true\">").concat(previewImage).concat(fileName, "<div>"));
    }; // Not all files will be able to generate previews. In case this happens, we provide several types "generic previews" based on the file extension.


    reader.onloadend = function createFilePreview() {
      var imageId = makeSafeForID(fileName);
      var previewImage = document.getElementById(imageId);

      if (fileName.indexOf(".pdf") > 0) {
        previewImage.setAttribute("onerror", "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(PDF_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf(".doc") > 0 || fileName.indexOf(".pages") > 0) {
        previewImage.setAttribute("onerror", "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(WORD_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf(".xls") > 0 || fileName.indexOf(".numbers") > 0) {
        previewImage.setAttribute("onerror", "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(EXCEL_PREVIEW_CLASS, "\")"));
      } else if (fileName.indexOf(".mov") > 0 || fileName.indexOf(".mp4") > 0) {
        previewImage.setAttribute("onerror", "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(VIDEO_PREVIEW_CLASS, "\")"));
      } else {
        previewImage.setAttribute("onerror", "this.onerror=null;this.src=\"".concat(SPACER_GIF, "\"; this.classList.add(\"").concat(GENERIC_PREVIEW_CLASS, "\")"));
      } // Removes loader and displays preview


      previewImage.classList.remove(LOADING_CLASS);
      previewImage.src = reader.result;
    };

    if (fileNames[i]) {
      reader.readAsDataURL(fileNames[i]);
    } // Adds heading above file previews, pluralizes if there are multiple


    if (i === 0) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = "Selected file <span class=\"usa-file-input__choose\">Change file</span>";
    } else if (i >= 1) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = "".concat(i + 1, " files selected <span class=\"usa-file-input__choose\">Change files</span>");
    } // Hides null state content and sets preview heading class


    if (filePreviewsHeading) {
      instructions.classList.add(HIDDEN_CLASS);
      filePreviewsHeading.classList.add(PREVIEW_HEADING_CLASS);
    }
  };

  for (var i = 0; i < fileNames.length; i += 1) {
    _loop(i);
  }
};
/**
 * When using an Accept attribute, invalid files will be hidden from
 * file browser, but they can still be dragged to the input. This
 * function prevents them from being dragged and removes error states
 * when correct files are added.
 * @param {event} e
 * @param {HTMLElement} fileInputEl - file input element
 * @param {HTMLElement} instructions - text to inform users to drag or select files
 * @param {HTMLElement} dropTarget - target area div that encases the input
 */


var preventInvalidFiles = function preventInvalidFiles(e, fileInputEl, instructions, dropTarget) {
  var acceptedFilesAttr = fileInputEl.getAttribute("accept");
  dropTarget.classList.remove(INVALID_FILE_CLASS);
  /**
   * We can probably move away from this once IE11 support stops, and replace
   * with a simple es `.includes`
   * check if element is in array
   * check if 1 or more alphabets are in string
   * if element is present return the position value and -1 otherwise
   * @param {Object} file
   * @param {String} value
   * @returns {Boolean}
   */

  var isIncluded = function isIncluded(file, value) {
    var returnValue = false;
    var pos = file.indexOf(value);

    if (pos >= 0) {
      returnValue = true;
    }

    return returnValue;
  }; // Runs if only specific files are accepted


  if (acceptedFilesAttr) {
    var acceptedFiles = acceptedFilesAttr.split(",");
    var errorMessage = document.createElement("div"); // If multiple files are dragged, this iterates through them and look for any files that are not accepted.

    var allFilesAllowed = true;
    var scannedFiles = e.target.files || e.dataTransfer.files;

    for (var i = 0; i < scannedFiles.length; i += 1) {
      var file = scannedFiles[i];

      if (allFilesAllowed) {
        for (var j = 0; j < acceptedFiles.length; j += 1) {
          var fileType = acceptedFiles[j];
          allFilesAllowed = file.name.indexOf(fileType) > 0 || isIncluded(file.type, fileType.replace(/\*/g, ""));

          if (allFilesAllowed) {
            TYPE_IS_VALID = true;
            break;
          }
        }
      } else break;
    } // If dragged files are not accepted, this removes them from the value of the input and creates and error state


    if (!allFilesAllowed) {
      removeOldPreviews(dropTarget, instructions);
      fileInputEl.value = ""; // eslint-disable-line no-param-reassign

      dropTarget.insertBefore(errorMessage, fileInputEl);
      errorMessage.innerHTML = "This is not a valid file type.";
      errorMessage.classList.add(ACCEPTED_FILE_MESSAGE_CLASS);
      dropTarget.classList.add(INVALID_FILE_CLASS);
      TYPE_IS_VALID = false;
      e.preventDefault();
      e.stopPropagation();
    }
  }
};
/**
 * 1. passes through gate for preventing invalid files
 * 2. handles updates if file is valid
 * @param {event} event
 * @param {HTMLElement} element
 * @param {HTMLElement} instructionsEl
 * @param {HTMLElement} target
 */


var handleUpload = function handleUpload(event, element, instructionsEl, dropTargetEl) {
  preventInvalidFiles(event, element, instructionsEl, dropTargetEl);

  if (TYPE_IS_VALID === true) {
    handleChange(event, element, instructionsEl, dropTargetEl);
  }
};

var fileInput = behavior({}, {
  init: function init(root) {
    select(DROPZONE, root).forEach(function (fileInputEl) {
      var _buildFileInput = buildFileInput(fileInputEl),
          instructions = _buildFileInput.instructions,
          dropTarget = _buildFileInput.dropTarget;

      dropTarget.addEventListener("dragover", function handleDragOver() {
        this.classList.add(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener("dragleave", function handleDragLeave() {
        this.classList.remove(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener("drop", function handleDrop() {
        this.classList.remove(DRAG_CLASS);
      }, false);
      fileInputEl.addEventListener("change", function (e) {
        return handleUpload(e, fileInputEl, instructions, dropTarget);
      }, false);
    });
  },
  getFileInputContext: getFileInputContext,
  disable: disable,
  enable: enable
});
module.exports = fileInput;

},{"../config":34,"../utils/behavior":43,"../utils/select":48}],22:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var HIDDEN = "hidden";
var SCOPE = ".".concat(PREFIX, "-footer--big");
var NAV = "".concat(SCOPE, " nav");
var BUTTON = "".concat(NAV, " .").concat(PREFIX, "-footer__primary-link");
var COLLAPSIBLE = ".".concat(PREFIX, "-footer__primary-content--collapsible");
var HIDE_MAX_WIDTH = 480;

function showPanel() {
  if (window.innerWidth < HIDE_MAX_WIDTH) {
    var collapseEl = this.closest(COLLAPSIBLE);
    collapseEl.classList.toggle(HIDDEN); // NB: this *should* always succeed because the button
    // selector is scoped to ".{prefix}-footer-big nav"

    var collapsibleEls = select(COLLAPSIBLE, collapseEl.closest(NAV));
    collapsibleEls.forEach(function (el) {
      if (el !== collapseEl) {
        el.classList.add(HIDDEN);
      }
    });
  }
}

var toggleHidden = function toggleHidden(isHidden) {
  return select(COLLAPSIBLE).forEach(function (list) {
    return list.classList.toggle(HIDDEN, isHidden);
  });
};

var resize = function resize(event) {
  return toggleHidden(event.matches);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showPanel)), {
  // export for use elsewhere
  HIDE_MAX_WIDTH: HIDE_MAX_WIDTH,
  init: function init() {
    toggleHidden(window.innerWidth < HIDE_MAX_WIDTH);
    this.mediaQueryList = window.matchMedia("(max-width: ".concat(HIDE_MAX_WIDTH, "px)"));
    this.mediaQueryList.addListener(resize);
  },
  teardown: function teardown() {
    this.mediaQueryList.removeListener(resize);
  }
});

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/select":48}],23:[function(require,module,exports){
"use strict";

var accordion = require("./accordion");

var banner = require("./banner");

var characterCount = require("./character-count");

var comboBox = require("./combo-box");

var fileInput = require("./file-input");

var footer = require("./footer");

var inputPrefixSuffix = require("./input-prefix-suffix");

var modal = require("./modal");

var navigation = require("./navigation");

var password = require("./password");

var search = require("./search");

var skipnav = require("./skipnav");

var tooltip = require("./tooltip");

var validator = require("./validator");

var datePicker = require("./date-picker");

var dateRangePicker = require("./date-range-picker");

var timePicker = require("./time-picker");

var table = require("./table");

module.exports = {
  accordion: accordion,
  banner: banner,
  characterCount: characterCount,
  comboBox: comboBox,
  datePicker: datePicker,
  dateRangePicker: dateRangePicker,
  fileInput: fileInput,
  footer: footer,
  inputPrefixSuffix: inputPrefixSuffix,
  modal: modal,
  navigation: navigation,
  password: password,
  search: search,
  skipnav: skipnav,
  table: table,
  timePicker: timePicker,
  tooltip: tooltip,
  validator: validator
};

},{"./accordion":15,"./banner":16,"./character-count":17,"./combo-box":18,"./date-picker":19,"./date-range-picker":20,"./file-input":21,"./footer":22,"./input-prefix-suffix":24,"./modal":25,"./navigation":26,"./password":27,"./search":28,"./skipnav":29,"./table":30,"./time-picker":31,"./tooltip":32,"./validator":33}],24:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../config"),
    PREFIX = _require.prefix;

var _require2 = require("../events"),
    CLICK = _require2.CLICK;

var CONTAINER = ".".concat(PREFIX, "-input-group");
var INPUT = "".concat(CONTAINER, " .").concat(PREFIX, "-input");
var DECORATION = "".concat(CONTAINER, " .").concat(PREFIX, "-input-prefix, ").concat(CONTAINER, " .").concat(PREFIX, "-input-suffix");
var FOCUS_CLASS = "is-focused";

function setFocus(el) {
  el.closest(CONTAINER).querySelector(".".concat(PREFIX, "-input")).focus();
}

function handleFocus() {
  this.closest(CONTAINER).classList.add(FOCUS_CLASS);
}

function handleBlur() {
  this.closest(CONTAINER).classList.remove(FOCUS_CLASS);
}

var inputPrefixSuffix = behavior(_defineProperty({}, CLICK, _defineProperty({}, DECORATION, function () {
  setFocus(this);
})), {
  init: function init(root) {
    select(INPUT, root).forEach(function (inputEl) {
      inputEl.addEventListener("focus", handleFocus, false);
      inputEl.addEventListener("blur", handleBlur, false);
    });
  }
});
module.exports = inputPrefixSuffix;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/select":48}],25:[function(require,module,exports){
"use strict";

var _CLICK;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var FocusTrap = require("../utils/focus-trap");

var ScrollBarWidth = require("../utils/scrollbar-width");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var MODAL_CLASSNAME = "".concat(PREFIX, "-modal");
var OVERLAY_CLASSNAME = "".concat(MODAL_CLASSNAME, "-overlay");
var WRAPPER_CLASSNAME = "".concat(MODAL_CLASSNAME, "-wrapper");
var OPENER_ATTRIBUTE = "data-open-modal";
var CLOSER_ATTRIBUTE = "data-close-modal";
var FORCE_ACTION_ATTRIBUTE = "data-force-action";
var NON_MODAL_HIDDEN_ATTRIBUTE = "data-modal-hidden";
var MODAL = ".".concat(MODAL_CLASSNAME);
var INITIAL_FOCUS = ".".concat(WRAPPER_CLASSNAME, " *[data-focus]");
var CLOSE_BUTTON = "".concat(WRAPPER_CLASSNAME, " *[").concat(CLOSER_ATTRIBUTE, "]");
var OPENERS = "*[".concat(OPENER_ATTRIBUTE, "][aria-controls]");
var CLOSERS = "".concat(CLOSE_BUTTON, ", .").concat(OVERLAY_CLASSNAME, ":not([").concat(FORCE_ACTION_ATTRIBUTE, "])");
var NON_MODALS = "body > *:not(.".concat(WRAPPER_CLASSNAME, "):not([aria-hidden])");
var NON_MODALS_HIDDEN = "[".concat(NON_MODAL_HIDDEN_ATTRIBUTE, "]");
var ACTIVE_CLASS = "usa-js-modal--active";
var PREVENT_CLICK_CLASS = "usa-js-no-click";
var VISIBLE_CLASS = "is-visible";
var HIDDEN_CLASS = "is-hidden";
var modal;

var isActive = function isActive() {
  return document.body.classList.contains(ACTIVE_CLASS);
};

var SCROLLBAR_WIDTH = ScrollBarWidth();
var INITIAL_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
var TEMPORARY_PADDING = "".concat(parseInt(INITIAL_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10), "px");
/**
 *  Is bound to escape key, closes modal when
 */

var onMenuClose = function onMenuClose() {
  modal.toggleModal.call(modal, false);
};
/**
 *  Toggle the visibility of a modal window
 *
 * @param {KeyboardEvent} event the keydown event
 * @returns {boolean} safeActive if mobile is open
 */


function toggleModal(event) {
  var originalOpener;
  var clickedElement = event.target;
  var _document = document,
      body = _document.body;
  var safeActive = !isActive();
  var modalId = clickedElement ? clickedElement.getAttribute("aria-controls") : document.querySelector(".usa-modal-wrapper.is-visible");
  var targetModal = safeActive ? document.getElementById(modalId) : document.querySelector(".usa-modal-wrapper.is-visible"); // if there is no modal we return early

  if (!targetModal) {
    return false;
  }

  var openFocusEl = targetModal.querySelector(INITIAL_FOCUS) ? targetModal.querySelector(INITIAL_FOCUS) : targetModal.querySelector(".usa-modal");
  var returnFocus = document.getElementById(targetModal.getAttribute("data-opener"));
  var menuButton = body.querySelector(OPENERS);
  var forceUserAction = targetModal.getAttribute(FORCE_ACTION_ATTRIBUTE); // Sets the clicked element to the close button
  // so esc key always closes modal

  if (event.type === "keydown" && targetModal !== null) {
    clickedElement = targetModal.querySelector(CLOSE_BUTTON);
  } // When we're not hitting the escape key…


  if (clickedElement) {
    // Make sure we click the opener
    // If it doesn't have an ID, make one
    // Store id as data attribute on modal
    if (clickedElement.hasAttribute(OPENER_ATTRIBUTE)) {
      if (this.getAttribute("id") === null) {
        originalOpener = "modal-".concat(Math.floor(Math.random() * 900000) + 100000);
        this.setAttribute("id", originalOpener);
      } else {
        originalOpener = this.getAttribute("id");
      }

      targetModal.setAttribute("data-opener", originalOpener);
    } // This basically stops the propagation if the element
    // is inside the modal and not a close button or
    // element inside a close button


    if (clickedElement.closest(".".concat(MODAL_CLASSNAME))) {
      if (clickedElement.hasAttribute(CLOSER_ATTRIBUTE) || clickedElement.closest("[".concat(CLOSER_ATTRIBUTE, "]"))) {// do nothing. move on.
      } else {
        event.stopPropagation();
        return false;
      }
    }
  }

  body.classList.toggle(ACTIVE_CLASS, safeActive);
  targetModal.classList.toggle(VISIBLE_CLASS, safeActive);
  targetModal.classList.toggle(HIDDEN_CLASS, !safeActive); // If user is forced to take an action, adding
  // a class to the body that prevents clicking underneath
  // overlay

  if (forceUserAction) {
    body.classList.toggle(PREVENT_CLICK_CLASS, safeActive);
  } // Account for content shifting from body overflow: hidden
  // We only check paddingRight in case apps are adding other properties
  // to the body element


  body.style.paddingRight = body.style.paddingRight === TEMPORARY_PADDING ? INITIAL_PADDING : TEMPORARY_PADDING; // Handle the focus actions

  if (safeActive && openFocusEl) {
    // The modal window is opened. Focus is set to close button.
    // Binds escape key if we're not forcing
    // the user to take an action
    if (forceUserAction) {
      modal.focusTrap = FocusTrap(targetModal);
    } else {
      modal.focusTrap = FocusTrap(targetModal, {
        Escape: onMenuClose
      });
    } // Handles focus setting and interactions


    modal.focusTrap.update(safeActive);
    openFocusEl.focus(); // Hides everything that is not the modal from screen readers

    document.querySelectorAll(NON_MODALS).forEach(function (nonModal) {
      nonModal.setAttribute("aria-hidden", "true");
      nonModal.setAttribute(NON_MODAL_HIDDEN_ATTRIBUTE, "");
    });
  } else if (!safeActive && menuButton && returnFocus) {
    // The modal window is closed.
    // Non-modals now accesible to screen reader
    document.querySelectorAll(NON_MODALS_HIDDEN).forEach(function (nonModal) {
      nonModal.removeAttribute("aria-hidden");
      nonModal.removeAttribute(NON_MODAL_HIDDEN_ATTRIBUTE);
    }); // Focus is returned to the opener

    returnFocus.focus();
    modal.focusTrap.update(safeActive);
  }

  return safeActive;
}
/**
 *  Builds modal window from base HTML
 *
 * @param {HTMLElement} baseComponent the modal html in the DOM
 */


var setUpAttributes = function setUpAttributes(baseComponent) {
  var modalContent = baseComponent;
  var modalWrapper = document.createElement("div");
  var overlayDiv = document.createElement("div");
  var modalID = baseComponent.getAttribute("id");
  var ariaLabelledBy = baseComponent.getAttribute("aria-labelledby");
  var ariaDescribedBy = baseComponent.getAttribute("aria-describedby");
  var forceUserAction = baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) ? baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) : false; // Rebuild the modal element

  modalContent.parentNode.insertBefore(modalWrapper, modalContent);
  modalWrapper.appendChild(modalContent);
  modalContent.parentNode.insertBefore(overlayDiv, modalContent);
  overlayDiv.appendChild(modalContent); // Add classes and attributes

  modalWrapper.classList.add(HIDDEN_CLASS);
  modalWrapper.classList.add(WRAPPER_CLASSNAME);
  overlayDiv.classList.add(OVERLAY_CLASSNAME); // Set attributes

  modalWrapper.setAttribute("role", "dialog");
  modalWrapper.setAttribute("id", modalID);

  if (ariaLabelledBy) {
    modalWrapper.setAttribute("aria-labelledby", ariaLabelledBy);
  }

  if (ariaDescribedBy) {
    modalWrapper.setAttribute("aria-describedby", ariaDescribedBy);
  }

  if (forceUserAction) {
    modalWrapper.setAttribute(FORCE_ACTION_ATTRIBUTE, "true");
  } // Update the base element HTML


  baseComponent.removeAttribute("id");
  baseComponent.removeAttribute("aria-labelledby");
  baseComponent.removeAttribute("aria-describedby");
  baseComponent.setAttribute("tabindex", "-1"); // Add aria-controls

  var modalClosers = modalWrapper.querySelectorAll(CLOSERS);
  select(modalClosers).forEach(function (el) {
    el.setAttribute("aria-controls", modalID);
  }); // Move all modals to the end of the DOM. Doing this allows us to
  // more easily find the elements to hide from screen readers
  // when the modal is open.

  document.body.appendChild(modalWrapper);
};

modal = behavior(_defineProperty({}, CLICK, (_CLICK = {}, _defineProperty(_CLICK, OPENERS, toggleModal), _defineProperty(_CLICK, CLOSERS, toggleModal), _CLICK)), {
  init: function init(root) {
    select(MODAL, root).forEach(function (modalWindow) {
      setUpAttributes(modalWindow);
    });
    select(OPENERS, root).forEach(function (item) {
      // Turn anchor links into buttons because of
      // VoiceOver on Safari
      if (item.nodeName === "A") {
        item.setAttribute("role", "button");
        item.addEventListener("click", function (e) {
          e.preventDefault();
        });
      } // Can uncomment when aria-haspopup="dialog" is supported
      // https://a11ysupport.io/tech/aria/aria-haspopup_attribute
      // Most screen readers support aria-haspopup, but might announce
      // as opening a menu if "dialog" is not supported.
      // item.setAttribute("aria-haspopup", "dialog");

    });
  },
  focusTrap: null,
  toggleModal: toggleModal
});
module.exports = modal;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/focus-trap":44,"../utils/scrollbar-width":47,"../utils/select":48}],26:[function(require,module,exports){
"use strict";

var _CLICK, _behavior;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keymap = require("receptor/keymap");

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var toggle = require("../utils/toggle");

var FocusTrap = require("../utils/focus-trap");

var accordion = require("./accordion");

var ScrollBarWidth = require("../utils/scrollbar-width");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var BODY = "body";
var NAV = ".".concat(PREFIX, "-nav");
var NAV_PRIMARY = ".".concat(PREFIX, "-nav__primary");
var NAV_PRIMARY_ITEM = ".".concat(PREFIX, "-nav__primary-item");
var NAV_CONTROL = "button.".concat(PREFIX, "-nav__link");
var NAV_LINKS = "".concat(NAV, " a");
var OPENERS = ".".concat(PREFIX, "-menu-btn");
var CLOSE_BUTTON = ".".concat(PREFIX, "-nav__close");
var OVERLAY = ".".concat(PREFIX, "-overlay");
var CLOSERS = "".concat(CLOSE_BUTTON, ", .").concat(PREFIX, "-overlay");
var TOGGLES = [NAV, OVERLAY].join(", ");
var ACTIVE_CLASS = "usa-js-mobile-nav--active";
var VISIBLE_CLASS = "is-visible";
var navigation;
var navActive;

var isActive = function isActive() {
  return document.body.classList.contains(ACTIVE_CLASS);
};

var SCROLLBAR_WIDTH = ScrollBarWidth();
var INITIAL_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
var TEMPORARY_PADDING = "".concat(parseInt(INITIAL_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10), "px");

var toggleNav = function toggleNav(active) {
  var _document = document,
      body = _document.body;
  var safeActive = typeof active === "boolean" ? active : !isActive();
  body.classList.toggle(ACTIVE_CLASS, safeActive);
  select(TOGGLES).forEach(function (el) {
    return el.classList.toggle(VISIBLE_CLASS, safeActive);
  });
  navigation.focusTrap.update(safeActive);
  var closeButton = body.querySelector(CLOSE_BUTTON);
  var menuButton = body.querySelector(OPENERS);
  body.style.paddingRight = body.style.paddingRight === TEMPORARY_PADDING ? INITIAL_PADDING : TEMPORARY_PADDING;

  if (safeActive && closeButton) {
    // The mobile nav was just activated, so focus on the close button,
    // which is just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!safeActive && document.activeElement === closeButton && menuButton) {
    // The mobile nav was just deactivated, and focus was on the close
    // button, which is no longer visible. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }

  return safeActive;
};

var resize = function resize() {
  var closer = document.body.querySelector(CLOSE_BUTTON);

  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // When the mobile nav is active, and the close box isn't visible,
    // we know the user's viewport has been resized to be larger.
    // Let's make the page state consistent by deactivating the mobile nav.
    navigation.toggleNav.call(closer, false);
  }
};

var onMenuClose = function onMenuClose() {
  return navigation.toggleNav.call(navigation, false);
};

var hideActiveNavDropdown = function hideActiveNavDropdown() {
  if (!navActive) {
    return;
  }

  toggle(navActive, false);
  navActive = null;
};

var focusNavButton = function focusNavButton(event) {
  var parentNavItem = event.target.closest(NAV_PRIMARY_ITEM); // Only shift focus if within dropdown

  if (!event.target.matches(NAV_CONTROL)) {
    parentNavItem.querySelector(NAV_CONTROL).focus();
  }
};

var handleEscape = function handleEscape(event) {
  hideActiveNavDropdown();
  focusNavButton(event);
};

navigation = behavior((_behavior = {}, _defineProperty(_behavior, CLICK, (_CLICK = {}, _defineProperty(_CLICK, NAV_CONTROL, function () {
  // If another nav is open, close it
  if (navActive !== this) {
    hideActiveNavDropdown();
  } // store a reference to the last clicked nav link element, so we
  // can hide the dropdown if another element on the page is clicked


  if (!navActive) {
    navActive = this;
    toggle(navActive, true);
  } // Do this so the event handler on the body doesn't fire


  return false;
}), _defineProperty(_CLICK, BODY, hideActiveNavDropdown), _defineProperty(_CLICK, OPENERS, toggleNav), _defineProperty(_CLICK, CLOSERS, toggleNav), _defineProperty(_CLICK, NAV_LINKS, function () {
  // A navigation link has been clicked! We want to collapse any
  // hierarchical navigation UI it's a part of, so that the user
  // can focus on whatever they've just selected.
  // Some navigation links are inside accordions; when they're
  // clicked, we want to collapse those accordions.
  var acc = this.closest(accordion.ACCORDION);

  if (acc) {
    accordion.getButtons(acc).forEach(function (btn) {
      return accordion.hide(btn);
    });
  } // If the mobile navigation menu is active, we want to hide it.


  if (isActive()) {
    navigation.toggleNav.call(navigation, false);
  }
}), _CLICK)), _defineProperty(_behavior, "keydown", _defineProperty({}, NAV_PRIMARY, keymap({
  Escape: handleEscape
}))), _defineProperty(_behavior, "focusout", _defineProperty({}, NAV_PRIMARY, function (event) {
  var nav = event.target.closest(NAV_PRIMARY);

  if (!nav.contains(event.relatedTarget)) {
    hideActiveNavDropdown();
  }
})), _behavior), {
  init: function init(root) {
    var trapContainer = root.querySelector(NAV);

    if (trapContainer) {
      navigation.focusTrap = FocusTrap(trapContainer, {
        Escape: onMenuClose
      });
    }

    resize();
    window.addEventListener("resize", resize, false);
  },
  teardown: function teardown() {
    window.removeEventListener("resize", resize, false);
    navActive = false;
  },
  focusTrap: null,
  toggleNav: toggleNav
});
module.exports = navigation;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/focus-trap":44,"../utils/scrollbar-width":47,"../utils/select":48,"../utils/toggle":51,"./accordion":15,"receptor/keymap":12}],27:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../utils/behavior");

var toggleFormInput = require("../utils/toggle-form-input");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var LINK = ".".concat(PREFIX, "-show-password, .").concat(PREFIX, "-show-multipassword");

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/toggle-form-input":50}],28:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ignore = require("receptor/ignore");

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../events"),
    CLICK = _require.CLICK;

var BUTTON = ".js-search-button";
var FORM = ".js-search-form";
var INPUT = "[type=search]";
var CONTEXT = "header"; // XXX

var lastButton;

var getForm = function getForm(button) {
  var context = button.closest(CONTEXT);
  return context ? context.querySelector(FORM) : document.querySelector(FORM);
};

var toggleSearch = function toggleSearch(button, active) {
  var form = getForm(button);

  if (!form) {
    throw new Error("No ".concat(FORM, " found for search toggle in ").concat(CONTEXT, "!"));
  }
  /* eslint-disable no-param-reassign */


  button.hidden = active;
  form.hidden = !active;
  /* eslint-enable */

  if (!active) {
    return;
  }

  var input = form.querySelector(INPUT);

  if (input) {
    input.focus();
  } // when the user clicks _outside_ of the form w/ignore(): hide the
  // search, then remove the listener


  var listener = ignore(form, function () {
    if (lastButton) {
      hideSearch.call(lastButton); // eslint-disable-line no-use-before-define
    }

    document.body.removeEventListener(CLICK, listener);
  }); // Normally we would just run this code without a timeout, but
  // IE11 and Edge will actually call the listener *immediately* because
  // they are currently handling this exact type of event, so we'll
  // make sure the browser is done handling the current click event,
  // if any, before we attach the listener.

  setTimeout(function () {
    document.body.addEventListener(CLICK, listener);
  }, 0);
};

function showSearch() {
  toggleSearch(this, true);
  lastButton = this;
}

function hideSearch() {
  toggleSearch(this, false);
  lastButton = undefined;
}

var search = behavior(_defineProperty({}, CLICK, _defineProperty({}, BUTTON, showSearch)), {
  init: function init(target) {
    select(BUTTON, target).forEach(function (button) {
      toggleSearch(button, false);
    });
  },
  teardown: function teardown() {
    // forget the last button clicked
    lastButton = undefined;
  }
});
module.exports = search;

},{"../events":35,"../utils/behavior":43,"../utils/select":48,"receptor/ignore":10}],29:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var once = require("receptor/once");

var behavior = require("../utils/behavior");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var LINK = ".".concat(PREFIX, "-skipnav[href^=\"#\"], .").concat(PREFIX, "-footer__return-to-top [href^=\"#\"]");
var MAINCONTENT = "main-content";

function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  var id = encodeURI(this.getAttribute("href"));
  var target = document.getElementById(id === "#" ? MAINCONTENT : id.slice(1));

  if (target) {
    target.style.outline = "0";
    target.setAttribute("tabindex", 0);
    target.focus();
    target.addEventListener("blur", once(function () {
      target.setAttribute("tabindex", -1);
    }));
  } else {// throw an error?
  }
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, setTabindex)));

},{"../config":34,"../events":35,"../utils/behavior":43,"receptor/once":13}],30:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../utils/select");

var behavior = require("../utils/behavior");

var _require = require("../events"),
    CLICK = _require.CLICK;

var _require2 = require("../config"),
    PREFIX = _require2.prefix;

var TABLE = ".".concat(PREFIX, "-table");
var SORTED = "aria-sort";
var ASCENDING = "ascending";
var DESCENDING = "descending";
var SORT_OVERRIDE = "data-sort-value";
var ICON_SOURCE = "\n  <svg class=\"".concat(PREFIX, "-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n    <g class=\"descending\" fill=\"transparent\">\n      <path d=\"M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z\" />\n    </g>\n    <g class=\"ascending\" fill=\"transparent\">\n      <path transform=\"rotate(180, 12, 12)\" d=\"M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z\" />\n    </g>\n    <g class=\"unsorted\" fill=\"transparent\">\n      <polygon points=\"15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15\"/>\n    </g>\n  </svg>\n");
var SORT_BUTTON_CLASS = "".concat(PREFIX, "-table__header__button");
var SORT_BUTTON = ".".concat(SORT_BUTTON_CLASS);
var SORTABLE_HEADER = "th[data-sortable]";
var ANNOUNCEMENT_REGION = ".".concat(PREFIX, "-table__announcement-region[aria-live=\"polite\"]");
/** Gets the data-sort-value attribute value, if provided — otherwise, gets
 * the innerText or textContent — of the child element (HTMLTableCellElement)
 * at the specified index of the given table row
 *
 * @param {number} index
 * @param {array<HTMLTableRowElement>} tr
 * @return {boolean}
 */

var getCellValue = function getCellValue(tr, index) {
  return tr.children[index].getAttribute(SORT_OVERRIDE) || tr.children[index].innerText || tr.children[index].textContent;
};
/**
 * Compares the values of two row array items at the given index, then sorts by the given direction
 * @param {number} index
 * @param {string} direction
 * @return {boolean}
 */


var compareFunction = function compareFunction(index, isAscending) {
  return function (thisRow, nextRow) {
    // get values to compare from data attribute or cell content
    var value1 = getCellValue(isAscending ? thisRow : nextRow, index);
    var value2 = getCellValue(isAscending ? nextRow : thisRow, index); // if neither value is empty, and if both values are already numbers, compare numerically

    if (value1 && value2 && !Number.isNaN(Number(value1)) && !Number.isNaN(Number(value2))) {
      return value1 - value2;
    } // Otherwise, compare alphabetically based on current user locale


    return value1.toString().localeCompare(value2, navigator.language, {
      numeric: true,
      ignorePunctuation: true
    });
  };
};
/**
 * Get an Array of column headers elements belonging directly to the given
 * table element.
 * @param {HTMLTableElement} table
 * @return {array<HTMLTableHeaderCellElement>}
 */


var getColumnHeaders = function getColumnHeaders(table) {
  var headers = select(SORTABLE_HEADER, table);
  return headers.filter(function (header) {
    return header.closest(TABLE) === table;
  });
};
/**
 * Update the button label within the given header element, resetting it
 * to the default state (ready to sort ascending) if it's no longer sorted
 * @param {HTMLTableHeaderCellElement} header
 */


var updateSortLabel = function updateSortLabel(header) {
  var headerName = header.innerText;
  var sortedAscending = header.getAttribute(SORTED) === ASCENDING;
  var isSorted = header.getAttribute(SORTED) === ASCENDING || header.getAttribute(SORTED) === DESCENDING || false;
  var headerLabel = "".concat(headerName, "', sortable column, currently ").concat(isSorted ? "".concat(sortedAscending ? "sorted ".concat(ASCENDING) : "sorted ".concat(DESCENDING)) : "unsorted");
  var headerButtonLabel = "Click to sort by ".concat(headerName, " in ").concat(sortedAscending ? DESCENDING : ASCENDING, " order.");
  header.setAttribute("aria-label", headerLabel);
  header.querySelector(SORT_BUTTON).setAttribute("title", headerButtonLabel);
};
/**
 * Remove the aria-sort attribute on the given header element, and reset the label and button icon
 * @param {HTMLTableHeaderCellElement} header
 */


var unsetSort = function unsetSort(header) {
  header.removeAttribute(SORTED);
  updateSortLabel(header);
};
/**
 * Sort rows either ascending or descending, based on a given header's aria-sort attribute
 * @param {HTMLTableHeaderCellElement} header
 * @param {boolean} isAscending
 * @return {boolean} true
 */


var sortRows = function sortRows(header, isAscending) {
  header.setAttribute(SORTED, isAscending === true ? DESCENDING : ASCENDING);
  updateSortLabel(header);
  var tbody = header.closest(TABLE).querySelector("tbody"); // We can use Array.from() and Array.sort() instead once we drop IE11 support, likely in the summer of 2021
  //
  // Array.from(tbody.querySelectorAll('tr').sort(
  //   compareFunction(
  //     Array.from(header.parentNode.children).indexOf(header),
  //     !isAscending)
  //   )
  // .forEach(tr => tbody.appendChild(tr) );
  // [].slice.call() turns array-like sets into true arrays so that we can sort them

  var allRows = [].slice.call(tbody.querySelectorAll("tr"));
  var allHeaders = [].slice.call(header.parentNode.children);
  var thisHeaderIndex = allHeaders.indexOf(header);
  allRows.sort(compareFunction(thisHeaderIndex, !isAscending)).forEach(function (tr) {
    [].slice.call(tr.children).forEach(function (td) {
      return td.removeAttribute("data-sort-active");
    });
    tr.children[thisHeaderIndex].setAttribute("data-sort-active", true);
    tbody.appendChild(tr);
  });
  return true;
};
/**
 * Update the live region immediately following the table whenever sort changes.
 * @param {HTMLTableElement} table
 * @param {HTMLTableHeaderCellElement} sortedHeader
 */


var updateLiveRegion = function updateLiveRegion(table, sortedHeader) {
  var caption = table.querySelector("caption").innerText;
  var sortedAscending = sortedHeader.getAttribute(SORTED) === ASCENDING;
  var headerLabel = sortedHeader.innerText;
  var liveRegion = table.nextElementSibling;

  if (liveRegion && liveRegion.matches(ANNOUNCEMENT_REGION)) {
    var sortAnnouncement = "The table named \"".concat(caption, "\" is now sorted by ").concat(headerLabel, " in ").concat(sortedAscending ? ASCENDING : DESCENDING, " order.");
    liveRegion.innerText = sortAnnouncement;
  } else {
    throw new Error("Table containing a sortable column header is not followed by an aria-live region.");
  }
};
/**
 * Toggle a header's sort state, optionally providing a target
 * state.
 *
 * @param {HTMLTableHeaderCellElement} header
 * @param {boolean?} isAscending If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 */


var toggleSort = function toggleSort(header, isAscending) {
  var table = header.closest(TABLE);
  var safeAscending = isAscending;

  if (typeof safeAscending !== "boolean") {
    safeAscending = header.getAttribute(SORTED) === ASCENDING;
  }

  if (!table) {
    throw new Error("".concat(SORTABLE_HEADER, " is missing outer ").concat(TABLE));
  }

  safeAscending = sortRows(header, isAscending);

  if (safeAscending) {
    getColumnHeaders(table).forEach(function (otherHeader) {
      if (otherHeader !== header) {
        unsetSort(otherHeader);
      }
    });
    updateLiveRegion(table, header);
  }
};
/**
 ** Inserts a button with icon inside a sortable header
 * @param {HTMLTableHeaderCellElement} header
 */


var createHeaderButton = function createHeaderButton(header) {
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("tabindex", "0");
  buttonEl.classList.add(SORT_BUTTON_CLASS);
  buttonEl.innerHTML = "".concat(ICON_SOURCE);
  header.appendChild(buttonEl);
  updateSortLabel(header);
};

var table = behavior(_defineProperty({}, CLICK, _defineProperty({}, SORT_BUTTON, function (event) {
  event.preventDefault();
  toggleSort(event.target.closest(SORTABLE_HEADER), event.target.closest(SORTABLE_HEADER).getAttribute(SORTED) === ASCENDING);
})), {
  init: function init(root) {
    var sortableHeaders = select(SORTABLE_HEADER, root);
    sortableHeaders.forEach(function (header) {
      return createHeaderButton(header);
    });
    var firstSorted = sortableHeaders.filter(function (header) {
      return header.getAttribute(SORTED) === ASCENDING || header.getAttribute(SORTED) === DESCENDING;
    })[0];

    if (typeof firstSorted === "undefined") {
      // no sortable headers found
      return;
    }

    var sortDir = firstSorted.getAttribute(SORTED);

    if (sortDir === ASCENDING) {
      toggleSort(firstSorted, true);
    } else if (sortDir === DESCENDING) {
      toggleSort(firstSorted, false);
    }
  },
  TABLE: TABLE,
  SORTABLE_HEADER: SORTABLE_HEADER,
  SORT_BUTTON: SORT_BUTTON
});
module.exports = table;

},{"../config":34,"../events":35,"../utils/behavior":43,"../utils/select":48}],31:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var behavior = require("../utils/behavior");

var select = require("../utils/select");

var _require = require("../config"),
    PREFIX = _require.prefix;

var _require2 = require("./combo-box"),
    COMBO_BOX_CLASS = _require2.COMBO_BOX_CLASS,
    enhanceComboBox = _require2.enhanceComboBox;

var TIME_PICKER_CLASS = "".concat(PREFIX, "-time-picker");
var TIME_PICKER = ".".concat(TIME_PICKER_CLASS);
var MAX_TIME = 60 * 24 - 1;
var MIN_TIME = 0;
var DEFAULT_STEP = 30;
var MIN_STEP = 1;
var FILTER_DATASET = {
  filter: "0?{{ hourQueryFilter }}:{{minuteQueryFilter}}.*{{ apQueryFilter }}m?",
  apQueryFilter: "([ap])",
  hourQueryFilter: "([1-9][0-2]?)",
  minuteQueryFilter: "[\\d]+:([0-9]{0,2})"
};
/**
 * Parse a string of hh:mm into minutes
 *
 * @param {string} timeStr the time string to parse
 * @returns {number} the number of minutes
 */

var parseTimeString = function parseTimeString(timeStr) {
  var minutes;

  if (timeStr) {
    var _timeStr$split$map = timeStr.split(":").map(function (str) {
      var value;
      var parsed = parseInt(str, 10);
      if (!Number.isNaN(parsed)) value = parsed;
      return value;
    }),
        _timeStr$split$map2 = _slicedToArray(_timeStr$split$map, 2),
        hours = _timeStr$split$map2[0],
        mins = _timeStr$split$map2[1];

    if (hours != null && mins != null) {
      minutes = hours * 60 + mins;
    }
  }

  return minutes;
};
/**
 * Enhance an input with the date picker elements
 *
 * @param {HTMLElement} el The initial wrapping element of the date picker component
 */


var transformTimePicker = function transformTimePicker(el) {
  var timePickerEl = el.closest(TIME_PICKER);
  var initialInputEl = timePickerEl.querySelector("input");

  if (!initialInputEl) {
    throw new Error("".concat(TIME_PICKER, " is missing inner input"));
  }

  var selectEl = document.createElement("select");
  ["id", "name", "required", "aria-label", "aria-labelledby"].forEach(function (name) {
    if (initialInputEl.hasAttribute(name)) {
      var value = initialInputEl.getAttribute(name);
      selectEl.setAttribute(name, value);
      initialInputEl.removeAttribute(name);
    }
  });

  var padZeros = function padZeros(value, length) {
    return "0000".concat(value).slice(-length);
  };

  var getTimeContext = function getTimeContext(minutes) {
    var minute = minutes % 60;
    var hour24 = Math.floor(minutes / 60);
    var hour12 = hour24 % 12 || 12;
    var ampm = hour24 < 12 ? "am" : "pm";
    return {
      minute: minute,
      hour24: hour24,
      hour12: hour12,
      ampm: ampm
    };
  };

  var minTime = Math.max(MIN_TIME, parseTimeString(timePickerEl.dataset.minTime) || MIN_TIME);
  var maxTime = Math.min(MAX_TIME, parseTimeString(timePickerEl.dataset.maxTime) || MAX_TIME);
  var step = Math.floor(Math.max(MIN_STEP, timePickerEl.dataset.step || DEFAULT_STEP));

  for (var time = minTime; time <= maxTime; time += step) {
    var _getTimeContext = getTimeContext(time),
        minute = _getTimeContext.minute,
        hour24 = _getTimeContext.hour24,
        hour12 = _getTimeContext.hour12,
        ampm = _getTimeContext.ampm;

    var option = document.createElement("option");
    option.value = "".concat(padZeros(hour24, 2), ":").concat(padZeros(minute, 2));
    option.text = "".concat(hour12, ":").concat(padZeros(minute, 2)).concat(ampm);
    selectEl.appendChild(option);
  }

  timePickerEl.classList.add(COMBO_BOX_CLASS); // combo box properties

  Object.keys(FILTER_DATASET).forEach(function (key) {
    timePickerEl.dataset[key] = FILTER_DATASET[key];
  });
  timePickerEl.dataset.disableFiltering = "true";
  timePickerEl.appendChild(selectEl);
  initialInputEl.style.display = "none";
};

var timePicker = behavior({}, {
  init: function init(root) {
    select(TIME_PICKER, root).forEach(function (timePickerEl) {
      transformTimePicker(timePickerEl);
      enhanceComboBox(timePickerEl);
    });
  },
  FILTER_DATASET: FILTER_DATASET
});
module.exports = timePicker;

},{"../config":34,"../utils/behavior":43,"../utils/select":48,"./combo-box":18}],32:[function(require,module,exports){
"use strict";

// Tooltips
var select = require("../utils/select");

var behavior = require("../utils/behavior");

var _require = require("../config"),
    PREFIX = _require.prefix;

var isElementInViewport = require("../utils/is-in-viewport");

var TOOLTIP = ".".concat(PREFIX, "-tooltip");
var TOOLTIP_TRIGGER_CLASS = "".concat(PREFIX, "-tooltip__trigger");
var TOOLTIP_CLASS = "".concat(PREFIX, "-tooltip");
var TOOLTIP_BODY_CLASS = "".concat(PREFIX, "-tooltip__body");
var SET_CLASS = "is-set";
var VISIBLE_CLASS = "is-visible";
var TRIANGLE_SIZE = 5;
var ADJUST_WIDTH_CLASS = "".concat(PREFIX, "-tooltip__body--wrap");
/**
 * Add one or more listeners to an element
 * @param {DOMElement} element - DOM element to add listeners to
 * @param {events} eventNames - space separated list of event names, e.g. 'click change'
 * @param {Function} listener - function to attach for each event as a listener
 */

var addListenerMulti = function addListenerMulti(element, eventNames, listener) {
  var events = eventNames.split(" ");

  for (var i = 0, iLen = events.length; i < iLen; i += 1) {
    element.addEventListener(events[i], listener, false);
  }
};
/**
 * Shows the tooltip
 * @param {HTMLElement} tooltipTrigger - the element that initializes the tooltip
 */


var showToolTip = function showToolTip(tooltipBody, tooltipTrigger, position) {
  tooltipBody.setAttribute("aria-hidden", "false"); // This sets up the tooltip body. The opacity is 0, but
  // we can begin running the calculations below.

  tooltipBody.classList.add(SET_CLASS);
  /**
   * Position the tooltip body when the trigger is hovered
   * Removes old positioning classnames and reapplies. This allows
   * positioning to change in case the user resizes browser or DOM manipulation
   * causes tooltip to get clipped from viewport
   *
   * @param {string} setPos - can be "top", "bottom", "right", "left"
   */

  var setPositionClass = function setPositionClass(setPos) {
    tooltipBody.classList.remove("".concat(TOOLTIP_BODY_CLASS, "--top"));
    tooltipBody.classList.remove("".concat(TOOLTIP_BODY_CLASS, "--bottom"));
    tooltipBody.classList.remove("".concat(TOOLTIP_BODY_CLASS, "--right"));
    tooltipBody.classList.remove("".concat(TOOLTIP_BODY_CLASS, "--left"));
    tooltipBody.classList.add("".concat(TOOLTIP_BODY_CLASS, "--").concat(setPos));
  };
  /**
   * Removes old positioning styles. This allows
   * re-positioning to change without inheriting other
   * dynamic styles
   *
   * @param {HTMLElement} e - this is the tooltip body
   */


  var resetPositionStyles = function resetPositionStyles(e) {
    // we don't override anything in the stylesheet when finding alt positions
    e.style.top = null;
    e.style.bottom = null;
    e.style.right = null;
    e.style.left = null;
    e.style.margin = null;
  };
  /**
   * get margin offset calculations
   *
   * @param {HTMLElement} target - this is the tooltip body
   * @param {String} propertyValue - this is the tooltip body
   */


  var offsetMargin = function offsetMargin(target, propertyValue) {
    return parseInt(window.getComputedStyle(target).getPropertyValue(propertyValue), 10);
  }; // offsetLeft = the left position, and margin of the element, the left
  // padding, scrollbar and border of the offsetParent element
  // offsetWidth = The offsetWidth property returns the viewable width of an
  // element in pixels, including padding, border and scrollbar, but not
  // the margin.

  /**
   * Calculate margin offset
   * tooltip trigger margin(position) offset + tooltipBody offsetWidth
   * @param {String} marginPosition
   * @param {Number} tooltipBodyOffset
   * @param {HTMLElement} trigger
   */


  var calculateMarginOffset = function calculateMarginOffset(marginPosition, tooltipBodyOffset, trigger) {
    var offset = offsetMargin(trigger, "margin-".concat(marginPosition)) > 0 ? tooltipBodyOffset - offsetMargin(trigger, "margin-".concat(marginPosition)) : tooltipBodyOffset;
    return offset;
  };
  /**
   * Positions tooltip at the top
   * @param {HTMLElement} e - this is the tooltip body
   */


  var positionTop = function positionTop(e) {
    resetPositionStyles(e); // ensures we start from the same point
    // get details on the elements object with

    var topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger);
    var leftMargin = calculateMarginOffset("left", e.offsetWidth, tooltipTrigger);
    setPositionClass("top");
    e.style.left = "50%"; // center the element

    e.style.top = "-".concat(TRIANGLE_SIZE, "px"); // consider the psuedo element
    // apply our margins based on the offest

    e.style.margin = "-".concat(topMargin, "px 0 0 -").concat(leftMargin / 2, "px");
  };
  /**
   * Positions tooltip at the bottom
   * @param {HTMLElement} e - this is the tooltip body
   */


  var positionBottom = function positionBottom(e) {
    resetPositionStyles(e);
    var leftMargin = calculateMarginOffset("left", e.offsetWidth, tooltipTrigger);
    setPositionClass("bottom");
    e.style.left = "50%";
    e.style.margin = "".concat(TRIANGLE_SIZE, "px 0 0 -").concat(leftMargin / 2, "px");
  };
  /**
   * Positions tooltip at the right
   * @param {HTMLElement} e - this is the tooltip body
   */


  var positionRight = function positionRight(e) {
    resetPositionStyles(e);
    var topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger);
    setPositionClass("right");
    e.style.top = "50%";
    e.style.left = "".concat(tooltipTrigger.offsetLeft + tooltipTrigger.offsetWidth + TRIANGLE_SIZE, "px");
    e.style.margin = "-".concat(topMargin / 2, "px 0 0 0");
  };
  /**
   * Positions tooltip at the right
   * @param {HTMLElement} e - this is the tooltip body
   */


  var positionLeft = function positionLeft(e) {
    resetPositionStyles(e);
    var topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger); // we have to check for some utility margins

    var leftMargin = calculateMarginOffset("left", tooltipTrigger.offsetLeft > e.offsetWidth ? tooltipTrigger.offsetLeft - e.offsetWidth : e.offsetWidth, tooltipTrigger);
    setPositionClass("left");
    e.style.top = "50%";
    e.style.left = "-".concat(TRIANGLE_SIZE, "px");
    e.style.margin = "-".concat(topMargin / 2, "px 0 0 ").concat(tooltipTrigger.offsetLeft > e.offsetWidth ? leftMargin : -leftMargin, "px"); // adjust the margin
  };
  /**
   * We try to set the position based on the
   * original intention, but make adjustments
   * if the element is clipped out of the viewport
   * we constrain the width only as a last resort
   * @param {HTMLElement} element(alias tooltipBody)
   * @param {Number} attempt (--flag)
   */


  var maxAttempts = 2;

  function findBestPosition(element) {
    var attempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    // create array of optional positions
    var positions = [positionTop, positionBottom, positionRight, positionLeft];
    var hasVisiblePosition = false; // we take a recursive approach

    function tryPositions(i) {
      if (i < positions.length) {
        var pos = positions[i];
        pos(element);

        if (!isElementInViewport(element)) {
          // eslint-disable-next-line no-param-reassign
          tryPositions(i += 1);
        } else {
          hasVisiblePosition = true;
        }
      }
    }

    tryPositions(0); // if we can't find a position we compress it and try again

    if (!hasVisiblePosition) {
      element.classList.add(ADJUST_WIDTH_CLASS);

      if (attempt <= maxAttempts) {
        // eslint-disable-next-line no-param-reassign
        findBestPosition(element, attempt += 1);
      }
    }
  }

  switch (position) {
    case "top":
      positionTop(tooltipBody);

      if (!isElementInViewport(tooltipBody)) {
        findBestPosition(tooltipBody);
      }

      break;

    case "bottom":
      positionBottom(tooltipBody);

      if (!isElementInViewport(tooltipBody)) {
        findBestPosition(tooltipBody);
      }

      break;

    case "right":
      positionRight(tooltipBody);

      if (!isElementInViewport(tooltipBody)) {
        findBestPosition(tooltipBody);
      }

      break;

    case "left":
      positionLeft(tooltipBody);

      if (!isElementInViewport(tooltipBody)) {
        findBestPosition(tooltipBody);
      }

      break;

    default:
      // skip default case
      break;
  }
  /**
   * Actually show the tooltip. The VISIBLE_CLASS
   * will change the opacity to 1
   */


  setTimeout(function () {
    tooltipBody.classList.add(VISIBLE_CLASS);
  }, 20);
};
/**
 * Removes all the properties to show and position the tooltip,
 * and resets the tooltip position to the original intention
 * in case the window is resized or the element is moved through
 * DOM maniulation.
 * @param {HTMLElement} tooltipBody - The body of the tooltip
 */


var hideToolTip = function hideToolTip(tooltipBody) {
  tooltipBody.classList.remove(VISIBLE_CLASS);
  tooltipBody.classList.remove(SET_CLASS);
  tooltipBody.classList.remove(ADJUST_WIDTH_CLASS);
  tooltipBody.setAttribute("aria-hidden", "true");
};
/**
 * Setup the tooltip component
 * @param {HTMLElement} tooltipTrigger The element that creates the tooltip
 */


var setUpAttributes = function setUpAttributes(tooltipTrigger) {
  var tooltipID = "tooltip-".concat(Math.floor(Math.random() * 900000) + 100000);
  var tooltipContent = tooltipTrigger.getAttribute("title");
  var wrapper = document.createElement("span");
  var tooltipBody = document.createElement("span");
  var position = tooltipTrigger.getAttribute("data-position") ? tooltipTrigger.getAttribute("data-position") : "top";
  var additionalClasses = tooltipTrigger.getAttribute("data-classes"); // Set up tooltip attributes

  tooltipTrigger.setAttribute("aria-describedby", tooltipID);
  tooltipTrigger.setAttribute("tabindex", "0");
  tooltipTrigger.setAttribute("title", "");
  tooltipTrigger.classList.remove(TOOLTIP_CLASS);
  tooltipTrigger.classList.add(TOOLTIP_TRIGGER_CLASS); // insert wrapper before el in the DOM tree

  tooltipTrigger.parentNode.insertBefore(wrapper, tooltipTrigger); // set up the wrapper

  wrapper.appendChild(tooltipTrigger);
  wrapper.classList.add(TOOLTIP_CLASS);
  wrapper.appendChild(tooltipBody); // Apply additional class names to wrapper element

  if (additionalClasses) {
    var classesArray = additionalClasses.split(" ");
    classesArray.forEach(function (classname) {
      return wrapper.classList.add(classname);
    });
  } // set up the tooltip body


  tooltipBody.classList.add(TOOLTIP_BODY_CLASS);
  tooltipBody.setAttribute("id", tooltipID);
  tooltipBody.setAttribute("role", "tooltip");
  tooltipBody.setAttribute("aria-hidden", "true"); // place the text in the tooltip

  tooltipBody.innerHTML = tooltipContent;
  return {
    tooltipBody: tooltipBody,
    position: position,
    tooltipContent: tooltipContent,
    wrapper: wrapper
  };
}; // Setup our function to run on various events


var tooltip = behavior({}, {
  init: function init(root) {
    select(TOOLTIP, root).forEach(function (tooltipTrigger) {
      var _setUpAttributes = setUpAttributes(tooltipTrigger),
          tooltipBody = _setUpAttributes.tooltipBody,
          position = _setUpAttributes.position,
          tooltipContent = _setUpAttributes.tooltipContent,
          wrapper = _setUpAttributes.wrapper;

      if (tooltipContent) {
        // Listeners for showing and hiding the tooltip
        addListenerMulti(tooltipTrigger, "mouseenter focus", function () {
          showToolTip(tooltipBody, tooltipTrigger, position, wrapper);
          return false;
        }); // Keydown here prevents tooltips from being read twice by
        // screen reader. also allows excape key to close it
        // (along with any other.)

        addListenerMulti(tooltipTrigger, "mouseleave blur keydown", function () {
          hideToolTip(tooltipBody);
          return false;
        });
      } else {// throw error or let other tooltips on page function?
      }
    });
  }
});
module.exports = tooltip;

},{"../config":34,"../utils/behavior":43,"../utils/is-in-viewport":45,"../utils/select":48}],33:[function(require,module,exports){
"use strict";

var behavior = require("../utils/behavior");

var validate = require("../utils/validate-input");

function change() {
  validate(this);
}

var validator = behavior({
  "keyup change": {
    "input[data-validation-element]": change
  }
});
module.exports = validator;

},{"../utils/behavior":43,"../utils/validate-input":52}],34:[function(require,module,exports){
"use strict";

module.exports = {
  prefix: "usa"
};

},{}],35:[function(require,module,exports){
"use strict";

module.exports = {
  // This used to be conditionally dependent on whether the
  // browser supported touch events; if it did, `CLICK` was set to
  // `touchstart`.  However, this had downsides:
  //
  // * It pre-empted mobile browsers' default behavior of detecting
  //   whether a touch turned into a scroll, thereby preventing
  //   users from using some of our components as scroll surfaces.
  //
  // * Some devices, such as the Microsoft Surface Pro, support *both*
  //   touch and clicks. This meant the conditional effectively dropped
  //   support for the user's mouse, frustrating users who preferred
  //   it on those systems.
  CLICK: "click"
};

},{}],36:[function(require,module,exports){
"use strict";

/* eslint-disable consistent-return */

/* eslint-disable func-names */
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, _params) {
    var params = _params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

},{}],37:[function(require,module,exports){
"use strict";

var elproto = window.HTMLElement.prototype;
var HIDDEN = "hidden";

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function get() {
      return this.hasAttribute(HIDDEN);
    },
    set: function set(value) {
      if (value) {
        this.setAttribute(HIDDEN, "");
      } else {
        this.removeAttribute(HIDDEN);
      }
    }
  });
}

},{}],38:[function(require,module,exports){
"use strict";

// polyfills HTMLElement.prototype.classList and DOMTokenList
require("classlist-polyfill"); // polyfills HTMLElement.prototype.hidden


require("./element-hidden"); // polyfills Number.isNaN()


require("./number-is-nan"); // polyfills CustomEvent


require("./custom-event"); // polyfills svg4everybody


require("./svg4everybody");

},{"./custom-event":36,"./element-hidden":37,"./number-is-nan":39,"./svg4everybody":40,"classlist-polyfill":1}],39:[function(require,module,exports){
"use strict";

Number.isNaN = Number.isNaN || function isNaN(input) {
  // eslint-disable-next-line no-self-compare
  return typeof input === "number" && input !== input;
};

},{}],40:[function(require,module,exports){
"use strict";

/* eslint-disable */
!function (factory) {
  module.exports = factory();
}(function () {
  /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
  function embed(parent, svg, target, use) {
    // if the target exists
    if (target) {
      // create a document fragment to hold the contents of the target
      var fragment = document.createDocumentFragment(),
          viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox"); // conditionally set the viewBox on the svg

      viewBox && svg.setAttribute("viewBox", viewBox); // copy the contents of the clone into the fragment

      for ( // clone the target
      var clone = document.importNode ? document.importNode(target, !0) : target.cloneNode(!0), g = document.createElementNS(svg.namespaceURI || "http://www.w3.org/2000/svg", "g"); clone.childNodes.length;) {
        g.appendChild(clone.firstChild);
      }

      if (use) {
        for (var i = 0; use.attributes.length > i; i++) {
          var attr = use.attributes[i];
          "xlink:href" !== attr.name && "href" !== attr.name && g.setAttribute(attr.name, attr.value);
        }
      }

      fragment.appendChild(g), // append the fragment into the svg
      parent.appendChild(fragment);
    }
  }

  function loadreadystatechange(xhr, use) {
    // listen to changes in the request
    xhr.onreadystatechange = function () {
      // if the request is ready
      if (4 === xhr.readyState) {
        // get the cached html document
        var cachedDocument = xhr._cachedDocument; // ensure the cached html document based on the xhr response

        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, // ensure domains are the same, otherwise we'll have issues appending the
        // element in IE 11
        cachedDocument.domain !== document.domain && (cachedDocument.domain = document.domain), xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
        xhr._embeds.splice(0).map(function (item) {
          // get the cached target
          var target = xhr._cachedTarget[item.id]; // ensure the cached target

          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), // embed the target into the svg
          embed(item.parent, item.svg, target, use);
        });
      }
    }, // test the ready state change immediately
    xhr.onreadystatechange();
  }

  function svg4everybody(rawopts) {
    function oninterval() {
      // if all <use>s in the array are being bypassed, don't proceed.
      if (numberOfSvgUseElementsToBypass && uses.length - numberOfSvgUseElementsToBypass <= 0) {
        return void requestAnimationFrame(oninterval, 67);
      } // if there are <use>s to process, proceed.
      // reset the bypass counter, since the counter will be incremented for every bypassed element,
      // even ones that were counted before.


      numberOfSvgUseElementsToBypass = 0; // while the index exists in the live <use> collection

      for ( // get the cached <use> index
      var index = 0; index < uses.length;) {
        // get the current <use>
        var use = uses[index],
            parent = use.parentNode,
            svg = getSVGAncestor(parent),
            src = use.getAttribute("xlink:href") || use.getAttribute("href");

        if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
          if (polyfill) {
            if (!opts.validate || opts.validate(src, svg, use)) {
              // remove the <use> element
              parent.removeChild(use); // parse the src and get the url and id

              var srcSplit = src.split("#"),
                  url = srcSplit.shift(),
                  id = srcSplit.join("#"); // if the link is external

              if (url.length) {
                // get the cached xhr request
                var xhr = requests[url]; // ensure the xhr request exists

                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }), // prepare the xhr ready state change event
                loadreadystatechange(xhr, use);
              } else {
                // embed the local id into the svg
                embed(parent, svg, document.getElementById(id), use);
              }
            } else {
              // increase the index when the previous value was not "valid"
              ++index, ++numberOfSvgUseElementsToBypass;
            }
          }
        } else {
          // increase the index when the previous value was not "valid"
          ++index;
        }
      } // continue the interval


      requestAnimationFrame(oninterval, 67);
    }

    var polyfill,
        opts = Object(rawopts),
        newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
        webkitUA = /\bAppleWebKit\/(\d+)\b/,
        olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
        edgeUA = /\bEdge\/.(\d+)\b/,
        inIframe = window.top !== window.self;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe; // create xhr requests object

    var requests = {},
        requestAnimationFrame = window.requestAnimationFrame || setTimeout,
        uses = document.getElementsByTagName("use"),
        numberOfSvgUseElementsToBypass = 0; // conditionally start the interval if the polyfill is active

    polyfill && oninterval();
  }

  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}

    return svg;
  }

  return svg4everybody;
});

},{}],41:[function(require,module,exports){
"use strict";

var domready = require("domready");

window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */

require("./polyfills");

var uswds = require("./config");

var components = require("./components");

var svg4everybody = require("./polyfills/svg4everybody");

uswds.components = components;
domready(function () {
  var target = document.body;
  Object.keys(components).forEach(function (key) {
    var behavior = components[key];
    behavior.on(target);
  });
  svg4everybody();
});
module.exports = uswds;

},{"./components":23,"./config":34,"./polyfills":38,"./polyfills/svg4everybody":40,"domready":2}],42:[function(require,module,exports){
"use strict";

module.exports = function () {
  var htmlDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return htmlDocument.activeElement;
};

},{}],43:[function(require,module,exports){
"use strict";

var assign = require("object-assign");

var Behavior = require("receptor/behavior");
/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module


var sequence = function sequence() {
  for (var _len = arguments.length, seq = new Array(_len), _key = 0; _key < _len; _key++) {
    seq[_key] = arguments[_key];
  }

  return function callHooks() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    seq.forEach(function (method) {
      if (typeof _this[method] === "function") {
        _this[method].call(_this, target);
      }
    });
  };
};
/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */


module.exports = function (events, props) {
  return Behavior(events, assign({
    on: sequence("init", "add"),
    off: sequence("teardown", "remove")
  }, props));
};

},{"object-assign":5,"receptor/behavior":6}],44:[function(require,module,exports){
"use strict";

var assign = require("object-assign");

var _require = require("receptor"),
    keymap = _require.keymap;

var behavior = require("./behavior");

var select = require("./select");

var activeElement = require("./active-element");

var FOCUSABLE = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

var tabHandler = function tabHandler(context) {
  var focusableElements = select(FOCUSABLE, context);
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1]; // Special rules for when the user is tabbing forward from the last focusable element,
  // or when tabbing backwards from the first focusable element

  function tabAhead(event) {
    if (activeElement() === lastTabStop) {
      event.preventDefault();
      firstTabStop.focus();
    }
  }

  function tabBack(event) {
    if (activeElement() === firstTabStop) {
      event.preventDefault();
      lastTabStop.focus();
    } // This checks if you want to set the initial focus to a container
    // instead of an element within, and the user tabs back. 
    // Then we set the focus to the first
    else if (!focusableElements.includes(activeElement())) {
        event.preventDefault();
        firstTabStop.focus();
      }
  }

  return {
    firstTabStop: firstTabStop,
    lastTabStop: lastTabStop,
    tabAhead: tabAhead,
    tabBack: tabBack
  };
};

module.exports = function (context) {
  var additionalKeyBindings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var tabEventHandler = tabHandler(context);
  var bindings = additionalKeyBindings;
  var Esc = bindings.Esc,
      Escape = bindings.Escape;
  if (Escape && !Esc) bindings.Esc = Escape; //  TODO: In the future, loop over additional keybindings and pass an array
  // of functions, if necessary, to the map keys. Then people implementing
  // the focus trap could pass callbacks to fire when tabbing

  var keyMappings = keymap(assign({
    Tab: tabEventHandler.tabAhead,
    "Shift+Tab": tabEventHandler.tabBack
  }, additionalKeyBindings));
  var focusTrap = behavior({
    keydown: keyMappings
  }, {
    init: function init() {
      // TODO: is this desireable behavior? Should the trap always do this by default or should
      // the component getting decorated handle this?
      if (tabEventHandler.firstTabStop) {
        tabEventHandler.firstTabStop.focus();
      }
    },
    update: function update(isActive) {
      if (isActive) {
        this.on();
      } else {
        this.off();
      }
    }
  });
  return focusTrap;
};

},{"./active-element":42,"./behavior":43,"./select":48,"object-assign":5,"receptor":11}],45:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}

module.exports = isElementInViewport;

},{}],46:[function(require,module,exports){
"use strict";

// iOS detection from: http://stackoverflow.com/a/9039885/177710
function isIosDevice() {
  return typeof navigator !== "undefined" && (navigator.userAgent.match(/(iPod|iPhone|iPad)/g) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
}

module.exports = isIosDevice;

},{}],47:[function(require,module,exports){
"use strict";

module.exports = function getScrollbarWidth() {
  // Creating invisible container
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear

  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer); // Creating inner element and placing it in the container

  var inner = document.createElement('div');
  outer.appendChild(inner); // Calculating difference between container's full width and the child width

  var scrollbarWidth = "".concat(outer.offsetWidth - inner.offsetWidth, "px"); // Removing temporary elements from the DOM

  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

},{}],48:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
var isElement = function isElement(value) {
  return value && _typeof(value) === "object" && value.nodeType === 1;
};
/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */


module.exports = function (selector, context) {
  if (typeof selector !== "string") {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document; // eslint-disable-line no-param-reassign
  }

  var selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],49:[function(require,module,exports){
"use strict";

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = function (field, mask) {
  field.setAttribute("autocapitalize", "off");
  field.setAttribute("autocorrect", "off");
  field.setAttribute("type", mask ? "password" : "text");
};

},{}],50:[function(require,module,exports){
"use strict";

var resolveIdRefs = require("resolve-id-refs");

var toggleFieldMask = require("./toggle-field-mask");

var CONTROLS = "aria-controls";
var PRESSED = "aria-pressed";
var SHOW_ATTR = "data-show-text";
var HIDE_ATTR = "data-hide-text";
/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */

var getHideText = function getHideText(showText) {
  return showText.replace(/\bShow\b/i, function (show) {
    return "".concat(show[0] === "S" ? "H" : "h", "ide");
  });
};
/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */


module.exports = function (el) {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  var pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== "true";
  var fields = resolveIdRefs(el.getAttribute(CONTROLS));
  fields.forEach(function (field) {
    return toggleFieldMask(field, pressed);
  });

  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }

  var showText = el.getAttribute(SHOW_ATTR);
  var hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);
  el.textContent = pressed ? showText : hideText; // eslint-disable-line no-param-reassign

  el.setAttribute(PRESSED, pressed);
  return pressed;
};

},{"./toggle-field-mask":49,"resolve-id-refs":14}],51:[function(require,module,exports){
"use strict";

var EXPANDED = "aria-expanded";
var CONTROLS = "aria-controls";
var HIDDEN = "hidden";

module.exports = function (button, expanded) {
  var safeExpanded = expanded;

  if (typeof safeExpanded !== "boolean") {
    safeExpanded = button.getAttribute(EXPANDED) === "false";
  }

  button.setAttribute(EXPANDED, safeExpanded);
  var id = button.getAttribute(CONTROLS);
  var controls = document.getElementById(id);

  if (!controls) {
    throw new Error("No toggle target found with id: \"".concat(id, "\""));
  }

  if (safeExpanded) {
    controls.removeAttribute(HIDDEN);
  } else {
    controls.setAttribute(HIDDEN, "");
  }

  return safeExpanded;
};

},{}],52:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("../config"),
    PREFIX = _require.prefix;

var CHECKED = "aria-checked";
var CHECKED_CLASS = "".concat(PREFIX, "-checklist__item--checked");

module.exports = function validate(el) {
  var id = el.dataset.validationElement;
  var checkList = id.charAt(0) === "#" ? document.querySelector(id) : document.getElementById(id);

  if (!checkList) {
    throw new Error("No validation element found with id: \"".concat(id, "\""));
  }

  Object.entries(el.dataset).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key.startsWith("validate")) {
      var validatorName = key.substr("validate".length).toLowerCase();
      var validatorPattern = new RegExp(value);
      var validatorSelector = "[data-validator=\"".concat(validatorName, "\"]");
      var validatorCheckbox = checkList.querySelector(validatorSelector);

      if (!validatorCheckbox) {
        throw new Error("No validator checkbox found for: \"".concat(validatorName, "\""));
      }

      var checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      validatorCheckbox.setAttribute(CHECKED, checked);
    }
  });
};

},{"../config":34}]},{},[41])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9pZ25vcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3Iva2V5bWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL29uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVzb2x2ZS1pZC1yZWZzL2luZGV4LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvYmFubmVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY2hhcmFjdGVyLWNvdW50LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvY29tYm8tYm94LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9kYXRlLXJhbmdlLXBpY2tlci5qcyIsInNyYy9qcy9jb21wb25lbnRzL2ZpbGUtaW5wdXQuanMiLCJzcmMvanMvY29tcG9uZW50cy9mb290ZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pbmRleC5qcyIsInNyYy9qcy9jb21wb25lbnRzL2lucHV0LXByZWZpeC1zdWZmaXguanMiLCJzcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsInNyYy9qcy9jb21wb25lbnRzL25hdmlnYXRpb24uanMiLCJzcmMvanMvY29tcG9uZW50cy9wYXNzd29yZC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3NlYXJjaC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3NraXBuYXYuanMiLCJzcmMvanMvY29tcG9uZW50cy90YWJsZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL3RpbWUtcGlja2VyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9vbHRpcC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3ZhbGlkYXRvci5qcyIsInNyYy9qcy9jb25maWcuanMiLCJzcmMvanMvZXZlbnRzLmpzIiwic3JjL2pzL3BvbHlmaWxscy9jdXN0b20tZXZlbnQuanMiLCJzcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwic3JjL2pzL3BvbHlmaWxscy9pbmRleC5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvbnVtYmVyLWlzLW5hbi5qcyIsInNyYy9qcy9wb2x5ZmlsbHMvc3ZnNGV2ZXJ5Ym9keS5qcyIsInNyYy9qcy9zdGFydC5qcyIsInNyYy9qcy91dGlscy9hY3RpdmUtZWxlbWVudC5qcyIsInNyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInNyYy9qcy91dGlscy9mb2N1cy10cmFwLmpzIiwic3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwic3JjL2pzL3V0aWxzL2lzLWlvcy1kZXZpY2UuanMiLCJzcmMvanMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoLmpzIiwic3JjL2pzL3V0aWxzL3NlbGVjdC5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInNyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy9qcy91dGls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RUQsRUFBQSxNQUFNLENBQUMsT0FBUCxDQUFlLEVBQUUsQ0FBQyxPQUFsQixFQUEyQixPQUEzQixDQUFtQyxnQkFBa0I7QUFBQTtBQUFBLFFBQWhCLEdBQWdCO0FBQUEsUUFBWCxLQUFXOztBQUNuRCxRQUFJLEdBQUcsQ0FBQyxVQUFKLENBQWUsVUFBZixDQUFKLEVBQWdDO0FBQzlCLFVBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFKLENBQVcsV0FBVyxNQUF0QixFQUE4QixXQUE5QixFQUF0QjtBQUNBLFVBQU0sZ0JBQWdCLEdBQUcsSUFBSSxNQUFKLENBQVcsS0FBWCxDQUF6QjtBQUNBLFVBQU0saUJBQWlCLCtCQUF1QixhQUF2QixRQUF2QjtBQUNBLFVBQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDLGFBQVYsQ0FBd0IsaUJBQXhCLENBQTFCOztBQUVBLFVBQUksQ0FBQyxpQkFBTCxFQUF3QjtBQUN0QixjQUFNLElBQUksS0FBSiw4Q0FBK0MsYUFBL0MsUUFBTjtBQUNEOztBQUVELFVBQU0sT0FBTyxHQUFHLGdCQUFnQixDQUFDLElBQWpCLENBQXNCLEVBQUUsQ0FBQyxLQUF6QixDQUFoQjtBQUNBLE1BQUEsaUJBQWlCLENBQUMsU0FBbEIsQ0FBNEIsTUFBNUIsQ0FBbUMsYUFBbkMsRUFBa0QsT0FBbEQ7QUFDQSxNQUFBLGlCQUFpQixDQUFDLFlBQWxCLENBQStCLE9BQS9CLEVBQXdDLE9BQXhDO0FBQ0Q7QUFDRixHQWZEO0FBZ0JELENBM0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMS4xLjIwMTcwNDI3XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogTGljZW5zZTogRGVkaWNhdGVkIHRvIHRoZSBwdWJsaWMgZG9tYWluLlxuICogICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuLy8gSW5jbHVkaW5nIElFIDwgRWRnZSBtaXNzaW5nIFNWR0VsZW1lbnQuY2xhc3NMaXN0XG5pZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKSBcblx0fHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxudmFyXG5cdCAgY2xhc3NMaXN0UHJvcCA9IFwiY2xhc3NMaXN0XCJcblx0LCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG5cdCwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cblx0LCBvYmpDdHIgPSBPYmplY3Rcblx0LCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG5cdH1cblx0LCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIGkgPSAwXG5cdFx0XHQsIGxlbiA9IHRoaXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cdC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuXHQsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcblx0XHR0aGlzLm5hbWUgPSB0eXBlO1xuXHRcdHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9XG5cdCwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcblx0XHRpZiAodG9rZW4gPT09IFwiXCIpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIlNZTlRBWF9FUlJcIlxuXHRcdFx0XHQsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuXHRcdFx0dGhyb3cgbmV3IERPTUV4KFxuXHRcdFx0XHQgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcblx0XHRcdFx0LCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuXHR9XG5cdCwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHR2YXJcblx0XHRcdCAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKVxuXHRcdFx0LCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cblx0XHRcdCwgaSA9IDBcblx0XHRcdCwgbGVuID0gY2xhc3Nlcy5sZW5ndGhcblx0XHQ7XG5cdFx0Zm9yICg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuXHRcdH1cblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMudG9TdHJpbmcoKSk7XG5cdFx0fTtcblx0fVxuXHQsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuXHQsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcblx0fVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuXHRyZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cdHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuXHRcdFx0dGhpcy5wdXNoKHRva2VuKTtcblx0XHRcdHVwZGF0ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoKytpIDwgbCk7XG5cblx0aWYgKHVwZGF0ZWQpIHtcblx0XHR0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyXG5cdFx0ICB0b2tlbnMgPSBhcmd1bWVudHNcblx0XHQsIGkgPSAwXG5cdFx0LCBsID0gdG9rZW5zLmxlbmd0aFxuXHRcdCwgdG9rZW5cblx0XHQsIHVwZGF0ZWQgPSBmYWxzZVxuXHRcdCwgaW5kZXhcblx0O1xuXHRkbyB7XG5cdFx0dG9rZW4gPSB0b2tlbnNbaV0gKyBcIlwiO1xuXHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR3aGlsZSAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHR0aGlzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHRcdGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG5cdHRva2VuICs9IFwiXCI7XG5cblx0dmFyXG5cdFx0ICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuXHRcdCwgbWV0aG9kID0gcmVzdWx0ID9cblx0XHRcdGZvcmNlICE9PSB0cnVlICYmIFwicmVtb3ZlXCJcblx0XHQ6XG5cdFx0XHRmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuXHQ7XG5cblx0aWYgKG1ldGhvZCkge1xuXHRcdHRoaXNbbWV0aG9kXSh0b2tlbik7XG5cdH1cblxuXHRpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGZvcmNlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAhcmVzdWx0O1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xufTtcblxuaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuXHR2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG5cdFx0ICBnZXQ6IGNsYXNzTGlzdEdldHRlclxuXHRcdCwgZW51bWVyYWJsZTogdHJ1ZVxuXHRcdCwgY29uZmlndXJhYmxlOiB0cnVlXG5cdH07XG5cdHRyeSB7XG5cdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHR9IGNhdGNoIChleCkgeyAvLyBJRSA4IGRvZXNuJ3Qgc3VwcG9ydCBlbnVtZXJhYmxlOnRydWVcblx0XHQvLyBhZGRpbmcgdW5kZWZpbmVkIHRvIGZpZ2h0IHRoaXMgaXNzdWUgaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2lzc3Vlcy8zNlxuXHRcdC8vIG1vZGVybmllIElFOC1NU1c3IG1hY2hpbmUgaGFzIElFOCA4LjAuNjAwMS4xODcwMiBhbmQgaXMgYWZmZWN0ZWRcblx0XHRpZiAoZXgubnVtYmVyID09PSB1bmRlZmluZWQgfHwgZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuXHRcdFx0Y2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuXHRcdFx0b2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuXHRcdH1cblx0fVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG5cdGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG59XG5cbn0od2luZG93LnNlbGYpKTtcblxufVxuXG4vLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbi8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjMVwiLCBcImMyXCIpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG5cdC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuXHRpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKSB7XG5cdFx0dmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXHRcdFx0dmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG5cdFx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0XHR2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHR0b2tlbiA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdFx0XHRvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG5cdFx0Y3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcblx0fVxuXG5cdHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cblx0Ly8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuXHQvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG5cdGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuXHRcdHZhciBfdG9nZ2xlID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cblx0XHRET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuXHRcdFx0aWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG5cdFx0XHRcdHJldHVybiBmb3JjZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0fVxuXG5cdHRlc3RFbGVtZW50ID0gbnVsbDtcbn0oKSk7XG5cbn1cbiIsIi8qIVxuICAqIGRvbXJlYWR5IChjKSBEdXN0aW4gRGlheiAyMDE0IC0gTGljZW5zZSBNSVRcbiAgKi9cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcblxufSgnZG9tcmVhZHknLCBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZucyA9IFtdLCBsaXN0ZW5lclxuICAgICwgZG9jID0gZG9jdW1lbnRcbiAgICAsIGhhY2sgPSBkb2MuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsXG4gICAgLCBkb21Db250ZW50TG9hZGVkID0gJ0RPTUNvbnRlbnRMb2FkZWQnXG4gICAgLCBsb2FkZWQgPSAoaGFjayA/IC9ebG9hZGVkfF5jLyA6IC9ebG9hZGVkfF5pfF5jLykudGVzdChkb2MucmVhZHlTdGF0ZSlcblxuXG4gIGlmICghbG9hZGVkKVxuICBkb2MuYWRkRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb21Db250ZW50TG9hZGVkLCBsaXN0ZW5lcilcbiAgICBsb2FkZWQgPSAxXG4gICAgd2hpbGUgKGxpc3RlbmVyID0gZm5zLnNoaWZ0KCkpIGxpc3RlbmVyKClcbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgbG9hZGVkID8gc2V0VGltZW91dChmbiwgMCkgOiBmbnMucHVzaChmbilcbiAgfVxuXG59KTtcbiIsIi8vIGVsZW1lbnQtY2xvc2VzdCB8IENDMC0xLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvY2xvc2VzdFxuXG4oZnVuY3Rpb24gKEVsZW1lbnRQcm90bykge1xuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLm1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblx0XHRcdHZhciBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuXHRcdH07XG5cdH1cblxuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLmNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdH1cbn0pKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSk7XG4iLCIvKiBnbG9iYWwgZGVmaW5lLCBLZXlib2FyZEV2ZW50LCBtb2R1bGUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsID0ge1xuICAgIHBvbHlmaWxsOiBwb2x5ZmlsbCxcbiAgICBrZXlzOiB7XG4gICAgICAzOiAnQ2FuY2VsJyxcbiAgICAgIDY6ICdIZWxwJyxcbiAgICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgICAgOTogJ1RhYicsXG4gICAgICAxMjogJ0NsZWFyJyxcbiAgICAgIDEzOiAnRW50ZXInLFxuICAgICAgMTY6ICdTaGlmdCcsXG4gICAgICAxNzogJ0NvbnRyb2wnLFxuICAgICAgMTg6ICdBbHQnLFxuICAgICAgMTk6ICdQYXVzZScsXG4gICAgICAyMDogJ0NhcHNMb2NrJyxcbiAgICAgIDI3OiAnRXNjYXBlJyxcbiAgICAgIDI4OiAnQ29udmVydCcsXG4gICAgICAyOTogJ05vbkNvbnZlcnQnLFxuICAgICAgMzA6ICdBY2NlcHQnLFxuICAgICAgMzE6ICdNb2RlQ2hhbmdlJyxcbiAgICAgIDMyOiAnICcsXG4gICAgICAzMzogJ1BhZ2VVcCcsXG4gICAgICAzNDogJ1BhZ2VEb3duJyxcbiAgICAgIDM1OiAnRW5kJyxcbiAgICAgIDM2OiAnSG9tZScsXG4gICAgICAzNzogJ0Fycm93TGVmdCcsXG4gICAgICAzODogJ0Fycm93VXAnLFxuICAgICAgMzk6ICdBcnJvd1JpZ2h0JyxcbiAgICAgIDQwOiAnQXJyb3dEb3duJyxcbiAgICAgIDQxOiAnU2VsZWN0JyxcbiAgICAgIDQyOiAnUHJpbnQnLFxuICAgICAgNDM6ICdFeGVjdXRlJyxcbiAgICAgIDQ0OiAnUHJpbnRTY3JlZW4nLFxuICAgICAgNDU6ICdJbnNlcnQnLFxuICAgICAgNDY6ICdEZWxldGUnLFxuICAgICAgNDg6IFsnMCcsICcpJ10sXG4gICAgICA0OTogWycxJywgJyEnXSxcbiAgICAgIDUwOiBbJzInLCAnQCddLFxuICAgICAgNTE6IFsnMycsICcjJ10sXG4gICAgICA1MjogWyc0JywgJyQnXSxcbiAgICAgIDUzOiBbJzUnLCAnJSddLFxuICAgICAgNTQ6IFsnNicsICdeJ10sXG4gICAgICA1NTogWyc3JywgJyYnXSxcbiAgICAgIDU2OiBbJzgnLCAnKiddLFxuICAgICAgNTc6IFsnOScsICcoJ10sXG4gICAgICA5MTogJ09TJyxcbiAgICAgIDkzOiAnQ29udGV4dE1lbnUnLFxuICAgICAgMTQ0OiAnTnVtTG9jaycsXG4gICAgICAxNDU6ICdTY3JvbGxMb2NrJyxcbiAgICAgIDE4MTogJ1ZvbHVtZU11dGUnLFxuICAgICAgMTgyOiAnVm9sdW1lRG93bicsXG4gICAgICAxODM6ICdWb2x1bWVVcCcsXG4gICAgICAxODY6IFsnOycsICc6J10sXG4gICAgICAxODc6IFsnPScsICcrJ10sXG4gICAgICAxODg6IFsnLCcsICc8J10sXG4gICAgICAxODk6IFsnLScsICdfJ10sXG4gICAgICAxOTA6IFsnLicsICc+J10sXG4gICAgICAxOTE6IFsnLycsICc/J10sXG4gICAgICAxOTI6IFsnYCcsICd+J10sXG4gICAgICAyMTk6IFsnWycsICd7J10sXG4gICAgICAyMjA6IFsnXFxcXCcsICd8J10sXG4gICAgICAyMjE6IFsnXScsICd9J10sXG4gICAgICAyMjI6IFtcIidcIiwgJ1wiJ10sXG4gICAgICAyMjQ6ICdNZXRhJyxcbiAgICAgIDIyNTogJ0FsdEdyYXBoJyxcbiAgICAgIDI0NjogJ0F0dG4nLFxuICAgICAgMjQ3OiAnQ3JTZWwnLFxuICAgICAgMjQ4OiAnRXhTZWwnLFxuICAgICAgMjQ5OiAnRXJhc2VFb2YnLFxuICAgICAgMjUwOiAnUGxheScsXG4gICAgICAyNTE6ICdab29tT3V0J1xuICAgIH1cbiAgfTtcblxuICAvLyBGdW5jdGlvbiBrZXlzIChGMS0yNCkuXG4gIHZhciBpO1xuICBmb3IgKGkgPSAxOyBpIDwgMjU7IGkrKykge1xuICAgIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzWzExMSArIGldID0gJ0YnICsgaTtcbiAgfVxuXG4gIC8vIFByaW50YWJsZSBBU0NJSSBjaGFyYWN0ZXJzLlxuICB2YXIgbGV0dGVyID0gJyc7XG4gIGZvciAoaSA9IDY1OyBpIDwgOTE7IGkrKykge1xuICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG4gICAga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbaV0gPSBbbGV0dGVyLnRvTG93ZXJDYXNlKCksIGxldHRlci50b1VwcGVyQ2FzZSgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvbHlmaWxsICgpIHtcbiAgICBpZiAoISgnS2V5Ym9hcmRFdmVudCcgaW4gd2luZG93KSB8fFxuICAgICAgICAna2V5JyBpbiBLZXlib2FyZEV2ZW50LnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFBvbHlmaWxsIGBrZXlgIG9uIGBLZXlib2FyZEV2ZW50YC5cbiAgICB2YXIgcHJvdG8gPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1t0aGlzLndoaWNoIHx8IHRoaXMua2V5Q29kZV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgIGtleSA9IGtleVsrdGhpcy5zaGlmdEtleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEtleWJvYXJkRXZlbnQucHJvdG90eXBlLCAna2V5JywgcHJvdG8pO1xuICAgIHJldHVybiBwcm90bztcbiAgfVxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsJywga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbDtcbiAgfSBlbHNlIGlmICh3aW5kb3cpIHtcbiAgICB3aW5kb3cua2V5Ym9hcmRldmVudEtleVBvbHlmaWxsID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsO1xuICB9XG5cbn0pKCk7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgZGVsZWdhdGVBbGwgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZUFsbCcpO1xuXG5jb25zdCBERUxFR0FURV9QQVRURVJOID0gL14oLispOmRlbGVnYXRlXFwoKC4rKVxcKSQvO1xuY29uc3QgU1BBQ0UgPSAnICc7XG5cbmNvbnN0IGdldExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgdmFyIG1hdGNoID0gdHlwZS5tYXRjaChERUxFR0FURV9QQVRURVJOKTtcbiAgdmFyIHNlbGVjdG9yO1xuICBpZiAobWF0Y2gpIHtcbiAgICB0eXBlID0gbWF0Y2hbMV07XG4gICAgc2VsZWN0b3IgPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHZhciBvcHRpb25zO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IHBvcEtleShoYW5kbGVyLCAnY2FwdHVyZScpLFxuICAgICAgcGFzc2l2ZTogcG9wS2V5KGhhbmRsZXIsICdwYXNzaXZlJylcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0ge1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBkZWxlZ2F0ZTogKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0JylcbiAgICAgID8gZGVsZWdhdGVBbGwoaGFuZGxlcilcbiAgICAgIDogc2VsZWN0b3JcbiAgICAgICAgPyBkZWxlZ2F0ZShzZWxlY3RvciwgaGFuZGxlcilcbiAgICAgICAgOiBoYW5kbGVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICBpZiAodHlwZS5pbmRleE9mKFNQQUNFKSA+IC0xKSB7XG4gICAgcmV0dXJuIHR5cGUuc3BsaXQoU1BBQ0UpLm1hcChmdW5jdGlvbihfdHlwZSkge1xuICAgICAgcmV0dXJuIGFzc2lnbih7dHlwZTogX3R5cGV9LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbnZhciBwb3BLZXkgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlaGF2aW9yKGV2ZW50cywgcHJvcHMpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24obWVtbywgdHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0eXBlLCBldmVudHNbdHlwZV0pO1xuICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KGxpc3RlbmVycyk7XG4gICAgfSwgW10pO1xuXG4gIHJldHVybiBhc3NpZ24oe1xuICAgIGFkZDogZnVuY3Rpb24gYWRkQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZUJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgcHJvcHMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZShmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnNvbWUoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpID09PSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbn07XG4iLCIvLyBwb2x5ZmlsbCBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0XG5yZXF1aXJlKCdlbGVtZW50LWNsb3Nlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZShzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlbGVnYXRpb24oZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRhcmdldCwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcbiIsImNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGNvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbmNvbnN0IFNQTEFUID0gJyonO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlQWxsKHNlbGVjdG9ycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKVxuXG4gIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZXJlIGlzIG9ubHkgb25lIGhhbmRsZXIgYW5kIGl0IGFwcGxpZXMgdG9cbiAgLy8gYWxsIGVsZW1lbnRzICh0aGUgXCIqXCIgQ1NTIHNlbGVjdG9yKSwgdGhlbiBqdXN0IHJldHVybiB0aGF0XG4gIC8vIGhhbmRsZXJcbiAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09IFNQTEFUKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yc1tTUExBVF07XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZXMgPSBrZXlzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBzZWxlY3Rvcikge1xuICAgIG1lbW8ucHVzaChkZWxlZ2F0ZShzZWxlY3Rvciwgc2VsZWN0b3JzW3NlbGVjdG9yXSkpO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCBbXSk7XG4gIHJldHVybiBjb21wb3NlKGRlbGVnYXRlcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmUoZWxlbWVudCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlnbm9yYW5jZShlKSB7XG4gICAgaWYgKGVsZW1lbnQgIT09IGUudGFyZ2V0ICYmICFlbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBiZWhhdmlvcjogICAgIHJlcXVpcmUoJy4vYmVoYXZpb3InKSxcbiAgZGVsZWdhdGU6ICAgICByZXF1aXJlKCcuL2RlbGVnYXRlJyksXG4gIGRlbGVnYXRlQWxsOiAgcmVxdWlyZSgnLi9kZWxlZ2F0ZUFsbCcpLFxuICBpZ25vcmU6ICAgICAgIHJlcXVpcmUoJy4vaWdub3JlJyksXG4gIGtleW1hcDogICAgICAgcmVxdWlyZSgnLi9rZXltYXAnKSxcbn07XG4iLCJyZXF1aXJlKCdrZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbCcpO1xuXG4vLyB0aGVzZSBhcmUgdGhlIG9ubHkgcmVsZXZhbnQgbW9kaWZpZXJzIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLFxuLy8gYWNjb3JkaW5nIHRvIE1ETjpcbi8vIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9nZXRNb2RpZmllclN0YXRlPlxuY29uc3QgTU9ESUZJRVJTID0ge1xuICAnQWx0JzogICAgICAnYWx0S2V5JyxcbiAgJ0NvbnRyb2wnOiAgJ2N0cmxLZXknLFxuICAnQ3RybCc6ICAgICAnY3RybEtleScsXG4gICdTaGlmdCc6ICAgICdzaGlmdEtleSdcbn07XG5cbmNvbnN0IE1PRElGSUVSX1NFUEFSQVRPUiA9ICcrJztcblxuY29uc3QgZ2V0RXZlbnRLZXkgPSBmdW5jdGlvbihldmVudCwgaGFzTW9kaWZpZXJzKSB7XG4gIHZhciBrZXkgPSBldmVudC5rZXk7XG4gIGlmIChoYXNNb2RpZmllcnMpIHtcbiAgICBmb3IgKHZhciBtb2RpZmllciBpbiBNT0RJRklFUlMpIHtcbiAgICAgIGlmIChldmVudFtNT0RJRklFUlNbbW9kaWZpZXJdXSA9PT0gdHJ1ZSkge1xuICAgICAgICBrZXkgPSBbbW9kaWZpZXIsIGtleV0uam9pbihNT0RJRklFUl9TRVBBUkFUT1IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXltYXAoa2V5cykge1xuICBjb25zdCBoYXNNb2RpZmllcnMgPSBPYmplY3Qua2V5cyhrZXlzKS5zb21lKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkuaW5kZXhPZihNT0RJRklFUl9TRVBBUkFUT1IpID4gLTE7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIga2V5ID0gZ2V0RXZlbnRLZXkoZXZlbnQsIGhhc01vZGlmaWVycyk7XG4gICAgcmV0dXJuIFtrZXksIGtleS50b0xvd2VyQ2FzZSgpXVxuICAgICAgLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIF9rZXkpIHtcbiAgICAgICAgaWYgKF9rZXkgaW4ga2V5cykge1xuICAgICAgICAgIHJlc3VsdCA9IGtleXNba2V5XS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgdW5kZWZpbmVkKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLk1PRElGSUVSUyA9IE1PRElGSUVSUztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25jZShsaXN0ZW5lciwgb3B0aW9ucykge1xuICB2YXIgd3JhcHBlZCA9IGZ1bmN0aW9uIHdyYXBwZWRPbmNlKGUpIHtcbiAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIHdyYXBwZWQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xuICB9O1xuICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJFX1RSSU0gPSAvKF5cXHMrKXwoXFxzKyQpL2c7XG52YXIgUkVfU1BMSVQgPSAvXFxzKy87XG5cbnZhciB0cmltID0gU3RyaW5nLnByb3RvdHlwZS50cmltXG4gID8gZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZShSRV9UUklNLCAnJyk7IH07XG5cbnZhciBxdWVyeUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbaWQ9XCInICsgaWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNvbHZlSWRzKGlkcywgZG9jKSB7XG4gIGlmICh0eXBlb2YgaWRzICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYnV0IGdvdCAnICsgKHR5cGVvZiBpZHMpKTtcbiAgfVxuXG4gIGlmICghZG9jKSB7XG4gICAgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGdldEVsZW1lbnRCeUlkID0gZG9jLmdldEVsZW1lbnRCeUlkXG4gICAgPyBkb2MuZ2V0RWxlbWVudEJ5SWQuYmluZChkb2MpXG4gICAgOiBxdWVyeUJ5SWQuYmluZChkb2MpO1xuXG4gIGlkcyA9IHRyaW0oaWRzKS5zcGxpdChSRV9TUExJVCk7XG5cbiAgLy8gWFhYIHdlIGNhbiBzaG9ydC1jaXJjdWl0IGhlcmUgYmVjYXVzZSB0cmltbWluZyBhbmQgc3BsaXR0aW5nIGFcbiAgLy8gc3RyaW5nIG9mIGp1c3Qgd2hpdGVzcGFjZSBwcm9kdWNlcyBhbiBhcnJheSBjb250YWluaW5nIGEgc2luZ2xlLFxuICAvLyBlbXB0eSBzdHJpbmdcbiAgaWYgKGlkcy5sZW5ndGggPT09IDEgJiYgaWRzWzBdID09PSAnJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBpZHNcbiAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgZWwgPSBnZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCB3aXRoIGlkOiBcIicgKyBpZCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH0pO1xufTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi91dGlscy90b2dnbGVcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbiwgLiR7UFJFRklYfS1hY2NvcmRpb24tLWJvcmRlcmVkYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbl9fYnV0dG9uW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCI7XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGJ1dHRvbiBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBhY2NvcmRpb24gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFjY29yZGlvblxuICogQHJldHVybiB7YXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRBY2NvcmRpb25CdXR0b25zID0gKGFjY29yZGlvbikgPT4ge1xuICBjb25zdCBidXR0b25zID0gc2VsZWN0KEJVVFRPTiwgYWNjb3JkaW9uKTtcblxuICByZXR1cm4gYnV0dG9ucy5maWx0ZXIoKGJ1dHRvbikgPT4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIGEgYnV0dG9uJ3MgXCJwcmVzc2VkXCIgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGV4cGFuZGVkIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSByZXN1bHRpbmcgc3RhdGVcbiAqL1xuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgY29uc3QgYWNjb3JkaW9uID0gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKTtcbiAgbGV0IHNhZmVFeHBhbmRlZCA9IGV4cGFuZGVkO1xuXG4gIGlmICghYWNjb3JkaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0JVVFRPTn0gaXMgbWlzc2luZyBvdXRlciAke0FDQ09SRElPTn1gKTtcbiAgfVxuXG4gIHNhZmVFeHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcblxuICAvLyBYWFggbXVsdGlzZWxlY3RhYmxlIGlzIG9wdC1pbiwgdG8gcHJlc2VydmUgbGVnYWN5IGJlaGF2aW9yXG4gIGNvbnN0IG11bHRpc2VsZWN0YWJsZSA9IGFjY29yZGlvbi5nZXRBdHRyaWJ1dGUoTVVMVElTRUxFQ1RBQkxFKSA9PT0gXCJ0cnVlXCI7XG5cbiAgaWYgKHNhZmVFeHBhbmRlZCAmJiAhbXVsdGlzZWxlY3RhYmxlKSB7XG4gICAgZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLmZvckVhY2goKG90aGVyKSA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IChidXR0b24pID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIHRydWUpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2VcbiAqL1xuY29uc3QgaGlkZUJ1dHRvbiA9IChidXR0b24pID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIGZhbHNlKTtcblxuY29uc3QgYWNjb3JkaW9uID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRvZ2dsZUJ1dHRvbih0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcInRydWVcIikge1xuICAgICAgICAgIC8vIFdlIHdlcmUganVzdCBleHBhbmRlZCwgYnV0IGlmIGFub3RoZXIgYWNjb3JkaW9uIHdhcyBhbHNvIGp1c3RcbiAgICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgICAvLyB0aGF0IHdlIGFyZSBzdGlsbCB2aXNpYmxlLCBzbyB0aGUgdXNlciBpc24ndCBjb25mdXNlZC5cbiAgICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcykpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCByb290KS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbihidXR0b24sIGV4cGFuZGVkKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgQUNDT1JESU9OLFxuICAgIEJVVFRPTixcbiAgICBzaG93OiBzaG93QnV0dG9uLFxuICAgIGhpZGU6IGhpZGVCdXR0b24sXG4gICAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gICAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2NvcmRpb247XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1iYW5uZXJfX2hlYWRlcmA7XG5jb25zdCBFWFBBTkRFRF9DTEFTUyA9IGAke1BSRUZJWH0tYmFubmVyX19oZWFkZXItLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gdG9nZ2xlRWwoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWBdOiB0b2dnbGVCYW5uZXIsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IENIQVJBQ1RFUl9DT1VOVCA9IGAuJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudGA7XG5jb25zdCBJTlBVVCA9IGAuJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudF9fZmllbGRgO1xuY29uc3QgTUVTU0FHRSA9IGAuJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudF9fbWVzc2FnZWA7XG5jb25zdCBWQUxJREFUSU9OX01FU1NBR0UgPSBcIlRoZSBjb250ZW50IGlzIHRvbyBsb25nLlwiO1xuY29uc3QgTUVTU0FHRV9JTlZBTElEX0NMQVNTID0gYCR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX21lc3NhZ2UtLWludmFsaWRgO1xuXG4vKipcbiAqIFRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIGNoYXJhY3RlciBjb3VudC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENoYXJhY3RlckNvdW50RWxlbWVudHNcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGNoYXJhY3RlckNvdW50RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFNwYW5FbGVtZW50fSBtZXNzYWdlRWxcbiAqL1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJvb3QgYW5kIG1lc3NhZ2UgZWxlbWVudFxuICogZm9yIGFuIGNoYXJhY3RlciBjb3VudCBpbnB1dFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudHxIVE1MVGV4dEFyZWFFbGVtZW50fSBpbnB1dEVsIFRoZSBjaGFyYWN0ZXIgY291bnQgaW5wdXQgZWxlbWVudFxuICogQHJldHVybnMge0NoYXJhY3RlckNvdW50RWxlbWVudHN9IGVsZW1lbnRzIFRoZSByb290IGFuZCBtZXNzYWdlIGVsZW1lbnQuXG4gKi9cbmNvbnN0IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMgPSAoaW5wdXRFbCkgPT4ge1xuICBjb25zdCBjaGFyYWN0ZXJDb3VudEVsID0gaW5wdXRFbC5jbG9zZXN0KENIQVJBQ1RFUl9DT1VOVCk7XG5cbiAgaWYgKCFjaGFyYWN0ZXJDb3VudEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0lOUFVUfSBpcyBtaXNzaW5nIG91dGVyICR7Q0hBUkFDVEVSX0NPVU5UfWApO1xuICB9XG5cbiAgY29uc3QgbWVzc2FnZUVsID0gY2hhcmFjdGVyQ291bnRFbC5xdWVyeVNlbGVjdG9yKE1FU1NBR0UpO1xuXG4gIGlmICghbWVzc2FnZUVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0NIQVJBQ1RFUl9DT1VOVH0gaXMgbWlzc2luZyBpbm5lciAke01FU1NBR0V9YCk7XG4gIH1cblxuICByZXR1cm4geyBjaGFyYWN0ZXJDb3VudEVsLCBtZXNzYWdlRWwgfTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjaGFyYWN0ZXIgY291bnQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHVwZGF0ZUNvdW50TWVzc2FnZSA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCwgbWVzc2FnZUVsIH0gPSBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzKGlucHV0RWwpO1xuXG4gIGNvbnN0IG1heGxlbmd0aCA9IHBhcnNlSW50KFxuICAgIGNoYXJhY3RlckNvdW50RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhsZW5ndGhcIiksXG4gICAgMTBcbiAgKTtcblxuICBpZiAoIW1heGxlbmd0aCkgcmV0dXJuO1xuXG4gIGxldCBuZXdNZXNzYWdlID0gXCJcIjtcbiAgY29uc3QgY3VycmVudExlbmd0aCA9IGlucHV0RWwudmFsdWUubGVuZ3RoO1xuICBjb25zdCBpc092ZXJMaW1pdCA9IGN1cnJlbnRMZW5ndGggJiYgY3VycmVudExlbmd0aCA+IG1heGxlbmd0aDtcblxuICBpZiAoY3VycmVudExlbmd0aCA9PT0gMCkge1xuICAgIG5ld01lc3NhZ2UgPSBgJHttYXhsZW5ndGh9IGNoYXJhY3RlcnMgYWxsb3dlZGA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKG1heGxlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBgY2hhcmFjdGVyJHtkaWZmZXJlbmNlID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gICAgY29uc3QgZ3VpZGFuY2UgPSBpc092ZXJMaW1pdCA/IFwib3ZlciBsaW1pdFwiIDogXCJsZWZ0XCI7XG5cbiAgICBuZXdNZXNzYWdlID0gYCR7ZGlmZmVyZW5jZX0gJHtjaGFyYWN0ZXJzfSAke2d1aWRhbmNlfWA7XG4gIH1cblxuICBtZXNzYWdlRWwuY2xhc3NMaXN0LnRvZ2dsZShNRVNTQUdFX0lOVkFMSURfQ0xBU1MsIGlzT3ZlckxpbWl0KTtcbiAgbWVzc2FnZUVsLmlubmVySFRNTCA9IG5ld01lc3NhZ2U7XG5cbiAgaWYgKGlzT3ZlckxpbWl0ICYmICFpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShWQUxJREFUSU9OX01FU1NBR0UpO1xuICB9XG5cbiAgaWYgKCFpc092ZXJMaW1pdCAmJiBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlID09PSBWQUxJREFUSU9OX01FU1NBR0UpIHtcbiAgICBpbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHVwIHRoZSBjaGFyYWN0ZXIgY291bnQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHNldHVwQXR0cmlidXRlcyA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCB9ID0gZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyhpbnB1dEVsKTtcblxuICBjb25zdCBtYXhsZW5ndGggPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcblxuICBpZiAoIW1heGxlbmd0aCkgcmV0dXJuO1xuXG4gIGlucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwibWF4bGVuZ3RoXCIpO1xuICBjaGFyYWN0ZXJDb3VudEVsLnNldEF0dHJpYnV0ZShcImRhdGEtbWF4bGVuZ3RoXCIsIG1heGxlbmd0aCk7XG59O1xuXG5jb25zdCBjaGFyYWN0ZXJDb3VudCA9IGJlaGF2aW9yKFxuICB7XG4gICAgaW5wdXQ6IHtcbiAgICAgIFtJTlBVVF0oKSB7XG4gICAgICAgIHVwZGF0ZUNvdW50TWVzc2FnZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KElOUFVULCByb290KS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICBzZXR1cEF0dHJpYnV0ZXMoaW5wdXQpO1xuICAgICAgICB1cGRhdGVDb3VudE1lc3NhZ2UoaW5wdXQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBNRVNTQUdFX0lOVkFMSURfQ0xBU1MsXG4gICAgVkFMSURBVElPTl9NRVNTQUdFLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJhY3RlckNvdW50O1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuXG5jb25zdCBDT01CT19CT1hfQ0xBU1MgPSBgJHtQUkVGSVh9LWNvbWJvLWJveGA7XG5jb25zdCBDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9LS1wcmlzdGluZWA7XG5jb25zdCBTRUxFQ1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zZWxlY3RgO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19jbGVhci1pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgSU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0LWJ1dHRvbi1zZXBhcmF0b3JgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fdG9nZ2xlLWxpc3RgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1MgPSBgJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9X193cmFwcGVyYDtcbmNvbnN0IExJU1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0YDtcbmNvbnN0IExJU1RfT1BUSU9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fbGlzdC1vcHRpb25gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgU1RBVFVTX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fc3RhdHVzYDtcblxuY29uc3QgQ09NQk9fQk9YID0gYC4ke0NPTUJPX0JPWF9DTEFTU31gO1xuY29uc3QgU0VMRUNUID0gYC4ke1NFTEVDVF9DTEFTU31gO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTiA9IGAuJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IFRPR0dMRV9MSVNUX0JVVFRPTiA9IGAuJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IExJU1QgPSBgLiR7TElTVF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT04gPSBgLiR7TElTVF9PUFRJT05fQ0xBU1N9YDtcbmNvbnN0IExJU1RfT1BUSU9OX0ZPQ1VTRUQgPSBgLiR7TElTVF9PUFRJT05fRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fU0VMRUNURUQgPSBgLiR7TElTVF9PUFRJT05fU0VMRUNURURfQ0xBU1N9YDtcbmNvbnN0IFNUQVRVUyA9IGAuJHtTVEFUVVNfQ0xBU1N9YDtcblxuY29uc3QgREVGQVVMVF9GSUxURVIgPSBcIi4qe3txdWVyeX19LipcIjtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG4vKipcbiAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgYW5kIGRpc3BhdGNoIGEgY2hhbmdlIGV2ZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxTZWxlY3RFbGVtZW50fSBlbCBUaGUgZWxlbWVudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gKi9cbmNvbnN0IGNoYW5nZUVsZW1lbnRWYWx1ZSA9IChlbCwgdmFsdWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9IGVsO1xuICBlbGVtZW50VG9DaGFuZ2UudmFsdWUgPSB2YWx1ZTtcblxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyB2YWx1ZSB9LFxuICB9KTtcbiAgZWxlbWVudFRvQ2hhbmdlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcblxuLyoqXG4gKiBUaGUgZWxlbWVudHMgd2l0aGluIHRoZSBjb21ibyBib3guXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21ib0JveENvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGNvbWJvQm94RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdEVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFVMaXN0RWxlbWVudH0gbGlzdEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBmb2N1c2VkT3B0aW9uRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTExJRWxlbWVudH0gc2VsZWN0ZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MQnV0dG9uRWxlbWVudH0gdG9nZ2xlTGlzdEJ0bkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhcklucHV0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNQcmlzdGluZVxuICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlRmlsdGVyaW5nXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3hcbiAqIEByZXR1cm5zIHtDb21ib0JveENvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldENvbWJvQm94Q29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gZWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmICghY29tYm9Cb3hFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7Q09NQk9fQk9YfWApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUKTtcbiAgY29uc3QgaW5wdXRFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG4gIGNvbnN0IGxpc3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihMSVNUKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU1RBVFVTKTtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX1NFTEVDVEVEKTtcbiAgY29uc3QgdG9nZ2xlTGlzdEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKFRPR0dMRV9MSVNUX0JVVFRPTik7XG4gIGNvbnN0IGNsZWFySW5wdXRCdG5FbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihDTEVBUl9JTlBVVF9CVVRUT04pO1xuXG4gIGNvbnN0IGlzUHJpc3RpbmUgPSBjb21ib0JveEVsLmNsYXNzTGlzdC5jb250YWlucyhDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICBjb25zdCBkaXNhYmxlRmlsdGVyaW5nID0gY29tYm9Cb3hFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPT09IFwidHJ1ZVwiO1xuXG4gIHJldHVybiB7XG4gICAgY29tYm9Cb3hFbCxcbiAgICBzZWxlY3RFbCxcbiAgICBpbnB1dEVsLFxuICAgIGxpc3RFbCxcbiAgICBzdGF0dXNFbCxcbiAgICBmb2N1c2VkT3B0aW9uRWwsXG4gICAgc2VsZWN0ZWRPcHRpb25FbCxcbiAgICB0b2dnbGVMaXN0QnRuRWwsXG4gICAgY2xlYXJJbnB1dEJ0bkVsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgY29tYm8tYm94IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSB0cnVlO1xuICBjbGVhcklucHV0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICB0b2dnbGVMaXN0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBjb21iby1ib3ggY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCB0b2dnbGVMaXN0QnRuRWwsIGNsZWFySW5wdXRCdG5FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBjbGVhcklucHV0QnRuRWwuaGlkZGVuID0gZmFsc2U7XG4gIGNsZWFySW5wdXRCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB0b2dnbGVMaXN0QnRuRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgaW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGEgc2VsZWN0IGVsZW1lbnQgaW50byBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gX2NvbWJvQm94RWwgVGhlIGluaXRpYWwgZWxlbWVudCBvZiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmhhbmNlQ29tYm9Cb3ggPSAoX2NvbWJvQm94RWwpID0+IHtcbiAgY29uc3QgY29tYm9Cb3hFbCA9IF9jb21ib0JveEVsLmNsb3Nlc3QoQ09NQk9fQk9YKTtcblxuICBpZiAoY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkKSByZXR1cm47XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIik7XG5cbiAgaWYgKCFzZWxlY3RFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtDT01CT19CT1h9IGlzIG1pc3NpbmcgaW5uZXIgc2VsZWN0YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RJZCA9IHNlbGVjdEVsLmlkO1xuICBjb25zdCBzZWxlY3RMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj1cIiR7c2VsZWN0SWR9XCJdYCk7XG4gIGNvbnN0IGxpc3RJZCA9IGAke3NlbGVjdElkfS0tbGlzdGA7XG4gIGNvbnN0IGxpc3RJZExhYmVsID0gYCR7c2VsZWN0SWR9LWxhYmVsYDtcbiAgY29uc3QgYXNzaXN0aXZlSGludElEID0gYCR7c2VsZWN0SWR9LS1hc3Npc3RpdmVIaW50YDtcbiAgY29uc3QgYWRkaXRpb25hbEF0dHJpYnV0ZXMgPSBbXTtcbiAgY29uc3QgZGVmYXVsdFZhbHVlID0gY29tYm9Cb3hFbC5kYXRhc2V0LmRlZmF1bHRWYWx1ZTtcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBjb21ib0JveEVsLmRhdGFzZXQucGxhY2Vob2xkZXI7XG4gIGxldCBzZWxlY3RlZE9wdGlvbjtcblxuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKGBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCJgKTtcbiAgfVxuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuXG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbiA9IG9wdGlvbkVsO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgZXJyb3IgaWYgY29tYm9ib3ggaXMgbWlzc2luZyBhIGxhYmVsIG9yIGxhYmVsIGlzIG1pc3NpbmdcbiAgICogYGZvcmAgYXR0cmlidXRlLiBPdGhlcndpc2UsIHNldCB0aGUgSUQgdG8gbWF0Y2ggdGhlIDx1bD4gYXJpYS1sYWJlbGxlZGJ5XG4gICAqL1xuICBpZiAoIXNlbGVjdExhYmVsIHx8ICFzZWxlY3RMYWJlbC5tYXRjaGVzKGBsYWJlbFtmb3I9XCIke3NlbGVjdElkfVwiXWApKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7Q09NQk9fQk9YfSBmb3IgJHtzZWxlY3RJZH0gaXMgZWl0aGVyIG1pc3NpbmcgYSBsYWJlbCBvciBhIFwiZm9yXCIgYXR0cmlidXRlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgbGlzdElkTGFiZWwpO1xuICB9XG5cbiAgc2VsZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgbGlzdElkTGFiZWwpO1xuICBzZWxlY3RFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIHNlbGVjdEVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIHNlbGVjdEVsLmNsYXNzTGlzdC5hZGQoXCJ1c2Etc3Itb25seVwiLCBTRUxFQ1RfQ0xBU1MpO1xuICBzZWxlY3RFbC5pZCA9IFwiXCI7XG4gIHNlbGVjdEVsLnZhbHVlID0gXCJcIjtcblxuICBbXCJyZXF1aXJlZFwiLCBcImFyaWEtbGFiZWxcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIl0uZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIGlmIChzZWxlY3RFbC5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0RWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgYWRkaXRpb25hbEF0dHJpYnV0ZXMucHVzaChgJHtuYW1lfT1cIiR7dmFsdWV9XCJgKTtcbiAgICAgIHNlbGVjdEVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbWJvQm94RWwuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgW1xuICAgICAgYDxpbnB1dFxuICAgICAgICBhcmlhLW93bnM9XCIke2xpc3RJZH1cIlxuICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiJHthc3Npc3RpdmVIaW50SUR9XCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCJcbiAgICAgICAgYXV0b2NhcGl0YWxpemU9XCJvZmZcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICBpZD1cIiR7c2VsZWN0SWR9XCJcbiAgICAgICAgY2xhc3M9XCIke0lOUFVUX0NMQVNTfVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgJHthZGRpdGlvbmFsQXR0cmlidXRlcy5qb2luKFwiIFwiKX1cbiAgICAgID5gLFxuICAgICAgYDxzcGFuIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9XCIgYXJpYS1sYWJlbD1cIkNsZWFyIHRoZSBzZWxlY3QgY29udGVudHNcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5gLFxuICAgICAgYDxzcGFuIGNsYXNzPVwiJHtJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTfVwiPiZuYnNwOzwvc3Bhbj5gLFxuICAgICAgYDxzcGFuIGNsYXNzPVwiJHtUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgdGhlIGRyb3Bkb3duIGxpc3RcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5gLFxuICAgICAgYDx1bFxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgaWQ9XCIke2xpc3RJZH1cIlxuICAgICAgICBjbGFzcz1cIiR7TElTVF9DTEFTU31cIlxuICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cIiR7bGlzdElkTGFiZWx9XCJcbiAgICAgICAgaGlkZGVuPlxuICAgICAgPC91bD5gLFxuICAgICAgYDxkaXYgY2xhc3M9XCIke1NUQVRVU19DTEFTU30gdXNhLXNyLW9ubHlcIiByb2xlPVwic3RhdHVzXCI+PC9kaXY+YCxcbiAgICAgIGA8c3BhbiBpZD1cIiR7YXNzaXN0aXZlSGludElEfVwiIGNsYXNzPVwidXNhLXNyLW9ubHlcIj5cbiAgICAgICAgV2hlbiBhdXRvY29tcGxldGUgcmVzdWx0cyBhcmUgYXZhaWxhYmxlIHVzZSB1cCBhbmQgZG93biBhcnJvd3MgdG8gcmV2aWV3IGFuZCBlbnRlciB0byBzZWxlY3QuXG4gICAgICAgIFRvdWNoIGRldmljZSB1c2VycywgZXhwbG9yZSBieSB0b3VjaCBvciB3aXRoIHN3aXBlIGdlc3R1cmVzLlxuICAgICAgPC9zcGFuPmAsXG4gICAgXS5qb2luKFwiXCIpXG4gICk7XG5cbiAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgY29uc3QgeyBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoY29tYm9Cb3hFbCk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBzZWxlY3RlZE9wdGlvbi52YWx1ZSk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIHNlbGVjdGVkT3B0aW9uLnRleHQpO1xuICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICB9XG5cbiAgaWYgKHNlbGVjdEVsLmRpc2FibGVkKSB7XG4gICAgZGlzYWJsZShjb21ib0JveEVsKTtcbiAgICBzZWxlY3RFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkID0gXCJ0cnVlXCI7XG59O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgZm9jdXNlZCBlbGVtZW50IHdpdGhpbiB0aGUgbGlzdCBvcHRpb25zIHdoZW5cbiAqIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGFuY2hvciBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV4dEVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc2tpcEZvY3VzIHNraXAgZm9jdXMgb2YgaGlnaGxpZ2h0ZWQgaXRlbVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnByZXZlbnRTY3JvbGwgc2hvdWxkIHNraXAgcHJvY2VkdXJlIHRvIHNjcm9sbCB0byBlbGVtZW50XG4gKi9cbmNvbnN0IGhpZ2hsaWdodE9wdGlvbiA9IChlbCwgbmV4dEVsLCB7IHNraXBGb2N1cywgcHJldmVudFNjcm9sbCB9ID0ge30pID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAoZm9jdXNlZE9wdGlvbkVsKSB7XG4gICAgZm9jdXNlZE9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgZm9jdXNlZE9wdGlvbkVsLnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gIH1cblxuICBpZiAobmV4dEVsKSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgbmV4dEVsLmlkKTtcbiAgICBuZXh0RWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgIG5leHRFbC5jbGFzc0xpc3QuYWRkKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICBjb25zdCBvcHRpb25Cb3R0b20gPSBuZXh0RWwub2Zmc2V0VG9wICsgbmV4dEVsLm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGN1cnJlbnRCb3R0b20gPSBsaXN0RWwuc2Nyb2xsVG9wICsgbGlzdEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKG9wdGlvbkJvdHRvbSA+IGN1cnJlbnRCb3R0b20pIHtcbiAgICAgICAgbGlzdEVsLnNjcm9sbFRvcCA9IG9wdGlvbkJvdHRvbSAtIGxpc3RFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWwub2Zmc2V0VG9wIDwgbGlzdEVsLnNjcm9sbFRvcCkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gbmV4dEVsLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXBGb2N1cykge1xuICAgICAgbmV4dEVsLmZvY3VzKHsgcHJldmVudFNjcm9sbCB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG4gICAgaW5wdXRFbC5mb2N1cygpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZHluYW1pYyByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWQgb2ZmIG9mIGEgcmVwbGFjZWFibGUgYW5kIHBvc3NpYmx5IGZpbHRlcmVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSB2YWx1ZSB0byB1c2UgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhcyBBbiBvYmplY3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0byByZXBsYWNlIGFuZCBmaWx0ZXIgdGhlIHF1ZXJ5XG4gKi9cbmNvbnN0IGdlbmVyYXRlRHluYW1pY1JlZ0V4cCA9IChmaWx0ZXIsIHF1ZXJ5ID0gXCJcIiwgZXh0cmFzID0ge30pID0+IHtcbiAgY29uc3QgZXNjYXBlUmVnRXhwID0gKHRleHQpID0+IHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgXCJcXFxcJCZcIik7XG4gIH07XG5cbiAgbGV0IGZpbmQgPSBmaWx0ZXIucmVwbGFjZSgve3soLio/KX19L2csIChtLCAkMSkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICQxLnRyaW0oKTtcbiAgICBjb25zdCBxdWVyeUZpbHRlciA9IGV4dHJhc1trZXldO1xuICAgIGlmIChrZXkgIT09IFwicXVlcnlcIiAmJiBxdWVyeUZpbHRlcikge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IG5ldyBSZWdFeHAocXVlcnlGaWx0ZXIsIFwiaVwiKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBxdWVyeS5tYXRjaChtYXRjaGVyKTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChtYXRjaGVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocXVlcnkpO1xuICB9KTtcblxuICBmaW5kID0gXCJeKD86XCIgKyBmaW5kICsgXCIpJFwiO1xuXG4gIHJldHVybiBuZXcgUmVnRXhwKGZpbmQsIFwiaVwiKTtcbn07XG5cbi8qKlxuICogRGlzcGxheSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG4gIGxldCBzZWxlY3RlZEl0ZW1JZDtcbiAgbGV0IGZpcnN0Rm91bmRJZDtcblxuICBjb25zdCBsaXN0T3B0aW9uQmFzZUlkID0gYCR7bGlzdEVsLmlkfS0tb3B0aW9uLWA7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlciA9IGNvbWJvQm94RWwuZGF0YXNldC5maWx0ZXIgfHwgREVGQVVMVF9GSUxURVI7XG4gIGNvbnN0IHJlZ2V4ID0gZ2VuZXJhdGVEeW5hbWljUmVnRXhwKGZpbHRlciwgaW5wdXRWYWx1ZSwgY29tYm9Cb3hFbC5kYXRhc2V0KTtcblxuICBjb25zdCBvcHRpb25zID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke29wdGlvbnMubGVuZ3RofWA7XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25FbC52YWx1ZSAmJlxuICAgICAgKGRpc2FibGVGaWx0ZXJpbmcgfHxcbiAgICAgICAgaXNQcmlzdGluZSB8fFxuICAgICAgICAhaW5wdXRWYWx1ZSB8fFxuICAgICAgICByZWdleC50ZXN0KG9wdGlvbkVsLnRleHQpKVxuICAgICkge1xuICAgICAgaWYgKHNlbGVjdEVsLnZhbHVlICYmIG9wdGlvbkVsLnZhbHVlID09PSBzZWxlY3RFbC52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZEl0ZW1JZCA9IG9wdGlvbklkO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlzYWJsZUZpbHRlcmluZyAmJiAhZmlyc3RGb3VuZElkICYmIHJlZ2V4LnRlc3Qob3B0aW9uRWwudGV4dCkpIHtcbiAgICAgICAgZmlyc3RGb3VuZElkID0gb3B0aW9uSWQ7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMucHVzaChvcHRpb25FbCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbnVtT3B0aW9ucyA9IG9wdGlvbnMubGVuZ3RoO1xuICBjb25zdCBvcHRpb25IdG1sID0gb3B0aW9uc1xuICAgIC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke2luZGV4fWA7XG4gICAgICBjb25zdCBjbGFzc2VzID0gW0xJU1RfT1BUSU9OX0NMQVNTXTtcbiAgICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcbiAgICAgIGxldCBhcmlhU2VsZWN0ZWQgPSBcImZhbHNlXCI7XG5cbiAgICAgIGlmIChvcHRpb25JZCA9PT0gc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTLCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgICAgYXJpYVNlbGVjdGVkID0gXCJ0cnVlXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtSWQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICAgICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1zZXRzaXplXCIsIG9wdGlvbnMubGVuZ3RoKVxuICAgICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1wb3NpbnNldFwiLCBpbmRleCArIDEpXG4gICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGFyaWFTZWxlY3RlZClcbiAgICAgIGxpLnNldEF0dHJpYnV0ZShcImlkXCIsIG9wdGlvbklkKVxuICAgICAgbGkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSlcbiAgICAgIGxpLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KVxuICAgICAgbGkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcIm9wdGlvblwiKVxuICAgICAgbGkuc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBvcHRpb24udmFsdWUpXG4gICAgICBsaS50ZXh0Q29udGVudCA9IG9wdGlvbi50ZXh0XG5cbiAgICAgIHJldHVybiBsaS5vdXRlckhUTUw7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKTtcblxuICBjb25zdCBub1Jlc3VsdHMgPSBgPGxpIGNsYXNzPVwiJHtMSVNUX09QVElPTl9DTEFTU30tLW5vLXJlc3VsdHNcIj5ObyByZXN1bHRzIGZvdW5kPC9saT5gO1xuXG4gIGxpc3RFbC5oaWRkZW4gPSBmYWxzZTtcbiAgbGlzdEVsLmlubmVySFRNTCA9IG51bU9wdGlvbnMgPyBvcHRpb25IdG1sIDogbm9SZXN1bHRzO1xuXG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG5cbiAgc3RhdHVzRWwuaW5uZXJIVE1MID0gbnVtT3B0aW9uc1xuICAgID8gYCR7bnVtT3B0aW9uc30gcmVzdWx0JHtudW1PcHRpb25zID4gMSA/IFwic1wiIDogXCJcIn0gYXZhaWxhYmxlLmBcbiAgICA6IFwiTm8gcmVzdWx0cy5cIjtcblxuICBsZXQgaXRlbVRvRm9jdXM7XG5cbiAgaWYgKGlzUHJpc3RpbmUgJiYgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICBpdGVtVG9Gb2N1cyA9IGxpc3RFbC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgc2VsZWN0ZWRJdGVtSWQpO1xuICB9IGVsc2UgaWYgKGRpc2FibGVGaWx0ZXJpbmcgJiYgZmlyc3RGb3VuZElkKSB7XG4gICAgaXRlbVRvRm9jdXMgPSBsaXN0RWwucXVlcnlTZWxlY3RvcihcIiNcIiArIGZpcnN0Rm91bmRJZCk7XG4gIH1cblxuICBpZiAoaXRlbVRvRm9jdXMpIHtcbiAgICBoaWdobGlnaHRPcHRpb24obGlzdEVsLCBpdGVtVG9Gb2N1cywge1xuICAgICAgc2tpcEZvY3VzOiB0cnVlLFxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEhpZGUgdGhlIG9wdGlvbiBsaXN0IG9mIGEgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoaWRlTGlzdCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIGxpc3RFbCwgc3RhdHVzRWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBzdGF0dXNFbC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcIlwiKTtcblxuICBpZiAoZm9jdXNlZE9wdGlvbkVsKSB7XG4gICAgZm9jdXNlZE9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gIH1cblxuICBsaXN0RWwuc2Nyb2xsVG9wID0gMDtcbiAgbGlzdEVsLmhpZGRlbiA9IHRydWU7XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhbiBvcHRpb24gbGlzdCBvZiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBsaXN0T3B0aW9uRWwgVGhlIGxpc3Qgb3B0aW9uIGJlaW5nIHNlbGVjdGVkXG4gKi9cbmNvbnN0IHNlbGVjdEl0ZW0gPSAobGlzdE9wdGlvbkVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgc2VsZWN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChsaXN0T3B0aW9uRWwpO1xuXG4gIGNoYW5nZUVsZW1lbnRWYWx1ZShzZWxlY3RFbCwgbGlzdE9wdGlvbkVsLmRhdGFzZXQudmFsdWUpO1xuICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgbGlzdE9wdGlvbkVsLnRleHRDb250ZW50KTtcbiAgY29tYm9Cb3hFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSBpbnB1dCBvZiB0aGUgY29tYm8gYm94XG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gY2xlYXJCdXR0b25FbCBUaGUgY2xlYXIgaW5wdXQgYnV0dG9uXG4gKi9cbmNvbnN0IGNsZWFySW5wdXQgPSAoY2xlYXJCdXR0b25FbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCwgc2VsZWN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChcbiAgICBjbGVhckJ1dHRvbkVsXG4gICk7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGlmIChzZWxlY3RFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsKTtcbiAgaWYgKGlucHV0RWwudmFsdWUpIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgY29tYm9Cb3hFbC5jbGFzc0xpc3QucmVtb3ZlKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG5cbiAgaWYgKGxpc3RTaG93bikgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIHNlbGVjdCBiYXNlZCBvZmYgb2YgY3VycmVudGx5IHNldCBzZWxlY3QgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCByZXNldFNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdFZhbHVlID0gc2VsZWN0RWwudmFsdWU7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSAoaW5wdXRFbC52YWx1ZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChzZWxlY3RWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IHNlbGVjdFZhbHVlKSB7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICE9PSBvcHRpb25FbC50ZXh0KSB7XG4gICAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50IGJhc2VkIG9mZiBvZlxuICogaGF2aW5nIGEgY3VycmVudCBmb2N1c2VkIGxpc3Qgb3B0aW9uIG9yXG4gKiBoYXZpbmcgdGVzdCB0aGF0IGNvbXBsZXRlbHkgbWF0Y2hlcyBhIGxpc3Qgb3B0aW9uLlxuICogT3RoZXJ3aXNlIGl0IGNsZWFycyB0aGUgaW5wdXQgYW5kIHNlbGVjdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBjb21wbGV0ZVNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsLCBzdGF0dXNFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgICAgaWYgKG9wdGlvbkVsLnRleHQudG9Mb3dlckNhc2UoKSA9PT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIG9wdGlvbkVsLnZhbHVlKTtcbiAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVzY2FwZSBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZG93biBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21JbnB1dCA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGxldCBuZXh0T3B0aW9uRWwgPVxuICAgIGxpc3RFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX0ZPQ1VTRUQpIHx8XG4gICAgbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT04pO1xuXG4gIGlmIChuZXh0T3B0aW9uRWwpIHtcbiAgICBoaWdobGlnaHRPcHRpb24oY29tYm9Cb3hFbCwgbmV4dE9wdGlvbkVsKTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZW50ZXIgZXZlbnQgZnJvbSBhbiBpbnB1dCBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21JbnB1dCA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGNvbXBsZXRlU2VsZWN0aW9uKGNvbWJvQm94RWwpO1xuXG4gIGlmIChsaXN0U2hvd24pIHtcbiAgICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZG93biBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IGZvY3VzZWRPcHRpb25FbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgbmV4dE9wdGlvbkVsID0gZm9jdXNlZE9wdGlvbkVsLm5leHRTaWJsaW5nO1xuXG4gIGlmIChuZXh0T3B0aW9uRWwpIHtcbiAgICBoaWdobGlnaHRPcHRpb24oZm9jdXNlZE9wdGlvbkVsLCBuZXh0T3B0aW9uRWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSB0YWIgZXZlbnQgZnJvbSBhbiBsaXN0IG9wdGlvbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVUYWJGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBzZWxlY3RJdGVtKGV2ZW50LnRhcmdldCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZW50ZXIgZXZlbnQgZnJvbSBsaXN0IG9wdGlvbiB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRW50ZXJGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBzZWxlY3RJdGVtKGV2ZW50LnRhcmdldCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgdXAgZXZlbnQgZnJvbSBsaXN0IG9wdGlvbiB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoXG4gICAgZXZlbnQudGFyZ2V0XG4gICk7XG4gIGNvbnN0IG5leHRPcHRpb25FbCA9IGZvY3VzZWRPcHRpb25FbCAmJiBmb2N1c2VkT3B0aW9uRWwucHJldmlvdXNTaWJsaW5nO1xuICBjb25zdCBsaXN0U2hvd24gPSAhbGlzdEVsLmhpZGRlbjtcblxuICBoaWdobGlnaHRPcHRpb24oY29tYm9Cb3hFbCwgbmV4dE9wdGlvbkVsKTtcblxuICBpZiAobGlzdFNob3duKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGlmICghbmV4dE9wdGlvbkVsKSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGxpc3Qgb3B0aW9uIG9uIHRoZSBtb3VzZW92ZXIgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxMSUVsZW1lbnR9IGxpc3RPcHRpb25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAobGlzdE9wdGlvbkVsKSA9PiB7XG4gIGNvbnN0IGlzQ3VycmVudGx5Rm9jdXNlZCA9IGxpc3RPcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTU1xuICApO1xuXG4gIGlmIChpc0N1cnJlbnRseUZvY3VzZWQpIHJldHVybjtcblxuICBoaWdobGlnaHRPcHRpb24obGlzdE9wdGlvbkVsLCBsaXN0T3B0aW9uRWwsIHtcbiAgICBwcmV2ZW50U2Nyb2xsOiB0cnVlLFxuICB9KTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIHRoZSBsaXN0IHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgdG9nZ2xlTGlzdCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9IGVsc2Uge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgaW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZnJvbSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlQ2xpY2tGcm9tSW5wdXQgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfVxufTtcblxuY29uc3QgY29tYm9Cb3ggPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtJTlBVVF0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGhhbmRsZUNsaWNrRnJvbUlucHV0KHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtUT0dHTEVfTElTVF9CVVRUT05dKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICB0b2dnbGVMaXN0KHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtMSVNUX09QVElPTl0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHNlbGVjdEl0ZW0odGhpcyk7XG4gICAgICB9LFxuICAgICAgW0NMRUFSX0lOUFVUX0JVVFRPTl0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGNsZWFySW5wdXQodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgZm9jdXNvdXQ6IHtcbiAgICAgIFtDT01CT19CT1hdKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIHJlc2V0U2VsZWN0aW9uKHRoaXMpO1xuICAgICAgICAgIGhpZGVMaXN0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW0NPTUJPX0JPWF06IGtleW1hcCh7XG4gICAgICAgIEVzY2FwZTogaGFuZGxlRXNjYXBlLFxuICAgICAgfSksXG4gICAgICBbSU5QVVRdOiBrZXltYXAoe1xuICAgICAgICBFbnRlcjogaGFuZGxlRW50ZXJGcm9tSW5wdXQsXG4gICAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21JbnB1dCxcbiAgICAgICAgRG93bjogaGFuZGxlRG93bkZyb21JbnB1dCxcbiAgICAgIH0pLFxuICAgICAgW0xJU1RfT1BUSU9OXToga2V5bWFwKHtcbiAgICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgVXA6IGhhbmRsZVVwRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21MaXN0T3B0aW9uLFxuICAgICAgICBEb3duOiBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIEVudGVyOiBoYW5kbGVFbnRlckZyb21MaXN0T3B0aW9uLFxuICAgICAgICBUYWI6IGhhbmRsZVRhYkZyb21MaXN0T3B0aW9uLFxuICAgICAgICBcIlNoaWZ0K1RhYlwiOiBub29wLFxuICAgICAgfSksXG4gICAgfSxcbiAgICBpbnB1dDoge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgY29uc3QgY29tYm9Cb3hFbCA9IHRoaXMuY2xvc2VzdChDT01CT19CT1gpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5yZW1vdmUoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgZGlzcGxheUxpc3QodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgbW91c2VvdmVyOiB7XG4gICAgICBbTElTVF9PUFRJT05dKCkge1xuICAgICAgICBoYW5kbGVNb3VzZW92ZXIodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChDT01CT19CT1gsIHJvb3QpLmZvckVhY2goKGNvbWJvQm94RWwpID0+IHtcbiAgICAgICAgZW5oYW5jZUNvbWJvQm94KGNvbWJvQm94RWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRDb21ib0JveENvbnRleHQsXG4gICAgZW5oYW5jZUNvbWJvQm94LFxuICAgIGdlbmVyYXRlRHluYW1pY1JlZ0V4cCxcbiAgICBkaXNhYmxlLFxuICAgIGVuYWJsZSxcbiAgICBkaXNwbGF5TGlzdCxcbiAgICBoaWRlTGlzdCxcbiAgICBDT01CT19CT1hfQ0xBU1MsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY29tYm9Cb3g7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi9ldmVudHNcIik7XG5jb25zdCBhY3RpdmVFbGVtZW50ID0gcmVxdWlyZShcIi4uL3V0aWxzL2FjdGl2ZS1lbGVtZW50XCIpO1xuY29uc3QgaXNJb3NEZXZpY2UgPSByZXF1aXJlKFwiLi4vdXRpbHMvaXMtaW9zLWRldmljZVwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcGlja2VyYDtcbmNvbnN0IERBVEVfUElDS0VSX1dSQVBQRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU30tLWluaXRpYWxpemVkYDtcbmNvbnN0IERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfS0tYWN0aXZlYDtcbmNvbnN0IERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19pbnRlcm5hbC1pbnB1dGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fZXh0ZXJuYWwtaW5wdXRgO1xuY29uc3QgREFURV9QSUNLRVJfQlVUVE9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19idXR0b25gO1xuY29uc3QgREFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2NhbGVuZGFyYDtcbmNvbnN0IERBVEVfUElDS0VSX1NUQVRVU19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fc3RhdHVzYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGVgO1xuXG5jb25zdCBDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUFJFVklPVVNfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcHJldmlvdXMtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLWN1cnJlbnQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLW5leHQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGVgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9UT0RBWV9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS10b2RheWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZS1zdGFydGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfRU5EX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGUtZW5kYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXdpdGhpbi1yYW5nZWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy15ZWFyYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQteWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtc2VsZWN0aW9uYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXNlbGVjdGlvbmA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9feWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfWUVBUl9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGUtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXBpY2tlcmA7XG5jb25zdCBDQUxFTkRBUl9UQUJMRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fdGFibGVgO1xuY29uc3QgQ0FMRU5EQVJfUk9XX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19yb3dgO1xuY29uc3QgQ0FMRU5EQVJfQ0VMTF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fY2VsbGA7XG5jb25zdCBDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTUyA9IGAke0NBTEVOREFSX0NFTExfQ0xBU1N9LS1jZW50ZXItaXRlbXNgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfTEFCRUxfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoLWxhYmVsYDtcbmNvbnN0IENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19kYXktb2Ytd2Vla2A7XG5cbmNvbnN0IERBVEVfUElDS0VSID0gYC4ke0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9CVVRUT04gPSBgLiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVCA9IGAuJHtEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVF9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVQgPSBgLiR7REFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0NBTEVOREFSID0gYC4ke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9TVEFUVVMgPSBgLiR7REFURV9QSUNLRVJfU1RBVFVTX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFID0gYC4ke0NBTEVOREFSX0RBVEVfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USCA9IGAuJHtDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVIgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEggPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUiA9IGAuJHtDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfTU9OVEggPSBgLiR7Q0FMRU5EQVJfTkVYVF9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT04gPSBgLiR7Q0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTiA9IGAuJHtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIID0gYC4ke0NBTEVOREFSX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSID0gYC4ke0NBTEVOREFSX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTksgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LID0gYC4ke0NBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSID0gYC4ke0NBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9GT0NVU0VEID0gYC4ke0NBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1N9YDtcblxuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlXCI7XG5cbmNvbnN0IE1PTlRIX0xBQkVMUyA9IFtcbiAgXCJKYW51YXJ5XCIsXG4gIFwiRmVicnVhcnlcIixcbiAgXCJNYXJjaFwiLFxuICBcIkFwcmlsXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuZVwiLFxuICBcIkp1bHlcIixcbiAgXCJBdWd1c3RcIixcbiAgXCJTZXB0ZW1iZXJcIixcbiAgXCJPY3RvYmVyXCIsXG4gIFwiTm92ZW1iZXJcIixcbiAgXCJEZWNlbWJlclwiLFxuXTtcblxuY29uc3QgREFZX09GX1dFRUtfTEFCRUxTID0gW1xuICBcIlN1bmRheVwiLFxuICBcIk1vbmRheVwiLFxuICBcIlR1ZXNkYXlcIixcbiAgXCJXZWRuZXNkYXlcIixcbiAgXCJUaHVyc2RheVwiLFxuICBcIkZyaWRheVwiLFxuICBcIlNhdHVyZGF5XCIsXG5dO1xuXG5jb25zdCBFTlRFUl9LRVlDT0RFID0gMTM7XG5cbmNvbnN0IFlFQVJfQ0hVTksgPSAxMjtcblxuY29uc3QgREVGQVVMVF9NSU5fREFURSA9IFwiMDAwMC0wMS0wMVwiO1xuY29uc3QgREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCA9IFwiTU0vREQvWVlZWVwiO1xuY29uc3QgSU5URVJOQUxfREFURV9GT1JNQVQgPSBcIllZWVktTU0tRERcIjtcblxuY29uc3QgTk9UX0RJU0FCTEVEX1NFTEVDVE9SID0gXCI6bm90KFtkaXNhYmxlZF0pXCI7XG5cbmNvbnN0IHByb2Nlc3NGb2N1c2FibGVTZWxlY3RvcnMgPSAoLi4uc2VsZWN0b3JzKSA9PlxuICBzZWxlY3RvcnMubWFwKChxdWVyeSkgPT4gcXVlcnkgKyBOT1RfRElTQUJMRURfU0VMRUNUT1IpLmpvaW4oXCIsIFwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUixcbiAgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEgsXG4gIENBTEVOREFSX1lFQVJfU0VMRUNUSU9OLFxuICBDQUxFTkRBUl9NT05USF9TRUxFQ1RJT04sXG4gIENBTEVOREFSX05FWFRfWUVBUixcbiAgQ0FMRU5EQVJfTkVYVF9NT05USCxcbiAgQ0FMRU5EQVJfREFURV9GT0NVU0VEXG4pO1xuXG5jb25zdCBNT05USF9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRFxuKTtcblxuY29uc3QgWUVBUl9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyxcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LLFxuICBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURcbik7XG5cbi8vICNyZWdpb24gRGF0ZSBNYW5pcHVsYXRpb24gRnVuY3Rpb25zXG5cbi8qKlxuICogS2VlcCBkYXRlIHdpdGhpbiBtb250aC4gTW9udGggd291bGQgb25seSBiZSBvdmVyIGJ5IDEgdG8gMyBkYXlzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9DaGVjayB0aGUgZGF0ZSBvYmplY3QgdG8gY2hlY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgY29ycmVjdCBtb250aFxuICogQHJldHVybnMge0RhdGV9IHRoZSBkYXRlLCBjb3JyZWN0ZWQgaWYgbmVlZGVkXG4gKi9cbmNvbnN0IGtlZXBEYXRlV2l0aGluTW9udGggPSAoZGF0ZVRvQ2hlY2ssIG1vbnRoKSA9PiB7XG4gIGlmIChtb250aCAhPT0gZGF0ZVRvQ2hlY2suZ2V0TW9udGgoKSkge1xuICAgIGRhdGVUb0NoZWNrLnNldERhdGUoMCk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRvQ2hlY2s7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIGZyb20gbW9udGggZGF5IHllYXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgbW9udGggdG8gc2V0ICh6ZXJvLWluZGV4ZWQpXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc2V0IGRhdGVcbiAqL1xuY29uc3Qgc2V0RGF0ZSA9ICh5ZWFyLCBtb250aCwgZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIGRhdGUpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogdG9kYXlzIGRhdGVcbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdG9kYXlzIGRhdGVcbiAqL1xuY29uc3QgdG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkYXkgPSBuZXdEYXRlLmdldERhdGUoKTtcbiAgY29uc3QgbW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IHllYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBzZXREYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIGxhc3QgZGF5IG9mIHRoZSBtb250aFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGxhc3REYXlPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBBZGQgZGF5cyB0byBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGREYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuICBuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IGRheXMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJEYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiBhZGREYXlzKF9kYXRlLCAtbnVtRGF5cyk7XG5cbi8qKlxuICogQWRkIHdlZWtzIHRvIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkV2Vla3MgPSAoX2RhdGUsIG51bVdlZWtzKSA9PiBhZGREYXlzKF9kYXRlLCBudW1XZWVrcyAqIDcpO1xuXG4vKipcbiAqIFN1YnRyYWN0IHdlZWtzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJXZWVrcyA9IChfZGF0ZSwgbnVtV2Vla3MpID0+IGFkZFdlZWtzKF9kYXRlLCAtbnVtV2Vla3MpO1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUgd2VlayAoU3VuZGF5KVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZldlZWsgPSAoX2RhdGUpID0+IHtcbiAgY29uc3QgZGF5T2ZXZWVrID0gX2RhdGUuZ2V0RGF5KCk7XG4gIHJldHVybiBzdWJEYXlzKF9kYXRlLCBkYXlPZldlZWspO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIChTYXR1cmRheSlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgZW5kT2ZXZWVrID0gKF9kYXRlKSA9PiB7XG4gIGNvbnN0IGRheU9mV2VlayA9IF9kYXRlLmdldERheSgpO1xuICByZXR1cm4gYWRkRGF5cyhfZGF0ZSwgNiAtIGRheU9mV2Vlayk7XG59O1xuXG4vKipcbiAqIEFkZCBtb250aHMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtTW9udGhzIHRoZSBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZE1vbnRocyA9IChfZGF0ZSwgbnVtTW9udGhzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IGRhdGVNb250aCA9IChuZXdEYXRlLmdldE1vbnRoKCkgKyAxMiArIG51bU1vbnRocykgJSAxMjtcbiAgbmV3RGF0ZS5zZXRNb250aChuZXdEYXRlLmdldE1vbnRoKCkgKyBudW1Nb250aHMpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIGRhdGVNb250aCk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IG1vbnRocyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bU1vbnRocyB0aGUgZGlmZmVyZW5jZSBpbiBtb250aHNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJNb250aHMgPSAoX2RhdGUsIG51bU1vbnRocykgPT4gYWRkTW9udGhzKF9kYXRlLCAtbnVtTW9udGhzKTtcblxuLyoqXG4gKiBBZGQgeWVhcnMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtWWVhcnMgdGhlIGRpZmZlcmVuY2UgaW4geWVhcnNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRZZWFycyA9IChfZGF0ZSwgbnVtWWVhcnMpID0+IGFkZE1vbnRocyhfZGF0ZSwgbnVtWWVhcnMgKiAxMik7XG5cbi8qKlxuICogU3VidHJhY3QgeWVhcnMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1ZZWFycyB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YlllYXJzID0gKF9kYXRlLCBudW1ZZWFycykgPT4gYWRkWWVhcnMoX2RhdGUsIC1udW1ZZWFycyk7XG5cbi8qKlxuICogU2V0IG1vbnRocyBvZiBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB6ZXJvLWluZGV4ZWQgbW9udGggdG8gc2V0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc2V0TW9udGggPSAoX2RhdGUsIG1vbnRoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIG5ld0RhdGUuc2V0TW9udGgobW9udGgpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU2V0IHllYXIgb2YgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzZXRZZWFyID0gKF9kYXRlLCB5ZWFyKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IG1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKHllYXIpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBlYXJsaWVzdCBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVhcmxpZXN0IGRhdGVcbiAqL1xuY29uc3QgbWluID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGVBO1xuXG4gIGlmIChkYXRlQiA8IGRhdGVBKSB7XG4gICAgbmV3RGF0ZSA9IGRhdGVCO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXRlc3QgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXRlc3QgZGF0ZVxuICovXG5jb25zdCBtYXggPSAoZGF0ZUEsIGRhdGVCKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZUE7XG5cbiAgaWYgKGRhdGVCID4gZGF0ZUEpIHtcbiAgICBuZXdEYXRlID0gZGF0ZUI7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIGluIHRoZSBzYW1lIHllYXJcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgaW4gdGhlIHNhbWUgeWVhclxuICovXG5jb25zdCBpc1NhbWVZZWFyID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICByZXR1cm4gZGF0ZUEgJiYgZGF0ZUIgJiYgZGF0ZUEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZUIuZ2V0RnVsbFllYXIoKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgYXJlIHRoZSBpbiB0aGUgc2FtZSBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyBpbiB0aGUgc2FtZSBtb250aFxuICovXG5jb25zdCBpc1NhbWVNb250aCA9IChkYXRlQSwgZGF0ZUIpID0+IHtcbiAgcmV0dXJuIGlzU2FtZVllYXIoZGF0ZUEsIGRhdGVCKSAmJiBkYXRlQS5nZXRNb250aCgpID09PSBkYXRlQi5nZXRNb250aCgpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIHNhbWUgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgdGhlIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSB0aGUgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIHRoZSBzYW1lIGRhdGVcbiAqL1xuY29uc3QgaXNTYW1lRGF5ID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICByZXR1cm4gaXNTYW1lTW9udGgoZGF0ZUEsIGRhdGVCKSAmJiBkYXRlQS5nZXREYXRlKCkgPT09IGRhdGVCLmdldERhdGUoKTtcbn07XG5cbi8qKlxuICogcmV0dXJuIGEgbmV3IGRhdGUgd2l0aGluIG1pbmltdW0gYW5kIG1heGltdW0gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heFxuICovXG5jb25zdCBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGU7XG5cbiAgaWYgKGRhdGUgPCBtaW5EYXRlKSB7XG4gICAgbmV3RGF0ZSA9IG1pbkRhdGU7XG4gIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBkYXRlID4gbWF4RGF0ZSkge1xuICAgIG5ld0RhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZXJlIGEgZGF5IHdpdGhpbiB0aGUgbW9udGggd2l0aGluIG1pbiBhbmQgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZVdpdGhpbk1pbkFuZE1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBkYXRlID49IG1pbkRhdGUgJiYgKCFtYXhEYXRlIHx8IGRhdGUgPD0gbWF4RGF0ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgbW9udGggaXMgaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlIG1vbnRoIG91dHNpZGUgbWluIG9yIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVzTW9udGhPdXRzaWRlTWluT3JNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT4ge1xuICByZXR1cm4gKFxuICAgIGxhc3REYXlPZk1vbnRoKGRhdGUpIDwgbWluRGF0ZSB8fCAobWF4RGF0ZSAmJiBzdGFydE9mTW9udGgoZGF0ZSkgPiBtYXhEYXRlKVxuICApO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyB5ZWFyIGlzIGludmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZSBtb250aCBvdXRzaWRlIG1pbiBvciBtYXggZGF0ZXNcbiAqL1xuY29uc3QgaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT4ge1xuICByZXR1cm4gKFxuICAgIGxhc3REYXlPZk1vbnRoKHNldE1vbnRoKGRhdGUsIDExKSkgPCBtaW5EYXRlIHx8XG4gICAgKG1heERhdGUgJiYgc3RhcnRPZk1vbnRoKHNldE1vbnRoKGRhdGUsIDApKSA+IG1heERhdGUpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIGEgZGF0ZSB3aXRoIGZvcm1hdCBNLUQtWVlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0cmluZyB0aGUgZGF0ZSBzdHJpbmcgdG8gcGFyc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRm9ybWF0IHRoZSBmb3JtYXQgb2YgdGhlIGRhdGUgc3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFkanVzdERhdGUgc2hvdWxkIHRoZSBkYXRlIGJlIGFkanVzdGVkXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlXG4gKi9cbmNvbnN0IHBhcnNlRGF0ZVN0cmluZyA9IChcbiAgZGF0ZVN0cmluZyxcbiAgZGF0ZUZvcm1hdCA9IElOVEVSTkFMX0RBVEVfRk9STUFULFxuICBhZGp1c3REYXRlID0gZmFsc2VcbikgPT4ge1xuICBsZXQgZGF0ZTtcbiAgbGV0IG1vbnRoO1xuICBsZXQgZGF5O1xuICBsZXQgeWVhcjtcbiAgbGV0IHBhcnNlZDtcblxuICBpZiAoZGF0ZVN0cmluZykge1xuICAgIGxldCBtb250aFN0ciwgZGF5U3RyLCB5ZWFyU3RyO1xuXG4gICAgaWYgKGRhdGVGb3JtYXQgPT09IERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpIHtcbiAgICAgIFttb250aFN0ciwgZGF5U3RyLCB5ZWFyU3RyXSA9IGRhdGVTdHJpbmcuc3BsaXQoXCIvXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBbeWVhclN0ciwgbW9udGhTdHIsIGRheVN0cl0gPSBkYXRlU3RyaW5nLnNwbGl0KFwiLVwiKTtcbiAgICB9XG5cbiAgICBpZiAoeWVhclN0cikge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQoeWVhclN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICB5ZWFyID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIHllYXIgPSBNYXRoLm1heCgwLCB5ZWFyKTtcbiAgICAgICAgICBpZiAoeWVhclN0ci5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IHRvZGF5KCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyU3R1YiA9XG4gICAgICAgICAgICAgIGN1cnJlbnRZZWFyIC0gKGN1cnJlbnRZZWFyICUgMTAgKiogeWVhclN0ci5sZW5ndGgpO1xuICAgICAgICAgICAgeWVhciA9IGN1cnJlbnRZZWFyU3R1YiArIHBhcnNlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9udGhTdHIpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KG1vbnRoU3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIG1vbnRoID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIG1vbnRoID0gTWF0aC5tYXgoMSwgbW9udGgpO1xuICAgICAgICAgIG1vbnRoID0gTWF0aC5taW4oMTIsIG1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aCAmJiBkYXlTdHIgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludChkYXlTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgZGF5ID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIGNvbnN0IGxhc3REYXlPZlRoZU1vbnRoID0gc2V0RGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGRheSA9IE1hdGgubWF4KDEsIGRheSk7XG4gICAgICAgICAgZGF5ID0gTWF0aC5taW4obGFzdERheU9mVGhlTW9udGgsIGRheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9udGggJiYgZGF5ICYmIHllYXIgIT0gbnVsbCkge1xuICAgICAgZGF0ZSA9IHNldERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlO1xufTtcblxuLyoqXG4gKiBGb3JtYXQgYSBkYXRlIHRvIGZvcm1hdCBNTS1ERC1ZWVlZXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIHRoZSBkYXRlIHRvIGZvcm1hdFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZSBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqL1xuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlLCBkYXRlRm9ybWF0ID0gSU5URVJOQUxfREFURV9GT1JNQVQpID0+IHtcbiAgY29uc3QgcGFkWmVyb3MgPSAodmFsdWUsIGxlbmd0aCkgPT4ge1xuICAgIHJldHVybiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcbiAgfTtcblxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChkYXRlRm9ybWF0ID09PSBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKSB7XG4gICAgcmV0dXJuIFtwYWRaZXJvcyhtb250aCwgMiksIHBhZFplcm9zKGRheSwgMiksIHBhZFplcm9zKHllYXIsIDQpXS5qb2luKFwiL1wiKTtcbiAgfVxuXG4gIHJldHVybiBbcGFkWmVyb3MoeWVhciwgNCksIHBhZFplcm9zKG1vbnRoLCAyKSwgcGFkWmVyb3MoZGF5LCAyKV0uam9pbihcIi1cIik7XG59O1xuXG4vLyAjZW5kcmVnaW9uIERhdGUgTWFuaXB1bGF0aW9uIEZ1bmN0aW9uc1xuXG4vKipcbiAqIENyZWF0ZSBhIGdyaWQgc3RyaW5nIGZyb20gYW4gYXJyYXkgb2YgaHRtbCBzdHJpbmdzXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gaHRtbEFycmF5IHRoZSBhcnJheSBvZiBodG1sIGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gcm93U2l6ZSB0aGUgbGVuZ3RoIG9mIGEgcm93XG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZ3JpZCBzdHJpbmdcbiAqL1xuY29uc3QgbGlzdFRvR3JpZEh0bWwgPSAoaHRtbEFycmF5LCByb3dTaXplKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgbGV0IHJvdyA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoKSB7XG4gICAgcm93ID0gW107XG4gICAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoICYmIHJvdy5sZW5ndGggPCByb3dTaXplKSB7XG4gICAgICByb3cucHVzaChgPHRkPiR7aHRtbEFycmF5W2ldfTwvdGQ+YCk7XG4gICAgICBpICs9IDE7XG4gICAgfVxuICAgIGdyaWQucHVzaChgPHRyPiR7cm93LmpvaW4oXCJcIil9PC90cj5gKTtcbiAgfVxuXG4gIHJldHVybiBncmlkLmpvaW4oXCJcIik7XG59O1xuXG4vKipcbiAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgYW5kIGRpc3BhdGNoIGEgY2hhbmdlIGV2ZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBUaGUgZWxlbWVudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gKi9cbmNvbnN0IGNoYW5nZUVsZW1lbnRWYWx1ZSA9IChlbCwgdmFsdWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9IGVsO1xuICBlbGVtZW50VG9DaGFuZ2UudmFsdWUgPSB2YWx1ZTtcblxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyB2YWx1ZSB9LFxuICB9KTtcbiAgZWxlbWVudFRvQ2hhbmdlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBkYXRlIHBpY2tlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IERhdGVQaWNrZXJDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBjYWxlbmRhckVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRlUGlja2VyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW50ZXJuYWxJbnB1dEVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGV4dGVybmFsSW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gc3RhdHVzRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGZpcnN0WWVhckNodW5rRWxcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gY2FsZW5kYXJEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IG1pbkRhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gbWF4RGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBzZWxlY3RlZERhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gcmFuZ2VEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IGRlZmF1bHREYXRlXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICogQHJldHVybnMge0RhdGVQaWNrZXJDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXREYXRlUGlja2VyQ29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBkYXRlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUElDS0VSKTtcblxuICBpZiAoIWRhdGVQaWNrZXJFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7REFURV9QSUNLRVJ9YCk7XG4gIH1cblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVFxuICApO1xuICBjb25zdCBleHRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVFxuICApO1xuICBjb25zdCBjYWxlbmRhckVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoREFURV9QSUNLRVJfQ0FMRU5EQVIpO1xuICBjb25zdCB0b2dnbGVCdG5FbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKERBVEVfUElDS0VSX0JVVFRPTik7XG4gIGNvbnN0IHN0YXR1c0VsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoREFURV9QSUNLRVJfU1RBVFVTKTtcbiAgY29uc3QgZmlyc3RZZWFyQ2h1bmtFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVIpO1xuXG4gIGNvbnN0IGlucHV0RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhcbiAgICBleHRlcm5hbElucHV0RWwudmFsdWUsXG4gICAgREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCxcbiAgICB0cnVlXG4gICk7XG4gIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhpbnRlcm5hbElucHV0RWwudmFsdWUpO1xuXG4gIGNvbnN0IGNhbGVuZGFyRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhjYWxlbmRhckVsLmRhdGFzZXQudmFsdWUpO1xuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpO1xuICBjb25zdCBtYXhEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUpO1xuICBjb25zdCByYW5nZURhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQucmFuZ2VEYXRlKTtcbiAgY29uc3QgZGVmYXVsdERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQuZGVmYXVsdERhdGUpO1xuXG4gIGlmIChtaW5EYXRlICYmIG1heERhdGUgJiYgbWluRGF0ZSA+IG1heERhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pbXVtIGRhdGUgY2Fubm90IGJlIGFmdGVyIG1heGltdW0gZGF0ZVwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FsZW5kYXJEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgdG9nZ2xlQnRuRWwsXG4gICAgc2VsZWN0ZWREYXRlLFxuICAgIG1heERhdGUsXG4gICAgZmlyc3RZZWFyQ2h1bmtFbCxcbiAgICBkYXRlUGlja2VyRWwsXG4gICAgaW5wdXREYXRlLFxuICAgIGludGVybmFsSW5wdXRFbCxcbiAgICBleHRlcm5hbElucHV0RWwsXG4gICAgY2FsZW5kYXJFbCxcbiAgICByYW5nZURhdGUsXG4gICAgZGVmYXVsdERhdGUsXG4gICAgc3RhdHVzRWwsXG4gIH07XG59O1xuXG4vKipcbiAqIERpc2FibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgdG9nZ2xlQnRuRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICB0b2dnbGVCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGV4dGVybmFsSW5wdXRFbC5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwsIHRvZ2dsZUJ0bkVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgdG9nZ2xlQnRuRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgZXh0ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG4vLyAjcmVnaW9uIFZhbGlkYXRpb25cblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgdmFsdWUgaW4gdGhlIGlucHV0IGFzIGEgdmFsaWQgZGF0ZSBvZiBmb3JtYXQgTS9EL1lZWVlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGlzRGF0ZUlucHV0SW52YWxpZCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGNvbnN0IGRhdGVTdHJpbmcgPSBleHRlcm5hbElucHV0RWwudmFsdWU7XG4gIGxldCBpc0ludmFsaWQgPSBmYWxzZTtcblxuICBpZiAoZGF0ZVN0cmluZykge1xuICAgIGlzSW52YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCBkYXRlU3RyaW5nUGFydHMgPSBkYXRlU3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICBjb25zdCBbbW9udGgsIGRheSwgeWVhcl0gPSBkYXRlU3RyaW5nUGFydHMubWFwKChzdHIpID0+IHtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkgdmFsdWUgPSBwYXJzZWQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAobW9udGggJiYgZGF5ICYmIHllYXIgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY2hlY2tEYXRlID0gc2V0RGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY2hlY2tEYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoIC0gMSAmJlxuICAgICAgICBjaGVja0RhdGUuZ2V0RGF0ZSgpID09PSBkYXkgJiZcbiAgICAgICAgY2hlY2tEYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiZcbiAgICAgICAgZGF0ZVN0cmluZ1BhcnRzWzJdLmxlbmd0aCA9PT0gNCAmJlxuICAgICAgICBpc0RhdGVXaXRoaW5NaW5BbmRNYXgoY2hlY2tEYXRlLCBtaW5EYXRlLCBtYXhEYXRlKVxuICAgICAgKSB7XG4gICAgICAgIGlzSW52YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0ludmFsaWQ7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgYXMgYSB2YWxpZCBkYXRlIG9mIGZvcm1hdCBNL0QvWVlZWVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdmFsaWRhdGVEYXRlSW5wdXQgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgaXNJbnZhbGlkID0gaXNEYXRlSW5wdXRJbnZhbGlkKGV4dGVybmFsSW5wdXRFbCk7XG5cbiAgaWYgKGlzSW52YWxpZCAmJiAhZXh0ZXJuYWxJbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgZXh0ZXJuYWxJbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFZBTElEQVRJT05fTUVTU0FHRSk7XG4gIH1cblxuICBpZiAoIWlzSW52YWxpZCAmJiBleHRlcm5hbElucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2UgPT09IFZBTElEQVRJT05fTUVTU0FHRSkge1xuICAgIGV4dGVybmFsSW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBWYWxpZGF0aW9uXG5cbi8qKlxuICogRW5hYmxlIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHJlY29uY2lsZUlucHV0VmFsdWVzID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW50ZXJuYWxJbnB1dEVsLCBpbnB1dERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgbGV0IG5ld1ZhbHVlID0gXCJcIjtcblxuICBpZiAoaW5wdXREYXRlICYmICFpc0RhdGVJbnB1dEludmFsaWQoZWwpKSB7XG4gICAgbmV3VmFsdWUgPSBmb3JtYXREYXRlKGlucHV0RGF0ZSk7XG4gIH1cblxuICBpZiAoaW50ZXJuYWxJbnB1dEVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnRlcm5hbElucHV0RWwsIG5ld1ZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgdGhlIHZhbHVlIG9mIHRoZSBkYXRlIHBpY2tlciBpbnB1dHMuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdHJpbmcgVGhlIGRhdGUgc3RyaW5nIHRvIHVwZGF0ZSBpbiBZWVlZLU1NLUREIGZvcm1hdFxuICovXG5jb25zdCBzZXRDYWxlbmRhclZhbHVlID0gKGVsLCBkYXRlU3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBhcnNlZERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZyk7XG5cbiAgaWYgKHBhcnNlZERhdGUpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGVQaWNrZXJFbCxcbiAgICAgIGludGVybmFsSW5wdXRFbCxcbiAgICAgIGV4dGVybmFsSW5wdXRFbCxcbiAgICB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgZGF0ZVN0cmluZyk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGV4dGVybmFsSW5wdXRFbCwgZm9ybWF0dGVkRGF0ZSk7XG5cbiAgICB2YWxpZGF0ZURhdGVJbnB1dChkYXRlUGlja2VyRWwpO1xuICB9XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5oYW5jZURhdGVQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1BJQ0tFUik7XG4gIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IGRhdGVQaWNrZXJFbC5kYXRhc2V0LmRlZmF1bHRWYWx1ZTtcblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihgaW5wdXRgKTtcblxuICBpZiAoIWludGVybmFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtEQVRFX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC52YWx1ZSkge1xuICAgIGludGVybmFsSW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1pblwiKVxuICApO1xuICBkYXRlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlID0gbWluRGF0ZVxuICAgID8gZm9ybWF0RGF0ZShtaW5EYXRlKVxuICAgIDogREVGQVVMVF9NSU5fREFURTtcblxuICBjb25zdCBtYXhEYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heFwiKVxuICApO1xuICBpZiAobWF4RGF0ZSkge1xuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgPSBmb3JtYXREYXRlKG1heERhdGUpO1xuICB9XG5cbiAgY29uc3QgY2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyk7XG5cbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gaW50ZXJuYWxJbnB1dEVsLmNsb25lTm9kZSgpO1xuICBleHRlcm5hbElucHV0RWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyk7XG4gIGV4dGVybmFsSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XG5cbiAgY2FsZW5kYXJXcmFwcGVyLmFwcGVuZENoaWxkKGV4dGVybmFsSW5wdXRFbCk7XG4gIGNhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBbXG4gICAgICBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke0RBVEVfUElDS0VSX0JVVFRPTl9DTEFTU31cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgY2FsZW5kYXJcIj4mbmJzcDs8L2J1dHRvbj5gLFxuICAgICAgYDxkaXYgY2xhc3M9XCIke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGhpZGRlbj48L2Rpdj5gLFxuICAgICAgYDxkaXYgY2xhc3M9XCJ1c2Etc3Itb25seSAke0RBVEVfUElDS0VSX1NUQVRVU19DTEFTU31cIiByb2xlPVwic3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCI+PC9kaXY+YCxcbiAgICBdLmpvaW4oXCJcIilcbiAgKTtcblxuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaW50ZXJuYWxJbnB1dEVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MpO1xuICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICBpbnRlcm5hbElucHV0RWwucmVxdWlyZWQgPSBmYWxzZTtcblxuICBkYXRlUGlja2VyRWwuYXBwZW5kQ2hpbGQoY2FsZW5kYXJXcmFwcGVyKTtcbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MpO1xuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBzZXRDYWxlbmRhclZhbHVlKGRhdGVQaWNrZXJFbCwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGRhdGVQaWNrZXJFbCk7XG4gICAgaW50ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBEYXRlIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogcmVuZGVyIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlVG9EaXNwbGF5IGEgZGF0ZSB0byByZW5kZXIgb24gdGhlIGNhbGVuZGFyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IGEgcmVmZXJlbmNlIHRvIHRoZSBuZXcgY2FsZW5kYXIgZWxlbWVudFxuICovXG5jb25zdCByZW5kZXJDYWxlbmRhciA9IChlbCwgX2RhdGVUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3Qge1xuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHN0YXR1c0VsLFxuICAgIHNlbGVjdGVkRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgcmFuZ2VEYXRlLFxuICB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB0b2RheXNEYXRlID0gdG9kYXkoKTtcbiAgbGV0IGRhdGVUb0Rpc3BsYXkgPSBfZGF0ZVRvRGlzcGxheSB8fCB0b2RheXNEYXRlO1xuXG4gIGNvbnN0IGNhbGVuZGFyV2FzSGlkZGVuID0gY2FsZW5kYXJFbC5oaWRkZW47XG5cbiAgY29uc3QgZm9jdXNlZERhdGUgPSBhZGREYXlzKGRhdGVUb0Rpc3BsYXksIDApO1xuICBjb25zdCBmb2N1c2VkTW9udGggPSBkYXRlVG9EaXNwbGF5LmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0gZGF0ZVRvRGlzcGxheS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IHByZXZNb250aCA9IHN1Yk1vbnRocyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRhdGVUb0Rpc3BsYXksIDEpO1xuXG4gIGNvbnN0IGN1cnJlbnRGb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShkYXRlVG9EaXNwbGF5KTtcblxuICBjb25zdCBmaXJzdE9mTW9udGggPSBzdGFydE9mTW9udGgoZGF0ZVRvRGlzcGxheSk7XG4gIGNvbnN0IHByZXZCdXR0b25zRGlzYWJsZWQgPSBpc1NhbWVNb250aChkYXRlVG9EaXNwbGF5LCBtaW5EYXRlKTtcbiAgY29uc3QgbmV4dEJ1dHRvbnNEaXNhYmxlZCA9IGlzU2FtZU1vbnRoKGRhdGVUb0Rpc3BsYXksIG1heERhdGUpO1xuXG4gIGNvbnN0IHJhbmdlQ29uY2x1c2lvbkRhdGUgPSBzZWxlY3RlZERhdGUgfHwgZGF0ZVRvRGlzcGxheTtcbiAgY29uc3QgcmFuZ2VTdGFydERhdGUgPSByYW5nZURhdGUgJiYgbWluKHJhbmdlQ29uY2x1c2lvbkRhdGUsIHJhbmdlRGF0ZSk7XG4gIGNvbnN0IHJhbmdlRW5kRGF0ZSA9IHJhbmdlRGF0ZSAmJiBtYXgocmFuZ2VDb25jbHVzaW9uRGF0ZSwgcmFuZ2VEYXRlKTtcblxuICBjb25zdCB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRGF0ZSAmJiBhZGREYXlzKHJhbmdlU3RhcnREYXRlLCAxKTtcbiAgY29uc3Qgd2l0aGluUmFuZ2VFbmREYXRlID0gcmFuZ2VEYXRlICYmIHN1YkRheXMocmFuZ2VFbmREYXRlLCAxKTtcblxuICBjb25zdCBtb250aExhYmVsID0gTU9OVEhfTEFCRUxTW2ZvY3VzZWRNb250aF07XG5cbiAgY29uc3QgZ2VuZXJhdGVEYXRlSHRtbCA9IChkYXRlVG9SZW5kZXIpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX0RBVEVfQ0xBU1NdO1xuICAgIGNvbnN0IGRheSA9IGRhdGVUb1JlbmRlci5nZXREYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlVG9SZW5kZXIuZ2V0TW9udGgoKTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZVRvUmVuZGVyLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZVRvUmVuZGVyLmdldERheSgpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUoZGF0ZVRvUmVuZGVyKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSAhaXNEYXRlV2l0aGluTWluQW5kTWF4KGRhdGVUb1JlbmRlciwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHNlbGVjdGVkRGF0ZSk7XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBwcmV2TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9QUkVWSU9VU19NT05USF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZU1vbnRoKGRhdGVUb1JlbmRlciwgZm9jdXNlZERhdGUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBuZXh0TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCB0b2RheXNEYXRlKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfVE9EQVlfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChyYW5nZURhdGUpIHtcbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZURhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VTdGFydERhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VFbmREYXRlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0VORF9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaXNEYXRlV2l0aGluTWluQW5kTWF4KFxuICAgICAgICAgIGRhdGVUb1JlbmRlcixcbiAgICAgICAgICB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSxcbiAgICAgICAgICB3aXRoaW5SYW5nZUVuZERhdGVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIGZvY3VzZWREYXRlKSkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoU3RyID0gTU9OVEhfTEFCRUxTW21vbnRoXTtcbiAgICBjb25zdCBkYXlTdHIgPSBEQVlfT0ZfV0VFS19MQUJFTFNbZGF5T2ZXZWVrXTtcblxuICAgIHJldHVybiBgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICB0YWJpbmRleD1cIiR7dGFiaW5kZXh9XCJcbiAgICAgIGNsYXNzPVwiJHtjbGFzc2VzLmpvaW4oXCIgXCIpfVwiXG4gICAgICBkYXRhLWRheT1cIiR7ZGF5fVwiXG4gICAgICBkYXRhLW1vbnRoPVwiJHttb250aCArIDF9XCJcbiAgICAgIGRhdGEteWVhcj1cIiR7eWVhcn1cIlxuICAgICAgZGF0YS12YWx1ZT1cIiR7Zm9ybWF0dGVkRGF0ZX1cIlxuICAgICAgYXJpYS1sYWJlbD1cIiR7ZGF5fSAke21vbnRoU3RyfSAke3llYXJ9ICR7ZGF5U3RyfVwiXG4gICAgICBhcmlhLXNlbGVjdGVkPVwiJHtpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XCJcbiAgICAgICR7aXNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICA+JHtkYXl9PC9idXR0b24+YDtcbiAgfTtcblxuICAvLyBzZXQgZGF0ZSB0byBmaXJzdCByZW5kZXJlZCBkYXlcbiAgZGF0ZVRvRGlzcGxheSA9IHN0YXJ0T2ZXZWVrKGZpcnN0T2ZNb250aCk7XG5cbiAgY29uc3QgZGF5cyA9IFtdO1xuXG4gIHdoaWxlIChcbiAgICBkYXlzLmxlbmd0aCA8IDI4IHx8XG4gICAgZGF0ZVRvRGlzcGxheS5nZXRNb250aCgpID09PSBmb2N1c2VkTW9udGggfHxcbiAgICBkYXlzLmxlbmd0aCAlIDcgIT09IDBcbiAgKSB7XG4gICAgZGF5cy5wdXNoKGdlbmVyYXRlRGF0ZUh0bWwoZGF0ZVRvRGlzcGxheSkpO1xuICAgIGRhdGVUb0Rpc3BsYXkgPSBhZGREYXlzKGRhdGVUb0Rpc3BsYXksIDEpO1xuICB9XG5cbiAgY29uc3QgZGF0ZXNIdG1sID0gbGlzdFRvR3JpZEh0bWwoZGF5cywgNyk7XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBjYWxlbmRhckVsLmNsb25lTm9kZSgpO1xuICBuZXdDYWxlbmRhci5kYXRhc2V0LnZhbHVlID0gY3VycmVudEZvcm1hdHRlZERhdGU7XG4gIG5ld0NhbGVuZGFyLnN0eWxlLnRvcCA9IGAke2RhdGVQaWNrZXJFbC5vZmZzZXRIZWlnaHR9cHhgO1xuICBuZXdDYWxlbmRhci5oaWRkZW4gPSBmYWxzZTtcbiAgbmV3Q2FsZW5kYXIuaW5uZXJIVE1MID0gYDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX1JPV19DTEFTU31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgYmFjayBvbmUgeWVhclwiXG4gICAgICAgICAgICAke3ByZXZCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPiZuYnNwOzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgb25lIG1vbnRoXCJcbiAgICAgICAgICAgICR7cHJldkJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+Jm5ic3A7PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX01PTlRIX0xBQkVMX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiJHttb250aExhYmVsfS4gQ2xpY2sgdG8gc2VsZWN0IG1vbnRoXCJcbiAgICAgICAgICA+JHttb250aExhYmVsfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCIke2ZvY3VzZWRZZWFyfS4gQ2xpY2sgdG8gc2VsZWN0IHllYXJcIlxuICAgICAgICAgID4ke2ZvY3VzZWRZZWFyfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGhcIlxuICAgICAgICAgICAgJHtuZXh0QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID4mbmJzcDs8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhclwiXG4gICAgICAgICAgICAke25leHRCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPiZuYnNwOzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHRhYmxlIGNsYXNzPVwiJHtDQUxFTkRBUl9UQUJMRV9DTEFTU31cIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGggY2xhc3M9XCIke0NBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTfVwiIHNjb3BlPVwiY29sXCIgYXJpYS1sYWJlbD1cIlN1bmRheVwiPlM8L3RoPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVlfT0ZfV0VFS19DTEFTU31cIiBzY29wZT1cImNvbFwiIGFyaWEtbGFiZWw9XCJNb25kYXlcIj5NPC90aD5cbiAgICAgICAgICAgIDx0aCBjbGFzcz1cIiR7Q0FMRU5EQVJfREFZX09GX1dFRUtfQ0xBU1N9XCIgc2NvcGU9XCJjb2xcIiBhcmlhLWxhYmVsPVwiVHVlc2RheVwiPlQ8L3RoPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVlfT0ZfV0VFS19DTEFTU31cIiBzY29wZT1cImNvbFwiIGFyaWEtbGFiZWw9XCJXZWRuZXNkYXlcIj5XPC90aD5cbiAgICAgICAgICAgIDx0aCBjbGFzcz1cIiR7Q0FMRU5EQVJfREFZX09GX1dFRUtfQ0xBU1N9XCIgc2NvcGU9XCJjb2xcIiBhcmlhLWxhYmVsPVwiVGh1cnNkYXlcIj5UaDwvdGg+XG4gICAgICAgICAgICA8dGggY2xhc3M9XCIke0NBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTfVwiIHNjb3BlPVwiY29sXCIgYXJpYS1sYWJlbD1cIkZyaWRheVwiPkY8L3RoPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVlfT0ZfV0VFS19DTEFTU31cIiBzY29wZT1cImNvbFwiIGFyaWEtbGFiZWw9XCJTYXR1cmRheVwiPlM8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAke2RhdGVzSHRtbH1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+YDtcblxuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBkYXRlUGlja2VyRWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9BQ1RJVkVfQ0xBU1MpO1xuXG4gIGNvbnN0IHN0YXR1c2VzID0gW107XG5cbiAgaWYgKGlzU2FtZURheShzZWxlY3RlZERhdGUsIGZvY3VzZWREYXRlKSkge1xuICAgIHN0YXR1c2VzLnB1c2goXCJTZWxlY3RlZCBkYXRlXCIpO1xuICB9XG5cbiAgaWYgKGNhbGVuZGFyV2FzSGlkZGVuKSB7XG4gICAgc3RhdHVzZXMucHVzaChcbiAgICAgIFwiWW91IGNhbiBuYXZpZ2F0ZSBieSBkYXkgdXNpbmcgbGVmdCBhbmQgcmlnaHQgYXJyb3dzXCIsXG4gICAgICBcIldlZWtzIGJ5IHVzaW5nIHVwIGFuZCBkb3duIGFycm93c1wiLFxuICAgICAgXCJNb250aHMgYnkgdXNpbmcgcGFnZSB1cCBhbmQgcGFnZSBkb3duIGtleXNcIixcbiAgICAgIFwiWWVhcnMgYnkgdXNpbmcgc2hpZnQgcGx1cyBwYWdlIHVwIGFuZCBzaGlmdCBwbHVzIHBhZ2UgZG93blwiLFxuICAgICAgXCJIb21lIGFuZCBlbmQga2V5cyBuYXZpZ2F0ZSB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSB3ZWVrXCJcbiAgICApO1xuICAgIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXNlcy5wdXNoKGAke21vbnRoTGFiZWx9ICR7Zm9jdXNlZFllYXJ9YCk7XG4gIH1cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBzdGF0dXNlcy5qb2luKFwiLiBcIik7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNZZWFyID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBfYnV0dG9uRWxcbiAgKTtcbiAgbGV0IGRhdGUgPSBzdWJZZWFycyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfWUVBUik7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IF9idXR0b25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c01vbnRoID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBfYnV0dG9uRWxcbiAgKTtcbiAgbGV0IGRhdGUgPSBzdWJNb250aHMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRNb250aCA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgX2J1dHRvbkVsXG4gICk7XG4gIGxldCBkYXRlID0gYWRkTW9udGhzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dFllYXIgPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KFxuICAgIF9idXR0b25FbFxuICApO1xuICBsZXQgZGF0ZSA9IGFkZFllYXJzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX1lFQVIpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhpZGUgdGhlIGNhbGVuZGFyIG9mIGEgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGlkZUNhbGVuZGFyID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBjYWxlbmRhckVsLCBzdGF0dXNFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGRhdGVQaWNrZXJFbC5jbGFzc0xpc3QucmVtb3ZlKERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyk7XG4gIGNhbGVuZGFyRWwuaGlkZGVuID0gdHJ1ZTtcbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlwiO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSBkYXRlIHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNhbGVuZGFyRGF0ZUVsIEEgZGF0ZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdERhdGUgPSAoY2FsZW5kYXJEYXRlRWwpID0+IHtcbiAgaWYgKGNhbGVuZGFyRGF0ZUVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGV4dGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgY2FsZW5kYXJEYXRlRWxcbiAgKTtcblxuICBzZXRDYWxlbmRhclZhbHVlKGNhbGVuZGFyRGF0ZUVsLCBjYWxlbmRhckRhdGVFbC5kYXRhc2V0LnZhbHVlKTtcbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG5cbiAgZXh0ZXJuYWxJbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVDYWxlbmRhciA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyRWwsXG4gICAgaW5wdXREYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBkZWZhdWx0RGF0ZSxcbiAgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBpZiAoY2FsZW5kYXJFbC5oaWRkZW4pIHtcbiAgICBjb25zdCBkYXRlVG9EaXNwbGF5ID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KFxuICAgICAgaW5wdXREYXRlIHx8IGRlZmF1bHREYXRlIHx8IHRvZGF5KCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlQ2FsZW5kYXIoZWwpO1xuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2FsZW5kYXIgd2hlbiB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICovXG5jb25zdCB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGlucHV0RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBjYWxlbmRhclNob3duID0gIWNhbGVuZGFyRWwuaGlkZGVuO1xuXG4gIGlmIChjYWxlbmRhclNob3duICYmIGlucHV0RGF0ZSkge1xuICAgIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIERhdGUgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG4vKipcbiAqIERpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlNb250aFNlbGVjdGlvbiA9IChlbCwgbW9udGhUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyRWwsXG4gICAgc3RhdHVzRWwsXG4gICAgY2FsZW5kYXJEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gY2FsZW5kYXJEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRNb250aCA9IG1vbnRoVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZE1vbnRoIDogbW9udGhUb0Rpc3BsYXk7XG5cbiAgY29uc3QgbW9udGhzID0gTU9OVEhfTEFCRUxTLm1hcCgobW9udGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbW9udGhUb0NoZWNrID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBpbmRleCk7XG5cbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc01vbnRoT3V0c2lkZU1pbk9yTWF4KFxuICAgICAgbW9udGhUb0NoZWNrLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGVcbiAgICApO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtDQUxFTkRBUl9NT05USF9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZE1vbnRoO1xuXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2VkTW9udGgpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICB0YWJpbmRleD1cIiR7dGFiaW5kZXh9XCJcbiAgICAgICAgY2xhc3M9XCIke2NsYXNzZXMuam9pbihcIiBcIil9XCJcbiAgICAgICAgZGF0YS12YWx1ZT1cIiR7aW5kZXh9XCJcbiAgICAgICAgZGF0YS1sYWJlbD1cIiR7bW9udGh9XCJcbiAgICAgICAgYXJpYS1zZWxlY3RlZD1cIiR7aXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVwiXG4gICAgICAgICR7aXNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgID4ke21vbnRofTwvYnV0dG9uPmA7XG4gIH0pO1xuXG4gIGNvbnN0IG1vbnRoc0h0bWwgPSBgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCIke0NBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTU31cIj5cbiAgICA8dGFibGUgY2xhc3M9XCIke0NBTEVOREFSX1RBQkxFX0NMQVNTfVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgJHtsaXN0VG9HcmlkSHRtbChtb250aHMsIDMpfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5gO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuaW5uZXJIVE1MID0gbW9udGhzSHRtbDtcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIG1vbnRoLlwiO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgbW9udGggaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBtb250aEVsIEFuIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0TW9udGggPSAobW9udGhFbCkgPT4ge1xuICBpZiAobW9udGhFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgbW9udGhFbFxuICApO1xuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZE1vbnRoKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcbiAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIC0gTW9udGggU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLyoqXG4gKiBEaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyVG9EaXNwbGF5IHllYXIgdG8gZGlzcGxheSBpbiB5ZWFyIHNlbGVjdGlvblxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgZGlzcGxheVllYXJTZWxlY3Rpb24gPSAoZWwsIHllYXJUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3Qge1xuICAgIGNhbGVuZGFyRWwsXG4gICAgc3RhdHVzRWwsXG4gICAgY2FsZW5kYXJEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZFllYXIgPSBjYWxlbmRhckRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgZm9jdXNlZFllYXIgPSB5ZWFyVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZFllYXIgOiB5ZWFyVG9EaXNwbGF5O1xuXG4gIGxldCB5ZWFyVG9DaHVuayA9IGZvY3VzZWRZZWFyO1xuICB5ZWFyVG9DaHVuayAtPSB5ZWFyVG9DaHVuayAlIFlFQVJfQ0hVTks7XG4gIHllYXJUb0NodW5rID0gTWF0aC5tYXgoMCwgeWVhclRvQ2h1bmspO1xuXG4gIGNvbnN0IHByZXZZZWFyQ2h1bmtEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFyVG9DaHVuayAtIDEpLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZVxuICApO1xuXG4gIGNvbnN0IG5leHRZZWFyQ2h1bmtEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFyVG9DaHVuayArIFlFQVJfQ0hVTkspLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZVxuICApO1xuXG4gIGNvbnN0IHllYXJzID0gW107XG4gIGxldCB5ZWFySW5kZXggPSB5ZWFyVG9DaHVuaztcbiAgd2hpbGUgKHllYXJzLmxlbmd0aCA8IFlFQVJfQ0hVTkspIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXgoXG4gICAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhckluZGV4KSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlXG4gICAgKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbQ0FMRU5EQVJfWUVBUl9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IHllYXJJbmRleCA9PT0gc2VsZWN0ZWRZZWFyO1xuXG4gICAgaWYgKHllYXJJbmRleCA9PT0gZm9jdXNlZFllYXIpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIHllYXJzLnB1c2goXG4gICAgICBgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiaW5kZXg9XCIke3RhYmluZGV4fVwiXG4gICAgICAgIGNsYXNzPVwiJHtjbGFzc2VzLmpvaW4oXCIgXCIpfVwiXG4gICAgICAgIGRhdGEtdmFsdWU9XCIke3llYXJJbmRleH1cIlxuICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHtpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCJ9XCJcbiAgICAgICAgJHtpc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgPiR7eWVhckluZGV4fTwvYnV0dG9uPmBcbiAgICApO1xuICAgIHllYXJJbmRleCArPSAxO1xuICB9XG5cbiAgY29uc3QgeWVhcnNIdG1sID0gbGlzdFRvR3JpZEh0bWwoeWVhcnMsIDMpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuaW5uZXJIVE1MID0gYDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiJHtDQUxFTkRBUl9ZRUFSX1BJQ0tFUl9DTEFTU31cIj5cbiAgICA8dGFibGUgY2xhc3M9XCIke0NBTEVOREFSX1RBQkxFX0NMQVNTfVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LX0NMQVNTfVwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgJHtZRUFSX0NIVU5LfSB5ZWFyc1wiXG4gICAgICAgICAgICAgICAgJHtwcmV2WWVhckNodW5rRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgICAgID4mbmJzcDs8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjNcIj5cbiAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiJHtDQUxFTkRBUl9UQUJMRV9DTEFTU31cIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgJHt5ZWFyc0h0bWx9XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTfVwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGZvcndhcmQgJHtZRUFSX0NIVU5LfSB5ZWFyc1wiXG4gICAgICAgICAgICAgICAgJHtuZXh0WWVhckNodW5rRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgICAgID4mbmJzcDs8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+YDtcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBgU2hvd2luZyB5ZWFycyAke3llYXJUb0NodW5rfSB0byAke1xuICAgIHllYXJUb0NodW5rICsgWUVBUl9DSFVOSyAtIDFcbiAgfS4gU2VsZWN0IGEgeWVhci5gO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBieSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzWWVhckNodW5rID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBlbFxuICApO1xuICBjb25zdCB5ZWFyRWwgPSBjYWxlbmRhckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLnRleHRDb250ZW50LCAxMCk7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IHNlbGVjdGVkWWVhciAtIFlFQVJfQ0hVTks7XG4gIGFkanVzdGVkWWVhciA9IE1hdGgubWF4KDAsIGFkanVzdGVkWWVhcik7XG5cbiAgY29uc3QgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZFllYXIpO1xuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgIGNhbGVuZGFyRWwsXG4gICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpXG4gICk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIGJ5IHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dFllYXJDaHVuayA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgZWxcbiAgKTtcbiAgY29uc3QgeWVhckVsID0gY2FsZW5kYXJFbC5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC50ZXh0Q29udGVudCwgMTApO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBzZWxlY3RlZFllYXIgKyBZRUFSX0NIVU5LO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbihcbiAgICBjYWxlbmRhckVsLFxuICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSB5ZWFyIGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0geWVhckVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdFllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KFxuICAgIHllYXJFbFxuICApO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwuaW5uZXJIVE1MLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEhpZGUgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlRnJvbUNhbGVuZGFyID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBleHRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG4gIGV4dGVybmFsSW5wdXRFbC5mb2N1cygpO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRGF0ZSBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgZGF0ZSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdERhdGVGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRqdXN0Q2FsZW5kYXIgPSAoYWRqdXN0RGF0ZUZuKSA9PiB7XG4gIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgICBldmVudC50YXJnZXRcbiAgICApO1xuXG4gICAgY29uc3QgZGF0ZSA9IGFkanVzdERhdGVGbihjYWxlbmRhckRhdGUpO1xuXG4gICAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICBpZiAoIWlzU2FtZURheShjYWxlbmRhckRhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGNhcHBlZERhdGUpO1xuICAgICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJXZWVrcyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkV2Vla3MoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIGRheSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViRGF5cyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgZGF5IGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkRGF5cyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdGFydE9mV2VlayhkYXRlKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVFbmRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBlbmRPZldlZWsoZGF0ZSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkTW9udGhzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJNb250aHMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU2hpZnRQYWdlRG93bkZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGFkZFllYXJzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVNoaWZ0UGFnZVVwRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViWWVhcnMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIGRpc3BsYXkgdGhlIGNhbGVuZGFyIGZvciB0aGUgbW91c2VvdmVyIGRhdGUuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBkYXRlRWwgQSBkYXRlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbURhdGUgPSAoZGF0ZUVsKSA9PiB7XG4gIGlmIChkYXRlRWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCBjYWxlbmRhckVsID0gZGF0ZUVsLmNsb3Nlc3QoREFURV9QSUNLRVJfQ0FMRU5EQVIpO1xuXG4gIGNvbnN0IGN1cnJlbnRDYWxlbmRhckRhdGUgPSBjYWxlbmRhckVsLmRhdGFzZXQudmFsdWU7XG4gIGNvbnN0IGhvdmVyRGF0ZSA9IGRhdGVFbC5kYXRhc2V0LnZhbHVlO1xuXG4gIGlmIChob3ZlckRhdGUgPT09IGN1cnJlbnRDYWxlbmRhckRhdGUpIHJldHVybjtcblxuICBjb25zdCBkYXRlVG9EaXNwbGF5ID0gcGFyc2VEYXRlU3RyaW5nKGhvdmVyRGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZVRvRGlzcGxheSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBEYXRlIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgTW9udGggRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBBZGp1c3QgdGhlIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3RNb250aEZuIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYWRqdXN0ZWQgbW9udGhcbiAqL1xuY29uc3QgYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4gPSAoYWRqdXN0TW9udGhGbikgPT4ge1xuICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbW9udGhFbCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gICAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KFxuICAgICAgbW9udGhFbFxuICAgICk7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIHNlbGVjdGVkTW9udGgpO1xuXG4gICAgbGV0IGFkanVzdGVkTW9udGggPSBhZGp1c3RNb250aEZuKHNlbGVjdGVkTW9udGgpO1xuICAgIGFkanVzdGVkTW9udGggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMSwgYWRqdXN0ZWRNb250aCkpO1xuXG4gICAgY29uc3QgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRNb250aCk7XG4gICAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICBpZiAoIWlzU2FtZU1vbnRoKGN1cnJlbnREYXRlLCBjYXBwZWREYXRlKSkge1xuICAgICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24oXG4gICAgICAgIGNhbGVuZGFyRWwsXG4gICAgICAgIGNhcHBlZERhdGUuZ2V0TW9udGgoKVxuICAgICAgKTtcbiAgICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCkuZm9jdXMoKTtcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoIC0gKG1vbnRoICUgMylcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgcm93IG9mIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoICsgMiAtIChtb250aCAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBsYXN0IG1vbnRoIChEZWNlbWJlcikgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKCgpID0+IDExKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZmlyc3QgbW9udGggKEphbnVhcnkpIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMCk7XG5cbi8qKlxuICogdXBkYXRlIHRoZSBmb2N1cyBvbiBhIG1vbnRoIHdoZW4gdGhlIG1vdXNlIG1vdmVzLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gbW9udGhFbCBBIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbU1vbnRoID0gKG1vbnRoRWwpID0+IHtcbiAgaWYgKG1vbnRoRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgaWYgKG1vbnRoRWwuY2xhc3NMaXN0LmNvbnRhaW5zKENBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1MpKSByZXR1cm47XG5cbiAgY29uc3QgZm9jdXNNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKG1vbnRoRWwsIGZvY3VzTW9udGgpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIE1vbnRoIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgWWVhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3RZZWFyRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCB5ZWFyXG4gKi9cbmNvbnN0IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4gPSAoYWRqdXN0WWVhckZuKSA9PiB7XG4gIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICBjb25zdCB5ZWFyRWwgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLmRhdGFzZXQudmFsdWUsIDEwKTtcbiAgICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoXG4gICAgICB5ZWFyRWxcbiAgICApO1xuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG5cbiAgICBsZXQgYWRqdXN0ZWRZZWFyID0gYWRqdXN0WWVhckZuKHNlbGVjdGVkWWVhcik7XG4gICAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICAgIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICAgIGlmICghaXNTYW1lWWVhcihjdXJyZW50RGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgICAgIGNhbGVuZGFyRWwsXG4gICAgICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICAgICAgKTtcbiAgICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDMpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgdGhyZWUgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAxKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHJvdyBvZiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSAoeWVhciAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHJvdyBvZiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRW5kRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciArIDIgLSAoeWVhciAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIGJhY2sgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSBZRUFSX0NIVU5LXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciArIFlFQVJfQ0hVTktcbik7XG5cbi8qKlxuICogdXBkYXRlIHRoZSBmb2N1cyBvbiBhIHllYXIgd2hlbiB0aGUgbW91c2UgbW92ZXMuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBkYXRlRWwgQSB5ZWFyIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbVllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgaWYgKHllYXJFbC5jbGFzc0xpc3QuY29udGFpbnMoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTKSkgcmV0dXJuO1xuXG4gIGNvbnN0IGZvY3VzWWVhciA9IHBhcnNlSW50KHllYXJFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbih5ZWFyRWwsIGZvY3VzWWVhcik7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBZZWFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuY29uc3QgdGFiSGFuZGxlciA9IChmb2N1c2FibGUpID0+IHtcbiAgY29uc3QgZ2V0Rm9jdXNhYmxlQ29udGV4dCA9IChlbCkgPT4ge1xuICAgIGNvbnN0IHsgY2FsZW5kYXJFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KGZvY3VzYWJsZSwgY2FsZW5kYXJFbCk7XG5cbiAgICBjb25zdCBmaXJzdFRhYkluZGV4ID0gMDtcbiAgICBjb25zdCBsYXN0VGFiSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZpcnN0VGFiSW5kZXhdO1xuICAgIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbbGFzdFRhYkluZGV4XTtcbiAgICBjb25zdCBmb2N1c0luZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihhY3RpdmVFbGVtZW50KCkpO1xuXG4gICAgY29uc3QgaXNMYXN0VGFiID0gZm9jdXNJbmRleCA9PT0gbGFzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzRmlyc3RUYWIgPSBmb2N1c0luZGV4ID09PSBmaXJzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzTm90Rm91bmQgPSBmb2N1c0luZGV4ID09PSAtMTtcblxuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgIGlzTm90Rm91bmQsXG4gICAgICBmaXJzdFRhYlN0b3AsXG4gICAgICBpc0ZpcnN0VGFiLFxuICAgICAgbGFzdFRhYlN0b3AsXG4gICAgICBpc0xhc3RUYWIsXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHRhYkFoZWFkKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGZpcnN0VGFiU3RvcCwgaXNMYXN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXRcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0xhc3RUYWIgfHwgaXNOb3RGb3VuZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhYkJhY2soZXZlbnQpIHtcbiAgICAgIGNvbnN0IHsgbGFzdFRhYlN0b3AsIGlzRmlyc3RUYWIsIGlzTm90Rm91bmQgfSA9IGdldEZvY3VzYWJsZUNvbnRleHQoXG4gICAgICAgIGV2ZW50LnRhcmdldFxuICAgICAgKTtcblxuICAgICAgaWYgKGlzRmlyc3RUYWIgfHwgaXNOb3RGb3VuZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihEQVRFX1BJQ0tFUl9GT0NVU0FCTEUpO1xuY29uc3QgbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKE1PTlRIX1BJQ0tFUl9GT0NVU0FCTEUpO1xuY29uc3QgeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoWUVBUl9QSUNLRVJfRk9DVVNBQkxFKTtcblxuLy8gI2VuZHJlZ2lvbiBGb2N1cyBIYW5kbGluZyBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIERhdGUgUGlja2VyIEV2ZW50IERlbGVnYXRpb24gUmVnaXN0cmF0aW9uIC8gQ29tcG9uZW50XG5cbmNvbnN0IGRhdGVQaWNrZXJFdmVudHMgPSB7XG4gIFtDTElDS106IHtcbiAgICBbREFURV9QSUNLRVJfQlVUVE9OXSgpIHtcbiAgICAgIHRvZ2dsZUNhbGVuZGFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX0RBVEVdKCkge1xuICAgICAgc2VsZWN0RGF0ZSh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF0oKSB7XG4gICAgICBzZWxlY3RNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ZRUFSXSgpIHtcbiAgICAgIHNlbGVjdFllYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEhdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzTW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9NT05USF0oKSB7XG4gICAgICBkaXNwbGF5TmV4dE1vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX1lFQVJdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzWWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX1lFQVJdKCkge1xuICAgICAgZGlzcGxheU5leHRZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzWWVhckNodW5rKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfWUVBUl9DSFVOS10oKSB7XG4gICAgICBkaXNwbGF5TmV4dFllYXJDaHVuayh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05dKCkge1xuICAgICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24odGhpcyk7XG4gICAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05dKCkge1xuICAgICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbih0aGlzKTtcbiAgICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH0sXG4gIH0sXG4gIGtleXVwOiB7XG4gICAgW0RBVEVfUElDS0VSX0NBTEVOREFSXShldmVudCkge1xuICAgICAgY29uc3Qga2V5ZG93biA9IHRoaXMuZGF0YXNldC5rZXlkb3duS2V5Q29kZTtcbiAgICAgIGlmIChgJHtldmVudC5rZXlDb2RlfWAgIT09IGtleWRvd24pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBrZXlkb3duOiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSX0tFWUNPREUpIHtcbiAgICAgICAgdmFsaWRhdGVEYXRlSW5wdXQodGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfREFURV06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tRGF0ZSxcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbURhdGUsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbURhdGUsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tRGF0ZSxcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tRGF0ZSxcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21EYXRlLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbURhdGUsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21EYXRlLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21EYXRlLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tRGF0ZSxcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21EYXRlLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tRGF0ZSxcbiAgICAgIFwiU2hpZnQrUGFnZURvd25cIjogaGFuZGxlU2hpZnRQYWdlRG93bkZyb21EYXRlLFxuICAgICAgXCJTaGlmdCtQYWdlVXBcIjogaGFuZGxlU2hpZnRQYWdlVXBGcm9tRGF0ZSxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfREFURV9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9NT05USF06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tTW9udGgsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21Nb250aCxcbiAgICAgIERvd246IGhhbmRsZURvd25Gcm9tTW9udGgsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tTW9udGgsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbU1vbnRoLFxuICAgICAgQXJyb3dMZWZ0OiBoYW5kbGVMZWZ0RnJvbU1vbnRoLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbU1vbnRoLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tTW9udGgsXG4gICAgICBIb21lOiBoYW5kbGVIb21lRnJvbU1vbnRoLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tTW9udGgsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tTW9udGgsXG4gICAgICBQYWdlVXA6IGhhbmRsZVBhZ2VVcEZyb21Nb250aCxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgICBcIlNoaWZ0K1RhYlwiOiBtb250aFBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9ZRUFSXToga2V5bWFwKHtcbiAgICAgIFVwOiBoYW5kbGVVcEZyb21ZZWFyLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tWWVhcixcbiAgICAgIERvd246IGhhbmRsZURvd25Gcm9tWWVhcixcbiAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21ZZWFyLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21ZZWFyLFxuICAgICAgQXJyb3dMZWZ0OiBoYW5kbGVMZWZ0RnJvbVllYXIsXG4gICAgICBSaWdodDogaGFuZGxlUmlnaHRGcm9tWWVhcixcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbVllYXIsXG4gICAgICBIb21lOiBoYW5kbGVIb21lRnJvbVllYXIsXG4gICAgICBFbmQ6IGhhbmRsZUVuZEZyb21ZZWFyLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbVllYXIsXG4gICAgICBQYWdlVXA6IGhhbmRsZVBhZ2VVcEZyb21ZZWFyLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9ZRUFSX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgICBcIlNoaWZ0K1RhYlwiOiB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgfSksXG4gICAgW0RBVEVfUElDS0VSX0NBTEVOREFSXShldmVudCkge1xuICAgICAgdGhpcy5kYXRhc2V0LmtleWRvd25LZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICB9LFxuICAgIFtEQVRFX1BJQ0tFUl0oZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleU1hcCA9IGtleW1hcCh7XG4gICAgICAgIEVzY2FwZTogaGFuZGxlRXNjYXBlRnJvbUNhbGVuZGFyLFxuICAgICAgfSk7XG5cbiAgICAgIGtleU1hcChldmVudCk7XG4gICAgfSxcbiAgfSxcbiAgZm9jdXNvdXQ6IHtcbiAgICBbREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRdKCkge1xuICAgICAgdmFsaWRhdGVEYXRlSW5wdXQodGhpcyk7XG4gICAgfSxcbiAgICBbREFURV9QSUNLRVJdKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgaGlkZUNhbGVuZGFyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXSgpIHtcbiAgICAgIHJlY29uY2lsZUlucHV0VmFsdWVzKHRoaXMpO1xuICAgICAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUodGhpcyk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmlmICghaXNJb3NEZXZpY2UoKSkge1xuICBkYXRlUGlja2VyRXZlbnRzLm1vdXNlb3ZlciA9IHtcbiAgICBbQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21EYXRlKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX01PTlRIXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21Nb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ZRUFSXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21ZZWFyKHRoaXMpO1xuICAgIH0sXG4gIH07XG59XG5cbmNvbnN0IGRhdGVQaWNrZXIgPSBiZWhhdmlvcihkYXRlUGlja2VyRXZlbnRzLCB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdChEQVRFX1BJQ0tFUiwgcm9vdCkuZm9yRWFjaCgoZGF0ZVBpY2tlckVsKSA9PiB7XG4gICAgICBlbmhhbmNlRGF0ZVBpY2tlcihkYXRlUGlja2VyRWwpO1xuICAgIH0pO1xuICB9LFxuICBnZXREYXRlUGlja2VyQ29udGV4dCxcbiAgZGlzYWJsZSxcbiAgZW5hYmxlLFxuICBpc0RhdGVJbnB1dEludmFsaWQsXG4gIHNldENhbGVuZGFyVmFsdWUsXG4gIHZhbGlkYXRlRGF0ZUlucHV0LFxuICByZW5kZXJDYWxlbmRhcixcbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUsXG59KTtcblxuLy8gI2VuZHJlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVQaWNrZXI7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuY29uc3Qge1xuICBnZXREYXRlUGlja2VyQ29udGV4dCxcbiAgaXNEYXRlSW5wdXRJbnZhbGlkLFxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSxcbn0gPSByZXF1aXJlKFwiLi9kYXRlLXBpY2tlclwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcGlja2VyYDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS1kYXRlLXJhbmdlLXBpY2tlcmA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF9DTEFTUyA9IGAke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfV9fcmFuZ2Utc3RhcnRgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EX0NMQVNTID0gYCR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9X19yYW5nZS1lbmRgO1xuXG5jb25zdCBEQVRFX1BJQ0tFUiA9IGAuJHtEQVRFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVIgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkQgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EX0NMQVNTfWA7XG5cbmNvbnN0IERFRkFVTFRfTUlOX0RBVEUgPSBcIjAwMDAtMDEtMDFcIjtcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBkYXRlIHJhbmdlIHBpY2tlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IERhdGVSYW5nZVBpY2tlckNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGVSYW5nZVBpY2tlckVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSByYW5nZVN0YXJ0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHJhbmdlRW5kRWxcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKiBAcmV0dXJucyB7RGF0ZVJhbmdlUGlja2VyQ29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0RGF0ZVJhbmdlUGlja2VyQ29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBkYXRlUmFuZ2VQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9SQU5HRV9QSUNLRVIpO1xuXG4gIGlmICghZGF0ZVJhbmdlUGlja2VyRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RBVEVfUkFOR0VfUElDS0VSfWApO1xuICB9XG5cbiAgY29uc3QgcmFuZ2VTdGFydEVsID0gZGF0ZVJhbmdlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVFxuICApO1xuICBjb25zdCByYW5nZUVuZEVsID0gZGF0ZVJhbmdlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGVSYW5nZVBpY2tlckVsLFxuICAgIHJhbmdlU3RhcnRFbCxcbiAgICByYW5nZUVuZEVsLFxuICB9O1xufTtcblxuLyoqXG4gKiBoYW5kbGUgdXBkYXRlIGZyb20gcmFuZ2Ugc3RhcnQgZGF0ZSBwaWNrZXJcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXJcbiAqL1xuY29uc3QgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZSA9IChlbCkgPT4ge1xuICBjb25zdCB7XG4gICAgZGF0ZVJhbmdlUGlja2VyRWwsXG4gICAgcmFuZ2VTdGFydEVsLFxuICAgIHJhbmdlRW5kRWwsXG4gIH0gPSBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KHJhbmdlU3RhcnRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSB8fCBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZUVuZEVsKTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlRW5kVXBkYXRlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbCxcbiAgICByYW5nZVN0YXJ0RWwsXG4gICAgcmFuZ2VFbmRFbCxcbiAgfSA9IGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VFbmRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gXCJcIjtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZVN0YXJ0RWwpO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VEYXRlUmFuZ2VQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gc2VsZWN0KERBVEVfUElDS0VSLCBkYXRlUmFuZ2VQaWNrZXJFbCk7XG5cbiAgaWYgKCFyYW5nZVN0YXJ0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgdHdvICcke0RBVEVfUElDS0VSfScgZWxlbWVudHNgXG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmFuZ2VFbmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgJHtEQVRFX1JBTkdFX1BJQ0tFUn0gaXMgbWlzc2luZyBzZWNvbmQgJyR7REFURV9QSUNLRVJ9JyBlbGVtZW50YFxuICAgICk7XG4gIH1cblxuICByYW5nZVN0YXJ0LmNsYXNzTGlzdC5hZGQoREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MpO1xuICByYW5nZUVuZC5jbGFzc0xpc3QuYWRkKERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyk7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBERUZBVUxUX01JTl9EQVRFO1xuICB9XG5cbiAgY29uc3QgbWluRGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZTtcbiAgcmFuZ2VTdGFydC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlO1xuICByYW5nZUVuZC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlO1xuXG4gIGNvbnN0IG1heERhdGUgPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGU7XG4gIGlmIChtYXhEYXRlKSB7XG4gICAgcmFuZ2VTdGFydC5kYXRhc2V0Lm1heERhdGUgPSBtYXhEYXRlO1xuICAgIHJhbmdlRW5kLmRhdGFzZXQubWF4RGF0ZSA9IG1heERhdGU7XG4gIH1cblxuICBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlKGRhdGVSYW5nZVBpY2tlckVsKTtcbiAgaGFuZGxlUmFuZ2VFbmRVcGRhdGUoZGF0ZVJhbmdlUGlja2VyRWwpO1xufTtcblxuY29uc3QgZGF0ZVJhbmdlUGlja2VyID0gYmVoYXZpb3IoXG4gIHtcbiAgICBcImlucHV0IGNoYW5nZVwiOiB7XG4gICAgICBbREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRdKCkge1xuICAgICAgICBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRdKCkge1xuICAgICAgICBoYW5kbGVSYW5nZUVuZFVwZGF0ZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KERBVEVfUkFOR0VfUElDS0VSLCByb290KS5mb3JFYWNoKChkYXRlUmFuZ2VQaWNrZXJFbCkgPT4ge1xuICAgICAgICBlbmhhbmNlRGF0ZVJhbmdlUGlja2VyKGRhdGVSYW5nZVBpY2tlckVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZVJhbmdlUGlja2VyO1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgRFJPUFpPTkVfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRgO1xuY29uc3QgRFJPUFpPTkUgPSBgLiR7RFJPUFpPTkVfQ0xBU1N9YDtcbmNvbnN0IElOUFVUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19pbnB1dGA7XG5jb25zdCBUQVJHRVRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3RhcmdldGA7XG5jb25zdCBJTlBVVCA9IGAuJHtJTlBVVF9DTEFTU31gO1xuY29uc3QgQk9YX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19ib3hgO1xuY29uc3QgSU5TVFJVQ1RJT05TX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19pbnN0cnVjdGlvbnNgO1xuY29uc3QgUFJFVklFV19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fcHJldmlld2A7XG5jb25zdCBQUkVWSUVXX0hFQURJTkdfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXctaGVhZGluZ2A7XG5jb25zdCBESVNBQkxFRF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dC0tZGlzYWJsZWRgO1xuY29uc3QgQ0hPT1NFX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19jaG9vc2VgO1xuY29uc3QgQUNDRVBURURfRklMRV9NRVNTQUdFX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19hY2NlcHRlZC1maWxlcy1tZXNzYWdlYDtcbmNvbnN0IERSQUdfVEVYVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fZHJhZy10ZXh0YDtcbmNvbnN0IERSQUdfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXQtLWRyYWdgO1xuY29uc3QgTE9BRElOR19DTEFTUyA9IFwiaXMtbG9hZGluZ1wiO1xuY29uc3QgSElEREVOX0NMQVNTID0gXCJkaXNwbGF5LW5vbmVcIjtcbmNvbnN0IElOVkFMSURfRklMRV9DTEFTUyA9IFwiaGFzLWludmFsaWQtZmlsZVwiO1xuY29uc3QgR0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUUgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXctaW1hZ2VgO1xuY29uc3QgR0VORVJJQ19QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1nZW5lcmljYDtcbmNvbnN0IFBERl9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1wZGZgO1xuY29uc3QgV09SRF9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS13b3JkYDtcbmNvbnN0IFZJREVPX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLXZpZGVvYDtcbmNvbnN0IEVYQ0VMX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLWV4Y2VsYDtcbmNvbnN0IFNQQUNFUl9HSUYgPVxuICBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBN1wiO1xuXG5sZXQgVFlQRV9JU19WQUxJRCA9IEJvb2xlYW4odHJ1ZSk7IC8vIGxvZ2ljIGdhdGUgZm9yIGNoYW5nZSBsaXN0ZW5lclxuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGZpbGUgaW5wdXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaWxlSW5wdXRDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBkcm9wWm9uZUVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0RWxcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGZpbGUgaW5wdXQgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dFxuICogQHJldHVybnMge0ZpbGVJbnB1dENvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldEZpbGVJbnB1dENvbnRleHQgPSAoZWwpID0+IHtcbiAgY29uc3QgZHJvcFpvbmVFbCA9IGVsLmNsb3Nlc3QoRFJPUFpPTkUpO1xuXG4gIGlmICghZHJvcFpvbmVFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7RFJPUFpPTkV9YCk7XG4gIH1cblxuICBjb25zdCBpbnB1dEVsID0gZHJvcFpvbmVFbC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcblxuICByZXR1cm4ge1xuICAgIGRyb3Bab25lRWwsXG4gICAgaW5wdXRFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRyb3Bab25lRWwsIGlucHV0RWwgfSA9IGdldEZpbGVJbnB1dENvbnRleHQoZWwpO1xuXG4gIGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xuICBkcm9wWm9uZUVsLmNsYXNzTGlzdC5hZGQoRElTQUJMRURfQ0xBU1MpO1xuICBkcm9wWm9uZUVsLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRyb3Bab25lRWwsIGlucHV0RWwgfSA9IGdldEZpbGVJbnB1dENvbnRleHQoZWwpO1xuXG4gIGlucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QucmVtb3ZlKERJU0FCTEVEX0NMQVNTKTtcbiAgZHJvcFpvbmVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHMgc3BlY2lhbCBjaGFyYWN0ZXJzXG4gKiBAcmV0dXJucyB7U3RyaW5nfSByZXBsYWNlcyBzcGVjZWZpZWQgdmFsdWVzXG4gKi9cbmNvbnN0IHJlcGxhY2VOYW1lID0gKHMpID0+IHtcbiAgY29uc3QgYyA9IHMuY2hhckNvZGVBdCgwKTtcbiAgaWYgKGMgPT09IDMyKSByZXR1cm4gXCItXCI7XG4gIGlmIChjID49IDY1ICYmIGMgPD0gOTApIHJldHVybiBgaW1nXyR7cy50b0xvd2VyQ2FzZSgpfWA7XG4gIHJldHVybiBgX18keyhcIjAwMFwiLCBjLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpfWA7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBJRCBuYW1lIGZvciBlYWNoIGZpbGUgdGhhdCBzdHJpcHMgYWxsIGludmFsaWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGUgZmlsZSBhZGRlZCB0byBmaWxlIGlucHV0IChzZWFyY2h2YWx1ZSlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHNhbWUgY2hhcmFjdGVycyBhcyB0aGUgbmFtZSB3aXRoIGludmFsaWQgY2hhcnMgcmVtb3ZlZCAobmV3dmFsdWUpXG4gKi9cbmNvbnN0IG1ha2VTYWZlRm9ySUQgPSAobmFtZSkgPT4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgcmVwbGFjZU5hbWUpO1xuXG4vKipcbiAqIEJ1aWxkcyBmdWxsIGZpbGUgaW5wdXQgY29tb25lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gb3JpZ2luYWwgZmlsZSBpbnB1dCBvbiBwYWdlXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8SFRNTEVsZW1lbnR9IC0gSW5zdHJ1Y3Rpb25zLCB0YXJnZXQgYXJlYSBkaXZcbiAqL1xuY29uc3QgYnVpbGRGaWxlSW5wdXQgPSAoZmlsZUlucHV0RWwpID0+IHtcbiAgY29uc3QgYWNjZXB0c011bHRpcGxlID0gZmlsZUlucHV0RWwuaGFzQXR0cmlidXRlKFwibXVsdGlwbGVcIik7XG4gIGNvbnN0IGZpbGVJbnB1dFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRyb3BUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkaXNhYmxlZCA9IGZpbGVJbnB1dEVsLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuXG4gIC8vIEFkZHMgY2xhc3MgbmFtZXMgYW5kIG90aGVyIGF0dHJpYnV0ZXNcbiAgZmlsZUlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShEUk9QWk9ORV9DTEFTUyk7XG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5hZGQoSU5QVVRfQ0xBU1MpO1xuICBmaWxlSW5wdXRQYXJlbnQuY2xhc3NMaXN0LmFkZChEUk9QWk9ORV9DTEFTUyk7XG4gIGJveC5jbGFzc0xpc3QuYWRkKEJPWF9DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKElOU1RSVUNUSU9OU19DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChUQVJHRVRfQ0xBU1MpO1xuXG4gIC8vIEFkZHMgY2hpbGQgZWxlbWVudHMgdG8gdGhlIERPTVxuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcm9wVGFyZ2V0LCBmaWxlSW5wdXRFbCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZpbGVJbnB1dFBhcmVudCwgZHJvcFRhcmdldCk7XG4gIGRyb3BUYXJnZXQuYXBwZW5kQ2hpbGQoZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRQYXJlbnQuYXBwZW5kQ2hpbGQoZHJvcFRhcmdldCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGluc3RydWN0aW9ucywgZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShib3gsIGZpbGVJbnB1dEVsKTtcblxuICAvLyBEaXNhYmxlZCBzdHlsaW5nXG4gIGlmIChkaXNhYmxlZCkge1xuICAgIGRpc2FibGUoZmlsZUlucHV0RWwpO1xuICB9XG5cbiAgLy8gU2V0cyBpbnN0cnVjdGlvbiB0ZXN0IGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IG11bHRpcGxlIGZpbGVzIGFyZSBhY2NlcHRlZFxuICBpZiAoYWNjZXB0c011bHRpcGxlKSB7XG4gICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7RFJBR19URVhUX0NMQVNTfVwiPkRyYWcgZmlsZXMgaGVyZSBvciA8L3NwYW4+PHNwYW4gY2xhc3M9XCIke0NIT09TRV9DTEFTU31cIj5jaG9vc2UgZnJvbSBmb2xkZXI8L3NwYW4+YDtcbiAgfSBlbHNlIHtcbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtEUkFHX1RFWFRfQ0xBU1N9XCI+RHJhZyBmaWxlIGhlcmUgb3IgPC9zcGFuPjxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+Y2hvb3NlIGZyb20gZm9sZGVyPC9zcGFuPmA7XG4gIH1cblxuICAvLyBJRTExIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGRyb3AgZmlsZXMgb24gZmlsZSBpbnB1dHMsIHNvIHdlJ3ZlIHJlbW92ZWQgdGV4dCB0aGF0IGluZGljYXRlcyB0aGF0XG4gIGlmIChcbiAgICAvcnY6MTEuMC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHxcbiAgICAvRWRnZVxcL1xcZC4vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICkge1xuICAgIGZpbGVJbnB1dFBhcmVudC5xdWVyeVNlbGVjdG9yKGAuJHtEUkFHX1RFWFRfQ0xBU1N9YCkub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJldHVybiB7IGluc3RydWN0aW9ucywgZHJvcFRhcmdldCB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGltYWdlIHByZXZpZXdzLCB3ZSB3YW50IHRvIHN0YXJ0IHdpdGggYSBjbGVhbiBsaXN0IGV2ZXJ5IHRpbWUgZmlsZXMgYXJlIGFkZGVkIHRvIHRoZSBmaWxlIGlucHV0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKi9cbmNvbnN0IHJlbW92ZU9sZFByZXZpZXdzID0gKGRyb3BUYXJnZXQsIGluc3RydWN0aW9ucykgPT4ge1xuICBjb25zdCBmaWxlUHJldmlld3MgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke1BSRVZJRVdfQ0xBU1N9YCk7XG4gIGNvbnN0IGN1cnJlbnRQcmV2aWV3SGVhZGluZyA9IGRyb3BUYXJnZXQucXVlcnlTZWxlY3RvcihcbiAgICBgLiR7UFJFVklFV19IRUFESU5HX0NMQVNTfWBcbiAgKTtcbiAgY29uc3QgY3VycmVudEVycm9yTWVzc2FnZSA9IGRyb3BUYXJnZXQucXVlcnlTZWxlY3RvcihcbiAgICBgLiR7QUNDRVBURURfRklMRV9NRVNTQUdFX0NMQVNTfWBcbiAgKTtcblxuICAvKipcbiAgICogZmluZHMgdGhlIHBhcmVudCBvZiB0aGUgcGFzc2VkIG5vZGUgYW5kIHJlbW92ZXMgdGhlIGNoaWxkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAgICovXG4gIGNvbnN0IHJlbW92ZUltYWdlcyA9IChub2RlKSA9PiB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gIH1cblxuICAvLyBSZW1vdmUgdGhlIGhlYWRpbmcgYWJvdmUgdGhlIHByZXZpZXdzXG4gIGlmIChjdXJyZW50UHJldmlld0hlYWRpbmcpIHtcbiAgICBjdXJyZW50UHJldmlld0hlYWRpbmcub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIC8vIFJlbW92ZSBleGlzdGluZyBlcnJvciBtZXNzYWdlc1xuICBpZiAoY3VycmVudEVycm9yTWVzc2FnZSkge1xuICAgIGN1cnJlbnRFcnJvck1lc3NhZ2Uub3V0ZXJIVE1MID0gXCJcIjtcbiAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgfVxuXG4gIC8vIEdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3MgaWYgdGhleSBleGlzdCwgc2hvdyBpbnN0cnVjdGlvbnNcbiAgaWYgKGZpbGVQcmV2aWV3cyAhPT0gbnVsbCkge1xuICAgIGlmIChpbnN0cnVjdGlvbnMpIHtcbiAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgfVxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZmlsZVByZXZpZXdzLCByZW1vdmVJbWFnZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIFdoZW4gbmV3IGZpbGVzIGFyZSBhcHBsaWVkIHRvIGZpbGUgaW5wdXQsIHRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHByZXZpZXdzXG4gKiBhbmQgcmVtb3ZlcyBvbGQgb25lcy5cbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gZmlsZSBpbnB1dCBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSB0ZXh0IHRvIGluZm9ybSB1c2VycyB0byBkcmFnIG9yIHNlbGVjdCBmaWxlc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZHJvcFRhcmdldCAtIHRhcmdldCBhcmVhIGRpdiB0aGF0IGVuY2FzZXMgdGhlIGlucHV0XG4gKi9cbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGZpbGVOYW1lcyA9IGUudGFyZ2V0LmZpbGVzO1xuICBjb25zdCBmaWxlUHJldmlld3NIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvLyBGaXJzdCwgZ2V0IHJpZCBvZiBleGlzdGluZyBwcmV2aWV3c1xuICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMpO1xuXG4gIC8vIEl0ZXJhdGVzIHRocm91Z2ggZmlsZXMgbGlzdCBhbmQgY3JlYXRlcyBwcmV2aWV3c1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlTmFtZXNbaV0ubmFtZTtcblxuICAgIC8vIFN0YXJ0cyB3aXRoIGEgbG9hZGluZyBpbWFnZSB3aGlsZSBwcmV2aWV3IGlzIGNyZWF0ZWRcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiBjcmVhdGVMb2FkaW5nSW1hZ2UoKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gbWFrZVNhZmVGb3JJRChmaWxlTmFtZSk7XG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2UgPSBgPGltZyBpZD1cIiR7aW1hZ2VJZH1cIiBzcmM9XCIke1NQQUNFUl9HSUZ9XCIgYWx0PVwiXCIgY2xhc3M9XCIke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfSAke0xPQURJTkdfQ0xBU1N9XCIvPmA7XG5cbiAgICAgIGluc3RydWN0aW9ucy5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgYDxkaXYgY2xhc3M9XCIke1BSRVZJRVdfQ0xBU1N9XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+JHtwcmV2aWV3SW1hZ2V9JHtmaWxlTmFtZX08ZGl2PmBcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBhbGwgZmlsZXMgd2lsbCBiZSBhYmxlIHRvIGdlbmVyYXRlIHByZXZpZXdzLiBJbiBjYXNlIHRoaXMgaGFwcGVucywgd2UgcHJvdmlkZSBzZXZlcmFsIHR5cGVzIFwiZ2VuZXJpYyBwcmV2aWV3c1wiIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbi5cbiAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gY3JlYXRlRmlsZVByZXZpZXcoKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gbWFrZVNhZmVGb3JJRChmaWxlTmFtZSk7XG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbWFnZUlkKTtcbiAgICAgIGlmIChmaWxlTmFtZS5pbmRleE9mKFwiLnBkZlwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7UERGX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlsZU5hbWUuaW5kZXhPZihcIi5kb2NcIikgPiAwIHx8XG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIucGFnZXNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7V09SRF9QUkVWSUVXX0NMQVNTfVwiKWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIueGxzXCIpID4gMCB8fFxuICAgICAgICBmaWxlTmFtZS5pbmRleE9mKFwiLm51bWJlcnNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7RVhDRUxfUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmluZGV4T2YoXCIubW92XCIpID4gMCB8fCBmaWxlTmFtZS5pbmRleE9mKFwiLm1wNFwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7VklERU9fUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2aWV3SW1hZ2Uuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwib25lcnJvclwiLFxuICAgICAgICAgIGB0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz1cIiR7U1BBQ0VSX0dJRn1cIjsgdGhpcy5jbGFzc0xpc3QuYWRkKFwiJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmVzIGxvYWRlciBhbmQgZGlzcGxheXMgcHJldmlld1xuICAgICAgcHJldmlld0ltYWdlLmNsYXNzTGlzdC5yZW1vdmUoTE9BRElOR19DTEFTUyk7XG4gICAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVhZGVyLnJlc3VsdDtcbiAgICB9O1xuXG4gICAgaWYgKGZpbGVOYW1lc1tpXSkge1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZU5hbWVzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGhlYWRpbmcgYWJvdmUgZmlsZSBwcmV2aWV3cywgcGx1cmFsaXplcyBpZiB0aGVyZSBhcmUgbXVsdGlwbGVcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gYFNlbGVjdGVkIGZpbGUgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+Q2hhbmdlIGZpbGU8L3NwYW4+YDtcbiAgICB9IGVsc2UgaWYgKGkgPj0gMSkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gYCR7XG4gICAgICAgIGkgKyAxXG4gICAgICB9IGZpbGVzIHNlbGVjdGVkIDxzcGFuIGNsYXNzPVwidXNhLWZpbGUtaW5wdXRfX2Nob29zZVwiPkNoYW5nZSBmaWxlczwvc3Bhbj5gO1xuICAgIH1cblxuICAgIC8vIEhpZGVzIG51bGwgc3RhdGUgY29udGVudCBhbmQgc2V0cyBwcmV2aWV3IGhlYWRpbmcgY2xhc3NcbiAgICBpZiAoZmlsZVByZXZpZXdzSGVhZGluZykge1xuICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuY2xhc3NMaXN0LmFkZChQUkVWSUVXX0hFQURJTkdfQ0xBU1MpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBXaGVuIHVzaW5nIGFuIEFjY2VwdCBhdHRyaWJ1dGUsIGludmFsaWQgZmlsZXMgd2lsbCBiZSBoaWRkZW4gZnJvbVxuICogZmlsZSBicm93c2VyLCBidXQgdGhleSBjYW4gc3RpbGwgYmUgZHJhZ2dlZCB0byB0aGUgaW5wdXQuIFRoaXNcbiAqIGZ1bmN0aW9uIHByZXZlbnRzIHRoZW0gZnJvbSBiZWluZyBkcmFnZ2VkIGFuZCByZW1vdmVzIGVycm9yIHN0YXRlc1xuICogd2hlbiBjb3JyZWN0IGZpbGVzIGFyZSBhZGRlZC5cbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gZmlsZSBpbnB1dCBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSB0ZXh0IHRvIGluZm9ybSB1c2VycyB0byBkcmFnIG9yIHNlbGVjdCBmaWxlc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZHJvcFRhcmdldCAtIHRhcmdldCBhcmVhIGRpdiB0aGF0IGVuY2FzZXMgdGhlIGlucHV0XG4gKi9cbmNvbnN0IHByZXZlbnRJbnZhbGlkRmlsZXMgPSAoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBjb25zdCBhY2NlcHRlZEZpbGVzQXR0ciA9IGZpbGVJbnB1dEVsLmdldEF0dHJpYnV0ZShcImFjY2VwdFwiKTtcbiAgZHJvcFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKElOVkFMSURfRklMRV9DTEFTUyk7XG5cbiAgLyoqXG4gICAqIFdlIGNhbiBwcm9iYWJseSBtb3ZlIGF3YXkgZnJvbSB0aGlzIG9uY2UgSUUxMSBzdXBwb3J0IHN0b3BzLCBhbmQgcmVwbGFjZVxuICAgKiB3aXRoIGEgc2ltcGxlIGVzIGAuaW5jbHVkZXNgXG4gICAqIGNoZWNrIGlmIGVsZW1lbnQgaXMgaW4gYXJyYXlcbiAgICogY2hlY2sgaWYgMSBvciBtb3JlIGFscGhhYmV0cyBhcmUgaW4gc3RyaW5nXG4gICAqIGlmIGVsZW1lbnQgaXMgcHJlc2VudCByZXR1cm4gdGhlIHBvc2l0aW9uIHZhbHVlIGFuZCAtMSBvdGhlcndpc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgY29uc3QgaXNJbmNsdWRlZCA9IChmaWxlLCB2YWx1ZSkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHBvcyA9IGZpbGUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKHBvcyA+PSAwKSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICAvLyBSdW5zIGlmIG9ubHkgc3BlY2lmaWMgZmlsZXMgYXJlIGFjY2VwdGVkXG4gIGlmIChhY2NlcHRlZEZpbGVzQXR0cikge1xuICAgIGNvbnN0IGFjY2VwdGVkRmlsZXMgPSBhY2NlcHRlZEZpbGVzQXR0ci5zcGxpdChcIixcIik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIC8vIElmIG11bHRpcGxlIGZpbGVzIGFyZSBkcmFnZ2VkLCB0aGlzIGl0ZXJhdGVzIHRocm91Z2ggdGhlbSBhbmQgbG9vayBmb3IgYW55IGZpbGVzIHRoYXQgYXJlIG5vdCBhY2NlcHRlZC5cbiAgICBsZXQgYWxsRmlsZXNBbGxvd2VkID0gdHJ1ZTtcbiAgICBjb25zdCBzY2FubmVkRmlsZXMgPSBlLnRhcmdldC5maWxlcyB8fCBlLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYW5uZWRGaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZmlsZSA9IHNjYW5uZWRGaWxlc1tpXTtcbiAgICAgIGlmIChhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY2NlcHRlZEZpbGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgY29uc3QgZmlsZVR5cGUgPSBhY2NlcHRlZEZpbGVzW2pdO1xuICAgICAgICAgIGFsbEZpbGVzQWxsb3dlZCA9XG4gICAgICAgICAgICBmaWxlLm5hbWUuaW5kZXhPZihmaWxlVHlwZSkgPiAwIHx8XG4gICAgICAgICAgICBpc0luY2x1ZGVkKGZpbGUudHlwZSwgZmlsZVR5cGUucmVwbGFjZSgvXFwqL2csIFwiXCIpKTtcbiAgICAgICAgICBpZiAoYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICAgICAgICBUWVBFX0lTX1ZBTElEID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIElmIGRyYWdnZWQgZmlsZXMgYXJlIG5vdCBhY2NlcHRlZCwgdGhpcyByZW1vdmVzIHRoZW0gZnJvbSB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGFuZCBjcmVhdGVzIGFuZCBlcnJvciBzdGF0ZVxuICAgIGlmICghYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMpO1xuICAgICAgZmlsZUlucHV0RWwudmFsdWUgPSBcIlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBkcm9wVGFyZ2V0Lmluc2VydEJlZm9yZShlcnJvck1lc3NhZ2UsIGZpbGVJbnB1dEVsKTtcbiAgICAgIGVycm9yTWVzc2FnZS5pbm5lckhUTUwgPSBgVGhpcyBpcyBub3QgYSB2YWxpZCBmaWxlIHR5cGUuYDtcbiAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKEFDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTUyk7XG4gICAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5hZGQoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgICAgIFRZUEVfSVNfVkFMSUQgPSBmYWxzZTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIDEuIHBhc3NlcyB0aHJvdWdoIGdhdGUgZm9yIHByZXZlbnRpbmcgaW52YWxpZCBmaWxlc1xuICogMi4gaGFuZGxlcyB1cGRhdGVzIGlmIGZpbGUgaXMgdmFsaWRcbiAqIEBwYXJhbSB7ZXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbnN0cnVjdGlvbnNFbFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKi9cbmNvbnN0IGhhbmRsZVVwbG9hZCA9IChldmVudCwgZWxlbWVudCwgaW5zdHJ1Y3Rpb25zRWwsIGRyb3BUYXJnZXRFbCkgPT4ge1xuICBwcmV2ZW50SW52YWxpZEZpbGVzKGV2ZW50LCBlbGVtZW50LCBpbnN0cnVjdGlvbnNFbCwgZHJvcFRhcmdldEVsKTtcbiAgaWYgKFRZUEVfSVNfVkFMSUQgPT09IHRydWUpIHtcbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQsIGVsZW1lbnQsIGluc3RydWN0aW9uc0VsLCBkcm9wVGFyZ2V0RWwpO1xuICB9XG59O1xuXG5jb25zdCBmaWxlSW5wdXQgPSBiZWhhdmlvcihcbiAge30sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChEUk9QWk9ORSwgcm9vdCkuZm9yRWFjaCgoZmlsZUlucHV0RWwpID0+IHtcbiAgICAgICAgY29uc3QgeyBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQgfSA9IGJ1aWxkRmlsZUlucHV0KGZpbGVJbnB1dEVsKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcmFnb3ZlclwiLFxuICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKERSQUdfQ0xBU1MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcmFnbGVhdmVcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoRFJBR19DTEFTUyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyb3BcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcm9wKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKERSQUdfQ0xBU1MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBmaWxlSW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgICAgKGUpID0+IGhhbmRsZVVwbG9hZChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRGaWxlSW5wdXRDb250ZXh0LFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVJbnB1dDtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBISURERU4gPSBcImhpZGRlblwiO1xuY29uc3QgU0NPUEUgPSBgLiR7UFJFRklYfS1mb290ZXItLWJpZ2A7XG5jb25zdCBOQVYgPSBgJHtTQ09QRX0gbmF2YDtcbmNvbnN0IEJVVFRPTiA9IGAke05BVn0gLiR7UFJFRklYfS1mb290ZXJfX3ByaW1hcnktbGlua2A7XG5jb25zdCBDT0xMQVBTSUJMRSA9IGAuJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1jb250ZW50LS1jb2xsYXBzaWJsZWA7XG5cbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNDgwO1xuXG5mdW5jdGlvbiBzaG93UGFuZWwoKSB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IEhJREVfTUFYX1dJRFRIKSB7XG4gICAgY29uc3QgY29sbGFwc2VFbCA9IHRoaXMuY2xvc2VzdChDT0xMQVBTSUJMRSk7XG4gICAgY29sbGFwc2VFbC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTik7XG5cbiAgICAvLyBOQjogdGhpcyAqc2hvdWxkKiBhbHdheXMgc3VjY2VlZCBiZWNhdXNlIHRoZSBidXR0b25cbiAgICAvLyBzZWxlY3RvciBpcyBzY29wZWQgdG8gXCIue3ByZWZpeH0tZm9vdGVyLWJpZyBuYXZcIlxuICAgIGNvbnN0IGNvbGxhcHNpYmxlRWxzID0gc2VsZWN0KENPTExBUFNJQkxFLCBjb2xsYXBzZUVsLmNsb3Nlc3QoTkFWKSk7XG5cbiAgICBjb2xsYXBzaWJsZUVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgaWYgKGVsICE9PSBjb2xsYXBzZUVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSElEREVOKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCB0b2dnbGVIaWRkZW4gPSAoaXNIaWRkZW4pID0+XG4gIHNlbGVjdChDT0xMQVBTSUJMRSkuZm9yRWFjaCgobGlzdCkgPT4gbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTiwgaXNIaWRkZW4pKTtcblxuY29uc3QgcmVzaXplID0gKGV2ZW50KSA9PiB0b2dnbGVIaWRkZW4oZXZlbnQubWF0Y2hlcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1BhbmVsLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICAvLyBleHBvcnQgZm9yIHVzZSBlbHNld2hlcmVcbiAgICBISURFX01BWF9XSURUSCxcblxuICAgIGluaXQoKSB7XG4gICAgICB0b2dnbGVIaWRkZW4od2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCk7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7SElERV9NQVhfV0lEVEh9cHgpYCk7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKHJlc2l6ZSk7XG4gICAgfSxcblxuICAgIHRlYXJkb3duKCkge1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdC5yZW1vdmVMaXN0ZW5lcihyZXNpemUpO1xuICAgIH0sXG4gIH1cbik7XG4iLCJjb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi9hY2NvcmRpb25cIik7XG5jb25zdCBiYW5uZXIgPSByZXF1aXJlKFwiLi9iYW5uZXJcIik7XG5jb25zdCBjaGFyYWN0ZXJDb3VudCA9IHJlcXVpcmUoXCIuL2NoYXJhY3Rlci1jb3VudFwiKTtcbmNvbnN0IGNvbWJvQm94ID0gcmVxdWlyZShcIi4vY29tYm8tYm94XCIpO1xuY29uc3QgZmlsZUlucHV0ID0gcmVxdWlyZShcIi4vZmlsZS1pbnB1dFwiKTtcbmNvbnN0IGZvb3RlciA9IHJlcXVpcmUoXCIuL2Zvb3RlclwiKTtcbmNvbnN0IGlucHV0UHJlZml4U3VmZml4ID0gcmVxdWlyZShcIi4vaW5wdXQtcHJlZml4LXN1ZmZpeFwiKTtcbmNvbnN0IG1vZGFsID0gcmVxdWlyZShcIi4vbW9kYWxcIik7XG5jb25zdCBuYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcbmNvbnN0IHBhc3N3b3JkID0gcmVxdWlyZShcIi4vcGFzc3dvcmRcIik7XG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIik7XG5jb25zdCBza2lwbmF2ID0gcmVxdWlyZShcIi4vc2tpcG5hdlwiKTtcbmNvbnN0IHRvb2x0aXAgPSByZXF1aXJlKFwiLi90b29sdGlwXCIpO1xuY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcIi4vdmFsaWRhdG9yXCIpO1xuY29uc3QgZGF0ZVBpY2tlciA9IHJlcXVpcmUoXCIuL2RhdGUtcGlja2VyXCIpO1xuY29uc3QgZGF0ZVJhbmdlUGlja2VyID0gcmVxdWlyZShcIi4vZGF0ZS1yYW5nZS1waWNrZXJcIik7XG5jb25zdCB0aW1lUGlja2VyID0gcmVxdWlyZShcIi4vdGltZS1waWNrZXJcIik7XG5jb25zdCB0YWJsZSA9IHJlcXVpcmUoXCIuL3RhYmxlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWNjb3JkaW9uLFxuICBiYW5uZXIsXG4gIGNoYXJhY3RlckNvdW50LFxuICBjb21ib0JveCxcbiAgZGF0ZVBpY2tlcixcbiAgZGF0ZVJhbmdlUGlja2VyLFxuICBmaWxlSW5wdXQsXG4gIGZvb3RlcixcbiAgaW5wdXRQcmVmaXhTdWZmaXgsXG4gIG1vZGFsLFxuICBuYXZpZ2F0aW9uLFxuICBwYXNzd29yZCxcbiAgc2VhcmNoLFxuICBza2lwbmF2LFxuICB0YWJsZSxcbiAgdGltZVBpY2tlcixcbiAgdG9vbHRpcCxcbiAgdmFsaWRhdG9yLFxufTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuXG5jb25zdCBDT05UQUlORVIgPSBgLiR7UFJFRklYfS1pbnB1dC1ncm91cGA7XG5jb25zdCBJTlBVVCA9IGAke0NPTlRBSU5FUn0gLiR7UFJFRklYfS1pbnB1dGA7XG5jb25zdCBERUNPUkFUSU9OID0gYCR7Q09OVEFJTkVSfSAuJHtQUkVGSVh9LWlucHV0LXByZWZpeCwgJHtDT05UQUlORVJ9IC4ke1BSRUZJWH0taW5wdXQtc3VmZml4YDtcbmNvbnN0IEZPQ1VTX0NMQVNTID0gXCJpcy1mb2N1c2VkXCI7XG5cbmZ1bmN0aW9uIHNldEZvY3VzKGVsKSB7XG4gIGVsLmNsb3Nlc3QoQ09OVEFJTkVSKS5xdWVyeVNlbGVjdG9yKGAuJHtQUkVGSVh9LWlucHV0YCkuZm9jdXMoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gIHRoaXMuY2xvc2VzdChDT05UQUlORVIpLmNsYXNzTGlzdC5hZGQoRk9DVVNfQ0xBU1MpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICB0aGlzLmNsb3Nlc3QoQ09OVEFJTkVSKS5jbGFzc0xpc3QucmVtb3ZlKEZPQ1VTX0NMQVNTKTtcbn1cblxuY29uc3QgaW5wdXRQcmVmaXhTdWZmaXggPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtERUNPUkFUSU9OXSgpIHtcbiAgICAgICAgc2V0Rm9jdXModGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChJTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cywgZmFsc2UpO1xuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRQcmVmaXhTdWZmaXg7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IFNjcm9sbEJhcldpZHRoID0gcmVxdWlyZShcIi4uL3V0aWxzL3Njcm9sbGJhci13aWR0aFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IE1PREFMX0NMQVNTTkFNRSA9IGAke1BSRUZJWH0tbW9kYWxgO1xuY29uc3QgT1ZFUkxBWV9DTEFTU05BTUUgPSBgJHtNT0RBTF9DTEFTU05BTUV9LW92ZXJsYXlgO1xuY29uc3QgV1JBUFBFUl9DTEFTU05BTUUgPSBgJHtNT0RBTF9DTEFTU05BTUV9LXdyYXBwZXJgO1xuY29uc3QgT1BFTkVSX0FUVFJJQlVURSA9IFwiZGF0YS1vcGVuLW1vZGFsXCI7XG5jb25zdCBDTE9TRVJfQVRUUklCVVRFID0gXCJkYXRhLWNsb3NlLW1vZGFsXCI7XG5jb25zdCBGT1JDRV9BQ1RJT05fQVRUUklCVVRFID0gXCJkYXRhLWZvcmNlLWFjdGlvblwiO1xuY29uc3QgTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUgPSBgZGF0YS1tb2RhbC1oaWRkZW5gO1xuY29uc3QgTU9EQUwgPSBgLiR7TU9EQUxfQ0xBU1NOQU1FfWA7XG5jb25zdCBJTklUSUFMX0ZPQ1VTID0gYC4ke1dSQVBQRVJfQ0xBU1NOQU1FfSAqW2RhdGEtZm9jdXNdYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAke1dSQVBQRVJfQ0xBU1NOQU1FfSAqWyR7Q0xPU0VSX0FUVFJJQlVURX1dYDtcbmNvbnN0IE9QRU5FUlMgPSBgKlske09QRU5FUl9BVFRSSUJVVEV9XVthcmlhLWNvbnRyb2xzXWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7T1ZFUkxBWV9DTEFTU05BTUV9Om5vdChbJHtGT1JDRV9BQ1RJT05fQVRUUklCVVRFfV0pYDtcbmNvbnN0IE5PTl9NT0RBTFMgPSBgYm9keSA+ICo6bm90KC4ke1dSQVBQRVJfQ0xBU1NOQU1FfSk6bm90KFthcmlhLWhpZGRlbl0pYDtcbmNvbnN0IE5PTl9NT0RBTFNfSElEREVOID0gYFske05PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFfV1gO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBcInVzYS1qcy1tb2RhbC0tYWN0aXZlXCI7XG5jb25zdCBQUkVWRU5UX0NMSUNLX0NMQVNTID0gXCJ1c2EtanMtbm8tY2xpY2tcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcbmNvbnN0IEhJRERFTl9DTEFTUyA9IFwiaXMtaGlkZGVuXCI7XG5cbmxldCBtb2RhbDtcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuY29uc3QgU0NST0xMQkFSX1dJRFRIID0gU2Nyb2xsQmFyV2lkdGgoKTtcbmNvbnN0IElOSVRJQUxfUEFERElORyA9IHdpbmRvd1xuICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG5jb25zdCBURU1QT1JBUllfUEFERElORyA9XG4gIGAke3BhcnNlSW50KElOSVRJQUxfUEFERElORy5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMCkgK1xuICBwYXJzZUludChTQ1JPTExCQVJfV0lEVEgucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApXG4gIH1weGA7XG5cbi8qKlxuICogIElzIGJvdW5kIHRvIGVzY2FwZSBrZXksIGNsb3NlcyBtb2RhbCB3aGVuXG4gKi9cbmNvbnN0IG9uTWVudUNsb3NlID0gKCkgPT4ge1xuICBtb2RhbC50b2dnbGVNb2RhbC5jYWxsKG1vZGFsLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqICBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgYSBtb2RhbCB3aW5kb3dcbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gc2FmZUFjdGl2ZSBpZiBtb2JpbGUgaXMgb3BlblxuICovXG5mdW5jdGlvbiB0b2dnbGVNb2RhbChldmVudCkge1xuICBsZXQgb3JpZ2luYWxPcGVuZXI7XG4gIGxldCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9ICFpc0FjdGl2ZSgpO1xuICBjb25zdCBtb2RhbElkID0gY2xpY2tlZEVsZW1lbnRcbiAgICA/IGNsaWNrZWRFbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIilcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNhLW1vZGFsLXdyYXBwZXIuaXMtdmlzaWJsZVwiKTtcbiAgY29uc3QgdGFyZ2V0TW9kYWwgPSBzYWZlQWN0aXZlXG4gICAgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2EtbW9kYWwtd3JhcHBlci5pcy12aXNpYmxlXCIpO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIG1vZGFsIHdlIHJldHVybiBlYXJseVxuICBpZiAoIXRhcmdldE1vZGFsKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBvcGVuRm9jdXNFbCA9IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA/IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA6IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIudXNhLW1vZGFsXCIpO1xuICBjb25zdCByZXR1cm5Gb2N1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIHRhcmdldE1vZGFsLmdldEF0dHJpYnV0ZShcImRhdGEtb3BlbmVyXCIpXG4gICk7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG4gIGNvbnN0IGZvcmNlVXNlckFjdGlvbiA9IHRhcmdldE1vZGFsLmdldEF0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFKTtcblxuICAvLyBTZXRzIHRoZSBjbGlja2VkIGVsZW1lbnQgdG8gdGhlIGNsb3NlIGJ1dHRvblxuICAvLyBzbyBlc2Mga2V5IGFsd2F5cyBjbG9zZXMgbW9kYWxcbiAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiICYmIHRhcmdldE1vZGFsICE9PSBudWxsKSB7XG4gICAgY2xpY2tlZEVsZW1lbnQgPSB0YXJnZXRNb2RhbC5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG4gIH1cblxuICAvLyBXaGVuIHdlJ3JlIG5vdCBoaXR0aW5nIHRoZSBlc2NhcGUga2V54oCmXG4gIGlmIChjbGlja2VkRWxlbWVudCkge1xuICAgIC8vIE1ha2Ugc3VyZSB3ZSBjbGljayB0aGUgb3BlbmVyXG4gICAgLy8gSWYgaXQgZG9lc24ndCBoYXZlIGFuIElELCBtYWtlIG9uZVxuICAgIC8vIFN0b3JlIGlkIGFzIGRhdGEgYXR0cmlidXRlIG9uIG1vZGFsXG4gICAgaWYgKGNsaWNrZWRFbGVtZW50Lmhhc0F0dHJpYnV0ZShPUEVORVJfQVRUUklCVVRFKSkge1xuICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IG51bGwpIHtcbiAgICAgICAgb3JpZ2luYWxPcGVuZXIgPSBgbW9kYWwtJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5MDAwMDApICsgMTAwMDAwfWA7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiaWRcIiwgb3JpZ2luYWxPcGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZ2luYWxPcGVuZXIgPSB0aGlzLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0TW9kYWwuc2V0QXR0cmlidXRlKFwiZGF0YS1vcGVuZXJcIiwgb3JpZ2luYWxPcGVuZXIpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgYmFzaWNhbGx5IHN0b3BzIHRoZSBwcm9wYWdhdGlvbiBpZiB0aGUgZWxlbWVudFxuICAgIC8vIGlzIGluc2lkZSB0aGUgbW9kYWwgYW5kIG5vdCBhIGNsb3NlIGJ1dHRvbiBvclxuICAgIC8vIGVsZW1lbnQgaW5zaWRlIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoYC4ke01PREFMX0NMQVNTTkFNRX1gKSkge1xuICAgICAgaWYgKGNsaWNrZWRFbGVtZW50Lmhhc0F0dHJpYnV0ZShDTE9TRVJfQVRUUklCVVRFKSB8fFxuICAgICAgICAgIGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoYFske0NMT1NFUl9BVFRSSUJVVEV9XWApXG4gICAgICApIHtcbiAgICAgICAgLy8gZG8gbm90aGluZy4gbW92ZSBvbi5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIHNhZmVBY3RpdmUpO1xuICB0YXJnZXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFZJU0lCTEVfQ0xBU1MsIHNhZmVBY3RpdmUpO1xuICB0YXJnZXRNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTl9DTEFTUywgIXNhZmVBY3RpdmUpO1xuXG4gIC8vIElmIHVzZXIgaXMgZm9yY2VkIHRvIHRha2UgYW4gYWN0aW9uLCBhZGRpbmdcbiAgLy8gYSBjbGFzcyB0byB0aGUgYm9keSB0aGF0IHByZXZlbnRzIGNsaWNraW5nIHVuZGVybmVhdGhcbiAgLy8gb3ZlcmxheVxuICBpZiAoZm9yY2VVc2VyQWN0aW9uKSB7XG4gICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKFBSRVZFTlRfQ0xJQ0tfQ0xBU1MsIHNhZmVBY3RpdmUpO1xuICB9XG5cbiAgLy8gQWNjb3VudCBmb3IgY29udGVudCBzaGlmdGluZyBmcm9tIGJvZHkgb3ZlcmZsb3c6IGhpZGRlblxuICAvLyBXZSBvbmx5IGNoZWNrIHBhZGRpbmdSaWdodCBpbiBjYXNlIGFwcHMgYXJlIGFkZGluZyBvdGhlciBwcm9wZXJ0aWVzXG4gIC8vIHRvIHRoZSBib2R5IGVsZW1lbnRcbiAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxuICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID09PSBURU1QT1JBUllfUEFERElOR1xuICAgICAgPyBJTklUSUFMX1BBRERJTkdcbiAgICAgIDogVEVNUE9SQVJZX1BBRERJTkc7XG5cbiAgLy8gSGFuZGxlIHRoZSBmb2N1cyBhY3Rpb25zXG4gIGlmIChzYWZlQWN0aXZlICYmIG9wZW5Gb2N1c0VsKSB7XG4gICAgLy8gVGhlIG1vZGFsIHdpbmRvdyBpcyBvcGVuZWQuIEZvY3VzIGlzIHNldCB0byBjbG9zZSBidXR0b24uXG5cbiAgICAvLyBCaW5kcyBlc2NhcGUga2V5IGlmIHdlJ3JlIG5vdCBmb3JjaW5nXG4gICAgLy8gdGhlIHVzZXIgdG8gdGFrZSBhbiBhY3Rpb25cbiAgICBpZiAoZm9yY2VVc2VyQWN0aW9uKSB7XG4gICAgICBtb2RhbC5mb2N1c1RyYXAgPSBGb2N1c1RyYXAodGFyZ2V0TW9kYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RhbC5mb2N1c1RyYXAgPSBGb2N1c1RyYXAodGFyZ2V0TW9kYWwsIHtcbiAgICAgICAgRXNjYXBlOiBvbk1lbnVDbG9zZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgZm9jdXMgc2V0dGluZyBhbmQgaW50ZXJhY3Rpb25zXG4gICAgbW9kYWwuZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcbiAgICBvcGVuRm9jdXNFbC5mb2N1cygpO1xuXG4gICAgLy8gSGlkZXMgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCB0aGUgbW9kYWwgZnJvbSBzY3JlZW4gcmVhZGVyc1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX01PREFMUykuZm9yRWFjaCgobm9uTW9kYWwpID0+IHtcbiAgICAgIG5vbk1vZGFsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgIG5vbk1vZGFsLnNldEF0dHJpYnV0ZShOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURSwgXCJcIik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIXNhZmVBY3RpdmUgJiYgbWVudUJ1dHRvbiAmJiByZXR1cm5Gb2N1cykge1xuICAgIC8vIFRoZSBtb2RhbCB3aW5kb3cgaXMgY2xvc2VkLlxuICAgIC8vIE5vbi1tb2RhbHMgbm93IGFjY2VzaWJsZSB0byBzY3JlZW4gcmVhZGVyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTU9EQUxTX0hJRERFTikuZm9yRWFjaCgobm9uTW9kYWwpID0+IHtcbiAgICAgIG5vbk1vZGFsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgICAgbm9uTW9kYWwucmVtb3ZlQXR0cmlidXRlKE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFKTtcbiAgICB9KTtcblxuICAgIC8vIEZvY3VzIGlzIHJldHVybmVkIHRvIHRoZSBvcGVuZXJcbiAgICByZXR1cm5Gb2N1cy5mb2N1cygpO1xuICAgIG1vZGFsLmZvY3VzVHJhcC51cGRhdGUoc2FmZUFjdGl2ZSk7XG4gIH1cblxuICByZXR1cm4gc2FmZUFjdGl2ZTtcbn1cblxuLyoqXG4gKiAgQnVpbGRzIG1vZGFsIHdpbmRvdyBmcm9tIGJhc2UgSFRNTFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJhc2VDb21wb25lbnQgdGhlIG1vZGFsIGh0bWwgaW4gdGhlIERPTVxuICovXG5jb25zdCBzZXRVcEF0dHJpYnV0ZXMgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBvdmVybGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbW9kYWxJRCA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IGFyaWFMYWJlbGxlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGNvbnN0IGFyaWFEZXNjcmliZWRCeSA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gYmFzZUNvbXBvbmVudC5oYXNBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSlcbiAgICA/IGJhc2VDb21wb25lbnQuaGFzQXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUpXG4gICAgOiBmYWxzZTtcblxuICAvLyBSZWJ1aWxkIHRoZSBtb2RhbCBlbGVtZW50XG4gIG1vZGFsQ29udGVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtb2RhbFdyYXBwZXIsIG1vZGFsQ29udGVudCk7XG4gIG1vZGFsV3JhcHBlci5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuICBtb2RhbENvbnRlbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUob3ZlcmxheURpdiwgbW9kYWxDb250ZW50KTtcbiAgb3ZlcmxheURpdi5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnQpO1xuXG4gIC8vIEFkZCBjbGFzc2VzIGFuZCBhdHRyaWJ1dGVzXG4gIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTUyk7XG4gIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QuYWRkKFdSQVBQRVJfQ0xBU1NOQU1FKTtcbiAgb3ZlcmxheURpdi5jbGFzc0xpc3QuYWRkKE9WRVJMQVlfQ0xBU1NOQU1FKTtcblxuICAvLyBTZXQgYXR0cmlidXRlc1xuICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcbiAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIG1vZGFsSUQpO1xuXG4gIGlmIChhcmlhTGFiZWxsZWRCeSkge1xuICAgIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIiwgYXJpYUxhYmVsbGVkQnkpO1xuICB9XG5cbiAgaWYgKGFyaWFEZXNjcmliZWRCeSkge1xuICAgIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGFyaWFEZXNjcmliZWRCeSk7XG4gIH1cblxuICBpZiAoZm9yY2VVc2VyQWN0aW9uKSB7XG4gICAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFLCBcInRydWVcIik7XG4gIH1cblxuICAvLyBVcGRhdGUgdGhlIGJhc2UgZWxlbWVudCBIVE1MXG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIpO1xuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIik7XG4gIGJhc2VDb21wb25lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICAvLyBBZGQgYXJpYS1jb250cm9sc1xuICBjb25zdCBtb2RhbENsb3NlcnMgPSBtb2RhbFdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChDTE9TRVJTKTtcbiAgc2VsZWN0KG1vZGFsQ2xvc2VycykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1vZGFsSUQpO1xuICB9KTtcblxuICAvLyBNb3ZlIGFsbCBtb2RhbHMgdG8gdGhlIGVuZCBvZiB0aGUgRE9NLiBEb2luZyB0aGlzIGFsbG93cyB1cyB0b1xuICAvLyBtb3JlIGVhc2lseSBmaW5kIHRoZSBlbGVtZW50cyB0byBoaWRlIGZyb20gc2NyZWVuIHJlYWRlcnNcbiAgLy8gd2hlbiB0aGUgbW9kYWwgaXMgb3Blbi5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbFdyYXBwZXIpO1xufTtcblxubW9kYWwgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtPUEVORVJTXTogdG9nZ2xlTW9kYWwsXG4gICAgICBbQ0xPU0VSU106IHRvZ2dsZU1vZGFsLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChNT0RBTCwgcm9vdCkuZm9yRWFjaCgobW9kYWxXaW5kb3cpID0+IHtcbiAgICAgICAgc2V0VXBBdHRyaWJ1dGVzKG1vZGFsV2luZG93KTtcbiAgICAgIH0pO1xuXG4gICAgICBzZWxlY3QoT1BFTkVSUywgcm9vdCkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAvLyBUdXJuIGFuY2hvciBsaW5rcyBpbnRvIGJ1dHRvbnMgYmVjYXVzZSBvZlxuICAgICAgICAvLyBWb2ljZU92ZXIgb24gU2FmYXJpXG4gICAgICAgIGlmIChpdGVtLm5vZGVOYW1lID09PSBcIkFcIikge1xuICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FuIHVuY29tbWVudCB3aGVuIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIiBpcyBzdXBwb3J0ZWRcbiAgICAgICAgLy8gaHR0cHM6Ly9hMTF5c3VwcG9ydC5pby90ZWNoL2FyaWEvYXJpYS1oYXNwb3B1cF9hdHRyaWJ1dGVcbiAgICAgICAgLy8gTW9zdCBzY3JlZW4gcmVhZGVycyBzdXBwb3J0IGFyaWEtaGFzcG9wdXAsIGJ1dCBtaWdodCBhbm5vdW5jZVxuICAgICAgICAvLyBhcyBvcGVuaW5nIGEgbWVudSBpZiBcImRpYWxvZ1wiIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIC8vIGl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiLCBcImRpYWxvZ1wiKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICAgIHRvZ2dsZU1vZGFsLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsO1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi91dGlscy90b2dnbGVcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuL2FjY29yZGlvblwiKTtcbmNvbnN0IFNjcm9sbEJhcldpZHRoID0gcmVxdWlyZShcIi4uL3V0aWxzL3Njcm9sbGJhci13aWR0aFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LW5hdl9fcHJpbWFyeWA7XG5jb25zdCBOQVZfUFJJTUFSWV9JVEVNID0gYC4ke1BSRUZJWH0tbmF2X19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTkFWX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1uYXZfX2xpbmtgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE9QRU5FUlMgPSBgLiR7UFJFRklYfS1tZW51LWJ0bmA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgLiR7UFJFRklYfS1uYXZfX2Nsb3NlYDtcbmNvbnN0IE9WRVJMQVkgPSBgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IENMT1NFUlMgPSBgJHtDTE9TRV9CVVRUT059LCAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgVE9HR0xFUyA9IFtOQVYsIE9WRVJMQVldLmpvaW4oXCIsIFwiKTtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gXCJ1c2EtanMtbW9iaWxlLW5hdi0tYWN0aXZlXCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5cbmxldCBuYXZpZ2F0aW9uO1xubGV0IG5hdkFjdGl2ZTtcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuY29uc3QgU0NST0xMQkFSX1dJRFRIID0gU2Nyb2xsQmFyV2lkdGgoKTtcbmNvbnN0IElOSVRJQUxfUEFERElORyA9IHdpbmRvd1xuICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG5jb25zdCBURU1QT1JBUllfUEFERElORyA9IGAke1xuICBwYXJzZUludChJTklUSUFMX1BBRERJTkcucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApICtcbiAgcGFyc2VJbnQoU0NST0xMQkFSX1dJRFRILnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKVxufXB4YDtcblxuY29uc3QgdG9nZ2xlTmF2ID0gKGFjdGl2ZSkgPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IGRvY3VtZW50O1xuICBjb25zdCBzYWZlQWN0aXZlID0gdHlwZW9mIGFjdGl2ZSA9PT0gXCJib29sZWFuXCIgPyBhY3RpdmUgOiAhaXNBY3RpdmUoKTtcblxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBzYWZlQWN0aXZlKTtcblxuICBzZWxlY3QoVE9HR0xFUykuZm9yRWFjaCgoZWwpID0+XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBzYWZlQWN0aXZlKVxuICApO1xuXG4gIG5hdmlnYXRpb24uZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuXG4gIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID1cbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9PT0gVEVNUE9SQVJZX1BBRERJTkdcbiAgICAgID8gSU5JVElBTF9QQURESU5HXG4gICAgICA6IFRFTVBPUkFSWV9QQURESU5HO1xuXG4gIGlmIChzYWZlQWN0aXZlICYmIGNsb3NlQnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgYWN0aXZhdGVkLCBzbyBmb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uLFxuICAgIC8vIHdoaWNoIGlzIGp1c3QgYmVmb3JlIGFsbCB0aGUgbmF2IGVsZW1lbnRzIGluIHRoZSB0YWIgb3JkZXIuXG4gICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgfSBlbHNlIGlmIChcbiAgICAhc2FmZUFjdGl2ZSAmJlxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGNsb3NlQnV0dG9uICYmXG4gICAgbWVudUJ1dHRvblxuICApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZCwgYW5kIGZvY3VzIHdhcyBvbiB0aGUgY2xvc2VcbiAgICAvLyBidXR0b24sIHdoaWNoIGlzIG5vIGxvbmdlciB2aXNpYmxlLiBXZSBkb24ndCB3YW50IHRoZSBmb2N1cyB0b1xuICAgIC8vIGRpc2FwcGVhciBpbnRvIHRoZSB2b2lkLCBzbyBmb2N1cyBvbiB0aGUgbWVudSBidXR0b24gaWYgaXQnc1xuICAgIC8vIHZpc2libGUgKHRoaXMgbWF5IGhhdmUgYmVlbiB3aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGZvY3VzZWQgb24sXG4gICAgLy8gaWYgdGhleSB0cmlnZ2VyZWQgdGhlIG1vYmlsZSBuYXYgYnkgbWlzdGFrZSkuXG4gICAgbWVudUJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVBY3RpdmU7XG59O1xuXG5jb25zdCByZXNpemUgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlciA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuXG4gIGlmIChpc0FjdGl2ZSgpICYmIGNsb3NlciAmJiBjbG9zZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggPT09IDApIHtcbiAgICAvLyBXaGVuIHRoZSBtb2JpbGUgbmF2IGlzIGFjdGl2ZSwgYW5kIHRoZSBjbG9zZSBib3ggaXNuJ3QgdmlzaWJsZSxcbiAgICAvLyB3ZSBrbm93IHRoZSB1c2VyJ3Mgdmlld3BvcnQgaGFzIGJlZW4gcmVzaXplZCB0byBiZSBsYXJnZXIuXG4gICAgLy8gTGV0J3MgbWFrZSB0aGUgcGFnZSBzdGF0ZSBjb25zaXN0ZW50IGJ5IGRlYWN0aXZhdGluZyB0aGUgbW9iaWxlIG5hdi5cbiAgICBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKGNsb3NlciwgZmFsc2UpO1xuICB9XG59O1xuXG5jb25zdCBvbk1lbnVDbG9zZSA9ICgpID0+IG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuXG5jb25zdCBoaWRlQWN0aXZlTmF2RHJvcGRvd24gPSAoKSA9PiB7XG4gIGlmICghbmF2QWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdG9nZ2xlKG5hdkFjdGl2ZSwgZmFsc2UpO1xuICBuYXZBY3RpdmUgPSBudWxsO1xufTtcblxuY29uc3QgZm9jdXNOYXZCdXR0b24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgcGFyZW50TmF2SXRlbSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KE5BVl9QUklNQVJZX0lURU0pO1xuXG4gIC8vIE9ubHkgc2hpZnQgZm9jdXMgaWYgd2l0aGluIGRyb3Bkb3duXG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoTkFWX0NPTlRST0wpKSB7XG4gICAgcGFyZW50TmF2SXRlbS5xdWVyeVNlbGVjdG9yKE5BVl9DT05UUk9MKS5mb2N1cygpO1xuICB9XG59XG5cbmNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudCkgPT4ge1xuICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgZm9jdXNOYXZCdXR0b24oZXZlbnQpO1xufVxuXG5uYXZpZ2F0aW9uID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbTkFWX0NPTlRST0xdKCkge1xuICAgICAgICAvLyBJZiBhbm90aGVyIG5hdiBpcyBvcGVuLCBjbG9zZSBpdFxuICAgICAgICBpZiAobmF2QWN0aXZlICE9PSB0aGlzKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGxhc3QgY2xpY2tlZCBuYXYgbGluayBlbGVtZW50LCBzbyB3ZVxuICAgICAgICAvLyBjYW4gaGlkZSB0aGUgZHJvcGRvd24gaWYgYW5vdGhlciBlbGVtZW50IG9uIHRoZSBwYWdlIGlzIGNsaWNrZWRcbiAgICAgICAgaWYgKCFuYXZBY3RpdmUpIHtcbiAgICAgICAgICBuYXZBY3RpdmUgPSB0aGlzO1xuICAgICAgICAgIHRvZ2dsZShuYXZBY3RpdmUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gdGhpcyBzbyB0aGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgYm9keSBkb2Vzbid0IGZpcmVcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIFtCT0RZXTogaGlkZUFjdGl2ZU5hdkRyb3Bkb3duLFxuICAgICAgW09QRU5FUlNdOiB0b2dnbGVOYXYsXG4gICAgICBbQ0xPU0VSU106IHRvZ2dsZU5hdixcbiAgICAgIFtOQVZfTElOS1NdKCkge1xuICAgICAgICAvLyBBIG5hdmlnYXRpb24gbGluayBoYXMgYmVlbiBjbGlja2VkISBXZSB3YW50IHRvIGNvbGxhcHNlIGFueVxuICAgICAgICAvLyBoaWVyYXJjaGljYWwgbmF2aWdhdGlvbiBVSSBpdCdzIGEgcGFydCBvZiwgc28gdGhhdCB0aGUgdXNlclxuICAgICAgICAvLyBjYW4gZm9jdXMgb24gd2hhdGV2ZXIgdGhleSd2ZSBqdXN0IHNlbGVjdGVkLlxuXG4gICAgICAgIC8vIFNvbWUgbmF2aWdhdGlvbiBsaW5rcyBhcmUgaW5zaWRlIGFjY29yZGlvbnM7IHdoZW4gdGhleSdyZVxuICAgICAgICAvLyBjbGlja2VkLCB3ZSB3YW50IHRvIGNvbGxhcHNlIHRob3NlIGFjY29yZGlvbnMuXG4gICAgICAgIGNvbnN0IGFjYyA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb24uQUNDT1JESU9OKTtcblxuICAgICAgICBpZiAoYWNjKSB7XG4gICAgICAgICAgYWNjb3JkaW9uLmdldEJ1dHRvbnMoYWNjKS5mb3JFYWNoKChidG4pID0+IGFjY29yZGlvbi5oaWRlKGJ0bikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIG1vYmlsZSBuYXZpZ2F0aW9uIG1lbnUgaXMgYWN0aXZlLCB3ZSB3YW50IHRvIGhpZGUgaXQuXG4gICAgICAgIGlmIChpc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi50b2dnbGVOYXYuY2FsbChuYXZpZ2F0aW9uLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbTkFWX1BSSU1BUlldOiBrZXltYXAoeyBFc2NhcGU6IGhhbmRsZUVzY2FwZSB9KSxcbiAgICB9LFxuICAgIGZvY3Vzb3V0OiB7XG4gICAgICBbTkFWX1BSSU1BUlldKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5hdiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KE5BVl9QUklNQVJZKTtcblxuICAgICAgICBpZiAoIW5hdi5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmVzaXplKCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSk7XG4gICAgICBuYXZBY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICAgIGZvY3VzVHJhcDogbnVsbCxcbiAgICB0b2dnbGVOYXYsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdGlvbjtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNob3ctcGFzc3dvcmQsIC4ke1BSRUZJWH0tc2hvdy1tdWx0aXBhc3N3b3JkYDtcblxuZnVuY3Rpb24gdG9nZ2xlKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRvZ2dsZUZvcm1JbnB1dCh0aGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFtDTElDS106IHtcbiAgICBbTElOS106IHRvZ2dsZSxcbiAgfSxcbn0pO1xuIiwiY29uc3QgaWdub3JlID0gcmVxdWlyZShcInJlY2VwdG9yL2lnbm9yZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uL2V2ZW50c1wiKTtcblxuY29uc3QgQlVUVE9OID0gXCIuanMtc2VhcmNoLWJ1dHRvblwiO1xuY29uc3QgRk9STSA9IFwiLmpzLXNlYXJjaC1mb3JtXCI7XG5jb25zdCBJTlBVVCA9IFwiW3R5cGU9c2VhcmNoXVwiO1xuY29uc3QgQ09OVEVYVCA9IFwiaGVhZGVyXCI7IC8vIFhYWFxuXG5sZXQgbGFzdEJ1dHRvbjtcblxuY29uc3QgZ2V0Rm9ybSA9IChidXR0b24pID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQucXVlcnlTZWxlY3RvcihGT1JNKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcblxuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICR7Rk9STX0gZm91bmQgZm9yIHNlYXJjaCB0b2dnbGUgaW4gJHtDT05URVhUfSFgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIGJ1dHRvbi5oaWRkZW4gPSBhY3RpdmU7XG4gIGZvcm0uaGlkZGVuID0gIWFjdGl2ZTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGlmICghYWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cbiAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gIGNvbnN0IGxpc3RlbmVyID0gaWdub3JlKGZvcm0sICgpID0+IHtcbiAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgaGlkZVNlYXJjaC5jYWxsKGxhc3RCdXR0b24pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0pO1xuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gIC8vIElFMTEgYW5kIEVkZ2Ugd2lsbCBhY3R1YWxseSBjYWxsIHRoZSBsaXN0ZW5lciAqaW1tZWRpYXRlbHkqIGJlY2F1c2VcbiAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gIC8vIGlmIGFueSwgYmVmb3JlIHdlIGF0dGFjaCB0aGUgbGlzdGVuZXIuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICB9LCAwKTtcbn07XG5cbmZ1bmN0aW9uIHNob3dTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGVTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl06IHNob3dTZWFyY2gsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQodGFyZ2V0KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCB0YXJnZXQpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoO1xuIiwiY29uc3Qgb25jZSA9IHJlcXVpcmUoXCJyZWNlcHRvci9vbmNlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNraXBuYXZbaHJlZl49XCIjXCJdLCAuJHtQUkVGSVh9LWZvb3Rlcl9fcmV0dXJuLXRvLXRvcCBbaHJlZl49XCIjXCJdYDtcbmNvbnN0IE1BSU5DT05URU5UID0gXCJtYWluLWNvbnRlbnRcIjtcblxuZnVuY3Rpb24gc2V0VGFiaW5kZXgoKSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IGVuY29kZVVSSSh0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBpZCA9PT0gXCIjXCIgPyBNQUlOQ09OVEVOVCA6IGlkLnNsaWNlKDEpXG4gICk7XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zdHlsZS5vdXRsaW5lID0gXCIwXCI7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIDApO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJibHVyXCIsXG4gICAgICBvbmNlKCgpID0+IHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIC0xKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtMSU5LXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBUQUJMRSA9IGAuJHtQUkVGSVh9LXRhYmxlYDtcbmNvbnN0IFNPUlRFRCA9IFwiYXJpYS1zb3J0XCI7XG5jb25zdCBBU0NFTkRJTkcgPSBcImFzY2VuZGluZ1wiO1xuY29uc3QgREVTQ0VORElORyA9IFwiZGVzY2VuZGluZ1wiO1xuY29uc3QgU09SVF9PVkVSUklERSA9IFwiZGF0YS1zb3J0LXZhbHVlXCI7XG5cbmNvbnN0IElDT05fU09VUkNFID0gYFxuICA8c3ZnIGNsYXNzPVwiJHtQUkVGSVh9LWljb25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgIDxnIGNsYXNzPVwiZGVzY2VuZGluZ1wiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBhdGggZD1cIk0xNyAxN0wxNS41OSAxNS41OUwxMi45OTk5IDE4LjE3VjJIMTAuOTk5OVYxOC4xN0w4LjQxIDE1LjU4TDcgMTdMMTEuOTk5OSAyMkwxNyAxN1pcIiAvPlxuICAgIDwvZz5cbiAgICA8ZyBjbGFzcz1cImFzY2VuZGluZ1wiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBhdGggdHJhbnNmb3JtPVwicm90YXRlKDE4MCwgMTIsIDEyKVwiIGQ9XCJNMTcgMTdMMTUuNTkgMTUuNTlMMTIuOTk5OSAxOC4xN1YySDEwLjk5OTlWMTguMTdMOC40MSAxNS41OEw3IDE3TDExLjk5OTkgMjJMMTcgMTdaXCIgLz5cbiAgICA8L2c+XG4gICAgPGcgY2xhc3M9XCJ1bnNvcnRlZFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTUuMTcgMTUgMTMgMTcuMTcgMTMgNi44MyAxNS4xNyA5IDE2LjU4IDcuNTkgMTIgMyA3LjQxIDcuNTkgOC44MyA5IDExIDYuODMgMTEgMTcuMTcgOC44MyAxNSA3LjQyIDE2LjQxIDEyIDIxIDE2LjU5IDE2LjQxIDE1LjE3IDE1XCIvPlxuICAgIDwvZz5cbiAgPC9zdmc+XG5gO1xuXG5jb25zdCBTT1JUX0JVVFRPTl9DTEFTUyA9IGAke1BSRUZJWH0tdGFibGVfX2hlYWRlcl9fYnV0dG9uYDtcbmNvbnN0IFNPUlRfQlVUVE9OID0gYC4ke1NPUlRfQlVUVE9OX0NMQVNTfWA7XG5jb25zdCBTT1JUQUJMRV9IRUFERVIgPSBgdGhbZGF0YS1zb3J0YWJsZV1gO1xuY29uc3QgQU5OT1VOQ0VNRU5UX1JFR0lPTiA9IGAuJHtQUkVGSVh9LXRhYmxlX19hbm5vdW5jZW1lbnQtcmVnaW9uW2FyaWEtbGl2ZT1cInBvbGl0ZVwiXWA7XG5cbi8qKiBHZXRzIHRoZSBkYXRhLXNvcnQtdmFsdWUgYXR0cmlidXRlIHZhbHVlLCBpZiBwcm92aWRlZCDigJQgb3RoZXJ3aXNlLCBnZXRzXG4gKiB0aGUgaW5uZXJUZXh0IG9yIHRleHRDb250ZW50IOKAlCBvZiB0aGUgY2hpbGQgZWxlbWVudCAoSFRNTFRhYmxlQ2VsbEVsZW1lbnQpXG4gKiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IG9mIHRoZSBnaXZlbiB0YWJsZSByb3dcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXk8SFRNTFRhYmxlUm93RWxlbWVudD59IHRyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBnZXRDZWxsVmFsdWUgPSAodHIsIGluZGV4KSA9PlxuICB0ci5jaGlsZHJlbltpbmRleF0uZ2V0QXR0cmlidXRlKFNPUlRfT1ZFUlJJREUpIHx8XG4gIHRyLmNoaWxkcmVuW2luZGV4XS5pbm5lclRleHQgfHxcbiAgdHIuY2hpbGRyZW5baW5kZXhdLnRleHRDb250ZW50O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoZSB2YWx1ZXMgb2YgdHdvIHJvdyBhcnJheSBpdGVtcyBhdCB0aGUgZ2l2ZW4gaW5kZXgsIHRoZW4gc29ydHMgYnkgdGhlIGdpdmVuIGRpcmVjdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBjb21wYXJlRnVuY3Rpb24gPSAoaW5kZXgsIGlzQXNjZW5kaW5nKSA9PiAodGhpc1JvdywgbmV4dFJvdykgPT4ge1xuICAvLyBnZXQgdmFsdWVzIHRvIGNvbXBhcmUgZnJvbSBkYXRhIGF0dHJpYnV0ZSBvciBjZWxsIGNvbnRlbnRcbiAgY29uc3QgdmFsdWUxID0gZ2V0Q2VsbFZhbHVlKGlzQXNjZW5kaW5nID8gdGhpc1JvdyA6IG5leHRSb3csIGluZGV4KTtcbiAgY29uc3QgdmFsdWUyID0gZ2V0Q2VsbFZhbHVlKGlzQXNjZW5kaW5nID8gbmV4dFJvdyA6IHRoaXNSb3csIGluZGV4KTtcblxuICAvLyBpZiBuZWl0aGVyIHZhbHVlIGlzIGVtcHR5LCBhbmQgaWYgYm90aCB2YWx1ZXMgYXJlIGFscmVhZHkgbnVtYmVycywgY29tcGFyZSBudW1lcmljYWxseVxuICBpZiAoXG4gICAgdmFsdWUxICYmXG4gICAgdmFsdWUyICYmXG4gICAgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUxKSkgJiZcbiAgICAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZTIpKVxuICApIHtcbiAgICByZXR1cm4gdmFsdWUxIC0gdmFsdWUyO1xuICB9XG4gIC8vIE90aGVyd2lzZSwgY29tcGFyZSBhbHBoYWJldGljYWxseSBiYXNlZCBvbiBjdXJyZW50IHVzZXIgbG9jYWxlXG4gIHJldHVybiB2YWx1ZTFcbiAgICAudG9TdHJpbmcoKVxuICAgIC5sb2NhbGVDb21wYXJlKHZhbHVlMiwgbmF2aWdhdG9yLmxhbmd1YWdlLCB7XG4gICAgICBudW1lcmljOiB0cnVlLFxuICAgICAgaWdub3JlUHVuY3R1YXRpb246IHRydWUsXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBjb2x1bW4gaGVhZGVycyBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiB0YWJsZSBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSB0YWJsZVxuICogQHJldHVybiB7YXJyYXk8SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRDb2x1bW5IZWFkZXJzID0gKHRhYmxlKSA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBzZWxlY3QoU09SVEFCTEVfSEVBREVSLCB0YWJsZSk7XG4gIHJldHVybiBoZWFkZXJzLmZpbHRlcigoaGVhZGVyKSA9PiBoZWFkZXIuY2xvc2VzdChUQUJMRSkgPT09IHRhYmxlKTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBidXR0b24gbGFiZWwgd2l0aGluIHRoZSBnaXZlbiBoZWFkZXIgZWxlbWVudCwgcmVzZXR0aW5nIGl0XG4gKiB0byB0aGUgZGVmYXVsdCBzdGF0ZSAocmVhZHkgdG8gc29ydCBhc2NlbmRpbmcpIGlmIGl0J3Mgbm8gbG9uZ2VyIHNvcnRlZFxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cbmNvbnN0IHVwZGF0ZVNvcnRMYWJlbCA9IChoZWFkZXIpID0+IHtcbiAgY29uc3QgaGVhZGVyTmFtZSA9IGhlYWRlci5pbm5lclRleHQ7XG4gIGNvbnN0IHNvcnRlZEFzY2VuZGluZyA9IGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HO1xuICBjb25zdCBpc1NvcnRlZCA9XG4gICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkcgfHxcbiAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IERFU0NFTkRJTkcgfHxcbiAgICBmYWxzZTtcbiAgY29uc3QgaGVhZGVyTGFiZWwgPSBgJHtoZWFkZXJOYW1lfScsIHNvcnRhYmxlIGNvbHVtbiwgY3VycmVudGx5ICR7XG4gICAgaXNTb3J0ZWRcbiAgICAgID8gYCR7c29ydGVkQXNjZW5kaW5nID8gYHNvcnRlZCAke0FTQ0VORElOR31gIDogYHNvcnRlZCAke0RFU0NFTkRJTkd9YH1gXG4gICAgICA6IFwidW5zb3J0ZWRcIlxuICB9YDtcbiAgY29uc3QgaGVhZGVyQnV0dG9uTGFiZWwgPSBgQ2xpY2sgdG8gc29ydCBieSAke2hlYWRlck5hbWV9IGluICR7XG4gICAgc29ydGVkQXNjZW5kaW5nID8gREVTQ0VORElORyA6IEFTQ0VORElOR1xuICB9IG9yZGVyLmA7XG4gIGhlYWRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGhlYWRlckxhYmVsKTtcbiAgaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoU09SVF9CVVRUT04pLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGhlYWRlckJ1dHRvbkxhYmVsKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBhcmlhLXNvcnQgYXR0cmlidXRlIG9uIHRoZSBnaXZlbiBoZWFkZXIgZWxlbWVudCwgYW5kIHJlc2V0IHRoZSBsYWJlbCBhbmQgYnV0dG9uIGljb25cbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5jb25zdCB1bnNldFNvcnQgPSAoaGVhZGVyKSA9PiB7XG4gIGhlYWRlci5yZW1vdmVBdHRyaWJ1dGUoU09SVEVEKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG59O1xuXG4vKipcbiAqIFNvcnQgcm93cyBlaXRoZXIgYXNjZW5kaW5nIG9yIGRlc2NlbmRpbmcsIGJhc2VkIG9uIGEgZ2l2ZW4gaGVhZGVyJ3MgYXJpYS1zb3J0IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjZW5kaW5nXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNvcnRSb3dzID0gKGhlYWRlciwgaXNBc2NlbmRpbmcpID0+IHtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShTT1JURUQsIGlzQXNjZW5kaW5nID09PSB0cnVlID8gREVTQ0VORElORyA6IEFTQ0VORElORyk7XG4gIHVwZGF0ZVNvcnRMYWJlbChoZWFkZXIpO1xuXG4gIGNvbnN0IHRib2R5ID0gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcblxuICAvLyBXZSBjYW4gdXNlIEFycmF5LmZyb20oKSBhbmQgQXJyYXkuc29ydCgpIGluc3RlYWQgb25jZSB3ZSBkcm9wIElFMTEgc3VwcG9ydCwgbGlrZWx5IGluIHRoZSBzdW1tZXIgb2YgMjAyMVxuICAvL1xuICAvLyBBcnJheS5mcm9tKHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJykuc29ydChcbiAgLy8gICBjb21wYXJlRnVuY3Rpb24oXG4gIC8vICAgICBBcnJheS5mcm9tKGhlYWRlci5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGhlYWRlciksXG4gIC8vICAgICAhaXNBc2NlbmRpbmcpXG4gIC8vICAgKVxuICAvLyAuZm9yRWFjaCh0ciA9PiB0Ym9keS5hcHBlbmRDaGlsZCh0cikgKTtcblxuICAvLyBbXS5zbGljZS5jYWxsKCkgdHVybnMgYXJyYXktbGlrZSBzZXRzIGludG8gdHJ1ZSBhcnJheXMgc28gdGhhdCB3ZSBjYW4gc29ydCB0aGVtXG4gIGNvbnN0IGFsbFJvd3MgPSBbXS5zbGljZS5jYWxsKHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0clwiKSk7XG4gIGNvbnN0IGFsbEhlYWRlcnMgPSBbXS5zbGljZS5jYWxsKGhlYWRlci5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgY29uc3QgdGhpc0hlYWRlckluZGV4ID0gYWxsSGVhZGVycy5pbmRleE9mKGhlYWRlcik7XG4gIGFsbFJvd3Muc29ydChjb21wYXJlRnVuY3Rpb24odGhpc0hlYWRlckluZGV4LCAhaXNBc2NlbmRpbmcpKS5mb3JFYWNoKCh0cikgPT4ge1xuICAgIFtdLnNsaWNlXG4gICAgICAuY2FsbCh0ci5jaGlsZHJlbilcbiAgICAgIC5mb3JFYWNoKCh0ZCkgPT4gdGQucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zb3J0LWFjdGl2ZVwiKSk7XG4gICAgdHIuY2hpbGRyZW5bdGhpc0hlYWRlckluZGV4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYWN0aXZlXCIsIHRydWUpO1xuICAgIHRib2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgbGl2ZSByZWdpb24gaW1tZWRpYXRlbHkgZm9sbG93aW5nIHRoZSB0YWJsZSB3aGVuZXZlciBzb3J0IGNoYW5nZXMuXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHRhYmxlXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBzb3J0ZWRIZWFkZXJcbiAqL1xuXG5jb25zdCB1cGRhdGVMaXZlUmVnaW9uID0gKHRhYmxlLCBzb3J0ZWRIZWFkZXIpID0+IHtcbiAgY29uc3QgY2FwdGlvbiA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoXCJjYXB0aW9uXCIpLmlubmVyVGV4dDtcbiAgY29uc3Qgc29ydGVkQXNjZW5kaW5nID0gc29ydGVkSGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIGNvbnN0IGhlYWRlckxhYmVsID0gc29ydGVkSGVhZGVyLmlubmVyVGV4dDtcbiAgY29uc3QgbGl2ZVJlZ2lvbiA9IHRhYmxlLm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGxpdmVSZWdpb24gJiYgbGl2ZVJlZ2lvbi5tYXRjaGVzKEFOTk9VTkNFTUVOVF9SRUdJT04pKSB7XG4gICAgY29uc3Qgc29ydEFubm91bmNlbWVudCA9IGBUaGUgdGFibGUgbmFtZWQgXCIke2NhcHRpb259XCIgaXMgbm93IHNvcnRlZCBieSAke2hlYWRlckxhYmVsfSBpbiAke1xuICAgICAgc29ydGVkQXNjZW5kaW5nID8gQVNDRU5ESU5HIDogREVTQ0VORElOR1xuICAgIH0gb3JkZXIuYDtcbiAgICBsaXZlUmVnaW9uLmlubmVyVGV4dCA9IHNvcnRBbm5vdW5jZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFRhYmxlIGNvbnRhaW5pbmcgYSBzb3J0YWJsZSBjb2x1bW4gaGVhZGVyIGlzIG5vdCBmb2xsb3dlZCBieSBhbiBhcmlhLWxpdmUgcmVnaW9uLmBcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFRvZ2dsZSBhIGhlYWRlcidzIHNvcnQgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGlzQXNjZW5kaW5nIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqL1xuY29uc3QgdG9nZ2xlU29ydCA9IChoZWFkZXIsIGlzQXNjZW5kaW5nKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpO1xuICBsZXQgc2FmZUFzY2VuZGluZyA9IGlzQXNjZW5kaW5nO1xuICBpZiAodHlwZW9mIHNhZmVBc2NlbmRpbmcgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgc2FmZUFzY2VuZGluZyA9IGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HO1xuICB9XG5cbiAgaWYgKCF0YWJsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtTT1JUQUJMRV9IRUFERVJ9IGlzIG1pc3Npbmcgb3V0ZXIgJHtUQUJMRX1gKTtcbiAgfVxuXG4gIHNhZmVBc2NlbmRpbmcgPSBzb3J0Um93cyhoZWFkZXIsIGlzQXNjZW5kaW5nKTtcblxuICBpZiAoc2FmZUFzY2VuZGluZykge1xuICAgIGdldENvbHVtbkhlYWRlcnModGFibGUpLmZvckVhY2goKG90aGVySGVhZGVyKSA9PiB7XG4gICAgICBpZiAob3RoZXJIZWFkZXIgIT09IGhlYWRlcikge1xuICAgICAgICB1bnNldFNvcnQob3RoZXJIZWFkZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHVwZGF0ZUxpdmVSZWdpb24odGFibGUsIGhlYWRlcik7XG4gIH1cbn07XG5cbi8qKlxuICoqIEluc2VydHMgYSBidXR0b24gd2l0aCBpY29uIGluc2lkZSBhIHNvcnRhYmxlIGhlYWRlclxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cblxuY29uc3QgY3JlYXRlSGVhZGVyQnV0dG9uID0gKGhlYWRlcikgPT4ge1xuICBjb25zdCBidXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbkVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiMFwiKTtcbiAgYnV0dG9uRWwuY2xhc3NMaXN0LmFkZChTT1JUX0JVVFRPTl9DTEFTUyk7XG4gIGJ1dHRvbkVsLmlubmVySFRNTCA9IGAke0lDT05fU09VUkNFfWA7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChidXR0b25FbCk7XG4gIHVwZGF0ZVNvcnRMYWJlbChoZWFkZXIpO1xufTtcblxuY29uc3QgdGFibGUgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtTT1JUX0JVVFRPTl0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlU29ydChcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xvc2VzdChTT1JUQUJMRV9IRUFERVIpLFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFNPUlRBQkxFX0hFQURFUikuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09XG4gICAgICAgICAgICBBU0NFTkRJTkdcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgY29uc3Qgc29ydGFibGVIZWFkZXJzID0gc2VsZWN0KFNPUlRBQkxFX0hFQURFUiwgcm9vdCk7XG4gICAgICBzb3J0YWJsZUhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyKSA9PiBjcmVhdGVIZWFkZXJCdXR0b24oaGVhZGVyKSk7XG5cbiAgICAgIGNvbnN0IGZpcnN0U29ydGVkID0gc29ydGFibGVIZWFkZXJzLmZpbHRlcihcbiAgICAgICAgKGhlYWRlcikgPT5cbiAgICAgICAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORyB8fFxuICAgICAgICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gREVTQ0VORElOR1xuICAgICAgKVswXTtcbiAgICAgIGlmICh0eXBlb2YgZmlyc3RTb3J0ZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gbm8gc29ydGFibGUgaGVhZGVycyBmb3VuZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzb3J0RGlyID0gZmlyc3RTb3J0ZWQuZ2V0QXR0cmlidXRlKFNPUlRFRCk7XG4gICAgICBpZiAoc29ydERpciA9PT0gQVNDRU5ESU5HKSB7XG4gICAgICAgIHRvZ2dsZVNvcnQoZmlyc3RTb3J0ZWQsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzb3J0RGlyID09PSBERVNDRU5ESU5HKSB7XG4gICAgICAgIHRvZ2dsZVNvcnQoZmlyc3RTb3J0ZWQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFRBQkxFLFxuICAgIFNPUlRBQkxFX0hFQURFUixcbiAgICBTT1JUX0JVVFRPTixcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0YWJsZTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jb25zdCB7IENPTUJPX0JPWF9DTEFTUywgZW5oYW5jZUNvbWJvQm94IH0gPSByZXF1aXJlKFwiLi9jb21iby1ib3hcIik7XG5cbmNvbnN0IFRJTUVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS10aW1lLXBpY2tlcmA7XG5jb25zdCBUSU1FX1BJQ0tFUiA9IGAuJHtUSU1FX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgTUFYX1RJTUUgPSA2MCAqIDI0IC0gMTtcbmNvbnN0IE1JTl9USU1FID0gMDtcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDMwO1xuY29uc3QgTUlOX1NURVAgPSAxO1xuXG5jb25zdCBGSUxURVJfREFUQVNFVCA9IHtcbiAgZmlsdGVyOlxuICAgIFwiMD97eyBob3VyUXVlcnlGaWx0ZXIgfX06e3ttaW51dGVRdWVyeUZpbHRlcn19Lip7eyBhcFF1ZXJ5RmlsdGVyIH19bT9cIixcbiAgYXBRdWVyeUZpbHRlcjogXCIoW2FwXSlcIixcbiAgaG91clF1ZXJ5RmlsdGVyOiBcIihbMS05XVswLTJdPylcIixcbiAgbWludXRlUXVlcnlGaWx0ZXI6IFwiW1xcXFxkXSs6KFswLTldezAsMn0pXCIsXG59O1xuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIG9mIGhoOm1tIGludG8gbWludXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lU3RyIHRoZSB0aW1lIHN0cmluZyB0byBwYXJzZVxuICogQHJldHVybnMge251bWJlcn0gdGhlIG51bWJlciBvZiBtaW51dGVzXG4gKi9cbmNvbnN0IHBhcnNlVGltZVN0cmluZyA9ICh0aW1lU3RyKSA9PiB7XG4gIGxldCBtaW51dGVzO1xuXG4gIGlmICh0aW1lU3RyKSB7XG4gICAgY29uc3QgW2hvdXJzLCBtaW5zXSA9IHRpbWVTdHIuc3BsaXQoXCI6XCIpLm1hcCgoc3RyKSA9PiB7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHZhbHVlID0gcGFyc2VkO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGhvdXJzICE9IG51bGwgJiYgbWlucyAhPSBudWxsKSB7XG4gICAgICBtaW51dGVzID0gaG91cnMgKiA2MCArIG1pbnM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pbnV0ZXM7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdHJhbnNmb3JtVGltZVBpY2tlciA9IChlbCkgPT4ge1xuICBjb25zdCB0aW1lUGlja2VyRWwgPSBlbC5jbG9zZXN0KFRJTUVfUElDS0VSKTtcblxuICBjb25zdCBpbml0aWFsSW5wdXRFbCA9IHRpbWVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKGBpbnB1dGApO1xuXG4gIGlmICghaW5pdGlhbElucHV0RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7VElNRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgaW5wdXRgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcblxuICBbXCJpZFwiLCBcIm5hbWVcIiwgXCJyZXF1aXJlZFwiLCBcImFyaWEtbGFiZWxcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIl0uZm9yRWFjaChcbiAgICAobmFtZSkgPT4ge1xuICAgICAgaWYgKGluaXRpYWxJbnB1dEVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgaW5pdGlhbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiB7XG4gICAgcmV0dXJuIGAwMDAwJHt2YWx1ZX1gLnNsaWNlKC1sZW5ndGgpO1xuICB9O1xuXG4gIGNvbnN0IGdldFRpbWVDb250ZXh0ID0gKG1pbnV0ZXMpID0+IHtcbiAgICBjb25zdCBtaW51dGUgPSBtaW51dGVzICUgNjA7XG4gICAgY29uc3QgaG91cjI0ID0gTWF0aC5mbG9vcihtaW51dGVzIC8gNjApO1xuICAgIGNvbnN0IGhvdXIxMiA9IGhvdXIyNCAlIDEyIHx8IDEyO1xuICAgIGNvbnN0IGFtcG0gPSBob3VyMjQgPCAxMiA/IFwiYW1cIiA6IFwicG1cIjtcblxuICAgIHJldHVybiB7XG4gICAgICBtaW51dGUsXG4gICAgICBob3VyMjQsXG4gICAgICBob3VyMTIsXG4gICAgICBhbXBtLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWluVGltZSA9IE1hdGgubWF4KFxuICAgIE1JTl9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5taW5UaW1lKSB8fCBNSU5fVElNRVxuICApO1xuICBjb25zdCBtYXhUaW1lID0gTWF0aC5taW4oXG4gICAgTUFYX1RJTUUsXG4gICAgcGFyc2VUaW1lU3RyaW5nKHRpbWVQaWNrZXJFbC5kYXRhc2V0Lm1heFRpbWUpIHx8IE1BWF9USU1FXG4gICk7XG4gIGNvbnN0IHN0ZXAgPSBNYXRoLmZsb29yKFxuICAgIE1hdGgubWF4KE1JTl9TVEVQLCB0aW1lUGlja2VyRWwuZGF0YXNldC5zdGVwIHx8IERFRkFVTFRfU1RFUClcbiAgKTtcblxuICBmb3IgKGxldCB0aW1lID0gbWluVGltZTsgdGltZSA8PSBtYXhUaW1lOyB0aW1lICs9IHN0ZXApIHtcbiAgICBjb25zdCB7IG1pbnV0ZSwgaG91cjI0LCBob3VyMTIsIGFtcG0gfSA9IGdldFRpbWVDb250ZXh0KHRpbWUpO1xuXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBgJHtwYWRaZXJvcyhob3VyMjQsIDIpfToke3BhZFplcm9zKG1pbnV0ZSwgMil9YDtcbiAgICBvcHRpb24udGV4dCA9IGAke2hvdXIxMn06JHtwYWRaZXJvcyhtaW51dGUsIDIpfSR7YW1wbX1gO1xuICAgIHNlbGVjdEVsLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICB0aW1lUGlja2VyRWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfQ0xBU1MpO1xuXG4gIC8vIGNvbWJvIGJveCBwcm9wZXJ0aWVzXG4gIE9iamVjdC5rZXlzKEZJTFRFUl9EQVRBU0VUKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICB0aW1lUGlja2VyRWwuZGF0YXNldFtrZXldID0gRklMVEVSX0RBVEFTRVRba2V5XTtcbiAgfSk7XG4gIHRpbWVQaWNrZXJFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPSBcInRydWVcIjtcblxuICB0aW1lUGlja2VyRWwuYXBwZW5kQ2hpbGQoc2VsZWN0RWwpO1xuICBpbml0aWFsSW5wdXRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59O1xuXG5jb25zdCB0aW1lUGlja2VyID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoVElNRV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKHRpbWVQaWNrZXJFbCkgPT4ge1xuICAgICAgICB0cmFuc2Zvcm1UaW1lUGlja2VyKHRpbWVQaWNrZXJFbCk7XG4gICAgICAgIGVuaGFuY2VDb21ib0JveCh0aW1lUGlja2VyRWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBGSUxURVJfREFUQVNFVCxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0aW1lUGlja2VyO1xuIiwiLy8gVG9vbHRpcHNcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuXG5jb25zdCBUT09MVElQID0gYC4ke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX1RSSUdHRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX3RyaWdnZXJgO1xuY29uc3QgVE9PTFRJUF9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX0JPRFlfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX2JvZHlgO1xuY29uc3QgU0VUX0NMQVNTID0gXCJpcy1zZXRcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcbmNvbnN0IFRSSUFOR0xFX1NJWkUgPSA1O1xuY29uc3QgQURKVVNUX1dJRFRIX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX19ib2R5LS13cmFwYDtcblxuLyoqXG4gKiBBZGQgb25lIG9yIG1vcmUgbGlzdGVuZXJzIHRvIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCAtIERPTSBlbGVtZW50IHRvIGFkZCBsaXN0ZW5lcnMgdG9cbiAqIEBwYXJhbSB7ZXZlbnRzfSBldmVudE5hbWVzIC0gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMsIGUuZy4gJ2NsaWNrIGNoYW5nZSdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gZnVuY3Rpb24gdG8gYXR0YWNoIGZvciBlYWNoIGV2ZW50IGFzIGEgbGlzdGVuZXJcbiAqL1xuY29uc3QgYWRkTGlzdGVuZXJNdWx0aSA9IChlbGVtZW50LCBldmVudE5hbWVzLCBsaXN0ZW5lcikgPT4ge1xuICBjb25zdCBldmVudHMgPSBldmVudE5hbWVzLnNwbGl0KFwiIFwiKTtcbiAgZm9yIChsZXQgaSA9IDAsIGlMZW4gPSBldmVudHMubGVuZ3RoOyBpIDwgaUxlbjsgaSArPSAxKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTaG93cyB0aGUgdG9vbHRpcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgLSB0aGUgZWxlbWVudCB0aGF0IGluaXRpYWxpemVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNob3dUb29sVGlwID0gKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24pID0+IHtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcblxuICAvLyBUaGlzIHNldHMgdXAgdGhlIHRvb2x0aXAgYm9keS4gVGhlIG9wYWNpdHkgaXMgMCwgYnV0XG4gIC8vIHdlIGNhbiBiZWdpbiBydW5uaW5nIHRoZSBjYWxjdWxhdGlvbnMgYmVsb3cuXG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoU0VUX0NMQVNTKTtcblxuICAvKipcbiAgICogUG9zaXRpb24gdGhlIHRvb2x0aXAgYm9keSB3aGVuIHRoZSB0cmlnZ2VyIGlzIGhvdmVyZWRcbiAgICogUmVtb3ZlcyBvbGQgcG9zaXRpb25pbmcgY2xhc3NuYW1lcyBhbmQgcmVhcHBsaWVzLiBUaGlzIGFsbG93c1xuICAgKiBwb3NpdGlvbmluZyB0byBjaGFuZ2UgaW4gY2FzZSB0aGUgdXNlciByZXNpemVzIGJyb3dzZXIgb3IgRE9NIG1hbmlwdWxhdGlvblxuICAgKiBjYXVzZXMgdG9vbHRpcCB0byBnZXQgY2xpcHBlZCBmcm9tIHZpZXdwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXRQb3MgLSBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJyaWdodFwiLCBcImxlZnRcIlxuICAgKi9cbiAgY29uc3Qgc2V0UG9zaXRpb25DbGFzcyA9IChzZXRQb3MpID0+IHtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLXRvcGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tYm90dG9tYCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1yaWdodGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tbGVmdGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tJHtzZXRQb3N9YCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgb2xkIHBvc2l0aW9uaW5nIHN0eWxlcy4gVGhpcyBhbGxvd3NcbiAgICogcmUtcG9zaXRpb25pbmcgdG8gY2hhbmdlIHdpdGhvdXQgaW5oZXJpdGluZyBvdGhlclxuICAgKiBkeW5hbWljIHN0eWxlc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCByZXNldFBvc2l0aW9uU3R5bGVzID0gKGUpID0+IHtcbiAgICAvLyB3ZSBkb24ndCBvdmVycmlkZSBhbnl0aGluZyBpbiB0aGUgc3R5bGVzaGVldCB3aGVuIGZpbmRpbmcgYWx0IHBvc2l0aW9uc1xuICAgIGUuc3R5bGUudG9wID0gbnVsbDtcbiAgICBlLnN0eWxlLmJvdHRvbSA9IG51bGw7XG4gICAgZS5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgZS5zdHlsZS5sZWZ0ID0gbnVsbDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIGdldCBtYXJnaW4gb2Zmc2V0IGNhbGN1bGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5VmFsdWUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG5cbiAgY29uc3Qgb2Zmc2V0TWFyZ2luID0gKHRhcmdldCwgcHJvcGVydHlWYWx1ZSkgPT5cbiAgICBwYXJzZUludChcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eVZhbHVlKSxcbiAgICAgIDEwXG4gICAgKTtcblxuICAvLyBvZmZzZXRMZWZ0ID0gdGhlIGxlZnQgcG9zaXRpb24sIGFuZCBtYXJnaW4gb2YgdGhlIGVsZW1lbnQsIHRoZSBsZWZ0XG4gIC8vIHBhZGRpbmcsIHNjcm9sbGJhciBhbmQgYm9yZGVyIG9mIHRoZSBvZmZzZXRQYXJlbnQgZWxlbWVudFxuICAvLyBvZmZzZXRXaWR0aCA9IFRoZSBvZmZzZXRXaWR0aCBwcm9wZXJ0eSByZXR1cm5zIHRoZSB2aWV3YWJsZSB3aWR0aCBvZiBhblxuICAvLyBlbGVtZW50IGluIHBpeGVscywgaW5jbHVkaW5nIHBhZGRpbmcsIGJvcmRlciBhbmQgc2Nyb2xsYmFyLCBidXQgbm90XG4gIC8vIHRoZSBtYXJnaW4uXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBtYXJnaW4gb2Zmc2V0XG4gICAqIHRvb2x0aXAgdHJpZ2dlciBtYXJnaW4ocG9zaXRpb24pIG9mZnNldCArIHRvb2x0aXBCb2R5IG9mZnNldFdpZHRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJnaW5Qb3NpdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdG9vbHRpcEJvZHlPZmZzZXRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdHJpZ2dlclxuICAgKi9cblxuICBjb25zdCBjYWxjdWxhdGVNYXJnaW5PZmZzZXQgPSAoXG4gICAgbWFyZ2luUG9zaXRpb24sXG4gICAgdG9vbHRpcEJvZHlPZmZzZXQsXG4gICAgdHJpZ2dlclxuICApID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPVxuICAgICAgb2Zmc2V0TWFyZ2luKHRyaWdnZXIsIGBtYXJnaW4tJHttYXJnaW5Qb3NpdGlvbn1gKSA+IDBcbiAgICAgICAgPyB0b29sdGlwQm9keU9mZnNldCAtIG9mZnNldE1hcmdpbih0cmlnZ2VyLCBgbWFyZ2luLSR7bWFyZ2luUG9zaXRpb259YClcbiAgICAgICAgOiB0b29sdGlwQm9keU9mZnNldDtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSB0b3BcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25Ub3AgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7IC8vIGVuc3VyZXMgd2Ugc3RhcnQgZnJvbSB0aGUgc2FtZSBwb2ludFxuICAgIC8vIGdldCBkZXRhaWxzIG9uIHRoZSBlbGVtZW50cyBvYmplY3Qgd2l0aFxuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJ0b3BcIik7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYDUwJWA7IC8vIGNlbnRlciB0aGUgZWxlbWVudFxuICAgIGUuc3R5bGUudG9wID0gYC0ke1RSSUFOR0xFX1NJWkV9cHhgOyAvLyBjb25zaWRlciB0aGUgcHN1ZWRvIGVsZW1lbnRcbiAgICAvLyBhcHBseSBvdXIgbWFyZ2lucyBiYXNlZCBvbiB0aGUgb2ZmZXN0XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgLSR7dG9wTWFyZ2lufXB4IDAgMCAtJHtsZWZ0TWFyZ2luIC8gMn1weGA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSBib3R0b21cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25Cb3R0b20gPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJsZWZ0XCIsXG4gICAgICBlLm9mZnNldFdpZHRoLFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcImJvdHRvbVwiKTtcbiAgICBlLnN0eWxlLmxlZnQgPSBgNTAlYDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAke1RSSUFOR0xFX1NJWkV9cHggMCAwIC0ke2xlZnRNYXJnaW4gLyAyfXB4YDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uUmlnaHQgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwicmlnaHRcIik7XG4gICAgZS5zdHlsZS50b3AgPSBgNTAlYDtcbiAgICBlLnN0eWxlLmxlZnQgPSBgJHtcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgKyB0b29sdGlwVHJpZ2dlci5vZmZzZXRXaWR0aCArIFRSSUFOR0xFX1NJWkVcbiAgICB9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwIDBgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgcmlnaHRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25MZWZ0ID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgLy8gd2UgaGF2ZSB0byBjaGVjayBmb3Igc29tZSB1dGlsaXR5IG1hcmdpbnNcbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJsZWZ0XCIsXG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ID4gZS5vZmZzZXRXaWR0aFxuICAgICAgICA/IHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgLSBlLm9mZnNldFdpZHRoXG4gICAgICAgIDogZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIGUuc3R5bGUudG9wID0gYDUwJWA7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYC0ke1RSSUFOR0xFX1NJWkV9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwICR7XG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ID4gZS5vZmZzZXRXaWR0aCA/IGxlZnRNYXJnaW4gOiAtbGVmdE1hcmdpblxuICAgIH1weGA7IC8vIGFkanVzdCB0aGUgbWFyZ2luXG4gIH07XG5cbiAgLyoqXG4gICAqIFdlIHRyeSB0byBzZXQgdGhlIHBvc2l0aW9uIGJhc2VkIG9uIHRoZVxuICAgKiBvcmlnaW5hbCBpbnRlbnRpb24sIGJ1dCBtYWtlIGFkanVzdG1lbnRzXG4gICAqIGlmIHRoZSBlbGVtZW50IGlzIGNsaXBwZWQgb3V0IG9mIHRoZSB2aWV3cG9ydFxuICAgKiB3ZSBjb25zdHJhaW4gdGhlIHdpZHRoIG9ubHkgYXMgYSBsYXN0IHJlc29ydFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50KGFsaWFzIHRvb2x0aXBCb2R5KVxuICAgKiBAcGFyYW0ge051bWJlcn0gYXR0ZW1wdCAoLS1mbGFnKVxuICAgKi9cblxuICBjb25zdCBtYXhBdHRlbXB0cyA9IDI7XG5cbiAgZnVuY3Rpb24gZmluZEJlc3RQb3NpdGlvbihlbGVtZW50LCBhdHRlbXB0ID0gMSkge1xuICAgIC8vIGNyZWF0ZSBhcnJheSBvZiBvcHRpb25hbCBwb3NpdGlvbnNcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICBwb3NpdGlvblRvcCxcbiAgICAgIHBvc2l0aW9uQm90dG9tLFxuICAgICAgcG9zaXRpb25SaWdodCxcbiAgICAgIHBvc2l0aW9uTGVmdCxcbiAgICBdO1xuXG4gICAgbGV0IGhhc1Zpc2libGVQb3NpdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gd2UgdGFrZSBhIHJlY3Vyc2l2ZSBhcHByb2FjaFxuICAgIGZ1bmN0aW9uIHRyeVBvc2l0aW9ucyhpKSB7XG4gICAgICBpZiAoaSA8IHBvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25zW2ldO1xuICAgICAgICBwb3MoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgdHJ5UG9zaXRpb25zKChpICs9IDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYXNWaXNpYmxlUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5UG9zaXRpb25zKDApO1xuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgYSBwb3NpdGlvbiB3ZSBjb21wcmVzcyBpdCBhbmQgdHJ5IGFnYWluXG4gICAgaWYgKCFoYXNWaXNpYmxlUG9zaXRpb24pIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChBREpVU1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgaWYgKGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24oZWxlbWVudCwgKGF0dGVtcHQgKz0gMSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlIFwidG9wXCI6XG4gICAgICBwb3NpdGlvblRvcCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgcG9zaXRpb25Cb3R0b20odG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgcG9zaXRpb25SaWdodCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIHBvc2l0aW9uTGVmdCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gc2tpcCBkZWZhdWx0IGNhc2VcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IHNob3cgdGhlIHRvb2x0aXAuIFRoZSBWSVNJQkxFX0NMQVNTXG4gICAqIHdpbGwgY2hhbmdlIHRoZSBvcGFjaXR5IHRvIDFcbiAgICovXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUyk7XG4gIH0sIDIwKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgdGhlIHByb3BlcnRpZXMgdG8gc2hvdyBhbmQgcG9zaXRpb24gdGhlIHRvb2x0aXAsXG4gKiBhbmQgcmVzZXRzIHRoZSB0b29sdGlwIHBvc2l0aW9uIHRvIHRoZSBvcmlnaW5hbCBpbnRlbnRpb25cbiAqIGluIGNhc2UgdGhlIHdpbmRvdyBpcyByZXNpemVkIG9yIHRoZSBlbGVtZW50IGlzIG1vdmVkIHRocm91Z2hcbiAqIERPTSBtYW5pdWxhdGlvbi5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBCb2R5IC0gVGhlIGJvZHkgb2YgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3QgaGlkZVRvb2xUaXAgPSAodG9vbHRpcEJvZHkpID0+IHtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShWSVNJQkxFX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShTRVRfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKEFESlVTVF9XSURUSF9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbn07XG5cbi8qKlxuICogU2V0dXAgdGhlIHRvb2x0aXAgY29tcG9uZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwVHJpZ2dlciBUaGUgZWxlbWVudCB0aGF0IGNyZWF0ZXMgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3Qgc2V0VXBBdHRyaWJ1dGVzID0gKHRvb2x0aXBUcmlnZ2VyKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBJRCA9IGB0b29sdGlwLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwMH1gO1xuICBjb25zdCB0b29sdGlwQ29udGVudCA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IHRvb2x0aXBCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IHBvc2l0aW9uID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKVxuICAgID8gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKVxuICAgIDogXCJ0b3BcIjtcbiAgY29uc3QgYWRkaXRpb25hbENsYXNzZXMgPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNsYXNzZXNcIik7XG5cbiAgLy8gU2V0IHVwIHRvb2x0aXAgYXR0cmlidXRlc1xuICB0b29sdGlwVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIHRvb2x0aXBJRCk7XG4gIHRvb2x0aXBUcmlnZ2VyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiMFwiKTtcbiAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJcIik7XG4gIHRvb2x0aXBUcmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoVE9PTFRJUF9DTEFTUyk7XG4gIHRvb2x0aXBUcmlnZ2VyLmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9UUklHR0VSX0NMQVNTKTtcblxuICAvLyBpbnNlcnQgd3JhcHBlciBiZWZvcmUgZWwgaW4gdGhlIERPTSB0cmVlXG4gIHRvb2x0aXBUcmlnZ2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHRvb2x0aXBUcmlnZ2VyKTtcblxuICAvLyBzZXQgdXAgdGhlIHdyYXBwZXJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZCh0b29sdGlwVHJpZ2dlcik7XG4gIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChUT09MVElQX0NMQVNTKTtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZCh0b29sdGlwQm9keSk7XG5cbiAgLy8gQXBwbHkgYWRkaXRpb25hbCBjbGFzcyBuYW1lcyB0byB3cmFwcGVyIGVsZW1lbnRcbiAgaWYgKGFkZGl0aW9uYWxDbGFzc2VzKSB7XG4gICAgY29uc3QgY2xhc3Nlc0FycmF5ID0gYWRkaXRpb25hbENsYXNzZXMuc3BsaXQoXCIgXCIpO1xuICAgIGNsYXNzZXNBcnJheS5mb3JFYWNoKChjbGFzc25hbWUpID0+IHdyYXBwZXIuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpKTtcbiAgfVxuXG4gIC8vIHNldCB1cCB0aGUgdG9vbHRpcCBib2R5XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9CT0RZX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiaWRcIiwgdG9vbHRpcElEKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInRvb2x0aXBcIik7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAvLyBwbGFjZSB0aGUgdGV4dCBpbiB0aGUgdG9vbHRpcFxuICB0b29sdGlwQm9keS5pbm5lckhUTUwgPSB0b29sdGlwQ29udGVudDtcblxuICByZXR1cm4geyB0b29sdGlwQm9keSwgcG9zaXRpb24sIHRvb2x0aXBDb250ZW50LCB3cmFwcGVyIH07XG59O1xuXG4vLyBTZXR1cCBvdXIgZnVuY3Rpb24gdG8gcnVuIG9uIHZhcmlvdXMgZXZlbnRzXG5jb25zdCB0b29sdGlwID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoVE9PTFRJUCwgcm9vdCkuZm9yRWFjaCgodG9vbHRpcFRyaWdnZXIpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRvb2x0aXBCb2R5LFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHRvb2x0aXBDb250ZW50LFxuICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgIH0gPSBzZXRVcEF0dHJpYnV0ZXModG9vbHRpcFRyaWdnZXIpO1xuXG4gICAgICAgIGlmICh0b29sdGlwQ29udGVudCkge1xuICAgICAgICAgIC8vIExpc3RlbmVycyBmb3Igc2hvd2luZyBhbmQgaGlkaW5nIHRoZSB0b29sdGlwXG4gICAgICAgICAgYWRkTGlzdGVuZXJNdWx0aSh0b29sdGlwVHJpZ2dlciwgXCJtb3VzZWVudGVyIGZvY3VzXCIsICgpID0+IHtcbiAgICAgICAgICAgIHNob3dUb29sVGlwKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24sIHdyYXBwZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gS2V5ZG93biBoZXJlIHByZXZlbnRzIHRvb2x0aXBzIGZyb20gYmVpbmcgcmVhZCB0d2ljZSBieVxuICAgICAgICAgIC8vIHNjcmVlbiByZWFkZXIuIGFsc28gYWxsb3dzIGV4Y2FwZSBrZXkgdG8gY2xvc2UgaXRcbiAgICAgICAgICAvLyAoYWxvbmcgd2l0aCBhbnkgb3RoZXIuKVxuICAgICAgICAgIGFkZExpc3RlbmVyTXVsdGkodG9vbHRpcFRyaWdnZXIsIFwibW91c2VsZWF2ZSBibHVyIGtleWRvd25cIiwgKCkgPT4ge1xuICAgICAgICAgICAgaGlkZVRvb2xUaXAodG9vbHRpcEJvZHkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRocm93IGVycm9yIG9yIGxldCBvdGhlciB0b29sdGlwcyBvbiBwYWdlIGZ1bmN0aW9uP1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2x0aXA7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZShcIi4uL3V0aWxzL3ZhbGlkYXRlLWlucHV0XCIpO1xuXG5mdW5jdGlvbiBjaGFuZ2UoKSB7XG4gIHZhbGlkYXRlKHRoaXMpO1xufVxuXG5jb25zdCB2YWxpZGF0b3IgPSBiZWhhdmlvcih7XG4gIFwia2V5dXAgY2hhbmdlXCI6IHtcbiAgICBcImlucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XVwiOiBjaGFuZ2UsXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiBcInVzYVwiLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBUaGlzIHVzZWQgdG8gYmUgY29uZGl0aW9uYWxseSBkZXBlbmRlbnQgb24gd2hldGhlciB0aGVcbiAgLy8gYnJvd3NlciBzdXBwb3J0ZWQgdG91Y2ggZXZlbnRzOyBpZiBpdCBkaWQsIGBDTElDS2Agd2FzIHNldCB0b1xuICAvLyBgdG91Y2hzdGFydGAuICBIb3dldmVyLCB0aGlzIGhhZCBkb3duc2lkZXM6XG4gIC8vXG4gIC8vICogSXQgcHJlLWVtcHRlZCBtb2JpbGUgYnJvd3NlcnMnIGRlZmF1bHQgYmVoYXZpb3Igb2YgZGV0ZWN0aW5nXG4gIC8vICAgd2hldGhlciBhIHRvdWNoIHR1cm5lZCBpbnRvIGEgc2Nyb2xsLCB0aGVyZWJ5IHByZXZlbnRpbmdcbiAgLy8gICB1c2VycyBmcm9tIHVzaW5nIHNvbWUgb2Ygb3VyIGNvbXBvbmVudHMgYXMgc2Nyb2xsIHN1cmZhY2VzLlxuICAvL1xuICAvLyAqIFNvbWUgZGV2aWNlcywgc3VjaCBhcyB0aGUgTWljcm9zb2Z0IFN1cmZhY2UgUHJvLCBzdXBwb3J0ICpib3RoKlxuICAvLyAgIHRvdWNoIGFuZCBjbGlja3MuIFRoaXMgbWVhbnQgdGhlIGNvbmRpdGlvbmFsIGVmZmVjdGl2ZWx5IGRyb3BwZWRcbiAgLy8gICBzdXBwb3J0IGZvciB0aGUgdXNlcidzIG1vdXNlLCBmcnVzdHJhdGluZyB1c2VycyB3aG8gcHJlZmVycmVkXG4gIC8vICAgaXQgb24gdGhvc2Ugc3lzdGVtcy5cbiAgQ0xJQ0s6IFwiY2xpY2tcIixcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXG4gIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBfcGFyYW1zKSB7XG4gICAgY29uc3QgcGFyYW1zID0gX3BhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KFxuICAgICAgZXZlbnQsXG4gICAgICBwYXJhbXMuYnViYmxlcyxcbiAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLFxuICAgICAgcGFyYW1zLmRldGFpbFxuICAgICk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xufSkoKTtcbiIsImNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxuaWYgKCEoSElEREVOIGluIGVscHJvdG8pKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbHByb3RvLCBISURERU4sIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZShcImNsYXNzbGlzdC1wb2x5ZmlsbFwiKTtcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGlkZGVuXG5yZXF1aXJlKFwiLi9lbGVtZW50LWhpZGRlblwiKTtcbi8vIHBvbHlmaWxscyBOdW1iZXIuaXNOYU4oKVxucmVxdWlyZShcIi4vbnVtYmVyLWlzLW5hblwiKTtcbi8vIHBvbHlmaWxscyBDdXN0b21FdmVudFxucmVxdWlyZShcIi4vY3VzdG9tLWV2ZW50XCIpO1xuLy8gcG9seWZpbGxzIHN2ZzRldmVyeWJvZHlcbnJlcXVpcmUoXCIuL3N2ZzRldmVyeWJvZHlcIik7XG5cbiIsIk51bWJlci5pc05hTiA9XG4gIE51bWJlci5pc05hTiB8fFxuICBmdW5jdGlvbiBpc05hTihpbnB1dCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSBcIm51bWJlclwiICYmIGlucHV0ICE9PSBpbnB1dDtcbiAgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4hZnVuY3Rpb24oZmFjdG9yeSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn0oZnVuY3Rpb24oKSB7XG4gIC8qISBzdmc0ZXZlcnlib2R5IHYyLjEuOSB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9zdmc0ZXZlcnlib2R5ICovXG4gIGZ1bmN0aW9uIGVtYmVkKHBhcmVudCwgc3ZnLCB0YXJnZXQsIHVzZSkge1xuICAgICAgLy8gaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAvLyBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIHRoZSBjb250ZW50cyBvZiB0aGUgdGFyZ2V0XG4gICAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCB2aWV3Qm94ID0gIXN2Zy5oYXNBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIpO1xuICAgICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgICAgICB2aWV3Qm94ICYmIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuICAgICAgICAgIC8vIGNvcHkgdGhlIGNvbnRlbnRzIG9mIHRoZSBjbG9uZSBpbnRvIHRoZSBmcmFnbWVudFxuICAgICAgICAgIGZvciAoLy8gY2xvbmUgdGhlIHRhcmdldFxuICAgICAgICAgIHZhciBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUgPyBkb2N1bWVudC5pbXBvcnROb2RlKHRhcmdldCwgITApIDogdGFyZ2V0LmNsb25lTm9kZSghMCksIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnLm5hbWVzcGFjZVVSSSB8fCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTsgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGg7ICkge1xuICAgICAgICAgICAgICBnLmFwcGVuZENoaWxkKGNsb25lLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodXNlKSB7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyB1c2UuYXR0cmlidXRlcy5sZW5ndGggPiBpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gdXNlLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgICAgICAgICBcInhsaW5rOmhyZWZcIiAhPT0gYXR0ci5uYW1lICYmIFwiaHJlZlwiICE9PSBhdHRyLm5hbWUgJiYgZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChnKSwgLy8gYXBwZW5kIHRoZSBmcmFnbWVudCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgICAgfVxuICB9XG4gIGZ1bmN0aW9uIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhociwgdXNlKSB7XG4gICAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGlmIHRoZSByZXF1ZXN0IGlzIHJlYWR5XG4gICAgICAgICAgaWYgKDQgPT09IHhoci5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnRcbiAgICAgICAgICAgICAgdmFyIGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudDtcbiAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudCBiYXNlZCBvbiB0aGUgeGhyIHJlc3BvbnNlXG4gICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50IHx8IChjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIiksXG4gICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dCwgLy8gZW5zdXJlIGRvbWFpbnMgYXJlIHRoZSBzYW1lLCBvdGhlcndpc2Ugd2UnbGwgaGF2ZSBpc3N1ZXMgYXBwZW5kaW5nIHRoZVxuICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIElFIDExXG4gICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50LmRvbWFpbiAhPT0gZG9jdW1lbnQuZG9tYWluICYmIChjYWNoZWREb2N1bWVudC5kb21haW4gPSBkb2N1bWVudC5kb21haW4pLFxuICAgICAgICAgICAgICB4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSwgLy8gY2xlYXIgdGhlIHhociBlbWJlZHMgbGlzdCBhbmQgZW1iZWQgZWFjaCBpdGVtXG4gICAgICAgICAgICAgIHhoci5fZW1iZWRzLnNwbGljZSgwKS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF07XG4gICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIHRhcmdldCB8fCAodGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF0gPSBjYWNoZWREb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmlkKSksXG4gICAgICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgdGFyZ2V0IGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgZW1iZWQoaXRlbS5wYXJlbnQsIGl0ZW0uc3ZnLCB0YXJnZXQsIHVzZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgIH0sIC8vIHRlc3QgdGhlIHJlYWR5IHN0YXRlIGNoYW5nZSBpbW1lZGlhdGVseVxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSgpO1xuICB9XG4gIGZ1bmN0aW9uIHN2ZzRldmVyeWJvZHkocmF3b3B0cykge1xuICAgICAgZnVuY3Rpb24gb25pbnRlcnZhbCgpIHtcbiAgICAgICAgICAvLyBpZiBhbGwgPHVzZT5zIGluIHRoZSBhcnJheSBhcmUgYmVpbmcgYnlwYXNzZWQsIGRvbid0IHByb2NlZWQuXG4gICAgICAgICAgaWYgKG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyAmJiB1c2VzLmxlbmd0aCAtIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA8PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2b2lkIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIHRoZXJlIGFyZSA8dXNlPnMgdG8gcHJvY2VzcywgcHJvY2VlZC5cbiAgICAgICAgICAvLyByZXNldCB0aGUgYnlwYXNzIGNvdW50ZXIsIHNpbmNlIHRoZSBjb3VudGVyIHdpbGwgYmUgaW5jcmVtZW50ZWQgZm9yIGV2ZXJ5IGJ5cGFzc2VkIGVsZW1lbnQsXG4gICAgICAgICAgLy8gZXZlbiBvbmVzIHRoYXQgd2VyZSBjb3VudGVkIGJlZm9yZS5cbiAgICAgICAgICBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPSAwO1xuICAgICAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgICAgIGZvciAoLy8gZ2V0IHRoZSBjYWNoZWQgPHVzZT4gaW5kZXhcbiAgICAgICAgICB2YXIgaW5kZXggPSAwOyBpbmRleCA8IHVzZXMubGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IDx1c2U+XG4gICAgICAgICAgICAgIHZhciB1c2UgPSB1c2VzW2luZGV4XSwgcGFyZW50ID0gdXNlLnBhcmVudE5vZGUsIHN2ZyA9IGdldFNWR0FuY2VzdG9yKHBhcmVudCksIHNyYyA9IHVzZS5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpIHx8IHVzZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgICAgICBpZiAoIXNyYyAmJiBvcHRzLmF0dHJpYnV0ZU5hbWUgJiYgKHNyYyA9IHVzZS5nZXRBdHRyaWJ1dGUob3B0cy5hdHRyaWJ1dGVOYW1lKSksXG4gICAgICAgICAgICAgIHN2ZyAmJiBzcmMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy52YWxpZGF0ZSB8fCBvcHRzLnZhbGlkYXRlKHNyYywgc3ZnLCB1c2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgPHVzZT4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNyYyBhbmQgZ2V0IHRoZSB1cmwgYW5kIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcmNTcGxpdCA9IHNyYy5zcGxpdChcIiNcIiksIHVybCA9IHNyY1NwbGl0LnNoaWZ0KCksIGlkID0gc3JjU3BsaXQuam9pbihcIiNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCB4aHIgcmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IHJlcXVlc3RzW3VybF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIHhociByZXF1ZXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyIHx8ICh4aHIgPSByZXF1ZXN0c1t1cmxdID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHhoci5vcGVuKFwiR0VUXCIsIHVybCksIHhoci5zZW5kKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcyA9IFtdKSwgLy8gYWRkIHRoZSBzdmcgYW5kIGlkIGFzIGFuIGl0ZW0gdG8gdGhlIHhociBlbWJlZHMgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ZnOiBzdmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgLy8gcHJlcGFyZSB0aGUgeGhyIHJlYWR5IHN0YXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyLCB1c2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIGxvY2FsIGlkIGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQocGFyZW50LCBzdmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSwgdXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICArK2luZGV4LCArK251bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY29udGludWUgdGhlIGludGVydmFsXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICAgIH1cbiAgICAgIHZhciBwb2x5ZmlsbCwgb3B0cyA9IE9iamVjdChyYXdvcHRzKSwgbmV3ZXJJRVVBID0gL1xcYlRyaWRlbnRcXC9bNTY3XVxcYnxcXGJNU0lFICg/Ojl8MTApXFwuMFxcYi8sIHdlYmtpdFVBID0gL1xcYkFwcGxlV2ViS2l0XFwvKFxcZCspXFxiLywgb2xkZXJFZGdlVUEgPSAvXFxiRWRnZVxcLzEyXFwuKFxcZCspXFxiLywgZWRnZVVBID0gL1xcYkVkZ2VcXC8uKFxcZCspXFxiLywgaW5JZnJhbWUgPSB3aW5kb3cudG9wICE9PSB3aW5kb3cuc2VsZjtcbiAgICAgIHBvbHlmaWxsID0gXCJwb2x5ZmlsbFwiIGluIG9wdHMgPyBvcHRzLnBvbHlmaWxsIDogbmV3ZXJJRVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHdlYmtpdFVBKSB8fCBbXSlbMV0gPCA1MzcgfHwgZWRnZVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgaW5JZnJhbWU7XG4gICAgICAvLyBjcmVhdGUgeGhyIHJlcXVlc3RzIG9iamVjdFxuICAgICAgdmFyIHJlcXVlc3RzID0ge30sIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dCwgdXNlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidXNlXCIpLCBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPSAwO1xuICAgICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgICAgcG9seWZpbGwgJiYgb25pbnRlcnZhbCgpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFNWR0FuY2VzdG9yKG5vZGUpIHtcbiAgICAgIGZvciAodmFyIHN2ZyA9IG5vZGU7IFwic3ZnXCIgIT09IHN2Zy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICYmIChzdmcgPSBzdmcucGFyZW50Tm9kZSk7ICkge31cbiAgICAgIHJldHVybiBzdmc7XG4gIH1cbiAgcmV0dXJuIHN2ZzRldmVyeWJvZHk7XG59KTtcbiIsImNvbnN0IGRvbXJlYWR5ID0gcmVxdWlyZShcImRvbXJlYWR5XCIpO1xuXG53aW5kb3cudXN3ZHNQcmVzZW50ID0gdHJ1ZTsgLy8gR0xPQkFMIHZhcmlhYmxlIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzd2RzLmpzIGhhcyBsb2FkZWQgaW4gdGhlIERPTS5cblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZGVmaW5lIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZSBtaXNzaW5nIGZyb21cbiAqIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZShcIi4vcG9seWZpbGxzXCIpO1xuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHNcIik7XG5jb25zdCBzdmc0ZXZlcnlib2R5ID0gcmVxdWlyZShcIi4vcG9seWZpbGxzL3N2ZzRldmVyeWJvZHlcIik7XG5cbnVzd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5kb21yZWFkeSgoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1trZXldO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH0pO1xuICBzdmc0ZXZlcnlib2R5KCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c3dkczsiLCJtb2R1bGUuZXhwb3J0cyA9IChodG1sRG9jdW1lbnQgPSBkb2N1bWVudCkgPT4gaHRtbERvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKFwib2JqZWN0LWFzc2lnblwiKTtcbmNvbnN0IEJlaGF2aW9yID0gcmVxdWlyZShcInJlY2VwdG9yL2JlaGF2aW9yXCIpO1xuXG4vKipcbiAqIEBuYW1lIHNlcXVlbmNlXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBzZXEgYW4gYXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHsgY2xvc3VyZSB9IGNhbGxIb29rc1xuICovXG4vLyBXZSB1c2UgYSBuYW1lZCBmdW5jdGlvbiBoZXJlIGJlY2F1c2Ugd2Ugd2FudCBpdCB0byBpbmhlcml0IGl0cyBsZXhpY2FsIHNjb3BlXG4vLyBmcm9tIHRoZSBiZWhhdmlvciBwcm9wcyBvYmplY3QsIG5vdCBmcm9tIHRoZSBtb2R1bGVcbmNvbnN0IHNlcXVlbmNlID0gKC4uLnNlcSkgPT5cbiAgZnVuY3Rpb24gY2FsbEhvb2tzKHRhcmdldCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBzZXEuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbbWV0aG9kXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXS5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogQG5hbWUgYmVoYXZpb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0P30gcHJvcHNcbiAqIEByZXR1cm4ge3JlY2VwdG9yLmJlaGF2aW9yfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChldmVudHMsIHByb3BzKSA9PlxuICBCZWhhdmlvcihcbiAgICBldmVudHMsXG4gICAgYXNzaWduKFxuICAgICAge1xuICAgICAgICBvbjogc2VxdWVuY2UoXCJpbml0XCIsIFwiYWRkXCIpLFxuICAgICAgICBvZmY6IHNlcXVlbmNlKFwidGVhcmRvd25cIiwgXCJyZW1vdmVcIiksXG4gICAgICB9LFxuICAgICAgcHJvcHNcbiAgICApXG4gICk7XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKFwib2JqZWN0LWFzc2lnblwiKTtcbmNvbnN0IHsga2V5bWFwIH0gPSByZXF1aXJlKFwicmVjZXB0b3JcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4vc2VsZWN0XCIpO1xuY29uc3QgYWN0aXZlRWxlbWVudCA9IHJlcXVpcmUoXCIuL2FjdGl2ZS1lbGVtZW50XCIpO1xuXG5jb25zdCBGT0NVU0FCTEUgPVxuICAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuXG5jb25zdCB0YWJIYW5kbGVyID0gKGNvbnRleHQpID0+IHtcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBzZWxlY3QoRk9DVVNBQkxFLCBjb250ZXh0KTtcbiAgY29uc3QgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbMF07XG4gIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cbiAgLy8gU3BlY2lhbCBydWxlcyBmb3Igd2hlbiB0aGUgdXNlciBpcyB0YWJiaW5nIGZvcndhcmQgZnJvbSB0aGUgbGFzdCBmb2N1c2FibGUgZWxlbWVudCxcbiAgLy8gb3Igd2hlbiB0YWJiaW5nIGJhY2t3YXJkcyBmcm9tIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudFxuICBmdW5jdGlvbiB0YWJBaGVhZChldmVudCkge1xuICAgIGlmIChhY3RpdmVFbGVtZW50KCkgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGFiQmFjayhldmVudCkge1xuICAgIGlmIChhY3RpdmVFbGVtZW50KCkgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIFRoaXMgY2hlY2tzIGlmIHlvdSB3YW50IHRvIHNldCB0aGUgaW5pdGlhbCBmb2N1cyB0byBhIGNvbnRhaW5lclxuICAgIC8vIGluc3RlYWQgb2YgYW4gZWxlbWVudCB3aXRoaW4sIGFuZCB0aGUgdXNlciB0YWJzIGJhY2suIFxuICAgIC8vIFRoZW4gd2Ugc2V0IHRoZSBmb2N1cyB0byB0aGUgZmlyc3RcbiAgICBlbHNlIGlmICghZm9jdXNhYmxlRWxlbWVudHMuaW5jbHVkZXMoYWN0aXZlRWxlbWVudCgpKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RUYWJTdG9wLFxuICAgIGxhc3RUYWJTdG9wLFxuICAgIHRhYkFoZWFkLFxuICAgIHRhYkJhY2ssXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250ZXh0LCBhZGRpdGlvbmFsS2V5QmluZGluZ3MgPSB7fSkgPT4ge1xuICBjb25zdCB0YWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKGNvbnRleHQpO1xuICBjb25zdCBiaW5kaW5ncyA9IGFkZGl0aW9uYWxLZXlCaW5kaW5ncztcbiAgY29uc3QgeyBFc2MsIEVzY2FwZSB9ID0gYmluZGluZ3M7XG5cbiAgaWYgKEVzY2FwZSAmJiAhRXNjKSBiaW5kaW5ncy5Fc2MgPSBFc2NhcGU7XG5cbiAgLy8gIFRPRE86IEluIHRoZSBmdXR1cmUsIGxvb3Agb3ZlciBhZGRpdGlvbmFsIGtleWJpbmRpbmdzIGFuZCBwYXNzIGFuIGFycmF5XG4gIC8vIG9mIGZ1bmN0aW9ucywgaWYgbmVjZXNzYXJ5LCB0byB0aGUgbWFwIGtleXMuIFRoZW4gcGVvcGxlIGltcGxlbWVudGluZ1xuICAvLyB0aGUgZm9jdXMgdHJhcCBjb3VsZCBwYXNzIGNhbGxiYWNrcyB0byBmaXJlIHdoZW4gdGFiYmluZ1xuICBjb25zdCBrZXlNYXBwaW5ncyA9IGtleW1hcChcbiAgICBhc3NpZ24oXG4gICAgICB7XG4gICAgICAgIFRhYjogdGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgICBcIlNoaWZ0K1RhYlwiOiB0YWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsS2V5QmluZGluZ3NcbiAgICApXG4gICk7XG5cbiAgY29uc3QgZm9jdXNUcmFwID0gYmVoYXZpb3IoXG4gICAge1xuICAgICAga2V5ZG93bjoga2V5TWFwcGluZ3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBpbml0KCkge1xuICAgICAgICAvLyBUT0RPOiBpcyB0aGlzIGRlc2lyZWFibGUgYmVoYXZpb3I/IFNob3VsZCB0aGUgdHJhcCBhbHdheXMgZG8gdGhpcyBieSBkZWZhdWx0IG9yIHNob3VsZFxuICAgICAgICAvLyB0aGUgY29tcG9uZW50IGdldHRpbmcgZGVjb3JhdGVkIGhhbmRsZSB0aGlzP1xuICAgICAgICBpZiAodGFiRXZlbnRIYW5kbGVyLmZpcnN0VGFiU3RvcCl7XG4gICAgICAgICAgdGFiRXZlbnRIYW5kbGVyLmZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlKGlzQWN0aXZlKSB7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgIHRoaXMub24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gZm9jdXNUcmFwO1xufTtcbiIsIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzXG5mdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0KFxuICBlbCxcbiAgd2luID0gd2luZG93LFxuICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuKSB7XG4gIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICByZXR1cm4gKFxuICAgIHJlY3QudG9wID49IDAgJiZcbiAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgIHJlY3QuYm90dG9tIDw9ICh3aW4uaW5uZXJIZWlnaHQgfHwgZG9jRWwuY2xpZW50SGVpZ2h0KSAmJlxuICAgIHJlY3QucmlnaHQgPD0gKHdpbi5pbm5lcldpZHRoIHx8IGRvY0VsLmNsaWVudFdpZHRoKVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRWxlbWVudEluVmlld3BvcnQ7XG4iLCIvLyBpT1MgZGV0ZWN0aW9uIGZyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzkwMzk4ODUvMTc3NzEwXG5mdW5jdGlvbiBpc0lvc0RldmljZSgpIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUG9kfGlQaG9uZXxpUGFkKS9nKSB8fFxuICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEpKSAmJlxuICAgICF3aW5kb3cuTVNTdHJlYW1cbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0lvc0RldmljZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gIC8vIENyZWF0aW5nIGludmlzaWJsZSBjb250YWluZXJcbiAgY29uc3Qgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnOyAvLyBmb3JjaW5nIHNjcm9sbGJhciB0byBhcHBlYXJcbiAgb3V0ZXIuc3R5bGUubXNPdmVyZmxvd1N0eWxlID0gJ3Njcm9sbGJhcic7IC8vIG5lZWRlZCBmb3IgV2luSlMgYXBwc1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICAvLyBDcmVhdGluZyBpbm5lciBlbGVtZW50IGFuZCBwbGFjaW5nIGl0IGluIHRoZSBjb250YWluZXJcbiAgY29uc3QgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICBcbiAgLy8gQ2FsY3VsYXRpbmcgZGlmZmVyZW5jZSBiZXR3ZWVuIGNvbnRhaW5lcidzIGZ1bGwgd2lkdGggYW5kIHRoZSBjaGlsZCB3aWR0aFxuICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IGAkeyhvdXRlci5vZmZzZXRXaWR0aCAtIGlubmVyLm9mZnNldFdpZHRoKX1weGA7XG5cbiAgLy8gUmVtb3ZpbmcgdGVtcG9yYXJ5IGVsZW1lbnRzIGZyb20gdGhlIERPTVxuICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG59O1xuIiwiLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChzZWxlY3RvciwgY29udGV4dCkgPT4ge1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIH1cblxuICBjb25zdCBzZWxlY3Rpb24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZWN0aW9uKTtcbn07XG4iLCIvKipcbiAqIEZsaXBzIGdpdmVuIElOUFVUIGVsZW1lbnRzIGJldHdlZW4gbWFza2VkIChoaWRpbmcgdGhlIGZpZWxkIHZhbHVlKSBhbmQgdW5tYXNrZWRcbiAqIEBwYXJhbSB7QXJyYXkuSFRNTEVsZW1lbnR9IGZpZWxkcyAtIEFuIGFycmF5IG9mIElOUFVUIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgLSBXaGV0aGVyIHRoZSBtYXNrIHNob3VsZCBiZSBhcHBsaWVkLCBoaWRpbmcgdGhlIGZpZWxkIHZhbHVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZpZWxkLCBtYXNrKSA9PiB7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIFwib2ZmXCIpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29ycmVjdFwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBtYXNrID8gXCJwYXNzd29yZFwiIDogXCJ0ZXh0XCIpO1xufTtcbiIsImNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKFwicmVzb2x2ZS1pZC1yZWZzXCIpO1xuY29uc3QgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZShcIi4vdG9nZ2xlLWZpZWxkLW1hc2tcIik7XG5cbmNvbnN0IENPTlRST0xTID0gXCJhcmlhLWNvbnRyb2xzXCI7XG5jb25zdCBQUkVTU0VEID0gXCJhcmlhLXByZXNzZWRcIjtcbmNvbnN0IFNIT1dfQVRUUiA9IFwiZGF0YS1zaG93LXRleHRcIjtcbmNvbnN0IEhJREVfQVRUUiA9IFwiZGF0YS1oaWRlLXRleHRcIjtcblxuLyoqXG4gKiBSZXBsYWNlIHRoZSB3b3JkIFwiU2hvd1wiIChvciBcInNob3dcIikgd2l0aCBcIkhpZGVcIiAob3IgXCJoaWRlXCIpIGluIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dUZXh0XG4gKiBAcmV0dXJuIHtzdHJvbmd9IGhpZGVUZXh0XG4gKi9cbmNvbnN0IGdldEhpZGVUZXh0ID0gKHNob3dUZXh0KSA9PlxuICBzaG93VGV4dC5yZXBsYWNlKC9cXGJTaG93XFxiL2ksIChzaG93KSA9PiBgJHtzaG93WzBdID09PSBcIlNcIiA/IFwiSFwiIDogXCJoXCJ9aWRlYCk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChlbCkgPT4ge1xuICAvLyB0aGlzIGlzIHRoZSAqdGFyZ2V0KiBzdGF0ZTpcbiAgLy8gKiBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGF0dHIgYW5kIGl0J3MgIT09IFwidHJ1ZVwiLCBwcmVzc2VkIGlzIHRydWVcbiAgLy8gKiBvdGhlcndpc2UsIHByZXNzZWQgaXMgZmFsc2VcbiAgY29uc3QgcHJlc3NlZCA9XG4gICAgZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpICYmIGVsLmdldEF0dHJpYnV0ZShQUkVTU0VEKSAhPT0gXCJ0cnVlXCI7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB0b2dnbGVGaWVsZE1hc2soZmllbGQsIHByZXNzZWQpKTtcblxuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShTSE9XX0FUVFIpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFNIT1dfQVRUUiwgZWwudGV4dENvbnRlbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hvd1RleHQgPSBlbC5nZXRBdHRyaWJ1dGUoU0hPV19BVFRSKTtcbiAgY29uc3QgaGlkZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoSElERV9BVFRSKSB8fCBnZXRIaWRlVGV4dChzaG93VGV4dCk7XG5cbiAgZWwudGV4dENvbnRlbnQgPSBwcmVzc2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsImNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICBsZXQgc2FmZUV4cGFuZGVkID0gZXhwYW5kZWQ7XG5cbiAgaWYgKHR5cGVvZiBzYWZlRXhwYW5kZWQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgc2FmZUV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwiZmFsc2VcIjtcbiAgfVxuXG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoRVhQQU5ERUQsIHNhZmVFeHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHRvZ2dsZSB0YXJnZXQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYCk7XG4gIH1cblxuICBpZiAoc2FmZUV4cGFuZGVkKSB7XG4gICAgY29udHJvbHMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gIH0gZWxzZSB7XG4gICAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gc2FmZUV4cGFuZGVkO1xufTtcbiIsImNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmNvbnN0IENIRUNLRUQgPSBcImFyaWEtY2hlY2tlZFwiO1xuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtLS1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZShlbCkge1xuICBjb25zdCBpZCA9IGVsLmRhdGFzZXQudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9XG4gICAgaWQuY2hhckF0KDApID09PSBcIiNcIlxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgaWYgKCFjaGVja0xpc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKGVsLmRhdGFzZXQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmIChrZXkuc3RhcnRzV2l0aChcInZhbGlkYXRlXCIpKSB7XG4gICAgICBjb25zdCB2YWxpZGF0b3JOYW1lID0ga2V5LnN1YnN0cihcInZhbGlkYXRlXCIubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGF0dGVybiA9IG5ldyBSZWdFeHAodmFsdWUpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yU2VsZWN0b3IgPSBgW2RhdGEtdmFsaWRhdG9yPVwiJHt2YWxpZGF0b3JOYW1lfVwiXWA7XG4gICAgICBjb25zdCB2YWxpZGF0b3JDaGVja2JveCA9IGNoZWNrTGlzdC5xdWVyeVNlbGVjdG9yKHZhbGlkYXRvclNlbGVjdG9yKTtcblxuICAgICAgaWYgKCF2YWxpZGF0b3JDaGVja2JveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRvciBjaGVja2JveCBmb3VuZCBmb3I6IFwiJHt2YWxpZGF0b3JOYW1lfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LnNldEF0dHJpYnV0ZShDSEVDS0VELCBjaGVja2VkKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
