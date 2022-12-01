import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["opened", "className"];
import * as React from "react";
import { Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp, Icon20ChevronUp } from "@vkontakte/icons";
import { classNamesString } from "../../lib/classNames";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
import "./DropdownIcon.module.css";
export var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
    opened = _ref$opened === void 0 ? false : _ref$opened,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivityConditi = useAdaptivityConditionalRender(),
    sizeY = _useAdaptivityConditi.sizeY;
  var IconCompact = opened ? Icon20ChevronUp : Icon20Dropdown;
  var IconRegular = opened ? Icon24ChevronUp : Icon24ChevronDown;
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/React.createElement(IconCompact, _extends({
    className: classNamesString("vkuiDropdownIcon", sizeY.compact.className, className),
    "aria-hidden": true
  }, restProps)), sizeY.regular && /*#__PURE__*/React.createElement(IconRegular, _extends({
    className: classNamesString("vkuiDropdownIcon", sizeY.regular.className, className),
    "aria-hidden": true
  }, restProps)));
};
//# sourceMappingURL=DropdownIcon.js.map