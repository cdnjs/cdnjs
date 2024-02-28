import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { Spinner } from "../Spinner/Spinner";
import { Tappable } from "../Tappable/Tappable";
var stylesSize = {
    s: "vkuiButton--size-s",
    m: "vkuiButton--size-m",
    l: "vkuiButton--size-l"
};
var stylesMode = {
    primary: "vkuiButton--mode-primary",
    secondary: "vkuiButton--mode-secondary",
    tertiary: "vkuiButton--mode-tertiary",
    outline: "vkuiButton--mode-outline",
    link: "vkuiButton--mode-link"
};
var stylesAppearance = {
    "accent": "vkuiButton--appearance-accent",
    "positive": "vkuiButton--appearance-positive",
    "negative": "vkuiButton--appearance-negative",
    "neutral": "vkuiButton--appearance-neutral",
    "overlay": "vkuiButton--appearance-overlay",
    "accent-invariable": "vkuiButton--appearance-accent-invariable"
};
var stylesAlign = {
    left: "vkuiButton--align-left",
    center: "vkuiButton--align-center",
    right: "vkuiButton--align-right"
};
var sizeYClassNames = _define_property({
    none: "vkuiButton--sizeY-none"
}, SizeType.REGULAR, "vkuiButton--sizeY-regular");
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */ export var Button = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_stretched = _param.stretched, stretched = _param_stretched === void 0 ? false : _param_stretched, _param_align = _param.align, align = _param_align === void 0 ? "center" : _param_align, children = _param.children, before = _param.before, after = _param.after, getRootRef = _param.getRootRef, loading = _param.loading, onClick = _param.onClick, _param_stopPropagation = _param.stopPropagation, stopPropagation = _param_stopPropagation === void 0 ? true : _param_stopPropagation, className = _param.className, disableSpinnerAnimation = _param.disableSpinnerAnimation, rounded = _param.rounded, restProps = _object_without_properties(_param, [
        "size",
        "mode",
        "appearance",
        "stretched",
        "align",
        "children",
        "before",
        "after",
        "getRootRef",
        "loading",
        "onClick",
        "stopPropagation",
        "className",
        "disableSpinnerAnimation",
        "rounded"
    ]);
    var hasIcons = Boolean(before || after);
    var hasIconOnly = !children && Boolean(after) !== Boolean(before);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        hoverMode: "vkuiButton--hover",
        activeMode: "vkuiButton--active",
        Component: restProps.href ? "a" : "button",
        focusVisibleMode: "outside"
    }, restProps), {
        onClick: loading ? undefined : onClick,
        stopPropagation: stopPropagation,
        className: classNames(className, "vkuiButton", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], platform === Platform.IOS && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading", rounded && "vkuiButton--rounded"),
        getRootRef: getRootRef
    }), loading && /*#__PURE__*/ React.createElement(Spinner, {
        size: "small",
        className: "vkuiButton__spinner",
        disableAnimation: disableSpinnerAnimation
    }), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiButton__in"
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiButton__before",
        role: "presentation",
        "data-testid": process.env.NODE_ENV === "test" ? "before" : undefined
    }, before), hasReactNode(children) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiButton__content",
        "data-testid": process.env.NODE_ENV === "test" ? "children" : undefined
    }, children), hasReactNode(after) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiButton__after",
        role: "presentation",
        "data-testid": process.env.NODE_ENV === "test" ? "after" : undefined
    }, after)));
};

//# sourceMappingURL=Button.js.map