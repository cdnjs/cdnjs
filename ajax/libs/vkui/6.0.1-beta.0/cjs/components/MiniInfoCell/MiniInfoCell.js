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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Paragraph = require("../Typography/Paragraph/Paragraph");
const stylesMode = {
    add: "vkuiMiniInfoCell--mode-add",
    accent: "vkuiMiniInfoCell--mode-accent",
    more: "vkuiMiniInfoCell--mode-more"
};
const stylesTextWrap = {
    nowrap: "vkuiMiniInfoCell--textWrap-nowrap",
    full: "vkuiMiniInfoCell--textWrap-full",
    short: "vkuiMiniInfoCell--textWrap-short"
};
const MiniInfoCell = (_param)=>{
    var { before, after, children, mode = 'base', textWrap = 'nowrap', expandable = false, className } = _param, restProps = _object_without_properties._(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "expandable",
        "className"
    ]);
    const cellClasses = (0, _vkjs.classNames)("vkuiMiniInfoCell", stylesTextWrap[textWrap], mode !== 'base' && stylesMode[mode], className);
    const cellContent = /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiMiniInfoCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiMiniInfoCell__middle"
    }, /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: "vkuiMiniInfoCell__content",
        weight: mode === 'more' ? '2' : undefined
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