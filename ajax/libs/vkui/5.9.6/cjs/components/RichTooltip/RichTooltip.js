"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichTooltip", {
    enumerable: true,
    get: function() {
        return RichTooltip;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _HoverPopper = require("../HoverPopper/HoverPopper");
var stylesAppearance = {
    accent: "vkuiRichTooltip--appearance-accent",
    white: "vkuiRichTooltip--appearance-white",
    black: "vkuiRichTooltip--appearance-black",
    inversion: "vkuiRichTooltip--appearance-inversion"
};
var RichTooltip = function(_param) {
    var children = _param.children, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _object_without_properties._(_param, [
        "children",
        "arrow",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_HoverPopper.HoverPopper, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiRichTooltip", appearance !== "neutral" && stylesAppearance[appearance], className),
        arrow: arrow,
        arrowClassName: "vkuiRichTooltip__arrow"
    }, popperProps), children);
};

//# sourceMappingURL=RichTooltip.js.map