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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _hoverPopper = require("../HoverPopper/HoverPopper");
var RichTooltip = function(_param) {
    var children = _param.children, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _objectWithoutProperties(_param, [
        "children",
        "arrow",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_hoverPopper.HoverPopper, _objectSpread({
        className: (0, _vkjs.classNames)("vkuiRichTooltip", appearance !== "neutral" && ({
            accent: "vkuiRichTooltip--appearance-accent",
            white: "vkuiRichTooltip--appearance-white",
            black: "vkuiRichTooltip--appearance-black",
            inversion: "vkuiRichTooltip--appearance-inversion"
        })[appearance], className),
        arrow: arrow,
        arrowClassName: "vkuiRichTooltip__arrow"
    }, popperProps), children);
};

//# sourceMappingURL=RichTooltip.js.map