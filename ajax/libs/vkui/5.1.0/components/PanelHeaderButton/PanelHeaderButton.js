import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "primary", "label", "className"];
import * as React from 'react';
import { Tappable } from '../Tappable/Tappable';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { classNames, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import { usePlatform } from '../../hooks/usePlatform';
import { getTitleFromChildren } from '../../lib/utils';
import { Platform } from '../../lib/platform';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
var ButtonTypography = function ButtonTypography(_ref) {
  var primary = _ref.primary,
    children = _ref.children;
  var platform = usePlatform();
  if (platform === Platform.IOS) {
    return /*#__PURE__*/React.createElement(Title, {
      Component: "span",
      level: "3",
      weight: primary ? '1' : '3'
    }, children);
  }
  return /*#__PURE__*/React.createElement(Text, {
    weight: platform === Platform.VKCOM ? undefined : '2'
  }, children);
};
var warn = warnOnce('PanelHeaderButton');

/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */
export var PanelHeaderButton = function PanelHeaderButton(_ref2) {
  var children = _ref2.children,
    _ref2$primary = _ref2.primary,
    primary = _ref2$primary === void 0 ? false : _ref2$primary,
    label = _ref2.label,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var isPrimitive = isPrimitiveReactNode(children);
  var isPrimitiveLabel = isPrimitiveReactNode(label);
  var platform = usePlatform();
  var hoverMode;
  var activeMode;
  switch (platform) {
    case Platform.IOS:
      hoverMode = 'background';
      activeMode = 'opacity';
      break;
    case Platform.VKCOM:
      hoverMode = "vkuiPanelHeaderButton--hover";
      activeMode = "vkuiPanelHeaderButton--active";
      break;
    default:
      hoverMode = 'background';
      activeMode = 'background';
  }
  if (process.env.NODE_ENV === 'development') {
    var hasAccessibleName = Boolean(getTitleFromChildren(children) || getTitleFromChildren(label) || restProps['aria-label'] || restProps['aria-labelledby']);
    if (!hasAccessibleName) {
      warn('a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.', 'error');
    }
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    hoverMode: hoverMode,
    Component: restProps.href ? 'a' : 'button',
    activeEffectDelay: 200,
    activeMode: activeMode,
    className: classNames("vkuiPanelHeaderButton", getPlatformClassName("vkuiPanelHeaderButton", platform), isPrimitive && "vkuiPanelHeaderButton--primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton--notPrimitive", className)
  }), isPrimitive ? /*#__PURE__*/React.createElement(ButtonTypography, {
    primary: primary
  }, children) : children, isPrimitiveLabel ? /*#__PURE__*/React.createElement(ButtonTypography, {
    primary: primary,
    className: "vkuiPanelHeaderButton__label"
  }, label) : label);
};
//# sourceMappingURL=PanelHeaderButton.js.map