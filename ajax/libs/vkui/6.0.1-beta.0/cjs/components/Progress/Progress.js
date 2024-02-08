"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Progress", {
    enumerable: true,
    get: function() {
        return Progress;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesAppearance = {
    accent: "vkuiProgress--appearance-accent",
    positive: "vkuiProgress--appearance-positive",
    negative: "vkuiProgress--appearance-negative"
};
function progressCustomHeightStyle(height) {
    return height ? {
        height,
        borderRadius: height / 2
    } : undefined;
}
function progressStyle(height, styleProps) {
    const styleHeight = progressCustomHeightStyle(height);
    const style = styleHeight ? _object_spread._({}, styleProps, styleHeight) : styleProps;
    return style;
}
const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
const Progress = (_param)=>{
    var { value = 0, appearance = 'accent', height, style: styleProps } = _param, restProps = _object_without_properties._(_param, [
        "value",
        "appearance",
        "height",
        "style"
    ]);
    const progress = (0, _math.clamp)(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    const title = `${progress} / ${PROGRESS_MAX_VALUE}`;
    const style = progressStyle(height, styleProps);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        "aria-valuenow": value,
        title: title,
        style: style
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        baseClassName: (0, _vkjs.classNames)("vkuiProgress", stylesAppearance[appearance])
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiProgress__in",
        style: {
            width: `${progress}%`
        }
    }));
};

//# sourceMappingURL=Progress.js.map