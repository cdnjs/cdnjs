"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Header", {
    enumerable: true,
    get: function() {
        return Header;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _RootComponent = require("../RootComponent/RootComponent");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _Paragraph = require("../Typography/Paragraph/Paragraph");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Title = require("../Typography/Title/Title");
var HeaderContent = function(_param) {
    var mode = _param.mode, size = _param.size, restProps = _object_without_properties._(_param, [
        "mode",
        "size"
    ]);
    var isLarge = size === "large";
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.IOS) {
        switch(mode){
            case "primary":
                return isLarge ? /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                    weight: "1",
                    level: "3"
                }, restProps));
            case "secondary":
                return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, _object_spread._({
                    weight: "1",
                    caps: true
                }, restProps));
            case "tertiary":
                return /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    switch(mode){
        case "primary":
            return isLarge ? /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ _react.createElement(_Headline.Headline, _object_spread._({
                weight: "2"
            }, restProps));
        case "secondary":
            return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, _object_spread._({
                weight: "1",
                caps: true
            }, restProps));
        case "tertiary":
            return /*#__PURE__*/ _react.createElement(_Headline.Headline, _object_spread._({
                weight: "2"
            }, restProps));
    }
    return null;
};
var stylesMode = {
    primary: "vkuiHeader--mode-primary",
    secondary: "vkuiHeader--mode-secondary",
    tertiary: "vkuiHeader--mode-tertiary"
};
var Header = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, _param_Component = _param.Component, Component = _param_Component === void 0 ? "h2" : _param_Component, children = _param.children, subtitle = _param.subtitle, indicator = _param.indicator, aside = _param.aside, multiline = _param.multiline, restProps = _object_without_properties._(_param, [
        "mode",
        "size",
        "Component",
        "children",
        "subtitle",
        "indicator",
        "aside",
        "multiline"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiHeader", stylesMode[mode], size === "large" && "vkuiHeader--large", (0, _vkjs.isPrimitiveReactNode)(indicator) && "vkuiHeader--pi", (0, _vkjs.hasReactNode)(subtitle) && "vkuiHeader--with-subtitle")
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHeader__main"
    }, /*#__PURE__*/ _react.createElement(HeaderContent, {
        className: "vkuiHeader__content",
        Component: Component,
        mode: mode,
        size: size
    }, /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiHeader__content-in", multiline && "vkuiHeader__content--multiline")
    }, children), (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiHeader__indicator",
        weight: "2"
    }, indicator)), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: (0, _vkjs.classNames)("vkuiHeader__subtitle", multiline && "vkuiHeader__content--multiline"),
        Component: "span"
    }, subtitle)), (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: "vkuiHeader__aside",
        Component: "span"
    }, aside));
};

//# sourceMappingURL=Header.js.map