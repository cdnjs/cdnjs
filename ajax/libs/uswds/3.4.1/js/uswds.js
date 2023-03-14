(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2014-07-23
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

/* Copied from MDN:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */

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
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        ,
        DOMEx = function (type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        },
        checkTokenAndGetIndex = function (classList, token) {
          if (token === "") {
            throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
          }
          if (/\s/.test(token)) {
            throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
          }
          return arrIndexOf.call(classList, token);
        },
        ClassList = function (elem) {
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
        classListGetter = function () {
          return new ClassList(this);
        };
      // Most DOMException implementations don't allow calling DOMException's toString()
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
          if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    })(window.self);
  } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
      "use strict";

      var testElement = document.createElement("_");
      testElement.classList.add("c1", "c2");

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.
      if (!testElement.classList.contains("c2")) {
        var createMethod = function (method) {
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
      testElement.classList.toggle("c3", false);

      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
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
}

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
  };

  // Function keys (F1-24).
  var i;
  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  }

  // Printable ASCII characters.
  var letter = '';
  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }
  function polyfill() {
    if (!('KeyboardEvent' in window) || 'key' in KeyboardEvent.prototype) {
      return false;
    }

    // Polyfill `key` on `KeyboardEvent`.
    var proto = {
      get: function (x) {
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

},{}],4:[function(require,module,exports){
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
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
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

},{}],5:[function(require,module,exports){
"use strict";

const assign = require('object-assign');
const delegate = require('../delegate');
const delegateAll = require('../delegateAll');
const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/;
const SPACE = ' ';
const getListeners = function (type, handler) {
  var match = type.match(DELEGATE_PATTERN);
  var selector;
  if (match) {
    type = match[1];
    selector = match[2];
  }
  var options;
  if (typeof handler === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    };
  }
  var listener = {
    selector: selector,
    delegate: typeof handler === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler,
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
var popKey = function (obj, key) {
  var value = obj[key];
  delete obj[key];
  return value;
};
module.exports = function behavior(events, props) {
  const listeners = Object.keys(events).reduce(function (memo, type) {
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

},{"../delegate":7,"../delegateAll":8,"object-assign":4}],6:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],7:[function(require,module,exports){
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

},{"element-closest":2}],8:[function(require,module,exports){
"use strict";

const delegate = require('../delegate');
const compose = require('../compose');
const SPLAT = '*';
module.exports = function delegateAll(selectors) {
  const keys = Object.keys(selectors);

  // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler
  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT];
  }
  const delegates = keys.reduce(function (memo, selector) {
    memo.push(delegate(selector, selectors[selector]));
    return memo;
  }, []);
  return compose(delegates);
};

},{"../compose":6,"../delegate":7}],9:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],10:[function(require,module,exports){
"use strict";

module.exports = {
  behavior: require('./behavior'),
  delegate: require('./delegate'),
  delegateAll: require('./delegateAll'),
  ignore: require('./ignore'),
  keymap: require('./keymap')
};

},{"./behavior":5,"./delegate":7,"./delegateAll":8,"./ignore":9,"./keymap":11}],11:[function(require,module,exports){
"use strict";

require('keyboardevent-key-polyfill');

// these are the only relevant modifiers supported on all platforms,
// according to MDN:
// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>
const MODIFIERS = {
  'Alt': 'altKey',
  'Control': 'ctrlKey',
  'Ctrl': 'ctrlKey',
  'Shift': 'shiftKey'
};
const MODIFIER_SEPARATOR = '+';
const getEventKey = function (event, hasModifiers) {
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
  const hasModifiers = Object.keys(keys).some(function (key) {
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

},{"keyboardevent-key-polyfill":3}],12:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],13:[function(require,module,exports){
'use strict';

var RE_TRIM = /(^\s+)|(\s+$)/g;
var RE_SPLIT = /\s+/;
var trim = String.prototype.trim ? function (str) {
  return str.trim();
} : function (str) {
  return str.replace(RE_TRIM, '');
};
var queryById = function (id) {
  return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
};
module.exports = function resolveIds(ids, doc) {
  if (typeof ids !== 'string') {
    throw new Error('Expected a string but got ' + typeof ids);
  }
  if (!doc) {
    doc = window.document;
  }
  var getElementById = doc.getElementById ? doc.getElementById.bind(doc) : queryById.bind(doc);
  ids = trim(ids).split(RE_SPLIT);

  // XXX we can short-circuit here because trimming and splitting a
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

},{}],14:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const toggleFormInput = require("../../uswds-core/src/js/utils/toggle-form-input");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const LINK = `.${PREFIX}-show-password`;
function toggle(event) {
  event.preventDefault();
  toggleFormInput(this);
}
module.exports = behavior({
  [CLICK]: {
    [LINK]: toggle
  }
});

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/toggle-form-input":55}],15:[function(require,module,exports){
"use strict";

const select = require("../../uswds-core/src/js/utils/select");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const toggle = require("../../uswds-core/src/js/utils/toggle");
const isElementInViewport = require("../../uswds-core/src/js/utils/is-in-viewport");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const ACCORDION = `.${PREFIX}-accordion, .${PREFIX}-accordion--bordered`;
const BUTTON = `.${PREFIX}-accordion__button[aria-controls]`;
const EXPANDED = "aria-expanded";
const MULTISELECTABLE = "data-allow-multiple";

/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param {HTMLElement} accordion
 * @return {array<HTMLButtonElement>}
 */
const getAccordionButtons = accordion => {
  const buttons = select(BUTTON, accordion);
  return buttons.filter(button => button.closest(ACCORDION) === accordion);
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
const toggleButton = (button, expanded) => {
  const accordion = button.closest(ACCORDION);
  let safeExpanded = expanded;
  if (!accordion) {
    throw new Error(`${BUTTON} is missing outer ${ACCORDION}`);
  }
  safeExpanded = toggle(button, expanded);

  // XXX multiselectable is opt-in, to preserve legacy behavior
  const multiselectable = accordion.hasAttribute(MULTISELECTABLE);
  if (safeExpanded && !multiselectable) {
    getAccordionButtons(accordion).forEach(other => {
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
const showButton = button => toggleButton(button, true);

/**
 * @param {HTMLButtonElement} button
 * @return {boolean} false
 */
const hideButton = button => toggleButton(button, false);
const accordion = behavior({
  [CLICK]: {
    [BUTTON]() {
      toggleButton(this);
      if (this.getAttribute(EXPANDED) === "true") {
        // We were just expanded, but if another accordion was also just
        // collapsed, we may no longer be in the viewport. This ensures
        // that we are still visible, so the user isn't confused.
        if (!isElementInViewport(this)) this.scrollIntoView();
      }
    }
  }
}, {
  init(root) {
    select(BUTTON, root).forEach(button => {
      const expanded = button.getAttribute(EXPANDED) === "true";
      toggleButton(button, expanded);
    });
  },
  ACCORDION,
  BUTTON,
  show: showButton,
  hide: hideButton,
  toggle: toggleButton,
  getButtons: getAccordionButtons
});
module.exports = accordion;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/is-in-viewport":48,"../../uswds-core/src/js/utils/select":53,"../../uswds-core/src/js/utils/toggle":56}],16:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const HEADER = `.${PREFIX}-banner__header`;
const EXPANDED_CLASS = `${PREFIX}-banner__header--expanded`;
const toggleBanner = function toggleEl(event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};
module.exports = behavior({
  [CLICK]: {
    [`${HEADER} [aria-controls]`]: toggleBanner
  }
});

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45}],17:[function(require,module,exports){
"use strict";

const select = require("../../uswds-core/src/js/utils/select");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const debounce = require("../../uswds-core/src/js/utils/debounce");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const CHARACTER_COUNT_CLASS = `${PREFIX}-character-count`;
const CHARACTER_COUNT = `.${CHARACTER_COUNT_CLASS}`;
const INPUT = `.${PREFIX}-character-count__field`;
const MESSAGE = `.${PREFIX}-character-count__message`;
const VALIDATION_MESSAGE = "The content is too long.";
const MESSAGE_INVALID_CLASS = `${PREFIX}-character-count__status--invalid`;
const STATUS_MESSAGE_CLASS = `${CHARACTER_COUNT_CLASS}__status`;
const STATUS_MESSAGE_SR_ONLY_CLASS = `${CHARACTER_COUNT_CLASS}__sr-status`;
const STATUS_MESSAGE = `.${STATUS_MESSAGE_CLASS}`;
const STATUS_MESSAGE_SR_ONLY = `.${STATUS_MESSAGE_SR_ONLY_CLASS}`;
const DEFAULT_STATUS_LABEL = `characters allowed`;

/**
 * Returns the root and message element for an character count input
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 * @returns {CharacterCountElements} elements The root and message element.
 */
const getCharacterCountElements = inputEl => {
  const characterCountEl = inputEl.closest(CHARACTER_COUNT);
  if (!characterCountEl) {
    throw new Error(`${INPUT} is missing outer ${CHARACTER_COUNT}`);
  }
  const messageEl = characterCountEl.querySelector(MESSAGE);
  if (!messageEl) {
    throw new Error(`${CHARACTER_COUNT} is missing inner ${MESSAGE}`);
  }
  return {
    characterCountEl,
    messageEl
  };
};

/**
 * Move maxlength attribute to a data attribute on usa-character-count
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 */
const setDataLength = inputEl => {
  const {
    characterCountEl
  } = getCharacterCountElements(inputEl);
  const maxlength = inputEl.getAttribute("maxlength");
  if (!maxlength) return;
  inputEl.removeAttribute("maxlength");
  characterCountEl.setAttribute("data-maxlength", maxlength);
};

/**
 * Create and append status messages for visual and screen readers
 *
 * @param {HTMLDivElement} characterCountEl - Div with `.usa-character-count` class
 * @description  Create two status messages for number of characters left;
 * one visual status and another for screen readers
 */
const createStatusMessages = characterCountEl => {
  const statusMessage = document.createElement("div");
  const srStatusMessage = document.createElement("div");
  const maxLength = characterCountEl.dataset.maxlength;
  const defaultMessage = `${maxLength} ${DEFAULT_STATUS_LABEL}`;
  statusMessage.classList.add(`${STATUS_MESSAGE_CLASS}`, "usa-hint");
  srStatusMessage.classList.add(`${STATUS_MESSAGE_SR_ONLY_CLASS}`, "usa-sr-only");
  statusMessage.setAttribute("aria-hidden", true);
  srStatusMessage.setAttribute("aria-live", "polite");
  statusMessage.textContent = defaultMessage;
  srStatusMessage.textContent = defaultMessage;
  characterCountEl.append(statusMessage, srStatusMessage);
};

/**
 * Returns message with how many characters are left
 *
 * @param {number} currentLength - The number of characters used
 * @param {number} maxLength - The total number of characters allowed
 * @returns {string} A string description of how many characters are left
 */
const getCountMessage = (currentLength, maxLength) => {
  let newMessage = "";
  if (currentLength === 0) {
    newMessage = `${maxLength} ${DEFAULT_STATUS_LABEL}`;
  } else {
    const difference = Math.abs(maxLength - currentLength);
    const characters = `character${difference === 1 ? "" : "s"}`;
    const guidance = currentLength > maxLength ? "over limit" : "left";
    newMessage = `${difference} ${characters} ${guidance}`;
  }
  return newMessage;
};

/**
 * Updates the character count status for screen readers after a 1000ms delay.
 *
 * @param {HTMLElement} msgEl - The screen reader status message element
 * @param {string} statusMessage - A string of the current character status
 */
const srUpdateStatus = debounce((msgEl, statusMessage) => {
  const srStatusMessage = msgEl;
  srStatusMessage.textContent = statusMessage;
}, 1000);

/**
 * Update the character count component
 *
 * @description On input, it will update visual status, screenreader
 * status and update input validation (if over character length)
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 */
const updateCountMessage = inputEl => {
  const {
    characterCountEl
  } = getCharacterCountElements(inputEl);
  const currentLength = inputEl.value.length;
  const maxLength = parseInt(characterCountEl.getAttribute("data-maxlength"), 10);
  const statusMessage = characterCountEl.querySelector(STATUS_MESSAGE);
  const srStatusMessage = characterCountEl.querySelector(STATUS_MESSAGE_SR_ONLY);
  const currentStatusMessage = getCountMessage(currentLength, maxLength);
  if (!maxLength) return;
  const isOverLimit = currentLength && currentLength > maxLength;
  statusMessage.textContent = currentStatusMessage;
  srUpdateStatus(srStatusMessage, currentStatusMessage);
  if (isOverLimit && !inputEl.validationMessage) {
    inputEl.setCustomValidity(VALIDATION_MESSAGE);
  }
  if (!isOverLimit && inputEl.validationMessage === VALIDATION_MESSAGE) {
    inputEl.setCustomValidity("");
  }
  statusMessage.classList.toggle(MESSAGE_INVALID_CLASS, isOverLimit);
};

/**
 * Initialize component
 *
 * @description On init this function will create elements and update any
 * attributes so it can tell the user how many characters are left.
 * @param  {HTMLInputElement|HTMLTextAreaElement} inputEl the components input
 */
const enhanceCharacterCount = inputEl => {
  const {
    characterCountEl,
    messageEl
  } = getCharacterCountElements(inputEl);

  // Hide hint and remove aria-live for backwards compatibility
  messageEl.classList.add("usa-sr-only");
  messageEl.removeAttribute("aria-live");
  setDataLength(inputEl);
  createStatusMessages(characterCountEl);
};
const characterCount = behavior({
  input: {
    [INPUT]() {
      updateCountMessage(this);
    }
  }
}, {
  init(root) {
    select(INPUT, root).forEach(input => enhanceCharacterCount(input));
  },
  MESSAGE_INVALID_CLASS,
  VALIDATION_MESSAGE,
  STATUS_MESSAGE_CLASS,
  STATUS_MESSAGE_SR_ONLY_CLASS,
  DEFAULT_STATUS_LABEL,
  createStatusMessages,
  getCountMessage,
  updateCountMessage
});
module.exports = characterCount;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/debounce":46,"../../uswds-core/src/js/utils/select":53}],18:[function(require,module,exports){
"use strict";

const keymap = require("receptor/keymap");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const Sanitizer = require("../../uswds-core/src/js/utils/sanitizer");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const COMBO_BOX_CLASS = `${PREFIX}-combo-box`;
const COMBO_BOX_PRISTINE_CLASS = `${COMBO_BOX_CLASS}--pristine`;
const SELECT_CLASS = `${COMBO_BOX_CLASS}__select`;
const INPUT_CLASS = `${COMBO_BOX_CLASS}__input`;
const CLEAR_INPUT_BUTTON_CLASS = `${COMBO_BOX_CLASS}__clear-input`;
const CLEAR_INPUT_BUTTON_WRAPPER_CLASS = `${CLEAR_INPUT_BUTTON_CLASS}__wrapper`;
const INPUT_BUTTON_SEPARATOR_CLASS = `${COMBO_BOX_CLASS}__input-button-separator`;
const TOGGLE_LIST_BUTTON_CLASS = `${COMBO_BOX_CLASS}__toggle-list`;
const TOGGLE_LIST_BUTTON_WRAPPER_CLASS = `${TOGGLE_LIST_BUTTON_CLASS}__wrapper`;
const LIST_CLASS = `${COMBO_BOX_CLASS}__list`;
const LIST_OPTION_CLASS = `${COMBO_BOX_CLASS}__list-option`;
const LIST_OPTION_FOCUSED_CLASS = `${LIST_OPTION_CLASS}--focused`;
const LIST_OPTION_SELECTED_CLASS = `${LIST_OPTION_CLASS}--selected`;
const STATUS_CLASS = `${COMBO_BOX_CLASS}__status`;
const COMBO_BOX = `.${COMBO_BOX_CLASS}`;
const SELECT = `.${SELECT_CLASS}`;
const INPUT = `.${INPUT_CLASS}`;
const CLEAR_INPUT_BUTTON = `.${CLEAR_INPUT_BUTTON_CLASS}`;
const TOGGLE_LIST_BUTTON = `.${TOGGLE_LIST_BUTTON_CLASS}`;
const LIST = `.${LIST_CLASS}`;
const LIST_OPTION = `.${LIST_OPTION_CLASS}`;
const LIST_OPTION_FOCUSED = `.${LIST_OPTION_FOCUSED_CLASS}`;
const LIST_OPTION_SELECTED = `.${LIST_OPTION_SELECTED_CLASS}`;
const STATUS = `.${STATUS_CLASS}`;
const DEFAULT_FILTER = ".*{{query}}.*";
const noop = () => {};

/**
 * set the value of the element and dispatch a change event
 *
 * @param {HTMLInputElement|HTMLSelectElement} el The element to update
 * @param {string} value The new value of the element
 */
const changeElementValue = function (el) {
  let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  const elementToChange = el;
  elementToChange.value = value;
  const event = new CustomEvent("change", {
    bubbles: true,
    cancelable: true,
    detail: {
      value
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
const getComboBoxContext = el => {
  const comboBoxEl = el.closest(COMBO_BOX);
  if (!comboBoxEl) {
    throw new Error(`Element is missing outer ${COMBO_BOX}`);
  }
  const selectEl = comboBoxEl.querySelector(SELECT);
  const inputEl = comboBoxEl.querySelector(INPUT);
  const listEl = comboBoxEl.querySelector(LIST);
  const statusEl = comboBoxEl.querySelector(STATUS);
  const focusedOptionEl = comboBoxEl.querySelector(LIST_OPTION_FOCUSED);
  const selectedOptionEl = comboBoxEl.querySelector(LIST_OPTION_SELECTED);
  const toggleListBtnEl = comboBoxEl.querySelector(TOGGLE_LIST_BUTTON);
  const clearInputBtnEl = comboBoxEl.querySelector(CLEAR_INPUT_BUTTON);
  const isPristine = comboBoxEl.classList.contains(COMBO_BOX_PRISTINE_CLASS);
  const disableFiltering = comboBoxEl.dataset.disableFiltering === "true";
  return {
    comboBoxEl,
    selectEl,
    inputEl,
    listEl,
    statusEl,
    focusedOptionEl,
    selectedOptionEl,
    toggleListBtnEl,
    clearInputBtnEl,
    isPristine,
    disableFiltering
  };
};

/**
 * Disable the combo-box component
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */
const disable = el => {
  const {
    inputEl,
    toggleListBtnEl,
    clearInputBtnEl
  } = getComboBoxContext(el);
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
const enable = el => {
  const {
    inputEl,
    toggleListBtnEl,
    clearInputBtnEl
  } = getComboBoxContext(el);
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
const enhanceComboBox = _comboBoxEl => {
  const comboBoxEl = _comboBoxEl.closest(COMBO_BOX);
  if (comboBoxEl.dataset.enhanced) return;
  const selectEl = comboBoxEl.querySelector("select");
  if (!selectEl) {
    throw new Error(`${COMBO_BOX} is missing inner select`);
  }
  const selectId = selectEl.id;
  const selectLabel = document.querySelector(`label[for="${selectId}"]`);
  const listId = `${selectId}--list`;
  const listIdLabel = `${selectId}-label`;
  const assistiveHintID = `${selectId}--assistiveHint`;
  const additionalAttributes = [];
  const {
    defaultValue
  } = comboBoxEl.dataset;
  const {
    placeholder
  } = comboBoxEl.dataset;
  let selectedOption;
  if (placeholder) {
    additionalAttributes.push({
      placeholder
    });
  }
  if (defaultValue) {
    for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
      const optionEl = selectEl.options[i];
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
  if (!selectLabel || !selectLabel.matches(`label[for="${selectId}"]`)) {
    throw new Error(`${COMBO_BOX} for ${selectId} is either missing a label or a "for" attribute`);
  } else {
    selectLabel.setAttribute("id", listIdLabel);
  }
  selectLabel.setAttribute("id", listIdLabel);
  selectEl.setAttribute("aria-hidden", "true");
  selectEl.setAttribute("tabindex", "-1");
  selectEl.classList.add("usa-sr-only", SELECT_CLASS);
  selectEl.id = "";
  selectEl.value = "";
  ["required", "aria-label", "aria-labelledby"].forEach(name => {
    if (selectEl.hasAttribute(name)) {
      const value = selectEl.getAttribute(name);
      additionalAttributes.push({
        [name]: value
      });
      selectEl.removeAttribute(name);
    }
  });

  // sanitize doesn't like functions in template literals
  const input = document.createElement("input");
  input.setAttribute("id", selectId);
  input.setAttribute("aria-owns", listId);
  input.setAttribute("aria-controls", listId);
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-describedby", assistiveHintID);
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("autocapitalize", "off");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("class", INPUT_CLASS);
  input.setAttribute("type", "text");
  input.setAttribute("role", "combobox");
  additionalAttributes.forEach(attr => Object.keys(attr).forEach(key => {
    const value = Sanitizer.escapeHTML`${attr[key]}`;
    input.setAttribute(key, value);
  }));
  comboBoxEl.insertAdjacentElement("beforeend", input);
  comboBoxEl.insertAdjacentHTML("beforeend", Sanitizer.escapeHTML`
    <span class="${CLEAR_INPUT_BUTTON_WRAPPER_CLASS}" tabindex="-1">
        <button type="button" class="${CLEAR_INPUT_BUTTON_CLASS}" aria-label="Clear the select contents">&nbsp;</button>
      </span>
      <span class="${INPUT_BUTTON_SEPARATOR_CLASS}">&nbsp;</span>
      <span class="${TOGGLE_LIST_BUTTON_WRAPPER_CLASS}" tabindex="-1">
        <button type="button" tabindex="-1" class="${TOGGLE_LIST_BUTTON_CLASS}" aria-label="Toggle the dropdown list">&nbsp;</button>
      </span>
      <ul
        tabindex="-1"
        id="${listId}"
        class="${LIST_CLASS}"
        role="listbox"
        aria-labelledby="${listIdLabel}"
        hidden>
      </ul>
      <div class="${STATUS_CLASS} usa-sr-only" role="status"></div>
      <span id="${assistiveHintID}" class="usa-sr-only">
        When autocomplete results are available use up and down arrows to review and enter to select.
        Touch device users, explore by touch or with swipe gestures.
      </span>`);
  if (selectedOption) {
    const {
      inputEl
    } = getComboBoxContext(comboBoxEl);
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
const highlightOption = function (el, nextEl) {
  let {
    skipFocus,
    preventScroll
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    inputEl,
    listEl,
    focusedOptionEl
  } = getComboBoxContext(el);
  if (focusedOptionEl) {
    focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
    focusedOptionEl.setAttribute("tabIndex", "-1");
  }
  if (nextEl) {
    inputEl.setAttribute("aria-activedescendant", nextEl.id);
    nextEl.setAttribute("tabIndex", "0");
    nextEl.classList.add(LIST_OPTION_FOCUSED_CLASS);
    if (!preventScroll) {
      const optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
      const currentBottom = listEl.scrollTop + listEl.offsetHeight;
      if (optionBottom > currentBottom) {
        listEl.scrollTop = optionBottom - listEl.offsetHeight;
      }
      if (nextEl.offsetTop < listEl.scrollTop) {
        listEl.scrollTop = nextEl.offsetTop;
      }
    }
    if (!skipFocus) {
      nextEl.focus({
        preventScroll
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
const generateDynamicRegExp = function (filter) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  let extras = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const escapeRegExp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  let find = filter.replace(/{{(.*?)}}/g, (m, $1) => {
    const key = $1.trim();
    const queryFilter = extras[key];
    if (key !== "query" && queryFilter) {
      const matcher = new RegExp(queryFilter, "i");
      const matches = query.match(matcher);
      if (matches) {
        return escapeRegExp(matches[1]);
      }
      return "";
    }
    return escapeRegExp(query);
  });
  find = `^(?:${find})$`;
  return new RegExp(find, "i");
};

/**
 * Display the option list of a combo box component.
 *
 * @param {HTMLElement} el An element within the combo box component
 */
const displayList = el => {
  const {
    comboBoxEl,
    selectEl,
    inputEl,
    listEl,
    statusEl,
    isPristine,
    disableFiltering
  } = getComboBoxContext(el);
  let selectedItemId;
  let firstFoundId;
  const listOptionBaseId = `${listEl.id}--option-`;
  const inputValue = (inputEl.value || "").toLowerCase();
  const filter = comboBoxEl.dataset.filter || DEFAULT_FILTER;
  const regex = generateDynamicRegExp(filter, inputValue, comboBoxEl.dataset);
  const options = [];
  for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
    const optionEl = selectEl.options[i];
    const optionId = `${listOptionBaseId}${options.length}`;
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
  const numOptions = options.length;
  const optionHtml = options.map((option, index) => {
    const optionId = `${listOptionBaseId}${index}`;
    const classes = [LIST_OPTION_CLASS];
    let tabindex = "-1";
    let ariaSelected = "false";
    if (optionId === selectedItemId) {
      classes.push(LIST_OPTION_SELECTED_CLASS, LIST_OPTION_FOCUSED_CLASS);
      tabindex = "0";
      ariaSelected = "true";
    }
    if (!selectedItemId && index === 0) {
      classes.push(LIST_OPTION_FOCUSED_CLASS);
      tabindex = "0";
    }
    const li = document.createElement("li");
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
  const noResults = document.createElement("li");
  noResults.setAttribute("class", `${LIST_OPTION_CLASS}--no-results`);
  noResults.textContent = "No results found";
  listEl.hidden = false;
  if (numOptions) {
    listEl.innerHTML = "";
    optionHtml.forEach(item => listEl.insertAdjacentElement("beforeend", item));
  } else {
    listEl.innerHTML = "";
    listEl.insertAdjacentElement("beforeend", noResults);
  }
  inputEl.setAttribute("aria-expanded", "true");
  statusEl.textContent = numOptions ? `${numOptions} result${numOptions > 1 ? "s" : ""} available.` : "No results.";
  let itemToFocus;
  if (isPristine && selectedItemId) {
    itemToFocus = listEl.querySelector(`#${selectedItemId}`);
  } else if (disableFiltering && firstFoundId) {
    itemToFocus = listEl.querySelector(`#${firstFoundId}`);
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
const hideList = el => {
  const {
    inputEl,
    listEl,
    statusEl,
    focusedOptionEl
  } = getComboBoxContext(el);
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
const selectItem = listOptionEl => {
  const {
    comboBoxEl,
    selectEl,
    inputEl
  } = getComboBoxContext(listOptionEl);
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
const clearInput = clearButtonEl => {
  const {
    comboBoxEl,
    listEl,
    selectEl,
    inputEl
  } = getComboBoxContext(clearButtonEl);
  const listShown = !listEl.hidden;
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
const resetSelection = el => {
  const {
    comboBoxEl,
    selectEl,
    inputEl
  } = getComboBoxContext(el);
  const selectValue = selectEl.value;
  const inputValue = (inputEl.value || "").toLowerCase();
  if (selectValue) {
    for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
      const optionEl = selectEl.options[i];
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
const completeSelection = el => {
  const {
    comboBoxEl,
    selectEl,
    inputEl,
    statusEl
  } = getComboBoxContext(el);
  statusEl.textContent = "";
  const inputValue = (inputEl.value || "").toLowerCase();
  if (inputValue) {
    for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
      const optionEl = selectEl.options[i];
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
const handleEscape = event => {
  const {
    comboBoxEl,
    inputEl
  } = getComboBoxContext(event.target);
  hideList(comboBoxEl);
  resetSelection(comboBoxEl);
  inputEl.focus();
};

/**
 * Handle the down event within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */
const handleDownFromInput = event => {
  const {
    comboBoxEl,
    listEl
  } = getComboBoxContext(event.target);
  if (listEl.hidden) {
    displayList(comboBoxEl);
  }
  const nextOptionEl = listEl.querySelector(LIST_OPTION_FOCUSED) || listEl.querySelector(LIST_OPTION);
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
const handleEnterFromInput = event => {
  const {
    comboBoxEl,
    listEl
  } = getComboBoxContext(event.target);
  const listShown = !listEl.hidden;
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
const handleDownFromListOption = event => {
  const focusedOptionEl = event.target;
  const nextOptionEl = focusedOptionEl.nextSibling;
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
const handleTabFromListOption = event => {
  selectItem(event.target);
  event.preventDefault();
};

/**
 * Handle the enter event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */
const handleEnterFromListOption = event => {
  selectItem(event.target);
  event.preventDefault();
};

/**
 * Handle the up event from list option within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */
const handleUpFromListOption = event => {
  const {
    comboBoxEl,
    listEl,
    focusedOptionEl
  } = getComboBoxContext(event.target);
  const nextOptionEl = focusedOptionEl && focusedOptionEl.previousSibling;
  const listShown = !listEl.hidden;
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
const handleMouseover = listOptionEl => {
  const isCurrentlyFocused = listOptionEl.classList.contains(LIST_OPTION_FOCUSED_CLASS);
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
const toggleList = el => {
  const {
    comboBoxEl,
    listEl,
    inputEl
  } = getComboBoxContext(el);
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
const handleClickFromInput = el => {
  const {
    comboBoxEl,
    listEl
  } = getComboBoxContext(el);
  if (listEl.hidden) {
    displayList(comboBoxEl);
  }
};
const comboBox = behavior({
  [CLICK]: {
    [INPUT]() {
      if (this.disabled) return;
      handleClickFromInput(this);
    },
    [TOGGLE_LIST_BUTTON]() {
      if (this.disabled) return;
      toggleList(this);
    },
    [LIST_OPTION]() {
      if (this.disabled) return;
      selectItem(this);
    },
    [CLEAR_INPUT_BUTTON]() {
      if (this.disabled) return;
      clearInput(this);
    }
  },
  focusout: {
    [COMBO_BOX](event) {
      if (!this.contains(event.relatedTarget)) {
        resetSelection(this);
        hideList(this);
      }
    }
  },
  keydown: {
    [COMBO_BOX]: keymap({
      Escape: handleEscape
    }),
    [INPUT]: keymap({
      Enter: handleEnterFromInput,
      ArrowDown: handleDownFromInput,
      Down: handleDownFromInput
    }),
    [LIST_OPTION]: keymap({
      ArrowUp: handleUpFromListOption,
      Up: handleUpFromListOption,
      ArrowDown: handleDownFromListOption,
      Down: handleDownFromListOption,
      Enter: handleEnterFromListOption,
      Tab: handleTabFromListOption,
      "Shift+Tab": noop
    })
  },
  input: {
    [INPUT]() {
      const comboBoxEl = this.closest(COMBO_BOX);
      comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
      displayList(this);
    }
  },
  mouseover: {
    [LIST_OPTION]() {
      handleMouseover(this);
    }
  }
}, {
  init(root) {
    selectOrMatches(COMBO_BOX, root).forEach(comboBoxEl => {
      enhanceComboBox(comboBoxEl);
    });
  },
  getComboBoxContext,
  enhanceComboBox,
  generateDynamicRegExp,
  disable,
  enable,
  displayList,
  hideList,
  COMBO_BOX_CLASS
});
module.exports = comboBox;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/sanitizer":50,"../../uswds-core/src/js/utils/select-or-matches":52,"receptor/keymap":11}],19:[function(require,module,exports){
"use strict";

const keymap = require("receptor/keymap");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const activeElement = require("../../uswds-core/src/js/utils/active-element");
const isIosDevice = require("../../uswds-core/src/js/utils/is-ios-device");
const Sanitizer = require("../../uswds-core/src/js/utils/sanitizer");
const DATE_PICKER_CLASS = `${PREFIX}-date-picker`;
const DATE_PICKER_WRAPPER_CLASS = `${DATE_PICKER_CLASS}__wrapper`;
const DATE_PICKER_INITIALIZED_CLASS = `${DATE_PICKER_CLASS}--initialized`;
const DATE_PICKER_ACTIVE_CLASS = `${DATE_PICKER_CLASS}--active`;
const DATE_PICKER_INTERNAL_INPUT_CLASS = `${DATE_PICKER_CLASS}__internal-input`;
const DATE_PICKER_EXTERNAL_INPUT_CLASS = `${DATE_PICKER_CLASS}__external-input`;
const DATE_PICKER_BUTTON_CLASS = `${DATE_PICKER_CLASS}__button`;
const DATE_PICKER_CALENDAR_CLASS = `${DATE_PICKER_CLASS}__calendar`;
const DATE_PICKER_STATUS_CLASS = `${DATE_PICKER_CLASS}__status`;
const CALENDAR_DATE_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__date`;
const CALENDAR_DATE_FOCUSED_CLASS = `${CALENDAR_DATE_CLASS}--focused`;
const CALENDAR_DATE_SELECTED_CLASS = `${CALENDAR_DATE_CLASS}--selected`;
const CALENDAR_DATE_PREVIOUS_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--previous-month`;
const CALENDAR_DATE_CURRENT_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--current-month`;
const CALENDAR_DATE_NEXT_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--next-month`;
const CALENDAR_DATE_RANGE_DATE_CLASS = `${CALENDAR_DATE_CLASS}--range-date`;
const CALENDAR_DATE_TODAY_CLASS = `${CALENDAR_DATE_CLASS}--today`;
const CALENDAR_DATE_RANGE_DATE_START_CLASS = `${CALENDAR_DATE_CLASS}--range-date-start`;
const CALENDAR_DATE_RANGE_DATE_END_CLASS = `${CALENDAR_DATE_CLASS}--range-date-end`;
const CALENDAR_DATE_WITHIN_RANGE_CLASS = `${CALENDAR_DATE_CLASS}--within-range`;
const CALENDAR_PREVIOUS_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-year`;
const CALENDAR_PREVIOUS_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-month`;
const CALENDAR_NEXT_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-year`;
const CALENDAR_NEXT_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-month`;
const CALENDAR_MONTH_SELECTION_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-selection`;
const CALENDAR_YEAR_SELECTION_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year-selection`;
const CALENDAR_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month`;
const CALENDAR_MONTH_FOCUSED_CLASS = `${CALENDAR_MONTH_CLASS}--focused`;
const CALENDAR_MONTH_SELECTED_CLASS = `${CALENDAR_MONTH_CLASS}--selected`;
const CALENDAR_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year`;
const CALENDAR_YEAR_FOCUSED_CLASS = `${CALENDAR_YEAR_CLASS}--focused`;
const CALENDAR_YEAR_SELECTED_CLASS = `${CALENDAR_YEAR_CLASS}--selected`;
const CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-year-chunk`;
const CALENDAR_NEXT_YEAR_CHUNK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-year-chunk`;
const CALENDAR_DATE_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__date-picker`;
const CALENDAR_MONTH_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-picker`;
const CALENDAR_YEAR_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year-picker`;
const CALENDAR_TABLE_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__table`;
const CALENDAR_ROW_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__row`;
const CALENDAR_CELL_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__cell`;
const CALENDAR_CELL_CENTER_ITEMS_CLASS = `${CALENDAR_CELL_CLASS}--center-items`;
const CALENDAR_MONTH_LABEL_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-label`;
const CALENDAR_DAY_OF_WEEK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__day-of-week`;
const DATE_PICKER = `.${DATE_PICKER_CLASS}`;
const DATE_PICKER_BUTTON = `.${DATE_PICKER_BUTTON_CLASS}`;
const DATE_PICKER_INTERNAL_INPUT = `.${DATE_PICKER_INTERNAL_INPUT_CLASS}`;
const DATE_PICKER_EXTERNAL_INPUT = `.${DATE_PICKER_EXTERNAL_INPUT_CLASS}`;
const DATE_PICKER_CALENDAR = `.${DATE_PICKER_CALENDAR_CLASS}`;
const DATE_PICKER_STATUS = `.${DATE_PICKER_STATUS_CLASS}`;
const CALENDAR_DATE = `.${CALENDAR_DATE_CLASS}`;
const CALENDAR_DATE_FOCUSED = `.${CALENDAR_DATE_FOCUSED_CLASS}`;
const CALENDAR_DATE_CURRENT_MONTH = `.${CALENDAR_DATE_CURRENT_MONTH_CLASS}`;
const CALENDAR_PREVIOUS_YEAR = `.${CALENDAR_PREVIOUS_YEAR_CLASS}`;
const CALENDAR_PREVIOUS_MONTH = `.${CALENDAR_PREVIOUS_MONTH_CLASS}`;
const CALENDAR_NEXT_YEAR = `.${CALENDAR_NEXT_YEAR_CLASS}`;
const CALENDAR_NEXT_MONTH = `.${CALENDAR_NEXT_MONTH_CLASS}`;
const CALENDAR_YEAR_SELECTION = `.${CALENDAR_YEAR_SELECTION_CLASS}`;
const CALENDAR_MONTH_SELECTION = `.${CALENDAR_MONTH_SELECTION_CLASS}`;
const CALENDAR_MONTH = `.${CALENDAR_MONTH_CLASS}`;
const CALENDAR_YEAR = `.${CALENDAR_YEAR_CLASS}`;
const CALENDAR_PREVIOUS_YEAR_CHUNK = `.${CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS}`;
const CALENDAR_NEXT_YEAR_CHUNK = `.${CALENDAR_NEXT_YEAR_CHUNK_CLASS}`;
const CALENDAR_DATE_PICKER = `.${CALENDAR_DATE_PICKER_CLASS}`;
const CALENDAR_MONTH_PICKER = `.${CALENDAR_MONTH_PICKER_CLASS}`;
const CALENDAR_YEAR_PICKER = `.${CALENDAR_YEAR_PICKER_CLASS}`;
const CALENDAR_MONTH_FOCUSED = `.${CALENDAR_MONTH_FOCUSED_CLASS}`;
const CALENDAR_YEAR_FOCUSED = `.${CALENDAR_YEAR_FOCUSED_CLASS}`;
const VALIDATION_MESSAGE = "Please enter a valid date";
const MONTH_LABELS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_OF_WEEK_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ENTER_KEYCODE = 13;
const YEAR_CHUNK = 12;
const DEFAULT_MIN_DATE = "0000-01-01";
const DEFAULT_EXTERNAL_DATE_FORMAT = "MM/DD/YYYY";
const INTERNAL_DATE_FORMAT = "YYYY-MM-DD";
const NOT_DISABLED_SELECTOR = ":not([disabled])";
const processFocusableSelectors = function () {
  for (var _len = arguments.length, selectors = new Array(_len), _key = 0; _key < _len; _key++) {
    selectors[_key] = arguments[_key];
  }
  return selectors.map(query => query + NOT_DISABLED_SELECTOR).join(", ");
};
const DATE_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_PREVIOUS_YEAR, CALENDAR_PREVIOUS_MONTH, CALENDAR_YEAR_SELECTION, CALENDAR_MONTH_SELECTION, CALENDAR_NEXT_YEAR, CALENDAR_NEXT_MONTH, CALENDAR_DATE_FOCUSED);
const MONTH_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_MONTH_FOCUSED);
const YEAR_PICKER_FOCUSABLE = processFocusableSelectors(CALENDAR_PREVIOUS_YEAR_CHUNK, CALENDAR_NEXT_YEAR_CHUNK, CALENDAR_YEAR_FOCUSED);

// #region Date Manipulation Functions

/**
 * Keep date within month. Month would only be over by 1 to 3 days
 *
 * @param {Date} dateToCheck the date object to check
 * @param {number} month the correct month
 * @returns {Date} the date, corrected if needed
 */
const keepDateWithinMonth = (dateToCheck, month) => {
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
const setDate = (year, month, date) => {
  const newDate = new Date(0);
  newDate.setFullYear(year, month, date);
  return newDate;
};

/**
 * todays date
 *
 * @returns {Date} todays date
 */
const today = () => {
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return setDate(year, month, day);
};

/**
 * Set date to first day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */
const startOfMonth = date => {
  const newDate = new Date(0);
  newDate.setFullYear(date.getFullYear(), date.getMonth(), 1);
  return newDate;
};

/**
 * Set date to last day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */
const lastDayOfMonth = date => {
  const newDate = new Date(0);
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
const addDays = (_date, numDays) => {
  const newDate = new Date(_date.getTime());
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
const subDays = (_date, numDays) => addDays(_date, -numDays);

/**
 * Add weeks to date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const addWeeks = (_date, numWeeks) => addDays(_date, numWeeks * 7);

/**
 * Subtract weeks from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const subWeeks = (_date, numWeeks) => addWeeks(_date, -numWeeks);

/**
 * Set date to the start of the week (Sunday)
 *
 * @param {Date} _date the date to adjust
 * @returns {Date} the adjusted date
 */
const startOfWeek = _date => {
  const dayOfWeek = _date.getDay();
  return subDays(_date, dayOfWeek);
};

/**
 * Set date to the end of the week (Saturday)
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const endOfWeek = _date => {
  const dayOfWeek = _date.getDay();
  return addDays(_date, 6 - dayOfWeek);
};

/**
 * Add months to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numMonths the difference in months
 * @returns {Date} the adjusted date
 */
const addMonths = (_date, numMonths) => {
  const newDate = new Date(_date.getTime());
  const dateMonth = (newDate.getMonth() + 12 + numMonths) % 12;
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
const subMonths = (_date, numMonths) => addMonths(_date, -numMonths);

/**
 * Add years to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */
const addYears = (_date, numYears) => addMonths(_date, numYears * 12);

/**
 * Subtract years from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */
const subYears = (_date, numYears) => addYears(_date, -numYears);

/**
 * Set months of date
 *
 * @param {Date} _date the date to adjust
 * @param {number} month zero-indexed month to set
 * @returns {Date} the adjusted date
 */
const setMonth = (_date, month) => {
  const newDate = new Date(_date.getTime());
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
const setYear = (_date, year) => {
  const newDate = new Date(_date.getTime());
  const month = newDate.getMonth();
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
const min = (dateA, dateB) => {
  let newDate = dateA;
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
const max = (dateA, dateB) => {
  let newDate = dateA;
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
const isSameYear = (dateA, dateB) => dateA && dateB && dateA.getFullYear() === dateB.getFullYear();

/**
 * Check if dates are the in the same month
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {boolean} are dates in the same month
 */
const isSameMonth = (dateA, dateB) => isSameYear(dateA, dateB) && dateA.getMonth() === dateB.getMonth();

/**
 * Check if dates are the same date
 *
 * @param {Date} dateA the date to compare
 * @param {Date} dateA the date to compare
 * @returns {boolean} are dates the same date
 */
const isSameDay = (dateA, dateB) => isSameMonth(dateA, dateB) && dateA.getDate() === dateB.getDate();

/**
 * return a new date within minimum and maximum date
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @returns {Date} the date between min and max
 */
const keepDateBetweenMinAndMax = (date, minDate, maxDate) => {
  let newDate = date;
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
const isDateWithinMinAndMax = (date, minDate, maxDate) => date >= minDate && (!maxDate || date <= maxDate);

/**
 * Check if dates month is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */
const isDatesMonthOutsideMinOrMax = (date, minDate, maxDate) => lastDayOfMonth(date) < minDate || maxDate && startOfMonth(date) > maxDate;

/**
 * Check if dates year is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */
const isDatesYearOutsideMinOrMax = (date, minDate, maxDate) => lastDayOfMonth(setMonth(date, 11)) < minDate || maxDate && startOfMonth(setMonth(date, 0)) > maxDate;

/**
 * Parse a date with format M-D-YY
 *
 * @param {string} dateString the date string to parse
 * @param {string} dateFormat the format of the date string
 * @param {boolean} adjustDate should the date be adjusted
 * @returns {Date} the parsed date
 */
const parseDateString = function (dateString) {
  let dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INTERNAL_DATE_FORMAT;
  let adjustDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let date;
  let month;
  let day;
  let year;
  let parsed;
  if (dateString) {
    let monthStr;
    let dayStr;
    let yearStr;
    if (dateFormat === DEFAULT_EXTERNAL_DATE_FORMAT) {
      [monthStr, dayStr, yearStr] = dateString.split("/");
    } else {
      [yearStr, monthStr, dayStr] = dateString.split("-");
    }
    if (yearStr) {
      parsed = parseInt(yearStr, 10);
      if (!Number.isNaN(parsed)) {
        year = parsed;
        if (adjustDate) {
          year = Math.max(0, year);
          if (yearStr.length < 3) {
            const currentYear = today().getFullYear();
            const currentYearStub = currentYear - currentYear % 10 ** yearStr.length;
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
          const lastDayOfTheMonth = setDate(year, month, 0).getDate();
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
const formatDate = function (date) {
  let dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INTERNAL_DATE_FORMAT;
  const padZeros = (value, length) => `0000${value}`.slice(-length);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  if (dateFormat === DEFAULT_EXTERNAL_DATE_FORMAT) {
    return [padZeros(month, 2), padZeros(day, 2), padZeros(year, 4)].join("/");
  }
  return [padZeros(year, 4), padZeros(month, 2), padZeros(day, 2)].join("-");
};

// #endregion Date Manipulation Functions

/**
 * Create a grid string from an array of html strings
 *
 * @param {string[]} htmlArray the array of html items
 * @param {number} rowSize the length of a row
 * @returns {string} the grid string
 */
const listToGridHtml = (htmlArray, rowSize) => {
  const grid = [];
  let row = [];
  let i = 0;
  while (i < htmlArray.length) {
    row = [];
    const tr = document.createElement("tr");
    while (i < htmlArray.length && row.length < rowSize) {
      const td = document.createElement("td");
      td.insertAdjacentElement("beforeend", htmlArray[i]);
      row.push(td);
      i += 1;
    }
    row.forEach(element => {
      tr.insertAdjacentElement("beforeend", element);
    });
    grid.push(tr);
  }
  return grid;
};
const createTableBody = grid => {
  const tableBody = document.createElement("tbody");
  grid.forEach(element => {
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
const changeElementValue = function (el) {
  let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  const elementToChange = el;
  elementToChange.value = value;
  const event = new CustomEvent("change", {
    bubbles: true,
    cancelable: true,
    detail: {
      value
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
const getDatePickerContext = el => {
  const datePickerEl = el.closest(DATE_PICKER);
  if (!datePickerEl) {
    throw new Error(`Element is missing outer ${DATE_PICKER}`);
  }
  const internalInputEl = datePickerEl.querySelector(DATE_PICKER_INTERNAL_INPUT);
  const externalInputEl = datePickerEl.querySelector(DATE_PICKER_EXTERNAL_INPUT);
  const calendarEl = datePickerEl.querySelector(DATE_PICKER_CALENDAR);
  const toggleBtnEl = datePickerEl.querySelector(DATE_PICKER_BUTTON);
  const statusEl = datePickerEl.querySelector(DATE_PICKER_STATUS);
  const firstYearChunkEl = datePickerEl.querySelector(CALENDAR_YEAR);
  const inputDate = parseDateString(externalInputEl.value, DEFAULT_EXTERNAL_DATE_FORMAT, true);
  const selectedDate = parseDateString(internalInputEl.value);
  const calendarDate = parseDateString(calendarEl.dataset.value);
  const minDate = parseDateString(datePickerEl.dataset.minDate);
  const maxDate = parseDateString(datePickerEl.dataset.maxDate);
  const rangeDate = parseDateString(datePickerEl.dataset.rangeDate);
  const defaultDate = parseDateString(datePickerEl.dataset.defaultDate);
  if (minDate && maxDate && minDate > maxDate) {
    throw new Error("Minimum date cannot be after maximum date");
  }
  return {
    calendarDate,
    minDate,
    toggleBtnEl,
    selectedDate,
    maxDate,
    firstYearChunkEl,
    datePickerEl,
    inputDate,
    internalInputEl,
    externalInputEl,
    calendarEl,
    rangeDate,
    defaultDate,
    statusEl
  };
};

/**
 * Disable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const disable = el => {
  const {
    externalInputEl,
    toggleBtnEl
  } = getDatePickerContext(el);
  toggleBtnEl.disabled = true;
  externalInputEl.disabled = true;
};

/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const enable = el => {
  const {
    externalInputEl,
    toggleBtnEl
  } = getDatePickerContext(el);
  toggleBtnEl.disabled = false;
  externalInputEl.disabled = false;
};

// #region Validation

/**
 * Validate the value in the input as a valid date of format M/D/YYYY
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const isDateInputInvalid = el => {
  const {
    externalInputEl,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const dateString = externalInputEl.value;
  let isInvalid = false;
  if (dateString) {
    isInvalid = true;
    const dateStringParts = dateString.split("/");
    const [month, day, year] = dateStringParts.map(str => {
      let value;
      const parsed = parseInt(str, 10);
      if (!Number.isNaN(parsed)) value = parsed;
      return value;
    });
    if (month && day && year != null) {
      const checkDate = setDate(year, month - 1, day);
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
const validateDateInput = el => {
  const {
    externalInputEl
  } = getDatePickerContext(el);
  const isInvalid = isDateInputInvalid(externalInputEl);
  if (isInvalid && !externalInputEl.validationMessage) {
    externalInputEl.setCustomValidity(VALIDATION_MESSAGE);
  }
  if (!isInvalid && externalInputEl.validationMessage === VALIDATION_MESSAGE) {
    externalInputEl.setCustomValidity("");
  }
};

// #endregion Validation

/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const reconcileInputValues = el => {
  const {
    internalInputEl,
    inputDate
  } = getDatePickerContext(el);
  let newValue = "";
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
const setCalendarValue = (el, dateString) => {
  const parsedDate = parseDateString(dateString);
  if (parsedDate) {
    const formattedDate = formatDate(parsedDate, DEFAULT_EXTERNAL_DATE_FORMAT);
    const {
      datePickerEl,
      internalInputEl,
      externalInputEl
    } = getDatePickerContext(el);
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
const enhanceDatePicker = el => {
  const datePickerEl = el.closest(DATE_PICKER);
  const {
    defaultValue
  } = datePickerEl.dataset;
  const internalInputEl = datePickerEl.querySelector(`input`);
  if (!internalInputEl) {
    throw new Error(`${DATE_PICKER} is missing inner input`);
  }
  if (internalInputEl.value) {
    internalInputEl.value = "";
  }
  const minDate = parseDateString(datePickerEl.dataset.minDate || internalInputEl.getAttribute("min"));
  datePickerEl.dataset.minDate = minDate ? formatDate(minDate) : DEFAULT_MIN_DATE;
  const maxDate = parseDateString(datePickerEl.dataset.maxDate || internalInputEl.getAttribute("max"));
  if (maxDate) {
    datePickerEl.dataset.maxDate = formatDate(maxDate);
  }
  const calendarWrapper = document.createElement("div");
  calendarWrapper.classList.add(DATE_PICKER_WRAPPER_CLASS);
  const externalInputEl = internalInputEl.cloneNode();
  externalInputEl.classList.add(DATE_PICKER_EXTERNAL_INPUT_CLASS);
  externalInputEl.type = "text";
  calendarWrapper.appendChild(externalInputEl);
  calendarWrapper.insertAdjacentHTML("beforeend", Sanitizer.escapeHTML`
    <button type="button" class="${DATE_PICKER_BUTTON_CLASS}" aria-haspopup="true" aria-label="Toggle calendar"></button>
    <div class="${DATE_PICKER_CALENDAR_CLASS}" role="dialog" aria-modal="true" hidden></div>
    <div class="usa-sr-only ${DATE_PICKER_STATUS_CLASS}" role="status" aria-live="polite"></div>`);
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
};

// #region Calendar - Date Selection View

/**
 * render the calendar.
 *
 * @param {HTMLElement} el An element within the date picker component
 * @param {Date} _dateToDisplay a date to render on the calendar
 * @returns {HTMLElement} a reference to the new calendar element
 */
const renderCalendar = (el, _dateToDisplay) => {
  const {
    datePickerEl,
    calendarEl,
    statusEl,
    selectedDate,
    maxDate,
    minDate,
    rangeDate
  } = getDatePickerContext(el);
  const todaysDate = today();
  let dateToDisplay = _dateToDisplay || todaysDate;
  const calendarWasHidden = calendarEl.hidden;
  const focusedDate = addDays(dateToDisplay, 0);
  const focusedMonth = dateToDisplay.getMonth();
  const focusedYear = dateToDisplay.getFullYear();
  const prevMonth = subMonths(dateToDisplay, 1);
  const nextMonth = addMonths(dateToDisplay, 1);
  const currentFormattedDate = formatDate(dateToDisplay);
  const firstOfMonth = startOfMonth(dateToDisplay);
  const prevButtonsDisabled = isSameMonth(dateToDisplay, minDate);
  const nextButtonsDisabled = isSameMonth(dateToDisplay, maxDate);
  const rangeConclusionDate = selectedDate || dateToDisplay;
  const rangeStartDate = rangeDate && min(rangeConclusionDate, rangeDate);
  const rangeEndDate = rangeDate && max(rangeConclusionDate, rangeDate);
  const withinRangeStartDate = rangeDate && addDays(rangeStartDate, 1);
  const withinRangeEndDate = rangeDate && subDays(rangeEndDate, 1);
  const monthLabel = MONTH_LABELS[focusedMonth];
  const generateDateHtml = dateToRender => {
    const classes = [CALENDAR_DATE_CLASS];
    const day = dateToRender.getDate();
    const month = dateToRender.getMonth();
    const year = dateToRender.getFullYear();
    const dayOfWeek = dateToRender.getDay();
    const formattedDate = formatDate(dateToRender);
    let tabindex = "-1";
    const isDisabled = !isDateWithinMinAndMax(dateToRender, minDate, maxDate);
    const isSelected = isSameDay(dateToRender, selectedDate);
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
    const monthStr = MONTH_LABELS[month];
    const dayStr = DAY_OF_WEEK_LABELS[dayOfWeek];
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("tabindex", tabindex);
    btn.setAttribute("class", classes.join(" "));
    btn.setAttribute("data-day", day);
    btn.setAttribute("data-month", month + 1);
    btn.setAttribute("data-year", year);
    btn.setAttribute("data-value", formattedDate);
    btn.setAttribute("aria-label", Sanitizer.escapeHTML`${day} ${monthStr} ${year} ${dayStr}`);
    btn.setAttribute("aria-selected", isSelected ? "true" : "false");
    if (isDisabled === true) {
      btn.disabled = true;
    }
    btn.textContent = day;
    return btn;
  };

  // set date to first rendered day
  dateToDisplay = startOfWeek(firstOfMonth);
  const days = [];
  while (days.length < 28 || dateToDisplay.getMonth() === focusedMonth || days.length % 7 !== 0) {
    days.push(generateDateHtml(dateToDisplay));
    dateToDisplay = addDays(dateToDisplay, 1);
  }
  const datesGrid = listToGridHtml(days, 7);
  const newCalendar = calendarEl.cloneNode();
  newCalendar.dataset.value = currentFormattedDate;
  newCalendar.style.top = `${datePickerEl.offsetHeight}px`;
  newCalendar.hidden = false;
  newCalendar.innerHTML = Sanitizer.escapeHTML`
    <div tabindex="-1" class="${CALENDAR_DATE_PICKER_CLASS}">
      <div class="${CALENDAR_ROW_CLASS}">
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button
            type="button"
            class="${CALENDAR_PREVIOUS_YEAR_CLASS}"
            aria-label="Navigate back one year"
            ${prevButtonsDisabled ? `disabled="disabled"` : ""}
          ></button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button
            type="button"
            class="${CALENDAR_PREVIOUS_MONTH_CLASS}"
            aria-label="Navigate back one month"
            ${prevButtonsDisabled ? `disabled="disabled"` : ""}
          ></button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_MONTH_LABEL_CLASS}">
          <button
            type="button"
            class="${CALENDAR_MONTH_SELECTION_CLASS}" aria-label="${monthLabel}. Click to select month"
          >${monthLabel}</button>
          <button
            type="button"
            class="${CALENDAR_YEAR_SELECTION_CLASS}" aria-label="${focusedYear}. Click to select year"
          >${focusedYear}</button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button
            type="button"
            class="${CALENDAR_NEXT_MONTH_CLASS}"
            aria-label="Navigate forward one month"
            ${nextButtonsDisabled ? `disabled="disabled"` : ""}
          ></button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button
            type="button"
            class="${CALENDAR_NEXT_YEAR_CLASS}"
            aria-label="Navigate forward one year"
            ${nextButtonsDisabled ? `disabled="disabled"` : ""}
          ></button>
        </div>
      </div>
    </div>
    `;
  const table = document.createElement("table");
  table.setAttribute("class", CALENDAR_TABLE_CLASS);
  table.setAttribute("role", "presentation");
  const tableHead = document.createElement("thead");
  table.insertAdjacentElement("beforeend", tableHead);
  const tableHeadRow = document.createElement("tr");
  tableHead.insertAdjacentElement("beforeend", tableHeadRow);
  const daysOfWeek = {
    Sunday: "S",
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "Th",
    Friday: "Fr",
    Saturday: "S"
  };
  Object.keys(daysOfWeek).forEach(key => {
    const th = document.createElement("th");
    th.setAttribute("class", CALENDAR_DAY_OF_WEEK_CLASS);
    th.setAttribute("scope", "presentation");
    th.setAttribute("aria-label", key);
    th.textContent = daysOfWeek[key];
    tableHeadRow.insertAdjacentElement("beforeend", th);
  });
  const tableBody = createTableBody(datesGrid);
  table.insertAdjacentElement("beforeend", tableBody);

  // Container for Years, Months, and Days
  const datePickerCalendarContainer = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  datePickerCalendarContainer.insertAdjacentElement("beforeend", table);
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  datePickerEl.classList.add(DATE_PICKER_ACTIVE_CLASS);
  const statuses = [];
  if (isSameDay(selectedDate, focusedDate)) {
    statuses.push("Selected date");
  }
  if (calendarWasHidden) {
    statuses.push("You can navigate by day using left and right arrows", "Weeks by using up and down arrows", "Months by using page up and page down keys", "Years by using shift plus page up and shift plus page down", "Home and end keys navigate to the beginning and end of a week");
    statusEl.textContent = "";
  } else {
    statuses.push(`${monthLabel} ${focusedYear}`);
  }
  statusEl.textContent = statuses.join(". ");
  return newCalendar;
};

/**
 * Navigate back one year and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */
const displayPreviousYear = _buttonEl => {
  if (_buttonEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(_buttonEl);
  let date = subYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR);
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
const displayPreviousMonth = _buttonEl => {
  if (_buttonEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(_buttonEl);
  let date = subMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_MONTH);
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
const displayNextMonth = _buttonEl => {
  if (_buttonEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(_buttonEl);
  let date = addMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_MONTH);
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
const displayNextYear = _buttonEl => {
  if (_buttonEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(_buttonEl);
  let date = addYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR);
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
const hideCalendar = el => {
  const {
    datePickerEl,
    calendarEl,
    statusEl
  } = getDatePickerContext(el);
  datePickerEl.classList.remove(DATE_PICKER_ACTIVE_CLASS);
  calendarEl.hidden = true;
  statusEl.textContent = "";
};

/**
 * Select a date within the date picker component.
 *
 * @param {HTMLButtonElement} calendarDateEl A date element within the date picker component
 */
const selectDate = calendarDateEl => {
  if (calendarDateEl.disabled) return;
  const {
    datePickerEl,
    externalInputEl
  } = getDatePickerContext(calendarDateEl);
  setCalendarValue(calendarDateEl, calendarDateEl.dataset.value);
  hideCalendar(datePickerEl);
  externalInputEl.focus();
};

/**
 * Toggle the calendar.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */
const toggleCalendar = el => {
  if (el.disabled) return;
  const {
    calendarEl,
    inputDate,
    minDate,
    maxDate,
    defaultDate
  } = getDatePickerContext(el);
  if (calendarEl.hidden) {
    const dateToDisplay = keepDateBetweenMinAndMax(inputDate || defaultDate || today(), minDate, maxDate);
    const newCalendar = renderCalendar(calendarEl, dateToDisplay);
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
const updateCalendarIfVisible = el => {
  const {
    calendarEl,
    inputDate,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const calendarShown = !calendarEl.hidden;
  if (calendarShown && inputDate) {
    const dateToDisplay = keepDateBetweenMinAndMax(inputDate, minDate, maxDate);
    renderCalendar(calendarEl, dateToDisplay);
  }
};

// #endregion Calendar - Date Selection View

// #region Calendar - Month Selection View
/**
 * Display the month selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @returns {HTMLElement} a reference to the new calendar element
 */
const displayMonthSelection = (el, monthToDisplay) => {
  const {
    calendarEl,
    statusEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const selectedMonth = calendarDate.getMonth();
  const focusedMonth = monthToDisplay == null ? selectedMonth : monthToDisplay;
  const months = MONTH_LABELS.map((month, index) => {
    const monthToCheck = setMonth(calendarDate, index);
    const isDisabled = isDatesMonthOutsideMinOrMax(monthToCheck, minDate, maxDate);
    let tabindex = "-1";
    const classes = [CALENDAR_MONTH_CLASS];
    const isSelected = index === selectedMonth;
    if (index === focusedMonth) {
      tabindex = "0";
      classes.push(CALENDAR_MONTH_FOCUSED_CLASS);
    }
    if (isSelected) {
      classes.push(CALENDAR_MONTH_SELECTED_CLASS);
    }
    const btn = document.createElement("button");
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
  const monthsHtml = document.createElement("div");
  monthsHtml.setAttribute("tabindex", "-1");
  monthsHtml.setAttribute("class", CALENDAR_MONTH_PICKER_CLASS);
  const table = document.createElement("table");
  table.setAttribute("class", CALENDAR_TABLE_CLASS);
  table.setAttribute("role", "presentation");
  const monthsGrid = listToGridHtml(months, 3);
  const tableBody = createTableBody(monthsGrid);
  table.insertAdjacentElement("beforeend", tableBody);
  monthsHtml.insertAdjacentElement("beforeend", table);
  const newCalendar = calendarEl.cloneNode();
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
const selectMonth = monthEl => {
  if (monthEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(monthEl);
  const selectedMonth = parseInt(monthEl.dataset.value, 10);
  let date = setMonth(calendarDate, selectedMonth);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar - Month Selection View

// #region Calendar - Year Selection View

/**
 * Display the year selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @param {number} yearToDisplay year to display in year selection
 * @returns {HTMLElement} a reference to the new calendar element
 */
const displayYearSelection = (el, yearToDisplay) => {
  const {
    calendarEl,
    statusEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const selectedYear = calendarDate.getFullYear();
  const focusedYear = yearToDisplay == null ? selectedYear : yearToDisplay;
  let yearToChunk = focusedYear;
  yearToChunk -= yearToChunk % YEAR_CHUNK;
  yearToChunk = Math.max(0, yearToChunk);
  const prevYearChunkDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearToChunk - 1), minDate, maxDate);
  const nextYearChunkDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearToChunk + YEAR_CHUNK), minDate, maxDate);
  const years = [];
  let yearIndex = yearToChunk;
  while (years.length < YEAR_CHUNK) {
    const isDisabled = isDatesYearOutsideMinOrMax(setYear(calendarDate, yearIndex), minDate, maxDate);
    let tabindex = "-1";
    const classes = [CALENDAR_YEAR_CLASS];
    const isSelected = yearIndex === selectedYear;
    if (yearIndex === focusedYear) {
      tabindex = "0";
      classes.push(CALENDAR_YEAR_FOCUSED_CLASS);
    }
    if (isSelected) {
      classes.push(CALENDAR_YEAR_SELECTED_CLASS);
    }
    const btn = document.createElement("button");
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
  const newCalendar = calendarEl.cloneNode();

  // create the years calendar wrapper
  const yearsCalendarWrapper = document.createElement("div");
  yearsCalendarWrapper.setAttribute("tabindex", "-1");
  yearsCalendarWrapper.setAttribute("class", CALENDAR_YEAR_PICKER_CLASS);

  // create table parent
  const yearsTableParent = document.createElement("table");
  yearsTableParent.setAttribute("role", "presentation");
  yearsTableParent.setAttribute("class", CALENDAR_TABLE_CLASS);

  // create table body and table row
  const yearsHTMLTableBody = document.createElement("tbody");
  const yearsHTMLTableBodyRow = document.createElement("tr");

  // create previous button
  const previousYearsBtn = document.createElement("button");
  previousYearsBtn.setAttribute("type", "button");
  previousYearsBtn.setAttribute("class", CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS);
  previousYearsBtn.setAttribute("aria-label", `Navigate back ${YEAR_CHUNK} years`);
  if (prevYearChunkDisabled === true) {
    previousYearsBtn.disabled = true;
  }
  previousYearsBtn.innerHTML = Sanitizer.escapeHTML`&nbsp`;

  // create next button
  const nextYearsBtn = document.createElement("button");
  nextYearsBtn.setAttribute("type", "button");
  nextYearsBtn.setAttribute("class", CALENDAR_NEXT_YEAR_CHUNK_CLASS);
  nextYearsBtn.setAttribute("aria-label", `Navigate forward ${YEAR_CHUNK} years`);
  if (nextYearChunkDisabled === true) {
    nextYearsBtn.disabled = true;
  }
  nextYearsBtn.innerHTML = Sanitizer.escapeHTML`&nbsp`;

  // create the actual years table
  const yearsTable = document.createElement("table");
  yearsTable.setAttribute("class", CALENDAR_TABLE_CLASS);
  yearsTable.setAttribute("role", "presentation");

  // create the years child table
  const yearsGrid = listToGridHtml(years, 3);
  const yearsTableBody = createTableBody(yearsGrid);

  // append the grid to the years child table
  yearsTable.insertAdjacentElement("beforeend", yearsTableBody);

  // create the prev button td and append the prev button
  const yearsHTMLTableBodyDetailPrev = document.createElement("td");
  yearsHTMLTableBodyDetailPrev.insertAdjacentElement("beforeend", previousYearsBtn);

  // create the years td and append the years child table
  const yearsHTMLTableBodyYearsDetail = document.createElement("td");
  yearsHTMLTableBodyYearsDetail.setAttribute("colspan", "3");
  yearsHTMLTableBodyYearsDetail.insertAdjacentElement("beforeend", yearsTable);

  // create the next button td and append the next button
  const yearsHTMLTableBodyDetailNext = document.createElement("td");
  yearsHTMLTableBodyDetailNext.insertAdjacentElement("beforeend", nextYearsBtn);

  // append the three td to the years child table row
  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyDetailPrev);
  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyYearsDetail);
  yearsHTMLTableBodyRow.insertAdjacentElement("beforeend", yearsHTMLTableBodyDetailNext);

  // append the table row to the years child table body
  yearsHTMLTableBody.insertAdjacentElement("beforeend", yearsHTMLTableBodyRow);

  // append the years table body to the years parent table
  yearsTableParent.insertAdjacentElement("beforeend", yearsHTMLTableBody);

  // append the parent table to the calendar wrapper
  yearsCalendarWrapper.insertAdjacentElement("beforeend", yearsTableParent);

  // append the years calender to the new calendar
  newCalendar.insertAdjacentElement("beforeend", yearsCalendarWrapper);

  // replace calendar
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);
  statusEl.textContent = Sanitizer.escapeHTML`Showing years ${yearToChunk} to ${yearToChunk + YEAR_CHUNK - 1}. Select a year.`;
  return newCalendar;
};

/**
 * Navigate back by years and display the year selection screen.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */
const displayPreviousYearChunk = el => {
  if (el.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  const selectedYear = parseInt(yearEl.textContent, 10);
  let adjustedYear = selectedYear - YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);
  const date = setYear(calendarDate, adjustedYear);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR_CHUNK);
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
const displayNextYearChunk = el => {
  if (el.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(el);
  const yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  const selectedYear = parseInt(yearEl.textContent, 10);
  let adjustedYear = selectedYear + YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);
  const date = setYear(calendarDate, adjustedYear);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR_CHUNK);
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
const selectYear = yearEl => {
  if (yearEl.disabled) return;
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(yearEl);
  const selectedYear = parseInt(yearEl.innerHTML, 10);
  let date = setYear(calendarDate, selectedYear);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar - Year Selection View

// #region Calendar Event Handling

/**
 * Hide the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEscapeFromCalendar = event => {
  const {
    datePickerEl,
    externalInputEl
  } = getDatePickerContext(event.target);
  hideCalendar(datePickerEl);
  externalInputEl.focus();
  event.preventDefault();
};

// #endregion Calendar Event Handling

// #region Calendar Date Event Handling

/**
 * Adjust the date and display the calendar if needed.
 *
 * @param {function} adjustDateFn function that returns the adjusted date
 */
const adjustCalendar = adjustDateFn => event => {
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(event.target);
  const date = adjustDateFn(calendarDate);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  if (!isSameDay(calendarDate, cappedDate)) {
    const newCalendar = renderCalendar(calendarEl, cappedDate);
    newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
  }
  event.preventDefault();
};

/**
 * Navigate back one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromDate = adjustCalendar(date => subWeeks(date, 1));

/**
 * Navigate forward one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromDate = adjustCalendar(date => addWeeks(date, 1));

/**
 * Navigate back one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromDate = adjustCalendar(date => subDays(date, 1));

/**
 * Navigate forward one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromDate = adjustCalendar(date => addDays(date, 1));

/**
 * Navigate to the start of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromDate = adjustCalendar(date => startOfWeek(date));

/**
 * Navigate to the end of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromDate = adjustCalendar(date => endOfWeek(date));

/**
 * Navigate forward one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromDate = adjustCalendar(date => addMonths(date, 1));

/**
 * Navigate back one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromDate = adjustCalendar(date => subMonths(date, 1));

/**
 * Navigate forward one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleShiftPageDownFromDate = adjustCalendar(date => addYears(date, 1));

/**
 * Navigate back one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleShiftPageUpFromDate = adjustCalendar(date => subYears(date, 1));

/**
 * display the calendar for the mouseover date.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} dateEl A date element within the date picker component
 */
const handleMouseoverFromDate = dateEl => {
  if (dateEl.disabled) return;
  const calendarEl = dateEl.closest(DATE_PICKER_CALENDAR);
  const currentCalendarDate = calendarEl.dataset.value;
  const hoverDate = dateEl.dataset.value;
  if (hoverDate === currentCalendarDate) return;
  const dateToDisplay = parseDateString(hoverDate);
  const newCalendar = renderCalendar(calendarEl, dateToDisplay);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar Date Event Handling

// #region Calendar Month Event Handling

/**
 * Adjust the month and display the month selection screen if needed.
 *
 * @param {function} adjustMonthFn function that returns the adjusted month
 */
const adjustMonthSelectionScreen = adjustMonthFn => event => {
  const monthEl = event.target;
  const selectedMonth = parseInt(monthEl.dataset.value, 10);
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(monthEl);
  const currentDate = setMonth(calendarDate, selectedMonth);
  let adjustedMonth = adjustMonthFn(selectedMonth);
  adjustedMonth = Math.max(0, Math.min(11, adjustedMonth));
  const date = setMonth(calendarDate, adjustedMonth);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  if (!isSameMonth(currentDate, cappedDate)) {
    const newCalendar = displayMonthSelection(calendarEl, cappedDate.getMonth());
    newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
  }
  event.preventDefault();
};

/**
 * Navigate back three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromMonth = adjustMonthSelectionScreen(month => month - 3);

/**
 * Navigate forward three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromMonth = adjustMonthSelectionScreen(month => month + 3);

/**
 * Navigate back one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromMonth = adjustMonthSelectionScreen(month => month - 1);

/**
 * Navigate forward one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromMonth = adjustMonthSelectionScreen(month => month + 1);

/**
 * Navigate to the start of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromMonth = adjustMonthSelectionScreen(month => month - month % 3);

/**
 * Navigate to the end of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromMonth = adjustMonthSelectionScreen(month => month + 2 - month % 3);

/**
 * Navigate to the last month (December) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromMonth = adjustMonthSelectionScreen(() => 11);

/**
 * Navigate to the first month (January) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromMonth = adjustMonthSelectionScreen(() => 0);

/**
 * update the focus on a month when the mouse moves.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} monthEl A month element within the date picker component
 */
const handleMouseoverFromMonth = monthEl => {
  if (monthEl.disabled) return;
  if (monthEl.classList.contains(CALENDAR_MONTH_FOCUSED_CLASS)) return;
  const focusMonth = parseInt(monthEl.dataset.value, 10);
  const newCalendar = displayMonthSelection(monthEl, focusMonth);
  newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
};

// #endregion Calendar Month Event Handling

// #region Calendar Year Event Handling

/**
 * Adjust the year and display the year selection screen if needed.
 *
 * @param {function} adjustYearFn function that returns the adjusted year
 */
const adjustYearSelectionScreen = adjustYearFn => event => {
  const yearEl = event.target;
  const selectedYear = parseInt(yearEl.dataset.value, 10);
  const {
    calendarEl,
    calendarDate,
    minDate,
    maxDate
  } = getDatePickerContext(yearEl);
  const currentDate = setYear(calendarDate, selectedYear);
  let adjustedYear = adjustYearFn(selectedYear);
  adjustedYear = Math.max(0, adjustedYear);
  const date = setYear(calendarDate, adjustedYear);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  if (!isSameYear(currentDate, cappedDate)) {
    const newCalendar = displayYearSelection(calendarEl, cappedDate.getFullYear());
    newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
  }
  event.preventDefault();
};

/**
 * Navigate back three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromYear = adjustYearSelectionScreen(year => year - 3);

/**
 * Navigate forward three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromYear = adjustYearSelectionScreen(year => year + 3);

/**
 * Navigate back one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromYear = adjustYearSelectionScreen(year => year - 1);

/**
 * Navigate forward one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromYear = adjustYearSelectionScreen(year => year + 1);

/**
 * Navigate to the start of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromYear = adjustYearSelectionScreen(year => year - year % 3);

/**
 * Navigate to the end of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromYear = adjustYearSelectionScreen(year => year + 2 - year % 3);

/**
 * Navigate to back 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromYear = adjustYearSelectionScreen(year => year - YEAR_CHUNK);

/**
 * Navigate forward 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromYear = adjustYearSelectionScreen(year => year + YEAR_CHUNK);

/**
 * update the focus on a year when the mouse moves.
 *
 * @param {MouseEvent} event The mouseover event
 * @param {HTMLButtonElement} dateEl A year element within the date picker component
 */
const handleMouseoverFromYear = yearEl => {
  if (yearEl.disabled) return;
  if (yearEl.classList.contains(CALENDAR_YEAR_FOCUSED_CLASS)) return;
  const focusYear = parseInt(yearEl.dataset.value, 10);
  const newCalendar = displayYearSelection(yearEl, focusYear);
  newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
};

// #endregion Calendar Year Event Handling

// #region Focus Handling Event Handling

const tabHandler = focusable => {
  const getFocusableContext = el => {
    const {
      calendarEl
    } = getDatePickerContext(el);
    const focusableElements = select(focusable, calendarEl);
    const firstTabIndex = 0;
    const lastTabIndex = focusableElements.length - 1;
    const firstTabStop = focusableElements[firstTabIndex];
    const lastTabStop = focusableElements[lastTabIndex];
    const focusIndex = focusableElements.indexOf(activeElement());
    const isLastTab = focusIndex === lastTabIndex;
    const isFirstTab = focusIndex === firstTabIndex;
    const isNotFound = focusIndex === -1;
    return {
      focusableElements,
      isNotFound,
      firstTabStop,
      isFirstTab,
      lastTabStop,
      isLastTab
    };
  };
  return {
    tabAhead(event) {
      const {
        firstTabStop,
        isLastTab,
        isNotFound
      } = getFocusableContext(event.target);
      if (isLastTab || isNotFound) {
        event.preventDefault();
        firstTabStop.focus();
      }
    },
    tabBack(event) {
      const {
        lastTabStop,
        isFirstTab,
        isNotFound
      } = getFocusableContext(event.target);
      if (isFirstTab || isNotFound) {
        event.preventDefault();
        lastTabStop.focus();
      }
    }
  };
};
const datePickerTabEventHandler = tabHandler(DATE_PICKER_FOCUSABLE);
const monthPickerTabEventHandler = tabHandler(MONTH_PICKER_FOCUSABLE);
const yearPickerTabEventHandler = tabHandler(YEAR_PICKER_FOCUSABLE);

// #endregion Focus Handling Event Handling

// #region Date Picker Event Delegation Registration / Component

const datePickerEvents = {
  [CLICK]: {
    [DATE_PICKER_BUTTON]() {
      toggleCalendar(this);
    },
    [CALENDAR_DATE]() {
      selectDate(this);
    },
    [CALENDAR_MONTH]() {
      selectMonth(this);
    },
    [CALENDAR_YEAR]() {
      selectYear(this);
    },
    [CALENDAR_PREVIOUS_MONTH]() {
      displayPreviousMonth(this);
    },
    [CALENDAR_NEXT_MONTH]() {
      displayNextMonth(this);
    },
    [CALENDAR_PREVIOUS_YEAR]() {
      displayPreviousYear(this);
    },
    [CALENDAR_NEXT_YEAR]() {
      displayNextYear(this);
    },
    [CALENDAR_PREVIOUS_YEAR_CHUNK]() {
      displayPreviousYearChunk(this);
    },
    [CALENDAR_NEXT_YEAR_CHUNK]() {
      displayNextYearChunk(this);
    },
    [CALENDAR_MONTH_SELECTION]() {
      const newCalendar = displayMonthSelection(this);
      newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
    },
    [CALENDAR_YEAR_SELECTION]() {
      const newCalendar = displayYearSelection(this);
      newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
    }
  },
  keyup: {
    [DATE_PICKER_CALENDAR](event) {
      const keydown = this.dataset.keydownKeyCode;
      if (`${event.keyCode}` !== keydown) {
        event.preventDefault();
      }
    }
  },
  keydown: {
    [DATE_PICKER_EXTERNAL_INPUT](event) {
      if (event.keyCode === ENTER_KEYCODE) {
        validateDateInput(this);
      }
    },
    [CALENDAR_DATE]: keymap({
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
    }),
    [CALENDAR_DATE_PICKER]: keymap({
      Tab: datePickerTabEventHandler.tabAhead,
      "Shift+Tab": datePickerTabEventHandler.tabBack
    }),
    [CALENDAR_MONTH]: keymap({
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
    }),
    [CALENDAR_MONTH_PICKER]: keymap({
      Tab: monthPickerTabEventHandler.tabAhead,
      "Shift+Tab": monthPickerTabEventHandler.tabBack
    }),
    [CALENDAR_YEAR]: keymap({
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
    }),
    [CALENDAR_YEAR_PICKER]: keymap({
      Tab: yearPickerTabEventHandler.tabAhead,
      "Shift+Tab": yearPickerTabEventHandler.tabBack
    }),
    [DATE_PICKER_CALENDAR](event) {
      this.dataset.keydownKeyCode = event.keyCode;
    },
    [DATE_PICKER](event) {
      const keyMap = keymap({
        Escape: handleEscapeFromCalendar
      });
      keyMap(event);
    }
  },
  focusout: {
    [DATE_PICKER_EXTERNAL_INPUT]() {
      validateDateInput(this);
    },
    [DATE_PICKER](event) {
      if (!this.contains(event.relatedTarget)) {
        hideCalendar(this);
      }
    }
  },
  input: {
    [DATE_PICKER_EXTERNAL_INPUT]() {
      reconcileInputValues(this);
      updateCalendarIfVisible(this);
    }
  }
};
if (!isIosDevice()) {
  datePickerEvents.mouseover = {
    [CALENDAR_DATE_CURRENT_MONTH]() {
      handleMouseoverFromDate(this);
    },
    [CALENDAR_MONTH]() {
      handleMouseoverFromMonth(this);
    },
    [CALENDAR_YEAR]() {
      handleMouseoverFromYear(this);
    }
  };
}
const datePicker = behavior(datePickerEvents, {
  init(root) {
    selectOrMatches(DATE_PICKER, root).forEach(datePickerEl => {
      enhanceDatePicker(datePickerEl);
    });
  },
  getDatePickerContext,
  disable,
  enable,
  isDateInputInvalid,
  setCalendarValue,
  validateDateInput,
  renderCalendar,
  updateCalendarIfVisible
});

// #endregion Date Picker Event Delegation Registration / Component

module.exports = datePicker;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/active-element":44,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/is-ios-device":49,"../../uswds-core/src/js/utils/sanitizer":50,"../../uswds-core/src/js/utils/select":53,"../../uswds-core/src/js/utils/select-or-matches":52,"receptor/keymap":11}],20:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  getDatePickerContext,
  isDateInputInvalid,
  updateCalendarIfVisible
} = require("../../usa-date-picker/src/index");
const DATE_PICKER_CLASS = `${PREFIX}-date-picker`;
const DATE_RANGE_PICKER_CLASS = `${PREFIX}-date-range-picker`;
const DATE_RANGE_PICKER_RANGE_START_CLASS = `${DATE_RANGE_PICKER_CLASS}__range-start`;
const DATE_RANGE_PICKER_RANGE_END_CLASS = `${DATE_RANGE_PICKER_CLASS}__range-end`;
const DATE_PICKER = `.${DATE_PICKER_CLASS}`;
const DATE_RANGE_PICKER = `.${DATE_RANGE_PICKER_CLASS}`;
const DATE_RANGE_PICKER_RANGE_START = `.${DATE_RANGE_PICKER_RANGE_START_CLASS}`;
const DATE_RANGE_PICKER_RANGE_END = `.${DATE_RANGE_PICKER_RANGE_END_CLASS}`;
const DEFAULT_MIN_DATE = "0000-01-01";

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
const getDateRangePickerContext = el => {
  const dateRangePickerEl = el.closest(DATE_RANGE_PICKER);
  if (!dateRangePickerEl) {
    throw new Error(`Element is missing outer ${DATE_RANGE_PICKER}`);
  }
  const rangeStartEl = dateRangePickerEl.querySelector(DATE_RANGE_PICKER_RANGE_START);
  const rangeEndEl = dateRangePickerEl.querySelector(DATE_RANGE_PICKER_RANGE_END);
  return {
    dateRangePickerEl,
    rangeStartEl,
    rangeEndEl
  };
};

/**
 * handle update from range start date picker
 *
 * @param {HTMLElement} el an element within the date range picker
 */
const handleRangeStartUpdate = el => {
  const {
    dateRangePickerEl,
    rangeStartEl,
    rangeEndEl
  } = getDateRangePickerContext(el);
  const {
    internalInputEl
  } = getDatePickerContext(rangeStartEl);
  const updatedDate = internalInputEl.value;
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
const handleRangeEndUpdate = el => {
  const {
    dateRangePickerEl,
    rangeStartEl,
    rangeEndEl
  } = getDateRangePickerContext(el);
  const {
    internalInputEl
  } = getDatePickerContext(rangeEndEl);
  const updatedDate = internalInputEl.value;
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
const enhanceDateRangePicker = el => {
  const dateRangePickerEl = el.closest(DATE_RANGE_PICKER);
  const [rangeStart, rangeEnd] = select(DATE_PICKER, dateRangePickerEl);
  if (!rangeStart) {
    throw new Error(`${DATE_RANGE_PICKER} is missing inner two '${DATE_PICKER}' elements`);
  }
  if (!rangeEnd) {
    throw new Error(`${DATE_RANGE_PICKER} is missing second '${DATE_PICKER}' element`);
  }
  rangeStart.classList.add(DATE_RANGE_PICKER_RANGE_START_CLASS);
  rangeEnd.classList.add(DATE_RANGE_PICKER_RANGE_END_CLASS);
  if (!dateRangePickerEl.dataset.minDate) {
    dateRangePickerEl.dataset.minDate = DEFAULT_MIN_DATE;
  }
  const {
    minDate
  } = dateRangePickerEl.dataset;
  rangeStart.dataset.minDate = minDate;
  rangeEnd.dataset.minDate = minDate;
  const {
    maxDate
  } = dateRangePickerEl.dataset;
  if (maxDate) {
    rangeStart.dataset.maxDate = maxDate;
    rangeEnd.dataset.maxDate = maxDate;
  }
  handleRangeStartUpdate(dateRangePickerEl);
  handleRangeEndUpdate(dateRangePickerEl);
};
const dateRangePicker = behavior({
  "input change": {
    [DATE_RANGE_PICKER_RANGE_START]() {
      handleRangeStartUpdate(this);
    },
    [DATE_RANGE_PICKER_RANGE_END]() {
      handleRangeEndUpdate(this);
    }
  }
}, {
  init(root) {
    selectOrMatches(DATE_RANGE_PICKER, root).forEach(dateRangePickerEl => {
      enhanceDateRangePicker(dateRangePickerEl);
    });
  }
});
module.exports = dateRangePicker;

},{"../../usa-date-picker/src/index":19,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select":53,"../../uswds-core/src/js/utils/select-or-matches":52}],21:[function(require,module,exports){
"use strict";

const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const Sanitizer = require("../../uswds-core/src/js/utils/sanitizer");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const DROPZONE_CLASS = `${PREFIX}-file-input`;
const DROPZONE = `.${DROPZONE_CLASS}`;
const INPUT_CLASS = `${PREFIX}-file-input__input`;
const TARGET_CLASS = `${PREFIX}-file-input__target`;
const INPUT = `.${INPUT_CLASS}`;
const BOX_CLASS = `${PREFIX}-file-input__box`;
const INSTRUCTIONS_CLASS = `${PREFIX}-file-input__instructions`;
const PREVIEW_CLASS = `${PREFIX}-file-input__preview`;
const PREVIEW_HEADING_CLASS = `${PREFIX}-file-input__preview-heading`;
const DISABLED_CLASS = `${PREFIX}-file-input--disabled`;
const CHOOSE_CLASS = `${PREFIX}-file-input__choose`;
const ACCEPTED_FILE_MESSAGE_CLASS = `${PREFIX}-file-input__accepted-files-message`;
const DRAG_TEXT_CLASS = `${PREFIX}-file-input__drag-text`;
const DRAG_CLASS = `${PREFIX}-file-input--drag`;
const LOADING_CLASS = "is-loading";
const HIDDEN_CLASS = "display-none";
const INVALID_FILE_CLASS = "has-invalid-file";
const GENERIC_PREVIEW_CLASS_NAME = `${PREFIX}-file-input__preview-image`;
const GENERIC_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--generic`;
const PDF_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--pdf`;
const WORD_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--word`;
const VIDEO_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--video`;
const EXCEL_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--excel`;
const SPACER_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
let TYPE_IS_VALID = Boolean(true); // logic gate for change listener

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
const getFileInputContext = el => {
  const dropZoneEl = el.closest(DROPZONE);
  if (!dropZoneEl) {
    throw new Error(`Element is missing outer ${DROPZONE}`);
  }
  const inputEl = dropZoneEl.querySelector(INPUT);
  return {
    dropZoneEl,
    inputEl
  };
};

/**
 * Disable the file input component
 *
 * @param {HTMLElement} el An element within the file input component
 */
const disable = el => {
  const {
    dropZoneEl,
    inputEl
  } = getFileInputContext(el);
  inputEl.disabled = true;
  dropZoneEl.classList.add(DISABLED_CLASS);
  dropZoneEl.setAttribute("aria-disabled", "true");
};

/**
 * Enable the file input component
 *
 * @param {HTMLElement} el An element within the file input component
 */
const enable = el => {
  const {
    dropZoneEl,
    inputEl
  } = getFileInputContext(el);
  inputEl.disabled = false;
  dropZoneEl.classList.remove(DISABLED_CLASS);
  dropZoneEl.removeAttribute("aria-disabled");
};

/**
 *
 * @param {String} s special characters
 * @returns {String} replaces specified values
 */
const replaceName = s => {
  const c = s.charCodeAt(0);
  if (c === 32) return "-";
  if (c >= 65 && c <= 90) return `img_${s.toLowerCase()}`;
  return `__${("000", c.toString(16)).slice(-4)}`;
};

/**
 * Creates an ID name for each file that strips all invalid characters.
 * @param {String} name - name of the file added to file input (searchvalue)
 * @returns {String} same characters as the name with invalid chars removed (newvalue)
 */
const makeSafeForID = name => name.replace(/[^a-z0-9]/g, replaceName);

// Takes a generated safe ID and creates a unique ID.
const createUniqueID = name => `${name}-${Math.floor(Date.now().toString() / 1000)}`;

/**
 * Builds full file input component
 * @param {HTMLElement} fileInputEl - original file input on page
 * @returns {HTMLElement|HTMLElement} - Instructions, target area div
 */
const buildFileInput = fileInputEl => {
  const acceptsMultiple = fileInputEl.hasAttribute("multiple");
  const fileInputParent = document.createElement("div");
  const dropTarget = document.createElement("div");
  const box = document.createElement("div");
  const instructions = document.createElement("div");
  const disabled = fileInputEl.hasAttribute("disabled");
  let defaultAriaLabel;

  // Adds class names and other attributes
  fileInputEl.classList.remove(DROPZONE_CLASS);
  fileInputEl.classList.add(INPUT_CLASS);
  fileInputParent.classList.add(DROPZONE_CLASS);
  box.classList.add(BOX_CLASS);
  instructions.classList.add(INSTRUCTIONS_CLASS);
  instructions.setAttribute("aria-hidden", "true");
  dropTarget.classList.add(TARGET_CLASS);
  // Encourage screenreader to read out aria changes immediately following upload status change
  fileInputEl.setAttribute("aria-live", "polite");

  // Adds child elements to the DOM
  fileInputEl.parentNode.insertBefore(dropTarget, fileInputEl);
  fileInputEl.parentNode.insertBefore(fileInputParent, dropTarget);
  dropTarget.appendChild(fileInputEl);
  fileInputParent.appendChild(dropTarget);
  fileInputEl.parentNode.insertBefore(instructions, fileInputEl);
  fileInputEl.parentNode.insertBefore(box, fileInputEl);

  // Disabled styling
  if (disabled) {
    disable(fileInputEl);
  }

  // Sets instruction test and aria-label based on whether or not multiple files are accepted
  if (acceptsMultiple) {
    defaultAriaLabel = "No files selected";
    instructions.innerHTML = Sanitizer.escapeHTML`<span class="${DRAG_TEXT_CLASS}">Drag files here or </span><span class="${CHOOSE_CLASS}">choose from folder</span>`;
    fileInputEl.setAttribute("aria-label", defaultAriaLabel);
    fileInputEl.setAttribute("data-default-aria-label", defaultAriaLabel);
  } else {
    defaultAriaLabel = "No file selected";
    instructions.innerHTML = Sanitizer.escapeHTML`<span class="${DRAG_TEXT_CLASS}">Drag file here or </span><span class="${CHOOSE_CLASS}">choose from folder</span>`;
    fileInputEl.setAttribute("aria-label", defaultAriaLabel);
    fileInputEl.setAttribute("data-default-aria-label", defaultAriaLabel);
  }

  // IE11 and Edge do not support drop files on file inputs, so we've removed text that indicates that
  if (/rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    fileInputParent.querySelector(`.${DRAG_TEXT_CLASS}`).outerHTML = "";
  }
  return {
    instructions,
    dropTarget
  };
};

/**
 * Removes image previews, we want to start with a clean list every time files are added to the file input
 * @param {HTMLElement} dropTarget - target area div that encases the input
 * @param {HTMLElement} instructions - text to inform users to drag or select files
 */
const removeOldPreviews = (dropTarget, instructions, inputAriaLabel) => {
  const filePreviews = dropTarget.querySelectorAll(`.${PREVIEW_CLASS}`);
  const fileInputElement = dropTarget.querySelector(INPUT);
  const currentPreviewHeading = dropTarget.querySelector(`.${PREVIEW_HEADING_CLASS}`);
  const currentErrorMessage = dropTarget.querySelector(`.${ACCEPTED_FILE_MESSAGE_CLASS}`);

  /**
   * finds the parent of the passed node and removes the child
   * @param {HTMLElement} node
   */
  const removeImages = node => {
    node.parentNode.removeChild(node);
  };

  // Remove the heading above the previews
  if (currentPreviewHeading) {
    currentPreviewHeading.outerHTML = "";
  }

  // Remove existing error messages
  if (currentErrorMessage) {
    currentErrorMessage.outerHTML = "";
    dropTarget.classList.remove(INVALID_FILE_CLASS);
  }

  // Get rid of existing previews if they exist, show instructions
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

const handleChange = (e, fileInputEl, instructions, dropTarget) => {
  const fileNames = e.target.files;
  const filePreviewsHeading = document.createElement("div");
  const inputAriaLabel = fileInputEl.dataset.defaultAriaLabel;
  const fileStore = [];

  // First, get rid of existing previews
  removeOldPreviews(dropTarget, instructions, inputAriaLabel);

  // Then, iterate through files list and:
  // 1. Add selected file list names to aria-label
  // 2. Create previews
  for (let i = 0; i < fileNames.length; i += 1) {
    const reader = new FileReader();
    const fileName = fileNames[i].name;

    // Push updated file names into the store array
    fileStore.push(fileName);

    // read out the store array via aria-label, wording options vary based on file count
    if (i === 0) {
      fileInputEl.setAttribute("aria-label", `You have selected the file: ${fileName}`);
    } else if (i >= 1) {
      fileInputEl.setAttribute("aria-label", `You have selected ${fileNames.length} files: ${fileStore.join(", ")}`);
    }

    // Starts with a loading image while preview is created
    reader.onloadstart = function createLoadingImage() {
      const imageId = createUniqueID(makeSafeForID(fileName));
      instructions.insertAdjacentHTML("afterend", Sanitizer.escapeHTML`<div class="${PREVIEW_CLASS}" aria-hidden="true">
          <img id="${imageId}" src="${SPACER_GIF}" alt="" class="${GENERIC_PREVIEW_CLASS_NAME} ${LOADING_CLASS}"/>${fileName}
        <div>`);
    };

    // Not all files will be able to generate previews. In case this happens, we provide several types "generic previews" based on the file extension.
    reader.onloadend = function createFilePreview() {
      const imageId = createUniqueID(makeSafeForID(fileName));
      const previewImage = document.getElementById(imageId);
      if (fileName.indexOf(".pdf") > 0) {
        previewImage.setAttribute("onerror", `this.onerror=null;this.src="${SPACER_GIF}"; this.classList.add("${PDF_PREVIEW_CLASS}")`);
      } else if (fileName.indexOf(".doc") > 0 || fileName.indexOf(".pages") > 0) {
        previewImage.setAttribute("onerror", `this.onerror=null;this.src="${SPACER_GIF}"; this.classList.add("${WORD_PREVIEW_CLASS}")`);
      } else if (fileName.indexOf(".xls") > 0 || fileName.indexOf(".numbers") > 0) {
        previewImage.setAttribute("onerror", `this.onerror=null;this.src="${SPACER_GIF}"; this.classList.add("${EXCEL_PREVIEW_CLASS}")`);
      } else if (fileName.indexOf(".mov") > 0 || fileName.indexOf(".mp4") > 0) {
        previewImage.setAttribute("onerror", `this.onerror=null;this.src="${SPACER_GIF}"; this.classList.add("${VIDEO_PREVIEW_CLASS}")`);
      } else {
        previewImage.setAttribute("onerror", `this.onerror=null;this.src="${SPACER_GIF}"; this.classList.add("${GENERIC_PREVIEW_CLASS}")`);
      }

      // Removes loader and displays preview
      previewImage.classList.remove(LOADING_CLASS);
      previewImage.src = reader.result;
    };
    if (fileNames[i]) {
      reader.readAsDataURL(fileNames[i]);
    }

    // Adds heading above file previews, pluralizes if there are multiple
    if (i === 0) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = `Selected file <span class="usa-file-input__choose">Change file</span>`;
    } else if (i >= 1) {
      dropTarget.insertBefore(filePreviewsHeading, instructions);
      filePreviewsHeading.innerHTML = Sanitizer.escapeHTML`${i + 1} files selected <span class="usa-file-input__choose">Change files</span>`;
    }

    // Hides null state content and sets preview heading class
    if (filePreviewsHeading) {
      instructions.classList.add(HIDDEN_CLASS);
      filePreviewsHeading.classList.add(PREVIEW_HEADING_CLASS);
    }
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
const preventInvalidFiles = (e, fileInputEl, instructions, dropTarget) => {
  const acceptedFilesAttr = fileInputEl.getAttribute("accept");
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
  const isIncluded = (file, value) => {
    let returnValue = false;
    const pos = file.indexOf(value);
    if (pos >= 0) {
      returnValue = true;
    }
    return returnValue;
  };

  // Runs if only specific files are accepted
  if (acceptedFilesAttr) {
    const acceptedFiles = acceptedFilesAttr.split(",");
    const errorMessage = document.createElement("div");

    // If multiple files are dragged, this iterates through them and look for any files that are not accepted.
    let allFilesAllowed = true;
    const scannedFiles = e.target.files || e.dataTransfer.files;
    for (let i = 0; i < scannedFiles.length; i += 1) {
      const file = scannedFiles[i];
      if (allFilesAllowed) {
        for (let j = 0; j < acceptedFiles.length; j += 1) {
          const fileType = acceptedFiles[j];
          allFilesAllowed = file.name.indexOf(fileType) > 0 || isIncluded(file.type, fileType.replace(/\*/g, ""));
          if (allFilesAllowed) {
            TYPE_IS_VALID = true;
            break;
          }
        }
      } else break;
    }

    // If dragged files are not accepted, this removes them from the value of the input and creates and error state
    if (!allFilesAllowed) {
      removeOldPreviews(dropTarget, instructions);
      fileInputEl.value = ""; // eslint-disable-line no-param-reassign
      dropTarget.insertBefore(errorMessage, fileInputEl);
      errorMessage.textContent = fileInputEl.dataset.errormessage || `This is not a valid file type.`;
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
const handleUpload = (event, element, instructionsEl, dropTargetEl) => {
  preventInvalidFiles(event, element, instructionsEl, dropTargetEl);
  if (TYPE_IS_VALID === true) {
    handleChange(event, element, instructionsEl, dropTargetEl);
  }
};
const fileInput = behavior({}, {
  init(root) {
    selectOrMatches(DROPZONE, root).forEach(fileInputEl => {
      const {
        instructions,
        dropTarget
      } = buildFileInput(fileInputEl);
      dropTarget.addEventListener("dragover", function handleDragOver() {
        this.classList.add(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener("dragleave", function handleDragLeave() {
        this.classList.remove(DRAG_CLASS);
      }, false);
      dropTarget.addEventListener("drop", function handleDrop() {
        this.classList.remove(DRAG_CLASS);
      }, false);
      fileInputEl.addEventListener("change", e => handleUpload(e, fileInputEl, instructions, dropTarget), false);
    });
  },
  teardown(root) {
    selectOrMatches(INPUT, root).forEach(fileInputEl => {
      const fileInputTopElement = fileInputEl.parentElement.parentElement;
      fileInputTopElement.parentElement.replaceChild(fileInputEl, fileInputTopElement);
      // eslint-disable-next-line no-param-reassign
      fileInputEl.className = DROPZONE_CLASS;
    });
  },
  getFileInputContext,
  disable,
  enable
});
module.exports = fileInput;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/sanitizer":50,"../../uswds-core/src/js/utils/select-or-matches":52}],22:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const SCOPE = `.${PREFIX}-footer--big`;
const NAV = `${SCOPE} nav`;
const BUTTON = `${NAV} .${PREFIX}-footer__primary-link`;
const HIDE_MAX_WIDTH = 480;

/**
 * Expands selected footer menu panel, while collapsing others
 */
function showPanel() {
  if (window.innerWidth < HIDE_MAX_WIDTH) {
    const isOpen = this.getAttribute("aria-expanded") === "true";
    const thisFooter = this.closest(SCOPE);

    // Close all other menus
    thisFooter.querySelectorAll(BUTTON).forEach(button => {
      button.setAttribute("aria-expanded", false);
    });
    this.setAttribute("aria-expanded", !isOpen);
  }
}

/**
 * Swaps the <h4> element for a <button> element (and vice-versa) and sets id
 * of menu list
 *
 * @param {Boolean} isMobile - If the footer is in mobile configuration
 */
function toggleHtmlTag(isMobile) {
  const bigFooter = document.querySelector(SCOPE);
  if (!bigFooter) {
    return;
  }
  const primaryLinks = bigFooter.querySelectorAll(BUTTON);
  primaryLinks.forEach(currentElement => {
    const currentElementClasses = currentElement.getAttribute("class");
    const preservedHtmlTag = currentElement.getAttribute("data-tag") || currentElement.tagName;
    const newElementType = isMobile ? "button" : preservedHtmlTag;

    // Create the new element
    const newElement = document.createElement(newElementType);
    newElement.setAttribute("class", currentElementClasses);
    newElement.classList.toggle(`${PREFIX}-footer__primary-link--button`, isMobile);
    newElement.textContent = currentElement.textContent;
    if (isMobile) {
      newElement.setAttribute("data-tag", currentElement.tagName);
      const menuId = `${PREFIX}-footer-menu-list-${Math.floor(Math.random() * 100000)}`;
      newElement.setAttribute("aria-controls", menuId);
      newElement.setAttribute("aria-expanded", "false");
      currentElement.nextElementSibling.setAttribute("id", menuId);
      newElement.setAttribute("type", "button");
    }

    // Insert the new element and delete the old
    currentElement.after(newElement);
    currentElement.remove();
  });
}
const resize = event => {
  toggleHtmlTag(event.matches);
};
module.exports = behavior({
  [CLICK]: {
    [BUTTON]: showPanel
  }
}, {
  // export for use elsewhere
  HIDE_MAX_WIDTH,
  init() {
    toggleHtmlTag(window.innerWidth < HIDE_MAX_WIDTH);
    this.mediaQueryList = window.matchMedia(`(max-width: ${HIDE_MAX_WIDTH - 0.1}px)`);
    this.mediaQueryList.addListener(resize);
  },
  teardown() {
    this.mediaQueryList.removeListener(resize);
  }
});

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45}],23:[function(require,module,exports){
"use strict";

const keymap = require("receptor/keymap");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const toggle = require("../../uswds-core/src/js/utils/toggle");
const FocusTrap = require("../../uswds-core/src/js/utils/focus-trap");
const accordion = require("../../usa-accordion/src/index");
const ScrollBarWidth = require("../../uswds-core/src/js/utils/scrollbar-width");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const BODY = "body";
const HEADER = `.${PREFIX}-header`;
const NAV = `.${PREFIX}-nav`;
const NAV_CONTAINER = `.${PREFIX}-nav-container`;
const NAV_PRIMARY = `.${PREFIX}-nav__primary`;
const NAV_PRIMARY_ITEM = `.${PREFIX}-nav__primary-item`;
const NAV_CONTROL = `button.${PREFIX}-nav__link`;
const NAV_LINKS = `${NAV} a`;
const NON_NAV_HIDDEN_ATTRIBUTE = `data-nav-hidden`;
const OPENERS = `.${PREFIX}-menu-btn`;
const CLOSE_BUTTON = `.${PREFIX}-nav__close`;
const OVERLAY = `.${PREFIX}-overlay`;
const CLOSERS = `${CLOSE_BUTTON}, .${PREFIX}-overlay`;
const TOGGLES = [NAV, OVERLAY].join(", ");
const NON_NAV_ELEMENTS = `body *:not(${HEADER}, ${NAV_CONTAINER}, ${NAV}, ${NAV} *):not([aria-hidden])`;
const NON_NAV_HIDDEN = `[${NON_NAV_HIDDEN_ATTRIBUTE}]`;
const ACTIVE_CLASS = "usa-js-mobile-nav--active";
const VISIBLE_CLASS = "is-visible";
let navigation;
let navActive;
let nonNavElements;
const isActive = () => document.body.classList.contains(ACTIVE_CLASS);
const SCROLLBAR_WIDTH = ScrollBarWidth();
const INITIAL_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
const TEMPORARY_PADDING = `${parseInt(INITIAL_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10)}px`;
const hideNonNavItems = () => {
  const headerParent = document.querySelector(`${HEADER}`).parentNode;
  nonNavElements = document.querySelectorAll(NON_NAV_ELEMENTS);
  nonNavElements.forEach(nonNavElement => {
    if (nonNavElement !== headerParent) {
      nonNavElement.setAttribute("aria-hidden", true);
      nonNavElement.setAttribute(NON_NAV_HIDDEN_ATTRIBUTE, "");
    }
  });
};
const showNonNavItems = () => {
  nonNavElements = document.querySelectorAll(NON_NAV_HIDDEN);
  if (!nonNavElements) {
    return;
  }

  // Remove aria-hidden from non-header elements
  nonNavElements.forEach(nonNavElement => {
    nonNavElement.removeAttribute("aria-hidden");
    nonNavElement.removeAttribute(NON_NAV_HIDDEN_ATTRIBUTE);
  });
};

// Toggle all non-header elements #3527.
const toggleNonNavItems = active => {
  if (active) {
    hideNonNavItems();
  } else {
    showNonNavItems();
  }
};
const toggleNav = active => {
  const {
    body
  } = document;
  const safeActive = typeof active === "boolean" ? active : !isActive();
  body.classList.toggle(ACTIVE_CLASS, safeActive);
  select(TOGGLES).forEach(el => el.classList.toggle(VISIBLE_CLASS, safeActive));
  navigation.focusTrap.update(safeActive);
  const closeButton = body.querySelector(CLOSE_BUTTON);
  const menuButton = document.querySelector(OPENERS);
  body.style.paddingRight = body.style.paddingRight === TEMPORARY_PADDING ? INITIAL_PADDING : TEMPORARY_PADDING;
  toggleNonNavItems(safeActive);
  if (safeActive && closeButton) {
    // The mobile nav was just activated. Focus on the close button, which is
    // just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!safeActive && menuButton && getComputedStyle(menuButton).display !== "none") {
    // The mobile nav was just deactivated. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }
  return safeActive;
};
const resize = () => {
  const closer = document.body.querySelector(CLOSE_BUTTON);
  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // When the mobile nav is active, and the close box isn't visible,
    // we know the user's viewport has been resized to be larger.
    // Let's make the page state consistent by deactivating the mobile nav.
    navigation.toggleNav.call(closer, false);
  }
};
const onMenuClose = () => navigation.toggleNav.call(navigation, false);
const hideActiveNavDropdown = () => {
  if (!navActive) {
    return;
  }
  toggle(navActive, false);
  navActive = null;
};
const focusNavButton = event => {
  const parentNavItem = event.target.closest(NAV_PRIMARY_ITEM);

  // Only shift focus if within dropdown
  if (!event.target.matches(NAV_CONTROL)) {
    const navControl = parentNavItem.querySelector(NAV_CONTROL);
    if (navControl) {
      navControl.focus();
    }
  }
};
const handleEscape = event => {
  hideActiveNavDropdown();
  focusNavButton(event);
};
navigation = behavior({
  [CLICK]: {
    [NAV_CONTROL]() {
      // If another nav is open, close it
      if (navActive !== this) {
        hideActiveNavDropdown();
      }
      // store a reference to the last clicked nav link element, so we
      // can hide the dropdown if another element on the page is clicked
      if (!navActive) {
        navActive = this;
        toggle(navActive, true);
      }

      // Do this so the event handler on the body doesn't fire
      return false;
    },
    [BODY]: hideActiveNavDropdown,
    [OPENERS]: toggleNav,
    [CLOSERS]: toggleNav,
    [NAV_LINKS]() {
      // A navigation link has been clicked! We want to collapse any
      // hierarchical navigation UI it's a part of, so that the user
      // can focus on whatever they've just selected.

      // Some navigation links are inside accordions; when they're
      // clicked, we want to collapse those accordions.
      const acc = this.closest(accordion.ACCORDION);
      if (acc) {
        accordion.getButtons(acc).forEach(btn => accordion.hide(btn));
      }

      // If the mobile navigation menu is active, we want to hide it.
      if (isActive()) {
        navigation.toggleNav.call(navigation, false);
      }
    }
  },
  keydown: {
    [NAV_PRIMARY]: keymap({
      Escape: handleEscape
    })
  },
  focusout: {
    [NAV_PRIMARY](event) {
      const nav = event.target.closest(NAV_PRIMARY);
      if (!nav.contains(event.relatedTarget)) {
        hideActiveNavDropdown();
      }
    }
  }
}, {
  init(root) {
    const trapContainer = root.matches(NAV) ? root : root.querySelector(NAV);
    if (trapContainer) {
      navigation.focusTrap = FocusTrap(trapContainer, {
        Escape: onMenuClose
      });
    }
    resize();
    window.addEventListener("resize", resize, false);
  },
  teardown() {
    window.removeEventListener("resize", resize, false);
    navActive = false;
  },
  focusTrap: null,
  toggleNav
});
module.exports = navigation;

},{"../../usa-accordion/src/index":15,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/focus-trap":47,"../../uswds-core/src/js/utils/scrollbar-width":51,"../../uswds-core/src/js/utils/select":53,"../../uswds-core/src/js/utils/toggle":56,"receptor/keymap":11}],24:[function(require,module,exports){
"use strict";

const once = require("receptor/once");
const keymap = require("receptor/keymap");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const Sanitizer = require("../../uswds-core/src/js/utils/sanitizer");
const CURRENT_CLASS = `${PREFIX}-current`;
const IN_PAGE_NAV_TITLE_TEXT = "On this page";
const IN_PAGE_NAV_TITLE_HEADING_LEVEL = "h4";
const IN_PAGE_NAV_SCROLL_OFFSET = 0;
const IN_PAGE_NAV_ROOT_MARGIN = "0px 0px 0px 0px";
const IN_PAGE_NAV_THRESHOLD = "1";
const IN_PAGE_NAV_CLASS = `${PREFIX}-in-page-nav`;
const IN_PAGE_NAV_ANCHOR_CLASS = `${PREFIX}-anchor`;
const IN_PAGE_NAV_NAV_CLASS = `${IN_PAGE_NAV_CLASS}__nav`;
const IN_PAGE_NAV_LIST_CLASS = `${IN_PAGE_NAV_CLASS}__list`;
const IN_PAGE_NAV_ITEM_CLASS = `${IN_PAGE_NAV_CLASS}__item`;
const IN_PAGE_NAV_LINK_CLASS = `${IN_PAGE_NAV_CLASS}__link`;
const IN_PAGE_NAV_TITLE_CLASS = `${IN_PAGE_NAV_CLASS}__heading`;
const SUB_ITEM_CLASS = `${IN_PAGE_NAV_ITEM_CLASS}--sub-item`;
const MAIN_ELEMENT = "main";

/**
 * Set the active link state for the currently observed section
 *
 * @param {HTMLElement} el An element within the in-page nav component
 */
const setActive = el => {
  const allLinks = document.querySelectorAll(`.${IN_PAGE_NAV_LINK_CLASS}`);
  el.map(i => {
    if (i.isIntersecting === true && i.intersectionRatio >= 1) {
      allLinks.forEach(link => link.classList.remove(CURRENT_CLASS));
      document.querySelector(`a[href="#${i.target.id}"]`).classList.add(CURRENT_CLASS);
      return true;
    }
    return false;
  });
};

/**
 * Return a node list of section headings
 *
 * @return {HTMLElement[]} - An array of DOM nodes
 */
const getSectionHeadings = () => {
  const sectionHeadings = document.querySelectorAll(`${MAIN_ELEMENT} h2, ${MAIN_ELEMENT} h3`);
  return sectionHeadings;
};

/**
 * Return a node list of section anchor tags
 *
 * @return {HTMLElement[]} - An array of DOM nodes
 */
const getSectionAnchors = () => {
  const sectionAnchors = document.querySelectorAll(`.${IN_PAGE_NAV_ANCHOR_CLASS}`);
  return sectionAnchors;
};

/**
 * Generates a unique ID for the given heading element.
 *
 * @param {HTMLHeadingElement} heading
 *
 * @return {string} - Unique ID
 */
const getHeadingId = heading => {
  const baseId = heading.textContent.toLowerCase()
  // Replace non-alphanumeric characters with dashes
  .replace(/[^a-z\d]/g, "-")
  // Replace a sequence of two or more dashes with a single dash
  .replace(/-{2,}/g, "-")
  // Trim leading or trailing dash (there should only ever be one)
  .replace(/^-|-$/g, "");
  let id;
  let suffix = 0;
  do {
    id = baseId;

    // To avoid conflicts with existing IDs on the page, loop and append an
    // incremented suffix until a unique ID is found.
    suffix += 1;
    if (suffix > 1) {
      id += `-${suffix}`;
    }
  } while (document.getElementById(id));
  return id;
};

/**
 * Return a section id/anchor hash without the number sign
 *
 * @return {String} - Id value with the number sign removed
 */
const getSectionId = value => {
  let id;

  // Check if value is an event or element and get the cleaned up id
  if (value && value.nodeType === 1) {
    id = value.getAttribute("href").replace("#", "");
  } else {
    id = value.target.hash.replace("#", "");
  }
  return id;
};

/**
 * Scroll smoothly to a section based on the passed in element
 *
 * @param {HTMLElement} - Id value with the number sign removed
 */
const handleScrollToSection = el => {
  const inPageNavEl = document.querySelector(`.${IN_PAGE_NAV_CLASS}`);
  const inPageNavScrollOffset = inPageNavEl.dataset.scrollOffset || IN_PAGE_NAV_SCROLL_OFFSET;
  window.scroll({
    behavior: "smooth",
    top: el.offsetTop - inPageNavScrollOffset,
    block: "start"
  });
  if (window.location.hash.slice(1) !== el.id) {
    window.history.pushState(null, "", `#${el.id}`);
  }
};

/**
 * Scrolls the page to the section corresponding to the current hash fragment, if one exists.
 */
const scrollToCurrentSection = () => {
  const hashFragment = window.location.hash.slice(1);
  if (hashFragment) {
    const anchorTag = document.getElementById(hashFragment);
    if (anchorTag) {
      handleScrollToSection(anchorTag);
    }
  }
};

/**
 * Create the in-page navigation component
 *
 * @param {HTMLElement} inPageNavEl The in-page nav element
 */
const createInPageNav = inPageNavEl => {
  const inPageNavTitleText = Sanitizer.escapeHTML`${inPageNavEl.dataset.titleText || IN_PAGE_NAV_TITLE_TEXT}`;
  const inPageNavTitleHeadingLevel = Sanitizer.escapeHTML`${inPageNavEl.dataset.titleHeadingLevel || IN_PAGE_NAV_TITLE_HEADING_LEVEL}`;
  const inPageNavRootMargin = Sanitizer.escapeHTML`${inPageNavEl.dataset.rootMargin || IN_PAGE_NAV_ROOT_MARGIN}`;
  const inPageNavThreshold = Sanitizer.escapeHTML`${inPageNavEl.dataset.threshold || IN_PAGE_NAV_THRESHOLD}`;
  const options = {
    root: null,
    rootMargin: inPageNavRootMargin,
    threshold: [inPageNavThreshold]
  };
  const sectionHeadings = getSectionHeadings();
  const inPageNav = document.createElement("nav");
  inPageNav.setAttribute("aria-label", inPageNavTitleText);
  inPageNav.classList.add(IN_PAGE_NAV_NAV_CLASS);
  const inPageNavTitle = document.createElement(inPageNavTitleHeadingLevel);
  inPageNavTitle.classList.add(IN_PAGE_NAV_TITLE_CLASS);
  inPageNavTitle.setAttribute("tabindex", "0");
  inPageNavTitle.textContent = inPageNavTitleText;
  inPageNav.appendChild(inPageNavTitle);
  const inPageNavList = document.createElement("ul");
  inPageNavList.classList.add(IN_PAGE_NAV_LIST_CLASS);
  inPageNav.appendChild(inPageNavList);
  sectionHeadings.forEach(el => {
    const listItem = document.createElement("li");
    const navLinks = document.createElement("a");
    const anchorTag = document.createElement("a");
    const textContentOfLink = el.textContent;
    const tag = el.tagName.toLowerCase();
    listItem.classList.add(IN_PAGE_NAV_ITEM_CLASS);
    if (tag === "h3") {
      listItem.classList.add(SUB_ITEM_CLASS);
    }
    const headingId = getHeadingId(el);
    navLinks.setAttribute("href", `#${headingId}`);
    navLinks.setAttribute("class", IN_PAGE_NAV_LINK_CLASS);
    navLinks.textContent = textContentOfLink;
    anchorTag.setAttribute("id", headingId);
    anchorTag.setAttribute("class", IN_PAGE_NAV_ANCHOR_CLASS);
    el.insertAdjacentElement("afterbegin", anchorTag);
    inPageNavList.appendChild(listItem);
    listItem.appendChild(navLinks);
  });
  inPageNavEl.appendChild(inPageNav);
  const anchorTags = getSectionAnchors();
  const observeSections = new window.IntersectionObserver(setActive, options);
  anchorTags.forEach(tag => {
    observeSections.observe(tag);
  });
};

/**
 * Handle click from link
 *
 * @param {HTMLElement} el An element within the in-page nav component
 */
const handleClickFromLink = el => {
  const elementToScrollTo = document.querySelector(el.hash);
  handleScrollToSection(elementToScrollTo);
};

/**
 * Handle the enter event from a link within the in-page nav component
 *
 * @param {KeyboardEvent} event An event within the in-page nav component
 */
const handleEnterFromLink = event => {
  const id = getSectionId(event);
  const targetAnchor = document.getElementById(id);
  const target = targetAnchor.parentElement;
  if (target) {
    target.setAttribute("tabindex", 0);
    target.focus();
    target.addEventListener("blur", once(() => {
      target.setAttribute("tabindex", -1);
    }));
  } else {
    // throw an error?
  }
  handleScrollToSection(targetAnchor);
};
const inPageNavigation = behavior({
  [CLICK]: {
    [`.${IN_PAGE_NAV_LINK_CLASS}`](event) {
      event.preventDefault();
      if (this.disabled) return;
      handleClickFromLink(this);
    }
  },
  keydown: {
    [`.${IN_PAGE_NAV_LINK_CLASS}`]: keymap({
      Enter: handleEnterFromLink
    })
  }
}, {
  init(root) {
    selectOrMatches(`.${IN_PAGE_NAV_CLASS}`, root).forEach(inPageNavEl => {
      createInPageNav(inPageNavEl);
      scrollToCurrentSection();
    });
  }
});
module.exports = inPageNavigation;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/sanitizer":50,"../../uswds-core/src/js/utils/select-or-matches":52,"receptor/keymap":11,"receptor/once":12}],25:[function(require,module,exports){
"use strict";

const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const MASKED_CLASS = `${PREFIX}-masked`;
const MASKED = `.${MASKED_CLASS}`;
const MASK = `${PREFIX}-input-mask`;
const MASK_CONTENT = `${MASK}--content`;
const PLACEHOLDER = "placeholder";
const CONTEXT = "form";

// User defined Values
const maskedNumber = "_#dDmMyY9";
const maskedLetter = "A";

// replaces each masked input with a shell containing the input and it's mask.
const createMaskedInputShell = input => {
  const placeholder = input.getAttribute(`${PLACEHOLDER}`);
  if (placeholder) {
    input.setAttribute("maxlength", placeholder.length);
    input.setAttribute("data-placeholder", placeholder);
    input.removeAttribute(`${PLACEHOLDER}`);
  } else {
    return;
  }
  const shell = document.createElement("span");
  shell.classList.add(MASK);
  shell.setAttribute("data-mask", placeholder);
  const content = document.createElement("span");
  content.classList.add(MASK_CONTENT);
  content.setAttribute("aria-hidden", "true");
  content.id = `${input.id}Mask`;
  content.textContent = placeholder;
  shell.appendChild(content);
  input.closest(CONTEXT).insertBefore(shell, input);
  shell.appendChild(input);
};
const setValueOfMask = el => {
  const {
    value
  } = el;
  const placeholderVal = `${el.dataset.placeholder.substr(value.length)}`;
  const theIEl = document.createElement("i");
  theIEl.textContent = value;
  return [theIEl, placeholderVal];
};
const strippedValue = (isCharsetPresent, value) => isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");
const isInteger = value => !Number.isNaN(parseInt(value, 10));
const isLetter = value => value ? value.match(/[A-Z]/i) : false;
const handleCurrentValue = el => {
  const isCharsetPresent = el.dataset.charset;
  const placeholder = isCharsetPresent || el.dataset.placeholder;
  const {
    value
  } = el;
  const len = placeholder.length;
  let newValue = "";
  let i;
  let charIndex;
  const strippedVal = strippedValue(isCharsetPresent, value);
  for (i = 0, charIndex = 0; i < len; i += 1) {
    const isInt = isInteger(strippedVal[charIndex]);
    const isLet = isLetter(strippedVal[charIndex]);
    const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
    const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
    if (matchesNumber && isInt || isCharsetPresent && matchesLetter && isLet) {
      newValue += strippedVal[charIndex];
      charIndex += 1;
    } else if (!isCharsetPresent && !isInt && matchesNumber || isCharsetPresent && (matchesLetter && !isLet || matchesNumber && !isInt)) {
      return newValue;
    } else {
      newValue += placeholder[i];
    }
    // break if no characters left and the pattern is non-special character
    if (strippedVal[charIndex] === undefined) {
      break;
    }
  }
  return newValue;
};
const handleValueChange = el => {
  const inputEl = el;
  const id = inputEl.getAttribute("id");
  inputEl.value = handleCurrentValue(inputEl);
  const maskVal = setValueOfMask(el);
  const maskEl = document.getElementById(`${id}Mask`);
  maskEl.textContent = "";
  maskEl.replaceChildren(maskVal[0], maskVal[1]);
};
const inputMaskEvents = {
  keyup: {
    [MASKED]() {
      handleValueChange(this);
    }
  }
};
const inputMask = behavior(inputMaskEvents, {
  init(root) {
    selectOrMatches(MASKED, root).forEach(maskedInput => {
      createMaskedInputShell(maskedInput);
    });
  }
});
module.exports = inputMask;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select-or-matches":52}],26:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const CONTAINER = `.${PREFIX}-input-group`;
const INPUT = `${CONTAINER} .${PREFIX}-input`;
const DECORATION = `${CONTAINER} .${PREFIX}-input-prefix, ${CONTAINER} .${PREFIX}-input-suffix`;
const FOCUS_CLASS = "is-focused";
function setFocus(el) {
  el.closest(CONTAINER).querySelector(`.${PREFIX}-input`).focus();
}
function handleFocus() {
  this.closest(CONTAINER).classList.add(FOCUS_CLASS);
}
function handleBlur() {
  this.closest(CONTAINER).classList.remove(FOCUS_CLASS);
}
const inputPrefixSuffix = behavior({
  [CLICK]: {
    [DECORATION]() {
      setFocus(this);
    }
  }
}, {
  init(root) {
    select(INPUT, root).forEach(inputEl => {
      inputEl.addEventListener("focus", handleFocus, false);
      inputEl.addEventListener("blur", handleBlur, false);
    });
  }
});
module.exports = inputPrefixSuffix;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select":53}],27:[function(require,module,exports){
"use strict";

const keymap = require("receptor/keymap");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const toggle = require("../../uswds-core/src/js/utils/toggle");
const FocusTrap = require("../../uswds-core/src/js/utils/focus-trap");
const accordion = require("../../usa-accordion/src/index");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const BODY = "body";
const LANGUAGE = `.${PREFIX}-language`;
const LANGUAGE_SUB = `.${PREFIX}-language__submenu`;
const LANGUAGE_PRIMARY = `.${PREFIX}-language__primary`;
const LANGUAGE_PRIMARY_ITEM = `.${PREFIX}-language__primary-item`;
const LANGUAGE_CONTROL = `button.${PREFIX}-language__link`;
const LANGUAGE_LINKS = `${LANGUAGE} a`;
let languageSelector;
let languageActive;
const onLanguageClose = () => languageSelector.toggleLanguage.call(languageSelector, false);
const hideActiveLanguageDropdown = () => {
  if (!languageActive) {
    return;
  }
  toggle(languageActive, false);
  languageActive = null;
};
const focusLanguageButton = event => {
  const parentLanguageItem = event.target.closest(LANGUAGE_PRIMARY_ITEM);
  if (!event.target.matches(LANGUAGE_CONTROL)) {
    parentLanguageItem.querySelector(LANGUAGE_CONTROL).focus();
  }
};
const handleEscape = event => {
  hideActiveLanguageDropdown();
  focusLanguageButton(event);
};
languageSelector = behavior({
  [CLICK]: {
    [LANGUAGE_CONTROL]() {
      if (languageActive !== this) {
        hideActiveLanguageDropdown();
      }
      if (languageActive === this) {
        hideActiveLanguageDropdown();
        return false;
      }
      if (!languageActive) {
        languageActive = this;
        toggle(languageActive, true);
      }
      return false;
    },
    [BODY]: hideActiveLanguageDropdown,
    [LANGUAGE_LINKS]() {
      const acc = this.closest(accordion.ACCORDION);
      if (acc) {
        accordion.getButtons(acc).forEach(btn => accordion.hide(btn));
      }
    }
  },
  keydown: {
    [LANGUAGE_PRIMARY]: keymap({
      Escape: handleEscape
    })
  },
  focusout: {
    [LANGUAGE_PRIMARY](event) {
      const language = event.target.closest(LANGUAGE_PRIMARY);
      if (!language.contains(event.relatedTarget)) {
        hideActiveLanguageDropdown();
      }
    }
  }
}, {
  init(root) {
    const trapContainer = root.matches(LANGUAGE_SUB) ? root : root.querySelector(LANGUAGE_SUB);
    if (trapContainer) {
      languageSelector.focusTrap = FocusTrap(trapContainer, {
        Escape: onLanguageClose
      });
    }
  },
  teardown() {
    languageActive = false;
  },
  focusTrap: null
});
module.exports = languageSelector;

},{"../../usa-accordion/src/index":15,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/focus-trap":47,"../../uswds-core/src/js/utils/toggle":56,"receptor/keymap":11}],28:[function(require,module,exports){
"use strict";

const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const FocusTrap = require("../../uswds-core/src/js/utils/focus-trap");
const ScrollBarWidth = require("../../uswds-core/src/js/utils/scrollbar-width");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const MODAL_CLASSNAME = `${PREFIX}-modal`;
const OVERLAY_CLASSNAME = `${MODAL_CLASSNAME}-overlay`;
const WRAPPER_CLASSNAME = `${MODAL_CLASSNAME}-wrapper`;
const OPENER_ATTRIBUTE = "data-open-modal";
const CLOSER_ATTRIBUTE = "data-close-modal";
const FORCE_ACTION_ATTRIBUTE = "data-force-action";
const NON_MODAL_HIDDEN_ATTRIBUTE = `data-modal-hidden`;
const MODAL = `.${MODAL_CLASSNAME}`;
const INITIAL_FOCUS = `.${WRAPPER_CLASSNAME} *[data-focus]`;
const CLOSE_BUTTON = `${WRAPPER_CLASSNAME} *[${CLOSER_ATTRIBUTE}]`;
const OPENERS = `*[${OPENER_ATTRIBUTE}][aria-controls]`;
const CLOSERS = `${CLOSE_BUTTON}, .${OVERLAY_CLASSNAME}:not([${FORCE_ACTION_ATTRIBUTE}])`;
const NON_MODALS = `body > *:not(.${WRAPPER_CLASSNAME}):not([aria-hidden])`;
const NON_MODALS_HIDDEN = `[${NON_MODAL_HIDDEN_ATTRIBUTE}]`;
const ACTIVE_CLASS = "usa-js-modal--active";
const PREVENT_CLICK_CLASS = "usa-js-no-click";
const VISIBLE_CLASS = "is-visible";
const HIDDEN_CLASS = "is-hidden";
let modal;
const isActive = () => document.body.classList.contains(ACTIVE_CLASS);
const SCROLLBAR_WIDTH = ScrollBarWidth();
const INITIAL_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
const TEMPORARY_PADDING = `${parseInt(INITIAL_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10)}px`;

/**
 *  Is bound to escape key, closes modal when
 */
const onMenuClose = () => {
  modal.toggleModal.call(modal, false);
};

/**
 *  Toggle the visibility of a modal window
 *
 * @param {KeyboardEvent} event the keydown event
 * @returns {boolean} safeActive if mobile is open
 */
function toggleModal(event) {
  let originalOpener;
  let clickedElement = event.target;
  const {
    body
  } = document;
  const safeActive = !isActive();
  const modalId = clickedElement ? clickedElement.getAttribute("aria-controls") : document.querySelector(".usa-modal-wrapper.is-visible");
  const targetModal = safeActive ? document.getElementById(modalId) : document.querySelector(".usa-modal-wrapper.is-visible");

  // if there is no modal we return early
  if (!targetModal) {
    return false;
  }
  const openFocusEl = targetModal.querySelector(INITIAL_FOCUS) ? targetModal.querySelector(INITIAL_FOCUS) : targetModal.querySelector(".usa-modal");
  const returnFocus = document.getElementById(targetModal.getAttribute("data-opener"));
  const menuButton = body.querySelector(OPENERS);
  const forceUserAction = targetModal.getAttribute(FORCE_ACTION_ATTRIBUTE);

  // Sets the clicked element to the close button
  // so esc key always closes modal
  if (event.type === "keydown" && targetModal !== null) {
    clickedElement = targetModal.querySelector(CLOSE_BUTTON);
  }

  // When we're not hitting the escape key…
  if (clickedElement) {
    // Make sure we click the opener
    // If it doesn't have an ID, make one
    // Store id as data attribute on modal
    if (clickedElement.hasAttribute(OPENER_ATTRIBUTE)) {
      if (this.getAttribute("id") === null) {
        originalOpener = `modal-${Math.floor(Math.random() * 900000) + 100000}`;
        this.setAttribute("id", originalOpener);
      } else {
        originalOpener = this.getAttribute("id");
      }
      targetModal.setAttribute("data-opener", originalOpener);
    }

    // This basically stops the propagation if the element
    // is inside the modal and not a close button or
    // element inside a close button
    if (clickedElement.closest(`.${MODAL_CLASSNAME}`)) {
      if (clickedElement.hasAttribute(CLOSER_ATTRIBUTE) || clickedElement.closest(`[${CLOSER_ATTRIBUTE}]`)) {
        // do nothing. move on.
      } else {
        return false;
      }
    }
  }
  body.classList.toggle(ACTIVE_CLASS, safeActive);
  targetModal.classList.toggle(VISIBLE_CLASS, safeActive);
  targetModal.classList.toggle(HIDDEN_CLASS, !safeActive);

  // If user is forced to take an action, adding
  // a class to the body that prevents clicking underneath
  // overlay
  if (forceUserAction) {
    body.classList.toggle(PREVENT_CLICK_CLASS, safeActive);
  }

  // Account for content shifting from body overflow: hidden
  // We only check paddingRight in case apps are adding other properties
  // to the body element
  body.style.paddingRight = body.style.paddingRight === TEMPORARY_PADDING ? INITIAL_PADDING : TEMPORARY_PADDING;

  // Handle the focus actions
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
    }

    // Handles focus setting and interactions
    modal.focusTrap.update(safeActive);
    openFocusEl.focus();

    // Hides everything that is not the modal from screen readers
    document.querySelectorAll(NON_MODALS).forEach(nonModal => {
      nonModal.setAttribute("aria-hidden", "true");
      nonModal.setAttribute(NON_MODAL_HIDDEN_ATTRIBUTE, "");
    });
  } else if (!safeActive && menuButton && returnFocus) {
    // The modal window is closed.
    // Non-modals now accesible to screen reader
    document.querySelectorAll(NON_MODALS_HIDDEN).forEach(nonModal => {
      nonModal.removeAttribute("aria-hidden");
      nonModal.removeAttribute(NON_MODAL_HIDDEN_ATTRIBUTE);
    });

    // Focus is returned to the opener
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
const setUpModal = baseComponent => {
  const modalContent = baseComponent;
  const modalWrapper = document.createElement("div");
  const overlayDiv = document.createElement("div");
  const modalID = baseComponent.getAttribute("id");
  const ariaLabelledBy = baseComponent.getAttribute("aria-labelledby");
  const ariaDescribedBy = baseComponent.getAttribute("aria-describedby");
  const forceUserAction = baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) ? baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE) : false;
  // Create placeholder where modal is for cleanup
  const originalLocationPlaceHolder = document.createElement("div");
  originalLocationPlaceHolder.setAttribute(`data-placeholder-for`, modalID);
  originalLocationPlaceHolder.style.display = "none";
  originalLocationPlaceHolder.setAttribute("aria-hidden", "true");
  for (let attributeIndex = 0; attributeIndex < modalContent.attributes.length; attributeIndex += 1) {
    const attribute = modalContent.attributes[attributeIndex];
    originalLocationPlaceHolder.setAttribute(`data-original-${attribute.name}`, attribute.value);
  }
  modalContent.after(originalLocationPlaceHolder);

  // Rebuild the modal element
  modalContent.parentNode.insertBefore(modalWrapper, modalContent);
  modalWrapper.appendChild(modalContent);
  modalContent.parentNode.insertBefore(overlayDiv, modalContent);
  overlayDiv.appendChild(modalContent);

  // Add classes and attributes
  modalWrapper.classList.add(HIDDEN_CLASS);
  modalWrapper.classList.add(WRAPPER_CLASSNAME);
  overlayDiv.classList.add(OVERLAY_CLASSNAME);

  // Set attributes
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
  }

  // Update the base element HTML
  baseComponent.removeAttribute("id");
  baseComponent.removeAttribute("aria-labelledby");
  baseComponent.removeAttribute("aria-describedby");
  baseComponent.setAttribute("tabindex", "-1");

  // Add aria-controls
  const modalClosers = modalWrapper.querySelectorAll(CLOSERS);
  modalClosers.forEach(el => {
    el.setAttribute("aria-controls", modalID);
  });

  // Move all modals to the end of the DOM. Doing this allows us to
  // more easily find the elements to hide from screen readers
  // when the modal is open.
  document.body.appendChild(modalWrapper);
};
const cleanUpModal = baseComponent => {
  const modalContent = baseComponent;
  const modalWrapper = modalContent.parentElement.parentElement;
  const modalID = modalWrapper.getAttribute("id");
  const originalLocationPlaceHolder = document.querySelector(`[data-placeholder-for="${modalID}"]`);
  if (originalLocationPlaceHolder) {
    for (let attributeIndex = 0; attributeIndex < originalLocationPlaceHolder.attributes.length; attributeIndex += 1) {
      const attribute = originalLocationPlaceHolder.attributes[attributeIndex];
      if (attribute.name.startsWith("data-original-")) {
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
  init(root) {
    selectOrMatches(MODAL, root).forEach(modalWindow => {
      const modalId = modalWindow.id;
      setUpModal(modalWindow);

      // this will query all openers and closers including the overlay
      document.querySelectorAll(`[aria-controls="${modalId}"]`).forEach(item => {
        // Turn anchor links into buttons because of
        // VoiceOver on Safari
        if (item.nodeName === "A") {
          item.setAttribute("role", "button");
          item.addEventListener("click", e => e.preventDefault());
        }

        // Can uncomment when aria-haspopup="dialog" is supported
        // https://a11ysupport.io/tech/aria/aria-haspopup_attribute
        // Most screen readers support aria-haspopup, but might announce
        // as opening a menu if "dialog" is not supported.
        // item.setAttribute("aria-haspopup", "dialog");

        item.addEventListener("click", toggleModal);
      });
    });
  },
  teardown(root) {
    selectOrMatches(MODAL, root).forEach(modalWindow => {
      cleanUpModal(modalWindow);
      const modalId = modalWindow.id;
      document.querySelectorAll(`[aria-controls="${modalId}"]`).forEach(item => item.removeEventListener("click", toggleModal));
    });
  },
  focusTrap: null,
  toggleModal,
  on(root) {
    this.init(root);
  },
  off(root) {
    this.teardown(root);
  }
};
module.exports = modal;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/focus-trap":47,"../../uswds-core/src/js/utils/scrollbar-width":51,"../../uswds-core/src/js/utils/select-or-matches":52}],29:[function(require,module,exports){
"use strict";

const ignore = require("receptor/ignore");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const BUTTON = ".js-search-button";
const FORM = ".js-search-form";
const INPUT = "[type=search]";
const CONTEXT = "header"; // XXX

let lastButton;
const getForm = button => {
  const context = button.closest(CONTEXT);
  return context ? context.querySelector(FORM) : document.querySelector(FORM);
};
const toggleSearch = (button, active) => {
  const form = getForm(button);
  if (!form) {
    throw new Error(`No ${FORM} found for search toggle in ${CONTEXT}!`);
  }

  /* eslint-disable no-param-reassign */
  button.hidden = active;
  form.hidden = !active;
  /* eslint-enable */

  if (!active) {
    return;
  }
  const input = form.querySelector(INPUT);
  if (input) {
    input.focus();
  }
  // when the user clicks _outside_ of the form w/ignore(): hide the
  // search, then remove the listener
  const listener = ignore(form, () => {
    if (lastButton) {
      hideSearch.call(lastButton); // eslint-disable-line no-use-before-define
    }

    document.body.removeEventListener(CLICK, listener);
  });

  // Normally we would just run this code without a timeout, but
  // IE11 and Edge will actually call the listener *immediately* because
  // they are currently handling this exact type of event, so we'll
  // make sure the browser is done handling the current click event,
  // if any, before we attach the listener.
  setTimeout(() => {
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
const search = behavior({
  [CLICK]: {
    [BUTTON]: showSearch
  }
}, {
  init(target) {
    select(BUTTON, target).forEach(button => {
      toggleSearch(button, false);
    });
  },
  teardown() {
    // forget the last button clicked
    lastButton = undefined;
  }
});
module.exports = search;

},{"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select":53,"receptor/ignore":9}],30:[function(require,module,exports){
"use strict";

const once = require("receptor/once");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const LINK = `.${PREFIX}-skipnav[href^="#"], .${PREFIX}-footer__return-to-top [href^="#"]`;
const MAINCONTENT = "main-content";
function setTabindex() {
  // NB: we know because of the selector we're delegating to below that the
  // href already begins with '#'
  const id = encodeURI(this.getAttribute("href"));
  const target = document.getElementById(id === "#" ? MAINCONTENT : id.slice(1));
  if (target) {
    target.style.outline = "0";
    target.setAttribute("tabindex", 0);
    target.focus();
    target.addEventListener("blur", once(() => {
      target.setAttribute("tabindex", -1);
    }));
  } else {
    // throw an error?
  }
}
module.exports = behavior({
  [CLICK]: {
    [LINK]: setTabindex
  }
});

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"receptor/once":12}],31:[function(require,module,exports){
"use strict";

const select = require("../../uswds-core/src/js/utils/select");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const Sanitizer = require("../../uswds-core/src/js/utils/sanitizer");
const TABLE = `.${PREFIX}-table`;
const SORTED = "aria-sort";
const ASCENDING = "ascending";
const DESCENDING = "descending";
const SORT_OVERRIDE = "data-sort-value";
const SORT_BUTTON_CLASS = `${PREFIX}-table__header__button`;
const SORT_BUTTON = `.${SORT_BUTTON_CLASS}`;
const SORTABLE_HEADER = `th[data-sortable]`;
const ANNOUNCEMENT_REGION = `.${PREFIX}-table__announcement-region[aria-live="polite"]`;

/** Gets the data-sort-value attribute value, if provided — otherwise, gets
 * the innerText or textContent — of the child element (HTMLTableCellElement)
 * at the specified index of the given table row
 *
 * @param {number} index
 * @param {array<HTMLTableRowElement>} tr
 * @return {boolean}
 */
const getCellValue = (tr, index) => tr.children[index].getAttribute(SORT_OVERRIDE) || tr.children[index].innerText || tr.children[index].textContent;

/**
 * Compares the values of two row array items at the given index, then sorts by the given direction
 * @param {number} index
 * @param {string} direction
 * @return {boolean}
 */
const compareFunction = (index, isAscending) => (thisRow, nextRow) => {
  // get values to compare from data attribute or cell content
  const value1 = getCellValue(isAscending ? thisRow : nextRow, index);
  const value2 = getCellValue(isAscending ? nextRow : thisRow, index);

  // if neither value is empty, and if both values are already numbers, compare numerically
  if (value1 && value2 && !Number.isNaN(Number(value1)) && !Number.isNaN(Number(value2))) {
    return value1 - value2;
  }
  // Otherwise, compare alphabetically based on current user locale
  return value1.toString().localeCompare(value2, navigator.language, {
    numeric: true,
    ignorePunctuation: true
  });
};

/**
 * Get an Array of column headers elements belonging directly to the given
 * table element.
 * @param {HTMLTableElement} table
 * @return {array<HTMLTableHeaderCellElement>}
 */
const getColumnHeaders = table => {
  const headers = select(SORTABLE_HEADER, table);
  return headers.filter(header => header.closest(TABLE) === table);
};

/**
 * Update the button label within the given header element, resetting it
 * to the default state (ready to sort ascending) if it's no longer sorted
 * @param {HTMLTableHeaderCellElement} header
 */
const updateSortLabel = header => {
  const headerName = header.innerText;
  const sortedAscending = header.getAttribute(SORTED) === ASCENDING;
  const isSorted = header.getAttribute(SORTED) === ASCENDING || header.getAttribute(SORTED) === DESCENDING || false;
  const headerLabel = `${headerName}', sortable column, currently ${isSorted ? `${sortedAscending ? `sorted ${ASCENDING}` : `sorted ${DESCENDING}`}` : "unsorted"}`;
  const headerButtonLabel = `Click to sort by ${headerName} in ${sortedAscending ? DESCENDING : ASCENDING} order.`;
  header.setAttribute("aria-label", headerLabel);
  header.querySelector(SORT_BUTTON).setAttribute("title", headerButtonLabel);
};

/**
 * Remove the aria-sort attribute on the given header element, and reset the label and button icon
 * @param {HTMLTableHeaderCellElement} header
 */
const unsetSort = header => {
  header.removeAttribute(SORTED);
  updateSortLabel(header);
};

/**
 * Sort rows either ascending or descending, based on a given header's aria-sort attribute
 * @param {HTMLTableHeaderCellElement} header
 * @param {boolean} isAscending
 * @return {boolean} true
 */
const sortRows = (header, isAscending) => {
  header.setAttribute(SORTED, isAscending === true ? DESCENDING : ASCENDING);
  updateSortLabel(header);
  const tbody = header.closest(TABLE).querySelector("tbody");

  // We can use Array.from() and Array.sort() instead once we drop IE11 support, likely in the summer of 2021
  //
  // Array.from(tbody.querySelectorAll('tr').sort(
  //   compareFunction(
  //     Array.from(header.parentNode.children).indexOf(header),
  //     !isAscending)
  //   )
  // .forEach(tr => tbody.appendChild(tr) );

  // [].slice.call() turns array-like sets into true arrays so that we can sort them
  const allRows = [].slice.call(tbody.querySelectorAll("tr"));
  const allHeaders = [].slice.call(header.parentNode.children);
  const thisHeaderIndex = allHeaders.indexOf(header);
  allRows.sort(compareFunction(thisHeaderIndex, !isAscending)).forEach(tr => {
    [].slice.call(tr.children).forEach(td => td.removeAttribute("data-sort-active"));
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

const updateLiveRegion = (table, sortedHeader) => {
  const caption = table.querySelector("caption").innerText;
  const sortedAscending = sortedHeader.getAttribute(SORTED) === ASCENDING;
  const headerLabel = sortedHeader.innerText;
  const liveRegion = table.nextElementSibling;
  if (liveRegion && liveRegion.matches(ANNOUNCEMENT_REGION)) {
    const sortAnnouncement = `The table named "${caption}" is now sorted by ${headerLabel} in ${sortedAscending ? ASCENDING : DESCENDING} order.`;
    liveRegion.innerText = sortAnnouncement;
  } else {
    throw new Error(`Table containing a sortable column header is not followed by an aria-live region.`);
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
const toggleSort = (header, isAscending) => {
  const table = header.closest(TABLE);
  let safeAscending = isAscending;
  if (typeof safeAscending !== "boolean") {
    safeAscending = header.getAttribute(SORTED) === ASCENDING;
  }
  if (!table) {
    throw new Error(`${SORTABLE_HEADER} is missing outer ${TABLE}`);
  }
  safeAscending = sortRows(header, isAscending);
  if (safeAscending) {
    getColumnHeaders(table).forEach(otherHeader => {
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

const createHeaderButton = header => {
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("tabindex", "0");
  buttonEl.classList.add(SORT_BUTTON_CLASS);
  // ICON_SOURCE
  buttonEl.innerHTML = Sanitizer.escapeHTML`
  <svg class="${PREFIX}-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g class="descending" fill="transparent">
      <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z" />
    </g>
    <g class="ascending" fill="transparent">
      <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z" />
    </g>
    <g class="unsorted" fill="transparent">
      <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"/>
    </g>
  </svg>
  `;
  header.appendChild(buttonEl);
  updateSortLabel(header);
};
const table = behavior({
  [CLICK]: {
    [SORT_BUTTON](event) {
      event.preventDefault();
      toggleSort(event.target.closest(SORTABLE_HEADER), event.target.closest(SORTABLE_HEADER).getAttribute(SORTED) === ASCENDING);
    }
  }
}, {
  init(root) {
    const sortableHeaders = select(SORTABLE_HEADER, root);
    sortableHeaders.forEach(header => createHeaderButton(header));
    const firstSorted = sortableHeaders.filter(header => header.getAttribute(SORTED) === ASCENDING || header.getAttribute(SORTED) === DESCENDING)[0];
    if (typeof firstSorted === "undefined") {
      // no sortable headers found
      return;
    }
    const sortDir = firstSorted.getAttribute(SORTED);
    if (sortDir === ASCENDING) {
      toggleSort(firstSorted, true);
    } else if (sortDir === DESCENDING) {
      toggleSort(firstSorted, false);
    }
  },
  TABLE,
  SORTABLE_HEADER,
  SORT_BUTTON
});
module.exports = table;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/sanitizer":50,"../../uswds-core/src/js/utils/select":53}],32:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const {
  COMBO_BOX_CLASS,
  enhanceComboBox
} = require("../../usa-combo-box/src/index");
const TIME_PICKER_CLASS = `${PREFIX}-time-picker`;
const TIME_PICKER = `.${TIME_PICKER_CLASS}`;
const MAX_TIME = 60 * 24 - 1;
const MIN_TIME = 0;
const DEFAULT_STEP = 30;
const MIN_STEP = 1;
const FILTER_DATASET = {
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
const parseTimeString = timeStr => {
  let minutes;
  if (timeStr) {
    const [hours, mins] = timeStr.split(":").map(str => {
      let value;
      const parsed = parseInt(str, 10);
      if (!Number.isNaN(parsed)) value = parsed;
      return value;
    });
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
const transformTimePicker = el => {
  const timePickerEl = el.closest(TIME_PICKER);
  const initialInputEl = timePickerEl.querySelector(`input`);
  if (!initialInputEl) {
    throw new Error(`${TIME_PICKER} is missing inner input`);
  }
  const selectEl = document.createElement("select");
  ["id", "name", "required", "aria-label", "aria-labelledby"].forEach(name => {
    if (initialInputEl.hasAttribute(name)) {
      const value = initialInputEl.getAttribute(name);
      selectEl.setAttribute(name, value);
      initialInputEl.removeAttribute(name);
    }
  });
  const padZeros = (value, length) => `0000${value}`.slice(-length);
  const getTimeContext = minutes => {
    const minute = minutes % 60;
    const hour24 = Math.floor(minutes / 60);
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 < 12 ? "am" : "pm";
    return {
      minute,
      hour24,
      hour12,
      ampm
    };
  };
  const minTime = Math.max(MIN_TIME, parseTimeString(timePickerEl.dataset.minTime) || MIN_TIME);
  const maxTime = Math.min(MAX_TIME, parseTimeString(timePickerEl.dataset.maxTime) || MAX_TIME);
  const step = Math.floor(Math.max(MIN_STEP, timePickerEl.dataset.step || DEFAULT_STEP));
  let defaultValue;
  for (let time = minTime; time <= maxTime; time += step) {
    const {
      minute,
      hour24,
      hour12,
      ampm
    } = getTimeContext(time);
    const option = document.createElement("option");
    option.value = `${padZeros(hour24, 2)}:${padZeros(minute, 2)}`;
    option.text = `${hour12}:${padZeros(minute, 2)}${ampm}`;
    if (option.text === initialInputEl.value) {
      defaultValue = option.value;
    }
    selectEl.appendChild(option);
  }
  timePickerEl.classList.add(COMBO_BOX_CLASS);

  // combo box properties
  Object.keys(FILTER_DATASET).forEach(key => {
    timePickerEl.dataset[key] = FILTER_DATASET[key];
  });
  timePickerEl.dataset.disableFiltering = "true";
  timePickerEl.dataset.defaultValue = defaultValue;
  timePickerEl.appendChild(selectEl);
  initialInputEl.remove();
};
const timePicker = behavior({}, {
  init(root) {
    selectOrMatches(TIME_PICKER, root).forEach(timePickerEl => {
      transformTimePicker(timePickerEl);
      enhanceComboBox(timePickerEl);
    });
  },
  FILTER_DATASET
});
module.exports = timePicker;

},{"../../usa-combo-box/src/index":18,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select-or-matches":52}],33:[function(require,module,exports){
"use strict";

// Tooltips
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const isElementInViewport = require("../../uswds-core/src/js/utils/is-in-viewport");
const TOOLTIP = `.${PREFIX}-tooltip`;
const TOOLTIP_TRIGGER = `.${PREFIX}-tooltip__trigger`;
const TOOLTIP_TRIGGER_CLASS = `${PREFIX}-tooltip__trigger`;
const TOOLTIP_CLASS = `${PREFIX}-tooltip`;
const TOOLTIP_BODY_CLASS = `${PREFIX}-tooltip__body`;
const SET_CLASS = "is-set";
const VISIBLE_CLASS = "is-visible";
const TRIANGLE_SIZE = 5;
const ADJUST_WIDTH_CLASS = `${PREFIX}-tooltip__body--wrap`;

/**
 *
 * @param {DOMElement} trigger - The tooltip trigger
 * @returns {object} Elements for initialized tooltip; includes trigger, wrapper, and body
 */
const getTooltipElements = trigger => {
  const wrapper = trigger.parentNode;
  const body = wrapper.querySelector(`.${TOOLTIP_BODY_CLASS}`);
  return {
    trigger,
    wrapper,
    body
  };
};

/**
 * Shows the tooltip
 * @param {HTMLElement} tooltipTrigger - the element that initializes the tooltip
 */
const showToolTip = (tooltipBody, tooltipTrigger, position) => {
  tooltipBody.setAttribute("aria-hidden", "false");

  // This sets up the tooltip body. The opacity is 0, but
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
  const setPositionClass = setPos => {
    tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--top`);
    tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--bottom`);
    tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--right`);
    tooltipBody.classList.remove(`${TOOLTIP_BODY_CLASS}--left`);
    tooltipBody.classList.add(`${TOOLTIP_BODY_CLASS}--${setPos}`);
  };

  /**
   * Removes old positioning styles. This allows
   * re-positioning to change without inheriting other
   * dynamic styles
   *
   * @param {HTMLElement} e - this is the tooltip body
   */
  const resetPositionStyles = e => {
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

  const offsetMargin = (target, propertyValue) => parseInt(window.getComputedStyle(target).getPropertyValue(propertyValue), 10);

  // offsetLeft = the left position, and margin of the element, the left
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
  const calculateMarginOffset = (marginPosition, tooltipBodyOffset, trigger) => {
    const offset = offsetMargin(trigger, `margin-${marginPosition}`) > 0 ? tooltipBodyOffset - offsetMargin(trigger, `margin-${marginPosition}`) : tooltipBodyOffset;
    return offset;
  };

  /**
   * Positions tooltip at the top
   * @param {HTMLElement} e - this is the tooltip body
   */
  const positionTop = e => {
    resetPositionStyles(e); // ensures we start from the same point
    // get details on the elements object with

    const topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger);
    const leftMargin = calculateMarginOffset("left", e.offsetWidth, tooltipTrigger);
    setPositionClass("top");
    e.style.left = `50%`; // center the element
    e.style.top = `-${TRIANGLE_SIZE}px`; // consider the pseudo element
    // apply our margins based on the offset
    e.style.margin = `-${topMargin}px 0 0 -${leftMargin / 2}px`;
  };

  /**
   * Positions tooltip at the bottom
   * @param {HTMLElement} e - this is the tooltip body
   */
  const positionBottom = e => {
    resetPositionStyles(e);
    const leftMargin = calculateMarginOffset("left", e.offsetWidth, tooltipTrigger);
    setPositionClass("bottom");
    e.style.left = `50%`;
    e.style.margin = `${TRIANGLE_SIZE}px 0 0 -${leftMargin / 2}px`;
  };

  /**
   * Positions tooltip at the right
   * @param {HTMLElement} e - this is the tooltip body
   */
  const positionRight = e => {
    resetPositionStyles(e);
    const topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger);
    setPositionClass("right");
    e.style.top = `50%`;
    e.style.left = `${tooltipTrigger.offsetLeft + tooltipTrigger.offsetWidth + TRIANGLE_SIZE}px`;
    e.style.margin = `-${topMargin / 2}px 0 0 0`;
  };

  /**
   * Positions tooltip at the right
   * @param {HTMLElement} e - this is the tooltip body
   */
  const positionLeft = e => {
    resetPositionStyles(e);
    const topMargin = calculateMarginOffset("top", e.offsetHeight, tooltipTrigger);

    // we have to check for some utility margins
    const leftMargin = calculateMarginOffset("left", tooltipTrigger.offsetLeft > e.offsetWidth ? tooltipTrigger.offsetLeft - e.offsetWidth : e.offsetWidth, tooltipTrigger);
    setPositionClass("left");
    e.style.top = `50%`;
    e.style.left = `-${TRIANGLE_SIZE}px`;
    e.style.margin = `-${topMargin / 2}px 0 0 ${tooltipTrigger.offsetLeft > e.offsetWidth ? leftMargin : -leftMargin}px`; // adjust the margin
  };

  /**
   * We try to set the position based on the
   * original intention, but make adjustments
   * if the element is clipped out of the viewport
   * we constrain the width only as a last resort
   * @param {HTMLElement} element(alias tooltipBody)
   * @param {Number} attempt (--flag)
   */

  const maxAttempts = 2;
  function findBestPosition(element) {
    let attempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    // create array of optional positions
    const positions = [positionTop, positionBottom, positionRight, positionLeft];
    let hasVisiblePosition = false;

    // we take a recursive approach
    function tryPositions(i) {
      if (i < positions.length) {
        const pos = positions[i];
        pos(element);
        if (!isElementInViewport(element)) {
          // eslint-disable-next-line no-param-reassign
          tryPositions(i += 1);
        } else {
          hasVisiblePosition = true;
        }
      }
    }
    tryPositions(0);
    // if we can't find a position we compress it and try again
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
  setTimeout(() => {
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
const hideToolTip = tooltipBody => {
  tooltipBody.classList.remove(VISIBLE_CLASS);
  tooltipBody.classList.remove(SET_CLASS);
  tooltipBody.classList.remove(ADJUST_WIDTH_CLASS);
  tooltipBody.setAttribute("aria-hidden", "true");
};

/**
 * Setup the tooltip component
 * @param {HTMLElement} tooltipTrigger The element that creates the tooltip
 */
const setUpAttributes = tooltipTrigger => {
  const tooltipID = `tooltip-${Math.floor(Math.random() * 900000) + 100000}`;
  const tooltipContent = tooltipTrigger.getAttribute("title");
  const wrapper = document.createElement("span");
  const tooltipBody = document.createElement("span");
  const position = tooltipTrigger.getAttribute("data-position") ? tooltipTrigger.getAttribute("data-position") : "top";
  const additionalClasses = tooltipTrigger.getAttribute("data-classes");

  // Set up tooltip attributes
  tooltipTrigger.setAttribute("aria-describedby", tooltipID);
  tooltipTrigger.setAttribute("tabindex", "0");
  tooltipTrigger.removeAttribute("title");
  tooltipTrigger.classList.remove(TOOLTIP_CLASS);
  tooltipTrigger.classList.add(TOOLTIP_TRIGGER_CLASS);

  // insert wrapper before el in the DOM tree
  tooltipTrigger.parentNode.insertBefore(wrapper, tooltipTrigger);

  // set up the wrapper
  wrapper.appendChild(tooltipTrigger);
  wrapper.classList.add(TOOLTIP_CLASS);
  wrapper.appendChild(tooltipBody);

  // Apply additional class names to wrapper element
  if (additionalClasses) {
    const classesArray = additionalClasses.split(" ");
    classesArray.forEach(classname => wrapper.classList.add(classname));
  }

  // set up the tooltip body
  tooltipBody.classList.add(TOOLTIP_BODY_CLASS);
  tooltipBody.setAttribute("id", tooltipID);
  tooltipBody.setAttribute("role", "tooltip");
  tooltipBody.setAttribute("aria-hidden", "true");

  // place the text in the tooltip
  tooltipBody.textContent = tooltipContent;
  return {
    tooltipBody,
    position,
    tooltipContent,
    wrapper
  };
};

// Setup our function to run on various events
const tooltip = behavior({
  "mouseover focusin": {
    [TOOLTIP](e) {
      const trigger = e.target;
      const elementType = trigger.nodeName;

      // Initialize tooltip if it hasn't already
      if (elementType === "BUTTON" && trigger.hasAttribute("title")) {
        setUpAttributes(trigger);
      }
    },
    [TOOLTIP_TRIGGER](e) {
      const {
        trigger,
        body
      } = getTooltipElements(e.target);
      showToolTip(body, trigger, trigger.dataset.position);
    }
  },
  "mouseout focusout": {
    [TOOLTIP_TRIGGER](e) {
      const {
        body
      } = getTooltipElements(e.target);
      hideToolTip(body);
    }
  }
}, {
  init(root) {
    selectOrMatches(TOOLTIP, root).forEach(tooltipTrigger => {
      setUpAttributes(tooltipTrigger);
    });
  },
  setup: setUpAttributes,
  getTooltipElements,
  show: showToolTip,
  hide: hideToolTip
});
module.exports = tooltip;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/is-in-viewport":48,"../../uswds-core/src/js/utils/select-or-matches":52}],34:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const validate = require("../../uswds-core/src/js/utils/validate-input");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const VALIDATE_INPUT = "input[data-validation-element]";
const CHECKLIST_ITEM = `.${PREFIX}-checklist__item`;

// Trigger validation on input change
const handleChange = el => validate(el);

// Create container to hold aria readout
const createStatusElement = input => {
  const validationContainer = input.parentNode;
  const inputID = input.getAttribute("id");
  const statusSummaryID = `${inputID}-sr-summary`;
  input.setAttribute("aria-describedby", statusSummaryID);
  const statusSummaryContainer = document.createElement("span");
  statusSummaryContainer.setAttribute("data-validation-status", "");
  statusSummaryContainer.classList.add("usa-sr-only");
  statusSummaryContainer.setAttribute("aria-live", "polite");
  statusSummaryContainer.setAttribute("aria-atomic", true);
  statusSummaryContainer.setAttribute("id", statusSummaryID);
  validationContainer.append(statusSummaryContainer);
};

// Set up checklist items with initial aria-label (incomplete) values
const createInitialStatus = input => {
  const validationContainer = input.parentNode;
  const checklistItems = validationContainer.querySelectorAll(CHECKLIST_ITEM);
  const validationElement = input.getAttribute("data-validation-element");
  input.setAttribute("aria-controls", validationElement);
  checklistItems.forEach(listItem => {
    let currentStatus = "status incomplete";
    if (input.hasAttribute("data-validation-incomplete")) {
      currentStatus = input.getAttribute("data-validation-incomplete");
    }
    const itemStatus = `${listItem.textContent} ${currentStatus} `;
    listItem.setAttribute("tabindex", "0");
    listItem.setAttribute("aria-label", itemStatus);
  });
};
const enhanceValidation = input => {
  createStatusElement(input);
  createInitialStatus(input);
};
const validator = behavior({
  "input change": {
    [VALIDATE_INPUT](event) {
      handleChange(event.target);
    }
  }
}, {
  init(root) {
    selectOrMatches(VALIDATE_INPUT, root).forEach(input => enhanceValidation(input));
  }
});
module.exports = validator;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":45,"../../uswds-core/src/js/utils/select-or-matches":52,"../../uswds-core/src/js/utils/validate-input":57}],35:[function(require,module,exports){
"use strict";

module.exports = {
  prefix: "usa"
};

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
"use strict";

const accordion = require("../../../usa-accordion/src/index");
const banner = require("../../../usa-banner/src/index");
const characterCount = require("../../../usa-character-count/src/index");
const comboBox = require("../../../usa-combo-box/src/index");
const datePicker = require("../../../usa-date-picker/src/index");
const dateRangePicker = require("../../../usa-date-range-picker/src/index");
const fileInput = require("../../../usa-file-input/src/index");
const footer = require("../../../usa-footer/src/index");
const inPageNavigation = require("../../../usa-in-page-navigation/src/index");
const inputMask = require("../../../usa-input-mask/src/index");
const inputPrefixSuffix = require("../../../usa-input-prefix-suffix/src/index");
const languageSelector = require("../../../usa-language-selector/src/index");
const modal = require("../../../usa-modal/src/index");
const navigation = require("../../../usa-header/src/index");
const password = require("../../../_usa-password/src/index");
const search = require("../../../usa-search/src/index");
const skipnav = require("../../../usa-skipnav/src/index");
const table = require("../../../usa-table/src/index");
const timePicker = require("../../../usa-time-picker/src/index");
const tooltip = require("../../../usa-tooltip/src/index");
const validator = require("../../../usa-validation/src/index");
module.exports = {
  accordion,
  banner,
  characterCount,
  comboBox,
  datePicker,
  dateRangePicker,
  fileInput,
  footer,
  inPageNavigation,
  inputMask,
  inputPrefixSuffix,
  languageSelector,
  modal,
  navigation,
  password,
  search,
  skipnav,
  table,
  timePicker,
  tooltip,
  validator
};

},{"../../../_usa-password/src/index":14,"../../../usa-accordion/src/index":15,"../../../usa-banner/src/index":16,"../../../usa-character-count/src/index":17,"../../../usa-combo-box/src/index":18,"../../../usa-date-picker/src/index":19,"../../../usa-date-range-picker/src/index":20,"../../../usa-file-input/src/index":21,"../../../usa-footer/src/index":22,"../../../usa-header/src/index":23,"../../../usa-in-page-navigation/src/index":24,"../../../usa-input-mask/src/index":25,"../../../usa-input-prefix-suffix/src/index":26,"../../../usa-language-selector/src/index":27,"../../../usa-modal/src/index":28,"../../../usa-search/src/index":29,"../../../usa-skipnav/src/index":30,"../../../usa-table/src/index":31,"../../../usa-time-picker/src/index":32,"../../../usa-tooltip/src/index":33,"../../../usa-validation/src/index":34}],38:[function(require,module,exports){
"use strict";

/* eslint-disable consistent-return */
/* eslint-disable func-names */
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, _params) {
    const params = _params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  window.CustomEvent = CustomEvent;
})();

},{}],39:[function(require,module,exports){
"use strict";

const elproto = window.HTMLElement.prototype;
const HIDDEN = "hidden";
if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get() {
      return this.hasAttribute(HIDDEN);
    },
    set(value) {
      if (value) {
        this.setAttribute(HIDDEN, "");
      } else {
        this.removeAttribute(HIDDEN);
      }
    }
  });
}

},{}],40:[function(require,module,exports){
"use strict";

// polyfills HTMLElement.prototype.classList and DOMTokenList
require("classlist-polyfill");
// polyfills HTMLElement.prototype.hidden
require("./element-hidden");
// polyfills Number.isNaN()
require("./number-is-nan");
// polyfills CustomEvent
require("./custom-event");
// polyfills svg4everybody
require("./svg4everybody");

},{"./custom-event":38,"./element-hidden":39,"./number-is-nan":41,"./svg4everybody":42,"classlist-polyfill":1}],41:[function(require,module,exports){
"use strict";

Number.isNaN = Number.isNaN || function isNaN(input) {
  // eslint-disable-next-line no-self-compare
  return typeof input === "number" && input !== input;
};

},{}],42:[function(require,module,exports){
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
        viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
      // conditionally set the viewBox on the svg
      viewBox && svg.setAttribute("viewBox", viewBox);
      // copy the contents of the clone into the fragment
      for (
      // clone the target
      var clone = document.importNode ? document.importNode(target, !0) : target.cloneNode(!0), g = document.createElementNS(svg.namespaceURI || "http://www.w3.org/2000/svg", "g"); clone.childNodes.length;) {
        g.appendChild(clone.firstChild);
      }
      if (use) {
        for (var i = 0; use.attributes.length > i; i++) {
          var attr = use.attributes[i];
          "xlink:href" !== attr.name && "href" !== attr.name && g.setAttribute(attr.name, attr.value);
        }
      }
      fragment.appendChild(g),
      // append the fragment into the svg
      parent.appendChild(fragment);
    }
  }
  function loadreadystatechange(xhr, use) {
    // listen to changes in the request
    xhr.onreadystatechange = function () {
      // if the request is ready
      if (4 === xhr.readyState) {
        // get the cached html document
        var cachedDocument = xhr._cachedDocument;
        // ensure the cached html document based on the xhr response
        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText,
        // ensure domains are the same, otherwise we'll have issues appending the
        // element in IE 11
        cachedDocument.domain !== document.domain && (cachedDocument.domain = document.domain), xhr._cachedTarget = {}),
        // clear the xhr embeds list and embed each item
        xhr._embeds.splice(0).map(function (item) {
          // get the cached target
          var target = xhr._cachedTarget[item.id];
          // ensure the cached target
          target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
          // embed the target into the svg
          embed(item.parent, item.svg, target, use);
        });
      }
    },
    // test the ready state change immediately
    xhr.onreadystatechange();
  }
  function svg4everybody(rawopts) {
    function oninterval() {
      // if all <use>s in the array are being bypassed, don't proceed.
      if (numberOfSvgUseElementsToBypass && uses.length - numberOfSvgUseElementsToBypass <= 0) {
        return void requestAnimationFrame(oninterval, 67);
      }
      // if there are <use>s to process, proceed.
      // reset the bypass counter, since the counter will be incremented for every bypassed element,
      // even ones that were counted before.
      numberOfSvgUseElementsToBypass = 0;
      // while the index exists in the live <use> collection
      for (
      // get the cached <use> index
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
              parent.removeChild(use);
              // parse the src and get the url and id
              var srcSplit = src.split("#"),
                url = srcSplit.shift(),
                id = srcSplit.join("#");
              // if the link is external
              if (url.length) {
                // get the cached xhr request
                var xhr = requests[url];
                // ensure the xhr request exists
                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []),
                // add the svg and id as an item to the xhr embeds list
                xhr._embeds.push({
                  parent: parent,
                  svg: svg,
                  id: id
                }),
                // prepare the xhr ready state change event
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
      }
      // continue the interval
      requestAnimationFrame(oninterval, 67);
    }
    var polyfill,
      opts = Object(rawopts),
      newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
      webkitUA = /\bAppleWebKit\/(\d+)\b/,
      olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
      edgeUA = /\bEdge\/.(\d+)\b/,
      inIframe = window.top !== window.self;
    polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
    // create xhr requests object
    var requests = {},
      requestAnimationFrame = window.requestAnimationFrame || setTimeout,
      uses = document.getElementsByTagName("use"),
      numberOfSvgUseElementsToBypass = 0;
    // conditionally start the interval if the polyfill is active
    polyfill && oninterval();
  }
  function getSVGAncestor(node) {
    for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}
    return svg;
  }
  return svg4everybody;
});

},{}],43:[function(require,module,exports){
"use strict";

window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require("./polyfills");
const uswds = require("./config");
const components = require("./index");
const svg4everybody = require("./polyfills/svg4everybody");
uswds.components = components;
const initComponents = () => {
  const target = document.body;
  Object.keys(components).forEach(key => {
    const behavior = components[key];
    behavior.on(target);
  });
  svg4everybody();
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponents, {
    once: true
  });
} else {
  initComponents();
}
exports.default = uswds;
exports.initComponents = initComponents;

},{"./config":35,"./index":37,"./polyfills":40,"./polyfills/svg4everybody":42}],44:[function(require,module,exports){
"use strict";

module.exports = function () {
  let htmlDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return htmlDocument.activeElement;
};

},{}],45:[function(require,module,exports){
"use strict";

const assign = require("object-assign");
const Behavior = require("receptor/behavior");

/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module
const sequence = function () {
  for (var _len = arguments.length, seq = new Array(_len), _key = 0; _key < _len; _key++) {
    seq[_key] = arguments[_key];
  }
  return function callHooks() {
    let target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    seq.forEach(method => {
      if (typeof this[method] === "function") {
        this[method].call(this, target);
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
module.exports = (events, props) => Behavior(events, assign({
  on: sequence("init", "add"),
  off: sequence("teardown", "remove")
}, props));

},{"object-assign":4,"receptor/behavior":5}],46:[function(require,module,exports){
"use strict";

/**
 * Call a function every X amount of milliseconds.
 *
 * @param  {Function} callback - A callback function to be debounced
 * @param  {number} delay - Milliseconds to wait before calling function
 * @returns {Function} A debounced function
 * @example const updateStatus = debounce((string) => console.log(string), 2000)
 */

module.exports = function debounce(callback) {
  var _this = this;
  let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let timer = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback.apply(_this, args);
    }, delay);
  };
};

},{}],47:[function(require,module,exports){
"use strict";

const assign = require("object-assign");
const {
  keymap
} = require("receptor");
const behavior = require("./behavior");
const select = require("./select");
const activeElement = require("./active-element");
const FOCUSABLE = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
const tabHandler = context => {
  const focusableElements = select(FOCUSABLE, context);
  const firstTabStop = focusableElements[0];
  const lastTabStop = focusableElements[focusableElements.length - 1];

  // Special rules for when the user is tabbing forward from the last focusable element,
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
    }
    // This checks if you want to set the initial focus to a container
    // instead of an element within, and the user tabs back.
    // Then we set the focus to the first
    else if (!focusableElements.includes(activeElement())) {
      event.preventDefault();
      firstTabStop.focus();
    }
  }
  return {
    firstTabStop,
    lastTabStop,
    tabAhead,
    tabBack
  };
};
module.exports = function (context) {
  let additionalKeyBindings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const tabEventHandler = tabHandler(context);
  const bindings = additionalKeyBindings;
  const {
    Esc,
    Escape
  } = bindings;
  if (Escape && !Esc) bindings.Esc = Escape;

  //  TODO: In the future, loop over additional keybindings and pass an array
  // of functions, if necessary, to the map keys. Then people implementing
  // the focus trap could pass callbacks to fire when tabbing
  const keyMappings = keymap(assign({
    Tab: tabEventHandler.tabAhead,
    "Shift+Tab": tabEventHandler.tabBack
  }, additionalKeyBindings));
  const focusTrap = behavior({
    keydown: keyMappings
  }, {
    init() {
      // TODO: is this desireable behavior? Should the trap always do this by default or should
      // the component getting decorated handle this?
      if (tabEventHandler.firstTabStop) {
        tabEventHandler.firstTabStop.focus();
      }
    },
    update(isActive) {
      if (isActive) {
        this.on();
      } else {
        this.off();
      }
    }
  });
  return focusTrap;
};

},{"./active-element":44,"./behavior":45,"./select":53,"object-assign":4,"receptor":10}],48:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el) {
  let win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  let docEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.documentElement;
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}
module.exports = isElementInViewport;

},{}],49:[function(require,module,exports){
"use strict";

// iOS detection from: http://stackoverflow.com/a/9039885/177710
function isIosDevice() {
  return typeof navigator !== "undefined" && (navigator.userAgent.match(/(iPod|iPhone|iPad)/g) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
}
module.exports = isIosDevice;

},{}],50:[function(require,module,exports){
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
  "use strict";

  var Sanitizer = {
    _entity: /[&<>"'/]/g,
    _entities: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
      "/": "&#x2F;"
    },
    getEntity: function (s) {
      return Sanitizer._entities[s];
    },
    /**
     * Escapes HTML for all values in a tagged template string.
     */
    escapeHTML: function (strings) {
      var result = "";
      for (var i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i + 1 < arguments.length) {
          var value = arguments[i + 1] || "";
          result += String(value).replace(Sanitizer._entity, Sanitizer.getEntity);
        }
      }
      return result;
    },
    /**
     * Escapes HTML and returns a wrapped object to be used during DOM insertion
     */
    createSafeHTML: function (strings) {
      var _len = arguments.length;
      var values = new Array(_len > 1 ? _len - 1 : 0);
      for (var _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }
      var escaped = Sanitizer.escapeHTML.apply(Sanitizer, [strings].concat(values));
      return {
        __html: escaped,
        toString: function () {
          return "[object WrappedHTMLObject]";
        },
        info: "This is a wrapped HTML object. See https://developer.mozilla.or" + "g/en-US/Firefox_OS/Security/Security_Automation for more."
      };
    },
    /**
     * Unwrap safe HTML created by createSafeHTML or a custom replacement that
     * underwent security review.
     */
    unwrapSafeHTML: function () {
      var _len = arguments.length;
      var htmlObjects = new Array(_len);
      for (var _key = 0; _key < _len; _key++) {
        htmlObjects[_key] = arguments[_key];
      }
      var markupList = htmlObjects.map(function (obj) {
        return obj.__html;
      });
      return markupList.join("");
    }
  };
  return Sanitizer;
});

},{}],51:[function(require,module,exports){
"use strict";

module.exports = function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = `${outer.offsetWidth - inner.offsetWidth}px`;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

},{}],52:[function(require,module,exports){
"use strict";

const select = require("./select");
/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
const isElement = value => value && typeof value === "object" && value.nodeType === 1;

/**
 * @name selectOrMatches
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
module.exports = (selector, context) => {
  const selection = select(selector, context);
  if (typeof selector !== "string") {
    return selection;
  }
  if (isElement(context) && context.matches(selector)) {
    selection.push(context);
  }
  return selection;
};

},{"./select":53}],53:[function(require,module,exports){
"use strict";

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
const isElement = value => value && typeof value === "object" && value.nodeType === 1;

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
module.exports = (selector, context) => {
  if (typeof selector !== "string") {
    return [];
  }
  if (!context || !isElement(context)) {
    context = window.document; // eslint-disable-line no-param-reassign
  }

  const selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
};

},{}],54:[function(require,module,exports){
"use strict";

/**
 * Flips given INPUT elements between masked (hiding the field value) and unmasked
 * @param {Array.HTMLElement} fields - An array of INPUT elements
 * @param {Boolean} mask - Whether the mask should be applied, hiding the field value
 */
module.exports = (field, mask) => {
  field.setAttribute("autocapitalize", "off");
  field.setAttribute("autocorrect", "off");
  field.setAttribute("type", mask ? "password" : "text");
};

},{}],55:[function(require,module,exports){
"use strict";

const resolveIdRefs = require("resolve-id-refs");
const toggleFieldMask = require("./toggle-field-mask");
const CONTROLS = "aria-controls";
const PRESSED = "aria-pressed";
const SHOW_ATTR = "data-show-text";
const HIDE_ATTR = "data-hide-text";

/**
 * Replace the word "Show" (or "show") with "Hide" (or "hide") in a string.
 * @param {string} showText
 * @return {strong} hideText
 */
const getHideText = showText => showText.replace(/\bShow\b/i, show => `${show[0] === "S" ? "H" : "h"}ide`);

/**
 * Component that decorates an HTML element with the ability to toggle the
 * masked state of an input field (like a password) when clicked.
 * The ids of the fields to be masked will be pulled directly from the button's
 * `aria-controls` attribute.
 *
 * @param  {HTMLElement} el    Parent element containing the fields to be masked
 * @return {boolean}
 */
module.exports = el => {
  // this is the *target* state:
  // * if the element has the attr and it's !== "true", pressed is true
  // * otherwise, pressed is false
  const pressed = el.hasAttribute(PRESSED) && el.getAttribute(PRESSED) !== "true";
  const fields = resolveIdRefs(el.getAttribute(CONTROLS));
  fields.forEach(field => toggleFieldMask(field, pressed));
  if (!el.hasAttribute(SHOW_ATTR)) {
    el.setAttribute(SHOW_ATTR, el.textContent);
  }
  const showText = el.getAttribute(SHOW_ATTR);
  const hideText = el.getAttribute(HIDE_ATTR) || getHideText(showText);
  el.textContent = pressed ? showText : hideText; // eslint-disable-line no-param-reassign
  el.setAttribute(PRESSED, pressed);
  return pressed;
};

},{"./toggle-field-mask":54,"resolve-id-refs":13}],56:[function(require,module,exports){
"use strict";

const EXPANDED = "aria-expanded";
const CONTROLS = "aria-controls";
const HIDDEN = "hidden";
module.exports = (button, expanded) => {
  let safeExpanded = expanded;
  if (typeof safeExpanded !== "boolean") {
    safeExpanded = button.getAttribute(EXPANDED) === "false";
  }
  button.setAttribute(EXPANDED, safeExpanded);
  const id = button.getAttribute(CONTROLS);
  const controls = document.getElementById(id);
  if (!controls) {
    throw new Error(`No toggle target found with id: "${id}"`);
  }
  if (safeExpanded) {
    controls.removeAttribute(HIDDEN);
  } else {
    controls.setAttribute(HIDDEN, "");
  }
  return safeExpanded;
};

},{}],57:[function(require,module,exports){
"use strict";

const debounce = require("./debounce");
const {
  prefix: PREFIX
} = require("../config");
const CHECKED_CLASS = `${PREFIX}-checklist__item--checked`;
module.exports = function validate(el) {
  const id = el.dataset.validationElement;
  const checkList = id.charAt(0) === "#" ? document.querySelector(id) : document.getElementById(id);
  if (!checkList) {
    throw new Error(`No validation element found with id: "${id}"`);
  }
  let statusSummary = "";
  Object.entries(el.dataset).forEach(_ref => {
    let [key, value] = _ref;
    if (key.startsWith("validate")) {
      const validatorName = key.substr("validate".length).toLowerCase();
      const validatorPattern = new RegExp(value);
      const validatorSelector = `[data-validator="${validatorName}"]`;
      const validatorCheckbox = checkList.querySelector(validatorSelector);
      const validatorParent = el.parentNode;
      const statusSummaryContainer = validatorParent.querySelector(`[data-validation-status]`);
      const checked = validatorPattern.test(el.value);
      validatorCheckbox.classList.toggle(CHECKED_CLASS, checked);
      if (!validatorCheckbox) {
        throw new Error(`No validator checkbox found for: "${validatorName}"`);
      }

      // Create status reports for checklist items
      const statusComplete = el.dataset.validationComplete || "status complete";
      const statusIncomplete = el.dataset.validationIncomplete || "status incomplete";
      let checkboxContent = `${validatorCheckbox.textContent} `;
      if (validatorCheckbox.classList.contains(CHECKED_CLASS)) {
        checkboxContent += statusComplete;
      } else {
        checkboxContent += statusIncomplete;
      }

      // move status updates to aria-label on checklist item
      validatorCheckbox.setAttribute("aria-label", checkboxContent);

      // Create a summary of status for all checklist items
      statusSummary += `${checkboxContent}. `;

      // Add summary to screen reader summary container, after a delay
      const srUpdateStatus = debounce(() => {
        statusSummaryContainer.textContent = statusSummary;
      }, 1000);
      srUpdateStatus();
    }
  });
};

},{"../config":35,"./debounce":46}]},{},[43])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9pZ25vcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3Iva2V5bWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL29uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVzb2x2ZS1pZC1yZWZzL2luZGV4LmpzIiwicGFja2FnZXMvX3VzYS1wYXNzd29yZC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtYWNjb3JkaW9uL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1iYW5uZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWNoYXJhY3Rlci1jb3VudC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtY29tYm8tYm94L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtZGF0ZS1yYW5nZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZvb3Rlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtaGVhZGVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1pbi1wYWdlLW5hdmlnYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LW1hc2svc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LXByZWZpeC1zdWZmaXgvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWxhbmd1YWdlLXNlbGVjdG9yL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1tb2RhbC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2Etc2VhcmNoL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1za2lwbmF2L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS10YWJsZS9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtdGltZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXRvb2x0aXAvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXZhbGlkYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvaW5kZXguanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy9wb2x5ZmlsbHMvY3VzdG9tLWV2ZW50LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL251bWJlci1pcy1uYW4uanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy9wb2x5ZmlsbHMvc3ZnNGV2ZXJ5Ym9keS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3N0YXJ0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYWN0aXZlLWVsZW1lbnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2RlYm91bmNlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW9zLWRldmljZS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplci5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Njcm9sbGJhci13aWR0aC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLFVBQVUsSUFBSSxNQUFNLENB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QUFFLENBQUM7RUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO0VBQzVDLE9BQU8sT0FBTztBQUNoQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQzs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEtBQUssUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQzs7QUFFaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxXQUFXLEdBQUksS0FBSyxJQUFLO0VBQzdCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFDaEMsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztBQUNsQyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUksS0FBSyxJQUFLO0VBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7RUFDaEMsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDdEMsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsS0FBSztFQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENB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LE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztNQUMvQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7TUFFMUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUUscUNBQW9DLGFBQWMsR0FBRSxDQUFDO01BQ3hFOztNQUVBO01BQ0EsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxpQkFBaUI7TUFDekUsTUFBTSxnQkFBZ0IsR0FDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxtQkFBbUI7TUFDeEQsSUFBSSxlQUFlLEdBQUksR0FBRSxpQkFBaUIsQ0FBQyxXQUFZLEdBQUU7TUFFekQsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3ZELGVBQWUsSUFBSSxjQUFjO01BQ25DLENBQUMsTUFBTTtRQUNMLGVBQWUsSUFBSSxnQkFBZ0I7TUFDckM7O01BRUE7TUFDQSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQzs7TUFFN0Q7TUFDQSxhQUFhLElBQUssR0FBRSxlQUFnQixJQUFHOztNQUV2QztNQUNBLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNO1FBQ3BDLHNCQUFzQixDQUFDLFdBQVcsR0FBRyxhQUFhO01BQ3BELENBQUMsRUFBRSxJQUFJLENBQUM7TUFFUixjQUFjLEVBQUU7SUFDbEI7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLypcbiAqIGNsYXNzTGlzdC5qczogQ3Jvc3MtYnJvd3NlciBmdWxsIGVsZW1lbnQuY2xhc3NMaXN0IGltcGxlbWVudGF0aW9uLlxuICogMjAxNC0wNy0yM1xuICpcbiAqIEJ5IEVsaSBHcmV5LCBodHRwOi8vZWxpZ3JleS5jb21cbiAqIFB1YmxpYyBEb21haW4uXG4gKiBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gKi9cblxuLypnbG9iYWwgc2VsZiwgZG9jdW1lbnQsIERPTUV4Y2VwdGlvbiAqL1xuXG4vKiEgQHNvdXJjZSBodHRwOi8vcHVybC5lbGlncmV5LmNvbS9naXRodWIvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qcyovXG5cbi8qIENvcGllZCBmcm9tIE1ETjpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2NsYXNzTGlzdFxuICovXG5cbmlmIChcImRvY3VtZW50XCIgaW4gd2luZG93LnNlbGYpIHtcblxuICAvLyBGdWxsIHBvbHlmaWxsIGZvciBicm93c2VycyB3aXRoIG5vIGNsYXNzTGlzdCBzdXBwb3J0XG4gIC8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuICBpZiAoIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKVxuICAgIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcImdcIikpKSB7XG5cbiAgKGZ1bmN0aW9uICh2aWV3KSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmICghKCdFbGVtZW50JyBpbiB2aWV3KSkgcmV0dXJuO1xuXG4gICAgdmFyXG4gICAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgICAsIHByb3RvUHJvcCA9IFwicHJvdG90eXBlXCJcbiAgICAgICwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cbiAgICAgICwgb2JqQ3RyID0gT2JqZWN0XG4gICAgICAsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgICB9XG4gICAgICAsIGFyckluZGV4T2YgPSBBcnJheVtwcm90b1Byb3BdLmluZGV4T2YgfHwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBpID0gMFxuICAgICAgICAgICwgbGVuID0gdGhpcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgICAsIERPTUV4ID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gdHlwZTtcbiAgICAgICAgdGhpcy5jb2RlID0gRE9NRXhjZXB0aW9uW3R5cGVdO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgfVxuICAgICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAsIFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgLCBcIlN0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3RlclwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgICAgfVxuICAgICAgLCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIHRyaW1tZWRDbGFzc2VzID0gc3RyVHJpbS5jYWxsKGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcbiAgICAgICAgICAsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICAgICAgICwgaSA9IDBcbiAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLnRvU3RyaW5nKCkpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cbiAgICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICAgIH1cbiAgICA7XG4gICAgLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuICAgIC8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuICAgIERPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuICAgIGNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICB0b2tlbiArPSBcIlwiO1xuICAgICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xuICAgIH07XG4gICAgY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyXG4gICAgICAgICAgdG9rZW5zID0gYXJndW1lbnRzXG4gICAgICAgICwgaSA9IDBcbiAgICAgICAgLCBsID0gdG9rZW5zLmxlbmd0aFxuICAgICAgICAsIHRva2VuXG4gICAgICAgICwgdXBkYXRlZCA9IGZhbHNlXG4gICAgICA7XG4gICAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5wdXNoKHRva2VuKTtcbiAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAgIHRva2VucyA9IGFyZ3VtZW50c1xuICAgICAgICAsIGkgPSAwXG4gICAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICAgLCB0b2tlblxuICAgICAgICAsIHVwZGF0ZWQgPSBmYWxzZVxuICAgICAgICAsIGluZGV4XG4gICAgICA7XG4gICAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIHVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLnRvZ2dsZSA9IGZ1bmN0aW9uICh0b2tlbiwgZm9yY2UpIHtcbiAgICAgIHRva2VuICs9IFwiXCI7XG5cbiAgICAgIHZhclxuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY29udGFpbnModG9rZW4pXG4gICAgICAgICwgbWV0aG9kID0gcmVzdWx0ID9cbiAgICAgICAgICBmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG4gICAgICAgIDpcbiAgICAgICAgICBmb3JjZSAhPT0gZmFsc2UgJiYgXCJhZGRcIlxuICAgICAgO1xuXG4gICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXSh0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmpvaW4oXCIgXCIpO1xuICAgIH07XG5cbiAgICBpZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG4gICAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgY2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2JqQ3RyW3Byb3RvUHJvcF0uX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbiAgICB9XG5cbiAgICB9KHdpbmRvdy5zZWxmKSk7XG5cbiAgICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuICAgIC8vIHRvIG5vcm1hbGl6ZSB0aGUgYWRkL3JlbW92ZSBhbmQgdG9nZ2xlIEFQSXMuXG5cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAgIHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG4gICAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYzFcIiwgXCJjMlwiKTtcblxuICAgICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcbiAgICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjMlwiKSkge1xuICAgICAgICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgICB9XG5cbiAgICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cbiAgICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMCBhbmQgRmlyZWZveCA8MjQsIHdoZXJlIGNsYXNzTGlzdC50b2dnbGUgZG9lcyBub3RcbiAgICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuICAgICAgICB2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgaWYgKDEgaW4gYXJndW1lbnRzICYmICF0aGlzLmNvbnRhaW5zKHRva2VuKSA9PT0gIWZvcmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgfVxuXG4gICAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG4gICAgfSgpKTtcbiAgfVxufVxuIiwiLy8gZWxlbWVudC1jbG9zZXN0IHwgQ0MwLTEuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9jbG9zZXN0XG5cbihmdW5jdGlvbiAoRWxlbWVudFByb3RvKSB7XG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLm1hdGNoZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdCsraW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG5cdFx0fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLmNsb3Nlc3QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8uY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0fVxufSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUsIEtleWJvYXJkRXZlbnQsIG1vZHVsZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIHZhciBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSB7XG4gICAgcG9seWZpbGw6IHBvbHlmaWxsLFxuICAgIGtleXM6IHtcbiAgICAgIDM6ICdDYW5jZWwnLFxuICAgICAgNjogJ0hlbHAnLFxuICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICA5OiAnVGFiJyxcbiAgICAgIDEyOiAnQ2xlYXInLFxuICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAxNjogJ1NoaWZ0JyxcbiAgICAgIDE3OiAnQ29udHJvbCcsXG4gICAgICAxODogJ0FsdCcsXG4gICAgICAxOTogJ1BhdXNlJyxcbiAgICAgIDIwOiAnQ2Fwc0xvY2snLFxuICAgICAgMjc6ICdFc2NhcGUnLFxuICAgICAgMjg6ICdDb252ZXJ0JyxcbiAgICAgIDI5OiAnTm9uQ29udmVydCcsXG4gICAgICAzMDogJ0FjY2VwdCcsXG4gICAgICAzMTogJ01vZGVDaGFuZ2UnLFxuICAgICAgMzI6ICcgJyxcbiAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgIDM0OiAnUGFnZURvd24nLFxuICAgICAgMzU6ICdFbmQnLFxuICAgICAgMzY6ICdIb21lJyxcbiAgICAgIDM3OiAnQXJyb3dMZWZ0JyxcbiAgICAgIDM4OiAnQXJyb3dVcCcsXG4gICAgICAzOTogJ0Fycm93UmlnaHQnLFxuICAgICAgNDA6ICdBcnJvd0Rvd24nLFxuICAgICAgNDE6ICdTZWxlY3QnLFxuICAgICAgNDI6ICdQcmludCcsXG4gICAgICA0MzogJ0V4ZWN1dGUnLFxuICAgICAgNDQ6ICdQcmludFNjcmVlbicsXG4gICAgICA0NTogJ0luc2VydCcsXG4gICAgICA0NjogJ0RlbGV0ZScsXG4gICAgICA0ODogWycwJywgJyknXSxcbiAgICAgIDQ5OiBbJzEnLCAnISddLFxuICAgICAgNTA6IFsnMicsICdAJ10sXG4gICAgICA1MTogWyczJywgJyMnXSxcbiAgICAgIDUyOiBbJzQnLCAnJCddLFxuICAgICAgNTM6IFsnNScsICclJ10sXG4gICAgICA1NDogWyc2JywgJ14nXSxcbiAgICAgIDU1OiBbJzcnLCAnJiddLFxuICAgICAgNTY6IFsnOCcsICcqJ10sXG4gICAgICA1NzogWyc5JywgJygnXSxcbiAgICAgIDkxOiAnT1MnLFxuICAgICAgOTM6ICdDb250ZXh0TWVudScsXG4gICAgICAxNDQ6ICdOdW1Mb2NrJyxcbiAgICAgIDE0NTogJ1Njcm9sbExvY2snLFxuICAgICAgMTgxOiAnVm9sdW1lTXV0ZScsXG4gICAgICAxODI6ICdWb2x1bWVEb3duJyxcbiAgICAgIDE4MzogJ1ZvbHVtZVVwJyxcbiAgICAgIDE4NjogWyc7JywgJzonXSxcbiAgICAgIDE4NzogWyc9JywgJysnXSxcbiAgICAgIDE4ODogWycsJywgJzwnXSxcbiAgICAgIDE4OTogWyctJywgJ18nXSxcbiAgICAgIDE5MDogWycuJywgJz4nXSxcbiAgICAgIDE5MTogWycvJywgJz8nXSxcbiAgICAgIDE5MjogWydgJywgJ34nXSxcbiAgICAgIDIxOTogWydbJywgJ3snXSxcbiAgICAgIDIyMDogWydcXFxcJywgJ3wnXSxcbiAgICAgIDIyMTogWyddJywgJ30nXSxcbiAgICAgIDIyMjogW1wiJ1wiLCAnXCInXSxcbiAgICAgIDIyNDogJ01ldGEnLFxuICAgICAgMjI1OiAnQWx0R3JhcGgnLFxuICAgICAgMjQ2OiAnQXR0bicsXG4gICAgICAyNDc6ICdDclNlbCcsXG4gICAgICAyNDg6ICdFeFNlbCcsXG4gICAgICAyNDk6ICdFcmFzZUVvZicsXG4gICAgICAyNTA6ICdQbGF5JyxcbiAgICAgIDI1MTogJ1pvb21PdXQnXG4gICAgfVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGtleXMgKEYxLTI0KS5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDE7IGkgPCAyNTsgaSsrKSB7XG4gICAga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbMTExICsgaV0gPSAnRicgKyBpO1xuICB9XG5cbiAgLy8gUHJpbnRhYmxlIEFTQ0lJIGNoYXJhY3RlcnMuXG4gIHZhciBsZXR0ZXIgPSAnJztcbiAgZm9yIChpID0gNjU7IGkgPCA5MTsgaSsrKSB7XG4gICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1tpXSA9IFtsZXR0ZXIudG9Mb3dlckNhc2UoKSwgbGV0dGVyLnRvVXBwZXJDYXNlKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWZpbGwgKCkge1xuICAgIGlmICghKCdLZXlib2FyZEV2ZW50JyBpbiB3aW5kb3cpIHx8XG4gICAgICAgICdrZXknIGluIEtleWJvYXJkRXZlbnQucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUG9seWZpbGwgYGtleWAgb24gYEtleWJvYXJkRXZlbnRgLlxuICAgIHZhciBwcm90byA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzW3RoaXMud2hpY2ggfHwgdGhpcy5rZXlDb2RlXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAga2V5ID0ga2V5Wyt0aGlzLnNoaWZ0S2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUsICdrZXknLCBwcm90byk7XG4gICAgcmV0dXJuIHByb3RvO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgna2V5Ym9hcmRldmVudC1rZXktcG9seWZpbGwnLCBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsO1xuICB9IGVsc2UgaWYgKHdpbmRvdykge1xuICAgIHdpbmRvdy5rZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGw7XG4gIH1cblxufSkoKTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBkZWxlZ2F0ZUFsbCA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlQWxsJyk7XG5cbmNvbnN0IERFTEVHQVRFX1BBVFRFUk4gPSAvXiguKyk6ZGVsZWdhdGVcXCgoLispXFwpJC87XG5jb25zdCBTUEFDRSA9ICcgJztcblxuY29uc3QgZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKERFTEVHQVRFX1BBVFRFUk4pO1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChtYXRjaCkge1xuICAgIHR5cGUgPSBtYXRjaFsxXTtcbiAgICBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICB9XG5cbiAgdmFyIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogcG9wS2V5KGhhbmRsZXIsICdjYXB0dXJlJyksXG4gICAgICBwYXNzaXZlOiBwb3BLZXkoaGFuZGxlciwgJ3Bhc3NpdmUnKVxuICAgIH07XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGRlbGVnYXRlOiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKVxuICAgICAgPyBkZWxlZ2F0ZUFsbChoYW5kbGVyKVxuICAgICAgOiBzZWxlY3RvclxuICAgICAgICA/IGRlbGVnYXRlKHNlbGVjdG9yLCBoYW5kbGVyKVxuICAgICAgICA6IGhhbmRsZXIsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuXG4gIGlmICh0eXBlLmluZGV4T2YoU1BBQ0UpID4gLTEpIHtcbiAgICByZXR1cm4gdHlwZS5zcGxpdChTUEFDRSkubWFwKGZ1bmN0aW9uKF90eXBlKSB7XG4gICAgICByZXR1cm4gYXNzaWduKHt0eXBlOiBfdHlwZX0sIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lci50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxudmFyIHBvcEtleSA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICBkZWxldGUgb2JqW2tleV07XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVoYXZpb3IoZXZlbnRzLCBwcm9wcykge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gICAgLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHR5cGUsIGV2ZW50c1t0eXBlXSk7XG4gICAgICByZXR1cm4gbWVtby5jb25jYXQobGlzdGVuZXJzKTtcbiAgICB9LCBbXSk7XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGRCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBwcm9wcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKGZ1bmN0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMuc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSkgPT09IGZhbHNlO1xuICAgIH0sIHRoaXMpO1xuICB9O1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgY29tcG9zZSA9IHJlcXVpcmUoJy4uL2NvbXBvc2UnKTtcblxuY29uc3QgU1BMQVQgPSAnKic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGVBbGwoc2VsZWN0b3JzKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpXG5cbiAgLy8gWFhYIG9wdGltaXphdGlvbjogaWYgdGhlcmUgaXMgb25seSBvbmUgaGFuZGxlciBhbmQgaXQgYXBwbGllcyB0b1xuICAvLyBhbGwgZWxlbWVudHMgKHRoZSBcIipcIiBDU1Mgc2VsZWN0b3IpLCB0aGVuIGp1c3QgcmV0dXJuIHRoYXRcbiAgLy8gaGFuZGxlclxuICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gU1BMQVQpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW1NQTEFUXTtcbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHNlbGVjdG9yKSB7XG4gICAgbWVtby5wdXNoKGRlbGVnYXRlKHNlbGVjdG9yLCBzZWxlY3RvcnNbc2VsZWN0b3JdKSk7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGNvbXBvc2UoZGVsZWdhdGVzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZShlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JhbmNlKGUpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gZS50YXJnZXQgJiYgIWVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJlaGF2aW9yOiAgICAgcmVxdWlyZSgnLi9iZWhhdmlvcicpLFxuICBkZWxlZ2F0ZTogICAgIHJlcXVpcmUoJy4vZGVsZWdhdGUnKSxcbiAgZGVsZWdhdGVBbGw6ICByZXF1aXJlKCcuL2RlbGVnYXRlQWxsJyksXG4gIGlnbm9yZTogICAgICAgcmVxdWlyZSgnLi9pZ25vcmUnKSxcbiAga2V5bWFwOiAgICAgICByZXF1aXJlKCcuL2tleW1hcCcpLFxufTtcbiIsInJlcXVpcmUoJ2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsJyk7XG5cbi8vIHRoZXNlIGFyZSB0aGUgb25seSByZWxldmFudCBtb2RpZmllcnMgc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsXG4vLyBhY2NvcmRpbmcgdG8gTUROOlxuLy8gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2dldE1vZGlmaWVyU3RhdGU+XG5jb25zdCBNT0RJRklFUlMgPSB7XG4gICdBbHQnOiAgICAgICdhbHRLZXknLFxuICAnQ29udHJvbCc6ICAnY3RybEtleScsXG4gICdDdHJsJzogICAgICdjdHJsS2V5JyxcbiAgJ1NoaWZ0JzogICAgJ3NoaWZ0S2V5J1xufTtcblxuY29uc3QgTU9ESUZJRVJfU0VQQVJBVE9SID0gJysnO1xuXG5jb25zdCBnZXRFdmVudEtleSA9IGZ1bmN0aW9uKGV2ZW50LCBoYXNNb2RpZmllcnMpIHtcbiAgdmFyIGtleSA9IGV2ZW50LmtleTtcbiAgaWYgKGhhc01vZGlmaWVycykge1xuICAgIGZvciAodmFyIG1vZGlmaWVyIGluIE1PRElGSUVSUykge1xuICAgICAgaWYgKGV2ZW50W01PRElGSUVSU1ttb2RpZmllcl1dID09PSB0cnVlKSB7XG4gICAgICAgIGtleSA9IFttb2RpZmllciwga2V5XS5qb2luKE1PRElGSUVSX1NFUEFSQVRPUik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtleW1hcChrZXlzKSB7XG4gIGNvbnN0IGhhc01vZGlmaWVycyA9IE9iamVjdC5rZXlzKGtleXMpLnNvbWUoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKE1PRElGSUVSX1NFUEFSQVRPUikgPiAtMTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBrZXkgPSBnZXRFdmVudEtleShldmVudCwgaGFzTW9kaWZpZXJzKTtcbiAgICByZXR1cm4gW2tleSwga2V5LnRvTG93ZXJDYXNlKCldXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgX2tleSkge1xuICAgICAgICBpZiAoX2tleSBpbiBrZXlzKSB7XG4gICAgICAgICAgcmVzdWx0ID0ga2V5c1trZXldLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB1bmRlZmluZWQpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuTU9ESUZJRVJTID0gTU9ESUZJRVJTO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVfVFJJTSA9IC8oXlxccyspfChcXHMrJCkvZztcbnZhciBSRV9TUExJVCA9IC9cXHMrLztcblxudmFyIHRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgPyBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci5yZXBsYWNlKFJFX1RSSU0sICcnKTsgfTtcblxudmFyIHF1ZXJ5QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tpZD1cIicgKyBpZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlc29sdmVJZHMoaWRzLCBkb2MpIHtcbiAgaWYgKHR5cGVvZiBpZHMgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBidXQgZ290ICcgKyAodHlwZW9mIGlkcykpO1xuICB9XG5cbiAgaWYgKCFkb2MpIHtcbiAgICBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgZ2V0RWxlbWVudEJ5SWQgPSBkb2MuZ2V0RWxlbWVudEJ5SWRcbiAgICA/IGRvYy5nZXRFbGVtZW50QnlJZC5iaW5kKGRvYylcbiAgICA6IHF1ZXJ5QnlJZC5iaW5kKGRvYyk7XG5cbiAgaWRzID0gdHJpbShpZHMpLnNwbGl0KFJFX1NQTElUKTtcblxuICAvLyBYWFggd2UgY2FuIHNob3J0LWNpcmN1aXQgaGVyZSBiZWNhdXNlIHRyaW1taW5nIGFuZCBzcGxpdHRpbmcgYVxuICAvLyBzdHJpbmcgb2YganVzdCB3aGl0ZXNwYWNlIHByb2R1Y2VzIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzaW5nbGUsXG4gIC8vIGVtcHR5IHN0cmluZ1xuICBpZiAoaWRzLmxlbmd0aCA9PT0gMSAmJiBpZHNbMF0gPT09ICcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBlbCA9IGdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG59O1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB0b2dnbGVGb3JtSW5wdXQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXRcIik7XG5cbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH0tc2hvdy1wYXNzd29yZGA7XG5cbmZ1bmN0aW9uIHRvZ2dsZShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiB0b2dnbGUsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbiwgLiR7UFJFRklYfS1hY2NvcmRpb24tLWJvcmRlcmVkYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbl9fYnV0dG9uW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBNVUxUSVNFTEVDVEFCTEUgPSBcImRhdGEtYWxsb3ctbXVsdGlwbGVcIjtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgYnV0dG9uIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGFjY29yZGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYWNjb3JkaW9uXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MQnV0dG9uRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldEFjY29yZGlvbkJ1dHRvbnMgPSAoYWNjb3JkaW9uKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbnMgPSBzZWxlY3QoQlVUVE9OLCBhY2NvcmRpb24pO1xuXG4gIHJldHVybiBidXR0b25zLmZpbHRlcigoYnV0dG9uKSA9PiBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pID09PSBhY2NvcmRpb24pO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgYSBidXR0b24ncyBcInByZXNzZWRcIiBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHBhcmFtIHtib29sZWFuP30gZXhwYW5kZWQgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdGhlIHJlc3VsdGluZyBzdGF0ZVxuICovXG5jb25zdCB0b2dnbGVCdXR0b24gPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICBjb25zdCBhY2NvcmRpb24gPSBidXR0b24uY2xvc2VzdChBQ0NPUkRJT04pO1xuICBsZXQgc2FmZUV4cGFuZGVkID0gZXhwYW5kZWQ7XG5cbiAgaWYgKCFhY2NvcmRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7QlVUVE9OfSBpcyBtaXNzaW5nIG91dGVyICR7QUNDT1JESU9OfWApO1xuICB9XG5cbiAgc2FmZUV4cGFuZGVkID0gdG9nZ2xlKGJ1dHRvbiwgZXhwYW5kZWQpO1xuXG4gIC8vIFhYWCBtdWx0aXNlbGVjdGFibGUgaXMgb3B0LWluLCB0byBwcmVzZXJ2ZSBsZWdhY3kgYmVoYXZpb3JcbiAgY29uc3QgbXVsdGlzZWxlY3RhYmxlID0gYWNjb3JkaW9uLmhhc0F0dHJpYnV0ZShNVUxUSVNFTEVDVEFCTEUpO1xuXG4gIGlmIChzYWZlRXhwYW5kZWQgJiYgIW11bHRpc2VsZWN0YWJsZSkge1xuICAgIGdldEFjY29yZGlvbkJ1dHRvbnMoYWNjb3JkaW9uKS5mb3JFYWNoKChvdGhlcikgPT4ge1xuICAgICAgaWYgKG90aGVyICE9PSBidXR0b24pIHtcbiAgICAgICAgdG9nZ2xlKG90aGVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNob3dCdXR0b24gPSAoYnV0dG9uKSA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCB0cnVlKTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IGZhbHNlXG4gKi9cbmNvbnN0IGhpZGVCdXR0b24gPSAoYnV0dG9uKSA9PiB0b2dnbGVCdXR0b24oYnV0dG9uLCBmYWxzZSk7XG5cbmNvbnN0IGFjY29yZGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl0oKSB7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbih0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcInRydWVcIikge1xuICAgICAgICAgIC8vIFdlIHdlcmUganVzdCBleHBhbmRlZCwgYnV0IGlmIGFub3RoZXIgYWNjb3JkaW9uIHdhcyBhbHNvIGp1c3RcbiAgICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgICAvLyB0aGF0IHdlIGFyZSBzdGlsbCB2aXNpYmxlLCBzbyB0aGUgdXNlciBpc24ndCBjb25mdXNlZC5cbiAgICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcykpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCByb290KS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbihidXR0b24sIGV4cGFuZGVkKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgQUNDT1JESU9OLFxuICAgIEJVVFRPTixcbiAgICBzaG93OiBzaG93QnV0dG9uLFxuICAgIGhpZGU6IGhpZGVCdXR0b24sXG4gICAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gICAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2NvcmRpb247XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1iYW5uZXJfX2hlYWRlcmA7XG5jb25zdCBFWFBBTkRFRF9DTEFTUyA9IGAke1BSRUZJWH0tYmFubmVyX19oZWFkZXItLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gdG9nZ2xlRWwoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWBdOiB0b2dnbGVCYW5uZXIsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2RlYm91bmNlXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hBUkFDVEVSX0NPVU5UX0NMQVNTID0gYCR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRgO1xuY29uc3QgQ0hBUkFDVEVSX0NPVU5UID0gYC4ke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31gO1xuY29uc3QgSU5QVVQgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX2ZpZWxkYDtcbmNvbnN0IE1FU1NBR0UgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX21lc3NhZ2VgO1xuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJUaGUgY29udGVudCBpcyB0b28gbG9uZy5cIjtcbmNvbnN0IE1FU1NBR0VfSU5WQUxJRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19zdGF0dXMtLWludmFsaWRgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfQ0xBU1MgPSBgJHtDSEFSQUNURVJfQ09VTlRfQ0xBU1N9X19zdGF0dXNgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWV9DTEFTUyA9IGAke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31fX3NyLXN0YXR1c2A7XG5jb25zdCBTVEFUVVNfTUVTU0FHRSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWA7XG5jb25zdCBERUZBVUxUX1NUQVRVU19MQUJFTCA9IGBjaGFyYWN0ZXJzIGFsbG93ZWRgO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJvb3QgYW5kIG1lc3NhZ2UgZWxlbWVudCBmb3IgYW4gY2hhcmFjdGVyIGNvdW50IGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKiBAcmV0dXJucyB7Q2hhcmFjdGVyQ291bnRFbGVtZW50c30gZWxlbWVudHMgVGhlIHJvb3QgYW5kIG1lc3NhZ2UgZWxlbWVudC5cbiAqL1xuY29uc3QgZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGNoYXJhY3RlckNvdW50RWwgPSBpbnB1dEVsLmNsb3Nlc3QoQ0hBUkFDVEVSX0NPVU5UKTtcblxuICBpZiAoIWNoYXJhY3RlckNvdW50RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7SU5QVVR9IGlzIG1pc3Npbmcgb3V0ZXIgJHtDSEFSQUNURVJfQ09VTlR9YCk7XG4gIH1cblxuICBjb25zdCBtZXNzYWdlRWwgPSBjaGFyYWN0ZXJDb3VudEVsLnF1ZXJ5U2VsZWN0b3IoTUVTU0FHRSk7XG5cbiAgaWYgKCFtZXNzYWdlRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Q0hBUkFDVEVSX0NPVU5UfSBpcyBtaXNzaW5nIGlubmVyICR7TUVTU0FHRX1gKTtcbiAgfVxuXG4gIHJldHVybiB7IGNoYXJhY3RlckNvdW50RWwsIG1lc3NhZ2VFbCB9O1xufTtcblxuLyoqXG4gKiBNb3ZlIG1heGxlbmd0aCBhdHRyaWJ1dGUgdG8gYSBkYXRhIGF0dHJpYnV0ZSBvbiB1c2EtY2hhcmFjdGVyLWNvdW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHNldERhdGFMZW5ndGggPSAoaW5wdXRFbCkgPT4ge1xuICBjb25zdCB7IGNoYXJhY3RlckNvdW50RWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgY29uc3QgbWF4bGVuZ3RoID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIik7XG5cbiAgaWYgKCFtYXhsZW5ndGgpIHJldHVybjtcblxuICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcbiAgY2hhcmFjdGVyQ291bnRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1heGxlbmd0aFwiLCBtYXhsZW5ndGgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIGFwcGVuZCBzdGF0dXMgbWVzc2FnZXMgZm9yIHZpc3VhbCBhbmQgc2NyZWVuIHJlYWRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBjaGFyYWN0ZXJDb3VudEVsIC0gRGl2IHdpdGggYC51c2EtY2hhcmFjdGVyLWNvdW50YCBjbGFzc1xuICogQGRlc2NyaXB0aW9uICBDcmVhdGUgdHdvIHN0YXR1cyBtZXNzYWdlcyBmb3IgbnVtYmVyIG9mIGNoYXJhY3RlcnMgbGVmdDtcbiAqIG9uZSB2aXN1YWwgc3RhdHVzIGFuZCBhbm90aGVyIGZvciBzY3JlZW4gcmVhZGVyc1xuICovXG5jb25zdCBjcmVhdGVTdGF0dXNNZXNzYWdlcyA9IChjaGFyYWN0ZXJDb3VudEVsKSA9PiB7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtYXhMZW5ndGggPSBjaGFyYWN0ZXJDb3VudEVsLmRhdGFzZXQubWF4bGVuZ3RoO1xuICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9IGAke21heExlbmd0aH0gJHtERUZBVUxUX1NUQVRVU19MQUJFTH1gO1xuXG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChgJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gLCBcInVzYS1oaW50XCIpO1xuICBzclN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChcbiAgICBgJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWAsXG4gICAgXCJ1c2Etc3Itb25seVwiXG4gICk7XG5cbiAgc3RhdHVzTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgc3JTdGF0dXNNZXNzYWdlLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gZGVmYXVsdE1lc3NhZ2U7XG4gIHNyU3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRNZXNzYWdlO1xuXG4gIGNoYXJhY3RlckNvdW50RWwuYXBwZW5kKHN0YXR1c01lc3NhZ2UsIHNyU3RhdHVzTWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgbWVzc2FnZSB3aXRoIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudExlbmd0aCAtIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyB1c2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4TGVuZ3RoIC0gVGhlIHRvdGFsIG51bWJlciBvZiBjaGFyYWN0ZXJzIGFsbG93ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqL1xuY29uc3QgZ2V0Q291bnRNZXNzYWdlID0gKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICBsZXQgbmV3TWVzc2FnZSA9IFwiXCI7XG5cbiAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDApIHtcbiAgICBuZXdNZXNzYWdlID0gYCR7bWF4TGVuZ3RofSAke0RFRkFVTFRfU1RBVFVTX0xBQkVMfWA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKG1heExlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBgY2hhcmFjdGVyJHtkaWZmZXJlbmNlID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gICAgY29uc3QgZ3VpZGFuY2UgPSBjdXJyZW50TGVuZ3RoID4gbWF4TGVuZ3RoID8gXCJvdmVyIGxpbWl0XCIgOiBcImxlZnRcIjtcblxuICAgIG5ld01lc3NhZ2UgPSBgJHtkaWZmZXJlbmNlfSAke2NoYXJhY3RlcnN9ICR7Z3VpZGFuY2V9YDtcbiAgfVxuXG4gIHJldHVybiBuZXdNZXNzYWdlO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjaGFyYWN0ZXIgY291bnQgc3RhdHVzIGZvciBzY3JlZW4gcmVhZGVycyBhZnRlciBhIDEwMDBtcyBkZWxheS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBtc2dFbCAtIFRoZSBzY3JlZW4gcmVhZGVyIHN0YXR1cyBtZXNzYWdlIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0dXNNZXNzYWdlIC0gQSBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIHN0YXR1c1xuICovXG5jb25zdCBzclVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKChtc2dFbCwgc3RhdHVzTWVzc2FnZSkgPT4ge1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBtc2dFbDtcbiAgc3JTdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gc3RhdHVzTWVzc2FnZTtcbn0sIDEwMDApO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2hhcmFjdGVyIGNvdW50IGNvbXBvbmVudFxuICpcbiAqIEBkZXNjcmlwdGlvbiBPbiBpbnB1dCwgaXQgd2lsbCB1cGRhdGUgdmlzdWFsIHN0YXR1cywgc2NyZWVucmVhZGVyXG4gKiBzdGF0dXMgYW5kIHVwZGF0ZSBpbnB1dCB2YWxpZGF0aW9uIChpZiBvdmVyIGNoYXJhY3RlciBsZW5ndGgpXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudH0gaW5wdXRFbCBUaGUgY2hhcmFjdGVyIGNvdW50IGlucHV0IGVsZW1lbnRcbiAqL1xuY29uc3QgdXBkYXRlQ291bnRNZXNzYWdlID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsIH0gPSBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzKGlucHV0RWwpO1xuICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaW5wdXRFbC52YWx1ZS5sZW5ndGg7XG4gIGNvbnN0IG1heExlbmd0aCA9IHBhcnNlSW50KFxuICAgIGNoYXJhY3RlckNvdW50RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhsZW5ndGhcIiksXG4gICAgMTBcbiAgKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihTVEFUVVNfTUVTU0FHRSk7XG4gIGNvbnN0IHNyU3RhdHVzTWVzc2FnZSA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihcbiAgICBTVEFUVVNfTUVTU0FHRV9TUl9PTkxZXG4gICk7XG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNNZXNzYWdlID0gZ2V0Q291bnRNZXNzYWdlKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCk7XG5cbiAgaWYgKCFtYXhMZW5ndGgpIHJldHVybjtcblxuICBjb25zdCBpc092ZXJMaW1pdCA9IGN1cnJlbnRMZW5ndGggJiYgY3VycmVudExlbmd0aCA+IG1heExlbmd0aDtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gY3VycmVudFN0YXR1c01lc3NhZ2U7XG4gIHNyVXBkYXRlU3RhdHVzKHNyU3RhdHVzTWVzc2FnZSwgY3VycmVudFN0YXR1c01lc3NhZ2UpO1xuXG4gIGlmIChpc092ZXJMaW1pdCAmJiAhaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGlucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNPdmVyTGltaXQgJiYgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgfVxuXG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShNRVNTQUdFX0lOVkFMSURfQ0xBU1MsIGlzT3ZlckxpbWl0KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21wb25lbnRcbiAqXG4gKiBAZGVzY3JpcHRpb24gT24gaW5pdCB0aGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIGVsZW1lbnRzIGFuZCB1cGRhdGUgYW55XG4gKiBhdHRyaWJ1dGVzIHNvIGl0IGNhbiB0ZWxsIHRoZSB1c2VyIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnQuXG4gKiBAcGFyYW0gIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgdGhlIGNvbXBvbmVudHMgaW5wdXRcbiAqL1xuY29uc3QgZW5oYW5jZUNoYXJhY3RlckNvdW50ID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsLCBtZXNzYWdlRWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgLy8gSGlkZSBoaW50IGFuZCByZW1vdmUgYXJpYS1saXZlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBtZXNzYWdlRWwuY2xhc3NMaXN0LmFkZChcInVzYS1zci1vbmx5XCIpO1xuICBtZXNzYWdlRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1saXZlXCIpO1xuXG4gIHNldERhdGFMZW5ndGgoaW5wdXRFbCk7XG4gIGNyZWF0ZVN0YXR1c01lc3NhZ2VzKGNoYXJhY3RlckNvdW50RWwpO1xufTtcblxuY29uc3QgY2hhcmFjdGVyQ291bnQgPSBiZWhhdmlvcihcbiAge1xuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICB1cGRhdGVDb3VudE1lc3NhZ2UodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChJTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXQpID0+IGVuaGFuY2VDaGFyYWN0ZXJDb3VudChpbnB1dCkpO1xuICAgIH0sXG4gICAgTUVTU0FHRV9JTlZBTElEX0NMQVNTLFxuICAgIFZBTElEQVRJT05fTUVTU0FHRSxcbiAgICBTVEFUVVNfTUVTU0FHRV9DTEFTUyxcbiAgICBTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTLFxuICAgIERFRkFVTFRfU1RBVFVTX0xBQkVMLFxuICAgIGNyZWF0ZVN0YXR1c01lc3NhZ2VzLFxuICAgIGdldENvdW50TWVzc2FnZSxcbiAgICB1cGRhdGVDb3VudE1lc3NhZ2UsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmFjdGVyQ291bnQ7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5cbmNvbnN0IENPTUJPX0JPWF9DTEFTUyA9IGAke1BSRUZJWH0tY29tYm8tYm94YDtcbmNvbnN0IENPTUJPX0JPWF9QUklTVElORV9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU30tLXByaXN0aW5lYDtcbmNvbnN0IFNFTEVDVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX3NlbGVjdGA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2NsZWFyLWlucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9XUkFQUEVSX0NMQVNTID0gYCR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfV9fd3JhcHBlcmA7XG5jb25zdCBJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9faW5wdXQtYnV0dG9uLXNlcGFyYXRvcmA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X190b2dnbGUtbGlzdGA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgTElTVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2xpc3RgO1xuY29uc3QgTElTVF9PUFRJT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0LW9wdGlvbmA7XG5jb25zdCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBTVEFUVVNfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zdGF0dXNgO1xuXG5jb25zdCBDT01CT19CT1ggPSBgLiR7Q09NQk9fQk9YX0NMQVNTfWA7XG5jb25zdCBTRUxFQ1QgPSBgLiR7U0VMRUNUX0NMQVNTfWA7XG5jb25zdCBJTlBVVCA9IGAuJHtJTlBVVF9DTEFTU31gO1xuY29uc3QgQ0xFQVJfSU5QVVRfQlVUVE9OID0gYC4ke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OID0gYC4ke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgTElTVCA9IGAuJHtMSVNUX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTiA9IGAuJHtMSVNUX09QVElPTl9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRCA9IGAuJHtMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRCA9IGAuJHtMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTU31gO1xuY29uc3QgU1RBVFVTID0gYC4ke1NUQVRVU19DTEFTU31gO1xuXG5jb25zdCBERUZBVUxUX0ZJTFRFUiA9IFwiLip7e3F1ZXJ5fX0uKlwiO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFNlbGVjdEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIGNvbWJvIGJveC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbWJvQm94Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gY29tYm9Cb3hFbFxuICogQHByb3BlcnR5IHtIVE1MU2VsZWN0RWxlbWVudH0gc2VsZWN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MVUxpc3RFbGVtZW50fSBsaXN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IHN0YXR1c0VsXG4gKiBAcHJvcGVydHkge0hUTUxMSUVsZW1lbnR9IGZvY3VzZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBzZWxlY3RlZE9wdGlvbkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSB0b2dnbGVMaXN0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNsZWFySW5wdXRCdG5FbFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1ByaXN0aW5lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2FibGVGaWx0ZXJpbmdcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveFxuICogQHJldHVybnMge0NvbWJvQm94Q29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0Q29tYm9Cb3hDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGNvbWJvQm94RWwgPSBlbC5jbG9zZXN0KENPTUJPX0JPWCk7XG5cbiAgaWYgKCFjb21ib0JveEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtDT01CT19CT1h9YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTRUxFQ1QpO1xuICBjb25zdCBpbnB1dEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgY29uc3QgbGlzdEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1QpO1xuICBjb25zdCBzdGF0dXNFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTVEFUVVMpO1xuICBjb25zdCBmb2N1c2VkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fU0VMRUNURUQpO1xuICBjb25zdCB0b2dnbGVMaXN0QnRuRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoVE9HR0xFX0xJU1RfQlVUVE9OKTtcbiAgY29uc3QgY2xlYXJJbnB1dEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKENMRUFSX0lOUFVUX0JVVFRPTik7XG5cbiAgY29uc3QgaXNQcmlzdGluZSA9IGNvbWJvQm94RWwuY2xhc3NMaXN0LmNvbnRhaW5zKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIGNvbnN0IGRpc2FibGVGaWx0ZXJpbmcgPSBjb21ib0JveEVsLmRhdGFzZXQuZGlzYWJsZUZpbHRlcmluZyA9PT0gXCJ0cnVlXCI7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGZvY3VzZWRPcHRpb25FbCxcbiAgICBzZWxlY3RlZE9wdGlvbkVsLFxuICAgIHRvZ2dsZUxpc3RCdG5FbCxcbiAgICBjbGVhcklucHV0QnRuRWwsXG4gICAgaXNQcmlzdGluZSxcbiAgICBkaXNhYmxlRmlsdGVyaW5nLFxuICB9O1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIHRoZSBjb21iby1ib3ggY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgdG9nZ2xlTGlzdEJ0bkVsLCBjbGVhcklucHV0QnRuRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY2xlYXJJbnB1dEJ0bkVsLmhpZGRlbiA9IHRydWU7XG4gIGNsZWFySW5wdXRCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGNvbWJvLWJveCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSBmYWxzZTtcbiAgY2xlYXJJbnB1dEJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYSBzZWxlY3QgZWxlbWVudCBpbnRvIGEgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBfY29tYm9Cb3hFbCBUaGUgaW5pdGlhbCBlbGVtZW50IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VDb21ib0JveCA9IChfY29tYm9Cb3hFbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gX2NvbWJvQm94RWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmIChjb21ib0JveEVsLmRhdGFzZXQuZW5oYW5jZWQpIHJldHVybjtcblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKTtcblxuICBpZiAoIXNlbGVjdEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0NPTUJPX0JPWH0gaXMgbWlzc2luZyBpbm5lciBzZWxlY3RgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdElkID0gc2VsZWN0RWwuaWQ7XG4gIGNvbnN0IHNlbGVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKTtcbiAgY29uc3QgbGlzdElkID0gYCR7c2VsZWN0SWR9LS1saXN0YDtcbiAgY29uc3QgbGlzdElkTGFiZWwgPSBgJHtzZWxlY3RJZH0tbGFiZWxgO1xuICBjb25zdCBhc3Npc3RpdmVIaW50SUQgPSBgJHtzZWxlY3RJZH0tLWFzc2lzdGl2ZUhpbnRgO1xuICBjb25zdCBhZGRpdGlvbmFsQXR0cmlidXRlcyA9IFtdO1xuICBjb25zdCB7IGRlZmF1bHRWYWx1ZSB9ID0gY29tYm9Cb3hFbC5kYXRhc2V0O1xuICBjb25zdCB7IHBsYWNlaG9sZGVyIH0gPSBjb21ib0JveEVsLmRhdGFzZXQ7XG4gIGxldCBzZWxlY3RlZE9wdGlvbjtcblxuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKHsgcGxhY2Vob2xkZXIgfSk7XG4gIH1cblxuICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkVsID0gc2VsZWN0RWwub3B0aW9uc1tpXTtcblxuICAgICAgaWYgKG9wdGlvbkVsLnZhbHVlID09PSBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25FbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIGNvbWJvYm94IGlzIG1pc3NpbmcgYSBsYWJlbCBvciBsYWJlbCBpcyBtaXNzaW5nXG4gICAqIGBmb3JgIGF0dHJpYnV0ZS4gT3RoZXJ3aXNlLCBzZXQgdGhlIElEIHRvIG1hdGNoIHRoZSA8dWw+IGFyaWEtbGFiZWxsZWRieVxuICAgKi9cbiAgaWYgKCFzZWxlY3RMYWJlbCB8fCAhc2VsZWN0TGFiZWwubWF0Y2hlcyhgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0NPTUJPX0JPWH0gZm9yICR7c2VsZWN0SWR9IGlzIGVpdGhlciBtaXNzaW5nIGEgbGFiZWwgb3IgYSBcImZvclwiIGF0dHJpYnV0ZWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgfVxuXG4gIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBzZWxlY3RFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBzZWxlY3RFbC5jbGFzc0xpc3QuYWRkKFwidXNhLXNyLW9ubHlcIiwgU0VMRUNUX0NMQVNTKTtcbiAgc2VsZWN0RWwuaWQgPSBcIlwiO1xuICBzZWxlY3RFbC52YWx1ZSA9IFwiXCI7XG5cbiAgW1wicmVxdWlyZWRcIiwgXCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCJdLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBpZiAoc2VsZWN0RWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLnB1c2goeyBbbmFtZV06IHZhbHVlIH0pO1xuICAgICAgc2VsZWN0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2FuaXRpemUgZG9lc24ndCBsaWtlIGZ1bmN0aW9ucyBpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VsZWN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLW93bnNcIiwgbGlzdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBsaXN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWF1dG9jb21wbGV0ZVwiLCBcImxpc3RcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgYXNzaXN0aXZlSGludElEKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLCBcIm9mZlwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBJTlBVVF9DTEFTUyk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiY29tYm9ib3hcIik7XG4gIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLmZvckVhY2goKGF0dHIpID0+XG4gICAgT2JqZWN0LmtleXMoYXR0cikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7YXR0cltrZXldfWA7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfSlcbiAgKTtcblxuICBjb21ib0JveEVsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBpbnB1dCk7XG5cbiAgY29tYm9Cb3hFbC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8c3BhbiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJDbGVhciB0aGUgc2VsZWN0IGNvbnRlbnRzXCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7SU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTU31cIj4mbmJzcDs8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCIke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIHRoZSBkcm9wZG93biBsaXN0XCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8dWxcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIGlkPVwiJHtsaXN0SWR9XCJcbiAgICAgICAgY2xhc3M9XCIke0xJU1RfQ0xBU1N9XCJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCIke2xpc3RJZExhYmVsfVwiXG4gICAgICAgIGhpZGRlbj5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiJHtTVEFUVVNfQ0xBU1N9IHVzYS1zci1vbmx5XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PlxuICAgICAgPHNwYW4gaWQ9XCIke2Fzc2lzdGl2ZUhpbnRJRH1cIiBjbGFzcz1cInVzYS1zci1vbmx5XCI+XG4gICAgICAgIFdoZW4gYXV0b2NvbXBsZXRlIHJlc3VsdHMgYXJlIGF2YWlsYWJsZSB1c2UgdXAgYW5kIGRvd24gYXJyb3dzIHRvIHJldmlldyBhbmQgZW50ZXIgdG8gc2VsZWN0LlxuICAgICAgICBUb3VjaCBkZXZpY2UgdXNlcnMsIGV4cGxvcmUgYnkgdG91Y2ggb3Igd2l0aCBzd2lwZSBnZXN0dXJlcy5cbiAgICAgIDwvc3Bhbj5gXG4gICk7XG5cbiAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgY29uc3QgeyBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoY29tYm9Cb3hFbCk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBzZWxlY3RlZE9wdGlvbi52YWx1ZSk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIHNlbGVjdGVkT3B0aW9uLnRleHQpO1xuICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICB9XG5cbiAgaWYgKHNlbGVjdEVsLmRpc2FibGVkKSB7XG4gICAgZGlzYWJsZShjb21ib0JveEVsKTtcbiAgICBzZWxlY3RFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkID0gXCJ0cnVlXCI7XG59O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgZm9jdXNlZCBlbGVtZW50IHdpdGhpbiB0aGUgbGlzdCBvcHRpb25zIHdoZW5cbiAqIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGFuY2hvciBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV4dEVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc2tpcEZvY3VzIHNraXAgZm9jdXMgb2YgaGlnaGxpZ2h0ZWQgaXRlbVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnByZXZlbnRTY3JvbGwgc2hvdWxkIHNraXAgcHJvY2VkdXJlIHRvIHNjcm9sbCB0byBlbGVtZW50XG4gKi9cbmNvbnN0IGhpZ2hsaWdodE9wdGlvbiA9IChlbCwgbmV4dEVsLCB7IHNraXBGb2N1cywgcHJldmVudFNjcm9sbCB9ID0ge30pID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAoZm9jdXNlZE9wdGlvbkVsKSB7XG4gICAgZm9jdXNlZE9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgZm9jdXNlZE9wdGlvbkVsLnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gIH1cblxuICBpZiAobmV4dEVsKSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgbmV4dEVsLmlkKTtcbiAgICBuZXh0RWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgIG5leHRFbC5jbGFzc0xpc3QuYWRkKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICBjb25zdCBvcHRpb25Cb3R0b20gPSBuZXh0RWwub2Zmc2V0VG9wICsgbmV4dEVsLm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGN1cnJlbnRCb3R0b20gPSBsaXN0RWwuc2Nyb2xsVG9wICsgbGlzdEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKG9wdGlvbkJvdHRvbSA+IGN1cnJlbnRCb3R0b20pIHtcbiAgICAgICAgbGlzdEVsLnNjcm9sbFRvcCA9IG9wdGlvbkJvdHRvbSAtIGxpc3RFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWwub2Zmc2V0VG9wIDwgbGlzdEVsLnNjcm9sbFRvcCkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gbmV4dEVsLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXBGb2N1cykge1xuICAgICAgbmV4dEVsLmZvY3VzKHsgcHJldmVudFNjcm9sbCB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG4gICAgaW5wdXRFbC5mb2N1cygpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZHluYW1pYyByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWQgb2ZmIG9mIGEgcmVwbGFjZWFibGUgYW5kIHBvc3NpYmx5IGZpbHRlcmVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSB2YWx1ZSB0byB1c2UgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhcyBBbiBvYmplY3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0byByZXBsYWNlIGFuZCBmaWx0ZXIgdGhlIHF1ZXJ5XG4gKi9cbmNvbnN0IGdlbmVyYXRlRHluYW1pY1JlZ0V4cCA9IChmaWx0ZXIsIHF1ZXJ5ID0gXCJcIiwgZXh0cmFzID0ge30pID0+IHtcbiAgY29uc3QgZXNjYXBlUmVnRXhwID0gKHRleHQpID0+XG4gICAgdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgXCJcXFxcJCZcIik7XG5cbiAgbGV0IGZpbmQgPSBmaWx0ZXIucmVwbGFjZSgve3soLio/KX19L2csIChtLCAkMSkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICQxLnRyaW0oKTtcbiAgICBjb25zdCBxdWVyeUZpbHRlciA9IGV4dHJhc1trZXldO1xuICAgIGlmIChrZXkgIT09IFwicXVlcnlcIiAmJiBxdWVyeUZpbHRlcikge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IG5ldyBSZWdFeHAocXVlcnlGaWx0ZXIsIFwiaVwiKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBxdWVyeS5tYXRjaChtYXRjaGVyKTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChtYXRjaGVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocXVlcnkpO1xuICB9KTtcblxuICBmaW5kID0gYF4oPzoke2ZpbmR9KSRgO1xuXG4gIHJldHVybiBuZXcgUmVnRXhwKGZpbmQsIFwiaVwiKTtcbn07XG5cbi8qKlxuICogRGlzcGxheSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG4gIGxldCBzZWxlY3RlZEl0ZW1JZDtcbiAgbGV0IGZpcnN0Rm91bmRJZDtcblxuICBjb25zdCBsaXN0T3B0aW9uQmFzZUlkID0gYCR7bGlzdEVsLmlkfS0tb3B0aW9uLWA7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlciA9IGNvbWJvQm94RWwuZGF0YXNldC5maWx0ZXIgfHwgREVGQVVMVF9GSUxURVI7XG4gIGNvbnN0IHJlZ2V4ID0gZ2VuZXJhdGVEeW5hbWljUmVnRXhwKGZpbHRlciwgaW5wdXRWYWx1ZSwgY29tYm9Cb3hFbC5kYXRhc2V0KTtcblxuICBjb25zdCBvcHRpb25zID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke29wdGlvbnMubGVuZ3RofWA7XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25FbC52YWx1ZSAmJlxuICAgICAgKGRpc2FibGVGaWx0ZXJpbmcgfHxcbiAgICAgICAgaXNQcmlzdGluZSB8fFxuICAgICAgICAhaW5wdXRWYWx1ZSB8fFxuICAgICAgICByZWdleC50ZXN0KG9wdGlvbkVsLnRleHQpKVxuICAgICkge1xuICAgICAgaWYgKHNlbGVjdEVsLnZhbHVlICYmIG9wdGlvbkVsLnZhbHVlID09PSBzZWxlY3RFbC52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZEl0ZW1JZCA9IG9wdGlvbklkO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlzYWJsZUZpbHRlcmluZyAmJiAhZmlyc3RGb3VuZElkICYmIHJlZ2V4LnRlc3Qob3B0aW9uRWwudGV4dCkpIHtcbiAgICAgICAgZmlyc3RGb3VuZElkID0gb3B0aW9uSWQ7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnB1c2gob3B0aW9uRWwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG51bU9wdGlvbnMgPSBvcHRpb25zLmxlbmd0aDtcbiAgY29uc3Qgb3B0aW9uSHRtbCA9IG9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uSWQgPSBgJHtsaXN0T3B0aW9uQmFzZUlkfSR7aW5kZXh9YDtcbiAgICBjb25zdCBjbGFzc2VzID0gW0xJU1RfT1BUSU9OX0NMQVNTXTtcbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG4gICAgbGV0IGFyaWFTZWxlY3RlZCA9IFwiZmFsc2VcIjtcblxuICAgIGlmIChvcHRpb25JZCA9PT0gc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTUywgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgYXJpYVNlbGVjdGVkID0gXCJ0cnVlXCI7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxlY3RlZEl0ZW1JZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICB9XG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtc2V0c2l6ZVwiLCBvcHRpb25zLmxlbmd0aCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1wb3NpbnNldFwiLCBpbmRleCArIDEpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgYXJpYVNlbGVjdGVkKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcHRpb25JZCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJvcHRpb25cIik7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBvcHRpb24udmFsdWUpO1xuICAgIGxpLnRleHRDb250ZW50ID0gb3B0aW9uLnRleHQ7XG5cbiAgICByZXR1cm4gbGk7XG4gIH0pO1xuXG4gIGNvbnN0IG5vUmVzdWx0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbm9SZXN1bHRzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tbm8tcmVzdWx0c2ApO1xuICBub1Jlc3VsdHMudGV4dENvbnRlbnQgPSBcIk5vIHJlc3VsdHMgZm91bmRcIjtcblxuICBsaXN0RWwuaGlkZGVuID0gZmFsc2U7XG5cbiAgaWYgKG51bU9wdGlvbnMpIHtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBvcHRpb25IdG1sLmZvckVhY2goKGl0ZW0pID0+XG4gICAgICBsaXN0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGl0ZW0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsaXN0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG5vUmVzdWx0cyk7XG4gIH1cblxuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gbnVtT3B0aW9uc1xuICAgID8gYCR7bnVtT3B0aW9uc30gcmVzdWx0JHtudW1PcHRpb25zID4gMSA/IFwic1wiIDogXCJcIn0gYXZhaWxhYmxlLmBcbiAgICA6IFwiTm8gcmVzdWx0cy5cIjtcblxuICBsZXQgaXRlbVRvRm9jdXM7XG5cbiAgaWYgKGlzUHJpc3RpbmUgJiYgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICBpdGVtVG9Gb2N1cyA9IGxpc3RFbC5xdWVyeVNlbGVjdG9yKGAjJHtzZWxlY3RlZEl0ZW1JZH1gKTtcbiAgfSBlbHNlIGlmIChkaXNhYmxlRmlsdGVyaW5nICYmIGZpcnN0Rm91bmRJZCkge1xuICAgIGl0ZW1Ub0ZvY3VzID0gbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoYCMke2ZpcnN0Rm91bmRJZH1gKTtcbiAgfVxuXG4gIGlmIChpdGVtVG9Gb2N1cykge1xuICAgIGhpZ2hsaWdodE9wdGlvbihsaXN0RWwsIGl0ZW1Ub0ZvY3VzLCB7XG4gICAgICBza2lwRm9jdXM6IHRydWUsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogSGlkZSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhpZGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgbGlzdEVsLCBzdGF0dXNFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIHN0YXR1c0VsLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIFwiXCIpO1xuXG4gIGlmIChmb2N1c2VkT3B0aW9uRWwpIHtcbiAgICBmb2N1c2VkT3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZShMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgfVxuXG4gIGxpc3RFbC5zY3JvbGxUb3AgPSAwO1xuICBsaXN0RWwuaGlkZGVuID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGxpc3RPcHRpb25FbCBUaGUgbGlzdCBvcHRpb24gYmVpbmcgc2VsZWN0ZWRcbiAqL1xuY29uc3Qgc2VsZWN0SXRlbSA9IChsaXN0T3B0aW9uRWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGxpc3RPcHRpb25FbCk7XG5cbiAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBsaXN0T3B0aW9uRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsLCBsaXN0T3B0aW9uRWwudGV4dENvbnRlbnQpO1xuICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogQ2xlYXIgdGhlIGlucHV0IG9mIHRoZSBjb21ibyBib3hcbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhckJ1dHRvbkVsIFRoZSBjbGVhciBpbnB1dCBidXR0b25cbiAqL1xuY29uc3QgY2xlYXJJbnB1dCA9IChjbGVhckJ1dHRvbkVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID1cbiAgICBnZXRDb21ib0JveENvbnRleHQoY2xlYXJCdXR0b25FbCk7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGlmIChzZWxlY3RFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsKTtcbiAgaWYgKGlucHV0RWwudmFsdWUpIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgY29tYm9Cb3hFbC5jbGFzc0xpc3QucmVtb3ZlKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG5cbiAgaWYgKGxpc3RTaG93bikgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIHNlbGVjdCBiYXNlZCBvZmYgb2YgY3VycmVudGx5IHNldCBzZWxlY3QgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCByZXNldFNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdFZhbHVlID0gc2VsZWN0RWwudmFsdWU7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSAoaW5wdXRFbC52YWx1ZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChzZWxlY3RWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IHNlbGVjdFZhbHVlKSB7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICE9PSBvcHRpb25FbC50ZXh0KSB7XG4gICAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50IGJhc2VkIG9mZiBvZlxuICogaGF2aW5nIGEgY3VycmVudCBmb2N1c2VkIGxpc3Qgb3B0aW9uIG9yXG4gKiBoYXZpbmcgdGVzdCB0aGF0IGNvbXBsZXRlbHkgbWF0Y2hlcyBhIGxpc3Qgb3B0aW9uLlxuICogT3RoZXJ3aXNlIGl0IGNsZWFycyB0aGUgaW5wdXQgYW5kIHNlbGVjdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBjb21wbGV0ZVNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsLCBzdGF0dXNFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgICAgaWYgKG9wdGlvbkVsLnRleHQudG9Mb3dlckNhc2UoKSA9PT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIG9wdGlvbkVsLnZhbHVlKTtcbiAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVzY2FwZSBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZG93biBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21JbnB1dCA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGNvbnN0IG5leHRPcHRpb25FbCA9XG4gICAgbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCkgfHxcbiAgICBsaXN0RWwucXVlcnlTZWxlY3RvcihMSVNUX09QVElPTik7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihjb21ib0JveEVsLCBuZXh0T3B0aW9uRWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGFuIGlucHV0IGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVudGVyRnJvbUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgY29tcGxldGVTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG5cbiAgaWYgKGxpc3RTaG93bikge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBkb3duIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBuZXh0T3B0aW9uRWwgPSBmb2N1c2VkT3B0aW9uRWwubmV4dFNpYmxpbmc7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihmb2N1c2VkT3B0aW9uRWwsIG5leHRPcHRpb25FbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIHRhYiBldmVudCBmcm9tIGFuIGxpc3Qgb3B0aW9uIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZVRhYkZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSB1cCBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBmb2N1c2VkT3B0aW9uRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChcbiAgICBldmVudC50YXJnZXRcbiAgKTtcbiAgY29uc3QgbmV4dE9wdGlvbkVsID0gZm9jdXNlZE9wdGlvbkVsICYmIGZvY3VzZWRPcHRpb25FbC5wcmV2aW91c1NpYmxpbmc7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGhpZ2hsaWdodE9wdGlvbihjb21ib0JveEVsLCBuZXh0T3B0aW9uRWwpO1xuXG4gIGlmIChsaXN0U2hvd24pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgaWYgKCFuZXh0T3B0aW9uRWwpIHtcbiAgICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgbGlzdCBvcHRpb24gb24gdGhlIG1vdXNlb3ZlciBldmVudC5cbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZW92ZXIgZXZlbnRcbiAqIEBwYXJhbSB7SFRNTExJRWxlbWVudH0gbGlzdE9wdGlvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChsaXN0T3B0aW9uRWwpID0+IHtcbiAgY29uc3QgaXNDdXJyZW50bHlGb2N1c2VkID0gbGlzdE9wdGlvbkVsLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTXG4gICk7XG5cbiAgaWYgKGlzQ3VycmVudGx5Rm9jdXNlZCkgcmV0dXJuO1xuXG4gIGhpZ2hsaWdodE9wdGlvbihsaXN0T3B0aW9uRWwsIGxpc3RPcHRpb25FbCwge1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWUsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgdGhlIGxpc3Qgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChsaXN0RWwuaGlkZGVuKSB7XG4gICAgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cblxuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVDbGlja0Zyb21JbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9XG59O1xuXG5jb25zdCBjb21ib0JveCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaGFuZGxlQ2xpY2tGcm9tSW5wdXQodGhpcyk7XG4gICAgICB9LFxuICAgICAgW1RPR0dMRV9MSVNUX0JVVFRPTl0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRvZ2dsZUxpc3QodGhpcyk7XG4gICAgICB9LFxuICAgICAgW0xJU1RfT1BUSU9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgc2VsZWN0SXRlbSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbQ0xFQVJfSU5QVVRfQlVUVE9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgY2xlYXJJbnB1dCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW0NPTUJPX0JPWF0oZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgcmVzZXRTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgaGlkZUxpc3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbQ09NQk9fQk9YXToga2V5bWFwKHtcbiAgICAgICAgRXNjYXBlOiBoYW5kbGVFc2NhcGUsXG4gICAgICB9KSxcbiAgICAgIFtJTlBVVF06IGtleW1hcCh7XG4gICAgICAgIEVudGVyOiBoYW5kbGVFbnRlckZyb21JbnB1dCxcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgICBEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgfSksXG4gICAgICBbTElTVF9PUFRJT05dOiBrZXltYXAoe1xuICAgICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21MaXN0T3B0aW9uLFxuICAgICAgICBVcDogaGFuZGxlVXBGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIERvd246IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbixcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFRhYjogaGFuZGxlVGFiRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFwiU2hpZnQrVGFiXCI6IG5vb3AsXG4gICAgICB9KSxcbiAgICB9LFxuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICBjb25zdCBjb21ib0JveEVsID0gdGhpcy5jbG9zZXN0KENPTUJPX0JPWCk7XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LnJlbW92ZShDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICBkaXNwbGF5TGlzdCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VzZW92ZXI6IHtcbiAgICAgIFtMSVNUX09QVElPTl0oKSB7XG4gICAgICAgIGhhbmRsZU1vdXNlb3Zlcih0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKENPTUJPX0JPWCwgcm9vdCkuZm9yRWFjaCgoY29tYm9Cb3hFbCkgPT4ge1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3goY29tYm9Cb3hFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbWJvQm94Q29udGV4dCxcbiAgICBlbmhhbmNlQ29tYm9Cb3gsXG4gICAgZ2VuZXJhdGVEeW5hbWljUmVnRXhwLFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICAgIGRpc3BsYXlMaXN0LFxuICAgIGhpZGVMaXN0LFxuICAgIENPTUJPX0JPWF9DTEFTUyxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21ib0JveDtcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYWN0aXZlLWVsZW1lbnRcIik7XG5jb25zdCBpc0lvc0RldmljZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pb3MtZGV2aWNlXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcGlja2VyYDtcbmNvbnN0IERBVEVfUElDS0VSX1dSQVBQRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU30tLWluaXRpYWxpemVkYDtcbmNvbnN0IERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfS0tYWN0aXZlYDtcbmNvbnN0IERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19pbnRlcm5hbC1pbnB1dGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fZXh0ZXJuYWwtaW5wdXRgO1xuY29uc3QgREFURV9QSUNLRVJfQlVUVE9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19idXR0b25gO1xuY29uc3QgREFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2NhbGVuZGFyYDtcbmNvbnN0IERBVEVfUElDS0VSX1NUQVRVU19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fc3RhdHVzYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGVgO1xuXG5jb25zdCBDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUFJFVklPVVNfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcHJldmlvdXMtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLWN1cnJlbnQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLW5leHQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGVgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9UT0RBWV9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS10b2RheWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZS1zdGFydGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfRU5EX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGUtZW5kYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXdpdGhpbi1yYW5nZWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy15ZWFyYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQteWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtc2VsZWN0aW9uYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXNlbGVjdGlvbmA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9feWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfWUVBUl9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGUtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXBpY2tlcmA7XG5jb25zdCBDQUxFTkRBUl9UQUJMRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fdGFibGVgO1xuY29uc3QgQ0FMRU5EQVJfUk9XX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19yb3dgO1xuY29uc3QgQ0FMRU5EQVJfQ0VMTF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fY2VsbGA7XG5jb25zdCBDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTUyA9IGAke0NBTEVOREFSX0NFTExfQ0xBU1N9LS1jZW50ZXItaXRlbXNgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfTEFCRUxfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoLWxhYmVsYDtcbmNvbnN0IENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19kYXktb2Ytd2Vla2A7XG5cbmNvbnN0IERBVEVfUElDS0VSID0gYC4ke0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9CVVRUT04gPSBgLiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVCA9IGAuJHtEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVF9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVQgPSBgLiR7REFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0NBTEVOREFSID0gYC4ke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9TVEFUVVMgPSBgLiR7REFURV9QSUNLRVJfU1RBVFVTX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFID0gYC4ke0NBTEVOREFSX0RBVEVfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USCA9IGAuJHtDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVIgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEggPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUiA9IGAuJHtDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfTU9OVEggPSBgLiR7Q0FMRU5EQVJfTkVYVF9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT04gPSBgLiR7Q0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTiA9IGAuJHtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIID0gYC4ke0NBTEVOREFSX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSID0gYC4ke0NBTEVOREFSX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTksgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LID0gYC4ke0NBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSID0gYC4ke0NBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9GT0NVU0VEID0gYC4ke0NBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1N9YDtcblxuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlXCI7XG5cbmNvbnN0IE1PTlRIX0xBQkVMUyA9IFtcbiAgXCJKYW51YXJ5XCIsXG4gIFwiRmVicnVhcnlcIixcbiAgXCJNYXJjaFwiLFxuICBcIkFwcmlsXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuZVwiLFxuICBcIkp1bHlcIixcbiAgXCJBdWd1c3RcIixcbiAgXCJTZXB0ZW1iZXJcIixcbiAgXCJPY3RvYmVyXCIsXG4gIFwiTm92ZW1iZXJcIixcbiAgXCJEZWNlbWJlclwiLFxuXTtcblxuY29uc3QgREFZX09GX1dFRUtfTEFCRUxTID0gW1xuICBcIlN1bmRheVwiLFxuICBcIk1vbmRheVwiLFxuICBcIlR1ZXNkYXlcIixcbiAgXCJXZWRuZXNkYXlcIixcbiAgXCJUaHVyc2RheVwiLFxuICBcIkZyaWRheVwiLFxuICBcIlNhdHVyZGF5XCIsXG5dO1xuXG5jb25zdCBFTlRFUl9LRVlDT0RFID0gMTM7XG5cbmNvbnN0IFlFQVJfQ0hVTksgPSAxMjtcblxuY29uc3QgREVGQVVMVF9NSU5fREFURSA9IFwiMDAwMC0wMS0wMVwiO1xuY29uc3QgREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCA9IFwiTU0vREQvWVlZWVwiO1xuY29uc3QgSU5URVJOQUxfREFURV9GT1JNQVQgPSBcIllZWVktTU0tRERcIjtcblxuY29uc3QgTk9UX0RJU0FCTEVEX1NFTEVDVE9SID0gXCI6bm90KFtkaXNhYmxlZF0pXCI7XG5cbmNvbnN0IHByb2Nlc3NGb2N1c2FibGVTZWxlY3RvcnMgPSAoLi4uc2VsZWN0b3JzKSA9PlxuICBzZWxlY3RvcnMubWFwKChxdWVyeSkgPT4gcXVlcnkgKyBOT1RfRElTQUJMRURfU0VMRUNUT1IpLmpvaW4oXCIsIFwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUixcbiAgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEgsXG4gIENBTEVOREFSX1lFQVJfU0VMRUNUSU9OLFxuICBDQUxFTkRBUl9NT05USF9TRUxFQ1RJT04sXG4gIENBTEVOREFSX05FWFRfWUVBUixcbiAgQ0FMRU5EQVJfTkVYVF9NT05USCxcbiAgQ0FMRU5EQVJfREFURV9GT0NVU0VEXG4pO1xuXG5jb25zdCBNT05USF9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRFxuKTtcblxuY29uc3QgWUVBUl9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyxcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LLFxuICBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURcbik7XG5cbi8vICNyZWdpb24gRGF0ZSBNYW5pcHVsYXRpb24gRnVuY3Rpb25zXG5cbi8qKlxuICogS2VlcCBkYXRlIHdpdGhpbiBtb250aC4gTW9udGggd291bGQgb25seSBiZSBvdmVyIGJ5IDEgdG8gMyBkYXlzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9DaGVjayB0aGUgZGF0ZSBvYmplY3QgdG8gY2hlY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgY29ycmVjdCBtb250aFxuICogQHJldHVybnMge0RhdGV9IHRoZSBkYXRlLCBjb3JyZWN0ZWQgaWYgbmVlZGVkXG4gKi9cbmNvbnN0IGtlZXBEYXRlV2l0aGluTW9udGggPSAoZGF0ZVRvQ2hlY2ssIG1vbnRoKSA9PiB7XG4gIGlmIChtb250aCAhPT0gZGF0ZVRvQ2hlY2suZ2V0TW9udGgoKSkge1xuICAgIGRhdGVUb0NoZWNrLnNldERhdGUoMCk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRvQ2hlY2s7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIGZyb20gbW9udGggZGF5IHllYXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgbW9udGggdG8gc2V0ICh6ZXJvLWluZGV4ZWQpXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc2V0IGRhdGVcbiAqL1xuY29uc3Qgc2V0RGF0ZSA9ICh5ZWFyLCBtb250aCwgZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIGRhdGUpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogdG9kYXlzIGRhdGVcbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdG9kYXlzIGRhdGVcbiAqL1xuY29uc3QgdG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkYXkgPSBuZXdEYXRlLmdldERhdGUoKTtcbiAgY29uc3QgbW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IHllYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBzZXREYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIGxhc3QgZGF5IG9mIHRoZSBtb250aFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGxhc3REYXlPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBBZGQgZGF5cyB0byBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGREYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuICBuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IGRheXMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJEYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiBhZGREYXlzKF9kYXRlLCAtbnVtRGF5cyk7XG5cbi8qKlxuICogQWRkIHdlZWtzIHRvIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkV2Vla3MgPSAoX2RhdGUsIG51bVdlZWtzKSA9PiBhZGREYXlzKF9kYXRlLCBudW1XZWVrcyAqIDcpO1xuXG4vKipcbiAqIFN1YnRyYWN0IHdlZWtzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJXZWVrcyA9IChfZGF0ZSwgbnVtV2Vla3MpID0+IGFkZFdlZWtzKF9kYXRlLCAtbnVtV2Vla3MpO1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUgd2VlayAoU3VuZGF5KVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZldlZWsgPSAoX2RhdGUpID0+IHtcbiAgY29uc3QgZGF5T2ZXZWVrID0gX2RhdGUuZ2V0RGF5KCk7XG4gIHJldHVybiBzdWJEYXlzKF9kYXRlLCBkYXlPZldlZWspO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIChTYXR1cmRheSlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgZW5kT2ZXZWVrID0gKF9kYXRlKSA9PiB7XG4gIGNvbnN0IGRheU9mV2VlayA9IF9kYXRlLmdldERheSgpO1xuICByZXR1cm4gYWRkRGF5cyhfZGF0ZSwgNiAtIGRheU9mV2Vlayk7XG59O1xuXG4vKipcbiAqIEFkZCBtb250aHMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtTW9udGhzIHRoZSBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZE1vbnRocyA9IChfZGF0ZSwgbnVtTW9udGhzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IGRhdGVNb250aCA9IChuZXdEYXRlLmdldE1vbnRoKCkgKyAxMiArIG51bU1vbnRocykgJSAxMjtcbiAgbmV3RGF0ZS5zZXRNb250aChuZXdEYXRlLmdldE1vbnRoKCkgKyBudW1Nb250aHMpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIGRhdGVNb250aCk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IG1vbnRocyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bU1vbnRocyB0aGUgZGlmZmVyZW5jZSBpbiBtb250aHNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJNb250aHMgPSAoX2RhdGUsIG51bU1vbnRocykgPT4gYWRkTW9udGhzKF9kYXRlLCAtbnVtTW9udGhzKTtcblxuLyoqXG4gKiBBZGQgeWVhcnMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtWWVhcnMgdGhlIGRpZmZlcmVuY2UgaW4geWVhcnNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRZZWFycyA9IChfZGF0ZSwgbnVtWWVhcnMpID0+IGFkZE1vbnRocyhfZGF0ZSwgbnVtWWVhcnMgKiAxMik7XG5cbi8qKlxuICogU3VidHJhY3QgeWVhcnMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1ZZWFycyB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YlllYXJzID0gKF9kYXRlLCBudW1ZZWFycykgPT4gYWRkWWVhcnMoX2RhdGUsIC1udW1ZZWFycyk7XG5cbi8qKlxuICogU2V0IG1vbnRocyBvZiBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB6ZXJvLWluZGV4ZWQgbW9udGggdG8gc2V0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc2V0TW9udGggPSAoX2RhdGUsIG1vbnRoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIG5ld0RhdGUuc2V0TW9udGgobW9udGgpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU2V0IHllYXIgb2YgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzZXRZZWFyID0gKF9kYXRlLCB5ZWFyKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IG1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKHllYXIpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBlYXJsaWVzdCBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVhcmxpZXN0IGRhdGVcbiAqL1xuY29uc3QgbWluID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGVBO1xuXG4gIGlmIChkYXRlQiA8IGRhdGVBKSB7XG4gICAgbmV3RGF0ZSA9IGRhdGVCO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXRlc3QgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXRlc3QgZGF0ZVxuICovXG5jb25zdCBtYXggPSAoZGF0ZUEsIGRhdGVCKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZUE7XG5cbiAgaWYgKGRhdGVCID4gZGF0ZUEpIHtcbiAgICBuZXdEYXRlID0gZGF0ZUI7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIGluIHRoZSBzYW1lIHllYXJcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgaW4gdGhlIHNhbWUgeWVhclxuICovXG5jb25zdCBpc1NhbWVZZWFyID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgZGF0ZUEgJiYgZGF0ZUIgJiYgZGF0ZUEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZUIuZ2V0RnVsbFllYXIoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIGluIHRoZSBzYW1lIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIGluIHRoZSBzYW1lIG1vbnRoXG4gKi9cbmNvbnN0IGlzU2FtZU1vbnRoID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgaXNTYW1lWWVhcihkYXRlQSwgZGF0ZUIpICYmIGRhdGVBLmdldE1vbnRoKCkgPT09IGRhdGVCLmdldE1vbnRoKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgYXJlIHRoZSBzYW1lIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIHRoZSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgdGhlIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyB0aGUgc2FtZSBkYXRlXG4gKi9cbmNvbnN0IGlzU2FtZURheSA9IChkYXRlQSwgZGF0ZUIpID0+XG4gIGlzU2FtZU1vbnRoKGRhdGVBLCBkYXRlQikgJiYgZGF0ZUEuZ2V0RGF0ZSgpID09PSBkYXRlQi5nZXREYXRlKCk7XG5cbi8qKlxuICogcmV0dXJuIGEgbmV3IGRhdGUgd2l0aGluIG1pbmltdW0gYW5kIG1heGltdW0gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heFxuICovXG5jb25zdCBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGU7XG5cbiAgaWYgKGRhdGUgPCBtaW5EYXRlKSB7XG4gICAgbmV3RGF0ZSA9IG1pbkRhdGU7XG4gIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBkYXRlID4gbWF4RGF0ZSkge1xuICAgIG5ld0RhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZXJlIGEgZGF5IHdpdGhpbiB0aGUgbW9udGggd2l0aGluIG1pbiBhbmQgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZVdpdGhpbk1pbkFuZE1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBkYXRlID49IG1pbkRhdGUgJiYgKCFtYXhEYXRlIHx8IGRhdGUgPD0gbWF4RGF0ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgbW9udGggaXMgaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlIG1vbnRoIG91dHNpZGUgbWluIG9yIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVzTW9udGhPdXRzaWRlTWluT3JNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT5cbiAgbGFzdERheU9mTW9udGgoZGF0ZSkgPCBtaW5EYXRlIHx8IChtYXhEYXRlICYmIHN0YXJ0T2ZNb250aChkYXRlKSA+IG1heERhdGUpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIHllYXIgaXMgaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlIG1vbnRoIG91dHNpZGUgbWluIG9yIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBsYXN0RGF5T2ZNb250aChzZXRNb250aChkYXRlLCAxMSkpIDwgbWluRGF0ZSB8fFxuICAobWF4RGF0ZSAmJiBzdGFydE9mTW9udGgoc2V0TW9udGgoZGF0ZSwgMCkpID4gbWF4RGF0ZSk7XG5cbi8qKlxuICogUGFyc2UgYSBkYXRlIHdpdGggZm9ybWF0IE0tRC1ZWVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RyaW5nIHRoZSBkYXRlIHN0cmluZyB0byBwYXJzZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRqdXN0RGF0ZSBzaG91bGQgdGhlIGRhdGUgYmUgYWRqdXN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGVcbiAqL1xuY29uc3QgcGFyc2VEYXRlU3RyaW5nID0gKFxuICBkYXRlU3RyaW5nLFxuICBkYXRlRm9ybWF0ID0gSU5URVJOQUxfREFURV9GT1JNQVQsXG4gIGFkanVzdERhdGUgPSBmYWxzZVxuKSA9PiB7XG4gIGxldCBkYXRlO1xuICBsZXQgbW9udGg7XG4gIGxldCBkYXk7XG4gIGxldCB5ZWFyO1xuICBsZXQgcGFyc2VkO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgbGV0IG1vbnRoU3RyO1xuICAgIGxldCBkYXlTdHI7XG4gICAgbGV0IHllYXJTdHI7XG5cbiAgICBpZiAoZGF0ZUZvcm1hdCA9PT0gREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCkge1xuICAgICAgW21vbnRoU3RyLCBkYXlTdHIsIHllYXJTdHJdID0gZGF0ZVN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFt5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyXSA9IGRhdGVTdHJpbmcuc3BsaXQoXCItXCIpO1xuICAgIH1cblxuICAgIGlmICh5ZWFyU3RyKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludCh5ZWFyU3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIHllYXIgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgeWVhciA9IE1hdGgubWF4KDAsIHllYXIpO1xuICAgICAgICAgIGlmICh5ZWFyU3RyLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdG9kYXkoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFllYXJTdHViID1cbiAgICAgICAgICAgICAgY3VycmVudFllYXIgLSAoY3VycmVudFllYXIgJSAxMCAqKiB5ZWFyU3RyLmxlbmd0aCk7XG4gICAgICAgICAgICB5ZWFyID0gY3VycmVudFllYXJTdHViICsgcGFyc2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aFN0cikge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQobW9udGhTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgbW9udGggPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1heCgxLCBtb250aCk7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1pbigxMiwgbW9udGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoICYmIGRheVN0ciAmJiB5ZWFyICE9IG51bGwpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KGRheVN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICBkYXkgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgY29uc3QgbGFzdERheU9mVGhlTW9udGggPSBzZXREYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XG4gICAgICAgICAgZGF5ID0gTWF0aC5tYXgoMSwgZGF5KTtcbiAgICAgICAgICBkYXkgPSBNYXRoLm1pbihsYXN0RGF5T2ZUaGVNb250aCwgZGF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBkYXRlID0gc2V0RGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGU7XG59O1xuXG4vKipcbiAqIEZvcm1hdCBhIGRhdGUgdG8gZm9ybWF0IE1NLURELVlZWVlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICovXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGUsIGRhdGVGb3JtYXQgPSBJTlRFUk5BTF9EQVRFX0ZPUk1BVCkgPT4ge1xuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChkYXRlRm9ybWF0ID09PSBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKSB7XG4gICAgcmV0dXJuIFtwYWRaZXJvcyhtb250aCwgMiksIHBhZFplcm9zKGRheSwgMiksIHBhZFplcm9zKHllYXIsIDQpXS5qb2luKFwiL1wiKTtcbiAgfVxuXG4gIHJldHVybiBbcGFkWmVyb3MoeWVhciwgNCksIHBhZFplcm9zKG1vbnRoLCAyKSwgcGFkWmVyb3MoZGF5LCAyKV0uam9pbihcIi1cIik7XG59O1xuXG4vLyAjZW5kcmVnaW9uIERhdGUgTWFuaXB1bGF0aW9uIEZ1bmN0aW9uc1xuXG4vKipcbiAqIENyZWF0ZSBhIGdyaWQgc3RyaW5nIGZyb20gYW4gYXJyYXkgb2YgaHRtbCBzdHJpbmdzXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gaHRtbEFycmF5IHRoZSBhcnJheSBvZiBodG1sIGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gcm93U2l6ZSB0aGUgbGVuZ3RoIG9mIGEgcm93XG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZ3JpZCBzdHJpbmdcbiAqL1xuY29uc3QgbGlzdFRvR3JpZEh0bWwgPSAoaHRtbEFycmF5LCByb3dTaXplKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgbGV0IHJvdyA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoKSB7XG4gICAgcm93ID0gW107XG5cbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB3aGlsZSAoaSA8IGh0bWxBcnJheS5sZW5ndGggJiYgcm93Lmxlbmd0aCA8IHJvd1NpemUpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGh0bWxBcnJheVtpXSk7XG4gICAgICByb3cucHVzaCh0ZCk7XG4gICAgICBpICs9IDE7XG4gICAgfVxuXG4gICAgcm93LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIHRyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGdyaWQucHVzaCh0cik7XG4gIH1cblxuICByZXR1cm4gZ3JpZDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlQm9keSA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgdGFibGVCb2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRhYmxlQm9keTtcbn07XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGRhdGUgcGlja2VyLlxuICogQHR5cGVkZWYge09iamVjdH0gRGF0ZVBpY2tlckNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGNhbGVuZGFyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGVQaWNrZXJFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnRlcm5hbElucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gZXh0ZXJuYWxJbnB1dEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZmlyc3RZZWFyQ2h1bmtFbFxuICogQHByb3BlcnR5IHtEYXRlfSBjYWxlbmRhckRhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gbWluRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBtYXhEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHNlbGVjdGVkRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSByYW5nZURhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gZGVmYXVsdERhdGVcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKiBAcmV0dXJucyB7RGF0ZVBpY2tlckNvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldERhdGVQaWNrZXJDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9QSUNLRVIpO1xuXG4gIGlmICghZGF0ZVBpY2tlckVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEQVRFX1BJQ0tFUn1gKTtcbiAgfVxuXG4gIGNvbnN0IGludGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUXG4gICk7XG4gIGNvbnN0IGV4dGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXG4gICk7XG4gIGNvbnN0IGNhbGVuZGFyRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9DQUxFTkRBUik7XG4gIGNvbnN0IHRvZ2dsZUJ0bkVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoREFURV9QSUNLRVJfQlVUVE9OKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9TVEFUVVMpO1xuICBjb25zdCBmaXJzdFllYXJDaHVua0VsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUik7XG5cbiAgY29uc3QgaW5wdXREYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGV4dGVybmFsSW5wdXRFbC52YWx1ZSxcbiAgICBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFULFxuICAgIHRydWVcbiAgKTtcbiAgY29uc3Qgc2VsZWN0ZWREYXRlID0gcGFyc2VEYXRlU3RyaW5nKGludGVybmFsSW5wdXRFbC52YWx1ZSk7XG5cbiAgY29uc3QgY2FsZW5kYXJEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGNhbGVuZGFyRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNvbnN0IG1pbkRhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSk7XG4gIGNvbnN0IG1heERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSk7XG4gIGNvbnN0IHJhbmdlRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5yYW5nZURhdGUpO1xuICBjb25zdCBkZWZhdWx0RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSk7XG5cbiAgaWYgKG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBtaW5EYXRlID4gbWF4RGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmltdW0gZGF0ZSBjYW5ub3QgYmUgYWZ0ZXIgbWF4aW11bSBkYXRlXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYWxlbmRhckRhdGUsXG4gICAgbWluRGF0ZSxcbiAgICB0b2dnbGVCdG5FbCxcbiAgICBzZWxlY3RlZERhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBmaXJzdFllYXJDaHVua0VsLFxuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBpbnB1dERhdGUsXG4gICAgaW50ZXJuYWxJbnB1dEVsLFxuICAgIGV4dGVybmFsSW5wdXRFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHJhbmdlRGF0ZSxcbiAgICBkZWZhdWx0RGF0ZSxcbiAgICBzdGF0dXNFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZXh0ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgdG9nZ2xlQnRuRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICB0b2dnbGVCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBleHRlcm5hbElucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbi8vICNyZWdpb24gVmFsaWRhdGlvblxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgYXMgYSB2YWxpZCBkYXRlIG9mIGZvcm1hdCBNL0QvWVlZWVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaXNEYXRlSW5wdXRJbnZhbGlkID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3QgZGF0ZVN0cmluZyA9IGV4dGVybmFsSW5wdXRFbC52YWx1ZTtcbiAgbGV0IGlzSW52YWxpZCA9IGZhbHNlO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgaXNJbnZhbGlkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGRhdGVTdHJpbmdQYXJ0cyA9IGRhdGVTdHJpbmcuc3BsaXQoXCIvXCIpO1xuICAgIGNvbnN0IFttb250aCwgZGF5LCB5ZWFyXSA9IGRhdGVTdHJpbmdQYXJ0cy5tYXAoKHN0cikgPT4ge1xuICAgICAgbGV0IHZhbHVlO1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB2YWx1ZSA9IHBhcnNlZDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaGVja0RhdGUgPSBzZXREYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcblxuICAgICAgaWYgKFxuICAgICAgICBjaGVja0RhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGggLSAxICYmXG4gICAgICAgIGNoZWNrRGF0ZS5nZXREYXRlKCkgPT09IGRheSAmJlxuICAgICAgICBjaGVja0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJlxuICAgICAgICBkYXRlU3RyaW5nUGFydHNbMl0ubGVuZ3RoID09PSA0ICYmXG4gICAgICAgIGlzRGF0ZVdpdGhpbk1pbkFuZE1heChjaGVja0RhdGUsIG1pbkRhdGUsIG1heERhdGUpXG4gICAgICApIHtcbiAgICAgICAgaXNJbnZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzSW52YWxpZDtcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGRhdGUgb2YgZm9ybWF0IE0vRC9ZWVlZXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB2YWxpZGF0ZURhdGVJbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBpc0ludmFsaWQgPSBpc0RhdGVJbnB1dEludmFsaWQoZXh0ZXJuYWxJbnB1dEVsKTtcblxuICBpZiAoaXNJbnZhbGlkICYmICFleHRlcm5hbElucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBleHRlcm5hbElucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNJbnZhbGlkICYmIGV4dGVybmFsSW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgZXh0ZXJuYWxJbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIFZhbGlkYXRpb25cblxuLyoqXG4gKiBFbmFibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgcmVjb25jaWxlSW5wdXRWYWx1ZXMgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwsIGlucHV0RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBsZXQgbmV3VmFsdWUgPSBcIlwiO1xuXG4gIGlmIChpbnB1dERhdGUgJiYgIWlzRGF0ZUlucHV0SW52YWxpZChlbCkpIHtcbiAgICBuZXdWYWx1ZSA9IGZvcm1hdERhdGUoaW5wdXREYXRlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgbmV3VmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgdmFsdWUgb2YgdGhlIGRhdGUgcGlja2VyIGlucHV0cy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0cmluZyBUaGUgZGF0ZSBzdHJpbmcgdG8gdXBkYXRlIGluIFlZWVktTU0tREQgZm9ybWF0XG4gKi9cbmNvbnN0IHNldENhbGVuZGFyVmFsdWUgPSAoZWwsIGRhdGVTdHJpbmcpID0+IHtcbiAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nKTtcblxuICBpZiAocGFyc2VkRGF0ZSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKHBhcnNlZERhdGUsIERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpO1xuXG4gICAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGludGVybmFsSW5wdXRFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPVxuICAgICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgZGF0ZVN0cmluZyk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGV4dGVybmFsSW5wdXRFbCwgZm9ybWF0dGVkRGF0ZSk7XG5cbiAgICB2YWxpZGF0ZURhdGVJbnB1dChkYXRlUGlja2VyRWwpO1xuICB9XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5oYW5jZURhdGVQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1BJQ0tFUik7XG4gIGNvbnN0IHsgZGVmYXVsdFZhbHVlIH0gPSBkYXRlUGlja2VyRWwuZGF0YXNldDtcblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihgaW5wdXRgKTtcblxuICBpZiAoIWludGVybmFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtEQVRFX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC52YWx1ZSkge1xuICAgIGludGVybmFsSW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1pblwiKVxuICApO1xuICBkYXRlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlID0gbWluRGF0ZVxuICAgID8gZm9ybWF0RGF0ZShtaW5EYXRlKVxuICAgIDogREVGQVVMVF9NSU5fREFURTtcblxuICBjb25zdCBtYXhEYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heFwiKVxuICApO1xuICBpZiAobWF4RGF0ZSkge1xuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgPSBmb3JtYXREYXRlKG1heERhdGUpO1xuICB9XG5cbiAgY29uc3QgY2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyk7XG5cbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gaW50ZXJuYWxJbnB1dEVsLmNsb25lTm9kZSgpO1xuICBleHRlcm5hbElucHV0RWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyk7XG4gIGV4dGVybmFsSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XG5cbiAgY2FsZW5kYXJXcmFwcGVyLmFwcGVuZENoaWxkKGV4dGVybmFsSW5wdXRFbCk7XG4gIGNhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfVwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBjYWxlbmRhclwiPjwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCIke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGhpZGRlbj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidXNhLXNyLW9ubHkgJHtEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1N9XCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPjwvZGl2PmBcbiAgKTtcblxuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaW50ZXJuYWxJbnB1dEVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MpO1xuICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICBpbnRlcm5hbElucHV0RWwucmVxdWlyZWQgPSBmYWxzZTtcblxuICBkYXRlUGlja2VyRWwuYXBwZW5kQ2hpbGQoY2FsZW5kYXJXcmFwcGVyKTtcbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MpO1xuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBzZXRDYWxlbmRhclZhbHVlKGRhdGVQaWNrZXJFbCwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGRhdGVQaWNrZXJFbCk7XG4gICAgaW50ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBEYXRlIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogcmVuZGVyIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlVG9EaXNwbGF5IGEgZGF0ZSB0byByZW5kZXIgb24gdGhlIGNhbGVuZGFyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IGEgcmVmZXJlbmNlIHRvIHRoZSBuZXcgY2FsZW5kYXIgZWxlbWVudFxuICovXG5jb25zdCByZW5kZXJDYWxlbmRhciA9IChlbCwgX2RhdGVUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3Qge1xuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHN0YXR1c0VsLFxuICAgIHNlbGVjdGVkRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgcmFuZ2VEYXRlLFxuICB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB0b2RheXNEYXRlID0gdG9kYXkoKTtcbiAgbGV0IGRhdGVUb0Rpc3BsYXkgPSBfZGF0ZVRvRGlzcGxheSB8fCB0b2RheXNEYXRlO1xuXG4gIGNvbnN0IGNhbGVuZGFyV2FzSGlkZGVuID0gY2FsZW5kYXJFbC5oaWRkZW47XG5cbiAgY29uc3QgZm9jdXNlZERhdGUgPSBhZGREYXlzKGRhdGVUb0Rpc3BsYXksIDApO1xuICBjb25zdCBmb2N1c2VkTW9udGggPSBkYXRlVG9EaXNwbGF5LmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0gZGF0ZVRvRGlzcGxheS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IHByZXZNb250aCA9IHN1Yk1vbnRocyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRhdGVUb0Rpc3BsYXksIDEpO1xuXG4gIGNvbnN0IGN1cnJlbnRGb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShkYXRlVG9EaXNwbGF5KTtcblxuICBjb25zdCBmaXJzdE9mTW9udGggPSBzdGFydE9mTW9udGgoZGF0ZVRvRGlzcGxheSk7XG4gIGNvbnN0IHByZXZCdXR0b25zRGlzYWJsZWQgPSBpc1NhbWVNb250aChkYXRlVG9EaXNwbGF5LCBtaW5EYXRlKTtcbiAgY29uc3QgbmV4dEJ1dHRvbnNEaXNhYmxlZCA9IGlzU2FtZU1vbnRoKGRhdGVUb0Rpc3BsYXksIG1heERhdGUpO1xuXG4gIGNvbnN0IHJhbmdlQ29uY2x1c2lvbkRhdGUgPSBzZWxlY3RlZERhdGUgfHwgZGF0ZVRvRGlzcGxheTtcbiAgY29uc3QgcmFuZ2VTdGFydERhdGUgPSByYW5nZURhdGUgJiYgbWluKHJhbmdlQ29uY2x1c2lvbkRhdGUsIHJhbmdlRGF0ZSk7XG4gIGNvbnN0IHJhbmdlRW5kRGF0ZSA9IHJhbmdlRGF0ZSAmJiBtYXgocmFuZ2VDb25jbHVzaW9uRGF0ZSwgcmFuZ2VEYXRlKTtcblxuICBjb25zdCB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRGF0ZSAmJiBhZGREYXlzKHJhbmdlU3RhcnREYXRlLCAxKTtcbiAgY29uc3Qgd2l0aGluUmFuZ2VFbmREYXRlID0gcmFuZ2VEYXRlICYmIHN1YkRheXMocmFuZ2VFbmREYXRlLCAxKTtcblxuICBjb25zdCBtb250aExhYmVsID0gTU9OVEhfTEFCRUxTW2ZvY3VzZWRNb250aF07XG5cbiAgY29uc3QgZ2VuZXJhdGVEYXRlSHRtbCA9IChkYXRlVG9SZW5kZXIpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX0RBVEVfQ0xBU1NdO1xuICAgIGNvbnN0IGRheSA9IGRhdGVUb1JlbmRlci5nZXREYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlVG9SZW5kZXIuZ2V0TW9udGgoKTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZVRvUmVuZGVyLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZVRvUmVuZGVyLmdldERheSgpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUoZGF0ZVRvUmVuZGVyKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSAhaXNEYXRlV2l0aGluTWluQW5kTWF4KGRhdGVUb1JlbmRlciwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHNlbGVjdGVkRGF0ZSk7XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBwcmV2TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9QUkVWSU9VU19NT05USF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZU1vbnRoKGRhdGVUb1JlbmRlciwgZm9jdXNlZERhdGUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBuZXh0TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCB0b2RheXNEYXRlKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfVE9EQVlfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChyYW5nZURhdGUpIHtcbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZURhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VTdGFydERhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VFbmREYXRlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0VORF9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaXNEYXRlV2l0aGluTWluQW5kTWF4KFxuICAgICAgICAgIGRhdGVUb1JlbmRlcixcbiAgICAgICAgICB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSxcbiAgICAgICAgICB3aXRoaW5SYW5nZUVuZERhdGVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIGZvY3VzZWREYXRlKSkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoU3RyID0gTU9OVEhfTEFCRUxTW21vbnRoXTtcbiAgICBjb25zdCBkYXlTdHIgPSBEQVlfT0ZfV0VFS19MQUJFTFNbZGF5T2ZXZWVrXTtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtZGF5XCIsIGRheSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbW9udGhcIiwgbW9udGggKyAxKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS15ZWFyXCIsIHllYXIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGZvcm1hdHRlZERhdGUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYCR7ZGF5fSAke21vbnRoU3RyfSAke3llYXJ9ICR7ZGF5U3RyfWBcbiAgICApO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IGRheTtcblxuICAgIHJldHVybiBidG47XG4gIH07XG5cbiAgLy8gc2V0IGRhdGUgdG8gZmlyc3QgcmVuZGVyZWQgZGF5XG4gIGRhdGVUb0Rpc3BsYXkgPSBzdGFydE9mV2VlayhmaXJzdE9mTW9udGgpO1xuXG4gIGNvbnN0IGRheXMgPSBbXTtcblxuICB3aGlsZSAoXG4gICAgZGF5cy5sZW5ndGggPCAyOCB8fFxuICAgIGRhdGVUb0Rpc3BsYXkuZ2V0TW9udGgoKSA9PT0gZm9jdXNlZE1vbnRoIHx8XG4gICAgZGF5cy5sZW5ndGggJSA3ICE9PSAwXG4gICkge1xuICAgIGRheXMucHVzaChnZW5lcmF0ZURhdGVIdG1sKGRhdGVUb0Rpc3BsYXkpKTtcbiAgICBkYXRlVG9EaXNwbGF5ID0gYWRkRGF5cyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKGRheXMsIDcpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuZGF0YXNldC52YWx1ZSA9IGN1cnJlbnRGb3JtYXR0ZWREYXRlO1xuICBuZXdDYWxlbmRhci5zdHlsZS50b3AgPSBgJHtkYXRlUGlja2VyRWwub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgbmV3Q2FsZW5kYXIuaGlkZGVuID0gZmFsc2U7XG4gIG5ld0NhbGVuZGFyLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX1JPV19DTEFTU31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgYmFjayBvbmUgeWVhclwiXG4gICAgICAgICAgICAke3ByZXZCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgb25lIG1vbnRoXCJcbiAgICAgICAgICAgICR7cHJldkJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX01PTlRIX0xBQkVMX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiJHttb250aExhYmVsfS4gQ2xpY2sgdG8gc2VsZWN0IG1vbnRoXCJcbiAgICAgICAgICA+JHttb250aExhYmVsfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCIke2ZvY3VzZWRZZWFyfS4gQ2xpY2sgdG8gc2VsZWN0IHllYXJcIlxuICAgICAgICAgID4ke2ZvY3VzZWRZZWFyfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGhcIlxuICAgICAgICAgICAgJHtuZXh0QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhclwiXG4gICAgICAgICAgICAke25leHRCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgdGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICBjb25zdCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gIHRhYmxlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZUhlYWQpO1xuICBjb25zdCB0YWJsZUhlYWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlSGVhZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVIZWFkUm93KTtcblxuICBjb25zdCBkYXlzT2ZXZWVrID0ge1xuICAgIFN1bmRheTogXCJTXCIsXG4gICAgTW9uZGF5OiBcIk1cIixcbiAgICBUdWVzZGF5OiBcIlRcIixcbiAgICBXZWRuZXNkYXk6IFwiV1wiLFxuICAgIFRodXJzZGF5OiBcIlRoXCIsXG4gICAgRnJpZGF5OiBcIkZyXCIsXG4gICAgU2F0dXJkYXk6IFwiU1wiLFxuICB9O1xuXG4gIE9iamVjdC5rZXlzKGRheXNPZldlZWspLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcInByZXNlbnRhdGlvblwiKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGtleSk7XG4gICAgdGgudGV4dENvbnRlbnQgPSBkYXlzT2ZXZWVrW2tleV07XG4gICAgdGFibGVIZWFkUm93Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0aCk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShkYXRlc0dyaWQpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVCb2R5KTtcblxuICAvLyBDb250YWluZXIgZm9yIFllYXJzLCBNb250aHMsIGFuZCBEYXlzXG4gIGNvbnN0IGRhdGVQaWNrZXJDYWxlbmRhckNvbnRhaW5lciA9XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG5cbiAgZGF0ZVBpY2tlckNhbGVuZGFyQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZSk7XG5cbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTKTtcblxuICBjb25zdCBzdGF0dXNlcyA9IFtdO1xuXG4gIGlmIChpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICBzdGF0dXNlcy5wdXNoKFwiU2VsZWN0ZWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGlmIChjYWxlbmRhcldhc0hpZGRlbikge1xuICAgIHN0YXR1c2VzLnB1c2goXG4gICAgICBcIllvdSBjYW4gbmF2aWdhdGUgYnkgZGF5IHVzaW5nIGxlZnQgYW5kIHJpZ2h0IGFycm93c1wiLFxuICAgICAgXCJXZWVrcyBieSB1c2luZyB1cCBhbmQgZG93biBhcnJvd3NcIixcbiAgICAgIFwiTW9udGhzIGJ5IHVzaW5nIHBhZ2UgdXAgYW5kIHBhZ2UgZG93biBrZXlzXCIsXG4gICAgICBcIlllYXJzIGJ5IHVzaW5nIHNoaWZ0IHBsdXMgcGFnZSB1cCBhbmQgc2hpZnQgcGx1cyBwYWdlIGRvd25cIixcbiAgICAgIFwiSG9tZSBhbmQgZW5kIGtleXMgbmF2aWdhdGUgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgd2Vla1wiXG4gICAgKTtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzZXMucHVzaChgJHttb250aExhYmVsfSAke2ZvY3VzZWRZZWFyfWApO1xuICB9XG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gc3RhdHVzZXMuam9pbihcIi4gXCIpO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzWWVhciA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IHN1YlllYXJzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9QUkVWSU9VU19ZRUFSKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzTW9udGggPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBzdWJNb250aHMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRNb250aCA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IGFkZE1vbnRocyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9NT05USCk7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRZZWFyID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gYWRkWWVhcnMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX05FWFRfWUVBUik7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGlkZSB0aGUgY2FsZW5kYXIgb2YgYSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBoaWRlQ2FsZW5kYXIgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGNhbGVuZGFyRWwsIHN0YXR1c0VsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5yZW1vdmUoREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTKTtcbiAgY2FsZW5kYXJFbC5oaWRkZW4gPSB0cnVlO1xuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhIGRhdGUgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gY2FsZW5kYXJEYXRlRWwgQSBkYXRlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0RGF0ZSA9IChjYWxlbmRhckRhdGVFbCkgPT4ge1xuICBpZiAoY2FsZW5kYXJEYXRlRWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGNhbGVuZGFyRGF0ZUVsKTtcblxuICBzZXRDYWxlbmRhclZhbHVlKGNhbGVuZGFyRGF0ZUVsLCBjYWxlbmRhckRhdGVFbC5kYXRhc2V0LnZhbHVlKTtcbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG5cbiAgZXh0ZXJuYWxJbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVDYWxlbmRhciA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUsIGRlZmF1bHREYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBpZiAoY2FsZW5kYXJFbC5oaWRkZW4pIHtcbiAgICBjb25zdCBkYXRlVG9EaXNwbGF5ID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KFxuICAgICAgaW5wdXREYXRlIHx8IGRlZmF1bHREYXRlIHx8IHRvZGF5KCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlQ2FsZW5kYXIoZWwpO1xuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2FsZW5kYXIgd2hlbiB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICovXG5jb25zdCB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGlucHV0RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBjYWxlbmRhclNob3duID0gIWNhbGVuZGFyRWwuaGlkZGVuO1xuXG4gIGlmIChjYWxlbmRhclNob3duICYmIGlucHV0RGF0ZSkge1xuICAgIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIERhdGUgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG4vKipcbiAqIERpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlNb250aFNlbGVjdGlvbiA9IChlbCwgbW9udGhUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBzdGF0dXNFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gY2FsZW5kYXJEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRNb250aCA9IG1vbnRoVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZE1vbnRoIDogbW9udGhUb0Rpc3BsYXk7XG5cbiAgY29uc3QgbW9udGhzID0gTU9OVEhfTEFCRUxTLm1hcCgobW9udGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbW9udGhUb0NoZWNrID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBpbmRleCk7XG5cbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc01vbnRoT3V0c2lkZU1pbk9yTWF4KFxuICAgICAgbW9udGhUb0NoZWNrLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGVcbiAgICApO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtDQUxFTkRBUl9NT05USF9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZE1vbnRoO1xuXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2VkTW9udGgpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWxcIiwgbW9udGgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IG1vbnRoO1xuXG4gICAgcmV0dXJuIGJ0bjtcbiAgfSk7XG5cbiAgY29uc3QgbW9udGhzSHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1vbnRoc0h0bWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgbW9udGhzSHRtbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1MpO1xuXG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJwcmVzZW50YXRpb25cIik7XG5cbiAgY29uc3QgbW9udGhzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKG1vbnRocywgMyk7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShtb250aHNHcmlkKTtcbiAgdGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlQm9keSk7XG4gIG1vbnRoc0h0bWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlKTtcblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtb250aHNIdG1sKTtcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIG1vbnRoLlwiO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgbW9udGggaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBtb250aEVsIEFuIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0TW9udGggPSAobW9udGhFbCkgPT4ge1xuICBpZiAobW9udGhFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBsZXQgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRNb250aCk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogRGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGluIHRoZSBkYXRlIHBpY2tlci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge251bWJlcn0geWVhclRvRGlzcGxheSB5ZWFyIHRvIGRpc3BsYXkgaW4geWVhciBzZWxlY3Rpb25cbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlZZWFyU2VsZWN0aW9uID0gKGVsLCB5ZWFyVG9EaXNwbGF5KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgc3RhdHVzRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gY2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0geWVhclRvRGlzcGxheSA9PSBudWxsID8gc2VsZWN0ZWRZZWFyIDogeWVhclRvRGlzcGxheTtcblxuICBsZXQgeWVhclRvQ2h1bmsgPSBmb2N1c2VkWWVhcjtcbiAgeWVhclRvQ2h1bmsgLT0geWVhclRvQ2h1bmsgJSBZRUFSX0NIVU5LO1xuICB5ZWFyVG9DaHVuayA9IE1hdGgubWF4KDAsIHllYXJUb0NodW5rKTtcblxuICBjb25zdCBwcmV2WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgLSAxKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGVcbiAgKTtcblxuICBjb25zdCBuZXh0WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgKyBZRUFSX0NIVU5LKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGVcbiAgKTtcblxuICBjb25zdCB5ZWFycyA9IFtdO1xuICBsZXQgeWVhckluZGV4ID0geWVhclRvQ2h1bms7XG4gIHdoaWxlICh5ZWFycy5sZW5ndGggPCBZRUFSX0NIVU5LKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgICAgc2V0WWVhcihjYWxlbmRhckRhdGUsIHllYXJJbmRleCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX1lFQVJfQ0xBU1NdO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB5ZWFySW5kZXggPT09IHNlbGVjdGVkWWVhcjtcblxuICAgIGlmICh5ZWFySW5kZXggPT09IGZvY3VzZWRZZWFyKSB7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIHllYXJJbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0geWVhckluZGV4O1xuXG4gICAgeWVhcnMucHVzaChidG4pO1xuICAgIHllYXJJbmRleCArPSAxO1xuICB9XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBjYWxlbmRhckVsLmNsb25lTm9kZSgpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgY2FsZW5kYXIgd3JhcHBlclxuICBjb25zdCB5ZWFyc0NhbGVuZGFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTKTtcblxuICAvLyBjcmVhdGUgdGFibGUgcGFyZW50XG4gIGNvbnN0IHllYXJzVGFibGVQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHllYXJzVGFibGVQYXJlbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcbiAgeWVhcnNUYWJsZVBhcmVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG5cbiAgLy8gY3JlYXRlIHRhYmxlIGJvZHkgYW5kIHRhYmxlIHJvd1xuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAvLyBjcmVhdGUgcHJldmlvdXMgYnV0dG9uXG4gIGNvbnN0IHByZXZpb3VzWWVhcnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBwcmV2aW91c1llYXJzQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTUyk7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIGBOYXZpZ2F0ZSBiYWNrICR7WUVBUl9DSFVOS30geWVhcnNgXG4gICk7XG4gIGlmIChwcmV2WWVhckNodW5rRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICBwcmV2aW91c1llYXJzQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuICBwcmV2aW91c1llYXJzQnRuLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCZuYnNwYDtcblxuICAvLyBjcmVhdGUgbmV4dCBidXR0b25cbiAgY29uc3QgbmV4dFllYXJzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV4dFllYXJzQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gIG5leHRZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktfQ0xBU1MpO1xuICBuZXh0WWVhcnNCdG4uc2V0QXR0cmlidXRlKFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIGBOYXZpZ2F0ZSBmb3J3YXJkICR7WUVBUl9DSFVOS30geWVhcnNgXG4gICk7XG4gIGlmIChuZXh0WWVhckNodW5rRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICBuZXh0WWVhcnNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIG5leHRZZWFyc0J0bi5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAmbmJzcGA7XG5cbiAgLy8gY3JlYXRlIHRoZSBhY3R1YWwgeWVhcnMgdGFibGVcbiAgY29uc3QgeWVhcnNUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgeWVhcnNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHllYXJzVGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICAvLyBjcmVhdGUgdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIGNvbnN0IHllYXJzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKHllYXJzLCAzKTtcbiAgY29uc3QgeWVhcnNUYWJsZUJvZHkgPSBjcmVhdGVUYWJsZUJvZHkoeWVhcnNHcmlkKTtcblxuICAvLyBhcHBlbmQgdGhlIGdyaWQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIHllYXJzVGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzVGFibGVCb2R5KTtcblxuICAvLyBjcmVhdGUgdGhlIHByZXYgYnV0dG9uIHRkIGFuZCBhcHBlbmQgdGhlIHByZXYgYnV0dG9uXG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgcHJldmlvdXNZZWFyc0J0blxuICApO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgdGQgYW5kIGFwcGVuZCB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsLnNldEF0dHJpYnV0ZShcImNvbHNwYW5cIiwgXCIzXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZSk7XG5cbiAgLy8gY3JlYXRlIHRoZSBuZXh0IGJ1dHRvbiB0ZCBhbmQgYXBwZW5kIHRoZSBuZXh0IGJ1dHRvblxuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBuZXh0WWVhcnNCdG4pO1xuXG4gIC8vIGFwcGVuZCB0aGUgdGhyZWUgdGQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlIHJvd1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldlxuICApO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWxcbiAgKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5Um93Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIHllYXJzSFRNTFRhYmxlQm9keURldGFpbE5leHRcbiAgKTtcblxuICAvLyBhcHBlbmQgdGhlIHRhYmxlIHJvdyB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGUgYm9keVxuICB5ZWFyc0hUTUxUYWJsZUJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzSFRNTFRhYmxlQm9keVJvdyk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyB0YWJsZSBib2R5IHRvIHRoZSB5ZWFycyBwYXJlbnQgdGFibGVcbiAgeWVhcnNUYWJsZVBhcmVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNIVE1MVGFibGVCb2R5KTtcblxuICAvLyBhcHBlbmQgdGhlIHBhcmVudCB0YWJsZSB0byB0aGUgY2FsZW5kYXIgd3JhcHBlclxuICB5ZWFyc0NhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZVBhcmVudCk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyBjYWxlbmRlciB0byB0aGUgbmV3IGNhbGVuZGFyXG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc0NhbGVuZGFyV3JhcHBlcik7XG5cbiAgLy8gcmVwbGFjZSBjYWxlbmRhclxuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFNob3dpbmcgeWVhcnMgJHt5ZWFyVG9DaHVua30gdG8gJHtcbiAgICB5ZWFyVG9DaHVuayArIFlFQVJfQ0hVTksgLSAxXG4gIH0uIFNlbGVjdCBhIHllYXIuYDtcblxuICByZXR1cm4gbmV3Q2FsZW5kYXI7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgYnkgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHllYXJFbCA9IGNhbGVuZGFyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwudGV4dENvbnRlbnQsIDEwKTtcblxuICBsZXQgYWRqdXN0ZWRZZWFyID0gc2VsZWN0ZWRZZWFyIC0gWUVBUl9DSFVOSztcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgY2FsZW5kYXJFbCxcbiAgICBjYXBwZWREYXRlLmdldEZ1bGxZZWFyKClcbiAgKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTkspO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgYnkgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlOZXh0WWVhckNodW5rID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeWVhckVsID0gY2FsZW5kYXJFbC5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC50ZXh0Q29udGVudCwgMTApO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBzZWxlY3RlZFllYXIgKyBZRUFSX0NIVU5LO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbihcbiAgICBjYWxlbmRhckVsLFxuICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSB5ZWFyIGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0geWVhckVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdFllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoeWVhckVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLmlubmVySFRNTCwgMTApO1xuICBsZXQgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZFllYXIpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBIaWRlIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhciA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChldmVudC50YXJnZXQpO1xuXG4gIGhpZGVDYWxlbmRhcihkYXRlUGlja2VyRWwpO1xuICBleHRlcm5hbElucHV0RWwuZm9jdXMoKTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBBZGp1c3QgdGhlIGRhdGUgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3REYXRlRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkanVzdENhbGVuZGFyID0gKGFkanVzdERhdGVGbikgPT4gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBldmVudC50YXJnZXRcbiAgKTtcblxuICBjb25zdCBkYXRlID0gYWRqdXN0RGF0ZUZuKGNhbGVuZGFyRGF0ZSk7XG5cbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVEYXkoY2FsZW5kYXJEYXRlLCBjYXBwZWREYXRlKSkge1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgY2FwcGVkRGF0ZSk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1YldlZWtzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRXZWVrcyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgZGF5IGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUxlZnRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJEYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBkYXkgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGREYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN0YXJ0T2ZXZWVrKGRhdGUpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGVuZE9mV2VlayhkYXRlKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRNb250aHMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1Yk1vbnRocyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVTaGlmdFBhZ2VEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkWWVhcnMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU2hpZnRQYWdlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJZZWFycyhkYXRlLCAxKSk7XG5cbi8qKlxuICogZGlzcGxheSB0aGUgY2FsZW5kYXIgZm9yIHRoZSBtb3VzZW92ZXIgZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZW92ZXIgZXZlbnRcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGRhdGVFbCBBIGRhdGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVNb3VzZW92ZXJGcm9tRGF0ZSA9IChkYXRlRWwpID0+IHtcbiAgaWYgKGRhdGVFbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNhbGVuZGFyRWwgPSBkYXRlRWwuY2xvc2VzdChEQVRFX1BJQ0tFUl9DQUxFTkRBUik7XG5cbiAgY29uc3QgY3VycmVudENhbGVuZGFyRGF0ZSA9IGNhbGVuZGFyRWwuZGF0YXNldC52YWx1ZTtcbiAgY29uc3QgaG92ZXJEYXRlID0gZGF0ZUVsLmRhdGFzZXQudmFsdWU7XG5cbiAgaWYgKGhvdmVyRGF0ZSA9PT0gY3VycmVudENhbGVuZGFyRGF0ZSkgcmV0dXJuO1xuXG4gIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBwYXJzZURhdGVTdHJpbmcoaG92ZXJEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBNb250aCBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdE1vbnRoRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBtb250aFxuICovXG5jb25zdCBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbiA9IChhZGp1c3RNb250aEZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgbW9udGhFbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3QgY3VycmVudERhdGUgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIHNlbGVjdGVkTW9udGgpO1xuXG4gIGxldCBhZGp1c3RlZE1vbnRoID0gYWRqdXN0TW9udGhGbihzZWxlY3RlZE1vbnRoKTtcbiAgYWRqdXN0ZWRNb250aCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDExLCBhZGp1c3RlZE1vbnRoKSk7XG5cbiAgY29uc3QgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRNb250aCk7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lTW9udGgoY3VycmVudERhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24oXG4gICAgICBjYWxlbmRhckVsLFxuICAgICAgY2FwcGVkRGF0ZS5nZXRNb250aCgpXG4gICAgKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoIC0gKG1vbnRoICUgMylcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgcm93IG9mIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoICsgMiAtIChtb250aCAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBsYXN0IG1vbnRoIChEZWNlbWJlcikgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKCgpID0+IDExKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZmlyc3QgbW9udGggKEphbnVhcnkpIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMCk7XG5cbi8qKlxuICogdXBkYXRlIHRoZSBmb2N1cyBvbiBhIG1vbnRoIHdoZW4gdGhlIG1vdXNlIG1vdmVzLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gbW9udGhFbCBBIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbU1vbnRoID0gKG1vbnRoRWwpID0+IHtcbiAgaWYgKG1vbnRoRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgaWYgKG1vbnRoRWwuY2xhc3NMaXN0LmNvbnRhaW5zKENBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1MpKSByZXR1cm47XG5cbiAgY29uc3QgZm9jdXNNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKG1vbnRoRWwsIGZvY3VzTW9udGgpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIE1vbnRoIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgWWVhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3RZZWFyRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCB5ZWFyXG4gKi9cbmNvbnN0IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4gPSAoYWRqdXN0WWVhckZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgeWVhckVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dCh5ZWFyRWwpO1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZFllYXIpO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBhZGp1c3RZZWFyRm4oc2VsZWN0ZWRZZWFyKTtcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lWWVhcihjdXJyZW50RGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgICAgY2FsZW5kYXJFbCxcbiAgICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICAgICk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlTGVmdEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyIC0gKHllYXIgJSAzKVxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyAyIC0gKHllYXIgJSAzKVxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byBiYWNrIDEyIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyIC0gWUVBUl9DSFVOS1xuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIDEyIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyBZRUFSX0NIVU5LXG4pO1xuXG4vKipcbiAqIHVwZGF0ZSB0aGUgZm9jdXMgb24gYSB5ZWFyIHdoZW4gdGhlIG1vdXNlIG1vdmVzLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZGF0ZUVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlckZyb21ZZWFyID0gKHllYXJFbCkgPT4ge1xuICBpZiAoeWVhckVsLmRpc2FibGVkKSByZXR1cm47XG4gIGlmICh5ZWFyRWwuY2xhc3NMaXN0LmNvbnRhaW5zKENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUykpIHJldHVybjtcblxuICBjb25zdCBmb2N1c1llYXIgPSBwYXJzZUludCh5ZWFyRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oeWVhckVsLCBmb2N1c1llYXIpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgWWVhciBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIEZvY3VzIEhhbmRsaW5nIEV2ZW50IEhhbmRsaW5nXG5cbmNvbnN0IHRhYkhhbmRsZXIgPSAoZm9jdXNhYmxlKSA9PiB7XG4gIGNvbnN0IGdldEZvY3VzYWJsZUNvbnRleHQgPSAoZWwpID0+IHtcbiAgICBjb25zdCB7IGNhbGVuZGFyRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHNlbGVjdChmb2N1c2FibGUsIGNhbGVuZGFyRWwpO1xuXG4gICAgY29uc3QgZmlyc3RUYWJJbmRleCA9IDA7XG4gICAgY29uc3QgbGFzdFRhYkluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1tmaXJzdFRhYkluZGV4XTtcbiAgICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2xhc3RUYWJJbmRleF07XG4gICAgY29uc3QgZm9jdXNJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoYWN0aXZlRWxlbWVudCgpKTtcblxuICAgIGNvbnN0IGlzTGFzdFRhYiA9IGZvY3VzSW5kZXggPT09IGxhc3RUYWJJbmRleDtcbiAgICBjb25zdCBpc0ZpcnN0VGFiID0gZm9jdXNJbmRleCA9PT0gZmlyc3RUYWJJbmRleDtcbiAgICBjb25zdCBpc05vdEZvdW5kID0gZm9jdXNJbmRleCA9PT0gLTE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNhYmxlRWxlbWVudHMsXG4gICAgICBpc05vdEZvdW5kLFxuICAgICAgZmlyc3RUYWJTdG9wLFxuICAgICAgaXNGaXJzdFRhYixcbiAgICAgIGxhc3RUYWJTdG9wLFxuICAgICAgaXNMYXN0VGFiLFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB0YWJBaGVhZChldmVudCkge1xuICAgICAgY29uc3QgeyBmaXJzdFRhYlN0b3AsIGlzTGFzdFRhYiwgaXNOb3RGb3VuZCB9ID0gZ2V0Rm9jdXNhYmxlQ29udGV4dChcbiAgICAgICAgZXZlbnQudGFyZ2V0XG4gICAgICApO1xuXG4gICAgICBpZiAoaXNMYXN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0YWJCYWNrKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGxhc3RUYWJTdG9wLCBpc0ZpcnN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXRcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0ZpcnN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoREFURV9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihNT05USF9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKFlFQVJfUElDS0VSX0ZPQ1VTQUJMRSk7XG5cbi8vICNlbmRyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5jb25zdCBkYXRlUGlja2VyRXZlbnRzID0ge1xuICBbQ0xJQ0tdOiB7XG4gICAgW0RBVEVfUElDS0VSX0JVVFRPTl0oKSB7XG4gICAgICB0b2dnbGVDYWxlbmRhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9EQVRFXSgpIHtcbiAgICAgIHNlbGVjdERhdGUodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdKCkge1xuICAgICAgc2VsZWN0TW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl0oKSB7XG4gICAgICBzZWxlY3RZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX01PTlRIXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c01vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfTU9OVEhdKCkge1xuICAgICAgZGlzcGxheU5leHRNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlOZXh0WWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktdKCkge1xuICAgICAgZGlzcGxheU5leHRZZWFyQ2h1bmsodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKHRoaXMpO1xuICAgICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9NT05USF9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24odGhpcyk7XG4gICAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbiAgICB9LFxuICB9LFxuICBrZXl1cDoge1xuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleWRvd24gPSB0aGlzLmRhdGFzZXQua2V5ZG93bktleUNvZGU7XG4gICAgICBpZiAoYCR7ZXZlbnQua2V5Q29kZX1gICE9PSBrZXlkb3duKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAga2V5ZG93bjoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW0NBTEVOREFSX0RBVEVdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbURhdGUsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21EYXRlLFxuICAgICAgRG93bjogaGFuZGxlRG93bkZyb21EYXRlLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbURhdGUsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbURhdGUsXG4gICAgICBBcnJvd0xlZnQ6IGhhbmRsZUxlZnRGcm9tRGF0ZSxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21EYXRlLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tRGF0ZSxcbiAgICAgIEhvbWU6IGhhbmRsZUhvbWVGcm9tRGF0ZSxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbURhdGUsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFBhZ2VVcDogaGFuZGxlUGFnZVVwRnJvbURhdGUsXG4gICAgICBcIlNoaWZ0K1BhZ2VEb3duXCI6IGhhbmRsZVNoaWZ0UGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFwiU2hpZnQrUGFnZVVwXCI6IGhhbmRsZVNoaWZ0UGFnZVVwRnJvbURhdGUsXG4gICAgICBUYWI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX0RBVEVfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgIFwiU2hpZnQrVGFiXCI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbU1vbnRoLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tTW9udGgsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21Nb250aCxcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbU1vbnRoLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21Nb250aCxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbU1vbnRoLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbU1vbnRoLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tTW9udGgsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX01PTlRIX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tWWVhcixcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbVllYXIsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbVllYXIsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tWWVhcixcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tWWVhcixcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21ZZWFyLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbVllYXIsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21ZZWFyLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21ZZWFyLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tWWVhcixcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21ZZWFyLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tWWVhcixcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIHRoaXMuZGF0YXNldC5rZXlkb3duS2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgfSxcbiAgICBbREFURV9QSUNLRVJdKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlNYXAgPSBrZXltYXAoe1xuICAgICAgICBFc2NhcGU6IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhcixcbiAgICAgIH0pO1xuXG4gICAgICBrZXlNYXAoZXZlbnQpO1xuICAgIH0sXG4gIH0sXG4gIGZvY3Vzb3V0OiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXSgpIHtcbiAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgIH0sXG4gICAgW0RBVEVfUElDS0VSXShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgIGhpZGVDYWxlbmRhcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBpbnB1dDoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oKSB7XG4gICAgICByZWNvbmNpbGVJbnB1dFZhbHVlcyh0aGlzKTtcbiAgICAgIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5pZiAoIWlzSW9zRGV2aWNlKCkpIHtcbiAgZGF0ZVBpY2tlckV2ZW50cy5tb3VzZW92ZXIgPSB7XG4gICAgW0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tRGF0ZSh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tTW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tWWVhcih0aGlzKTtcbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBkYXRlUGlja2VyID0gYmVoYXZpb3IoZGF0ZVBpY2tlckV2ZW50cywge1xuICBpbml0KHJvb3QpIHtcbiAgICBzZWxlY3RPck1hdGNoZXMoREFURV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKGRhdGVQaWNrZXJFbCkgPT4ge1xuICAgICAgZW5oYW5jZURhdGVQaWNrZXIoZGF0ZVBpY2tlckVsKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RGF0ZVBpY2tlckNvbnRleHQsXG4gIGRpc2FibGUsXG4gIGVuYWJsZSxcbiAgaXNEYXRlSW5wdXRJbnZhbGlkLFxuICBzZXRDYWxlbmRhclZhbHVlLFxuICB2YWxpZGF0ZURhdGVJbnB1dCxcbiAgcmVuZGVyQ2FsZW5kYXIsXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlLFxufSk7XG5cbi8vICNlbmRyZWdpb24gRGF0ZSBQaWNrZXIgRXZlbnQgRGVsZWdhdGlvbiBSZWdpc3RyYXRpb24gLyBDb21wb25lbnRcblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlUGlja2VyO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHtcbiAgZ2V0RGF0ZVBpY2tlckNvbnRleHQsXG4gIGlzRGF0ZUlucHV0SW52YWxpZCxcbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUsXG59ID0gcmVxdWlyZShcIi4uLy4uL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXhcIik7XG5cbmNvbnN0IERBVEVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS1kYXRlLXBpY2tlcmA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1yYW5nZS1waWNrZXJgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MgPSBgJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31fX3JhbmdlLXN0YXJ0YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyA9IGAke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfV9fcmFuZ2UtZW5kYDtcblxuY29uc3QgREFURV9QSUNLRVIgPSBgLiR7REFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVCA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTU31gO1xuXG5jb25zdCBERUZBVUxUX01JTl9EQVRFID0gXCIwMDAwLTAxLTAxXCI7XG5cbi8qKlxuICogVGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEYXRlUmFuZ2VQaWNrZXJDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRlUmFuZ2VQaWNrZXJFbFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gcmFuZ2VTdGFydEVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSByYW5nZUVuZEVsXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICogQHJldHVybnMge0RhdGVSYW5nZVBpY2tlckNvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBpZiAoIWRhdGVSYW5nZVBpY2tlckVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEQVRFX1JBTkdFX1BJQ0tFUn1gKTtcbiAgfVxuXG4gIGNvbnN0IHJhbmdlU3RhcnRFbCA9IGRhdGVSYW5nZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRcbiAgKTtcbiAgY29uc3QgcmFuZ2VFbmRFbCA9IGRhdGVSYW5nZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbCxcbiAgICByYW5nZVN0YXJ0RWwsXG4gICAgcmFuZ2VFbmRFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlU3RhcnRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VTdGFydEVsKTtcbiAgY29uc3QgdXBkYXRlZERhdGUgPSBpbnRlcm5hbElucHV0RWwudmFsdWU7XG5cbiAgaWYgKHVwZGF0ZWREYXRlICYmICFpc0RhdGVJbnB1dEludmFsaWQoaW50ZXJuYWxJbnB1dEVsKSkge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IHVwZGF0ZWREYXRlO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LmRlZmF1bHREYXRlID0gXCJcIjtcbiAgfVxuXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHJhbmdlRW5kRWwpO1xufTtcblxuLyoqXG4gKiBoYW5kbGUgdXBkYXRlIGZyb20gcmFuZ2Ugc3RhcnQgZGF0ZSBwaWNrZXJcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXJcbiAqL1xuY29uc3QgaGFuZGxlUmFuZ2VFbmRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VFbmRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gXCJcIjtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZVN0YXJ0RWwpO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VEYXRlUmFuZ2VQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gc2VsZWN0KERBVEVfUElDS0VSLCBkYXRlUmFuZ2VQaWNrZXJFbCk7XG5cbiAgaWYgKCFyYW5nZVN0YXJ0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgdHdvICcke0RBVEVfUElDS0VSfScgZWxlbWVudHNgXG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmFuZ2VFbmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgJHtEQVRFX1JBTkdFX1BJQ0tFUn0gaXMgbWlzc2luZyBzZWNvbmQgJyR7REFURV9QSUNLRVJ9JyBlbGVtZW50YFxuICAgICk7XG4gIH1cblxuICByYW5nZVN0YXJ0LmNsYXNzTGlzdC5hZGQoREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MpO1xuICByYW5nZUVuZC5jbGFzc0xpc3QuYWRkKERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyk7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBERUZBVUxUX01JTl9EQVRFO1xuICB9XG5cbiAgY29uc3QgeyBtaW5EYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICByYW5nZVN0YXJ0LmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG4gIHJhbmdlRW5kLmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG5cbiAgY29uc3QgeyBtYXhEYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICBpZiAobWF4RGF0ZSkge1xuICAgIHJhbmdlU3RhcnQuZGF0YXNldC5tYXhEYXRlID0gbWF4RGF0ZTtcbiAgICByYW5nZUVuZC5kYXRhc2V0Lm1heERhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZShkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gIGhhbmRsZVJhbmdlRW5kVXBkYXRlKGRhdGVSYW5nZVBpY2tlckVsKTtcbn07XG5cbmNvbnN0IGRhdGVSYW5nZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJpbnB1dCBjaGFuZ2VcIjoge1xuICAgICAgW0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VFbmRVcGRhdGUodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhEQVRFX1JBTkdFX1BJQ0tFUiwgcm9vdCkuZm9yRWFjaCgoZGF0ZVJhbmdlUGlja2VyRWwpID0+IHtcbiAgICAgICAgZW5oYW5jZURhdGVSYW5nZVBpY2tlcihkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVSYW5nZVBpY2tlcjtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IERST1BaT05FX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0YDtcbmNvbnN0IERST1BaT05FID0gYC4ke0RST1BaT05FX0NMQVNTfWA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5wdXRgO1xuY29uc3QgVEFSR0VUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X190YXJnZXRgO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IEJPWF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYm94YDtcbmNvbnN0IElOU1RSVUNUSU9OU19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5zdHJ1Y3Rpb25zYDtcbmNvbnN0IFBSRVZJRVdfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXdgO1xuY29uc3QgUFJFVklFV19IRUFESU5HX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWhlYWRpbmdgO1xuY29uc3QgRElTQUJMRURfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXQtLWRpc2FibGVkYDtcbmNvbnN0IENIT09TRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fY2hvb3NlYDtcbmNvbnN0IEFDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYWNjZXB0ZWQtZmlsZXMtbWVzc2FnZWA7XG5jb25zdCBEUkFHX1RFWFRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2RyYWctdGV4dGA7XG5jb25zdCBEUkFHX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0LS1kcmFnYDtcbmNvbnN0IExPQURJTkdfQ0xBU1MgPSBcImlzLWxvYWRpbmdcIjtcbmNvbnN0IEhJRERFTl9DTEFTUyA9IFwiZGlzcGxheS1ub25lXCI7XG5jb25zdCBJTlZBTElEX0ZJTEVfQ0xBU1MgPSBcImhhcy1pbnZhbGlkLWZpbGVcIjtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWltYWdlYDtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tZ2VuZXJpY2A7XG5jb25zdCBQREZfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tcGRmYDtcbmNvbnN0IFdPUkRfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0td29yZGA7XG5jb25zdCBWSURFT19QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS12aWRlb2A7XG5jb25zdCBFWENFTF9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1leGNlbGA7XG5jb25zdCBTUEFDRVJfR0lGID1cbiAgXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTdcIjtcblxubGV0IFRZUEVfSVNfVkFMSUQgPSBCb29sZWFuKHRydWUpOyAvLyBsb2dpYyBnYXRlIGZvciBjaGFuZ2UgbGlzdGVuZXJcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBmaWxlIGlucHV0LlxuICogQHR5cGVkZWYge09iamVjdH0gRmlsZUlucHV0Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZHJvcFpvbmVFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dEVsXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBmaWxlIGlucHV0IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXRcbiAqIEByZXR1cm5zIHtGaWxlSW5wdXRDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXRGaWxlSW5wdXRDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRyb3Bab25lRWwgPSBlbC5jbG9zZXN0KERST1BaT05FKTtcblxuICBpZiAoIWRyb3Bab25lRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RST1BaT05FfWApO1xuICB9XG5cbiAgY29uc3QgaW5wdXRFbCA9IGRyb3Bab25lRWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkcm9wWm9uZUVsLFxuICAgIGlucHV0RWwsXG4gIH07XG59O1xuXG4vKipcbiAqIERpc2FibGUgdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QuYWRkKERJU0FCTEVEX0NMQVNTKTtcbiAgZHJvcFpvbmVFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGRyb3Bab25lRWwuY2xhc3NMaXN0LnJlbW92ZShESVNBQkxFRF9DTEFTUyk7XG4gIGRyb3Bab25lRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIHNwZWNpYWwgY2hhcmFjdGVyc1xuICogQHJldHVybnMge1N0cmluZ30gcmVwbGFjZXMgc3BlY2lmaWVkIHZhbHVlc1xuICovXG5jb25zdCByZXBsYWNlTmFtZSA9IChzKSA9PiB7XG4gIGNvbnN0IGMgPSBzLmNoYXJDb2RlQXQoMCk7XG4gIGlmIChjID09PSAzMikgcmV0dXJuIFwiLVwiO1xuICBpZiAoYyA+PSA2NSAmJiBjIDw9IDkwKSByZXR1cm4gYGltZ18ke3MudG9Mb3dlckNhc2UoKX1gO1xuICByZXR1cm4gYF9fJHsoXCIwMDBcIiwgYy50b1N0cmluZygxNikpLnNsaWNlKC00KX1gO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIElEIG5hbWUgZm9yIGVhY2ggZmlsZSB0aGF0IHN0cmlwcyBhbGwgaW52YWxpZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBmaWxlIGFkZGVkIHRvIGZpbGUgaW5wdXQgKHNlYXJjaHZhbHVlKVxuICogQHJldHVybnMge1N0cmluZ30gc2FtZSBjaGFyYWN0ZXJzIGFzIHRoZSBuYW1lIHdpdGggaW52YWxpZCBjaGFycyByZW1vdmVkIChuZXd2YWx1ZSlcbiAqL1xuY29uc3QgbWFrZVNhZmVGb3JJRCA9IChuYW1lKSA9PiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCByZXBsYWNlTmFtZSk7XG5cbi8vIFRha2VzIGEgZ2VuZXJhdGVkIHNhZmUgSUQgYW5kIGNyZWF0ZXMgYSB1bmlxdWUgSUQuXG5jb25zdCBjcmVhdGVVbmlxdWVJRCA9IChuYW1lKSA9PlxuICBgJHtuYW1lfS0ke01hdGguZmxvb3IoRGF0ZS5ub3coKS50b1N0cmluZygpIC8gMTAwMCl9YDtcblxuLyoqXG4gKiBCdWlsZHMgZnVsbCBmaWxlIGlucHV0IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBvcmlnaW5hbCBmaWxlIGlucHV0IG9uIHBhZ2VcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxIVE1MRWxlbWVudH0gLSBJbnN0cnVjdGlvbnMsIHRhcmdldCBhcmVhIGRpdlxuICovXG5jb25zdCBidWlsZEZpbGVJbnB1dCA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBhY2NlcHRzTXVsdGlwbGUgPSBmaWxlSW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKTtcbiAgY29uc3QgZmlsZUlucHV0UGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZHJvcFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRpc2FibGVkID0gZmlsZUlucHV0RWwuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gIGxldCBkZWZhdWx0QXJpYUxhYmVsO1xuXG4gIC8vIEFkZHMgY2xhc3MgbmFtZXMgYW5kIG90aGVyIGF0dHJpYnV0ZXNcbiAgZmlsZUlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShEUk9QWk9ORV9DTEFTUyk7XG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5hZGQoSU5QVVRfQ0xBU1MpO1xuICBmaWxlSW5wdXRQYXJlbnQuY2xhc3NMaXN0LmFkZChEUk9QWk9ORV9DTEFTUyk7XG4gIGJveC5jbGFzc0xpc3QuYWRkKEJPWF9DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKElOU1RSVUNUSU9OU19DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChUQVJHRVRfQ0xBU1MpO1xuICAvLyBFbmNvdXJhZ2Ugc2NyZWVucmVhZGVyIHRvIHJlYWQgb3V0IGFyaWEgY2hhbmdlcyBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdXBsb2FkIHN0YXR1cyBjaGFuZ2VcbiAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsIFwicG9saXRlXCIpO1xuXG4gIC8vIEFkZHMgY2hpbGQgZWxlbWVudHMgdG8gdGhlIERPTVxuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcm9wVGFyZ2V0LCBmaWxlSW5wdXRFbCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZpbGVJbnB1dFBhcmVudCwgZHJvcFRhcmdldCk7XG4gIGRyb3BUYXJnZXQuYXBwZW5kQ2hpbGQoZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRQYXJlbnQuYXBwZW5kQ2hpbGQoZHJvcFRhcmdldCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGluc3RydWN0aW9ucywgZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShib3gsIGZpbGVJbnB1dEVsKTtcblxuICAvLyBEaXNhYmxlZCBzdHlsaW5nXG4gIGlmIChkaXNhYmxlZCkge1xuICAgIGRpc2FibGUoZmlsZUlucHV0RWwpO1xuICB9XG5cbiAgLy8gU2V0cyBpbnN0cnVjdGlvbiB0ZXN0IGFuZCBhcmlhLWxhYmVsIGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IG11bHRpcGxlIGZpbGVzIGFyZSBhY2NlcHRlZFxuICBpZiAoYWNjZXB0c011bHRpcGxlKSB7XG4gICAgZGVmYXVsdEFyaWFMYWJlbCA9IFwiTm8gZmlsZXMgc2VsZWN0ZWRcIjtcbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgPHNwYW4gY2xhc3M9XCIke0RSQUdfVEVYVF9DTEFTU31cIj5EcmFnIGZpbGVzIGhlcmUgb3IgPC9zcGFuPjxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+Y2hvb3NlIGZyb20gZm9sZGVyPC9zcGFuPmA7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0QXJpYUxhYmVsID0gXCJObyBmaWxlIHNlbGVjdGVkXCI7XG4gICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYDxzcGFuIGNsYXNzPVwiJHtEUkFHX1RFWFRfQ0xBU1N9XCI+RHJhZyBmaWxlIGhlcmUgb3IgPC9zcGFuPjxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+Y2hvb3NlIGZyb20gZm9sZGVyPC9zcGFuPmA7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgfVxuXG4gIC8vIElFMTEgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgZHJvcCBmaWxlcyBvbiBmaWxlIGlucHV0cywgc28gd2UndmUgcmVtb3ZlZCB0ZXh0IHRoYXQgaW5kaWNhdGVzIHRoYXRcbiAgaWYgKFxuICAgIC9ydjoxMS4wL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fFxuICAgIC9FZGdlXFwvXFxkLi9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgKSB7XG4gICAgZmlsZUlucHV0UGFyZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0RSQUdfVEVYVF9DTEFTU31gKS5vdXRlckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0IH07XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgaW1hZ2UgcHJldmlld3MsIHdlIHdhbnQgdG8gc3RhcnQgd2l0aCBhIGNsZWFuIGxpc3QgZXZlcnkgdGltZSBmaWxlcyBhcmUgYWRkZWQgdG8gdGhlIGZpbGUgaW5wdXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRyb3BUYXJnZXQgLSB0YXJnZXQgYXJlYSBkaXYgdGhhdCBlbmNhc2VzIHRoZSBpbnB1dFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5zdHJ1Y3Rpb25zIC0gdGV4dCB0byBpbmZvcm0gdXNlcnMgdG8gZHJhZyBvciBzZWxlY3QgZmlsZXNcbiAqL1xuY29uc3QgcmVtb3ZlT2xkUHJldmlld3MgPSAoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zLCBpbnB1dEFyaWFMYWJlbCkgPT4ge1xuICBjb25zdCBmaWxlUHJldmlld3MgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke1BSRVZJRVdfQ0xBU1N9YCk7XG4gIGNvbnN0IGZpbGVJbnB1dEVsZW1lbnQgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuICBjb25zdCBjdXJyZW50UHJldmlld0hlYWRpbmcgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC4ke1BSRVZJRVdfSEVBRElOR19DTEFTU31gXG4gICk7XG4gIGNvbnN0IGN1cnJlbnRFcnJvck1lc3NhZ2UgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC4ke0FDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTU31gXG4gICk7XG5cbiAgLyoqXG4gICAqIGZpbmRzIHRoZSBwYXJlbnQgb2YgdGhlIHBhc3NlZCBub2RlIGFuZCByZW1vdmVzIHRoZSBjaGlsZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gICAqL1xuICBjb25zdCByZW1vdmVJbWFnZXMgPSAobm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgdGhlIGhlYWRpbmcgYWJvdmUgdGhlIHByZXZpZXdzXG4gIGlmIChjdXJyZW50UHJldmlld0hlYWRpbmcpIHtcbiAgICBjdXJyZW50UHJldmlld0hlYWRpbmcub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIC8vIFJlbW92ZSBleGlzdGluZyBlcnJvciBtZXNzYWdlc1xuICBpZiAoY3VycmVudEVycm9yTWVzc2FnZSkge1xuICAgIGN1cnJlbnRFcnJvck1lc3NhZ2Uub3V0ZXJIVE1MID0gXCJcIjtcbiAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgfVxuXG4gIC8vIEdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3MgaWYgdGhleSBleGlzdCwgc2hvdyBpbnN0cnVjdGlvbnNcbiAgaWYgKGZpbGVQcmV2aWV3cyAhPT0gbnVsbCkge1xuICAgIGlmIChpbnN0cnVjdGlvbnMpIHtcbiAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgfVxuICAgIGZpbGVJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpbnB1dEFyaWFMYWJlbCk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmaWxlUHJldmlld3MsIHJlbW92ZUltYWdlcyk7XG4gIH1cbn07XG5cbi8qKlxuICogV2hlbiBuZXcgZmlsZXMgYXJlIGFwcGxpZWQgdG8gZmlsZSBpbnB1dCwgdGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgcHJldmlld3NcbiAqIGFuZCByZW1vdmVzIG9sZCBvbmVzLlxuICogQHBhcmFtIHtldmVudH0gZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBmaWxlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqL1xuXG5jb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBjb25zdCBmaWxlTmFtZXMgPSBlLnRhcmdldC5maWxlcztcbiAgY29uc3QgZmlsZVByZXZpZXdzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGlucHV0QXJpYUxhYmVsID0gZmlsZUlucHV0RWwuZGF0YXNldC5kZWZhdWx0QXJpYUxhYmVsO1xuICBjb25zdCBmaWxlU3RvcmUgPSBbXTtcblxuICAvLyBGaXJzdCwgZ2V0IHJpZCBvZiBleGlzdGluZyBwcmV2aWV3c1xuICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMsIGlucHV0QXJpYUxhYmVsKTtcblxuICAvLyBUaGVuLCBpdGVyYXRlIHRocm91Z2ggZmlsZXMgbGlzdCBhbmQ6XG4gIC8vIDEuIEFkZCBzZWxlY3RlZCBmaWxlIGxpc3QgbmFtZXMgdG8gYXJpYS1sYWJlbFxuICAvLyAyLiBDcmVhdGUgcHJldmlld3NcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZU5hbWVzW2ldLm5hbWU7XG5cbiAgICAvLyBQdXNoIHVwZGF0ZWQgZmlsZSBuYW1lcyBpbnRvIHRoZSBzdG9yZSBhcnJheVxuICAgIGZpbGVTdG9yZS5wdXNoKGZpbGVOYW1lKTtcblxuICAgIC8vIHJlYWQgb3V0IHRoZSBzdG9yZSBhcnJheSB2aWEgYXJpYS1sYWJlbCwgd29yZGluZyBvcHRpb25zIHZhcnkgYmFzZWQgb24gZmlsZSBjb3VudFxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgICBgWW91IGhhdmUgc2VsZWN0ZWQgdGhlIGZpbGU6ICR7ZmlsZU5hbWV9YFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGkgPj0gMSkge1xuICAgICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgICAgYFlvdSBoYXZlIHNlbGVjdGVkICR7ZmlsZU5hbWVzLmxlbmd0aH0gZmlsZXM6ICR7ZmlsZVN0b3JlLmpvaW4oXCIsIFwiKX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFN0YXJ0cyB3aXRoIGEgbG9hZGluZyBpbWFnZSB3aGlsZSBwcmV2aWV3IGlzIGNyZWF0ZWRcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiBjcmVhdGVMb2FkaW5nSW1hZ2UoKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gY3JlYXRlVW5pcXVlSUQobWFrZVNhZmVGb3JJRChmaWxlTmFtZSkpO1xuXG4gICAgICBpbnN0cnVjdGlvbnMuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYDxkaXYgY2xhc3M9XCIke1BSRVZJRVdfQ0xBU1N9XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGltZyBpZD1cIiR7aW1hZ2VJZH1cIiBzcmM9XCIke1NQQUNFUl9HSUZ9XCIgYWx0PVwiXCIgY2xhc3M9XCIke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfSAke0xPQURJTkdfQ0xBU1N9XCIvPiR7ZmlsZU5hbWV9XG4gICAgICAgIDxkaXY+YFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gTm90IGFsbCBmaWxlcyB3aWxsIGJlIGFibGUgdG8gZ2VuZXJhdGUgcHJldmlld3MuIEluIGNhc2UgdGhpcyBoYXBwZW5zLCB3ZSBwcm92aWRlIHNldmVyYWwgdHlwZXMgXCJnZW5lcmljIHByZXZpZXdzXCIgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uLlxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiBjcmVhdGVGaWxlUHJldmlldygpIHtcbiAgICAgIGNvbnN0IGltYWdlSWQgPSBjcmVhdGVVbmlxdWVJRChtYWtlU2FmZUZvcklEKGZpbGVOYW1lKSk7XG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbWFnZUlkKTtcbiAgICAgIGlmIChmaWxlTmFtZS5pbmRleE9mKFwiLnBkZlwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7UERGX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlsZU5hbWUuaW5kZXhPZihcIi5kb2NcIikgPiAwIHx8XG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIucGFnZXNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7V09SRF9QUkVWSUVXX0NMQVNTfVwiKWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIueGxzXCIpID4gMCB8fFxuICAgICAgICBmaWxlTmFtZS5pbmRleE9mKFwiLm51bWJlcnNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7RVhDRUxfUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmluZGV4T2YoXCIubW92XCIpID4gMCB8fCBmaWxlTmFtZS5pbmRleE9mKFwiLm1wNFwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7VklERU9fUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2aWV3SW1hZ2Uuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwib25lcnJvclwiLFxuICAgICAgICAgIGB0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz1cIiR7U1BBQ0VSX0dJRn1cIjsgdGhpcy5jbGFzc0xpc3QuYWRkKFwiJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmVzIGxvYWRlciBhbmQgZGlzcGxheXMgcHJldmlld1xuICAgICAgcHJldmlld0ltYWdlLmNsYXNzTGlzdC5yZW1vdmUoTE9BRElOR19DTEFTUyk7XG4gICAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVhZGVyLnJlc3VsdDtcbiAgICB9O1xuXG4gICAgaWYgKGZpbGVOYW1lc1tpXSkge1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZU5hbWVzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGhlYWRpbmcgYWJvdmUgZmlsZSBwcmV2aWV3cywgcGx1cmFsaXplcyBpZiB0aGVyZSBhcmUgbXVsdGlwbGVcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gYFNlbGVjdGVkIGZpbGUgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+Q2hhbmdlIGZpbGU8L3NwYW4+YDtcbiAgICB9IGVsc2UgaWYgKGkgPj0gMSkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICAgICAgaSArIDFcbiAgICAgIH0gZmlsZXMgc2VsZWN0ZWQgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+Q2hhbmdlIGZpbGVzPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgLy8gSGlkZXMgbnVsbCBzdGF0ZSBjb250ZW50IGFuZCBzZXRzIHByZXZpZXcgaGVhZGluZyBjbGFzc1xuICAgIGlmIChmaWxlUHJldmlld3NIZWFkaW5nKSB7XG4gICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1MpO1xuICAgICAgZmlsZVByZXZpZXdzSGVhZGluZy5jbGFzc0xpc3QuYWRkKFBSRVZJRVdfSEVBRElOR19DTEFTUyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFdoZW4gdXNpbmcgYW4gQWNjZXB0IGF0dHJpYnV0ZSwgaW52YWxpZCBmaWxlcyB3aWxsIGJlIGhpZGRlbiBmcm9tXG4gKiBmaWxlIGJyb3dzZXIsIGJ1dCB0aGV5IGNhbiBzdGlsbCBiZSBkcmFnZ2VkIHRvIHRoZSBpbnB1dC4gVGhpc1xuICogZnVuY3Rpb24gcHJldmVudHMgdGhlbSBmcm9tIGJlaW5nIGRyYWdnZWQgYW5kIHJlbW92ZXMgZXJyb3Igc3RhdGVzXG4gKiB3aGVuIGNvcnJlY3QgZmlsZXMgYXJlIGFkZGVkLlxuICogQHBhcmFtIHtldmVudH0gZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBmaWxlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqL1xuY29uc3QgcHJldmVudEludmFsaWRGaWxlcyA9IChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGFjY2VwdGVkRmlsZXNBdHRyID0gZmlsZUlucHV0RWwuZ2V0QXR0cmlidXRlKFwiYWNjZXB0XCIpO1xuICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcblxuICAvKipcbiAgICogV2UgY2FuIHByb2JhYmx5IG1vdmUgYXdheSBmcm9tIHRoaXMgb25jZSBJRTExIHN1cHBvcnQgc3RvcHMsIGFuZCByZXBsYWNlXG4gICAqIHdpdGggYSBzaW1wbGUgZXMgYC5pbmNsdWRlc2BcbiAgICogY2hlY2sgaWYgZWxlbWVudCBpcyBpbiBhcnJheVxuICAgKiBjaGVjayBpZiAxIG9yIG1vcmUgYWxwaGFiZXRzIGFyZSBpbiBzdHJpbmdcbiAgICogaWYgZWxlbWVudCBpcyBwcmVzZW50IHJldHVybiB0aGUgcG9zaXRpb24gdmFsdWUgYW5kIC0xIG90aGVyd2lzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb25zdCBpc0luY2x1ZGVkID0gKGZpbGUsIHZhbHVlKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgY29uc3QgcG9zID0gZmlsZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAocG9zID49IDApIHtcbiAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIC8vIFJ1bnMgaWYgb25seSBzcGVjaWZpYyBmaWxlcyBhcmUgYWNjZXB0ZWRcbiAgaWYgKGFjY2VwdGVkRmlsZXNBdHRyKSB7XG4gICAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXNBdHRyLnNwbGl0KFwiLFwiKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgLy8gSWYgbXVsdGlwbGUgZmlsZXMgYXJlIGRyYWdnZWQsIHRoaXMgaXRlcmF0ZXMgdGhyb3VnaCB0aGVtIGFuZCBsb29rIGZvciBhbnkgZmlsZXMgdGhhdCBhcmUgbm90IGFjY2VwdGVkLlxuICAgIGxldCBhbGxGaWxlc0FsbG93ZWQgPSB0cnVlO1xuICAgIGNvbnN0IHNjYW5uZWRGaWxlcyA9IGUudGFyZ2V0LmZpbGVzIHx8IGUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2Nhbm5lZEZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmaWxlID0gc2Nhbm5lZEZpbGVzW2ldO1xuICAgICAgaWYgKGFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjY2VwdGVkRmlsZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBmaWxlVHlwZSA9IGFjY2VwdGVkRmlsZXNbal07XG4gICAgICAgICAgYWxsRmlsZXNBbGxvd2VkID1cbiAgICAgICAgICAgIGZpbGUubmFtZS5pbmRleE9mKGZpbGVUeXBlKSA+IDAgfHxcbiAgICAgICAgICAgIGlzSW5jbHVkZWQoZmlsZS50eXBlLCBmaWxlVHlwZS5yZXBsYWNlKC9cXCovZywgXCJcIikpO1xuICAgICAgICAgIGlmIChhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgICAgICAgIFRZUEVfSVNfVkFMSUQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSWYgZHJhZ2dlZCBmaWxlcyBhcmUgbm90IGFjY2VwdGVkLCB0aGlzIHJlbW92ZXMgdGhlbSBmcm9tIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYW5kIGNyZWF0ZXMgYW5kIGVycm9yIHN0YXRlXG4gICAgaWYgKCFhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgIHJlbW92ZU9sZFByZXZpZXdzKGRyb3BUYXJnZXQsIGluc3RydWN0aW9ucyk7XG4gICAgICBmaWxlSW5wdXRFbC52YWx1ZSA9IFwiXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGVycm9yTWVzc2FnZSwgZmlsZUlucHV0RWwpO1xuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cbiAgICAgICAgZmlsZUlucHV0RWwuZGF0YXNldC5lcnJvcm1lc3NhZ2UgfHwgYFRoaXMgaXMgbm90IGEgdmFsaWQgZmlsZSB0eXBlLmA7XG4gICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1MpO1xuICAgICAgZHJvcFRhcmdldC5jbGFzc0xpc3QuYWRkKElOVkFMSURfRklMRV9DTEFTUyk7XG4gICAgICBUWVBFX0lTX1ZBTElEID0gZmFsc2U7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiAxLiBwYXNzZXMgdGhyb3VnaCBnYXRlIGZvciBwcmV2ZW50aW5nIGludmFsaWQgZmlsZXNcbiAqIDIuIGhhbmRsZXMgdXBkYXRlcyBpZiBmaWxlIGlzIHZhbGlkXG4gKiBAcGFyYW0ge2V2ZW50fSBldmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5zdHJ1Y3Rpb25zRWxcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICovXG5jb25zdCBoYW5kbGVVcGxvYWQgPSAoZXZlbnQsIGVsZW1lbnQsIGluc3RydWN0aW9uc0VsLCBkcm9wVGFyZ2V0RWwpID0+IHtcbiAgcHJldmVudEludmFsaWRGaWxlcyhldmVudCwgZWxlbWVudCwgaW5zdHJ1Y3Rpb25zRWwsIGRyb3BUYXJnZXRFbCk7XG4gIGlmIChUWVBFX0lTX1ZBTElEID09PSB0cnVlKSB7XG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50LCBlbGVtZW50LCBpbnN0cnVjdGlvbnNFbCwgZHJvcFRhcmdldEVsKTtcbiAgfVxufTtcblxuY29uc3QgZmlsZUlucHV0ID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoRFJPUFpPTkUsIHJvb3QpLmZvckVhY2goKGZpbGVJbnB1dEVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0IH0gPSBidWlsZEZpbGVJbnB1dChmaWxlSW5wdXRFbCk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJhZ292ZXJcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcigpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJhZ2xlYXZlXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKERSQUdfQ0xBU1MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcm9wXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZmlsZUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNoYW5nZVwiLFxuICAgICAgICAgIChlKSA9PiBoYW5kbGVVcGxvYWQoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCksXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24ocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKElOUFVULCByb290KS5mb3JFYWNoKChmaWxlSW5wdXRFbCkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXRUb3BFbGVtZW50ID0gZmlsZUlucHV0RWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBmaWxlSW5wdXRUb3BFbGVtZW50LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKFxuICAgICAgICAgIGZpbGVJbnB1dEVsLFxuICAgICAgICAgIGZpbGVJbnB1dFRvcEVsZW1lbnRcbiAgICAgICAgKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbGVJbnB1dEVsLmNsYXNzTmFtZSA9IERST1BaT05FX0NMQVNTO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRGaWxlSW5wdXRDb250ZXh0LFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVJbnB1dDtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IFNDT1BFID0gYC4ke1BSRUZJWH0tZm9vdGVyLS1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyX19wcmltYXJ5LWxpbmtgO1xuY29uc3QgSElERV9NQVhfV0lEVEggPSA0ODA7XG5cbi8qKlxuICogRXhwYW5kcyBzZWxlY3RlZCBmb290ZXIgbWVudSBwYW5lbCwgd2hpbGUgY29sbGFwc2luZyBvdGhlcnNcbiAqL1xuZnVuY3Rpb24gc2hvd1BhbmVsKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCkge1xuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgY29uc3QgdGhpc0Zvb3RlciA9IHRoaXMuY2xvc2VzdChTQ09QRSk7XG5cbiAgICAvLyBDbG9zZSBhbGwgb3RoZXIgbWVudXNcbiAgICB0aGlzRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAhaXNPcGVuKTtcbiAgfVxufVxuXG4vKipcbiAqIFN3YXBzIHRoZSA8aDQ+IGVsZW1lbnQgZm9yIGEgPGJ1dHRvbj4gZWxlbWVudCAoYW5kIHZpY2UtdmVyc2EpIGFuZCBzZXRzIGlkXG4gKiBvZiBtZW51IGxpc3RcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzTW9iaWxlIC0gSWYgdGhlIGZvb3RlciBpcyBpbiBtb2JpbGUgY29uZmlndXJhdGlvblxuICovXG5mdW5jdGlvbiB0b2dnbGVIdG1sVGFnKGlzTW9iaWxlKSB7XG4gIGNvbnN0IGJpZ0Zvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0NPUEUpO1xuXG4gIGlmICghYmlnRm9vdGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcHJpbWFyeUxpbmtzID0gYmlnRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKTtcblxuICBwcmltYXJ5TGlua3MuZm9yRWFjaCgoY3VycmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBjdXJyZW50RWxlbWVudENsYXNzZXMgPSBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICBjb25zdCBwcmVzZXJ2ZWRIdG1sVGFnID1cbiAgICAgIGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFnXCIpIHx8IGN1cnJlbnRFbGVtZW50LnRhZ05hbWU7XG5cbiAgICBjb25zdCBuZXdFbGVtZW50VHlwZSA9IGlzTW9iaWxlID8gXCJidXR0b25cIiA6IHByZXNlcnZlZEh0bWxUYWc7XG5cbiAgICAvLyBDcmVhdGUgdGhlIG5ldyBlbGVtZW50XG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudFR5cGUpO1xuICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY3VycmVudEVsZW1lbnRDbGFzc2VzKTtcbiAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXG4gICAgICBgJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1saW5rLS1idXR0b25gLFxuICAgICAgaXNNb2JpbGVcbiAgICApO1xuICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50RWxlbWVudC50ZXh0Q29udGVudDtcblxuICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhZ1wiLCBjdXJyZW50RWxlbWVudC50YWdOYW1lKTtcbiAgICAgIGNvbnN0IG1lbnVJZCA9IGAke1BSRUZJWH0tZm9vdGVyLW1lbnUtbGlzdC0ke01hdGguZmxvb3IoXG4gICAgICAgIE1hdGgucmFuZG9tKCkgKiAxMDAwMDBcbiAgICAgICl9YDtcblxuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1lbnVJZCk7XG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgIGN1cnJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBtZW51SWQpO1xuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIC8vIEluc2VydCB0aGUgbmV3IGVsZW1lbnQgYW5kIGRlbGV0ZSB0aGUgb2xkXG4gICAgY3VycmVudEVsZW1lbnQuYWZ0ZXIobmV3RWxlbWVudCk7XG4gICAgY3VycmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5jb25zdCByZXNpemUgPSAoZXZlbnQpID0+IHtcbiAgdG9nZ2xlSHRtbFRhZyhldmVudC5tYXRjaGVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1BhbmVsLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICAvLyBleHBvcnQgZm9yIHVzZSBlbHNld2hlcmVcbiAgICBISURFX01BWF9XSURUSCxcblxuICAgIGluaXQoKSB7XG4gICAgICB0b2dnbGVIdG1sVGFnKHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEgpO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdCA9IHdpbmRvdy5tYXRjaE1lZGlhKFxuICAgICAgICBgKG1heC13aWR0aDogJHtISURFX01BWF9XSURUSCAtIDAuMX1weClgXG4gICAgICApO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihyZXNpemUpO1xuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIHRoaXMubWVkaWFRdWVyeUxpc3QucmVtb3ZlTGlzdGVuZXIocmVzaXplKTtcbiAgICB9LFxuICB9XG4pO1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuLi8uLi91c2EtYWNjb3JkaW9uL3NyYy9pbmRleFwiKTtcbmNvbnN0IFNjcm9sbEJhcldpZHRoID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Njcm9sbGJhci13aWR0aFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IEhFQURFUiA9IGAuJHtQUkVGSVh9LWhlYWRlcmA7XG5jb25zdCBOQVYgPSBgLiR7UFJFRklYfS1uYXZgO1xuY29uc3QgTkFWX0NPTlRBSU5FUiA9IGAuJHtQUkVGSVh9LW5hdi1jb250YWluZXJgO1xuY29uc3QgTkFWX1BSSU1BUlkgPSBgLiR7UFJFRklYfS1uYXZfX3ByaW1hcnlgO1xuY29uc3QgTkFWX1BSSU1BUllfSVRFTSA9IGAuJHtQUkVGSVh9LW5hdl9fcHJpbWFyeS1pdGVtYDtcbmNvbnN0IE5BVl9DT05UUk9MID0gYGJ1dHRvbi4ke1BSRUZJWH0tbmF2X19saW5rYDtcbmNvbnN0IE5BVl9MSU5LUyA9IGAke05BVn0gYWA7XG5jb25zdCBOT05fTkFWX0hJRERFTl9BVFRSSUJVVEUgPSBgZGF0YS1uYXYtaGlkZGVuYDtcbmNvbnN0IE9QRU5FUlMgPSBgLiR7UFJFRklYfS1tZW51LWJ0bmA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgLiR7UFJFRklYfS1uYXZfX2Nsb3NlYDtcbmNvbnN0IE9WRVJMQVkgPSBgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IENMT1NFUlMgPSBgJHtDTE9TRV9CVVRUT059LCAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgVE9HR0xFUyA9IFtOQVYsIE9WRVJMQVldLmpvaW4oXCIsIFwiKTtcbmNvbnN0IE5PTl9OQVZfRUxFTUVOVFMgPSBgYm9keSAqOm5vdCgke0hFQURFUn0sICR7TkFWX0NPTlRBSU5FUn0sICR7TkFWfSwgJHtOQVZ9ICopOm5vdChbYXJpYS1oaWRkZW5dKWA7XG5jb25zdCBOT05fTkFWX0hJRERFTiA9IGBbJHtOT05fTkFWX0hJRERFTl9BVFRSSUJVVEV9XWA7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9IFwidXNhLWpzLW1vYmlsZS1uYXYtLWFjdGl2ZVwiO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9IFwiaXMtdmlzaWJsZVwiO1xuXG5sZXQgbmF2aWdhdGlvbjtcbmxldCBuYXZBY3RpdmU7XG5sZXQgbm9uTmF2RWxlbWVudHM7XG5cbmNvbnN0IGlzQWN0aXZlID0gKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcbmNvbnN0IFNDUk9MTEJBUl9XSURUSCA9IFNjcm9sbEJhcldpZHRoKCk7XG5jb25zdCBJTklUSUFMX1BBRERJTkcgPSB3aW5kb3dcbiAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuY29uc3QgVEVNUE9SQVJZX1BBRERJTkcgPSBgJHtcbiAgcGFyc2VJbnQoSU5JVElBTF9QQURESU5HLnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKSArXG4gIHBhcnNlSW50KFNDUk9MTEJBUl9XSURUSC5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMClcbn1weGA7XG5cbmNvbnN0IGhpZGVOb25OYXZJdGVtcyA9ICgpID0+IHtcbiAgY29uc3QgaGVhZGVyUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtIRUFERVJ9YCkucGFyZW50Tm9kZTtcbiAgbm9uTmF2RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9OQVZfRUxFTUVOVFMpO1xuXG4gIG5vbk5hdkVsZW1lbnRzLmZvckVhY2goKG5vbk5hdkVsZW1lbnQpID0+IHtcbiAgICBpZiAobm9uTmF2RWxlbWVudCAhPT0gaGVhZGVyUGFyZW50KSB7XG4gICAgICBub25OYXZFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xuICAgICAgbm9uTmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoTk9OX05BVl9ISURERU5fQVRUUklCVVRFLCBcIlwiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3Qgc2hvd05vbk5hdkl0ZW1zID0gKCkgPT4ge1xuICBub25OYXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX05BVl9ISURERU4pO1xuXG4gIGlmICghbm9uTmF2RWxlbWVudHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBSZW1vdmUgYXJpYS1oaWRkZW4gZnJvbSBub24taGVhZGVyIGVsZW1lbnRzXG4gIG5vbk5hdkVsZW1lbnRzLmZvckVhY2goKG5vbk5hdkVsZW1lbnQpID0+IHtcbiAgICBub25OYXZFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgIG5vbk5hdkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSk7XG4gIH0pO1xufTtcblxuLy8gVG9nZ2xlIGFsbCBub24taGVhZGVyIGVsZW1lbnRzICMzNTI3LlxuY29uc3QgdG9nZ2xlTm9uTmF2SXRlbXMgPSAoYWN0aXZlKSA9PiB7XG4gIGlmIChhY3RpdmUpIHtcbiAgICBoaWRlTm9uTmF2SXRlbXMoKTtcbiAgfSBlbHNlIHtcbiAgICBzaG93Tm9uTmF2SXRlbXMoKTtcbiAgfVxufTtcblxuY29uc3QgdG9nZ2xlTmF2ID0gKGFjdGl2ZSkgPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IGRvY3VtZW50O1xuICBjb25zdCBzYWZlQWN0aXZlID0gdHlwZW9mIGFjdGl2ZSA9PT0gXCJib29sZWFuXCIgPyBhY3RpdmUgOiAhaXNBY3RpdmUoKTtcblxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBzYWZlQWN0aXZlKTtcblxuICBzZWxlY3QoVE9HR0xFUykuZm9yRWFjaCgoZWwpID0+XG4gICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBzYWZlQWN0aXZlKVxuICApO1xuXG4gIG5hdmlnYXRpb24uZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcblxuICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPT09IFRFTVBPUkFSWV9QQURESU5HXG4gICAgICA/IElOSVRJQUxfUEFERElOR1xuICAgICAgOiBURU1QT1JBUllfUEFERElORztcblxuICB0b2dnbGVOb25OYXZJdGVtcyhzYWZlQWN0aXZlKTtcblxuICBpZiAoc2FmZUFjdGl2ZSAmJiBjbG9zZUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGFjdGl2YXRlZC4gRm9jdXMgb24gdGhlIGNsb3NlIGJ1dHRvbiwgd2hpY2ggaXNcbiAgICAvLyBqdXN0IGJlZm9yZSBhbGwgdGhlIG5hdiBlbGVtZW50cyBpbiB0aGUgdGFiIG9yZGVyLlxuICAgIGNsb3NlQnV0dG9uLmZvY3VzKCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgIXNhZmVBY3RpdmUgJiZcbiAgICBtZW51QnV0dG9uICYmXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShtZW51QnV0dG9uKS5kaXNwbGF5ICE9PSBcIm5vbmVcIlxuICApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZC4gV2UgZG9uJ3Qgd2FudCB0aGUgZm9jdXMgdG9cbiAgICAvLyBkaXNhcHBlYXIgaW50byB0aGUgdm9pZCwgc28gZm9jdXMgb24gdGhlIG1lbnUgYnV0dG9uIGlmIGl0J3NcbiAgICAvLyB2aXNpYmxlICh0aGlzIG1heSBoYXZlIGJlZW4gd2hhdCB0aGUgdXNlciB3YXMganVzdCBmb2N1c2VkIG9uLFxuICAgIC8vIGlmIHRoZXkgdHJpZ2dlcmVkIHRoZSBtb2JpbGUgbmF2IGJ5IG1pc3Rha2UpLlxuICAgIG1lbnVCdXR0b24uZm9jdXMoKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlQWN0aXZlO1xufTtcblxuY29uc3QgcmVzaXplID0gKCkgPT4ge1xuICBjb25zdCBjbG9zZXIgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcblxuICBpZiAoaXNBY3RpdmUoKSAmJiBjbG9zZXIgJiYgY2xvc2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoID09PSAwKSB7XG4gICAgLy8gV2hlbiB0aGUgbW9iaWxlIG5hdiBpcyBhY3RpdmUsIGFuZCB0aGUgY2xvc2UgYm94IGlzbid0IHZpc2libGUsXG4gICAgLy8gd2Uga25vdyB0aGUgdXNlcidzIHZpZXdwb3J0IGhhcyBiZWVuIHJlc2l6ZWQgdG8gYmUgbGFyZ2VyLlxuICAgIC8vIExldCdzIG1ha2UgdGhlIHBhZ2Ugc3RhdGUgY29uc2lzdGVudCBieSBkZWFjdGl2YXRpbmcgdGhlIG1vYmlsZSBuYXYuXG4gICAgbmF2aWdhdGlvbi50b2dnbGVOYXYuY2FsbChjbG9zZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuY29uc3Qgb25NZW51Q2xvc2UgPSAoKSA9PiBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKG5hdmlnYXRpb24sIGZhbHNlKTtcblxuY29uc3QgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duID0gKCkgPT4ge1xuICBpZiAoIW5hdkFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZShuYXZBY3RpdmUsIGZhbHNlKTtcbiAgbmF2QWN0aXZlID0gbnVsbDtcbn07XG5cbmNvbnN0IGZvY3VzTmF2QnV0dG9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudE5hdkl0ZW0gPSBldmVudC50YXJnZXQuY2xvc2VzdChOQVZfUFJJTUFSWV9JVEVNKTtcblxuICAvLyBPbmx5IHNoaWZ0IGZvY3VzIGlmIHdpdGhpbiBkcm9wZG93blxuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKE5BVl9DT05UUk9MKSkge1xuICAgIGNvbnN0IG5hdkNvbnRyb2wgPSBwYXJlbnROYXZJdGVtLnF1ZXJ5U2VsZWN0b3IoTkFWX0NPTlRST0wpO1xuICAgIGlmIChuYXZDb250cm9sKSB7XG4gICAgICBuYXZDb250cm9sLmZvY3VzKCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duKCk7XG4gIGZvY3VzTmF2QnV0dG9uKGV2ZW50KTtcbn07XG5cbm5hdmlnYXRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtOQVZfQ09OVFJPTF0oKSB7XG4gICAgICAgIC8vIElmIGFub3RoZXIgbmF2IGlzIG9wZW4sIGNsb3NlIGl0XG4gICAgICAgIGlmIChuYXZBY3RpdmUgIT09IHRoaXMpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgbGFzdCBjbGlja2VkIG5hdiBsaW5rIGVsZW1lbnQsIHNvIHdlXG4gICAgICAgIC8vIGNhbiBoaWRlIHRoZSBkcm9wZG93biBpZiBhbm90aGVyIGVsZW1lbnQgb24gdGhlIHBhZ2UgaXMgY2xpY2tlZFxuICAgICAgICBpZiAoIW5hdkFjdGl2ZSkge1xuICAgICAgICAgIG5hdkFjdGl2ZSA9IHRoaXM7XG4gICAgICAgICAgdG9nZ2xlKG5hdkFjdGl2ZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGlzIHNvIHRoZSBldmVudCBoYW5kbGVyIG9uIHRoZSBib2R5IGRvZXNuJ3QgZmlyZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgW0JPRFldOiBoaWRlQWN0aXZlTmF2RHJvcGRvd24sXG4gICAgICBbT1BFTkVSU106IHRvZ2dsZU5hdixcbiAgICAgIFtDTE9TRVJTXTogdG9nZ2xlTmF2LFxuICAgICAgW05BVl9MSU5LU10oKSB7XG4gICAgICAgIC8vIEEgbmF2aWdhdGlvbiBsaW5rIGhhcyBiZWVuIGNsaWNrZWQhIFdlIHdhbnQgdG8gY29sbGFwc2UgYW55XG4gICAgICAgIC8vIGhpZXJhcmNoaWNhbCBuYXZpZ2F0aW9uIFVJIGl0J3MgYSBwYXJ0IG9mLCBzbyB0aGF0IHRoZSB1c2VyXG4gICAgICAgIC8vIGNhbiBmb2N1cyBvbiB3aGF0ZXZlciB0aGV5J3ZlIGp1c3Qgc2VsZWN0ZWQuXG5cbiAgICAgICAgLy8gU29tZSBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBpbnNpZGUgYWNjb3JkaW9uczsgd2hlbiB0aGV5J3JlXG4gICAgICAgIC8vIGNsaWNrZWQsIHdlIHdhbnQgdG8gY29sbGFwc2UgdGhvc2UgYWNjb3JkaW9ucy5cbiAgICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuXG4gICAgICAgIGlmIChhY2MpIHtcbiAgICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goKGJ0bikgPT4gYWNjb3JkaW9uLmhpZGUoYnRuKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgbW9iaWxlIG5hdmlnYXRpb24gbWVudSBpcyBhY3RpdmUsIHdlIHdhbnQgdG8gaGlkZSBpdC5cbiAgICAgICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKG5hdmlnYXRpb24sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtOQVZfUFJJTUFSWV06IGtleW1hcCh7IEVzY2FwZTogaGFuZGxlRXNjYXBlIH0pLFxuICAgIH0sXG4gICAgZm9jdXNvdXQ6IHtcbiAgICAgIFtOQVZfUFJJTUFSWV0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmF2ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTkFWX1BSSU1BUlkpO1xuXG4gICAgICAgIGlmICghbmF2LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgY29uc3QgdHJhcENvbnRhaW5lciA9IHJvb3QubWF0Y2hlcyhOQVYpID8gcm9vdCA6IHJvb3QucXVlcnlTZWxlY3RvcihOQVYpO1xuXG4gICAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgICBuYXZpZ2F0aW9uLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0cmFwQ29udGFpbmVyLCB7XG4gICAgICAgICAgRXNjYXBlOiBvbk1lbnVDbG9zZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJlc2l6ZSgpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSk7XG4gICAgfSxcbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSwgZmFsc2UpO1xuICAgICAgbmF2QWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBmb2N1c1RyYXA6IG51bGwsXG4gICAgdG9nZ2xlTmF2LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRpb247XG4iLCJjb25zdCBvbmNlID0gcmVxdWlyZShcInJlY2VwdG9yL29uY2VcIik7XG5jb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zYW5pdGl6ZXJcIik7XG5cbmNvbnN0IENVUlJFTlRfQ0xBU1MgPSBgJHtQUkVGSVh9LWN1cnJlbnRgO1xuY29uc3QgSU5fUEFHRV9OQVZfVElUTEVfVEVYVCA9IFwiT24gdGhpcyBwYWdlXCI7XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9IRUFESU5HX0xFVkVMID0gXCJoNFwiO1xuY29uc3QgSU5fUEFHRV9OQVZfU0NST0xMX09GRlNFVCA9IDA7XG5jb25zdCBJTl9QQUdFX05BVl9ST09UX01BUkdJTiA9IFwiMHB4IDBweCAwcHggMHB4XCI7XG5jb25zdCBJTl9QQUdFX05BVl9USFJFU0hPTEQgPSBcIjFcIjtcbmNvbnN0IElOX1BBR0VfTkFWX0NMQVNTID0gYCR7UFJFRklYfS1pbi1wYWdlLW5hdmA7XG5jb25zdCBJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1MgPSBgJHtQUkVGSVh9LWFuY2hvcmA7XG5jb25zdCBJTl9QQUdFX05BVl9OQVZfQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX25hdmA7XG5jb25zdCBJTl9QQUdFX05BVl9MSVNUX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19saXN0YDtcbmNvbnN0IElOX1BBR0VfTkFWX0lURU1fQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX2l0ZW1gO1xuY29uc3QgSU5fUEFHRV9OQVZfTElOS19DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9fbGlua2A7XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9faGVhZGluZ2A7XG5jb25zdCBTVUJfSVRFTV9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0lURU1fQ0xBU1N9LS1zdWItaXRlbWA7XG5jb25zdCBNQUlOX0VMRU1FTlQgPSBcIm1haW5cIjtcblxuLyoqXG4gKiBTZXQgdGhlIGFjdGl2ZSBsaW5rIHN0YXRlIGZvciB0aGUgY3VycmVudGx5IG9ic2VydmVkIHNlY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNldEFjdGl2ZSA9IChlbCkgPT4ge1xuICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0lOX1BBR0VfTkFWX0xJTktfQ0xBU1N9YCk7XG4gIGVsLm1hcCgoaSkgPT4ge1xuICAgIGlmIChpLmlzSW50ZXJzZWN0aW5nID09PSB0cnVlICYmIGkuaW50ZXJzZWN0aW9uUmF0aW8gPj0gMSkge1xuICAgICAgYWxsTGlua3MuZm9yRWFjaCgobGluaykgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKENVUlJFTlRfQ0xBU1MpKTtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGBhW2hyZWY9XCIjJHtpLnRhcmdldC5pZH1cIl1gKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChDVVJSRU5UX0NMQVNTKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBub2RlIGxpc3Qgb2Ygc2VjdGlvbiBoZWFkaW5nc1xuICpcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKi9cbmNvbnN0IGdldFNlY3Rpb25IZWFkaW5ncyA9ICgpID0+IHtcbiAgY29uc3Qgc2VjdGlvbkhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBgJHtNQUlOX0VMRU1FTlR9IGgyLCAke01BSU5fRUxFTUVOVH0gaDNgXG4gICk7XG4gIHJldHVybiBzZWN0aW9uSGVhZGluZ3M7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIG5vZGUgbGlzdCBvZiBzZWN0aW9uIGFuY2hvciB0YWdzXG4gKlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXNcbiAqL1xuY29uc3QgZ2V0U2VjdGlvbkFuY2hvcnMgPSAoKSA9PiB7XG4gIGNvbnN0IHNlY3Rpb25BbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBgLiR7SU5fUEFHRV9OQVZfQU5DSE9SX0NMQVNTfWBcbiAgKTtcbiAgcmV0dXJuIHNlY3Rpb25BbmNob3JzO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQgZm9yIHRoZSBnaXZlbiBoZWFkaW5nIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MSGVhZGluZ0VsZW1lbnR9IGhlYWRpbmdcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVW5pcXVlIElEXG4gKi9cbmNvbnN0IGdldEhlYWRpbmdJZCA9IChoZWFkaW5nKSA9PiB7XG4gIGNvbnN0IGJhc2VJZCA9IGhlYWRpbmcudGV4dENvbnRlbnRcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC8vIFJlcGxhY2Ugbm9uLWFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIHdpdGggZGFzaGVzXG4gICAgLnJlcGxhY2UoL1teYS16XFxkXS9nLCBcIi1cIilcbiAgICAvLyBSZXBsYWNlIGEgc2VxdWVuY2Ugb2YgdHdvIG9yIG1vcmUgZGFzaGVzIHdpdGggYSBzaW5nbGUgZGFzaFxuICAgIC5yZXBsYWNlKC8tezIsfS9nLCBcIi1cIilcbiAgICAvLyBUcmltIGxlYWRpbmcgb3IgdHJhaWxpbmcgZGFzaCAodGhlcmUgc2hvdWxkIG9ubHkgZXZlciBiZSBvbmUpXG4gICAgLnJlcGxhY2UoL14tfC0kL2csIFwiXCIpO1xuXG4gIGxldCBpZDtcbiAgbGV0IHN1ZmZpeCA9IDA7XG4gIGRvIHtcbiAgICBpZCA9IGJhc2VJZDtcblxuICAgIC8vIFRvIGF2b2lkIGNvbmZsaWN0cyB3aXRoIGV4aXN0aW5nIElEcyBvbiB0aGUgcGFnZSwgbG9vcCBhbmQgYXBwZW5kIGFuXG4gICAgLy8gaW5jcmVtZW50ZWQgc3VmZml4IHVudGlsIGEgdW5pcXVlIElEIGlzIGZvdW5kLlxuICAgIHN1ZmZpeCArPSAxO1xuICAgIGlmIChzdWZmaXggPiAxKSB7XG4gICAgICBpZCArPSBgLSR7c3VmZml4fWA7XG4gICAgfVxuICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgc2VjdGlvbiBpZC9hbmNob3IgaGFzaCB3aXRob3V0IHRoZSBudW1iZXIgc2lnblxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gLSBJZCB2YWx1ZSB3aXRoIHRoZSBudW1iZXIgc2lnbiByZW1vdmVkXG4gKi9cbmNvbnN0IGdldFNlY3Rpb25JZCA9ICh2YWx1ZSkgPT4ge1xuICBsZXQgaWQ7XG5cbiAgLy8gQ2hlY2sgaWYgdmFsdWUgaXMgYW4gZXZlbnQgb3IgZWxlbWVudCBhbmQgZ2V0IHRoZSBjbGVhbmVkIHVwIGlkXG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlkID0gdmFsdWUuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IHZhbHVlLnRhcmdldC5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuLyoqXG4gKiBTY3JvbGwgc21vb3RobHkgdG8gYSBzZWN0aW9uIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IC0gSWQgdmFsdWUgd2l0aCB0aGUgbnVtYmVyIHNpZ24gcmVtb3ZlZFxuICovXG5jb25zdCBoYW5kbGVTY3JvbGxUb1NlY3Rpb24gPSAoZWwpID0+IHtcbiAgY29uc3QgaW5QYWdlTmF2RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtJTl9QQUdFX05BVl9DTEFTU31gKTtcbiAgY29uc3QgaW5QYWdlTmF2U2Nyb2xsT2Zmc2V0ID1cbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnNjcm9sbE9mZnNldCB8fCBJTl9QQUdFX05BVl9TQ1JPTExfT0ZGU0VUO1xuXG4gIHdpbmRvdy5zY3JvbGwoe1xuICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgIHRvcDogZWwub2Zmc2V0VG9wIC0gaW5QYWdlTmF2U2Nyb2xsT2Zmc2V0LFxuICAgIGJsb2NrOiBcInN0YXJ0XCIsXG4gIH0pO1xuXG4gIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKSAhPT0gZWwuaWQpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgXCJcIiwgYCMke2VsLmlkfWApO1xuICB9XG59O1xuXG4vKipcbiAqIFNjcm9sbHMgdGhlIHBhZ2UgdG8gdGhlIHNlY3Rpb24gY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudCBoYXNoIGZyYWdtZW50LCBpZiBvbmUgZXhpc3RzLlxuICovXG5jb25zdCBzY3JvbGxUb0N1cnJlbnRTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBoYXNoRnJhZ21lbnQgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgaWYgKGhhc2hGcmFnbWVudCkge1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2hGcmFnbWVudCk7XG4gICAgaWYgKGFuY2hvclRhZykge1xuICAgICAgaGFuZGxlU2Nyb2xsVG9TZWN0aW9uKGFuY2hvclRhZyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgaW4tcGFnZSBuYXZpZ2F0aW9uIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluUGFnZU5hdkVsIFRoZSBpbi1wYWdlIG5hdiBlbGVtZW50XG4gKi9cbmNvbnN0IGNyZWF0ZUluUGFnZU5hdiA9IChpblBhZ2VOYXZFbCkgPT4ge1xuICBjb25zdCBpblBhZ2VOYXZUaXRsZVRleHQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGl0bGVUZXh0IHx8IElOX1BBR0VfTkFWX1RJVExFX1RFWFRcbiAgfWA7XG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlSGVhZGluZ0xldmVsID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnRpdGxlSGVhZGluZ0xldmVsIHx8IElOX1BBR0VfTkFWX1RJVExFX0hFQURJTkdfTEVWRUxcbiAgfWA7XG4gIGNvbnN0IGluUGFnZU5hdlJvb3RNYXJnaW4gPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQucm9vdE1hcmdpbiB8fCBJTl9QQUdFX05BVl9ST09UX01BUkdJTlxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2VGhyZXNob2xkID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnRocmVzaG9sZCB8fCBJTl9QQUdFX05BVl9USFJFU0hPTERcbiAgfWA7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICByb290OiBudWxsLFxuICAgIHJvb3RNYXJnaW46IGluUGFnZU5hdlJvb3RNYXJnaW4sXG4gICAgdGhyZXNob2xkOiBbaW5QYWdlTmF2VGhyZXNob2xkXSxcbiAgfTtcblxuICBjb25zdCBzZWN0aW9uSGVhZGluZ3MgPSBnZXRTZWN0aW9uSGVhZGluZ3MoKTtcbiAgY29uc3QgaW5QYWdlTmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgaW5QYWdlTmF2LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaW5QYWdlTmF2VGl0bGVUZXh0KTtcbiAgaW5QYWdlTmF2LmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfTkFWX0NMQVNTKTtcblxuICBjb25zdCBpblBhZ2VOYXZUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaW5QYWdlTmF2VGl0bGVIZWFkaW5nTGV2ZWwpO1xuICBpblBhZ2VOYXZUaXRsZS5jbGFzc0xpc3QuYWRkKElOX1BBR0VfTkFWX1RJVExFX0NMQVNTKTtcbiAgaW5QYWdlTmF2VGl0bGUuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICBpblBhZ2VOYXZUaXRsZS50ZXh0Q29udGVudCA9IGluUGFnZU5hdlRpdGxlVGV4dDtcbiAgaW5QYWdlTmF2LmFwcGVuZENoaWxkKGluUGFnZU5hdlRpdGxlKTtcblxuICBjb25zdCBpblBhZ2VOYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBpblBhZ2VOYXZMaXN0LmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfTElTVF9DTEFTUyk7XG4gIGluUGFnZU5hdi5hcHBlbmRDaGlsZChpblBhZ2VOYXZMaXN0KTtcblxuICBzZWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IHRleHRDb250ZW50T2ZMaW5rID0gZWwudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChJTl9QQUdFX05BVl9JVEVNX0NMQVNTKTtcbiAgICBpZiAodGFnID09PSBcImgzXCIpIHtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoU1VCX0lURU1fQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IGhlYWRpbmdJZCA9IGdldEhlYWRpbmdJZChlbCk7XG5cbiAgICBuYXZMaW5rcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjJHtoZWFkaW5nSWR9YCk7XG4gICAgbmF2TGlua3Muc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgSU5fUEFHRV9OQVZfTElOS19DTEFTUyk7XG4gICAgbmF2TGlua3MudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudE9mTGluaztcblxuICAgIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBoZWFkaW5nSWQpO1xuICAgIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1MpO1xuICAgIGVsLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgYW5jaG9yVGFnKTtcblxuICAgIGluUGFnZU5hdkxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKG5hdkxpbmtzKTtcbiAgfSk7XG5cbiAgaW5QYWdlTmF2RWwuYXBwZW5kQ2hpbGQoaW5QYWdlTmF2KTtcblxuICBjb25zdCBhbmNob3JUYWdzID0gZ2V0U2VjdGlvbkFuY2hvcnMoKTtcbiAgY29uc3Qgb2JzZXJ2ZVNlY3Rpb25zID0gbmV3IHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcihzZXRBY3RpdmUsIG9wdGlvbnMpO1xuXG4gIGFuY2hvclRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgb2JzZXJ2ZVNlY3Rpb25zLm9ic2VydmUodGFnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGxpbmtcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUNsaWNrRnJvbUxpbmsgPSAoZWwpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvU2Nyb2xsVG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsLmhhc2gpO1xuICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24oZWxlbWVudFRvU2Nyb2xsVG8pO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVudGVyIGV2ZW50IGZyb20gYSBsaW5rIHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGluLXBhZ2UgbmF2IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21MaW5rID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IGlkID0gZ2V0U2VjdGlvbklkKGV2ZW50KTtcbiAgY29uc3QgdGFyZ2V0QW5jaG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBjb25zdCB0YXJnZXQgPSB0YXJnZXRBbmNob3IucGFyZW50RWxlbWVudDtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIDApO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJibHVyXCIsXG4gICAgICBvbmNlKCgpID0+IHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIC0xKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxuICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24odGFyZ2V0QW5jaG9yKTtcbn07XG5cbmNvbnN0IGluUGFnZU5hdmlnYXRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBoYW5kbGVDbGlja0Zyb21MaW5rKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXToga2V5bWFwKHtcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpbmssXG4gICAgICB9KSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoYC4ke0lOX1BBR0VfTkFWX0NMQVNTfWAsIHJvb3QpLmZvckVhY2goKGluUGFnZU5hdkVsKSA9PiB7XG4gICAgICAgIGNyZWF0ZUluUGFnZU5hdihpblBhZ2VOYXZFbCk7XG4gICAgICAgIHNjcm9sbFRvQ3VycmVudFNlY3Rpb24oKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5QYWdlTmF2aWdhdGlvbjtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTUFTS0VEX0NMQVNTID0gYCR7UFJFRklYfS1tYXNrZWRgO1xuY29uc3QgTUFTS0VEID0gYC4ke01BU0tFRF9DTEFTU31gO1xuY29uc3QgTUFTSyA9IGAke1BSRUZJWH0taW5wdXQtbWFza2A7XG5jb25zdCBNQVNLX0NPTlRFTlQgPSBgJHtNQVNLfS0tY29udGVudGA7XG5jb25zdCBQTEFDRUhPTERFUiA9IFwicGxhY2Vob2xkZXJcIjtcbmNvbnN0IENPTlRFWFQgPSBcImZvcm1cIjtcblxuLy8gVXNlciBkZWZpbmVkIFZhbHVlc1xuY29uc3QgbWFza2VkTnVtYmVyID0gXCJfI2REbU15WTlcIjtcbmNvbnN0IG1hc2tlZExldHRlciA9IFwiQVwiO1xuXG4vLyByZXBsYWNlcyBlYWNoIG1hc2tlZCBpbnB1dCB3aXRoIGEgc2hlbGwgY29udGFpbmluZyB0aGUgaW5wdXQgYW5kIGl0J3MgbWFzay5cbmNvbnN0IGNyZWF0ZU1hc2tlZElucHV0U2hlbGwgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoYCR7UExBQ0VIT0xERVJ9YCk7XG4gIGlmIChwbGFjZWhvbGRlcikge1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBwbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtcGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXIpO1xuICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZShgJHtQTEFDRUhPTERFUn1gKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzaGVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBzaGVsbC5jbGFzc0xpc3QuYWRkKE1BU0spO1xuICBzaGVsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1hc2tcIiwgcGxhY2Vob2xkZXIpO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29udGVudC5jbGFzc0xpc3QuYWRkKE1BU0tfQ09OVEVOVCk7XG4gIGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBjb250ZW50LmlkID0gYCR7aW5wdXQuaWR9TWFza2A7XG4gIGNvbnRlbnQudGV4dENvbnRlbnQgPSBwbGFjZWhvbGRlcjtcblxuICBzaGVsbC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgaW5wdXQuY2xvc2VzdChDT05URVhUKS5pbnNlcnRCZWZvcmUoc2hlbGwsIGlucHV0KTtcbiAgc2hlbGwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xufTtcblxuY29uc3Qgc2V0VmFsdWVPZk1hc2sgPSAoZWwpID0+IHtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gZWw7XG4gIGNvbnN0IHBsYWNlaG9sZGVyVmFsID0gYCR7ZWwuZGF0YXNldC5wbGFjZWhvbGRlci5zdWJzdHIodmFsdWUubGVuZ3RoKX1gO1xuXG4gIGNvbnN0IHRoZUlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICB0aGVJRWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIFt0aGVJRWwsIHBsYWNlaG9sZGVyVmFsXTtcbn07XG5cbmNvbnN0IHN0cmlwcGVkVmFsdWUgPSAoaXNDaGFyc2V0UHJlc2VudCwgdmFsdWUpID0+XG4gIGlzQ2hhcnNldFByZXNlbnQgPyB2YWx1ZS5yZXBsYWNlKC9cXFcvZywgXCJcIikgOiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG5cbmNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZSkgPT4gIU51bWJlci5pc05hTihwYXJzZUludCh2YWx1ZSwgMTApKTtcblxuY29uc3QgaXNMZXR0ZXIgPSAodmFsdWUpID0+ICh2YWx1ZSA/IHZhbHVlLm1hdGNoKC9bQS1aXS9pKSA6IGZhbHNlKTtcblxuY29uc3QgaGFuZGxlQ3VycmVudFZhbHVlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGlzQ2hhcnNldFByZXNlbnQgPSBlbC5kYXRhc2V0LmNoYXJzZXQ7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gaXNDaGFyc2V0UHJlc2VudCB8fCBlbC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICBjb25zdCB7IHZhbHVlIH0gPSBlbDtcbiAgY29uc3QgbGVuID0gcGxhY2Vob2xkZXIubGVuZ3RoO1xuICBsZXQgbmV3VmFsdWUgPSBcIlwiO1xuICBsZXQgaTtcbiAgbGV0IGNoYXJJbmRleDtcblxuICBjb25zdCBzdHJpcHBlZFZhbCA9IHN0cmlwcGVkVmFsdWUoaXNDaGFyc2V0UHJlc2VudCwgdmFsdWUpO1xuXG4gIGZvciAoaSA9IDAsIGNoYXJJbmRleCA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgIGNvbnN0IGlzSW50ID0gaXNJbnRlZ2VyKHN0cmlwcGVkVmFsW2NoYXJJbmRleF0pO1xuICAgIGNvbnN0IGlzTGV0ID0gaXNMZXR0ZXIoc3RyaXBwZWRWYWxbY2hhckluZGV4XSk7XG4gICAgY29uc3QgbWF0Y2hlc051bWJlciA9IG1hc2tlZE51bWJlci5pbmRleE9mKHBsYWNlaG9sZGVyW2ldKSA+PSAwO1xuICAgIGNvbnN0IG1hdGNoZXNMZXR0ZXIgPSBtYXNrZWRMZXR0ZXIuaW5kZXhPZihwbGFjZWhvbGRlcltpXSkgPj0gMDtcblxuICAgIGlmIChcbiAgICAgIChtYXRjaGVzTnVtYmVyICYmIGlzSW50KSB8fFxuICAgICAgKGlzQ2hhcnNldFByZXNlbnQgJiYgbWF0Y2hlc0xldHRlciAmJiBpc0xldClcbiAgICApIHtcbiAgICAgIG5ld1ZhbHVlICs9IHN0cmlwcGVkVmFsW2NoYXJJbmRleF07XG4gICAgICBjaGFySW5kZXggKz0gMTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKCFpc0NoYXJzZXRQcmVzZW50ICYmICFpc0ludCAmJiBtYXRjaGVzTnVtYmVyKSB8fFxuICAgICAgKGlzQ2hhcnNldFByZXNlbnQgJiZcbiAgICAgICAgKChtYXRjaGVzTGV0dGVyICYmICFpc0xldCkgfHwgKG1hdGNoZXNOdW1iZXIgJiYgIWlzSW50KSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlICs9IHBsYWNlaG9sZGVyW2ldO1xuICAgIH1cbiAgICAvLyBicmVhayBpZiBubyBjaGFyYWN0ZXJzIGxlZnQgYW5kIHRoZSBwYXR0ZXJuIGlzIG5vbi1zcGVjaWFsIGNoYXJhY3RlclxuICAgIGlmIChzdHJpcHBlZFZhbFtjaGFySW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdWYWx1ZTtcbn07XG5cbmNvbnN0IGhhbmRsZVZhbHVlQ2hhbmdlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGlucHV0RWwgPSBlbDtcbiAgY29uc3QgaWQgPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICBpbnB1dEVsLnZhbHVlID0gaGFuZGxlQ3VycmVudFZhbHVlKGlucHV0RWwpO1xuXG4gIGNvbnN0IG1hc2tWYWwgPSBzZXRWYWx1ZU9mTWFzayhlbCk7XG4gIGNvbnN0IG1hc2tFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2lkfU1hc2tgKTtcbiAgbWFza0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgbWFza0VsLnJlcGxhY2VDaGlsZHJlbihtYXNrVmFsWzBdLCBtYXNrVmFsWzFdKTtcbn07XG5cbmNvbnN0IGlucHV0TWFza0V2ZW50cyA9IHtcbiAga2V5dXA6IHtcbiAgICBbTUFTS0VEXSgpIHtcbiAgICAgIGhhbmRsZVZhbHVlQ2hhbmdlKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBpbnB1dE1hc2sgPSBiZWhhdmlvcihpbnB1dE1hc2tFdmVudHMsIHtcbiAgaW5pdChyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKE1BU0tFRCwgcm9vdCkuZm9yRWFjaCgobWFza2VkSW5wdXQpID0+IHtcbiAgICAgIGNyZWF0ZU1hc2tlZElucHV0U2hlbGwobWFza2VkSW5wdXQpO1xuICAgIH0pO1xuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRNYXNrO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5cbmNvbnN0IENPTlRBSU5FUiA9IGAuJHtQUkVGSVh9LWlucHV0LWdyb3VwYDtcbmNvbnN0IElOUFVUID0gYCR7Q09OVEFJTkVSfSAuJHtQUkVGSVh9LWlucHV0YDtcbmNvbnN0IERFQ09SQVRJT04gPSBgJHtDT05UQUlORVJ9IC4ke1BSRUZJWH0taW5wdXQtcHJlZml4LCAke0NPTlRBSU5FUn0gLiR7UFJFRklYfS1pbnB1dC1zdWZmaXhgO1xuY29uc3QgRk9DVVNfQ0xBU1MgPSBcImlzLWZvY3VzZWRcIjtcblxuZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgZWwuY2xvc2VzdChDT05UQUlORVIpLnF1ZXJ5U2VsZWN0b3IoYC4ke1BSRUZJWH0taW5wdXRgKS5mb2N1cygpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVGb2N1cygpIHtcbiAgdGhpcy5jbG9zZXN0KENPTlRBSU5FUikuY2xhc3NMaXN0LmFkZChGT0NVU19DTEFTUyk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gIHRoaXMuY2xvc2VzdChDT05UQUlORVIpLmNsYXNzTGlzdC5yZW1vdmUoRk9DVVNfQ0xBU1MpO1xufVxuXG5jb25zdCBpbnB1dFByZWZpeFN1ZmZpeCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0RFQ09SQVRJT05dKCkge1xuICAgICAgICBzZXRGb2N1cyh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KElOUFVULCByb290KS5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhbmRsZUZvY3VzLCBmYWxzZSk7XG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1ciwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dFByZWZpeFN1ZmZpeDtcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuLi8uLi91c2EtYWNjb3JkaW9uL3NyYy9pbmRleFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IExBTkdVQUdFID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VgO1xuY29uc3QgTEFOR1VBR0VfU1VCID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VfX3N1Ym1lbnVgO1xuY29uc3QgTEFOR1VBR0VfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlX19wcmltYXJ5YDtcbmNvbnN0IExBTkdVQUdFX1BSSU1BUllfSVRFTSA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlX19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTEFOR1VBR0VfQ09OVFJPTCA9IGBidXR0b24uJHtQUkVGSVh9LWxhbmd1YWdlX19saW5rYDtcbmNvbnN0IExBTkdVQUdFX0xJTktTID0gYCR7TEFOR1VBR0V9IGFgO1xuXG5sZXQgbGFuZ3VhZ2VTZWxlY3RvcjtcbmxldCBsYW5ndWFnZUFjdGl2ZTtcblxuY29uc3Qgb25MYW5ndWFnZUNsb3NlID0gKCkgPT5cbiAgbGFuZ3VhZ2VTZWxlY3Rvci50b2dnbGVMYW5ndWFnZS5jYWxsKGxhbmd1YWdlU2VsZWN0b3IsIGZhbHNlKTtcblxuY29uc3QgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24gPSAoKSA9PiB7XG4gIGlmICghbGFuZ3VhZ2VBY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGUobGFuZ3VhZ2VBY3RpdmUsIGZhbHNlKTtcbiAgbGFuZ3VhZ2VBY3RpdmUgPSBudWxsO1xufTtcblxuY29uc3QgZm9jdXNMYW5ndWFnZUJ1dHRvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwYXJlbnRMYW5ndWFnZUl0ZW0gPSBldmVudC50YXJnZXQuY2xvc2VzdChMQU5HVUFHRV9QUklNQVJZX0lURU0pO1xuXG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoTEFOR1VBR0VfQ09OVFJPTCkpIHtcbiAgICBwYXJlbnRMYW5ndWFnZUl0ZW0ucXVlcnlTZWxlY3RvcihMQU5HVUFHRV9DT05UUk9MKS5mb2N1cygpO1xuICB9XG59O1xuXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgZm9jdXNMYW5ndWFnZUJ1dHRvbihldmVudCk7XG59O1xuXG5sYW5ndWFnZVNlbGVjdG9yID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbTEFOR1VBR0VfQ09OVFJPTF0oKSB7XG4gICAgICAgIGlmIChsYW5ndWFnZUFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhbmd1YWdlQWN0aXZlID09PSB0aGlzKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFsYW5ndWFnZUFjdGl2ZSkge1xuICAgICAgICAgIGxhbmd1YWdlQWN0aXZlID0gdGhpcztcbiAgICAgICAgICB0b2dnbGUobGFuZ3VhZ2VBY3RpdmUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIFtCT0RZXTogaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24sXG4gICAgICBbTEFOR1VBR0VfTElOS1NdKCkge1xuICAgICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG5cbiAgICAgICAgaWYgKGFjYykge1xuICAgICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaCgoYnRuKSA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtMQU5HVUFHRV9QUklNQVJZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW0xBTkdVQUdFX1BSSU1BUlldKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTEFOR1VBR0VfUFJJTUFSWSk7XG5cbiAgICAgICAgaWYgKCFsYW5ndWFnZS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgY29uc3QgdHJhcENvbnRhaW5lciA9IHJvb3QubWF0Y2hlcyhMQU5HVUFHRV9TVUIpXG4gICAgICAgID8gcm9vdFxuICAgICAgICA6IHJvb3QucXVlcnlTZWxlY3RvcihMQU5HVUFHRV9TVUIpO1xuXG4gICAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgICBsYW5ndWFnZVNlbGVjdG9yLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0cmFwQ29udGFpbmVyLCB7XG4gICAgICAgICAgRXNjYXBlOiBvbkxhbmd1YWdlQ2xvc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICBsYW5ndWFnZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxhbmd1YWdlU2VsZWN0b3I7XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IFNjcm9sbEJhcldpZHRoID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Njcm9sbGJhci13aWR0aFwiKTtcblxuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTU9EQUxfQ0xBU1NOQU1FID0gYCR7UFJFRklYfS1tb2RhbGA7XG5jb25zdCBPVkVSTEFZX0NMQVNTTkFNRSA9IGAke01PREFMX0NMQVNTTkFNRX0tb3ZlcmxheWA7XG5jb25zdCBXUkFQUEVSX0NMQVNTTkFNRSA9IGAke01PREFMX0NMQVNTTkFNRX0td3JhcHBlcmA7XG5jb25zdCBPUEVORVJfQVRUUklCVVRFID0gXCJkYXRhLW9wZW4tbW9kYWxcIjtcbmNvbnN0IENMT1NFUl9BVFRSSUJVVEUgPSBcImRhdGEtY2xvc2UtbW9kYWxcIjtcbmNvbnN0IEZPUkNFX0FDVElPTl9BVFRSSUJVVEUgPSBcImRhdGEtZm9yY2UtYWN0aW9uXCI7XG5jb25zdCBOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURSA9IGBkYXRhLW1vZGFsLWhpZGRlbmA7XG5jb25zdCBNT0RBTCA9IGAuJHtNT0RBTF9DTEFTU05BTUV9YDtcbmNvbnN0IElOSVRJQUxfRk9DVVMgPSBgLiR7V1JBUFBFUl9DTEFTU05BTUV9ICpbZGF0YS1mb2N1c11gO1xuY29uc3QgQ0xPU0VfQlVUVE9OID0gYCR7V1JBUFBFUl9DTEFTU05BTUV9ICpbJHtDTE9TRVJfQVRUUklCVVRFfV1gO1xuY29uc3QgT1BFTkVSUyA9IGAqWyR7T1BFTkVSX0FUVFJJQlVURX1dW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IENMT1NFUlMgPSBgJHtDTE9TRV9CVVRUT059LCAuJHtPVkVSTEFZX0NMQVNTTkFNRX06bm90KFske0ZPUkNFX0FDVElPTl9BVFRSSUJVVEV9XSlgO1xuY29uc3QgTk9OX01PREFMUyA9IGBib2R5ID4gKjpub3QoLiR7V1JBUFBFUl9DTEFTU05BTUV9KTpub3QoW2FyaWEtaGlkZGVuXSlgO1xuY29uc3QgTk9OX01PREFMU19ISURERU4gPSBgWyR7Tk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEV9XWA7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9IFwidXNhLWpzLW1vZGFsLS1hY3RpdmVcIjtcbmNvbnN0IFBSRVZFTlRfQ0xJQ0tfQ0xBU1MgPSBcInVzYS1qcy1uby1jbGlja1wiO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9IFwiaXMtdmlzaWJsZVwiO1xuY29uc3QgSElEREVOX0NMQVNTID0gXCJpcy1oaWRkZW5cIjtcblxubGV0IG1vZGFsO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG5jb25zdCBTQ1JPTExCQVJfV0lEVEggPSBTY3JvbGxCYXJXaWR0aCgpO1xuY29uc3QgSU5JVElBTF9QQURESU5HID0gd2luZG93XG4gIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gIC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbmNvbnN0IFRFTVBPUkFSWV9QQURESU5HID0gYCR7XG4gIHBhcnNlSW50KElOSVRJQUxfUEFERElORy5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMCkgK1xuICBwYXJzZUludChTQ1JPTExCQVJfV0lEVEgucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApXG59cHhgO1xuXG4vKipcbiAqICBJcyBib3VuZCB0byBlc2NhcGUga2V5LCBjbG9zZXMgbW9kYWwgd2hlblxuICovXG5jb25zdCBvbk1lbnVDbG9zZSA9ICgpID0+IHtcbiAgbW9kYWwudG9nZ2xlTW9kYWwuY2FsbChtb2RhbCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiAgVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIGEgbW9kYWwgd2luZG93XG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICogQHJldHVybnMge2Jvb2xlYW59IHNhZmVBY3RpdmUgaWYgbW9iaWxlIGlzIG9wZW5cbiAqL1xuZnVuY3Rpb24gdG9nZ2xlTW9kYWwoZXZlbnQpIHtcbiAgbGV0IG9yaWdpbmFsT3BlbmVyO1xuICBsZXQgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHsgYm9keSB9ID0gZG9jdW1lbnQ7XG4gIGNvbnN0IHNhZmVBY3RpdmUgPSAhaXNBY3RpdmUoKTtcbiAgY29uc3QgbW9kYWxJZCA9IGNsaWNrZWRFbGVtZW50XG4gICAgPyBjbGlja2VkRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzYS1tb2RhbC13cmFwcGVyLmlzLXZpc2libGVcIik7XG4gIGNvbnN0IHRhcmdldE1vZGFsID0gc2FmZUFjdGl2ZVxuICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZClcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNhLW1vZGFsLXdyYXBwZXIuaXMtdmlzaWJsZVwiKTtcblxuICAvLyBpZiB0aGVyZSBpcyBubyBtb2RhbCB3ZSByZXR1cm4gZWFybHlcbiAgaWYgKCF0YXJnZXRNb2RhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IG9wZW5Gb2N1c0VsID0gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihJTklUSUFMX0ZPQ1VTKVxuICAgID8gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihJTklUSUFMX0ZPQ1VTKVxuICAgIDogdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihcIi51c2EtbW9kYWxcIik7XG4gIGNvbnN0IHJldHVybkZvY3VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgdGFyZ2V0TW9kYWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1vcGVuZXJcIilcbiAgKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gdGFyZ2V0TW9kYWwuZ2V0QXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUpO1xuXG4gIC8vIFNldHMgdGhlIGNsaWNrZWQgZWxlbWVudCB0byB0aGUgY2xvc2UgYnV0dG9uXG4gIC8vIHNvIGVzYyBrZXkgYWx3YXlzIGNsb3NlcyBtb2RhbFxuICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIgJiYgdGFyZ2V0TW9kYWwgIT09IG51bGwpIHtcbiAgICBjbGlja2VkRWxlbWVudCA9IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgfVxuXG4gIC8vIFdoZW4gd2UncmUgbm90IGhpdHRpbmcgdGhlIGVzY2FwZSBrZXnigKZcbiAgaWYgKGNsaWNrZWRFbGVtZW50KSB7XG4gICAgLy8gTWFrZSBzdXJlIHdlIGNsaWNrIHRoZSBvcGVuZXJcbiAgICAvLyBJZiBpdCBkb2Vzbid0IGhhdmUgYW4gSUQsIG1ha2Ugb25lXG4gICAgLy8gU3RvcmUgaWQgYXMgZGF0YSBhdHRyaWJ1dGUgb24gbW9kYWxcbiAgICBpZiAoY2xpY2tlZEVsZW1lbnQuaGFzQXR0cmlidXRlKE9QRU5FUl9BVFRSSUJVVEUpKSB7XG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gbnVsbCkge1xuICAgICAgICBvcmlnaW5hbE9wZW5lciA9IGBtb2RhbC0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkgKyAxMDAwMDB9YDtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcmlnaW5hbE9wZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmlnaW5hbE9wZW5lciA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICB9XG4gICAgICB0YXJnZXRNb2RhbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9wZW5lclwiLCBvcmlnaW5hbE9wZW5lcik7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBiYXNpY2FsbHkgc3RvcHMgdGhlIHByb3BhZ2F0aW9uIGlmIHRoZSBlbGVtZW50XG4gICAgLy8gaXMgaW5zaWRlIHRoZSBtb2RhbCBhbmQgbm90IGEgY2xvc2UgYnV0dG9uIG9yXG4gICAgLy8gZWxlbWVudCBpbnNpZGUgYSBjbG9zZSBidXR0b25cbiAgICBpZiAoY2xpY2tlZEVsZW1lbnQuY2xvc2VzdChgLiR7TU9EQUxfQ0xBU1NOQU1FfWApKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNsaWNrZWRFbGVtZW50Lmhhc0F0dHJpYnV0ZShDTE9TRVJfQVRUUklCVVRFKSB8fFxuICAgICAgICBjbGlja2VkRWxlbWVudC5jbG9zZXN0KGBbJHtDTE9TRVJfQVRUUklCVVRFfV1gKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmcuIG1vdmUgb24uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoSElEREVOX0NMQVNTLCAhc2FmZUFjdGl2ZSk7XG5cbiAgLy8gSWYgdXNlciBpcyBmb3JjZWQgdG8gdGFrZSBhbiBhY3Rpb24sIGFkZGluZ1xuICAvLyBhIGNsYXNzIHRvIHRoZSBib2R5IHRoYXQgcHJldmVudHMgY2xpY2tpbmcgdW5kZXJuZWF0aFxuICAvLyBvdmVybGF5XG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoUFJFVkVOVF9DTElDS19DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIH1cblxuICAvLyBBY2NvdW50IGZvciBjb250ZW50IHNoaWZ0aW5nIGZyb20gYm9keSBvdmVyZmxvdzogaGlkZGVuXG4gIC8vIFdlIG9ubHkgY2hlY2sgcGFkZGluZ1JpZ2h0IGluIGNhc2UgYXBwcyBhcmUgYWRkaW5nIG90aGVyIHByb3BlcnRpZXNcbiAgLy8gdG8gdGhlIGJvZHkgZWxlbWVudFxuICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPT09IFRFTVBPUkFSWV9QQURESU5HXG4gICAgICA/IElOSVRJQUxfUEFERElOR1xuICAgICAgOiBURU1QT1JBUllfUEFERElORztcblxuICAvLyBIYW5kbGUgdGhlIGZvY3VzIGFjdGlvbnNcbiAgaWYgKHNhZmVBY3RpdmUgJiYgb3BlbkZvY3VzRWwpIHtcbiAgICAvLyBUaGUgbW9kYWwgd2luZG93IGlzIG9wZW5lZC4gRm9jdXMgaXMgc2V0IHRvIGNsb3NlIGJ1dHRvbi5cblxuICAgIC8vIEJpbmRzIGVzY2FwZSBrZXkgaWYgd2UncmUgbm90IGZvcmNpbmdcbiAgICAvLyB0aGUgdXNlciB0byB0YWtlIGFuIGFjdGlvblxuICAgIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCwge1xuICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlcyBmb2N1cyBzZXR0aW5nIGFuZCBpbnRlcmFjdGlvbnNcbiAgICBtb2RhbC5mb2N1c1RyYXAudXBkYXRlKHNhZmVBY3RpdmUpO1xuICAgIG9wZW5Gb2N1c0VsLmZvY3VzKCk7XG5cbiAgICAvLyBIaWRlcyBldmVyeXRoaW5nIHRoYXQgaXMgbm90IHRoZSBtb2RhbCBmcm9tIHNjcmVlbiByZWFkZXJzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTU9EQUxTKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFLCBcIlwiKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghc2FmZUFjdGl2ZSAmJiBtZW51QnV0dG9uICYmIHJldHVybkZvY3VzKSB7XG4gICAgLy8gVGhlIG1vZGFsIHdpbmRvdyBpcyBjbG9zZWQuXG4gICAgLy8gTm9uLW1vZGFscyBub3cgYWNjZXNpYmxlIHRvIHNjcmVlbiByZWFkZXJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9NT0RBTFNfSElEREVOKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG4gICAgICBub25Nb2RhbC5yZW1vdmVBdHRyaWJ1dGUoTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUpO1xuICAgIH0pO1xuXG4gICAgLy8gRm9jdXMgaXMgcmV0dXJuZWQgdG8gdGhlIG9wZW5lclxuICAgIHJldHVybkZvY3VzLmZvY3VzKCk7XG4gICAgbW9kYWwuZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlQWN0aXZlO1xufVxuXG4vKipcbiAqICBCdWlsZHMgbW9kYWwgd2luZG93IGZyb20gYmFzZSBIVE1MXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYmFzZUNvbXBvbmVudCB0aGUgbW9kYWwgaHRtbCBpbiB0aGUgRE9NXG4gKi9cbmNvbnN0IHNldFVwTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBvdmVybGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbW9kYWxJRCA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IGFyaWFMYWJlbGxlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGNvbnN0IGFyaWFEZXNjcmliZWRCeSA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gYmFzZUNvbXBvbmVudC5oYXNBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSlcbiAgICA/IGJhc2VDb21wb25lbnQuaGFzQXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUpXG4gICAgOiBmYWxzZTtcbiAgLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIHdoZXJlIG1vZGFsIGlzIGZvciBjbGVhbnVwXG4gIGNvbnN0IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoYGRhdGEtcGxhY2Vob2xkZXItZm9yYCwgbW9kYWxJRCk7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIGZvciAoXG4gICAgbGV0IGF0dHJpYnV0ZUluZGV4ID0gMDtcbiAgICBhdHRyaWJ1dGVJbmRleCA8IG1vZGFsQ29udGVudC5hdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICBhdHRyaWJ1dGVJbmRleCArPSAxXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG1vZGFsQ29udGVudC5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XTtcbiAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc2V0QXR0cmlidXRlKFxuICAgICAgYGRhdGEtb3JpZ2luYWwtJHthdHRyaWJ1dGUubmFtZX1gLFxuICAgICAgYXR0cmlidXRlLnZhbHVlXG4gICAgKTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudC5hZnRlcihvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIpO1xuXG4gIC8vIFJlYnVpbGQgdGhlIG1vZGFsIGVsZW1lbnRcbiAgbW9kYWxDb250ZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG1vZGFsV3JhcHBlciwgbW9kYWxDb250ZW50KTtcbiAgbW9kYWxXcmFwcGVyLmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG4gIG1vZGFsQ29udGVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShvdmVybGF5RGl2LCBtb2RhbENvbnRlbnQpO1xuICBvdmVybGF5RGl2LmFwcGVuZENoaWxkKG1vZGFsQ29udGVudCk7XG5cbiAgLy8gQWRkIGNsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcbiAgbW9kYWxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTKTtcbiAgbW9kYWxXcmFwcGVyLmNsYXNzTGlzdC5hZGQoV1JBUFBFUl9DTEFTU05BTUUpO1xuICBvdmVybGF5RGl2LmNsYXNzTGlzdC5hZGQoT1ZFUkxBWV9DTEFTU05BTUUpO1xuXG4gIC8vIFNldCBhdHRyaWJ1dGVzXG4gIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xuICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgbW9kYWxJRCk7XG5cbiAgaWYgKGFyaWFMYWJlbGxlZEJ5KSB7XG4gICAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiLCBhcmlhTGFiZWxsZWRCeSk7XG4gIH1cblxuICBpZiAoYXJpYURlc2NyaWJlZEJ5KSB7XG4gICAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgYXJpYURlc2NyaWJlZEJ5KTtcbiAgfVxuXG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUsIFwidHJ1ZVwiKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgYmFzZSBlbGVtZW50IEhUTUxcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgYmFzZUNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuXG4gIC8vIEFkZCBhcmlhLWNvbnRyb2xzXG4gIGNvbnN0IG1vZGFsQ2xvc2VycyA9IG1vZGFsV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKENMT1NFUlMpO1xuICBtb2RhbENsb3NlcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1vZGFsSUQpO1xuICB9KTtcblxuICAvLyBNb3ZlIGFsbCBtb2RhbHMgdG8gdGhlIGVuZCBvZiB0aGUgRE9NLiBEb2luZyB0aGlzIGFsbG93cyB1cyB0b1xuICAvLyBtb3JlIGVhc2lseSBmaW5kIHRoZSBlbGVtZW50cyB0byBoaWRlIGZyb20gc2NyZWVuIHJlYWRlcnNcbiAgLy8gd2hlbiB0aGUgbW9kYWwgaXMgb3Blbi5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbFdyYXBwZXIpO1xufTtcblxuY29uc3QgY2xlYW5VcE1vZGFsID0gKGJhc2VDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbW9kYWxDb250ZW50ID0gYmFzZUNvbXBvbmVudDtcbiAgY29uc3QgbW9kYWxXcmFwcGVyID0gbW9kYWxDb250ZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgY29uc3QgbW9kYWxJRCA9IG1vZGFsV3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcblxuICBjb25zdCBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS1wbGFjZWhvbGRlci1mb3I9XCIke21vZGFsSUR9XCJdYFxuICApO1xuICBpZiAob3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyKSB7XG4gICAgZm9yIChcbiAgICAgIGxldCBhdHRyaWJ1dGVJbmRleCA9IDA7XG4gICAgICBhdHRyaWJ1dGVJbmRleCA8IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hdHRyaWJ1dGVzLmxlbmd0aDtcbiAgICAgIGF0dHJpYnV0ZUluZGV4ICs9IDFcbiAgICApIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hdHRyaWJ1dGVzW2F0dHJpYnV0ZUluZGV4XTtcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5zdGFydHNXaXRoKFwiZGF0YS1vcmlnaW5hbC1cIikpIHtcbiAgICAgICAgLy8gZGF0YS1vcmlnaW5hbC0gaXMgMTQgbG9uZ1xuICAgICAgICBtb2RhbENvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLnN1YnN0cigxNCksIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLmFmdGVyKG1vZGFsQ29udGVudCk7XG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXJcbiAgICApO1xuICB9XG5cbiAgbW9kYWxXcmFwcGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobW9kYWxXcmFwcGVyKTtcbn07XG5cbm1vZGFsID0ge1xuICBpbml0KHJvb3QpIHtcbiAgICBzZWxlY3RPck1hdGNoZXMoTU9EQUwsIHJvb3QpLmZvckVhY2goKG1vZGFsV2luZG93KSA9PiB7XG4gICAgICBjb25zdCBtb2RhbElkID0gbW9kYWxXaW5kb3cuaWQ7XG4gICAgICBzZXRVcE1vZGFsKG1vZGFsV2luZG93KTtcblxuICAgICAgLy8gdGhpcyB3aWxsIHF1ZXJ5IGFsbCBvcGVuZXJzIGFuZCBjbG9zZXJzIGluY2x1ZGluZyB0aGUgb3ZlcmxheVxuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWApXG4gICAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgLy8gVHVybiBhbmNob3IgbGlua3MgaW50byBidXR0b25zIGJlY2F1c2Ugb2ZcbiAgICAgICAgICAvLyBWb2ljZU92ZXIgb24gU2FmYXJpXG4gICAgICAgICAgaWYgKGl0ZW0ubm9kZU5hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDYW4gdW5jb21tZW50IHdoZW4gYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiIGlzIHN1cHBvcnRlZFxuICAgICAgICAgIC8vIGh0dHBzOi8vYTExeXN1cHBvcnQuaW8vdGVjaC9hcmlhL2FyaWEtaGFzcG9wdXBfYXR0cmlidXRlXG4gICAgICAgICAgLy8gTW9zdCBzY3JlZW4gcmVhZGVycyBzdXBwb3J0IGFyaWEtaGFzcG9wdXAsIGJ1dCBtaWdodCBhbm5vdW5jZVxuICAgICAgICAgIC8vIGFzIG9wZW5pbmcgYSBtZW51IGlmIFwiZGlhbG9nXCIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgICAvLyBpdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtaGFzcG9wdXBcIiwgXCJkaWFsb2dcIik7XG5cbiAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICB0ZWFyZG93bihyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKE1PREFMLCByb290KS5mb3JFYWNoKChtb2RhbFdpbmRvdykgPT4ge1xuICAgICAgY2xlYW5VcE1vZGFsKG1vZGFsV2luZG93KTtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSBtb2RhbFdpbmRvdy5pZDtcblxuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWApXG4gICAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RhbCkpO1xuICAgIH0pO1xuICB9LFxuICBmb2N1c1RyYXA6IG51bGwsXG4gIHRvZ2dsZU1vZGFsLFxuICBvbihyb290KSB7XG4gICAgdGhpcy5pbml0KHJvb3QpO1xuICB9LFxuICBvZmYocm9vdCkge1xuICAgIHRoaXMudGVhcmRvd24ocm9vdCk7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsO1xuIiwiY29uc3QgaWdub3JlID0gcmVxdWlyZShcInJlY2VwdG9yL2lnbm9yZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcblxuY29uc3QgQlVUVE9OID0gXCIuanMtc2VhcmNoLWJ1dHRvblwiO1xuY29uc3QgRk9STSA9IFwiLmpzLXNlYXJjaC1mb3JtXCI7XG5jb25zdCBJTlBVVCA9IFwiW3R5cGU9c2VhcmNoXVwiO1xuY29uc3QgQ09OVEVYVCA9IFwiaGVhZGVyXCI7IC8vIFhYWFxuXG5sZXQgbGFzdEJ1dHRvbjtcblxuY29uc3QgZ2V0Rm9ybSA9IChidXR0b24pID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQucXVlcnlTZWxlY3RvcihGT1JNKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcblxuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICR7Rk9STX0gZm91bmQgZm9yIHNlYXJjaCB0b2dnbGUgaW4gJHtDT05URVhUfSFgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIGJ1dHRvbi5oaWRkZW4gPSBhY3RpdmU7XG4gIGZvcm0uaGlkZGVuID0gIWFjdGl2ZTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGlmICghYWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cbiAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gIGNvbnN0IGxpc3RlbmVyID0gaWdub3JlKGZvcm0sICgpID0+IHtcbiAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgaGlkZVNlYXJjaC5jYWxsKGxhc3RCdXR0b24pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0pO1xuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gIC8vIElFMTEgYW5kIEVkZ2Ugd2lsbCBhY3R1YWxseSBjYWxsIHRoZSBsaXN0ZW5lciAqaW1tZWRpYXRlbHkqIGJlY2F1c2VcbiAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gIC8vIGlmIGFueSwgYmVmb3JlIHdlIGF0dGFjaCB0aGUgbGlzdGVuZXIuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICB9LCAwKTtcbn07XG5cbmZ1bmN0aW9uIHNob3dTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGVTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl06IHNob3dTZWFyY2gsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQodGFyZ2V0KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCB0YXJnZXQpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoO1xuIiwiY29uc3Qgb25jZSA9IHJlcXVpcmUoXCJyZWNlcHRvci9vbmNlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNraXBuYXZbaHJlZl49XCIjXCJdLCAuJHtQUkVGSVh9LWZvb3Rlcl9fcmV0dXJuLXRvLXRvcCBbaHJlZl49XCIjXCJdYDtcbmNvbnN0IE1BSU5DT05URU5UID0gXCJtYWluLWNvbnRlbnRcIjtcblxuZnVuY3Rpb24gc2V0VGFiaW5kZXgoKSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IGVuY29kZVVSSSh0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBpZCA9PT0gXCIjXCIgPyBNQUlOQ09OVEVOVCA6IGlkLnNsaWNlKDEpXG4gICk7XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zdHlsZS5vdXRsaW5lID0gXCIwXCI7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIDApO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJibHVyXCIsXG4gICAgICBvbmNlKCgpID0+IHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIC0xKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtMSU5LXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgVEFCTEUgPSBgLiR7UFJFRklYfS10YWJsZWA7XG5jb25zdCBTT1JURUQgPSBcImFyaWEtc29ydFwiO1xuY29uc3QgQVNDRU5ESU5HID0gXCJhc2NlbmRpbmdcIjtcbmNvbnN0IERFU0NFTkRJTkcgPSBcImRlc2NlbmRpbmdcIjtcbmNvbnN0IFNPUlRfT1ZFUlJJREUgPSBcImRhdGEtc29ydC12YWx1ZVwiO1xuY29uc3QgU09SVF9CVVRUT05fQ0xBU1MgPSBgJHtQUkVGSVh9LXRhYmxlX19oZWFkZXJfX2J1dHRvbmA7XG5jb25zdCBTT1JUX0JVVFRPTiA9IGAuJHtTT1JUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgU09SVEFCTEVfSEVBREVSID0gYHRoW2RhdGEtc29ydGFibGVdYDtcbmNvbnN0IEFOTk9VTkNFTUVOVF9SRUdJT04gPSBgLiR7UFJFRklYfS10YWJsZV9fYW5ub3VuY2VtZW50LXJlZ2lvblthcmlhLWxpdmU9XCJwb2xpdGVcIl1gO1xuXG4vKiogR2V0cyB0aGUgZGF0YS1zb3J0LXZhbHVlIGF0dHJpYnV0ZSB2YWx1ZSwgaWYgcHJvdmlkZWQg4oCUIG90aGVyd2lzZSwgZ2V0c1xuICogdGhlIGlubmVyVGV4dCBvciB0ZXh0Q29udGVudCDigJQgb2YgdGhlIGNoaWxkIGVsZW1lbnQgKEhUTUxUYWJsZUNlbGxFbGVtZW50KVxuICogYXQgdGhlIHNwZWNpZmllZCBpbmRleCBvZiB0aGUgZ2l2ZW4gdGFibGUgcm93XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge2FycmF5PEhUTUxUYWJsZVJvd0VsZW1lbnQ+fSB0clxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZ2V0Q2VsbFZhbHVlID0gKHRyLCBpbmRleCkgPT5cbiAgdHIuY2hpbGRyZW5baW5kZXhdLmdldEF0dHJpYnV0ZShTT1JUX09WRVJSSURFKSB8fFxuICB0ci5jaGlsZHJlbltpbmRleF0uaW5uZXJUZXh0IHx8XG4gIHRyLmNoaWxkcmVuW2luZGV4XS50ZXh0Q29udGVudDtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgdmFsdWVzIG9mIHR3byByb3cgYXJyYXkgaXRlbXMgYXQgdGhlIGdpdmVuIGluZGV4LCB0aGVuIHNvcnRzIGJ5IHRoZSBnaXZlbiBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgY29tcGFyZUZ1bmN0aW9uID0gKGluZGV4LCBpc0FzY2VuZGluZykgPT4gKHRoaXNSb3csIG5leHRSb3cpID0+IHtcbiAgLy8gZ2V0IHZhbHVlcyB0byBjb21wYXJlIGZyb20gZGF0YSBhdHRyaWJ1dGUgb3IgY2VsbCBjb250ZW50XG4gIGNvbnN0IHZhbHVlMSA9IGdldENlbGxWYWx1ZShpc0FzY2VuZGluZyA/IHRoaXNSb3cgOiBuZXh0Um93LCBpbmRleCk7XG4gIGNvbnN0IHZhbHVlMiA9IGdldENlbGxWYWx1ZShpc0FzY2VuZGluZyA/IG5leHRSb3cgOiB0aGlzUm93LCBpbmRleCk7XG5cbiAgLy8gaWYgbmVpdGhlciB2YWx1ZSBpcyBlbXB0eSwgYW5kIGlmIGJvdGggdmFsdWVzIGFyZSBhbHJlYWR5IG51bWJlcnMsIGNvbXBhcmUgbnVtZXJpY2FsbHlcbiAgaWYgKFxuICAgIHZhbHVlMSAmJlxuICAgIHZhbHVlMiAmJlxuICAgICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlMSkpICYmXG4gICAgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUyKSlcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlMSAtIHZhbHVlMjtcbiAgfVxuICAvLyBPdGhlcndpc2UsIGNvbXBhcmUgYWxwaGFiZXRpY2FsbHkgYmFzZWQgb24gY3VycmVudCB1c2VyIGxvY2FsZVxuICByZXR1cm4gdmFsdWUxLnRvU3RyaW5nKCkubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIG5hdmlnYXRvci5sYW5ndWFnZSwge1xuICAgIG51bWVyaWM6IHRydWUsXG4gICAgaWdub3JlUHVuY3R1YXRpb246IHRydWUsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgY29sdW1uIGhlYWRlcnMgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogdGFibGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGVcbiAqIEByZXR1cm4ge2FycmF5PEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0Q29sdW1uSGVhZGVycyA9ICh0YWJsZSkgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gc2VsZWN0KFNPUlRBQkxFX0hFQURFUiwgdGFibGUpO1xuICByZXR1cm4gaGVhZGVycy5maWx0ZXIoKGhlYWRlcikgPT4gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpID09PSB0YWJsZSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgYnV0dG9uIGxhYmVsIHdpdGhpbiB0aGUgZ2l2ZW4gaGVhZGVyIGVsZW1lbnQsIHJlc2V0dGluZyBpdFxuICogdG8gdGhlIGRlZmF1bHQgc3RhdGUgKHJlYWR5IHRvIHNvcnQgYXNjZW5kaW5nKSBpZiBpdCdzIG5vIGxvbmdlciBzb3J0ZWRcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5jb25zdCB1cGRhdGVTb3J0TGFiZWwgPSAoaGVhZGVyKSA9PiB7XG4gIGNvbnN0IGhlYWRlck5hbWUgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICBjb25zdCBzb3J0ZWRBc2NlbmRpbmcgPSBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgY29uc3QgaXNTb3J0ZWQgPVxuICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HIHx8XG4gICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBERVNDRU5ESU5HIHx8XG4gICAgZmFsc2U7XG4gIGNvbnN0IGhlYWRlckxhYmVsID0gYCR7aGVhZGVyTmFtZX0nLCBzb3J0YWJsZSBjb2x1bW4sIGN1cnJlbnRseSAke1xuICAgIGlzU29ydGVkXG4gICAgICA/IGAke3NvcnRlZEFzY2VuZGluZyA/IGBzb3J0ZWQgJHtBU0NFTkRJTkd9YCA6IGBzb3J0ZWQgJHtERVNDRU5ESU5HfWB9YFxuICAgICAgOiBcInVuc29ydGVkXCJcbiAgfWA7XG4gIGNvbnN0IGhlYWRlckJ1dHRvbkxhYmVsID0gYENsaWNrIHRvIHNvcnQgYnkgJHtoZWFkZXJOYW1lfSBpbiAke1xuICAgIHNvcnRlZEFzY2VuZGluZyA/IERFU0NFTkRJTkcgOiBBU0NFTkRJTkdcbiAgfSBvcmRlci5gO1xuICBoZWFkZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBoZWFkZXJMYWJlbCk7XG4gIGhlYWRlci5xdWVyeVNlbGVjdG9yKFNPUlRfQlVUVE9OKS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBoZWFkZXJCdXR0b25MYWJlbCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYXJpYS1zb3J0IGF0dHJpYnV0ZSBvbiB0aGUgZ2l2ZW4gaGVhZGVyIGVsZW1lbnQsIGFuZCByZXNldCB0aGUgbGFiZWwgYW5kIGJ1dHRvbiBpY29uXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqL1xuY29uc3QgdW5zZXRTb3J0ID0gKGhlYWRlcikgPT4ge1xuICBoZWFkZXIucmVtb3ZlQXR0cmlidXRlKFNPUlRFRCk7XG4gIHVwZGF0ZVNvcnRMYWJlbChoZWFkZXIpO1xufTtcblxuLyoqXG4gKiBTb3J0IHJvd3MgZWl0aGVyIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nLCBiYXNlZCBvbiBhIGdpdmVuIGhlYWRlcidzIGFyaWEtc29ydCBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICogQHBhcmFtIHtib29sZWFufSBpc0FzY2VuZGluZ1xuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzb3J0Um93cyA9IChoZWFkZXIsIGlzQXNjZW5kaW5nKSA9PiB7XG4gIGhlYWRlci5zZXRBdHRyaWJ1dGUoU09SVEVELCBpc0FzY2VuZGluZyA9PT0gdHJ1ZSA/IERFU0NFTkRJTkcgOiBBU0NFTkRJTkcpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcblxuICBjb25zdCB0Ym9keSA9IGhlYWRlci5jbG9zZXN0KFRBQkxFKS5xdWVyeVNlbGVjdG9yKFwidGJvZHlcIik7XG5cbiAgLy8gV2UgY2FuIHVzZSBBcnJheS5mcm9tKCkgYW5kIEFycmF5LnNvcnQoKSBpbnN0ZWFkIG9uY2Ugd2UgZHJvcCBJRTExIHN1cHBvcnQsIGxpa2VseSBpbiB0aGUgc3VtbWVyIG9mIDIwMjFcbiAgLy9cbiAgLy8gQXJyYXkuZnJvbSh0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCd0cicpLnNvcnQoXG4gIC8vICAgY29tcGFyZUZ1bmN0aW9uKFxuICAvLyAgICAgQXJyYXkuZnJvbShoZWFkZXIucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZihoZWFkZXIpLFxuICAvLyAgICAgIWlzQXNjZW5kaW5nKVxuICAvLyAgIClcbiAgLy8gLmZvckVhY2godHIgPT4gdGJvZHkuYXBwZW5kQ2hpbGQodHIpICk7XG5cbiAgLy8gW10uc2xpY2UuY2FsbCgpIHR1cm5zIGFycmF5LWxpa2Ugc2V0cyBpbnRvIHRydWUgYXJyYXlzIHNvIHRoYXQgd2UgY2FuIHNvcnQgdGhlbVxuICBjb25zdCBhbGxSb3dzID0gW10uc2xpY2UuY2FsbCh0Ym9keS5xdWVyeVNlbGVjdG9yQWxsKFwidHJcIikpO1xuICBjb25zdCBhbGxIZWFkZXJzID0gW10uc2xpY2UuY2FsbChoZWFkZXIucGFyZW50Tm9kZS5jaGlsZHJlbik7XG4gIGNvbnN0IHRoaXNIZWFkZXJJbmRleCA9IGFsbEhlYWRlcnMuaW5kZXhPZihoZWFkZXIpO1xuICBhbGxSb3dzLnNvcnQoY29tcGFyZUZ1bmN0aW9uKHRoaXNIZWFkZXJJbmRleCwgIWlzQXNjZW5kaW5nKSkuZm9yRWFjaCgodHIpID0+IHtcbiAgICBbXS5zbGljZVxuICAgICAgLmNhbGwodHIuY2hpbGRyZW4pXG4gICAgICAuZm9yRWFjaCgodGQpID0+IHRkLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtc29ydC1hY3RpdmVcIikpO1xuICAgIHRyLmNoaWxkcmVuW3RoaXNIZWFkZXJJbmRleF0uc2V0QXR0cmlidXRlKFwiZGF0YS1zb3J0LWFjdGl2ZVwiLCB0cnVlKTtcbiAgICB0Ym9keS5hcHBlbmRDaGlsZCh0cik7XG4gIH0pO1xuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGxpdmUgcmVnaW9uIGltbWVkaWF0ZWx5IGZvbGxvd2luZyB0aGUgdGFibGUgd2hlbmV2ZXIgc29ydCBjaGFuZ2VzLlxuICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSB0YWJsZVxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gc29ydGVkSGVhZGVyXG4gKi9cblxuY29uc3QgdXBkYXRlTGl2ZVJlZ2lvbiA9ICh0YWJsZSwgc29ydGVkSGVhZGVyKSA9PiB7XG4gIGNvbnN0IGNhcHRpb24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yKFwiY2FwdGlvblwiKS5pbm5lclRleHQ7XG4gIGNvbnN0IHNvcnRlZEFzY2VuZGluZyA9IHNvcnRlZEhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HO1xuICBjb25zdCBoZWFkZXJMYWJlbCA9IHNvcnRlZEhlYWRlci5pbm5lclRleHQ7XG4gIGNvbnN0IGxpdmVSZWdpb24gPSB0YWJsZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGlmIChsaXZlUmVnaW9uICYmIGxpdmVSZWdpb24ubWF0Y2hlcyhBTk5PVU5DRU1FTlRfUkVHSU9OKSkge1xuICAgIGNvbnN0IHNvcnRBbm5vdW5jZW1lbnQgPSBgVGhlIHRhYmxlIG5hbWVkIFwiJHtjYXB0aW9ufVwiIGlzIG5vdyBzb3J0ZWQgYnkgJHtoZWFkZXJMYWJlbH0gaW4gJHtcbiAgICAgIHNvcnRlZEFzY2VuZGluZyA/IEFTQ0VORElORyA6IERFU0NFTkRJTkdcbiAgICB9IG9yZGVyLmA7XG4gICAgbGl2ZVJlZ2lvbi5pbm5lclRleHQgPSBzb3J0QW5ub3VuY2VtZW50O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBUYWJsZSBjb250YWluaW5nIGEgc29ydGFibGUgY29sdW1uIGhlYWRlciBpcyBub3QgZm9sbG93ZWQgYnkgYW4gYXJpYS1saXZlIHJlZ2lvbi5gXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBUb2dnbGUgYSBoZWFkZXIncyBzb3J0IHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBpc0FzY2VuZGluZyBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKi9cbmNvbnN0IHRvZ2dsZVNvcnQgPSAoaGVhZGVyLCBpc0FzY2VuZGluZykgPT4ge1xuICBjb25zdCB0YWJsZSA9IGhlYWRlci5jbG9zZXN0KFRBQkxFKTtcbiAgbGV0IHNhZmVBc2NlbmRpbmcgPSBpc0FzY2VuZGluZztcbiAgaWYgKHR5cGVvZiBzYWZlQXNjZW5kaW5nICE9PSBcImJvb2xlYW5cIikge1xuICAgIHNhZmVBc2NlbmRpbmcgPSBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgfVxuXG4gIGlmICghdGFibGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7U09SVEFCTEVfSEVBREVSfSBpcyBtaXNzaW5nIG91dGVyICR7VEFCTEV9YCk7XG4gIH1cblxuICBzYWZlQXNjZW5kaW5nID0gc29ydFJvd3MoaGVhZGVyLCBpc0FzY2VuZGluZyk7XG5cbiAgaWYgKHNhZmVBc2NlbmRpbmcpIHtcbiAgICBnZXRDb2x1bW5IZWFkZXJzKHRhYmxlKS5mb3JFYWNoKChvdGhlckhlYWRlcikgPT4ge1xuICAgICAgaWYgKG90aGVySGVhZGVyICE9PSBoZWFkZXIpIHtcbiAgICAgICAgdW5zZXRTb3J0KG90aGVySGVhZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1cGRhdGVMaXZlUmVnaW9uKHRhYmxlLCBoZWFkZXIpO1xuICB9XG59O1xuXG4vKipcbiAqKiBJbnNlcnRzIGEgYnV0dG9uIHdpdGggaWNvbiBpbnNpZGUgYSBzb3J0YWJsZSBoZWFkZXJcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5cbmNvbnN0IGNyZWF0ZUhlYWRlckJ1dHRvbiA9IChoZWFkZXIpID0+IHtcbiAgY29uc3QgYnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidXR0b25FbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIGJ1dHRvbkVsLmNsYXNzTGlzdC5hZGQoU09SVF9CVVRUT05fQ0xBU1MpO1xuICAvLyBJQ09OX1NPVVJDRVxuICBidXR0b25FbC5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgPHN2ZyBjbGFzcz1cIiR7UFJFRklYfS1pY29uXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICA8ZyBjbGFzcz1cImRlc2NlbmRpbmdcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTcgMTdMMTUuNTkgMTUuNTlMMTIuOTk5OSAxOC4xN1YySDEwLjk5OTlWMTguMTdMOC40MSAxNS41OEw3IDE3TDExLjk5OTkgMjJMMTcgMTdaXCIgLz5cbiAgICA8L2c+XG4gICAgPGcgY2xhc3M9XCJhc2NlbmRpbmdcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwYXRoIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsIDEyLCAxMilcIiBkPVwiTTE3IDE3TDE1LjU5IDE1LjU5TDEyLjk5OTkgMTguMTdWMkgxMC45OTk5VjE4LjE3TDguNDEgMTUuNThMNyAxN0wxMS45OTk5IDIyTDE3IDE3WlwiIC8+XG4gICAgPC9nPlxuICAgIDxnIGNsYXNzPVwidW5zb3J0ZWRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjE1LjE3IDE1IDEzIDE3LjE3IDEzIDYuODMgMTUuMTcgOSAxNi41OCA3LjU5IDEyIDMgNy40MSA3LjU5IDguODMgOSAxMSA2LjgzIDExIDE3LjE3IDguODMgMTUgNy40MiAxNi40MSAxMiAyMSAxNi41OSAxNi40MSAxNS4xNyAxNVwiLz5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuICBgO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoYnV0dG9uRWwpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcbn07XG5cbmNvbnN0IHRhYmxlID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbU09SVF9CVVRUT05dKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRvZ2dsZVNvcnQoXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoU09SVEFCTEVfSEVBREVSKSxcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xvc2VzdChTT1JUQUJMRV9IRUFERVIpLmdldEF0dHJpYnV0ZShTT1JURUQpID09PVxuICAgICAgICAgICAgQVNDRU5ESU5HXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIGNvbnN0IHNvcnRhYmxlSGVhZGVycyA9IHNlbGVjdChTT1JUQUJMRV9IRUFERVIsIHJvb3QpO1xuICAgICAgc29ydGFibGVIZWFkZXJzLmZvckVhY2goKGhlYWRlcikgPT4gY3JlYXRlSGVhZGVyQnV0dG9uKGhlYWRlcikpO1xuXG4gICAgICBjb25zdCBmaXJzdFNvcnRlZCA9IHNvcnRhYmxlSGVhZGVycy5maWx0ZXIoXG4gICAgICAgIChoZWFkZXIpID0+XG4gICAgICAgICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkcgfHxcbiAgICAgICAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IERFU0NFTkRJTkdcbiAgICAgIClbMF07XG4gICAgICBpZiAodHlwZW9mIGZpcnN0U29ydGVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8vIG5vIHNvcnRhYmxlIGhlYWRlcnMgZm91bmRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc29ydERpciA9IGZpcnN0U29ydGVkLmdldEF0dHJpYnV0ZShTT1JURUQpO1xuICAgICAgaWYgKHNvcnREaXIgPT09IEFTQ0VORElORykge1xuICAgICAgICB0b2dnbGVTb3J0KGZpcnN0U29ydGVkLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc29ydERpciA9PT0gREVTQ0VORElORykge1xuICAgICAgICB0b2dnbGVTb3J0KGZpcnN0U29ydGVkLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBUQUJMRSxcbiAgICBTT1JUQUJMRV9IRUFERVIsXG4gICAgU09SVF9CVVRUT04sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdGFibGU7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7XG4gIENPTUJPX0JPWF9DTEFTUyxcbiAgZW5oYW5jZUNvbWJvQm94LFxufSA9IHJlcXVpcmUoXCIuLi8uLi91c2EtY29tYm8tYm94L3NyYy9pbmRleFwiKTtcblxuY29uc3QgVElNRV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LXRpbWUtcGlja2VyYDtcbmNvbnN0IFRJTUVfUElDS0VSID0gYC4ke1RJTUVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBNQVhfVElNRSA9IDYwICogMjQgLSAxO1xuY29uc3QgTUlOX1RJTUUgPSAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMzA7XG5jb25zdCBNSU5fU1RFUCA9IDE7XG5cbmNvbnN0IEZJTFRFUl9EQVRBU0VUID0ge1xuICBmaWx0ZXI6XG4gICAgXCIwP3t7IGhvdXJRdWVyeUZpbHRlciB9fTp7e21pbnV0ZVF1ZXJ5RmlsdGVyfX0uKnt7IGFwUXVlcnlGaWx0ZXIgfX1tP1wiLFxuICBhcFF1ZXJ5RmlsdGVyOiBcIihbYXBdKVwiLFxuICBob3VyUXVlcnlGaWx0ZXI6IFwiKFsxLTldWzAtMl0/KVwiLFxuICBtaW51dGVRdWVyeUZpbHRlcjogXCJbXFxcXGRdKzooWzAtOV17MCwyfSlcIixcbn07XG5cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgb2YgaGg6bW0gaW50byBtaW51dGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWVTdHIgdGhlIHRpbWUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIG1pbnV0ZXNcbiAqL1xuY29uc3QgcGFyc2VUaW1lU3RyaW5nID0gKHRpbWVTdHIpID0+IHtcbiAgbGV0IG1pbnV0ZXM7XG5cbiAgaWYgKHRpbWVTdHIpIHtcbiAgICBjb25zdCBbaG91cnMsIG1pbnNdID0gdGltZVN0ci5zcGxpdChcIjpcIikubWFwKChzdHIpID0+IHtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkgdmFsdWUgPSBwYXJzZWQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAoaG91cnMgIT0gbnVsbCAmJiBtaW5zICE9IG51bGwpIHtcbiAgICAgIG1pbnV0ZXMgPSBob3VycyAqIDYwICsgbWlucztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWludXRlcztcbn07XG5cbi8qKlxuICogRW5oYW5jZSBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlIHBpY2tlciBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIFRoZSBpbml0aWFsIHdyYXBwaW5nIGVsZW1lbnQgb2YgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB0cmFuc2Zvcm1UaW1lUGlja2VyID0gKGVsKSA9PiB7XG4gIGNvbnN0IHRpbWVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoVElNRV9QSUNLRVIpO1xuXG4gIGNvbnN0IGluaXRpYWxJbnB1dEVsID0gdGltZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0YCk7XG5cbiAgaWYgKCFpbml0aWFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtUSU1FX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuXG4gIFtcImlkXCIsIFwibmFtZVwiLCBcInJlcXVpcmVkXCIsIFwiYXJpYS1sYWJlbFwiLCBcImFyaWEtbGFiZWxsZWRieVwiXS5mb3JFYWNoKFxuICAgIChuYW1lKSA9PiB7XG4gICAgICBpZiAoaW5pdGlhbElucHV0RWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5pdGlhbElucHV0RWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgICBzZWxlY3RFbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICBpbml0aWFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIGNvbnN0IHBhZFplcm9zID0gKHZhbHVlLCBsZW5ndGgpID0+IGAwMDAwJHt2YWx1ZX1gLnNsaWNlKC1sZW5ndGgpO1xuXG4gIGNvbnN0IGdldFRpbWVDb250ZXh0ID0gKG1pbnV0ZXMpID0+IHtcbiAgICBjb25zdCBtaW51dGUgPSBtaW51dGVzICUgNjA7XG4gICAgY29uc3QgaG91cjI0ID0gTWF0aC5mbG9vcihtaW51dGVzIC8gNjApO1xuICAgIGNvbnN0IGhvdXIxMiA9IGhvdXIyNCAlIDEyIHx8IDEyO1xuICAgIGNvbnN0IGFtcG0gPSBob3VyMjQgPCAxMiA/IFwiYW1cIiA6IFwicG1cIjtcblxuICAgIHJldHVybiB7XG4gICAgICBtaW51dGUsXG4gICAgICBob3VyMjQsXG4gICAgICBob3VyMTIsXG4gICAgICBhbXBtLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWluVGltZSA9IE1hdGgubWF4KFxuICAgIE1JTl9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5taW5UaW1lKSB8fCBNSU5fVElNRVxuICApO1xuICBjb25zdCBtYXhUaW1lID0gTWF0aC5taW4oXG4gICAgTUFYX1RJTUUsXG4gICAgcGFyc2VUaW1lU3RyaW5nKHRpbWVQaWNrZXJFbC5kYXRhc2V0Lm1heFRpbWUpIHx8IE1BWF9USU1FXG4gICk7XG4gIGNvbnN0IHN0ZXAgPSBNYXRoLmZsb29yKFxuICAgIE1hdGgubWF4KE1JTl9TVEVQLCB0aW1lUGlja2VyRWwuZGF0YXNldC5zdGVwIHx8IERFRkFVTFRfU1RFUClcbiAgKTtcblxuICBsZXQgZGVmYXVsdFZhbHVlO1xuICBmb3IgKGxldCB0aW1lID0gbWluVGltZTsgdGltZSA8PSBtYXhUaW1lOyB0aW1lICs9IHN0ZXApIHtcbiAgICBjb25zdCB7IG1pbnV0ZSwgaG91cjI0LCBob3VyMTIsIGFtcG0gfSA9IGdldFRpbWVDb250ZXh0KHRpbWUpO1xuXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBgJHtwYWRaZXJvcyhob3VyMjQsIDIpfToke3BhZFplcm9zKG1pbnV0ZSwgMil9YDtcbiAgICBvcHRpb24udGV4dCA9IGAke2hvdXIxMn06JHtwYWRaZXJvcyhtaW51dGUsIDIpfSR7YW1wbX1gO1xuICAgIGlmIChvcHRpb24udGV4dCA9PT0gaW5pdGlhbElucHV0RWwudmFsdWUpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICB9XG4gICAgc2VsZWN0RWwuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHRpbWVQaWNrZXJFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9DTEFTUyk7XG5cbiAgLy8gY29tYm8gYm94IHByb3BlcnRpZXNcbiAgT2JqZWN0LmtleXMoRklMVEVSX0RBVEFTRVQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIHRpbWVQaWNrZXJFbC5kYXRhc2V0W2tleV0gPSBGSUxURVJfREFUQVNFVFtrZXldO1xuICB9KTtcbiAgdGltZVBpY2tlckVsLmRhdGFzZXQuZGlzYWJsZUZpbHRlcmluZyA9IFwidHJ1ZVwiO1xuICB0aW1lUGlja2VyRWwuZGF0YXNldC5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgdGltZVBpY2tlckVsLmFwcGVuZENoaWxkKHNlbGVjdEVsKTtcbiAgaW5pdGlhbElucHV0RWwucmVtb3ZlKCk7XG59O1xuXG5jb25zdCB0aW1lUGlja2VyID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoVElNRV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKHRpbWVQaWNrZXJFbCkgPT4ge1xuICAgICAgICB0cmFuc2Zvcm1UaW1lUGlja2VyKHRpbWVQaWNrZXJFbCk7XG4gICAgICAgIGVuaGFuY2VDb21ib0JveCh0aW1lUGlja2VyRWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBGSUxURVJfREFUQVNFVCxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0aW1lUGlja2VyO1xuIiwiLy8gVG9vbHRpcHNcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnRcIik7XG5cbmNvbnN0IFRPT0xUSVAgPSBgLiR7UFJFRklYfS10b29sdGlwYDtcbmNvbnN0IFRPT0xUSVBfVFJJR0dFUiA9IGAuJHtQUkVGSVh9LXRvb2x0aXBfX3RyaWdnZXJgO1xuY29uc3QgVE9PTFRJUF9UUklHR0VSX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX190cmlnZ2VyYDtcbmNvbnN0IFRPT0xUSVBfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBgO1xuY29uc3QgVE9PTFRJUF9CT0RZX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX19ib2R5YDtcbmNvbnN0IFNFVF9DTEFTUyA9IFwiaXMtc2V0XCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5jb25zdCBUUklBTkdMRV9TSVpFID0gNTtcbmNvbnN0IEFESlVTVF9XSURUSF9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcF9fYm9keS0td3JhcGA7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gdHJpZ2dlciAtIFRoZSB0b29sdGlwIHRyaWdnZXJcbiAqIEByZXR1cm5zIHtvYmplY3R9IEVsZW1lbnRzIGZvciBpbml0aWFsaXplZCB0b29sdGlwOyBpbmNsdWRlcyB0cmlnZ2VyLCB3cmFwcGVyLCBhbmQgYm9keVxuICovXG5jb25zdCBnZXRUb29sdGlwRWxlbWVudHMgPSAodHJpZ2dlcikgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gdHJpZ2dlci5wYXJlbnROb2RlO1xuICBjb25zdCBib2R5ID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKGAuJHtUT09MVElQX0JPRFlfQ0xBU1N9YCk7XG5cbiAgcmV0dXJuIHsgdHJpZ2dlciwgd3JhcHBlciwgYm9keSB9O1xufTtcblxuLyoqXG4gKiBTaG93cyB0aGUgdG9vbHRpcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgLSB0aGUgZWxlbWVudCB0aGF0IGluaXRpYWxpemVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNob3dUb29sVGlwID0gKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24pID0+IHtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcblxuICAvLyBUaGlzIHNldHMgdXAgdGhlIHRvb2x0aXAgYm9keS4gVGhlIG9wYWNpdHkgaXMgMCwgYnV0XG4gIC8vIHdlIGNhbiBiZWdpbiBydW5uaW5nIHRoZSBjYWxjdWxhdGlvbnMgYmVsb3cuXG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoU0VUX0NMQVNTKTtcblxuICAvKipcbiAgICogUG9zaXRpb24gdGhlIHRvb2x0aXAgYm9keSB3aGVuIHRoZSB0cmlnZ2VyIGlzIGhvdmVyZWRcbiAgICogUmVtb3ZlcyBvbGQgcG9zaXRpb25pbmcgY2xhc3NuYW1lcyBhbmQgcmVhcHBsaWVzLiBUaGlzIGFsbG93c1xuICAgKiBwb3NpdGlvbmluZyB0byBjaGFuZ2UgaW4gY2FzZSB0aGUgdXNlciByZXNpemVzIGJyb3dzZXIgb3IgRE9NIG1hbmlwdWxhdGlvblxuICAgKiBjYXVzZXMgdG9vbHRpcCB0byBnZXQgY2xpcHBlZCBmcm9tIHZpZXdwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXRQb3MgLSBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJyaWdodFwiLCBcImxlZnRcIlxuICAgKi9cbiAgY29uc3Qgc2V0UG9zaXRpb25DbGFzcyA9IChzZXRQb3MpID0+IHtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLXRvcGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tYm90dG9tYCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1yaWdodGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tbGVmdGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tJHtzZXRQb3N9YCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgb2xkIHBvc2l0aW9uaW5nIHN0eWxlcy4gVGhpcyBhbGxvd3NcbiAgICogcmUtcG9zaXRpb25pbmcgdG8gY2hhbmdlIHdpdGhvdXQgaW5oZXJpdGluZyBvdGhlclxuICAgKiBkeW5hbWljIHN0eWxlc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCByZXNldFBvc2l0aW9uU3R5bGVzID0gKGUpID0+IHtcbiAgICAvLyB3ZSBkb24ndCBvdmVycmlkZSBhbnl0aGluZyBpbiB0aGUgc3R5bGVzaGVldCB3aGVuIGZpbmRpbmcgYWx0IHBvc2l0aW9uc1xuICAgIGUuc3R5bGUudG9wID0gbnVsbDtcbiAgICBlLnN0eWxlLmJvdHRvbSA9IG51bGw7XG4gICAgZS5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgZS5zdHlsZS5sZWZ0ID0gbnVsbDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIGdldCBtYXJnaW4gb2Zmc2V0IGNhbGN1bGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5VmFsdWUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG5cbiAgY29uc3Qgb2Zmc2V0TWFyZ2luID0gKHRhcmdldCwgcHJvcGVydHlWYWx1ZSkgPT5cbiAgICBwYXJzZUludChcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eVZhbHVlKSxcbiAgICAgIDEwXG4gICAgKTtcblxuICAvLyBvZmZzZXRMZWZ0ID0gdGhlIGxlZnQgcG9zaXRpb24sIGFuZCBtYXJnaW4gb2YgdGhlIGVsZW1lbnQsIHRoZSBsZWZ0XG4gIC8vIHBhZGRpbmcsIHNjcm9sbGJhciBhbmQgYm9yZGVyIG9mIHRoZSBvZmZzZXRQYXJlbnQgZWxlbWVudFxuICAvLyBvZmZzZXRXaWR0aCA9IFRoZSBvZmZzZXRXaWR0aCBwcm9wZXJ0eSByZXR1cm5zIHRoZSB2aWV3YWJsZSB3aWR0aCBvZiBhblxuICAvLyBlbGVtZW50IGluIHBpeGVscywgaW5jbHVkaW5nIHBhZGRpbmcsIGJvcmRlciBhbmQgc2Nyb2xsYmFyLCBidXQgbm90XG4gIC8vIHRoZSBtYXJnaW4uXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBtYXJnaW4gb2Zmc2V0XG4gICAqIHRvb2x0aXAgdHJpZ2dlciBtYXJnaW4ocG9zaXRpb24pIG9mZnNldCArIHRvb2x0aXBCb2R5IG9mZnNldFdpZHRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJnaW5Qb3NpdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdG9vbHRpcEJvZHlPZmZzZXRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdHJpZ2dlclxuICAgKi9cbiAgY29uc3QgY2FsY3VsYXRlTWFyZ2luT2Zmc2V0ID0gKFxuICAgIG1hcmdpblBvc2l0aW9uLFxuICAgIHRvb2x0aXBCb2R5T2Zmc2V0LFxuICAgIHRyaWdnZXJcbiAgKSA9PiB7XG4gICAgY29uc3Qgb2Zmc2V0ID1cbiAgICAgIG9mZnNldE1hcmdpbih0cmlnZ2VyLCBgbWFyZ2luLSR7bWFyZ2luUG9zaXRpb259YCkgPiAwXG4gICAgICAgID8gdG9vbHRpcEJvZHlPZmZzZXQgLSBvZmZzZXRNYXJnaW4odHJpZ2dlciwgYG1hcmdpbi0ke21hcmdpblBvc2l0aW9ufWApXG4gICAgICAgIDogdG9vbHRpcEJvZHlPZmZzZXQ7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgdG9wXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uVG9wID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpOyAvLyBlbnN1cmVzIHdlIHN0YXJ0IGZyb20gdGhlIHNhbWUgcG9pbnRcbiAgICAvLyBnZXQgZGV0YWlscyBvbiB0aGUgZWxlbWVudHMgb2JqZWN0IHdpdGhcblxuICAgIGNvbnN0IHRvcE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwidG9wXCIsXG4gICAgICBlLm9mZnNldEhlaWdodCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwidG9wXCIpO1xuICAgIGUuc3R5bGUubGVmdCA9IGA1MCVgOyAvLyBjZW50ZXIgdGhlIGVsZW1lbnRcbiAgICBlLnN0eWxlLnRvcCA9IGAtJHtUUklBTkdMRV9TSVpFfXB4YDsgLy8gY29uc2lkZXIgdGhlIHBzZXVkbyBlbGVtZW50XG4gICAgLy8gYXBwbHkgb3VyIG1hcmdpbnMgYmFzZWQgb24gdGhlIG9mZnNldFxuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbn1weCAwIDAgLSR7bGVmdE1hcmdpbiAvIDJ9cHhgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgYm90dG9tXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uQm90dG9tID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJib3R0b21cIik7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYDUwJWA7XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgJHtUUklBTkdMRV9TSVpFfXB4IDAgMCAtJHtsZWZ0TWFyZ2luIC8gMn1weGA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSByaWdodFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvblJpZ2h0ID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcInJpZ2h0XCIpO1xuICAgIGUuc3R5bGUudG9wID0gYDUwJWA7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYCR7XG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ICsgdG9vbHRpcFRyaWdnZXIub2Zmc2V0V2lkdGggKyBUUklBTkdMRV9TSVpFXG4gICAgfXB4YDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAtJHt0b3BNYXJnaW4gLyAyfXB4IDAgMCAwYDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uTGVmdCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IHRvcE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwidG9wXCIsXG4gICAgICBlLm9mZnNldEhlaWdodCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIC8vIHdlIGhhdmUgdG8gY2hlY2sgZm9yIHNvbWUgdXRpbGl0eSBtYXJnaW5zXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCA+IGUub2Zmc2V0V2lkdGhcbiAgICAgICAgPyB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0IC0gZS5vZmZzZXRXaWR0aFxuICAgICAgICA6IGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwibGVmdFwiKTtcbiAgICBlLnN0eWxlLnRvcCA9IGA1MCVgO1xuICAgIGUuc3R5bGUubGVmdCA9IGAtJHtUUklBTkdMRV9TSVpFfXB4YDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAtJHt0b3BNYXJnaW4gLyAyfXB4IDAgMCAke1xuICAgICAgdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCA+IGUub2Zmc2V0V2lkdGggPyBsZWZ0TWFyZ2luIDogLWxlZnRNYXJnaW5cbiAgICB9cHhgOyAvLyBhZGp1c3QgdGhlIG1hcmdpblxuICB9O1xuXG4gIC8qKlxuICAgKiBXZSB0cnkgdG8gc2V0IHRoZSBwb3NpdGlvbiBiYXNlZCBvbiB0aGVcbiAgICogb3JpZ2luYWwgaW50ZW50aW9uLCBidXQgbWFrZSBhZGp1c3RtZW50c1xuICAgKiBpZiB0aGUgZWxlbWVudCBpcyBjbGlwcGVkIG91dCBvZiB0aGUgdmlld3BvcnRcbiAgICogd2UgY29uc3RyYWluIHRoZSB3aWR0aCBvbmx5IGFzIGEgbGFzdCByZXNvcnRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudChhbGlhcyB0b29sdGlwQm9keSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGF0dGVtcHQgKC0tZmxhZylcbiAgICovXG5cbiAgY29uc3QgbWF4QXR0ZW1wdHMgPSAyO1xuXG4gIGZ1bmN0aW9uIGZpbmRCZXN0UG9zaXRpb24oZWxlbWVudCwgYXR0ZW1wdCA9IDEpIHtcbiAgICAvLyBjcmVhdGUgYXJyYXkgb2Ygb3B0aW9uYWwgcG9zaXRpb25zXG4gICAgY29uc3QgcG9zaXRpb25zID0gW1xuICAgICAgcG9zaXRpb25Ub3AsXG4gICAgICBwb3NpdGlvbkJvdHRvbSxcbiAgICAgIHBvc2l0aW9uUmlnaHQsXG4gICAgICBwb3NpdGlvbkxlZnQsXG4gICAgXTtcblxuICAgIGxldCBoYXNWaXNpYmxlUG9zaXRpb24gPSBmYWxzZTtcblxuICAgIC8vIHdlIHRha2UgYSByZWN1cnNpdmUgYXBwcm9hY2hcbiAgICBmdW5jdGlvbiB0cnlQb3NpdGlvbnMoaSkge1xuICAgICAgaWYgKGkgPCBwb3NpdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uc1tpXTtcbiAgICAgICAgcG9zKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydChlbGVtZW50KSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgIHRyeVBvc2l0aW9ucygoaSArPSAxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFzVmlzaWJsZVBvc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRyeVBvc2l0aW9ucygwKTtcbiAgICAvLyBpZiB3ZSBjYW4ndCBmaW5kIGEgcG9zaXRpb24gd2UgY29tcHJlc3MgaXQgYW5kIHRyeSBhZ2FpblxuICAgIGlmICghaGFzVmlzaWJsZVBvc2l0aW9uKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoQURKVVNUX1dJRFRIX0NMQVNTKTtcbiAgICAgIGlmIChhdHRlbXB0IDw9IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKGVsZW1lbnQsIChhdHRlbXB0ICs9IDEpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSBcInRvcFwiOlxuICAgICAgcG9zaXRpb25Ub3AodG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgIHBvc2l0aW9uQm90dG9tKHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgIHBvc2l0aW9uUmlnaHQodG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICBwb3NpdGlvbkxlZnQodG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIHNraXAgZGVmYXVsdCBjYXNlXG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8qKlxuICAgKiBBY3R1YWxseSBzaG93IHRoZSB0b29sdGlwLiBUaGUgVklTSUJMRV9DTEFTU1xuICAgKiB3aWxsIGNoYW5nZSB0aGUgb3BhY2l0eSB0byAxXG4gICAqL1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpO1xuICB9LCAyMCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIHRoZSBwcm9wZXJ0aWVzIHRvIHNob3cgYW5kIHBvc2l0aW9uIHRoZSB0b29sdGlwLFxuICogYW5kIHJlc2V0cyB0aGUgdG9vbHRpcCBwb3NpdGlvbiB0byB0aGUgb3JpZ2luYWwgaW50ZW50aW9uXG4gKiBpbiBjYXNlIHRoZSB3aW5kb3cgaXMgcmVzaXplZCBvciB0aGUgZWxlbWVudCBpcyBtb3ZlZCB0aHJvdWdoXG4gKiBET00gbWFuaXB1bGF0aW9uLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcEJvZHkgLSBUaGUgYm9keSBvZiB0aGUgdG9vbHRpcFxuICovXG5jb25zdCBoaWRlVG9vbFRpcCA9ICh0b29sdGlwQm9keSkgPT4ge1xuICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKFZJU0lCTEVfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKFNFVF9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoQURKVVNUX1dJRFRIX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xufTtcblxuLyoqXG4gKiBTZXR1cCB0aGUgdG9vbHRpcCBjb21wb25lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBUcmlnZ2VyIFRoZSBlbGVtZW50IHRoYXQgY3JlYXRlcyB0aGUgdG9vbHRpcFxuICovXG5jb25zdCBzZXRVcEF0dHJpYnV0ZXMgPSAodG9vbHRpcFRyaWdnZXIpID0+IHtcbiAgY29uc3QgdG9vbHRpcElEID0gYHRvb2x0aXAtJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5MDAwMDApICsgMTAwMDAwfWA7XG4gIGNvbnN0IHRvb2x0aXBDb250ZW50ID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgdG9vbHRpcEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uc3QgcG9zaXRpb24gPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXG4gICAgPyB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXG4gICAgOiBcInRvcFwiO1xuICBjb25zdCBhZGRpdGlvbmFsQ2xhc3NlcyA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcImRhdGEtY2xhc3Nlc1wiKTtcblxuICAvLyBTZXQgdXAgdG9vbHRpcCBhdHRyaWJ1dGVzXG4gIHRvb2x0aXBUcmlnZ2VyLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgdG9vbHRpcElEKTtcbiAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICB0b29sdGlwVHJpZ2dlci5yZW1vdmVBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgdG9vbHRpcFRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShUT09MVElQX0NMQVNTKTtcbiAgdG9vbHRpcFRyaWdnZXIuY2xhc3NMaXN0LmFkZChUT09MVElQX1RSSUdHRVJfQ0xBU1MpO1xuXG4gIC8vIGluc2VydCB3cmFwcGVyIGJlZm9yZSBlbCBpbiB0aGUgRE9NIHRyZWVcbiAgdG9vbHRpcFRyaWdnZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgdG9vbHRpcFRyaWdnZXIpO1xuXG4gIC8vIHNldCB1cCB0aGUgd3JhcHBlclxuICB3cmFwcGVyLmFwcGVuZENoaWxkKHRvb2x0aXBUcmlnZ2VyKTtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfQ0xBU1MpO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKHRvb2x0aXBCb2R5KTtcblxuICAvLyBBcHBseSBhZGRpdGlvbmFsIGNsYXNzIG5hbWVzIHRvIHdyYXBwZXIgZWxlbWVudFxuICBpZiAoYWRkaXRpb25hbENsYXNzZXMpIHtcbiAgICBjb25zdCBjbGFzc2VzQXJyYXkgPSBhZGRpdGlvbmFsQ2xhc3Nlcy5zcGxpdChcIiBcIik7XG4gICAgY2xhc3Nlc0FycmF5LmZvckVhY2goKGNsYXNzbmFtZSkgPT4gd3JhcHBlci5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSkpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRoZSB0b29sdGlwIGJvZHlcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChUT09MVElQX0JPRFlfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0b29sdGlwSUQpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidG9vbHRpcFwiKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuXG4gIC8vIHBsYWNlIHRoZSB0ZXh0IGluIHRoZSB0b29sdGlwXG4gIHRvb2x0aXBCb2R5LnRleHRDb250ZW50ID0gdG9vbHRpcENvbnRlbnQ7XG5cbiAgcmV0dXJuIHsgdG9vbHRpcEJvZHksIHBvc2l0aW9uLCB0b29sdGlwQ29udGVudCwgd3JhcHBlciB9O1xufTtcblxuLy8gU2V0dXAgb3VyIGZ1bmN0aW9uIHRvIHJ1biBvbiB2YXJpb3VzIGV2ZW50c1xuY29uc3QgdG9vbHRpcCA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJtb3VzZW92ZXIgZm9jdXNpblwiOiB7XG4gICAgICBbVE9PTFRJUF0oZSkge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRUeXBlID0gdHJpZ2dlci5ub2RlTmFtZTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRvb2x0aXAgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKGVsZW1lbnRUeXBlID09PSBcIkJVVFRPTlwiICYmIHRyaWdnZXIuaGFzQXR0cmlidXRlKFwidGl0bGVcIikpIHtcbiAgICAgICAgICBzZXRVcEF0dHJpYnV0ZXModHJpZ2dlcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbVE9PTFRJUF9UUklHR0VSXShlKSB7XG4gICAgICAgIGNvbnN0IHsgdHJpZ2dlciwgYm9keSB9ID0gZ2V0VG9vbHRpcEVsZW1lbnRzKGUudGFyZ2V0KTtcblxuICAgICAgICBzaG93VG9vbFRpcChib2R5LCB0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQucG9zaXRpb24pO1xuICAgICAgfSxcbiAgICB9LFxuICAgIFwibW91c2VvdXQgZm9jdXNvdXRcIjoge1xuICAgICAgW1RPT0xUSVBfVFJJR0dFUl0oZSkge1xuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IGdldFRvb2x0aXBFbGVtZW50cyhlLnRhcmdldCk7XG5cbiAgICAgICAgaGlkZVRvb2xUaXAoYm9keSk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhUT09MVElQLCByb290KS5mb3JFYWNoKCh0b29sdGlwVHJpZ2dlcikgPT4ge1xuICAgICAgICBzZXRVcEF0dHJpYnV0ZXModG9vbHRpcFRyaWdnZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXR1cDogc2V0VXBBdHRyaWJ1dGVzLFxuICAgIGdldFRvb2x0aXBFbGVtZW50cyxcbiAgICBzaG93OiBzaG93VG9vbFRpcCxcbiAgICBoaWRlOiBoaWRlVG9vbFRpcCxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0b29sdGlwO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy92YWxpZGF0ZS1pbnB1dFwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5cbmNvbnN0IFZBTElEQVRFX0lOUFVUID0gXCJpbnB1dFtkYXRhLXZhbGlkYXRpb24tZWxlbWVudF1cIjtcbmNvbnN0IENIRUNLTElTVF9JVEVNID0gYC4ke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtYDtcblxuLy8gVHJpZ2dlciB2YWxpZGF0aW9uIG9uIGlucHV0IGNoYW5nZVxuY29uc3QgaGFuZGxlQ2hhbmdlID0gKGVsKSA9PiB2YWxpZGF0ZShlbCk7XG5cbi8vIENyZWF0ZSBjb250YWluZXIgdG8gaG9sZCBhcmlhIHJlYWRvdXRcbmNvbnN0IGNyZWF0ZVN0YXR1c0VsZW1lbnQgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbkNvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGU7XG4gIGNvbnN0IGlucHV0SUQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgY29uc3Qgc3RhdHVzU3VtbWFyeUlEID0gYCR7aW5wdXRJRH0tc3Itc3VtbWFyeWA7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgc3RhdHVzU3VtbWFyeUlEKTtcblxuICBjb25zdCBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24tc3RhdHVzXCIsIFwiXCIpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ1c2Etc3Itb25seVwiKTtcbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxpdmVcIiwgXCJwb2xpdGVcIik7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1hdG9taWNcIiwgdHJ1ZSk7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgc3RhdHVzU3VtbWFyeUlEKTtcbiAgdmFsaWRhdGlvbkNvbnRhaW5lci5hcHBlbmQoc3RhdHVzU3VtbWFyeUNvbnRhaW5lcik7XG59O1xuXG4vLyBTZXQgdXAgY2hlY2tsaXN0IGl0ZW1zIHdpdGggaW5pdGlhbCBhcmlhLWxhYmVsIChpbmNvbXBsZXRlKSB2YWx1ZXNcbmNvbnN0IGNyZWF0ZUluaXRpYWxTdGF0dXMgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbkNvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGU7XG4gIGNvbnN0IGNoZWNrbGlzdEl0ZW1zID0gdmFsaWRhdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKENIRUNLTElTVF9JVEVNKTtcbiAgY29uc3QgdmFsaWRhdGlvbkVsZW1lbnQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24tZWxlbWVudFwiKTtcblxuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIHZhbGlkYXRpb25FbGVtZW50KTtcblxuICBjaGVja2xpc3RJdGVtcy5mb3JFYWNoKChsaXN0SXRlbSkgPT4ge1xuICAgIGxldCBjdXJyZW50U3RhdHVzID0gXCJzdGF0dXMgaW5jb21wbGV0ZVwiO1xuICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24taW5jb21wbGV0ZVwiKSkge1xuICAgICAgY3VycmVudFN0YXR1cyA9IGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsaWRhdGlvbi1pbmNvbXBsZXRlXCIpO1xuICAgIH1cbiAgICBjb25zdCBpdGVtU3RhdHVzID0gYCR7bGlzdEl0ZW0udGV4dENvbnRlbnR9ICR7Y3VycmVudFN0YXR1c30gYDtcbiAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpdGVtU3RhdHVzKTtcbiAgfSk7XG59O1xuXG5jb25zdCBlbmhhbmNlVmFsaWRhdGlvbiA9IChpbnB1dCkgPT4ge1xuICBjcmVhdGVTdGF0dXNFbGVtZW50KGlucHV0KTtcbiAgY3JlYXRlSW5pdGlhbFN0YXR1cyhpbnB1dCk7XG59O1xuXG5jb25zdCB2YWxpZGF0b3IgPSBiZWhhdmlvcihcbiAge1xuICAgIFwiaW5wdXQgY2hhbmdlXCI6IHtcbiAgICAgIFtWQUxJREFURV9JTlBVVF0oZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlQ2hhbmdlKGV2ZW50LnRhcmdldCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhWQUxJREFURV9JTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXQpID0+XG4gICAgICAgIGVuaGFuY2VWYWxpZGF0aW9uKGlucHV0KVxuICAgICAgKTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkYXRvcjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBwcmVmaXg6IFwidXNhXCIsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIFRoaXMgdXNlZCB0byBiZSBjb25kaXRpb25hbGx5IGRlcGVuZGVudCBvbiB3aGV0aGVyIHRoZVxuICAvLyBicm93c2VyIHN1cHBvcnRlZCB0b3VjaCBldmVudHM7IGlmIGl0IGRpZCwgYENMSUNLYCB3YXMgc2V0IHRvXG4gIC8vIGB0b3VjaHN0YXJ0YC4gIEhvd2V2ZXIsIHRoaXMgaGFkIGRvd25zaWRlczpcbiAgLy9cbiAgLy8gKiBJdCBwcmUtZW1wdGVkIG1vYmlsZSBicm93c2VycycgZGVmYXVsdCBiZWhhdmlvciBvZiBkZXRlY3RpbmdcbiAgLy8gICB3aGV0aGVyIGEgdG91Y2ggdHVybmVkIGludG8gYSBzY3JvbGwsIHRoZXJlYnkgcHJldmVudGluZ1xuICAvLyAgIHVzZXJzIGZyb20gdXNpbmcgc29tZSBvZiBvdXIgY29tcG9uZW50cyBhcyBzY3JvbGwgc3VyZmFjZXMuXG4gIC8vXG4gIC8vICogU29tZSBkZXZpY2VzLCBzdWNoIGFzIHRoZSBNaWNyb3NvZnQgU3VyZmFjZSBQcm8sIHN1cHBvcnQgKmJvdGgqXG4gIC8vICAgdG91Y2ggYW5kIGNsaWNrcy4gVGhpcyBtZWFudCB0aGUgY29uZGl0aW9uYWwgZWZmZWN0aXZlbHkgZHJvcHBlZFxuICAvLyAgIHN1cHBvcnQgZm9yIHRoZSB1c2VyJ3MgbW91c2UsIGZydXN0cmF0aW5nIHVzZXJzIHdobyBwcmVmZXJyZWRcbiAgLy8gICBpdCBvbiB0aG9zZSBzeXN0ZW1zLlxuICBDTElDSzogXCJjbGlja1wiLFxufTtcbiIsImNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtYWNjb3JkaW9uL3NyYy9pbmRleFwiKTtcbmNvbnN0IGJhbm5lciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtYmFubmVyL3NyYy9pbmRleFwiKTtcbmNvbnN0IGNoYXJhY3RlckNvdW50ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1jaGFyYWN0ZXItY291bnQvc3JjL2luZGV4XCIpO1xuY29uc3QgY29tYm9Cb3ggPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWNvbWJvLWJveC9zcmMvaW5kZXhcIik7XG5jb25zdCBkYXRlUGlja2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXhcIik7XG5jb25zdCBkYXRlUmFuZ2VQaWNrZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWRhdGUtcmFuZ2UtcGlja2VyL3NyYy9pbmRleFwiKTtcbmNvbnN0IGZpbGVJbnB1dCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtZmlsZS1pbnB1dC9zcmMvaW5kZXhcIik7XG5jb25zdCBmb290ZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWZvb3Rlci9zcmMvaW5kZXhcIik7XG5jb25zdCBpblBhZ2VOYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1pbi1wYWdlLW5hdmlnYXRpb24vc3JjL2luZGV4XCIpO1xuY29uc3QgaW5wdXRNYXNrID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1pbnB1dC1tYXNrL3NyYy9pbmRleFwiKTtcbmNvbnN0IGlucHV0UHJlZml4U3VmZml4ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1pbnB1dC1wcmVmaXgtc3VmZml4L3NyYy9pbmRleFwiKTtcbmNvbnN0IGxhbmd1YWdlU2VsZWN0b3IgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWxhbmd1YWdlLXNlbGVjdG9yL3NyYy9pbmRleFwiKTtcbmNvbnN0IG1vZGFsID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1tb2RhbC9zcmMvaW5kZXhcIik7XG5jb25zdCBuYXZpZ2F0aW9uID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1oZWFkZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgcGFzc3dvcmQgPSByZXF1aXJlKFwiLi4vLi4vLi4vX3VzYS1wYXNzd29yZC9zcmMvaW5kZXhcIik7XG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXNlYXJjaC9zcmMvaW5kZXhcIik7XG5jb25zdCBza2lwbmF2ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1za2lwbmF2L3NyYy9pbmRleFwiKTtcbmNvbnN0IHRhYmxlID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10YWJsZS9zcmMvaW5kZXhcIik7XG5jb25zdCB0aW1lUGlja2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10aW1lLXBpY2tlci9zcmMvaW5kZXhcIik7XG5jb25zdCB0b29sdGlwID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10b29sdGlwL3NyYy9pbmRleFwiKTtcbmNvbnN0IHZhbGlkYXRvciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtdmFsaWRhdGlvbi9zcmMvaW5kZXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb24sXG4gIGJhbm5lcixcbiAgY2hhcmFjdGVyQ291bnQsXG4gIGNvbWJvQm94LFxuICBkYXRlUGlja2VyLFxuICBkYXRlUmFuZ2VQaWNrZXIsXG4gIGZpbGVJbnB1dCxcbiAgZm9vdGVyLFxuICBpblBhZ2VOYXZpZ2F0aW9uLFxuICBpbnB1dE1hc2ssXG4gIGlucHV0UHJlZml4U3VmZml4LFxuICBsYW5ndWFnZVNlbGVjdG9yLFxuICBtb2RhbCxcbiAgbmF2aWdhdGlvbixcbiAgcGFzc3dvcmQsXG4gIHNlYXJjaCxcbiAgc2tpcG5hdixcbiAgdGFibGUsXG4gIHRpbWVQaWNrZXIsXG4gIHRvb2x0aXAsXG4gIHZhbGlkYXRvcixcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xuLyogZXNsaW50LWRpc2FibGUgZnVuYy1uYW1lcyAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXG4gIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBfcGFyYW1zKSB7XG4gICAgY29uc3QgcGFyYW1zID0gX3BhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KFxuICAgICAgZXZlbnQsXG4gICAgICBwYXJhbXMuYnViYmxlcyxcbiAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLFxuICAgICAgcGFyYW1zLmRldGFpbFxuICAgICk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xufSkoKTtcbiIsImNvbnN0IGVscHJvdG8gPSB3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxuaWYgKCEoSElEREVOIGluIGVscHJvdG8pKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbHByb3RvLCBISURERU4sIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoSElEREVOKTtcbiAgICB9LFxuICAgIHNldCh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xufVxuIiwiLy8gcG9seWZpbGxzIEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc0xpc3QgYW5kIERPTVRva2VuTGlzdFxucmVxdWlyZShcImNsYXNzbGlzdC1wb2x5ZmlsbFwiKTtcbi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGlkZGVuXG5yZXF1aXJlKFwiLi9lbGVtZW50LWhpZGRlblwiKTtcbi8vIHBvbHlmaWxscyBOdW1iZXIuaXNOYU4oKVxucmVxdWlyZShcIi4vbnVtYmVyLWlzLW5hblwiKTtcbi8vIHBvbHlmaWxscyBDdXN0b21FdmVudFxucmVxdWlyZShcIi4vY3VzdG9tLWV2ZW50XCIpO1xuLy8gcG9seWZpbGxzIHN2ZzRldmVyeWJvZHlcbnJlcXVpcmUoXCIuL3N2ZzRldmVyeWJvZHlcIik7XG4iLCJOdW1iZXIuaXNOYU4gPVxuICBOdW1iZXIuaXNOYU4gfHxcbiAgZnVuY3Rpb24gaXNOYU4oaW5wdXQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dCAhPT0gaW5wdXQ7XG4gIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuIShmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbn0pKGZ1bmN0aW9uICgpIHtcbiAgLyohIHN2ZzRldmVyeWJvZHkgdjIuMS45IHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgZnVuY3Rpb24gZW1iZWQocGFyZW50LCBzdmcsIHRhcmdldCwgdXNlKSB7XG4gICAgLy8gaWYgdGhlIHRhcmdldCBleGlzdHNcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAvLyBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIHRoZSBjb250ZW50cyBvZiB0aGUgdGFyZ2V0XG4gICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgIHZpZXdCb3ggPVxuICAgICAgICAgICFzdmcuaGFzQXR0cmlidXRlKFwidmlld0JveFwiKSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKTtcbiAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgIHZpZXdCb3ggJiYgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG4gICAgICAvLyBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgY2xvbmUgaW50byB0aGUgZnJhZ21lbnRcbiAgICAgIGZvciAoXG4gICAgICAgIC8vIGNsb25lIHRoZSB0YXJnZXRcbiAgICAgICAgdmFyIGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZVxuICAgICAgICAgICAgPyBkb2N1bWVudC5pbXBvcnROb2RlKHRhcmdldCwgITApXG4gICAgICAgICAgICA6IHRhcmdldC5jbG9uZU5vZGUoITApLFxuICAgICAgICAgIGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICBzdmcubmFtZXNwYWNlVVJJIHx8IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICAgICAgICAgIFwiZ1wiXG4gICAgICAgICAgKTtcbiAgICAgICAgY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICAgICkge1xuICAgICAgICBnLmFwcGVuZENoaWxkKGNsb25lLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgaWYgKHVzZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgdXNlLmF0dHJpYnV0ZXMubGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSB1c2UuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgICBcInhsaW5rOmhyZWZcIiAhPT0gYXR0ci5uYW1lICYmXG4gICAgICAgICAgICBcImhyZWZcIiAhPT0gYXR0ci5uYW1lICYmXG4gICAgICAgICAgICBnLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChnKSwgLy8gYXBwZW5kIHRoZSBmcmFnbWVudCBpbnRvIHRoZSBzdmdcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyLCB1c2UpIHtcbiAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICh4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gaWYgdGhlIHJlcXVlc3QgaXMgcmVhZHlcbiAgICAgIGlmICg0ID09PSB4aHIucmVhZHlTdGF0ZSkge1xuICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCBodG1sIGRvY3VtZW50XG4gICAgICAgIHZhciBjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQ7XG4gICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnQgYmFzZWQgb24gdGhlIHhociByZXNwb25zZVxuICAgICAgICBjYWNoZWREb2N1bWVudCB8fFxuICAgICAgICAgICgoY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50ID1cbiAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSksXG4gICAgICAgICAgKGNhY2hlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dCksIC8vIGVuc3VyZSBkb21haW5zIGFyZSB0aGUgc2FtZSwgb3RoZXJ3aXNlIHdlJ2xsIGhhdmUgaXNzdWVzIGFwcGVuZGluZyB0aGVcbiAgICAgICAgICAvLyBlbGVtZW50IGluIElFIDExXG4gICAgICAgICAgY2FjaGVkRG9jdW1lbnQuZG9tYWluICE9PSBkb2N1bWVudC5kb21haW4gJiZcbiAgICAgICAgICAgIChjYWNoZWREb2N1bWVudC5kb21haW4gPSBkb2N1bWVudC5kb21haW4pLFxuICAgICAgICAgICh4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSksIC8vIGNsZWFyIHRoZSB4aHIgZW1iZWRzIGxpc3QgYW5kIGVtYmVkIGVhY2ggaXRlbVxuICAgICAgICAgIHhoci5fZW1iZWRzLnNwbGljZSgwKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgdGFyZ2V0XG4gICAgICAgICAgICB0YXJnZXQgfHxcbiAgICAgICAgICAgICAgKHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdID1cbiAgICAgICAgICAgICAgICBjYWNoZWREb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmlkKSksXG4gICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSB0YXJnZXQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgIGVtYmVkKGl0ZW0ucGFyZW50LCBpdGVtLnN2ZywgdGFyZ2V0LCB1c2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLCAvLyB0ZXN0IHRoZSByZWFkeSBzdGF0ZSBjaGFuZ2UgaW1tZWRpYXRlbHlcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UoKTtcbiAgfVxuICBmdW5jdGlvbiBzdmc0ZXZlcnlib2R5KHJhd29wdHMpIHtcbiAgICBmdW5jdGlvbiBvbmludGVydmFsKCkge1xuICAgICAgLy8gaWYgYWxsIDx1c2U+cyBpbiB0aGUgYXJyYXkgYXJlIGJlaW5nIGJ5cGFzc2VkLCBkb24ndCBwcm9jZWVkLlxuICAgICAgaWYgKFxuICAgICAgICBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgJiZcbiAgICAgICAgdXNlcy5sZW5ndGggLSBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPD0gMFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB2b2lkIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgICB9XG4gICAgICAvLyBpZiB0aGVyZSBhcmUgPHVzZT5zIHRvIHByb2Nlc3MsIHByb2NlZWQuXG4gICAgICAvLyByZXNldCB0aGUgYnlwYXNzIGNvdW50ZXIsIHNpbmNlIHRoZSBjb3VudGVyIHdpbGwgYmUgaW5jcmVtZW50ZWQgZm9yIGV2ZXJ5IGJ5cGFzc2VkIGVsZW1lbnQsXG4gICAgICAvLyBldmVuIG9uZXMgdGhhdCB3ZXJlIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID0gMDtcbiAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgZm9yIChcbiAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgPHVzZT4gaW5kZXhcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgaW5kZXggPCB1c2VzLmxlbmd0aDtcblxuICAgICAgKSB7XG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCA8dXNlPlxuICAgICAgICB2YXIgdXNlID0gdXNlc1tpbmRleF0sXG4gICAgICAgICAgcGFyZW50ID0gdXNlLnBhcmVudE5vZGUsXG4gICAgICAgICAgc3ZnID0gZ2V0U1ZHQW5jZXN0b3IocGFyZW50KSxcbiAgICAgICAgICBzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKFwieGxpbms6aHJlZlwiKSB8fCB1c2UuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICghc3JjICYmXG4gICAgICAgICAgICBvcHRzLmF0dHJpYnV0ZU5hbWUgJiZcbiAgICAgICAgICAgIChzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKG9wdHMuYXR0cmlidXRlTmFtZSkpLFxuICAgICAgICAgIHN2ZyAmJiBzcmMpXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlIHx8IG9wdHMudmFsaWRhdGUoc3JjLCBzdmcsIHVzZSkpIHtcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSA8dXNlPiBlbGVtZW50XG4gICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZCh1c2UpO1xuICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc3JjIGFuZCBnZXQgdGhlIHVybCBhbmQgaWRcbiAgICAgICAgICAgICAgdmFyIHNyY1NwbGl0ID0gc3JjLnNwbGl0KFwiI1wiKSxcbiAgICAgICAgICAgICAgICB1cmwgPSBzcmNTcGxpdC5zaGlmdCgpLFxuICAgICAgICAgICAgICAgIGlkID0gc3JjU3BsaXQuam9pbihcIiNcIik7XG4gICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgIGlmICh1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgeGhyIHJlcXVlc3RcbiAgICAgICAgICAgICAgICB2YXIgeGhyID0gcmVxdWVzdHNbdXJsXTtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIHhociByZXF1ZXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgIHhociB8fFxuICAgICAgICAgICAgICAgICAgKCh4aHIgPSByZXF1ZXN0c1t1cmxdID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCkpLFxuICAgICAgICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsKSxcbiAgICAgICAgICAgICAgICAgIHhoci5zZW5kKCksXG4gICAgICAgICAgICAgICAgICAoeGhyLl9lbWJlZHMgPSBbXSkpLCAvLyBhZGQgdGhlIHN2ZyBhbmQgaWQgYXMgYW4gaXRlbSB0byB0aGUgeGhyIGVtYmVkcyBsaXN0XG4gICAgICAgICAgICAgICAgICB4aHIuX2VtYmVkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICB9KSwgLy8gcHJlcGFyZSB0aGUgeGhyIHJlYWR5IHN0YXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgICAgICAgbG9hZHJlYWR5c3RhdGVjaGFuZ2UoeGhyLCB1c2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSBsb2NhbCBpZCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICBlbWJlZChwYXJlbnQsIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLCB1c2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgKytpbmRleCwgKytudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICsraW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGNvbnRpbnVlIHRoZSBpbnRlcnZhbFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICB9XG4gICAgdmFyIHBvbHlmaWxsLFxuICAgICAgb3B0cyA9IE9iamVjdChyYXdvcHRzKSxcbiAgICAgIG5ld2VySUVVQSA9IC9cXGJUcmlkZW50XFwvWzU2N11cXGJ8XFxiTVNJRSAoPzo5fDEwKVxcLjBcXGIvLFxuICAgICAgd2Via2l0VUEgPSAvXFxiQXBwbGVXZWJLaXRcXC8oXFxkKylcXGIvLFxuICAgICAgb2xkZXJFZGdlVUEgPSAvXFxiRWRnZVxcLzEyXFwuKFxcZCspXFxiLyxcbiAgICAgIGVkZ2VVQSA9IC9cXGJFZGdlXFwvLihcXGQrKVxcYi8sXG4gICAgICBpbklmcmFtZSA9IHdpbmRvdy50b3AgIT09IHdpbmRvdy5zZWxmO1xuICAgIHBvbHlmaWxsID1cbiAgICAgIFwicG9seWZpbGxcIiBpbiBvcHRzXG4gICAgICAgID8gb3B0cy5wb2x5ZmlsbFxuICAgICAgICA6IG5ld2VySUVVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XG4gICAgICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8XG4gICAgICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2god2Via2l0VUEpIHx8IFtdKVsxXSA8IDUzNyB8fFxuICAgICAgICAgIChlZGdlVUEudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiBpbklmcmFtZSk7XG4gICAgLy8gY3JlYXRlIHhociByZXF1ZXN0cyBvYmplY3RcbiAgICB2YXIgcmVxdWVzdHMgPSB7fSxcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dCxcbiAgICAgIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSxcbiAgICAgIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA9IDA7XG4gICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgIHBvbHlmaWxsICYmIG9uaW50ZXJ2YWwoKTtcbiAgfVxuICBmdW5jdGlvbiBnZXRTVkdBbmNlc3Rvcihub2RlKSB7XG4gICAgZm9yIChcbiAgICAgIHZhciBzdmcgPSBub2RlO1xuICAgICAgXCJzdmdcIiAhPT0gc3ZnLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgKHN2ZyA9IHN2Zy5wYXJlbnROb2RlKTtcblxuICAgICkge31cbiAgICByZXR1cm4gc3ZnO1xuICB9XG4gIHJldHVybiBzdmc0ZXZlcnlib2R5O1xufSk7XG4iLCJ3aW5kb3cudXN3ZHNQcmVzZW50ID0gdHJ1ZTsgLy8gR0xPQkFMIHZhcmlhYmxlIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzd2RzLmpzIGhhcyBsb2FkZWQgaW4gdGhlIERPTS5cblxuLyoqXG4gKiBUaGUgJ3BvbHlmaWxscycgZGVmaW5lIGtleSBFQ01BU2NyaXB0IDUgbWV0aG9kcyB0aGF0IG1heSBiZSBtaXNzaW5nIGZyb21cbiAqIG9sZGVyIGJyb3dzZXJzLCBzbyBtdXN0IGJlIGxvYWRlZCBmaXJzdC5cbiAqL1xucmVxdWlyZShcIi4vcG9seWZpbGxzXCIpO1xuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xuY29uc3Qgc3ZnNGV2ZXJ5Ym9keSA9IHJlcXVpcmUoXCIuL3BvbHlmaWxscy9zdmc0ZXZlcnlib2R5XCIpO1xuXG51c3dkcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcblxuY29uc3QgaW5pdENvbXBvbmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1trZXldO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH0pO1xuICBzdmc0ZXZlcnlib2R5KCk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdENvbXBvbmVudHMsIHsgb25jZTogdHJ1ZSB9KTtcbn0gZWxzZSB7XG4gIGluaXRDb21wb25lbnRzKCk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHVzd2RzO1xuZXhwb3J0cy5pbml0Q29tcG9uZW50cyA9IGluaXRDb21wb25lbnRzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoaHRtbERvY3VtZW50ID0gZG9jdW1lbnQpID0+IGh0bWxEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCBCZWhhdmlvciA9IHJlcXVpcmUoXCJyZWNlcHRvci9iZWhhdmlvclwiKTtcblxuLyoqXG4gKiBAbmFtZSBzZXF1ZW5jZVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gc2VxIGFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybiB7IGNsb3N1cmUgfSBjYWxsSG9va3NcbiAqL1xuLy8gV2UgdXNlIGEgbmFtZWQgZnVuY3Rpb24gaGVyZSBiZWNhdXNlIHdlIHdhbnQgaXQgdG8gaW5oZXJpdCBpdHMgbGV4aWNhbCBzY29wZVxuLy8gZnJvbSB0aGUgYmVoYXZpb3IgcHJvcHMgb2JqZWN0LCBub3QgZnJvbSB0aGUgbW9kdWxlXG5jb25zdCBzZXF1ZW5jZSA9ICguLi5zZXEpID0+XG4gIGZ1bmN0aW9uIGNhbGxIb29rcyh0YXJnZXQgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgc2VxLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzW21ldGhvZF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzW21ldGhvZF0uY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4vKipcbiAqIEBuYW1lIGJlaGF2aW9yXG4gKiBAcGFyYW0ge29iamVjdH0gZXZlbnRzXG4gKiBAcGFyYW0ge29iamVjdD99IHByb3BzXG4gKiBAcmV0dXJuIHtyZWNlcHRvci5iZWhhdmlvcn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZXZlbnRzLCBwcm9wcykgPT5cbiAgQmVoYXZpb3IoXG4gICAgZXZlbnRzLFxuICAgIGFzc2lnbihcbiAgICAgIHtcbiAgICAgICAgb246IHNlcXVlbmNlKFwiaW5pdFwiLCBcImFkZFwiKSxcbiAgICAgICAgb2ZmOiBzZXF1ZW5jZShcInRlYXJkb3duXCIsIFwicmVtb3ZlXCIpLFxuICAgICAgfSxcbiAgICAgIHByb3BzXG4gICAgKVxuICApO1xuIiwiLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gZXZlcnkgWCBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGRlbGF5IC0gTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGNhbGxpbmcgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIEBleGFtcGxlIGNvbnN0IHVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKChzdHJpbmcpID0+IGNvbnNvbGUubG9nKHN0cmluZyksIDIwMDApXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWJvdW5jZShjYWxsYmFjaywgZGVsYXkgPSA1MDApIHtcbiAgbGV0IHRpbWVyID0gbnVsbDtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9LCBkZWxheSk7XG4gIH07XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIik7XG5jb25zdCB7IGtleW1hcCB9ID0gcmVxdWlyZShcInJlY2VwdG9yXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi9hY3RpdmUtZWxlbWVudFwiKTtcblxuY29uc3QgRk9DVVNBQkxFID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcblxuY29uc3QgdGFiSGFuZGxlciA9IChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KEZPQ1VTQUJMRSwgY29udGV4dCk7XG4gIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWzBdO1xuICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gIC8vIFNwZWNpYWwgcnVsZXMgZm9yIHdoZW4gdGhlIHVzZXIgaXMgdGFiYmluZyBmb3J3YXJkIGZyb20gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQsXG4gIC8vIG9yIHdoZW4gdGFiYmluZyBiYWNrd2FyZHMgZnJvbSB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnRcbiAgZnVuY3Rpb24gdGFiQWhlYWQoZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRhYkJhY2soZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgICAvLyBUaGlzIGNoZWNrcyBpZiB5b3Ugd2FudCB0byBzZXQgdGhlIGluaXRpYWwgZm9jdXMgdG8gYSBjb250YWluZXJcbiAgICAvLyBpbnN0ZWFkIG9mIGFuIGVsZW1lbnQgd2l0aGluLCBhbmQgdGhlIHVzZXIgdGFicyBiYWNrLlxuICAgIC8vIFRoZW4gd2Ugc2V0IHRoZSBmb2N1cyB0byB0aGUgZmlyc3RcbiAgICBlbHNlIGlmICghZm9jdXNhYmxlRWxlbWVudHMuaW5jbHVkZXMoYWN0aXZlRWxlbWVudCgpKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RUYWJTdG9wLFxuICAgIGxhc3RUYWJTdG9wLFxuICAgIHRhYkFoZWFkLFxuICAgIHRhYkJhY2ssXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250ZXh0LCBhZGRpdGlvbmFsS2V5QmluZGluZ3MgPSB7fSkgPT4ge1xuICBjb25zdCB0YWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKGNvbnRleHQpO1xuICBjb25zdCBiaW5kaW5ncyA9IGFkZGl0aW9uYWxLZXlCaW5kaW5ncztcbiAgY29uc3QgeyBFc2MsIEVzY2FwZSB9ID0gYmluZGluZ3M7XG5cbiAgaWYgKEVzY2FwZSAmJiAhRXNjKSBiaW5kaW5ncy5Fc2MgPSBFc2NhcGU7XG5cbiAgLy8gIFRPRE86IEluIHRoZSBmdXR1cmUsIGxvb3Agb3ZlciBhZGRpdGlvbmFsIGtleWJpbmRpbmdzIGFuZCBwYXNzIGFuIGFycmF5XG4gIC8vIG9mIGZ1bmN0aW9ucywgaWYgbmVjZXNzYXJ5LCB0byB0aGUgbWFwIGtleXMuIFRoZW4gcGVvcGxlIGltcGxlbWVudGluZ1xuICAvLyB0aGUgZm9jdXMgdHJhcCBjb3VsZCBwYXNzIGNhbGxiYWNrcyB0byBmaXJlIHdoZW4gdGFiYmluZ1xuICBjb25zdCBrZXlNYXBwaW5ncyA9IGtleW1hcChcbiAgICBhc3NpZ24oXG4gICAgICB7XG4gICAgICAgIFRhYjogdGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgICBcIlNoaWZ0K1RhYlwiOiB0YWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsS2V5QmluZGluZ3NcbiAgICApXG4gICk7XG5cbiAgY29uc3QgZm9jdXNUcmFwID0gYmVoYXZpb3IoXG4gICAge1xuICAgICAga2V5ZG93bjoga2V5TWFwcGluZ3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBpbml0KCkge1xuICAgICAgICAvLyBUT0RPOiBpcyB0aGlzIGRlc2lyZWFibGUgYmVoYXZpb3I/IFNob3VsZCB0aGUgdHJhcCBhbHdheXMgZG8gdGhpcyBieSBkZWZhdWx0IG9yIHNob3VsZFxuICAgICAgICAvLyB0aGUgY29tcG9uZW50IGdldHRpbmcgZGVjb3JhdGVkIGhhbmRsZSB0aGlzP1xuICAgICAgICBpZiAodGFiRXZlbnRIYW5kbGVyLmZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgIHRhYkV2ZW50SGFuZGxlci5maXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZShpc0FjdGl2ZSkge1xuICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLm9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vZmYoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGZvY3VzVHJhcDtcbn07XG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1NzQzM1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChcbiAgZWwsXG4gIHdpbiA9IHdpbmRvdyxcbiAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbikge1xuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiLy8gaU9TIGRldGVjdGlvbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MDM5ODg1LzE3NzcxMFxuZnVuY3Rpb24gaXNJb3NEZXZpY2UoKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBvZHxpUGhvbmV8aVBhZCkvZykgfHxcbiAgICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSkgJiZcbiAgICAhd2luZG93Lk1TU3RyZWFtXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJb3NEZXZpY2U7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuXG4vKipcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gaGVscCB5b3UgZXNjYXBlIEhUTUwgdXNpbmcgdGVtcGxhdGUgc3RyaW5ncy5cbiAqXG4gKiBJdCdzIHRoZSBjb3VudGVycGFydCB0byBvdXIgZXNsaW50IFwibm8tdW5zYWZlLWlubmVyaHRtbFwiIHBsdWdpbiB0aGF0IGhlbHBzIHVzXG4gKiBhdm9pZCB1bnNhZmUgY29kaW5nIHByYWN0aWNlcy5cbiAqIEEgZnVsbCB3cml0ZS11cCBvZiB0aGUgSG93cyBhbmQgV2h5cyBhcmUgZG9jdW1lbnRlZFxuICogZm9yIGRldmVsb3BlcnMgYXRcbiAqICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9GaXJlZm94X09TL1NlY3VyaXR5L1NlY3VyaXR5X0F1dG9tYXRpb25cbiAqIHdpdGggYWRkaXRpb25hbCBiYWNrZ3JvdW5kIGluZm9ybWF0aW9uIGFuZCBkZXNpZ24gZG9jcyBhdFxuICogIGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9Vc2VyOkZicmF1bi9HYWlhL1NhZmVpbm5lckhUTUxSb2FkbWFwXG4gKlxuICovXG5cbiEoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59KShmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBTYW5pdGl6ZXIgPSB7XG4gICAgX2VudGl0eTogL1smPD5cIicvXS9nLFxuXG4gICAgX2VudGl0aWVzOiB7XG4gICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgIFwiJ1wiOiBcIiZhcG9zO1wiLFxuICAgICAgXCIvXCI6IFwiJiN4MkY7XCIsXG4gICAgfSxcblxuICAgIGdldEVudGl0eTogZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBTYW5pdGl6ZXIuX2VudGl0aWVzW3NdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIEhUTUwgZm9yIGFsbCB2YWx1ZXMgaW4gYSB0YWdnZWQgdGVtcGxhdGUgc3RyaW5nLlxuICAgICAqL1xuICAgIGVzY2FwZUhUTUw6IGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzdHJpbmdzW2ldO1xuICAgICAgICBpZiAoaSArIDEgPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzW2kgKyAxXSB8fCBcIlwiO1xuICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcodmFsdWUpLnJlcGxhY2UoXG4gICAgICAgICAgICBTYW5pdGl6ZXIuX2VudGl0eSxcbiAgICAgICAgICAgIFNhbml0aXplci5nZXRFbnRpdHlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIEhUTUwgYW5kIHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0byBiZSB1c2VkIGR1cmluZyBET00gaW5zZXJ0aW9uXG4gICAgICovXG4gICAgY3JlYXRlU2FmZUhUTUw6IGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgICB2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKTtcbiAgICAgIGZvciAodmFyIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHZhbHVlc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBlc2NhcGVkID0gU2FuaXRpemVyLmVzY2FwZUhUTUwuYXBwbHkoXG4gICAgICAgIFNhbml0aXplcixcbiAgICAgICAgW3N0cmluZ3NdLmNvbmNhdCh2YWx1ZXMpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgX19odG1sOiBlc2NhcGVkLFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBcIltvYmplY3QgV3JhcHBlZEhUTUxPYmplY3RdXCI7XG4gICAgICAgIH0sXG4gICAgICAgIGluZm86XG4gICAgICAgICAgXCJUaGlzIGlzIGEgd3JhcHBlZCBIVE1MIG9iamVjdC4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JcIiArXG4gICAgICAgICAgXCJnL2VuLVVTL0ZpcmVmb3hfT1MvU2VjdXJpdHkvU2VjdXJpdHlfQXV0b21hdGlvbiBmb3IgbW9yZS5cIixcbiAgICAgIH07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVbndyYXAgc2FmZSBIVE1MIGNyZWF0ZWQgYnkgY3JlYXRlU2FmZUhUTUwgb3IgYSBjdXN0b20gcmVwbGFjZW1lbnQgdGhhdFxuICAgICAqIHVuZGVyd2VudCBzZWN1cml0eSByZXZpZXcuXG4gICAgICovXG4gICAgdW53cmFwU2FmZUhUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBodG1sT2JqZWN0cyA9IG5ldyBBcnJheShfbGVuKTtcbiAgICAgIGZvciAodmFyIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGh0bWxPYmplY3RzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWFya3VwTGlzdCA9IGh0bWxPYmplY3RzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouX19odG1sO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFya3VwTGlzdC5qb2luKFwiXCIpO1xuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIFNhbml0aXplcjtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgLy8gQ3JlYXRpbmcgaW52aXNpYmxlIGNvbnRhaW5lclxuICBjb25zdCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7IC8vIGZvcmNpbmcgc2Nyb2xsYmFyIHRvIGFwcGVhclxuICBvdXRlci5zdHlsZS5tc092ZXJmbG93U3R5bGUgPSBcInNjcm9sbGJhclwiOyAvLyBuZWVkZWQgZm9yIFdpbkpTIGFwcHNcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgLy8gQ3JlYXRpbmcgaW5uZXIgZWxlbWVudCBhbmQgcGxhY2luZyBpdCBpbiB0aGUgY29udGFpbmVyXG4gIGNvbnN0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIC8vIENhbGN1bGF0aW5nIGRpZmZlcmVuY2UgYmV0d2VlbiBjb250YWluZXIncyBmdWxsIHdpZHRoIGFuZCB0aGUgY2hpbGQgd2lkdGhcbiAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBgJHtvdXRlci5vZmZzZXRXaWR0aCAtIGlubmVyLm9mZnNldFdpZHRofXB4YDtcblxuICAvLyBSZW1vdmluZyB0ZW1wb3JhcnkgZWxlbWVudHMgZnJvbSB0aGUgRE9NXG4gIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcbn07XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi9zZWxlY3RcIik7XG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0T3JNYXRjaGVzXG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKHNlbGVjdG9yLCBjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IHNlbGVjdChzZWxlY3RvciwgY29udGV4dCk7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG5cbiAgaWYgKGlzRWxlbWVudChjb250ZXh0KSAmJiBjb250ZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgc2VsZWN0aW9uLnB1c2goY29udGV4dCk7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiIsIi8qKlxuICogQG5hbWUgaXNFbGVtZW50XG4gKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VsZW1lbnQgPSAodmFsdWUpID0+XG4gIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc2VsZWN0b3IsIGNvbnRleHQpID0+IHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICghY29udGV4dCB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwiYXV0b2NvcnJlY3RcIiwgXCJvZmZcIik7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgbWFzayA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwiKTtcbn07XG4iLCJjb25zdCByZXNvbHZlSWRSZWZzID0gcmVxdWlyZShcInJlc29sdmUtaWQtcmVmc1wiKTtcbmNvbnN0IHRvZ2dsZUZpZWxkTWFzayA9IHJlcXVpcmUoXCIuL3RvZ2dsZS1maWVsZC1tYXNrXCIpO1xuXG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgUFJFU1NFRCA9IFwiYXJpYS1wcmVzc2VkXCI7XG5jb25zdCBTSE9XX0FUVFIgPSBcImRhdGEtc2hvdy10ZXh0XCI7XG5jb25zdCBISURFX0FUVFIgPSBcImRhdGEtaGlkZS10ZXh0XCI7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IChzaG93VGV4dCkgPT5cbiAgc2hvd1RleHQucmVwbGFjZSgvXFxiU2hvd1xcYi9pLCAoc2hvdykgPT4gYCR7c2hvd1swXSA9PT0gXCJTXCIgPyBcIkhcIiA6IFwiaFwifWlkZWApO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZWwpID0+IHtcbiAgLy8gdGhpcyBpcyB0aGUgKnRhcmdldCogc3RhdGU6XG4gIC8vICogaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBhdHRyIGFuZCBpdCdzICE9PSBcInRydWVcIiwgcHJlc3NlZCBpcyB0cnVlXG4gIC8vICogb3RoZXJ3aXNlLCBwcmVzc2VkIGlzIGZhbHNlXG4gIGNvbnN0IHByZXNzZWQgPVxuICAgIGVsLmhhc0F0dHJpYnV0ZShQUkVTU0VEKSAmJiBlbC5nZXRBdHRyaWJ1dGUoUFJFU1NFRCkgIT09IFwidHJ1ZVwiO1xuXG4gIGNvbnN0IGZpZWxkcyA9IHJlc29sdmVJZFJlZnMoZWwuZ2V0QXR0cmlidXRlKENPTlRST0xTKSk7XG4gIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4gdG9nZ2xlRmllbGRNYXNrKGZpZWxkLCBwcmVzc2VkKSk7XG5cbiAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoU0hPV19BVFRSKSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShTSE9XX0FUVFIsIGVsLnRleHRDb250ZW50KTtcbiAgfVxuXG4gIGNvbnN0IHNob3dUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKFNIT1dfQVRUUik7XG4gIGNvbnN0IGhpZGVUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKEhJREVfQVRUUikgfHwgZ2V0SGlkZVRleHQoc2hvd1RleHQpO1xuXG4gIGVsLnRleHRDb250ZW50ID0gcHJlc3NlZCA/IHNob3dUZXh0IDogaGlkZVRleHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZWwuc2V0QXR0cmlidXRlKFBSRVNTRUQsIHByZXNzZWQpO1xuICByZXR1cm4gcHJlc3NlZDtcbn07XG4iLCJjb25zdCBFWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xuY29uc3QgQ09OVFJPTFMgPSBcImFyaWEtY29udHJvbHNcIjtcbmNvbnN0IEhJRERFTiA9IFwiaGlkZGVuXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgbGV0IHNhZmVFeHBhbmRlZCA9IGV4cGFuZGVkO1xuXG4gIGlmICh0eXBlb2Ygc2FmZUV4cGFuZGVkICE9PSBcImJvb2xlYW5cIikge1xuICAgIHNhZmVFeHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcImZhbHNlXCI7XG4gIH1cblxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBzYWZlRXhwYW5kZWQpO1xuXG4gIGNvbnN0IGlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShDT05UUk9MUyk7XG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyB0b2dnbGUgdGFyZ2V0IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgaWYgKHNhZmVFeHBhbmRlZCkge1xuICAgIGNvbnRyb2xzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICB9IGVsc2Uge1xuICAgIGNvbnRyb2xzLnNldEF0dHJpYnV0ZShISURERU4sIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVFeHBhbmRlZDtcbn07XG4iLCJjb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoXCIuL2RlYm91bmNlXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtLS1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZShlbCkge1xuICBjb25zdCBpZCA9IGVsLmRhdGFzZXQudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9XG4gICAgaWQuY2hhckF0KDApID09PSBcIiNcIlxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgaWYgKCFjaGVja0xpc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIGxldCBzdGF0dXNTdW1tYXJ5ID0gXCJcIjtcbiAgT2JqZWN0LmVudHJpZXMoZWwuZGF0YXNldCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKFwidmFsaWRhdGVcIikpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKFwidmFsaWRhdGVcIi5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICAgIGNvbnN0IHN0YXR1c1N1bW1hcnlDb250YWluZXIgPSB2YWxpZGF0b3JQYXJlbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXZhbGlkYXRpb24tc3RhdHVzXWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcblxuICAgICAgaWYgKCF2YWxpZGF0b3JDaGVja2JveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRvciBjaGVja2JveCBmb3VuZCBmb3I6IFwiJHt2YWxpZGF0b3JOYW1lfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0dXMgcmVwb3J0cyBmb3IgY2hlY2tsaXN0IGl0ZW1zXG4gICAgICBjb25zdCBzdGF0dXNDb21wbGV0ZSA9IGVsLmRhdGFzZXQudmFsaWRhdGlvbkNvbXBsZXRlIHx8IFwic3RhdHVzIGNvbXBsZXRlXCI7XG4gICAgICBjb25zdCBzdGF0dXNJbmNvbXBsZXRlID1cbiAgICAgICAgZWwuZGF0YXNldC52YWxpZGF0aW9uSW5jb21wbGV0ZSB8fCBcInN0YXR1cyBpbmNvbXBsZXRlXCI7XG4gICAgICBsZXQgY2hlY2tib3hDb250ZW50ID0gYCR7dmFsaWRhdG9yQ2hlY2tib3gudGV4dENvbnRlbnR9IGA7XG5cbiAgICAgIGlmICh2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QuY29udGFpbnMoQ0hFQ0tFRF9DTEFTUykpIHtcbiAgICAgICAgY2hlY2tib3hDb250ZW50ICs9IHN0YXR1c0NvbXBsZXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tib3hDb250ZW50ICs9IHN0YXR1c0luY29tcGxldGU7XG4gICAgICB9XG5cbiAgICAgIC8vIG1vdmUgc3RhdHVzIHVwZGF0ZXMgdG8gYXJpYS1sYWJlbCBvbiBjaGVja2xpc3QgaXRlbVxuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBjaGVja2JveENvbnRlbnQpO1xuXG4gICAgICAvLyBDcmVhdGUgYSBzdW1tYXJ5IG9mIHN0YXR1cyBmb3IgYWxsIGNoZWNrbGlzdCBpdGVtc1xuICAgICAgc3RhdHVzU3VtbWFyeSArPSBgJHtjaGVja2JveENvbnRlbnR9LiBgO1xuXG4gICAgICAvLyBBZGQgc3VtbWFyeSB0byBzY3JlZW4gcmVhZGVyIHN1bW1hcnkgY29udGFpbmVyLCBhZnRlciBhIGRlbGF5XG4gICAgICBjb25zdCBzclVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci50ZXh0Q29udGVudCA9IHN0YXR1c1N1bW1hcnk7XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgc3JVcGRhdGVTdGF0dXMoKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
