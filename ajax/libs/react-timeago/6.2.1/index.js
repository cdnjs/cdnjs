"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeAgo;

var React = _interopRequireWildcard(require("react"));

var _defaultFormatter = _interopRequireDefault(require("./defaultFormatter"));

var _dateParser = _interopRequireDefault(require("./dateParser"));

var _excluded = ["date", "formatter", "component", "live", "minPeriod", "maxPeriod", "title", "now"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
      now = _ref$now === void 0 ? function () {
    return Date.now();
  } : _ref$now,
      passDownProps = _objectWithoutProperties(_ref, _excluded);

  var forceUpdate = useUpdate();
  (0, React.useEffect)(function () {
    if (!live) {
      return;
    }

    var timeoutId;

    var tick = function tick(refresh) {
      var then = (0, _dateParser["default"])(date).valueOf();

      if (!then) {
        console.warn('[react-timeago] Invalid Date provided');
        return;
      }

      var timeNow = now();
      var seconds = Math.round(Math.abs(timeNow - then) / 1000);
      var unboundPeriod = seconds < MINUTE ? 1000 : seconds < HOUR ? 1000 * MINUTE : seconds < DAY ? 1000 * HOUR : 1000 * WEEK;
      var period = Math.min(Math.max(unboundPeriod, minPeriod * 1000), maxPeriod * 1000);

      if (period) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(tick, period);
      }

      if (!refresh) {
        forceUpdate();
      }
    };

    tick(true);
    return function () {
      clearTimeout(timeoutId);
    };
  }, [date, forceUpdate, live, maxPeriod, minPeriod, now]);
  var Komponent = component;
  var then = (0, _dateParser["default"])(date).valueOf();

  if (!then) {
    return null;
  }

  var timeNow = now();
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

function useUpdate() {
  var _useState = (0, React.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      _ = _useState2[0],
      setCount = _useState2[1];

  return (0, React.useCallback)(function () {
    setCount(function (num) {
      return num + 1;
    });
  }, []);
}