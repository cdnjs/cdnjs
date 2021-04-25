"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Timeline = /*#__PURE__*/function (_Component) {
  _inherits(Timeline, _Component);

  var _super = _createSuper(Timeline);

  function Timeline() {
    _classCallCheck(this, Timeline);

    return _super.apply(this, arguments);
  }

  _createClass(Timeline, [{
    key: "getKey",
    value: function getKey(item, index) {
      return this.props.dataKey ? _ObjectUtils.default.resolveFieldData(item, this.props.dataKey) : "pr_id__".concat(index);
    }
  }, {
    key: "renderEvents",
    value: function renderEvents() {
      var _this = this;

      return this.props.value && this.props.value.map(function (item, index) {
        var opposite = _ObjectUtils.default.getJSXElement(_this.props.opposite, item, index);

        var marker = _ObjectUtils.default.getJSXElement(_this.props.marker, item, index) || /*#__PURE__*/_react.default.createElement("div", {
          className: "p-timeline-event-marker"
        });

        var connector = index !== _this.props.value.length - 1 && /*#__PURE__*/_react.default.createElement("div", {
          className: "p-timeline-event-connector"
        });

        var content = _ObjectUtils.default.getJSXElement(_this.props.content, item, index);

        return /*#__PURE__*/_react.default.createElement("div", {
          key: _this.getKey(item, index),
          className: "p-timeline-event"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "p-timeline-event-opposite"
        }, opposite), /*#__PURE__*/_react.default.createElement("div", {
          className: "p-timeline-event-separator"
        }, marker, connector), /*#__PURE__*/_react.default.createElement("div", {
          className: "p-timeline-event-content"
        }, content));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var containerClassName = (0, _ClassNames.classNames)('p-timeline p-component', (_classNames = {}, _defineProperty(_classNames, "p-timeline-".concat(this.props.align), true), _defineProperty(_classNames, "p-timeline-".concat(this.props.layout), true), _classNames), this.props.className);
      var events = this.renderEvents();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: containerClassName,
        style: this.props.style
      }, events);
    }
  }]);

  return Timeline;
}(_react.Component);

exports.Timeline = Timeline;

_defineProperty(Timeline, "defaultProps", {
  id: null,
  value: null,
  align: 'left',
  layout: 'vertical',
  dataKey: null,
  className: null,
  style: null,
  opposite: null,
  marker: null,
  content: null
});

_defineProperty(Timeline, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.array,
  align: _propTypes.default.string,
  layout: _propTypes.default.string,
  dataKey: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  opposite: _propTypes.default.any,
  marker: _propTypes.default.any,
  content: _propTypes.default.any
});