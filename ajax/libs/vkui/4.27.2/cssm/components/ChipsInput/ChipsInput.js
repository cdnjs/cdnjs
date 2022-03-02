import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["disabled", "value", "label"],
    _excluded2 = ["style", "value", "onChange", "onInputChange", "onKeyDown", "onBlur", "onFocus", "children", "className", "inputValue", "getRef", "getRootRef", "placeholder", "getOptionValue", "getOptionLabel", "getNewOptionData", "renderChip", "after", "inputAriaLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { FormField } from "../FormField/FormField";
import { classNames } from "../../lib/classNames";
import { Chip } from "../Chip/Chip";
import { noop } from "../../lib/utils";
import { useChipsInput } from "./useChipsInput";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { prefixClass } from "../../lib/prefixClass";
import { useExternRef } from "../../hooks/useExternRef";
import "./ChipsInput.css";
export var chipsInputDefaultProps = {
  type: "text",
  onChange: noop,
  onInputChange: noop,
  onKeyDown: noop,
  onBlur: noop,
  onFocus: noop,
  value: [],
  inputValue: "",
  inputAriaLabel: "Введите ваше значение...",
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
        rest = _objectWithoutProperties(props, _excluded);

    return createScopedElement(Chip, _extends({
      value: value,
      removable: !disabled
    }, rest), label);
  }
};

var ChipsInput = function ChipsInput(props) {
  var propsWithDefault = _objectSpread(_objectSpread({}, chipsInputDefaultProps), props);

  var style = propsWithDefault.style,
      value = propsWithDefault.value,
      onChange = propsWithDefault.onChange,
      onInputChange = propsWithDefault.onInputChange,
      onKeyDown = propsWithDefault.onKeyDown,
      onBlur = propsWithDefault.onBlur,
      onFocus = propsWithDefault.onFocus,
      children = propsWithDefault.children,
      className = propsWithDefault.className,
      inputValue = propsWithDefault.inputValue,
      getRef = propsWithDefault.getRef,
      getRootRef = propsWithDefault.getRootRef,
      placeholder = propsWithDefault.placeholder,
      getOptionValue = propsWithDefault.getOptionValue,
      getOptionLabel = propsWithDefault.getOptionLabel,
      getNewOptionData = propsWithDefault.getNewOptionData,
      renderChip = propsWithDefault.renderChip,
      after = propsWithDefault.after,
      inputAriaLabel = propsWithDefault.inputAriaLabel,
      restProps = _objectWithoutProperties(propsWithDefault, _excluded2);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focused = _React$useState2[0],
      setFocused = _React$useState2[1];

  var _useChipsInput = useChipsInput(propsWithDefault),
      fieldValue = _useChipsInput.fieldValue,
      addOptionFromInput = _useChipsInput.addOptionFromInput,
      removeOption = _useChipsInput.removeOption,
      selectedOptions = _useChipsInput.selectedOptions,
      handleInputChange = _useChipsInput.handleInputChange;

  var inputRef = useExternRef(getRef);
  var isDisabled = restProps.disabled || restProps.readOnly;

  var handleKeyDown = function handleKeyDown(e) {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    onKeyDown(e);

    if (e.key === "Backspace" && !e.defaultPrevented && !fieldValue && selectedOptions.length) {
      removeOption(getOptionValue(selectedOptions[selectedOptions.length - 1]));
      e.preventDefault();
    }

    if (e.key === "Enter" && !e.defaultPrevented && fieldValue) {
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

  return createScopedElement(FormField, {
    getRootRef: getRootRef,
    vkuiClass: classNames("ChipsInput", "ChipsInput--sizeY-".concat(sizeY), {
      "ChipsInput--focused": focused,
      "ChipsInput--withChips": !!selectedOptions.length
    }),
    className: className,
    style: style,
    disabled: restProps.disabled,
    after: after,
    onClick: handleClick,
    role: "application",
    "aria-disabled": restProps.disabled,
    "aria-readonly": restProps.readOnly
  }, createScopedElement("div", {
    vkuiClass: "ChipsInput__container",
    role: "presentation"
  }, selectedOptions.map(function (option) {
    var value = getOptionValue(option);
    var label = getOptionLabel(option);
    return createScopedElement(React.Fragment, {
      key: "".concat(_typeof(value), "-").concat(value)
    }, renderChip({
      option: option,
      value: value,
      label: label,
      onRemove: handleChipRemove,
      disabled: Boolean(restProps.disabled),
      className: prefixClass("ChipsInput__chip")
    }));
  }), createScopedElement("label", {
    vkuiClass: "ChipsInput__input-container",
    "aria-label": inputAriaLabel
  }, createScopedElement("input", _extends({
    ref: inputRef,
    value: fieldValue,
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    "aria-autocomplete": "list",
    vkuiClass: "ChipsInput__el",
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    placeholder: selectedOptions.length ? undefined : placeholder
  }, restProps)))));
}; // eslint-disable-next-line import/no-default-export


export default ChipsInput;
//# sourceMappingURL=ChipsInput.js.map