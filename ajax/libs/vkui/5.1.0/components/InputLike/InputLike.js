import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "length", "index", "onElementSelect", "onClick", "onFocus", "getRootRef", "className"];
import * as React from 'react';
import { callMultiple } from '../../lib/callMultiple';
import { stopPropagation } from '../../lib/utils';
import { classNames } from '@vkontakte/vkjs';
var MASK_SYMBOL = String.fromCharCode(0x2007);
function getMaskElements(length) {
  var result = [];
  for (var _index = 0; _index < length; _index += 1) {
    result.push( /*#__PURE__*/React.createElement("span", {
      key: _index,
      className: "vkuiInputLike__mask"
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
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  var handleElementSelect = React.useCallback(function (event) {
    stopPropagation(event);
    onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(index);
  }, [index, onElementSelect]);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classNames("vkuiInputLike", (value === null || value === void 0 ? void 0 : value.length) === length && "vkuiInputLike--full", className),
    tabIndex: 0,
    ref: getRootRef,
    onClick: callMultiple(onClick, handleElementSelect),
    onFocus: callMultiple(stopPropagation, onFocus)
  }, props), value === null || value === void 0 ? void 0 : value.slice(0, length - 1), (value === null || value === void 0 ? void 0 : value.slice(length - 1)) && /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "vkuiInputLike__last_character"
  }, value.slice(length - 1)), getMaskElements(length - ((_value$length = value === null || value === void 0 ? void 0 : value.length) !== null && _value$length !== void 0 ? _value$length : 0)));
};
InputLike.displayName = 'InputLike';
//# sourceMappingURL=InputLike.js.map