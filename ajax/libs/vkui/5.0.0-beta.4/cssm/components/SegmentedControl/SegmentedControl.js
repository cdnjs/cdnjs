import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "name", "options", "getRootRef", "onChange", "value", "defaultValue", "children", "className"],
  _excluded2 = ["label", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { generateRandomId, noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { SegmentedControlOption } from "./SegmentedControlOption/SegmentedControlOption";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import "./SegmentedControl.module.css";
var warn = warnOnce("SegmentedControl");

/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */
export var SegmentedControl = function SegmentedControl(_ref) {
  var _options$;
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? "l" : _ref$size,
    name = _ref.name,
    options = _ref.options,
    getRootRef = _ref.getRootRef,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
    valueProp = _ref.value,
    defaultValue = _ref.defaultValue,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var initialValue = defaultValue !== null && defaultValue !== void 0 ? defaultValue : (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value;
  if (process.env.NODE_ENV === "development") {
    if (valueProp !== undefined && defaultValue !== undefined) {
      warn("SegmentedControl должен быть либо управляемым, либо неуправляемым" + "(укажите либо свойство value, либо свойство defaultValue, но не оба).", "error");
    }
  }
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeOptionIdx = _React$useState2[0],
    updateActiveOptionIdx = _React$useState2[1];
  var _React$useState3 = React.useState(initialValue),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    valueLocal = _React$useState4[0],
    updateValueLocal = _React$useState4[1];
  var value = valueProp !== null && valueProp !== void 0 ? valueProp : valueLocal;
  var nameRef = React.useRef(name !== null && name !== void 0 ? name : generateRandomId());
  useIsomorphicLayoutEffect(function () {
    var _activeOptionIdx = options.findIndex(function (option) {
      return option.value === value;
    });
    if (_activeOptionIdx === -1 && process.env.NODE_ENV === "development") {
      warn("defaultValue: такого значения нет среди опций!", "error");
    }
    updateActiveOptionIdx(_activeOptionIdx);
  }, [value, options]);
  var translateX = "translateX(".concat(100 * activeOptionIdx, "%)");
  var handleOnChange = function handleOnChange(value) {
    if (valueProp === undefined) {
      updateValueLocal(value);
    }
    onChange(value);
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNamesString("vkuiSegmentedControl", getSizeYClassName("vkuiSegmentedControl", sizeY), styles["SegmentedControl--size-".concat(size)], className),
    ref: getRootRef
  }), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    className: "vkuiSegmentedControl__in"
  }, activeOptionIdx > -1 && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "vkuiSegmentedControl__slider",
    style: {
      width: "".concat(100 / options.length, "%"),
      transform: translateX,
      WebkitTransform: translateX
    }
  }), options.map(function (_ref2) {
    var label = _ref2.label,
      optionClassName = _ref2.className,
      optionProps = _objectWithoutProperties(_ref2, _excluded2);
    return /*#__PURE__*/React.createElement(SegmentedControlOption, _extends({
      key: "".concat(optionProps.value)
    }, optionProps, {
      className: classNamesString("vkuiSegmentedControl__option", optionClassName),
      name: nameRef.current,
      checked: value === optionProps.value,
      onChange: function onChange() {
        return handleOnChange(optionProps.value);
      }
    }), label);
  })));
};
var styles = {
  "SegmentedControl--size-l": "vkuiSegmentedControl--size-l",
  "SegmentedControl--size-m": "vkuiSegmentedControl--size-m"
};
//# sourceMappingURL=SegmentedControl.js.map