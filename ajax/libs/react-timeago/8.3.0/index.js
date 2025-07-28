"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeAgo;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _dateParser = _interopRequireDefault(require("./dateParser"));
var _defaultFormatter = _interopRequireDefault(require("./defaultFormatter"));
var _excluded = ["date", "formatter", "component", "live", "minPeriod", "maxPeriod", "title", "now"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
    formatter = _ref.formatter,
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
  var _useState = (0, _react.useState)(now()),
    _useState2 = _slicedToArray(_useState, 2),
    timeNow = _useState2[0],
    setTimeNow = _useState2[1];
  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
    setTimeNow(now());
  }, [date]);
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
  var passDownTitle = typeof title === 'undefined' ? typeof date === 'string' ? date : (0, _dateParser["default"])(date).toISOString().substring(0, 16).replace('T', ' ') : title;
  var spreadProps = Komponent === 'time' ? _objectSpread(_objectSpread({}, passDownProps), {}, {
    dateTime: (0, _dateParser["default"])(date).toISOString()
  }) : passDownProps;
  var nextFormatter = function nextFormatter() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : value;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : unit;
    var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : suffix;
    var epochMilliseconds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : then;
    var nextFormatter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _defaultFormatter["default"];
    var now = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : now;
    return (0, _defaultFormatter["default"])(value, unit, suffix, epochMilliseconds, nextFormatter, now);
  };
  var effectiveFormatter = formatter || _defaultFormatter["default"];
  var content;
  try {
    content = effectiveFormatter(value, unit, suffix, then, nextFormatter, now);
    if (!content) {
      content = (0, _defaultFormatter["default"])(value, unit, suffix, then, nextFormatter, now);
    }
  } catch (error) {
    console.error('[react-timeago] Formatter threw an error:', error);
    content = (0, _defaultFormatter["default"])(value, unit, suffix, then, nextFormatter, now);
  }
  return /*#__PURE__*/React.createElement(Komponent, _extends({}, spreadProps, {
    title: passDownTitle
  }), content);
}