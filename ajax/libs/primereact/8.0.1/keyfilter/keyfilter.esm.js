import { DomHandler } from 'primereact/utils';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var KeyFilter = {
  /* eslint-disable */
  DEFAULT_MASKS: {
    pint: /[\d]/,
    "int": /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
  },

  /* eslint-enable */
  KEYS: {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
  },
  SAFARI_KEYS: {
    63234: 37,
    // left
    63235: 39,
    // right
    63232: 38,
    // up
    63233: 40,
    // down
    63276: 33,
    // page up
    63277: 34,
    // page down
    63272: 46,
    // delete
    63273: 36,
    // home
    63275: 35 // end

  },
  isNavKeyPress: function isNavKeyPress(e) {
    var k = e.keyCode;
    k = DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
    return k >= 33 && k <= 40 || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
  },
  isSpecialKey: function isSpecialKey(e) {
    var k = e.keyCode;
    return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || k >= 18 && k <= 20 || DomHandler.getBrowser().opera && !e.shiftKey && (k === 8 || k >= 33 && k <= 35 || k >= 36 && k <= 39 || k >= 44 && k <= 45);
  },
  getKey: function getKey(e) {
    var k = e.keyCode || e.charCode;
    return DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
  },
  getCharCode: function getCharCode(e) {
    return e.charCode || e.keyCode || e.which;
  },
  getRegex: function getRegex(keyfilter) {
    return KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
  },
  onKeyPress: function onKeyPress(e, keyfilter, validateOnly) {
    if (validateOnly) {
      return;
    }

    var regex = this.getRegex(keyfilter);
    var browser = DomHandler.getBrowser();

    if (e.ctrlKey || e.altKey) {
      return;
    }

    var k = this.getKey(e);

    if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || k === KeyFilter.KEYS.DELETE && e.charCode === 0)) {
      return;
    }

    var c = this.getCharCode(e);
    var cc = String.fromCharCode(c);

    if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
      return;
    }

    if (!regex.test(cc)) {
      e.preventDefault();
    }
  },
  onPaste: function onPaste(e, keyfilter, validateOnly) {
    if (validateOnly) {
      return;
    }

    var regex = this.getRegex(keyfilter);
    var clipboard = e.clipboardData.getData("text"); // loop over each letter pasted and if any fail prevent the paste

    _toConsumableArray(clipboard).forEach(function (c) {
      if (!regex.test(c)) {
        e.preventDefault();
        return false;
      }
    });
  },
  validate: function validate(e, keyfilter) {
    var value = e.target.value,
        validatePattern = true;

    if (value && !keyfilter.test(value)) {
      validatePattern = false;
    }

    return validatePattern;
  }
};

export { KeyFilter };
