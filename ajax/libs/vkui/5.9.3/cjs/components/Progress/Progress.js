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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _math = require("../../helpers/math");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesAppearance = {
    accent: "vkuiProgress--appearance-accent",
    positive: "vkuiProgress--appearance-positive",
    negative: "vkuiProgress--appearance-negative"
};
function progressCustomHeightStyle(height) {
    return height ? {
        height: height,
        borderRadius: height / 2
    } : undefined;
}
function progressStyle(height, styleProps) {
    var styleHeight = progressCustomHeightStyle(height);
    var style = styleHeight ? _object_spread._({}, styleProps, styleHeight) : styleProps;
    return style;
}
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;
var Progress = function(_param) {
    var _param_value = _param.value, value = _param_value === void 0 ? 0 : _param_value, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, height = _param.height, styleProps = _param.style, restProps = _object_without_properties._(_param, [
        "value",
        "appearance",
        "height",
        "style"
    ]);
    var progress = (0, _math.clamp)(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    var title = "".concat(progress, " / ").concat(PROGRESS_MAX_VALUE);
    var style = progressStyle(height, styleProps);
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
            width: "".concat(progress, "%")
        }
    }));
};

//# sourceMappingURL=Progress.js.map