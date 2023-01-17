"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBaseBadge = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _context = require("../context");
var _validators = require("../validators");
var _excluded = ["background", "children", "className"];
var backgroundStyles = {
  stroke: "vkuiImageBaseBadge--background-stroke",
  shadow: "vkuiImageBaseBadge--background-shadow"
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */
var ImageBaseBadge = function ImageBaseBadge(_ref) {
  var _ref$background = _ref.background,
    background = _ref$background === void 0 ? 'shadow' : _ref$background,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (process.env.NODE_ENV === 'development') {
    if (children) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var _React$useContext = React.useContext(_context.ImageBaseContext),
        size = _React$useContext.size;
      (0, _validators.validateBadgeIcon)(size, {
        name: 'children',
        value: children
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background], className)
  }), children);
};
exports.ImageBaseBadge = ImageBaseBadge;
//# sourceMappingURL=ImageBaseBadge.js.map