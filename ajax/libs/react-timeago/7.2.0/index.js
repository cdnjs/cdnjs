"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeAgo;
var React = _interopRequireWildcard(require("react"));
var _dateParser = _interopRequireDefault(require("./dateParser"));
var _defaultFormatter = _interopRequireDefault(require("./defaultFormatter"));
var _excluded = ["date", "formatter", "component", "live", "minPeriod", "maxPeriod", "title", "now"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// Just some simple constants for readability
var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365;
var defaultNow = function defaultNow() {
  return Date.now();
};
function TimeAgo(_ref) {
  var date = _ref.date,
    _ref$formatter = _ref.formatter,
    formatter = _ref$formatter === void 0 ? _defaultFormatter["default"] : _ref$formatter,
    _ref$component = _ref.component,
    component = _ref$component === void 0 ? 'time' : _ref$component,
    _ref$live = _ref.live,
    live = _ref$live === void 0 ? true : _ref$live,
    _ref$minPeriod = _ref.minPeriod,
    minPeriod = _ref$minPeriod === void 0 ? 0 : _ref$minPeriod,
    _ref$maxPeriod = _ref.maxPeriod,
    maxPeriod = _ref$maxPeriod === void 0 ? WEEK : _ref$maxPeriod,
    title = _ref.title,
    _ref$now = _ref.now,
    now = _ref$now === void 0 ? defaultNow : _ref$now,
    passDownProps = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, React.useState)(now()),
    _useState2 = _slicedToArray(_useState, 2),
    timeNow = _useState2[0],
    setTimeNow = _useState2[1];
  (0, React.useEffect)(function () {
    if (!live) {
      return;
    }
    var tick = function tick() {
      var then = (0, _dateParser["default"])(date).valueOf();
      if (!then) {
        console.warn('[react-timeago] Invalid Date provided');
        return 0;
      }
      var seconds = Math.round(Math.abs(timeNow - then) / 1000);
      var unboundPeriod = seconds < MINUTE ? 1000 : seconds < HOUR ? 1000 * MINUTE : seconds < DAY ? 1000 * HOUR : 1000 * WEEK;
      var period = Math.min(Math.max(unboundPeriod, minPeriod * 1000), maxPeriod * 1000);
      if (period) {
        return setTimeout(function () {
          setTimeNow(now());
        }, period);
      }
      return 0;
    };
    var timeoutId = tick();
    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [date, live, maxPeriod, minPeriod, now, timeNow]);
  var Komponent = component;
  var then = (0, _dateParser["default"])(date).valueOf();
  if (!then) {
    return null;
  }
  var seconds = Math.round(Math.abs(timeNow - then) / 1000);
  var suffix = then < timeNow ? 'ago' : 'from now';
  var _ref2 = seconds < MINUTE ? [Math.round(seconds), 'second'] : seconds < HOUR ? [Math.round(seconds / MINUTE), 'minute'] : seconds < DAY ? [Math.round(seconds / HOUR), 'hour'] : seconds < WEEK ? [Math.round(seconds / DAY), 'day'] : seconds < MONTH ? [Math.round(seconds / WEEK), 'week'] : seconds < YEAR ? [Math.round(seconds / MONTH), 'month'] : [Math.round(seconds / YEAR), 'year'],
    _ref3 = _slicedToArray(_ref2, 2),
    value = _ref3[0],
    unit = _ref3[1];
  var passDownTitle = typeof title === 'undefined' ? typeof date === 'string' ? date : (0, _dateParser["default"])(date).toISOString().substr(0, 16).replace('T', ' ') : title;
  var spreadProps = Komponent === 'time' ? _objectSpread(_objectSpread({}, passDownProps), {}, {
    dateTime: (0, _dateParser["default"])(date).toISOString()
  }) : passDownProps;
  var nextFormatter = _defaultFormatter["default"].bind(null, value, unit, suffix);
  return /*#__PURE__*/React.createElement(Komponent, _extends({}, spreadProps, {
    title: passDownTitle
  }), formatter(value, unit, suffix, then, nextFormatter, now));
}