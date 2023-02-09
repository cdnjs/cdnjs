"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBaseOverlay = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAppearance = require("../../../hooks/useAppearance");
var _useAdaptivityHasPointer = require("../../../hooks/useAdaptivityHasPointer");
var _Tappable = require("../../Tappable/Tappable");
var _context = require("../context");
var _validators = require("../validators");
var _excluded = ["className", "theme", "visibility", "children", "onClick"];
/**
 * Интерактивный оверлей над картинкой.
 */
var ImageBaseOverlay = function ImageBaseOverlay(_ref) {
  var className = _ref.className,
    themeProp = _ref.theme,
    visibilityProp = _ref.visibility,
    children = _ref.children,
    onClick = _ref.onClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var appearance = (0, _useAppearance.useAppearance)();
  var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
  var theme = themeProp !== null && themeProp !== void 0 ? themeProp : appearance;
  var visibility = visibilityProp !== null && visibilityProp !== void 0 ? visibilityProp : hasPointer ? 'on-hover' : 'always';
  if (process.env.NODE_ENV === 'development') {
    if (children) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      var _React$useContext = React.useContext(_context.ImageBaseContext),
        size = _React$useContext.size;
      (0, _validators.validateOverlayIcon)(size, {
        name: 'children',
        value: children
      });
    }
  }
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    type: "button",
    Component: "button",
    className: (0, _vkjs.classNames)("vkuiImageBaseOverlay", visibility === 'always' && "vkuiImageBaseOverlay--visible", theme === 'light' && "vkuiImageBaseOverlay--theme-light", theme === 'dark' && "vkuiImageBaseOverlay--theme-dark", className),
    hasHover: visibility === 'on-hover',
    hoverMode: visibility === 'on-hover' ? "vkuiImageBaseOverlay--visible" : undefined,
    focusVisibleMode: "vkuiImageBaseOverlay--focus-visible",
    hasActive: false,
    onClick: onClick
  }), children);
};
exports.ImageBaseOverlay = ImageBaseOverlay;
//# sourceMappingURL=ImageBaseOverlay.js.map