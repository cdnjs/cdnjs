'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('primereact/core');
var inputtext = require('primereact/inputtext');
var virtualscroller = require('primereact/virtualscroller');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ListBoxItem = /*#__PURE__*/function (_Component) {
  _inherits(ListBoxItem, _Component);

  var _super = _createSuper$2(ListBoxItem);

  function ListBoxItem(props) {
    var _this;

    _classCallCheck(this, ListBoxItem);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListBoxItem, [{
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          option: this.props.option
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      if (this.props.onTouchEnd) {
        this.props.onTouchEnd({
          originalEvent: event,
          option: this.props.option
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var item = event.currentTarget;

      switch (event.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(item);

          if (nextItem) {
            nextItem.focus();
          }

          event.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(item);

          if (prevItem) {
            prevItem.focus();
          }

          event.preventDefault();
          break;
        //enter

        case 13:
          this.onClick(event);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return core.DomHandler.hasClass(nextItem, 'p-disabled') || core.DomHandler.hasClass(nextItem, 'p-listbox-item-group') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return core.DomHandler.hasClass(prevItem, 'p-disabled') || core.DomHandler.hasClass(prevItem, 'p-listbox-item-group') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "render",
    value: function render() {
      var className = core.classNames('p-listbox-item', {
        'p-highlight': this.props.selected,
        'p-disabled': this.props.disabled
      }, this.props.option.className);
      var content = this.props.template ? core.ObjectUtils.getJSXElement(this.props.template, this.props.option) : this.props.label;
      return /*#__PURE__*/React__default['default'].createElement("li", {
        className: className,
        onClick: this.onClick,
        onTouchEnd: this.onTouchEnd,
        onKeyDown: this.onKeyDown,
        tabIndex: this.props.tabIndex,
        "aria-label": this.props.label,
        key: this.props.label,
        role: "option",
        "aria-selected": this.props.selected
      }, content, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
    }
  }]);

  return ListBoxItem;
}(React.Component);

_defineProperty(ListBoxItem, "defaultProps", {
  option: null,
  label: null,
  selected: false,
  disabled: false,
  tabIndex: null,
  onClick: null,
  onTouchEnd: null,
  template: null
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ListBoxHeader = /*#__PURE__*/function (_Component) {
  _inherits(ListBoxHeader, _Component);

  var _super = _createSuper$1(ListBoxHeader);

  function ListBoxHeader(props) {
    var _this;

    _classCallCheck(this, ListBoxHeader);

    _this = _super.call(this, props);
    _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListBoxHeader, [{
    key: "onFilter",
    value: function onFilter(event) {
      if (this.props.onFilter) {
        this.props.onFilter({
          originalEvent: event,
          value: event.target.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-listbox-header"
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "p-listbox-filter-container"
      }, /*#__PURE__*/React__default['default'].createElement(inputtext.InputText, {
        type: "text",
        value: this.props.filter,
        onChange: this.onFilter,
        className: "p-listbox-filter",
        disabled: this.props.disabled,
        placeholder: this.props.filterPlaceholder
      }), /*#__PURE__*/React__default['default'].createElement("span", {
        className: "p-listbox-filter-icon pi pi-search"
      })));
    }
  }]);

  return ListBoxHeader;
}(React.Component);

_defineProperty(ListBoxHeader, "defaultProps", {
  filter: null,
  filterPlaceholder: null,
  disabled: false,
  onFilter: null
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ListBox = /*#__PURE__*/function (_Component) {
  _inherits(ListBox, _Component);

  var _super = _createSuper(ListBox);

  function ListBox(props) {
    var _this;

    _classCallCheck(this, ListBox);

    _this = _super.call(this, props);
    _this.state = {};

    if (!_this.props.onFilterValueChange) {
      _this.state.filterValue = '';
    }

    _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
    _this.onOptionSelect = _this.onOptionSelect.bind(_assertThisInitialized(_this));
    _this.onOptionTouchEnd = _this.onOptionTouchEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ListBox, [{
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
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }
    }
  }, {
    key: "renderTooltip",
    value: function renderTooltip() {
      this.tooltip = core.tip({
        target: this.element,
        content: this.props.tooltip,
        options: this.props.tooltipOptions
      });
    }
  }, {
    key: "getFilterValue",
    value: function getFilterValue() {
      return (this.props.onFilterValueChange ? this.props.filterValue : this.state.filterValue) || '';
    }
  }, {
    key: "onOptionSelect",
    value: function onOptionSelect(event) {
      var option = event.option;

      if (this.props.disabled || this.isOptionDisabled(option)) {
        return;
      }

      if (this.props.multiple) this.onOptionSelectMultiple(event.originalEvent, option);else this.onOptionSelectSingle(event.originalEvent, option);
      this.optionTouched = false;
    }
  }, {
    key: "onOptionTouchEnd",
    value: function onOptionTouchEnd() {
      if (this.props.disabled) {
        return;
      }

      this.optionTouched = true;
    }
  }, {
    key: "onOptionSelectSingle",
    value: function onOptionSelectSingle(event, option) {
      var selected = this.isSelected(option);
      var valueChanged = false;
      var value = null;
      var metaSelection = this.optionTouched ? false : this.props.metaKeySelection;

      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;

        if (selected) {
          if (metaKey) {
            value = null;
            valueChanged = true;
          }
        } else {
          value = this.getOptionValue(option);
          valueChanged = true;
        }
      } else {
        value = selected ? null : this.getOptionValue(option);
        valueChanged = true;
      }

      if (valueChanged) {
        this.updateModel(event, value);
      }
    }
  }, {
    key: "onOptionSelectMultiple",
    value: function onOptionSelectMultiple(event, option) {
      var selected = this.isSelected(option);
      var valueChanged = false;
      var value = null;
      var metaSelection = this.optionTouched ? false : this.props.metaKeySelection;

      if (metaSelection) {
        var metaKey = event.metaKey || event.ctrlKey;

        if (selected) {
          if (metaKey) value = this.removeOption(option);else value = [this.getOptionValue(option)];
          valueChanged = true;
        } else {
          value = metaKey ? this.props.value || [] : [];
          value = [].concat(_toConsumableArray(value), [this.getOptionValue(option)]);
          valueChanged = true;
        }
      } else {
        if (selected) value = this.removeOption(option);else value = [].concat(_toConsumableArray(this.props.value || []), [this.getOptionValue(option)]);
        valueChanged = true;
      }

      if (valueChanged) {
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
    key: "onFilter",
    value: function onFilter(event) {
      var originalEvent = event.originalEvent,
          value = event.value;

      if (this.props.onFilterValueChange) {
        this.props.onFilterValueChange({
          originalEvent: originalEvent,
          value: value
        });
      } else {
        this.setState({
          filterValue: value
        });
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
    key: "removeOption",
    value: function removeOption(option) {
      var _this2 = this;

      return this.props.value.filter(function (val) {
        return !core.ObjectUtils.equals(val, _this2.getOptionValue(option), _this2.props.dataKey);
      });
    }
  }, {
    key: "isSelected",
    value: function isSelected(option) {
      var selected = false;
      var optionValue = this.getOptionValue(option);

      if (this.props.multiple) {
        if (this.props.value) {
          var _iterator = _createForOfIteratorHelper(this.props.value),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var val = _step.value;

              if (core.ObjectUtils.equals(val, optionValue, this.props.dataKey)) {
                selected = true;
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } else {
        selected = core.ObjectUtils.equals(this.props.value, optionValue, this.props.dataKey);
      }

      return selected;
    }
  }, {
    key: "filter",
    value: function filter(option) {
      var filterValue = this.getFilterValue().trim().toLocaleLowerCase(this.props.filterLocale);
      var optionLabel = this.getOptionLabel(option).toLocaleLowerCase(this.props.filterLocale);
      return optionLabel.indexOf(filterValue) > -1;
    }
  }, {
    key: "hasFilter",
    value: function hasFilter() {
      var filter = this.getFilterValue();
      return filter && filter.trim().length > 0;
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(option) {
      return this.props.optionLabel ? core.ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    }
  }, {
    key: "getOptionValue",
    value: function getOptionValue(option) {
      return this.props.optionValue ? core.ObjectUtils.resolveFieldData(option, this.props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
    }
  }, {
    key: "getOptionRenderKey",
    value: function getOptionRenderKey(option) {
      return this.props.dataKey ? core.ObjectUtils.resolveFieldData(option, this.props.dataKey) : this.getOptionLabel(option);
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option) {
      if (this.props.optionDisabled) {
        return core.ObjectUtils.isFunction(this.props.optionDisabled) ? this.props.optionDisabled(option) : core.ObjectUtils.resolveFieldData(option, this.props.optionDisabled);
      }

      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    }
  }, {
    key: "getOptionGroupRenderKey",
    value: function getOptionGroupRenderKey(optionGroup) {
      return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
    }
  }, {
    key: "getOptionGroupLabel",
    value: function getOptionGroupLabel(optionGroup) {
      return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
    }
  }, {
    key: "getOptionGroupChildren",
    value: function getOptionGroupChildren(optionGroup) {
      return core.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren);
    }
  }, {
    key: "getVisibleOptions",
    value: function getVisibleOptions() {
      if (this.hasFilter()) {
        var filterValue = this.getFilterValue().trim().toLocaleLowerCase(this.props.filterLocale);
        var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];

        if (this.props.optionGroupLabel) {
          var filteredGroups = [];

          var _iterator2 = _createForOfIteratorHelper(this.props.options),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var optgroup = _step2.value;
              var filteredSubOptions = core.FilterUtils.filter(this.getOptionGroupChildren(optgroup), searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);

              if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                  items: filteredSubOptions
                }));
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          return filteredGroups;
        } else {
          return core.FilterUtils.filter(this.props.options, searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);
        }
      } else {
        return this.props.options;
      }
    }
  }, {
    key: "renderGroupChildren",
    value: function renderGroupChildren(optionGroup) {
      var _this3 = this;

      var groupChildren = this.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = _this3.getOptionLabel(option);

        var optionKey = j + '_' + _this3.getOptionRenderKey(option);

        var disabled = _this3.isOptionDisabled(option);

        var tabIndex = disabled ? null : _this3.props.tabIndex || 0;
        return /*#__PURE__*/React__default['default'].createElement(ListBoxItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          template: _this3.props.itemTemplate,
          selected: _this3.isSelected(option),
          onClick: _this3.onOptionSelect,
          onTouchEnd: _this3.onOptionTouchEnd,
          tabIndex: tabIndex,
          disabled: disabled
        });
      });
    }
  }, {
    key: "renderItem",
    value: function renderItem(option, index) {
      if (this.props.optionGroupLabel) {
        var groupContent = this.props.optionGroupTemplate ? core.ObjectUtils.getJSXElement(this.props.optionGroupTemplate, option, index) : this.getOptionGroupLabel(option);
        var groupChildrenContent = this.renderGroupChildren(option);
        var key = index + '_' + this.getOptionGroupRenderKey(option);
        return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
          key: key
        }, /*#__PURE__*/React__default['default'].createElement("li", {
          className: "p-listbox-item-group"
        }, groupContent), groupChildrenContent);
      } else {
        var optionLabel = this.getOptionLabel(option);
        var optionKey = index + '_' + this.getOptionRenderKey(option);
        var disabled = this.isOptionDisabled(option);
        var tabIndex = disabled ? null : this.props.tabIndex || 0;
        return /*#__PURE__*/React__default['default'].createElement(ListBoxItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          template: this.props.itemTemplate,
          selected: this.isSelected(option),
          onClick: this.onOptionSelect,
          onTouchEnd: this.onOptionTouchEnd,
          tabIndex: tabIndex,
          disabled: disabled
        });
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems(visibleOptions) {
      var _this4 = this;

      if (visibleOptions && visibleOptions.length) {
        return visibleOptions.map(function (option, index) {
          return _this4.renderItem(option, index);
        });
      }

      return null;
    }
  }, {
    key: "renderList",
    value: function renderList(visibleOptions) {
      var _this5 = this;

      if (this.props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread(_objectSpread({}, this.props.virtualScrollerOptions), {
          items: visibleOptions,
          onLazyLoad: function onLazyLoad(event) {
            return _this5.props.virtualScrollerOptions.onLazyLoad(_objectSpread(_objectSpread({}, event), {
              filter: _this5.getFilterValue()
            }));
          },
          itemTemplate: function itemTemplate(item, options) {
            return item && _this5.renderItem(item, options.index);
          },
          contentTemplate: function contentTemplate(options) {
            var className = core.classNames('p-listbox-list', options.className);
            return /*#__PURE__*/React__default['default'].createElement("ul", {
              ref: options.ref,
              className: className,
              role: "listbox",
              "aria-multiselectable": _this5.props.multiple
            }, options.children);
          }
        });

        return /*#__PURE__*/React__default['default'].createElement(virtualscroller.VirtualScroller, _extends({
          ref: function ref(el) {
            return _this5.virtualScrollerRef = el;
          }
        }, virtualScrollerProps));
      } else {
        var items = this.renderItems(visibleOptions);
        return /*#__PURE__*/React__default['default'].createElement("ul", {
          className: "p-listbox-list",
          role: "listbox",
          "aria-multiselectable": this.props.multiple
        }, items);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = core.classNames('p-listbox p-component', {
        'p-disabled': this.props.disabled
      }, this.props.className);
      var listClassName = core.classNames('p-listbox-list-wrapper', this.props.listClassName);
      var visibleOptions = this.getVisibleOptions();
      var list = this.renderList(visibleOptions);
      var header;

      if (this.props.filter) {
        header = /*#__PURE__*/React__default['default'].createElement(ListBoxHeader, {
          filter: this.getFilterValue(),
          onFilter: this.onFilter,
          disabled: this.props.disabled,
          filterPlaceholder: this.props.filterPlaceholder
        });
      }

      return /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this6.element = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, header, /*#__PURE__*/React__default['default'].createElement("div", {
        ref: function ref(el) {
          return _this6.wrapper = el;
        },
        className: listClassName,
        style: this.props.listStyle
      }, list));
    }
  }]);

  return ListBox;
}(React.Component);

_defineProperty(ListBox, "defaultProps", {
  id: null,
  value: null,
  options: null,
  optionLabel: null,
  optionValue: null,
  optionDisabled: null,
  optionGroupLabel: null,
  optionGroupChildren: null,
  optionGroupTemplate: null,
  itemTemplate: null,
  style: null,
  listStyle: null,
  listClassName: null,
  className: null,
  virtualScrollerOptions: null,
  disabled: null,
  dataKey: null,
  multiple: false,
  metaKeySelection: false,
  filter: false,
  filterBy: null,
  filterValue: null,
  filterMatchMode: 'contains',
  filterPlaceholder: null,
  filterLocale: undefined,
  tabIndex: 0,
  tooltip: null,
  tooltipOptions: null,
  ariaLabelledBy: null,
  onChange: null,
  onFilterValueChange: null
});

exports.ListBox = ListBox;
