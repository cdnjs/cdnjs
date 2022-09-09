"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = exports.IMAGE_DEFAULT_SIZE = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _ImageBase = require("../ImageBase/ImageBase");

var _excluded = ["size", "badge", "borderRadius", "style", "className"];
var styles = {
  "Image": "vkuiImage",
  "Image__badge": "vkuiImage__badge",
  "Image__badge--shifted": "vkuiImage__badge--shifted"
};
var IMAGE_DEFAULT_SIZE = 48;
exports.IMAGE_DEFAULT_SIZE = IMAGE_DEFAULT_SIZE;

/**
 * @see https://vkcom.github.io/VKUI/#/Image
 */
var Image = function Image(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? IMAGE_DEFAULT_SIZE : _ref$size,
      badgeProp = _ref.badge,
      _ref$borderRadius = _ref.borderRadius,
      borderRadiusProp = _ref$borderRadius === void 0 ? "m" : _ref$borderRadius,
      style = _ref.style,
      className = _ref.className,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var badge = badgeProp ? (0, _objectSpread2.default)((0, _objectSpread2.default)({}, typeof badgeProp === "function" ? {
    Icon: badgeProp
  } : badgeProp), {}, {
    className: (0, _classNames.classNamesString)(styles["Image__badge"], size < 96 && styles["Image__badge--shifted"])
  }) : undefined;
  var borderRadius;

  switch (borderRadiusProp) {
    case "s":
      {
        if (size <= 32) {
          borderRadius = 2;
        } else if (size <= 56) {
          borderRadius = 3;
        }

        borderRadius = 4;
        break;
      }

    case "m":
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

    case "l":
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

  return (0, _jsxRuntime.createScopedElement)(_ImageBase.ImageBase, (0, _extends2.default)({}, restProps, {
    size: size,
    badge: badge,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      borderRadius: borderRadius
    }),
    className: (0, _classNames.classNamesString)(styles["Image"], className)
  }));
};

exports.Image = Image;
//# sourceMappingURL=Image.js.map