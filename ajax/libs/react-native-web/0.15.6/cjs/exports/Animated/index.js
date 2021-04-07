"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AnimatedImplementation = _interopRequireDefault(require("../../vendor/react-native/Animated/AnimatedImplementation"));

var _FlatList = _interopRequireDefault(require("../FlatList"));

var _Image = _interopRequireDefault(require("../Image"));

var _SectionList = _interopRequireDefault(require("../SectionList"));

var _ScrollView = _interopRequireDefault(require("../ScrollView"));

var _Text = _interopRequireDefault(require("../Text"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Animated = _objectSpread(_objectSpread({}, _AnimatedImplementation.default), {}, {
  FlatList: _AnimatedImplementation.default.createAnimatedComponent(_FlatList.default, {
    scrollEventThrottle: 0.0001
  }),
  Image: _AnimatedImplementation.default.createAnimatedComponent(_Image.default),
  ScrollView: _AnimatedImplementation.default.createAnimatedComponent(_ScrollView.default, {
    scrollEventThrottle: 0.0001
  }),
  SectionList: _AnimatedImplementation.default.createAnimatedComponent(_SectionList.default, {
    scrollEventThrottle: 0.0001
  }),
  View: _AnimatedImplementation.default.createAnimatedComponent(_View.default),
  Text: _AnimatedImplementation.default.createAnimatedComponent(_Text.default)
});

var _default = Animated;
exports.default = _default;
module.exports = exports.default;