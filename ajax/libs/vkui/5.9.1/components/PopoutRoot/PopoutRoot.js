import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { blurActiveElement, useDOM } from "../../lib/dom";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { RootComponent } from "../RootComponent/RootComponent";
var PopoutRootPopout = function(props) {
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: "vkuiPopoutRoot__popout"
    }, props));
};
var PopoutRootModal = function(props) {
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: "vkuiPopoutRoot__modal"
    }, props));
};
export var PopoutRoot = function(_param) {
    var popout = _param.popout, modal = _param.modal, children = _param.children, restProps = _object_without_properties(_param, [
        "popout",
        "modal",
        "children"
    ]);
    var document = useDOM().document;
    React.useEffect(function() {
        popout && blurActiveElement(document);
    }, [
        document,
        popout
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiPopoutRoot"
    }), children, /*#__PURE__*/ React.createElement(AppRootPortal, null, !!popout && /*#__PURE__*/ React.createElement(PopoutRootPopout, null, popout), !!modal && /*#__PURE__*/ React.createElement(PopoutRootModal, null, modal)));
};

//# sourceMappingURL=PopoutRoot.js.map