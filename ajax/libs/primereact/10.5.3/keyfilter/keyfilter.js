this.primereact = this.primereact || {};
this.primereact.keyfilter = (function (exports, utils) {
  'use strict';

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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
    /* eslint-enable */getRegex: function getRegex(keyfilter) {
      return KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
    },
    onBeforeInput: function onBeforeInput(e, keyfilter, validateOnly) {
      // android devices must use beforeinput https://stackoverflow.com/questions/36753548/keycode-on-android-is-always-229
      if (validateOnly || !utils.DomHandler.isAndroid()) {
        return;
      }
      this.validateKey(e, e.data, keyfilter);
    },
    onKeyPress: function onKeyPress(e, keyfilter, validateOnly) {
      // non android devices use keydown
      if (validateOnly || utils.DomHandler.isAndroid()) {
        return;
      }
      if (e.ctrlKey || e.altKey) {
        return;
      }
      this.validateKey(e, e.key, keyfilter);
    },
    onPaste: function onPaste(e, keyfilter, validateOnly) {
      if (validateOnly) {
        return;
      }
      var regex = this.getRegex(keyfilter);
      var clipboard = e.clipboardData.getData('text');

      // loop over each letter pasted and if any fail prevent the paste
      _toConsumableArray(clipboard).forEach(function (c) {
        if (!regex.test(c)) {
          e.preventDefault();
          return false;
        }
      });
    },
    validateKey: function validateKey(e, key, keyfilter) {
      if (key === null || key === undefined) {
        return;
      }
      var isPrintableKey = key.length === 1;
      if (!isPrintableKey) {
        return;
      }
      var regex = this.getRegex(keyfilter);
      if (!regex.test(key)) {
        e.preventDefault();
      }
    },
    validate: function validate(e, keyfilter) {
      var value = e.target.value,
        validatePattern = true;
      var regex = this.getRegex(keyfilter);
      if (value && !regex.test(value)) {
        validatePattern = false;
      }
      return validatePattern;
    }
  };

  exports.KeyFilter = KeyFilter;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, primereact.utils);
