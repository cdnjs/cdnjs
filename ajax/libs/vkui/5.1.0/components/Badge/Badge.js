import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */
export var Badge = function Badge(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'new' : _ref$mode,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classNames("vkuiBadge", styles["Badge--mode-".concat(mode)], className)
  }, restProps));
};
var styles = {
  "Badge--mode-new": "vkuiBadge--mode-new",
  "Badge--mode-prominent": "vkuiBadge--mode-prominent"
};
//# sourceMappingURL=Badge.js.map