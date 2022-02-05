"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValueType = exports.isRef = exports.isMinDate = exports.isMaxDate = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var isValueType = _propTypes["default"].oneOf(allValueTypes);

exports.isValueType = isValueType;

var isMinDate = function isMinDate(props, propName, componentName) {
  var minDate = props[propName];

  if (!minDate) {
    return null;
  }

  if (!(minDate instanceof Date)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(_typeof(minDate), "` supplied to `").concat(componentName, "`, expected instance of `Date`."));
  }

  var maxDate = props.maxDate;

  if (maxDate && minDate > maxDate) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(_typeof(minDate), "` supplied to `").concat(componentName, "`, minDate cannot be larger than maxDate."));
  }

  return null;
};

exports.isMinDate = isMinDate;

var isMaxDate = function isMaxDate(props, propName, componentName) {
  var maxDate = props[propName];

  if (!maxDate) {
    return null;
  }

  if (!(maxDate instanceof Date)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(_typeof(maxDate), "` supplied to `").concat(componentName, "`, expected instance of `Date`."));
  }

  var minDate = props.minDate;

  if (minDate && maxDate < minDate) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(_typeof(maxDate), "` supplied to `").concat(componentName, "`, maxDate cannot be smaller than minDate."));
  }

  return null;
};

exports.isMaxDate = isMaxDate;

var isRef = _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
  current: _propTypes["default"].any
})]);

exports.isRef = isRef;