"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menubar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _MenubarSub = require("./MenubarSub");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

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

var Menubar = /*#__PURE__*/function (_Component) {
  _inherits(Menubar, _Component);

  var _super = _createSuper(Menubar);

  function Menubar(props) {
    var _this;

    _classCallCheck(this, Menubar);

    _this = _super.call(this, props);
    _this.state = {
      mobileActive: false
    };
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
    _this.onLeafClick = _this.onLeafClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Menubar, [{
    key: "toggle",
    value: function toggle(event) {
      var _this2 = this;

      event.preventDefault();
      this.setState(function (prevState) {
        return {
          mobileActive: !prevState.mobileActive
        };
      }, function () {
        if (_this2.state.mobileActive) {
          _this2.rootmenu.style.zIndex = String(_DomHandler.default.generateZIndex());

          _this2.bindDocumentClickListener();
        } else {
          _this2.unbindDocumentClickListener();

          _DomHandler.default.revertZIndex();
        }
      });
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this3 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this3.state.mobileActive && _this3.isOutsideClicked(event)) {
            _this3.setState({
              mobileActive: false
            }, function () {
              _this3.unbindDocumentClickListener();

              _DomHandler.default.revertZIndex();
            });
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.rootmenu !== event.target && !this.rootmenu.contains(event.target) && this.menubutton !== event.target && !this.menubutton.contains(event.target);
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "onLeafClick",
    value: function onLeafClick() {
      var _this4 = this;

      this.setState({
        mobileActive: false
      }, function () {
        _this4.unbindDocumentClickListener();

        _DomHandler.default.revertZIndex();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderCustomContent",
    value: function renderCustomContent() {
      if (this.props.children) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-menubar-custom"
        }, this.props.children);
      }

      return null;
    }
  }, {
    key: "renderStartContent",
    value: function renderStartContent() {
      if (this.props.start) {
        var start = _ObjectUtils.default.getJSXElement(this.props.start, this.props);

        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-menubar-start"
        }, start);
      }

      return null;
    }
  }, {
    key: "renderEndContent",
    value: function renderEndContent() {
      if (this.props.end) {
        var end = _ObjectUtils.default.getJSXElement(this.props.end, this.props);

        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-menubar-end"
        }, end);
      }

      return null;
    }
  }, {
    key: "renderMenuButton",
    value: function renderMenuButton() {
      var _this5 = this;

      /* eslint-disable */
      var button = /*#__PURE__*/_react.default.createElement("a", {
        ref: function ref(el) {
          return _this5.menubutton = el;
        },
        href: '#',
        role: "button",
        tabIndex: 0,
        className: "p-menubar-button",
        onClick: this.toggle
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "pi pi-bars"
      }));
      /* eslint-enable */


      return button;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = (0, _ClassNames.classNames)('p-menubar p-component', {
        'p-menubar-mobile-active': this.state.mobileActive
      }, this.props.className);
      var start = this.renderStartContent();
      var end = this.renderEndContent();
      var menuButton = this.renderMenuButton();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        style: this.props.style
      }, start, menuButton, /*#__PURE__*/_react.default.createElement(_MenubarSub.MenubarSub, {
        ref: function ref(el) {
          return _this6.rootmenu = el;
        },
        model: this.props.model,
        root: true,
        mobileActive: this.state.mobileActive,
        onLeafClick: this.onLeafClick
      }), end);
    }
  }]);

  return Menubar;
}(_react.Component);

exports.Menubar = Menubar;

_defineProperty(Menubar, "defaultProps", {
  id: null,
  model: null,
  style: null,
  className: null,
  start: null,
  end: null
});

_defineProperty(Menubar, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  start: _propTypes.default.any,
  end: _propTypes.default.any
});