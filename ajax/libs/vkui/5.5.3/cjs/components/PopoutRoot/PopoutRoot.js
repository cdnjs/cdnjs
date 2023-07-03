"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PopoutRoot", {
    enumerable: true,
    get: function() {
        return PopoutRoot;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _dom = require("../../lib/dom");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var PopoutRootPopout = function(param) {
    var children = param.children;
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPopoutRoot__popout", isDesktop && "vkuiPopoutRoot__popout--absolute")
    }, children);
};
var PopoutRootModal = function(param) {
    var children = param.children;
    return /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutRoot__modal"
    }, children);
};
var PopoutRoot = function(_param) {
    var popout = _param.popout, modal = _param.modal, children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "children",
        "getRootRef",
        "className"
    ]);
    var document = (0, _dom.useDOM)().document;
    _react.useEffect(function() {
        popout && (0, _dom.blurActiveElement)(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPopoutRoot", className),
        ref: getRootRef
    }), children, /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, null, !!popout && /*#__PURE__*/ _react.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ _react.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map