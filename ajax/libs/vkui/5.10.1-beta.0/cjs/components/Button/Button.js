"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Button", {
    enumerable: true,
    get: function() {
        return Button;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _Spinner = require("../Spinner/Spinner");
var _Tappable = require("../Tappable/Tappable");
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
var sizeYClassNames = _define_property._({
    none: "vkuiButton--sizeY-none"
}, _adaptivity.SizeType.REGULAR, "vkuiButton--sizeY-regular");
var Button = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_stretched = _param.stretched, stretched = _param_stretched === void 0 ? false : _param_stretched, _param_align = _param.align, align = _param_align === void 0 ? "center" : _param_align, children = _param.children, before = _param.before, after = _param.after, getRootRef = _param.getRootRef, loading = _param.loading, onClick = _param.onClick, _param_stopPropagation = _param.stopPropagation, stopPropagation = _param_stopPropagation === void 0 ? true : _param_stopPropagation, className = _param.className, disableSpinnerAnimation = _param.disableSpinnerAnimation, rounded = _param.rounded, restProps = _object_without_properties._(_param, [
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
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        hoverMode: "vkuiButton--hover",
        activeMode: "vkuiButton--active",
        Component: restProps.href ? "a" : "button",
        focusVisibleMode: "outside"
    }, restProps), {
        onClick: loading ? undefined : onClick,
        stopPropagation: stopPropagation,
        className: (0, _vkjs.classNames)(className, "vkuiButton", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== _adaptivity.SizeType.COMPACT && sizeYClassNames[sizeY], platform === _platform.Platform.IOS && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading", rounded && "vkuiButton--rounded"),
        getRootRef: getRootRef
    }), loading && /*#__PURE__*/ _react.createElement(_Spinner.Spinner, {
        size: "small",
        className: "vkuiButton__spinner",
        disableAnimation: disableSpinnerAnimation
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__in"
    }, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__before",
        role: "presentation",
        "data-testid": process.env.NODE_ENV === "test" ? "before" : undefined
    }, before), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__content",
        "data-testid": process.env.NODE_ENV === "test" ? "children" : undefined
    }, children), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__after",
        role: "presentation",
        "data-testid": process.env.NODE_ENV === "test" ? "after" : undefined
    }, after)));
};

//# sourceMappingURL=Button.js.map