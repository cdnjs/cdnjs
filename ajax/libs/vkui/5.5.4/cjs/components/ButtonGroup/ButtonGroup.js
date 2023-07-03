"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ButtonGroup", {
    enumerable: true,
    get: function() {
        return ButtonGroup;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var ButtonGroup = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "horizontal" : _param_mode, _param_gap = _param.gap, gap = _param_gap === void 0 ? "m" : _param_gap, _param_stretched = _param.stretched, stretched = _param_stretched === void 0 ? false : _param_stretched, _param_align = _param.align, align = _param_align === void 0 ? "left" /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */  : _param_align, getRootRef = _param.getRootRef, className = _param.className, children = _param.children, restProps = _object_without_properties._(_param, [
        "mode",
        "gap",
        "stretched",
        "align",
        "getRootRef",
        "className",
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)(className, "vkuiButtonGroup", {
            vertical: "vkuiButtonGroup--mode-vertical",
            horizontal: "vkuiButtonGroup--mode-horizontal"
        }[mode], gap !== "none" && ({
            space: "vkuiButtonGroup--gap-space",
            s: "vkuiButtonGroup--gap-s",
            m: "vkuiButtonGroup--gap-m"
        })[gap], stretched && "vkuiButtonGroup--stretched", {
            left: "vkuiButtonGroup--align-left",
            center: "vkuiButtonGroup--align-center",
            right: "vkuiButtonGroup--align-right"
        }[align]),
        role: "group",
        ref: getRootRef
    }, restProps), children);
};

//# sourceMappingURL=ButtonGroup.js.map