import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "theme", "visibility", "children", "onClick"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAppearance } from '../../../hooks/useAppearance';
import { useAdaptivityHasPointer } from '../../../hooks/useAdaptivityHasPointer';
import { Tappable } from '../../Tappable/Tappable';
import { ImageBaseContext } from '../context';
import { validateOverlayIcon } from '../validators';
import "./ImageBaseOverlay.module.css";
/**
 * Интерактивный оверлей над картинкой.
 */
export var ImageBaseOverlay = function ImageBaseOverlay(_ref) {
  var className = _ref.className,
    themeProp = _ref.theme,
    visibilityProp = _ref.visibility,
    children = _ref.children,
    onClick = _ref.onClick,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var appearance = useAppearance();
  var hasPointer = useAdaptivityHasPointer();
  var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
  var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
  if (process.env.NODE_ENV === 'development') {
    if (children) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var _React$useContext = React.useContext(ImageBaseContext),
        size = _React$useContext.size;
      validateOverlayIcon(size, {
        name: 'children',
        value: children
      });
    }
  }
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    type: "button",
    Component: "button",
    className: classNames("vkuiImageBaseOverlay", visibility === 'always' && "vkuiImageBaseOverlay--visible", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className),
    hasHover: visibility === 'on-hover',
    hoverMode: visibility === 'on-hover' ? "vkuiImageBaseOverlay--visible" : undefined,
    focusVisibleMode: "vkuiImageBaseOverlay--focus-visible",
    hasActive: false,
    onClick: onClick
  }), children);
};
//# sourceMappingURL=ImageBaseOverlay.js.map