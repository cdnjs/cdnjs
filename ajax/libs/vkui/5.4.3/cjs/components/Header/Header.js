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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _footnote = require("../Typography/Footnote/Footnote");
var _headline = require("../Typography/Headline/Headline");
var _paragraph = require("../Typography/Paragraph/Paragraph");
var _subhead = require("../Typography/Subhead/Subhead");
var _title = require("../Typography/Title/Title");
var HeaderContent = function(_param) {
    var mode = _param.mode, size = _param.size, restProps = _objectWithoutProperties(_param, [
        "mode",
        "size"
    ]);
    var isLarge = size === "large";
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.IOS) {
        switch(mode){
            case "primary":
                return isLarge ? /*#__PURE__*/ _react.createElement(_title.Title, _objectSpread({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ _react.createElement(_title.Title, _objectSpread({
                    weight: "1",
                    level: "3"
                }, restProps));
            case "secondary":
                return /*#__PURE__*/ _react.createElement(_footnote.Footnote, _objectSpread({
                    weight: "1",
                    caps: true
                }, restProps));
            case "tertiary":
                return /*#__PURE__*/ _react.createElement(_title.Title, _objectSpread({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    if (platform === _platform.Platform.VKCOM) {
        switch(mode){
            case "primary":
                return isLarge ? /*#__PURE__*/ _react.createElement(_title.Title, _objectSpread({
                    level: "2",
                    weight: "1"
                }, restProps)) : /*#__PURE__*/ _react.createElement(_headline.Headline, _objectSpread({
                    level: "1",
                    weight: "2"
                }, restProps));
            case "secondary":
                return /*#__PURE__*/ _react.createElement(_footnote.Footnote, _objectSpread({
                    caps: true,
                    weight: "1"
                }, restProps));
            case "tertiary":
                return /*#__PURE__*/ _react.createElement(_footnote.Footnote, restProps);
        }
    }
    switch(mode){
        case "primary":
            return isLarge ? /*#__PURE__*/ _react.createElement(_title.Title, _objectSpread({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ _react.createElement(_headline.Headline, _objectSpread({
                weight: "2"
            }, restProps));
        case "secondary":
            return /*#__PURE__*/ _react.createElement(_footnote.Footnote, _objectSpread({
                weight: "1",
                caps: true
            }, restProps));
        case "tertiary":
            return /*#__PURE__*/ _react.createElement(_headline.Headline, _objectSpread({
                weight: "2"
            }, restProps));
    }
    return null;
};
var Header = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "primary" : _param_mode, _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, children = _param.children, subtitle = _param.subtitle, indicator = _param.indicator, aside = _param.aside, getRootRef = _param.getRootRef, multiline = _param.multiline, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "size",
        "children",
        "subtitle",
        "indicator",
        "aside",
        "getRootRef",
        "multiline",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var AsideTypography = platform === _platform.Platform.VKCOM ? _subhead.Subhead : _paragraph.Paragraph;
    return /*#__PURE__*/ _react.createElement("header", _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiHeader", platform === _platform.Platform.VKCOM && "vkuiHeader--vkcom", platform === _platform.Platform.ANDROID && "vkuiHeader--android", platform === _platform.Platform.IOS && "vkuiHeader--ios", {
            primary: "vkuiHeader--mode-primary",
            secondary: "vkuiHeader--mode-secondary",
            tertiary: "vkuiHeader--mode-tertiary"
        }[mode], (0, _vkjs.isPrimitiveReactNode)(indicator) && "vkuiHeader--pi", (0, _vkjs.hasReactNode)(subtitle) && "vkuiHeader--with-subtitle", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHeader__main"
    }, /*#__PURE__*/ _react.createElement(HeaderContent, {
        className: "vkuiHeader__content",
        Component: "span",
        mode: mode,
        size: size
    }, /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiHeader__content-in", multiline && "vkuiHeader__content-in--multiline")
    }, children), (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiHeader__indicator",
        weight: "2"
    }, indicator)), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        className: "vkuiHeader__subtitle",
        Component: "span"
    }, subtitle)), (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/ _react.createElement(AsideTypography, {
        className: "vkuiHeader__aside",
        Component: "span"
    }, aside));
};

//# sourceMappingURL=Header.js.map