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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../../../RootComponent/RootComponent");
const _Paragraph = require("../../../Typography/Paragraph/Paragraph");
const _Subhead = require("../../../Typography/Subhead/Subhead");
const stylesLayout = {
    vertical: "vkuiSnackbar--layout-vertical",
    horizontal: "vkuiSnackbar--layout-horizontal"
};
function Basic(_param) {
    var { layout: layoutProps, action, after, before, mode, subtitle, children } = _param, restProps = _object_without_properties._(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    const layout = layoutProps || (after || subtitle ? 'vertical' : 'horizontal');
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar__body", stylesLayout[layout], mode === 'dark' && "vkuiSnackbar--mode-dark")
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