"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ClassNames = require("../utils/ClassNames");

var _ColorPickerPanel = require("./ColorPickerPanel");

var _Tooltip = require("../tooltip/Tooltip");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var ColorPicker = /*#__PURE__*/function (_Component) {
  _inherits(ColorPicker, _Component);

  var _super = _createSuper(ColorPicker);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _super.call(this, props);
    _this.state = {
      overlayVisible: false
    };
    _this.onInputClick = _this.onInputClick.bind(_assertThisInitialized(_this));
    _this.onInputKeydown = _this.onInputKeydown.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.onColorMousedown = _this.onColorMousedown.bind(_assertThisInitialized(_this));
    _this.onHueMousedown = _this.onHueMousedown.bind(_assertThisInitialized(_this));
    _this.onColorDragStart = _this.onColorDragStart.bind(_assertThisInitialized(_this));
    _this.onHueDragStart = _this.onHueDragStart.bind(_assertThisInitialized(_this));
    _this.onDrag = _this.onDrag.bind(_assertThisInitialized(_this));
    _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "onPanelClick",
    value: function onPanelClick(event) {
      if (!this.props.inline) {
        _OverlayEventBus.default.emit('overlay-click', {
          originalEvent: event,
          target: this.container
        });
      }
    }
  }, {
    key: "onHueMousedown",
    value: function onHueMousedown(event) {
      if (this.props.disabled) {
        return;
      }

      this.bindDragListeners();
      this.onHueDragStart(event);
    }
  }, {
    key: "onHueDragStart",
    value: function onHueDragStart(event) {
      if (this.props.disabled) {
        return;
      }

      this.hueDragging = true;
      this.pickHue(event);

      _DomHandler.default.addClass(this.container, 'p-colorpicker-dragging');
    }
  }, {
    key: "pickHue",
    value: function pickHue(event) {
      var top = this.hueView.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      this.hsbValue = this.validateHSB({
        h: Math.floor(360 * (150 - Math.max(0, Math.min(150, event.pageY - top))) / 150),
        s: 100,
        b: 100
      });
      this.updateColorSelector();
      this.updateHue();
      this.updateModel();
    }
  }, {
    key: "onColorMousedown",
    value: function onColorMousedown(event) {
      if (this.props.disabled) {
        return;
      }

      this.bindDragListeners();
      this.onColorDragStart(event);
    }
  }, {
    key: "onColorDragStart",
    value: function onColorDragStart(event) {
      if (this.props.disabled) {
        return;
      }

      this.colorDragging = true;
      this.pickColor(event);

      _DomHandler.default.addClass(this.container, 'p-colorpicker-dragging');

      event.preventDefault();
    }
  }, {
    key: "onDrag",
    value: function onDrag(event) {
      if (this.colorDragging) {
        this.pickColor(event);
        event.preventDefault();
      }

      if (this.hueDragging) {
        this.pickHue(event);
        event.preventDefault();
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      this.colorDragging = false;
      this.hueDragging = false;

      _DomHandler.default.removeClass(this.container, 'p-colorpicker-dragging');

      this.unbindDragListeners();
    }
  }, {
    key: "bindDragListeners",
    value: function bindDragListeners() {
      this.bindDocumentMouseMoveListener();
      this.bindDocumentMouseUpListener();
    }
  }, {
    key: "unbindDragListeners",
    value: function unbindDragListeners() {
      this.unbindDocumentMouseMoveListener();
      this.unbindDocumentMouseUpListener();
    }
  }, {
    key: "pickColor",
    value: function pickColor(event) {
      var rect = this.colorSelector.getBoundingClientRect();
      var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      var left = rect.left + document.body.scrollLeft;
      var saturation = Math.floor(100 * Math.max(0, Math.min(150, event.pageX - left)) / 150);
      var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, event.pageY - top))) / 150);
      this.hsbValue = this.validateHSB({
        h: this.hsbValue.h,
        s: saturation,
        b: brightness
      });
      this.updateColorHandle();
      this.updateInput();
      this.updateModel();
    }
  }, {
    key: "updateModel",
    value: function updateModel() {
      switch (this.props.format) {
        case 'hex':
          this.onChange(this.HSBtoHEX(this.hsbValue));
          break;

        case 'rgb':
          this.onChange(this.HSBtoRGB(this.hsbValue));
          break;

        case 'hsb':
          this.onChange(this.hsbValue);
          break;

        default:
          break;
      }
    }
  }, {
    key: "toHSB",
    value: function toHSB(value) {
      var hsb;

      if (value) {
        switch (this.props.format) {
          case 'hex':
            hsb = this.HEXtoHSB(value);
            break;

          case 'rgb':
            hsb = this.RGBtoHSB(value);
            break;

          case 'hsb':
            hsb = value;
            break;

          default:
            break;
        }
      } else {
        hsb = this.HEXtoHSB(this.props.defaultColor);
      }

      return hsb;
    }
  }, {
    key: "updateHSBValue",
    value: function updateHSBValue(value) {
      this.hsbValue = this.toHSB(value);
    }
  }, {
    key: "areHSBEqual",
    value: function areHSBEqual(val1, val2) {
      return val1.h === val2.h && val1.s === val2.s && val1.b === val2.b;
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      if (this.props.onChange) {
        this.props.onChange({
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.id,
            value: value
          }
        });
      }
    }
  }, {
    key: "updateColorSelector",
    value: function updateColorSelector() {
      if (this.colorSelector) {
        var hsbValue = this.validateHSB({
          h: this.hsbValue.h,
          s: 100,
          b: 100
        });
        this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(hsbValue);
      }
    }
  }, {
    key: "updateColorHandle",
    value: function updateColorHandle() {
      if (this.colorHandle) {
        this.colorHandle.style.left = Math.floor(150 * this.hsbValue.s / 100) + 'px';
        this.colorHandle.style.top = Math.floor(150 * (100 - this.hsbValue.b) / 100) + 'px';
      }
    }
  }, {
    key: "updateHue",
    value: function updateHue() {
      if (this.hueHandle) {
        this.hueHandle.style.top = Math.floor(150 - 150 * this.hsbValue.h / 360) + 'px';
      }
    }
  }, {
    key: "updateInput",
    value: function updateInput() {
      if (this.input) {
        this.input.style.backgroundColor = '#' + this.HSBtoHEX(this.hsbValue);
      }
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
    key: "onInputClick",
    value: function onInputClick() {
      this.togglePanel();
    }
  }, {
    key: "togglePanel",
    value: function togglePanel() {
      if (this.state.overlayVisible) this.hide();else this.show();
    }
  }, {
    key: "onInputKeydown",
    value: function onInputKeydown(event) {
      switch (event.which) {
        //space
        case 32:
          this.togglePanel();
          event.preventDefault();
          break;
        //escape and tab

        case 27:
        case 9:
          this.hide();
          break;

        default:
          break;
      }
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
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
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
      return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
    }
  }, {
    key: "bindDocumentMouseMoveListener",
    value: function bindDocumentMouseMoveListener() {
      if (!this.documentMouseMoveListener) {
        this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
        document.addEventListener('mousemove', this.documentMouseMoveListener);
      }
    }
  }, {
    key: "onDocumentMouseMove",
    value: function onDocumentMouseMove(event) {
      if (this.colorDragging) {
        this.pickColor(event);
      }

      if (this.hueDragging) {
        this.pickHue(event);
      }
    }
  }, {
    key: "unbindDocumentMouseMoveListener",
    value: function unbindDocumentMouseMoveListener() {
      if (this.documentMouseMoveListener) {
        document.removeEventListener('mousemove', this.documentMouseMoveListener);
        this.documentMouseMoveListener = null;
      }
    }
  }, {
    key: "bindDocumentMouseUpListener",
    value: function bindDocumentMouseUpListener() {
      if (!this.documentMouseUpListener) {
        this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
        document.addEventListener('mouseup', this.documentMouseUpListener);
      }
    }
  }, {
    key: "onDocumentMouseUp",
    value: function onDocumentMouseUp() {
      this.colorDragging = false;
      this.hueDragging = false;

      _DomHandler.default.removeClass(this.container, 'p-colorpicker-dragging');

      this.unbindDocumentMouseMoveListener();
      this.unbindDocumentMouseUpListener();
    }
  }, {
    key: "unbindDocumentMouseUpListener",
    value: function unbindDocumentMouseUpListener() {
      if (this.documentMouseUpListener) {
        document.removeEventListener('mouseup', this.documentMouseUpListener);
        this.documentMouseUpListener = null;
      }
    }
  }, {
    key: "validateHSB",
    value: function validateHSB(hsb) {
      return {
        h: Math.min(360, Math.max(0, hsb.h)),
        s: Math.min(100, Math.max(0, hsb.s)),
        b: Math.min(100, Math.max(0, hsb.b))
      };
    }
  }, {
    key: "validateRGB",
    value: function validateRGB(rgb) {
      return {
        r: Math.min(255, Math.max(0, rgb.r)),
        g: Math.min(255, Math.max(0, rgb.g)),
        b: Math.min(255, Math.max(0, rgb.b))
      };
    }
  }, {
    key: "validateHEX",
    value: function validateHEX(hex) {
      var len = 6 - hex.length;

      if (len > 0) {
        var o = [];

        for (var i = 0; i < len; i++) {
          o.push('0');
        }

        o.push(hex);
        hex = o.join('');
      }

      return hex;
    }
  }, {
    key: "HEXtoRGB",
    value: function HEXtoRGB(hex) {
      var hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
      return {
        r: hexValue >> 16,
        g: (hexValue & 0x00FF00) >> 8,
        b: hexValue & 0x0000FF
      };
    }
  }, {
    key: "HEXtoHSB",
    value: function HEXtoHSB(hex) {
      return this.RGBtoHSB(this.HEXtoRGB(hex));
    }
  }, {
    key: "RGBtoHSB",
    value: function RGBtoHSB(rgb) {
      var hsb = {
        h: 0,
        s: 0,
        b: 0
      };
      var min = Math.min(rgb.r, rgb.g, rgb.b);
      var max = Math.max(rgb.r, rgb.g, rgb.b);
      var delta = max - min;
      hsb.b = max;
      hsb.s = max !== 0 ? 255 * delta / max : 0;

      if (hsb.s !== 0) {
        if (rgb.r === max) {
          hsb.h = (rgb.g - rgb.b) / delta;
        } else if (rgb.g === max) {
          hsb.h = 2 + (rgb.b - rgb.r) / delta;
        } else {
          hsb.h = 4 + (rgb.r - rgb.g) / delta;
        }
      } else {
        hsb.h = -1;
      }

      hsb.h *= 60;

      if (hsb.h < 0) {
        hsb.h += 360;
      }

      hsb.s *= 100 / 255;
      hsb.b *= 100 / 255;
      return hsb;
    }
  }, {
    key: "HSBtoRGB",
    value: function HSBtoRGB(hsb) {
      var rgb = {
        r: null,
        g: null,
        b: null
      };
      var h = Math.round(hsb.h);
      var s = Math.round(hsb.s * 255 / 100);
      var v = Math.round(hsb.b * 255 / 100);

      if (s === 0) {
        rgb = {
          r: v,
          g: v,
          b: v
        };
      } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h === 360) h = 0;

        if (h < 60) {
          rgb.r = t1;
          rgb.b = t2;
          rgb.g = t2 + t3;
        } else if (h < 120) {
          rgb.g = t1;
          rgb.b = t2;
          rgb.r = t1 - t3;
        } else if (h < 180) {
          rgb.g = t1;
          rgb.r = t2;
          rgb.b = t2 + t3;
        } else if (h < 240) {
          rgb.b = t1;
          rgb.r = t2;
          rgb.g = t1 - t3;
        } else if (h < 300) {
          rgb.b = t1;
          rgb.g = t2;
          rgb.r = t2 + t3;
        } else if (h < 360) {
          rgb.r = t1;
          rgb.g = t2;
          rgb.b = t1 - t3;
        } else {
          rgb.r = 0;
          rgb.g = 0;
          rgb.b = 0;
        }
      }

      return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
      };
    }
  }, {
    key: "RGBtoHEX",
    value: function RGBtoHEX(rgb) {
      var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

      for (var key in hex) {
        if (hex[key].length === 1) {
          hex[key] = '0' + hex[key];
        }
      }

      return hex.join('');
    }
  }, {
    key: "HSBtoHEX",
    value: function HSBtoHEX(hsb) {
      return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHSBValue(this.props.value);
      this.updateUI();

      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateUI();

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
      this.unbindDocumentMouseMoveListener();
      this.unbindDocumentMouseUpListener();
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
    key: "updateUI",
    value: function updateUI() {
      this.updateHue();
      this.updateColorHandle();
      this.updateInput();
      this.updateColorSelector();
    }
  }, {
    key: "alignPanel",
    value: function alignPanel() {
      var container = this.input.parentElement;
      this.overlayRef.current.style.minWidth = _DomHandler.default.getOuterWidth(container) + 'px';

      _DomHandler.default.absolutePosition(this.overlayRef.current, container);
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
    key: "renderColorSelector",
    value: function renderColorSelector() {
      var _this5 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.colorSelector = el;
        },
        className: "p-colorpicker-color-selector",
        onMouseDown: this.onColorMousedown,
        onTouchStart: this.onColorDragStart,
        onTouchMove: this.onDrag,
        onTouchEnd: this.onDragEnd
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-colorpicker-color"
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.colorHandle = el;
        },
        className: "p-colorpicker-color-handle"
      })));
    }
  }, {
    key: "renderHue",
    value: function renderHue() {
      var _this6 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this6.hueView = el;
        },
        className: "p-colorpicker-hue",
        onMouseDown: this.onHueMousedown,
        onTouchStart: this.onHueDragStart,
        onTouchMove: this.onDrag,
        onTouchEnd: this.onDragEnd
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this6.hueHandle = el;
        },
        className: "p-colorpicker-hue-handle"
      }));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var colorSelector = this.renderColorSelector();
      var hue = this.renderHue();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-colorpicker-content"
      }, colorSelector, hue);
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var _this7 = this;

      if (!this.props.inline) {
        var inputClassName = (0, _ClassNames.classNames)('p-colorpicker-preview p-inputtext', {
          'p-disabled': this.props.disabled
        });

        var inputProps = _ObjectUtils.default.findDiffKeys(this.props, ColorPicker.defaultProps);

        return /*#__PURE__*/_react.default.createElement("input", _extends({
          ref: function ref(el) {
            return _this7.input = el;
          },
          type: "text",
          className: inputClassName,
          readOnly: true,
          id: this.props.inputId,
          tabIndex: this.props.tabIndex,
          disabled: this.props.disabled,
          onClick: this.onInputClick,
          onKeyDown: this.onInputKeydown
        }, inputProps));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var containerClassName = (0, _ClassNames.classNames)('p-colorpicker p-component', {
        'p-colorpicker-overlay': !this.props.inline
      }, this.props.className);
      var content = this.renderContent();
      var input = this.renderInput();
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this8.container = el;
        },
        id: this.id,
        style: this.props.style,
        className: containerClassName
      }, input, /*#__PURE__*/_react.default.createElement(_ColorPickerPanel.ColorPickerPanel, {
        ref: this.overlayRef,
        appendTo: this.props.appendTo,
        inline: this.props.inline,
        disabled: this.props.disabled,
        onClick: this.onPanelClick,
        in: this.props.inline || this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, content));
    }
  }]);

  return ColorPicker;
}(_react.Component);

exports.ColorPicker = ColorPicker;

_defineProperty(ColorPicker, "defaultProps", {
  id: null,
  value: null,
  style: null,
  className: null,
  defaultColor: 'ff0000',
  inline: false,
  format: "hex",
  appendTo: null,
  disabled: false,
  tabIndex: null,
  inputId: null,
  tooltip: null,
  tooltipOptions: null,
  onChange: null
});

_defineProperty(ColorPicker, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  defaultColor: _propTypes.default.string,
  inline: _propTypes.default.bool,
  format: _propTypes.default.string,
  appendTo: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  inputId: _propTypes.default.string,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  onChange: _propTypes.default.func
});