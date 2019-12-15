(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueMask = {})));
}(this, (function (exports) { 'use strict';

function format (data, mask) {
  if (!mask) return data;

  var maskStartRegExp = /^([^#ANX]+)/;

  if (+data.length === 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  var text = '';

  var cOffset = 0;

  for (var i = 0; i < mask.length; i += 1) {
    var m = mask.charAt(i);
    switch (m) {
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
        data = data.replace(m, '');
    }
  }
  for (var _i = 0, x = 1; x && _i < mask.length; _i += 1) {
    var c = data.charAt(_i - cOffset);
    var _m = mask.charAt(_i);

    switch (_m) {
      case '#':
        /\d/.test(c) ? text += c : x = 0;
        break;
      case 'A':
        /[a-z]/i.test(c) ? text += c : x = 0;
        break;
      case 'N':
        /[a-z0-9]/i.test(c) ? text += c : x = 0;
        break;

      case '?':
        cOffset += 1;
        break;
      case 'X':
        text += c;
        break;
      default:
        text += _m;

        if (c && c !== _m) {
          data = ' ' + data;
        }

        break;
    }
  }
  return text;
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
