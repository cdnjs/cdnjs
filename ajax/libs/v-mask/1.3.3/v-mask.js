(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueMask = {})));
}(this, (function (exports) { 'use strict';

  function format (text, wholeMask) {
    if (!wholeMask) return text;

    var maskStartRegExp = /^([^#ANX]+)/;

    if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
      text = maskStartRegExp.exec(wholeMask)[0] + text;
    }

    var newText = '';
    var charOffset = 0;

    for (var maskIndex = 0; maskIndex < wholeMask.length; maskIndex += 1) {
      var mask = wholeMask.charAt(maskIndex);
      switch (mask) {
        case '#':
          break;
        case 'A':
          break;
        case '?':
          break;
        case 'N':
          break;
        case 'X':
          break;
        default:
          text = text.replace(mask, '');
      }
    }
    for (var _maskIndex = 0, x = 1; x && _maskIndex < wholeMask.length; _maskIndex += 1) {
      var char = text.charAt(_maskIndex - charOffset);
      var _mask = wholeMask.charAt(_maskIndex);

      switch (_mask) {
        case '#':
          /\d/.test(char) ? newText += char : x = 0;
          break;
        case 'A':
          /[a-z]/i.test(char) ? newText += char : x = 0;
          break;
        case 'N':
          /[a-z0-9]/i.test(char) ? newText += char : x = 0;
          break;

        case '?':
          charOffset += 1;
          break;
        case 'X':
          newText += char;
          break;
        default:
          newText += _mask;

          if (char && char !== _mask) {
            text = ' ' + text;
          }

          break;
      }
    }
    return newText;
  }

  var trigger = function trigger(el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  };

  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

  function updateValue(el) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var value = el.value,
        _el$dataset = el.dataset,
        _el$dataset$previousV = _el$dataset.previousValue,
        previousValue = _el$dataset$previousV === undefined ? '' : _el$dataset$previousV,
        mask = _el$dataset.mask;


    if (force || value && value !== previousValue && value.length > previousValue.length) {
      el.value = format(value, mask);
      if (isAndroid && isChrome) {
        setTimeout(function () {
          return trigger(el, 'input');
        }, 0);
      } else {
        trigger(el, 'input');
      }
    }

    el.dataset.previousValue = value;
  }

  function updateMask(el, mask) {
    el.dataset.mask = mask;
  }

  var directive = {
    bind: function bind(el, _ref) {
      var value = _ref.value;

      updateMask(el, value);
      updateValue(el);
    },
    componentUpdated: function componentUpdated(el, _ref2) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;

      var isMaskChanged = value !== oldValue;

      if (isMaskChanged) {
        updateMask(el, value);
      }

      updateValue(el, isMaskChanged);
    }
  };

  var plugin = (function (Vue) {
    Vue.directive('mask', directive);
  });

  exports.default = plugin;
  exports.VueMaskPlugin = plugin;
  exports.VueMaskDirective = directive;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
