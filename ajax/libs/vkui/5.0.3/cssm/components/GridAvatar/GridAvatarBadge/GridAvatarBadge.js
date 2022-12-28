import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className"];
import * as React from "react";
import { classNamesString } from "../../../lib/classNames";
import { ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase";
import "./GridAvatarBadge.module.css";
export var GridAvatarBadge = function GridAvatarBadge(_ref) {
  var className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ImageBaseContext),
    size = _React$useContext.size;
  return /*#__PURE__*/React.createElement(ImageBase.Badge, _extends({}, restProps, {
    className: classNamesString("vkuiGridAvatarBadge", size < 96 && "vkuiGridAvatarBadge--shifted", className)
  }));
};
//# sourceMappingURL=GridAvatarBadge.js.map