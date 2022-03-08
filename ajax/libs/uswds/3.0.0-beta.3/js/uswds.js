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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

var behavior = require("../../utils/behavior");

var toggleFormInput = require("../../utils/toggle-form-input");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
    PREFIX = _require2.prefix;

var LINK = ".".concat(PREFIX, "-show-password, .").concat(PREFIX, "-show-multipassword");

function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, LINK, toggle)));

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/toggle-form-input":52}],16:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../../utils/select");

var behavior = require("../../utils/behavior");

var toggle = require("../../utils/toggle");

var isElementInViewport = require("../../utils/is-in-viewport");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
    PREFIX = _require2.prefix;

var ACCORDION = ".".concat(PREFIX, "-accordion, .").concat(PREFIX, "-accordion--bordered");
var BUTTON = ".".concat(PREFIX, "-accordion__button[aria-controls]");
var EXPANDED = "aria-expanded";
var MULTISELECTABLE = "data-allow-multiple";
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

  var multiselectable = accordion.hasAttribute(MULTISELECTABLE);

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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/is-in-viewport":45,"../../utils/select":50,"../../utils/toggle":53}],17:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../../utils/behavior");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
    PREFIX = _require2.prefix;

var HEADER = ".".concat(PREFIX, "-banner__header");
var EXPANDED_CLASS = "".concat(PREFIX, "-banner__header--expanded");

var toggleBanner = function toggleEl(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};

module.exports = behavior(_defineProperty({}, CLICK, _defineProperty({}, "".concat(HEADER, " [aria-controls]"), toggleBanner)));

},{"../../config":33,"../../events":34,"../../utils/behavior":43}],18:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var select = require("../../utils/select");

var behavior = require("../../utils/behavior");

var _require = require("../../config"),
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
  messageEl.textContent = newMessage;

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

},{"../../config":33,"../../utils/behavior":43,"../../utils/select":50}],19:[function(require,module,exports){
"use strict";

var _templateObject, _templateObject2, _CLICK, _keydown, _behavior;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keymap = require("receptor/keymap");

var selectOrMatches = require("../../utils/select-or-matches");

var behavior = require("../../utils/behavior");

var Sanitizer = require("../../utils/sanitizer");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var _require2 = require("../../events"),
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
    additionalAttributes.push({
      placeholder: placeholder
    });
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
      additionalAttributes.push(_defineProperty({}, name, value));
      selectEl.removeAttribute(name);
    }
  }); // sanitize doesn't like functions in template literals

  var input = document.createElement("input");
  input.setAttribute("id", selectId);
  input.setAttribute("aria-owns", listId);
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-describedby", assistiveHintID);
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("autocapitalize", "off");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("class", INPUT_CLASS);
  input.setAttribute("type", "text");
  input.setAttribute("role", "combobox");
  additionalAttributes.forEach(function (attr) {
    return Object.keys(attr).forEach(function (key) {
      var value = Sanitizer.escapeHTML(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), attr[key]);
      input.setAttribute(key, value);
    });
  });
  comboBoxEl.insertAdjacentElement("beforeend", input);
  comboBoxEl.insertAdjacentHTML("beforeend", Sanitizer.escapeHTML(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    <span class=\"", "\" tabindex=\"-1\">\n        <button type=\"button\" class=\"", "\" aria-label=\"Clear the select contents\">&nbsp;</button>\n      </span>\n      <span class=\"", "\">&nbsp;</span>\n      <span class=\"", "\" tabindex=\"-1\">\n        <button type=\"button\" tabindex=\"-1\" class=\"", "\" aria-label=\"Toggle the dropdown list\">&nbsp;</button>\n      </span>\n      <ul\n        tabindex=\"-1\"\n        id=\"", "\"\n        class=\"", "\"\n        role=\"listbox\"\n        aria-labelledby=\"", "\"\n        hidden>\n      </ul>\n      <div class=\"", " usa-sr-only\" role=\"status\"></div>\n      <span id=\"", "\" class=\"usa-sr-only\">\n        When autocomplete results are available use up and down arrows to review and enter to select.\n        Touch device users, explore by touch or with swipe gestures.\n      </span>"])), CLEAR_INPUT_BUTTON_WRAPPER_CLASS, CLEAR_INPUT_BUTTON_CLASS, INPUT_BUTTON_SEPARATOR_CLASS, TOGGLE_LIST_BUTTON_WRAPPER_CLASS, TOGGLE_LIST_BUTTON_CLASS, listId, LIST_CLASS, listIdLabel, STATUS_CLASS, assistiveHintID));

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
  find = "^(?:".concat(find, ")$");
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
    return li;
  });
  var noResults = document.createElement("li");
  noResults.setAttribute("class", "".concat(LIST_OPTION_CLASS, "--no-results"));
  noResults.textContent = "No results found";
  listEl.hidden = false;

  if (numOptions) {
    listEl.innerHTML = "";
    optionHtml.forEach(function (item) {
      return listEl.insertAdjacentElement("beforeend", item);
    });
  } else {
    listEl.innerHTML = "";
    listEl.insertAdjacentElement("beforeend", noResults);
  }

  inputEl.setAttribute("aria-expanded", "true");
  statusEl.textContent = numOptions ? "".concat(numOptions, " result").concat(numOptions > 1 ? "s" : "", " available.") : "No results.";
  var itemToFocus;

  if (isPristine && selectedItemId) {
    itemToFocus = listEl.querySelector("#".concat(selectedItemId));
  } else if (disableFiltering && firstFoundId) {
    itemToFocus = listEl.querySelector("#".concat(firstFoundId));
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
    selectOrMatches(COMBO_BOX, root).forEach(function (comboBoxEl) {
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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/sanitizer":47,"../../utils/select-or-matches":49,"receptor/keymap":12}],20:[function(require,module,exports){
"use strict";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _CLICK, _keydown, _focusout, _datePickerEvents;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var keymap = require("receptor/keymap");

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var selectOrMatches = require("../../utils/select-or-matches");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var _require2 = require("../../events"),
    CLICK = _require2.CLICK;

var activeElement = require("../../utils/active-element");

var isIosDevice = require("../../utils/is-ios-device");

var Sanitizer = require("../../utils/sanitizer");

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
    var monthStr;
    var dayStr;
    var yearStr;

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

  var _loop = function _loop() {
    row = [];
    var tr = document.createElement("tr");

    while (i < htmlArray.length && row.length < rowSize) {
      var td = document.createElement("td");
      td.insertAdjacentElement("beforeend", htmlArray[i]);
      row.push(td);
      i += 1;
    }

    row.forEach(function (element) {
      tr.insertAdjacentElement("beforeend", element);
    });
    grid.push(tr);
  };

  while (i < htmlArray.length) {
    _loop();
  }

  return grid;
};

var createTableBody = function createTableBody(grid) {
  var tableBody = document.createElement("tbody");
  grid.forEach(function (element) {
    tableBody.insertAdjacentElement("beforeend", element);
  });
  return tableBody;
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
  calendarWrapper.insertAdjacentHTML("beforeend", Sanitizer.escapeHTML(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    <button type=\"button\" class=\"", "\" aria-haspopup=\"true\" aria-label=\"Toggle calendar\">&nbsp;</button>\n    <div class=\"", "\" role=\"dialog\" aria-modal=\"true\" hidden></div>\n    <div class=\"usa-sr-only ", "\" role=\"status\" aria-live=\"polite\"></div>"])), DATE_PICKER_BUTTON_CLASS, DATE_PICKER_CALENDAR_CLASS, DATE_PICKER_STATUS_CLASS));
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
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("tabindex", tabindex);
    btn.setAttribute("class", classes.join(" "));
    btn.setAttribute("data-day", day);
    btn.setAttribute("data-month", month + 1);
    btn.setAttribute("data-year", year);
    btn.setAttribute("data-value", formattedDate);
    btn.setAttribute("aria-label", Sanitizer.escapeHTML(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", " ", " ", " ", ""])), day, monthStr, year, dayStr));
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");

    if (isDisabled === true) {
      btn.disabled = true;
    }

    btn.textContent = day;
    return btn;
  }; // set date to first rendered day


  dateToDisplay = startOfWeek(firstOfMonth);
  var days = [];

  while (days.length < 28 || dateToDisplay.getMonth() === focusedMonth || days.length % 7 !== 0) {
    days.push(generateDateHtml(dateToDisplay));
    dateToDisplay = addDays(dateToDisplay, 1);
  }

  var datesGrid = listToGridHtml(days, 7);
  var newCalendar = calendarEl.cloneNode();
  newCalendar.dataset.value = currentFormattedDate;
  newCalendar.style.top = "".concat(datePickerEl.offsetHeight, "px");
  newCalendar.hidden = false;
  newCalendar.innerHTML = Sanitizer.escapeHTML(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    <div tabindex=\"-1\" class=\"", "\">\n      <div class=\"", "\">\n        <div class=\"", " ", "\">\n          <button\n            type=\"button\"\n            class=\"", "\"\n            aria-label=\"Navigate back one year\"\n            ", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"", " ", "\">\n          <button\n            type=\"button\"\n            class=\"", "\"\n            aria-label=\"Navigate back one month\"\n            ", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"", " ", "\">\n          <button\n            type=\"button\"\n            class=\"", "\" aria-label=\"", ". Click to select month\"\n          >", "</button>\n          <button\n            type=\"button\"\n            class=\"", "\" aria-label=\"", ". Click to select year\"\n          >", "</button>\n        </div>\n        <div class=\"", " ", "\">\n          <button\n            type=\"button\"\n            class=\"", "\"\n            aria-label=\"Navigate forward one month\"\n            ", "\n          >&nbsp;</button>\n        </div>\n        <div class=\"", " ", "\">\n          <button\n            type=\"button\"\n            class=\"", "\"\n            aria-label=\"Navigate forward one year\"\n            ", "\n          >&nbsp;</button>\n        </div>\n      </div>\n    </div>\n    "])), CALENDAR_DATE_PICKER_CLASS, CALENDAR_ROW_CLASS, CALENDAR_CELL_CLASS, CALENDAR_CELL_CENTER_ITEMS_CLASS, CALENDAR_PREVIOUS_YEAR_CLASS, prevButtonsDisabled ? "disabled=\"disabled\"" : "", CALENDAR_CELL_CLASS, CALENDAR_CELL_CENTER_ITEMS_CLASS, CALENDAR_PREVIOUS_MONTH_CLASS, prevButtonsDisabled ? "disabled=\"disabled\"" : "", CALENDAR_CELL_CLASS, CALENDAR_MONTH_LABEL_CLASS, CALENDAR_MONTH_SELECTION_CLASS, monthLabel, monthLabel, CALENDAR_YEAR_SELECTION_CLASS, focusedYear, focusedYear, CALENDAR_CELL_CLASS, CALENDAR_CELL_CENTER_ITEMS_CLASS, CALENDAR_NEXT_MONTH_CLASS, nextButtonsDisabled ? "disabled=\"disabled\"" : "", CALENDAR_CELL_CLASS, CALENDAR_CELL_CENTER_ITEMS_CLASS, CALENDAR_NEXT_YEAR_CLASS, nextButtonsDisabled ? "disabled=\"disabled\"" : "");
  var table = document.createElement("table");
  table.setAttribute("class", CALENDAR_TABLE_CLASS);
  table.setAttribute("role", "presentation");
  var tableHead = document.createElement("thead");
  table.insertAdjacentElement("beforeend", tableHead);
  var tableHeadRow = document.createElement("tr");
  tableHead.insertAdjacentElement("beforeend", tableHeadRow);
  var daysOfWeek = {
    Sunday: "S",
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "S"
  };
  Object.keys(daysOfWeek).forEach(function (key) {
    var th = document.createElement("th");
    th.setAttribute("class", CALENDAR_DAY_OF_WEEK_CLASS);
    th.setAttribute("scope", "presentation");
    th.setAttribute("aria-label", key);
    th.textContent = daysOfWeek[key];
    tableHeadRow.insertAdjacentElement("beforeend", th);
  });
  var tableBody = createTableBody(datesGrid);
  table.insertAdjacentElement("beforeend", tableBody); // Container for Years, Months, and Days

  var datePickerCalendarContainer = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  datePickerCalendarContainer.insertAdjacentElement("beforeend", table);
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

    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("tabindex", tabindex);
    btn.setAttribute("class", classes.join(" "));
    btn.setAttribute("data-value", index);
    btn.setAttribute("data-label", month);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");

    if (isDisabled === true) {
      btn.disabled = true;
    }

    btn.textContent = month;
    return btn;
  });
  var monthsHtml = document.createElement("div");
  monthsHtml.setAttribute("tabindex", "-1");
  monthsHtml.setAttribute("class", CALENDAR_MONTH_PICKER_CLASS);
  var table = document.createElement("table");
  table.setAttribute("class", CALENDAR_TABLE_CLASS);
  table.setAttribute("role", "presentation");
  var monthsGrid = listToGridHtml(months, 3);
  var tableBody = createTableBody(monthsGrid);
  table.insertAdjacentElement("beforeend", tableBody);
  monthsHtml.insertAdjacentElement("beforeend", table);
  var newCalendar = calendarEl.cloneNode();
  newCalendar.insertAdjacentElement("beforeend", monthsHtml);
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

    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("tabindex", tabindex);
    btn.setAttribute("class", classes.join(" "));
    btn.setAttribute("data-value", yearIndex);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");

    if (isDisabled === true) {
      btn.disabled = true;
    }

    btn.textContent = yearIndex;
    years.push(btn);
    yearIndex += 1;
  }

  var newCalendar = calendarEl.cloneNode(); // create the years calendar wrapper

  var yearsCalendarWrapper = document.createElement("div");
  yearsCalendarWrapper.setAttribute("tabindex", "-1");
  yearsCalendarWrapper.setAttribute("class", CALENDAR_YEAR_PICKER_CLASS); // create table parent

  var yearsTableParent = document.createElement("table");
  yearsTableParent.setAttribute("role", "presentation");
  yearsTableParent.setAttribute("class", CALENDAR_TABLE_CLASS); // create table body and table row

  var yearsHTMLTableBody = document.createElement("tbody");
  var yearsHTMLTableBodyRow = document.createElement("tr"); // create previous button

  var previousYearsBtn = document.createElement("button");
  previousYearsBtn.setAttribute("type", "button");
  previousYearsBtn.setAttribute("class", CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS);
  previousYearsBtn.setAttribute("aria-label", "Navigate back ".concat(YEAR_CHUNK, " years"));

  if (prevYearChunkDisabled === true) {
    previousYearsBtn.disabled = true;
  }

  previousYearsBtn.innerHTML = Sanitizer.escapeHTML(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["&nbsp"]))); // create next button

  var nextYearsBtn = document.createElement("button");
  nextYearsBtn.setAttribute("type", "button");
  nextYearsBtn.setAttribute("class", CALENDAR_NEXT_YEAR_CHUNK_CLASS);
  nextYearsBtn.setAttribute("aria-label", "Navigate forward ".concat(YEAR_CHUNK, " years"));

  if (nextYearChunkDisabled === true) {
    nextYearsBtn.disabled = true;
  }

  nextYearsBtn.innerHTML = Sanitizer.escapeHTML(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["&nbsp"]))); // create the actual years table

  var yearsTable = document.createElement("table");
  yearsTable.setAttribute("class", CALENDAR_TABLE_CLASS);
  yearsTable.setAttribute("role", "presentation"); // create the years child table

  var yearsGrid = listToGridHtml(years, 3);
  var yearsTableBody = createTableBody(yearsGrid); // append the grid to the years child table

  yearsTable.insertAdjacentElement("beforeend", yearsTableBody); // create the prev button td and append the prev button

  var yearsHTMLTableBodyDetailPrev = document.createElement("td");
  yearsHTMLTableBodyDetailPrev.insertAdjacentElement("beforeend", previousYearsBtn); // create the years td and append the years child table

  var yearsHTMLTableBodyYearsDetail = document.createElement("td");
  yearsHTMLTableBodyYearsDetail.setAttribute("colspan", "3");
  yearsHTMLTableBodyYearsDetail.insertAdjacentElement("beforeend", yearsTable); // create the next button td and append the next button

  var yearsHTMLTableBodyDetailNext = document.createElement("td");
  yearsHTMLTableBodyDetailNext.insertAdjacentElement("beforeend", nextYearsBtn); // append the three td to the years child table row

  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyDetailPrev);
  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyYearsDetail);
  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyDetailNext); // append the table row to the years child table body

  yearsHTMLTableBody.insertAdjacentElement("beforeend", yearsHTMLTableBodyRow); // append the years table body to the years parent table

  yearsTableParent.insertAdjacentElement("beforeend", yearsHTMLTableBody); // append the parent table to the calendar wrapper

  yearsCalendarWrapper.insertAdjacentElement("beforeend", yearsTableParent); // append the years calender to the new calendar

  newCalendar.insertAdjacentElement("beforeend", yearsCalendarWrapper); // replace calendar

  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  statusEl.textContent = Sanitizer.escapeHTML(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Showing years ", " to ", ". Select a year."])), yearToChunk, yearToChunk + YEAR_CHUNK - 1);
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
  "Shift+PageUp": handleShiftPageUpFromDate,
  Tab: datePickerTabEventHandler.tabAhead
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
    selectOrMatches(DATE_PICKER, root).forEach(function (datePickerEl) {
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

},{"../../config":33,"../../events":34,"../../utils/active-element":42,"../../utils/behavior":43,"../../utils/is-ios-device":46,"../../utils/sanitizer":47,"../../utils/select":50,"../../utils/select-or-matches":49,"receptor/keymap":12}],21:[function(require,module,exports){
"use strict";

var _inputChange;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var selectOrMatches = require("../../utils/select-or-matches");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var _require2 = require("../usa-date-picker/date-picker"),
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
    selectOrMatches(DATE_RANGE_PICKER, root).forEach(function (dateRangePickerEl) {
      enhanceDateRangePicker(dateRangePickerEl);
    });
  }
});
module.exports = dateRangePicker;

},{"../../config":33,"../../utils/behavior":43,"../../utils/select":50,"../../utils/select-or-matches":49,"../usa-date-picker/date-picker":20}],22:[function(require,module,exports){
"use strict";

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var selectOrMatches = require("../../utils/select-or-matches");

var behavior = require("../../utils/behavior");

var Sanitizer = require("../../utils/sanitizer");

var _require = require("../../config"),
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
 * @returns {String} replaces specified values
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
}; // Takes a generated safe ID and creates a unique ID.


var createUniqueID = function createUniqueID(name) {
  return "".concat(name, "-").concat(Math.floor(Date.now().toString() / 1000));
};
/**
 * Builds full file input component
 * @param {HTMLElement} fileInputEl - original file input on page
 * @returns {HTMLElement|HTMLElement} - Instructions, target area div
 */


var buildFileInput = function buildFileInput(fileInputEl) {
  var acceptsMultiple = fileInputEl.hasAttribute("multiple");
  var fileInputParent = document.createElement("div");
  var dropTarget = document.createElement("div");
  var box = document.createElement("div");
  var instructions = document.createElement("div");
  var disabled = fileInputEl.hasAttribute("disabled");
  var defaultAriaLabel; // Adds class names and other attributes

  fileInputEl.classList.remove(DROPZONE_CLASS);
  fileInputEl.classList.add(INPUT_CLASS);
  fileInputParent.classList.add(DROPZONE_CLASS);
  box.classList.add(BOX_CLASS);
  instructions.classList.add(INSTRUCTIONS_CLASS);
  instructions.setAttribute("aria-hidden", "true");
  dropTarget.classList.add(TARGET_CLASS); // Encourage screenreader to read out aria changes immediately following upload status change

  fileInputEl.setAttribute("aria-live", "polite"); // Adds child elements to the DOM

  fileInputEl.parentNode.insertBefore(dropTarget, fileInputEl);
  fileInputEl.parentNode.insertBefore(fileInputParent, dropTarget);
  dropTarget.appendChild(fileInputEl);
  fileInputParent.appendChild(dropTarget);
  fileInputEl.parentNode.insertBefore(instructions, fileInputEl);
  fileInputEl.parentNode.insertBefore(box, fileInputEl); // Disabled styling

  if (disabled) {
    disable(fileInputEl);
  } // Sets instruction test and aria-label based on whether or not multiple files are accepted


  if (acceptsMultiple) {
    defaultAriaLabel = "No files selected";
    instructions.innerHTML = Sanitizer.escapeHTML(_templateObject || (_templateObject = _taggedTemplateLiteral(["<span class=\"", "\">Drag files here or </span><span class=\"", "\">choose from folder</span>"])), DRAG_TEXT_CLASS, CHOOSE_CLASS);
    fileInputEl.setAttribute("aria-label", defaultAriaLabel);
    fileInputEl.setAttribute("data-default-aria-label", defaultAriaLabel);
  } else {
    defaultAriaLabel = "No file selected";
    instructions.innerHTML = Sanitizer.escapeHTML(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<span class=\"", "\">Drag file here or </span><span class=\"", "\">choose from folder</span>"])), DRAG_TEXT_CLASS, CHOOSE_CLASS);
    fileInputEl.setAttribute("aria-label", defaultAriaLabel);
    fileInputEl.setAttribute("data-default-aria-label", defaultAriaLabel);
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


var removeOldPreviews = function removeOldPreviews(dropTarget, instructions, inputAriaLabel) {
  var filePreviews = dropTarget.querySelectorAll(".".concat(PREVIEW_CLASS));
  var fileInputElement = dropTarget.querySelector(INPUT);
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

    fileInputElement.setAttribute("aria-label", inputAriaLabel);
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
  var filePreviewsHeading = document.createElement("div");
  var inputAriaLabel = fileInputEl.dataset.defaultAriaLabel;
  var fileStore = []; // First, get rid of existing previews

  removeOldPreviews(dropTarget, instructions, inputAriaLabel); // Then, iterate through files list and:
  // 1. Add selected file list names to aria-label
  // 2. Create previews

  var _loop = function _loop(i) {
    var reader = new FileReader();
    var fileName = fileNames[i].name; // Push updated file names into the store array

    fileStore.push(fileName); // read out the store array via aria-label, wording options vary based on file count

    if (i === 0) {
      fileInputEl.setAttribute("aria-label", "You have selected the file: ".concat(fileName));
    } else if (i >= 1) {
      fileInputEl.setAttribute("aria-label", "You have selected ".concat(fileNames.length, " files: ").concat(fileStore.join(", ")));
    } // Starts with a loading image while preview is created


    reader.onloadstart = function createLoadingImage() {
      var imageId = createUniqueID(makeSafeForID(fileName));
      instructions.insertAdjacentHTML("afterend", Sanitizer.escapeHTML(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<div class=\"", "\" aria-hidden=\"true\">\n          <img id=\"", "\" src=\"", "\" alt=\"\" class=\"", " ", "\"/>", "\n        <div>"])), PREVIEW_CLASS, imageId, SPACER_GIF, GENERIC_PREVIEW_CLASS_NAME, LOADING_CLASS, fileName));
    }; // Not all files will be able to generate previews. In case this happens, we provide several types "generic previews" based on the file extension.


    reader.onloadend = function createFilePreview() {
      var imageId = createUniqueID(makeSafeForID(fileName));
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
      filePreviewsHeading.innerHTML = Sanitizer.escapeHTML(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["", " files selected <span class=\"usa-file-input__choose\">Change files</span>"])), i + 1);
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
      errorMessage.textContent = fileInputEl.dataset.errormessage || "This is not a valid file type.";
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
    selectOrMatches(DROPZONE, root).forEach(function (fileInputEl) {
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
  teardown: function teardown(root) {
    selectOrMatches(INPUT, root).forEach(function (fileInputEl) {
      var fileInputTopElement = fileInputEl.parentElement.parentElement;
      fileInputTopElement.parentElement.replaceChild(fileInputEl, fileInputTopElement); // eslint-disable-next-line no-param-reassign

      fileInputEl.className = DROPZONE_CLASS;
    });
  },
  getFileInputContext: getFileInputContext,
  disable: disable,
  enable: enable
});
module.exports = fileInput;

},{"../../config":33,"../../utils/behavior":43,"../../utils/sanitizer":47,"../../utils/select-or-matches":49}],23:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/select":50}],24:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var _require2 = require("../../events"),
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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/select":50}],25:[function(require,module,exports){
"use strict";

var selectOrMatches = require("../../utils/select-or-matches");

var FocusTrap = require("../../utils/focus-trap");

var ScrollBarWidth = require("../../utils/scrollbar-width");

var _require = require("../../config"),
    PREFIX = _require.prefix;

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


var setUpModal = function setUpModal(baseComponent) {
  var modalContent = baseComponent;
  var modalWrapper = document.createElement("div");
  var overlayDiv = document.createElement("div");
  var modalID = baseComponent.getAttribute("id");
  var ariaLabelledBy = baseComponent.getAttribute("aria-labelledby");
  var ariaDescribedBy = baseComponent.getAttribute("aria-describedby");
  var forceUserAction = baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) ? baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) : false; // Create placeholder where modal is for cleanup

  var originalLocationPlaceHolder = document.createElement("div");
  originalLocationPlaceHolder.setAttribute("data-placeholder-for", modalID);
  originalLocationPlaceHolder.style.display = "none";
  originalLocationPlaceHolder.setAttribute('aria-hidden', 'true');

  for (var attributeIndex = 0; attributeIndex < modalContent.attributes.length; attributeIndex += 1) {
    var attribute = modalContent.attributes[attributeIndex];
    originalLocationPlaceHolder.setAttribute("data-original-".concat(attribute.name), attribute.value);
  }

  modalContent.after(originalLocationPlaceHolder); // Rebuild the modal element

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
  modalClosers.forEach(function (el) {
    el.setAttribute("aria-controls", modalID);
  }); // Move all modals to the end of the DOM. Doing this allows us to
  // more easily find the elements to hide from screen readers
  // when the modal is open.

  document.body.appendChild(modalWrapper);
};

var cleanUpModal = function cleanUpModal(baseComponent) {
  var modalContent = baseComponent;
  var modalWrapper = modalContent.parentElement.parentElement;
  var modalID = modalWrapper.getAttribute("id");
  var originalLocationPlaceHolder = document.querySelector("[data-placeholder-for=\"".concat(modalID, "\"]"));

  if (originalLocationPlaceHolder) {
    for (var attributeIndex = 0; attributeIndex < originalLocationPlaceHolder.attributes.length; attributeIndex += 1) {
      var attribute = originalLocationPlaceHolder.attributes[attributeIndex];

      if (attribute.name.startsWith('data-original-')) {
        // data-original- is 14 long
        modalContent.setAttribute(attribute.name.substr(14), attribute.value);
      }
    }

    originalLocationPlaceHolder.after(modalContent);
    originalLocationPlaceHolder.parentElement.removeChild(originalLocationPlaceHolder);
  }

  modalWrapper.parentElement.removeChild(modalWrapper);
};

modal = {
  init: function init(root) {
    selectOrMatches(MODAL, root).forEach(function (modalWindow) {
      var modalId = modalWindow.id;
      setUpModal(modalWindow); // this will query all openers and closers including the overlay

      document.querySelectorAll("[aria-controls=\"".concat(modalId, "\"]")).forEach(function (item) {
        // Turn anchor links into buttons because of
        // VoiceOver on Safari
        if (item.nodeName === "A") {
          item.setAttribute("role", "button");
          item.addEventListener("click", function (e) {
            return e.preventDefault();
          });
        } // Can uncomment when aria-haspopup="dialog" is supported
        // https://a11ysupport.io/tech/aria/aria-haspopup_attribute
        // Most screen readers support aria-haspopup, but might announce
        // as opening a menu if "dialog" is not supported.
        // item.setAttribute("aria-haspopup", "dialog");


        item.addEventListener("click", toggleModal);
      });
    });
  },
  teardown: function teardown(root) {
    selectOrMatches(MODAL, root).forEach(function (modalWindow) {
      cleanUpModal(modalWindow);
      var modalId = modalWindow.id;
      document.querySelectorAll("[aria-controls=\"".concat(modalId, "\"]")).forEach(function (item) {
        return item.removeEventListener("click", toggleModal);
      });
    });
  },
  focusTrap: null,
  toggleModal: toggleModal,
  on: function on(root) {
    this.init(root);
  },
  off: function off(root) {
    this.teardown(root);
  }
};
module.exports = modal;

},{"../../config":33,"../../utils/focus-trap":44,"../../utils/scrollbar-width":48,"../../utils/select-or-matches":49}],26:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ignore = require("receptor/ignore");

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var _require = require("../../events"),
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

},{"../../events":34,"../../utils/behavior":43,"../../utils/select":50,"receptor/ignore":10}],27:[function(require,module,exports){
"use strict";

var _CLICK, _behavior;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keymap = require("receptor/keymap");

var behavior = require("../../utils/behavior");

var select = require("../../utils/select");

var toggle = require("../../utils/toggle");

var FocusTrap = require("../../utils/focus-trap");

var accordion = require("../usa-accordion/accordion");

var ScrollBarWidth = require("../../utils/scrollbar-width");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
    PREFIX = _require2.prefix;

var BODY = "body";
var HEADER = ".".concat(PREFIX, "-header");
var NAV = ".".concat(PREFIX, "-nav");
var NAV_PRIMARY = ".".concat(PREFIX, "-nav__primary");
var NAV_PRIMARY_ITEM = ".".concat(PREFIX, "-nav__primary-item");
var NAV_CONTROL = "button.".concat(PREFIX, "-nav__link");
var NAV_LINKS = "".concat(NAV, " a");
var NON_NAV_HIDDEN_ATTRIBUTE = "data-nav-hidden";
var OPENERS = ".".concat(PREFIX, "-menu-btn");
var CLOSE_BUTTON = ".".concat(PREFIX, "-nav__close");
var OVERLAY = ".".concat(PREFIX, "-overlay");
var CLOSERS = "".concat(CLOSE_BUTTON, ", .").concat(PREFIX, "-overlay");
var TOGGLES = [NAV, OVERLAY].join(", ");
var NON_NAV_ELEMENTS = "body > *:not(".concat(HEADER, "):not([aria-hidden])");
var NON_NAV_HIDDEN = "[".concat(NON_NAV_HIDDEN_ATTRIBUTE, "]");
var ACTIVE_CLASS = "usa-js-mobile-nav--active";
var VISIBLE_CLASS = "is-visible";
var navigation;
var navActive;
var nonNavElements;

var isActive = function isActive() {
  return document.body.classList.contains(ACTIVE_CLASS);
};

var SCROLLBAR_WIDTH = ScrollBarWidth();
var INITIAL_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
var TEMPORARY_PADDING = "".concat(parseInt(INITIAL_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10), "px");

var hideNonNavItems = function hideNonNavItems() {
  nonNavElements = document.querySelectorAll(NON_NAV_ELEMENTS);
  nonNavElements.forEach(function (nonNavElement) {
    nonNavElement.setAttribute("aria-hidden", true);
    nonNavElement.setAttribute(NON_NAV_HIDDEN_ATTRIBUTE, "");
  });
};

var showNonNavItems = function showNonNavItems() {
  nonNavElements = document.querySelectorAll(NON_NAV_HIDDEN);

  if (!nonNavElements) {
    return;
  } // Remove aria-hidden from non-header elements


  nonNavElements.forEach(function (nonNavElement) {
    nonNavElement.removeAttribute("aria-hidden");
    nonNavElement.removeAttribute(NON_NAV_HIDDEN_ATTRIBUTE);
  });
}; // Toggle all non-header elements #3527.


var toggleNonNavItems = function toggleNonNavItems(active) {
  if (active) {
    hideNonNavItems();
  } else {
    showNonNavItems();
  }
};

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
  var menuButton = document.querySelector(OPENERS);
  body.style.paddingRight = body.style.paddingRight === TEMPORARY_PADDING ? INITIAL_PADDING : TEMPORARY_PADDING;
  toggleNonNavItems(safeActive);

  if (safeActive && closeButton) {
    // The mobile nav was just activated. Focus on the close button, which is
    // just before all the nav elements in the tab order.
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
    var trapContainer = root.matches(NAV) ? root : root.querySelector(NAV);

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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/focus-trap":44,"../../utils/scrollbar-width":48,"../../utils/select":50,"../../utils/toggle":53,"../usa-accordion/accordion":16,"receptor/keymap":12}],28:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var once = require("receptor/once");

var behavior = require("../../utils/behavior");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"receptor/once":13}],29:[function(require,module,exports){
"use strict";

var _templateObject;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var select = require("../../utils/select");

var behavior = require("../../utils/behavior");

var _require = require("../../events"),
    CLICK = _require.CLICK;

var _require2 = require("../../config"),
    PREFIX = _require2.prefix;

var Sanitizer = require("../../utils/sanitizer");

var TABLE = ".".concat(PREFIX, "-table");
var SORTED = "aria-sort";
var ASCENDING = "ascending";
var DESCENDING = "descending";
var SORT_OVERRIDE = "data-sort-value";
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
  buttonEl.classList.add(SORT_BUTTON_CLASS); // ICON_SOURCE

  buttonEl.innerHTML = Sanitizer.escapeHTML(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  <svg class=\"", "-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">\n    <g class=\"descending\" fill=\"transparent\">\n      <path d=\"M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z\" />\n    </g>\n    <g class=\"ascending\" fill=\"transparent\">\n      <path transform=\"rotate(180, 12, 12)\" d=\"M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z\" />\n    </g>\n    <g class=\"unsorted\" fill=\"transparent\">\n      <polygon points=\"15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15\"/>\n    </g>\n  </svg>\n  "])), PREFIX);
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

},{"../../config":33,"../../events":34,"../../utils/behavior":43,"../../utils/sanitizer":47,"../../utils/select":50}],30:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var behavior = require("../../utils/behavior");

var selectOrMatches = require("../../utils/select-or-matches");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var _require2 = require("../usa-combo-box/combo-box"),
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
    selectOrMatches(TIME_PICKER, root).forEach(function (timePickerEl) {
      transformTimePicker(timePickerEl);
      enhanceComboBox(timePickerEl);
    });
  },
  FILTER_DATASET: FILTER_DATASET
});
module.exports = timePicker;

},{"../../config":33,"../../utils/behavior":43,"../../utils/select-or-matches":49,"../usa-combo-box/combo-box":19}],31:[function(require,module,exports){
"use strict";

// Tooltips
var selectOrMatches = require("../../utils/select-or-matches");

var behavior = require("../../utils/behavior");

var _require = require("../../config"),
    PREFIX = _require.prefix;

var isElementInViewport = require("../../utils/is-in-viewport");

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

    e.style.top = "-".concat(TRIANGLE_SIZE, "px"); // consider the pseudo element
    // apply our margins based on the offset

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
 * DOM manipulation.
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

  tooltipBody.textContent = tooltipContent;
  return {
    tooltipBody: tooltipBody,
    position: position,
    tooltipContent: tooltipContent,
    wrapper: wrapper
  };
}; // Setup our function to run on various events


var tooltip = behavior({}, {
  init: function init(root) {
    selectOrMatches(TOOLTIP, root).forEach(function (tooltipTrigger) {
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
        // screen reader. Also allows escape key to close it
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

},{"../../config":33,"../../utils/behavior":43,"../../utils/is-in-viewport":45,"../../utils/select-or-matches":49}],32:[function(require,module,exports){
"use strict";

var behavior = require("../../utils/behavior");

var validate = require("../../utils/validate-input");

function change() {
  validate(this);
}

var validator = behavior({
  "keyup change": {
    "input[data-validation-element]": change
  }
});
module.exports = validator;

},{"../../utils/behavior":43,"../../utils/validate-input":54}],33:[function(require,module,exports){
"use strict";

module.exports = {
  prefix: "usa"
};

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
"use strict";

var accordion = require("./components/usa-accordion/accordion");

var banner = require("./components/usa-banner/banner");

var characterCount = require("./components/usa-character-count/character-count");

var comboBox = require("./components/usa-combo-box/combo-box");

var fileInput = require("./components/usa-file-input/file-input");

var footer = require("./components/usa-footer/footer");

var inputPrefixSuffix = require("./components/usa-input-prefix-suffix/input-prefix-suffix");

var modal = require("./components/usa-modal/modal");

var navigation = require("./components/usa-sidenav/navigation");

var password = require("./components/_usa-password/password");

var search = require("./components/usa-search/search");

var skipnav = require("./components/usa-skipnav/skipnav");

var table = require("./components/usa-table/table");

var tooltip = require("./components/usa-tooltip/tooltip");

var validator = require("./components/usa-validation/validator");

var datePicker = require("./components/usa-date-picker/date-picker");

var dateRangePicker = require("./components/usa-date-range-picker/date-range-picker");

var timePicker = require("./components/usa-time-picker/time-picker");

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

},{"./components/_usa-password/password":15,"./components/usa-accordion/accordion":16,"./components/usa-banner/banner":17,"./components/usa-character-count/character-count":18,"./components/usa-combo-box/combo-box":19,"./components/usa-date-picker/date-picker":20,"./components/usa-date-range-picker/date-range-picker":21,"./components/usa-file-input/file-input":22,"./components/usa-footer/footer":23,"./components/usa-input-prefix-suffix/input-prefix-suffix":24,"./components/usa-modal/modal":25,"./components/usa-search/search":26,"./components/usa-sidenav/navigation":27,"./components/usa-skipnav/skipnav":28,"./components/usa-table/table":29,"./components/usa-time-picker/time-picker":30,"./components/usa-tooltip/tooltip":31,"./components/usa-validation/validator":32}],36:[function(require,module,exports){
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

var components = require("./index");

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

},{"./config":33,"./index":35,"./polyfills":38,"./polyfills/svg4everybody":40,"domready":2}],42:[function(require,module,exports){
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

},{"./active-element":42,"./behavior":43,"./select":50,"object-assign":5,"receptor":11}],45:[function(require,module,exports){
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

/* eslint-disable */

/* globals define, module */

/**
 * A simple library to help you escape HTML using template strings.
 *
 * It's the counterpart to our eslint "no-unsafe-innerhtml" plugin that helps us
 * avoid unsafe coding practices.
 * A full write-up of the Hows and Whys are documented
 * for developers at
 *  https://developer.mozilla.org/en-US/Firefox_OS/Security/Security_Automation
 * with additional background information and design docs at
 *  https://wiki.mozilla.org/User:Fbraun/Gaia/SafeinnerHTMLRoadmap
 *
 */
!function (factory) {
  module.exports = factory();
}(function () {
  'use strict';

  var Sanitizer = {
    _entity: /[&<>"'/]/g,
    _entities: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&apos;',
      '/': '&#x2F;'
    },
    getEntity: function getEntity(s) {
      return Sanitizer._entities[s];
    },

    /**
     * Escapes HTML for all values in a tagged template string.
     */
    escapeHTML: function escapeHTML(strings) {
      var result = '';

      for (var i = 0; i < strings.length; i++) {
        result += strings[i];

        if (i + 1 < arguments.length) {
          var value = arguments[i + 1] || '';
          result += String(value).replace(Sanitizer._entity, Sanitizer.getEntity);
        }
      }

      return result;
    },

    /**
     * Escapes HTML and returns a wrapped object to be used during DOM insertion
     */
    createSafeHTML: function createSafeHTML(strings) {
      var _len = arguments.length;
      var values = new Array(_len > 1 ? _len - 1 : 0);

      for (var _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      var escaped = Sanitizer.escapeHTML.apply(Sanitizer, [strings].concat(values));
      return {
        __html: escaped,
        toString: function toString() {
          return '[object WrappedHTMLObject]';
        },
        info: 'This is a wrapped HTML object. See https://developer.mozilla.or' + 'g/en-US/Firefox_OS/Security/Security_Automation for more.'
      };
    },

    /**
     * Unwrap safe HTML created by createSafeHTML or a custom replacement that
     * underwent security review.
     */
    unwrapSafeHTML: function unwrapSafeHTML() {
      var _len = arguments.length;
      var htmlObjects = new Array(_len);

      for (var _key = 0; _key < _len; _key++) {
        htmlObjects[_key] = arguments[_key];
      }

      var markupList = htmlObjects.map(function (obj) {
        return obj.__html;
      });
      return markupList.join('');
    }
  };
  return Sanitizer;
});

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var select = require("./select");
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
 * @name selectOrMatches
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */


module.exports = function (selector, context) {
  var selection = select(selector, context);

  if (typeof selector !== "string") {
    return selection;
  }

  if (isElement(context) && context.matches(selector)) {
    selection.push(context);
  }

  return selection;
};

},{"./select":50}],50:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./toggle-field-mask":51,"resolve-id-refs":14}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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

},{"../config":33}]},{},[41])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kb21yZWFkeS9yZWFkeS5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9pZ25vcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3Iva2V5bWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL29uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVzb2x2ZS1pZC1yZWZzL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvX3VzYS1wYXNzd29yZC9wYXNzd29yZC5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1hY2NvcmRpb24vYWNjb3JkaW9uLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLWJhbm5lci9iYW5uZXIuanMiLCJzcmMvY29tcG9uZW50cy91c2EtY2hhcmFjdGVyLWNvdW50L2NoYXJhY3Rlci1jb3VudC5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1jb21iby1ib3gvY29tYm8tYm94LmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLWRhdGUtcGlja2VyL2RhdGUtcGlja2VyLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLWRhdGUtcmFuZ2UtcGlja2VyL2RhdGUtcmFuZ2UtcGlja2VyLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLWZpbGUtaW5wdXQvZmlsZS1pbnB1dC5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1mb290ZXIvZm9vdGVyLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLWlucHV0LXByZWZpeC1zdWZmaXgvaW5wdXQtcHJlZml4LXN1ZmZpeC5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1tb2RhbC9tb2RhbC5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1zZWFyY2gvc2VhcmNoLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLXNpZGVuYXYvbmF2aWdhdGlvbi5qcyIsInNyYy9jb21wb25lbnRzL3VzYS1za2lwbmF2L3NraXBuYXYuanMiLCJzcmMvY29tcG9uZW50cy91c2EtdGFibGUvdGFibGUuanMiLCJzcmMvY29tcG9uZW50cy91c2EtdGltZS1waWNrZXIvdGltZS1waWNrZXIuanMiLCJzcmMvY29tcG9uZW50cy91c2EtdG9vbHRpcC90b29sdGlwLmpzIiwic3JjL2NvbXBvbmVudHMvdXNhLXZhbGlkYXRpb24vdmFsaWRhdG9yLmpzIiwic3JjL2NvbmZpZy5qcyIsInNyYy9ldmVudHMuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcG9seWZpbGxzL2N1c3RvbS1ldmVudC5qcyIsInNyYy9wb2x5ZmlsbHMvZWxlbWVudC1oaWRkZW4uanMiLCJzcmMvcG9seWZpbGxzL2luZGV4LmpzIiwic3JjL3BvbHlmaWxscy9udW1iZXItaXMtbmFuLmpzIiwic3JjL3BvbHlmaWxscy9zdmc0ZXZlcnlib2R5LmpzIiwic3JjL3N0YXJ0LmpzIiwic3JjL3V0aWxzL2FjdGl2ZS1lbGVtZW50LmpzIiwic3JjL3V0aWxzL2JlaGF2aW9yLmpzIiwic3JjL3V0aWxzL2ZvY3VzLXRyYXAuanMiLCJzcmMvdXRpbHMvaXMtaW4tdmlld3BvcnQuanMiLCJzcmMvdXRpbHMvaXMtaW9zLWRldmljZS5qcyIsInNyYy91dGlscy9zYW5pdGl6ZXIuanMiLCJzcmMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoLmpzIiwic3JjL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzLmpzIiwic3JjL3V0aWxzL3NlbGVjdC5qcyIsInNyYy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInNyYy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInNyYy91dGlscy90b2dnbGUuanMiLCJzcmMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFFQSxJQUFJLGNBQWMsTUFBTSxDQUFDLElBQXpCLEVBQStCO0FBRS9CO0FBQ0E7QUFDQSxNQUFJLEVBQUUsZUFBZSxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QixDQUFqQixLQUNBLFFBQVEsQ0FBQyxlQUFULElBQTRCLEVBQUUsZUFBZSxRQUFRLENBQUMsZUFBVCxDQUF5Qiw0QkFBekIsRUFBc0QsR0FBdEQsQ0FBakIsQ0FEaEMsRUFDOEc7QUFFN0csZUFBVSxJQUFWLEVBQWdCO0FBRWpCOztBQUVBLFVBQUksRUFBRSxhQUFhLElBQWYsQ0FBSixFQUEwQjs7QUFFMUIsVUFDRyxhQUFhLEdBQUcsV0FEbkI7QUFBQSxVQUVHLFNBQVMsR0FBRyxXQUZmO0FBQUEsVUFHRyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQUwsQ0FBYSxTQUFiLENBSGxCO0FBQUEsVUFJRyxNQUFNLEdBQUcsTUFKWjtBQUFBLFVBS0csT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFELENBQU4sQ0FBa0IsSUFBbEIsSUFBMEIsWUFBWTtBQUNqRCxlQUFPLEtBQUssT0FBTCxDQUFhLFlBQWIsRUFBMkIsRUFBM0IsQ0FBUDtBQUNBLE9BUEY7QUFBQSxVQVFHLFVBQVUsR0FBRyxLQUFLLENBQUMsU0FBRCxDQUFMLENBQWlCLE9BQWpCLElBQTRCLFVBQVUsSUFBVixF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LENBQUMsaUJBQUwsRUFBd0I7QUFDdEIsY0FBTSxJQUFJLEtBQUosOENBQStDLGFBQS9DLFFBQU47QUFDRDs7QUFFRCxVQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFzQixFQUFFLENBQUMsS0FBekIsQ0FBaEI7QUFDQSxNQUFBLGlCQUFpQixDQUFDLFNBQWxCLENBQTRCLE1BQTVCLENBQW1DLGFBQW5DLEVBQWtELE9BQWxEO0FBQ0EsTUFBQSxpQkFBaUIsQ0FBQyxZQUFsQixDQUErQixPQUEvQixFQUF3QyxPQUF4QztBQUNEO0FBQ0YsR0FmRDtBQWdCRCxDQTNCRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDEuMS4yMDE3MDQyN1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIExpY2Vuc2U6IERlZGljYXRlZCB0byB0aGUgcHVibGljIGRvbWFpbi5cbiAqICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbi8vIEZ1bGwgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHdpdGggbm8gY2xhc3NMaXN0IHN1cHBvcnRcbi8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSkgXG5cdHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKCEoJ0VsZW1lbnQnIGluIHZpZXcpKSByZXR1cm47XG5cbnZhclxuXHQgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG5cdCwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuXHQsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG5cdCwgb2JqQ3RyID0gT2JqZWN0XG5cdCwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuXHR9XG5cdCwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuXHRcdHZhclxuXHRcdFx0ICBpID0gMFxuXHRcdFx0LCBsZW4gPSB0aGlzLmxlbmd0aFxuXHRcdDtcblx0XHRmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXHQvLyBWZW5kb3JzOiBwbGVhc2UgYWxsb3cgY29udGVudCBjb2RlIHRvIGluc3RhbnRpYXRlIERPTUV4Y2VwdGlvbnNcblx0LCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG5cdFx0dGhpcy5uYW1lID0gdHlwZTtcblx0XHR0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fVxuXHQsIGNoZWNrVG9rZW5BbmRHZXRJbmRleCA9IGZ1bmN0aW9uIChjbGFzc0xpc3QsIHRva2VuKSB7XG5cdFx0aWYgKHRva2VuID09PSBcIlwiKSB7XG5cdFx0XHR0aHJvdyBuZXcgRE9NRXgoXG5cdFx0XHRcdCAgXCJTWU5UQVhfRVJSXCJcblx0XHRcdFx0LCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcblx0XHRcdHRocm93IG5ldyBET01FeChcblx0XHRcdFx0ICBcIklOVkFMSURfQ0hBUkFDVEVSX0VSUlwiXG5cdFx0XHRcdCwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcblx0fVxuXHQsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0dmFyXG5cdFx0XHQgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcblx0XHRcdCwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG5cdFx0XHQsIGkgPSAwXG5cdFx0XHQsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG5cdFx0O1xuXHRcdGZvciAoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChjbGFzc2VzW2ldKTtcblx0XHR9XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuXHRcdH07XG5cdH1cblx0LCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cblx0LCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG5cdH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcblx0cmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuXHR0b2tlbiArPSBcIlwiO1xuXHRyZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuXHR2YXJcblx0XHQgIHRva2VucyA9IGFyZ3VtZW50c1xuXHRcdCwgaSA9IDBcblx0XHQsIGwgPSB0b2tlbnMubGVuZ3RoXG5cdFx0LCB0b2tlblxuXHRcdCwgdXBkYXRlZCA9IGZhbHNlXG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcblx0XHRcdHRoaXMucHVzaCh0b2tlbik7XG5cdFx0XHR1cGRhdGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKCsraSA8IGwpO1xuXG5cdGlmICh1cGRhdGVkKSB7XG5cdFx0dGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG5cdH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhclxuXHRcdCAgdG9rZW5zID0gYXJndW1lbnRzXG5cdFx0LCBpID0gMFxuXHRcdCwgbCA9IHRva2Vucy5sZW5ndGhcblx0XHQsIHRva2VuXG5cdFx0LCB1cGRhdGVkID0gZmFsc2Vcblx0XHQsIGluZGV4XG5cdDtcblx0ZG8ge1xuXHRcdHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcblx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0d2hpbGUgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0dGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0dXBkYXRlZCA9IHRydWU7XG5cdFx0XHRpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG5cdFx0fVxuXHR9XG5cdHdoaWxlICgrK2kgPCBsKTtcblxuXHRpZiAodXBkYXRlZCkge1xuXHRcdHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuXHR9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuLCBmb3JjZSkge1xuXHR0b2tlbiArPSBcIlwiO1xuXG5cdHZhclxuXHRcdCAgcmVzdWx0ID0gdGhpcy5jb250YWlucyh0b2tlbilcblx0XHQsIG1ldGhvZCA9IHJlc3VsdCA/XG5cdFx0XHRmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG5cdFx0OlxuXHRcdFx0Zm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcblx0O1xuXG5cdGlmIChtZXRob2QpIHtcblx0XHR0aGlzW21ldGhvZF0odG9rZW4pO1xuXHR9XG5cblx0aWYgKGZvcmNlID09PSB0cnVlIHx8IGZvcmNlID09PSBmYWxzZSkge1xuXHRcdHJldHVybiBmb3JjZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gIXJlc3VsdDtcblx0fVxufTtcbmNsYXNzTGlzdFByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcblx0dmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuXHRcdCAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcblx0XHQsIGVudW1lcmFibGU6IHRydWVcblx0XHQsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHR9O1xuXHR0cnkge1xuXHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0fSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG5cdFx0Ly8gYWRkaW5nIHVuZGVmaW5lZCB0byBmaWdodCB0aGlzIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9pc3N1ZXMvMzZcblx0XHQvLyBtb2Rlcm5pZSBJRTgtTVNXNyBtYWNoaW5lIGhhcyBJRTggOC4wLjYwMDEuMTg3MDIgYW5kIGlzIGFmZmVjdGVkXG5cdFx0aWYgKGV4Lm51bWJlciA9PT0gdW5kZWZpbmVkIHx8IGV4Lm51bWJlciA9PT0gLTB4N0ZGNUVDNTQpIHtcblx0XHRcdGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcblx0XHRcdG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcblx0XHR9XG5cdH1cbn0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuXHRlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHdpbmRvdy5zZWxmKSk7XG5cbn1cblxuLy8gVGhlcmUgaXMgZnVsbCBvciBwYXJ0aWFsIG5hdGl2ZSBjbGFzc0xpc3Qgc3VwcG9ydCwgc28ganVzdCBjaGVjayBpZiB3ZSBuZWVkXG4vLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4oZnVuY3Rpb24gKCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuXHQvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuXHQvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cblx0aWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuXHRcdHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcblx0XHRcdHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuXHRcdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdFx0dmFyIGksIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0dG9rZW4gPSBhcmd1bWVudHNbaV07XG5cdFx0XHRcdFx0b3JpZ2luYWwuY2FsbCh0aGlzLCB0b2tlbik7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fTtcblx0XHRjcmVhdGVNZXRob2QoJ2FkZCcpO1xuXHRcdGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG5cdH1cblxuXHR0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG5cdC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3Rcblx0Ly8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuXHRpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcblx0XHR2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG5cdFx0RE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbih0b2tlbiwgZm9yY2UpIHtcblx0XHRcdGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuXHRcdFx0XHRyZXR1cm4gZm9yY2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdH1cblxuXHR0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuXG59XG4iLCIvKiFcbiAgKiBkb21yZWFkeSAoYykgRHVzdGluIERpYXogMjAxNCAtIExpY2Vuc2UgTUlUXG4gICovXG4hZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG5cbn0oJ2RvbXJlYWR5JywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmbnMgPSBbXSwgbGlzdGVuZXJcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoYWNrID0gZG9jLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbFxuICAgICwgZG9tQ29udGVudExvYWRlZCA9ICdET01Db250ZW50TG9hZGVkJ1xuICAgICwgbG9hZGVkID0gKGhhY2sgPyAvXmxvYWRlZHxeYy8gOiAvXmxvYWRlZHxeaXxeYy8pLnRlc3QoZG9jLnJlYWR5U3RhdGUpXG5cblxuICBpZiAoIWxvYWRlZClcbiAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tQ29udGVudExvYWRlZCwgbGlzdGVuZXIpXG4gICAgbG9hZGVkID0gMVxuICAgIHdoaWxlIChsaXN0ZW5lciA9IGZucy5zaGlmdCgpKSBsaXN0ZW5lcigpXG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIGxvYWRlZCA/IHNldFRpbWVvdXQoZm4sIDApIDogZm5zLnB1c2goZm4pXG4gIH1cblxufSk7XG4iLCIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcblxuKGZ1bmN0aW9uIChFbGVtZW50UHJvdG8pIHtcblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8ubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gRWxlbWVudFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiBtYXRjaGVzKHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIGluZGV4ID0gMDtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0KytpbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudHNbaW5kZXhdKTtcblx0XHR9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8uY2xvc2VzdCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXHR9XG59KSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpO1xuIiwiLyogZ2xvYmFsIGRlZmluZSwgS2V5Ym9hcmRFdmVudCwgbW9kdWxlICovXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCA9IHtcbiAgICBwb2x5ZmlsbDogcG9seWZpbGwsXG4gICAga2V5czoge1xuICAgICAgMzogJ0NhbmNlbCcsXG4gICAgICA2OiAnSGVscCcsXG4gICAgICA4OiAnQmFja3NwYWNlJyxcbiAgICAgIDk6ICdUYWInLFxuICAgICAgMTI6ICdDbGVhcicsXG4gICAgICAxMzogJ0VudGVyJyxcbiAgICAgIDE2OiAnU2hpZnQnLFxuICAgICAgMTc6ICdDb250cm9sJyxcbiAgICAgIDE4OiAnQWx0JyxcbiAgICAgIDE5OiAnUGF1c2UnLFxuICAgICAgMjA6ICdDYXBzTG9jaycsXG4gICAgICAyNzogJ0VzY2FwZScsXG4gICAgICAyODogJ0NvbnZlcnQnLFxuICAgICAgMjk6ICdOb25Db252ZXJ0JyxcbiAgICAgIDMwOiAnQWNjZXB0JyxcbiAgICAgIDMxOiAnTW9kZUNoYW5nZScsXG4gICAgICAzMjogJyAnLFxuICAgICAgMzM6ICdQYWdlVXAnLFxuICAgICAgMzQ6ICdQYWdlRG93bicsXG4gICAgICAzNTogJ0VuZCcsXG4gICAgICAzNjogJ0hvbWUnLFxuICAgICAgMzc6ICdBcnJvd0xlZnQnLFxuICAgICAgMzg6ICdBcnJvd1VwJyxcbiAgICAgIDM5OiAnQXJyb3dSaWdodCcsXG4gICAgICA0MDogJ0Fycm93RG93bicsXG4gICAgICA0MTogJ1NlbGVjdCcsXG4gICAgICA0MjogJ1ByaW50JyxcbiAgICAgIDQzOiAnRXhlY3V0ZScsXG4gICAgICA0NDogJ1ByaW50U2NyZWVuJyxcbiAgICAgIDQ1OiAnSW5zZXJ0JyxcbiAgICAgIDQ2OiAnRGVsZXRlJyxcbiAgICAgIDQ4OiBbJzAnLCAnKSddLFxuICAgICAgNDk6IFsnMScsICchJ10sXG4gICAgICA1MDogWycyJywgJ0AnXSxcbiAgICAgIDUxOiBbJzMnLCAnIyddLFxuICAgICAgNTI6IFsnNCcsICckJ10sXG4gICAgICA1MzogWyc1JywgJyUnXSxcbiAgICAgIDU0OiBbJzYnLCAnXiddLFxuICAgICAgNTU6IFsnNycsICcmJ10sXG4gICAgICA1NjogWyc4JywgJyonXSxcbiAgICAgIDU3OiBbJzknLCAnKCddLFxuICAgICAgOTE6ICdPUycsXG4gICAgICA5MzogJ0NvbnRleHRNZW51JyxcbiAgICAgIDE0NDogJ051bUxvY2snLFxuICAgICAgMTQ1OiAnU2Nyb2xsTG9jaycsXG4gICAgICAxODE6ICdWb2x1bWVNdXRlJyxcbiAgICAgIDE4MjogJ1ZvbHVtZURvd24nLFxuICAgICAgMTgzOiAnVm9sdW1lVXAnLFxuICAgICAgMTg2OiBbJzsnLCAnOiddLFxuICAgICAgMTg3OiBbJz0nLCAnKyddLFxuICAgICAgMTg4OiBbJywnLCAnPCddLFxuICAgICAgMTg5OiBbJy0nLCAnXyddLFxuICAgICAgMTkwOiBbJy4nLCAnPiddLFxuICAgICAgMTkxOiBbJy8nLCAnPyddLFxuICAgICAgMTkyOiBbJ2AnLCAnfiddLFxuICAgICAgMjE5OiBbJ1snLCAneyddLFxuICAgICAgMjIwOiBbJ1xcXFwnLCAnfCddLFxuICAgICAgMjIxOiBbJ10nLCAnfSddLFxuICAgICAgMjIyOiBbXCInXCIsICdcIiddLFxuICAgICAgMjI0OiAnTWV0YScsXG4gICAgICAyMjU6ICdBbHRHcmFwaCcsXG4gICAgICAyNDY6ICdBdHRuJyxcbiAgICAgIDI0NzogJ0NyU2VsJyxcbiAgICAgIDI0ODogJ0V4U2VsJyxcbiAgICAgIDI0OTogJ0VyYXNlRW9mJyxcbiAgICAgIDI1MDogJ1BsYXknLFxuICAgICAgMjUxOiAnWm9vbU91dCdcbiAgICB9XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24ga2V5cyAoRjEtMjQpLlxuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IDI1OyBpKyspIHtcbiAgICBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1sxMTEgKyBpXSA9ICdGJyArIGk7XG4gIH1cblxuICAvLyBQcmludGFibGUgQVNDSUkgY2hhcmFjdGVycy5cbiAgdmFyIGxldHRlciA9ICcnO1xuICBmb3IgKGkgPSA2NTsgaSA8IDkxOyBpKyspIHtcbiAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuICAgIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzW2ldID0gW2xldHRlci50b0xvd2VyQ2FzZSgpLCBsZXR0ZXIudG9VcHBlckNhc2UoKV07XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5ZmlsbCAoKSB7XG4gICAgaWYgKCEoJ0tleWJvYXJkRXZlbnQnIGluIHdpbmRvdykgfHxcbiAgICAgICAgJ2tleScgaW4gS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBQb2x5ZmlsbCBga2V5YCBvbiBgS2V5Ym9hcmRFdmVudGAuXG4gICAgdmFyIHByb3RvID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbdGhpcy53aGljaCB8fCB0aGlzLmtleUNvZGVdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICAgICAgICBrZXkgPSBrZXlbK3RoaXMuc2hpZnRLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShLZXlib2FyZEV2ZW50LnByb3RvdHlwZSwgJ2tleScsIHByb3RvKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH1cblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCdrZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbCcsIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGw7XG4gIH0gZWxzZSBpZiAod2luZG93KSB7XG4gICAgd2luZG93LmtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbDtcbiAgfVxuXG59KSgpO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGRlbGVnYXRlQWxsID0gcmVxdWlyZSgnLi4vZGVsZWdhdGVBbGwnKTtcblxuY29uc3QgREVMRUdBVEVfUEFUVEVSTiA9IC9eKC4rKTpkZWxlZ2F0ZVxcKCguKylcXCkkLztcbmNvbnN0IFNQQUNFID0gJyAnO1xuXG5jb25zdCBnZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gIHZhciBtYXRjaCA9IHR5cGUubWF0Y2goREVMRUdBVEVfUEFUVEVSTik7XG4gIHZhciBzZWxlY3RvcjtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdHlwZSA9IG1hdGNoWzFdO1xuICAgIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gIH1cblxuICB2YXIgb3B0aW9ucztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBjYXB0dXJlOiBwb3BLZXkoaGFuZGxlciwgJ2NhcHR1cmUnKSxcbiAgICAgIHBhc3NpdmU6IHBvcEtleShoYW5kbGVyLCAncGFzc2l2ZScpXG4gICAgfTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZGVsZWdhdGU6ICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpXG4gICAgICA/IGRlbGVnYXRlQWxsKGhhbmRsZXIpXG4gICAgICA6IHNlbGVjdG9yXG4gICAgICAgID8gZGVsZWdhdGUoc2VsZWN0b3IsIGhhbmRsZXIpXG4gICAgICAgIDogaGFuZGxlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgaWYgKHR5cGUuaW5kZXhPZihTUEFDRSkgPiAtMSkge1xuICAgIHJldHVybiB0eXBlLnNwbGl0KFNQQUNFKS5tYXAoZnVuY3Rpb24oX3R5cGUpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe3R5cGU6IF90eXBlfSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG52YXIgcG9wS2V5ID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGRlbGV0ZSBvYmpba2V5XTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWhhdmlvcihldmVudHMsIHByb3BzKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgICAucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModHlwZSwgZXZlbnRzW3R5cGVdKTtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChsaXN0ZW5lcnMpO1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZEJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmVCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHByb3BzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoZnVuY3Rpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5zb21lKGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKSA9PT0gZmFsc2U7XG4gICAgfSwgdGhpcyk7XG4gIH07XG59O1xuIiwiLy8gcG9seWZpbGwgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdFxucmVxdWlyZSgnZWxlbWVudC1jbG9zZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWxlZ2F0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpZ25vcmFuY2UoZSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBlLnRhcmdldCAmJiAhZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYmVoYXZpb3I6ICAgICByZXF1aXJlKCcuL2JlaGF2aW9yJyksXG4gIGRlbGVnYXRlOiAgICAgcmVxdWlyZSgnLi9kZWxlZ2F0ZScpLFxuICBkZWxlZ2F0ZUFsbDogIHJlcXVpcmUoJy4vZGVsZWdhdGVBbGwnKSxcbiAgaWdub3JlOiAgICAgICByZXF1aXJlKCcuL2lnbm9yZScpLFxuICBrZXltYXA6ICAgICAgIHJlcXVpcmUoJy4va2V5bWFwJyksXG59O1xuIiwicmVxdWlyZSgna2V5Ym9hcmRldmVudC1rZXktcG9seWZpbGwnKTtcblxuLy8gdGhlc2UgYXJlIHRoZSBvbmx5IHJlbGV2YW50IG1vZGlmaWVycyBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3Jtcyxcbi8vIGFjY29yZGluZyB0byBNRE46XG4vLyA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0tleWJvYXJkRXZlbnQvZ2V0TW9kaWZpZXJTdGF0ZT5cbmNvbnN0IE1PRElGSUVSUyA9IHtcbiAgJ0FsdCc6ICAgICAgJ2FsdEtleScsXG4gICdDb250cm9sJzogICdjdHJsS2V5JyxcbiAgJ0N0cmwnOiAgICAgJ2N0cmxLZXknLFxuICAnU2hpZnQnOiAgICAnc2hpZnRLZXknXG59O1xuXG5jb25zdCBNT0RJRklFUl9TRVBBUkFUT1IgPSAnKyc7XG5cbmNvbnN0IGdldEV2ZW50S2V5ID0gZnVuY3Rpb24oZXZlbnQsIGhhc01vZGlmaWVycykge1xuICB2YXIga2V5ID0gZXZlbnQua2V5O1xuICBpZiAoaGFzTW9kaWZpZXJzKSB7XG4gICAgZm9yICh2YXIgbW9kaWZpZXIgaW4gTU9ESUZJRVJTKSB7XG4gICAgICBpZiAoZXZlbnRbTU9ESUZJRVJTW21vZGlmaWVyXV0gPT09IHRydWUpIHtcbiAgICAgICAga2V5ID0gW21vZGlmaWVyLCBrZXldLmpvaW4oTU9ESUZJRVJfU0VQQVJBVE9SKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ga2V5bWFwKGtleXMpIHtcbiAgY29uc3QgaGFzTW9kaWZpZXJzID0gT2JqZWN0LmtleXMoa2V5cykuc29tZShmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4ga2V5LmluZGV4T2YoTU9ESUZJRVJfU0VQQVJBVE9SKSA+IC0xO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGtleSA9IGdldEV2ZW50S2V5KGV2ZW50LCBoYXNNb2RpZmllcnMpO1xuICAgIHJldHVybiBba2V5LCBrZXkudG9Mb3dlckNhc2UoKV1cbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBfa2V5KSB7XG4gICAgICAgIGlmIChfa2V5IGluIGtleXMpIHtcbiAgICAgICAgICByZXN1bHQgPSBrZXlzW2tleV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5NT0RJRklFUlMgPSBNT0RJRklFUlM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uY2UobGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbiB3cmFwcGVkT25jZShlKSB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCB3cmFwcGVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzLCBlKTtcbiAgfTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSRV9UUklNID0gLyheXFxzKyl8KFxccyskKS9nO1xudmFyIFJFX1NQTElUID0gL1xccysvO1xuXG52YXIgdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbVxuICA/IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoUkVfVFJJTSwgJycpOyB9O1xuXG52YXIgcXVlcnlCeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZUlkcyhpZHMsIGRvYykge1xuICBpZiAodHlwZW9mIGlkcyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBnb3QgJyArICh0eXBlb2YgaWRzKSk7XG4gIH1cblxuICBpZiAoIWRvYykge1xuICAgIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBnZXRFbGVtZW50QnlJZCA9IGRvYy5nZXRFbGVtZW50QnlJZFxuICAgID8gZG9jLmdldEVsZW1lbnRCeUlkLmJpbmQoZG9jKVxuICAgIDogcXVlcnlCeUlkLmJpbmQoZG9jKTtcblxuICBpZHMgPSB0cmltKGlkcykuc3BsaXQoUkVfU1BMSVQpO1xuXG4gIC8vIFhYWCB3ZSBjYW4gc2hvcnQtY2lyY3VpdCBoZXJlIGJlY2F1c2UgdHJpbW1pbmcgYW5kIHNwbGl0dGluZyBhXG4gIC8vIHN0cmluZyBvZiBqdXN0IHdoaXRlc3BhY2UgcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSxcbiAgLy8gZW1wdHkgc3RyaW5nXG4gIGlmIChpZHMubGVuZ3RoID09PSAxICYmIGlkc1swXSA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gaWRzXG4gICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGVsID0gZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcbn07XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90b2dnbGUtZm9ybS1pbnB1dFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1zaG93LXBhc3N3b3JkLCAuJHtQUkVGSVh9LXNob3ctbXVsdGlwYXNzd29yZGA7XG5cbmZ1bmN0aW9uIHRvZ2dsZShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiB0b2dnbGUsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy90b2dnbGVcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5cbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbiwgLiR7UFJFRklYfS1hY2NvcmRpb24tLWJvcmRlcmVkYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbl9fYnV0dG9uW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSBcImRhdGEtYWxsb3ctbXVsdGlwbGVcIjtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgYnV0dG9uIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGFjY29yZGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYWNjb3JkaW9uXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MQnV0dG9uRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldEFjY29yZGlvbkJ1dHRvbnMgPSAoYWNjb3JkaW9uKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbnMgPSBzZWxlY3QoQlVUVE9OLCBhY2NvcmRpb24pO1xuXG4gIHJldHVybiBidXR0b25zLmZpbHRlcigoYnV0dG9uKSA9PiBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pID09PSBhY2NvcmRpb24pO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgYSBidXR0b24ncyBcInByZXNzZWRcIiBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtib29sZWFuP30gZXhwYW5kZWQgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICovXG5jb25zdCB0b2dnbGVCdXR0b24gPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICBjb25zdCBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBsZXQgc2FmZUV4cGFuZGVkID0gZXhwYW5kZWQ7XG5cbiAgaWYgKCFhY2NvcmRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7QlVUVE9OfSBpcyBtaXNzaW5nIG91dGVyICR7QUNDT1JESU9OfWApO1xuICB9XG5cbiAgc2FmZUV4cGFuZGVkID0gdG9nZ2xlKGJ1dHRvbiwgZXhwYW5kZWQpO1xuXG4gIC8vIFhYWCBtdWx0aXNlbGVjdGFibGUgaXMgb3B0LWluLCB0byBwcmVzZXJ2ZSBsZWdhY3kgYmVoYXZpb3JcbiAgY29uc3QgbXVsdGlzZWxlY3RhYmxlID0gYWNjb3JkaW9uLmhhc0F0dHJpYnV0ZShNVUxUSVNFTEVDVEFCTEUpO1xuXG4gIGlmIChzYWZlRXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGdldEFjY29yZGlvbkJ1dHRvbnMoYWNjb3JkaW9uKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuICAgICAgaWYgKG90aGVyICE9PSBidXR0b24pIHtcbiAgICAgICAgdG9nZ2xlKG90aGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNob3dCdXR0b24gPSAoYnV0dG9uKSA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSAoYnV0dG9uKSA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCBmYWxzZSk7XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0b2dnbGVCdXR0b24odGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAvLyBXZSB3ZXJlIGp1c3QgZXhwYW5kZWQsIGJ1dCBpZiBhbm90aGVyIGFjY29yZGlvbiB3YXMgYWxzbyBqdXN0XG4gICAgICAgICAgLy8gY29sbGFwc2VkLCB3ZSBtYXkgbm8gbG9uZ2VyIGJlIGluIHRoZSB2aWV3cG9ydC4gVGhpcyBlbnN1cmVzXG4gICAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRoaXMpKSB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KEJVVFRPTiwgcm9vdCkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIEFDQ09SRElPTixcbiAgICBCVVRUT04sXG4gICAgc2hvdzogc2hvd0J1dHRvbixcbiAgICBoaWRlOiBoaWRlQnV0dG9uLFxuICAgIHRvZ2dsZTogdG9nZ2xlQnV0dG9uLFxuICAgIGdldEJ1dHRvbnM6IGdldEFjY29yZGlvbkJ1dHRvbnMsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYWNjb3JkaW9uO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcblxuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH0tYmFubmVyX19oZWFkZXJgO1xuY29uc3QgRVhQQU5ERURfQ0xBU1MgPSBgJHtQUkVGSVh9LWJhbm5lcl9faGVhZGVyLS1leHBhbmRlZGA7XG5cbmNvbnN0IHRvZ2dsZUJhbm5lciA9IGZ1bmN0aW9uIHRvZ2dsZUVsKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuY2xvc2VzdChIRUFERVIpLmNsYXNzTGlzdC50b2dnbGUoRVhQQU5ERURfQ0xBU1MpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFtDTElDS106IHtcbiAgICBbYCR7SEVBREVSfSBbYXJpYS1jb250cm9sc11gXTogdG9nZ2xlQmFubmVyLFxuICB9LFxufSk7XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnXCIpO1xuXG5jb25zdCBDSEFSQUNURVJfQ09VTlQgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRgO1xuY29uc3QgSU5QVVQgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX2ZpZWxkYDtcbmNvbnN0IE1FU1NBR0UgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX21lc3NhZ2VgO1xuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJUaGUgY29udGVudCBpcyB0b28gbG9uZy5cIjtcbmNvbnN0IE1FU1NBR0VfSU5WQUxJRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19tZXNzYWdlLS1pbnZhbGlkYDtcblxuLyoqXG4gKiBUaGUgZWxlbWVudHMgd2l0aGluIHRoZSBjaGFyYWN0ZXIgY291bnQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGFyYWN0ZXJDb3VudEVsZW1lbnRzXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBjaGFyYWN0ZXJDb3VudEVsXG4gKiBAcHJvcGVydHkge0hUTUxTcGFuRWxlbWVudH0gbWVzc2FnZUVsXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByb290IGFuZCBtZXNzYWdlIGVsZW1lbnRcbiAqIGZvciBhbiBjaGFyYWN0ZXIgY291bnQgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudH0gaW5wdXRFbCBUaGUgY2hhcmFjdGVyIGNvdW50IGlucHV0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtDaGFyYWN0ZXJDb3VudEVsZW1lbnRzfSBlbGVtZW50cyBUaGUgcm9vdCBhbmQgbWVzc2FnZSBlbGVtZW50LlxuICovXG5jb25zdCBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgY2hhcmFjdGVyQ291bnRFbCA9IGlucHV0RWwuY2xvc2VzdChDSEFSQUNURVJfQ09VTlQpO1xuXG4gIGlmICghY2hhcmFjdGVyQ291bnRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtJTlBVVH0gaXMgbWlzc2luZyBvdXRlciAke0NIQVJBQ1RFUl9DT1VOVH1gKTtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2VFbCA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihNRVNTQUdFKTtcblxuICBpZiAoIW1lc3NhZ2VFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtDSEFSQUNURVJfQ09VTlR9IGlzIG1pc3NpbmcgaW5uZXIgJHtNRVNTQUdFfWApO1xuICB9XG5cbiAgcmV0dXJuIHsgY2hhcmFjdGVyQ291bnRFbCwgbWVzc2FnZUVsIH07XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2hhcmFjdGVyIGNvdW50IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudHxIVE1MVGV4dEFyZWFFbGVtZW50fSBpbnB1dEVsIFRoZSBjaGFyYWN0ZXIgY291bnQgaW5wdXQgZWxlbWVudFxuICovXG5jb25zdCB1cGRhdGVDb3VudE1lc3NhZ2UgPSAoaW5wdXRFbCkgPT4ge1xuICBjb25zdCB7IGNoYXJhY3RlckNvdW50RWwsIG1lc3NhZ2VFbCB9ID0gZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyhpbnB1dEVsKTtcblxuICBjb25zdCBtYXhsZW5ndGggPSBwYXJzZUludChcbiAgICBjaGFyYWN0ZXJDb3VudEVsLmdldEF0dHJpYnV0ZShcImRhdGEtbWF4bGVuZ3RoXCIpLFxuICAgIDEwXG4gICk7XG5cbiAgaWYgKCFtYXhsZW5ndGgpIHJldHVybjtcblxuICBsZXQgbmV3TWVzc2FnZSA9IFwiXCI7XG4gIGNvbnN0IGN1cnJlbnRMZW5ndGggPSBpbnB1dEVsLnZhbHVlLmxlbmd0aDtcbiAgY29uc3QgaXNPdmVyTGltaXQgPSBjdXJyZW50TGVuZ3RoICYmIGN1cnJlbnRMZW5ndGggPiBtYXhsZW5ndGg7XG5cbiAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDApIHtcbiAgICBuZXdNZXNzYWdlID0gYCR7bWF4bGVuZ3RofSBjaGFyYWN0ZXJzIGFsbG93ZWRgO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLmFicyhtYXhsZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gYGNoYXJhY3RlciR7ZGlmZmVyZW5jZSA9PT0gMSA/IFwiXCIgOiBcInNcIn1gO1xuICAgIGNvbnN0IGd1aWRhbmNlID0gaXNPdmVyTGltaXQgPyBcIm92ZXIgbGltaXRcIiA6IFwibGVmdFwiO1xuXG4gICAgbmV3TWVzc2FnZSA9IGAke2RpZmZlcmVuY2V9ICR7Y2hhcmFjdGVyc30gJHtndWlkYW5jZX1gO1xuICB9XG5cbiAgbWVzc2FnZUVsLmNsYXNzTGlzdC50b2dnbGUoTUVTU0FHRV9JTlZBTElEX0NMQVNTLCBpc092ZXJMaW1pdCk7XG4gIG1lc3NhZ2VFbC50ZXh0Q29udGVudCA9IG5ld01lc3NhZ2U7XG5cbiAgaWYgKGlzT3ZlckxpbWl0ICYmICFpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShWQUxJREFUSU9OX01FU1NBR0UpO1xuICB9XG5cbiAgaWYgKCFpc092ZXJMaW1pdCAmJiBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlID09PSBWQUxJREFUSU9OX01FU1NBR0UpIHtcbiAgICBpbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHVwIHRoZSBjaGFyYWN0ZXIgY291bnQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHNldHVwQXR0cmlidXRlcyA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCB9ID0gZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyhpbnB1dEVsKTtcblxuICBjb25zdCBtYXhsZW5ndGggPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcblxuICBpZiAoIW1heGxlbmd0aCkgcmV0dXJuO1xuXG4gIGlucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwibWF4bGVuZ3RoXCIpO1xuICBjaGFyYWN0ZXJDb3VudEVsLnNldEF0dHJpYnV0ZShcImRhdGEtbWF4bGVuZ3RoXCIsIG1heGxlbmd0aCk7XG59O1xuXG5jb25zdCBjaGFyYWN0ZXJDb3VudCA9IGJlaGF2aW9yKFxuICB7XG4gICAgaW5wdXQ6IHtcbiAgICAgIFtJTlBVVF0oKSB7XG4gICAgICAgIHVwZGF0ZUNvdW50TWVzc2FnZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KElOUFVULCByb290KS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICBzZXR1cEF0dHJpYnV0ZXMoaW5wdXQpO1xuICAgICAgICB1cGRhdGVDb3VudE1lc3NhZ2UoaW5wdXQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBNRVNTQUdFX0lOVkFMSURfQ0xBU1MsXG4gICAgVkFMSURBVElPTl9NRVNTQUdFLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJhY3RlckNvdW50O1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3Nhbml0aXplclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuXG5jb25zdCBDT01CT19CT1hfQ0xBU1MgPSBgJHtQUkVGSVh9LWNvbWJvLWJveGA7XG5jb25zdCBDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9LS1wcmlzdGluZWA7XG5jb25zdCBTRUxFQ1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zZWxlY3RgO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19jbGVhci1pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgSU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0LWJ1dHRvbi1zZXBhcmF0b3JgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fdG9nZ2xlLWxpc3RgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1MgPSBgJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9X193cmFwcGVyYDtcbmNvbnN0IExJU1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0YDtcbmNvbnN0IExJU1RfT1BUSU9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fbGlzdC1vcHRpb25gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgU1RBVFVTX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fc3RhdHVzYDtcblxuY29uc3QgQ09NQk9fQk9YID0gYC4ke0NPTUJPX0JPWF9DTEFTU31gO1xuY29uc3QgU0VMRUNUID0gYC4ke1NFTEVDVF9DTEFTU31gO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTiA9IGAuJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IFRPR0dMRV9MSVNUX0JVVFRPTiA9IGAuJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IExJU1QgPSBgLiR7TElTVF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT04gPSBgLiR7TElTVF9PUFRJT05fQ0xBU1N9YDtcbmNvbnN0IExJU1RfT1BUSU9OX0ZPQ1VTRUQgPSBgLiR7TElTVF9PUFRJT05fRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fU0VMRUNURUQgPSBgLiR7TElTVF9PUFRJT05fU0VMRUNURURfQ0xBU1N9YDtcbmNvbnN0IFNUQVRVUyA9IGAuJHtTVEFUVVNfQ0xBU1N9YDtcblxuY29uc3QgREVGQVVMVF9GSUxURVIgPSBcIi4qe3txdWVyeX19LipcIjtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG4vKipcbiAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgYW5kIGRpc3BhdGNoIGEgY2hhbmdlIGV2ZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxTZWxlY3RFbGVtZW50fSBlbCBUaGUgZWxlbWVudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gKi9cbmNvbnN0IGNoYW5nZUVsZW1lbnRWYWx1ZSA9IChlbCwgdmFsdWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9IGVsO1xuICBlbGVtZW50VG9DaGFuZ2UudmFsdWUgPSB2YWx1ZTtcblxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyB2YWx1ZSB9LFxuICB9KTtcbiAgZWxlbWVudFRvQ2hhbmdlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcblxuLyoqXG4gKiBUaGUgZWxlbWVudHMgd2l0aGluIHRoZSBjb21ibyBib3guXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21ib0JveENvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGNvbWJvQm94RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdEVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFVMaXN0RWxlbWVudH0gbGlzdEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBmb2N1c2VkT3B0aW9uRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTExJRWxlbWVudH0gc2VsZWN0ZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MQnV0dG9uRWxlbWVudH0gdG9nZ2xlTGlzdEJ0bkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhcklucHV0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNQcmlzdGluZVxuICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlRmlsdGVyaW5nXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3hcbiAqIEByZXR1cm5zIHtDb21ib0JveENvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldENvbWJvQm94Q29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gZWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmICghY29tYm9Cb3hFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7Q09NQk9fQk9YfWApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUKTtcbiAgY29uc3QgaW5wdXRFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG4gIGNvbnN0IGxpc3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihMSVNUKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU1RBVFVTKTtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX1NFTEVDVEVEKTtcbiAgY29uc3QgdG9nZ2xlTGlzdEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKFRPR0dMRV9MSVNUX0JVVFRPTik7XG4gIGNvbnN0IGNsZWFySW5wdXRCdG5FbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihDTEVBUl9JTlBVVF9CVVRUT04pO1xuXG4gIGNvbnN0IGlzUHJpc3RpbmUgPSBjb21ib0JveEVsLmNsYXNzTGlzdC5jb250YWlucyhDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICBjb25zdCBkaXNhYmxlRmlsdGVyaW5nID0gY29tYm9Cb3hFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPT09IFwidHJ1ZVwiO1xuXG4gIHJldHVybiB7XG4gICAgY29tYm9Cb3hFbCxcbiAgICBzZWxlY3RFbCxcbiAgICBpbnB1dEVsLFxuICAgIGxpc3RFbCxcbiAgICBzdGF0dXNFbCxcbiAgICBmb2N1c2VkT3B0aW9uRWwsXG4gICAgc2VsZWN0ZWRPcHRpb25FbCxcbiAgICB0b2dnbGVMaXN0QnRuRWwsXG4gICAgY2xlYXJJbnB1dEJ0bkVsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgY29tYm8tYm94IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSB0cnVlO1xuICBjbGVhcklucHV0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICB0b2dnbGVMaXN0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBjb21iby1ib3ggY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCB0b2dnbGVMaXN0QnRuRWwsIGNsZWFySW5wdXRCdG5FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBjbGVhcklucHV0QnRuRWwuaGlkZGVuID0gZmFsc2U7XG4gIGNsZWFySW5wdXRCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB0b2dnbGVMaXN0QnRuRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgaW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGEgc2VsZWN0IGVsZW1lbnQgaW50byBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gX2NvbWJvQm94RWwgVGhlIGluaXRpYWwgZWxlbWVudCBvZiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmhhbmNlQ29tYm9Cb3ggPSAoX2NvbWJvQm94RWwpID0+IHtcbiAgY29uc3QgY29tYm9Cb3hFbCA9IF9jb21ib0JveEVsLmNsb3Nlc3QoQ09NQk9fQk9YKTtcblxuICBpZiAoY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkKSByZXR1cm47XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIik7XG5cbiAgaWYgKCFzZWxlY3RFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtDT01CT19CT1h9IGlzIG1pc3NpbmcgaW5uZXIgc2VsZWN0YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RJZCA9IHNlbGVjdEVsLmlkO1xuICBjb25zdCBzZWxlY3RMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj1cIiR7c2VsZWN0SWR9XCJdYCk7XG4gIGNvbnN0IGxpc3RJZCA9IGAke3NlbGVjdElkfS0tbGlzdGA7XG4gIGNvbnN0IGxpc3RJZExhYmVsID0gYCR7c2VsZWN0SWR9LWxhYmVsYDtcbiAgY29uc3QgYXNzaXN0aXZlSGludElEID0gYCR7c2VsZWN0SWR9LS1hc3Npc3RpdmVIaW50YDtcbiAgY29uc3QgYWRkaXRpb25hbEF0dHJpYnV0ZXMgPSBbXTtcbiAgY29uc3QgeyBkZWZhdWx0VmFsdWUgfSA9IGNvbWJvQm94RWwuZGF0YXNldDtcbiAgY29uc3QgeyBwbGFjZWhvbGRlciB9ID0gY29tYm9Cb3hFbC5kYXRhc2V0O1xuICBsZXQgc2VsZWN0ZWRPcHRpb247XG5cbiAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgYWRkaXRpb25hbEF0dHJpYnV0ZXMucHVzaCh7IHBsYWNlaG9sZGVyIH0pO1xuICB9XG5cbiAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG5cbiAgICAgIGlmIChvcHRpb25FbC52YWx1ZSA9PT0gZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHNlbGVjdGVkT3B0aW9uID0gb3B0aW9uRWw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvciBpZiBjb21ib2JveCBpcyBtaXNzaW5nIGEgbGFiZWwgb3IgbGFiZWwgaXMgbWlzc2luZ1xuICAgKiBgZm9yYCBhdHRyaWJ1dGUuIE90aGVyd2lzZSwgc2V0IHRoZSBJRCB0byBtYXRjaCB0aGUgPHVsPiBhcmlhLWxhYmVsbGVkYnlcbiAgICovXG4gIGlmICghc2VsZWN0TGFiZWwgfHwgIXNlbGVjdExhYmVsLm1hdGNoZXMoYGxhYmVsW2Zvcj1cIiR7c2VsZWN0SWR9XCJdYCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgJHtDT01CT19CT1h9IGZvciAke3NlbGVjdElkfSBpcyBlaXRoZXIgbWlzc2luZyBhIGxhYmVsIG9yIGEgXCJmb3JcIiBhdHRyaWJ1dGVgXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RMYWJlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBsaXN0SWRMYWJlbCk7XG4gIH1cblxuICBzZWxlY3RMYWJlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBsaXN0SWRMYWJlbCk7XG4gIHNlbGVjdEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgc2VsZWN0RWwuY2xhc3NMaXN0LmFkZChcInVzYS1zci1vbmx5XCIsIFNFTEVDVF9DTEFTUyk7XG4gIHNlbGVjdEVsLmlkID0gXCJcIjtcbiAgc2VsZWN0RWwudmFsdWUgPSBcIlwiO1xuXG4gIFtcInJlcXVpcmVkXCIsIFwiYXJpYS1sYWJlbFwiLCBcImFyaWEtbGFiZWxsZWRieVwiXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgaWYgKHNlbGVjdEVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBzZWxlY3RFbC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKHsgW25hbWVdOiB2YWx1ZSB9KTtcbiAgICAgIHNlbGVjdEVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNhbml0aXplIGRvZXNuJ3QgbGlrZSBmdW5jdGlvbnMgaW4gdGVtcGxhdGUgbGl0ZXJhbHNcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIHNlbGVjdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1vd25zXCIsIGxpc3RJZCk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtYXV0b2NvbXBsZXRlXCIsIFwibGlzdFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLCBhc3Npc3RpdmVIaW50SUQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIFwib2ZmXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29tcGxldGVcIiwgXCJvZmZcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIElOUFVUX0NMQVNTKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJjb21ib2JveFwiKTtcbiAgYWRkaXRpb25hbEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cikgPT5cbiAgICBPYmplY3Qua2V5cyhhdHRyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHthdHRyW2tleV19YDtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9KVxuICApO1xuXG4gIGNvbWJvQm94RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGlucHV0KTtcblxuICBjb21ib0JveEVsLmluc2VydEFkamFjZW50SFRNTChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxzcGFuIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9XCIgYXJpYS1sYWJlbD1cIkNsZWFyIHRoZSBzZWxlY3QgY29udGVudHNcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTfVwiPiZuYnNwOzwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgdGhlIGRyb3Bkb3duIGxpc3RcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDx1bFxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgaWQ9XCIke2xpc3RJZH1cIlxuICAgICAgICBjbGFzcz1cIiR7TElTVF9DTEFTU31cIlxuICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cIiR7bGlzdElkTGFiZWx9XCJcbiAgICAgICAgaGlkZGVuPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3M9XCIke1NUQVRVU19DTEFTU30gdXNhLXNyLW9ubHlcIiByb2xlPVwic3RhdHVzXCI+PC9kaXY+XG4gICAgICA8c3BhbiBpZD1cIiR7YXNzaXN0aXZlSGludElEfVwiIGNsYXNzPVwidXNhLXNyLW9ubHlcIj5cbiAgICAgICAgV2hlbiBhdXRvY29tcGxldGUgcmVzdWx0cyBhcmUgYXZhaWxhYmxlIHVzZSB1cCBhbmQgZG93biBhcnJvd3MgdG8gcmV2aWV3IGFuZCBlbnRlciB0byBzZWxlY3QuXG4gICAgICAgIFRvdWNoIGRldmljZSB1c2VycywgZXhwbG9yZSBieSB0b3VjaCBvciB3aXRoIHN3aXBlIGdlc3R1cmVzLlxuICAgICAgPC9zcGFuPmBcbiAgKTtcblxuICBpZiAoc2VsZWN0ZWRPcHRpb24pIHtcbiAgICBjb25zdCB7IGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChjb21ib0JveEVsKTtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIHNlbGVjdGVkT3B0aW9uLnZhbHVlKTtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgc2VsZWN0ZWRPcHRpb24udGV4dCk7XG4gICAgY29tYm9Cb3hFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIH1cblxuICBpZiAoc2VsZWN0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGNvbWJvQm94RWwpO1xuICAgIHNlbGVjdEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cblxuICBjb21ib0JveEVsLmRhdGFzZXQuZW5oYW5jZWQgPSBcInRydWVcIjtcbn07XG5cbi8qKlxuICogTWFuYWdlIHRoZSBmb2N1c2VkIGVsZW1lbnQgd2l0aGluIHRoZSBsaXN0IG9wdGlvbnMgd2hlblxuICogbmF2aWdhdGluZyB2aWEga2V5Ym9hcmQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gYW5jaG9yIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuZXh0RWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5za2lwRm9jdXMgc2tpcCBmb2N1cyBvZiBoaWdobGlnaHRlZCBpdGVtXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucHJldmVudFNjcm9sbCBzaG91bGQgc2tpcCBwcm9jZWR1cmUgdG8gc2Nyb2xsIHRvIGVsZW1lbnRcbiAqL1xuY29uc3QgaGlnaGxpZ2h0T3B0aW9uID0gKGVsLCBuZXh0RWwsIHsgc2tpcEZvY3VzLCBwcmV2ZW50U2Nyb2xsIH0gPSB7fSkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIGxpc3RFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChmb2N1c2VkT3B0aW9uRWwpIHtcbiAgICBmb2N1c2VkT3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZShMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICBmb2N1c2VkT3B0aW9uRWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCItMVwiKTtcbiAgfVxuXG4gIGlmIChuZXh0RWwpIHtcbiAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBuZXh0RWwuaWQpO1xuICAgIG5leHRFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiLCBcIjBcIik7XG4gICAgbmV4dEVsLmNsYXNzTGlzdC5hZGQoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG5cbiAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkJvdHRvbSA9IG5leHRFbC5vZmZzZXRUb3AgKyBuZXh0RWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgY3VycmVudEJvdHRvbSA9IGxpc3RFbC5zY3JvbGxUb3AgKyBsaXN0RWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAob3B0aW9uQm90dG9tID4gY3VycmVudEJvdHRvbSkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gb3B0aW9uQm90dG9tIC0gbGlzdEVsLm9mZnNldEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRFbC5vZmZzZXRUb3AgPCBsaXN0RWwuc2Nyb2xsVG9wKSB7XG4gICAgICAgIGxpc3RFbC5zY3JvbGxUb3AgPSBuZXh0RWwub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcEZvY3VzKSB7XG4gICAgICBuZXh0RWwuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcIlwiKTtcbiAgICBpbnB1dEVsLmZvY3VzKCk7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBkeW5hbWljIHJlZ3VsYXIgZXhwcmVzc2lvbiBiYXNlZCBvZmYgb2YgYSByZXBsYWNlYWJsZSBhbmQgcG9zc2libHkgZmlsdGVyZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgVGhlIHZhbHVlIHRvIHVzZSBpbiB0aGUgcmVndWxhciBleHByZXNzaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFzIEFuIG9iamVjdCBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRvIHJlcGxhY2UgYW5kIGZpbHRlciB0aGUgcXVlcnlcbiAqL1xuY29uc3QgZ2VuZXJhdGVEeW5hbWljUmVnRXhwID0gKGZpbHRlciwgcXVlcnkgPSBcIlwiLCBleHRyYXMgPSB7fSkgPT4ge1xuICBjb25zdCBlc2NhcGVSZWdFeHAgPSAodGV4dCkgPT5cbiAgICB0ZXh0LnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCBcIlxcXFwkJlwiKTtcblxuICBsZXQgZmluZCA9IGZpbHRlci5yZXBsYWNlKC97eyguKj8pfX0vZywgKG0sICQxKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gJDEudHJpbSgpO1xuICAgIGNvbnN0IHF1ZXJ5RmlsdGVyID0gZXh0cmFzW2tleV07XG4gICAgaWYgKGtleSAhPT0gXCJxdWVyeVwiICYmIHF1ZXJ5RmlsdGVyKSB7XG4gICAgICBjb25zdCBtYXRjaGVyID0gbmV3IFJlZ0V4cChxdWVyeUZpbHRlciwgXCJpXCIpO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHF1ZXJ5Lm1hdGNoKG1hdGNoZXIpO1xuXG4gICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKG1hdGNoZXNbMV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChxdWVyeSk7XG4gIH0pO1xuXG4gIGZpbmQgPSBgXig/OiR7ZmluZH0pJGA7XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZmluZCwgXCJpXCIpO1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IHRoZSBvcHRpb24gbGlzdCBvZiBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbWJvQm94RWwsXG4gICAgc2VsZWN0RWwsXG4gICAgaW5wdXRFbCxcbiAgICBsaXN0RWwsXG4gICAgc3RhdHVzRWwsXG4gICAgaXNQcmlzdGluZSxcbiAgICBkaXNhYmxlRmlsdGVyaW5nLFxuICB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcbiAgbGV0IHNlbGVjdGVkSXRlbUlkO1xuICBsZXQgZmlyc3RGb3VuZElkO1xuXG4gIGNvbnN0IGxpc3RPcHRpb25CYXNlSWQgPSBgJHtsaXN0RWwuaWR9LS1vcHRpb24tYDtcblxuICBjb25zdCBpbnB1dFZhbHVlID0gKGlucHV0RWwudmFsdWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZmlsdGVyID0gY29tYm9Cb3hFbC5kYXRhc2V0LmZpbHRlciB8fCBERUZBVUxUX0ZJTFRFUjtcbiAgY29uc3QgcmVnZXggPSBnZW5lcmF0ZUR5bmFtaWNSZWdFeHAoZmlsdGVyLCBpbnB1dFZhbHVlLCBjb21ib0JveEVsLmRhdGFzZXQpO1xuXG4gIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgY29uc3Qgb3B0aW9uSWQgPSBgJHtsaXN0T3B0aW9uQmFzZUlkfSR7b3B0aW9ucy5sZW5ndGh9YDtcblxuICAgIGlmIChcbiAgICAgIG9wdGlvbkVsLnZhbHVlICYmXG4gICAgICAoZGlzYWJsZUZpbHRlcmluZyB8fFxuICAgICAgICBpc1ByaXN0aW5lIHx8XG4gICAgICAgICFpbnB1dFZhbHVlIHx8XG4gICAgICAgIHJlZ2V4LnRlc3Qob3B0aW9uRWwudGV4dCkpXG4gICAgKSB7XG4gICAgICBpZiAoc2VsZWN0RWwudmFsdWUgJiYgb3B0aW9uRWwudmFsdWUgPT09IHNlbGVjdEVsLnZhbHVlKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbUlkID0gb3B0aW9uSWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXNhYmxlRmlsdGVyaW5nICYmICFmaXJzdEZvdW5kSWQgJiYgcmVnZXgudGVzdChvcHRpb25FbC50ZXh0KSkge1xuICAgICAgICBmaXJzdEZvdW5kSWQgPSBvcHRpb25JZDtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMucHVzaChvcHRpb25FbCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbnVtT3B0aW9ucyA9IG9wdGlvbnMubGVuZ3RoO1xuICBjb25zdCBvcHRpb25IdG1sID0gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBvcHRpb25JZCA9IGAke2xpc3RPcHRpb25CYXNlSWR9JHtpbmRleH1gO1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbTElTVF9PUFRJT05fQ0xBU1NdO1xuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcbiAgICBsZXQgYXJpYVNlbGVjdGVkID0gXCJmYWxzZVwiO1xuXG4gICAgaWYgKG9wdGlvbklkID09PSBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTLCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBhcmlhU2VsZWN0ZWQgPSBcInRydWVcIjtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGVjdGVkSXRlbUlkICYmIGluZGV4ID09PSAwKSB7XG4gICAgICBjbGFzc2VzLnB1c2goTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1zZXRzaXplXCIsIG9wdGlvbnMubGVuZ3RoKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXBvc2luc2V0XCIsIGluZGV4ICsgMSk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBhcmlhU2VsZWN0ZWQpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImlkXCIsIG9wdGlvbklkKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcIm9wdGlvblwiKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIG9wdGlvbi52YWx1ZSk7XG4gICAgbGkudGV4dENvbnRlbnQgPSBvcHRpb24udGV4dDtcblxuICAgIHJldHVybiBsaTtcbiAgfSk7XG5cbiAgY29uc3Qgbm9SZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBub1Jlc3VsdHMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1uby1yZXN1bHRzYCk7XG4gIG5vUmVzdWx0cy50ZXh0Q29udGVudCA9IFwiTm8gcmVzdWx0cyBmb3VuZFwiO1xuXG4gIGxpc3RFbC5oaWRkZW4gPSBmYWxzZTtcblxuICBpZiAobnVtT3B0aW9ucykge1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG9wdGlvbkh0bWwuZm9yRWFjaCgoaXRlbSkgPT5cbiAgICAgIGxpc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgaXRlbSlcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGxpc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbm9SZXN1bHRzKTtcbiAgfVxuXG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBudW1PcHRpb25zXG4gICAgPyBgJHtudW1PcHRpb25zfSByZXN1bHQke251bU9wdGlvbnMgPiAxID8gXCJzXCIgOiBcIlwifSBhdmFpbGFibGUuYFxuICAgIDogXCJObyByZXN1bHRzLlwiO1xuXG4gIGxldCBpdGVtVG9Gb2N1cztcblxuICBpZiAoaXNQcmlzdGluZSAmJiBzZWxlY3RlZEl0ZW1JZCkge1xuICAgIGl0ZW1Ub0ZvY3VzID0gbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoYCMke3NlbGVjdGVkSXRlbUlkfWApO1xuICB9IGVsc2UgaWYgKGRpc2FibGVGaWx0ZXJpbmcgJiYgZmlyc3RGb3VuZElkKSB7XG4gICAgaXRlbVRvRm9jdXMgPSBsaXN0RWwucXVlcnlTZWxlY3RvcihgIyR7Zmlyc3RGb3VuZElkfWApO1xuICB9XG5cbiAgaWYgKGl0ZW1Ub0ZvY3VzKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGxpc3RFbCwgaXRlbVRvRm9jdXMsIHtcbiAgICAgIHNraXBGb2N1czogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBIaWRlIHRoZSBvcHRpb24gbGlzdCBvZiBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGlkZUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIHN0YXR1c0VsLCBmb2N1c2VkT3B0aW9uRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgc3RhdHVzRWwuaW5uZXJIVE1MID0gXCJcIjtcblxuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG5cbiAgaWYgKGZvY3VzZWRPcHRpb25FbCkge1xuICAgIGZvY3VzZWRPcHRpb25FbC5jbGFzc0xpc3QucmVtb3ZlKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICB9XG5cbiAgbGlzdEVsLnNjcm9sbFRvcCA9IDA7XG4gIGxpc3RFbC5oaWRkZW4gPSB0cnVlO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYW4gb3B0aW9uIGxpc3Qgb2YgdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbGlzdE9wdGlvbkVsIFRoZSBsaXN0IG9wdGlvbiBiZWluZyBzZWxlY3RlZFxuICovXG5jb25zdCBzZWxlY3RJdGVtID0gKGxpc3RPcHRpb25FbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQobGlzdE9wdGlvbkVsKTtcblxuICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIGxpc3RPcHRpb25FbC5kYXRhc2V0LnZhbHVlKTtcbiAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIGxpc3RPcHRpb25FbC50ZXh0Q29udGVudCk7XG4gIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgaW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBDbGVhciB0aGUgaW5wdXQgb2YgdGhlIGNvbWJvIGJveFxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNsZWFyQnV0dG9uRWwgVGhlIGNsZWFyIGlucHV0IGJ1dHRvblxuICovXG5jb25zdCBjbGVhcklucHV0ID0gKGNsZWFyQnV0dG9uRWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPVxuICAgIGdldENvbWJvQm94Q29udGV4dChjbGVhckJ1dHRvbkVsKTtcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgaWYgKHNlbGVjdEVsLnZhbHVlKSBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwpO1xuICBpZiAoaW5wdXRFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwpO1xuICBjb21ib0JveEVsLmNsYXNzTGlzdC5yZW1vdmUoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcblxuICBpZiAobGlzdFNob3duKSBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgaW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgc2VsZWN0IGJhc2VkIG9mZiBvZiBjdXJyZW50bHkgc2V0IHNlbGVjdCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IHJlc2V0U2VsZWN0aW9uID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgc2VsZWN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0VmFsdWUgPSBzZWxlY3RFbC52YWx1ZTtcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHNlbGVjdFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkVsID0gc2VsZWN0RWwub3B0aW9uc1tpXTtcbiAgICAgIGlmIChvcHRpb25FbC52YWx1ZSA9PT0gc2VsZWN0VmFsdWUpIHtcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgIT09IG9wdGlvbkVsLnRleHQpIHtcbiAgICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgb3B0aW9uRWwudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tYm9Cb3hFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5wdXRWYWx1ZSkge1xuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgYW4gb3B0aW9uIGxpc3Qgb2YgdGhlIGNvbWJvIGJveCBjb21wb25lbnQgYmFzZWQgb2ZmIG9mXG4gKiBoYXZpbmcgYSBjdXJyZW50IGZvY3VzZWQgbGlzdCBvcHRpb24gb3JcbiAqIGhhdmluZyB0ZXN0IHRoYXQgY29tcGxldGVseSBtYXRjaGVzIGEgbGlzdCBvcHRpb24uXG4gKiBPdGhlcndpc2UgaXQgY2xlYXJzIHRoZSBpbnB1dCBhbmQgc2VsZWN0LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGNvbXBsZXRlU2VsZWN0aW9uID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgc2VsZWN0RWwsIGlucHV0RWwsIHN0YXR1c0VsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcblxuICBjb25zdCBpbnB1dFZhbHVlID0gKGlucHV0RWwudmFsdWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcblxuICBpZiAoaW5wdXRWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudGV4dC50b0xvd2VyQ2FzZSgpID09PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShzZWxlY3RFbCwgb3B0aW9uRWwudmFsdWUpO1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgb3B0aW9uRWwudGV4dCk7XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZXNjYXBlIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcblxuICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgcmVzZXRTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBkb3duIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgY29uc3QgbmV4dE9wdGlvbkVsID1cbiAgICBsaXN0RWwucXVlcnlTZWxlY3RvcihMSVNUX09QVElPTl9GT0NVU0VEKSB8fFxuICAgIGxpc3RFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OKTtcblxuICBpZiAobmV4dE9wdGlvbkVsKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGNvbWJvQm94RWwsIG5leHRPcHRpb25FbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVudGVyIGV2ZW50IGZyb20gYW4gaW5wdXQgZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRW50ZXJGcm9tSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChldmVudC50YXJnZXQpO1xuICBjb25zdCBsaXN0U2hvd24gPSAhbGlzdEVsLmhpZGRlbjtcblxuICBjb21wbGV0ZVNlbGVjdGlvbihjb21ib0JveEVsKTtcblxuICBpZiAobGlzdFNob3duKSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGRvd24gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBmb2N1c2VkT3B0aW9uRWwgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IG5leHRPcHRpb25FbCA9IGZvY3VzZWRPcHRpb25FbC5uZXh0U2libGluZztcblxuICBpZiAobmV4dE9wdGlvbkVsKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGZvY3VzZWRPcHRpb25FbCwgbmV4dE9wdGlvbkVsKTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgdGFiIGV2ZW50IGZyb20gYW4gbGlzdCBvcHRpb24gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlVGFiRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgc2VsZWN0SXRlbShldmVudC50YXJnZXQpO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVudGVyIGV2ZW50IGZyb20gbGlzdCBvcHRpb24gd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVudGVyRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgc2VsZWN0SXRlbShldmVudC50YXJnZXQpO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIHVwIGV2ZW50IGZyb20gbGlzdCBvcHRpb24gd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZVVwRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KFxuICAgIGV2ZW50LnRhcmdldFxuICApO1xuICBjb25zdCBuZXh0T3B0aW9uRWwgPSBmb2N1c2VkT3B0aW9uRWwgJiYgZm9jdXNlZE9wdGlvbkVsLnByZXZpb3VzU2libGluZztcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgaGlnaGxpZ2h0T3B0aW9uKGNvbWJvQm94RWwsIG5leHRPcHRpb25FbCk7XG5cbiAgaWYgKGxpc3RTaG93bikge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBpZiAoIW5leHRPcHRpb25FbCkge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCBsaXN0IG9wdGlvbiBvbiB0aGUgbW91c2VvdmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MTElFbGVtZW50fSBsaXN0T3B0aW9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyID0gKGxpc3RPcHRpb25FbCkgPT4ge1xuICBjb25zdCBpc0N1cnJlbnRseUZvY3VzZWQgPSBsaXN0T3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgIExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1NcbiAgKTtcblxuICBpZiAoaXNDdXJyZW50bHlGb2N1c2VkKSByZXR1cm47XG5cbiAgaGlnaGxpZ2h0T3B0aW9uKGxpc3RPcHRpb25FbCwgbGlzdE9wdGlvbkVsLCB7XG4gICAgcHJldmVudFNjcm9sbDogdHJ1ZSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB0aGUgbGlzdCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IHRvZ2dsZUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGNsaWNrIGZyb20gaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUNsaWNrRnJvbUlucHV0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChsaXN0RWwuaGlkZGVuKSB7XG4gICAgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cbn07XG5cbmNvbnN0IGNvbWJvQm94ID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBoYW5kbGVDbGlja0Zyb21JbnB1dCh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbVE9HR0xFX0xJU1RfQlVUVE9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdG9nZ2xlTGlzdCh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbTElTVF9PUFRJT05dKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBzZWxlY3RJdGVtKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtDTEVBUl9JTlBVVF9CVVRUT05dKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBjbGVhcklucHV0KHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGZvY3Vzb3V0OiB7XG4gICAgICBbQ09NQk9fQk9YXShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICByZXNldFNlbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICBoaWRlTGlzdCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtDT01CT19CT1hdOiBrZXltYXAoe1xuICAgICAgICBFc2NhcGU6IGhhbmRsZUVzY2FwZSxcbiAgICAgIH0pLFxuICAgICAgW0lOUFVUXToga2V5bWFwKHtcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUlucHV0LFxuICAgICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tSW5wdXQsXG4gICAgICAgIERvd246IGhhbmRsZURvd25Gcm9tSW5wdXQsXG4gICAgICB9KSxcbiAgICAgIFtMSVNUX09QVElPTl06IGtleW1hcCh7XG4gICAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFVwOiBoYW5kbGVVcEZyb21MaXN0T3B0aW9uLFxuICAgICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbixcbiAgICAgICAgRG93bjogaGFuZGxlRG93bkZyb21MaXN0T3B0aW9uLFxuICAgICAgICBFbnRlcjogaGFuZGxlRW50ZXJGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgVGFiOiBoYW5kbGVUYWJGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgXCJTaGlmdCtUYWJcIjogbm9vcCxcbiAgICAgIH0pLFxuICAgIH0sXG4gICAgaW5wdXQ6IHtcbiAgICAgIFtJTlBVVF0oKSB7XG4gICAgICAgIGNvbnN0IGNvbWJvQm94RWwgPSB0aGlzLmNsb3Nlc3QoQ09NQk9fQk9YKTtcbiAgICAgICAgY29tYm9Cb3hFbC5jbGFzc0xpc3QucmVtb3ZlKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gICAgICAgIGRpc3BsYXlMaXN0KHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIG1vdXNlb3Zlcjoge1xuICAgICAgW0xJU1RfT1BUSU9OXSgpIHtcbiAgICAgICAgaGFuZGxlTW91c2VvdmVyKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoQ09NQk9fQk9YLCByb290KS5mb3JFYWNoKChjb21ib0JveEVsKSA9PiB7XG4gICAgICAgIGVuaGFuY2VDb21ib0JveChjb21ib0JveEVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0Q29tYm9Cb3hDb250ZXh0LFxuICAgIGVuaGFuY2VDb21ib0JveCxcbiAgICBnZW5lcmF0ZUR5bmFtaWNSZWdFeHAsXG4gICAgZGlzYWJsZSxcbiAgICBlbmFibGUsXG4gICAgZGlzcGxheUxpc3QsXG4gICAgaGlkZUxpc3QsXG4gICAgQ09NQk9fQk9YX0NMQVNTLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbWJvQm94O1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuY29uc3QgYWN0aXZlRWxlbWVudCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9hY3RpdmUtZWxlbWVudFwiKTtcbmNvbnN0IGlzSW9zRGV2aWNlID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2lzLWlvcy1kZXZpY2VcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2FuaXRpemVyXCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1waWNrZXJgO1xuY29uc3QgREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fd3JhcHBlcmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTklUSUFMSVpFRF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfS0taW5pdGlhbGl6ZWRgO1xuY29uc3QgREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9LS1hY3RpdmVgO1xuY29uc3QgREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2ludGVybmFsLWlucHV0YDtcbmNvbnN0IERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19leHRlcm5hbC1pbnB1dGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2J1dHRvbmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fY2FsZW5kYXJgO1xuY29uc3QgREFURV9QSUNLRVJfU1RBVFVTX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19zdGF0dXNgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fZGF0ZWA7XG5cbmNvbnN0IENBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfU0VMRUNURURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QUkVWSU9VU19NT05USF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1wcmV2aW91cy1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tY3VycmVudC1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX05FWFRfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tbmV4dC1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1RPREFZX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXRvZGF5YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9TVEFSVF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1yYW5nZS1kYXRlLXN0YXJ0YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9FTkRfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZS1lbmRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9XSVRISU5fUkFOR0VfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0td2l0aGluLXJhbmdlYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLXllYXJgO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbmV4dC15ZWFyYDtcbmNvbnN0IENBTEVOREFSX05FWFRfTU9OVEhfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aC1zZWxlY3Rpb25gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3llYXItc2VsZWN0aW9uYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9GT0NVU0VEX0NMQVNTID0gYCR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX1lFQVJfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNURURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fcHJldmlvdXMteWVhci1jaHVua2A7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQteWVhci1jaHVua2A7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fZGF0ZS1waWNrZXJgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aC1waWNrZXJgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3llYXItcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX1RBQkxFX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X190YWJsZWA7XG5jb25zdCBDQUxFTkRBUl9ST1dfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3Jvd2A7XG5jb25zdCBDQUxFTkRBUl9DRUxMX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19jZWxsYDtcbmNvbnN0IENBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTID0gYCR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30tLWNlbnRlci1pdGVtc2A7XG5jb25zdCBDQUxFTkRBUl9NT05USF9MQUJFTF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtbGFiZWxgO1xuY29uc3QgQ0FMRU5EQVJfREFZX09GX1dFRUtfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RheS1vZi13ZWVrYDtcblxuY29uc3QgREFURV9QSUNLRVIgPSBgLiR7REFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0JVVFRPTiA9IGAuJHtEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUID0gYC4ke0RBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVCA9IGAuJHtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfQ0FMRU5EQVIgPSBgLiR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX1NUQVRVUyA9IGAuJHtEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEUgPSBgLiR7Q0FMRU5EQVJfREFURV9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9GT0NVU0VEID0gYC4ke0NBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIID0gYC4ke0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUiA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19NT05USCA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSID0gYC4ke0NBTEVOREFSX05FWFRfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9NT05USCA9IGAuJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTiA9IGAuJHtDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OID0gYC4ke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEggPSBgLiR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVIgPSBgLiR7Q0FMRU5EQVJfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTksgPSBgLiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfUElDS0VSID0gYC4ke0NBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0ZPQ1VTRUQgPSBgLiR7Q0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9GT0NVU0VEID0gYC4ke0NBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTU31gO1xuXG5jb25zdCBWQUxJREFUSU9OX01FU1NBR0UgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGVcIjtcblxuY29uc3QgTU9OVEhfTEFCRUxTID0gW1xuICBcIkphbnVhcnlcIixcbiAgXCJGZWJydWFyeVwiLFxuICBcIk1hcmNoXCIsXG4gIFwiQXByaWxcIixcbiAgXCJNYXlcIixcbiAgXCJKdW5lXCIsXG4gIFwiSnVseVwiLFxuICBcIkF1Z3VzdFwiLFxuICBcIlNlcHRlbWJlclwiLFxuICBcIk9jdG9iZXJcIixcbiAgXCJOb3ZlbWJlclwiLFxuICBcIkRlY2VtYmVyXCIsXG5dO1xuXG5jb25zdCBEQVlfT0ZfV0VFS19MQUJFTFMgPSBbXG4gIFwiU3VuZGF5XCIsXG4gIFwiTW9uZGF5XCIsXG4gIFwiVHVlc2RheVwiLFxuICBcIldlZG5lc2RheVwiLFxuICBcIlRodXJzZGF5XCIsXG4gIFwiRnJpZGF5XCIsXG4gIFwiU2F0dXJkYXlcIixcbl07XG5cbmNvbnN0IEVOVEVSX0tFWUNPREUgPSAxMztcblxuY29uc3QgWUVBUl9DSFVOSyA9IDEyO1xuXG5jb25zdCBERUZBVUxUX01JTl9EQVRFID0gXCIwMDAwLTAxLTAxXCI7XG5jb25zdCBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUID0gXCJNTS9ERC9ZWVlZXCI7XG5jb25zdCBJTlRFUk5BTF9EQVRFX0ZPUk1BVCA9IFwiWVlZWS1NTS1ERFwiO1xuXG5jb25zdCBOT1RfRElTQUJMRURfU0VMRUNUT1IgPSBcIjpub3QoW2Rpc2FibGVkXSlcIjtcblxuY29uc3QgcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyA9ICguLi5zZWxlY3RvcnMpID0+XG4gIHNlbGVjdG9ycy5tYXAoKHF1ZXJ5KSA9PiBxdWVyeSArIE5PVF9ESVNBQkxFRF9TRUxFQ1RPUikuam9pbihcIiwgXCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9GT0NVU0FCTEUgPSBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzKFxuICBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSLFxuICBDQUxFTkRBUl9QUkVWSU9VU19NT05USCxcbiAgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT04sXG4gIENBTEVOREFSX01PTlRIX1NFTEVDVElPTixcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSLFxuICBDQUxFTkRBUl9ORVhUX01PTlRILFxuICBDQUxFTkRBUl9EQVRFX0ZPQ1VTRURcbik7XG5cbmNvbnN0IE1PTlRIX1BJQ0tFUl9GT0NVU0FCTEUgPSBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzKFxuICBDQUxFTkRBUl9NT05USF9GT0NVU0VEXG4pO1xuXG5jb25zdCBZRUFSX1BJQ0tFUl9GT0NVU0FCTEUgPSBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzKFxuICBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LLFxuICBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTkssXG4gIENBTEVOREFSX1lFQVJfRk9DVVNFRFxuKTtcblxuLy8gI3JlZ2lvbiBEYXRlIE1hbmlwdWxhdGlvbiBGdW5jdGlvbnNcblxuLyoqXG4gKiBLZWVwIGRhdGUgd2l0aGluIG1vbnRoLiBNb250aCB3b3VsZCBvbmx5IGJlIG92ZXIgYnkgMSB0byAzIGRheXNcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NoZWNrIHRoZSBkYXRlIG9iamVjdCB0byBjaGVja1xuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHRoZSBjb3JyZWN0IG1vbnRoXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUsIGNvcnJlY3RlZCBpZiBuZWVkZWRcbiAqL1xuY29uc3Qga2VlcERhdGVXaXRoaW5Nb250aCA9IChkYXRlVG9DaGVjaywgbW9udGgpID0+IHtcbiAgaWYgKG1vbnRoICE9PSBkYXRlVG9DaGVjay5nZXRNb250aCgpKSB7XG4gICAgZGF0ZVRvQ2hlY2suc2V0RGF0ZSgwKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlVG9DaGVjaztcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgZnJvbSBtb250aCBkYXkgeWVhclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIHRoZSB5ZWFyIHRvIHNldFxuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHRoZSBtb250aCB0byBzZXQgKHplcm8taW5kZXhlZClcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIHNldFxuICogQHJldHVybnMge0RhdGV9IHRoZSBzZXQgZGF0ZVxuICovXG5jb25zdCBzZXREYXRlID0gKHllYXIsIG1vbnRoLCBkYXRlKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF0ZSk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiB0b2RheXMgZGF0ZVxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSB0b2RheXMgZGF0ZVxuICovXG5jb25zdCB0b2RheSA9ICgpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGRheSA9IG5ld0RhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgeWVhciA9IG5ld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIHNldERhdGUoeWVhciwgbW9udGgsIGRheSk7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIGZpcnN0IGRheSBvZiB0aGUgbW9udGhcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdGFydE9mTW9udGggPSAoZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gbGFzdCBkYXkgb2YgdGhlIG1vbnRoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgbGFzdERheU9mTW9udGggPSAoZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIEFkZCBkYXlzIHRvIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bURheXMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5c1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZERheXMgPSAoX2RhdGUsIG51bURheXMpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG4gIG5ld0RhdGUuc2V0RGF0ZShuZXdEYXRlLmdldERhdGUoKSArIG51bURheXMpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgZGF5cyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bURheXMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5c1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YkRheXMgPSAoX2RhdGUsIG51bURheXMpID0+IGFkZERheXMoX2RhdGUsIC1udW1EYXlzKTtcblxuLyoqXG4gKiBBZGQgd2Vla3MgdG8gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRXZWVrcyA9IChfZGF0ZSwgbnVtV2Vla3MpID0+IGFkZERheXMoX2RhdGUsIG51bVdlZWtzICogNyk7XG5cbi8qKlxuICogU3VidHJhY3Qgd2Vla3MgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1XZWVrcyB0aGUgZGlmZmVyZW5jZSBpbiB3ZWVrc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YldlZWtzID0gKF9kYXRlLCBudW1XZWVrcykgPT4gYWRkV2Vla3MoX2RhdGUsIC1udW1XZWVrcyk7XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIChTdW5kYXkpXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdGFydE9mV2VlayA9IChfZGF0ZSkgPT4ge1xuICBjb25zdCBkYXlPZldlZWsgPSBfZGF0ZS5nZXREYXkoKTtcbiAgcmV0dXJuIHN1YkRheXMoX2RhdGUsIGRheU9mV2Vlayk7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHdlZWsgKFNhdHVyZGF5KVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBlbmRPZldlZWsgPSAoX2RhdGUpID0+IHtcbiAgY29uc3QgZGF5T2ZXZWVrID0gX2RhdGUuZ2V0RGF5KCk7XG4gIHJldHVybiBhZGREYXlzKF9kYXRlLCA2IC0gZGF5T2ZXZWVrKTtcbn07XG5cbi8qKlxuICogQWRkIG1vbnRocyB0byBkYXRlIGFuZCBrZWVwIGRhdGUgd2l0aGluIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1Nb250aHMgdGhlIGRpZmZlcmVuY2UgaW4gbW9udGhzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkTW9udGhzID0gKF9kYXRlLCBudW1Nb250aHMpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgY29uc3QgZGF0ZU1vbnRoID0gKG5ld0RhdGUuZ2V0TW9udGgoKSArIDEyICsgbnVtTW9udGhzKSAlIDEyO1xuICBuZXdEYXRlLnNldE1vbnRoKG5ld0RhdGUuZ2V0TW9udGgoKSArIG51bU1vbnRocyk7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgZGF0ZU1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgbW9udGhzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtTW9udGhzIHRoZSBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1Yk1vbnRocyA9IChfZGF0ZSwgbnVtTW9udGhzKSA9PiBhZGRNb250aHMoX2RhdGUsIC1udW1Nb250aHMpO1xuXG4vKipcbiAqIEFkZCB5ZWFycyB0byBkYXRlIGFuZCBrZWVwIGRhdGUgd2l0aGluIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1ZZWFycyB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZFllYXJzID0gKF9kYXRlLCBudW1ZZWFycykgPT4gYWRkTW9udGhzKF9kYXRlLCBudW1ZZWFycyAqIDEyKTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB5ZWFycyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVllYXJzIHRoZSBkaWZmZXJlbmNlIGluIHllYXJzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3ViWWVhcnMgPSAoX2RhdGUsIG51bVllYXJzKSA9PiBhZGRZZWFycyhfZGF0ZSwgLW51bVllYXJzKTtcblxuLyoqXG4gKiBTZXQgbW9udGhzIG9mIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHplcm8taW5kZXhlZCBtb250aCB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzZXRNb250aCA9IChfZGF0ZSwgbW9udGgpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgbmV3RGF0ZS5zZXRNb250aChtb250aCk7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgbW9udGgpO1xuXG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBTZXQgeWVhciBvZiBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIHRoZSB5ZWFyIHRvIHNldFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHNldFllYXIgPSAoX2RhdGUsIHllYXIpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgY29uc3QgbW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhcik7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgbW9udGgpO1xuXG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGVhcmxpZXN0IGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZWFybGllc3QgZGF0ZVxuICovXG5jb25zdCBtaW4gPSAoZGF0ZUEsIGRhdGVCKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZUE7XG5cbiAgaWYgKGRhdGVCIDwgZGF0ZUEpIHtcbiAgICBuZXdEYXRlID0gZGF0ZUI7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxhdGVzdCBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhdGVzdCBkYXRlXG4gKi9cbmNvbnN0IG1heCA9IChkYXRlQSwgZGF0ZUIpID0+IHtcbiAgbGV0IG5ld0RhdGUgPSBkYXRlQTtcblxuICBpZiAoZGF0ZUIgPiBkYXRlQSkge1xuICAgIG5ld0RhdGUgPSBkYXRlQjtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGFyZSB0aGUgaW4gdGhlIHNhbWUgeWVhclxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyBpbiB0aGUgc2FtZSB5ZWFyXG4gKi9cbmNvbnN0IGlzU2FtZVllYXIgPSAoZGF0ZUEsIGRhdGVCKSA9PlxuICBkYXRlQSAmJiBkYXRlQiAmJiBkYXRlQS5nZXRGdWxsWWVhcigpID09PSBkYXRlQi5nZXRGdWxsWWVhcigpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGFyZSB0aGUgaW4gdGhlIHNhbWUgbW9udGhcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgaW4gdGhlIHNhbWUgbW9udGhcbiAqL1xuY29uc3QgaXNTYW1lTW9udGggPSAoZGF0ZUEsIGRhdGVCKSA9PlxuICBpc1NhbWVZZWFyKGRhdGVBLCBkYXRlQikgJiYgZGF0ZUEuZ2V0TW9udGgoKSA9PT0gZGF0ZUIuZ2V0TW9udGgoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIHNhbWUgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgdGhlIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSB0aGUgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIHRoZSBzYW1lIGRhdGVcbiAqL1xuY29uc3QgaXNTYW1lRGF5ID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgaXNTYW1lTW9udGgoZGF0ZUEsIGRhdGVCKSAmJiBkYXRlQS5nZXREYXRlKCkgPT09IGRhdGVCLmdldERhdGUoKTtcblxuLyoqXG4gKiByZXR1cm4gYSBuZXcgZGF0ZSB3aXRoaW4gbWluaW11bSBhbmQgbWF4aW11bSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gKi9cbmNvbnN0IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZTtcblxuICBpZiAoZGF0ZSA8IG1pbkRhdGUpIHtcbiAgICBuZXdEYXRlID0gbWluRGF0ZTtcbiAgfSBlbHNlIGlmIChtYXhEYXRlICYmIGRhdGUgPiBtYXhEYXRlKSB7XG4gICAgbmV3RGF0ZSA9IG1heERhdGU7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBpcyB2YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlcmUgYSBkYXkgd2l0aGluIHRoZSBtb250aCB3aXRoaW4gbWluIGFuZCBtYXggZGF0ZXNcbiAqL1xuY29uc3QgaXNEYXRlV2l0aGluTWluQW5kTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+XG4gIGRhdGUgPj0gbWluRGF0ZSAmJiAoIW1heERhdGUgfHwgZGF0ZSA8PSBtYXhEYXRlKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBtb250aCBpcyBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyB0aGUgbW9udGggb3V0c2lkZSBtaW4gb3IgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZXNNb250aE91dHNpZGVNaW5Pck1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBsYXN0RGF5T2ZNb250aChkYXRlKSA8IG1pbkRhdGUgfHwgKG1heERhdGUgJiYgc3RhcnRPZk1vbnRoKGRhdGUpID4gbWF4RGF0ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgeWVhciBpcyBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyB0aGUgbW9udGggb3V0c2lkZSBtaW4gb3IgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+XG4gIGxhc3REYXlPZk1vbnRoKHNldE1vbnRoKGRhdGUsIDExKSkgPCBtaW5EYXRlIHx8XG4gIChtYXhEYXRlICYmIHN0YXJ0T2ZNb250aChzZXRNb250aChkYXRlLCAwKSkgPiBtYXhEYXRlKTtcblxuLyoqXG4gKiBQYXJzZSBhIGRhdGUgd2l0aCBmb3JtYXQgTS1ELVlZXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdHJpbmcgdGhlIGRhdGUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlIHN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBhZGp1c3REYXRlIHNob3VsZCB0aGUgZGF0ZSBiZSBhZGp1c3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZVxuICovXG5jb25zdCBwYXJzZURhdGVTdHJpbmcgPSAoXG4gIGRhdGVTdHJpbmcsXG4gIGRhdGVGb3JtYXQgPSBJTlRFUk5BTF9EQVRFX0ZPUk1BVCxcbiAgYWRqdXN0RGF0ZSA9IGZhbHNlXG4pID0+IHtcbiAgbGV0IGRhdGU7XG4gIGxldCBtb250aDtcbiAgbGV0IGRheTtcbiAgbGV0IHllYXI7XG4gIGxldCBwYXJzZWQ7XG5cbiAgaWYgKGRhdGVTdHJpbmcpIHtcbiAgICBsZXQgbW9udGhTdHI7XG4gICAgbGV0IGRheVN0cjtcbiAgICBsZXQgeWVhclN0cjtcblxuICAgIGlmIChkYXRlRm9ybWF0ID09PSBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKSB7XG4gICAgICBbbW9udGhTdHIsIGRheVN0ciwgeWVhclN0cl0gPSBkYXRlU3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3llYXJTdHIsIG1vbnRoU3RyLCBkYXlTdHJdID0gZGF0ZVN0cmluZy5zcGxpdChcIi1cIik7XG4gICAgfVxuXG4gICAgaWYgKHllYXJTdHIpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgeWVhciA9IHBhcnNlZDtcbiAgICAgICAgaWYgKGFkanVzdERhdGUpIHtcbiAgICAgICAgICB5ZWFyID0gTWF0aC5tYXgoMCwgeWVhcik7XG4gICAgICAgICAgaWYgKHllYXJTdHIubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSB0b2RheSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhclN0dWIgPVxuICAgICAgICAgICAgICBjdXJyZW50WWVhciAtIChjdXJyZW50WWVhciAlIDEwICoqIHllYXJTdHIubGVuZ3RoKTtcbiAgICAgICAgICAgIHllYXIgPSBjdXJyZW50WWVhclN0dWIgKyBwYXJzZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoU3RyKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludChtb250aFN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICBtb250aCA9IHBhcnNlZDtcbiAgICAgICAgaWYgKGFkanVzdERhdGUpIHtcbiAgICAgICAgICBtb250aCA9IE1hdGgubWF4KDEsIG1vbnRoKTtcbiAgICAgICAgICBtb250aCA9IE1hdGgubWluKDEyLCBtb250aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9udGggJiYgZGF5U3RyICYmIHllYXIgIT0gbnVsbCkge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQoZGF5U3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIGRheSA9IHBhcnNlZDtcbiAgICAgICAgaWYgKGFkanVzdERhdGUpIHtcbiAgICAgICAgICBjb25zdCBsYXN0RGF5T2ZUaGVNb250aCA9IHNldERhdGUoeWVhciwgbW9udGgsIDApLmdldERhdGUoKTtcbiAgICAgICAgICBkYXkgPSBNYXRoLm1heCgxLCBkYXkpO1xuICAgICAgICAgIGRheSA9IE1hdGgubWluKGxhc3REYXlPZlRoZU1vbnRoLCBkYXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoICYmIGRheSAmJiB5ZWFyICE9IG51bGwpIHtcbiAgICAgIGRhdGUgPSBzZXREYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0ZTtcbn07XG5cbi8qKlxuICogRm9ybWF0IGEgZGF0ZSB0byBmb3JtYXQgTU0tREQtWVlZWVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSB0aGUgZGF0ZSB0byBmb3JtYXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlRm9ybWF0IHRoZSBmb3JtYXQgb2YgdGhlIGRhdGUgc3RyaW5nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKi9cbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZSwgZGF0ZUZvcm1hdCA9IElOVEVSTkFMX0RBVEVfRk9STUFUKSA9PiB7XG4gIGNvbnN0IHBhZFplcm9zID0gKHZhbHVlLCBsZW5ndGgpID0+IGAwMDAwJHt2YWx1ZX1gLnNsaWNlKC1sZW5ndGgpO1xuXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgaWYgKGRhdGVGb3JtYXQgPT09IERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpIHtcbiAgICByZXR1cm4gW3BhZFplcm9zKG1vbnRoLCAyKSwgcGFkWmVyb3MoZGF5LCAyKSwgcGFkWmVyb3MoeWVhciwgNCldLmpvaW4oXCIvXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtwYWRaZXJvcyh5ZWFyLCA0KSwgcGFkWmVyb3MobW9udGgsIDIpLCBwYWRaZXJvcyhkYXksIDIpXS5qb2luKFwiLVwiKTtcbn07XG5cbi8vICNlbmRyZWdpb24gRGF0ZSBNYW5pcHVsYXRpb24gRnVuY3Rpb25zXG5cbi8qKlxuICogQ3JlYXRlIGEgZ3JpZCBzdHJpbmcgZnJvbSBhbiBhcnJheSBvZiBodG1sIHN0cmluZ3NcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBodG1sQXJyYXkgdGhlIGFycmF5IG9mIGh0bWwgaXRlbXNcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3dTaXplIHRoZSBsZW5ndGggb2YgYSByb3dcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBncmlkIHN0cmluZ1xuICovXG5jb25zdCBsaXN0VG9HcmlkSHRtbCA9IChodG1sQXJyYXksIHJvd1NpemUpID0+IHtcbiAgY29uc3QgZ3JpZCA9IFtdO1xuICBsZXQgcm93ID0gW107XG5cbiAgbGV0IGkgPSAwO1xuICB3aGlsZSAoaSA8IGh0bWxBcnJheS5sZW5ndGgpIHtcbiAgICByb3cgPSBbXTtcblxuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHdoaWxlIChpIDwgaHRtbEFycmF5Lmxlbmd0aCAmJiByb3cubGVuZ3RoIDwgcm93U2l6ZSkge1xuICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICB0ZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgaHRtbEFycmF5W2ldKTtcbiAgICAgIHJvdy5wdXNoKHRkKTtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICByb3cuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgdHIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5wdXNoKHRyKTtcbiAgfVxuXG4gIHJldHVybiBncmlkO1xufTtcblxuY29uc3QgY3JlYXRlVGFibGVCb2R5ID0gKGdyaWQpID0+IHtcbiAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBncmlkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICB0YWJsZUJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVsZW1lbnQpO1xuICB9KTtcblxuICByZXR1cm4gdGFibGVCb2R5O1xufTtcblxuLyoqXG4gKiBzZXQgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGFuZCBkaXNwYXRjaCBhIGNoYW5nZSBldmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgVGhlIGVsZW1lbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgVGhlIG5ldyB2YWx1ZSBvZiB0aGUgZWxlbWVudFxuICovXG5jb25zdCBjaGFuZ2VFbGVtZW50VmFsdWUgPSAoZWwsIHZhbHVlID0gXCJcIikgPT4ge1xuICBjb25zdCBlbGVtZW50VG9DaGFuZ2UgPSBlbDtcbiAgZWxlbWVudFRvQ2hhbmdlLnZhbHVlID0gdmFsdWU7XG5cbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJjaGFuZ2VcIiwge1xuICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICBkZXRhaWw6IHsgdmFsdWUgfSxcbiAgfSk7XG4gIGVsZW1lbnRUb0NoYW5nZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG5cbi8qKlxuICogVGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEYXRlUGlja2VyQ29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gY2FsZW5kYXJFbFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZGF0ZVBpY2tlckVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGludGVybmFsSW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBleHRlcm5hbElucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IHN0YXR1c0VsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBmaXJzdFllYXJDaHVua0VsXG4gKiBAcHJvcGVydHkge0RhdGV9IGNhbGVuZGFyRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBtaW5EYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IG1heERhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gc2VsZWN0ZWREYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHJhbmdlRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBkZWZhdWx0RGF0ZVxuICovXG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCBvZiB0aGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXJcbiAqIEByZXR1cm5zIHtEYXRlUGlja2VyQ29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0RGF0ZVBpY2tlckNvbnRleHQgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1BJQ0tFUik7XG5cbiAgaWYgKCFkYXRlUGlja2VyRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RBVEVfUElDS0VSfWApO1xuICB9XG5cbiAgY29uc3QgaW50ZXJuYWxJbnB1dEVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRcbiAgKTtcbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRcbiAgKTtcbiAgY29uc3QgY2FsZW5kYXJFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKERBVEVfUElDS0VSX0NBTEVOREFSKTtcbiAgY29uc3QgdG9nZ2xlQnRuRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9CVVRUT04pO1xuICBjb25zdCBzdGF0dXNFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKERBVEVfUElDS0VSX1NUQVRVUyk7XG4gIGNvbnN0IGZpcnN0WWVhckNodW5rRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSKTtcblxuICBjb25zdCBpbnB1dERhdGUgPSBwYXJzZURhdGVTdHJpbmcoXG4gICAgZXh0ZXJuYWxJbnB1dEVsLnZhbHVlLFxuICAgIERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQsXG4gICAgdHJ1ZVxuICApO1xuICBjb25zdCBzZWxlY3RlZERhdGUgPSBwYXJzZURhdGVTdHJpbmcoaW50ZXJuYWxJbnB1dEVsLnZhbHVlKTtcblxuICBjb25zdCBjYWxlbmRhckRhdGUgPSBwYXJzZURhdGVTdHJpbmcoY2FsZW5kYXJFbC5kYXRhc2V0LnZhbHVlKTtcbiAgY29uc3QgbWluRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlKTtcbiAgY29uc3QgbWF4RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlKTtcbiAgY29uc3QgcmFuZ2VEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0LnJhbmdlRGF0ZSk7XG4gIGNvbnN0IGRlZmF1bHREYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0LmRlZmF1bHREYXRlKTtcblxuICBpZiAobWluRGF0ZSAmJiBtYXhEYXRlICYmIG1pbkRhdGUgPiBtYXhEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaW11bSBkYXRlIGNhbm5vdCBiZSBhZnRlciBtYXhpbXVtIGRhdGVcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhbGVuZGFyRGF0ZSxcbiAgICBtaW5EYXRlLFxuICAgIHRvZ2dsZUJ0bkVsLFxuICAgIHNlbGVjdGVkRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIGZpcnN0WWVhckNodW5rRWwsXG4gICAgZGF0ZVBpY2tlckVsLFxuICAgIGlucHV0RGF0ZSxcbiAgICBpbnRlcm5hbElucHV0RWwsXG4gICAgZXh0ZXJuYWxJbnB1dEVsLFxuICAgIGNhbGVuZGFyRWwsXG4gICAgcmFuZ2VEYXRlLFxuICAgIGRlZmF1bHREYXRlLFxuICAgIHN0YXR1c0VsLFxuICB9O1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwsIHRvZ2dsZUJ0bkVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgdG9nZ2xlQnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICBleHRlcm5hbElucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5hYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGV4dGVybmFsSW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xufTtcblxuLy8gI3JlZ2lvbiBWYWxpZGF0aW9uXG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGRhdGUgb2YgZm9ybWF0IE0vRC9ZWVlZXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBpc0RhdGVJbnB1dEludmFsaWQgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBkYXRlU3RyaW5nID0gZXh0ZXJuYWxJbnB1dEVsLnZhbHVlO1xuICBsZXQgaXNJbnZhbGlkID0gZmFsc2U7XG5cbiAgaWYgKGRhdGVTdHJpbmcpIHtcbiAgICBpc0ludmFsaWQgPSB0cnVlO1xuXG4gICAgY29uc3QgZGF0ZVN0cmluZ1BhcnRzID0gZGF0ZVN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgY29uc3QgW21vbnRoLCBkYXksIHllYXJdID0gZGF0ZVN0cmluZ1BhcnRzLm1hcCgoc3RyKSA9PiB7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHZhbHVlID0gcGFyc2VkO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgaWYgKG1vbnRoICYmIGRheSAmJiB5ZWFyICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNoZWNrRGF0ZSA9IHNldERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNoZWNrRGF0ZS5nZXRNb250aCgpID09PSBtb250aCAtIDEgJiZcbiAgICAgICAgY2hlY2tEYXRlLmdldERhdGUoKSA9PT0gZGF5ICYmXG4gICAgICAgIGNoZWNrRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmXG4gICAgICAgIGRhdGVTdHJpbmdQYXJ0c1syXS5sZW5ndGggPT09IDQgJiZcbiAgICAgICAgaXNEYXRlV2l0aGluTWluQW5kTWF4KGNoZWNrRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSlcbiAgICAgICkge1xuICAgICAgICBpc0ludmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXNJbnZhbGlkO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgdmFsdWUgaW4gdGhlIGlucHV0IGFzIGEgdmFsaWQgZGF0ZSBvZiBmb3JtYXQgTS9EL1lZWVlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHZhbGlkYXRlRGF0ZUlucHV0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IGlzSW52YWxpZCA9IGlzRGF0ZUlucHV0SW52YWxpZChleHRlcm5hbElucHV0RWwpO1xuXG4gIGlmIChpc0ludmFsaWQgJiYgIWV4dGVybmFsSW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGV4dGVybmFsSW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShWQUxJREFUSU9OX01FU1NBR0UpO1xuICB9XG5cbiAgaWYgKCFpc0ludmFsaWQgJiYgZXh0ZXJuYWxJbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlID09PSBWQUxJREFUSU9OX01FU1NBR0UpIHtcbiAgICBleHRlcm5hbElucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoXCJcIik7XG4gIH1cbn07XG5cbi8vICNlbmRyZWdpb24gVmFsaWRhdGlvblxuXG4vKipcbiAqIEVuYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCByZWNvbmNpbGVJbnB1dFZhbHVlcyA9IChlbCkgPT4ge1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCwgaW5wdXREYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGxldCBuZXdWYWx1ZSA9IFwiXCI7XG5cbiAgaWYgKGlucHV0RGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGVsKSkge1xuICAgIG5ld1ZhbHVlID0gZm9ybWF0RGF0ZShpbnB1dERhdGUpO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW50ZXJuYWxJbnB1dEVsLCBuZXdWYWx1ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IHRoZSB2YWx1ZSBvZiB0aGUgZGF0ZSBwaWNrZXIgaW5wdXRzLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RyaW5nIFRoZSBkYXRlIHN0cmluZyB0byB1cGRhdGUgaW4gWVlZWS1NTS1ERCBmb3JtYXRcbiAqL1xuY29uc3Qgc2V0Q2FsZW5kYXJWYWx1ZSA9IChlbCwgZGF0ZVN0cmluZykgPT4ge1xuICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVTdHJpbmcpO1xuXG4gIGlmIChwYXJzZWREYXRlKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUocGFyc2VkRGF0ZSwgREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCk7XG5cbiAgICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgaW50ZXJuYWxJbnB1dEVsLCBleHRlcm5hbElucHV0RWwgfSA9XG4gICAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW50ZXJuYWxJbnB1dEVsLCBkYXRlU3RyaW5nKTtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoZXh0ZXJuYWxJbnB1dEVsLCBmb3JtYXR0ZWREYXRlKTtcblxuICAgIHZhbGlkYXRlRGF0ZUlucHV0KGRhdGVQaWNrZXJFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogRW5oYW5jZSBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlIHBpY2tlciBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIFRoZSBpbml0aWFsIHdyYXBwaW5nIGVsZW1lbnQgb2YgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBlbmhhbmNlRGF0ZVBpY2tlciA9IChlbCkgPT4ge1xuICBjb25zdCBkYXRlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUElDS0VSKTtcbiAgY29uc3QgeyBkZWZhdWx0VmFsdWUgfSA9IGRhdGVQaWNrZXJFbC5kYXRhc2V0O1xuXG4gIGNvbnN0IGludGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKGBpbnB1dGApO1xuXG4gIGlmICghaW50ZXJuYWxJbnB1dEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0RBVEVfUElDS0VSfSBpcyBtaXNzaW5nIGlubmVyIGlucHV0YCk7XG4gIH1cblxuICBpZiAoaW50ZXJuYWxJbnB1dEVsLnZhbHVlKSB7XG4gICAgaW50ZXJuYWxJbnB1dEVsLnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IG1pbkRhdGUgPSBwYXJzZURhdGVTdHJpbmcoXG4gICAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSB8fCBpbnRlcm5hbElucHV0RWwuZ2V0QXR0cmlidXRlKFwibWluXCIpXG4gICk7XG4gIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlXG4gICAgPyBmb3JtYXREYXRlKG1pbkRhdGUpXG4gICAgOiBERUZBVUxUX01JTl9EQVRFO1xuXG4gIGNvbnN0IG1heERhdGUgPSBwYXJzZURhdGVTdHJpbmcoXG4gICAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSB8fCBpbnRlcm5hbElucHV0RWwuZ2V0QXR0cmlidXRlKFwibWF4XCIpXG4gICk7XG4gIGlmIChtYXhEYXRlKSB7XG4gICAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSA9IGZvcm1hdERhdGUobWF4RGF0ZSk7XG4gIH1cblxuICBjb25zdCBjYWxlbmRhcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjYWxlbmRhcldyYXBwZXIuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9XUkFQUEVSX0NMQVNTKTtcblxuICBjb25zdCBleHRlcm5hbElucHV0RWwgPSBpbnRlcm5hbElucHV0RWwuY2xvbmVOb2RlKCk7XG4gIGV4dGVybmFsSW5wdXRFbC5jbGFzc0xpc3QuYWRkKERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUX0NMQVNTKTtcbiAgZXh0ZXJuYWxJbnB1dEVsLnR5cGUgPSBcInRleHRcIjtcblxuICBjYWxlbmRhcldyYXBwZXIuYXBwZW5kQ2hpbGQoZXh0ZXJuYWxJbnB1dEVsKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1N9XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIGNhbGVuZGFyXCI+Jm5ic3A7PC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cIiR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9XCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCIgaGlkZGVuPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1c2Etc3Itb25seSAke0RBVEVfUElDS0VSX1NUQVRVU19DTEFTU31cIiByb2xlPVwic3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCI+PC9kaXY+YFxuICApO1xuXG4gIGludGVybmFsSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIGludGVybmFsSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBpbnRlcm5hbElucHV0RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBpbnRlcm5hbElucHV0RWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVF9DTEFTUyk7XG4gIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gIGludGVybmFsSW5wdXRFbC5yZXF1aXJlZCA9IGZhbHNlO1xuXG4gIGRhdGVQaWNrZXJFbC5hcHBlbmRDaGlsZChjYWxlbmRhcldyYXBwZXIpO1xuICBkYXRlUGlja2VyRWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9JTklUSUFMSVpFRF9DTEFTUyk7XG5cbiAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgIHNldENhbGVuZGFyVmFsdWUoZGF0ZVBpY2tlckVsLCBkZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC5kaXNhYmxlZCkge1xuICAgIGRpc2FibGUoZGF0ZVBpY2tlckVsKTtcbiAgICBpbnRlcm5hbElucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufTtcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIERhdGUgU2VsZWN0aW9uIFZpZXdcblxuLyoqXG4gKiByZW5kZXIgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGVUb0Rpc3BsYXkgYSBkYXRlIHRvIHJlbmRlciBvbiB0aGUgY2FsZW5kYXJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IHJlbmRlckNhbGVuZGFyID0gKGVsLCBfZGF0ZVRvRGlzcGxheSkgPT4ge1xuICBjb25zdCB7XG4gICAgZGF0ZVBpY2tlckVsLFxuICAgIGNhbGVuZGFyRWwsXG4gICAgc3RhdHVzRWwsXG4gICAgc2VsZWN0ZWREYXRlLFxuICAgIG1heERhdGUsXG4gICAgbWluRGF0ZSxcbiAgICByYW5nZURhdGUsXG4gIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHRvZGF5c0RhdGUgPSB0b2RheSgpO1xuICBsZXQgZGF0ZVRvRGlzcGxheSA9IF9kYXRlVG9EaXNwbGF5IHx8IHRvZGF5c0RhdGU7XG5cbiAgY29uc3QgY2FsZW5kYXJXYXNIaWRkZW4gPSBjYWxlbmRhckVsLmhpZGRlbjtcblxuICBjb25zdCBmb2N1c2VkRGF0ZSA9IGFkZERheXMoZGF0ZVRvRGlzcGxheSwgMCk7XG4gIGNvbnN0IGZvY3VzZWRNb250aCA9IGRhdGVUb0Rpc3BsYXkuZ2V0TW9udGgoKTtcbiAgY29uc3QgZm9jdXNlZFllYXIgPSBkYXRlVG9EaXNwbGF5LmdldEZ1bGxZZWFyKCk7XG5cbiAgY29uc3QgcHJldk1vbnRoID0gc3ViTW9udGhzKGRhdGVUb0Rpc3BsYXksIDEpO1xuICBjb25zdCBuZXh0TW9udGggPSBhZGRNb250aHMoZGF0ZVRvRGlzcGxheSwgMSk7XG5cbiAgY29uc3QgY3VycmVudEZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGRhdGVUb0Rpc3BsYXkpO1xuXG4gIGNvbnN0IGZpcnN0T2ZNb250aCA9IHN0YXJ0T2ZNb250aChkYXRlVG9EaXNwbGF5KTtcbiAgY29uc3QgcHJldkJ1dHRvbnNEaXNhYmxlZCA9IGlzU2FtZU1vbnRoKGRhdGVUb0Rpc3BsYXksIG1pbkRhdGUpO1xuICBjb25zdCBuZXh0QnV0dG9uc0Rpc2FibGVkID0gaXNTYW1lTW9udGgoZGF0ZVRvRGlzcGxheSwgbWF4RGF0ZSk7XG5cbiAgY29uc3QgcmFuZ2VDb25jbHVzaW9uRGF0ZSA9IHNlbGVjdGVkRGF0ZSB8fCBkYXRlVG9EaXNwbGF5O1xuICBjb25zdCByYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRGF0ZSAmJiBtaW4ocmFuZ2VDb25jbHVzaW9uRGF0ZSwgcmFuZ2VEYXRlKTtcbiAgY29uc3QgcmFuZ2VFbmREYXRlID0gcmFuZ2VEYXRlICYmIG1heChyYW5nZUNvbmNsdXNpb25EYXRlLCByYW5nZURhdGUpO1xuXG4gIGNvbnN0IHdpdGhpblJhbmdlU3RhcnREYXRlID0gcmFuZ2VEYXRlICYmIGFkZERheXMocmFuZ2VTdGFydERhdGUsIDEpO1xuICBjb25zdCB3aXRoaW5SYW5nZUVuZERhdGUgPSByYW5nZURhdGUgJiYgc3ViRGF5cyhyYW5nZUVuZERhdGUsIDEpO1xuXG4gIGNvbnN0IG1vbnRoTGFiZWwgPSBNT05USF9MQUJFTFNbZm9jdXNlZE1vbnRoXTtcblxuICBjb25zdCBnZW5lcmF0ZURhdGVIdG1sID0gKGRhdGVUb1JlbmRlcikgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbQ0FMRU5EQVJfREFURV9DTEFTU107XG4gICAgY29uc3QgZGF5ID0gZGF0ZVRvUmVuZGVyLmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IGRhdGVUb1JlbmRlci5nZXRNb250aCgpO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlVG9SZW5kZXIuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlVG9SZW5kZXIuZ2V0RGF5KCk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShkYXRlVG9SZW5kZXIpO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9ICFpc0RhdGVXaXRoaW5NaW5BbmRNYXgoZGF0ZVRvUmVuZGVyLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgc2VsZWN0ZWREYXRlKTtcblxuICAgIGlmIChpc1NhbWVNb250aChkYXRlVG9SZW5kZXIsIHByZXZNb250aCkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1BSRVZJT1VTX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVNb250aChkYXRlVG9SZW5kZXIsIG5leHRNb250aCkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX05FWFRfTU9OVEhfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHRvZGF5c0RhdGUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9UT0RBWV9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKHJhbmdlRGF0ZSkge1xuICAgICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHJhbmdlRGF0ZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZVN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9TVEFSVF9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZUVuZERhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfRU5EX0NMQVNTKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpc0RhdGVXaXRoaW5NaW5BbmRNYXgoXG4gICAgICAgICAgZGF0ZVRvUmVuZGVyLFxuICAgICAgICAgIHdpdGhpblJhbmdlU3RhcnREYXRlLFxuICAgICAgICAgIHdpdGhpblJhbmdlRW5kRGF0ZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgZm9jdXNlZERhdGUpKSB7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9udGhTdHIgPSBNT05USF9MQUJFTFNbbW9udGhdO1xuICAgIGNvbnN0IGRheVN0ciA9IERBWV9PRl9XRUVLX0xBQkVMU1tkYXlPZldlZWtdO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1kYXlcIiwgZGF5KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1tb250aFwiLCBtb250aCArIDEpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXllYXJcIiwgeWVhcik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgZm9ybWF0dGVkRGF0ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcbiAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtkYXl9ICR7bW9udGhTdHJ9ICR7eWVhcn0gJHtkYXlTdHJ9YFxuICAgICk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0gZGF5O1xuXG4gICAgcmV0dXJuIGJ0bjtcbiAgfTtcblxuICAvLyBzZXQgZGF0ZSB0byBmaXJzdCByZW5kZXJlZCBkYXlcbiAgZGF0ZVRvRGlzcGxheSA9IHN0YXJ0T2ZXZWVrKGZpcnN0T2ZNb250aCk7XG5cbiAgY29uc3QgZGF5cyA9IFtdO1xuXG4gIHdoaWxlIChcbiAgICBkYXlzLmxlbmd0aCA8IDI4IHx8XG4gICAgZGF0ZVRvRGlzcGxheS5nZXRNb250aCgpID09PSBmb2N1c2VkTW9udGggfHxcbiAgICBkYXlzLmxlbmd0aCAlIDcgIT09IDBcbiAgKSB7XG4gICAgZGF5cy5wdXNoKGdlbmVyYXRlRGF0ZUh0bWwoZGF0ZVRvRGlzcGxheSkpO1xuICAgIGRhdGVUb0Rpc3BsYXkgPSBhZGREYXlzKGRhdGVUb0Rpc3BsYXksIDEpO1xuICB9XG5cbiAgY29uc3QgZGF0ZXNHcmlkID0gbGlzdFRvR3JpZEh0bWwoZGF5cywgNyk7XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBjYWxlbmRhckVsLmNsb25lTm9kZSgpO1xuICBuZXdDYWxlbmRhci5kYXRhc2V0LnZhbHVlID0gY3VycmVudEZvcm1hdHRlZERhdGU7XG4gIG5ld0NhbGVuZGFyLnN0eWxlLnRvcCA9IGAke2RhdGVQaWNrZXJFbC5vZmZzZXRIZWlnaHR9cHhgO1xuICBuZXdDYWxlbmRhci5oaWRkZW4gPSBmYWxzZTtcbiAgbmV3Q2FsZW5kYXIuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgXG4gICAgPGRpdiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCIke0NBTEVOREFSX0RBVEVfUElDS0VSX0NMQVNTfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfUk9XX0NMQVNTfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0xBU1N9XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyXCJcbiAgICAgICAgICAgICR7cHJldkJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+Jm5ic3A7PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1BSRVZJT1VTX01PTlRIX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgYmFjayBvbmUgbW9udGhcIlxuICAgICAgICAgICAgJHtwcmV2QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID4mbmJzcDs8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfTU9OVEhfTEFCRUxfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCIke21vbnRoTGFiZWx9LiBDbGljayB0byBzZWxlY3QgbW9udGhcIlxuICAgICAgICAgID4ke21vbnRoTGFiZWx9PC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1N9XCIgYXJpYS1sYWJlbD1cIiR7Zm9jdXNlZFllYXJ9LiBDbGljayB0byBzZWxlY3QgeWVhclwiXG4gICAgICAgICAgPiR7Zm9jdXNlZFllYXJ9PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX05FWFRfTU9OVEhfQ0xBU1N9XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aFwiXG4gICAgICAgICAgICAke25leHRCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPiZuYnNwOzwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1N9XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB5ZWFyXCJcbiAgICAgICAgICAgICR7bmV4dEJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+Jm5ic3A7PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcblxuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgdGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfVEFCTEVfQ0xBU1MpO1xuICB0YWJsZS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xuXG4gIGNvbnN0IHRhYmxlSGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKTtcbiAgdGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlSGVhZCk7XG4gIGNvbnN0IHRhYmxlSGVhZFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdGFibGVIZWFkLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZUhlYWRSb3cpO1xuXG4gIGNvbnN0IGRheXNPZldlZWsgPSB7XG4gICAgU3VuZGF5OiBcIlNcIixcbiAgICBNb25kYXk6IFwiTVwiLFxuICAgIFR1ZXNkYXk6IFwiVFwiLFxuICAgIFdlZG5lc2RheTogXCJXXCIsXG4gICAgVGh1cnNkYXk6IFwiVGhcIixcbiAgICBGcmlkYXk6IFwiRnJcIixcbiAgICBTYXR1cmRheTogXCJTXCIsXG4gIH07XG5cbiAgT2JqZWN0LmtleXMoZGF5c09mV2VlaykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdGguc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfREFZX09GX1dFRUtfQ0xBU1MpO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcInNjb3BlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwga2V5KTtcbiAgICB0aC50ZXh0Q29udGVudCA9IGRheXNPZldlZWtba2V5XTtcbiAgICB0YWJsZUhlYWRSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRoKTtcbiAgfSk7XG5cbiAgY29uc3QgdGFibGVCb2R5ID0gY3JlYXRlVGFibGVCb2R5KGRhdGVzR3JpZCk7XG4gIHRhYmxlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZUJvZHkpO1xuXG4gIC8vIENvbnRhaW5lciBmb3IgWWVhcnMsIE1vbnRocywgYW5kIERheXNcbiAgY29uc3QgZGF0ZVBpY2tlckNhbGVuZGFyQ29udGFpbmVyID1cbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcblxuICBkYXRlUGlja2VyQ2FsZW5kYXJDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlKTtcblxuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBkYXRlUGlja2VyRWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9BQ1RJVkVfQ0xBU1MpO1xuXG4gIGNvbnN0IHN0YXR1c2VzID0gW107XG5cbiAgaWYgKGlzU2FtZURheShzZWxlY3RlZERhdGUsIGZvY3VzZWREYXRlKSkge1xuICAgIHN0YXR1c2VzLnB1c2goXCJTZWxlY3RlZCBkYXRlXCIpO1xuICB9XG5cbiAgaWYgKGNhbGVuZGFyV2FzSGlkZGVuKSB7XG4gICAgc3RhdHVzZXMucHVzaChcbiAgICAgIFwiWW91IGNhbiBuYXZpZ2F0ZSBieSBkYXkgdXNpbmcgbGVmdCBhbmQgcmlnaHQgYXJyb3dzXCIsXG4gICAgICBcIldlZWtzIGJ5IHVzaW5nIHVwIGFuZCBkb3duIGFycm93c1wiLFxuICAgICAgXCJNb250aHMgYnkgdXNpbmcgcGFnZSB1cCBhbmQgcGFnZSBkb3duIGtleXNcIixcbiAgICAgIFwiWWVhcnMgYnkgdXNpbmcgc2hpZnQgcGx1cyBwYWdlIHVwIGFuZCBzaGlmdCBwbHVzIHBhZ2UgZG93blwiLFxuICAgICAgXCJIb21lIGFuZCBlbmQga2V5cyBuYXZpZ2F0ZSB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSB3ZWVrXCJcbiAgICApO1xuICAgIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXNlcy5wdXNoKGAke21vbnRoTGFiZWx9ICR7Zm9jdXNlZFllYXJ9YCk7XG4gIH1cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBzdGF0dXNlcy5qb2luKFwiLiBcIik7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNZZWFyID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gc3ViWWVhcnMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX1lFQVIpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNNb250aCA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IHN1Yk1vbnRocyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEgpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dE1vbnRoID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gYWRkTW9udGhzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dFllYXIgPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBhZGRZZWFycyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBIaWRlIHRoZSBjYWxlbmRhciBvZiBhIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhpZGVDYWxlbmRhciA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgY2FsZW5kYXJFbCwgc3RhdHVzRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBkYXRlUGlja2VyRWwuY2xhc3NMaXN0LnJlbW92ZShEQVRFX1BJQ0tFUl9BQ1RJVkVfQ0xBU1MpO1xuICBjYWxlbmRhckVsLmhpZGRlbiA9IHRydWU7XG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgZGF0ZSB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBjYWxlbmRhckRhdGVFbCBBIGRhdGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBzZWxlY3REYXRlID0gKGNhbGVuZGFyRGF0ZUVsKSA9PiB7XG4gIGlmIChjYWxlbmRhckRhdGVFbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBleHRlcm5hbElucHV0RWwgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoY2FsZW5kYXJEYXRlRWwpO1xuXG4gIHNldENhbGVuZGFyVmFsdWUoY2FsZW5kYXJEYXRlRWwsIGNhbGVuZGFyRGF0ZUVsLmRhdGFzZXQudmFsdWUpO1xuICBoaWRlQ2FsZW5kYXIoZGF0ZVBpY2tlckVsKTtcblxuICBleHRlcm5hbElucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHRvZ2dsZUNhbGVuZGFyID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGlucHV0RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSwgZGVmYXVsdERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGlmIChjYWxlbmRhckVsLmhpZGRlbikge1xuICAgIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoXG4gICAgICBpbnB1dERhdGUgfHwgZGVmYXVsdERhdGUgfHwgdG9kYXkoKSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlXG4gICAgKTtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGVUb0Rpc3BsYXkpO1xuICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xuICB9IGVsc2Uge1xuICAgIGhpZGVDYWxlbmRhcihlbCk7XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjYWxlbmRhciB3aGVuIHZpc2libGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKi9cbmNvbnN0IHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IGNhbGVuZGFyU2hvd24gPSAhY2FsZW5kYXJFbC5oaWRkZW47XG5cbiAgaWYgKGNhbGVuZGFyU2hvd24gJiYgaW5wdXREYXRlKSB7XG4gICAgY29uc3QgZGF0ZVRvRGlzcGxheSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICAgIHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGVUb0Rpc3BsYXkpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIC0gRGF0ZSBTZWxlY3Rpb24gVmlld1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIC0gTW9udGggU2VsZWN0aW9uIFZpZXdcbi8qKlxuICogRGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbiBpbiB0aGUgZGF0ZSBwaWNrZXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgZGlzcGxheU1vbnRoU2VsZWN0aW9uID0gKGVsLCBtb250aFRvRGlzcGxheSkgPT4ge1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIHN0YXR1c0VsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdGVkTW9udGggPSBjYWxlbmRhckRhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgZm9jdXNlZE1vbnRoID0gbW9udGhUb0Rpc3BsYXkgPT0gbnVsbCA/IHNlbGVjdGVkTW9udGggOiBtb250aFRvRGlzcGxheTtcblxuICBjb25zdCBtb250aHMgPSBNT05USF9MQUJFTFMubWFwKChtb250aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBtb250aFRvQ2hlY2sgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIGluZGV4KTtcblxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBpc0RhdGVzTW9udGhPdXRzaWRlTWluT3JNYXgoXG4gICAgICBtb250aFRvQ2hlY2ssXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX01PTlRIX0NMQVNTXTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkTW9udGg7XG5cbiAgICBpZiAoaW5kZXggPT09IGZvY3VzZWRNb250aCkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9GT0NVU0VEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX01PTlRIX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbFwiLCBtb250aCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0gbW9udGg7XG5cbiAgICByZXR1cm4gYnRuO1xuICB9KTtcblxuICBjb25zdCBtb250aHNIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbW9udGhzSHRtbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBtb250aHNIdG1sLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTUyk7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgdGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICBjb25zdCBtb250aHNHcmlkID0gbGlzdFRvR3JpZEh0bWwobW9udGhzLCAzKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gY3JlYXRlVGFibGVCb2R5KG1vbnRoc0dyaWQpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVCb2R5KTtcbiAgbW9udGhzSHRtbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGUpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1vbnRoc0h0bWwpO1xuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGEgbW9udGguXCI7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSBtb250aCBpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IG1vbnRoRWwgQW4gbW9udGggZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBzZWxlY3RNb250aCA9IChtb250aEVsKSA9PiB7XG4gIGlmIChtb250aEVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KG1vbnRoRWwpO1xuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZE1vbnRoKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcbiAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIC0gTW9udGggU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLyoqXG4gKiBEaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyVG9EaXNwbGF5IHllYXIgdG8gZGlzcGxheSBpbiB5ZWFyIHNlbGVjdGlvblxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgZGlzcGxheVllYXJTZWxlY3Rpb24gPSAoZWwsIHllYXJUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBzdGF0dXNFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZFllYXIgPSBjYWxlbmRhckRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgZm9jdXNlZFllYXIgPSB5ZWFyVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZFllYXIgOiB5ZWFyVG9EaXNwbGF5O1xuXG4gIGxldCB5ZWFyVG9DaHVuayA9IGZvY3VzZWRZZWFyO1xuICB5ZWFyVG9DaHVuayAtPSB5ZWFyVG9DaHVuayAlIFlFQVJfQ0hVTks7XG4gIHllYXJUb0NodW5rID0gTWF0aC5tYXgoMCwgeWVhclRvQ2h1bmspO1xuXG4gIGNvbnN0IHByZXZZZWFyQ2h1bmtEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFyVG9DaHVuayAtIDEpLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZVxuICApO1xuXG4gIGNvbnN0IG5leHRZZWFyQ2h1bmtEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFyVG9DaHVuayArIFlFQVJfQ0hVTkspLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZVxuICApO1xuXG4gIGNvbnN0IHllYXJzID0gW107XG4gIGxldCB5ZWFySW5kZXggPSB5ZWFyVG9DaHVuaztcbiAgd2hpbGUgKHllYXJzLmxlbmd0aCA8IFlFQVJfQ0hVTkspIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXgoXG4gICAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhckluZGV4KSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlXG4gICAgKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbQ0FMRU5EQVJfWUVBUl9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IHllYXJJbmRleCA9PT0gc2VsZWN0ZWRZZWFyO1xuXG4gICAgaWYgKHllYXJJbmRleCA9PT0gZm9jdXNlZFllYXIpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgeWVhckluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICAgIGlmIChpc0Rpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBidG4udGV4dENvbnRlbnQgPSB5ZWFySW5kZXg7XG5cbiAgICB5ZWFycy5wdXNoKGJ0bik7XG4gICAgeWVhckluZGV4ICs9IDE7XG4gIH1cblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG5cbiAgLy8gY3JlYXRlIHRoZSB5ZWFycyBjYWxlbmRhciB3cmFwcGVyXG4gIGNvbnN0IHllYXJzQ2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgeWVhcnNDYWxlbmRhcldyYXBwZXIuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgeWVhcnNDYWxlbmRhcldyYXBwZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1MpO1xuXG4gIC8vIGNyZWF0ZSB0YWJsZSBwYXJlbnRcbiAgY29uc3QgeWVhcnNUYWJsZVBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgeWVhcnNUYWJsZVBhcmVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xuICB5ZWFyc1RhYmxlUGFyZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcblxuICAvLyBjcmVhdGUgdGFibGUgYm9keSBhbmQgdGFibGUgcm93XG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuXG4gIC8vIGNyZWF0ZSBwcmV2aW91cyBidXR0b25cbiAgY29uc3QgcHJldmlvdXNZZWFyc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgcHJldmlvdXNZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LX0NMQVNTKTtcbiAgcHJldmlvdXNZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgYE5hdmlnYXRlIGJhY2sgJHtZRUFSX0NIVU5LfSB5ZWFyc2BcbiAgKTtcbiAgaWYgKHByZXZZZWFyQ2h1bmtEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgIHByZXZpb3VzWWVhcnNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIHByZXZpb3VzWWVhcnNCdG4uaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJm5ic3BgO1xuXG4gIC8vIGNyZWF0ZSBuZXh0IGJ1dHRvblxuICBjb25zdCBuZXh0WWVhcnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXh0WWVhcnNCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgbmV4dFllYXJzQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTUyk7XG4gIG5leHRZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgYE5hdmlnYXRlIGZvcndhcmQgJHtZRUFSX0NIVU5LfSB5ZWFyc2BcbiAgKTtcbiAgaWYgKG5leHRZZWFyQ2h1bmtEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgIG5leHRZZWFyc0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cbiAgbmV4dFllYXJzQnRuLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCZuYnNwYDtcblxuICAvLyBjcmVhdGUgdGhlIGFjdHVhbCB5ZWFycyB0YWJsZVxuICBjb25zdCB5ZWFyc1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB5ZWFyc1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgeWVhcnNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgY29uc3QgeWVhcnNHcmlkID0gbGlzdFRvR3JpZEh0bWwoeWVhcnMsIDMpO1xuICBjb25zdCB5ZWFyc1RhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keSh5ZWFyc0dyaWQpO1xuXG4gIC8vIGFwcGVuZCB0aGUgZ3JpZCB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgeWVhcnNUYWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZUJvZHkpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgcHJldiBidXR0b24gdGQgYW5kIGFwcGVuZCB0aGUgcHJldiBidXR0b25cbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBwcmV2aW91c1llYXJzQnRuXG4gICk7XG5cbiAgLy8gY3JlYXRlIHRoZSB5ZWFycyB0ZCBhbmQgYXBwZW5kIHRoZSB5ZWFycyBjaGlsZCB0YWJsZVxuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWwuc2V0QXR0cmlidXRlKFwiY29sc3BhblwiLCBcIjNcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc1RhYmxlKTtcblxuICAvLyBjcmVhdGUgdGhlIG5leHQgYnV0dG9uIHRkIGFuZCBhcHBlbmQgdGhlIG5leHQgYnV0dG9uXG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keURldGFpbE5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keURldGFpbE5leHQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG5leHRZZWFyc0J0bik7XG5cbiAgLy8gYXBwZW5kIHRoZSB0aHJlZSB0ZCB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGUgcm93XG4gIHllYXJzSFRNTFRhYmxlQm9keVJvdy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxQcmV2XG4gICk7XG4gIHllYXJzSFRNTFRhYmxlQm9keVJvdy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbFxuICApO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsTmV4dFxuICApO1xuXG4gIC8vIGFwcGVuZCB0aGUgdGFibGUgcm93IHRvIHRoZSB5ZWFycyBjaGlsZCB0YWJsZSBib2R5XG4gIHllYXJzSFRNTFRhYmxlQm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNIVE1MVGFibGVCb2R5Um93KTtcblxuICAvLyBhcHBlbmQgdGhlIHllYXJzIHRhYmxlIGJvZHkgdG8gdGhlIHllYXJzIHBhcmVudCB0YWJsZVxuICB5ZWFyc1RhYmxlUGFyZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc0hUTUxUYWJsZUJvZHkpO1xuXG4gIC8vIGFwcGVuZCB0aGUgcGFyZW50IHRhYmxlIHRvIHRoZSBjYWxlbmRhciB3cmFwcGVyXG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc1RhYmxlUGFyZW50KTtcblxuICAvLyBhcHBlbmQgdGhlIHllYXJzIGNhbGVuZGVyIHRvIHRoZSBuZXcgY2FsZW5kYXJcbiAgbmV3Q2FsZW5kYXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzQ2FsZW5kYXJXcmFwcGVyKTtcblxuICAvLyByZXBsYWNlIGNhbGVuZGFyXG4gIGNhbGVuZGFyRWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Q2FsZW5kYXIsIGNhbGVuZGFyRWwpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgU2hvd2luZyB5ZWFycyAke3llYXJUb0NodW5rfSB0byAke1xuICAgIHllYXJUb0NodW5rICsgWUVBUl9DSFVOSyAtIDFcbiAgfS4gU2VsZWN0IGEgeWVhci5gO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBieSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzWWVhckNodW5rID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeWVhckVsID0gY2FsZW5kYXJFbC5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC50ZXh0Q29udGVudCwgMTApO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBzZWxlY3RlZFllYXIgLSBZRUFSX0NIVU5LO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbihcbiAgICBjYWxlbmRhckVsLFxuICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyk7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBieSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRZZWFyQ2h1bmsgPSAoZWwpID0+IHtcbiAgaWYgKGVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB5ZWFyRWwgPSBjYWxlbmRhckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLnRleHRDb250ZW50LCAxMCk7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IHNlbGVjdGVkWWVhciArIFlFQVJfQ0hVTks7XG4gIGFkanVzdGVkWWVhciA9IE1hdGgubWF4KDAsIGFkanVzdGVkWWVhcik7XG5cbiAgY29uc3QgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZFllYXIpO1xuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgIGNhbGVuZGFyRWwsXG4gICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpXG4gICk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTkspO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhIHllYXIgaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSB5ZWFyRWwgQSB5ZWFyIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0WWVhciA9ICh5ZWFyRWwpID0+IHtcbiAgaWYgKHllYXJFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dCh5ZWFyRWwpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwuaW5uZXJIVE1MLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEhpZGUgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlRnJvbUNhbGVuZGFyID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBleHRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG4gIGV4dGVybmFsSW5wdXRFbC5mb2N1cygpO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRGF0ZSBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgZGF0ZSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdERhdGVGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRqdXN0Q2FsZW5kYXIgPSAoYWRqdXN0RGF0ZUZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KFxuICAgIGV2ZW50LnRhcmdldFxuICApO1xuXG4gIGNvbnN0IGRhdGUgPSBhZGp1c3REYXRlRm4oY2FsZW5kYXJEYXRlKTtcblxuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBpZiAoIWlzU2FtZURheShjYWxlbmRhckRhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBjYXBwZWREYXRlKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVVwRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViV2Vla3MoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGFkZFdlZWtzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBkYXkgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlTGVmdEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1YkRheXMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIGRheSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVSaWdodEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGFkZERheXMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVIb21lRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3RhcnRPZldlZWsoZGF0ZSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRW5kRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gZW5kT2ZXZWVrKGRhdGUpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGFkZE1vbnRocyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViTW9udGhzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVNoaWZ0UGFnZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRZZWFycyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVTaGlmdFBhZ2VVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1YlllYXJzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBkaXNwbGF5IHRoZSBjYWxlbmRhciBmb3IgdGhlIG1vdXNlb3ZlciBkYXRlLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZGF0ZUVsIEEgZGF0ZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlckZyb21EYXRlID0gKGRhdGVFbCkgPT4ge1xuICBpZiAoZGF0ZUVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgY2FsZW5kYXJFbCA9IGRhdGVFbC5jbG9zZXN0KERBVEVfUElDS0VSX0NBTEVOREFSKTtcblxuICBjb25zdCBjdXJyZW50Q2FsZW5kYXJEYXRlID0gY2FsZW5kYXJFbC5kYXRhc2V0LnZhbHVlO1xuICBjb25zdCBob3ZlckRhdGUgPSBkYXRlRWwuZGF0YXNldC52YWx1ZTtcblxuICBpZiAoaG92ZXJEYXRlID09PSBjdXJyZW50Q2FsZW5kYXJEYXRlKSByZXR1cm47XG5cbiAgY29uc3QgZGF0ZVRvRGlzcGxheSA9IHBhcnNlRGF0ZVN0cmluZyhob3ZlckRhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGVUb0Rpc3BsYXkpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgRGF0ZSBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIE1vbnRoIEV2ZW50IEhhbmRsaW5nXG5cbi8qKlxuICogQWRqdXN0IHRoZSBtb250aCBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbiBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWRqdXN0TW9udGhGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIG1vbnRoXG4gKi9cbmNvbnN0IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuID0gKGFkanVzdE1vbnRoRm4pID0+IChldmVudCkgPT4ge1xuICBjb25zdCBtb250aEVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KG1vbnRoRWwpO1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRNb250aCk7XG5cbiAgbGV0IGFkanVzdGVkTW9udGggPSBhZGp1c3RNb250aEZuKHNlbGVjdGVkTW9udGgpO1xuICBhZGp1c3RlZE1vbnRoID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTEsIGFkanVzdGVkTW9udGgpKTtcblxuICBjb25zdCBkYXRlID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZE1vbnRoKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVNb250aChjdXJyZW50RGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlNb250aFNlbGVjdGlvbihcbiAgICAgIGNhbGVuZGFyRWwsXG4gICAgICBjYXBwZWREYXRlLmdldE1vbnRoKClcbiAgICApO1xuICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIHRocmVlIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVVwRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCAtIDMpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgdGhyZWUgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggKyAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUxlZnRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoIC0gMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVSaWdodEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggKyAxKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHJvdyBvZiBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVIb21lRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oXG4gIChtb250aCkgPT4gbW9udGggLSAobW9udGggJSAzKVxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRW5kRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oXG4gIChtb250aCkgPT4gbW9udGggKyAyIC0gKG1vbnRoICUgMylcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGxhc3QgbW9udGggKERlY2VtYmVyKSBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMTEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBmaXJzdCBtb250aCAoSmFudWFyeSkgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigoKSA9PiAwKTtcblxuLyoqXG4gKiB1cGRhdGUgdGhlIGZvY3VzIG9uIGEgbW9udGggd2hlbiB0aGUgbW91c2UgbW92ZXMuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBtb250aEVsIEEgbW9udGggZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVNb3VzZW92ZXJGcm9tTW9udGggPSAobW9udGhFbCkgPT4ge1xuICBpZiAobW9udGhFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBpZiAobW9udGhFbC5jbGFzc0xpc3QuY29udGFpbnMoQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUykpIHJldHVybjtcblxuICBjb25zdCBmb2N1c01vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24obW9udGhFbCwgZm9jdXNNb250aCk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgTW9udGggRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBZZWFyIEV2ZW50IEhhbmRsaW5nXG5cbi8qKlxuICogQWRqdXN0IHRoZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4gaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdFllYXJGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIHllYXJcbiAqL1xuY29uc3QgYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbiA9IChhZGp1c3RZZWFyRm4pID0+IChldmVudCkgPT4ge1xuICBjb25zdCB5ZWFyRWwgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KHllYXJFbCk7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IGFkanVzdFllYXJGbihzZWxlY3RlZFllYXIpO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVZZWFyKGN1cnJlbnREYXRlLCBjYXBwZWREYXRlKSkge1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgICBjYWxlbmRhckVsLFxuICAgICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDMpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgdGhyZWUgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAxKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHJvdyBvZiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSAoeWVhciAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHJvdyBvZiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRW5kRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciArIDIgLSAoeWVhciAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIGJhY2sgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSBZRUFSX0NIVU5LXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciArIFlFQVJfQ0hVTktcbik7XG5cbi8qKlxuICogdXBkYXRlIHRoZSBmb2N1cyBvbiBhIHllYXIgd2hlbiB0aGUgbW91c2UgbW92ZXMuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBkYXRlRWwgQSB5ZWFyIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbVllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgaWYgKHllYXJFbC5jbGFzc0xpc3QuY29udGFpbnMoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTKSkgcmV0dXJuO1xuXG4gIGNvbnN0IGZvY3VzWWVhciA9IHBhcnNlSW50KHllYXJFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbih5ZWFyRWwsIGZvY3VzWWVhcik7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBZZWFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuY29uc3QgdGFiSGFuZGxlciA9IChmb2N1c2FibGUpID0+IHtcbiAgY29uc3QgZ2V0Rm9jdXNhYmxlQ29udGV4dCA9IChlbCkgPT4ge1xuICAgIGNvbnN0IHsgY2FsZW5kYXJFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KGZvY3VzYWJsZSwgY2FsZW5kYXJFbCk7XG5cbiAgICBjb25zdCBmaXJzdFRhYkluZGV4ID0gMDtcbiAgICBjb25zdCBsYXN0VGFiSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZpcnN0VGFiSW5kZXhdO1xuICAgIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbbGFzdFRhYkluZGV4XTtcbiAgICBjb25zdCBmb2N1c0luZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihhY3RpdmVFbGVtZW50KCkpO1xuXG4gICAgY29uc3QgaXNMYXN0VGFiID0gZm9jdXNJbmRleCA9PT0gbGFzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzRmlyc3RUYWIgPSBmb2N1c0luZGV4ID09PSBmaXJzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzTm90Rm91bmQgPSBmb2N1c0luZGV4ID09PSAtMTtcblxuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgIGlzTm90Rm91bmQsXG4gICAgICBmaXJzdFRhYlN0b3AsXG4gICAgICBpc0ZpcnN0VGFiLFxuICAgICAgbGFzdFRhYlN0b3AsXG4gICAgICBpc0xhc3RUYWIsXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHRhYkFoZWFkKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGZpcnN0VGFiU3RvcCwgaXNMYXN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXRcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0xhc3RUYWIgfHwgaXNOb3RGb3VuZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhYkJhY2soZXZlbnQpIHtcbiAgICAgIGNvbnN0IHsgbGFzdFRhYlN0b3AsIGlzRmlyc3RUYWIsIGlzTm90Rm91bmQgfSA9IGdldEZvY3VzYWJsZUNvbnRleHQoXG4gICAgICAgIGV2ZW50LnRhcmdldFxuICAgICAgKTtcblxuICAgICAgaWYgKGlzRmlyc3RUYWIgfHwgaXNOb3RGb3VuZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihEQVRFX1BJQ0tFUl9GT0NVU0FCTEUpO1xuY29uc3QgbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKE1PTlRIX1BJQ0tFUl9GT0NVU0FCTEUpO1xuY29uc3QgeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoWUVBUl9QSUNLRVJfRk9DVVNBQkxFKTtcblxuLy8gI2VuZHJlZ2lvbiBGb2N1cyBIYW5kbGluZyBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIERhdGUgUGlja2VyIEV2ZW50IERlbGVnYXRpb24gUmVnaXN0cmF0aW9uIC8gQ29tcG9uZW50XG5cbmNvbnN0IGRhdGVQaWNrZXJFdmVudHMgPSB7XG4gIFtDTElDS106IHtcbiAgICBbREFURV9QSUNLRVJfQlVUVE9OXSgpIHtcbiAgICAgIHRvZ2dsZUNhbGVuZGFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX0RBVEVdKCkge1xuICAgICAgc2VsZWN0RGF0ZSh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF0oKSB7XG4gICAgICBzZWxlY3RNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ZRUFSXSgpIHtcbiAgICAgIHNlbGVjdFllYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEhdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzTW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9NT05USF0oKSB7XG4gICAgICBkaXNwbGF5TmV4dE1vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX1lFQVJdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzWWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX1lFQVJdKCkge1xuICAgICAgZGlzcGxheU5leHRZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktdKCkge1xuICAgICAgZGlzcGxheVByZXZpb3VzWWVhckNodW5rKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfWUVBUl9DSFVOS10oKSB7XG4gICAgICBkaXNwbGF5TmV4dFllYXJDaHVuayh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05dKCkge1xuICAgICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24odGhpcyk7XG4gICAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05dKCkge1xuICAgICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbih0aGlzKTtcbiAgICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH0sXG4gIH0sXG4gIGtleXVwOiB7XG4gICAgW0RBVEVfUElDS0VSX0NBTEVOREFSXShldmVudCkge1xuICAgICAgY29uc3Qga2V5ZG93biA9IHRoaXMuZGF0YXNldC5rZXlkb3duS2V5Q29kZTtcbiAgICAgIGlmIChgJHtldmVudC5rZXlDb2RlfWAgIT09IGtleWRvd24pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBrZXlkb3duOiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXShldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVOVEVSX0tFWUNPREUpIHtcbiAgICAgICAgdmFsaWRhdGVEYXRlSW5wdXQodGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfREFURV06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tRGF0ZSxcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbURhdGUsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbURhdGUsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tRGF0ZSxcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tRGF0ZSxcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21EYXRlLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbURhdGUsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21EYXRlLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21EYXRlLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tRGF0ZSxcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21EYXRlLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tRGF0ZSxcbiAgICAgIFwiU2hpZnQrUGFnZURvd25cIjogaGFuZGxlU2hpZnRQYWdlRG93bkZyb21EYXRlLFxuICAgICAgXCJTaGlmdCtQYWdlVXBcIjogaGFuZGxlU2hpZnRQYWdlVXBGcm9tRGF0ZSxcbiAgICAgIFRhYjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfREFURV9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9NT05USF06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tTW9udGgsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21Nb250aCxcbiAgICAgIERvd246IGhhbmRsZURvd25Gcm9tTW9udGgsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tTW9udGgsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbU1vbnRoLFxuICAgICAgQXJyb3dMZWZ0OiBoYW5kbGVMZWZ0RnJvbU1vbnRoLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbU1vbnRoLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tTW9udGgsXG4gICAgICBIb21lOiBoYW5kbGVIb21lRnJvbU1vbnRoLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tTW9udGgsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tTW9udGgsXG4gICAgICBQYWdlVXA6IGhhbmRsZVBhZ2VVcEZyb21Nb250aCxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgICBcIlNoaWZ0K1RhYlwiOiBtb250aFBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9ZRUFSXToga2V5bWFwKHtcbiAgICAgIFVwOiBoYW5kbGVVcEZyb21ZZWFyLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tWWVhcixcbiAgICAgIERvd246IGhhbmRsZURvd25Gcm9tWWVhcixcbiAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21ZZWFyLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21ZZWFyLFxuICAgICAgQXJyb3dMZWZ0OiBoYW5kbGVMZWZ0RnJvbVllYXIsXG4gICAgICBSaWdodDogaGFuZGxlUmlnaHRGcm9tWWVhcixcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbVllYXIsXG4gICAgICBIb21lOiBoYW5kbGVIb21lRnJvbVllYXIsXG4gICAgICBFbmQ6IGhhbmRsZUVuZEZyb21ZZWFyLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbVllYXIsXG4gICAgICBQYWdlVXA6IGhhbmRsZVBhZ2VVcEZyb21ZZWFyLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9ZRUFSX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgICBcIlNoaWZ0K1RhYlwiOiB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgfSksXG4gICAgW0RBVEVfUElDS0VSX0NBTEVOREFSXShldmVudCkge1xuICAgICAgdGhpcy5kYXRhc2V0LmtleWRvd25LZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICB9LFxuICAgIFtEQVRFX1BJQ0tFUl0oZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleU1hcCA9IGtleW1hcCh7XG4gICAgICAgIEVzY2FwZTogaGFuZGxlRXNjYXBlRnJvbUNhbGVuZGFyLFxuICAgICAgfSk7XG5cbiAgICAgIGtleU1hcChldmVudCk7XG4gICAgfSxcbiAgfSxcbiAgZm9jdXNvdXQ6IHtcbiAgICBbREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRdKCkge1xuICAgICAgdmFsaWRhdGVEYXRlSW5wdXQodGhpcyk7XG4gICAgfSxcbiAgICBbREFURV9QSUNLRVJdKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgaGlkZUNhbGVuZGFyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGlucHV0OiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXSgpIHtcbiAgICAgIHJlY29uY2lsZUlucHV0VmFsdWVzKHRoaXMpO1xuICAgICAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUodGhpcyk7XG4gICAgfSxcbiAgfSxcbn07XG5cbmlmICghaXNJb3NEZXZpY2UoKSkge1xuICBkYXRlUGlja2VyRXZlbnRzLm1vdXNlb3ZlciA9IHtcbiAgICBbQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21EYXRlKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX01PTlRIXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21Nb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ZRUFSXSgpIHtcbiAgICAgIGhhbmRsZU1vdXNlb3ZlckZyb21ZZWFyKHRoaXMpO1xuICAgIH0sXG4gIH07XG59XG5cbmNvbnN0IGRhdGVQaWNrZXIgPSBiZWhhdmlvcihkYXRlUGlja2VyRXZlbnRzLCB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhEQVRFX1BJQ0tFUiwgcm9vdCkuZm9yRWFjaCgoZGF0ZVBpY2tlckVsKSA9PiB7XG4gICAgICBlbmhhbmNlRGF0ZVBpY2tlcihkYXRlUGlja2VyRWwpO1xuICAgIH0pO1xuICB9LFxuICBnZXREYXRlUGlja2VyQ29udGV4dCxcbiAgZGlzYWJsZSxcbiAgZW5hYmxlLFxuICBpc0RhdGVJbnB1dEludmFsaWQsXG4gIHNldENhbGVuZGFyVmFsdWUsXG4gIHZhbGlkYXRlRGF0ZUlucHV0LFxuICByZW5kZXJDYWxlbmRhcixcbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUsXG59KTtcblxuLy8gI2VuZHJlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVQaWNrZXI7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnXCIpO1xuY29uc3Qge1xuICBnZXREYXRlUGlja2VyQ29udGV4dCxcbiAgaXNEYXRlSW5wdXRJbnZhbGlkLFxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSxcbn0gPSByZXF1aXJlKFwiLi4vdXNhLWRhdGUtcGlja2VyL2RhdGUtcGlja2VyXCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1waWNrZXJgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcmFuZ2UtcGlja2VyYDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUX0NMQVNTID0gYCR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9X19yYW5nZS1zdGFydGA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRfQ0xBU1MgPSBgJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31fX3JhbmdlLWVuZGA7XG5cbmNvbnN0IERBVEVfUElDS0VSID0gYC4ke0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUiA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlQgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORCA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRfQ0xBU1N9YDtcblxuY29uc3QgREVGQVVMVF9NSU5fREFURSA9IFwiMDAwMC0wMS0wMVwiO1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyLlxuICogQHR5cGVkZWYge09iamVjdH0gRGF0ZVJhbmdlUGlja2VyQ29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZGF0ZVJhbmdlUGlja2VyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHJhbmdlU3RhcnRFbFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gcmFuZ2VFbmRFbFxuICovXG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCBvZiB0aGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXJcbiAqIEByZXR1cm5zIHtEYXRlUmFuZ2VQaWNrZXJDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVSYW5nZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1JBTkdFX1BJQ0tFUik7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7REFURV9SQU5HRV9QSUNLRVJ9YCk7XG4gIH1cblxuICBjb25zdCByYW5nZVN0YXJ0RWwgPSBkYXRlUmFuZ2VQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUXG4gICk7XG4gIGNvbnN0IHJhbmdlRW5kRWwgPSBkYXRlUmFuZ2VQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgZGF0ZVJhbmdlUGlja2VyRWwsXG4gICAgcmFuZ2VTdGFydEVsLFxuICAgIHJhbmdlRW5kRWwsXG4gIH07XG59O1xuXG4vKipcbiAqIGhhbmRsZSB1cGRhdGUgZnJvbSByYW5nZSBzdGFydCBkYXRlIHBpY2tlclxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHJhbmdlIHBpY2tlclxuICovXG5jb25zdCBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVJhbmdlUGlja2VyRWwsIHJhbmdlU3RhcnRFbCwgcmFuZ2VFbmRFbCB9ID1cbiAgICBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KHJhbmdlU3RhcnRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSB8fCBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZUVuZEVsKTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlRW5kVXBkYXRlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVJhbmdlUGlja2VyRWwsIHJhbmdlU3RhcnRFbCwgcmFuZ2VFbmRFbCB9ID1cbiAgICBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KHJhbmdlRW5kRWwpO1xuICBjb25zdCB1cGRhdGVkRGF0ZSA9IGludGVybmFsSW5wdXRFbC52YWx1ZTtcblxuICBpZiAodXBkYXRlZERhdGUgJiYgIWlzRGF0ZUlucHV0SW52YWxpZChpbnRlcm5hbElucHV0RWwpKSB7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQubWF4RGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LmRlZmF1bHREYXRlID0gdXBkYXRlZERhdGU7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQubWF4RGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSB8fCBcIlwiO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSBcIlwiO1xuICB9XG5cbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUocmFuZ2VTdGFydEVsKTtcbn07XG5cbi8qKlxuICogRW5oYW5jZSBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlIHBpY2tlciBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIFRoZSBpbml0aWFsIHdyYXBwaW5nIGVsZW1lbnQgb2YgdGhlIGRhdGUgcmFuZ2UgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBlbmhhbmNlRGF0ZVJhbmdlUGlja2VyID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVSYW5nZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1JBTkdFX1BJQ0tFUik7XG5cbiAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHNlbGVjdChEQVRFX1BJQ0tFUiwgZGF0ZVJhbmdlUGlja2VyRWwpO1xuXG4gIGlmICghcmFuZ2VTdGFydCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0RBVEVfUkFOR0VfUElDS0VSfSBpcyBtaXNzaW5nIGlubmVyIHR3byAnJHtEQVRFX1BJQ0tFUn0nIGVsZW1lbnRzYFxuICAgICk7XG4gIH1cblxuICBpZiAoIXJhbmdlRW5kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3Npbmcgc2Vjb25kICcke0RBVEVfUElDS0VSfScgZWxlbWVudGBcbiAgICApO1xuICB9XG5cbiAgcmFuZ2VTdGFydC5jbGFzc0xpc3QuYWRkKERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUX0NMQVNTKTtcbiAgcmFuZ2VFbmQuY2xhc3NMaXN0LmFkZChEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRfQ0xBU1MpO1xuXG4gIGlmICghZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlKSB7XG4gICAgZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlID0gREVGQVVMVF9NSU5fREFURTtcbiAgfVxuXG4gIGNvbnN0IHsgbWluRGF0ZSB9ID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldDtcbiAgcmFuZ2VTdGFydC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlO1xuICByYW5nZUVuZC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlO1xuXG4gIGNvbnN0IHsgbWF4RGF0ZSB9ID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldDtcbiAgaWYgKG1heERhdGUpIHtcbiAgICByYW5nZVN0YXJ0LmRhdGFzZXQubWF4RGF0ZSA9IG1heERhdGU7XG4gICAgcmFuZ2VFbmQuZGF0YXNldC5tYXhEYXRlID0gbWF4RGF0ZTtcbiAgfVxuXG4gIGhhbmRsZVJhbmdlU3RhcnRVcGRhdGUoZGF0ZVJhbmdlUGlja2VyRWwpO1xuICBoYW5kbGVSYW5nZUVuZFVwZGF0ZShkYXRlUmFuZ2VQaWNrZXJFbCk7XG59O1xuXG5jb25zdCBkYXRlUmFuZ2VQaWNrZXIgPSBiZWhhdmlvcihcbiAge1xuICAgIFwiaW5wdXQgY2hhbmdlXCI6IHtcbiAgICAgIFtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF0oKSB7XG4gICAgICAgIGhhbmRsZVJhbmdlU3RhcnRVcGRhdGUodGhpcyk7XG4gICAgICB9LFxuICAgICAgW0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF0oKSB7XG4gICAgICAgIGhhbmRsZVJhbmdlRW5kVXBkYXRlKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoREFURV9SQU5HRV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKGRhdGVSYW5nZVBpY2tlckVsKSA9PiB7XG4gICAgICAgIGVuaGFuY2VEYXRlUmFuZ2VQaWNrZXIoZGF0ZVJhbmdlUGlja2VyRWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlUmFuZ2VQaWNrZXI7XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zYW5pdGl6ZXJcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnXCIpO1xuXG5jb25zdCBEUk9QWk9ORV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dGA7XG5jb25zdCBEUk9QWk9ORSA9IGAuJHtEUk9QWk9ORV9DTEFTU31gO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2lucHV0YDtcbmNvbnN0IFRBUkdFVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fdGFyZ2V0YDtcbmNvbnN0IElOUFVUID0gYC4ke0lOUFVUX0NMQVNTfWA7XG5jb25zdCBCT1hfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2JveGA7XG5jb25zdCBJTlNUUlVDVElPTlNfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2luc3RydWN0aW9uc2A7XG5jb25zdCBQUkVWSUVXX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3YDtcbmNvbnN0IFBSRVZJRVdfSEVBRElOR19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fcHJldmlldy1oZWFkaW5nYDtcbmNvbnN0IERJU0FCTEVEX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0LS1kaXNhYmxlZGA7XG5jb25zdCBDSE9PU0VfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2Nob29zZWA7XG5jb25zdCBBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2FjY2VwdGVkLWZpbGVzLW1lc3NhZ2VgO1xuY29uc3QgRFJBR19URVhUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19kcmFnLXRleHRgO1xuY29uc3QgRFJBR19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dC0tZHJhZ2A7XG5jb25zdCBMT0FESU5HX0NMQVNTID0gXCJpcy1sb2FkaW5nXCI7XG5jb25zdCBISURERU5fQ0xBU1MgPSBcImRpc3BsYXktbm9uZVwiO1xuY29uc3QgSU5WQUxJRF9GSUxFX0NMQVNTID0gXCJoYXMtaW52YWxpZC1maWxlXCI7XG5jb25zdCBHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRSA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fcHJldmlldy1pbWFnZWA7XG5jb25zdCBHRU5FUklDX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLWdlbmVyaWNgO1xuY29uc3QgUERGX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLXBkZmA7XG5jb25zdCBXT1JEX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLXdvcmRgO1xuY29uc3QgVklERU9fUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tdmlkZW9gO1xuY29uc3QgRVhDRUxfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tZXhjZWxgO1xuY29uc3QgU1BBQ0VSX0dJRiA9XG4gIFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3XCI7XG5cbmxldCBUWVBFX0lTX1ZBTElEID0gQm9vbGVhbih0cnVlKTsgLy8gbG9naWMgZ2F0ZSBmb3IgY2hhbmdlIGxpc3RlbmVyXG5cbi8qKlxuICogVGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgZmlsZSBpbnB1dC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZpbGVJbnB1dENvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGRyb3Bab25lRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRFbFxuICovXG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCBvZiB0aGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogZmlsZSBpbnB1dCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBmaWxlIGlucHV0XG4gKiBAcmV0dXJucyB7RmlsZUlucHV0Q29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0RmlsZUlucHV0Q29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBkcm9wWm9uZUVsID0gZWwuY2xvc2VzdChEUk9QWk9ORSk7XG5cbiAgaWYgKCFkcm9wWm9uZUVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEUk9QWk9ORX1gKTtcbiAgfVxuXG4gIGNvbnN0IGlucHV0RWwgPSBkcm9wWm9uZUVsLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuXG4gIHJldHVybiB7XG4gICAgZHJvcFpvbmVFbCxcbiAgICBpbnB1dEVsLFxuICB9O1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZHJvcFpvbmVFbCwgaW5wdXRFbCB9ID0gZ2V0RmlsZUlucHV0Q29udGV4dChlbCk7XG5cbiAgaW5wdXRFbC5kaXNhYmxlZCA9IHRydWU7XG4gIGRyb3Bab25lRWwuY2xhc3NMaXN0LmFkZChESVNBQkxFRF9DTEFTUyk7XG4gIGRyb3Bab25lRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCBcInRydWVcIik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5hYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZHJvcFpvbmVFbCwgaW5wdXRFbCB9ID0gZ2V0RmlsZUlucHV0Q29udGV4dChlbCk7XG5cbiAgaW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBkcm9wWm9uZUVsLmNsYXNzTGlzdC5yZW1vdmUoRElTQUJMRURfQ0xBU1MpO1xuICBkcm9wWm9uZUVsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBzcGVjaWFsIGNoYXJhY3RlcnNcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHJlcGxhY2VzIHNwZWNpZmllZCB2YWx1ZXNcbiAqL1xuY29uc3QgcmVwbGFjZU5hbWUgPSAocykgPT4ge1xuICBjb25zdCBjID0gcy5jaGFyQ29kZUF0KDApO1xuICBpZiAoYyA9PT0gMzIpIHJldHVybiBcIi1cIjtcbiAgaWYgKGMgPj0gNjUgJiYgYyA8PSA5MCkgcmV0dXJuIGBpbWdfJHtzLnRvTG93ZXJDYXNlKCl9YDtcbiAgcmV0dXJuIGBfXyR7KFwiMDAwXCIsIGMudG9TdHJpbmcoMTYpKS5zbGljZSgtNCl9YDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBJRCBuYW1lIGZvciBlYWNoIGZpbGUgdGhhdCBzdHJpcHMgYWxsIGludmFsaWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gbmFtZSBvZiB0aGUgZmlsZSBhZGRlZCB0byBmaWxlIGlucHV0IChzZWFyY2h2YWx1ZSlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHNhbWUgY2hhcmFjdGVycyBhcyB0aGUgbmFtZSB3aXRoIGludmFsaWQgY2hhcnMgcmVtb3ZlZCAobmV3dmFsdWUpXG4gKi9cbmNvbnN0IG1ha2VTYWZlRm9ySUQgPSAobmFtZSkgPT4gbmFtZS5yZXBsYWNlKC9bXmEtejAtOV0vZywgcmVwbGFjZU5hbWUpO1xuXG4vLyBUYWtlcyBhIGdlbmVyYXRlZCBzYWZlIElEIGFuZCBjcmVhdGVzIGEgdW5pcXVlIElELlxuY29uc3QgY3JlYXRlVW5pcXVlSUQgPSAobmFtZSkgPT5cbiAgYCR7bmFtZX0tJHtNYXRoLmZsb29yKERhdGUubm93KCkudG9TdHJpbmcoKSAvIDEwMDApfWA7XG5cbi8qKlxuICogQnVpbGRzIGZ1bGwgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gb3JpZ2luYWwgZmlsZSBpbnB1dCBvbiBwYWdlXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8SFRNTEVsZW1lbnR9IC0gSW5zdHJ1Y3Rpb25zLCB0YXJnZXQgYXJlYSBkaXZcbiAqL1xuY29uc3QgYnVpbGRGaWxlSW5wdXQgPSAoZmlsZUlucHV0RWwpID0+IHtcbiAgY29uc3QgYWNjZXB0c011bHRpcGxlID0gZmlsZUlucHV0RWwuaGFzQXR0cmlidXRlKFwibXVsdGlwbGVcIik7XG4gIGNvbnN0IGZpbGVJbnB1dFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRyb3BUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkaXNhYmxlZCA9IGZpbGVJbnB1dEVsLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICBsZXQgZGVmYXVsdEFyaWFMYWJlbDtcblxuICAvLyBBZGRzIGNsYXNzIG5hbWVzIGFuZCBvdGhlciBhdHRyaWJ1dGVzXG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUoRFJPUFpPTkVfQ0xBU1MpO1xuICBmaWxlSW5wdXRFbC5jbGFzc0xpc3QuYWRkKElOUFVUX0NMQVNTKTtcbiAgZmlsZUlucHV0UGFyZW50LmNsYXNzTGlzdC5hZGQoRFJPUFpPTkVfQ0xBU1MpO1xuICBib3guY2xhc3NMaXN0LmFkZChCT1hfQ0xBU1MpO1xuICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChJTlNUUlVDVElPTlNfQ0xBU1MpO1xuICBpbnN0cnVjdGlvbnMuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5hZGQoVEFSR0VUX0NMQVNTKTtcbiAgLy8gRW5jb3VyYWdlIHNjcmVlbnJlYWRlciB0byByZWFkIG91dCBhcmlhIGNoYW5nZXMgaW1tZWRpYXRlbHkgZm9sbG93aW5nIHVwbG9hZCBzdGF0dXMgY2hhbmdlXG4gIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcblxuICAvLyBBZGRzIGNoaWxkIGVsZW1lbnRzIHRvIHRoZSBET01cbiAgZmlsZUlucHV0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZHJvcFRhcmdldCwgZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaWxlSW5wdXRQYXJlbnQsIGRyb3BUYXJnZXQpO1xuICBkcm9wVGFyZ2V0LmFwcGVuZENoaWxkKGZpbGVJbnB1dEVsKTtcbiAgZmlsZUlucHV0UGFyZW50LmFwcGVuZENoaWxkKGRyb3BUYXJnZXQpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnN0cnVjdGlvbnMsIGZpbGVJbnB1dEVsKTtcbiAgZmlsZUlucHV0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYm94LCBmaWxlSW5wdXRFbCk7XG5cbiAgLy8gRGlzYWJsZWQgc3R5bGluZ1xuICBpZiAoZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGZpbGVJbnB1dEVsKTtcbiAgfVxuXG4gIC8vIFNldHMgaW5zdHJ1Y3Rpb24gdGVzdCBhbmQgYXJpYS1sYWJlbCBiYXNlZCBvbiB3aGV0aGVyIG9yIG5vdCBtdWx0aXBsZSBmaWxlcyBhcmUgYWNjZXB0ZWRcbiAgaWYgKGFjY2VwdHNNdWx0aXBsZSkge1xuICAgIGRlZmF1bHRBcmlhTGFiZWwgPSBcIk5vIGZpbGVzIHNlbGVjdGVkXCI7XG4gICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYDxzcGFuIGNsYXNzPVwiJHtEUkFHX1RFWFRfQ0xBU1N9XCI+RHJhZyBmaWxlcyBoZXJlIG9yIDwvc3Bhbj48c3BhbiBjbGFzcz1cIiR7Q0hPT1NFX0NMQVNTfVwiPmNob29zZSBmcm9tIGZvbGRlcjwvc3Bhbj5gO1xuICAgIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgZGVmYXVsdEFyaWFMYWJlbCk7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWFyaWEtbGFiZWxcIiwgZGVmYXVsdEFyaWFMYWJlbCk7XG4gIH0gZWxzZSB7XG4gICAgZGVmYXVsdEFyaWFMYWJlbCA9IFwiTm8gZmlsZSBzZWxlY3RlZFwiO1xuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGA8c3BhbiBjbGFzcz1cIiR7RFJBR19URVhUX0NMQVNTfVwiPkRyYWcgZmlsZSBoZXJlIG9yIDwvc3Bhbj48c3BhbiBjbGFzcz1cIiR7Q0hPT1NFX0NMQVNTfVwiPmNob29zZSBmcm9tIGZvbGRlcjwvc3Bhbj5gO1xuICAgIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgZGVmYXVsdEFyaWFMYWJlbCk7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWFyaWEtbGFiZWxcIiwgZGVmYXVsdEFyaWFMYWJlbCk7XG4gIH1cblxuICAvLyBJRTExIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGRyb3AgZmlsZXMgb24gZmlsZSBpbnB1dHMsIHNvIHdlJ3ZlIHJlbW92ZWQgdGV4dCB0aGF0IGluZGljYXRlcyB0aGF0XG4gIGlmIChcbiAgICAvcnY6MTEuMC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHxcbiAgICAvRWRnZVxcL1xcZC4vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICkge1xuICAgIGZpbGVJbnB1dFBhcmVudC5xdWVyeVNlbGVjdG9yKGAuJHtEUkFHX1RFWFRfQ0xBU1N9YCkub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJldHVybiB7IGluc3RydWN0aW9ucywgZHJvcFRhcmdldCB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGltYWdlIHByZXZpZXdzLCB3ZSB3YW50IHRvIHN0YXJ0IHdpdGggYSBjbGVhbiBsaXN0IGV2ZXJ5IHRpbWUgZmlsZXMgYXJlIGFkZGVkIHRvIHRoZSBmaWxlIGlucHV0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKi9cbmNvbnN0IHJlbW92ZU9sZFByZXZpZXdzID0gKGRyb3BUYXJnZXQsIGluc3RydWN0aW9ucywgaW5wdXRBcmlhTGFiZWwpID0+IHtcbiAgY29uc3QgZmlsZVByZXZpZXdzID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtQUkVWSUVXX0NMQVNTfWApO1xuICBjb25zdCBmaWxlSW5wdXRFbGVtZW50ID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgY29uc3QgY3VycmVudFByZXZpZXdIZWFkaW5nID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKFxuICAgIGAuJHtQUkVWSUVXX0hFQURJTkdfQ0xBU1N9YFxuICApO1xuICBjb25zdCBjdXJyZW50RXJyb3JNZXNzYWdlID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKFxuICAgIGAuJHtBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1N9YFxuICApO1xuXG4gIC8qKlxuICAgKiBmaW5kcyB0aGUgcGFyZW50IG9mIHRoZSBwYXNzZWQgbm9kZSBhbmQgcmVtb3ZlcyB0aGUgY2hpbGRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgKi9cbiAgY29uc3QgcmVtb3ZlSW1hZ2VzID0gKG5vZGUpID0+IHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gIH07XG5cbiAgLy8gUmVtb3ZlIHRoZSBoZWFkaW5nIGFib3ZlIHRoZSBwcmV2aWV3c1xuICBpZiAoY3VycmVudFByZXZpZXdIZWFkaW5nKSB7XG4gICAgY3VycmVudFByZXZpZXdIZWFkaW5nLm91dGVySFRNTCA9IFwiXCI7XG4gIH1cblxuICAvLyBSZW1vdmUgZXhpc3RpbmcgZXJyb3IgbWVzc2FnZXNcbiAgaWYgKGN1cnJlbnRFcnJvck1lc3NhZ2UpIHtcbiAgICBjdXJyZW50RXJyb3JNZXNzYWdlLm91dGVySFRNTCA9IFwiXCI7XG4gICAgZHJvcFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKElOVkFMSURfRklMRV9DTEFTUyk7XG4gIH1cblxuICAvLyBHZXQgcmlkIG9mIGV4aXN0aW5nIHByZXZpZXdzIGlmIHRoZXkgZXhpc3QsIHNob3cgaW5zdHJ1Y3Rpb25zXG4gIGlmIChmaWxlUHJldmlld3MgIT09IG51bGwpIHtcbiAgICBpZiAoaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShISURERU5fQ0xBU1MpO1xuICAgIH1cbiAgICBmaWxlSW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaW5wdXRBcmlhTGFiZWwpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZmlsZVByZXZpZXdzLCByZW1vdmVJbWFnZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIFdoZW4gbmV3IGZpbGVzIGFyZSBhcHBsaWVkIHRvIGZpbGUgaW5wdXQsIHRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHByZXZpZXdzXG4gKiBhbmQgcmVtb3ZlcyBvbGQgb25lcy5cbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gZmlsZSBpbnB1dCBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSB0ZXh0IHRvIGluZm9ybSB1c2VycyB0byBkcmFnIG9yIHNlbGVjdCBmaWxlc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZHJvcFRhcmdldCAtIHRhcmdldCBhcmVhIGRpdiB0aGF0IGVuY2FzZXMgdGhlIGlucHV0XG4gKi9cblxuY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpID0+IHtcbiAgY29uc3QgZmlsZU5hbWVzID0gZS50YXJnZXQuZmlsZXM7XG4gIGNvbnN0IGZpbGVQcmV2aWV3c0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBpbnB1dEFyaWFMYWJlbCA9IGZpbGVJbnB1dEVsLmRhdGFzZXQuZGVmYXVsdEFyaWFMYWJlbDtcbiAgY29uc3QgZmlsZVN0b3JlID0gW107XG5cbiAgLy8gRmlyc3QsIGdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3NcbiAgcmVtb3ZlT2xkUHJldmlld3MoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zLCBpbnB1dEFyaWFMYWJlbCk7XG5cbiAgLy8gVGhlbiwgaXRlcmF0ZSB0aHJvdWdoIGZpbGVzIGxpc3QgYW5kOlxuICAvLyAxLiBBZGQgc2VsZWN0ZWQgZmlsZSBsaXN0IG5hbWVzIHRvIGFyaWEtbGFiZWxcbiAgLy8gMi4gQ3JlYXRlIHByZXZpZXdzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZU5hbWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVOYW1lc1tpXS5uYW1lO1xuXG4gICAgLy8gUHVzaCB1cGRhdGVkIGZpbGUgbmFtZXMgaW50byB0aGUgc3RvcmUgYXJyYXlcbiAgICBmaWxlU3RvcmUucHVzaChmaWxlTmFtZSk7XG5cbiAgICAvLyByZWFkIG91dCB0aGUgc3RvcmUgYXJyYXkgdmlhIGFyaWEtbGFiZWwsIHdvcmRpbmcgb3B0aW9ucyB2YXJ5IGJhc2VkIG9uIGZpbGUgY291bnRcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgICAgYFlvdSBoYXZlIHNlbGVjdGVkIHRoZSBmaWxlOiAke2ZpbGVOYW1lfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpID49IDEpIHtcbiAgICAgIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgICAgIGBZb3UgaGF2ZSBzZWxlY3RlZCAke2ZpbGVOYW1lcy5sZW5ndGh9IGZpbGVzOiAke2ZpbGVTdG9yZS5qb2luKFwiLCBcIil9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydHMgd2l0aCBhIGxvYWRpbmcgaW1hZ2Ugd2hpbGUgcHJldmlldyBpcyBjcmVhdGVkXG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24gY3JlYXRlTG9hZGluZ0ltYWdlKCkge1xuICAgICAgY29uc3QgaW1hZ2VJZCA9IGNyZWF0ZVVuaXF1ZUlEKG1ha2VTYWZlRm9ySUQoZmlsZU5hbWUpKTtcblxuICAgICAgaW5zdHJ1Y3Rpb25zLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgXCJhZnRlcmVuZFwiLFxuICAgICAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGA8ZGl2IGNsYXNzPVwiJHtQUkVWSUVXX0NMQVNTfVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxpbWcgaWQ9XCIke2ltYWdlSWR9XCIgc3JjPVwiJHtTUEFDRVJfR0lGfVwiIGFsdD1cIlwiIGNsYXNzPVwiJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0gJHtMT0FESU5HX0NMQVNTfVwiLz4ke2ZpbGVOYW1lfVxuICAgICAgICA8ZGl2PmBcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBhbGwgZmlsZXMgd2lsbCBiZSBhYmxlIHRvIGdlbmVyYXRlIHByZXZpZXdzLiBJbiBjYXNlIHRoaXMgaGFwcGVucywgd2UgcHJvdmlkZSBzZXZlcmFsIHR5cGVzIFwiZ2VuZXJpYyBwcmV2aWV3c1wiIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbi5cbiAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gY3JlYXRlRmlsZVByZXZpZXcoKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gY3JlYXRlVW5pcXVlSUQobWFrZVNhZmVGb3JJRChmaWxlTmFtZSkpO1xuICAgICAgY29uc3QgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW1hZ2VJZCk7XG4gICAgICBpZiAoZmlsZU5hbWUuaW5kZXhPZihcIi5wZGZcIikgPiAwKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJvbmVycm9yXCIsXG4gICAgICAgICAgYHRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPVwiJHtTUEFDRVJfR0lGfVwiOyB0aGlzLmNsYXNzTGlzdC5hZGQoXCIke1BERl9QUkVWSUVXX0NMQVNTfVwiKWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIuZG9jXCIpID4gMCB8fFxuICAgICAgICBmaWxlTmFtZS5pbmRleE9mKFwiLnBhZ2VzXCIpID4gMFxuICAgICAgKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJvbmVycm9yXCIsXG4gICAgICAgICAgYHRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPVwiJHtTUEFDRVJfR0lGfVwiOyB0aGlzLmNsYXNzTGlzdC5hZGQoXCIke1dPUkRfUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaWxlTmFtZS5pbmRleE9mKFwiLnhsc1wiKSA+IDAgfHxcbiAgICAgICAgZmlsZU5hbWUuaW5kZXhPZihcIi5udW1iZXJzXCIpID4gMFxuICAgICAgKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJvbmVycm9yXCIsXG4gICAgICAgICAgYHRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPVwiJHtTUEFDRVJfR0lGfVwiOyB0aGlzLmNsYXNzTGlzdC5hZGQoXCIke0VYQ0VMX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmRleE9mKFwiLm1vdlwiKSA+IDAgfHwgZmlsZU5hbWUuaW5kZXhPZihcIi5tcDRcIikgPiAwKSB7XG4gICAgICAgIHByZXZpZXdJbWFnZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgXCJvbmVycm9yXCIsXG4gICAgICAgICAgYHRoaXMub25lcnJvcj1udWxsO3RoaXMuc3JjPVwiJHtTUEFDRVJfR0lGfVwiOyB0aGlzLmNsYXNzTGlzdC5hZGQoXCIke1ZJREVPX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7R0VORVJJQ19QUkVWSUVXX0NMQVNTfVwiKWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlcyBsb2FkZXIgYW5kIGRpc3BsYXlzIHByZXZpZXdcbiAgICAgIHByZXZpZXdJbWFnZS5jbGFzc0xpc3QucmVtb3ZlKExPQURJTkdfQ0xBU1MpO1xuICAgICAgcHJldmlld0ltYWdlLnNyYyA9IHJlYWRlci5yZXN1bHQ7XG4gICAgfTtcblxuICAgIGlmIChmaWxlTmFtZXNbaV0pIHtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVOYW1lc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBoZWFkaW5nIGFib3ZlIGZpbGUgcHJldmlld3MsIHBsdXJhbGl6ZXMgaWYgdGhlcmUgYXJlIG11bHRpcGxlXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGZpbGVQcmV2aWV3c0hlYWRpbmcsIGluc3RydWN0aW9ucyk7XG4gICAgICBmaWxlUHJldmlld3NIZWFkaW5nLmlubmVySFRNTCA9IGBTZWxlY3RlZCBmaWxlIDxzcGFuIGNsYXNzPVwidXNhLWZpbGUtaW5wdXRfX2Nob29zZVwiPkNoYW5nZSBmaWxlPC9zcGFuPmA7XG4gICAgfSBlbHNlIGlmIChpID49IDEpIHtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGZpbGVQcmV2aWV3c0hlYWRpbmcsIGluc3RydWN0aW9ucyk7XG4gICAgICBmaWxlUHJldmlld3NIZWFkaW5nLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgICAgIGkgKyAxXG4gICAgICB9IGZpbGVzIHNlbGVjdGVkIDxzcGFuIGNsYXNzPVwidXNhLWZpbGUtaW5wdXRfX2Nob29zZVwiPkNoYW5nZSBmaWxlczwvc3Bhbj5gO1xuICAgIH1cblxuICAgIC8vIEhpZGVzIG51bGwgc3RhdGUgY29udGVudCBhbmQgc2V0cyBwcmV2aWV3IGhlYWRpbmcgY2xhc3NcbiAgICBpZiAoZmlsZVByZXZpZXdzSGVhZGluZykge1xuICAgICAgaW5zdHJ1Y3Rpb25zLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuY2xhc3NMaXN0LmFkZChQUkVWSUVXX0hFQURJTkdfQ0xBU1MpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBXaGVuIHVzaW5nIGFuIEFjY2VwdCBhdHRyaWJ1dGUsIGludmFsaWQgZmlsZXMgd2lsbCBiZSBoaWRkZW4gZnJvbVxuICogZmlsZSBicm93c2VyLCBidXQgdGhleSBjYW4gc3RpbGwgYmUgZHJhZ2dlZCB0byB0aGUgaW5wdXQuIFRoaXNcbiAqIGZ1bmN0aW9uIHByZXZlbnRzIHRoZW0gZnJvbSBiZWluZyBkcmFnZ2VkIGFuZCByZW1vdmVzIGVycm9yIHN0YXRlc1xuICogd2hlbiBjb3JyZWN0IGZpbGVzIGFyZSBhZGRlZC5cbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gZmlsZSBpbnB1dCBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSB0ZXh0IHRvIGluZm9ybSB1c2VycyB0byBkcmFnIG9yIHNlbGVjdCBmaWxlc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZHJvcFRhcmdldCAtIHRhcmdldCBhcmVhIGRpdiB0aGF0IGVuY2FzZXMgdGhlIGlucHV0XG4gKi9cbmNvbnN0IHByZXZlbnRJbnZhbGlkRmlsZXMgPSAoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBjb25zdCBhY2NlcHRlZEZpbGVzQXR0ciA9IGZpbGVJbnB1dEVsLmdldEF0dHJpYnV0ZShcImFjY2VwdFwiKTtcbiAgZHJvcFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKElOVkFMSURfRklMRV9DTEFTUyk7XG5cbiAgLyoqXG4gICAqIFdlIGNhbiBwcm9iYWJseSBtb3ZlIGF3YXkgZnJvbSB0aGlzIG9uY2UgSUUxMSBzdXBwb3J0IHN0b3BzLCBhbmQgcmVwbGFjZVxuICAgKiB3aXRoIGEgc2ltcGxlIGVzIGAuaW5jbHVkZXNgXG4gICAqIGNoZWNrIGlmIGVsZW1lbnQgaXMgaW4gYXJyYXlcbiAgICogY2hlY2sgaWYgMSBvciBtb3JlIGFscGhhYmV0cyBhcmUgaW4gc3RyaW5nXG4gICAqIGlmIGVsZW1lbnQgaXMgcHJlc2VudCByZXR1cm4gdGhlIHBvc2l0aW9uIHZhbHVlIGFuZCAtMSBvdGhlcndpc2VcbiAgICogQHBhcmFtIHtPYmplY3R9IGZpbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgY29uc3QgaXNJbmNsdWRlZCA9IChmaWxlLCB2YWx1ZSkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGNvbnN0IHBvcyA9IGZpbGUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKHBvcyA+PSAwKSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICAvLyBSdW5zIGlmIG9ubHkgc3BlY2lmaWMgZmlsZXMgYXJlIGFjY2VwdGVkXG4gIGlmIChhY2NlcHRlZEZpbGVzQXR0cikge1xuICAgIGNvbnN0IGFjY2VwdGVkRmlsZXMgPSBhY2NlcHRlZEZpbGVzQXR0ci5zcGxpdChcIixcIik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIC8vIElmIG11bHRpcGxlIGZpbGVzIGFyZSBkcmFnZ2VkLCB0aGlzIGl0ZXJhdGVzIHRocm91Z2ggdGhlbSBhbmQgbG9vayBmb3IgYW55IGZpbGVzIHRoYXQgYXJlIG5vdCBhY2NlcHRlZC5cbiAgICBsZXQgYWxsRmlsZXNBbGxvd2VkID0gdHJ1ZTtcbiAgICBjb25zdCBzY2FubmVkRmlsZXMgPSBlLnRhcmdldC5maWxlcyB8fCBlLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYW5uZWRGaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZmlsZSA9IHNjYW5uZWRGaWxlc1tpXTtcbiAgICAgIGlmIChhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhY2NlcHRlZEZpbGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgY29uc3QgZmlsZVR5cGUgPSBhY2NlcHRlZEZpbGVzW2pdO1xuICAgICAgICAgIGFsbEZpbGVzQWxsb3dlZCA9XG4gICAgICAgICAgICBmaWxlLm5hbWUuaW5kZXhPZihmaWxlVHlwZSkgPiAwIHx8XG4gICAgICAgICAgICBpc0luY2x1ZGVkKGZpbGUudHlwZSwgZmlsZVR5cGUucmVwbGFjZSgvXFwqL2csIFwiXCIpKTtcbiAgICAgICAgICBpZiAoYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICAgICAgICBUWVBFX0lTX1ZBTElEID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIElmIGRyYWdnZWQgZmlsZXMgYXJlIG5vdCBhY2NlcHRlZCwgdGhpcyByZW1vdmVzIHRoZW0gZnJvbSB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGFuZCBjcmVhdGVzIGFuZCBlcnJvciBzdGF0ZVxuICAgIGlmICghYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMpO1xuICAgICAgZmlsZUlucHV0RWwudmFsdWUgPSBcIlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBkcm9wVGFyZ2V0Lmluc2VydEJlZm9yZShlcnJvck1lc3NhZ2UsIGZpbGVJbnB1dEVsKTtcbiAgICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9XG4gICAgICAgIGZpbGVJbnB1dEVsLmRhdGFzZXQuZXJyb3JtZXNzYWdlIHx8IGBUaGlzIGlzIG5vdCBhIHZhbGlkIGZpbGUgdHlwZS5gO1xuICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoQUNDRVBURURfRklMRV9NRVNTQUdFX0NMQVNTKTtcbiAgICAgIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChJTlZBTElEX0ZJTEVfQ0xBU1MpO1xuICAgICAgVFlQRV9JU19WQUxJRCA9IGZhbHNlO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogMS4gcGFzc2VzIHRocm91Z2ggZ2F0ZSBmb3IgcHJldmVudGluZyBpbnZhbGlkIGZpbGVzXG4gKiAyLiBoYW5kbGVzIHVwZGF0ZXMgaWYgZmlsZSBpcyB2YWxpZFxuICogQHBhcmFtIHtldmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9uc0VsXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqL1xuY29uc3QgaGFuZGxlVXBsb2FkID0gKGV2ZW50LCBlbGVtZW50LCBpbnN0cnVjdGlvbnNFbCwgZHJvcFRhcmdldEVsKSA9PiB7XG4gIHByZXZlbnRJbnZhbGlkRmlsZXMoZXZlbnQsIGVsZW1lbnQsIGluc3RydWN0aW9uc0VsLCBkcm9wVGFyZ2V0RWwpO1xuICBpZiAoVFlQRV9JU19WQUxJRCA9PT0gdHJ1ZSkge1xuICAgIGhhbmRsZUNoYW5nZShldmVudCwgZWxlbWVudCwgaW5zdHJ1Y3Rpb25zRWwsIGRyb3BUYXJnZXRFbCk7XG4gIH1cbn07XG5cbmNvbnN0IGZpbGVJbnB1dCA9IGJlaGF2aW9yKFxuICB7fSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKERST1BaT05FLCByb290KS5mb3JFYWNoKChmaWxlSW5wdXRFbCkgPT4ge1xuICAgICAgICBjb25zdCB7IGluc3RydWN0aW9ucywgZHJvcFRhcmdldCB9ID0gYnVpbGRGaWxlSW5wdXQoZmlsZUlucHV0RWwpO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyYWdvdmVyXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoRFJBR19DTEFTUyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyYWdsZWF2ZVwiLFxuICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJvcFwiLFxuICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZURyb3AoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoRFJBR19DTEFTUyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuXG4gICAgICAgIGZpbGVJbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJjaGFuZ2VcIixcbiAgICAgICAgICAoZSkgPT4gaGFuZGxlVXBsb2FkKGUsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhJTlBVVCwgcm9vdCkuZm9yRWFjaCgoZmlsZUlucHV0RWwpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0VG9wRWxlbWVudCA9IGZpbGVJbnB1dEVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgZmlsZUlucHV0VG9wRWxlbWVudC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmaWxlSW5wdXRFbCwgZmlsZUlucHV0VG9wRWxlbWVudCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBmaWxlSW5wdXRFbC5jbGFzc05hbWUgPSBEUk9QWk9ORV9DTEFTUztcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0RmlsZUlucHV0Q29udGV4dCxcbiAgICBkaXNhYmxlLFxuICAgIGVuYWJsZSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlSW5wdXQ7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3RcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcblxuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcbmNvbnN0IFNDT1BFID0gYC4ke1BSRUZJWH0tZm9vdGVyLS1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyX19wcmltYXJ5LWxpbmtgO1xuY29uc3QgQ09MTEFQU0lCTEUgPSBgLiR7UFJFRklYfS1mb290ZXJfX3ByaW1hcnktY29udGVudC0tY29sbGFwc2libGVgO1xuXG5jb25zdCBISURFX01BWF9XSURUSCA9IDQ4MDtcblxuZnVuY3Rpb24gc2hvd1BhbmVsKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCkge1xuICAgIGNvbnN0IGNvbGxhcHNlRWwgPSB0aGlzLmNsb3Nlc3QoQ09MTEFQU0lCTEUpO1xuICAgIGNvbGxhcHNlRWwuY2xhc3NMaXN0LnRvZ2dsZShISURERU4pO1xuXG4gICAgLy8gTkI6IHRoaXMgKnNob3VsZCogYWx3YXlzIHN1Y2NlZWQgYmVjYXVzZSB0aGUgYnV0dG9uXG4gICAgLy8gc2VsZWN0b3IgaXMgc2NvcGVkIHRvIFwiLntwcmVmaXh9LWZvb3Rlci1iaWcgbmF2XCJcbiAgICBjb25zdCBjb2xsYXBzaWJsZUVscyA9IHNlbGVjdChDT0xMQVBTSUJMRSwgY29sbGFwc2VFbC5jbG9zZXN0KE5BVikpO1xuXG4gICAgY29sbGFwc2libGVFbHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGlmIChlbCAhPT0gY29sbGFwc2VFbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhJRERFTik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgdG9nZ2xlSGlkZGVuID0gKGlzSGlkZGVuKSA9PlxuICBzZWxlY3QoQ09MTEFQU0lCTEUpLmZvckVhY2goKGxpc3QpID0+XG4gICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKEhJRERFTiwgaXNIaWRkZW4pXG4gICk7XG5cbmNvbnN0IHJlc2l6ZSA9IChldmVudCkgPT4gdG9nZ2xlSGlkZGVuKGV2ZW50Lm1hdGNoZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl06IHNob3dQYW5lbCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgLy8gZXhwb3J0IGZvciB1c2UgZWxzZXdoZXJlXG4gICAgSElERV9NQVhfV0lEVEgsXG5cbiAgICBpbml0KCkge1xuICAgICAgdG9nZ2xlSGlkZGVuKHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEgpO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdCA9IHdpbmRvdy5tYXRjaE1lZGlhKFxuICAgICAgICBgKG1heC13aWR0aDogJHtISURFX01BWF9XSURUSH1weClgXG4gICAgICApO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihyZXNpemUpO1xuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIHRoaXMubWVkaWFRdWVyeUxpc3QucmVtb3ZlTGlzdGVuZXIocmVzaXplKTtcbiAgICB9LFxuICB9XG4pO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi9ldmVudHNcIik7XG5cbmNvbnN0IENPTlRBSU5FUiA9IGAuJHtQUkVGSVh9LWlucHV0LWdyb3VwYDtcbmNvbnN0IElOUFVUID0gYCR7Q09OVEFJTkVSfSAuJHtQUkVGSVh9LWlucHV0YDtcbmNvbnN0IERFQ09SQVRJT04gPSBgJHtDT05UQUlORVJ9IC4ke1BSRUZJWH0taW5wdXQtcHJlZml4LCAke0NPTlRBSU5FUn0gLiR7UFJFRklYfS1pbnB1dC1zdWZmaXhgO1xuY29uc3QgRk9DVVNfQ0xBU1MgPSBcImlzLWZvY3VzZWRcIjtcblxuZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgZWwuY2xvc2VzdChDT05UQUlORVIpLnF1ZXJ5U2VsZWN0b3IoYC4ke1BSRUZJWH0taW5wdXRgKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgdGhpcy5jbG9zZXN0KENPTlRBSU5FUikuY2xhc3NMaXN0LmFkZChGT0NVU19DTEFTUyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gIHRoaXMuY2xvc2VzdChDT05UQUlORVIpLmNsYXNzTGlzdC5yZW1vdmUoRk9DVVNfQ0xBU1MpO1xufVxuXG5jb25zdCBpbnB1dFByZWZpeFN1ZmZpeCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0RFQ09SQVRJT05dKCkge1xuICAgICAgICBzZXRGb2N1cyh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KElOUFVULCByb290KS5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhbmRsZUZvY3VzLCBmYWxzZSk7XG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1ciwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dFByZWZpeFN1ZmZpeDtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IEZvY3VzVHJhcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9mb2N1cy10cmFwXCIpO1xuY29uc3QgU2Nyb2xsQmFyV2lkdGggPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2Nyb2xsYmFyLXdpZHRoXCIpO1xuXG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnXCIpO1xuXG5jb25zdCBNT0RBTF9DTEFTU05BTUUgPSBgJHtQUkVGSVh9LW1vZGFsYDtcbmNvbnN0IE9WRVJMQVlfQ0xBU1NOQU1FID0gYCR7TU9EQUxfQ0xBU1NOQU1FfS1vdmVybGF5YDtcbmNvbnN0IFdSQVBQRVJfQ0xBU1NOQU1FID0gYCR7TU9EQUxfQ0xBU1NOQU1FfS13cmFwcGVyYDtcbmNvbnN0IE9QRU5FUl9BVFRSSUJVVEUgPSBcImRhdGEtb3Blbi1tb2RhbFwiO1xuY29uc3QgQ0xPU0VSX0FUVFJJQlVURSA9IFwiZGF0YS1jbG9zZS1tb2RhbFwiO1xuY29uc3QgRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSA9IFwiZGF0YS1mb3JjZS1hY3Rpb25cIjtcbmNvbnN0IE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFID0gYGRhdGEtbW9kYWwtaGlkZGVuYDtcbmNvbnN0IE1PREFMID0gYC4ke01PREFMX0NMQVNTTkFNRX1gO1xuY29uc3QgSU5JVElBTF9GT0NVUyA9IGAuJHtXUkFQUEVSX0NMQVNTTkFNRX0gKltkYXRhLWZvY3VzXWA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgJHtXUkFQUEVSX0NMQVNTTkFNRX0gKlske0NMT1NFUl9BVFRSSUJVVEV9XWA7XG5jb25zdCBPUEVORVJTID0gYCpbJHtPUEVORVJfQVRUUklCVVRFfV1bYXJpYS1jb250cm9sc11gO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke09WRVJMQVlfQ0xBU1NOQU1FfTpub3QoWyR7Rk9SQ0VfQUNUSU9OX0FUVFJJQlVURX1dKWA7XG5jb25zdCBOT05fTU9EQUxTID0gYGJvZHkgPiAqOm5vdCguJHtXUkFQUEVSX0NMQVNTTkFNRX0pOm5vdChbYXJpYS1oaWRkZW5dKWA7XG5jb25zdCBOT05fTU9EQUxTX0hJRERFTiA9IGBbJHtOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURX1dYDtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gXCJ1c2EtanMtbW9kYWwtLWFjdGl2ZVwiO1xuY29uc3QgUFJFVkVOVF9DTElDS19DTEFTUyA9IFwidXNhLWpzLW5vLWNsaWNrXCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5jb25zdCBISURERU5fQ0xBU1MgPSBcImlzLWhpZGRlblwiO1xuXG5sZXQgbW9kYWw7XG5cbmNvbnN0IGlzQWN0aXZlID0gKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcbmNvbnN0IFNDUk9MTEJBUl9XSURUSCA9IFNjcm9sbEJhcldpZHRoKCk7XG5jb25zdCBJTklUSUFMX1BBRERJTkcgPSB3aW5kb3dcbiAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuY29uc3QgVEVNUE9SQVJZX1BBRERJTkcgPSBgJHtcbiAgcGFyc2VJbnQoSU5JVElBTF9QQURESU5HLnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKSArXG4gIHBhcnNlSW50KFNDUk9MTEJBUl9XSURUSC5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMClcbn1weGA7XG5cbi8qKlxuICogIElzIGJvdW5kIHRvIGVzY2FwZSBrZXksIGNsb3NlcyBtb2RhbCB3aGVuXG4gKi9cbmNvbnN0IG9uTWVudUNsb3NlID0gKCkgPT4ge1xuICBtb2RhbC50b2dnbGVNb2RhbC5jYWxsKG1vZGFsLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqICBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgYSBtb2RhbCB3aW5kb3dcbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gc2FmZUFjdGl2ZSBpZiBtb2JpbGUgaXMgb3BlblxuICovXG5mdW5jdGlvbiB0b2dnbGVNb2RhbChldmVudCkge1xuICBsZXQgb3JpZ2luYWxPcGVuZXI7XG4gIGxldCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9ICFpc0FjdGl2ZSgpO1xuICBjb25zdCBtb2RhbElkID0gY2xpY2tlZEVsZW1lbnRcbiAgICA/IGNsaWNrZWRFbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIilcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNhLW1vZGFsLXdyYXBwZXIuaXMtdmlzaWJsZVwiKTtcbiAgY29uc3QgdGFyZ2V0TW9kYWwgPSBzYWZlQWN0aXZlXG4gICAgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2EtbW9kYWwtd3JhcHBlci5pcy12aXNpYmxlXCIpO1xuXG4gIC8vIGlmIHRoZXJlIGlzIG5vIG1vZGFsIHdlIHJldHVybiBlYXJseVxuICBpZiAoIXRhcmdldE1vZGFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgb3BlbkZvY3VzRWwgPSB0YXJnZXRNb2RhbC5xdWVyeVNlbGVjdG9yKElOSVRJQUxfRk9DVVMpXG4gICAgPyB0YXJnZXRNb2RhbC5xdWVyeVNlbGVjdG9yKElOSVRJQUxfRk9DVVMpXG4gICAgOiB0YXJnZXRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiLnVzYS1tb2RhbFwiKTtcbiAgY29uc3QgcmV0dXJuRm9jdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0YXJnZXRNb2RhbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wZW5lclwiKVxuICApO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuICBjb25zdCBmb3JjZVVzZXJBY3Rpb24gPSB0YXJnZXRNb2RhbC5nZXRBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSk7XG5cbiAgLy8gU2V0cyB0aGUgY2xpY2tlZCBlbGVtZW50IHRvIHRoZSBjbG9zZSBidXR0b25cbiAgLy8gc28gZXNjIGtleSBhbHdheXMgY2xvc2VzIG1vZGFsXG4gIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIiAmJiB0YXJnZXRNb2RhbCAhPT0gbnVsbCkge1xuICAgIGNsaWNrZWRFbGVtZW50ID0gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICB9XG5cbiAgLy8gV2hlbiB3ZSdyZSBub3QgaGl0dGluZyB0aGUgZXNjYXBlIGtleeKAplxuICBpZiAoY2xpY2tlZEVsZW1lbnQpIHtcbiAgICAvLyBNYWtlIHN1cmUgd2UgY2xpY2sgdGhlIG9wZW5lclxuICAgIC8vIElmIGl0IGRvZXNuJ3QgaGF2ZSBhbiBJRCwgbWFrZSBvbmVcbiAgICAvLyBTdG9yZSBpZCBhcyBkYXRhIGF0dHJpYnV0ZSBvbiBtb2RhbFxuICAgIGlmIChjbGlja2VkRWxlbWVudC5oYXNBdHRyaWJ1dGUoT1BFTkVSX0FUVFJJQlVURSkpIHtcbiAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBudWxsKSB7XG4gICAgICAgIG9yaWdpbmFsT3BlbmVyID0gYG1vZGFsLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwMH1gO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImlkXCIsIG9yaWdpbmFsT3BlbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWdpbmFsT3BlbmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgIH1cbiAgICAgIHRhcmdldE1vZGFsLnNldEF0dHJpYnV0ZShcImRhdGEtb3BlbmVyXCIsIG9yaWdpbmFsT3BlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGJhc2ljYWxseSBzdG9wcyB0aGUgcHJvcGFnYXRpb24gaWYgdGhlIGVsZW1lbnRcbiAgICAvLyBpcyBpbnNpZGUgdGhlIG1vZGFsIGFuZCBub3QgYSBjbG9zZSBidXR0b24gb3JcbiAgICAvLyBlbGVtZW50IGluc2lkZSBhIGNsb3NlIGJ1dHRvblxuICAgIGlmIChjbGlja2VkRWxlbWVudC5jbG9zZXN0KGAuJHtNT0RBTF9DTEFTU05BTUV9YCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2xpY2tlZEVsZW1lbnQuaGFzQXR0cmlidXRlKENMT1NFUl9BVFRSSUJVVEUpIHx8XG4gICAgICAgIGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoYFske0NMT1NFUl9BVFRSSUJVVEV9XWApXG4gICAgICApIHtcbiAgICAgICAgLy8gZG8gbm90aGluZy4gbW92ZSBvbi5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoSElEREVOX0NMQVNTLCAhc2FmZUFjdGl2ZSk7XG5cbiAgLy8gSWYgdXNlciBpcyBmb3JjZWQgdG8gdGFrZSBhbiBhY3Rpb24sIGFkZGluZ1xuICAvLyBhIGNsYXNzIHRvIHRoZSBib2R5IHRoYXQgcHJldmVudHMgY2xpY2tpbmcgdW5kZXJuZWF0aFxuICAvLyBvdmVybGF5XG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoUFJFVkVOVF9DTElDS19DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIH1cblxuICAvLyBBY2NvdW50IGZvciBjb250ZW50IHNoaWZ0aW5nIGZyb20gYm9keSBvdmVyZmxvdzogaGlkZGVuXG4gIC8vIFdlIG9ubHkgY2hlY2sgcGFkZGluZ1JpZ2h0IGluIGNhc2UgYXBwcyBhcmUgYWRkaW5nIG90aGVyIHByb3BlcnRpZXNcbiAgLy8gdG8gdGhlIGJvZHkgZWxlbWVudFxuICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPT09IFRFTVBPUkFSWV9QQURESU5HXG4gICAgICA/IElOSVRJQUxfUEFERElOR1xuICAgICAgOiBURU1QT1JBUllfUEFERElORztcblxuICAvLyBIYW5kbGUgdGhlIGZvY3VzIGFjdGlvbnNcbiAgaWYgKHNhZmVBY3RpdmUgJiYgb3BlbkZvY3VzRWwpIHtcbiAgICAvLyBUaGUgbW9kYWwgd2luZG93IGlzIG9wZW5lZC4gRm9jdXMgaXMgc2V0IHRvIGNsb3NlIGJ1dHRvbi5cblxuICAgIC8vIEJpbmRzIGVzY2FwZSBrZXkgaWYgd2UncmUgbm90IGZvcmNpbmdcbiAgICAvLyB0aGUgdXNlciB0byB0YWtlIGFuIGFjdGlvblxuICAgIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCwge1xuICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlcyBmb2N1cyBzZXR0aW5nIGFuZCBpbnRlcmFjdGlvbnNcbiAgICBtb2RhbC5mb2N1c1RyYXAudXBkYXRlKHNhZmVBY3RpdmUpO1xuICAgIG9wZW5Gb2N1c0VsLmZvY3VzKCk7XG5cbiAgICAvLyBIaWRlcyBldmVyeXRoaW5nIHRoYXQgaXMgbm90IHRoZSBtb2RhbCBmcm9tIHNjcmVlbiByZWFkZXJzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTU9EQUxTKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFLCBcIlwiKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghc2FmZUFjdGl2ZSAmJiBtZW51QnV0dG9uICYmIHJldHVybkZvY3VzKSB7XG4gICAgLy8gVGhlIG1vZGFsIHdpbmRvdyBpcyBjbG9zZWQuXG4gICAgLy8gTm9uLW1vZGFscyBub3cgYWNjZXNpYmxlIHRvIHNjcmVlbiByZWFkZXJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9NT0RBTFNfSElEREVOKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG4gICAgICBub25Nb2RhbC5yZW1vdmVBdHRyaWJ1dGUoTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUpO1xuICAgIH0pO1xuXG4gICAgLy8gRm9jdXMgaXMgcmV0dXJuZWQgdG8gdGhlIG9wZW5lclxuICAgIHJldHVybkZvY3VzLmZvY3VzKCk7XG4gICAgbW9kYWwuZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlQWN0aXZlO1xufVxuXG4vKipcbiAqICBCdWlsZHMgbW9kYWwgd2luZG93IGZyb20gYmFzZSBIVE1MXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYmFzZUNvbXBvbmVudCB0aGUgbW9kYWwgaHRtbCBpbiB0aGUgRE9NXG4gKi9cbmNvbnN0IHNldFVwTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBvdmVybGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbW9kYWxJRCA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IGFyaWFMYWJlbGxlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGNvbnN0IGFyaWFEZXNjcmliZWRCeSA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gYmFzZUNvbXBvbmVudC5oYXNBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSlcbiAgICA/IGJhc2VDb21wb25lbnQuaGFzQXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUpXG4gICAgOiBmYWxzZTtcbiAgLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIHdoZXJlIG1vZGFsIGlzIGZvciBjbGVhbnVwXG4gIGNvbnN0IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoYGRhdGEtcGxhY2Vob2xkZXItZm9yYCwgbW9kYWxJRCk7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgZm9yIChsZXQgYXR0cmlidXRlSW5kZXggPSAwOyBhdHRyaWJ1dGVJbmRleCA8IG1vZGFsQ29udGVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgYXR0cmlidXRlSW5kZXggKz0gMSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1vZGFsQ29udGVudC5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XTtcbiAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc2V0QXR0cmlidXRlKGBkYXRhLW9yaWdpbmFsLSR7YXR0cmlidXRlLm5hbWV9YCwgYXR0cmlidXRlLnZhbHVlKTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudC5hZnRlcihvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIpO1xuXG4gIC8vIFJlYnVpbGQgdGhlIG1vZGFsIGVsZW1lbnRcbiAgbW9kYWxDb250ZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG1vZGFsV3JhcHBlciwgbW9kYWxDb250ZW50KTtcbiAgbW9kYWxXcmFwcGVyLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gIG1vZGFsQ29udGVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvdmVybGF5RGl2LCBtb2RhbENvbnRlbnQpO1xuICBvdmVybGF5RGl2LmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG5cbiAgLy8gQWRkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcbiAgbW9kYWxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgbW9kYWxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoV1JBUFBFUl9DTEFTU05BTUUpO1xuICBvdmVybGF5RGl2LmNsYXNzTGlzdC5hZGQoT1ZFUkxBWV9DTEFTU05BTUUpO1xuXG4gIC8vIFNldCBhdHRyaWJ1dGVzXG4gIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xuICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgbW9kYWxJRCk7XG5cbiAgaWYgKGFyaWFMYWJlbGxlZEJ5KSB7XG4gICAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiLCBhcmlhTGFiZWxsZWRCeSk7XG4gIH1cblxuICBpZiAoYXJpYURlc2NyaWJlZEJ5KSB7XG4gICAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgYXJpYURlc2NyaWJlZEJ5KTtcbiAgfVxuXG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUsIFwidHJ1ZVwiKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgYmFzZSBlbGVtZW50IEhUTUxcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgYmFzZUNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuXG4gIC8vIEFkZCBhcmlhLWNvbnRyb2xzXG4gIGNvbnN0IG1vZGFsQ2xvc2VycyA9IG1vZGFsV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKENMT1NFUlMpO1xuICBtb2RhbENsb3NlcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1vZGFsSUQpO1xuICB9KTtcblxuICAvLyBNb3ZlIGFsbCBtb2RhbHMgdG8gdGhlIGVuZCBvZiB0aGUgRE9NLiBEb2luZyB0aGlzIGFsbG93cyB1cyB0b1xuICAvLyBtb3JlIGVhc2lseSBmaW5kIHRoZSBlbGVtZW50cyB0byBoaWRlIGZyb20gc2NyZWVuIHJlYWRlcnNcbiAgLy8gd2hlbiB0aGUgbW9kYWwgaXMgb3Blbi5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbFdyYXBwZXIpO1xufTtcblxuY29uc3QgY2xlYW5VcE1vZGFsID0gKGJhc2VDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbW9kYWxDb250ZW50ID0gYmFzZUNvbXBvbmVudDtcbiAgY29uc3QgbW9kYWxXcmFwcGVyID0gbW9kYWxDb250ZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgY29uc3QgbW9kYWxJRCA9IG1vZGFsV3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcblxuICBjb25zdCBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGFjZWhvbGRlci1mb3I9XCIke21vZGFsSUR9XCJdYCk7XG4gIGlmKG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcilcbiAge1xuICAgIGZvciAobGV0IGF0dHJpYnV0ZUluZGV4ID0gMDsgYXR0cmlidXRlSW5kZXggPCBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuYXR0cmlidXRlcy5sZW5ndGg7IGF0dHJpYnV0ZUluZGV4ICs9IDEpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XTtcbiAgICAgIGlmKGF0dHJpYnV0ZS5uYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtb3JpZ2luYWwtJykpXG4gICAgICB7XG4gICAgICAgIC8vIGRhdGEtb3JpZ2luYWwtIGlzIDE0IGxvbmdcbiAgICAgICAgbW9kYWxDb250ZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZS5zdWJzdHIoMTQpLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hZnRlcihtb2RhbENvbnRlbnQpO1xuICAgIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcik7XG4gIH1cblxuICBtb2RhbFdyYXBwZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChtb2RhbFdyYXBwZXIpO1xufTtcblxubW9kYWwgPSB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhNT0RBTCwgcm9vdCkuZm9yRWFjaCgobW9kYWxXaW5kb3cpID0+IHtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSBtb2RhbFdpbmRvdy5pZDtcbiAgICAgIHNldFVwTW9kYWwobW9kYWxXaW5kb3cpO1xuXG4gICAgICAvLyB0aGlzIHdpbGwgcXVlcnkgYWxsIG9wZW5lcnMgYW5kIGNsb3NlcnMgaW5jbHVkaW5nIHRoZSBvdmVybGF5XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbYXJpYS1jb250cm9scz1cIiR7bW9kYWxJZH1cIl1gKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIC8vIFR1cm4gYW5jaG9yIGxpbmtzIGludG8gYnV0dG9ucyBiZWNhdXNlIG9mXG4gICAgICAgIC8vIFZvaWNlT3ZlciBvbiBTYWZhcmlcbiAgICAgICAgaWYgKGl0ZW0ubm9kZU5hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FuIHVuY29tbWVudCB3aGVuIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIiBpcyBzdXBwb3J0ZWRcbiAgICAgICAgLy8gaHR0cHM6Ly9hMTF5c3VwcG9ydC5pby90ZWNoL2FyaWEvYXJpYS1oYXNwb3B1cF9hdHRyaWJ1dGVcbiAgICAgICAgLy8gTW9zdCBzY3JlZW4gcmVhZGVycyBzdXBwb3J0IGFyaWEtaGFzcG9wdXAsIGJ1dCBtaWdodCBhbm5vdW5jZVxuICAgICAgICAvLyBhcyBvcGVuaW5nIGEgbWVudSBpZiBcImRpYWxvZ1wiIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgIC8vIGl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1oYXNwb3B1cFwiLCBcImRpYWxvZ1wiKTtcblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgdGVhcmRvd24ocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhNT0RBTCwgcm9vdCkuZm9yRWFjaCgobW9kYWxXaW5kb3cpID0+IHtcbiAgICAgIGNsZWFuVXBNb2RhbChtb2RhbFdpbmRvdyk7XG4gICAgICBjb25zdCBtb2RhbElkID0gbW9kYWxXaW5kb3cuaWQ7XG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWApXG4gICAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCkpO1xuICAgIH0pO1xuICB9LFxuICBmb2N1c1RyYXA6IG51bGwsXG4gIHRvZ2dsZU1vZGFsLFxuICBvbihyb290KSB7XG4gICAgdGhpcy5pbml0KHJvb3QpO1xuICB9LFxuICBvZmYocm9vdCkge1xuICAgIHRoaXMudGVhcmRvd24ocm9vdCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kYWw7XG4iLCJjb25zdCBpZ25vcmUgPSByZXF1aXJlKFwicmVjZXB0b3IvaWdub3JlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuXG5jb25zdCBCVVRUT04gPSBcIi5qcy1zZWFyY2gtYnV0dG9uXCI7XG5jb25zdCBGT1JNID0gXCIuanMtc2VhcmNoLWZvcm1cIjtcbmNvbnN0IElOUFVUID0gXCJbdHlwZT1zZWFyY2hdXCI7XG5jb25zdCBDT05URVhUID0gXCJoZWFkZXJcIjsgLy8gWFhYXG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBnZXRGb3JtID0gKGJ1dHRvbikgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYnV0dG9uLmNsb3Nlc3QoQ09OVEVYVCk7XG4gIHJldHVybiBjb250ZXh0ID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihGT1JNKTtcbn07XG5cbmNvbnN0IHRvZ2dsZVNlYXJjaCA9IChidXR0b24sIGFjdGl2ZSkgPT4ge1xuICBjb25zdCBmb3JtID0gZ2V0Rm9ybShidXR0b24pO1xuXG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5oaWRkZW4gPSAhYWN0aXZlO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgaWYgKCFhY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihJTlBVVCk7XG5cbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuICAvLyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBfb3V0c2lkZV8gb2YgdGhlIGZvcm0gdy9pZ25vcmUoKTogaGlkZSB0aGVcbiAgLy8gc2VhcmNoLCB0aGVuIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgKCkgPT4ge1xuICAgIGlmIChsYXN0QnV0dG9uKSB7XG4gICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgLy8gTm9ybWFsbHkgd2Ugd291bGQganVzdCBydW4gdGhpcyBjb2RlIHdpdGhvdXQgYSB0aW1lb3V0LCBidXRcbiAgLy8gSUUxMSBhbmQgRWRnZSB3aWxsIGFjdHVhbGx5IGNhbGwgdGhlIGxpc3RlbmVyICppbW1lZGlhdGVseSogYmVjYXVzZVxuICAvLyB0aGV5IGFyZSBjdXJyZW50bHkgaGFuZGxpbmcgdGhpcyBleGFjdCB0eXBlIG9mIGV2ZW50LCBzbyB3ZSdsbFxuICAvLyBtYWtlIHN1cmUgdGhlIGJyb3dzZXIgaXMgZG9uZSBoYW5kbGluZyB0aGUgY3VycmVudCBjbGljayBldmVudCxcbiAgLy8gaWYgYW55LCBiZWZvcmUgd2UgYXR0YWNoIHRoZSBsaXN0ZW5lci5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0sIDApO1xufTtcblxuZnVuY3Rpb24gc2hvd1NlYXJjaCgpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIHRydWUpO1xuICBsYXN0QnV0dG9uID0gdGhpcztcbn1cblxuZnVuY3Rpb24gaGlkZVNlYXJjaCgpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIGZhbHNlKTtcbiAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbn1cblxuY29uc3Qgc2VhcmNoID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1NlYXJjaCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdCh0YXJnZXQpIHtcbiAgICAgIHNlbGVjdChCVVRUT04sIHRhcmdldCkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIHRvZ2dsZVNlYXJjaChidXR0b24sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICAvLyBmb3JnZXQgdGhlIGxhc3QgYnV0dG9uIGNsaWNrZWRcbiAgICAgIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZWFyY2g7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IEZvY3VzVHJhcCA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9mb2N1cy10cmFwXCIpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZShcIi4uL3VzYS1hY2NvcmRpb24vYWNjb3JkaW9uXCIpO1xuY29uc3QgU2Nyb2xsQmFyV2lkdGggPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2Nyb2xsYmFyLXdpZHRoXCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcblxuY29uc3QgQk9EWSA9IFwiYm9keVwiO1xuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH0taGVhZGVyYDtcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LW5hdl9fcHJpbWFyeWA7XG5jb25zdCBOQVZfUFJJTUFSWV9JVEVNID0gYC4ke1BSRUZJWH0tbmF2X19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTkFWX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1uYXZfX2xpbmtgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSA9IGBkYXRhLW5hdi1oaWRkZW5gO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdl9fY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBUT0dHTEVTID0gW05BViwgT1ZFUkxBWV0uam9pbihcIiwgXCIpO1xuY29uc3QgTk9OX05BVl9FTEVNRU5UUyA9IGBib2R5ID4gKjpub3QoJHtIRUFERVJ9KTpub3QoW2FyaWEtaGlkZGVuXSlgO1xuY29uc3QgTk9OX05BVl9ISURERU4gPSBgWyR7Tk9OX05BVl9ISURERU5fQVRUUklCVVRFfV1gO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBcInVzYS1qcy1tb2JpbGUtbmF2LS1hY3RpdmVcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcblxubGV0IG5hdmlnYXRpb247XG5sZXQgbmF2QWN0aXZlO1xubGV0IG5vbk5hdkVsZW1lbnRzO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG5jb25zdCBTQ1JPTExCQVJfV0lEVEggPSBTY3JvbGxCYXJXaWR0aCgpO1xuY29uc3QgSU5JVElBTF9QQURESU5HID0gd2luZG93XG4gIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gIC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbmNvbnN0IFRFTVBPUkFSWV9QQURESU5HID0gYCR7XG4gIHBhcnNlSW50KElOSVRJQUxfUEFERElORy5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMCkgK1xuICBwYXJzZUludChTQ1JPTExCQVJfV0lEVEgucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApXG59cHhgO1xuXG5jb25zdCBoaWRlTm9uTmF2SXRlbXMgPSAoKSA9PiB7XG4gIG5vbk5hdkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTkFWX0VMRU1FTlRTKTtcblxuICBub25OYXZFbGVtZW50cy5mb3JFYWNoKChub25OYXZFbGVtZW50KSA9PiB7XG4gICAgbm9uTmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgICBub25OYXZFbGVtZW50LnNldEF0dHJpYnV0ZShOT05fTkFWX0hJRERFTl9BVFRSSUJVVEUsIFwiXCIpO1xuICB9KTtcbn07XG5cbmNvbnN0IHNob3dOb25OYXZJdGVtcyA9ICgpID0+IHtcbiAgbm9uTmF2RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9OQVZfSElEREVOKTtcblxuICBpZiAoIW5vbk5hdkVsZW1lbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGFyaWEtaGlkZGVuIGZyb20gbm9uLWhlYWRlciBlbGVtZW50c1xuICBub25OYXZFbGVtZW50cy5mb3JFYWNoKChub25OYXZFbGVtZW50KSA9PiB7XG4gICAgbm9uTmF2RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcbiAgICBub25OYXZFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShOT05fTkFWX0hJRERFTl9BVFRSSUJVVEUpO1xuICB9KTtcbn07XG5cbi8vIFRvZ2dsZSBhbGwgbm9uLWhlYWRlciBlbGVtZW50cyAjMzUyNy5cbmNvbnN0IHRvZ2dsZU5vbk5hdkl0ZW1zID0gKGFjdGl2ZSkgPT4ge1xuICBpZiAoYWN0aXZlKSB7XG4gICAgaGlkZU5vbk5hdkl0ZW1zKCk7XG4gIH0gZWxzZSB7XG4gICAgc2hvd05vbk5hdkl0ZW1zKCk7XG4gIH1cbn07XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IChhY3RpdmUpID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9IHR5cGVvZiBhY3RpdmUgPT09IFwiYm9vbGVhblwiID8gYWN0aXZlIDogIWlzQWN0aXZlKCk7XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG5cbiAgc2VsZWN0KFRPR0dMRVMpLmZvckVhY2goKGVsKSA9PlxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSlcbiAgKTtcblxuICBuYXZpZ2F0aW9uLmZvY3VzVHJhcC51cGRhdGUoc2FmZUFjdGl2ZSk7XG5cbiAgY29uc3QgY2xvc2VCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG5cbiAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxuICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID09PSBURU1QT1JBUllfUEFERElOR1xuICAgICAgPyBJTklUSUFMX1BBRERJTkdcbiAgICAgIDogVEVNUE9SQVJZX1BBRERJTkc7XG5cbiAgdG9nZ2xlTm9uTmF2SXRlbXMoc2FmZUFjdGl2ZSk7XG5cbiAgaWYgKHNhZmVBY3RpdmUgJiYgY2xvc2VCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBhY3RpdmF0ZWQuIEZvY3VzIG9uIHRoZSBjbG9zZSBidXR0b24sIHdoaWNoIGlzXG4gICAgLy8ganVzdCBiZWZvcmUgYWxsIHRoZSBuYXYgZWxlbWVudHMgaW4gdGhlIHRhYiBvcmRlci5cbiAgICBjbG9zZUJ1dHRvbi5mb2N1cygpO1xuICB9IGVsc2UgaWYgKFxuICAgICFzYWZlQWN0aXZlICYmXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gY2xvc2VCdXR0b24gJiZcbiAgICBtZW51QnV0dG9uXG4gICkge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGRlYWN0aXZhdGVkLCBhbmQgZm9jdXMgd2FzIG9uIHRoZSBjbG9zZVxuICAgIC8vIGJ1dHRvbiwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZpc2libGUuIFdlIGRvbid0IHdhbnQgdGhlIGZvY3VzIHRvXG4gICAgLy8gZGlzYXBwZWFyIGludG8gdGhlIHZvaWQsIHNvIGZvY3VzIG9uIHRoZSBtZW51IGJ1dHRvbiBpZiBpdCdzXG4gICAgLy8gdmlzaWJsZSAodGhpcyBtYXkgaGF2ZSBiZWVuIHdoYXQgdGhlIHVzZXIgd2FzIGp1c3QgZm9jdXNlZCBvbixcbiAgICAvLyBpZiB0aGV5IHRyaWdnZXJlZCB0aGUgbW9iaWxlIG5hdiBieSBtaXN0YWtlKS5cbiAgICBtZW51QnV0dG9uLmZvY3VzKCk7XG4gIH1cblxuICByZXR1cm4gc2FmZUFjdGl2ZTtcbn07XG5cbmNvbnN0IHJlc2l6ZSA9ICgpID0+IHtcbiAgY29uc3QgY2xvc2VyID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG5cbiAgaWYgKGlzQWN0aXZlKCkgJiYgY2xvc2VyICYmIGNsb3Nlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA9PT0gMCkge1xuICAgIC8vIFdoZW4gdGhlIG1vYmlsZSBuYXYgaXMgYWN0aXZlLCBhbmQgdGhlIGNsb3NlIGJveCBpc24ndCB2aXNpYmxlLFxuICAgIC8vIHdlIGtub3cgdGhlIHVzZXIncyB2aWV3cG9ydCBoYXMgYmVlbiByZXNpemVkIHRvIGJlIGxhcmdlci5cbiAgICAvLyBMZXQncyBtYWtlIHRoZSBwYWdlIHN0YXRlIGNvbnNpc3RlbnQgYnkgZGVhY3RpdmF0aW5nIHRoZSBtb2JpbGUgbmF2LlxuICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwoY2xvc2VyLCBmYWxzZSk7XG4gIH1cbn07XG5cbmNvbnN0IG9uTWVudUNsb3NlID0gKCkgPT4gbmF2aWdhdGlvbi50b2dnbGVOYXYuY2FsbChuYXZpZ2F0aW9uLCBmYWxzZSk7XG5cbmNvbnN0IGhpZGVBY3RpdmVOYXZEcm9wZG93biA9ICgpID0+IHtcbiAgaWYgKCFuYXZBY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGUobmF2QWN0aXZlLCBmYWxzZSk7XG4gIG5hdkFjdGl2ZSA9IG51bGw7XG59O1xuXG5jb25zdCBmb2N1c05hdkJ1dHRvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwYXJlbnROYXZJdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTkFWX1BSSU1BUllfSVRFTSk7XG5cbiAgLy8gT25seSBzaGlmdCBmb2N1cyBpZiB3aXRoaW4gZHJvcGRvd25cbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhOQVZfQ09OVFJPTCkpIHtcbiAgICBwYXJlbnROYXZJdGVtLnF1ZXJ5U2VsZWN0b3IoTkFWX0NPTlRST0wpLmZvY3VzKCk7XG4gIH1cbn07XG5cbmNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudCkgPT4ge1xuICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgZm9jdXNOYXZCdXR0b24oZXZlbnQpO1xufTtcblxubmF2aWdhdGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW05BVl9DT05UUk9MXSgpIHtcbiAgICAgICAgLy8gSWYgYW5vdGhlciBuYXYgaXMgb3BlbiwgY2xvc2UgaXRcbiAgICAgICAgaWYgKG5hdkFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IGNsaWNrZWQgbmF2IGxpbmsgZWxlbWVudCwgc28gd2VcbiAgICAgICAgLy8gY2FuIGhpZGUgdGhlIGRyb3Bkb3duIGlmIGFub3RoZXIgZWxlbWVudCBvbiB0aGUgcGFnZSBpcyBjbGlja2VkXG4gICAgICAgIGlmICghbmF2QWN0aXZlKSB7XG4gICAgICAgICAgbmF2QWN0aXZlID0gdGhpcztcbiAgICAgICAgICB0b2dnbGUobmF2QWN0aXZlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHRoaXMgc28gdGhlIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZG9lc24ndCBmaXJlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBbQk9EWV06IGhpZGVBY3RpdmVOYXZEcm9wZG93bixcbiAgICAgIFtPUEVORVJTXTogdG9nZ2xlTmF2LFxuICAgICAgW0NMT1NFUlNdOiB0b2dnbGVOYXYsXG4gICAgICBbTkFWX0xJTktTXSgpIHtcbiAgICAgICAgLy8gQSBuYXZpZ2F0aW9uIGxpbmsgaGFzIGJlZW4gY2xpY2tlZCEgV2Ugd2FudCB0byBjb2xsYXBzZSBhbnlcbiAgICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgICAgLy8gY2FuIGZvY3VzIG9uIHdoYXRldmVyIHRoZXkndmUganVzdCBzZWxlY3RlZC5cblxuICAgICAgICAvLyBTb21lIG5hdmlnYXRpb24gbGlua3MgYXJlIGluc2lkZSBhY2NvcmRpb25zOyB3aGVuIHRoZXkncmVcbiAgICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG5cbiAgICAgICAgaWYgKGFjYykge1xuICAgICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaCgoYnRuKSA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW05BVl9QUklNQVJZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW05BVl9QUklNQVJZXShldmVudCkge1xuICAgICAgICBjb25zdCBuYXYgPSBldmVudC50YXJnZXQuY2xvc2VzdChOQVZfUFJJTUFSWSk7XG5cbiAgICAgICAgaWYgKCFuYXYuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5tYXRjaGVzKE5BVikgPyByb290IDogcm9vdC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmVzaXplKCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSk7XG4gICAgICBuYXZBY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICAgIGZvY3VzVHJhcDogbnVsbCxcbiAgICB0b2dnbGVOYXYsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdGlvbjtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1za2lwbmF2W2hyZWZePVwiI1wiXSwgLiR7UFJFRklYfS1mb290ZXJfX3JldHVybi10by10b3AgW2hyZWZePVwiI1wiXWA7XG5jb25zdCBNQUlOQ09OVEVOVCA9IFwibWFpbi1jb250ZW50XCI7XG5cbmZ1bmN0aW9uIHNldFRhYmluZGV4KCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSBlbmNvZGVVUkkodGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgaWQgPT09IFwiI1wiID8gTUFJTkNPTlRFTlQgOiBpZC5zbGljZSgxKVxuICApO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3R5bGUub3V0bGluZSA9IFwiMFwiO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAwKTtcbiAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiYmx1clwiLFxuICAgICAgb25jZSgoKSA9PiB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICB9KVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhyb3cgYW4gZXJyb3I/XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFtDTElDS106IHtcbiAgICBbTElOS106IHNldFRhYmluZGV4LFxuICB9LFxufSk7XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9zYW5pdGl6ZXJcIik7XG5cbmNvbnN0IFRBQkxFID0gYC4ke1BSRUZJWH0tdGFibGVgO1xuY29uc3QgU09SVEVEID0gXCJhcmlhLXNvcnRcIjtcbmNvbnN0IEFTQ0VORElORyA9IFwiYXNjZW5kaW5nXCI7XG5jb25zdCBERVNDRU5ESU5HID0gXCJkZXNjZW5kaW5nXCI7XG5jb25zdCBTT1JUX09WRVJSSURFID0gXCJkYXRhLXNvcnQtdmFsdWVcIjtcbmNvbnN0IFNPUlRfQlVUVE9OX0NMQVNTID0gYCR7UFJFRklYfS10YWJsZV9faGVhZGVyX19idXR0b25gO1xuY29uc3QgU09SVF9CVVRUT04gPSBgLiR7U09SVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IFNPUlRBQkxFX0hFQURFUiA9IGB0aFtkYXRhLXNvcnRhYmxlXWA7XG5jb25zdCBBTk5PVU5DRU1FTlRfUkVHSU9OID0gYC4ke1BSRUZJWH0tdGFibGVfX2Fubm91bmNlbWVudC1yZWdpb25bYXJpYS1saXZlPVwicG9saXRlXCJdYDtcblxuLyoqIEdldHMgdGhlIGRhdGEtc29ydC12YWx1ZSBhdHRyaWJ1dGUgdmFsdWUsIGlmIHByb3ZpZGVkIOKAlCBvdGhlcndpc2UsIGdldHNcbiAqIHRoZSBpbm5lclRleHQgb3IgdGV4dENvbnRlbnQg4oCUIG9mIHRoZSBjaGlsZCBlbGVtZW50IChIVE1MVGFibGVDZWxsRWxlbWVudClcbiAqIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggb2YgdGhlIGdpdmVuIHRhYmxlIHJvd1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHthcnJheTxIVE1MVGFibGVSb3dFbGVtZW50Pn0gdHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGdldENlbGxWYWx1ZSA9ICh0ciwgaW5kZXgpID0+XG4gIHRyLmNoaWxkcmVuW2luZGV4XS5nZXRBdHRyaWJ1dGUoU09SVF9PVkVSUklERSkgfHxcbiAgdHIuY2hpbGRyZW5baW5kZXhdLmlubmVyVGV4dCB8fFxuICB0ci5jaGlsZHJlbltpbmRleF0udGV4dENvbnRlbnQ7XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIHZhbHVlcyBvZiB0d28gcm93IGFycmF5IGl0ZW1zIGF0IHRoZSBnaXZlbiBpbmRleCwgdGhlbiBzb3J0cyBieSB0aGUgZ2l2ZW4gZGlyZWN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGNvbXBhcmVGdW5jdGlvbiA9IChpbmRleCwgaXNBc2NlbmRpbmcpID0+ICh0aGlzUm93LCBuZXh0Um93KSA9PiB7XG4gIC8vIGdldCB2YWx1ZXMgdG8gY29tcGFyZSBmcm9tIGRhdGEgYXR0cmlidXRlIG9yIGNlbGwgY29udGVudFxuICBjb25zdCB2YWx1ZTEgPSBnZXRDZWxsVmFsdWUoaXNBc2NlbmRpbmcgPyB0aGlzUm93IDogbmV4dFJvdywgaW5kZXgpO1xuICBjb25zdCB2YWx1ZTIgPSBnZXRDZWxsVmFsdWUoaXNBc2NlbmRpbmcgPyBuZXh0Um93IDogdGhpc1JvdywgaW5kZXgpO1xuXG4gIC8vIGlmIG5laXRoZXIgdmFsdWUgaXMgZW1wdHksIGFuZCBpZiBib3RoIHZhbHVlcyBhcmUgYWxyZWFkeSBudW1iZXJzLCBjb21wYXJlIG51bWVyaWNhbGx5XG4gIGlmIChcbiAgICB2YWx1ZTEgJiZcbiAgICB2YWx1ZTIgJiZcbiAgICAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZTEpKSAmJlxuICAgICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlMikpXG4gICkge1xuICAgIHJldHVybiB2YWx1ZTEgLSB2YWx1ZTI7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBjb21wYXJlIGFscGhhYmV0aWNhbGx5IGJhc2VkIG9uIGN1cnJlbnQgdXNlciBsb2NhbGVcbiAgcmV0dXJuIHZhbHVlMS50b1N0cmluZygpLmxvY2FsZUNvbXBhcmUodmFsdWUyLCBuYXZpZ2F0b3IubGFuZ3VhZ2UsIHtcbiAgICBudW1lcmljOiB0cnVlLFxuICAgIGlnbm9yZVB1bmN0dWF0aW9uOiB0cnVlLFxuICB9KTtcbn07XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGNvbHVtbiBoZWFkZXJzIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIHRhYmxlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHRhYmxlXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldENvbHVtbkhlYWRlcnMgPSAodGFibGUpID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNlbGVjdChTT1JUQUJMRV9IRUFERVIsIHRhYmxlKTtcbiAgcmV0dXJuIGhlYWRlcnMuZmlsdGVyKChoZWFkZXIpID0+IGhlYWRlci5jbG9zZXN0KFRBQkxFKSA9PT0gdGFibGUpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGJ1dHRvbiBsYWJlbCB3aXRoaW4gdGhlIGdpdmVuIGhlYWRlciBlbGVtZW50LCByZXNldHRpbmcgaXRcbiAqIHRvIHRoZSBkZWZhdWx0IHN0YXRlIChyZWFkeSB0byBzb3J0IGFzY2VuZGluZykgaWYgaXQncyBubyBsb25nZXIgc29ydGVkXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqL1xuY29uc3QgdXBkYXRlU29ydExhYmVsID0gKGhlYWRlcikgPT4ge1xuICBjb25zdCBoZWFkZXJOYW1lID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgY29uc3Qgc29ydGVkQXNjZW5kaW5nID0gaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIGNvbnN0IGlzU29ydGVkID1cbiAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORyB8fFxuICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gREVTQ0VORElORyB8fFxuICAgIGZhbHNlO1xuICBjb25zdCBoZWFkZXJMYWJlbCA9IGAke2hlYWRlck5hbWV9Jywgc29ydGFibGUgY29sdW1uLCBjdXJyZW50bHkgJHtcbiAgICBpc1NvcnRlZFxuICAgICAgPyBgJHtzb3J0ZWRBc2NlbmRpbmcgPyBgc29ydGVkICR7QVNDRU5ESU5HfWAgOiBgc29ydGVkICR7REVTQ0VORElOR31gfWBcbiAgICAgIDogXCJ1bnNvcnRlZFwiXG4gIH1gO1xuICBjb25zdCBoZWFkZXJCdXR0b25MYWJlbCA9IGBDbGljayB0byBzb3J0IGJ5ICR7aGVhZGVyTmFtZX0gaW4gJHtcbiAgICBzb3J0ZWRBc2NlbmRpbmcgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HXG4gIH0gb3JkZXIuYDtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaGVhZGVyTGFiZWwpO1xuICBoZWFkZXIucXVlcnlTZWxlY3RvcihTT1JUX0JVVFRPTikuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaGVhZGVyQnV0dG9uTGFiZWwpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGFyaWEtc29ydCBhdHRyaWJ1dGUgb24gdGhlIGdpdmVuIGhlYWRlciBlbGVtZW50LCBhbmQgcmVzZXQgdGhlIGxhYmVsIGFuZCBidXR0b24gaWNvblxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cbmNvbnN0IHVuc2V0U29ydCA9IChoZWFkZXIpID0+IHtcbiAgaGVhZGVyLnJlbW92ZUF0dHJpYnV0ZShTT1JURUQpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcbn07XG5cbi8qKlxuICogU29ydCByb3dzIGVpdGhlciBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZywgYmFzZWQgb24gYSBnaXZlbiBoZWFkZXIncyBhcmlhLXNvcnQgYXR0cmlidXRlXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2NlbmRpbmdcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc29ydFJvd3MgPSAoaGVhZGVyLCBpc0FzY2VuZGluZykgPT4ge1xuICBoZWFkZXIuc2V0QXR0cmlidXRlKFNPUlRFRCwgaXNBc2NlbmRpbmcgPT09IHRydWUgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG5cbiAgY29uc3QgdGJvZHkgPSBoZWFkZXIuY2xvc2VzdChUQUJMRSkucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuXG4gIC8vIFdlIGNhbiB1c2UgQXJyYXkuZnJvbSgpIGFuZCBBcnJheS5zb3J0KCkgaW5zdGVhZCBvbmNlIHdlIGRyb3AgSUUxMSBzdXBwb3J0LCBsaWtlbHkgaW4gdGhlIHN1bW1lciBvZiAyMDIxXG4gIC8vXG4gIC8vIEFycmF5LmZyb20odGJvZHkucXVlcnlTZWxlY3RvckFsbCgndHInKS5zb3J0KFxuICAvLyAgIGNvbXBhcmVGdW5jdGlvbihcbiAgLy8gICAgIEFycmF5LmZyb20oaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YoaGVhZGVyKSxcbiAgLy8gICAgICFpc0FzY2VuZGluZylcbiAgLy8gICApXG4gIC8vIC5mb3JFYWNoKHRyID0+IHRib2R5LmFwcGVuZENoaWxkKHRyKSApO1xuXG4gIC8vIFtdLnNsaWNlLmNhbGwoKSB0dXJucyBhcnJheS1saWtlIHNldHMgaW50byB0cnVlIGFycmF5cyBzbyB0aGF0IHdlIGNhbiBzb3J0IHRoZW1cbiAgY29uc3QgYWxsUm93cyA9IFtdLnNsaWNlLmNhbGwodGJvZHkucXVlcnlTZWxlY3RvckFsbChcInRyXCIpKTtcbiAgY29uc3QgYWxsSGVhZGVycyA9IFtdLnNsaWNlLmNhbGwoaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICBjb25zdCB0aGlzSGVhZGVySW5kZXggPSBhbGxIZWFkZXJzLmluZGV4T2YoaGVhZGVyKTtcbiAgYWxsUm93cy5zb3J0KGNvbXBhcmVGdW5jdGlvbih0aGlzSGVhZGVySW5kZXgsICFpc0FzY2VuZGluZykpLmZvckVhY2goKHRyKSA9PiB7XG4gICAgW10uc2xpY2VcbiAgICAgIC5jYWxsKHRyLmNoaWxkcmVuKVxuICAgICAgLmZvckVhY2goKHRkKSA9PiB0ZC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYWN0aXZlXCIpKTtcbiAgICB0ci5jaGlsZHJlblt0aGlzSGVhZGVySW5kZXhdLnNldEF0dHJpYnV0ZShcImRhdGEtc29ydC1hY3RpdmVcIiwgdHJ1ZSk7XG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBsaXZlIHJlZ2lvbiBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdGhlIHRhYmxlIHdoZW5ldmVyIHNvcnQgY2hhbmdlcy5cbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGVcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IHNvcnRlZEhlYWRlclxuICovXG5cbmNvbnN0IHVwZGF0ZUxpdmVSZWdpb24gPSAodGFibGUsIHNvcnRlZEhlYWRlcikgPT4ge1xuICBjb25zdCBjYXB0aW9uID0gdGFibGUucXVlcnlTZWxlY3RvcihcImNhcHRpb25cIikuaW5uZXJUZXh0O1xuICBjb25zdCBzb3J0ZWRBc2NlbmRpbmcgPSBzb3J0ZWRIZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgY29uc3QgaGVhZGVyTGFiZWwgPSBzb3J0ZWRIZWFkZXIuaW5uZXJUZXh0O1xuICBjb25zdCBsaXZlUmVnaW9uID0gdGFibGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAobGl2ZVJlZ2lvbiAmJiBsaXZlUmVnaW9uLm1hdGNoZXMoQU5OT1VOQ0VNRU5UX1JFR0lPTikpIHtcbiAgICBjb25zdCBzb3J0QW5ub3VuY2VtZW50ID0gYFRoZSB0YWJsZSBuYW1lZCBcIiR7Y2FwdGlvbn1cIiBpcyBub3cgc29ydGVkIGJ5ICR7aGVhZGVyTGFiZWx9IGluICR7XG4gICAgICBzb3J0ZWRBc2NlbmRpbmcgPyBBU0NFTkRJTkcgOiBERVNDRU5ESU5HXG4gICAgfSBvcmRlci5gO1xuICAgIGxpdmVSZWdpb24uaW5uZXJUZXh0ID0gc29ydEFubm91bmNlbWVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVGFibGUgY29udGFpbmluZyBhIHNvcnRhYmxlIGNvbHVtbiBoZWFkZXIgaXMgbm90IGZvbGxvd2VkIGJ5IGFuIGFyaWEtbGl2ZSByZWdpb24uYFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogVG9nZ2xlIGEgaGVhZGVyJ3Mgc29ydCBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICogQHBhcmFtIHtib29sZWFuP30gaXNBc2NlbmRpbmcgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICovXG5jb25zdCB0b2dnbGVTb3J0ID0gKGhlYWRlciwgaXNBc2NlbmRpbmcpID0+IHtcbiAgY29uc3QgdGFibGUgPSBoZWFkZXIuY2xvc2VzdChUQUJMRSk7XG4gIGxldCBzYWZlQXNjZW5kaW5nID0gaXNBc2NlbmRpbmc7XG4gIGlmICh0eXBlb2Ygc2FmZUFzY2VuZGluZyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICBzYWZlQXNjZW5kaW5nID0gaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIH1cblxuICBpZiAoIXRhYmxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke1NPUlRBQkxFX0hFQURFUn0gaXMgbWlzc2luZyBvdXRlciAke1RBQkxFfWApO1xuICB9XG5cbiAgc2FmZUFzY2VuZGluZyA9IHNvcnRSb3dzKGhlYWRlciwgaXNBc2NlbmRpbmcpO1xuXG4gIGlmIChzYWZlQXNjZW5kaW5nKSB7XG4gICAgZ2V0Q29sdW1uSGVhZGVycyh0YWJsZSkuZm9yRWFjaCgob3RoZXJIZWFkZXIpID0+IHtcbiAgICAgIGlmIChvdGhlckhlYWRlciAhPT0gaGVhZGVyKSB7XG4gICAgICAgIHVuc2V0U29ydChvdGhlckhlYWRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdXBkYXRlTGl2ZVJlZ2lvbih0YWJsZSwgaGVhZGVyKTtcbiAgfVxufTtcblxuLyoqXG4gKiogSW5zZXJ0cyBhIGJ1dHRvbiB3aXRoIGljb24gaW5zaWRlIGEgc29ydGFibGUgaGVhZGVyXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqL1xuXG5jb25zdCBjcmVhdGVIZWFkZXJCdXR0b24gPSAoaGVhZGVyKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uRWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICBidXR0b25FbC5jbGFzc0xpc3QuYWRkKFNPUlRfQlVUVE9OX0NMQVNTKTtcbiAgLy8gSUNPTl9TT1VSQ0VcbiAgYnV0dG9uRWwuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgXG4gIDxzdmcgY2xhc3M9XCIke1BSRUZJWH0taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgPGcgY2xhc3M9XCJkZXNjZW5kaW5nXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cGF0aCBkPVwiTTE3IDE3TDE1LjU5IDE1LjU5TDEyLjk5OTkgMTguMTdWMkgxMC45OTk5VjE4LjE3TDguNDEgMTUuNThMNyAxN0wxMS45OTk5IDIyTDE3IDE3WlwiIC8+XG4gICAgPC9nPlxuICAgIDxnIGNsYXNzPVwiYXNjZW5kaW5nXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cGF0aCB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLCAxMiwgMTIpXCIgZD1cIk0xNyAxN0wxNS41OSAxNS41OUwxMi45OTk5IDE4LjE3VjJIMTAuOTk5OVYxOC4xN0w4LjQxIDE1LjU4TDcgMTdMMTEuOTk5OSAyMkwxNyAxN1pcIiAvPlxuICAgIDwvZz5cbiAgICA8ZyBjbGFzcz1cInVuc29ydGVkXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cG9seWdvbiBwb2ludHM9XCIxNS4xNyAxNSAxMyAxNy4xNyAxMyA2LjgzIDE1LjE3IDkgMTYuNTggNy41OSAxMiAzIDcuNDEgNy41OSA4LjgzIDkgMTEgNi44MyAxMSAxNy4xNyA4LjgzIDE1IDcuNDIgMTYuNDEgMTIgMjEgMTYuNTkgMTYuNDEgMTUuMTcgMTVcIi8+XG4gICAgPC9nPlxuICA8L3N2Zz5cbiAgYDtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGJ1dHRvbkVsKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG59O1xuXG5jb25zdCB0YWJsZSA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW1NPUlRfQlVUVE9OXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVTb3J0KFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFNPUlRBQkxFX0hFQURFUiksXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoU09SVEFCTEVfSEVBREVSKS5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT1cbiAgICAgICAgICAgIEFTQ0VORElOR1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCBzb3J0YWJsZUhlYWRlcnMgPSBzZWxlY3QoU09SVEFCTEVfSEVBREVSLCByb290KTtcbiAgICAgIHNvcnRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IGNyZWF0ZUhlYWRlckJ1dHRvbihoZWFkZXIpKTtcblxuICAgICAgY29uc3QgZmlyc3RTb3J0ZWQgPSBzb3J0YWJsZUhlYWRlcnMuZmlsdGVyKFxuICAgICAgICAoaGVhZGVyKSA9PlxuICAgICAgICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HIHx8XG4gICAgICAgICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBERVNDRU5ESU5HXG4gICAgICApWzBdO1xuICAgICAgaWYgKHR5cGVvZiBmaXJzdFNvcnRlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBubyBzb3J0YWJsZSBoZWFkZXJzIGZvdW5kXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNvcnREaXIgPSBmaXJzdFNvcnRlZC5nZXRBdHRyaWJ1dGUoU09SVEVEKTtcbiAgICAgIGlmIChzb3J0RGlyID09PSBBU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IERFU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgVEFCTEUsXG4gICAgU09SVEFCTEVfSEVBREVSLFxuICAgIFNPUlRfQlVUVE9OLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYmxlO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vY29uZmlnXCIpO1xuY29uc3Qge1xuICBDT01CT19CT1hfQ0xBU1MsXG4gIGVuaGFuY2VDb21ib0JveCxcbn0gPSByZXF1aXJlKFwiLi4vdXNhLWNvbWJvLWJveC9jb21iby1ib3hcIik7XG5cbmNvbnN0IFRJTUVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS10aW1lLXBpY2tlcmA7XG5jb25zdCBUSU1FX1BJQ0tFUiA9IGAuJHtUSU1FX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgTUFYX1RJTUUgPSA2MCAqIDI0IC0gMTtcbmNvbnN0IE1JTl9USU1FID0gMDtcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDMwO1xuY29uc3QgTUlOX1NURVAgPSAxO1xuXG5jb25zdCBGSUxURVJfREFUQVNFVCA9IHtcbiAgZmlsdGVyOlxuICAgIFwiMD97eyBob3VyUXVlcnlGaWx0ZXIgfX06e3ttaW51dGVRdWVyeUZpbHRlcn19Lip7eyBhcFF1ZXJ5RmlsdGVyIH19bT9cIixcbiAgYXBRdWVyeUZpbHRlcjogXCIoW2FwXSlcIixcbiAgaG91clF1ZXJ5RmlsdGVyOiBcIihbMS05XVswLTJdPylcIixcbiAgbWludXRlUXVlcnlGaWx0ZXI6IFwiW1xcXFxkXSs6KFswLTldezAsMn0pXCIsXG59O1xuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIG9mIGhoOm1tIGludG8gbWludXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lU3RyIHRoZSB0aW1lIHN0cmluZyB0byBwYXJzZVxuICogQHJldHVybnMge251bWJlcn0gdGhlIG51bWJlciBvZiBtaW51dGVzXG4gKi9cbmNvbnN0IHBhcnNlVGltZVN0cmluZyA9ICh0aW1lU3RyKSA9PiB7XG4gIGxldCBtaW51dGVzO1xuXG4gIGlmICh0aW1lU3RyKSB7XG4gICAgY29uc3QgW2hvdXJzLCBtaW5zXSA9IHRpbWVTdHIuc3BsaXQoXCI6XCIpLm1hcCgoc3RyKSA9PiB7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHZhbHVlID0gcGFyc2VkO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGhvdXJzICE9IG51bGwgJiYgbWlucyAhPSBudWxsKSB7XG4gICAgICBtaW51dGVzID0gaG91cnMgKiA2MCArIG1pbnM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pbnV0ZXM7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdHJhbnNmb3JtVGltZVBpY2tlciA9IChlbCkgPT4ge1xuICBjb25zdCB0aW1lUGlja2VyRWwgPSBlbC5jbG9zZXN0KFRJTUVfUElDS0VSKTtcblxuICBjb25zdCBpbml0aWFsSW5wdXRFbCA9IHRpbWVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKGBpbnB1dGApO1xuXG4gIGlmICghaW5pdGlhbElucHV0RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7VElNRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgaW5wdXRgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcblxuICBbXCJpZFwiLCBcIm5hbWVcIiwgXCJyZXF1aXJlZFwiLCBcImFyaWEtbGFiZWxcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIl0uZm9yRWFjaChcbiAgICAobmFtZSkgPT4ge1xuICAgICAgaWYgKGluaXRpYWxJbnB1dEVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgaW5pdGlhbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBnZXRUaW1lQ29udGV4dCA9IChtaW51dGVzKSA9PiB7XG4gICAgY29uc3QgbWludXRlID0gbWludXRlcyAlIDYwO1xuICAgIGNvbnN0IGhvdXIyNCA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBjb25zdCBob3VyMTIgPSBob3VyMjQgJSAxMiB8fCAxMjtcbiAgICBjb25zdCBhbXBtID0gaG91cjI0IDwgMTIgPyBcImFtXCIgOiBcInBtXCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWludXRlLFxuICAgICAgaG91cjI0LFxuICAgICAgaG91cjEyLFxuICAgICAgYW1wbSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1pblRpbWUgPSBNYXRoLm1heChcbiAgICBNSU5fVElNRSxcbiAgICBwYXJzZVRpbWVTdHJpbmcodGltZVBpY2tlckVsLmRhdGFzZXQubWluVGltZSkgfHwgTUlOX1RJTUVcbiAgKTtcbiAgY29uc3QgbWF4VGltZSA9IE1hdGgubWluKFxuICAgIE1BWF9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5tYXhUaW1lKSB8fCBNQVhfVElNRVxuICApO1xuICBjb25zdCBzdGVwID0gTWF0aC5mbG9vcihcbiAgICBNYXRoLm1heChNSU5fU1RFUCwgdGltZVBpY2tlckVsLmRhdGFzZXQuc3RlcCB8fCBERUZBVUxUX1NURVApXG4gICk7XG5cbiAgZm9yIChsZXQgdGltZSA9IG1pblRpbWU7IHRpbWUgPD0gbWF4VGltZTsgdGltZSArPSBzdGVwKSB7XG4gICAgY29uc3QgeyBtaW51dGUsIGhvdXIyNCwgaG91cjEyLCBhbXBtIH0gPSBnZXRUaW1lQ29udGV4dCh0aW1lKTtcblxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gYCR7cGFkWmVyb3MoaG91cjI0LCAyKX06JHtwYWRaZXJvcyhtaW51dGUsIDIpfWA7XG4gICAgb3B0aW9uLnRleHQgPSBgJHtob3VyMTJ9OiR7cGFkWmVyb3MobWludXRlLCAyKX0ke2FtcG19YDtcbiAgICBzZWxlY3RFbC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG5cbiAgdGltZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX0NMQVNTKTtcblxuICAvLyBjb21ibyBib3ggcHJvcGVydGllc1xuICBPYmplY3Qua2V5cyhGSUxURVJfREFUQVNFVCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgdGltZVBpY2tlckVsLmRhdGFzZXRba2V5XSA9IEZJTFRFUl9EQVRBU0VUW2tleV07XG4gIH0pO1xuICB0aW1lUGlja2VyRWwuZGF0YXNldC5kaXNhYmxlRmlsdGVyaW5nID0gXCJ0cnVlXCI7XG5cbiAgdGltZVBpY2tlckVsLmFwcGVuZENoaWxkKHNlbGVjdEVsKTtcbiAgaW5pdGlhbElucHV0RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxuY29uc3QgdGltZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7fSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFRJTUVfUElDS0VSLCByb290KS5mb3JFYWNoKCh0aW1lUGlja2VyRWwpID0+IHtcbiAgICAgICAgdHJhbnNmb3JtVGltZVBpY2tlcih0aW1lUGlja2VyRWwpO1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3godGltZVBpY2tlckVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgRklMVEVSX0RBVEFTRVQsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdGltZVBpY2tlcjtcbiIsIi8vIFRvb2x0aXBzXG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuXG5jb25zdCBUT09MVElQID0gYC4ke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX1RSSUdHRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX3RyaWdnZXJgO1xuY29uc3QgVE9PTFRJUF9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX0JPRFlfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX2JvZHlgO1xuY29uc3QgU0VUX0NMQVNTID0gXCJpcy1zZXRcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcbmNvbnN0IFRSSUFOR0xFX1NJWkUgPSA1O1xuY29uc3QgQURKVVNUX1dJRFRIX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX19ib2R5LS13cmFwYDtcblxuLyoqXG4gKiBBZGQgb25lIG9yIG1vcmUgbGlzdGVuZXJzIHRvIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gZWxlbWVudCAtIERPTSBlbGVtZW50IHRvIGFkZCBsaXN0ZW5lcnMgdG9cbiAqIEBwYXJhbSB7ZXZlbnRzfSBldmVudE5hbWVzIC0gc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnQgbmFtZXMsIGUuZy4gJ2NsaWNrIGNoYW5nZSdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIC0gZnVuY3Rpb24gdG8gYXR0YWNoIGZvciBlYWNoIGV2ZW50IGFzIGEgbGlzdGVuZXJcbiAqL1xuY29uc3QgYWRkTGlzdGVuZXJNdWx0aSA9IChlbGVtZW50LCBldmVudE5hbWVzLCBsaXN0ZW5lcikgPT4ge1xuICBjb25zdCBldmVudHMgPSBldmVudE5hbWVzLnNwbGl0KFwiIFwiKTtcbiAgZm9yIChsZXQgaSA9IDAsIGlMZW4gPSBldmVudHMubGVuZ3RoOyBpIDwgaUxlbjsgaSArPSAxKSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTaG93cyB0aGUgdG9vbHRpcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgLSB0aGUgZWxlbWVudCB0aGF0IGluaXRpYWxpemVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNob3dUb29sVGlwID0gKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24pID0+IHtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcblxuICAvLyBUaGlzIHNldHMgdXAgdGhlIHRvb2x0aXAgYm9keS4gVGhlIG9wYWNpdHkgaXMgMCwgYnV0XG4gIC8vIHdlIGNhbiBiZWdpbiBydW5uaW5nIHRoZSBjYWxjdWxhdGlvbnMgYmVsb3cuXG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoU0VUX0NMQVNTKTtcblxuICAvKipcbiAgICogUG9zaXRpb24gdGhlIHRvb2x0aXAgYm9keSB3aGVuIHRoZSB0cmlnZ2VyIGlzIGhvdmVyZWRcbiAgICogUmVtb3ZlcyBvbGQgcG9zaXRpb25pbmcgY2xhc3NuYW1lcyBhbmQgcmVhcHBsaWVzLiBUaGlzIGFsbG93c1xuICAgKiBwb3NpdGlvbmluZyB0byBjaGFuZ2UgaW4gY2FzZSB0aGUgdXNlciByZXNpemVzIGJyb3dzZXIgb3IgRE9NIG1hbmlwdWxhdGlvblxuICAgKiBjYXVzZXMgdG9vbHRpcCB0byBnZXQgY2xpcHBlZCBmcm9tIHZpZXdwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXRQb3MgLSBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJyaWdodFwiLCBcImxlZnRcIlxuICAgKi9cbiAgY29uc3Qgc2V0UG9zaXRpb25DbGFzcyA9IChzZXRQb3MpID0+IHtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLXRvcGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tYm90dG9tYCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1yaWdodGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tbGVmdGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tJHtzZXRQb3N9YCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgb2xkIHBvc2l0aW9uaW5nIHN0eWxlcy4gVGhpcyBhbGxvd3NcbiAgICogcmUtcG9zaXRpb25pbmcgdG8gY2hhbmdlIHdpdGhvdXQgaW5oZXJpdGluZyBvdGhlclxuICAgKiBkeW5hbWljIHN0eWxlc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCByZXNldFBvc2l0aW9uU3R5bGVzID0gKGUpID0+IHtcbiAgICAvLyB3ZSBkb24ndCBvdmVycmlkZSBhbnl0aGluZyBpbiB0aGUgc3R5bGVzaGVldCB3aGVuIGZpbmRpbmcgYWx0IHBvc2l0aW9uc1xuICAgIGUuc3R5bGUudG9wID0gbnVsbDtcbiAgICBlLnN0eWxlLmJvdHRvbSA9IG51bGw7XG4gICAgZS5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgZS5zdHlsZS5sZWZ0ID0gbnVsbDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIGdldCBtYXJnaW4gb2Zmc2V0IGNhbGN1bGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5VmFsdWUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG5cbiAgY29uc3Qgb2Zmc2V0TWFyZ2luID0gKHRhcmdldCwgcHJvcGVydHlWYWx1ZSkgPT5cbiAgICBwYXJzZUludChcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eVZhbHVlKSxcbiAgICAgIDEwXG4gICAgKTtcblxuICAvLyBvZmZzZXRMZWZ0ID0gdGhlIGxlZnQgcG9zaXRpb24sIGFuZCBtYXJnaW4gb2YgdGhlIGVsZW1lbnQsIHRoZSBsZWZ0XG4gIC8vIHBhZGRpbmcsIHNjcm9sbGJhciBhbmQgYm9yZGVyIG9mIHRoZSBvZmZzZXRQYXJlbnQgZWxlbWVudFxuICAvLyBvZmZzZXRXaWR0aCA9IFRoZSBvZmZzZXRXaWR0aCBwcm9wZXJ0eSByZXR1cm5zIHRoZSB2aWV3YWJsZSB3aWR0aCBvZiBhblxuICAvLyBlbGVtZW50IGluIHBpeGVscywgaW5jbHVkaW5nIHBhZGRpbmcsIGJvcmRlciBhbmQgc2Nyb2xsYmFyLCBidXQgbm90XG4gIC8vIHRoZSBtYXJnaW4uXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBtYXJnaW4gb2Zmc2V0XG4gICAqIHRvb2x0aXAgdHJpZ2dlciBtYXJnaW4ocG9zaXRpb24pIG9mZnNldCArIHRvb2x0aXBCb2R5IG9mZnNldFdpZHRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJnaW5Qb3NpdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdG9vbHRpcEJvZHlPZmZzZXRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdHJpZ2dlclxuICAgKi9cblxuICBjb25zdCBjYWxjdWxhdGVNYXJnaW5PZmZzZXQgPSAoXG4gICAgbWFyZ2luUG9zaXRpb24sXG4gICAgdG9vbHRpcEJvZHlPZmZzZXQsXG4gICAgdHJpZ2dlclxuICApID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPVxuICAgICAgb2Zmc2V0TWFyZ2luKHRyaWdnZXIsIGBtYXJnaW4tJHttYXJnaW5Qb3NpdGlvbn1gKSA+IDBcbiAgICAgICAgPyB0b29sdGlwQm9keU9mZnNldCAtIG9mZnNldE1hcmdpbih0cmlnZ2VyLCBgbWFyZ2luLSR7bWFyZ2luUG9zaXRpb259YClcbiAgICAgICAgOiB0b29sdGlwQm9keU9mZnNldDtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSB0b3BcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25Ub3AgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7IC8vIGVuc3VyZXMgd2Ugc3RhcnQgZnJvbSB0aGUgc2FtZSBwb2ludFxuICAgIC8vIGdldCBkZXRhaWxzIG9uIHRoZSBlbGVtZW50cyBvYmplY3Qgd2l0aFxuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJ0b3BcIik7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYDUwJWA7IC8vIGNlbnRlciB0aGUgZWxlbWVudFxuICAgIGUuc3R5bGUudG9wID0gYC0ke1RSSUFOR0xFX1NJWkV9cHhgOyAvLyBjb25zaWRlciB0aGUgcHNldWRvIGVsZW1lbnRcbiAgICAvLyBhcHBseSBvdXIgbWFyZ2lucyBiYXNlZCBvbiB0aGUgb2Zmc2V0XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgLSR7dG9wTWFyZ2lufXB4IDAgMCAtJHtsZWZ0TWFyZ2luIC8gMn1weGA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSBib3R0b21cbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25Cb3R0b20gPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJsZWZ0XCIsXG4gICAgICBlLm9mZnNldFdpZHRoLFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcImJvdHRvbVwiKTtcbiAgICBlLnN0eWxlLmxlZnQgPSBgNTAlYDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAke1RSSUFOR0xFX1NJWkV9cHggMCAwIC0ke2xlZnRNYXJnaW4gLyAyfXB4YDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uUmlnaHQgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwicmlnaHRcIik7XG4gICAgZS5zdHlsZS50b3AgPSBgNTAlYDtcbiAgICBlLnN0eWxlLmxlZnQgPSBgJHtcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgKyB0b29sdGlwVHJpZ2dlci5vZmZzZXRXaWR0aCArIFRSSUFOR0xFX1NJWkVcbiAgICB9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwIDBgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgcmlnaHRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25MZWZ0ID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgLy8gd2UgaGF2ZSB0byBjaGVjayBmb3Igc29tZSB1dGlsaXR5IG1hcmdpbnNcbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJsZWZ0XCIsXG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ID4gZS5vZmZzZXRXaWR0aFxuICAgICAgICA/IHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgLSBlLm9mZnNldFdpZHRoXG4gICAgICAgIDogZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIGUuc3R5bGUudG9wID0gYDUwJWA7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYC0ke1RSSUFOR0xFX1NJWkV9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwICR7XG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ID4gZS5vZmZzZXRXaWR0aCA/IGxlZnRNYXJnaW4gOiAtbGVmdE1hcmdpblxuICAgIH1weGA7IC8vIGFkanVzdCB0aGUgbWFyZ2luXG4gIH07XG5cbiAgLyoqXG4gICAqIFdlIHRyeSB0byBzZXQgdGhlIHBvc2l0aW9uIGJhc2VkIG9uIHRoZVxuICAgKiBvcmlnaW5hbCBpbnRlbnRpb24sIGJ1dCBtYWtlIGFkanVzdG1lbnRzXG4gICAqIGlmIHRoZSBlbGVtZW50IGlzIGNsaXBwZWQgb3V0IG9mIHRoZSB2aWV3cG9ydFxuICAgKiB3ZSBjb25zdHJhaW4gdGhlIHdpZHRoIG9ubHkgYXMgYSBsYXN0IHJlc29ydFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50KGFsaWFzIHRvb2x0aXBCb2R5KVxuICAgKiBAcGFyYW0ge051bWJlcn0gYXR0ZW1wdCAoLS1mbGFnKVxuICAgKi9cblxuICBjb25zdCBtYXhBdHRlbXB0cyA9IDI7XG5cbiAgZnVuY3Rpb24gZmluZEJlc3RQb3NpdGlvbihlbGVtZW50LCBhdHRlbXB0ID0gMSkge1xuICAgIC8vIGNyZWF0ZSBhcnJheSBvZiBvcHRpb25hbCBwb3NpdGlvbnNcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICBwb3NpdGlvblRvcCxcbiAgICAgIHBvc2l0aW9uQm90dG9tLFxuICAgICAgcG9zaXRpb25SaWdodCxcbiAgICAgIHBvc2l0aW9uTGVmdCxcbiAgICBdO1xuXG4gICAgbGV0IGhhc1Zpc2libGVQb3NpdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gd2UgdGFrZSBhIHJlY3Vyc2l2ZSBhcHByb2FjaFxuICAgIGZ1bmN0aW9uIHRyeVBvc2l0aW9ucyhpKSB7XG4gICAgICBpZiAoaSA8IHBvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25zW2ldO1xuICAgICAgICBwb3MoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgdHJ5UG9zaXRpb25zKChpICs9IDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYXNWaXNpYmxlUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5UG9zaXRpb25zKDApO1xuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgYSBwb3NpdGlvbiB3ZSBjb21wcmVzcyBpdCBhbmQgdHJ5IGFnYWluXG4gICAgaWYgKCFoYXNWaXNpYmxlUG9zaXRpb24pIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChBREpVU1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgaWYgKGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24oZWxlbWVudCwgKGF0dGVtcHQgKz0gMSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlIFwidG9wXCI6XG4gICAgICBwb3NpdGlvblRvcCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgcG9zaXRpb25Cb3R0b20odG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgcG9zaXRpb25SaWdodCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIHBvc2l0aW9uTGVmdCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gc2tpcCBkZWZhdWx0IGNhc2VcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IHNob3cgdGhlIHRvb2x0aXAuIFRoZSBWSVNJQkxFX0NMQVNTXG4gICAqIHdpbGwgY2hhbmdlIHRoZSBvcGFjaXR5IHRvIDFcbiAgICovXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUyk7XG4gIH0sIDIwKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgdGhlIHByb3BlcnRpZXMgdG8gc2hvdyBhbmQgcG9zaXRpb24gdGhlIHRvb2x0aXAsXG4gKiBhbmQgcmVzZXRzIHRoZSB0b29sdGlwIHBvc2l0aW9uIHRvIHRoZSBvcmlnaW5hbCBpbnRlbnRpb25cbiAqIGluIGNhc2UgdGhlIHdpbmRvdyBpcyByZXNpemVkIG9yIHRoZSBlbGVtZW50IGlzIG1vdmVkIHRocm91Z2hcbiAqIERPTSBtYW5pcHVsYXRpb24uXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwQm9keSAtIFRoZSBib2R5IG9mIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IGhpZGVUb29sVGlwID0gKHRvb2x0aXBCb2R5KSA9PiB7XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoVklTSUJMRV9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoU0VUX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShBREpVU1RfV0lEVEhfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG59O1xuXG4vKipcbiAqIFNldHVwIHRoZSB0b29sdGlwIGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgVGhlIGVsZW1lbnQgdGhhdCBjcmVhdGVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNldFVwQXR0cmlidXRlcyA9ICh0b29sdGlwVHJpZ2dlcikgPT4ge1xuICBjb25zdCB0b29sdGlwSUQgPSBgdG9vbHRpcC0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkgKyAxMDAwMDB9YDtcbiAgY29uc3QgdG9vbHRpcENvbnRlbnQgPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCB0b29sdGlwQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCBwb3NpdGlvbiA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIilcbiAgICA/IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIilcbiAgICA6IFwidG9wXCI7XG4gIGNvbnN0IGFkZGl0aW9uYWxDbGFzc2VzID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGFzc2VzXCIpO1xuXG4gIC8vIFNldCB1cCB0b29sdGlwIGF0dHJpYnV0ZXNcbiAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLCB0b29sdGlwSUQpO1xuICB0b29sdGlwVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIHRvb2x0aXBUcmlnZ2VyLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiXCIpO1xuICB0b29sdGlwVHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFRPT0xUSVBfQ0xBU1MpO1xuICB0b29sdGlwVHJpZ2dlci5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfVFJJR0dFUl9DTEFTUyk7XG5cbiAgLy8gaW5zZXJ0IHdyYXBwZXIgYmVmb3JlIGVsIGluIHRoZSBET00gdHJlZVxuICB0b29sdGlwVHJpZ2dlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCB0b29sdGlwVHJpZ2dlcik7XG5cbiAgLy8gc2V0IHVwIHRoZSB3cmFwcGVyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQodG9vbHRpcFRyaWdnZXIpO1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9DTEFTUyk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQodG9vbHRpcEJvZHkpO1xuXG4gIC8vIEFwcGx5IGFkZGl0aW9uYWwgY2xhc3MgbmFtZXMgdG8gd3JhcHBlciBlbGVtZW50XG4gIGlmIChhZGRpdGlvbmFsQ2xhc3Nlcykge1xuICAgIGNvbnN0IGNsYXNzZXNBcnJheSA9IGFkZGl0aW9uYWxDbGFzc2VzLnNwbGl0KFwiIFwiKTtcbiAgICBjbGFzc2VzQXJyYXkuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKSk7XG4gIH1cblxuICAvLyBzZXQgdXAgdGhlIHRvb2x0aXAgYm9keVxuICB0b29sdGlwQm9keS5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfQk9EWV9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImlkXCIsIHRvb2x0aXBJRCk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0b29sdGlwXCIpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgLy8gcGxhY2UgdGhlIHRleHQgaW4gdGhlIHRvb2x0aXBcbiAgdG9vbHRpcEJvZHkudGV4dENvbnRlbnQgPSB0b29sdGlwQ29udGVudDtcblxuICByZXR1cm4geyB0b29sdGlwQm9keSwgcG9zaXRpb24sIHRvb2x0aXBDb250ZW50LCB3cmFwcGVyIH07XG59O1xuXG4vLyBTZXR1cCBvdXIgZnVuY3Rpb24gdG8gcnVuIG9uIHZhcmlvdXMgZXZlbnRzXG5jb25zdCB0b29sdGlwID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoVE9PTFRJUCwgcm9vdCkuZm9yRWFjaCgodG9vbHRpcFRyaWdnZXIpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHRvb2x0aXBCb2R5LFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHRvb2x0aXBDb250ZW50LFxuICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgIH0gPSBzZXRVcEF0dHJpYnV0ZXModG9vbHRpcFRyaWdnZXIpO1xuXG4gICAgICAgIGlmICh0b29sdGlwQ29udGVudCkge1xuICAgICAgICAgIC8vIExpc3RlbmVycyBmb3Igc2hvd2luZyBhbmQgaGlkaW5nIHRoZSB0b29sdGlwXG4gICAgICAgICAgYWRkTGlzdGVuZXJNdWx0aSh0b29sdGlwVHJpZ2dlciwgXCJtb3VzZWVudGVyIGZvY3VzXCIsICgpID0+IHtcbiAgICAgICAgICAgIHNob3dUb29sVGlwKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24sIHdyYXBwZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gS2V5ZG93biBoZXJlIHByZXZlbnRzIHRvb2x0aXBzIGZyb20gYmVpbmcgcmVhZCB0d2ljZSBieVxuICAgICAgICAgIC8vIHNjcmVlbiByZWFkZXIuIEFsc28gYWxsb3dzIGVzY2FwZSBrZXkgdG8gY2xvc2UgaXRcbiAgICAgICAgICAvLyAoYWxvbmcgd2l0aCBhbnkgb3RoZXIuKVxuICAgICAgICAgIGFkZExpc3RlbmVyTXVsdGkodG9vbHRpcFRyaWdnZXIsIFwibW91c2VsZWF2ZSBibHVyIGtleWRvd25cIiwgKCkgPT4ge1xuICAgICAgICAgICAgaGlkZVRvb2xUaXAodG9vbHRpcEJvZHkpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRocm93IGVycm9yIG9yIGxldCBvdGhlciB0b29sdGlwcyBvbiBwYWdlIGZ1bmN0aW9uP1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2x0aXA7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL3ZhbGlkYXRlLWlucHV0XCIpO1xuXG5mdW5jdGlvbiBjaGFuZ2UoKSB7XG4gIHZhbGlkYXRlKHRoaXMpO1xufVxuXG5jb25zdCB2YWxpZGF0b3IgPSBiZWhhdmlvcih7XG4gIFwia2V5dXAgY2hhbmdlXCI6IHtcbiAgICBcImlucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XVwiOiBjaGFuZ2UsXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiBcInVzYVwiLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBUaGlzIHVzZWQgdG8gYmUgY29uZGl0aW9uYWxseSBkZXBlbmRlbnQgb24gd2hldGhlciB0aGVcbiAgLy8gYnJvd3NlciBzdXBwb3J0ZWQgdG91Y2ggZXZlbnRzOyBpZiBpdCBkaWQsIGBDTElDS2Agd2FzIHNldCB0b1xuICAvLyBgdG91Y2hzdGFydGAuICBIb3dldmVyLCB0aGlzIGhhZCBkb3duc2lkZXM6XG4gIC8vXG4gIC8vICogSXQgcHJlLWVtcHRlZCBtb2JpbGUgYnJvd3NlcnMnIGRlZmF1bHQgYmVoYXZpb3Igb2YgZGV0ZWN0aW5nXG4gIC8vICAgd2hldGhlciBhIHRvdWNoIHR1cm5lZCBpbnRvIGEgc2Nyb2xsLCB0aGVyZWJ5IHByZXZlbnRpbmdcbiAgLy8gICB1c2VycyBmcm9tIHVzaW5nIHNvbWUgb2Ygb3VyIGNvbXBvbmVudHMgYXMgc2Nyb2xsIHN1cmZhY2VzLlxuICAvL1xuICAvLyAqIFNvbWUgZGV2aWNlcywgc3VjaCBhcyB0aGUgTWljcm9zb2Z0IFN1cmZhY2UgUHJvLCBzdXBwb3J0ICpib3RoKlxuICAvLyAgIHRvdWNoIGFuZCBjbGlja3MuIFRoaXMgbWVhbnQgdGhlIGNvbmRpdGlvbmFsIGVmZmVjdGl2ZWx5IGRyb3BwZWRcbiAgLy8gICBzdXBwb3J0IGZvciB0aGUgdXNlcidzIG1vdXNlLCBmcnVzdHJhdGluZyB1c2VycyB3aG8gcHJlZmVycmVkXG4gIC8vICAgaXQgb24gdGhvc2Ugc3lzdGVtcy5cbiAgQ0xJQ0s6IFwiY2xpY2tcIixcbn07XG4iLCJjb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3VzYS1hY2NvcmRpb24vYWNjb3JkaW9uXCIpO1xuY29uc3QgYmFubmVyID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtYmFubmVyL2Jhbm5lclwiKTtcbmNvbnN0IGNoYXJhY3RlckNvdW50ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtY2hhcmFjdGVyLWNvdW50L2NoYXJhY3Rlci1jb3VudFwiKTtcbmNvbnN0IGNvbWJvQm94ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtY29tYm8tYm94L2NvbWJvLWJveFwiKTtcbmNvbnN0IGZpbGVJbnB1dCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdXNhLWZpbGUtaW5wdXQvZmlsZS1pbnB1dFwiKTtcbmNvbnN0IGZvb3RlciA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdXNhLWZvb3Rlci9mb290ZXJcIik7XG5jb25zdCBpbnB1dFByZWZpeFN1ZmZpeCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdXNhLWlucHV0LXByZWZpeC1zdWZmaXgvaW5wdXQtcHJlZml4LXN1ZmZpeFwiKTtcbmNvbnN0IG1vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtbW9kYWwvbW9kYWxcIik7XG5jb25zdCBuYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2Etc2lkZW5hdi9uYXZpZ2F0aW9uXCIpO1xuY29uc3QgcGFzc3dvcmQgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL191c2EtcGFzc3dvcmQvcGFzc3dvcmRcIik7XG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3VzYS1zZWFyY2gvc2VhcmNoXCIpO1xuY29uc3Qgc2tpcG5hdiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdXNhLXNraXBuYXYvc2tpcG5hdlwiKTtcbmNvbnN0IHRhYmxlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtdGFibGUvdGFibGVcIik7XG5jb25zdCB0b29sdGlwID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtdG9vbHRpcC90b29sdGlwXCIpO1xuY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtdmFsaWRhdGlvbi92YWxpZGF0b3JcIik7XG5jb25zdCBkYXRlUGlja2VyID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy91c2EtZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXJcIik7XG5jb25zdCBkYXRlUmFuZ2VQaWNrZXIgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3VzYS1kYXRlLXJhbmdlLXBpY2tlci9kYXRlLXJhbmdlLXBpY2tlclwiKTtcbmNvbnN0IHRpbWVQaWNrZXIgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3VzYS10aW1lLXBpY2tlci90aW1lLXBpY2tlclwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjY29yZGlvbixcbiAgYmFubmVyLFxuICBjaGFyYWN0ZXJDb3VudCxcbiAgY29tYm9Cb3gsXG4gIGRhdGVQaWNrZXIsXG4gIGRhdGVSYW5nZVBpY2tlcixcbiAgZmlsZUlucHV0LFxuICBmb290ZXIsXG4gIGlucHV0UHJlZml4U3VmZml4LFxuICBtb2RhbCxcbiAgbmF2aWdhdGlvbixcbiAgcGFzc3dvcmQsXG4gIHNlYXJjaCxcbiAgc2tpcG5hdixcbiAgdGFibGUsXG4gIHRpbWVQaWNrZXIsXG4gIHRvb2x0aXAsXG4gIHZhbGlkYXRvcixcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXG4gIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBfcGFyYW1zKSB7XG4gICAgY29uc3QgcGFyYW1zID0gX3BhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KFxuICAgICAgZXZlbnQsXG4gICAgICBwYXJhbXMuYnViYmxlcyxcbiAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLFxuICAgICAgcGFyYW1zLmRldGFpbFxuICAgICk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xufSkoKTtcbiIsImNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxuaWYgKCEoSElEREVOIGluIGVscHJvdG8pKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbHByb3RvLCBISURERU4sIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZShcImNsYXNzbGlzdC1wb2x5ZmlsbFwiKTtcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGlkZGVuXG5yZXF1aXJlKFwiLi9lbGVtZW50LWhpZGRlblwiKTtcbi8vIHBvbHlmaWxscyBOdW1iZXIuaXNOYU4oKVxucmVxdWlyZShcIi4vbnVtYmVyLWlzLW5hblwiKTtcbi8vIHBvbHlmaWxscyBDdXN0b21FdmVudFxucmVxdWlyZShcIi4vY3VzdG9tLWV2ZW50XCIpO1xuLy8gcG9seWZpbGxzIHN2ZzRldmVyeWJvZHlcbnJlcXVpcmUoXCIuL3N2ZzRldmVyeWJvZHlcIik7XG4iLCJOdW1iZXIuaXNOYU4gPVxuICBOdW1iZXIuaXNOYU4gfHxcbiAgZnVuY3Rpb24gaXNOYU4oaW5wdXQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dCAhPT0gaW5wdXQ7XG4gIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuIShmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn0pKGZ1bmN0aW9uICgpIHtcbiAgLyohIHN2ZzRldmVyeWJvZHkgdjIuMS45IHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgZnVuY3Rpb24gZW1iZWQocGFyZW50LCBzdmcsIHRhcmdldCwgdXNlKSB7XG4gICAgLy8gaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAvLyBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIHRoZSBjb250ZW50cyBvZiB0aGUgdGFyZ2V0XG4gICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgIHZpZXdCb3ggPVxuICAgICAgICAgICFzdmcuaGFzQXR0cmlidXRlKFwidmlld0JveFwiKSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKTtcbiAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgIHZpZXdCb3ggJiYgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG4gICAgICAvLyBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgY2xvbmUgaW50byB0aGUgZnJhZ21lbnRcbiAgICAgIGZvciAoXG4gICAgICAgIC8vIGNsb25lIHRoZSB0YXJnZXRcbiAgICAgICAgdmFyIGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZVxuICAgICAgICAgICAgPyBkb2N1bWVudC5pbXBvcnROb2RlKHRhcmdldCwgITApXG4gICAgICAgICAgICA6IHRhcmdldC5jbG9uZU5vZGUoITApLFxuICAgICAgICAgIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICBzdmcubmFtZXNwYWNlVVJJIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICAgICAgICAgIFwiZ1wiXG4gICAgICAgICAgKTtcbiAgICAgICAgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICAgICkge1xuICAgICAgICBnLmFwcGVuZENoaWxkKGNsb25lLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgaWYgKHVzZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgdXNlLmF0dHJpYnV0ZXMubGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSB1c2UuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgICBcInhsaW5rOmhyZWZcIiAhPT0gYXR0ci5uYW1lICYmXG4gICAgICAgICAgICBcImhyZWZcIiAhPT0gYXR0ci5uYW1lICYmXG4gICAgICAgICAgICBnLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChnKSwgLy8gYXBwZW5kIHRoZSBmcmFnbWVudCBpbnRvIHRoZSBzdmdcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyLCB1c2UpIHtcbiAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICh4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gaWYgdGhlIHJlcXVlc3QgaXMgcmVhZHlcbiAgICAgIGlmICg0ID09PSB4aHIucmVhZHlTdGF0ZSkge1xuICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCBodG1sIGRvY3VtZW50XG4gICAgICAgIHZhciBjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQ7XG4gICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnQgYmFzZWQgb24gdGhlIHhociByZXNwb25zZVxuICAgICAgICBjYWNoZWREb2N1bWVudCB8fFxuICAgICAgICAgICgoY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSksXG4gICAgICAgICAgKGNhY2hlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dCksIC8vIGVuc3VyZSBkb21haW5zIGFyZSB0aGUgc2FtZSwgb3RoZXJ3aXNlIHdlJ2xsIGhhdmUgaXNzdWVzIGFwcGVuZGluZyB0aGVcbiAgICAgICAgICAvLyBlbGVtZW50IGluIElFIDExXG4gICAgICAgICAgY2FjaGVkRG9jdW1lbnQuZG9tYWluICE9PSBkb2N1bWVudC5kb21haW4gJiZcbiAgICAgICAgICAgIChjYWNoZWREb2N1bWVudC5kb21haW4gPSBkb2N1bWVudC5kb21haW4pLFxuICAgICAgICAgICh4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSksIC8vIGNsZWFyIHRoZSB4aHIgZW1iZWRzIGxpc3QgYW5kIGVtYmVkIGVhY2ggaXRlbVxuICAgICAgICAgIHhoci5fZW1iZWRzLnNwbGljZSgwKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgdGFyZ2V0XG4gICAgICAgICAgICB0YXJnZXQgfHxcbiAgICAgICAgICAgICAgKHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdID1cbiAgICAgICAgICAgICAgICBjYWNoZWREb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmlkKSksXG4gICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSB0YXJnZXQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgIGVtYmVkKGl0ZW0ucGFyZW50LCBpdGVtLnN2ZywgdGFyZ2V0LCB1c2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLCAvLyB0ZXN0IHRoZSByZWFkeSBzdGF0ZSBjaGFuZ2UgaW1tZWRpYXRlbHlcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UoKTtcbiAgfVxuICBmdW5jdGlvbiBzdmc0ZXZlcnlib2R5KHJhd29wdHMpIHtcbiAgICBmdW5jdGlvbiBvbmludGVydmFsKCkge1xuICAgICAgLy8gaWYgYWxsIDx1c2U+cyBpbiB0aGUgYXJyYXkgYXJlIGJlaW5nIGJ5cGFzc2VkLCBkb24ndCBwcm9jZWVkLlxuICAgICAgaWYgKFxuICAgICAgICBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgJiZcbiAgICAgICAgdXNlcy5sZW5ndGggLSBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPD0gMFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB2b2lkIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgICB9XG4gICAgICAvLyBpZiB0aGVyZSBhcmUgPHVzZT5zIHRvIHByb2Nlc3MsIHByb2NlZWQuXG4gICAgICAvLyByZXNldCB0aGUgYnlwYXNzIGNvdW50ZXIsIHNpbmNlIHRoZSBjb3VudGVyIHdpbGwgYmUgaW5jcmVtZW50ZWQgZm9yIGV2ZXJ5IGJ5cGFzc2VkIGVsZW1lbnQsXG4gICAgICAvLyBldmVuIG9uZXMgdGhhdCB3ZXJlIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID0gMDtcbiAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgZm9yIChcbiAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgPHVzZT4gaW5kZXhcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgaW5kZXggPCB1c2VzLmxlbmd0aDtcblxuICAgICAgKSB7XG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCA8dXNlPlxuICAgICAgICB2YXIgdXNlID0gdXNlc1tpbmRleF0sXG4gICAgICAgICAgcGFyZW50ID0gdXNlLnBhcmVudE5vZGUsXG4gICAgICAgICAgc3ZnID0gZ2V0U1ZHQW5jZXN0b3IocGFyZW50KSxcbiAgICAgICAgICBzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiKSB8fCB1c2UuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICghc3JjICYmXG4gICAgICAgICAgICBvcHRzLmF0dHJpYnV0ZU5hbWUgJiZcbiAgICAgICAgICAgIChzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKG9wdHMuYXR0cmlidXRlTmFtZSkpLFxuICAgICAgICAgIHN2ZyAmJiBzcmMpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlIHx8IG9wdHMudmFsaWRhdGUoc3JjLCBzdmcsIHVzZSkpIHtcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSA8dXNlPiBlbGVtZW50XG4gICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCh1c2UpO1xuICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc3JjIGFuZCBnZXQgdGhlIHVybCBhbmQgaWRcbiAgICAgICAgICAgICAgdmFyIHNyY1NwbGl0ID0gc3JjLnNwbGl0KFwiI1wiKSxcbiAgICAgICAgICAgICAgICB1cmwgPSBzcmNTcGxpdC5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIGlkID0gc3JjU3BsaXQuam9pbihcIiNcIik7XG4gICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgIGlmICh1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgeGhyIHJlcXVlc3RcbiAgICAgICAgICAgICAgICB2YXIgeGhyID0gcmVxdWVzdHNbdXJsXTtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIHhociByZXF1ZXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgIHhociB8fFxuICAgICAgICAgICAgICAgICAgKCh4aHIgPSByZXF1ZXN0c1t1cmxdID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkpLFxuICAgICAgICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsKSxcbiAgICAgICAgICAgICAgICAgIHhoci5zZW5kKCksXG4gICAgICAgICAgICAgICAgICAoeGhyLl9lbWJlZHMgPSBbXSkpLCAvLyBhZGQgdGhlIHN2ZyBhbmQgaWQgYXMgYW4gaXRlbSB0byB0aGUgeGhyIGVtYmVkcyBsaXN0XG4gICAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICB9KSwgLy8gcHJlcGFyZSB0aGUgeGhyIHJlYWR5IHN0YXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgICAgICAgbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyLCB1c2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSBsb2NhbCBpZCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICBlbWJlZChwYXJlbnQsIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLCB1c2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgKytpbmRleCwgKytudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICsraW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNvbnRpbnVlIHRoZSBpbnRlcnZhbFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICB9XG4gICAgdmFyIHBvbHlmaWxsLFxuICAgICAgb3B0cyA9IE9iamVjdChyYXdvcHRzKSxcbiAgICAgIG5ld2VySUVVQSA9IC9cXGJUcmlkZW50XFwvWzU2N11cXGJ8XFxiTVNJRSAoPzo5fDEwKVxcLjBcXGIvLFxuICAgICAgd2Via2l0VUEgPSAvXFxiQXBwbGVXZWJLaXRcXC8oXFxkKylcXGIvLFxuICAgICAgb2xkZXJFZGdlVUEgPSAvXFxiRWRnZVxcLzEyXFwuKFxcZCspXFxiLyxcbiAgICAgIGVkZ2VVQSA9IC9cXGJFZGdlXFwvLihcXGQrKVxcYi8sXG4gICAgICBpbklmcmFtZSA9IHdpbmRvdy50b3AgIT09IHdpbmRvdy5zZWxmO1xuICAgIHBvbHlmaWxsID1cbiAgICAgIFwicG9seWZpbGxcIiBpbiBvcHRzXG4gICAgICAgID8gb3B0cy5wb2x5ZmlsbFxuICAgICAgICA6IG5ld2VySUVVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XG4gICAgICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8XG4gICAgICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2god2Via2l0VUEpIHx8IFtdKVsxXSA8IDUzNyB8fFxuICAgICAgICAgIChlZGdlVUEudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiBpbklmcmFtZSk7XG4gICAgLy8gY3JlYXRlIHhociByZXF1ZXN0cyBvYmplY3RcbiAgICB2YXIgcmVxdWVzdHMgPSB7fSxcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dCxcbiAgICAgIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSxcbiAgICAgIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA9IDA7XG4gICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgIHBvbHlmaWxsICYmIG9uaW50ZXJ2YWwoKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRTVkdBbmNlc3Rvcihub2RlKSB7XG4gICAgZm9yIChcbiAgICAgIHZhciBzdmcgPSBub2RlO1xuICAgICAgXCJzdmdcIiAhPT0gc3ZnLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgKHN2ZyA9IHN2Zy5wYXJlbnROb2RlKTtcblxuICAgICkge31cbiAgICByZXR1cm4gc3ZnO1xuICB9XG4gIHJldHVybiBzdmc0ZXZlcnlib2R5O1xufSk7XG4iLCJjb25zdCBkb21yZWFkeSA9IHJlcXVpcmUoXCJkb21yZWFkeVwiKTtcblxud2luZG93LnVzd2RzUHJlc2VudCA9IHRydWU7IC8vIEdMT0JBTCB2YXJpYWJsZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c3dkcy5qcyBoYXMgbG9hZGVkIGluIHRoZSBET00uXG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGRlZmluZSBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmUgbWlzc2luZyBmcm9tXG4gKiBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoXCIuL3BvbHlmaWxsc1wiKTtcblxuY29uc3QgdXN3ZHMgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmNvbnN0IHN2ZzRldmVyeWJvZHkgPSByZXF1aXJlKFwiLi9wb2x5ZmlsbHMvc3ZnNGV2ZXJ5Ym9keVwiKTtcblxudXN3ZHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbmRvbXJlYWR5KCgpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgT2JqZWN0LmtleXMoY29tcG9uZW50cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgYmVoYXZpb3IgPSBjb21wb25lbnRzW2tleV07XG4gICAgYmVoYXZpb3Iub24odGFyZ2V0KTtcbiAgfSk7XG4gIHN2ZzRldmVyeWJvZHkoKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzd2RzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoaHRtbERvY3VtZW50ID0gZG9jdW1lbnQpID0+IGh0bWxEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCBCZWhhdmlvciA9IHJlcXVpcmUoXCJyZWNlcHRvci9iZWhhdmlvclwiKTtcblxuLyoqXG4gKiBAbmFtZSBzZXF1ZW5jZVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gc2VxIGFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybiB7IGNsb3N1cmUgfSBjYWxsSG9va3NcbiAqL1xuLy8gV2UgdXNlIGEgbmFtZWQgZnVuY3Rpb24gaGVyZSBiZWNhdXNlIHdlIHdhbnQgaXQgdG8gaW5oZXJpdCBpdHMgbGV4aWNhbCBzY29wZVxuLy8gZnJvbSB0aGUgYmVoYXZpb3IgcHJvcHMgb2JqZWN0LCBub3QgZnJvbSB0aGUgbW9kdWxlXG5jb25zdCBzZXF1ZW5jZSA9ICguLi5zZXEpID0+XG4gIGZ1bmN0aW9uIGNhbGxIb29rcyh0YXJnZXQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgc2VxLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzW21ldGhvZF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzW21ldGhvZF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4vKipcbiAqIEBuYW1lIGJlaGF2aW9yXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnRzXG4gKiBAcGFyYW0ge29iamVjdD99IHByb3BzXG4gKiBAcmV0dXJuIHtyZWNlcHRvci5iZWhhdmlvcn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZXZlbnRzLCBwcm9wcykgPT5cbiAgQmVoYXZpb3IoXG4gICAgZXZlbnRzLFxuICAgIGFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgb246IHNlcXVlbmNlKFwiaW5pdFwiLCBcImFkZFwiKSxcbiAgICAgICAgb2ZmOiBzZXF1ZW5jZShcInRlYXJkb3duXCIsIFwicmVtb3ZlXCIpLFxuICAgICAgfSxcbiAgICAgIHByb3BzXG4gICAgKVxuICApO1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCB7IGtleW1hcCB9ID0gcmVxdWlyZShcInJlY2VwdG9yXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi9hY3RpdmUtZWxlbWVudFwiKTtcblxuY29uc3QgRk9DVVNBQkxFID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcblxuY29uc3QgdGFiSGFuZGxlciA9IChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KEZPQ1VTQUJMRSwgY29udGV4dCk7XG4gIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWzBdO1xuICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gIC8vIFNwZWNpYWwgcnVsZXMgZm9yIHdoZW4gdGhlIHVzZXIgaXMgdGFiYmluZyBmb3J3YXJkIGZyb20gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQsXG4gIC8vIG9yIHdoZW4gdGFiYmluZyBiYWNrd2FyZHMgZnJvbSB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnRcbiAgZnVuY3Rpb24gdGFiQWhlYWQoZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRhYkJhY2soZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgICAvLyBUaGlzIGNoZWNrcyBpZiB5b3Ugd2FudCB0byBzZXQgdGhlIGluaXRpYWwgZm9jdXMgdG8gYSBjb250YWluZXJcbiAgICAvLyBpbnN0ZWFkIG9mIGFuIGVsZW1lbnQgd2l0aGluLCBhbmQgdGhlIHVzZXIgdGFicyBiYWNrLlxuICAgIC8vIFRoZW4gd2Ugc2V0IHRoZSBmb2N1cyB0byB0aGUgZmlyc3RcbiAgICBlbHNlIGlmICghZm9jdXNhYmxlRWxlbWVudHMuaW5jbHVkZXMoYWN0aXZlRWxlbWVudCgpKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RUYWJTdG9wLFxuICAgIGxhc3RUYWJTdG9wLFxuICAgIHRhYkFoZWFkLFxuICAgIHRhYkJhY2ssXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250ZXh0LCBhZGRpdGlvbmFsS2V5QmluZGluZ3MgPSB7fSkgPT4ge1xuICBjb25zdCB0YWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKGNvbnRleHQpO1xuICBjb25zdCBiaW5kaW5ncyA9IGFkZGl0aW9uYWxLZXlCaW5kaW5ncztcbiAgY29uc3QgeyBFc2MsIEVzY2FwZSB9ID0gYmluZGluZ3M7XG5cbiAgaWYgKEVzY2FwZSAmJiAhRXNjKSBiaW5kaW5ncy5Fc2MgPSBFc2NhcGU7XG5cbiAgLy8gIFRPRE86IEluIHRoZSBmdXR1cmUsIGxvb3Agb3ZlciBhZGRpdGlvbmFsIGtleWJpbmRpbmdzIGFuZCBwYXNzIGFuIGFycmF5XG4gIC8vIG9mIGZ1bmN0aW9ucywgaWYgbmVjZXNzYXJ5LCB0byB0aGUgbWFwIGtleXMuIFRoZW4gcGVvcGxlIGltcGxlbWVudGluZ1xuICAvLyB0aGUgZm9jdXMgdHJhcCBjb3VsZCBwYXNzIGNhbGxiYWNrcyB0byBmaXJlIHdoZW4gdGFiYmluZ1xuICBjb25zdCBrZXlNYXBwaW5ncyA9IGtleW1hcChcbiAgICBhc3NpZ24oXG4gICAgICB7XG4gICAgICAgIFRhYjogdGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgICBcIlNoaWZ0K1RhYlwiOiB0YWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsS2V5QmluZGluZ3NcbiAgICApXG4gICk7XG5cbiAgY29uc3QgZm9jdXNUcmFwID0gYmVoYXZpb3IoXG4gICAge1xuICAgICAga2V5ZG93bjoga2V5TWFwcGluZ3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBpbml0KCkge1xuICAgICAgICAvLyBUT0RPOiBpcyB0aGlzIGRlc2lyZWFibGUgYmVoYXZpb3I/IFNob3VsZCB0aGUgdHJhcCBhbHdheXMgZG8gdGhpcyBieSBkZWZhdWx0IG9yIHNob3VsZFxuICAgICAgICAvLyB0aGUgY29tcG9uZW50IGdldHRpbmcgZGVjb3JhdGVkIGhhbmRsZSB0aGlzP1xuICAgICAgICBpZiAodGFiRXZlbnRIYW5kbGVyLmZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgIHRhYkV2ZW50SGFuZGxlci5maXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZShpc0FjdGl2ZSkge1xuICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLm9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGZvY3VzVHJhcDtcbn07XG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1NzQzM1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChcbiAgZWwsXG4gIHdpbiA9IHdpbmRvdyxcbiAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbikge1xuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiLy8gaU9TIGRldGVjdGlvbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MDM5ODg1LzE3NzcxMFxuZnVuY3Rpb24gaXNJb3NEZXZpY2UoKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBvZHxpUGhvbmV8aVBhZCkvZykgfHxcbiAgICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSkgJiZcbiAgICAhd2luZG93Lk1TU3RyZWFtXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJb3NEZXZpY2U7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuXG4vKipcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gaGVscCB5b3UgZXNjYXBlIEhUTUwgdXNpbmcgdGVtcGxhdGUgc3RyaW5ncy5cbiAqXG4gKiBJdCdzIHRoZSBjb3VudGVycGFydCB0byBvdXIgZXNsaW50IFwibm8tdW5zYWZlLWlubmVyaHRtbFwiIHBsdWdpbiB0aGF0IGhlbHBzIHVzXG4gKiBhdm9pZCB1bnNhZmUgY29kaW5nIHByYWN0aWNlcy5cbiAqIEEgZnVsbCB3cml0ZS11cCBvZiB0aGUgSG93cyBhbmQgV2h5cyBhcmUgZG9jdW1lbnRlZFxuICogZm9yIGRldmVsb3BlcnMgYXRcbiAqICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9GaXJlZm94X09TL1NlY3VyaXR5L1NlY3VyaXR5X0F1dG9tYXRpb25cbiAqIHdpdGggYWRkaXRpb25hbCBiYWNrZ3JvdW5kIGluZm9ybWF0aW9uIGFuZCBkZXNpZ24gZG9jcyBhdFxuICogIGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9Vc2VyOkZicmF1bi9HYWlhL1NhZmVpbm5lckhUTUxSb2FkbWFwXG4gKlxuICovXG5cbiEoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59KShmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgU2FuaXRpemVyID0ge1xuICAgIF9lbnRpdHk6IC9bJjw+XCInL10vZyxcblxuICAgIF9lbnRpdGllczoge1xuICAgICAgJyYnOiAnJmFtcDsnLFxuICAgICAgJzwnOiAnJmx0OycsXG4gICAgICAnPic6ICcmZ3Q7JyxcbiAgICAgICdcIic6ICcmcXVvdDsnLFxuICAgICAgJ1xcJyc6ICcmYXBvczsnLFxuICAgICAgJy8nOiAnJiN4MkY7J1xuICAgIH0sXG5cbiAgICBnZXRFbnRpdHk6IGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gU2FuaXRpemVyLl9lbnRpdGllc1tzXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBIVE1MIGZvciBhbGwgdmFsdWVzIGluIGEgdGFnZ2VkIHRlbXBsYXRlIHN0cmluZy5cbiAgICAgKi9cbiAgICBlc2NhcGVIVE1MOiBmdW5jdGlvbiAoc3RyaW5ncykge1xuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpICsgMSA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbaSArIDFdIHx8ICcnO1xuICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcodmFsdWUpLnJlcGxhY2UoU2FuaXRpemVyLl9lbnRpdHksXG4gICAgICAgICAgICBTYW5pdGl6ZXIuZ2V0RW50aXR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBIVE1MIGFuZCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdG8gYmUgdXNlZCBkdXJpbmcgRE9NIGluc2VydGlvblxuICAgICAqL1xuICAgIGNyZWF0ZVNhZmVIVE1MOiBmdW5jdGlvbiAoc3RyaW5ncykge1xuICAgICAgdmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCk7XG4gICAgICBmb3IgKHZhciBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICB2YWx1ZXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgZXNjYXBlZCA9IFNhbml0aXplci5lc2NhcGVIVE1MLmFwcGx5KFNhbml0aXplcixcbiAgICAgICAgW3N0cmluZ3NdLmNvbmNhdCh2YWx1ZXMpKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIF9faHRtbDogZXNjYXBlZCxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ1tvYmplY3QgV3JhcHBlZEhUTUxPYmplY3RdJztcbiAgICAgICAgfSxcbiAgICAgICAgaW5mbzogJ1RoaXMgaXMgYSB3cmFwcGVkIEhUTUwgb2JqZWN0LiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcicrXG4gICAgICAgICAgJ2cvZW4tVVMvRmlyZWZveF9PUy9TZWN1cml0eS9TZWN1cml0eV9BdXRvbWF0aW9uIGZvciBtb3JlLidcbiAgICAgIH07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVbndyYXAgc2FmZSBIVE1MIGNyZWF0ZWQgYnkgY3JlYXRlU2FmZUhUTUwgb3IgYSBjdXN0b20gcmVwbGFjZW1lbnQgdGhhdFxuICAgICAqIHVuZGVyd2VudCBzZWN1cml0eSByZXZpZXcuXG4gICAgICovXG4gICAgdW53cmFwU2FmZUhUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBodG1sT2JqZWN0cyA9IG5ldyBBcnJheShfbGVuKTtcbiAgICAgIGZvciAodmFyIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGh0bWxPYmplY3RzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWFya3VwTGlzdCA9IGh0bWxPYmplY3RzLm1hcChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5fX2h0bWw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXJrdXBMaXN0LmpvaW4oJycpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2FuaXRpemVyO1xuXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKSB7XG4gIC8vIENyZWF0aW5nIGludmlzaWJsZSBjb250YWluZXJcbiAgY29uc3Qgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnOyAvLyBmb3JjaW5nIHNjcm9sbGJhciB0byBhcHBlYXJcbiAgb3V0ZXIuc3R5bGUubXNPdmVyZmxvd1N0eWxlID0gJ3Njcm9sbGJhcic7IC8vIG5lZWRlZCBmb3IgV2luSlMgYXBwc1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICAvLyBDcmVhdGluZyBpbm5lciBlbGVtZW50IGFuZCBwbGFjaW5nIGl0IGluIHRoZSBjb250YWluZXJcbiAgY29uc3QgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuICBcbiAgLy8gQ2FsY3VsYXRpbmcgZGlmZmVyZW5jZSBiZXR3ZWVuIGNvbnRhaW5lcidzIGZ1bGwgd2lkdGggYW5kIHRoZSBjaGlsZCB3aWR0aFxuICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IGAkeyhvdXRlci5vZmZzZXRXaWR0aCAtIGlubmVyLm9mZnNldFdpZHRoKX1weGA7XG5cbiAgLy8gUmVtb3ZpbmcgdGVtcG9yYXJ5IGVsZW1lbnRzIGZyb20gdGhlIERPTVxuICBvdXRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG91dGVyKTtcblxuICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG59O1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4vc2VsZWN0XCIpO1xuLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdE9yTWF0Y2hlc1xuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChzZWxlY3RvciwgY29udGV4dCkgPT4ge1xuICBjb25zdCBzZWxlY3Rpb24gPSBzZWxlY3Qoc2VsZWN0b3IsIGNvbnRleHQpO1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxuXG4gIGlmIChpc0VsZW1lbnQoY29udGV4dCkgJiYgY29udGV4dC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgIHNlbGVjdGlvbi5wdXNoKGNvbnRleHQpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGVjdGlvbjtcbn07XG4iLCIvKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0XG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKHNlbGVjdG9yLCBjb250ZXh0KSA9PiB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoIWNvbnRleHQgfHwgIWlzRWxlbWVudChjb250ZXh0KSkge1xuICAgIGNvbnRleHQgPSB3aW5kb3cuZG9jdW1lbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGlvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzZWxlY3Rpb24pO1xufTtcbiIsIi8qKlxuICogRmxpcHMgZ2l2ZW4gSU5QVVQgZWxlbWVudHMgYmV0d2VlbiBtYXNrZWQgKGhpZGluZyB0aGUgZmllbGQgdmFsdWUpIGFuZCB1bm1hc2tlZFxuICogQHBhcmFtIHtBcnJheS5IVE1MRWxlbWVudH0gZmllbGRzIC0gQW4gYXJyYXkgb2YgSU5QVVQgZWxlbWVudHNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFzayAtIFdoZXRoZXIgdGhlIG1hc2sgc2hvdWxkIGJlIGFwcGxpZWQsIGhpZGluZyB0aGUgZmllbGQgdmFsdWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZmllbGQsIG1hc2spID0+IHtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwiYXV0b2NhcGl0YWxpemVcIiwgXCJvZmZcIik7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcImF1dG9jb3JyZWN0XCIsIFwib2ZmXCIpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIG1hc2sgPyBcInBhc3N3b3JkXCIgOiBcInRleHRcIik7XG59O1xuIiwiY29uc3QgcmVzb2x2ZUlkUmVmcyA9IHJlcXVpcmUoXCJyZXNvbHZlLWlkLXJlZnNcIik7XG5jb25zdCB0b2dnbGVGaWVsZE1hc2sgPSByZXF1aXJlKFwiLi90b2dnbGUtZmllbGQtbWFza1wiKTtcblxuY29uc3QgQ09OVFJPTFMgPSBcImFyaWEtY29udHJvbHNcIjtcbmNvbnN0IFBSRVNTRUQgPSBcImFyaWEtcHJlc3NlZFwiO1xuY29uc3QgU0hPV19BVFRSID0gXCJkYXRhLXNob3ctdGV4dFwiO1xuY29uc3QgSElERV9BVFRSID0gXCJkYXRhLWhpZGUtdGV4dFwiO1xuXG4vKipcbiAqIFJlcGxhY2UgdGhlIHdvcmQgXCJTaG93XCIgKG9yIFwic2hvd1wiKSB3aXRoIFwiSGlkZVwiIChvciBcImhpZGVcIikgaW4gYSBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2hvd1RleHRcbiAqIEByZXR1cm4ge3N0cm9uZ30gaGlkZVRleHRcbiAqL1xuY29uc3QgZ2V0SGlkZVRleHQgPSAoc2hvd1RleHQpID0+XG4gIHNob3dUZXh0LnJlcGxhY2UoL1xcYlNob3dcXGIvaSwgKHNob3cpID0+IGAke3Nob3dbMF0gPT09IFwiU1wiID8gXCJIXCIgOiBcImhcIn1pZGVgKTtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBkZWNvcmF0ZXMgYW4gSFRNTCBlbGVtZW50IHdpdGggdGhlIGFiaWxpdHkgdG8gdG9nZ2xlIHRoZVxuICogbWFza2VkIHN0YXRlIG9mIGFuIGlucHV0IGZpZWxkIChsaWtlIGEgcGFzc3dvcmQpIHdoZW4gY2xpY2tlZC5cbiAqIFRoZSBpZHMgb2YgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWQgd2lsbCBiZSBwdWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgYnV0dG9uJ3NcbiAqIGBhcmlhLWNvbnRyb2xzYCBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsICAgIFBhcmVudCBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGZpZWxkcyB0byBiZSBtYXNrZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGVsKSA9PiB7XG4gIC8vIHRoaXMgaXMgdGhlICp0YXJnZXQqIHN0YXRlOlxuICAvLyAqIGlmIHRoZSBlbGVtZW50IGhhcyB0aGUgYXR0ciBhbmQgaXQncyAhPT0gXCJ0cnVlXCIsIHByZXNzZWQgaXMgdHJ1ZVxuICAvLyAqIG90aGVyd2lzZSwgcHJlc3NlZCBpcyBmYWxzZVxuICBjb25zdCBwcmVzc2VkID1cbiAgICBlbC5oYXNBdHRyaWJ1dGUoUFJFU1NFRCkgJiYgZWwuZ2V0QXR0cmlidXRlKFBSRVNTRUQpICE9PSBcInRydWVcIjtcblxuICBjb25zdCBmaWVsZHMgPSByZXNvbHZlSWRSZWZzKGVsLmdldEF0dHJpYnV0ZShDT05UUk9MUykpO1xuICBmaWVsZHMuZm9yRWFjaCgoZmllbGQpID0+IHRvZ2dsZUZpZWxkTWFzayhmaWVsZCwgcHJlc3NlZCkpO1xuXG4gIGlmICghZWwuaGFzQXR0cmlidXRlKFNIT1dfQVRUUikpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoU0hPV19BVFRSLCBlbC50ZXh0Q29udGVudCk7XG4gIH1cblxuICBjb25zdCBzaG93VGV4dCA9IGVsLmdldEF0dHJpYnV0ZShTSE9XX0FUVFIpO1xuICBjb25zdCBoaWRlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShISURFX0FUVFIpIHx8IGdldEhpZGVUZXh0KHNob3dUZXh0KTtcblxuICBlbC50ZXh0Q29udGVudCA9IHByZXNzZWQgPyBzaG93VGV4dCA6IGhpZGVUZXh0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGVsLnNldEF0dHJpYnV0ZShQUkVTU0VELCBwcmVzc2VkKTtcbiAgcmV0dXJuIHByZXNzZWQ7XG59O1xuIiwiY29uc3QgRVhQQU5ERUQgPSBcImFyaWEtZXhwYW5kZWRcIjtcbmNvbnN0IENPTlRST0xTID0gXCJhcmlhLWNvbnRyb2xzXCI7XG5jb25zdCBISURERU4gPSBcImhpZGRlblwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIGxldCBzYWZlRXhwYW5kZWQgPSBleHBhbmRlZDtcblxuICBpZiAodHlwZW9mIHNhZmVFeHBhbmRlZCAhPT0gXCJib29sZWFuXCIpIHtcbiAgICBzYWZlRXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJmYWxzZVwiO1xuICB9XG5cbiAgYnV0dG9uLnNldEF0dHJpYnV0ZShFWFBBTkRFRCwgc2FmZUV4cGFuZGVkKTtcblxuICBjb25zdCBpZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpO1xuICBjb25zdCBjb250cm9scyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgaWYgKCFjb250cm9scykge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdG9nZ2xlIHRhcmdldCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIGlmIChzYWZlRXhwYW5kZWQpIHtcbiAgICBjb250cm9scy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgfSBlbHNlIHtcbiAgICBjb250cm9scy5zZXRBdHRyaWJ1dGUoSElEREVOLCBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlRXhwYW5kZWQ7XG59O1xuIiwiY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hFQ0tFRCA9IFwiYXJpYS1jaGVja2VkXCI7XG5jb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7UFJFRklYfS1jaGVja2xpc3RfX2l0ZW0tLWNoZWNrZWRgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRlKGVsKSB7XG4gIGNvbnN0IGlkID0gZWwuZGF0YXNldC52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID1cbiAgICBpZC5jaGFyQXQoMCkgPT09IFwiI1wiXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgT2JqZWN0LmVudHJpZXMoZWwuZGF0YXNldCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKFwidmFsaWRhdGVcIikpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKFwidmFsaWRhdGVcIi5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuXG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKENIRUNLRUQsIGNoZWNrZWQpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
