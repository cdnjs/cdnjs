"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Basic", {
    enumerable: true,
    get: function() {
        return Basic;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../../../RootComponent/RootComponent");
var _Paragraph = require("../../../Typography/Paragraph/Paragraph");
var _Subhead = require("../../../Typography/Subhead/Subhead");
var stylesLayout = {
    vertical: "vkuiSnackbar--layout-vertical",
    horizontal: "vkuiSnackbar--layout-horizontal"
};
function Basic(_param) {
    var tmp = _param.layout, layoutProps = tmp === void 0 ? "horizontal" : tmp, action = _param.action, after = _param.after, before = _param.before, mode = _param.mode, subtitle = _param.subtitle, children = _param.children, restProps = _object_without_properties._(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    var layout = after || subtitle ? "vertical" : layoutProps;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar__body", stylesLayout[layout], mode === "dark" && "vkuiSnackbar--mode-dark")
    }, restProps), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSnackbar__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSnackbar__content"
    }, /*#__PURE__*/ _react.createElement(_Paragraph.Paragraph, {
        className: "vkuiSnackbar__content-text"
    }, children), subtitle && !action && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiSnackbar__content-subtitle"
    }, subtitle), action && !subtitle && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSnackbar__action"
    }, action)), after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSnackbar__after"
    }, after));
}

//# sourceMappingURL=Basic.js.map