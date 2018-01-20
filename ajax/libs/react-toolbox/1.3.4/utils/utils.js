'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  angleFromPositions: function angleFromPositions(cx, cy, ex, ey) {
    var theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
    return theta * 180 / Math.PI;
  },
  angle360FromPositions: function angle360FromPositions(cx, cy, ex, ey) {
    var angle = this.angleFromPositions(cx, cy, ex, ey);
    return angle < 0 ? 360 + angle : angle;
  },
  range: function range() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var _start = 0,
        _stop = start;

    if (stop !== null) {
      _start = start;
      _stop = stop;
    }
    var length = Math.max(Math.ceil((_stop - _start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
  },
  round: function round(number, decimals) {
    if (!isNaN(parseFloat(number)) && isFinite(number)) {
      var decimalPower = Math.pow(10, decimals);
      return Math.round(parseFloat(number) * decimalPower) / decimalPower;
    }
    return NaN;
  },
  getViewport: function getViewport() {
    return {
      height: window.innerHeight || document.documentElement.offsetHeight,
      width: window.innerWidth || document.documentElement.offsetWidth
    };
  },
  cloneObject: function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  },
  inputTypeForPrototype: function inputTypeForPrototype(prototype) {
    if (prototype === Date) return 'date';
    if (prototype === Number) return 'number';
    if (prototype === Boolean) return 'checkbox';
    return 'text';
  },
  prepareValueForInput: function prepareValueForInput(value, type) {
    if (type === 'date') return new Date(value).toISOString().slice(0, 10);
    if (type === 'checkbox') {
      return value ? 'on' : '';
    }
    return value;
  },
  removeObjectKey: function removeObjectKey(key, object) {
    var newObject = {};
    Object.keys(object).filter(function (k) {
      return k !== key;
    }).forEach(function (k) {
      newObject[k] = object[k];
    });
    return newObject;
  }
};