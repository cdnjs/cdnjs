"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CascadeSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _CSSTransition = require("../transition/CSSTransition");

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _CascadeSelectSub = require("./CascadeSelectSub");

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _Portal = require("../portal/Portal");

var _ZIndexUtils = require("../utils/ZIndexUtils");

var _PrimeReact = _interopRequireDefault(require("../api/PrimeReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var CascadeSelect = /*#__PURE__*/function (_Component) {
  _inherits(CascadeSelect, _Component);

  var _super = _createSuper(CascadeSelect);

  function CascadeSelect(props) {
    var _this;

    _classCallCheck(this, CascadeSelect);

    _this = _super.call(this, props);
    _this.state = {
      focused: false,
      overlayVisible: false
    };
    _this.dirty = false;
    _this.selectionPath = null;
    _this.overlayRef = /*#__PURE__*/(0, _react.createRef)();
    _this.inputRef = /*#__PURE__*/(0, _react.createRef)(_this.props.inputRef);
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onOptionSelect = _this.onOptionSelect.bind(_assertThisInitialized(_this));
    _this.onOptionGroupSelect = _this.onOptionGroupSelect.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CascadeSelect, [{
    key: "onOptionSelect",
    value: function onOptionSelect(event) {
      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
          value: event.value
        });
      }

      this.updateSelectionPath();
      this.hide();
      this.inputRef.current.focus();
    }
  }, {
    key: "onOptionGroupSelect",
    value: function onOptionGroupSelect(event) {
      this.dirty = true;

      if (this.props.onGroupChange) {
        this.props.onGroupChange(event);
      }
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? _ObjectUtils.default.resolveFieldData(option, this.props.optionLabel) : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? _ObjectUtils.default.resolveFieldData(option, this.props.optionValue) : option;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup, level) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupChildren[level]);
    }
  }, {
    key: "isOptionGroup",
    value: function isOptionGroup(option, level) {
      return Object.prototype.hasOwnProperty.call(option, this.props.optionGroupChildren[level]);
    }
  }, {
    key: "updateSelectionPath",
    value: function updateSelectionPath() {
      var path;

      if (this.props.value != null && this.props.options) {
        var _iterator = _createForOfIteratorHelper(this.props.options),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var option = _step.value;
            path = this.findModelOptionInGroup(option, 0);

            if (path) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.selectionPath = path;
    }
  }, {
    key: "findModelOptionInGroup",
    value: function findModelOptionInGroup(option, level) {
      if (this.isOptionGroup(option, level)) {
        var selectedOption;

        var _iterator2 = _createForOfIteratorHelper(this.getOptionGroupChildren(option, level)),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var childOption = _step2.value;
            selectedOption = this.findModelOptionInGroup(childOption, level + 1);

            if (selectedOption) {
              selectedOption.unshift(option);
              return selectedOption;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (_ObjectUtils.default.equals(this.props.value, this.getOptionValue(option), this.props.dataKey)) {
        return [option];
      }

      return null;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (this.props.disabled) {
        return;
      }

      var overlay = this.overlayRef ? this.overlayRef.current : null;

      if (!overlay || !overlay.contains(event.target)) {
        this.inputRef.current.focus();

        if (this.state.overlayVisible) {
          this.hide();
        } else {
          this.show();
        }
      }
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus() {
      this.setState({
        focused: true
      });
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      this.setState({
        focused: false
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          if (this.state.overlayVisible) {
            _DomHandler.default.findSingle(this.overlayRef.current, '.p-cascadeselect-item').children[0].focus();
          } else if (event.altKey && this.props.options && this.props.options.length) {
            this.show();
          }

          event.preventDefault();
          break;
        //space

        case 32:
          if (this.state.overlayVisible) this.hide();else this.show();
          event.preventDefault();
          break;
        //tab

        case 9:
          this.hide();
          break;

        default:
          break;
      }
    }
  }, {
    key: "onPanelClick",
    value: function onPanelClick(event) {
      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.props.onBeforeShow) {
        this.props.onBeforeShow();
      }

      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.props.onBeforeHide) {
        this.props.onBeforeHide();
      }

      this.setState({
        overlayVisible: false
      }, function () {
        _this2.inputRef.current.focus();
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      _ZIndexUtils.ZIndexUtils.set('overlay', this.overlayRef.current);

      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onOverlayExit",
    value: function onOverlayExit() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.dirty = false;
    }
  }, {
    key: "onOverlayExited",
    value: function onOverlayExited() {
      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);

      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      _DomHandler.default.alignOverlay(this.overlayRef.current, this.label.parentElement, this.props.appendTo || _PrimeReact.default.appendTo);
    }
  }, {
    key: "bindOutsideClickListener",
    value: function bindOutsideClickListener() {
      var _this3 = this;

      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this3.state.overlayVisible && _this3.isOutsideClicked(event)) {
            _this3.hide();
          }
        };

        document.addEventListener('click', this.outsideClickListener);
      }
    }
  }, {
    key: "unbindOutsideClickListener",
    value: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this4 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this4.state.overlayVisible) {
            _this4.hide();
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
      var _this5 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this5.state.overlayVisible && !_DomHandler.default.isAndroid()) {
            _this5.hide();
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
    key: "updateInputRef",
    value: function updateInputRef() {
      var ref = this.props.inputRef;

      if (ref) {
        if (typeof ref === 'function') {
          ref(this.inputRef.current);
        } else {
          ref.current = this.inputRef.current;
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInputRef();
      this.updateSelectionPath();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }

      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.value !== this.props.value) {
        this.updateSelectionPath();
      }
    }
  }, {
    key: "renderKeyboardHelper",
    value: function renderKeyboardHelper() {
      var value = this.props.value ? this.getOptionLabel(this.props.value) : null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: this.inputRef,
        type: "text",
        id: this.props.inputId,
        name: this.props.name,
        defaultValue: value,
        readOnly: true,
        disabled: this.props.disabled,
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyDown: this.onInputKeyDown,
        tabIndex: this.props.tabIndex,
        "aria-haspopup": "listbox",
        "aria-labelledby": this.props.ariaLabelledBy
      }));
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this6 = this;

      var label = this.props.value ? this.getOptionLabel(this.props.value) : this.props.placeholder || 'p-emptylabel';
      var labelClassName = (0, _ClassNames.classNames)('p-cascadeselect-label ', {
        'p-placeholder': label === this.props.placeholder,
        'p-cascadeselect-label-empty': !this.props.value && label === 'p-emptylabel'
      });
      return /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this6.label = el;
        },
        className: labelClassName
      }, label);
    }
  }, {
    key: "renderDropdownIcon",
    value: function renderDropdownIcon() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-cascadeselect-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-cascadeselect-trigger-icon pi pi-chevron-down"
      }));
    }
  }, {
    key: "renderOverlay",
    value: function renderOverlay() {
      var overlay = /*#__PURE__*/_react.default.createElement(_CSSTransition.CSSTransition, {
        nodeRef: this.overlayRef,
        classNames: "p-connected-overlay",
        in: this.state.overlayVisible,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.overlayRef,
        className: "p-cascadeselect-panel p-component",
        onClick: this.onPanelClick
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-cascadeselect-items-wrapper"
      }, /*#__PURE__*/_react.default.createElement(_CascadeSelectSub.CascadeSelectSub, {
        options: this.props.options,
        selectionPath: this.selectionPath,
        className: "p-cascadeselect-items",
        optionLabel: this.props.optionLabel,
        optionValue: this.props.optionValue,
        level: 0,
        optionGroupLabel: this.props.optionGroupLabel,
        optionGroupChildren: this.props.optionGroupChildren,
        onOptionSelect: this.onOptionSelect,
        onOptionGroupSelect: this.onOptionGroupSelect,
        root: true,
        template: this.props.itemTemplate,
        onPanelHide: this.hide
      }))));

      return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: overlay,
        appendTo: this.props.appendTo
      });
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this7 = this;

      var className = (0, _ClassNames.classNames)('p-cascadeselect p-component p-inputwrapper', this.props.className, {
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused,
        'p-inputwrapper-filled': this.props.value,
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      });
      var keyboardHelper = this.renderKeyboardHelper();
      var labelElement = this.renderLabel();
      var dropdownIcon = this.renderDropdownIcon();
      var overlay = this.renderOverlay();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        ref: function ref(el) {
          return _this7.container = el;
        },
        className: className,
        style: this.props.style,
        onClick: this.onClick
      }, keyboardHelper, labelElement, dropdownIcon, overlay);
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return element;
    }
  }]);

  return CascadeSelect;
}(_react.Component);

exports.CascadeSelect = CascadeSelect;

_defineProperty(CascadeSelect, "defaultProps", {
  id: null,
  inputRef: null,
  style: null,
  className: null,
  value: null,
  name: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  placeholder: null,
  itemTemplate: null,
  disabled: false,
  dataKey: null,
  inputId: null,
  tabIndex: null,
  ariaLabelledBy: null,
  appendTo: null,
  transitionOptions: null,
  onChange: null,
  onGroupChange: null,
  onBeforeShow: null,
  onBeforeHide: null,
  onShow: null,
  onHide: null
});

_defineProperty(CascadeSelect, "propTypes", {
  id: _propTypes.default.string,
  inputRef: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  value: _propTypes.default.any,
  name: _propTypes.default.string,
  options: _propTypes.default.array,
  optionLabel: _propTypes.default.string,
  optionValue: _propTypes.default.string,
  optionGroupLabel: _propTypes.default.string,
  optionGroupChildren: _propTypes.default.array,
  placeholder: _propTypes.default.string,
  itemTemplate: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  dataKey: _propTypes.default.string,
  inputId: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  ariaLabelledBy: _propTypes.default.string,
  appendTo: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  transitionOptions: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onGroupChange: _propTypes.default.func,
  onBeforeShow: _propTypes.default.func,
  onBeforeHide: _propTypes.default.func,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func
});