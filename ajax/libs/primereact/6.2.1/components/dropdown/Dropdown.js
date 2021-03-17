"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _FilterUtils = _interopRequireDefault(require("../utils/FilterUtils"));

var _ClassNames = require("../utils/ClassNames");

var _DropdownPanel = require("./DropdownPanel");

var _DropdownItem = require("./DropdownItem");

var _Tooltip = require("../tooltip/Tooltip");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

var _OverlayEventBus = _interopRequireDefault(require("../overlayeventbus/OverlayEventBus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var Dropdown = /*#__PURE__*/function (_Component) {
  _inherits(Dropdown, _Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, props);
    _this.state = {
      filter: '',
      focused: false,
      overlayVisible: false
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onFilterContainerClick = _this.onFilterContainerClick.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onEditableInputChange = _this.onEditableInputChange.bind(_assertThisInitialized(_this));
    _this.onEditableInputFocus = _this.onEditableInputFocus.bind(_assertThisInitialized(_this));
    _this.onOptionClick = _this.onOptionClick.bind(_assertThisInitialized(_this));
    _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
    _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.resetFilter = _this.resetFilter.bind(_assertThisInitialized(_this));
    _this.clear = _this.clear.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(Dropdown, [{
    key: "onClick",
    value: function onClick(event) {
      if (this.props.disabled) {
        return;
      }

      if (!this.isClearClicked(event) && event.target.tagName !== 'INPUT') {
        this.focusInput.focus();

        if (this.state.overlayVisible) {
          this.hideOverlay();
        } else {
          this.showOverlay();
        }
      }
    }
  }, {
    key: "onFilterContainerClick",
    value: function onFilterContainerClick(event) {
      event.stopPropagation();
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(event) {
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
    key: "onInputBlur",
    value: function onInputBlur(event) {
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
    key: "onPanelClick",
    value: function onPanelClick(event) {
      _OverlayEventBus.default.emit('overlay-click', {
        originalEvent: event,
        target: this.container
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          this.onDownKey(event);
          break;
        //up

        case 38:
          this.onUpKey(event);
          break;
        //space

        case 32:
          if (this.state.overlayVisible) this.hideOverlay();else this.showOverlay();
          event.preventDefault();
          break;
        //enter

        case 13:
          this.hideOverlay();
          event.preventDefault();
          break;
        //escape and tab

        case 27:
        case 9:
          this.hideOverlay();
          break;

        default:
          this.search(event);
          break;
      }
    }
  }, {
    key: "onFilterInputKeyDown",
    value: function onFilterInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          this.onDownKey(event);
          break;
        //up

        case 38:
          this.onUpKey(event);
          break;
        //enter and escape

        case 13:
        case 27:
          this.hideOverlay();
          event.preventDefault();
          break;

        default:
          break;
      }
    }
  }, {
    key: "onUpKey",
    value: function onUpKey(event) {
      var visibleOptions = this.getVisibleOptions();

      if (visibleOptions) {
        var prevOption = this.findPrevOption(this.getSelectedOptionIndex());

        if (prevOption) {
          this.selectItem({
            originalEvent: event,
            option: prevOption
          });
        }
      }

      event.preventDefault();
    }
  }, {
    key: "onDownKey",
    value: function onDownKey(event) {
      var visibleOptions = this.getVisibleOptions();

      if (visibleOptions) {
        if (!this.state.overlayVisible && event.altKey) {
          this.showOverlay();
        } else {
          var nextOption = this.findNextOption(this.getSelectedOptionIndex());

          if (nextOption) {
            this.selectItem({
              originalEvent: event,
              option: nextOption
            });
          }
        }
      }

      event.preventDefault();
    }
  }, {
    key: "findNextOption",
    value: function findNextOption(index) {
      var visibleOptions = this.getVisibleOptions();

      if (this.props.optionGroupLabel) {
        var groupIndex = index === -1 ? 0 : index.group;
        var optionIndex = index === -1 ? -1 : index.option;
        var option = this.findNextOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex + 1 !== visibleOptions.length) return this.findNextOption({
          group: groupIndex + 1,
          option: -1
        });else return null;
      } else {
        return this.findNextOptionInList(visibleOptions, index);
      }
    }
  }, {
    key: "findNextOptionInList",
    value: function findNextOptionInList(list, index) {
      var i = index + 1;

      if (i === list.length) {
        return null;
      }

      var option = list[i];
      if (this.isOptionDisabled(option)) return this.findNextOptionInList(i);else return option;
    }
  }, {
    key: "findPrevOption",
    value: function findPrevOption(index) {
      if (index === -1) {
        return null;
      }

      var visibleOptions = this.getVisibleOptions();

      if (this.props.optionGroupLabel) {
        var groupIndex = index.group;
        var optionIndex = index.option;
        var option = this.findPrevOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex > 0) return this.findPrevOption({
          group: groupIndex - 1,
          option: this.getOptionGroupChildren(visibleOptions[groupIndex - 1]).length
        });else return null;
      } else {
        return this.findPrevOptionInList(visibleOptions, index);
      }
    }
  }, {
    key: "findPrevOptionInList",
    value: function findPrevOptionInList(list, index) {
      var i = index - 1;

      if (i < 0) {
        return null;
      }

      var option = list[i];
      if (this.isOptionDisabled(option)) return this.findPrevOption(i);else return option;
    }
  }, {
    key: "search",
    value: function search(event) {
      var _this4 = this;

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      var char = String.fromCharCode(event.keyCode);
      this.previousSearchChar = this.currentSearchChar;
      this.currentSearchChar = char;
      if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;else this.searchValue = this.searchValue ? this.searchValue + char : char;

      if (this.searchValue) {
        var searchIndex = this.getSelectedOptionIndex();
        var newOption = this.props.optionGroupLabel ? this.searchOptionInGroup(searchIndex) : this.searchOption(++searchIndex);

        if (newOption) {
          this.selectItem({
            originalEvent: event,
            option: newOption
          });
          this.selectedOptionUpdated = true;
        }
      }

      this.searchTimeout = setTimeout(function () {
        _this4.searchValue = null;
      }, 250);
    }
  }, {
    key: "searchOption",
    value: function searchOption(index) {
      var option;

      if (this.searchValue) {
        var visibleOptions = this.getVisibleOptions();
        option = this.searchOptionInRange(index, visibleOptions.length);

        if (!option) {
          option = this.searchOptionInRange(0, index);
        }
      }

      return option;
    }
  }, {
    key: "searchOptionInRange",
    value: function searchOptionInRange(start, end) {
      var visibleOptions = this.getVisibleOptions();

      for (var i = start; i < end; i++) {
        var opt = visibleOptions[i];

        if (this.matchesSearchValue(opt)) {
          return opt;
        }
      }

      return null;
    }
  }, {
    key: "searchOptionInGroup",
    value: function searchOptionInGroup(index) {
      var searchIndex = index === -1 ? {
        group: 0,
        option: -1
      } : index;
      var visibleOptions = this.getVisibleOptions();

      for (var i = searchIndex.group; i < visibleOptions.length; i++) {
        var groupOptions = this.getOptionGroupChildren(visibleOptions[i]);

        for (var j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
          if (this.matchesSearchValue(groupOptions[j])) {
            return groupOptions[j];
          }
        }
      }

      for (var _i = 0; _i <= searchIndex.group; _i++) {
        var _groupOptions = this.getOptionGroupChildren(visibleOptions[_i]);

        for (var _j = 0; _j < (searchIndex.group === _i ? searchIndex.option : _groupOptions.length); _j++) {
          if (this.matchesSearchValue(_groupOptions[_j])) {
            return _groupOptions[_j];
          }
        }
      }

      return null;
    }
  }, {
    key: "matchesSearchValue",
    value: function matchesSearchValue(option) {
      var label = this.getOptionLabel(option).toLocaleLowerCase(this.props.filterLocale);
      return label.startsWith(this.searchValue.toLocaleLowerCase(this.props.filterLocale));
    }
  }, {
    key: "onEditableInputChange",
    value: function onEditableInputChange(event) {
      this.props.onChange({
        originalEvent: event.originalEvent,
        value: event.target.value,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: this.props.name,
          id: this.id,
          value: event.target.value
        }
      });
    }
  }, {
    key: "onEditableInputFocus",
    value: function onEditableInputFocus(event) {
      var _this5 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        _this5.hideOverlay();

        if (_this5.props.onFocus) {
          _this5.props.onFocus(event);
        }
      });
    }
  }, {
    key: "onOptionClick",
    value: function onOptionClick(event) {
      var option = event.option;

      if (!option.disabled) {
        this.selectItem(event);
        this.focusInput.focus();
      }

      this.hideOverlay();
    }
  }, {
    key: "onFilterInputChange",
    value: function onFilterInputChange(event) {
      this.setState({
        filter: event.target.value
      });
    }
  }, {
    key: "resetFilter",
    value: function resetFilter(callback) {
      this.setState({
        filter: ''
      }, callback);
    }
  }, {
    key: "clear",
    value: function clear(event) {
      this.props.onChange({
        originalEvent: event,
        value: undefined,
        stopPropagation: function stopPropagation() {},
        preventDefault: function preventDefault() {},
        target: {
          name: this.props.name,
          id: this.id,
          value: undefined
        }
      });
      this.updateEditableLabel();
    }
  }, {
    key: "selectItem",
    value: function selectItem(event) {
      var currentSelectedOption = this.getSelectedOption();

      if (currentSelectedOption !== event.option) {
        this.updateEditableLabel(event.option);
        var optionValue = this.getOptionValue(event.option);
        this.props.onChange({
          originalEvent: event.originalEvent,
          value: optionValue,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: this.props.name,
            id: this.id,
            value: optionValue
          }
        });
      }
    }
  }, {
    key: "getSelectedOption",
    value: function getSelectedOption() {
      var index = this.getSelectedOptionIndex();
      return index !== -1 ? this.props.optionGroupLabel ? this.getOptionGroupChildren(this.props.options[index.group])[index.option] : this.props.options[index] : null;
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
      var key = this.equalityKey();

      for (var i = 0; i < list.length; i++) {
        if (_ObjectUtils.default.equals(value, this.getOptionValue(list[i]), key)) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "isSelected",
    value: function isSelected(option) {
      return _ObjectUtils.default.equals(this.props.value, this.getOptionValue(option), this.equalityKey());
    }
  }, {
    key: "equalityKey",
    value: function equalityKey() {
      return this.props.optionValue ? null : this.props.dataKey;
    }
  }, {
    key: "showOverlay",
    value: function showOverlay() {
      this.setState({
        overlayVisible: true
      });
    }
  }, {
    key: "hideOverlay",
    value: function hideOverlay() {
      this.setState({
        overlayVisible: false
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
      this.alignPanel();
      this.scrollInView();
    }
  }, {
    key: "onOverlayEntered",
    value: function onOverlayEntered() {
      this.bindDocumentClickListener();
      this.bindScrollListener();
      this.bindResizeListener();

      if (this.props.filter && this.props.filterInputAutoFocus) {
        this.filterInput.focus();
      }
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

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "alignPanel",
    value: function alignPanel() {
      var container = this.input.parentElement;
      this.overlayRef.current.style.minWidth = _DomHandler.default.getOuterWidth(container) + 'px';

      _DomHandler.default.absolutePosition(this.overlayRef.current, container);
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
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this6 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this6.state.overlayVisible && _this6.isOutsideClicked(event)) {
            _this6.hideOverlay();
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
      var _this7 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this7.state.overlayVisible) {
            _this7.hideOverlay();
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
      var _this8 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this8.state.overlayVisible) {
            _this8.hideOverlay();
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
      return this.container && !(this.container.isSameNode(event.target) || this.isClearClicked(event) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
    }
  }, {
    key: "isClearClicked",
    value: function isClearClicked(event) {
      return _DomHandler.default.hasClass(event.target, 'p-dropdown-clear-icon');
    }
  }, {
    key: "updateEditableLabel",
    value: function updateEditableLabel(option) {
      if (this.input) {
        this.input.value = option ? this.getOptionLabel(option) : this.props.value || '';
      }
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      return this.state.filter && this.state.filter.trim().length > 0;
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? _ObjectUtils.default.resolveFieldData(option, this.props.optionLabel) : option['label'] !== undefined ? option['label'] : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? _ObjectUtils.default.resolveFieldData(option, this.props.optionValue) : option['value'] !== undefined ? option['value'] : option;
    }
  }, {
    key: "getOptionRenderKey",
    value: function getOptionRenderKey(option) {
      return this.props.dataKey ? _ObjectUtils.default.resolveFieldData(option, this.props.dataKey) : this.getOptionLabel(option);
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option) {
      return this.props.optionDisabled ? _ObjectUtils.default.resolveFieldData(option, this.props.optionDisabled) : false;
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
    key: "checkValidity",
    value: function checkValidity() {
      return this.nativeSelect.checkValidity();
    }
  }, {
    key: "getVisibleOptions",
    value: function getVisibleOptions() {
      if (this.hasFilter()) {
        var filterValue = this.state.filter.trim().toLocaleLowerCase(this.props.filterLocale);
        var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];

        if (this.props.optionGroupLabel) {
          var filteredGroups = [];

          var _iterator = _createForOfIteratorHelper(this.props.options),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optgroup = _step.value;

              var filteredSubOptions = _FilterUtils.default.filter(this.getOptionGroupChildren(optgroup), searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);

              if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                  items: filteredSubOptions
                }));
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
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
    key: "updateInputField",
    value: function updateInputField() {
      if (this.props.editable && this.input) {
        var selectedOption = this.getSelectedOption();
        var label = selectedOption ? this.getOptionLabel(selectedOption) : null;
        var value = label || this.props.value || '';
        this.input.value = value;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus && this.focusInput) {
        this.focusInput.focus();
      }

      if (this.props.tooltip) {
        this.renderTooltip();
      }

      this.updateInputField();
      this.nativeSelect.selectedIndex = 1;
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

      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }

      _DomHandler.default.revertZIndex();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.state.overlayVisible) {
        if (this.props.filter) {
          this.alignPanel();
        }

        if (prevProps.value !== this.props.value) {
          this.scrollInView();
        }
      }

      if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
        if (this.tooltip) this.tooltip.update(_objectSpread({
          content: this.props.tooltip
        }, this.props.tooltipOptions || {}));else this.renderTooltip();
      }

      if (this.state.filter && (!this.props.options || this.props.options.length === 0)) {
        this.setState({
          filter: ''
        });
      }

      this.updateInputField();
      this.nativeSelect.selectedIndex = 1;
    }
  }, {
    key: "renderHiddenSelect",
    value: function renderHiddenSelect(selectedOption) {
      var _this9 = this;

      var placeHolderOption = /*#__PURE__*/_react.default.createElement("option", {
        value: ""
      }, this.props.placeholder);

      var option = selectedOption ? /*#__PURE__*/_react.default.createElement("option", {
        value: selectedOption.value
      }, this.getOptionLabel(selectedOption)) : null;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible p-dropdown-hidden-select"
      }, /*#__PURE__*/_react.default.createElement("select", {
        ref: function ref(el) {
          return _this9.nativeSelect = el;
        },
        required: this.props.required,
        name: this.props.name,
        tabIndex: -1,
        "aria-hidden": "true"
      }, placeHolderOption, option));
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
    key: "renderKeyboardHelper",
    value: function renderKeyboardHelper() {
      var _this10 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          return _this10.focusInput = el;
        },
        id: this.props.inputId,
        type: "text",
        readOnly: true,
        "aria-haspopup": "listbox",
        onFocus: this.onInputFocus,
        onBlur: this.onInputBlur,
        onKeyDown: this.onInputKeyDown,
        disabled: this.props.disabled,
        tabIndex: this.props.tabIndex,
        "aria-label": this.props.ariaLabel,
        "aria-labelledby": this.props.ariaLabelledBy
      }));
    }
  }, {
    key: "renderLabel",
    value: function renderLabel(selectedOption) {
      var _this11 = this;

      var label = selectedOption ? this.getOptionLabel(selectedOption) : null;

      if (this.props.editable) {
        var value = label || this.props.value || '';
        return /*#__PURE__*/_react.default.createElement("input", {
          ref: function ref(el) {
            return _this11.input = el;
          },
          type: "text",
          defaultValue: value,
          className: "p-dropdown-label p-inputtext",
          disabled: this.props.disabled,
          placeholder: this.props.placeholder,
          maxLength: this.props.maxLength,
          onInput: this.onEditableInputChange,
          onFocus: this.onEditableInputFocus,
          onBlur: this.onInputBlur,
          "aria-label": this.props.ariaLabel,
          "aria-labelledby": this.props.ariaLabelledBy,
          "aria-haspopup": "listbox"
        });
      } else {
        var className = (0, _ClassNames.classNames)('p-dropdown-label p-inputtext', {
          'p-placeholder': label === null && this.props.placeholder,
          'p-dropdown-label-empty': label === null && !this.props.placeholder
        });
        var content = this.props.valueTemplate ? _ObjectUtils.default.getJSXElement(this.props.valueTemplate, selectedOption, this.props) : label || this.props.placeholder || 'empty';
        return /*#__PURE__*/_react.default.createElement("span", {
          ref: function ref(el) {
            return _this11.input = el;
          },
          className: className
        }, content);
      }
    }
  }, {
    key: "renderClearIcon",
    value: function renderClearIcon() {
      if (this.props.value != null && this.props.showClear && !this.props.disabled) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-dropdown-clear-icon pi pi-times",
          onClick: this.clear
        });
      }

      return null;
    }
  }, {
    key: "renderDropdownIcon",
    value: function renderDropdownIcon() {
      var _this12 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this12.trigger = el;
        },
        className: "p-dropdown-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-dropdown-trigger-icon pi pi-chevron-down p-clickable"
      }));
    }
  }, {
    key: "renderGroupChildren",
    value: function renderGroupChildren(optionGroup) {
      var _this13 = this;

      var groupChildren = this.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = _this13.getOptionLabel(option);

        var optionKey = j + '_' + _this13.getOptionRenderKey(option);

        var disabled = _this13.isOptionDisabled(option);

        return /*#__PURE__*/_react.default.createElement(_DropdownItem.DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          template: _this13.props.itemTemplate,
          selected: _this13.isSelected(option),
          disabled: disabled,
          onClick: _this13.onOptionClick
        });
      });
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this14 = this;

      var visibleOptions = this.getVisibleOptions();

      if (visibleOptions) {
        if (this.props.optionGroupLabel) {
          return visibleOptions.map(function (option, i) {
            var groupContent = _this14.props.optionGroupTemplate ? _ObjectUtils.default.getJSXElement(_this14.props.optionGroupTemplate, option, i) : _this14.getOptionGroupLabel(option);

            var groupChildrenContent = _this14.renderGroupChildren(option);

            var key = i + '_' + _this14.getOptionGroupRenderKey(option);

            return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
              key: key
            }, /*#__PURE__*/_react.default.createElement("li", {
              className: "p-dropdown-item-group"
            }, groupContent), groupChildrenContent);
          });
        } else {
          return visibleOptions.map(function (option, index) {
            var optionLabel = _this14.getOptionLabel(option);

            var optionKey = index + '_' + _this14.getOptionRenderKey(option);

            var disabled = _this14.isOptionDisabled(option);

            return /*#__PURE__*/_react.default.createElement(_DropdownItem.DropdownItem, {
              key: optionKey,
              label: optionLabel,
              option: option,
              template: _this14.props.itemTemplate,
              selected: _this14.isSelected(option),
              disabled: disabled,
              onClick: _this14.onOptionClick
            });
          });
        }
      } else if (this.hasFilter()) {
        var emptyFilterMessage = _ObjectUtils.default.getJSXElement(this.props.emptyFilterMessage, this.props);

        return /*#__PURE__*/_react.default.createElement("li", {
          className: "p-dropdown-empty-message"
        }, emptyFilterMessage);
      }

      return null;
    }
  }, {
    key: "renderFilterClearIcon",
    value: function renderFilterClearIcon() {
      var _this15 = this;

      if (this.props.showFilterClear && this.state.filter) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-dropdown-filter-clear-icon pi pi-times",
          onClick: function onClick() {
            return _this15.resetFilter(function () {
              return _this15.filterInput.focus();
            });
          }
        });
      }

      return null;
    }
  }, {
    key: "renderFilter",
    value: function renderFilter() {
      var _this16 = this;

      if (this.props.filter) {
        var clearIcon = this.renderFilterClearIcon();
        var containerClassName = (0, _ClassNames.classNames)('p-dropdown-filter-container', {
          'p-dropdown-clearable-filter': !!clearIcon
        });
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-dropdown-header"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: containerClassName,
          onClick: this.onFilterContainerClick
        }, /*#__PURE__*/_react.default.createElement("input", {
          ref: function ref(el) {
            return _this16.filterInput = el;
          },
          type: "text",
          autoComplete: "off",
          className: "p-dropdown-filter p-inputtext p-component",
          placeholder: this.props.filterPlaceholder,
          onKeyDown: this.onFilterInputKeyDown,
          onChange: this.onFilterInputChange,
          value: this.state.filter
        }), clearIcon, /*#__PURE__*/_react.default.createElement("i", {
          className: "p-dropdown-filter-icon pi pi-search"
        })));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var className = (0, _ClassNames.classNames)('p-dropdown p-component p-inputwrapper', this.props.className, {
        'p-disabled': this.props.disabled,
        'p-focus': this.state.focused,
        'p-dropdown-clearable': this.props.showClear && !this.props.disabled,
        'p-inputwrapper-filled': this.props.value,
        'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
      });
      var selectedOption = this.getSelectedOption();
      var hiddenSelect = this.renderHiddenSelect(selectedOption);
      var keyboardHelper = this.renderKeyboardHelper();
      var labelElement = this.renderLabel(selectedOption);
      var dropdownIcon = this.renderDropdownIcon();
      var items = this.renderItems();
      var filterElement = this.renderFilter();
      var clearIcon = this.renderClearIcon();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id,
        ref: function ref(el) {
          return _this17.container = el;
        },
        className: className,
        style: this.props.style,
        onClick: this.onClick,
        onMouseDown: this.props.onMouseDown,
        onContextMenu: this.props.onContextMenu
      }, keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/_react.default.createElement(_DropdownPanel.DropdownPanel, {
        ref: this.overlayRef,
        appendTo: this.props.appendTo,
        panelStyle: this.props.panelStyle,
        panelClassName: this.props.panelClassName,
        scrollHeight: this.props.scrollHeight,
        filter: filterElement,
        onClick: this.onPanelClick,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }, items));
    }
  }]);

  return Dropdown;
}(_react.Component);

exports.Dropdown = Dropdown;

_defineProperty(Dropdown, "defaultProps", {
  id: null,
  name: null,
  value: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionDisabled: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  optionGroupTemplate: null,
  valueTemplate: null,
  itemTemplate: null,
  style: null,
  className: null,
  scrollHeight: '200px',
  filter: false,
  filterBy: null,
  filterMatchMode: 'contains',
  filterPlaceholder: null,
  filterLocale: undefined,
  emptyFilterMessage: 'No results found',
  editable: false,
  placeholder: null,
  required: false,
  disabled: false,
  appendTo: null,
  tabIndex: null,
  autoFocus: false,
  filterInputAutoFocus: true,
  resetFilterOnHide: false,
  showFilterClear: false,
  panelClassName: null,
  panelStyle: null,
  dataKey: null,
  inputId: null,
  showClear: false,
  maxLength: null,
  tooltip: null,
  tooltipOptions: null,
  ariaLabel: null,
  ariaLabelledBy: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onMouseDown: null,
  onContextMenu: null
});

_defineProperty(Dropdown, "propTypes", {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  value: _propTypes.default.any,
  options: _propTypes.default.array,
  optionLabel: _propTypes.default.string,
  optionValue: _propTypes.default.string,
  optionDisabled: _propTypes.default.bool,
  optionGroupLabel: _propTypes.default.string,
  optionGroupChildren: _propTypes.default.string,
  optionGroupTemplate: _propTypes.default.any,
  valueTemplate: _propTypes.default.any,
  itemTemplate: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  scrollHeight: _propTypes.default.string,
  filter: _propTypes.default.bool,
  filterBy: _propTypes.default.string,
  filterMatchMode: _propTypes.default.string,
  filterPlaceholder: _propTypes.default.string,
  filterLocale: _propTypes.default.string,
  emptyFilterMessage: _propTypes.default.any,
  editable: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  required: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  appendTo: _propTypes.default.any,
  tabIndex: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  filterInputAutoFocus: _propTypes.default.bool,
  resetFilterOnHide: _propTypes.default.bool,
  showFilterClear: _propTypes.default.bool,
  lazy: _propTypes.default.bool,
  panelClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  dataKey: _propTypes.default.string,
  inputId: _propTypes.default.string,
  showClear: _propTypes.default.bool,
  maxLength: _propTypes.default.number,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  ariaLabel: _propTypes.default.string,
  ariaLabelledBy: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onContextMenu: _propTypes.default.func
});