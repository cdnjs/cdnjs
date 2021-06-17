"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeComponentPropsHOF = exports.mergeProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _HOCs = require("../HOCs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);

  return entries;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Merges the `src` object into the `destination` object. Destination values are
 * not overwritten by source values. Destination properties that resolve to
 * `undefined` or `null` are not overwritten if a destination value exists
 * unless destination key does not exist . It recursively merges the
 * `imgixParams` and `htmlAttributes` values.
 *
 * @param {Object} src - The Provider component's props object
 * @param {Object} destination - The child component's props object
 * @returns Object with the combined values from `src` & `destination` Objects
 *
 * @example
 *  const src = {
 *    width: 100,
 *    height: 200,
 *    imgixParams: { ar: "1:2", dpr: 2},
 *    htmlAttributes: { styles: "width: 50" }
 *  }
 *  const destination = {
 *    width: 101,
 *    height: 201,
 *    imgixParams: { dpr: 1 },
 *    htmlAttributes: { styles: "width: 100" }
 *  }
 *  const result = mergeProps(src, destination);
 *
 *  {
 *    width: 101,
 *    height: 201,
 *    imgixParams: { ar: "1:2", dpr: 1 },
 *    htmlAttributes: { styles: "width: 100" }
 *  }
 *
 */
var mergeProps = function mergeProps(src, destination) {
  if (src == null && destination !== null) {
    return destination;
  }

  if (src !== null && destination == null) {
    return src;
  }

  if (src == null && destination == null) {
    return {};
  }

  var newProps = _objectSpread({}, destination);

  var newPropKeys = Object.keys(newProps);

  for (var _i = 0, _Object$entries = _objectEntries(src); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    if (newPropKeys.indexOf(k) == -1 && v !== null) {
      newProps[k] = v;
    } // recursively merge imgixParams and htmlAttributes


    if (k === "imgixParams" || k === "htmlAttributes") {
      if (v !== null) {
        newProps[k] = mergeProps(src[k], newProps[k]);
      }
    }
  }

  return newProps;
};
/**
 * `mergeComponentPropsHOF` tries to invoke `React.useContext()`. If context is 
 * `undefined`, context is being accessed outside of an `ImgixContext` provider 
 * and the Component is returned as is.
 *
 * Otherwise, it merges a Component's props with the `ImgixContext` props and 
 * return a Component with the merged `props`.
 * @param {React.Element <typeof Component} Component -  with defined `props`.
 * @returns Component with merged `props`.
 */


exports.mergeProps = mergeProps;

var mergeComponentPropsHOF = function mergeComponentPropsHOF(Component) {
  return function (props) {
    var contextProps = (0, _HOCs.useImgixContext)();

    if (contextProps == null) {
      return /*#__PURE__*/_react.default.createElement(Component, props);
    }

    var childProps = mergeProps(contextProps, props);
    return /*#__PURE__*/_react.default.createElement(Component, childProps);
  };
};

exports.mergeComponentPropsHOF = mergeComponentPropsHOF;
//# sourceMappingURL=propMerger.js.map