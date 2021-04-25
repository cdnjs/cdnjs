"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

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

var Avatar = /*#__PURE__*/function (_Component) {
  _inherits(Avatar, _Component);

  var _super = _createSuper(Avatar);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _super.apply(this, arguments);
  }

  _createClass(Avatar, [{
    key: "renderContent",
    value: function renderContent() {
      var _this = this;

      if (this.props.label) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-avatar-text"
        }, this.props.label);
      } else if (this.props.icon) {
        var iconClassName = (0, _ClassNames.classNames)('p-avatar-icon', this.props.icon);
        return /*#__PURE__*/_react.default.createElement("span", {
          className: iconClassName
        });
      } else if (this.props.image) {
        var onError = function onError(e) {
          if (_this.props.onImageError) {
            _this.props.onImageError(e);
          }
        };

        return /*#__PURE__*/_react.default.createElement("img", {
          src: this.props.image,
          alt: this.props.imageAlt,
          onError: onError
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var containerClassName = (0, _ClassNames.classNames)('p-avatar p-component', {
        'p-avatar-image': this.props.image != null,
        'p-avatar-circle': this.props.shape === 'circle',
        'p-avatar-lg': this.props.size === 'large',
        'p-avatar-xl': this.props.size === 'xlarge',
        'p-avatar-clickable': !!this.props.onClick
      }, this.props.className);
      var content = this.props.template ? _ObjectUtils.default.getJSXElement(this.props.template, this.props) : this.renderContent();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: containerClassName,
        style: this.props.style,
        onClick: this.props.onClick
      }, content, this.props.children);
    }
  }]);

  return Avatar;
}(_react.Component);

exports.Avatar = Avatar;

_defineProperty(Avatar, "defaultProps", {
  label: null,
  icon: null,
  image: null,
  size: 'normal',
  shape: 'square',
  style: null,
  className: null,
  template: null,
  imageAlt: 'avatar',
  onImageError: null,
  onClick: null
});

_defineProperty(Avatar, "propTypes", {
  label: _propTypes.default.string,
  icon: _propTypes.default.string,
  image: _propTypes.default.string,
  size: _propTypes.default.string,
  shape: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  template: _propTypes.default.any,
  imageAlt: _propTypes.default.string,
  onImageError: _propTypes.default.func,
  onClick: _propTypes.default.func
});