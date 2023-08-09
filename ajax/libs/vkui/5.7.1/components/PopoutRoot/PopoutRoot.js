import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { blurActiveElement, useDOM } from "../../lib/dom";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
var PopoutRootPopout = function(param) {
    var children = param.children;
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiPopoutRoot__popout", isDesktop && "vkuiPopoutRoot__popout--absolute")
    }, children);
};
var PopoutRootModal = function(param) {
    var children = param.children;
    return /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPopoutRoot__modal"
    }, children);
};
export var PopoutRoot = function(_param) {
    var popout = _param.popout, modal = _param.modal, children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "children",
        "getRootRef",
        "className"
    ]);
    var document = useDOM().document;
    React.useEffect(function() {
        popout && blurActiveElement(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPopoutRoot", className),
        ref: getRootRef
    }), children, /*#__PURE__*/ React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/ React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ React.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map