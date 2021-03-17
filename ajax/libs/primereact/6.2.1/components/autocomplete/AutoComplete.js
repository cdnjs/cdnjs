"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoComplete = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputText = require("../inputtext/InputText");

var _Button = require("../button/Button");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _AutoCompletePanel = require("./AutoCompletePanel");

var _ClassNames = require("../utils/ClassNames");

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutoComplete = /*#__PURE__*/function (_Component) {
  _inherits(AutoComplete, _Component);

  var _super = _createSuper(AutoComplete);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _super.call(this, props);
    _this.state = {
      searching: false,
      focused: false,
      overlayVisible: false
    };
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
    _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.onDropdownClick = _this.onDropdownClick.bind(_assertThisInitialized(_this));
    _this.onMultiContainerClick = _this.onMultiContainerClick.bind(_assertThisInitialized(_this));
    _this.onMultiInputFocus = _this.onMultiInputFocus.bind(_assertThisInitialized(_this));
    _this.onMultiInputBlur = _this.onMultiInputBlur.bind(_assertThisInitialized(_this));
    _this.selectItem = _this.selectItem.bind(_assertThisInitialized(_this));
    _this.getOptionGroupLabel = _this.getOptionGroupLabel.bind(_assertThisInitialized(_this));
    _this.getOptionGroupChildren = _this.getOptionGroupChildren.bind(_assertThisInitialized(_this));
    _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
    _this.onOverlayEntering = _this.onOverlayEntering.bind(_assertThisInitialized(_this));
    _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
    _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
    _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
    _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    _this.listId = _this.id + '_list';
    _this.overlayRef = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "onInputChange",
    value: function onInputChange(event) {
      var _this2 = this;

      //Cancel the search request if user types within the timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      var query = event.target.value;

      if (!this.props.multiple) {
        this.updateModel(event, query);
      }

      if (query.length === 0) {
        this.hideOverlay();

        if (this.props.onClear) {
          this.props.onClear(event);
        }
      } else {
        if (query.length >= this.props.minLength) {
          this.timeout = setTimeout(function () {
            _this2.search(event, query, 'input');
          }, this.props.delay);
        } else {
          this.hideOverlay();
        }
      }
    }
  }, {
    key: "search",
    value: function search(event, query, source) {
      //allow empty string but not undefined or null
      if (query === undefined || query === null) {
        return;
      } //do not search blank values on input change


      if (source === 'input' && query.trim().length === 0) {
        return;
      }

      if (this.props.completeMethod) {
        this.setState({
          searching: true
        });
        this.props.completeMethod({
          originalEvent: event,
          query: query
        });
      }
    }
  }, {
    key: "selectItem",
    value: function selectItem(event, option, preventInputFocus) {
      if (this.props.multiple) {
        this.inputEl.value = '';

        if (!this.isSelected(option)) {
          var newValue = this.props.value ? [].concat(_toConsumableArray(this.props.value), [option]) : [option];
          this.updateModel(event, newValue);
        }
      } else {
        this.updateInputField(option);
        this.updateModel(event, option);
      }

      if (this.props.onSelect) {
        this.props.onSelect({
          originalEvent: event,
          value: option
        });
      }

      if (!preventInputFocus) {
        this.inputEl.focus();
        this.hideOverlay();
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
            id: this.id,
            value: value
          }
        });
      }

      this.ariaSelected = value;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (value) {
        if (this.props.selectedItemTemplate && (this.props.multiple ? this.isSelected(value) : this.findOptionIndex(value) > -1)) {
          var resolvedFieldData = _ObjectUtils.default.getJSXElement(this.props.selectedItemTemplate, value);

          return resolvedFieldData ? resolvedFieldData : value;
        } else if (this.props.field) {
          var _resolvedFieldData = _ObjectUtils.default.resolveFieldData(value, this.props.field);

          return _resolvedFieldData !== null && _resolvedFieldData !== undefined ? _resolvedFieldData : value;
        } else return value;
      } else return '';
    }
  }, {
    key: "updateInputField",
    value: function updateInputField(value) {
      var formattedValue = this.formatValue(value);
      this.inputEl.value = formattedValue;
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
        overlayVisible: false,
        searching: false
      });
    }
  }, {
    key: "onOverlayEnter",
    value: function onOverlayEnter() {
      this.overlayRef.current.style.zIndex = String(_DomHandler.default.generateZIndex());
      this.alignOverlay();
    }
  }, {
    key: "onOverlayEntering",
    value: function onOverlayEntering() {
      if (this.props.autoHighlight && this.props.suggestions && this.props.suggestions.length) {
        _DomHandler.default.addClass(this.overlayRef.current.firstChild.firstChild, 'p-highlight');
      }
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
    key: "alignOverlay",
    value: function alignOverlay() {
      var target = this.props.multiple ? this.multiContainer : this.inputEl;
      this.overlayRef.current.style.minWidth = _DomHandler.default.getOuterWidth(target) + 'px';

      _DomHandler.default.absolutePosition(this.overlayRef.current, target);
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
    key: "onDropdownClick",
    value: function onDropdownClick(event) {
      this.inputEl.focus();
      if (this.props.dropdownMode === 'blank') this.search(event, '', 'dropdown');else if (this.props.dropdownMode === 'current') this.search(event, this.inputEl.value, 'dropdown');

      if (this.props.onDropdownClick) {
        this.props.onDropdownClick({
          originalEvent: event,
          query: this.inputEl.value
        });
      }
    }
  }, {
    key: "removeItem",
    value: function removeItem(event, index) {
      var removedValue = this.props.value[index];
      var newValue = this.props.value.filter(function (val, i) {
        return index !== i;
      });
      this.updateModel(event, newValue);

      if (this.props.onUnselect) {
        this.props.onUnselect({
          originalEvent: event,
          value: removedValue
        });
      }
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(event) {
      if (this.state.overlayVisible) {
        var highlightItem = _DomHandler.default.findSingle(this.overlayRef.current, 'li.p-highlight');

        switch (event.which) {
          //down
          case 40:
            if (highlightItem) {
              var nextElement = this.findNextItem(highlightItem);

              if (nextElement) {
                _DomHandler.default.addClass(nextElement, 'p-highlight');

                _DomHandler.default.removeClass(highlightItem, 'p-highlight');

                _DomHandler.default.scrollInView(this.overlayRef.current, nextElement);
              }
            } else {
              highlightItem = this.overlayRef.current.firstChild.firstChild;

              if (_DomHandler.default.hasClass(highlightItem, 'p-autocomplete-item-group')) {
                highlightItem = this.findNextItem(highlightItem);
              }

              if (highlightItem) {
                _DomHandler.default.addClass(highlightItem, 'p-highlight');
              }
            }

            event.preventDefault();
            break;
          //up

          case 38:
            if (highlightItem) {
              var previousElement = this.findPrevItem(highlightItem);

              if (previousElement) {
                _DomHandler.default.addClass(previousElement, 'p-highlight');

                _DomHandler.default.removeClass(highlightItem, 'p-highlight');

                _DomHandler.default.scrollInView(this.overlayRef.current, previousElement);
              }
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            if (highlightItem) {
              this.selectHighlightItem(event, highlightItem);
              this.hideOverlay();
            }

            event.preventDefault();
            break;
          //escape

          case 27:
            this.hideOverlay();
            event.preventDefault();
            break;
          //tab

          case 9:
            if (highlightItem) {
              this.selectHighlightItem(event, highlightItem);
            }

            this.hideOverlay();
            break;

          default:
            break;
        }
      }

      if (this.props.multiple) {
        switch (event.which) {
          //backspace
          case 8:
            if (this.props.value && this.props.value.length && !this.inputEl.value) {
              var removedValue = this.props.value[this.props.value.length - 1];
              var newValue = this.props.value.slice(0, -1);
              this.updateModel(event, newValue);

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  value: removedValue
                });
              }
            }

            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "selectHighlightItem",
    value: function selectHighlightItem(event, item) {
      if (this.props.optionGroupLabel) {
        var optionGroup = this.props.suggestions[item.dataset.group];
        this.selectItem(event, this.getOptionGroupChildren(optionGroup)[item.dataset.index]);
      } else {
        this.selectItem(event, this.props.suggestions[_DomHandler.default.index(item)]);
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      return nextItem ? _DomHandler.default.hasClass(nextItem, 'p-autocomplete-item-group') ? this.findNextItem(nextItem) : nextItem : null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      return prevItem ? _DomHandler.default.hasClass(prevItem, 'p-autocomplete-item-group') ? this.findPrevItem(prevItem) : prevItem : null;
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(event) {
      var _this3 = this;

      event.persist();
      this.setState({
        focused: true
      }, function () {
        if (_this3.props.onFocus) {
          _this3.props.onFocus(event);
        }
      });
    }
  }, {
    key: "forceItemSelection",
    value: function forceItemSelection(event) {
      var valid = false;
      var inputValue = event.target.value.trim();

      if (this.props.suggestions) {
        var _iterator = _createForOfIteratorHelper(this.props.suggestions),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            var itemValue = this.props.field ? _ObjectUtils.default.resolveFieldData(item, this.props.field) : item;

            if (itemValue && inputValue === itemValue.trim()) {
              valid = true;
              this.selectItem(event, item, true);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (!valid) {
        this.inputEl.value = '';
        this.updateModel(event, null);

        if (this.props.onClear) {
          this.props.onClear(event);
        }
      }
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur(event) {
      var _this4 = this;

      event.persist();
      this.setState({
        focused: false
      }, function () {
        if (_this4.props.forceSelection) {
          _this4.forceItemSelection(event);
        }

        if (_this4.props.onBlur) {
          _this4.props.onBlur(event);
        }
      });
    }
  }, {
    key: "onMultiContainerClick",
    value: function onMultiContainerClick(event) {
      this.inputEl.focus();

      if (this.props.onClick) {
        this.props.onClick(event);
      }
    }
  }, {
    key: "onMultiInputFocus",
    value: function onMultiInputFocus(event) {
      this.onInputFocus(event);

      _DomHandler.default.addClass(this.multiContainer, 'p-focus');
    }
  }, {
    key: "onMultiInputBlur",
    value: function onMultiInputBlur(event) {
      this.onInputBlur(event);

      _DomHandler.default.removeClass(this.multiContainer, 'p-focus');
    }
  }, {
    key: "isSelected",
    value: function isSelected(val) {
      var selected = false;

      if (this.props.value && this.props.value.length) {
        for (var i = 0; i < this.props.value.length; i++) {
          if (_ObjectUtils.default.equals(this.props.value[i], val)) {
            selected = true;
            break;
          }
        }
      }

      return selected;
    }
  }, {
    key: "findOptionIndex",
    value: function findOptionIndex(option) {
      var index = -1;

      if (this.props.suggestions) {
        for (var i = 0; i < this.props.suggestions.length; i++) {
          if (_ObjectUtils.default.equals(option, this.props.suggestions[i])) {
            index = i;
            break;
          }
        }
      }

      return index;
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return this.props.optionGroupLabel ? _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupLabel) : optionGroup;
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return _ObjectUtils.default.resolveFieldData(optionGroup, this.props.optionGroupChildren);
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this5 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (event.which === 3) {
            // right click
            return;
          }

          if (_this5.state.overlayVisible && _this5.isOutsideClicked(event)) {
            _this5.hideOverlay();
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
      var _this6 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.container, function () {
          if (_this6.state.overlayVisible) {
            _this6.hideOverlay();
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
      var _this7 = this;

      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this7.state.overlayVisible) {
            _this7.hideOverlay();
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
      return this.container && this.overlayRef && this.overlayRef.current && !this.overlayRef.current.contains(event.target) && !this.isInputClicked(event);
    }
  }, {
    key: "isInputClicked",
    value: function isInputClicked(event) {
      if (this.props.multiple) return event.target === this.multiContainer || this.multiContainer.contains(event.target);else return event.target === this.inputEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus && this.inputEl) {
        this.inputEl.focus();
      }

      if (this.props.tooltip) {
        this.renderTooltip();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.suggestions !== this.props.suggestions && this.state.searching) {
        if (this.props.suggestions && this.props.suggestions.length) {
          this.showOverlay();
        } else {
          this.hideOverlay();
        }

        this.setState({
          searching: false
        });
      }

      if (this.inputEl && !this.props.multiple) {
        this.updateInputField(this.props.value);
      }

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

      if (this.timeout) {
        clearTimeout(this.timeout);
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
    key: "renderSimpleAutoComplete",
    value: function renderSimpleAutoComplete() {
      var _this8 = this;

      var inputClassName = (0, _ClassNames.classNames)('p-autocomplete-input', this.props.inputClassName, {
        'p-autocomplete-dd-input': this.props.dropdown
      });
      return /*#__PURE__*/_react.default.createElement(_InputText.InputText, {
        ref: function ref(el) {
          return _this8.inputEl = el;
        },
        id: this.props.inputId,
        type: this.props.type,
        name: this.props.name,
        defaultValue: this.formatValue(this.props.value),
        role: "searchbox",
        "aria-autocomplete": "list",
        "aria-controls": this.listId,
        "aria-labelledby": this.props.ariaLabelledBy,
        className: inputClassName,
        style: this.props.inputStyle,
        autoComplete: "off",
        readOnly: this.props.readOnly,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        size: this.props.size,
        maxLength: this.props.maxlength,
        tabIndex: this.props.tabIndex,
        onBlur: this.onInputBlur,
        onFocus: this.onInputFocus,
        onChange: this.onInputChange,
        onMouseDown: this.props.onMouseDown,
        onKeyUp: this.props.onKeyUp,
        onKeyDown: this.onInputKeyDown,
        onKeyPress: this.props.onKeyPress,
        onContextMenu: this.props.onContextMenu,
        onClick: this.props.onClick,
        onDoubleClick: this.props.onDblClick
      });
    }
  }, {
    key: "renderChips",
    value: function renderChips() {
      var _this9 = this;

      if (this.props.value && this.props.value.length) {
        return this.props.value.map(function (val, index) {
          return /*#__PURE__*/_react.default.createElement("li", {
            key: index + 'multi-item',
            className: "p-autocomplete-token p-highlight"
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: "p-autocomplete-token-label"
          }, _this9.formatValue(val)), !_this9.props.disabled && /*#__PURE__*/_react.default.createElement("span", {
            className: "p-autocomplete-token-icon pi pi-times-circle",
            onClick: function onClick(e) {
              return _this9.removeItem(e, index);
            }
          }));
        });
      }

      return null;
    }
  }, {
    key: "renderMultiInput",
    value: function renderMultiInput() {
      var _this10 = this;

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "p-autocomplete-input-token"
      }, /*#__PURE__*/_react.default.createElement("input", {
        ref: function ref(el) {
          return _this10.inputEl = el;
        },
        type: this.props.type,
        disabled: this.props.disabled,
        placeholder: this.props.placeholder,
        role: "searchbox",
        "aria-autocomplete": "list",
        "aria-controls": this.listId,
        "aria-labelledby": this.props.ariaLabelledBy,
        autoComplete: "off",
        tabIndex: this.props.tabIndex,
        onChange: this.onInputChange,
        id: this.props.inputId,
        name: this.props.name,
        style: this.props.inputStyle,
        className: this.props.inputClassName,
        maxLength: this.props.maxlength,
        onKeyUp: this.props.onKeyUp,
        onKeyDown: this.onInputKeyDown,
        onKeyPress: this.props.onKeyPress,
        onFocus: this.onMultiInputFocus,
        onBlur: this.onMultiInputBlur
      }));
    }
  }, {
    key: "renderMultipleAutoComplete",
    value: function renderMultipleAutoComplete() {
      var _this11 = this;

      var multiContainerClass = (0, _ClassNames.classNames)('p-autocomplete-multiple-container p-component p-inputtext', {
        'p-disabled': this.props.disabled
      });
      var tokens = this.renderChips();
      var input = this.renderMultiInput();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          _this11.multiContainer = el;
        },
        className: multiContainerClass,
        onContextMenu: this.props.onContextMenu,
        onMouseDown: this.props.onMouseDown,
        onClick: this.onMultiContainerClick,
        onDoubleClick: this.props.onDblClick
      }, tokens, input);
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown() {
      var _this12 = this;

      return /*#__PURE__*/_react.default.createElement(_Button.Button, {
        ref: function ref(el) {
          return _this12.dropdownButton = el;
        },
        type: "button",
        icon: "pi pi-chevron-down",
        className: "p-autocomplete-dropdown",
        disabled: this.props.disabled,
        onClick: this.onDropdownClick
      });
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      if (this.state.searching) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-autocomplete-loader pi pi-spinner pi-spin"
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var input, dropdown;
      var className = (0, _ClassNames.classNames)('p-autocomplete p-component p-inputwrapper', this.props.className, {
        'p-autocomplete-dd': this.props.dropdown,
        'p-autocomplete-multiple': this.props.multiple,
        'p-inputwrapper-filled': this.props.value,
        'p-inputwrapper-focus': this.state.focused
      });
      var loader = this.renderLoader();
      if (this.props.multiple) input = this.renderMultipleAutoComplete();else input = this.renderSimpleAutoComplete();

      if (this.props.dropdown) {
        dropdown = this.renderDropdown();
      }

      return /*#__PURE__*/_react.default.createElement("span", {
        ref: function ref(el) {
          return _this13.container = el;
        },
        id: this.id,
        style: this.props.style,
        className: className,
        "aria-haspopup": "listbox",
        "aria-expanded": this.state.overlayVisible,
        "aria-owns": this.listId
      }, input, loader, dropdown, /*#__PURE__*/_react.default.createElement(_AutoCompletePanel.AutoCompletePanel, {
        ref: this.overlayRef,
        suggestions: this.props.suggestions,
        field: this.props.field,
        listId: this.listId,
        appendTo: this.props.appendTo,
        itemTemplate: this.props.itemTemplate,
        onItemClick: this.selectItem,
        ariaSelected: this.ariaSelected,
        panelStyle: this.props.panelStyle,
        panelClassName: this.props.panelClassName,
        onClick: this.onPanelClick,
        optionGroupLabel: this.props.optionGroupLabel,
        optionGroupChildren: this.props.optionGroupChildren,
        optionGroupTemplate: this.props.optionGroupTemplate,
        getOptionGroupLabel: this.getOptionGroupLabel,
        getOptionGroupChildren: this.getOptionGroupChildren,
        in: this.state.overlayVisible,
        onEnter: this.onOverlayEnter,
        onEntering: this.onOverlayEntering,
        onEntered: this.onOverlayEntered,
        onExit: this.onOverlayExit,
        onExited: this.onOverlayExited
      }));
    }
  }]);

  return AutoComplete;
}(_react.Component);

exports.AutoComplete = AutoComplete;

_defineProperty(AutoComplete, "defaultProps", {
  id: null,
  value: null,
  name: null,
  type: 'text',
  suggestions: null,
  field: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  optionGroupTemplate: null,
  forceSelection: false,
  autoHighlight: false,
  scrollHeight: '200px',
  dropdown: false,
  dropdownMode: 'blank',
  multiple: false,
  minLength: 1,
  delay: 300,
  style: null,
  className: null,
  inputId: null,
  inputStyle: null,
  inputClassName: null,
  panelClassName: null,
  panelStyle: null,
  placeholder: null,
  readOnly: false,
  disabled: false,
  maxlength: null,
  size: null,
  appendTo: null,
  tabIndex: null,
  autoFocus: false,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  completeMethod: null,
  itemTemplate: null,
  selectedItemTemplate: null,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onSelect: null,
  onUnselect: null,
  onDropdownClick: null,
  onClick: null,
  onDblClick: null,
  onMouseDown: null,
  onKeyUp: null,
  onKeyPress: null,
  onContextMenu: null,
  onClear: null
});

_defineProperty(AutoComplete, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  name: _propTypes.default.string,
  type: _propTypes.default.string,
  suggestions: _propTypes.default.array,
  field: _propTypes.default.string,
  optionGroupLabel: _propTypes.default.string,
  optionGroupChildren: _propTypes.default.string,
  optionGroupTemplate: _propTypes.default.any,
  forceSelection: _propTypes.default.bool,
  autoHighlight: _propTypes.default.bool,
  scrollHeight: _propTypes.default.string,
  dropdown: _propTypes.default.bool,
  dropdownMode: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  minLength: _propTypes.default.number,
  delay: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  inputId: _propTypes.default.string,
  inputStyle: _propTypes.default.object,
  inputClassName: _propTypes.default.string,
  panelClassName: _propTypes.default.string,
  panelStyle: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  maxlength: _propTypes.default.number,
  size: _propTypes.default.number,
  appendTo: _propTypes.default.any,
  tabIndex: _propTypes.default.number,
  autoFocus: _propTypes.default.bool,
  tooltip: _propTypes.default.string,
  tooltipOptions: _propTypes.default.object,
  ariaLabelledBy: _propTypes.default.string,
  completeMethod: _propTypes.default.func,
  itemTemplate: _propTypes.default.any,
  selectedItemTemplate: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnselect: _propTypes.default.func,
  onDropdownClick: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onDblClick: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClear: _propTypes.default.func
});