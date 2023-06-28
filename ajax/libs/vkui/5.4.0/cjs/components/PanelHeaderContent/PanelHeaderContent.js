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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _tappable = require("../Tappable/Tappable");
var _footnote = require("../Typography/Footnote/Footnote");
var _headline = require("../Typography/Headline/Headline");
var _text = require("../Typography/Text/Text");
var platformClassNames = {
    ios: "vkuiPanelHeaderContent--ios",
    android: "vkuiPanelHeaderContent--android",
    vkcom: "vkuiPanelHeaderContent--vkcom"
};
var PanelHeaderChildren = function(param) {
    var hasStatus = param.hasStatus, hasBefore = param.hasBefore, children = param.children;
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.VKCOM) {
        return /*#__PURE__*/ _react.createElement(_text.Text, {
            Component: "div",
            weight: "2"
        }, children);
    }
    return hasStatus || hasBefore ? /*#__PURE__*/ _react.createElement(_headline.Headline, {
        Component: "div",
        weight: "2"
    }, children) : /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__children-in"
    }, children);
};
var PanelHeaderContent = function(_param) {
    var className = _param.className, style = _param.style, aside = _param.aside, status = _param.status, before = _param.before, children = _param.children, onClick = _param.onClick, restProps = _objectWithoutProperties(_param, [
        "className",
        "style",
        "aside",
        "status",
        "before",
        "children",
        "onClick"
    ]);
    var InComponent = onClick ? _tappable.Tappable : "div";
    var rootProps = onClick ? {} : restProps;
    var platform = (0, _usePlatform.usePlatform)();
    var inProps = onClick ? _objectSpreadProps(_objectSpread({}, restProps), {
        onClick: onClick,
        activeEffectDelay: 200,
        hasActive: platform === _platform.Platform.IOS,
        activeMode: "opacity"
    }) : {};
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, rootProps), {
        style: style,
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContent", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, className)
    }), (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanelHeaderContent__before"
    }, before), /*#__PURE__*/ _react.createElement(InComponent, _objectSpreadProps(_objectSpread({}, inProps), {
        className: (0, _vkjs.classNames)("vkuiPanelHeaderContent__in", !before && platform !== _platform.Platform.ANDROID && "vkuiPanelHeaderContent__in--centered")
    }), (0, _vkjs.hasReactNode)(status) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiPanelHeaderContent__status"
    }, status), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiInternalPanelHeaderContent__children", "vkuiPanelHeaderContent__children")
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