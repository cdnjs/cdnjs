import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["background", "children", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBaseContext } from '../context';
import { validateBadgeIcon } from '../validators';
import "./ImageBaseBadge.module.css";
var backgroundStyles = {
  stroke: "vkuiImageBaseBadge--background-stroke",
  shadow: "vkuiImageBaseBadge--background-shadow"
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */
export var ImageBaseBadge = function ImageBaseBadge(_ref) {
  var _ref$background = _ref.background,
    background = _ref$background === void 0 ? 'shadow' : _ref$background,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === 'development') {
    if (children) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var _React$useContext = React.useContext(ImageBaseContext),
        size = _React$useContext.size;
      validateBadgeIcon(size, {
        name: 'children',
        value: children
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiImageBaseBadge", backgroundStyles[background], className)
  }), children);
};
//# sourceMappingURL=ImageBaseBadge.js.map