"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubnavigationButton", {
    enumerable: true,
    get: function() {
        return SubnavigationButton;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _Tappable = require("../Tappable/Tappable");
var _Caption = require("../Typography/Caption/Caption");
var _Subhead = require("../Typography/Subhead/Subhead");
var appearanceStyles = {
    accent: "vkuiSubnavigationButton--appearance-accent",
    neutral: "vkuiSubnavigationButton--appearance-neutral"
};
var modeStyles = {
    primary: "vkuiSubnavigationButton--mode-primary",
    outline: "vkuiSubnavigationButton--mode-outline",
    tertiary: "vkuiSubnavigationButton--mode-tertiary"
};
var sizeStyles = {
    s: "vkuiSubnavigationButton--size-s",
    m: "vkuiSubnavigationButton--size-m",
    l: "vkuiSubnavigationButton--size-l"
};
var sizeYClassNames = _define_property._({
    none: "vkuiSubnavigationButton--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSubnavigationButton--sizeY-compact");
var SubnavigationButtonTypography = function(_param) {
    var textLevel = _param.textLevel, restProps = _object_without_properties._(_param, [
        "textLevel"
    ]);
    if (textLevel === "1") {
        return /*#__PURE__*/ _react.createElement(_Subhead.Subhead, restProps);
    }
    return /*#__PURE__*/ _react.createElement(_Caption.Caption, _object_spread._({
        level: textLevel === "2" ? "1" : "2"
    }, restProps));
};
var SubnavigationButton = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, selected = _param.selected, _param_textLevel = _param.textLevel, textLevel = _param_textLevel === void 0 ? "1" : _param_textLevel, before = _param.before, after = _param.after, expandable = _param.expandable, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "mode",
        "appearance",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "expandable",
        "children",
        "className"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: (0, _vkjs.classNames)("vkuiSubnavigationButton", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "vkuiSubnavigationButton--selected", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className)
    }), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__in"
    }, before && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__before"
    }, before), /*#__PURE__*/ _react.createElement(SubnavigationButtonTypography, {
        textLevel: textLevel,
        className: "vkuiSubnavigationButton__label",
        Component: "span"
    }, children), after && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSubnavigationButton__after"
    }, after), expandable && /*#__PURE__*/ _react.createElement(_icons.Icon16Dropdown, {
        className: "vkuiSubnavigationButton__expandableIcon"
    })));
};

//# sourceMappingURL=SubnavigationButton.js.map