import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "Component", "className"];
import * as React from 'react';
import { Tappable } from '../Tappable/Tappable';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
export var IconButton = function IconButton(_ref) {
  var children = _ref.children,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'button' : _ref$Component,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    activeEffectDelay: 200,
    activeMode: "background"
  }, restProps, {
    Component: restProps.href ? 'a' : Component,
    className: classNames("vkuiIconButton", getSizeYClassName("vkuiIconButton", sizeY), platform === Platform.IOS && "vkuiIconButton--ios", className)
  }), children);
};
//# sourceMappingURL=IconButton.js.map