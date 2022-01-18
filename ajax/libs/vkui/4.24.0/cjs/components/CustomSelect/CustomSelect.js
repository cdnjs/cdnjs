"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _SelectMimicry = _interopRequireDefault(require("../SelectMimicry/SelectMimicry"));

var _utils = require("../../lib/utils");

var _classNames = require("../../lib/classNames");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _withPlatform = require("../../hoc/withPlatform");

var _CustomSelectOption = _interopRequireDefault(require("../CustomSelectOption/CustomSelectOption"));

var _getClassName = require("../../helpers/getClassName");

var _Input = _interopRequireDefault(require("../Input/Input"));

var _DropdownIcon = require("../DropdownIcon/DropdownIcon");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _warnOnce = require("../../lib/warnOnce");

var _select = require("../../lib/select");

var _is = require("../../lib/is");

var _CustomSelectDropdown = require("../CustomSelectDropdown/CustomSelectDropdown");

var _excluded = ["searchable", "name", "className", "getRef", "getRootRef", "popupDirection", "options", "sizeY", "platform", "style", "onChange", "onBlur", "onFocus", "onClick", "renderOption", "children", "emptyText", "onInputChange", "filterFn", "renderDropdown", "onOpen", "onClose", "fetching"],
    _excluded2 = ["option"];

var findIndexAfter = function findIndexAfter(options) {
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  if (startIndex >= options.length - 1) {
    return -1;
  }

  return options.findIndex(function (option, i) {
    return i > startIndex && !option.disabled;
  });
};

var findIndexBefore = function findIndexBefore(options) {
  var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.length;
  var result = -1;

  if (endIndex <= 0) {
    return result;
  }

  for (var i = endIndex - 1; i >= 0; i--) {
    var _option = options[i];

    if (!_option.disabled) {
      result = i;
      break;
    }
  }

  return result;
};

var warn = (0, _warnOnce.warnOnce)("CustomSelect");

var checkOptionsValueType = function checkOptionsValueType(options) {
  if (new Set(options.map(function (item) {
    return (0, _typeof2.default)(item.value);
  })).size > 1) {
    warn("Some values of your options have different types. CustomSelect onChange always returns a string type.");
  }
};

var CustomSelect = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(CustomSelect, _React$Component);

  var _super = (0, _createSuper2.default)(CustomSelect);

  function CustomSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CustomSelect);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "keyboardInput", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isControlledOutside", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectEl", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "scrollBoxRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "containerRef", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetKeyboardInput", function () {
      _this.keyboardInput = "";
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSelectedItem", function () {
      var _this$state = _this.state,
          selectedOptionIndex = _this$state.selectedOptionIndex,
          options = _this$state.options;

      if (!options.length) {
        return null;
      }

      return options[selectedOptionIndex];
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filter", function (options, inputValue, filterFn) {
      return typeof filterFn === "function" ? options.filter(function (option) {
        return filterFn(inputValue, option);
      }) : options;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "open", function () {
      _this.setState(function (_ref) {
        var selectedOptionIndex = _ref.selectedOptionIndex;
        return {
          opened: true,
          focusedOptionIndex: selectedOptionIndex
        };
      }, function () {
        var selectedOptionIndex = _this.state.selectedOptionIndex;

        if (_this.isValidIndex(selectedOptionIndex)) {
          _this.scrollToElement(selectedOptionIndex, true);
        }
      });

      typeof _this.props.onOpen === "function" && _this.props.onOpen();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "close", function () {
      _this.resetKeyboardInput();

      _this.setState(function () {
        return {
          inputValue: "",
          opened: false,
          focusedOptionIndex: -1,
          options: _this.props.options
        };
      });

      typeof _this.props.onClose === "function" && _this.props.onClose();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectFocused", function () {
      var focusedOptionIndex = _this.state.focusedOptionIndex;

      _this.select(focusedOptionIndex);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "select", function (index) {
      if (!_this.isValidIndex(index)) {
        return;
      }

      var item = _this.state.options[index];

      _this.setState({
        nativeSelectValue: item.value
      }, function () {
        var event = new Event("change", {
          bubbles: true
        });

        _this.selectEl.dispatchEvent(event);
      });

      _this.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", function () {
      _this.state.opened ? _this.close() : _this.open();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFocus", function () {
      var event = new Event("focus");

      _this.selectEl.dispatchEvent(event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onBlur", function () {
      _this.close();

      var event = new Event("blur");

      _this.selectEl.dispatchEvent(event);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "focusOptionByIndex", function (index) {
      var scrollTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (index < 0 || index > _this.state.options.length - 1) {
        return;
      }

      var option = _this.state.options[index];

      if (option.disabled) {
        return;
      }

      scrollTo && _this.scrollToElement(index);

      _this.setState(function () {
        return {
          focusedOptionIndex: index
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "focusOption", function (type) {
      var focusedOptionIndex = _this.state.focusedOptionIndex;
      var index = focusedOptionIndex;

      if (type === "next") {
        var nextIndex = findIndexAfter(_this.state.options, index);
        index = nextIndex === -1 ? findIndexAfter(_this.state.options) : nextIndex; // Следующий за index или первый валидный до index
      } else if (type === "prev") {
        var beforeIndex = findIndexBefore(_this.state.options, index);
        index = beforeIndex === -1 ? findIndexBefore(_this.state.options) : beforeIndex; // Предшествующий index или последний валидный после index
      }

      _this.focusOptionByIndex(index);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleOptionHover", function (e) {
      _this.focusOptionByIndex(Array.prototype.indexOf.call(e.currentTarget.parentNode.children, e.currentTarget), false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleOptionDown", function (e) {
      e.preventDefault();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleOptionClick", function (e) {
      var index = Array.prototype.indexOf.call(e.currentTarget.parentNode.children, e.currentTarget);
      var option = _this.state.options[index];

      if (option && !option.disabled) {
        _this.selectFocused();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetFocusedOption", function () {
      _this.setState({
        focusedOptionIndex: -1
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeyboardInput", function (key) {
      var fullInput = _this.keyboardInput + key;

      var optionIndex = _this.state.options.findIndex(function (option) {
        return option.label.toLowerCase().includes(fullInput);
      });

      if (optionIndex > -1) {
        _this.focusOptionByIndex(optionIndex);
      }

      _this.keyboardInput = fullInput;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onLabelClick", function (e) {
      var _this$scrollBoxRef$cu;

      if ((_this$scrollBoxRef$cu = _this.scrollBoxRef.current) !== null && _this$scrollBoxRef$cu !== void 0 && _this$scrollBoxRef$cu.contains(e.target)) {
        e.preventDefault();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onNativeSelectChange", function (e) {
      var value = e.currentTarget.value;

      if (!_this.isControlledOutside) {
        _this.setState({
          selectedOptionIndex: _this.findSelectedIndex(_this.state.options, value)
        });
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputChange", function (e) {
      if (_this.props.onInputChange) {
        var _options = _this.props.onInputChange(e, _this.props.options);

        if (_options) {
          if (process.env.NODE_ENV === "development") {
            warn("This filtration method is deprecated. Return value of onInputChange will" + " be ignored in v5.0.0. For custom filtration please update props.options by yourself or use filterFn property");
          }

          _this.setState({
            options: _options,
            selectedOptionIndex: _this.findSelectedIndex(_options, _this.state.nativeSelectValue),
            inputValue: e.target.value
          });
        } else {
          _this.setState({
            inputValue: e.target.value
          });
        }
      } else {
        var _options2 = _this.filter(_this.props.options, e.target.value, _this.props.filterFn);

        _this.setState({
          options: _options2,
          selectedOptionIndex: _this.findSelectedIndex(_options2, _this.state.nativeSelectValue),
          inputValue: e.target.value
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputKeyDown", function (event) {
      ["ArrowUp", "ArrowDown", "Escape", "Enter"].includes(event.key) && _this.areOptionsShown && event.preventDefault();

      switch (event.key) {
        case "ArrowUp":
          _this.areOptionsShown && _this.focusOption("prev");
          break;

        case "ArrowDown":
          _this.areOptionsShown && _this.focusOption("next");
          break;

        case "Escape":
          _this.close();

          break;

        case "Enter":
          _this.areOptionsShown && _this.selectFocused();
          break;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDownSelect", function (event) {
      var opened = _this.state.opened;

      if (event.key.length === 1 && event.key !== " ") {
        _this.onKeyboardInput(event.key);

        return;
      }

      ["ArrowUp", "ArrowDown", "Escape", "Enter"].includes(event.key) && _this.areOptionsShown && event.preventDefault();

      switch (event.key) {
        case "ArrowUp":
          if (opened) {
            _this.areOptionsShown && _this.focusOption("prev");
          } else {
            _this.open();
          }

          break;

        case "ArrowDown":
          if (opened) {
            _this.areOptionsShown && _this.focusOption("next");
          } else {
            _this.open();
          }

          break;

        case "Escape":
          _this.close();

          break;

        case "Enter":
        case "Spacebar":
        case " ":
          if (opened) {
            _this.areOptionsShown && _this.selectFocused();
          } else {
            _this.open();
          }

          break;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyUp", (0, _utils.debounce)(_this.resetKeyboardInput, 1000));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderOption", function (option, index) {
      var _this$state2 = _this.state,
          focusedOptionIndex = _this$state2.focusedOptionIndex,
          selectedOptionIndex = _this$state2.selectedOptionIndex;
      var renderOption = _this.props.renderOption;
      var hovered = index === focusedOptionIndex;
      var selected = index === selectedOptionIndex;
      return (0, _jsxRuntime.createScopedElement)(React.Fragment, {
        key: "".concat(option.value)
      }, renderOption({
        option: option,
        hovered: hovered,
        children: option.label,
        selected: selected,
        disabled: option.disabled,
        onClick: _this.handleOptionClick,
        onMouseDown: _this.handleOptionDown,
        onMouseEnter: _this.handleOptionHover
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectRef", function (element) {
      _this.selectEl = element;
      (0, _utils.setRef)(element, _this.props.getRef);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onPlacementChange", function (placement) {
      _this.setState(function () {
        return {
          popperPlacement: placement
        };
      });
    });
    var _value = props.value,
        defaultValue = props.defaultValue;
    var initialValue = _value !== undefined ? _value : defaultValue;
    _this.keyboardInput = "";

    if (process.env.NODE_ENV === "development") {
      checkOptionsValueType(props.options);
    }

    _this.state = {
      opened: false,
      focusedOptionIndex: -1,
      selectedOptionIndex: _this.findSelectedIndex(props.options, initialValue),
      nativeSelectValue: initialValue,
      options: props.options,
      inputValue: ""
    };

    if (props.value !== undefined) {
      _this.isControlledOutside = true;
    }

    return _this;
  }

  (0, _createClass2.default)(CustomSelect, [{
    key: "areOptionsShown",
    get: function get() {
      return this.scrollBoxRef.current !== null;
    }
  }, {
    key: "findSelectedIndex",
    value: function findSelectedIndex(options, value) {
      return options.findIndex(function (item) {
        value = typeof item.value === "number" ? Number(value) : value;
        return item.value === value;
      });
    }
  }, {
    key: "isValidIndex",
    value: function isValidIndex(index) {
      return index >= 0 && index < this.state.options.length;
    }
  }, {
    key: "scrollToElement",
    value: function scrollToElement(index) {
      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dropdown = this.scrollBoxRef.current;
      var item = dropdown ? dropdown.children[index] : null;

      if (!item) {
        return;
      }

      var dropdownHeight = dropdown.offsetHeight;
      var scrollTop = dropdown.scrollTop;
      var itemTop = item.offsetTop;
      var itemHeight = item.offsetHeight;

      if (center) {
        dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
      } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
        dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
      } else if (itemTop < scrollTop) {
        dropdown.scrollTop = itemTop;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Внутри useEffect и так is, можно убрать
      if (!(0, _is.is)(prevProps.value, this.props.value) || prevProps.options !== this.props.options) {
        if (process.env.NODE_ENV === "development") {
          checkOptionsValueType(this.props.options);
        }

        this.isControlledOutside = this.props.value !== undefined;

        var _value2 = this.props.value === undefined ? this.state.nativeSelectValue : this.props.value;

        var _options3 = this.props.searchable ? this.filter(this.props.options, this.state.inputValue, this.props.filterFn) : this.props.options;

        this.setState({
          nativeSelectValue: _value2,
          selectedOptionIndex: this.findSelectedIndex(_options3, _value2),
          options: _options3
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$popperPla;

      var _this$state3 = this.state,
          opened = _this$state3.opened,
          nativeSelectValue = _this$state3.nativeSelectValue,
          stateOptions = _this$state3.options;
      var _this$props = this.props,
          searchable = _this$props.searchable,
          name = _this$props.name,
          className = _this$props.className,
          getRef = _this$props.getRef,
          getRootRef = _this$props.getRootRef,
          popupDirection = _this$props.popupDirection,
          options = _this$props.options,
          sizeY = _this$props.sizeY,
          platform = _this$props.platform,
          style = _this$props.style,
          onChange = _this$props.onChange,
          onBlur = _this$props.onBlur,
          onFocus = _this$props.onFocus,
          onClick = _this$props.onClick,
          renderOption = _this$props.renderOption,
          children = _this$props.children,
          emptyText = _this$props.emptyText,
          onInputChange = _this$props.onInputChange,
          filterFn = _this$props.filterFn,
          renderDropdown = _this$props.renderDropdown,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          fetching = _this$props.fetching,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var selected = this.getSelectedItem();
      var label = selected ? selected.label : undefined;
      var defaultDropdownContent = stateOptions.length > 0 ? stateOptions.map(this.renderOption) : (0, _jsxRuntime.createScopedElement)(_Caption.default, {
        level: "1",
        weight: "regular",
        vkuiClass: "CustomSelect__empty"
      }, this.props.emptyText);
      var resolvedContent;

      if (typeof renderDropdown === "function") {
        resolvedContent = renderDropdown({
          defaultDropdownContent: defaultDropdownContent
        });
      } else {
        resolvedContent = defaultDropdownContent;
      }

      var isPopperDirectionTop = (_this$state$popperPla = this.state.popperPlacement) === null || _this$state$popperPla === void 0 ? void 0 : _this$state$popperPla.includes("top");
      return (0, _jsxRuntime.createScopedElement)("label", {
        vkuiClass: (0, _getClassName.getClassName)("CustomSelect", platform),
        className: className,
        style: style,
        ref: (0, _utils.multiRef)(this.containerRef, getRootRef),
        onClick: this.onLabelClick
      }, opened && searchable ? (0, _jsxRuntime.createScopedElement)(_Input.default, (0, _extends2.default)({}, restProps, {
        autoFocus: true,
        onBlur: this.onBlur,
        vkuiClass: (0, _classNames.classNames)({
          CustomSelect__open: opened,
          "CustomSelect__open--popupDirectionTop": isPopperDirectionTop
        }),
        value: this.state.inputValue,
        onKeyDown: this.onInputKeyDown,
        onChange: this.onInputChange // TODO Ожидается, что клик поймает нативный select, но его перехвает Input. К сожалению, это приводит конфликтам типизации.
        // TODO Нужно перестать пытаться превратить CustomSelect в select. Тогда эта проблема уйдёт.
        // @ts-ignore
        ,
        onClick: onClick,
        after: (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null),
        placeholder: restProps.placeholder
      })) : (0, _jsxRuntime.createScopedElement)(_SelectMimicry.default, (0, _extends2.default)({}, restProps, {
        "aria-hidden": true,
        onClick: this.onClick,
        onKeyDown: this.handleKeyDownSelect,
        onKeyUp: this.handleKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        vkuiClass: (0, _classNames.classNames)({
          CustomSelect__open: opened,
          "CustomSelect__open--popupDirectionTop": isPopperDirectionTop
        })
      }), label), (0, _jsxRuntime.createScopedElement)("select", {
        ref: this.selectRef,
        name: name,
        onChange: this.onNativeSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        onClick: onClick,
        value: nativeSelectValue,
        "aria-hidden": true,
        vkuiClass: "CustomSelect__control"
      }, options.map(function (item) {
        return (0, _jsxRuntime.createScopedElement)("option", {
          key: "".concat(item.value),
          value: item.value
        });
      })), opened && (0, _jsxRuntime.createScopedElement)(_CustomSelectDropdown.CustomSelectDropdown, {
        targetRef: this.containerRef,
        placement: popupDirection,
        scrollBoxRef: this.scrollBoxRef,
        onPlacementChange: this.onPlacementChange,
        onMouseLeave: this.resetFocusedOption,
        fetching: fetching
      }, resolvedContent));
    }
  }]);
  return CustomSelect;
}(React.Component);

(0, _defineProperty2.default)(CustomSelect, "defaultProps", {
  searchable: false,
  renderOption: function renderOption(_ref2) {
    var option = _ref2.option,
        props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
    return (0, _jsxRuntime.createScopedElement)(_CustomSelectOption.default, props);
  },
  options: [],
  emptyText: "Ничего не найдено",
  filterFn: _select.defaultFilterFn
});

var _default = (0, _withPlatform.withPlatform)((0, _withAdaptivity.withAdaptivity)(CustomSelect, {
  sizeY: true
}));

exports.default = _default;
//# sourceMappingURL=CustomSelect.js.map