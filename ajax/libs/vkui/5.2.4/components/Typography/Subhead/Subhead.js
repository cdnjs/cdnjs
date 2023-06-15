import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["className", "children", "weight", "Component"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
var sizeYClassNames = _defineProperty({
  none: "vkuiSubhead--sizeY-none"
}, SizeType.COMPACT, "vkuiSubhead--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */
export var Subhead = function Subhead(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'h5' : _ref$Component,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    className: classNames(className, "vkuiSubhead", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], weight && styles["Subhead--weight-".concat(weight)])
  }), children);
};
var styles = {
  "Subhead--weight-1": "vkuiSubhead--weight-1",
  "Subhead--weight-2": "vkuiSubhead--weight-2",
  "Subhead--weight-3": "vkuiSubhead--weight-3"
};
//# sourceMappingURL=Subhead.js.map