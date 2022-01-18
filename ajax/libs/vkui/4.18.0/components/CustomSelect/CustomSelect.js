import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
var _excluded = ["searchable", "name", "className", "getRef", "getRootRef", "popupDirection", "options", "sizeY", "platform", "style", "onChange", "onBlur", "onFocus", "onClick", "renderOption", "children", "emptyText", "onInputChange", "filterFn", "renderDropdown", "onOpen", "onClose", "fetching"],
    _excluded2 = ["option"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import SelectMimicry from "../SelectMimicry/SelectMimicry";
import { debounce, setRef } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import CustomScrollView from "../CustomScrollView/CustomScrollView";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { withPlatform } from "../../hoc/withPlatform";
import CustomSelectOption from "../CustomSelectOption/CustomSelectOption";
import { getClassName } from "../../helpers/getClassName";
import Input from "../Input/Input";
import { Icon20Dropdown, Icon24Dropdown } from '@vkontakte/icons';
import Caption from "../Typography/Caption/Caption";
import { warnOnce } from "../../lib/warnOnce";
import Spinner from "../Spinner/Spinner";
import { defaultFilterFn } from "../../lib/select";

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

var warn = warnOnce('CustomSelect');

var checkOptionsValueType = function checkOptionsValueType(options) {
  if (new Set(options.map(function (item) {
    return _typeof(item.value);
  })).size > 1) {
    warn('Some values of your options have different types. CustomSelect onChange always returns a string type.');
  }
};

var CustomSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomSelect, _React$Component);

  var _super = _createSuper(CustomSelect);

  function CustomSelect(props) {
    var _this;

    _classCallCheck(this, CustomSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "keyboardInput", void 0);

    _defineProperty(_assertThisInitialized(_this), "isControlledOutside", void 0);

    _defineProperty(_assertThisInitialized(_this), "selectEl", void 0);

    _defineProperty(_assertThisInitialized(_this), "scrollBoxRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "resetKeyboardInput", function () {
      _this.keyboardInput = '';
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedItem", function () {
      var _this$state = _this.state,
          selectedOptionIndex = _this$state.selectedOptionIndex,
          options = _this$state.options;

      if (!options.length) {
        return null;
      }

      return options[selectedOptionIndex];
    });

    _defineProperty(_assertThisInitialized(_this), "filter", function (options, inputValue, filterFn) {
      return typeof filterFn === 'function' ? options.filter(function (option) {
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

        if (_this.isValidIndex(selectedOptionIndex)) {
          _this.scrollToElement(selectedOptionIndex, true);
        }
      });

      typeof _this.props.onOpen === 'function' && _this.props.onOpen();
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      _this.resetKeyboardInput();

      _this.setState(function () {
        return {
          inputValue: '',
          opened: false,
          focusedOptionIndex: -1,
          options: _this.props.options
        };
      });

      typeof _this.props.onClose === 'function' && _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "selectFocused", function () {
      var focusedOptionIndex = _this.state.focusedOptionIndex;

      _this.select(focusedOptionIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "select", function (index) {
      if (!_this.isValidIndex(index)) {
        return;
      }

      var item = _this.state.options[index];

      _this.setState({
        nativeSelectValue: item.value
      }, function () {
        var event = new Event('change', {
          bubbles: true
        });

        _this.selectEl.dispatchEvent(event);
      });

      _this.close();
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      _this.state.opened ? _this.close() : _this.open();
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      var event = new Event('focus');

      _this.selectEl.dispatchEvent(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.close();

      var event = new Event('blur');

      _this.selectEl.dispatchEvent(event);
    });

    _defineProperty(_assertThisInitialized(_this), "focusOptionByIndex", function (index) {
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

    _defineProperty(_assertThisInitialized(_this), "focusOption", function (type) {
      var focusedOptionIndex = _this.state.focusedOptionIndex;
      var index = focusedOptionIndex;

      if (type === 'next') {
        var nextIndex = findIndexAfter(_this.state.options, index);
        index = nextIndex === -1 ? findIndexAfter(_this.state.options) : nextIndex; // Следующий за index или первый валидный до index
      } else if (type === 'prev') {
        var beforeIndex = findIndexBefore(_this.state.options, index);
        index = beforeIndex === -1 ? findIndexBefore(_this.state.options) : beforeIndex; // Предшествующий index или последний валидный после index
      }

      _this.focusOptionByIndex(index);
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionHover", function (e) {
      _this.focusOptionByIndex(Array.prototype.indexOf.call(e.currentTarget.parentNode.children, e.currentTarget), false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionDown", function (e) {
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionClick", function (e) {
      var index = Array.prototype.indexOf.call(e.currentTarget.parentNode.children, e.currentTarget);
      var option = _this.state.options[index];

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
      var fullInput = _this.keyboardInput + key;

      var optionIndex = _this.state.options.findIndex(function (option) {
        return option.label.toLowerCase().includes(fullInput);
      });

      if (optionIndex > -1) {
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

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      if (_this.props.onInputChange) {
        var _options = _this.props.onInputChange(e, _this.props.options);

        if (_options) {
          if (process.env.NODE_ENV === 'development') {
            warn('This filtration method is deprecated. Return value of onInputChange will' + ' be ignored in v5.0.0. For custom filtration please update props.options by yourself or use filterFn property');
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
      ['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key) && _this.areOptionsShown && event.preventDefault();

      switch (event.key) {
        case 'ArrowUp':
          _this.areOptionsShown && _this.focusOption('prev');
          break;

        case 'ArrowDown':
          _this.areOptionsShown && _this.focusOption('next');
          break;

        case 'Escape':
          _this.close();

          break;

        case 'Enter':
          _this.areOptionsShown && _this.selectFocused();
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDownSelect", function (event) {
      var opened = _this.state.opened;

      if (event.key.length === 1 && event.key !== ' ') {
        _this.onKeyboardInput(event.key);

        return;
      }

      ['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key) && _this.areOptionsShown && event.preventDefault();

      switch (event.key) {
        case 'ArrowUp':
          if (opened) {
            _this.areOptionsShown && _this.focusOption('prev');
          } else {
            _this.open();
          }

          break;

        case 'ArrowDown':
          if (opened) {
            _this.areOptionsShown && _this.focusOption('next');
          } else {
            _this.open();
          }

          break;

        case 'Escape':
          _this.close();

          break;

        case 'Enter':
        case 'Spacebar':
        case ' ':
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
        onMouseEnter: _this.handleOptionHover
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "selectRef", function (element) {
      _this.selectEl = element;
      setRef(element, _this.props.getRef);
    });

    var _value = props.value,
        defaultValue = props.defaultValue;
    var initialValue = _value !== undefined ? _value : defaultValue;
    _this.keyboardInput = '';

    if (process.env.NODE_ENV === 'development') {
      checkOptionsValueType(props.options);
    }

    _this.state = {
      opened: false,
      focusedOptionIndex: -1,
      selectedOptionIndex: _this.findSelectedIndex(props.options, initialValue),
      nativeSelectValue: initialValue,
      options: props.options,
      inputValue: ''
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
      return options.findIndex(function (item) {
        value = typeof item.value === 'number' ? Number(value) : value;
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
      if (prevProps.value !== this.props.value || prevProps.options !== this.props.options) {
        if (process.env.NODE_ENV === 'development') {
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
      var _this$state3 = this.state,
          opened = _this$state3.opened,
          nativeSelectValue = _this$state3.nativeSelectValue;

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
          restProps = _objectWithoutProperties(_this$props, _excluded);

      var selected = this.getSelectedItem();
      var label = selected ? selected.label : undefined;
      var defaultDropdownContent = createScopedElement(CustomScrollView, {
        boxRef: this.scrollBoxRef
      }, this.state.options.map(this.renderOption), this.state.options.length === 0 && createScopedElement(Caption, {
        level: "1",
        weight: "regular",
        vkuiClass: "CustomSelect__empty"
      }, this.props.emptyText));
      var resolvedContent;

      if (typeof renderDropdown === 'function') {
        resolvedContent = renderDropdown({
          defaultDropdownContent: defaultDropdownContent
        });
      } else if (fetching) {
        resolvedContent = createScopedElement("div", {
          vkuiClass: "CustomSelect__fetching"
        }, createScopedElement(Spinner, {
          size: "small"
        }));
      } else {
        resolvedContent = defaultDropdownContent;
      }

      return createScopedElement("label", {
        vkuiClass: getClassName('CustomSelect', platform),
        className: className,
        style: style,
        ref: getRootRef,
        onClick: this.onLabelClick
      }, opened && searchable ? createScopedElement(Input, _extends({}, restProps, {
        autoFocus: true,
        onBlur: this.onBlur,
        vkuiClass: classNames({
          'CustomSelect__open': opened,
          'CustomSelect__open--popupDirectionTop': popupDirection === 'top'
        }),
        value: this.state.inputValue,
        onKeyDown: this.onInputKeyDown,
        onChange: this.onInputChange // TODO Ожидается, что клик поймает нативный select, но его перехвает Input. К сожалению, это приводит конфликтам типизации.
        // TODO Нужно перестать пытаться превратить CustomSelect в select. Тогда эта проблема уйдёт.
        // @ts-ignore
        ,
        onClick: onClick,
        after: sizeY === SizeType.COMPACT ? createScopedElement(Icon20Dropdown, null) : createScopedElement(Icon24Dropdown, null),
        placeholder: restProps.placeholder
      })) : createScopedElement(SelectMimicry, _extends({}, restProps, {
        "aria-hidden": true,
        onClick: this.onClick,
        onKeyDown: this.handleKeyDownSelect,
        onKeyUp: this.handleKeyUp,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        vkuiClass: classNames({
          'CustomSelect__open': opened,
          'CustomSelect__open--popupDirectionTop': popupDirection === 'top'
        })
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
      })), opened && createScopedElement("div", {
        vkuiClass: classNames('CustomSelect__options', "CustomSelect__options--sizeY-".concat(sizeY), {
          'CustomSelect__options--popupDirectionTop': popupDirection === 'top'
        }),
        onMouseLeave: this.resetFocusedOption
      }, resolvedContent));
    }
  }]);

  return CustomSelect;
}(React.Component);

_defineProperty(CustomSelect, "defaultProps", {
  searchable: false,
  renderOption: function renderOption(_ref2) {
    var option = _ref2.option,
        props = _objectWithoutProperties(_ref2, _excluded2);

    return createScopedElement(CustomSelectOption, props);
  },
  options: [],
  emptyText: 'Ничего не найдено',
  filterFn: defaultFilterFn
});

export default withPlatform(withAdaptivity(CustomSelect, {
  sizeY: true
}));
//# sourceMappingURL=CustomSelect.js.map