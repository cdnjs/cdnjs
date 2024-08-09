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
var _dom = require("../../lib/dom");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _RootComponent = require("../RootComponent/RootComponent");
var PopoutRootPopout = function(props) {
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: "vkuiPopoutRoot__popout"
    }, props));
};
var PopoutRootModal = function(props) {
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: "vkuiPopoutRoot__modal"
    }, props));
};
var PopoutRoot = function(_param) {
    var popout = _param.popout, modal = _param.modal, children = _param.children, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "children"
    ]);
    var document = (0, _dom.useDOM)().document;
    _react.useEffect(function() {
        popout && (0, _dom.blurActiveElement)(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiPopoutRoot"
    }), children, /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, null, !!popout && /*#__PURE__*/ _react.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ _react.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map