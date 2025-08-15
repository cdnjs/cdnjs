this.primereact = this.primereact || {};
this.primereact.keyfilter = (function (exports, utils) {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }

  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
      if (e.ctrlKey || e.altKey || e.metaKey) {
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

      // some AZERTY keys come in with 2 chars like ´ç if Dead key is pressed first
      var isPrintableKey = key.length <= 2;
      if (!isPrintableKey) {
        return;
      }
      var regex = this.getRegex(keyfilter);
      if (!regex.test(key)) {
        e.preventDefault();
      }
    },
    validate: function validate(e, keyfilter) {
      var value = e.target.value;
      var validatePattern = true;
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
