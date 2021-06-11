"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _Tooltip = require("../tooltip/Tooltip");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _FilterUtils = _interopRequireDefault(require("../utils/FilterUtils"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _MultiSelectPanel = require("./MultiSelectPanel");

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

var _ZIndexUtils = require("../utils/ZIndexUtils");

var _PrimeReact = _interopRequireDefault(require("../api/PrimeReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
    _this.onOptionSelect = _this.onOptionSelect.bind(_assertThisInitialized(_this));
    _this.onOptionKeyDown = _this.onOptionKeyDown.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
    _this.onCloseClick = _this.onCloseClick.bind(_assertThisInitialized(_this));
    _this.onSelectAll = _this.onSelectAll.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.getOptionLabel = _this.getOptionLabel.bind(_assertThisInitialized(_this));
    _this.getOptionRenderKey = _this.getOptionRenderKey.bind(_assertThisInitialized(_this));
    _this.isOptionDisabled = _this.isOptionDisabled.bind(_assertThisInitialized(_this));
    _this.getOptionGroupChildren = _this.getOptionGroupChildren.bind(_assertThisInitialized(_this));
    _this.getOptionGroupLabel = _this.getOptionGroupLabel.bind(_assertThisInitialized(_this));
    _this.getOptionGroupRenderKey = _this.getOptionGroupRenderKey.bind(_assertThisInitialized(_this));
    _this.allowOptionSelect = _this.allowOptionSelect.bind(_assertThisInitialized(_this));
    _this.isSelected = _this.isSelected.bind(_assertThisInitialized(_this));
    _this.isAllSelected = _this.isAllSelected.bind(_assertThisInitialized(_this));
    _this.getSelectedOptionIndex = _this.getSelectedOptionIndex.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.onOptionKeyDown = _this.onOptionKeyDown.bind(_assertThisInitialized(_this));
    _this.overlayRef = /*#__PURE__*/(0, _react.createRef)();
    _this.inputRef = /*#__PURE__*/(0, _react.createRef)(_this.props.inputRef);
    return _this;
  }

  _createClass(MultiSelect, [{
    key: "onPanelClick",
    value: function onPanelClick(event) {
      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "allowOptionSelect",
    value: function allowOptionSelect() {
      return !this.props.selectionLimit || !this.props.value || this.props.value && this.props.value.length < this.props.selectionLimit;
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(event) {
      var _this2 = this;

      var originalEvent = event.originalEvent,
          option = event.option;

      if (this.props.disabled || this.isOptionDisabled(option)) {
        return;
      }

      var optionValue = this.getOptionValue(option);
      var isOptionValueUsed = this.isOptionValueUsed(option);
      var selected = this.isSelected(option);
      var allowOptionSelect = this.allowOptionSelect();
      if (selected) this.updateModel(originalEvent, this.props.value.filter(function (val) {
        return !_ObjectUtils.default.equals(isOptionValueUsed ? val : _this2.getOptionValue(val), optionValue, _this2.equalityKey());
      }));else if (allowOptionSelect) this.updateModel(originalEvent, [].concat(_toConsumableArray(this.props.value || []), [optionValue]));
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
          this.onOptionSelect(event);
          originalEvent.preventDefault();
          break;
        //escape

        case 27:
          this.hide();
          this.inputRef.current.focus();
          break;

        default:
          break;
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return _DomHandler.default.hasClass(nextItem, 'p-disabled') || _DomHandler.default.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return _DomHandler.default.hasClass(prevItem, 'p-disabled') || _DomHandler.default.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem;else return null;
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

        this.inputRef.current.focus();
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
          if (this.state.overlayVisible) this.hide();else this.show();
          event.preventDefault();
          break;
        //escape

        case 27:
          this.hide();
          break;
        //tab

        case 9:
          if (this.state.overlayVisible) {
            var firstFocusableElement = _DomHandler.default.getFirstFocusableElement(this.overlayRef.current);

            if (firstFocusableElement) {
              firstFocusableElement.focus();
              event.preventDefault();
            }
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "onSelectAll",
    value: function onSelectAll(event) {
      var _this3 = this;

      if (this.props.onSelectAll) {
        this.props.onSelectAll(event);
      } else {
        var value = null;
        var visibleOptions = this.getVisibleOptions();

        if (event.checked) {
          value = [];

          if (visibleOptions) {
            var selectedOptions = visibleOptions.filter(function (option) {
              return _this3.isOptionDisabled(option) && _this3.isSelected(option);
            });
            value = selectedOptions.map(function (option) {
              return _this3.getOptionValue(option);
            });
          }
        } else if (visibleOptions) {
          visibleOptions = visibleOptions.filter(function (option) {
            return !_this3.isOptionDisabled(option);
          });

          if (this.props.optionGroupLabel) {
            value = [];
            visibleOptions.forEach(function (optionGroup) {
              return value = [].concat(_toConsumableArray(value), _toConsumableArray(_this3.getOptionGroupChildren(optionGroup).filter(function (option) {
                return !_this3.isOptionDisabled(option);
              }).map(function (option) {
                return _this3.getOptionValue(option);
              })));
            });
          } else {
            value = visibleOptions.map(function (option) {
              return _this3.getOptionValue(option);
            });
          }

          value = _toConsumableArray(new Set([].concat(_toConsumableArray(value), _toConsumableArray(this.props.value || []))));
        }

        this.updateModel(event.originalEvent, value);
      }
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
            id: this.props.id,
            value: value
          }
        });
      }
    }
  }, {
    key: "onFilterInputChange",
    value: function onFilterInputChange(event) {
      var _this4 = this;

      var filter = event.query;
      this.setState({
        filter: filter
      }, function () {
        if (_this4.props.onFilter) {
          _this4.props.onFilter({
            originalEvent: event,
            filter: filter
          });
        }
      });
    }
  }, {
    key: "resetFilter",
    value: function resetFilter() {
      var _this5 = this;

      var filter = '';
      this.setState({
        filter: filter
      }, function () {
        _this5.props.onFilter && _this5.props.onFilter({
          filter: filter
        });
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
    value: function onOverlayEnter(callback) {
      _ZIndexUtils.ZIndexUtils.set('overlay', this.overlayRef.current);

      this.alignOverlay();
      this.scrollInView();
      callback && callback();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered(callback) {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      callback && callback();
      this.props.onShow && this.props.onShow();
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

      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);

      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "alignOverlay",
    value: function alignOverlay() {
      _DomHandler.default.alignOverlay(this.overlayRef.current, this.label.parentElement, this.props.appendTo || _PrimeReact.default.appendTo);
    }
  }, {
    key: "scrollInView",
    value: function scrollInView() {
      var highlightItem = _DomHandler.default.findSingle(this.overlayRef.current, 'li.p-highlight');

      if (highlightItem) {
        highlightItem.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  }, {
    key: "onCloseClick",
    value: function onCloseClick(event) {
      this.hide();
      this.inputRef.current.focus();
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "getSelectedOptionIndex",
    value: function getSelectedOptionIndex() {
      if (this.props.value != null && this.props.options) {
        if (this.props.optionGroupLabel) {
          for (var i = 0; i < this.props.options.length; i++) {
            var selectedOptionIndex = this.findOptionIndexInList(this.props.value, this.getOptionGroupChildren(this.props.options[i]));

            if (selectedOptionIndex !== -1) {
              return {
                group: i,
                option: selectedOptionIndex
              };
            }
          }
        } else {
          return this.findOptionIndexInList(this.props.value, this.props.options);
        }
      }

      return -1;
    }
  }, {
    key: "findOptionIndexInList",
    value: function findOptionIndexInList(value, list) {
      var _this6 = this;

      var key = this.equalityKey();
      return list.findIndex(function (item) {
        return value.some(function (val) {
          return _ObjectUtils.default.equals(val, _this6.getOptionValue(item), key);
        });
      });
    }
  }, {
    key: "isSelected",
    value: function isSelected(option) {
      var _this7 = this;

      var selected = false;

      if (this.props.value) {
        var optionValue = this.getOptionValue(option);
        var isOptionValueUsed = this.isOptionValueUsed(option);
        var key = this.equalityKey();
        selected = this.props.value.some(function (val) {
          return _ObjectUtils.default.equals(isOptionValueUsed ? val : _this7.getOptionValue(val), optionValue, key);
        });
      }

      return selected;
    }
  }, {
    key: "getLabelByValue",
    value: function getLabelByValue(val) {
      var option;

      if (this.props.options) {
        if (this.props.optionGroupLabel) {
          var _iterator = _createForOfIteratorHelper(this.props.options),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optionGroup = _step.value;
              option = this.findOptionByValue(val, this.getOptionGroupChildren(optionGroup));

              if (option) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } else {
          option = this.findOptionByValue(val, this.props.options);
        }
      }

      return option ? this.getOptionLabel(option) : null;
    }
  }, {
    key: "findOptionByValue",
    value: function findOptionByValue(val, list) {
      var key = this.equalityKey();

      var _iterator2 = _createForOfIteratorHelper(list),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var option = _step2.value;
          var optionValue = this.getOptionValue(option);

          if (_ObjectUtils.default.equals(optionValue, val, key)) {
            return option;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return null;
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this8 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this8.props.onFocus) {
          _this8.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this9 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this9.props.onBlur) {
          _this9.props.onBlur(event);
        }
      });
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this10 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this10.state.overlayVisible && _this10.isOutsideClicked(event)) {
            _this10.hide();
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this11 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this11.state.overlayVisible) {
            _this11.hide();
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
      var _this12 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this12.state.overlayVisible && !_DomHandler.default.isAndroid()) {
            _this12.hide();
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

      if (this.state.overlayVisible && this.hasFilter()) {
        this.alignOverlay();
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

      _ZIndexUtils.ZIndexUtils.clear(this.overlayRef.current);
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      return this.state.filter && this.state.filter.trim().length > 0;
    }
  }, {
    key: "isAllSelected",
    value: function isAllSelected() {
      var _this13 = this;

      if (this.props.onSelectAll) {
        return this.props.selectAll;
      } else {
        var visibleOptions = this.getVisibleOptions();

        if (visibleOptions.length === 0) {
          return false;
        }

        visibleOptions = visibleOptions.filter(function (option) {
          return !_this13.isOptionDisabled(option);
        });

        if (this.props.optionGroupLabel) {
          var _iterator3 = _createForOfIteratorHelper(visibleOptions),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var optionGroup = _step3.value;
              var visibleOptionsGroupChildren = this.getOptionGroupChildren(optionGroup).filter(function (option) {
                return !_this13.isOptionDisabled(option);
              });

              var _iterator4 = _createForOfIteratorHelper(visibleOptionsGroupChildren),
                  _step4;

              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var option = _step4.value;

                  if (!this.isSelected(option)) {
                    return false;
                  }
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          var _iterator5 = _createForOfIteratorHelper(visibleOptions),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _option = _step5.value;

              if (!this.isSelected(_option)) {
                return false;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }

      return true;
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? _ObjectUtils.default.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      if (this.props.optionValue) {
        var data = _ObjectUtils.default.resolveFieldData(option, this.props.optionValue);

        return data !== null ? data : option;
      }

      return option && option['value'] !== undefined ? option['value'] : option;
    }
  }, {
    key: "getOptionRenderKey",
    value: function getOptionRenderKey(option) {
      return this.props.dataKey ? _ObjectUtils.default.resolveFieldData(option, this.props.dataKey) : this.getOptionLabel(option);
    }
  }, {
    key: "getOptionGroupRenderKey",
    value: function getOptionGroupRenderKey(optionGroup) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupLabel);
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupLabel);
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupChildren);
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option) {
      if (this.props.optionDisabled) {
        return _ObjectUtils.default.isFunction(this.props.optionDisabled) ? this.props.optionDisabled(option) : _ObjectUtils.default.resolveFieldData(option, this.props.optionDisabled);
      }

      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    }
  }, {
    key: "isOptionValueUsed",
    value: function isOptionValueUsed(option) {
      return this.props.optionValue || option && option['value'] !== undefined;
    }
  }, {
    key: "getVisibleOptions",
    value: function getVisibleOptions() {
      if (this.hasFilter()) {
        var filterValue = this.state.filter.trim().toLocaleLowerCase(this.props.filterLocale);
        var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];

        if (this.props.optionGroupLabel) {
          var filteredGroups = [];

          var _iterator6 = _createForOfIteratorHelper(this.props.options),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var optgroup = _step6.value;

              var filteredSubOptions = _FilterUtils.default.filter(this.getOptionGroupChildren(optgroup), searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);

              if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                  items: filteredSubOptions
                }));
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          return filteredGroups;
        } else {
          return _FilterUtils.default.filter(this.props.options, searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);
        }
      } else {
        return this.props.options;
      }
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
      return this.inputRef.current.checkValidity();
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
        if (this.props.value.length <= this.props.maxSelectedLabels) {
          label = '';

          for (var i = 0; i < this.props.value.length; i++) {
            if (i !== 0) {
              label += ',';
            }

            label += this.getLabelByValue(this.props.value[i]);
          }

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
      var _this14 = this;

      if (this.props.selectedItemTemplate) {
        if (!this.isEmpty()) {
          if (this.props.value.length <= this.props.maxSelectedLabels) {
            return this.props.value.map(function (val, index) {
              var item = _ObjectUtils.default.getJSXElement(_this14.props.selectedItemTemplate, val);

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
            var label = _this14.getLabelByValue(val);

            return /*#__PURE__*/_react.default.createElement("div", {
              className: "p-multiselect-token",
              key: label
            }, /*#__PURE__*/_react.default.createElement("span", {
              className: "p-multiselect-token-label"
            }, label), !_this14.props.disabled && /*#__PURE__*/_react.default.createElement("span", {
              className: "p-multiselect-token-icon pi pi-times-circle",
              onClick: function onClick(e) {
                return _this14.removeChip(e, val);
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
    key: "renderClearIcon",
    value: function renderClearIcon() {
      var _this15 = this;

      var empty = this.isEmpty();

      if (!empty && this.props.showClear && !this.props.disabled) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-multiselect-clear-icon pi pi-times",
          onClick: function onClick(e) {
            return _this15.updateModel(e, null);
          }
        });
      }

      return null;
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this16 = this;

      var empty = this.isEmpty();
      var content = this.getLabelContent();
      var labelClassName = (0, _ClassNames.classNames)('p-multiselect-label', {
        'p-placeholder': empty && this.props.placeholder,
        'p-multiselect-label-empty': empty && !this.props.placeholder && !this.props.selectedItemTemplate,
        'p-multiselect-items-label': !empty && this.props.value.length > this.props.maxSelectedLabels
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this16.label = el;
        },
        className: "p-multiselect-label-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: labelClassName
      }, content || this.props.placeholder || 'empty'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var className = (0, _ClassNames.classNames)('p-multiselect p-component p-inputwrapper', {
        'p-multiselect-chip': this.props.display === 'chip',
        'p-disabled': this.props.disabled,
        'p-multiselect-clearable': this.props.showClear && !this.props.disabled,
        'p-focus': this.state.focused,
        'p-inputwrapper-filled': this.props.value && this.props.value.length > 0,
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      }, this.props.className);
      var iconClassName = (0, _ClassNames.classNames)('p-multiselect-trigger-icon p-c', this.props.dropdownIcon);
      var visibleOptions = this.getVisibleOptions();
      var label = this.renderLabel();
      var clearIcon = this.renderClearIcon();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: className,
        onClick: this.onClick,
        ref: function ref(el) {
          return _this17.container = el;
        },
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: this.inputRef,
        id: this.props.inputId,
        name: this.props.name,
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
        className: iconClassName
      })), /*#__PURE__*/_react.default.createElement(_MultiSelectPanel.MultiSelectPanel, _extends({
        ref: this.overlayRef,
        visibleOptions: visibleOptions
      }, this.props, {
        onClick: this.onPanelClick,
        onOverlayHide: this.hide,
        filterValue: this.state.filter,
        hasFilter: this.hasFilter,
        onFilterInputChange: this.onFilterInputChange,
        onCloseClick: this.onCloseClick,
        onSelectAll: this.onSelectAll,
        getOptionLabel: this.getOptionLabel,
        getOptionRenderKey: this.getOptionRenderKey,
        isOptionDisabled: this.isOptionDisabled,
        getOptionGroupChildren: this.getOptionGroupChildren,
        getOptionGroupLabel: this.getOptionGroupLabel,
        getOptionGroupRenderKey: this.getOptionGroupRenderKey,
        isSelected: this.isSelected,
        getSelectedOptionIndex: this.getSelectedOptionIndex,
        isAllSelected: this.isAllSelected,
        onOptionSelect: this.onOptionSelect,
        allowOptionSelect: this.allowOptionSelect,
        onOptionKeyDown: this.onOptionKeyDown,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      })));
    }
  }]);

  return MultiSelect;
}(_react.Component);

exports.MultiSelect = MultiSelect;

_defineProperty(MultiSelect, "defaultProps", {
  id: null,
  inputRef: null,
  name: null,
  value: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionDisabled: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  optionGroupTemplate: null,
  display: 'comma',
  style: null,
  className: null,
  panelClassName: null,
  panelStyle: null,
  virtualScrollerOptions: null,
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
  appendTo: null,
  tooltip: null,
  tooltipOptions: null,
  maxSelectedLabels: 3,
  selectionLimit: null,
  selectedItemsLabel: '{0} items selected',
  ariaLabelledBy: null,
  itemTemplate: null,
  selectedItemTemplate: null,
  panelHeaderTemplate: null,
  panelFooterTemplate: null,
  transitionOptions: null,
  dropdownIcon: 'pi pi-chevron-down',
  showSelectAll: true,
  selectAll: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onShow: null,
  onHide: null,
  onFilter: null,
  onSelectAll: null
});

_defineProperty(MultiSelect, "propTypes", {
  id: _propTypes.default.string,
  inputRef: _propTypes.default.any,
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  options: _propTypes.default.array,
  optionLabel: _propTypes.default.string,
  optionValue: _propTypes.default.string,
  optionDisabled: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  optionGroupLabel: _propTypes.default.string,
  optionGroupChildren: _propTypes.default.string,
  optionGroupTemplate: _propTypes.default.any,
  display: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  panelClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  virtualScrollerOptions: _propTypes.default.object,
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
  appendTo: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  maxSelectedLabels: _propTypes.default.number,
  selectionLimit: _propTypes.default.number,
  selectedItemsLabel: _propTypes.default.string,
  ariaLabelledBy: _propTypes.default.string,
  itemTemplate: _propTypes.default.any,
  selectedItemTemplate: _propTypes.default.any,
  panelHeaderTemplate: _propTypes.default.any,
  panelFooterTemplate: _propTypes.default.any,
  transitionOptions: _propTypes.default.object,
  dropdownIcon: _propTypes.default.string,
  showSelectAll: _propTypes.default.bool,
  selectAll: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  onSelectAll: _propTypes.default.func
});