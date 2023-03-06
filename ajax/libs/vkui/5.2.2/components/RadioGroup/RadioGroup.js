import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */
export var RadioGroup = function RadioGroup(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("vkuiRadioGroup", styles["RadioGroup--mode-".concat(mode)], className)
  }, restProps), children);
};
var styles = {
  "RadioGroup--mode-horizontal": "vkuiRadioGroup--mode-horizontal",
  "RadioGroup--mode-vertical": "vkuiRadioGroup--mode-vertical"
};
//# sourceMappingURL=RadioGroup.js.map