"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBadge = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ImageBase = require("../../ImageBase/ImageBase");
var _excluded = ["className"];
var ImageBadge = function ImageBadge(_ref) {
  var className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useContext = React.useContext(_ImageBase.ImageBaseContext),
    size = _React$useContext.size;
  return /*#__PURE__*/React.createElement(_ImageBase.ImageBase.Badge, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiImageBadge", size < 96 && "vkuiImageBadge--shifted", className)
  }));
};
exports.ImageBadge = ImageBadge;
//# sourceMappingURL=ImageBadge.js.map