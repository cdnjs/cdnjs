(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../delegate":6,"../delegateAll":7,"object-assign":3}],5:[function(require,module,exports){
"use strict";

module.exports = function compose(functions) {
  return function (e) {
    return functions.some(function (fn) {
      return fn.call(this, e) === false;
    }, this);
  };
};

},{}],6:[function(require,module,exports){
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

},{"element-closest":1}],7:[function(require,module,exports){
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

},{"../compose":5,"../delegate":6}],8:[function(require,module,exports){
"use strict";

module.exports = function ignore(element, fn) {
  return function ignorance(e) {
    if (element !== e.target && !element.contains(e.target)) {
      return fn.call(this, e);
    }
  };
};

},{}],9:[function(require,module,exports){
"use strict";

module.exports = {
  behavior: require('./behavior'),
  delegate: require('./delegate'),
  delegateAll: require('./delegateAll'),
  ignore: require('./ignore'),
  keymap: require('./keymap')
};

},{"./behavior":4,"./delegate":6,"./delegateAll":7,"./ignore":8,"./keymap":10}],10:[function(require,module,exports){
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

},{"keyboardevent-key-polyfill":2}],11:[function(require,module,exports){
"use strict";

module.exports = function once(listener, options) {
  var wrapped = function wrappedOnce(e) {
    e.currentTarget.removeEventListener(e.type, wrapped, options);
    return listener.call(this, e);
  };
  return wrapped;
};

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/toggle-form-input":50}],14:[function(require,module,exports){
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
const BANNER_BUTTON = `.${PREFIX}-banner__button`;
const BUTTON = `.${PREFIX}-accordion__button[aria-controls]:not(${BANNER_BUTTON})`;
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/is-in-viewport":43,"../../uswds-core/src/js/utils/select":48,"../../uswds-core/src/js/utils/toggle":51}],15:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const select = require("../../uswds-core/src/js/utils/select");
const {
  CLICK
} = require("../../uswds-core/src/js/events");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const toggle = require("../../uswds-core/src/js/utils/toggle");
const HEADER = `.${PREFIX}-banner__header`;
const EXPANDED_CLASS = `${PREFIX}-banner__header--expanded`;
const BANNER_BUTTON = `${HEADER} [aria-controls]`;

/**
 * Toggle Banner display and class.
 * @param {Event} event
 */
const toggleBanner = function toggleEl(event) {
  event.preventDefault();
  const trigger = event.target.closest(BANNER_BUTTON);
  toggle(trigger);
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
};
module.exports = behavior({
  [CLICK]: {
    [BANNER_BUTTON]: toggleBanner
  }
}, {
  init(root) {
    select(BANNER_BUTTON, root).forEach(button => {
      const expanded = button.getAttribute(EXPANDED_CLASS) === "true";
      toggle(button, expanded);
    });
  }
});

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select":48,"../../uswds-core/src/js/utils/toggle":51}],16:[function(require,module,exports){
"use strict";

const keymap = require("receptor/keymap");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const ANCHOR_BUTTON = `a[class*="usa-button"]`;
const toggleButton = event => {
  event.preventDefault();
  event.target.click();
};
const anchorButton = behavior({
  keydown: {
    [ANCHOR_BUTTON]: keymap({
      " ": toggleButton
    })
  }
});
module.exports = anchorButton;

},{"../../uswds-core/src/js/utils/behavior":40,"receptor/keymap":10}],17:[function(require,module,exports){
"use strict";

const select = require("../../uswds-core/src/js/utils/select");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const debounce = require("../../uswds-core/src/js/utils/debounce");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const CHARACTER_COUNT_CLASS = `${PREFIX}-character-count`;
const CHARACTER_COUNT = `.${CHARACTER_COUNT_CLASS}`;
const FORM_GROUP_CLASS = `${PREFIX}-form-group`;
const FORM_GROUP_ERROR_CLASS = `${FORM_GROUP_CLASS}--error`;
const FORM_GROUP = `.${FORM_GROUP_CLASS}`;
const LABEL_CLASS = `${PREFIX}-label`;
const LABEL_ERROR_CLASS = `${LABEL_CLASS}--error`;
const INPUT = `.${PREFIX}-character-count__field`;
const INPUT_ERROR_CLASS = `${PREFIX}-input--error`;
const MESSAGE = `.${PREFIX}-character-count__message`;
const VALIDATION_MESSAGE = "The content is too long.";
const MESSAGE_INVALID_CLASS = `${PREFIX}-character-count__status--invalid`;
const STATUS_MESSAGE_CLASS = `${CHARACTER_COUNT_CLASS}__status`;
const STATUS_MESSAGE_SR_ONLY_CLASS = `${CHARACTER_COUNT_CLASS}__sr-status`;
const STATUS_MESSAGE = `.${STATUS_MESSAGE_CLASS}`;
const STATUS_MESSAGE_SR_ONLY = `.${STATUS_MESSAGE_SR_ONLY_CLASS}`;
const DEFAULT_STATUS_LABEL = `characters allowed`;

/**
 * Returns the root, form group, label, and message elements for an character count input
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} inputEl The character count input element
 * @returns {CharacterCountElements} elements The root form group, input ID, label, and message element.
 */
const getCharacterCountElements = inputEl => {
  const characterCountEl = inputEl.closest(CHARACTER_COUNT);
  if (!characterCountEl) {
    throw new Error(`${INPUT} is missing outer ${CHARACTER_COUNT}`);
  }
  const formGroupEl = characterCountEl.querySelector(FORM_GROUP);
  const inputID = inputEl.getAttribute("id");
  const labelEl = document.querySelector(`label[for=${inputID}]`);
  const messageEl = characterCountEl.querySelector(MESSAGE);
  if (!messageEl) {
    throw new Error(`${CHARACTER_COUNT} is missing inner ${MESSAGE}`);
  }
  return {
    characterCountEl,
    formGroupEl,
    inputID,
    labelEl,
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
    characterCountEl,
    labelEl,
    formGroupEl
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
  if (formGroupEl) {
    formGroupEl.classList.toggle(FORM_GROUP_ERROR_CLASS, isOverLimit);
  }
  if (labelEl) {
    labelEl.classList.toggle(LABEL_ERROR_CLASS, isOverLimit);
  }
  inputEl.classList.toggle(INPUT_ERROR_CLASS, isOverLimit);
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
  FORM_GROUP_ERROR_CLASS,
  LABEL_ERROR_CLASS,
  INPUT_ERROR_CLASS,
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/debounce":41,"../../uswds-core/src/js/utils/select":48}],18:[function(require,module,exports){
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
const changeElementValue = (el, value = "") => {
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
 * Check for aria-disabled on initialization
 *
 * @param {HTMLInputElement} el An element within the combo box component
 */
const ariaDisable = el => {
  const {
    inputEl,
    toggleListBtnEl,
    clearInputBtnEl
  } = getComboBoxContext(el);
  clearInputBtnEl.hidden = true;
  clearInputBtnEl.setAttribute("aria-disabled", true);
  toggleListBtnEl.setAttribute("aria-disabled", true);
  inputEl.setAttribute("aria-disabled", true);
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
      <div class="${STATUS_CLASS} usa-sr-only" role="status"></div>`);
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
  if (selectEl.hasAttribute("aria-disabled")) {
    ariaDisable(comboBoxEl);
    selectEl.removeAttribute("aria-disabled");
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
const highlightOption = (el, nextEl, {
  skipFocus,
  preventScroll
} = {}) => {
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
const generateDynamicRegExp = (filter, query = "", extras = {}) => {
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
  let options = [];
  const optionsStartsWith = [];
  const optionsContains = [];
  const optionList = [...selectEl.options];

  /**
   * Builds and sorts options array.
   *
   * Option param is passed through regex test before passing into this function.
   * When filtering is enabled, the array will be sorted by options that start with the query, followed by
   * options that contain the query.
   * When filtering is disabled, all options will be included in the array unsorted.
   *
   * These array items will populate the list that is displayed to the user after a search query is entered.
   * Array attributes are also used to set option IDs and aria-setsize attributes.
   *
   * @param {HTMLOptionElement} option - Option element from select array
   */
  const buildOptionsArray = option => {
    if (disableFiltering || isPristine) {
      options.push(option);
      return;
    }
    const matchStartsWith = option.text.toLowerCase().startsWith(inputValue);
    if (matchStartsWith) {
      optionsStartsWith.push(option);
    } else {
      optionsContains.push(option);
    }
    options = [...optionsStartsWith, ...optionsContains];
  };

  /**
   * Compares option text to query using generated regex filter.
   *
   * @param {HTMLOptionElement} option
   * @returns {boolean} - True when option text matches user input query.
   */
  const optionMatchesQuery = option => regex.test(option.text);

  /**
   * Logic check to determine if options array needs to be updated.
   *
   * @param {HTMLOptionElement} option
   * @returns {boolean} - True when option has value && if filtering is disabled, combo box has an active selection,
   * there is no inputValue, or if option matches user query
   */
  const arrayNeedsUpdate = option => option.value && (disableFiltering || isPristine || !inputValue || optionMatchesQuery(option));

  /**
   * Checks if firstFoundId should be assigned, which is then used to set itemToFocus.
   *
   * @param {HTMLOptionElement} option
   * @return {boolean} - Returns true if filtering is disabled, no firstFoundId is assigned, and the option matches the query.
   */
  const isFirstMatch = option => disableFiltering && !firstFoundId && optionMatchesQuery(option);

  /**
   * Checks if isCurrentSelection should be assigned, which is then used to set itemToFocus.
   *
   * @param {HTMLOptionElement} option
   * @returns {boolean} - Returns true if option.value matches selectEl.value.
   */
  const isCurrentSelection = option => selectEl.value && option.value === selectEl.value;

  /**
   * Update the array of options that should be displayed on the page.
   * Assign an ID to each displayed option.
   * Identify and assign the option that should receive focus.
   */
  optionList.forEach(option => {
    if (arrayNeedsUpdate(option)) {
      buildOptionsArray(option);
      const optionId = `${listOptionBaseId}${options.indexOf(option)}`;
      if (isFirstMatch(option)) {
        firstFoundId = optionId;
      }
      if (isCurrentSelection(option)) {
        selectedItemId = optionId;
      }
    }
  });
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
 * Handle the space event from an list option element within the combo box component.
 *
 * @param {KeyboardEvent} event An event within the combo box component
 */
const handleSpaceFromListOption = event => {
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
      " ": handleSpaceFromListOption,
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/sanitizer":45,"../../uswds-core/src/js/utils/select-or-matches":47,"receptor/keymap":10}],19:[function(require,module,exports){
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
const processFocusableSelectors = (...selectors) => selectors.map(query => query + NOT_DISABLED_SELECTOR).join(", ");
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
 * @typedef {Object} DateRangeContext
 * @property {Date} rangeStartDate
 * @property {Date} rangeEndDate
 * @property {Date} withinRangeStartDate
 * @property {Date} withinRangeEndDate
 */

/**
 * Set the start, end, and within range values for date range variants.

 * @param {Date} date - Date that concludes the date range.
 * @param {Date} rangeDate - Range date data attribute value of the date picker component.
 * @returns {DateRangeContext} - Dates for range selection.
 */
const setRangeDates = (date, rangeDate) => {
  const rangeConclusionDate = date;
  const rangeStartDate = rangeDate && min(rangeConclusionDate, rangeDate);
  const rangeEndDate = rangeDate && max(rangeConclusionDate, rangeDate);
  const withinRangeStartDate = rangeDate && addDays(rangeStartDate, 1);
  const withinRangeEndDate = rangeDate && subDays(rangeEndDate, 1);
  return {
    rangeStartDate,
    rangeEndDate,
    withinRangeStartDate,
    withinRangeEndDate
  };
};

/**
 * Parse a date with format M-D-YY
 *
 * @param {string} dateString the date string to parse
 * @param {string} dateFormat the format of the date string
 * @param {boolean} adjustDate should the date be adjusted
 * @returns {Date} the parsed date
 */
const parseDateString = (dateString, dateFormat = INTERNAL_DATE_FORMAT, adjustDate = false) => {
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
const formatDate = (date, dateFormat = INTERNAL_DATE_FORMAT) => {
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
const changeElementValue = (el, value = "") => {
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
 * Add the readonly attribute to input element and the aria-disabled attribute to the toggle calendar button and external input elements.
 *
 * @param {HTMLElement} el - The date picker element
 */
const ariaDisable = el => {
  const {
    externalInputEl,
    toggleBtnEl
  } = getDatePickerContext(el);
  toggleBtnEl.setAttribute("aria-disabled", true);
  externalInputEl.setAttribute("aria-disabled", true);
  externalInputEl.setAttribute("readonly", "");
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
  toggleBtnEl.removeAttribute("aria-disabled");
  externalInputEl.disabled = false;
  externalInputEl.removeAttribute("aria-disabled");
  externalInputEl.removeAttribute("readonly");
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
    <div class="${DATE_PICKER_CALENDAR_CLASS}" role="application" hidden></div>
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
  if (internalInputEl.hasAttribute("aria-disabled")) {
    ariaDisable(datePickerEl);
    internalInputEl.removeAttribute("aria-disabled");
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
  const {
    rangeStartDate,
    rangeEndDate,
    withinRangeStartDate,
    withinRangeEndDate
  } = setRangeDates(selectedDate || dateToDisplay, rangeDate);
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
            class="${CALENDAR_MONTH_SELECTION_CLASS}" aria-label="${monthLabel}. Select month"
          >${monthLabel}</button>
          <button
            type="button"
            class="${CALENDAR_YEAR_SELECTION_CLASS}" aria-label="${focusedYear}. Select year"
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
    th.setAttribute("scope", "col");
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
  if (el.disabled || el.hasAttribute("aria-disabled")) return;
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
 * Set range date classes without re-rendering the calendar. Called when date button is hovered.
 * Returns early if the date hovered is disabled or if there is already a selected date.
 *
 * @param {HTMLElement} dateEl - Calendar date button within the date picker component.
 */

const handleMouseoverFromDate = dateEl => {
  if (dateEl.disabled) return;
  const hoverDate = parseDateString(dateEl.dataset.value);
  const {
    calendarEl,
    selectedDate,
    rangeDate
  } = getDatePickerContext(dateEl);
  if (selectedDate) return;
  const {
    withinRangeStartDate,
    withinRangeEndDate
  } = setRangeDates(hoverDate, rangeDate);
  const dateButtons = calendarEl.querySelectorAll(`.${CALENDAR_DATE_CURRENT_MONTH_CLASS}`);
  dateButtons.forEach(button => {
    const buttonDate = parseDateString(button.dataset.value);
    if (isDateWithinMinAndMax(buttonDate, withinRangeStartDate, withinRangeEndDate)) {
      button.classList.add(CALENDAR_DATE_WITHIN_RANGE_CLASS);
    } else {
      button.classList.remove(CALENDAR_DATE_WITHIN_RANGE_CLASS);
    }
  });
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
  ariaDisable,
  enable,
  isDateInputInvalid,
  setCalendarValue,
  validateDateInput,
  renderCalendar,
  updateCalendarIfVisible
});

// #endregion Date Picker Event Delegation Registration / Component

module.exports = datePicker;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/active-element":39,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/is-ios-device":44,"../../uswds-core/src/js/utils/sanitizer":45,"../../uswds-core/src/js/utils/select":48,"../../uswds-core/src/js/utils/select-or-matches":47,"receptor/keymap":10}],20:[function(require,module,exports){
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

},{"../../usa-date-picker/src/index":19,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select":48,"../../uswds-core/src/js/utils/select-or-matches":47}],21:[function(require,module,exports){
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
const INVALID_FILE_CLASS = "has-invalid-file";
const GENERIC_PREVIEW_CLASS_NAME = `${PREFIX}-file-input__preview-image`;
const GENERIC_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--generic`;
const PDF_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--pdf`;
const WORD_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--word`;
const VIDEO_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--video`;
const EXCEL_PREVIEW_CLASS = `${GENERIC_PREVIEW_CLASS_NAME}--excel`;
const SR_ONLY_CLASS = `${PREFIX}-sr-only`;
const SPACER_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
let TYPE_IS_VALID = Boolean(true); // logic gate for change listener
let DEFAULT_ARIA_LABEL_TEXT = "";
let DEFAULT_FILE_STATUS_TEXT = "";

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
};

/**
 * Set aria-disabled attribute to file input component
 *
 * @param {HTMLElement} el An element within the file input component
 */
const ariaDisable = el => {
  const {
    dropZoneEl
  } = getFileInputContext(el);
  dropZoneEl.classList.add(DISABLED_CLASS);
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
 * Determines if the singular or plural item label should be used
 * Determination is based on the presence of the `multiple` attribute
 *
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @returns {HTMLDivElement} The singular or plural version of "item"
 */
const getItemsLabel = fileInputEl => {
  const acceptsMultiple = fileInputEl.hasAttribute("multiple");
  const itemsLabel = acceptsMultiple ? "files" : "file";
  return itemsLabel;
};

/**
 * Scaffold the file input component with a parent wrapper and
 * Create a target area overlay for drag and drop functionality
 *
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @returns {HTMLDivElement} The drag and drop target area.
 */
const createTargetArea = fileInputEl => {
  const fileInputParent = document.createElement("div");
  const dropTarget = document.createElement("div");
  const box = document.createElement("div");

  // Adds class names and other attributes
  fileInputEl.classList.remove(DROPZONE_CLASS);
  fileInputEl.classList.add(INPUT_CLASS);
  fileInputParent.classList.add(DROPZONE_CLASS);
  box.classList.add(BOX_CLASS);
  dropTarget.classList.add(TARGET_CLASS);

  // Adds child elements to the DOM
  dropTarget.prepend(box);
  fileInputEl.parentNode.insertBefore(dropTarget, fileInputEl);
  fileInputEl.parentNode.insertBefore(fileInputParent, dropTarget);
  dropTarget.appendChild(fileInputEl);
  fileInputParent.appendChild(dropTarget);
  return dropTarget;
};

/**
 * Build the visible element with default interaction instructions.
 *
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @returns {HTMLDivElement} The container for visible interaction instructions.
 */
const createVisibleInstructions = fileInputEl => {
  const fileInputParent = fileInputEl.closest(DROPZONE);
  const itemsLabel = getItemsLabel(fileInputEl);
  const instructions = document.createElement("div");
  const dragText = `Drag ${itemsLabel} here or`;
  const chooseText = "choose from folder";

  // Create instructions text for aria-label
  DEFAULT_ARIA_LABEL_TEXT = `${dragText} ${chooseText}`;

  // Adds class names and other attributes
  instructions.classList.add(INSTRUCTIONS_CLASS);
  instructions.setAttribute("aria-hidden", "true");

  // Add initial instructions for input usage
  fileInputEl.setAttribute("aria-label", DEFAULT_ARIA_LABEL_TEXT);
  instructions.innerHTML = Sanitizer.escapeHTML`<span class="${DRAG_TEXT_CLASS}">${dragText}</span> <span class="${CHOOSE_CLASS}">${chooseText}</span>`;

  // Add the instructions element to the DOM
  fileInputEl.parentNode.insertBefore(instructions, fileInputEl);

  // IE11 and Edge do not support drop files on file inputs, so we've removed text that indicates that
  if (/rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
    fileInputParent.querySelector(`.${DRAG_TEXT_CLASS}`).outerHTML = "";
  }
  return instructions;
};

/**
 * Build a screen reader-only message element that contains file status updates and
 * Create and set the default file status message
 *
 * @param {HTMLInputElement} fileInputEl - The input element.
 */
const createSROnlyStatus = fileInputEl => {
  const statusEl = document.createElement("div");
  const itemsLabel = getItemsLabel(fileInputEl);
  const fileInputParent = fileInputEl.closest(DROPZONE);
  const fileInputTarget = fileInputEl.closest(`.${TARGET_CLASS}`);
  DEFAULT_FILE_STATUS_TEXT = `No ${itemsLabel} selected.`;

  // Adds class names and other attributes
  statusEl.classList.add(SR_ONLY_CLASS);
  statusEl.setAttribute("aria-live", "polite");

  // Add initial file status message
  statusEl.textContent = DEFAULT_FILE_STATUS_TEXT;

  // Add the status element to the DOM
  fileInputParent.insertBefore(statusEl, fileInputTarget);
};

/**
 * Scaffold the component with all required elements
 *
 * @param {HTMLInputElement} fileInputEl - The original input element.
 */
const enhanceFileInput = fileInputEl => {
  const isInputDisabled = fileInputEl.hasAttribute("aria-disabled") || fileInputEl.hasAttribute("disabled");
  const dropTarget = createTargetArea(fileInputEl);
  const instructions = createVisibleInstructions(fileInputEl);
  const {
    dropZoneEl
  } = getFileInputContext(fileInputEl);
  if (isInputDisabled) {
    dropZoneEl.classList.add(DISABLED_CLASS);
  } else {
    createSROnlyStatus(fileInputEl);
  }
  return {
    instructions,
    dropTarget
  };
};

/**
 * Removes image previews
 * We want to start with a clean list every time files are added to the file input
 *
 * @param {HTMLDivElement} dropTarget - The drag and drop target area.
 * @param {HTMLDivElement} instructions - The container for visible interaction instructions.
 */
const removeOldPreviews = (dropTarget, instructions) => {
  const filePreviews = dropTarget.querySelectorAll(`.${PREVIEW_CLASS}`);
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
      instructions.removeAttribute("hidden");
    }
    Array.prototype.forEach.call(filePreviews, removeImages);
  }
};

/**
 * Update the screen reader-only status message after interaction
 *
 * @param {HTMLDivElement} statusElement - The screen reader-only container for file status updates.
 * @param {Object} fileNames - The selected files found in the fileList object.
 * @param {Array} fileStore - The array of uploaded file names created from the fileNames object.
 */
const updateStatusMessage = (statusElement, fileNames, fileStore) => {
  const statusEl = statusElement;
  let statusMessage = DEFAULT_FILE_STATUS_TEXT;

  // If files added, update the status message with file name(s)
  if (fileNames.length === 1) {
    statusMessage = `You have selected the file: ${fileStore}`;
  } else if (fileNames.length > 1) {
    statusMessage = `You have selected ${fileNames.length} files: ${fileStore.join(", ")}`;
  }

  // Add delay to encourage screen reader readout
  setTimeout(() => {
    statusEl.textContent = statusMessage;
  }, 1000);
};

/**
 * Show the preview heading, hide the initial instructions and
 * Update the aria-label with new instructions text
 *
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @param {Object} fileNames - The selected files found in the fileList object.
 */
const addPreviewHeading = (fileInputEl, fileNames) => {
  const filePreviewsHeading = document.createElement("div");
  const dropTarget = fileInputEl.closest(`.${TARGET_CLASS}`);
  const instructions = dropTarget.querySelector(`.${INSTRUCTIONS_CLASS}`);
  let changeItemText = "Change file";
  let previewHeadingText = "";
  if (fileNames.length === 1) {
    previewHeadingText = Sanitizer.escapeHTML`Selected file <span class="usa-file-input__choose">${changeItemText}</span>`;
  } else if (fileNames.length > 1) {
    changeItemText = "Change files";
    previewHeadingText = Sanitizer.escapeHTML`${fileNames.length} files selected <span class="usa-file-input__choose">${changeItemText}</span>`;
  }

  // Hides null state content and sets preview heading
  instructions.setAttribute("hidden", "true");
  filePreviewsHeading.classList.add(PREVIEW_HEADING_CLASS);
  filePreviewsHeading.innerHTML = previewHeadingText;
  dropTarget.insertBefore(filePreviewsHeading, instructions);

  // Update aria label to match the visible action text
  fileInputEl.setAttribute("aria-label", changeItemText);
};

/** Add an error listener to the image preview to set a fallback image
 * @param {HTMLImageElement} previewImage - The image element
 * @param {String} fallbackClass - The CSS class of the fallback image
 */
const setPreviewFallback = (previewImage, fallbackClass) => {
  previewImage.addEventListener("error", () => {
    const localPreviewImage = previewImage; // to avoid no-param-reassign from ESLint
    localPreviewImage.src = SPACER_GIF;
    localPreviewImage.classList.add(fallbackClass);
  }, {
    once: true
  });
};

/**
 * When new files are applied to file input, this function generates previews
 * and removes old ones.
 *
 * @param {event} e
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @param {HTMLDivElement} instructions - The container for visible interaction instructions.
 * @param {HTMLDivElement} dropTarget - The drag and drop target area.
 */

const handleChange = (e, fileInputEl, instructions, dropTarget) => {
  const fileNames = e.target.files;
  const inputParent = dropTarget.closest(`.${DROPZONE_CLASS}`);
  const statusElement = inputParent.querySelector(`.${SR_ONLY_CLASS}`);
  const fileStore = [];

  // First, get rid of existing previews
  removeOldPreviews(dropTarget, instructions);

  // Then, iterate through files list and create previews
  for (let i = 0; i < fileNames.length; i += 1) {
    const reader = new FileReader();
    const fileName = fileNames[i].name;
    let imageId;

    // Push updated file names into the store array
    fileStore.push(fileName);

    // Starts with a loading image while preview is created
    reader.onloadstart = function createLoadingImage() {
      imageId = createUniqueID(makeSafeForID(fileName));
      instructions.insertAdjacentHTML("afterend", Sanitizer.escapeHTML`<div class="${PREVIEW_CLASS}" aria-hidden="true">
          <img id="${imageId}" src="${SPACER_GIF}" alt="" class="${GENERIC_PREVIEW_CLASS_NAME} ${LOADING_CLASS}"/>${fileName}
        <div>`);
    };

    // Not all files will be able to generate previews. In case this happens, we provide several types "generic previews" based on the file extension.
    reader.onloadend = function createFilePreview() {
      const previewImage = document.getElementById(imageId);
      const fileExtension = fileName.split(".").pop();
      if (fileExtension === "pdf") {
        setPreviewFallback(previewImage, PDF_PREVIEW_CLASS);
      } else if (fileExtension === "doc" || fileExtension === "docx" || fileExtension === "pages") {
        setPreviewFallback(previewImage, WORD_PREVIEW_CLASS);
      } else if (fileExtension === "xls" || fileExtension === "xlsx" || fileExtension === "numbers") {
        setPreviewFallback(previewImage, EXCEL_PREVIEW_CLASS);
      } else if (fileExtension === "mov" || fileExtension === "mp4") {
        setPreviewFallback(previewImage, VIDEO_PREVIEW_CLASS);
      } else {
        setPreviewFallback(previewImage, GENERIC_PREVIEW_CLASS);
      }

      // Removes loader and displays preview
      previewImage.classList.remove(LOADING_CLASS);
      previewImage.src = reader.result;
    };
    if (fileNames[i]) {
      reader.readAsDataURL(fileNames[i]);
    }
  }
  if (fileNames.length === 0) {
    // Reset input aria-label with default message
    fileInputEl.setAttribute("aria-label", DEFAULT_ARIA_LABEL_TEXT);
  } else {
    addPreviewHeading(fileInputEl, fileNames);
  }
  updateStatusMessage(statusElement, fileNames, fileStore);
};

/**
 * When using an Accept attribute, invalid files will be hidden from
 * file browser, but they can still be dragged to the input. This
 * function prevents them from being dragged and removes error states
 * when correct files are added.
 *
 * @param {event} e
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @param {HTMLDivElement} instructions - The container for visible interaction instructions.
 * @param {HTMLDivElement} dropTarget - The drag and drop target area.
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
 *
 * @param {event} event
 * @param {HTMLInputElement} fileInputEl - The input element.
 * @param {HTMLDivElement} instructions - The container for visible interaction instructions.
 * @param {HTMLDivElement} dropTarget - The drag and drop target area.
 */
const handleUpload = (event, fileInputEl, instructions, dropTarget) => {
  preventInvalidFiles(event, fileInputEl, instructions, dropTarget);
  if (TYPE_IS_VALID === true) {
    handleChange(event, fileInputEl, instructions, dropTarget);
  }
};
const fileInput = behavior({}, {
  init(root) {
    selectOrMatches(DROPZONE, root).forEach(fileInputEl => {
      const {
        instructions,
        dropTarget
      } = enhanceFileInput(fileInputEl);
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
  ariaDisable,
  enable
});
module.exports = fileInput;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/sanitizer":45,"../../uswds-core/src/js/utils/select-or-matches":47}],22:[function(require,module,exports){
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40}],23:[function(require,module,exports){
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
// Detect Safari
// Note: Chrome also reports the Safari userAgent so this specifically excludes Chrome.
const isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
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

/**
 * Detect Safari and add body class for a Safari-only CSS bug fix.
 * More details in https://github.com/uswds/uswds/pull/5443
 */
const addSafariClass = () => {
  if (isSafari) {
    document.body.classList.add("is-safari");
  }
};

/**
 * Set the value for the --scrolltop CSS var when the mobile menu is open.
 * This allows the CSS to lock the current scroll position in Safari
 * when overflow-y is set to scroll.
 * More details in https://github.com/uswds/uswds/pull/5443
 */
const setSafariScrollPosition = body => {
  const currentScrollPosition = `-${window.scrollY}px`;
  if (isSafari) {
    body.style.setProperty("--scrolltop", currentScrollPosition);
  }
};
const toggleNav = active => {
  const {
    body
  } = document;
  const safeActive = typeof active === "boolean" ? active : !isActive();
  setSafariScrollPosition(body);
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
    addSafariClass();
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

},{"../../usa-accordion/src/index":14,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/focus-trap":42,"../../uswds-core/src/js/utils/scrollbar-width":46,"../../uswds-core/src/js/utils/select":48,"../../uswds-core/src/js/utils/toggle":51,"receptor/keymap":10}],24:[function(require,module,exports){
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
const IN_PAGE_NAV_HEADINGS = "h2 h3";
const IN_PAGE_NAV_VALID_HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
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
const IN_PAGE_NAV_PRIMARY_ITEM_CLASS = `${IN_PAGE_NAV_ITEM_CLASS}--primary`;
const IN_PAGE_NAV_LINK_CLASS = `${IN_PAGE_NAV_CLASS}__link`;
const IN_PAGE_NAV_TITLE_CLASS = `${IN_PAGE_NAV_CLASS}__heading`;
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
 * Return an array of the designated heading types found in the designated content region.
 * Throw an error if an invalid header element is designated.
 *
 * @param {HTMLElement} selectedContentRegion The content region the component should pull headers from
 * @param {String} selectedHeadingTypes The list of heading types that should be included in the nav list
 *
 * @return {Array} - An array of designated heading types from the designated content region
 */
const createSectionHeadingsArray = (selectedContentRegion, selectedHeadingTypes) => {
  // Convert designated headings list to an array
  const selectedHeadingTypesArray = selectedHeadingTypes.indexOf(" ") ? selectedHeadingTypes.split(" ") : selectedHeadingTypes;
  const contentRegion = document.querySelector(selectedContentRegion);
  selectedHeadingTypesArray.forEach(headingType => {
    if (!IN_PAGE_NAV_VALID_HEADINGS.includes(headingType)) {
      throw new Error(`In-page navigation: data-heading-elements attribute defined with an invalid heading type: "${headingType}".
        Define the attribute with one or more of the following: "${IN_PAGE_NAV_VALID_HEADINGS}".
        Do not use commas or other punctuation in the attribute definition.`);
    }
  });
  const sectionHeadingsArray = Array.from(contentRegion.querySelectorAll(selectedHeadingTypesArray));
  return sectionHeadingsArray;
};

/**
 * Return an array of the visible headings from sectionHeadingsArray.
 * This function removes headings that are hidden with display:none or visibility:none style rules.
 * These items will be added to the component nav list.
 *
 * @param {HTMLElement} selectedContentRegion The content region the component should pull headers from
 * @param {String} selectedHeadingTypes The list of heading types that should be included in the nav list
 *
 * @return {Array} - An array of visible headings from the designated content region
 */
const getVisibleSectionHeadings = (selectedContentRegion, selectedHeadingTypes) => {
  const sectionHeadings = createSectionHeadingsArray(selectedContentRegion, selectedHeadingTypes);

  // Find all headings with hidden styling and remove them from the array
  const visibleSectionHeadings = sectionHeadings.filter(heading => {
    const headingStyle = window.getComputedStyle(heading);
    const visibleHeading = headingStyle.getPropertyValue("display") !== "none" && headingStyle.getPropertyValue("visibility") !== "hidden";
    return visibleHeading;
  });
  return visibleSectionHeadings;
};

/**
 * Return the highest-level header tag included in the link list
 *
 * @param {HTMLElement} sectionHeadings The array of headings selected for inclusion in the link list
 *
 * @return {tagName} - The tag name for the highest level of header in the link list
 */

const getTopLevelHeading = sectionHeadings => {
  const topHeading = sectionHeadings[0].tagName.toLowerCase();
  return topHeading;
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
  const inPageNavContentSelector = Sanitizer.escapeHTML`${inPageNavEl.dataset.mainContentSelector || MAIN_ELEMENT}`;
  const inPageNavHeadingSelector = Sanitizer.escapeHTML`${inPageNavEl.dataset.headingElements || IN_PAGE_NAV_HEADINGS}`;
  const options = {
    root: null,
    rootMargin: inPageNavRootMargin,
    threshold: [inPageNavThreshold]
  };
  const sectionHeadings = getVisibleSectionHeadings(inPageNavContentSelector, inPageNavHeadingSelector);
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
    const topHeadingLevel = getTopLevelHeading(sectionHeadings);
    const headingId = getHeadingId(el);
    listItem.classList.add(IN_PAGE_NAV_ITEM_CLASS);
    if (tag === topHeadingLevel) {
      listItem.classList.add(IN_PAGE_NAV_PRIMARY_ITEM_CLASS);
    }
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
  const elementToScrollTo = document.getElementById(el.hash.slice(1));
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/sanitizer":45,"../../uswds-core/src/js/utils/select-or-matches":47,"receptor/keymap":10,"receptor/once":11}],25:[function(require,module,exports){
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
  input.parentNode.insertBefore(shell, input);
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select-or-matches":47}],26:[function(require,module,exports){
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

},{"../../usa-accordion/src/index":14,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/focus-trap":42,"../../uswds-core/src/js/utils/toggle":51,"receptor/keymap":10}],27:[function(require,module,exports){
"use strict";

const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const FocusTrap = require("../../uswds-core/src/js/utils/focus-trap");
const ScrollBarWidth = require("../../uswds-core/src/js/utils/scrollbar-width");
const behavior = require("../../uswds-core/src/js/utils/behavior");
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
let INITIAL_BODY_PADDING;
let TEMPORARY_BODY_PADDING;
const isActive = () => document.body.classList.contains(ACTIVE_CLASS);
const SCROLLBAR_WIDTH = ScrollBarWidth();

/**
 *  Closes modal when bound to a button and pressed.
 */
const onMenuClose = () => {
  modal.toggleModal.call(modal, false);
};

/**
 * Set the value for temporary body padding that will be applied when the modal is open.
 * Value is created by checking for initial body padding and adding the width of the scrollbar.
 */
const setTemporaryBodyPadding = () => {
  INITIAL_BODY_PADDING = window.getComputedStyle(document.body).getPropertyValue("padding-right");
  TEMPORARY_BODY_PADDING = `${parseInt(INITIAL_BODY_PADDING.replace(/px/, ""), 10) + parseInt(SCROLLBAR_WIDTH.replace(/px/, ""), 10)}px`;
};

/**
 *  Toggle the visibility of a modal window
 *
 * @param {KeyboardEvent} event the keydown event.
 * @returns {boolean} safeActive if mobile is open.
 */
function toggleModal(event) {
  let originalOpener;
  let clickedElement = event.target;
  const {
    body
  } = document;
  const safeActive = !isActive();
  const modalId = clickedElement ? clickedElement.getAttribute("aria-controls") : document.querySelector(`.${WRAPPER_CLASSNAME}.${VISIBLE_CLASS}`);
  const targetModal = safeActive ? document.getElementById(modalId) : document.querySelector(`.${WRAPPER_CLASSNAME}.${VISIBLE_CLASS}`);

  // if there is no modal we return early
  if (!targetModal) {
    return false;
  }
  const openFocusEl = targetModal.querySelector(INITIAL_FOCUS) ? targetModal.querySelector(INITIAL_FOCUS) : targetModal.querySelector(`.${MODAL_CLASSNAME}`);
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

  // Temporarily increase body padding to include the width of the scrollbar.
  // This accounts for the content shift when the scrollbar is removed on modal open.
  if (body.style.paddingRight === TEMPORARY_BODY_PADDING) {
    body.style.removeProperty("padding-right");
  } else {
    body.style.paddingRight = TEMPORARY_BODY_PADDING;
  }

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
 * Creates a placeholder with data attributes for cleanup function.
 * The cleanup function uses this placeholder to easily restore the original Modal HTML on teardown.
 *
 * @param {HTMLDivElement} baseComponent - Modal HTML from the DOM.
 * @returns {HTMLDivElement} Placeholder used for cleanup function.
 */
const createPlaceHolder = baseComponent => {
  const modalID = baseComponent.getAttribute("id");
  const originalLocationPlaceHolder = document.createElement("div");
  const modalAttributes = Array.from(baseComponent.attributes);
  setTemporaryBodyPadding();
  originalLocationPlaceHolder.setAttribute(`data-placeholder-for`, modalID);
  originalLocationPlaceHolder.style.display = "none";
  originalLocationPlaceHolder.setAttribute("aria-hidden", "true");
  modalAttributes.forEach(attribute => {
    originalLocationPlaceHolder.setAttribute(`data-original-${attribute.name}`, attribute.value);
  });
  return originalLocationPlaceHolder;
};

/**
 * Moves necessary attributes from Modal HTML to wrapper element.
 *
 * @param {HTMLDivElement} baseComponent - Modal HTML in the DOM.
 * @param {HTMLDivElement} modalContentWrapper - Modal component wrapper element.
 * @returns Modal wrapper with correct attributes.
 */
const setModalAttributes = (baseComponent, modalContentWrapper) => {
  const modalID = baseComponent.getAttribute("id");
  const ariaLabelledBy = baseComponent.getAttribute("aria-labelledby");
  const ariaDescribedBy = baseComponent.getAttribute("aria-describedby");
  const forceUserAction = baseComponent.hasAttribute(FORCE_ACTION_ATTRIBUTE);
  if (!ariaLabelledBy) throw new Error(`${modalID} is missing aria-labelledby attribute`);
  if (!ariaDescribedBy) throw new Error(`${modalID} is missing aria-desribedby attribute`);

  // Set attributes
  modalContentWrapper.setAttribute("role", "dialog");
  modalContentWrapper.setAttribute("id", modalID);
  modalContentWrapper.setAttribute("aria-labelledby", ariaLabelledBy);
  modalContentWrapper.setAttribute("aria-describedby", ariaDescribedBy);
  if (forceUserAction) {
    modalContentWrapper.setAttribute(FORCE_ACTION_ATTRIBUTE, forceUserAction);
  }

  // Add aria-controls
  const modalClosers = modalContentWrapper.querySelectorAll(CLOSERS);
  modalClosers.forEach(el => {
    el.setAttribute("aria-controls", modalID);
  });

  // Update the base element HTML
  baseComponent.removeAttribute("id");
  baseComponent.removeAttribute("aria-labelledby");
  baseComponent.removeAttribute("aria-describedby");
  baseComponent.setAttribute("tabindex", "-1");
  return modalContentWrapper;
};

/**
 * Creates a hidden modal content wrapper.
 * Rebuilds the original Modal HTML in the new wrapper and adds a page overlay.
 * Then moves original Modal HTML attributes to the new wrapper.
 *
 * @param {HTMLDivElement} baseComponent - Original Modal HTML in the DOM.
 * @returns Modal component - Modal wrapper w/ nested Overlay and Modal Content.
 */
const rebuildModal = baseComponent => {
  const modalContent = baseComponent;
  const modalContentWrapper = document.createElement("div");
  const overlayDiv = document.createElement("div");

  // Add classes
  modalContentWrapper.classList.add(HIDDEN_CLASS, WRAPPER_CLASSNAME);
  overlayDiv.classList.add(OVERLAY_CLASSNAME);

  // Rebuild the modal element
  modalContentWrapper.append(overlayDiv);
  overlayDiv.append(modalContent);

  // Add attributes
  setModalAttributes(modalContent, modalContentWrapper);
  return modalContentWrapper;
};

/**
 *  Builds modal window from base HTML and appends to the end of the DOM.
 *
 * @param {HTMLDivElement} baseComponent - The modal div element in the DOM.
 */
const setUpModal = baseComponent => {
  const modalID = baseComponent.getAttribute("id");
  if (!modalID) {
    throw new Error(`Modal markup is missing ID`);
  }

  // Create placeholder where modal is for cleanup
  const originalLocationPlaceHolder = createPlaceHolder(baseComponent);
  baseComponent.after(originalLocationPlaceHolder);

  // Build modal component
  const modalComponent = rebuildModal(baseComponent);

  // Move all modals to the end of the DOM. Doing this allows us to
  // more easily find the elements to hide from screen readers
  // when the modal is open.
  document.body.appendChild(modalComponent);
};

/**
 * Removes dynamically created Modal and Wrapper elements and restores original Modal HTML.
 *
 * @param {HTMLDivElement} baseComponent - The modal div element in the DOM.
 */
const cleanUpModal = baseComponent => {
  const modalContent = baseComponent;
  const modalContentWrapper = modalContent.parentElement.parentElement;
  const modalID = modalContentWrapper.getAttribute("id");

  // if there is no modalID, return early
  if (!modalID) {
    return;
  }
  const originalLocationPlaceHolder = document.querySelector(`[data-placeholder-for="${modalID}"]`);
  if (originalLocationPlaceHolder) {
    const modalAttributes = Array.from(originalLocationPlaceHolder.attributes);
    modalAttributes.forEach(attribute => {
      if (attribute.name.startsWith("data-original-")) {
        // data-original- is 14 long
        modalContent.setAttribute(attribute.name.substr(14), attribute.value);
      }
    });
    originalLocationPlaceHolder.after(modalContent);
    originalLocationPlaceHolder.parentElement.removeChild(originalLocationPlaceHolder);
  }
  modalContentWrapper.parentElement.removeChild(modalContentWrapper);
};
modal = behavior({}, {
  init(root) {
    selectOrMatches(MODAL, root).forEach(modalWindow => {
      const modalId = modalWindow.id;
      setUpModal(modalWindow);

      // Query all openers and closers including the overlay
      selectOrMatches(`[aria-controls="${modalId}"]`, document).forEach(modalTrigger => {
        // If modalTrigger is an anchor...
        if (modalTrigger.nodeName === "A") {
          // Turn anchor links into buttons for screen readers
          modalTrigger.setAttribute("role", "button");

          // Prevent modal triggers from acting like links
          modalTrigger.addEventListener("click", e => e.preventDefault());
        }

        // Can uncomment when aria-haspopup="dialog" is supported
        // https://a11ysupport.io/tech/aria/aria-haspopup_attribute
        // Most screen readers support aria-haspopup, but might announce
        // as opening a menu if "dialog" is not supported.
        // modalTrigger.setAttribute("aria-haspopup", "dialog");

        modalTrigger.addEventListener("click", toggleModal);
      });
    });
  },
  teardown(root) {
    selectOrMatches(MODAL, root).forEach(modalWindow => {
      const modalId = modalWindow.id;
      cleanUpModal(modalWindow);
      selectOrMatches(`[aria-controls="${modalId}"]`, document).forEach(modalTrigger => modalTrigger.removeEventListener("click", toggleModal));
    });
  },
  focusTrap: null,
  toggleModal
});
module.exports = modal;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/focus-trap":42,"../../uswds-core/src/js/utils/scrollbar-width":46,"../../uswds-core/src/js/utils/select-or-matches":47}],28:[function(require,module,exports){
"use strict";

const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const RANGE_CLASSNAME = `${PREFIX}-range`;
const RANGE = `.${RANGE_CLASSNAME}`;

/**
 * Update range callout for screen readers using the optional data attributes.
 *
 * Get optional data attributes, construct and appends aria-valuetext attribute.
 *
 * @example
 *
 * <input id="usa-range" class="usa-range" type="range" min="0" max="100" step="10" value="20" data-text-unit="degrees">
 *
 * Callout returns "20 degrees of 100."
 *
 * <input id="usa-range" class="usa-range" type="range" min="0" max="100" step="10" value="20" data-text-preposition="de">
 *
 * Callout returns "20 de 100."
 *
 * @param {HTMLInputElement} targetRange - The range slider input element
 */
const updateCallout = targetRange => {
  const rangeSlider = targetRange;
  const defaultPrep = "of";
  const optionalPrep = rangeSlider.dataset.textPreposition;
  const prep = optionalPrep || defaultPrep;
  const unit = rangeSlider.dataset.textUnit;
  const val = rangeSlider.value;
  // Note: 100 is the max attribute's native default value on range inputs
  // Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#validation
  const max = rangeSlider.getAttribute("max") || 100;
  let callout;
  if (unit) {
    callout = `${val} ${unit} ${prep} ${max}`;
  } else {
    callout = `${val} ${prep} ${max}`;
  }
  rangeSlider.setAttribute("aria-valuetext", callout);
};
const rangeEvents = {
  change: {
    [RANGE]() {
      updateCallout(this);
    }
  }
};
const range = behavior(rangeEvents, {
  init(root) {
    selectOrMatches(RANGE, root).forEach(rangeSlider => {
      updateCallout(rangeSlider);
    });
  },
  updateCallout
});
module.exports = range;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select-or-matches":47}],29:[function(require,module,exports){
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

},{"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select":48,"receptor/ignore":8}],30:[function(require,module,exports){
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"receptor/once":11}],31:[function(require,module,exports){
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
  const headerLabel = `${headerName}, sortable column, currently ${isSorted ? `${sortedAscending ? `sorted ${ASCENDING}` : `sorted ${DESCENDING}`}` : "unsorted"}`;
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/events":36,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/sanitizer":45,"../../uswds-core/src/js/utils/select":48}],32:[function(require,module,exports){
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
  ["id", "name", "required", "aria-label", "aria-labelledby", "disabled", "aria-disabled"].forEach(name => {
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

},{"../../usa-combo-box/src/index":18,"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select-or-matches":47}],33:[function(require,module,exports){
"use strict";

// Tooltips
const keymap = require("receptor/keymap");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const behavior = require("../../uswds-core/src/js/utils/behavior");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const isElementInViewport = require("../../uswds-core/src/js/utils/is-in-viewport");
const BODY = "body";
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
  function findBestPosition(element, attempt = 1) {
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
  const additionalClasses = tooltipTrigger.getAttribute("data-classes");
  let position = tooltipTrigger.getAttribute("data-position");

  // Apply default position if not set as attribute
  if (!position) {
    position = "top";
    tooltipTrigger.setAttribute("data-position", position);
  }

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

/**
 * Hide all active tooltips when escape key is pressed.
 */

const handleEscape = () => {
  const activeTooltips = selectOrMatches(`.${TOOLTIP_BODY_CLASS}.${SET_CLASS}`);
  if (!activeTooltips) {
    return;
  }
  activeTooltips.forEach(activeTooltip => hideToolTip(activeTooltip));
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
  focusout: {
    [TOOLTIP_TRIGGER](e) {
      const {
        body
      } = getTooltipElements(e.target);
      hideToolTip(body);
    }
  },
  keydown: {
    [BODY]: keymap({
      Escape: handleEscape
    })
  }
}, {
  init(root) {
    selectOrMatches(TOOLTIP, root).forEach(tooltipTrigger => {
      setUpAttributes(tooltipTrigger);
      const {
        body,
        wrapper
      } = getTooltipElements(tooltipTrigger);
      wrapper.addEventListener("mouseleave", () => hideToolTip(body));
    });
  },
  teardown(root) {
    selectOrMatches(TOOLTIP, root).forEach(tooltipWrapper => {
      tooltipWrapper.removeEventListener("mouseleave", hideToolTip);
    });
  },
  setup: setUpAttributes,
  getTooltipElements,
  show: showToolTip,
  hide: hideToolTip
});
module.exports = tooltip;

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/is-in-viewport":43,"../../uswds-core/src/js/utils/select-or-matches":47,"receptor/keymap":10}],34:[function(require,module,exports){
"use strict";

const behavior = require("../../uswds-core/src/js/utils/behavior");
const validate = require("../../uswds-core/src/js/utils/validate-input");
const {
  prefix: PREFIX
} = require("../../uswds-core/src/js/config");
const selectOrMatches = require("../../uswds-core/src/js/utils/select-or-matches");
const VALIDATE_INPUT = "input[data-validation-element],textarea[data-validation-element]";
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

},{"../../uswds-core/src/js/config":35,"../../uswds-core/src/js/utils/behavior":40,"../../uswds-core/src/js/utils/select-or-matches":47,"../../uswds-core/src/js/utils/validate-input":52}],35:[function(require,module,exports){
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
const button = require("../../../usa-button/src/index");
const characterCount = require("../../../usa-character-count/src/index");
const comboBox = require("../../../usa-combo-box/src/index");
const datePicker = require("../../../usa-date-picker/src/index");
const dateRangePicker = require("../../../usa-date-range-picker/src/index");
const fileInput = require("../../../usa-file-input/src/index");
const footer = require("../../../usa-footer/src/index");
const inPageNavigation = require("../../../usa-in-page-navigation/src/index");
const inputMask = require("../../../usa-input-mask/src/index");
const languageSelector = require("../../../usa-language-selector/src/index");
const modal = require("../../../usa-modal/src/index");
const navigation = require("../../../usa-header/src/index");
const password = require("../../../_usa-password/src/index");
const range = require("../../../usa-range/src/index");
const search = require("../../../usa-search/src/index");
const skipnav = require("../../../usa-skipnav/src/index");
const table = require("../../../usa-table/src/index");
const timePicker = require("../../../usa-time-picker/src/index");
const tooltip = require("../../../usa-tooltip/src/index");
const validator = require("../../../usa-validation/src/index");
module.exports = {
  accordion,
  banner,
  button,
  characterCount,
  comboBox,
  datePicker,
  dateRangePicker,
  fileInput,
  footer,
  inPageNavigation,
  inputMask,
  languageSelector,
  modal,
  navigation,
  password,
  range,
  search,
  skipnav,
  table,
  timePicker,
  tooltip,
  validator
};

},{"../../../_usa-password/src/index":13,"../../../usa-accordion/src/index":14,"../../../usa-banner/src/index":15,"../../../usa-button/src/index":16,"../../../usa-character-count/src/index":17,"../../../usa-combo-box/src/index":18,"../../../usa-date-picker/src/index":19,"../../../usa-date-range-picker/src/index":20,"../../../usa-file-input/src/index":21,"../../../usa-footer/src/index":22,"../../../usa-header/src/index":23,"../../../usa-in-page-navigation/src/index":24,"../../../usa-input-mask/src/index":25,"../../../usa-language-selector/src/index":26,"../../../usa-modal/src/index":27,"../../../usa-range/src/index":28,"../../../usa-search/src/index":29,"../../../usa-skipnav/src/index":30,"../../../usa-table/src/index":31,"../../../usa-time-picker/src/index":32,"../../../usa-tooltip/src/index":33,"../../../usa-validation/src/index":34}],38:[function(require,module,exports){
"use strict";

window.uswdsPresent = true; // GLOBAL variable to indicate that the uswds.js has loaded in the DOM.

const uswds = require("./config");
const components = require("./index");
uswds.components = components;
const initComponents = () => {
  const target = document.body;
  Object.keys(components).forEach(key => {
    const behavior = components[key];
    behavior.on(target);
  });
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

},{"./config":35,"./index":37}],39:[function(require,module,exports){
"use strict";

module.exports = (htmlDocument = document) => htmlDocument.activeElement;

},{}],40:[function(require,module,exports){
"use strict";

const Behavior = require("receptor/behavior");

/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module
const sequence = (...seq) => function callHooks(target = document.body) {
  seq.forEach(method => {
    if (typeof this[method] === "function") {
      this[method].call(this, target);
    }
  });
};

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
module.exports = (events, props) => Behavior(events, {
  on: sequence("init", "add"),
  off: sequence("teardown", "remove"),
  ...props
});

},{"receptor/behavior":4}],41:[function(require,module,exports){
"use strict";

/**
 * Call a function every X amount of milliseconds.
 *
 * @param  {Function} callback - A callback function to be debounced
 * @param  {number} delay - Milliseconds to wait before calling function
 * @returns {Function} A debounced function
 * @example const updateStatus = debounce((string) => console.log(string), 2000)
 */

module.exports = function debounce(callback, delay = 500) {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

},{}],42:[function(require,module,exports){
"use strict";

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
module.exports = (context, additionalKeyBindings = {}) => {
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
  const keyMappings = keymap({
    Tab: tabEventHandler.tabAhead,
    "Shift+Tab": tabEventHandler.tabBack,
    ...additionalKeyBindings
  });
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

},{"./active-element":39,"./behavior":40,"./select":48,"receptor":9}],43:[function(require,module,exports){
"use strict";

// https://stackoverflow.com/a/7557433
function isElementInViewport(el, win = window, docEl = document.documentElement) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (win.innerHeight || docEl.clientHeight) && rect.right <= (win.innerWidth || docEl.clientWidth);
}
module.exports = isElementInViewport;

},{}],44:[function(require,module,exports){
"use strict";

// iOS detection from: http://stackoverflow.com/a/9039885/177710
function isIosDevice() {
  return typeof navigator !== "undefined" && (navigator.userAgent.match(/(iPod|iPhone|iPad)/g) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && !window.MSStream;
}
module.exports = isIosDevice;

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"./select":48}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"./toggle-field-mask":49,"resolve-id-refs":12}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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
  Object.entries(el.dataset).forEach(([key, value]) => {
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

},{"../config":35,"./debounce":41}]},{},[38])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9rZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2JlaGF2aW9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2NvbXBvc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGVBbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaWdub3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2tleW1hcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInBhY2thZ2VzL191c2EtcGFzc3dvcmQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWFjY29yZGlvbi9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtYmFubmVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1idXR0b24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWNoYXJhY3Rlci1jb3VudC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtY29tYm8tYm94L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtZGF0ZS1yYW5nZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZvb3Rlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtaGVhZGVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1pbi1wYWdlLW5hdmlnYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LW1hc2svc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWxhbmd1YWdlLXNlbGVjdG9yL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1tb2RhbC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtcmFuZ2Uvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXNlYXJjaC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2Etc2tpcG5hdi9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtdGFibGUvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXRpbWUtcGlja2VyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS10b29sdGlwL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS12YWxpZGF0aW9uL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZy5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50cy5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvc3RhcnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9hY3RpdmUtZWxlbWVudC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZGVib3VuY2UuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9mb2N1cy10cmFwLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pb3MtZGV2aWNlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXMuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3QuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLENBQUMsVUFBVSxZQUFZLEVBQUU7RUFDeEIsSUFBSSxPQUFPLFlBQVksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixJQUFJLFlBQVksQ0FBQyxrQkFBa0IsSUFBSSxZQUFZLENBQUMscUJBQXFCLElBQUksU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFO01BQzVKLElBQUksT0FBTyxHQUFHLElBQUk7TUFDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO01BQ3JGLElBQUksS0FBSyxHQUFHLENBQUM7TUFFYixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUss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Q0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztFQUM1QyxPQUFPLE9BQU87QUFDaEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFJLEtBQUssSUFBSztFQUM3QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDaEMsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztBQUNsQyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUksS0FBSyxJQUFLO0VBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNoQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUN0QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxLQUFLO0VB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QUMsTUFBTTtRQUNwQyxzQkFBc0IsQ0FBQyxXQUFXLEdBQUcsYUFBYTtNQUNwRCxDQUFDLEVBQUUsSUFBSSxDQUFDO01BRVIsY0FBYyxDQUFDLENBQUM7SUFDbEI7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gZWxlbWVudC1jbG9zZXN0IHwgQ0MwLTEuMCB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9jbG9zZXN0XG5cbihmdW5jdGlvbiAoRWxlbWVudFByb3RvKSB7XG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLm1hdGNoZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8ubWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXHRcdFx0dmFyIGVsZW1lbnRzID0gKGVsZW1lbnQuZG9jdW1lbnQgfHwgZWxlbWVudC5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdHZhciBpbmRleCA9IDA7XG5cblx0XHRcdHdoaWxlIChlbGVtZW50c1tpbmRleF0gJiYgZWxlbWVudHNbaW5kZXhdICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdCsraW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBCb29sZWFuKGVsZW1lbnRzW2luZGV4XSk7XG5cdFx0fTtcblx0fVxuXG5cdGlmICh0eXBlb2YgRWxlbWVudFByb3RvLmNsb3Nlc3QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRFbGVtZW50UHJvdG8uY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcblx0XHRcdHZhciBlbGVtZW50ID0gdGhpcztcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fTtcblx0fVxufSkod2luZG93LkVsZW1lbnQucHJvdG90eXBlKTtcbiIsIi8qIGdsb2JhbCBkZWZpbmUsIEtleWJvYXJkRXZlbnQsIG1vZHVsZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIHZhciBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSB7XG4gICAgcG9seWZpbGw6IHBvbHlmaWxsLFxuICAgIGtleXM6IHtcbiAgICAgIDM6ICdDYW5jZWwnLFxuICAgICAgNjogJ0hlbHAnLFxuICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICA5OiAnVGFiJyxcbiAgICAgIDEyOiAnQ2xlYXInLFxuICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAxNjogJ1NoaWZ0JyxcbiAgICAgIDE3OiAnQ29udHJvbCcsXG4gICAgICAxODogJ0FsdCcsXG4gICAgICAxOTogJ1BhdXNlJyxcbiAgICAgIDIwOiAnQ2Fwc0xvY2snLFxuICAgICAgMjc6ICdFc2NhcGUnLFxuICAgICAgMjg6ICdDb252ZXJ0JyxcbiAgICAgIDI5OiAnTm9uQ29udmVydCcsXG4gICAgICAzMDogJ0FjY2VwdCcsXG4gICAgICAzMTogJ01vZGVDaGFuZ2UnLFxuICAgICAgMzI6ICcgJyxcbiAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgIDM0OiAnUGFnZURvd24nLFxuICAgICAgMzU6ICdFbmQnLFxuICAgICAgMzY6ICdIb21lJyxcbiAgICAgIDM3OiAnQXJyb3dMZWZ0JyxcbiAgICAgIDM4OiAnQXJyb3dVcCcsXG4gICAgICAzOTogJ0Fycm93UmlnaHQnLFxuICAgICAgNDA6ICdBcnJvd0Rvd24nLFxuICAgICAgNDE6ICdTZWxlY3QnLFxuICAgICAgNDI6ICdQcmludCcsXG4gICAgICA0MzogJ0V4ZWN1dGUnLFxuICAgICAgNDQ6ICdQcmludFNjcmVlbicsXG4gICAgICA0NTogJ0luc2VydCcsXG4gICAgICA0NjogJ0RlbGV0ZScsXG4gICAgICA0ODogWycwJywgJyknXSxcbiAgICAgIDQ5OiBbJzEnLCAnISddLFxuICAgICAgNTA6IFsnMicsICdAJ10sXG4gICAgICA1MTogWyczJywgJyMnXSxcbiAgICAgIDUyOiBbJzQnLCAnJCddLFxuICAgICAgNTM6IFsnNScsICclJ10sXG4gICAgICA1NDogWyc2JywgJ14nXSxcbiAgICAgIDU1OiBbJzcnLCAnJiddLFxuICAgICAgNTY6IFsnOCcsICcqJ10sXG4gICAgICA1NzogWyc5JywgJygnXSxcbiAgICAgIDkxOiAnT1MnLFxuICAgICAgOTM6ICdDb250ZXh0TWVudScsXG4gICAgICAxNDQ6ICdOdW1Mb2NrJyxcbiAgICAgIDE0NTogJ1Njcm9sbExvY2snLFxuICAgICAgMTgxOiAnVm9sdW1lTXV0ZScsXG4gICAgICAxODI6ICdWb2x1bWVEb3duJyxcbiAgICAgIDE4MzogJ1ZvbHVtZVVwJyxcbiAgICAgIDE4NjogWyc7JywgJzonXSxcbiAgICAgIDE4NzogWyc9JywgJysnXSxcbiAgICAgIDE4ODogWycsJywgJzwnXSxcbiAgICAgIDE4OTogWyctJywgJ18nXSxcbiAgICAgIDE5MDogWycuJywgJz4nXSxcbiAgICAgIDE5MTogWycvJywgJz8nXSxcbiAgICAgIDE5MjogWydgJywgJ34nXSxcbiAgICAgIDIxOTogWydbJywgJ3snXSxcbiAgICAgIDIyMDogWydcXFxcJywgJ3wnXSxcbiAgICAgIDIyMTogWyddJywgJ30nXSxcbiAgICAgIDIyMjogW1wiJ1wiLCAnXCInXSxcbiAgICAgIDIyNDogJ01ldGEnLFxuICAgICAgMjI1OiAnQWx0R3JhcGgnLFxuICAgICAgMjQ2OiAnQXR0bicsXG4gICAgICAyNDc6ICdDclNlbCcsXG4gICAgICAyNDg6ICdFeFNlbCcsXG4gICAgICAyNDk6ICdFcmFzZUVvZicsXG4gICAgICAyNTA6ICdQbGF5JyxcbiAgICAgIDI1MTogJ1pvb21PdXQnXG4gICAgfVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIGtleXMgKEYxLTI0KS5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDE7IGkgPCAyNTsgaSsrKSB7XG4gICAga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbMTExICsgaV0gPSAnRicgKyBpO1xuICB9XG5cbiAgLy8gUHJpbnRhYmxlIEFTQ0lJIGNoYXJhY3RlcnMuXG4gIHZhciBsZXR0ZXIgPSAnJztcbiAgZm9yIChpID0gNjU7IGkgPCA5MTsgaSsrKSB7XG4gICAgbGV0dGVyID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1tpXSA9IFtsZXR0ZXIudG9Mb3dlckNhc2UoKSwgbGV0dGVyLnRvVXBwZXJDYXNlKCldO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWZpbGwgKCkge1xuICAgIGlmICghKCdLZXlib2FyZEV2ZW50JyBpbiB3aW5kb3cpIHx8XG4gICAgICAgICdrZXknIGluIEtleWJvYXJkRXZlbnQucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUG9seWZpbGwgYGtleWAgb24gYEtleWJvYXJkRXZlbnRgLlxuICAgIHZhciBwcm90byA9IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzW3RoaXMud2hpY2ggfHwgdGhpcy5rZXlDb2RlXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAga2V5ID0ga2V5Wyt0aGlzLnNoaWZ0S2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUsICdrZXknLCBwcm90byk7XG4gICAgcmV0dXJuIHByb3RvO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgna2V5Ym9hcmRldmVudC1rZXktcG9seWZpbGwnLCBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsO1xuICB9IGVsc2UgaWYgKHdpbmRvdykge1xuICAgIHdpbmRvdy5rZXlib2FyZGV2ZW50S2V5UG9seWZpbGwgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGw7XG4gIH1cblxufSkoKTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5jb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBkZWxlZ2F0ZUFsbCA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlQWxsJyk7XG5cbmNvbnN0IERFTEVHQVRFX1BBVFRFUk4gPSAvXiguKyk6ZGVsZWdhdGVcXCgoLispXFwpJC87XG5jb25zdCBTUEFDRSA9ICcgJztcblxuY29uc3QgZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICB2YXIgbWF0Y2ggPSB0eXBlLm1hdGNoKERFTEVHQVRFX1BBVFRFUk4pO1xuICB2YXIgc2VsZWN0b3I7XG4gIGlmIChtYXRjaCkge1xuICAgIHR5cGUgPSBtYXRjaFsxXTtcbiAgICBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICB9XG5cbiAgdmFyIG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgY2FwdHVyZTogcG9wS2V5KGhhbmRsZXIsICdjYXB0dXJlJyksXG4gICAgICBwYXNzaXZlOiBwb3BLZXkoaGFuZGxlciwgJ3Bhc3NpdmUnKVxuICAgIH07XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGRlbGVnYXRlOiAodHlwZW9mIGhhbmRsZXIgPT09ICdvYmplY3QnKVxuICAgICAgPyBkZWxlZ2F0ZUFsbChoYW5kbGVyKVxuICAgICAgOiBzZWxlY3RvclxuICAgICAgICA/IGRlbGVnYXRlKHNlbGVjdG9yLCBoYW5kbGVyKVxuICAgICAgICA6IGhhbmRsZXIsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuXG4gIGlmICh0eXBlLmluZGV4T2YoU1BBQ0UpID4gLTEpIHtcbiAgICByZXR1cm4gdHlwZS5zcGxpdChTUEFDRSkubWFwKGZ1bmN0aW9uKF90eXBlKSB7XG4gICAgICByZXR1cm4gYXNzaWduKHt0eXBlOiBfdHlwZX0sIGxpc3RlbmVyKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0ZW5lci50eXBlID0gdHlwZTtcbiAgICByZXR1cm4gW2xpc3RlbmVyXTtcbiAgfVxufTtcblxudmFyIHBvcEtleSA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICBkZWxldGUgb2JqW2tleV07XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVoYXZpb3IoZXZlbnRzLCBwcm9wcykge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gICAgLnJlZHVjZShmdW5jdGlvbihtZW1vLCB0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHR5cGUsIGV2ZW50c1t0eXBlXSk7XG4gICAgICByZXR1cm4gbWVtby5jb25jYXQobGlzdGVuZXJzKTtcbiAgICB9LCBbXSk7XG5cbiAgcmV0dXJuIGFzc2lnbih7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGRCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlQmVoYXZpb3IoZWxlbWVudCkge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgIGxpc3RlbmVyLnR5cGUsXG4gICAgICAgICAgbGlzdGVuZXIuZGVsZWdhdGUsXG4gICAgICAgICAgbGlzdGVuZXIub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBwcm9wcyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21wb3NlKGZ1bmN0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBmdW5jdGlvbnMuc29tZShmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZSkgPT09IGZhbHNlO1xuICAgIH0sIHRoaXMpO1xuICB9O1xufTtcbiIsIi8vIHBvbHlmaWxsIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3RcbnJlcXVpcmUoJ2VsZW1lbnQtY2xvc2VzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGVnYXRlKHNlbGVjdG9yLCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZGVsZWdhdGlvbihldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGFyZ2V0LCBldmVudCk7XG4gICAgfVxuICB9XG59O1xuIiwiY29uc3QgZGVsZWdhdGUgPSByZXF1aXJlKCcuLi9kZWxlZ2F0ZScpO1xuY29uc3QgY29tcG9zZSA9IHJlcXVpcmUoJy4uL2NvbXBvc2UnKTtcblxuY29uc3QgU1BMQVQgPSAnKic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGVBbGwoc2VsZWN0b3JzKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnMpXG5cbiAgLy8gWFhYIG9wdGltaXphdGlvbjogaWYgdGhlcmUgaXMgb25seSBvbmUgaGFuZGxlciBhbmQgaXQgYXBwbGllcyB0b1xuICAvLyBhbGwgZWxlbWVudHMgKHRoZSBcIipcIiBDU1Mgc2VsZWN0b3IpLCB0aGVuIGp1c3QgcmV0dXJuIHRoYXRcbiAgLy8gaGFuZGxlclxuICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gU1BMQVQpIHtcbiAgICByZXR1cm4gc2VsZWN0b3JzW1NQTEFUXTtcbiAgfVxuXG4gIGNvbnN0IGRlbGVnYXRlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHNlbGVjdG9yKSB7XG4gICAgbWVtby5wdXNoKGRlbGVnYXRlKHNlbGVjdG9yLCBzZWxlY3RvcnNbc2VsZWN0b3JdKSk7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIFtdKTtcbiAgcmV0dXJuIGNvbXBvc2UoZGVsZWdhdGVzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZShlbGVtZW50LCBmbikge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JhbmNlKGUpIHtcbiAgICBpZiAoZWxlbWVudCAhPT0gZS50YXJnZXQgJiYgIWVsZW1lbnQuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGJlaGF2aW9yOiAgICAgcmVxdWlyZSgnLi9iZWhhdmlvcicpLFxuICBkZWxlZ2F0ZTogICAgIHJlcXVpcmUoJy4vZGVsZWdhdGUnKSxcbiAgZGVsZWdhdGVBbGw6ICByZXF1aXJlKCcuL2RlbGVnYXRlQWxsJyksXG4gIGlnbm9yZTogICAgICAgcmVxdWlyZSgnLi9pZ25vcmUnKSxcbiAga2V5bWFwOiAgICAgICByZXF1aXJlKCcuL2tleW1hcCcpLFxufTtcbiIsInJlcXVpcmUoJ2tleWJvYXJkZXZlbnQta2V5LXBvbHlmaWxsJyk7XG5cbi8vIHRoZXNlIGFyZSB0aGUgb25seSByZWxldmFudCBtb2RpZmllcnMgc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsXG4vLyBhY2NvcmRpbmcgdG8gTUROOlxuLy8gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2dldE1vZGlmaWVyU3RhdGU+XG5jb25zdCBNT0RJRklFUlMgPSB7XG4gICdBbHQnOiAgICAgICdhbHRLZXknLFxuICAnQ29udHJvbCc6ICAnY3RybEtleScsXG4gICdDdHJsJzogICAgICdjdHJsS2V5JyxcbiAgJ1NoaWZ0JzogICAgJ3NoaWZ0S2V5J1xufTtcblxuY29uc3QgTU9ESUZJRVJfU0VQQVJBVE9SID0gJysnO1xuXG5jb25zdCBnZXRFdmVudEtleSA9IGZ1bmN0aW9uKGV2ZW50LCBoYXNNb2RpZmllcnMpIHtcbiAgdmFyIGtleSA9IGV2ZW50LmtleTtcbiAgaWYgKGhhc01vZGlmaWVycykge1xuICAgIGZvciAodmFyIG1vZGlmaWVyIGluIE1PRElGSUVSUykge1xuICAgICAgaWYgKGV2ZW50W01PRElGSUVSU1ttb2RpZmllcl1dID09PSB0cnVlKSB7XG4gICAgICAgIGtleSA9IFttb2RpZmllciwga2V5XS5qb2luKE1PRElGSUVSX1NFUEFSQVRPUik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGtleW1hcChrZXlzKSB7XG4gIGNvbnN0IGhhc01vZGlmaWVycyA9IE9iamVjdC5rZXlzKGtleXMpLnNvbWUoZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKE1PRElGSUVSX1NFUEFSQVRPUikgPiAtMTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBrZXkgPSBnZXRFdmVudEtleShldmVudCwgaGFzTW9kaWZpZXJzKTtcbiAgICByZXR1cm4gW2tleSwga2V5LnRvTG93ZXJDYXNlKCldXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgX2tleSkge1xuICAgICAgICBpZiAoX2tleSBpbiBrZXlzKSB7XG4gICAgICAgICAgcmVzdWx0ID0ga2V5c1trZXldLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB1bmRlZmluZWQpO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMuTU9ESUZJRVJTID0gTU9ESUZJRVJTO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmNlKGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gIHZhciB3cmFwcGVkID0gZnVuY3Rpb24gd3JhcHBlZE9uY2UoZSkge1xuICAgIGUuY3VycmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgd3JhcHBlZCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwodGhpcywgZSk7XG4gIH07XG4gIHJldHVybiB3cmFwcGVkO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUkVfVFJJTSA9IC8oXlxccyspfChcXHMrJCkvZztcbnZhciBSRV9TUExJVCA9IC9cXHMrLztcblxudmFyIHRyaW0gPSBTdHJpbmcucHJvdG90eXBlLnRyaW1cbiAgPyBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzdHIpIHsgcmV0dXJuIHN0ci5yZXBsYWNlKFJFX1RSSU0sICcnKTsgfTtcblxudmFyIHF1ZXJ5QnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tpZD1cIicgKyBpZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlc29sdmVJZHMoaWRzLCBkb2MpIHtcbiAgaWYgKHR5cGVvZiBpZHMgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmluZyBidXQgZ290ICcgKyAodHlwZW9mIGlkcykpO1xuICB9XG5cbiAgaWYgKCFkb2MpIHtcbiAgICBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gIH1cblxuICB2YXIgZ2V0RWxlbWVudEJ5SWQgPSBkb2MuZ2V0RWxlbWVudEJ5SWRcbiAgICA/IGRvYy5nZXRFbGVtZW50QnlJZC5iaW5kKGRvYylcbiAgICA6IHF1ZXJ5QnlJZC5iaW5kKGRvYyk7XG5cbiAgaWRzID0gdHJpbShpZHMpLnNwbGl0KFJFX1NQTElUKTtcblxuICAvLyBYWFggd2UgY2FuIHNob3J0LWNpcmN1aXQgaGVyZSBiZWNhdXNlIHRyaW1taW5nIGFuZCBzcGxpdHRpbmcgYVxuICAvLyBzdHJpbmcgb2YganVzdCB3aGl0ZXNwYWNlIHByb2R1Y2VzIGFuIGFycmF5IGNvbnRhaW5pbmcgYSBzaW5nbGUsXG4gIC8vIGVtcHR5IHN0cmluZ1xuICBpZiAoaWRzLmxlbmd0aCA9PT0gMSAmJiBpZHNbMF0gPT09ICcnKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBlbCA9IGdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmICghZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IHdpdGggaWQ6IFwiJyArIGlkICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG59O1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB0b2dnbGVGb3JtSW5wdXQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLWZvcm0taW5wdXRcIik7XG5cbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBMSU5LID0gYC4ke1BSRUZJWH0tc2hvdy1wYXNzd29yZGA7XG5cbmZ1bmN0aW9uIHRvZ2dsZShldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0b2dnbGVGb3JtSW5wdXQodGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiB0b2dnbGUsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5jb25zdCBpc0VsZW1lbnRJblZpZXdwb3J0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWluLXZpZXdwb3J0XCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IEFDQ09SRElPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbiwgLiR7UFJFRklYfS1hY2NvcmRpb24tLWJvcmRlcmVkYDtcbmNvbnN0IEJBTk5FUl9CVVRUT04gPSBgLiR7UFJFRklYfS1iYW5uZXJfX2J1dHRvbmA7XG5jb25zdCBCVVRUT04gPSBgLiR7UFJFRklYfS1hY2NvcmRpb25fX2J1dHRvblthcmlhLWNvbnRyb2xzXTpub3QoJHtCQU5ORVJfQlVUVE9OfSlgO1xuY29uc3QgRVhQQU5ERUQgPSBcImFyaWEtZXhwYW5kZWRcIjtcbmNvbnN0IE1VTFRJU0VMRUNUQUJMRSA9IFwiZGF0YS1hbGxvdy1tdWx0aXBsZVwiO1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBidXR0b24gZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogYWNjb3JkaW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhY2NvcmRpb25cbiAqIEByZXR1cm4ge2FycmF5PEhUTUxCdXR0b25FbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0QWNjb3JkaW9uQnV0dG9ucyA9IChhY2NvcmRpb24pID0+IHtcbiAgY29uc3QgYnV0dG9ucyA9IHNlbGVjdChCVVRUT04sIGFjY29yZGlvbik7XG5cbiAgcmV0dXJuIGJ1dHRvbnMuZmlsdGVyKChidXR0b24pID0+IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTikgPT09IGFjY29yZGlvbik7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSBhIGJ1dHRvbidzIFwicHJlc3NlZFwiIHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBleHBhbmRlZCBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0aGUgcmVzdWx0aW5nIHN0YXRlXG4gKi9cbmNvbnN0IHRvZ2dsZUJ1dHRvbiA9IChidXR0b24sIGV4cGFuZGVkKSA9PiB7XG4gIGNvbnN0IGFjY29yZGlvbiA9IGJ1dHRvbi5jbG9zZXN0KEFDQ09SRElPTik7XG4gIGxldCBzYWZlRXhwYW5kZWQgPSBleHBhbmRlZDtcblxuICBpZiAoIWFjY29yZGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtCVVRUT059IGlzIG1pc3Npbmcgb3V0ZXIgJHtBQ0NPUkRJT059YCk7XG4gIH1cblxuICBzYWZlRXhwYW5kZWQgPSB0b2dnbGUoYnV0dG9uLCBleHBhbmRlZCk7XG5cbiAgLy8gWFhYIG11bHRpc2VsZWN0YWJsZSBpcyBvcHQtaW4sIHRvIHByZXNlcnZlIGxlZ2FjeSBiZWhhdmlvclxuICBjb25zdCBtdWx0aXNlbGVjdGFibGUgPSBhY2NvcmRpb24uaGFzQXR0cmlidXRlKE1VTFRJU0VMRUNUQUJMRSk7XG5cbiAgaWYgKHNhZmVFeHBhbmRlZCAmJiAhbXVsdGlzZWxlY3RhYmxlKSB7XG4gICAgZ2V0QWNjb3JkaW9uQnV0dG9ucyhhY2NvcmRpb24pLmZvckVhY2goKG90aGVyKSA9PiB7XG4gICAgICBpZiAob3RoZXIgIT09IGJ1dHRvbikge1xuICAgICAgICB0b2dnbGUob3RoZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc2hvd0J1dHRvbiA9IChidXR0b24pID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIHRydWUpO1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gZmFsc2VcbiAqL1xuY29uc3QgaGlkZUJ1dHRvbiA9IChidXR0b24pID0+IHRvZ2dsZUJ1dHRvbihidXR0b24sIGZhbHNlKTtcblxuY29uc3QgYWNjb3JkaW9uID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXSgpIHtcbiAgICAgICAgdG9nZ2xlQnV0dG9uKHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgLy8gV2Ugd2VyZSBqdXN0IGV4cGFuZGVkLCBidXQgaWYgYW5vdGhlciBhY2NvcmRpb24gd2FzIGFsc28ganVzdFxuICAgICAgICAgIC8vIGNvbGxhcHNlZCwgd2UgbWF5IG5vIGxvbmdlciBiZSBpbiB0aGUgdmlld3BvcnQuIFRoaXMgZW5zdXJlc1xuICAgICAgICAgIC8vIHRoYXQgd2UgYXJlIHN0aWxsIHZpc2libGUsIHNvIHRoZSB1c2VyIGlzbid0IGNvbmZ1c2VkLlxuICAgICAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0aGlzKSkgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChCVVRUT04sIHJvb3QpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcInRydWVcIjtcbiAgICAgICAgdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBBQ0NPUkRJT04sXG4gICAgQlVUVE9OLFxuICAgIHNob3c6IHNob3dCdXR0b24sXG4gICAgaGlkZTogaGlkZUJ1dHRvbixcbiAgICB0b2dnbGU6IHRvZ2dsZUJ1dHRvbixcbiAgICBnZXRCdXR0b25zOiBnZXRBY2NvcmRpb25CdXR0b25zLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhY2NvcmRpb247XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5cbmNvbnN0IEhFQURFUiA9IGAuJHtQUkVGSVh9LWJhbm5lcl9faGVhZGVyYDtcbmNvbnN0IEVYUEFOREVEX0NMQVNTID0gYCR7UFJFRklYfS1iYW5uZXJfX2hlYWRlci0tZXhwYW5kZWRgO1xuY29uc3QgQkFOTkVSX0JVVFRPTiA9IGAke0hFQURFUn0gW2FyaWEtY29udHJvbHNdYDtcblxuLyoqXG4gKiBUb2dnbGUgQmFubmVyIGRpc3BsYXkgYW5kIGNsYXNzLlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xuY29uc3QgdG9nZ2xlQmFubmVyID0gZnVuY3Rpb24gdG9nZ2xlRWwoZXZlbnQpIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KEJBTk5FUl9CVVRUT04pO1xuXG4gIHRvZ2dsZSh0cmlnZ2VyKTtcbiAgdGhpcy5jbG9zZXN0KEhFQURFUikuY2xhc3NMaXN0LnRvZ2dsZShFWFBBTkRFRF9DTEFTUyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JBTk5FUl9CVVRUT05dOiB0b2dnbGVCYW5uZXIsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KEJBTk5FUl9CVVRUT04sIHJvb3QpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBjb25zdCBleHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERURfQ0xBU1MpID09PSBcInRydWVcIjtcbiAgICAgICAgdG9nZ2xlKGJ1dHRvbiwgZXhwYW5kZWQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbik7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5cbmNvbnN0IEFOQ0hPUl9CVVRUT04gPSBgYVtjbGFzcyo9XCJ1c2EtYnV0dG9uXCJdYDtcblxuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2ZW50LnRhcmdldC5jbGljaygpO1xufTtcblxuY29uc3QgYW5jaG9yQnV0dG9uID0gYmVoYXZpb3Ioe1xuICBrZXlkb3duOiB7XG4gICAgW0FOQ0hPUl9CVVRUT05dOiBrZXltYXAoe1xuICAgICAgXCIgXCI6IHRvZ2dsZUJ1dHRvbixcbiAgICB9KSxcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuY2hvckJ1dHRvbjtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2RlYm91bmNlXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hBUkFDVEVSX0NPVU5UX0NMQVNTID0gYCR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRgO1xuY29uc3QgQ0hBUkFDVEVSX0NPVU5UID0gYC4ke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31gO1xuY29uc3QgRk9STV9HUk9VUF9DTEFTUyA9IGAke1BSRUZJWH0tZm9ybS1ncm91cGA7XG5jb25zdCBGT1JNX0dST1VQX0VSUk9SX0NMQVNTID0gYCR7Rk9STV9HUk9VUF9DTEFTU30tLWVycm9yYDtcbmNvbnN0IEZPUk1fR1JPVVAgPSBgLiR7Rk9STV9HUk9VUF9DTEFTU31gO1xuY29uc3QgTEFCRUxfQ0xBU1MgPSBgJHtQUkVGSVh9LWxhYmVsYDtcbmNvbnN0IExBQkVMX0VSUk9SX0NMQVNTID0gYCR7TEFCRUxfQ0xBU1N9LS1lcnJvcmA7XG5jb25zdCBJTlBVVCA9IGAuJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudF9fZmllbGRgO1xuY29uc3QgSU5QVVRfRVJST1JfQ0xBU1MgPSBgJHtQUkVGSVh9LWlucHV0LS1lcnJvcmA7XG5jb25zdCBNRVNTQUdFID0gYC4ke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19tZXNzYWdlYDtcbmNvbnN0IFZBTElEQVRJT05fTUVTU0FHRSA9IFwiVGhlIGNvbnRlbnQgaXMgdG9vIGxvbmcuXCI7XG5jb25zdCBNRVNTQUdFX0lOVkFMSURfQ0xBU1MgPSBgJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudF9fc3RhdHVzLS1pbnZhbGlkYDtcbmNvbnN0IFNUQVRVU19NRVNTQUdFX0NMQVNTID0gYCR7Q0hBUkFDVEVSX0NPVU5UX0NMQVNTfV9fc3RhdHVzYDtcbmNvbnN0IFNUQVRVU19NRVNTQUdFX1NSX09OTFlfQ0xBU1MgPSBgJHtDSEFSQUNURVJfQ09VTlRfQ0xBU1N9X19zci1zdGF0dXNgO1xuY29uc3QgU1RBVFVTX01FU1NBR0UgPSBgLiR7U1RBVFVTX01FU1NBR0VfQ0xBU1N9YDtcbmNvbnN0IFNUQVRVU19NRVNTQUdFX1NSX09OTFkgPSBgLiR7U1RBVFVTX01FU1NBR0VfU1JfT05MWV9DTEFTU31gO1xuY29uc3QgREVGQVVMVF9TVEFUVVNfTEFCRUwgPSBgY2hhcmFjdGVycyBhbGxvd2VkYDtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByb290LCBmb3JtIGdyb3VwLCBsYWJlbCwgYW5kIG1lc3NhZ2UgZWxlbWVudHMgZm9yIGFuIGNoYXJhY3RlciBjb3VudCBpbnB1dFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudHxIVE1MVGV4dEFyZWFFbGVtZW50fSBpbnB1dEVsIFRoZSBjaGFyYWN0ZXIgY291bnQgaW5wdXQgZWxlbWVudFxuICogQHJldHVybnMge0NoYXJhY3RlckNvdW50RWxlbWVudHN9IGVsZW1lbnRzIFRoZSByb290IGZvcm0gZ3JvdXAsIGlucHV0IElELCBsYWJlbCwgYW5kIG1lc3NhZ2UgZWxlbWVudC5cbiAqL1xuY29uc3QgZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGNoYXJhY3RlckNvdW50RWwgPSBpbnB1dEVsLmNsb3Nlc3QoQ0hBUkFDVEVSX0NPVU5UKTtcblxuICBpZiAoIWNoYXJhY3RlckNvdW50RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7SU5QVVR9IGlzIG1pc3Npbmcgb3V0ZXIgJHtDSEFSQUNURVJfQ09VTlR9YCk7XG4gIH1cblxuICBjb25zdCBmb3JtR3JvdXBFbCA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihGT1JNX0dST1VQKTtcblxuICBjb25zdCBpbnB1dElEID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgY29uc3QgbGFiZWxFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxhYmVsW2Zvcj0ke2lucHV0SUR9XWApO1xuXG4gIGNvbnN0IG1lc3NhZ2VFbCA9IGNoYXJhY3RlckNvdW50RWwucXVlcnlTZWxlY3RvcihNRVNTQUdFKTtcblxuICBpZiAoIW1lc3NhZ2VFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtDSEFSQUNURVJfQ09VTlR9IGlzIG1pc3NpbmcgaW5uZXIgJHtNRVNTQUdFfWApO1xuICB9XG5cbiAgcmV0dXJuIHsgY2hhcmFjdGVyQ291bnRFbCwgZm9ybUdyb3VwRWwsIGlucHV0SUQsIGxhYmVsRWwsIG1lc3NhZ2VFbCB9O1xufTtcblxuLyoqXG4gKiBNb3ZlIG1heGxlbmd0aCBhdHRyaWJ1dGUgdG8gYSBkYXRhIGF0dHJpYnV0ZSBvbiB1c2EtY2hhcmFjdGVyLWNvdW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHNldERhdGFMZW5ndGggPSAoaW5wdXRFbCkgPT4ge1xuICBjb25zdCB7IGNoYXJhY3RlckNvdW50RWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgY29uc3QgbWF4bGVuZ3RoID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIik7XG5cbiAgaWYgKCFtYXhsZW5ndGgpIHJldHVybjtcblxuICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcbiAgY2hhcmFjdGVyQ291bnRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1heGxlbmd0aFwiLCBtYXhsZW5ndGgpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIGFwcGVuZCBzdGF0dXMgbWVzc2FnZXMgZm9yIHZpc3VhbCBhbmQgc2NyZWVuIHJlYWRlcnNcbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBjaGFyYWN0ZXJDb3VudEVsIC0gRGl2IHdpdGggYC51c2EtY2hhcmFjdGVyLWNvdW50YCBjbGFzc1xuICogQGRlc2NyaXB0aW9uICBDcmVhdGUgdHdvIHN0YXR1cyBtZXNzYWdlcyBmb3IgbnVtYmVyIG9mIGNoYXJhY3RlcnMgbGVmdDtcbiAqIG9uZSB2aXN1YWwgc3RhdHVzIGFuZCBhbm90aGVyIGZvciBzY3JlZW4gcmVhZGVyc1xuICovXG5jb25zdCBjcmVhdGVTdGF0dXNNZXNzYWdlcyA9IChjaGFyYWN0ZXJDb3VudEVsKSA9PiB7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtYXhMZW5ndGggPSBjaGFyYWN0ZXJDb3VudEVsLmRhdGFzZXQubWF4bGVuZ3RoO1xuICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9IGAke21heExlbmd0aH0gJHtERUZBVUxUX1NUQVRVU19MQUJFTH1gO1xuXG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChgJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gLCBcInVzYS1oaW50XCIpO1xuICBzclN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LmFkZChcbiAgICBgJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWAsXG4gICAgXCJ1c2Etc3Itb25seVwiLFxuICApO1xuXG4gIHN0YXR1c01lc3NhZ2Uuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XG4gIHNyU3RhdHVzTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxpdmVcIiwgXCJwb2xpdGVcIik7XG5cbiAgc3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRNZXNzYWdlO1xuICBzclN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBkZWZhdWx0TWVzc2FnZTtcblxuICBjaGFyYWN0ZXJDb3VudEVsLmFwcGVuZChzdGF0dXNNZXNzYWdlLCBzclN0YXR1c01lc3NhZ2UpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG1lc3NhZ2Ugd2l0aCBob3cgbWFueSBjaGFyYWN0ZXJzIGFyZSBsZWZ0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnRMZW5ndGggLSBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgdXNlZFxuICogQHBhcmFtIHtudW1iZXJ9IG1heExlbmd0aCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgY2hhcmFjdGVycyBhbGxvd2VkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZyBkZXNjcmlwdGlvbiBvZiBob3cgbWFueSBjaGFyYWN0ZXJzIGFyZSBsZWZ0XG4gKi9cbmNvbnN0IGdldENvdW50TWVzc2FnZSA9IChjdXJyZW50TGVuZ3RoLCBtYXhMZW5ndGgpID0+IHtcbiAgbGV0IG5ld01lc3NhZ2UgPSBcIlwiO1xuXG4gIGlmIChjdXJyZW50TGVuZ3RoID09PSAwKSB7XG4gICAgbmV3TWVzc2FnZSA9IGAke21heExlbmd0aH0gJHtERUZBVUxUX1NUQVRVU19MQUJFTH1gO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBNYXRoLmFicyhtYXhMZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICBjb25zdCBjaGFyYWN0ZXJzID0gYGNoYXJhY3RlciR7ZGlmZmVyZW5jZSA9PT0gMSA/IFwiXCIgOiBcInNcIn1gO1xuICAgIGNvbnN0IGd1aWRhbmNlID0gY3VycmVudExlbmd0aCA+IG1heExlbmd0aCA/IFwib3ZlciBsaW1pdFwiIDogXCJsZWZ0XCI7XG5cbiAgICBuZXdNZXNzYWdlID0gYCR7ZGlmZmVyZW5jZX0gJHtjaGFyYWN0ZXJzfSAke2d1aWRhbmNlfWA7XG4gIH1cblxuICByZXR1cm4gbmV3TWVzc2FnZTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY2hhcmFjdGVyIGNvdW50IHN0YXR1cyBmb3Igc2NyZWVuIHJlYWRlcnMgYWZ0ZXIgYSAxMDAwbXMgZGVsYXkuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbXNnRWwgLSBUaGUgc2NyZWVuIHJlYWRlciBzdGF0dXMgbWVzc2FnZSBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdHVzTWVzc2FnZSAtIEEgc3RyaW5nIG9mIHRoZSBjdXJyZW50IGNoYXJhY3RlciBzdGF0dXNcbiAqL1xuY29uc3Qgc3JVcGRhdGVTdGF0dXMgPSBkZWJvdW5jZSgobXNnRWwsIHN0YXR1c01lc3NhZ2UpID0+IHtcbiAgY29uc3Qgc3JTdGF0dXNNZXNzYWdlID0gbXNnRWw7XG4gIHNyU3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IHN0YXR1c01lc3NhZ2U7XG59LCAxMDAwKTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNoYXJhY3RlciBjb3VudCBjb21wb25lbnRcbiAqXG4gKiBAZGVzY3JpcHRpb24gT24gaW5wdXQsIGl0IHdpbGwgdXBkYXRlIHZpc3VhbCBzdGF0dXMsIHNjcmVlbnJlYWRlclxuICogc3RhdHVzIGFuZCB1cGRhdGUgaW5wdXQgdmFsaWRhdGlvbiAoaWYgb3ZlciBjaGFyYWN0ZXIgbGVuZ3RoKVxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHVwZGF0ZUNvdW50TWVzc2FnZSA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCwgbGFiZWxFbCwgZm9ybUdyb3VwRWwgfSA9XG4gICAgZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyhpbnB1dEVsKTtcbiAgY29uc3QgY3VycmVudExlbmd0aCA9IGlucHV0RWwudmFsdWUubGVuZ3RoO1xuICBjb25zdCBtYXhMZW5ndGggPSBwYXJzZUludChcbiAgICBjaGFyYWN0ZXJDb3VudEVsLmdldEF0dHJpYnV0ZShcImRhdGEtbWF4bGVuZ3RoXCIpLFxuICAgIDEwLFxuICApO1xuICBjb25zdCBzdGF0dXNNZXNzYWdlID0gY2hhcmFjdGVyQ291bnRFbC5xdWVyeVNlbGVjdG9yKFNUQVRVU19NRVNTQUdFKTtcbiAgY29uc3Qgc3JTdGF0dXNNZXNzYWdlID0gY2hhcmFjdGVyQ291bnRFbC5xdWVyeVNlbGVjdG9yKFxuICAgIFNUQVRVU19NRVNTQUdFX1NSX09OTFksXG4gICk7XG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNNZXNzYWdlID0gZ2V0Q291bnRNZXNzYWdlKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCk7XG5cbiAgaWYgKCFtYXhMZW5ndGgpIHJldHVybjtcblxuICBjb25zdCBpc092ZXJMaW1pdCA9IGN1cnJlbnRMZW5ndGggJiYgY3VycmVudExlbmd0aCA+IG1heExlbmd0aDtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gY3VycmVudFN0YXR1c01lc3NhZ2U7XG4gIHNyVXBkYXRlU3RhdHVzKHNyU3RhdHVzTWVzc2FnZSwgY3VycmVudFN0YXR1c01lc3NhZ2UpO1xuXG4gIGlmIChpc092ZXJMaW1pdCAmJiAhaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGlucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNPdmVyTGltaXQgJiYgaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgfVxuXG4gIGlmIChmb3JtR3JvdXBFbCkge1xuICAgIGZvcm1Hcm91cEVsLmNsYXNzTGlzdC50b2dnbGUoRk9STV9HUk9VUF9FUlJPUl9DTEFTUywgaXNPdmVyTGltaXQpO1xuICB9XG5cbiAgaWYgKGxhYmVsRWwpIHtcbiAgICBsYWJlbEVsLmNsYXNzTGlzdC50b2dnbGUoTEFCRUxfRVJST1JfQ0xBU1MsIGlzT3ZlckxpbWl0KTtcbiAgfVxuXG4gIGlucHV0RWwuY2xhc3NMaXN0LnRvZ2dsZShJTlBVVF9FUlJPUl9DTEFTUywgaXNPdmVyTGltaXQpO1xuICBzdGF0dXNNZXNzYWdlLmNsYXNzTGlzdC50b2dnbGUoTUVTU0FHRV9JTlZBTElEX0NMQVNTLCBpc092ZXJMaW1pdCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgY29tcG9uZW50XG4gKlxuICogQGRlc2NyaXB0aW9uIE9uIGluaXQgdGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBlbGVtZW50cyBhbmQgdXBkYXRlIGFueVxuICogYXR0cmlidXRlcyBzbyBpdCBjYW4gdGVsbCB0aGUgdXNlciBob3cgbWFueSBjaGFyYWN0ZXJzIGFyZSBsZWZ0LlxuICogQHBhcmFtICB7SFRNTElucHV0RWxlbWVudHxIVE1MVGV4dEFyZWFFbGVtZW50fSBpbnB1dEVsIHRoZSBjb21wb25lbnRzIGlucHV0XG4gKi9cbmNvbnN0IGVuaGFuY2VDaGFyYWN0ZXJDb3VudCA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCwgbWVzc2FnZUVsIH0gPSBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzKGlucHV0RWwpO1xuXG4gIC8vIEhpZGUgaGludCBhbmQgcmVtb3ZlIGFyaWEtbGl2ZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgbWVzc2FnZUVsLmNsYXNzTGlzdC5hZGQoXCJ1c2Etc3Itb25seVwiKTtcbiAgbWVzc2FnZUVsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiKTtcblxuICBzZXREYXRhTGVuZ3RoKGlucHV0RWwpO1xuICBjcmVhdGVTdGF0dXNNZXNzYWdlcyhjaGFyYWN0ZXJDb3VudEVsKTtcbn07XG5cbmNvbnN0IGNoYXJhY3RlckNvdW50ID0gYmVoYXZpb3IoXG4gIHtcbiAgICBpbnB1dDoge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgdXBkYXRlQ291bnRNZXNzYWdlKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoSU5QVVQsIHJvb3QpLmZvckVhY2goKGlucHV0KSA9PiBlbmhhbmNlQ2hhcmFjdGVyQ291bnQoaW5wdXQpKTtcbiAgICB9LFxuICAgIEZPUk1fR1JPVVBfRVJST1JfQ0xBU1MsXG4gICAgTEFCRUxfRVJST1JfQ0xBU1MsXG4gICAgSU5QVVRfRVJST1JfQ0xBU1MsXG4gICAgTUVTU0FHRV9JTlZBTElEX0NMQVNTLFxuICAgIFZBTElEQVRJT05fTUVTU0FHRSxcbiAgICBTVEFUVVNfTUVTU0FHRV9DTEFTUyxcbiAgICBTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTLFxuICAgIERFRkFVTFRfU1RBVFVTX0xBQkVMLFxuICAgIGNyZWF0ZVN0YXR1c01lc3NhZ2VzLFxuICAgIGdldENvdW50TWVzc2FnZSxcbiAgICB1cGRhdGVDb3VudE1lc3NhZ2UsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNoYXJhY3RlckNvdW50O1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuXG5jb25zdCBDT01CT19CT1hfQ0xBU1MgPSBgJHtQUkVGSVh9LWNvbWJvLWJveGA7XG5jb25zdCBDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9LS1wcmlzdGluZWA7XG5jb25zdCBTRUxFQ1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zZWxlY3RgO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19jbGVhci1pbnB1dGA7XG5jb25zdCBDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgSU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0LWJ1dHRvbi1zZXBhcmF0b3JgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fdG9nZ2xlLWxpc3RgO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1MgPSBgJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9X193cmFwcGVyYDtcbmNvbnN0IExJU1RfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0YDtcbmNvbnN0IExJU1RfT1BUSU9OX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fbGlzdC1vcHRpb25gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tZm9jdXNlZGA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTUyA9IGAke0xJU1RfT1BUSU9OX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgU1RBVFVTX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9fc3RhdHVzYDtcblxuY29uc3QgQ09NQk9fQk9YID0gYC4ke0NPTUJPX0JPWF9DTEFTU31gO1xuY29uc3QgU0VMRUNUID0gYC4ke1NFTEVDVF9DTEFTU31gO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTiA9IGAuJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IFRPR0dMRV9MSVNUX0JVVFRPTiA9IGAuJHtUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IExJU1QgPSBgLiR7TElTVF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT04gPSBgLiR7TElTVF9PUFRJT05fQ0xBU1N9YDtcbmNvbnN0IExJU1RfT1BUSU9OX0ZPQ1VTRUQgPSBgLiR7TElTVF9PUFRJT05fRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fU0VMRUNURUQgPSBgLiR7TElTVF9PUFRJT05fU0VMRUNURURfQ0xBU1N9YDtcbmNvbnN0IFNUQVRVUyA9IGAuJHtTVEFUVVNfQ0xBU1N9YDtcblxuY29uc3QgREVGQVVMVF9GSUxURVIgPSBcIi4qe3txdWVyeX19LipcIjtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG4vKipcbiAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgYW5kIGRpc3BhdGNoIGEgY2hhbmdlIGV2ZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxTZWxlY3RFbGVtZW50fSBlbCBUaGUgZWxlbWVudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gKi9cbmNvbnN0IGNoYW5nZUVsZW1lbnRWYWx1ZSA9IChlbCwgdmFsdWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9IGVsO1xuICBlbGVtZW50VG9DaGFuZ2UudmFsdWUgPSB2YWx1ZTtcblxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyB2YWx1ZSB9LFxuICB9KTtcbiAgZWxlbWVudFRvQ2hhbmdlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcblxuLyoqXG4gKiBUaGUgZWxlbWVudHMgd2l0aGluIHRoZSBjb21ibyBib3guXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDb21ib0JveENvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGNvbWJvQm94RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFNlbGVjdEVsZW1lbnR9IHNlbGVjdEVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTFVMaXN0RWxlbWVudH0gbGlzdEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBmb2N1c2VkT3B0aW9uRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTExJRWxlbWVudH0gc2VsZWN0ZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MQnV0dG9uRWxlbWVudH0gdG9nZ2xlTGlzdEJ0bkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhcklucHV0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNQcmlzdGluZVxuICogQHByb3BlcnR5IHtib29sZWFufSBkaXNhYmxlRmlsdGVyaW5nXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3hcbiAqIEByZXR1cm5zIHtDb21ib0JveENvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldENvbWJvQm94Q29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gZWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmICghY29tYm9Cb3hFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7Q09NQk9fQk9YfWApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU0VMRUNUKTtcbiAgY29uc3QgaW5wdXRFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG4gIGNvbnN0IGxpc3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihMSVNUKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoU1RBVFVTKTtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZE9wdGlvbkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OX1NFTEVDVEVEKTtcbiAgY29uc3QgdG9nZ2xlTGlzdEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKFRPR0dMRV9MSVNUX0JVVFRPTik7XG4gIGNvbnN0IGNsZWFySW5wdXRCdG5FbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihDTEVBUl9JTlBVVF9CVVRUT04pO1xuXG4gIGNvbnN0IGlzUHJpc3RpbmUgPSBjb21ib0JveEVsLmNsYXNzTGlzdC5jb250YWlucyhDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICBjb25zdCBkaXNhYmxlRmlsdGVyaW5nID0gY29tYm9Cb3hFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPT09IFwidHJ1ZVwiO1xuXG4gIHJldHVybiB7XG4gICAgY29tYm9Cb3hFbCxcbiAgICBzZWxlY3RFbCxcbiAgICBpbnB1dEVsLFxuICAgIGxpc3RFbCxcbiAgICBzdGF0dXNFbCxcbiAgICBmb2N1c2VkT3B0aW9uRWwsXG4gICAgc2VsZWN0ZWRPcHRpb25FbCxcbiAgICB0b2dnbGVMaXN0QnRuRWwsXG4gICAgY2xlYXJJbnB1dEJ0bkVsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgY29tYm8tYm94IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSB0cnVlO1xuICBjbGVhcklucHV0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICB0b2dnbGVMaXN0QnRuRWwuZGlzYWJsZWQgPSB0cnVlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogQ2hlY2sgZm9yIGFyaWEtZGlzYWJsZWQgb24gaW5pdGlhbGl6YXRpb25cbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGFyaWFEaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgdG9nZ2xlTGlzdEJ0bkVsLCBjbGVhcklucHV0QnRuRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY2xlYXJJbnB1dEJ0bkVsLmhpZGRlbiA9IHRydWU7XG4gIGNsZWFySW5wdXRCdG5FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHRydWUpO1xuICB0b2dnbGVMaXN0QnRuRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCB0cnVlKTtcbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHRydWUpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGNvbWJvLWJveCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIHRvZ2dsZUxpc3RCdG5FbCwgY2xlYXJJbnB1dEJ0bkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNsZWFySW5wdXRCdG5FbC5oaWRkZW4gPSBmYWxzZTtcbiAgY2xlYXJJbnB1dEJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IGZhbHNlO1xuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYSBzZWxlY3QgZWxlbWVudCBpbnRvIGEgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBfY29tYm9Cb3hFbCBUaGUgaW5pdGlhbCBlbGVtZW50IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VDb21ib0JveCA9IChfY29tYm9Cb3hFbCkgPT4ge1xuICBjb25zdCBjb21ib0JveEVsID0gX2NvbWJvQm94RWwuY2xvc2VzdChDT01CT19CT1gpO1xuXG4gIGlmIChjb21ib0JveEVsLmRhdGFzZXQuZW5oYW5jZWQpIHJldHVybjtcblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKTtcblxuICBpZiAoIXNlbGVjdEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0NPTUJPX0JPWH0gaXMgbWlzc2luZyBpbm5lciBzZWxlY3RgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbGVjdElkID0gc2VsZWN0RWwuaWQ7XG4gIGNvbnN0IHNlbGVjdExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKTtcbiAgY29uc3QgbGlzdElkID0gYCR7c2VsZWN0SWR9LS1saXN0YDtcbiAgY29uc3QgbGlzdElkTGFiZWwgPSBgJHtzZWxlY3RJZH0tbGFiZWxgO1xuICBjb25zdCBhZGRpdGlvbmFsQXR0cmlidXRlcyA9IFtdO1xuICBjb25zdCB7IGRlZmF1bHRWYWx1ZSB9ID0gY29tYm9Cb3hFbC5kYXRhc2V0O1xuICBjb25zdCB7IHBsYWNlaG9sZGVyIH0gPSBjb21ib0JveEVsLmRhdGFzZXQ7XG4gIGxldCBzZWxlY3RlZE9wdGlvbjtcblxuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKHsgcGxhY2Vob2xkZXIgfSk7XG4gIH1cblxuICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkVsID0gc2VsZWN0RWwub3B0aW9uc1tpXTtcblxuICAgICAgaWYgKG9wdGlvbkVsLnZhbHVlID09PSBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25FbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIGNvbWJvYm94IGlzIG1pc3NpbmcgYSBsYWJlbCBvciBsYWJlbCBpcyBtaXNzaW5nXG4gICAqIGBmb3JgIGF0dHJpYnV0ZS4gT3RoZXJ3aXNlLCBzZXQgdGhlIElEIHRvIG1hdGNoIHRoZSA8dWw+IGFyaWEtbGFiZWxsZWRieVxuICAgKi9cbiAgaWYgKCFzZWxlY3RMYWJlbCB8fCAhc2VsZWN0TGFiZWwubWF0Y2hlcyhgbGFiZWxbZm9yPVwiJHtzZWxlY3RJZH1cIl1gKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0NPTUJPX0JPWH0gZm9yICR7c2VsZWN0SWR9IGlzIGVpdGhlciBtaXNzaW5nIGEgbGFiZWwgb3IgYSBcImZvclwiIGF0dHJpYnV0ZWAsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RMYWJlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBsaXN0SWRMYWJlbCk7XG4gIH1cblxuICBzZWxlY3RMYWJlbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBsaXN0SWRMYWJlbCk7XG4gIHNlbGVjdEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgc2VsZWN0RWwuY2xhc3NMaXN0LmFkZChcInVzYS1zci1vbmx5XCIsIFNFTEVDVF9DTEFTUyk7XG4gIHNlbGVjdEVsLmlkID0gXCJcIjtcbiAgc2VsZWN0RWwudmFsdWUgPSBcIlwiO1xuXG4gIFtcInJlcXVpcmVkXCIsIFwiYXJpYS1sYWJlbFwiLCBcImFyaWEtbGFiZWxsZWRieVwiXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgaWYgKHNlbGVjdEVsLmhhc0F0dHJpYnV0ZShuYW1lKSkge1xuICAgICAgY29uc3QgdmFsdWUgPSBzZWxlY3RFbC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICBhZGRpdGlvbmFsQXR0cmlidXRlcy5wdXNoKHsgW25hbWVdOiB2YWx1ZSB9KTtcbiAgICAgIHNlbGVjdEVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHNhbml0aXplIGRvZXNuJ3QgbGlrZSBmdW5jdGlvbnMgaW4gdGVtcGxhdGUgbGl0ZXJhbHNcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIHNlbGVjdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1vd25zXCIsIGxpc3RJZCk7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgbGlzdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1hdXRvY29tcGxldGVcIiwgXCJsaXN0XCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIFwib2ZmXCIpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29tcGxldGVcIiwgXCJvZmZcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIElOUFVUX0NMQVNTKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJjb21ib2JveFwiKTtcbiAgYWRkaXRpb25hbEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cikgPT5cbiAgICBPYmplY3Qua2V5cyhhdHRyKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHthdHRyW2tleV19YDtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICB9KSxcbiAgKTtcblxuICBjb21ib0JveEVsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBpbnB1dCk7XG5cbiAgY29tYm9Cb3hFbC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8c3BhbiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJDbGVhciB0aGUgc2VsZWN0IGNvbnRlbnRzXCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7SU5QVVRfQlVUVE9OX1NFUEFSQVRPUl9DTEFTU31cIj4mbmJzcDs8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX1dSQVBQRVJfQ0xBU1N9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCIke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIHRoZSBkcm9wZG93biBsaXN0XCI+Jm5ic3A7PC9idXR0b24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8dWxcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIGlkPVwiJHtsaXN0SWR9XCJcbiAgICAgICAgY2xhc3M9XCIke0xJU1RfQ0xBU1N9XCJcbiAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWxhYmVsbGVkYnk9XCIke2xpc3RJZExhYmVsfVwiXG4gICAgICAgIGhpZGRlbj5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2IGNsYXNzPVwiJHtTVEFUVVNfQ0xBU1N9IHVzYS1zci1vbmx5XCIgcm9sZT1cInN0YXR1c1wiPjwvZGl2PmAsXG4gICk7XG5cbiAgaWYgKHNlbGVjdGVkT3B0aW9uKSB7XG4gICAgY29uc3QgeyBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoY29tYm9Cb3hFbCk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBzZWxlY3RlZE9wdGlvbi52YWx1ZSk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIHNlbGVjdGVkT3B0aW9uLnRleHQpO1xuICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICB9XG5cbiAgaWYgKHNlbGVjdEVsLmRpc2FibGVkKSB7XG4gICAgZGlzYWJsZShjb21ib0JveEVsKTtcbiAgICBzZWxlY3RFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHNlbGVjdEVsLmhhc0F0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIikpIHtcbiAgICBhcmlhRGlzYWJsZShjb21ib0JveEVsKTtcbiAgICBzZWxlY3RFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xuICB9XG5cbiAgY29tYm9Cb3hFbC5kYXRhc2V0LmVuaGFuY2VkID0gXCJ0cnVlXCI7XG59O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgZm9jdXNlZCBlbGVtZW50IHdpdGhpbiB0aGUgbGlzdCBvcHRpb25zIHdoZW5cbiAqIG5hdmlnYXRpbmcgdmlhIGtleWJvYXJkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGFuY2hvciBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbmV4dEVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuc2tpcEZvY3VzIHNraXAgZm9jdXMgb2YgaGlnaGxpZ2h0ZWQgaXRlbVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnByZXZlbnRTY3JvbGwgc2hvdWxkIHNraXAgcHJvY2VkdXJlIHRvIHNjcm9sbCB0byBlbGVtZW50XG4gKi9cbmNvbnN0IGhpZ2hsaWdodE9wdGlvbiA9IChlbCwgbmV4dEVsLCB7IHNraXBGb2N1cywgcHJldmVudFNjcm9sbCB9ID0ge30pID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIGZvY3VzZWRPcHRpb25FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAoZm9jdXNlZE9wdGlvbkVsKSB7XG4gICAgZm9jdXNlZE9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgZm9jdXNlZE9wdGlvbkVsLnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gIH1cblxuICBpZiAobmV4dEVsKSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgbmV4dEVsLmlkKTtcbiAgICBuZXh0RWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgIG5leHRFbC5jbGFzc0xpc3QuYWRkKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuXG4gICAgaWYgKCFwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICBjb25zdCBvcHRpb25Cb3R0b20gPSBuZXh0RWwub2Zmc2V0VG9wICsgbmV4dEVsLm9mZnNldEhlaWdodDtcbiAgICAgIGNvbnN0IGN1cnJlbnRCb3R0b20gPSBsaXN0RWwuc2Nyb2xsVG9wICsgbGlzdEVsLm9mZnNldEhlaWdodDtcblxuICAgICAgaWYgKG9wdGlvbkJvdHRvbSA+IGN1cnJlbnRCb3R0b20pIHtcbiAgICAgICAgbGlzdEVsLnNjcm9sbFRvcCA9IG9wdGlvbkJvdHRvbSAtIGxpc3RFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXh0RWwub2Zmc2V0VG9wIDwgbGlzdEVsLnNjcm9sbFRvcCkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gbmV4dEVsLm9mZnNldFRvcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNraXBGb2N1cykge1xuICAgICAgbmV4dEVsLmZvY3VzKHsgcHJldmVudFNjcm9sbCB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG4gICAgaW5wdXRFbC5mb2N1cygpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZHluYW1pYyByZWd1bGFyIGV4cHJlc3Npb24gYmFzZWQgb2ZmIG9mIGEgcmVwbGFjZWFibGUgYW5kIHBvc3NpYmx5IGZpbHRlcmVkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSB2YWx1ZSB0byB1c2UgaW4gdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhcyBBbiBvYmplY3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0byByZXBsYWNlIGFuZCBmaWx0ZXIgdGhlIHF1ZXJ5XG4gKi9cbmNvbnN0IGdlbmVyYXRlRHluYW1pY1JlZ0V4cCA9IChmaWx0ZXIsIHF1ZXJ5ID0gXCJcIiwgZXh0cmFzID0ge30pID0+IHtcbiAgY29uc3QgZXNjYXBlUmVnRXhwID0gKHRleHQpID0+XG4gICAgdGV4dC5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgXCJcXFxcJCZcIik7XG5cbiAgbGV0IGZpbmQgPSBmaWx0ZXIucmVwbGFjZSgve3soLio/KX19L2csIChtLCAkMSkgPT4ge1xuICAgIGNvbnN0IGtleSA9ICQxLnRyaW0oKTtcbiAgICBjb25zdCBxdWVyeUZpbHRlciA9IGV4dHJhc1trZXldO1xuICAgIGlmIChrZXkgIT09IFwicXVlcnlcIiAmJiBxdWVyeUZpbHRlcikge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IG5ldyBSZWdFeHAocXVlcnlGaWx0ZXIsIFwiaVwiKTtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBxdWVyeS5tYXRjaChtYXRjaGVyKTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChtYXRjaGVzWzFdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVSZWdFeHAocXVlcnkpO1xuICB9KTtcblxuICBmaW5kID0gYF4oPzoke2ZpbmR9KSRgO1xuXG4gIHJldHVybiBuZXcgUmVnRXhwKGZpbmQsIFwiaVwiKTtcbn07XG5cbi8qKlxuICogRGlzcGxheSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGlzUHJpc3RpbmUsXG4gICAgZGlzYWJsZUZpbHRlcmluZyxcbiAgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG4gIGxldCBzZWxlY3RlZEl0ZW1JZDtcbiAgbGV0IGZpcnN0Rm91bmRJZDtcblxuICBjb25zdCBsaXN0T3B0aW9uQmFzZUlkID0gYCR7bGlzdEVsLmlkfS0tb3B0aW9uLWA7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlciA9IGNvbWJvQm94RWwuZGF0YXNldC5maWx0ZXIgfHwgREVGQVVMVF9GSUxURVI7XG4gIGNvbnN0IHJlZ2V4ID0gZ2VuZXJhdGVEeW5hbWljUmVnRXhwKGZpbHRlciwgaW5wdXRWYWx1ZSwgY29tYm9Cb3hFbC5kYXRhc2V0KTtcblxuICBsZXQgb3B0aW9ucyA9IFtdO1xuICBjb25zdCBvcHRpb25zU3RhcnRzV2l0aCA9IFtdO1xuICBjb25zdCBvcHRpb25zQ29udGFpbnMgPSBbXTtcbiAgY29uc3Qgb3B0aW9uTGlzdCA9IFsuLi5zZWxlY3RFbC5vcHRpb25zXTtcblxuICAvKipcbiAgICogQnVpbGRzIGFuZCBzb3J0cyBvcHRpb25zIGFycmF5LlxuICAgKlxuICAgKiBPcHRpb24gcGFyYW0gaXMgcGFzc2VkIHRocm91Z2ggcmVnZXggdGVzdCBiZWZvcmUgcGFzc2luZyBpbnRvIHRoaXMgZnVuY3Rpb24uXG4gICAqIFdoZW4gZmlsdGVyaW5nIGlzIGVuYWJsZWQsIHRoZSBhcnJheSB3aWxsIGJlIHNvcnRlZCBieSBvcHRpb25zIHRoYXQgc3RhcnQgd2l0aCB0aGUgcXVlcnksIGZvbGxvd2VkIGJ5XG4gICAqIG9wdGlvbnMgdGhhdCBjb250YWluIHRoZSBxdWVyeS5cbiAgICogV2hlbiBmaWx0ZXJpbmcgaXMgZGlzYWJsZWQsIGFsbCBvcHRpb25zIHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlIGFycmF5IHVuc29ydGVkLlxuICAgKlxuICAgKiBUaGVzZSBhcnJheSBpdGVtcyB3aWxsIHBvcHVsYXRlIHRoZSBsaXN0IHRoYXQgaXMgZGlzcGxheWVkIHRvIHRoZSB1c2VyIGFmdGVyIGEgc2VhcmNoIHF1ZXJ5IGlzIGVudGVyZWQuXG4gICAqIEFycmF5IGF0dHJpYnV0ZXMgYXJlIGFsc28gdXNlZCB0byBzZXQgb3B0aW9uIElEcyBhbmQgYXJpYS1zZXRzaXplIGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IG9wdGlvbiAtIE9wdGlvbiBlbGVtZW50IGZyb20gc2VsZWN0IGFycmF5XG4gICAqL1xuICBjb25zdCBidWlsZE9wdGlvbnNBcnJheSA9IChvcHRpb24pID0+IHtcbiAgICBpZiAoZGlzYWJsZUZpbHRlcmluZyB8fCBpc1ByaXN0aW5lKSB7XG4gICAgICBvcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaFN0YXJ0c1dpdGggPSBvcHRpb24udGV4dC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoaW5wdXRWYWx1ZSk7XG5cbiAgICBpZiAobWF0Y2hTdGFydHNXaXRoKSB7XG4gICAgICBvcHRpb25zU3RhcnRzV2l0aC5wdXNoKG9wdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnNDb250YWlucy5wdXNoKG9wdGlvbik7XG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IFsuLi5vcHRpb25zU3RhcnRzV2l0aCwgLi4ub3B0aW9uc0NvbnRhaW5zXTtcbiAgfTtcblxuICAvKipcbiAgICogQ29tcGFyZXMgb3B0aW9uIHRleHQgdG8gcXVlcnkgdXNpbmcgZ2VuZXJhdGVkIHJlZ2V4IGZpbHRlci5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gb3B0aW9uXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRydWUgd2hlbiBvcHRpb24gdGV4dCBtYXRjaGVzIHVzZXIgaW5wdXQgcXVlcnkuXG4gICAqL1xuICBjb25zdCBvcHRpb25NYXRjaGVzUXVlcnkgPSAob3B0aW9uKSA9PiByZWdleC50ZXN0KG9wdGlvbi50ZXh0KTtcblxuICAvKipcbiAgICogTG9naWMgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIG9wdGlvbnMgYXJyYXkgbmVlZHMgdG8gYmUgdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gb3B0aW9uXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFRydWUgd2hlbiBvcHRpb24gaGFzIHZhbHVlICYmIGlmIGZpbHRlcmluZyBpcyBkaXNhYmxlZCwgY29tYm8gYm94IGhhcyBhbiBhY3RpdmUgc2VsZWN0aW9uLFxuICAgKiB0aGVyZSBpcyBubyBpbnB1dFZhbHVlLCBvciBpZiBvcHRpb24gbWF0Y2hlcyB1c2VyIHF1ZXJ5XG4gICAqL1xuICBjb25zdCBhcnJheU5lZWRzVXBkYXRlID0gKG9wdGlvbikgPT5cbiAgICBvcHRpb24udmFsdWUgJiZcbiAgICAoZGlzYWJsZUZpbHRlcmluZyB8fFxuICAgICAgaXNQcmlzdGluZSB8fFxuICAgICAgIWlucHV0VmFsdWUgfHxcbiAgICAgIG9wdGlvbk1hdGNoZXNRdWVyeShvcHRpb24pKTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGZpcnN0Rm91bmRJZCBzaG91bGQgYmUgYXNzaWduZWQsIHdoaWNoIGlzIHRoZW4gdXNlZCB0byBzZXQgaXRlbVRvRm9jdXMuXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IG9wdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiBmaWx0ZXJpbmcgaXMgZGlzYWJsZWQsIG5vIGZpcnN0Rm91bmRJZCBpcyBhc3NpZ25lZCwgYW5kIHRoZSBvcHRpb24gbWF0Y2hlcyB0aGUgcXVlcnkuXG4gICAqL1xuICBjb25zdCBpc0ZpcnN0TWF0Y2ggPSAob3B0aW9uKSA9PlxuICAgIGRpc2FibGVGaWx0ZXJpbmcgJiYgIWZpcnN0Rm91bmRJZCAmJiBvcHRpb25NYXRjaGVzUXVlcnkob3B0aW9uKTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGlzQ3VycmVudFNlbGVjdGlvbiBzaG91bGQgYmUgYXNzaWduZWQsIHdoaWNoIGlzIHRoZW4gdXNlZCB0byBzZXQgaXRlbVRvRm9jdXMuXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTE9wdGlvbkVsZW1lbnR9IG9wdGlvblxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgb3B0aW9uLnZhbHVlIG1hdGNoZXMgc2VsZWN0RWwudmFsdWUuXG4gICAqL1xuICBjb25zdCBpc0N1cnJlbnRTZWxlY3Rpb24gPSAob3B0aW9uKSA9PlxuICAgIHNlbGVjdEVsLnZhbHVlICYmIG9wdGlvbi52YWx1ZSA9PT0gc2VsZWN0RWwudmFsdWU7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYXJyYXkgb2Ygb3B0aW9ucyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgb24gdGhlIHBhZ2UuXG4gICAqIEFzc2lnbiBhbiBJRCB0byBlYWNoIGRpc3BsYXllZCBvcHRpb24uXG4gICAqIElkZW50aWZ5IGFuZCBhc3NpZ24gdGhlIG9wdGlvbiB0aGF0IHNob3VsZCByZWNlaXZlIGZvY3VzLlxuICAgKi9cbiAgb3B0aW9uTGlzdC5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICBpZiAoYXJyYXlOZWVkc1VwZGF0ZShvcHRpb24pKSB7XG4gICAgICBidWlsZE9wdGlvbnNBcnJheShvcHRpb24pO1xuXG4gICAgICBjb25zdCBvcHRpb25JZCA9IGAke2xpc3RPcHRpb25CYXNlSWR9JHtvcHRpb25zLmluZGV4T2Yob3B0aW9uKX1gO1xuXG4gICAgICBpZiAoaXNGaXJzdE1hdGNoKG9wdGlvbikpIHtcbiAgICAgICAgZmlyc3RGb3VuZElkID0gb3B0aW9uSWQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0N1cnJlbnRTZWxlY3Rpb24ob3B0aW9uKSkge1xuICAgICAgICBzZWxlY3RlZEl0ZW1JZCA9IG9wdGlvbklkO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbnVtT3B0aW9ucyA9IG9wdGlvbnMubGVuZ3RoO1xuICBjb25zdCBvcHRpb25IdG1sID0gb3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBvcHRpb25JZCA9IGAke2xpc3RPcHRpb25CYXNlSWR9JHtpbmRleH1gO1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbTElTVF9PUFRJT05fQ0xBU1NdO1xuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcbiAgICBsZXQgYXJpYVNlbGVjdGVkID0gXCJmYWxzZVwiO1xuXG4gICAgaWYgKG9wdGlvbklkID09PSBzZWxlY3RlZEl0ZW1JZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTLCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBhcmlhU2VsZWN0ZWQgPSBcInRydWVcIjtcbiAgICB9XG5cbiAgICBpZiAoIXNlbGVjdGVkSXRlbUlkICYmIGluZGV4ID09PSAwKSB7XG4gICAgICBjbGFzc2VzLnB1c2goTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgIH1cblxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1zZXRzaXplXCIsIG9wdGlvbnMubGVuZ3RoKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXBvc2luc2V0XCIsIGluZGV4ICsgMSk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBhcmlhU2VsZWN0ZWQpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImlkXCIsIG9wdGlvbklkKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcIm9wdGlvblwiKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIG9wdGlvbi52YWx1ZSk7XG4gICAgbGkudGV4dENvbnRlbnQgPSBvcHRpb24udGV4dDtcblxuICAgIHJldHVybiBsaTtcbiAgfSk7XG5cbiAgY29uc3Qgbm9SZXN1bHRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBub1Jlc3VsdHMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1uby1yZXN1bHRzYCk7XG4gIG5vUmVzdWx0cy50ZXh0Q29udGVudCA9IFwiTm8gcmVzdWx0cyBmb3VuZFwiO1xuXG4gIGxpc3RFbC5oaWRkZW4gPSBmYWxzZTtcblxuICBpZiAobnVtT3B0aW9ucykge1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG9wdGlvbkh0bWwuZm9yRWFjaCgoaXRlbSkgPT5cbiAgICAgIGxpc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgaXRlbSksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsaXN0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG5vUmVzdWx0cyk7XG4gIH1cblxuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gbnVtT3B0aW9uc1xuICAgID8gYCR7bnVtT3B0aW9uc30gcmVzdWx0JHtudW1PcHRpb25zID4gMSA/IFwic1wiIDogXCJcIn0gYXZhaWxhYmxlLmBcbiAgICA6IFwiTm8gcmVzdWx0cy5cIjtcblxuICBsZXQgaXRlbVRvRm9jdXM7XG5cbiAgaWYgKGlzUHJpc3RpbmUgJiYgc2VsZWN0ZWRJdGVtSWQpIHtcbiAgICBpdGVtVG9Gb2N1cyA9IGxpc3RFbC5xdWVyeVNlbGVjdG9yKGAjJHtzZWxlY3RlZEl0ZW1JZH1gKTtcbiAgfSBlbHNlIGlmIChkaXNhYmxlRmlsdGVyaW5nICYmIGZpcnN0Rm91bmRJZCkge1xuICAgIGl0ZW1Ub0ZvY3VzID0gbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoYCMke2ZpcnN0Rm91bmRJZH1gKTtcbiAgfVxuXG4gIGlmIChpdGVtVG9Gb2N1cykge1xuICAgIGhpZ2hsaWdodE9wdGlvbihsaXN0RWwsIGl0ZW1Ub0ZvY3VzLCB7XG4gICAgICBza2lwRm9jdXM6IHRydWUsXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogSGlkZSB0aGUgb3B0aW9uIGxpc3Qgb2YgYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhpZGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgbGlzdEVsLCBzdGF0dXNFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIHN0YXR1c0VsLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIsIFwiXCIpO1xuXG4gIGlmIChmb2N1c2VkT3B0aW9uRWwpIHtcbiAgICBmb2N1c2VkT3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZShMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgfVxuXG4gIGxpc3RFbC5zY3JvbGxUb3AgPSAwO1xuICBsaXN0RWwuaGlkZGVuID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGxpc3RPcHRpb25FbCBUaGUgbGlzdCBvcHRpb24gYmVpbmcgc2VsZWN0ZWRcbiAqL1xuY29uc3Qgc2VsZWN0SXRlbSA9IChsaXN0T3B0aW9uRWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGxpc3RPcHRpb25FbCk7XG5cbiAgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsLCBsaXN0T3B0aW9uRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsLCBsaXN0T3B0aW9uRWwudGV4dENvbnRlbnQpO1xuICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogQ2xlYXIgdGhlIGlucHV0IG9mIHRoZSBjb21ibyBib3hcbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBjbGVhckJ1dHRvbkVsIFRoZSBjbGVhciBpbnB1dCBidXR0b25cbiAqL1xuY29uc3QgY2xlYXJJbnB1dCA9IChjbGVhckJ1dHRvbkVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBzZWxlY3RFbCwgaW5wdXRFbCB9ID1cbiAgICBnZXRDb21ib0JveENvbnRleHQoY2xlYXJCdXR0b25FbCk7XG4gIGNvbnN0IGxpc3RTaG93biA9ICFsaXN0RWwuaGlkZGVuO1xuXG4gIGlmIChzZWxlY3RFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKHNlbGVjdEVsKTtcbiAgaWYgKGlucHV0RWwudmFsdWUpIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgY29tYm9Cb3hFbC5jbGFzc0xpc3QucmVtb3ZlKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG5cbiAgaWYgKGxpc3RTaG93bikgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIHNlbGVjdCBiYXNlZCBvZmYgb2YgY3VycmVudGx5IHNldCBzZWxlY3QgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCByZXNldFNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdFZhbHVlID0gc2VsZWN0RWwudmFsdWU7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSAoaW5wdXRFbC52YWx1ZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChzZWxlY3RWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IHNlbGVjdFZhbHVlKSB7XG4gICAgICAgIGlmIChpbnB1dFZhbHVlICE9PSBvcHRpb25FbC50ZXh0KSB7XG4gICAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGFuIG9wdGlvbiBsaXN0IG9mIHRoZSBjb21ibyBib3ggY29tcG9uZW50IGJhc2VkIG9mZiBvZlxuICogaGF2aW5nIGEgY3VycmVudCBmb2N1c2VkIGxpc3Qgb3B0aW9uIG9yXG4gKiBoYXZpbmcgdGVzdCB0aGF0IGNvbXBsZXRlbHkgbWF0Y2hlcyBhIGxpc3Qgb3B0aW9uLlxuICogT3RoZXJ3aXNlIGl0IGNsZWFycyB0aGUgaW5wdXQgYW5kIHNlbGVjdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBjb21wbGV0ZVNlbGVjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsLCBzdGF0dXNFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKGlucHV0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuICAgICAgaWYgKG9wdGlvbkVsLnRleHQudG9Mb3dlckNhc2UoKSA9PT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIG9wdGlvbkVsLnZhbHVlKTtcbiAgICAgICAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIG9wdGlvbkVsLnRleHQpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5hZGQoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVzY2FwZSBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgaW5wdXRFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIHJlc2V0U2VsZWN0aW9uKGNvbWJvQm94RWwpO1xuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZG93biBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRG93bkZyb21JbnB1dCA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGNvbnN0IG5leHRPcHRpb25FbCA9XG4gICAgbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCkgfHxcbiAgICBsaXN0RWwucXVlcnlTZWxlY3RvcihMSVNUX09QVElPTik7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihjb21ib0JveEVsLCBuZXh0T3B0aW9uRWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGFuIGlucHV0IGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVudGVyRnJvbUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgY29tcGxldGVTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG5cbiAgaWYgKGxpc3RTaG93bikge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBkb3duIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgZm9jdXNlZE9wdGlvbkVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBuZXh0T3B0aW9uRWwgPSBmb2N1c2VkT3B0aW9uRWwubmV4dFNpYmxpbmc7XG5cbiAgaWYgKG5leHRPcHRpb25FbCkge1xuICAgIGhpZ2hsaWdodE9wdGlvbihmb2N1c2VkT3B0aW9uRWwsIG5leHRPcHRpb25FbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIHNwYWNlIGV2ZW50IGZyb20gYW4gbGlzdCBvcHRpb24gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlU3BhY2VGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBzZWxlY3RJdGVtKGV2ZW50LnRhcmdldCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZW50ZXIgZXZlbnQgZnJvbSBsaXN0IG9wdGlvbiB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRW50ZXJGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBzZWxlY3RJdGVtKGV2ZW50LnRhcmdldCk7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgdXAgZXZlbnQgZnJvbSBsaXN0IG9wdGlvbiB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoXG4gICAgZXZlbnQudGFyZ2V0LFxuICApO1xuICBjb25zdCBuZXh0T3B0aW9uRWwgPSBmb2N1c2VkT3B0aW9uRWwgJiYgZm9jdXNlZE9wdGlvbkVsLnByZXZpb3VzU2libGluZztcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgaGlnaGxpZ2h0T3B0aW9uKGNvbWJvQm94RWwsIG5leHRPcHRpb25FbCk7XG5cbiAgaWYgKGxpc3RTaG93bikge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBpZiAoIW5leHRPcHRpb25FbCkge1xuICAgIGhpZGVMaXN0KGNvbWJvQm94RWwpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCBsaXN0IG9wdGlvbiBvbiB0aGUgbW91c2VvdmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIG1vdXNlb3ZlciBldmVudFxuICogQHBhcmFtIHtIVE1MTElFbGVtZW50fSBsaXN0T3B0aW9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlTW91c2VvdmVyID0gKGxpc3RPcHRpb25FbCkgPT4ge1xuICBjb25zdCBpc0N1cnJlbnRseUZvY3VzZWQgPSBsaXN0T3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgIExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MsXG4gICk7XG5cbiAgaWYgKGlzQ3VycmVudGx5Rm9jdXNlZCkgcmV0dXJuO1xuXG4gIGhpZ2hsaWdodE9wdGlvbihsaXN0T3B0aW9uRWwsIGxpc3RPcHRpb25FbCwge1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWUsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgdGhlIGxpc3Qgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCB0b2dnbGVMaXN0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChsaXN0RWwuaGlkZGVuKSB7XG4gICAgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cblxuICBpbnB1dEVsLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVDbGlja0Zyb21JbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIGxpc3RFbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9XG59O1xuXG5jb25zdCBjb21ib0JveCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaGFuZGxlQ2xpY2tGcm9tSW5wdXQodGhpcyk7XG4gICAgICB9LFxuICAgICAgW1RPR0dMRV9MSVNUX0JVVFRPTl0oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIHRvZ2dsZUxpc3QodGhpcyk7XG4gICAgICB9LFxuICAgICAgW0xJU1RfT1BUSU9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgc2VsZWN0SXRlbSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbQ0xFQVJfSU5QVVRfQlVUVE9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgY2xlYXJJbnB1dCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW0NPTUJPX0JPWF0oZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgcmVzZXRTZWxlY3Rpb24odGhpcyk7XG4gICAgICAgICAgaGlkZUxpc3QodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbQ09NQk9fQk9YXToga2V5bWFwKHtcbiAgICAgICAgRXNjYXBlOiBoYW5kbGVFc2NhcGUsXG4gICAgICB9KSxcbiAgICAgIFtJTlBVVF06IGtleW1hcCh7XG4gICAgICAgIEVudGVyOiBoYW5kbGVFbnRlckZyb21JbnB1dCxcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgICBEb3duOiBoYW5kbGVEb3duRnJvbUlucHV0LFxuICAgICAgfSksXG4gICAgICBbTElTVF9PUFRJT05dOiBrZXltYXAoe1xuICAgICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21MaXN0T3B0aW9uLFxuICAgICAgICBVcDogaGFuZGxlVXBGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIERvd246IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbixcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFwiIFwiOiBoYW5kbGVTcGFjZUZyb21MaXN0T3B0aW9uLFxuICAgICAgICBcIlNoaWZ0K1RhYlwiOiBub29wLFxuICAgICAgfSksXG4gICAgfSxcbiAgICBpbnB1dDoge1xuICAgICAgW0lOUFVUXSgpIHtcbiAgICAgICAgY29uc3QgY29tYm9Cb3hFbCA9IHRoaXMuY2xvc2VzdChDT01CT19CT1gpO1xuICAgICAgICBjb21ib0JveEVsLmNsYXNzTGlzdC5yZW1vdmUoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcbiAgICAgICAgZGlzcGxheUxpc3QodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgbW91c2VvdmVyOiB7XG4gICAgICBbTElTVF9PUFRJT05dKCkge1xuICAgICAgICBoYW5kbGVNb3VzZW92ZXIodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhDT01CT19CT1gsIHJvb3QpLmZvckVhY2goKGNvbWJvQm94RWwpID0+IHtcbiAgICAgICAgZW5oYW5jZUNvbWJvQm94KGNvbWJvQm94RWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRDb21ib0JveENvbnRleHQsXG4gICAgZW5oYW5jZUNvbWJvQm94LFxuICAgIGdlbmVyYXRlRHluYW1pY1JlZ0V4cCxcbiAgICBkaXNhYmxlLFxuICAgIGVuYWJsZSxcbiAgICBkaXNwbGF5TGlzdCxcbiAgICBoaWRlTGlzdCxcbiAgICBDT01CT19CT1hfQ0xBU1MsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbWJvQm94O1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgYWN0aXZlRWxlbWVudCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9hY3RpdmUtZWxlbWVudFwiKTtcbmNvbnN0IGlzSW9zRGV2aWNlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2lzLWlvcy1kZXZpY2VcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1waWNrZXJgO1xuY29uc3QgREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fd3JhcHBlcmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTklUSUFMSVpFRF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfS0taW5pdGlhbGl6ZWRgO1xuY29uc3QgREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9LS1hY3RpdmVgO1xuY29uc3QgREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2ludGVybmFsLWlucHV0YDtcbmNvbnN0IERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19leHRlcm5hbC1pbnB1dGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2J1dHRvbmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fY2FsZW5kYXJgO1xuY29uc3QgREFURV9QSUNLRVJfU1RBVFVTX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19zdGF0dXNgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fZGF0ZWA7XG5cbmNvbnN0IENBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfU0VMRUNURURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9QUkVWSU9VU19NT05USF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1wcmV2aW91cy1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tY3VycmVudC1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX05FWFRfTU9OVEhfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tbmV4dC1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1RPREFZX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXRvZGF5YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9TVEFSVF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1yYW5nZS1kYXRlLXN0YXJ0YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9FTkRfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tcmFuZ2UtZGF0ZS1lbmRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9XSVRISU5fUkFOR0VfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0td2l0aGluLXJhbmdlYDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLXllYXJgO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3ByZXZpb3VzLW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbmV4dC15ZWFyYDtcbmNvbnN0IENBTEVOREFSX05FWFRfTU9OVEhfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aC1zZWxlY3Rpb25gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT05fQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3llYXItc2VsZWN0aW9uYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9GT0NVU0VEX0NMQVNTID0gYCR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX1NFTEVDVEVEX0NMQVNTID0gYCR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X195ZWFyYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUyA9IGAke0NBTEVOREFSX1lFQVJfQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNURURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfS0tc2VsZWN0ZWRgO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fcHJldmlvdXMteWVhci1jaHVua2A7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX25leHQteWVhci1jaHVua2A7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fZGF0ZS1waWNrZXJgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aC1waWNrZXJgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3llYXItcGlja2VyYDtcbmNvbnN0IENBTEVOREFSX1RBQkxFX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X190YWJsZWA7XG5jb25zdCBDQUxFTkRBUl9ST1dfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3Jvd2A7XG5jb25zdCBDQUxFTkRBUl9DRUxMX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19jZWxsYDtcbmNvbnN0IENBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTID0gYCR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30tLWNlbnRlci1pdGVtc2A7XG5jb25zdCBDQUxFTkRBUl9NT05USF9MQUJFTF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbW9udGgtbGFiZWxgO1xuY29uc3QgQ0FMRU5EQVJfREFZX09GX1dFRUtfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2RheS1vZi13ZWVrYDtcblxuY29uc3QgREFURV9QSUNLRVIgPSBgLiR7REFURV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0JVVFRPTiA9IGAuJHtEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUID0gYC4ke0RBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVCA9IGAuJHtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfQ0FMRU5EQVIgPSBgLiR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX1NUQVRVUyA9IGAuJHtEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEUgPSBgLiR7Q0FMRU5EQVJfREFURV9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9GT0NVU0VEID0gYC4ke0NBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIID0gYC4ke0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUiA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19NT05USCA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSID0gYC4ke0NBTEVOREFSX05FWFRfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9NT05USCA9IGAuJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTiA9IGAuJHtDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OID0gYC4ke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEggPSBgLiR7Q0FMRU5EQVJfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVIgPSBgLiR7Q0FMRU5EQVJfWUVBUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyA9IGAuJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTksgPSBgLiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfUElDS0VSID0gYC4ke0NBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0ZPQ1VTRUQgPSBgLiR7Q0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9GT0NVU0VEID0gYC4ke0NBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTU31gO1xuXG5jb25zdCBWQUxJREFUSU9OX01FU1NBR0UgPSBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGVcIjtcblxuY29uc3QgTU9OVEhfTEFCRUxTID0gW1xuICBcIkphbnVhcnlcIixcbiAgXCJGZWJydWFyeVwiLFxuICBcIk1hcmNoXCIsXG4gIFwiQXByaWxcIixcbiAgXCJNYXlcIixcbiAgXCJKdW5lXCIsXG4gIFwiSnVseVwiLFxuICBcIkF1Z3VzdFwiLFxuICBcIlNlcHRlbWJlclwiLFxuICBcIk9jdG9iZXJcIixcbiAgXCJOb3ZlbWJlclwiLFxuICBcIkRlY2VtYmVyXCIsXG5dO1xuXG5jb25zdCBEQVlfT0ZfV0VFS19MQUJFTFMgPSBbXG4gIFwiU3VuZGF5XCIsXG4gIFwiTW9uZGF5XCIsXG4gIFwiVHVlc2RheVwiLFxuICBcIldlZG5lc2RheVwiLFxuICBcIlRodXJzZGF5XCIsXG4gIFwiRnJpZGF5XCIsXG4gIFwiU2F0dXJkYXlcIixcbl07XG5cbmNvbnN0IEVOVEVSX0tFWUNPREUgPSAxMztcblxuY29uc3QgWUVBUl9DSFVOSyA9IDEyO1xuXG5jb25zdCBERUZBVUxUX01JTl9EQVRFID0gXCIwMDAwLTAxLTAxXCI7XG5jb25zdCBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUID0gXCJNTS9ERC9ZWVlZXCI7XG5jb25zdCBJTlRFUk5BTF9EQVRFX0ZPUk1BVCA9IFwiWVlZWS1NTS1ERFwiO1xuXG5jb25zdCBOT1RfRElTQUJMRURfU0VMRUNUT1IgPSBcIjpub3QoW2Rpc2FibGVkXSlcIjtcblxuY29uc3QgcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyA9ICguLi5zZWxlY3RvcnMpID0+XG4gIHNlbGVjdG9ycy5tYXAoKHF1ZXJ5KSA9PiBxdWVyeSArIE5PVF9ESVNBQkxFRF9TRUxFQ1RPUikuam9pbihcIiwgXCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9GT0NVU0FCTEUgPSBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzKFxuICBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSLFxuICBDQUxFTkRBUl9QUkVWSU9VU19NT05USCxcbiAgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RJT04sXG4gIENBTEVOREFSX01PTlRIX1NFTEVDVElPTixcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSLFxuICBDQUxFTkRBUl9ORVhUX01PTlRILFxuICBDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQsXG4pO1xuXG5jb25zdCBNT05USF9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCxcbik7XG5cbmNvbnN0IFlFQVJfUElDS0VSX0ZPQ1VTQUJMRSA9IHByb2Nlc3NGb2N1c2FibGVTZWxlY3RvcnMoXG4gIENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTkssXG4gIENBTEVOREFSX05FWFRfWUVBUl9DSFVOSyxcbiAgQ0FMRU5EQVJfWUVBUl9GT0NVU0VELFxuKTtcblxuLy8gI3JlZ2lvbiBEYXRlIE1hbmlwdWxhdGlvbiBGdW5jdGlvbnNcblxuLyoqXG4gKiBLZWVwIGRhdGUgd2l0aGluIG1vbnRoLiBNb250aCB3b3VsZCBvbmx5IGJlIG92ZXIgYnkgMSB0byAzIGRheXNcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVUb0NoZWNrIHRoZSBkYXRlIG9iamVjdCB0byBjaGVja1xuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHRoZSBjb3JyZWN0IG1vbnRoXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGRhdGUsIGNvcnJlY3RlZCBpZiBuZWVkZWRcbiAqL1xuY29uc3Qga2VlcERhdGVXaXRoaW5Nb250aCA9IChkYXRlVG9DaGVjaywgbW9udGgpID0+IHtcbiAgaWYgKG1vbnRoICE9PSBkYXRlVG9DaGVjay5nZXRNb250aCgpKSB7XG4gICAgZGF0ZVRvQ2hlY2suc2V0RGF0ZSgwKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlVG9DaGVjaztcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgZnJvbSBtb250aCBkYXkgeWVhclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIHRoZSB5ZWFyIHRvIHNldFxuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHRoZSBtb250aCB0byBzZXQgKHplcm8taW5kZXhlZClcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIHNldFxuICogQHJldHVybnMge0RhdGV9IHRoZSBzZXQgZGF0ZVxuICovXG5jb25zdCBzZXREYXRlID0gKHllYXIsIG1vbnRoLCBkYXRlKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhcih5ZWFyLCBtb250aCwgZGF0ZSk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiB0b2RheXMgZGF0ZVxuICpcbiAqIEByZXR1cm5zIHtEYXRlfSB0b2RheXMgZGF0ZVxuICovXG5jb25zdCB0b2RheSA9ICgpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGRheSA9IG5ld0RhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCBtb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgeWVhciA9IG5ld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgcmV0dXJuIHNldERhdGUoeWVhciwgbW9udGgsIGRheSk7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIGZpcnN0IGRheSBvZiB0aGUgbW9udGhcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdGFydE9mTW9udGggPSAoZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gbGFzdCBkYXkgb2YgdGhlIG1vbnRoXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgbGFzdERheU9mTW9udGggPSAoZGF0ZSkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoMCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIEFkZCBkYXlzIHRvIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bURheXMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5c1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZERheXMgPSAoX2RhdGUsIG51bURheXMpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG4gIG5ld0RhdGUuc2V0RGF0ZShuZXdEYXRlLmdldERhdGUoKSArIG51bURheXMpO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgZGF5cyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bURheXMgdGhlIGRpZmZlcmVuY2UgaW4gZGF5c1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YkRheXMgPSAoX2RhdGUsIG51bURheXMpID0+IGFkZERheXMoX2RhdGUsIC1udW1EYXlzKTtcblxuLyoqXG4gKiBBZGQgd2Vla3MgdG8gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRXZWVrcyA9IChfZGF0ZSwgbnVtV2Vla3MpID0+IGFkZERheXMoX2RhdGUsIG51bVdlZWtzICogNyk7XG5cbi8qKlxuICogU3VidHJhY3Qgd2Vla3MgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1XZWVrcyB0aGUgZGlmZmVyZW5jZSBpbiB3ZWVrc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1YldlZWtzID0gKF9kYXRlLCBudW1XZWVrcykgPT4gYWRkV2Vla3MoX2RhdGUsIC1udW1XZWVrcyk7XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIChTdW5kYXkpXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdGFydE9mV2VlayA9IChfZGF0ZSkgPT4ge1xuICBjb25zdCBkYXlPZldlZWsgPSBfZGF0ZS5nZXREYXkoKTtcbiAgcmV0dXJuIHN1YkRheXMoX2RhdGUsIGRheU9mV2Vlayk7XG59O1xuXG4vKipcbiAqIFNldCBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHdlZWsgKFNhdHVyZGF5KVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtV2Vla3MgdGhlIGRpZmZlcmVuY2UgaW4gd2Vla3NcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBlbmRPZldlZWsgPSAoX2RhdGUpID0+IHtcbiAgY29uc3QgZGF5T2ZXZWVrID0gX2RhdGUuZ2V0RGF5KCk7XG4gIHJldHVybiBhZGREYXlzKF9kYXRlLCA2IC0gZGF5T2ZXZWVrKTtcbn07XG5cbi8qKlxuICogQWRkIG1vbnRocyB0byBkYXRlIGFuZCBrZWVwIGRhdGUgd2l0aGluIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1Nb250aHMgdGhlIGRpZmZlcmVuY2UgaW4gbW9udGhzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkTW9udGhzID0gKF9kYXRlLCBudW1Nb250aHMpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgY29uc3QgZGF0ZU1vbnRoID0gKG5ld0RhdGUuZ2V0TW9udGgoKSArIDEyICsgbnVtTW9udGhzKSAlIDEyO1xuICBuZXdEYXRlLnNldE1vbnRoKG5ld0RhdGUuZ2V0TW9udGgoKSArIG51bU1vbnRocyk7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgZGF0ZU1vbnRoKTtcblxuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogU3VidHJhY3QgbW9udGhzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtTW9udGhzIHRoZSBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN1Yk1vbnRocyA9IChfZGF0ZSwgbnVtTW9udGhzKSA9PiBhZGRNb250aHMoX2RhdGUsIC1udW1Nb250aHMpO1xuXG4vKipcbiAqIEFkZCB5ZWFycyB0byBkYXRlIGFuZCBrZWVwIGRhdGUgd2l0aGluIG1vbnRoXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1ZZWFycyB0aGUgZGlmZmVyZW5jZSBpbiB5ZWFyc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZFllYXJzID0gKF9kYXRlLCBudW1ZZWFycykgPT4gYWRkTW9udGhzKF9kYXRlLCBudW1ZZWFycyAqIDEyKTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB5ZWFycyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVllYXJzIHRoZSBkaWZmZXJlbmNlIGluIHllYXJzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3ViWWVhcnMgPSAoX2RhdGUsIG51bVllYXJzKSA9PiBhZGRZZWFycyhfZGF0ZSwgLW51bVllYXJzKTtcblxuLyoqXG4gKiBTZXQgbW9udGhzIG9mIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG1vbnRoIHplcm8taW5kZXhlZCBtb250aCB0byBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzZXRNb250aCA9IChfZGF0ZSwgbW9udGgpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgbmV3RGF0ZS5zZXRNb250aChtb250aCk7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgbW9udGgpO1xuXG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBTZXQgeWVhciBvZiBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyIHRoZSB5ZWFyIHRvIHNldFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHNldFllYXIgPSAoX2RhdGUsIHllYXIpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKF9kYXRlLmdldFRpbWUoKSk7XG5cbiAgY29uc3QgbW9udGggPSBuZXdEYXRlLmdldE1vbnRoKCk7XG4gIG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhcik7XG4gIGtlZXBEYXRlV2l0aGluTW9udGgobmV3RGF0ZSwgbW9udGgpO1xuXG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGVhcmxpZXN0IGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZWFybGllc3QgZGF0ZVxuICovXG5jb25zdCBtaW4gPSAoZGF0ZUEsIGRhdGVCKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZUE7XG5cbiAgaWYgKGRhdGVCIDwgZGF0ZUEpIHtcbiAgICBuZXdEYXRlID0gZGF0ZUI7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxhdGVzdCBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGxhdGVzdCBkYXRlXG4gKi9cbmNvbnN0IG1heCA9IChkYXRlQSwgZGF0ZUIpID0+IHtcbiAgbGV0IG5ld0RhdGUgPSBkYXRlQTtcblxuICBpZiAoZGF0ZUIgPiBkYXRlQSkge1xuICAgIG5ld0RhdGUgPSBkYXRlQjtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGFyZSB0aGUgaW4gdGhlIHNhbWUgeWVhclxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyBpbiB0aGUgc2FtZSB5ZWFyXG4gKi9cbmNvbnN0IGlzU2FtZVllYXIgPSAoZGF0ZUEsIGRhdGVCKSA9PlxuICBkYXRlQSAmJiBkYXRlQiAmJiBkYXRlQS5nZXRGdWxsWWVhcigpID09PSBkYXRlQi5nZXRGdWxsWWVhcigpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGFyZSB0aGUgaW4gdGhlIHNhbWUgbW9udGhcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgaW4gdGhlIHNhbWUgbW9udGhcbiAqL1xuY29uc3QgaXNTYW1lTW9udGggPSAoZGF0ZUEsIGRhdGVCKSA9PlxuICBpc1NhbWVZZWFyKGRhdGVBLCBkYXRlQikgJiYgZGF0ZUEuZ2V0TW9udGgoKSA9PT0gZGF0ZUIuZ2V0TW9udGgoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBhcmUgdGhlIHNhbWUgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgdGhlIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSB0aGUgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIHRoZSBzYW1lIGRhdGVcbiAqL1xuY29uc3QgaXNTYW1lRGF5ID0gKGRhdGVBLCBkYXRlQikgPT5cbiAgaXNTYW1lTW9udGgoZGF0ZUEsIGRhdGVCKSAmJiBkYXRlQS5nZXREYXRlKCkgPT09IGRhdGVCLmdldERhdGUoKTtcblxuLyoqXG4gKiByZXR1cm4gYSBuZXcgZGF0ZSB3aXRoaW4gbWluaW11bSBhbmQgbWF4aW11bSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gKi9cbmNvbnN0IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PiB7XG4gIGxldCBuZXdEYXRlID0gZGF0ZTtcblxuICBpZiAoZGF0ZSA8IG1pbkRhdGUpIHtcbiAgICBuZXdEYXRlID0gbWluRGF0ZTtcbiAgfSBlbHNlIGlmIChtYXhEYXRlICYmIGRhdGUgPiBtYXhEYXRlKSB7XG4gICAgbmV3RGF0ZSA9IG1heERhdGU7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUobmV3RGF0ZS5nZXRUaW1lKCkpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBpcyB2YWxpZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybiB7Ym9vbGVhbn0gaXMgdGhlcmUgYSBkYXkgd2l0aGluIHRoZSBtb250aCB3aXRoaW4gbWluIGFuZCBtYXggZGF0ZXNcbiAqL1xuY29uc3QgaXNEYXRlV2l0aGluTWluQW5kTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+XG4gIGRhdGUgPj0gbWluRGF0ZSAmJiAoIW1heERhdGUgfHwgZGF0ZSA8PSBtYXhEYXRlKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyBtb250aCBpcyBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyB0aGUgbW9udGggb3V0c2lkZSBtaW4gb3IgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZXNNb250aE91dHNpZGVNaW5Pck1heCA9IChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKSA9PlxuICBsYXN0RGF5T2ZNb250aChkYXRlKSA8IG1pbkRhdGUgfHwgKG1heERhdGUgJiYgc3RhcnRPZk1vbnRoKGRhdGUpID4gbWF4RGF0ZSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgeWVhciBpcyBpbnZhbGlkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyB0aGUgbW9udGggb3V0c2lkZSBtaW4gb3IgbWF4IGRhdGVzXG4gKi9cbmNvbnN0IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+XG4gIGxhc3REYXlPZk1vbnRoKHNldE1vbnRoKGRhdGUsIDExKSkgPCBtaW5EYXRlIHx8XG4gIChtYXhEYXRlICYmIHN0YXJ0T2ZNb250aChzZXRNb250aChkYXRlLCAwKSkgPiBtYXhEYXRlKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEYXRlUmFuZ2VDb250ZXh0XG4gKiBAcHJvcGVydHkge0RhdGV9IHJhbmdlU3RhcnREYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHJhbmdlRW5kRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSB3aXRoaW5SYW5nZVN0YXJ0RGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSB3aXRoaW5SYW5nZUVuZERhdGVcbiAqL1xuXG4vKipcbiAqIFNldCB0aGUgc3RhcnQsIGVuZCwgYW5kIHdpdGhpbiByYW5nZSB2YWx1ZXMgZm9yIGRhdGUgcmFuZ2UgdmFyaWFudHMuXG5cbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIERhdGUgdGhhdCBjb25jbHVkZXMgdGhlIGRhdGUgcmFuZ2UuXG4gKiBAcGFyYW0ge0RhdGV9IHJhbmdlRGF0ZSAtIFJhbmdlIGRhdGUgZGF0YSBhdHRyaWJ1dGUgdmFsdWUgb2YgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqIEByZXR1cm5zIHtEYXRlUmFuZ2VDb250ZXh0fSAtIERhdGVzIGZvciByYW5nZSBzZWxlY3Rpb24uXG4gKi9cbmNvbnN0IHNldFJhbmdlRGF0ZXMgPSAoZGF0ZSwgcmFuZ2VEYXRlKSA9PiB7XG4gIGNvbnN0IHJhbmdlQ29uY2x1c2lvbkRhdGUgPSBkYXRlO1xuICBjb25zdCByYW5nZVN0YXJ0RGF0ZSA9IHJhbmdlRGF0ZSAmJiBtaW4ocmFuZ2VDb25jbHVzaW9uRGF0ZSwgcmFuZ2VEYXRlKTtcbiAgY29uc3QgcmFuZ2VFbmREYXRlID0gcmFuZ2VEYXRlICYmIG1heChyYW5nZUNvbmNsdXNpb25EYXRlLCByYW5nZURhdGUpO1xuXG4gIGNvbnN0IHdpdGhpblJhbmdlU3RhcnREYXRlID0gcmFuZ2VEYXRlICYmIGFkZERheXMocmFuZ2VTdGFydERhdGUsIDEpO1xuICBjb25zdCB3aXRoaW5SYW5nZUVuZERhdGUgPSByYW5nZURhdGUgJiYgc3ViRGF5cyhyYW5nZUVuZERhdGUsIDEpO1xuXG4gIHJldHVybiB7XG4gICAgcmFuZ2VTdGFydERhdGUsXG4gICAgcmFuZ2VFbmREYXRlLFxuICAgIHdpdGhpblJhbmdlU3RhcnREYXRlLFxuICAgIHdpdGhpblJhbmdlRW5kRGF0ZSxcbiAgfTtcbn07XG5cbi8qKlxuICogUGFyc2UgYSBkYXRlIHdpdGggZm9ybWF0IE0tRC1ZWVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRlU3RyaW5nIHRoZSBkYXRlIHN0cmluZyB0byBwYXJzZVxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZSBzdHJpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWRqdXN0RGF0ZSBzaG91bGQgdGhlIGRhdGUgYmUgYWRqdXN0ZWRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGVcbiAqL1xuY29uc3QgcGFyc2VEYXRlU3RyaW5nID0gKFxuICBkYXRlU3RyaW5nLFxuICBkYXRlRm9ybWF0ID0gSU5URVJOQUxfREFURV9GT1JNQVQsXG4gIGFkanVzdERhdGUgPSBmYWxzZSxcbikgPT4ge1xuICBsZXQgZGF0ZTtcbiAgbGV0IG1vbnRoO1xuICBsZXQgZGF5O1xuICBsZXQgeWVhcjtcbiAgbGV0IHBhcnNlZDtcblxuICBpZiAoZGF0ZVN0cmluZykge1xuICAgIGxldCBtb250aFN0cjtcbiAgICBsZXQgZGF5U3RyO1xuICAgIGxldCB5ZWFyU3RyO1xuXG4gICAgaWYgKGRhdGVGb3JtYXQgPT09IERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpIHtcbiAgICAgIFttb250aFN0ciwgZGF5U3RyLCB5ZWFyU3RyXSA9IGRhdGVTdHJpbmcuc3BsaXQoXCIvXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBbeWVhclN0ciwgbW9udGhTdHIsIGRheVN0cl0gPSBkYXRlU3RyaW5nLnNwbGl0KFwiLVwiKTtcbiAgICB9XG5cbiAgICBpZiAoeWVhclN0cikge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQoeWVhclN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICB5ZWFyID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIHllYXIgPSBNYXRoLm1heCgwLCB5ZWFyKTtcbiAgICAgICAgICBpZiAoeWVhclN0ci5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IHRvZGF5KCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyU3R1YiA9XG4gICAgICAgICAgICAgIGN1cnJlbnRZZWFyIC0gKGN1cnJlbnRZZWFyICUgMTAgKiogeWVhclN0ci5sZW5ndGgpO1xuICAgICAgICAgICAgeWVhciA9IGN1cnJlbnRZZWFyU3R1YiArIHBhcnNlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9udGhTdHIpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KG1vbnRoU3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIG1vbnRoID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIG1vbnRoID0gTWF0aC5tYXgoMSwgbW9udGgpO1xuICAgICAgICAgIG1vbnRoID0gTWF0aC5taW4oMTIsIG1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aCAmJiBkYXlTdHIgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludChkYXlTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgZGF5ID0gcGFyc2VkO1xuICAgICAgICBpZiAoYWRqdXN0RGF0ZSkge1xuICAgICAgICAgIGNvbnN0IGxhc3REYXlPZlRoZU1vbnRoID0gc2V0RGF0ZSh5ZWFyLCBtb250aCwgMCkuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGRheSA9IE1hdGgubWF4KDEsIGRheSk7XG4gICAgICAgICAgZGF5ID0gTWF0aC5taW4obGFzdERheU9mVGhlTW9udGgsIGRheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9udGggJiYgZGF5ICYmIHllYXIgIT0gbnVsbCkge1xuICAgICAgZGF0ZSA9IHNldERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlO1xufTtcblxuLyoqXG4gKiBGb3JtYXQgYSBkYXRlIHRvIGZvcm1hdCBNTS1ERC1ZWVlZXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIHRoZSBkYXRlIHRvIGZvcm1hdFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVGb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZSBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqL1xuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlLCBkYXRlRm9ybWF0ID0gSU5URVJOQUxfREFURV9GT1JNQVQpID0+IHtcbiAgY29uc3QgcGFkWmVyb3MgPSAodmFsdWUsIGxlbmd0aCkgPT4gYDAwMDAke3ZhbHVlfWAuc2xpY2UoLWxlbmd0aCk7XG5cbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICBpZiAoZGF0ZUZvcm1hdCA9PT0gREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCkge1xuICAgIHJldHVybiBbcGFkWmVyb3MobW9udGgsIDIpLCBwYWRaZXJvcyhkYXksIDIpLCBwYWRaZXJvcyh5ZWFyLCA0KV0uam9pbihcIi9cIik7XG4gIH1cblxuICByZXR1cm4gW3BhZFplcm9zKHllYXIsIDQpLCBwYWRaZXJvcyhtb250aCwgMiksIHBhZFplcm9zKGRheSwgMildLmpvaW4oXCItXCIpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBEYXRlIE1hbmlwdWxhdGlvbiBGdW5jdGlvbnNcblxuLyoqXG4gKiBDcmVhdGUgYSBncmlkIHN0cmluZyBmcm9tIGFuIGFycmF5IG9mIGh0bWwgc3RyaW5nc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nW119IGh0bWxBcnJheSB0aGUgYXJyYXkgb2YgaHRtbCBpdGVtc1xuICogQHBhcmFtIHtudW1iZXJ9IHJvd1NpemUgdGhlIGxlbmd0aCBvZiBhIHJvd1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIGdyaWQgc3RyaW5nXG4gKi9cbmNvbnN0IGxpc3RUb0dyaWRIdG1sID0gKGh0bWxBcnJheSwgcm93U2l6ZSkgPT4ge1xuICBjb25zdCBncmlkID0gW107XG4gIGxldCByb3cgPSBbXTtcblxuICBsZXQgaSA9IDA7XG4gIHdoaWxlIChpIDwgaHRtbEFycmF5Lmxlbmd0aCkge1xuICAgIHJvdyA9IFtdO1xuXG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoICYmIHJvdy5sZW5ndGggPCByb3dTaXplKSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIHRkLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBodG1sQXJyYXlbaV0pO1xuICAgICAgcm93LnB1c2godGQpO1xuICAgICAgaSArPSAxO1xuICAgIH1cblxuICAgIHJvdy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICB0ci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBncmlkLnB1c2godHIpO1xuICB9XG5cbiAgcmV0dXJuIGdyaWQ7XG59O1xuXG5jb25zdCBjcmVhdGVUYWJsZUJvZHkgPSAoZ3JpZCkgPT4ge1xuICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG4gIGdyaWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIHRhYmxlQm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWxlbWVudCk7XG4gIH0pO1xuXG4gIHJldHVybiB0YWJsZUJvZHk7XG59O1xuXG4vKipcbiAqIHNldCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgYW5kIGRpc3BhdGNoIGEgY2hhbmdlIGV2ZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBUaGUgZWxlbWVudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIG9mIHRoZSBlbGVtZW50XG4gKi9cbmNvbnN0IGNoYW5nZUVsZW1lbnRWYWx1ZSA9IChlbCwgdmFsdWUgPSBcIlwiKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb0NoYW5nZSA9IGVsO1xuICBlbGVtZW50VG9DaGFuZ2UudmFsdWUgPSB2YWx1ZTtcblxuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcImNoYW5nZVwiLCB7XG4gICAgYnViYmxlczogdHJ1ZSxcbiAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgIGRldGFpbDogeyB2YWx1ZSB9LFxuICB9KTtcbiAgZWxlbWVudFRvQ2hhbmdlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBkYXRlIHBpY2tlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IERhdGVQaWNrZXJDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBjYWxlbmRhckVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRlUGlja2VyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW50ZXJuYWxJbnB1dEVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGV4dGVybmFsSW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gc3RhdHVzRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGZpcnN0WWVhckNodW5rRWxcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gY2FsZW5kYXJEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IG1pbkRhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gbWF4RGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBzZWxlY3RlZERhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gcmFuZ2VEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IGRlZmF1bHREYXRlXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGhlIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlclxuICogQHJldHVybnMge0RhdGVQaWNrZXJDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXREYXRlUGlja2VyQ29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBkYXRlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUElDS0VSKTtcblxuICBpZiAoIWRhdGVQaWNrZXJFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7REFURV9QSUNLRVJ9YCk7XG4gIH1cblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVCxcbiAgKTtcbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVQsXG4gICk7XG4gIGNvbnN0IGNhbGVuZGFyRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9DQUxFTkRBUik7XG4gIGNvbnN0IHRvZ2dsZUJ0bkVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoREFURV9QSUNLRVJfQlVUVE9OKTtcbiAgY29uc3Qgc3RhdHVzRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9TVEFUVVMpO1xuICBjb25zdCBmaXJzdFllYXJDaHVua0VsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUik7XG5cbiAgY29uc3QgaW5wdXREYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGV4dGVybmFsSW5wdXRFbC52YWx1ZSxcbiAgICBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFULFxuICAgIHRydWUsXG4gICk7XG4gIGNvbnN0IHNlbGVjdGVkRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhpbnRlcm5hbElucHV0RWwudmFsdWUpO1xuXG4gIGNvbnN0IGNhbGVuZGFyRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhjYWxlbmRhckVsLmRhdGFzZXQudmFsdWUpO1xuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpO1xuICBjb25zdCBtYXhEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUpO1xuICBjb25zdCByYW5nZURhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQucmFuZ2VEYXRlKTtcbiAgY29uc3QgZGVmYXVsdERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQuZGVmYXVsdERhdGUpO1xuXG4gIGlmIChtaW5EYXRlICYmIG1heERhdGUgJiYgbWluRGF0ZSA+IG1heERhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pbXVtIGRhdGUgY2Fubm90IGJlIGFmdGVyIG1heGltdW0gZGF0ZVwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FsZW5kYXJEYXRlLFxuICAgIG1pbkRhdGUsXG4gICAgdG9nZ2xlQnRuRWwsXG4gICAgc2VsZWN0ZWREYXRlLFxuICAgIG1heERhdGUsXG4gICAgZmlyc3RZZWFyQ2h1bmtFbCxcbiAgICBkYXRlUGlja2VyRWwsXG4gICAgaW5wdXREYXRlLFxuICAgIGludGVybmFsSW5wdXRFbCxcbiAgICBleHRlcm5hbElucHV0RWwsXG4gICAgY2FsZW5kYXJFbCxcbiAgICByYW5nZURhdGUsXG4gICAgZGVmYXVsdERhdGUsXG4gICAgc3RhdHVzRWwsXG4gIH07XG59O1xuXG4vKipcbiAqIERpc2FibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgdG9nZ2xlQnRuRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICB0b2dnbGVCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGV4dGVybmFsSW5wdXRFbC5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCB0aGUgcmVhZG9ubHkgYXR0cmlidXRlIHRvIGlucHV0IGVsZW1lbnQgYW5kIHRoZSBhcmlhLWRpc2FibGVkIGF0dHJpYnV0ZSB0byB0aGUgdG9nZ2xlIGNhbGVuZGFyIGJ1dHRvbiBhbmQgZXh0ZXJuYWwgaW5wdXQgZWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZGF0ZSBwaWNrZXIgZWxlbWVudFxuICovXG5jb25zdCBhcmlhRGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgdG9nZ2xlQnRuRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICB0b2dnbGVCdG5FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHRydWUpO1xuICBleHRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiLCB0cnVlKTtcbiAgZXh0ZXJuYWxJbnB1dEVsLnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIFwiXCIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5hYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIHRvZ2dsZUJ0bkVsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG5cbiAgZXh0ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGV4dGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xuICBleHRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG59O1xuXG4vLyAjcmVnaW9uIFZhbGlkYXRpb25cblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGUgdmFsdWUgaW4gdGhlIGlucHV0IGFzIGEgdmFsaWQgZGF0ZSBvZiBmb3JtYXQgTS9EL1lZWVlcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGlzRGF0ZUlucHV0SW52YWxpZCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCwgbWluRGF0ZSwgbWF4RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGNvbnN0IGRhdGVTdHJpbmcgPSBleHRlcm5hbElucHV0RWwudmFsdWU7XG4gIGxldCBpc0ludmFsaWQgPSBmYWxzZTtcblxuICBpZiAoZGF0ZVN0cmluZykge1xuICAgIGlzSW52YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCBkYXRlU3RyaW5nUGFydHMgPSBkYXRlU3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICBjb25zdCBbbW9udGgsIGRheSwgeWVhcl0gPSBkYXRlU3RyaW5nUGFydHMubWFwKChzdHIpID0+IHtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkgdmFsdWUgPSBwYXJzZWQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAobW9udGggJiYgZGF5ICYmIHllYXIgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY2hlY2tEYXRlID0gc2V0RGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY2hlY2tEYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoIC0gMSAmJlxuICAgICAgICBjaGVja0RhdGUuZ2V0RGF0ZSgpID09PSBkYXkgJiZcbiAgICAgICAgY2hlY2tEYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiZcbiAgICAgICAgZGF0ZVN0cmluZ1BhcnRzWzJdLmxlbmd0aCA9PT0gNCAmJlxuICAgICAgICBpc0RhdGVXaXRoaW5NaW5BbmRNYXgoY2hlY2tEYXRlLCBtaW5EYXRlLCBtYXhEYXRlKVxuICAgICAgKSB7XG4gICAgICAgIGlzSW52YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0ludmFsaWQ7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgYXMgYSB2YWxpZCBkYXRlIG9mIGZvcm1hdCBNL0QvWVlZWVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdmFsaWRhdGVEYXRlSW5wdXQgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgaXNJbnZhbGlkID0gaXNEYXRlSW5wdXRJbnZhbGlkKGV4dGVybmFsSW5wdXRFbCk7XG5cbiAgaWYgKGlzSW52YWxpZCAmJiAhZXh0ZXJuYWxJbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgZXh0ZXJuYWxJbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFZBTElEQVRJT05fTUVTU0FHRSk7XG4gIH1cblxuICBpZiAoIWlzSW52YWxpZCAmJiBleHRlcm5hbElucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2UgPT09IFZBTElEQVRJT05fTUVTU0FHRSkge1xuICAgIGV4dGVybmFsSW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShcIlwiKTtcbiAgfVxufTtcblxuLy8gI2VuZHJlZ2lvbiBWYWxpZGF0aW9uXG5cbi8qKlxuICogRW5hYmxlIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHJlY29uY2lsZUlucHV0VmFsdWVzID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW50ZXJuYWxJbnB1dEVsLCBpbnB1dERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgbGV0IG5ld1ZhbHVlID0gXCJcIjtcblxuICBpZiAoaW5wdXREYXRlICYmICFpc0RhdGVJbnB1dEludmFsaWQoZWwpKSB7XG4gICAgbmV3VmFsdWUgPSBmb3JtYXREYXRlKGlucHV0RGF0ZSk7XG4gIH1cblxuICBpZiAoaW50ZXJuYWxJbnB1dEVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnRlcm5hbElucHV0RWwsIG5ld1ZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgdGhlIHZhbHVlIG9mIHRoZSBkYXRlIHBpY2tlciBpbnB1dHMuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdHJpbmcgVGhlIGRhdGUgc3RyaW5nIHRvIHVwZGF0ZSBpbiBZWVlZLU1NLUREIGZvcm1hdFxuICovXG5jb25zdCBzZXRDYWxlbmRhclZhbHVlID0gKGVsLCBkYXRlU3RyaW5nKSA9PiB7XG4gIGNvbnN0IHBhcnNlZERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVN0cmluZyk7XG5cbiAgaWYgKHBhcnNlZERhdGUpIHtcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShwYXJzZWREYXRlLCBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKTtcblxuICAgIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBpbnRlcm5hbElucHV0RWwsIGV4dGVybmFsSW5wdXRFbCB9ID1cbiAgICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnRlcm5hbElucHV0RWwsIGRhdGVTdHJpbmcpO1xuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShleHRlcm5hbElucHV0RWwsIGZvcm1hdHRlZERhdGUpO1xuXG4gICAgdmFsaWRhdGVEYXRlSW5wdXQoZGF0ZVBpY2tlckVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VEYXRlUGlja2VyID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9QSUNLRVIpO1xuICBjb25zdCB7IGRlZmF1bHRWYWx1ZSB9ID0gZGF0ZVBpY2tlckVsLmRhdGFzZXQ7XG5cbiAgY29uc3QgaW50ZXJuYWxJbnB1dEVsID0gZGF0ZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0YCk7XG5cbiAgaWYgKCFpbnRlcm5hbElucHV0RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7REFURV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgaW5wdXRgKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwudmFsdWUpIHtcbiAgICBpbnRlcm5hbElucHV0RWwudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgY29uc3QgbWluRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhcbiAgICBkYXRlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlIHx8IGludGVybmFsSW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtaW5cIiksXG4gICk7XG4gIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBtaW5EYXRlXG4gICAgPyBmb3JtYXREYXRlKG1pbkRhdGUpXG4gICAgOiBERUZBVUxUX01JTl9EQVRFO1xuXG4gIGNvbnN0IG1heERhdGUgPSBwYXJzZURhdGVTdHJpbmcoXG4gICAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSB8fCBpbnRlcm5hbElucHV0RWwuZ2V0QXR0cmlidXRlKFwibWF4XCIpLFxuICApO1xuICBpZiAobWF4RGF0ZSkge1xuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1heERhdGUgPSBmb3JtYXREYXRlKG1heERhdGUpO1xuICB9XG5cbiAgY29uc3QgY2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfV1JBUFBFUl9DTEFTUyk7XG5cbiAgY29uc3QgZXh0ZXJuYWxJbnB1dEVsID0gaW50ZXJuYWxJbnB1dEVsLmNsb25lTm9kZSgpO1xuICBleHRlcm5hbElucHV0RWwuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF9DTEFTUyk7XG4gIGV4dGVybmFsSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XG5cbiAgY2FsZW5kYXJXcmFwcGVyLmFwcGVuZENoaWxkKGV4dGVybmFsSW5wdXRFbCk7XG4gIGNhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7REFURV9QSUNLRVJfQlVUVE9OX0NMQVNTfVwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBjYWxlbmRhclwiPjwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCIke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfVwiIHJvbGU9XCJhcHBsaWNhdGlvblwiIGhpZGRlbj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidXNhLXNyLW9ubHkgJHtEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1N9XCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPjwvZGl2PmAsXG4gICk7XG5cbiAgaW50ZXJuYWxJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIGludGVybmFsSW5wdXRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGludGVybmFsSW5wdXRFbC5jbGFzc0xpc3QuYWRkKERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVUX0NMQVNTKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwibmFtZVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnJlcXVpcmVkID0gZmFsc2U7XG5cbiAgZGF0ZVBpY2tlckVsLmFwcGVuZENoaWxkKGNhbGVuZGFyV3JhcHBlcik7XG4gIGRhdGVQaWNrZXJFbC5jbGFzc0xpc3QuYWRkKERBVEVfUElDS0VSX0lOSVRJQUxJWkVEX0NMQVNTKTtcblxuICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgc2V0Q2FsZW5kYXJWYWx1ZShkYXRlUGlja2VyRWwsIGRlZmF1bHRWYWx1ZSk7XG4gIH1cblxuICBpZiAoaW50ZXJuYWxJbnB1dEVsLmRpc2FibGVkKSB7XG4gICAgZGlzYWJsZShkYXRlUGlja2VyRWwpO1xuICAgIGludGVybmFsSW5wdXRFbC5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpKSB7XG4gICAgYXJpYURpc2FibGUoZGF0ZVBpY2tlckVsKTtcbiAgICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbiAgfVxufTtcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIERhdGUgU2VsZWN0aW9uIFZpZXdcblxuLyoqXG4gKiByZW5kZXIgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGVUb0Rpc3BsYXkgYSBkYXRlIHRvIHJlbmRlciBvbiB0aGUgY2FsZW5kYXJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IHJlbmRlckNhbGVuZGFyID0gKGVsLCBfZGF0ZVRvRGlzcGxheSkgPT4ge1xuICBjb25zdCB7XG4gICAgZGF0ZVBpY2tlckVsLFxuICAgIGNhbGVuZGFyRWwsXG4gICAgc3RhdHVzRWwsXG4gICAgc2VsZWN0ZWREYXRlLFxuICAgIG1heERhdGUsXG4gICAgbWluRGF0ZSxcbiAgICByYW5nZURhdGUsXG4gIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHRvZGF5c0RhdGUgPSB0b2RheSgpO1xuICBsZXQgZGF0ZVRvRGlzcGxheSA9IF9kYXRlVG9EaXNwbGF5IHx8IHRvZGF5c0RhdGU7XG5cbiAgY29uc3QgY2FsZW5kYXJXYXNIaWRkZW4gPSBjYWxlbmRhckVsLmhpZGRlbjtcblxuICBjb25zdCBmb2N1c2VkRGF0ZSA9IGFkZERheXMoZGF0ZVRvRGlzcGxheSwgMCk7XG4gIGNvbnN0IGZvY3VzZWRNb250aCA9IGRhdGVUb0Rpc3BsYXkuZ2V0TW9udGgoKTtcbiAgY29uc3QgZm9jdXNlZFllYXIgPSBkYXRlVG9EaXNwbGF5LmdldEZ1bGxZZWFyKCk7XG5cbiAgY29uc3QgcHJldk1vbnRoID0gc3ViTW9udGhzKGRhdGVUb0Rpc3BsYXksIDEpO1xuICBjb25zdCBuZXh0TW9udGggPSBhZGRNb250aHMoZGF0ZVRvRGlzcGxheSwgMSk7XG5cbiAgY29uc3QgY3VycmVudEZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGRhdGVUb0Rpc3BsYXkpO1xuXG4gIGNvbnN0IGZpcnN0T2ZNb250aCA9IHN0YXJ0T2ZNb250aChkYXRlVG9EaXNwbGF5KTtcbiAgY29uc3QgcHJldkJ1dHRvbnNEaXNhYmxlZCA9IGlzU2FtZU1vbnRoKGRhdGVUb0Rpc3BsYXksIG1pbkRhdGUpO1xuICBjb25zdCBuZXh0QnV0dG9uc0Rpc2FibGVkID0gaXNTYW1lTW9udGgoZGF0ZVRvRGlzcGxheSwgbWF4RGF0ZSk7XG5cbiAgY29uc3Qge1xuICAgIHJhbmdlU3RhcnREYXRlLFxuICAgIHJhbmdlRW5kRGF0ZSxcbiAgICB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSxcbiAgICB3aXRoaW5SYW5nZUVuZERhdGUsXG4gIH0gPSBzZXRSYW5nZURhdGVzKHNlbGVjdGVkRGF0ZSB8fCBkYXRlVG9EaXNwbGF5LCByYW5nZURhdGUpO1xuXG4gIGNvbnN0IG1vbnRoTGFiZWwgPSBNT05USF9MQUJFTFNbZm9jdXNlZE1vbnRoXTtcblxuICBjb25zdCBnZW5lcmF0ZURhdGVIdG1sID0gKGRhdGVUb1JlbmRlcikgPT4ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbQ0FMRU5EQVJfREFURV9DTEFTU107XG4gICAgY29uc3QgZGF5ID0gZGF0ZVRvUmVuZGVyLmdldERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IGRhdGVUb1JlbmRlci5nZXRNb250aCgpO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlVG9SZW5kZXIuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlVG9SZW5kZXIuZ2V0RGF5KCk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShkYXRlVG9SZW5kZXIpO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9ICFpc0RhdGVXaXRoaW5NaW5BbmRNYXgoZGF0ZVRvUmVuZGVyLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgc2VsZWN0ZWREYXRlKTtcblxuICAgIGlmIChpc1NhbWVNb250aChkYXRlVG9SZW5kZXIsIHByZXZNb250aCkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1BSRVZJT1VTX01PTlRIX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lTW9udGgoZGF0ZVRvUmVuZGVyLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVNb250aChkYXRlVG9SZW5kZXIsIG5leHRNb250aCkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX05FWFRfTU9OVEhfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHRvZGF5c0RhdGUpKSB7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9UT0RBWV9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKHJhbmdlRGF0ZSkge1xuICAgICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHJhbmdlRGF0ZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZVN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9TVEFSVF9DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCByYW5nZUVuZERhdGUpKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1JBTkdFX0RBVEVfRU5EX0NMQVNTKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpc0RhdGVXaXRoaW5NaW5BbmRNYXgoXG4gICAgICAgICAgZGF0ZVRvUmVuZGVyLFxuICAgICAgICAgIHdpdGhpblJhbmdlU3RhcnREYXRlLFxuICAgICAgICAgIHdpdGhpblJhbmdlRW5kRGF0ZSxcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIGZvY3VzZWREYXRlKSkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX0ZPQ1VTRURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vbnRoU3RyID0gTU9OVEhfTEFCRUxTW21vbnRoXTtcbiAgICBjb25zdCBkYXlTdHIgPSBEQVlfT0ZfV0VFS19MQUJFTFNbZGF5T2ZXZWVrXTtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtZGF5XCIsIGRheSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbW9udGhcIiwgbW9udGggKyAxKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS15ZWFyXCIsIHllYXIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGZvcm1hdHRlZERhdGUpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXG4gICAgICBcImFyaWEtbGFiZWxcIixcbiAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYCR7ZGF5fSAke21vbnRoU3RyfSAke3llYXJ9ICR7ZGF5U3RyfWAsXG4gICAgKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICAgIGlmIChpc0Rpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBidG4udGV4dENvbnRlbnQgPSBkYXk7XG5cbiAgICByZXR1cm4gYnRuO1xuICB9O1xuXG4gIC8vIHNldCBkYXRlIHRvIGZpcnN0IHJlbmRlcmVkIGRheVxuICBkYXRlVG9EaXNwbGF5ID0gc3RhcnRPZldlZWsoZmlyc3RPZk1vbnRoKTtcblxuICBjb25zdCBkYXlzID0gW107XG5cbiAgd2hpbGUgKFxuICAgIGRheXMubGVuZ3RoIDwgMjggfHxcbiAgICBkYXRlVG9EaXNwbGF5LmdldE1vbnRoKCkgPT09IGZvY3VzZWRNb250aCB8fFxuICAgIGRheXMubGVuZ3RoICUgNyAhPT0gMFxuICApIHtcbiAgICBkYXlzLnB1c2goZ2VuZXJhdGVEYXRlSHRtbChkYXRlVG9EaXNwbGF5KSk7XG4gICAgZGF0ZVRvRGlzcGxheSA9IGFkZERheXMoZGF0ZVRvRGlzcGxheSwgMSk7XG4gIH1cblxuICBjb25zdCBkYXRlc0dyaWQgPSBsaXN0VG9HcmlkSHRtbChkYXlzLCA3KTtcblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG4gIG5ld0NhbGVuZGFyLmRhdGFzZXQudmFsdWUgPSBjdXJyZW50Rm9ybWF0dGVkRGF0ZTtcbiAgbmV3Q2FsZW5kYXIuc3R5bGUudG9wID0gYCR7ZGF0ZVBpY2tlckVsLm9mZnNldEhlaWdodH1weGA7XG4gIG5ld0NhbGVuZGFyLmhpZGRlbiA9IGZhbHNlO1xuICBuZXdDYWxlbmRhci5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cIiR7Q0FMRU5EQVJfREFURV9QSUNLRVJfQ0xBU1N9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9ST1dfQ0xBU1N9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgb25lIHllYXJcIlxuICAgICAgICAgICAgJHtwcmV2QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfUFJFVklPVVNfTU9OVEhfQ0xBU1N9XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aFwiXG4gICAgICAgICAgICAke3ByZXZCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9NT05USF9MQUJFTF9DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05fQ0xBU1N9XCIgYXJpYS1sYWJlbD1cIiR7bW9udGhMYWJlbH0uIFNlbGVjdCBtb250aFwiXG4gICAgICAgICAgPiR7bW9udGhMYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiJHtmb2N1c2VkWWVhcn0uIFNlbGVjdCB5ZWFyXCJcbiAgICAgICAgICA+JHtmb2N1c2VkWWVhcn08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9NT05USF9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoXCJcbiAgICAgICAgICAgICR7bmV4dEJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX0NFTExfQ0VOVEVSX0lURU1TX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX05FWFRfWUVBUl9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGZvcndhcmQgb25lIHllYXJcIlxuICAgICAgICAgICAgJHtuZXh0QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuXG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG5cbiAgY29uc3QgdGFibGVIZWFkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVIZWFkKTtcbiAgY29uc3QgdGFibGVIZWFkUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0YWJsZUhlYWQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlSGVhZFJvdyk7XG5cbiAgY29uc3QgZGF5c09mV2VlayA9IHtcbiAgICBTdW5kYXk6IFwiU1wiLFxuICAgIE1vbmRheTogXCJNXCIsXG4gICAgVHVlc2RheTogXCJUXCIsXG4gICAgV2VkbmVzZGF5OiBcIldcIixcbiAgICBUaHVyc2RheTogXCJUaFwiLFxuICAgIEZyaWRheTogXCJGclwiLFxuICAgIFNhdHVyZGF5OiBcIlNcIixcbiAgfTtcblxuICBPYmplY3Qua2V5cyhkYXlzT2ZXZWVrKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9EQVlfT0ZfV0VFS19DTEFTUyk7XG4gICAgdGguc2V0QXR0cmlidXRlKFwic2NvcGVcIiwgXCJjb2xcIik7XG4gICAgdGguc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBrZXkpO1xuICAgIHRoLnRleHRDb250ZW50ID0gZGF5c09mV2Vla1trZXldO1xuICAgIHRhYmxlSGVhZFJvdy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGgpO1xuICB9KTtcblxuICBjb25zdCB0YWJsZUJvZHkgPSBjcmVhdGVUYWJsZUJvZHkoZGF0ZXNHcmlkKTtcbiAgdGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlQm9keSk7XG5cbiAgLy8gQ29udGFpbmVyIGZvciBZZWFycywgTW9udGhzLCBhbmQgRGF5c1xuICBjb25zdCBkYXRlUGlja2VyQ2FsZW5kYXJDb250YWluZXIgPVxuICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuXG4gIGRhdGVQaWNrZXJDYWxlbmRhckNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGUpO1xuXG4gIGNhbGVuZGFyRWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Q2FsZW5kYXIsIGNhbGVuZGFyRWwpO1xuXG4gIGRhdGVQaWNrZXJFbC5jbGFzc0xpc3QuYWRkKERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyk7XG5cbiAgY29uc3Qgc3RhdHVzZXMgPSBbXTtcblxuICBpZiAoaXNTYW1lRGF5KHNlbGVjdGVkRGF0ZSwgZm9jdXNlZERhdGUpKSB7XG4gICAgc3RhdHVzZXMucHVzaChcIlNlbGVjdGVkIGRhdGVcIik7XG4gIH1cblxuICBpZiAoY2FsZW5kYXJXYXNIaWRkZW4pIHtcbiAgICBzdGF0dXNlcy5wdXNoKFxuICAgICAgXCJZb3UgY2FuIG5hdmlnYXRlIGJ5IGRheSB1c2luZyBsZWZ0IGFuZCByaWdodCBhcnJvd3NcIixcbiAgICAgIFwiV2Vla3MgYnkgdXNpbmcgdXAgYW5kIGRvd24gYXJyb3dzXCIsXG4gICAgICBcIk1vbnRocyBieSB1c2luZyBwYWdlIHVwIGFuZCBwYWdlIGRvd24ga2V5c1wiLFxuICAgICAgXCJZZWFycyBieSB1c2luZyBzaGlmdCBwbHVzIHBhZ2UgdXAgYW5kIHNoaWZ0IHBsdXMgcGFnZSBkb3duXCIsXG4gICAgICBcIkhvbWUgYW5kIGVuZCBrZXlzIG5hdmlnYXRlIHRvIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHdlZWtcIixcbiAgICApO1xuICAgIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICBzdGF0dXNlcy5wdXNoKGAke21vbnRoTGFiZWx9ICR7Zm9jdXNlZFllYXJ9YCk7XG4gIH1cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBzdGF0dXNlcy5qb2luKFwiLiBcIik7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNZZWFyID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gc3ViWWVhcnMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1BSRVZJT1VTX1lFQVIpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNNb250aCA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IHN1Yk1vbnRocyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfTU9OVEgpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dE1vbnRoID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gYWRkTW9udGhzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX01PTlRIKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBfYnV0dG9uRWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dFllYXIgPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBhZGRZZWFycyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBIaWRlIHRoZSBjYWxlbmRhciBvZiBhIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhpZGVDYWxlbmRhciA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgY2FsZW5kYXJFbCwgc3RhdHVzRWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBkYXRlUGlja2VyRWwuY2xhc3NMaXN0LnJlbW92ZShEQVRFX1BJQ0tFUl9BQ1RJVkVfQ0xBU1MpO1xuICBjYWxlbmRhckVsLmhpZGRlbiA9IHRydWU7XG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgZGF0ZSB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBjYWxlbmRhckRhdGVFbCBBIGRhdGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBzZWxlY3REYXRlID0gKGNhbGVuZGFyRGF0ZUVsKSA9PiB7XG4gIGlmIChjYWxlbmRhckRhdGVFbC5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBleHRlcm5hbElucHV0RWwgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoY2FsZW5kYXJEYXRlRWwpO1xuXG4gIHNldENhbGVuZGFyVmFsdWUoY2FsZW5kYXJEYXRlRWwsIGNhbGVuZGFyRGF0ZUVsLmRhdGFzZXQudmFsdWUpO1xuICBoaWRlQ2FsZW5kYXIoZGF0ZVBpY2tlckVsKTtcblxuICBleHRlcm5hbElucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHRvZ2dsZUNhbGVuZGFyID0gKGVsKSA9PiB7XG4gIGlmIChlbC5kaXNhYmxlZCB8fCBlbC5oYXNBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlLCBkZWZhdWx0RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgaWYgKGNhbGVuZGFyRWwuaGlkZGVuKSB7XG4gICAgY29uc3QgZGF0ZVRvRGlzcGxheSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChcbiAgICAgIGlucHV0RGF0ZSB8fCBkZWZhdWx0RGF0ZSB8fCB0b2RheSgpLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgKTtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGVUb0Rpc3BsYXkpO1xuICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xuICB9IGVsc2Uge1xuICAgIGhpZGVDYWxlbmRhcihlbCk7XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBjYWxlbmRhciB3aGVuIHZpc2libGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKi9cbmNvbnN0IHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgaW5wdXREYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IGNhbGVuZGFyU2hvd24gPSAhY2FsZW5kYXJFbC5oaWRkZW47XG5cbiAgaWYgKGNhbGVuZGFyU2hvd24gJiYgaW5wdXREYXRlKSB7XG4gICAgY29uc3QgZGF0ZVRvRGlzcGxheSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICAgIHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGVUb0Rpc3BsYXkpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIC0gRGF0ZSBTZWxlY3Rpb24gVmlld1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIC0gTW9udGggU2VsZWN0aW9uIFZpZXdcbi8qKlxuICogRGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbiBpbiB0aGUgZGF0ZSBwaWNrZXIuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgZGlzcGxheU1vbnRoU2VsZWN0aW9uID0gKGVsLCBtb250aFRvRGlzcGxheSkgPT4ge1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIHN0YXR1c0VsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGNvbnN0IHNlbGVjdGVkTW9udGggPSBjYWxlbmRhckRhdGUuZ2V0TW9udGgoKTtcbiAgY29uc3QgZm9jdXNlZE1vbnRoID0gbW9udGhUb0Rpc3BsYXkgPT0gbnVsbCA/IHNlbGVjdGVkTW9udGggOiBtb250aFRvRGlzcGxheTtcblxuICBjb25zdCBtb250aHMgPSBNT05USF9MQUJFTFMubWFwKChtb250aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBtb250aFRvQ2hlY2sgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIGluZGV4KTtcblxuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBpc0RhdGVzTW9udGhPdXRzaWRlTWluT3JNYXgoXG4gICAgICBtb250aFRvQ2hlY2ssXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICApO1xuXG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFtDQUxFTkRBUl9NT05USF9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IGluZGV4ID09PSBzZWxlY3RlZE1vbnRoO1xuXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2VkTW9udGgpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiLCBpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtbGFiZWxcIiwgbW9udGgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IG1vbnRoO1xuXG4gICAgcmV0dXJuIGJ0bjtcbiAgfSk7XG5cbiAgY29uc3QgbW9udGhzSHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1vbnRoc0h0bWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgbW9udGhzSHRtbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1MpO1xuXG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJwcmVzZW50YXRpb25cIik7XG5cbiAgY29uc3QgbW9udGhzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKG1vbnRocywgMyk7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShtb250aHNHcmlkKTtcbiAgdGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlQm9keSk7XG4gIG1vbnRoc0h0bWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRhYmxlKTtcblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBtb250aHNIdG1sKTtcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhIG1vbnRoLlwiO1xuXG4gIHJldHVybiBuZXdDYWxlbmRhcjtcbn07XG5cbi8qKlxuICogU2VsZWN0IGEgbW9udGggaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBtb250aEVsIEFuIG1vbnRoIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0TW9udGggPSAobW9udGhFbCkgPT4ge1xuICBpZiAobW9udGhFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBsZXQgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRNb250aCk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIE1vbnRoIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8qKlxuICogRGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuIGluIHRoZSBkYXRlIHBpY2tlci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge251bWJlcn0geWVhclRvRGlzcGxheSB5ZWFyIHRvIGRpc3BsYXkgaW4geWVhciBzZWxlY3Rpb25cbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gYSByZWZlcmVuY2UgdG8gdGhlIG5ldyBjYWxlbmRhciBlbGVtZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlZZWFyU2VsZWN0aW9uID0gKGVsLCB5ZWFyVG9EaXNwbGF5KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgc3RhdHVzRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gY2FsZW5kYXJEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IGZvY3VzZWRZZWFyID0geWVhclRvRGlzcGxheSA9PSBudWxsID8gc2VsZWN0ZWRZZWFyIDogeWVhclRvRGlzcGxheTtcblxuICBsZXQgeWVhclRvQ2h1bmsgPSBmb2N1c2VkWWVhcjtcbiAgeWVhclRvQ2h1bmsgLT0geWVhclRvQ2h1bmsgJSBZRUFSX0NIVU5LO1xuICB5ZWFyVG9DaHVuayA9IE1hdGgubWF4KDAsIHllYXJUb0NodW5rKTtcblxuICBjb25zdCBwcmV2WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgLSAxKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICk7XG5cbiAgY29uc3QgbmV4dFllYXJDaHVua0Rpc2FibGVkID0gaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXgoXG4gICAgc2V0WWVhcihjYWxlbmRhckRhdGUsIHllYXJUb0NodW5rICsgWUVBUl9DSFVOSyksXG4gICAgbWluRGF0ZSxcbiAgICBtYXhEYXRlLFxuICApO1xuXG4gIGNvbnN0IHllYXJzID0gW107XG4gIGxldCB5ZWFySW5kZXggPSB5ZWFyVG9DaHVuaztcbiAgd2hpbGUgKHllYXJzLmxlbmd0aCA8IFlFQVJfQ0hVTkspIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXgoXG4gICAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhckluZGV4KSxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICk7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX1lFQVJfQ0xBU1NdO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB5ZWFySW5kZXggPT09IHNlbGVjdGVkWWVhcjtcblxuICAgIGlmICh5ZWFySW5kZXggPT09IGZvY3VzZWRZZWFyKSB7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9ZRUFSX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIHllYXJJbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0geWVhckluZGV4O1xuXG4gICAgeWVhcnMucHVzaChidG4pO1xuICAgIHllYXJJbmRleCArPSAxO1xuICB9XG5cbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSBjYWxlbmRhckVsLmNsb25lTm9kZSgpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgY2FsZW5kYXIgd3JhcHBlclxuICBjb25zdCB5ZWFyc0NhbGVuZGFyV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG4gIHllYXJzQ2FsZW5kYXJXcmFwcGVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1lFQVJfUElDS0VSX0NMQVNTKTtcblxuICAvLyBjcmVhdGUgdGFibGUgcGFyZW50XG4gIGNvbnN0IHllYXJzVGFibGVQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHllYXJzVGFibGVQYXJlbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfVEFCTEVfQ0xBU1MpO1xuXG4gIC8vIGNyZWF0ZSB0YWJsZSBib2R5IGFuZCB0YWJsZSByb3dcbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpO1xuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG5cbiAgLy8gY3JlYXRlIHByZXZpb3VzIGJ1dHRvblxuICBjb25zdCBwcmV2aW91c1llYXJzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcHJldmlvdXNZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICBwcmV2aW91c1llYXJzQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktfQ0xBU1MpO1xuICBwcmV2aW91c1llYXJzQnRuLnNldEF0dHJpYnV0ZShcbiAgICBcImFyaWEtbGFiZWxcIixcbiAgICBgTmF2aWdhdGUgYmFjayAke1lFQVJfQ0hVTkt9IHllYXJzYCxcbiAgKTtcbiAgaWYgKHByZXZZZWFyQ2h1bmtEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgIHByZXZpb3VzWWVhcnNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIHByZXZpb3VzWWVhcnNCdG4uaW5uZXJIVE1MID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJm5ic3BgO1xuXG4gIC8vIGNyZWF0ZSBuZXh0IGJ1dHRvblxuICBjb25zdCBuZXh0WWVhcnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXh0WWVhcnNCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgbmV4dFllYXJzQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTUyk7XG4gIG5leHRZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXG4gICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgYE5hdmlnYXRlIGZvcndhcmQgJHtZRUFSX0NIVU5LfSB5ZWFyc2AsXG4gICk7XG4gIGlmIChuZXh0WWVhckNodW5rRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICBuZXh0WWVhcnNCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIG5leHRZZWFyc0J0bi5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAmbmJzcGA7XG5cbiAgLy8gY3JlYXRlIHRoZSBhY3R1YWwgeWVhcnMgdGFibGVcbiAgY29uc3QgeWVhcnNUYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgeWVhcnNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG4gIHllYXJzVGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICAvLyBjcmVhdGUgdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIGNvbnN0IHllYXJzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKHllYXJzLCAzKTtcbiAgY29uc3QgeWVhcnNUYWJsZUJvZHkgPSBjcmVhdGVUYWJsZUJvZHkoeWVhcnNHcmlkKTtcblxuICAvLyBhcHBlbmQgdGhlIGdyaWQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIHllYXJzVGFibGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzVGFibGVCb2R5KTtcblxuICAvLyBjcmVhdGUgdGhlIHByZXYgYnV0dG9uIHRkIGFuZCBhcHBlbmQgdGhlIHByZXYgYnV0dG9uXG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgcHJldmlvdXNZZWFyc0J0bixcbiAgKTtcblxuICAvLyBjcmVhdGUgdGhlIHllYXJzIHRkIGFuZCBhcHBlbmQgdGhlIHllYXJzIGNoaWxkIHRhYmxlXG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbC5zZXRBdHRyaWJ1dGUoXCJjb2xzcGFuXCIsIFwiM1wiKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzVGFibGUpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgbmV4dCBidXR0b24gdGQgYW5kIGFwcGVuZCB0aGUgbmV4dCBidXR0b25cbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsTmV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsTmV4dC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbmV4dFllYXJzQnRuKTtcblxuICAvLyBhcHBlbmQgdGhlIHRocmVlIHRkIHRvIHRoZSB5ZWFycyBjaGlsZCB0YWJsZSByb3dcbiAgeWVhcnNIVE1MVGFibGVCb2R5Um93Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIHllYXJzSFRNTFRhYmxlQm9keURldGFpbFByZXYsXG4gICk7XG4gIHllYXJzSFRNTFRhYmxlQm9keVJvdy5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbCxcbiAgKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5Um93Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIHllYXJzSFRNTFRhYmxlQm9keURldGFpbE5leHQsXG4gICk7XG5cbiAgLy8gYXBwZW5kIHRoZSB0YWJsZSByb3cgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlIGJvZHlcbiAgeWVhcnNIVE1MVGFibGVCb2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cpO1xuXG4gIC8vIGFwcGVuZCB0aGUgeWVhcnMgdGFibGUgYm9keSB0byB0aGUgeWVhcnMgcGFyZW50IHRhYmxlXG4gIHllYXJzVGFibGVQYXJlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzSFRNTFRhYmxlQm9keSk7XG5cbiAgLy8gYXBwZW5kIHRoZSBwYXJlbnQgdGFibGUgdG8gdGhlIGNhbGVuZGFyIHdyYXBwZXJcbiAgeWVhcnNDYWxlbmRhcldyYXBwZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzVGFibGVQYXJlbnQpO1xuXG4gIC8vIGFwcGVuZCB0aGUgeWVhcnMgY2FsZW5kZXIgdG8gdGhlIG5ldyBjYWxlbmRhclxuICBuZXdDYWxlbmRhci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNDYWxlbmRhcldyYXBwZXIpO1xuXG4gIC8vIHJlcGxhY2UgY2FsZW5kYXJcbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBTaG93aW5nIHllYXJzICR7eWVhclRvQ2h1bmt9IHRvICR7XG4gICAgeWVhclRvQ2h1bmsgKyBZRUFSX0NIVU5LIC0gMVxuICB9LiBTZWxlY3QgYSB5ZWFyLmA7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIGJ5IHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5UHJldmlvdXNZZWFyQ2h1bmsgPSAoZWwpID0+IHtcbiAgaWYgKGVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB5ZWFyRWwgPSBjYWxlbmRhckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLnRleHRDb250ZW50LCAxMCk7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IHNlbGVjdGVkWWVhciAtIFlFQVJfQ0hVTks7XG4gIGFkanVzdGVkWWVhciA9IE1hdGgubWF4KDAsIGFkanVzdGVkWWVhcik7XG5cbiAgY29uc3QgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZFllYXIpO1xuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgIGNhbGVuZGFyRWwsXG4gICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpLFxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyk7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBieSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheU5leHRZZWFyQ2h1bmsgPSAoZWwpID0+IHtcbiAgaWYgKGVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB5ZWFyRWwgPSBjYWxlbmRhckVsLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9GT0NVU0VEKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLnRleHRDb250ZW50LCAxMCk7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IHNlbGVjdGVkWWVhciArIFlFQVJfQ0hVTks7XG4gIGFkanVzdGVkWWVhciA9IE1hdGgubWF4KDAsIGFkanVzdGVkWWVhcik7XG5cbiAgY29uc3QgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZFllYXIpO1xuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKFxuICAgIGNhbGVuZGFyRWwsXG4gICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpLFxuICApO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSB5ZWFyIGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0geWVhckVsIEEgeWVhciBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdFllYXIgPSAoeWVhckVsKSA9PiB7XG4gIGlmICh5ZWFyRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoeWVhckVsKTtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLmlubmVySFRNTCwgMTApO1xuICBsZXQgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZFllYXIpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX0RBVEVfRk9DVVNFRCkuZm9jdXMoKTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgLSBZZWFyIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBIaWRlIHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhciA9IChldmVudCkgPT4ge1xuICBjb25zdCB7IGRhdGVQaWNrZXJFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChldmVudC50YXJnZXQpO1xuXG4gIGhpZGVDYWxlbmRhcihkYXRlUGlja2VyRWwpO1xuICBleHRlcm5hbElucHV0RWwuZm9jdXMoKTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBBZGp1c3QgdGhlIGRhdGUgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyIGlmIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhZGp1c3REYXRlRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkanVzdENhbGVuZGFyID0gKGFkanVzdERhdGVGbikgPT4gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChcbiAgICBldmVudC50YXJnZXQsXG4gICk7XG5cbiAgY29uc3QgZGF0ZSA9IGFkanVzdERhdGVGbihjYWxlbmRhckRhdGUpO1xuXG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lRGF5KGNhbGVuZGFyRGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGNhcHBlZERhdGUpO1xuICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJXZWVrcyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkV2Vla3MoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIGRheSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViRGF5cyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgZGF5IGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkRGF5cyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdGFydE9mV2VlayhkYXRlKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVFbmRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBlbmRPZldlZWsoZGF0ZSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkTW9udGhzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJNb250aHMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU2hpZnRQYWdlRG93bkZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGFkZFllYXJzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVNoaWZ0UGFnZVVwRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gc3ViWWVhcnMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIFNldCByYW5nZSBkYXRlIGNsYXNzZXMgd2l0aG91dCByZS1yZW5kZXJpbmcgdGhlIGNhbGVuZGFyLiBDYWxsZWQgd2hlbiBkYXRlIGJ1dHRvbiBpcyBob3ZlcmVkLlxuICogUmV0dXJucyBlYXJseSBpZiB0aGUgZGF0ZSBob3ZlcmVkIGlzIGRpc2FibGVkIG9yIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCBkYXRlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGRhdGVFbCAtIENhbGVuZGFyIGRhdGUgYnV0dG9uIHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICovXG5cbmNvbnN0IGhhbmRsZU1vdXNlb3ZlckZyb21EYXRlID0gKGRhdGVFbCkgPT4ge1xuICBpZiAoZGF0ZUVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgaG92ZXJEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGRhdGVFbC5kYXRhc2V0LnZhbHVlKTtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBzZWxlY3RlZERhdGUsIHJhbmdlRGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZGF0ZUVsKTtcblxuICBpZiAoc2VsZWN0ZWREYXRlKSByZXR1cm47XG5cbiAgY29uc3QgeyB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSwgd2l0aGluUmFuZ2VFbmREYXRlIH0gPSBzZXRSYW5nZURhdGVzKFxuICAgIGhvdmVyRGF0ZSxcbiAgICByYW5nZURhdGUsXG4gICk7XG5cbiAgY29uc3QgZGF0ZUJ1dHRvbnMgPSBjYWxlbmRhckVsLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgYC4ke0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF9DTEFTU31gLFxuICApO1xuXG4gIGRhdGVCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbkRhdGUgPSBwYXJzZURhdGVTdHJpbmcoYnV0dG9uLmRhdGFzZXQudmFsdWUpO1xuICAgIGlmIChcbiAgICAgIGlzRGF0ZVdpdGhpbk1pbkFuZE1heChcbiAgICAgICAgYnV0dG9uRGF0ZSxcbiAgICAgICAgd2l0aGluUmFuZ2VTdGFydERhdGUsXG4gICAgICAgIHdpdGhpblJhbmdlRW5kRGF0ZSxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoQ0FMRU5EQVJfREFURV9XSVRISU5fUkFOR0VfQ0xBU1MpO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIERhdGUgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBNb250aCBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4gaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdE1vbnRoRm4gZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhZGp1c3RlZCBtb250aFxuICovXG5jb25zdCBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbiA9IChhZGp1c3RNb250aEZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgbW9udGhFbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KG1vbnRoRWwuZGF0YXNldC52YWx1ZSwgMTApO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChtb250aEVsKTtcbiAgY29uc3QgY3VycmVudERhdGUgPSBzZXRNb250aChjYWxlbmRhckRhdGUsIHNlbGVjdGVkTW9udGgpO1xuXG4gIGxldCBhZGp1c3RlZE1vbnRoID0gYWRqdXN0TW9udGhGbihzZWxlY3RlZE1vbnRoKTtcbiAgYWRqdXN0ZWRNb250aCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDExLCBhZGp1c3RlZE1vbnRoKSk7XG5cbiAgY29uc3QgZGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRNb250aCk7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGlmICghaXNTYW1lTW9udGgoY3VycmVudERhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5TW9udGhTZWxlY3Rpb24oXG4gICAgICBjYWxlbmRhckVsLFxuICAgICAgY2FwcGVkRGF0ZS5nZXRNb250aCgpLFxuICAgICk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9NT05USF9GT0NVU0VEKS5mb2N1cygpO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgdGhyZWUgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoIC0gMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCB0aHJlZSBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCArIDMpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlTGVmdEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggLSAxKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBtb250aCBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCArIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBzdGFydCBvZiB0aGUgcm93IG9mIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbihcbiAgKG1vbnRoKSA9PiBtb250aCAtIChtb250aCAlIDMpLFxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRW5kRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oXG4gIChtb250aCkgPT4gbW9udGggKyAyIC0gKG1vbnRoICUgMyksXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBsYXN0IG1vbnRoIChEZWNlbWJlcikgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKCgpID0+IDExKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZmlyc3QgbW9udGggKEphbnVhcnkpIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMCk7XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgTW9udGggRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBZZWFyIEV2ZW50IEhhbmRsaW5nXG5cbi8qKlxuICogQWRqdXN0IHRoZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4gaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdFllYXJGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIHllYXJcbiAqL1xuY29uc3QgYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbiA9IChhZGp1c3RZZWFyRm4pID0+IChldmVudCkgPT4ge1xuICBjb25zdCB5ZWFyRWwgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHNlbGVjdGVkWWVhciA9IHBhcnNlSW50KHllYXJFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KHllYXJFbCk7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG5cbiAgbGV0IGFkanVzdGVkWWVhciA9IGFkanVzdFllYXJGbihzZWxlY3RlZFllYXIpO1xuICBhZGp1c3RlZFllYXIgPSBNYXRoLm1heCgwLCBhZGp1c3RlZFllYXIpO1xuXG4gIGNvbnN0IGRhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgYWRqdXN0ZWRZZWFyKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVZZWFyKGN1cnJlbnREYXRlLCBjYXBwZWREYXRlKSkge1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgICBjYWxlbmRhckVsLFxuICAgICAgY2FwcGVkRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlVXBGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlTGVmdEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVJpZ2h0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUhvbWVGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyIC0gKHllYXIgJSAzKSxcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGVuZCBvZiB0aGUgcm93IG9mIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVFbmRGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oXG4gICh5ZWFyKSA9PiB5ZWFyICsgMiAtICh5ZWFyICUgMyksXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIGJhY2sgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSBZRUFSX0NIVU5LLFxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIDEyIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlRG93bkZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyBZRUFSX0NIVU5LLFxuKTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBZZWFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuY29uc3QgdGFiSGFuZGxlciA9IChmb2N1c2FibGUpID0+IHtcbiAgY29uc3QgZ2V0Rm9jdXNhYmxlQ29udGV4dCA9IChlbCkgPT4ge1xuICAgIGNvbnN0IHsgY2FsZW5kYXJFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KGZvY3VzYWJsZSwgY2FsZW5kYXJFbCk7XG5cbiAgICBjb25zdCBmaXJzdFRhYkluZGV4ID0gMDtcbiAgICBjb25zdCBsYXN0VGFiSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZpcnN0VGFiSW5kZXhdO1xuICAgIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbbGFzdFRhYkluZGV4XTtcbiAgICBjb25zdCBmb2N1c0luZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihhY3RpdmVFbGVtZW50KCkpO1xuXG4gICAgY29uc3QgaXNMYXN0VGFiID0gZm9jdXNJbmRleCA9PT0gbGFzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzRmlyc3RUYWIgPSBmb2N1c0luZGV4ID09PSBmaXJzdFRhYkluZGV4O1xuICAgIGNvbnN0IGlzTm90Rm91bmQgPSBmb2N1c0luZGV4ID09PSAtMTtcblxuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2FibGVFbGVtZW50cyxcbiAgICAgIGlzTm90Rm91bmQsXG4gICAgICBmaXJzdFRhYlN0b3AsXG4gICAgICBpc0ZpcnN0VGFiLFxuICAgICAgbGFzdFRhYlN0b3AsXG4gICAgICBpc0xhc3RUYWIsXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHRhYkFoZWFkKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGZpcnN0VGFiU3RvcCwgaXNMYXN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXQsXG4gICAgICApO1xuXG4gICAgICBpZiAoaXNMYXN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0YWJCYWNrKGV2ZW50KSB7XG4gICAgICBjb25zdCB7IGxhc3RUYWJTdG9wLCBpc0ZpcnN0VGFiLCBpc05vdEZvdW5kIH0gPSBnZXRGb2N1c2FibGVDb250ZXh0KFxuICAgICAgICBldmVudC50YXJnZXQsXG4gICAgICApO1xuXG4gICAgICBpZiAoaXNGaXJzdFRhYiB8fCBpc05vdEZvdW5kKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKERBVEVfUElDS0VSX0ZPQ1VTQUJMRSk7XG5jb25zdCBtb250aFBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoTU9OVEhfUElDS0VSX0ZPQ1VTQUJMRSk7XG5jb25zdCB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihZRUFSX1BJQ0tFUl9GT0NVU0FCTEUpO1xuXG4vLyAjZW5kcmVnaW9uIEZvY3VzIEhhbmRsaW5nIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gRGF0ZSBQaWNrZXIgRXZlbnQgRGVsZWdhdGlvbiBSZWdpc3RyYXRpb24gLyBDb21wb25lbnRcblxuY29uc3QgZGF0ZVBpY2tlckV2ZW50cyA9IHtcbiAgW0NMSUNLXToge1xuICAgIFtEQVRFX1BJQ0tFUl9CVVRUT05dKCkge1xuICAgICAgdG9nZ2xlQ2FsZW5kYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfREFURV0oKSB7XG4gICAgICBzZWxlY3REYXRlKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX01PTlRIXSgpIHtcbiAgICAgIHNlbGVjdE1vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1lFQVJdKCkge1xuICAgICAgc2VsZWN0WWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19NT05USF0oKSB7XG4gICAgICBkaXNwbGF5UHJldmlvdXNNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX01PTlRIXSgpIHtcbiAgICAgIGRpc3BsYXlOZXh0TW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl0oKSB7XG4gICAgICBkaXNwbGF5UHJldmlvdXNZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfWUVBUl0oKSB7XG4gICAgICBkaXNwbGF5TmV4dFllYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS10oKSB7XG4gICAgICBkaXNwbGF5UHJldmlvdXNZZWFyQ2h1bmsodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LXSgpIHtcbiAgICAgIGRpc3BsYXlOZXh0WWVhckNodW5rKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl0oKSB7XG4gICAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlNb250aFNlbGVjdGlvbih0aGlzKTtcbiAgICAgIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCkuZm9jdXMoKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTl0oKSB7XG4gICAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlZZWFyU2VsZWN0aW9uKHRoaXMpO1xuICAgICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gICAgfSxcbiAgfSxcbiAga2V5dXA6IHtcbiAgICBbREFURV9QSUNLRVJfQ0FMRU5EQVJdKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlkb3duID0gdGhpcy5kYXRhc2V0LmtleWRvd25LZXlDb2RlO1xuICAgICAgaWYgKGAke2V2ZW50LmtleUNvZGV9YCAhPT0ga2V5ZG93bikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG4gIGtleWRvd246IHtcbiAgICBbREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRdKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVJfS0VZQ09ERSkge1xuICAgICAgICB2YWxpZGF0ZURhdGVJbnB1dCh0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtDQUxFTkRBUl9EQVRFXToga2V5bWFwKHtcbiAgICAgIFVwOiBoYW5kbGVVcEZyb21EYXRlLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tRGF0ZSxcbiAgICAgIERvd246IGhhbmRsZURvd25Gcm9tRGF0ZSxcbiAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21EYXRlLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21EYXRlLFxuICAgICAgQXJyb3dMZWZ0OiBoYW5kbGVMZWZ0RnJvbURhdGUsXG4gICAgICBSaWdodDogaGFuZGxlUmlnaHRGcm9tRGF0ZSxcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbURhdGUsXG4gICAgICBIb21lOiBoYW5kbGVIb21lRnJvbURhdGUsXG4gICAgICBFbmQ6IGhhbmRsZUVuZEZyb21EYXRlLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbURhdGUsXG4gICAgICBQYWdlVXA6IGhhbmRsZVBhZ2VVcEZyb21EYXRlLFxuICAgICAgXCJTaGlmdCtQYWdlRG93blwiOiBoYW5kbGVTaGlmdFBhZ2VEb3duRnJvbURhdGUsXG4gICAgICBcIlNoaWZ0K1BhZ2VVcFwiOiBoYW5kbGVTaGlmdFBhZ2VVcEZyb21EYXRlLFxuICAgICAgVGFiOiBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9EQVRFX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgICBcIlNoaWZ0K1RhYlwiOiBkYXRlUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgfSksXG4gICAgW0NBTEVOREFSX01PTlRIXToga2V5bWFwKHtcbiAgICAgIFVwOiBoYW5kbGVVcEZyb21Nb250aCxcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbU1vbnRoLFxuICAgICAgRG93bjogaGFuZGxlRG93bkZyb21Nb250aCxcbiAgICAgIEFycm93RG93bjogaGFuZGxlRG93bkZyb21Nb250aCxcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tTW9udGgsXG4gICAgICBBcnJvd0xlZnQ6IGhhbmRsZUxlZnRGcm9tTW9udGgsXG4gICAgICBSaWdodDogaGFuZGxlUmlnaHRGcm9tTW9udGgsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21Nb250aCxcbiAgICAgIEhvbWU6IGhhbmRsZUhvbWVGcm9tTW9udGgsXG4gICAgICBFbmQ6IGhhbmRsZUVuZEZyb21Nb250aCxcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21Nb250aCxcbiAgICAgIFBhZ2VVcDogaGFuZGxlUGFnZVVwRnJvbU1vbnRoLFxuICAgIH0pLFxuICAgIFtDQUxFTkRBUl9NT05USF9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiBtb250aFBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgIFwiU2hpZnQrVGFiXCI6IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgfSksXG4gICAgW0NBTEVOREFSX1lFQVJdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbVllYXIsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21ZZWFyLFxuICAgICAgRG93bjogaGFuZGxlRG93bkZyb21ZZWFyLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbVllYXIsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbVllYXIsXG4gICAgICBBcnJvd0xlZnQ6IGhhbmRsZUxlZnRGcm9tWWVhcixcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21ZZWFyLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tWWVhcixcbiAgICAgIEhvbWU6IGhhbmRsZUhvbWVGcm9tWWVhcixcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbVllYXIsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tWWVhcixcbiAgICAgIFBhZ2VVcDogaGFuZGxlUGFnZVVwRnJvbVllYXIsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX1lFQVJfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgIFwiU2hpZnQrVGFiXCI6IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbREFURV9QSUNLRVJfQ0FMRU5EQVJdKGV2ZW50KSB7XG4gICAgICB0aGlzLmRhdGFzZXQua2V5ZG93bktleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgIH0sXG4gICAgW0RBVEVfUElDS0VSXShldmVudCkge1xuICAgICAgY29uc3Qga2V5TWFwID0ga2V5bWFwKHtcbiAgICAgICAgRXNjYXBlOiBoYW5kbGVFc2NhcGVGcm9tQ2FsZW5kYXIsXG4gICAgICB9KTtcblxuICAgICAga2V5TWFwKGV2ZW50KTtcbiAgICB9LFxuICB9LFxuICBmb2N1c291dDoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oKSB7XG4gICAgICB2YWxpZGF0ZURhdGVJbnB1dCh0aGlzKTtcbiAgICB9LFxuICAgIFtEQVRFX1BJQ0tFUl0oZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICBoaWRlQ2FsZW5kYXIodGhpcyk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICBbREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRdKCkge1xuICAgICAgcmVjb25jaWxlSW5wdXRWYWx1ZXModGhpcyk7XG4gICAgICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSh0aGlzKTtcbiAgICB9LFxuICB9LFxufTtcblxuaWYgKCFpc0lvc0RldmljZSgpKSB7XG4gIGRhdGVQaWNrZXJFdmVudHMubW91c2VvdmVyID0ge1xuICAgIFtDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEhdKCkge1xuICAgICAgaGFuZGxlTW91c2VvdmVyRnJvbURhdGUodGhpcyk7XG4gICAgfSxcbiAgfTtcbn1cblxuY29uc3QgZGF0ZVBpY2tlciA9IGJlaGF2aW9yKGRhdGVQaWNrZXJFdmVudHMsIHtcbiAgaW5pdChyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKERBVEVfUElDS0VSLCByb290KS5mb3JFYWNoKChkYXRlUGlja2VyRWwpID0+IHtcbiAgICAgIGVuaGFuY2VEYXRlUGlja2VyKGRhdGVQaWNrZXJFbCk7XG4gICAgfSk7XG4gIH0sXG4gIGdldERhdGVQaWNrZXJDb250ZXh0LFxuICBkaXNhYmxlLFxuICBhcmlhRGlzYWJsZSxcbiAgZW5hYmxlLFxuICBpc0RhdGVJbnB1dEludmFsaWQsXG4gIHNldENhbGVuZGFyVmFsdWUsXG4gIHZhbGlkYXRlRGF0ZUlucHV0LFxuICByZW5kZXJDYWxlbmRhcixcbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUsXG59KTtcblxuLy8gI2VuZHJlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVQaWNrZXI7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3Qge1xuICBnZXREYXRlUGlja2VyQ29udGV4dCxcbiAgaXNEYXRlSW5wdXRJbnZhbGlkLFxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSxcbn0gPSByZXF1aXJlKFwiLi4vLi4vdXNhLWRhdGUtcGlja2VyL3NyYy9pbmRleFwiKTtcblxuY29uc3QgREFURV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcGlja2VyYDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS1kYXRlLXJhbmdlLXBpY2tlcmA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF9DTEFTUyA9IGAke0RBVEVfUkFOR0VfUElDS0VSX0NMQVNTfV9fcmFuZ2Utc3RhcnRgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EX0NMQVNTID0gYCR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9X19yYW5nZS1lbmRgO1xuXG5jb25zdCBEQVRFX1BJQ0tFUiA9IGAuJHtEQVRFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVIgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUID0gYC4ke0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkQgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EX0NMQVNTfWA7XG5cbmNvbnN0IERFRkFVTFRfTUlOX0RBVEUgPSBcIjAwMDAtMDEtMDFcIjtcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBkYXRlIHJhbmdlIHBpY2tlci5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IERhdGVSYW5nZVBpY2tlckNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGVSYW5nZVBpY2tlckVsXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSByYW5nZVN0YXJ0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHJhbmdlRW5kRWxcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKiBAcmV0dXJucyB7RGF0ZVJhbmdlUGlja2VyQ29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0RGF0ZVJhbmdlUGlja2VyQ29udGV4dCA9IChlbCkgPT4ge1xuICBjb25zdCBkYXRlUmFuZ2VQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9SQU5HRV9QSUNLRVIpO1xuXG4gIGlmICghZGF0ZVJhbmdlUGlja2VyRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RBVEVfUkFOR0VfUElDS0VSfWApO1xuICB9XG5cbiAgY29uc3QgcmFuZ2VTdGFydEVsID0gZGF0ZVJhbmdlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVCxcbiAgKTtcbiAgY29uc3QgcmFuZ2VFbmRFbCA9IGRhdGVSYW5nZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5ELFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgZGF0ZVJhbmdlUGlja2VyRWwsXG4gICAgcmFuZ2VTdGFydEVsLFxuICAgIHJhbmdlRW5kRWwsXG4gIH07XG59O1xuXG4vKipcbiAqIGhhbmRsZSB1cGRhdGUgZnJvbSByYW5nZSBzdGFydCBkYXRlIHBpY2tlclxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIGFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHJhbmdlIHBpY2tlclxuICovXG5jb25zdCBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVJhbmdlUGlja2VyRWwsIHJhbmdlU3RhcnRFbCwgcmFuZ2VFbmRFbCB9ID1cbiAgICBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KHJhbmdlU3RhcnRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZUVuZEVsLmRhdGFzZXQubWluRGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSB8fCBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5yYW5nZURhdGUgPSBcIlwiO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZUVuZEVsKTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlRW5kVXBkYXRlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVJhbmdlUGlja2VyRWwsIHJhbmdlU3RhcnRFbCwgcmFuZ2VFbmRFbCB9ID1cbiAgICBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KHJhbmdlRW5kRWwpO1xuICBjb25zdCB1cGRhdGVkRGF0ZSA9IGludGVybmFsSW5wdXRFbC52YWx1ZTtcblxuICBpZiAodXBkYXRlZERhdGUgJiYgIWlzRGF0ZUlucHV0SW52YWxpZChpbnRlcm5hbElucHV0RWwpKSB7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQubWF4RGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LmRlZmF1bHREYXRlID0gdXBkYXRlZERhdGU7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQubWF4RGF0ZSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSB8fCBcIlwiO1xuICAgIHJhbmdlU3RhcnRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSBcIlwiO1xuICB9XG5cbiAgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUocmFuZ2VTdGFydEVsKTtcbn07XG5cbi8qKlxuICogRW5oYW5jZSBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlIHBpY2tlciBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIFRoZSBpbml0aWFsIHdyYXBwaW5nIGVsZW1lbnQgb2YgdGhlIGRhdGUgcmFuZ2UgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBlbmhhbmNlRGF0ZVJhbmdlUGlja2VyID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVSYW5nZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1JBTkdFX1BJQ0tFUik7XG5cbiAgY29uc3QgW3JhbmdlU3RhcnQsIHJhbmdlRW5kXSA9IHNlbGVjdChEQVRFX1BJQ0tFUiwgZGF0ZVJhbmdlUGlja2VyRWwpO1xuXG4gIGlmICghcmFuZ2VTdGFydCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0RBVEVfUkFOR0VfUElDS0VSfSBpcyBtaXNzaW5nIGlubmVyIHR3byAnJHtEQVRFX1BJQ0tFUn0nIGVsZW1lbnRzYCxcbiAgICApO1xuICB9XG5cbiAgaWYgKCFyYW5nZUVuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGAke0RBVEVfUkFOR0VfUElDS0VSfSBpcyBtaXNzaW5nIHNlY29uZCAnJHtEQVRFX1BJQ0tFUn0nIGVsZW1lbnRgLFxuICAgICk7XG4gIH1cblxuICByYW5nZVN0YXJ0LmNsYXNzTGlzdC5hZGQoREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1MpO1xuICByYW5nZUVuZC5jbGFzc0xpc3QuYWRkKERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORF9DTEFTUyk7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUpIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgPSBERUZBVUxUX01JTl9EQVRFO1xuICB9XG5cbiAgY29uc3QgeyBtaW5EYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICByYW5nZVN0YXJ0LmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG4gIHJhbmdlRW5kLmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGU7XG5cbiAgY29uc3QgeyBtYXhEYXRlIH0gPSBkYXRlUmFuZ2VQaWNrZXJFbC5kYXRhc2V0O1xuICBpZiAobWF4RGF0ZSkge1xuICAgIHJhbmdlU3RhcnQuZGF0YXNldC5tYXhEYXRlID0gbWF4RGF0ZTtcbiAgICByYW5nZUVuZC5kYXRhc2V0Lm1heERhdGUgPSBtYXhEYXRlO1xuICB9XG5cbiAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZShkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gIGhhbmRsZVJhbmdlRW5kVXBkYXRlKGRhdGVSYW5nZVBpY2tlckVsKTtcbn07XG5cbmNvbnN0IGRhdGVSYW5nZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJpbnB1dCBjaGFuZ2VcIjoge1xuICAgICAgW0RBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VTdGFydFVwZGF0ZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EXSgpIHtcbiAgICAgICAgaGFuZGxlUmFuZ2VFbmRVcGRhdGUodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhEQVRFX1JBTkdFX1BJQ0tFUiwgcm9vdCkuZm9yRWFjaCgoZGF0ZVJhbmdlUGlja2VyRWwpID0+IHtcbiAgICAgICAgZW5oYW5jZURhdGVSYW5nZVBpY2tlcihkYXRlUmFuZ2VQaWNrZXJFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkYXRlUmFuZ2VQaWNrZXI7XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zYW5pdGl6ZXJcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBEUk9QWk9ORV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dGA7XG5jb25zdCBEUk9QWk9ORSA9IGAuJHtEUk9QWk9ORV9DTEFTU31gO1xuY29uc3QgSU5QVVRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2lucHV0YDtcbmNvbnN0IFRBUkdFVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fdGFyZ2V0YDtcbmNvbnN0IElOUFVUID0gYC4ke0lOUFVUX0NMQVNTfWA7XG5jb25zdCBCT1hfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2JveGA7XG5jb25zdCBJTlNUUlVDVElPTlNfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2luc3RydWN0aW9uc2A7XG5jb25zdCBQUkVWSUVXX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3YDtcbmNvbnN0IFBSRVZJRVdfSEVBRElOR19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fcHJldmlldy1oZWFkaW5nYDtcbmNvbnN0IERJU0FCTEVEX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0LS1kaXNhYmxlZGA7XG5jb25zdCBDSE9PU0VfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2Nob29zZWA7XG5jb25zdCBBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2FjY2VwdGVkLWZpbGVzLW1lc3NhZ2VgO1xuY29uc3QgRFJBR19URVhUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19kcmFnLXRleHRgO1xuY29uc3QgRFJBR19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dC0tZHJhZ2A7XG5jb25zdCBMT0FESU5HX0NMQVNTID0gXCJpcy1sb2FkaW5nXCI7XG5jb25zdCBJTlZBTElEX0ZJTEVfQ0xBU1MgPSBcImhhcy1pbnZhbGlkLWZpbGVcIjtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWltYWdlYDtcbmNvbnN0IEdFTkVSSUNfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tZ2VuZXJpY2A7XG5jb25zdCBQREZfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0tcGRmYDtcbmNvbnN0IFdPUkRfUFJFVklFV19DTEFTUyA9IGAke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfS0td29yZGA7XG5jb25zdCBWSURFT19QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS12aWRlb2A7XG5jb25zdCBFWENFTF9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1leGNlbGA7XG5jb25zdCBTUl9PTkxZX0NMQVNTID0gYCR7UFJFRklYfS1zci1vbmx5YDtcbmNvbnN0IFNQQUNFUl9HSUYgPVxuICBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBN1wiO1xuXG5sZXQgVFlQRV9JU19WQUxJRCA9IEJvb2xlYW4odHJ1ZSk7IC8vIGxvZ2ljIGdhdGUgZm9yIGNoYW5nZSBsaXN0ZW5lclxubGV0IERFRkFVTFRfQVJJQV9MQUJFTF9URVhUID0gXCJcIjtcbmxldCBERUZBVUxUX0ZJTEVfU1RBVFVTX1RFWFQgPSBcIlwiO1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGZpbGUgaW5wdXQuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBGaWxlSW5wdXRDb250ZXh0XG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBkcm9wWm9uZUVsXG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0RWxcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGZpbGUgaW5wdXQgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dFxuICogQHJldHVybnMge0ZpbGVJbnB1dENvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldEZpbGVJbnB1dENvbnRleHQgPSAoZWwpID0+IHtcbiAgY29uc3QgZHJvcFpvbmVFbCA9IGVsLmNsb3Nlc3QoRFJPUFpPTkUpO1xuXG4gIGlmICghZHJvcFpvbmVFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7RFJPUFpPTkV9YCk7XG4gIH1cblxuICBjb25zdCBpbnB1dEVsID0gZHJvcFpvbmVFbC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcblxuICByZXR1cm4ge1xuICAgIGRyb3Bab25lRWwsXG4gICAgaW5wdXRFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRyb3Bab25lRWwsIGlucHV0RWwgfSA9IGdldEZpbGVJbnB1dENvbnRleHQoZWwpO1xuXG4gIGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xuICBkcm9wWm9uZUVsLmNsYXNzTGlzdC5hZGQoRElTQUJMRURfQ0xBU1MpO1xufTtcblxuLyoqXG4gKiBTZXQgYXJpYS1kaXNhYmxlZCBhdHRyaWJ1dGUgdG8gZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnRcbiAqL1xuY29uc3QgYXJpYURpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBkcm9wWm9uZUVsLmNsYXNzTGlzdC5hZGQoRElTQUJMRURfQ0xBU1MpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuYWJsZSA9IChlbCkgPT4ge1xuICBjb25zdCB7IGRyb3Bab25lRWwsIGlucHV0RWwgfSA9IGdldEZpbGVJbnB1dENvbnRleHQoZWwpO1xuXG4gIGlucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QucmVtb3ZlKERJU0FCTEVEX0NMQVNTKTtcbiAgZHJvcFpvbmVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHMgc3BlY2lhbCBjaGFyYWN0ZXJzXG4gKiBAcmV0dXJucyB7U3RyaW5nfSByZXBsYWNlcyBzcGVjaWZpZWQgdmFsdWVzXG4gKi9cbmNvbnN0IHJlcGxhY2VOYW1lID0gKHMpID0+IHtcbiAgY29uc3QgYyA9IHMuY2hhckNvZGVBdCgwKTtcbiAgaWYgKGMgPT09IDMyKSByZXR1cm4gXCItXCI7XG4gIGlmIChjID49IDY1ICYmIGMgPD0gOTApIHJldHVybiBgaW1nXyR7cy50b0xvd2VyQ2FzZSgpfWA7XG4gIHJldHVybiBgX18keyhcIjAwMFwiLCBjLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpfWA7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gSUQgbmFtZSBmb3IgZWFjaCBmaWxlIHRoYXQgc3RyaXBzIGFsbCBpbnZhbGlkIGNoYXJhY3RlcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIG5hbWUgb2YgdGhlIGZpbGUgYWRkZWQgdG8gZmlsZSBpbnB1dCAoc2VhcmNodmFsdWUpXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzYW1lIGNoYXJhY3RlcnMgYXMgdGhlIG5hbWUgd2l0aCBpbnZhbGlkIGNoYXJzIHJlbW92ZWQgKG5ld3ZhbHVlKVxuICovXG5jb25zdCBtYWtlU2FmZUZvcklEID0gKG5hbWUpID0+IG5hbWUucmVwbGFjZSgvW15hLXowLTldL2csIHJlcGxhY2VOYW1lKTtcblxuLy8gVGFrZXMgYSBnZW5lcmF0ZWQgc2FmZSBJRCBhbmQgY3JlYXRlcyBhIHVuaXF1ZSBJRC5cbmNvbnN0IGNyZWF0ZVVuaXF1ZUlEID0gKG5hbWUpID0+XG4gIGAke25hbWV9LSR7TWF0aC5mbG9vcihEYXRlLm5vdygpLnRvU3RyaW5nKCkgLyAxMDAwKX1gO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIHNpbmd1bGFyIG9yIHBsdXJhbCBpdGVtIGxhYmVsIHNob3VsZCBiZSB1c2VkXG4gKiBEZXRlcm1pbmF0aW9uIGlzIGJhc2VkIG9uIHRoZSBwcmVzZW5jZSBvZiB0aGUgYG11bHRpcGxlYCBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gVGhlIGlucHV0IGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9IFRoZSBzaW5ndWxhciBvciBwbHVyYWwgdmVyc2lvbiBvZiBcIml0ZW1cIlxuICovXG5jb25zdCBnZXRJdGVtc0xhYmVsID0gKGZpbGVJbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGFjY2VwdHNNdWx0aXBsZSA9IGZpbGVJbnB1dEVsLmhhc0F0dHJpYnV0ZShcIm11bHRpcGxlXCIpO1xuICBjb25zdCBpdGVtc0xhYmVsID0gYWNjZXB0c011bHRpcGxlID8gXCJmaWxlc1wiIDogXCJmaWxlXCI7XG5cbiAgcmV0dXJuIGl0ZW1zTGFiZWw7XG59O1xuXG4vKipcbiAqIFNjYWZmb2xkIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudCB3aXRoIGEgcGFyZW50IHdyYXBwZXIgYW5kXG4gKiBDcmVhdGUgYSB0YXJnZXQgYXJlYSBvdmVybGF5IGZvciBkcmFnIGFuZCBkcm9wIGZ1bmN0aW9uYWxpdHlcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gVGhlIGlucHV0IGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9IFRoZSBkcmFnIGFuZCBkcm9wIHRhcmdldCBhcmVhLlxuICovXG5jb25zdCBjcmVhdGVUYXJnZXRBcmVhID0gKGZpbGVJbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGZpbGVJbnB1dFBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGRyb3BUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIC8vIEFkZHMgY2xhc3MgbmFtZXMgYW5kIG90aGVyIGF0dHJpYnV0ZXNcbiAgZmlsZUlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZShEUk9QWk9ORV9DTEFTUyk7XG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5hZGQoSU5QVVRfQ0xBU1MpO1xuICBmaWxlSW5wdXRQYXJlbnQuY2xhc3NMaXN0LmFkZChEUk9QWk9ORV9DTEFTUyk7XG4gIGJveC5jbGFzc0xpc3QuYWRkKEJPWF9DTEFTUyk7XG4gIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChUQVJHRVRfQ0xBU1MpO1xuXG4gIC8vIEFkZHMgY2hpbGQgZWxlbWVudHMgdG8gdGhlIERPTVxuICBkcm9wVGFyZ2V0LnByZXBlbmQoYm94KTtcbiAgZmlsZUlucHV0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZHJvcFRhcmdldCwgZmlsZUlucHV0RWwpO1xuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShmaWxlSW5wdXRQYXJlbnQsIGRyb3BUYXJnZXQpO1xuICBkcm9wVGFyZ2V0LmFwcGVuZENoaWxkKGZpbGVJbnB1dEVsKTtcbiAgZmlsZUlucHV0UGFyZW50LmFwcGVuZENoaWxkKGRyb3BUYXJnZXQpO1xuXG4gIHJldHVybiBkcm9wVGFyZ2V0O1xufTtcblxuLyoqXG4gKiBCdWlsZCB0aGUgdmlzaWJsZSBlbGVtZW50IHdpdGggZGVmYXVsdCBpbnRlcmFjdGlvbiBpbnN0cnVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgY29udGFpbmVyIGZvciB2aXNpYmxlIGludGVyYWN0aW9uIGluc3RydWN0aW9ucy5cbiAqL1xuY29uc3QgY3JlYXRlVmlzaWJsZUluc3RydWN0aW9ucyA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBmaWxlSW5wdXRQYXJlbnQgPSBmaWxlSW5wdXRFbC5jbG9zZXN0KERST1BaT05FKTtcbiAgY29uc3QgaXRlbXNMYWJlbCA9IGdldEl0ZW1zTGFiZWwoZmlsZUlucHV0RWwpO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkcmFnVGV4dCA9IGBEcmFnICR7aXRlbXNMYWJlbH0gaGVyZSBvcmA7XG4gIGNvbnN0IGNob29zZVRleHQgPSBcImNob29zZSBmcm9tIGZvbGRlclwiO1xuXG4gIC8vIENyZWF0ZSBpbnN0cnVjdGlvbnMgdGV4dCBmb3IgYXJpYS1sYWJlbFxuICBERUZBVUxUX0FSSUFfTEFCRUxfVEVYVCA9IGAke2RyYWdUZXh0fSAke2Nob29zZVRleHR9YDtcblxuICAvLyBBZGRzIGNsYXNzIG5hbWVzIGFuZCBvdGhlciBhdHRyaWJ1dGVzXG4gIGluc3RydWN0aW9ucy5jbGFzc0xpc3QuYWRkKElOU1RSVUNUSU9OU19DTEFTUyk7XG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgLy8gQWRkIGluaXRpYWwgaW5zdHJ1Y3Rpb25zIGZvciBpbnB1dCB1c2FnZVxuICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIERFRkFVTFRfQVJJQV9MQUJFTF9URVhUKTtcbiAgaW5zdHJ1Y3Rpb25zLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYDxzcGFuIGNsYXNzPVwiJHtEUkFHX1RFWFRfQ0xBU1N9XCI+JHtkcmFnVGV4dH08L3NwYW4+IDxzcGFuIGNsYXNzPVwiJHtDSE9PU0VfQ0xBU1N9XCI+JHtjaG9vc2VUZXh0fTwvc3Bhbj5gO1xuXG4gIC8vIEFkZCB0aGUgaW5zdHJ1Y3Rpb25zIGVsZW1lbnQgdG8gdGhlIERPTVxuICBmaWxlSW5wdXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbnN0cnVjdGlvbnMsIGZpbGVJbnB1dEVsKTtcblxuICAvLyBJRTExIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGRyb3AgZmlsZXMgb24gZmlsZSBpbnB1dHMsIHNvIHdlJ3ZlIHJlbW92ZWQgdGV4dCB0aGF0IGluZGljYXRlcyB0aGF0XG4gIGlmIChcbiAgICAvcnY6MTEuMC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHxcbiAgICAvRWRnZVxcL1xcZC4vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICkge1xuICAgIGZpbGVJbnB1dFBhcmVudC5xdWVyeVNlbGVjdG9yKGAuJHtEUkFHX1RFWFRfQ0xBU1N9YCkub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBpbnN0cnVjdGlvbnM7XG59O1xuXG4vKipcbiAqIEJ1aWxkIGEgc2NyZWVuIHJlYWRlci1vbmx5IG1lc3NhZ2UgZWxlbWVudCB0aGF0IGNvbnRhaW5zIGZpbGUgc3RhdHVzIHVwZGF0ZXMgYW5kXG4gKiBDcmVhdGUgYW5kIHNldCB0aGUgZGVmYXVsdCBmaWxlIHN0YXR1cyBtZXNzYWdlXG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICovXG5jb25zdCBjcmVhdGVTUk9ubHlTdGF0dXMgPSAoZmlsZUlucHV0RWwpID0+IHtcbiAgY29uc3Qgc3RhdHVzRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBpdGVtc0xhYmVsID0gZ2V0SXRlbXNMYWJlbChmaWxlSW5wdXRFbCk7XG4gIGNvbnN0IGZpbGVJbnB1dFBhcmVudCA9IGZpbGVJbnB1dEVsLmNsb3Nlc3QoRFJPUFpPTkUpO1xuICBjb25zdCBmaWxlSW5wdXRUYXJnZXQgPSBmaWxlSW5wdXRFbC5jbG9zZXN0KGAuJHtUQVJHRVRfQ0xBU1N9YCk7XG5cbiAgREVGQVVMVF9GSUxFX1NUQVRVU19URVhUID0gYE5vICR7aXRlbXNMYWJlbH0gc2VsZWN0ZWQuYDtcblxuICAvLyBBZGRzIGNsYXNzIG5hbWVzIGFuZCBvdGhlciBhdHRyaWJ1dGVzXG4gIHN0YXR1c0VsLmNsYXNzTGlzdC5hZGQoU1JfT05MWV9DTEFTUyk7XG4gIHN0YXR1c0VsLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcblxuICAvLyBBZGQgaW5pdGlhbCBmaWxlIHN0YXR1cyBtZXNzYWdlXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gREVGQVVMVF9GSUxFX1NUQVRVU19URVhUO1xuXG4gIC8vIEFkZCB0aGUgc3RhdHVzIGVsZW1lbnQgdG8gdGhlIERPTVxuICBmaWxlSW5wdXRQYXJlbnQuaW5zZXJ0QmVmb3JlKHN0YXR1c0VsLCBmaWxlSW5wdXRUYXJnZXQpO1xufTtcblxuLyoqXG4gKiBTY2FmZm9sZCB0aGUgY29tcG9uZW50IHdpdGggYWxsIHJlcXVpcmVkIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBvcmlnaW5hbCBpbnB1dCBlbGVtZW50LlxuICovXG5jb25zdCBlbmhhbmNlRmlsZUlucHV0ID0gKGZpbGVJbnB1dEVsKSA9PiB7XG4gIGNvbnN0IGlzSW5wdXREaXNhYmxlZCA9XG4gICAgZmlsZUlucHV0RWwuaGFzQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKSB8fFxuICAgIGZpbGVJbnB1dEVsLmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICBjb25zdCBkcm9wVGFyZ2V0ID0gY3JlYXRlVGFyZ2V0QXJlYShmaWxlSW5wdXRFbCk7XG4gIGNvbnN0IGluc3RydWN0aW9ucyA9IGNyZWF0ZVZpc2libGVJbnN0cnVjdGlvbnMoZmlsZUlucHV0RWwpO1xuICBjb25zdCB7IGRyb3Bab25lRWwgfSA9IGdldEZpbGVJbnB1dENvbnRleHQoZmlsZUlucHV0RWwpO1xuXG4gIGlmIChpc0lucHV0RGlzYWJsZWQpIHtcbiAgICBkcm9wWm9uZUVsLmNsYXNzTGlzdC5hZGQoRElTQUJMRURfQ0xBU1MpO1xuICB9IGVsc2Uge1xuICAgIGNyZWF0ZVNST25seVN0YXR1cyhmaWxlSW5wdXRFbCk7XG4gIH1cblxuICByZXR1cm4geyBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQgfTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBpbWFnZSBwcmV2aWV3c1xuICogV2Ugd2FudCB0byBzdGFydCB3aXRoIGEgY2xlYW4gbGlzdCBldmVyeSB0aW1lIGZpbGVzIGFyZSBhZGRlZCB0byB0aGUgZmlsZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGRyb3BUYXJnZXQgLSBUaGUgZHJhZyBhbmQgZHJvcCB0YXJnZXQgYXJlYS5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGluc3RydWN0aW9ucyAtIFRoZSBjb250YWluZXIgZm9yIHZpc2libGUgaW50ZXJhY3Rpb24gaW5zdHJ1Y3Rpb25zLlxuICovXG5jb25zdCByZW1vdmVPbGRQcmV2aWV3cyA9IChkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMpID0+IHtcbiAgY29uc3QgZmlsZVByZXZpZXdzID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtQUkVWSUVXX0NMQVNTfWApO1xuICBjb25zdCBjdXJyZW50UHJldmlld0hlYWRpbmcgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYC4ke1BSRVZJRVdfSEVBRElOR19DTEFTU31gLFxuICApO1xuICBjb25zdCBjdXJyZW50RXJyb3JNZXNzYWdlID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKFxuICAgIGAuJHtBQ0NFUFRFRF9GSUxFX01FU1NBR0VfQ0xBU1N9YCxcbiAgKTtcblxuICAvKipcbiAgICogZmluZHMgdGhlIHBhcmVudCBvZiB0aGUgcGFzc2VkIG5vZGUgYW5kIHJlbW92ZXMgdGhlIGNoaWxkXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAgICovXG4gIGNvbnN0IHJlbW92ZUltYWdlcyA9IChub2RlKSA9PiB7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICB9O1xuXG4gIC8vIFJlbW92ZSB0aGUgaGVhZGluZyBhYm92ZSB0aGUgcHJldmlld3NcbiAgaWYgKGN1cnJlbnRQcmV2aWV3SGVhZGluZykge1xuICAgIGN1cnJlbnRQcmV2aWV3SGVhZGluZy5vdXRlckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGV4aXN0aW5nIGVycm9yIG1lc3NhZ2VzXG4gIGlmIChjdXJyZW50RXJyb3JNZXNzYWdlKSB7XG4gICAgY3VycmVudEVycm9yTWVzc2FnZS5vdXRlckhUTUwgPSBcIlwiO1xuICAgIGRyb3BUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShJTlZBTElEX0ZJTEVfQ0xBU1MpO1xuICB9XG5cbiAgLy8gR2V0IHJpZCBvZiBleGlzdGluZyBwcmV2aWV3cyBpZiB0aGV5IGV4aXN0LCBzaG93IGluc3RydWN0aW9uc1xuICBpZiAoZmlsZVByZXZpZXdzICE9PSBudWxsKSB7XG4gICAgaWYgKGluc3RydWN0aW9ucykge1xuICAgICAgaW5zdHJ1Y3Rpb25zLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcbiAgICB9XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChmaWxlUHJldmlld3MsIHJlbW92ZUltYWdlcyk7XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzY3JlZW4gcmVhZGVyLW9ubHkgc3RhdHVzIG1lc3NhZ2UgYWZ0ZXIgaW50ZXJhY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbGVtZW50IC0gVGhlIHNjcmVlbiByZWFkZXItb25seSBjb250YWluZXIgZm9yIGZpbGUgc3RhdHVzIHVwZGF0ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsZU5hbWVzIC0gVGhlIHNlbGVjdGVkIGZpbGVzIGZvdW5kIGluIHRoZSBmaWxlTGlzdCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBmaWxlU3RvcmUgLSBUaGUgYXJyYXkgb2YgdXBsb2FkZWQgZmlsZSBuYW1lcyBjcmVhdGVkIGZyb20gdGhlIGZpbGVOYW1lcyBvYmplY3QuXG4gKi9cbmNvbnN0IHVwZGF0ZVN0YXR1c01lc3NhZ2UgPSAoc3RhdHVzRWxlbWVudCwgZmlsZU5hbWVzLCBmaWxlU3RvcmUpID0+IHtcbiAgY29uc3Qgc3RhdHVzRWwgPSBzdGF0dXNFbGVtZW50O1xuICBsZXQgc3RhdHVzTWVzc2FnZSA9IERFRkFVTFRfRklMRV9TVEFUVVNfVEVYVDtcblxuICAvLyBJZiBmaWxlcyBhZGRlZCwgdXBkYXRlIHRoZSBzdGF0dXMgbWVzc2FnZSB3aXRoIGZpbGUgbmFtZShzKVxuICBpZiAoZmlsZU5hbWVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHN0YXR1c01lc3NhZ2UgPSBgWW91IGhhdmUgc2VsZWN0ZWQgdGhlIGZpbGU6ICR7ZmlsZVN0b3JlfWA7XG4gIH0gZWxzZSBpZiAoZmlsZU5hbWVzLmxlbmd0aCA+IDEpIHtcbiAgICBzdGF0dXNNZXNzYWdlID0gYFlvdSBoYXZlIHNlbGVjdGVkICR7XG4gICAgICBmaWxlTmFtZXMubGVuZ3RoXG4gICAgfSBmaWxlczogJHtmaWxlU3RvcmUuam9pbihcIiwgXCIpfWA7XG4gIH1cblxuICAvLyBBZGQgZGVsYXkgdG8gZW5jb3VyYWdlIHNjcmVlbiByZWFkZXIgcmVhZG91dFxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IHN0YXR1c01lc3NhZ2U7XG4gIH0sIDEwMDApO1xufTtcblxuLyoqXG4gKiBTaG93IHRoZSBwcmV2aWV3IGhlYWRpbmcsIGhpZGUgdGhlIGluaXRpYWwgaW5zdHJ1Y3Rpb25zIGFuZFxuICogVXBkYXRlIHRoZSBhcmlhLWxhYmVsIHdpdGggbmV3IGluc3RydWN0aW9ucyB0ZXh0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGZpbGVOYW1lcyAtIFRoZSBzZWxlY3RlZCBmaWxlcyBmb3VuZCBpbiB0aGUgZmlsZUxpc3Qgb2JqZWN0LlxuICovXG5jb25zdCBhZGRQcmV2aWV3SGVhZGluZyA9IChmaWxlSW5wdXRFbCwgZmlsZU5hbWVzKSA9PiB7XG4gIGNvbnN0IGZpbGVQcmV2aWV3c0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkcm9wVGFyZ2V0ID0gZmlsZUlucHV0RWwuY2xvc2VzdChgLiR7VEFSR0VUX0NMQVNTfWApO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBkcm9wVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoYC4ke0lOU1RSVUNUSU9OU19DTEFTU31gKTtcbiAgbGV0IGNoYW5nZUl0ZW1UZXh0ID0gXCJDaGFuZ2UgZmlsZVwiO1xuICBsZXQgcHJldmlld0hlYWRpbmdUZXh0ID0gXCJcIjtcblxuICBpZiAoZmlsZU5hbWVzLmxlbmd0aCA9PT0gMSkge1xuICAgIHByZXZpZXdIZWFkaW5nVGV4dCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFNlbGVjdGVkIGZpbGUgPHNwYW4gY2xhc3M9XCJ1c2EtZmlsZS1pbnB1dF9fY2hvb3NlXCI+JHtjaGFuZ2VJdGVtVGV4dH08L3NwYW4+YDtcbiAgfSBlbHNlIGlmIChmaWxlTmFtZXMubGVuZ3RoID4gMSkge1xuICAgIGNoYW5nZUl0ZW1UZXh0ID0gXCJDaGFuZ2UgZmlsZXNcIjtcbiAgICBwcmV2aWV3SGVhZGluZ1RleHQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke2ZpbGVOYW1lcy5sZW5ndGh9IGZpbGVzIHNlbGVjdGVkIDxzcGFuIGNsYXNzPVwidXNhLWZpbGUtaW5wdXRfX2Nob29zZVwiPiR7Y2hhbmdlSXRlbVRleHR9PC9zcGFuPmA7XG4gIH1cblxuICAvLyBIaWRlcyBudWxsIHN0YXRlIGNvbnRlbnQgYW5kIHNldHMgcHJldmlldyBoZWFkaW5nXG4gIGluc3RydWN0aW9ucy5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBmaWxlUHJldmlld3NIZWFkaW5nLmNsYXNzTGlzdC5hZGQoUFJFVklFV19IRUFESU5HX0NMQVNTKTtcbiAgZmlsZVByZXZpZXdzSGVhZGluZy5pbm5lckhUTUwgPSBwcmV2aWV3SGVhZGluZ1RleHQ7XG4gIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGZpbGVQcmV2aWV3c0hlYWRpbmcsIGluc3RydWN0aW9ucyk7XG5cbiAgLy8gVXBkYXRlIGFyaWEgbGFiZWwgdG8gbWF0Y2ggdGhlIHZpc2libGUgYWN0aW9uIHRleHRcbiAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBjaGFuZ2VJdGVtVGV4dCk7XG59O1xuXG4vKiogQWRkIGFuIGVycm9yIGxpc3RlbmVyIHRvIHRoZSBpbWFnZSBwcmV2aWV3IHRvIHNldCBhIGZhbGxiYWNrIGltYWdlXG4gKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR9IHByZXZpZXdJbWFnZSAtIFRoZSBpbWFnZSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gZmFsbGJhY2tDbGFzcyAtIFRoZSBDU1MgY2xhc3Mgb2YgdGhlIGZhbGxiYWNrIGltYWdlXG4gKi9cbmNvbnN0IHNldFByZXZpZXdGYWxsYmFjayA9IChwcmV2aWV3SW1hZ2UsIGZhbGxiYWNrQ2xhc3MpID0+IHtcbiAgcHJldmlld0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJlcnJvclwiLFxuICAgICgpID0+IHtcbiAgICAgIGNvbnN0IGxvY2FsUHJldmlld0ltYWdlID0gcHJldmlld0ltYWdlOyAvLyB0byBhdm9pZCBuby1wYXJhbS1yZWFzc2lnbiBmcm9tIEVTTGludFxuICAgICAgbG9jYWxQcmV2aWV3SW1hZ2Uuc3JjID0gU1BBQ0VSX0dJRjtcbiAgICAgIGxvY2FsUHJldmlld0ltYWdlLmNsYXNzTGlzdC5hZGQoZmFsbGJhY2tDbGFzcyk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfSxcbiAgKTtcbn07XG5cbi8qKlxuICogV2hlbiBuZXcgZmlsZXMgYXJlIGFwcGxpZWQgdG8gZmlsZSBpbnB1dCwgdGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgcHJldmlld3NcbiAqIGFuZCByZW1vdmVzIG9sZCBvbmVzLlxuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgaW5wdXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGluc3RydWN0aW9ucyAtIFRoZSBjb250YWluZXIgZm9yIHZpc2libGUgaW50ZXJhY3Rpb24gaW5zdHJ1Y3Rpb25zLlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZHJvcFRhcmdldCAtIFRoZSBkcmFnIGFuZCBkcm9wIHRhcmdldCBhcmVhLlxuICovXG5cbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGZpbGVOYW1lcyA9IGUudGFyZ2V0LmZpbGVzO1xuICBjb25zdCBpbnB1dFBhcmVudCA9IGRyb3BUYXJnZXQuY2xvc2VzdChgLiR7RFJPUFpPTkVfQ0xBU1N9YCk7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBpbnB1dFBhcmVudC5xdWVyeVNlbGVjdG9yKGAuJHtTUl9PTkxZX0NMQVNTfWApO1xuICBjb25zdCBmaWxlU3RvcmUgPSBbXTtcblxuICAvLyBGaXJzdCwgZ2V0IHJpZCBvZiBleGlzdGluZyBwcmV2aWV3c1xuICByZW1vdmVPbGRQcmV2aWV3cyhkcm9wVGFyZ2V0LCBpbnN0cnVjdGlvbnMpO1xuXG4gIC8vIFRoZW4sIGl0ZXJhdGUgdGhyb3VnaCBmaWxlcyBsaXN0IGFuZCBjcmVhdGUgcHJldmlld3NcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlTmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZU5hbWVzW2ldLm5hbWU7XG4gICAgbGV0IGltYWdlSWQ7XG5cbiAgICAvLyBQdXNoIHVwZGF0ZWQgZmlsZSBuYW1lcyBpbnRvIHRoZSBzdG9yZSBhcnJheVxuICAgIGZpbGVTdG9yZS5wdXNoKGZpbGVOYW1lKTtcblxuICAgIC8vIFN0YXJ0cyB3aXRoIGEgbG9hZGluZyBpbWFnZSB3aGlsZSBwcmV2aWV3IGlzIGNyZWF0ZWRcbiAgICByZWFkZXIub25sb2Fkc3RhcnQgPSBmdW5jdGlvbiBjcmVhdGVMb2FkaW5nSW1hZ2UoKSB7XG4gICAgICBpbWFnZUlkID0gY3JlYXRlVW5pcXVlSUQobWFrZVNhZmVGb3JJRChmaWxlTmFtZSkpO1xuXG4gICAgICBpbnN0cnVjdGlvbnMuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgIFNhbml0aXplci5lc2NhcGVIVE1MYDxkaXYgY2xhc3M9XCIke1BSRVZJRVdfQ0xBU1N9XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGltZyBpZD1cIiR7aW1hZ2VJZH1cIiBzcmM9XCIke1NQQUNFUl9HSUZ9XCIgYWx0PVwiXCIgY2xhc3M9XCIke0dFTkVSSUNfUFJFVklFV19DTEFTU19OQU1FfSAke0xPQURJTkdfQ0xBU1N9XCIvPiR7ZmlsZU5hbWV9XG4gICAgICAgIDxkaXY+YCxcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8vIE5vdCBhbGwgZmlsZXMgd2lsbCBiZSBhYmxlIHRvIGdlbmVyYXRlIHByZXZpZXdzLiBJbiBjYXNlIHRoaXMgaGFwcGVucywgd2UgcHJvdmlkZSBzZXZlcmFsIHR5cGVzIFwiZ2VuZXJpYyBwcmV2aWV3c1wiIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbi5cbiAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gY3JlYXRlRmlsZVByZXZpZXcoKSB7XG4gICAgICBjb25zdCBwcmV2aWV3SW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbWFnZUlkKTtcbiAgICAgIGNvbnN0IGZpbGVFeHRlbnNpb24gPSBmaWxlTmFtZS5zcGxpdChcIi5cIikucG9wKCk7XG4gICAgICBpZiAoZmlsZUV4dGVuc2lvbiA9PT0gXCJwZGZcIikge1xuICAgICAgICBzZXRQcmV2aWV3RmFsbGJhY2socHJldmlld0ltYWdlLCBQREZfUFJFVklFV19DTEFTUyk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcImRvY1wiIHx8XG4gICAgICAgIGZpbGVFeHRlbnNpb24gPT09IFwiZG9jeFwiIHx8XG4gICAgICAgIGZpbGVFeHRlbnNpb24gPT09IFwicGFnZXNcIlxuICAgICAgKSB7XG4gICAgICAgIHNldFByZXZpZXdGYWxsYmFjayhwcmV2aWV3SW1hZ2UsIFdPUkRfUFJFVklFV19DTEFTUyk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcInhsc1wiIHx8XG4gICAgICAgIGZpbGVFeHRlbnNpb24gPT09IFwieGxzeFwiIHx8XG4gICAgICAgIGZpbGVFeHRlbnNpb24gPT09IFwibnVtYmVyc1wiXG4gICAgICApIHtcbiAgICAgICAgc2V0UHJldmlld0ZhbGxiYWNrKHByZXZpZXdJbWFnZSwgRVhDRUxfUFJFVklFV19DTEFTUyk7XG4gICAgICB9IGVsc2UgaWYgKGZpbGVFeHRlbnNpb24gPT09IFwibW92XCIgfHwgZmlsZUV4dGVuc2lvbiA9PT0gXCJtcDRcIikge1xuICAgICAgICBzZXRQcmV2aWV3RmFsbGJhY2socHJldmlld0ltYWdlLCBWSURFT19QUkVWSUVXX0NMQVNTKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFByZXZpZXdGYWxsYmFjayhwcmV2aWV3SW1hZ2UsIEdFTkVSSUNfUFJFVklFV19DTEFTUyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZXMgbG9hZGVyIGFuZCBkaXNwbGF5cyBwcmV2aWV3XG4gICAgICBwcmV2aWV3SW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShMT0FESU5HX0NMQVNTKTtcbiAgICAgIHByZXZpZXdJbWFnZS5zcmMgPSByZWFkZXIucmVzdWx0O1xuICAgIH07XG5cbiAgICBpZiAoZmlsZU5hbWVzW2ldKSB7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlTmFtZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmaWxlTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gUmVzZXQgaW5wdXQgYXJpYS1sYWJlbCB3aXRoIGRlZmF1bHQgbWVzc2FnZVxuICAgIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgREVGQVVMVF9BUklBX0xBQkVMX1RFWFQpO1xuICB9IGVsc2Uge1xuICAgIGFkZFByZXZpZXdIZWFkaW5nKGZpbGVJbnB1dEVsLCBmaWxlTmFtZXMpO1xuICB9XG5cbiAgdXBkYXRlU3RhdHVzTWVzc2FnZShzdGF0dXNFbGVtZW50LCBmaWxlTmFtZXMsIGZpbGVTdG9yZSk7XG59O1xuXG4vKipcbiAqIFdoZW4gdXNpbmcgYW4gQWNjZXB0IGF0dHJpYnV0ZSwgaW52YWxpZCBmaWxlcyB3aWxsIGJlIGhpZGRlbiBmcm9tXG4gKiBmaWxlIGJyb3dzZXIsIGJ1dCB0aGV5IGNhbiBzdGlsbCBiZSBkcmFnZ2VkIHRvIHRoZSBpbnB1dC4gVGhpc1xuICogZnVuY3Rpb24gcHJldmVudHMgdGhlbSBmcm9tIGJlaW5nIGRyYWdnZWQgYW5kIHJlbW92ZXMgZXJyb3Igc3RhdGVzXG4gKiB3aGVuIGNvcnJlY3QgZmlsZXMgYXJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGVcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgaW5wdXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGluc3RydWN0aW9ucyAtIFRoZSBjb250YWluZXIgZm9yIHZpc2libGUgaW50ZXJhY3Rpb24gaW5zdHJ1Y3Rpb25zLlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gZHJvcFRhcmdldCAtIFRoZSBkcmFnIGFuZCBkcm9wIHRhcmdldCBhcmVhLlxuICovXG5jb25zdCBwcmV2ZW50SW52YWxpZEZpbGVzID0gKGUsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpID0+IHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlc0F0dHIgPSBmaWxlSW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJhY2NlcHRcIik7XG4gIGRyb3BUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShJTlZBTElEX0ZJTEVfQ0xBU1MpO1xuXG4gIC8qKlxuICAgKiBXZSBjYW4gcHJvYmFibHkgbW92ZSBhd2F5IGZyb20gdGhpcyBvbmNlIElFMTEgc3VwcG9ydCBzdG9wcywgYW5kIHJlcGxhY2VcbiAgICogd2l0aCBhIHNpbXBsZSBlcyBgLmluY2x1ZGVzYFxuICAgKiBjaGVjayBpZiBlbGVtZW50IGlzIGluIGFycmF5XG4gICAqIGNoZWNrIGlmIDEgb3IgbW9yZSBhbHBoYWJldHMgYXJlIGluIHN0cmluZ1xuICAgKiBpZiBlbGVtZW50IGlzIHByZXNlbnQgcmV0dXJuIHRoZSBwb3NpdGlvbiB2YWx1ZSBhbmQgLTEgb3RoZXJ3aXNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmaWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnN0IGlzSW5jbHVkZWQgPSAoZmlsZSwgdmFsdWUpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICBjb25zdCBwb3MgPSBmaWxlLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgcmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgLy8gUnVucyBpZiBvbmx5IHNwZWNpZmljIGZpbGVzIGFyZSBhY2NlcHRlZFxuICBpZiAoYWNjZXB0ZWRGaWxlc0F0dHIpIHtcbiAgICBjb25zdCBhY2NlcHRlZEZpbGVzID0gYWNjZXB0ZWRGaWxlc0F0dHIuc3BsaXQoXCIsXCIpO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAvLyBJZiBtdWx0aXBsZSBmaWxlcyBhcmUgZHJhZ2dlZCwgdGhpcyBpdGVyYXRlcyB0aHJvdWdoIHRoZW0gYW5kIGxvb2sgZm9yIGFueSBmaWxlcyB0aGF0IGFyZSBub3QgYWNjZXB0ZWQuXG4gICAgbGV0IGFsbEZpbGVzQWxsb3dlZCA9IHRydWU7XG4gICAgY29uc3Qgc2Nhbm5lZEZpbGVzID0gZS50YXJnZXQuZmlsZXMgfHwgZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FubmVkRmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBzY2FubmVkRmlsZXNbaV07XG4gICAgICBpZiAoYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWNjZXB0ZWRGaWxlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGZpbGVUeXBlID0gYWNjZXB0ZWRGaWxlc1tqXTtcbiAgICAgICAgICBhbGxGaWxlc0FsbG93ZWQgPVxuICAgICAgICAgICAgZmlsZS5uYW1lLmluZGV4T2YoZmlsZVR5cGUpID4gMCB8fFxuICAgICAgICAgICAgaXNJbmNsdWRlZChmaWxlLnR5cGUsIGZpbGVUeXBlLnJlcGxhY2UoL1xcKi9nLCBcIlwiKSk7XG4gICAgICAgICAgaWYgKGFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgICAgICAgVFlQRV9JU19WQUxJRCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBicmVhaztcbiAgICB9XG5cbiAgICAvLyBJZiBkcmFnZ2VkIGZpbGVzIGFyZSBub3QgYWNjZXB0ZWQsIHRoaXMgcmVtb3ZlcyB0aGVtIGZyb20gdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBhbmQgY3JlYXRlcyBhbmQgZXJyb3Igc3RhdGVcbiAgICBpZiAoIWFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgcmVtb3ZlT2xkUHJldmlld3MoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVJbnB1dEVsLnZhbHVlID0gXCJcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgZHJvcFRhcmdldC5pbnNlcnRCZWZvcmUoZXJyb3JNZXNzYWdlLCBmaWxlSW5wdXRFbCk7XG4gICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPVxuICAgICAgICBmaWxlSW5wdXRFbC5kYXRhc2V0LmVycm9ybWVzc2FnZSB8fCBgVGhpcyBpcyBub3QgYSB2YWxpZCBmaWxlIHR5cGUuYDtcbiAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKEFDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTUyk7XG4gICAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5hZGQoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgICAgIFRZUEVfSVNfVkFMSUQgPSBmYWxzZTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIDEuIHBhc3NlcyB0aHJvdWdoIGdhdGUgZm9yIHByZXZlbnRpbmcgaW52YWxpZCBmaWxlc1xuICogMi4gaGFuZGxlcyB1cGRhdGVzIGlmIGZpbGUgaXMgdmFsaWRcbiAqXG4gKiBAcGFyYW0ge2V2ZW50fSBldmVudFxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gaW5zdHJ1Y3Rpb25zIC0gVGhlIGNvbnRhaW5lciBmb3IgdmlzaWJsZSBpbnRlcmFjdGlvbiBpbnN0cnVjdGlvbnMuXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBkcm9wVGFyZ2V0IC0gVGhlIGRyYWcgYW5kIGRyb3AgdGFyZ2V0IGFyZWEuXG4gKi9cbmNvbnN0IGhhbmRsZVVwbG9hZCA9IChldmVudCwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBwcmV2ZW50SW52YWxpZEZpbGVzKGV2ZW50LCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KTtcbiAgaWYgKFRZUEVfSVNfVkFMSUQgPT09IHRydWUpIHtcbiAgICBoYW5kbGVDaGFuZ2UoZXZlbnQsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpO1xuICB9XG59O1xuXG5jb25zdCBmaWxlSW5wdXQgPSBiZWhhdmlvcihcbiAge30sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhEUk9QWk9ORSwgcm9vdCkuZm9yRWFjaCgoZmlsZUlucHV0RWwpID0+IHtcbiAgICAgICAgY29uc3QgeyBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQgfSA9IGVuaGFuY2VGaWxlSW5wdXQoZmlsZUlucHV0RWwpO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyYWdvdmVyXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoRFJBR19DTEFTUyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcmFnbGVhdmVcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoRFJBR19DTEFTUyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgKTtcblxuICAgICAgICBkcm9wVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJkcm9wXCIsXG4gICAgICAgICAgZnVuY3Rpb24gaGFuZGxlRHJvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICApO1xuXG4gICAgICAgIGZpbGVJbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJjaGFuZ2VcIixcbiAgICAgICAgICAoZSkgPT4gaGFuZGxlVXBsb2FkKGUsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0ZWFyZG93bihyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoSU5QVVQsIHJvb3QpLmZvckVhY2goKGZpbGVJbnB1dEVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVJbnB1dFRvcEVsZW1lbnQgPSBmaWxlSW5wdXRFbC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGZpbGVJbnB1dFRvcEVsZW1lbnQucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoXG4gICAgICAgICAgZmlsZUlucHV0RWwsXG4gICAgICAgICAgZmlsZUlucHV0VG9wRWxlbWVudCxcbiAgICAgICAgKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbGVJbnB1dEVsLmNsYXNzTmFtZSA9IERST1BaT05FX0NMQVNTO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRGaWxlSW5wdXRDb250ZXh0LFxuICAgIGRpc2FibGUsXG4gICAgYXJpYURpc2FibGUsXG4gICAgZW5hYmxlLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxlSW5wdXQ7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBTQ09QRSA9IGAuJHtQUkVGSVh9LWZvb3Rlci0tYmlnYDtcbmNvbnN0IE5BViA9IGAke1NDT1BFfSBuYXZgO1xuY29uc3QgQlVUVE9OID0gYCR7TkFWfSAuJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1saW5rYDtcbmNvbnN0IEhJREVfTUFYX1dJRFRIID0gNDgwO1xuXG4vKipcbiAqIEV4cGFuZHMgc2VsZWN0ZWQgZm9vdGVyIG1lbnUgcGFuZWwsIHdoaWxlIGNvbGxhcHNpbmcgb3RoZXJzXG4gKi9cbmZ1bmN0aW9uIHNob3dQYW5lbCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEgpIHtcbiAgICBjb25zdCBpc09wZW4gPSB0aGlzLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIikgPT09IFwidHJ1ZVwiO1xuICAgIGNvbnN0IHRoaXNGb290ZXIgPSB0aGlzLmNsb3Nlc3QoU0NPUEUpO1xuXG4gICAgLy8gQ2xvc2UgYWxsIG90aGVyIG1lbnVzXG4gICAgdGhpc0Zvb3Rlci5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgIWlzT3Blbik7XG4gIH1cbn1cblxuLyoqXG4gKiBTd2FwcyB0aGUgPGg0PiBlbGVtZW50IGZvciBhIDxidXR0b24+IGVsZW1lbnQgKGFuZCB2aWNlLXZlcnNhKSBhbmQgc2V0cyBpZFxuICogb2YgbWVudSBsaXN0XG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpc01vYmlsZSAtIElmIHRoZSBmb290ZXIgaXMgaW4gbW9iaWxlIGNvbmZpZ3VyYXRpb25cbiAqL1xuZnVuY3Rpb24gdG9nZ2xlSHRtbFRhZyhpc01vYmlsZSkge1xuICBjb25zdCBiaWdGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFNDT1BFKTtcblxuICBpZiAoIWJpZ0Zvb3Rlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHByaW1hcnlMaW5rcyA9IGJpZ0Zvb3Rlci5xdWVyeVNlbGVjdG9yQWxsKEJVVFRPTik7XG5cbiAgcHJpbWFyeUxpbmtzLmZvckVhY2goKGN1cnJlbnRFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgY3VycmVudEVsZW1lbnRDbGFzc2VzID0gY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgY29uc3QgcHJlc2VydmVkSHRtbFRhZyA9XG4gICAgICBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhZ1wiKSB8fCBjdXJyZW50RWxlbWVudC50YWdOYW1lO1xuXG4gICAgY29uc3QgbmV3RWxlbWVudFR5cGUgPSBpc01vYmlsZSA/IFwiYnV0dG9uXCIgOiBwcmVzZXJ2ZWRIdG1sVGFnO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBuZXcgZWxlbWVudFxuICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnRUeXBlKTtcbiAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGN1cnJlbnRFbGVtZW50Q2xhc3Nlcyk7XG4gICAgbmV3RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgYCR7UFJFRklYfS1mb290ZXJfX3ByaW1hcnktbGluay0tYnV0dG9uYCxcbiAgICAgIGlzTW9iaWxlLFxuICAgICk7XG4gICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuXG4gICAgaWYgKGlzTW9iaWxlKSB7XG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFnXCIsIGN1cnJlbnRFbGVtZW50LnRhZ05hbWUpO1xuICAgICAgY29uc3QgbWVudUlkID0gYCR7UFJFRklYfS1mb290ZXItbWVudS1saXN0LSR7TWF0aC5mbG9vcihcbiAgICAgICAgTWF0aC5yYW5kb20oKSAqIDEwMDAwMCxcbiAgICAgICl9YDtcblxuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1lbnVJZCk7XG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgIGN1cnJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBtZW51SWQpO1xuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIH1cblxuICAgIC8vIEluc2VydCB0aGUgbmV3IGVsZW1lbnQgYW5kIGRlbGV0ZSB0aGUgb2xkXG4gICAgY3VycmVudEVsZW1lbnQuYWZ0ZXIobmV3RWxlbWVudCk7XG4gICAgY3VycmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5jb25zdCByZXNpemUgPSAoZXZlbnQpID0+IHtcbiAgdG9nZ2xlSHRtbFRhZyhldmVudC5tYXRjaGVzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1BhbmVsLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICAvLyBleHBvcnQgZm9yIHVzZSBlbHNld2hlcmVcbiAgICBISURFX01BWF9XSURUSCxcblxuICAgIGluaXQoKSB7XG4gICAgICB0b2dnbGVIdG1sVGFnKHdpbmRvdy5pbm5lcldpZHRoIDwgSElERV9NQVhfV0lEVEgpO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdCA9IHdpbmRvdy5tYXRjaE1lZGlhKFxuICAgICAgICBgKG1heC13aWR0aDogJHtISURFX01BWF9XSURUSCAtIDAuMX1weClgLFxuICAgICAgKTtcbiAgICAgIHRoaXMubWVkaWFRdWVyeUxpc3QuYWRkTGlzdGVuZXIocmVzaXplKTtcbiAgICB9LFxuXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0LnJlbW92ZUxpc3RlbmVyKHJlc2l6ZSk7XG4gICAgfSxcbiAgfSxcbik7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IEZvY3VzVHJhcCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9mb2N1cy10cmFwXCIpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZShcIi4uLy4uL3VzYS1hY2NvcmRpb24vc3JjL2luZGV4XCIpO1xuY29uc3QgU2Nyb2xsQmFyV2lkdGggPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoXCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQk9EWSA9IFwiYm9keVwiO1xuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH0taGVhZGVyYDtcbmNvbnN0IE5BViA9IGAuJHtQUkVGSVh9LW5hdmA7XG5jb25zdCBOQVZfQ09OVEFJTkVSID0gYC4ke1BSRUZJWH0tbmF2LWNvbnRhaW5lcmA7XG5jb25zdCBOQVZfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LW5hdl9fcHJpbWFyeWA7XG5jb25zdCBOQVZfUFJJTUFSWV9JVEVNID0gYC4ke1BSRUZJWH0tbmF2X19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTkFWX0NPTlRST0wgPSBgYnV0dG9uLiR7UFJFRklYfS1uYXZfX2xpbmtgO1xuY29uc3QgTkFWX0xJTktTID0gYCR7TkFWfSBhYDtcbmNvbnN0IE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSA9IGBkYXRhLW5hdi1oaWRkZW5gO1xuY29uc3QgT1BFTkVSUyA9IGAuJHtQUkVGSVh9LW1lbnUtYnRuYDtcbmNvbnN0IENMT1NFX0JVVFRPTiA9IGAuJHtQUkVGSVh9LW5hdl9fY2xvc2VgO1xuY29uc3QgT1ZFUkxBWSA9IGAuJHtQUkVGSVh9LW92ZXJsYXlgO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBUT0dHTEVTID0gW05BViwgT1ZFUkxBWV0uam9pbihcIiwgXCIpO1xuY29uc3QgTk9OX05BVl9FTEVNRU5UUyA9IGBib2R5ICo6bm90KCR7SEVBREVSfSwgJHtOQVZfQ09OVEFJTkVSfSwgJHtOQVZ9LCAke05BVn0gKik6bm90KFthcmlhLWhpZGRlbl0pYDtcbmNvbnN0IE5PTl9OQVZfSElEREVOID0gYFske05PTl9OQVZfSElEREVOX0FUVFJJQlVURX1dYDtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gXCJ1c2EtanMtbW9iaWxlLW5hdi0tYWN0aXZlXCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5cbmxldCBuYXZpZ2F0aW9uO1xubGV0IG5hdkFjdGl2ZTtcbmxldCBub25OYXZFbGVtZW50cztcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuLy8gRGV0ZWN0IFNhZmFyaVxuLy8gTm90ZTogQ2hyb21lIGFsc28gcmVwb3J0cyB0aGUgU2FmYXJpIHVzZXJBZ2VudCBzbyB0aGlzIHNwZWNpZmljYWxseSBleGNsdWRlcyBDaHJvbWUuXG5jb25zdCBpc1NhZmFyaSA9XG4gIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJTYWZhcmlcIikgJiZcbiAgIW5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoXCJDaHJvbWVcIik7XG5jb25zdCBTQ1JPTExCQVJfV0lEVEggPSBTY3JvbGxCYXJXaWR0aCgpO1xuY29uc3QgSU5JVElBTF9QQURESU5HID0gd2luZG93XG4gIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gIC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbmNvbnN0IFRFTVBPUkFSWV9QQURESU5HID0gYCR7XG4gIHBhcnNlSW50KElOSVRJQUxfUEFERElORy5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMCkgK1xuICBwYXJzZUludChTQ1JPTExCQVJfV0lEVEgucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApXG59cHhgO1xuXG5jb25zdCBoaWRlTm9uTmF2SXRlbXMgPSAoKSA9PiB7XG4gIGNvbnN0IGhlYWRlclBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7SEVBREVSfWApLnBhcmVudE5vZGU7XG4gIG5vbk5hdkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTkFWX0VMRU1FTlRTKTtcblxuICBub25OYXZFbGVtZW50cy5mb3JFYWNoKChub25OYXZFbGVtZW50KSA9PiB7XG4gICAgaWYgKG5vbk5hdkVsZW1lbnQgIT09IGhlYWRlclBhcmVudCkge1xuICAgICAgbm9uTmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgICAgIG5vbk5hdkVsZW1lbnQuc2V0QXR0cmlidXRlKE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSwgXCJcIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHNob3dOb25OYXZJdGVtcyA9ICgpID0+IHtcbiAgbm9uTmF2RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9OQVZfSElEREVOKTtcblxuICBpZiAoIW5vbk5hdkVsZW1lbnRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGFyaWEtaGlkZGVuIGZyb20gbm9uLWhlYWRlciBlbGVtZW50c1xuICBub25OYXZFbGVtZW50cy5mb3JFYWNoKChub25OYXZFbGVtZW50KSA9PiB7XG4gICAgbm9uTmF2RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKTtcbiAgICBub25OYXZFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShOT05fTkFWX0hJRERFTl9BVFRSSUJVVEUpO1xuICB9KTtcbn07XG5cbi8vIFRvZ2dsZSBhbGwgbm9uLWhlYWRlciBlbGVtZW50cyAjMzUyNy5cbmNvbnN0IHRvZ2dsZU5vbk5hdkl0ZW1zID0gKGFjdGl2ZSkgPT4ge1xuICBpZiAoYWN0aXZlKSB7XG4gICAgaGlkZU5vbk5hdkl0ZW1zKCk7XG4gIH0gZWxzZSB7XG4gICAgc2hvd05vbk5hdkl0ZW1zKCk7XG4gIH1cbn07XG5cbi8qKlxuICogRGV0ZWN0IFNhZmFyaSBhbmQgYWRkIGJvZHkgY2xhc3MgZm9yIGEgU2FmYXJpLW9ubHkgQ1NTIGJ1ZyBmaXguXG4gKiBNb3JlIGRldGFpbHMgaW4gaHR0cHM6Ly9naXRodWIuY29tL3Vzd2RzL3Vzd2RzL3B1bGwvNTQ0M1xuICovXG5jb25zdCBhZGRTYWZhcmlDbGFzcyA9ICgpID0+IHtcbiAgaWYgKGlzU2FmYXJpKSB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiaXMtc2FmYXJpXCIpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldCB0aGUgdmFsdWUgZm9yIHRoZSAtLXNjcm9sbHRvcCBDU1MgdmFyIHdoZW4gdGhlIG1vYmlsZSBtZW51IGlzIG9wZW4uXG4gKiBUaGlzIGFsbG93cyB0aGUgQ1NTIHRvIGxvY2sgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGluIFNhZmFyaVxuICogd2hlbiBvdmVyZmxvdy15IGlzIHNldCB0byBzY3JvbGwuXG4gKiBNb3JlIGRldGFpbHMgaW4gaHR0cHM6Ly9naXRodWIuY29tL3Vzd2RzL3Vzd2RzL3B1bGwvNTQ0M1xuICovXG5jb25zdCBzZXRTYWZhcmlTY3JvbGxQb3NpdGlvbiA9IChib2R5KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IGAtJHt3aW5kb3cuc2Nyb2xsWX1weGA7XG4gIGlmIChpc1NhZmFyaSkge1xuICAgIGJvZHkuc3R5bGUuc2V0UHJvcGVydHkoXCItLXNjcm9sbHRvcFwiLCBjdXJyZW50U2Nyb2xsUG9zaXRpb24pO1xuICB9XG59O1xuXG5jb25zdCB0b2dnbGVOYXYgPSAoYWN0aXZlKSA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gZG9jdW1lbnQ7XG4gIGNvbnN0IHNhZmVBY3RpdmUgPSB0eXBlb2YgYWN0aXZlID09PSBcImJvb2xlYW5cIiA/IGFjdGl2ZSA6ICFpc0FjdGl2ZSgpO1xuXG4gIHNldFNhZmFyaVNjcm9sbFBvc2l0aW9uKGJvZHkpO1xuXG4gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShBQ1RJVkVfQ0xBU1MsIHNhZmVBY3RpdmUpO1xuXG4gIHNlbGVjdChUT0dHTEVTKS5mb3JFYWNoKChlbCkgPT5cbiAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKFZJU0lCTEVfQ0xBU1MsIHNhZmVBY3RpdmUpLFxuICApO1xuXG4gIG5hdmlnYXRpb24uZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcblxuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICBjb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcblxuICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPT09IFRFTVBPUkFSWV9QQURESU5HXG4gICAgICA/IElOSVRJQUxfUEFERElOR1xuICAgICAgOiBURU1QT1JBUllfUEFERElORztcblxuICB0b2dnbGVOb25OYXZJdGVtcyhzYWZlQWN0aXZlKTtcblxuICBpZiAoc2FmZUFjdGl2ZSAmJiBjbG9zZUJ1dHRvbikge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGFjdGl2YXRlZC4gRm9jdXMgb24gdGhlIGNsb3NlIGJ1dHRvbiwgd2hpY2ggaXNcbiAgICAvLyBqdXN0IGJlZm9yZSBhbGwgdGhlIG5hdiBlbGVtZW50cyBpbiB0aGUgdGFiIG9yZGVyLlxuICAgIGNsb3NlQnV0dG9uLmZvY3VzKCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgIXNhZmVBY3RpdmUgJiZcbiAgICBtZW51QnV0dG9uICYmXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShtZW51QnV0dG9uKS5kaXNwbGF5ICE9PSBcIm5vbmVcIlxuICApIHtcbiAgICAvLyBUaGUgbW9iaWxlIG5hdiB3YXMganVzdCBkZWFjdGl2YXRlZC4gV2UgZG9uJ3Qgd2FudCB0aGUgZm9jdXMgdG9cbiAgICAvLyBkaXNhcHBlYXIgaW50byB0aGUgdm9pZCwgc28gZm9jdXMgb24gdGhlIG1lbnUgYnV0dG9uIGlmIGl0J3NcbiAgICAvLyB2aXNpYmxlICh0aGlzIG1heSBoYXZlIGJlZW4gd2hhdCB0aGUgdXNlciB3YXMganVzdCBmb2N1c2VkIG9uLFxuICAgIC8vIGlmIHRoZXkgdHJpZ2dlcmVkIHRoZSBtb2JpbGUgbmF2IGJ5IG1pc3Rha2UpLlxuICAgIG1lbnVCdXR0b24uZm9jdXMoKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlQWN0aXZlO1xufTtcblxuY29uc3QgcmVzaXplID0gKCkgPT4ge1xuICBjb25zdCBjbG9zZXIgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcblxuICBpZiAoaXNBY3RpdmUoKSAmJiBjbG9zZXIgJiYgY2xvc2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoID09PSAwKSB7XG4gICAgLy8gV2hlbiB0aGUgbW9iaWxlIG5hdiBpcyBhY3RpdmUsIGFuZCB0aGUgY2xvc2UgYm94IGlzbid0IHZpc2libGUsXG4gICAgLy8gd2Uga25vdyB0aGUgdXNlcidzIHZpZXdwb3J0IGhhcyBiZWVuIHJlc2l6ZWQgdG8gYmUgbGFyZ2VyLlxuICAgIC8vIExldCdzIG1ha2UgdGhlIHBhZ2Ugc3RhdGUgY29uc2lzdGVudCBieSBkZWFjdGl2YXRpbmcgdGhlIG1vYmlsZSBuYXYuXG4gICAgbmF2aWdhdGlvbi50b2dnbGVOYXYuY2FsbChjbG9zZXIsIGZhbHNlKTtcbiAgfVxufTtcblxuY29uc3Qgb25NZW51Q2xvc2UgPSAoKSA9PiBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKG5hdmlnYXRpb24sIGZhbHNlKTtcblxuY29uc3QgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duID0gKCkgPT4ge1xuICBpZiAoIW5hdkFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZShuYXZBY3RpdmUsIGZhbHNlKTtcbiAgbmF2QWN0aXZlID0gbnVsbDtcbn07XG5cbmNvbnN0IGZvY3VzTmF2QnV0dG9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudE5hdkl0ZW0gPSBldmVudC50YXJnZXQuY2xvc2VzdChOQVZfUFJJTUFSWV9JVEVNKTtcblxuICAvLyBPbmx5IHNoaWZ0IGZvY3VzIGlmIHdpdGhpbiBkcm9wZG93blxuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKE5BVl9DT05UUk9MKSkge1xuICAgIGNvbnN0IG5hdkNvbnRyb2wgPSBwYXJlbnROYXZJdGVtLnF1ZXJ5U2VsZWN0b3IoTkFWX0NPTlRST0wpO1xuICAgIGlmIChuYXZDb250cm9sKSB7XG4gICAgICBuYXZDb250cm9sLmZvY3VzKCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duKCk7XG4gIGZvY3VzTmF2QnV0dG9uKGV2ZW50KTtcbn07XG5cbm5hdmlnYXRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtOQVZfQ09OVFJPTF0oKSB7XG4gICAgICAgIC8vIElmIGFub3RoZXIgbmF2IGlzIG9wZW4sIGNsb3NlIGl0XG4gICAgICAgIGlmIChuYXZBY3RpdmUgIT09IHRoaXMpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgbGFzdCBjbGlja2VkIG5hdiBsaW5rIGVsZW1lbnQsIHNvIHdlXG4gICAgICAgIC8vIGNhbiBoaWRlIHRoZSBkcm9wZG93biBpZiBhbm90aGVyIGVsZW1lbnQgb24gdGhlIHBhZ2UgaXMgY2xpY2tlZFxuICAgICAgICBpZiAoIW5hdkFjdGl2ZSkge1xuICAgICAgICAgIG5hdkFjdGl2ZSA9IHRoaXM7XG4gICAgICAgICAgdG9nZ2xlKG5hdkFjdGl2ZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB0aGlzIHNvIHRoZSBldmVudCBoYW5kbGVyIG9uIHRoZSBib2R5IGRvZXNuJ3QgZmlyZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgW0JPRFldOiBoaWRlQWN0aXZlTmF2RHJvcGRvd24sXG4gICAgICBbT1BFTkVSU106IHRvZ2dsZU5hdixcbiAgICAgIFtDTE9TRVJTXTogdG9nZ2xlTmF2LFxuICAgICAgW05BVl9MSU5LU10oKSB7XG4gICAgICAgIC8vIEEgbmF2aWdhdGlvbiBsaW5rIGhhcyBiZWVuIGNsaWNrZWQhIFdlIHdhbnQgdG8gY29sbGFwc2UgYW55XG4gICAgICAgIC8vIGhpZXJhcmNoaWNhbCBuYXZpZ2F0aW9uIFVJIGl0J3MgYSBwYXJ0IG9mLCBzbyB0aGF0IHRoZSB1c2VyXG4gICAgICAgIC8vIGNhbiBmb2N1cyBvbiB3aGF0ZXZlciB0aGV5J3ZlIGp1c3Qgc2VsZWN0ZWQuXG5cbiAgICAgICAgLy8gU29tZSBuYXZpZ2F0aW9uIGxpbmtzIGFyZSBpbnNpZGUgYWNjb3JkaW9uczsgd2hlbiB0aGV5J3JlXG4gICAgICAgIC8vIGNsaWNrZWQsIHdlIHdhbnQgdG8gY29sbGFwc2UgdGhvc2UgYWNjb3JkaW9ucy5cbiAgICAgICAgY29uc3QgYWNjID0gdGhpcy5jbG9zZXN0KGFjY29yZGlvbi5BQ0NPUkRJT04pO1xuXG4gICAgICAgIGlmIChhY2MpIHtcbiAgICAgICAgICBhY2NvcmRpb24uZ2V0QnV0dG9ucyhhY2MpLmZvckVhY2goKGJ0bikgPT4gYWNjb3JkaW9uLmhpZGUoYnRuKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGUgbW9iaWxlIG5hdmlnYXRpb24gbWVudSBpcyBhY3RpdmUsIHdlIHdhbnQgdG8gaGlkZSBpdC5cbiAgICAgICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKG5hdmlnYXRpb24sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtOQVZfUFJJTUFSWV06IGtleW1hcCh7IEVzY2FwZTogaGFuZGxlRXNjYXBlIH0pLFxuICAgIH0sXG4gICAgZm9jdXNvdXQ6IHtcbiAgICAgIFtOQVZfUFJJTUFSWV0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmF2ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTkFWX1BSSU1BUlkpO1xuXG4gICAgICAgIGlmICghbmF2LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZU5hdkRyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgY29uc3QgdHJhcENvbnRhaW5lciA9IHJvb3QubWF0Y2hlcyhOQVYpID8gcm9vdCA6IHJvb3QucXVlcnlTZWxlY3RvcihOQVYpO1xuXG4gICAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgICBuYXZpZ2F0aW9uLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0cmFwQ29udGFpbmVyLCB7XG4gICAgICAgICAgRXNjYXBlOiBvbk1lbnVDbG9zZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGFkZFNhZmFyaUNsYXNzKCk7XG4gICAgICByZXNpemUoKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSwgZmFsc2UpO1xuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemUsIGZhbHNlKTtcbiAgICAgIG5hdkFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICAgIHRvZ2dsZU5hdixcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdGlvbjtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgQ1VSUkVOVF9DTEFTUyA9IGAke1BSRUZJWH0tY3VycmVudGA7XG5jb25zdCBJTl9QQUdFX05BVl9IRUFESU5HUyA9IFwiaDIgaDNcIjtcbmNvbnN0IElOX1BBR0VfTkFWX1ZBTElEX0hFQURJTkdTID0gW1wiaDFcIiwgXCJoMlwiLCBcImgzXCIsIFwiaDRcIiwgXCJoNVwiLCBcImg2XCJdO1xuY29uc3QgSU5fUEFHRV9OQVZfVElUTEVfVEVYVCA9IFwiT24gdGhpcyBwYWdlXCI7XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9IRUFESU5HX0xFVkVMID0gXCJoNFwiO1xuY29uc3QgSU5fUEFHRV9OQVZfU0NST0xMX09GRlNFVCA9IDA7XG5jb25zdCBJTl9QQUdFX05BVl9ST09UX01BUkdJTiA9IFwiMHB4IDBweCAwcHggMHB4XCI7XG5jb25zdCBJTl9QQUdFX05BVl9USFJFU0hPTEQgPSBcIjFcIjtcbmNvbnN0IElOX1BBR0VfTkFWX0NMQVNTID0gYCR7UFJFRklYfS1pbi1wYWdlLW5hdmA7XG5jb25zdCBJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1MgPSBgJHtQUkVGSVh9LWFuY2hvcmA7XG5jb25zdCBJTl9QQUdFX05BVl9OQVZfQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX25hdmA7XG5jb25zdCBJTl9QQUdFX05BVl9MSVNUX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19saXN0YDtcbmNvbnN0IElOX1BBR0VfTkFWX0lURU1fQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX2l0ZW1gO1xuY29uc3QgSU5fUEFHRV9OQVZfUFJJTUFSWV9JVEVNX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfSVRFTV9DTEFTU30tLXByaW1hcnlgO1xuY29uc3QgSU5fUEFHRV9OQVZfTElOS19DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9fbGlua2A7XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9faGVhZGluZ2A7XG5jb25zdCBNQUlOX0VMRU1FTlQgPSBcIm1haW5cIjtcblxuLyoqXG4gKiBTZXQgdGhlIGFjdGl2ZSBsaW5rIHN0YXRlIGZvciB0aGUgY3VycmVudGx5IG9ic2VydmVkIHNlY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNldEFjdGl2ZSA9IChlbCkgPT4ge1xuICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0lOX1BBR0VfTkFWX0xJTktfQ0xBU1N9YCk7XG4gIGVsLm1hcCgoaSkgPT4ge1xuICAgIGlmIChpLmlzSW50ZXJzZWN0aW5nID09PSB0cnVlICYmIGkuaW50ZXJzZWN0aW9uUmF0aW8gPj0gMSkge1xuICAgICAgYWxsTGlua3MuZm9yRWFjaCgobGluaykgPT4gbGluay5jbGFzc0xpc3QucmVtb3ZlKENVUlJFTlRfQ0xBU1MpKTtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGBhW2hyZWY9XCIjJHtpLnRhcmdldC5pZH1cIl1gKVxuICAgICAgICAuY2xhc3NMaXN0LmFkZChDVVJSRU5UX0NMQVNTKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgdGhlIGRlc2lnbmF0ZWQgaGVhZGluZyB0eXBlcyBmb3VuZCBpbiB0aGUgZGVzaWduYXRlZCBjb250ZW50IHJlZ2lvbi5cbiAqIFRocm93IGFuIGVycm9yIGlmIGFuIGludmFsaWQgaGVhZGVyIGVsZW1lbnQgaXMgZGVzaWduYXRlZC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWxlY3RlZENvbnRlbnRSZWdpb24gVGhlIGNvbnRlbnQgcmVnaW9uIHRoZSBjb21wb25lbnQgc2hvdWxkIHB1bGwgaGVhZGVycyBmcm9tXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0ZWRIZWFkaW5nVHlwZXMgVGhlIGxpc3Qgb2YgaGVhZGluZyB0eXBlcyB0aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgbmF2IGxpc3RcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gLSBBbiBhcnJheSBvZiBkZXNpZ25hdGVkIGhlYWRpbmcgdHlwZXMgZnJvbSB0aGUgZGVzaWduYXRlZCBjb250ZW50IHJlZ2lvblxuICovXG5jb25zdCBjcmVhdGVTZWN0aW9uSGVhZGluZ3NBcnJheSA9IChcbiAgc2VsZWN0ZWRDb250ZW50UmVnaW9uLFxuICBzZWxlY3RlZEhlYWRpbmdUeXBlcyxcbikgPT4ge1xuICAvLyBDb252ZXJ0IGRlc2lnbmF0ZWQgaGVhZGluZ3MgbGlzdCB0byBhbiBhcnJheVxuICBjb25zdCBzZWxlY3RlZEhlYWRpbmdUeXBlc0FycmF5ID0gc2VsZWN0ZWRIZWFkaW5nVHlwZXMuaW5kZXhPZihcIiBcIilcbiAgICA/IHNlbGVjdGVkSGVhZGluZ1R5cGVzLnNwbGl0KFwiIFwiKVxuICAgIDogc2VsZWN0ZWRIZWFkaW5nVHlwZXM7XG4gIGNvbnN0IGNvbnRlbnRSZWdpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdGVkQ29udGVudFJlZ2lvbik7XG5cbiAgc2VsZWN0ZWRIZWFkaW5nVHlwZXNBcnJheS5mb3JFYWNoKChoZWFkaW5nVHlwZSkgPT4ge1xuICAgIGlmICghSU5fUEFHRV9OQVZfVkFMSURfSEVBRElOR1MuaW5jbHVkZXMoaGVhZGluZ1R5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbi1wYWdlIG5hdmlnYXRpb246IGRhdGEtaGVhZGluZy1lbGVtZW50cyBhdHRyaWJ1dGUgZGVmaW5lZCB3aXRoIGFuIGludmFsaWQgaGVhZGluZyB0eXBlOiBcIiR7aGVhZGluZ1R5cGV9XCIuXG4gICAgICAgIERlZmluZSB0aGUgYXR0cmlidXRlIHdpdGggb25lIG9yIG1vcmUgb2YgdGhlIGZvbGxvd2luZzogXCIke0lOX1BBR0VfTkFWX1ZBTElEX0hFQURJTkdTfVwiLlxuICAgICAgICBEbyBub3QgdXNlIGNvbW1hcyBvciBvdGhlciBwdW5jdHVhdGlvbiBpbiB0aGUgYXR0cmlidXRlIGRlZmluaXRpb24uYCxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBzZWN0aW9uSGVhZGluZ3NBcnJheSA9IEFycmF5LmZyb20oXG4gICAgY29udGVudFJlZ2lvbi5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdGVkSGVhZGluZ1R5cGVzQXJyYXkpLFxuICApO1xuXG4gIHJldHVybiBzZWN0aW9uSGVhZGluZ3NBcnJheTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIHRoZSB2aXNpYmxlIGhlYWRpbmdzIGZyb20gc2VjdGlvbkhlYWRpbmdzQXJyYXkuXG4gKiBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgaGVhZGluZ3MgdGhhdCBhcmUgaGlkZGVuIHdpdGggZGlzcGxheTpub25lIG9yIHZpc2liaWxpdHk6bm9uZSBzdHlsZSBydWxlcy5cbiAqIFRoZXNlIGl0ZW1zIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGNvbXBvbmVudCBuYXYgbGlzdC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWxlY3RlZENvbnRlbnRSZWdpb24gVGhlIGNvbnRlbnQgcmVnaW9uIHRoZSBjb21wb25lbnQgc2hvdWxkIHB1bGwgaGVhZGVycyBmcm9tXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0ZWRIZWFkaW5nVHlwZXMgVGhlIGxpc3Qgb2YgaGVhZGluZyB0eXBlcyB0aGF0IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgbmF2IGxpc3RcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gLSBBbiBhcnJheSBvZiB2aXNpYmxlIGhlYWRpbmdzIGZyb20gdGhlIGRlc2lnbmF0ZWQgY29udGVudCByZWdpb25cbiAqL1xuY29uc3QgZ2V0VmlzaWJsZVNlY3Rpb25IZWFkaW5ncyA9IChcbiAgc2VsZWN0ZWRDb250ZW50UmVnaW9uLFxuICBzZWxlY3RlZEhlYWRpbmdUeXBlcyxcbikgPT4ge1xuICBjb25zdCBzZWN0aW9uSGVhZGluZ3MgPSBjcmVhdGVTZWN0aW9uSGVhZGluZ3NBcnJheShcbiAgICBzZWxlY3RlZENvbnRlbnRSZWdpb24sXG4gICAgc2VsZWN0ZWRIZWFkaW5nVHlwZXMsXG4gICk7XG5cbiAgLy8gRmluZCBhbGwgaGVhZGluZ3Mgd2l0aCBoaWRkZW4gc3R5bGluZyBhbmQgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgYXJyYXlcbiAgY29uc3QgdmlzaWJsZVNlY3Rpb25IZWFkaW5ncyA9IHNlY3Rpb25IZWFkaW5ncy5maWx0ZXIoKGhlYWRpbmcpID0+IHtcbiAgICBjb25zdCBoZWFkaW5nU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkaW5nKTtcbiAgICBjb25zdCB2aXNpYmxlSGVhZGluZyA9XG4gICAgICBoZWFkaW5nU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgIT09IFwibm9uZVwiICYmXG4gICAgICBoZWFkaW5nU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcInZpc2liaWxpdHlcIikgIT09IFwiaGlkZGVuXCI7XG5cbiAgICByZXR1cm4gdmlzaWJsZUhlYWRpbmc7XG4gIH0pO1xuXG4gIHJldHVybiB2aXNpYmxlU2VjdGlvbkhlYWRpbmdzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGhpZ2hlc3QtbGV2ZWwgaGVhZGVyIHRhZyBpbmNsdWRlZCBpbiB0aGUgbGluayBsaXN0XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc2VjdGlvbkhlYWRpbmdzIFRoZSBhcnJheSBvZiBoZWFkaW5ncyBzZWxlY3RlZCBmb3IgaW5jbHVzaW9uIGluIHRoZSBsaW5rIGxpc3RcbiAqXG4gKiBAcmV0dXJuIHt0YWdOYW1lfSAtIFRoZSB0YWcgbmFtZSBmb3IgdGhlIGhpZ2hlc3QgbGV2ZWwgb2YgaGVhZGVyIGluIHRoZSBsaW5rIGxpc3RcbiAqL1xuXG5jb25zdCBnZXRUb3BMZXZlbEhlYWRpbmcgPSAoc2VjdGlvbkhlYWRpbmdzKSA9PiB7XG4gIGNvbnN0IHRvcEhlYWRpbmcgPSBzZWN0aW9uSGVhZGluZ3NbMF0udGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gdG9wSGVhZGluZztcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgbm9kZSBsaXN0IG9mIHNlY3Rpb24gYW5jaG9yIHRhZ3NcbiAqXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2Rlc1xuICovXG5jb25zdCBnZXRTZWN0aW9uQW5jaG9ycyA9ICgpID0+IHtcbiAgY29uc3Qgc2VjdGlvbkFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIGAuJHtJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1N9YCxcbiAgKTtcbiAgcmV0dXJuIHNlY3Rpb25BbmNob3JzO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQgZm9yIHRoZSBnaXZlbiBoZWFkaW5nIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MSGVhZGluZ0VsZW1lbnR9IGhlYWRpbmdcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gVW5pcXVlIElEXG4gKi9cbmNvbnN0IGdldEhlYWRpbmdJZCA9IChoZWFkaW5nKSA9PiB7XG4gIGNvbnN0IGJhc2VJZCA9IGhlYWRpbmcudGV4dENvbnRlbnRcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC8vIFJlcGxhY2Ugbm9uLWFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIHdpdGggZGFzaGVzXG4gICAgLnJlcGxhY2UoL1teYS16XFxkXS9nLCBcIi1cIilcbiAgICAvLyBSZXBsYWNlIGEgc2VxdWVuY2Ugb2YgdHdvIG9yIG1vcmUgZGFzaGVzIHdpdGggYSBzaW5nbGUgZGFzaFxuICAgIC5yZXBsYWNlKC8tezIsfS9nLCBcIi1cIilcbiAgICAvLyBUcmltIGxlYWRpbmcgb3IgdHJhaWxpbmcgZGFzaCAodGhlcmUgc2hvdWxkIG9ubHkgZXZlciBiZSBvbmUpXG4gICAgLnJlcGxhY2UoL14tfC0kL2csIFwiXCIpO1xuXG4gIGxldCBpZDtcbiAgbGV0IHN1ZmZpeCA9IDA7XG4gIGRvIHtcbiAgICBpZCA9IGJhc2VJZDtcblxuICAgIC8vIFRvIGF2b2lkIGNvbmZsaWN0cyB3aXRoIGV4aXN0aW5nIElEcyBvbiB0aGUgcGFnZSwgbG9vcCBhbmQgYXBwZW5kIGFuXG4gICAgLy8gaW5jcmVtZW50ZWQgc3VmZml4IHVudGlsIGEgdW5pcXVlIElEIGlzIGZvdW5kLlxuICAgIHN1ZmZpeCArPSAxO1xuICAgIGlmIChzdWZmaXggPiAxKSB7XG4gICAgICBpZCArPSBgLSR7c3VmZml4fWA7XG4gICAgfVxuICB9IHdoaWxlIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgc2VjdGlvbiBpZC9hbmNob3IgaGFzaCB3aXRob3V0IHRoZSBudW1iZXIgc2lnblxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gLSBJZCB2YWx1ZSB3aXRoIHRoZSBudW1iZXIgc2lnbiByZW1vdmVkXG4gKi9cbmNvbnN0IGdldFNlY3Rpb25JZCA9ICh2YWx1ZSkgPT4ge1xuICBsZXQgaWQ7XG5cbiAgLy8gQ2hlY2sgaWYgdmFsdWUgaXMgYW4gZXZlbnQgb3IgZWxlbWVudCBhbmQgZ2V0IHRoZSBjbGVhbmVkIHVwIGlkXG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlkID0gdmFsdWUuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKS5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IHZhbHVlLnRhcmdldC5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuLyoqXG4gKiBTY3JvbGwgc21vb3RobHkgdG8gYSBzZWN0aW9uIGJhc2VkIG9uIHRoZSBwYXNzZWQgaW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IC0gSWQgdmFsdWUgd2l0aCB0aGUgbnVtYmVyIHNpZ24gcmVtb3ZlZFxuICovXG5jb25zdCBoYW5kbGVTY3JvbGxUb1NlY3Rpb24gPSAoZWwpID0+IHtcbiAgY29uc3QgaW5QYWdlTmF2RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtJTl9QQUdFX05BVl9DTEFTU31gKTtcbiAgY29uc3QgaW5QYWdlTmF2U2Nyb2xsT2Zmc2V0ID1cbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnNjcm9sbE9mZnNldCB8fCBJTl9QQUdFX05BVl9TQ1JPTExfT0ZGU0VUO1xuXG4gIHdpbmRvdy5zY3JvbGwoe1xuICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgIHRvcDogZWwub2Zmc2V0VG9wIC0gaW5QYWdlTmF2U2Nyb2xsT2Zmc2V0LFxuICAgIGJsb2NrOiBcInN0YXJ0XCIsXG4gIH0pO1xuXG4gIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKSAhPT0gZWwuaWQpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgXCJcIiwgYCMke2VsLmlkfWApO1xuICB9XG59O1xuXG4vKipcbiAqIFNjcm9sbHMgdGhlIHBhZ2UgdG8gdGhlIHNlY3Rpb24gY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudCBoYXNoIGZyYWdtZW50LCBpZiBvbmUgZXhpc3RzLlxuICovXG5jb25zdCBzY3JvbGxUb0N1cnJlbnRTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBoYXNoRnJhZ21lbnQgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgaWYgKGhhc2hGcmFnbWVudCkge1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2hGcmFnbWVudCk7XG4gICAgaWYgKGFuY2hvclRhZykge1xuICAgICAgaGFuZGxlU2Nyb2xsVG9TZWN0aW9uKGFuY2hvclRhZyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgaW4tcGFnZSBuYXZpZ2F0aW9uIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGluUGFnZU5hdkVsIFRoZSBpbi1wYWdlIG5hdiBlbGVtZW50XG4gKi9cbmNvbnN0IGNyZWF0ZUluUGFnZU5hdiA9IChpblBhZ2VOYXZFbCkgPT4ge1xuICBjb25zdCBpblBhZ2VOYXZUaXRsZVRleHQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGl0bGVUZXh0IHx8IElOX1BBR0VfTkFWX1RJVExFX1RFWFRcbiAgfWA7XG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlSGVhZGluZ0xldmVsID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnRpdGxlSGVhZGluZ0xldmVsIHx8IElOX1BBR0VfTkFWX1RJVExFX0hFQURJTkdfTEVWRUxcbiAgfWA7XG4gIGNvbnN0IGluUGFnZU5hdlJvb3RNYXJnaW4gPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQucm9vdE1hcmdpbiB8fCBJTl9QQUdFX05BVl9ST09UX01BUkdJTlxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2VGhyZXNob2xkID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LnRocmVzaG9sZCB8fCBJTl9QQUdFX05BVl9USFJFU0hPTERcbiAgfWA7XG4gIGNvbnN0IGluUGFnZU5hdkNvbnRlbnRTZWxlY3RvciA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC5tYWluQ29udGVudFNlbGVjdG9yIHx8IE1BSU5fRUxFTUVOVFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2SGVhZGluZ1NlbGVjdG9yID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0LmhlYWRpbmdFbGVtZW50cyB8fCBJTl9QQUdFX05BVl9IRUFESU5HU1xuICB9YDtcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgcm9vdE1hcmdpbjogaW5QYWdlTmF2Um9vdE1hcmdpbixcbiAgICB0aHJlc2hvbGQ6IFtpblBhZ2VOYXZUaHJlc2hvbGRdLFxuICB9O1xuXG4gIGNvbnN0IHNlY3Rpb25IZWFkaW5ncyA9IGdldFZpc2libGVTZWN0aW9uSGVhZGluZ3MoXG4gICAgaW5QYWdlTmF2Q29udGVudFNlbGVjdG9yLFxuICAgIGluUGFnZU5hdkhlYWRpbmdTZWxlY3RvcixcbiAgKTtcbiAgY29uc3QgaW5QYWdlTmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgaW5QYWdlTmF2LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaW5QYWdlTmF2VGl0bGVUZXh0KTtcbiAgaW5QYWdlTmF2LmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfTkFWX0NMQVNTKTtcblxuICBjb25zdCBpblBhZ2VOYXZUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaW5QYWdlTmF2VGl0bGVIZWFkaW5nTGV2ZWwpO1xuICBpblBhZ2VOYXZUaXRsZS5jbGFzc0xpc3QuYWRkKElOX1BBR0VfTkFWX1RJVExFX0NMQVNTKTtcbiAgaW5QYWdlTmF2VGl0bGUuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICBpblBhZ2VOYXZUaXRsZS50ZXh0Q29udGVudCA9IGluUGFnZU5hdlRpdGxlVGV4dDtcbiAgaW5QYWdlTmF2LmFwcGVuZENoaWxkKGluUGFnZU5hdlRpdGxlKTtcblxuICBjb25zdCBpblBhZ2VOYXZMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBpblBhZ2VOYXZMaXN0LmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfTElTVF9DTEFTUyk7XG4gIGluUGFnZU5hdi5hcHBlbmRDaGlsZChpblBhZ2VOYXZMaXN0KTtcblxuICBzZWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IGFuY2hvclRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGNvbnN0IHRleHRDb250ZW50T2ZMaW5rID0gZWwudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgdGFnID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHRvcEhlYWRpbmdMZXZlbCA9IGdldFRvcExldmVsSGVhZGluZyhzZWN0aW9uSGVhZGluZ3MpO1xuICAgIGNvbnN0IGhlYWRpbmdJZCA9IGdldEhlYWRpbmdJZChlbCk7XG5cbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKElOX1BBR0VfTkFWX0lURU1fQ0xBU1MpO1xuXG4gICAgaWYgKHRhZyA9PT0gdG9wSGVhZGluZ0xldmVsKSB7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKElOX1BBR0VfTkFWX1BSSU1BUllfSVRFTV9DTEFTUyk7XG4gICAgfVxuXG4gICAgbmF2TGlua3Muc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBgIyR7aGVhZGluZ0lkfWApO1xuICAgIG5hdkxpbmtzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIElOX1BBR0VfTkFWX0xJTktfQ0xBU1MpO1xuICAgIG5hdkxpbmtzLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnRPZkxpbms7XG5cbiAgICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiaWRcIiwgaGVhZGluZ0lkKTtcbiAgICBhbmNob3JUYWcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgSU5fUEFHRV9OQVZfQU5DSE9SX0NMQVNTKTtcbiAgICBlbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGFuY2hvclRhZyk7XG5cbiAgICBpblBhZ2VOYXZMaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChuYXZMaW5rcyk7XG4gIH0pO1xuXG4gIGluUGFnZU5hdkVsLmFwcGVuZENoaWxkKGluUGFnZU5hdik7XG5cbiAgY29uc3QgYW5jaG9yVGFncyA9IGdldFNlY3Rpb25BbmNob3JzKCk7XG4gIGNvbnN0IG9ic2VydmVTZWN0aW9ucyA9IG5ldyB3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoc2V0QWN0aXZlLCBvcHRpb25zKTtcblxuICBhbmNob3JUYWdzLmZvckVhY2goKHRhZykgPT4ge1xuICAgIG9ic2VydmVTZWN0aW9ucy5vYnNlcnZlKHRhZyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgY2xpY2sgZnJvbSBsaW5rXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGluLXBhZ2UgbmF2IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVDbGlja0Zyb21MaW5rID0gKGVsKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRUb1Njcm9sbFRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwuaGFzaC5zbGljZSgxKSk7XG4gIGhhbmRsZVNjcm9sbFRvU2VjdGlvbihlbGVtZW50VG9TY3JvbGxUbyk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZW50ZXIgZXZlbnQgZnJvbSBhIGxpbmsgd2l0aGluIHRoZSBpbi1wYWdlIG5hdiBjb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVudGVyRnJvbUxpbmsgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgaWQgPSBnZXRTZWN0aW9uSWQoZXZlbnQpO1xuICBjb25zdCB0YXJnZXRBbmNob3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGNvbnN0IHRhcmdldCA9IHRhcmdldEFuY2hvci5wYXJlbnRFbGVtZW50O1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgMCk7XG4gICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImJsdXJcIixcbiAgICAgIG9uY2UoKCkgPT4ge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgLTEpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxuICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24odGFyZ2V0QW5jaG9yKTtcbn07XG5cbmNvbnN0IGluUGFnZU5hdmlnYXRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBoYW5kbGVDbGlja0Zyb21MaW5rKHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gXToga2V5bWFwKHtcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUxpbmssXG4gICAgICB9KSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoYC4ke0lOX1BBR0VfTkFWX0NMQVNTfWAsIHJvb3QpLmZvckVhY2goKGluUGFnZU5hdkVsKSA9PiB7XG4gICAgICAgIGNyZWF0ZUluUGFnZU5hdihpblBhZ2VOYXZFbCk7XG4gICAgICAgIHNjcm9sbFRvQ3VycmVudFNlY3Rpb24oKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluUGFnZU5hdmlnYXRpb247XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IE1BU0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tbWFza2VkYDtcbmNvbnN0IE1BU0tFRCA9IGAuJHtNQVNLRURfQ0xBU1N9YDtcbmNvbnN0IE1BU0sgPSBgJHtQUkVGSVh9LWlucHV0LW1hc2tgO1xuY29uc3QgTUFTS19DT05URU5UID0gYCR7TUFTS30tLWNvbnRlbnRgO1xuY29uc3QgUExBQ0VIT0xERVIgPSBcInBsYWNlaG9sZGVyXCI7XG5cbi8vIFVzZXIgZGVmaW5lZCBWYWx1ZXNcbmNvbnN0IG1hc2tlZE51bWJlciA9IFwiXyNkRG1NeVk5XCI7XG5jb25zdCBtYXNrZWRMZXR0ZXIgPSBcIkFcIjtcblxuLy8gcmVwbGFjZXMgZWFjaCBtYXNrZWQgaW5wdXQgd2l0aCBhIHNoZWxsIGNvbnRhaW5pbmcgdGhlIGlucHV0IGFuZCBpdCdzIG1hc2suXG5jb25zdCBjcmVhdGVNYXNrZWRJbnB1dFNoZWxsID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gaW5wdXQuZ2V0QXR0cmlidXRlKGAke1BMQUNFSE9MREVSfWApO1xuICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgcGxhY2Vob2xkZXIubGVuZ3RoKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyKTtcbiAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoYCR7UExBQ0VIT0xERVJ9YCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc2hlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgc2hlbGwuY2xhc3NMaXN0LmFkZChNQVNLKTtcbiAgc2hlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS1tYXNrXCIsIHBsYWNlaG9sZGVyKTtcblxuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChNQVNLX0NPTlRFTlQpO1xuICBjb250ZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgY29udGVudC5pZCA9IGAke2lucHV0LmlkfU1hc2tgO1xuICBjb250ZW50LnRleHRDb250ZW50ID0gcGxhY2Vob2xkZXI7XG5cbiAgc2hlbGwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gIGlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNoZWxsLCBpbnB1dCk7XG4gIHNoZWxsLmFwcGVuZENoaWxkKGlucHV0KTtcbn07XG5cbmNvbnN0IHNldFZhbHVlT2ZNYXNrID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgdmFsdWUgfSA9IGVsO1xuICBjb25zdCBwbGFjZWhvbGRlclZhbCA9IGAke2VsLmRhdGFzZXQucGxhY2Vob2xkZXIuc3Vic3RyKHZhbHVlLmxlbmd0aCl9YDtcblxuICBjb25zdCB0aGVJRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgdGhlSUVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIHJldHVybiBbdGhlSUVsLCBwbGFjZWhvbGRlclZhbF07XG59O1xuXG5jb25zdCBzdHJpcHBlZFZhbHVlID0gKGlzQ2hhcnNldFByZXNlbnQsIHZhbHVlKSA9PlxuICBpc0NoYXJzZXRQcmVzZW50ID8gdmFsdWUucmVwbGFjZSgvXFxXL2csIFwiXCIpIDogdmFsdWUucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuXG5jb25zdCBpc0ludGVnZXIgPSAodmFsdWUpID0+ICFOdW1iZXIuaXNOYU4ocGFyc2VJbnQodmFsdWUsIDEwKSk7XG5cbmNvbnN0IGlzTGV0dGVyID0gKHZhbHVlKSA9PiAodmFsdWUgPyB2YWx1ZS5tYXRjaCgvW0EtWl0vaSkgOiBmYWxzZSk7XG5cbmNvbnN0IGhhbmRsZUN1cnJlbnRWYWx1ZSA9IChlbCkgPT4ge1xuICBjb25zdCBpc0NoYXJzZXRQcmVzZW50ID0gZWwuZGF0YXNldC5jaGFyc2V0O1xuICBjb25zdCBwbGFjZWhvbGRlciA9IGlzQ2hhcnNldFByZXNlbnQgfHwgZWwuZGF0YXNldC5wbGFjZWhvbGRlcjtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gZWw7XG4gIGNvbnN0IGxlbiA9IHBsYWNlaG9sZGVyLmxlbmd0aDtcbiAgbGV0IG5ld1ZhbHVlID0gXCJcIjtcbiAgbGV0IGk7XG4gIGxldCBjaGFySW5kZXg7XG5cbiAgY29uc3Qgc3RyaXBwZWRWYWwgPSBzdHJpcHBlZFZhbHVlKGlzQ2hhcnNldFByZXNlbnQsIHZhbHVlKTtcblxuICBmb3IgKGkgPSAwLCBjaGFySW5kZXggPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBjb25zdCBpc0ludCA9IGlzSW50ZWdlcihzdHJpcHBlZFZhbFtjaGFySW5kZXhdKTtcbiAgICBjb25zdCBpc0xldCA9IGlzTGV0dGVyKHN0cmlwcGVkVmFsW2NoYXJJbmRleF0pO1xuICAgIGNvbnN0IG1hdGNoZXNOdW1iZXIgPSBtYXNrZWROdW1iZXIuaW5kZXhPZihwbGFjZWhvbGRlcltpXSkgPj0gMDtcbiAgICBjb25zdCBtYXRjaGVzTGV0dGVyID0gbWFza2VkTGV0dGVyLmluZGV4T2YocGxhY2Vob2xkZXJbaV0pID49IDA7XG5cbiAgICBpZiAoXG4gICAgICAobWF0Y2hlc051bWJlciAmJiBpc0ludCkgfHxcbiAgICAgIChpc0NoYXJzZXRQcmVzZW50ICYmIG1hdGNoZXNMZXR0ZXIgJiYgaXNMZXQpXG4gICAgKSB7XG4gICAgICBuZXdWYWx1ZSArPSBzdHJpcHBlZFZhbFtjaGFySW5kZXhdO1xuICAgICAgY2hhckluZGV4ICs9IDE7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICghaXNDaGFyc2V0UHJlc2VudCAmJiAhaXNJbnQgJiYgbWF0Y2hlc051bWJlcikgfHxcbiAgICAgIChpc0NoYXJzZXRQcmVzZW50ICYmXG4gICAgICAgICgobWF0Y2hlc0xldHRlciAmJiAhaXNMZXQpIHx8IChtYXRjaGVzTnVtYmVyICYmICFpc0ludCkpKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSArPSBwbGFjZWhvbGRlcltpXTtcbiAgICB9XG4gICAgLy8gYnJlYWsgaWYgbm8gY2hhcmFjdGVycyBsZWZ0IGFuZCB0aGUgcGF0dGVybiBpcyBub24tc3BlY2lhbCBjaGFyYWN0ZXJcbiAgICBpZiAoc3RyaXBwZWRWYWxbY2hhckluZGV4XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3VmFsdWU7XG59O1xuXG5jb25zdCBoYW5kbGVWYWx1ZUNoYW5nZSA9IChlbCkgPT4ge1xuICBjb25zdCBpbnB1dEVsID0gZWw7XG4gIGNvbnN0IGlkID0gaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgaW5wdXRFbC52YWx1ZSA9IGhhbmRsZUN1cnJlbnRWYWx1ZShpbnB1dEVsKTtcblxuICBjb25zdCBtYXNrVmFsID0gc2V0VmFsdWVPZk1hc2soZWwpO1xuICBjb25zdCBtYXNrRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpZH1NYXNrYCk7XG4gIG1hc2tFbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIG1hc2tFbC5yZXBsYWNlQ2hpbGRyZW4obWFza1ZhbFswXSwgbWFza1ZhbFsxXSk7XG59O1xuXG5jb25zdCBpbnB1dE1hc2tFdmVudHMgPSB7XG4gIGtleXVwOiB7XG4gICAgW01BU0tFRF0oKSB7XG4gICAgICBoYW5kbGVWYWx1ZUNoYW5nZSh0aGlzKTtcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgaW5wdXRNYXNrID0gYmVoYXZpb3IoaW5wdXRNYXNrRXZlbnRzLCB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhNQVNLRUQsIHJvb3QpLmZvckVhY2goKG1hc2tlZElucHV0KSA9PiB7XG4gICAgICBjcmVhdGVNYXNrZWRJbnB1dFNoZWxsKG1hc2tlZElucHV0KTtcbiAgICB9KTtcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlucHV0TWFzaztcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGVcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IGFjY29yZGlvbiA9IHJlcXVpcmUoXCIuLi8uLi91c2EtYWNjb3JkaW9uL3NyYy9pbmRleFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IExBTkdVQUdFID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VgO1xuY29uc3QgTEFOR1VBR0VfU1VCID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VfX3N1Ym1lbnVgO1xuY29uc3QgTEFOR1VBR0VfUFJJTUFSWSA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlX19wcmltYXJ5YDtcbmNvbnN0IExBTkdVQUdFX1BSSU1BUllfSVRFTSA9IGAuJHtQUkVGSVh9LWxhbmd1YWdlX19wcmltYXJ5LWl0ZW1gO1xuY29uc3QgTEFOR1VBR0VfQ09OVFJPTCA9IGBidXR0b24uJHtQUkVGSVh9LWxhbmd1YWdlX19saW5rYDtcbmNvbnN0IExBTkdVQUdFX0xJTktTID0gYCR7TEFOR1VBR0V9IGFgO1xuXG5sZXQgbGFuZ3VhZ2VTZWxlY3RvcjtcbmxldCBsYW5ndWFnZUFjdGl2ZTtcblxuY29uc3Qgb25MYW5ndWFnZUNsb3NlID0gKCkgPT5cbiAgbGFuZ3VhZ2VTZWxlY3Rvci50b2dnbGVMYW5ndWFnZS5jYWxsKGxhbmd1YWdlU2VsZWN0b3IsIGZhbHNlKTtcblxuY29uc3QgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24gPSAoKSA9PiB7XG4gIGlmICghbGFuZ3VhZ2VBY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0b2dnbGUobGFuZ3VhZ2VBY3RpdmUsIGZhbHNlKTtcbiAgbGFuZ3VhZ2VBY3RpdmUgPSBudWxsO1xufTtcblxuY29uc3QgZm9jdXNMYW5ndWFnZUJ1dHRvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBwYXJlbnRMYW5ndWFnZUl0ZW0gPSBldmVudC50YXJnZXQuY2xvc2VzdChMQU5HVUFHRV9QUklNQVJZX0lURU0pO1xuXG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoTEFOR1VBR0VfQ09OVFJPTCkpIHtcbiAgICBwYXJlbnRMYW5ndWFnZUl0ZW0ucXVlcnlTZWxlY3RvcihMQU5HVUFHRV9DT05UUk9MKS5mb2N1cygpO1xuICB9XG59O1xuXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgZm9jdXNMYW5ndWFnZUJ1dHRvbihldmVudCk7XG59O1xuXG5sYW5ndWFnZVNlbGVjdG9yID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbTEFOR1VBR0VfQ09OVFJPTF0oKSB7XG4gICAgICAgIGlmIChsYW5ndWFnZUFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhbmd1YWdlQWN0aXZlID09PSB0aGlzKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFsYW5ndWFnZUFjdGl2ZSkge1xuICAgICAgICAgIGxhbmd1YWdlQWN0aXZlID0gdGhpcztcbiAgICAgICAgICB0b2dnbGUobGFuZ3VhZ2VBY3RpdmUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIFtCT0RZXTogaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24sXG4gICAgICBbTEFOR1VBR0VfTElOS1NdKCkge1xuICAgICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG5cbiAgICAgICAgaWYgKGFjYykge1xuICAgICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaCgoYnRuKSA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtMQU5HVUFHRV9QUklNQVJZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW0xBTkdVQUdFX1BSSU1BUlldKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoTEFOR1VBR0VfUFJJTUFSWSk7XG5cbiAgICAgICAgaWYgKCFsYW5ndWFnZS5jb250YWlucyhldmVudC5yZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGhpZGVBY3RpdmVMYW5ndWFnZURyb3Bkb3duKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgY29uc3QgdHJhcENvbnRhaW5lciA9IHJvb3QubWF0Y2hlcyhMQU5HVUFHRV9TVUIpXG4gICAgICAgID8gcm9vdFxuICAgICAgICA6IHJvb3QucXVlcnlTZWxlY3RvcihMQU5HVUFHRV9TVUIpO1xuXG4gICAgICBpZiAodHJhcENvbnRhaW5lcikge1xuICAgICAgICBsYW5ndWFnZVNlbGVjdG9yLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0cmFwQ29udGFpbmVyLCB7XG4gICAgICAgICAgRXNjYXBlOiBvbkxhbmd1YWdlQ2xvc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICBsYW5ndWFnZUFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsYW5ndWFnZVNlbGVjdG9yO1xuIiwiY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgRm9jdXNUcmFwID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2ZvY3VzLXRyYXBcIik7XG5jb25zdCBTY3JvbGxCYXJXaWR0aCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zY3JvbGxiYXItd2lkdGhcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcblxuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTU9EQUxfQ0xBU1NOQU1FID0gYCR7UFJFRklYfS1tb2RhbGA7XG5jb25zdCBPVkVSTEFZX0NMQVNTTkFNRSA9IGAke01PREFMX0NMQVNTTkFNRX0tb3ZlcmxheWA7XG5jb25zdCBXUkFQUEVSX0NMQVNTTkFNRSA9IGAke01PREFMX0NMQVNTTkFNRX0td3JhcHBlcmA7XG5jb25zdCBPUEVORVJfQVRUUklCVVRFID0gXCJkYXRhLW9wZW4tbW9kYWxcIjtcbmNvbnN0IENMT1NFUl9BVFRSSUJVVEUgPSBcImRhdGEtY2xvc2UtbW9kYWxcIjtcbmNvbnN0IEZPUkNFX0FDVElPTl9BVFRSSUJVVEUgPSBcImRhdGEtZm9yY2UtYWN0aW9uXCI7XG5jb25zdCBOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURSA9IGBkYXRhLW1vZGFsLWhpZGRlbmA7XG5jb25zdCBNT0RBTCA9IGAuJHtNT0RBTF9DTEFTU05BTUV9YDtcbmNvbnN0IElOSVRJQUxfRk9DVVMgPSBgLiR7V1JBUFBFUl9DTEFTU05BTUV9ICpbZGF0YS1mb2N1c11gO1xuY29uc3QgQ0xPU0VfQlVUVE9OID0gYCR7V1JBUFBFUl9DTEFTU05BTUV9ICpbJHtDTE9TRVJfQVRUUklCVVRFfV1gO1xuY29uc3QgT1BFTkVSUyA9IGAqWyR7T1BFTkVSX0FUVFJJQlVURX1dW2FyaWEtY29udHJvbHNdYDtcbmNvbnN0IENMT1NFUlMgPSBgJHtDTE9TRV9CVVRUT059LCAuJHtPVkVSTEFZX0NMQVNTTkFNRX06bm90KFske0ZPUkNFX0FDVElPTl9BVFRSSUJVVEV9XSlgO1xuY29uc3QgTk9OX01PREFMUyA9IGBib2R5ID4gKjpub3QoLiR7V1JBUFBFUl9DTEFTU05BTUV9KTpub3QoW2FyaWEtaGlkZGVuXSlgO1xuY29uc3QgTk9OX01PREFMU19ISURERU4gPSBgWyR7Tk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEV9XWA7XG5cbmNvbnN0IEFDVElWRV9DTEFTUyA9IFwidXNhLWpzLW1vZGFsLS1hY3RpdmVcIjtcbmNvbnN0IFBSRVZFTlRfQ0xJQ0tfQ0xBU1MgPSBcInVzYS1qcy1uby1jbGlja1wiO1xuY29uc3QgVklTSUJMRV9DTEFTUyA9IFwiaXMtdmlzaWJsZVwiO1xuY29uc3QgSElEREVOX0NMQVNTID0gXCJpcy1oaWRkZW5cIjtcblxubGV0IG1vZGFsO1xubGV0IElOSVRJQUxfQk9EWV9QQURESU5HO1xubGV0IFRFTVBPUkFSWV9CT0RZX1BBRERJTkc7XG5cbmNvbnN0IGlzQWN0aXZlID0gKCkgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoQUNUSVZFX0NMQVNTKTtcbmNvbnN0IFNDUk9MTEJBUl9XSURUSCA9IFNjcm9sbEJhcldpZHRoKCk7XG5cbi8qKlxuICogIENsb3NlcyBtb2RhbCB3aGVuIGJvdW5kIHRvIGEgYnV0dG9uIGFuZCBwcmVzc2VkLlxuICovXG5jb25zdCBvbk1lbnVDbG9zZSA9ICgpID0+IHtcbiAgbW9kYWwudG9nZ2xlTW9kYWwuY2FsbChtb2RhbCwgZmFsc2UpO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHZhbHVlIGZvciB0ZW1wb3JhcnkgYm9keSBwYWRkaW5nIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHdoZW4gdGhlIG1vZGFsIGlzIG9wZW4uXG4gKiBWYWx1ZSBpcyBjcmVhdGVkIGJ5IGNoZWNraW5nIGZvciBpbml0aWFsIGJvZHkgcGFkZGluZyBhbmQgYWRkaW5nIHRoZSB3aWR0aCBvZiB0aGUgc2Nyb2xsYmFyLlxuICovXG5jb25zdCBzZXRUZW1wb3JhcnlCb2R5UGFkZGluZyA9ICgpID0+IHtcbiAgSU5JVElBTF9CT0RZX1BBRERJTkcgPSB3aW5kb3dcbiAgICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwicGFkZGluZy1yaWdodFwiKTtcbiAgVEVNUE9SQVJZX0JPRFlfUEFERElORyA9IGAke1xuICAgIHBhcnNlSW50KElOSVRJQUxfQk9EWV9QQURESU5HLnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKSArXG4gICAgcGFyc2VJbnQoU0NST0xMQkFSX1dJRFRILnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKVxuICB9cHhgO1xufTtcblxuLyoqXG4gKiAgVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIGEgbW9kYWwgd2luZG93XG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBzYWZlQWN0aXZlIGlmIG1vYmlsZSBpcyBvcGVuLlxuICovXG5mdW5jdGlvbiB0b2dnbGVNb2RhbChldmVudCkge1xuICBsZXQgb3JpZ2luYWxPcGVuZXI7XG4gIGxldCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9ICFpc0FjdGl2ZSgpO1xuICBjb25zdCBtb2RhbElkID0gY2xpY2tlZEVsZW1lbnRcbiAgICA/IGNsaWNrZWRFbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIilcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1dSQVBQRVJfQ0xBU1NOQU1FfS4ke1ZJU0lCTEVfQ0xBU1N9YCk7XG4gIGNvbnN0IHRhcmdldE1vZGFsID0gc2FmZUFjdGl2ZVxuICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJZClcbiAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke1dSQVBQRVJfQ0xBU1NOQU1FfS4ke1ZJU0lCTEVfQ0xBU1N9YCk7XG5cbiAgLy8gaWYgdGhlcmUgaXMgbm8gbW9kYWwgd2UgcmV0dXJuIGVhcmx5XG4gIGlmICghdGFyZ2V0TW9kYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBvcGVuRm9jdXNFbCA9IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA/IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoSU5JVElBTF9GT0NVUylcbiAgICA6IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoYC4ke01PREFMX0NMQVNTTkFNRX1gKTtcbiAgY29uc3QgcmV0dXJuRm9jdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0YXJnZXRNb2RhbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wZW5lclwiKSxcbiAgKTtcbiAgY29uc3QgbWVudUJ1dHRvbiA9IGJvZHkucXVlcnlTZWxlY3RvcihPUEVORVJTKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gdGFyZ2V0TW9kYWwuZ2V0QXR0cmlidXRlKEZPUkNFX0FDVElPTl9BVFRSSUJVVEUpO1xuXG4gIC8vIFNldHMgdGhlIGNsaWNrZWQgZWxlbWVudCB0byB0aGUgY2xvc2UgYnV0dG9uXG4gIC8vIHNvIGVzYyBrZXkgYWx3YXlzIGNsb3NlcyBtb2RhbFxuICBpZiAoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIgJiYgdGFyZ2V0TW9kYWwgIT09IG51bGwpIHtcbiAgICBjbGlja2VkRWxlbWVudCA9IHRhcmdldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoQ0xPU0VfQlVUVE9OKTtcbiAgfVxuXG4gIC8vIFdoZW4gd2UncmUgbm90IGhpdHRpbmcgdGhlIGVzY2FwZSBrZXnigKZcbiAgaWYgKGNsaWNrZWRFbGVtZW50KSB7XG4gICAgLy8gTWFrZSBzdXJlIHdlIGNsaWNrIHRoZSBvcGVuZXJcbiAgICAvLyBJZiBpdCBkb2Vzbid0IGhhdmUgYW4gSUQsIG1ha2Ugb25lXG4gICAgLy8gU3RvcmUgaWQgYXMgZGF0YSBhdHRyaWJ1dGUgb24gbW9kYWxcbiAgICBpZiAoY2xpY2tlZEVsZW1lbnQuaGFzQXR0cmlidXRlKE9QRU5FUl9BVFRSSUJVVEUpKSB7XG4gICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gbnVsbCkge1xuICAgICAgICBvcmlnaW5hbE9wZW5lciA9IGBtb2RhbC0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkgKyAxMDAwMDB9YDtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBvcmlnaW5hbE9wZW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmlnaW5hbE9wZW5lciA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICB9XG4gICAgICB0YXJnZXRNb2RhbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9wZW5lclwiLCBvcmlnaW5hbE9wZW5lcik7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBiYXNpY2FsbHkgc3RvcHMgdGhlIHByb3BhZ2F0aW9uIGlmIHRoZSBlbGVtZW50XG4gICAgLy8gaXMgaW5zaWRlIHRoZSBtb2RhbCBhbmQgbm90IGEgY2xvc2UgYnV0dG9uIG9yXG4gICAgLy8gZWxlbWVudCBpbnNpZGUgYSBjbG9zZSBidXR0b25cbiAgICBpZiAoY2xpY2tlZEVsZW1lbnQuY2xvc2VzdChgLiR7TU9EQUxfQ0xBU1NOQU1FfWApKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNsaWNrZWRFbGVtZW50Lmhhc0F0dHJpYnV0ZShDTE9TRVJfQVRUUklCVVRFKSB8fFxuICAgICAgICBjbGlja2VkRWxlbWVudC5jbG9zZXN0KGBbJHtDTE9TRVJfQVRUUklCVVRFfV1gKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmcuIG1vdmUgb24uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIHRhcmdldE1vZGFsLmNsYXNzTGlzdC50b2dnbGUoSElEREVOX0NMQVNTLCAhc2FmZUFjdGl2ZSk7XG5cbiAgLy8gSWYgdXNlciBpcyBmb3JjZWQgdG8gdGFrZSBhbiBhY3Rpb24sIGFkZGluZ1xuICAvLyBhIGNsYXNzIHRvIHRoZSBib2R5IHRoYXQgcHJldmVudHMgY2xpY2tpbmcgdW5kZXJuZWF0aFxuICAvLyBvdmVybGF5XG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoUFJFVkVOVF9DTElDS19DTEFTUywgc2FmZUFjdGl2ZSk7XG4gIH1cblxuICAvLyBUZW1wb3JhcmlseSBpbmNyZWFzZSBib2R5IHBhZGRpbmcgdG8gaW5jbHVkZSB0aGUgd2lkdGggb2YgdGhlIHNjcm9sbGJhci5cbiAgLy8gVGhpcyBhY2NvdW50cyBmb3IgdGhlIGNvbnRlbnQgc2hpZnQgd2hlbiB0aGUgc2Nyb2xsYmFyIGlzIHJlbW92ZWQgb24gbW9kYWwgb3Blbi5cbiAgaWYgKGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID09PSBURU1QT1JBUllfQk9EWV9QQURESU5HKSB7XG4gICAgYm9keS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInBhZGRpbmctcmlnaHRcIik7XG4gIH0gZWxzZSB7XG4gICAgYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBURU1QT1JBUllfQk9EWV9QQURESU5HO1xuICB9XG5cbiAgLy8gSGFuZGxlIHRoZSBmb2N1cyBhY3Rpb25zXG4gIGlmIChzYWZlQWN0aXZlICYmIG9wZW5Gb2N1c0VsKSB7XG4gICAgLy8gVGhlIG1vZGFsIHdpbmRvdyBpcyBvcGVuZWQuIEZvY3VzIGlzIHNldCB0byBjbG9zZSBidXR0b24uXG5cbiAgICAvLyBCaW5kcyBlc2NhcGUga2V5IGlmIHdlJ3JlIG5vdCBmb3JjaW5nXG4gICAgLy8gdGhlIHVzZXIgdG8gdGFrZSBhbiBhY3Rpb25cbiAgICBpZiAoZm9yY2VVc2VyQWN0aW9uKSB7XG4gICAgICBtb2RhbC5mb2N1c1RyYXAgPSBGb2N1c1RyYXAodGFyZ2V0TW9kYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RhbC5mb2N1c1RyYXAgPSBGb2N1c1RyYXAodGFyZ2V0TW9kYWwsIHtcbiAgICAgICAgRXNjYXBlOiBvbk1lbnVDbG9zZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgZm9jdXMgc2V0dGluZyBhbmQgaW50ZXJhY3Rpb25zXG4gICAgbW9kYWwuZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcbiAgICBvcGVuRm9jdXNFbC5mb2N1cygpO1xuXG4gICAgLy8gSGlkZXMgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCB0aGUgbW9kYWwgZnJvbSBzY3JlZW4gcmVhZGVyc1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX01PREFMUykuZm9yRWFjaCgobm9uTW9kYWwpID0+IHtcbiAgICAgIG5vbk1vZGFsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgICAgIG5vbk1vZGFsLnNldEF0dHJpYnV0ZShOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURSwgXCJcIik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIXNhZmVBY3RpdmUgJiYgbWVudUJ1dHRvbiAmJiByZXR1cm5Gb2N1cykge1xuICAgIC8vIFRoZSBtb2RhbCB3aW5kb3cgaXMgY2xvc2VkLlxuICAgIC8vIE5vbi1tb2RhbHMgbm93IGFjY2VzaWJsZSB0byBzY3JlZW4gcmVhZGVyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTU9EQUxTX0hJRERFTikuZm9yRWFjaCgobm9uTW9kYWwpID0+IHtcbiAgICAgIG5vbk1vZGFsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgICAgbm9uTW9kYWwucmVtb3ZlQXR0cmlidXRlKE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFKTtcbiAgICB9KTtcblxuICAgIC8vIEZvY3VzIGlzIHJldHVybmVkIHRvIHRoZSBvcGVuZXJcbiAgICByZXR1cm5Gb2N1cy5mb2N1cygpO1xuICAgIG1vZGFsLmZvY3VzVHJhcC51cGRhdGUoc2FmZUFjdGl2ZSk7XG4gIH1cblxuICByZXR1cm4gc2FmZUFjdGl2ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcGxhY2Vob2xkZXIgd2l0aCBkYXRhIGF0dHJpYnV0ZXMgZm9yIGNsZWFudXAgZnVuY3Rpb24uXG4gKiBUaGUgY2xlYW51cCBmdW5jdGlvbiB1c2VzIHRoaXMgcGxhY2Vob2xkZXIgdG8gZWFzaWx5IHJlc3RvcmUgdGhlIG9yaWdpbmFsIE1vZGFsIEhUTUwgb24gdGVhcmRvd24uXG4gKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gYmFzZUNvbXBvbmVudCAtIE1vZGFsIEhUTUwgZnJvbSB0aGUgRE9NLlxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBQbGFjZWhvbGRlciB1c2VkIGZvciBjbGVhbnVwIGZ1bmN0aW9uLlxuICovXG5jb25zdCBjcmVhdGVQbGFjZUhvbGRlciA9IChiYXNlQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1vZGFsSUQgPSBiYXNlQ29tcG9uZW50LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICBjb25zdCBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtb2RhbEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGJhc2VDb21wb25lbnQuYXR0cmlidXRlcyk7XG5cbiAgc2V0VGVtcG9yYXJ5Qm9keVBhZGRpbmcoKTtcblxuICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc2V0QXR0cmlidXRlKGBkYXRhLXBsYWNlaG9sZGVyLWZvcmAsIG1vZGFsSUQpO1xuICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuXG4gIG1vZGFsQXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+IHtcbiAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuc2V0QXR0cmlidXRlKFxuICAgICAgYGRhdGEtb3JpZ2luYWwtJHthdHRyaWJ1dGUubmFtZX1gLFxuICAgICAgYXR0cmlidXRlLnZhbHVlLFxuICAgICk7XG4gIH0pO1xuXG4gIHJldHVybiBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXI7XG59O1xuXG4vKipcbiAqIE1vdmVzIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzIGZyb20gTW9kYWwgSFRNTCB0byB3cmFwcGVyIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gYmFzZUNvbXBvbmVudCAtIE1vZGFsIEhUTUwgaW4gdGhlIERPTS5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IG1vZGFsQ29udGVudFdyYXBwZXIgLSBNb2RhbCBjb21wb25lbnQgd3JhcHBlciBlbGVtZW50LlxuICogQHJldHVybnMgTW9kYWwgd3JhcHBlciB3aXRoIGNvcnJlY3QgYXR0cmlidXRlcy5cbiAqL1xuY29uc3Qgc2V0TW9kYWxBdHRyaWJ1dGVzID0gKGJhc2VDb21wb25lbnQsIG1vZGFsQ29udGVudFdyYXBwZXIpID0+IHtcbiAgY29uc3QgbW9kYWxJRCA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IGFyaWFMYWJlbGxlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIik7XG4gIGNvbnN0IGFyaWFEZXNjcmliZWRCeSA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgY29uc3QgZm9yY2VVc2VyQWN0aW9uID0gYmFzZUNvbXBvbmVudC5oYXNBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSk7XG5cbiAgaWYgKCFhcmlhTGFiZWxsZWRCeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bW9kYWxJRH0gaXMgbWlzc2luZyBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlYCk7XG5cbiAgaWYgKCFhcmlhRGVzY3JpYmVkQnkpXG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21vZGFsSUR9IGlzIG1pc3NpbmcgYXJpYS1kZXNyaWJlZGJ5IGF0dHJpYnV0ZWApO1xuXG4gIC8vIFNldCBhdHRyaWJ1dGVzXG4gIG1vZGFsQ29udGVudFdyYXBwZXIuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImRpYWxvZ1wiKTtcbiAgbW9kYWxDb250ZW50V3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBtb2RhbElEKTtcbiAgbW9kYWxDb250ZW50V3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsbGVkYnlcIiwgYXJpYUxhYmVsbGVkQnkpO1xuICBtb2RhbENvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgYXJpYURlc2NyaWJlZEJ5KTtcblxuICBpZiAoZm9yY2VVc2VyQWN0aW9uKSB7XG4gICAgbW9kYWxDb250ZW50V3JhcHBlci5zZXRBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSwgZm9yY2VVc2VyQWN0aW9uKTtcbiAgfVxuXG4gIC8vIEFkZCBhcmlhLWNvbnRyb2xzXG4gIGNvbnN0IG1vZGFsQ2xvc2VycyA9IG1vZGFsQ29udGVudFdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChDTE9TRVJTKTtcbiAgbW9kYWxDbG9zZXJzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBtb2RhbElEKTtcbiAgfSk7XG5cbiAgLy8gVXBkYXRlIHRoZSBiYXNlIGVsZW1lbnQgSFRNTFxuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKTtcbiAgYmFzZUNvbXBvbmVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICBiYXNlQ29tcG9uZW50LnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIik7XG5cbiAgcmV0dXJuIG1vZGFsQ29udGVudFdyYXBwZXI7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoaWRkZW4gbW9kYWwgY29udGVudCB3cmFwcGVyLlxuICogUmVidWlsZHMgdGhlIG9yaWdpbmFsIE1vZGFsIEhUTUwgaW4gdGhlIG5ldyB3cmFwcGVyIGFuZCBhZGRzIGEgcGFnZSBvdmVybGF5LlxuICogVGhlbiBtb3ZlcyBvcmlnaW5hbCBNb2RhbCBIVE1MIGF0dHJpYnV0ZXMgdG8gdGhlIG5ldyB3cmFwcGVyLlxuICpcbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGJhc2VDb21wb25lbnQgLSBPcmlnaW5hbCBNb2RhbCBIVE1MIGluIHRoZSBET00uXG4gKiBAcmV0dXJucyBNb2RhbCBjb21wb25lbnQgLSBNb2RhbCB3cmFwcGVyIHcvIG5lc3RlZCBPdmVybGF5IGFuZCBNb2RhbCBDb250ZW50LlxuICovXG5jb25zdCByZWJ1aWxkTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbENvbnRlbnRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgb3ZlcmxheURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgLy8gQWRkIGNsYXNzZXNcbiAgbW9kYWxDb250ZW50V3JhcHBlci5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTUywgV1JBUFBFUl9DTEFTU05BTUUpO1xuICBvdmVybGF5RGl2LmNsYXNzTGlzdC5hZGQoT1ZFUkxBWV9DTEFTU05BTUUpO1xuXG4gIC8vIFJlYnVpbGQgdGhlIG1vZGFsIGVsZW1lbnRcbiAgbW9kYWxDb250ZW50V3JhcHBlci5hcHBlbmQob3ZlcmxheURpdik7XG4gIG92ZXJsYXlEaXYuYXBwZW5kKG1vZGFsQ29udGVudCk7XG5cbiAgLy8gQWRkIGF0dHJpYnV0ZXNcbiAgc2V0TW9kYWxBdHRyaWJ1dGVzKG1vZGFsQ29udGVudCwgbW9kYWxDb250ZW50V3JhcHBlcik7XG5cbiAgcmV0dXJuIG1vZGFsQ29udGVudFdyYXBwZXI7XG59O1xuXG4vKipcbiAqICBCdWlsZHMgbW9kYWwgd2luZG93IGZyb20gYmFzZSBIVE1MIGFuZCBhcHBlbmRzIHRvIHRoZSBlbmQgb2YgdGhlIERPTS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBiYXNlQ29tcG9uZW50IC0gVGhlIG1vZGFsIGRpdiBlbGVtZW50IGluIHRoZSBET00uXG4gKi9cbmNvbnN0IHNldFVwTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbElEID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcblxuICBpZiAoIW1vZGFsSUQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1vZGFsIG1hcmt1cCBpcyBtaXNzaW5nIElEYCk7XG4gIH1cblxuICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgd2hlcmUgbW9kYWwgaXMgZm9yIGNsZWFudXBcbiAgY29uc3Qgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyID0gY3JlYXRlUGxhY2VIb2xkZXIoYmFzZUNvbXBvbmVudCk7XG4gIGJhc2VDb21wb25lbnQuYWZ0ZXIob3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyKTtcblxuICAvLyBCdWlsZCBtb2RhbCBjb21wb25lbnRcbiAgY29uc3QgbW9kYWxDb21wb25lbnQgPSByZWJ1aWxkTW9kYWwoYmFzZUNvbXBvbmVudCk7XG5cbiAgLy8gTW92ZSBhbGwgbW9kYWxzIHRvIHRoZSBlbmQgb2YgdGhlIERPTS4gRG9pbmcgdGhpcyBhbGxvd3MgdXMgdG9cbiAgLy8gbW9yZSBlYXNpbHkgZmluZCB0aGUgZWxlbWVudHMgdG8gaGlkZSBmcm9tIHNjcmVlbiByZWFkZXJzXG4gIC8vIHdoZW4gdGhlIG1vZGFsIGlzIG9wZW4uXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxDb21wb25lbnQpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgTW9kYWwgYW5kIFdyYXBwZXIgZWxlbWVudHMgYW5kIHJlc3RvcmVzIG9yaWdpbmFsIE1vZGFsIEhUTUwuXG4gKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gYmFzZUNvbXBvbmVudCAtIFRoZSBtb2RhbCBkaXYgZWxlbWVudCBpbiB0aGUgRE9NLlxuICovXG5jb25zdCBjbGVhblVwTW9kYWwgPSAoYmFzZUNvbXBvbmVudCkgPT4ge1xuICBjb25zdCBtb2RhbENvbnRlbnQgPSBiYXNlQ29tcG9uZW50O1xuICBjb25zdCBtb2RhbENvbnRlbnRXcmFwcGVyID0gbW9kYWxDb250ZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgY29uc3QgbW9kYWxJRCA9IG1vZGFsQ29udGVudFdyYXBwZXIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG5cbiAgLy8gaWYgdGhlcmUgaXMgbm8gbW9kYWxJRCwgcmV0dXJuIGVhcmx5XG4gIGlmICghbW9kYWxJRCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXBsYWNlaG9sZGVyLWZvcj1cIiR7bW9kYWxJRH1cIl1gLFxuICApO1xuXG4gIGlmIChvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIpIHtcbiAgICBjb25zdCBtb2RhbEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5hdHRyaWJ1dGVzKTtcbiAgICBtb2RhbEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuc3RhcnRzV2l0aChcImRhdGEtb3JpZ2luYWwtXCIpKSB7XG4gICAgICAgIC8vIGRhdGEtb3JpZ2luYWwtIGlzIDE0IGxvbmdcbiAgICAgICAgbW9kYWxDb250ZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZS5zdWJzdHIoMTQpLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLmFmdGVyKG1vZGFsQ29udGVudCk7XG4gICAgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoXG4gICAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIsXG4gICAgKTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudFdyYXBwZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChtb2RhbENvbnRlbnRXcmFwcGVyKTtcbn07XG5cbm1vZGFsID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoTU9EQUwsIHJvb3QpLmZvckVhY2goKG1vZGFsV2luZG93KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGFsSWQgPSBtb2RhbFdpbmRvdy5pZDtcblxuICAgICAgICBzZXRVcE1vZGFsKG1vZGFsV2luZG93KTtcblxuICAgICAgICAvLyBRdWVyeSBhbGwgb3BlbmVycyBhbmQgY2xvc2VycyBpbmNsdWRpbmcgdGhlIG92ZXJsYXlcbiAgICAgICAgc2VsZWN0T3JNYXRjaGVzKGBbYXJpYS1jb250cm9scz1cIiR7bW9kYWxJZH1cIl1gLCBkb2N1bWVudCkuZm9yRWFjaChcbiAgICAgICAgICAobW9kYWxUcmlnZ2VyKSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBtb2RhbFRyaWdnZXIgaXMgYW4gYW5jaG9yLi4uXG4gICAgICAgICAgICBpZiAobW9kYWxUcmlnZ2VyLm5vZGVOYW1lID09PSBcIkFcIikge1xuICAgICAgICAgICAgICAvLyBUdXJuIGFuY2hvciBsaW5rcyBpbnRvIGJ1dHRvbnMgZm9yIHNjcmVlbiByZWFkZXJzXG4gICAgICAgICAgICAgIG1vZGFsVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xuXG4gICAgICAgICAgICAgIC8vIFByZXZlbnQgbW9kYWwgdHJpZ2dlcnMgZnJvbSBhY3RpbmcgbGlrZSBsaW5rc1xuICAgICAgICAgICAgICBtb2RhbFRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYW4gdW5jb21tZW50IHdoZW4gYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9hMTF5c3VwcG9ydC5pby90ZWNoL2FyaWEvYXJpYS1oYXNwb3B1cF9hdHRyaWJ1dGVcbiAgICAgICAgICAgIC8vIE1vc3Qgc2NyZWVuIHJlYWRlcnMgc3VwcG9ydCBhcmlhLWhhc3BvcHVwLCBidXQgbWlnaHQgYW5ub3VuY2VcbiAgICAgICAgICAgIC8vIGFzIG9wZW5pbmcgYSBtZW51IGlmIFwiZGlhbG9nXCIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgICAgIC8vIG1vZGFsVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhhc3BvcHVwXCIsIFwiZGlhbG9nXCIpO1xuXG4gICAgICAgICAgICBtb2RhbFRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKTtcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0ZWFyZG93bihyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoTU9EQUwsIHJvb3QpLmZvckVhY2goKG1vZGFsV2luZG93KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGFsSWQgPSBtb2RhbFdpbmRvdy5pZDtcbiAgICAgICAgY2xlYW5VcE1vZGFsKG1vZGFsV2luZG93KTtcblxuICAgICAgICBzZWxlY3RPck1hdGNoZXMoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWAsIGRvY3VtZW50KS5mb3JFYWNoKFxuICAgICAgICAgIChtb2RhbFRyaWdnZXIpID0+XG4gICAgICAgICAgICBtb2RhbFRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZGFsKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9jdXNUcmFwOiBudWxsLFxuICAgIHRvZ2dsZU1vZGFsLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbDtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuXG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBSQU5HRV9DTEFTU05BTUUgPSBgJHtQUkVGSVh9LXJhbmdlYDtcbmNvbnN0IFJBTkdFID0gYC4ke1JBTkdFX0NMQVNTTkFNRX1gO1xuXG4vKipcbiAqIFVwZGF0ZSByYW5nZSBjYWxsb3V0IGZvciBzY3JlZW4gcmVhZGVycyB1c2luZyB0aGUgb3B0aW9uYWwgZGF0YSBhdHRyaWJ1dGVzLlxuICpcbiAqIEdldCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXMsIGNvbnN0cnVjdCBhbmQgYXBwZW5kcyBhcmlhLXZhbHVldGV4dCBhdHRyaWJ1dGUuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiA8aW5wdXQgaWQ9XCJ1c2EtcmFuZ2VcIiBjbGFzcz1cInVzYS1yYW5nZVwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiBzdGVwPVwiMTBcIiB2YWx1ZT1cIjIwXCIgZGF0YS10ZXh0LXVuaXQ9XCJkZWdyZWVzXCI+XG4gKlxuICogQ2FsbG91dCByZXR1cm5zIFwiMjAgZGVncmVlcyBvZiAxMDAuXCJcbiAqXG4gKiA8aW5wdXQgaWQ9XCJ1c2EtcmFuZ2VcIiBjbGFzcz1cInVzYS1yYW5nZVwiIHR5cGU9XCJyYW5nZVwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiBzdGVwPVwiMTBcIiB2YWx1ZT1cIjIwXCIgZGF0YS10ZXh0LXByZXBvc2l0aW9uPVwiZGVcIj5cbiAqXG4gKiBDYWxsb3V0IHJldHVybnMgXCIyMCBkZSAxMDAuXCJcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IHRhcmdldFJhbmdlIC0gVGhlIHJhbmdlIHNsaWRlciBpbnB1dCBlbGVtZW50XG4gKi9cbmNvbnN0IHVwZGF0ZUNhbGxvdXQgPSAodGFyZ2V0UmFuZ2UpID0+IHtcbiAgY29uc3QgcmFuZ2VTbGlkZXIgPSB0YXJnZXRSYW5nZTtcbiAgY29uc3QgZGVmYXVsdFByZXAgPSBcIm9mXCI7XG4gIGNvbnN0IG9wdGlvbmFsUHJlcCA9IHJhbmdlU2xpZGVyLmRhdGFzZXQudGV4dFByZXBvc2l0aW9uO1xuICBjb25zdCBwcmVwID0gb3B0aW9uYWxQcmVwIHx8IGRlZmF1bHRQcmVwO1xuICBjb25zdCB1bml0ID0gcmFuZ2VTbGlkZXIuZGF0YXNldC50ZXh0VW5pdDtcbiAgY29uc3QgdmFsID0gcmFuZ2VTbGlkZXIudmFsdWU7XG4gIC8vIE5vdGU6IDEwMCBpcyB0aGUgbWF4IGF0dHJpYnV0ZSdzIG5hdGl2ZSBkZWZhdWx0IHZhbHVlIG9uIHJhbmdlIGlucHV0c1xuICAvLyBSZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9pbnB1dC9yYW5nZSN2YWxpZGF0aW9uXG4gIGNvbnN0IG1heCA9IHJhbmdlU2xpZGVyLmdldEF0dHJpYnV0ZShcIm1heFwiKSB8fCAxMDA7XG5cbiAgbGV0IGNhbGxvdXQ7XG5cbiAgaWYgKHVuaXQpIHtcbiAgICBjYWxsb3V0ID0gYCR7dmFsfSAke3VuaXR9ICR7cHJlcH0gJHttYXh9YDtcbiAgfSBlbHNlIHtcbiAgICBjYWxsb3V0ID0gYCR7dmFsfSAke3ByZXB9ICR7bWF4fWA7XG4gIH1cblxuICByYW5nZVNsaWRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLXZhbHVldGV4dFwiLCBjYWxsb3V0KTtcbn07XG5cbmNvbnN0IHJhbmdlRXZlbnRzID0ge1xuICBjaGFuZ2U6IHtcbiAgICBbUkFOR0VdKCkge1xuICAgICAgdXBkYXRlQ2FsbG91dCh0aGlzKTtcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgcmFuZ2UgPSBiZWhhdmlvcihyYW5nZUV2ZW50cywge1xuICBpbml0KHJvb3QpIHtcbiAgICBzZWxlY3RPck1hdGNoZXMoUkFOR0UsIHJvb3QpLmZvckVhY2goKHJhbmdlU2xpZGVyKSA9PiB7XG4gICAgICB1cGRhdGVDYWxsb3V0KHJhbmdlU2xpZGVyKTtcbiAgICB9KTtcbiAgfSxcbiAgdXBkYXRlQ2FsbG91dCxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJhbmdlO1xuIiwiY29uc3QgaWdub3JlID0gcmVxdWlyZShcInJlY2VwdG9yL2lnbm9yZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcblxuY29uc3QgQlVUVE9OID0gXCIuanMtc2VhcmNoLWJ1dHRvblwiO1xuY29uc3QgRk9STSA9IFwiLmpzLXNlYXJjaC1mb3JtXCI7XG5jb25zdCBJTlBVVCA9IFwiW3R5cGU9c2VhcmNoXVwiO1xuY29uc3QgQ09OVEVYVCA9IFwiaGVhZGVyXCI7IC8vIFhYWFxuXG5sZXQgbGFzdEJ1dHRvbjtcblxuY29uc3QgZ2V0Rm9ybSA9IChidXR0b24pID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGJ1dHRvbi5jbG9zZXN0KENPTlRFWFQpO1xuICByZXR1cm4gY29udGV4dCA/IGNvbnRleHQucXVlcnlTZWxlY3RvcihGT1JNKSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRk9STSk7XG59O1xuXG5jb25zdCB0b2dnbGVTZWFyY2ggPSAoYnV0dG9uLCBhY3RpdmUpID0+IHtcbiAgY29uc3QgZm9ybSA9IGdldEZvcm0oYnV0dG9uKTtcblxuICBpZiAoIWZvcm0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vICR7Rk9STX0gZm91bmQgZm9yIHNlYXJjaCB0b2dnbGUgaW4gJHtDT05URVhUfSFgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gIGJ1dHRvbi5oaWRkZW4gPSBhY3RpdmU7XG4gIGZvcm0uaGlkZGVuID0gIWFjdGl2ZTtcbiAgLyogZXNsaW50LWVuYWJsZSAqL1xuXG4gIGlmICghYWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoSU5QVVQpO1xuXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gIH1cbiAgLy8gd2hlbiB0aGUgdXNlciBjbGlja3MgX291dHNpZGVfIG9mIHRoZSBmb3JtIHcvaWdub3JlKCk6IGhpZGUgdGhlXG4gIC8vIHNlYXJjaCwgdGhlbiByZW1vdmUgdGhlIGxpc3RlbmVyXG4gIGNvbnN0IGxpc3RlbmVyID0gaWdub3JlKGZvcm0sICgpID0+IHtcbiAgICBpZiAobGFzdEJ1dHRvbikge1xuICAgICAgaGlkZVNlYXJjaC5jYWxsKGxhc3RCdXR0b24pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0pO1xuXG4gIC8vIE5vcm1hbGx5IHdlIHdvdWxkIGp1c3QgcnVuIHRoaXMgY29kZSB3aXRob3V0IGEgdGltZW91dCwgYnV0XG4gIC8vIElFMTEgYW5kIEVkZ2Ugd2lsbCBhY3R1YWxseSBjYWxsIHRoZSBsaXN0ZW5lciAqaW1tZWRpYXRlbHkqIGJlY2F1c2VcbiAgLy8gdGhleSBhcmUgY3VycmVudGx5IGhhbmRsaW5nIHRoaXMgZXhhY3QgdHlwZSBvZiBldmVudCwgc28gd2UnbGxcbiAgLy8gbWFrZSBzdXJlIHRoZSBicm93c2VyIGlzIGRvbmUgaGFuZGxpbmcgdGhlIGN1cnJlbnQgY2xpY2sgZXZlbnQsXG4gIC8vIGlmIGFueSwgYmVmb3JlIHdlIGF0dGFjaCB0aGUgbGlzdGVuZXIuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgbGlzdGVuZXIpO1xuICB9LCAwKTtcbn07XG5cbmZ1bmN0aW9uIHNob3dTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCB0cnVlKTtcbiAgbGFzdEJ1dHRvbiA9IHRoaXM7XG59XG5cbmZ1bmN0aW9uIGhpZGVTZWFyY2goKSB7XG4gIHRvZ2dsZVNlYXJjaCh0aGlzLCBmYWxzZSk7XG4gIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHNlYXJjaCA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW0JVVFRPTl06IHNob3dTZWFyY2gsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQodGFyZ2V0KSB7XG4gICAgICBzZWxlY3QoQlVUVE9OLCB0YXJnZXQpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICB0b2dnbGVTZWFyY2goYnV0dG9uLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKCkge1xuICAgICAgLy8gZm9yZ2V0IHRoZSBsYXN0IGJ1dHRvbiBjbGlja2VkXG4gICAgICBsYXN0QnV0dG9uID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlYXJjaDtcbiIsImNvbnN0IG9uY2UgPSByZXF1aXJlKFwicmVjZXB0b3Ivb25jZVwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1za2lwbmF2W2hyZWZePVwiI1wiXSwgLiR7UFJFRklYfS1mb290ZXJfX3JldHVybi10by10b3AgW2hyZWZePVwiI1wiXWA7XG5jb25zdCBNQUlOQ09OVEVOVCA9IFwibWFpbi1jb250ZW50XCI7XG5cbmZ1bmN0aW9uIHNldFRhYmluZGV4KCkge1xuICAvLyBOQjogd2Uga25vdyBiZWNhdXNlIG9mIHRoZSBzZWxlY3RvciB3ZSdyZSBkZWxlZ2F0aW5nIHRvIGJlbG93IHRoYXQgdGhlXG4gIC8vIGhyZWYgYWxyZWFkeSBiZWdpbnMgd2l0aCAnIydcbiAgY29uc3QgaWQgPSBlbmNvZGVVUkkodGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKTtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgaWQgPT09IFwiI1wiID8gTUFJTkNPTlRFTlQgOiBpZC5zbGljZSgxKSxcbiAgKTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnN0eWxlLm91dGxpbmUgPSBcIjBcIjtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgMCk7XG4gICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImJsdXJcIixcbiAgICAgIG9uY2UoKCkgPT4ge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgLTEpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB0aHJvdyBhbiBlcnJvcj9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlaGF2aW9yKHtcbiAgW0NMSUNLXToge1xuICAgIFtMSU5LXTogc2V0VGFiaW5kZXgsXG4gIH0sXG59KTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcblxuY29uc3QgVEFCTEUgPSBgLiR7UFJFRklYfS10YWJsZWA7XG5jb25zdCBTT1JURUQgPSBcImFyaWEtc29ydFwiO1xuY29uc3QgQVNDRU5ESU5HID0gXCJhc2NlbmRpbmdcIjtcbmNvbnN0IERFU0NFTkRJTkcgPSBcImRlc2NlbmRpbmdcIjtcbmNvbnN0IFNPUlRfT1ZFUlJJREUgPSBcImRhdGEtc29ydC12YWx1ZVwiO1xuY29uc3QgU09SVF9CVVRUT05fQ0xBU1MgPSBgJHtQUkVGSVh9LXRhYmxlX19oZWFkZXJfX2J1dHRvbmA7XG5jb25zdCBTT1JUX0JVVFRPTiA9IGAuJHtTT1JUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgU09SVEFCTEVfSEVBREVSID0gYHRoW2RhdGEtc29ydGFibGVdYDtcbmNvbnN0IEFOTk9VTkNFTUVOVF9SRUdJT04gPSBgLiR7UFJFRklYfS10YWJsZV9fYW5ub3VuY2VtZW50LXJlZ2lvblthcmlhLWxpdmU9XCJwb2xpdGVcIl1gO1xuXG4vKiogR2V0cyB0aGUgZGF0YS1zb3J0LXZhbHVlIGF0dHJpYnV0ZSB2YWx1ZSwgaWYgcHJvdmlkZWQg4oCUIG90aGVyd2lzZSwgZ2V0c1xuICogdGhlIGlubmVyVGV4dCBvciB0ZXh0Q29udGVudCDigJQgb2YgdGhlIGNoaWxkIGVsZW1lbnQgKEhUTUxUYWJsZUNlbGxFbGVtZW50KVxuICogYXQgdGhlIHNwZWNpZmllZCBpbmRleCBvZiB0aGUgZ2l2ZW4gdGFibGUgcm93XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge2FycmF5PEhUTUxUYWJsZVJvd0VsZW1lbnQ+fSB0clxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZ2V0Q2VsbFZhbHVlID0gKHRyLCBpbmRleCkgPT5cbiAgdHIuY2hpbGRyZW5baW5kZXhdLmdldEF0dHJpYnV0ZShTT1JUX09WRVJSSURFKSB8fFxuICB0ci5jaGlsZHJlbltpbmRleF0uaW5uZXJUZXh0IHx8XG4gIHRyLmNoaWxkcmVuW2luZGV4XS50ZXh0Q29udGVudDtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgdmFsdWVzIG9mIHR3byByb3cgYXJyYXkgaXRlbXMgYXQgdGhlIGdpdmVuIGluZGV4LCB0aGVuIHNvcnRzIGJ5IHRoZSBnaXZlbiBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvblxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgY29tcGFyZUZ1bmN0aW9uID0gKGluZGV4LCBpc0FzY2VuZGluZykgPT4gKHRoaXNSb3csIG5leHRSb3cpID0+IHtcbiAgLy8gZ2V0IHZhbHVlcyB0byBjb21wYXJlIGZyb20gZGF0YSBhdHRyaWJ1dGUgb3IgY2VsbCBjb250ZW50XG4gIGNvbnN0IHZhbHVlMSA9IGdldENlbGxWYWx1ZShpc0FzY2VuZGluZyA/IHRoaXNSb3cgOiBuZXh0Um93LCBpbmRleCk7XG4gIGNvbnN0IHZhbHVlMiA9IGdldENlbGxWYWx1ZShpc0FzY2VuZGluZyA/IG5leHRSb3cgOiB0aGlzUm93LCBpbmRleCk7XG5cbiAgLy8gaWYgbmVpdGhlciB2YWx1ZSBpcyBlbXB0eSwgYW5kIGlmIGJvdGggdmFsdWVzIGFyZSBhbHJlYWR5IG51bWJlcnMsIGNvbXBhcmUgbnVtZXJpY2FsbHlcbiAgaWYgKFxuICAgIHZhbHVlMSAmJlxuICAgIHZhbHVlMiAmJlxuICAgICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbHVlMSkpICYmXG4gICAgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUyKSlcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlMSAtIHZhbHVlMjtcbiAgfVxuICAvLyBPdGhlcndpc2UsIGNvbXBhcmUgYWxwaGFiZXRpY2FsbHkgYmFzZWQgb24gY3VycmVudCB1c2VyIGxvY2FsZVxuICByZXR1cm4gdmFsdWUxLnRvU3RyaW5nKCkubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIG5hdmlnYXRvci5sYW5ndWFnZSwge1xuICAgIG51bWVyaWM6IHRydWUsXG4gICAgaWdub3JlUHVuY3R1YXRpb246IHRydWUsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZXQgYW4gQXJyYXkgb2YgY29sdW1uIGhlYWRlcnMgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogdGFibGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGVcbiAqIEByZXR1cm4ge2FycmF5PEhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50Pn1cbiAqL1xuY29uc3QgZ2V0Q29sdW1uSGVhZGVycyA9ICh0YWJsZSkgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gc2VsZWN0KFNPUlRBQkxFX0hFQURFUiwgdGFibGUpO1xuICByZXR1cm4gaGVhZGVycy5maWx0ZXIoKGhlYWRlcikgPT4gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpID09PSB0YWJsZSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgYnV0dG9uIGxhYmVsIHdpdGhpbiB0aGUgZ2l2ZW4gaGVhZGVyIGVsZW1lbnQsIHJlc2V0dGluZyBpdFxuICogdG8gdGhlIGRlZmF1bHQgc3RhdGUgKHJlYWR5IHRvIHNvcnQgYXNjZW5kaW5nKSBpZiBpdCdzIG5vIGxvbmdlciBzb3J0ZWRcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5jb25zdCB1cGRhdGVTb3J0TGFiZWwgPSAoaGVhZGVyKSA9PiB7XG4gIGNvbnN0IGhlYWRlck5hbWUgPSBoZWFkZXIuaW5uZXJUZXh0O1xuICBjb25zdCBzb3J0ZWRBc2NlbmRpbmcgPSBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgY29uc3QgaXNTb3J0ZWQgPVxuICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HIHx8XG4gICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBERVNDRU5ESU5HIHx8XG4gICAgZmFsc2U7XG4gIGNvbnN0IGhlYWRlckxhYmVsID0gYCR7aGVhZGVyTmFtZX0sIHNvcnRhYmxlIGNvbHVtbiwgY3VycmVudGx5ICR7XG4gICAgaXNTb3J0ZWRcbiAgICAgID8gYCR7c29ydGVkQXNjZW5kaW5nID8gYHNvcnRlZCAke0FTQ0VORElOR31gIDogYHNvcnRlZCAke0RFU0NFTkRJTkd9YH1gXG4gICAgICA6IFwidW5zb3J0ZWRcIlxuICB9YDtcbiAgY29uc3QgaGVhZGVyQnV0dG9uTGFiZWwgPSBgQ2xpY2sgdG8gc29ydCBieSAke2hlYWRlck5hbWV9IGluICR7XG4gICAgc29ydGVkQXNjZW5kaW5nID8gREVTQ0VORElORyA6IEFTQ0VORElOR1xuICB9IG9yZGVyLmA7XG4gIGhlYWRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGhlYWRlckxhYmVsKTtcbiAgaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoU09SVF9CVVRUT04pLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGhlYWRlckJ1dHRvbkxhYmVsKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBhcmlhLXNvcnQgYXR0cmlidXRlIG9uIHRoZSBnaXZlbiBoZWFkZXIgZWxlbWVudCwgYW5kIHJlc2V0IHRoZSBsYWJlbCBhbmQgYnV0dG9uIGljb25cbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5jb25zdCB1bnNldFNvcnQgPSAoaGVhZGVyKSA9PiB7XG4gIGhlYWRlci5yZW1vdmVBdHRyaWJ1dGUoU09SVEVEKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG59O1xuXG4vKipcbiAqIFNvcnQgcm93cyBlaXRoZXIgYXNjZW5kaW5nIG9yIGRlc2NlbmRpbmcsIGJhc2VkIG9uIGEgZ2l2ZW4gaGVhZGVyJ3MgYXJpYS1zb3J0IGF0dHJpYnV0ZVxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXNjZW5kaW5nXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlXG4gKi9cbmNvbnN0IHNvcnRSb3dzID0gKGhlYWRlciwgaXNBc2NlbmRpbmcpID0+IHtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShTT1JURUQsIGlzQXNjZW5kaW5nID09PSB0cnVlID8gREVTQ0VORElORyA6IEFTQ0VORElORyk7XG4gIHVwZGF0ZVNvcnRMYWJlbChoZWFkZXIpO1xuXG4gIGNvbnN0IHRib2R5ID0gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpLnF1ZXJ5U2VsZWN0b3IoXCJ0Ym9keVwiKTtcblxuICAvLyBXZSBjYW4gdXNlIEFycmF5LmZyb20oKSBhbmQgQXJyYXkuc29ydCgpIGluc3RlYWQgb25jZSB3ZSBkcm9wIElFMTEgc3VwcG9ydCwgbGlrZWx5IGluIHRoZSBzdW1tZXIgb2YgMjAyMVxuICAvL1xuICAvLyBBcnJheS5mcm9tKHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJykuc29ydChcbiAgLy8gICBjb21wYXJlRnVuY3Rpb24oXG4gIC8vICAgICBBcnJheS5mcm9tKGhlYWRlci5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGhlYWRlciksXG4gIC8vICAgICAhaXNBc2NlbmRpbmcpXG4gIC8vICAgKVxuICAvLyAuZm9yRWFjaCh0ciA9PiB0Ym9keS5hcHBlbmRDaGlsZCh0cikgKTtcblxuICAvLyBbXS5zbGljZS5jYWxsKCkgdHVybnMgYXJyYXktbGlrZSBzZXRzIGludG8gdHJ1ZSBhcnJheXMgc28gdGhhdCB3ZSBjYW4gc29ydCB0aGVtXG4gIGNvbnN0IGFsbFJvd3MgPSBbXS5zbGljZS5jYWxsKHRib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0clwiKSk7XG4gIGNvbnN0IGFsbEhlYWRlcnMgPSBbXS5zbGljZS5jYWxsKGhlYWRlci5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgY29uc3QgdGhpc0hlYWRlckluZGV4ID0gYWxsSGVhZGVycy5pbmRleE9mKGhlYWRlcik7XG4gIGFsbFJvd3Muc29ydChjb21wYXJlRnVuY3Rpb24odGhpc0hlYWRlckluZGV4LCAhaXNBc2NlbmRpbmcpKS5mb3JFYWNoKCh0cikgPT4ge1xuICAgIFtdLnNsaWNlXG4gICAgICAuY2FsbCh0ci5jaGlsZHJlbilcbiAgICAgIC5mb3JFYWNoKCh0ZCkgPT4gdGQucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zb3J0LWFjdGl2ZVwiKSk7XG4gICAgdHIuY2hpbGRyZW5bdGhpc0hlYWRlckluZGV4XS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYWN0aXZlXCIsIHRydWUpO1xuICAgIHRib2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgbGl2ZSByZWdpb24gaW1tZWRpYXRlbHkgZm9sbG93aW5nIHRoZSB0YWJsZSB3aGVuZXZlciBzb3J0IGNoYW5nZXMuXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUVsZW1lbnR9IHRhYmxlXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBzb3J0ZWRIZWFkZXJcbiAqL1xuXG5jb25zdCB1cGRhdGVMaXZlUmVnaW9uID0gKHRhYmxlLCBzb3J0ZWRIZWFkZXIpID0+IHtcbiAgY29uc3QgY2FwdGlvbiA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoXCJjYXB0aW9uXCIpLmlubmVyVGV4dDtcbiAgY29uc3Qgc29ydGVkQXNjZW5kaW5nID0gc29ydGVkSGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkc7XG4gIGNvbnN0IGhlYWRlckxhYmVsID0gc29ydGVkSGVhZGVyLmlubmVyVGV4dDtcbiAgY29uc3QgbGl2ZVJlZ2lvbiA9IHRhYmxlLm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGxpdmVSZWdpb24gJiYgbGl2ZVJlZ2lvbi5tYXRjaGVzKEFOTk9VTkNFTUVOVF9SRUdJT04pKSB7XG4gICAgY29uc3Qgc29ydEFubm91bmNlbWVudCA9IGBUaGUgdGFibGUgbmFtZWQgXCIke2NhcHRpb259XCIgaXMgbm93IHNvcnRlZCBieSAke2hlYWRlckxhYmVsfSBpbiAke1xuICAgICAgc29ydGVkQXNjZW5kaW5nID8gQVNDRU5ESU5HIDogREVTQ0VORElOR1xuICAgIH0gb3JkZXIuYDtcbiAgICBsaXZlUmVnaW9uLmlubmVyVGV4dCA9IHNvcnRBbm5vdW5jZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFRhYmxlIGNvbnRhaW5pbmcgYSBzb3J0YWJsZSBjb2x1bW4gaGVhZGVyIGlzIG5vdCBmb2xsb3dlZCBieSBhbiBhcmlhLWxpdmUgcmVnaW9uLmAsXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBUb2dnbGUgYSBoZWFkZXIncyBzb3J0IHN0YXRlLCBvcHRpb25hbGx5IHByb3ZpZGluZyBhIHRhcmdldFxuICogc3RhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBpc0FzY2VuZGluZyBJZiBubyBzdGF0ZSBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnRcbiAqIHN0YXRlIHdpbGwgYmUgdG9nZ2xlZCAoZnJvbSBmYWxzZSB0byB0cnVlLCBhbmQgdmljZS12ZXJzYSkuXG4gKi9cbmNvbnN0IHRvZ2dsZVNvcnQgPSAoaGVhZGVyLCBpc0FzY2VuZGluZykgPT4ge1xuICBjb25zdCB0YWJsZSA9IGhlYWRlci5jbG9zZXN0KFRBQkxFKTtcbiAgbGV0IHNhZmVBc2NlbmRpbmcgPSBpc0FzY2VuZGluZztcbiAgaWYgKHR5cGVvZiBzYWZlQXNjZW5kaW5nICE9PSBcImJvb2xlYW5cIikge1xuICAgIHNhZmVBc2NlbmRpbmcgPSBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgfVxuXG4gIGlmICghdGFibGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7U09SVEFCTEVfSEVBREVSfSBpcyBtaXNzaW5nIG91dGVyICR7VEFCTEV9YCk7XG4gIH1cblxuICBzYWZlQXNjZW5kaW5nID0gc29ydFJvd3MoaGVhZGVyLCBpc0FzY2VuZGluZyk7XG5cbiAgaWYgKHNhZmVBc2NlbmRpbmcpIHtcbiAgICBnZXRDb2x1bW5IZWFkZXJzKHRhYmxlKS5mb3JFYWNoKChvdGhlckhlYWRlcikgPT4ge1xuICAgICAgaWYgKG90aGVySGVhZGVyICE9PSBoZWFkZXIpIHtcbiAgICAgICAgdW5zZXRTb3J0KG90aGVySGVhZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1cGRhdGVMaXZlUmVnaW9uKHRhYmxlLCBoZWFkZXIpO1xuICB9XG59O1xuXG4vKipcbiAqKiBJbnNlcnRzIGEgYnV0dG9uIHdpdGggaWNvbiBpbnNpZGUgYSBzb3J0YWJsZSBoZWFkZXJcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IGhlYWRlclxuICovXG5cbmNvbnN0IGNyZWF0ZUhlYWRlckJ1dHRvbiA9IChoZWFkZXIpID0+IHtcbiAgY29uc3QgYnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidXR0b25FbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIGJ1dHRvbkVsLmNsYXNzTGlzdC5hZGQoU09SVF9CVVRUT05fQ0xBU1MpO1xuICAvLyBJQ09OX1NPVVJDRVxuICBidXR0b25FbC5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBcbiAgPHN2ZyBjbGFzcz1cIiR7UFJFRklYfS1pY29uXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICA8ZyBjbGFzcz1cImRlc2NlbmRpbmdcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTcgMTdMMTUuNTkgMTUuNTlMMTIuOTk5OSAxOC4xN1YySDEwLjk5OTlWMTguMTdMOC40MSAxNS41OEw3IDE3TDExLjk5OTkgMjJMMTcgMTdaXCIgLz5cbiAgICA8L2c+XG4gICAgPGcgY2xhc3M9XCJhc2NlbmRpbmdcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwYXRoIHRyYW5zZm9ybT1cInJvdGF0ZSgxODAsIDEyLCAxMilcIiBkPVwiTTE3IDE3TDE1LjU5IDE1LjU5TDEyLjk5OTkgMTguMTdWMkgxMC45OTk5VjE4LjE3TDguNDEgMTUuNThMNyAxN0wxMS45OTk5IDIyTDE3IDE3WlwiIC8+XG4gICAgPC9nPlxuICAgIDxnIGNsYXNzPVwidW5zb3J0ZWRcIiBmaWxsPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjE1LjE3IDE1IDEzIDE3LjE3IDEzIDYuODMgMTUuMTcgOSAxNi41OCA3LjU5IDEyIDMgNy40MSA3LjU5IDguODMgOSAxMSA2LjgzIDExIDE3LjE3IDguODMgMTUgNy40MiAxNi40MSAxMiAyMSAxNi41OSAxNi40MSAxNS4xNyAxNVwiLz5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuICBgO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoYnV0dG9uRWwpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcbn07XG5cbmNvbnN0IHRhYmxlID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbU09SVF9CVVRUT05dKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRvZ2dsZVNvcnQoXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoU09SVEFCTEVfSEVBREVSKSxcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xvc2VzdChTT1JUQUJMRV9IRUFERVIpLmdldEF0dHJpYnV0ZShTT1JURUQpID09PVxuICAgICAgICAgICAgQVNDRU5ESU5HLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCBzb3J0YWJsZUhlYWRlcnMgPSBzZWxlY3QoU09SVEFCTEVfSEVBREVSLCByb290KTtcbiAgICAgIHNvcnRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IGNyZWF0ZUhlYWRlckJ1dHRvbihoZWFkZXIpKTtcblxuICAgICAgY29uc3QgZmlyc3RTb3J0ZWQgPSBzb3J0YWJsZUhlYWRlcnMuZmlsdGVyKFxuICAgICAgICAoaGVhZGVyKSA9PlxuICAgICAgICAgIGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HIHx8XG4gICAgICAgICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBERVNDRU5ESU5HLFxuICAgICAgKVswXTtcbiAgICAgIGlmICh0eXBlb2YgZmlyc3RTb3J0ZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gbm8gc29ydGFibGUgaGVhZGVycyBmb3VuZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzb3J0RGlyID0gZmlyc3RTb3J0ZWQuZ2V0QXR0cmlidXRlKFNPUlRFRCk7XG4gICAgICBpZiAoc29ydERpciA9PT0gQVNDRU5ESU5HKSB7XG4gICAgICAgIHRvZ2dsZVNvcnQoZmlyc3RTb3J0ZWQsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzb3J0RGlyID09PSBERVNDRU5ESU5HKSB7XG4gICAgICAgIHRvZ2dsZVNvcnQoZmlyc3RTb3J0ZWQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFRBQkxFLFxuICAgIFNPUlRBQkxFX0hFQURFUixcbiAgICBTT1JUX0JVVFRPTixcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdGFibGU7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7XG4gIENPTUJPX0JPWF9DTEFTUyxcbiAgZW5oYW5jZUNvbWJvQm94LFxufSA9IHJlcXVpcmUoXCIuLi8uLi91c2EtY29tYm8tYm94L3NyYy9pbmRleFwiKTtcblxuY29uc3QgVElNRV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LXRpbWUtcGlja2VyYDtcbmNvbnN0IFRJTUVfUElDS0VSID0gYC4ke1RJTUVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBNQVhfVElNRSA9IDYwICogMjQgLSAxO1xuY29uc3QgTUlOX1RJTUUgPSAwO1xuY29uc3QgREVGQVVMVF9TVEVQID0gMzA7XG5jb25zdCBNSU5fU1RFUCA9IDE7XG5cbmNvbnN0IEZJTFRFUl9EQVRBU0VUID0ge1xuICBmaWx0ZXI6XG4gICAgXCIwP3t7IGhvdXJRdWVyeUZpbHRlciB9fTp7e21pbnV0ZVF1ZXJ5RmlsdGVyfX0uKnt7IGFwUXVlcnlGaWx0ZXIgfX1tP1wiLFxuICBhcFF1ZXJ5RmlsdGVyOiBcIihbYXBdKVwiLFxuICBob3VyUXVlcnlGaWx0ZXI6IFwiKFsxLTldWzAtMl0/KVwiLFxuICBtaW51dGVRdWVyeUZpbHRlcjogXCJbXFxcXGRdKzooWzAtOV17MCwyfSlcIixcbn07XG5cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgb2YgaGg6bW0gaW50byBtaW51dGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRpbWVTdHIgdGhlIHRpbWUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIG1pbnV0ZXNcbiAqL1xuY29uc3QgcGFyc2VUaW1lU3RyaW5nID0gKHRpbWVTdHIpID0+IHtcbiAgbGV0IG1pbnV0ZXM7XG5cbiAgaWYgKHRpbWVTdHIpIHtcbiAgICBjb25zdCBbaG91cnMsIG1pbnNdID0gdGltZVN0ci5zcGxpdChcIjpcIikubWFwKChzdHIpID0+IHtcbiAgICAgIGxldCB2YWx1ZTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkgdmFsdWUgPSBwYXJzZWQ7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAoaG91cnMgIT0gbnVsbCAmJiBtaW5zICE9IG51bGwpIHtcbiAgICAgIG1pbnV0ZXMgPSBob3VycyAqIDYwICsgbWlucztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWludXRlcztcbn07XG5cbi8qKlxuICogRW5oYW5jZSBhbiBpbnB1dCB3aXRoIHRoZSBkYXRlIHBpY2tlciBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIFRoZSBpbml0aWFsIHdyYXBwaW5nIGVsZW1lbnQgb2YgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB0cmFuc2Zvcm1UaW1lUGlja2VyID0gKGVsKSA9PiB7XG4gIGNvbnN0IHRpbWVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoVElNRV9QSUNLRVIpO1xuXG4gIGNvbnN0IGluaXRpYWxJbnB1dEVsID0gdGltZVBpY2tlckVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0YCk7XG5cbiAgaWYgKCFpbml0aWFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtUSU1FX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuXG4gIFtcbiAgICBcImlkXCIsXG4gICAgXCJuYW1lXCIsXG4gICAgXCJyZXF1aXJlZFwiLFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCIsXG4gICAgXCJkaXNhYmxlZFwiLFxuICAgIFwiYXJpYS1kaXNhYmxlZFwiLFxuICBdLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBpZiAoaW5pdGlhbElucHV0RWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIHNlbGVjdEVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICBpbml0aWFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBnZXRUaW1lQ29udGV4dCA9IChtaW51dGVzKSA9PiB7XG4gICAgY29uc3QgbWludXRlID0gbWludXRlcyAlIDYwO1xuICAgIGNvbnN0IGhvdXIyNCA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBjb25zdCBob3VyMTIgPSBob3VyMjQgJSAxMiB8fCAxMjtcbiAgICBjb25zdCBhbXBtID0gaG91cjI0IDwgMTIgPyBcImFtXCIgOiBcInBtXCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWludXRlLFxuICAgICAgaG91cjI0LFxuICAgICAgaG91cjEyLFxuICAgICAgYW1wbSxcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IG1pblRpbWUgPSBNYXRoLm1heChcbiAgICBNSU5fVElNRSxcbiAgICBwYXJzZVRpbWVTdHJpbmcodGltZVBpY2tlckVsLmRhdGFzZXQubWluVGltZSkgfHwgTUlOX1RJTUUsXG4gICk7XG4gIGNvbnN0IG1heFRpbWUgPSBNYXRoLm1pbihcbiAgICBNQVhfVElNRSxcbiAgICBwYXJzZVRpbWVTdHJpbmcodGltZVBpY2tlckVsLmRhdGFzZXQubWF4VGltZSkgfHwgTUFYX1RJTUUsXG4gICk7XG4gIGNvbnN0IHN0ZXAgPSBNYXRoLmZsb29yKFxuICAgIE1hdGgubWF4KE1JTl9TVEVQLCB0aW1lUGlja2VyRWwuZGF0YXNldC5zdGVwIHx8IERFRkFVTFRfU1RFUCksXG4gICk7XG5cbiAgbGV0IGRlZmF1bHRWYWx1ZTtcbiAgZm9yIChsZXQgdGltZSA9IG1pblRpbWU7IHRpbWUgPD0gbWF4VGltZTsgdGltZSArPSBzdGVwKSB7XG4gICAgY29uc3QgeyBtaW51dGUsIGhvdXIyNCwgaG91cjEyLCBhbXBtIH0gPSBnZXRUaW1lQ29udGV4dCh0aW1lKTtcblxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gYCR7cGFkWmVyb3MoaG91cjI0LCAyKX06JHtwYWRaZXJvcyhtaW51dGUsIDIpfWA7XG4gICAgb3B0aW9uLnRleHQgPSBgJHtob3VyMTJ9OiR7cGFkWmVyb3MobWludXRlLCAyKX0ke2FtcG19YDtcbiAgICBpZiAob3B0aW9uLnRleHQgPT09IGluaXRpYWxJbnB1dEVsLnZhbHVlKSB7XG4gICAgICBkZWZhdWx0VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgfVxuICAgIHNlbGVjdEVsLmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cblxuICB0aW1lUGlja2VyRWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfQ0xBU1MpO1xuXG4gIC8vIGNvbWJvIGJveCBwcm9wZXJ0aWVzXG4gIE9iamVjdC5rZXlzKEZJTFRFUl9EQVRBU0VUKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICB0aW1lUGlja2VyRWwuZGF0YXNldFtrZXldID0gRklMVEVSX0RBVEFTRVRba2V5XTtcbiAgfSk7XG4gIHRpbWVQaWNrZXJFbC5kYXRhc2V0LmRpc2FibGVGaWx0ZXJpbmcgPSBcInRydWVcIjtcbiAgdGltZVBpY2tlckVsLmRhdGFzZXQuZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gIHRpbWVQaWNrZXJFbC5hcHBlbmRDaGlsZChzZWxlY3RFbCk7XG4gIGluaXRpYWxJbnB1dEVsLnJlbW92ZSgpO1xufTtcblxuY29uc3QgdGltZVBpY2tlciA9IGJlaGF2aW9yKFxuICB7fSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFRJTUVfUElDS0VSLCByb290KS5mb3JFYWNoKCh0aW1lUGlja2VyRWwpID0+IHtcbiAgICAgICAgdHJhbnNmb3JtVGltZVBpY2tlcih0aW1lUGlja2VyRWwpO1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3godGltZVBpY2tlckVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgRklMVEVSX0RBVEFTRVQsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRpbWVQaWNrZXI7XG4iLCIvLyBUb29sdGlwc1xuY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnRcIik7XG5cbmNvbnN0IEJPRFkgPSBcImJvZHlcIjtcbmNvbnN0IFRPT0xUSVAgPSBgLiR7UFJFRklYfS10b29sdGlwYDtcbmNvbnN0IFRPT0xUSVBfVFJJR0dFUiA9IGAuJHtQUkVGSVh9LXRvb2x0aXBfX3RyaWdnZXJgO1xuY29uc3QgVE9PTFRJUF9UUklHR0VSX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX190cmlnZ2VyYDtcbmNvbnN0IFRPT0xUSVBfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBgO1xuY29uc3QgVE9PTFRJUF9CT0RZX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX19ib2R5YDtcbmNvbnN0IFNFVF9DTEFTUyA9IFwiaXMtc2V0XCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5jb25zdCBUUklBTkdMRV9TSVpFID0gNTtcbmNvbnN0IEFESlVTVF9XSURUSF9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcF9fYm9keS0td3JhcGA7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RE9NRWxlbWVudH0gdHJpZ2dlciAtIFRoZSB0b29sdGlwIHRyaWdnZXJcbiAqIEByZXR1cm5zIHtvYmplY3R9IEVsZW1lbnRzIGZvciBpbml0aWFsaXplZCB0b29sdGlwOyBpbmNsdWRlcyB0cmlnZ2VyLCB3cmFwcGVyLCBhbmQgYm9keVxuICovXG5jb25zdCBnZXRUb29sdGlwRWxlbWVudHMgPSAodHJpZ2dlcikgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gdHJpZ2dlci5wYXJlbnROb2RlO1xuICBjb25zdCBib2R5ID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKGAuJHtUT09MVElQX0JPRFlfQ0xBU1N9YCk7XG5cbiAgcmV0dXJuIHsgdHJpZ2dlciwgd3JhcHBlciwgYm9keSB9O1xufTtcblxuLyoqXG4gKiBTaG93cyB0aGUgdG9vbHRpcFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgLSB0aGUgZWxlbWVudCB0aGF0IGluaXRpYWxpemVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNob3dUb29sVGlwID0gKHRvb2x0aXBCb2R5LCB0b29sdGlwVHJpZ2dlciwgcG9zaXRpb24pID0+IHtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJmYWxzZVwiKTtcblxuICAvLyBUaGlzIHNldHMgdXAgdGhlIHRvb2x0aXAgYm9keS4gVGhlIG9wYWNpdHkgaXMgMCwgYnV0XG4gIC8vIHdlIGNhbiBiZWdpbiBydW5uaW5nIHRoZSBjYWxjdWxhdGlvbnMgYmVsb3cuXG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoU0VUX0NMQVNTKTtcblxuICAvKipcbiAgICogUG9zaXRpb24gdGhlIHRvb2x0aXAgYm9keSB3aGVuIHRoZSB0cmlnZ2VyIGlzIGhvdmVyZWRcbiAgICogUmVtb3ZlcyBvbGQgcG9zaXRpb25pbmcgY2xhc3NuYW1lcyBhbmQgcmVhcHBsaWVzLiBUaGlzIGFsbG93c1xuICAgKiBwb3NpdGlvbmluZyB0byBjaGFuZ2UgaW4gY2FzZSB0aGUgdXNlciByZXNpemVzIGJyb3dzZXIgb3IgRE9NIG1hbmlwdWxhdGlvblxuICAgKiBjYXVzZXMgdG9vbHRpcCB0byBnZXQgY2xpcHBlZCBmcm9tIHZpZXdwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzZXRQb3MgLSBjYW4gYmUgXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJyaWdodFwiLCBcImxlZnRcIlxuICAgKi9cbiAgY29uc3Qgc2V0UG9zaXRpb25DbGFzcyA9IChzZXRQb3MpID0+IHtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLXRvcGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tYm90dG9tYCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1yaWdodGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tbGVmdGApO1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tJHtzZXRQb3N9YCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgb2xkIHBvc2l0aW9uaW5nIHN0eWxlcy4gVGhpcyBhbGxvd3NcbiAgICogcmUtcG9zaXRpb25pbmcgdG8gY2hhbmdlIHdpdGhvdXQgaW5oZXJpdGluZyBvdGhlclxuICAgKiBkeW5hbWljIHN0eWxlc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCByZXNldFBvc2l0aW9uU3R5bGVzID0gKGUpID0+IHtcbiAgICAvLyB3ZSBkb24ndCBvdmVycmlkZSBhbnl0aGluZyBpbiB0aGUgc3R5bGVzaGVldCB3aGVuIGZpbmRpbmcgYWx0IHBvc2l0aW9uc1xuICAgIGUuc3R5bGUudG9wID0gbnVsbDtcbiAgICBlLnN0eWxlLmJvdHRvbSA9IG51bGw7XG4gICAgZS5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgZS5zdHlsZS5sZWZ0ID0gbnVsbDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIGdldCBtYXJnaW4gb2Zmc2V0IGNhbGN1bGF0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5VmFsdWUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG5cbiAgY29uc3Qgb2Zmc2V0TWFyZ2luID0gKHRhcmdldCwgcHJvcGVydHlWYWx1ZSkgPT5cbiAgICBwYXJzZUludChcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eVZhbHVlKSxcbiAgICAgIDEwLFxuICAgICk7XG5cbiAgLy8gb2Zmc2V0TGVmdCA9IHRoZSBsZWZ0IHBvc2l0aW9uLCBhbmQgbWFyZ2luIG9mIHRoZSBlbGVtZW50LCB0aGUgbGVmdFxuICAvLyBwYWRkaW5nLCBzY3JvbGxiYXIgYW5kIGJvcmRlciBvZiB0aGUgb2Zmc2V0UGFyZW50IGVsZW1lbnRcbiAgLy8gb2Zmc2V0V2lkdGggPSBUaGUgb2Zmc2V0V2lkdGggcHJvcGVydHkgcmV0dXJucyB0aGUgdmlld2FibGUgd2lkdGggb2YgYW5cbiAgLy8gZWxlbWVudCBpbiBwaXhlbHMsIGluY2x1ZGluZyBwYWRkaW5nLCBib3JkZXIgYW5kIHNjcm9sbGJhciwgYnV0IG5vdFxuICAvLyB0aGUgbWFyZ2luLlxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgbWFyZ2luIG9mZnNldFxuICAgKiB0b29sdGlwIHRyaWdnZXIgbWFyZ2luKHBvc2l0aW9uKSBvZmZzZXQgKyB0b29sdGlwQm9keSBvZmZzZXRXaWR0aFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWFyZ2luUG9zaXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRvb2x0aXBCb2R5T2Zmc2V0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IGNhbGN1bGF0ZU1hcmdpbk9mZnNldCA9IChcbiAgICBtYXJnaW5Qb3NpdGlvbixcbiAgICB0b29sdGlwQm9keU9mZnNldCxcbiAgICB0cmlnZ2VyLFxuICApID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPVxuICAgICAgb2Zmc2V0TWFyZ2luKHRyaWdnZXIsIGBtYXJnaW4tJHttYXJnaW5Qb3NpdGlvbn1gKSA+IDBcbiAgICAgICAgPyB0b29sdGlwQm9keU9mZnNldCAtIG9mZnNldE1hcmdpbih0cmlnZ2VyLCBgbWFyZ2luLSR7bWFyZ2luUG9zaXRpb259YClcbiAgICAgICAgOiB0b29sdGlwQm9keU9mZnNldDtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9ucyB0b29sdGlwIGF0IHRoZSB0b3BcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25Ub3AgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7IC8vIGVuc3VyZXMgd2Ugc3RhcnQgZnJvbSB0aGUgc2FtZSBwb2ludFxuICAgIC8vIGdldCBkZXRhaWxzIG9uIHRoZSBlbGVtZW50cyBvYmplY3Qgd2l0aFxuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXIsXG4gICAgKTtcblxuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlcixcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcInRvcFwiKTtcbiAgICBlLnN0eWxlLmxlZnQgPSBgNTAlYDsgLy8gY2VudGVyIHRoZSBlbGVtZW50XG4gICAgZS5zdHlsZS50b3AgPSBgLSR7VFJJQU5HTEVfU0laRX1weGA7IC8vIGNvbnNpZGVyIHRoZSBwc2V1ZG8gZWxlbWVudFxuICAgIC8vIGFwcGx5IG91ciBtYXJnaW5zIGJhc2VkIG9uIHRoZSBvZmZzZXRcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAtJHt0b3BNYXJnaW59cHggMCAwIC0ke2xlZnRNYXJnaW4gLyAyfXB4YDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIGJvdHRvbVxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvbkJvdHRvbSA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlcixcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcImJvdHRvbVwiKTtcbiAgICBlLnN0eWxlLmxlZnQgPSBgNTAlYDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAke1RSSUFOR0xFX1NJWkV9cHggMCAwIC0ke2xlZnRNYXJnaW4gLyAyfXB4YDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uUmlnaHQgPSAoZSkgPT4ge1xuICAgIHJlc2V0UG9zaXRpb25TdHlsZXMoZSk7XG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlcixcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcInJpZ2h0XCIpO1xuICAgIGUuc3R5bGUudG9wID0gYDUwJWA7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYCR7XG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ICsgdG9vbHRpcFRyaWdnZXIub2Zmc2V0V2lkdGggKyBUUklBTkdMRV9TSVpFXG4gICAgfXB4YDtcbiAgICBlLnN0eWxlLm1hcmdpbiA9IGAtJHt0b3BNYXJnaW4gLyAyfXB4IDAgMCAwYDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uTGVmdCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IHRvcE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwidG9wXCIsXG4gICAgICBlLm9mZnNldEhlaWdodCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLFxuICAgICk7XG5cbiAgICAvLyB3ZSBoYXZlIHRvIGNoZWNrIGZvciBzb21lIHV0aWxpdHkgbWFyZ2luc1xuICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcImxlZnRcIixcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgPiBlLm9mZnNldFdpZHRoXG4gICAgICAgID8gdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCAtIGUub2Zmc2V0V2lkdGhcbiAgICAgICAgOiBlLm9mZnNldFdpZHRoLFxuICAgICAgdG9vbHRpcFRyaWdnZXIsXG4gICAgKTtcblxuICAgIHNldFBvc2l0aW9uQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIGUuc3R5bGUudG9wID0gYDUwJWA7XG4gICAgZS5zdHlsZS5sZWZ0ID0gYC0ke1RSSUFOR0xFX1NJWkV9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwICR7XG4gICAgICB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0ID4gZS5vZmZzZXRXaWR0aCA/IGxlZnRNYXJnaW4gOiAtbGVmdE1hcmdpblxuICAgIH1weGA7IC8vIGFkanVzdCB0aGUgbWFyZ2luXG4gIH07XG5cbiAgLyoqXG4gICAqIFdlIHRyeSB0byBzZXQgdGhlIHBvc2l0aW9uIGJhc2VkIG9uIHRoZVxuICAgKiBvcmlnaW5hbCBpbnRlbnRpb24sIGJ1dCBtYWtlIGFkanVzdG1lbnRzXG4gICAqIGlmIHRoZSBlbGVtZW50IGlzIGNsaXBwZWQgb3V0IG9mIHRoZSB2aWV3cG9ydFxuICAgKiB3ZSBjb25zdHJhaW4gdGhlIHdpZHRoIG9ubHkgYXMgYSBsYXN0IHJlc29ydFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50KGFsaWFzIHRvb2x0aXBCb2R5KVxuICAgKiBAcGFyYW0ge051bWJlcn0gYXR0ZW1wdCAoLS1mbGFnKVxuICAgKi9cblxuICBjb25zdCBtYXhBdHRlbXB0cyA9IDI7XG5cbiAgZnVuY3Rpb24gZmluZEJlc3RQb3NpdGlvbihlbGVtZW50LCBhdHRlbXB0ID0gMSkge1xuICAgIC8vIGNyZWF0ZSBhcnJheSBvZiBvcHRpb25hbCBwb3NpdGlvbnNcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICBwb3NpdGlvblRvcCxcbiAgICAgIHBvc2l0aW9uQm90dG9tLFxuICAgICAgcG9zaXRpb25SaWdodCxcbiAgICAgIHBvc2l0aW9uTGVmdCxcbiAgICBdO1xuXG4gICAgbGV0IGhhc1Zpc2libGVQb3NpdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gd2UgdGFrZSBhIHJlY3Vyc2l2ZSBhcHByb2FjaFxuICAgIGZ1bmN0aW9uIHRyeVBvc2l0aW9ucyhpKSB7XG4gICAgICBpZiAoaSA8IHBvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25zW2ldO1xuICAgICAgICBwb3MoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgdHJ5UG9zaXRpb25zKChpICs9IDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYXNWaXNpYmxlUG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5UG9zaXRpb25zKDApO1xuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgYSBwb3NpdGlvbiB3ZSBjb21wcmVzcyBpdCBhbmQgdHJ5IGFnYWluXG4gICAgaWYgKCFoYXNWaXNpYmxlUG9zaXRpb24pIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChBREpVU1RfV0lEVEhfQ0xBU1MpO1xuICAgICAgaWYgKGF0dGVtcHQgPD0gbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24oZWxlbWVudCwgKGF0dGVtcHQgKz0gMSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICBjYXNlIFwidG9wXCI6XG4gICAgICBwb3NpdGlvblRvcCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgcG9zaXRpb25Cb3R0b20odG9vbHRpcEJvZHkpO1xuICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRvb2x0aXBCb2R5KSkge1xuICAgICAgICBmaW5kQmVzdFBvc2l0aW9uKHRvb2x0aXBCb2R5KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgcG9zaXRpb25SaWdodCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImxlZnRcIjpcbiAgICAgIHBvc2l0aW9uTGVmdCh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gc2tpcCBkZWZhdWx0IGNhc2VcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdHVhbGx5IHNob3cgdGhlIHRvb2x0aXAuIFRoZSBWSVNJQkxFX0NMQVNTXG4gICAqIHdpbGwgY2hhbmdlIHRoZSBvcGFjaXR5IHRvIDFcbiAgICovXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUyk7XG4gIH0sIDIwKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwgdGhlIHByb3BlcnRpZXMgdG8gc2hvdyBhbmQgcG9zaXRpb24gdGhlIHRvb2x0aXAsXG4gKiBhbmQgcmVzZXRzIHRoZSB0b29sdGlwIHBvc2l0aW9uIHRvIHRoZSBvcmlnaW5hbCBpbnRlbnRpb25cbiAqIGluIGNhc2UgdGhlIHdpbmRvdyBpcyByZXNpemVkIG9yIHRoZSBlbGVtZW50IGlzIG1vdmVkIHRocm91Z2hcbiAqIERPTSBtYW5pcHVsYXRpb24uXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwQm9keSAtIFRoZSBib2R5IG9mIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IGhpZGVUb29sVGlwID0gKHRvb2x0aXBCb2R5KSA9PiB7XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoVklTSUJMRV9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoU0VUX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShBREpVU1RfV0lEVEhfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG59O1xuXG4vKipcbiAqIFNldHVwIHRoZSB0b29sdGlwIGNvbXBvbmVudFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcFRyaWdnZXIgVGhlIGVsZW1lbnQgdGhhdCBjcmVhdGVzIHRoZSB0b29sdGlwXG4gKi9cbmNvbnN0IHNldFVwQXR0cmlidXRlcyA9ICh0b29sdGlwVHJpZ2dlcikgPT4ge1xuICBjb25zdCB0b29sdGlwSUQgPSBgdG9vbHRpcC0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwMCkgKyAxMDAwMDB9YDtcbiAgY29uc3QgdG9vbHRpcENvbnRlbnQgPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCB0b29sdGlwQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25zdCBhZGRpdGlvbmFsQ2xhc3NlcyA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcImRhdGEtY2xhc3Nlc1wiKTtcbiAgbGV0IHBvc2l0aW9uID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKTtcblxuICAvLyBBcHBseSBkZWZhdWx0IHBvc2l0aW9uIGlmIG5vdCBzZXQgYXMgYXR0cmlidXRlXG4gIGlmICghcG9zaXRpb24pIHtcbiAgICBwb3NpdGlvbiA9IFwidG9wXCI7XG4gICAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiLCBwb3NpdGlvbik7XG4gIH1cblxuICAvLyBTZXQgdXAgdG9vbHRpcCBhdHRyaWJ1dGVzXG4gIHRvb2x0aXBUcmlnZ2VyLnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgdG9vbHRpcElEKTtcbiAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCIwXCIpO1xuICB0b29sdGlwVHJpZ2dlci5yZW1vdmVBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgdG9vbHRpcFRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShUT09MVElQX0NMQVNTKTtcbiAgdG9vbHRpcFRyaWdnZXIuY2xhc3NMaXN0LmFkZChUT09MVElQX1RSSUdHRVJfQ0xBU1MpO1xuXG4gIC8vIGluc2VydCB3cmFwcGVyIGJlZm9yZSBlbCBpbiB0aGUgRE9NIHRyZWVcbiAgdG9vbHRpcFRyaWdnZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgdG9vbHRpcFRyaWdnZXIpO1xuXG4gIC8vIHNldCB1cCB0aGUgd3JhcHBlclxuICB3cmFwcGVyLmFwcGVuZENoaWxkKHRvb2x0aXBUcmlnZ2VyKTtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfQ0xBU1MpO1xuICB3cmFwcGVyLmFwcGVuZENoaWxkKHRvb2x0aXBCb2R5KTtcblxuICAvLyBBcHBseSBhZGRpdGlvbmFsIGNsYXNzIG5hbWVzIHRvIHdyYXBwZXIgZWxlbWVudFxuICBpZiAoYWRkaXRpb25hbENsYXNzZXMpIHtcbiAgICBjb25zdCBjbGFzc2VzQXJyYXkgPSBhZGRpdGlvbmFsQ2xhc3Nlcy5zcGxpdChcIiBcIik7XG4gICAgY2xhc3Nlc0FycmF5LmZvckVhY2goKGNsYXNzbmFtZSkgPT4gd3JhcHBlci5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSkpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRoZSB0b29sdGlwIGJvZHlcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChUT09MVElQX0JPRFlfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCB0b29sdGlwSUQpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidG9vbHRpcFwiKTtcbiAgdG9vbHRpcEJvZHkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuXG4gIC8vIHBsYWNlIHRoZSB0ZXh0IGluIHRoZSB0b29sdGlwXG4gIHRvb2x0aXBCb2R5LnRleHRDb250ZW50ID0gdG9vbHRpcENvbnRlbnQ7XG5cbiAgcmV0dXJuIHsgdG9vbHRpcEJvZHksIHBvc2l0aW9uLCB0b29sdGlwQ29udGVudCwgd3JhcHBlciB9O1xufTtcblxuLyoqXG4gKiBIaWRlIGFsbCBhY3RpdmUgdG9vbHRpcHMgd2hlbiBlc2NhcGUga2V5IGlzIHByZXNzZWQuXG4gKi9cblxuY29uc3QgaGFuZGxlRXNjYXBlID0gKCkgPT4ge1xuICBjb25zdCBhY3RpdmVUb29sdGlwcyA9IHNlbGVjdE9yTWF0Y2hlcyhgLiR7VE9PTFRJUF9CT0RZX0NMQVNTfS4ke1NFVF9DTEFTU31gKTtcblxuICBpZiAoIWFjdGl2ZVRvb2x0aXBzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWN0aXZlVG9vbHRpcHMuZm9yRWFjaCgoYWN0aXZlVG9vbHRpcCkgPT4gaGlkZVRvb2xUaXAoYWN0aXZlVG9vbHRpcCkpO1xufTtcblxuLy8gU2V0dXAgb3VyIGZ1bmN0aW9uIHRvIHJ1biBvbiB2YXJpb3VzIGV2ZW50c1xuY29uc3QgdG9vbHRpcCA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJtb3VzZW92ZXIgZm9jdXNpblwiOiB7XG4gICAgICBbVE9PTFRJUF0oZSkge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0gZS50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRUeXBlID0gdHJpZ2dlci5ub2RlTmFtZTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRvb2x0aXAgaWYgaXQgaGFzbid0IGFscmVhZHlcbiAgICAgICAgaWYgKGVsZW1lbnRUeXBlID09PSBcIkJVVFRPTlwiICYmIHRyaWdnZXIuaGFzQXR0cmlidXRlKFwidGl0bGVcIikpIHtcbiAgICAgICAgICBzZXRVcEF0dHJpYnV0ZXModHJpZ2dlcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBbVE9PTFRJUF9UUklHR0VSXShlKSB7XG4gICAgICAgIGNvbnN0IHsgdHJpZ2dlciwgYm9keSB9ID0gZ2V0VG9vbHRpcEVsZW1lbnRzKGUudGFyZ2V0KTtcblxuICAgICAgICBzaG93VG9vbFRpcChib2R5LCB0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQucG9zaXRpb24pO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGZvY3Vzb3V0OiB7XG4gICAgICBbVE9PTFRJUF9UUklHR0VSXShlKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0gZ2V0VG9vbHRpcEVsZW1lbnRzKGUudGFyZ2V0KTtcblxuICAgICAgICBoaWRlVG9vbFRpcChib2R5KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBrZXlkb3duOiB7XG4gICAgICBbQk9EWV06IGtleW1hcCh7IEVzY2FwZTogaGFuZGxlRXNjYXBlIH0pLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhUT09MVElQLCByb290KS5mb3JFYWNoKCh0b29sdGlwVHJpZ2dlcikgPT4ge1xuICAgICAgICBzZXRVcEF0dHJpYnV0ZXModG9vbHRpcFRyaWdnZXIpO1xuXG4gICAgICAgIGNvbnN0IHsgYm9keSwgd3JhcHBlciB9ID0gZ2V0VG9vbHRpcEVsZW1lbnRzKHRvb2x0aXBUcmlnZ2VyKTtcbiAgICAgICAgd3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiBoaWRlVG9vbFRpcChib2R5KSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhUT09MVElQLCByb290KS5mb3JFYWNoKCh0b29sdGlwV3JhcHBlcikgPT4ge1xuICAgICAgICB0b29sdGlwV3JhcHBlci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoaWRlVG9vbFRpcCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldHVwOiBzZXRVcEF0dHJpYnV0ZXMsXG4gICAgZ2V0VG9vbHRpcEVsZW1lbnRzLFxuICAgIHNob3c6IHNob3dUb29sVGlwLFxuICAgIGhpZGU6IGhpZGVUb29sVGlwLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0b29sdGlwO1xuIiwiY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB2YWxpZGF0ZSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy92YWxpZGF0ZS1pbnB1dFwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5cbmNvbnN0IFZBTElEQVRFX0lOUFVUID1cbiAgXCJpbnB1dFtkYXRhLXZhbGlkYXRpb24tZWxlbWVudF0sdGV4dGFyZWFbZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRdXCI7XG5jb25zdCBDSEVDS0xJU1RfSVRFTSA9IGAuJHtQUkVGSVh9LWNoZWNrbGlzdF9faXRlbWA7XG5cbi8vIFRyaWdnZXIgdmFsaWRhdGlvbiBvbiBpbnB1dCBjaGFuZ2VcbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChlbCkgPT4gdmFsaWRhdGUoZWwpO1xuXG4vLyBDcmVhdGUgY29udGFpbmVyIHRvIGhvbGQgYXJpYSByZWFkb3V0XG5jb25zdCBjcmVhdGVTdGF0dXNFbGVtZW50ID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb25Db250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xuICBjb25zdCBpbnB1dElEID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IHN0YXR1c1N1bW1hcnlJRCA9IGAke2lucHV0SUR9LXNyLXN1bW1hcnlgO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIHN0YXR1c1N1bW1hcnlJRCk7XG5cbiAgY29uc3Qgc3RhdHVzU3VtbWFyeUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLXN0YXR1c1wiLCBcIlwiKTtcbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidXNhLXNyLW9ubHlcIik7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsIFwicG9saXRlXCIpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImFyaWEtYXRvbWljXCIsIHRydWUpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHN0YXR1c1N1bW1hcnlJRCk7XG4gIHZhbGlkYXRpb25Db250YWluZXIuYXBwZW5kKHN0YXR1c1N1bW1hcnlDb250YWluZXIpO1xufTtcblxuLy8gU2V0IHVwIGNoZWNrbGlzdCBpdGVtcyB3aXRoIGluaXRpYWwgYXJpYS1sYWJlbCAoaW5jb21wbGV0ZSkgdmFsdWVzXG5jb25zdCBjcmVhdGVJbml0aWFsU3RhdHVzID0gKGlucHV0KSA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb25Db250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlO1xuICBjb25zdCBjaGVja2xpc3RJdGVtcyA9IHZhbGlkYXRpb25Db250YWluZXIucXVlcnlTZWxlY3RvckFsbChDSEVDS0xJU1RfSVRFTSk7XG4gIGNvbnN0IHZhbGlkYXRpb25FbGVtZW50ID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLWVsZW1lbnRcIik7XG5cbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCB2YWxpZGF0aW9uRWxlbWVudCk7XG5cbiAgY2hlY2tsaXN0SXRlbXMuZm9yRWFjaCgobGlzdEl0ZW0pID0+IHtcbiAgICBsZXQgY3VycmVudFN0YXR1cyA9IFwic3RhdHVzIGluY29tcGxldGVcIjtcbiAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKFwiZGF0YS12YWxpZGF0aW9uLWluY29tcGxldGVcIikpIHtcbiAgICAgIGN1cnJlbnRTdGF0dXMgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24taW5jb21wbGV0ZVwiKTtcbiAgICB9XG4gICAgY29uc3QgaXRlbVN0YXR1cyA9IGAke2xpc3RJdGVtLnRleHRDb250ZW50fSAke2N1cnJlbnRTdGF0dXN9IGA7XG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpdGVtU3RhdHVzKTtcbiAgfSk7XG59O1xuXG5jb25zdCBlbmhhbmNlVmFsaWRhdGlvbiA9IChpbnB1dCkgPT4ge1xuICBjcmVhdGVTdGF0dXNFbGVtZW50KGlucHV0KTtcbiAgY3JlYXRlSW5pdGlhbFN0YXR1cyhpbnB1dCk7XG59O1xuXG5jb25zdCB2YWxpZGF0b3IgPSBiZWhhdmlvcihcbiAge1xuICAgIFwiaW5wdXQgY2hhbmdlXCI6IHtcbiAgICAgIFtWQUxJREFURV9JTlBVVF0oZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlQ2hhbmdlKGV2ZW50LnRhcmdldCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhWQUxJREFURV9JTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXQpID0+XG4gICAgICAgIGVuaGFuY2VWYWxpZGF0aW9uKGlucHV0KSxcbiAgICAgICk7XG4gICAgfSxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdG9yO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByZWZpeDogXCJ1c2FcIixcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gVGhpcyB1c2VkIHRvIGJlIGNvbmRpdGlvbmFsbHkgZGVwZW5kZW50IG9uIHdoZXRoZXIgdGhlXG4gIC8vIGJyb3dzZXIgc3VwcG9ydGVkIHRvdWNoIGV2ZW50czsgaWYgaXQgZGlkLCBgQ0xJQ0tgIHdhcyBzZXQgdG9cbiAgLy8gYHRvdWNoc3RhcnRgLiAgSG93ZXZlciwgdGhpcyBoYWQgZG93bnNpZGVzOlxuICAvL1xuICAvLyAqIEl0IHByZS1lbXB0ZWQgbW9iaWxlIGJyb3dzZXJzJyBkZWZhdWx0IGJlaGF2aW9yIG9mIGRldGVjdGluZ1xuICAvLyAgIHdoZXRoZXIgYSB0b3VjaCB0dXJuZWQgaW50byBhIHNjcm9sbCwgdGhlcmVieSBwcmV2ZW50aW5nXG4gIC8vICAgdXNlcnMgZnJvbSB1c2luZyBzb21lIG9mIG91ciBjb21wb25lbnRzIGFzIHNjcm9sbCBzdXJmYWNlcy5cbiAgLy9cbiAgLy8gKiBTb21lIGRldmljZXMsIHN1Y2ggYXMgdGhlIE1pY3Jvc29mdCBTdXJmYWNlIFBybywgc3VwcG9ydCAqYm90aCpcbiAgLy8gICB0b3VjaCBhbmQgY2xpY2tzLiBUaGlzIG1lYW50IHRoZSBjb25kaXRpb25hbCBlZmZlY3RpdmVseSBkcm9wcGVkXG4gIC8vICAgc3VwcG9ydCBmb3IgdGhlIHVzZXIncyBtb3VzZSwgZnJ1c3RyYXRpbmcgdXNlcnMgd2hvIHByZWZlcnJlZFxuICAvLyAgIGl0IG9uIHRob3NlIHN5c3RlbXMuXG4gIENMSUNLOiBcImNsaWNrXCIsXG59O1xuIiwiY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1hY2NvcmRpb24vc3JjL2luZGV4XCIpO1xuY29uc3QgYmFubmVyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1iYW5uZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgYnV0dG9uID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1idXR0b24vc3JjL2luZGV4XCIpO1xuY29uc3QgY2hhcmFjdGVyQ291bnQgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWNoYXJhY3Rlci1jb3VudC9zcmMvaW5kZXhcIik7XG5jb25zdCBjb21ib0JveCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtY29tYm8tYm94L3NyYy9pbmRleFwiKTtcbmNvbnN0IGRhdGVQaWNrZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWRhdGUtcGlja2VyL3NyYy9pbmRleFwiKTtcbmNvbnN0IGRhdGVSYW5nZVBpY2tlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtZGF0ZS1yYW5nZS1waWNrZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgZmlsZUlucHV0ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1maWxlLWlucHV0L3NyYy9pbmRleFwiKTtcbmNvbnN0IGZvb3RlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtZm9vdGVyL3NyYy9pbmRleFwiKTtcbmNvbnN0IGluUGFnZU5hdmlnYXRpb24gPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWluLXBhZ2UtbmF2aWdhdGlvbi9zcmMvaW5kZXhcIik7XG5jb25zdCBpbnB1dE1hc2sgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWlucHV0LW1hc2svc3JjL2luZGV4XCIpO1xuY29uc3QgbGFuZ3VhZ2VTZWxlY3RvciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtbGFuZ3VhZ2Utc2VsZWN0b3Ivc3JjL2luZGV4XCIpO1xuY29uc3QgbW9kYWwgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLW1vZGFsL3NyYy9pbmRleFwiKTtcbmNvbnN0IG5hdmlnYXRpb24gPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWhlYWRlci9zcmMvaW5kZXhcIik7XG5jb25zdCBwYXNzd29yZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9fdXNhLXBhc3N3b3JkL3NyYy9pbmRleFwiKTtcbmNvbnN0IHJhbmdlID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1yYW5nZS9zcmMvaW5kZXhcIik7XG5jb25zdCBzZWFyY2ggPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXNlYXJjaC9zcmMvaW5kZXhcIik7XG5jb25zdCBza2lwbmF2ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1za2lwbmF2L3NyYy9pbmRleFwiKTtcbmNvbnN0IHRhYmxlID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10YWJsZS9zcmMvaW5kZXhcIik7XG5jb25zdCB0aW1lUGlja2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10aW1lLXBpY2tlci9zcmMvaW5kZXhcIik7XG5jb25zdCB0b29sdGlwID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS10b29sdGlwL3NyYy9pbmRleFwiKTtcbmNvbnN0IHZhbGlkYXRvciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtdmFsaWRhdGlvbi9zcmMvaW5kZXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhY2NvcmRpb24sXG4gIGJhbm5lcixcbiAgYnV0dG9uLFxuICBjaGFyYWN0ZXJDb3VudCxcbiAgY29tYm9Cb3gsXG4gIGRhdGVQaWNrZXIsXG4gIGRhdGVSYW5nZVBpY2tlcixcbiAgZmlsZUlucHV0LFxuICBmb290ZXIsXG4gIGluUGFnZU5hdmlnYXRpb24sXG4gIGlucHV0TWFzayxcbiAgbGFuZ3VhZ2VTZWxlY3RvcixcbiAgbW9kYWwsXG4gIG5hdmlnYXRpb24sXG4gIHBhc3N3b3JkLFxuICByYW5nZSxcbiAgc2VhcmNoLFxuICBza2lwbmF2LFxuICB0YWJsZSxcbiAgdGltZVBpY2tlcixcbiAgdG9vbHRpcCxcbiAgdmFsaWRhdG9yLFxufTtcbiIsIndpbmRvdy51c3dkc1ByZXNlbnQgPSB0cnVlOyAvLyBHTE9CQUwgdmFyaWFibGUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgdXN3ZHMuanMgaGFzIGxvYWRlZCBpbiB0aGUgRE9NLlxuXG5jb25zdCB1c3dkcyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcblxuY29uc3QgY29tcG9uZW50cyA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xuXG51c3dkcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcblxuY29uc3QgaW5pdENvbXBvbmVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG4gIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGJlaGF2aW9yID0gY29tcG9uZW50c1trZXldO1xuICAgIGJlaGF2aW9yLm9uKHRhcmdldCk7XG4gIH0pO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRDb21wb25lbnRzLCB7IG9uY2U6IHRydWUgfSk7XG59IGVsc2Uge1xuICBpbml0Q29tcG9uZW50cygpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSB1c3dkcztcbmV4cG9ydHMuaW5pdENvbXBvbmVudHMgPSBpbml0Q29tcG9uZW50cztcbiIsIm1vZHVsZS5leHBvcnRzID0gKGh0bWxEb2N1bWVudCA9IGRvY3VtZW50KSA9PiBodG1sRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiIsImNvbnN0IEJlaGF2aW9yID0gcmVxdWlyZShcInJlY2VwdG9yL2JlaGF2aW9yXCIpO1xuXG4vKipcbiAqIEBuYW1lIHNlcXVlbmNlXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBzZXEgYW4gYXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHsgY2xvc3VyZSB9IGNhbGxIb29rc1xuICovXG4vLyBXZSB1c2UgYSBuYW1lZCBmdW5jdGlvbiBoZXJlIGJlY2F1c2Ugd2Ugd2FudCBpdCB0byBpbmhlcml0IGl0cyBsZXhpY2FsIHNjb3BlXG4vLyBmcm9tIHRoZSBiZWhhdmlvciBwcm9wcyBvYmplY3QsIG5vdCBmcm9tIHRoZSBtb2R1bGVcbmNvbnN0IHNlcXVlbmNlID0gKC4uLnNlcSkgPT5cbiAgZnVuY3Rpb24gY2FsbEhvb2tzKHRhcmdldCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBzZXEuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHRoaXNbbWV0aG9kXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXNbbWV0aG9kXS5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogQG5hbWUgYmVoYXZpb3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBldmVudHNcbiAqIEBwYXJhbSB7b2JqZWN0P30gcHJvcHNcbiAqIEByZXR1cm4ge3JlY2VwdG9yLmJlaGF2aW9yfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChldmVudHMsIHByb3BzKSA9PlxuICBCZWhhdmlvcihldmVudHMsIHtcbiAgICBvbjogc2VxdWVuY2UoXCJpbml0XCIsIFwiYWRkXCIpLFxuICAgIG9mZjogc2VxdWVuY2UoXCJ0ZWFyZG93blwiLCBcInJlbW92ZVwiKSxcbiAgICAuLi5wcm9wcyxcbiAgfSk7XG4iLCIvKipcbiAqIENhbGwgYSBmdW5jdGlvbiBldmVyeSBYIGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiAqIEBwYXJhbSAge251bWJlcn0gZGVsYXkgLSBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgY2FsbGluZyBmdW5jdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGRlYm91bmNlZCBmdW5jdGlvblxuICogQGV4YW1wbGUgY29uc3QgdXBkYXRlU3RhdHVzID0gZGVib3VuY2UoKHN0cmluZykgPT4gY29uc29sZS5sb2coc3RyaW5nKSwgMjAwMClcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlYm91bmNlKGNhbGxiYWNrLCBkZWxheSA9IDUwMCkge1xuICBsZXQgdGltZXIgPSBudWxsO1xuICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0sIGRlbGF5KTtcbiAgfTtcbn07XG4iLCJjb25zdCB7IGtleW1hcCB9ID0gcmVxdWlyZShcInJlY2VwdG9yXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbmNvbnN0IGFjdGl2ZUVsZW1lbnQgPSByZXF1aXJlKFwiLi9hY3RpdmUtZWxlbWVudFwiKTtcblxuY29uc3QgRk9DVVNBQkxFID1cbiAgJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcblxuY29uc3QgdGFiSGFuZGxlciA9IChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2VsZWN0KEZPQ1VTQUJMRSwgY29udGV4dCk7XG4gIGNvbnN0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWzBdO1xuICBjb25zdCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gIC8vIFNwZWNpYWwgcnVsZXMgZm9yIHdoZW4gdGhlIHVzZXIgaXMgdGFiYmluZyBmb3J3YXJkIGZyb20gdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQsXG4gIC8vIG9yIHdoZW4gdGFiYmluZyBiYWNrd2FyZHMgZnJvbSB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnRcbiAgZnVuY3Rpb24gdGFiQWhlYWQoZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRhYkJhY2soZXZlbnQpIHtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCgpID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgICAvLyBUaGlzIGNoZWNrcyBpZiB5b3Ugd2FudCB0byBzZXQgdGhlIGluaXRpYWwgZm9jdXMgdG8gYSBjb250YWluZXJcbiAgICAvLyBpbnN0ZWFkIG9mIGFuIGVsZW1lbnQgd2l0aGluLCBhbmQgdGhlIHVzZXIgdGFicyBiYWNrLlxuICAgIC8vIFRoZW4gd2Ugc2V0IHRoZSBmb2N1cyB0byB0aGUgZmlyc3RcbiAgICBlbHNlIGlmICghZm9jdXNhYmxlRWxlbWVudHMuaW5jbHVkZXMoYWN0aXZlRWxlbWVudCgpKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmlyc3RUYWJTdG9wLFxuICAgIGxhc3RUYWJTdG9wLFxuICAgIHRhYkFoZWFkLFxuICAgIHRhYkJhY2ssXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb250ZXh0LCBhZGRpdGlvbmFsS2V5QmluZGluZ3MgPSB7fSkgPT4ge1xuICBjb25zdCB0YWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKGNvbnRleHQpO1xuICBjb25zdCBiaW5kaW5ncyA9IGFkZGl0aW9uYWxLZXlCaW5kaW5ncztcbiAgY29uc3QgeyBFc2MsIEVzY2FwZSB9ID0gYmluZGluZ3M7XG5cbiAgaWYgKEVzY2FwZSAmJiAhRXNjKSBiaW5kaW5ncy5Fc2MgPSBFc2NhcGU7XG5cbiAgLy8gIFRPRE86IEluIHRoZSBmdXR1cmUsIGxvb3Agb3ZlciBhZGRpdGlvbmFsIGtleWJpbmRpbmdzIGFuZCBwYXNzIGFuIGFycmF5XG4gIC8vIG9mIGZ1bmN0aW9ucywgaWYgbmVjZXNzYXJ5LCB0byB0aGUgbWFwIGtleXMuIFRoZW4gcGVvcGxlIGltcGxlbWVudGluZ1xuICAvLyB0aGUgZm9jdXMgdHJhcCBjb3VsZCBwYXNzIGNhbGxiYWNrcyB0byBmaXJlIHdoZW4gdGFiYmluZ1xuICBjb25zdCBrZXlNYXBwaW5ncyA9IGtleW1hcCh7XG4gICAgVGFiOiB0YWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgXCJTaGlmdCtUYWJcIjogdGFiRXZlbnRIYW5kbGVyLnRhYkJhY2ssXG4gICAgLi4uYWRkaXRpb25hbEtleUJpbmRpbmdzLFxuICB9KTtcblxuICBjb25zdCBmb2N1c1RyYXAgPSBiZWhhdmlvcihcbiAgICB7XG4gICAgICBrZXlkb3duOiBrZXlNYXBwaW5ncyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGluaXQoKSB7XG4gICAgICAgIC8vIFRPRE86IGlzIHRoaXMgZGVzaXJlYWJsZSBiZWhhdmlvcj8gU2hvdWxkIHRoZSB0cmFwIGFsd2F5cyBkbyB0aGlzIGJ5IGRlZmF1bHQgb3Igc2hvdWxkXG4gICAgICAgIC8vIHRoZSBjb21wb25lbnQgZ2V0dGluZyBkZWNvcmF0ZWQgaGFuZGxlIHRoaXM/XG4gICAgICAgIGlmICh0YWJFdmVudEhhbmRsZXIuZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgdGFiRXZlbnRIYW5kbGVyLmZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlKGlzQWN0aXZlKSB7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgIHRoaXMub24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9mZigpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICk7XG5cbiAgcmV0dXJuIGZvY3VzVHJhcDtcbn07XG4iLCIvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzU1NzQzM1xuZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChcbiAgZWwsXG4gIHdpbiA9IHdpbmRvdyxcbiAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4pIHtcbiAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiAoXG4gICAgcmVjdC50b3AgPj0gMCAmJlxuICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgcmVjdC5ib3R0b20gPD0gKHdpbi5pbm5lckhlaWdodCB8fCBkb2NFbC5jbGllbnRIZWlnaHQpICYmXG4gICAgcmVjdC5yaWdodCA8PSAod2luLmlubmVyV2lkdGggfHwgZG9jRWwuY2xpZW50V2lkdGgpXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFbGVtZW50SW5WaWV3cG9ydDtcbiIsIi8vIGlPUyBkZXRlY3Rpb24gZnJvbTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTAzOTg4NS8xNzc3MTBcbmZ1bmN0aW9uIGlzSW9zRGV2aWNlKCkge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQb2R8aVBob25lfGlQYWQpL2cpIHx8XG4gICAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSkpICYmXG4gICAgIXdpbmRvdy5NU1N0cmVhbVxuICApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW9zRGV2aWNlO1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUgKi9cblxuLyoqXG4gKiBBIHNpbXBsZSBsaWJyYXJ5IHRvIGhlbHAgeW91IGVzY2FwZSBIVE1MIHVzaW5nIHRlbXBsYXRlIHN0cmluZ3MuXG4gKlxuICogSXQncyB0aGUgY291bnRlcnBhcnQgdG8gb3VyIGVzbGludCBcIm5vLXVuc2FmZS1pbm5lcmh0bWxcIiBwbHVnaW4gdGhhdCBoZWxwcyB1c1xuICogYXZvaWQgdW5zYWZlIGNvZGluZyBwcmFjdGljZXMuXG4gKiBBIGZ1bGwgd3JpdGUtdXAgb2YgdGhlIEhvd3MgYW5kIFdoeXMgYXJlIGRvY3VtZW50ZWRcbiAqIGZvciBkZXZlbG9wZXJzIGF0XG4gKiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvRmlyZWZveF9PUy9TZWN1cml0eS9TZWN1cml0eV9BdXRvbWF0aW9uXG4gKiB3aXRoIGFkZGl0aW9uYWwgYmFja2dyb3VuZCBpbmZvcm1hdGlvbiBhbmQgZGVzaWduIGRvY3MgYXRcbiAqICBodHRwczovL3dpa2kubW96aWxsYS5vcmcvVXNlcjpGYnJhdW4vR2FpYS9TYWZlaW5uZXJIVE1MUm9hZG1hcFxuICpcbiAqL1xuXG4hKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xufSkoZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgU2FuaXRpemVyID0ge1xuICAgIF9lbnRpdHk6IC9bJjw+XCInL10vZyxcblxuICAgIF9lbnRpdGllczoge1xuICAgICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICBcIidcIjogXCImYXBvcztcIixcbiAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgIH0sXG5cbiAgICBnZXRFbnRpdHk6IGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gU2FuaXRpemVyLl9lbnRpdGllc1tzXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBIVE1MIGZvciBhbGwgdmFsdWVzIGluIGEgdGFnZ2VkIHRlbXBsYXRlIHN0cmluZy5cbiAgICAgKi9cbiAgICBlc2NhcGVIVE1MOiBmdW5jdGlvbiAoc3RyaW5ncykge1xuICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gc3RyaW5nc1tpXTtcbiAgICAgICAgaWYgKGkgKyAxIDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50c1tpICsgMV0gfHwgXCJcIjtcbiAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKFxuICAgICAgICAgICAgU2FuaXRpemVyLl9lbnRpdHksXG4gICAgICAgICAgICBTYW5pdGl6ZXIuZ2V0RW50aXR5LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEVzY2FwZXMgSFRNTCBhbmQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRvIGJlIHVzZWQgZHVyaW5nIERPTSBpbnNlcnRpb25cbiAgICAgKi9cbiAgICBjcmVhdGVTYWZlSFRNTDogZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICAgIHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApO1xuICAgICAgZm9yICh2YXIgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgdmFsdWVzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGVzY2FwZWQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTC5hcHBseShcbiAgICAgICAgU2FuaXRpemVyLFxuICAgICAgICBbc3RyaW5nc10uY29uY2F0KHZhbHVlcyksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgX19odG1sOiBlc2NhcGVkLFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBcIltvYmplY3QgV3JhcHBlZEhUTUxPYmplY3RdXCI7XG4gICAgICAgIH0sXG4gICAgICAgIGluZm86XG4gICAgICAgICAgXCJUaGlzIGlzIGEgd3JhcHBlZCBIVE1MIG9iamVjdC4gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JcIiArXG4gICAgICAgICAgXCJnL2VuLVVTL0ZpcmVmb3hfT1MvU2VjdXJpdHkvU2VjdXJpdHlfQXV0b21hdGlvbiBmb3IgbW9yZS5cIixcbiAgICAgIH07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVbndyYXAgc2FmZSBIVE1MIGNyZWF0ZWQgYnkgY3JlYXRlU2FmZUhUTUwgb3IgYSBjdXN0b20gcmVwbGFjZW1lbnQgdGhhdFxuICAgICAqIHVuZGVyd2VudCBzZWN1cml0eSByZXZpZXcuXG4gICAgICovXG4gICAgdW53cmFwU2FmZUhUTUw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBodG1sT2JqZWN0cyA9IG5ldyBBcnJheShfbGVuKTtcbiAgICAgIGZvciAodmFyIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGh0bWxPYmplY3RzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWFya3VwTGlzdCA9IGh0bWxPYmplY3RzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouX19odG1sO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFya3VwTGlzdC5qb2luKFwiXCIpO1xuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIFNhbml0aXplcjtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpIHtcbiAgLy8gQ3JlYXRpbmcgaW52aXNpYmxlIGNvbnRhaW5lclxuICBjb25zdCBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG91dGVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9IFwic2Nyb2xsXCI7IC8vIGZvcmNpbmcgc2Nyb2xsYmFyIHRvIGFwcGVhclxuICBvdXRlci5zdHlsZS5tc092ZXJmbG93U3R5bGUgPSBcInNjcm9sbGJhclwiOyAvLyBuZWVkZWQgZm9yIFdpbkpTIGFwcHNcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcik7XG5cbiAgLy8gQ3JlYXRpbmcgaW5uZXIgZWxlbWVudCBhbmQgcGxhY2luZyBpdCBpbiB0aGUgY29udGFpbmVyXG4gIGNvbnN0IGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpO1xuXG4gIC8vIENhbGN1bGF0aW5nIGRpZmZlcmVuY2UgYmV0d2VlbiBjb250YWluZXIncyBmdWxsIHdpZHRoIGFuZCB0aGUgY2hpbGQgd2lkdGhcbiAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBgJHtvdXRlci5vZmZzZXRXaWR0aCAtIGlubmVyLm9mZnNldFdpZHRofXB4YDtcblxuICAvLyBSZW1vdmluZyB0ZW1wb3JhcnkgZWxlbWVudHMgZnJvbSB0aGUgRE9NXG4gIG91dGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob3V0ZXIpO1xuXG4gIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcbn07XG4iLCJjb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi9zZWxlY3RcIik7XG4vKipcbiAqIEBuYW1lIGlzRWxlbWVudFxuICogQGRlc2MgcmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNFbGVtZW50ID0gKHZhbHVlKSA9PlxuICB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUubm9kZVR5cGUgPT09IDE7XG5cbi8qKlxuICogQG5hbWUgc2VsZWN0T3JNYXRjaGVzXG4gKiBAZGVzYyBzZWxlY3RzIGVsZW1lbnRzIGZyb20gdGhlIERPTSBieSBjbGFzcyBzZWxlY3RvciBvciBJRCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciAtIFRoZSBzZWxlY3RvciB0byB0cmF2ZXJzZSB0aGUgRE9NIHdpdGguXG4gKiBAcGFyYW0ge0RvY3VtZW50fEhUTUxFbGVtZW50P30gY29udGV4dCAtIFRoZSBjb250ZXh0IHRvIHRyYXZlcnNlIHRoZSBET01cbiAqICAgaW4uIElmIG5vdCBwcm92aWRlZCwgaXQgZGVmYXVsdHMgdG8gdGhlIGRvY3VtZW50LlxuICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX0gLSBBbiBhcnJheSBvZiBET00gbm9kZXMgb3IgYW4gZW1wdHkgYXJyYXkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKHNlbGVjdG9yLCBjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IHNlbGVjdChzZWxlY3RvciwgY29udGV4dCk7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG5cbiAgaWYgKGlzRWxlbWVudChjb250ZXh0KSAmJiBjb250ZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgc2VsZWN0aW9uLnB1c2goY29udGV4dCk7XG4gIH1cblxuICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiIsIi8qKlxuICogQG5hbWUgaXNFbGVtZW50XG4gKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VsZW1lbnQgPSAodmFsdWUpID0+XG4gIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc2VsZWN0b3IsIGNvbnRleHQpID0+IHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICghY29udGV4dCB8fCAhaXNFbGVtZW50KGNvbnRleHQpKSB7XG4gICAgY29udGV4dCA9IHdpbmRvdy5kb2N1bWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICB9XG5cbiAgY29uc3Qgc2VsZWN0aW9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdGlvbik7XG59O1xuIiwiLyoqXG4gKiBGbGlwcyBnaXZlbiBJTlBVVCBlbGVtZW50cyBiZXR3ZWVuIG1hc2tlZCAoaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZSkgYW5kIHVubWFza2VkXG4gKiBAcGFyYW0ge0FycmF5LkhUTUxFbGVtZW50fSBmaWVsZHMgLSBBbiBhcnJheSBvZiBJTlBVVCBlbGVtZW50c1xuICogQHBhcmFtIHtCb29sZWFufSBtYXNrIC0gV2hldGhlciB0aGUgbWFzayBzaG91bGQgYmUgYXBwbGllZCwgaGlkaW5nIHRoZSBmaWVsZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmaWVsZCwgbWFzaykgPT4ge1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY2FwaXRhbGl6ZVwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwiYXV0b2NvcnJlY3RcIiwgXCJvZmZcIik7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgbWFzayA/IFwicGFzc3dvcmRcIiA6IFwidGV4dFwiKTtcbn07XG4iLCJjb25zdCByZXNvbHZlSWRSZWZzID0gcmVxdWlyZShcInJlc29sdmUtaWQtcmVmc1wiKTtcbmNvbnN0IHRvZ2dsZUZpZWxkTWFzayA9IHJlcXVpcmUoXCIuL3RvZ2dsZS1maWVsZC1tYXNrXCIpO1xuXG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgUFJFU1NFRCA9IFwiYXJpYS1wcmVzc2VkXCI7XG5jb25zdCBTSE9XX0FUVFIgPSBcImRhdGEtc2hvdy10ZXh0XCI7XG5jb25zdCBISURFX0FUVFIgPSBcImRhdGEtaGlkZS10ZXh0XCI7XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgd29yZCBcIlNob3dcIiAob3IgXCJzaG93XCIpIHdpdGggXCJIaWRlXCIgKG9yIFwiaGlkZVwiKSBpbiBhIHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzaG93VGV4dFxuICogQHJldHVybiB7c3Ryb25nfSBoaWRlVGV4dFxuICovXG5jb25zdCBnZXRIaWRlVGV4dCA9IChzaG93VGV4dCkgPT5cbiAgc2hvd1RleHQucmVwbGFjZSgvXFxiU2hvd1xcYi9pLCAoc2hvdykgPT4gYCR7c2hvd1swXSA9PT0gXCJTXCIgPyBcIkhcIiA6IFwiaFwifWlkZWApO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGRlY29yYXRlcyBhbiBIVE1MIGVsZW1lbnQgd2l0aCB0aGUgYWJpbGl0eSB0byB0b2dnbGUgdGhlXG4gKiBtYXNrZWQgc3RhdGUgb2YgYW4gaW5wdXQgZmllbGQgKGxpa2UgYSBwYXNzd29yZCkgd2hlbiBjbGlja2VkLlxuICogVGhlIGlkcyBvZiB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZCB3aWxsIGJlIHB1bGxlZCBkaXJlY3RseSBmcm9tIHRoZSBidXR0b24nc1xuICogYGFyaWEtY29udHJvbHNgIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWwgICAgUGFyZW50IGVsZW1lbnQgY29udGFpbmluZyB0aGUgZmllbGRzIHRvIGJlIG1hc2tlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoZWwpID0+IHtcbiAgLy8gdGhpcyBpcyB0aGUgKnRhcmdldCogc3RhdGU6XG4gIC8vICogaWYgdGhlIGVsZW1lbnQgaGFzIHRoZSBhdHRyIGFuZCBpdCdzICE9PSBcInRydWVcIiwgcHJlc3NlZCBpcyB0cnVlXG4gIC8vICogb3RoZXJ3aXNlLCBwcmVzc2VkIGlzIGZhbHNlXG4gIGNvbnN0IHByZXNzZWQgPVxuICAgIGVsLmhhc0F0dHJpYnV0ZShQUkVTU0VEKSAmJiBlbC5nZXRBdHRyaWJ1dGUoUFJFU1NFRCkgIT09IFwidHJ1ZVwiO1xuXG4gIGNvbnN0IGZpZWxkcyA9IHJlc29sdmVJZFJlZnMoZWwuZ2V0QXR0cmlidXRlKENPTlRST0xTKSk7XG4gIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4gdG9nZ2xlRmllbGRNYXNrKGZpZWxkLCBwcmVzc2VkKSk7XG5cbiAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoU0hPV19BVFRSKSkge1xuICAgIGVsLnNldEF0dHJpYnV0ZShTSE9XX0FUVFIsIGVsLnRleHRDb250ZW50KTtcbiAgfVxuXG4gIGNvbnN0IHNob3dUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKFNIT1dfQVRUUik7XG4gIGNvbnN0IGhpZGVUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKEhJREVfQVRUUikgfHwgZ2V0SGlkZVRleHQoc2hvd1RleHQpO1xuXG4gIGVsLnRleHRDb250ZW50ID0gcHJlc3NlZCA/IHNob3dUZXh0IDogaGlkZVRleHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZWwuc2V0QXR0cmlidXRlKFBSRVNTRUQsIHByZXNzZWQpO1xuICByZXR1cm4gcHJlc3NlZDtcbn07XG4iLCJjb25zdCBFWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xuY29uc3QgQ09OVFJPTFMgPSBcImFyaWEtY29udHJvbHNcIjtcbmNvbnN0IEhJRERFTiA9IFwiaGlkZGVuXCI7XG5cbm1vZHVsZS5leHBvcnRzID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgbGV0IHNhZmVFeHBhbmRlZCA9IGV4cGFuZGVkO1xuXG4gIGlmICh0eXBlb2Ygc2FmZUV4cGFuZGVkICE9PSBcImJvb2xlYW5cIikge1xuICAgIHNhZmVFeHBhbmRlZCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoRVhQQU5ERUQpID09PSBcImZhbHNlXCI7XG4gIH1cblxuICBidXR0b24uc2V0QXR0cmlidXRlKEVYUEFOREVELCBzYWZlRXhwYW5kZWQpO1xuXG4gIGNvbnN0IGlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShDT05UUk9MUyk7XG4gIGNvbnN0IGNvbnRyb2xzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyB0b2dnbGUgdGFyZ2V0IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgaWYgKHNhZmVFeHBhbmRlZCkge1xuICAgIGNvbnRyb2xzLnJlbW92ZUF0dHJpYnV0ZShISURERU4pO1xuICB9IGVsc2Uge1xuICAgIGNvbnRyb2xzLnNldEF0dHJpYnV0ZShISURERU4sIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVFeHBhbmRlZDtcbn07XG4iLCJjb25zdCBkZWJvdW5jZSA9IHJlcXVpcmUoXCIuL2RlYm91bmNlXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcblxuY29uc3QgQ0hFQ0tFRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtLS1jaGVja2VkYDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWxpZGF0ZShlbCkge1xuICBjb25zdCBpZCA9IGVsLmRhdGFzZXQudmFsaWRhdGlvbkVsZW1lbnQ7XG4gIGNvbnN0IGNoZWNrTGlzdCA9XG4gICAgaWQuY2hhckF0KDApID09PSBcIiNcIlxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKVxuICAgICAgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgaWYgKCFjaGVja0xpc3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRpb24gZWxlbWVudCBmb3VuZCB3aXRoIGlkOiBcIiR7aWR9XCJgKTtcbiAgfVxuXG4gIGxldCBzdGF0dXNTdW1tYXJ5ID0gXCJcIjtcbiAgT2JqZWN0LmVudHJpZXMoZWwuZGF0YXNldCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKFwidmFsaWRhdGVcIikpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvck5hbWUgPSBrZXkuc3Vic3RyKFwidmFsaWRhdGVcIi5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXR0ZXJuID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gICAgICBjb25zdCB2YWxpZGF0b3JTZWxlY3RvciA9IGBbZGF0YS12YWxpZGF0b3I9XCIke3ZhbGlkYXRvck5hbWV9XCJdYDtcbiAgICAgIGNvbnN0IHZhbGlkYXRvckNoZWNrYm94ID0gY2hlY2tMaXN0LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdG9yU2VsZWN0b3IpO1xuICAgICAgY29uc3QgdmFsaWRhdG9yUGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICAgIGNvbnN0IHN0YXR1c1N1bW1hcnlDb250YWluZXIgPSB2YWxpZGF0b3JQYXJlbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLXZhbGlkYXRpb24tc3RhdHVzXWAsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjaGVja2VkID0gdmFsaWRhdG9yUGF0dGVybi50ZXN0KGVsLnZhbHVlKTtcbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LmNsYXNzTGlzdC50b2dnbGUoQ0hFQ0tFRF9DTEFTUywgY2hlY2tlZCk7XG5cbiAgICAgIGlmICghdmFsaWRhdG9yQ2hlY2tib3gpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyB2YWxpZGF0b3IgY2hlY2tib3ggZm91bmQgZm9yOiBcIiR7dmFsaWRhdG9yTmFtZX1cImApO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgc3RhdHVzIHJlcG9ydHMgZm9yIGNoZWNrbGlzdCBpdGVtc1xuICAgICAgY29uc3Qgc3RhdHVzQ29tcGxldGUgPSBlbC5kYXRhc2V0LnZhbGlkYXRpb25Db21wbGV0ZSB8fCBcInN0YXR1cyBjb21wbGV0ZVwiO1xuICAgICAgY29uc3Qgc3RhdHVzSW5jb21wbGV0ZSA9XG4gICAgICAgIGVsLmRhdGFzZXQudmFsaWRhdGlvbkluY29tcGxldGUgfHwgXCJzdGF0dXMgaW5jb21wbGV0ZVwiO1xuICAgICAgbGV0IGNoZWNrYm94Q29udGVudCA9IGAke3ZhbGlkYXRvckNoZWNrYm94LnRleHRDb250ZW50fSBgO1xuXG4gICAgICBpZiAodmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LmNvbnRhaW5zKENIRUNLRURfQ0xBU1MpKSB7XG4gICAgICAgIGNoZWNrYm94Q29udGVudCArPSBzdGF0dXNDb21wbGV0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrYm94Q29udGVudCArPSBzdGF0dXNJbmNvbXBsZXRlO1xuICAgICAgfVxuXG4gICAgICAvLyBtb3ZlIHN0YXR1cyB1cGRhdGVzIHRvIGFyaWEtbGFiZWwgb24gY2hlY2tsaXN0IGl0ZW1cbiAgICAgIHZhbGlkYXRvckNoZWNrYm94LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgY2hlY2tib3hDb250ZW50KTtcblxuICAgICAgLy8gQ3JlYXRlIGEgc3VtbWFyeSBvZiBzdGF0dXMgZm9yIGFsbCBjaGVja2xpc3QgaXRlbXNcbiAgICAgIHN0YXR1c1N1bW1hcnkgKz0gYCR7Y2hlY2tib3hDb250ZW50fS4gYDtcblxuICAgICAgLy8gQWRkIHN1bW1hcnkgdG8gc2NyZWVuIHJlYWRlciBzdW1tYXJ5IGNvbnRhaW5lciwgYWZ0ZXIgYSBkZWxheVxuICAgICAgY29uc3Qgc3JVcGRhdGVTdGF0dXMgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgIHN0YXR1c1N1bW1hcnlDb250YWluZXIudGV4dENvbnRlbnQgPSBzdGF0dXNTdW1tYXJ5O1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHNyVXBkYXRlU3RhdHVzKCk7XG4gICAgfVxuICB9KTtcbn07XG4iXX0=
