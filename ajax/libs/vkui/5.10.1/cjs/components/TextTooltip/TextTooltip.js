"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TextTooltip", {
    enumerable: true,
    get: function() {
        return TextTooltip;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _HoverPopper = require("../HoverPopper/HoverPopper");
var _Subhead = require("../Typography/Subhead/Subhead");
var stylesAppearance = {
    accent: "vkuiTextTooltip--appearance-accent",
    white: "vkuiTextTooltip--appearance-white",
    black: "vkuiTextTooltip--appearance-black",
    inversion: "vkuiTextTooltip--appearance-inversion"
};
var TextTooltip = function(_param) {
    var children = _param.children, text = _param.text, header = _param.header, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _object_without_properties._(_param, [
        "children",
        "text",
        "header",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_HoverPopper.HoverPopper, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiTextTooltip", appearance !== "neutral" && stylesAppearance[appearance], className),
        arrow: true,
        arrowClassName: "vkuiTextTooltip__arrow",
        content: /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
            weight: "2"
        }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, null, text))
    }, popperProps), children);
};

//# sourceMappingURL=TextTooltip.js.map