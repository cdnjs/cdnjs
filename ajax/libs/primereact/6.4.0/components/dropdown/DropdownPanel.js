"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ObjectUtils = _interopRequireDefault(require("../utils/ObjectUtils"));

var _DropdownItem = require("./DropdownItem");

var _ClassNames = require("../utils/ClassNames");

var _CSSTransition = require("../transition/CSSTransition");

var _Portal = require("../portal/Portal");

var _VirtualScroller = require("../virtualscroller/VirtualScroller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var DropdownPanelComponent = /*#__PURE__*/function (_Component) {
  _inherits(DropdownPanelComponent, _Component);

  var _super = _createSuper(DropdownPanelComponent);

  function DropdownPanelComponent(props) {
    var _this;

    _classCallCheck(this, DropdownPanelComponent);

    _this = _super.call(this, props);
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownPanelComponent, [{
    key: "onEnter",
    value: function onEnter() {
      var _this2 = this;

      this.props.onEnter(function () {
        if (_this2.virtualScrollerRef) {
          var selectedIndex = _this2.props.getSelectedOptionIndex();

          if (selectedIndex !== -1) {
            _this2.virtualScrollerRef.scrollToIndex(selectedIndex);
          }
        }
      });
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      var _this3 = this;

      this.props.onEntered(function () {
        if (_this3.props.filter && _this3.props.filterInputAutoFocus) {
          _this3.filterInput.focus();
        }
      });
    }
  }, {
    key: "onFilterInputChange",
    value: function onFilterInputChange(event) {
      if (this.virtualScrollerRef) {
        this.virtualScrollerRef.scrollToIndex(0);
      }

      this.props.onFilterInputChange && this.props.onFilterInputChange(event);
    }
  }, {
    key: "isEmptyFilter",
    value: function isEmptyFilter() {
      return !(this.props.visibleOptions && this.props.visibleOptions.length) && this.props.hasFilter();
    }
  }, {
    key: "renderGroupChildren",
    value: function renderGroupChildren(optionGroup) {
      var _this4 = this;

      var groupChildren = this.props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = _this4.props.getOptionLabel(option);

        var optionKey = j + '_' + _this4.props.getOptionRenderKey(option);

        var disabled = _this4.props.isOptionDisabled(option);

        return /*#__PURE__*/_react.default.createElement(_DropdownItem.DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          template: _this4.props.itemTemplate,
          selected: _this4.props.isSelected(option),
          disabled: disabled,
          onClick: _this4.props.onOptionClick
        });
      });
    }
  }, {
    key: "renderEmptyMessage",
    value: function renderEmptyMessage(emptyMessage) {
      var message = _ObjectUtils.default.getJSXElement(emptyMessage, this.props);

      return /*#__PURE__*/_react.default.createElement("li", {
        className: "p-dropdown-empty-message"
      }, message);
    }
  }, {
    key: "renderItem",
    value: function renderItem(option, index) {
      if (this.props.optionGroupLabel) {
        var groupContent = this.props.optionGroupTemplate ? _ObjectUtils.default.getJSXElement(this.props.optionGroupTemplate, option, index) : this.props.getOptionGroupLabel(option);
        var groupChildrenContent = this.renderGroupChildren(option);
        var key = index + '_' + this.props.getOptionGroupRenderKey(option);
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: key
        }, /*#__PURE__*/_react.default.createElement("li", {
          className: "p-dropdown-item-group"
        }, groupContent), groupChildrenContent);
      } else {
        var optionLabel = this.props.getOptionLabel(option);
        var optionKey = index + '_' + this.props.getOptionRenderKey(option);
        var disabled = this.props.isOptionDisabled(option);
        return /*#__PURE__*/_react.default.createElement(_DropdownItem.DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          template: this.props.itemTemplate,
          selected: this.props.isSelected(option),
          disabled: disabled,
          onClick: this.props.onOptionClick
        });
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this5 = this;

      if (this.props.visibleOptions && this.props.visibleOptions.length) {
        return this.props.visibleOptions.map(function (option, index) {
          return _this5.renderItem(option, index);
        });
      } else if (this.props.hasFilter()) {
        return this.renderEmptyMessage(this.props.emptyFilterMessage);
      }

      return this.renderEmptyMessage(this.props.emptyMessage);
    }
  }, {
    key: "renderFilterClearIcon",
    value: function renderFilterClearIcon() {
      var _this6 = this;

      if (this.props.showFilterClear && this.props.filterValue) {
        return /*#__PURE__*/_react.default.createElement("i", {
          className: "p-dropdown-filter-clear-icon pi pi-times",
          onClick: function onClick() {
            return _this6.props.onFilterClearIconClick(function () {
              return _this6.filterInput.focus();
            });
          }
        });
      }

      return null;
    }
  }, {
    key: "renderFilter",
    value: function renderFilter() {
      var _this7 = this;

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
            return _this7.filterInput = el;
          },
          type: "text",
          autoComplete: "off",
          className: "p-dropdown-filter p-inputtext p-component",
          placeholder: this.props.filterPlaceholder,
          onKeyDown: this.props.onFilterInputKeyDown,
          onChange: this.onFilterInputChange,
          value: this.props.filterValue
        }), clearIcon, /*#__PURE__*/_react.default.createElement("i", {
          className: "p-dropdown-filter-icon pi pi-search"
        })));
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this8 = this;

      if (this.props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread(_objectSpread({}, this.props.virtualScrollerOptions), {
          style: _objectSpread(_objectSpread({}, this.props.virtualScrollerOptions.style), {
            height: this.props.scrollHeight
          }),
          className: (0, _ClassNames.classNames)('p-dropdown-items-wrapper', this.props.virtualScrollerOptions.className),
          items: this.props.visibleOptions,
          itemTemplate: function itemTemplate(item, options) {
            return item && _this8.renderItem(item, options.index);
          },
          contentTemplate: function contentTemplate(options) {
            var className = (0, _ClassNames.classNames)('p-dropdown-items', options.className);
            var content = _this8.isEmptyFilter() ? _this8.renderEmptyFilter() : options.children;
            return /*#__PURE__*/_react.default.createElement("ul", {
              ref: options.ref,
              className: className,
              role: "listbox"
            }, content);
          }
        });

        return /*#__PURE__*/_react.default.createElement(_VirtualScroller.VirtualScroller, _extends({
          ref: function ref(el) {
            return _this8.virtualScrollerRef = el;
          }
        }, virtualScrollerProps));
      } else {
        var items = this.renderItems();
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-dropdown-items-wrapper",
          style: {
            maxHeight: this.props.scrollHeight || 'auto'
          }
        }, /*#__PURE__*/_react.default.createElement("ul", {
          className: "p-dropdown-items",
          role: "listbox"
        }, items));
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var className = (0, _ClassNames.classNames)('p-dropdown-panel p-component', this.props.panelClassName);
      var filter = this.renderFilter();
      var content = this.renderContent();
      return /*#__PURE__*/_react.default.createElement(_CSSTransition.CSSTransition, {
        nodeRef: this.props.forwardRef,
        classNames: "p-connected-overlay",
        in: this.props.in,
        timeout: {
          enter: 120,
          exit: 100
        },
        options: this.props.transitionOptions,
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntering: this.props.onEntering,
        onEntered: this.onEntered,
        onExit: this.props.onExit,
        onExited: this.props.onExited
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.props.forwardRef,
        className: className,
        style: this.props.panelStyle,
        onClick: this.props.onClick
      }, filter, content));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      return /*#__PURE__*/_react.default.createElement(_Portal.Portal, {
        element: element,
        appendTo: this.props.appendTo
      });
    }
  }]);

  return DropdownPanelComponent;
}(_react.Component);

var DropdownPanel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(DropdownPanelComponent, _extends({
    forwardRef: ref
  }, props));
});

exports.DropdownPanel = DropdownPanel;