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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _hoverPopper = require("../HoverPopper/HoverPopper");
var _subhead = require("../Typography/Subhead/Subhead");
var TextTooltip = function(_param) {
    var children = _param.children, text = _param.text, header = _param.header, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _objectWithoutProperties(_param, [
        "children",
        "text",
        "header",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_hoverPopper.HoverPopper, _objectSpread({
        className: (0, _vkjs.classNames)("vkuiTextTooltip", appearance !== "neutral" && ({
            accent: "vkuiTextTooltip--appearance-accent",
            white: "vkuiTextTooltip--appearance-white",
            black: "vkuiTextTooltip--appearance-black",
            inversion: "vkuiTextTooltip--appearance-inversion"
        })[appearance], className),
        arrow: true,
        arrowClassName: "vkuiTextTooltip__arrow",
        content: /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
            weight: "2"
        }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, null, text))
    }, popperProps), children);
};

//# sourceMappingURL=TextTooltip.js.map