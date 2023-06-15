import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["fixed"];
import * as React from 'react';
export var tooltipContainerAttr = 'data-tooltip-container';
export var TooltipContainer = /*#__PURE__*/React.forwardRef(function TooltipContainer(_ref, ref) {
  var _ref$fixed = _ref.fixed,
    fixed = _ref$fixed === void 0 ? false : _ref$fixed,
    props = _objectWithoutProperties(_ref, _excluded);
  props[tooltipContainerAttr] = fixed ? 'fixed' : 'true';
  return /*#__PURE__*/React.createElement("div", _extends({}, props, {
    ref: ref
  }));
});
//# sourceMappingURL=TooltipContainer.js.map