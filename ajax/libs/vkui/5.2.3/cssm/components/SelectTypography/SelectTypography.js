import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["selectType", "children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import "./SelectTypography.module.css";
var sizeYClassNames = {
  none: "vkuiSelectTypography--sizeY-none",
  compact: "vkuiSelectTypography--sizeY-compact"
};
var platformClassNames = {
  vkcom: "vkuiSelectTypography--vkcom",
  android: "vkuiSelectTypography--android"
};
var selectTypeClassNames = {
  default: "vkuiSelectTypography--selectType-default",
  plain: "vkuiSelectTypography--selectType-plain",
  accent: "vkuiSelectTypography--selectType-accent"
};
/**
 * @private
 */
export var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classNames("vkuiSelectTypography", platformClassNames[platform], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], selectTypeClassNames[selectType], className)
  }, restProps), children);
};
//# sourceMappingURL=SelectTypography.js.map