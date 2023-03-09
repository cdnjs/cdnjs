import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import "./RichCellIcon.module.css";
export var RichCellIcon = function RichCellIcon(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiRichCellIcon", className)
  }), children);
};
//# sourceMappingURL=RichCellIcon.js.map