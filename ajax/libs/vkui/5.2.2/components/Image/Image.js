import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "borderRadius", "style", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ImageBase } from '../ImageBase/ImageBase';
import { ImageBadge } from './ImageBadge/ImageBadge';
export var IMAGE_DEFAULT_SIZE = 48;
/**
 * @see https://vkcom.github.io/VKUI/#/Image
 */
export var Image = function Image(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? IMAGE_DEFAULT_SIZE : _ref$size,
    _ref$borderRadius = _ref.borderRadius,
    borderRadiusProp = _ref$borderRadius === void 0 ? 'm' : _ref$borderRadius,
    style = _ref.style,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var borderRadius;
  switch (borderRadiusProp) {
    case 's':
      {
        if (size <= 32) {
          borderRadius = 2;
        } else if (size <= 56) {
          borderRadius = 3;
        }
        borderRadius = 4;
        break;
      }
    case 'm':
      {
        if (size <= 32) {
          borderRadius = 3;
        } else if (size <= 48) {
          borderRadius = 4;
        } else if (size <= 72) {
          borderRadius = 6;
        } else if (size <= 80) {
          borderRadius = 8;
        }
        borderRadius = 10;
        break;
      }
    case 'l':
      {
        if (size <= 16) {
          borderRadius = 4;
        } else if (size <= 20) {
          borderRadius = 5;
        } else if (size <= 32) {
          borderRadius = 6;
        } else if (size <= 40) {
          borderRadius = 8;
        } else if (size <= 48) {
          borderRadius = 10;
        } else if (size <= 56) {
          borderRadius = 12;
        } else if (size <= 64) {
          borderRadius = 14;
        }
        borderRadius = 16;
      }
  }
  return /*#__PURE__*/React.createElement(ImageBase, _extends({}, restProps, {
    size: size,
    style: _objectSpread(_objectSpread({}, style), {}, {
      borderRadius: borderRadius
    }),
    className: classNames("vkuiImage", className)
  }));
};
Image.Badge = ImageBadge;
Image.Overlay = ImageBase.Overlay;
//# sourceMappingURL=Image.js.map