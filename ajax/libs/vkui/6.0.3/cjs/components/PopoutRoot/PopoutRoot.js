"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PopoutRoot: function() {
        return PopoutRoot;
    },
    PopoutRootModal: function() {
        return PopoutRootModal;
    },
    PopoutRootPopout: function() {
        return PopoutRootPopout;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("../../lib/dom");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _RootComponent = require("../RootComponent/RootComponent");
const PopoutRootPopout = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPopoutRoot__popout", className)
    }, restProps));
};
const PopoutRootModal = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPopoutRoot__modal", className)
    }, restProps));
};
const PopoutRoot = (_param)=>{
    var { popout, modal, children } = _param, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "children"
    ]);
    const { document } = (0, _dom.useDOM)();
    _react.useEffect(()=>{
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