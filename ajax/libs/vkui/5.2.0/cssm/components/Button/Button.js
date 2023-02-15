import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "Component", "loading", "onClick", "stopPropagation", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { Tappable } from '../Tappable/Tappable';
import { Spinner } from '../Spinner/Spinner';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import "./Button.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */
export var Button = function Button(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var hasIcons = Boolean(before || after);
  var hasIconOnly = !children && Boolean(after) !== Boolean(before);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var platform = usePlatform();
  return /*#__PURE__*/React.createElement(Tappable, _extends({
    hoverMode: "vkuiButton--hover",
    activeMode: "vkuiButton--active"
  }, restProps, {
    Component: restProps.href ? 'a' : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    stopPropagation: stopPropagation,
    className: classNames(className, "vkuiButton", styles["Button--size-".concat(size)], styles["Button--mode-".concat(mode)], styles["Button--appearance-".concat(appearance)], styles["Button--align-".concat(align)], getSizeYClassName("vkuiButton", sizeY), platform === Platform.ANDROID && "vkuiButton--android", platform === Platform.IOS && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading"),
    getRootRef: getRootRef
  }), loading && /*#__PURE__*/React.createElement(Spinner, {
    size: "small",
    className: "vkuiButton__spinner"
  }), /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__in"
  }, hasReactNode(before) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__before",
    role: "presentation",
    "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined
  }, before), hasReactNode(children) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__content",
    "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined
  }, children), hasReactNode(after) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiButton__after",
    role: "presentation",
    "data-testid": process.env.NODE_ENV === 'test' ? 'after' : undefined
  }, after)));
};
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