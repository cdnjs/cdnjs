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
    [BUTTON](event) {
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
  const newElementType = isMobile ? "button" : "h4";
  primaryLinks.forEach(currentElement => {
    const currentElementClasses = currentElement.getAttribute("class");

    // Create the new element
    const newElement = document.createElement(newElementType);
    newElement.setAttribute("class", currentElementClasses);
    newElement.classList.toggle(`${PREFIX}-footer__primary-link--button`, isMobile);
    newElement.textContent = currentElement.textContent;
    if (isMobile) {
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
    parentNavItem.querySelector(NAV_CONTROL).focus();
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
  sectionHeadings.forEach((el, i) => {
    const listItem = document.createElement("li");
    const navLinks = document.createElement("a");
    const anchorTag = document.createElement("a");
    const textContentOfLink = el.textContent;
    const tag = el.tagName.toLowerCase();
    listItem.classList.add(IN_PAGE_NAV_ITEM_CLASS);
    if (tag === "h3") {
      listItem.classList.add(SUB_ITEM_CLASS);
    }
    navLinks.setAttribute("href", `#section_${i}`);
    navLinks.setAttribute("class", IN_PAGE_NAV_LINK_CLASS);
    navLinks.textContent = textContentOfLink;
    anchorTag.setAttribute("id", `section_${i}`);
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
  handleScrollToSection(target);
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
        event.stopPropagation();
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
  originalLocationPlaceHolder.setAttribute('aria-hidden', 'true');
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
    getEntity: function (s) {
      return Sanitizer._entities[s];
    },
    /**
     * Escapes HTML for all values in a tagged template string.
     */
    escapeHTML: function (strings) {
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
          return '[object WrappedHTMLObject]';
        },
        info: 'This is a wrapped HTML object. See https://developer.mozilla.or' + 'g/en-US/Firefox_OS/Security/Security_Automation for more.'
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
      return markupList.join('');
    }
  };
  return Sanitizer;
});

},{}],51:[function(require,module,exports){
"use strict";

module.exports = function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2xhc3NsaXN0LXBvbHlmaWxsL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lbGVtZW50LWNsb3Nlc3QvZWxlbWVudC1jbG9zZXN0LmpzIiwibm9kZV9tb2R1bGVzL2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvYmVoYXZpb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvY29tcG9zZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9kZWxlZ2F0ZUFsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9pZ25vcmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3Iva2V5bWFwL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL29uY2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVzb2x2ZS1pZC1yZWZzL2luZGV4LmpzIiwicGFja2FnZXMvX3VzYS1wYXNzd29yZC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtYWNjb3JkaW9uL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1iYW5uZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWNoYXJhY3Rlci1jb3VudC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtY29tYm8tYm94L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtZGF0ZS1yYW5nZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZvb3Rlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtaGVhZGVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1pbi1wYWdlLW5hdmlnYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LW1hc2svc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LXByZWZpeC1zdWZmaXgvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWxhbmd1YWdlLXNlbGVjdG9yL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1tb2RhbC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2Etc2VhcmNoL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1za2lwbmF2L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS10YWJsZS9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtdGltZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXRvb2x0aXAvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXZhbGlkYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvaW5kZXguanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy9wb2x5ZmlsbHMvY3VzdG9tLWV2ZW50LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL2VsZW1lbnQtaGlkZGVuLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvcG9seWZpbGxzL251bWJlci1pcy1uYW4uanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy9wb2x5ZmlsbHMvc3ZnNGV2ZXJ5Ym9keS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3N0YXJ0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYWN0aXZlLWVsZW1lbnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvci5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2RlYm91bmNlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW9zLWRldmljZS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplci5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Njcm9sbGJhci13aWR0aC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLWZpZWxkLW1hc2suanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZS5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLFVBQVUsSUFBSSxNQUFNLENB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QUFDLE9BQU8sRUFBRSxDQUFDO0VBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztFQUM1QyxPQUFPLE9BQU87QUFDaEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFJLEtBQUssSUFBSztFQUM3QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO0VBQ2hDLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7QUFDbEMsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sU0FBUyxHQUFJLEtBQUssSUFBSztFQUMzQixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO0VBQ2hDLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEtBQUs7RUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENB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QUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLElBQUksaUJBQWlCO01BQ3pFLE1BQU0sZ0JBQWdCLEdBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLElBQUksbUJBQW1CO01BQ3hELElBQUksZUFBZSxHQUFJLEdBQUUsaUJBQWlCLENBQUMsV0FBWSxHQUFFO01BRXpELElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN2RCxlQUFlLElBQUksY0FBYztNQUNuQyxDQUFDLE1BQU07UUFDTCxlQUFlLElBQUksZ0JBQWdCO01BQ3JDOztNQUVBO01BQ0EsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7O01BRTdEO01BQ0EsYUFBYSxJQUFLLEdBQUUsZUFBZ0IsSUFBRzs7TUFFdkM7TUFDQSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTTtRQUNwQyxzQkFBc0IsQ0FBQyxXQUFXLEdBQUcsYUFBYTtNQUNwRCxDQUFDLEVBQUUsSUFBSSxDQUFDO01BRVIsY0FBYyxFQUFFO0lBQ2xCO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTQtMDctMjNcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG4vKiBDb3BpZWQgZnJvbSBNRE46XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbGFzc0xpc3RcbiAqL1xuXG5pZiAoXCJkb2N1bWVudFwiIGluIHdpbmRvdy5zZWxmKSB7XG5cbiAgLy8gRnVsbCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgd2l0aCBubyBjbGFzc0xpc3Qgc3VwcG9ydFxuICAvLyBJbmNsdWRpbmcgSUUgPCBFZGdlIG1pc3NpbmcgU1ZHRWxlbWVudC5jbGFzc0xpc3RcbiAgaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSlcbiAgICB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgJiYgIShcImNsYXNzTGlzdFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJnXCIpKSkge1xuXG4gIChmdW5jdGlvbiAodmlldykge1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxuICAgIHZhclxuICAgICAgICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuICAgICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgICAsIGVsZW1DdHJQcm90byA9IHZpZXcuRWxlbWVudFtwcm90b1Byb3BdXG4gICAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICAgLCBzdHJUcmltID0gU3RyaW5nW3Byb3RvUHJvcF0udHJpbSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpO1xuICAgICAgfVxuICAgICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAsIGxlbiA9IHRoaXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuICAgICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgIH1cbiAgICAgICwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuID09PSBcIlwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICBcIlNZTlRBWF9FUlJcIlxuICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcbiAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcbiAgICAgIH1cbiAgICAgICwgQ2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG4gICAgICAgICAgLCBjbGFzc2VzID0gdHJpbW1lZENsYXNzZXMgPyB0cmltbWVkQ2xhc3Nlcy5zcGxpdCgvXFxzKy8pIDogW11cbiAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgLCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnB1c2goY2xhc3Nlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgICwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG4gICAgICAsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG4gICAgICB9XG4gICAgO1xuICAgIC8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbiAgICAvLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbiAgICBET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbiAgICBjbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgdG9rZW4gKz0gXCJcIjtcbiAgICAgIHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbiAgICB9O1xuICAgIGNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAgIHRva2VucyA9IGFyZ3VtZW50c1xuICAgICAgICAsIGkgPSAwXG4gICAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICAgLCB0b2tlblxuICAgICAgICAsIHVwZGF0ZWQgPSBmYWxzZVxuICAgICAgO1xuICAgICAgZG8ge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG4gICAgICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBsKTtcblxuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXJcbiAgICAgICAgICB0b2tlbnMgPSBhcmd1bWVudHNcbiAgICAgICAgLCBpID0gMFxuICAgICAgICAsIGwgPSB0b2tlbnMubGVuZ3RoXG4gICAgICAgICwgdG9rZW5cbiAgICAgICAgLCB1cGRhdGVkID0gZmFsc2VcbiAgICAgICAgLCBpbmRleFxuICAgICAgO1xuICAgICAgZG8ge1xuICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXSArIFwiXCI7XG4gICAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgICAgd2hpbGUgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBsKTtcblxuICAgICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4sIGZvcmNlKSB7XG4gICAgICB0b2tlbiArPSBcIlwiO1xuXG4gICAgICB2YXJcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuICAgICAgICAsIG1ldGhvZCA9IHJlc3VsdCA/XG4gICAgICAgICAgZm9yY2UgIT09IHRydWUgJiYgXCJyZW1vdmVcIlxuICAgICAgICA6XG4gICAgICAgICAgZm9yY2UgIT09IGZhbHNlICYmIFwiYWRkXCJcbiAgICAgIDtcblxuICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICB0aGlzW21ldGhvZF0odG9rZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9yY2UgPT09IHRydWUgfHwgZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbiAgICB9O1xuXG4gICAgaWYgKG9iakN0ci5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgdmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuICAgICAgICAgIGdldDogY2xhc3NMaXN0R2V0dGVyXG4gICAgICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG9iakN0ci5kZWZpbmVQcm9wZXJ0eShlbGVtQ3RyUHJvdG8sIGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdFByb3BEZXNjKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuICAgICAgICBpZiAoZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuICAgICAgICAgIGNsYXNzTGlzdFByb3BEZXNjLmVudW1lcmFibGUgPSBmYWxzZTtcbiAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgIGVsZW1DdHJQcm90by5fX2RlZmluZUdldHRlcl9fKGNsYXNzTGlzdFByb3AsIGNsYXNzTGlzdEdldHRlcik7XG4gICAgfVxuXG4gICAgfSh3aW5kb3cuc2VsZikpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAvLyBUaGVyZSBpcyBmdWxsIG9yIHBhcnRpYWwgbmF0aXZlIGNsYXNzTGlzdCBzdXBwb3J0LCBzbyBqdXN0IGNoZWNrIGlmIHdlIG5lZWRcbiAgICAvLyB0byBub3JtYWxpemUgdGhlIGFkZC9yZW1vdmUgYW5kIHRvZ2dsZSBBUElzLlxuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgICB2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKTtcblxuICAgICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cbiAgICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcbiAgICAgICAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBvcmlnaW5hbCA9IERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuICAgICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgICAgfVxuXG4gICAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYzNcIiwgZmFsc2UpO1xuXG4gICAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgICAvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpIHtcbiAgICAgICAgdmFyIF90b2dnbGUgPSBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgIGlmICgxIGluIGFyZ3VtZW50cyAmJiAhdGhpcy5jb250YWlucyh0b2tlbikgPT09ICFmb3JjZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgIH1cblxuICAgICAgdGVzdEVsZW1lbnQgPSBudWxsO1xuICAgIH0oKSk7XG4gIH1cbn1cbiIsIi8vIGVsZW1lbnQtY2xvc2VzdCB8IENDMC0xLjAgfCBnaXRodWIuY29tL2pvbmF0aGFudG5lYWwvY2xvc2VzdFxuXG4oZnVuY3Rpb24gKEVsZW1lbnRQcm90bykge1xuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLm1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblx0XHRcdHZhciBlbGVtZW50cyA9IChlbGVtZW50LmRvY3VtZW50IHx8IGVsZW1lbnQub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHR2YXIgaW5kZXggPSAwO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHQrK2luZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuXHRcdH07XG5cdH1cblxuXHRpZiAodHlwZW9mIEVsZW1lbnRQcm90by5jbG9zZXN0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0RWxlbWVudFByb3RvLmNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH07XG5cdH1cbn0pKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSk7XG4iLCIvKiBnbG9iYWwgZGVmaW5lLCBLZXlib2FyZEV2ZW50LCBtb2R1bGUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuICB2YXIga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsID0ge1xuICAgIHBvbHlmaWxsOiBwb2x5ZmlsbCxcbiAgICBrZXlzOiB7XG4gICAgICAzOiAnQ2FuY2VsJyxcbiAgICAgIDY6ICdIZWxwJyxcbiAgICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgICAgOTogJ1RhYicsXG4gICAgICAxMjogJ0NsZWFyJyxcbiAgICAgIDEzOiAnRW50ZXInLFxuICAgICAgMTY6ICdTaGlmdCcsXG4gICAgICAxNzogJ0NvbnRyb2wnLFxuICAgICAgMTg6ICdBbHQnLFxuICAgICAgMTk6ICdQYXVzZScsXG4gICAgICAyMDogJ0NhcHNMb2NrJyxcbiAgICAgIDI3OiAnRXNjYXBlJyxcbiAgICAgIDI4OiAnQ29udmVydCcsXG4gICAgICAyOTogJ05vbkNvbnZlcnQnLFxuICAgICAgMzA6ICdBY2NlcHQnLFxuICAgICAgMzE6ICdNb2RlQ2hhbmdlJyxcbiAgICAgIDMyOiAnICcsXG4gICAgICAzMzogJ1BhZ2VVcCcsXG4gICAgICAzNDogJ1BhZ2VEb3duJyxcbiAgICAgIDM1OiAnRW5kJyxcbiAgICAgIDM2OiAnSG9tZScsXG4gICAgICAzNzogJ0Fycm93TGVmdCcsXG4gICAgICAzODogJ0Fycm93VXAnLFxuICAgICAgMzk6ICdBcnJvd1JpZ2h0JyxcbiAgICAgIDQwOiAnQXJyb3dEb3duJyxcbiAgICAgIDQxOiAnU2VsZWN0JyxcbiAgICAgIDQyOiAnUHJpbnQnLFxuICAgICAgNDM6ICdFeGVjdXRlJyxcbiAgICAgIDQ0OiAnUHJpbnRTY3JlZW4nLFxuICAgICAgNDU6ICdJbnNlcnQnLFxuICAgICAgNDY6ICdEZWxldGUnLFxuICAgICAgNDg6IFsnMCcsICcpJ10sXG4gICAgICA0OTogWycxJywgJyEnXSxcbiAgICAgIDUwOiBbJzInLCAnQCddLFxuICAgICAgNTE6IFsnMycsICcjJ10sXG4gICAgICA1MjogWyc0JywgJyQnXSxcbiAgICAgIDUzOiBbJzUnLCAnJSddLFxuICAgICAgNTQ6IFsnNicsICdeJ10sXG4gICAgICA1NTogWyc3JywgJyYnXSxcbiAgICAgIDU2OiBbJzgnLCAnKiddLFxuICAgICAgNTc6IFsnOScsICcoJ10sXG4gICAgICA5MTogJ09TJyxcbiAgICAgIDkzOiAnQ29udGV4dE1lbnUnLFxuICAgICAgMTQ0OiAnTnVtTG9jaycsXG4gICAgICAxNDU6ICdTY3JvbGxMb2NrJyxcbiAgICAgIDE4MTogJ1ZvbHVtZU11dGUnLFxuICAgICAgMTgyOiAnVm9sdW1lRG93bicsXG4gICAgICAxODM6ICdWb2x1bWVVcCcsXG4gICAgICAxODY6IFsnOycsICc6J10sXG4gICAgICAxODc6IFsnPScsICcrJ10sXG4gICAgICAxODg6IFsnLCcsICc8J10sXG4gICAgICAxODk6IFsnLScsICdfJ10sXG4gICAgICAxOTA6IFsnLicsICc+J10sXG4gICAgICAxOTE6IFsnLycsICc/J10sXG4gICAgICAxOTI6IFsnYCcsICd+J10sXG4gICAgICAyMTk6IFsnWycsICd7J10sXG4gICAgICAyMjA6IFsnXFxcXCcsICd8J10sXG4gICAgICAyMjE6IFsnXScsICd9J10sXG4gICAgICAyMjI6IFtcIidcIiwgJ1wiJ10sXG4gICAgICAyMjQ6ICdNZXRhJyxcbiAgICAgIDIyNTogJ0FsdEdyYXBoJyxcbiAgICAgIDI0NjogJ0F0dG4nLFxuICAgICAgMjQ3OiAnQ3JTZWwnLFxuICAgICAgMjQ4OiAnRXhTZWwnLFxuICAgICAgMjQ5OiAnRXJhc2VFb2YnLFxuICAgICAgMjUwOiAnUGxheScsXG4gICAgICAyNTE6ICdab29tT3V0J1xuICAgIH1cbiAgfTtcblxuICAvLyBGdW5jdGlvbiBrZXlzIChGMS0yNCkuXG4gIHZhciBpO1xuICBmb3IgKGkgPSAxOyBpIDwgMjU7IGkrKykge1xuICAgIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzWzExMSArIGldID0gJ0YnICsgaTtcbiAgfVxuXG4gIC8vIFByaW50YWJsZSBBU0NJSSBjaGFyYWN0ZXJzLlxuICB2YXIgbGV0dGVyID0gJyc7XG4gIGZvciAoaSA9IDY1OyBpIDwgOTE7IGkrKykge1xuICAgIGxldHRlciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoaSk7XG4gICAga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbaV0gPSBbbGV0dGVyLnRvTG93ZXJDYXNlKCksIGxldHRlci50b1VwcGVyQ2FzZSgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvbHlmaWxsICgpIHtcbiAgICBpZiAoISgnS2V5Ym9hcmRFdmVudCcgaW4gd2luZG93KSB8fFxuICAgICAgICAna2V5JyBpbiBLZXlib2FyZEV2ZW50LnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFBvbHlmaWxsIGBrZXlgIG9uIGBLZXlib2FyZEV2ZW50YC5cbiAgICB2YXIgcHJvdG8gPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1t0aGlzLndoaWNoIHx8IHRoaXMua2V5Q29kZV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgIGtleSA9IGtleVsrdGhpcy5zaGlmdEtleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEtleWJvYXJkRXZlbnQucHJvdG90eXBlLCAna2V5JywgcHJvdG8pO1xuICAgIHJldHVybiBwcm90bztcbiAgfVxuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsJywga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbDtcbiAgfSBlbHNlIGlmICh3aW5kb3cpIHtcbiAgICB3aW5kb3cua2V5Ym9hcmRldmVudEtleVBvbHlmaWxsID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsO1xuICB9XG5cbn0pKCk7XG4iLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgZGVsZWdhdGVBbGwgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZUFsbCcpO1xuXG5jb25zdCBERUxFR0FURV9QQVRURVJOID0gL14oLispOmRlbGVnYXRlXFwoKC4rKVxcKSQvO1xuY29uc3QgU1BBQ0UgPSAnICc7XG5cbmNvbnN0IGdldExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgdmFyIG1hdGNoID0gdHlwZS5tYXRjaChERUxFR0FURV9QQVRURVJOKTtcbiAgdmFyIHNlbGVjdG9yO1xuICBpZiAobWF0Y2gpIHtcbiAgICB0eXBlID0gbWF0Y2hbMV07XG4gICAgc2VsZWN0b3IgPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHZhciBvcHRpb25zO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGNhcHR1cmU6IHBvcEtleShoYW5kbGVyLCAnY2FwdHVyZScpLFxuICAgICAgcGFzc2l2ZTogcG9wS2V5KGhhbmRsZXIsICdwYXNzaXZlJylcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxpc3RlbmVyID0ge1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBkZWxlZ2F0ZTogKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0JylcbiAgICAgID8gZGVsZWdhdGVBbGwoaGFuZGxlcilcbiAgICAgIDogc2VsZWN0b3JcbiAgICAgICAgPyBkZWxlZ2F0ZShzZWxlY3RvciwgaGFuZGxlcilcbiAgICAgICAgOiBoYW5kbGVyLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcblxuICBpZiAodHlwZS5pbmRleE9mKFNQQUNFKSA+IC0xKSB7XG4gICAgcmV0dXJuIHR5cGUuc3BsaXQoU1BBQ0UpLm1hcChmdW5jdGlvbihfdHlwZSkge1xuICAgICAgcmV0dXJuIGFzc2lnbih7dHlwZTogX3R5cGV9LCBsaXN0ZW5lcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIudHlwZSA9IHR5cGU7XG4gICAgcmV0dXJuIFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbnZhciBwb3BLZXkgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlaGF2aW9yKGV2ZW50cywgcHJvcHMpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24obWVtbywgdHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0eXBlLCBldmVudHNbdHlwZV0pO1xuICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KGxpc3RlbmVycyk7XG4gICAgfSwgW10pO1xuXG4gIHJldHVybiBhc3NpZ24oe1xuICAgIGFkZDogZnVuY3Rpb24gYWRkQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZUJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgcHJvcHMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tcG9zZShmdW5jdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnNvbWUoZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpID09PSBmYWxzZTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbn07XG4iLCIvLyBwb2x5ZmlsbCBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0XG5yZXF1aXJlKCdlbGVtZW50LWNsb3Nlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZShzZWxlY3RvciwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlbGVnYXRpb24oZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRhcmdldCwgZXZlbnQpO1xuICAgIH1cbiAgfVxufTtcbiIsImNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGNvbXBvc2UgPSByZXF1aXJlKCcuLi9jb21wb3NlJyk7XG5cbmNvbnN0IFNQTEFUID0gJyonO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlQWxsKHNlbGVjdG9ycykge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2VsZWN0b3JzKVxuXG4gIC8vIFhYWCBvcHRpbWl6YXRpb246IGlmIHRoZXJlIGlzIG9ubHkgb25lIGhhbmRsZXIgYW5kIGl0IGFwcGxpZXMgdG9cbiAgLy8gYWxsIGVsZW1lbnRzICh0aGUgXCIqXCIgQ1NTIHNlbGVjdG9yKSwgdGhlbiBqdXN0IHJldHVybiB0aGF0XG4gIC8vIGhhbmRsZXJcbiAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09IFNQTEFUKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yc1tTUExBVF07XG4gIH1cblxuICBjb25zdCBkZWxlZ2F0ZXMgPSBrZXlzLnJlZHVjZShmdW5jdGlvbihtZW1vLCBzZWxlY3Rvcikge1xuICAgIG1lbW8ucHVzaChkZWxlZ2F0ZShzZWxlY3Rvciwgc2VsZWN0b3JzW3NlbGVjdG9yXSkpO1xuICAgIHJldHVybiBtZW1vO1xuICB9LCBbXSk7XG4gIHJldHVybiBjb21wb3NlKGRlbGVnYXRlcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmUoZWxlbWVudCwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlnbm9yYW5jZShlKSB7XG4gICAgaWYgKGVsZW1lbnQgIT09IGUudGFyZ2V0ICYmICFlbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBiZWhhdmlvcjogICAgIHJlcXVpcmUoJy4vYmVoYXZpb3InKSxcbiAgZGVsZWdhdGU6ICAgICByZXF1aXJlKCcuL2RlbGVnYXRlJyksXG4gIGRlbGVnYXRlQWxsOiAgcmVxdWlyZSgnLi9kZWxlZ2F0ZUFsbCcpLFxuICBpZ25vcmU6ICAgICAgIHJlcXVpcmUoJy4vaWdub3JlJyksXG4gIGtleW1hcDogICAgICAgcmVxdWlyZSgnLi9rZXltYXAnKSxcbn07XG4iLCJyZXF1aXJlKCdrZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbCcpO1xuXG4vLyB0aGVzZSBhcmUgdGhlIG9ubHkgcmVsZXZhbnQgbW9kaWZpZXJzIHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLFxuLy8gYWNjb3JkaW5nIHRvIE1ETjpcbi8vIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9nZXRNb2RpZmllclN0YXRlPlxuY29uc3QgTU9ESUZJRVJTID0ge1xuICAnQWx0JzogICAgICAnYWx0S2V5JyxcbiAgJ0NvbnRyb2wnOiAgJ2N0cmxLZXknLFxuICAnQ3RybCc6ICAgICAnY3RybEtleScsXG4gICdTaGlmdCc6ICAgICdzaGlmdEtleSdcbn07XG5cbmNvbnN0IE1PRElGSUVSX1NFUEFSQVRPUiA9ICcrJztcblxuY29uc3QgZ2V0RXZlbnRLZXkgPSBmdW5jdGlvbihldmVudCwgaGFzTW9kaWZpZXJzKSB7XG4gIHZhciBrZXkgPSBldmVudC5rZXk7XG4gIGlmIChoYXNNb2RpZmllcnMpIHtcbiAgICBmb3IgKHZhciBtb2RpZmllciBpbiBNT0RJRklFUlMpIHtcbiAgICAgIGlmIChldmVudFtNT0RJRklFUlNbbW9kaWZpZXJdXSA9PT0gdHJ1ZSkge1xuICAgICAgICBrZXkgPSBbbW9kaWZpZXIsIGtleV0uam9pbihNT0RJRklFUl9TRVBBUkFUT1IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXltYXAoa2V5cykge1xuICBjb25zdCBoYXNNb2RpZmllcnMgPSBPYmplY3Qua2V5cyhrZXlzKS5zb21lKGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkuaW5kZXhPZihNT0RJRklFUl9TRVBBUkFUT1IpID4gLTE7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIga2V5ID0gZ2V0RXZlbnRLZXkoZXZlbnQsIGhhc01vZGlmaWVycyk7XG4gICAgcmV0dXJuIFtrZXksIGtleS50b0xvd2VyQ2FzZSgpXVxuICAgICAgLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIF9rZXkpIHtcbiAgICAgICAgaWYgKF9rZXkgaW4ga2V5cykge1xuICAgICAgICAgIHJlc3VsdCA9IGtleXNba2V5XS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgdW5kZWZpbmVkKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLk1PRElGSUVSUyA9IE1PRElGSUVSUztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25jZShsaXN0ZW5lciwgb3B0aW9ucykge1xuICB2YXIgd3JhcHBlZCA9IGZ1bmN0aW9uIHdyYXBwZWRPbmNlKGUpIHtcbiAgICBlLmN1cnJlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIHdyYXBwZWQsIG9wdGlvbnMpO1xuICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKHRoaXMsIGUpO1xuICB9O1xuICByZXR1cm4gd3JhcHBlZDtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJFX1RSSU0gPSAvKF5cXHMrKXwoXFxzKyQpL2c7XG52YXIgUkVfU1BMSVQgPSAvXFxzKy87XG5cbnZhciB0cmltID0gU3RyaW5nLnByb3RvdHlwZS50cmltXG4gID8gZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24oc3RyKSB7IHJldHVybiBzdHIucmVwbGFjZShSRV9UUklNLCAnJyk7IH07XG5cbnZhciBxdWVyeUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yKCdbaWQ9XCInICsgaWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNvbHZlSWRzKGlkcywgZG9jKSB7XG4gIGlmICh0eXBlb2YgaWRzICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcgYnV0IGdvdCAnICsgKHR5cGVvZiBpZHMpKTtcbiAgfVxuXG4gIGlmICghZG9jKSB7XG4gICAgZG9jID0gd2luZG93LmRvY3VtZW50O1xuICB9XG5cbiAgdmFyIGdldEVsZW1lbnRCeUlkID0gZG9jLmdldEVsZW1lbnRCeUlkXG4gICAgPyBkb2MuZ2V0RWxlbWVudEJ5SWQuYmluZChkb2MpXG4gICAgOiBxdWVyeUJ5SWQuYmluZChkb2MpO1xuXG4gIGlkcyA9IHRyaW0oaWRzKS5zcGxpdChSRV9TUExJVCk7XG5cbiAgLy8gWFhYIHdlIGNhbiBzaG9ydC1jaXJjdWl0IGhlcmUgYmVjYXVzZSB0cmltbWluZyBhbmQgc3BsaXR0aW5nIGFcbiAgLy8gc3RyaW5nIG9mIGp1c3Qgd2hpdGVzcGFjZSBwcm9kdWNlcyBhbiBhcnJheSBjb250YWluaW5nIGEgc2luZ2xlLFxuICAvLyBlbXB0eSBzdHJpbmdcbiAgaWYgKGlkcy5sZW5ndGggPT09IDEgJiYgaWRzWzBdID09PSAnJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBpZHNcbiAgICAubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgZWwgPSBnZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCB3aXRoIGlkOiBcIicgKyBpZCArICdcIicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsO1xuICAgIH0pO1xufTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdG9nZ2xlRm9ybUlucHV0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNob3ctcGFzc3dvcmRgO1xuXG5mdW5jdGlvbiB0b2dnbGUoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdG9nZ2xlRm9ybUlucHV0KHRoaXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtMSU5LXTogdG9nZ2xlLFxuICB9LFxufSk7XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlXCIpO1xuY29uc3QgaXNFbGVtZW50SW5WaWV3cG9ydCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pbi12aWV3cG9ydFwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBBQ0NPUkRJT04gPSBgLiR7UFJFRklYfS1hY2NvcmRpb24sIC4ke1BSRUZJWH0tYWNjb3JkaW9uLS1ib3JkZXJlZGA7XG5jb25zdCBCVVRUT04gPSBgLiR7UFJFRklYfS1hY2NvcmRpb25fX2J1dHRvblthcmlhLWNvbnRyb2xzXWA7XG5jb25zdCBFWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xuY29uc3QgTVVMVElTRUxFQ1RBQkxFID0gXCJkYXRhLWFsbG93LW11bHRpcGxlXCI7XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGJ1dHRvbiBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBhY2NvcmRpb24gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFjY29yZGlvblxuICogQHJldHVybiB7YXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRBY2NvcmRpb25CdXR0b25zID0gKGFjY29yZGlvbikgPT4ge1xuICBjb25zdCBidXR0b25zID0gc2VsZWN0KEJVVFRPTiwgYWNjb3JkaW9uKTtcblxuICByZXR1cm4gYnV0dG9ucy5maWx0ZXIoKGJ1dHRvbikgPT4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIGEgYnV0dG9uJ3MgXCJwcmVzc2VkXCIgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGV4cGFuZGVkIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSByZXN1bHRpbmcgc3RhdGVcbiAqL1xuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgY29uc3QgYWNjb3JkaW9uID0gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKTtcbiAgbGV0IHNhZmVFeHBhbmRlZCA9IGV4cGFuZGVkO1xuXG4gIGlmICghYWNjb3JkaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0JVVFRPTn0gaXMgbWlzc2luZyBvdXRlciAke0FDQ09SRElPTn1gKTtcbiAgfVxuXG4gIHNhZmVFeHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcblxuICAvLyBYWFggbXVsdGlzZWxlY3RhYmxlIGlzIG9wdC1pbiwgdG8gcHJlc2VydmUgbGVnYWN5IGJlaGF2aW9yXG4gIGNvbnN0IG11bHRpc2VsZWN0YWJsZSA9IGFjY29yZGlvbi5oYXNBdHRyaWJ1dGUoTVVMVElTRUxFQ1RBQkxFKTtcblxuICBpZiAoc2FmZUV4cGFuZGVkICYmICFtdWx0aXNlbGVjdGFibGUpIHtcbiAgICBnZXRBY2NvcmRpb25CdXR0b25zKGFjY29yZGlvbikuZm9yRWFjaCgob3RoZXIpID0+IHtcbiAgICAgIGlmIChvdGhlciAhPT0gYnV0dG9uKSB7XG4gICAgICAgIHRvZ2dsZShvdGhlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzaG93QnV0dG9uID0gKGJ1dHRvbikgPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgdHJ1ZSk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZVxuICovXG5jb25zdCBoaWRlQnV0dG9uID0gKGJ1dHRvbikgPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG5jb25zdCBhY2NvcmRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtCVVRUT05dKGV2ZW50KSB7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbih0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcInRydWVcIikge1xuICAgICAgICAgIC8vIFdlIHdlcmUganVzdCBleHBhbmRlZCwgYnV0IGlmIGFub3RoZXIgYWNjb3JkaW9uIHdhcyBhbHNvIGp1c3RcbiAgICAgICAgICAvLyBjb2xsYXBzZWQsIHdlIG1heSBubyBsb25nZXIgYmUgaW4gdGhlIHZpZXdwb3J0LiBUaGlzIGVuc3VyZXNcbiAgICAgICAgICAvLyB0aGF0IHdlIGFyZSBzdGlsbCB2aXNpYmxlLCBzbyB0aGUgdXNlciBpc24ndCBjb25mdXNlZC5cbiAgICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodGhpcykpIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCByb290KS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgY29uc3QgZXhwYW5kZWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbihidXR0b24sIGV4cGFuZGVkKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgQUNDT1JESU9OLFxuICAgIEJVVFRPTixcbiAgICBzaG93OiBzaG93QnV0dG9uLFxuICAgIGhpZGU6IGhpZGVCdXR0b24sXG4gICAgdG9nZ2xlOiB0b2dnbGVCdXR0b24sXG4gICAgZ2V0QnV0dG9uczogZ2V0QWNjb3JkaW9uQnV0dG9ucyxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2NvcmRpb247XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1iYW5uZXJfX2hlYWRlcmA7XG5jb25zdCBFWFBBTkRFRF9DTEFTUyA9IGAke1BSRUZJWH0tYmFubmVyX19oZWFkZXItLWV4cGFuZGVkYDtcblxuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gdG9nZ2xlRWwoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtgJHtIRUFERVJ9IFthcmlhLWNvbnRyb2xzXWBdOiB0b2dnbGVCYW5uZXIsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2RlYm91bmNlXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hBUkFDVEVSX0NPVU5UX0NMQVNTID0gYCR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRgO1xuY29uc3QgQ0hBUkFDVEVSX0NPVU5UID0gYC4ke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31gO1xuY29uc3QgSU5QVVQgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX2ZpZWxkYDtcbmNvbnN0IE1FU1NBR0UgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX21lc3NhZ2VgO1xuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJUaGUgY29udGVudCBpcyB0b28gbG9uZy5cIjtcbmNvbnN0IE1FU1NBR0VfSU5WQUxJRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19zdGF0dXMtLWludmFsaWRgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfQ0xBU1MgPSBgJHtDSEFSQUNURVJfQ09VTlRfQ0xBU1N9X19zdGF0dXNgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWV9DTEFTUyA9IGAke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31fX3NyLXN0YXR1c2A7XG5jb25zdCBTVEFUVVNfTUVTU0FHRSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWA7XG5jb25zdCBERUZBVUxUX1NUQVRVU19MQUJFTCA9IGBjaGFyYWN0ZXJzIGFsbG93ZWRgO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJvb3QgYW5kIG1lc3NhZ2UgZWxlbWVudCBmb3IgYW4gY2hhcmFjdGVyIGNvdW50IGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKiBAcmV0dXJucyB7Q2hhcmFjdGVyQ291bnRFbGVtZW50c30gZWxlbWVudHMgVGhlIHJvb3QgYW5kIG1lc3NhZ2UgZWxlbWVudC5cbiAqL1xuY29uc3QgZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGNoYXJhY3RlckNvdW50RWwgPSBpbnB1dEVsLmNsb3Nlc3QoQ0hBUkFDVEVSX0NPVU5UKTtcblxuICBpZiAoIWNoYXJhY3RlckNvdW50RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7SU5QVVR9IGlzIG1pc3Npbmcgb3V0ZXIgJHtDSEFSQUNURVJfQ09VTlR9YCk7XG4gIH1cblxuICBjb25zdCBtZXNzYWdlRWwgPSBjaGFyYWN0ZXJDb3VudEVsLnF1ZXJ5U2VsZWN0b3IoTUVTU0FHRSk7XG5cbiAgaWYgKCFtZXNzYWdlRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Q0hBUkFDVEVSX0NPVU5UfSBpcyBtaXNzaW5nIGlubmVyICR7TUVTU0FHRX1gKTtcbiAgfVxuXG4gIHJldHVybiB7IGNoYXJhY3RlckNvdW50RWwsIG1lc3NhZ2VFbCB9O1xufTtcblxuLyoqXG4gKiBNb3ZlIG1heGxlbmd0aCBhdHRyaWJ1dGUgdG8gYSBkYXRhIGF0dHJpYnV0ZSBvbiB1c2EtY2hhcmFjdGVyLWNvdW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHNldERhdGFMZW5ndGggPSAoaW5wdXRFbCkgPT4ge1xuICBjb25zdCB7IGNoYXJhY3RlckNvdW50RWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgY29uc3QgbWF4bGVuZ3RoID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIik7XG5cbiAgaWYgKCFtYXhsZW5ndGgpIHJldHVybjtcblxuICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcbiAgY2hhcmFjdGVyQ291bnRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1heGxlbmd0aFwiLCBtYXhsZW5ndGgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIGFwcGVuZCBzdGF0dXMgbWVzc2FnZXMgZm9yIHZpc3VhbCBhbmQgc2NyZWVuIHJlYWRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBjaGFyYWN0ZXJDb3VudEVsIC0gRGl2IHdpdGggYC51c2EtY2hhcmFjdGVyLWNvdW50YCBjbGFzc1xuICogQGRlc2NyaXB0aW9uICBDcmVhdGUgdHdvIHN0YXR1cyBtZXNzYWdlcyBmb3IgbnVtYmVyIG9mIGNoYXJhY3RlcnMgbGVmdDtcbiAqIG9uZSB2aXN1YWwgc3RhdHVzIGFuZCBhbm90aGVyIGZvciBzY3JlZW4gcmVhZGVyc1xuICovXG5jb25zdCBjcmVhdGVTdGF0dXNNZXNzYWdlcyA9IChjaGFyYWN0ZXJDb3VudEVsKSA9PiB7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtYXhMZW5ndGggPSBjaGFyYWN0ZXJDb3VudEVsLmRhdGFzZXQubWF4bGVuZ3RoO1xuICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9IGAke21heExlbmd0aH0gJHtERUZBVUxUX1NUQVRVU19MQUJFTH1gO1xuXG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChgJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gLCBcInVzYS1oaW50XCIpO1xuICBzclN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChcbiAgICBgJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWAsXG4gICAgXCJ1c2Etc3Itb25seVwiXG4gICk7XG5cbiAgc3RhdHVzTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgc3JTdGF0dXNNZXNzYWdlLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gZGVmYXVsdE1lc3NhZ2U7XG4gIHNyU3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRNZXNzYWdlO1xuXG4gIGNoYXJhY3RlckNvdW50RWwuYXBwZW5kKHN0YXR1c01lc3NhZ2UsIHNyU3RhdHVzTWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgbWVzc2FnZSB3aXRoIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudExlbmd0aCAtIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyB1c2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4TGVuZ3RoIC0gVGhlIHRvdGFsIG51bWJlciBvZiBjaGFyYWN0ZXJzIGFsbG93ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqL1xuY29uc3QgZ2V0Q291bnRNZXNzYWdlID0gKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICBsZXQgbmV3TWVzc2FnZSA9IFwiXCI7XG5cbiAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDApIHtcbiAgICBuZXdNZXNzYWdlID0gYCR7bWF4TGVuZ3RofSAke0RFRkFVTFRfU1RBVFVTX0xBQkVMfWA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKG1heExlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBgY2hhcmFjdGVyJHtkaWZmZXJlbmNlID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gICAgY29uc3QgZ3VpZGFuY2UgPSBjdXJyZW50TGVuZ3RoID4gbWF4TGVuZ3RoID8gXCJvdmVyIGxpbWl0XCIgOiBcImxlZnRcIjtcblxuICAgIG5ld01lc3NhZ2UgPSBgJHtkaWZmZXJlbmNlfSAke2NoYXJhY3RlcnN9ICR7Z3VpZGFuY2V9YDtcbiAgfVxuXG4gIHJldHVybiBuZXdNZXNzYWdlO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjaGFyYWN0ZXIgY291bnQgc3RhdHVzIGZvciBzY3JlZW4gcmVhZGVycyBhZnRlciBhIDEwMDBtcyBkZWxheS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBtc2dFbCAtIFRoZSBzY3JlZW4gcmVhZGVyIHN0YXR1cyBtZXNzYWdlIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0dXNNZXNzYWdlIC0gQSBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIHN0YXR1c1xuICovXG5jb25zdCBzclVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKChtc2dFbCwgc3RhdHVzTWVzc2FnZSkgPT4ge1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBtc2dFbDtcbiAgc3JTdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gc3RhdHVzTWVzc2FnZTtcbn0sIDEwMDApO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2hhcmFjdGVyIGNvdW50IGNvbXBvbmVudFxuICpcbiAqIEBkZXNjcmlwdGlvbiBPbiBpbnB1dCwgaXQgd2lsbCB1cGRhdGUgdmlzdWFsIHN0YXR1cywgc2NyZWVucmVhZGVyXG4gKiBzdGF0dXMgYW5kIHVwZGF0ZSBpbnB1dCB2YWxpZGF0aW9uIChpZiBvdmVyIGNoYXJhY3RlciBsZW5ndGgpXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudH0gaW5wdXRFbCBUaGUgY2hhcmFjdGVyIGNvdW50IGlucHV0IGVsZW1lbnRcbiAqL1xuY29uc3QgdXBkYXRlQ291bnRNZXNzYWdlID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsIH0gPSBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzKGlucHV0RWwpO1xuICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaW5wdXRFbC52YWx1ZS5sZW5ndGg7XG4gIGNvbnN0IG1heExlbmd0aCA9IHBhcnNlSW50KFxuICAgIGNoYXJhY3RlckNvdW50RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhsZW5ndGhcIiksXG4gICAgMTBcbiAgKTtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihTVEFUVVNfTUVTU0FHRSk7XG4gIGNvbnN0IHNyU3RhdHVzTWVzc2FnZSA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihcbiAgICBTVEFUVVNfTUVTU0FHRV9TUl9PTkxZXG4gICk7XG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNNZXNzYWdlID0gZ2V0Q291bnRNZXNzYWdlKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCk7XG5cbiAgaWYgKCFtYXhMZW5ndGgpIHJldHVybjtcblxuICBjb25zdCBpc092ZXJMaW1pdCA9IGN1cnJlbnRMZW5ndGggJiYgY3VycmVudExlbmd0aCA+IG1heExlbmd0aDtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gY3VycmVudFN0YXR1c01lc3NhZ2U7XG4gIHNyVXBkYXRlU3RhdHVzKHNyU3RhdHVzTWVzc2FnZSwgY3VycmVudFN0YXR1c01lc3NhZ2UpO1xuXG4gIGlmIChpc092ZXJMaW1pdCAmJiAhaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGlucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNPdmVyTGltaXQgJiYgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgfVxuXG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShNRVNTQUdFX0lOVkFMSURfQ0xBU1MsIGlzT3ZlckxpbWl0KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21wb25lbnRcbiAqXG4gKiBAZGVzY3JpcHRpb24gT24gaW5pdCB0aGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIGVsZW1lbnRzIGFuZCB1cGRhdGUgYW55XG4gKiBhdHRyaWJ1dGVzIHNvIGl0IGNhbiB0ZWxsIHRoZSB1c2VyIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnQuXG4gKiBAcGFyYW0gIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgdGhlIGNvbXBvbmVudHMgaW5wdXRcbiAqL1xuY29uc3QgZW5oYW5jZUNoYXJhY3RlckNvdW50ID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsLCBtZXNzYWdlRWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgLy8gSGlkZSBoaW50IGFuZCByZW1vdmUgYXJpYS1saXZlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBtZXNzYWdlRWwuY2xhc3NMaXN0LmFkZChcInVzYS1zci1vbmx5XCIpO1xuICBtZXNzYWdlRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1saXZlXCIpO1xuXG4gIHNldERhdGFMZW5ndGgoaW5wdXRFbCk7XG4gIGNyZWF0ZVN0YXR1c01lc3NhZ2VzKGNoYXJhY3RlckNvdW50RWwpO1xufTtcblxuY29uc3QgY2hhcmFjdGVyQ291bnQgPSBiZWhhdmlvcihcbiAge1xuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICB1cGRhdGVDb3VudE1lc3NhZ2UodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChJTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXQpID0+IGVuaGFuY2VDaGFyYWN0ZXJDb3VudChpbnB1dCkpO1xuICAgIH0sXG4gICAgTUVTU0FHRV9JTlZBTElEX0NMQVNTLFxuICAgIFZBTElEQVRJT05fTUVTU0FHRSxcbiAgICBTVEFUVVNfTUVTU0FHRV9DTEFTUyxcbiAgICBTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTLFxuICAgIERFRkFVTFRfU1RBVFVTX0xBQkVMLFxuICAgIGNyZWF0ZVN0YXR1c01lc3NhZ2VzLFxuICAgIGdldENvdW50TWVzc2FnZSxcbiAgICB1cGRhdGVDb3VudE1lc3NhZ2UsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmFjdGVyQ291bnQ7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5cbmNvbnN0IENPTUJPX0JPWF9DTEFTUyA9IGAke1BSRUZJWH0tY29tYm8tYm94YDtcbmNvbnN0IENPTUJPX0JPWF9QUklTVElORV9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU30tLXByaXN0aW5lYDtcbmNvbnN0IFNFTEVDVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX3NlbGVjdGA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2NsZWFyLWlucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9XUkFQUEVSX0NMQVNTID0gYCR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfV9fd3JhcHBlcmA7XG5jb25zdCBJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9faW5wdXQtYnV0dG9uLXNlcGFyYXRvcmA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X190b2dnbGUtbGlzdGA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgTElTVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2xpc3RgO1xuY29uc3QgTElTVF9PUFRJT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0LW9wdGlvbmA7XG5jb25zdCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBTVEFUVVNfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zdGF0dXNgO1xuXG5jb25zdCBDT01CT19CT1ggPSBgLiR7Q09NQk9fQk9YX0NMQVNTfWA7XG5jb25zdCBTRUxFQ1QgPSBgLiR7U0VMRUNUX0NMQVNTfWA7XG5jb25zdCBJTlBVVCA9IGAuJHtJTlBVVF9DTEFTU31gO1xuY29uc3QgQ0xFQVJfSU5QVVRfQlVUVE9OID0gYC4ke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OID0gYC4ke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgTElTVCA9IGAuJHtMSVNUX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTiA9IGAuJHtMSVNUX09QVElPTl9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRCA9IGAuJHtMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRCA9IGAuJHtMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTU31gO1xuY29uc3QgU1RBVFVTID0gYC4ke1NUQVRVU19DTEFTU31gO1xuXG5jb25zdCBERUZBVUxUX0ZJTFRFUiA9IFwiLip7e3F1ZXJ5fX0uKlwiO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFNlbGVjdEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIGNvbWJvIGJveC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbWJvQm94Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gY29tYm9Cb3hFbFxuICogQHByb3BlcnR5IHtIVE1MU2VsZWN0RWxlbWVudH0gc2VsZWN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MVUxpc3RFbGVtZW50fSBsaXN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IHN0YXR1c0VsXG4gKiBAcHJvcGVydHkge0hUTUxMSUVsZW1lbnR9IGZvY3VzZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBzZWxlY3RlZE9wdGlvbkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSB0b2dnbGVMaXN0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNsZWFySW5wdXRCdG5FbFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1ByaXN0aW5lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2FibGVGaWx0ZXJpbmdcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveFxuICogQHJldHVybnMge0NvbWJvQm94Q29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0Q29tYm9Cb3hDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGNvbWJvQm94RWwgPSBlbC5jbG9zZXN0KENPTUJPX0JPWCk7XG5cbiAgaWYgKCFjb21ib0JveEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtDT01CT19CT1h9YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTRUxFQ1QpO1xuICBjb25zdCBpbnB1dEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgY29uc3QgbGlzdEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1QpO1xuICBjb25zdCBzdGF0dXNFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTVEFUVVMpO1xuICBjb25zdCBmb2N1c2VkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fU0VMRUNURUQpO1xuICBjb25zdCB0b2dnbGVMaXN0QnRuRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoVE9HR0xFX0xJU1RfQlVUVE9OKTtcbiAgY29uc3QgY2xlYXJJbnB1dEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKENMRUFSX0lOUFVUX0JVVFRPTik7XG5cbiAgY29uc3QgaXNQcmlzdGluZSA9IGNvbWJvQm94RWwuY2xhc3NMaXN0LmNvbnRhaW5zKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIGNvbnN0IGRpc2FibGVGaWx0ZXJpbmcgPSBjb21ib0JveEVsLmRhdGFzZXQuZGlzYWJsZUZpbHRlcmluZyA9PT0gXCJ0cnVlXCI7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGZvY3VzZWRPcHRpb25FbCxcbiAgICBzZWxlY3RlZE9wdGlvbkVsLFxuICAgIHRvZ2dsZUxpc3RCdG5FbCxcbiAgICBjbGVhcklucHV0QnRuRWwsXG4gICAgaXNQcmlzdGluZSxcbiAgICBkaXNhYmxlRmlsdGVyaW5nLFxuICB9O1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIHRoZSBjb21iby1ib3ggY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgdG9nZ2xlTGlzdEJ0bkVsLCBjbGVhcklucHV0QnRuRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY2xlYXJJbnB1dEJ0bkVsLmhpZGRlbiA9IHRydWU7XG4gIGNsZWFySW5wdXRCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGNvbWJvLWJveCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSBmYWxzZTtcbiAgY2xlYXJJbnB1dEJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYSBzZWxlY3QgZWxlbWVudCBpbnRvIGEgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBfY29tYm9Cb3hFbCBUaGUgaW5pdGlhbCBlbGVtZW50IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VDb21ib0JveCA9IChfY29tYm9Cb3hFbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gX2NvbWJvQm94RWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmIChjb21ib0JveEVsLmRhdGFzZXQuZW5oYW5jZWQpIHJldHVybjtcblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKTtcblxuICBpZiAoIXNlbGVjdEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0NPTUJPX0JPWH0gaXMgbWlzc2luZyBpbm5lciBzZWxlY3RgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdElkID0gc2VsZWN0RWwuaWQ7XG4gIGNvbnN0IHNlbGVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKTtcbiAgY29uc3QgbGlzdElkID0gYCR7c2VsZWN0SWR9LS1saXN0YDtcbiAgY29uc3QgbGlzdElkTGFiZWwgPSBgJHtzZWxlY3RJZH0tbGFiZWxgO1xuICBjb25zdCBhc3Npc3RpdmVIaW50SUQgPSBgJHtzZWxlY3RJZH0tLWFzc2lzdGl2ZUhpbnRgO1xuICBjb25zdCBhZGRpdGlvbmFsQXR0cmlidXRlcyA9IFtdO1xuICBjb25zdCB7IGRlZmF1bHRWYWx1ZSB9ID0gY29tYm9Cb3hFbC5kYXRhc2V0O1xuICBjb25zdCB7IHBsYWNlaG9sZGVyIH0gPSBjb21ib0JveEVsLmRhdGFzZXQ7XG4gIGxldCBzZWxlY3RlZE9wdGlvbjtcblxuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKHsgcGxhY2Vob2xkZXIgfSk7XG4gIH1cblxuICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkVsID0gc2VsZWN0RWwub3B0aW9uc1tpXTtcblxuICAgICAgaWYgKG9wdGlvbkVsLnZhbHVlID09PSBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25FbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIGNvbWJvYm94IGlzIG1pc3NpbmcgYSBsYWJlbCBvciBsYWJlbCBpcyBtaXNzaW5nXG4gICAqIGBmb3JgIGF0dHJpYnV0ZS4gT3RoZXJ3aXNlLCBzZXQgdGhlIElEIHRvIG1hdGNoIHRoZSA8dWw+IGFyaWEtbGFiZWxsZWRieVxuICAgKi9cbiAgaWYgKCFzZWxlY3RMYWJlbCB8fCAhc2VsZWN0TGFiZWwubWF0Y2hlcyhgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0NPTUJPX0JPWH0gZm9yICR7c2VsZWN0SWR9IGlzIGVpdGhlciBtaXNzaW5nIGEgbGFiZWwgb3IgYSBcImZvclwiIGF0dHJpYnV0ZWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgfVxuXG4gIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBzZWxlY3RFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBzZWxlY3RFbC5jbGFzc0xpc3QuYWRkKFwidXNhLXNyLW9ubHlcIiwgU0VMRUNUX0NMQVNTKTtcbiAgc2VsZWN0RWwuaWQgPSBcIlwiO1xuICBzZWxlY3RFbC52YWx1ZSA9IFwiXCI7XG5cbiAgW1wicmVxdWlyZWRcIiwgXCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCJdLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBpZiAoc2VsZWN0RWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLnB1c2goeyBbbmFtZV06IHZhbHVlIH0pO1xuICAgICAgc2VsZWN0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2FuaXRpemUgZG9lc24ndCBsaWtlIGZ1bmN0aW9ucyBpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VsZWN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLW93bnNcIiwgbGlzdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBsaXN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWF1dG9jb21wbGV0ZVwiLCBcImxpc3RcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgYXNzaXN0aXZlSGludElEKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLCBcIm9mZlwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBJTlBVVF9DTEFTUyk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiY29tYm9ib3hcIik7XG4gIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLmZvckVhY2goKGF0dHIpID0+XG4gICAgT2JqZWN0LmtleXMoYXR0cikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7YXR0cltrZXldfWA7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgfSlcbiAgKTtcblxuICBjb21ib0JveEVsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBpbnB1dCk7XG5cbiAgY29tYm9Cb3hFbC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8c3BhbiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJDbGVhciB0aGUgc2VsZWN0IGNvbnRlbnRzXCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7SU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTU31cIj4mbmJzcDs8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCIke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIHRoZSBkcm9wZG93biBsaXN0XCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8dWxcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIGlkPVwiJHtsaXN0SWR9XCJcbiAgICAgICAgY2xhc3M9XCIke0xJU1RfQ0xBU1N9XCJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCIke2xpc3RJZExhYmVsfVwiXG4gICAgICAgIGhpZGRlbj5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiJHtTVEFUVVNfQ0xBU1N9IHVzYS1zci1vbmx5XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PlxuICAgICAgPHNwYW4gaWQ9XCIke2Fzc2lzdGl2ZUhpbnRJRH1cIiBjbGFzcz1cInVzYS1zci1vbmx5XCI+XG4gICAgICAgIFdoZW4gYXV0b2NvbXBsZXRlIHJlc3VsdHMgYXJlIGF2YWlsYWJsZSB1c2UgdXAgYW5kIGRvd24gYXJyb3dzIHRvIHJldmlldyBhbmQgZW50ZXIgdG8gc2VsZWN0LlxuICAgICAgICBUb3VjaCBkZXZpY2UgdXNlcnMsIGV4cGxvcmUgYnkgdG91Y2ggb3Igd2l0aCBzd2lwZSBnZXN0dXJlcy5cbiAgICAgIDwvc3Bhbj5gXG4gICk7XG5cbiAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgY29uc3QgeyBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoY29tYm9Cb3hFbCk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBzZWxlY3RlZE9wdGlvbi52YWx1ZSk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIHNlbGVjdGVkT3B0aW9uLnRleHQpO1xuICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICB9XG5cbiAgaWYgKHNlbGVjdEVsLmRpc2FibGVkKSB7XG4gICAgZGlzYWJsZShjb21ib0JveEVsKTtcbiAgICBzZWxlY3RFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkID0gXCJ0cnVlXCI7XG59O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgZm9jdXNlZCBlbGVtZW50IHdpdGhpbiB0aGUgbGlzdCBvcHRpb25zIHdoZW5cbiAqIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGFuY2hvciBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV4dEVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc2tpcEZvY3VzIHNraXAgZm9jdXMgb2YgaGlnaGxpZ2h0ZWQgaXRlbVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnByZXZlbnRTY3JvbGwgc2hvdWxkIHNraXAgcHJvY2VkdXJlIHRvIHNjcm9sbCB0byBlbGVtZW50XG4gKi9cbmNvbnN0IGhpZ2hsaWdodE9wdGlvbiA9IChlbCwgbmV4dEVsLCB7IHNraXBGb2N1cywgcHJldmVudFNjcm9sbCB9ID0ge30pID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAoZm9jdXNlZE9wdGlvbkVsKSB7XG4gICAgZm9jdXNlZE9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgZm9jdXNlZE9wdGlvbkVsLnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gIH1cblxuICBpZiAobmV4dEVsKSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgbmV4dEVsLmlkKTtcbiAgICBuZXh0RWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgIG5leHRFbC5jbGFzc0xpc3QuYWRkKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICBjb25zdCBvcHRpb25Cb3R0b20gPSBuZXh0RWwub2Zmc2V0VG9wICsgbmV4dEVsLm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGN1cnJlbnRCb3R0b20gPSBsaXN0RWwuc2Nyb2xsVG9wICsgbGlzdEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKG9wdGlvbkJvdHRvbSA+IGN1cnJlbnRCb3R0b20pIHtcbiAgICAgICAgbGlzdEVsLnNjcm9sbFRvcCA9IG9wdGlvbkJvdHRvbSAtIGxpc3RFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWwub2Zmc2V0VG9wIDwgbGlzdEVsLnNjcm9sbFRvcCkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gbmV4dEVsLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXBGb2N1cykge1xuICAgICAgbmV4dEVsLmZvY3VzKHsgcHJldmVudFNjcm9sbCB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG4gICAgaW5wdXRFbC5mb2N1cygpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZHluYW1pYyByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWQgb2ZmIG9mIGEgcmVwbGFjZWFibGUgYW5kIHBvc3NpYmx5IGZpbHRlcmVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSB2YWx1ZSB0byB1c2UgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhcyBBbiBvYmplY3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0byByZXBsYWNlIGFuZCBmaWx0ZXIgdGhlIHF1ZXJ5XG4gKi9cbmNvbnN0IGdlbmVyYXRlRHluYW1pY1JlZ0V4cCA9IChmaWx0ZXIsIHF1ZXJ5ID0gXCJcIiwgZXh0cmFzID0ge30pID0+IHtcbiAgY29uc3QgZXNjYXBlUmVnRXhwID0gKHRleHQpID0+XG4gICAgdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgXCJcXFxcJCZcIik7XG5cbiAgbGV0IGZpbmQgPSBmaWx0ZXIucmVwbGFjZSgve3soLio/KX19L2csIChtLCAkMSkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICQxLnRyaW0oKTtcbiAgICBjb25zdCBxdWVyeUZpbHRlciA9IGV4dHJhc1trZXldO1xuICAgIGlmIChrZXkgIT09IFwicXVlcnlcIiAmJiBxdWVyeUZpbHRlcikge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IG5ldyBSZWdFeHAocXVlcnlGaWx0ZXIsIFwiaVwiKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBxdWVyeS5tYXRjaChtYXRjaGVyKTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChtYXRjaGVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocXVlcnkpO1xuICB9KTtcblxuICBmaW5kID0gYF4oPzoke2ZpbmR9KSRgO1xuXG4gIHJldHVybiBuZXcgUmVnRXhwKGZpbmQsIFwiaVwiKTtcbn07XG5cbi8qKlxuICogRGlzcGxheSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG4gIGxldCBzZWxlY3RlZEl0ZW1JZDtcbiAgbGV0IGZpcnN0Rm91bmRJZDtcblxuICBjb25zdCBsaXN0T3B0aW9uQmFzZUlkID0gYCR7bGlzdEVsLmlkfS0tb3B0aW9uLWA7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlciA9IGNvbWJvQm94RWwuZGF0YXNldC5maWx0ZXIgfHwgREVGQVVMVF9GSUxURVI7XG4gIGNvbnN0IHJlZ2V4ID0gZ2VuZXJhdGVEeW5hbWljUmVnRXhwKGZpbHRlciwgaW5wdXRWYWx1ZSwgY29tYm9Cb3hFbC5kYXRhc2V0KTtcblxuICBjb25zdCBvcHRpb25zID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke29wdGlvbnMubGVuZ3RofWA7XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25FbC52YWx1ZSAmJlxuICAgICAgKGRpc2FibGVGaWx0ZXJpbmcgfHxcbiAgICAgICAgaXNQcmlzdGluZSB8fFxuICAgICAgICAhaW5wdXRWYWx1ZSB8fFxuICAgICAgICByZWdleC50ZXN0KG9wdGlvbkVsLnRleHQpKVxuICAgICkge1xuICAgICAgaWYgKHNlbGVjdEVsLnZhbHVlICYmIG9wdGlvbkVsLnZhbHVlID09PSBzZWxlY3RFbC52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZEl0ZW1JZCA9IG9wdGlvbklkO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGlzYWJsZUZpbHRlcmluZyAmJiAhZmlyc3RGb3VuZElkICYmIHJlZ2V4LnRlc3Qob3B0aW9uRWwudGV4dCkpIHtcbiAgICAgICAgZmlyc3RGb3VuZElkID0gb3B0aW9uSWQ7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnB1c2gob3B0aW9uRWwpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG51bU9wdGlvbnMgPSBvcHRpb25zLmxlbmd0aDtcbiAgY29uc3Qgb3B0aW9uSHRtbCA9IG9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uSWQgPSBgJHtsaXN0T3B0aW9uQmFzZUlkfSR7aW5kZXh9YDtcbiAgICBjb25zdCBjbGFzc2VzID0gW0xJU1RfT1BUSU9OX0NMQVNTXTtcbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG4gICAgbGV0IGFyaWFTZWxlY3RlZCA9IFwiZmFsc2VcIjtcblxuICAgIGlmIChvcHRpb25JZCA9PT0gc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTUywgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgYXJpYVNlbGVjdGVkID0gXCJ0cnVlXCI7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxlY3RlZEl0ZW1JZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICB9XG5cbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtc2V0c2l6ZVwiLCBvcHRpb25zLmxlbmd0aCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1wb3NpbnNldFwiLCBpbmRleCArIDEpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgYXJpYVNlbGVjdGVkKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcHRpb25JZCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJvcHRpb25cIik7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBvcHRpb24udmFsdWUpO1xuICAgIGxpLnRleHRDb250ZW50ID0gb3B0aW9uLnRleHQ7XG5cbiAgICByZXR1cm4gbGk7XG4gIH0pO1xuXG4gIGNvbnN0IG5vUmVzdWx0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbm9SZXN1bHRzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tbm8tcmVzdWx0c2ApO1xuICBub1Jlc3VsdHMudGV4dENvbnRlbnQgPSBcIk5vIHJlc3VsdHMgZm91bmRcIjtcblxuICBsaXN0RWwuaGlkZGVuID0gZmFsc2U7XG5cbiAgaWYgKG51bU9wdGlvbnMpIHtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBvcHRpb25IdG1sLmZvckVhY2goKGl0ZW0pID0+XG4gICAgICBsaXN0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGl0ZW0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsaXN0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG5vUmVzdWx0cyk7XG4gIH1cblxuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gbnVtT3B0aW9uc1xuICAgID8gYCR7bnVtT3B0aW9uc30gcmVzdWx0JHtudW1PcHRpb25zID4gMSA/IFwic1wiIDogXCJcIn0gYXZhaWxhYmxlLmBcbiAgICA6IFwiTm8gcmVzdWx0cy5cIjtcblxuICBsZXQgaXRlbVRvRm9jdXM7XG5cbiAgaWYgKGlzUHJpc3RpbmUgJiYgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICBpdGVtVG9Gb2N1cyA9IGxpc3RFbC5xdWVyeVNlbGVjdG9yKGAjJHtzZWxlY3RlZEl0ZW1JZH1gKTtcbiAgfSBlbHNlIGlmIChkaXNhYmxlRmlsdGVyaW5nICYmIGZpcnN0Rm91bmRJZCkge1xuICAgIGl0ZW1Ub0ZvY3VzID0gbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoYCMke2ZpcnN0Rm91bmRJZH1gKTtcbiAgfVxuXG4gIGlmIChpdGVtVG9Gb2N1cykge1xuICAgIGhpZ2hsaWdodE9wdGlvbihsaXN0RWwsIGl0ZW1Ub0ZvY3VzLCB7XG4gICAgICBza2lwRm9jdXM6IHRydWUsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogSGlkZSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhpZGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgbGlzdEVsLCBzdGF0dXNFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIHN0YXR1c0VsLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIFwiXCIpO1xuXG4gIGlmIChmb2N1c2VkT3B0aW9uRWwpIHtcbiAgICBmb2N1c2VkT3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZShMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgfVxuXG4gIGxpc3RFbC5zY3JvbGxUb3AgPSAwO1xuICBsaXN0RWwuaGlkZGVuID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGxpc3RPcHRpb25FbCBUaGUgbGlzdCBvcHRpb24gYmVpbmcgc2VsZWN0ZWRcbiAqL1xuY29uc3Qgc2VsZWN0SXRlbSA9IChsaXN0T3B0aW9uRWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGxpc3RPcHRpb25FbCk7XG5cbiAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBsaXN0T3B0aW9uRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsLCBsaXN0T3B0aW9uRWwudGV4dENvbnRlbnQpO1xuICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogQ2xlYXIgdGhlIGlucHV0IG9mIHRoZSBjb21ibyBib3hcbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhckJ1dHRvbkVsIFRoZSBjbGVhciBpbnB1dCBidXR0b25cbiAqL1xuY29uc3QgY2xlYXJJbnB1dCA9IChjbGVhckJ1dHRvbkVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID1cbiAgICBnZXRDb21ib0JveENvbnRleHQoY2xlYXJCdXR0b25FbCk7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGlmIChzZWxlY3RFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsKTtcbiAgaWYgKGlucHV0RWwudmFsdWUpIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgY29tYm9Cb3hFbC5jbGFzc0xpc3QucmVtb3ZlKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG5cbiAgaWYgKGxpc3RTaG93bikgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIHNlbGVjdCBiYXNlZCBvZmYgb2YgY3VycmVudGx5IHNldCBzZWxlY3QgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCByZXNldFNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdFZhbHVlID0gc2VsZWN0RWwudmFsdWU7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSAoaW5wdXRFbC52YWx1ZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChzZWxlY3RWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IHNlbGVjdFZhbHVlKSB7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICE9PSBvcHRpb25FbC50ZXh0KSB7XG4gICAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50IGJhc2VkIG9mZiBvZlxuICogaGF2aW5nIGEgY3VycmVudCBmb2N1c2VkIGxpc3Qgb3B0aW9uIG9yXG4gKiBoYXZpbmcgdGVzdCB0aGF0IGNvbXBsZXRlbHkgbWF0Y2hlcyBhIGxpc3Qgb3B0aW9uLlxuICogT3RoZXJ3aXNlIGl0IGNsZWFycyB0aGUgaW5wdXQgYW5kIHNlbGVjdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBjb21wbGV0ZVNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsLCBzdGF0dXNFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgICAgaWYgKG9wdGlvbkVsLnRleHQudG9Mb3dlckNhc2UoKSA9PT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIG9wdGlvbkVsLnZhbHVlKTtcbiAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVzY2FwZSBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZG93biBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21JbnB1dCA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGNvbnN0IG5leHRPcHRpb25FbCA9XG4gICAgbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCkgfHxcbiAgICBsaXN0RWwucXVlcnlTZWxlY3RvcihMSVNUX09QVElPTik7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihjb21ib0JveEVsLCBuZXh0T3B0aW9uRWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGFuIGlucHV0IGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVudGVyRnJvbUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgY29tcGxldGVTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG5cbiAgaWYgKGxpc3RTaG93bikge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBkb3duIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBuZXh0T3B0aW9uRWwgPSBmb2N1c2VkT3B0aW9uRWwubmV4dFNpYmxpbmc7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihmb2N1c2VkT3B0aW9uRWwsIG5leHRPcHRpb25FbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIHRhYiBldmVudCBmcm9tIGFuIGxpc3Qgb3B0aW9uIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZVRhYkZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSB1cCBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBmb2N1c2VkT3B0aW9uRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChcbiAgICBldmVudC50YXJnZXRcbiAgKTtcbiAgY29uc3QgbmV4dE9wdGlvbkVsID0gZm9jdXNlZE9wdGlvbkVsICYmIGZvY3VzZWRPcHRpb25FbC5wcmV2aW91c1NpYmxpbmc7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGhpZ2hsaWdodE9wdGlvbihjb21ib0JveEVsLCBuZXh0T3B0aW9uRWwpO1xuXG4gIGlmIChsaXN0U2hvd24pIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgaWYgKCFuZXh0T3B0aW9uRWwpIHtcbiAgICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgbGlzdCBvcHRpb24gb24gdGhlIG1vdXNlb3ZlciBldmVudC5cbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZW92ZXIgZXZlbnRcbiAqIEBwYXJhbSB7SFRNTExJRWxlbWVudH0gbGlzdE9wdGlvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlciA9IChsaXN0T3B0aW9uRWwpID0+IHtcbiAgY29uc3QgaXNDdXJyZW50bHlGb2N1c2VkID0gbGlzdE9wdGlvbkVsLmNsYXNzTGlzdC5jb250YWlucyhcbiAgICBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTXG4gICk7XG5cbiAgaWYgKGlzQ3VycmVudGx5Rm9jdXNlZCkgcmV0dXJuO1xuXG4gIGhpZ2hsaWdodE9wdGlvbihsaXN0T3B0aW9uRWwsIGxpc3RPcHRpb25FbCwge1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWUsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgdGhlIGxpc3Qgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChsaXN0RWwuaGlkZGVuKSB7XG4gICAgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cblxuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVDbGlja0Zyb21JbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9XG59O1xuXG5jb25zdCBjb21ib0JveCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaGFuZGxlQ2xpY2tGcm9tSW5wdXQodGhpcyk7XG4gICAgICB9LFxuICAgICAgW1RPR0dMRV9MSVNUX0JVVFRPTl0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRvZ2dsZUxpc3QodGhpcyk7XG4gICAgICB9LFxuICAgICAgW0xJU1RfT1BUSU9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgc2VsZWN0SXRlbSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbQ0xFQVJfSU5QVVRfQlVUVE9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgY2xlYXJJbnB1dCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW0NPTUJPX0JPWF0oZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgcmVzZXRTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgaGlkZUxpc3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbQ09NQk9fQk9YXToga2V5bWFwKHtcbiAgICAgICAgRXNjYXBlOiBoYW5kbGVFc2NhcGUsXG4gICAgICB9KSxcbiAgICAgIFtJTlBVVF06IGtleW1hcCh7XG4gICAgICAgIEVudGVyOiBoYW5kbGVFbnRlckZyb21JbnB1dCxcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgICBEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgfSksXG4gICAgICBbTElTVF9PUFRJT05dOiBrZXltYXAoe1xuICAgICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21MaXN0T3B0aW9uLFxuICAgICAgICBVcDogaGFuZGxlVXBGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIERvd246IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbixcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFRhYjogaGFuZGxlVGFiRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFwiU2hpZnQrVGFiXCI6IG5vb3AsXG4gICAgICB9KSxcbiAgICB9LFxuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICBjb25zdCBjb21ib0JveEVsID0gdGhpcy5jbG9zZXN0KENPTUJPX0JPWCk7XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LnJlbW92ZShDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICBkaXNwbGF5TGlzdCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VzZW92ZXI6IHtcbiAgICAgIFtMSVNUX09QVElPTl0oKSB7XG4gICAgICAgIGhhbmRsZU1vdXNlb3Zlcih0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKENPTUJPX0JPWCwgcm9vdCkuZm9yRWFjaCgoY29tYm9Cb3hFbCkgPT4ge1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3goY29tYm9Cb3hFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbWJvQm94Q29udGV4dCxcbiAgICBlbmhhbmNlQ29tYm9Cb3gsXG4gICAgZ2VuZXJhdGVEeW5hbWljUmVnRXhwLFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICAgIGRpc3BsYXlMaXN0LFxuICAgIGhpZGVMaXN0LFxuICAgIENPTUJPX0JPWF9DTEFTUyxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb21ib0JveDtcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYWN0aXZlLWVsZW1lbnRcIik7XG5jb25zdCBpc0lvc0RldmljZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pb3MtZGV2aWNlXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcGlja2VyYDtcbmNvbnN0IERBVEVfUElDS0VSX1dSQVBQRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU30tLWluaXRpYWxpemVkYDtcbmNvbnN0IERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfS0tYWN0aXZlYDtcbmNvbnN0IERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19pbnRlcm5hbC1pbnB1dGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fZXh0ZXJuYWwtaW5wdXRgO1xuY29uc3QgREFURV9QSUNLRVJfQlVUVE9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19idXR0b25gO1xuY29uc3QgREFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2NhbGVuZGFyYDtcbmNvbnN0IERBVEVfUElDS0VSX1NUQVRVU19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fc3RhdHVzYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGVgO1xuXG5jb25zdCBDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUFJFVklPVVNfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcHJldmlvdXMtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLWN1cnJlbnQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLW5leHQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGVgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9UT0RBWV9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS10b2RheWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZS1zdGFydGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfRU5EX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGUtZW5kYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXdpdGhpbi1yYW5nZWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy15ZWFyYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQteWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtc2VsZWN0aW9uYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXNlbGVjdGlvbmA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyA9IGAke0NBTEVOREFSX01PTlRIX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9feWVhcmA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfWUVBUl9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LXllYXItY2h1bmtgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RhdGUtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyLXBpY2tlcmA7XG5jb25zdCBDQUxFTkRBUl9UQUJMRV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fdGFibGVgO1xuY29uc3QgQ0FMRU5EQVJfUk9XX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19yb3dgO1xuY29uc3QgQ0FMRU5EQVJfQ0VMTF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fY2VsbGA7XG5jb25zdCBDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTUyA9IGAke0NBTEVOREFSX0NFTExfQ0xBU1N9LS1jZW50ZXItaXRlbXNgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfTEFCRUxfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoLWxhYmVsYDtcbmNvbnN0IENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19kYXktb2Ytd2Vla2A7XG5cbmNvbnN0IERBVEVfUElDS0VSID0gYC4ke0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9CVVRUT04gPSBgLiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVCA9IGAuJHtEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVF9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVQgPSBgLiR7REFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0NBTEVOREFSID0gYC4ke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9TVEFUVVMgPSBgLiR7REFURV9QSUNLRVJfU1RBVFVTX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFID0gYC4ke0NBTEVOREFSX0RBVEVfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USCA9IGAuJHtDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVIgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEggPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUiA9IGAuJHtDQUxFTkRBUl9ORVhUX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfTU9OVEggPSBgLiR7Q0FMRU5EQVJfTkVYVF9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT04gPSBgLiR7Q0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVElPTiA9IGAuJHtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05fQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIID0gYC4ke0NBTEVOREFSX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSID0gYC4ke0NBTEVOREFSX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTksgPSBgLiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LID0gYC4ke0NBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfUElDS0VSID0gYC4ke0NBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9GT0NVU0VEID0gYC4ke0NBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURfQ0xBU1N9YDtcblxuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlXCI7XG5cbmNvbnN0IE1PTlRIX0xBQkVMUyA9IFtcbiAgXCJKYW51YXJ5XCIsXG4gIFwiRmVicnVhcnlcIixcbiAgXCJNYXJjaFwiLFxuICBcIkFwcmlsXCIsXG4gIFwiTWF5XCIsXG4gIFwiSnVuZVwiLFxuICBcIkp1bHlcIixcbiAgXCJBdWd1c3RcIixcbiAgXCJTZXB0ZW1iZXJcIixcbiAgXCJPY3RvYmVyXCIsXG4gIFwiTm92ZW1iZXJcIixcbiAgXCJEZWNlbWJlclwiLFxuXTtcblxuY29uc3QgREFZX09GX1dFRUtfTEFCRUxTID0gW1xuICBcIlN1bmRheVwiLFxuICBcIk1vbmRheVwiLFxuICBcIlR1ZXNkYXlcIixcbiAgXCJXZWRuZXNkYXlcIixcbiAgXCJUaHVyc2RheVwiLFxuICBcIkZyaWRheVwiLFxuICBcIlNhdHVyZGF5XCIsXG5dO1xuXG5jb25zdCBFTlRFUl9LRVlDT0RFID0gMTM7XG5cbmNvbnN0IFlFQVJfQ0hVTksgPSAxMjtcblxuY29uc3QgREVGQVVMVF9NSU5fREFURSA9IFwiMDAwMC0wMS0wMVwiO1xuY29uc3QgREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCA9IFwiTU0vREQvWVlZWVwiO1xuY29uc3QgSU5URVJOQUxfREFURV9GT1JNQVQgPSBcIllZWVktTU0tRERcIjtcblxuY29uc3QgTk9UX0RJU0FCTEVEX1NFTEVDVE9SID0gXCI6bm90KFtkaXNhYmxlZF0pXCI7XG5cbmNvbnN0IHByb2Nlc3NGb2N1c2FibGVTZWxlY3RvcnMgPSAoLi4uc2VsZWN0b3JzKSA9PlxuICBzZWxlY3RvcnMubWFwKChxdWVyeSkgPT4gcXVlcnkgKyBOT1RfRElTQUJMRURfU0VMRUNUT1IpLmpvaW4oXCIsIFwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUixcbiAgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEgsXG4gIENBTEVOREFSX1lFQVJfU0VMRUNUSU9OLFxuICBDQUxFTkRBUl9NT05USF9TRUxFQ1RJT04sXG4gIENBTEVOREFSX05FWFRfWUVBUixcbiAgQ0FMRU5EQVJfTkVYVF9NT05USCxcbiAgQ0FMRU5EQVJfREFURV9GT0NVU0VEXG4pO1xuXG5jb25zdCBNT05USF9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRFxuKTtcblxuY29uc3QgWUVBUl9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyxcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LLFxuICBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRURcbik7XG5cbi8vICNyZWdpb24gRGF0ZSBNYW5pcHVsYXRpb24gRnVuY3Rpb25zXG5cbi8qKlxuICogS2VlcCBkYXRlIHdpdGhpbiBtb250aC4gTW9udGggd291bGQgb25seSBiZSBvdmVyIGJ5IDEgdG8gMyBkYXlzXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlVG9DaGVjayB0aGUgZGF0ZSBvYmplY3QgdG8gY2hlY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgY29ycmVjdCBtb250aFxuICogQHJldHVybnMge0RhdGV9IHRoZSBkYXRlLCBjb3JyZWN0ZWQgaWYgbmVlZGVkXG4gKi9cbmNvbnN0IGtlZXBEYXRlV2l0aGluTW9udGggPSAoZGF0ZVRvQ2hlY2ssIG1vbnRoKSA9PiB7XG4gIGlmIChtb250aCAhPT0gZGF0ZVRvQ2hlY2suZ2V0TW9udGgoKSkge1xuICAgIGRhdGVUb0NoZWNrLnNldERhdGUoMCk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRvQ2hlY2s7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIGZyb20gbW9udGggZGF5IHllYXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB0aGUgbW9udGggdG8gc2V0ICh6ZXJvLWluZGV4ZWQpXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgc2V0IGRhdGVcbiAqL1xuY29uc3Qgc2V0RGF0ZSA9ICh5ZWFyLCBtb250aCwgZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhciwgbW9udGgsIGRhdGUpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogdG9kYXlzIGRhdGVcbiAqXG4gKiBAcmV0dXJucyB7RGF0ZX0gdG9kYXlzIGRhdGVcbiAqL1xuY29uc3QgdG9kYXkgPSAoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBkYXkgPSBuZXdEYXRlLmdldERhdGUoKTtcbiAgY29uc3QgbW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IHllYXIgPSBuZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiBzZXREYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIGxhc3QgZGF5IG9mIHRoZSBtb250aFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGxhc3REYXlPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpICsgMSwgMCk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBBZGQgZGF5cyB0byBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGREYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuICBuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IGRheXMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1EYXlzIHRoZSBkaWZmZXJlbmNlIGluIGRheXNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJEYXlzID0gKF9kYXRlLCBudW1EYXlzKSA9PiBhZGREYXlzKF9kYXRlLCAtbnVtRGF5cyk7XG5cbi8qKlxuICogQWRkIHdlZWtzIHRvIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkV2Vla3MgPSAoX2RhdGUsIG51bVdlZWtzKSA9PiBhZGREYXlzKF9kYXRlLCBudW1XZWVrcyAqIDcpO1xuXG4vKipcbiAqIFN1YnRyYWN0IHdlZWtzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJXZWVrcyA9IChfZGF0ZSwgbnVtV2Vla3MpID0+IGFkZFdlZWtzKF9kYXRlLCAtbnVtV2Vla3MpO1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUgd2VlayAoU3VuZGF5KVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3RhcnRPZldlZWsgPSAoX2RhdGUpID0+IHtcbiAgY29uc3QgZGF5T2ZXZWVrID0gX2RhdGUuZ2V0RGF5KCk7XG4gIHJldHVybiBzdWJEYXlzKF9kYXRlLCBkYXlPZldlZWspO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIChTYXR1cmRheSlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgZW5kT2ZXZWVrID0gKF9kYXRlKSA9PiB7XG4gIGNvbnN0IGRheU9mV2VlayA9IF9kYXRlLmdldERheSgpO1xuICByZXR1cm4gYWRkRGF5cyhfZGF0ZSwgNiAtIGRheU9mV2Vlayk7XG59O1xuXG4vKipcbiAqIEFkZCBtb250aHMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtTW9udGhzIHRoZSBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZE1vbnRocyA9IChfZGF0ZSwgbnVtTW9udGhzKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IGRhdGVNb250aCA9IChuZXdEYXRlLmdldE1vbnRoKCkgKyAxMiArIG51bU1vbnRocykgJSAxMjtcbiAgbmV3RGF0ZS5zZXRNb250aChuZXdEYXRlLmdldE1vbnRoKCkgKyBudW1Nb250aHMpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIGRhdGVNb250aCk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0IG1vbnRocyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bU1vbnRocyB0aGUgZGlmZmVyZW5jZSBpbiBtb250aHNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJNb250aHMgPSAoX2RhdGUsIG51bU1vbnRocykgPT4gYWRkTW9udGhzKF9kYXRlLCAtbnVtTW9udGhzKTtcblxuLyoqXG4gKiBBZGQgeWVhcnMgdG8gZGF0ZSBhbmQga2VlcCBkYXRlIHdpdGhpbiBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtWWVhcnMgdGhlIGRpZmZlcmVuY2UgaW4geWVhcnNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRZZWFycyA9IChfZGF0ZSwgbnVtWWVhcnMpID0+IGFkZE1vbnRocyhfZGF0ZSwgbnVtWWVhcnMgKiAxMik7XG5cbi8qKlxuICogU3VidHJhY3QgeWVhcnMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1ZZWFycyB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YlllYXJzID0gKF9kYXRlLCBudW1ZZWFycykgPT4gYWRkWWVhcnMoX2RhdGUsIC1udW1ZZWFycyk7XG5cbi8qKlxuICogU2V0IG1vbnRocyBvZiBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb250aCB6ZXJvLWluZGV4ZWQgbW9udGggdG8gc2V0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc2V0TW9udGggPSAoX2RhdGUsIG1vbnRoKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIG5ld0RhdGUuc2V0TW9udGgobW9udGgpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU2V0IHllYXIgb2YgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0geWVhciB0aGUgeWVhciB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzZXRZZWFyID0gKF9kYXRlLCB5ZWFyKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZShfZGF0ZS5nZXRUaW1lKCkpO1xuXG4gIGNvbnN0IG1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKHllYXIpO1xuICBrZWVwRGF0ZVdpdGhpbk1vbnRoKG5ld0RhdGUsIG1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBlYXJsaWVzdCBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGVhcmxpZXN0IGRhdGVcbiAqL1xuY29uc3QgbWluID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGVBO1xuXG4gIGlmIChkYXRlQiA8IGRhdGVBKSB7XG4gICAgbmV3RGF0ZSA9IGRhdGVCO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsYXRlc3QgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBsYXRlc3QgZGF0ZVxuICovXG5jb25zdCBtYXggPSAoZGF0ZUEsIGRhdGVCKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZUE7XG5cbiAgaWYgKGRhdGVCID4gZGF0ZUEpIHtcbiAgICBuZXdEYXRlID0gZGF0ZUI7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIGluIHRoZSBzYW1lIHllYXJcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgaW4gdGhlIHNhbWUgeWVhclxuICovXG5jb25zdCBpc1NhbWVZZWFyID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgZGF0ZUEgJiYgZGF0ZUIgJiYgZGF0ZUEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZUIuZ2V0RnVsbFllYXIoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIGluIHRoZSBzYW1lIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIGluIHRoZSBzYW1lIG1vbnRoXG4gKi9cbmNvbnN0IGlzU2FtZU1vbnRoID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgaXNTYW1lWWVhcihkYXRlQSwgZGF0ZUIpICYmIGRhdGVBLmdldE1vbnRoKCkgPT09IGRhdGVCLmdldE1vbnRoKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgYXJlIHRoZSBzYW1lIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIHRoZSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgdGhlIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyB0aGUgc2FtZSBkYXRlXG4gKi9cbmNvbnN0IGlzU2FtZURheSA9IChkYXRlQSwgZGF0ZUIpID0+XG4gIGlzU2FtZU1vbnRoKGRhdGVBLCBkYXRlQikgJiYgZGF0ZUEuZ2V0RGF0ZSgpID09PSBkYXRlQi5nZXREYXRlKCk7XG5cbi8qKlxuICogcmV0dXJuIGEgbmV3IGRhdGUgd2l0aGluIG1pbmltdW0gYW5kIG1heGltdW0gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heFxuICovXG5jb25zdCBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGU7XG5cbiAgaWYgKGRhdGUgPCBtaW5EYXRlKSB7XG4gICAgbmV3RGF0ZSA9IG1pbkRhdGU7XG4gIH0gZWxzZSBpZiAobWF4RGF0ZSAmJiBkYXRlID4gbWF4RGF0ZSkge1xuICAgIG5ld0RhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgaXMgdmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZXJlIGEgZGF5IHdpdGhpbiB0aGUgbW9udGggd2l0aGluIG1pbiBhbmQgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZVdpdGhpbk1pbkFuZE1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBkYXRlID49IG1pbkRhdGUgJiYgKCFtYXhEYXRlIHx8IGRhdGUgPD0gbWF4RGF0ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgbW9udGggaXMgaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlIG1vbnRoIG91dHNpZGUgbWluIG9yIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVzTW9udGhPdXRzaWRlTWluT3JNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT5cbiAgbGFzdERheU9mTW9udGgoZGF0ZSkgPCBtaW5EYXRlIHx8IChtYXhEYXRlICYmIHN0YXJ0T2ZNb250aChkYXRlKSA+IG1heERhdGUpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIHllYXIgaXMgaW52YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlIG1vbnRoIG91dHNpZGUgbWluIG9yIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBsYXN0RGF5T2ZNb250aChzZXRNb250aChkYXRlLCAxMSkpIDwgbWluRGF0ZSB8fFxuICAobWF4RGF0ZSAmJiBzdGFydE9mTW9udGgoc2V0TW9udGgoZGF0ZSwgMCkpID4gbWF4RGF0ZSk7XG5cbi8qKlxuICogUGFyc2UgYSBkYXRlIHdpdGggZm9ybWF0IE0tRC1ZWVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RyaW5nIHRoZSBkYXRlIHN0cmluZyB0byBwYXJzZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRqdXN0RGF0ZSBzaG91bGQgdGhlIGRhdGUgYmUgYWRqdXN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGVcbiAqL1xuY29uc3QgcGFyc2VEYXRlU3RyaW5nID0gKFxuICBkYXRlU3RyaW5nLFxuICBkYXRlRm9ybWF0ID0gSU5URVJOQUxfREFURV9GT1JNQVQsXG4gIGFkanVzdERhdGUgPSBmYWxzZVxuKSA9PiB7XG4gIGxldCBkYXRlO1xuICBsZXQgbW9udGg7XG4gIGxldCBkYXk7XG4gIGxldCB5ZWFyO1xuICBsZXQgcGFyc2VkO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgbGV0IG1vbnRoU3RyO1xuICAgIGxldCBkYXlTdHI7XG4gICAgbGV0IHllYXJTdHI7XG5cbiAgICBpZiAoZGF0ZUZvcm1hdCA9PT0gREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCkge1xuICAgICAgW21vbnRoU3RyLCBkYXlTdHIsIHllYXJTdHJdID0gZGF0ZVN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFt5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyXSA9IGRhdGVTdHJpbmcuc3BsaXQoXCItXCIpO1xuICAgIH1cblxuICAgIGlmICh5ZWFyU3RyKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludCh5ZWFyU3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIHllYXIgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgeWVhciA9IE1hdGgubWF4KDAsIHllYXIpO1xuICAgICAgICAgIGlmICh5ZWFyU3RyLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdG9kYXkoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFllYXJTdHViID1cbiAgICAgICAgICAgICAgY3VycmVudFllYXIgLSAoY3VycmVudFllYXIgJSAxMCAqKiB5ZWFyU3RyLmxlbmd0aCk7XG4gICAgICAgICAgICB5ZWFyID0gY3VycmVudFllYXJTdHViICsgcGFyc2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aFN0cikge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQobW9udGhTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgbW9udGggPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1heCgxLCBtb250aCk7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1pbigxMiwgbW9udGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoICYmIGRheVN0ciAmJiB5ZWFyICE9IG51bGwpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KGRheVN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICBkYXkgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgY29uc3QgbGFzdERheU9mVGhlTW9udGggPSBzZXREYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XG4gICAgICAgICAgZGF5ID0gTWF0aC5tYXgoMSwgZGF5KTtcbiAgICAgICAgICBkYXkgPSBNYXRoLm1pbihsYXN0RGF5T2ZUaGVNb250aCwgZGF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBkYXRlID0gc2V0RGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGU7XG59O1xuXG4vKipcbiAqIEZvcm1hdCBhIGRhdGUgdG8gZm9ybWF0IE1NLURELVlZWVlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICovXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGUsIGRhdGVGb3JtYXQgPSBJTlRFUk5BTF9EQVRFX0ZPUk1BVCkgPT4ge1xuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChkYXRlRm9ybWF0ID09PSBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKSB7XG4gICAgcmV0dXJuIFtwYWRaZXJvcyhtb250aCwgMiksIHBhZFplcm9zKGRheSwgMiksIHBhZFplcm9zKHllYXIsIDQpXS5qb2luKFwiL1wiKTtcbiAgfVxuXG4gIHJldHVybiBbcGFkWmVyb3MoeWVhciwgNCksIHBhZFplcm9zKG1vbnRoLCAyKSwgcGFkWmVyb3MoZGF5LCAyKV0uam9pbihcIi1cIik7XG59O1xuXG4vLyAjZW5kcmVnaW9uIERhdGUgTWFuaXB1bGF0aW9uIEZ1bmN0aW9uc1xuXG4vKipcbiAqIENyZWF0ZSBhIGdyaWQgc3RyaW5nIGZyb20gYW4gYXJyYXkgb2YgaHRtbCBzdHJpbmdzXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gaHRtbEFycmF5IHRoZSBhcnJheSBvZiBodG1sIGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gcm93U2l6ZSB0aGUgbGVuZ3RoIG9mIGEgcm93XG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZ3JpZCBzdHJpbmdcbiAqL1xuY29uc3QgbGlzdFRvR3JpZEh0bWwgPSAoaHRtbEFycmF5LCByb3dTaXplKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgbGV0IHJvdyA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoKSB7XG4gICAgcm93ID0gW107XG5cbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB3aGlsZSAoaSA8IGh0bWxBcnJheS5sZW5ndGggJiYgcm93Lmxlbmd0aCA8IHJvd1NpemUpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGh0bWxBcnJheVtpXSk7XG4gICAgICByb3cucHVzaCh0ZCk7XG4gICAgICBpICs9IDE7XG4gICAgfVxuXG4gICAgcm93LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIHRyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGdyaWQucHVzaCh0cik7XG4gIH1cblxuICByZXR1cm4gZ3JpZDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlQm9keSA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgdGFibGVCb2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRhYmxlQm9keTtcbn07XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGRhdGUgcGlja2VyLlxuICogQHR5cGVkZWYge09iamVjdH0gRGF0ZVBpY2tlckNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGNhbGVuZGFyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGVQaWNrZXJFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnRlcm5hbElucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gZXh0ZXJuYWxJbnB1dEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZmlyc3RZZWFyQ2h1bmtFbFxuICogQHByb3BlcnR5IHtEYXRlfSBjYWxlbmRhckRhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gbWluRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBtYXhEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHNlbGVjdGVkRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSByYW5nZURhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gZGVmYXVsdERhdGVcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKiBAcmV0dXJucyB7RGF0ZVBpY2tlckNvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldERhdGVQaWNrZXJDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9QSUNLRVIpO1xuXG4gIGlmICghZGF0ZVBpY2tlckVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEQVRFX1BJQ0tFUn1gKTtcbiAgfVxuXG4gIGNvbnN0IGludGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUXG4gICk7XG4gIGNvbnN0IGV4dGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXG4gICk7XG4gIGNvbnN0IGNhbGVuZGFyRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9DQUxFTkRBUik7XG4gIGNvbnN0IHRvZ2dsZUJ0bkVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoREFURV9QSUNLRVJfQlVUVE9OKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9TVEFUVVMpO1xuICBjb25zdCBmaXJzdFllYXJDaHVua0VsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUik7XG5cbiAgY29uc3QgaW5wdXREYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGV4dGVybmFsSW5wdXRFbC52YWx1ZSxcbiAgICBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFULFxuICAgIHRydWVcbiAgKTtcbiAgY29uc3Qgc2VsZWN0ZWREYXRlID0gcGFyc2VEYXRlU3RyaW5nKGludGVybmFsSW5wdXRFbC52YWx1ZSk7XG5cbiAgY29uc3QgY2FsZW5kYXJEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGNhbGVuZGFyRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNvbnN0IG1pbkRhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSk7XG4gIGNvbnN0IG1heERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSk7XG4gIGNvbnN0IHJhbmdlRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5yYW5nZURhdGUpO1xuICBjb25zdCBkZWZhdWx0RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSk7XG5cbiAgaWYgKG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBtaW5EYXRlID4gbWF4RGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmltdW0gZGF0ZSBjYW5ub3QgYmUgYWZ0ZXIgbWF4aW11bSBkYXRlXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYWxlbmRhckRhdGUsXG4gICAgbWluRGF0ZSxcbiAgICB0b2dnbGVCdG5FbCxcbiAgICBzZWxlY3RlZERhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBmaXJzdFllYXJDaHVua0VsLFxuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBpbnB1dERhdGUsXG4gICAgaW50ZXJuYWxJbnB1dEVsLFxuICAgIGV4dGVybmFsSW5wdXRFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHJhbmdlRGF0ZSxcbiAgICBkZWZhdWx0RGF0ZSxcbiAgICBzdGF0dXNFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZXh0ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgdG9nZ2xlQnRuRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICB0b2dnbGVCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBleHRlcm5hbElucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbi8vICNyZWdpb24gVmFsaWRhdGlvblxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgYXMgYSB2YWxpZCBkYXRlIG9mIGZvcm1hdCBNL0QvWVlZWVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaXNEYXRlSW5wdXRJbnZhbGlkID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3QgZGF0ZVN0cmluZyA9IGV4dGVybmFsSW5wdXRFbC52YWx1ZTtcbiAgbGV0IGlzSW52YWxpZCA9IGZhbHNlO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgaXNJbnZhbGlkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGRhdGVTdHJpbmdQYXJ0cyA9IGRhdGVTdHJpbmcuc3BsaXQoXCIvXCIpO1xuICAgIGNvbnN0IFttb250aCwgZGF5LCB5ZWFyXSA9IGRhdGVTdHJpbmdQYXJ0cy5tYXAoKHN0cikgPT4ge1xuICAgICAgbGV0IHZhbHVlO1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB2YWx1ZSA9IHBhcnNlZDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaGVja0RhdGUgPSBzZXREYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcblxuICAgICAgaWYgKFxuICAgICAgICBjaGVja0RhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGggLSAxICYmXG4gICAgICAgIGNoZWNrRGF0ZS5nZXREYXRlKCkgPT09IGRheSAmJlxuICAgICAgICBjaGVja0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJlxuICAgICAgICBkYXRlU3RyaW5nUGFydHNbMl0ubGVuZ3RoID09PSA0ICYmXG4gICAgICAgIGlzRGF0ZVdpdGhpbk1pbkFuZE1heChjaGVja0RhdGUsIG1pbkRhdGUsIG1heERhdGUpXG4gICAgICApIHtcbiAgICAgICAgaXNJbnZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzSW52YWxpZDtcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGRhdGUgb2YgZm9ybWF0IE0vRC9ZWVlZXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB2YWxpZGF0ZURhdGVJbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBpc0ludmFsaWQgPSBpc0RhdGVJbnB1dEludmFsaWQoZXh0ZXJuYWxJbnB1dEVsKTtcblxuICBpZiAoaXNJbnZhbGlkICYmICFleHRlcm5hbElucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBleHRlcm5hbElucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNJbnZhbGlkICYmIGV4dGVybmFsSW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgZXh0ZXJuYWxJbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIFZhbGlkYXRpb25cblxuLyoqXG4gKiBFbmFibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgcmVjb25jaWxlSW5wdXRWYWx1ZXMgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwsIGlucHV0RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBsZXQgbmV3VmFsdWUgPSBcIlwiO1xuXG4gIGlmIChpbnB1dERhdGUgJiYgIWlzRGF0ZUlucHV0SW52YWxpZChlbCkpIHtcbiAgICBuZXdWYWx1ZSA9IGZvcm1hdERhdGUoaW5wdXREYXRlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgbmV3VmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgdmFsdWUgb2YgdGhlIGRhdGUgcGlja2VyIGlucHV0cy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0cmluZyBUaGUgZGF0ZSBzdHJpbmcgdG8gdXBkYXRlIGluIFlZWVktTU0tREQgZm9ybWF0XG4gKi9cbmNvbnN0IHNldENhbGVuZGFyVmFsdWUgPSAoZWwsIGRhdGVTdHJpbmcpID0+IHtcbiAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nKTtcblxuICBpZiAocGFyc2VkRGF0ZSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKHBhcnNlZERhdGUsIERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpO1xuXG4gICAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGludGVybmFsSW5wdXRFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPVxuICAgICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgZGF0ZVN0cmluZyk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGV4dGVybmFsSW5wdXRFbCwgZm9ybWF0dGVkRGF0ZSk7XG5cbiAgICB2YWxpZGF0ZURhdGVJbnB1dChkYXRlUGlja2VyRWwpO1xuICB9XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5oYW5jZURhdGVQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1BJQ0tFUik7XG4gIGNvbnN0IHsgZGVmYXVsdFZhbHVlIH0gPSBkYXRlUGlja2VyRWwuZGF0YXNldDtcblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihgaW5wdXRgKTtcblxuICBpZiAoIWludGVybmFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtEQVRFX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC52YWx1ZSkge1xuICAgIGludGVybmFsSW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1pblwiKVxuICApO1xuICBkYXRlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlID0gbWluRGF0ZVxuICAgID8gZm9ybWF0RGF0ZShtaW5EYXRlKVxuICAgIDogREVGQVVMVF9NSU5fREFURTtcblxuICBjb25zdCBtYXhEYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heFwiKVxuICApO1xuICBpZiAobWF4RGF0ZSkge1xuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgPSBmb3JtYXREYXRlKG1heERhdGUpO1xuICB9XG5cbiAgY29uc3QgY2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyk7XG5cbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gaW50ZXJuYWxJbnB1dEVsLmNsb25lTm9kZSgpO1xuICBleHRlcm5hbElucHV0RWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyk7XG4gIGV4dGVybmFsSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XG5cbiAgY2FsZW5kYXJXcmFwcGVyLmFwcGVuZENoaWxkKGV4dGVybmFsSW5wdXRFbCk7XG4gIGNhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfVwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBjYWxlbmRhclwiPjwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCIke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGhpZGRlbj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidXNhLXNyLW9ubHkgJHtEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1N9XCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPjwvZGl2PmBcbiAgKTtcblxuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaW50ZXJuYWxJbnB1dEVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MpO1xuICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICBpbnRlcm5hbElucHV0RWwucmVxdWlyZWQgPSBmYWxzZTtcblxuICBkYXRlUGlja2VyRWwuYXBwZW5kQ2hpbGQoY2FsZW5kYXJXcmFwcGVyKTtcbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MpO1xuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBzZXRDYWxlbmRhclZhbHVlKGRhdGVQaWNrZXJFbCwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGRhdGVQaWNrZXJFbCk7XG4gICAgaW50ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cbn07XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBEYXRlIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogcmVuZGVyIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlVG9EaXNwbGF5IGEgZGF0ZSB0byByZW5kZXIgb24gdGhlIGNhbGVuZGFyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IGEgcmVmZXJlbmNlIHRvIHRoZSBuZXcgY2FsZW5kYXIgZWxlbWVudFxuICovXG5jb25zdCByZW5kZXJDYWxlbmRhciA9IChlbCwgX2RhdGVUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3Qge1xuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHN0YXR1c0VsLFxuICAgIHNlbGVjdGVkRGF0ZSxcbiAgICBtYXhEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgcmFuZ2VEYXRlLFxuICB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB0b2RheXNEYXRlID0gdG9kYXkoKTtcbiAgbGV0IGRhdGVUb0Rpc3BsYXkgPSBfZGF0ZVRvRGlzcGxheSB8fCB0b2RheXNEYXRlO1xuXG4gIGNvbnN0IGNhbGVuZGFyV2FzSGlkZGVuID0gY2FsZW5kYXJFbC5oaWRkZW47XG5cbiAgY29uc3QgZm9jdXNlZERhdGUgPSBhZGREYXlzKGRhdGVUb0Rpc3BsYXksIDApO1xuICBjb25zdCBmb2N1c2VkTW9udGggPSBkYXRlVG9EaXNwbGF5LmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0gZGF0ZVRvRGlzcGxheS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IHByZXZNb250aCA9IHN1Yk1vbnRocyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgY29uc3QgbmV4dE1vbnRoID0gYWRkTW9udGhzKGRhdGVUb0Rpc3BsYXksIDEpO1xuXG4gIGNvbnN0IGN1cnJlbnRGb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShkYXRlVG9EaXNwbGF5KTtcblxuICBjb25zdCBmaXJzdE9mTW9udGggPSBzdGFydE9mTW9udGgoZGF0ZVRvRGlzcGxheSk7XG4gIGNvbnN0IHByZXZCdXR0b25zRGlzYWJsZWQgPSBpc1NhbWVNb250aChkYXRlVG9EaXNwbGF5LCBtaW5EYXRlKTtcbiAgY29uc3QgbmV4dEJ1dHRvbnNEaXNhYmxlZCA9IGlzU2FtZU1vbnRoKGRhdGVUb0Rpc3BsYXksIG1heERhdGUpO1xuXG4gIGNvbnN0IHJhbmdlQ29uY2x1c2lvbkRhdGUgPSBzZWxlY3RlZERhdGUgfHwgZGF0ZVRvRGlzcGxheTtcbiAgY29uc3QgcmFuZ2VTdGFydERhdGUgPSByYW5nZURhdGUgJiYgbWluKHJhbmdlQ29uY2x1c2lvbkRhdGUsIHJhbmdlRGF0ZSk7XG4gIGNvbnN0IHJhbmdlRW5kRGF0ZSA9IHJhbmdlRGF0ZSAmJiBtYXgocmFuZ2VDb25jbHVzaW9uRGF0ZSwgcmFuZ2VEYXRlKTtcblxuICBjb25zdCB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRGF0ZSAmJiBhZGREYXlzKHJhbmdlU3RhcnREYXRlLCAxKTtcbiAgY29uc3Qgd2l0aGluUmFuZ2VFbmREYXRlID0gcmFuZ2VEYXRlICYmIHN1YkRheXMocmFuZ2VFbmREYXRlLCAxKTtcblxuICBjb25zdCBtb250aExhYmVsID0gTU9OVEhfTEFCRUxTW2ZvY3VzZWRNb250aF07XG5cbiAgY29uc3QgZ2VuZXJhdGVEYXRlSHRtbCA9IChkYXRlVG9SZW5kZXIpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX0RBVEVfQ0xBU1NdO1xuICAgIGNvbnN0IGRheSA9IGRhdGVUb1JlbmRlci5nZXREYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlVG9SZW5kZXIuZ2V0TW9udGgoKTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZVRvUmVuZGVyLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZVRvUmVuZGVyLmdldERheSgpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUoZGF0ZVRvUmVuZGVyKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSAhaXNEYXRlV2l0aGluTWluQW5kTWF4KGRhdGVUb1JlbmRlciwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHNlbGVjdGVkRGF0ZSk7XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBwcmV2TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9QUkVWSU9VU19NT05USF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZU1vbnRoKGRhdGVUb1JlbmRlciwgZm9jdXNlZERhdGUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBuZXh0TW9udGgpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9ORVhUX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCB0b2RheXNEYXRlKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfVE9EQVlfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChyYW5nZURhdGUpIHtcbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZURhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VTdGFydERhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfU1RBUlRfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VFbmREYXRlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0VORF9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaXNEYXRlV2l0aGluTWluQW5kTWF4KFxuICAgICAgICAgIGRhdGVUb1JlbmRlcixcbiAgICAgICAgICB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSxcbiAgICAgICAgICB3aXRoaW5SYW5nZUVuZERhdGVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIGZvY3VzZWREYXRlKSkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoU3RyID0gTU9OVEhfTEFCRUxTW21vbnRoXTtcbiAgICBjb25zdCBkYXlTdHIgPSBEQVlfT0ZfV0VFS19MQUJFTFNbZGF5T2ZXZWVrXTtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtZGF5XCIsIGRheSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbW9udGhcIiwgbW9udGggKyAxKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS15ZWFyXCIsIHllYXIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGZvcm1hdHRlZERhdGUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYCR7ZGF5fSAke21vbnRoU3RyfSAke3llYXJ9ICR7ZGF5U3RyfWBcbiAgICApO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IGRheTtcblxuICAgIHJldHVybiBidG47XG4gIH07XG5cbiAgLy8gc2V0IGRhdGUgdG8gZmlyc3QgcmVuZGVyZWQgZGF5XG4gIGRhdGVUb0Rpc3BsYXkgPSBzdGFydE9mV2VlayhmaXJzdE9mTW9udGgpO1xuXG4gIGNvbnN0IGRheXMgPSBbXTtcblxuICB3aGlsZSAoXG4gICAgZGF5cy5sZW5ndGggPCAyOCB8fFxuICAgIGRhdGVUb0Rpc3BsYXkuZ2V0TW9udGgoKSA9PT0gZm9jdXNlZE1vbnRoIHx8XG4gICAgZGF5cy5sZW5ndGggJSA3ICE9PSAwXG4gICkge1xuICAgIGRheXMucHVzaChnZW5lcmF0ZURhdGVIdG1sKGRhdGVUb0Rpc3BsYXkpKTtcbiAgICBkYXRlVG9EaXNwbGF5ID0gYWRkRGF5cyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKGRheXMsIDcpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuZGF0YXNldC52YWx1ZSA9IGN1cnJlbnRGb3JtYXR0ZWREYXRlO1xuICBuZXdDYWxlbmRhci5zdHlsZS50b3AgPSBgJHtkYXRlUGlja2VyRWwub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgbmV3Q2FsZW5kYXIuaGlkZGVuID0gZmFsc2U7XG4gIG5ld0NhbGVuZGFyLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX1JPV19DTEFTU31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgYmFjayBvbmUgeWVhclwiXG4gICAgICAgICAgICAke3ByZXZCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgb25lIG1vbnRoXCJcbiAgICAgICAgICAgICR7cHJldkJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX01PTlRIX0xBQkVMX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiJHttb250aExhYmVsfS4gQ2xpY2sgdG8gc2VsZWN0IG1vbnRoXCJcbiAgICAgICAgICA+JHttb250aExhYmVsfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCIke2ZvY3VzZWRZZWFyfS4gQ2xpY2sgdG8gc2VsZWN0IHllYXJcIlxuICAgICAgICAgID4ke2ZvY3VzZWRZZWFyfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGhcIlxuICAgICAgICAgICAgJHtuZXh0QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhclwiXG4gICAgICAgICAgICAke25leHRCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgdGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICBjb25zdCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gIHRhYmxlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZUhlYWQpO1xuICBjb25zdCB0YWJsZUhlYWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlSGVhZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVIZWFkUm93KTtcblxuICBjb25zdCBkYXlzT2ZXZWVrID0ge1xuICAgIFN1bmRheTogXCJTXCIsXG4gICAgTW9uZGF5OiBcIk1cIixcbiAgICBUdWVzZGF5OiBcIlRcIixcbiAgICBXZWRuZXNkYXk6IFwiV1wiLFxuICAgIFRodXJzZGF5OiBcIlRoXCIsXG4gICAgRnJpZGF5OiBcIkZyXCIsXG4gICAgU2F0dXJkYXk6IFwiU1wiLFxuICB9O1xuXG4gIE9iamVjdC5rZXlzKGRheXNPZldlZWspLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcInByZXNlbnRhdGlvblwiKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGtleSk7XG4gICAgdGgudGV4dENvbnRlbnQgPSBkYXlzT2ZXZWVrW2tleV07XG4gICAgdGFibGVIZWFkUm93Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0aCk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShkYXRlc0dyaWQpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVCb2R5KTtcblxuICAvLyBDb250YWluZXIgZm9yIFllYXJzLCBNb250aHMsIGFuZCBEYXlzXG4gIGNvbnN0IGRhdGVQaWNrZXJDYWxlbmRhckNvbnRhaW5lciA9XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG5cbiAgZGF0ZVBpY2tlckNhbGVuZGFyQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZSk7XG5cbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTKTtcblxuICBjb25zdCBzdGF0dXNlcyA9IFtdO1xuXG4gIGlmIChpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICBzdGF0dXNlcy5wdXNoKFwiU2VsZWN0ZWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGlmIChjYWxlbmRhcldhc0hpZGRlbikge1xuICAgIHN0YXR1c2VzLnB1c2goXG4gICAgICBcIllvdSBjYW4gbmF2aWdhdGUgYnkgZGF5IHVzaW5nIGxlZnQgYW5kIHJpZ2h0IGFycm93c1wiLFxuICAgICAgXCJXZWVrcyBieSB1c2luZyB1cCBhbmQgZG93biBhcnJvd3NcIixcbiAgICAgIFwiTW9udGhzIGJ5IHVzaW5nIHBhZ2UgdXAgYW5kIHBhZ2UgZG93biBrZXlzXCIsXG4gICAgICBcIlllYXJzIGJ5IHVzaW5nIHNoaWZ0IHBsdXMgcGFnZSB1cCBhbmQgc2hpZnQgcGx1cyBwYWdlIGRvd25cIixcbiAgICAgIFwiSG9tZSBhbmQgZW5kIGtleXMgbmF2aWdhdGUgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgd2Vla1wiXG4gICAgKTtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgc3RhdHVzZXMucHVzaChgJHttb250aExhYmVsfSAke2ZvY3VzZWRZZWFyfWApO1xuICB9XG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gc3RhdHVzZXMuam9pbihcIi4gXCIpO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzWWVhciA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IHN1YlllYXJzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9QUkVWSU9VU19ZRUFSKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheVByZXZpb3VzTW9udGggPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBzdWJNb250aHMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRNb250aCA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IGFkZE1vbnRocyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9NT05USCk7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gX2J1dHRvbkVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRZZWFyID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gYWRkWWVhcnMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX05FWFRfWUVBUik7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGlkZSB0aGUgY2FsZW5kYXIgb2YgYSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBoaWRlQ2FsZW5kYXIgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGNhbGVuZGFyRWwsIHN0YXR1c0VsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5yZW1vdmUoREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTKTtcbiAgY2FsZW5kYXJFbC5oaWRkZW4gPSB0cnVlO1xuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhIGRhdGUgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gY2FsZW5kYXJEYXRlRWwgQSBkYXRlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0RGF0ZSA9IChjYWxlbmRhckRhdGVFbCkgPT4ge1xuICBpZiAoY2FsZW5kYXJEYXRlRWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGNhbGVuZGFyRGF0ZUVsKTtcblxuICBzZXRDYWxlbmRhclZhbHVlKGNhbGVuZGFyRGF0ZUVsLCBjYWxlbmRhckRhdGVFbC5kYXRhc2V0LnZhbHVlKTtcbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG5cbiAgZXh0ZXJuYWxJbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVDYWxlbmRhciA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUsIGRlZmF1bHREYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBpZiAoY2FsZW5kYXJFbC5oaWRkZW4pIHtcbiAgICBjb25zdCBkYXRlVG9EaXNwbGF5ID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KFxuICAgICAgaW5wdXREYXRlIHx8IGRlZmF1bHREYXRlIHx8IHRvZGF5KCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlQ2FsZW5kYXIoZWwpO1xuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2FsZW5kYXIgd2hlbiB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICovXG5jb25zdCB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGlucHV0RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBjYWxlbmRhclNob3duID0gIWNhbGVuZGFyRWwuaGlkZGVuO1xuXG4gIGlmIChjYWxlbmRhclNob3duICYmIGlucHV0RGF0ZSkge1xuICAgIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIERhdGUgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG4vKipcbiAqIERpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlNb250aFNlbGVjdGlvbiA9IChlbCwgbW9udGhUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBzdGF0dXNFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gY2FsZW5kYXJEYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IGZvY3VzZWRNb250aCA9IG1vbnRoVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZE1vbnRoIDogbW9udGhUb0Rpc3BsYXk7XG5cbiAgY29uc3QgbW9udGhzID0gTU9OVEhfTEFCRUxTLm1hcCgobW9udGgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbW9udGhUb0NoZWNrID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBpbmRleCk7XG5cbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc01vbnRoT3V0c2lkZU1pbk9yTWF4KFxuICAgICAgbW9udGhUb0NoZWNrLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGVcbiAgICApO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtDQUxFTkRBUl9NT05USF9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZE1vbnRoO1xuXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2VkTW9udGgpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWxcIiwgbW9udGgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IG1vbnRoO1xuXG4gICAgcmV0dXJuIGJ0bjtcbiAgfSk7XG5cbiAgY29uc3QgbW9udGhzSHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1vbnRoc0h0bWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgbW9udGhzSHRtbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1MpO1xuXG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJwcmVzZW50YXRpb25cIik7XG5cbiAgY29uc3QgbW9udGhzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKG1vbnRocywgMyk7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShtb250aHNHcmlkKTtcbiAgdGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlQm9keSk7XG4gIG1vbnRoc0h0bWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlKTtcblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtb250aHNIdG1sKTtcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIG1vbnRoLlwiO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgbW9udGggaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBtb250aEVsIEFuIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0TW9udGggPSAobW9udGhFbCkgPT4ge1xuICBpZiAobW9udGhFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBsZXQgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRNb250aCk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogRGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGluIHRoZSBkYXRlIHBpY2tlci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge251bWJlcn0geWVhclRvRGlzcGxheSB5ZWFyIHRvIGRpc3BsYXkgaW4geWVhciBzZWxlY3Rpb25cbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlZZWFyU2VsZWN0aW9uID0gKGVsLCB5ZWFyVG9EaXNwbGF5KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgc3RhdHVzRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gY2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0geWVhclRvRGlzcGxheSA9PSBudWxsID8gc2VsZWN0ZWRZZWFyIDogeWVhclRvRGlzcGxheTtcblxuICBsZXQgeWVhclRvQ2h1bmsgPSBmb2N1c2VkWWVhcjtcbiAgeWVhclRvQ2h1bmsgLT0geWVhclRvQ2h1bmsgJSBZRUFSX0NIVU5LO1xuICB5ZWFyVG9DaHVuayA9IE1hdGgubWF4KDAsIHllYXJUb0NodW5rKTtcblxuICBjb25zdCBwcmV2WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgLSAxKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGVcbiAgKTtcblxuICBjb25zdCBuZXh0WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgKyBZRUFSX0NIVU5LKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGVcbiAgKTtcblxuICBjb25zdCB5ZWFycyA9IFtdO1xuICBsZXQgeWVhckluZGV4ID0geWVhclRvQ2h1bms7XG4gIHdoaWxlICh5ZWFycy5sZW5ndGggPCBZRUFSX0NIVU5LKSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgICAgc2V0WWVhcihjYWxlbmRhckRhdGUsIHllYXJJbmRleCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZVxuICAgICk7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX1lFQVJfQ0xBU1NdO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB5ZWFySW5kZXggPT09IHNlbGVjdGVkWWVhcjtcblxuICAgIGlmICh5ZWFySW5kZXggPT09IGZvY3VzZWRZZWFyKSB7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIHllYXJJbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0geWVhckluZGV4O1xuXG4gICAgeWVhcnMucHVzaChidG4pO1xuICAgIHllYXJJbmRleCArPSAxO1xuICB9XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBjYWxlbmRhckVsLmNsb25lTm9kZSgpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgY2FsZW5kYXIgd3JhcHBlclxuICBjb25zdCB5ZWFyc0NhbGVuZGFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTKTtcblxuICAvLyBjcmVhdGUgdGFibGUgcGFyZW50XG4gIGNvbnN0IHllYXJzVGFibGVQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHllYXJzVGFibGVQYXJlbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcbiAgeWVhcnNUYWJsZVBhcmVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG5cbiAgLy8gY3JlYXRlIHRhYmxlIGJvZHkgYW5kIHRhYmxlIHJvd1xuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAvLyBjcmVhdGUgcHJldmlvdXMgYnV0dG9uXG4gIGNvbnN0IHByZXZpb3VzWWVhcnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBwcmV2aW91c1llYXJzQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTUyk7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIGBOYXZpZ2F0ZSBiYWNrICR7WUVBUl9DSFVOS30geWVhcnNgXG4gICk7XG4gIGlmIChwcmV2WWVhckNodW5rRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICBwcmV2aW91c1llYXJzQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuICBwcmV2aW91c1llYXJzQnRuLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCZuYnNwYDtcblxuICAvLyBjcmVhdGUgbmV4dCBidXR0b25cbiAgY29uc3QgbmV4dFllYXJzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV4dFllYXJzQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gIG5leHRZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktfQ0xBU1MpO1xuICBuZXh0WWVhcnNCdG4uc2V0QXR0cmlidXRlKFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIGBOYXZpZ2F0ZSBmb3J3YXJkICR7WUVBUl9DSFVOS30geWVhcnNgXG4gICk7XG4gIGlmIChuZXh0WWVhckNodW5rRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICBuZXh0WWVhcnNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIG5leHRZZWFyc0J0bi5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAmbmJzcGA7XG5cbiAgLy8gY3JlYXRlIHRoZSBhY3R1YWwgeWVhcnMgdGFibGVcbiAgY29uc3QgeWVhcnNUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgeWVhcnNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHllYXJzVGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICAvLyBjcmVhdGUgdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIGNvbnN0IHllYXJzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKHllYXJzLCAzKTtcbiAgY29uc3QgeWVhcnNUYWJsZUJvZHkgPSBjcmVhdGVUYWJsZUJvZHkoeWVhcnNHcmlkKTtcblxuICAvLyBhcHBlbmQgdGhlIGdyaWQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIHllYXJzVGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzVGFibGVCb2R5KTtcblxuICAvLyBjcmVhdGUgdGhlIHByZXYgYnV0dG9uIHRkIGFuZCBhcHBlbmQgdGhlIHByZXYgYnV0dG9uXG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgcHJldmlvdXNZZWFyc0J0blxuICApO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgdGQgYW5kIGFwcGVuZCB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsLnNldEF0dHJpYnV0ZShcImNvbHNwYW5cIiwgXCIzXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZSk7XG5cbiAgLy8gY3JlYXRlIHRoZSBuZXh0IGJ1dHRvbiB0ZCBhbmQgYXBwZW5kIHRoZSBuZXh0IGJ1dHRvblxuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBuZXh0WWVhcnNCdG4pO1xuXG4gIC8vIGFwcGVuZCB0aGUgdGhyZWUgdGQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlIHJvd1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldlxuICApO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWxcbiAgKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5Um93Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIHllYXJzSFRNTFRhYmxlQm9keURldGFpbE5leHRcbiAgKTtcblxuICAvLyBhcHBlbmQgdGhlIHRhYmxlIHJvdyB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGUgYm9keVxuICB5ZWFyc0hUTUxUYWJsZUJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzSFRNTFRhYmxlQm9keVJvdyk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyB0YWJsZSBib2R5IHRvIHRoZSB5ZWFycyBwYXJlbnQgdGFibGVcbiAgeWVhcnNUYWJsZVBhcmVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNIVE1MVGFibGVCb2R5KTtcblxuICAvLyBhcHBlbmQgdGhlIHBhcmVudCB0YWJsZSB0byB0aGUgY2FsZW5kYXIgd3JhcHBlclxuICB5ZWFyc0NhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZVBhcmVudCk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyBjYWxlbmRlciB0byB0aGUgbmV3IGNhbGVuZGFyXG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc0NhbGVuZGFyV3JhcHBlcik7XG5cbiAgLy8gcmVwbGFjZSBjYWxlbmRhclxuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFNob3dpbmcgeWVhcnMgJHt5ZWFyVG9DaHVua30gdG8gJHtcbiAgICB5ZWFyVG9DaHVuayArIFlFQVJfQ0hVTksgLSAxXG4gIH0uIFNlbGVjdCBhIHllYXIuYDtcblxuICByZXR1cm4gbmV3Q2FsZW5kYXI7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgYnkgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHllYXJFbCA9IGNhbGVuZGFyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwudGV4dENvbnRlbnQsIDEwKTtcblxuICBsZXQgYWRqdXN0ZWRZZWFyID0gc2VsZWN0ZWRZZWFyIC0gWUVBUl9DSFVOSztcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgY2FsZW5kYXJFbCxcbiAgICBjYXBwZWREYXRlLmdldEZ1bGxZZWFyKClcbiAgKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTkspO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgYnkgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlOZXh0WWVhckNodW5rID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeWVhckVsID0gY2FsZW5kYXJFbC5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC50ZXh0Q29udGVudCwgMTApO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBzZWxlY3RlZFllYXIgKyBZRUFSX0NIVU5LO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbihcbiAgICBjYWxlbmRhckVsLFxuICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSB5ZWFyIGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0geWVhckVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdFllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoeWVhckVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLmlubmVySFRNTCwgMTApO1xuICBsZXQgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZFllYXIpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBIaWRlIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhciA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChldmVudC50YXJnZXQpO1xuXG4gIGhpZGVDYWxlbmRhcihkYXRlUGlja2VyRWwpO1xuICBleHRlcm5hbElucHV0RWwuZm9jdXMoKTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBBZGp1c3QgdGhlIGRhdGUgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3REYXRlRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkanVzdENhbGVuZGFyID0gKGFkanVzdERhdGVGbikgPT4gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBldmVudC50YXJnZXRcbiAgKTtcblxuICBjb25zdCBkYXRlID0gYWRqdXN0RGF0ZUZuKGNhbGVuZGFyRGF0ZSk7XG5cbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVEYXkoY2FsZW5kYXJEYXRlLCBjYXBwZWREYXRlKSkge1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgY2FwcGVkRGF0ZSk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1YldlZWtzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRXZWVrcyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgZGF5IGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUxlZnRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJEYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBkYXkgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGREYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN0YXJ0T2ZXZWVrKGRhdGUpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGVuZE9mV2VlayhkYXRlKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRNb250aHMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1Yk1vbnRocyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVTaGlmdFBhZ2VEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkWWVhcnMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU2hpZnRQYWdlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJZZWFycyhkYXRlLCAxKSk7XG5cbi8qKlxuICogZGlzcGxheSB0aGUgY2FsZW5kYXIgZm9yIHRoZSBtb3VzZW92ZXIgZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZW92ZXIgZXZlbnRcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGRhdGVFbCBBIGRhdGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVNb3VzZW92ZXJGcm9tRGF0ZSA9IChkYXRlRWwpID0+IHtcbiAgaWYgKGRhdGVFbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IGNhbGVuZGFyRWwgPSBkYXRlRWwuY2xvc2VzdChEQVRFX1BJQ0tFUl9DQUxFTkRBUik7XG5cbiAgY29uc3QgY3VycmVudENhbGVuZGFyRGF0ZSA9IGNhbGVuZGFyRWwuZGF0YXNldC52YWx1ZTtcbiAgY29uc3QgaG92ZXJEYXRlID0gZGF0ZUVsLmRhdGFzZXQudmFsdWU7XG5cbiAgaWYgKGhvdmVyRGF0ZSA9PT0gY3VycmVudENhbGVuZGFyRGF0ZSkgcmV0dXJuO1xuXG4gIGNvbnN0IGRhdGVUb0Rpc3BsYXkgPSBwYXJzZURhdGVTdHJpbmcoaG92ZXJEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlVG9EaXNwbGF5KTtcbiAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBNb250aCBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdE1vbnRoRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBtb250aFxuICovXG5jb25zdCBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbiA9IChhZGp1c3RNb250aEZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgbW9udGhFbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3QgY3VycmVudERhdGUgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIHNlbGVjdGVkTW9udGgpO1xuXG4gIGxldCBhZGp1c3RlZE1vbnRoID0gYWRqdXN0TW9udGhGbihzZWxlY3RlZE1vbnRoKTtcbiAgYWRqdXN0ZWRNb250aCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDExLCBhZGp1c3RlZE1vbnRoKSk7XG5cbiAgY29uc3QgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRNb250aCk7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lTW9udGgoY3VycmVudERhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24oXG4gICAgICBjYWxlbmRhckVsLFxuICAgICAgY2FwcGVkRGF0ZS5nZXRNb250aCgpXG4gICAgKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoIC0gKG1vbnRoICUgMylcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgcm93IG9mIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoICsgMiAtIChtb250aCAlIDMpXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBsYXN0IG1vbnRoIChEZWNlbWJlcikgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKCgpID0+IDExKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZmlyc3QgbW9udGggKEphbnVhcnkpIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMCk7XG5cbi8qKlxuICogdXBkYXRlIHRoZSBmb2N1cyBvbiBhIG1vbnRoIHdoZW4gdGhlIG1vdXNlIG1vdmVzLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gbW9udGhFbCBBIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbU1vbnRoID0gKG1vbnRoRWwpID0+IHtcbiAgaWYgKG1vbnRoRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgaWYgKG1vbnRoRWwuY2xhc3NMaXN0LmNvbnRhaW5zKENBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1MpKSByZXR1cm47XG5cbiAgY29uc3QgZm9jdXNNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKG1vbnRoRWwsIGZvY3VzTW9udGgpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIE1vbnRoIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgWWVhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3RZZWFyRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCB5ZWFyXG4gKi9cbmNvbnN0IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4gPSAoYWRqdXN0WWVhckZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgeWVhckVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dCh5ZWFyRWwpO1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZFllYXIpO1xuXG4gIGxldCBhZGp1c3RlZFllYXIgPSBhZGp1c3RZZWFyRm4oc2VsZWN0ZWRZZWFyKTtcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lWWVhcihjdXJyZW50RGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgICAgY2FsZW5kYXJFbCxcbiAgICAgIGNhcHBlZERhdGUuZ2V0RnVsbFllYXIoKVxuICAgICk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlTGVmdEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyIC0gKHllYXIgJSAzKVxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyAyIC0gKHllYXIgJSAzKVxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byBiYWNrIDEyIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyIC0gWUVBUl9DSFVOS1xuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIDEyIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyBZRUFSX0NIVU5LXG4pO1xuXG4vKipcbiAqIHVwZGF0ZSB0aGUgZm9jdXMgb24gYSB5ZWFyIHdoZW4gdGhlIG1vdXNlIG1vdmVzLlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZGF0ZUVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlckZyb21ZZWFyID0gKHllYXJFbCkgPT4ge1xuICBpZiAoeWVhckVsLmRpc2FibGVkKSByZXR1cm47XG4gIGlmICh5ZWFyRWwuY2xhc3NMaXN0LmNvbnRhaW5zKENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUykpIHJldHVybjtcblxuICBjb25zdCBmb2N1c1llYXIgPSBwYXJzZUludCh5ZWFyRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oeWVhckVsLCBmb2N1c1llYXIpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgWWVhciBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIEZvY3VzIEhhbmRsaW5nIEV2ZW50IEhhbmRsaW5nXG5cbmNvbnN0IHRhYkhhbmRsZXIgPSAoZm9jdXNhYmxlKSA9PiB7XG4gIGNvbnN0IGdldEZvY3VzYWJsZUNvbnRleHQgPSAoZWwpID0+IHtcbiAgICBjb25zdCB7IGNhbGVuZGFyRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHNlbGVjdChmb2N1c2FibGUsIGNhbGVuZGFyRWwpO1xuXG4gICAgY29uc3QgZmlyc3RUYWJJbmRleCA9IDA7XG4gICAgY29uc3QgbGFzdFRhYkluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1tmaXJzdFRhYkluZGV4XTtcbiAgICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2xhc3RUYWJJbmRleF07XG4gICAgY29uc3QgZm9jdXNJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoYWN0aXZlRWxlbWVudCgpKTtcblxuICAgIGNvbnN0IGlzTGFzdFRhYiA9IGZvY3VzSW5kZXggPT09IGxhc3RUYWJJbmRleDtcbiAgICBjb25zdCBpc0ZpcnN0VGFiID0gZm9jdXNJbmRleCA9PT0gZmlyc3RUYWJJbmRleDtcbiAgICBjb25zdCBpc05vdEZvdW5kID0gZm9jdXNJbmRleCA9PT0gLTE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNhYmxlRWxlbWVudHMsXG4gICAgICBpc05vdEZvdW5kLFxuICAgICAgZmlyc3RUYWJTdG9wLFxuICAgICAgaXNGaXJzdFRhYixcbiAgICAgIGxhc3RUYWJTdG9wLFxuICAgICAgaXNMYXN0VGFiLFxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB0YWJBaGVhZChldmVudCkge1xuICAgICAgY29uc3QgeyBmaXJzdFRhYlN0b3AsIGlzTGFzdFRhYiwgaXNOb3RGb3VuZCB9ID0gZ2V0Rm9jdXNhYmxlQ29udGV4dChcbiAgICAgICAgZXZlbnQudGFyZ2V0XG4gICAgICApO1xuXG4gICAgICBpZiAoaXNMYXN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0YWJCYWNrKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGxhc3RUYWJTdG9wLCBpc0ZpcnN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXRcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0ZpcnN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoREFURV9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihNT05USF9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKFlFQVJfUElDS0VSX0ZPQ1VTQUJMRSk7XG5cbi8vICNlbmRyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5jb25zdCBkYXRlUGlja2VyRXZlbnRzID0ge1xuICBbQ0xJQ0tdOiB7XG4gICAgW0RBVEVfUElDS0VSX0JVVFRPTl0oKSB7XG4gICAgICB0b2dnbGVDYWxlbmRhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9EQVRFXSgpIHtcbiAgICAgIHNlbGVjdERhdGUodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdKCkge1xuICAgICAgc2VsZWN0TW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl0oKSB7XG4gICAgICBzZWxlY3RZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX01PTlRIXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c01vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfTU9OVEhdKCkge1xuICAgICAgZGlzcGxheU5leHRNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlOZXh0WWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktdKCkge1xuICAgICAgZGlzcGxheU5leHRZZWFyQ2h1bmsodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKHRoaXMpO1xuICAgICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9NT05USF9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24odGhpcyk7XG4gICAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbiAgICB9LFxuICB9LFxuICBrZXl1cDoge1xuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleWRvd24gPSB0aGlzLmRhdGFzZXQua2V5ZG93bktleUNvZGU7XG4gICAgICBpZiAoYCR7ZXZlbnQua2V5Q29kZX1gICE9PSBrZXlkb3duKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAga2V5ZG93bjoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW0NBTEVOREFSX0RBVEVdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbURhdGUsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21EYXRlLFxuICAgICAgRG93bjogaGFuZGxlRG93bkZyb21EYXRlLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbURhdGUsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbURhdGUsXG4gICAgICBBcnJvd0xlZnQ6IGhhbmRsZUxlZnRGcm9tRGF0ZSxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21EYXRlLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tRGF0ZSxcbiAgICAgIEhvbWU6IGhhbmRsZUhvbWVGcm9tRGF0ZSxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbURhdGUsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFBhZ2VVcDogaGFuZGxlUGFnZVVwRnJvbURhdGUsXG4gICAgICBcIlNoaWZ0K1BhZ2VEb3duXCI6IGhhbmRsZVNoaWZ0UGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFwiU2hpZnQrUGFnZVVwXCI6IGhhbmRsZVNoaWZ0UGFnZVVwRnJvbURhdGUsXG4gICAgICBUYWI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX0RBVEVfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgIFwiU2hpZnQrVGFiXCI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbU1vbnRoLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tTW9udGgsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21Nb250aCxcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbU1vbnRoLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21Nb250aCxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbU1vbnRoLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbU1vbnRoLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tTW9udGgsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX01PTlRIX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tWWVhcixcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbVllYXIsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbVllYXIsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tWWVhcixcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tWWVhcixcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21ZZWFyLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbVllYXIsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21ZZWFyLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21ZZWFyLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tWWVhcixcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21ZZWFyLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tWWVhcixcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIHRoaXMuZGF0YXNldC5rZXlkb3duS2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgfSxcbiAgICBbREFURV9QSUNLRVJdKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlNYXAgPSBrZXltYXAoe1xuICAgICAgICBFc2NhcGU6IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhcixcbiAgICAgIH0pO1xuXG4gICAgICBrZXlNYXAoZXZlbnQpO1xuICAgIH0sXG4gIH0sXG4gIGZvY3Vzb3V0OiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXSgpIHtcbiAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgIH0sXG4gICAgW0RBVEVfUElDS0VSXShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgIGhpZGVDYWxlbmRhcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBpbnB1dDoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oKSB7XG4gICAgICByZWNvbmNpbGVJbnB1dFZhbHVlcyh0aGlzKTtcbiAgICAgIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5pZiAoIWlzSW9zRGV2aWNlKCkpIHtcbiAgZGF0ZVBpY2tlckV2ZW50cy5tb3VzZW92ZXIgPSB7XG4gICAgW0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tRGF0ZSh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9NT05USF0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tTW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tWWVhcih0aGlzKTtcbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBkYXRlUGlja2VyID0gYmVoYXZpb3IoZGF0ZVBpY2tlckV2ZW50cywge1xuICBpbml0KHJvb3QpIHtcbiAgICBzZWxlY3RPck1hdGNoZXMoREFURV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKGRhdGVQaWNrZXJFbCkgPT4ge1xuICAgICAgZW5oYW5jZURhdGVQaWNrZXIoZGF0ZVBpY2tlckVsKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RGF0ZVBpY2tlckNvbnRleHQsXG4gIGRpc2FibGUsXG4gIGVuYWJsZSxcbiAgaXNEYXRlSW5wdXRJbnZhbGlkLFxuICBzZXRDYWxlbmRhclZhbHVlLFxuICB2YWxpZGF0ZURhdGVJbnB1dCxcbiAgcmVuZGVyQ2FsZW5kYXIsXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlLFxufSk7XG5cbi8vICNlbmRyZWdpb24gRGF0ZSBQaWNrZXIgRXZlbnQgRGVsZWdhdGlvbiBSZWdpc3RyYXRpb24gLyBDb21wb25lbnRcblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlUGlja2VyO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHtcbiAgZ2V0RGF0ZVBpY2tlckNvbnRleHQsXG4gIGlzRGF0ZUlucHV0SW52YWxpZCxcbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUsXG59ID0gcmVxdWlyZShcIi4uLy4uL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXhcIik7XG5cbmNvbnN0IERBVEVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS1kYXRlLXBpY2tlcmA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1yYW5nZS1waWNrZXJgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MgPSBgJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31fX3JhbmdlLXN0YXJ0YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyA9IGAke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfV9fcmFuZ2UtZW5kYDtcblxuY29uc3QgREFURV9QSUNLRVIgPSBgLiR7REFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVCA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTU31gO1xuXG5jb25zdCBERUZBVUxUX01JTl9EQVRFID0gXCIwMDAwLTAxLTAxXCI7XG5cbi8qKlxuICogVGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEYXRlUmFuZ2VQaWNrZXJDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRlUmFuZ2VQaWNrZXJFbFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gcmFuZ2VTdGFydEVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSByYW5nZUVuZEVsXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICogQHJldHVybnMge0RhdGVSYW5nZVBpY2tlckNvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBpZiAoIWRhdGVSYW5nZVBpY2tlckVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEQVRFX1JBTkdFX1BJQ0tFUn1gKTtcbiAgfVxuXG4gIGNvbnN0IHJhbmdlU3RhcnRFbCA9IGRhdGVSYW5nZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRcbiAgKTtcbiAgY29uc3QgcmFuZ2VFbmRFbCA9IGRhdGVSYW5nZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbCxcbiAgICByYW5nZVN0YXJ0RWwsXG4gICAgcmFuZ2VFbmRFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlU3RhcnRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VTdGFydEVsKTtcbiAgY29uc3QgdXBkYXRlZERhdGUgPSBpbnRlcm5hbElucHV0RWwudmFsdWU7XG5cbiAgaWYgKHVwZGF0ZWREYXRlICYmICFpc0RhdGVJbnB1dEludmFsaWQoaW50ZXJuYWxJbnB1dEVsKSkge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IHVwZGF0ZWREYXRlO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LmRlZmF1bHREYXRlID0gXCJcIjtcbiAgfVxuXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHJhbmdlRW5kRWwpO1xufTtcblxuLyoqXG4gKiBoYW5kbGUgdXBkYXRlIGZyb20gcmFuZ2Ugc3RhcnQgZGF0ZSBwaWNrZXJcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXJcbiAqL1xuY29uc3QgaGFuZGxlUmFuZ2VFbmRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VFbmRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gXCJcIjtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZVN0YXJ0RWwpO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VEYXRlUmFuZ2VQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gc2VsZWN0KERBVEVfUElDS0VSLCBkYXRlUmFuZ2VQaWNrZXJFbCk7XG5cbiAgaWYgKCFyYW5nZVN0YXJ0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgdHdvICcke0RBVEVfUElDS0VSfScgZWxlbWVudHNgXG4gICAgKTtcbiAgfVxuXG4gIGlmICghcmFuZ2VFbmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgJHtEQVRFX1JBTkdFX1BJQ0tFUn0gaXMgbWlzc2luZyBzZWNvbmQgJyR7REFURV9QSUNLRVJ9JyBlbGVtZW50YFxuICAgICk7XG4gIH1cblxuICByYW5nZVN0YXJ0LmNsYXNzTGlzdC5hZGQoREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MpO1xuICByYW5nZUVuZC5jbGFzc0xpc3QuYWRkKERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyk7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBERUZBVUxUX01JTl9EQVRFO1xuICB9XG5cbiAgY29uc3QgeyBtaW5EYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICByYW5nZVN0YXJ0LmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG4gIHJhbmdlRW5kLmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG5cbiAgY29uc3QgeyBtYXhEYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICBpZiAobWF4RGF0ZSkge1xuICAgIHJhbmdlU3RhcnQuZGF0YXNldC5tYXhEYXRlID0gbWF4RGF0ZTtcbiAgICByYW5nZUVuZC5kYXRhc2V0Lm1heERhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZShkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gIGhhbmRsZVJhbmdlRW5kVXBkYXRlKGRhdGVSYW5nZVBpY2tlckVsKTtcbn07XG5cbmNvbnN0IGRhdGVSYW5nZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJpbnB1dCBjaGFuZ2VcIjoge1xuICAgICAgW0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VFbmRVcGRhdGUodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhEQVRFX1JBTkdFX1BJQ0tFUiwgcm9vdCkuZm9yRWFjaCgoZGF0ZVJhbmdlUGlja2VyRWwpID0+IHtcbiAgICAgICAgZW5oYW5jZURhdGVSYW5nZVBpY2tlcihkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVSYW5nZVBpY2tlcjtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IERST1BaT05FX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0YDtcbmNvbnN0IERST1BaT05FID0gYC4ke0RST1BaT05FX0NMQVNTfWA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5wdXRgO1xuY29uc3QgVEFSR0VUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X190YXJnZXRgO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IEJPWF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYm94YDtcbmNvbnN0IElOU1RSVUNUSU9OU19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5zdHJ1Y3Rpb25zYDtcbmNvbnN0IFBSRVZJRVdfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXdgO1xuY29uc3QgUFJFVklFV19IRUFESU5HX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWhlYWRpbmdgO1xuY29uc3QgRElTQUJMRURfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXQtLWRpc2FibGVkYDtcbmNvbnN0IENIT09TRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fY2hvb3NlYDtcbmNvbnN0IEFDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYWNjZXB0ZWQtZmlsZXMtbWVzc2FnZWA7XG5jb25zdCBEUkFHX1RFWFRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2RyYWctdGV4dGA7XG5jb25zdCBEUkFHX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0LS1kcmFnYDtcbmNvbnN0IExPQURJTkdfQ0xBU1MgPSBcImlzLWxvYWRpbmdcIjtcbmNvbnN0IEhJRERFTl9DTEFTUyA9IFwiZGlzcGxheS1ub25lXCI7XG5jb25zdCBJTlZBTElEX0ZJTEVfQ0xBU1MgPSBcImhhcy1pbnZhbGlkLWZpbGVcIjtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWltYWdlYDtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tZ2VuZXJpY2A7XG5jb25zdCBQREZfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tcGRmYDtcbmNvbnN0IFdPUkRfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0td29yZGA7XG5jb25zdCBWSURFT19QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS12aWRlb2A7XG5jb25zdCBFWENFTF9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1leGNlbGA7XG5jb25zdCBTUEFDRVJfR0lGID1cbiAgXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTdcIjtcblxubGV0IFRZUEVfSVNfVkFMSUQgPSBCb29sZWFuKHRydWUpOyAvLyBsb2dpYyBnYXRlIGZvciBjaGFuZ2UgbGlzdGVuZXJcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBmaWxlIGlucHV0LlxuICogQHR5cGVkZWYge09iamVjdH0gRmlsZUlucHV0Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZHJvcFpvbmVFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dEVsXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBmaWxlIGlucHV0IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXRcbiAqIEByZXR1cm5zIHtGaWxlSW5wdXRDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXRGaWxlSW5wdXRDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRyb3Bab25lRWwgPSBlbC5jbG9zZXN0KERST1BaT05FKTtcblxuICBpZiAoIWRyb3Bab25lRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RST1BaT05FfWApO1xuICB9XG5cbiAgY29uc3QgaW5wdXRFbCA9IGRyb3Bab25lRWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkcm9wWm9uZUVsLFxuICAgIGlucHV0RWwsXG4gIH07XG59O1xuXG4vKipcbiAqIERpc2FibGUgdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QuYWRkKERJU0FCTEVEX0NMQVNTKTtcbiAgZHJvcFpvbmVFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGRyb3Bab25lRWwuY2xhc3NMaXN0LnJlbW92ZShESVNBQkxFRF9DTEFTUyk7XG4gIGRyb3Bab25lRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIHNwZWNpYWwgY2hhcmFjdGVyc1xuICogQHJldHVybnMge1N0cmluZ30gcmVwbGFjZXMgc3BlY2lmaWVkIHZhbHVlc1xuICovXG5jb25zdCByZXBsYWNlTmFtZSA9IChzKSA9PiB7XG4gIGNvbnN0IGMgPSBzLmNoYXJDb2RlQXQoMCk7XG4gIGlmIChjID09PSAzMikgcmV0dXJuIFwiLVwiO1xuICBpZiAoYyA+PSA2NSAmJiBjIDw9IDkwKSByZXR1cm4gYGltZ18ke3MudG9Mb3dlckNhc2UoKX1gO1xuICByZXR1cm4gYF9fJHsoXCIwMDBcIiwgYy50b1N0cmluZygxNikpLnNsaWNlKC00KX1gO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIElEIG5hbWUgZm9yIGVhY2ggZmlsZSB0aGF0IHN0cmlwcyBhbGwgaW52YWxpZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBmaWxlIGFkZGVkIHRvIGZpbGUgaW5wdXQgKHNlYXJjaHZhbHVlKVxuICogQHJldHVybnMge1N0cmluZ30gc2FtZSBjaGFyYWN0ZXJzIGFzIHRoZSBuYW1lIHdpdGggaW52YWxpZCBjaGFycyByZW1vdmVkIChuZXd2YWx1ZSlcbiAqL1xuY29uc3QgbWFrZVNhZmVGb3JJRCA9IChuYW1lKSA9PiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCByZXBsYWNlTmFtZSk7XG5cbi8vIFRha2VzIGEgZ2VuZXJhdGVkIHNhZmUgSUQgYW5kIGNyZWF0ZXMgYSB1bmlxdWUgSUQuXG5jb25zdCBjcmVhdGVVbmlxdWVJRCA9IChuYW1lKSA9PlxuICBgJHtuYW1lfS0ke01hdGguZmxvb3IoRGF0ZS5ub3coKS50b1N0cmluZygpIC8gMTAwMCl9YDtcblxuLyoqXG4gKiBCdWlsZHMgZnVsbCBmaWxlIGlucHV0IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBvcmlnaW5hbCBmaWxlIGlucHV0IG9uIHBhZ2VcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHxIVE1MRWxlbWVudH0gLSBJbnN0cnVjdGlvbnMsIHRhcmdldCBhcmVhIGRpdlxuICovXG5jb25zdCBidWlsZEZpbGVJbnB1dCA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBhY2NlcHRzTXVsdGlwbGUgPSBmaWxlSW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKTtcbiAgY29uc3QgZmlsZUlucHV0UGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZHJvcFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRpc2FibGVkID0gZmlsZUlucHV0RWwuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gIGxldCBkZWZhdWx0QXJpYUxhYmVsO1xuXG4gIC8vIEFkZHMgY2xhc3MgbmFtZXMgYW5kIG90aGVyIGF0dHJpYnV0ZXNcbiAgZmlsZUlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShEUk9QWk9ORV9DTEFTUyk7XG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5hZGQoSU5QVVRfQ0xBU1MpO1xuICBmaWxlSW5wdXRQYXJlbnQuY2xhc3NMaXN0LmFkZChEUk9QWk9ORV9DTEFTUyk7XG4gIGJveC5jbGFzc0xpc3QuYWRkKEJPWF9DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKElOU1RSVUNUSU9OU19DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChUQVJHRVRfQ0xBU1MpO1xuICAvLyBFbmNvdXJhZ2Ugc2NyZWVucmVhZGVyIHRvIHJlYWQgb3V0IGFyaWEgY2hhbmdlcyBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdXBsb2FkIHN0YXR1cyBjaGFuZ2VcbiAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsIFwicG9saXRlXCIpO1xuXG4gIC8vIEFkZHMgY2hpbGQgZWxlbWVudHMgdG8gdGhlIERPTVxuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShkcm9wVGFyZ2V0LCBmaWxlSW5wdXRFbCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZpbGVJbnB1dFBhcmVudCwgZHJvcFRhcmdldCk7XG4gIGRyb3BUYXJnZXQuYXBwZW5kQ2hpbGQoZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRQYXJlbnQuYXBwZW5kQ2hpbGQoZHJvcFRhcmdldCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGluc3RydWN0aW9ucywgZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShib3gsIGZpbGVJbnB1dEVsKTtcblxuICAvLyBEaXNhYmxlZCBzdHlsaW5nXG4gIGlmIChkaXNhYmxlZCkge1xuICAgIGRpc2FibGUoZmlsZUlucHV0RWwpO1xuICB9XG5cbiAgLy8gU2V0cyBpbnN0cnVjdGlvbiB0ZXN0IGFuZCBhcmlhLWxhYmVsIGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IG11bHRpcGxlIGZpbGVzIGFyZSBhY2NlcHRlZFxuICBpZiAoYWNjZXB0c011bHRpcGxlKSB7XG4gICAgZGVmYXVsdEFyaWFMYWJlbCA9IFwiTm8gZmlsZXMgc2VsZWN0ZWRcIjtcbiAgICBpbnN0cnVjdGlvbnMuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgPHNwYW4gY2xhc3M9XCIke0RSQUdfVEVYVF9DTEFTU31cIj5EcmFnIGZpbGVzIGhlcmUgb3IgPC9zcGFuPjxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+Y2hvb3NlIGZyb20gZm9sZGVyPC9zcGFuPmA7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0QXJpYUxhYmVsID0gXCJObyBmaWxlIHNlbGVjdGVkXCI7XG4gICAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYDxzcGFuIGNsYXNzPVwiJHtEUkFHX1RFWFRfQ0xBU1N9XCI+RHJhZyBmaWxlIGhlcmUgb3IgPC9zcGFuPjxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+Y2hvb3NlIGZyb20gZm9sZGVyPC9zcGFuPmA7XG4gICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtYXJpYS1sYWJlbFwiLCBkZWZhdWx0QXJpYUxhYmVsKTtcbiAgfVxuXG4gIC8vIElFMTEgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgZHJvcCBmaWxlcyBvbiBmaWxlIGlucHV0cywgc28gd2UndmUgcmVtb3ZlZCB0ZXh0IHRoYXQgaW5kaWNhdGVzIHRoYXRcbiAgaWYgKFxuICAgIC9ydjoxMS4wL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fFxuICAgIC9FZGdlXFwvXFxkLi9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgKSB7XG4gICAgZmlsZUlucHV0UGFyZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0RSQUdfVEVYVF9DTEFTU31gKS5vdXRlckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0IH07XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgaW1hZ2UgcHJldmlld3MsIHdlIHdhbnQgdG8gc3RhcnQgd2l0aCBhIGNsZWFuIGxpc3QgZXZlcnkgdGltZSBmaWxlcyBhcmUgYWRkZWQgdG8gdGhlIGZpbGUgaW5wdXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRyb3BUYXJnZXQgLSB0YXJnZXQgYXJlYSBkaXYgdGhhdCBlbmNhc2VzIHRoZSBpbnB1dFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5zdHJ1Y3Rpb25zIC0gdGV4dCB0byBpbmZvcm0gdXNlcnMgdG8gZHJhZyBvciBzZWxlY3QgZmlsZXNcbiAqL1xuY29uc3QgcmVtb3ZlT2xkUHJldmlld3MgPSAoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zLCBpbnB1dEFyaWFMYWJlbCkgPT4ge1xuICBjb25zdCBmaWxlUHJldmlld3MgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke1BSRVZJRVdfQ0xBU1N9YCk7XG4gIGNvbnN0IGZpbGVJbnB1dEVsZW1lbnQgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuICBjb25zdCBjdXJyZW50UHJldmlld0hlYWRpbmcgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC4ke1BSRVZJRVdfSEVBRElOR19DTEFTU31gXG4gICk7XG4gIGNvbnN0IGN1cnJlbnRFcnJvck1lc3NhZ2UgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC4ke0FDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTU31gXG4gICk7XG5cbiAgLyoqXG4gICAqIGZpbmRzIHRoZSBwYXJlbnQgb2YgdGhlIHBhc3NlZCBub2RlIGFuZCByZW1vdmVzIHRoZSBjaGlsZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gICAqL1xuICBjb25zdCByZW1vdmVJbWFnZXMgPSAobm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgdGhlIGhlYWRpbmcgYWJvdmUgdGhlIHByZXZpZXdzXG4gIGlmIChjdXJyZW50UHJldmlld0hlYWRpbmcpIHtcbiAgICBjdXJyZW50UHJldmlld0hlYWRpbmcub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIC8vIFJlbW92ZSBleGlzdGluZyBlcnJvciBtZXNzYWdlc1xuICBpZiAoY3VycmVudEVycm9yTWVzc2FnZSkge1xuICAgIGN1cnJlbnRFcnJvck1lc3NhZ2Uub3V0ZXJIVE1MID0gXCJcIjtcbiAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgfVxuXG4gIC8vIEdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3MgaWYgdGhleSBleGlzdCwgc2hvdyBpbnN0cnVjdGlvbnNcbiAgaWYgKGZpbGVQcmV2aWV3cyAhPT0gbnVsbCkge1xuICAgIGlmIChpbnN0cnVjdGlvbnMpIHtcbiAgICAgIGluc3RydWN0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTUyk7XG4gICAgfVxuICAgIGZpbGVJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpbnB1dEFyaWFMYWJlbCk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmaWxlUHJldmlld3MsIHJlbW92ZUltYWdlcyk7XG4gIH1cbn07XG5cbi8qKlxuICogV2hlbiBuZXcgZmlsZXMgYXJlIGFwcGxpZWQgdG8gZmlsZSBpbnB1dCwgdGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgcHJldmlld3NcbiAqIGFuZCByZW1vdmVzIG9sZCBvbmVzLlxuICogQHBhcmFtIHtldmVudH0gZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBmaWxlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqL1xuXG5jb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBjb25zdCBmaWxlTmFtZXMgPSBlLnRhcmdldC5maWxlcztcbiAgY29uc3QgZmlsZVByZXZpZXdzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGlucHV0QXJpYUxhYmVsID0gZmlsZUlucHV0RWwuZGF0YXNldC5kZWZhdWx0QXJpYUxhYmVsO1xuICBjb25zdCBmaWxlU3RvcmUgPSBbXTtcblxuICAvLyBGaXJzdCwgZ2V0IHJpZCBvZiBleGlzdGluZyBwcmV2aWV3c1xuICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMsIGlucHV0QXJpYUxhYmVsKTtcblxuICAvLyBUaGVuLCBpdGVyYXRlIHRocm91Z2ggZmlsZXMgbGlzdCBhbmQ6XG4gIC8vIDEuIEFkZCBzZWxlY3RlZCBmaWxlIGxpc3QgbmFtZXMgdG8gYXJpYS1sYWJlbFxuICAvLyAyLiBDcmVhdGUgcHJldmlld3NcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZU5hbWVzW2ldLm5hbWU7XG5cbiAgICAvLyBQdXNoIHVwZGF0ZWQgZmlsZSBuYW1lcyBpbnRvIHRoZSBzdG9yZSBhcnJheVxuICAgIGZpbGVTdG9yZS5wdXNoKGZpbGVOYW1lKTtcblxuICAgIC8vIHJlYWQgb3V0IHRoZSBzdG9yZSBhcnJheSB2aWEgYXJpYS1sYWJlbCwgd29yZGluZyBvcHRpb25zIHZhcnkgYmFzZWQgb24gZmlsZSBjb3VudFxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgICBgWW91IGhhdmUgc2VsZWN0ZWQgdGhlIGZpbGU6ICR7ZmlsZU5hbWV9YFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGkgPj0gMSkge1xuICAgICAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFxuICAgICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgICAgYFlvdSBoYXZlIHNlbGVjdGVkICR7ZmlsZU5hbWVzLmxlbmd0aH0gZmlsZXM6ICR7ZmlsZVN0b3JlLmpvaW4oXCIsIFwiKX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFN0YXJ0cyB3aXRoIGEgbG9hZGluZyBpbWFnZSB3aGlsZSBwcmV2aWV3IGlzIGNyZWF0ZWRcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiBjcmVhdGVMb2FkaW5nSW1hZ2UoKSB7XG4gICAgICBjb25zdCBpbWFnZUlkID0gY3JlYXRlVW5pcXVlSUQobWFrZVNhZmVGb3JJRChmaWxlTmFtZSkpO1xuXG4gICAgICBpbnN0cnVjdGlvbnMuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYDxkaXYgY2xhc3M9XCIke1BSRVZJRVdfQ0xBU1N9XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGltZyBpZD1cIiR7aW1hZ2VJZH1cIiBzcmM9XCIke1NQQUNFUl9HSUZ9XCIgYWx0PVwiXCIgY2xhc3M9XCIke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfSAke0xPQURJTkdfQ0xBU1N9XCIvPiR7ZmlsZU5hbWV9XG4gICAgICAgIDxkaXY+YFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gTm90IGFsbCBmaWxlcyB3aWxsIGJlIGFibGUgdG8gZ2VuZXJhdGUgcHJldmlld3MuIEluIGNhc2UgdGhpcyBoYXBwZW5zLCB3ZSBwcm92aWRlIHNldmVyYWwgdHlwZXMgXCJnZW5lcmljIHByZXZpZXdzXCIgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uLlxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiBjcmVhdGVGaWxlUHJldmlldygpIHtcbiAgICAgIGNvbnN0IGltYWdlSWQgPSBjcmVhdGVVbmlxdWVJRChtYWtlU2FmZUZvcklEKGZpbGVOYW1lKSk7XG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbWFnZUlkKTtcbiAgICAgIGlmIChmaWxlTmFtZS5pbmRleE9mKFwiLnBkZlwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7UERGX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlsZU5hbWUuaW5kZXhPZihcIi5kb2NcIikgPiAwIHx8XG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIucGFnZXNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7V09SRF9QUkVWSUVXX0NMQVNTfVwiKWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGZpbGVOYW1lLmluZGV4T2YoXCIueGxzXCIpID4gMCB8fFxuICAgICAgICBmaWxlTmFtZS5pbmRleE9mKFwiLm51bWJlcnNcIikgPiAwXG4gICAgICApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7RVhDRUxfUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmluZGV4T2YoXCIubW92XCIpID4gMCB8fCBmaWxlTmFtZS5pbmRleE9mKFwiLm1wNFwiKSA+IDApIHtcbiAgICAgICAgcHJldmlld0ltYWdlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICBcIm9uZXJyb3JcIixcbiAgICAgICAgICBgdGhpcy5vbmVycm9yPW51bGw7dGhpcy5zcmM9XCIke1NQQUNFUl9HSUZ9XCI7IHRoaXMuY2xhc3NMaXN0LmFkZChcIiR7VklERU9fUFJFVklFV19DTEFTU31cIilgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2aWV3SW1hZ2Uuc2V0QXR0cmlidXRlKFxuICAgICAgICAgIFwib25lcnJvclwiLFxuICAgICAgICAgIGB0aGlzLm9uZXJyb3I9bnVsbDt0aGlzLnNyYz1cIiR7U1BBQ0VSX0dJRn1cIjsgdGhpcy5jbGFzc0xpc3QuYWRkKFwiJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1N9XCIpYFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmVzIGxvYWRlciBhbmQgZGlzcGxheXMgcHJldmlld1xuICAgICAgcHJldmlld0ltYWdlLmNsYXNzTGlzdC5yZW1vdmUoTE9BRElOR19DTEFTUyk7XG4gICAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVhZGVyLnJlc3VsdDtcbiAgICB9O1xuXG4gICAgaWYgKGZpbGVOYW1lc1tpXSkge1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZU5hbWVzW2ldKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGhlYWRpbmcgYWJvdmUgZmlsZSBwcmV2aWV3cywgcGx1cmFsaXplcyBpZiB0aGVyZSBhcmUgbXVsdGlwbGVcbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gYFNlbGVjdGVkIGZpbGUgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+Q2hhbmdlIGZpbGU8L3NwYW4+YDtcbiAgICB9IGVsc2UgaWYgKGkgPj0gMSkge1xuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZmlsZVByZXZpZXdzSGVhZGluZywgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICAgICAgaSArIDFcbiAgICAgIH0gZmlsZXMgc2VsZWN0ZWQgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+Q2hhbmdlIGZpbGVzPC9zcGFuPmA7XG4gICAgfVxuXG4gICAgLy8gSGlkZXMgbnVsbCBzdGF0ZSBjb250ZW50IGFuZCBzZXRzIHByZXZpZXcgaGVhZGluZyBjbGFzc1xuICAgIGlmIChmaWxlUHJldmlld3NIZWFkaW5nKSB7XG4gICAgICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1MpO1xuICAgICAgZmlsZVByZXZpZXdzSGVhZGluZy5jbGFzc0xpc3QuYWRkKFBSRVZJRVdfSEVBRElOR19DTEFTUyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFdoZW4gdXNpbmcgYW4gQWNjZXB0IGF0dHJpYnV0ZSwgaW52YWxpZCBmaWxlcyB3aWxsIGJlIGhpZGRlbiBmcm9tXG4gKiBmaWxlIGJyb3dzZXIsIGJ1dCB0aGV5IGNhbiBzdGlsbCBiZSBkcmFnZ2VkIHRvIHRoZSBpbnB1dC4gVGhpc1xuICogZnVuY3Rpb24gcHJldmVudHMgdGhlbSBmcm9tIGJlaW5nIGRyYWdnZWQgYW5kIHJlbW92ZXMgZXJyb3Igc3RhdGVzXG4gKiB3aGVuIGNvcnJlY3QgZmlsZXMgYXJlIGFkZGVkLlxuICogQHBhcmFtIHtldmVudH0gZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZmlsZUlucHV0RWwgLSBmaWxlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluc3RydWN0aW9ucyAtIHRleHQgdG8gaW5mb3JtIHVzZXJzIHRvIGRyYWcgb3Igc2VsZWN0IGZpbGVzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBkcm9wVGFyZ2V0IC0gdGFyZ2V0IGFyZWEgZGl2IHRoYXQgZW5jYXNlcyB0aGUgaW5wdXRcbiAqL1xuY29uc3QgcHJldmVudEludmFsaWRGaWxlcyA9IChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGFjY2VwdGVkRmlsZXNBdHRyID0gZmlsZUlucHV0RWwuZ2V0QXR0cmlidXRlKFwiYWNjZXB0XCIpO1xuICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcblxuICAvKipcbiAgICogV2UgY2FuIHByb2JhYmx5IG1vdmUgYXdheSBmcm9tIHRoaXMgb25jZSBJRTExIHN1cHBvcnQgc3RvcHMsIGFuZCByZXBsYWNlXG4gICAqIHdpdGggYSBzaW1wbGUgZXMgYC5pbmNsdWRlc2BcbiAgICogY2hlY2sgaWYgZWxlbWVudCBpcyBpbiBhcnJheVxuICAgKiBjaGVjayBpZiAxIG9yIG1vcmUgYWxwaGFiZXRzIGFyZSBpbiBzdHJpbmdcbiAgICogaWYgZWxlbWVudCBpcyBwcmVzZW50IHJldHVybiB0aGUgcG9zaXRpb24gdmFsdWUgYW5kIC0xIG90aGVyd2lzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb25zdCBpc0luY2x1ZGVkID0gKGZpbGUsIHZhbHVlKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgY29uc3QgcG9zID0gZmlsZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAocG9zID49IDApIHtcbiAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIC8vIFJ1bnMgaWYgb25seSBzcGVjaWZpYyBmaWxlcyBhcmUgYWNjZXB0ZWRcbiAgaWYgKGFjY2VwdGVkRmlsZXNBdHRyKSB7XG4gICAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXNBdHRyLnNwbGl0KFwiLFwiKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgLy8gSWYgbXVsdGlwbGUgZmlsZXMgYXJlIGRyYWdnZWQsIHRoaXMgaXRlcmF0ZXMgdGhyb3VnaCB0aGVtIGFuZCBsb29rIGZvciBhbnkgZmlsZXMgdGhhdCBhcmUgbm90IGFjY2VwdGVkLlxuICAgIGxldCBhbGxGaWxlc0FsbG93ZWQgPSB0cnVlO1xuICAgIGNvbnN0IHNjYW5uZWRGaWxlcyA9IGUudGFyZ2V0LmZpbGVzIHx8IGUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2Nhbm5lZEZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmaWxlID0gc2Nhbm5lZEZpbGVzW2ldO1xuICAgICAgaWYgKGFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFjY2VwdGVkRmlsZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBmaWxlVHlwZSA9IGFjY2VwdGVkRmlsZXNbal07XG4gICAgICAgICAgYWxsRmlsZXNBbGxvd2VkID1cbiAgICAgICAgICAgIGZpbGUubmFtZS5pbmRleE9mKGZpbGVUeXBlKSA+IDAgfHxcbiAgICAgICAgICAgIGlzSW5jbHVkZWQoZmlsZS50eXBlLCBmaWxlVHlwZS5yZXBsYWNlKC9cXCovZywgXCJcIikpO1xuICAgICAgICAgIGlmIChhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgICAgICAgIFRZUEVfSVNfVkFMSUQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSWYgZHJhZ2dlZCBmaWxlcyBhcmUgbm90IGFjY2VwdGVkLCB0aGlzIHJlbW92ZXMgdGhlbSBmcm9tIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYW5kIGNyZWF0ZXMgYW5kIGVycm9yIHN0YXRlXG4gICAgaWYgKCFhbGxGaWxlc0FsbG93ZWQpIHtcbiAgICAgIHJlbW92ZU9sZFByZXZpZXdzKGRyb3BUYXJnZXQsIGluc3RydWN0aW9ucyk7XG4gICAgICBmaWxlSW5wdXRFbC52YWx1ZSA9IFwiXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGVycm9yTWVzc2FnZSwgZmlsZUlucHV0RWwpO1xuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID1cbiAgICAgICAgZmlsZUlucHV0RWwuZGF0YXNldC5lcnJvcm1lc3NhZ2UgfHwgYFRoaXMgaXMgbm90IGEgdmFsaWQgZmlsZSB0eXBlLmA7XG4gICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1MpO1xuICAgICAgZHJvcFRhcmdldC5jbGFzc0xpc3QuYWRkKElOVkFMSURfRklMRV9DTEFTUyk7XG4gICAgICBUWVBFX0lTX1ZBTElEID0gZmFsc2U7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiAxLiBwYXNzZXMgdGhyb3VnaCBnYXRlIGZvciBwcmV2ZW50aW5nIGludmFsaWQgZmlsZXNcbiAqIDIuIGhhbmRsZXMgdXBkYXRlcyBpZiBmaWxlIGlzIHZhbGlkXG4gKiBAcGFyYW0ge2V2ZW50fSBldmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5zdHJ1Y3Rpb25zRWxcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICovXG5jb25zdCBoYW5kbGVVcGxvYWQgPSAoZXZlbnQsIGVsZW1lbnQsIGluc3RydWN0aW9uc0VsLCBkcm9wVGFyZ2V0RWwpID0+IHtcbiAgcHJldmVudEludmFsaWRGaWxlcyhldmVudCwgZWxlbWVudCwgaW5zdHJ1Y3Rpb25zRWwsIGRyb3BUYXJnZXRFbCk7XG4gIGlmIChUWVBFX0lTX1ZBTElEID09PSB0cnVlKSB7XG4gICAgaGFuZGxlQ2hhbmdlKGV2ZW50LCBlbGVtZW50LCBpbnN0cnVjdGlvbnNFbCwgZHJvcFRhcmdldEVsKTtcbiAgfVxufTtcblxuY29uc3QgZmlsZUlucHV0ID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoRFJPUFpPTkUsIHJvb3QpLmZvckVhY2goKGZpbGVJbnB1dEVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0IH0gPSBidWlsZEZpbGVJbnB1dChmaWxlSW5wdXRFbCk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJhZ292ZXJcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcigpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJhZ2xlYXZlXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKERSQUdfQ0xBU1MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcm9wXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgZmlsZUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNoYW5nZVwiLFxuICAgICAgICAgIChlKSA9PiBoYW5kbGVVcGxvYWQoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCksXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24ocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKElOUFVULCByb290KS5mb3JFYWNoKChmaWxlSW5wdXRFbCkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXRUb3BFbGVtZW50ID0gZmlsZUlucHV0RWwucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBmaWxlSW5wdXRUb3BFbGVtZW50LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZpbGVJbnB1dEVsLCBmaWxlSW5wdXRUb3BFbGVtZW50KTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbGVJbnB1dEVsLmNsYXNzTmFtZSA9IERST1BaT05FX0NMQVNTO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRGaWxlSW5wdXRDb250ZXh0LFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVJbnB1dDtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IFNDT1BFID0gYC4ke1BSRUZJWH0tZm9vdGVyLS1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyX19wcmltYXJ5LWxpbmtgO1xuY29uc3QgSElERV9NQVhfV0lEVEggPSA0ODA7XG5cbi8qKlxuICogRXhwYW5kcyBzZWxlY3RlZCBmb290ZXIgbWVudSBwYW5lbCwgd2hpbGUgY29sbGFwc2luZyBvdGhlcnNcbiAqL1xuZnVuY3Rpb24gc2hvd1BhbmVsKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCkge1xuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgY29uc3QgdGhpc0Zvb3RlciA9IHRoaXMuY2xvc2VzdChTQ09QRSk7XG5cbiAgICAvLyBDbG9zZSBhbGwgb3RoZXIgbWVudXNcbiAgICB0aGlzRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAhaXNPcGVuKTtcbiAgfVxufVxuXG4vKipcbiAqIFN3YXBzIHRoZSA8aDQ+IGVsZW1lbnQgZm9yIGEgPGJ1dHRvbj4gZWxlbWVudCAoYW5kIHZpY2UtdmVyc2EpIGFuZCBzZXRzIGlkXG4gKiBvZiBtZW51IGxpc3RcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzTW9iaWxlIC0gSWYgdGhlIGZvb3RlciBpcyBpbiBtb2JpbGUgY29uZmlndXJhdGlvblxuICovXG5mdW5jdGlvbiB0b2dnbGVIdG1sVGFnKGlzTW9iaWxlKSB7XG4gIGNvbnN0IGJpZ0Zvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0NPUEUpO1xuXG4gIGlmICghYmlnRm9vdGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcHJpbWFyeUxpbmtzID0gYmlnRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKTtcbiAgY29uc3QgbmV3RWxlbWVudFR5cGUgPSBpc01vYmlsZSA/IFwiYnV0dG9uXCIgOiBcImg0XCI7XG5cbiAgcHJpbWFyeUxpbmtzLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgY3VycmVudEVsZW1lbnRDbGFzc2VzID0gY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7XG5cbiAgICAvLyBDcmVhdGUgdGhlIG5ldyBlbGVtZW50XG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudFR5cGUpO1xuICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY3VycmVudEVsZW1lbnRDbGFzc2VzKTtcbiAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXG4gICAgICBgJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1saW5rLS1idXR0b25gLFxuICAgICAgaXNNb2JpbGVcbiAgICApO1xuICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50RWxlbWVudC50ZXh0Q29udGVudDtcblxuICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgY29uc3QgbWVudUlkID0gYCR7UFJFRklYfS1mb290ZXItbWVudS1saXN0LSR7TWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwMDAwMFxuICAgICAgKX1gO1xuXG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgbWVudUlkKTtcbiAgICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgY3VycmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIG1lbnVJZCk7XG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBuZXcgZWxlbWVudCBhbmQgZGVsZXRlIHRoZSBvbGRcbiAgICBjdXJyZW50RWxlbWVudC5hZnRlcihuZXdFbGVtZW50KTtcbiAgICBjdXJyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHJlc2l6ZSA9IChldmVudCkgPT4ge1xuICB0b2dnbGVIdG1sVGFnKGV2ZW50Lm1hdGNoZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtCVVRUT05dOiBzaG93UGFuZWwsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIC8vIGV4cG9ydCBmb3IgdXNlIGVsc2V3aGVyZVxuICAgIEhJREVfTUFYX1dJRFRILFxuXG4gICAgaW5pdCgpIHtcbiAgICAgIHRvZ2dsZUh0bWxUYWcod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCk7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEoXG4gICAgICAgIGAobWF4LXdpZHRoOiAke0hJREVfTUFYX1dJRFRIIC0gMC4xfXB4KWBcbiAgICAgICk7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKHJlc2l6ZSk7XG4gICAgfSxcblxuICAgIHRlYXJkb3duKCkge1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdC5yZW1vdmVMaXN0ZW5lcihyZXNpemUpO1xuICAgIH0sXG4gIH1cbik7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IEZvY3VzVHJhcCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9mb2N1cy10cmFwXCIpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZShcIi4uLy4uL3VzYS1hY2NvcmRpb24vc3JjL2luZGV4XCIpO1xuY29uc3QgU2Nyb2xsQmFyV2lkdGggPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoXCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQk9EWSA9IFwiYm9keVwiO1xuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH0taGVhZGVyYDtcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfQ09OVEFJTkVSID0gYC4ke1BSRUZJWH0tbmF2LWNvbnRhaW5lcmA7XG5jb25zdCBOQVZfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LW5hdl9fcHJpbWFyeWA7XG5jb25zdCBOQVZfUFJJTUFSWV9JVEVNID0gYC4ke1BSRUZJWH0tbmF2X19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTkFWX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1uYXZfX2xpbmtgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSA9IGBkYXRhLW5hdi1oaWRkZW5gO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdl9fY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBUT0dHTEVTID0gW05BViwgT1ZFUkxBWV0uam9pbihcIiwgXCIpO1xuY29uc3QgTk9OX05BVl9FTEVNRU5UUyA9IGBib2R5ICo6bm90KCR7SEVBREVSfSwgJHtOQVZfQ09OVEFJTkVSfSwgJHtOQVZ9LCAke05BVn0gKik6bm90KFthcmlhLWhpZGRlbl0pYDtcbmNvbnN0IE5PTl9OQVZfSElEREVOID0gYFske05PTl9OQVZfSElEREVOX0FUVFJJQlVURX1dYDtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gXCJ1c2EtanMtbW9iaWxlLW5hdi0tYWN0aXZlXCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5cbmxldCBuYXZpZ2F0aW9uO1xubGV0IG5hdkFjdGl2ZTtcbmxldCBub25OYXZFbGVtZW50cztcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuY29uc3QgU0NST0xMQkFSX1dJRFRIID0gU2Nyb2xsQmFyV2lkdGgoKTtcbmNvbnN0IElOSVRJQUxfUEFERElORyA9IHdpbmRvd1xuICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG5jb25zdCBURU1QT1JBUllfUEFERElORyA9IGAke1xuICBwYXJzZUludChJTklUSUFMX1BBRERJTkcucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApICtcbiAgcGFyc2VJbnQoU0NST0xMQkFSX1dJRFRILnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKVxufXB4YDtcblxuY29uc3QgaGlkZU5vbk5hdkl0ZW1zID0gKCkgPT4ge1xuICBjb25zdCBoZWFkZXJQYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0hFQURFUn1gKS5wYXJlbnROb2RlO1xuICBub25OYXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX05BVl9FTEVNRU5UUyk7XG5cbiAgbm9uTmF2RWxlbWVudHMuZm9yRWFjaCgobm9uTmF2RWxlbWVudCkgPT4ge1xuICAgIGlmKG5vbk5hdkVsZW1lbnQgIT09IGhlYWRlclBhcmVudCkge1xuICAgICAgbm9uTmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgICAgIG5vbk5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSwgXCJcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHNob3dOb25OYXZJdGVtcyA9ICgpID0+IHtcbiAgbm9uTmF2RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9OQVZfSElEREVOKTtcblxuICBpZiAoIW5vbk5hdkVsZW1lbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGFyaWEtaGlkZGVuIGZyb20gbm9uLWhlYWRlciBlbGVtZW50c1xuICBub25OYXZFbGVtZW50cy5mb3JFYWNoKChub25OYXZFbGVtZW50KSA9PiB7XG4gICAgbm9uTmF2RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcbiAgICBub25OYXZFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShOT05fTkFWX0hJRERFTl9BVFRSSUJVVEUpO1xuICB9KTtcbn07XG5cbi8vIFRvZ2dsZSBhbGwgbm9uLWhlYWRlciBlbGVtZW50cyAjMzUyNy5cbmNvbnN0IHRvZ2dsZU5vbk5hdkl0ZW1zID0gKGFjdGl2ZSkgPT4ge1xuICBpZiAoYWN0aXZlKSB7XG4gICAgaGlkZU5vbk5hdkl0ZW1zKCk7XG4gIH0gZWxzZSB7XG4gICAgc2hvd05vbk5hdkl0ZW1zKCk7XG4gIH1cbn07XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IChhY3RpdmUpID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9IHR5cGVvZiBhY3RpdmUgPT09IFwiYm9vbGVhblwiID8gYWN0aXZlIDogIWlzQWN0aXZlKCk7XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG5cbiAgc2VsZWN0KFRPR0dMRVMpLmZvckVhY2goKGVsKSA9PlxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSlcbiAgKTtcblxuICBuYXZpZ2F0aW9uLmZvY3VzVHJhcC51cGRhdGUoc2FmZUFjdGl2ZSk7XG5cbiAgY29uc3QgY2xvc2VCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG5cbiAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPVxuICAgIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID09PSBURU1QT1JBUllfUEFERElOR1xuICAgICAgPyBJTklUSUFMX1BBRERJTkdcbiAgICAgIDogVEVNUE9SQVJZX1BBRERJTkc7XG5cbiAgdG9nZ2xlTm9uTmF2SXRlbXMoc2FmZUFjdGl2ZSk7XG5cbiAgaWYgKHNhZmVBY3RpdmUgJiYgY2xvc2VCdXR0b24pIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBhY3RpdmF0ZWQuIEZvY3VzIG9uIHRoZSBjbG9zZSBidXR0b24sIHdoaWNoIGlzXG4gICAgLy8ganVzdCBiZWZvcmUgYWxsIHRoZSBuYXYgZWxlbWVudHMgaW4gdGhlIHRhYiBvcmRlci5cbiAgICBjbG9zZUJ1dHRvbi5mb2N1cygpO1xuICB9IGVsc2UgaWYgKFxuICAgICFzYWZlQWN0aXZlICYmXG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gY2xvc2VCdXR0b24gJiZcbiAgICBtZW51QnV0dG9uXG4gICkge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGRlYWN0aXZhdGVkLCBhbmQgZm9jdXMgd2FzIG9uIHRoZSBjbG9zZVxuICAgIC8vIGJ1dHRvbiwgd2hpY2ggaXMgbm8gbG9uZ2VyIHZpc2libGUuIFdlIGRvbid0IHdhbnQgdGhlIGZvY3VzIHRvXG4gICAgLy8gZGlzYXBwZWFyIGludG8gdGhlIHZvaWQsIHNvIGZvY3VzIG9uIHRoZSBtZW51IGJ1dHRvbiBpZiBpdCdzXG4gICAgLy8gdmlzaWJsZSAodGhpcyBtYXkgaGF2ZSBiZWVuIHdoYXQgdGhlIHVzZXIgd2FzIGp1c3QgZm9jdXNlZCBvbixcbiAgICAvLyBpZiB0aGV5IHRyaWdnZXJlZCB0aGUgbW9iaWxlIG5hdiBieSBtaXN0YWtlKS5cbiAgICBtZW51QnV0dG9uLmZvY3VzKCk7XG4gIH1cblxuICByZXR1cm4gc2FmZUFjdGl2ZTtcbn07XG5cbmNvbnN0IHJlc2l6ZSA9ICgpID0+IHtcbiAgY29uc3QgY2xvc2VyID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG5cbiAgaWYgKGlzQWN0aXZlKCkgJiYgY2xvc2VyICYmIGNsb3Nlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCA9PT0gMCkge1xuICAgIC8vIFdoZW4gdGhlIG1vYmlsZSBuYXYgaXMgYWN0aXZlLCBhbmQgdGhlIGNsb3NlIGJveCBpc24ndCB2aXNpYmxlLFxuICAgIC8vIHdlIGtub3cgdGhlIHVzZXIncyB2aWV3cG9ydCBoYXMgYmVlbiByZXNpemVkIHRvIGJlIGxhcmdlci5cbiAgICAvLyBMZXQncyBtYWtlIHRoZSBwYWdlIHN0YXRlIGNvbnNpc3RlbnQgYnkgZGVhY3RpdmF0aW5nIHRoZSBtb2JpbGUgbmF2LlxuICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwoY2xvc2VyLCBmYWxzZSk7XG4gIH1cbn07XG5cbmNvbnN0IG9uTWVudUNsb3NlID0gKCkgPT4gbmF2aWdhdGlvbi50b2dnbGVOYXYuY2FsbChuYXZpZ2F0aW9uLCBmYWxzZSk7XG5cbmNvbnN0IGhpZGVBY3RpdmVOYXZEcm9wZG93biA9ICgpID0+IHtcbiAgaWYgKCFuYXZBY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGUobmF2QWN0aXZlLCBmYWxzZSk7XG4gIG5hdkFjdGl2ZSA9IG51bGw7XG59O1xuXG5jb25zdCBmb2N1c05hdkJ1dHRvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwYXJlbnROYXZJdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTkFWX1BSSU1BUllfSVRFTSk7XG5cbiAgLy8gT25seSBzaGlmdCBmb2N1cyBpZiB3aXRoaW4gZHJvcGRvd25cbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhOQVZfQ09OVFJPTCkpIHtcbiAgICBwYXJlbnROYXZJdGVtLnF1ZXJ5U2VsZWN0b3IoTkFWX0NPTlRST0wpLmZvY3VzKCk7XG4gIH1cbn07XG5cbmNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudCkgPT4ge1xuICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgZm9jdXNOYXZCdXR0b24oZXZlbnQpO1xufTtcblxubmF2aWdhdGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW05BVl9DT05UUk9MXSgpIHtcbiAgICAgICAgLy8gSWYgYW5vdGhlciBuYXYgaXMgb3BlbiwgY2xvc2UgaXRcbiAgICAgICAgaWYgKG5hdkFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IGNsaWNrZWQgbmF2IGxpbmsgZWxlbWVudCwgc28gd2VcbiAgICAgICAgLy8gY2FuIGhpZGUgdGhlIGRyb3Bkb3duIGlmIGFub3RoZXIgZWxlbWVudCBvbiB0aGUgcGFnZSBpcyBjbGlja2VkXG4gICAgICAgIGlmICghbmF2QWN0aXZlKSB7XG4gICAgICAgICAgbmF2QWN0aXZlID0gdGhpcztcbiAgICAgICAgICB0b2dnbGUobmF2QWN0aXZlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHRoaXMgc28gdGhlIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZG9lc24ndCBmaXJlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBbQk9EWV06IGhpZGVBY3RpdmVOYXZEcm9wZG93bixcbiAgICAgIFtPUEVORVJTXTogdG9nZ2xlTmF2LFxuICAgICAgW0NMT1NFUlNdOiB0b2dnbGVOYXYsXG4gICAgICBbTkFWX0xJTktTXSgpIHtcbiAgICAgICAgLy8gQSBuYXZpZ2F0aW9uIGxpbmsgaGFzIGJlZW4gY2xpY2tlZCEgV2Ugd2FudCB0byBjb2xsYXBzZSBhbnlcbiAgICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgICAgLy8gY2FuIGZvY3VzIG9uIHdoYXRldmVyIHRoZXkndmUganVzdCBzZWxlY3RlZC5cblxuICAgICAgICAvLyBTb21lIG5hdmlnYXRpb24gbGlua3MgYXJlIGluc2lkZSBhY2NvcmRpb25zOyB3aGVuIHRoZXkncmVcbiAgICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG5cbiAgICAgICAgaWYgKGFjYykge1xuICAgICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaCgoYnRuKSA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW05BVl9QUklNQVJZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW05BVl9QUklNQVJZXShldmVudCkge1xuICAgICAgICBjb25zdCBuYXYgPSBldmVudC50YXJnZXQuY2xvc2VzdChOQVZfUFJJTUFSWSk7XG5cbiAgICAgICAgaWYgKCFuYXYuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5tYXRjaGVzKE5BVikgPyByb290IDogcm9vdC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmVzaXplKCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSk7XG4gICAgICBuYXZBY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICAgIGZvY3VzVHJhcDogbnVsbCxcbiAgICB0b2dnbGVOYXYsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdGlvbjtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgQ1VSUkVOVF9DTEFTUyA9IGAke1BSRUZJWH0tY3VycmVudGA7XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9URVhUID0gXCJPbiB0aGlzIHBhZ2VcIjtcbmNvbnN0IElOX1BBR0VfTkFWX1RJVExFX0hFQURJTkdfTEVWRUwgPSBcImg0XCI7XG5jb25zdCBJTl9QQUdFX05BVl9TQ1JPTExfT0ZGU0VUID0gMDtcbmNvbnN0IElOX1BBR0VfTkFWX1JPT1RfTUFSR0lOID0gXCIwcHggMHB4IDBweCAwcHhcIjtcbmNvbnN0IElOX1BBR0VfTkFWX1RIUkVTSE9MRCA9IFwiMVwiO1xuY29uc3QgSU5fUEFHRV9OQVZfQ0xBU1MgPSBgJHtQUkVGSVh9LWluLXBhZ2UtbmF2YDtcbmNvbnN0IElOX1BBR0VfTkFWX0FOQ0hPUl9DTEFTUyA9IGAke1BSRUZJWH0tYW5jaG9yYDtcbmNvbnN0IElOX1BBR0VfTkFWX05BVl9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9fbmF2YDtcbmNvbnN0IElOX1BBR0VfTkFWX0xJU1RfQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX2xpc3RgO1xuY29uc3QgSU5fUEFHRV9OQVZfSVRFTV9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9faXRlbWA7XG5jb25zdCBJTl9QQUdFX05BVl9MSU5LX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19saW5rYDtcbmNvbnN0IElOX1BBR0VfTkFWX1RJVExFX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19oZWFkaW5nYDtcbmNvbnN0IFNVQl9JVEVNX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfSVRFTV9DTEFTU30tLXN1Yi1pdGVtYDtcbmNvbnN0IE1BSU5fRUxFTUVOVCA9IFwibWFpblwiO1xuXG4vKipcbiAqIFNldCB0aGUgYWN0aXZlIGxpbmsgc3RhdGUgZm9yIHRoZSBjdXJyZW50bHkgb2JzZXJ2ZWQgc2VjdGlvblxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBpbi1wYWdlIG5hdiBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2V0QWN0aXZlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gKTtcbiAgZWwubWFwKChpKSA9PiB7XG4gICAgaWYgKGkuaXNJbnRlcnNlY3RpbmcgPT09IHRydWUgJiYgaS5pbnRlcnNlY3Rpb25SYXRpbyA+PSAxKSB7XG4gICAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoQ1VSUkVOVF9DTEFTUykpO1xuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYGFbaHJlZj1cIiMke2kudGFyZ2V0LmlkfVwiXWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKENVUlJFTlRfQ0xBU1MpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIG5vZGUgbGlzdCBvZiBzZWN0aW9uIGhlYWRpbmdzXG4gKlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXNcbiAqL1xuY29uc3QgZ2V0U2VjdGlvbkhlYWRpbmdzID0gKCkgPT4ge1xuICBjb25zdCBzZWN0aW9uSGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIGAke01BSU5fRUxFTUVOVH0gaDIsICR7TUFJTl9FTEVNRU5UfSBoM2BcbiAgKTtcbiAgcmV0dXJuIHNlY3Rpb25IZWFkaW5ncztcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgbm9kZSBsaXN0IG9mIHNlY3Rpb24gYW5jaG9yIHRhZ3NcbiAqXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2Rlc1xuICovXG5jb25zdCBnZXRTZWN0aW9uQW5jaG9ycyA9ICgpID0+IHtcbiAgY29uc3Qgc2VjdGlvbkFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIGAuJHtJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1N9YFxuICApO1xuICByZXR1cm4gc2VjdGlvbkFuY2hvcnM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHNlY3Rpb24gaWQvYW5jaG9yIGhhc2ggd2l0aG91dCB0aGUgbnVtYmVyIHNpZ25cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IC0gSWQgdmFsdWUgd2l0aCB0aGUgbnVtYmVyIHNpZ24gcmVtb3ZlZFxuICovXG5jb25zdCBnZXRTZWN0aW9uSWQgPSAodmFsdWUpID0+IHtcbiAgbGV0IGlkO1xuXG4gIC8vIENoZWNrIGlmIHZhbHVlIGlzIGFuIGV2ZW50IG9yIGVsZW1lbnQgYW5kIGdldCB0aGUgY2xlYW5lZCB1cCBpZFxuICBpZiAodmFsdWUgJiYgdmFsdWUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBpZCA9IHZhbHVlLmdldEF0dHJpYnV0ZShcImhyZWZcIikucmVwbGFjZShcIiNcIiwgXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgaWQgPSB2YWx1ZS50YXJnZXQuaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiBpZDtcbn07XG5cbi8qKlxuICogU2Nyb2xsIHNtb290aGx5IHRvIGEgc2VjdGlvbiBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSAtIElkIHZhbHVlIHdpdGggdGhlIG51bWJlciBzaWduIHJlbW92ZWRcbiAqL1xuY29uc3QgaGFuZGxlU2Nyb2xsVG9TZWN0aW9uID0gKGVsKSA9PiB7XG4gIGNvbnN0IGluUGFnZU5hdkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7SU5fUEFHRV9OQVZfQ0xBU1N9YCk7XG4gIGNvbnN0IGluUGFnZU5hdlNjcm9sbE9mZnNldCA9XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC5zY3JvbGxPZmZzZXQgfHwgSU5fUEFHRV9OQVZfU0NST0xMX09GRlNFVDtcblxuICB3aW5kb3cuc2Nyb2xsKHtcbiAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcbiAgICB0b3A6IGVsLm9mZnNldFRvcCAtIGluUGFnZU5hdlNjcm9sbE9mZnNldCxcbiAgICBibG9jazogXCJzdGFydFwiLFxuICB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBpbi1wYWdlIG5hdmlnYXRpb24gY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5QYWdlTmF2RWwgVGhlIGluLXBhZ2UgbmF2IGVsZW1lbnRcbiAqL1xuY29uc3QgY3JlYXRlSW5QYWdlTmF2ID0gKGluUGFnZU5hdkVsKSA9PiB7XG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlVGV4dCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC50aXRsZVRleHQgfHwgSU5fUEFHRV9OQVZfVElUTEVfVEVYVFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2VGl0bGVIZWFkaW5nTGV2ZWwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGl0bGVIZWFkaW5nTGV2ZWwgfHwgSU5fUEFHRV9OQVZfVElUTEVfSEVBRElOR19MRVZFTFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2Um9vdE1hcmdpbiA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC5yb290TWFyZ2luIHx8IElOX1BBR0VfTkFWX1JPT1RfTUFSR0lOXG4gIH1gO1xuICBjb25zdCBpblBhZ2VOYXZUaHJlc2hvbGQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGhyZXNob2xkIHx8IElOX1BBR0VfTkFWX1RIUkVTSE9MRFxuICB9YDtcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgcm9vdE1hcmdpbjogaW5QYWdlTmF2Um9vdE1hcmdpbixcbiAgICB0aHJlc2hvbGQ6IFtpblBhZ2VOYXZUaHJlc2hvbGRdLFxuICB9O1xuXG4gIGNvbnN0IHNlY3Rpb25IZWFkaW5ncyA9IGdldFNlY3Rpb25IZWFkaW5ncygpO1xuICBjb25zdCBpblBhZ2VOYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICBpblBhZ2VOYXYuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpblBhZ2VOYXZUaXRsZVRleHQpO1xuICBpblBhZ2VOYXYuY2xhc3NMaXN0LmFkZChJTl9QQUdFX05BVl9OQVZfQ0xBU1MpO1xuXG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpblBhZ2VOYXZUaXRsZUhlYWRpbmdMZXZlbCk7XG4gIGluUGFnZU5hdlRpdGxlLmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfVElUTEVfQ0xBU1MpO1xuICBpblBhZ2VOYXZUaXRsZS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIGluUGFnZU5hdlRpdGxlLnRleHRDb250ZW50ID0gaW5QYWdlTmF2VGl0bGVUZXh0O1xuICBpblBhZ2VOYXYuYXBwZW5kQ2hpbGQoaW5QYWdlTmF2VGl0bGUpO1xuXG4gIGNvbnN0IGluUGFnZU5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIGluUGFnZU5hdkxpc3QuY2xhc3NMaXN0LmFkZChJTl9QQUdFX05BVl9MSVNUX0NMQVNTKTtcbiAgaW5QYWdlTmF2LmFwcGVuZENoaWxkKGluUGFnZU5hdkxpc3QpO1xuXG4gIHNlY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgYW5jaG9yVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgdGV4dENvbnRlbnRPZkxpbmsgPSBlbC50ZXh0Q29udGVudDtcbiAgICBjb25zdCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKElOX1BBR0VfTkFWX0lURU1fQ0xBU1MpO1xuICAgIGlmICh0YWcgPT09IFwiaDNcIikge1xuICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChTVUJfSVRFTV9DTEFTUyk7XG4gICAgfVxuXG4gICAgbmF2TGlua3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgI3NlY3Rpb25fJHtpfWApO1xuICAgIG5hdkxpbmtzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIElOX1BBR0VfTkFWX0xJTktfQ0xBU1MpO1xuICAgIG5hdkxpbmtzLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnRPZkxpbms7XG5cbiAgICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHNlY3Rpb25fJHtpfWApO1xuICAgIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1MpO1xuICAgIGVsLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgYW5jaG9yVGFnKTtcblxuICAgIGluUGFnZU5hdkxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKG5hdkxpbmtzKTtcbiAgfSk7XG5cbiAgaW5QYWdlTmF2RWwuYXBwZW5kQ2hpbGQoaW5QYWdlTmF2KTtcblxuICBjb25zdCBhbmNob3JUYWdzID0gZ2V0U2VjdGlvbkFuY2hvcnMoKTtcbiAgY29uc3Qgb2JzZXJ2ZVNlY3Rpb25zID0gbmV3IHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcihzZXRBY3RpdmUsIG9wdGlvbnMpO1xuXG4gIGFuY2hvclRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgb2JzZXJ2ZVNlY3Rpb25zLm9ic2VydmUodGFnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGxpbmtcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUNsaWNrRnJvbUxpbmsgPSAoZWwpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvU2Nyb2xsVG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsLmhhc2gpO1xuICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24oZWxlbWVudFRvU2Nyb2xsVG8pO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVudGVyIGV2ZW50IGZyb20gYSBsaW5rIHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGluLXBhZ2UgbmF2IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21MaW5rID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IGlkID0gZ2V0U2VjdGlvbklkKGV2ZW50KTtcbiAgY29uc3QgdGFyZ2V0QW5jaG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBjb25zdCB0YXJnZXQgPSB0YXJnZXRBbmNob3IucGFyZW50RWxlbWVudDtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIDApO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJibHVyXCIsXG4gICAgICBvbmNlKCgpID0+IHtcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIC0xKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxuICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24odGFyZ2V0KTtcbn07XG5cbmNvbnN0IGluUGFnZU5hdmlnYXRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBoYW5kbGVDbGlja0Zyb21MaW5rKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXToga2V5bWFwKHtcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpbmssXG4gICAgICB9KSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoYC4ke0lOX1BBR0VfTkFWX0NMQVNTfWAsIHJvb3QpLmZvckVhY2goKGluUGFnZU5hdkVsKSA9PiB7XG4gICAgICAgIGNyZWF0ZUluUGFnZU5hdihpblBhZ2VOYXZFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluUGFnZU5hdmlnYXRpb247XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IE1BU0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tbWFza2VkYDtcbmNvbnN0IE1BU0tFRCA9IGAuJHtNQVNLRURfQ0xBU1N9YDtcbmNvbnN0IE1BU0sgPSBgJHtQUkVGSVh9LWlucHV0LW1hc2tgO1xuY29uc3QgTUFTS19DT05URU5UID0gYCR7TUFTS30tLWNvbnRlbnRgO1xuY29uc3QgUExBQ0VIT0xERVIgPSBcInBsYWNlaG9sZGVyXCI7XG5jb25zdCBDT05URVhUID0gXCJmb3JtXCI7XG5cbi8vIFVzZXIgZGVmaW5lZCBWYWx1ZXNcbmNvbnN0IG1hc2tlZE51bWJlciA9IFwiXyNkRG1NeVk5XCI7XG5jb25zdCBtYXNrZWRMZXR0ZXIgPSBcIkFcIjtcblxuLy8gcmVwbGFjZXMgZWFjaCBtYXNrZWQgaW5wdXQgd2l0aCBhIHNoZWxsIGNvbnRhaW5pbmcgdGhlIGlucHV0IGFuZCBpdCdzIG1hc2suXG5jb25zdCBjcmVhdGVNYXNrZWRJbnB1dFNoZWxsID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gaW5wdXQuZ2V0QXR0cmlidXRlKGAke1BMQUNFSE9MREVSfWApO1xuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgcGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyKTtcbiAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoYCR7UExBQ0VIT0xERVJ9YCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc2hlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc2hlbGwuY2xhc3NMaXN0LmFkZChNQVNLKTtcbiAgc2hlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1tYXNrXCIsIHBsYWNlaG9sZGVyKTtcblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChNQVNLX0NPTlRFTlQpO1xuICBjb250ZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgY29udGVudC5pZCA9IGAke2lucHV0LmlkfU1hc2tgO1xuICBjb250ZW50LnRleHRDb250ZW50ID0gcGxhY2Vob2xkZXI7XG5cbiAgc2hlbGwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIGlucHV0LmNsb3Nlc3QoQ09OVEVYVCkuaW5zZXJ0QmVmb3JlKHNoZWxsLCBpbnB1dCk7XG4gIHNoZWxsLmFwcGVuZENoaWxkKGlucHV0KTtcbn07XG5cbmNvbnN0IHNldFZhbHVlT2ZNYXNrID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgdmFsdWUgfSA9IGVsO1xuICBjb25zdCBwbGFjZWhvbGRlclZhbCA9IGAke2VsLmRhdGFzZXQucGxhY2Vob2xkZXIuc3Vic3RyKHZhbHVlLmxlbmd0aCl9YDtcblxuICBjb25zdCB0aGVJRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgdGhlSUVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIHJldHVybiBbdGhlSUVsLCBwbGFjZWhvbGRlclZhbF07XG59O1xuXG5jb25zdCBzdHJpcHBlZFZhbHVlID0gKGlzQ2hhcnNldFByZXNlbnQsIHZhbHVlKSA9PlxuICBpc0NoYXJzZXRQcmVzZW50ID8gdmFsdWUucmVwbGFjZSgvXFxXL2csIFwiXCIpIDogdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuXG5jb25zdCBpc0ludGVnZXIgPSAodmFsdWUpID0+ICFOdW1iZXIuaXNOYU4ocGFyc2VJbnQodmFsdWUsIDEwKSk7XG5cbmNvbnN0IGlzTGV0dGVyID0gKHZhbHVlKSA9PiAodmFsdWUgPyB2YWx1ZS5tYXRjaCgvW0EtWl0vaSkgOiBmYWxzZSk7XG5cbmNvbnN0IGhhbmRsZUN1cnJlbnRWYWx1ZSA9IChlbCkgPT4ge1xuICBjb25zdCBpc0NoYXJzZXRQcmVzZW50ID0gZWwuZGF0YXNldC5jaGFyc2V0O1xuICBjb25zdCBwbGFjZWhvbGRlciA9IGlzQ2hhcnNldFByZXNlbnQgfHwgZWwuZGF0YXNldC5wbGFjZWhvbGRlcjtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gZWw7XG4gIGNvbnN0IGxlbiA9IHBsYWNlaG9sZGVyLmxlbmd0aDtcbiAgbGV0IG5ld1ZhbHVlID0gXCJcIjtcbiAgbGV0IGk7XG4gIGxldCBjaGFySW5kZXg7XG5cbiAgY29uc3Qgc3RyaXBwZWRWYWwgPSBzdHJpcHBlZFZhbHVlKGlzQ2hhcnNldFByZXNlbnQsIHZhbHVlKTtcblxuICBmb3IgKGkgPSAwLCBjaGFySW5kZXggPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBjb25zdCBpc0ludCA9IGlzSW50ZWdlcihzdHJpcHBlZFZhbFtjaGFySW5kZXhdKTtcbiAgICBjb25zdCBpc0xldCA9IGlzTGV0dGVyKHN0cmlwcGVkVmFsW2NoYXJJbmRleF0pO1xuICAgIGNvbnN0IG1hdGNoZXNOdW1iZXIgPSBtYXNrZWROdW1iZXIuaW5kZXhPZihwbGFjZWhvbGRlcltpXSkgPj0gMDtcbiAgICBjb25zdCBtYXRjaGVzTGV0dGVyID0gbWFza2VkTGV0dGVyLmluZGV4T2YocGxhY2Vob2xkZXJbaV0pID49IDA7XG5cbiAgICBpZiAoXG4gICAgICAobWF0Y2hlc051bWJlciAmJiBpc0ludCkgfHxcbiAgICAgIChpc0NoYXJzZXRQcmVzZW50ICYmIG1hdGNoZXNMZXR0ZXIgJiYgaXNMZXQpXG4gICAgKSB7XG4gICAgICBuZXdWYWx1ZSArPSBzdHJpcHBlZFZhbFtjaGFySW5kZXhdO1xuICAgICAgY2hhckluZGV4ICs9IDE7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICghaXNDaGFyc2V0UHJlc2VudCAmJiAhaXNJbnQgJiYgbWF0Y2hlc051bWJlcikgfHxcbiAgICAgIChpc0NoYXJzZXRQcmVzZW50ICYmXG4gICAgICAgICgobWF0Y2hlc0xldHRlciAmJiAhaXNMZXQpIHx8IChtYXRjaGVzTnVtYmVyICYmICFpc0ludCkpKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSArPSBwbGFjZWhvbGRlcltpXTtcbiAgICB9XG4gICAgLy8gYnJlYWsgaWYgbm8gY2hhcmFjdGVycyBsZWZ0IGFuZCB0aGUgcGF0dGVybiBpcyBub24tc3BlY2lhbCBjaGFyYWN0ZXJcbiAgICBpZiAoc3RyaXBwZWRWYWxbY2hhckluZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3VmFsdWU7XG59O1xuXG5jb25zdCBoYW5kbGVWYWx1ZUNoYW5nZSA9IChlbCkgPT4ge1xuICBjb25zdCBpbnB1dEVsID0gZWw7XG4gIGNvbnN0IGlkID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgaW5wdXRFbC52YWx1ZSA9IGhhbmRsZUN1cnJlbnRWYWx1ZShpbnB1dEVsKTtcblxuICBjb25zdCBtYXNrVmFsID0gc2V0VmFsdWVPZk1hc2soZWwpO1xuICBjb25zdCBtYXNrRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpZH1NYXNrYCk7XG4gIG1hc2tFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIG1hc2tFbC5yZXBsYWNlQ2hpbGRyZW4obWFza1ZhbFswXSwgbWFza1ZhbFsxXSk7XG59O1xuXG5jb25zdCBpbnB1dE1hc2tFdmVudHMgPSB7XG4gIGtleXVwOiB7XG4gICAgW01BU0tFRF0oKSB7XG4gICAgICBoYW5kbGVWYWx1ZUNoYW5nZSh0aGlzKTtcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgaW5wdXRNYXNrID0gYmVoYXZpb3IoaW5wdXRNYXNrRXZlbnRzLCB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhNQVNLRUQsIHJvb3QpLmZvckVhY2goKG1hc2tlZElucHV0KSA9PiB7XG4gICAgICBjcmVhdGVNYXNrZWRJbnB1dFNoZWxsKG1hc2tlZElucHV0KTtcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0TWFzaztcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuXG5jb25zdCBDT05UQUlORVIgPSBgLiR7UFJFRklYfS1pbnB1dC1ncm91cGA7XG5jb25zdCBJTlBVVCA9IGAke0NPTlRBSU5FUn0gLiR7UFJFRklYfS1pbnB1dGA7XG5jb25zdCBERUNPUkFUSU9OID0gYCR7Q09OVEFJTkVSfSAuJHtQUkVGSVh9LWlucHV0LXByZWZpeCwgJHtDT05UQUlORVJ9IC4ke1BSRUZJWH0taW5wdXQtc3VmZml4YDtcbmNvbnN0IEZPQ1VTX0NMQVNTID0gXCJpcy1mb2N1c2VkXCI7XG5cbmZ1bmN0aW9uIHNldEZvY3VzKGVsKSB7XG4gIGVsLmNsb3Nlc3QoQ09OVEFJTkVSKS5xdWVyeVNlbGVjdG9yKGAuJHtQUkVGSVh9LWlucHV0YCkuZm9jdXMoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gIHRoaXMuY2xvc2VzdChDT05UQUlORVIpLmNsYXNzTGlzdC5hZGQoRk9DVVNfQ0xBU1MpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICB0aGlzLmNsb3Nlc3QoQ09OVEFJTkVSKS5jbGFzc0xpc3QucmVtb3ZlKEZPQ1VTX0NMQVNTKTtcbn1cblxuY29uc3QgaW5wdXRQcmVmaXhTdWZmaXggPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtERUNPUkFUSU9OXSgpIHtcbiAgICAgICAgc2V0Rm9jdXModGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChJTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cywgZmFsc2UpO1xuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIsIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRQcmVmaXhTdWZmaXg7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlXCIpO1xuY29uc3QgRm9jdXNUcmFwID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2ZvY3VzLXRyYXBcIik7XG5jb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi4vLi4vdXNhLWFjY29yZGlvbi9zcmMvaW5kZXhcIik7XG5cbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBCT0RZID0gXCJib2R5XCI7XG5jb25zdCBMQU5HVUFHRSA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlYDtcbmNvbnN0IExBTkdVQUdFX1NVQiA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlX19zdWJtZW51YDtcbmNvbnN0IExBTkdVQUdFX1BSSU1BUlkgPSBgLiR7UFJFRklYfS1sYW5ndWFnZV9fcHJpbWFyeWA7XG5jb25zdCBMQU5HVUFHRV9QUklNQVJZX0lURU0gPSBgLiR7UFJFRklYfS1sYW5ndWFnZV9fcHJpbWFyeS1pdGVtYDtcbmNvbnN0IExBTkdVQUdFX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1sYW5ndWFnZV9fbGlua2A7XG5jb25zdCBMQU5HVUFHRV9MSU5LUyA9IGAke0xBTkdVQUdFfSBhYDtcblxubGV0IGxhbmd1YWdlU2VsZWN0b3I7XG5sZXQgbGFuZ3VhZ2VBY3RpdmU7XG5cbmNvbnN0IG9uTGFuZ3VhZ2VDbG9zZSA9ICgpID0+XG4gIGxhbmd1YWdlU2VsZWN0b3IudG9nZ2xlTGFuZ3VhZ2UuY2FsbChsYW5ndWFnZVNlbGVjdG9yLCBmYWxzZSk7XG5cbmNvbnN0IGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duID0gKCkgPT4ge1xuICBpZiAoIWxhbmd1YWdlQWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdG9nZ2xlKGxhbmd1YWdlQWN0aXZlLCBmYWxzZSk7XG4gIGxhbmd1YWdlQWN0aXZlID0gbnVsbDtcbn07XG5cbmNvbnN0IGZvY3VzTGFuZ3VhZ2VCdXR0b24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgcGFyZW50TGFuZ3VhZ2VJdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTEFOR1VBR0VfUFJJTUFSWV9JVEVNKTtcblxuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKExBTkdVQUdFX0NPTlRST0wpKSB7XG4gICAgcGFyZW50TGFuZ3VhZ2VJdGVtLnF1ZXJ5U2VsZWN0b3IoTEFOR1VBR0VfQ09OVFJPTCkuZm9jdXMoKTtcbiAgfVxufTtcblxuY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50KSA9PiB7XG4gIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gIGZvY3VzTGFuZ3VhZ2VCdXR0b24oZXZlbnQpO1xufTtcblxubGFuZ3VhZ2VTZWxlY3RvciA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0xBTkdVQUdFX0NPTlRST0xdKCkge1xuICAgICAgICBpZiAobGFuZ3VhZ2VBY3RpdmUgIT09IHRoaXMpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYW5ndWFnZUFjdGl2ZSA9PT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbGFuZ3VhZ2VBY3RpdmUpIHtcbiAgICAgICAgICBsYW5ndWFnZUFjdGl2ZSA9IHRoaXM7XG4gICAgICAgICAgdG9nZ2xlKGxhbmd1YWdlQWN0aXZlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBbQk9EWV06IGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duLFxuICAgICAgW0xBTkdVQUdFX0xJTktTXSgpIHtcbiAgICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuXG4gICAgICAgIGlmIChhY2MpIHtcbiAgICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goKGJ0bikgPT4gYWNjb3JkaW9uLmhpZGUoYnRuKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbTEFOR1VBR0VfUFJJTUFSWV06IGtleW1hcCh7IEVzY2FwZTogaGFuZGxlRXNjYXBlIH0pLFxuICAgIH0sXG4gICAgZm9jdXNvdXQ6IHtcbiAgICAgIFtMQU5HVUFHRV9QUklNQVJZXShldmVudCkge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KExBTkdVQUdFX1BSSU1BUlkpO1xuXG4gICAgICAgIGlmICghbGFuZ3VhZ2UuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIGNvbnN0IHRyYXBDb250YWluZXIgPSByb290Lm1hdGNoZXMoTEFOR1VBR0VfU1VCKVxuICAgICAgICA/IHJvb3RcbiAgICAgICAgOiByb290LnF1ZXJ5U2VsZWN0b3IoTEFOR1VBR0VfU1VCKTtcblxuICAgICAgaWYgKHRyYXBDb250YWluZXIpIHtcbiAgICAgICAgbGFuZ3VhZ2VTZWxlY3Rvci5mb2N1c1RyYXAgPSBGb2N1c1RyYXAodHJhcENvbnRhaW5lciwge1xuICAgICAgICAgIEVzY2FwZTogb25MYW5ndWFnZUNsb3NlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgbGFuZ3VhZ2VBY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuICAgIGZvY3VzVHJhcDogbnVsbCxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYW5ndWFnZVNlbGVjdG9yO1xuIiwiY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgRm9jdXNUcmFwID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2ZvY3VzLXRyYXBcIik7XG5jb25zdCBTY3JvbGxCYXJXaWR0aCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zY3JvbGxiYXItd2lkdGhcIik7XG5cbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IE1PREFMX0NMQVNTTkFNRSA9IGAke1BSRUZJWH0tbW9kYWxgO1xuY29uc3QgT1ZFUkxBWV9DTEFTU05BTUUgPSBgJHtNT0RBTF9DTEFTU05BTUV9LW92ZXJsYXlgO1xuY29uc3QgV1JBUFBFUl9DTEFTU05BTUUgPSBgJHtNT0RBTF9DTEFTU05BTUV9LXdyYXBwZXJgO1xuY29uc3QgT1BFTkVSX0FUVFJJQlVURSA9IFwiZGF0YS1vcGVuLW1vZGFsXCI7XG5jb25zdCBDTE9TRVJfQVRUUklCVVRFID0gXCJkYXRhLWNsb3NlLW1vZGFsXCI7XG5jb25zdCBGT1JDRV9BQ1RJT05fQVRUUklCVVRFID0gXCJkYXRhLWZvcmNlLWFjdGlvblwiO1xuY29uc3QgTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUgPSBgZGF0YS1tb2RhbC1oaWRkZW5gO1xuY29uc3QgTU9EQUwgPSBgLiR7TU9EQUxfQ0xBU1NOQU1FfWA7XG5jb25zdCBJTklUSUFMX0ZPQ1VTID0gYC4ke1dSQVBQRVJfQ0xBU1NOQU1FfSAqW2RhdGEtZm9jdXNdYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAke1dSQVBQRVJfQ0xBU1NOQU1FfSAqWyR7Q0xPU0VSX0FUVFJJQlVURX1dYDtcbmNvbnN0IE9QRU5FUlMgPSBgKlske09QRU5FUl9BVFRSSUJVVEV9XVthcmlhLWNvbnRyb2xzXWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7T1ZFUkxBWV9DTEFTU05BTUV9Om5vdChbJHtGT1JDRV9BQ1RJT05fQVRUUklCVVRFfV0pYDtcbmNvbnN0IE5PTl9NT0RBTFMgPSBgYm9keSA+ICo6bm90KC4ke1dSQVBQRVJfQ0xBU1NOQU1FfSk6bm90KFthcmlhLWhpZGRlbl0pYDtcbmNvbnN0IE5PTl9NT0RBTFNfSElEREVOID0gYFske05PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFfV1gO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBcInVzYS1qcy1tb2RhbC0tYWN0aXZlXCI7XG5jb25zdCBQUkVWRU5UX0NMSUNLX0NMQVNTID0gXCJ1c2EtanMtbm8tY2xpY2tcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcbmNvbnN0IEhJRERFTl9DTEFTUyA9IFwiaXMtaGlkZGVuXCI7XG5cbmxldCBtb2RhbDtcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuY29uc3QgU0NST0xMQkFSX1dJRFRIID0gU2Nyb2xsQmFyV2lkdGgoKTtcbmNvbnN0IElOSVRJQUxfUEFERElORyA9IHdpbmRvd1xuICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAuZ2V0UHJvcGVydHlWYWx1ZShcInBhZGRpbmctcmlnaHRcIik7XG5jb25zdCBURU1QT1JBUllfUEFERElORyA9IGAke1xuICBwYXJzZUludChJTklUSUFMX1BBRERJTkcucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApICtcbiAgcGFyc2VJbnQoU0NST0xMQkFSX1dJRFRILnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKVxufXB4YDtcblxuLyoqXG4gKiAgSXMgYm91bmQgdG8gZXNjYXBlIGtleSwgY2xvc2VzIG1vZGFsIHdoZW5cbiAqL1xuY29uc3Qgb25NZW51Q2xvc2UgPSAoKSA9PiB7XG4gIG1vZGFsLnRvZ2dsZU1vZGFsLmNhbGwobW9kYWwsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiBhIG1vZGFsIHdpbmRvd1xuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqIEByZXR1cm5zIHtib29sZWFufSBzYWZlQWN0aXZlIGlmIG1vYmlsZSBpcyBvcGVuXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKGV2ZW50KSB7XG4gIGxldCBvcmlnaW5hbE9wZW5lcjtcbiAgbGV0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCB7IGJvZHkgfSA9IGRvY3VtZW50O1xuICBjb25zdCBzYWZlQWN0aXZlID0gIWlzQWN0aXZlKCk7XG4gIGNvbnN0IG1vZGFsSWQgPSBjbGlja2VkRWxlbWVudFxuICAgID8gY2xpY2tlZEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2EtbW9kYWwtd3JhcHBlci5pcy12aXNpYmxlXCIpO1xuICBjb25zdCB0YXJnZXRNb2RhbCA9IHNhZmVBY3RpdmVcbiAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSWQpXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzYS1tb2RhbC13cmFwcGVyLmlzLXZpc2libGVcIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgbm8gbW9kYWwgd2UgcmV0dXJuIGVhcmx5XG4gIGlmICghdGFyZ2V0TW9kYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBvcGVuRm9jdXNFbCA9IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA/IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA6IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIudXNhLW1vZGFsXCIpO1xuICBjb25zdCByZXR1cm5Gb2N1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIHRhcmdldE1vZGFsLmdldEF0dHJpYnV0ZShcImRhdGEtb3BlbmVyXCIpXG4gICk7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBib2R5LnF1ZXJ5U2VsZWN0b3IoT1BFTkVSUyk7XG4gIGNvbnN0IGZvcmNlVXNlckFjdGlvbiA9IHRhcmdldE1vZGFsLmdldEF0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFKTtcblxuICAvLyBTZXRzIHRoZSBjbGlja2VkIGVsZW1lbnQgdG8gdGhlIGNsb3NlIGJ1dHRvblxuICAvLyBzbyBlc2Mga2V5IGFsd2F5cyBjbG9zZXMgbW9kYWxcbiAgaWYgKGV2ZW50LnR5cGUgPT09IFwia2V5ZG93blwiICYmIHRhcmdldE1vZGFsICE9PSBudWxsKSB7XG4gICAgY2xpY2tlZEVsZW1lbnQgPSB0YXJnZXRNb2RhbC5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG4gIH1cblxuICAvLyBXaGVuIHdlJ3JlIG5vdCBoaXR0aW5nIHRoZSBlc2NhcGUga2V54oCmXG4gIGlmIChjbGlja2VkRWxlbWVudCkge1xuICAgIC8vIE1ha2Ugc3VyZSB3ZSBjbGljayB0aGUgb3BlbmVyXG4gICAgLy8gSWYgaXQgZG9lc24ndCBoYXZlIGFuIElELCBtYWtlIG9uZVxuICAgIC8vIFN0b3JlIGlkIGFzIGRhdGEgYXR0cmlidXRlIG9uIG1vZGFsXG4gICAgaWYgKGNsaWNrZWRFbGVtZW50Lmhhc0F0dHJpYnV0ZShPUEVORVJfQVRUUklCVVRFKSkge1xuICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IG51bGwpIHtcbiAgICAgICAgb3JpZ2luYWxPcGVuZXIgPSBgbW9kYWwtJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5MDAwMDApICsgMTAwMDAwfWA7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiaWRcIiwgb3JpZ2luYWxPcGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZ2luYWxPcGVuZXIgPSB0aGlzLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0TW9kYWwuc2V0QXR0cmlidXRlKFwiZGF0YS1vcGVuZXJcIiwgb3JpZ2luYWxPcGVuZXIpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgYmFzaWNhbGx5IHN0b3BzIHRoZSBwcm9wYWdhdGlvbiBpZiB0aGUgZWxlbWVudFxuICAgIC8vIGlzIGluc2lkZSB0aGUgbW9kYWwgYW5kIG5vdCBhIGNsb3NlIGJ1dHRvbiBvclxuICAgIC8vIGVsZW1lbnQgaW5zaWRlIGEgY2xvc2UgYnV0dG9uXG4gICAgaWYgKGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoYC4ke01PREFMX0NMQVNTTkFNRX1gKSkge1xuICAgICAgaWYgKFxuICAgICAgICBjbGlja2VkRWxlbWVudC5oYXNBdHRyaWJ1dGUoQ0xPU0VSX0FUVFJJQlVURSkgfHxcbiAgICAgICAgY2xpY2tlZEVsZW1lbnQuY2xvc2VzdChgWyR7Q0xPU0VSX0FUVFJJQlVURX1dYClcbiAgICAgICkge1xuICAgICAgICAvLyBkbyBub3RoaW5nLiBtb3ZlIG9uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgdGFyZ2V0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgdGFyZ2V0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShISURERU5fQ0xBU1MsICFzYWZlQWN0aXZlKTtcblxuICAvLyBJZiB1c2VyIGlzIGZvcmNlZCB0byB0YWtlIGFuIGFjdGlvbiwgYWRkaW5nXG4gIC8vIGEgY2xhc3MgdG8gdGhlIGJvZHkgdGhhdCBwcmV2ZW50cyBjbGlja2luZyB1bmRlcm5lYXRoXG4gIC8vIG92ZXJsYXlcbiAgaWYgKGZvcmNlVXNlckFjdGlvbikge1xuICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShQUkVWRU5UX0NMSUNLX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgfVxuXG4gIC8vIEFjY291bnQgZm9yIGNvbnRlbnQgc2hpZnRpbmcgZnJvbSBib2R5IG92ZXJmbG93OiBoaWRkZW5cbiAgLy8gV2Ugb25seSBjaGVjayBwYWRkaW5nUmlnaHQgaW4gY2FzZSBhcHBzIGFyZSBhZGRpbmcgb3RoZXIgcHJvcGVydGllc1xuICAvLyB0byB0aGUgYm9keSBlbGVtZW50XG4gIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID1cbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9PT0gVEVNUE9SQVJZX1BBRERJTkdcbiAgICAgID8gSU5JVElBTF9QQURESU5HXG4gICAgICA6IFRFTVBPUkFSWV9QQURESU5HO1xuXG4gIC8vIEhhbmRsZSB0aGUgZm9jdXMgYWN0aW9uc1xuICBpZiAoc2FmZUFjdGl2ZSAmJiBvcGVuRm9jdXNFbCkge1xuICAgIC8vIFRoZSBtb2RhbCB3aW5kb3cgaXMgb3BlbmVkLiBGb2N1cyBpcyBzZXQgdG8gY2xvc2UgYnV0dG9uLlxuXG4gICAgLy8gQmluZHMgZXNjYXBlIGtleSBpZiB3ZSdyZSBub3QgZm9yY2luZ1xuICAgIC8vIHRoZSB1c2VyIHRvIHRha2UgYW4gYWN0aW9uXG4gICAgaWYgKGZvcmNlVXNlckFjdGlvbikge1xuICAgICAgbW9kYWwuZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRhcmdldE1vZGFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kYWwuZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRhcmdldE1vZGFsLCB7XG4gICAgICAgIEVzY2FwZTogb25NZW51Q2xvc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGVzIGZvY3VzIHNldHRpbmcgYW5kIGludGVyYWN0aW9uc1xuICAgIG1vZGFsLmZvY3VzVHJhcC51cGRhdGUoc2FmZUFjdGl2ZSk7XG4gICAgb3BlbkZvY3VzRWwuZm9jdXMoKTtcblxuICAgIC8vIEhpZGVzIGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgdGhlIG1vZGFsIGZyb20gc2NyZWVuIHJlYWRlcnNcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9NT0RBTFMpLmZvckVhY2goKG5vbk1vZGFsKSA9PiB7XG4gICAgICBub25Nb2RhbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgICBub25Nb2RhbC5zZXRBdHRyaWJ1dGUoTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUsIFwiXCIpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCFzYWZlQWN0aXZlICYmIG1lbnVCdXR0b24gJiYgcmV0dXJuRm9jdXMpIHtcbiAgICAvLyBUaGUgbW9kYWwgd2luZG93IGlzIGNsb3NlZC5cbiAgICAvLyBOb24tbW9kYWxzIG5vdyBhY2Nlc2libGUgdG8gc2NyZWVuIHJlYWRlclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX01PREFMU19ISURERU4pLmZvckVhY2goKG5vbk1vZGFsKSA9PiB7XG4gICAgICBub25Nb2RhbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcbiAgICAgIG5vbk1vZGFsLnJlbW92ZUF0dHJpYnV0ZShOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURSk7XG4gICAgfSk7XG5cbiAgICAvLyBGb2N1cyBpcyByZXR1cm5lZCB0byB0aGUgb3BlbmVyXG4gICAgcmV0dXJuRm9jdXMuZm9jdXMoKTtcbiAgICBtb2RhbC5mb2N1c1RyYXAudXBkYXRlKHNhZmVBY3RpdmUpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVBY3RpdmU7XG59XG5cbi8qKlxuICogIEJ1aWxkcyBtb2RhbCB3aW5kb3cgZnJvbSBiYXNlIEhUTUxcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBiYXNlQ29tcG9uZW50IHRoZSBtb2RhbCBodG1sIGluIHRoZSBET01cbiAqL1xuY29uc3Qgc2V0VXBNb2RhbCA9IChiYXNlQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGJhc2VDb21wb25lbnQ7XG4gIGNvbnN0IG1vZGFsV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG92ZXJsYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtb2RhbElEID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgY29uc3QgYXJpYUxhYmVsbGVkQnkgPSBiYXNlQ29tcG9uZW50LmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKTtcbiAgY29uc3QgYXJpYURlc2NyaWJlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICBjb25zdCBmb3JjZVVzZXJBY3Rpb24gPSBiYXNlQ29tcG9uZW50Lmhhc0F0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFKVxuICAgID8gYmFzZUNvbXBvbmVudC5oYXNBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSlcbiAgICA6IGZhbHNlO1xuICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgd2hlcmUgbW9kYWwgaXMgZm9yIGNsZWFudXBcbiAgY29uc3Qgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnNldEF0dHJpYnV0ZShgZGF0YS1wbGFjZWhvbGRlci1mb3JgLCBtb2RhbElEKTtcbiAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICBmb3IgKGxldCBhdHRyaWJ1dGVJbmRleCA9IDA7IGF0dHJpYnV0ZUluZGV4IDwgbW9kYWxDb250ZW50LmF0dHJpYnV0ZXMubGVuZ3RoOyBhdHRyaWJ1dGVJbmRleCArPSAxKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gbW9kYWxDb250ZW50LmF0dHJpYnV0ZXNbYXR0cmlidXRlSW5kZXhdO1xuICAgIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoYGRhdGEtb3JpZ2luYWwtJHthdHRyaWJ1dGUubmFtZX1gLCBhdHRyaWJ1dGUudmFsdWUpO1xuICB9XG5cbiAgbW9kYWxDb250ZW50LmFmdGVyKG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcik7XG5cbiAgLy8gUmVidWlsZCB0aGUgbW9kYWwgZWxlbWVudFxuICBtb2RhbENvbnRlbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobW9kYWxXcmFwcGVyLCBtb2RhbENvbnRlbnQpO1xuICBtb2RhbFdyYXBwZXIuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcbiAgbW9kYWxDb250ZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG92ZXJsYXlEaXYsIG1vZGFsQ29udGVudCk7XG4gIG92ZXJsYXlEaXYuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50KTtcblxuICAvLyBBZGQgY2xhc3NlcyBhbmQgYXR0cmlidXRlc1xuICBtb2RhbFdyYXBwZXIuY2xhc3NMaXN0LmFkZChISURERU5fQ0xBU1MpO1xuICBtb2RhbFdyYXBwZXIuY2xhc3NMaXN0LmFkZChXUkFQUEVSX0NMQVNTTkFNRSk7XG4gIG92ZXJsYXlEaXYuY2xhc3NMaXN0LmFkZChPVkVSTEFZX0NMQVNTTkFNRSk7XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXNcbiAgbW9kYWxXcmFwcGVyLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJkaWFsb2dcIik7XG4gIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBtb2RhbElEKTtcblxuICBpZiAoYXJpYUxhYmVsbGVkQnkpIHtcbiAgICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIGFyaWFMYWJlbGxlZEJ5KTtcbiAgfVxuXG4gIGlmIChhcmlhRGVzY3JpYmVkQnkpIHtcbiAgICBtb2RhbFdyYXBwZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLCBhcmlhRGVzY3JpYmVkQnkpO1xuICB9XG5cbiAgaWYgKGZvcmNlVXNlckFjdGlvbikge1xuICAgIG1vZGFsV3JhcHBlci5zZXRBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSwgXCJ0cnVlXCIpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSBiYXNlIGVsZW1lbnQgSFRNTFxuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKTtcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICBiYXNlQ29tcG9uZW50LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgLy8gQWRkIGFyaWEtY29udHJvbHNcbiAgY29uc3QgbW9kYWxDbG9zZXJzID0gbW9kYWxXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQ0xPU0VSUyk7XG4gIG1vZGFsQ2xvc2Vycy5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGVsLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgbW9kYWxJRCk7XG4gIH0pO1xuXG4gIC8vIE1vdmUgYWxsIG1vZGFscyB0byB0aGUgZW5kIG9mIHRoZSBET00uIERvaW5nIHRoaXMgYWxsb3dzIHVzIHRvXG4gIC8vIG1vcmUgZWFzaWx5IGZpbmQgdGhlIGVsZW1lbnRzIHRvIGhpZGUgZnJvbSBzY3JlZW4gcmVhZGVyc1xuICAvLyB3aGVuIHRoZSBtb2RhbCBpcyBvcGVuLlxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsV3JhcHBlcik7XG59O1xuXG5jb25zdCBjbGVhblVwTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbFdyYXBwZXIgPSBtb2RhbENvbnRlbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICBjb25zdCBtb2RhbElEID0gbW9kYWxXcmFwcGVyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gIGNvbnN0IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYWNlaG9sZGVyLWZvcj1cIiR7bW9kYWxJRH1cIl1gKTtcbiAgaWYob3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyKVxuICB7XG4gICAgZm9yIChsZXQgYXR0cmlidXRlSW5kZXggPSAwOyBhdHRyaWJ1dGVJbmRleCA8IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hdHRyaWJ1dGVzLmxlbmd0aDsgYXR0cmlidXRlSW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlID0gb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLmF0dHJpYnV0ZXNbYXR0cmlidXRlSW5kZXhdO1xuICAgICAgaWYoYXR0cmlidXRlLm5hbWUuc3RhcnRzV2l0aCgnZGF0YS1vcmlnaW5hbC0nKSlcbiAgICAgIHtcbiAgICAgICAgLy8gZGF0YS1vcmlnaW5hbC0gaXMgMTQgbG9uZ1xuICAgICAgICBtb2RhbENvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLnN1YnN0cigxNCksIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLmFmdGVyKG1vZGFsQ29udGVudCk7XG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQob3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyKTtcbiAgfVxuXG4gIG1vZGFsV3JhcHBlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG1vZGFsV3JhcHBlcik7XG59O1xuXG5tb2RhbCA9IHtcbiAgaW5pdChyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKE1PREFMLCByb290KS5mb3JFYWNoKChtb2RhbFdpbmRvdykgPT4ge1xuICAgICAgY29uc3QgbW9kYWxJZCA9IG1vZGFsV2luZG93LmlkO1xuICAgICAgc2V0VXBNb2RhbChtb2RhbFdpbmRvdyk7XG5cbiAgICAgIC8vIHRoaXMgd2lsbCBxdWVyeSBhbGwgb3BlbmVycyBhbmQgY2xvc2VycyBpbmNsdWRpbmcgdGhlIG92ZXJsYXlcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWApLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgLy8gVHVybiBhbmNob3IgbGlua3MgaW50byBidXR0b25zIGJlY2F1c2Ugb2ZcbiAgICAgICAgLy8gVm9pY2VPdmVyIG9uIFNhZmFyaVxuICAgICAgICBpZiAoaXRlbS5ub2RlTmFtZSA9PT0gXCJBXCIpIHtcbiAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYW4gdW5jb21tZW50IHdoZW4gYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiIGlzIHN1cHBvcnRlZFxuICAgICAgICAvLyBodHRwczovL2ExMXlzdXBwb3J0LmlvL3RlY2gvYXJpYS9hcmlhLWhhc3BvcHVwX2F0dHJpYnV0ZVxuICAgICAgICAvLyBNb3N0IHNjcmVlbiByZWFkZXJzIHN1cHBvcnQgYXJpYS1oYXNwb3B1cCwgYnV0IG1pZ2h0IGFubm91bmNlXG4gICAgICAgIC8vIGFzIG9wZW5pbmcgYSBtZW51IGlmIFwiZGlhbG9nXCIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgLy8gaXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhhc3BvcHVwXCIsIFwiZGlhbG9nXCIpO1xuXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICB0ZWFyZG93bihyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKE1PREFMLCByb290KS5mb3JFYWNoKChtb2RhbFdpbmRvdykgPT4ge1xuICAgICAgY2xlYW5VcE1vZGFsKG1vZGFsV2luZG93KTtcbiAgICAgIGNvbnN0IG1vZGFsSWQgPSBtb2RhbFdpbmRvdy5pZDtcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2FyaWEtY29udHJvbHM9XCIke21vZGFsSWR9XCJdYClcbiAgICAgICAgLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSk7XG4gICAgfSk7XG4gIH0sXG4gIGZvY3VzVHJhcDogbnVsbCxcbiAgdG9nZ2xlTW9kYWwsXG4gIG9uKHJvb3QpIHtcbiAgICB0aGlzLmluaXQocm9vdCk7XG4gIH0sXG4gIG9mZihyb290KSB7XG4gICAgdGhpcy50ZWFyZG93bihyb290KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbDtcbiIsImNvbnN0IGlnbm9yZSA9IHJlcXVpcmUoXCJyZWNlcHRvci9pZ25vcmVcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5cbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5cbmNvbnN0IEJVVFRPTiA9IFwiLmpzLXNlYXJjaC1idXR0b25cIjtcbmNvbnN0IEZPUk0gPSBcIi5qcy1zZWFyY2gtZm9ybVwiO1xuY29uc3QgSU5QVVQgPSBcIlt0eXBlPXNlYXJjaF1cIjtcbmNvbnN0IENPTlRFWFQgPSBcImhlYWRlclwiOyAvLyBYWFhcblxubGV0IGxhc3RCdXR0b247XG5cbmNvbnN0IGdldEZvcm0gPSAoYnV0dG9uKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBidXR0b24uY2xvc2VzdChDT05URVhUKTtcbiAgcmV0dXJuIGNvbnRleHQgPyBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoRk9STSkgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEZPUk0pO1xufTtcblxuY29uc3QgdG9nZ2xlU2VhcmNoID0gKGJ1dHRvbiwgYWN0aXZlKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBnZXRGb3JtKGJ1dHRvbik7XG5cbiAgaWYgKCFmb3JtKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyAke0ZPUk19IGZvdW5kIGZvciBzZWFyY2ggdG9nZ2xlIGluICR7Q09OVEVYVH0hYCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICBidXR0b24uaGlkZGVuID0gYWN0aXZlO1xuICBmb3JtLmhpZGRlbiA9ICFhY3RpdmU7XG4gIC8qIGVzbGludC1lbmFibGUgKi9cblxuICBpZiAoIWFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKElOUFVUKTtcblxuICBpZiAoaW5wdXQpIHtcbiAgICBpbnB1dC5mb2N1cygpO1xuICB9XG4gIC8vIHdoZW4gdGhlIHVzZXIgY2xpY2tzIF9vdXRzaWRlXyBvZiB0aGUgZm9ybSB3L2lnbm9yZSgpOiBoaWRlIHRoZVxuICAvLyBzZWFyY2gsIHRoZW4gcmVtb3ZlIHRoZSBsaXN0ZW5lclxuICBjb25zdCBsaXN0ZW5lciA9IGlnbm9yZShmb3JtLCAoKSA9PiB7XG4gICAgaWYgKGxhc3RCdXR0b24pIHtcbiAgICAgIGhpZGVTZWFyY2guY2FsbChsYXN0QnV0dG9uKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICB9KTtcblxuICAvLyBOb3JtYWxseSB3ZSB3b3VsZCBqdXN0IHJ1biB0aGlzIGNvZGUgd2l0aG91dCBhIHRpbWVvdXQsIGJ1dFxuICAvLyBJRTExIGFuZCBFZGdlIHdpbGwgYWN0dWFsbHkgY2FsbCB0aGUgbGlzdGVuZXIgKmltbWVkaWF0ZWx5KiBiZWNhdXNlXG4gIC8vIHRoZXkgYXJlIGN1cnJlbnRseSBoYW5kbGluZyB0aGlzIGV4YWN0IHR5cGUgb2YgZXZlbnQsIHNvIHdlJ2xsXG4gIC8vIG1ha2Ugc3VyZSB0aGUgYnJvd3NlciBpcyBkb25lIGhhbmRsaW5nIHRoZSBjdXJyZW50IGNsaWNrIGV2ZW50LFxuICAvLyBpZiBhbnksIGJlZm9yZSB3ZSBhdHRhY2ggdGhlIGxpc3RlbmVyLlxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgfSwgMCk7XG59O1xuXG5mdW5jdGlvbiBzaG93U2VhcmNoKCkge1xuICB0b2dnbGVTZWFyY2godGhpcywgdHJ1ZSk7XG4gIGxhc3RCdXR0b24gPSB0aGlzO1xufVxuXG5mdW5jdGlvbiBoaWRlU2VhcmNoKCkge1xuICB0b2dnbGVTZWFyY2godGhpcywgZmFsc2UpO1xuICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBzZWFyY2ggPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtCVVRUT05dOiBzaG93U2VhcmNoLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHRhcmdldCkge1xuICAgICAgc2VsZWN0KEJVVFRPTiwgdGFyZ2V0KS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgdG9nZ2xlU2VhcmNoKGJ1dHRvbiwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIC8vIGZvcmdldCB0aGUgbGFzdCBidXR0b24gY2xpY2tlZFxuICAgICAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbiAgICB9LFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlYXJjaDtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1za2lwbmF2W2hyZWZePVwiI1wiXSwgLiR7UFJFRklYfS1mb290ZXJfX3JldHVybi10by10b3AgW2hyZWZePVwiI1wiXWA7XG5jb25zdCBNQUlOQ09OVEVOVCA9IFwibWFpbi1jb250ZW50XCI7XG5cbmZ1bmN0aW9uIHNldFRhYmluZGV4KCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSBlbmNvZGVVUkkodGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgaWQgPT09IFwiI1wiID8gTUFJTkNPTlRFTlQgOiBpZC5zbGljZSgxKVxuICApO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3R5bGUub3V0bGluZSA9IFwiMFwiO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAwKTtcbiAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiYmx1clwiLFxuICAgICAgb25jZSgoKSA9PiB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICB9KVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdGhyb3cgYW4gZXJyb3I/XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFtDTElDS106IHtcbiAgICBbTElOS106IHNldFRhYmluZGV4LFxuICB9LFxufSk7XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zYW5pdGl6ZXJcIik7XG5cbmNvbnN0IFRBQkxFID0gYC4ke1BSRUZJWH0tdGFibGVgO1xuY29uc3QgU09SVEVEID0gXCJhcmlhLXNvcnRcIjtcbmNvbnN0IEFTQ0VORElORyA9IFwiYXNjZW5kaW5nXCI7XG5jb25zdCBERVNDRU5ESU5HID0gXCJkZXNjZW5kaW5nXCI7XG5jb25zdCBTT1JUX09WRVJSSURFID0gXCJkYXRhLXNvcnQtdmFsdWVcIjtcbmNvbnN0IFNPUlRfQlVUVE9OX0NMQVNTID0gYCR7UFJFRklYfS10YWJsZV9faGVhZGVyX19idXR0b25gO1xuY29uc3QgU09SVF9CVVRUT04gPSBgLiR7U09SVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IFNPUlRBQkxFX0hFQURFUiA9IGB0aFtkYXRhLXNvcnRhYmxlXWA7XG5jb25zdCBBTk5PVU5DRU1FTlRfUkVHSU9OID0gYC4ke1BSRUZJWH0tdGFibGVfX2Fubm91bmNlbWVudC1yZWdpb25bYXJpYS1saXZlPVwicG9saXRlXCJdYDtcblxuLyoqIEdldHMgdGhlIGRhdGEtc29ydC12YWx1ZSBhdHRyaWJ1dGUgdmFsdWUsIGlmIHByb3ZpZGVkIOKAlCBvdGhlcndpc2UsIGdldHNcbiAqIHRoZSBpbm5lclRleHQgb3IgdGV4dENvbnRlbnQg4oCUIG9mIHRoZSBjaGlsZCBlbGVtZW50IChIVE1MVGFibGVDZWxsRWxlbWVudClcbiAqIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggb2YgdGhlIGdpdmVuIHRhYmxlIHJvd1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHthcnJheTxIVE1MVGFibGVSb3dFbGVtZW50Pn0gdHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGdldENlbGxWYWx1ZSA9ICh0ciwgaW5kZXgpID0+XG4gIHRyLmNoaWxkcmVuW2luZGV4XS5nZXRBdHRyaWJ1dGUoU09SVF9PVkVSUklERSkgfHxcbiAgdHIuY2hpbGRyZW5baW5kZXhdLmlubmVyVGV4dCB8fFxuICB0ci5jaGlsZHJlbltpbmRleF0udGV4dENvbnRlbnQ7XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIHZhbHVlcyBvZiB0d28gcm93IGFycmF5IGl0ZW1zIGF0IHRoZSBnaXZlbiBpbmRleCwgdGhlbiBzb3J0cyBieSB0aGUgZ2l2ZW4gZGlyZWN0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGNvbXBhcmVGdW5jdGlvbiA9IChpbmRleCwgaXNBc2NlbmRpbmcpID0+ICh0aGlzUm93LCBuZXh0Um93KSA9PiB7XG4gIC8vIGdldCB2YWx1ZXMgdG8gY29tcGFyZSBmcm9tIGRhdGEgYXR0cmlidXRlIG9yIGNlbGwgY29udGVudFxuICBjb25zdCB2YWx1ZTEgPSBnZXRDZWxsVmFsdWUoaXNBc2NlbmRpbmcgPyB0aGlzUm93IDogbmV4dFJvdywgaW5kZXgpO1xuICBjb25zdCB2YWx1ZTIgPSBnZXRDZWxsVmFsdWUoaXNBc2NlbmRpbmcgPyBuZXh0Um93IDogdGhpc1JvdywgaW5kZXgpO1xuXG4gIC8vIGlmIG5laXRoZXIgdmFsdWUgaXMgZW1wdHksIGFuZCBpZiBib3RoIHZhbHVlcyBhcmUgYWxyZWFkeSBudW1iZXJzLCBjb21wYXJlIG51bWVyaWNhbGx5XG4gIGlmIChcbiAgICB2YWx1ZTEgJiZcbiAgICB2YWx1ZTIgJiZcbiAgICAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZTEpKSAmJlxuICAgICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlMikpXG4gICkge1xuICAgIHJldHVybiB2YWx1ZTEgLSB2YWx1ZTI7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBjb21wYXJlIGFscGhhYmV0aWNhbGx5IGJhc2VkIG9uIGN1cnJlbnQgdXNlciBsb2NhbGVcbiAgcmV0dXJuIHZhbHVlMS50b1N0cmluZygpLmxvY2FsZUNvbXBhcmUodmFsdWUyLCBuYXZpZ2F0b3IubGFuZ3VhZ2UsIHtcbiAgICBudW1lcmljOiB0cnVlLFxuICAgIGlnbm9yZVB1bmN0dWF0aW9uOiB0cnVlLFxuICB9KTtcbn07XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGNvbHVtbiBoZWFkZXJzIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIHRhYmxlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHRhYmxlXG4gKiBAcmV0dXJuIHthcnJheTxIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudD59XG4gKi9cbmNvbnN0IGdldENvbHVtbkhlYWRlcnMgPSAodGFibGUpID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNlbGVjdChTT1JUQUJMRV9IRUFERVIsIHRhYmxlKTtcbiAgcmV0dXJuIGhlYWRlcnMuZmlsdGVyKChoZWFkZXIpID0+IGhlYWRlci5jbG9zZXN0KFRBQkxFKSA9PT0gdGFibGUpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGJ1dHRvbiBsYWJlbCB3aXRoaW4gdGhlIGdpdmVuIGhlYWRlciBlbGVtZW50LCByZXNldHRpbmcgaXRcbiAqIHRvIHRoZSBkZWZhdWx0IHN0YXRlIChyZWFkeSB0byBzb3J0IGFzY2VuZGluZykgaWYgaXQncyBubyBsb25nZXIgc29ydGVkXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqL1xuY29uc3QgdXBkYXRlU29ydExhYmVsID0gKGhlYWRlcikgPT4ge1xuICBjb25zdCBoZWFkZXJOYW1lID0gaGVhZGVyLmlubmVyVGV4dDtcbiAgY29uc3Qgc29ydGVkQXNjZW5kaW5nID0gaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIGNvbnN0IGlzU29ydGVkID1cbiAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORyB8fFxuICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gREVTQ0VORElORyB8fFxuICAgIGZhbHNlO1xuICBjb25zdCBoZWFkZXJMYWJlbCA9IGAke2hlYWRlck5hbWV9Jywgc29ydGFibGUgY29sdW1uLCBjdXJyZW50bHkgJHtcbiAgICBpc1NvcnRlZFxuICAgICAgPyBgJHtzb3J0ZWRBc2NlbmRpbmcgPyBgc29ydGVkICR7QVNDRU5ESU5HfWAgOiBgc29ydGVkICR7REVTQ0VORElOR31gfWBcbiAgICAgIDogXCJ1bnNvcnRlZFwiXG4gIH1gO1xuICBjb25zdCBoZWFkZXJCdXR0b25MYWJlbCA9IGBDbGljayB0byBzb3J0IGJ5ICR7aGVhZGVyTmFtZX0gaW4gJHtcbiAgICBzb3J0ZWRBc2NlbmRpbmcgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HXG4gIH0gb3JkZXIuYDtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaGVhZGVyTGFiZWwpO1xuICBoZWFkZXIucXVlcnlTZWxlY3RvcihTT1JUX0JVVFRPTikuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaGVhZGVyQnV0dG9uTGFiZWwpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGFyaWEtc29ydCBhdHRyaWJ1dGUgb24gdGhlIGdpdmVuIGhlYWRlciBlbGVtZW50LCBhbmQgcmVzZXQgdGhlIGxhYmVsIGFuZCBidXR0b24gaWNvblxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cbmNvbnN0IHVuc2V0U29ydCA9IChoZWFkZXIpID0+IHtcbiAgaGVhZGVyLnJlbW92ZUF0dHJpYnV0ZShTT1JURUQpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcbn07XG5cbi8qKlxuICogU29ydCByb3dzIGVpdGhlciBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZywgYmFzZWQgb24gYSBnaXZlbiBoZWFkZXIncyBhcmlhLXNvcnQgYXR0cmlidXRlXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2NlbmRpbmdcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc29ydFJvd3MgPSAoaGVhZGVyLCBpc0FzY2VuZGluZykgPT4ge1xuICBoZWFkZXIuc2V0QXR0cmlidXRlKFNPUlRFRCwgaXNBc2NlbmRpbmcgPT09IHRydWUgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG5cbiAgY29uc3QgdGJvZHkgPSBoZWFkZXIuY2xvc2VzdChUQUJMRSkucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuXG4gIC8vIFdlIGNhbiB1c2UgQXJyYXkuZnJvbSgpIGFuZCBBcnJheS5zb3J0KCkgaW5zdGVhZCBvbmNlIHdlIGRyb3AgSUUxMSBzdXBwb3J0LCBsaWtlbHkgaW4gdGhlIHN1bW1lciBvZiAyMDIxXG4gIC8vXG4gIC8vIEFycmF5LmZyb20odGJvZHkucXVlcnlTZWxlY3RvckFsbCgndHInKS5zb3J0KFxuICAvLyAgIGNvbXBhcmVGdW5jdGlvbihcbiAgLy8gICAgIEFycmF5LmZyb20oaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YoaGVhZGVyKSxcbiAgLy8gICAgICFpc0FzY2VuZGluZylcbiAgLy8gICApXG4gIC8vIC5mb3JFYWNoKHRyID0+IHRib2R5LmFwcGVuZENoaWxkKHRyKSApO1xuXG4gIC8vIFtdLnNsaWNlLmNhbGwoKSB0dXJucyBhcnJheS1saWtlIHNldHMgaW50byB0cnVlIGFycmF5cyBzbyB0aGF0IHdlIGNhbiBzb3J0IHRoZW1cbiAgY29uc3QgYWxsUm93cyA9IFtdLnNsaWNlLmNhbGwodGJvZHkucXVlcnlTZWxlY3RvckFsbChcInRyXCIpKTtcbiAgY29uc3QgYWxsSGVhZGVycyA9IFtdLnNsaWNlLmNhbGwoaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICBjb25zdCB0aGlzSGVhZGVySW5kZXggPSBhbGxIZWFkZXJzLmluZGV4T2YoaGVhZGVyKTtcbiAgYWxsUm93cy5zb3J0KGNvbXBhcmVGdW5jdGlvbih0aGlzSGVhZGVySW5kZXgsICFpc0FzY2VuZGluZykpLmZvckVhY2goKHRyKSA9PiB7XG4gICAgW10uc2xpY2VcbiAgICAgIC5jYWxsKHRyLmNoaWxkcmVuKVxuICAgICAgLmZvckVhY2goKHRkKSA9PiB0ZC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYWN0aXZlXCIpKTtcbiAgICB0ci5jaGlsZHJlblt0aGlzSGVhZGVySW5kZXhdLnNldEF0dHJpYnV0ZShcImRhdGEtc29ydC1hY3RpdmVcIiwgdHJ1ZSk7XG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBsaXZlIHJlZ2lvbiBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdGhlIHRhYmxlIHdoZW5ldmVyIHNvcnQgY2hhbmdlcy5cbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGVcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IHNvcnRlZEhlYWRlclxuICovXG5cbmNvbnN0IHVwZGF0ZUxpdmVSZWdpb24gPSAodGFibGUsIHNvcnRlZEhlYWRlcikgPT4ge1xuICBjb25zdCBjYXB0aW9uID0gdGFibGUucXVlcnlTZWxlY3RvcihcImNhcHRpb25cIikuaW5uZXJUZXh0O1xuICBjb25zdCBzb3J0ZWRBc2NlbmRpbmcgPSBzb3J0ZWRIZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgY29uc3QgaGVhZGVyTGFiZWwgPSBzb3J0ZWRIZWFkZXIuaW5uZXJUZXh0O1xuICBjb25zdCBsaXZlUmVnaW9uID0gdGFibGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAobGl2ZVJlZ2lvbiAmJiBsaXZlUmVnaW9uLm1hdGNoZXMoQU5OT1VOQ0VNRU5UX1JFR0lPTikpIHtcbiAgICBjb25zdCBzb3J0QW5ub3VuY2VtZW50ID0gYFRoZSB0YWJsZSBuYW1lZCBcIiR7Y2FwdGlvbn1cIiBpcyBub3cgc29ydGVkIGJ5ICR7aGVhZGVyTGFiZWx9IGluICR7XG4gICAgICBzb3J0ZWRBc2NlbmRpbmcgPyBBU0NFTkRJTkcgOiBERVNDRU5ESU5HXG4gICAgfSBvcmRlci5gO1xuICAgIGxpdmVSZWdpb24uaW5uZXJUZXh0ID0gc29ydEFubm91bmNlbWVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVGFibGUgY29udGFpbmluZyBhIHNvcnRhYmxlIGNvbHVtbiBoZWFkZXIgaXMgbm90IGZvbGxvd2VkIGJ5IGFuIGFyaWEtbGl2ZSByZWdpb24uYFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogVG9nZ2xlIGEgaGVhZGVyJ3Mgc29ydCBzdGF0ZSwgb3B0aW9uYWxseSBwcm92aWRpbmcgYSB0YXJnZXRcbiAqIHN0YXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICogQHBhcmFtIHtib29sZWFuP30gaXNBc2NlbmRpbmcgSWYgbm8gc3RhdGUgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50XG4gKiBzdGF0ZSB3aWxsIGJlIHRvZ2dsZWQgKGZyb20gZmFsc2UgdG8gdHJ1ZSwgYW5kIHZpY2UtdmVyc2EpLlxuICovXG5jb25zdCB0b2dnbGVTb3J0ID0gKGhlYWRlciwgaXNBc2NlbmRpbmcpID0+IHtcbiAgY29uc3QgdGFibGUgPSBoZWFkZXIuY2xvc2VzdChUQUJMRSk7XG4gIGxldCBzYWZlQXNjZW5kaW5nID0gaXNBc2NlbmRpbmc7XG4gIGlmICh0eXBlb2Ygc2FmZUFzY2VuZGluZyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICBzYWZlQXNjZW5kaW5nID0gaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIH1cblxuICBpZiAoIXRhYmxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke1NPUlRBQkxFX0hFQURFUn0gaXMgbWlzc2luZyBvdXRlciAke1RBQkxFfWApO1xuICB9XG5cbiAgc2FmZUFzY2VuZGluZyA9IHNvcnRSb3dzKGhlYWRlciwgaXNBc2NlbmRpbmcpO1xuXG4gIGlmIChzYWZlQXNjZW5kaW5nKSB7XG4gICAgZ2V0Q29sdW1uSGVhZGVycyh0YWJsZSkuZm9yRWFjaCgob3RoZXJIZWFkZXIpID0+IHtcbiAgICAgIGlmIChvdGhlckhlYWRlciAhPT0gaGVhZGVyKSB7XG4gICAgICAgIHVuc2V0U29ydChvdGhlckhlYWRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdXBkYXRlTGl2ZVJlZ2lvbih0YWJsZSwgaGVhZGVyKTtcbiAgfVxufTtcblxuLyoqXG4gKiogSW5zZXJ0cyBhIGJ1dHRvbiB3aXRoIGljb24gaW5zaWRlIGEgc29ydGFibGUgaGVhZGVyXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqL1xuXG5jb25zdCBjcmVhdGVIZWFkZXJCdXR0b24gPSAoaGVhZGVyKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uRWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICBidXR0b25FbC5jbGFzc0xpc3QuYWRkKFNPUlRfQlVUVE9OX0NMQVNTKTtcbiAgLy8gSUNPTl9TT1VSQ0VcbiAgYnV0dG9uRWwuaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgXG4gIDxzdmcgY2xhc3M9XCIke1BSRUZJWH0taWNvblwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gICAgPGcgY2xhc3M9XCJkZXNjZW5kaW5nXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cGF0aCBkPVwiTTE3IDE3TDE1LjU5IDE1LjU5TDEyLjk5OTkgMTguMTdWMkgxMC45OTk5VjE4LjE3TDguNDEgMTUuNThMNyAxN0wxMS45OTk5IDIyTDE3IDE3WlwiIC8+XG4gICAgPC9nPlxuICAgIDxnIGNsYXNzPVwiYXNjZW5kaW5nXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cGF0aCB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwLCAxMiwgMTIpXCIgZD1cIk0xNyAxN0wxNS41OSAxNS41OUwxMi45OTk5IDE4LjE3VjJIMTAuOTk5OVYxOC4xN0w4LjQxIDE1LjU4TDcgMTdMMTEuOTk5OSAyMkwxNyAxN1pcIiAvPlxuICAgIDwvZz5cbiAgICA8ZyBjbGFzcz1cInVuc29ydGVkXCIgZmlsbD1cInRyYW5zcGFyZW50XCI+XG4gICAgICA8cG9seWdvbiBwb2ludHM9XCIxNS4xNyAxNSAxMyAxNy4xNyAxMyA2LjgzIDE1LjE3IDkgMTYuNTggNy41OSAxMiAzIDcuNDEgNy41OSA4LjgzIDkgMTEgNi44MyAxMSAxNy4xNyA4LjgzIDE1IDcuNDIgMTYuNDEgMTIgMjEgMTYuNTkgMTYuNDEgMTUuMTcgMTVcIi8+XG4gICAgPC9nPlxuICA8L3N2Zz5cbiAgYDtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGJ1dHRvbkVsKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG59O1xuXG5jb25zdCB0YWJsZSA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW1NPUlRfQlVUVE9OXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVTb3J0KFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFNPUlRBQkxFX0hFQURFUiksXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoU09SVEFCTEVfSEVBREVSKS5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT1cbiAgICAgICAgICAgIEFTQ0VORElOR1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCBzb3J0YWJsZUhlYWRlcnMgPSBzZWxlY3QoU09SVEFCTEVfSEVBREVSLCByb290KTtcbiAgICAgIHNvcnRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IGNyZWF0ZUhlYWRlckJ1dHRvbihoZWFkZXIpKTtcblxuICAgICAgY29uc3QgZmlyc3RTb3J0ZWQgPSBzb3J0YWJsZUhlYWRlcnMuZmlsdGVyKFxuICAgICAgICAoaGVhZGVyKSA9PlxuICAgICAgICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HIHx8XG4gICAgICAgICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBERVNDRU5ESU5HXG4gICAgICApWzBdO1xuICAgICAgaWYgKHR5cGVvZiBmaXJzdFNvcnRlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBubyBzb3J0YWJsZSBoZWFkZXJzIGZvdW5kXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNvcnREaXIgPSBmaXJzdFNvcnRlZC5nZXRBdHRyaWJ1dGUoU09SVEVEKTtcbiAgICAgIGlmIChzb3J0RGlyID09PSBBU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IERFU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgVEFCTEUsXG4gICAgU09SVEFCTEVfSEVBREVSLFxuICAgIFNPUlRfQlVUVE9OLFxuICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRhYmxlO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3Qge1xuICBDT01CT19CT1hfQ0xBU1MsXG4gIGVuaGFuY2VDb21ib0JveCxcbn0gPSByZXF1aXJlKFwiLi4vLi4vdXNhLWNvbWJvLWJveC9zcmMvaW5kZXhcIik7XG5cbmNvbnN0IFRJTUVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS10aW1lLXBpY2tlcmA7XG5jb25zdCBUSU1FX1BJQ0tFUiA9IGAuJHtUSU1FX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgTUFYX1RJTUUgPSA2MCAqIDI0IC0gMTtcbmNvbnN0IE1JTl9USU1FID0gMDtcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDMwO1xuY29uc3QgTUlOX1NURVAgPSAxO1xuXG5jb25zdCBGSUxURVJfREFUQVNFVCA9IHtcbiAgZmlsdGVyOlxuICAgIFwiMD97eyBob3VyUXVlcnlGaWx0ZXIgfX06e3ttaW51dGVRdWVyeUZpbHRlcn19Lip7eyBhcFF1ZXJ5RmlsdGVyIH19bT9cIixcbiAgYXBRdWVyeUZpbHRlcjogXCIoW2FwXSlcIixcbiAgaG91clF1ZXJ5RmlsdGVyOiBcIihbMS05XVswLTJdPylcIixcbiAgbWludXRlUXVlcnlGaWx0ZXI6IFwiW1xcXFxkXSs6KFswLTldezAsMn0pXCIsXG59O1xuXG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIG9mIGhoOm1tIGludG8gbWludXRlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aW1lU3RyIHRoZSB0aW1lIHN0cmluZyB0byBwYXJzZVxuICogQHJldHVybnMge251bWJlcn0gdGhlIG51bWJlciBvZiBtaW51dGVzXG4gKi9cbmNvbnN0IHBhcnNlVGltZVN0cmluZyA9ICh0aW1lU3RyKSA9PiB7XG4gIGxldCBtaW51dGVzO1xuXG4gIGlmICh0aW1lU3RyKSB7XG4gICAgY29uc3QgW2hvdXJzLCBtaW5zXSA9IHRpbWVTdHIuc3BsaXQoXCI6XCIpLm1hcCgoc3RyKSA9PiB7XG4gICAgICBsZXQgdmFsdWU7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHZhbHVlID0gcGFyc2VkO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgaWYgKGhvdXJzICE9IG51bGwgJiYgbWlucyAhPSBudWxsKSB7XG4gICAgICBtaW51dGVzID0gaG91cnMgKiA2MCArIG1pbnM7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pbnV0ZXM7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdHJhbnNmb3JtVGltZVBpY2tlciA9IChlbCkgPT4ge1xuICBjb25zdCB0aW1lUGlja2VyRWwgPSBlbC5jbG9zZXN0KFRJTUVfUElDS0VSKTtcblxuICBjb25zdCBpbml0aWFsSW5wdXRFbCA9IHRpbWVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKGBpbnB1dGApO1xuXG4gIGlmICghaW5pdGlhbElucHV0RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7VElNRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgaW5wdXRgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcblxuICBbXCJpZFwiLCBcIm5hbWVcIiwgXCJyZXF1aXJlZFwiLCBcImFyaWEtbGFiZWxcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIl0uZm9yRWFjaChcbiAgICAobmFtZSkgPT4ge1xuICAgICAgaWYgKGluaXRpYWxJbnB1dEVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgaW5pdGlhbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBnZXRUaW1lQ29udGV4dCA9IChtaW51dGVzKSA9PiB7XG4gICAgY29uc3QgbWludXRlID0gbWludXRlcyAlIDYwO1xuICAgIGNvbnN0IGhvdXIyNCA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBjb25zdCBob3VyMTIgPSBob3VyMjQgJSAxMiB8fCAxMjtcbiAgICBjb25zdCBhbXBtID0gaG91cjI0IDwgMTIgPyBcImFtXCIgOiBcInBtXCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWludXRlLFxuICAgICAgaG91cjI0LFxuICAgICAgaG91cjEyLFxuICAgICAgYW1wbSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1pblRpbWUgPSBNYXRoLm1heChcbiAgICBNSU5fVElNRSxcbiAgICBwYXJzZVRpbWVTdHJpbmcodGltZVBpY2tlckVsLmRhdGFzZXQubWluVGltZSkgfHwgTUlOX1RJTUVcbiAgKTtcbiAgY29uc3QgbWF4VGltZSA9IE1hdGgubWluKFxuICAgIE1BWF9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5tYXhUaW1lKSB8fCBNQVhfVElNRVxuICApO1xuICBjb25zdCBzdGVwID0gTWF0aC5mbG9vcihcbiAgICBNYXRoLm1heChNSU5fU1RFUCwgdGltZVBpY2tlckVsLmRhdGFzZXQuc3RlcCB8fCBERUZBVUxUX1NURVApXG4gICk7XG5cbiAgbGV0IGRlZmF1bHRWYWx1ZTtcbiAgZm9yIChsZXQgdGltZSA9IG1pblRpbWU7IHRpbWUgPD0gbWF4VGltZTsgdGltZSArPSBzdGVwKSB7XG4gICAgY29uc3QgeyBtaW51dGUsIGhvdXIyNCwgaG91cjEyLCBhbXBtIH0gPSBnZXRUaW1lQ29udGV4dCh0aW1lKTtcblxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gYCR7cGFkWmVyb3MoaG91cjI0LCAyKX06JHtwYWRaZXJvcyhtaW51dGUsIDIpfWA7XG4gICAgb3B0aW9uLnRleHQgPSBgJHtob3VyMTJ9OiR7cGFkWmVyb3MobWludXRlLCAyKX0ke2FtcG19YDtcbiAgICBpZiAob3B0aW9uLnRleHQgPT09IGluaXRpYWxJbnB1dEVsLnZhbHVlKSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHNlbGVjdEVsLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICB0aW1lUGlja2VyRWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfQ0xBU1MpO1xuXG4gIC8vIGNvbWJvIGJveCBwcm9wZXJ0aWVzXG4gIE9iamVjdC5rZXlzKEZJTFRFUl9EQVRBU0VUKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICB0aW1lUGlja2VyRWwuZGF0YXNldFtrZXldID0gRklMVEVSX0RBVEFTRVRba2V5XTtcbiAgfSk7XG4gIHRpbWVQaWNrZXJFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPSBcInRydWVcIjtcbiAgdGltZVBpY2tlckVsLmRhdGFzZXQuZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gIHRpbWVQaWNrZXJFbC5hcHBlbmRDaGlsZChzZWxlY3RFbCk7XG4gIGluaXRpYWxJbnB1dEVsLnJlbW92ZSgpO1xufTtcblxuY29uc3QgdGltZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7fSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFRJTUVfUElDS0VSLCByb290KS5mb3JFYWNoKCh0aW1lUGlja2VyRWwpID0+IHtcbiAgICAgICAgdHJhbnNmb3JtVGltZVBpY2tlcih0aW1lUGlja2VyRWwpO1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3godGltZVBpY2tlckVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgRklMVEVSX0RBVEFTRVQsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdGltZVBpY2tlcjtcbiIsIi8vIFRvb2x0aXBzXG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuXG5jb25zdCBUT09MVElQID0gYC4ke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX1RSSUdHRVIgPSBgLiR7UFJFRklYfS10b29sdGlwX190cmlnZ2VyYDtcbmNvbnN0IFRPT0xUSVBfVFJJR0dFUl9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcF9fdHJpZ2dlcmA7XG5jb25zdCBUT09MVElQX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwYDtcbmNvbnN0IFRPT0xUSVBfQk9EWV9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcF9fYm9keWA7XG5jb25zdCBTRVRfQ0xBU1MgPSBcImlzLXNldFwiO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9IFwiaXMtdmlzaWJsZVwiO1xuY29uc3QgVFJJQU5HTEVfU0laRSA9IDU7XG5jb25zdCBBREpVU1RfV0lEVEhfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX2JvZHktLXdyYXBgO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHRyaWdnZXIgLSBUaGUgdG9vbHRpcCB0cmlnZ2VyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBFbGVtZW50cyBmb3IgaW5pdGlhbGl6ZWQgdG9vbHRpcDsgaW5jbHVkZXMgdHJpZ2dlciwgd3JhcHBlciwgYW5kIGJvZHlcbiAqL1xuY29uc3QgZ2V0VG9vbHRpcEVsZW1lbnRzID0gKHRyaWdnZXIpID0+IHtcbiAgY29uc3Qgd3JhcHBlciA9IHRyaWdnZXIucGFyZW50Tm9kZTtcbiAgY29uc3QgYm9keSA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihgLiR7VE9PTFRJUF9CT0RZX0NMQVNTfWApO1xuXG4gIHJldHVybiB7IHRyaWdnZXIsIHdyYXBwZXIsIGJvZHkgfTtcbn07XG5cbi8qKlxuICogU2hvd3MgdGhlIHRvb2x0aXBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBUcmlnZ2VyIC0gdGhlIGVsZW1lbnQgdGhhdCBpbml0aWFsaXplcyB0aGUgdG9vbHRpcFxuICovXG5jb25zdCBzaG93VG9vbFRpcCA9ICh0b29sdGlwQm9keSwgdG9vbHRpcFRyaWdnZXIsIHBvc2l0aW9uKSA9PiB7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XG5cbiAgLy8gVGhpcyBzZXRzIHVwIHRoZSB0b29sdGlwIGJvZHkuIFRoZSBvcGFjaXR5IGlzIDAsIGJ1dFxuICAvLyB3ZSBjYW4gYmVnaW4gcnVubmluZyB0aGUgY2FsY3VsYXRpb25zIGJlbG93LlxuICB0b29sdGlwQm9keS5jbGFzc0xpc3QuYWRkKFNFVF9DTEFTUyk7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIHRoZSB0b29sdGlwIGJvZHkgd2hlbiB0aGUgdHJpZ2dlciBpcyBob3ZlcmVkXG4gICAqIFJlbW92ZXMgb2xkIHBvc2l0aW9uaW5nIGNsYXNzbmFtZXMgYW5kIHJlYXBwbGllcy4gVGhpcyBhbGxvd3NcbiAgICogcG9zaXRpb25pbmcgdG8gY2hhbmdlIGluIGNhc2UgdGhlIHVzZXIgcmVzaXplcyBicm93c2VyIG9yIERPTSBtYW5pcHVsYXRpb25cbiAgICogY2F1c2VzIHRvb2x0aXAgdG8gZ2V0IGNsaXBwZWQgZnJvbSB2aWV3cG9ydFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2V0UG9zIC0gY2FuIGJlIFwidG9wXCIsIFwiYm90dG9tXCIsIFwicmlnaHRcIiwgXCJsZWZ0XCJcbiAgICovXG4gIGNvbnN0IHNldFBvc2l0aW9uQ2xhc3MgPSAoc2V0UG9zKSA9PiB7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS10b3BgKTtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLWJvdHRvbWApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tcmlnaHRgKTtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLWxlZnRgKTtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QuYWRkKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLSR7c2V0UG9zfWApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG9sZCBwb3NpdGlvbmluZyBzdHlsZXMuIFRoaXMgYWxsb3dzXG4gICAqIHJlLXBvc2l0aW9uaW5nIHRvIGNoYW5nZSB3aXRob3V0IGluaGVyaXRpbmcgb3RoZXJcbiAgICogZHluYW1pYyBzdHlsZXNcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcmVzZXRQb3NpdGlvblN0eWxlcyA9IChlKSA9PiB7XG4gICAgLy8gd2UgZG9uJ3Qgb3ZlcnJpZGUgYW55dGhpbmcgaW4gdGhlIHN0eWxlc2hlZXQgd2hlbiBmaW5kaW5nIGFsdCBwb3NpdGlvbnNcbiAgICBlLnN0eWxlLnRvcCA9IG51bGw7XG4gICAgZS5zdHlsZS5ib3R0b20gPSBudWxsO1xuICAgIGUuc3R5bGUucmlnaHQgPSBudWxsO1xuICAgIGUuc3R5bGUubGVmdCA9IG51bGw7XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBnZXQgbWFyZ2luIG9mZnNldCBjYWxjdWxhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVZhbHVlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuXG4gIGNvbnN0IG9mZnNldE1hcmdpbiA9ICh0YXJnZXQsIHByb3BlcnR5VmFsdWUpID0+XG4gICAgcGFyc2VJbnQoXG4gICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHlWYWx1ZSksXG4gICAgICAxMFxuICAgICk7XG5cbiAgLy8gb2Zmc2V0TGVmdCA9IHRoZSBsZWZ0IHBvc2l0aW9uLCBhbmQgbWFyZ2luIG9mIHRoZSBlbGVtZW50LCB0aGUgbGVmdFxuICAvLyBwYWRkaW5nLCBzY3JvbGxiYXIgYW5kIGJvcmRlciBvZiB0aGUgb2Zmc2V0UGFyZW50IGVsZW1lbnRcbiAgLy8gb2Zmc2V0V2lkdGggPSBUaGUgb2Zmc2V0V2lkdGggcHJvcGVydHkgcmV0dXJucyB0aGUgdmlld2FibGUgd2lkdGggb2YgYW5cbiAgLy8gZWxlbWVudCBpbiBwaXhlbHMsIGluY2x1ZGluZyBwYWRkaW5nLCBib3JkZXIgYW5kIHNjcm9sbGJhciwgYnV0IG5vdFxuICAvLyB0aGUgbWFyZ2luLlxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgbWFyZ2luIG9mZnNldFxuICAgKiB0b29sdGlwIHRyaWdnZXIgbWFyZ2luKHBvc2l0aW9uKSBvZmZzZXQgKyB0b29sdGlwQm9keSBvZmZzZXRXaWR0aFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWFyZ2luUG9zaXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRvb2x0aXBCb2R5T2Zmc2V0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IGNhbGN1bGF0ZU1hcmdpbk9mZnNldCA9IChcbiAgICBtYXJnaW5Qb3NpdGlvbixcbiAgICB0b29sdGlwQm9keU9mZnNldCxcbiAgICB0cmlnZ2VyXG4gICkgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9XG4gICAgICBvZmZzZXRNYXJnaW4odHJpZ2dlciwgYG1hcmdpbi0ke21hcmdpblBvc2l0aW9ufWApID4gMFxuICAgICAgICA/IHRvb2x0aXBCb2R5T2Zmc2V0IC0gb2Zmc2V0TWFyZ2luKHRyaWdnZXIsIGBtYXJnaW4tJHttYXJnaW5Qb3NpdGlvbn1gKVxuICAgICAgICA6IHRvb2x0aXBCb2R5T2Zmc2V0O1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHRvcFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvblRvcCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTsgLy8gZW5zdXJlcyB3ZSBzdGFydCBmcm9tIHRoZSBzYW1lIHBvaW50XG4gICAgLy8gZ2V0IGRldGFpbHMgb24gdGhlIGVsZW1lbnRzIG9iamVjdCB3aXRoXG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBjb25zdCBsZWZ0TWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJsZWZ0XCIsXG4gICAgICBlLm9mZnNldFdpZHRoLFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcInRvcFwiKTtcbiAgICBlLnN0eWxlLmxlZnQgPSBgNTAlYDsgLy8gY2VudGVyIHRoZSBlbGVtZW50XG4gICAgZS5zdHlsZS50b3AgPSBgLSR7VFJJQU5HTEVfU0laRX1weGA7IC8vIGNvbnNpZGVyIHRoZSBwc2V1ZG8gZWxlbWVudFxuICAgIC8vIGFwcGx5IG91ciBtYXJnaW5zIGJhc2VkIG9uIHRoZSBvZmZzZXRcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAtJHt0b3BNYXJnaW59cHggMCAwIC0ke2xlZnRNYXJnaW4gLyAyfXB4YDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIGJvdHRvbVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvbkJvdHRvbSA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwiYm90dG9tXCIpO1xuICAgIGUuc3R5bGUubGVmdCA9IGA1MCVgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYCR7VFJJQU5HTEVfU0laRX1weCAwIDAgLSR7bGVmdE1hcmdpbiAvIDJ9cHhgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgcmlnaHRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25SaWdodCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IHRvcE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwidG9wXCIsXG4gICAgICBlLm9mZnNldEhlaWdodCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJyaWdodFwiKTtcbiAgICBlLnN0eWxlLnRvcCA9IGA1MCVgO1xuICAgIGUuc3R5bGUubGVmdCA9IGAke1xuICAgICAgdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCArIHRvb2x0aXBUcmlnZ2VyLm9mZnNldFdpZHRoICsgVFJJQU5HTEVfU0laRVxuICAgIH1weGA7XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgLSR7dG9wTWFyZ2luIC8gMn1weCAwIDAgMGA7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSByaWdodFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvbkxlZnQgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlclxuICAgICk7XG5cbiAgICAvLyB3ZSBoYXZlIHRvIGNoZWNrIGZvciBzb21lIHV0aWxpdHkgbWFyZ2luc1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgPiBlLm9mZnNldFdpZHRoXG4gICAgICAgID8gdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCAtIGUub2Zmc2V0V2lkdGhcbiAgICAgICAgOiBlLm9mZnNldFdpZHRoLFxuICAgICAgdG9vbHRpcFRyaWdnZXJcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcImxlZnRcIik7XG4gICAgZS5zdHlsZS50b3AgPSBgNTAlYDtcbiAgICBlLnN0eWxlLmxlZnQgPSBgLSR7VFJJQU5HTEVfU0laRX1weGA7XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgLSR7dG9wTWFyZ2luIC8gMn1weCAwIDAgJHtcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgPiBlLm9mZnNldFdpZHRoID8gbGVmdE1hcmdpbiA6IC1sZWZ0TWFyZ2luXG4gICAgfXB4YDsgLy8gYWRqdXN0IHRoZSBtYXJnaW5cbiAgfTtcblxuICAvKipcbiAgICogV2UgdHJ5IHRvIHNldCB0aGUgcG9zaXRpb24gYmFzZWQgb24gdGhlXG4gICAqIG9yaWdpbmFsIGludGVudGlvbiwgYnV0IG1ha2UgYWRqdXN0bWVudHNcbiAgICogaWYgdGhlIGVsZW1lbnQgaXMgY2xpcHBlZCBvdXQgb2YgdGhlIHZpZXdwb3J0XG4gICAqIHdlIGNvbnN0cmFpbiB0aGUgd2lkdGggb25seSBhcyBhIGxhc3QgcmVzb3J0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQoYWxpYXMgdG9vbHRpcEJvZHkpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhdHRlbXB0ICgtLWZsYWcpXG4gICAqL1xuXG4gIGNvbnN0IG1heEF0dGVtcHRzID0gMjtcblxuICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGVsZW1lbnQsIGF0dGVtcHQgPSAxKSB7XG4gICAgLy8gY3JlYXRlIGFycmF5IG9mIG9wdGlvbmFsIHBvc2l0aW9uc1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgIHBvc2l0aW9uVG9wLFxuICAgICAgcG9zaXRpb25Cb3R0b20sXG4gICAgICBwb3NpdGlvblJpZ2h0LFxuICAgICAgcG9zaXRpb25MZWZ0LFxuICAgIF07XG5cbiAgICBsZXQgaGFzVmlzaWJsZVBvc2l0aW9uID0gZmFsc2U7XG5cbiAgICAvLyB3ZSB0YWtlIGEgcmVjdXJzaXZlIGFwcHJvYWNoXG4gICAgZnVuY3Rpb24gdHJ5UG9zaXRpb25zKGkpIHtcbiAgICAgIGlmIChpIDwgcG9zaXRpb25zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbnNbaV07XG4gICAgICAgIHBvcyhlbGVtZW50KTtcblxuICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICB0cnlQb3NpdGlvbnMoKGkgKz0gMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhc1Zpc2libGVQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnlQb3NpdGlvbnMoMCk7XG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCBhIHBvc2l0aW9uIHdlIGNvbXByZXNzIGl0IGFuZCB0cnkgYWdhaW5cbiAgICBpZiAoIWhhc1Zpc2libGVQb3NpdGlvbikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEFESlVTVF9XSURUSF9DTEFTUyk7XG4gICAgICBpZiAoYXR0ZW1wdCA8PSBtYXhBdHRlbXB0cykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbihlbGVtZW50LCAoYXR0ZW1wdCArPSAxKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgIHBvc2l0aW9uVG9wKHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICBwb3NpdGlvbkJvdHRvbSh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICBwb3NpdGlvblJpZ2h0KHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgcG9zaXRpb25MZWZ0KHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBza2lwIGRlZmF1bHQgY2FzZVxuICAgICAgYnJlYWs7XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgc2hvdyB0aGUgdG9vbHRpcC4gVGhlIFZJU0lCTEVfQ0xBU1NcbiAgICogd2lsbCBjaGFuZ2UgdGhlIG9wYWNpdHkgdG8gMVxuICAgKi9cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKTtcbiAgfSwgMjApO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCB0aGUgcHJvcGVydGllcyB0byBzaG93IGFuZCBwb3NpdGlvbiB0aGUgdG9vbHRpcCxcbiAqIGFuZCByZXNldHMgdGhlIHRvb2x0aXAgcG9zaXRpb24gdG8gdGhlIG9yaWdpbmFsIGludGVudGlvblxuICogaW4gY2FzZSB0aGUgd2luZG93IGlzIHJlc2l6ZWQgb3IgdGhlIGVsZW1lbnQgaXMgbW92ZWQgdGhyb3VnaFxuICogRE9NIG1hbmlwdWxhdGlvbi5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBCb2R5IC0gVGhlIGJvZHkgb2YgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3QgaGlkZVRvb2xUaXAgPSAodG9vbHRpcEJvZHkpID0+IHtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShWSVNJQkxFX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShTRVRfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKEFESlVTVF9XSURUSF9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbn07XG5cbi8qKlxuICogU2V0dXAgdGhlIHRvb2x0aXAgY29tcG9uZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwVHJpZ2dlciBUaGUgZWxlbWVudCB0aGF0IGNyZWF0ZXMgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3Qgc2V0VXBBdHRyaWJ1dGVzID0gKHRvb2x0aXBUcmlnZ2VyKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBJRCA9IGB0b29sdGlwLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwMH1gO1xuICBjb25zdCB0b29sdGlwQ29udGVudCA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IHRvb2x0aXBCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IHBvc2l0aW9uID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKVxuICAgID8gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKVxuICAgIDogXCJ0b3BcIjtcbiAgY29uc3QgYWRkaXRpb25hbENsYXNzZXMgPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNsYXNzZXNcIik7XG5cbiAgLy8gU2V0IHVwIHRvb2x0aXAgYXR0cmlidXRlc1xuICB0b29sdGlwVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIHRvb2x0aXBJRCk7XG4gIHRvb2x0aXBUcmlnZ2VyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiMFwiKTtcbiAgdG9vbHRpcFRyaWdnZXIucmVtb3ZlQXR0cmlidXRlKFwidGl0bGVcIik7XG4gIHRvb2x0aXBUcmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoVE9PTFRJUF9DTEFTUyk7XG4gIHRvb2x0aXBUcmlnZ2VyLmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9UUklHR0VSX0NMQVNTKTtcblxuICAvLyBpbnNlcnQgd3JhcHBlciBiZWZvcmUgZWwgaW4gdGhlIERPTSB0cmVlXG4gIHRvb2x0aXBUcmlnZ2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHRvb2x0aXBUcmlnZ2VyKTtcblxuICAvLyBzZXQgdXAgdGhlIHdyYXBwZXJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZCh0b29sdGlwVHJpZ2dlcik7XG4gIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChUT09MVElQX0NMQVNTKTtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZCh0b29sdGlwQm9keSk7XG5cbiAgLy8gQXBwbHkgYWRkaXRpb25hbCBjbGFzcyBuYW1lcyB0byB3cmFwcGVyIGVsZW1lbnRcbiAgaWYgKGFkZGl0aW9uYWxDbGFzc2VzKSB7XG4gICAgY29uc3QgY2xhc3Nlc0FycmF5ID0gYWRkaXRpb25hbENsYXNzZXMuc3BsaXQoXCIgXCIpO1xuICAgIGNsYXNzZXNBcnJheS5mb3JFYWNoKChjbGFzc25hbWUpID0+IHdyYXBwZXIuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpKTtcbiAgfVxuXG4gIC8vIHNldCB1cCB0aGUgdG9vbHRpcCBib2R5XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9CT0RZX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiaWRcIiwgdG9vbHRpcElEKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInRvb2x0aXBcIik7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAvLyBwbGFjZSB0aGUgdGV4dCBpbiB0aGUgdG9vbHRpcFxuICB0b29sdGlwQm9keS50ZXh0Q29udGVudCA9IHRvb2x0aXBDb250ZW50O1xuXG4gIHJldHVybiB7IHRvb2x0aXBCb2R5LCBwb3NpdGlvbiwgdG9vbHRpcENvbnRlbnQsIHdyYXBwZXIgfTtcbn07XG5cbi8vIFNldHVwIG91ciBmdW5jdGlvbiB0byBydW4gb24gdmFyaW91cyBldmVudHNcbmNvbnN0IHRvb2x0aXAgPSBiZWhhdmlvcihcbiAge1xuICAgIFwibW91c2VvdmVyIGZvY3VzaW5cIjoge1xuICAgICAgW1RPT0xUSVBdKGUpIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCBlbGVtZW50VHlwZSA9IHRyaWdnZXIubm9kZU5hbWU7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0b29sdGlwIGlmIGl0IGhhc24ndCBhbHJlYWR5XG4gICAgICAgIGlmIChlbGVtZW50VHlwZSA9PT0gXCJCVVRUT05cIiAmJiB0cmlnZ2VyLmhhc0F0dHJpYnV0ZShcInRpdGxlXCIpKSB7XG4gICAgICAgICAgc2V0VXBBdHRyaWJ1dGVzKHRyaWdnZXIpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgW1RPT0xUSVBfVFJJR0dFUl0oZSkge1xuICAgICAgICBjb25zdCB7IHRyaWdnZXIsIGJvZHkgfSA9IGdldFRvb2x0aXBFbGVtZW50cyhlLnRhcmdldCk7XG5cbiAgICAgICAgc2hvd1Rvb2xUaXAoYm9keSwgdHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnBvc2l0aW9uKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIm1vdXNlb3V0IGZvY3Vzb3V0XCI6IHtcbiAgICAgIFtUT09MVElQX1RSSUdHRVJdKGUpIHtcbiAgICAgICAgY29uc3QgeyBib2R5IH0gPSBnZXRUb29sdGlwRWxlbWVudHMoZS50YXJnZXQpO1xuXG4gICAgICAgIGhpZGVUb29sVGlwKGJvZHkpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoVE9PTFRJUCwgcm9vdCkuZm9yRWFjaCgodG9vbHRpcFRyaWdnZXIpID0+IHtcbiAgICAgICAgc2V0VXBBdHRyaWJ1dGVzKHRvb2x0aXBUcmlnZ2VyKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0dXA6IHNldFVwQXR0cmlidXRlcyxcbiAgICBnZXRUb29sdGlwRWxlbWVudHMsXG4gICAgc2hvdzogc2hvd1Rvb2xUaXAsXG4gICAgaGlkZTogaGlkZVRvb2xUaXAsXG4gIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdG9vbHRpcDtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdmFsaWRhdGUgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXRcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuXG5jb25zdCBWQUxJREFURV9JTlBVVCA9IFwiaW5wdXRbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdXCI7XG5jb25zdCBDSEVDS0xJU1RfSVRFTSA9IGAuJHtQUkVGSVh9LWNoZWNrbGlzdF9faXRlbWA7XG5cbi8vIFRyaWdnZXIgdmFsaWRhdGlvbiBvbiBpbnB1dCBjaGFuZ2VcbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChlbCkgPT4gdmFsaWRhdGUoZWwpO1xuXG4vLyBDcmVhdGUgY29udGFpbmVyIHRvIGhvbGQgYXJpYSByZWFkb3V0XG5jb25zdCBjcmVhdGVTdGF0dXNFbGVtZW50ID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb25Db250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xuICBjb25zdCBpbnB1dElEID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IHN0YXR1c1N1bW1hcnlJRCA9IGAke2lucHV0SUR9LXNyLXN1bW1hcnlgO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIHN0YXR1c1N1bW1hcnlJRCk7XG5cbiAgY29uc3Qgc3RhdHVzU3VtbWFyeUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLXN0YXR1c1wiLCBcIlwiKTtcbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidXNhLXNyLW9ubHlcIik7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsIFwicG9saXRlXCIpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImFyaWEtYXRvbWljXCIsIHRydWUpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHN0YXR1c1N1bW1hcnlJRCk7XG4gIHZhbGlkYXRpb25Db250YWluZXIuYXBwZW5kKHN0YXR1c1N1bW1hcnlDb250YWluZXIpO1xufTtcblxuLy8gU2V0IHVwIGNoZWNrbGlzdCBpdGVtcyB3aXRoIGluaXRpYWwgYXJpYS1sYWJlbCAoaW5jb21wbGV0ZSkgdmFsdWVzXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdHVzID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb25Db250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xuICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IHZhbGlkYXRpb25Db250YWluZXIucXVlcnlTZWxlY3RvckFsbChDSEVDS0xJU1RfSVRFTSk7XG4gIGNvbnN0IHZhbGlkYXRpb25FbGVtZW50ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRcIik7XG5cbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCB2YWxpZGF0aW9uRWxlbWVudCk7XG5cbiAgY2hlY2tsaXN0SXRlbXMuZm9yRWFjaCgobGlzdEl0ZW0pID0+IHtcbiAgICBsZXQgY3VycmVudFN0YXR1cyA9IFwic3RhdHVzIGluY29tcGxldGVcIjtcbiAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLWluY29tcGxldGVcIikpIHtcbiAgICAgIGN1cnJlbnRTdGF0dXMgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24taW5jb21wbGV0ZVwiKTtcbiAgICB9XG4gICAgY29uc3QgaXRlbVN0YXR1cyA9IGAke2xpc3RJdGVtLnRleHRDb250ZW50fSAke2N1cnJlbnRTdGF0dXN9IGA7XG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaXRlbVN0YXR1cyk7XG4gIH0pO1xufTtcblxuY29uc3QgZW5oYW5jZVZhbGlkYXRpb24gPSAoaW5wdXQpID0+IHtcbiAgY3JlYXRlU3RhdHVzRWxlbWVudChpbnB1dCk7XG4gIGNyZWF0ZUluaXRpYWxTdGF0dXMoaW5wdXQpO1xufTtcblxuY29uc3QgdmFsaWRhdG9yID0gYmVoYXZpb3IoXG4gIHtcbiAgICBcImlucHV0IGNoYW5nZVwiOiB7XG4gICAgICBbVkFMSURBVEVfSU5QVVRdKGV2ZW50KSB7XG4gICAgICAgIGhhbmRsZUNoYW5nZShldmVudC50YXJnZXQpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoVkFMSURBVEVfSU5QVVQsIHJvb3QpLmZvckVhY2goKGlucHV0KSA9PlxuICAgICAgICBlbmhhbmNlVmFsaWRhdGlvbihpbnB1dClcbiAgICAgICk7XG4gICAgfSxcbiAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiBcInVzYVwiLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBUaGlzIHVzZWQgdG8gYmUgY29uZGl0aW9uYWxseSBkZXBlbmRlbnQgb24gd2hldGhlciB0aGVcbiAgLy8gYnJvd3NlciBzdXBwb3J0ZWQgdG91Y2ggZXZlbnRzOyBpZiBpdCBkaWQsIGBDTElDS2Agd2FzIHNldCB0b1xuICAvLyBgdG91Y2hzdGFydGAuICBIb3dldmVyLCB0aGlzIGhhZCBkb3duc2lkZXM6XG4gIC8vXG4gIC8vICogSXQgcHJlLWVtcHRlZCBtb2JpbGUgYnJvd3NlcnMnIGRlZmF1bHQgYmVoYXZpb3Igb2YgZGV0ZWN0aW5nXG4gIC8vICAgd2hldGhlciBhIHRvdWNoIHR1cm5lZCBpbnRvIGEgc2Nyb2xsLCB0aGVyZWJ5IHByZXZlbnRpbmdcbiAgLy8gICB1c2VycyBmcm9tIHVzaW5nIHNvbWUgb2Ygb3VyIGNvbXBvbmVudHMgYXMgc2Nyb2xsIHN1cmZhY2VzLlxuICAvL1xuICAvLyAqIFNvbWUgZGV2aWNlcywgc3VjaCBhcyB0aGUgTWljcm9zb2Z0IFN1cmZhY2UgUHJvLCBzdXBwb3J0ICpib3RoKlxuICAvLyAgIHRvdWNoIGFuZCBjbGlja3MuIFRoaXMgbWVhbnQgdGhlIGNvbmRpdGlvbmFsIGVmZmVjdGl2ZWx5IGRyb3BwZWRcbiAgLy8gICBzdXBwb3J0IGZvciB0aGUgdXNlcidzIG1vdXNlLCBmcnVzdHJhdGluZyB1c2VycyB3aG8gcHJlZmVycmVkXG4gIC8vICAgaXQgb24gdGhvc2Ugc3lzdGVtcy5cbiAgQ0xJQ0s6IFwiY2xpY2tcIixcbn07XG4iLCJjb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWFjY29yZGlvbi9zcmMvaW5kZXhcIik7XG5jb25zdCBiYW5uZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWJhbm5lci9zcmMvaW5kZXhcIik7XG5jb25zdCBjaGFyYWN0ZXJDb3VudCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtY2hhcmFjdGVyLWNvdW50L3NyYy9pbmRleFwiKTtcbmNvbnN0IGNvbWJvQm94ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1jb21iby1ib3gvc3JjL2luZGV4XCIpO1xuY29uc3QgZGF0ZVBpY2tlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtZGF0ZS1waWNrZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgZGF0ZVJhbmdlUGlja2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1kYXRlLXJhbmdlLXBpY2tlci9zcmMvaW5kZXhcIik7XG5jb25zdCBmaWxlSW5wdXQgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4XCIpO1xuY29uc3QgZm9vdGVyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1mb290ZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgaW5QYWdlTmF2aWdhdGlvbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaW4tcGFnZS1uYXZpZ2F0aW9uL3NyYy9pbmRleFwiKTtcbmNvbnN0IGlucHV0TWFzayA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaW5wdXQtbWFzay9zcmMvaW5kZXhcIik7XG5jb25zdCBpbnB1dFByZWZpeFN1ZmZpeCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaW5wdXQtcHJlZml4LXN1ZmZpeC9zcmMvaW5kZXhcIik7XG5jb25zdCBsYW5ndWFnZVNlbGVjdG9yID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1sYW5ndWFnZS1zZWxlY3Rvci9zcmMvaW5kZXhcIik7XG5jb25zdCBtb2RhbCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtbW9kYWwvc3JjL2luZGV4XCIpO1xuY29uc3QgbmF2aWdhdGlvbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaGVhZGVyL3NyYy9pbmRleFwiKTtcbmNvbnN0IHBhc3N3b3JkID0gcmVxdWlyZShcIi4uLy4uLy4uL191c2EtcGFzc3dvcmQvc3JjL2luZGV4XCIpO1xuY29uc3Qgc2VhcmNoID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1zZWFyY2gvc3JjL2luZGV4XCIpO1xuY29uc3Qgc2tpcG5hdiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2Etc2tpcG5hdi9zcmMvaW5kZXhcIik7XG5jb25zdCB0YWJsZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtdGFibGUvc3JjL2luZGV4XCIpO1xuY29uc3QgdGltZVBpY2tlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtdGltZS1waWNrZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgdG9vbHRpcCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtdG9vbHRpcC9zcmMvaW5kZXhcIik7XG5jb25zdCB2YWxpZGF0b3IgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXZhbGlkYXRpb24vc3JjL2luZGV4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWNjb3JkaW9uLFxuICBiYW5uZXIsXG4gIGNoYXJhY3RlckNvdW50LFxuICBjb21ib0JveCxcbiAgZGF0ZVBpY2tlcixcbiAgZGF0ZVJhbmdlUGlja2VyLFxuICBmaWxlSW5wdXQsXG4gIGZvb3RlcixcbiAgaW5QYWdlTmF2aWdhdGlvbixcbiAgaW5wdXRNYXNrLFxuICBpbnB1dFByZWZpeFN1ZmZpeCxcbiAgbGFuZ3VhZ2VTZWxlY3RvcixcbiAgbW9kYWwsXG4gIG5hdmlnYXRpb24sXG4gIHBhc3N3b3JkLFxuICBzZWFyY2gsXG4gIHNraXBuYXYsXG4gIHRhYmxlLFxuICB0aW1lUGlja2VyLFxuICB0b29sdGlwLFxuICB2YWxpZGF0b3IsXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbihmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblxuICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgX3BhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtcyA9IF9wYXJhbXMgfHwge1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChcbiAgICAgIGV2ZW50LFxuICAgICAgcGFyYW1zLmJ1YmJsZXMsXG4gICAgICBwYXJhbXMuY2FuY2VsYWJsZSxcbiAgICAgIHBhcmFtcy5kZXRhaWxcbiAgICApO1xuICAgIHJldHVybiBldnQ7XG4gIH1cblxuICB3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG4iLCJjb25zdCBlbHByb3RvID0gd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IEhJRERFTiA9IFwiaGlkZGVuXCI7XG5cbmlmICghKEhJRERFTiBpbiBlbHByb3RvKSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxwcm90bywgSElEREVOLCB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKEhJRERFTik7XG4gICAgfSxcbiAgICBzZXQodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShISURERU4sIFwiXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoSElEREVOKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cbiIsIi8vIHBvbHlmaWxscyBIVE1MRWxlbWVudC5wcm90b3R5cGUuY2xhc3NMaXN0IGFuZCBET01Ub2tlbkxpc3RcbnJlcXVpcmUoXCJjbGFzc2xpc3QtcG9seWZpbGxcIik7XG4vLyBwb2x5ZmlsbHMgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhpZGRlblxucmVxdWlyZShcIi4vZWxlbWVudC1oaWRkZW5cIik7XG4vLyBwb2x5ZmlsbHMgTnVtYmVyLmlzTmFOKClcbnJlcXVpcmUoXCIuL251bWJlci1pcy1uYW5cIik7XG4vLyBwb2x5ZmlsbHMgQ3VzdG9tRXZlbnRcbnJlcXVpcmUoXCIuL2N1c3RvbS1ldmVudFwiKTtcbi8vIHBvbHlmaWxscyBzdmc0ZXZlcnlib2R5XG5yZXF1aXJlKFwiLi9zdmc0ZXZlcnlib2R5XCIpO1xuIiwiTnVtYmVyLmlzTmFOID1cbiAgTnVtYmVyLmlzTmFOIHx8XG4gIGZ1bmN0aW9uIGlzTmFOKGlucHV0KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIHJldHVybiB0eXBlb2YgaW5wdXQgPT09IFwibnVtYmVyXCIgJiYgaW5wdXQgIT09IGlucHV0O1xuICB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbiEoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59KShmdW5jdGlvbiAoKSB7XG4gIC8qISBzdmc0ZXZlcnlib2R5IHYyLjEuOSB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9zdmc0ZXZlcnlib2R5ICovXG4gIGZ1bmN0aW9uIGVtYmVkKHBhcmVudCwgc3ZnLCB0YXJnZXQsIHVzZSkge1xuICAgIC8vIGlmIHRoZSB0YXJnZXQgZXhpc3RzXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgLy8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgdG8gaG9sZCB0aGUgY29udGVudHMgb2YgdGhlIHRhcmdldFxuICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICB2aWV3Qm94ID1cbiAgICAgICAgICAhc3ZnLmhhc0F0dHJpYnV0ZShcInZpZXdCb3hcIikgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShcInZpZXdCb3hcIik7XG4gICAgICAvLyBjb25kaXRpb25hbGx5IHNldCB0aGUgdmlld0JveCBvbiB0aGUgc3ZnXG4gICAgICB2aWV3Qm94ICYmIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuICAgICAgLy8gY29weSB0aGUgY29udGVudHMgb2YgdGhlIGNsb25lIGludG8gdGhlIGZyYWdtZW50XG4gICAgICBmb3IgKFxuICAgICAgICAvLyBjbG9uZSB0aGUgdGFyZ2V0XG4gICAgICAgIHZhciBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGVcbiAgICAgICAgICAgID8gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0YXJnZXQsICEwKVxuICAgICAgICAgICAgOiB0YXJnZXQuY2xvbmVOb2RlKCEwKSxcbiAgICAgICAgICBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgc3ZnLm5hbWVzcGFjZVVSSSB8fCBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgICAgICAgICBcImdcIlxuICAgICAgICAgICk7XG4gICAgICAgIGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoO1xuXG4gICAgICApIHtcbiAgICAgICAgZy5hcHBlbmRDaGlsZChjbG9uZS5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2UpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IHVzZS5hdHRyaWJ1dGVzLmxlbmd0aCA+IGk7IGkrKykge1xuICAgICAgICAgIHZhciBhdHRyID0gdXNlLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgXCJ4bGluazpocmVmXCIgIT09IGF0dHIubmFtZSAmJlxuICAgICAgICAgICAgXCJocmVmXCIgIT09IGF0dHIubmFtZSAmJlxuICAgICAgICAgICAgZy5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZyksIC8vIGFwcGVuZCB0aGUgZnJhZ21lbnQgaW50byB0aGUgc3ZnXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhociwgdXNlKSB7XG4gICAgLy8gbGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIHJlcXVlc3RcbiAgICAoeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIGlmIHRoZSByZXF1ZXN0IGlzIHJlYWR5XG4gICAgICBpZiAoNCA9PT0geGhyLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudFxuICAgICAgICB2YXIgY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50O1xuICAgICAgICAvLyBlbnN1cmUgdGhlIGNhY2hlZCBodG1sIGRvY3VtZW50IGJhc2VkIG9uIHRoZSB4aHIgcmVzcG9uc2VcbiAgICAgICAgY2FjaGVkRG9jdW1lbnQgfHxcbiAgICAgICAgICAoKGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudCA9XG4gICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIikpLFxuICAgICAgICAgIChjYWNoZWREb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHhoci5yZXNwb25zZVRleHQpLCAvLyBlbnN1cmUgZG9tYWlucyBhcmUgdGhlIHNhbWUsIG90aGVyd2lzZSB3ZSdsbCBoYXZlIGlzc3VlcyBhcHBlbmRpbmcgdGhlXG4gICAgICAgICAgLy8gZWxlbWVudCBpbiBJRSAxMVxuICAgICAgICAgIGNhY2hlZERvY3VtZW50LmRvbWFpbiAhPT0gZG9jdW1lbnQuZG9tYWluICYmXG4gICAgICAgICAgICAoY2FjaGVkRG9jdW1lbnQuZG9tYWluID0gZG9jdW1lbnQuZG9tYWluKSxcbiAgICAgICAgICAoeGhyLl9jYWNoZWRUYXJnZXQgPSB7fSkpLCAvLyBjbGVhciB0aGUgeGhyIGVtYmVkcyBsaXN0IGFuZCBlbWJlZCBlYWNoIGl0ZW1cbiAgICAgICAgICB4aHIuX2VtYmVkcy5zcGxpY2UoMCkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB4aHIuX2NhY2hlZFRhcmdldFtpdGVtLmlkXTtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgdGFyZ2V0IHx8XG4gICAgICAgICAgICAgICh0YXJnZXQgPSB4aHIuX2NhY2hlZFRhcmdldFtpdGVtLmlkXSA9XG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkpLFxuICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgdGFyZ2V0IGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICBlbWJlZChpdGVtLnBhcmVudCwgaXRlbS5zdmcsIHRhcmdldCwgdXNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KSwgLy8gdGVzdCB0aGUgcmVhZHkgc3RhdGUgY2hhbmdlIGltbWVkaWF0ZWx5XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlKCk7XG4gIH1cbiAgZnVuY3Rpb24gc3ZnNGV2ZXJ5Ym9keShyYXdvcHRzKSB7XG4gICAgZnVuY3Rpb24gb25pbnRlcnZhbCgpIHtcbiAgICAgIC8vIGlmIGFsbCA8dXNlPnMgaW4gdGhlIGFycmF5IGFyZSBiZWluZyBieXBhc3NlZCwgZG9uJ3QgcHJvY2VlZC5cbiAgICAgIGlmIChcbiAgICAgICAgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzICYmXG4gICAgICAgIHVzZXMubGVuZ3RoIC0gbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzIDw9IDBcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdm9pZCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUob25pbnRlcnZhbCwgNjcpO1xuICAgICAgfVxuICAgICAgLy8gaWYgdGhlcmUgYXJlIDx1c2U+cyB0byBwcm9jZXNzLCBwcm9jZWVkLlxuICAgICAgLy8gcmVzZXQgdGhlIGJ5cGFzcyBjb3VudGVyLCBzaW5jZSB0aGUgY291bnRlciB3aWxsIGJlIGluY3JlbWVudGVkIGZvciBldmVyeSBieXBhc3NlZCBlbGVtZW50LFxuICAgICAgLy8gZXZlbiBvbmVzIHRoYXQgd2VyZSBjb3VudGVkIGJlZm9yZS5cbiAgICAgIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA9IDA7XG4gICAgICAvLyB3aGlsZSB0aGUgaW5kZXggZXhpc3RzIGluIHRoZSBsaXZlIDx1c2U+IGNvbGxlY3Rpb25cbiAgICAgIGZvciAoXG4gICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIDx1c2U+IGluZGV4XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGluZGV4IDwgdXNlcy5sZW5ndGg7XG5cbiAgICAgICkge1xuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgPHVzZT5cbiAgICAgICAgdmFyIHVzZSA9IHVzZXNbaW5kZXhdLFxuICAgICAgICAgIHBhcmVudCA9IHVzZS5wYXJlbnROb2RlLFxuICAgICAgICAgIHN2ZyA9IGdldFNWR0FuY2VzdG9yKHBhcmVudCksXG4gICAgICAgICAgc3JjID0gdXNlLmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikgfHwgdXNlLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoIXNyYyAmJlxuICAgICAgICAgICAgb3B0cy5hdHRyaWJ1dGVOYW1lICYmXG4gICAgICAgICAgICAoc3JjID0gdXNlLmdldEF0dHJpYnV0ZShvcHRzLmF0dHJpYnV0ZU5hbWUpKSxcbiAgICAgICAgICBzdmcgJiYgc3JjKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAocG9seWZpbGwpIHtcbiAgICAgICAgICAgIGlmICghb3B0cy52YWxpZGF0ZSB8fCBvcHRzLnZhbGlkYXRlKHNyYywgc3ZnLCB1c2UpKSB7XG4gICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgPHVzZT4gZWxlbWVudFxuICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodXNlKTtcbiAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNyYyBhbmQgZ2V0IHRoZSB1cmwgYW5kIGlkXG4gICAgICAgICAgICAgIHZhciBzcmNTcGxpdCA9IHNyYy5zcGxpdChcIiNcIiksXG4gICAgICAgICAgICAgICAgdXJsID0gc3JjU3BsaXQuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBpZCA9IHNyY1NwbGl0LmpvaW4oXCIjXCIpO1xuICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluayBpcyBleHRlcm5hbFxuICAgICAgICAgICAgICBpZiAodXJsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHhociByZXF1ZXN0XG4gICAgICAgICAgICAgICAgdmFyIHhociA9IHJlcXVlc3RzW3VybF07XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSB4aHIgcmVxdWVzdCBleGlzdHNcbiAgICAgICAgICAgICAgICB4aHIgfHxcbiAgICAgICAgICAgICAgICAgICgoeGhyID0gcmVxdWVzdHNbdXJsXSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpKSxcbiAgICAgICAgICAgICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHVybCksXG4gICAgICAgICAgICAgICAgICB4aHIuc2VuZCgpLFxuICAgICAgICAgICAgICAgICAgKHhoci5fZW1iZWRzID0gW10pKSwgLy8gYWRkIHRoZSBzdmcgYW5kIGlkIGFzIGFuIGl0ZW0gdG8gdGhlIHhociBlbWJlZHMgbGlzdFxuICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBzdmc6IHN2ZyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgfSksIC8vIHByZXBhcmUgdGhlIHhociByZWFkeSBzdGF0ZSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgICAgICAgIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhociwgdXNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBlbWJlZCB0aGUgbG9jYWwgaWQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgICAgZW1iZWQocGFyZW50LCBzdmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSwgdXNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGluZGV4IHdoZW4gdGhlIHByZXZpb3VzIHZhbHVlIHdhcyBub3QgXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICsraW5kZXgsICsrbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICArK2luZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBjb250aW51ZSB0aGUgaW50ZXJ2YWxcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgfVxuICAgIHZhciBwb2x5ZmlsbCxcbiAgICAgIG9wdHMgPSBPYmplY3QocmF3b3B0cyksXG4gICAgICBuZXdlcklFVUEgPSAvXFxiVHJpZGVudFxcL1s1NjddXFxifFxcYk1TSUUgKD86OXwxMClcXC4wXFxiLyxcbiAgICAgIHdlYmtpdFVBID0gL1xcYkFwcGxlV2ViS2l0XFwvKFxcZCspXFxiLyxcbiAgICAgIG9sZGVyRWRnZVVBID0gL1xcYkVkZ2VcXC8xMlxcLihcXGQrKVxcYi8sXG4gICAgICBlZGdlVUEgPSAvXFxiRWRnZVxcLy4oXFxkKylcXGIvLFxuICAgICAgaW5JZnJhbWUgPSB3aW5kb3cudG9wICE9PSB3aW5kb3cuc2VsZjtcbiAgICBwb2x5ZmlsbCA9XG4gICAgICBcInBvbHlmaWxsXCIgaW4gb3B0c1xuICAgICAgICA/IG9wdHMucG9seWZpbGxcbiAgICAgICAgOiBuZXdlcklFVUEudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSB8fFxuICAgICAgICAgIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG9sZGVyRWRnZVVBKSB8fCBbXSlbMV0gPCAxMDU0NyB8fFxuICAgICAgICAgIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHdlYmtpdFVBKSB8fCBbXSlbMV0gPCA1MzcgfHxcbiAgICAgICAgICAoZWRnZVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgaW5JZnJhbWUpO1xuICAgIC8vIGNyZWF0ZSB4aHIgcmVxdWVzdHMgb2JqZWN0XG4gICAgdmFyIHJlcXVlc3RzID0ge30sXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQsXG4gICAgICB1c2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1c2VcIiksXG4gICAgICBudW1iZXJPZlN2Z1VzZUVsZW1lbnRzVG9CeXBhc3MgPSAwO1xuICAgIC8vIGNvbmRpdGlvbmFsbHkgc3RhcnQgdGhlIGludGVydmFsIGlmIHRoZSBwb2x5ZmlsbCBpcyBhY3RpdmVcbiAgICBwb2x5ZmlsbCAmJiBvbmludGVydmFsKCk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0U1ZHQW5jZXN0b3Iobm9kZSkge1xuICAgIGZvciAoXG4gICAgICB2YXIgc3ZnID0gbm9kZTtcbiAgICAgIFwic3ZnXCIgIT09IHN2Zy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICYmIChzdmcgPSBzdmcucGFyZW50Tm9kZSk7XG5cbiAgICApIHt9XG4gICAgcmV0dXJuIHN2ZztcbiAgfVxuICByZXR1cm4gc3ZnNGV2ZXJ5Ym9keTtcbn0pO1xuIiwid2luZG93LnVzd2RzUHJlc2VudCA9IHRydWU7IC8vIEdMT0JBTCB2YXJpYWJsZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c3dkcy5qcyBoYXMgbG9hZGVkIGluIHRoZSBET00uXG5cbi8qKlxuICogVGhlICdwb2x5ZmlsbHMnIGRlZmluZSBrZXkgRUNNQVNjcmlwdCA1IG1ldGhvZHMgdGhhdCBtYXkgYmUgbWlzc2luZyBmcm9tXG4gKiBvbGRlciBicm93c2Vycywgc28gbXVzdCBiZSBsb2FkZWQgZmlyc3QuXG4gKi9cbnJlcXVpcmUoXCIuL3BvbHlmaWxsc1wiKTtcblxuY29uc3QgdXN3ZHMgPSByZXF1aXJlKFwiLi9jb25maWdcIik7XG5cbmNvbnN0IGNvbXBvbmVudHMgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcbmNvbnN0IHN2ZzRldmVyeWJvZHkgPSByZXF1aXJlKFwiLi9wb2x5ZmlsbHMvc3ZnNGV2ZXJ5Ym9keVwiKTtcblxudXN3ZHMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbmNvbnN0IGluaXRDb21wb25lbnRzID0gKCkgPT4ge1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCBiZWhhdmlvciA9IGNvbXBvbmVudHNba2V5XTtcbiAgICBiZWhhdmlvci5vbih0YXJnZXQpO1xuICB9KTtcbiAgc3ZnNGV2ZXJ5Ym9keSgpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRDb21wb25lbnRzLCB7IG9uY2U6IHRydWUgfSk7XG59IGVsc2Uge1xuICBpbml0Q29tcG9uZW50cygpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSB1c3dkcztcbmV4cG9ydHMuaW5pdENvbXBvbmVudHMgPSBpbml0Q29tcG9uZW50cztcbiIsIm1vZHVsZS5leHBvcnRzID0gKGh0bWxEb2N1bWVudCA9IGRvY3VtZW50KSA9PiBodG1sRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoXCJvYmplY3QtYXNzaWduXCIpO1xuY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKFwicmVjZXB0b3IvYmVoYXZpb3JcIik7XG5cbi8qKlxuICogQG5hbWUgc2VxdWVuY2VcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IHNlcSBhbiBhcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm4geyBjbG9zdXJlIH0gY2FsbEhvb2tzXG4gKi9cbi8vIFdlIHVzZSBhIG5hbWVkIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZSB3ZSB3YW50IGl0IHRvIGluaGVyaXQgaXRzIGxleGljYWwgc2NvcGVcbi8vIGZyb20gdGhlIGJlaGF2aW9yIHByb3BzIG9iamVjdCwgbm90IGZyb20gdGhlIG1vZHVsZVxuY29uc3Qgc2VxdWVuY2UgPSAoLi4uc2VxKSA9PlxuICBmdW5jdGlvbiBjYWxsSG9va3ModGFyZ2V0ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHNlcS5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttZXRob2RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+XG4gIEJlaGF2aW9yKFxuICAgIGV2ZW50cyxcbiAgICBhc3NpZ24oXG4gICAgICB7XG4gICAgICAgIG9uOiBzZXF1ZW5jZShcImluaXRcIiwgXCJhZGRcIiksXG4gICAgICAgIG9mZjogc2VxdWVuY2UoXCJ0ZWFyZG93blwiLCBcInJlbW92ZVwiKSxcbiAgICAgIH0sXG4gICAgICBwcm9wc1xuICAgIClcbiAgKTtcbiIsIi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIGV2ZXJ5IFggYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuICogQHBhcmFtICB7bnVtYmVyfSBkZWxheSAtIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBAZXhhbXBsZSBjb25zdCB1cGRhdGVTdGF0dXMgPSBkZWJvdW5jZSgoc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhzdHJpbmcpLCAyMDAwKVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2UoY2FsbGJhY2ssIGRlbGF5ID0gNTAwKSB7XG4gIGxldCB0aW1lciA9IG51bGw7XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSwgZGVsYXkpO1xuICB9O1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoXCJvYmplY3QtYXNzaWduXCIpO1xuY29uc3QgeyBrZXltYXAgfSA9IHJlcXVpcmUoXCJyZWNlcHRvclwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4vYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi9zZWxlY3RcIik7XG5jb25zdCBhY3RpdmVFbGVtZW50ID0gcmVxdWlyZShcIi4vYWN0aXZlLWVsZW1lbnRcIik7XG5cbmNvbnN0IEZPQ1VTQUJMRSA9XG4gICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7XG5cbmNvbnN0IHRhYkhhbmRsZXIgPSAoY29udGV4dCkgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IHNlbGVjdChGT0NVU0FCTEUsIGNvbnRleHQpO1xuICBjb25zdCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgY29uc3QgbGFzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblxuICAvLyBTcGVjaWFsIHJ1bGVzIGZvciB3aGVuIHRoZSB1c2VyIGlzIHRhYmJpbmcgZm9yd2FyZCBmcm9tIHRoZSBsYXN0IGZvY3VzYWJsZSBlbGVtZW50LFxuICAvLyBvciB3aGVuIHRhYmJpbmcgYmFja3dhcmRzIGZyb20gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50XG4gIGZ1bmN0aW9uIHRhYkFoZWFkKGV2ZW50KSB7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQoKSA9PT0gbGFzdFRhYlN0b3ApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0YWJCYWNrKGV2ZW50KSB7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQoKSA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICB9XG4gICAgLy8gVGhpcyBjaGVja3MgaWYgeW91IHdhbnQgdG8gc2V0IHRoZSBpbml0aWFsIGZvY3VzIHRvIGEgY29udGFpbmVyXG4gICAgLy8gaW5zdGVhZCBvZiBhbiBlbGVtZW50IHdpdGhpbiwgYW5kIHRoZSB1c2VyIHRhYnMgYmFjay5cbiAgICAvLyBUaGVuIHdlIHNldCB0aGUgZm9jdXMgdG8gdGhlIGZpcnN0XG4gICAgZWxzZSBpZiAoIWZvY3VzYWJsZUVsZW1lbnRzLmluY2x1ZGVzKGFjdGl2ZUVsZW1lbnQoKSkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZpcnN0VGFiU3RvcCxcbiAgICBsYXN0VGFiU3RvcCxcbiAgICB0YWJBaGVhZCxcbiAgICB0YWJCYWNrLFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY29udGV4dCwgYWRkaXRpb25hbEtleUJpbmRpbmdzID0ge30pID0+IHtcbiAgY29uc3QgdGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihjb250ZXh0KTtcbiAgY29uc3QgYmluZGluZ3MgPSBhZGRpdGlvbmFsS2V5QmluZGluZ3M7XG4gIGNvbnN0IHsgRXNjLCBFc2NhcGUgfSA9IGJpbmRpbmdzO1xuXG4gIGlmIChFc2NhcGUgJiYgIUVzYykgYmluZGluZ3MuRXNjID0gRXNjYXBlO1xuXG4gIC8vICBUT0RPOiBJbiB0aGUgZnV0dXJlLCBsb29wIG92ZXIgYWRkaXRpb25hbCBrZXliaW5kaW5ncyBhbmQgcGFzcyBhbiBhcnJheVxuICAvLyBvZiBmdW5jdGlvbnMsIGlmIG5lY2Vzc2FyeSwgdG8gdGhlIG1hcCBrZXlzLiBUaGVuIHBlb3BsZSBpbXBsZW1lbnRpbmdcbiAgLy8gdGhlIGZvY3VzIHRyYXAgY291bGQgcGFzcyBjYWxsYmFja3MgdG8gZmlyZSB3aGVuIHRhYmJpbmdcbiAgY29uc3Qga2V5TWFwcGluZ3MgPSBrZXltYXAoXG4gICAgYXNzaWduKFxuICAgICAge1xuICAgICAgICBUYWI6IHRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgICAgXCJTaGlmdCtUYWJcIjogdGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgICB9LFxuICAgICAgYWRkaXRpb25hbEtleUJpbmRpbmdzXG4gICAgKVxuICApO1xuXG4gIGNvbnN0IGZvY3VzVHJhcCA9IGJlaGF2aW9yKFxuICAgIHtcbiAgICAgIGtleWRvd246IGtleU1hcHBpbmdzLFxuICAgIH0sXG4gICAge1xuICAgICAgaW5pdCgpIHtcbiAgICAgICAgLy8gVE9ETzogaXMgdGhpcyBkZXNpcmVhYmxlIGJlaGF2aW9yPyBTaG91bGQgdGhlIHRyYXAgYWx3YXlzIGRvIHRoaXMgYnkgZGVmYXVsdCBvciBzaG91bGRcbiAgICAgICAgLy8gdGhlIGNvbXBvbmVudCBnZXR0aW5nIGRlY29yYXRlZCBoYW5kbGUgdGhpcz9cbiAgICAgICAgaWYgKHRhYkV2ZW50SGFuZGxlci5maXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICB0YWJFdmVudEhhbmRsZXIuZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGUoaXNBY3RpdmUpIHtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5vbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBmb2N1c1RyYXA7XG59O1xuIiwiLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzc1NTc0MzNcbmZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoXG4gIGVsLFxuICB3aW4gPSB3aW5kb3csXG4gIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4pIHtcbiAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiAoXG4gICAgcmVjdC50b3AgPj0gMCAmJlxuICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgcmVjdC5ib3R0b20gPD0gKHdpbi5pbm5lckhlaWdodCB8fCBkb2NFbC5jbGllbnRIZWlnaHQpICYmXG4gICAgcmVjdC5yaWdodCA8PSAod2luLmlubmVyV2lkdGggfHwgZG9jRWwuY2xpZW50V2lkdGgpXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50SW5WaWV3cG9ydDtcbiIsIi8vIGlPUyBkZXRlY3Rpb24gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTAzOTg4NS8xNzc3MTBcbmZ1bmN0aW9uIGlzSW9zRGV2aWNlKCkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQb2R8aVBob25lfGlQYWQpL2cpIHx8XG4gICAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSkpICYmXG4gICAgIXdpbmRvdy5NU1N0cmVhbVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW9zRGV2aWNlO1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUgKi9cblxuLyoqXG4gKiBBIHNpbXBsZSBsaWJyYXJ5IHRvIGhlbHAgeW91IGVzY2FwZSBIVE1MIHVzaW5nIHRlbXBsYXRlIHN0cmluZ3MuXG4gKlxuICogSXQncyB0aGUgY291bnRlcnBhcnQgdG8gb3VyIGVzbGludCBcIm5vLXVuc2FmZS1pbm5lcmh0bWxcIiBwbHVnaW4gdGhhdCBoZWxwcyB1c1xuICogYXZvaWQgdW5zYWZlIGNvZGluZyBwcmFjdGljZXMuXG4gKiBBIGZ1bGwgd3JpdGUtdXAgb2YgdGhlIEhvd3MgYW5kIFdoeXMgYXJlIGRvY3VtZW50ZWRcbiAqIGZvciBkZXZlbG9wZXJzIGF0XG4gKiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvRmlyZWZveF9PUy9TZWN1cml0eS9TZWN1cml0eV9BdXRvbWF0aW9uXG4gKiB3aXRoIGFkZGl0aW9uYWwgYmFja2dyb3VuZCBpbmZvcm1hdGlvbiBhbmQgZGVzaWduIGRvY3MgYXRcbiAqICBodHRwczovL3dpa2kubW96aWxsYS5vcmcvVXNlcjpGYnJhdW4vR2FpYS9TYWZlaW5uZXJIVE1MUm9hZG1hcFxuICpcbiAqL1xuXG4hKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufSkoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIFNhbml0aXplciA9IHtcbiAgICBfZW50aXR5OiAvWyY8PlwiJy9dL2csXG5cbiAgICBfZW50aXRpZXM6IHtcbiAgICAgICcmJzogJyZhbXA7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgICdcXCcnOiAnJmFwb3M7JyxcbiAgICAgICcvJzogJyYjeDJGOydcbiAgICB9LFxuXG4gICAgZ2V0RW50aXR5OiBmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIFNhbml0aXplci5fZW50aXRpZXNbc107XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgSFRNTCBmb3IgYWxsIHZhbHVlcyBpbiBhIHRhZ2dlZCB0ZW1wbGF0ZSBzdHJpbmcuXG4gICAgICovXG4gICAgZXNjYXBlSFRNTDogZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzdHJpbmdzW2ldO1xuICAgICAgICBpZiAoaSArIDEgPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzW2kgKyAxXSB8fCAnJztcbiAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKFNhbml0aXplci5fZW50aXR5LFxuICAgICAgICAgICAgU2FuaXRpemVyLmdldEVudGl0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgSFRNTCBhbmQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRvIGJlIHVzZWQgZHVyaW5nIERPTSBpbnNlcnRpb25cbiAgICAgKi9cbiAgICBjcmVhdGVTYWZlSFRNTDogZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICAgIHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApO1xuICAgICAgZm9yICh2YXIgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgdmFsdWVzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVzY2FwZWQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTC5hcHBseShTYW5pdGl6ZXIsXG4gICAgICAgIFtzdHJpbmdzXS5jb25jYXQodmFsdWVzKSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2h0bWw6IGVzY2FwZWQsXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdbb2JqZWN0IFdyYXBwZWRIVE1MT2JqZWN0XSc7XG4gICAgICAgIH0sXG4gICAgICAgIGluZm86ICdUaGlzIGlzIGEgd3JhcHBlZCBIVE1MIG9iamVjdC4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3InK1xuICAgICAgICAgICdnL2VuLVVTL0ZpcmVmb3hfT1MvU2VjdXJpdHkvU2VjdXJpdHlfQXV0b21hdGlvbiBmb3IgbW9yZS4nXG4gICAgICB9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVW53cmFwIHNhZmUgSFRNTCBjcmVhdGVkIGJ5IGNyZWF0ZVNhZmVIVE1MIG9yIGEgY3VzdG9tIHJlcGxhY2VtZW50IHRoYXRcbiAgICAgKiB1bmRlcndlbnQgc2VjdXJpdHkgcmV2aWV3LlxuICAgICAqL1xuICAgIHVud3JhcFNhZmVIVE1MOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB2YXIgaHRtbE9iamVjdHMgPSBuZXcgQXJyYXkoX2xlbik7XG4gICAgICBmb3IgKHZhciBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBodG1sT2JqZWN0c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hcmt1cExpc3QgPSBodG1sT2JqZWN0cy5tYXAoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouX19odG1sO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFya3VwTGlzdC5qb2luKCcnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFNhbml0aXplcjtcblxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICAvLyBDcmVhdGluZyBpbnZpc2libGUgY29udGFpbmVyXG4gIGNvbnN0IG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgb3V0ZXIuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJzsgLy8gZm9yY2luZyBzY3JvbGxiYXIgdG8gYXBwZWFyXG4gIG91dGVyLnN0eWxlLm1zT3ZlcmZsb3dTdHlsZSA9ICdzY3JvbGxiYXInOyAvLyBuZWVkZWQgZm9yIFdpbkpTIGFwcHNcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgLy8gQ3JlYXRpbmcgaW5uZXIgZWxlbWVudCBhbmQgcGxhY2luZyBpdCBpbiB0aGUgY29udGFpbmVyXG4gIGNvbnN0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKTtcbiAgXG4gIC8vIENhbGN1bGF0aW5nIGRpZmZlcmVuY2UgYmV0d2VlbiBjb250YWluZXIncyBmdWxsIHdpZHRoIGFuZCB0aGUgY2hpbGQgd2lkdGhcbiAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBgJHsob3V0ZXIub2Zmc2V0V2lkdGggLSBpbm5lci5vZmZzZXRXaWR0aCl9cHhgO1xuXG4gIC8vIFJlbW92aW5nIHRlbXBvcmFyeSBlbGVtZW50cyBmcm9tIHRoZSBET01cbiAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xufTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbi8qKlxuICogQG5hbWUgaXNFbGVtZW50XG4gKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VsZW1lbnQgPSAodmFsdWUpID0+XG4gIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RPck1hdGNoZXNcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc2VsZWN0b3IsIGNvbnRleHQpID0+IHtcbiAgY29uc3Qgc2VsZWN0aW9uID0gc2VsZWN0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cblxuICBpZiAoaXNFbGVtZW50KGNvbnRleHQpICYmIGNvbnRleHQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICBzZWxlY3Rpb24ucHVzaChjb250ZXh0KTtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3Rpb247XG59O1xuIiwiLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChzZWxlY3RvciwgY29udGV4dCkgPT4ge1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIH1cblxuICBjb25zdCBzZWxlY3Rpb24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZWN0aW9uKTtcbn07XG4iLCIvKipcbiAqIEZsaXBzIGdpdmVuIElOUFVUIGVsZW1lbnRzIGJldHdlZW4gbWFza2VkIChoaWRpbmcgdGhlIGZpZWxkIHZhbHVlKSBhbmQgdW5tYXNrZWRcbiAqIEBwYXJhbSB7QXJyYXkuSFRNTEVsZW1lbnR9IGZpZWxkcyAtIEFuIGFycmF5IG9mIElOUFVUIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgLSBXaGV0aGVyIHRoZSBtYXNrIHNob3VsZCBiZSBhcHBsaWVkLCBoaWRpbmcgdGhlIGZpZWxkIHZhbHVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZpZWxkLCBtYXNrKSA9PiB7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIFwib2ZmXCIpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29ycmVjdFwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBtYXNrID8gXCJwYXNzd29yZFwiIDogXCJ0ZXh0XCIpO1xufTtcbiIsImNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKFwicmVzb2x2ZS1pZC1yZWZzXCIpO1xuY29uc3QgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZShcIi4vdG9nZ2xlLWZpZWxkLW1hc2tcIik7XG5cbmNvbnN0IENPTlRST0xTID0gXCJhcmlhLWNvbnRyb2xzXCI7XG5jb25zdCBQUkVTU0VEID0gXCJhcmlhLXByZXNzZWRcIjtcbmNvbnN0IFNIT1dfQVRUUiA9IFwiZGF0YS1zaG93LXRleHRcIjtcbmNvbnN0IEhJREVfQVRUUiA9IFwiZGF0YS1oaWRlLXRleHRcIjtcblxuLyoqXG4gKiBSZXBsYWNlIHRoZSB3b3JkIFwiU2hvd1wiIChvciBcInNob3dcIikgd2l0aCBcIkhpZGVcIiAob3IgXCJoaWRlXCIpIGluIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dUZXh0XG4gKiBAcmV0dXJuIHtzdHJvbmd9IGhpZGVUZXh0XG4gKi9cbmNvbnN0IGdldEhpZGVUZXh0ID0gKHNob3dUZXh0KSA9PlxuICBzaG93VGV4dC5yZXBsYWNlKC9cXGJTaG93XFxiL2ksIChzaG93KSA9PiBgJHtzaG93WzBdID09PSBcIlNcIiA/IFwiSFwiIDogXCJoXCJ9aWRlYCk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChlbCkgPT4ge1xuICAvLyB0aGlzIGlzIHRoZSAqdGFyZ2V0KiBzdGF0ZTpcbiAgLy8gKiBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGF0dHIgYW5kIGl0J3MgIT09IFwidHJ1ZVwiLCBwcmVzc2VkIGlzIHRydWVcbiAgLy8gKiBvdGhlcndpc2UsIHByZXNzZWQgaXMgZmFsc2VcbiAgY29uc3QgcHJlc3NlZCA9XG4gICAgZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpICYmIGVsLmdldEF0dHJpYnV0ZShQUkVTU0VEKSAhPT0gXCJ0cnVlXCI7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB0b2dnbGVGaWVsZE1hc2soZmllbGQsIHByZXNzZWQpKTtcblxuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShTSE9XX0FUVFIpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFNIT1dfQVRUUiwgZWwudGV4dENvbnRlbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hvd1RleHQgPSBlbC5nZXRBdHRyaWJ1dGUoU0hPV19BVFRSKTtcbiAgY29uc3QgaGlkZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoSElERV9BVFRSKSB8fCBnZXRIaWRlVGV4dChzaG93VGV4dCk7XG5cbiAgZWwudGV4dENvbnRlbnQgPSBwcmVzc2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsImNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICBsZXQgc2FmZUV4cGFuZGVkID0gZXhwYW5kZWQ7XG5cbiAgaWYgKHR5cGVvZiBzYWZlRXhwYW5kZWQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgc2FmZUV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwiZmFsc2VcIjtcbiAgfVxuXG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoRVhQQU5ERUQsIHNhZmVFeHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHRvZ2dsZSB0YXJnZXQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYCk7XG4gIH1cblxuICBpZiAoc2FmZUV4cGFuZGVkKSB7XG4gICAgY29udHJvbHMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gIH0gZWxzZSB7XG4gICAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gc2FmZUV4cGFuZGVkO1xufTtcbiIsImNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcIi4vZGVib3VuY2VcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7UFJFRklYfS1jaGVja2xpc3RfX2l0ZW0tLWNoZWNrZWRgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRlKGVsKSB7XG4gIGNvbnN0IGlkID0gZWwuZGF0YXNldC52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID1cbiAgICBpZC5jaGFyQXQoMCkgPT09IFwiI1wiXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgbGV0IHN0YXR1c1N1bW1hcnkgPSBcIlwiO1xuICBPYmplY3QuZW50cmllcyhlbC5kYXRhc2V0KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJ2YWxpZGF0ZVwiKSkge1xuICAgICAgY29uc3QgdmFsaWRhdG9yTmFtZSA9IGtleS5zdWJzdHIoXCJ2YWxpZGF0ZVwiLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclNlbGVjdG9yID0gYFtkYXRhLXZhbGlkYXRvcj1cIiR7dmFsaWRhdG9yTmFtZX1cIl1gO1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ2hlY2tib3ggPSBjaGVja0xpc3QucXVlcnlTZWxlY3Rvcih2YWxpZGF0b3JTZWxlY3Rvcik7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgY29uc3Qgc3RhdHVzU3VtbWFyeUNvbnRhaW5lciA9IHZhbGlkYXRvclBhcmVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtdmFsaWRhdGlvbi1zdGF0dXNdYFxuICAgICAgKTtcblxuICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbGlkYXRvclBhdHRlcm4udGVzdChlbC52YWx1ZSk7XG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QudG9nZ2xlKENIRUNLRURfQ0xBU1MsIGNoZWNrZWQpO1xuXG4gICAgICBpZiAoIXZhbGlkYXRvckNoZWNrYm94KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdG9yIGNoZWNrYm94IGZvdW5kIGZvcjogXCIke3ZhbGlkYXRvck5hbWV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIHN0YXR1cyByZXBvcnRzIGZvciBjaGVja2xpc3QgaXRlbXNcbiAgICAgIGNvbnN0IHN0YXR1c0NvbXBsZXRlID0gZWwuZGF0YXNldC52YWxpZGF0aW9uQ29tcGxldGUgfHwgXCJzdGF0dXMgY29tcGxldGVcIjtcbiAgICAgIGNvbnN0IHN0YXR1c0luY29tcGxldGUgPVxuICAgICAgICBlbC5kYXRhc2V0LnZhbGlkYXRpb25JbmNvbXBsZXRlIHx8IFwic3RhdHVzIGluY29tcGxldGVcIjtcbiAgICAgIGxldCBjaGVja2JveENvbnRlbnQgPSBgJHt2YWxpZGF0b3JDaGVja2JveC50ZXh0Q29udGVudH0gYDtcblxuICAgICAgaWYgKHZhbGlkYXRvckNoZWNrYm94LmNsYXNzTGlzdC5jb250YWlucyhDSEVDS0VEX0NMQVNTKSkge1xuICAgICAgICBjaGVja2JveENvbnRlbnQgKz0gc3RhdHVzQ29tcGxldGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2JveENvbnRlbnQgKz0gc3RhdHVzSW5jb21wbGV0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gbW92ZSBzdGF0dXMgdXBkYXRlcyB0byBhcmlhLWxhYmVsIG9uIGNoZWNrbGlzdCBpdGVtXG4gICAgICB2YWxpZGF0b3JDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGNoZWNrYm94Q29udGVudCk7XG5cbiAgICAgIC8vIENyZWF0ZSBhIHN1bW1hcnkgb2Ygc3RhdHVzIGZvciBhbGwgY2hlY2tsaXN0IGl0ZW1zXG4gICAgICBzdGF0dXNTdW1tYXJ5ICs9IGAke2NoZWNrYm94Q29udGVudH0uIGA7XG5cbiAgICAgIC8vIEFkZCBzdW1tYXJ5IHRvIHNjcmVlbiByZWFkZXIgc3VtbWFyeSBjb250YWluZXIsIGFmdGVyIGEgZGVsYXlcbiAgICAgIGNvbnN0IHNyVXBkYXRlU3RhdHVzID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLnRleHRDb250ZW50ID0gc3RhdHVzU3VtbWFyeTtcbiAgICAgIH0sIDEwMDApO1xuXG4gICAgICBzclVwZGF0ZVN0YXR1cygpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
