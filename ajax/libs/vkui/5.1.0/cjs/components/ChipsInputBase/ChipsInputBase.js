"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chipsInputDefaultProps = exports.ChipsInputBase = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _vkjs = require("@vkontakte/vkjs");
var _Chip = require("../Chip/Chip");
var _useChipsInput2 = require("../../hooks/useChipsInput");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _excluded = ["disabled", "value", "label"],
  _excluded2 = ["style", "className", "getRootRef", "value", "onChange", "onInputChange", "onKeyDown", "onBlur", "onFocus", "children", "inputValue", "getRef", "placeholder", "getOptionValue", "getOptionLabel", "getNewOptionData", "renderChip", "inputAriaLabel"];
var chipsInputDefaultProps = {
  onChange: _vkjs.noop,
  onInputChange: _vkjs.noop,
  onKeyDown: _vkjs.noop,
  onBlur: _vkjs.noop,
  onFocus: _vkjs.noop,
  value: [],
  inputValue: '',
  inputAriaLabel: 'Введите ваше значение...',
  getOptionValue: function getOptionValue(option) {
    return option.value;
  },
  getOptionLabel: function getOptionLabel(option) {
    return option.label;
  },
  getNewOptionData: function getNewOptionData(_, label) {
    return {
      value: label,
      label: label
    };
  },
  renderChip: function renderChip(props) {
    if (!props) {
      return null;
    }
    var disabled = props.disabled,
      value = props.value,
      label = props.label,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);
    return /*#__PURE__*/React.createElement(_Chip.Chip, (0, _extends2.default)({
      value: value,
      removable: !disabled
    }, rest), label);
  }
};
exports.chipsInputDefaultProps = chipsInputDefaultProps;
var ChipsInputBase = function ChipsInputBase(props) {
  var propsWithDefault = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, chipsInputDefaultProps), props);
  var style = propsWithDefault.style,
    className = propsWithDefault.className,
    getRootRef = propsWithDefault.getRootRef,
    value = propsWithDefault.value,
    onChange = propsWithDefault.onChange,
    onInputChange = propsWithDefault.onInputChange,
    onKeyDown = propsWithDefault.onKeyDown,
    onBlur = propsWithDefault.onBlur,
    onFocus = propsWithDefault.onFocus,
    children = propsWithDefault.children,
    inputValue = propsWithDefault.inputValue,
    getRef = propsWithDefault.getRef,
    placeholder = propsWithDefault.placeholder,
    getOptionValue = propsWithDefault.getOptionValue,
    getOptionLabel = propsWithDefault.getOptionLabel,
    getNewOptionData = propsWithDefault.getNewOptionData,
    renderChip = propsWithDefault.renderChip,
    inputAriaLabel = propsWithDefault.inputAriaLabel,
    restProps = (0, _objectWithoutProperties2.default)(propsWithDefault, _excluded2);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var _useChipsInput = (0, _useChipsInput2.useChipsInput)(propsWithDefault),
    fieldValue = _useChipsInput.fieldValue,
    addOptionFromInput = _useChipsInput.addOptionFromInput,
    removeOption = _useChipsInput.removeOption,
    selectedOptions = _useChipsInput.selectedOptions,
    handleInputChange = _useChipsInput.handleInputChange;
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  var isDisabled = restProps.disabled || restProps.readOnly;
  var handleKeyDown = function handleKeyDown(e) {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onKeyDown(e);
    if (e.key === 'Backspace' && !e.defaultPrevented && !fieldValue && selectedOptions.length) {
      removeOption(getOptionValue(selectedOptions[selectedOptions.length - 1]));
      e.preventDefault();
    }
    if (e.key === 'Enter' && !e.defaultPrevented && fieldValue) {
      addOptionFromInput();
      e.preventDefault();
    }
  };
  var handleBlur = function handleBlur(e) {
    if (focused) {
      setFocused(false);
    }
    onBlur(e);
  };
  var handleFocus = function handleFocus(e) {
    if (!focused) {
      setFocused(true);
    }
    onFocus(e);
  };
  var handleChipRemove = function handleChipRemove(_, value) {
    if (value !== undefined) {
      removeOption(value);
    }
  };
  var handleClick = function handleClick(e) {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if ((inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) !== null && !focused) {
      inputRef.current.focus();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: handleClick,
    role: "presentation",
    style: style,
    className: (0, _vkjs.classNames)("vkuiChipsInputBase", (0, _getSizeYClassName.getSizeYClassName)("vkuiChipsInputBase", sizeY), className),
    ref: getRootRef
  }, selectedOptions.map(function (option) {
    var value = getOptionValue(option);
    var label = getOptionLabel(option);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: "".concat((0, _typeof2.default)(value), "-").concat(value)
    }, renderChip({
      option: option,
      value: value,
      label: label,
      onRemove: handleChipRemove,
      disabled: Boolean(restProps.disabled),
      className: "vkuiChipsInputBase__chip"
    }));
  }), /*#__PURE__*/React.createElement("label", {
    className: "vkuiChipsInputBase__label",
    "aria-label": inputAriaLabel
  }, /*#__PURE__*/React.createElement("input", (0, _extends2.default)({
    type: "text",
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    "aria-autocomplete": "list",
    className: "vkuiChipsInputBase__el"
  }, restProps, {
    ref: inputRef,
    value: fieldValue,
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    placeholder: selectedOptions.length ? undefined : placeholder
  }))));
};
exports.ChipsInputBase = ChipsInputBase;
//# sourceMappingURL=ChipsInputBase.js.map