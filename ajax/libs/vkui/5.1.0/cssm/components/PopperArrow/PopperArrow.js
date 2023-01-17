import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./PopperArrow.module.css";
export var PopperArrow = function PopperArrow(_ref) {
  var style = _ref.style,
    attributes = _ref.attributes,
    arrowClassName = _ref.arrowClassName;
  var _ref2 = attributes !== null && attributes !== void 0 ? attributes : {},
    arrowWrapperClassName = _ref2.className,
    restAttributes = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, restAttributes, {
    className: classNames("vkuiPopperArrow", arrowWrapperClassName),
    "data-popper-arrow": true
  }), /*#__PURE__*/React.createElement("svg", {
    className: classNames("vkuiPopperArrow__in", arrowClassName),
    width: "20",
    height: "8",
    viewBox: "0 0 20 8",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 0C13 0 15.9999 8 20 8H0C3.9749 8 7 0 10 0Z",
    fill: "currentColor"
  })));
};
//# sourceMappingURL=PopperArrow.js.map