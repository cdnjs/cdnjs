"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MiniInfoCell", {
    enumerable: true,
    get: function() {
        return MiniInfoCell;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var stylesMode = {
    add: "vkuiMiniInfoCell--mode-add",
    accent: "vkuiMiniInfoCell--mode-accent",
    more: "vkuiMiniInfoCell--mode-more"
};
var stylesTextWrap = {
    nowrap: "vkuiMiniInfoCell--textWrap-nowrap",
    full: "vkuiMiniInfoCell--textWrap-full",
    short: "vkuiMiniInfoCell--textWrap-short"
};
var MiniInfoCell = function(_param) {
    var before = _param.before, after = _param.after, children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "base" : _param_mode, _param_textWrap = _param.textWrap, textWrap = _param_textWrap === void 0 ? "nowrap" : _param_textWrap, _param_expandable = _param.expandable, expandable = _param_expandable === void 0 ? false : _param_expandable, className = _param.className, restProps = _object_without_properties._(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "expandable",
        "className"
    ]);
    var cellClasses = (0, _vkjs.classNames)("vkuiMiniInfoCell", stylesTextWrap[textWrap], mode !== "base" && stylesMode[mode], className);
    var cellContent = /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiMiniInfoCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiMiniInfoCell__middle"
    }, /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: "vkuiMiniInfoCell__content",
        weight: mode === "more" ? "2" : undefined
    }, children), expandable && /*#__PURE__*/ _react.createElement(_icons.Icon16Chevron, null)), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiMiniInfoCell__after"
    }, after));
    return restProps.onClick ? /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: "div",
        role: "button"
    }, restProps), {
        className: cellClasses
    }), cellContent) : /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: cellClasses
    }), cellContent);
};

//# sourceMappingURL=MiniInfoCell.js.map