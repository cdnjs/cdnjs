"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LegacyPanelHeaderContent", {
    enumerable: true,
    get: function() {
        return LegacyPanelHeaderContent;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Text = require("../Typography/Text/Text");
var warn = (0, _warnOnce.warnOnce)("PanelHeader");
var LegacyPanelHeaderContent = function(param) {
    var children = param.children, _param_Component = param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, id = param.id;
    if (process.env.NODE_ENV === "development") {
        warn("Подкомпонент PanelHeader.Content устарел и будет удалён в v6. Используйте параметр typographyProps.");
    }
    var platform = (0, _usePlatform.usePlatform)();
    return platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_Text.Text, {
        weight: "2",
        Component: Component,
        id: id
    }, children) : /*#__PURE__*/ _react.createElement(Component, {
        className: "vkuiPanelHeader__content-in",
        id: id
    }, children);
};
LegacyPanelHeaderContent.displayName = "LegacyPanelHeaderContent";

//# sourceMappingURL=LegacyPanelHeaderContent.js.map