import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
var _excluded = ["searchable", "name", "className", "getRef", "getRootRef", "popupDirection", "options", "sizeY", "platform", "style", "onChange", "onBlur", "onFocus", "onClick", "renderOption", "children", "emptyText", "onInputChange", "filterFn", "renderDropdown", "onOpen", "onClose", "fetching", "icon", "dropdownOffsetDistance", "fixDropdownWidth", "forceDropdownPortal"],
    _excluded2 = ["option"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import SelectMimicry from "../SelectMimicry/SelectMimicry";
import { debounce, setRef, multiRef } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { withPlatform } from "../../hoc/withPlatform";
import CustomSelectOption from "../CustomSelectOption/CustomSelectOption";
import { getClassName } from "../../helpers/getClassName";
import Input from "../Input/Input";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { Caption } from "../Typography/Caption/Caption";
import { warnOnce } from "../../lib/warnOnce";
import { defaultFilterFn } from "../../lib/select";
import { is } from "../../lib/is";
import { CustomSelectDropdown } from "../CustomSelectDropdown/CustomSelectDropdown";
import "./CustomSelect.css";

var findIndexAfter = function findIndexAfter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  if (startIndex >= options.length - 1) {
    return -1;
  }

  return options.findIndex(function (option, i) {
    return i > startIndex && !option.disabled;
  });
};

var findIndexBefore = function findIndexBefore() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var endIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.length;
  var result = -1;

  if (options === undefined || endIndex <= 0) {
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

var warn = warnOnce("CustomSelect");

var checkOptionsValueType = function checkOptionsValueType(options) {
  if (new Set(options.map(function (item) {
    return _typeof(item.value);
  })).size > 1) {
    warn("Some values of your options have different types. CustomSelect onChange always returns a string type.");
  }
};

export var SelectType;

(function (SelectType) {
  SelectType["Default"] = "default";
  SelectType["Plain"] = "plain";
})(SelectType || (SelectType = {}));

var CustomSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomSelect, _React$Component);

  var _super = _createSuper(CustomSelect);

  function CustomSelect(props) {
    var _this;

    _classCallCheck(this, CustomSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "keyboardInput", void 0);

    _defineProperty(_assertThisInitialized(_this), "isControlledOutside", false);

    _defineProperty(_assertThisInitialized(_this), "selectEl", null);

    _defineProperty(_assertThisInitialized(_this), "scrollBoxRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "containerRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "resetKeyboardInput", function () {
      _this.keyboardInput = "";
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedItem", function () {
      var _this$state = _this.state,
          selectedOptionIndex = _this$state.selectedOptionIndex,
          options = _this$state.options;

      if (!(options !== null && options !== void 0 && options.length)) {
        return null;
      }

      return selectedOptionIndex !== undefined ? options[selectedOptionIndex] : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "filter", function (options, inputValue, filterFn) {
      return typeof filterFn === "function" ? options.filter(function (option) {
        return filterFn(inputValue, option);
      }) : options;
    });

    _defineProperty(_assertThisInitialized(_this), "open", function () {
      _this.setState(function (_ref) {
        var selectedOptionIndex = _ref.selectedOptionIndex;
        return {
          opened: true,
          focusedOptionIndex: selectedOptionIndex
        };
      }, function () {
        var selectedOptionIndex = _this.state.selectedOptionIndex;

        if (selectedOptionIndex !== undefined && _this.isValidIndex(selectedOptionIndex)) {
          _this.scrollToElement(selectedOptionIndex, true);
        }
      });

      typeof _this.props.onOpen === "function" && _this.props.onOpen();
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
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

    _defineProperty(_assertThisInitialized(_this), "selectFocused", function () {
      var focusedOptionIndex = _this.state.focusedOptionIndex;

      if (focusedOptionIndex !== undefined) {
        _this.select(focusedOptionIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "select", function (index) {
      var _this$state$options;

      if (!_this.isValidIndex(index)) {
        return;
      }

      var item = (_this$state$options = _this.state.options) === null || _this$state$options === void 0 ? void 0 : _this$state$options[index];

      _this.setState({
        nativeSelectValue: item === null || item === void 0 ? void 0 : item.value
      }, function () {
        var _this$selectEl;

        var event = new Event("change", {
          bubbles: true
        });
        (_this$selectEl = _this.selectEl) === null || _this$selectEl === void 0 ? void 0 : _this$selectEl.dispatchEvent(event);
      });

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.state.opened ? _this.close() : _this.open();
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      var _this$selectEl2;

      var event = new Event("focus");
      (_this$selectEl2 = _this.selectEl) === null || _this$selectEl2 === void 0 ? void 0 : _this$selectEl2.dispatchEvent(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var _this$selectEl3;

      _this.close();

      var event = new Event("blur");
      (_this$selectEl3 = _this.selectEl) === null || _this$selectEl3 === void 0 ? void 0 : _this$selectEl3.dispatchEvent(event);
    });

    _defineProperty(_assertThisInitialized(_this), "focusOptionByIndex", function (index) {
      var _this$state$options$l, _this$state$options2, _this$state$options3;

      var scrollTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (index === undefined || index < 0 || index > ((_this$state$options$l = (_this$state$options2 = _this.state.options) === null || _this$state$options2 === void 0 ? void 0 : _this$state$options2.length) !== null && _this$state$options$l !== void 0 ? _this$state$options$l : 0) - 1) {
        return;
      }

      var option = (_this$state$options3 = _this.state.options) === null || _this$state$options3 === void 0 ? void 0 : _this$state$options3[index];

      if (option !== null && option !== void 0 && option.disabled) {
        return;
      }

      scrollTo && _this.scrollToElement(index);

      _this.setState(function (prevState) {
        return (// Это оптимизация, прежде всего, под `onMouseOver`
          prevState.focusedOptionIndex !== index ? {
            focusedOptionIndex: index
          } : null
        );
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focusOption", function (type) {
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

    _defineProperty(_assertThisInitialized(_this), "handleOptionHover", function (e) {
      var _e$currentTarget$pare;

      _this.focusOptionByIndex(Array.prototype.indexOf.call((_e$currentTarget$pare = e.currentTarget.parentNode) === null || _e$currentTarget$pare === void 0 ? void 0 : _e$currentTarget$pare.children, e.currentTarget), false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionDown", function (e) {
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionClick", function (e) {
      var _e$currentTarget$pare2, _this$state$options4;

      var index = Array.prototype.indexOf.call((_e$currentTarget$pare2 = e.currentTarget.parentNode) === null || _e$currentTarget$pare2 === void 0 ? void 0 : _e$currentTarget$pare2.children, e.currentTarget);
      var option = (_this$state$options4 = _this.state.options) === null || _this$state$options4 === void 0 ? void 0 : _this$state$options4[index];

      if (option && !option.disabled) {
        _this.selectFocused();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resetFocusedOption", function () {
      _this.setState({
        focusedOptionIndex: -1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyboardInput", function (key) {
      var _this$state$options5;

      var fullInput = _this.keyboardInput + key;
      var optionIndex = (_this$state$options5 = _this.state.options) === null || _this$state$options5 === void 0 ? void 0 : _this$state$options5.findIndex(function (option) {
        return option.label.toLowerCase().includes(fullInput);
      });

      if (optionIndex !== undefined && optionIndex > -1) {
        _this.focusOptionByIndex(optionIndex);
      }

      _this.keyboardInput = fullInput;
    });

    _defineProperty(_assertThisInitialized(_this), "onLabelClick", function (e) {
      var _this$scrollBoxRef$cu;

      if ((_this$scrollBoxRef$cu = _this.scrollBoxRef.current) !== null && _this$scrollBoxRef$cu !== void 0 && _this$scrollBoxRef$cu.contains(e.target)) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNativeSelectChange", function (e) {
      var newSelectedOptionIndex = _this.findSelectedIndex(_this.state.options, e.currentTarget.value);

      if (_this.state.selectedOptionIndex !== newSelectedOptionIndex) {
        var _this$props$onChange, _this$props;

        if (!_this.isControlledOutside) {
          _this.setState({
            selectedOptionIndex: newSelectedOptionIndex
          });
        }

        (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "onInputKeyDown", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownSelect", function (event) {
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

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", debounce(_this.resetKeyboardInput, 1000));

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option, index) {
      var _this$state2 = _this.state,
          focusedOptionIndex = _this$state2.focusedOptionIndex,
          selectedOptionIndex = _this$state2.selectedOptionIndex;
      var renderOption = _this.props.renderOption;
      var hovered = index === focusedOptionIndex;
      var selected = index === selectedOptionIndex;
      return createScopedElement(React.Fragment, {
        key: "".concat(option.value)
      }, renderOption({
        option: option,
        hovered: hovered,
        children: option.label,
        selected: selected,
        disabled: option.disabled,
        onClick: _this.handleOptionClick,
        onMouseDown: _this.handleOptionDown,
        // Используем `onMouseOver` вместо `onMouseEnter`.
        // При параметре `searchable`, обновляется "ребёнок", из-за чего `onMouseEnter` не срабатывает в следующих кейсах:
        //  1. До загрузки выпадающего списка, курсор мышки находится над произвольным элементом этого списка.
        //     > Лечение: только увод курсора мыши и возвращении его обратно вызывает событие `onMouseEnter` на этот элемент.
        //  2. Если это тач-устройство.
        //     > Лечение: нужно нажать на какой-нибудь произвольный элемент списка, после чего `onMouseEnter` будет работать на соседние элементы,
        //     но не на тот, на который нажали в первый раз.
        // Более подробно по ссылке https://github.com/facebook/react/issues/13956#issuecomment-1082055744
        onMouseOver: _this.handleOptionHover
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "selectRef", function (element) {
      _this.selectEl = element;

      if (_this.props.getRef) {
        setRef(element, _this.props.getRef);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPlacementChange", function (placement) {
      _this.setState(function () {
        return {
          popperPlacement: placement
        };
      });
    });

    var value = props.value,
        defaultValue = props.defaultValue;
    var initialValue = value !== undefined ? value : defaultValue;
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

  _createClass(CustomSelect, [{
    key: "areOptionsShown",
    get: function get() {
      return this.scrollBoxRef.current !== null;
    }
  }, {
    key: "findSelectedIndex",
    value: function findSelectedIndex(options, value) {
      var _options$findIndex;

      return (_options$findIndex = options === null || options === void 0 ? void 0 : options.findIndex(function (item) {
        value = typeof item.value === "number" ? Number(value) : value;
        return item.value === value;
      })) !== null && _options$findIndex !== void 0 ? _options$findIndex : -1;
    }
  }, {
    key: "isValidIndex",
    value: function isValidIndex(index) {
      var _this$state$options$l2, _this$state$options6;

      return index >= 0 && index < ((_this$state$options$l2 = (_this$state$options6 = this.state.options) === null || _this$state$options6 === void 0 ? void 0 : _this$state$options6.length) !== null && _this$state$options$l2 !== void 0 ? _this$state$options$l2 : 0);
    }
  }, {
    key: "scrollToElement",
    value: function scrollToElement(index) {
      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dropdown = this.scrollBoxRef.current;
      var item = dropdown ? dropdown.children[index] : null;

      if (!item || !dropdown) {
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
      if (!is(prevProps.value, this.props.value) || prevProps.options !== this.props.options) {
        if (process.env.NODE_ENV === "development") {
          checkOptionsValueType(this.props.options);
        }

        this.isControlledOutside = this.props.value !== undefined;

        var _value = this.props.value === undefined ? this.state.nativeSelectValue : this.props.value;

        var _options3 = this.props.searchable && this.state.inputValue !== undefined ? this.filter(this.props.options, this.state.inputValue, this.props.filterFn) : this.props.options;

        this.setState({
          nativeSelectValue: _value,
          selectedOptionIndex: this.findSelectedIndex(_options3, _value),
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

      var _this$props2 = this.props,
          searchable = _this$props2.searchable,
          name = _this$props2.name,
          className = _this$props2.className,
          getRef = _this$props2.getRef,
          getRootRef = _this$props2.getRootRef,
          popupDirection = _this$props2.popupDirection,
          options = _this$props2.options,
          sizeY = _this$props2.sizeY,
          platform = _this$props2.platform,
          style = _this$props2.style,
          onChange = _this$props2.onChange,
          onBlur = _this$props2.onBlur,
          onFocus = _this$props2.onFocus,
          onClick = _this$props2.onClick,
          renderOption = _this$props2.renderOption,
          children = _this$props2.children,
          emptyText = _this$props2.emptyText,
          onInputChange = _this$props2.onInputChange,
          filterFn = _this$props2.filterFn,
          renderDropdown = _this$props2.renderDropdown,
          onOpen = _this$props2.onOpen,
          onClose = _this$props2.onClose,
          fetching = _this$props2.fetching,
          icon = _this$props2.icon,
          dropdownOffsetDistance = _this$props2.dropdownOffsetDistance,
          fixDropdownWidth = _this$props2.fixDropdownWidth,
          forceDropdownPortal = _this$props2.forceDropdownPortal,
          restProps = _objectWithoutProperties(_this$props2, _excluded);

      var selected = this.getSelectedItem();
      var label = selected ? selected.label : undefined;
      var defaultDropdownContent = stateOptions !== undefined && stateOptions.length > 0 ? stateOptions.map(this.renderOption) : createScopedElement(Caption, {
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
      return createScopedElement("label", {
        vkuiClass: getClassName("CustomSelect", platform),
        className: className,
        style: style,
        ref: multiRef(this.containerRef, getRootRef),
        onClick: this.onLabelClick
      }, opened && searchable ? createScopedElement(Input, _extends({}, restProps, {
        autoFocus: true,
        onBlur: this.onBlur,
        vkuiClass: classNames({
          CustomSelect__open: opened,
          "CustomSelect__open--popupDirectionTop": isPopperDirectionTop,
          "CustomSelect__open--not-adjacent": dropdownOffsetDistance > 0
        }),
        value: this.state.inputValue,
        onKeyDown: this.onInputKeyDown,
        onChange: this.onInputChange // TODO Ожидается, что клик поймает нативный select, но его перехвает Input. К сожалению, это приводит конфликтам типизации.
        // TODO Нужно перестать пытаться превратить CustomSelect в select. Тогда эта проблема уйдёт.
        // @ts-ignore
        ,
        onClick: onClick,
        after: icon,
        placeholder: restProps.placeholder
      })) : createScopedElement(SelectMimicry, _extends({}, restProps, {
        "aria-hidden": true,
        onClick: this.onClick,
        onKeyDown: this.handleKeyDownSelect,
        onKeyUp: this.handleKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        vkuiClass: classNames({
          CustomSelect__open: opened,
          "CustomSelect__open--popupDirectionTop": isPopperDirectionTop,
          "CustomSelect__open--not-adjacent": dropdownOffsetDistance > 0
        }),
        after: icon
      }), label), createScopedElement("select", {
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
        return createScopedElement("option", {
          key: "".concat(item.value),
          value: item.value
        });
      })), opened && createScopedElement(CustomSelectDropdown, {
        targetRef: this.containerRef,
        placement: popupDirection,
        scrollBoxRef: this.scrollBoxRef,
        onPlacementChange: this.onPlacementChange,
        onMouseLeave: this.resetFocusedOption,
        fetching: fetching,
        offsetDistance: dropdownOffsetDistance,
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal
      }, resolvedContent));
    }
  }]);

  return CustomSelect;
}(React.Component); // eslint-disable-next-line import/no-default-export


_defineProperty(CustomSelect, "defaultProps", {
  searchable: false,
  renderOption: function renderOption(_ref2) {
    var option = _ref2.option,
        props = _objectWithoutProperties(_ref2, _excluded2);

    return createScopedElement(CustomSelectOption, props);
  },
  options: [],
  emptyText: "Ничего не найдено",
  filterFn: defaultFilterFn,
  icon: createScopedElement(DropdownIcon, null),
  dropdownOffsetDistance: 0,
  fixDropdownWidth: true,
  selectType: SelectType.Default
});

export default withPlatform(withAdaptivity(CustomSelect, {
  sizeY: true
}));
//# sourceMappingURL=CustomSelect.js.map