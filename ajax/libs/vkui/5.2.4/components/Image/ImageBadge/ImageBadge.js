import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
export var ImageBadge = function ImageBadge(_ref) {
  var className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ImageBaseContext),
    size = _React$useContext.size;
  return /*#__PURE__*/React.createElement(ImageBase.Badge, _extends({}, restProps, {
    className: classNames("vkuiImageBadge", size < 96 && "vkuiImageBadge--shifted", className)
  }));
};
//# sourceMappingURL=ImageBadge.js.map