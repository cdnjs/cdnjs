import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "length", "index", "onElementSelect", "onClick", "onFocus", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { callMultiple } from "../../lib/callMultiple";
import { stopPropagation } from "../../lib/utils";
import { classNames } from "../../lib/classNames";
import "./InputLike.css";
var MASK_SYMBOL = String.fromCharCode(0x2007);

function getMaskElements(length) {
  var result = [];

  for (var _index = 0; _index < length; _index += 1) {
    result.push(createScopedElement("span", {
      key: _index,
      vkuiClass: "InputLike__mask"
    }, MASK_SYMBOL));
  }

  return result;
}

export var InputLike = function InputLike(_ref) {
  var _value$length;

  var value = _ref.value,
      length = _ref.length,
      index = _ref.index,
      onElementSelect = _ref.onElementSelect,
      onClick = _ref.onClick,
      onFocus = _ref.onFocus,
      getRootRef = _ref.getRootRef,
      props = _objectWithoutProperties(_ref, _excluded);

  var handleElementSelect = React.useCallback(function (event) {
    stopPropagation(event);
    onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
  }, [index, onElementSelect]);
  return createScopedElement("span", _extends({
    vkuiClass: classNames("InputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "InputLike--full"),
    tabIndex: 0,
    ref: getRootRef,
    onClick: callMultiple(onClick, handleElementSelect),
    onFocus: callMultiple(stopPropagation, onFocus)
  }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && createScopedElement("span", {
    key: index,
    vkuiClass: "InputLike__last_character"
  }, value.slice(length - 1)), getMaskElements(length - ((_value$length = value === null || value === void 0 ? void 0 : value.length) !== null && _value$length !== void 0 ? _value$length : 0)));
};
InputLike.displayName = "InputLike";
//# sourceMappingURL=InputLike.js.map