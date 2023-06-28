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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _dom = require("../../lib/dom");
var _appRootPortal = require("../AppRoot/AppRootPortal");
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
    var popout = _param.popout, modal = _param.modal, children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPopoutRoot", className),
        ref: getRootRef
    }), children, /*#__PURE__*/ _react.createElement(_appRootPortal.AppRootPortal, null, !!popout && /*#__PURE__*/ _react.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ _react.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map