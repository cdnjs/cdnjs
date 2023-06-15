import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import "./IconButton.module.css";
var sizeYClassNames = _defineProperty({
  none: "vkuiIconButton--sizeY-none"
}, SizeType.COMPACT, "vkuiIconButton--sizeY-compact");
var warn = warnOnce('IconButton');

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
export var IconButton = function IconButton(_ref) {
  var children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  if (process.env.NODE_ENV === 'development') {
    var isAccessible = restProps['aria-label'] || restProps['aria-labelledby'];
    if (!isAccessible) {
      warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
    }
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    activeEffectDelay: 200,
    activeMode: "background",
    Component: restProps.href ? 'a' : 'button'
  }, restProps, {
    className: classNames("vkuiIconButton", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], platform === Platform.IOS && "vkuiIconButton--ios", className)
  }), children);
};
//# sourceMappingURL=IconButton.js.map