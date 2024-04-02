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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _Spinner = require("../Spinner/Spinner");
const _Tappable = require("../Tappable/Tappable");
const stylesSize = {
    s: "vkuiButton--size-s",
    m: "vkuiButton--size-m",
    l: "vkuiButton--size-l"
};
const stylesMode = {
    primary: "vkuiButton--mode-primary",
    secondary: "vkuiButton--mode-secondary",
    tertiary: "vkuiButton--mode-tertiary",
    outline: "vkuiButton--mode-outline",
    link: "vkuiButton--mode-link"
};
const stylesAppearance = {
    'accent': "vkuiButton--appearance-accent",
    'positive': "vkuiButton--appearance-positive",
    'negative': "vkuiButton--appearance-negative",
    'neutral': "vkuiButton--appearance-neutral",
    'overlay': "vkuiButton--appearance-overlay",
    'accent-invariable': "vkuiButton--appearance-accent-invariable"
};
const stylesAlign = {
    left: "vkuiButton--align-left",
    center: "vkuiButton--align-center",
    right: "vkuiButton--align-right"
};
const sizeYClassNames = {
    none: "vkuiButton--sizeY-none",
    ['regular']: "vkuiButton--sizeY-regular"
};
const Button = (_param)=>{
    var { size = 's', mode = 'primary', appearance = 'accent', stretched = false, align = 'center', children, before, after, getRootRef, loading, onClick = _vkjs.noop, className, disableSpinnerAnimation, rounded } = _param, restProps = _object_without_properties._(_param, [
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
        "className",
        "disableSpinnerAnimation",
        "rounded"
    ]);
    const hasIcons = Boolean(before || after);
    const hasIconOnly = !children && Boolean(after) !== Boolean(before);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        hoverMode: "vkuiButton--hover",
        activeMode: "vkuiButton--active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside"
    }, restProps), {
        onClick: loading ? undefined : onClick,
        className: (0, _vkjs.classNames)(className, "vkuiButton", stylesSize[size], stylesMode[mode], stylesAppearance[appearance], stylesAlign[align], sizeY !== 'compact' && sizeYClassNames[sizeY], platform === 'ios' && "vkuiButton--ios", stretched && "vkuiButton--stretched", hasIcons && "vkuiButton--with-icon", hasIconOnly && !stretched && "vkuiButton--singleIcon", loading && "vkuiButton--loading", rounded && "vkuiButton--rounded"),
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
        "data-testid": process.env.NODE_ENV === 'test' ? 'before' : undefined
    }, before), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__content",
        "data-testid": process.env.NODE_ENV === 'test' ? 'children' : undefined
    }, children), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiButton__after",
        role: "presentation",
        "data-testid": process.env.NODE_ENV === 'test' ? 'after' : undefined
    }, after)));
};

//# sourceMappingURL=Button.js.map