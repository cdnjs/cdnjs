"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = require("../button/Button");

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _SplitButtonItem = require("./SplitButtonItem");

var _SplitButtonPanel = require("./SplitButtonPanel");

var _Tooltip = require("../tooltip/Tooltip");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var SplitButton = /*#__PURE__*/function (_Component) {
  _inherits(SplitButton, _Component);

  var _super = _createSuper(SplitButton);

  function SplitButton(props) {
    var _this;

    _classCallCheck(this, SplitButton);

    _this = _super.call(this, props);
    _this.state = {
      overlayVisible: false
    };
    _this.onDropdownButtonClick = _this.onDropdownButtonClick.bind(_assertThisInitialized(_this));
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(SplitButton, [{
    key: "onPanelClick",
    value: function onPanelClick(event) {
      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "onDropdownButtonClick",
    value: function onDropdownButtonClick() {
      if (this.state.overlayVisible) this.hide();else this.show();
    }
  }, {
    key: "onItemClick",
    value: function onItemClick() {
      this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        overlayVisible: false
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
      this.alignPanel();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindDocumentClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "alignPanel",
    value: function alignPanel() {
      var container = this.defaultButton.parentElement;
      this.overlayRef.current.style.minWidth = _DomHandler.default.getOuterWidth(container) + 'px';

      _DomHandler.default.absolutePosition(this.overlayRef.current, container);
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this2 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this2.state.overlayVisible && _this2.isOutsideClicked(event)) {
            _this2.hide();
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this3 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this3.state.overlayVisible) {
            _this3.hide();
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "bindResizeListener",
    value: function bindResizeListener() {
      var _this4 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this4.state.overlayVisible) {
            _this4.hide();
          }
        };

        window.addEventListener('resize', this.resizeListener);
      }
    }
  }, {
    key: "unbindResizeListener",
    value: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    }
  }, {
    key: "isOutsideClicked",
    value: function isOutsideClicked(event) {
      return this.container && this.overlayRef && this.overlayRef.current && !this.overlayRef.current.contains(event.target);
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
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = (0, _Tooltip.tip)({
        target: this.container,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this5 = this;

      if (this.props.model) {
        return this.props.model.map(function (menuitem, index) {
          return /*#__PURE__*/_react.default.createElement(_SplitButtonItem.SplitButtonItem, {
            menuitem: menuitem,
            key: index,
            onItemClick: _this5.onItemClick
          });
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = (0, _ClassNames.classNames)('p-splitbutton p-component', this.props.className, {
        'p-disabled': this.props.disabled
      });
      var items = this.renderItems();
      var buttonContent = this.props.buttonTemplate ? _ObjectUtils.default.getJSXElement(this.props.buttonTemplate, this.props) : null;
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id,
        className: className,
        style: this.props.style,
        ref: function ref(el) {
          return _this6.container = el;
        }
      }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
        ref: function ref(el) {
          return _this6.defaultButton = el;
        },
        type: "button",
        className: "p-splitbutton-defaultbutton",
        icon: this.props.icon,
        label: this.props.label,
        onClick: this.props.onClick,
        disabled: this.props.disabled,
        tabIndex: this.props.tabIndex
      }, buttonContent), /*#__PURE__*/_react.default.createElement(_Button.Button, {
        type: "button",
        className: "p-splitbutton-menubutton",
        icon: "pi pi-chevron-down",
        onClick: this.onDropdownButtonClick,
        disabled: this.props.disabled,
        "aria-expanded": this.state.overlayVisible,
        "aria-haspopup": true,
        "aria-owns": this.id + '_overlay'
      }), /*#__PURE__*/_react.default.createElement(_SplitButtonPanel.SplitButtonPanel, {
        ref: this.overlayRef,
        appendTo: this.props.appendTo,
        id: this.id + '_overlay',
        menuStyle: this.props.menuStyle,
        menuClassName: this.props.menuClassName,
        onClick: this.onPanelClick,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, items));
    }
  }]);

  return SplitButton;
}(_react.Component);

exports.SplitButton = SplitButton;

_defineProperty(SplitButton, "defaultProps", {
  id: null,
  label: null,
  icon: null,
  model: null,
  disabled: null,
  style: null,
  className: null,
  menuStyle: null,
  menuClassName: null,
  tabIndex: null,
  onClick: null,
  appendTo: null,
  tooltip: null,
  tooltipOptions: null,
  buttonTemplate: null
});

_defineProperty(SplitButton, "propTypes", {
  id: _propTypes.default.string,
  label: _propTypes.default.string,
  icon: _propTypes.default.string,
  model: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  menustyle: _propTypes.default.object,
  menuClassName: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  onClick: _propTypes.default.func,
  appendTo: _propTypes.default.object,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  buttonTemplate: _propTypes.default.any
});