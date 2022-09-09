import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "Component", "loading", "onClick", "stopPropagation", "className"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import { Tappable } from "../Tappable/Tappable";
import { Spinner } from "../Spinner/Spinner";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
var styles = {
  "Button": "vkuiButton",
  "Button--loading": "vkuiButton--loading",
  "Button--singleIcon": "vkuiButton--singleIcon",
  "Button--sizeY-regular": "vkuiButton--sizeY-regular",
  "Button--sizeY-none": "vkuiButton--sizeY-none",
  "Button--stretched": "vkuiButton--stretched",
  "Button__in": "vkuiButton__in",
  "Button--align-left": "vkuiButton--align-left",
  "Button--align-center": "vkuiButton--align-center",
  "Button--align-right": "vkuiButton--align-right",
  "Button--mode-primary": "vkuiButton--mode-primary",
  "Button--appearance-overlay": "vkuiButton--appearance-overlay",
  "Button--appearance-negative": "vkuiButton--appearance-negative",
  "Button--appearance-positive": "vkuiButton--appearance-positive",
  "Button--mode-secondary": "vkuiButton--mode-secondary",
  "Button--mode-tertiary": "vkuiButton--mode-tertiary",
  "Button--mode-outline": "vkuiButton--mode-outline",
  "Button--with-icon": "vkuiButton--with-icon",
  "Button__content": "vkuiButton__content",
  "Button--size-s": "vkuiButton--size-s",
  "Button__after": "vkuiButton__after",
  "Button--size-m": "vkuiButton--size-m",
  "Button--size-l": "vkuiButton--size-l",
  "Button__before": "vkuiButton__before",
  "Button__spinner": "vkuiButton__spinner",
  "Button--appearance-accent": "vkuiButton--appearance-accent",
  "Button--hover": "vkuiButton--hover",
  "Button--active": "vkuiButton--active",
  "Button--appearance-neutral": "vkuiButton--appearance-neutral",
  "Button--android": "vkuiButton--android",
  "Button--ios": "vkuiButton--ios",
  "Button--sizeY-compact": "vkuiButton--sizeY-compact"
};

/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */
export var Button = function Button(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "primary" : _ref$mode,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? "accent" : _ref$appearance,
      _ref$stretched = _ref.stretched,
      stretched = _ref$stretched === void 0 ? false : _ref$stretched,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? "center" : _ref$align,
      children = _ref.children,
      before = _ref.before,
      after = _ref.after,
      getRootRef = _ref.getRootRef,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "button" : _ref$Component,
      loading = _ref.loading,
      onClick = _ref.onClick,
      _ref$stopPropagation = _ref.stopPropagation,
      stopPropagation = _ref$stopPropagation === void 0 ? true : _ref$stopPropagation,
      className = _ref.className,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var hasIcons = Boolean(before || after);
  var hasIconOnly = !children && Boolean(after) !== Boolean(before);
  var hasNewTokens = React.useContext(ConfigProviderContext).hasNewTokens;

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({
    hoverMode: hasNewTokens ? styles["Button--hover"] : "background",
    activeMode: hasNewTokens ? styles["Button--active"] : "opacity"
  }, restProps, {
    Component: restProps.href ? "a" : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    stopPropagation: stopPropagation,
    className: classNamesString(className, styles.Button, styles["Button--size-".concat(size)], styles["Button--mode-".concat(mode)], styles["Button--appearance-".concat(appearance)], styles["Button--align-".concat(align)], getSizeYClassName("Button", sizeY, styles), platform === Platform.ANDROID && styles["Button--android"], platform === Platform.IOS && styles["Button--ios"], stretched && styles["Button--stretched"], hasIcons && styles["Button--with-icon"], hasIconOnly && styles["Button--singleIcon"], loading && styles["Button--loading"]),
    getRootRef: getRootRef
  }), loading && createScopedElement(Spinner, {
    size: "small",
    className: styles.Button__spinner
  }), createScopedElement("span", {
    className: styles.Button__in
  }, before && createScopedElement("span", {
    className: styles.Button__before,
    role: "presentation"
  }, before), children && createScopedElement("span", {
    className: styles.Button__content
  }, children), after && createScopedElement("span", {
    className: styles.Button__after,
    role: "presentation"
  }, after)));
};
//# sourceMappingURL=Button.js.map