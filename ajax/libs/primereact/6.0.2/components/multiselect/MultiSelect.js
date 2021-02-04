"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelect = void 0;

var _ClassNames = require("../utils/ClassNames");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Tooltip = require("../tooltip/Tooltip");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _FilterUtils = _interopRequireDefault(require("../utils/FilterUtils"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _MultiSelectHeader = require("./MultiSelectHeader");

var _MultiSelectItem = require("./MultiSelectItem");

var _MultiSelectPanel = require("./MultiSelectPanel");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiSelect = /*#__PURE__*/function (_Component) {
  _inherits(MultiSelect, _Component);

  var _super = _createSuper(MultiSelect);

  function MultiSelect(props) {
    var _this;

    _classCallCheck(this, MultiSelect);

    _this = _super.call(this, props);
    _this.state = {
      filter: '',
      focused: false,
      overlayVisible: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.onOptionClick = _this.onOptionClick.bind(_assertThisInitialized(_this));
    _this.onOptionKeyDown = _this.onOptionKeyDown.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
    _this.onCloseClick = _this.onCloseClick.bind(_assertThisInitialized(_this));
    _this.onToggleAll = _this.onToggleAll.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(MultiSelect, [{
    key: "onOptionClick",
    value: function onOptionClick(event) {
      var optionValue = this.getOptionValue(event.option);
      var selectionIndex = this.findSelectionIndex(optionValue);
      var newValue;
      if (selectionIndex !== -1) newValue = this.props.value.filter(function (val, i) {
        return i !== selectionIndex;
      });else newValue = [].concat(_toConsumableArray(this.props.value || []), [optionValue]);
      this.updateModel(event.originalEvent, newValue);
    }
  }, {
    key: "onOptionKeyDown",
    value: function onOptionKeyDown(event) {
      var originalEvent = event.originalEvent;
      var listItem = originalEvent.currentTarget;

      switch (originalEvent.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.focus();
          }

          originalEvent.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.focus();
          }

          originalEvent.preventDefault();
          break;
        //enter and space

        case 13:
        case 32:
          this.onOptionClick(event);
          originalEvent.preventDefault();
          break;
        //escape

        case 27:
          this.hide();
          this.focusInput.focus();
          break;

        default:
          break;
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return !_DomHandler.default.hasClass(nextItem, 'p-multiselect-item') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return !_DomHandler.default.hasClass(prevItem, 'p-multiselect-item') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      if (!this.props.disabled && !this.isPanelClicked(event) && !_DomHandler.default.hasClass(event.target, 'p-multiselect-token-icon') && !this.isClearClicked(event)) {
        if (this.state.overlayVisible) {
          this.hide();
        } else {
          this.show();
        }

        this.focusInput.focus();
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          if (!this.state.overlayVisible && event.altKey) {
            this.show();
            event.preventDefault();
          }

          break;
        //space

        case 32:
          if (!this.state.overlayVisible) {
            this.show();
            event.preventDefault();
          }

          break;
        //escape

        case 27:
          this.hide();
          break;

        default:
          break;
      }
    }
  }, {
    key: "onToggleAll",
    value: function onToggleAll(event) {
      var newValue;

      if (event.checked) {
        newValue = [];
      } else {
        var options = this.hasFilter() ? this.filterOptions(this.props.options) : this.props.options;

        if (options) {
          newValue = [];

          var _iterator = _createForOfIteratorHelper(options),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var option = _step.value;
              newValue.push(this.getOptionValue(option));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      this.updateModel(event.originalEvent, newValue);
    }
  }, {
    key: "updateModel",
    value: function updateModel(event, value) {
      if (this.props.onChange) {
        this.props.onChange({
          originalEvent: event,
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
    key: "onFilter",
    value: function onFilter(event) {
      this.setState({
        filter: event.query
      });
    }
  }, {
    key: "resetFilter",
    value: function resetFilter() {
      this.setState({
        filter: ''
      });
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
      if (this.props.filter && this.props.resetFilterOnHide) {
        this.resetFilter();
      }
    }
  }, {
    key: "alignPanel",
    value: function alignPanel() {
      var container = this.label.parentElement;

      if (this.props.appendTo) {
        this.overlayRef.current.style.minWidth = _DomHandler.default.getWidth(container) + 'px';

        _DomHandler.default.absolutePosition(this.overlayRef.current, container);
      } else {
        _DomHandler.default.relativePosition(this.overlayRef.current, container);
      }
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick(event) {
      this.hide();
      this.focusInput.focus();
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "findSelectionIndex",
    value: function findSelectionIndex(value) {
      var index = -1;

      if (this.props.value) {
        var key = this.equalityKey();

        for (var i = 0; i < this.props.value.length; i++) {
          if (_ObjectUtils.default.equals(this.props.value[i], value, key)) {
            index = i;
            break;
          }
        }
      }

      return index;
    }
  }, {
    key: "isSelected",
    value: function isSelected(option) {
      return this.findSelectionIndex(this.getOptionValue(option)) !== -1;
    }
  }, {
    key: "getLabelByValue",
    value: function getLabelByValue(val) {
      var label = null;

      for (var i = 0; i < this.props.options.length; i++) {
        var option = this.props.options[i];
        var optionValue = this.getOptionValue(option);
        var key = this.equalityKey();

        if (_ObjectUtils.default.equals(optionValue, val, key)) {
          label = this.getOptionLabel(option);
          break;
        }
      }

      return label;
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this2 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this2.props.onFocus) {
          _this2.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this3.props.onBlur) {
          _this3.props.onBlur(event);
        }
      });
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this4 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this4.state.overlayVisible && _this4.isOutsideClicked(event)) {
            _this4.hide();
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this5 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this5.state.overlayVisible) {
            _this5.hide();
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
      var _this6 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this6.state.overlayVisible) {
            _this6.hide();
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
      return this.container && !(this.container.isSameNode(event.target) || this.isClearClicked(event) || this.container.contains(event.target) || this.isPanelClicked(event));
    }
  }, {
    key: "isClearClicked",
    value: function isClearClicked(event) {
      return _DomHandler.default.hasClass(event.target, 'p-multiselect-clear-icon');
    }
  }, {
    key: "isPanelClicked",
    value: function isPanelClicked(event) {
      return this.overlayRef && this.overlayRef.current && this.overlayRef.current.contains(event.target);
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
      if (prevProps.tooltip !== this.props.tooltip) {
        if (this.tooltip) this.tooltip.updateContent(this.props.tooltip);else this.renderTooltip();
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
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      return this.state.filter && this.state.filter.trim().length > 0;
    }
  }, {
    key: "isAllChecked",
    value: function isAllChecked(visibleOptions) {
      if (this.hasFilter()) return this.props.value && visibleOptions && visibleOptions.length && this.props.value.length === visibleOptions.length;else return this.props.value && this.props.options && this.props.value.length === this.props.options.length;
    }
  }, {
    key: "filterOptions",
    value: function filterOptions(options) {
      if (options) {
        var filterValue = this.state.filter.trim().toLocaleLowerCase(this.props.filterLocale);
        var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];
        return _FilterUtils.default.filter(options, searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);
      }
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? _ObjectUtils.default.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? _ObjectUtils.default.resolveFieldData(option, this.props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this.props.value || this.props.value.length === 0;
    }
  }, {
    key: "equalityKey",
    value: function equalityKey() {
      return this.props.optionValue ? null : this.props.dataKey;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity() {
      return this.nativeSelect.checkValidity();
    }
  }, {
    key: "removeChip",
    value: function removeChip(event, item) {
      var key = this.equalityKey();
      var value = this.props.value.filter(function (val) {
        return !_ObjectUtils.default.equals(val, item, key);
      });
      this.updateModel(event, value);
    }
  }, {
    key: "getSelectedItemsLabel",
    value: function getSelectedItemsLabel() {
      var pattern = /{(.*?)}/;

      if (pattern.test(this.props.selectedItemsLabel)) {
        return this.props.selectedItemsLabel.replace(this.props.selectedItemsLabel.match(pattern)[0], this.props.value.length + '');
      }

      return this.props.selectedItemsLabel;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      var label;

      if (!this.isEmpty() && !this.props.fixedPlaceholder) {
        label = '';

        for (var i = 0; i < this.props.value.length; i++) {
          if (i !== 0) {
            label += ',';
          }

          label += this.getLabelByValue(this.props.value[i]);
        }

        if (this.props.value.length <= this.props.maxSelectedLabels) {
          return label;
        } else {
          return this.getSelectedItemsLabel();
        }
      }

      return label;
    }
  }, {
    key: "getLabelContent",
    value: function getLabelContent() {
      var _this7 = this;

      if (this.props.selectedItemTemplate) {
        if (!this.isEmpty()) {
          if (this.props.value.length <= this.props.maxSelectedLabels) {
            return this.props.value.map(function (val, index) {
              var item = _ObjectUtils.default.getJSXElement(_this7.props.selectedItemTemplate, val);

              return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
                key: index
              }, item);
            });
          } else {
            return this.getSelectedItemsLabel();
          }
        } else {
          return _ObjectUtils.default.getJSXElement(this.props.selectedItemTemplate);
        }
      } else {
        if (this.props.display === 'chip' && !this.isEmpty()) {
          return this.props.value.map(function (val) {
            var label = _this7.getLabelByValue(val);

            return /*#__PURE__*/_react.default.createElement("div", {
              className: "p-multiselect-token",
              key: label
            }, /*#__PURE__*/_react.default.createElement("span", {
              className: "p-multiselect-token-label"
            }, label), !_this7.props.disabled && /*#__PURE__*/_react.default.createElement("span", {
              className: "p-multiselect-token-icon pi pi-times-circle",
              onClick: function onClick(e) {
                return _this7.removeChip(e, val);
              }
            }));
          });
        }

        return this.getLabel();
      }
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
    key: "renderHeader",
    value: function renderHeader(items) {
      return /*#__PURE__*/_react.default.createElement(_MultiSelectHeader.MultiSelectHeader, {
        filter: this.props.filter,
        filterValue: this.state.filter,
        onFilter: this.onFilter,
        filterPlaceholder: this.props.filterPlaceholder,
        onClose: this.onCloseClick,
        onToggleAll: this.onToggleAll,
        allChecked: this.isAllChecked(items)
      });
    }
  }, {
    key: "renderClearIcon",
    value: function renderClearIcon() {
      var _this8 = this;

      var empty = this.isEmpty();

      if (!empty && this.props.showClear && !this.props.disabled) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-multiselect-clear-icon pi pi-times",
          onClick: function onClick(e) {
            return _this8.updateModel(e, null);
          }
        });
      }

      return null;
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this9 = this;

      var empty = this.isEmpty();
      var content = this.getLabelContent();
      var labelClassName = (0, _ClassNames.classNames)('p-multiselect-label', {
        'p-placeholder': empty && this.props.placeholder,
        'p-multiselect-label-empty': empty && !this.props.placeholder && !this.props.selectedItemTemplate,
        'p-multiselect-items-label': !empty && this.props.value.length > this.props.maxSelectedLabels
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this9.label = el;
        },
        className: "p-multiselect-label-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: labelClassName
      }, content || this.props.placeholder || 'empty'));
    }
  }, {
    key: "renderHiddenSelect",
    value: function renderHiddenSelect() {
      var _this10 = this;

      var selectedOptions = this.props.value ? this.props.value.map(function (option, index) {
        return /*#__PURE__*/_react.default.createElement("option", {
          key: _this10.getOptionLabel(option) + '_' + index,
          value: _this10.getOptionValue(option)
        });
      }) : null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible p-multiselect-hidden-select"
      }, /*#__PURE__*/_react.default.createElement("select", {
        ref: function ref(el) {
          return _this10.nativeSelect = el;
        },
        required: this.props.required,
        name: this.props.name,
        tabIndex: -1,
        "aria-hidden": "true",
        multiple: true
      }, selectedOptions));
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      var className = (0, _ClassNames.classNames)('p-multiselect p-component p-inputwrapper', {
        'p-multiselect-chip': this.props.display === 'chip',
        'p-disabled': this.props.disabled,
        'p-multiselect-clearable': this.props.showClear && !this.props.disabled,
        'p-focus': this.state.focused,
        'p-inputwrapper-filled': this.props.value && this.props.value.length > 0,
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      }, this.props.className);
      var label = this.renderLabel();
      var clearIcon = this.renderClearIcon();
      var hiddenSelect = this.renderHiddenSelect();
      var items = this.props.options;
      var hasFilter = this.hasFilter();

      if (hasFilter) {
        items = this.filterOptions(items);
      }

      if (items && items.length) {
        items = items.map(function (option, index) {
          var optionLabel = _this11.getOptionLabel(option);

          return /*#__PURE__*/_react.default.createElement(_MultiSelectItem.MultiSelectItem, {
            key: optionLabel + '_' + index,
            label: optionLabel,
            option: option,
            disabled: option.disabled,
            template: _this11.props.itemTemplate,
            selected: _this11.isSelected(option),
            onClick: _this11.onOptionClick,
            onKeyDown: _this11.onOptionKeyDown,
            tabIndex: _this11.props.tabIndex
          });
        });
      } else if (hasFilter) {
        var emptyFilterMessage = _ObjectUtils.default.getJSXElement(this.props.emptyFilterMessage, this.props);

        items = /*#__PURE__*/_react.default.createElement("li", {
          className: "p-multiselect-empty-message"
        }, emptyFilterMessage);
      }

      var header = this.renderHeader(items);
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id,
        className: className,
        onClick: this.onClick,
        ref: function ref(el) {
          return _this11.container = el;
        },
        style: this.props.style
      }, hiddenSelect, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          return _this11.focusInput = el;
        },
        id: this.props.inputId,
        readOnly: true,
        type: "text",
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        role: "listbox",
        "aria-haspopup": "listbox",
        "aria-labelledby": this.props.ariaLabelledBy,
        "aria-expanded": this.state.overlayVisible,
        disabled: this.props.disabled,
        tabIndex: this.props.tabIndex
      })), label, clearIcon, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-multiselect-trigger"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-multiselect-trigger-icon pi pi-chevron-down p-c"
      })), /*#__PURE__*/_react.default.createElement(_MultiSelectPanel.MultiSelectPanel, {
        ref: this.overlayRef,
        header: header,
        appendTo: this.props.appendTo,
        scrollHeight: this.props.scrollHeight,
        panelClassName: this.props.panelClassName,
        panelStyle: this.props.panelStyle,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, items));
    }
  }]);

  return MultiSelect;
}(_react.Component);

exports.MultiSelect = MultiSelect;

_defineProperty(MultiSelect, "defaultProps", {
  id: null,
  name: null,
  value: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  display: 'comma',
  style: null,
  className: null,
  panelClassName: null,
  panelStyle: null,
  scrollHeight: '200px',
  placeholder: null,
  fixedPlaceholder: false,
  disabled: false,
  showClear: false,
  filter: false,
  filterBy: null,
  filterMatchMode: 'contains',
  filterPlaceholder: null,
  filterLocale: undefined,
  emptyFilterMessage: 'No results found',
  resetFilterOnHide: false,
  tabIndex: 0,
  dataKey: null,
  inputId: null,
  required: false,
  appendTo: null,
  tooltip: null,
  tooltipOptions: null,
  maxSelectedLabels: 3,
  selectedItemsLabel: '{0} items selected',
  ariaLabelledBy: null,
  itemTemplate: null,
  selectedItemTemplate: null,
  onChange: null,
  onFocus: null,
  onBlur: null
});

_defineProperty(MultiSelect, "propTypes", {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  options: _propTypes.default.array,
  optionLabel: _propTypes.default.string,
  optionValue: _propTypes.default.string,
  display: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  panelClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  scrollHeight: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  fixedPlaceholder: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  showClear: _propTypes.default.bool,
  filter: _propTypes.default.bool,
  filterBy: _propTypes.default.string,
  filterMatchMode: _propTypes.default.string,
  filterPlaceholder: _propTypes.default.string,
  filterLocale: _propTypes.default.string,
  emptyFilterMessage: _propTypes.default.any,
  resetFilterOnHide: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  dataKey: _propTypes.default.string,
  inputId: _propTypes.default.string,
  required: _propTypes.default.bool,
  appendTo: _propTypes.default.object,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  maxSelectedLabels: _propTypes.default.number,
  selectedItemsLabel: _propTypes.default.string,
  ariaLabelledBy: _propTypes.default.string,
  itemTemplate: _propTypes.default.any,
  selectedItemTemplate: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
});