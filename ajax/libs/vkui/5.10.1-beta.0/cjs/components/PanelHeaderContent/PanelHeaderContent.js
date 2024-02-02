"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderContent", {
    enumerable: true,
    get: function() {
        return PanelHeaderContent;
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
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _Text = require("../Typography/Text/Text");
var platformClassNames = {
    ios: "vkuiPanelHeaderContent--ios",
    android: "vkuiPanelHeaderContent--android",
    vkcom: "vkuiPanelHeaderContent--vkcom"
};
var PanelHeaderChildren = function(param) {
    var hasStatus = param.hasStatus, hasBefore = param.hasBefore, children = param.children;
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.VKCOM) {
        return /*#__PURE__*/ _react.createElement(_Text.Text, {
            className: "vkuiPanelHeaderContent__childrenText",
            Component: "div",
            weight: "2"
        }, children);
    }
    return hasStatus || hasBefore ? /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        className: "vkuiPanelHeaderContent__childrenText",
        Component: "div",
        weight: "2"
    }, children) : /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__children-in"
    }, children);
};
var PanelHeaderContent = function(_param) {
    var aside = _param.aside, status = _param.status, before = _param.before, children = _param.children, onClick = _param.onClick, restProps = _object_without_properties._(_param, [
        "aside",
        "status",
        "before",
        "children",
        "onClick"
    ]);
    var InComponent = onClick ? _Tappable.Tappable : "div";
    var rootProps = onClick ? {} : restProps;
    var platform = (0, _usePlatform.usePlatform)();
    var inProps = onClick ? _object_spread_props._(_object_spread._({}, restProps), {
        onClick: onClick,
        activeEffectDelay: 200,
        hasActive: platform === _platform.Platform.IOS,
        activeMode: "opacity"
    }) : {};
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, rootProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanelHeaderContent", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android)
    }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__before"
    }, before), /*#__PURE__*/ _react.createElement(InComponent, _object_spread_props._(_object_spread._({}, inProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContent__in", !before && platform !== _platform.Platform.ANDROID && "vkuiPanelHeaderContent__in--centered")
    }), (0, _vkjs.hasReactNode)(status) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiPanelHeaderContent__status"
    }, status), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__children"
    }, /*#__PURE__*/ _react.createElement(PanelHeaderChildren, {
        hasStatus: (0, _vkjs.hasReactNode)(status),
        hasBefore: (0, _vkjs.hasReactNode)(before)
    }, children), (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__aside"
    }, aside)), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__width"
    })));
};

//# sourceMappingURL=PanelHeaderContent.js.map