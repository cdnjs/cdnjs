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
const DEFAULT_ERROR_LABEL_TEXT = "Error: This is not a valid file type.";
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
    const userErrorText = fileInputEl.dataset.errormessage;
    const errorMessageText = userErrorText || DEFAULT_ERROR_LABEL_TEXT;
    errorMessage.setAttribute("aria-hidden", true);

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
      errorMessage.textContent = errorMessageText;
      dropTarget.insertBefore(errorMessage, fileInputEl);
      const ariaLabelText = `${errorMessageText} ${DEFAULT_ARIA_LABEL_TEXT}`;
      fileInputEl.setAttribute("aria-label", ariaLabelText);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZWxlbWVudC1jbG9zZXN0L2VsZW1lbnQtY2xvc2VzdC5qcyIsIm5vZGVfbW9kdWxlcy9rZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2JlaGF2aW9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2NvbXBvc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvZGVsZWdhdGVBbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVjZXB0b3IvaWdub3JlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlY2VwdG9yL2tleW1hcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWNlcHRvci9vbmNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Jlc29sdmUtaWQtcmVmcy9pbmRleC5qcyIsInBhY2thZ2VzL191c2EtcGFzc3dvcmQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWFjY29yZGlvbi9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtYmFubmVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1idXR0b24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWNoYXJhY3Rlci1jb3VudC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtY29tYm8tYm94L3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1kYXRlLXBpY2tlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtZGF0ZS1yYW5nZS1waWNrZXIvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWZvb3Rlci9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtaGVhZGVyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1pbi1wYWdlLW5hdmlnYXRpb24vc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWlucHV0LW1hc2svc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLWxhbmd1YWdlLXNlbGVjdG9yL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS1tb2RhbC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtcmFuZ2Uvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXNlYXJjaC9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2Etc2tpcG5hdi9zcmMvaW5kZXguanMiLCJwYWNrYWdlcy91c2EtdGFibGUvc3JjL2luZGV4LmpzIiwicGFja2FnZXMvdXNhLXRpbWUtcGlja2VyL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS10b29sdGlwL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3VzYS12YWxpZGF0aW9uL3NyYy9pbmRleC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZy5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50cy5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL2luZGV4LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvc3RhcnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9hY3RpdmUtZWxlbWVudC5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZGVib3VuY2UuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9mb2N1cy10cmFwLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnQuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pb3MtZGV2aWNlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2Nyb2xsYmFyLXdpZHRoLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXMuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3QuanMiLCJwYWNrYWdlcy91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGUtZmllbGQtbWFzay5qcyIsInBhY2thZ2VzL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZS1mb3JtLWlucHV0LmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlLmpzIiwicGFja2FnZXMvdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdmFsaWRhdGUtaW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLENBQUMsVUFBVSxZQUFZLEVBQUU7RUFDeEIsSUFBSSxPQUFPLFlBQVksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixJQUFJLFlBQVksQ0FBQyxrQkFBa0IsSUFBSSxZQUFZLENBQUMscUJBQXFCLElBQUksU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFO01BQzVKLElBQUksT0FBTyxHQUFHLElBQUk7TUFDbEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO01BQ3JGLElBQUksS0FBSyxHQUFHLENBQUM7TUFFYixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUss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Q0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztFQUM1QyxPQUFPLE9BQU87QUFDaEIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxLQUFLLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFJLEtBQUssSUFBSztFQUM3QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDaEMsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztBQUNsQyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUksS0FBSyxJQUFLO0VBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNoQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUN0QyxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxLQUFLO0VB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QUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUN2RCxlQUFlLElBQUksY0FBYztNQUNuQyxDQUFDLE1BQU07UUFDTCxlQUFlLElBQUksZ0JBQWdCO01BQ3JDOztNQUVBO01BQ0EsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7O01BRTdEO01BQ0EsYUFBYSxJQUFJLEdBQUcsZUFBZSxJQUFJOztNQUV2QztNQUNBLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNO1FBQ3BDLHNCQUFzQixDQUFDLFdBQVcsR0FBRyxhQUFhO01BQ3BELENBQUMsRUFBRSxJQUFJLENBQUM7TUFFUixjQUFjLENBQUMsQ0FBQztJQUNsQjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcblxuKGZ1bmN0aW9uIChFbGVtZW50UHJvdG8pIHtcblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8ubWF0Y2hlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5tYXRjaGVzID0gRWxlbWVudFByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnRQcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBmdW5jdGlvbiBtYXRjaGVzKHNlbGVjdG9yKSB7XG5cdFx0XHR2YXIgZWxlbWVudCA9IHRoaXM7XG5cdFx0XHR2YXIgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0dmFyIGluZGV4ID0gMDtcblxuXHRcdFx0d2hpbGUgKGVsZW1lbnRzW2luZGV4XSAmJiBlbGVtZW50c1tpbmRleF0gIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0KytpbmRleDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudHNbaW5kZXhdKTtcblx0XHR9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBFbGVtZW50UHJvdG8uY2xvc2VzdCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdEVsZW1lbnRQcm90by5jbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xuXHRcdFx0dmFyIGVsZW1lbnQgPSB0aGlzO1xuXG5cdFx0XHR3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cdFx0XHRcdGlmIChlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9O1xuXHR9XG59KSh3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUpO1xuIiwiLyogZ2xvYmFsIGRlZmluZSwgS2V5Ym9hcmRFdmVudCwgbW9kdWxlICovXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCA9IHtcbiAgICBwb2x5ZmlsbDogcG9seWZpbGwsXG4gICAga2V5czoge1xuICAgICAgMzogJ0NhbmNlbCcsXG4gICAgICA2OiAnSGVscCcsXG4gICAgICA4OiAnQmFja3NwYWNlJyxcbiAgICAgIDk6ICdUYWInLFxuICAgICAgMTI6ICdDbGVhcicsXG4gICAgICAxMzogJ0VudGVyJyxcbiAgICAgIDE2OiAnU2hpZnQnLFxuICAgICAgMTc6ICdDb250cm9sJyxcbiAgICAgIDE4OiAnQWx0JyxcbiAgICAgIDE5OiAnUGF1c2UnLFxuICAgICAgMjA6ICdDYXBzTG9jaycsXG4gICAgICAyNzogJ0VzY2FwZScsXG4gICAgICAyODogJ0NvbnZlcnQnLFxuICAgICAgMjk6ICdOb25Db252ZXJ0JyxcbiAgICAgIDMwOiAnQWNjZXB0JyxcbiAgICAgIDMxOiAnTW9kZUNoYW5nZScsXG4gICAgICAzMjogJyAnLFxuICAgICAgMzM6ICdQYWdlVXAnLFxuICAgICAgMzQ6ICdQYWdlRG93bicsXG4gICAgICAzNTogJ0VuZCcsXG4gICAgICAzNjogJ0hvbWUnLFxuICAgICAgMzc6ICdBcnJvd0xlZnQnLFxuICAgICAgMzg6ICdBcnJvd1VwJyxcbiAgICAgIDM5OiAnQXJyb3dSaWdodCcsXG4gICAgICA0MDogJ0Fycm93RG93bicsXG4gICAgICA0MTogJ1NlbGVjdCcsXG4gICAgICA0MjogJ1ByaW50JyxcbiAgICAgIDQzOiAnRXhlY3V0ZScsXG4gICAgICA0NDogJ1ByaW50U2NyZWVuJyxcbiAgICAgIDQ1OiAnSW5zZXJ0JyxcbiAgICAgIDQ2OiAnRGVsZXRlJyxcbiAgICAgIDQ4OiBbJzAnLCAnKSddLFxuICAgICAgNDk6IFsnMScsICchJ10sXG4gICAgICA1MDogWycyJywgJ0AnXSxcbiAgICAgIDUxOiBbJzMnLCAnIyddLFxuICAgICAgNTI6IFsnNCcsICckJ10sXG4gICAgICA1MzogWyc1JywgJyUnXSxcbiAgICAgIDU0OiBbJzYnLCAnXiddLFxuICAgICAgNTU6IFsnNycsICcmJ10sXG4gICAgICA1NjogWyc4JywgJyonXSxcbiAgICAgIDU3OiBbJzknLCAnKCddLFxuICAgICAgOTE6ICdPUycsXG4gICAgICA5MzogJ0NvbnRleHRNZW51JyxcbiAgICAgIDE0NDogJ051bUxvY2snLFxuICAgICAgMTQ1OiAnU2Nyb2xsTG9jaycsXG4gICAgICAxODE6ICdWb2x1bWVNdXRlJyxcbiAgICAgIDE4MjogJ1ZvbHVtZURvd24nLFxuICAgICAgMTgzOiAnVm9sdW1lVXAnLFxuICAgICAgMTg2OiBbJzsnLCAnOiddLFxuICAgICAgMTg3OiBbJz0nLCAnKyddLFxuICAgICAgMTg4OiBbJywnLCAnPCddLFxuICAgICAgMTg5OiBbJy0nLCAnXyddLFxuICAgICAgMTkwOiBbJy4nLCAnPiddLFxuICAgICAgMTkxOiBbJy8nLCAnPyddLFxuICAgICAgMTkyOiBbJ2AnLCAnfiddLFxuICAgICAgMjE5OiBbJ1snLCAneyddLFxuICAgICAgMjIwOiBbJ1xcXFwnLCAnfCddLFxuICAgICAgMjIxOiBbJ10nLCAnfSddLFxuICAgICAgMjIyOiBbXCInXCIsICdcIiddLFxuICAgICAgMjI0OiAnTWV0YScsXG4gICAgICAyMjU6ICdBbHRHcmFwaCcsXG4gICAgICAyNDY6ICdBdHRuJyxcbiAgICAgIDI0NzogJ0NyU2VsJyxcbiAgICAgIDI0ODogJ0V4U2VsJyxcbiAgICAgIDI0OTogJ0VyYXNlRW9mJyxcbiAgICAgIDI1MDogJ1BsYXknLFxuICAgICAgMjUxOiAnWm9vbU91dCdcbiAgICB9XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24ga2V5cyAoRjEtMjQpLlxuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IDI1OyBpKyspIHtcbiAgICBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGwua2V5c1sxMTEgKyBpXSA9ICdGJyArIGk7XG4gIH1cblxuICAvLyBQcmludGFibGUgQVNDSUkgY2hhcmFjdGVycy5cbiAgdmFyIGxldHRlciA9ICcnO1xuICBmb3IgKGkgPSA2NTsgaSA8IDkxOyBpKyspIHtcbiAgICBsZXR0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuICAgIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbC5rZXlzW2ldID0gW2xldHRlci50b0xvd2VyQ2FzZSgpLCBsZXR0ZXIudG9VcHBlckNhc2UoKV07XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5ZmlsbCAoKSB7XG4gICAgaWYgKCEoJ0tleWJvYXJkRXZlbnQnIGluIHdpbmRvdykgfHxcbiAgICAgICAgJ2tleScgaW4gS2V5Ym9hcmRFdmVudC5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBQb2x5ZmlsbCBga2V5YCBvbiBgS2V5Ym9hcmRFdmVudGAuXG4gICAgdmFyIHByb3RvID0ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoeCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5Ym9hcmRldmVudEtleVBvbHlmaWxsLmtleXNbdGhpcy53aGljaCB8fCB0aGlzLmtleUNvZGVdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICAgICAgICBrZXkgPSBrZXlbK3RoaXMuc2hpZnRLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShLZXlib2FyZEV2ZW50LnByb3RvdHlwZSwgJ2tleScsIHByb3RvKTtcbiAgICByZXR1cm4gcHJvdG87XG4gIH1cblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCdrZXlib2FyZGV2ZW50LWtleS1wb2x5ZmlsbCcsIGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBrZXlib2FyZGV2ZW50S2V5UG9seWZpbGw7XG4gIH0gZWxzZSBpZiAod2luZG93KSB7XG4gICAgd2luZG93LmtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbCA9IGtleWJvYXJkZXZlbnRLZXlQb2x5ZmlsbDtcbiAgfVxuXG59KSgpO1xuIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmNvbnN0IGRlbGVnYXRlID0gcmVxdWlyZSgnLi4vZGVsZWdhdGUnKTtcbmNvbnN0IGRlbGVnYXRlQWxsID0gcmVxdWlyZSgnLi4vZGVsZWdhdGVBbGwnKTtcblxuY29uc3QgREVMRUdBVEVfUEFUVEVSTiA9IC9eKC4rKTpkZWxlZ2F0ZVxcKCguKylcXCkkLztcbmNvbnN0IFNQQUNFID0gJyAnO1xuXG5jb25zdCBnZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gIHZhciBtYXRjaCA9IHR5cGUubWF0Y2goREVMRUdBVEVfUEFUVEVSTik7XG4gIHZhciBzZWxlY3RvcjtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdHlwZSA9IG1hdGNoWzFdO1xuICAgIHNlbGVjdG9yID0gbWF0Y2hbMl07XG4gIH1cblxuICB2YXIgb3B0aW9ucztcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBjYXB0dXJlOiBwb3BLZXkoaGFuZGxlciwgJ2NhcHR1cmUnKSxcbiAgICAgIHBhc3NpdmU6IHBvcEtleShoYW5kbGVyLCAncGFzc2l2ZScpXG4gICAgfTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZGVsZWdhdGU6ICh0eXBlb2YgaGFuZGxlciA9PT0gJ29iamVjdCcpXG4gICAgICA/IGRlbGVnYXRlQWxsKGhhbmRsZXIpXG4gICAgICA6IHNlbGVjdG9yXG4gICAgICAgID8gZGVsZWdhdGUoc2VsZWN0b3IsIGhhbmRsZXIpXG4gICAgICAgIDogaGFuZGxlcixcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG5cbiAgaWYgKHR5cGUuaW5kZXhPZihTUEFDRSkgPiAtMSkge1xuICAgIHJldHVybiB0eXBlLnNwbGl0KFNQQUNFKS5tYXAoZnVuY3Rpb24oX3R5cGUpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe3R5cGU6IF90eXBlfSwgbGlzdGVuZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLnR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG52YXIgcG9wS2V5ID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGRlbGV0ZSBvYmpba2V5XTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWhhdmlvcihldmVudHMsIHByb3BzKSB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgICAucmVkdWNlKGZ1bmN0aW9uKG1lbW8sIHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModHlwZSwgZXZlbnRzW3R5cGVdKTtcbiAgICAgIHJldHVybiBtZW1vLmNvbmNhdChsaXN0ZW5lcnMpO1xuICAgIH0sIFtdKTtcblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZEJlaGF2aW9yKGVsZW1lbnQpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBsaXN0ZW5lci50eXBlLFxuICAgICAgICAgIGxpc3RlbmVyLmRlbGVnYXRlLFxuICAgICAgICAgIGxpc3RlbmVyLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmVCZWhhdmlvcihlbGVtZW50KSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgbGlzdGVuZXIudHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5kZWxlZ2F0ZSxcbiAgICAgICAgICBsaXN0ZW5lci5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHByb3BzKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbXBvc2UoZnVuY3Rpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9ucy5zb21lKGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBlKSA9PT0gZmFsc2U7XG4gICAgfSwgdGhpcyk7XG4gIH07XG59O1xuIiwiLy8gcG9seWZpbGwgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdFxucmVxdWlyZSgnZWxlbWVudC1jbG9zZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsZWdhdGUoc2VsZWN0b3IsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBkZWxlZ2F0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn07XG4iLCJjb25zdCBkZWxlZ2F0ZSA9IHJlcXVpcmUoJy4uL2RlbGVnYXRlJyk7XG5jb25zdCBjb21wb3NlID0gcmVxdWlyZSgnLi4vY29tcG9zZScpO1xuXG5jb25zdCBTUExBVCA9ICcqJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxlZ2F0ZUFsbChzZWxlY3RvcnMpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNlbGVjdG9ycylcblxuICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBoYW5kbGVyIGFuZCBpdCBhcHBsaWVzIHRvXG4gIC8vIGFsbCBlbGVtZW50cyAodGhlIFwiKlwiIENTUyBzZWxlY3RvciksIHRoZW4ganVzdCByZXR1cm4gdGhhdFxuICAvLyBoYW5kbGVyXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSBTUExBVCkge1xuICAgIHJldHVybiBzZWxlY3RvcnNbU1BMQVRdO1xuICB9XG5cbiAgY29uc3QgZGVsZWdhdGVzID0ga2V5cy5yZWR1Y2UoZnVuY3Rpb24obWVtbywgc2VsZWN0b3IpIHtcbiAgICBtZW1vLnB1c2goZGVsZWdhdGUoc2VsZWN0b3IsIHNlbGVjdG9yc1tzZWxlY3Rvcl0pKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfSwgW10pO1xuICByZXR1cm4gY29tcG9zZShkZWxlZ2F0ZXMpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlKGVsZW1lbnQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpZ25vcmFuY2UoZSkge1xuICAgIGlmIChlbGVtZW50ICE9PSBlLnRhcmdldCAmJiAhZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYmVoYXZpb3I6ICAgICByZXF1aXJlKCcuL2JlaGF2aW9yJyksXG4gIGRlbGVnYXRlOiAgICAgcmVxdWlyZSgnLi9kZWxlZ2F0ZScpLFxuICBkZWxlZ2F0ZUFsbDogIHJlcXVpcmUoJy4vZGVsZWdhdGVBbGwnKSxcbiAgaWdub3JlOiAgICAgICByZXF1aXJlKCcuL2lnbm9yZScpLFxuICBrZXltYXA6ICAgICAgIHJlcXVpcmUoJy4va2V5bWFwJyksXG59O1xuIiwicmVxdWlyZSgna2V5Ym9hcmRldmVudC1rZXktcG9seWZpbGwnKTtcblxuLy8gdGhlc2UgYXJlIHRoZSBvbmx5IHJlbGV2YW50IG1vZGlmaWVycyBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3Jtcyxcbi8vIGFjY29yZGluZyB0byBNRE46XG4vLyA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0tleWJvYXJkRXZlbnQvZ2V0TW9kaWZpZXJTdGF0ZT5cbmNvbnN0IE1PRElGSUVSUyA9IHtcbiAgJ0FsdCc6ICAgICAgJ2FsdEtleScsXG4gICdDb250cm9sJzogICdjdHJsS2V5JyxcbiAgJ0N0cmwnOiAgICAgJ2N0cmxLZXknLFxuICAnU2hpZnQnOiAgICAnc2hpZnRLZXknXG59O1xuXG5jb25zdCBNT0RJRklFUl9TRVBBUkFUT1IgPSAnKyc7XG5cbmNvbnN0IGdldEV2ZW50S2V5ID0gZnVuY3Rpb24oZXZlbnQsIGhhc01vZGlmaWVycykge1xuICB2YXIga2V5ID0gZXZlbnQua2V5O1xuICBpZiAoaGFzTW9kaWZpZXJzKSB7XG4gICAgZm9yICh2YXIgbW9kaWZpZXIgaW4gTU9ESUZJRVJTKSB7XG4gICAgICBpZiAoZXZlbnRbTU9ESUZJRVJTW21vZGlmaWVyXV0gPT09IHRydWUpIHtcbiAgICAgICAga2V5ID0gW21vZGlmaWVyLCBrZXldLmpvaW4oTU9ESUZJRVJfU0VQQVJBVE9SKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ga2V5bWFwKGtleXMpIHtcbiAgY29uc3QgaGFzTW9kaWZpZXJzID0gT2JqZWN0LmtleXMoa2V5cykuc29tZShmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4ga2V5LmluZGV4T2YoTU9ESUZJRVJfU0VQQVJBVE9SKSA+IC0xO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGtleSA9IGdldEV2ZW50S2V5KGV2ZW50LCBoYXNNb2RpZmllcnMpO1xuICAgIHJldHVybiBba2V5LCBrZXkudG9Mb3dlckNhc2UoKV1cbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBfa2V5KSB7XG4gICAgICAgIGlmIChfa2V5IGluIGtleXMpIHtcbiAgICAgICAgICByZXN1bHQgPSBrZXlzW2tleV0uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHVuZGVmaW5lZCk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5NT0RJRklFUlMgPSBNT0RJRklFUlM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uY2UobGlzdGVuZXIsIG9wdGlvbnMpIHtcbiAgdmFyIHdyYXBwZWQgPSBmdW5jdGlvbiB3cmFwcGVkT25jZShlKSB7XG4gICAgZS5jdXJyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCB3cmFwcGVkLCBvcHRpb25zKTtcbiAgICByZXR1cm4gbGlzdGVuZXIuY2FsbCh0aGlzLCBlKTtcbiAgfTtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSRV9UUklNID0gLyheXFxzKyl8KFxccyskKS9nO1xudmFyIFJFX1NQTElUID0gL1xccysvO1xuXG52YXIgdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbVxuICA/IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHN0cikgeyByZXR1cm4gc3RyLnJlcGxhY2UoUkVfVFJJTSwgJycpOyB9O1xuXG52YXIgcXVlcnlCeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcignW2lkPVwiJyArIGlkLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl0nKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZUlkcyhpZHMsIGRvYykge1xuICBpZiAodHlwZW9mIGlkcyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBnb3QgJyArICh0eXBlb2YgaWRzKSk7XG4gIH1cblxuICBpZiAoIWRvYykge1xuICAgIGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgfVxuXG4gIHZhciBnZXRFbGVtZW50QnlJZCA9IGRvYy5nZXRFbGVtZW50QnlJZFxuICAgID8gZG9jLmdldEVsZW1lbnRCeUlkLmJpbmQoZG9jKVxuICAgIDogcXVlcnlCeUlkLmJpbmQoZG9jKTtcblxuICBpZHMgPSB0cmltKGlkcykuc3BsaXQoUkVfU1BMSVQpO1xuXG4gIC8vIFhYWCB3ZSBjYW4gc2hvcnQtY2lyY3VpdCBoZXJlIGJlY2F1c2UgdHJpbW1pbmcgYW5kIHNwbGl0dGluZyBhXG4gIC8vIHN0cmluZyBvZiBqdXN0IHdoaXRlc3BhY2UgcHJvZHVjZXMgYW4gYXJyYXkgY29udGFpbmluZyBhIHNpbmdsZSxcbiAgLy8gZW1wdHkgc3RyaW5nXG4gIGlmIChpZHMubGVuZ3RoID09PSAxICYmIGlkc1swXSA9PT0gJycpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICByZXR1cm4gaWRzXG4gICAgLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIGVsID0gZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgd2l0aCBpZDogXCInICsgaWQgKyAnXCInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbDtcbiAgICB9KTtcbn07XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHRvZ2dsZUZvcm1JbnB1dCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy90b2dnbGUtZm9ybS1pbnB1dFwiKTtcblxuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IExJTksgPSBgLiR7UFJFRklYfS1zaG93LXBhc3N3b3JkYDtcblxuZnVuY3Rpb24gdG9nZ2xlKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRvZ2dsZUZvcm1JbnB1dCh0aGlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcih7XG4gIFtDTElDS106IHtcbiAgICBbTElOS106IHRvZ2dsZSxcbiAgfSxcbn0pO1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IGlzRWxlbWVudEluVmlld3BvcnQgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW4tdmlld3BvcnRcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQUNDT1JESU9OID0gYC4ke1BSRUZJWH0tYWNjb3JkaW9uLCAuJHtQUkVGSVh9LWFjY29yZGlvbi0tYm9yZGVyZWRgO1xuY29uc3QgQkFOTkVSX0JVVFRPTiA9IGAuJHtQUkVGSVh9LWJhbm5lcl9fYnV0dG9uYDtcbmNvbnN0IEJVVFRPTiA9IGAuJHtQUkVGSVh9LWFjY29yZGlvbl9fYnV0dG9uW2FyaWEtY29udHJvbHNdOm5vdCgke0JBTk5FUl9CVVRUT059KWA7XG5jb25zdCBFWFBBTkRFRCA9IFwiYXJpYS1leHBhbmRlZFwiO1xuY29uc3QgTVVMVElTRUxFQ1RBQkxFID0gXCJkYXRhLWFsbG93LW11bHRpcGxlXCI7XG5cbi8qKlxuICogR2V0IGFuIEFycmF5IG9mIGJ1dHRvbiBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBhY2NvcmRpb24gZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGFjY29yZGlvblxuICogQHJldHVybiB7YXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRBY2NvcmRpb25CdXR0b25zID0gKGFjY29yZGlvbikgPT4ge1xuICBjb25zdCBidXR0b25zID0gc2VsZWN0KEJVVFRPTiwgYWNjb3JkaW9uKTtcblxuICByZXR1cm4gYnV0dG9ucy5maWx0ZXIoKGJ1dHRvbikgPT4gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKSA9PT0gYWNjb3JkaW9uKTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIGEgYnV0dG9uJ3MgXCJwcmVzc2VkXCIgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBidXR0b25cbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGV4cGFuZGVkIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSByZXN1bHRpbmcgc3RhdGVcbiAqL1xuY29uc3QgdG9nZ2xlQnV0dG9uID0gKGJ1dHRvbiwgZXhwYW5kZWQpID0+IHtcbiAgY29uc3QgYWNjb3JkaW9uID0gYnV0dG9uLmNsb3Nlc3QoQUNDT1JESU9OKTtcbiAgbGV0IHNhZmVFeHBhbmRlZCA9IGV4cGFuZGVkO1xuXG4gIGlmICghYWNjb3JkaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0JVVFRPTn0gaXMgbWlzc2luZyBvdXRlciAke0FDQ09SRElPTn1gKTtcbiAgfVxuXG4gIHNhZmVFeHBhbmRlZCA9IHRvZ2dsZShidXR0b24sIGV4cGFuZGVkKTtcblxuICAvLyBYWFggbXVsdGlzZWxlY3RhYmxlIGlzIG9wdC1pbiwgdG8gcHJlc2VydmUgbGVnYWN5IGJlaGF2aW9yXG4gIGNvbnN0IG11bHRpc2VsZWN0YWJsZSA9IGFjY29yZGlvbi5oYXNBdHRyaWJ1dGUoTVVMVElTRUxFQ1RBQkxFKTtcblxuICBpZiAoc2FmZUV4cGFuZGVkICYmICFtdWx0aXNlbGVjdGFibGUpIHtcbiAgICBnZXRBY2NvcmRpb25CdXR0b25zKGFjY29yZGlvbikuZm9yRWFjaCgob3RoZXIpID0+IHtcbiAgICAgIGlmIChvdGhlciAhPT0gYnV0dG9uKSB7XG4gICAgICAgIHRvZ2dsZShvdGhlciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGJ1dHRvblxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZVxuICovXG5jb25zdCBzaG93QnV0dG9uID0gKGJ1dHRvbikgPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgdHJ1ZSk7XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gYnV0dG9uXG4gKiBAcmV0dXJuIHtib29sZWFufSBmYWxzZVxuICovXG5jb25zdCBoaWRlQnV0dG9uID0gKGJ1dHRvbikgPT4gdG9nZ2xlQnV0dG9uKGJ1dHRvbiwgZmFsc2UpO1xuXG5jb25zdCBhY2NvcmRpb24gPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtCVVRUT05dKCkge1xuICAgICAgICB0b2dnbGVCdXR0b24odGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKEVYUEFOREVEKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAvLyBXZSB3ZXJlIGp1c3QgZXhwYW5kZWQsIGJ1dCBpZiBhbm90aGVyIGFjY29yZGlvbiB3YXMgYWxzbyBqdXN0XG4gICAgICAgICAgLy8gY29sbGFwc2VkLCB3ZSBtYXkgbm8gbG9uZ2VyIGJlIGluIHRoZSB2aWV3cG9ydC4gVGhpcyBlbnN1cmVzXG4gICAgICAgICAgLy8gdGhhdCB3ZSBhcmUgc3RpbGwgdmlzaWJsZSwgc28gdGhlIHVzZXIgaXNuJ3QgY29uZnVzZWQuXG4gICAgICAgICAgaWYgKCFpc0VsZW1lbnRJblZpZXdwb3J0KHRoaXMpKSB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0KEJVVFRPTiwgcm9vdCkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0b2dnbGVCdXR0b24oYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIEFDQ09SRElPTixcbiAgICBCVVRUT04sXG4gICAgc2hvdzogc2hvd0J1dHRvbixcbiAgICBoaWRlOiBoaWRlQnV0dG9uLFxuICAgIHRvZ2dsZTogdG9nZ2xlQnV0dG9uLFxuICAgIGdldEJ1dHRvbnM6IGdldEFjY29yZGlvbkJ1dHRvbnMsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFjY29yZGlvbjtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZVwiKTtcblxuY29uc3QgSEVBREVSID0gYC4ke1BSRUZJWH0tYmFubmVyX19oZWFkZXJgO1xuY29uc3QgRVhQQU5ERURfQ0xBU1MgPSBgJHtQUkVGSVh9LWJhbm5lcl9faGVhZGVyLS1leHBhbmRlZGA7XG5jb25zdCBCQU5ORVJfQlVUVE9OID0gYCR7SEVBREVSfSBbYXJpYS1jb250cm9sc11gO1xuXG4vKipcbiAqIFRvZ2dsZSBCYW5uZXIgZGlzcGxheSBhbmQgY2xhc3MuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5jb25zdCB0b2dnbGVCYW5uZXIgPSBmdW5jdGlvbiB0b2dnbGVFbChldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoQkFOTkVSX0JVVFRPTik7XG5cbiAgdG9nZ2xlKHRyaWdnZXIpO1xuICB0aGlzLmNsb3Nlc3QoSEVBREVSKS5jbGFzc0xpc3QudG9nZ2xlKEVYUEFOREVEX0NMQVNTKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQkFOTkVSX0JVVFRPTl06IHRvZ2dsZUJhbm5lcixcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3QoQkFOTkVSX0JVVFRPTiwgcm9vdCkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRF9DTEFTUykgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0b2dnbGUoYnV0dG9uLCBleHBhbmRlZCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9LFxuKTtcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcblxuY29uc3QgQU5DSE9SX0JVVFRPTiA9IGBhW2NsYXNzKj1cInVzYS1idXR0b25cIl1gO1xuXG5jb25zdCB0b2dnbGVCdXR0b24gPSAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG59O1xuXG5jb25zdCBhbmNob3JCdXR0b24gPSBiZWhhdmlvcih7XG4gIGtleWRvd246IHtcbiAgICBbQU5DSE9SX0JVVFRPTl06IGtleW1hcCh7XG4gICAgICBcIiBcIjogdG9nZ2xlQnV0dG9uLFxuICAgIH0pLFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5jaG9yQnV0dG9uO1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgZGVib3VuY2UgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZGVib3VuY2VcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBDSEFSQUNURVJfQ09VTlRfQ0xBU1MgPSBgJHtQUkVGSVh9LWNoYXJhY3Rlci1jb3VudGA7XG5jb25zdCBDSEFSQUNURVJfQ09VTlQgPSBgLiR7Q0hBUkFDVEVSX0NPVU5UX0NMQVNTfWA7XG5jb25zdCBGT1JNX0dST1VQX0NMQVNTID0gYCR7UFJFRklYfS1mb3JtLWdyb3VwYDtcbmNvbnN0IEZPUk1fR1JPVVBfRVJST1JfQ0xBU1MgPSBgJHtGT1JNX0dST1VQX0NMQVNTfS0tZXJyb3JgO1xuY29uc3QgRk9STV9HUk9VUCA9IGAuJHtGT1JNX0dST1VQX0NMQVNTfWA7XG5jb25zdCBMQUJFTF9DTEFTUyA9IGAke1BSRUZJWH0tbGFiZWxgO1xuY29uc3QgTEFCRUxfRVJST1JfQ0xBU1MgPSBgJHtMQUJFTF9DTEFTU30tLWVycm9yYDtcbmNvbnN0IElOUFVUID0gYC4ke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19maWVsZGA7XG5jb25zdCBJTlBVVF9FUlJPUl9DTEFTUyA9IGAke1BSRUZJWH0taW5wdXQtLWVycm9yYDtcbmNvbnN0IE1FU1NBR0UgPSBgLiR7UFJFRklYfS1jaGFyYWN0ZXItY291bnRfX21lc3NhZ2VgO1xuY29uc3QgVkFMSURBVElPTl9NRVNTQUdFID0gXCJUaGUgY29udGVudCBpcyB0b28gbG9uZy5cIjtcbmNvbnN0IE1FU1NBR0VfSU5WQUxJRF9DTEFTUyA9IGAke1BSRUZJWH0tY2hhcmFjdGVyLWNvdW50X19zdGF0dXMtLWludmFsaWRgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfQ0xBU1MgPSBgJHtDSEFSQUNURVJfQ09VTlRfQ0xBU1N9X19zdGF0dXNgO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWV9DTEFTUyA9IGAke0NIQVJBQ1RFUl9DT1VOVF9DTEFTU31fX3NyLXN0YXR1c2A7XG5jb25zdCBTVEFUVVNfTUVTU0FHRSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9DTEFTU31gO1xuY29uc3QgU1RBVFVTX01FU1NBR0VfU1JfT05MWSA9IGAuJHtTVEFUVVNfTUVTU0FHRV9TUl9PTkxZX0NMQVNTfWA7XG5jb25zdCBERUZBVUxUX1NUQVRVU19MQUJFTCA9IGBjaGFyYWN0ZXJzIGFsbG93ZWRgO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJvb3QsIGZvcm0gZ3JvdXAsIGxhYmVsLCBhbmQgbWVzc2FnZSBlbGVtZW50cyBmb3IgYW4gY2hhcmFjdGVyIGNvdW50IGlucHV0XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgVGhlIGNoYXJhY3RlciBjb3VudCBpbnB1dCBlbGVtZW50XG4gKiBAcmV0dXJucyB7Q2hhcmFjdGVyQ291bnRFbGVtZW50c30gZWxlbWVudHMgVGhlIHJvb3QgZm9ybSBncm91cCwgaW5wdXQgSUQsIGxhYmVsLCBhbmQgbWVzc2FnZSBlbGVtZW50LlxuICovXG5jb25zdCBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgY2hhcmFjdGVyQ291bnRFbCA9IGlucHV0RWwuY2xvc2VzdChDSEFSQUNURVJfQ09VTlQpO1xuXG4gIGlmICghY2hhcmFjdGVyQ291bnRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtJTlBVVH0gaXMgbWlzc2luZyBvdXRlciAke0NIQVJBQ1RFUl9DT1VOVH1gKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm1Hcm91cEVsID0gY2hhcmFjdGVyQ291bnRFbC5xdWVyeVNlbGVjdG9yKEZPUk1fR1JPVVApO1xuXG4gIGNvbnN0IGlucHV0SUQgPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICBjb25zdCBsYWJlbEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGFiZWxbZm9yPSR7aW5wdXRJRH1dYCk7XG5cbiAgY29uc3QgbWVzc2FnZUVsID0gY2hhcmFjdGVyQ291bnRFbC5xdWVyeVNlbGVjdG9yKE1FU1NBR0UpO1xuXG4gIGlmICghbWVzc2FnZUVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke0NIQVJBQ1RFUl9DT1VOVH0gaXMgbWlzc2luZyBpbm5lciAke01FU1NBR0V9YCk7XG4gIH1cblxuICByZXR1cm4geyBjaGFyYWN0ZXJDb3VudEVsLCBmb3JtR3JvdXBFbCwgaW5wdXRJRCwgbGFiZWxFbCwgbWVzc2FnZUVsIH07XG59O1xuXG4vKipcbiAqIE1vdmUgbWF4bGVuZ3RoIGF0dHJpYnV0ZSB0byBhIGRhdGEgYXR0cmlidXRlIG9uIHVzYS1jaGFyYWN0ZXItY291bnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudH0gaW5wdXRFbCBUaGUgY2hhcmFjdGVyIGNvdW50IGlucHV0IGVsZW1lbnRcbiAqL1xuY29uc3Qgc2V0RGF0YUxlbmd0aCA9IChpbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHsgY2hhcmFjdGVyQ291bnRFbCB9ID0gZ2V0Q2hhcmFjdGVyQ291bnRFbGVtZW50cyhpbnB1dEVsKTtcblxuICBjb25zdCBtYXhsZW5ndGggPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiKTtcblxuICBpZiAoIW1heGxlbmd0aCkgcmV0dXJuO1xuXG4gIGlucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwibWF4bGVuZ3RoXCIpO1xuICBjaGFyYWN0ZXJDb3VudEVsLnNldEF0dHJpYnV0ZShcImRhdGEtbWF4bGVuZ3RoXCIsIG1heGxlbmd0aCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgYXBwZW5kIHN0YXR1cyBtZXNzYWdlcyBmb3IgdmlzdWFsIGFuZCBzY3JlZW4gcmVhZGVyc1xuICpcbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGNoYXJhY3RlckNvdW50RWwgLSBEaXYgd2l0aCBgLnVzYS1jaGFyYWN0ZXItY291bnRgIGNsYXNzXG4gKiBAZGVzY3JpcHRpb24gIENyZWF0ZSB0d28gc3RhdHVzIG1lc3NhZ2VzIGZvciBudW1iZXIgb2YgY2hhcmFjdGVycyBsZWZ0O1xuICogb25lIHZpc3VhbCBzdGF0dXMgYW5kIGFub3RoZXIgZm9yIHNjcmVlbiByZWFkZXJzXG4gKi9cbmNvbnN0IGNyZWF0ZVN0YXR1c01lc3NhZ2VzID0gKGNoYXJhY3RlckNvdW50RWwpID0+IHtcbiAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHNyU3RhdHVzTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1heExlbmd0aCA9IGNoYXJhY3RlckNvdW50RWwuZGF0YXNldC5tYXhsZW5ndGg7XG4gIGNvbnN0IGRlZmF1bHRNZXNzYWdlID0gYCR7bWF4TGVuZ3RofSAke0RFRkFVTFRfU1RBVFVTX0xBQkVMfWA7XG5cbiAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKGAke1NUQVRVU19NRVNTQUdFX0NMQVNTfWAsIFwidXNhLWhpbnRcIik7XG4gIHNyU3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFxuICAgIGAke1NUQVRVU19NRVNTQUdFX1NSX09OTFlfQ0xBU1N9YCxcbiAgICBcInVzYS1zci1vbmx5XCIsXG4gICk7XG5cbiAgc3RhdHVzTWVzc2FnZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgc3JTdGF0dXNNZXNzYWdlLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcblxuICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gZGVmYXVsdE1lc3NhZ2U7XG4gIHNyU3RhdHVzTWVzc2FnZS50ZXh0Q29udGVudCA9IGRlZmF1bHRNZXNzYWdlO1xuXG4gIGNoYXJhY3RlckNvdW50RWwuYXBwZW5kKHN0YXR1c01lc3NhZ2UsIHNyU3RhdHVzTWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgbWVzc2FnZSB3aXRoIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY3VycmVudExlbmd0aCAtIFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyB1c2VkXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4TGVuZ3RoIC0gVGhlIHRvdGFsIG51bWJlciBvZiBjaGFyYWN0ZXJzIGFsbG93ZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGRlc2NyaXB0aW9uIG9mIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnRcbiAqL1xuY29uc3QgZ2V0Q291bnRNZXNzYWdlID0gKGN1cnJlbnRMZW5ndGgsIG1heExlbmd0aCkgPT4ge1xuICBsZXQgbmV3TWVzc2FnZSA9IFwiXCI7XG5cbiAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDApIHtcbiAgICBuZXdNZXNzYWdlID0gYCR7bWF4TGVuZ3RofSAke0RFRkFVTFRfU1RBVFVTX0xBQkVMfWA7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKG1heExlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgIGNvbnN0IGNoYXJhY3RlcnMgPSBgY2hhcmFjdGVyJHtkaWZmZXJlbmNlID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gICAgY29uc3QgZ3VpZGFuY2UgPSBjdXJyZW50TGVuZ3RoID4gbWF4TGVuZ3RoID8gXCJvdmVyIGxpbWl0XCIgOiBcImxlZnRcIjtcblxuICAgIG5ld01lc3NhZ2UgPSBgJHtkaWZmZXJlbmNlfSAke2NoYXJhY3RlcnN9ICR7Z3VpZGFuY2V9YDtcbiAgfVxuXG4gIHJldHVybiBuZXdNZXNzYWdlO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjaGFyYWN0ZXIgY291bnQgc3RhdHVzIGZvciBzY3JlZW4gcmVhZGVycyBhZnRlciBhIDEwMDBtcyBkZWxheS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBtc2dFbCAtIFRoZSBzY3JlZW4gcmVhZGVyIHN0YXR1cyBtZXNzYWdlIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0dXNNZXNzYWdlIC0gQSBzdHJpbmcgb2YgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIHN0YXR1c1xuICovXG5jb25zdCBzclVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKChtc2dFbCwgc3RhdHVzTWVzc2FnZSkgPT4ge1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBtc2dFbDtcbiAgc3JTdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gc3RhdHVzTWVzc2FnZTtcbn0sIDEwMDApO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgY2hhcmFjdGVyIGNvdW50IGNvbXBvbmVudFxuICpcbiAqIEBkZXNjcmlwdGlvbiBPbiBpbnB1dCwgaXQgd2lsbCB1cGRhdGUgdmlzdWFsIHN0YXR1cywgc2NyZWVucmVhZGVyXG4gKiBzdGF0dXMgYW5kIHVwZGF0ZSBpbnB1dCB2YWxpZGF0aW9uIChpZiBvdmVyIGNoYXJhY3RlciBsZW5ndGgpXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFRleHRBcmVhRWxlbWVudH0gaW5wdXRFbCBUaGUgY2hhcmFjdGVyIGNvdW50IGlucHV0IGVsZW1lbnRcbiAqL1xuY29uc3QgdXBkYXRlQ291bnRNZXNzYWdlID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsLCBsYWJlbEVsLCBmb3JtR3JvdXBFbCB9ID1cbiAgICBnZXRDaGFyYWN0ZXJDb3VudEVsZW1lbnRzKGlucHV0RWwpO1xuICBjb25zdCBjdXJyZW50TGVuZ3RoID0gaW5wdXRFbC52YWx1ZS5sZW5ndGg7XG4gIGNvbnN0IG1heExlbmd0aCA9IHBhcnNlSW50KFxuICAgIGNoYXJhY3RlckNvdW50RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhsZW5ndGhcIiksXG4gICAgMTAsXG4gICk7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBjaGFyYWN0ZXJDb3VudEVsLnF1ZXJ5U2VsZWN0b3IoU1RBVFVTX01FU1NBR0UpO1xuICBjb25zdCBzclN0YXR1c01lc3NhZ2UgPSBjaGFyYWN0ZXJDb3VudEVsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgU1RBVFVTX01FU1NBR0VfU1JfT05MWSxcbiAgKTtcbiAgY29uc3QgY3VycmVudFN0YXR1c01lc3NhZ2UgPSBnZXRDb3VudE1lc3NhZ2UoY3VycmVudExlbmd0aCwgbWF4TGVuZ3RoKTtcblxuICBpZiAoIW1heExlbmd0aCkgcmV0dXJuO1xuXG4gIGNvbnN0IGlzT3ZlckxpbWl0ID0gY3VycmVudExlbmd0aCAmJiBjdXJyZW50TGVuZ3RoID4gbWF4TGVuZ3RoO1xuXG4gIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBjdXJyZW50U3RhdHVzTWVzc2FnZTtcbiAgc3JVcGRhdGVTdGF0dXMoc3JTdGF0dXNNZXNzYWdlLCBjdXJyZW50U3RhdHVzTWVzc2FnZSk7XG5cbiAgaWYgKGlzT3ZlckxpbWl0ICYmICFpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgaW5wdXRFbC5zZXRDdXN0b21WYWxpZGl0eShWQUxJREFUSU9OX01FU1NBR0UpO1xuICB9XG5cbiAgaWYgKCFpc092ZXJMaW1pdCAmJiBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlID09PSBWQUxJREFUSU9OX01FU1NBR0UpIHtcbiAgICBpbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG5cbiAgaWYgKGZvcm1Hcm91cEVsKSB7XG4gICAgZm9ybUdyb3VwRWwuY2xhc3NMaXN0LnRvZ2dsZShGT1JNX0dST1VQX0VSUk9SX0NMQVNTLCBpc092ZXJMaW1pdCk7XG4gIH1cblxuICBpZiAobGFiZWxFbCkge1xuICAgIGxhYmVsRWwuY2xhc3NMaXN0LnRvZ2dsZShMQUJFTF9FUlJPUl9DTEFTUywgaXNPdmVyTGltaXQpO1xuICB9XG5cbiAgaW5wdXRFbC5jbGFzc0xpc3QudG9nZ2xlKElOUFVUX0VSUk9SX0NMQVNTLCBpc092ZXJMaW1pdCk7XG4gIHN0YXR1c01lc3NhZ2UuY2xhc3NMaXN0LnRvZ2dsZShNRVNTQUdFX0lOVkFMSURfQ0xBU1MsIGlzT3ZlckxpbWl0KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBjb21wb25lbnRcbiAqXG4gKiBAZGVzY3JpcHRpb24gT24gaW5pdCB0aGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIGVsZW1lbnRzIGFuZCB1cGRhdGUgYW55XG4gKiBhdHRyaWJ1dGVzIHNvIGl0IGNhbiB0ZWxsIHRoZSB1c2VyIGhvdyBtYW55IGNoYXJhY3RlcnMgYXJlIGxlZnQuXG4gKiBAcGFyYW0gIHtIVE1MSW5wdXRFbGVtZW50fEhUTUxUZXh0QXJlYUVsZW1lbnR9IGlucHV0RWwgdGhlIGNvbXBvbmVudHMgaW5wdXRcbiAqL1xuY29uc3QgZW5oYW5jZUNoYXJhY3RlckNvdW50ID0gKGlucHV0RWwpID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXJDb3VudEVsLCBtZXNzYWdlRWwgfSA9IGdldENoYXJhY3RlckNvdW50RWxlbWVudHMoaW5wdXRFbCk7XG5cbiAgLy8gSGlkZSBoaW50IGFuZCByZW1vdmUgYXJpYS1saXZlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBtZXNzYWdlRWwuY2xhc3NMaXN0LmFkZChcInVzYS1zci1vbmx5XCIpO1xuICBtZXNzYWdlRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1saXZlXCIpO1xuXG4gIHNldERhdGFMZW5ndGgoaW5wdXRFbCk7XG4gIGNyZWF0ZVN0YXR1c01lc3NhZ2VzKGNoYXJhY3RlckNvdW50RWwpO1xufTtcblxuY29uc3QgY2hhcmFjdGVyQ291bnQgPSBiZWhhdmlvcihcbiAge1xuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICB1cGRhdGVDb3VudE1lc3NhZ2UodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdChJTlBVVCwgcm9vdCkuZm9yRWFjaCgoaW5wdXQpID0+IGVuaGFuY2VDaGFyYWN0ZXJDb3VudChpbnB1dCkpO1xuICAgIH0sXG4gICAgRk9STV9HUk9VUF9FUlJPUl9DTEFTUyxcbiAgICBMQUJFTF9FUlJPUl9DTEFTUyxcbiAgICBJTlBVVF9FUlJPUl9DTEFTUyxcbiAgICBNRVNTQUdFX0lOVkFMSURfQ0xBU1MsXG4gICAgVkFMSURBVElPTl9NRVNTQUdFLFxuICAgIFNUQVRVU19NRVNTQUdFX0NMQVNTLFxuICAgIFNUQVRVU19NRVNTQUdFX1NSX09OTFlfQ0xBU1MsXG4gICAgREVGQVVMVF9TVEFUVVNfTEFCRUwsXG4gICAgY3JlYXRlU3RhdHVzTWVzc2FnZXMsXG4gICAgZ2V0Q291bnRNZXNzYWdlLFxuICAgIHVwZGF0ZUNvdW50TWVzc2FnZSxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmFjdGVyQ291bnQ7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5cbmNvbnN0IENPTUJPX0JPWF9DTEFTUyA9IGAke1BSRUZJWH0tY29tYm8tYm94YDtcbmNvbnN0IENPTUJPX0JPWF9QUklTVElORV9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU30tLXByaXN0aW5lYDtcbmNvbnN0IFNFTEVDVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX3NlbGVjdGA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2lucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2NsZWFyLWlucHV0YDtcbmNvbnN0IENMRUFSX0lOUFVUX0JVVFRPTl9XUkFQUEVSX0NMQVNTID0gYCR7Q0xFQVJfSU5QVVRfQlVUVE9OX0NMQVNTfV9fd3JhcHBlcmA7XG5jb25zdCBJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTID0gYCR7Q09NQk9fQk9YX0NMQVNTfV9faW5wdXQtYnV0dG9uLXNlcGFyYXRvcmA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X190b2dnbGUtbGlzdGA7XG5jb25zdCBUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTUyA9IGAke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31fX3dyYXBwZXJgO1xuY29uc3QgTElTVF9DTEFTUyA9IGAke0NPTUJPX0JPWF9DTEFTU31fX2xpc3RgO1xuY29uc3QgTElTVF9PUFRJT05fQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19saXN0LW9wdGlvbmA7XG5jb25zdCBMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1mb2N1c2VkYDtcbmNvbnN0IExJU1RfT1BUSU9OX1NFTEVDVEVEX0NMQVNTID0gYCR7TElTVF9PUFRJT05fQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBTVEFUVVNfQ0xBU1MgPSBgJHtDT01CT19CT1hfQ0xBU1N9X19zdGF0dXNgO1xuXG5jb25zdCBDT01CT19CT1ggPSBgLiR7Q09NQk9fQk9YX0NMQVNTfWA7XG5jb25zdCBTRUxFQ1QgPSBgLiR7U0VMRUNUX0NMQVNTfWA7XG5jb25zdCBJTlBVVCA9IGAuJHtJTlBVVF9DTEFTU31gO1xuY29uc3QgQ0xFQVJfSU5QVVRfQlVUVE9OID0gYC4ke0NMRUFSX0lOUFVUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgVE9HR0xFX0xJU1RfQlVUVE9OID0gYC4ke1RPR0dMRV9MSVNUX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgTElTVCA9IGAuJHtMSVNUX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTiA9IGAuJHtMSVNUX09QVElPTl9DTEFTU31gO1xuY29uc3QgTElTVF9PUFRJT05fRk9DVVNFRCA9IGAuJHtMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTfWA7XG5jb25zdCBMSVNUX09QVElPTl9TRUxFQ1RFRCA9IGAuJHtMSVNUX09QVElPTl9TRUxFQ1RFRF9DTEFTU31gO1xuY29uc3QgU1RBVFVTID0gYC4ke1NUQVRVU19DTEFTU31gO1xuXG5jb25zdCBERUZBVUxUX0ZJTFRFUiA9IFwiLip7e3F1ZXJ5fX0uKlwiO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR8SFRNTFNlbGVjdEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIGNvbWJvIGJveC5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IENvbWJvQm94Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gY29tYm9Cb3hFbFxuICogQHByb3BlcnR5IHtIVE1MU2VsZWN0RWxlbWVudH0gc2VsZWN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRFbFxuICogQHByb3BlcnR5IHtIVE1MVUxpc3RFbGVtZW50fSBsaXN0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IHN0YXR1c0VsXG4gKiBAcHJvcGVydHkge0hUTUxMSUVsZW1lbnR9IGZvY3VzZWRPcHRpb25FbFxuICogQHByb3BlcnR5IHtIVE1MTElFbGVtZW50fSBzZWxlY3RlZE9wdGlvbkVsXG4gKiBAcHJvcGVydHkge0hUTUxCdXR0b25FbGVtZW50fSB0b2dnbGVMaXN0QnRuRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNsZWFySW5wdXRCdG5FbFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1ByaXN0aW5lXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRpc2FibGVGaWx0ZXJpbmdcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveFxuICogQHJldHVybnMge0NvbWJvQm94Q29udGV4dH0gZWxlbWVudHNcbiAqL1xuY29uc3QgZ2V0Q29tYm9Cb3hDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGNvbWJvQm94RWwgPSBlbC5jbG9zZXN0KENPTUJPX0JPWCk7XG5cbiAgaWYgKCFjb21ib0JveEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtDT01CT19CT1h9YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTRUxFQ1QpO1xuICBjb25zdCBpbnB1dEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKElOUFVUKTtcbiAgY29uc3QgbGlzdEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKExJU1QpO1xuICBjb25zdCBzdGF0dXNFbCA9IGNvbWJvQm94RWwucXVlcnlTZWxlY3RvcihTVEFUVVMpO1xuICBjb25zdCBmb2N1c2VkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fRk9DVVNFRCk7XG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoTElTVF9PUFRJT05fU0VMRUNURUQpO1xuICBjb25zdCB0b2dnbGVMaXN0QnRuRWwgPSBjb21ib0JveEVsLnF1ZXJ5U2VsZWN0b3IoVE9HR0xFX0xJU1RfQlVUVE9OKTtcbiAgY29uc3QgY2xlYXJJbnB1dEJ0bkVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKENMRUFSX0lOUFVUX0JVVFRPTik7XG5cbiAgY29uc3QgaXNQcmlzdGluZSA9IGNvbWJvQm94RWwuY2xhc3NMaXN0LmNvbnRhaW5zKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIGNvbnN0IGRpc2FibGVGaWx0ZXJpbmcgPSBjb21ib0JveEVsLmRhdGFzZXQuZGlzYWJsZUZpbHRlcmluZyA9PT0gXCJ0cnVlXCI7XG5cbiAgcmV0dXJuIHtcbiAgICBjb21ib0JveEVsLFxuICAgIHNlbGVjdEVsLFxuICAgIGlucHV0RWwsXG4gICAgbGlzdEVsLFxuICAgIHN0YXR1c0VsLFxuICAgIGZvY3VzZWRPcHRpb25FbCxcbiAgICBzZWxlY3RlZE9wdGlvbkVsLFxuICAgIHRvZ2dsZUxpc3RCdG5FbCxcbiAgICBjbGVhcklucHV0QnRuRWwsXG4gICAgaXNQcmlzdGluZSxcbiAgICBkaXNhYmxlRmlsdGVyaW5nLFxuICB9O1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIHRoZSBjb21iby1ib3ggY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgdG9nZ2xlTGlzdEJ0bkVsLCBjbGVhcklucHV0QnRuRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY2xlYXJJbnB1dEJ0bkVsLmhpZGRlbiA9IHRydWU7XG4gIGNsZWFySW5wdXRCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIHRvZ2dsZUxpc3RCdG5FbC5kaXNhYmxlZCA9IHRydWU7XG4gIGlucHV0RWwuZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBDaGVjayBmb3IgYXJpYS1kaXNhYmxlZCBvbiBpbml0aWFsaXphdGlvblxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgYXJpYURpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCB0b2dnbGVMaXN0QnRuRWwsIGNsZWFySW5wdXRCdG5FbCB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcblxuICBjbGVhcklucHV0QnRuRWwuaGlkZGVuID0gdHJ1ZTtcbiAgY2xlYXJJbnB1dEJ0bkVsLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gIHRvZ2dsZUxpc3RCdG5FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHRydWUpO1xuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0aGUgY29tYm8tYm94IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5hYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgaW5wdXRFbCwgdG9nZ2xlTGlzdEJ0bkVsLCBjbGVhcklucHV0QnRuRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY2xlYXJJbnB1dEJ0bkVsLmhpZGRlbiA9IGZhbHNlO1xuICBjbGVhcklucHV0QnRuRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgdG9nZ2xlTGlzdEJ0bkVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGlucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogRW5oYW5jZSBhIHNlbGVjdCBlbGVtZW50IGludG8gYSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IF9jb21ib0JveEVsIFRoZSBpbml0aWFsIGVsZW1lbnQgb2YgdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5oYW5jZUNvbWJvQm94ID0gKF9jb21ib0JveEVsKSA9PiB7XG4gIGNvbnN0IGNvbWJvQm94RWwgPSBfY29tYm9Cb3hFbC5jbG9zZXN0KENPTUJPX0JPWCk7XG5cbiAgaWYgKGNvbWJvQm94RWwuZGF0YXNldC5lbmhhbmNlZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHNlbGVjdEVsID0gY29tYm9Cb3hFbC5xdWVyeVNlbGVjdG9yKFwic2VsZWN0XCIpO1xuXG4gIGlmICghc2VsZWN0RWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Q09NQk9fQk9YfSBpcyBtaXNzaW5nIGlubmVyIHNlbGVjdGApO1xuICB9XG5cbiAgY29uc3Qgc2VsZWN0SWQgPSBzZWxlY3RFbC5pZDtcbiAgY29uc3Qgc2VsZWN0TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsYWJlbFtmb3I9XCIke3NlbGVjdElkfVwiXWApO1xuICBjb25zdCBsaXN0SWQgPSBgJHtzZWxlY3RJZH0tLWxpc3RgO1xuICBjb25zdCBsaXN0SWRMYWJlbCA9IGAke3NlbGVjdElkfS1sYWJlbGA7XG4gIGNvbnN0IGFkZGl0aW9uYWxBdHRyaWJ1dGVzID0gW107XG4gIGNvbnN0IHsgZGVmYXVsdFZhbHVlIH0gPSBjb21ib0JveEVsLmRhdGFzZXQ7XG4gIGNvbnN0IHsgcGxhY2Vob2xkZXIgfSA9IGNvbWJvQm94RWwuZGF0YXNldDtcbiAgbGV0IHNlbGVjdGVkT3B0aW9uO1xuXG4gIGlmIChwbGFjZWhvbGRlcikge1xuICAgIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLnB1c2goeyBwbGFjZWhvbGRlciB9KTtcbiAgfVxuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2VsZWN0RWwub3B0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgY29uc3Qgb3B0aW9uRWwgPSBzZWxlY3RFbC5vcHRpb25zW2ldO1xuXG4gICAgICBpZiAob3B0aW9uRWwudmFsdWUgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbiA9IG9wdGlvbkVsO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgZXJyb3IgaWYgY29tYm9ib3ggaXMgbWlzc2luZyBhIGxhYmVsIG9yIGxhYmVsIGlzIG1pc3NpbmdcbiAgICogYGZvcmAgYXR0cmlidXRlLiBPdGhlcndpc2UsIHNldCB0aGUgSUQgdG8gbWF0Y2ggdGhlIDx1bD4gYXJpYS1sYWJlbGxlZGJ5XG4gICAqL1xuICBpZiAoIXNlbGVjdExhYmVsIHx8ICFzZWxlY3RMYWJlbC5tYXRjaGVzKGBsYWJlbFtmb3I9XCIke3NlbGVjdElkfVwiXWApKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7Q09NQk9fQk9YfSBmb3IgJHtzZWxlY3RJZH0gaXMgZWl0aGVyIG1pc3NpbmcgYSBsYWJlbCBvciBhIFwiZm9yXCIgYXR0cmlidXRlYCxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgfVxuXG4gIHNlbGVjdExhYmVsLnNldEF0dHJpYnV0ZShcImlkXCIsIGxpc3RJZExhYmVsKTtcbiAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBzZWxlY3RFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBzZWxlY3RFbC5jbGFzc0xpc3QuYWRkKFwidXNhLXNyLW9ubHlcIiwgU0VMRUNUX0NMQVNTKTtcbiAgc2VsZWN0RWwuaWQgPSBcIlwiO1xuICBzZWxlY3RFbC52YWx1ZSA9IFwiXCI7XG5cbiAgW1wicmVxdWlyZWRcIiwgXCJhcmlhLWxhYmVsXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCJdLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBpZiAoc2VsZWN0RWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdEVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIGFkZGl0aW9uYWxBdHRyaWJ1dGVzLnB1c2goeyBbbmFtZV06IHZhbHVlIH0pO1xuICAgICAgc2VsZWN0RWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gc2FuaXRpemUgZG9lc24ndCBsaWtlIGZ1bmN0aW9ucyBpbiB0ZW1wbGF0ZSBsaXRlcmFsc1xuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgc2VsZWN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLW93bnNcIiwgbGlzdElkKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBsaXN0SWQpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWF1dG9jb21wbGV0ZVwiLCBcImxpc3RcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiYXV0b2NhcGl0YWxpemVcIiwgXCJvZmZcIik7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImF1dG9jb21wbGV0ZVwiLCBcIm9mZlwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgSU5QVVRfQ0xBU1MpO1xuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImNvbWJvYm94XCIpO1xuICBhZGRpdGlvbmFsQXR0cmlidXRlcy5mb3JFYWNoKChhdHRyKSA9PlxuICAgIE9iamVjdC5rZXlzKGF0dHIpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke2F0dHJba2V5XX1gO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH0pLFxuICApO1xuXG4gIGNvbWJvQm94RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGlucHV0KTtcblxuICBjb21ib0JveEVsLmluc2VydEFkamFjZW50SFRNTChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxzcGFuIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtDTEVBUl9JTlBVVF9CVVRUT05fQ0xBU1N9XCIgYXJpYS1sYWJlbD1cIkNsZWFyIHRoZSBzZWxlY3QgY29udGVudHNcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtJTlBVVF9CVVRUT05fU0VQQVJBVE9SX0NMQVNTfVwiPiZuYnNwOzwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtUT0dHTEVfTElTVF9CVVRUT05fV1JBUFBFUl9DTEFTU31cIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cIiR7VE9HR0xFX0xJU1RfQlVUVE9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgdGhlIGRyb3Bkb3duIGxpc3RcIj4mbmJzcDs8L2J1dHRvbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDx1bFxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgaWQ9XCIke2xpc3RJZH1cIlxuICAgICAgICBjbGFzcz1cIiR7TElTVF9DTEFTU31cIlxuICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cIiR7bGlzdElkTGFiZWx9XCJcbiAgICAgICAgaGlkZGVuPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgY2xhc3M9XCIke1NUQVRVU19DTEFTU30gdXNhLXNyLW9ubHlcIiByb2xlPVwic3RhdHVzXCI+PC9kaXY+YCxcbiAgKTtcblxuICBpZiAoc2VsZWN0ZWRPcHRpb24pIHtcbiAgICBjb25zdCB7IGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChjb21ib0JveEVsKTtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIHNlbGVjdGVkT3B0aW9uLnZhbHVlKTtcbiAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgc2VsZWN0ZWRPcHRpb24udGV4dCk7XG4gICAgY29tYm9Cb3hFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gIH1cblxuICBpZiAoc2VsZWN0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGNvbWJvQm94RWwpO1xuICAgIHNlbGVjdEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cblxuICBpZiAoc2VsZWN0RWwuaGFzQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKSkge1xuICAgIGFyaWFEaXNhYmxlKGNvbWJvQm94RWwpO1xuICAgIHNlbGVjdEVsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG4gIH1cblxuICBjb21ib0JveEVsLmRhdGFzZXQuZW5oYW5jZWQgPSBcInRydWVcIjtcbn07XG5cbi8qKlxuICogTWFuYWdlIHRoZSBmb2N1c2VkIGVsZW1lbnQgd2l0aGluIHRoZSBsaXN0IG9wdGlvbnMgd2hlblxuICogbmF2aWdhdGluZyB2aWEga2V5Ym9hcmQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gYW5jaG9yIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuZXh0RWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5za2lwRm9jdXMgc2tpcCBmb2N1cyBvZiBoaWdobGlnaHRlZCBpdGVtXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucHJldmVudFNjcm9sbCBzaG91bGQgc2tpcCBwcm9jZWR1cmUgdG8gc2Nyb2xsIHRvIGVsZW1lbnRcbiAqL1xuY29uc3QgaGlnaGxpZ2h0T3B0aW9uID0gKGVsLCBuZXh0RWwsIHsgc2tpcEZvY3VzLCBwcmV2ZW50U2Nyb2xsIH0gPSB7fSkgPT4ge1xuICBjb25zdCB7IGlucHV0RWwsIGxpc3RFbCwgZm9jdXNlZE9wdGlvbkVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChmb2N1c2VkT3B0aW9uRWwpIHtcbiAgICBmb2N1c2VkT3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZShMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICBmb2N1c2VkT3B0aW9uRWwuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgXCItMVwiKTtcbiAgfVxuXG4gIGlmIChuZXh0RWwpIHtcbiAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBuZXh0RWwuaWQpO1xuICAgIG5leHRFbC5zZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiLCBcIjBcIik7XG4gICAgbmV4dEVsLmNsYXNzTGlzdC5hZGQoTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyk7XG5cbiAgICBpZiAoIXByZXZlbnRTY3JvbGwpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkJvdHRvbSA9IG5leHRFbC5vZmZzZXRUb3AgKyBuZXh0RWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgY3VycmVudEJvdHRvbSA9IGxpc3RFbC5zY3JvbGxUb3AgKyBsaXN0RWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICBpZiAob3B0aW9uQm90dG9tID4gY3VycmVudEJvdHRvbSkge1xuICAgICAgICBsaXN0RWwuc2Nyb2xsVG9wID0gb3B0aW9uQm90dG9tIC0gbGlzdEVsLm9mZnNldEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRFbC5vZmZzZXRUb3AgPCBsaXN0RWwuc2Nyb2xsVG9wKSB7XG4gICAgICAgIGxpc3RFbC5zY3JvbGxUb3AgPSBuZXh0RWwub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghc2tpcEZvY3VzKSB7XG4gICAgICBuZXh0RWwuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLCBcIlwiKTtcbiAgICBpbnB1dEVsLmZvY3VzKCk7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBkeW5hbWljIHJlZ3VsYXIgZXhwcmVzc2lvbiBiYXNlZCBvZmYgb2YgYSByZXBsYWNlYWJsZSBhbmQgcG9zc2libHkgZmlsdGVyZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgVGhlIHZhbHVlIHRvIHVzZSBpbiB0aGUgcmVndWxhciBleHByZXNzaW9uXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFzIEFuIG9iamVjdCBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRvIHJlcGxhY2UgYW5kIGZpbHRlciB0aGUgcXVlcnlcbiAqL1xuY29uc3QgZ2VuZXJhdGVEeW5hbWljUmVnRXhwID0gKGZpbHRlciwgcXVlcnkgPSBcIlwiLCBleHRyYXMgPSB7fSkgPT4ge1xuICBjb25zdCBlc2NhcGVSZWdFeHAgPSAodGV4dCkgPT5cbiAgICB0ZXh0LnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXFxzXS9nLCBcIlxcXFwkJlwiKTtcblxuICBsZXQgZmluZCA9IGZpbHRlci5yZXBsYWNlKC97eyguKj8pfX0vZywgKG0sICQxKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gJDEudHJpbSgpO1xuICAgIGNvbnN0IHF1ZXJ5RmlsdGVyID0gZXh0cmFzW2tleV07XG4gICAgaWYgKGtleSAhPT0gXCJxdWVyeVwiICYmIHF1ZXJ5RmlsdGVyKSB7XG4gICAgICBjb25zdCBtYXRjaGVyID0gbmV3IFJlZ0V4cChxdWVyeUZpbHRlciwgXCJpXCIpO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHF1ZXJ5Lm1hdGNoKG1hdGNoZXIpO1xuXG4gICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKG1hdGNoZXNbMV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChxdWVyeSk7XG4gIH0pO1xuXG4gIGZpbmQgPSBgXig/OiR7ZmluZH0pJGA7XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZmluZCwgXCJpXCIpO1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IHRoZSBvcHRpb24gbGlzdCBvZiBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgZGlzcGxheUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbWJvQm94RWwsXG4gICAgc2VsZWN0RWwsXG4gICAgaW5wdXRFbCxcbiAgICBsaXN0RWwsXG4gICAgc3RhdHVzRWwsXG4gICAgaXNQcmlzdGluZSxcbiAgICBkaXNhYmxlRmlsdGVyaW5nLFxuICB9ID0gZ2V0Q29tYm9Cb3hDb250ZXh0KGVsKTtcbiAgbGV0IHNlbGVjdGVkSXRlbUlkO1xuICBsZXQgZmlyc3RGb3VuZElkO1xuXG4gIGNvbnN0IGxpc3RPcHRpb25CYXNlSWQgPSBgJHtsaXN0RWwuaWR9LS1vcHRpb24tYDtcblxuICBjb25zdCBpbnB1dFZhbHVlID0gKGlucHV0RWwudmFsdWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZmlsdGVyID0gY29tYm9Cb3hFbC5kYXRhc2V0LmZpbHRlciB8fCBERUZBVUxUX0ZJTFRFUjtcbiAgY29uc3QgcmVnZXggPSBnZW5lcmF0ZUR5bmFtaWNSZWdFeHAoZmlsdGVyLCBpbnB1dFZhbHVlLCBjb21ib0JveEVsLmRhdGFzZXQpO1xuXG4gIGxldCBvcHRpb25zID0gW107XG4gIGNvbnN0IG9wdGlvbnNTdGFydHNXaXRoID0gW107XG4gIGNvbnN0IG9wdGlvbnNDb250YWlucyA9IFtdO1xuICBjb25zdCBvcHRpb25MaXN0ID0gWy4uLnNlbGVjdEVsLm9wdGlvbnNdO1xuXG4gIC8qKlxuICAgKiBCdWlsZHMgYW5kIHNvcnRzIG9wdGlvbnMgYXJyYXkuXG4gICAqXG4gICAqIE9wdGlvbiBwYXJhbSBpcyBwYXNzZWQgdGhyb3VnaCByZWdleCB0ZXN0IGJlZm9yZSBwYXNzaW5nIGludG8gdGhpcyBmdW5jdGlvbi5cbiAgICogV2hlbiBmaWx0ZXJpbmcgaXMgZW5hYmxlZCwgdGhlIGFycmF5IHdpbGwgYmUgc29ydGVkIGJ5IG9wdGlvbnMgdGhhdCBzdGFydCB3aXRoIHRoZSBxdWVyeSwgZm9sbG93ZWQgYnlcbiAgICogb3B0aW9ucyB0aGF0IGNvbnRhaW4gdGhlIHF1ZXJ5LlxuICAgKiBXaGVuIGZpbHRlcmluZyBpcyBkaXNhYmxlZCwgYWxsIG9wdGlvbnMgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgYXJyYXkgdW5zb3J0ZWQuXG4gICAqXG4gICAqIFRoZXNlIGFycmF5IGl0ZW1zIHdpbGwgcG9wdWxhdGUgdGhlIGxpc3QgdGhhdCBpcyBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIgYWZ0ZXIgYSBzZWFyY2ggcXVlcnkgaXMgZW50ZXJlZC5cbiAgICogQXJyYXkgYXR0cmlidXRlcyBhcmUgYWxzbyB1c2VkIHRvIHNldCBvcHRpb24gSURzIGFuZCBhcmlhLXNldHNpemUgYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gb3B0aW9uIC0gT3B0aW9uIGVsZW1lbnQgZnJvbSBzZWxlY3QgYXJyYXlcbiAgICovXG4gIGNvbnN0IGJ1aWxkT3B0aW9uc0FycmF5ID0gKG9wdGlvbikgPT4ge1xuICAgIGlmIChkaXNhYmxlRmlsdGVyaW5nIHx8IGlzUHJpc3RpbmUpIHtcbiAgICAgIG9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoU3RhcnRzV2l0aCA9IG9wdGlvbi50ZXh0LnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChpbnB1dFZhbHVlKTtcblxuICAgIGlmIChtYXRjaFN0YXJ0c1dpdGgpIHtcbiAgICAgIG9wdGlvbnNTdGFydHNXaXRoLnB1c2gob3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9uc0NvbnRhaW5zLnB1c2gob3B0aW9uKTtcbiAgICB9XG5cbiAgICBvcHRpb25zID0gWy4uLm9wdGlvbnNTdGFydHNXaXRoLCAuLi5vcHRpb25zQ29udGFpbnNdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb21wYXJlcyBvcHRpb24gdGV4dCB0byBxdWVyeSB1c2luZyBnZW5lcmF0ZWQgcmVnZXggZmlsdGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxPcHRpb25FbGVtZW50fSBvcHRpb25cbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVHJ1ZSB3aGVuIG9wdGlvbiB0ZXh0IG1hdGNoZXMgdXNlciBpbnB1dCBxdWVyeS5cbiAgICovXG4gIGNvbnN0IG9wdGlvbk1hdGNoZXNRdWVyeSA9IChvcHRpb24pID0+IHJlZ2V4LnRlc3Qob3B0aW9uLnRleHQpO1xuXG4gIC8qKlxuICAgKiBMb2dpYyBjaGVjayB0byBkZXRlcm1pbmUgaWYgb3B0aW9ucyBhcnJheSBuZWVkcyB0byBiZSB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0hUTUxPcHRpb25FbGVtZW50fSBvcHRpb25cbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0gVHJ1ZSB3aGVuIG9wdGlvbiBoYXMgdmFsdWUgJiYgaWYgZmlsdGVyaW5nIGlzIGRpc2FibGVkLCBjb21ibyBib3ggaGFzIGFuIGFjdGl2ZSBzZWxlY3Rpb24sXG4gICAqIHRoZXJlIGlzIG5vIGlucHV0VmFsdWUsIG9yIGlmIG9wdGlvbiBtYXRjaGVzIHVzZXIgcXVlcnlcbiAgICovXG4gIGNvbnN0IGFycmF5TmVlZHNVcGRhdGUgPSAob3B0aW9uKSA9PlxuICAgIG9wdGlvbi52YWx1ZSAmJlxuICAgIChkaXNhYmxlRmlsdGVyaW5nIHx8XG4gICAgICBpc1ByaXN0aW5lIHx8XG4gICAgICAhaW5wdXRWYWx1ZSB8fFxuICAgICAgb3B0aW9uTWF0Y2hlc1F1ZXJ5KG9wdGlvbikpO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgZmlyc3RGb3VuZElkIHNob3VsZCBiZSBhc3NpZ25lZCwgd2hpY2ggaXMgdGhlbiB1c2VkIHRvIHNldCBpdGVtVG9Gb2N1cy5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gb3B0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIGZpbHRlcmluZyBpcyBkaXNhYmxlZCwgbm8gZmlyc3RGb3VuZElkIGlzIGFzc2lnbmVkLCBhbmQgdGhlIG9wdGlvbiBtYXRjaGVzIHRoZSBxdWVyeS5cbiAgICovXG4gIGNvbnN0IGlzRmlyc3RNYXRjaCA9IChvcHRpb24pID0+XG4gICAgZGlzYWJsZUZpbHRlcmluZyAmJiAhZmlyc3RGb3VuZElkICYmIG9wdGlvbk1hdGNoZXNRdWVyeShvcHRpb24pO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgaXNDdXJyZW50U2VsZWN0aW9uIHNob3VsZCBiZSBhc3NpZ25lZCwgd2hpY2ggaXMgdGhlbiB1c2VkIHRvIHNldCBpdGVtVG9Gb2N1cy5cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MT3B0aW9uRWxlbWVudH0gb3B0aW9uXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiBvcHRpb24udmFsdWUgbWF0Y2hlcyBzZWxlY3RFbC52YWx1ZS5cbiAgICovXG4gIGNvbnN0IGlzQ3VycmVudFNlbGVjdGlvbiA9IChvcHRpb24pID0+XG4gICAgc2VsZWN0RWwudmFsdWUgJiYgb3B0aW9uLnZhbHVlID09PSBzZWxlY3RFbC52YWx1ZTtcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBhcnJheSBvZiBvcHRpb25zIHRoYXQgc2hvdWxkIGJlIGRpc3BsYXllZCBvbiB0aGUgcGFnZS5cbiAgICogQXNzaWduIGFuIElEIHRvIGVhY2ggZGlzcGxheWVkIG9wdGlvbi5cbiAgICogSWRlbnRpZnkgYW5kIGFzc2lnbiB0aGUgb3B0aW9uIHRoYXQgc2hvdWxkIHJlY2VpdmUgZm9jdXMuXG4gICAqL1xuICBvcHRpb25MaXN0LmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIGlmIChhcnJheU5lZWRzVXBkYXRlKG9wdGlvbikpIHtcbiAgICAgIGJ1aWxkT3B0aW9uc0FycmF5KG9wdGlvbik7XG5cbiAgICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke29wdGlvbnMuaW5kZXhPZihvcHRpb24pfWA7XG5cbiAgICAgIGlmIChpc0ZpcnN0TWF0Y2gob3B0aW9uKSkge1xuICAgICAgICBmaXJzdEZvdW5kSWQgPSBvcHRpb25JZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3VycmVudFNlbGVjdGlvbihvcHRpb24pKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbUlkID0gb3B0aW9uSWQ7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBudW1PcHRpb25zID0gb3B0aW9ucy5sZW5ndGg7XG4gIGNvbnN0IG9wdGlvbkh0bWwgPSBvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbklkID0gYCR7bGlzdE9wdGlvbkJhc2VJZH0ke2luZGV4fWA7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtMSVNUX09QVElPTl9DTEFTU107XG4gICAgbGV0IHRhYmluZGV4ID0gXCItMVwiO1xuICAgIGxldCBhcmlhU2VsZWN0ZWQgPSBcImZhbHNlXCI7XG5cbiAgICBpZiAob3B0aW9uSWQgPT09IHNlbGVjdGVkSXRlbUlkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goTElTVF9PUFRJT05fU0VMRUNURURfQ0xBU1MsIExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGFyaWFTZWxlY3RlZCA9IFwidHJ1ZVwiO1xuICAgIH1cblxuICAgIGlmICghc2VsZWN0ZWRJdGVtSWQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgIGNsYXNzZXMucHVzaChMSVNUX09QVElPTl9GT0NVU0VEX0NMQVNTKTtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgfVxuXG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNldHNpemVcIiwgb3B0aW9ucy5sZW5ndGgpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtcG9zaW5zZXRcIiwgaW5kZXggKyAxKTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGFyaWFTZWxlY3RlZCk7XG4gICAgbGkuc2V0QXR0cmlidXRlKFwiaWRcIiwgb3B0aW9uSWQpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBsaS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwib3B0aW9uXCIpO1xuICAgIGxpLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgb3B0aW9uLnZhbHVlKTtcbiAgICBsaS50ZXh0Q29udGVudCA9IG9wdGlvbi50ZXh0O1xuXG4gICAgcmV0dXJuIGxpO1xuICB9KTtcblxuICBjb25zdCBub1Jlc3VsdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIG5vUmVzdWx0cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtMSVNUX09QVElPTl9DTEFTU30tLW5vLXJlc3VsdHNgKTtcbiAgbm9SZXN1bHRzLnRleHRDb250ZW50ID0gXCJObyByZXN1bHRzIGZvdW5kXCI7XG5cbiAgbGlzdEVsLmhpZGRlbiA9IGZhbHNlO1xuXG4gIGlmIChudW1PcHRpb25zKSB7XG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgb3B0aW9uSHRtbC5mb3JFYWNoKChpdGVtKSA9PlxuICAgICAgbGlzdEVsLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBpdGVtKSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGxpc3RFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbm9SZXN1bHRzKTtcbiAgfVxuXG4gIGlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcInRydWVcIik7XG5cbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBudW1PcHRpb25zXG4gICAgPyBgJHtudW1PcHRpb25zfSByZXN1bHQke251bU9wdGlvbnMgPiAxID8gXCJzXCIgOiBcIlwifSBhdmFpbGFibGUuYFxuICAgIDogXCJObyByZXN1bHRzLlwiO1xuXG4gIGxldCBpdGVtVG9Gb2N1cztcblxuICBpZiAoaXNQcmlzdGluZSAmJiBzZWxlY3RlZEl0ZW1JZCkge1xuICAgIGl0ZW1Ub0ZvY3VzID0gbGlzdEVsLnF1ZXJ5U2VsZWN0b3IoYCMke3NlbGVjdGVkSXRlbUlkfWApO1xuICB9IGVsc2UgaWYgKGRpc2FibGVGaWx0ZXJpbmcgJiYgZmlyc3RGb3VuZElkKSB7XG4gICAgaXRlbVRvRm9jdXMgPSBsaXN0RWwucXVlcnlTZWxlY3RvcihgIyR7Zmlyc3RGb3VuZElkfWApO1xuICB9XG5cbiAgaWYgKGl0ZW1Ub0ZvY3VzKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGxpc3RFbCwgaXRlbVRvRm9jdXMsIHtcbiAgICAgIHNraXBGb2N1czogdHJ1ZSxcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBIaWRlIHRoZSBvcHRpb24gbGlzdCBvZiBhIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGlkZUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnB1dEVsLCBsaXN0RWwsIHN0YXR1c0VsLCBmb2N1c2VkT3B0aW9uRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgc3RhdHVzRWwuaW5uZXJIVE1MID0gXCJcIjtcblxuICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcbiAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiwgXCJcIik7XG5cbiAgaWYgKGZvY3VzZWRPcHRpb25FbCkge1xuICAgIGZvY3VzZWRPcHRpb25FbC5jbGFzc0xpc3QucmVtb3ZlKExJU1RfT1BUSU9OX0ZPQ1VTRURfQ0xBU1MpO1xuICB9XG5cbiAgbGlzdEVsLnNjcm9sbFRvcCA9IDA7XG4gIGxpc3RFbC5oaWRkZW4gPSB0cnVlO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYW4gb3B0aW9uIGxpc3Qgb2YgdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbGlzdE9wdGlvbkVsIFRoZSBsaXN0IG9wdGlvbiBiZWluZyBzZWxlY3RlZFxuICovXG5jb25zdCBzZWxlY3RJdGVtID0gKGxpc3RPcHRpb25FbCkgPT4ge1xuICBjb25zdCB7IGNvbWJvQm94RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQobGlzdE9wdGlvbkVsKTtcblxuICBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwsIGxpc3RPcHRpb25FbC5kYXRhc2V0LnZhbHVlKTtcbiAgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwsIGxpc3RPcHRpb25FbC50ZXh0Q29udGVudCk7XG4gIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgaW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBDbGVhciB0aGUgaW5wdXQgb2YgdGhlIGNvbWJvIGJveFxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNsZWFyQnV0dG9uRWwgVGhlIGNsZWFyIGlucHV0IGJ1dHRvblxuICovXG5jb25zdCBjbGVhcklucHV0ID0gKGNsZWFyQnV0dG9uRWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwsIHNlbGVjdEVsLCBpbnB1dEVsIH0gPVxuICAgIGdldENvbWJvQm94Q29udGV4dChjbGVhckJ1dHRvbkVsKTtcbiAgY29uc3QgbGlzdFNob3duID0gIWxpc3RFbC5oaWRkZW47XG5cbiAgaWYgKHNlbGVjdEVsLnZhbHVlKSBjaGFuZ2VFbGVtZW50VmFsdWUoc2VsZWN0RWwpO1xuICBpZiAoaW5wdXRFbC52YWx1ZSkgY2hhbmdlRWxlbWVudFZhbHVlKGlucHV0RWwpO1xuICBjb21ib0JveEVsLmNsYXNzTGlzdC5yZW1vdmUoQ09NQk9fQk9YX1BSSVNUSU5FX0NMQVNTKTtcblxuICBpZiAobGlzdFNob3duKSBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgaW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgc2VsZWN0IGJhc2VkIG9mZiBvZiBjdXJyZW50bHkgc2V0IHNlbGVjdCB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IHJlc2V0U2VsZWN0aW9uID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgc2VsZWN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0VmFsdWUgPSBzZWxlY3RFbC52YWx1ZTtcbiAgY29uc3QgaW5wdXRWYWx1ZSA9IChpbnB1dEVsLnZhbHVlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHNlbGVjdFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbGVjdEVsLm9wdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG9wdGlvbkVsID0gc2VsZWN0RWwub3B0aW9uc1tpXTtcbiAgICAgIGlmIChvcHRpb25FbC52YWx1ZSA9PT0gc2VsZWN0VmFsdWUpIHtcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgIT09IG9wdGlvbkVsLnRleHQpIHtcbiAgICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgb3B0aW9uRWwudGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tYm9Cb3hFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9QUklTVElORV9DTEFTUyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5wdXRWYWx1ZSkge1xuICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShpbnB1dEVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZWxlY3QgYW4gb3B0aW9uIGxpc3Qgb2YgdGhlIGNvbWJvIGJveCBjb21wb25lbnQgYmFzZWQgb2ZmIG9mXG4gKiBoYXZpbmcgYSBjdXJyZW50IGZvY3VzZWQgbGlzdCBvcHRpb24gb3JcbiAqIGhhdmluZyB0ZXN0IHRoYXQgY29tcGxldGVseSBtYXRjaGVzIGEgbGlzdCBvcHRpb24uXG4gKiBPdGhlcndpc2UgaXQgY2xlYXJzIHRoZSBpbnB1dCBhbmQgc2VsZWN0LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGNvbXBsZXRlU2VsZWN0aW9uID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgc2VsZWN0RWwsIGlucHV0RWwsIHN0YXR1c0VsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIHN0YXR1c0VsLnRleHRDb250ZW50ID0gXCJcIjtcblxuICBjb25zdCBpbnB1dFZhbHVlID0gKGlucHV0RWwudmFsdWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcblxuICBpZiAoaW5wdXRWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWxlY3RFbC5vcHRpb25zLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvcHRpb25FbCA9IHNlbGVjdEVsLm9wdGlvbnNbaV07XG4gICAgICBpZiAob3B0aW9uRWwudGV4dC50b0xvd2VyQ2FzZSgpID09PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgIGNoYW5nZUVsZW1lbnRWYWx1ZShzZWxlY3RFbCwgb3B0aW9uRWwudmFsdWUpO1xuICAgICAgICBjaGFuZ2VFbGVtZW50VmFsdWUoaW5wdXRFbCwgb3B0aW9uRWwudGV4dCk7XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LmFkZChDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgZXNjYXBlIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBpbnB1dEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcblxuICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgcmVzZXRTZWxlY3Rpb24oY29tYm9Cb3hFbCk7XG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBkb3duIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVEb3duRnJvbUlucHV0ID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZXZlbnQudGFyZ2V0KTtcblxuICBpZiAobGlzdEVsLmhpZGRlbikge1xuICAgIGRpc3BsYXlMaXN0KGNvbWJvQm94RWwpO1xuICB9XG5cbiAgY29uc3QgbmV4dE9wdGlvbkVsID1cbiAgICBsaXN0RWwucXVlcnlTZWxlY3RvcihMSVNUX09QVElPTl9GT0NVU0VEKSB8fFxuICAgIGxpc3RFbC5xdWVyeVNlbGVjdG9yKExJU1RfT1BUSU9OKTtcblxuICBpZiAobmV4dE9wdGlvbkVsKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGNvbWJvQm94RWwsIG5leHRPcHRpb25FbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGVudGVyIGV2ZW50IGZyb20gYW4gaW5wdXQgZWxlbWVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBBbiBldmVudCB3aXRoaW4gdGhlIGNvbWJvIGJveCBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRW50ZXJGcm9tSW5wdXQgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChldmVudC50YXJnZXQpO1xuICBjb25zdCBsaXN0U2hvd24gPSAhbGlzdEVsLmhpZGRlbjtcblxuICBjb21wbGV0ZVNlbGVjdGlvbihjb21ib0JveEVsKTtcblxuICBpZiAobGlzdFNob3duKSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgdGhlIGRvd24gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbiA9IChldmVudCkgPT4ge1xuICBjb25zdCBmb2N1c2VkT3B0aW9uRWwgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IG5leHRPcHRpb25FbCA9IGZvY3VzZWRPcHRpb25FbC5uZXh0U2libGluZztcblxuICBpZiAobmV4dE9wdGlvbkVsKSB7XG4gICAgaGlnaGxpZ2h0T3B0aW9uKGZvY3VzZWRPcHRpb25FbCwgbmV4dE9wdGlvbkVsKTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSB0aGUgc3BhY2UgZXZlbnQgZnJvbSBhbiBsaXN0IG9wdGlvbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVTcGFjZUZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVFbnRlckZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIHNlbGVjdEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSB1cCBldmVudCBmcm9tIGxpc3Qgb3B0aW9uIHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IEFuIGV2ZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21MaXN0T3B0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsLCBmb2N1c2VkT3B0aW9uRWwgfSA9IGdldENvbWJvQm94Q29udGV4dChcbiAgICBldmVudC50YXJnZXQsXG4gICk7XG4gIGNvbnN0IG5leHRPcHRpb25FbCA9IGZvY3VzZWRPcHRpb25FbCAmJiBmb2N1c2VkT3B0aW9uRWwucHJldmlvdXNTaWJsaW5nO1xuICBjb25zdCBsaXN0U2hvd24gPSAhbGlzdEVsLmhpZGRlbjtcblxuICBoaWdobGlnaHRPcHRpb24oY29tYm9Cb3hFbCwgbmV4dE9wdGlvbkVsKTtcblxuICBpZiAobGlzdFNob3duKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIGlmICghbmV4dE9wdGlvbkVsKSB7XG4gICAgaGlkZUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VsZWN0IGxpc3Qgb3B0aW9uIG9uIHRoZSBtb3VzZW92ZXIgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgbW91c2VvdmVyIGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxMSUVsZW1lbnR9IGxpc3RPcHRpb25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgY29tYm8gYm94IGNvbXBvbmVudFxuICovXG5jb25zdCBoYW5kbGVNb3VzZW92ZXIgPSAobGlzdE9wdGlvbkVsKSA9PiB7XG4gIGNvbnN0IGlzQ3VycmVudGx5Rm9jdXNlZCA9IGxpc3RPcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoXG4gICAgTElTVF9PUFRJT05fRk9DVVNFRF9DTEFTUyxcbiAgKTtcblxuICBpZiAoaXNDdXJyZW50bHlGb2N1c2VkKSByZXR1cm47XG5cbiAgaGlnaGxpZ2h0T3B0aW9uKGxpc3RPcHRpb25FbCwgbGlzdE9wdGlvbkVsLCB7XG4gICAgcHJldmVudFNjcm9sbDogdHJ1ZSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB0aGUgbGlzdCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IHRvZ2dsZUxpc3QgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBjb21ib0JveEVsLCBsaXN0RWwsIGlucHV0RWwgfSA9IGdldENvbWJvQm94Q29udGV4dChlbCk7XG5cbiAgaWYgKGxpc3RFbC5oaWRkZW4pIHtcbiAgICBkaXNwbGF5TGlzdChjb21ib0JveEVsKTtcbiAgfSBlbHNlIHtcbiAgICBoaWRlTGlzdChjb21ib0JveEVsKTtcbiAgfVxuXG4gIGlucHV0RWwuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIGNsaWNrIGZyb20gaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBjb21ibyBib3ggY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUNsaWNrRnJvbUlucHV0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgY29tYm9Cb3hFbCwgbGlzdEVsIH0gPSBnZXRDb21ib0JveENvbnRleHQoZWwpO1xuXG4gIGlmIChsaXN0RWwuaGlkZGVuKSB7XG4gICAgZGlzcGxheUxpc3QoY29tYm9Cb3hFbCk7XG4gIH1cbn07XG5cbmNvbnN0IGNvbWJvQm94ID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBoYW5kbGVDbGlja0Zyb21JbnB1dCh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbVE9HR0xFX0xJU1RfQlVUVE9OXSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdG9nZ2xlTGlzdCh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBbTElTVF9PUFRJT05dKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBzZWxlY3RJdGVtKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtDTEVBUl9JTlBVVF9CVVRUT05dKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBjbGVhcklucHV0KHRoaXMpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGZvY3Vzb3V0OiB7XG4gICAgICBbQ09NQk9fQk9YXShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICByZXNldFNlbGVjdGlvbih0aGlzKTtcbiAgICAgICAgICBoaWRlTGlzdCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtDT01CT19CT1hdOiBrZXltYXAoe1xuICAgICAgICBFc2NhcGU6IGhhbmRsZUVzY2FwZSxcbiAgICAgIH0pLFxuICAgICAgW0lOUFVUXToga2V5bWFwKHtcbiAgICAgICAgRW50ZXI6IGhhbmRsZUVudGVyRnJvbUlucHV0LFxuICAgICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tSW5wdXQsXG4gICAgICAgIERvd246IGhhbmRsZURvd25Gcm9tSW5wdXQsXG4gICAgICB9KSxcbiAgICAgIFtMSVNUX09QVElPTl06IGtleW1hcCh7XG4gICAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFVwOiBoYW5kbGVVcEZyb21MaXN0T3B0aW9uLFxuICAgICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tTGlzdE9wdGlvbixcbiAgICAgICAgRG93bjogaGFuZGxlRG93bkZyb21MaXN0T3B0aW9uLFxuICAgICAgICBFbnRlcjogaGFuZGxlRW50ZXJGcm9tTGlzdE9wdGlvbixcbiAgICAgICAgXCIgXCI6IGhhbmRsZVNwYWNlRnJvbUxpc3RPcHRpb24sXG4gICAgICAgIFwiU2hpZnQrVGFiXCI6IG5vb3AsXG4gICAgICB9KSxcbiAgICB9LFxuICAgIGlucHV0OiB7XG4gICAgICBbSU5QVVRdKCkge1xuICAgICAgICBjb25zdCBjb21ib0JveEVsID0gdGhpcy5jbG9zZXN0KENPTUJPX0JPWCk7XG4gICAgICAgIGNvbWJvQm94RWwuY2xhc3NMaXN0LnJlbW92ZShDT01CT19CT1hfUFJJU1RJTkVfQ0xBU1MpO1xuICAgICAgICBkaXNwbGF5TGlzdCh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VzZW92ZXI6IHtcbiAgICAgIFtMSVNUX09QVElPTl0oKSB7XG4gICAgICAgIGhhbmRsZU1vdXNlb3Zlcih0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKENPTUJPX0JPWCwgcm9vdCkuZm9yRWFjaCgoY29tYm9Cb3hFbCkgPT4ge1xuICAgICAgICBlbmhhbmNlQ29tYm9Cb3goY29tYm9Cb3hFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbWJvQm94Q29udGV4dCxcbiAgICBlbmhhbmNlQ29tYm9Cb3gsXG4gICAgZ2VuZXJhdGVEeW5hbWljUmVnRXhwLFxuICAgIGRpc2FibGUsXG4gICAgZW5hYmxlLFxuICAgIGRpc3BsYXlMaXN0LFxuICAgIGhpZGVMaXN0LFxuICAgIENPTUJPX0JPWF9DTEFTUyxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gY29tYm9Cb3g7XG4iLCJjb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCBhY3RpdmVFbGVtZW50ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2FjdGl2ZS1lbGVtZW50XCIpO1xuY29uc3QgaXNJb3NEZXZpY2UgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvaXMtaW9zLWRldmljZVwiKTtcbmNvbnN0IFNhbml0aXplciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zYW5pdGl6ZXJcIik7XG5cbmNvbnN0IERBVEVfUElDS0VSX0NMQVNTID0gYCR7UFJFRklYfS1kYXRlLXBpY2tlcmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9XUkFQUEVSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X193cmFwcGVyYDtcbmNvbnN0IERBVEVfUElDS0VSX0lOSVRJQUxJWkVEX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9LS1pbml0aWFsaXplZGA7XG5jb25zdCBEQVRFX1BJQ0tFUl9BQ1RJVkVfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU30tLWFjdGl2ZWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9JTlRFUk5BTF9JTlBVVF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9faW50ZXJuYWwtaW5wdXRgO1xuY29uc3QgREFURV9QSUNLRVJfRVhURVJOQUxfSU5QVVRfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX2V4dGVybmFsLWlucHV0YDtcbmNvbnN0IERBVEVfUElDS0VSX0JVVFRPTl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NMQVNTfV9fYnV0dG9uYDtcbmNvbnN0IERBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0xBU1N9X19jYWxlbmRhcmA7XG5jb25zdCBEQVRFX1BJQ0tFUl9TVEFUVVNfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DTEFTU31fX3N0YXR1c2A7XG5jb25zdCBDQUxFTkRBUl9EQVRFX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19kYXRlYDtcblxuY29uc3QgQ0FMRU5EQVJfREFURV9GT0NVU0VEX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLWZvY3VzZWRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9TRUxFQ1RFRF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1BSRVZJT1VTX01PTlRIX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXByZXZpb3VzLW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1jdXJyZW50LW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfTkVYVF9NT05USF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1uZXh0LW1vbnRoYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1yYW5nZS1kYXRlYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfVE9EQVlfQ0xBU1MgPSBgJHtDQUxFTkRBUl9EQVRFX0NMQVNTfS0tdG9kYXlgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX1NUQVJUX0NMQVNTID0gYCR7Q0FMRU5EQVJfREFURV9DTEFTU30tLXJhbmdlLWRhdGUtc3RhcnRgO1xuY29uc3QgQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0VORF9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS1yYW5nZS1kYXRlLWVuZGA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyA9IGAke0NBTEVOREFSX0RBVEVfQ0xBU1N9LS13aXRoaW4tcmFuZ2VgO1xuY29uc3QgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fcHJldmlvdXMteWVhcmA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fcHJldmlvdXMtbW9udGhgO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19uZXh0LXllYXJgO1xuY29uc3QgQ0FMRU5EQVJfTkVYVF9NT05USF9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbmV4dC1tb250aGA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9TRUxFQ1RJT05fQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoLXNlbGVjdGlvbmA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9feWVhci1zZWxlY3Rpb25gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0ZPQ1VTRURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9NT05USF9DTEFTU30tLWZvY3VzZWRgO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfU0VMRUNURURfQ0xBU1MgPSBgJHtDQUxFTkRBUl9NT05USF9DTEFTU30tLXNlbGVjdGVkYDtcbmNvbnN0IENBTEVOREFSX1lFQVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3llYXJgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTID0gYCR7Q0FMRU5EQVJfWUVBUl9DTEFTU30tLWZvY3VzZWRgO1xuY29uc3QgQ0FMRU5EQVJfWUVBUl9TRUxFQ1RFRF9DTEFTUyA9IGAke0NBTEVOREFSX1lFQVJfQ0xBU1N9LS1zZWxlY3RlZGA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19wcmV2aW91cy15ZWFyLWNodW5rYDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUl9DSFVOS19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fbmV4dC15ZWFyLWNodW5rYDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUElDS0VSX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19kYXRlLXBpY2tlcmA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9QSUNLRVJfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX21vbnRoLXBpY2tlcmA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1BJQ0tFUl9DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9feWVhci1waWNrZXJgO1xuY29uc3QgQ0FMRU5EQVJfVEFCTEVfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX3RhYmxlYDtcbmNvbnN0IENBTEVOREFSX1JPV19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fcm93YDtcbmNvbnN0IENBTEVOREFSX0NFTExfQ0xBU1MgPSBgJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31fX2NlbGxgO1xuY29uc3QgQ0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1MgPSBgJHtDQUxFTkRBUl9DRUxMX0NMQVNTfS0tY2VudGVyLWl0ZW1zYDtcbmNvbnN0IENBTEVOREFSX01PTlRIX0xBQkVMX0NMQVNTID0gYCR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9X19tb250aC1sYWJlbGA7XG5jb25zdCBDQUxFTkRBUl9EQVlfT0ZfV0VFS19DTEFTUyA9IGAke0RBVEVfUElDS0VSX0NBTEVOREFSX0NMQVNTfV9fZGF5LW9mLXdlZWtgO1xuXG5jb25zdCBEQVRFX1BJQ0tFUiA9IGAuJHtEQVRFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfQlVUVE9OID0gYC4ke0RBVEVfUElDS0VSX0JVVFRPTl9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVQgPSBgLiR7REFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUID0gYC4ke0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUX0NMQVNTfWA7XG5jb25zdCBEQVRFX1BJQ0tFUl9DQUxFTkRBUiA9IGAuJHtEQVRFX1BJQ0tFUl9DQUxFTkRBUl9DTEFTU31gO1xuY29uc3QgREFURV9QSUNLRVJfU1RBVFVTID0gYC4ke0RBVEVfUElDS0VSX1NUQVRVU19DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfREFURSA9IGAuJHtDQUxFTkRBUl9EQVRFX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQgPSBgLiR7Q0FMRU5EQVJfREFURV9GT0NVU0VEX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9EQVRFX0NVUlJFTlRfTU9OVEggPSBgLiR7Q0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSID0gYC4ke0NBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1BSRVZJT1VTX01PTlRIID0gYC4ke0NBTEVOREFSX1BSRVZJT1VTX01PTlRIX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX1lFQVIgPSBgLiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ORVhUX01PTlRIID0gYC4ke0NBTEVOREFSX05FWFRfTU9OVEhfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX1lFQVJfU0VMRUNUSU9OID0gYC4ke0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9TRUxFQ1RJT04gPSBgLiR7Q0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USCA9IGAuJHtDQUxFTkRBUl9NT05USF9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfWUVBUiA9IGAuJHtDQUxFTkRBUl9ZRUFSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LID0gYC4ke0NBTEVOREFSX1BSRVZJT1VTX1lFQVJfQ0hVTktfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX05FWFRfWUVBUl9DSFVOSyA9IGAuJHtDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktfQ0xBU1N9YDtcbmNvbnN0IENBTEVOREFSX0RBVEVfUElDS0VSID0gYC4ke0NBTEVOREFSX0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9NT05USF9QSUNLRVIgPSBgLiR7Q0FMRU5EQVJfTU9OVEhfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX1BJQ0tFUiA9IGAuJHtDQUxFTkRBUl9ZRUFSX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgQ0FMRU5EQVJfTU9OVEhfRk9DVVNFRCA9IGAuJHtDQUxFTkRBUl9NT05USF9GT0NVU0VEX0NMQVNTfWA7XG5jb25zdCBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQgPSBgLiR7Q0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTfWA7XG5cbmNvbnN0IFZBTElEQVRJT05fTUVTU0FHRSA9IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZGF0ZVwiO1xuXG5jb25zdCBNT05USF9MQUJFTFMgPSBbXG4gIFwiSmFudWFyeVwiLFxuICBcIkZlYnJ1YXJ5XCIsXG4gIFwiTWFyY2hcIixcbiAgXCJBcHJpbFwiLFxuICBcIk1heVwiLFxuICBcIkp1bmVcIixcbiAgXCJKdWx5XCIsXG4gIFwiQXVndXN0XCIsXG4gIFwiU2VwdGVtYmVyXCIsXG4gIFwiT2N0b2JlclwiLFxuICBcIk5vdmVtYmVyXCIsXG4gIFwiRGVjZW1iZXJcIixcbl07XG5cbmNvbnN0IERBWV9PRl9XRUVLX0xBQkVMUyA9IFtcbiAgXCJTdW5kYXlcIixcbiAgXCJNb25kYXlcIixcbiAgXCJUdWVzZGF5XCIsXG4gIFwiV2VkbmVzZGF5XCIsXG4gIFwiVGh1cnNkYXlcIixcbiAgXCJGcmlkYXlcIixcbiAgXCJTYXR1cmRheVwiLFxuXTtcblxuY29uc3QgRU5URVJfS0VZQ09ERSA9IDEzO1xuXG5jb25zdCBZRUFSX0NIVU5LID0gMTI7XG5cbmNvbnN0IERFRkFVTFRfTUlOX0RBVEUgPSBcIjAwMDAtMDEtMDFcIjtcbmNvbnN0IERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQgPSBcIk1NL0REL1lZWVlcIjtcbmNvbnN0IElOVEVSTkFMX0RBVEVfRk9STUFUID0gXCJZWVlZLU1NLUREXCI7XG5cbmNvbnN0IE5PVF9ESVNBQkxFRF9TRUxFQ1RPUiA9IFwiOm5vdChbZGlzYWJsZWRdKVwiO1xuXG5jb25zdCBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzID0gKC4uLnNlbGVjdG9ycykgPT5cbiAgc2VsZWN0b3JzLm1hcCgocXVlcnkpID0+IHF1ZXJ5ICsgTk9UX0RJU0FCTEVEX1NFTEVDVE9SKS5qb2luKFwiLCBcIik7XG5cbmNvbnN0IERBVEVfUElDS0VSX0ZPQ1VTQUJMRSA9IHByb2Nlc3NGb2N1c2FibGVTZWxlY3RvcnMoXG4gIENBTEVOREFSX1BSRVZJT1VTX1lFQVIsXG4gIENBTEVOREFSX1BSRVZJT1VTX01PTlRILFxuICBDQUxFTkRBUl9ZRUFSX1NFTEVDVElPTixcbiAgQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OLFxuICBDQUxFTkRBUl9ORVhUX1lFQVIsXG4gIENBTEVOREFSX05FWFRfTU9OVEgsXG4gIENBTEVOREFSX0RBVEVfRk9DVVNFRCxcbik7XG5cbmNvbnN0IE1PTlRIX1BJQ0tFUl9GT0NVU0FCTEUgPSBwcm9jZXNzRm9jdXNhYmxlU2VsZWN0b3JzKFxuICBDQUxFTkRBUl9NT05USF9GT0NVU0VELFxuKTtcblxuY29uc3QgWUVBUl9QSUNLRVJfRk9DVVNBQkxFID0gcHJvY2Vzc0ZvY3VzYWJsZVNlbGVjdG9ycyhcbiAgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOSyxcbiAgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LLFxuICBDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQsXG4pO1xuXG4vLyAjcmVnaW9uIERhdGUgTWFuaXB1bGF0aW9uIEZ1bmN0aW9uc1xuXG4vKipcbiAqIEtlZXAgZGF0ZSB3aXRoaW4gbW9udGguIE1vbnRoIHdvdWxkIG9ubHkgYmUgb3ZlciBieSAxIHRvIDMgZGF5c1xuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVRvQ2hlY2sgdGhlIGRhdGUgb2JqZWN0IHRvIGNoZWNrXG4gKiBAcGFyYW0ge251bWJlcn0gbW9udGggdGhlIGNvcnJlY3QgbW9udGhcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgZGF0ZSwgY29ycmVjdGVkIGlmIG5lZWRlZFxuICovXG5jb25zdCBrZWVwRGF0ZVdpdGhpbk1vbnRoID0gKGRhdGVUb0NoZWNrLCBtb250aCkgPT4ge1xuICBpZiAobW9udGggIT09IGRhdGVUb0NoZWNrLmdldE1vbnRoKCkpIHtcbiAgICBkYXRlVG9DaGVjay5zZXREYXRlKDApO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVUb0NoZWNrO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSBmcm9tIG1vbnRoIGRheSB5ZWFyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHllYXIgdGhlIHllYXIgdG8gc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gbW9udGggdGhlIG1vbnRoIHRvIHNldCAoemVyby1pbmRleGVkKVxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGUgdGhlIGRhdGUgdG8gc2V0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHNldCBkYXRlXG4gKi9cbmNvbnN0IHNldERhdGUgPSAoeWVhciwgbW9udGgsIGRhdGUpID0+IHtcbiAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKDApO1xuICBuZXdEYXRlLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIHRvZGF5cyBkYXRlXG4gKlxuICogQHJldHVybnMge0RhdGV9IHRvZGF5cyBkYXRlXG4gKi9cbmNvbnN0IHRvZGF5ID0gKCkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZGF5ID0gbmV3RGF0ZS5nZXREYXRlKCk7XG4gIGNvbnN0IG1vbnRoID0gbmV3RGF0ZS5nZXRNb250aCgpO1xuICBjb25zdCB5ZWFyID0gbmV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICByZXR1cm4gc2V0RGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gZmlyc3QgZGF5IG9mIHRoZSBtb250aFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN0YXJ0T2ZNb250aCA9IChkYXRlKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgMSk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byBsYXN0IGRheSBvZiB0aGUgbW9udGhcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBsYXN0RGF5T2ZNb250aCA9IChkYXRlKSA9PiB7XG4gIGNvbnN0IG5ld0RhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApO1xuICByZXR1cm4gbmV3RGF0ZTtcbn07XG5cbi8qKlxuICogQWRkIGRheXMgdG8gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtRGF5cyB0aGUgZGlmZmVyZW5jZSBpbiBkYXlzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkRGF5cyA9IChfZGF0ZSwgbnVtRGF5cykgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoX2RhdGUuZ2V0VGltZSgpKTtcbiAgbmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgbnVtRGF5cyk7XG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdCBkYXlzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtRGF5cyB0aGUgZGlmZmVyZW5jZSBpbiBkYXlzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3ViRGF5cyA9IChfZGF0ZSwgbnVtRGF5cykgPT4gYWRkRGF5cyhfZGF0ZSwgLW51bURheXMpO1xuXG4vKipcbiAqIEFkZCB3ZWVrcyB0byBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1XZWVrcyB0aGUgZGlmZmVyZW5jZSBpbiB3ZWVrc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGFkZFdlZWtzID0gKF9kYXRlLCBudW1XZWVrcykgPT4gYWRkRGF5cyhfZGF0ZSwgbnVtV2Vla3MgKiA3KTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB3ZWVrcyBmcm9tIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVdlZWtzIHRoZSBkaWZmZXJlbmNlIGluIHdlZWtzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3ViV2Vla3MgPSAoX2RhdGUsIG51bVdlZWtzKSA9PiBhZGRXZWVrcyhfZGF0ZSwgLW51bVdlZWtzKTtcblxuLyoqXG4gKiBTZXQgZGF0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgKFN1bmRheSlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHN0YXJ0T2ZXZWVrID0gKF9kYXRlKSA9PiB7XG4gIGNvbnN0IGRheU9mV2VlayA9IF9kYXRlLmdldERheSgpO1xuICByZXR1cm4gc3ViRGF5cyhfZGF0ZSwgZGF5T2ZXZWVrKTtcbn07XG5cbi8qKlxuICogU2V0IGRhdGUgdG8gdGhlIGVuZCBvZiB0aGUgd2VlayAoU2F0dXJkYXkpXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1XZWVrcyB0aGUgZGlmZmVyZW5jZSBpbiB3ZWVrc1xuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IGVuZE9mV2VlayA9IChfZGF0ZSkgPT4ge1xuICBjb25zdCBkYXlPZldlZWsgPSBfZGF0ZS5nZXREYXkoKTtcbiAgcmV0dXJuIGFkZERheXMoX2RhdGUsIDYgLSBkYXlPZldlZWspO1xufTtcblxuLyoqXG4gKiBBZGQgbW9udGhzIHRvIGRhdGUgYW5kIGtlZXAgZGF0ZSB3aXRoaW4gbW9udGhcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bU1vbnRocyB0aGUgZGlmZmVyZW5jZSBpbiBtb250aHNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBhZGRNb250aHMgPSAoX2RhdGUsIG51bU1vbnRocykgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoX2RhdGUuZ2V0VGltZSgpKTtcblxuICBjb25zdCBkYXRlTW9udGggPSAobmV3RGF0ZS5nZXRNb250aCgpICsgMTIgKyBudW1Nb250aHMpICUgMTI7XG4gIG5ld0RhdGUuc2V0TW9udGgobmV3RGF0ZS5nZXRNb250aCgpICsgbnVtTW9udGhzKTtcbiAga2VlcERhdGVXaXRoaW5Nb250aChuZXdEYXRlLCBkYXRlTW9udGgpO1xuXG4gIHJldHVybiBuZXdEYXRlO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdCBtb250aHMgZnJvbSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZSB0aGUgZGF0ZSB0byBhZGp1c3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1Nb250aHMgdGhlIGRpZmZlcmVuY2UgaW4gbW9udGhzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc3ViTW9udGhzID0gKF9kYXRlLCBudW1Nb250aHMpID0+IGFkZE1vbnRocyhfZGF0ZSwgLW51bU1vbnRocyk7XG5cbi8qKlxuICogQWRkIHllYXJzIHRvIGRhdGUgYW5kIGtlZXAgZGF0ZSB3aXRoaW4gbW9udGhcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IG51bVllYXJzIHRoZSBkaWZmZXJlbmNlIGluIHllYXJzXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRkWWVhcnMgPSAoX2RhdGUsIG51bVllYXJzKSA9PiBhZGRNb250aHMoX2RhdGUsIG51bVllYXJzICogMTIpO1xuXG4vKipcbiAqIFN1YnRyYWN0IHllYXJzIGZyb20gZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbnVtWWVhcnMgdGhlIGRpZmZlcmVuY2UgaW4geWVhcnNcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgYWRqdXN0ZWQgZGF0ZVxuICovXG5jb25zdCBzdWJZZWFycyA9IChfZGF0ZSwgbnVtWWVhcnMpID0+IGFkZFllYXJzKF9kYXRlLCAtbnVtWWVhcnMpO1xuXG4vKipcbiAqIFNldCBtb250aHMgb2YgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gX2RhdGUgdGhlIGRhdGUgdG8gYWRqdXN0XG4gKiBAcGFyYW0ge251bWJlcn0gbW9udGggemVyby1pbmRleGVkIG1vbnRoIHRvIHNldFxuICogQHJldHVybnMge0RhdGV9IHRoZSBhZGp1c3RlZCBkYXRlXG4gKi9cbmNvbnN0IHNldE1vbnRoID0gKF9kYXRlLCBtb250aCkgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoX2RhdGUuZ2V0VGltZSgpKTtcblxuICBuZXdEYXRlLnNldE1vbnRoKG1vbnRoKTtcbiAga2VlcERhdGVXaXRoaW5Nb250aChuZXdEYXRlLCBtb250aCk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFNldCB5ZWFyIG9mIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IF9kYXRlIHRoZSBkYXRlIHRvIGFkanVzdFxuICogQHBhcmFtIHtudW1iZXJ9IHllYXIgdGhlIHllYXIgdG8gc2V0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3Qgc2V0WWVhciA9IChfZGF0ZSwgeWVhcikgPT4ge1xuICBjb25zdCBuZXdEYXRlID0gbmV3IERhdGUoX2RhdGUuZ2V0VGltZSgpKTtcblxuICBjb25zdCBtb250aCA9IG5ld0RhdGUuZ2V0TW9udGgoKTtcbiAgbmV3RGF0ZS5zZXRGdWxsWWVhcih5ZWFyKTtcbiAga2VlcERhdGVXaXRoaW5Nb250aChuZXdEYXRlLCBtb250aCk7XG5cbiAgcmV0dXJuIG5ld0RhdGU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgZWFybGllc3QgZGF0ZVxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBlYXJsaWVzdCBkYXRlXG4gKi9cbmNvbnN0IG1pbiA9IChkYXRlQSwgZGF0ZUIpID0+IHtcbiAgbGV0IG5ld0RhdGUgPSBkYXRlQTtcblxuICBpZiAoZGF0ZUIgPCBkYXRlQSkge1xuICAgIG5ld0RhdGUgPSBkYXRlQjtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGF0ZXN0IGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfSBkYXRlQiBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbGF0ZXN0IGRhdGVcbiAqL1xuY29uc3QgbWF4ID0gKGRhdGVBLCBkYXRlQikgPT4ge1xuICBsZXQgbmV3RGF0ZSA9IGRhdGVBO1xuXG4gIGlmIChkYXRlQiA+IGRhdGVBKSB7XG4gICAgbmV3RGF0ZSA9IGRhdGVCO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgYXJlIHRoZSBpbiB0aGUgc2FtZSB5ZWFyXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUIgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYXJlIGRhdGVzIGluIHRoZSBzYW1lIHllYXJcbiAqL1xuY29uc3QgaXNTYW1lWWVhciA9IChkYXRlQSwgZGF0ZUIpID0+XG4gIGRhdGVBICYmIGRhdGVCICYmIGRhdGVBLmdldEZ1bGxZZWFyKCkgPT09IGRhdGVCLmdldEZ1bGxZZWFyKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgZGF0ZXMgYXJlIHRoZSBpbiB0aGUgc2FtZSBtb250aFxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZUEgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVCIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge2Jvb2xlYW59IGFyZSBkYXRlcyBpbiB0aGUgc2FtZSBtb250aFxuICovXG5jb25zdCBpc1NhbWVNb250aCA9IChkYXRlQSwgZGF0ZUIpID0+XG4gIGlzU2FtZVllYXIoZGF0ZUEsIGRhdGVCKSAmJiBkYXRlQS5nZXRNb250aCgpID09PSBkYXRlQi5nZXRNb250aCgpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGFyZSB0aGUgc2FtZSBkYXRlXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlQSB0aGUgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGVBIHRoZSBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufSBhcmUgZGF0ZXMgdGhlIHNhbWUgZGF0ZVxuICovXG5jb25zdCBpc1NhbWVEYXkgPSAoZGF0ZUEsIGRhdGVCKSA9PlxuICBpc1NhbWVNb250aChkYXRlQSwgZGF0ZUIpICYmIGRhdGVBLmdldERhdGUoKSA9PT0gZGF0ZUIuZ2V0RGF0ZSgpO1xuXG4vKipcbiAqIHJldHVybiBhIG5ldyBkYXRlIHdpdGhpbiBtaW5pbXVtIGFuZCBtYXhpbXVtIGRhdGVcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgZGF0ZSB0byBjaGVja1xuICogQHBhcmFtIHtEYXRlfSBtaW5EYXRlIG1pbmltdW0gZGF0ZSB0byBhbGxvd1xuICogQHBhcmFtIHtEYXRlfSBtYXhEYXRlIG1heGltdW0gZGF0ZSB0byBhbGxvd1xuICogQHJldHVybnMge0RhdGV9IHRoZSBkYXRlIGJldHdlZW4gbWluIGFuZCBtYXhcbiAqL1xuY29uc3Qga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+IHtcbiAgbGV0IG5ld0RhdGUgPSBkYXRlO1xuXG4gIGlmIChkYXRlIDwgbWluRGF0ZSkge1xuICAgIG5ld0RhdGUgPSBtaW5EYXRlO1xuICB9IGVsc2UgaWYgKG1heERhdGUgJiYgZGF0ZSA+IG1heERhdGUpIHtcbiAgICBuZXdEYXRlID0gbWF4RGF0ZTtcbiAgfVxuXG4gIHJldHVybiBuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIGlzIHZhbGlkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0ge0RhdGV9IG1pbkRhdGUgbWluaW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcGFyYW0ge0RhdGV9IG1heERhdGUgbWF4aW11bSBkYXRlIHRvIGFsbG93XG4gKiBAcmV0dXJuIHtib29sZWFufSBpcyB0aGVyZSBhIGRheSB3aXRoaW4gdGhlIG1vbnRoIHdpdGhpbiBtaW4gYW5kIG1heCBkYXRlc1xuICovXG5jb25zdCBpc0RhdGVXaXRoaW5NaW5BbmRNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT5cbiAgZGF0ZSA+PSBtaW5EYXRlICYmICghbWF4RGF0ZSB8fCBkYXRlIDw9IG1heERhdGUpO1xuXG4vKipcbiAqIENoZWNrIGlmIGRhdGVzIG1vbnRoIGlzIGludmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZSBtb250aCBvdXRzaWRlIG1pbiBvciBtYXggZGF0ZXNcbiAqL1xuY29uc3QgaXNEYXRlc01vbnRoT3V0c2lkZU1pbk9yTWF4ID0gKGRhdGUsIG1pbkRhdGUsIG1heERhdGUpID0+XG4gIGxhc3REYXlPZk1vbnRoKGRhdGUpIDwgbWluRGF0ZSB8fCAobWF4RGF0ZSAmJiBzdGFydE9mTW9udGgoZGF0ZSkgPiBtYXhEYXRlKTtcblxuLyoqXG4gKiBDaGVjayBpZiBkYXRlcyB5ZWFyIGlzIGludmFsaWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBkYXRlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7RGF0ZX0gbWluRGF0ZSBtaW5pbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEBwYXJhbSB7RGF0ZX0gbWF4RGF0ZSBtYXhpbXVtIGRhdGUgdG8gYWxsb3dcbiAqIEByZXR1cm4ge2Jvb2xlYW59IGlzIHRoZSBtb250aCBvdXRzaWRlIG1pbiBvciBtYXggZGF0ZXNcbiAqL1xuY29uc3QgaXNEYXRlc1llYXJPdXRzaWRlTWluT3JNYXggPSAoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSkgPT5cbiAgbGFzdERheU9mTW9udGgoc2V0TW9udGgoZGF0ZSwgMTEpKSA8IG1pbkRhdGUgfHxcbiAgKG1heERhdGUgJiYgc3RhcnRPZk1vbnRoKHNldE1vbnRoKGRhdGUsIDApKSA+IG1heERhdGUpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IERhdGVSYW5nZUNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gcmFuZ2VTdGFydERhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gcmFuZ2VFbmREYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHdpdGhpblJhbmdlU3RhcnREYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHdpdGhpblJhbmdlRW5kRGF0ZVxuICovXG5cbi8qKlxuICogU2V0IHRoZSBzdGFydCwgZW5kLCBhbmQgd2l0aGluIHJhbmdlIHZhbHVlcyBmb3IgZGF0ZSByYW5nZSB2YXJpYW50cy5cblxuICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gRGF0ZSB0aGF0IGNvbmNsdWRlcyB0aGUgZGF0ZSByYW5nZS5cbiAqIEBwYXJhbSB7RGF0ZX0gcmFuZ2VEYXRlIC0gUmFuZ2UgZGF0ZSBkYXRhIGF0dHJpYnV0ZSB2YWx1ZSBvZiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICogQHJldHVybnMge0RhdGVSYW5nZUNvbnRleHR9IC0gRGF0ZXMgZm9yIHJhbmdlIHNlbGVjdGlvbi5cbiAqL1xuY29uc3Qgc2V0UmFuZ2VEYXRlcyA9IChkYXRlLCByYW5nZURhdGUpID0+IHtcbiAgY29uc3QgcmFuZ2VDb25jbHVzaW9uRGF0ZSA9IGRhdGU7XG4gIGNvbnN0IHJhbmdlU3RhcnREYXRlID0gcmFuZ2VEYXRlICYmIG1pbihyYW5nZUNvbmNsdXNpb25EYXRlLCByYW5nZURhdGUpO1xuICBjb25zdCByYW5nZUVuZERhdGUgPSByYW5nZURhdGUgJiYgbWF4KHJhbmdlQ29uY2x1c2lvbkRhdGUsIHJhbmdlRGF0ZSk7XG5cbiAgY29uc3Qgd2l0aGluUmFuZ2VTdGFydERhdGUgPSByYW5nZURhdGUgJiYgYWRkRGF5cyhyYW5nZVN0YXJ0RGF0ZSwgMSk7XG4gIGNvbnN0IHdpdGhpblJhbmdlRW5kRGF0ZSA9IHJhbmdlRGF0ZSAmJiBzdWJEYXlzKHJhbmdlRW5kRGF0ZSwgMSk7XG5cbiAgcmV0dXJuIHtcbiAgICByYW5nZVN0YXJ0RGF0ZSxcbiAgICByYW5nZUVuZERhdGUsXG4gICAgd2l0aGluUmFuZ2VTdGFydERhdGUsXG4gICAgd2l0aGluUmFuZ2VFbmREYXRlLFxuICB9O1xufTtcblxuLyoqXG4gKiBQYXJzZSBhIGRhdGUgd2l0aCBmb3JtYXQgTS1ELVlZXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGVTdHJpbmcgdGhlIGRhdGUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlIHN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBhZGp1c3REYXRlIHNob3VsZCB0aGUgZGF0ZSBiZSBhZGp1c3RlZFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZVxuICovXG5jb25zdCBwYXJzZURhdGVTdHJpbmcgPSAoXG4gIGRhdGVTdHJpbmcsXG4gIGRhdGVGb3JtYXQgPSBJTlRFUk5BTF9EQVRFX0ZPUk1BVCxcbiAgYWRqdXN0RGF0ZSA9IGZhbHNlLFxuKSA9PiB7XG4gIGxldCBkYXRlO1xuICBsZXQgbW9udGg7XG4gIGxldCBkYXk7XG4gIGxldCB5ZWFyO1xuICBsZXQgcGFyc2VkO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgbGV0IG1vbnRoU3RyO1xuICAgIGxldCBkYXlTdHI7XG4gICAgbGV0IHllYXJTdHI7XG5cbiAgICBpZiAoZGF0ZUZvcm1hdCA9PT0gREVGQVVMVF9FWFRFUk5BTF9EQVRFX0ZPUk1BVCkge1xuICAgICAgW21vbnRoU3RyLCBkYXlTdHIsIHllYXJTdHJdID0gZGF0ZVN0cmluZy5zcGxpdChcIi9cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFt5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyXSA9IGRhdGVTdHJpbmcuc3BsaXQoXCItXCIpO1xuICAgIH1cblxuICAgIGlmICh5ZWFyU3RyKSB7XG4gICAgICBwYXJzZWQgPSBwYXJzZUludCh5ZWFyU3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB7XG4gICAgICAgIHllYXIgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgeWVhciA9IE1hdGgubWF4KDAsIHllYXIpO1xuICAgICAgICAgIGlmICh5ZWFyU3RyLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdG9kYXkoKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFllYXJTdHViID1cbiAgICAgICAgICAgICAgY3VycmVudFllYXIgLSAoY3VycmVudFllYXIgJSAxMCAqKiB5ZWFyU3RyLmxlbmd0aCk7XG4gICAgICAgICAgICB5ZWFyID0gY3VycmVudFllYXJTdHViICsgcGFyc2VkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aFN0cikge1xuICAgICAgcGFyc2VkID0gcGFyc2VJbnQobW9udGhTdHIsIDEwKTtcbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZCkpIHtcbiAgICAgICAgbW9udGggPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1heCgxLCBtb250aCk7XG4gICAgICAgICAgbW9udGggPSBNYXRoLm1pbigxMiwgbW9udGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoICYmIGRheVN0ciAmJiB5ZWFyICE9IG51bGwpIHtcbiAgICAgIHBhcnNlZCA9IHBhcnNlSW50KGRheVN0ciwgMTApO1xuICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICBkYXkgPSBwYXJzZWQ7XG4gICAgICAgIGlmIChhZGp1c3REYXRlKSB7XG4gICAgICAgICAgY29uc3QgbGFzdERheU9mVGhlTW9udGggPSBzZXREYXRlKHllYXIsIG1vbnRoLCAwKS5nZXREYXRlKCk7XG4gICAgICAgICAgZGF5ID0gTWF0aC5tYXgoMSwgZGF5KTtcbiAgICAgICAgICBkYXkgPSBNYXRoLm1pbihsYXN0RGF5T2ZUaGVNb250aCwgZGF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBkYXRlID0gc2V0RGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGU7XG59O1xuXG4vKipcbiAqIEZvcm1hdCBhIGRhdGUgdG8gZm9ybWF0IE1NLURELVlZWVlcbiAqXG4gKiBAcGFyYW0ge0RhdGV9IGRhdGUgdGhlIGRhdGUgdG8gZm9ybWF0XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZUZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZ1xuICovXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGUsIGRhdGVGb3JtYXQgPSBJTlRFUk5BTF9EQVRFX0ZPUk1BVCkgPT4ge1xuICBjb25zdCBwYWRaZXJvcyA9ICh2YWx1ZSwgbGVuZ3RoKSA9PiBgMDAwMCR7dmFsdWV9YC5zbGljZSgtbGVuZ3RoKTtcblxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGlmIChkYXRlRm9ybWF0ID09PSBERUZBVUxUX0VYVEVSTkFMX0RBVEVfRk9STUFUKSB7XG4gICAgcmV0dXJuIFtwYWRaZXJvcyhtb250aCwgMiksIHBhZFplcm9zKGRheSwgMiksIHBhZFplcm9zKHllYXIsIDQpXS5qb2luKFwiL1wiKTtcbiAgfVxuXG4gIHJldHVybiBbcGFkWmVyb3MoeWVhciwgNCksIHBhZFplcm9zKG1vbnRoLCAyKSwgcGFkWmVyb3MoZGF5LCAyKV0uam9pbihcIi1cIik7XG59O1xuXG4vLyAjZW5kcmVnaW9uIERhdGUgTWFuaXB1bGF0aW9uIEZ1bmN0aW9uc1xuXG4vKipcbiAqIENyZWF0ZSBhIGdyaWQgc3RyaW5nIGZyb20gYW4gYXJyYXkgb2YgaHRtbCBzdHJpbmdzXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gaHRtbEFycmF5IHRoZSBhcnJheSBvZiBodG1sIGl0ZW1zXG4gKiBAcGFyYW0ge251bWJlcn0gcm93U2l6ZSB0aGUgbGVuZ3RoIG9mIGEgcm93XG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUgZ3JpZCBzdHJpbmdcbiAqL1xuY29uc3QgbGlzdFRvR3JpZEh0bWwgPSAoaHRtbEFycmF5LCByb3dTaXplKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgbGV0IHJvdyA9IFtdO1xuXG4gIGxldCBpID0gMDtcbiAgd2hpbGUgKGkgPCBodG1sQXJyYXkubGVuZ3RoKSB7XG4gICAgcm93ID0gW107XG5cbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICB3aGlsZSAoaSA8IGh0bWxBcnJheS5sZW5ndGggJiYgcm93Lmxlbmd0aCA8IHJvd1NpemUpIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgdGQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGh0bWxBcnJheVtpXSk7XG4gICAgICByb3cucHVzaCh0ZCk7XG4gICAgICBpICs9IDE7XG4gICAgfVxuXG4gICAgcm93LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIHRyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGdyaWQucHVzaCh0cik7XG4gIH1cblxuICByZXR1cm4gZ3JpZDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlQm9keSA9IChncmlkKSA9PiB7XG4gIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgZ3JpZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgdGFibGVCb2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlbGVtZW50KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHRhYmxlQm9keTtcbn07XG5cbi8qKlxuICogc2V0IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBhbmQgZGlzcGF0Y2ggYSBjaGFuZ2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGVsIFRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFRoZSBuZXcgdmFsdWUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuY29uc3QgY2hhbmdlRWxlbWVudFZhbHVlID0gKGVsLCB2YWx1ZSA9IFwiXCIpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvQ2hhbmdlID0gZWw7XG4gIGVsZW1lbnRUb0NoYW5nZS52YWx1ZSA9IHZhbHVlO1xuXG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgZGV0YWlsOiB7IHZhbHVlIH0sXG4gIH0pO1xuICBlbGVtZW50VG9DaGFuZ2UuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGRhdGUgcGlja2VyLlxuICogQHR5cGVkZWYge09iamVjdH0gRGF0ZVBpY2tlckNvbnRleHRcbiAqIEBwcm9wZXJ0eSB7SFRNTERpdkVsZW1lbnR9IGNhbGVuZGFyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGVQaWNrZXJFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnRlcm5hbElucHV0RWxcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gZXh0ZXJuYWxJbnB1dEVsXG4gKiBAcHJvcGVydHkge0hUTUxEaXZFbGVtZW50fSBzdGF0dXNFbFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZmlyc3RZZWFyQ2h1bmtFbFxuICogQHByb3BlcnR5IHtEYXRlfSBjYWxlbmRhckRhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gbWluRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSBtYXhEYXRlXG4gKiBAcHJvcGVydHkge0RhdGV9IHNlbGVjdGVkRGF0ZVxuICogQHByb3BlcnR5IHtEYXRlfSByYW5nZURhdGVcbiAqIEBwcm9wZXJ0eSB7RGF0ZX0gZGVmYXVsdERhdGVcbiAqL1xuXG4vKipcbiAqIEdldCBhbiBvYmplY3Qgb2YgdGhlIHByb3BlcnRpZXMgYW5kIGVsZW1lbnRzIGJlbG9uZ2luZyBkaXJlY3RseSB0byB0aGUgZ2l2ZW5cbiAqIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyXG4gKiBAcmV0dXJucyB7RGF0ZVBpY2tlckNvbnRleHR9IGVsZW1lbnRzXG4gKi9cbmNvbnN0IGdldERhdGVQaWNrZXJDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVQaWNrZXJFbCA9IGVsLmNsb3Nlc3QoREFURV9QSUNLRVIpO1xuXG4gIGlmICghZGF0ZVBpY2tlckVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFbGVtZW50IGlzIG1pc3Npbmcgb3V0ZXIgJHtEQVRFX1BJQ0tFUn1gKTtcbiAgfVxuXG4gIGNvbnN0IGludGVybmFsSW5wdXRFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUElDS0VSX0lOVEVSTkFMX0lOUFVULFxuICApO1xuICBjb25zdCBleHRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVCxcbiAgKTtcbiAgY29uc3QgY2FsZW5kYXJFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKERBVEVfUElDS0VSX0NBTEVOREFSKTtcbiAgY29uc3QgdG9nZ2xlQnRuRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihEQVRFX1BJQ0tFUl9CVVRUT04pO1xuICBjb25zdCBzdGF0dXNFbCA9IGRhdGVQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKERBVEVfUElDS0VSX1NUQVRVUyk7XG4gIGNvbnN0IGZpcnN0WWVhckNodW5rRWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSKTtcblxuICBjb25zdCBpbnB1dERhdGUgPSBwYXJzZURhdGVTdHJpbmcoXG4gICAgZXh0ZXJuYWxJbnB1dEVsLnZhbHVlLFxuICAgIERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQsXG4gICAgdHJ1ZSxcbiAgKTtcbiAgY29uc3Qgc2VsZWN0ZWREYXRlID0gcGFyc2VEYXRlU3RyaW5nKGludGVybmFsSW5wdXRFbC52YWx1ZSk7XG5cbiAgY29uc3QgY2FsZW5kYXJEYXRlID0gcGFyc2VEYXRlU3RyaW5nKGNhbGVuZGFyRWwuZGF0YXNldC52YWx1ZSk7XG4gIGNvbnN0IG1pbkRhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSk7XG4gIGNvbnN0IG1heERhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSk7XG4gIGNvbnN0IHJhbmdlRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5yYW5nZURhdGUpO1xuICBjb25zdCBkZWZhdWx0RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlUGlja2VyRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSk7XG5cbiAgaWYgKG1pbkRhdGUgJiYgbWF4RGF0ZSAmJiBtaW5EYXRlID4gbWF4RGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmltdW0gZGF0ZSBjYW5ub3QgYmUgYWZ0ZXIgbWF4aW11bSBkYXRlXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYWxlbmRhckRhdGUsXG4gICAgbWluRGF0ZSxcbiAgICB0b2dnbGVCdG5FbCxcbiAgICBzZWxlY3RlZERhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBmaXJzdFllYXJDaHVua0VsLFxuICAgIGRhdGVQaWNrZXJFbCxcbiAgICBpbnB1dERhdGUsXG4gICAgaW50ZXJuYWxJbnB1dEVsLFxuICAgIGV4dGVybmFsSW5wdXRFbCxcbiAgICBjYWxlbmRhckVsLFxuICAgIHJhbmdlRGF0ZSxcbiAgICBkZWZhdWx0RGF0ZSxcbiAgICBzdGF0dXNFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZXh0ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogQWRkIHRoZSByZWFkb25seSBhdHRyaWJ1dGUgdG8gaW5wdXQgZWxlbWVudCBhbmQgdGhlIGFyaWEtZGlzYWJsZWQgYXR0cmlidXRlIHRvIHRoZSB0b2dnbGUgY2FsZW5kYXIgYnV0dG9uIGFuZCBleHRlcm5hbCBpbnB1dCBlbGVtZW50cy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBkYXRlIHBpY2tlciBlbGVtZW50XG4gKi9cbmNvbnN0IGFyaWFEaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCB0b2dnbGVCdG5FbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIHRvZ2dsZUJ0bkVsLnNldEF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gIGV4dGVybmFsSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIsIHRydWUpO1xuICBleHRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBleHRlcm5hbElucHV0RWwsIHRvZ2dsZUJ0bkVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgdG9nZ2xlQnRuRWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgdG9nZ2xlQnRuRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcblxuICBleHRlcm5hbElucHV0RWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgZXh0ZXJuYWxJbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIik7XG4gIGV4dGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbn07XG5cbi8vICNyZWdpb24gVmFsaWRhdGlvblxuXG4vKipcbiAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgaW5wdXQgYXMgYSB2YWxpZCBkYXRlIG9mIGZvcm1hdCBNL0QvWVlZWVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaXNEYXRlSW5wdXRJbnZhbGlkID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZXh0ZXJuYWxJbnB1dEVsLCBtaW5EYXRlLCBtYXhEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3QgZGF0ZVN0cmluZyA9IGV4dGVybmFsSW5wdXRFbC52YWx1ZTtcbiAgbGV0IGlzSW52YWxpZCA9IGZhbHNlO1xuXG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgaXNJbnZhbGlkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGRhdGVTdHJpbmdQYXJ0cyA9IGRhdGVTdHJpbmcuc3BsaXQoXCIvXCIpO1xuICAgIGNvbnN0IFttb250aCwgZGF5LCB5ZWFyXSA9IGRhdGVTdHJpbmdQYXJ0cy5tYXAoKHN0cikgPT4ge1xuICAgICAgbGV0IHZhbHVlO1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB2YWx1ZSA9IHBhcnNlZDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGlmIChtb250aCAmJiBkYXkgJiYgeWVhciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjaGVja0RhdGUgPSBzZXREYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcblxuICAgICAgaWYgKFxuICAgICAgICBjaGVja0RhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGggLSAxICYmXG4gICAgICAgIGNoZWNrRGF0ZS5nZXREYXRlKCkgPT09IGRheSAmJlxuICAgICAgICBjaGVja0RhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJlxuICAgICAgICBkYXRlU3RyaW5nUGFydHNbMl0ubGVuZ3RoID09PSA0ICYmXG4gICAgICAgIGlzRGF0ZVdpdGhpbk1pbkFuZE1heChjaGVja0RhdGUsIG1pbkRhdGUsIG1heERhdGUpXG4gICAgICApIHtcbiAgICAgICAgaXNJbnZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzSW52YWxpZDtcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHZhbHVlIGluIHRoZSBpbnB1dCBhcyBhIHZhbGlkIGRhdGUgb2YgZm9ybWF0IE0vRC9ZWVlZXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCB2YWxpZGF0ZURhdGVJbnB1dCA9IChlbCkgPT4ge1xuICBjb25zdCB7IGV4dGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCBpc0ludmFsaWQgPSBpc0RhdGVJbnB1dEludmFsaWQoZXh0ZXJuYWxJbnB1dEVsKTtcblxuICBpZiAoaXNJbnZhbGlkICYmICFleHRlcm5hbElucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBleHRlcm5hbElucHV0RWwuc2V0Q3VzdG9tVmFsaWRpdHkoVkFMSURBVElPTl9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICghaXNJbnZhbGlkICYmIGV4dGVybmFsSW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZSA9PT0gVkFMSURBVElPTl9NRVNTQUdFKSB7XG4gICAgZXh0ZXJuYWxJbnB1dEVsLnNldEN1c3RvbVZhbGlkaXR5KFwiXCIpO1xuICB9XG59O1xuXG4vLyAjZW5kcmVnaW9uIFZhbGlkYXRpb25cblxuLyoqXG4gKiBFbmFibGUgdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgcmVjb25jaWxlSW5wdXRWYWx1ZXMgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBpbnRlcm5hbElucHV0RWwsIGlucHV0RGF0ZSB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuICBsZXQgbmV3VmFsdWUgPSBcIlwiO1xuXG4gIGlmIChpbnB1dERhdGUgJiYgIWlzRGF0ZUlucHV0SW52YWxpZChlbCkpIHtcbiAgICBuZXdWYWx1ZSA9IGZvcm1hdERhdGUoaW5wdXREYXRlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgbmV3VmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgdmFsdWUgb2YgdGhlIGRhdGUgcGlja2VyIGlucHV0cy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0ZVN0cmluZyBUaGUgZGF0ZSBzdHJpbmcgdG8gdXBkYXRlIGluIFlZWVktTU0tREQgZm9ybWF0XG4gKi9cbmNvbnN0IHNldENhbGVuZGFyVmFsdWUgPSAoZWwsIGRhdGVTdHJpbmcpID0+IHtcbiAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nKTtcblxuICBpZiAocGFyc2VkRGF0ZSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKHBhcnNlZERhdGUsIERFRkFVTFRfRVhURVJOQUxfREFURV9GT1JNQVQpO1xuXG4gICAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGludGVybmFsSW5wdXRFbCwgZXh0ZXJuYWxJbnB1dEVsIH0gPVxuICAgICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGludGVybmFsSW5wdXRFbCwgZGF0ZVN0cmluZyk7XG4gICAgY2hhbmdlRWxlbWVudFZhbHVlKGV4dGVybmFsSW5wdXRFbCwgZm9ybWF0dGVkRGF0ZSk7XG5cbiAgICB2YWxpZGF0ZURhdGVJbnB1dChkYXRlUGlja2VyRWwpO1xuICB9XG59O1xuXG4vKipcbiAqIEVuaGFuY2UgYW4gaW5wdXQgd2l0aCB0aGUgZGF0ZSBwaWNrZXIgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBUaGUgaW5pdGlhbCB3cmFwcGluZyBlbGVtZW50IG9mIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgZW5oYW5jZURhdGVQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1BJQ0tFUik7XG4gIGNvbnN0IHsgZGVmYXVsdFZhbHVlIH0gPSBkYXRlUGlja2VyRWwuZGF0YXNldDtcblxuICBjb25zdCBpbnRlcm5hbElucHV0RWwgPSBkYXRlUGlja2VyRWwucXVlcnlTZWxlY3RvcihgaW5wdXRgKTtcblxuICBpZiAoIWludGVybmFsSW5wdXRFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtEQVRFX1BJQ0tFUn0gaXMgbWlzc2luZyBpbm5lciBpbnB1dGApO1xuICB9XG5cbiAgaWYgKGludGVybmFsSW5wdXRFbC52YWx1ZSkge1xuICAgIGludGVybmFsSW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gIH1cblxuICBjb25zdCBtaW5EYXRlID0gcGFyc2VEYXRlU3RyaW5nKFxuICAgIGRhdGVQaWNrZXJFbC5kYXRhc2V0Lm1pbkRhdGUgfHwgaW50ZXJuYWxJbnB1dEVsLmdldEF0dHJpYnV0ZShcIm1pblwiKSxcbiAgKTtcbiAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSA9IG1pbkRhdGVcbiAgICA/IGZvcm1hdERhdGUobWluRGF0ZSlcbiAgICA6IERFRkFVTFRfTUlOX0RBVEU7XG5cbiAgY29uc3QgbWF4RGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhcbiAgICBkYXRlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlIHx8IGludGVybmFsSW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtYXhcIiksXG4gICk7XG4gIGlmIChtYXhEYXRlKSB7XG4gICAgZGF0ZVBpY2tlckVsLmRhdGFzZXQubWF4RGF0ZSA9IGZvcm1hdERhdGUobWF4RGF0ZSk7XG4gIH1cblxuICBjb25zdCBjYWxlbmRhcldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjYWxlbmRhcldyYXBwZXIuY2xhc3NMaXN0LmFkZChEQVRFX1BJQ0tFUl9XUkFQUEVSX0NMQVNTKTtcblxuICBjb25zdCBleHRlcm5hbElucHV0RWwgPSBpbnRlcm5hbElucHV0RWwuY2xvbmVOb2RlKCk7XG4gIGV4dGVybmFsSW5wdXRFbC5jbGFzc0xpc3QuYWRkKERBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUX0NMQVNTKTtcbiAgZXh0ZXJuYWxJbnB1dEVsLnR5cGUgPSBcInRleHRcIjtcblxuICBjYWxlbmRhcldyYXBwZXIuYXBwZW5kQ2hpbGQoZXh0ZXJuYWxJbnB1dEVsKTtcbiAgY2FsZW5kYXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtEQVRFX1BJQ0tFUl9CVVRUT05fQ0xBU1N9XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWxhYmVsPVwiVG9nZ2xlIGNhbGVuZGFyXCI+PC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cIiR7REFURV9QSUNLRVJfQ0FMRU5EQVJfQ0xBU1N9XCIgcm9sZT1cImFwcGxpY2F0aW9uXCIgaGlkZGVuPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1c2Etc3Itb25seSAke0RBVEVfUElDS0VSX1NUQVRVU19DTEFTU31cIiByb2xlPVwic3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCI+PC9kaXY+YCxcbiAgKTtcblxuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBpbnRlcm5hbElucHV0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgaW50ZXJuYWxJbnB1dEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgaW50ZXJuYWxJbnB1dEVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5URVJOQUxfSU5QVVRfQ0xBU1MpO1xuICBpbnRlcm5hbElucHV0RWwucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICBpbnRlcm5hbElucHV0RWwucmVxdWlyZWQgPSBmYWxzZTtcblxuICBkYXRlUGlja2VyRWwuYXBwZW5kQ2hpbGQoY2FsZW5kYXJXcmFwcGVyKTtcbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfSU5JVElBTElaRURfQ0xBU1MpO1xuXG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBzZXRDYWxlbmRhclZhbHVlKGRhdGVQaWNrZXJFbCwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGlmIChpbnRlcm5hbElucHV0RWwuZGlzYWJsZWQpIHtcbiAgICBkaXNhYmxlKGRhdGVQaWNrZXJFbCk7XG4gICAgaW50ZXJuYWxJbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cblxuICBpZiAoaW50ZXJuYWxJbnB1dEVsLmhhc0F0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIikpIHtcbiAgICBhcmlhRGlzYWJsZShkYXRlUGlja2VyRWwpO1xuICAgIGludGVybmFsSW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpO1xuICB9XG59O1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIC0gRGF0ZSBTZWxlY3Rpb24gVmlld1xuXG4vKipcbiAqIHJlbmRlciB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICogQHBhcmFtIHtEYXRlfSBfZGF0ZVRvRGlzcGxheSBhIGRhdGUgdG8gcmVuZGVyIG9uIHRoZSBjYWxlbmRhclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgcmVuZGVyQ2FsZW5kYXIgPSAoZWwsIF9kYXRlVG9EaXNwbGF5KSA9PiB7XG4gIGNvbnN0IHtcbiAgICBkYXRlUGlja2VyRWwsXG4gICAgY2FsZW5kYXJFbCxcbiAgICBzdGF0dXNFbCxcbiAgICBzZWxlY3RlZERhdGUsXG4gICAgbWF4RGF0ZSxcbiAgICBtaW5EYXRlLFxuICAgIHJhbmdlRGF0ZSxcbiAgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgdG9kYXlzRGF0ZSA9IHRvZGF5KCk7XG4gIGxldCBkYXRlVG9EaXNwbGF5ID0gX2RhdGVUb0Rpc3BsYXkgfHwgdG9kYXlzRGF0ZTtcblxuICBjb25zdCBjYWxlbmRhcldhc0hpZGRlbiA9IGNhbGVuZGFyRWwuaGlkZGVuO1xuXG4gIGNvbnN0IGZvY3VzZWREYXRlID0gYWRkRGF5cyhkYXRlVG9EaXNwbGF5LCAwKTtcbiAgY29uc3QgZm9jdXNlZE1vbnRoID0gZGF0ZVRvRGlzcGxheS5nZXRNb250aCgpO1xuICBjb25zdCBmb2N1c2VkWWVhciA9IGRhdGVUb0Rpc3BsYXkuZ2V0RnVsbFllYXIoKTtcblxuICBjb25zdCBwcmV2TW9udGggPSBzdWJNb250aHMoZGF0ZVRvRGlzcGxheSwgMSk7XG4gIGNvbnN0IG5leHRNb250aCA9IGFkZE1vbnRocyhkYXRlVG9EaXNwbGF5LCAxKTtcblxuICBjb25zdCBjdXJyZW50Rm9ybWF0dGVkRGF0ZSA9IGZvcm1hdERhdGUoZGF0ZVRvRGlzcGxheSk7XG5cbiAgY29uc3QgZmlyc3RPZk1vbnRoID0gc3RhcnRPZk1vbnRoKGRhdGVUb0Rpc3BsYXkpO1xuICBjb25zdCBwcmV2QnV0dG9uc0Rpc2FibGVkID0gaXNTYW1lTW9udGgoZGF0ZVRvRGlzcGxheSwgbWluRGF0ZSk7XG4gIGNvbnN0IG5leHRCdXR0b25zRGlzYWJsZWQgPSBpc1NhbWVNb250aChkYXRlVG9EaXNwbGF5LCBtYXhEYXRlKTtcblxuICBjb25zdCB7XG4gICAgcmFuZ2VTdGFydERhdGUsXG4gICAgcmFuZ2VFbmREYXRlLFxuICAgIHdpdGhpblJhbmdlU3RhcnREYXRlLFxuICAgIHdpdGhpblJhbmdlRW5kRGF0ZSxcbiAgfSA9IHNldFJhbmdlRGF0ZXMoc2VsZWN0ZWREYXRlIHx8IGRhdGVUb0Rpc3BsYXksIHJhbmdlRGF0ZSk7XG5cbiAgY29uc3QgbW9udGhMYWJlbCA9IE1PTlRIX0xBQkVMU1tmb2N1c2VkTW9udGhdO1xuXG4gIGNvbnN0IGdlbmVyYXRlRGF0ZUh0bWwgPSAoZGF0ZVRvUmVuZGVyKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtDQUxFTkRBUl9EQVRFX0NMQVNTXTtcbiAgICBjb25zdCBkYXkgPSBkYXRlVG9SZW5kZXIuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZVRvUmVuZGVyLmdldE1vbnRoKCk7XG4gICAgY29uc3QgeWVhciA9IGRhdGVUb1JlbmRlci5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGVUb1JlbmRlci5nZXREYXkoKTtcblxuICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGRhdGVUb1JlbmRlcik7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBpc0Rpc2FibGVkID0gIWlzRGF0ZVdpdGhpbk1pbkFuZE1heChkYXRlVG9SZW5kZXIsIG1pbkRhdGUsIG1heERhdGUpO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBpc1NhbWVEYXkoZGF0ZVRvUmVuZGVyLCBzZWxlY3RlZERhdGUpO1xuXG4gICAgaWYgKGlzU2FtZU1vbnRoKGRhdGVUb1JlbmRlciwgcHJldk1vbnRoKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUFJFVklPVVNfTU9OVEhfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmIChpc1NhbWVNb250aChkYXRlVG9SZW5kZXIsIGZvY3VzZWREYXRlKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2FtZU1vbnRoKGRhdGVUb1JlbmRlciwgbmV4dE1vbnRoKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfTkVYVF9NT05USF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgdG9kYXlzRGF0ZSkpIHtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9EQVRFX1RPREFZX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAocmFuZ2VEYXRlKSB7XG4gICAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgcmFuZ2VEYXRlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX0NMQVNTKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHJhbmdlU3RhcnREYXRlKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfREFURV9SQU5HRV9EQVRFX1NUQVJUX0NMQVNTKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU2FtZURheShkYXRlVG9SZW5kZXIsIHJhbmdlRW5kRGF0ZSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfUkFOR0VfREFURV9FTkRfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGlzRGF0ZVdpdGhpbk1pbkFuZE1heChcbiAgICAgICAgICBkYXRlVG9SZW5kZXIsXG4gICAgICAgICAgd2l0aGluUmFuZ2VTdGFydERhdGUsXG4gICAgICAgICAgd2l0aGluUmFuZ2VFbmREYXRlLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfV0lUSElOX1JBTkdFX0NMQVNTKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNTYW1lRGF5KGRhdGVUb1JlbmRlciwgZm9jdXNlZERhdGUpKSB7XG4gICAgICB0YWJpbmRleCA9IFwiMFwiO1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX0RBVEVfRk9DVVNFRF9DTEFTUyk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9udGhTdHIgPSBNT05USF9MQUJFTFNbbW9udGhdO1xuICAgIGNvbnN0IGRheVN0ciA9IERBWV9PRl9XRUVLX0xBQkVMU1tkYXlPZldlZWtdO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgdGFiaW5kZXgpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc2VzLmpvaW4oXCIgXCIpKTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1kYXlcIiwgZGF5KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1tb250aFwiLCBtb250aCArIDEpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXllYXJcIiwgeWVhcik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgZm9ybWF0dGVkRGF0ZSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcbiAgICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgICAgU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtkYXl9ICR7bW9udGhTdHJ9ICR7eWVhcn0gJHtkYXlTdHJ9YCxcbiAgICApO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gICAgaWYgKGlzRGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGJ0bi50ZXh0Q29udGVudCA9IGRheTtcblxuICAgIHJldHVybiBidG47XG4gIH07XG5cbiAgLy8gc2V0IGRhdGUgdG8gZmlyc3QgcmVuZGVyZWQgZGF5XG4gIGRhdGVUb0Rpc3BsYXkgPSBzdGFydE9mV2VlayhmaXJzdE9mTW9udGgpO1xuXG4gIGNvbnN0IGRheXMgPSBbXTtcblxuICB3aGlsZSAoXG4gICAgZGF5cy5sZW5ndGggPCAyOCB8fFxuICAgIGRhdGVUb0Rpc3BsYXkuZ2V0TW9udGgoKSA9PT0gZm9jdXNlZE1vbnRoIHx8XG4gICAgZGF5cy5sZW5ndGggJSA3ICE9PSAwXG4gICkge1xuICAgIGRheXMucHVzaChnZW5lcmF0ZURhdGVIdG1sKGRhdGVUb0Rpc3BsYXkpKTtcbiAgICBkYXRlVG9EaXNwbGF5ID0gYWRkRGF5cyhkYXRlVG9EaXNwbGF5LCAxKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGVzR3JpZCA9IGxpc3RUb0dyaWRIdG1sKGRheXMsIDcpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuZGF0YXNldC52YWx1ZSA9IGN1cnJlbnRGb3JtYXR0ZWREYXRlO1xuICBuZXdDYWxlbmRhci5zdHlsZS50b3AgPSBgJHtkYXRlUGlja2VyRWwub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgbmV3Q2FsZW5kYXIuaGlkZGVuID0gZmFsc2U7XG4gIG5ld0NhbGVuZGFyLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFxuICAgIDxkaXYgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiJHtDQUxFTkRBUl9EQVRFX1BJQ0tFUl9DTEFTU31cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX1JPV19DTEFTU31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgYmFjayBvbmUgeWVhclwiXG4gICAgICAgICAgICAke3ByZXZCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9QUkVWSU9VU19NT05USF9DTEFTU31cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hdmlnYXRlIGJhY2sgb25lIG1vbnRoXCJcbiAgICAgICAgICAgICR7cHJldkJ1dHRvbnNEaXNhYmxlZCA/IGBkaXNhYmxlZD1cImRpc2FibGVkXCJgIDogXCJcIn1cbiAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtDQUxFTkRBUl9DRUxMX0NMQVNTfSAke0NBTEVOREFSX01PTlRIX0xBQkVMX0NMQVNTfVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX01PTlRIX1NFTEVDVElPTl9DTEFTU31cIiBhcmlhLWxhYmVsPVwiJHttb250aExhYmVsfS4gU2VsZWN0IG1vbnRoXCJcbiAgICAgICAgICA+JHttb250aExhYmVsfTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3M9XCIke0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OX0NMQVNTfVwiIGFyaWEtbGFiZWw9XCIke2ZvY3VzZWRZZWFyfS4gU2VsZWN0IHllYXJcIlxuICAgICAgICAgID4ke2ZvY3VzZWRZZWFyfTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Q0FMRU5EQVJfQ0VMTF9DTEFTU30gJHtDQUxFTkRBUl9DRUxMX0NFTlRFUl9JVEVNU19DTEFTU31cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzPVwiJHtDQUxFTkRBUl9ORVhUX01PTlRIX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGhcIlxuICAgICAgICAgICAgJHtuZXh0QnV0dG9uc0Rpc2FibGVkID8gYGRpc2FibGVkPVwiZGlzYWJsZWRcImAgOiBcIlwifVxuICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke0NBTEVOREFSX0NFTExfQ0xBU1N9ICR7Q0FMRU5EQVJfQ0VMTF9DRU5URVJfSVRFTVNfQ0xBU1N9XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzcz1cIiR7Q0FMRU5EQVJfTkVYVF9ZRUFSX0NMQVNTfVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhclwiXG4gICAgICAgICAgICAke25leHRCdXR0b25zRGlzYWJsZWQgPyBgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiYCA6IFwiXCJ9XG4gICAgICAgICAgPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcblxuICBjb25zdCB0YWJsZUhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gIHRhYmxlLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZUhlYWQpO1xuICBjb25zdCB0YWJsZUhlYWRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlSGVhZC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVIZWFkUm93KTtcblxuICBjb25zdCBkYXlzT2ZXZWVrID0ge1xuICAgIFN1bmRheTogXCJTXCIsXG4gICAgTW9uZGF5OiBcIk1cIixcbiAgICBUdWVzZGF5OiBcIlRcIixcbiAgICBXZWRuZXNkYXk6IFwiV1wiLFxuICAgIFRodXJzZGF5OiBcIlRoXCIsXG4gICAgRnJpZGF5OiBcIkZyXCIsXG4gICAgU2F0dXJkYXk6IFwiU1wiLFxuICB9O1xuXG4gIE9iamVjdC5rZXlzKGRheXNPZldlZWspLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIHRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX0RBWV9PRl9XRUVLX0NMQVNTKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcImNvbFwiKTtcbiAgICB0aC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGtleSk7XG4gICAgdGgudGV4dENvbnRlbnQgPSBkYXlzT2ZXZWVrW2tleV07XG4gICAgdGFibGVIZWFkUm93Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0aCk7XG4gIH0pO1xuXG4gIGNvbnN0IHRhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keShkYXRlc0dyaWQpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVCb2R5KTtcblxuICAvLyBDb250YWluZXIgZm9yIFllYXJzLCBNb250aHMsIGFuZCBEYXlzXG4gIGNvbnN0IGRhdGVQaWNrZXJDYWxlbmRhckNvbnRhaW5lciA9XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG5cbiAgZGF0ZVBpY2tlckNhbGVuZGFyQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0YWJsZSk7XG5cbiAgY2FsZW5kYXJFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdDYWxlbmRhciwgY2FsZW5kYXJFbCk7XG5cbiAgZGF0ZVBpY2tlckVsLmNsYXNzTGlzdC5hZGQoREFURV9QSUNLRVJfQUNUSVZFX0NMQVNTKTtcblxuICBjb25zdCBzdGF0dXNlcyA9IFtdO1xuXG4gIGlmIChpc1NhbWVEYXkoc2VsZWN0ZWREYXRlLCBmb2N1c2VkRGF0ZSkpIHtcbiAgICBzdGF0dXNlcy5wdXNoKFwiU2VsZWN0ZWQgZGF0ZVwiKTtcbiAgfVxuXG4gIGlmIChjYWxlbmRhcldhc0hpZGRlbikge1xuICAgIHN0YXR1c2VzLnB1c2goXG4gICAgICBcIllvdSBjYW4gbmF2aWdhdGUgYnkgZGF5IHVzaW5nIGxlZnQgYW5kIHJpZ2h0IGFycm93c1wiLFxuICAgICAgXCJXZWVrcyBieSB1c2luZyB1cCBhbmQgZG93biBhcnJvd3NcIixcbiAgICAgIFwiTW9udGhzIGJ5IHVzaW5nIHBhZ2UgdXAgYW5kIHBhZ2UgZG93biBrZXlzXCIsXG4gICAgICBcIlllYXJzIGJ5IHVzaW5nIHNoaWZ0IHBsdXMgcGFnZSB1cCBhbmQgc2hpZnQgcGx1cyBwYWdlIGRvd25cIixcbiAgICAgIFwiSG9tZSBhbmQgZW5kIGtleXMgbmF2aWdhdGUgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgd2Vla1wiLFxuICAgICk7XG4gICAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHN0YXR1c2VzLnB1c2goYCR7bW9udGhMYWJlbH0gJHtmb2N1c2VkWWVhcn1gKTtcbiAgfVxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IHN0YXR1c2VzLmpvaW4oXCIuIFwiKTtcblxuICByZXR1cm4gbmV3Q2FsZW5kYXI7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IF9idXR0b25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c1llYXIgPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBzdWJZZWFycyhjYWxlbmRhckRhdGUsIDEpO1xuICBkYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBjb25zdCBuZXdDYWxlbmRhciA9IHJlbmRlckNhbGVuZGFyKGNhbGVuZGFyRWwsIGRhdGUpO1xuXG4gIGxldCBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfUFJFVklPVVNfWUVBUik7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IF9idXR0b25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c01vbnRoID0gKF9idXR0b25FbCkgPT4ge1xuICBpZiAoX2J1dHRvbkVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KF9idXR0b25FbCk7XG4gIGxldCBkYXRlID0gc3ViTW9udGhzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9QUkVWSU9VU19NT05USCk7XG4gIGlmIChuZXh0VG9Gb2N1cy5kaXNhYmxlZCkge1xuICAgIG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX1BJQ0tFUik7XG4gIH1cbiAgbmV4dFRvRm9jdXMuZm9jdXMoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IF9idXR0b25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlOZXh0TW9udGggPSAoX2J1dHRvbkVsKSA9PiB7XG4gIGlmIChfYnV0dG9uRWwuZGlzYWJsZWQpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoX2J1dHRvbkVsKTtcbiAgbGV0IGRhdGUgPSBhZGRNb250aHMoY2FsZW5kYXJEYXRlLCAxKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcblxuICBsZXQgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX05FWFRfTU9OVEgpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IF9idXR0b25FbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlOZXh0WWVhciA9IChfYnV0dG9uRWwpID0+IHtcbiAgaWYgKF9idXR0b25FbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChfYnV0dG9uRWwpO1xuICBsZXQgZGF0ZSA9IGFkZFllYXJzKGNhbGVuZGFyRGF0ZSwgMSk7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX1lFQVIpO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIEhpZGUgdGhlIGNhbGVuZGFyIG9mIGEgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgaGlkZUNhbGVuZGFyID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBjYWxlbmRhckVsLCBzdGF0dXNFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQoZWwpO1xuXG4gIGRhdGVQaWNrZXJFbC5jbGFzc0xpc3QucmVtb3ZlKERBVEVfUElDS0VSX0FDVElWRV9DTEFTUyk7XG4gIGNhbGVuZGFyRWwuaGlkZGVuID0gdHJ1ZTtcbiAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBcIlwiO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSBkYXRlIHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGNhbGVuZGFyRGF0ZUVsIEEgZGF0ZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHNlbGVjdERhdGUgPSAoY2FsZW5kYXJEYXRlRWwpID0+IHtcbiAgaWYgKGNhbGVuZGFyRGF0ZUVsLmRpc2FibGVkKSByZXR1cm47XG5cbiAgY29uc3QgeyBkYXRlUGlja2VyRWwsIGV4dGVybmFsSW5wdXRFbCB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChjYWxlbmRhckRhdGVFbCk7XG5cbiAgc2V0Q2FsZW5kYXJWYWx1ZShjYWxlbmRhckRhdGVFbCwgY2FsZW5kYXJEYXRlRWwuZGF0YXNldC52YWx1ZSk7XG4gIGhpZGVDYWxlbmRhcihkYXRlUGlja2VyRWwpO1xuXG4gIGV4dGVybmFsSW5wdXRFbC5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBUb2dnbGUgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3QgdG9nZ2xlQ2FsZW5kYXIgPSAoZWwpID0+IHtcbiAgaWYgKGVsLmRpc2FibGVkIHx8IGVsLmhhc0F0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIikpIHJldHVybjtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUsIGRlZmF1bHREYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBpZiAoY2FsZW5kYXJFbC5oaWRkZW4pIHtcbiAgICBjb25zdCBkYXRlVG9EaXNwbGF5ID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KFxuICAgICAgaW5wdXREYXRlIHx8IGRlZmF1bHREYXRlIHx8IHRvZGF5KCksXG4gICAgICBtaW5EYXRlLFxuICAgICAgbWF4RGF0ZSxcbiAgICApO1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZVRvRGlzcGxheSk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZUNhbGVuZGFyKGVsKTtcbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGUgdGhlIGNhbGVuZGFyIHdoZW4gdmlzaWJsZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXJcbiAqL1xuY29uc3QgdXBkYXRlQ2FsZW5kYXJJZlZpc2libGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBpbnB1dERhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcbiAgY29uc3QgY2FsZW5kYXJTaG93biA9ICFjYWxlbmRhckVsLmhpZGRlbjtcblxuICBpZiAoY2FsZW5kYXJTaG93biAmJiBpbnB1dERhdGUpIHtcbiAgICBjb25zdCBkYXRlVG9EaXNwbGF5ID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGlucHV0RGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gICAgcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZVRvRGlzcGxheSk7XG4gIH1cbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgLSBEYXRlIFNlbGVjdGlvbiBWaWV3XG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgLSBNb250aCBTZWxlY3Rpb24gVmlld1xuLyoqXG4gKiBEaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuIGluIHRoZSBkYXRlIHBpY2tlci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IGEgcmVmZXJlbmNlIHRvIHRoZSBuZXcgY2FsZW5kYXIgZWxlbWVudFxuICovXG5jb25zdCBkaXNwbGF5TW9udGhTZWxlY3Rpb24gPSAoZWwsIG1vbnRoVG9EaXNwbGF5KSA9PiB7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgc3RhdHVzRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IGNhbGVuZGFyRGF0ZS5nZXRNb250aCgpO1xuICBjb25zdCBmb2N1c2VkTW9udGggPSBtb250aFRvRGlzcGxheSA9PSBudWxsID8gc2VsZWN0ZWRNb250aCA6IG1vbnRoVG9EaXNwbGF5O1xuXG4gIGNvbnN0IG1vbnRocyA9IE1PTlRIX0xBQkVMUy5tYXAoKG1vbnRoLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG1vbnRoVG9DaGVjayA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgaW5kZXgpO1xuXG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGlzRGF0ZXNNb250aE91dHNpZGVNaW5Pck1heChcbiAgICAgIG1vbnRoVG9DaGVjayxcbiAgICAgIG1pbkRhdGUsXG4gICAgICBtYXhEYXRlLFxuICAgICk7XG5cbiAgICBsZXQgdGFiaW5kZXggPSBcIi0xXCI7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gW0NBTEVOREFSX01PTlRIX0NMQVNTXTtcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gaW5kZXggPT09IHNlbGVjdGVkTW9udGg7XG5cbiAgICBpZiAoaW5kZXggPT09IGZvY3VzZWRNb250aCkge1xuICAgICAgdGFiaW5kZXggPSBcIjBcIjtcbiAgICAgIGNsYXNzZXMucHVzaChDQUxFTkRBUl9NT05USF9GT0NVU0VEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX01PTlRIX1NFTEVDVEVEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCB0YWJpbmRleCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzZXMuam9pbihcIiBcIikpO1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIsIGluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1sYWJlbFwiLCBtb250aCk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgICBpZiAoaXNEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYnRuLnRleHRDb250ZW50ID0gbW9udGg7XG5cbiAgICByZXR1cm4gYnRuO1xuICB9KTtcblxuICBjb25zdCBtb250aHNIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbW9udGhzSHRtbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpO1xuICBtb250aHNIdG1sLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX01PTlRIX1BJQ0tFUl9DTEFTUyk7XG5cbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgdGFibGUuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInByZXNlbnRhdGlvblwiKTtcblxuICBjb25zdCBtb250aHNHcmlkID0gbGlzdFRvR3JpZEh0bWwobW9udGhzLCAzKTtcbiAgY29uc3QgdGFibGVCb2R5ID0gY3JlYXRlVGFibGVCb2R5KG1vbnRoc0dyaWQpO1xuICB0YWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGVCb2R5KTtcbiAgbW9udGhzSHRtbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGFibGUpO1xuXG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gY2FsZW5kYXJFbC5jbG9uZU5vZGUoKTtcbiAgbmV3Q2FsZW5kYXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1vbnRoc0h0bWwpO1xuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGEgbW9udGguXCI7XG5cbiAgcmV0dXJuIG5ld0NhbGVuZGFyO1xufTtcblxuLyoqXG4gKiBTZWxlY3QgYSBtb250aCBpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IG1vbnRoRWwgQW4gbW9udGggZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBzZWxlY3RNb250aCA9IChtb250aEVsKSA9PiB7XG4gIGlmIChtb250aEVsLmRpc2FibGVkKSByZXR1cm47XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KG1vbnRoRWwpO1xuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBzZWxlY3RlZE1vbnRoKTtcbiAgZGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgY29uc3QgbmV3Q2FsZW5kYXIgPSByZW5kZXJDYWxlbmRhcihjYWxlbmRhckVsLCBkYXRlKTtcbiAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIC0gTW9udGggU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLyoqXG4gKiBEaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4gaW4gdGhlIGRhdGUgcGlja2VyLlxuICpcbiAqIEBwYXJhbSB7SFRNTEJ1dHRvbkVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSB5ZWFyVG9EaXNwbGF5IHllYXIgdG8gZGlzcGxheSBpbiB5ZWFyIHNlbGVjdGlvblxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBhIHJlZmVyZW5jZSB0byB0aGUgbmV3IGNhbGVuZGFyIGVsZW1lbnRcbiAqL1xuY29uc3QgZGlzcGxheVllYXJTZWxlY3Rpb24gPSAoZWwsIHllYXJUb0Rpc3BsYXkpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBzdGF0dXNFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KGVsKTtcblxuICBjb25zdCBzZWxlY3RlZFllYXIgPSBjYWxlbmRhckRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgZm9jdXNlZFllYXIgPSB5ZWFyVG9EaXNwbGF5ID09IG51bGwgPyBzZWxlY3RlZFllYXIgOiB5ZWFyVG9EaXNwbGF5O1xuXG4gIGxldCB5ZWFyVG9DaHVuayA9IGZvY3VzZWRZZWFyO1xuICB5ZWFyVG9DaHVuayAtPSB5ZWFyVG9DaHVuayAlIFlFQVJfQ0hVTks7XG4gIHllYXJUb0NodW5rID0gTWF0aC5tYXgoMCwgeWVhclRvQ2h1bmspO1xuXG4gIGNvbnN0IHByZXZZZWFyQ2h1bmtEaXNhYmxlZCA9IGlzRGF0ZXNZZWFyT3V0c2lkZU1pbk9yTWF4KFxuICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFyVG9DaHVuayAtIDEpLFxuICAgIG1pbkRhdGUsXG4gICAgbWF4RGF0ZSxcbiAgKTtcblxuICBjb25zdCBuZXh0WWVhckNodW5rRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgeWVhclRvQ2h1bmsgKyBZRUFSX0NIVU5LKSxcbiAgICBtaW5EYXRlLFxuICAgIG1heERhdGUsXG4gICk7XG5cbiAgY29uc3QgeWVhcnMgPSBbXTtcbiAgbGV0IHllYXJJbmRleCA9IHllYXJUb0NodW5rO1xuICB3aGlsZSAoeWVhcnMubGVuZ3RoIDwgWUVBUl9DSFVOSykge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBpc0RhdGVzWWVhck91dHNpZGVNaW5Pck1heChcbiAgICAgIHNldFllYXIoY2FsZW5kYXJEYXRlLCB5ZWFySW5kZXgpLFxuICAgICAgbWluRGF0ZSxcbiAgICAgIG1heERhdGUsXG4gICAgKTtcblxuICAgIGxldCB0YWJpbmRleCA9IFwiLTFcIjtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbQ0FMRU5EQVJfWUVBUl9DTEFTU107XG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IHllYXJJbmRleCA9PT0gc2VsZWN0ZWRZZWFyO1xuXG4gICAgaWYgKHllYXJJbmRleCA9PT0gZm9jdXNlZFllYXIpIHtcbiAgICAgIHRhYmluZGV4ID0gXCIwXCI7XG4gICAgICBjbGFzc2VzLnB1c2goQ0FMRU5EQVJfWUVBUl9GT0NVU0VEX0NMQVNTKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKENBTEVOREFSX1lFQVJfU0VMRUNURURfQ0xBU1MpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIHRhYmluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIiwgeWVhckluZGV4KTtcbiAgICBidG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBpc1NlbGVjdGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICAgIGlmIChpc0Rpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBidG4udGV4dENvbnRlbnQgPSB5ZWFySW5kZXg7XG5cbiAgICB5ZWFycy5wdXNoKGJ0bik7XG4gICAgeWVhckluZGV4ICs9IDE7XG4gIH1cblxuICBjb25zdCBuZXdDYWxlbmRhciA9IGNhbGVuZGFyRWwuY2xvbmVOb2RlKCk7XG5cbiAgLy8gY3JlYXRlIHRoZSB5ZWFycyBjYWxlbmRhciB3cmFwcGVyXG4gIGNvbnN0IHllYXJzQ2FsZW5kYXJXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgeWVhcnNDYWxlbmRhcldyYXBwZXIuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcbiAgeWVhcnNDYWxlbmRhcldyYXBwZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfWUVBUl9QSUNLRVJfQ0xBU1MpO1xuXG4gIC8vIGNyZWF0ZSB0YWJsZSBwYXJlbnRcbiAgY29uc3QgeWVhcnNUYWJsZVBhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgeWVhcnNUYWJsZVBhcmVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBDQUxFTkRBUl9UQUJMRV9DTEFTUyk7XG5cbiAgLy8gY3JlYXRlIHRhYmxlIGJvZHkgYW5kIHRhYmxlIHJvd1xuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIik7XG4gIGNvbnN0IHllYXJzSFRNTFRhYmxlQm9keVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcblxuICAvLyBjcmVhdGUgcHJldmlvdXMgYnV0dG9uXG4gIGNvbnN0IHByZXZpb3VzWWVhcnNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBwcmV2aW91c1llYXJzQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfUFJFVklPVVNfWUVBUl9DSFVOS19DTEFTUyk7XG4gIHByZXZpb3VzWWVhcnNCdG4uc2V0QXR0cmlidXRlKFxuICAgIFwiYXJpYS1sYWJlbFwiLFxuICAgIGBOYXZpZ2F0ZSBiYWNrICR7WUVBUl9DSFVOS30geWVhcnNgLFxuICApO1xuICBpZiAocHJldlllYXJDaHVua0Rpc2FibGVkID09PSB0cnVlKSB7XG4gICAgcHJldmlvdXNZZWFyc0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cbiAgcHJldmlvdXNZZWFyc0J0bi5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAmbmJzcGA7XG5cbiAgLy8gY3JlYXRlIG5leHQgYnV0dG9uXG4gIGNvbnN0IG5leHRZZWFyc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG5leHRZZWFyc0J0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICBuZXh0WWVhcnNCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgQ0FMRU5EQVJfTkVYVF9ZRUFSX0NIVU5LX0NMQVNTKTtcbiAgbmV4dFllYXJzQnRuLnNldEF0dHJpYnV0ZShcbiAgICBcImFyaWEtbGFiZWxcIixcbiAgICBgTmF2aWdhdGUgZm9yd2FyZCAke1lFQVJfQ0hVTkt9IHllYXJzYCxcbiAgKTtcbiAgaWYgKG5leHRZZWFyQ2h1bmtEaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgIG5leHRZZWFyc0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH1cbiAgbmV4dFllYXJzQnRuLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCZuYnNwYDtcblxuICAvLyBjcmVhdGUgdGhlIGFjdHVhbCB5ZWFycyB0YWJsZVxuICBjb25zdCB5ZWFyc1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB5ZWFyc1RhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIENBTEVOREFSX1RBQkxFX0NMQVNTKTtcbiAgeWVhcnNUYWJsZS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwicHJlc2VudGF0aW9uXCIpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgY29uc3QgeWVhcnNHcmlkID0gbGlzdFRvR3JpZEh0bWwoeWVhcnMsIDMpO1xuICBjb25zdCB5ZWFyc1RhYmxlQm9keSA9IGNyZWF0ZVRhYmxlQm9keSh5ZWFyc0dyaWQpO1xuXG4gIC8vIGFwcGVuZCB0aGUgZ3JpZCB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgeWVhcnNUYWJsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZUJvZHkpO1xuXG4gIC8vIGNyZWF0ZSB0aGUgcHJldiBidXR0b24gdGQgYW5kIGFwcGVuZCB0aGUgcHJldiBidXR0b25cbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgXCJiZWZvcmVlbmRcIixcbiAgICBwcmV2aW91c1llYXJzQnRuLFxuICApO1xuXG4gIC8vIGNyZWF0ZSB0aGUgeWVhcnMgdGQgYW5kIGFwcGVuZCB0aGUgeWVhcnMgY2hpbGQgdGFibGVcbiAgY29uc3QgeWVhcnNIVE1MVGFibGVCb2R5WWVhcnNEZXRhaWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsLnNldEF0dHJpYnV0ZShcImNvbHNwYW5cIiwgXCIzXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlZZWFyc0RldGFpbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZSk7XG5cbiAgLy8gY3JlYXRlIHRoZSBuZXh0IGJ1dHRvbiB0ZCBhbmQgYXBwZW5kIHRoZSBuZXh0IGJ1dHRvblxuICBjb25zdCB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlEZXRhaWxOZXh0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBuZXh0WWVhcnNCdG4pO1xuXG4gIC8vIGFwcGVuZCB0aGUgdGhyZWUgdGQgdG8gdGhlIHllYXJzIGNoaWxkIHRhYmxlIHJvd1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsUHJldixcbiAgKTtcbiAgeWVhcnNIVE1MVGFibGVCb2R5Um93Lmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICBcImJlZm9yZWVuZFwiLFxuICAgIHllYXJzSFRNTFRhYmxlQm9keVllYXJzRGV0YWlsLFxuICApO1xuICB5ZWFyc0hUTUxUYWJsZUJvZHlSb3cuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgeWVhcnNIVE1MVGFibGVCb2R5RGV0YWlsTmV4dCxcbiAgKTtcblxuICAvLyBhcHBlbmQgdGhlIHRhYmxlIHJvdyB0byB0aGUgeWVhcnMgY2hpbGQgdGFibGUgYm9keVxuICB5ZWFyc0hUTUxUYWJsZUJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHllYXJzSFRNTFRhYmxlQm9keVJvdyk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyB0YWJsZSBib2R5IHRvIHRoZSB5ZWFycyBwYXJlbnQgdGFibGVcbiAgeWVhcnNUYWJsZVBhcmVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNIVE1MVGFibGVCb2R5KTtcblxuICAvLyBhcHBlbmQgdGhlIHBhcmVudCB0YWJsZSB0byB0aGUgY2FsZW5kYXIgd3JhcHBlclxuICB5ZWFyc0NhbGVuZGFyV3JhcHBlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgeWVhcnNUYWJsZVBhcmVudCk7XG5cbiAgLy8gYXBwZW5kIHRoZSB5ZWFycyBjYWxlbmRlciB0byB0aGUgbmV3IGNhbGVuZGFyXG4gIG5ld0NhbGVuZGFyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB5ZWFyc0NhbGVuZGFyV3JhcHBlcik7XG5cbiAgLy8gcmVwbGFjZSBjYWxlbmRhclxuICBjYWxlbmRhckVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NhbGVuZGFyLCBjYWxlbmRhckVsKTtcblxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFNob3dpbmcgeWVhcnMgJHt5ZWFyVG9DaHVua30gdG8gJHtcbiAgICB5ZWFyVG9DaHVuayArIFlFQVJfQ0hVTksgLSAxXG4gIH0uIFNlbGVjdCBhIHllYXIuYDtcblxuICByZXR1cm4gbmV3Q2FsZW5kYXI7XG59O1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgYnkgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHllYXJFbCA9IGNhbGVuZGFyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwudGV4dENvbnRlbnQsIDEwKTtcblxuICBsZXQgYWRqdXN0ZWRZZWFyID0gc2VsZWN0ZWRZZWFyIC0gWUVBUl9DSFVOSztcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgY2FsZW5kYXJFbCxcbiAgICBjYXBwZWREYXRlLmdldEZ1bGxZZWFyKCksXG4gICk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LKTtcbiAgaWYgKG5leHRUb0ZvY3VzLmRpc2FibGVkKSB7XG4gICAgbmV4dFRvRm9jdXMgPSBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfUElDS0VSKTtcbiAgfVxuICBuZXh0VG9Gb2N1cy5mb2N1cygpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIGJ5IHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtIVE1MQnV0dG9uRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudFxuICovXG5jb25zdCBkaXNwbGF5TmV4dFllYXJDaHVuayA9IChlbCkgPT4ge1xuICBpZiAoZWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gIGNvbnN0IHllYXJFbCA9IGNhbGVuZGFyRWwucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ZRUFSX0ZPQ1VTRUQpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwudGV4dENvbnRlbnQsIDEwKTtcblxuICBsZXQgYWRqdXN0ZWRZZWFyID0gc2VsZWN0ZWRZZWFyICsgWUVBUl9DSFVOSztcbiAgYWRqdXN0ZWRZZWFyID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWRZZWFyKTtcblxuICBjb25zdCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIGFkanVzdGVkWWVhcik7XG4gIGNvbnN0IGNhcHBlZERhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24oXG4gICAgY2FsZW5kYXJFbCxcbiAgICBjYXBwZWREYXRlLmdldEZ1bGxZZWFyKCksXG4gICk7XG5cbiAgbGV0IG5leHRUb0ZvY3VzID0gbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTkspO1xuICBpZiAobmV4dFRvRm9jdXMuZGlzYWJsZWQpIHtcbiAgICBuZXh0VG9Gb2N1cyA9IG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfWUVBUl9QSUNLRVIpO1xuICB9XG4gIG5leHRUb0ZvY3VzLmZvY3VzKCk7XG59O1xuXG4vKipcbiAqIFNlbGVjdCBhIHllYXIgaW4gdGhlIGRhdGUgcGlja2VyIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCdXR0b25FbGVtZW50fSB5ZWFyRWwgQSB5ZWFyIGVsZW1lbnQgd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2VsZWN0WWVhciA9ICh5ZWFyRWwpID0+IHtcbiAgaWYgKHllYXJFbC5kaXNhYmxlZCkgcmV0dXJuO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIGNhbGVuZGFyRGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSB9ID1cbiAgICBnZXREYXRlUGlja2VyQ29udGV4dCh5ZWFyRWwpO1xuICBjb25zdCBzZWxlY3RlZFllYXIgPSBwYXJzZUludCh5ZWFyRWwuaW5uZXJIVE1MLCAxMCk7XG4gIGxldCBkYXRlID0gc2V0WWVhcihjYWxlbmRhckRhdGUsIHNlbGVjdGVkWWVhcik7XG4gIGRhdGUgPSBrZWVwRGF0ZUJldHdlZW5NaW5BbmRNYXgoZGF0ZSwgbWluRGF0ZSwgbWF4RGF0ZSk7XG4gIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgZGF0ZSk7XG4gIG5ld0NhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoQ0FMRU5EQVJfREFURV9GT0NVU0VEKS5mb2N1cygpO1xufTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciAtIFllYXIgU2VsZWN0aW9uIFZpZXdcblxuLy8gI3JlZ2lvbiBDYWxlbmRhciBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEhpZGUgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlRXNjYXBlRnJvbUNhbGVuZGFyID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgZGF0ZVBpY2tlckVsLCBleHRlcm5hbElucHV0RWwgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KGV2ZW50LnRhcmdldCk7XG5cbiAgaGlkZUNhbGVuZGFyKGRhdGVQaWNrZXJFbCk7XG4gIGV4dGVybmFsSW5wdXRFbC5mb2N1cygpO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIEV2ZW50IEhhbmRsaW5nXG5cbi8vICNyZWdpb24gQ2FsZW5kYXIgRGF0ZSBFdmVudCBIYW5kbGluZ1xuXG4vKipcbiAqIEFkanVzdCB0aGUgZGF0ZSBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIgaWYgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFkanVzdERhdGVGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIGRhdGVcbiAqL1xuY29uc3QgYWRqdXN0Q2FsZW5kYXIgPSAoYWRqdXN0RGF0ZUZuKSA9PiAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9IGdldERhdGVQaWNrZXJDb250ZXh0KFxuICAgIGV2ZW50LnRhcmdldCxcbiAgKTtcblxuICBjb25zdCBkYXRlID0gYWRqdXN0RGF0ZUZuKGNhbGVuZGFyRGF0ZSk7XG5cbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVEYXkoY2FsZW5kYXJEYXRlLCBjYXBwZWREYXRlKSkge1xuICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gcmVuZGVyQ2FsZW5kYXIoY2FsZW5kYXJFbCwgY2FwcGVkRGF0ZSk7XG4gICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9EQVRFX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgd2VlayBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1YldlZWtzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRXZWVrcyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgZGF5IGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUxlZnRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJEYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIG9uZSBkYXkgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGREYXlzKGRhdGUsIDEpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN0YXJ0T2ZXZWVrKGRhdGUpKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSB3ZWVrIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IGVuZE9mV2VlayhkYXRlKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBhZGRNb250aHMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBjYWxlbmRhci5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VVcEZyb21EYXRlID0gYWRqdXN0Q2FsZW5kYXIoKGRhdGUpID0+IHN1Yk1vbnRocyhkYXRlLCAxKSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgY2FsZW5kYXIuXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVTaGlmdFBhZ2VEb3duRnJvbURhdGUgPSBhZGp1c3RDYWxlbmRhcigoZGF0ZSkgPT4gYWRkWWVhcnMoZGF0ZSwgMSkpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGJhY2sgb25lIHllYXIgYW5kIGRpc3BsYXkgdGhlIGNhbGVuZGFyLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU2hpZnRQYWdlVXBGcm9tRGF0ZSA9IGFkanVzdENhbGVuZGFyKChkYXRlKSA9PiBzdWJZZWFycyhkYXRlLCAxKSk7XG5cbi8qKlxuICogU2V0IHJhbmdlIGRhdGUgY2xhc3NlcyB3aXRob3V0IHJlLXJlbmRlcmluZyB0aGUgY2FsZW5kYXIuIENhbGxlZCB3aGVuIGRhdGUgYnV0dG9uIGlzIGhvdmVyZWQuXG4gKiBSZXR1cm5zIGVhcmx5IGlmIHRoZSBkYXRlIGhvdmVyZWQgaXMgZGlzYWJsZWQgb3IgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIHNlbGVjdGVkIGRhdGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZGF0ZUVsIC0gQ2FsZW5kYXIgZGF0ZSBidXR0b24gd2l0aGluIHRoZSBkYXRlIHBpY2tlciBjb21wb25lbnQuXG4gKi9cblxuY29uc3QgaGFuZGxlTW91c2VvdmVyRnJvbURhdGUgPSAoZGF0ZUVsKSA9PiB7XG4gIGlmIChkYXRlRWwuZGlzYWJsZWQpIHJldHVybjtcblxuICBjb25zdCBob3ZlckRhdGUgPSBwYXJzZURhdGVTdHJpbmcoZGF0ZUVsLmRhdGFzZXQudmFsdWUpO1xuICBjb25zdCB7IGNhbGVuZGFyRWwsIHNlbGVjdGVkRGF0ZSwgcmFuZ2VEYXRlIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChkYXRlRWwpO1xuXG4gIGlmIChzZWxlY3RlZERhdGUpIHJldHVybjtcblxuICBjb25zdCB7IHdpdGhpblJhbmdlU3RhcnREYXRlLCB3aXRoaW5SYW5nZUVuZERhdGUgfSA9IHNldFJhbmdlRGF0ZXMoXG4gICAgaG92ZXJEYXRlLFxuICAgIHJhbmdlRGF0ZSxcbiAgKTtcblxuICBjb25zdCBkYXRlQnV0dG9ucyA9IGNhbGVuZGFyRWwucXVlcnlTZWxlY3RvckFsbChcbiAgICBgLiR7Q0FMRU5EQVJfREFURV9DVVJSRU5UX01PTlRIX0NMQVNTfWAsXG4gICk7XG5cbiAgZGF0ZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uRGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhidXR0b24uZGF0YXNldC52YWx1ZSk7XG4gICAgaWYgKFxuICAgICAgaXNEYXRlV2l0aGluTWluQW5kTWF4KFxuICAgICAgICBidXR0b25EYXRlLFxuICAgICAgICB3aXRoaW5SYW5nZVN0YXJ0RGF0ZSxcbiAgICAgICAgd2l0aGluUmFuZ2VFbmREYXRlLFxuICAgICAgKVxuICAgICkge1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoQ0FMRU5EQVJfREFURV9XSVRISU5fUkFOR0VfQ0xBU1MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZShDQUxFTkRBUl9EQVRFX1dJVEhJTl9SQU5HRV9DTEFTUyk7XG4gICAgfVxuICB9KTtcbn07XG5cbi8vICNlbmRyZWdpb24gQ2FsZW5kYXIgRGF0ZSBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIE1vbnRoIEV2ZW50IEhhbmRsaW5nXG5cbi8qKlxuICogQWRqdXN0IHRoZSBtb250aCBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbiBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWRqdXN0TW9udGhGbiBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGFkanVzdGVkIG1vbnRoXG4gKi9cbmNvbnN0IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuID0gKGFkanVzdE1vbnRoRm4pID0+IChldmVudCkgPT4ge1xuICBjb25zdCBtb250aEVsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQobW9udGhFbC5kYXRhc2V0LnZhbHVlLCAxMCk7XG4gIGNvbnN0IHsgY2FsZW5kYXJFbCwgY2FsZW5kYXJEYXRlLCBtaW5EYXRlLCBtYXhEYXRlIH0gPVxuICAgIGdldERhdGVQaWNrZXJDb250ZXh0KG1vbnRoRWwpO1xuICBjb25zdCBjdXJyZW50RGF0ZSA9IHNldE1vbnRoKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRNb250aCk7XG5cbiAgbGV0IGFkanVzdGVkTW9udGggPSBhZGp1c3RNb250aEZuKHNlbGVjdGVkTW9udGgpO1xuICBhZGp1c3RlZE1vbnRoID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTEsIGFkanVzdGVkTW9udGgpKTtcblxuICBjb25zdCBkYXRlID0gc2V0TW9udGgoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZE1vbnRoKTtcbiAgY29uc3QgY2FwcGVkRGF0ZSA9IGtlZXBEYXRlQmV0d2Vlbk1pbkFuZE1heChkYXRlLCBtaW5EYXRlLCBtYXhEYXRlKTtcbiAgaWYgKCFpc1NhbWVNb250aChjdXJyZW50RGF0ZSwgY2FwcGVkRGF0ZSkpIHtcbiAgICBjb25zdCBuZXdDYWxlbmRhciA9IGRpc3BsYXlNb250aFNlbGVjdGlvbihcbiAgICAgIGNhbGVuZGFyRWwsXG4gICAgICBjYXBwZWREYXRlLmdldE1vbnRoKCksXG4gICAgKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX01PTlRIX0ZPQ1VTRUQpLmZvY3VzKCk7XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayB0aHJlZSBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKChtb250aCkgPT4gbW9udGggLSAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBmb3J3YXJkIHRocmVlIG1vbnRocyBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMyk7XG5cbi8qKlxuICogTmF2aWdhdGUgYmFjayBvbmUgbW9udGggYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKG1vbnRoKSA9PiBtb250aCAtIDEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgb25lIG1vbnRoIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigobW9udGgpID0+IG1vbnRoICsgMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIHN0YXJ0IG9mIHRoZSByb3cgb2YgbW9udGhzIGFuZCBkaXNwbGF5IHRoZSBtb250aCBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21Nb250aCA9IGFkanVzdE1vbnRoU2VsZWN0aW9uU2NyZWVuKFxuICAobW9udGgpID0+IG1vbnRoIC0gKG1vbnRoICUgMyksXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBlbmQgb2YgdGhlIHJvdyBvZiBtb250aHMgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVFbmRGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbihcbiAgKG1vbnRoKSA9PiBtb250aCArIDIgLSAobW9udGggJSAzKSxcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gdGhlIGxhc3QgbW9udGggKERlY2VtYmVyKSBhbmQgZGlzcGxheSB0aGUgbW9udGggc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbU1vbnRoID0gYWRqdXN0TW9udGhTZWxlY3Rpb25TY3JlZW4oKCkgPT4gMTEpO1xuXG4vKipcbiAqIE5hdmlnYXRlIHRvIHRoZSBmaXJzdCBtb250aCAoSmFudWFyeSkgYW5kIGRpc3BsYXkgdGhlIG1vbnRoIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVQYWdlVXBGcm9tTW9udGggPSBhZGp1c3RNb250aFNlbGVjdGlvblNjcmVlbigoKSA9PiAwKTtcblxuLy8gI2VuZHJlZ2lvbiBDYWxlbmRhciBNb250aCBFdmVudCBIYW5kbGluZ1xuXG4vLyAjcmVnaW9uIENhbGVuZGFyIFllYXIgRXZlbnQgSGFuZGxpbmdcblxuLyoqXG4gKiBBZGp1c3QgdGhlIHllYXIgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbiBpZiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWRqdXN0WWVhckZuIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgYWRqdXN0ZWQgeWVhclxuICovXG5jb25zdCBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuID0gKGFkanVzdFllYXJGbikgPT4gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHllYXJFbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3Qgc2VsZWN0ZWRZZWFyID0gcGFyc2VJbnQoeWVhckVsLmRhdGFzZXQudmFsdWUsIDEwKTtcbiAgY29uc3QgeyBjYWxlbmRhckVsLCBjYWxlbmRhckRhdGUsIG1pbkRhdGUsIG1heERhdGUgfSA9XG4gICAgZ2V0RGF0ZVBpY2tlckNvbnRleHQoeWVhckVsKTtcbiAgY29uc3QgY3VycmVudERhdGUgPSBzZXRZZWFyKGNhbGVuZGFyRGF0ZSwgc2VsZWN0ZWRZZWFyKTtcblxuICBsZXQgYWRqdXN0ZWRZZWFyID0gYWRqdXN0WWVhckZuKHNlbGVjdGVkWWVhcik7XG4gIGFkanVzdGVkWWVhciA9IE1hdGgubWF4KDAsIGFkanVzdGVkWWVhcik7XG5cbiAgY29uc3QgZGF0ZSA9IHNldFllYXIoY2FsZW5kYXJEYXRlLCBhZGp1c3RlZFllYXIpO1xuICBjb25zdCBjYXBwZWREYXRlID0ga2VlcERhdGVCZXR3ZWVuTWluQW5kTWF4KGRhdGUsIG1pbkRhdGUsIG1heERhdGUpO1xuICBpZiAoIWlzU2FtZVllYXIoY3VycmVudERhdGUsIGNhcHBlZERhdGUpKSB7XG4gICAgY29uc3QgbmV3Q2FsZW5kYXIgPSBkaXNwbGF5WWVhclNlbGVjdGlvbihcbiAgICAgIGNhbGVuZGFyRWwsXG4gICAgICBjYXBwZWREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgKTtcbiAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIHRocmVlIHllYXJzIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVVcEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbigoeWVhcikgPT4geWVhciAtIDMpO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgdGhyZWUgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZURvd25Gcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAzKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSBiYWNrIG9uZSB5ZWFyIGFuZCBkaXNwbGF5IHRoZSB5ZWFyIHNlbGVjdGlvbiBzY3JlZW4uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCB0aGUga2V5ZG93biBldmVudFxuICovXG5jb25zdCBoYW5kbGVMZWZ0RnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG5cbi8qKlxuICogTmF2aWdhdGUgZm9yd2FyZCBvbmUgeWVhciBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUmlnaHRGcm9tWWVhciA9IGFkanVzdFllYXJTZWxlY3Rpb25TY3JlZW4oKHllYXIpID0+IHllYXIgKyAxKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgc3RhcnQgb2YgdGhlIHJvdyBvZiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlSG9tZUZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgLSAoeWVhciAlIDMpLFxuKTtcblxuLyoqXG4gKiBOYXZpZ2F0ZSB0byB0aGUgZW5kIG9mIHRoZSByb3cgb2YgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZUVuZEZyb21ZZWFyID0gYWRqdXN0WWVhclNlbGVjdGlvblNjcmVlbihcbiAgKHllYXIpID0+IHllYXIgKyAyIC0gKHllYXIgJSAzKSxcbik7XG5cbi8qKlxuICogTmF2aWdhdGUgdG8gYmFjayAxMiB5ZWFycyBhbmQgZGlzcGxheSB0aGUgeWVhciBzZWxlY3Rpb24gc2NyZWVuLlxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgdGhlIGtleWRvd24gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlUGFnZVVwRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciAtIFlFQVJfQ0hVTkssXG4pO1xuXG4vKipcbiAqIE5hdmlnYXRlIGZvcndhcmQgMTIgeWVhcnMgYW5kIGRpc3BsYXkgdGhlIHllYXIgc2VsZWN0aW9uIHNjcmVlbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50XG4gKi9cbmNvbnN0IGhhbmRsZVBhZ2VEb3duRnJvbVllYXIgPSBhZGp1c3RZZWFyU2VsZWN0aW9uU2NyZWVuKFxuICAoeWVhcikgPT4geWVhciArIFlFQVJfQ0hVTkssXG4pO1xuXG4vLyAjZW5kcmVnaW9uIENhbGVuZGFyIFllYXIgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBGb2N1cyBIYW5kbGluZyBFdmVudCBIYW5kbGluZ1xuXG5jb25zdCB0YWJIYW5kbGVyID0gKGZvY3VzYWJsZSkgPT4ge1xuICBjb25zdCBnZXRGb2N1c2FibGVDb250ZXh0ID0gKGVsKSA9PiB7XG4gICAgY29uc3QgeyBjYWxlbmRhckVsIH0gPSBnZXREYXRlUGlja2VyQ29udGV4dChlbCk7XG4gICAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBzZWxlY3QoZm9jdXNhYmxlLCBjYWxlbmRhckVsKTtcblxuICAgIGNvbnN0IGZpcnN0VGFiSW5kZXggPSAwO1xuICAgIGNvbnN0IGxhc3RUYWJJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZmlyc3RUYWJJbmRleF07XG4gICAgY29uc3QgbGFzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1tsYXN0VGFiSW5kZXhdO1xuICAgIGNvbnN0IGZvY3VzSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5pbmRleE9mKGFjdGl2ZUVsZW1lbnQoKSk7XG5cbiAgICBjb25zdCBpc0xhc3RUYWIgPSBmb2N1c0luZGV4ID09PSBsYXN0VGFiSW5kZXg7XG4gICAgY29uc3QgaXNGaXJzdFRhYiA9IGZvY3VzSW5kZXggPT09IGZpcnN0VGFiSW5kZXg7XG4gICAgY29uc3QgaXNOb3RGb3VuZCA9IGZvY3VzSW5kZXggPT09IC0xO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgaXNOb3RGb3VuZCxcbiAgICAgIGZpcnN0VGFiU3RvcCxcbiAgICAgIGlzRmlyc3RUYWIsXG4gICAgICBsYXN0VGFiU3RvcCxcbiAgICAgIGlzTGFzdFRhYixcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgdGFiQWhlYWQoZXZlbnQpIHtcbiAgICAgIGNvbnN0IHsgZmlyc3RUYWJTdG9wLCBpc0xhc3RUYWIsIGlzTm90Rm91bmQgfSA9IGdldEZvY3VzYWJsZUNvbnRleHQoXG4gICAgICAgIGV2ZW50LnRhcmdldCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0xhc3RUYWIgfHwgaXNOb3RGb3VuZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRhYkJhY2soZXZlbnQpIHtcbiAgICAgIGNvbnN0IHsgbGFzdFRhYlN0b3AsIGlzRmlyc3RUYWIsIGlzTm90Rm91bmQgfSA9IGdldEZvY3VzYWJsZUNvbnRleHQoXG4gICAgICAgIGV2ZW50LnRhcmdldCxcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0ZpcnN0VGFiIHx8IGlzTm90Rm91bmQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoREFURV9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyID0gdGFiSGFuZGxlcihNT05USF9QSUNLRVJfRk9DVVNBQkxFKTtcbmNvbnN0IHllYXJQaWNrZXJUYWJFdmVudEhhbmRsZXIgPSB0YWJIYW5kbGVyKFlFQVJfUElDS0VSX0ZPQ1VTQUJMRSk7XG5cbi8vICNlbmRyZWdpb24gRm9jdXMgSGFuZGxpbmcgRXZlbnQgSGFuZGxpbmdcblxuLy8gI3JlZ2lvbiBEYXRlIFBpY2tlciBFdmVudCBEZWxlZ2F0aW9uIFJlZ2lzdHJhdGlvbiAvIENvbXBvbmVudFxuXG5jb25zdCBkYXRlUGlja2VyRXZlbnRzID0ge1xuICBbQ0xJQ0tdOiB7XG4gICAgW0RBVEVfUElDS0VSX0JVVFRPTl0oKSB7XG4gICAgICB0b2dnbGVDYWxlbmRhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9EQVRFXSgpIHtcbiAgICAgIHNlbGVjdERhdGUodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdKCkge1xuICAgICAgc2VsZWN0TW9udGgodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfWUVBUl0oKSB7XG4gICAgICBzZWxlY3RZZWFyKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1BSRVZJT1VTX01PTlRIXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c01vbnRoKHRoaXMpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX05FWFRfTU9OVEhdKCkge1xuICAgICAgZGlzcGxheU5leHRNb250aCh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXIodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTkVYVF9ZRUFSXSgpIHtcbiAgICAgIGRpc3BsYXlOZXh0WWVhcih0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9QUkVWSU9VU19ZRUFSX0NIVU5LXSgpIHtcbiAgICAgIGRpc3BsYXlQcmV2aW91c1llYXJDaHVuayh0aGlzKTtcbiAgICB9LFxuICAgIFtDQUxFTkRBUl9ORVhUX1lFQVJfQ0hVTktdKCkge1xuICAgICAgZGlzcGxheU5leHRZZWFyQ2h1bmsodGhpcyk7XG4gICAgfSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheU1vbnRoU2VsZWN0aW9uKHRoaXMpO1xuICAgICAgbmV3Q2FsZW5kYXIucXVlcnlTZWxlY3RvcihDQUxFTkRBUl9NT05USF9GT0NVU0VEKS5mb2N1cygpO1xuICAgIH0sXG4gICAgW0NBTEVOREFSX1lFQVJfU0VMRUNUSU9OXSgpIHtcbiAgICAgIGNvbnN0IG5ld0NhbGVuZGFyID0gZGlzcGxheVllYXJTZWxlY3Rpb24odGhpcyk7XG4gICAgICBuZXdDYWxlbmRhci5xdWVyeVNlbGVjdG9yKENBTEVOREFSX1lFQVJfRk9DVVNFRCkuZm9jdXMoKTtcbiAgICB9LFxuICB9LFxuICBrZXl1cDoge1xuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIGNvbnN0IGtleWRvd24gPSB0aGlzLmRhdGFzZXQua2V5ZG93bktleUNvZGU7XG4gICAgICBpZiAoYCR7ZXZlbnQua2V5Q29kZX1gICE9PSBrZXlkb3duKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAga2V5ZG93bjoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFTlRFUl9LRVlDT0RFKSB7XG4gICAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW0NBTEVOREFSX0RBVEVdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbURhdGUsXG4gICAgICBBcnJvd1VwOiBoYW5kbGVVcEZyb21EYXRlLFxuICAgICAgRG93bjogaGFuZGxlRG93bkZyb21EYXRlLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbURhdGUsXG4gICAgICBMZWZ0OiBoYW5kbGVMZWZ0RnJvbURhdGUsXG4gICAgICBBcnJvd0xlZnQ6IGhhbmRsZUxlZnRGcm9tRGF0ZSxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21EYXRlLFxuICAgICAgQXJyb3dSaWdodDogaGFuZGxlUmlnaHRGcm9tRGF0ZSxcbiAgICAgIEhvbWU6IGhhbmRsZUhvbWVGcm9tRGF0ZSxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbURhdGUsXG4gICAgICBQYWdlRG93bjogaGFuZGxlUGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFBhZ2VVcDogaGFuZGxlUGFnZVVwRnJvbURhdGUsXG4gICAgICBcIlNoaWZ0K1BhZ2VEb3duXCI6IGhhbmRsZVNoaWZ0UGFnZURvd25Gcm9tRGF0ZSxcbiAgICAgIFwiU2hpZnQrUGFnZVVwXCI6IGhhbmRsZVNoaWZ0UGFnZVVwRnJvbURhdGUsXG4gICAgICBUYWI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQWhlYWQsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX0RBVEVfUElDS0VSXToga2V5bWFwKHtcbiAgICAgIFRhYjogZGF0ZVBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICAgIFwiU2hpZnQrVGFiXCI6IGRhdGVQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfTU9OVEhdOiBrZXltYXAoe1xuICAgICAgVXA6IGhhbmRsZVVwRnJvbU1vbnRoLFxuICAgICAgQXJyb3dVcDogaGFuZGxlVXBGcm9tTW9udGgsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgQXJyb3dEb3duOiBoYW5kbGVEb3duRnJvbU1vbnRoLFxuICAgICAgTGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21Nb250aCxcbiAgICAgIFJpZ2h0OiBoYW5kbGVSaWdodEZyb21Nb250aCxcbiAgICAgIEFycm93UmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbU1vbnRoLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21Nb250aCxcbiAgICAgIEVuZDogaGFuZGxlRW5kRnJvbU1vbnRoLFxuICAgICAgUGFnZURvd246IGhhbmRsZVBhZ2VEb3duRnJvbU1vbnRoLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tTW9udGgsXG4gICAgfSksXG4gICAgW0NBTEVOREFSX01PTlRIX1BJQ0tFUl06IGtleW1hcCh7XG4gICAgICBUYWI6IG1vbnRoUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogbW9udGhQaWNrZXJUYWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl06IGtleW1hcCh7XG4gICAgICBVcDogaGFuZGxlVXBGcm9tWWVhcixcbiAgICAgIEFycm93VXA6IGhhbmRsZVVwRnJvbVllYXIsXG4gICAgICBEb3duOiBoYW5kbGVEb3duRnJvbVllYXIsXG4gICAgICBBcnJvd0Rvd246IGhhbmRsZURvd25Gcm9tWWVhcixcbiAgICAgIExlZnQ6IGhhbmRsZUxlZnRGcm9tWWVhcixcbiAgICAgIEFycm93TGVmdDogaGFuZGxlTGVmdEZyb21ZZWFyLFxuICAgICAgUmlnaHQ6IGhhbmRsZVJpZ2h0RnJvbVllYXIsXG4gICAgICBBcnJvd1JpZ2h0OiBoYW5kbGVSaWdodEZyb21ZZWFyLFxuICAgICAgSG9tZTogaGFuZGxlSG9tZUZyb21ZZWFyLFxuICAgICAgRW5kOiBoYW5kbGVFbmRGcm9tWWVhcixcbiAgICAgIFBhZ2VEb3duOiBoYW5kbGVQYWdlRG93bkZyb21ZZWFyLFxuICAgICAgUGFnZVVwOiBoYW5kbGVQYWdlVXBGcm9tWWVhcixcbiAgICB9KSxcbiAgICBbQ0FMRU5EQVJfWUVBUl9QSUNLRVJdOiBrZXltYXAoe1xuICAgICAgVGFiOiB5ZWFyUGlja2VyVGFiRXZlbnRIYW5kbGVyLnRhYkFoZWFkLFxuICAgICAgXCJTaGlmdCtUYWJcIjogeWVhclBpY2tlclRhYkV2ZW50SGFuZGxlci50YWJCYWNrLFxuICAgIH0pLFxuICAgIFtEQVRFX1BJQ0tFUl9DQUxFTkRBUl0oZXZlbnQpIHtcbiAgICAgIHRoaXMuZGF0YXNldC5rZXlkb3duS2V5Q29kZSA9IGV2ZW50LmtleUNvZGU7XG4gICAgfSxcbiAgICBbREFURV9QSUNLRVJdKGV2ZW50KSB7XG4gICAgICBjb25zdCBrZXlNYXAgPSBrZXltYXAoe1xuICAgICAgICBFc2NhcGU6IGhhbmRsZUVzY2FwZUZyb21DYWxlbmRhcixcbiAgICAgIH0pO1xuXG4gICAgICBrZXlNYXAoZXZlbnQpO1xuICAgIH0sXG4gIH0sXG4gIGZvY3Vzb3V0OiB7XG4gICAgW0RBVEVfUElDS0VSX0VYVEVSTkFMX0lOUFVUXSgpIHtcbiAgICAgIHZhbGlkYXRlRGF0ZUlucHV0KHRoaXMpO1xuICAgIH0sXG4gICAgW0RBVEVfUElDS0VSXShldmVudCkge1xuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgIGhpZGVDYWxlbmRhcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBpbnB1dDoge1xuICAgIFtEQVRFX1BJQ0tFUl9FWFRFUk5BTF9JTlBVVF0oKSB7XG4gICAgICByZWNvbmNpbGVJbnB1dFZhbHVlcyh0aGlzKTtcbiAgICAgIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5pZiAoIWlzSW9zRGV2aWNlKCkpIHtcbiAgZGF0ZVBpY2tlckV2ZW50cy5tb3VzZW92ZXIgPSB7XG4gICAgW0NBTEVOREFSX0RBVEVfQ1VSUkVOVF9NT05USF0oKSB7XG4gICAgICBoYW5kbGVNb3VzZW92ZXJGcm9tRGF0ZSh0aGlzKTtcbiAgICB9LFxuICB9O1xufVxuXG5jb25zdCBkYXRlUGlja2VyID0gYmVoYXZpb3IoZGF0ZVBpY2tlckV2ZW50cywge1xuICBpbml0KHJvb3QpIHtcbiAgICBzZWxlY3RPck1hdGNoZXMoREFURV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKGRhdGVQaWNrZXJFbCkgPT4ge1xuICAgICAgZW5oYW5jZURhdGVQaWNrZXIoZGF0ZVBpY2tlckVsKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0RGF0ZVBpY2tlckNvbnRleHQsXG4gIGRpc2FibGUsXG4gIGFyaWFEaXNhYmxlLFxuICBlbmFibGUsXG4gIGlzRGF0ZUlucHV0SW52YWxpZCxcbiAgc2V0Q2FsZW5kYXJWYWx1ZSxcbiAgdmFsaWRhdGVEYXRlSW5wdXQsXG4gIHJlbmRlckNhbGVuZGFyLFxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZSxcbn0pO1xuXG4vLyAjZW5kcmVnaW9uIERhdGUgUGlja2VyIEV2ZW50IERlbGVnYXRpb24gUmVnaXN0cmF0aW9uIC8gQ29tcG9uZW50XG5cbm1vZHVsZS5leHBvcnRzID0gZGF0ZVBpY2tlcjtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCB7XG4gIGdldERhdGVQaWNrZXJDb250ZXh0LFxuICBpc0RhdGVJbnB1dEludmFsaWQsXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlLFxufSA9IHJlcXVpcmUoXCIuLi8uLi91c2EtZGF0ZS1waWNrZXIvc3JjL2luZGV4XCIpO1xuXG5jb25zdCBEQVRFX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tZGF0ZS1waWNrZXJgO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LWRhdGUtcmFuZ2UtcGlja2VyYDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJUX0NMQVNTID0gYCR7REFURV9SQU5HRV9QSUNLRVJfQ0xBU1N9X19yYW5nZS1zdGFydGA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRfQ0xBU1MgPSBgJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31fX3JhbmdlLWVuZGA7XG5cbmNvbnN0IERBVEVfUElDS0VSID0gYC4ke0RBVEVfUElDS0VSX0NMQVNTfWA7XG5jb25zdCBEQVRFX1JBTkdFX1BJQ0tFUiA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9DTEFTU31gO1xuY29uc3QgREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlQgPSBgLiR7REFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRfQ0xBU1N9YDtcbmNvbnN0IERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX0VORCA9IGAuJHtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRfQ0xBU1N9YDtcblxuY29uc3QgREVGQVVMVF9NSU5fREFURSA9IFwiMDAwMC0wMS0wMVwiO1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyLlxuICogQHR5cGVkZWYge09iamVjdH0gRGF0ZVJhbmdlUGlja2VyQ29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZGF0ZVJhbmdlUGlja2VyRWxcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IHJhbmdlU3RhcnRFbFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gcmFuZ2VFbmRFbFxuICovXG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCBvZiB0aGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgYmVsb25naW5nIGRpcmVjdGx5IHRvIHRoZSBnaXZlblxuICogZGF0ZSBwaWNrZXIgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIHRoZSBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSBwaWNrZXJcbiAqIEByZXR1cm5zIHtEYXRlUmFuZ2VQaWNrZXJDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXREYXRlUmFuZ2VQaWNrZXJDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRhdGVSYW5nZVBpY2tlckVsID0gZWwuY2xvc2VzdChEQVRFX1JBTkdFX1BJQ0tFUik7XG5cbiAgaWYgKCFkYXRlUmFuZ2VQaWNrZXJFbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRWxlbWVudCBpcyBtaXNzaW5nIG91dGVyICR7REFURV9SQU5HRV9QSUNLRVJ9YCk7XG4gIH1cblxuICBjb25zdCByYW5nZVN0YXJ0RWwgPSBkYXRlUmFuZ2VQaWNrZXJFbC5xdWVyeVNlbGVjdG9yKFxuICAgIERBVEVfUkFOR0VfUElDS0VSX1JBTkdFX1NUQVJULFxuICApO1xuICBjb25zdCByYW5nZUVuZEVsID0gZGF0ZVJhbmdlUGlja2VyRWwucXVlcnlTZWxlY3RvcihcbiAgICBEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkQsXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRlUmFuZ2VQaWNrZXJFbCxcbiAgICByYW5nZVN0YXJ0RWwsXG4gICAgcmFuZ2VFbmRFbCxcbiAgfTtcbn07XG5cbi8qKlxuICogaGFuZGxlIHVwZGF0ZSBmcm9tIHJhbmdlIHN0YXJ0IGRhdGUgcGlja2VyXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgYW4gZWxlbWVudCB3aXRoaW4gdGhlIGRhdGUgcmFuZ2UgcGlja2VyXG4gKi9cbmNvbnN0IGhhbmRsZVJhbmdlU3RhcnRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VTdGFydEVsKTtcbiAgY29uc3QgdXBkYXRlZERhdGUgPSBpbnRlcm5hbElucHV0RWwudmFsdWU7XG5cbiAgaWYgKHVwZGF0ZWREYXRlICYmICFpc0RhdGVJbnB1dEludmFsaWQoaW50ZXJuYWxJbnB1dEVsKSkge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IHVwZGF0ZWREYXRlO1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IHVwZGF0ZWREYXRlO1xuICB9IGVsc2Uge1xuICAgIHJhbmdlRW5kRWwuZGF0YXNldC5taW5EYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5taW5EYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LnJhbmdlRGF0ZSA9IFwiXCI7XG4gICAgcmFuZ2VFbmRFbC5kYXRhc2V0LmRlZmF1bHREYXRlID0gXCJcIjtcbiAgfVxuXG4gIHVwZGF0ZUNhbGVuZGFySWZWaXNpYmxlKHJhbmdlRW5kRWwpO1xufTtcblxuLyoqXG4gKiBoYW5kbGUgdXBkYXRlIGZyb20gcmFuZ2Ugc3RhcnQgZGF0ZSBwaWNrZXJcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBhbiBlbGVtZW50IHdpdGhpbiB0aGUgZGF0ZSByYW5nZSBwaWNrZXJcbiAqL1xuY29uc3QgaGFuZGxlUmFuZ2VFbmRVcGRhdGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkYXRlUmFuZ2VQaWNrZXJFbCwgcmFuZ2VTdGFydEVsLCByYW5nZUVuZEVsIH0gPVxuICAgIGdldERhdGVSYW5nZVBpY2tlckNvbnRleHQoZWwpO1xuICBjb25zdCB7IGludGVybmFsSW5wdXRFbCB9ID0gZ2V0RGF0ZVBpY2tlckNvbnRleHQocmFuZ2VFbmRFbCk7XG4gIGNvbnN0IHVwZGF0ZWREYXRlID0gaW50ZXJuYWxJbnB1dEVsLnZhbHVlO1xuXG4gIGlmICh1cGRhdGVkRGF0ZSAmJiAhaXNEYXRlSW5wdXRJbnZhbGlkKGludGVybmFsSW5wdXRFbCkpIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gdXBkYXRlZERhdGU7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQuZGVmYXVsdERhdGUgPSB1cGRhdGVkRGF0ZTtcbiAgfSBlbHNlIHtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5tYXhEYXRlID0gZGF0ZVJhbmdlUGlja2VyRWwuZGF0YXNldC5tYXhEYXRlIHx8IFwiXCI7XG4gICAgcmFuZ2VTdGFydEVsLmRhdGFzZXQucmFuZ2VEYXRlID0gXCJcIjtcbiAgICByYW5nZVN0YXJ0RWwuZGF0YXNldC5kZWZhdWx0RGF0ZSA9IFwiXCI7XG4gIH1cblxuICB1cGRhdGVDYWxlbmRhcklmVmlzaWJsZShyYW5nZVN0YXJ0RWwpO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSByYW5nZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IGVuaGFuY2VEYXRlUmFuZ2VQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgZGF0ZVJhbmdlUGlja2VyRWwgPSBlbC5jbG9zZXN0KERBVEVfUkFOR0VfUElDS0VSKTtcblxuICBjb25zdCBbcmFuZ2VTdGFydCwgcmFuZ2VFbmRdID0gc2VsZWN0KERBVEVfUElDS0VSLCBkYXRlUmFuZ2VQaWNrZXJFbCk7XG5cbiAgaWYgKCFyYW5nZVN0YXJ0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3NpbmcgaW5uZXIgdHdvICcke0RBVEVfUElDS0VSfScgZWxlbWVudHNgLFxuICAgICk7XG4gIH1cblxuICBpZiAoIXJhbmdlRW5kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7REFURV9SQU5HRV9QSUNLRVJ9IGlzIG1pc3Npbmcgc2Vjb25kICcke0RBVEVfUElDS0VSfScgZWxlbWVudGAsXG4gICAgKTtcbiAgfVxuXG4gIHJhbmdlU3RhcnQuY2xhc3NMaXN0LmFkZChEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9TVEFSVF9DTEFTUyk7XG4gIHJhbmdlRW5kLmNsYXNzTGlzdC5hZGQoREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfRU5EX0NMQVNTKTtcblxuICBpZiAoIWRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSkge1xuICAgIGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQubWluRGF0ZSA9IERFRkFVTFRfTUlOX0RBVEU7XG4gIH1cblxuICBjb25zdCB7IG1pbkRhdGUgfSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQ7XG4gIHJhbmdlU3RhcnQuZGF0YXNldC5taW5EYXRlID0gbWluRGF0ZTtcbiAgcmFuZ2VFbmQuZGF0YXNldC5taW5EYXRlID0gbWluRGF0ZTtcblxuICBjb25zdCB7IG1heERhdGUgfSA9IGRhdGVSYW5nZVBpY2tlckVsLmRhdGFzZXQ7XG4gIGlmIChtYXhEYXRlKSB7XG4gICAgcmFuZ2VTdGFydC5kYXRhc2V0Lm1heERhdGUgPSBtYXhEYXRlO1xuICAgIHJhbmdlRW5kLmRhdGFzZXQubWF4RGF0ZSA9IG1heERhdGU7XG4gIH1cblxuICBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlKGRhdGVSYW5nZVBpY2tlckVsKTtcbiAgaGFuZGxlUmFuZ2VFbmRVcGRhdGUoZGF0ZVJhbmdlUGlja2VyRWwpO1xufTtcblxuY29uc3QgZGF0ZVJhbmdlUGlja2VyID0gYmVoYXZpb3IoXG4gIHtcbiAgICBcImlucHV0IGNoYW5nZVwiOiB7XG4gICAgICBbREFURV9SQU5HRV9QSUNLRVJfUkFOR0VfU1RBUlRdKCkge1xuICAgICAgICBoYW5kbGVSYW5nZVN0YXJ0VXBkYXRlKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIFtEQVRFX1JBTkdFX1BJQ0tFUl9SQU5HRV9FTkRdKCkge1xuICAgICAgICBoYW5kbGVSYW5nZUVuZFVwZGF0ZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKERBVEVfUkFOR0VfUElDS0VSLCByb290KS5mb3JFYWNoKChkYXRlUmFuZ2VQaWNrZXJFbCkgPT4ge1xuICAgICAgICBlbmhhbmNlRGF0ZVJhbmdlUGlja2VyKGRhdGVSYW5nZVBpY2tlckVsKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGVSYW5nZVBpY2tlcjtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgU2FuaXRpemVyID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Nhbml0aXplclwiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IERST1BaT05FX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0YDtcbmNvbnN0IERST1BaT05FID0gYC4ke0RST1BaT05FX0NMQVNTfWA7XG5jb25zdCBJTlBVVF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5wdXRgO1xuY29uc3QgVEFSR0VUX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X190YXJnZXRgO1xuY29uc3QgSU5QVVQgPSBgLiR7SU5QVVRfQ0xBU1N9YDtcbmNvbnN0IEJPWF9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYm94YDtcbmNvbnN0IElOU1RSVUNUSU9OU19DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9faW5zdHJ1Y3Rpb25zYDtcbmNvbnN0IFBSRVZJRVdfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXdgO1xuY29uc3QgUFJFVklFV19IRUFESU5HX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0X19wcmV2aWV3LWhlYWRpbmdgO1xuY29uc3QgRElTQUJMRURfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXQtLWRpc2FibGVkYDtcbmNvbnN0IENIT09TRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fY2hvb3NlYDtcbmNvbnN0IEFDQ0VQVEVEX0ZJTEVfTUVTU0FHRV9DTEFTUyA9IGAke1BSRUZJWH0tZmlsZS1pbnB1dF9fYWNjZXB0ZWQtZmlsZXMtbWVzc2FnZWA7XG5jb25zdCBEUkFHX1RFWFRfQ0xBU1MgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX2RyYWctdGV4dGA7XG5jb25zdCBEUkFHX0NMQVNTID0gYCR7UFJFRklYfS1maWxlLWlucHV0LS1kcmFnYDtcbmNvbnN0IExPQURJTkdfQ0xBU1MgPSBcImlzLWxvYWRpbmdcIjtcbmNvbnN0IElOVkFMSURfRklMRV9DTEFTUyA9IFwiaGFzLWludmFsaWQtZmlsZVwiO1xuY29uc3QgR0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUUgPSBgJHtQUkVGSVh9LWZpbGUtaW5wdXRfX3ByZXZpZXctaW1hZ2VgO1xuY29uc3QgR0VORVJJQ19QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1nZW5lcmljYDtcbmNvbnN0IFBERl9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS1wZGZgO1xuY29uc3QgV09SRF9QUkVWSUVXX0NMQVNTID0gYCR7R0VORVJJQ19QUkVWSUVXX0NMQVNTX05BTUV9LS13b3JkYDtcbmNvbnN0IFZJREVPX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLXZpZGVvYDtcbmNvbnN0IEVYQ0VMX1BSRVZJRVdfQ0xBU1MgPSBgJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0tLWV4Y2VsYDtcbmNvbnN0IFNSX09OTFlfQ0xBU1MgPSBgJHtQUkVGSVh9LXNyLW9ubHlgO1xuY29uc3QgU1BBQ0VSX0dJRiA9XG4gIFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3XCI7XG5jb25zdCBERUZBVUxUX0VSUk9SX0xBQkVMX1RFWFQgPSBcIkVycm9yOiBUaGlzIGlzIG5vdCBhIHZhbGlkIGZpbGUgdHlwZS5cIjtcblxubGV0IFRZUEVfSVNfVkFMSUQgPSBCb29sZWFuKHRydWUpOyAvLyBsb2dpYyBnYXRlIGZvciBjaGFuZ2UgbGlzdGVuZXJcbmxldCBERUZBVUxUX0FSSUFfTEFCRUxfVEVYVCA9IFwiXCI7XG5sZXQgREVGQVVMVF9GSUxFX1NUQVRVU19URVhUID0gXCJcIjtcblxuLyoqXG4gKiBUaGUgcHJvcGVydGllcyBhbmQgZWxlbWVudHMgd2l0aGluIHRoZSBmaWxlIGlucHV0LlxuICogQHR5cGVkZWYge09iamVjdH0gRmlsZUlucHV0Q29udGV4dFxuICogQHByb3BlcnR5IHtIVE1MRGl2RWxlbWVudH0gZHJvcFpvbmVFbFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dEVsXG4gKi9cblxuLyoqXG4gKiBHZXQgYW4gb2JqZWN0IG9mIHRoZSBwcm9wZXJ0aWVzIGFuZCBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiBmaWxlIGlucHV0IGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXRcbiAqIEByZXR1cm5zIHtGaWxlSW5wdXRDb250ZXh0fSBlbGVtZW50c1xuICovXG5jb25zdCBnZXRGaWxlSW5wdXRDb250ZXh0ID0gKGVsKSA9PiB7XG4gIGNvbnN0IGRyb3Bab25lRWwgPSBlbC5jbG9zZXN0KERST1BaT05FKTtcblxuICBpZiAoIWRyb3Bab25lRWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEVsZW1lbnQgaXMgbWlzc2luZyBvdXRlciAke0RST1BaT05FfWApO1xuICB9XG5cbiAgY29uc3QgaW5wdXRFbCA9IGRyb3Bab25lRWwucXVlcnlTZWxlY3RvcihJTlBVVCk7XG5cbiAgcmV0dXJuIHtcbiAgICBkcm9wWm9uZUVsLFxuICAgIGlucHV0RWwsXG4gIH07XG59O1xuXG4vKipcbiAqIERpc2FibGUgdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGRpc2FibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QuYWRkKERJU0FCTEVEX0NMQVNTKTtcbn07XG5cbi8qKlxuICogU2V0IGFyaWEtZGlzYWJsZWQgYXR0cmlidXRlIHRvIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgQW4gZWxlbWVudCB3aXRoaW4gdGhlIGZpbGUgaW5wdXQgY29tcG9uZW50XG4gKi9cbmNvbnN0IGFyaWFEaXNhYmxlID0gKGVsKSA9PiB7XG4gIGNvbnN0IHsgZHJvcFpvbmVFbCB9ID0gZ2V0RmlsZUlucHV0Q29udGV4dChlbCk7XG5cbiAgZHJvcFpvbmVFbC5jbGFzc0xpc3QuYWRkKERJU0FCTEVEX0NMQVNTKTtcbn07XG5cbi8qKlxuICogRW5hYmxlIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBmaWxlIGlucHV0IGNvbXBvbmVudFxuICovXG5jb25zdCBlbmFibGUgPSAoZWwpID0+IHtcbiAgY29uc3QgeyBkcm9wWm9uZUVsLCBpbnB1dEVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGVsKTtcblxuICBpbnB1dEVsLmRpc2FibGVkID0gZmFsc2U7XG4gIGRyb3Bab25lRWwuY2xhc3NMaXN0LnJlbW92ZShESVNBQkxFRF9DTEFTUyk7XG4gIGRyb3Bab25lRWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1kaXNhYmxlZFwiKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIHNwZWNpYWwgY2hhcmFjdGVyc1xuICogQHJldHVybnMge1N0cmluZ30gcmVwbGFjZXMgc3BlY2lmaWVkIHZhbHVlc1xuICovXG5jb25zdCByZXBsYWNlTmFtZSA9IChzKSA9PiB7XG4gIGNvbnN0IGMgPSBzLmNoYXJDb2RlQXQoMCk7XG4gIGlmIChjID09PSAzMikgcmV0dXJuIFwiLVwiO1xuICBpZiAoYyA+PSA2NSAmJiBjIDw9IDkwKSByZXR1cm4gYGltZ18ke3MudG9Mb3dlckNhc2UoKX1gO1xuICByZXR1cm4gYF9fJHsoXCIwMDBcIiwgYy50b1N0cmluZygxNikpLnNsaWNlKC00KX1gO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIElEIG5hbWUgZm9yIGVhY2ggZmlsZSB0aGF0IHN0cmlwcyBhbGwgaW52YWxpZCBjaGFyYWN0ZXJzLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBuYW1lIG9mIHRoZSBmaWxlIGFkZGVkIHRvIGZpbGUgaW5wdXQgKHNlYXJjaHZhbHVlKVxuICogQHJldHVybnMge1N0cmluZ30gc2FtZSBjaGFyYWN0ZXJzIGFzIHRoZSBuYW1lIHdpdGggaW52YWxpZCBjaGFycyByZW1vdmVkIChuZXd2YWx1ZSlcbiAqL1xuY29uc3QgbWFrZVNhZmVGb3JJRCA9IChuYW1lKSA9PiBuYW1lLnJlcGxhY2UoL1teYS16MC05XS9nLCByZXBsYWNlTmFtZSk7XG5cbi8vIFRha2VzIGEgZ2VuZXJhdGVkIHNhZmUgSUQgYW5kIGNyZWF0ZXMgYSB1bmlxdWUgSUQuXG5jb25zdCBjcmVhdGVVbmlxdWVJRCA9IChuYW1lKSA9PlxuICBgJHtuYW1lfS0ke01hdGguZmxvb3IoRGF0ZS5ub3coKS50b1N0cmluZygpIC8gMTAwMCl9YDtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBzaW5ndWxhciBvciBwbHVyYWwgaXRlbSBsYWJlbCBzaG91bGQgYmUgdXNlZFxuICogRGV0ZXJtaW5hdGlvbiBpcyBiYXNlZCBvbiB0aGUgcHJlc2VuY2Ugb2YgdGhlIGBtdWx0aXBsZWAgYXR0cmlidXRlXG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgc2luZ3VsYXIgb3IgcGx1cmFsIHZlcnNpb24gb2YgXCJpdGVtXCJcbiAqL1xuY29uc3QgZ2V0SXRlbXNMYWJlbCA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBhY2NlcHRzTXVsdGlwbGUgPSBmaWxlSW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKTtcbiAgY29uc3QgaXRlbXNMYWJlbCA9IGFjY2VwdHNNdWx0aXBsZSA/IFwiZmlsZXNcIiA6IFwiZmlsZVwiO1xuXG4gIHJldHVybiBpdGVtc0xhYmVsO1xufTtcblxuLyoqXG4gKiBTY2FmZm9sZCB0aGUgZmlsZSBpbnB1dCBjb21wb25lbnQgd2l0aCBhIHBhcmVudCB3cmFwcGVyIGFuZFxuICogQ3JlYXRlIGEgdGFyZ2V0IGFyZWEgb3ZlcmxheSBmb3IgZHJhZyBhbmQgZHJvcCBmdW5jdGlvbmFsaXR5XG4gKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWxlSW5wdXRFbCAtIFRoZSBpbnB1dCBlbGVtZW50LlxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgZHJhZyBhbmQgZHJvcCB0YXJnZXQgYXJlYS5cbiAqL1xuY29uc3QgY3JlYXRlVGFyZ2V0QXJlYSA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBmaWxlSW5wdXRQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBkcm9wVGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvLyBBZGRzIGNsYXNzIG5hbWVzIGFuZCBvdGhlciBhdHRyaWJ1dGVzXG4gIGZpbGVJbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUoRFJPUFpPTkVfQ0xBU1MpO1xuICBmaWxlSW5wdXRFbC5jbGFzc0xpc3QuYWRkKElOUFVUX0NMQVNTKTtcbiAgZmlsZUlucHV0UGFyZW50LmNsYXNzTGlzdC5hZGQoRFJPUFpPTkVfQ0xBU1MpO1xuICBib3guY2xhc3NMaXN0LmFkZChCT1hfQ0xBU1MpO1xuICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5hZGQoVEFSR0VUX0NMQVNTKTtcblxuICAvLyBBZGRzIGNoaWxkIGVsZW1lbnRzIHRvIHRoZSBET01cbiAgZHJvcFRhcmdldC5wcmVwZW5kKGJveCk7XG4gIGZpbGVJbnB1dEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGRyb3BUYXJnZXQsIGZpbGVJbnB1dEVsKTtcbiAgZmlsZUlucHV0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZmlsZUlucHV0UGFyZW50LCBkcm9wVGFyZ2V0KTtcbiAgZHJvcFRhcmdldC5hcHBlbmRDaGlsZChmaWxlSW5wdXRFbCk7XG4gIGZpbGVJbnB1dFBhcmVudC5hcHBlbmRDaGlsZChkcm9wVGFyZ2V0KTtcblxuICByZXR1cm4gZHJvcFRhcmdldDtcbn07XG5cbi8qKlxuICogQnVpbGQgdGhlIHZpc2libGUgZWxlbWVudCB3aXRoIGRlZmF1bHQgaW50ZXJhY3Rpb24gaW5zdHJ1Y3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgaW5wdXQgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH0gVGhlIGNvbnRhaW5lciBmb3IgdmlzaWJsZSBpbnRlcmFjdGlvbiBpbnN0cnVjdGlvbnMuXG4gKi9cbmNvbnN0IGNyZWF0ZVZpc2libGVJbnN0cnVjdGlvbnMgPSAoZmlsZUlucHV0RWwpID0+IHtcbiAgY29uc3QgZmlsZUlucHV0UGFyZW50ID0gZmlsZUlucHV0RWwuY2xvc2VzdChEUk9QWk9ORSk7XG4gIGNvbnN0IGl0ZW1zTGFiZWwgPSBnZXRJdGVtc0xhYmVsKGZpbGVJbnB1dEVsKTtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZHJhZ1RleHQgPSBgRHJhZyAke2l0ZW1zTGFiZWx9IGhlcmUgb3JgO1xuICBjb25zdCBjaG9vc2VUZXh0ID0gXCJjaG9vc2UgZnJvbSBmb2xkZXJcIjtcblxuICAvLyBDcmVhdGUgaW5zdHJ1Y3Rpb25zIHRleHQgZm9yIGFyaWEtbGFiZWxcbiAgREVGQVVMVF9BUklBX0xBQkVMX1RFWFQgPSBgJHtkcmFnVGV4dH0gJHtjaG9vc2VUZXh0fWA7XG5cbiAgLy8gQWRkcyBjbGFzcyBuYW1lcyBhbmQgb3RoZXIgYXR0cmlidXRlc1xuICBpbnN0cnVjdGlvbnMuY2xhc3NMaXN0LmFkZChJTlNUUlVDVElPTlNfQ0xBU1MpO1xuICBpbnN0cnVjdGlvbnMuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuXG4gIC8vIEFkZCBpbml0aWFsIGluc3RydWN0aW9ucyBmb3IgaW5wdXQgdXNhZ2VcbiAgZmlsZUlucHV0RWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBERUZBVUxUX0FSSUFfTEFCRUxfVEVYVCk7XG4gIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGA8c3BhbiBjbGFzcz1cIiR7RFJBR19URVhUX0NMQVNTfVwiPiR7ZHJhZ1RleHR9PC9zcGFuPiA8c3BhbiBjbGFzcz1cIiR7Q0hPT1NFX0NMQVNTfVwiPiR7Y2hvb3NlVGV4dH08L3NwYW4+YDtcblxuICAvLyBBZGQgdGhlIGluc3RydWN0aW9ucyBlbGVtZW50IHRvIHRoZSBET01cbiAgZmlsZUlucHV0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaW5zdHJ1Y3Rpb25zLCBmaWxlSW5wdXRFbCk7XG5cbiAgLy8gSUUxMSBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBkcm9wIGZpbGVzIG9uIGZpbGUgaW5wdXRzLCBzbyB3ZSd2ZSByZW1vdmVkIHRleHQgdGhhdCBpbmRpY2F0ZXMgdGhhdFxuICBpZiAoXG4gICAgL3J2OjExLjAvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8XG4gICAgL0VkZ2VcXC9cXGQuL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICApIHtcbiAgICBmaWxlSW5wdXRQYXJlbnQucXVlcnlTZWxlY3RvcihgLiR7RFJBR19URVhUX0NMQVNTfWApLm91dGVySFRNTCA9IFwiXCI7XG4gIH1cblxuICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xufTtcblxuLyoqXG4gKiBCdWlsZCBhIHNjcmVlbiByZWFkZXItb25seSBtZXNzYWdlIGVsZW1lbnQgdGhhdCBjb250YWlucyBmaWxlIHN0YXR1cyB1cGRhdGVzIGFuZFxuICogQ3JlYXRlIGFuZCBzZXQgdGhlIGRlZmF1bHQgZmlsZSBzdGF0dXMgbWVzc2FnZVxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgaW5wdXQgZWxlbWVudC5cbiAqL1xuY29uc3QgY3JlYXRlU1JPbmx5U3RhdHVzID0gKGZpbGVJbnB1dEVsKSA9PiB7XG4gIGNvbnN0IHN0YXR1c0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgaXRlbXNMYWJlbCA9IGdldEl0ZW1zTGFiZWwoZmlsZUlucHV0RWwpO1xuICBjb25zdCBmaWxlSW5wdXRQYXJlbnQgPSBmaWxlSW5wdXRFbC5jbG9zZXN0KERST1BaT05FKTtcbiAgY29uc3QgZmlsZUlucHV0VGFyZ2V0ID0gZmlsZUlucHV0RWwuY2xvc2VzdChgLiR7VEFSR0VUX0NMQVNTfWApO1xuXG4gIERFRkFVTFRfRklMRV9TVEFUVVNfVEVYVCA9IGBObyAke2l0ZW1zTGFiZWx9IHNlbGVjdGVkLmA7XG5cbiAgLy8gQWRkcyBjbGFzcyBuYW1lcyBhbmQgb3RoZXIgYXR0cmlidXRlc1xuICBzdGF0dXNFbC5jbGFzc0xpc3QuYWRkKFNSX09OTFlfQ0xBU1MpO1xuICBzdGF0dXNFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxpdmVcIiwgXCJwb2xpdGVcIik7XG5cbiAgLy8gQWRkIGluaXRpYWwgZmlsZSBzdGF0dXMgbWVzc2FnZVxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IERFRkFVTFRfRklMRV9TVEFUVVNfVEVYVDtcblxuICAvLyBBZGQgdGhlIHN0YXR1cyBlbGVtZW50IHRvIHRoZSBET01cbiAgZmlsZUlucHV0UGFyZW50Lmluc2VydEJlZm9yZShzdGF0dXNFbCwgZmlsZUlucHV0VGFyZ2V0KTtcbn07XG5cbi8qKlxuICogU2NhZmZvbGQgdGhlIGNvbXBvbmVudCB3aXRoIGFsbCByZXF1aXJlZCBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgb3JpZ2luYWwgaW5wdXQgZWxlbWVudC5cbiAqL1xuY29uc3QgZW5oYW5jZUZpbGVJbnB1dCA9IChmaWxlSW5wdXRFbCkgPT4ge1xuICBjb25zdCBpc0lucHV0RGlzYWJsZWQgPVxuICAgIGZpbGVJbnB1dEVsLmhhc0F0dHJpYnV0ZShcImFyaWEtZGlzYWJsZWRcIikgfHxcbiAgICBmaWxlSW5wdXRFbC5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgY29uc3QgZHJvcFRhcmdldCA9IGNyZWF0ZVRhcmdldEFyZWEoZmlsZUlucHV0RWwpO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjcmVhdGVWaXNpYmxlSW5zdHJ1Y3Rpb25zKGZpbGVJbnB1dEVsKTtcbiAgY29uc3QgeyBkcm9wWm9uZUVsIH0gPSBnZXRGaWxlSW5wdXRDb250ZXh0KGZpbGVJbnB1dEVsKTtcblxuICBpZiAoaXNJbnB1dERpc2FibGVkKSB7XG4gICAgZHJvcFpvbmVFbC5jbGFzc0xpc3QuYWRkKERJU0FCTEVEX0NMQVNTKTtcbiAgfSBlbHNlIHtcbiAgICBjcmVhdGVTUk9ubHlTdGF0dXMoZmlsZUlucHV0RWwpO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0IH07XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgaW1hZ2UgcHJldmlld3NcbiAqIFdlIHdhbnQgdG8gc3RhcnQgd2l0aCBhIGNsZWFuIGxpc3QgZXZlcnkgdGltZSBmaWxlcyBhcmUgYWRkZWQgdG8gdGhlIGZpbGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBkcm9wVGFyZ2V0IC0gVGhlIGRyYWcgYW5kIGRyb3AgdGFyZ2V0IGFyZWEuXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSBUaGUgY29udGFpbmVyIGZvciB2aXNpYmxlIGludGVyYWN0aW9uIGluc3RydWN0aW9ucy5cbiAqL1xuY29uc3QgcmVtb3ZlT2xkUHJldmlld3MgPSAoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zKSA9PiB7XG4gIGNvbnN0IGZpbGVQcmV2aWV3cyA9IGRyb3BUYXJnZXQucXVlcnlTZWxlY3RvckFsbChgLiR7UFJFVklFV19DTEFTU31gKTtcbiAgY29uc3QgY3VycmVudFByZXZpZXdIZWFkaW5nID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKFxuICAgIGAuJHtQUkVWSUVXX0hFQURJTkdfQ0xBU1N9YCxcbiAgKTtcbiAgY29uc3QgY3VycmVudEVycm9yTWVzc2FnZSA9IGRyb3BUYXJnZXQucXVlcnlTZWxlY3RvcihcbiAgICBgLiR7QUNDRVBURURfRklMRV9NRVNTQUdFX0NMQVNTfWAsXG4gICk7XG5cbiAgLyoqXG4gICAqIGZpbmRzIHRoZSBwYXJlbnQgb2YgdGhlIHBhc3NlZCBub2RlIGFuZCByZW1vdmVzIHRoZSBjaGlsZFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gICAqL1xuICBjb25zdCByZW1vdmVJbWFnZXMgPSAobm9kZSkgPT4ge1xuICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgdGhlIGhlYWRpbmcgYWJvdmUgdGhlIHByZXZpZXdzXG4gIGlmIChjdXJyZW50UHJldmlld0hlYWRpbmcpIHtcbiAgICBjdXJyZW50UHJldmlld0hlYWRpbmcub3V0ZXJIVE1MID0gXCJcIjtcbiAgfVxuXG4gIC8vIFJlbW92ZSBleGlzdGluZyBlcnJvciBtZXNzYWdlc1xuICBpZiAoY3VycmVudEVycm9yTWVzc2FnZSkge1xuICAgIGN1cnJlbnRFcnJvck1lc3NhZ2Uub3V0ZXJIVE1MID0gXCJcIjtcbiAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcbiAgfVxuXG4gIC8vIEdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3MgaWYgdGhleSBleGlzdCwgc2hvdyBpbnN0cnVjdGlvbnNcbiAgaWYgKGZpbGVQcmV2aWV3cyAhPT0gbnVsbCkge1xuICAgIGlmIChpbnN0cnVjdGlvbnMpIHtcbiAgICAgIGluc3RydWN0aW9ucy5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG4gICAgfVxuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZmlsZVByZXZpZXdzLCByZW1vdmVJbWFnZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc2NyZWVuIHJlYWRlci1vbmx5IHN0YXR1cyBtZXNzYWdlIGFmdGVyIGludGVyYWN0aW9uXG4gKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gc3RhdHVzRWxlbWVudCAtIFRoZSBzY3JlZW4gcmVhZGVyLW9ubHkgY29udGFpbmVyIGZvciBmaWxlIHN0YXR1cyB1cGRhdGVzLlxuICogQHBhcmFtIHtPYmplY3R9IGZpbGVOYW1lcyAtIFRoZSBzZWxlY3RlZCBmaWxlcyBmb3VuZCBpbiB0aGUgZmlsZUxpc3Qgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0gZmlsZVN0b3JlIC0gVGhlIGFycmF5IG9mIHVwbG9hZGVkIGZpbGUgbmFtZXMgY3JlYXRlZCBmcm9tIHRoZSBmaWxlTmFtZXMgb2JqZWN0LlxuICovXG5jb25zdCB1cGRhdGVTdGF0dXNNZXNzYWdlID0gKHN0YXR1c0VsZW1lbnQsIGZpbGVOYW1lcywgZmlsZVN0b3JlKSA9PiB7XG4gIGNvbnN0IHN0YXR1c0VsID0gc3RhdHVzRWxlbWVudDtcbiAgbGV0IHN0YXR1c01lc3NhZ2UgPSBERUZBVUxUX0ZJTEVfU1RBVFVTX1RFWFQ7XG5cbiAgLy8gSWYgZmlsZXMgYWRkZWQsIHVwZGF0ZSB0aGUgc3RhdHVzIG1lc3NhZ2Ugd2l0aCBmaWxlIG5hbWUocylcbiAgaWYgKGZpbGVOYW1lcy5sZW5ndGggPT09IDEpIHtcbiAgICBzdGF0dXNNZXNzYWdlID0gYFlvdSBoYXZlIHNlbGVjdGVkIHRoZSBmaWxlOiAke2ZpbGVTdG9yZX1gO1xuICB9IGVsc2UgaWYgKGZpbGVOYW1lcy5sZW5ndGggPiAxKSB7XG4gICAgc3RhdHVzTWVzc2FnZSA9IGBZb3UgaGF2ZSBzZWxlY3RlZCAke1xuICAgICAgZmlsZU5hbWVzLmxlbmd0aFxuICAgIH0gZmlsZXM6ICR7ZmlsZVN0b3JlLmpvaW4oXCIsIFwiKX1gO1xuICB9XG5cbiAgLy8gQWRkIGRlbGF5IHRvIGVuY291cmFnZSBzY3JlZW4gcmVhZGVyIHJlYWRvdXRcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc3RhdHVzRWwudGV4dENvbnRlbnQgPSBzdGF0dXNNZXNzYWdlO1xuICB9LCAxMDAwKTtcbn07XG5cbi8qKlxuICogU2hvdyB0aGUgcHJldmlldyBoZWFkaW5nLCBoaWRlIHRoZSBpbml0aWFsIGluc3RydWN0aW9ucyBhbmRcbiAqIFVwZGF0ZSB0aGUgYXJpYS1sYWJlbCB3aXRoIG5ldyBpbnN0cnVjdGlvbnMgdGV4dFxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmlsZUlucHV0RWwgLSBUaGUgaW5wdXQgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBmaWxlTmFtZXMgLSBUaGUgc2VsZWN0ZWQgZmlsZXMgZm91bmQgaW4gdGhlIGZpbGVMaXN0IG9iamVjdC5cbiAqL1xuY29uc3QgYWRkUHJldmlld0hlYWRpbmcgPSAoZmlsZUlucHV0RWwsIGZpbGVOYW1lcykgPT4ge1xuICBjb25zdCBmaWxlUHJldmlld3NIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgZHJvcFRhcmdldCA9IGZpbGVJbnB1dEVsLmNsb3Nlc3QoYC4ke1RBUkdFVF9DTEFTU31gKTtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZHJvcFRhcmdldC5xdWVyeVNlbGVjdG9yKGAuJHtJTlNUUlVDVElPTlNfQ0xBU1N9YCk7XG4gIGxldCBjaGFuZ2VJdGVtVGV4dCA9IFwiQ2hhbmdlIGZpbGVcIjtcbiAgbGV0IHByZXZpZXdIZWFkaW5nVGV4dCA9IFwiXCI7XG5cbiAgaWYgKGZpbGVOYW1lcy5sZW5ndGggPT09IDEpIHtcbiAgICBwcmV2aWV3SGVhZGluZ1RleHQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGBTZWxlY3RlZCBmaWxlIDxzcGFuIGNsYXNzPVwidXNhLWZpbGUtaW5wdXRfX2Nob29zZVwiPiR7Y2hhbmdlSXRlbVRleHR9PC9zcGFuPmA7XG4gIH0gZWxzZSBpZiAoZmlsZU5hbWVzLmxlbmd0aCA+IDEpIHtcbiAgICBjaGFuZ2VJdGVtVGV4dCA9IFwiQ2hhbmdlIGZpbGVzXCI7XG4gICAgcHJldmlld0hlYWRpbmdUZXh0ID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtmaWxlTmFtZXMubGVuZ3RofSBmaWxlcyBzZWxlY3RlZCA8c3BhbiBjbGFzcz1cInVzYS1maWxlLWlucHV0X19jaG9vc2VcIj4ke2NoYW5nZUl0ZW1UZXh0fTwvc3Bhbj5gO1xuICB9XG5cbiAgLy8gSGlkZXMgbnVsbCBzdGF0ZSBjb250ZW50IGFuZCBzZXRzIHByZXZpZXcgaGVhZGluZ1xuICBpbnN0cnVjdGlvbnMuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgZmlsZVByZXZpZXdzSGVhZGluZy5jbGFzc0xpc3QuYWRkKFBSRVZJRVdfSEVBRElOR19DTEFTUyk7XG4gIGZpbGVQcmV2aWV3c0hlYWRpbmcuaW5uZXJIVE1MID0gcHJldmlld0hlYWRpbmdUZXh0O1xuICBkcm9wVGFyZ2V0Lmluc2VydEJlZm9yZShmaWxlUHJldmlld3NIZWFkaW5nLCBpbnN0cnVjdGlvbnMpO1xuXG4gIC8vIFVwZGF0ZSBhcmlhIGxhYmVsIHRvIG1hdGNoIHRoZSB2aXNpYmxlIGFjdGlvbiB0ZXh0XG4gIGZpbGVJbnB1dEVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgY2hhbmdlSXRlbVRleHQpO1xufTtcblxuLyoqIEFkZCBhbiBlcnJvciBsaXN0ZW5lciB0byB0aGUgaW1hZ2UgcHJldmlldyB0byBzZXQgYSBmYWxsYmFjayBpbWFnZVxuICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBwcmV2aWV3SW1hZ2UgLSBUaGUgaW1hZ2UgZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IGZhbGxiYWNrQ2xhc3MgLSBUaGUgQ1NTIGNsYXNzIG9mIHRoZSBmYWxsYmFjayBpbWFnZVxuICovXG5jb25zdCBzZXRQcmV2aWV3RmFsbGJhY2sgPSAocHJldmlld0ltYWdlLCBmYWxsYmFja0NsYXNzKSA9PiB7XG4gIHByZXZpZXdJbWFnZS5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiZXJyb3JcIixcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBsb2NhbFByZXZpZXdJbWFnZSA9IHByZXZpZXdJbWFnZTsgLy8gdG8gYXZvaWQgbm8tcGFyYW0tcmVhc3NpZ24gZnJvbSBFU0xpbnRcbiAgICAgIGxvY2FsUHJldmlld0ltYWdlLnNyYyA9IFNQQUNFUl9HSUY7XG4gICAgICBsb2NhbFByZXZpZXdJbWFnZS5jbGFzc0xpc3QuYWRkKGZhbGxiYWNrQ2xhc3MpO1xuICAgIH0sXG4gICAgeyBvbmNlOiB0cnVlIH0sXG4gICk7XG59O1xuXG4vKipcbiAqIFdoZW4gbmV3IGZpbGVzIGFyZSBhcHBsaWVkIHRvIGZpbGUgaW5wdXQsIHRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHByZXZpZXdzXG4gKiBhbmQgcmVtb3ZlcyBvbGQgb25lcy5cbiAqXG4gKiBAcGFyYW0ge2V2ZW50fSBlXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gVGhlIGlucHV0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSBUaGUgY29udGFpbmVyIGZvciB2aXNpYmxlIGludGVyYWN0aW9uIGluc3RydWN0aW9ucy5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGRyb3BUYXJnZXQgLSBUaGUgZHJhZyBhbmQgZHJvcCB0YXJnZXQgYXJlYS5cbiAqL1xuXG5jb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCkgPT4ge1xuICBjb25zdCBmaWxlTmFtZXMgPSBlLnRhcmdldC5maWxlcztcbiAgY29uc3QgaW5wdXRQYXJlbnQgPSBkcm9wVGFyZ2V0LmNsb3Nlc3QoYC4ke0RST1BaT05FX0NMQVNTfWApO1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gaW5wdXRQYXJlbnQucXVlcnlTZWxlY3RvcihgLiR7U1JfT05MWV9DTEFTU31gKTtcbiAgY29uc3QgZmlsZVN0b3JlID0gW107XG5cbiAgLy8gRmlyc3QsIGdldCByaWQgb2YgZXhpc3RpbmcgcHJldmlld3NcbiAgcmVtb3ZlT2xkUHJldmlld3MoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zKTtcblxuICAvLyBUaGVuLCBpdGVyYXRlIHRocm91Z2ggZmlsZXMgbGlzdCBhbmQgY3JlYXRlIHByZXZpZXdzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZU5hbWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVOYW1lc1tpXS5uYW1lO1xuICAgIGxldCBpbWFnZUlkO1xuXG4gICAgLy8gUHVzaCB1cGRhdGVkIGZpbGUgbmFtZXMgaW50byB0aGUgc3RvcmUgYXJyYXlcbiAgICBmaWxlU3RvcmUucHVzaChmaWxlTmFtZSk7XG5cbiAgICAvLyBTdGFydHMgd2l0aCBhIGxvYWRpbmcgaW1hZ2Ugd2hpbGUgcHJldmlldyBpcyBjcmVhdGVkXG4gICAgcmVhZGVyLm9ubG9hZHN0YXJ0ID0gZnVuY3Rpb24gY3JlYXRlTG9hZGluZ0ltYWdlKCkge1xuICAgICAgaW1hZ2VJZCA9IGNyZWF0ZVVuaXF1ZUlEKG1ha2VTYWZlRm9ySUQoZmlsZU5hbWUpKTtcblxuICAgICAgaW5zdHJ1Y3Rpb25zLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgXCJhZnRlcmVuZFwiLFxuICAgICAgICBTYW5pdGl6ZXIuZXNjYXBlSFRNTGA8ZGl2IGNsYXNzPVwiJHtQUkVWSUVXX0NMQVNTfVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxpbWcgaWQ9XCIke2ltYWdlSWR9XCIgc3JjPVwiJHtTUEFDRVJfR0lGfVwiIGFsdD1cIlwiIGNsYXNzPVwiJHtHRU5FUklDX1BSRVZJRVdfQ0xBU1NfTkFNRX0gJHtMT0FESU5HX0NMQVNTfVwiLz4ke2ZpbGVOYW1lfVxuICAgICAgICA8ZGl2PmAsXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvLyBOb3QgYWxsIGZpbGVzIHdpbGwgYmUgYWJsZSB0byBnZW5lcmF0ZSBwcmV2aWV3cy4gSW4gY2FzZSB0aGlzIGhhcHBlbnMsIHdlIHByb3ZpZGUgc2V2ZXJhbCB0eXBlcyBcImdlbmVyaWMgcHJldmlld3NcIiBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24uXG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uIGNyZWF0ZUZpbGVQcmV2aWV3KCkge1xuICAgICAgY29uc3QgcHJldmlld0ltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW1hZ2VJZCk7XG4gICAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gZmlsZU5hbWUuc3BsaXQoXCIuXCIpLnBvcCgpO1xuICAgICAgaWYgKGZpbGVFeHRlbnNpb24gPT09IFwicGRmXCIpIHtcbiAgICAgICAgc2V0UHJldmlld0ZhbGxiYWNrKHByZXZpZXdJbWFnZSwgUERGX1BSRVZJRVdfQ0xBU1MpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlsZUV4dGVuc2lvbiA9PT0gXCJkb2NcIiB8fFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcImRvY3hcIiB8fFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcInBhZ2VzXCJcbiAgICAgICkge1xuICAgICAgICBzZXRQcmV2aWV3RmFsbGJhY2socHJldmlld0ltYWdlLCBXT1JEX1BSRVZJRVdfQ0xBU1MpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmlsZUV4dGVuc2lvbiA9PT0gXCJ4bHNcIiB8fFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcInhsc3hcIiB8fFxuICAgICAgICBmaWxlRXh0ZW5zaW9uID09PSBcIm51bWJlcnNcIlxuICAgICAgKSB7XG4gICAgICAgIHNldFByZXZpZXdGYWxsYmFjayhwcmV2aWV3SW1hZ2UsIEVYQ0VMX1BSRVZJRVdfQ0xBU1MpO1xuICAgICAgfSBlbHNlIGlmIChmaWxlRXh0ZW5zaW9uID09PSBcIm1vdlwiIHx8IGZpbGVFeHRlbnNpb24gPT09IFwibXA0XCIpIHtcbiAgICAgICAgc2V0UHJldmlld0ZhbGxiYWNrKHByZXZpZXdJbWFnZSwgVklERU9fUFJFVklFV19DTEFTUyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRQcmV2aWV3RmFsbGJhY2socHJldmlld0ltYWdlLCBHRU5FUklDX1BSRVZJRVdfQ0xBU1MpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmVzIGxvYWRlciBhbmQgZGlzcGxheXMgcHJldmlld1xuICAgICAgcHJldmlld0ltYWdlLmNsYXNzTGlzdC5yZW1vdmUoTE9BRElOR19DTEFTUyk7XG4gICAgICBwcmV2aWV3SW1hZ2Uuc3JjID0gcmVhZGVyLnJlc3VsdDtcbiAgICB9O1xuXG4gICAgaWYgKGZpbGVOYW1lc1tpXSkge1xuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZU5hbWVzW2ldKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZmlsZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIFJlc2V0IGlucHV0IGFyaWEtbGFiZWwgd2l0aCBkZWZhdWx0IG1lc3NhZ2VcbiAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIERFRkFVTFRfQVJJQV9MQUJFTF9URVhUKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRQcmV2aWV3SGVhZGluZyhmaWxlSW5wdXRFbCwgZmlsZU5hbWVzKTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXR1c01lc3NhZ2Uoc3RhdHVzRWxlbWVudCwgZmlsZU5hbWVzLCBmaWxlU3RvcmUpO1xufTtcblxuLyoqXG4gKiBXaGVuIHVzaW5nIGFuIEFjY2VwdCBhdHRyaWJ1dGUsIGludmFsaWQgZmlsZXMgd2lsbCBiZSBoaWRkZW4gZnJvbVxuICogZmlsZSBicm93c2VyLCBidXQgdGhleSBjYW4gc3RpbGwgYmUgZHJhZ2dlZCB0byB0aGUgaW5wdXQuIFRoaXNcbiAqIGZ1bmN0aW9uIHByZXZlbnRzIHRoZW0gZnJvbSBiZWluZyBkcmFnZ2VkIGFuZCByZW1vdmVzIGVycm9yIHN0YXRlc1xuICogd2hlbiBjb3JyZWN0IGZpbGVzIGFyZSBhZGRlZC5cbiAqXG4gKiBAcGFyYW0ge2V2ZW50fSBlXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gVGhlIGlucHV0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSBUaGUgY29udGFpbmVyIGZvciB2aXNpYmxlIGludGVyYWN0aW9uIGluc3RydWN0aW9ucy5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGRyb3BUYXJnZXQgLSBUaGUgZHJhZyBhbmQgZHJvcCB0YXJnZXQgYXJlYS5cbiAqL1xuY29uc3QgcHJldmVudEludmFsaWRGaWxlcyA9IChlLCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIGNvbnN0IGFjY2VwdGVkRmlsZXNBdHRyID0gZmlsZUlucHV0RWwuZ2V0QXR0cmlidXRlKFwiYWNjZXB0XCIpO1xuICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoSU5WQUxJRF9GSUxFX0NMQVNTKTtcblxuICAvKipcbiAgICogV2UgY2FuIHByb2JhYmx5IG1vdmUgYXdheSBmcm9tIHRoaXMgb25jZSBJRTExIHN1cHBvcnQgc3RvcHMsIGFuZCByZXBsYWNlXG4gICAqIHdpdGggYSBzaW1wbGUgZXMgYC5pbmNsdWRlc2BcbiAgICogY2hlY2sgaWYgZWxlbWVudCBpcyBpbiBhcnJheVxuICAgKiBjaGVjayBpZiAxIG9yIG1vcmUgYWxwaGFiZXRzIGFyZSBpbiBzdHJpbmdcbiAgICogaWYgZWxlbWVudCBpcyBwcmVzZW50IHJldHVybiB0aGUgcG9zaXRpb24gdmFsdWUgYW5kIC0xIG90aGVyd2lzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb25zdCBpc0luY2x1ZGVkID0gKGZpbGUsIHZhbHVlKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgY29uc3QgcG9zID0gZmlsZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAocG9zID49IDApIHtcbiAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIC8vIFJ1bnMgaWYgb25seSBzcGVjaWZpYyBmaWxlcyBhcmUgYWNjZXB0ZWRcbiAgaWYgKGFjY2VwdGVkRmlsZXNBdHRyKSB7XG4gICAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXNBdHRyLnNwbGl0KFwiLFwiKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHVzZXJFcnJvclRleHQgPSBmaWxlSW5wdXRFbC5kYXRhc2V0LmVycm9ybWVzc2FnZTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VUZXh0ID0gdXNlckVycm9yVGV4dCB8fCBERUZBVUxUX0VSUk9SX0xBQkVMX1RFWFQ7XG5cbiAgICBlcnJvck1lc3NhZ2Uuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XG5cbiAgICAvLyBJZiBtdWx0aXBsZSBmaWxlcyBhcmUgZHJhZ2dlZCwgdGhpcyBpdGVyYXRlcyB0aHJvdWdoIHRoZW0gYW5kIGxvb2sgZm9yIGFueSBmaWxlcyB0aGF0IGFyZSBub3QgYWNjZXB0ZWQuXG4gICAgbGV0IGFsbEZpbGVzQWxsb3dlZCA9IHRydWU7XG4gICAgY29uc3Qgc2Nhbm5lZEZpbGVzID0gZS50YXJnZXQuZmlsZXMgfHwgZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FubmVkRmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBzY2FubmVkRmlsZXNbaV07XG4gICAgICBpZiAoYWxsRmlsZXNBbGxvd2VkKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWNjZXB0ZWRGaWxlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGNvbnN0IGZpbGVUeXBlID0gYWNjZXB0ZWRGaWxlc1tqXTtcbiAgICAgICAgICBhbGxGaWxlc0FsbG93ZWQgPVxuICAgICAgICAgICAgZmlsZS5uYW1lLmluZGV4T2YoZmlsZVR5cGUpID4gMCB8fFxuICAgICAgICAgICAgaXNJbmNsdWRlZChmaWxlLnR5cGUsIGZpbGVUeXBlLnJlcGxhY2UoL1xcKi9nLCBcIlwiKSk7XG4gICAgICAgICAgaWYgKGFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgICAgICAgVFlQRV9JU19WQUxJRCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBicmVhaztcbiAgICB9XG5cbiAgICAvLyBJZiBkcmFnZ2VkIGZpbGVzIGFyZSBub3QgYWNjZXB0ZWQsIHRoaXMgcmVtb3ZlcyB0aGVtIGZyb20gdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBhbmQgY3JlYXRlcyBhbmQgZXJyb3Igc3RhdGVcbiAgICBpZiAoIWFsbEZpbGVzQWxsb3dlZCkge1xuICAgICAgcmVtb3ZlT2xkUHJldmlld3MoZHJvcFRhcmdldCwgaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIGZpbGVJbnB1dEVsLnZhbHVlID0gXCJcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlVGV4dDtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGVycm9yTWVzc2FnZSwgZmlsZUlucHV0RWwpO1xuXG4gICAgICBjb25zdCBhcmlhTGFiZWxUZXh0ID0gYCR7ZXJyb3JNZXNzYWdlVGV4dH0gJHtERUZBVUxUX0FSSUFfTEFCRUxfVEVYVH1gO1xuXG4gICAgICBmaWxlSW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGFyaWFMYWJlbFRleHQpO1xuICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoQUNDRVBURURfRklMRV9NRVNTQUdFX0NMQVNTKTtcbiAgICAgIGRyb3BUYXJnZXQuY2xhc3NMaXN0LmFkZChJTlZBTElEX0ZJTEVfQ0xBU1MpO1xuICAgICAgVFlQRV9JU19WQUxJRCA9IGZhbHNlO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogMS4gcGFzc2VzIHRocm91Z2ggZ2F0ZSBmb3IgcHJldmVudGluZyBpbnZhbGlkIGZpbGVzXG4gKiAyLiBoYW5kbGVzIHVwZGF0ZXMgaWYgZmlsZSBpcyB2YWxpZFxuICpcbiAqIEBwYXJhbSB7ZXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpbGVJbnB1dEVsIC0gVGhlIGlucHV0IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBpbnN0cnVjdGlvbnMgLSBUaGUgY29udGFpbmVyIGZvciB2aXNpYmxlIGludGVyYWN0aW9uIGluc3RydWN0aW9ucy5cbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGRyb3BUYXJnZXQgLSBUaGUgZHJhZyBhbmQgZHJvcCB0YXJnZXQgYXJlYS5cbiAqL1xuY29uc3QgaGFuZGxlVXBsb2FkID0gKGV2ZW50LCBmaWxlSW5wdXRFbCwgaW5zdHJ1Y3Rpb25zLCBkcm9wVGFyZ2V0KSA9PiB7XG4gIHByZXZlbnRJbnZhbGlkRmlsZXMoZXZlbnQsIGZpbGVJbnB1dEVsLCBpbnN0cnVjdGlvbnMsIGRyb3BUYXJnZXQpO1xuICBpZiAoVFlQRV9JU19WQUxJRCA9PT0gdHJ1ZSkge1xuICAgIGhhbmRsZUNoYW5nZShldmVudCwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCk7XG4gIH1cbn07XG5cbmNvbnN0IGZpbGVJbnB1dCA9IGJlaGF2aW9yKFxuICB7fSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKERST1BaT05FLCByb290KS5mb3JFYWNoKChmaWxlSW5wdXRFbCkgPT4ge1xuICAgICAgICBjb25zdCB7IGluc3RydWN0aW9ucywgZHJvcFRhcmdldCB9ID0gZW5oYW5jZUZpbGVJbnB1dChmaWxlSW5wdXRFbCk7XG5cbiAgICAgICAgZHJvcFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgIFwiZHJhZ292ZXJcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcigpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICApO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyYWdsZWF2ZVwiLFxuICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShEUkFHX0NMQVNTKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICApO1xuXG4gICAgICAgIGRyb3BUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImRyb3BcIixcbiAgICAgICAgICBmdW5jdGlvbiBoYW5kbGVEcm9wKCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKERSQUdfQ0xBU1MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICk7XG5cbiAgICAgICAgZmlsZUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICBcImNoYW5nZVwiLFxuICAgICAgICAgIChlKSA9PiBoYW5kbGVVcGxvYWQoZSwgZmlsZUlucHV0RWwsIGluc3RydWN0aW9ucywgZHJvcFRhcmdldCksXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhJTlBVVCwgcm9vdCkuZm9yRWFjaCgoZmlsZUlucHV0RWwpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUlucHV0VG9wRWxlbWVudCA9IGZpbGVJbnB1dEVsLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgZmlsZUlucHV0VG9wRWxlbWVudC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChcbiAgICAgICAgICBmaWxlSW5wdXRFbCxcbiAgICAgICAgICBmaWxlSW5wdXRUb3BFbGVtZW50LFxuICAgICAgICApO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZmlsZUlucHV0RWwuY2xhc3NOYW1lID0gRFJPUFpPTkVfQ0xBU1M7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEZpbGVJbnB1dENvbnRleHQsXG4gICAgZGlzYWJsZSxcbiAgICBhcmlhRGlzYWJsZSxcbiAgICBlbmFibGUsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbGVJbnB1dDtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IFNDT1BFID0gYC4ke1BSRUZJWH0tZm9vdGVyLS1iaWdgO1xuY29uc3QgTkFWID0gYCR7U0NPUEV9IG5hdmA7XG5jb25zdCBCVVRUT04gPSBgJHtOQVZ9IC4ke1BSRUZJWH0tZm9vdGVyX19wcmltYXJ5LWxpbmtgO1xuY29uc3QgSElERV9NQVhfV0lEVEggPSA0ODA7XG5cbi8qKlxuICogRXhwYW5kcyBzZWxlY3RlZCBmb290ZXIgbWVudSBwYW5lbCwgd2hpbGUgY29sbGFwc2luZyBvdGhlcnNcbiAqL1xuZnVuY3Rpb24gc2hvd1BhbmVsKCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCkge1xuICAgIGNvbnN0IGlzT3BlbiA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gICAgY29uc3QgdGhpc0Zvb3RlciA9IHRoaXMuY2xvc2VzdChTQ09QRSk7XG5cbiAgICAvLyBDbG9zZSBhbGwgb3RoZXIgbWVudXNcbiAgICB0aGlzRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCAhaXNPcGVuKTtcbiAgfVxufVxuXG4vKipcbiAqIFN3YXBzIHRoZSA8aDQ+IGVsZW1lbnQgZm9yIGEgPGJ1dHRvbj4gZWxlbWVudCAoYW5kIHZpY2UtdmVyc2EpIGFuZCBzZXRzIGlkXG4gKiBvZiBtZW51IGxpc3RcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzTW9iaWxlIC0gSWYgdGhlIGZvb3RlciBpcyBpbiBtb2JpbGUgY29uZmlndXJhdGlvblxuICovXG5mdW5jdGlvbiB0b2dnbGVIdG1sVGFnKGlzTW9iaWxlKSB7XG4gIGNvbnN0IGJpZ0Zvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0NPUEUpO1xuXG4gIGlmICghYmlnRm9vdGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcHJpbWFyeUxpbmtzID0gYmlnRm9vdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoQlVUVE9OKTtcblxuICBwcmltYXJ5TGlua3MuZm9yRWFjaCgoY3VycmVudEVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBjdXJyZW50RWxlbWVudENsYXNzZXMgPSBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICBjb25zdCBwcmVzZXJ2ZWRIdG1sVGFnID1cbiAgICAgIGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGFnXCIpIHx8IGN1cnJlbnRFbGVtZW50LnRhZ05hbWU7XG5cbiAgICBjb25zdCBuZXdFbGVtZW50VHlwZSA9IGlzTW9iaWxlID8gXCJidXR0b25cIiA6IHByZXNlcnZlZEh0bWxUYWc7XG5cbiAgICAvLyBDcmVhdGUgdGhlIG5ldyBlbGVtZW50XG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudFR5cGUpO1xuICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY3VycmVudEVsZW1lbnRDbGFzc2VzKTtcbiAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXG4gICAgICBgJHtQUkVGSVh9LWZvb3Rlcl9fcHJpbWFyeS1saW5rLS1idXR0b25gLFxuICAgICAgaXNNb2JpbGUsXG4gICAgKTtcbiAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudEVsZW1lbnQudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YWdcIiwgY3VycmVudEVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBtZW51SWQgPSBgJHtQUkVGSVh9LWZvb3Rlci1tZW51LWxpc3QtJHtNYXRoLmZsb29yKFxuICAgICAgICBNYXRoLnJhbmRvbSgpICogMTAwMDAwLFxuICAgICAgKX1gO1xuXG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgbWVudUlkKTtcbiAgICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgY3VycmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZShcImlkXCIsIG1lbnVJZCk7XG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgfVxuXG4gICAgLy8gSW5zZXJ0IHRoZSBuZXcgZWxlbWVudCBhbmQgZGVsZXRlIHRoZSBvbGRcbiAgICBjdXJyZW50RWxlbWVudC5hZnRlcihuZXdFbGVtZW50KTtcbiAgICBjdXJyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgfSk7XG59XG5cbmNvbnN0IHJlc2l6ZSA9IChldmVudCkgPT4ge1xuICB0b2dnbGVIdG1sVGFnKGV2ZW50Lm1hdGNoZXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtCVVRUT05dOiBzaG93UGFuZWwsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIC8vIGV4cG9ydCBmb3IgdXNlIGVsc2V3aGVyZVxuICAgIEhJREVfTUFYX1dJRFRILFxuXG4gICAgaW5pdCgpIHtcbiAgICAgIHRvZ2dsZUh0bWxUYWcod2luZG93LmlubmVyV2lkdGggPCBISURFX01BWF9XSURUSCk7XG4gICAgICB0aGlzLm1lZGlhUXVlcnlMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEoXG4gICAgICAgIGAobWF4LXdpZHRoOiAke0hJREVfTUFYX1dJRFRIIC0gMC4xfXB4KWAsXG4gICAgICApO1xuICAgICAgdGhpcy5tZWRpYVF1ZXJ5TGlzdC5hZGRMaXN0ZW5lcihyZXNpemUpO1xuICAgIH0sXG5cbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIHRoaXMubWVkaWFRdWVyeUxpc3QucmVtb3ZlTGlzdGVuZXIocmVzaXplKTtcbiAgICB9LFxuICB9LFxuKTtcbiIsImNvbnN0IGtleW1hcCA9IHJlcXVpcmUoXCJyZWNlcHRvci9rZXltYXBcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3RcIik7XG5jb25zdCB0b2dnbGUgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvdG9nZ2xlXCIpO1xuY29uc3QgRm9jdXNUcmFwID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2ZvY3VzLXRyYXBcIik7XG5jb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi4vLi4vdXNhLWFjY29yZGlvbi9zcmMvaW5kZXhcIik7XG5jb25zdCBTY3JvbGxCYXJXaWR0aCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zY3JvbGxiYXItd2lkdGhcIik7XG5cbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBCT0RZID0gXCJib2R5XCI7XG5jb25zdCBIRUFERVIgPSBgLiR7UFJFRklYfS1oZWFkZXJgO1xuY29uc3QgTkFWID0gYC4ke1BSRUZJWH0tbmF2YDtcbmNvbnN0IE5BVl9DT05UQUlORVIgPSBgLiR7UFJFRklYfS1uYXYtY29udGFpbmVyYDtcbmNvbnN0IE5BVl9QUklNQVJZID0gYC4ke1BSRUZJWH0tbmF2X19wcmltYXJ5YDtcbmNvbnN0IE5BVl9QUklNQVJZX0lURU0gPSBgLiR7UFJFRklYfS1uYXZfX3ByaW1hcnktaXRlbWA7XG5jb25zdCBOQVZfQ09OVFJPTCA9IGBidXR0b24uJHtQUkVGSVh9LW5hdl9fbGlua2A7XG5jb25zdCBOQVZfTElOS1MgPSBgJHtOQVZ9IGFgO1xuY29uc3QgTk9OX05BVl9ISURERU5fQVRUUklCVVRFID0gYGRhdGEtbmF2LWhpZGRlbmA7XG5jb25zdCBPUEVORVJTID0gYC4ke1BSRUZJWH0tbWVudS1idG5gO1xuY29uc3QgQ0xPU0VfQlVUVE9OID0gYC4ke1BSRUZJWH0tbmF2X19jbG9zZWA7XG5jb25zdCBPVkVSTEFZID0gYC4ke1BSRUZJWH0tb3ZlcmxheWA7XG5jb25zdCBDTE9TRVJTID0gYCR7Q0xPU0VfQlVUVE9OfSwgLiR7UFJFRklYfS1vdmVybGF5YDtcbmNvbnN0IFRPR0dMRVMgPSBbTkFWLCBPVkVSTEFZXS5qb2luKFwiLCBcIik7XG5jb25zdCBOT05fTkFWX0VMRU1FTlRTID0gYGJvZHkgKjpub3QoJHtIRUFERVJ9LCAke05BVl9DT05UQUlORVJ9LCAke05BVn0sICR7TkFWfSAqKTpub3QoW2FyaWEtaGlkZGVuXSlgO1xuY29uc3QgTk9OX05BVl9ISURERU4gPSBgWyR7Tk9OX05BVl9ISURERU5fQVRUUklCVVRFfV1gO1xuXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBcInVzYS1qcy1tb2JpbGUtbmF2LS1hY3RpdmVcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcblxubGV0IG5hdmlnYXRpb247XG5sZXQgbmF2QWN0aXZlO1xubGV0IG5vbk5hdkVsZW1lbnRzO1xuXG5jb25zdCBpc0FjdGl2ZSA9ICgpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKEFDVElWRV9DTEFTUyk7XG4vLyBEZXRlY3QgU2FmYXJpXG4vLyBOb3RlOiBDaHJvbWUgYWxzbyByZXBvcnRzIHRoZSBTYWZhcmkgdXNlckFnZW50IHNvIHRoaXMgc3BlY2lmaWNhbGx5IGV4Y2x1ZGVzIENocm9tZS5cbmNvbnN0IGlzU2FmYXJpID1cbiAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIlNhZmFyaVwiKSAmJlxuICAhbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkNocm9tZVwiKTtcbmNvbnN0IFNDUk9MTEJBUl9XSURUSCA9IFNjcm9sbEJhcldpZHRoKCk7XG5jb25zdCBJTklUSUFMX1BBRERJTkcgPSB3aW5kb3dcbiAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuY29uc3QgVEVNUE9SQVJZX1BBRERJTkcgPSBgJHtcbiAgcGFyc2VJbnQoSU5JVElBTF9QQURESU5HLnJlcGxhY2UoL3B4LywgXCJcIiksIDEwKSArXG4gIHBhcnNlSW50KFNDUk9MTEJBUl9XSURUSC5yZXBsYWNlKC9weC8sIFwiXCIpLCAxMClcbn1weGA7XG5cbmNvbnN0IGhpZGVOb25OYXZJdGVtcyA9ICgpID0+IHtcbiAgY29uc3QgaGVhZGVyUGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtIRUFERVJ9YCkucGFyZW50Tm9kZTtcbiAgbm9uTmF2RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9OQVZfRUxFTUVOVFMpO1xuXG4gIG5vbk5hdkVsZW1lbnRzLmZvckVhY2goKG5vbk5hdkVsZW1lbnQpID0+IHtcbiAgICBpZiAobm9uTmF2RWxlbWVudCAhPT0gaGVhZGVyUGFyZW50KSB7XG4gICAgICBub25OYXZFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xuICAgICAgbm9uTmF2RWxlbWVudC5zZXRBdHRyaWJ1dGUoTk9OX05BVl9ISURERU5fQVRUUklCVVRFLCBcIlwiKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3Qgc2hvd05vbk5hdkl0ZW1zID0gKCkgPT4ge1xuICBub25OYXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoTk9OX05BVl9ISURERU4pO1xuXG4gIGlmICghbm9uTmF2RWxlbWVudHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBSZW1vdmUgYXJpYS1oaWRkZW4gZnJvbSBub24taGVhZGVyIGVsZW1lbnRzXG4gIG5vbk5hdkVsZW1lbnRzLmZvckVhY2goKG5vbk5hdkVsZW1lbnQpID0+IHtcbiAgICBub25OYXZFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICAgIG5vbk5hdkVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKE5PTl9OQVZfSElEREVOX0FUVFJJQlVURSk7XG4gIH0pO1xufTtcblxuLy8gVG9nZ2xlIGFsbCBub24taGVhZGVyIGVsZW1lbnRzICMzNTI3LlxuY29uc3QgdG9nZ2xlTm9uTmF2SXRlbXMgPSAoYWN0aXZlKSA9PiB7XG4gIGlmIChhY3RpdmUpIHtcbiAgICBoaWRlTm9uTmF2SXRlbXMoKTtcbiAgfSBlbHNlIHtcbiAgICBzaG93Tm9uTmF2SXRlbXMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlY3QgU2FmYXJpIGFuZCBhZGQgYm9keSBjbGFzcyBmb3IgYSBTYWZhcmktb25seSBDU1MgYnVnIGZpeC5cbiAqIE1vcmUgZGV0YWlscyBpbiBodHRwczovL2dpdGh1Yi5jb20vdXN3ZHMvdXN3ZHMvcHVsbC81NDQzXG4gKi9cbmNvbnN0IGFkZFNhZmFyaUNsYXNzID0gKCkgPT4ge1xuICBpZiAoaXNTYWZhcmkpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJpcy1zYWZhcmlcIik7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0IHRoZSB2YWx1ZSBmb3IgdGhlIC0tc2Nyb2xsdG9wIENTUyB2YXIgd2hlbiB0aGUgbW9iaWxlIG1lbnUgaXMgb3Blbi5cbiAqIFRoaXMgYWxsb3dzIHRoZSBDU1MgdG8gbG9jayB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gaW4gU2FmYXJpXG4gKiB3aGVuIG92ZXJmbG93LXkgaXMgc2V0IHRvIHNjcm9sbC5cbiAqIE1vcmUgZGV0YWlscyBpbiBodHRwczovL2dpdGh1Yi5jb20vdXN3ZHMvdXN3ZHMvcHVsbC81NDQzXG4gKi9cbmNvbnN0IHNldFNhZmFyaVNjcm9sbFBvc2l0aW9uID0gKGJvZHkpID0+IHtcbiAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gYC0ke3dpbmRvdy5zY3JvbGxZfXB4YDtcbiAgaWYgKGlzU2FmYXJpKSB7XG4gICAgYm9keS5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tc2Nyb2xsdG9wXCIsIGN1cnJlbnRTY3JvbGxQb3NpdGlvbik7XG4gIH1cbn07XG5cbmNvbnN0IHRvZ2dsZU5hdiA9IChhY3RpdmUpID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbiAgY29uc3Qgc2FmZUFjdGl2ZSA9IHR5cGVvZiBhY3RpdmUgPT09IFwiYm9vbGVhblwiID8gYWN0aXZlIDogIWlzQWN0aXZlKCk7XG5cbiAgc2V0U2FmYXJpU2Nyb2xsUG9zaXRpb24oYm9keSk7XG5cbiAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKEFDVElWRV9DTEFTUywgc2FmZUFjdGl2ZSk7XG5cbiAgc2VsZWN0KFRPR0dMRVMpLmZvckVhY2goKGVsKSA9PlxuICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoVklTSUJMRV9DTEFTUywgc2FmZUFjdGl2ZSksXG4gICk7XG5cbiAgbmF2aWdhdGlvbi5mb2N1c1RyYXAudXBkYXRlKHNhZmVBY3RpdmUpO1xuXG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKENMT1NFX0JVVFRPTik7XG4gIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuXG4gIGJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID1cbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9PT0gVEVNUE9SQVJZX1BBRERJTkdcbiAgICAgID8gSU5JVElBTF9QQURESU5HXG4gICAgICA6IFRFTVBPUkFSWV9QQURESU5HO1xuXG4gIHRvZ2dsZU5vbk5hdkl0ZW1zKHNhZmVBY3RpdmUpO1xuXG4gIGlmIChzYWZlQWN0aXZlICYmIGNsb3NlQnV0dG9uKSB7XG4gICAgLy8gVGhlIG1vYmlsZSBuYXYgd2FzIGp1c3QgYWN0aXZhdGVkLiBGb2N1cyBvbiB0aGUgY2xvc2UgYnV0dG9uLCB3aGljaCBpc1xuICAgIC8vIGp1c3QgYmVmb3JlIGFsbCB0aGUgbmF2IGVsZW1lbnRzIGluIHRoZSB0YWIgb3JkZXIuXG4gICAgY2xvc2VCdXR0b24uZm9jdXMoKTtcbiAgfSBlbHNlIGlmIChcbiAgICAhc2FmZUFjdGl2ZSAmJlxuICAgIG1lbnVCdXR0b24gJiZcbiAgICBnZXRDb21wdXRlZFN0eWxlKG1lbnVCdXR0b24pLmRpc3BsYXkgIT09IFwibm9uZVwiXG4gICkge1xuICAgIC8vIFRoZSBtb2JpbGUgbmF2IHdhcyBqdXN0IGRlYWN0aXZhdGVkLiBXZSBkb24ndCB3YW50IHRoZSBmb2N1cyB0b1xuICAgIC8vIGRpc2FwcGVhciBpbnRvIHRoZSB2b2lkLCBzbyBmb2N1cyBvbiB0aGUgbWVudSBidXR0b24gaWYgaXQnc1xuICAgIC8vIHZpc2libGUgKHRoaXMgbWF5IGhhdmUgYmVlbiB3aGF0IHRoZSB1c2VyIHdhcyBqdXN0IGZvY3VzZWQgb24sXG4gICAgLy8gaWYgdGhleSB0cmlnZ2VyZWQgdGhlIG1vYmlsZSBuYXYgYnkgbWlzdGFrZSkuXG4gICAgbWVudUJ1dHRvbi5mb2N1cygpO1xuICB9XG5cbiAgcmV0dXJuIHNhZmVBY3RpdmU7XG59O1xuXG5jb25zdCByZXNpemUgPSAoKSA9PiB7XG4gIGNvbnN0IGNsb3NlciA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuXG4gIGlmIChpc0FjdGl2ZSgpICYmIGNsb3NlciAmJiBjbG9zZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggPT09IDApIHtcbiAgICAvLyBXaGVuIHRoZSBtb2JpbGUgbmF2IGlzIGFjdGl2ZSwgYW5kIHRoZSBjbG9zZSBib3ggaXNuJ3QgdmlzaWJsZSxcbiAgICAvLyB3ZSBrbm93IHRoZSB1c2VyJ3Mgdmlld3BvcnQgaGFzIGJlZW4gcmVzaXplZCB0byBiZSBsYXJnZXIuXG4gICAgLy8gTGV0J3MgbWFrZSB0aGUgcGFnZSBzdGF0ZSBjb25zaXN0ZW50IGJ5IGRlYWN0aXZhdGluZyB0aGUgbW9iaWxlIG5hdi5cbiAgICBuYXZpZ2F0aW9uLnRvZ2dsZU5hdi5jYWxsKGNsb3NlciwgZmFsc2UpO1xuICB9XG59O1xuXG5jb25zdCBvbk1lbnVDbG9zZSA9ICgpID0+IG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuXG5jb25zdCBoaWRlQWN0aXZlTmF2RHJvcGRvd24gPSAoKSA9PiB7XG4gIGlmICghbmF2QWN0aXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdG9nZ2xlKG5hdkFjdGl2ZSwgZmFsc2UpO1xuICBuYXZBY3RpdmUgPSBudWxsO1xufTtcblxuY29uc3QgZm9jdXNOYXZCdXR0b24gPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgcGFyZW50TmF2SXRlbSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KE5BVl9QUklNQVJZX0lURU0pO1xuXG4gIC8vIE9ubHkgc2hpZnQgZm9jdXMgaWYgd2l0aGluIGRyb3Bkb3duXG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoTkFWX0NPTlRST0wpKSB7XG4gICAgY29uc3QgbmF2Q29udHJvbCA9IHBhcmVudE5hdkl0ZW0ucXVlcnlTZWxlY3RvcihOQVZfQ09OVFJPTCk7XG4gICAgaWYgKG5hdkNvbnRyb2wpIHtcbiAgICAgIG5hdkNvbnRyb2wuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudCkgPT4ge1xuICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgZm9jdXNOYXZCdXR0b24oZXZlbnQpO1xufTtcblxubmF2aWdhdGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW05BVl9DT05UUk9MXSgpIHtcbiAgICAgICAgLy8gSWYgYW5vdGhlciBuYXYgaXMgb3BlbiwgY2xvc2UgaXRcbiAgICAgICAgaWYgKG5hdkFjdGl2ZSAhPT0gdGhpcykge1xuICAgICAgICAgIGhpZGVBY3RpdmVOYXZEcm9wZG93bigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3JlIGEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IGNsaWNrZWQgbmF2IGxpbmsgZWxlbWVudCwgc28gd2VcbiAgICAgICAgLy8gY2FuIGhpZGUgdGhlIGRyb3Bkb3duIGlmIGFub3RoZXIgZWxlbWVudCBvbiB0aGUgcGFnZSBpcyBjbGlja2VkXG4gICAgICAgIGlmICghbmF2QWN0aXZlKSB7XG4gICAgICAgICAgbmF2QWN0aXZlID0gdGhpcztcbiAgICAgICAgICB0b2dnbGUobmF2QWN0aXZlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHRoaXMgc28gdGhlIGV2ZW50IGhhbmRsZXIgb24gdGhlIGJvZHkgZG9lc24ndCBmaXJlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBbQk9EWV06IGhpZGVBY3RpdmVOYXZEcm9wZG93bixcbiAgICAgIFtPUEVORVJTXTogdG9nZ2xlTmF2LFxuICAgICAgW0NMT1NFUlNdOiB0b2dnbGVOYXYsXG4gICAgICBbTkFWX0xJTktTXSgpIHtcbiAgICAgICAgLy8gQSBuYXZpZ2F0aW9uIGxpbmsgaGFzIGJlZW4gY2xpY2tlZCEgV2Ugd2FudCB0byBjb2xsYXBzZSBhbnlcbiAgICAgICAgLy8gaGllcmFyY2hpY2FsIG5hdmlnYXRpb24gVUkgaXQncyBhIHBhcnQgb2YsIHNvIHRoYXQgdGhlIHVzZXJcbiAgICAgICAgLy8gY2FuIGZvY3VzIG9uIHdoYXRldmVyIHRoZXkndmUganVzdCBzZWxlY3RlZC5cblxuICAgICAgICAvLyBTb21lIG5hdmlnYXRpb24gbGlua3MgYXJlIGluc2lkZSBhY2NvcmRpb25zOyB3aGVuIHRoZXkncmVcbiAgICAgICAgLy8gY2xpY2tlZCwgd2Ugd2FudCB0byBjb2xsYXBzZSB0aG9zZSBhY2NvcmRpb25zLlxuICAgICAgICBjb25zdCBhY2MgPSB0aGlzLmNsb3Nlc3QoYWNjb3JkaW9uLkFDQ09SRElPTik7XG5cbiAgICAgICAgaWYgKGFjYykge1xuICAgICAgICAgIGFjY29yZGlvbi5nZXRCdXR0b25zKGFjYykuZm9yRWFjaCgoYnRuKSA9PiBhY2NvcmRpb24uaGlkZShidG4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBtb2JpbGUgbmF2aWdhdGlvbiBtZW51IGlzIGFjdGl2ZSwgd2Ugd2FudCB0byBoaWRlIGl0LlxuICAgICAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICAgIG5hdmlnYXRpb24udG9nZ2xlTmF2LmNhbGwobmF2aWdhdGlvbiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW05BVl9QUklNQVJZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgICBmb2N1c291dDoge1xuICAgICAgW05BVl9QUklNQVJZXShldmVudCkge1xuICAgICAgICBjb25zdCBuYXYgPSBldmVudC50YXJnZXQuY2xvc2VzdChOQVZfUFJJTUFSWSk7XG5cbiAgICAgICAgaWYgKCFuYXYuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTmF2RHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5tYXRjaGVzKE5BVikgPyByb290IDogcm9vdC5xdWVyeVNlbGVjdG9yKE5BVik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYWRkU2FmYXJpQ2xhc3MoKTtcbiAgICAgIHJlc2l6ZSgpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplLCBmYWxzZSk7XG4gICAgfSxcbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZSwgZmFsc2UpO1xuICAgICAgbmF2QWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBmb2N1c1RyYXA6IG51bGwsXG4gICAgdG9nZ2xlTmF2LFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXZpZ2F0aW9uO1xuIiwiY29uc3Qgb25jZSA9IHJlcXVpcmUoXCJyZWNlcHRvci9vbmNlXCIpO1xuY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHsgQ0xJQ0sgfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9ldmVudHNcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuXG5jb25zdCBDVVJSRU5UX0NMQVNTID0gYCR7UFJFRklYfS1jdXJyZW50YDtcbmNvbnN0IElOX1BBR0VfTkFWX0hFQURJTkdTID0gXCJoMiBoM1wiO1xuY29uc3QgSU5fUEFHRV9OQVZfVkFMSURfSEVBRElOR1MgPSBbXCJoMVwiLCBcImgyXCIsIFwiaDNcIiwgXCJoNFwiLCBcImg1XCIsIFwiaDZcIl07XG5jb25zdCBJTl9QQUdFX05BVl9USVRMRV9URVhUID0gXCJPbiB0aGlzIHBhZ2VcIjtcbmNvbnN0IElOX1BBR0VfTkFWX1RJVExFX0hFQURJTkdfTEVWRUwgPSBcImg0XCI7XG5jb25zdCBJTl9QQUdFX05BVl9TQ1JPTExfT0ZGU0VUID0gMDtcbmNvbnN0IElOX1BBR0VfTkFWX1JPT1RfTUFSR0lOID0gXCIwcHggMHB4IDBweCAwcHhcIjtcbmNvbnN0IElOX1BBR0VfTkFWX1RIUkVTSE9MRCA9IFwiMVwiO1xuY29uc3QgSU5fUEFHRV9OQVZfQ0xBU1MgPSBgJHtQUkVGSVh9LWluLXBhZ2UtbmF2YDtcbmNvbnN0IElOX1BBR0VfTkFWX0FOQ0hPUl9DTEFTUyA9IGAke1BSRUZJWH0tYW5jaG9yYDtcbmNvbnN0IElOX1BBR0VfTkFWX05BVl9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9fbmF2YDtcbmNvbnN0IElOX1BBR0VfTkFWX0xJU1RfQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9DTEFTU31fX2xpc3RgO1xuY29uc3QgSU5fUEFHRV9OQVZfSVRFTV9DTEFTUyA9IGAke0lOX1BBR0VfTkFWX0NMQVNTfV9faXRlbWA7XG5jb25zdCBJTl9QQUdFX05BVl9QUklNQVJZX0lURU1fQ0xBU1MgPSBgJHtJTl9QQUdFX05BVl9JVEVNX0NMQVNTfS0tcHJpbWFyeWA7XG5jb25zdCBJTl9QQUdFX05BVl9MSU5LX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19saW5rYDtcbmNvbnN0IElOX1BBR0VfTkFWX1RJVExFX0NMQVNTID0gYCR7SU5fUEFHRV9OQVZfQ0xBU1N9X19oZWFkaW5nYDtcbmNvbnN0IE1BSU5fRUxFTUVOVCA9IFwibWFpblwiO1xuXG4vKipcbiAqIFNldCB0aGUgYWN0aXZlIGxpbmsgc3RhdGUgZm9yIHRoZSBjdXJyZW50bHkgb2JzZXJ2ZWQgc2VjdGlvblxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIEFuIGVsZW1lbnQgd2l0aGluIHRoZSBpbi1wYWdlIG5hdiBjb21wb25lbnRcbiAqL1xuY29uc3Qgc2V0QWN0aXZlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7SU5fUEFHRV9OQVZfTElOS19DTEFTU31gKTtcbiAgZWwubWFwKChpKSA9PiB7XG4gICAgaWYgKGkuaXNJbnRlcnNlY3RpbmcgPT09IHRydWUgJiYgaS5pbnRlcnNlY3Rpb25SYXRpbyA+PSAxKSB7XG4gICAgICBhbGxMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoQ1VSUkVOVF9DTEFTUykpO1xuICAgICAgZG9jdW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYGFbaHJlZj1cIiMke2kudGFyZ2V0LmlkfVwiXWApXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKENVUlJFTlRfQ0xBU1MpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiB0aGUgZGVzaWduYXRlZCBoZWFkaW5nIHR5cGVzIGZvdW5kIGluIHRoZSBkZXNpZ25hdGVkIGNvbnRlbnQgcmVnaW9uLlxuICogVGhyb3cgYW4gZXJyb3IgaWYgYW4gaW52YWxpZCBoZWFkZXIgZWxlbWVudCBpcyBkZXNpZ25hdGVkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNlbGVjdGVkQ29udGVudFJlZ2lvbiBUaGUgY29udGVudCByZWdpb24gdGhlIGNvbXBvbmVudCBzaG91bGQgcHVsbCBoZWFkZXJzIGZyb21cbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RlZEhlYWRpbmdUeXBlcyBUaGUgbGlzdCBvZiBoZWFkaW5nIHR5cGVzIHRoYXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBuYXYgbGlzdFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSAtIEFuIGFycmF5IG9mIGRlc2lnbmF0ZWQgaGVhZGluZyB0eXBlcyBmcm9tIHRoZSBkZXNpZ25hdGVkIGNvbnRlbnQgcmVnaW9uXG4gKi9cbmNvbnN0IGNyZWF0ZVNlY3Rpb25IZWFkaW5nc0FycmF5ID0gKFxuICBzZWxlY3RlZENvbnRlbnRSZWdpb24sXG4gIHNlbGVjdGVkSGVhZGluZ1R5cGVzLFxuKSA9PiB7XG4gIC8vIENvbnZlcnQgZGVzaWduYXRlZCBoZWFkaW5ncyBsaXN0IHRvIGFuIGFycmF5XG4gIGNvbnN0IHNlbGVjdGVkSGVhZGluZ1R5cGVzQXJyYXkgPSBzZWxlY3RlZEhlYWRpbmdUeXBlcy5pbmRleE9mKFwiIFwiKVxuICAgID8gc2VsZWN0ZWRIZWFkaW5nVHlwZXMuc3BsaXQoXCIgXCIpXG4gICAgOiBzZWxlY3RlZEhlYWRpbmdUeXBlcztcbiAgY29uc3QgY29udGVudFJlZ2lvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0ZWRDb250ZW50UmVnaW9uKTtcblxuICBzZWxlY3RlZEhlYWRpbmdUeXBlc0FycmF5LmZvckVhY2goKGhlYWRpbmdUeXBlKSA9PiB7XG4gICAgaWYgKCFJTl9QQUdFX05BVl9WQUxJRF9IRUFESU5HUy5pbmNsdWRlcyhoZWFkaW5nVHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEluLXBhZ2UgbmF2aWdhdGlvbjogZGF0YS1oZWFkaW5nLWVsZW1lbnRzIGF0dHJpYnV0ZSBkZWZpbmVkIHdpdGggYW4gaW52YWxpZCBoZWFkaW5nIHR5cGU6IFwiJHtoZWFkaW5nVHlwZX1cIi5cbiAgICAgICAgRGVmaW5lIHRoZSBhdHRyaWJ1dGUgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nOiBcIiR7SU5fUEFHRV9OQVZfVkFMSURfSEVBRElOR1N9XCIuXG4gICAgICAgIERvIG5vdCB1c2UgY29tbWFzIG9yIG90aGVyIHB1bmN0dWF0aW9uIGluIHRoZSBhdHRyaWJ1dGUgZGVmaW5pdGlvbi5gLFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHNlY3Rpb25IZWFkaW5nc0FycmF5ID0gQXJyYXkuZnJvbShcbiAgICBjb250ZW50UmVnaW9uLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0ZWRIZWFkaW5nVHlwZXNBcnJheSksXG4gICk7XG5cbiAgcmV0dXJuIHNlY3Rpb25IZWFkaW5nc0FycmF5O1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgdGhlIHZpc2libGUgaGVhZGluZ3MgZnJvbSBzZWN0aW9uSGVhZGluZ3NBcnJheS5cbiAqIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBoZWFkaW5ncyB0aGF0IGFyZSBoaWRkZW4gd2l0aCBkaXNwbGF5Om5vbmUgb3IgdmlzaWJpbGl0eTpub25lIHN0eWxlIHJ1bGVzLlxuICogVGhlc2UgaXRlbXMgd2lsbCBiZSBhZGRlZCB0byB0aGUgY29tcG9uZW50IG5hdiBsaXN0LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNlbGVjdGVkQ29udGVudFJlZ2lvbiBUaGUgY29udGVudCByZWdpb24gdGhlIGNvbXBvbmVudCBzaG91bGQgcHVsbCBoZWFkZXJzIGZyb21cbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RlZEhlYWRpbmdUeXBlcyBUaGUgbGlzdCBvZiBoZWFkaW5nIHR5cGVzIHRoYXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBuYXYgbGlzdFxuICpcbiAqIEByZXR1cm4ge0FycmF5fSAtIEFuIGFycmF5IG9mIHZpc2libGUgaGVhZGluZ3MgZnJvbSB0aGUgZGVzaWduYXRlZCBjb250ZW50IHJlZ2lvblxuICovXG5jb25zdCBnZXRWaXNpYmxlU2VjdGlvbkhlYWRpbmdzID0gKFxuICBzZWxlY3RlZENvbnRlbnRSZWdpb24sXG4gIHNlbGVjdGVkSGVhZGluZ1R5cGVzLFxuKSA9PiB7XG4gIGNvbnN0IHNlY3Rpb25IZWFkaW5ncyA9IGNyZWF0ZVNlY3Rpb25IZWFkaW5nc0FycmF5KFxuICAgIHNlbGVjdGVkQ29udGVudFJlZ2lvbixcbiAgICBzZWxlY3RlZEhlYWRpbmdUeXBlcyxcbiAgKTtcblxuICAvLyBGaW5kIGFsbCBoZWFkaW5ncyB3aXRoIGhpZGRlbiBzdHlsaW5nIGFuZCByZW1vdmUgdGhlbSBmcm9tIHRoZSBhcnJheVxuICBjb25zdCB2aXNpYmxlU2VjdGlvbkhlYWRpbmdzID0gc2VjdGlvbkhlYWRpbmdzLmZpbHRlcigoaGVhZGluZykgPT4ge1xuICAgIGNvbnN0IGhlYWRpbmdTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGhlYWRpbmcpO1xuICAgIGNvbnN0IHZpc2libGVIZWFkaW5nID1cbiAgICAgIGhlYWRpbmdTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSAhPT0gXCJub25lXCIgJiZcbiAgICAgIGhlYWRpbmdTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwidmlzaWJpbGl0eVwiKSAhPT0gXCJoaWRkZW5cIjtcblxuICAgIHJldHVybiB2aXNpYmxlSGVhZGluZztcbiAgfSk7XG5cbiAgcmV0dXJuIHZpc2libGVTZWN0aW9uSGVhZGluZ3M7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgaGlnaGVzdC1sZXZlbCBoZWFkZXIgdGFnIGluY2x1ZGVkIGluIHRoZSBsaW5rIGxpc3RcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzZWN0aW9uSGVhZGluZ3MgVGhlIGFycmF5IG9mIGhlYWRpbmdzIHNlbGVjdGVkIGZvciBpbmNsdXNpb24gaW4gdGhlIGxpbmsgbGlzdFxuICpcbiAqIEByZXR1cm4ge3RhZ05hbWV9IC0gVGhlIHRhZyBuYW1lIGZvciB0aGUgaGlnaGVzdCBsZXZlbCBvZiBoZWFkZXIgaW4gdGhlIGxpbmsgbGlzdFxuICovXG5cbmNvbnN0IGdldFRvcExldmVsSGVhZGluZyA9IChzZWN0aW9uSGVhZGluZ3MpID0+IHtcbiAgY29uc3QgdG9wSGVhZGluZyA9IHNlY3Rpb25IZWFkaW5nc1swXS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiB0b3BIZWFkaW5nO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBub2RlIGxpc3Qgb2Ygc2VjdGlvbiBhbmNob3IgdGFnc1xuICpcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzXG4gKi9cbmNvbnN0IGdldFNlY3Rpb25BbmNob3JzID0gKCkgPT4ge1xuICBjb25zdCBzZWN0aW9uQW5jaG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgYC4ke0lOX1BBR0VfTkFWX0FOQ0hPUl9DTEFTU31gLFxuICApO1xuICByZXR1cm4gc2VjdGlvbkFuY2hvcnM7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRCBmb3IgdGhlIGdpdmVuIGhlYWRpbmcgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxIZWFkaW5nRWxlbWVudH0gaGVhZGluZ1xuICpcbiAqIEByZXR1cm4ge3N0cmluZ30gLSBVbmlxdWUgSURcbiAqL1xuY29uc3QgZ2V0SGVhZGluZ0lkID0gKGhlYWRpbmcpID0+IHtcbiAgY29uc3QgYmFzZUlkID0gaGVhZGluZy50ZXh0Q29udGVudFxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLy8gUmVwbGFjZSBub24tYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgd2l0aCBkYXNoZXNcbiAgICAucmVwbGFjZSgvW15hLXpcXGRdL2csIFwiLVwiKVxuICAgIC8vIFJlcGxhY2UgYSBzZXF1ZW5jZSBvZiB0d28gb3IgbW9yZSBkYXNoZXMgd2l0aCBhIHNpbmdsZSBkYXNoXG4gICAgLnJlcGxhY2UoLy17Mix9L2csIFwiLVwiKVxuICAgIC8vIFRyaW0gbGVhZGluZyBvciB0cmFpbGluZyBkYXNoICh0aGVyZSBzaG91bGQgb25seSBldmVyIGJlIG9uZSlcbiAgICAucmVwbGFjZSgvXi18LSQvZywgXCJcIik7XG5cbiAgbGV0IGlkO1xuICBsZXQgc3VmZml4ID0gMDtcbiAgZG8ge1xuICAgIGlkID0gYmFzZUlkO1xuXG4gICAgLy8gVG8gYXZvaWQgY29uZmxpY3RzIHdpdGggZXhpc3RpbmcgSURzIG9uIHRoZSBwYWdlLCBsb29wIGFuZCBhcHBlbmQgYW5cbiAgICAvLyBpbmNyZW1lbnRlZCBzdWZmaXggdW50aWwgYSB1bmlxdWUgSUQgaXMgZm91bmQuXG4gICAgc3VmZml4ICs9IDE7XG4gICAgaWYgKHN1ZmZpeCA+IDEpIHtcbiAgICAgIGlkICs9IGAtJHtzdWZmaXh9YDtcbiAgICB9XG4gIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBzZWN0aW9uIGlkL2FuY2hvciBoYXNoIHdpdGhvdXQgdGhlIG51bWJlciBzaWduXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSAtIElkIHZhbHVlIHdpdGggdGhlIG51bWJlciBzaWduIHJlbW92ZWRcbiAqL1xuY29uc3QgZ2V0U2VjdGlvbklkID0gKHZhbHVlKSA9PiB7XG4gIGxldCBpZDtcblxuICAvLyBDaGVjayBpZiB2YWx1ZSBpcyBhbiBldmVudCBvciBlbGVtZW50IGFuZCBnZXQgdGhlIGNsZWFuZWQgdXAgaWRcbiAgaWYgKHZhbHVlICYmIHZhbHVlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgaWQgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuICB9IGVsc2Uge1xuICAgIGlkID0gdmFsdWUudGFyZ2V0Lmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gaWQ7XG59O1xuXG4vKipcbiAqIFNjcm9sbCBzbW9vdGhseSB0byBhIHNlY3Rpb24gYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gLSBJZCB2YWx1ZSB3aXRoIHRoZSBudW1iZXIgc2lnbiByZW1vdmVkXG4gKi9cbmNvbnN0IGhhbmRsZVNjcm9sbFRvU2VjdGlvbiA9IChlbCkgPT4ge1xuICBjb25zdCBpblBhZ2VOYXZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke0lOX1BBR0VfTkFWX0NMQVNTfWApO1xuICBjb25zdCBpblBhZ2VOYXZTY3JvbGxPZmZzZXQgPVxuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQuc2Nyb2xsT2Zmc2V0IHx8IElOX1BBR0VfTkFWX1NDUk9MTF9PRkZTRVQ7XG5cbiAgd2luZG93LnNjcm9sbCh7XG4gICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgdG9wOiBlbC5vZmZzZXRUb3AgLSBpblBhZ2VOYXZTY3JvbGxPZmZzZXQsXG4gICAgYmxvY2s6IFwic3RhcnRcIixcbiAgfSk7XG5cbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpICE9PSBlbC5pZCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBcIlwiLCBgIyR7ZWwuaWR9YCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2Nyb2xscyB0aGUgcGFnZSB0byB0aGUgc2VjdGlvbiBjb3JyZXNwb25kaW5nIHRvIHRoZSBjdXJyZW50IGhhc2ggZnJhZ21lbnQsIGlmIG9uZSBleGlzdHMuXG4gKi9cbmNvbnN0IHNjcm9sbFRvQ3VycmVudFNlY3Rpb24gPSAoKSA9PiB7XG4gIGNvbnN0IGhhc2hGcmFnbWVudCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICBpZiAoaGFzaEZyYWdtZW50KSB7XG4gICAgY29uc3QgYW5jaG9yVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaEZyYWdtZW50KTtcbiAgICBpZiAoYW5jaG9yVGFnKSB7XG4gICAgICBoYW5kbGVTY3JvbGxUb1NlY3Rpb24oYW5jaG9yVGFnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBpbi1wYWdlIG5hdmlnYXRpb24gY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaW5QYWdlTmF2RWwgVGhlIGluLXBhZ2UgbmF2IGVsZW1lbnRcbiAqL1xuY29uc3QgY3JlYXRlSW5QYWdlTmF2ID0gKGluUGFnZU5hdkVsKSA9PiB7XG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlVGV4dCA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC50aXRsZVRleHQgfHwgSU5fUEFHRV9OQVZfVElUTEVfVEVYVFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2VGl0bGVIZWFkaW5nTGV2ZWwgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGl0bGVIZWFkaW5nTGV2ZWwgfHwgSU5fUEFHRV9OQVZfVElUTEVfSEVBRElOR19MRVZFTFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2Um9vdE1hcmdpbiA9IFNhbml0aXplci5lc2NhcGVIVE1MYCR7XG4gICAgaW5QYWdlTmF2RWwuZGF0YXNldC5yb290TWFyZ2luIHx8IElOX1BBR0VfTkFWX1JPT1RfTUFSR0lOXG4gIH1gO1xuICBjb25zdCBpblBhZ2VOYXZUaHJlc2hvbGQgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQudGhyZXNob2xkIHx8IElOX1BBR0VfTkFWX1RIUkVTSE9MRFxuICB9YDtcbiAgY29uc3QgaW5QYWdlTmF2Q29udGVudFNlbGVjdG9yID0gU2FuaXRpemVyLmVzY2FwZUhUTUxgJHtcbiAgICBpblBhZ2VOYXZFbC5kYXRhc2V0Lm1haW5Db250ZW50U2VsZWN0b3IgfHwgTUFJTl9FTEVNRU5UXG4gIH1gO1xuICBjb25zdCBpblBhZ2VOYXZIZWFkaW5nU2VsZWN0b3IgPSBTYW5pdGl6ZXIuZXNjYXBlSFRNTGAke1xuICAgIGluUGFnZU5hdkVsLmRhdGFzZXQuaGVhZGluZ0VsZW1lbnRzIHx8IElOX1BBR0VfTkFWX0hFQURJTkdTXG4gIH1gO1xuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgcm9vdDogbnVsbCxcbiAgICByb290TWFyZ2luOiBpblBhZ2VOYXZSb290TWFyZ2luLFxuICAgIHRocmVzaG9sZDogW2luUGFnZU5hdlRocmVzaG9sZF0sXG4gIH07XG5cbiAgY29uc3Qgc2VjdGlvbkhlYWRpbmdzID0gZ2V0VmlzaWJsZVNlY3Rpb25IZWFkaW5ncyhcbiAgICBpblBhZ2VOYXZDb250ZW50U2VsZWN0b3IsXG4gICAgaW5QYWdlTmF2SGVhZGluZ1NlbGVjdG9yLFxuICApO1xuICBjb25zdCBpblBhZ2VOYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICBpblBhZ2VOYXYuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpblBhZ2VOYXZUaXRsZVRleHQpO1xuICBpblBhZ2VOYXYuY2xhc3NMaXN0LmFkZChJTl9QQUdFX05BVl9OQVZfQ0xBU1MpO1xuXG4gIGNvbnN0IGluUGFnZU5hdlRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpblBhZ2VOYXZUaXRsZUhlYWRpbmdMZXZlbCk7XG4gIGluUGFnZU5hdlRpdGxlLmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfVElUTEVfQ0xBU1MpO1xuICBpblBhZ2VOYXZUaXRsZS5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIGluUGFnZU5hdlRpdGxlLnRleHRDb250ZW50ID0gaW5QYWdlTmF2VGl0bGVUZXh0O1xuICBpblBhZ2VOYXYuYXBwZW5kQ2hpbGQoaW5QYWdlTmF2VGl0bGUpO1xuXG4gIGNvbnN0IGluUGFnZU5hdkxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIGluUGFnZU5hdkxpc3QuY2xhc3NMaXN0LmFkZChJTl9QQUdFX05BVl9MSVNUX0NMQVNTKTtcbiAgaW5QYWdlTmF2LmFwcGVuZENoaWxkKGluUGFnZU5hdkxpc3QpO1xuXG4gIHNlY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgYW5jaG9yVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgY29uc3QgdGV4dENvbnRlbnRPZkxpbmsgPSBlbC50ZXh0Q29udGVudDtcbiAgICBjb25zdCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdG9wSGVhZGluZ0xldmVsID0gZ2V0VG9wTGV2ZWxIZWFkaW5nKHNlY3Rpb25IZWFkaW5ncyk7XG4gICAgY29uc3QgaGVhZGluZ0lkID0gZ2V0SGVhZGluZ0lkKGVsKTtcblxuICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfSVRFTV9DTEFTUyk7XG5cbiAgICBpZiAodGFnID09PSB0b3BIZWFkaW5nTGV2ZWwpIHtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoSU5fUEFHRV9OQVZfUFJJTUFSWV9JVEVNX0NMQVNTKTtcbiAgICB9XG5cbiAgICBuYXZMaW5rcy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGAjJHtoZWFkaW5nSWR9YCk7XG4gICAgbmF2TGlua3Muc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgSU5fUEFHRV9OQVZfTElOS19DTEFTUyk7XG4gICAgbmF2TGlua3MudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudE9mTGluaztcblxuICAgIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBoZWFkaW5nSWQpO1xuICAgIGFuY2hvclRhZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBJTl9QQUdFX05BVl9BTkNIT1JfQ0xBU1MpO1xuICAgIGVsLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgYW5jaG9yVGFnKTtcblxuICAgIGluUGFnZU5hdkxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKG5hdkxpbmtzKTtcbiAgfSk7XG5cbiAgaW5QYWdlTmF2RWwuYXBwZW5kQ2hpbGQoaW5QYWdlTmF2KTtcblxuICBjb25zdCBhbmNob3JUYWdzID0gZ2V0U2VjdGlvbkFuY2hvcnMoKTtcbiAgY29uc3Qgb2JzZXJ2ZVNlY3Rpb25zID0gbmV3IHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcihzZXRBY3RpdmUsIG9wdGlvbnMpO1xuXG4gIGFuY2hvclRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgb2JzZXJ2ZVNlY3Rpb25zLm9ic2VydmUodGFnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBjbGljayBmcm9tIGxpbmtcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCBBbiBlbGVtZW50IHdpdGhpbiB0aGUgaW4tcGFnZSBuYXYgY29tcG9uZW50XG4gKi9cbmNvbnN0IGhhbmRsZUNsaWNrRnJvbUxpbmsgPSAoZWwpID0+IHtcbiAgY29uc3QgZWxlbWVudFRvU2Nyb2xsVG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbC5oYXNoLnNsaWNlKDEpKTtcbiAgaGFuZGxlU2Nyb2xsVG9TZWN0aW9uKGVsZW1lbnRUb1Njcm9sbFRvKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIHRoZSBlbnRlciBldmVudCBmcm9tIGEgbGluayB3aXRoaW4gdGhlIGluLXBhZ2UgbmF2IGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgQW4gZXZlbnQgd2l0aGluIHRoZSBpbi1wYWdlIG5hdiBjb21wb25lbnRcbiAqL1xuY29uc3QgaGFuZGxlRW50ZXJGcm9tTGluayA9IChldmVudCkgPT4ge1xuICBjb25zdCBpZCA9IGdldFNlY3Rpb25JZChldmVudCk7XG4gIGNvbnN0IHRhcmdldEFuY2hvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0QW5jaG9yLnBhcmVudEVsZW1lbnQ7XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAwKTtcbiAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiYmx1clwiLFxuICAgICAgb25jZSgoKSA9PiB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIHRocm93IGFuIGVycm9yP1xuICB9XG4gIGhhbmRsZVNjcm9sbFRvU2VjdGlvbih0YXJnZXRBbmNob3IpO1xufTtcblxuY29uc3QgaW5QYWdlTmF2aWdhdGlvbiA9IGJlaGF2aW9yKFxuICB7XG4gICAgW0NMSUNLXToge1xuICAgICAgW2AuJHtJTl9QQUdFX05BVl9MSU5LX0NMQVNTfWBdKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGhhbmRsZUNsaWNrRnJvbUxpbmsodGhpcyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW2AuJHtJTl9QQUdFX05BVl9MSU5LX0NMQVNTfWBdOiBrZXltYXAoe1xuICAgICAgICBFbnRlcjogaGFuZGxlRW50ZXJGcm9tTGluayxcbiAgICAgIH0pLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhgLiR7SU5fUEFHRV9OQVZfQ0xBU1N9YCwgcm9vdCkuZm9yRWFjaCgoaW5QYWdlTmF2RWwpID0+IHtcbiAgICAgICAgY3JlYXRlSW5QYWdlTmF2KGluUGFnZU5hdkVsKTtcbiAgICAgICAgc2Nyb2xsVG9DdXJyZW50U2VjdGlvbigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5QYWdlTmF2aWdhdGlvbjtcbiIsImNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTUFTS0VEX0NMQVNTID0gYCR7UFJFRklYfS1tYXNrZWRgO1xuY29uc3QgTUFTS0VEID0gYC4ke01BU0tFRF9DTEFTU31gO1xuY29uc3QgTUFTSyA9IGAke1BSRUZJWH0taW5wdXQtbWFza2A7XG5jb25zdCBNQVNLX0NPTlRFTlQgPSBgJHtNQVNLfS0tY29udGVudGA7XG5jb25zdCBQTEFDRUhPTERFUiA9IFwicGxhY2Vob2xkZXJcIjtcblxuLy8gVXNlciBkZWZpbmVkIFZhbHVlc1xuY29uc3QgbWFza2VkTnVtYmVyID0gXCJfI2REbU15WTlcIjtcbmNvbnN0IG1hc2tlZExldHRlciA9IFwiQVwiO1xuXG4vLyByZXBsYWNlcyBlYWNoIG1hc2tlZCBpbnB1dCB3aXRoIGEgc2hlbGwgY29udGFpbmluZyB0aGUgaW5wdXQgYW5kIGl0J3MgbWFzay5cbmNvbnN0IGNyZWF0ZU1hc2tlZElucHV0U2hlbGwgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgcGxhY2Vob2xkZXIgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoYCR7UExBQ0VIT0xERVJ9YCk7XG4gIGlmIChwbGFjZWhvbGRlcikge1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBwbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtcGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXIpO1xuICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZShgJHtQTEFDRUhPTERFUn1gKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzaGVsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBzaGVsbC5jbGFzc0xpc3QuYWRkKE1BU0spO1xuICBzaGVsbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1hc2tcIiwgcGxhY2Vob2xkZXIpO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29udGVudC5jbGFzc0xpc3QuYWRkKE1BU0tfQ09OVEVOVCk7XG4gIGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICBjb250ZW50LmlkID0gYCR7aW5wdXQuaWR9TWFza2A7XG4gIGNvbnRlbnQudGV4dENvbnRlbnQgPSBwbGFjZWhvbGRlcjtcblxuICBzaGVsbC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgaW5wdXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2hlbGwsIGlucHV0KTtcbiAgc2hlbGwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xufTtcblxuY29uc3Qgc2V0VmFsdWVPZk1hc2sgPSAoZWwpID0+IHtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gZWw7XG4gIGNvbnN0IHBsYWNlaG9sZGVyVmFsID0gYCR7ZWwuZGF0YXNldC5wbGFjZWhvbGRlci5zdWJzdHIodmFsdWUubGVuZ3RoKX1gO1xuXG4gIGNvbnN0IHRoZUlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICB0aGVJRWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIFt0aGVJRWwsIHBsYWNlaG9sZGVyVmFsXTtcbn07XG5cbmNvbnN0IHN0cmlwcGVkVmFsdWUgPSAoaXNDaGFyc2V0UHJlc2VudCwgdmFsdWUpID0+XG4gIGlzQ2hhcnNldFByZXNlbnQgPyB2YWx1ZS5yZXBsYWNlKC9cXFcvZywgXCJcIikgOiB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG5cbmNvbnN0IGlzSW50ZWdlciA9ICh2YWx1ZSkgPT4gIU51bWJlci5pc05hTihwYXJzZUludCh2YWx1ZSwgMTApKTtcblxuY29uc3QgaXNMZXR0ZXIgPSAodmFsdWUpID0+ICh2YWx1ZSA/IHZhbHVlLm1hdGNoKC9bQS1aXS9pKSA6IGZhbHNlKTtcblxuY29uc3QgaGFuZGxlQ3VycmVudFZhbHVlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGlzQ2hhcnNldFByZXNlbnQgPSBlbC5kYXRhc2V0LmNoYXJzZXQ7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gaXNDaGFyc2V0UHJlc2VudCB8fCBlbC5kYXRhc2V0LnBsYWNlaG9sZGVyO1xuICBjb25zdCB7IHZhbHVlIH0gPSBlbDtcbiAgY29uc3QgbGVuID0gcGxhY2Vob2xkZXIubGVuZ3RoO1xuICBsZXQgbmV3VmFsdWUgPSBcIlwiO1xuICBsZXQgaTtcbiAgbGV0IGNoYXJJbmRleDtcblxuICBjb25zdCBzdHJpcHBlZFZhbCA9IHN0cmlwcGVkVmFsdWUoaXNDaGFyc2V0UHJlc2VudCwgdmFsdWUpO1xuXG4gIGZvciAoaSA9IDAsIGNoYXJJbmRleCA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgIGNvbnN0IGlzSW50ID0gaXNJbnRlZ2VyKHN0cmlwcGVkVmFsW2NoYXJJbmRleF0pO1xuICAgIGNvbnN0IGlzTGV0ID0gaXNMZXR0ZXIoc3RyaXBwZWRWYWxbY2hhckluZGV4XSk7XG4gICAgY29uc3QgbWF0Y2hlc051bWJlciA9IG1hc2tlZE51bWJlci5pbmRleE9mKHBsYWNlaG9sZGVyW2ldKSA+PSAwO1xuICAgIGNvbnN0IG1hdGNoZXNMZXR0ZXIgPSBtYXNrZWRMZXR0ZXIuaW5kZXhPZihwbGFjZWhvbGRlcltpXSkgPj0gMDtcblxuICAgIGlmIChcbiAgICAgIChtYXRjaGVzTnVtYmVyICYmIGlzSW50KSB8fFxuICAgICAgKGlzQ2hhcnNldFByZXNlbnQgJiYgbWF0Y2hlc0xldHRlciAmJiBpc0xldClcbiAgICApIHtcbiAgICAgIG5ld1ZhbHVlICs9IHN0cmlwcGVkVmFsW2NoYXJJbmRleF07XG4gICAgICBjaGFySW5kZXggKz0gMTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKCFpc0NoYXJzZXRQcmVzZW50ICYmICFpc0ludCAmJiBtYXRjaGVzTnVtYmVyKSB8fFxuICAgICAgKGlzQ2hhcnNldFByZXNlbnQgJiZcbiAgICAgICAgKChtYXRjaGVzTGV0dGVyICYmICFpc0xldCkgfHwgKG1hdGNoZXNOdW1iZXIgJiYgIWlzSW50KSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlICs9IHBsYWNlaG9sZGVyW2ldO1xuICAgIH1cbiAgICAvLyBicmVhayBpZiBubyBjaGFyYWN0ZXJzIGxlZnQgYW5kIHRoZSBwYXR0ZXJuIGlzIG5vbi1zcGVjaWFsIGNoYXJhY3RlclxuICAgIGlmIChzdHJpcHBlZFZhbFtjaGFySW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdWYWx1ZTtcbn07XG5cbmNvbnN0IGhhbmRsZVZhbHVlQ2hhbmdlID0gKGVsKSA9PiB7XG4gIGNvbnN0IGlucHV0RWwgPSBlbDtcbiAgY29uc3QgaWQgPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICBpbnB1dEVsLnZhbHVlID0gaGFuZGxlQ3VycmVudFZhbHVlKGlucHV0RWwpO1xuXG4gIGNvbnN0IG1hc2tWYWwgPSBzZXRWYWx1ZU9mTWFzayhlbCk7XG4gIGNvbnN0IG1hc2tFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2lkfU1hc2tgKTtcbiAgbWFza0VsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgbWFza0VsLnJlcGxhY2VDaGlsZHJlbihtYXNrVmFsWzBdLCBtYXNrVmFsWzFdKTtcbn07XG5cbmNvbnN0IGlucHV0TWFza0V2ZW50cyA9IHtcbiAga2V5dXA6IHtcbiAgICBbTUFTS0VEXSgpIHtcbiAgICAgIGhhbmRsZVZhbHVlQ2hhbmdlKHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBpbnB1dE1hc2sgPSBiZWhhdmlvcihpbnB1dE1hc2tFdmVudHMsIHtcbiAgaW5pdChyb290KSB7XG4gICAgc2VsZWN0T3JNYXRjaGVzKE1BU0tFRCwgcm9vdCkuZm9yRWFjaCgobWFza2VkSW5wdXQpID0+IHtcbiAgICAgIGNyZWF0ZU1hc2tlZElucHV0U2hlbGwobWFza2VkSW5wdXQpO1xuICAgIH0pO1xuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXRNYXNrO1xuIiwiY29uc3Qga2V5bWFwID0gcmVxdWlyZShcInJlY2VwdG9yL2tleW1hcFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgdG9nZ2xlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3RvZ2dsZVwiKTtcbmNvbnN0IEZvY3VzVHJhcCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9mb2N1cy10cmFwXCIpO1xuY29uc3QgYWNjb3JkaW9uID0gcmVxdWlyZShcIi4uLy4uL3VzYS1hY2NvcmRpb24vc3JjL2luZGV4XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgQk9EWSA9IFwiYm9keVwiO1xuY29uc3QgTEFOR1VBR0UgPSBgLiR7UFJFRklYfS1sYW5ndWFnZWA7XG5jb25zdCBMQU5HVUFHRV9TVUIgPSBgLiR7UFJFRklYfS1sYW5ndWFnZV9fc3VibWVudWA7XG5jb25zdCBMQU5HVUFHRV9QUklNQVJZID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VfX3ByaW1hcnlgO1xuY29uc3QgTEFOR1VBR0VfUFJJTUFSWV9JVEVNID0gYC4ke1BSRUZJWH0tbGFuZ3VhZ2VfX3ByaW1hcnktaXRlbWA7XG5jb25zdCBMQU5HVUFHRV9DT05UUk9MID0gYGJ1dHRvbi4ke1BSRUZJWH0tbGFuZ3VhZ2VfX2xpbmtgO1xuY29uc3QgTEFOR1VBR0VfTElOS1MgPSBgJHtMQU5HVUFHRX0gYWA7XG5cbmxldCBsYW5ndWFnZVNlbGVjdG9yO1xubGV0IGxhbmd1YWdlQWN0aXZlO1xuXG5jb25zdCBvbkxhbmd1YWdlQ2xvc2UgPSAoKSA9PlxuICBsYW5ndWFnZVNlbGVjdG9yLnRvZ2dsZUxhbmd1YWdlLmNhbGwobGFuZ3VhZ2VTZWxlY3RvciwgZmFsc2UpO1xuXG5jb25zdCBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93biA9ICgpID0+IHtcbiAgaWYgKCFsYW5ndWFnZUFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRvZ2dsZShsYW5ndWFnZUFjdGl2ZSwgZmFsc2UpO1xuICBsYW5ndWFnZUFjdGl2ZSA9IG51bGw7XG59O1xuXG5jb25zdCBmb2N1c0xhbmd1YWdlQnV0dG9uID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBhcmVudExhbmd1YWdlSXRlbSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KExBTkdVQUdFX1BSSU1BUllfSVRFTSk7XG5cbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhMQU5HVUFHRV9DT05UUk9MKSkge1xuICAgIHBhcmVudExhbmd1YWdlSXRlbS5xdWVyeVNlbGVjdG9yKExBTkdVQUdFX0NPTlRST0wpLmZvY3VzKCk7XG4gIH1cbn07XG5cbmNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudCkgPT4ge1xuICBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93bigpO1xuICBmb2N1c0xhbmd1YWdlQnV0dG9uKGV2ZW50KTtcbn07XG5cbmxhbmd1YWdlU2VsZWN0b3IgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtMQU5HVUFHRV9DT05UUk9MXSgpIHtcbiAgICAgICAgaWYgKGxhbmd1YWdlQWN0aXZlICE9PSB0aGlzKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFuZ3VhZ2VBY3RpdmUgPT09IHRoaXMpIHtcbiAgICAgICAgICBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93bigpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxhbmd1YWdlQWN0aXZlKSB7XG4gICAgICAgICAgbGFuZ3VhZ2VBY3RpdmUgPSB0aGlzO1xuICAgICAgICAgIHRvZ2dsZShsYW5ndWFnZUFjdGl2ZSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgW0JPRFldOiBoaWRlQWN0aXZlTGFuZ3VhZ2VEcm9wZG93bixcbiAgICAgIFtMQU5HVUFHRV9MSU5LU10oKSB7XG4gICAgICAgIGNvbnN0IGFjYyA9IHRoaXMuY2xvc2VzdChhY2NvcmRpb24uQUNDT1JESU9OKTtcblxuICAgICAgICBpZiAoYWNjKSB7XG4gICAgICAgICAgYWNjb3JkaW9uLmdldEJ1dHRvbnMoYWNjKS5mb3JFYWNoKChidG4pID0+IGFjY29yZGlvbi5oaWRlKGJ0bikpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAga2V5ZG93bjoge1xuICAgICAgW0xBTkdVQUdFX1BSSU1BUlldOiBrZXltYXAoeyBFc2NhcGU6IGhhbmRsZUVzY2FwZSB9KSxcbiAgICB9LFxuICAgIGZvY3Vzb3V0OiB7XG4gICAgICBbTEFOR1VBR0VfUFJJTUFSWV0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBldmVudC50YXJnZXQuY2xvc2VzdChMQU5HVUFHRV9QUklNQVJZKTtcblxuICAgICAgICBpZiAoIWxhbmd1YWdlLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgaGlkZUFjdGl2ZUxhbmd1YWdlRHJvcGRvd24oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBjb25zdCB0cmFwQ29udGFpbmVyID0gcm9vdC5tYXRjaGVzKExBTkdVQUdFX1NVQilcbiAgICAgICAgPyByb290XG4gICAgICAgIDogcm9vdC5xdWVyeVNlbGVjdG9yKExBTkdVQUdFX1NVQik7XG5cbiAgICAgIGlmICh0cmFwQ29udGFpbmVyKSB7XG4gICAgICAgIGxhbmd1YWdlU2VsZWN0b3IuZm9jdXNUcmFwID0gRm9jdXNUcmFwKHRyYXBDb250YWluZXIsIHtcbiAgICAgICAgICBFc2NhcGU6IG9uTGFuZ3VhZ2VDbG9zZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICB0ZWFyZG93bigpIHtcbiAgICAgIGxhbmd1YWdlQWN0aXZlID0gZmFsc2U7XG4gICAgfSxcbiAgICBmb2N1c1RyYXA6IG51bGwsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxhbmd1YWdlU2VsZWN0b3I7XG4iLCJjb25zdCBzZWxlY3RPck1hdGNoZXMgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0LW9yLW1hdGNoZXNcIik7XG5jb25zdCBGb2N1c1RyYXAgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvZm9jdXMtdHJhcFwiKTtcbmNvbnN0IFNjcm9sbEJhcldpZHRoID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3Njcm9sbGJhci13aWR0aFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuXG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuXG5jb25zdCBNT0RBTF9DTEFTU05BTUUgPSBgJHtQUkVGSVh9LW1vZGFsYDtcbmNvbnN0IE9WRVJMQVlfQ0xBU1NOQU1FID0gYCR7TU9EQUxfQ0xBU1NOQU1FfS1vdmVybGF5YDtcbmNvbnN0IFdSQVBQRVJfQ0xBU1NOQU1FID0gYCR7TU9EQUxfQ0xBU1NOQU1FfS13cmFwcGVyYDtcbmNvbnN0IE9QRU5FUl9BVFRSSUJVVEUgPSBcImRhdGEtb3Blbi1tb2RhbFwiO1xuY29uc3QgQ0xPU0VSX0FUVFJJQlVURSA9IFwiZGF0YS1jbG9zZS1tb2RhbFwiO1xuY29uc3QgRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSA9IFwiZGF0YS1mb3JjZS1hY3Rpb25cIjtcbmNvbnN0IE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFID0gYGRhdGEtbW9kYWwtaGlkZGVuYDtcbmNvbnN0IE1PREFMID0gYC4ke01PREFMX0NMQVNTTkFNRX1gO1xuY29uc3QgSU5JVElBTF9GT0NVUyA9IGAuJHtXUkFQUEVSX0NMQVNTTkFNRX0gKltkYXRhLWZvY3VzXWA7XG5jb25zdCBDTE9TRV9CVVRUT04gPSBgJHtXUkFQUEVSX0NMQVNTTkFNRX0gKlske0NMT1NFUl9BVFRSSUJVVEV9XWA7XG5jb25zdCBPUEVORVJTID0gYCpbJHtPUEVORVJfQVRUUklCVVRFfV1bYXJpYS1jb250cm9sc11gO1xuY29uc3QgQ0xPU0VSUyA9IGAke0NMT1NFX0JVVFRPTn0sIC4ke09WRVJMQVlfQ0xBU1NOQU1FfTpub3QoWyR7Rk9SQ0VfQUNUSU9OX0FUVFJJQlVURX1dKWA7XG5jb25zdCBOT05fTU9EQUxTID0gYGJvZHkgPiAqOm5vdCguJHtXUkFQUEVSX0NMQVNTTkFNRX0pOm5vdChbYXJpYS1oaWRkZW5dKWA7XG5jb25zdCBOT05fTU9EQUxTX0hJRERFTiA9IGBbJHtOT05fTU9EQUxfSElEREVOX0FUVFJJQlVURX1dYDtcblxuY29uc3QgQUNUSVZFX0NMQVNTID0gXCJ1c2EtanMtbW9kYWwtLWFjdGl2ZVwiO1xuY29uc3QgUFJFVkVOVF9DTElDS19DTEFTUyA9IFwidXNhLWpzLW5vLWNsaWNrXCI7XG5jb25zdCBWSVNJQkxFX0NMQVNTID0gXCJpcy12aXNpYmxlXCI7XG5jb25zdCBISURERU5fQ0xBU1MgPSBcImlzLWhpZGRlblwiO1xuXG5sZXQgbW9kYWw7XG5sZXQgSU5JVElBTF9CT0RZX1BBRERJTkc7XG5sZXQgVEVNUE9SQVJZX0JPRFlfUEFERElORztcblxuY29uc3QgaXNBY3RpdmUgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhBQ1RJVkVfQ0xBU1MpO1xuY29uc3QgU0NST0xMQkFSX1dJRFRIID0gU2Nyb2xsQmFyV2lkdGgoKTtcblxuLyoqXG4gKiAgQ2xvc2VzIG1vZGFsIHdoZW4gYm91bmQgdG8gYSBidXR0b24gYW5kIHByZXNzZWQuXG4gKi9cbmNvbnN0IG9uTWVudUNsb3NlID0gKCkgPT4ge1xuICBtb2RhbC50b2dnbGVNb2RhbC5jYWxsKG1vZGFsLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgdmFsdWUgZm9yIHRlbXBvcmFyeSBib2R5IHBhZGRpbmcgdGhhdCB3aWxsIGJlIGFwcGxpZWQgd2hlbiB0aGUgbW9kYWwgaXMgb3Blbi5cbiAqIFZhbHVlIGlzIGNyZWF0ZWQgYnkgY2hlY2tpbmcgZm9yIGluaXRpYWwgYm9keSBwYWRkaW5nIGFuZCBhZGRpbmcgdGhlIHdpZHRoIG9mIHRoZSBzY3JvbGxiYXIuXG4gKi9cbmNvbnN0IHNldFRlbXBvcmFyeUJvZHlQYWRkaW5nID0gKCkgPT4ge1xuICBJTklUSUFMX0JPRFlfUEFERElORyA9IHdpbmRvd1xuICAgIC5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gICAgLmdldFByb3BlcnR5VmFsdWUoXCJwYWRkaW5nLXJpZ2h0XCIpO1xuICBURU1QT1JBUllfQk9EWV9QQURESU5HID0gYCR7XG4gICAgcGFyc2VJbnQoSU5JVElBTF9CT0RZX1BBRERJTkcucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApICtcbiAgICBwYXJzZUludChTQ1JPTExCQVJfV0lEVEgucmVwbGFjZSgvcHgvLCBcIlwiKSwgMTApXG4gIH1weGA7XG59O1xuXG4vKipcbiAqICBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgYSBtb2RhbCB3aW5kb3dcbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IHRoZSBrZXlkb3duIGV2ZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IHNhZmVBY3RpdmUgaWYgbW9iaWxlIGlzIG9wZW4uXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZU1vZGFsKGV2ZW50KSB7XG4gIGxldCBvcmlnaW5hbE9wZW5lcjtcbiAgbGV0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCB7IGJvZHkgfSA9IGRvY3VtZW50O1xuICBjb25zdCBzYWZlQWN0aXZlID0gIWlzQWN0aXZlKCk7XG4gIGNvbnN0IG1vZGFsSWQgPSBjbGlja2VkRWxlbWVudFxuICAgID8gY2xpY2tlZEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7V1JBUFBFUl9DTEFTU05BTUV9LiR7VklTSUJMRV9DTEFTU31gKTtcbiAgY29uc3QgdGFyZ2V0TW9kYWwgPSBzYWZlQWN0aXZlXG4gICAgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKVxuICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7V1JBUFBFUl9DTEFTU05BTUV9LiR7VklTSUJMRV9DTEFTU31gKTtcblxuICAvLyBpZiB0aGVyZSBpcyBubyBtb2RhbCB3ZSByZXR1cm4gZWFybHlcbiAgaWYgKCF0YXJnZXRNb2RhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IG9wZW5Gb2N1c0VsID0gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihJTklUSUFMX0ZPQ1VTKVxuICAgID8gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihJTklUSUFMX0ZPQ1VTKVxuICAgIDogdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihgLiR7TU9EQUxfQ0xBU1NOQU1FfWApO1xuICBjb25zdCByZXR1cm5Gb2N1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIHRhcmdldE1vZGFsLmdldEF0dHJpYnV0ZShcImRhdGEtb3BlbmVyXCIpLFxuICApO1xuICBjb25zdCBtZW51QnV0dG9uID0gYm9keS5xdWVyeVNlbGVjdG9yKE9QRU5FUlMpO1xuICBjb25zdCBmb3JjZVVzZXJBY3Rpb24gPSB0YXJnZXRNb2RhbC5nZXRBdHRyaWJ1dGUoRk9SQ0VfQUNUSU9OX0FUVFJJQlVURSk7XG5cbiAgLy8gU2V0cyB0aGUgY2xpY2tlZCBlbGVtZW50IHRvIHRoZSBjbG9zZSBidXR0b25cbiAgLy8gc28gZXNjIGtleSBhbHdheXMgY2xvc2VzIG1vZGFsXG4gIGlmIChldmVudC50eXBlID09PSBcImtleWRvd25cIiAmJiB0YXJnZXRNb2RhbCAhPT0gbnVsbCkge1xuICAgIGNsaWNrZWRFbGVtZW50ID0gdGFyZ2V0TW9kYWwucXVlcnlTZWxlY3RvcihDTE9TRV9CVVRUT04pO1xuICB9XG5cbiAgLy8gV2hlbiB3ZSdyZSBub3QgaGl0dGluZyB0aGUgZXNjYXBlIGtleeKAplxuICBpZiAoY2xpY2tlZEVsZW1lbnQpIHtcbiAgICAvLyBNYWtlIHN1cmUgd2UgY2xpY2sgdGhlIG9wZW5lclxuICAgIC8vIElmIGl0IGRvZXNuJ3QgaGF2ZSBhbiBJRCwgbWFrZSBvbmVcbiAgICAvLyBTdG9yZSBpZCBhcyBkYXRhIGF0dHJpYnV0ZSBvbiBtb2RhbFxuICAgIGlmIChjbGlja2VkRWxlbWVudC5oYXNBdHRyaWJ1dGUoT1BFTkVSX0FUVFJJQlVURSkpIHtcbiAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBudWxsKSB7XG4gICAgICAgIG9yaWdpbmFsT3BlbmVyID0gYG1vZGFsLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwMH1gO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImlkXCIsIG9yaWdpbmFsT3BlbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9yaWdpbmFsT3BlbmVyID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgIH1cbiAgICAgIHRhcmdldE1vZGFsLnNldEF0dHJpYnV0ZShcImRhdGEtb3BlbmVyXCIsIG9yaWdpbmFsT3BlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGJhc2ljYWxseSBzdG9wcyB0aGUgcHJvcGFnYXRpb24gaWYgdGhlIGVsZW1lbnRcbiAgICAvLyBpcyBpbnNpZGUgdGhlIG1vZGFsIGFuZCBub3QgYSBjbG9zZSBidXR0b24gb3JcbiAgICAvLyBlbGVtZW50IGluc2lkZSBhIGNsb3NlIGJ1dHRvblxuICAgIGlmIChjbGlja2VkRWxlbWVudC5jbG9zZXN0KGAuJHtNT0RBTF9DTEFTU05BTUV9YCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2xpY2tlZEVsZW1lbnQuaGFzQXR0cmlidXRlKENMT1NFUl9BVFRSSUJVVEUpIHx8XG4gICAgICAgIGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoYFske0NMT1NFUl9BVFRSSUJVVEV9XWApXG4gICAgICApIHtcbiAgICAgICAgLy8gZG8gbm90aGluZy4gbW92ZSBvbi5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBib2R5LmNsYXNzTGlzdC50b2dnbGUoQUNUSVZFX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgdGFyZ2V0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShWSVNJQkxFX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgdGFyZ2V0TW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShISURERU5fQ0xBU1MsICFzYWZlQWN0aXZlKTtcblxuICAvLyBJZiB1c2VyIGlzIGZvcmNlZCB0byB0YWtlIGFuIGFjdGlvbiwgYWRkaW5nXG4gIC8vIGEgY2xhc3MgdG8gdGhlIGJvZHkgdGhhdCBwcmV2ZW50cyBjbGlja2luZyB1bmRlcm5lYXRoXG4gIC8vIG92ZXJsYXlcbiAgaWYgKGZvcmNlVXNlckFjdGlvbikge1xuICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZShQUkVWRU5UX0NMSUNLX0NMQVNTLCBzYWZlQWN0aXZlKTtcbiAgfVxuXG4gIC8vIFRlbXBvcmFyaWx5IGluY3JlYXNlIGJvZHkgcGFkZGluZyB0byBpbmNsdWRlIHRoZSB3aWR0aCBvZiB0aGUgc2Nyb2xsYmFyLlxuICAvLyBUaGlzIGFjY291bnRzIGZvciB0aGUgY29udGVudCBzaGlmdCB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgcmVtb3ZlZCBvbiBtb2RhbCBvcGVuLlxuICBpZiAoYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPT09IFRFTVBPUkFSWV9CT0RZX1BBRERJTkcpIHtcbiAgICBib2R5LnN0eWxlLnJlbW92ZVByb3BlcnR5KFwicGFkZGluZy1yaWdodFwiKTtcbiAgfSBlbHNlIHtcbiAgICBib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IFRFTVBPUkFSWV9CT0RZX1BBRERJTkc7XG4gIH1cblxuICAvLyBIYW5kbGUgdGhlIGZvY3VzIGFjdGlvbnNcbiAgaWYgKHNhZmVBY3RpdmUgJiYgb3BlbkZvY3VzRWwpIHtcbiAgICAvLyBUaGUgbW9kYWwgd2luZG93IGlzIG9wZW5lZC4gRm9jdXMgaXMgc2V0IHRvIGNsb3NlIGJ1dHRvbi5cblxuICAgIC8vIEJpbmRzIGVzY2FwZSBrZXkgaWYgd2UncmUgbm90IGZvcmNpbmdcbiAgICAvLyB0aGUgdXNlciB0byB0YWtlIGFuIGFjdGlvblxuICAgIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZGFsLmZvY3VzVHJhcCA9IEZvY3VzVHJhcCh0YXJnZXRNb2RhbCwge1xuICAgICAgICBFc2NhcGU6IG9uTWVudUNsb3NlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlcyBmb2N1cyBzZXR0aW5nIGFuZCBpbnRlcmFjdGlvbnNcbiAgICBtb2RhbC5mb2N1c1RyYXAudXBkYXRlKHNhZmVBY3RpdmUpO1xuICAgIG9wZW5Gb2N1c0VsLmZvY3VzKCk7XG5cbiAgICAvLyBIaWRlcyBldmVyeXRoaW5nIHRoYXQgaXMgbm90IHRoZSBtb2RhbCBmcm9tIHNjcmVlbiByZWFkZXJzXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChOT05fTU9EQUxTKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICAgICAgbm9uTW9kYWwuc2V0QXR0cmlidXRlKE5PTl9NT0RBTF9ISURERU5fQVRUUklCVVRFLCBcIlwiKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghc2FmZUFjdGl2ZSAmJiBtZW51QnV0dG9uICYmIHJldHVybkZvY3VzKSB7XG4gICAgLy8gVGhlIG1vZGFsIHdpbmRvdyBpcyBjbG9zZWQuXG4gICAgLy8gTm9uLW1vZGFscyBub3cgYWNjZXNpYmxlIHRvIHNjcmVlbiByZWFkZXJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE5PTl9NT0RBTFNfSElEREVOKS5mb3JFYWNoKChub25Nb2RhbCkgPT4ge1xuICAgICAgbm9uTW9kYWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG4gICAgICBub25Nb2RhbC5yZW1vdmVBdHRyaWJ1dGUoTk9OX01PREFMX0hJRERFTl9BVFRSSUJVVEUpO1xuICAgIH0pO1xuXG4gICAgLy8gRm9jdXMgaXMgcmV0dXJuZWQgdG8gdGhlIG9wZW5lclxuICAgIHJldHVybkZvY3VzLmZvY3VzKCk7XG4gICAgbW9kYWwuZm9jdXNUcmFwLnVwZGF0ZShzYWZlQWN0aXZlKTtcbiAgfVxuXG4gIHJldHVybiBzYWZlQWN0aXZlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGFjZWhvbGRlciB3aXRoIGRhdGEgYXR0cmlidXRlcyBmb3IgY2xlYW51cCBmdW5jdGlvbi5cbiAqIFRoZSBjbGVhbnVwIGZ1bmN0aW9uIHVzZXMgdGhpcyBwbGFjZWhvbGRlciB0byBlYXNpbHkgcmVzdG9yZSB0aGUgb3JpZ2luYWwgTW9kYWwgSFRNTCBvbiB0ZWFyZG93bi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBiYXNlQ29tcG9uZW50IC0gTW9kYWwgSFRNTCBmcm9tIHRoZSBET00uXG4gKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9IFBsYWNlaG9sZGVyIHVzZWQgZm9yIGNsZWFudXAgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGNyZWF0ZVBsYWNlSG9sZGVyID0gKGJhc2VDb21wb25lbnQpID0+IHtcbiAgY29uc3QgbW9kYWxJRCA9IGJhc2VDb21wb25lbnQuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gIGNvbnN0IG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IG1vZGFsQXR0cmlidXRlcyA9IEFycmF5LmZyb20oYmFzZUNvbXBvbmVudC5hdHRyaWJ1dGVzKTtcblxuICBzZXRUZW1wb3JhcnlCb2R5UGFkZGluZygpO1xuXG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoYGRhdGEtcGxhY2Vob2xkZXItZm9yYCwgbW9kYWxJRCk7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgbW9kYWxBdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZSkgPT4ge1xuICAgIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlci5zZXRBdHRyaWJ1dGUoXG4gICAgICBgZGF0YS1vcmlnaW5hbC0ke2F0dHJpYnV0ZS5uYW1lfWAsXG4gICAgICBhdHRyaWJ1dGUudmFsdWUsXG4gICAgKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcjtcbn07XG5cbi8qKlxuICogTW92ZXMgbmVjZXNzYXJ5IGF0dHJpYnV0ZXMgZnJvbSBNb2RhbCBIVE1MIHRvIHdyYXBwZXIgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBiYXNlQ29tcG9uZW50IC0gTW9kYWwgSFRNTCBpbiB0aGUgRE9NLlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gbW9kYWxDb250ZW50V3JhcHBlciAtIE1vZGFsIGNvbXBvbmVudCB3cmFwcGVyIGVsZW1lbnQuXG4gKiBAcmV0dXJucyBNb2RhbCB3cmFwcGVyIHdpdGggY29ycmVjdCBhdHRyaWJ1dGVzLlxuICovXG5jb25zdCBzZXRNb2RhbEF0dHJpYnV0ZXMgPSAoYmFzZUNvbXBvbmVudCwgbW9kYWxDb250ZW50V3JhcHBlcikgPT4ge1xuICBjb25zdCBtb2RhbElEID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgY29uc3QgYXJpYUxhYmVsbGVkQnkgPSBiYXNlQ29tcG9uZW50LmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiKTtcbiAgY29uc3QgYXJpYURlc2NyaWJlZEJ5ID0gYmFzZUNvbXBvbmVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICBjb25zdCBmb3JjZVVzZXJBY3Rpb24gPSBiYXNlQ29tcG9uZW50Lmhhc0F0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFKTtcblxuICBpZiAoIWFyaWFMYWJlbGxlZEJ5KVxuICAgIHRocm93IG5ldyBFcnJvcihgJHttb2RhbElEfSBpcyBtaXNzaW5nIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGVgKTtcblxuICBpZiAoIWFyaWFEZXNjcmliZWRCeSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bW9kYWxJRH0gaXMgbWlzc2luZyBhcmlhLWRlc3JpYmVkYnkgYXR0cmlidXRlYCk7XG5cbiAgLy8gU2V0IGF0dHJpYnV0ZXNcbiAgbW9kYWxDb250ZW50V3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiZGlhbG9nXCIpO1xuICBtb2RhbENvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsIG1vZGFsSUQpO1xuICBtb2RhbENvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiLCBhcmlhTGFiZWxsZWRCeSk7XG4gIG1vZGFsQ29udGVudFdyYXBwZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLCBhcmlhRGVzY3JpYmVkQnkpO1xuXG4gIGlmIChmb3JjZVVzZXJBY3Rpb24pIHtcbiAgICBtb2RhbENvbnRlbnRXcmFwcGVyLnNldEF0dHJpYnV0ZShGT1JDRV9BQ1RJT05fQVRUUklCVVRFLCBmb3JjZVVzZXJBY3Rpb24pO1xuICB9XG5cbiAgLy8gQWRkIGFyaWEtY29udHJvbHNcbiAgY29uc3QgbW9kYWxDbG9zZXJzID0gbW9kYWxDb250ZW50V3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKENMT1NFUlMpO1xuICBtb2RhbENsb3NlcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIG1vZGFsSUQpO1xuICB9KTtcblxuICAvLyBVcGRhdGUgdGhlIGJhc2UgZWxlbWVudCBIVE1MXG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XG4gIGJhc2VDb21wb25lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIpO1xuICBiYXNlQ29tcG9uZW50LnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIik7XG4gIGJhc2VDb21wb25lbnQuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKTtcblxuICByZXR1cm4gbW9kYWxDb250ZW50V3JhcHBlcjtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhpZGRlbiBtb2RhbCBjb250ZW50IHdyYXBwZXIuXG4gKiBSZWJ1aWxkcyB0aGUgb3JpZ2luYWwgTW9kYWwgSFRNTCBpbiB0aGUgbmV3IHdyYXBwZXIgYW5kIGFkZHMgYSBwYWdlIG92ZXJsYXkuXG4gKiBUaGVuIG1vdmVzIG9yaWdpbmFsIE1vZGFsIEhUTUwgYXR0cmlidXRlcyB0byB0aGUgbmV3IHdyYXBwZXIuXG4gKlxuICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gYmFzZUNvbXBvbmVudCAtIE9yaWdpbmFsIE1vZGFsIEhUTUwgaW4gdGhlIERPTS5cbiAqIEByZXR1cm5zIE1vZGFsIGNvbXBvbmVudCAtIE1vZGFsIHdyYXBwZXIgdy8gbmVzdGVkIE92ZXJsYXkgYW5kIE1vZGFsIENvbnRlbnQuXG4gKi9cbmNvbnN0IHJlYnVpbGRNb2RhbCA9IChiYXNlQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGJhc2VDb21wb25lbnQ7XG4gIGNvbnN0IG1vZGFsQ29udGVudFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBvdmVybGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvLyBBZGQgY2xhc3Nlc1xuICBtb2RhbENvbnRlbnRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoSElEREVOX0NMQVNTLCBXUkFQUEVSX0NMQVNTTkFNRSk7XG4gIG92ZXJsYXlEaXYuY2xhc3NMaXN0LmFkZChPVkVSTEFZX0NMQVNTTkFNRSk7XG5cbiAgLy8gUmVidWlsZCB0aGUgbW9kYWwgZWxlbWVudFxuICBtb2RhbENvbnRlbnRXcmFwcGVyLmFwcGVuZChvdmVybGF5RGl2KTtcbiAgb3ZlcmxheURpdi5hcHBlbmQobW9kYWxDb250ZW50KTtcblxuICAvLyBBZGQgYXR0cmlidXRlc1xuICBzZXRNb2RhbEF0dHJpYnV0ZXMobW9kYWxDb250ZW50LCBtb2RhbENvbnRlbnRXcmFwcGVyKTtcblxuICByZXR1cm4gbW9kYWxDb250ZW50V3JhcHBlcjtcbn07XG5cbi8qKlxuICogIEJ1aWxkcyBtb2RhbCB3aW5kb3cgZnJvbSBiYXNlIEhUTUwgYW5kIGFwcGVuZHMgdG8gdGhlIGVuZCBvZiB0aGUgRE9NLlxuICpcbiAqIEBwYXJhbSB7SFRNTERpdkVsZW1lbnR9IGJhc2VDb21wb25lbnQgLSBUaGUgbW9kYWwgZGl2IGVsZW1lbnQgaW4gdGhlIERPTS5cbiAqL1xuY29uc3Qgc2V0VXBNb2RhbCA9IChiYXNlQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1vZGFsSUQgPSBiYXNlQ29tcG9uZW50LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuXG4gIGlmICghbW9kYWxJRCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTW9kYWwgbWFya3VwIGlzIG1pc3NpbmcgSURgKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBwbGFjZWhvbGRlciB3aGVyZSBtb2RhbCBpcyBmb3IgY2xlYW51cFxuICBjb25zdCBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIgPSBjcmVhdGVQbGFjZUhvbGRlcihiYXNlQ29tcG9uZW50KTtcbiAgYmFzZUNvbXBvbmVudC5hZnRlcihvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIpO1xuXG4gIC8vIEJ1aWxkIG1vZGFsIGNvbXBvbmVudFxuICBjb25zdCBtb2RhbENvbXBvbmVudCA9IHJlYnVpbGRNb2RhbChiYXNlQ29tcG9uZW50KTtcblxuICAvLyBNb3ZlIGFsbCBtb2RhbHMgdG8gdGhlIGVuZCBvZiB0aGUgRE9NLiBEb2luZyB0aGlzIGFsbG93cyB1cyB0b1xuICAvLyBtb3JlIGVhc2lseSBmaW5kIHRoZSBlbGVtZW50cyB0byBoaWRlIGZyb20gc2NyZWVuIHJlYWRlcnNcbiAgLy8gd2hlbiB0aGUgbW9kYWwgaXMgb3Blbi5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbENvbXBvbmVudCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgZHluYW1pY2FsbHkgY3JlYXRlZCBNb2RhbCBhbmQgV3JhcHBlciBlbGVtZW50cyBhbmQgcmVzdG9yZXMgb3JpZ2luYWwgTW9kYWwgSFRNTC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBiYXNlQ29tcG9uZW50IC0gVGhlIG1vZGFsIGRpdiBlbGVtZW50IGluIHRoZSBET00uXG4gKi9cbmNvbnN0IGNsZWFuVXBNb2RhbCA9IChiYXNlQ29tcG9uZW50KSA9PiB7XG4gIGNvbnN0IG1vZGFsQ29udGVudCA9IGJhc2VDb21wb25lbnQ7XG4gIGNvbnN0IG1vZGFsQ29udGVudFdyYXBwZXIgPSBtb2RhbENvbnRlbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICBjb25zdCBtb2RhbElEID0gbW9kYWxDb250ZW50V3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcblxuICAvLyBpZiB0aGVyZSBpcyBubyBtb2RhbElELCByZXR1cm4gZWFybHlcbiAgaWYgKCFtb2RhbElEKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgb3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEtcGxhY2Vob2xkZXItZm9yPVwiJHttb2RhbElEfVwiXWAsXG4gICk7XG5cbiAgaWYgKG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcikge1xuICAgIGNvbnN0IG1vZGFsQXR0cmlidXRlcyA9IEFycmF5LmZyb20ob3JpZ2luYWxMb2NhdGlvblBsYWNlSG9sZGVyLmF0dHJpYnV0ZXMpO1xuICAgIG1vZGFsQXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGUpID0+IHtcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5zdGFydHNXaXRoKFwiZGF0YS1vcmlnaW5hbC1cIikpIHtcbiAgICAgICAgLy8gZGF0YS1vcmlnaW5hbC0gaXMgMTQgbG9uZ1xuICAgICAgICBtb2RhbENvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLnN1YnN0cigxNCksIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIuYWZ0ZXIobW9kYWxDb250ZW50KTtcbiAgICBvcmlnaW5hbExvY2F0aW9uUGxhY2VIb2xkZXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChcbiAgICAgIG9yaWdpbmFsTG9jYXRpb25QbGFjZUhvbGRlcixcbiAgICApO1xuICB9XG5cbiAgbW9kYWxDb250ZW50V3JhcHBlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG1vZGFsQ29udGVudFdyYXBwZXIpO1xufTtcblxubW9kYWwgPSBiZWhhdmlvcihcbiAge30sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhNT0RBTCwgcm9vdCkuZm9yRWFjaCgobW9kYWxXaW5kb3cpID0+IHtcbiAgICAgICAgY29uc3QgbW9kYWxJZCA9IG1vZGFsV2luZG93LmlkO1xuXG4gICAgICAgIHNldFVwTW9kYWwobW9kYWxXaW5kb3cpO1xuXG4gICAgICAgIC8vIFF1ZXJ5IGFsbCBvcGVuZXJzIGFuZCBjbG9zZXJzIGluY2x1ZGluZyB0aGUgb3ZlcmxheVxuICAgICAgICBzZWxlY3RPck1hdGNoZXMoYFthcmlhLWNvbnRyb2xzPVwiJHttb2RhbElkfVwiXWAsIGRvY3VtZW50KS5mb3JFYWNoKFxuICAgICAgICAgIChtb2RhbFRyaWdnZXIpID0+IHtcbiAgICAgICAgICAgIC8vIElmIG1vZGFsVHJpZ2dlciBpcyBhbiBhbmNob3IuLi5cbiAgICAgICAgICAgIGlmIChtb2RhbFRyaWdnZXIubm9kZU5hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgICAgIC8vIFR1cm4gYW5jaG9yIGxpbmtzIGludG8gYnV0dG9ucyBmb3Igc2NyZWVuIHJlYWRlcnNcbiAgICAgICAgICAgICAgbW9kYWxUcmlnZ2VyLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XG5cbiAgICAgICAgICAgICAgLy8gUHJldmVudCBtb2RhbCB0cmlnZ2VycyBmcm9tIGFjdGluZyBsaWtlIGxpbmtzXG4gICAgICAgICAgICAgIG1vZGFsVHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENhbiB1bmNvbW1lbnQgd2hlbiBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCIgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICAvLyBodHRwczovL2ExMXlzdXBwb3J0LmlvL3RlY2gvYXJpYS9hcmlhLWhhc3BvcHVwX2F0dHJpYnV0ZVxuICAgICAgICAgICAgLy8gTW9zdCBzY3JlZW4gcmVhZGVycyBzdXBwb3J0IGFyaWEtaGFzcG9wdXAsIGJ1dCBtaWdodCBhbm5vdW5jZVxuICAgICAgICAgICAgLy8gYXMgb3BlbmluZyBhIG1lbnUgaWYgXCJkaWFsb2dcIiBpcyBub3Qgc3VwcG9ydGVkLlxuICAgICAgICAgICAgLy8gbW9kYWxUcmlnZ2VyLnNldEF0dHJpYnV0ZShcImFyaWEtaGFzcG9wdXBcIiwgXCJkaWFsb2dcIik7XG5cbiAgICAgICAgICAgIG1vZGFsVHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRlYXJkb3duKHJvb3QpIHtcbiAgICAgIHNlbGVjdE9yTWF0Y2hlcyhNT0RBTCwgcm9vdCkuZm9yRWFjaCgobW9kYWxXaW5kb3cpID0+IHtcbiAgICAgICAgY29uc3QgbW9kYWxJZCA9IG1vZGFsV2luZG93LmlkO1xuICAgICAgICBjbGVhblVwTW9kYWwobW9kYWxXaW5kb3cpO1xuXG4gICAgICAgIHNlbGVjdE9yTWF0Y2hlcyhgW2FyaWEtY29udHJvbHM9XCIke21vZGFsSWR9XCJdYCwgZG9jdW1lbnQpLmZvckVhY2goXG4gICAgICAgICAgKG1vZGFsVHJpZ2dlcikgPT5cbiAgICAgICAgICAgIG1vZGFsVHJpZ2dlci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmb2N1c1RyYXA6IG51bGwsXG4gICAgdG9nZ2xlTW9kYWwsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsO1xuIiwiY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5cbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5cbmNvbnN0IFJBTkdFX0NMQVNTTkFNRSA9IGAke1BSRUZJWH0tcmFuZ2VgO1xuY29uc3QgUkFOR0UgPSBgLiR7UkFOR0VfQ0xBU1NOQU1FfWA7XG5cbi8qKlxuICogVXBkYXRlIHJhbmdlIGNhbGxvdXQgZm9yIHNjcmVlbiByZWFkZXJzIHVzaW5nIHRoZSBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXMuXG4gKlxuICogR2V0IG9wdGlvbmFsIGRhdGEgYXR0cmlidXRlcywgY29uc3RydWN0IGFuZCBhcHBlbmRzIGFyaWEtdmFsdWV0ZXh0IGF0dHJpYnV0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIDxpbnB1dCBpZD1cInVzYS1yYW5nZVwiIGNsYXNzPVwidXNhLXJhbmdlXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHN0ZXA9XCIxMFwiIHZhbHVlPVwiMjBcIiBkYXRhLXRleHQtdW5pdD1cImRlZ3JlZXNcIj5cbiAqXG4gKiBDYWxsb3V0IHJldHVybnMgXCIyMCBkZWdyZWVzIG9mIDEwMC5cIlxuICpcbiAqIDxpbnB1dCBpZD1cInVzYS1yYW5nZVwiIGNsYXNzPVwidXNhLXJhbmdlXCIgdHlwZT1cInJhbmdlXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHN0ZXA9XCIxMFwiIHZhbHVlPVwiMjBcIiBkYXRhLXRleHQtcHJlcG9zaXRpb249XCJkZVwiPlxuICpcbiAqIENhbGxvdXQgcmV0dXJucyBcIjIwIGRlIDEwMC5cIlxuICpcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gdGFyZ2V0UmFuZ2UgLSBUaGUgcmFuZ2Ugc2xpZGVyIGlucHV0IGVsZW1lbnRcbiAqL1xuY29uc3QgdXBkYXRlQ2FsbG91dCA9ICh0YXJnZXRSYW5nZSkgPT4ge1xuICBjb25zdCByYW5nZVNsaWRlciA9IHRhcmdldFJhbmdlO1xuICBjb25zdCBkZWZhdWx0UHJlcCA9IFwib2ZcIjtcbiAgY29uc3Qgb3B0aW9uYWxQcmVwID0gcmFuZ2VTbGlkZXIuZGF0YXNldC50ZXh0UHJlcG9zaXRpb247XG4gIGNvbnN0IHByZXAgPSBvcHRpb25hbFByZXAgfHwgZGVmYXVsdFByZXA7XG4gIGNvbnN0IHVuaXQgPSByYW5nZVNsaWRlci5kYXRhc2V0LnRleHRVbml0O1xuICBjb25zdCB2YWwgPSByYW5nZVNsaWRlci52YWx1ZTtcbiAgLy8gTm90ZTogMTAwIGlzIHRoZSBtYXggYXR0cmlidXRlJ3MgbmF0aXZlIGRlZmF1bHQgdmFsdWUgb24gcmFuZ2UgaW5wdXRzXG4gIC8vIFJlZmVyZW5jZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L2lucHV0L3JhbmdlI3ZhbGlkYXRpb25cbiAgY29uc3QgbWF4ID0gcmFuZ2VTbGlkZXIuZ2V0QXR0cmlidXRlKFwibWF4XCIpIHx8IDEwMDtcblxuICBsZXQgY2FsbG91dDtcblxuICBpZiAodW5pdCkge1xuICAgIGNhbGxvdXQgPSBgJHt2YWx9ICR7dW5pdH0gJHtwcmVwfSAke21heH1gO1xuICB9IGVsc2Uge1xuICAgIGNhbGxvdXQgPSBgJHt2YWx9ICR7cHJlcH0gJHttYXh9YDtcbiAgfVxuXG4gIHJhbmdlU2xpZGVyLnNldEF0dHJpYnV0ZShcImFyaWEtdmFsdWV0ZXh0XCIsIGNhbGxvdXQpO1xufTtcblxuY29uc3QgcmFuZ2VFdmVudHMgPSB7XG4gIGNoYW5nZToge1xuICAgIFtSQU5HRV0oKSB7XG4gICAgICB1cGRhdGVDYWxsb3V0KHRoaXMpO1xuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCByYW5nZSA9IGJlaGF2aW9yKHJhbmdlRXZlbnRzLCB7XG4gIGluaXQocm9vdCkge1xuICAgIHNlbGVjdE9yTWF0Y2hlcyhSQU5HRSwgcm9vdCkuZm9yRWFjaCgocmFuZ2VTbGlkZXIpID0+IHtcbiAgICAgIHVwZGF0ZUNhbGxvdXQocmFuZ2VTbGlkZXIpO1xuICAgIH0pO1xuICB9LFxuICB1cGRhdGVDYWxsb3V0LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2U7XG4iLCJjb25zdCBpZ25vcmUgPSByZXF1aXJlKFwicmVjZXB0b3IvaWdub3JlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCBzZWxlY3QgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2VsZWN0XCIpO1xuXG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuXG5jb25zdCBCVVRUT04gPSBcIi5qcy1zZWFyY2gtYnV0dG9uXCI7XG5jb25zdCBGT1JNID0gXCIuanMtc2VhcmNoLWZvcm1cIjtcbmNvbnN0IElOUFVUID0gXCJbdHlwZT1zZWFyY2hdXCI7XG5jb25zdCBDT05URVhUID0gXCJoZWFkZXJcIjsgLy8gWFhYXG5cbmxldCBsYXN0QnV0dG9uO1xuXG5jb25zdCBnZXRGb3JtID0gKGJ1dHRvbikgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYnV0dG9uLmNsb3Nlc3QoQ09OVEVYVCk7XG4gIHJldHVybiBjb250ZXh0ID8gY29udGV4dC5xdWVyeVNlbGVjdG9yKEZPUk0pIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihGT1JNKTtcbn07XG5cbmNvbnN0IHRvZ2dsZVNlYXJjaCA9IChidXR0b24sIGFjdGl2ZSkgPT4ge1xuICBjb25zdCBmb3JtID0gZ2V0Rm9ybShidXR0b24pO1xuXG4gIGlmICghZm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gJHtGT1JNfSBmb3VuZCBmb3Igc2VhcmNoIHRvZ2dsZSBpbiAke0NPTlRFWFR9IWApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgYnV0dG9uLmhpZGRlbiA9IGFjdGl2ZTtcbiAgZm9ybS5oaWRkZW4gPSAhYWN0aXZlO1xuICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgaWYgKCFhY3RpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihJTlBVVCk7XG5cbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgfVxuICAvLyB3aGVuIHRoZSB1c2VyIGNsaWNrcyBfb3V0c2lkZV8gb2YgdGhlIGZvcm0gdy9pZ25vcmUoKTogaGlkZSB0aGVcbiAgLy8gc2VhcmNoLCB0aGVuIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgY29uc3QgbGlzdGVuZXIgPSBpZ25vcmUoZm9ybSwgKCkgPT4ge1xuICAgIGlmIChsYXN0QnV0dG9uKSB7XG4gICAgICBoaWRlU2VhcmNoLmNhbGwobGFzdEJ1dHRvbik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgLy8gTm9ybWFsbHkgd2Ugd291bGQganVzdCBydW4gdGhpcyBjb2RlIHdpdGhvdXQgYSB0aW1lb3V0LCBidXRcbiAgLy8gSUUxMSBhbmQgRWRnZSB3aWxsIGFjdHVhbGx5IGNhbGwgdGhlIGxpc3RlbmVyICppbW1lZGlhdGVseSogYmVjYXVzZVxuICAvLyB0aGV5IGFyZSBjdXJyZW50bHkgaGFuZGxpbmcgdGhpcyBleGFjdCB0eXBlIG9mIGV2ZW50LCBzbyB3ZSdsbFxuICAvLyBtYWtlIHN1cmUgdGhlIGJyb3dzZXIgaXMgZG9uZSBoYW5kbGluZyB0aGUgY3VycmVudCBjbGljayBldmVudCxcbiAgLy8gaWYgYW55LCBiZWZvcmUgd2UgYXR0YWNoIHRoZSBsaXN0ZW5lci5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKENMSUNLLCBsaXN0ZW5lcik7XG4gIH0sIDApO1xufTtcblxuZnVuY3Rpb24gc2hvd1NlYXJjaCgpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIHRydWUpO1xuICBsYXN0QnV0dG9uID0gdGhpcztcbn1cblxuZnVuY3Rpb24gaGlkZVNlYXJjaCgpIHtcbiAgdG9nZ2xlU2VhcmNoKHRoaXMsIGZhbHNlKTtcbiAgbGFzdEJ1dHRvbiA9IHVuZGVmaW5lZDtcbn1cblxuY29uc3Qgc2VhcmNoID0gYmVoYXZpb3IoXG4gIHtcbiAgICBbQ0xJQ0tdOiB7XG4gICAgICBbQlVUVE9OXTogc2hvd1NlYXJjaCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaW5pdCh0YXJnZXQpIHtcbiAgICAgIHNlbGVjdChCVVRUT04sIHRhcmdldCkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIHRvZ2dsZVNlYXJjaChidXR0b24sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24oKSB7XG4gICAgICAvLyBmb3JnZXQgdGhlIGxhc3QgYnV0dG9uIGNsaWNrZWRcbiAgICAgIGxhc3RCdXR0b24gPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoO1xuIiwiY29uc3Qgb25jZSA9IHJlcXVpcmUoXCJyZWNlcHRvci9vbmNlXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IENMSUNLIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvZXZlbnRzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcblxuY29uc3QgTElOSyA9IGAuJHtQUkVGSVh9LXNraXBuYXZbaHJlZl49XCIjXCJdLCAuJHtQUkVGSVh9LWZvb3Rlcl9fcmV0dXJuLXRvLXRvcCBbaHJlZl49XCIjXCJdYDtcbmNvbnN0IE1BSU5DT05URU5UID0gXCJtYWluLWNvbnRlbnRcIjtcblxuZnVuY3Rpb24gc2V0VGFiaW5kZXgoKSB7XG4gIC8vIE5COiB3ZSBrbm93IGJlY2F1c2Ugb2YgdGhlIHNlbGVjdG9yIHdlJ3JlIGRlbGVnYXRpbmcgdG8gYmVsb3cgdGhhdCB0aGVcbiAgLy8gaHJlZiBhbHJlYWR5IGJlZ2lucyB3aXRoICcjJ1xuICBjb25zdCBpZCA9IGVuY29kZVVSSSh0aGlzLmdldEF0dHJpYnV0ZShcImhyZWZcIikpO1xuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBpZCA9PT0gXCIjXCIgPyBNQUlOQ09OVEVOVCA6IGlkLnNsaWNlKDEpLFxuICApO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3R5bGUub3V0bGluZSA9IFwiMFwiO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAwKTtcbiAgICB0YXJnZXQuZm9jdXMoKTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwiYmx1clwiLFxuICAgICAgb25jZSgoKSA9PiB7XG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCAtMSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIHRocm93IGFuIGVycm9yP1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmVoYXZpb3Ioe1xuICBbQ0xJQ0tdOiB7XG4gICAgW0xJTktdOiBzZXRUYWJpbmRleCxcbiAgfSxcbn0pO1xuIiwiY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdFwiKTtcbmNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3QgeyBDTElDSyB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2V2ZW50c1wiKTtcbmNvbnN0IHsgcHJlZml4OiBQUkVGSVggfSA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy9jb25maWdcIik7XG5jb25zdCBTYW5pdGl6ZXIgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvc2FuaXRpemVyXCIpO1xuXG5jb25zdCBUQUJMRSA9IGAuJHtQUkVGSVh9LXRhYmxlYDtcbmNvbnN0IFNPUlRFRCA9IFwiYXJpYS1zb3J0XCI7XG5jb25zdCBBU0NFTkRJTkcgPSBcImFzY2VuZGluZ1wiO1xuY29uc3QgREVTQ0VORElORyA9IFwiZGVzY2VuZGluZ1wiO1xuY29uc3QgU09SVF9PVkVSUklERSA9IFwiZGF0YS1zb3J0LXZhbHVlXCI7XG5jb25zdCBTT1JUX0JVVFRPTl9DTEFTUyA9IGAke1BSRUZJWH0tdGFibGVfX2hlYWRlcl9fYnV0dG9uYDtcbmNvbnN0IFNPUlRfQlVUVE9OID0gYC4ke1NPUlRfQlVUVE9OX0NMQVNTfWA7XG5jb25zdCBTT1JUQUJMRV9IRUFERVIgPSBgdGhbZGF0YS1zb3J0YWJsZV1gO1xuY29uc3QgQU5OT1VOQ0VNRU5UX1JFR0lPTiA9IGAuJHtQUkVGSVh9LXRhYmxlX19hbm5vdW5jZW1lbnQtcmVnaW9uW2FyaWEtbGl2ZT1cInBvbGl0ZVwiXWA7XG5cbi8qKiBHZXRzIHRoZSBkYXRhLXNvcnQtdmFsdWUgYXR0cmlidXRlIHZhbHVlLCBpZiBwcm92aWRlZCDigJQgb3RoZXJ3aXNlLCBnZXRzXG4gKiB0aGUgaW5uZXJUZXh0IG9yIHRleHRDb250ZW50IOKAlCBvZiB0aGUgY2hpbGQgZWxlbWVudCAoSFRNTFRhYmxlQ2VsbEVsZW1lbnQpXG4gKiBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IG9mIHRoZSBnaXZlbiB0YWJsZSByb3dcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXk8SFRNTFRhYmxlUm93RWxlbWVudD59IHRyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBnZXRDZWxsVmFsdWUgPSAodHIsIGluZGV4KSA9PlxuICB0ci5jaGlsZHJlbltpbmRleF0uZ2V0QXR0cmlidXRlKFNPUlRfT1ZFUlJJREUpIHx8XG4gIHRyLmNoaWxkcmVuW2luZGV4XS5pbm5lclRleHQgfHxcbiAgdHIuY2hpbGRyZW5baW5kZXhdLnRleHRDb250ZW50O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoZSB2YWx1ZXMgb2YgdHdvIHJvdyBhcnJheSBpdGVtcyBhdCB0aGUgZ2l2ZW4gaW5kZXgsIHRoZW4gc29ydHMgYnkgdGhlIGdpdmVuIGRpcmVjdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBjb21wYXJlRnVuY3Rpb24gPSAoaW5kZXgsIGlzQXNjZW5kaW5nKSA9PiAodGhpc1JvdywgbmV4dFJvdykgPT4ge1xuICAvLyBnZXQgdmFsdWVzIHRvIGNvbXBhcmUgZnJvbSBkYXRhIGF0dHJpYnV0ZSBvciBjZWxsIGNvbnRlbnRcbiAgY29uc3QgdmFsdWUxID0gZ2V0Q2VsbFZhbHVlKGlzQXNjZW5kaW5nID8gdGhpc1JvdyA6IG5leHRSb3csIGluZGV4KTtcbiAgY29uc3QgdmFsdWUyID0gZ2V0Q2VsbFZhbHVlKGlzQXNjZW5kaW5nID8gbmV4dFJvdyA6IHRoaXNSb3csIGluZGV4KTtcblxuICAvLyBpZiBuZWl0aGVyIHZhbHVlIGlzIGVtcHR5LCBhbmQgaWYgYm90aCB2YWx1ZXMgYXJlIGFscmVhZHkgbnVtYmVycywgY29tcGFyZSBudW1lcmljYWxseVxuICBpZiAoXG4gICAgdmFsdWUxICYmXG4gICAgdmFsdWUyICYmXG4gICAgIU51bWJlci5pc05hTihOdW1iZXIodmFsdWUxKSkgJiZcbiAgICAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZTIpKVxuICApIHtcbiAgICByZXR1cm4gdmFsdWUxIC0gdmFsdWUyO1xuICB9XG4gIC8vIE90aGVyd2lzZSwgY29tcGFyZSBhbHBoYWJldGljYWxseSBiYXNlZCBvbiBjdXJyZW50IHVzZXIgbG9jYWxlXG4gIHJldHVybiB2YWx1ZTEudG9TdHJpbmcoKS5sb2NhbGVDb21wYXJlKHZhbHVlMiwgbmF2aWdhdG9yLmxhbmd1YWdlLCB7XG4gICAgbnVtZXJpYzogdHJ1ZSxcbiAgICBpZ25vcmVQdW5jdHVhdGlvbjogdHJ1ZSxcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdldCBhbiBBcnJheSBvZiBjb2x1bW4gaGVhZGVycyBlbGVtZW50cyBiZWxvbmdpbmcgZGlyZWN0bHkgdG8gdGhlIGdpdmVuXG4gKiB0YWJsZSBlbGVtZW50LlxuICogQHBhcmFtIHtIVE1MVGFibGVFbGVtZW50fSB0YWJsZVxuICogQHJldHVybiB7YXJyYXk8SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnQ+fVxuICovXG5jb25zdCBnZXRDb2x1bW5IZWFkZXJzID0gKHRhYmxlKSA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBzZWxlY3QoU09SVEFCTEVfSEVBREVSLCB0YWJsZSk7XG4gIHJldHVybiBoZWFkZXJzLmZpbHRlcigoaGVhZGVyKSA9PiBoZWFkZXIuY2xvc2VzdChUQUJMRSkgPT09IHRhYmxlKTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBidXR0b24gbGFiZWwgd2l0aGluIHRoZSBnaXZlbiBoZWFkZXIgZWxlbWVudCwgcmVzZXR0aW5nIGl0XG4gKiB0byB0aGUgZGVmYXVsdCBzdGF0ZSAocmVhZHkgdG8gc29ydCBhc2NlbmRpbmcpIGlmIGl0J3Mgbm8gbG9uZ2VyIHNvcnRlZFxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cbmNvbnN0IHVwZGF0ZVNvcnRMYWJlbCA9IChoZWFkZXIpID0+IHtcbiAgY29uc3QgaGVhZGVyTmFtZSA9IGhlYWRlci5pbm5lclRleHQ7XG4gIGNvbnN0IHNvcnRlZEFzY2VuZGluZyA9IGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HO1xuICBjb25zdCBpc1NvcnRlZCA9XG4gICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkcgfHxcbiAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IERFU0NFTkRJTkcgfHxcbiAgICBmYWxzZTtcbiAgY29uc3QgaGVhZGVyTGFiZWwgPSBgJHtoZWFkZXJOYW1lfSwgc29ydGFibGUgY29sdW1uLCBjdXJyZW50bHkgJHtcbiAgICBpc1NvcnRlZFxuICAgICAgPyBgJHtzb3J0ZWRBc2NlbmRpbmcgPyBgc29ydGVkICR7QVNDRU5ESU5HfWAgOiBgc29ydGVkICR7REVTQ0VORElOR31gfWBcbiAgICAgIDogXCJ1bnNvcnRlZFwiXG4gIH1gO1xuICBjb25zdCBoZWFkZXJCdXR0b25MYWJlbCA9IGBDbGljayB0byBzb3J0IGJ5ICR7aGVhZGVyTmFtZX0gaW4gJHtcbiAgICBzb3J0ZWRBc2NlbmRpbmcgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HXG4gIH0gb3JkZXIuYDtcbiAgaGVhZGVyLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaGVhZGVyTGFiZWwpO1xuICBoZWFkZXIucXVlcnlTZWxlY3RvcihTT1JUX0JVVFRPTikuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgaGVhZGVyQnV0dG9uTGFiZWwpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGFyaWEtc29ydCBhdHRyaWJ1dGUgb24gdGhlIGdpdmVuIGhlYWRlciBlbGVtZW50LCBhbmQgcmVzZXQgdGhlIGxhYmVsIGFuZCBidXR0b24gaWNvblxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cbmNvbnN0IHVuc2V0U29ydCA9IChoZWFkZXIpID0+IHtcbiAgaGVhZGVyLnJlbW92ZUF0dHJpYnV0ZShTT1JURUQpO1xuICB1cGRhdGVTb3J0TGFiZWwoaGVhZGVyKTtcbn07XG5cbi8qKlxuICogU29ydCByb3dzIGVpdGhlciBhc2NlbmRpbmcgb3IgZGVzY2VuZGluZywgYmFzZWQgb24gYSBnaXZlbiBoZWFkZXIncyBhcmlhLXNvcnQgYXR0cmlidXRlXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBc2NlbmRpbmdcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWVcbiAqL1xuY29uc3Qgc29ydFJvd3MgPSAoaGVhZGVyLCBpc0FzY2VuZGluZykgPT4ge1xuICBoZWFkZXIuc2V0QXR0cmlidXRlKFNPUlRFRCwgaXNBc2NlbmRpbmcgPT09IHRydWUgPyBERVNDRU5ESU5HIDogQVNDRU5ESU5HKTtcbiAgdXBkYXRlU29ydExhYmVsKGhlYWRlcik7XG5cbiAgY29uc3QgdGJvZHkgPSBoZWFkZXIuY2xvc2VzdChUQUJMRSkucXVlcnlTZWxlY3RvcihcInRib2R5XCIpO1xuXG4gIC8vIFdlIGNhbiB1c2UgQXJyYXkuZnJvbSgpIGFuZCBBcnJheS5zb3J0KCkgaW5zdGVhZCBvbmNlIHdlIGRyb3AgSUUxMSBzdXBwb3J0LCBsaWtlbHkgaW4gdGhlIHN1bW1lciBvZiAyMDIxXG4gIC8vXG4gIC8vIEFycmF5LmZyb20odGJvZHkucXVlcnlTZWxlY3RvckFsbCgndHInKS5zb3J0KFxuICAvLyAgIGNvbXBhcmVGdW5jdGlvbihcbiAgLy8gICAgIEFycmF5LmZyb20oaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YoaGVhZGVyKSxcbiAgLy8gICAgICFpc0FzY2VuZGluZylcbiAgLy8gICApXG4gIC8vIC5mb3JFYWNoKHRyID0+IHRib2R5LmFwcGVuZENoaWxkKHRyKSApO1xuXG4gIC8vIFtdLnNsaWNlLmNhbGwoKSB0dXJucyBhcnJheS1saWtlIHNldHMgaW50byB0cnVlIGFycmF5cyBzbyB0aGF0IHdlIGNhbiBzb3J0IHRoZW1cbiAgY29uc3QgYWxsUm93cyA9IFtdLnNsaWNlLmNhbGwodGJvZHkucXVlcnlTZWxlY3RvckFsbChcInRyXCIpKTtcbiAgY29uc3QgYWxsSGVhZGVycyA9IFtdLnNsaWNlLmNhbGwoaGVhZGVyLnBhcmVudE5vZGUuY2hpbGRyZW4pO1xuICBjb25zdCB0aGlzSGVhZGVySW5kZXggPSBhbGxIZWFkZXJzLmluZGV4T2YoaGVhZGVyKTtcbiAgYWxsUm93cy5zb3J0KGNvbXBhcmVGdW5jdGlvbih0aGlzSGVhZGVySW5kZXgsICFpc0FzY2VuZGluZykpLmZvckVhY2goKHRyKSA9PiB7XG4gICAgW10uc2xpY2VcbiAgICAgIC5jYWxsKHRyLmNoaWxkcmVuKVxuICAgICAgLmZvckVhY2goKHRkKSA9PiB0ZC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXNvcnQtYWN0aXZlXCIpKTtcbiAgICB0ci5jaGlsZHJlblt0aGlzSGVhZGVySW5kZXhdLnNldEF0dHJpYnV0ZShcImRhdGEtc29ydC1hY3RpdmVcIiwgdHJ1ZSk7XG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBsaXZlIHJlZ2lvbiBpbW1lZGlhdGVseSBmb2xsb3dpbmcgdGhlIHRhYmxlIHdoZW5ldmVyIHNvcnQgY2hhbmdlcy5cbiAqIEBwYXJhbSB7SFRNTFRhYmxlRWxlbWVudH0gdGFibGVcbiAqIEBwYXJhbSB7SFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnR9IHNvcnRlZEhlYWRlclxuICovXG5cbmNvbnN0IHVwZGF0ZUxpdmVSZWdpb24gPSAodGFibGUsIHNvcnRlZEhlYWRlcikgPT4ge1xuICBjb25zdCBjYXB0aW9uID0gdGFibGUucXVlcnlTZWxlY3RvcihcImNhcHRpb25cIikuaW5uZXJUZXh0O1xuICBjb25zdCBzb3J0ZWRBc2NlbmRpbmcgPSBzb3J0ZWRIZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IEFTQ0VORElORztcbiAgY29uc3QgaGVhZGVyTGFiZWwgPSBzb3J0ZWRIZWFkZXIuaW5uZXJUZXh0O1xuICBjb25zdCBsaXZlUmVnaW9uID0gdGFibGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAobGl2ZVJlZ2lvbiAmJiBsaXZlUmVnaW9uLm1hdGNoZXMoQU5OT1VOQ0VNRU5UX1JFR0lPTikpIHtcbiAgICBjb25zdCBzb3J0QW5ub3VuY2VtZW50ID0gYFRoZSB0YWJsZSBuYW1lZCBcIiR7Y2FwdGlvbn1cIiBpcyBub3cgc29ydGVkIGJ5ICR7aGVhZGVyTGFiZWx9IGluICR7XG4gICAgICBzb3J0ZWRBc2NlbmRpbmcgPyBBU0NFTkRJTkcgOiBERVNDRU5ESU5HXG4gICAgfSBvcmRlci5gO1xuICAgIGxpdmVSZWdpb24uaW5uZXJUZXh0ID0gc29ydEFubm91bmNlbWVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVGFibGUgY29udGFpbmluZyBhIHNvcnRhYmxlIGNvbHVtbiBoZWFkZXIgaXMgbm90IGZvbGxvd2VkIGJ5IGFuIGFyaWEtbGl2ZSByZWdpb24uYCxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFRvZ2dsZSBhIGhlYWRlcidzIHNvcnQgc3RhdGUsIG9wdGlvbmFsbHkgcHJvdmlkaW5nIGEgdGFyZ2V0XG4gKiBzdGF0ZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50fSBoZWFkZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGlzQXNjZW5kaW5nIElmIG5vIHN0YXRlIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudFxuICogc3RhdGUgd2lsbCBiZSB0b2dnbGVkIChmcm9tIGZhbHNlIHRvIHRydWUsIGFuZCB2aWNlLXZlcnNhKS5cbiAqL1xuY29uc3QgdG9nZ2xlU29ydCA9IChoZWFkZXIsIGlzQXNjZW5kaW5nKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gaGVhZGVyLmNsb3Nlc3QoVEFCTEUpO1xuICBsZXQgc2FmZUFzY2VuZGluZyA9IGlzQXNjZW5kaW5nO1xuICBpZiAodHlwZW9mIHNhZmVBc2NlbmRpbmcgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgc2FmZUFzY2VuZGluZyA9IGhlYWRlci5nZXRBdHRyaWJ1dGUoU09SVEVEKSA9PT0gQVNDRU5ESU5HO1xuICB9XG5cbiAgaWYgKCF0YWJsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtTT1JUQUJMRV9IRUFERVJ9IGlzIG1pc3Npbmcgb3V0ZXIgJHtUQUJMRX1gKTtcbiAgfVxuXG4gIHNhZmVBc2NlbmRpbmcgPSBzb3J0Um93cyhoZWFkZXIsIGlzQXNjZW5kaW5nKTtcblxuICBpZiAoc2FmZUFzY2VuZGluZykge1xuICAgIGdldENvbHVtbkhlYWRlcnModGFibGUpLmZvckVhY2goKG90aGVySGVhZGVyKSA9PiB7XG4gICAgICBpZiAob3RoZXJIZWFkZXIgIT09IGhlYWRlcikge1xuICAgICAgICB1bnNldFNvcnQob3RoZXJIZWFkZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHVwZGF0ZUxpdmVSZWdpb24odGFibGUsIGhlYWRlcik7XG4gIH1cbn07XG5cbi8qKlxuICoqIEluc2VydHMgYSBidXR0b24gd2l0aCBpY29uIGluc2lkZSBhIHNvcnRhYmxlIGhlYWRlclxuICogQHBhcmFtIHtIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudH0gaGVhZGVyXG4gKi9cblxuY29uc3QgY3JlYXRlSGVhZGVyQnV0dG9uID0gKGhlYWRlcikgPT4ge1xuICBjb25zdCBidXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbkVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiMFwiKTtcbiAgYnV0dG9uRWwuY2xhc3NMaXN0LmFkZChTT1JUX0JVVFRPTl9DTEFTUyk7XG4gIC8vIElDT05fU09VUkNFXG4gIGJ1dHRvbkVsLmlubmVySFRNTCA9IFNhbml0aXplci5lc2NhcGVIVE1MYFxuICA8c3ZnIGNsYXNzPVwiJHtQUkVGSVh9LWljb25cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgIDxnIGNsYXNzPVwiZGVzY2VuZGluZ1wiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBhdGggZD1cIk0xNyAxN0wxNS41OSAxNS41OUwxMi45OTk5IDE4LjE3VjJIMTAuOTk5OVYxOC4xN0w4LjQxIDE1LjU4TDcgMTdMMTEuOTk5OSAyMkwxNyAxN1pcIiAvPlxuICAgIDwvZz5cbiAgICA8ZyBjbGFzcz1cImFzY2VuZGluZ1wiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBhdGggdHJhbnNmb3JtPVwicm90YXRlKDE4MCwgMTIsIDEyKVwiIGQ9XCJNMTcgMTdMMTUuNTkgMTUuNTlMMTIuOTk5OSAxOC4xN1YySDEwLjk5OTlWMTguMTdMOC40MSAxNS41OEw3IDE3TDExLjk5OTkgMjJMMTcgMTdaXCIgLz5cbiAgICA8L2c+XG4gICAgPGcgY2xhc3M9XCJ1bnNvcnRlZFwiIGZpbGw9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMTUuMTcgMTUgMTMgMTcuMTcgMTMgNi44MyAxNS4xNyA5IDE2LjU4IDcuNTkgMTIgMyA3LjQxIDcuNTkgOC44MyA5IDExIDYuODMgMTEgMTcuMTcgOC44MyAxNSA3LjQyIDE2LjQxIDEyIDIxIDE2LjU5IDE2LjQxIDE1LjE3IDE1XCIvPlxuICAgIDwvZz5cbiAgPC9zdmc+XG4gIGA7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChidXR0b25FbCk7XG4gIHVwZGF0ZVNvcnRMYWJlbChoZWFkZXIpO1xufTtcblxuY29uc3QgdGFibGUgPSBiZWhhdmlvcihcbiAge1xuICAgIFtDTElDS106IHtcbiAgICAgIFtTT1JUX0JVVFRPTl0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlU29ydChcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xvc2VzdChTT1JUQUJMRV9IRUFERVIpLFxuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFNPUlRBQkxFX0hFQURFUikuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09XG4gICAgICAgICAgICBBU0NFTkRJTkcsXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpbml0KHJvb3QpIHtcbiAgICAgIGNvbnN0IHNvcnRhYmxlSGVhZGVycyA9IHNlbGVjdChTT1JUQUJMRV9IRUFERVIsIHJvb3QpO1xuICAgICAgc29ydGFibGVIZWFkZXJzLmZvckVhY2goKGhlYWRlcikgPT4gY3JlYXRlSGVhZGVyQnV0dG9uKGhlYWRlcikpO1xuXG4gICAgICBjb25zdCBmaXJzdFNvcnRlZCA9IHNvcnRhYmxlSGVhZGVycy5maWx0ZXIoXG4gICAgICAgIChoZWFkZXIpID0+XG4gICAgICAgICAgaGVhZGVyLmdldEF0dHJpYnV0ZShTT1JURUQpID09PSBBU0NFTkRJTkcgfHxcbiAgICAgICAgICBoZWFkZXIuZ2V0QXR0cmlidXRlKFNPUlRFRCkgPT09IERFU0NFTkRJTkcsXG4gICAgICApWzBdO1xuICAgICAgaWYgKHR5cGVvZiBmaXJzdFNvcnRlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBubyBzb3J0YWJsZSBoZWFkZXJzIGZvdW5kXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNvcnREaXIgPSBmaXJzdFNvcnRlZC5nZXRBdHRyaWJ1dGUoU09SVEVEKTtcbiAgICAgIGlmIChzb3J0RGlyID09PSBBU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNvcnREaXIgPT09IERFU0NFTkRJTkcpIHtcbiAgICAgICAgdG9nZ2xlU29ydChmaXJzdFNvcnRlZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgVEFCTEUsXG4gICAgU09SVEFCTEVfSEVBREVSLFxuICAgIFNPUlRfQlVUVE9OLFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB0YWJsZTtcbiIsImNvbnN0IGJlaGF2aW9yID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHtcbiAgQ09NQk9fQk9YX0NMQVNTLFxuICBlbmhhbmNlQ29tYm9Cb3gsXG59ID0gcmVxdWlyZShcIi4uLy4uL3VzYS1jb21iby1ib3gvc3JjL2luZGV4XCIpO1xuXG5jb25zdCBUSU1FX1BJQ0tFUl9DTEFTUyA9IGAke1BSRUZJWH0tdGltZS1waWNrZXJgO1xuY29uc3QgVElNRV9QSUNLRVIgPSBgLiR7VElNRV9QSUNLRVJfQ0xBU1N9YDtcbmNvbnN0IE1BWF9USU1FID0gNjAgKiAyNCAtIDE7XG5jb25zdCBNSU5fVElNRSA9IDA7XG5jb25zdCBERUZBVUxUX1NURVAgPSAzMDtcbmNvbnN0IE1JTl9TVEVQID0gMTtcblxuY29uc3QgRklMVEVSX0RBVEFTRVQgPSB7XG4gIGZpbHRlcjpcbiAgICBcIjA/e3sgaG91clF1ZXJ5RmlsdGVyIH19Ont7bWludXRlUXVlcnlGaWx0ZXJ9fS4qe3sgYXBRdWVyeUZpbHRlciB9fW0/XCIsXG4gIGFwUXVlcnlGaWx0ZXI6IFwiKFthcF0pXCIsXG4gIGhvdXJRdWVyeUZpbHRlcjogXCIoWzEtOV1bMC0yXT8pXCIsXG4gIG1pbnV0ZVF1ZXJ5RmlsdGVyOiBcIltcXFxcZF0rOihbMC05XXswLDJ9KVwiLFxufTtcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBvZiBoaDptbSBpbnRvIG1pbnV0ZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGltZVN0ciB0aGUgdGltZSBzdHJpbmcgdG8gcGFyc2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgbWludXRlc1xuICovXG5jb25zdCBwYXJzZVRpbWVTdHJpbmcgPSAodGltZVN0cikgPT4ge1xuICBsZXQgbWludXRlcztcblxuICBpZiAodGltZVN0cikge1xuICAgIGNvbnN0IFtob3VycywgbWluc10gPSB0aW1lU3RyLnNwbGl0KFwiOlwiKS5tYXAoKHN0cikgPT4ge1xuICAgICAgbGV0IHZhbHVlO1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyLCAxMCk7XG4gICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWQpKSB2YWx1ZSA9IHBhcnNlZDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGlmIChob3VycyAhPSBudWxsICYmIG1pbnMgIT0gbnVsbCkge1xuICAgICAgbWludXRlcyA9IGhvdXJzICogNjAgKyBtaW5zO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtaW51dGVzO1xufTtcblxuLyoqXG4gKiBFbmhhbmNlIGFuIGlucHV0IHdpdGggdGhlIGRhdGUgcGlja2VyIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgVGhlIGluaXRpYWwgd3JhcHBpbmcgZWxlbWVudCBvZiB0aGUgZGF0ZSBwaWNrZXIgY29tcG9uZW50XG4gKi9cbmNvbnN0IHRyYW5zZm9ybVRpbWVQaWNrZXIgPSAoZWwpID0+IHtcbiAgY29uc3QgdGltZVBpY2tlckVsID0gZWwuY2xvc2VzdChUSU1FX1BJQ0tFUik7XG5cbiAgY29uc3QgaW5pdGlhbElucHV0RWwgPSB0aW1lUGlja2VyRWwucXVlcnlTZWxlY3RvcihgaW5wdXRgKTtcblxuICBpZiAoIWluaXRpYWxJbnB1dEVsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke1RJTUVfUElDS0VSfSBpcyBtaXNzaW5nIGlubmVyIGlucHV0YCk7XG4gIH1cblxuICBjb25zdCBzZWxlY3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cbiAgW1xuICAgIFwiaWRcIixcbiAgICBcIm5hbWVcIixcbiAgICBcInJlcXVpcmVkXCIsXG4gICAgXCJhcmlhLWxhYmVsXCIsXG4gICAgXCJhcmlhLWxhYmVsbGVkYnlcIixcbiAgICBcImRpc2FibGVkXCIsXG4gICAgXCJhcmlhLWRpc2FibGVkXCIsXG4gIF0uZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIGlmIChpbml0aWFsSW5wdXRFbC5oYXNBdHRyaWJ1dGUobmFtZSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5pdGlhbElucHV0RWwuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgc2VsZWN0RWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIGluaXRpYWxJbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHBhZFplcm9zID0gKHZhbHVlLCBsZW5ndGgpID0+IGAwMDAwJHt2YWx1ZX1gLnNsaWNlKC1sZW5ndGgpO1xuXG4gIGNvbnN0IGdldFRpbWVDb250ZXh0ID0gKG1pbnV0ZXMpID0+IHtcbiAgICBjb25zdCBtaW51dGUgPSBtaW51dGVzICUgNjA7XG4gICAgY29uc3QgaG91cjI0ID0gTWF0aC5mbG9vcihtaW51dGVzIC8gNjApO1xuICAgIGNvbnN0IGhvdXIxMiA9IGhvdXIyNCAlIDEyIHx8IDEyO1xuICAgIGNvbnN0IGFtcG0gPSBob3VyMjQgPCAxMiA/IFwiYW1cIiA6IFwicG1cIjtcblxuICAgIHJldHVybiB7XG4gICAgICBtaW51dGUsXG4gICAgICBob3VyMjQsXG4gICAgICBob3VyMTIsXG4gICAgICBhbXBtLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWluVGltZSA9IE1hdGgubWF4KFxuICAgIE1JTl9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5taW5UaW1lKSB8fCBNSU5fVElNRSxcbiAgKTtcbiAgY29uc3QgbWF4VGltZSA9IE1hdGgubWluKFxuICAgIE1BWF9USU1FLFxuICAgIHBhcnNlVGltZVN0cmluZyh0aW1lUGlja2VyRWwuZGF0YXNldC5tYXhUaW1lKSB8fCBNQVhfVElNRSxcbiAgKTtcbiAgY29uc3Qgc3RlcCA9IE1hdGguZmxvb3IoXG4gICAgTWF0aC5tYXgoTUlOX1NURVAsIHRpbWVQaWNrZXJFbC5kYXRhc2V0LnN0ZXAgfHwgREVGQVVMVF9TVEVQKSxcbiAgKTtcblxuICBsZXQgZGVmYXVsdFZhbHVlO1xuICBmb3IgKGxldCB0aW1lID0gbWluVGltZTsgdGltZSA8PSBtYXhUaW1lOyB0aW1lICs9IHN0ZXApIHtcbiAgICBjb25zdCB7IG1pbnV0ZSwgaG91cjI0LCBob3VyMTIsIGFtcG0gfSA9IGdldFRpbWVDb250ZXh0KHRpbWUpO1xuXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBvcHRpb24udmFsdWUgPSBgJHtwYWRaZXJvcyhob3VyMjQsIDIpfToke3BhZFplcm9zKG1pbnV0ZSwgMil9YDtcbiAgICBvcHRpb24udGV4dCA9IGAke2hvdXIxMn06JHtwYWRaZXJvcyhtaW51dGUsIDIpfSR7YW1wbX1gO1xuICAgIGlmIChvcHRpb24udGV4dCA9PT0gaW5pdGlhbElucHV0RWwudmFsdWUpIHtcbiAgICAgIGRlZmF1bHRWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICB9XG4gICAgc2VsZWN0RWwuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuXG4gIHRpbWVQaWNrZXJFbC5jbGFzc0xpc3QuYWRkKENPTUJPX0JPWF9DTEFTUyk7XG5cbiAgLy8gY29tYm8gYm94IHByb3BlcnRpZXNcbiAgT2JqZWN0LmtleXMoRklMVEVSX0RBVEFTRVQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIHRpbWVQaWNrZXJFbC5kYXRhc2V0W2tleV0gPSBGSUxURVJfREFUQVNFVFtrZXldO1xuICB9KTtcbiAgdGltZVBpY2tlckVsLmRhdGFzZXQuZGlzYWJsZUZpbHRlcmluZyA9IFwidHJ1ZVwiO1xuICB0aW1lUGlja2VyRWwuZGF0YXNldC5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgdGltZVBpY2tlckVsLmFwcGVuZENoaWxkKHNlbGVjdEVsKTtcbiAgaW5pdGlhbElucHV0RWwucmVtb3ZlKCk7XG59O1xuXG5jb25zdCB0aW1lUGlja2VyID0gYmVoYXZpb3IoXG4gIHt9LFxuICB7XG4gICAgaW5pdChyb290KSB7XG4gICAgICBzZWxlY3RPck1hdGNoZXMoVElNRV9QSUNLRVIsIHJvb3QpLmZvckVhY2goKHRpbWVQaWNrZXJFbCkgPT4ge1xuICAgICAgICB0cmFuc2Zvcm1UaW1lUGlja2VyKHRpbWVQaWNrZXJFbCk7XG4gICAgICAgIGVuaGFuY2VDb21ib0JveCh0aW1lUGlja2VyRWwpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBGSUxURVJfREFUQVNFVCxcbiAgfSxcbik7XG5cbm1vZHVsZS5leHBvcnRzID0gdGltZVBpY2tlcjtcbiIsIi8vIFRvb2x0aXBzXG5jb25zdCBrZXltYXAgPSByZXF1aXJlKFwicmVjZXB0b3Iva2V5bWFwXCIpO1xuY29uc3Qgc2VsZWN0T3JNYXRjaGVzID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3NlbGVjdC1vci1tYXRjaGVzXCIpO1xuY29uc3QgYmVoYXZpb3IgPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvdXRpbHMvYmVoYXZpb3JcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vLi4vdXN3ZHMtY29yZS9zcmMvanMvY29uZmlnXCIpO1xuY29uc3QgaXNFbGVtZW50SW5WaWV3cG9ydCA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9pcy1pbi12aWV3cG9ydFwiKTtcblxuY29uc3QgQk9EWSA9IFwiYm9keVwiO1xuY29uc3QgVE9PTFRJUCA9IGAuJHtQUkVGSVh9LXRvb2x0aXBgO1xuY29uc3QgVE9PTFRJUF9UUklHR0VSID0gYC4ke1BSRUZJWH0tdG9vbHRpcF9fdHJpZ2dlcmA7XG5jb25zdCBUT09MVElQX1RSSUdHRVJfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX3RyaWdnZXJgO1xuY29uc3QgVE9PTFRJUF9DTEFTUyA9IGAke1BSRUZJWH0tdG9vbHRpcGA7XG5jb25zdCBUT09MVElQX0JPRFlfQ0xBU1MgPSBgJHtQUkVGSVh9LXRvb2x0aXBfX2JvZHlgO1xuY29uc3QgU0VUX0NMQVNTID0gXCJpcy1zZXRcIjtcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSBcImlzLXZpc2libGVcIjtcbmNvbnN0IFRSSUFOR0xFX1NJWkUgPSA1O1xuY29uc3QgQURKVVNUX1dJRFRIX0NMQVNTID0gYCR7UFJFRklYfS10b29sdGlwX19ib2R5LS13cmFwYDtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtET01FbGVtZW50fSB0cmlnZ2VyIC0gVGhlIHRvb2x0aXAgdHJpZ2dlclxuICogQHJldHVybnMge29iamVjdH0gRWxlbWVudHMgZm9yIGluaXRpYWxpemVkIHRvb2x0aXA7IGluY2x1ZGVzIHRyaWdnZXIsIHdyYXBwZXIsIGFuZCBib2R5XG4gKi9cbmNvbnN0IGdldFRvb2x0aXBFbGVtZW50cyA9ICh0cmlnZ2VyKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSB0cmlnZ2VyLnBhcmVudE5vZGU7XG4gIGNvbnN0IGJvZHkgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoYC4ke1RPT0xUSVBfQk9EWV9DTEFTU31gKTtcblxuICByZXR1cm4geyB0cmlnZ2VyLCB3cmFwcGVyLCBib2R5IH07XG59O1xuXG4vKipcbiAqIFNob3dzIHRoZSB0b29sdGlwXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwVHJpZ2dlciAtIHRoZSBlbGVtZW50IHRoYXQgaW5pdGlhbGl6ZXMgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3Qgc2hvd1Rvb2xUaXAgPSAodG9vbHRpcEJvZHksIHRvb2x0aXBUcmlnZ2VyLCBwb3NpdGlvbikgPT4ge1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcImZhbHNlXCIpO1xuXG4gIC8vIFRoaXMgc2V0cyB1cCB0aGUgdG9vbHRpcCBib2R5LiBUaGUgb3BhY2l0eSBpcyAwLCBidXRcbiAgLy8gd2UgY2FuIGJlZ2luIHJ1bm5pbmcgdGhlIGNhbGN1bGF0aW9ucyBiZWxvdy5cbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChTRVRfQ0xBU1MpO1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbiB0aGUgdG9vbHRpcCBib2R5IHdoZW4gdGhlIHRyaWdnZXIgaXMgaG92ZXJlZFxuICAgKiBSZW1vdmVzIG9sZCBwb3NpdGlvbmluZyBjbGFzc25hbWVzIGFuZCByZWFwcGxpZXMuIFRoaXMgYWxsb3dzXG4gICAqIHBvc2l0aW9uaW5nIHRvIGNoYW5nZSBpbiBjYXNlIHRoZSB1c2VyIHJlc2l6ZXMgYnJvd3NlciBvciBET00gbWFuaXB1bGF0aW9uXG4gICAqIGNhdXNlcyB0b29sdGlwIHRvIGdldCBjbGlwcGVkIGZyb20gdmlld3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNldFBvcyAtIGNhbiBiZSBcInRvcFwiLCBcImJvdHRvbVwiLCBcInJpZ2h0XCIsIFwibGVmdFwiXG4gICAqL1xuICBjb25zdCBzZXRQb3NpdGlvbkNsYXNzID0gKHNldFBvcykgPT4ge1xuICAgIHRvb2x0aXBCb2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7VE9PTFRJUF9CT0RZX0NMQVNTfS0tdG9wYCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1ib3R0b21gKTtcbiAgICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke1RPT0xUSVBfQk9EWV9DTEFTU30tLXJpZ2h0YCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS1sZWZ0YCk7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChgJHtUT09MVElQX0JPRFlfQ0xBU1N9LS0ke3NldFBvc31gKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBvbGQgcG9zaXRpb25pbmcgc3R5bGVzLiBUaGlzIGFsbG93c1xuICAgKiByZS1wb3NpdGlvbmluZyB0byBjaGFuZ2Ugd2l0aG91dCBpbmhlcml0aW5nIG90aGVyXG4gICAqIGR5bmFtaWMgc3R5bGVzXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHJlc2V0UG9zaXRpb25TdHlsZXMgPSAoZSkgPT4ge1xuICAgIC8vIHdlIGRvbid0IG92ZXJyaWRlIGFueXRoaW5nIGluIHRoZSBzdHlsZXNoZWV0IHdoZW4gZmluZGluZyBhbHQgcG9zaXRpb25zXG4gICAgZS5zdHlsZS50b3AgPSBudWxsO1xuICAgIGUuc3R5bGUuYm90dG9tID0gbnVsbDtcbiAgICBlLnN0eWxlLnJpZ2h0ID0gbnVsbDtcbiAgICBlLnN0eWxlLmxlZnQgPSBudWxsO1xuICAgIGUuc3R5bGUubWFyZ2luID0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogZ2V0IG1hcmdpbiBvZmZzZXQgY2FsY3VsYXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlWYWx1ZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cblxuICBjb25zdCBvZmZzZXRNYXJnaW4gPSAodGFyZ2V0LCBwcm9wZXJ0eVZhbHVlKSA9PlxuICAgIHBhcnNlSW50KFxuICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5VmFsdWUpLFxuICAgICAgMTAsXG4gICAgKTtcblxuICAvLyBvZmZzZXRMZWZ0ID0gdGhlIGxlZnQgcG9zaXRpb24sIGFuZCBtYXJnaW4gb2YgdGhlIGVsZW1lbnQsIHRoZSBsZWZ0XG4gIC8vIHBhZGRpbmcsIHNjcm9sbGJhciBhbmQgYm9yZGVyIG9mIHRoZSBvZmZzZXRQYXJlbnQgZWxlbWVudFxuICAvLyBvZmZzZXRXaWR0aCA9IFRoZSBvZmZzZXRXaWR0aCBwcm9wZXJ0eSByZXR1cm5zIHRoZSB2aWV3YWJsZSB3aWR0aCBvZiBhblxuICAvLyBlbGVtZW50IGluIHBpeGVscywgaW5jbHVkaW5nIHBhZGRpbmcsIGJvcmRlciBhbmQgc2Nyb2xsYmFyLCBidXQgbm90XG4gIC8vIHRoZSBtYXJnaW4uXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBtYXJnaW4gb2Zmc2V0XG4gICAqIHRvb2x0aXAgdHJpZ2dlciBtYXJnaW4ocG9zaXRpb24pIG9mZnNldCArIHRvb2x0aXBCb2R5IG9mZnNldFdpZHRoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXJnaW5Qb3NpdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gdG9vbHRpcEJvZHlPZmZzZXRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdHJpZ2dlclxuICAgKi9cbiAgY29uc3QgY2FsY3VsYXRlTWFyZ2luT2Zmc2V0ID0gKFxuICAgIG1hcmdpblBvc2l0aW9uLFxuICAgIHRvb2x0aXBCb2R5T2Zmc2V0LFxuICAgIHRyaWdnZXIsXG4gICkgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9XG4gICAgICBvZmZzZXRNYXJnaW4odHJpZ2dlciwgYG1hcmdpbi0ke21hcmdpblBvc2l0aW9ufWApID4gMFxuICAgICAgICA/IHRvb2x0aXBCb2R5T2Zmc2V0IC0gb2Zmc2V0TWFyZ2luKHRyaWdnZXIsIGBtYXJnaW4tJHttYXJnaW5Qb3NpdGlvbn1gKVxuICAgICAgICA6IHRvb2x0aXBCb2R5T2Zmc2V0O1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfTtcblxuICAvKipcbiAgICogUG9zaXRpb25zIHRvb2x0aXAgYXQgdGhlIHRvcFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlIC0gdGhpcyBpcyB0aGUgdG9vbHRpcCBib2R5XG4gICAqL1xuICBjb25zdCBwb3NpdGlvblRvcCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTsgLy8gZW5zdXJlcyB3ZSBzdGFydCBmcm9tIHRoZSBzYW1lIHBvaW50XG4gICAgLy8gZ2V0IGRldGFpbHMgb24gdGhlIGVsZW1lbnRzIG9iamVjdCB3aXRoXG5cbiAgICBjb25zdCB0b3BNYXJnaW4gPSBjYWxjdWxhdGVNYXJnaW5PZmZzZXQoXG4gICAgICBcInRvcFwiLFxuICAgICAgZS5vZmZzZXRIZWlnaHQsXG4gICAgICB0b29sdGlwVHJpZ2dlcixcbiAgICApO1xuXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLFxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwidG9wXCIpO1xuICAgIGUuc3R5bGUubGVmdCA9IGA1MCVgOyAvLyBjZW50ZXIgdGhlIGVsZW1lbnRcbiAgICBlLnN0eWxlLnRvcCA9IGAtJHtUUklBTkdMRV9TSVpFfXB4YDsgLy8gY29uc2lkZXIgdGhlIHBzZXVkbyBlbGVtZW50XG4gICAgLy8gYXBwbHkgb3VyIG1hcmdpbnMgYmFzZWQgb24gdGhlIG9mZnNldFxuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbn1weCAwIDAgLSR7bGVmdE1hcmdpbiAvIDJ9cHhgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgYm90dG9tXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGUgLSB0aGlzIGlzIHRoZSB0b29sdGlwIGJvZHlcbiAgICovXG4gIGNvbnN0IHBvc2l0aW9uQm90dG9tID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgZS5vZmZzZXRXaWR0aCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLFxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwiYm90dG9tXCIpO1xuICAgIGUuc3R5bGUubGVmdCA9IGA1MCVgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYCR7VFJJQU5HTEVfU0laRX1weCAwIDAgLSR7bGVmdE1hcmdpbiAvIDJ9cHhgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgcmlnaHRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25SaWdodCA9IChlKSA9PiB7XG4gICAgcmVzZXRQb3NpdGlvblN0eWxlcyhlKTtcblxuICAgIGNvbnN0IHRvcE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwidG9wXCIsXG4gICAgICBlLm9mZnNldEhlaWdodCxcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLFxuICAgICk7XG5cbiAgICBzZXRQb3NpdGlvbkNsYXNzKFwicmlnaHRcIik7XG4gICAgZS5zdHlsZS50b3AgPSBgNTAlYDtcbiAgICBlLnN0eWxlLmxlZnQgPSBgJHtcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgKyB0b29sdGlwVHJpZ2dlci5vZmZzZXRXaWR0aCArIFRSSUFOR0xFX1NJWkVcbiAgICB9cHhgO1xuICAgIGUuc3R5bGUubWFyZ2luID0gYC0ke3RvcE1hcmdpbiAvIDJ9cHggMCAwIDBgO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3NpdGlvbnMgdG9vbHRpcCBhdCB0aGUgcmlnaHRcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZSAtIHRoaXMgaXMgdGhlIHRvb2x0aXAgYm9keVxuICAgKi9cbiAgY29uc3QgcG9zaXRpb25MZWZ0ID0gKGUpID0+IHtcbiAgICByZXNldFBvc2l0aW9uU3R5bGVzKGUpO1xuXG4gICAgY29uc3QgdG9wTWFyZ2luID0gY2FsY3VsYXRlTWFyZ2luT2Zmc2V0KFxuICAgICAgXCJ0b3BcIixcbiAgICAgIGUub2Zmc2V0SGVpZ2h0LFxuICAgICAgdG9vbHRpcFRyaWdnZXIsXG4gICAgKTtcblxuICAgIC8vIHdlIGhhdmUgdG8gY2hlY2sgZm9yIHNvbWUgdXRpbGl0eSBtYXJnaW5zXG4gICAgY29uc3QgbGVmdE1hcmdpbiA9IGNhbGN1bGF0ZU1hcmdpbk9mZnNldChcbiAgICAgIFwibGVmdFwiLFxuICAgICAgdG9vbHRpcFRyaWdnZXIub2Zmc2V0TGVmdCA+IGUub2Zmc2V0V2lkdGhcbiAgICAgICAgPyB0b29sdGlwVHJpZ2dlci5vZmZzZXRMZWZ0IC0gZS5vZmZzZXRXaWR0aFxuICAgICAgICA6IGUub2Zmc2V0V2lkdGgsXG4gICAgICB0b29sdGlwVHJpZ2dlcixcbiAgICApO1xuXG4gICAgc2V0UG9zaXRpb25DbGFzcyhcImxlZnRcIik7XG4gICAgZS5zdHlsZS50b3AgPSBgNTAlYDtcbiAgICBlLnN0eWxlLmxlZnQgPSBgLSR7VFJJQU5HTEVfU0laRX1weGA7XG4gICAgZS5zdHlsZS5tYXJnaW4gPSBgLSR7dG9wTWFyZ2luIC8gMn1weCAwIDAgJHtcbiAgICAgIHRvb2x0aXBUcmlnZ2VyLm9mZnNldExlZnQgPiBlLm9mZnNldFdpZHRoID8gbGVmdE1hcmdpbiA6IC1sZWZ0TWFyZ2luXG4gICAgfXB4YDsgLy8gYWRqdXN0IHRoZSBtYXJnaW5cbiAgfTtcblxuICAvKipcbiAgICogV2UgdHJ5IHRvIHNldCB0aGUgcG9zaXRpb24gYmFzZWQgb24gdGhlXG4gICAqIG9yaWdpbmFsIGludGVudGlvbiwgYnV0IG1ha2UgYWRqdXN0bWVudHNcbiAgICogaWYgdGhlIGVsZW1lbnQgaXMgY2xpcHBlZCBvdXQgb2YgdGhlIHZpZXdwb3J0XG4gICAqIHdlIGNvbnN0cmFpbiB0aGUgd2lkdGggb25seSBhcyBhIGxhc3QgcmVzb3J0XG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQoYWxpYXMgdG9vbHRpcEJvZHkpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhdHRlbXB0ICgtLWZsYWcpXG4gICAqL1xuXG4gIGNvbnN0IG1heEF0dGVtcHRzID0gMjtcblxuICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGVsZW1lbnQsIGF0dGVtcHQgPSAxKSB7XG4gICAgLy8gY3JlYXRlIGFycmF5IG9mIG9wdGlvbmFsIHBvc2l0aW9uc1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcbiAgICAgIHBvc2l0aW9uVG9wLFxuICAgICAgcG9zaXRpb25Cb3R0b20sXG4gICAgICBwb3NpdGlvblJpZ2h0LFxuICAgICAgcG9zaXRpb25MZWZ0LFxuICAgIF07XG5cbiAgICBsZXQgaGFzVmlzaWJsZVBvc2l0aW9uID0gZmFsc2U7XG5cbiAgICAvLyB3ZSB0YWtlIGEgcmVjdXJzaXZlIGFwcHJvYWNoXG4gICAgZnVuY3Rpb24gdHJ5UG9zaXRpb25zKGkpIHtcbiAgICAgIGlmIChpIDwgcG9zaXRpb25zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbnNbaV07XG4gICAgICAgIHBvcyhlbGVtZW50KTtcblxuICAgICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICB0cnlQb3NpdGlvbnMoKGkgKz0gMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhc1Zpc2libGVQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnlQb3NpdGlvbnMoMCk7XG4gICAgLy8gaWYgd2UgY2FuJ3QgZmluZCBhIHBvc2l0aW9uIHdlIGNvbXByZXNzIGl0IGFuZCB0cnkgYWdhaW5cbiAgICBpZiAoIWhhc1Zpc2libGVQb3NpdGlvbikge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEFESlVTVF9XSURUSF9DTEFTUyk7XG4gICAgICBpZiAoYXR0ZW1wdCA8PSBtYXhBdHRlbXB0cykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbihlbGVtZW50LCAoYXR0ZW1wdCArPSAxKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgIHBvc2l0aW9uVG9wKHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICBwb3NpdGlvbkJvdHRvbSh0b29sdGlwQm9keSk7XG4gICAgICBpZiAoIWlzRWxlbWVudEluVmlld3BvcnQodG9vbHRpcEJvZHkpKSB7XG4gICAgICAgIGZpbmRCZXN0UG9zaXRpb24odG9vbHRpcEJvZHkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICBwb3NpdGlvblJpZ2h0KHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgcG9zaXRpb25MZWZ0KHRvb2x0aXBCb2R5KTtcbiAgICAgIGlmICghaXNFbGVtZW50SW5WaWV3cG9ydCh0b29sdGlwQm9keSkpIHtcbiAgICAgICAgZmluZEJlc3RQb3NpdGlvbih0b29sdGlwQm9keSk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBza2lwIGRlZmF1bHQgY2FzZVxuICAgICAgYnJlYWs7XG4gIH1cblxuICAvKipcbiAgICogQWN0dWFsbHkgc2hvdyB0aGUgdG9vbHRpcC4gVGhlIFZJU0lCTEVfQ0xBU1NcbiAgICogd2lsbCBjaGFuZ2UgdGhlIG9wYWNpdHkgdG8gMVxuICAgKi9cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKTtcbiAgfSwgMjApO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCB0aGUgcHJvcGVydGllcyB0byBzaG93IGFuZCBwb3NpdGlvbiB0aGUgdG9vbHRpcCxcbiAqIGFuZCByZXNldHMgdGhlIHRvb2x0aXAgcG9zaXRpb24gdG8gdGhlIG9yaWdpbmFsIGludGVudGlvblxuICogaW4gY2FzZSB0aGUgd2luZG93IGlzIHJlc2l6ZWQgb3IgdGhlIGVsZW1lbnQgaXMgbW92ZWQgdGhyb3VnaFxuICogRE9NIG1hbmlwdWxhdGlvbi5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBCb2R5IC0gVGhlIGJvZHkgb2YgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3QgaGlkZVRvb2xUaXAgPSAodG9vbHRpcEJvZHkpID0+IHtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShWSVNJQkxFX0NMQVNTKTtcbiAgdG9vbHRpcEJvZHkuY2xhc3NMaXN0LnJlbW92ZShTRVRfQ0xBU1MpO1xuICB0b29sdGlwQm9keS5jbGFzc0xpc3QucmVtb3ZlKEFESlVTVF9XSURUSF9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbn07XG5cbi8qKlxuICogU2V0dXAgdGhlIHRvb2x0aXAgY29tcG9uZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwVHJpZ2dlciBUaGUgZWxlbWVudCB0aGF0IGNyZWF0ZXMgdGhlIHRvb2x0aXBcbiAqL1xuY29uc3Qgc2V0VXBBdHRyaWJ1dGVzID0gKHRvb2x0aXBUcmlnZ2VyKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBJRCA9IGB0b29sdGlwLSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwMDAwKSArIDEwMDAwMH1gO1xuICBjb25zdCB0b29sdGlwQ29udGVudCA9IHRvb2x0aXBUcmlnZ2VyLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IHRvb2x0aXBCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbnN0IGFkZGl0aW9uYWxDbGFzc2VzID0gdG9vbHRpcFRyaWdnZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1jbGFzc2VzXCIpO1xuICBsZXQgcG9zaXRpb24gPSB0b29sdGlwVHJpZ2dlci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpO1xuXG4gIC8vIEFwcGx5IGRlZmF1bHQgcG9zaXRpb24gaWYgbm90IHNldCBhcyBhdHRyaWJ1dGVcbiAgaWYgKCFwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gXCJ0b3BcIjtcbiAgICB0b29sdGlwVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8vIFNldCB1cCB0b29sdGlwIGF0dHJpYnV0ZXNcbiAgdG9vbHRpcFRyaWdnZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLCB0b29sdGlwSUQpO1xuICB0b29sdGlwVHJpZ2dlci5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIjBcIik7XG4gIHRvb2x0aXBUcmlnZ2VyLnJlbW92ZUF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICB0b29sdGlwVHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFRPT0xUSVBfQ0xBU1MpO1xuICB0b29sdGlwVHJpZ2dlci5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfVFJJR0dFUl9DTEFTUyk7XG5cbiAgLy8gaW5zZXJ0IHdyYXBwZXIgYmVmb3JlIGVsIGluIHRoZSBET00gdHJlZVxuICB0b29sdGlwVHJpZ2dlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCB0b29sdGlwVHJpZ2dlcik7XG5cbiAgLy8gc2V0IHVwIHRoZSB3cmFwcGVyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQodG9vbHRpcFRyaWdnZXIpO1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoVE9PTFRJUF9DTEFTUyk7XG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQodG9vbHRpcEJvZHkpO1xuXG4gIC8vIEFwcGx5IGFkZGl0aW9uYWwgY2xhc3MgbmFtZXMgdG8gd3JhcHBlciBlbGVtZW50XG4gIGlmIChhZGRpdGlvbmFsQ2xhc3Nlcykge1xuICAgIGNvbnN0IGNsYXNzZXNBcnJheSA9IGFkZGl0aW9uYWxDbGFzc2VzLnNwbGl0KFwiIFwiKTtcbiAgICBjbGFzc2VzQXJyYXkuZm9yRWFjaCgoY2xhc3NuYW1lKSA9PiB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKSk7XG4gIH1cblxuICAvLyBzZXQgdXAgdGhlIHRvb2x0aXAgYm9keVxuICB0b29sdGlwQm9keS5jbGFzc0xpc3QuYWRkKFRPT0xUSVBfQk9EWV9DTEFTUyk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcImlkXCIsIHRvb2x0aXBJRCk7XG4gIHRvb2x0aXBCb2R5LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0b29sdGlwXCIpO1xuICB0b29sdGlwQm9keS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgLy8gcGxhY2UgdGhlIHRleHQgaW4gdGhlIHRvb2x0aXBcbiAgdG9vbHRpcEJvZHkudGV4dENvbnRlbnQgPSB0b29sdGlwQ29udGVudDtcblxuICByZXR1cm4geyB0b29sdGlwQm9keSwgcG9zaXRpb24sIHRvb2x0aXBDb250ZW50LCB3cmFwcGVyIH07XG59O1xuXG4vKipcbiAqIEhpZGUgYWxsIGFjdGl2ZSB0b29sdGlwcyB3aGVuIGVzY2FwZSBrZXkgaXMgcHJlc3NlZC5cbiAqL1xuXG5jb25zdCBoYW5kbGVFc2NhcGUgPSAoKSA9PiB7XG4gIGNvbnN0IGFjdGl2ZVRvb2x0aXBzID0gc2VsZWN0T3JNYXRjaGVzKGAuJHtUT09MVElQX0JPRFlfQ0xBU1N9LiR7U0VUX0NMQVNTfWApO1xuXG4gIGlmICghYWN0aXZlVG9vbHRpcHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhY3RpdmVUb29sdGlwcy5mb3JFYWNoKChhY3RpdmVUb29sdGlwKSA9PiBoaWRlVG9vbFRpcChhY3RpdmVUb29sdGlwKSk7XG59O1xuXG4vLyBTZXR1cCBvdXIgZnVuY3Rpb24gdG8gcnVuIG9uIHZhcmlvdXMgZXZlbnRzXG5jb25zdCB0b29sdGlwID0gYmVoYXZpb3IoXG4gIHtcbiAgICBcIm1vdXNlb3ZlciBmb2N1c2luXCI6IHtcbiAgICAgIFtUT09MVElQXShlKSB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgZWxlbWVudFR5cGUgPSB0cmlnZ2VyLm5vZGVOYW1lO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdG9vbHRpcCBpZiBpdCBoYXNuJ3QgYWxyZWFkeVxuICAgICAgICBpZiAoZWxlbWVudFR5cGUgPT09IFwiQlVUVE9OXCIgJiYgdHJpZ2dlci5oYXNBdHRyaWJ1dGUoXCJ0aXRsZVwiKSkge1xuICAgICAgICAgIHNldFVwQXR0cmlidXRlcyh0cmlnZ2VyKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtUT09MVElQX1RSSUdHRVJdKGUpIHtcbiAgICAgICAgY29uc3QgeyB0cmlnZ2VyLCBib2R5IH0gPSBnZXRUb29sdGlwRWxlbWVudHMoZS50YXJnZXQpO1xuXG4gICAgICAgIHNob3dUb29sVGlwKGJvZHksIHRyaWdnZXIsIHRyaWdnZXIuZGF0YXNldC5wb3NpdGlvbik7XG4gICAgICB9LFxuICAgIH0sXG4gICAgZm9jdXNvdXQ6IHtcbiAgICAgIFtUT09MVElQX1RSSUdHRVJdKGUpIHtcbiAgICAgICAgY29uc3QgeyBib2R5IH0gPSBnZXRUb29sdGlwRWxlbWVudHMoZS50YXJnZXQpO1xuXG4gICAgICAgIGhpZGVUb29sVGlwKGJvZHkpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGtleWRvd246IHtcbiAgICAgIFtCT0RZXToga2V5bWFwKHsgRXNjYXBlOiBoYW5kbGVFc2NhcGUgfSksXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFRPT0xUSVAsIHJvb3QpLmZvckVhY2goKHRvb2x0aXBUcmlnZ2VyKSA9PiB7XG4gICAgICAgIHNldFVwQXR0cmlidXRlcyh0b29sdGlwVHJpZ2dlcik7XG5cbiAgICAgICAgY29uc3QgeyBib2R5LCB3cmFwcGVyIH0gPSBnZXRUb29sdGlwRWxlbWVudHModG9vbHRpcFRyaWdnZXIpO1xuICAgICAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IGhpZGVUb29sVGlwKGJvZHkpKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVhcmRvd24ocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFRPT0xUSVAsIHJvb3QpLmZvckVhY2goKHRvb2x0aXBXcmFwcGVyKSA9PiB7XG4gICAgICAgIHRvb2x0aXBXcmFwcGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhpZGVUb29sVGlwKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0dXA6IHNldFVwQXR0cmlidXRlcyxcbiAgICBnZXRUb29sdGlwRWxlbWVudHMsXG4gICAgc2hvdzogc2hvd1Rvb2xUaXAsXG4gICAgaGlkZTogaGlkZVRvb2xUaXAsXG4gIH0sXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2x0aXA7XG4iLCJjb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9iZWhhdmlvclwiKTtcbmNvbnN0IHZhbGlkYXRlID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL3V0aWxzL3ZhbGlkYXRlLWlucHV0XCIpO1xuY29uc3QgeyBwcmVmaXg6IFBSRUZJWCB9ID0gcmVxdWlyZShcIi4uLy4uL3Vzd2RzLWNvcmUvc3JjL2pzL2NvbmZpZ1wiKTtcbmNvbnN0IHNlbGVjdE9yTWF0Y2hlcyA9IHJlcXVpcmUoXCIuLi8uLi91c3dkcy1jb3JlL3NyYy9qcy91dGlscy9zZWxlY3Qtb3ItbWF0Y2hlc1wiKTtcblxuY29uc3QgVkFMSURBVEVfSU5QVVQgPVxuICBcImlucHV0W2RhdGEtdmFsaWRhdGlvbi1lbGVtZW50XSx0ZXh0YXJlYVtkYXRhLXZhbGlkYXRpb24tZWxlbWVudF1cIjtcbmNvbnN0IENIRUNLTElTVF9JVEVNID0gYC4ke1BSRUZJWH0tY2hlY2tsaXN0X19pdGVtYDtcblxuLy8gVHJpZ2dlciB2YWxpZGF0aW9uIG9uIGlucHV0IGNoYW5nZVxuY29uc3QgaGFuZGxlQ2hhbmdlID0gKGVsKSA9PiB2YWxpZGF0ZShlbCk7XG5cbi8vIENyZWF0ZSBjb250YWluZXIgdG8gaG9sZCBhcmlhIHJlYWRvdXRcbmNvbnN0IGNyZWF0ZVN0YXR1c0VsZW1lbnQgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbkNvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGU7XG4gIGNvbnN0IGlucHV0SUQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgY29uc3Qgc3RhdHVzU3VtbWFyeUlEID0gYCR7aW5wdXRJRH0tc3Itc3VtbWFyeWA7XG4gIGlucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIiwgc3RhdHVzU3VtbWFyeUlEKTtcblxuICBjb25zdCBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24tc3RhdHVzXCIsIFwiXCIpO1xuICBzdGF0dXNTdW1tYXJ5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ1c2Etc3Itb25seVwiKTtcbiAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxpdmVcIiwgXCJwb2xpdGVcIik7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1hdG9taWNcIiwgdHJ1ZSk7XG4gIHN0YXR1c1N1bW1hcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgc3RhdHVzU3VtbWFyeUlEKTtcbiAgdmFsaWRhdGlvbkNvbnRhaW5lci5hcHBlbmQoc3RhdHVzU3VtbWFyeUNvbnRhaW5lcik7XG59O1xuXG4vLyBTZXQgdXAgY2hlY2tsaXN0IGl0ZW1zIHdpdGggaW5pdGlhbCBhcmlhLWxhYmVsIChpbmNvbXBsZXRlKSB2YWx1ZXNcbmNvbnN0IGNyZWF0ZUluaXRpYWxTdGF0dXMgPSAoaW5wdXQpID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbkNvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGU7XG4gIGNvbnN0IGNoZWNrbGlzdEl0ZW1zID0gdmFsaWRhdGlvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKENIRUNLTElTVF9JVEVNKTtcbiAgY29uc3QgdmFsaWRhdGlvbkVsZW1lbnQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24tZWxlbWVudFwiKTtcblxuICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIHZhbGlkYXRpb25FbGVtZW50KTtcblxuICBjaGVja2xpc3RJdGVtcy5mb3JFYWNoKChsaXN0SXRlbSkgPT4ge1xuICAgIGxldCBjdXJyZW50U3RhdHVzID0gXCJzdGF0dXMgaW5jb21wbGV0ZVwiO1xuICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoXCJkYXRhLXZhbGlkYXRpb24taW5jb21wbGV0ZVwiKSkge1xuICAgICAgY3VycmVudFN0YXR1cyA9IGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsaWRhdGlvbi1pbmNvbXBsZXRlXCIpO1xuICAgIH1cbiAgICBjb25zdCBpdGVtU3RhdHVzID0gYCR7bGlzdEl0ZW0udGV4dENvbnRlbnR9ICR7Y3VycmVudFN0YXR1c30gYDtcbiAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGl0ZW1TdGF0dXMpO1xuICB9KTtcbn07XG5cbmNvbnN0IGVuaGFuY2VWYWxpZGF0aW9uID0gKGlucHV0KSA9PiB7XG4gIGNyZWF0ZVN0YXR1c0VsZW1lbnQoaW5wdXQpO1xuICBjcmVhdGVJbml0aWFsU3RhdHVzKGlucHV0KTtcbn07XG5cbmNvbnN0IHZhbGlkYXRvciA9IGJlaGF2aW9yKFxuICB7XG4gICAgXCJpbnB1dCBjaGFuZ2VcIjoge1xuICAgICAgW1ZBTElEQVRFX0lOUFVUXShldmVudCkge1xuICAgICAgICBoYW5kbGVDaGFuZ2UoZXZlbnQudGFyZ2V0KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluaXQocm9vdCkge1xuICAgICAgc2VsZWN0T3JNYXRjaGVzKFZBTElEQVRFX0lOUFVULCByb290KS5mb3JFYWNoKChpbnB1dCkgPT5cbiAgICAgICAgZW5oYW5jZVZhbGlkYXRpb24oaW5wdXQpLFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0b3I7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHJlZml4OiBcInVzYVwiLFxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBUaGlzIHVzZWQgdG8gYmUgY29uZGl0aW9uYWxseSBkZXBlbmRlbnQgb24gd2hldGhlciB0aGVcbiAgLy8gYnJvd3NlciBzdXBwb3J0ZWQgdG91Y2ggZXZlbnRzOyBpZiBpdCBkaWQsIGBDTElDS2Agd2FzIHNldCB0b1xuICAvLyBgdG91Y2hzdGFydGAuICBIb3dldmVyLCB0aGlzIGhhZCBkb3duc2lkZXM6XG4gIC8vXG4gIC8vICogSXQgcHJlLWVtcHRlZCBtb2JpbGUgYnJvd3NlcnMnIGRlZmF1bHQgYmVoYXZpb3Igb2YgZGV0ZWN0aW5nXG4gIC8vICAgd2hldGhlciBhIHRvdWNoIHR1cm5lZCBpbnRvIGEgc2Nyb2xsLCB0aGVyZWJ5IHByZXZlbnRpbmdcbiAgLy8gICB1c2VycyBmcm9tIHVzaW5nIHNvbWUgb2Ygb3VyIGNvbXBvbmVudHMgYXMgc2Nyb2xsIHN1cmZhY2VzLlxuICAvL1xuICAvLyAqIFNvbWUgZGV2aWNlcywgc3VjaCBhcyB0aGUgTWljcm9zb2Z0IFN1cmZhY2UgUHJvLCBzdXBwb3J0ICpib3RoKlxuICAvLyAgIHRvdWNoIGFuZCBjbGlja3MuIFRoaXMgbWVhbnQgdGhlIGNvbmRpdGlvbmFsIGVmZmVjdGl2ZWx5IGRyb3BwZWRcbiAgLy8gICBzdXBwb3J0IGZvciB0aGUgdXNlcidzIG1vdXNlLCBmcnVzdHJhdGluZyB1c2VycyB3aG8gcHJlZmVycmVkXG4gIC8vICAgaXQgb24gdGhvc2Ugc3lzdGVtcy5cbiAgQ0xJQ0s6IFwiY2xpY2tcIixcbn07XG4iLCJjb25zdCBhY2NvcmRpb24gPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWFjY29yZGlvbi9zcmMvaW5kZXhcIik7XG5jb25zdCBiYW5uZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWJhbm5lci9zcmMvaW5kZXhcIik7XG5jb25zdCBidXR0b24gPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWJ1dHRvbi9zcmMvaW5kZXhcIik7XG5jb25zdCBjaGFyYWN0ZXJDb3VudCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtY2hhcmFjdGVyLWNvdW50L3NyYy9pbmRleFwiKTtcbmNvbnN0IGNvbWJvQm94ID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1jb21iby1ib3gvc3JjL2luZGV4XCIpO1xuY29uc3QgZGF0ZVBpY2tlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtZGF0ZS1waWNrZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgZGF0ZVJhbmdlUGlja2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1kYXRlLXJhbmdlLXBpY2tlci9zcmMvaW5kZXhcIik7XG5jb25zdCBmaWxlSW5wdXQgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLWZpbGUtaW5wdXQvc3JjL2luZGV4XCIpO1xuY29uc3QgZm9vdGVyID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1mb290ZXIvc3JjL2luZGV4XCIpO1xuY29uc3QgaW5QYWdlTmF2aWdhdGlvbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaW4tcGFnZS1uYXZpZ2F0aW9uL3NyYy9pbmRleFwiKTtcbmNvbnN0IGlucHV0TWFzayA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaW5wdXQtbWFzay9zcmMvaW5kZXhcIik7XG5jb25zdCBsYW5ndWFnZVNlbGVjdG9yID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS1sYW5ndWFnZS1zZWxlY3Rvci9zcmMvaW5kZXhcIik7XG5jb25zdCBtb2RhbCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtbW9kYWwvc3JjL2luZGV4XCIpO1xuY29uc3QgbmF2aWdhdGlvbiA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2EtaGVhZGVyL3NyYy9pbmRleFwiKTtcbmNvbnN0IHBhc3N3b3JkID0gcmVxdWlyZShcIi4uLy4uLy4uL191c2EtcGFzc3dvcmQvc3JjL2luZGV4XCIpO1xuY29uc3QgcmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXJhbmdlL3NyYy9pbmRleFwiKTtcbmNvbnN0IHNlYXJjaCA9IHJlcXVpcmUoXCIuLi8uLi8uLi91c2Etc2VhcmNoL3NyYy9pbmRleFwiKTtcbmNvbnN0IHNraXBuYXYgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXNraXBuYXYvc3JjL2luZGV4XCIpO1xuY29uc3QgdGFibGUgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXRhYmxlL3NyYy9pbmRleFwiKTtcbmNvbnN0IHRpbWVQaWNrZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXRpbWUtcGlja2VyL3NyYy9pbmRleFwiKTtcbmNvbnN0IHRvb2x0aXAgPSByZXF1aXJlKFwiLi4vLi4vLi4vdXNhLXRvb2x0aXAvc3JjL2luZGV4XCIpO1xuY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZShcIi4uLy4uLy4uL3VzYS12YWxpZGF0aW9uL3NyYy9pbmRleFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjY29yZGlvbixcbiAgYmFubmVyLFxuICBidXR0b24sXG4gIGNoYXJhY3RlckNvdW50LFxuICBjb21ib0JveCxcbiAgZGF0ZVBpY2tlcixcbiAgZGF0ZVJhbmdlUGlja2VyLFxuICBmaWxlSW5wdXQsXG4gIGZvb3RlcixcbiAgaW5QYWdlTmF2aWdhdGlvbixcbiAgaW5wdXRNYXNrLFxuICBsYW5ndWFnZVNlbGVjdG9yLFxuICBtb2RhbCxcbiAgbmF2aWdhdGlvbixcbiAgcGFzc3dvcmQsXG4gIHJhbmdlLFxuICBzZWFyY2gsXG4gIHNraXBuYXYsXG4gIHRhYmxlLFxuICB0aW1lUGlja2VyLFxuICB0b29sdGlwLFxuICB2YWxpZGF0b3IsXG59O1xuIiwid2luZG93LnVzd2RzUHJlc2VudCA9IHRydWU7IC8vIEdMT0JBTCB2YXJpYWJsZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c3dkcy5qcyBoYXMgbG9hZGVkIGluIHRoZSBET00uXG5cbmNvbnN0IHVzd2RzID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xuXG5jb25zdCBjb21wb25lbnRzID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XG5cbnVzd2RzLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG5jb25zdCBpbml0Q29tcG9uZW50cyA9ICgpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgT2JqZWN0LmtleXMoY29tcG9uZW50cykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3QgYmVoYXZpb3IgPSBjb21wb25lbnRzW2tleV07XG4gICAgYmVoYXZpb3Iub24odGFyZ2V0KTtcbiAgfSk7XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdENvbXBvbmVudHMsIHsgb25jZTogdHJ1ZSB9KTtcbn0gZWxzZSB7XG4gIGluaXRDb21wb25lbnRzKCk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHVzd2RzO1xuZXhwb3J0cy5pbml0Q29tcG9uZW50cyA9IGluaXRDb21wb25lbnRzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoaHRtbERvY3VtZW50ID0gZG9jdW1lbnQpID0+IGh0bWxEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuIiwiY29uc3QgQmVoYXZpb3IgPSByZXF1aXJlKFwicmVjZXB0b3IvYmVoYXZpb3JcIik7XG5cbi8qKlxuICogQG5hbWUgc2VxdWVuY2VcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IHNlcSBhbiBhcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm4geyBjbG9zdXJlIH0gY2FsbEhvb2tzXG4gKi9cbi8vIFdlIHVzZSBhIG5hbWVkIGZ1bmN0aW9uIGhlcmUgYmVjYXVzZSB3ZSB3YW50IGl0IHRvIGluaGVyaXQgaXRzIGxleGljYWwgc2NvcGVcbi8vIGZyb20gdGhlIGJlaGF2aW9yIHByb3BzIG9iamVjdCwgbm90IGZyb20gdGhlIG1vZHVsZVxuY29uc3Qgc2VxdWVuY2UgPSAoLi4uc2VxKSA9PlxuICBmdW5jdGlvbiBjYWxsSG9va3ModGFyZ2V0ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHNlcS5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGhpc1ttZXRob2RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpc1ttZXRob2RdLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuLyoqXG4gKiBAbmFtZSBiZWhhdmlvclxuICogQHBhcmFtIHtvYmplY3R9IGV2ZW50c1xuICogQHBhcmFtIHtvYmplY3Q/fSBwcm9wc1xuICogQHJldHVybiB7cmVjZXB0b3IuYmVoYXZpb3J9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGV2ZW50cywgcHJvcHMpID0+XG4gIEJlaGF2aW9yKGV2ZW50cywge1xuICAgIG9uOiBzZXF1ZW5jZShcImluaXRcIiwgXCJhZGRcIiksXG4gICAgb2ZmOiBzZXF1ZW5jZShcInRlYXJkb3duXCIsIFwicmVtb3ZlXCIpLFxuICAgIC4uLnByb3BzLFxuICB9KTtcbiIsIi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIGV2ZXJ5IFggYW1vdW50IG9mIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuICogQHBhcmFtICB7bnVtYmVyfSBkZWxheSAtIE1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBAZXhhbXBsZSBjb25zdCB1cGRhdGVTdGF0dXMgPSBkZWJvdW5jZSgoc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhzdHJpbmcpLCAyMDAwKVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2UoY2FsbGJhY2ssIGRlbGF5ID0gNTAwKSB7XG4gIGxldCB0aW1lciA9IG51bGw7XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSwgZGVsYXkpO1xuICB9O1xufTtcbiIsImNvbnN0IHsga2V5bWFwIH0gPSByZXF1aXJlKFwicmVjZXB0b3JcIik7XG5jb25zdCBiZWhhdmlvciA9IHJlcXVpcmUoXCIuL2JlaGF2aW9yXCIpO1xuY29uc3Qgc2VsZWN0ID0gcmVxdWlyZShcIi4vc2VsZWN0XCIpO1xuY29uc3QgYWN0aXZlRWxlbWVudCA9IHJlcXVpcmUoXCIuL2FjdGl2ZS1lbGVtZW50XCIpO1xuXG5jb25zdCBGT0NVU0FCTEUgPVxuICAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuXG5jb25zdCB0YWJIYW5kbGVyID0gKGNvbnRleHQpID0+IHtcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBzZWxlY3QoRk9DVVNBQkxFLCBjb250ZXh0KTtcbiAgY29uc3QgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbMF07XG4gIGNvbnN0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cbiAgLy8gU3BlY2lhbCBydWxlcyBmb3Igd2hlbiB0aGUgdXNlciBpcyB0YWJiaW5nIGZvcndhcmQgZnJvbSB0aGUgbGFzdCBmb2N1c2FibGUgZWxlbWVudCxcbiAgLy8gb3Igd2hlbiB0YWJiaW5nIGJhY2t3YXJkcyBmcm9tIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudFxuICBmdW5jdGlvbiB0YWJBaGVhZChldmVudCkge1xuICAgIGlmIChhY3RpdmVFbGVtZW50KCkgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGFiQmFjayhldmVudCkge1xuICAgIGlmIChhY3RpdmVFbGVtZW50KCkgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIFRoaXMgY2hlY2tzIGlmIHlvdSB3YW50IHRvIHNldCB0aGUgaW5pdGlhbCBmb2N1cyB0byBhIGNvbnRhaW5lclxuICAgIC8vIGluc3RlYWQgb2YgYW4gZWxlbWVudCB3aXRoaW4sIGFuZCB0aGUgdXNlciB0YWJzIGJhY2suXG4gICAgLy8gVGhlbiB3ZSBzZXQgdGhlIGZvY3VzIHRvIHRoZSBmaXJzdFxuICAgIGVsc2UgaWYgKCFmb2N1c2FibGVFbGVtZW50cy5pbmNsdWRlcyhhY3RpdmVFbGVtZW50KCkpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBmaXJzdFRhYlN0b3AsXG4gICAgbGFzdFRhYlN0b3AsXG4gICAgdGFiQWhlYWQsXG4gICAgdGFiQmFjayxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGNvbnRleHQsIGFkZGl0aW9uYWxLZXlCaW5kaW5ncyA9IHt9KSA9PiB7XG4gIGNvbnN0IHRhYkV2ZW50SGFuZGxlciA9IHRhYkhhbmRsZXIoY29udGV4dCk7XG4gIGNvbnN0IGJpbmRpbmdzID0gYWRkaXRpb25hbEtleUJpbmRpbmdzO1xuICBjb25zdCB7IEVzYywgRXNjYXBlIH0gPSBiaW5kaW5ncztcblxuICBpZiAoRXNjYXBlICYmICFFc2MpIGJpbmRpbmdzLkVzYyA9IEVzY2FwZTtcblxuICAvLyAgVE9ETzogSW4gdGhlIGZ1dHVyZSwgbG9vcCBvdmVyIGFkZGl0aW9uYWwga2V5YmluZGluZ3MgYW5kIHBhc3MgYW4gYXJyYXlcbiAgLy8gb2YgZnVuY3Rpb25zLCBpZiBuZWNlc3NhcnksIHRvIHRoZSBtYXAga2V5cy4gVGhlbiBwZW9wbGUgaW1wbGVtZW50aW5nXG4gIC8vIHRoZSBmb2N1cyB0cmFwIGNvdWxkIHBhc3MgY2FsbGJhY2tzIHRvIGZpcmUgd2hlbiB0YWJiaW5nXG4gIGNvbnN0IGtleU1hcHBpbmdzID0ga2V5bWFwKHtcbiAgICBUYWI6IHRhYkV2ZW50SGFuZGxlci50YWJBaGVhZCxcbiAgICBcIlNoaWZ0K1RhYlwiOiB0YWJFdmVudEhhbmRsZXIudGFiQmFjayxcbiAgICAuLi5hZGRpdGlvbmFsS2V5QmluZGluZ3MsXG4gIH0pO1xuXG4gIGNvbnN0IGZvY3VzVHJhcCA9IGJlaGF2aW9yKFxuICAgIHtcbiAgICAgIGtleWRvd246IGtleU1hcHBpbmdzLFxuICAgIH0sXG4gICAge1xuICAgICAgaW5pdCgpIHtcbiAgICAgICAgLy8gVE9ETzogaXMgdGhpcyBkZXNpcmVhYmxlIGJlaGF2aW9yPyBTaG91bGQgdGhlIHRyYXAgYWx3YXlzIGRvIHRoaXMgYnkgZGVmYXVsdCBvciBzaG91bGRcbiAgICAgICAgLy8gdGhlIGNvbXBvbmVudCBnZXR0aW5nIGRlY29yYXRlZCBoYW5kbGUgdGhpcz9cbiAgICAgICAgaWYgKHRhYkV2ZW50SGFuZGxlci5maXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICB0YWJFdmVudEhhbmRsZXIuZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGRhdGUoaXNBY3RpdmUpIHtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5vbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub2ZmKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gZm9jdXNUcmFwO1xufTtcbiIsIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NTU3NDMzXG5mdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0KFxuICBlbCxcbiAgd2luID0gd2luZG93LFxuICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbikge1xuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgcmV0dXJuIChcbiAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICByZWN0LmJvdHRvbSA8PSAod2luLmlubmVySGVpZ2h0IHx8IGRvY0VsLmNsaWVudEhlaWdodCkgJiZcbiAgICByZWN0LnJpZ2h0IDw9ICh3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbC5jbGllbnRXaWR0aClcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VsZW1lbnRJblZpZXdwb3J0O1xuIiwiLy8gaU9TIGRldGVjdGlvbiBmcm9tOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS85MDM5ODg1LzE3NzcxMFxuZnVuY3Rpb24gaXNJb3NEZXZpY2UoKSB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oaVBvZHxpUGhvbmV8aVBhZCkvZykgfHxcbiAgICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSkgJiZcbiAgICAhd2luZG93Lk1TU3RyZWFtXG4gICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJb3NEZXZpY2U7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuXG4vKipcbiAqIEEgc2ltcGxlIGxpYnJhcnkgdG8gaGVscCB5b3UgZXNjYXBlIEhUTUwgdXNpbmcgdGVtcGxhdGUgc3RyaW5ncy5cbiAqXG4gKiBJdCdzIHRoZSBjb3VudGVycGFydCB0byBvdXIgZXNsaW50IFwibm8tdW5zYWZlLWlubmVyaHRtbFwiIHBsdWdpbiB0aGF0IGhlbHBzIHVzXG4gKiBhdm9pZCB1bnNhZmUgY29kaW5nIHByYWN0aWNlcy5cbiAqIEEgZnVsbCB3cml0ZS11cCBvZiB0aGUgSG93cyBhbmQgV2h5cyBhcmUgZG9jdW1lbnRlZFxuICogZm9yIGRldmVsb3BlcnMgYXRcbiAqICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9GaXJlZm94X09TL1NlY3VyaXR5L1NlY3VyaXR5X0F1dG9tYXRpb25cbiAqIHdpdGggYWRkaXRpb25hbCBiYWNrZ3JvdW5kIGluZm9ybWF0aW9uIGFuZCBkZXNpZ24gZG9jcyBhdFxuICogIGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9Vc2VyOkZicmF1bi9HYWlhL1NhZmVpbm5lckhUTUxSb2FkbWFwXG4gKlxuICovXG5cbiEoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG59KShmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBTYW5pdGl6ZXIgPSB7XG4gICAgX2VudGl0eTogL1smPD5cIicvXS9nLFxuXG4gICAgX2VudGl0aWVzOiB7XG4gICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgIFwiJ1wiOiBcIiZhcG9zO1wiLFxuICAgICAgXCIvXCI6IFwiJiN4MkY7XCIsXG4gICAgfSxcblxuICAgIGdldEVudGl0eTogZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBTYW5pdGl6ZXIuX2VudGl0aWVzW3NdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVzIEhUTUwgZm9yIGFsbCB2YWx1ZXMgaW4gYSB0YWdnZWQgdGVtcGxhdGUgc3RyaW5nLlxuICAgICAqL1xuICAgIGVzY2FwZUhUTUw6IGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBzdHJpbmdzW2ldO1xuICAgICAgICBpZiAoaSArIDEgPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzW2kgKyAxXSB8fCBcIlwiO1xuICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcodmFsdWUpLnJlcGxhY2UoXG4gICAgICAgICAgICBTYW5pdGl6ZXIuX2VudGl0eSxcbiAgICAgICAgICAgIFNhbml0aXplci5nZXRFbnRpdHksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRXNjYXBlcyBIVE1MIGFuZCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdG8gYmUgdXNlZCBkdXJpbmcgRE9NIGluc2VydGlvblxuICAgICAqL1xuICAgIGNyZWF0ZVNhZmVIVE1MOiBmdW5jdGlvbiAoc3RyaW5ncykge1xuICAgICAgdmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCk7XG4gICAgICBmb3IgKHZhciBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICB2YWx1ZXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgZXNjYXBlZCA9IFNhbml0aXplci5lc2NhcGVIVE1MLmFwcGx5KFxuICAgICAgICBTYW5pdGl6ZXIsXG4gICAgICAgIFtzdHJpbmdzXS5jb25jYXQodmFsdWVzKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2h0bWw6IGVzY2FwZWQsXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFwiW29iamVjdCBXcmFwcGVkSFRNTE9iamVjdF1cIjtcbiAgICAgICAgfSxcbiAgICAgICAgaW5mbzpcbiAgICAgICAgICBcIlRoaXMgaXMgYSB3cmFwcGVkIEhUTUwgb2JqZWN0LiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vclwiICtcbiAgICAgICAgICBcImcvZW4tVVMvRmlyZWZveF9PUy9TZWN1cml0eS9TZWN1cml0eV9BdXRvbWF0aW9uIGZvciBtb3JlLlwiLFxuICAgICAgfTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFVud3JhcCBzYWZlIEhUTUwgY3JlYXRlZCBieSBjcmVhdGVTYWZlSFRNTCBvciBhIGN1c3RvbSByZXBsYWNlbWVudCB0aGF0XG4gICAgICogdW5kZXJ3ZW50IHNlY3VyaXR5IHJldmlldy5cbiAgICAgKi9cbiAgICB1bndyYXBTYWZlSFRNTDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgdmFyIGh0bWxPYmplY3RzID0gbmV3IEFycmF5KF9sZW4pO1xuICAgICAgZm9yICh2YXIgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgaHRtbE9iamVjdHNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXJrdXBMaXN0ID0gaHRtbE9iamVjdHMubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5fX2h0bWw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXJrdXBMaXN0LmpvaW4oXCJcIik7XG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gU2FuaXRpemVyO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCkge1xuICAvLyBDcmVhdGluZyBpbnZpc2libGUgY29udGFpbmVyXG4gIGNvbnN0IG91dGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgb3V0ZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gXCJzY3JvbGxcIjsgLy8gZm9yY2luZyBzY3JvbGxiYXIgdG8gYXBwZWFyXG4gIG91dGVyLnN0eWxlLm1zT3ZlcmZsb3dTdHlsZSA9IFwic2Nyb2xsYmFyXCI7IC8vIG5lZWRlZCBmb3IgV2luSlMgYXBwc1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG91dGVyKTtcblxuICAvLyBDcmVhdGluZyBpbm5lciBlbGVtZW50IGFuZCBwbGFjaW5nIGl0IGluIHRoZSBjb250YWluZXJcbiAgY29uc3QgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG5cbiAgLy8gQ2FsY3VsYXRpbmcgZGlmZmVyZW5jZSBiZXR3ZWVuIGNvbnRhaW5lcidzIGZ1bGwgd2lkdGggYW5kIHRoZSBjaGlsZCB3aWR0aFxuICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IGAke291dGVyLm9mZnNldFdpZHRoIC0gaW5uZXIub2Zmc2V0V2lkdGh9cHhgO1xuXG4gIC8vIFJlbW92aW5nIHRlbXBvcmFyeSBlbGVtZW50cyBmcm9tIHRoZSBET01cbiAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG5cbiAgcmV0dXJuIHNjcm9sbGJhcldpZHRoO1xufTtcbiIsImNvbnN0IHNlbGVjdCA9IHJlcXVpcmUoXCIuL3NlbGVjdFwiKTtcbi8qKlxuICogQG5hbWUgaXNFbGVtZW50XG4gKiBAZGVzYyByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIERPTSBlbGVtZW50LlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0VsZW1lbnQgPSAodmFsdWUpID0+XG4gIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcblxuLyoqXG4gKiBAbmFtZSBzZWxlY3RPck1hdGNoZXNcbiAqIEBkZXNjIHNlbGVjdHMgZWxlbWVudHMgZnJvbSB0aGUgRE9NIGJ5IGNsYXNzIHNlbGVjdG9yIG9yIElEIHNlbGVjdG9yLlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIC0gVGhlIHNlbGVjdG9yIHRvIHRyYXZlcnNlIHRoZSBET00gd2l0aC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR8SFRNTEVsZW1lbnQ/fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgdG8gdHJhdmVyc2UgdGhlIERPTVxuICogICBpbi4gSWYgbm90IHByb3ZpZGVkLCBpdCBkZWZhdWx0cyB0byB0aGUgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfSAtIEFuIGFycmF5IG9mIERPTSBub2RlcyBvciBhbiBlbXB0eSBhcnJheS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoc2VsZWN0b3IsIGNvbnRleHQpID0+IHtcbiAgY29uc3Qgc2VsZWN0aW9uID0gc2VsZWN0KHNlbGVjdG9yLCBjb250ZXh0KTtcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cblxuICBpZiAoaXNFbGVtZW50KGNvbnRleHQpICYmIGNvbnRleHQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICBzZWxlY3Rpb24ucHVzaChjb250ZXh0KTtcbiAgfVxuXG4gIHJldHVybiBzZWxlY3Rpb247XG59O1xuIiwiLyoqXG4gKiBAbmFtZSBpc0VsZW1lbnRcbiAqIEBkZXNjIHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgRE9NIGVsZW1lbnQuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzRWxlbWVudCA9ICh2YWx1ZSkgPT5cbiAgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xuXG4vKipcbiAqIEBuYW1lIHNlbGVjdFxuICogQGRlc2Mgc2VsZWN0cyBlbGVtZW50cyBmcm9tIHRoZSBET00gYnkgY2xhc3Mgc2VsZWN0b3Igb3IgSUQgc2VsZWN0b3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgLSBUaGUgc2VsZWN0b3IgdG8gdHJhdmVyc2UgdGhlIERPTSB3aXRoLlxuICogQHBhcmFtIHtEb2N1bWVudHxIVE1MRWxlbWVudD99IGNvbnRleHQgLSBUaGUgY29udGV4dCB0byB0cmF2ZXJzZSB0aGUgRE9NXG4gKiAgIGluLiBJZiBub3QgcHJvdmlkZWQsIGl0IGRlZmF1bHRzIHRvIHRoZSBkb2N1bWVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IC0gQW4gYXJyYXkgb2YgRE9NIG5vZGVzIG9yIGFuIGVtcHR5IGFycmF5LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChzZWxlY3RvciwgY29udGV4dCkgPT4ge1xuICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0IHx8ICFpc0VsZW1lbnQoY29udGV4dCkpIHtcbiAgICBjb250ZXh0ID0gd2luZG93LmRvY3VtZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIH1cblxuICBjb25zdCBzZWxlY3Rpb24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VsZWN0aW9uKTtcbn07XG4iLCIvKipcbiAqIEZsaXBzIGdpdmVuIElOUFVUIGVsZW1lbnRzIGJldHdlZW4gbWFza2VkIChoaWRpbmcgdGhlIGZpZWxkIHZhbHVlKSBhbmQgdW5tYXNrZWRcbiAqIEBwYXJhbSB7QXJyYXkuSFRNTEVsZW1lbnR9IGZpZWxkcyAtIEFuIGFycmF5IG9mIElOUFVUIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG1hc2sgLSBXaGV0aGVyIHRoZSBtYXNrIHNob3VsZCBiZSBhcHBsaWVkLCBoaWRpbmcgdGhlIGZpZWxkIHZhbHVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGZpZWxkLCBtYXNrKSA9PiB7XG4gIGZpZWxkLnNldEF0dHJpYnV0ZShcImF1dG9jYXBpdGFsaXplXCIsIFwib2ZmXCIpO1xuICBmaWVsZC5zZXRBdHRyaWJ1dGUoXCJhdXRvY29ycmVjdFwiLCBcIm9mZlwiKTtcbiAgZmllbGQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBtYXNrID8gXCJwYXNzd29yZFwiIDogXCJ0ZXh0XCIpO1xufTtcbiIsImNvbnN0IHJlc29sdmVJZFJlZnMgPSByZXF1aXJlKFwicmVzb2x2ZS1pZC1yZWZzXCIpO1xuY29uc3QgdG9nZ2xlRmllbGRNYXNrID0gcmVxdWlyZShcIi4vdG9nZ2xlLWZpZWxkLW1hc2tcIik7XG5cbmNvbnN0IENPTlRST0xTID0gXCJhcmlhLWNvbnRyb2xzXCI7XG5jb25zdCBQUkVTU0VEID0gXCJhcmlhLXByZXNzZWRcIjtcbmNvbnN0IFNIT1dfQVRUUiA9IFwiZGF0YS1zaG93LXRleHRcIjtcbmNvbnN0IEhJREVfQVRUUiA9IFwiZGF0YS1oaWRlLXRleHRcIjtcblxuLyoqXG4gKiBSZXBsYWNlIHRoZSB3b3JkIFwiU2hvd1wiIChvciBcInNob3dcIikgd2l0aCBcIkhpZGVcIiAob3IgXCJoaWRlXCIpIGluIGEgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHNob3dUZXh0XG4gKiBAcmV0dXJuIHtzdHJvbmd9IGhpZGVUZXh0XG4gKi9cbmNvbnN0IGdldEhpZGVUZXh0ID0gKHNob3dUZXh0KSA9PlxuICBzaG93VGV4dC5yZXBsYWNlKC9cXGJTaG93XFxiL2ksIChzaG93KSA9PiBgJHtzaG93WzBdID09PSBcIlNcIiA/IFwiSFwiIDogXCJoXCJ9aWRlYCk7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZGVjb3JhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoIHRoZSBhYmlsaXR5IHRvIHRvZ2dsZSB0aGVcbiAqIG1hc2tlZCBzdGF0ZSBvZiBhbiBpbnB1dCBmaWVsZCAobGlrZSBhIHBhc3N3b3JkKSB3aGVuIGNsaWNrZWQuXG4gKiBUaGUgaWRzIG9mIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkIHdpbGwgYmUgcHVsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGJ1dHRvbidzXG4gKiBgYXJpYS1jb250cm9sc2AgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbCAgICBQYXJlbnQgZWxlbWVudCBjb250YWluaW5nIHRoZSBmaWVsZHMgdG8gYmUgbWFza2VkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChlbCkgPT4ge1xuICAvLyB0aGlzIGlzIHRoZSAqdGFyZ2V0KiBzdGF0ZTpcbiAgLy8gKiBpZiB0aGUgZWxlbWVudCBoYXMgdGhlIGF0dHIgYW5kIGl0J3MgIT09IFwidHJ1ZVwiLCBwcmVzc2VkIGlzIHRydWVcbiAgLy8gKiBvdGhlcndpc2UsIHByZXNzZWQgaXMgZmFsc2VcbiAgY29uc3QgcHJlc3NlZCA9XG4gICAgZWwuaGFzQXR0cmlidXRlKFBSRVNTRUQpICYmIGVsLmdldEF0dHJpYnV0ZShQUkVTU0VEKSAhPT0gXCJ0cnVlXCI7XG5cbiAgY29uc3QgZmllbGRzID0gcmVzb2x2ZUlkUmVmcyhlbC5nZXRBdHRyaWJ1dGUoQ09OVFJPTFMpKTtcbiAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB0b2dnbGVGaWVsZE1hc2soZmllbGQsIHByZXNzZWQpKTtcblxuICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShTSE9XX0FUVFIpKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFNIT1dfQVRUUiwgZWwudGV4dENvbnRlbnQpO1xuICB9XG5cbiAgY29uc3Qgc2hvd1RleHQgPSBlbC5nZXRBdHRyaWJ1dGUoU0hPV19BVFRSKTtcbiAgY29uc3QgaGlkZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoSElERV9BVFRSKSB8fCBnZXRIaWRlVGV4dChzaG93VGV4dCk7XG5cbiAgZWwudGV4dENvbnRlbnQgPSBwcmVzc2VkID8gc2hvd1RleHQgOiBoaWRlVGV4dDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBlbC5zZXRBdHRyaWJ1dGUoUFJFU1NFRCwgcHJlc3NlZCk7XG4gIHJldHVybiBwcmVzc2VkO1xufTtcbiIsImNvbnN0IEVYUEFOREVEID0gXCJhcmlhLWV4cGFuZGVkXCI7XG5jb25zdCBDT05UUk9MUyA9IFwiYXJpYS1jb250cm9sc1wiO1xuY29uc3QgSElEREVOID0gXCJoaWRkZW5cIjtcblxubW9kdWxlLmV4cG9ydHMgPSAoYnV0dG9uLCBleHBhbmRlZCkgPT4ge1xuICBsZXQgc2FmZUV4cGFuZGVkID0gZXhwYW5kZWQ7XG5cbiAgaWYgKHR5cGVvZiBzYWZlRXhwYW5kZWQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgc2FmZUV4cGFuZGVkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShFWFBBTkRFRCkgPT09IFwiZmFsc2VcIjtcbiAgfVxuXG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoRVhQQU5ERUQsIHNhZmVFeHBhbmRlZCk7XG5cbiAgY29uc3QgaWQgPSBidXR0b24uZ2V0QXR0cmlidXRlKENPTlRST0xTKTtcbiAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gIGlmICghY29udHJvbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHRvZ2dsZSB0YXJnZXQgZm91bmQgd2l0aCBpZDogXCIke2lkfVwiYCk7XG4gIH1cblxuICBpZiAoc2FmZUV4cGFuZGVkKSB7XG4gICAgY29udHJvbHMucmVtb3ZlQXR0cmlidXRlKEhJRERFTik7XG4gIH0gZWxzZSB7XG4gICAgY29udHJvbHMuc2V0QXR0cmlidXRlKEhJRERFTiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gc2FmZUV4cGFuZGVkO1xufTtcbiIsImNvbnN0IGRlYm91bmNlID0gcmVxdWlyZShcIi4vZGVib3VuY2VcIik7XG5jb25zdCB7IHByZWZpeDogUFJFRklYIH0gPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xuXG5jb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7UFJFRklYfS1jaGVja2xpc3RfX2l0ZW0tLWNoZWNrZWRgO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbGlkYXRlKGVsKSB7XG4gIGNvbnN0IGlkID0gZWwuZGF0YXNldC52YWxpZGF0aW9uRWxlbWVudDtcbiAgY29uc3QgY2hlY2tMaXN0ID1cbiAgICBpZC5jaGFyQXQoMCkgPT09IFwiI1wiXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpXG4gICAgICA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICBpZiAoIWNoZWNrTGlzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gdmFsaWRhdGlvbiBlbGVtZW50IGZvdW5kIHdpdGggaWQ6IFwiJHtpZH1cImApO1xuICB9XG5cbiAgbGV0IHN0YXR1c1N1bW1hcnkgPSBcIlwiO1xuICBPYmplY3QuZW50cmllcyhlbC5kYXRhc2V0KS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJ2YWxpZGF0ZVwiKSkge1xuICAgICAgY29uc3QgdmFsaWRhdG9yTmFtZSA9IGtleS5zdWJzdHIoXCJ2YWxpZGF0ZVwiLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclBhdHRlcm4gPSBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRvclNlbGVjdG9yID0gYFtkYXRhLXZhbGlkYXRvcj1cIiR7dmFsaWRhdG9yTmFtZX1cIl1gO1xuICAgICAgY29uc3QgdmFsaWRhdG9yQ2hlY2tib3ggPSBjaGVja0xpc3QucXVlcnlTZWxlY3Rvcih2YWxpZGF0b3JTZWxlY3Rvcik7XG4gICAgICBjb25zdCB2YWxpZGF0b3JQYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgY29uc3Qgc3RhdHVzU3VtbWFyeUNvbnRhaW5lciA9IHZhbGlkYXRvclBhcmVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtdmFsaWRhdGlvbi1zdGF0dXNdYCxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWxpZGF0b3JQYXR0ZXJuLnRlc3QoZWwudmFsdWUpO1xuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guY2xhc3NMaXN0LnRvZ2dsZShDSEVDS0VEX0NMQVNTLCBjaGVja2VkKTtcblxuICAgICAgaWYgKCF2YWxpZGF0b3JDaGVja2JveCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHZhbGlkYXRvciBjaGVja2JveCBmb3VuZCBmb3I6IFwiJHt2YWxpZGF0b3JOYW1lfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBzdGF0dXMgcmVwb3J0cyBmb3IgY2hlY2tsaXN0IGl0ZW1zXG4gICAgICBjb25zdCBzdGF0dXNDb21wbGV0ZSA9IGVsLmRhdGFzZXQudmFsaWRhdGlvbkNvbXBsZXRlIHx8IFwic3RhdHVzIGNvbXBsZXRlXCI7XG4gICAgICBjb25zdCBzdGF0dXNJbmNvbXBsZXRlID1cbiAgICAgICAgZWwuZGF0YXNldC52YWxpZGF0aW9uSW5jb21wbGV0ZSB8fCBcInN0YXR1cyBpbmNvbXBsZXRlXCI7XG4gICAgICBsZXQgY2hlY2tib3hDb250ZW50ID0gYCR7dmFsaWRhdG9yQ2hlY2tib3gudGV4dENvbnRlbnR9IGA7XG5cbiAgICAgIGlmICh2YWxpZGF0b3JDaGVja2JveC5jbGFzc0xpc3QuY29udGFpbnMoQ0hFQ0tFRF9DTEFTUykpIHtcbiAgICAgICAgY2hlY2tib3hDb250ZW50ICs9IHN0YXR1c0NvbXBsZXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hlY2tib3hDb250ZW50ICs9IHN0YXR1c0luY29tcGxldGU7XG4gICAgICB9XG5cbiAgICAgIC8vIG1vdmUgc3RhdHVzIHVwZGF0ZXMgdG8gYXJpYS1sYWJlbCBvbiBjaGVja2xpc3QgaXRlbVxuICAgICAgdmFsaWRhdG9yQ2hlY2tib3guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBjaGVja2JveENvbnRlbnQpO1xuXG4gICAgICAvLyBDcmVhdGUgYSBzdW1tYXJ5IG9mIHN0YXR1cyBmb3IgYWxsIGNoZWNrbGlzdCBpdGVtc1xuICAgICAgc3RhdHVzU3VtbWFyeSArPSBgJHtjaGVja2JveENvbnRlbnR9LiBgO1xuXG4gICAgICAvLyBBZGQgc3VtbWFyeSB0byBzY3JlZW4gcmVhZGVyIHN1bW1hcnkgY29udGFpbmVyLCBhZnRlciBhIGRlbGF5XG4gICAgICBjb25zdCBzclVwZGF0ZVN0YXR1cyA9IGRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgc3RhdHVzU3VtbWFyeUNvbnRhaW5lci50ZXh0Q29udGVudCA9IHN0YXR1c1N1bW1hcnk7XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgc3JVcGRhdGVTdGF0dXMoKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
