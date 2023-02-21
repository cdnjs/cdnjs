import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "getRootRef", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./Div.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Div
 */
export var Div = function Div(_ref) {
  var children = _ref.children,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiDiv", className)
  }), children);
};
//# sourceMappingURL=Div.js.map