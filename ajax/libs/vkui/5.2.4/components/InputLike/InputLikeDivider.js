import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
export var InputLikeDivider = function InputLikeDivider(_ref) {
  var children = _ref.children,
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classNames("vkuiInputLikeDivider", className)
  }, props), children);
};
//# sourceMappingURL=InputLikeDivider.js.map