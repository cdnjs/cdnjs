import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "name", "options", "getRootRef", "onChange", "value", "defaultValue", "children"],
    _excluded2 = ["label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { generateRandomId, noop } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { SegmentedControlOption } from "./SegmentedControlOption/SegmentedControlOption";
import "./SegmentedControl.css";
var warn = warnOnce("SegmentedControl");
export var SegmentedControl = function SegmentedControl(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "l" : _ref$size,
      name = _ref.name,
      options = _ref.options,
      getRootRef = _ref.getRootRef,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      value = _ref.value,
      defaultValue = _ref.defaultValue,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var initialValue = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value;

  if (!initialValue) {
    var _options$;

    initialValue = (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value;
  }

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeOptionIdx = _React$useState2[0],
      updateActiveOptionIdx = _React$useState2[1];

  var _React$useState3 = React.useState(initialValue),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      activeValue = _React$useState4[0],
      updateActiveValue = _React$useState4[1];

  var nameRef = React.useRef(name !== null && name !== void 0 ? name : generateRandomId());
  useIsomorphicLayoutEffect(function () {
    var _activeOptionIdx = options.findIndex(function (option) {
      return option.value === activeValue;
    });

    if (_activeOptionIdx === -1 && process.env.NODE_ENV === "development") {
      warn("defaultValue: такого значения нет среди опций!");
    }

    updateActiveOptionIdx(_activeOptionIdx);
  }, [activeValue, options]);
  var translateX = "translateX(".concat(100 * activeOptionIdx, "%)");

  var handleOnChange = function handleOnChange(value) {
    updateActiveValue(value);
    onChange(value);
  };

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("SegmentedControl", "SegmentedControl--".concat(size)),
    ref: getRootRef
  }), createScopedElement("div", {
    role: "radiogroup",
    vkuiClass: "SegmentedControl__in"
  }, activeOptionIdx > -1 && createScopedElement("div", {
    "aria-hidden": "true",
    vkuiClass: "SegmentedControl__slider",
    style: {
      width: "".concat(100 / options.length, "%"),
      transform: translateX,
      WebkitTransform: translateX
    }
  }), options.map(function (_ref2) {
    var label = _ref2.label,
        optionProps = _objectWithoutProperties(_ref2, _excluded2);

    return createScopedElement(SegmentedControlOption, _extends({
      key: "".concat(optionProps.value)
    }, optionProps, {
      vkuiClass: "SegmentedControl__option",
      name: nameRef.current,
      checked: activeValue === optionProps.value,
      onChange: function onChange() {
        return handleOnChange(optionProps.value);
      }
    }), label);
  })));
};
//# sourceMappingURL=SegmentedControl.js.map