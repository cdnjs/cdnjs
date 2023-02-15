"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _Tappable = require("../Tappable/Tappable");
var _Spinner = require("../Spinner/Spinner");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "Component", "loading", "onClick", "stopPropagation", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */
var Button = function Button(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'primary' : _ref$mode,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'accent' : _ref$appearance,
    _ref$stretched = _ref.stretched,
    stretched = _ref$stretched === void 0 ? false : _ref$stretched,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'center' : _ref$align,
    children = _ref.children,
    before = _ref.before,
    after = _ref.after,
    getRootRef = _ref.getRootRef,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'button' : _ref$Component,
    loading = _ref.loading,
    onClick = _ref.onClick,
    _ref$stopPropagation = _ref.stopPropagation,
    stopPropagation = _ref$stopPropagation === void 0 ? true : _ref$stopPropagation,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var hasIcons = Boolean(before || after);
  var hasIconOnly = !children && Boolean(after) !== Boolean(before);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  var platform = (0, _usePlatform.usePlatform)();
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    hoverMode: "vkuiButton--hover",
    activeMode: "vkuiButton--active"
  }, restProps, {
    Component: restProps.href ? 'a' : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    stopPropagation: stopPropagation,
    className: (0, _vkjs.classNames)(className, "vkuiButton", styles["Button--size-".concat(size)], styles["Button--mode-".concat(mode)], styles["Button--appearance-".concat(appearance)], styles["Button--align-".concat(align)], (0, _getSizeYClassName.getSizeYClassName)("vkuiButton", sizeY), platform === _platform.Platform.ANDROID && "vkuiButton--android", platform === _platform.Platform.IOS && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading"),
    getRootRef: getRootRef
  }), loading && /*#__PURE__*/React.createElement(_Spinner.Spinner, {
    size: "small",
    className: "vkuiButton__spinner"
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__in"
  }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__before",
    role: "presentation",
    "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined
  }, before), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__content",
    "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined
  }, children), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__after",
    role: "presentation",
    "data-testid": process.env.NODE_ENV === 'test' ? 'after' : undefined
  }, after)));
};
exports.Button = Button;
var styles = {
  "Button--size-s": "vkuiButton--size-s",
  "Button--size-m": "vkuiButton--size-m",
  "Button--size-l": "vkuiButton--size-l",
  "Button--mode-primary": "vkuiButton--mode-primary",
  "Button--mode-secondary": "vkuiButton--mode-secondary",
  "Button--mode-tertiary": "vkuiButton--mode-tertiary",
  "Button--mode-outline": "vkuiButton--mode-outline",
  "Button--mode-link": "vkuiButton--mode-link",
  "Button--appearance-overlay": "vkuiButton--appearance-overlay",
  "Button--appearance-negative": "vkuiButton--appearance-negative",
  "Button--appearance-positive": "vkuiButton--appearance-positive",
  "Button--appearance-accent": "vkuiButton--appearance-accent",
  "Button--appearance-neutral": "vkuiButton--appearance-neutral",
  "Button--appearance-accent-invariable": "vkuiButton--appearance-accent-invariable",
  "Button--align-left": "vkuiButton--align-left",
  "Button--align-center": "vkuiButton--align-center",
  "Button--align-right": "vkuiButton--align-right"
};
//# sourceMappingURL=Button.js.map